import { describe, expect, it } from 'vitest';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import {
  GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
  type GovernedReadingEvidenceBundleV1,
} from '../src/reading/governed-reading-evidence.js';
import { buildCanonicalReadingSemanticBundleV1 } from '../src/reading/canonical-reading-semantics.js';
import {
  OFFICIAL_READING_PLAN_POLICY_VERSION,
  OFFICIAL_READING_SECTION_ORDER_POLICY_VERSION,
  assertOfficialReadingPlanV1,
  buildOfficialReadingPlanV1,
  officialReadingSectionOrderForDomainV1,
} from '../src/reading/official-reading-plan.js';

function claim(
  claimId: string,
  tier: 'T5' | 'T8',
  value: unknown,
  upstreamClaimRefs: readonly string[] = [],
): InterpretationClaim {
  return {
    claimId,
    schemaVersion: 'official-reading-plan-test',
    snapshotId: 'snapshot-1',
    taxonomy:
      tier === 'T8'
        ? { tier, category: 'general', subcategory: 'tension_conclusion' }
        : { tier, category: 'ten_gods', subcategory: 'family_presence' },
    claimType: tier === 'T8' ? 'GENERAL_TENSION' : 'TEN_GOD_FAMILY_RESOURCE_PRESENT',
    subject: 'natal_chart',
    predicate: tier === 'T8' ? 'consumer_conclusion' : 'ten_god_family_presence',
    value,
    methodologyRef: { id: 'method-1', version: '1' },
    ruleRefs: [{ ruleId: `rule-${claimId}`, version: '1', evaluationId: `eval-${claimId}` }],
    factRefs: tier === 'T5' ? ['derivedFacts.tenGods'] : [],
    upstreamClaimRefs,
    sourceRefs: ['source-1'],
    state: 'active',
  };
}

function semanticBundle() {
  const support = claim('support-resource', 'T5', {
    family: 'resource',
    presence: 'observed',
    dominance: 'not_scored',
  });
  const primary = claim(
    'primary-tension',
    'T8',
    {
      conclusionKind: 'tension',
      headline: '실행과 준비의 긴장',
      summary: '실행 속도와 충분한 준비가 서로 견제합니다.',
      futureTimingAuthorized: false,
      numericScoringAuthorized: false,
    },
    ['support-resource'],
  );
  const evidence: GovernedReadingEvidenceBundleV1 = {
    requestId: 'request-1',
    purpose: 'section_reading',
    snapshotId: 'snapshot-1',
    interpretationRunId: 'interpretation-1',
    registrySnapshotId: 'registry-1',
    canonicalFacts: [],
    claims: [primary, support],
    claimRelations: [
      {
        relationId: 'relation-1',
        fromClaimId: 'primary-tension',
        toClaimId: 'support-resource',
        relation: 'derived_from',
      },
    ],
    schemaVersion: GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
    constraints: {
      mayRecalculate: false,
      mayInventRules: false,
      mustPreserveMethodDifferences: true,
      mustDiscloseMaterialAmbiguity: true,
    },
  };
  return buildCanonicalReadingSemanticBundleV1({
    intent: { domain: 'general', temporalScope: 'natal' },
    evidence,
    targetClaimIds: ['primary-tension'],
  });
}


function generalConclusion(
  claimId: string,
  conclusionKind:
    | 'core'
    | 'strength'
    | 'work'
    | 'money'
    | 'relationship'
    | 'tension',
): InterpretationClaim {
  return {
    ...claim(
      claimId,
      'T8',
      {
        conclusionKind,
        headline: `${conclusionKind} headline`,
        summary: `${conclusionKind} summary`,
        futureTimingAuthorized: false,
      },
    ),
    taxonomy: {
      tier: 'T8',
      category: 'general',
      subcategory: `${conclusionKind}_conclusion`,
    },
    claimType: `GENERAL_${conclusionKind.toUpperCase()}_CONCLUSION`,
  };
}

function wealthConclusion(
  claimId: string,
  wealthKind: 'value_creation' | 'spending' | 'management' | 'friction',
): InterpretationClaim {
  return {
    ...claim(
      claimId,
      'T8',
      {
        wealthKind,
        headline: `${wealthKind} headline`,
        summary: `${wealthKind} summary`,
        futureMoneyTimingAuthorized: false,
      },
    ),
    taxonomy: {
      tier: 'T8',
      category: 'wealth',
      subcategory: wealthKind,
    },
    claimType: `WEALTH_${wealthKind.toUpperCase()}_CONCLUSION`,
  };
}

function semanticBundleFor(
  domain: 'general' | 'wealth',
  primaries: readonly InterpretationClaim[],
) {
  const evidence: GovernedReadingEvidenceBundleV1 = {
    requestId: `request-${domain}-multi`,
    purpose: 'full_reading',
    snapshotId: 'snapshot-1',
    interpretationRunId: `interpretation-${domain}-multi`,
    registrySnapshotId: 'registry-1',
    canonicalFacts: [],
    claims: [...primaries],
    claimRelations: [],
    schemaVersion: GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
    constraints: {
      mayRecalculate: false,
      mayInventRules: false,
      mustPreserveMethodDifferences: true,
      mustDiscloseMaterialAmbiguity: true,
    },
  };
  return buildCanonicalReadingSemanticBundleV1({
    intent: { domain, temporalScope: 'natal' },
    evidence,
    targetClaimIds: primaries.map((candidate) => candidate.claimId),
  });
}

