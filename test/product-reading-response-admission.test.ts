import { describe, expect, it } from 'vitest';
import type { ReadingArtifact } from '../src/contracts/reading.js';
import type { ProductReadingDeliveryResult } from '../src/reading/product-reading-delivery.js';
import {
  admitProductReadingResponse,
  assertProductReadingResponse,
} from '../src/reading/product-reading-response-admission.js';
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
    readingId: 'reading-public-admission-1',
    schemaVersion: 'internal-reading-schema-v1',
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
          ambiguityId: 'ambiguity-internal-1',
          title: '계산 불확실성',
          summary: '시간 경계 때문에 확정할 수 없습니다.',
          affectedPaths: ['pillars.hour.branch'],
        },
      ],
    },
    sections: [
      {
        sectionId: 'section-internal-1',
        sectionType: 'career',
        title: '직업',
        blocks: [
          { type: 'paragraph', text: '근거가 확인된 범위의 설명입니다.' },
          {
            type: 'source_hint',
            text: '출처 설명은 별도 정책에 따릅니다.',
            explainabilityRef: 'explainability-internal-1',
          },
        ],
        state: 'complete',
        disclosureRefs: ['disclosure-internal-1'],
        explainabilityRefs: ['explainability-internal-1'],
      },
    ],
    disclosures: [
      {
        disclosureId: 'disclosure-internal-1',
        type: 'scope_limitation',
        text: '확인된 범위만 설명합니다.',
      },
    ],
    explainability: {
      entries: [
        {
          explainabilityRef: 'explainability-internal-1',
          claimIds: ['claim-internal-1'],
          factRefs: ['fact.internal.1'],
          methodologyIds: ['method-internal-1'],
          sourceIds: ['source-internal-1'],
        },
      ],
    },
    provenance: {
      snapshotId: 'snapshot-internal-1',
      interpretationRunId: 'interpretation-internal-1',
      narrativeRunId: 'narrative-internal-1',
      readingVersion: 'reading-version-internal-1',
    },
    generatedAt: '2026-09-11T00:00:00.000Z',
  };
}

function delivered(): ProductReadingDeliveryResult {
  return {
    deliveryId: 'delivery-admission-1',
    deliveryVersion: 'myeonghwa-product-reading-delivery-v1',
    state: 'delivered',
    messageCode: 'READING_DELIVERED',
    requiredAction: 'none',
    artifact: artifact(),
    audit: {
      executionId: 'execution-admission-1',
      preparationId: 'preparation-admission-1',
    },
    constraints: deliveryConstraints,
  };
}

function deliveredResponse() {
  return buildProductReadingResponse(delivered());
}

function clarificationResponse() {
  return buildProductReadingResponse({
    ...delivered(),
    state: 'clarification_required',
    messageCode: 'READING_REQUEST_CLARIFICATION_REQUIRED',
    requiredAction: 'clarify_request',
    artifact: undefined,
    clarification: {
      kind: 'domain',
      options: [
        { domain: 'career', temporalScope: 'natal' },
        { domain: 'wealth', temporalScope: 'annual' },
      ],
    },
  });
}

function coverageResponse(
  state: 'partial_evidence' | 'insufficient_evidence' | 'unsupported_intent',
) {
  const contract = {
    partial_evidence: {
      messageCode: 'READING_EVIDENCE_PARTIAL' as const,
      requiredAction: 'none' as const,
      coverageState: 'partial' as const,
    },
    insufficient_evidence: {
      messageCode: 'READING_EVIDENCE_INSUFFICIENT' as const,
      requiredAction: 'none' as const,
      coverageState: 'insufficient' as const,
    },
    unsupported_intent: {
      messageCode: 'READING_INTENT_NOT_AVAILABLE' as const,
      requiredAction: 'revise_request' as const,
      coverageState: 'unsupported' as const,
    },
  }[state];

  return buildProductReadingResponse({
    ...delivered(),
    state,
    messageCode: contract.messageCode,
    requiredAction: contract.requiredAction,
    artifact: undefined,
    coverage: {
      state: contract.coverageState,
      hasAvailableEvidence: state === 'partial_evidence',
      missingRequirementCount: 1,
    },
  });
}

