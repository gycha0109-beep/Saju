import { describe, expect, it } from 'vitest';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import type { NarrativeEvidenceBundle } from '../src/contracts/narrative.js';
import {
  assertCanonicalReadingSemanticBundleV1,
  buildCanonicalReadingSemanticBundleV1,
} from '../src/reading/canonical-reading-semantics.js';

function supportingClaim(): InterpretationClaim {
  return {
    claimId: 'claim-wealth-family',
    schemaVersion: 'test',
    snapshotId: 'snapshot-1',
    taxonomy: { tier: 'T5', category: 'ten_gods', subcategory: 'family_presence' },
    claimType: 'TEN_GOD_FAMILY_WEALTH_PRESENT',
    subject: 'natal_chart',
    predicate: 'ten_god_family_presence',
    value: { family: 'wealth', presence: 'observed', dominance: 'not_scored' },
    methodologyRef: { id: 'method-family', version: '1' },
    ruleRefs: [{ ruleId: 'rule-family', version: '1', evaluationId: 'eval-family' }],
    factRefs: ['derivedFacts.tenGods'],
    upstreamClaimRefs: [],
    sourceRefs: ['source-family'],
    polarity: 'neutral',
    emphasis: 'minor',
    state: 'active',
  };
}

function targetClaim(): InterpretationClaim {
  return {
    claimId: 'claim-wealth-conclusion',
    schemaVersion: 'test',
    snapshotId: 'snapshot-1',
    taxonomy: { tier: 'T8', category: 'wealth', subcategory: 'friction' },
    claimType: 'WEALTH_NATAL_CONCLUSION_WEALTH_RESOURCE_LEARN_VS_RETURN',
    subject: 'natal_chart',
    predicate: 'wealth_conclusion',
    value: {
      wealthKind: 'friction',
      headline: '준비와 결과 사이의 긴장',
      summary: '배움에 더 투자할지 지금 결과를 만들지 사이에서 긴장이 생길 수 있습니다.',
      families: ['wealth', 'resource'],
      netWorthAuthorized: false,
      investmentReturnAuthorized: false,
      futureMoneyTimingAuthorized: false,
    },
    methodologyRef: { id: 'method-wealth', version: '1' },
    ruleRefs: [{ ruleId: 'rule-wealth', version: '1', evaluationId: 'eval-wealth' }],
    factRefs: [],
    upstreamClaimRefs: ['claim-wealth-family'],
    researchEvidenceRefs: ['research-evidence-1'],
    sourceRefs: ['source-family', 'source-wealth'],
    polarity: 'neutral',
    emphasis: 'moderate',
    state: 'active',
  };
}

function evidence(): NarrativeEvidenceBundle {
  return {
    requestId: 'request-1',
    purpose: 'section_reading',
    snapshotId: 'snapshot-1',
    interpretationRunId: 'interpretation-1',
    registrySnapshotId: 'registry-1',
    canonicalFacts: [],
    claims: [supportingClaim(), targetClaim()],
    claimRelations: [
      {
        relationId: 'relation-derived',
        fromClaimId: 'claim-wealth-conclusion',
        toClaimId: 'claim-wealth-family',
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
}

function bundle() {
  return buildCanonicalReadingSemanticBundleV1({
    intent: { domain: 'wealth', temporalScope: 'natal' },
    evidence: evidence(),
    targetClaimIds: ['claim-wealth-conclusion'],
  });
}

describe('CanonicalReadingSemanticBundleV1', () => {
  it('projects target and upstream evidence without creating new claims', () => {
    const result = bundle();

    expect(result.units).toHaveLength(2);
    expect(result.units.map((unit) => unit.claimId)).toEqual([
      'claim-wealth-conclusion',
      'claim-wealth-family',
    ]);

    const primary = result.units.find((unit) => unit.claimId === 'claim-wealth-conclusion');
    const supporting = result.units.find((unit) => unit.claimId === 'claim-wealth-family');

    expect(primary?.role).toBe('primary');
    expect(supporting?.role).toBe('supporting');
    expect(primary?.canonicalText).toEqual({
      headline: '준비와 결과 사이의 긴장',
      summary: '배움에 더 투자할지 지금 결과를 만들지 사이에서 긴장이 생길 수 있습니다.',
    });
    expect(primary?.semanticPayload).toEqual(targetClaim().value);
    expect(supporting?.semanticPayload).toEqual(supportingClaim().value);
  });

  it('preserves relation, methodology, source, research, and authorization-boundary material', () => {
    const result = bundle();
    const primary = result.units.find((unit) => unit.claimId === 'claim-wealth-conclusion');
    if (primary === undefined) throw new Error('fixture must contain primary unit');

    expect(result.claimRelations).toEqual(evidence().claimRelations);
    expect(primary.relationRefs).toEqual(['relation-derived']);
    expect(primary.upstreamClaimRefs).toEqual(['claim-wealth-family']);
    expect(primary.methodologyRef).toEqual({ id: 'method-wealth', version: '1' });
    expect(primary.sourceRefs).toEqual(['source-family', 'source-wealth']);
    expect(primary.researchEvidenceRefs).toEqual(['research-evidence-1']);
    expect(primary.prohibitedExtensions).toEqual([
      'futureMoneyTimingAuthorized',
      'investmentReturnAuthorized',
      'netWorthAuthorized',
    ]);
  });

  it('is deterministic for identical admitted evidence', () => {
    expect(bundle()).toEqual(bundle());
  });

  it('fails closed when a target claim is not present in the evidence bundle', () => {
    expect(() =>
      buildCanonicalReadingSemanticBundleV1({
        intent: { domain: 'wealth', temporalScope: 'natal' },
        evidence: evidence(),
        targetClaimIds: ['missing-claim'],
      }),
    ).toThrow(TypeError);
  });

  it('rejects tampered semantic identity', () => {
    const result = bundle();

    expect(() =>
      assertCanonicalReadingSemanticBundleV1({
        ...result,
        semanticHash: '0'.repeat(64),
      }),
    ).toThrow(TypeError);
  });
});
