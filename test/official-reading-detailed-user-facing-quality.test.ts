import { describe, expect, it } from 'vitest';

import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type {
  CanonicalSajuSnapshot,
  TenGodChartFact,
} from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import type {
  ReadingBlockView,
  ReadingIntent,
  ReadingSectionView,
} from '../src/contracts/reading.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import type { ResolvedRuleRegistrySnapshot } from '../src/interpretation/rule-registry.js';
import { buildPreviewSemanticQualifierBindingsV1 } from '../src/preview/preview-semantic-qualifier-projection.js';
import { buildPreviewSemanticTextBindingsV1 } from '../src/preview/preview-semantic-text-projection.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { createBusinessNatalReadingCandidateRegistry } from '../src/research/business-natal-reading-candidate.js';
import { createCareerNatalReadingCandidateRegistry } from '../src/research/career-natal-reading-candidate.js';
import { createGeneralNatalUsefulReadingCandidateRegistry } from '../src/research/general-natal-useful-reading-candidate.js';
import { createRelationshipNatalReadingCandidateRegistry } from '../src/research/relationship-natal-reading-candidate.js';
import { createWealthNatalReadingCandidateRegistry } from '../src/research/wealth-natal-reading-candidate.js';
import { buildCanonicalReadingSemanticBundleV1 } from '../src/reading/canonical-reading-semantics.js';
import {
  OFFICIAL_READING_DETAILED_ROLE_ORDER_V1,
  buildApprovedOfficialReadingDetailedRealizationV1,
} from '../src/reading/official-reading-detailed-realization.js';
import { buildOfficialReadingPlanV1 } from '../src/reading/official-reading-plan.js';
import { renderOfficialReadingV1 } from '../src/reading/official-reading-renderer.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-profile-authorization.js';

const NOW = '2026-10-07T06:00:00.000Z';

const FIVE_FAMILY_TEN_GODS: TenGodChartFact = {
  year: { stem: resolved('비견'), branch: resolved('정인') },
  month: { stem: resolved('편재'), branch: resolved('정재') },
  day: { stem: resolved('일간'), branch: resolved('상관') },
  hour: { stem: resolved('편관'), branch: resolved('식신') },
};

interface DomainCase {
  label: string;
  domainKey:
    | 'general:natal'
    | 'career:natal'
    | 'wealth:natal'
    | 'relationship:natal:general'
    | 'business:natal';
  intent: ReadingIntent;
  createRegistry: (createdAt: string) => ResolvedRuleRegistrySnapshot;
}

const CASES: readonly DomainCase[] = [
  {
    label: 'general',
    domainKey: 'general:natal',
    intent: { domain: 'general', temporalScope: 'natal' },
    createRegistry: createGeneralNatalUsefulReadingCandidateRegistry,
  },
  {
    label: 'career',
    domainKey: 'career:natal',
    intent: { domain: 'career', temporalScope: 'natal' },
    createRegistry: createCareerNatalReadingCandidateRegistry,
  },
  {
    label: 'wealth',
    domainKey: 'wealth:natal',
    intent: { domain: 'wealth', temporalScope: 'natal' },
    createRegistry: createWealthNatalReadingCandidateRegistry,
  },
  {
    label: 'relationship',
    domainKey: 'relationship:natal:general',
    intent: {
      domain: 'relationship',
      temporalScope: 'natal',
      relationshipScope: 'general',
    },
    createRegistry: createRelationshipNatalReadingCandidateRegistry,
  },
  {
    label: 'business',
    domainKey: 'business:natal',
    intent: { domain: 'business', temporalScope: 'natal' },
    createRegistry: createBusinessNatalReadingCandidateRegistry,
  },
];

function snapshot(): CanonicalSajuSnapshot {
  const base = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: new Date(NOW) },
  );
  return {
    ...base,
    derivedFacts: {
      ...base.derivedFacts,
      tenGods: resolved(FIVE_FAMILY_TEN_GODS),
    },
  };
}

