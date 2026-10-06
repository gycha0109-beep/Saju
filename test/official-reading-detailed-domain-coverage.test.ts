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
  BUSINESS_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
} from '../src/reading/official-reading-detailed-presentation-business.js';
import {
  CAREER_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
} from '../src/reading/official-reading-detailed-presentation-career.js';
import {
  GENERAL_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
} from '../src/reading/official-reading-detailed-presentation-general.js';
import {
  OFFICIAL_READING_DETAILED_SUPPORTED_DOMAIN_KEYS_V1,
  APPROVED_OFFICIAL_READING_DETAILED_SOURCE_PROFILES_V1,
  assessApprovedOfficialReadingDetailedCoverageV1,
  buildApprovedOfficialReadingDetailedReadinessV1,
} from '../src/reading/official-reading-detailed-presentation-registry.js';
import {
  RELATIONSHIP_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
} from '../src/reading/official-reading-detailed-presentation-relationship.js';
import {
  WEALTH_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
} from '../src/reading/official-reading-detailed-presentation-wealth.js';
import {
  buildApprovedOfficialReadingDetailedRealizationV1,
} from '../src/reading/official-reading-detailed-realization.js';
import { buildOfficialReadingPlanV1 } from '../src/reading/official-reading-plan.js';
import {
  renderApprovedDetailedOfficialReadingV1,
  renderOfficialReadingV1,
} from '../src/reading/official-reading-renderer.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-profile-authorization.js';

const NOW = '2026-10-06T08:00:00.000Z';

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

