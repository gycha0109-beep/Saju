import { describe, expect, it } from 'vitest';

import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type {
  CanonicalSajuSnapshot,
  TenGodChartFact,
} from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import type { ReadingIntent } from '../src/contracts/reading.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import type { ResolvedRuleRegistrySnapshot } from '../src/interpretation/rule-registry.js';
import { PREVIEW_E2E_APPROVAL } from '../src/preview/preview-authority.js';
import { buildPreviewSemanticQualifierBindingsV1 } from '../src/preview/preview-semantic-qualifier-projection.js';
import { buildPreviewSemanticTextBindingsV1 } from '../src/preview/preview-semantic-text-projection.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { createBusinessNatalReadingCandidateRegistry } from '../src/research/business-natal-reading-candidate.js';
import { createCareerNatalReadingCandidateRegistry } from '../src/research/career-natal-reading-candidate.js';
import { createGeneralNatalUsefulReadingCandidateRegistry } from '../src/research/general-natal-useful-reading-candidate.js';
import { createRelationshipNatalReadingCandidateRegistry } from '../src/research/relationship-natal-reading-candidate.js';
import { createWealthNatalReadingCandidateRegistry } from '../src/research/wealth-natal-reading-candidate.js';
import {
  buildCanonicalReadingSemanticBundleV1,
  isCanonicalReadingScopeGuardUnitV1,
  type CanonicalReadingSemanticBundleV1,
} from '../src/reading/canonical-reading-semantics.js';
import {
  OFFICIAL_READING_CONCISE_SUPPORTED_DOMAIN_KEYS_V1,
  assessApprovedOfficialReadingConciseCoverageV1,
} from '../src/reading/official-reading-concise-presentation-registry.js';
import { buildOfficialReadingPlanV1 } from '../src/reading/official-reading-plan.js';
import { renderOfficialReadingV1 } from '../src/reading/official-reading-renderer.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-profile-authorization.js';

const NOW = '2026-10-06T01:00:00.000Z';

const FIVE_FAMILY_TEN_GODS: TenGodChartFact = {
  year: { stem: resolved('비견'), branch: resolved('정인') },
  month: { stem: resolved('편재'), branch: resolved('정재') },
  day: { stem: resolved('일간'), branch: resolved('상관') },
  hour: { stem: resolved('편관'), branch: resolved('식신') },
};

interface DomainCase {
  label: string;
  targetSection:
    | 'general:natal'
    | 'career:natal'
    | 'wealth:natal'
    | 'relationship:natal:general'
    | 'business:natal';
  intent: ReadingIntent;
  createRegistry: (createdAt: string) => ResolvedRuleRegistrySnapshot;
  useFiveFamilyTenGods: boolean;
}

const CASES: readonly DomainCase[] = [
  {
    label: 'general',
    targetSection: 'general:natal',
    intent: { domain: 'general', temporalScope: 'natal' },
    createRegistry: createGeneralNatalUsefulReadingCandidateRegistry,
    useFiveFamilyTenGods: true,
  },
  {
    label: 'career',
    targetSection: 'career:natal',
    intent: { domain: 'career', temporalScope: 'natal' },
    createRegistry: createCareerNatalReadingCandidateRegistry,
    useFiveFamilyTenGods: true,
  },
  {
    label: 'wealth',
    targetSection: 'wealth:natal',
    intent: { domain: 'wealth', temporalScope: 'natal' },
    createRegistry: createWealthNatalReadingCandidateRegistry,
    useFiveFamilyTenGods: true,
  },
  {
    label: 'relationship',
    targetSection: 'relationship:natal:general',
    intent: {
      domain: 'relationship',
      temporalScope: 'natal',
      relationshipScope: 'general',
    },
    createRegistry: createRelationshipNatalReadingCandidateRegistry,
    useFiveFamilyTenGods: true,
  },
  {
    label: 'business',
    targetSection: 'business:natal',
    intent: { domain: 'business', temporalScope: 'natal' },
    createRegistry: createBusinessNatalReadingCandidateRegistry,
    useFiveFamilyTenGods: true,
  },
];

function snapshot(useFiveFamilyTenGods: boolean): CanonicalSajuSnapshot {
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
  if (!useFiveFamilyTenGods) return base;
  return {
    ...base,
    derivedFacts: {
      ...base.derivedFacts,
      tenGods: resolved(FIVE_FAMILY_TEN_GODS),
    },
  };
}

function semanticsFor(candidate: DomainCase): CanonicalReadingSemanticBundleV1 {
  const natalSnapshot = snapshot(candidate.useFiveFamilyTenGods);
  const registry = candidate.createRegistry(NOW);
  const execution = runInterpretation(natalSnapshot, registry, {
    requestId: `concise-domain-${candidate.label}-interpretation`,
    now: new Date(NOW),
  });
  const composition = buildReadingCompositionEvidence(
    natalSnapshot,
    execution,
    registry,
    {
      requestId: `concise-domain-${candidate.label}-reading`,
      intent: candidate.intent,
    },
    {
      narrativePolicyVersion:
        'official-reading-concise-domain-coverage-v1',
    },
  );

  expect(composition.selection.coverageState).toBe('complete');
  expect(composition.selection.profileAuthorization.state).toBe('authorized');
  if (composition.evidence === undefined) {
    throw new Error(
      `Expected governed reading evidence for ${candidate.label}`,
    );
  }

  const semanticTextBindings = buildPreviewSemanticTextBindingsV1({
    intent: candidate.intent,
    registry,
    evidence: composition.evidence.bundle,
    targetClaimIds: composition.selection.targetClaimIds,
  });
  const semanticQualifierBindings = buildPreviewSemanticQualifierBindingsV1({
    intent: candidate.intent,
    registry,
    evidence: composition.evidence.bundle,
    targetClaimIds: composition.selection.targetClaimIds,
  });

  return buildCanonicalReadingSemanticBundleV1({
    intent: candidate.intent,
    evidence: composition.evidence.bundle,
    targetClaimIds: composition.selection.targetClaimIds,
    semanticTextBindings,
    semanticQualifierBindings,
  });
}

