import { describe, expect, it } from 'vitest';
import type { ReadingArtifact } from '../src/contracts/reading.js';
import {
  admitCharacterGroundingBundleV1,
  buildCharacterGroundingBundleV1,
  GROUNDING_AXIS_REGISTRY_VERSION,
} from '../src/reading/character-grounding.js';
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

function artifact(): ReadingArtifact {
  return {
    readingId: 'reading-character-grounding-1',
    schemaVersion: 'internal-reading-schema-v1',
    status: 'ready_with_ambiguity',
    brand: { brandId: 'myeonghwa', displayName: '명화' },
    subject: {
      displayLabel: '테스트 사용자',
      birthInputDisplay: {
        calendarType: 'solar',
        date: '1992-04-18',
        time: '09:30',
        timeKnown: true,
        birthplaceLabel: '서울',
      },
      calculationState: 'partially_ambiguous',
    },
    calculationSummary: {
      pillars: {
        year: { label: '년주', value: '갑자', status: 'resolved' },
        month: { label: '월주', value: '을축', status: 'resolved' },
        day: { label: '일주', value: '병인', status: 'resolved' },
        hour: { label: '시주', status: 'ambiguous' },
      },
      fiveElements: [
        { label: '목', value: '2', status: 'resolved' },
        { label: '화', value: '1', status: 'resolved' },
      ],
      tenGods: [{ label: '식신', value: '존재', status: 'resolved' }],
      ambiguity: [
        {
          ambiguityId: 'ambiguity-internal-1',
          title: '시주 계산 불확실성',
          summary: '출생 시각 경계 때문에 시주는 확정할 수 없습니다.',
          affectedPaths: ['pillars.hour'],
        },
      ],
    },
    sections: [
      {
        sectionId: 'section-overview-1',
        sectionType: 'overview',
        title: '핵심',
        blocks: [
          { type: 'paragraph', text: '생각을 실제 결과로 연결하려는 경향이 있습니다.' },
          { type: 'key_points', items: ['직접 실행할 때 강점이 드러납니다.', '현실 조건도 함께 봐야 합니다.'] },
        ],
        state: 'complete',
        disclosureRefs: ['disclosure-internal-1'],
      },
      {
        sectionId: 'section-wealth-1',
        sectionType: 'wealth',
        title: '재물',
        blocks: [
          {
            type: 'fact_table',
            rows: [{ label: '재물 관점', value: '성과와 자원 배분을 함께 봅니다.' }],
          },
        ],
        state: 'complete',
      },
      {
        sectionId: 'section-relationship-1',
        sectionType: 'relationship',
        title: '관계',
        blocks: [
          {
            type: 'ambiguity',
            summary: '관계 해석은 두 가능성을 함께 보존해야 합니다.',
            scenarios: [
              { label: '가능성 A', text: '독립성을 우선할 수 있습니다.' },
              { label: '가능성 B', text: '상황에 따라 협력을 우선할 수 있습니다.' },
            ],
          },
        ],
        state: 'partial',
      },
    ],
    disclosures: [
      {
        disclosureId: 'disclosure-internal-1',
        type: 'scope_limitation',
        text: '확인된 범위만 설명합니다.',
      },
    ],
    explainability: { entries: [] },
    provenance: {
      snapshotId: 'snapshot-internal-1',
      interpretationRunId: 'interpretation-internal-1',
      narrativeRunId: 'narrative-internal-1',
      readingVersion: 'reading-version-internal-1',
    },
    generatedAt: '2026-09-18T00:00:00.000Z',
  };
}

function delivered(): ProductReadingDeliveryResult {
  return {
    deliveryId: 'delivery-character-grounding-1',
    deliveryVersion: 'myeonghwa-product-reading-delivery-v1',
    state: 'delivered',
    messageCode: 'READING_DELIVERED',
    requiredAction: 'none',
    artifact: artifact(),
    audit: {
      executionId: 'execution-character-grounding-1',
      preparationId: 'preparation-character-grounding-1',
    },
    constraints: deliveryConstraints,
  };
}

function response() {
  return buildProductReadingResponse(delivered());
}

function grounding() {
  return buildCharacterGroundingBundleV1({
    response: response(),
    engineVersion: 'test-engine-v1',
    readingDomain: 'general',
  });
}

