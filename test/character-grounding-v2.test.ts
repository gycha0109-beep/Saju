import { describe, expect, it } from 'vitest';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import {
  GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
  type GovernedReadingEvidenceBundleV1,
} from '../src/reading/governed-reading-evidence.js';
import type { ReadingArtifact } from '../src/contracts/reading.js';
import {
  buildCanonicalReadingSemanticBundleV1,
} from '../src/reading/canonical-reading-semantics.js';
import {
  CHARACTER_GROUNDING_PROJECTION_VERSION_V2,
  CHARACTER_GROUNDING_REALIZATION_POLICY_REGISTRY_VERSION_V1,
  CHARACTER_GROUNDING_SEMANTIC_KEY_REGISTRY_VERSION_V1,
  admitCharacterGroundingBundleV2,
  assertCharacterGroundingBundleRefV1,
  assertCharacterGroundingBundleV2,
  buildCharacterGroundingBundleRefV1,
  buildCharacterGroundingBundleV2,
} from '../src/reading/character-grounding-v2.js';
import { GROUNDING_AXIS_REGISTRY_VERSION } from '../src/reading/character-grounding.js';
import type { ProductReadingDeliveryResult } from '../src/reading/product-reading-delivery.js';
import { buildProductReadingResponse } from '../src/reading/product-reading-response.js';

const deliveryConstraints = {
  mayExposeInternalClaimIds: false,
  mayExposeRawInternalReasonCodes: false,
  mayExposeResearchAuthorityStateAsConsumerMeaning: false,
  mayRenderCoverageAsFortuneJudgment: false,
  maySynthesizeMissingReadingText: false,
  mayTreatClarificationCandidateAsSelectedIntent: false,
  mayTreatFallbackAsNewInterpretationAuthority: false,
} as const;

function conclusion(summary: string): InterpretationClaim {
  return {
    claimId: 'claim-general-tension',
    schemaVersion: 'test',
    snapshotId: 'snapshot-1',
    taxonomy: { tier: 'T8', category: 'general', subcategory: 'tension_conclusion' },
    claimType: 'GENERAL_NATAL_CONCLUSION_WEALTH_RESOURCE_TENSION',
    subject: 'natal_chart',
    predicate: 'consumer_conclusion',
    value: {
      conclusionKind: 'tension',
      headline: '실행 속도와 충분한 준비 사이의 긴장',
      summary,
      families: ['wealth', 'resource'],
      futureTimingAuthorized: false,
      numericScoringAuthorized: false,
    },
    methodologyRef: { id: 'method-general', version: '1' },
    ruleRefs: [{ ruleId: 'rule-general', version: '1', evaluationId: 'eval-general' }],
    factRefs: [],
    upstreamClaimRefs: ['claim-resource-family'],
    sourceRefs: ['source-general'],
    polarity: 'neutral',
    emphasis: 'moderate',
    state: 'active',
  };
}

function upstream(): InterpretationClaim {
  return {
    claimId: 'claim-resource-family',
    schemaVersion: 'test',
    snapshotId: 'snapshot-1',
    taxonomy: { tier: 'T5', category: 'ten_gods', subcategory: 'family_presence' },
    claimType: 'TEN_GOD_FAMILY_RESOURCE_PRESENT',
    subject: 'natal_chart',
    predicate: 'ten_god_family_presence',
    value: { family: 'resource', presence: 'observed', dominance: 'not_scored' },
    methodologyRef: { id: 'method-family', version: '1' },
    ruleRefs: [{ ruleId: 'rule-family', version: '1', evaluationId: 'eval-family' }],
    factRefs: ['derivedFacts.tenGods'],
    upstreamClaimRefs: [],
    sourceRefs: ['source-general'],
    polarity: 'neutral',
    emphasis: 'minor',
    state: 'active',
  };
}

