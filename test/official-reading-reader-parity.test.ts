import { describe, expect, it } from 'vitest';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import type { NarrativeEvidenceBundle } from '../src/contracts/narrative.js';
import { buildCanonicalReadingSemanticBundleV1 } from '../src/reading/canonical-reading-semantics.js';
import { buildOfficialReadingPlanV1 } from '../src/reading/official-reading-plan.js';
import { renderOfficialReadingV1 } from '../src/reading/official-reading-renderer.js';
import {
  assertOfficialReadingReaderParityReceiptV1,
  assertOfficialReadingReaderSemanticParityV1,
  buildOfficialReadingCharacterGroundingV1,
} from '../src/reading/official-reading-reader-parity.js';
import {
  PRODUCT_READING_RESPONSE_VERSION,
  type ProductReadingResponse,
} from '../src/reading/product-reading-response.js';

function semantics(summary = '실행과 준비가 서로 견제합니다.') {
  const claim: InterpretationClaim = {
    claimId: 'claim-general-tension',
    schemaVersion: 'parity-test',
    snapshotId: 'snapshot-1',
    taxonomy: { tier: 'T8', category: 'general', subcategory: 'tension_conclusion' },
    claimType: 'GENERAL_NATAL_CONCLUSION_TENSION',
    subject: 'natal_chart',
    predicate: 'consumer_conclusion',
    value: {
      conclusionKind: 'tension',
      headline: '실행과 준비의 긴장',
      summary,
      futureTimingAuthorized: false,
    },
    methodologyRef: { id: 'method-1', version: '1' },
    ruleRefs: [{ ruleId: 'rule-1', version: '1', evaluationId: 'eval-1' }],
    factRefs: [],
    upstreamClaimRefs: [],
    sourceRefs: ['source-1'],
    state: 'active',
  };
  const evidence: NarrativeEvidenceBundle = {
    requestId: 'request-1',
    purpose: 'full_reading',
    snapshotId: 'snapshot-1',
    interpretationRunId: 'interpretation-1',
    registrySnapshotId: 'registry-1',
    canonicalFacts: [],
    claims: [claim],
    claimRelations: [],
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
    targetClaimIds: ['claim-general-tension'],
  });
}

function response(): ProductReadingResponse {
  return {
    responseId: 'reading_response_0123456789abcdef01234567',
    responseVersion: PRODUCT_READING_RESPONSE_VERSION,
    state: 'delivered',
    messageCode: 'READING_DELIVERED',
    requiredAction: 'none',
    reading: {
      readingId: 'reading-1',
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
          sectionType: 'overview',
          title: '가오픈 결과',
          blocks: [{ type: 'paragraph', text: '현재 소비자용 프리뷰 문장입니다.' }],
          state: 'complete',
        },
      ],
      disclosures: [
        {
          type: 'scope_limitation',
          text: '현재 범위 안에서만 설명합니다.',
        },
      ],
      generatedAt: '2026-09-22T00:00:00.000Z',
    },
  };
}

function reportFor(summary = '실행과 준비가 서로 견제합니다.') {
  const bundle = semantics(summary);
  const plan = buildOfficialReadingPlanV1(bundle);
  return { bundle, report: renderOfficialReadingV1(bundle, plan) };
}

describe('Official Reading ↔ Reader semantic parity', () => {
  it('builds Reader grounding only from the same canonical semantic hash as the Official report', () => {
    const { bundle, report } = reportFor();
    const result = buildOfficialReadingCharacterGroundingV1({
      response: response(),
      semanticBundle: bundle,
      officialReadingReport: report,
      engineVersion: 'engine-1',
    });

    expect(result.grounding.sourceSemanticHash).toBe(report.sourceSemanticHash);
    expect(result.parity.semanticHash).toBe(bundle.semanticHash);
    expect(result.parity.officialReportHash).toBe(report.reportHash);
    expect(result.parity.groundingHash).toBe(result.grounding.groundingHash);
    expect(() =>
      assertOfficialReadingReaderParityReceiptV1(
        result.parity,
        report,
        result.grounding,
      ),
    ).not.toThrow();
  });

  it('blocks Reader grounding when the Official report belongs to different canonical meaning', () => {
    const first = reportFor('의미 A');
    const second = reportFor('의미 B');

    expect(() =>
      buildOfficialReadingCharacterGroundingV1({
        response: response(),
        semanticBundle: first.bundle,
        officialReadingReport: second.report,
        engineVersion: 'engine-1',
      }),
    ).toThrow(TypeError);
  });

  it('detects report-grounding semantic drift even when both objects are otherwise valid', () => {
    const first = reportFor('의미 A');
    const second = reportFor('의미 B');
    const secondGrounding = buildOfficialReadingCharacterGroundingV1({
      response: response(),
      semanticBundle: second.bundle,
      officialReadingReport: second.report,
      engineVersion: 'engine-1',
    }).grounding;

    expect(() =>
      assertOfficialReadingReaderSemanticParityV1(first.report, secondGrounding),
    ).toThrow(TypeError);
  });
});
