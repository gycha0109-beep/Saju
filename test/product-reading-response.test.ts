import { describe, expect, it } from 'vitest';
import type { ReadingArtifact } from '../src/contracts/reading.js';
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
    readingId: 'reading-public-1',
    schemaVersion: 'internal-reading-schema-secret',
    status: 'ready',
    brand: { brandId: 'myeonghwa', displayName: '명화' },
    subject: {
      displayLabel: '테스트 사용자',
      birthInputDisplay: {
        calendarType: 'solar',
        date: '2024-03-10',
        time: '12:00',
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
      ambiguity: [
        {
          ambiguityId: 'ambiguity-internal-secret',
          title: '계산 불확실성',
          summary: '시간 경계 때문에 확정할 수 없습니다.',
          affectedPaths: ['pillars.hour.branch.internal.path'],
        },
      ],
    },
    sections: [
      {
        sectionId: 'section-internal-secret',
        sectionType: 'career',
        title: '직업',
        blocks: [
          { type: 'paragraph', text: '근거가 확인된 범위의 설명입니다.' },
          {
            type: 'source_hint',
            text: '출처 설명은 별도 정책에 따릅니다.',
            explainabilityRef: 'explainability-ref-secret',
          },
        ],
        state: 'complete',
        disclosureRefs: ['disclosure-internal-secret'],
        explainabilityRefs: ['explainability-ref-secret'],
      },
    ],
    disclosures: [
      {
        disclosureId: 'disclosure-internal-secret',
        type: 'scope_limitation',
        text: '확인된 범위만 설명합니다.',
      },
    ],
    explainability: {
      entries: [
        {
          explainabilityRef: 'explainability-ref-secret',
          claimIds: ['claim-secret-123'],
          factRefs: ['fact.secret.path'],
          methodologyIds: ['method-secret@1'],
          sourceIds: ['source-secret-456'],
        },
      ],
    },
    provenance: {
      snapshotId: 'snapshot-secret',
      interpretationRunId: 'interpretation-secret',
      narrativeRunId: 'narrative-secret',
      readingVersion: 'reading-version-secret',
    },
    generatedAt: '2026-08-24T01:00:00.000Z',
  };
}

function delivered(overrides: Partial<ProductReadingDeliveryResult> = {}): ProductReadingDeliveryResult {
  return {
    deliveryId: 'delivery-stable-1',
    deliveryVersion: 'delivery-internal-v1',
    state: 'delivered',
    messageCode: 'READING_DELIVERED',
    requiredAction: 'none',
    artifact: artifact(),
    audit: {
      executionId: 'execution-secret',
      preparationId: 'preparation-secret',
    },
    constraints: deliveryConstraints,
    ...overrides,
  };
}

describe('Product Reading Consumer Transport Response', () => {
  it('removes delivery audit, constraints, and the raw ReadingArtifact wrapper', () => {
    const response = buildProductReadingResponse(delivered());

    expect(response.state).toBe('delivered');
    expect(response.reading?.readingId).toBe('reading-public-1');
    expect(response).not.toHaveProperty('artifact');
    expect(response).not.toHaveProperty('audit');
    expect(response).not.toHaveProperty('constraints');
    expect(response).not.toHaveProperty('deliveryId');
  });

  it('removes explainability and provenance identifiers from successful reading output', () => {
    const response = buildProductReadingResponse(delivered());
    const json = JSON.stringify(response);

    expect(response.reading).not.toHaveProperty('explainability');
    expect(response.reading).not.toHaveProperty('provenance');
    expect(response.reading).not.toHaveProperty('schemaVersion');
    expect(json).not.toContain('claim-secret-123');
    expect(json).not.toContain('source-secret-456');
    expect(json).not.toContain('method-secret@1');
    expect(json).not.toContain('snapshot-secret');
    expect(json).not.toContain('interpretation-secret');
    expect(json).not.toContain('narrative-secret');
  });

  it('removes ambiguity ids and internal affected paths while preserving user-facing disclosure text', () => {
    const response = buildProductReadingResponse(delivered());
    const ambiguity = response.reading?.calculationSummary.ambiguity?.[0];

    expect(ambiguity).toEqual({
      title: '계산 불확실성',
      summary: '시간 경계 때문에 확정할 수 없습니다.',
    });
    expect(JSON.stringify(response)).not.toContain('pillars.hour.branch.internal.path');
    expect(JSON.stringify(response)).not.toContain('ambiguity-internal-secret');
  });

  it('removes section ids, disclosure refs, explainability refs, and source-hint refs', () => {
    const response = buildProductReadingResponse(delivered());
    const section = response.reading?.sections[0];

    expect(section).toEqual({
      sectionType: 'career',
      title: '직업',
      blocks: [
        { type: 'paragraph', text: '근거가 확인된 범위의 설명입니다.' },
        { type: 'source_hint', text: '출처 설명은 별도 정책에 따릅니다.' },
      ],
      state: 'complete',
    });
    expect(JSON.stringify(response)).not.toContain('section-internal-secret');
    expect(JSON.stringify(response)).not.toContain('explainability-ref-secret');
  });

  it('removes disclosure ids while retaining disclosure type and text', () => {
    const response = buildProductReadingResponse(delivered());

    expect(response.reading?.disclosures).toEqual([
      { type: 'scope_limitation', text: '확인된 범위만 설명합니다.' },
    ]);
    expect(JSON.stringify(response)).not.toContain('disclosure-internal-secret');
  });

  it('copies clarification candidates into transport-owned scalar option shapes', () => {
    const response = buildProductReadingResponse(
      delivered({
        state: 'clarification_required',
        messageCode: 'READING_REQUEST_CLARIFICATION_REQUIRED',
        requiredAction: 'clarify_request',
        artifact: undefined,
        clarification: {
          kind: 'domain',
          options: [
            { domain: 'business', temporalScope: 'natal' },
            { domain: 'wealth', temporalScope: 'natal' },
          ],
        },
      }),
    );

    expect(response.reading).toBeUndefined();
    expect(response.clarification).toEqual({
      kind: 'domain',
      options: [
        { domain: 'business', temporalScope: 'natal' },
        { domain: 'wealth', temporalScope: 'natal' },
      ],
    });
  });

  it('preserves consumer-safe coverage only for blocked coverage states', () => {
    const response = buildProductReadingResponse(
      delivered({
        state: 'partial_evidence',
        messageCode: 'READING_EVIDENCE_PARTIAL',
        requiredAction: 'none',
        artifact: undefined,
        coverage: {
          state: 'partial',
          hasAvailableEvidence: true,
          missingRequirementCount: 2,
        },
      }),
    );

    expect(response.reading).toBeUndefined();
    expect(response.coverage).toEqual({
      state: 'partial',
      hasAvailableEvidence: true,
      missingRequirementCount: 2,
    });
  });

  it('keeps response identity stable when internal audit identifiers change', () => {
    const first = buildProductReadingResponse(delivered());
    const second = buildProductReadingResponse(
      delivered({
        audit: {
          executionId: 'different-execution-secret',
          preparationId: 'different-preparation-secret',
        },
      }),
    );

    expect(second.responseId).toBe(first.responseId);
    expect(second.responseVersion).toBe(first.responseVersion);
  });
});
