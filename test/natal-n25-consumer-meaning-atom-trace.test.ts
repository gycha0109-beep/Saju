import { describe, expect, it } from 'vitest';
import type { CanonicalReadingSemanticBundleV1 } from '../src/reading/canonical-reading-semantics.js';
import type { OfficialReadingPlanV1 } from '../src/reading/official-reading-plan.js';
import type { OfficialReadingRenderedContentV1 } from '../src/reading/official-reading-renderer.js';
import type { ProductReadingDeliveryResult } from '../src/reading/product-reading-delivery.js';
import type { ProductReadingResponse } from '../src/reading/product-reading-response.js';
import { traceNatalN25ConsumerMeaningAtoms } from '../src/preview/natal-n25-consumer-meaning-atom-trace.js';

function fixture() {
  const unit = {
    unitId: 'unit-1', claimId: 'claim-1',
    claimType: 'GENERAL_NATAL_OFFICER_BRANCHES_THEME',
    canonicalText: { headline: '책임과 요구', summary: '관성 계열의 책임과 압박' },
  };
  const semantics = {
    intent: { domain: 'general', temporalScope: 'natal' },
    snapshotId: 'snapshot-1', semanticHash: 'semantic-hash', units: [unit],
  } as unknown as CanonicalReadingSemanticBundleV1;
  const plan = {
    readingDomain: 'general', sourceSemanticHash: 'semantic-hash',
    planHash: 'plan-hash', sections: [{
      sectionId: 'section-1', primaryUnitRefs: ['unit-1'],
      primaryEvidenceBindings: [{ primaryUnitRef: 'unit-1', supportingUnitRefs: [] }],
    }],
  } as unknown as OfficialReadingPlanV1;
  const sections = [{
    sectionId: 'section-1', sectionType: 'overview', title: '주요 해석',
    state: 'complete', explainabilityRefs: ['explain-1'],
    blocks: [{ type: 'insights', items: [{
      headline: '책임과 요구', summary: '관성 계열의 책임과 압박', explainabilityRef: 'explain-1',
    }] }],
  }];
  const explainability = { entries: [{
    explainabilityRef: 'explain-1', primaryUnitRefs: ['unit-1'],
    supportingUnitRefs: [], claimIds: ['claim-1'],
  }] };
  const report = {
    reportHash: 'report-hash', sourceSemanticHash: 'semantic-hash',
    sourcePlanHash: 'plan-hash', sections, explainability,
  } as unknown as OfficialReadingRenderedContentV1;
  const artifact = {
    readingId: 'reading-1', sections, explainability,
    provenance: {
      snapshotId: 'snapshot-1', canonicalSemanticHash: 'semantic-hash',
      officialReadingPlanHash: 'plan-hash', officialReadingReportHash: 'report-hash',
    },
  } as unknown as NonNullable<ProductReadingDeliveryResult['artifact']>;
  const response = {
    responseId: 'response-1', state: 'delivered',
    reading: {
      readingId: 'reading-1',
      sections: [{ title: '주요 해석', state: 'complete', sectionType: 'overview',
        blocks: [
          { type: 'key_points', items: ['책임과 요구'] },
          { type: 'paragraph', text: '관성 계열의 책임과 압박' },
        ],
      }],
    },
  } as unknown as ProductReadingResponse;
  return { semantics, plan, report, artifact, response };
}

describe('N25 traced meaning atoms (audit-only)', () => {
  it('connects exactly delivered consumer fragments through the actual explainability atom', () => {
    const x = traceNatalN25ConsumerMeaningAtoms(fixture());
    expect(x.atoms).toHaveLength(1);
    expect(x.exactUniqueMatches).toBe(1);
    expect(x.atoms[0]).toMatchObject({
      claimIds: ['claim-1'],
      claimTypes: ['GENERAL_NATAL_OFFICER_BRANCHES_THEME'],
      disposition: 'exact_unique_consumer_match', semanticDifferentiationProven: false,
    });
    expect(x.atoms[0]?.claimOwnedTextFingerprints[0]).toMatch(/^[0-9a-f]+$/);
    expect(x).toMatchObject({ mayPublish: false, maySell: false, mayApproveResearchMeaning: false });
  });
  it('does not invent claim identity when the consumer repeats the same literal copy', () => {
    const x = fixture();
    const y = structuredClone(x.response) as ProductReadingResponse;
    const b = y.reading!.sections[0]!.blocks as unknown as Array<{ type: string; items?: string[]; text?: string }>;
    b.push({ type: 'paragraph', text: '관성 계열의 책임과 압박' });
    expect(traceNatalN25ConsumerMeaningAtoms({ ...x, response: y }).atoms[0]?.disposition)
      .toBe('ambiguous_repeated_consumer_text');
  });
  it('records a missing consumer fragment as unproven instead of falsely asserting loss', () => {
    const x = fixture();
    const y = structuredClone(x.response) as ProductReadingResponse;
    const b = y.reading!.sections[0]!.blocks as unknown as Array<{ type: string; items?: string[]; text?: string }>;
    b[1]!.text = '다르게 보여진 문구';
    expect(traceNatalN25ConsumerMeaningAtoms({ ...x, response: y })).toMatchObject({
      exactUniqueMatches: 0, unprovenMatches: 1,
    });
  });
  it('rejects unrelated consumer reading, snapshot, report and fabricated primary Claim binding', () => {
    const x = fixture();
    expect(() => traceNatalN25ConsumerMeaningAtoms({
      ...x, response: { ...x.response, reading: { ...x.response.reading!, readingId: 'wrong' } },
    })).toThrow();
    expect(() => traceNatalN25ConsumerMeaningAtoms({
      ...x, semantics: { ...x.semantics, snapshotId: 'wrong' },
    })).toThrow();
    expect(() => traceNatalN25ConsumerMeaningAtoms({
      ...x, report: { ...x.report, reportHash: 'wrong' },
    })).toThrow();
    expect(() => traceNatalN25ConsumerMeaningAtoms({
      ...x, plan: { ...x.plan, sections: [] },
    })).toThrow();
  });
});