function materialFor(candidate: DomainCase) {
  const natalSnapshot = snapshot();
  const registry = candidate.createRegistry(NOW);
  const execution = runInterpretation(natalSnapshot, registry, {
    requestId: `detailed-domain-${candidate.label}-interpretation`,
    now: new Date(NOW),
  });
  const composition = buildReadingCompositionEvidence(
    natalSnapshot,
    execution,
    registry,
    {
      requestId: `detailed-domain-${candidate.label}-reading`,
      intent: candidate.intent,
    },
    {
      narrativePolicyVersion:
        'official-reading-detailed-domain-coverage-v1',
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
  const semantics = buildCanonicalReadingSemanticBundleV1({
    intent: candidate.intent,
    evidence,
    targetClaimIds,
    semanticTextBindings,
    semanticQualifierBindings,
  });

  return {
    semantics,
    evidence,
    targetClaimIds,
    semanticTextBindings,
    semanticQualifierBindings,
  };
}

function semanticsFor(candidate: DomainCase): CanonicalReadingSemanticBundleV1 {
  return materialFor(candidate).semantics;
}

function visiblePrimaryUnits(bundle: CanonicalReadingSemanticBundleV1) {
  return bundle.units.filter(
    (unit) =>
      unit.role === 'primary' &&
      !isCanonicalReadingScopeGuardUnitV1(unit),
  );
}

function insightItems(
  report: ReturnType<typeof renderOfficialReadingV1>,
) {
  return report.sections.flatMap((section) =>
    section.blocks.flatMap((block) =>
      block.type === 'insights' ? [...block.items] : [],
    ),
  );
}

function structuralSignature(
  report: ReturnType<typeof renderOfficialReadingV1>,
) {
  return report.sections.map((section) => ({
    sectionId: section.sectionId,
    sectionType: section.sectionType,
    title: section.title,
    state: section.state,
    explainabilityRefs: section.explainabilityRefs,
    blockTypes: section.blocks.map((block) => block.type),
  }));
}

describe('Official Reading detailed core natal domain expansion', () => {
  it('registers exactly the governed core-natal profile surfaces without spouse expansion', () => {
    expect(GENERAL_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1).toHaveLength(20);
    expect(CAREER_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1).toHaveLength(20);
    expect(WEALTH_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1).toHaveLength(11);
    expect(
      RELATIONSHIP_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
    ).toHaveLength(11);
    expect(BUSINESS_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1).toHaveLength(11);
    expect(APPROVED_OFFICIAL_READING_DETAILED_SOURCE_PROFILES_V1).toHaveLength(
      73,
    );
    expect(OFFICIAL_READING_DETAILED_SUPPORTED_DOMAIN_KEYS_V1).toEqual([
      'general:natal',
      'career:natal',
      'wealth:natal',
      'relationship:natal:general',
      'business:natal',
    ]);
    expect(OFFICIAL_READING_DETAILED_SUPPORTED_DOMAIN_KEYS_V1).not.toContain(
      'relationship:natal:spouse',
    );
  });

  it.each(CASES)(
    '$label is fully ready for governed internal detailed rendering while public detailed stays off',
    (candidate) => {
      const semantics = semanticsFor(candidate);
      const plan = buildOfficialReadingPlanV1(semantics);
      const coverage = assessApprovedOfficialReadingDetailedCoverageV1(
        semantics,
        plan,
      );
      const readiness = buildApprovedOfficialReadingDetailedReadinessV1(
        semantics,
        plan,
      );
      const realization = buildApprovedOfficialReadingDetailedRealizationV1(
        semantics,
        plan,
      );
      const standard = renderOfficialReadingV1(semantics, plan);
      const internalDetailed = renderApprovedDetailedOfficialReadingV1(
        semantics,
        plan,
      );
      const publicDetailed = renderOfficialReadingV1(semantics, plan, {
        preferredDetail: 'detailed',
      });

      expect(coverage.domainKey).toBe(candidate.domainKey);
      expect(coverage.state).toBe('ready');
      expect(coverage.requiredMaterialCount).toBeGreaterThan(0);
      expect(coverage.approvedMaterialCount).toBe(
        coverage.requiredMaterialCount,
      );
      expect(coverage.missingTargetCount).toBe(0);
      expect(coverage.staleTargetCount).toBe(0);

      expect(readiness?.state).toBe('ready');
      expect(readiness?.missingTargets).toEqual([]);
      expect(readiness?.staleTargets).toEqual([]);
      expect(realization).toBeDefined();
      expect(realization?.units).toHaveLength(
        visiblePrimaryUnits(semantics).length,
      );

      expect(structuralSignature(internalDetailed)).toEqual(
        structuralSignature(standard),
      );
      expect(internalDetailed.explainability).toEqual(
        standard.explainability,
      );

      const standardItems = insightItems(standard);
      const detailedItems = insightItems(internalDetailed);
      expect(detailedItems).toHaveLength(standardItems.length);
      expect(detailedItems.map((item) => item.explainabilityRef)).toEqual(
        standardItems.map((item) => item.explainabilityRef),
      );
      for (let index = 0; index < standardItems.length; index += 1) {
        const standardItem = standardItems[index];
        const detailedItem = detailedItems[index];
        expect(detailedItem?.headline).toBe(standardItem?.headline);
        if (standardItem?.summary !== undefined) {
          expect(detailedItem?.summary?.startsWith(standardItem.summary)).toBe(
            true,
          );
        }
        for (const qualifier of standardItem?.qualifiers ?? []) {
          expect(detailedItem?.qualifiers).toContain(qualifier);
        }
      }

      expect(publicDetailed.sections).toEqual(standard.sections);
      expect(internalDetailed.detailPreferenceResolution).toEqual({
        requestedDetail: 'detailed',
        resolvedDetail: 'detailed',
        resolution: 'exact',
      });
      expect(publicDetailed.detailPreferenceResolution).toEqual({
        requestedDetail: 'detailed',
        resolvedDetail: 'standard',
        resolution: 'fallback_to_standard',
        fallbackReason: 'detailed_not_activated',
      });
      expect(
        publicDetailed.detailedRealizationPolicyVersion,
      ).toBeUndefined();
    },
  );

  it('marks changed approved wording as stale rather than silently accepting it', () => {
    const candidate = CASES.find((entry) => entry.label === 'wealth');
    if (candidate === undefined) throw new Error('wealth fixture missing');
    const material = materialFor(candidate);
    const target = visiblePrimaryUnits(material.semantics)[0];
    if (target === undefined || target.canonicalText === undefined) {
      throw new Error('Expected a visible Wealth semantic unit.');
    }

    const changedEvidence = {
      ...material.evidence,
      claims: material.evidence.claims.map((claim) => {
        if (claim.claimId !== target.claimId) return claim;
        if (
          claim.value === null ||
          typeof claim.value !== 'object' ||
          Array.isArray(claim.value)
        ) {
          throw new Error('Expected object Wealth claim value.');
        }
        return {
          ...claim,
          value: {
            ...claim.value,
            summary: `${target.canonicalText?.summary ?? ''} 변경됨`,
          },
        };
      }),
    };
    const changed = buildCanonicalReadingSemanticBundleV1({
      intent: candidate.intent,
      evidence: changedEvidence,
      targetClaimIds: material.targetClaimIds,
      semanticTextBindings: material.semanticTextBindings,
      semanticQualifierBindings: material.semanticQualifierBindings,
    });
    const coverage = assessApprovedOfficialReadingDetailedCoverageV1(
      changed,
      buildOfficialReadingPlanV1(changed),
    );
    expect(coverage.state).toBe('incomplete');
    expect(coverage.missingTargetCount).toBe(0);
    expect(coverage.staleTargetCount).toBeGreaterThan(0);
  });

  it('marks changed required supporting structure as stale', () => {
    const candidate = CASES.find((entry) => entry.label === 'business');
    if (candidate === undefined) throw new Error('business fixture missing');
    const material = materialFor(candidate);
    const target = visiblePrimaryUnits(material.semantics).find(
      (unit) => unit.upstreamClaimRefs.length > 0,
    );
    if (target === undefined) {
      throw new Error('Expected a Business unit with supporting claims.');
    }

    const changedEvidence = {
      ...material.evidence,
      claims: material.evidence.claims.map((claim) =>
        claim.claimId === target.claimId
          ? {
              ...claim,
              upstreamClaimRefs: claim.upstreamClaimRefs.slice(1),
            }
          : claim,
      ),
    };
    const changed = buildCanonicalReadingSemanticBundleV1({
      intent: candidate.intent,
      evidence: changedEvidence,
      targetClaimIds: material.targetClaimIds,
      semanticTextBindings: material.semanticTextBindings,
      semanticQualifierBindings: material.semanticQualifierBindings,
    });
    const coverage = assessApprovedOfficialReadingDetailedCoverageV1(
      changed,
      buildOfficialReadingPlanV1(changed),
    );
    expect(coverage.state).toBe('incomplete');
    expect(coverage.missingTargetCount).toBe(0);
    expect(coverage.staleTargetCount).toBeGreaterThan(0);
  });

  it('does not widen detailed authority to spouse relationship readings', () => {
    const candidate = CASES.find((entry) => entry.label === 'relationship');
    if (candidate === undefined) throw new Error('relationship fixture missing');
    const semantics = semanticsFor(candidate);
    const plan = buildOfficialReadingPlanV1(semantics);
    const spouseLike: CanonicalReadingSemanticBundleV1 = {
      ...semantics,
      intent: {
        domain: 'relationship',
        temporalScope: 'natal',
        relationshipScope: 'spouse',
      },
    };

    const coverage = assessApprovedOfficialReadingDetailedCoverageV1(
      spouseLike,
      plan,
    );
    expect(coverage.state).toBe('unsupported_domain');
    expect(coverage.domainKey).toBeUndefined();
    expect(coverage.approvedMaterialCount).toBe(0);
    expect(coverage.missingTargetCount).toBeGreaterThan(0);
  });
});
