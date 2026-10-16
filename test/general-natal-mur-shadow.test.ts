import { describe, expect, it } from 'vitest';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import { createGeneralNatalIntegratedReadingRegistry } from '../src/interpretation/general-natal-integrated-reading-registry.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import { evaluateGeneralNatalMurShadowV1 } from '../src/reading/general-natal-mur-shadow.js';
import type { ProductReadingResponse } from '../src/reading/product-reading-response.js';
import type { InterpretationExecutionResult } from '../src/interpretation/interpretation-engine.js';
import type { ReadingEvidenceSelection } from '../src/contracts/reading.js';

const now = new Date('2026-10-15T00:00:00.000Z');
const registry = createGeneralNatalIntegratedReadingRegistry(now.toISOString());
const delivered: ProductReadingResponse = {
  responseId: 'response-test',
  responseVersion: 'myeonghwa-product-reading-response-v2',
  state: 'delivered',
  messageCode: 'READING_DELIVERED',
  requiredAction: 'none',
};
const partial: ProductReadingResponse = {
  ...delivered,
  state: 'partial_evidence',
  messageCode: 'READING_EVIDENCE_PARTIAL',
};
function fixture(hour: number) {
  const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot({
    calendarType: 'solar',
    date: { year: 1984, month: 1, day: 7 },
    time: { known: true, hour, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  }, { now }).snapshot;
  const interpretation = runInterpretation(snapshot, registry, { now, requestId: 'n12-'+hour });
  const composition = buildReadingCompositionEvidence(snapshot, interpretation, registry, {
    requestId: 'n12-'+hour,
    intent: {domain:'general', temporalScope:'natal'},
  });
  return { snapshotId:snapshot.snapshotId, interpretation, selection:composition.selection };
}
describe('N12 minimum useful General Natal shadow is not a technical coverage or semantic admission', () => {
  it('classifies actual different natal charts without admitting broad generic themes', () => {
    for (const hour of [0,12,19]) {
      const evidence = fixture(hour);
      const report = evaluateGeneralNatalMurShadowV1({...evidence,response:delivered});
      expect(report).toMatchObject({
        lifecycle:'internal_quality_shadow',
        technicalDelivered:true,
        usefulComplete:false,
        mayChangeProductDelivery:false,
        mayApproveResearchSemantics:false,
        mayPublish:false,
        maySell:false,
      });
      expect(report.reasons).toContain('CORE_PATTERN_NOT_EXPLICITLY_ADMITTED');
      expect(report.state).not.toBe('useful_complete');
    }
  });

  it('keeps partial delivery and different-snapshot evidence from silently passing', () => {
    const evidence = fixture(12);
    expect(evaluateGeneralNatalMurShadowV1({...evidence,response:partial})).toMatchObject({
      technicalDelivered:false,
      usefulComplete:false,
      state:'insufficient',
    });
    expect(() => evaluateGeneralNatalMurShadowV1({...evidence, snapshotId:'wrong',response:delivered}))
      .toThrow(/identical canonical snapshot/u);
    expect(() => evaluateGeneralNatalMurShadowV1({
      ...evidence,
      response:delivered,
      selection:{...evidence.selection, selectedClaimIds:['unknown-claim-id']},
    })).toThrow(/Claim not present/u);
  });

  it('rejects fabricated core conclusions with only one upstream evidence and no admission', () => {
    const base = fixture(12);
    const existing = base.interpretation.claims.find((c) => c.state === 'active');
    if (!existing) throw new TypeError('No active real claim fixture.');
    const fake = {
      ...existing,
      claimId:'fake-unadmitted-core',
      claimType:'SYNTHESIS_UNAPPROVED_CORE',
      taxonomy:{tier:'T8' as const,category:'general',subcategory:'core_conclusion'},
      upstreamClaimRefs:[existing.claimId,existing.claimId],
    };
    const interpretation: InterpretationExecutionResult = {
      ...base.interpretation,
      claims:[...base.interpretation.claims,fake],
    };
    const selection: ReadingEvidenceSelection = {
      ...base.selection,
      selectedClaimIds:[...base.selection.selectedClaimIds,fake.claimId],
    };
    const result = evaluateGeneralNatalMurShadowV1({
      snapshotId:base.snapshotId,interpretation,selection,response:delivered,
    });
    expect(result).toMatchObject({
      candidateCoreCount:1,
      usefulComplete:false,
      state:'blocked_authority',
    });
    expect(result.reasons).toContain('CORE_UPSTREAM_EVIDENCE_NOT_INDEPENDENT');
    expect(result.reasons).toContain('CORE_CANDIDATE_RESEARCH_ONLY');
  });

  it('does not combine incomplete evidence across two ambiguous scenarios', () => {
    const base = fixture(12);
    const selected: ReadingEvidenceSelection = {
      ...base.selection,
      scenarioRefs:['scenario-a','scenario-b'],
      scenarioCoverage:[
        {scenarioRef:'scenario-a',coverageState:'partial_coverage', matchedRequirementIds:[],missingRequirements:['SYNTHESIS'],targetClaimIds:[]},
        {scenarioRef:'scenario-b',coverageState:'complete', matchedRequirementIds:['FOUNDATION','SYNTHESIS'],missingRequirements:[],targetClaimIds:[]},
      ],
    };
    const result = evaluateGeneralNatalMurShadowV1({
      ...base,selection:selected,response:delivered,
    });
    expect(result).toMatchObject({state:'ambiguous',usefulComplete:false});
    expect(result.reasons).toContain('SCENARIO_DIFFERENCES_NOT_RESOLVED');
  });
});
