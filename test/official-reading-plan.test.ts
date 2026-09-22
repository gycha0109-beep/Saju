import { describe, expect, it } from 'vitest';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import type { NarrativeEvidenceBundle } from '../src/contracts/narrative.js';
import { buildCanonicalReadingSemanticBundleV1 } from '../src/reading/canonical-reading-semantics.js';
import {
  assertOfficialReadingPlanV1,
  buildOfficialReadingPlanV1,
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
  const evidence: NarrativeEvidenceBundle = {
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
    narrativePolicyVersion: 'preview-1',
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
});