describe('ProductReadingResponse admission', () => {
  it('admits normal canonical output from buildProductReadingResponse, including nested calculation ambiguity', () => {
    const response = deliveredResponse();

    expect(response.reading?.calculationSummary.ambiguity).toHaveLength(1);
    expect(admitProductReadingResponse(response)).toBe(response);
    expect(() => assertProductReadingResponse(response)).not.toThrow();
  });

  it('rejects a missing response version', () => {
    const malformed = { ...deliveredResponse() } as Record<string, unknown>;
    delete malformed.responseVersion;

    expect(() => admitProductReadingResponse(malformed)).toThrow(TypeError);
  });

  it('rejects the wrong response version', () => {
    expect(() =>
      admitProductReadingResponse({
        ...deliveredResponse(),
        responseVersion: 'myeonghwa-product-reading-response-v1',
      }),
    ).toThrow(TypeError);
  });

  it('rejects an unknown response state', () => {
    expect(() =>
      admitProductReadingResponse({ ...deliveredResponse(), state: 'authority_blocked' }),
    ).toThrow(TypeError);
  });

  it('rejects a state and required-action mismatch', () => {
    expect(() =>
      admitProductReadingResponse({ ...deliveredResponse(), requiredAction: 'clarify_request' }),
    ).toThrow(TypeError);
  });

  it('rejects a state and message-code mismatch', () => {
    expect(() =>
      admitProductReadingResponse({
        ...deliveredResponse(),
        messageCode: 'READING_TEMPORARILY_UNAVAILABLE',
      }),
    ).toThrow(TypeError);
  });

  it('rejects delivered output carrying a blocking coverage payload', () => {
    expect(() =>
      admitProductReadingResponse({
        ...deliveredResponse(),
        coverage: {
          state: 'partial',
          hasAvailableEvidence: true,
          missingRequirementCount: 1,
        },
      }),
    ).toThrow(TypeError);
  });

  it('rejects delivered output carrying clarification payload', () => {
    expect(() =>
      admitProductReadingResponse({
        ...deliveredResponse(),
        clarification: { kind: 'request' },
      }),
    ).toThrow(TypeError);
  });

  it('requires clarification payload for clarification_required', () => {
    const malformed = { ...clarificationResponse() } as Record<string, unknown>;
    delete malformed.clarification;

    expect(() => admitProductReadingResponse(malformed)).toThrow(TypeError);
  });

  it('rejects non-domain clarification options and underspecified domain options', () => {
    const response = clarificationResponse();

    expect(() =>
      admitProductReadingResponse({
        ...response,
        clarification: {
          kind: 'request',
          options: [{ domain: 'career', temporalScope: 'natal' }],
        },
      }),
    ).toThrow(TypeError);

    expect(() =>
      admitProductReadingResponse({
        ...response,
        clarification: {
          kind: 'domain',
          options: [{ domain: 'career', temporalScope: 'natal' }],
        },
      }),
    ).toThrow(RangeError);
  });

  it.each([
    ['partial_evidence', 'partial'],
    ['insufficient_evidence', 'insufficient'],
    ['unsupported_intent', 'unsupported'],
  ] as const)('requires matching coverage for %s', (state, expectedCoverageState) => {
    const response = coverageResponse(state);
    expect(() => assertProductReadingResponse(response)).not.toThrow();

    expect(() =>
      admitProductReadingResponse({
        ...response,
        coverage: { ...response.coverage, state: 'partial' === expectedCoverageState ? 'unsupported' : 'partial' },
      }),
    ).toThrow(TypeError);
  });

  it('rejects a blocking state with its required coverage removed', () => {
    const malformed = { ...coverageResponse('partial_evidence') } as Record<string, unknown>;
    delete malformed.coverage;

    expect(() => admitProductReadingResponse(malformed)).toThrow(TypeError);
  });

  it('rejects malformed nested reading artifacts', () => {
    const response = deliveredResponse();
    const reading = response.reading;
    if (reading === undefined) throw new Error('test fixture must contain reading');
    const firstSection = reading.sections[0];
    if (firstSection === undefined) throw new Error('test fixture must contain a section');

    expect(() =>
      admitProductReadingResponse({
        ...response,
        reading: {
          ...reading,
          sections: [
            {
              ...firstSection,
              blocks: [{ type: 'paragraph', text: '' }],
            },
          ],
        },
      }),
    ).toThrow(TypeError);
  });

  it('rejects malformed response identity without recomputing its content hash', () => {
    expect(() =>
      admitProductReadingResponse({ ...deliveredResponse(), responseId: 'reading_response_not-a-hash' }),
    ).toThrow(TypeError);
  });

  it('rejects diagnostics on states where the delivery authority does not emit them', () => {
    expect(() =>
      admitProductReadingResponse({
        ...deliveredResponse(),
        consumerDiagnostics: ['request_not_recognized'],
      }),
    ).toThrow(TypeError);
  });
});