describe('OfficialReadingPlanV1', () => {
  it('assigns every primary semantic unit exactly once and preserves upstream support', () => {
    const semantics = semanticBundle();
    const plan = buildOfficialReadingPlanV1(semantics);

    const tension = plan.sections.find((section) => section.semanticGroup === 'tension');
    expect(tension?.primaryUnitRefs).toEqual([
      semantics.units.find((unit) => unit.claimId === 'primary-tension')?.unitId,
    ]);
    expect(tension?.supportingUnitRefs).toEqual([
      semantics.units.find((unit) => unit.claimId === 'support-resource')?.unitId,
    ]);
    expect(plan.sourceSemanticHash).toBe(semantics.semanticHash);
  });

  it('separates evidence and explicit interpretation limits without inventing meaning', () => {
    const semantics = semanticBundle();
    const plan = buildOfficialReadingPlanV1(semantics);

    expect(plan.sections.find((section) => section.semanticGroup === 'evidence')?.supportingUnitRefs)
      .toHaveLength(1);
    expect(plan.sections.find((section) => section.semanticGroup === 'limits')?.prohibitedExtensions)
      .toEqual(['futureTimingAuthorized', 'numericScoringAuthorized']);
    expect(plan.constraints).toEqual({
      mayGenerateClaims: false,
      mayInferMissingMeaning: false,
      mayResolveConflicts: false,
      mayCollapseScenarios: false,
      mayPromoteResearchAuthority: false,
    });
  });

  it('is deterministic and fails closed on semantic-hash drift', () => {
    const semantics = semanticBundle();
    const first = buildOfficialReadingPlanV1(semantics);
    const second = buildOfficialReadingPlanV1(semantics);

    expect(second).toEqual(first);
    expect(() =>
      assertOfficialReadingPlanV1(
        { ...first, sourceSemanticHash: '0'.repeat(64) },
        semantics,
      ),
    ).toThrow(TypeError);
  });

  it('uses an explicit versioned consumer synthesis order for General multi-section readings', () => {
    const primaries = [
      generalConclusion('general-tension', 'tension'),
      generalConclusion('general-relationship', 'relationship'),
      generalConclusion('general-money', 'money'),
      generalConclusion('general-work', 'work'),
      generalConclusion('general-strength', 'strength'),
      generalConclusion('general-core', 'core'),
    ];
    const semantics = semanticBundleFor('general', primaries);
    const plan = buildOfficialReadingPlanV1(semantics);

    expect(OFFICIAL_READING_PLAN_POLICY_VERSION).toBe(
      'myeonghwa-official-reading-plan-policy-v2',
    );
    expect(OFFICIAL_READING_SECTION_ORDER_POLICY_VERSION).toBe(
      'myeonghwa-official-reading-section-order-policy-v1',
    );
    expect(
      plan.sections.map((section) => section.semanticGroup),
    ).toEqual([
      'core',
      'interpretation',
      'work',
      'wealth',
      'relationship',
      'tension',
      'limits',
    ]);
    expect(officialReadingSectionOrderForDomainV1('general')).toEqual([
      'core',
      'interpretation',
      'work',
      'wealth',
      'relationship',
      'tension',
      'decision_style',
      'management',
      'evidence',
      'limits',
    ]);
  });

  it('uses wealth-specific section flow without changing section membership', () => {
    const primaries = [
      wealthConclusion('wealth-friction', 'friction'),
      wealthConclusion('wealth-management', 'management'),
      wealthConclusion('wealth-spending', 'spending'),
      wealthConclusion('wealth-value', 'value_creation'),
    ];
    const semantics = semanticBundleFor('wealth', primaries);
    const plan = buildOfficialReadingPlanV1(semantics);

    expect(plan.sections.map((section) => section.semanticGroup)).toEqual([
      'wealth',
      'decision_style',
      'management',
      'tension',
      'limits',
    ]);
  });

  it('is permutation-deterministic and rejects a hash-valid but policy-reordered plan', () => {
    const primaries = [
      generalConclusion('general-core', 'core'),
      generalConclusion('general-work', 'work'),
      generalConclusion('general-money', 'money'),
      generalConclusion('general-tension', 'tension'),
    ];
    const forward = semanticBundleFor('general', primaries);
    const reversed = semanticBundleFor('general', [...primaries].reverse());
    const first = buildOfficialReadingPlanV1(forward);
    const second = buildOfficialReadingPlanV1(reversed);

    expect(second).toEqual(first);

    const reorderedSections = [...first.sections].reverse();
    expect(() =>
      assertOfficialReadingPlanV1(
        {
          ...first,
          sections: reorderedSections,
          planId: 'official_reading_plan_fake',
          planHash: 'fake',
        },
        forward,
      ),
    ).toThrow(/section composition\/order/u);
  });
});