function semanticsFor(candidate: DomainCase) {
  const natalSnapshot = snapshot();
  const registry = candidate.createRegistry(NOW);
  const execution = runInterpretation(natalSnapshot, registry, {
    requestId: `sa6v-${candidate.label}-interpretation`,
    now: new Date(NOW),
  });
  const composition = buildReadingCompositionEvidence(
    natalSnapshot,
    execution,
    registry,
    {
      requestId: `sa6v-${candidate.label}-reading`,
      intent: candidate.intent,
    },
    {
      narrativePolicyVersion:
        'official-reading-detailed-user-facing-quality-v1',
    },
  );

  expect(composition.selection.coverageState).toBe('complete');
  expect(composition.selection.profileAuthorization.state).toBe('authorized');
  if (composition.evidence === undefined) {
    throw new Error(
      `Expected governed reading evidence for ${candidate.label}`,
    );
  }

  const evidence = composition.evidence.bundle;
  const targetClaimIds = composition.selection.targetClaimIds;
  const semanticTextBindings = buildPreviewSemanticTextBindingsV1({
    intent: candidate.intent,
    registry,
    evidence,
    targetClaimIds,
  });
  const semanticQualifierBindings = buildPreviewSemanticQualifierBindingsV1({
    intent: candidate.intent,
    registry,
    evidence,
    targetClaimIds,
  });

  return buildCanonicalReadingSemanticBundleV1({
    intent: candidate.intent,
    evidence,
    targetClaimIds,
    semanticTextBindings,
    semanticQualifierBindings,
  });
}

function blockTexts(block: ReadingBlockView): readonly string[] {
  switch (block.type) {
    case 'paragraph':
      return [block.text];
    case 'key_points':
      return [...block.items];
    case 'insights':
      return block.items.flatMap((item) => [
        ...(item.headline === undefined ? [] : [item.headline]),
        ...(item.summary === undefined ? [] : [item.summary]),
        ...(item.qualifiers ?? []),
      ]);
    case 'comparison':
      return [
        block.title,
        ...block.perspectives.flatMap((perspective) => [
          perspective.label,
          perspective.text,
        ]),
      ];
    case 'ambiguity':
      return [
        block.summary,
        ...block.scenarios.flatMap((scenario) => [
          scenario.label,
          scenario.text,
        ]),
      ];
    case 'timeline':
      return block.entries.flatMap((entry) => [entry.label, entry.text]);
    case 'fact_table':
      return block.rows.flatMap((row) => [row.label, row.value]);
    case 'source_hint':
      return [block.text];
  }
}

function sectionTexts(section: ReadingSectionView): readonly string[] {
  return [section.title, ...section.blocks.flatMap(blockTexts)];
}

function textLength(texts: readonly string[]): number {
  return texts.join('\n').length;
}

function normalizedText(text: string): string {
  return text.replace(/\s+/gu, ' ').trim();
}