describe('CharacterGroundingBundleV1', () => {
  it('projects an admitted delivered ProductReadingResponse deterministically', () => {
    const first = grounding();
    const second = grounding();

    expect(second).toEqual(first);
    expect(first.axisRegistryVersion).toBe(GROUNDING_AXIS_REGISTRY_VERSION);
    expect(first.readingRef).toBe('reading-character-grounding-1');
    expect(first.units).toHaveLength(5);
    expect(first.ambiguities).toHaveLength(2);
    expect(first.disclosures).toHaveLength(1);
    expect(() => admitCharacterGroundingBundleV1(first)).not.toThrow();
  });

  it('keeps canonical meaning sourced from the public reading instead of inventing a new claim', () => {
    const bundle = grounding();
    const firstUnit = bundle.units[0];

    expect(firstUnit?.canonicalMeaning).toBe('생각을 실제 결과로 연결하려는 경향이 있습니다.');
    expect(firstUnit?.sourceBlockRefs).toEqual(['sections.0.blocks.0']);
    expect(firstUnit?.semanticKey).toBe('overview:paragraph');
    expect(firstUnit?.axis).toBe('core_identity');
  });

  it('binds source disclosures to every realizable semantic unit', () => {
    const bundle = grounding();
    const disclosureRef = bundle.disclosures[0]?.disclosureRef;
    if (disclosureRef === undefined) throw new Error('fixture must contain disclosure');

    for (const unit of bundle.units) {
      expect(unit.requiredDisclosureRefs).toContain(disclosureRef);
    }
  });

  it('marks fact and ambiguity material with bounded or protected realization policy', () => {
    const bundle = grounding();
    const fact = bundle.units.find((unit) => unit.semanticKey === 'wealth:fact_table');
    const ambiguity = bundle.units.find((unit) => unit.semanticKey === 'relationship:ambiguity');

    expect(fact?.realizationPolicyRef).toBe('bounded_factual_render_v1');
    expect(ambiguity?.realizationPolicyRef).toBe('protected_only_v1');
    expect(ambiguity?.narrativeRole).toBe('limitation');
    expect(ambiguity?.ambiguityRef).toBeDefined();
  });

  it('rejects a tampered grounding hash', () => {
    const bundle = grounding();

    expect(() =>
      admitCharacterGroundingBundleV1({
        ...bundle,
        groundingHash: '0'.repeat(64),
      }),
    ).toThrow(TypeError);
  });

  it('rejects dangling disclosure and companion references', () => {
    const bundle = grounding();
    const firstUnit = bundle.units[0];
    if (firstUnit === undefined) throw new Error('fixture must contain unit');

    expect(() =>
      admitCharacterGroundingBundleV1({
        ...bundle,
        units: [
          {
            ...firstUnit,
            requiredDisclosureRefs: ['grounding_disclosure_000000000000000000000000'],
          },
          ...bundle.units.slice(1),
        ],
      }),
    ).toThrow(TypeError);

    expect(() =>
      admitCharacterGroundingBundleV1({
        ...bundle,
        units: [
          {
            ...firstUnit,
            requiredCompanionUnitRefs: ['grounding_unit_000000000000000000000000'],
          },
          ...bundle.units.slice(1),
        ],
      }),
    ).toThrow(TypeError);
  });

  it('changes grounding identity when source public reading meaning changes', () => {
    const originalResponse = response();
    const reading = originalResponse.reading;
    if (reading === undefined) throw new Error('fixture must contain reading');
    const overview = reading.sections[0];
    if (overview === undefined) throw new Error('fixture must contain overview');
    const paragraph = overview.blocks[0];
    if (paragraph === undefined || paragraph.type !== 'paragraph') {
      throw new Error('fixture must contain paragraph');
    }

    const changedResponse = {
      ...originalResponse,
      reading: {
        ...reading,
        sections: [
          {
            ...overview,
            blocks: [
              { ...paragraph, text: '변경된 public reading 의미입니다.' },
              ...overview.blocks.slice(1),
            ],
          },
          ...reading.sections.slice(1),
        ],
      },
    };

    const original = buildCharacterGroundingBundleV1({
      response: originalResponse,
      engineVersion: 'test-engine-v1',
      readingDomain: 'general',
    });
    const changed = buildCharacterGroundingBundleV1({
      response: changedResponse,
      engineVersion: 'test-engine-v1',
      readingDomain: 'general',
    });

    expect(changed.sourceResponseHash).not.toBe(original.sourceResponseHash);
    expect(changed.groundingHash).not.toBe(original.groundingHash);
    expect(changed.units[0]?.unitId).not.toBe(original.units[0]?.unitId);
  });

  it('rejects non-delivered ProductReadingResponse input', () => {
    const deliveredResponse = response();

    expect(() =>
      buildCharacterGroundingBundleV1({
        response: {
          ...deliveredResponse,
          state: 'temporarily_unavailable',
          messageCode: 'READING_TEMPORARILY_UNAVAILABLE',
          requiredAction: 'try_again_later',
          reading: undefined,
        },
        engineVersion: 'test-engine-v1',
        readingDomain: 'general',
      }),
    ).toThrow();
  });
});
