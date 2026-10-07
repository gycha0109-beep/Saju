import { describe, expect, it } from 'vitest';

import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { CanonicalSajuSnapshot, TenGodChartFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import type { ReadingBlockView, ReadingIntent, ReadingSectionView } from '../src/contracts/reading.js';
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
import { BUSINESS_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 } from '../src/reading/official-reading-detailed-presentation-business.js';
import { CAREER_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 } from '../src/reading/official-reading-detailed-presentation-career.js';
import type { ApprovedOfficialReadingDetailedSourceProfileV1 } from '../src/reading/official-reading-detailed-presentation-definition.js';
import { GENERAL_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 } from '../src/reading/official-reading-detailed-presentation-general.js';
import { RELATIONSHIP_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 } from '../src/reading/official-reading-detailed-presentation-relationship.js';
import { WEALTH_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 } from '../src/reading/official-reading-detailed-presentation-wealth.js';
import {
  OFFICIAL_READING_DETAILED_ROLE_ORDER_V1,
  buildApprovedOfficialReadingDetailedRealizationV1,
} from '../src/reading/official-reading-detailed-realization.js';
import { buildOfficialReadingPlanV1 } from '../src/reading/official-reading-plan.js';
import { renderOfficialReadingV1 } from '../src/reading/official-reading-renderer.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-profile-authorization.js';

const NOW = '2026-10-07T08:00:00.000Z';

type DetailedRole = (typeof OFFICIAL_READING_DETAILED_ROLE_ORDER_V1)[number];

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
  profiles: readonly ApprovedOfficialReadingDetailedSourceProfileV1[];
}

interface CorpusCase {
  label: string;
  tenGods: TenGodChartFact;
}

const DOMAINS: readonly DomainCase[] = [
  {
    label: 'general',
    domainKey: 'general:natal',
    intent: { domain: 'general', temporalScope: 'natal' },
    createRegistry: createGeneralNatalUsefulReadingCandidateRegistry,
    profiles: GENERAL_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
  },
  {
    label: 'career',
    domainKey: 'career:natal',
    intent: { domain: 'career', temporalScope: 'natal' },
    createRegistry: createCareerNatalReadingCandidateRegistry,
    profiles: CAREER_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
  },
  {
    label: 'wealth',
    domainKey: 'wealth:natal',
    intent: { domain: 'wealth', temporalScope: 'natal' },
    createRegistry: createWealthNatalReadingCandidateRegistry,
    profiles: WEALTH_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
  },
  {
    label: 'relationship',
    domainKey: 'relationship:natal:general',
    intent: { domain: 'relationship', temporalScope: 'natal', relationshipScope: 'general' },
    createRegistry: createRelationshipNatalReadingCandidateRegistry,
    profiles: RELATIONSHIP_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
  },
  {
    label: 'business',
    domainKey: 'business:natal',
    intent: { domain: 'business', temporalScope: 'natal' },
    createRegistry: createBusinessNatalReadingCandidateRegistry,
    profiles: BUSINESS_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
  },
];

const CORPUS: readonly CorpusCase[] = [
  {
    label: 'balanced-a',
    tenGods: {
      year: { stem: resolved('비견'), branch: resolved('정인') },
      month: { stem: resolved('편재'), branch: resolved('정재') },
      day: { stem: resolved('일간'), branch: resolved('상관') },
      hour: { stem: resolved('편관'), branch: resolved('식신') },
    },
  },
  {
    label: 'balanced-b',
    tenGods: {
      year: { stem: resolved('정인'), branch: resolved('상관') },
      month: { stem: resolved('정관'), branch: resolved('정재') },
      day: { stem: resolved('일간'), branch: resolved('겁재') },
      hour: { stem: resolved('식신'), branch: resolved('편인') },
    },
  },
  {
    label: 'balanced-c',
    tenGods: {
      year: { stem: resolved('편관'), branch: resolved('비견') },
      month: { stem: resolved('식신'), branch: resolved('정인') },
      day: { stem: resolved('일간'), branch: resolved('편재') },
      hour: { stem: resolved('겁재'), branch: resolved('정재') },
    },
  },
];