function qualityAudit(candidate: DomainCase) {
  const semantics = semanticsFor(candidate);
  const plan = buildOfficialReadingPlanV1(semantics);
  const standard = renderOfficialReadingV1(semantics, plan);
  const detailed = renderOfficialReadingV1(semantics, plan, {
    preferredDetail: 'detailed',
  });
  const realization = buildApprovedOfficialReadingDetailedRealizationV1(
    semantics,
    plan,
  );
  if (realization === undefined) {
    throw new Error(
      `Expected approved detailed realization for ${candidate.domainKey}`,
    );
  }

  const standardTexts = standard.sections.flatMap(sectionTexts);
  const detailedTexts = detailed.sections.flatMap(sectionTexts);
  const standardTextLength = textLength(standardTexts);
  const detailedTextLength = textLength(detailedTexts);

  const roleCounts = Object.fromEntries(
    OFFICIAL_READING_DETAILED_ROLE_ORDER_V1.map((role) => [role, 0]),
  ) as Record<(typeof OFFICIAL_READING_DETAILED_ROLE_ORDER_V1)[number], number>;

  const roleOccurrences: {
    unitId: string;
    role: (typeof OFFICIAL_READING_DETAILED_ROLE_ORDER_V1)[number];
    text: string;
  }[] = [];

  for (const unit of realization.units) {
    for (const roleText of unit.roleTexts) {
      roleCounts[roleText.role] += 1;
      roleOccurrences.push({
        unitId: unit.unitId,
        role: roleText.role,
        text: normalizedText(roleText.text),
      });
    }
  }

  const occurrencesByText = new Map<
    string,
    { unitId: string; role: string }[]
  >();
  for (const occurrence of roleOccurrences) {
    const current = occurrencesByText.get(occurrence.text) ?? [];
    current.push({
      unitId: occurrence.unitId,
      role: occurrence.role,
    });
    occurrencesByText.set(occurrence.text, current);
  }

  const duplicateRoleTextGroups = [...occurrencesByText.entries()]
    .filter(([, occurrences]) => occurrences.length > 1)
    .map(([text, occurrences]) => ({
      text,
      occurrences: [...occurrences].sort((left, right) =>
        `${left.role}:${left.unitId}`.localeCompare(
          `${right.role}:${right.unitId}`,
        ),
      ),
    }))
    .sort((left, right) => left.text.localeCompare(right.text));

  return {
    label: candidate.label,
    domainKey: candidate.domainKey,
    semanticUnitCount: semantics.units.length,
    primaryUnitCount: semantics.targetClaimIds.length,
    standardTextLength,
    detailedTextLength,
    addedTextLength: detailedTextLength - standardTextLength,
    detailToStandardRatio:
      standardTextLength === 0
        ? null
        : Number((detailedTextLength / standardTextLength).toFixed(3)),
    sectionLengths: standard.sections.map((section, index) => {
      const detailedSection = detailed.sections[index];
      if (detailedSection === undefined) {
        throw new Error(
          `Detailed section missing for ${candidate.domainKey}: ${section.sectionId}`,
        );
      }
      const standardLength = textLength(sectionTexts(section));
      const detailedLength = textLength(sectionTexts(detailedSection));
      return {
        sectionId: section.sectionId,
        title: section.title,
        standardLength,
        detailedLength,
        addedLength: detailedLength - standardLength,
      };
    }),
    roleCounts,
    duplicateRoleTextGroups,
    standardLimitSectionTexts: standard.sections
      .filter((section) => section.title === '해석 범위')
      .flatMap(sectionTexts),
    detailedLimitSectionTexts: detailed.sections
      .filter((section) => section.title === '해석 범위')
      .flatMap(sectionTexts),
    sourceSemanticHash: standard.sourceSemanticHash,
    sourcePlanHash: standard.sourcePlanHash,
    standardSectionIds: standard.sections.map((section) => section.sectionId),
    detailedSectionIds: detailed.sections.map((section) => section.sectionId),
    standardExplainability: standard.explainability,
    detailedExplainability: detailed.explainability,
    standardDisclosures: standard.disclosures,
    detailedDisclosures: detailed.disclosures,
    detailPreferenceResolution: detailed.detailPreferenceResolution,
  };
}

describe('Official Reading detailed user-facing quality audit', () => {
  it.each(CASES)(
    '$label exposes deterministic quality measurements without changing semantic structure',
    (candidate) => {
      const audit = qualityAudit(candidate);
      const repeated = qualityAudit(candidate);

      expect(repeated).toEqual(audit);
      expect(audit.detailedTextLength).toBeGreaterThan(
        audit.standardTextLength,
      );
      expect(audit.addedTextLength).toBeGreaterThan(0);
      expect(audit.detailToStandardRatio).not.toBeNull();
      expect(audit.standardSectionIds).toEqual(audit.detailedSectionIds);
      expect(audit.detailedExplainability).toEqual(
        audit.standardExplainability,
      );
      expect(audit.detailedDisclosures).toEqual(audit.standardDisclosures);
      expect(audit.detailPreferenceResolution).toEqual({
        requestedDetail: 'detailed',
        resolvedDetail: 'detailed',
        resolution: 'exact',
      });

      process.stdout.write(
        `[SA-6V][${candidate.domainKey}] ${JSON.stringify({
          semanticUnitCount: audit.semanticUnitCount,
          primaryUnitCount: audit.primaryUnitCount,
          standardTextLength: audit.standardTextLength,
          detailedTextLength: audit.detailedTextLength,
          addedTextLength: audit.addedTextLength,
          detailToStandardRatio: audit.detailToStandardRatio,
          sectionLengths: audit.sectionLengths,
          roleCounts: audit.roleCounts,
          duplicateRoleTextGroups: audit.duplicateRoleTextGroups,
          standardLimitSectionTexts: audit.standardLimitSectionTexts,
          detailedLimitSectionTexts: audit.detailedLimitSectionTexts,
        })}\n`,
      );
    },
  );
});