function visiblePrimaryUnits(bundle: CanonicalReadingSemanticBundleV1) {
  return bundle.units.filter(
    (unit) =>
      unit.role === 'primary' &&
      !isCanonicalReadingScopeGuardUnitV1(unit),
  );
}

describe('Official Reading concise domain coverage', () => {
  it('keeps concise coverage bounded to the five cross-domain Natal surfaces without widening other Official Reading authority', () => {
    const officialSections = new Set(
      PREVIEW_E2E_APPROVAL.supportedReadingSections,
    );
    expect(OFFICIAL_READING_CONCISE_SUPPORTED_DOMAIN_KEYS_V1).toHaveLength(5);
    for (const domainKey of OFFICIAL_READING_CONCISE_SUPPORTED_DOMAIN_KEYS_V1) {
      expect(officialSections.has(domainKey)).toBe(true);
    }
    expect(
      OFFICIAL_READING_CONCISE_SUPPORTED_DOMAIN_KEYS_V1,
    ).not.toContain('relationship:natal:spouse');
  });

  it.each(CASES)(
    '$label has complete current concise coverage and renders concise without semantic drift',
    (candidate) => {
      const semantics = semanticsFor(candidate);
      const plan = buildOfficialReadingPlanV1(semantics);
      const coverage = assessApprovedOfficialReadingConciseCoverageV1(
        semantics,
        plan,
      );
      const standard = renderOfficialReadingV1(semantics, plan, {
        preferredDetail: 'standard',
      });
      const concise = renderOfficialReadingV1(semantics, plan, {
        preferredDetail: 'concise',
      });

      expect(coverage).toEqual({
        domainKey: candidate.targetSection,
        state: 'complete',
        requiredUnitCount: visiblePrimaryUnits(semantics).length,
        approvedUnitCount: visiblePrimaryUnits(semantics).length,
        missingUnitRefs: [],
        staleUnitRefs: [],
      });
      expect(coverage.requiredUnitCount).toBeGreaterThan(0);
      expect(concise.detailPreferenceResolution).toEqual({
        requestedDetail: 'concise',
        resolvedDetail: 'concise',
        resolution: 'exact',
      });
      expect(concise.concisePresentationProfileSetHash).toMatch(
        /^[0-9a-f]{64}$/u,
      );
      expect(concise.explainability).toEqual(standard.explainability);
      expect(concise.sections).not.toEqual(standard.sections);
      expect(concise.sections).toHaveLength(standard.sections.length);
    },
  );

  it('distinguishes stale approved material from a missing definition', () => {
    const semantics = semanticsFor(
      CASES.find((candidate) => candidate.label === 'wealth')!,
    );
    const plan = buildOfficialReadingPlanV1(semantics);
    const target = visiblePrimaryUnits(semantics)[0];
    if (target === undefined || target.canonicalText === undefined) {
      throw new Error('Expected a visible Wealth canonical unit.');
    }

    const stale: CanonicalReadingSemanticBundleV1 = {
      ...semantics,
      units: semantics.units.map((unit) =>
        unit.unitId === target.unitId
          ? {
              ...unit,
              canonicalText: {
                ...unit.canonicalText,
                summary: `${unit.canonicalText?.summary ?? ''} 변경됨`,
              },
            }
          : unit,
      ),
    };
    const staleCoverage = assessApprovedOfficialReadingConciseCoverageV1(
      stale,
      plan,
    );
    expect(staleCoverage.state).toBe('incomplete');
    expect(staleCoverage.staleUnitRefs).toEqual([target.unitId]);
    expect(staleCoverage.missingUnitRefs).toEqual([]);

    const missing: CanonicalReadingSemanticBundleV1 = {
      ...semantics,
      units: semantics.units.map((unit) =>
        unit.unitId === target.unitId
          ? {
              ...unit,
              claimType: 'UNREGISTERED_CONCISE_TEST_CLAIM',
            }
          : unit,
      ),
    };
    const missingCoverage = assessApprovedOfficialReadingConciseCoverageV1(
      missing,
      plan,
    );
    expect(missingCoverage.state).toBe('incomplete');
    expect(missingCoverage.missingUnitRefs).toEqual([target.unitId]);
    expect(missingCoverage.staleUnitRefs).toEqual([]);
  });

  it('does not treat unsupported reading intents as concise authority', () => {
    const semantics = semanticsFor(
      CASES.find((candidate) => candidate.label === 'career')!,
    );
    const plan = buildOfficialReadingPlanV1(semantics);
    const unsupported: CanonicalReadingSemanticBundleV1 = {
      ...semantics,
      intent: {
        domain: 'family',
        temporalScope: 'natal',
        relationshipScope: 'parents',
      },
    };

    const coverage = assessApprovedOfficialReadingConciseCoverageV1(
      unsupported,
      plan,
    );
    expect(coverage.state).toBe('unsupported_domain');
    expect(coverage.domainKey).toBeUndefined();
    expect(coverage.approvedUnitCount).toBe(0);
    expect(coverage.missingUnitRefs).toHaveLength(
      visiblePrimaryUnits(semantics).length,
    );
  });
});