function snapshot(tenGods: TenGodChartFact): CanonicalSajuSnapshot {
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
      tenGods: resolved(tenGods),
    },
  };
}

function semanticsFor(domain: DomainCase, corpus: CorpusCase) {
  const natalSnapshot = snapshot(corpus.tenGods);
  const registry = domain.createRegistry(NOW);
  const execution = runInterpretation(natalSnapshot, registry, {
    requestId: `sa6w-${domain.label}-${corpus.label}-interpretation`,
    now: new Date(NOW),
  });
  const composition = buildReadingCompositionEvidence(
    natalSnapshot,
    execution,
    registry,
    {
      requestId: `sa6w-${domain.label}-${corpus.label}-reading`,
      intent: domain.intent,
    },
    {
      narrativePolicyVersion: 'official-reading-detailed-representative-corpus-v1',
    },
  );

  expect(composition.selection.coverageState).toBe('complete');
  expect(composition.selection.profileAuthorization.state).toBe('authorized');
  if (composition.evidence === undefined) {
    throw new Error(`Expected governed reading evidence for ${domain.label}/${corpus.label}`);
  }

  const evidence = composition.evidence.bundle;
  const targetClaimIds = composition.selection.targetClaimIds;
  return buildCanonicalReadingSemanticBundleV1({
    intent: domain.intent,
    evidence,
    targetClaimIds,
    semanticTextBindings: buildPreviewSemanticTextBindingsV1({
      intent: domain.intent,
      registry,
      evidence,
      targetClaimIds,
    }),
    semanticQualifierBindings: buildPreviewSemanticQualifierBindingsV1({
      intent: domain.intent,
      registry,
      evidence,
      targetClaimIds,
    }),
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
        ...block.perspectives.flatMap((perspective) => [perspective.label, perspective.text]),
      ];
    case 'ambiguity':
      return [
        block.summary,
        ...block.scenarios.flatMap((scenario) => [scenario.label, scenario.text]),
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

function normalizedText(text: string): string {
  return text.replace(/\s+/gu, ' ').trim();
}

function roleCountsFromProfiles(
  profiles: readonly ApprovedOfficialReadingDetailedSourceProfileV1[],
): Record<DetailedRole, number> {
  const counts = Object.fromEntries(
    OFFICIAL_READING_DETAILED_ROLE_ORDER_V1.map((role) => [role, 0]),
  ) as Record<DetailedRole, number>;
  for (const profile of profiles) {
    for (const role of OFFICIAL_READING_DETAILED_ROLE_ORDER_V1) {
      const text = profile.approvedTextByRole[role];
      if (typeof text === 'string' && text.trim().length > 0) counts[role] += 1;
    }
  }
  return counts;
}

function audit(domain: DomainCase, corpus: CorpusCase) {
  const semantics = semanticsFor(domain, corpus);
  const plan = buildOfficialReadingPlanV1(semantics);
  const standard = renderOfficialReadingV1(semantics, plan);
  const detailed = renderOfficialReadingV1(semantics, plan, { preferredDetail: 'detailed' });
  const repeatedDetailed = renderOfficialReadingV1(semantics, plan, { preferredDetail: 'detailed' });
  const realization = buildApprovedOfficialReadingDetailedRealizationV1(semantics, plan);
  if (realization === undefined) {
    throw new Error(`Expected approved detailed realization for ${domain.domainKey}/${corpus.label}`);
  }

  const roleCounts = Object.fromEntries(
    OFFICIAL_READING_DETAILED_ROLE_ORDER_V1.map((role) => [role, 0]),
  ) as Record<DetailedRole, number>;
  const byText = new Map<string, { unitId: string; role: DetailedRole }[]>();

  for (const unit of realization.units) {
    for (const item of unit.roleTexts) {
      roleCounts[item.role] += 1;
      const text = normalizedText(item.text);
      const current = byText.get(text) ?? [];
      current.push({ unitId: unit.unitId, role: item.role });
      byText.set(text, current);
    }
  }

  const duplicateRoleTextGroups = [...byText.entries()]
    .filter(([, occurrences]) => occurrences.length > 1)
    .map(([text, occurrences]) => ({ text, occurrences }));

  const detailedTexts = detailed.sections.flatMap(sectionTexts).map(normalizedText);
  const renderedDuplicateCounts = duplicateRoleTextGroups.map((group) => ({
    roles: [...new Set(group.occurrences.map((occurrence) => occurrence.role))].sort(),
    count: detailedTexts.reduce(
      (count, renderedText) => count + (group.text.length === 0 ? 0 : renderedText.split(group.text).length - 1),
      0,
    ),
  }));

  const standardTextLength = standard.sections.flatMap(sectionTexts).join('\n').length;
  const detailedTextLength = detailed.sections.flatMap(sectionTexts).join('\n').length;

  return {
    semantics,
    plan,
    standard,
    detailed,
    repeatedDetailed,
    roleCounts,
    duplicateRoleTextGroups,
    renderedDuplicateCounts,
    standardTextLength,
    detailedTextLength,
    ratio: Number((detailedTextLength / standardTextLength).toFixed(3)),
  };
}

describe('Official Reading detailed representative corpus and role coverage audit', () => {
  it.each(DOMAINS)('$domainKey records the currently approved role surface without inventing missing material', (domain) => {
    const counts = roleCountsFromProfiles(domain.profiles);

    expect(counts.clarification).toBeGreaterThan(0);
    expect(counts.boundary).toBeGreaterThan(0);
    expect(counts.rationale).toBe(0);
    expect(counts.structural_evidence).toBe(0);
    expect(counts.scenario_note).toBe(0);
    expect(counts.tension_note).toBe(0);
    if (domain.domainKey === 'general:natal') {
      expect(counts.condition).toBeGreaterThan(0);
    } else {
      expect(counts.condition).toBe(0);
    }

    process.stdout.write(
      `[SA-6W][approved-role-surface][${domain.domainKey}] ${JSON.stringify(counts)}\n`,
    );
  });

  for (const domain of DOMAINS) {
    for (const corpus of CORPUS) {
      it(`${domain.domainKey}/${corpus.label} preserves semantics and exposes deterministic user-facing measurements`, () => {
        const result = audit(domain, corpus);

        expect(result.repeatedDetailed).toEqual(result.detailed);
        expect(result.detailedTextLength).toBeGreaterThan(result.standardTextLength);
        expect(result.standard.sections.map((section) => section.sectionId)).toEqual(
          result.detailed.sections.map((section) => section.sectionId),
        );
        expect(result.detailed.explainability).toEqual(result.standard.explainability);
        expect(result.detailed.disclosures).toEqual(result.standard.disclosures);
        expect(result.detailed.sourceSemanticHash).toBe(result.standard.sourceSemanticHash);
        expect(result.detailed.sourcePlanHash).toBe(result.standard.sourcePlanHash);
        expect(result.detailed.detailPreferenceResolution).toEqual({
          requestedDetail: 'detailed',
          resolvedDetail: 'detailed',
          resolution: 'exact',
        });

        for (const group of result.duplicateRoleTextGroups) {
          const roles = new Set(group.occurrences.map((occurrence) => occurrence.role));
          expect(roles).toEqual(new Set(['boundary']));
        }
        for (const rendered of result.renderedDuplicateCounts) {
          expect(rendered.roles).toEqual(['boundary']);
          expect(rendered.count).toBe(1);
        }

        const approvedSurface = roleCountsFromProfiles(domain.profiles);
        for (const role of OFFICIAL_READING_DETAILED_ROLE_ORDER_V1) {
          if (approvedSurface[role] === 0) expect(result.roleCounts[role]).toBe(0);
        }

        process.stdout.write(
          `[SA-6W][corpus][${domain.domainKey}][${corpus.label}] ${JSON.stringify({
            semanticUnitCount: result.semantics.units.length,
            primaryUnitCount: result.semantics.targetClaimIds.length,
            standardTextLength: result.standardTextLength,
            detailedTextLength: result.detailedTextLength,
            detailToStandardRatio: result.ratio,
            roleCounts: result.roleCounts,
            duplicateRoleTextGroupCount: result.duplicateRoleTextGroups.length,
            renderedDuplicateCounts: result.renderedDuplicateCounts,
          })}\n`,
        );
      });
    }
  }
});
