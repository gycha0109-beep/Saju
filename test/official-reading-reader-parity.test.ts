import { describe, expect, it } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import {
  GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
  type GovernedReadingEvidenceBundleV1,
} from '../src/reading/governed-reading-evidence.js';
import { buildCanonicalReadingSemanticBundleV1 } from '../src/reading/canonical-reading-semantics.js';
import { buildOfficialReadingPlanV1 } from '../src/reading/official-reading-plan.js';
import { renderOfficialReadingV1 } from '../src/reading/official-reading-renderer.js';
import { buildOfficialReadingSemanticSourceHandoff } from '../src/reading/official-reading-semantic-source-handoff.js';
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
  const support: InterpretationClaim = {
    claimId: 'claim-general-support',
    schemaVersion: 'parity-test',
    snapshotId: 'snapshot-1',
    taxonomy: { tier: 'T5', category: 'ten_gods', subcategory: 'family_presence' },
    claimType: 'TEN_GOD_FAMILY_RESOURCE_PRESENT',
    subject: 'natal_chart',
    predicate: 'ten_god_family_presence',
    value: { family: 'resource', presence: 'observed', dominance: 'not_scored' },
    methodologyRef: { id: 'method-support', version: '1' },
    ruleRefs: [{ ruleId: 'rule-support', version: '1', evaluationId: 'eval-support' }],
    factRefs: ['derivedFacts.tenGods'],
    upstreamClaimRefs: [],
    sourceRefs: ['source-support'],
    state: 'active',
  };
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
    upstreamClaimRefs: ['claim-general-support'],
    sourceRefs: ['source-1'],
    state: 'active',
  };
  const evidence: GovernedReadingEvidenceBundleV1 = {
    requestId: 'request-1',
    purpose: 'full_reading',
    snapshotId: 'snapshot-1',
    interpretationRunId: 'interpretation-1',
    registrySnapshotId: 'registry-1',
    canonicalFacts: [],
    claims: [claim, support],
    claimRelations: [
      {
        relationId: 'relation-general-support',
        fromClaimId: claim.claimId,
        toClaimId: support.claimId,
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
  return { bundle, plan, report: renderOfficialReadingV1(bundle, plan) };
}

describe('one Official meaning source for post-purchase summary and Records', () => {
  it('binds both consumers to the same report, plan, claim sources and qualifiers without granting access', () => {
    const { bundle, plan, report } = reportFor();
    const handoff = buildOfficialReadingSemanticSourceHandoff(bundle, plan, report);
    expect(handoff.officialReportId).toBe(report.reportId);
    expect(handoff.officialReportHash).toBe(report.reportHash);
    expect(handoff.officialPlanHash).toBe(plan.planHash);
    expect(handoff.semanticHash).toBe(bundle.semanticHash);
    expect(handoff.snapshotId).toBe(bundle.snapshotId);
    expect(handoff.postPurchaseSummary.referenceReportHash)
      .toBe(handoff.longFormRecord.referenceReportHash);
    expect(handoff.postPurchaseSummary.referenceReportId)
      .toBe(handoff.longFormRecord.referenceReportId);
    const first = handoff.units.find(item =>
      item.claimId === 'claim-general-tension');
    expect(first).toBeDefined();
    expect(first?.methodology.id).toBe('method-1');
    expect(first?.sourceRefs).toContain('source-1');
    expect(first?.upstreamClaimRefs).toContain('claim-general-support');
    expect(handoff.postPurchaseSummary.eligiblePrimaryUnitRefs)
      .toContain(first?.unitId);
    expect(handoff.longFormRecord.referencedUnitRefs)
      .toContain(first?.unitId);
    expect(handoff.constraints).toEqual({
      internalReferenceOnly: true,
      mayGrantReaderAccess: false,
      mayGrantRecordStorage: false,
      mayGrantPublication: false,
      mayGrantCommerce: false,
      mayGenerateNewMeaning: false,
    });
    expect(handoff.postPurchaseSummary.mayGenerateNewMeaning).toBe(false);
    expect(handoff.longFormRecord.mayGenerateNewMeaning).toBe(false);
    expect(buildOfficialReadingSemanticSourceHandoff(bundle, plan, report)).toEqual(handoff);
  });

  it('rejects a changed rendered Korean phrase even when its report ID was copied intact', () => {
    const { bundle, plan, report } = reportFor();
    expect(report.sections.length).toBeGreaterThan(0);
    const forged = {
      ...report,
      sections: report.sections.map((section, i) =>
        i === 0 ? { ...section, title: '승인 없이 끼워 넣은 사주 단정' } : section),
    };
    expect(() => buildOfficialReadingSemanticSourceHandoff(
      bundle, plan, forged,
    )).toThrow('altered semantic/report identity');
  });

  it('rejects a different semantic source and its plan even if the rendered format is valid', () => {
    const first = reportFor('같은 명식의 실제 원국 결론 A');
    const second = reportFor('서로 다른 연구 의미 B');
    expect(first.bundle.semanticHash).not.toBe(second.bundle.semanticHash);
    expect(() => buildOfficialReadingSemanticSourceHandoff(
      first.bundle, first.plan, second.report,
    )).toThrow('mismatched or altered');
    expect(() => buildOfficialReadingSemanticSourceHandoff(
      second.bundle, first.plan, first.report,
    )).toThrow();
  });

  it('requires actual Official renderer explainability refs for the selected primary units', () => {
    const { bundle, plan, report } = reportFor();
    const altered = {
      ...report,
      explainability: { entries: [] },
    };
    const actualHash = deterministicContentHash((({ reportId: _id, reportHash: _hash, ...material }) =>
      material)(altered));
    const forged = {
      ...altered,
      reportHash: actualHash,
      reportId: 'official_reading_report_' + actualHash.slice(0, 24),
    };
    expect(() => buildOfficialReadingSemanticSourceHandoff(
      bundle, plan, forged,
    )).toThrow('missing rendered primary explainability');
  });
});

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
    const officialEntry = report.explainability.entries[0];
    const groundingUnit = result.grounding.units[0];
    expect(officialEntry).toBeDefined();
    expect(groundingUnit).toBeDefined();
    expect([
      ...(officialEntry?.primaryUnitRefs ?? []),
      ...(officialEntry?.supportingUnitRefs ?? []),
    ].sort()).toEqual([...(groundingUnit?.sourceCanonicalUnitRefs ?? [])].sort());
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