function semanticBundle(summary = '결과를 빨리 만들려는 축과 더 배우고 검토하려는 축이 서로 견제합니다.') {
  const evidence: GovernedReadingEvidenceBundleV1 = {
    requestId: 'request-1',
    purpose: 'section_reading',
    snapshotId: 'snapshot-1',
    interpretationRunId: 'interpretation-1',
    registrySnapshotId: 'registry-1',
    canonicalFacts: [],
    claims: [conclusion(summary), upstream()],
    claimRelations: [
      {
        relationId: 'relation-derived',
        fromClaimId: 'claim-general-tension',
        toClaimId: 'claim-resource-family',
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
    targetClaimIds: ['claim-general-tension'],
  });
}

function artifact(reportText: string): ReadingArtifact {
  return {
    readingId: 'reading-1',
    schemaVersion: 'reading-test',
    status: 'ready',
    brand: { brandId: 'myeonghwa', displayName: '명화' },
    subject: {
      birthInputDisplay: {
        calendarType: 'solar',
        date: '1990-01-01',
        timeKnown: false,
      },
      calculationState: 'resolved',
    },
    calculationSummary: {
      pillars: {
        year: { label: '년주', value: '갑자', status: 'resolved' },
        month: { label: '월주', value: '을축', status: 'resolved' },
        day: { label: '일주', value: '병인', status: 'resolved' },
        hour: { label: '시주', status: 'unavailable' },
      },
    },
    sections: [
      {
        sectionId: 'report-core',
        sectionType: 'overview',
        title: '핵심 구조',
        blocks: [{ type: 'paragraph', text: reportText }],
        state: 'complete',
      },
    ],
    disclosures: [
      {
        disclosureId: 'scope-1',
        type: 'scope_limitation',
        text: '프리뷰 범위 안에서만 설명합니다.',
      },
    ],
    explainability: { entries: [] },
    provenance: {
      snapshotId: 'snapshot-1',
      interpretationRunId: 'interpretation-1',
      narrativeRunId: 'narrative-1',
      readingVersion: 'reading-1',
    },
    generatedAt: '2026-09-22T00:00:00.000Z',
  };
}

function response(reportText: string) {
  const delivery: ProductReadingDeliveryResult = {
    deliveryId: 'delivery-1',
    deliveryVersion: 'delivery-test',
    state: 'delivered',
    messageCode: 'READING_DELIVERED',
    requiredAction: 'none',
    artifact: artifact(reportText),
    audit: { executionId: 'execution-1', preparationId: 'preparation-1' },
    constraints: deliveryConstraints,
  };
  return buildProductReadingResponse(delivery);
}

describe('CharacterGroundingBundleV2', () => {
  it('uses canonical Reading semantics rather than report paragraph text as semantic authority', () => {
    const semantics = semanticBundle();
    const first = buildCharacterGroundingBundleV2({
      response: response('보고서 표현 A'),
      semanticBundle: semantics,
      engineVersion: 'engine-1',
    });
    const second = buildCharacterGroundingBundleV2({
      response: response('같은 의미를 다른 문장으로 표현한 보고서 B'),
      semanticBundle: semantics,
      engineVersion: 'engine-1',
    });

    expect(first.units).toHaveLength(1);
    expect(first.units[0]?.canonicalMeaning).toBe(
      '결과를 빨리 만들려는 축과 더 배우고 검토하려는 축이 서로 견제합니다.',
    );
    expect(second.units[0]?.canonicalMeaning).toBe(first.units[0]?.canonicalMeaning);
    expect(second.units[0]?.unitId).toBe(first.units[0]?.unitId);
    expect(second.sourceSemanticHash).toBe(first.sourceSemanticHash);
    expect(second.sourceResponseHash).not.toBe(first.sourceResponseHash);
    expect(second.groundingHash).not.toBe(first.groundingHash);
  });

  it('changes semantic grounding identity when canonical meaning changes', () => {
    const first = buildCharacterGroundingBundleV2({
      response: response('동일한 보고서 문장'),
      semanticBundle: semanticBundle('의미 A'),
      engineVersion: 'engine-1',
    });
    const second = buildCharacterGroundingBundleV2({
      response: response('동일한 보고서 문장'),
      semanticBundle: semanticBundle('의미 B'),
      engineVersion: 'engine-1',
    });

    expect(second.sourceSemanticHash).not.toBe(first.sourceSemanticHash);
    expect(second.units[0]?.unitId).not.toBe(first.units[0]?.unitId);
    expect(second.groundingHash).not.toBe(first.groundingHash);
  });

  it('keeps upstream provenance opaque but traceable through canonical unit refs', () => {
    const semantics = semanticBundle();
    const result = buildCharacterGroundingBundleV2({
      response: response('보고서 문장'),
      semanticBundle: semantics,
      engineVersion: 'engine-1',
    });
    const unit = result.units[0];
    if (unit === undefined) throw new Error('fixture must contain unit');

    expect(unit.sourceCanonicalUnitRefs).toHaveLength(2);
    expect(unit.sourceCanonicalUnitRefs.every((ref) => ref.startsWith('canonical_reading_unit_'))).toBe(true);
    expect(unit.prohibitedExtensions).toEqual([
      'futureTimingAuthorized',
      'numericScoringAuthorized',
    ]);
    expect(unit.narrativeRole).toBe('tension');
    expect(unit.axis).toBe('tension');
    expect(unit.requiredDisclosureRefs).toEqual(
      result.disclosures.map((disclosure) => disclosure.disclosureRef),
    );
  });

  it('admits deterministic bundles and rejects a tampered grounding hash', () => {
    const result = buildCharacterGroundingBundleV2({
      response: response('보고서 문장'),
      semanticBundle: semanticBundle(),
      engineVersion: 'engine-1',
    });

    expect(() => assertCharacterGroundingBundleV2(result)).not.toThrow();
    expect(() =>
      assertCharacterGroundingBundleV2({
        ...result,
        groundingHash: '0'.repeat(64),
      }),
    ).toThrow(TypeError);
  });

  it('pins public grounding registries and emits a stable admitted bundle ref', () => {
    const source = {
      response: response('보고서 문장'),
      semanticBundle: semanticBundle(),
      engineVersion: 'engine-1',
    };
    const result = buildCharacterGroundingBundleV2(source);
    const admitted = admitCharacterGroundingBundleV2(result, source);
    const ref = buildCharacterGroundingBundleRefV1(admitted);

    expect(result.axisRegistryVersion).toBe(GROUNDING_AXIS_REGISTRY_VERSION);
    expect(result.semanticKeyRegistryVersion).toBe(
      CHARACTER_GROUNDING_SEMANTIC_KEY_REGISTRY_VERSION_V1,
    );
    expect(result.realizationPolicyRegistryVersion).toBe(
      CHARACTER_GROUNDING_REALIZATION_POLICY_REGISTRY_VERSION_V1,
    );
    expect(ref).toEqual({
      schemaVersion: 'v1',
      readingRef: result.readingRef,
      groundingHash: result.groundingHash,
      projectionVersion: CHARACTER_GROUNDING_PROJECTION_VERSION_V2,
    });
    expect(() => assertCharacterGroundingBundleRefV1(ref, result)).not.toThrow();
  });

  it('keeps grounding identity independent of transport responseId and generatedAt', () => {
    const semantics = semanticBundle();
    const firstResponse = response('보고서 문장');
    const first = buildCharacterGroundingBundleV2({
      response: firstResponse,
      semanticBundle: semantics,
      engineVersion: 'engine-1',
    });
    if (firstResponse.reading === undefined) throw new Error('fixture must contain reading');

    const second = buildCharacterGroundingBundleV2({
      response: {
        ...firstResponse,
        responseId: 'reading_response_fedcba9876543210fedcba98',
        reading: {
          ...firstResponse.reading,
          generatedAt: '2030-01-01T00:00:00.000Z',
        },
      },
      semanticBundle: semantics,
      engineVersion: 'engine-1',
    });

    expect(second.sourceResponseHash).toBe(first.sourceResponseHash);
    expect(second.units).toEqual(first.units);
    expect(second.groundingHash).toBe(first.groundingHash);
    expect(buildCharacterGroundingBundleRefV1(second)).toEqual(
      buildCharacterGroundingBundleRefV1(first),
    );
  });

  it('rejects a self-consistent grounding bundle that does not match the admitted Saju source', () => {
    const sourceA = {
      response: response('동일한 보고서 문장'),
      semanticBundle: semanticBundle('의미 A'),
      engineVersion: 'engine-1',
    };
    const sourceB = {
      response: response('동일한 보고서 문장'),
      semanticBundle: semanticBundle('의미 B'),
      engineVersion: 'engine-1',
    };
    const bundleA = buildCharacterGroundingBundleV2(sourceA);
    const bundleB = buildCharacterGroundingBundleV2(sourceB);

    expect(() => admitCharacterGroundingBundleV2(bundleA, sourceA)).not.toThrow();
    expect(() => admitCharacterGroundingBundleV2(bundleB, sourceA)).toThrow(TypeError);
  });

  it('rejects registry drift and dangling dependency refs before Reader handoff', () => {
    const result = buildCharacterGroundingBundleV2({
      response: response('보고서 문장'),
      semanticBundle: semanticBundle(),
      engineVersion: 'engine-1',
    });
    const firstUnit = result.units[0];
    if (firstUnit === undefined) throw new Error('fixture must contain unit');

    expect(() =>
      assertCharacterGroundingBundleV2({
        ...result,
        axisRegistryVersion: 'unknown-axis-registry',
      }),
    ).toThrow(TypeError);

    expect(() =>
      assertCharacterGroundingBundleV2({
        ...result,
        units: [
          {
            ...firstUnit,
            requiredDisclosureRefs: ['grounding_disclosure_missing'],
          },
        ],
      }),
    ).toThrow(TypeError);

    expect(() =>
      assertCharacterGroundingBundleV2({
        ...result,
        units: [
          {
            ...firstUnit,
            requiredCompanionUnitRefs: ['grounding_unit_v2_000000000000000000000000'],
          },
        ],
      }),
    ).toThrow(TypeError);
  });

});
