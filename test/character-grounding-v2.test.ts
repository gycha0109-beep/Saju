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
  assertCharacterGroundingBundleV2,
  buildCharacterGroundingBundleV2,
} from '../src/reading/character-grounding-v2.js';
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
});
