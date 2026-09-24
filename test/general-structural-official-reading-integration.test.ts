import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { createBusinessNatalReadingCandidateRegistry } from '../src/research/business-natal-reading-candidate.js';
import { GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE } from '../src/research/general-natal-t8-structural-summary-candidate.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-profile-authorization.js';
import { buildCanonicalReadingSemanticBundleV1 } from '../src/reading/canonical-reading-semantics.js';
import { buildPreviewSemanticQualifierBindingsV1 } from '../src/preview/preview-semantic-qualifier-projection.js';
import { buildOfficialReadingPlanV1 } from '../src/reading/official-reading-plan.js';
import { renderOfficialReadingV1 } from '../src/reading/official-reading-renderer.js';
import { buildOfficialReadingCharacterGroundingV1 } from '../src/reading/official-reading-reader-parity.js';
import {
  PRODUCT_READING_RESPONSE_VERSION,
  type ProductReadingResponse,
} from '../src/reading/product-reading-response.js';

function response(): ProductReadingResponse {
  return {
    responseId: 'reading_response_abcdef0123456789abcdef01',
    responseVersion: PRODUCT_READING_RESPONSE_VERSION,
    state: 'delivered',
    messageCode: 'READING_DELIVERED',
    requiredAction: 'none',
    reading: {
      readingId: 'preview-reading-general-structural',
      brand: { brandId: 'myeonghwa', displayName: '명화' },
      subject: {
        birthInputDisplay: {
          calendarType: 'solar',
          date: '2024-03-10',
          time: '12:00',
          timeKnown: true,
        },
        calculationState: 'resolved',
      },
      calculationSummary: {
        pillars: {
          year: { label: '년주', value: 'fixture', status: 'resolved' },
          month: { label: '월주', value: 'fixture', status: 'resolved' },
          day: { label: '일주', value: 'fixture', status: 'resolved' },
          hour: { label: '시주', value: 'fixture', status: 'resolved' },
        },
      },
      sections: [
        {
          sectionType: 'overview',
          title: '가오픈 결과',
          blocks: [{ type: 'paragraph', text: '기존 Preview consumer surface' }],
          state: 'complete',
        },
      ],
      disclosures: [
        {
          type: 'scope_limitation',
          text: '현재 범위 안에서만 설명합니다.',
        },
      ],
      generatedAt: '2026-09-23T00:00:00.000Z',
    },
  };
}

describe('admitted General structural semantics -> Official Reading -> Reader', () => {
  it('preserves the month-branch structural claim, qualifiers, and non-classification boundary end to end', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 2024, month: 3, day: 10 },
        time: { known: true, hour: 12, minute: 0 },
        sexForTraditionalCalculation: 'unspecified',
      },
      PRODUCTION_DEFAULT_CALCULATION_POLICY,
      { now: new Date('2026-09-23T00:00:00.000Z') },
    );
    const registry = createBusinessNatalReadingCandidateRegistry(
      '2026-09-23T00:00:00.000Z',
    );
    const execution = runInterpretation(snapshot, registry, {
      requestId: 'general-structural-integration',
      now: new Date('2026-09-23T00:00:00.000Z'),
    });

    const structuralClaim = execution.claims.find(
      (claim) => claim.claimType === GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
    );
    expect(structuralClaim).toBeDefined();

    const composition = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'general-structural-reading',
        intent: { domain: 'general', temporalScope: 'natal' },
      });
    expect(composition.selection.coverageState).toBe('complete');
    expect(composition.selection.targetClaimIds).toContain(structuralClaim?.claimId);
    if (composition.evidence === undefined) throw new Error('Expected General reading evidence.');

    const semanticQualifierBindings = buildPreviewSemanticQualifierBindingsV1({
      intent: { domain: 'general', temporalScope: 'natal' },
      registry,
      evidence: composition.evidence.bundle,
      targetClaimIds: composition.selection.targetClaimIds,
    });
    const semantics = buildCanonicalReadingSemanticBundleV1({
      intent: { domain: 'general', temporalScope: 'natal' },
      evidence: composition.evidence.bundle,
      targetClaimIds: composition.selection.targetClaimIds,
      semanticQualifierBindings,
    });
    const structuralUnit = semantics.units.find(
      (unit) => unit.claimType === GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
    );
    expect(structuralUnit?.role).toBe('primary');
    expect(structuralUnit?.canonicalText?.summary).toContain(
      '명식 전체의 강약이나 길흉을 확정하지 않습니다',
    );
    expect(structuralUnit?.semanticQualifiers).toEqual([
      expect.objectContaining({
        qualifierId: 'preview_qualifier_r012_month_branch_priority_v1',
        semanticScope: 'month_branch_priority_scope_boundary',
        semanticKeys: expect.arrayContaining([
          'MONTH_BRANCH_IMPORTANCE_NOT_EXCLUSIVE_AUTHORITY',
          'TONGGEN_PRIORITY_NOT_UNIVERSAL_ROOT_ORDERING',
          'NO_NUMERIC_MONTH_BRANCH_MULTIPLIER',
          'NO_STRENGTH_CLASSIFIER',
        ]),
        provenance: expect.objectContaining({
          researchId: 'R012_MONTH_BRANCH_PRIORITY',
          researchVersion: '0.2.0-research',
          authorityState: 'VERIFIED_BOUNDED_DIRECT_VISUAL_CLOSURE_COMPLETE',
        }),
      }),
    ]);
    expect(structuralUnit?.prohibitedExtensions).toEqual(
      expect.arrayContaining([
        'classificationAuthorized',
        'fortunePolarityAuthorized',
        'numericScoringAuthorized',
        'upstreamEvidenceDirectionAsFortuneMeaningAuthorized',
        'monthBranchExclusiveAuthority',
        'universalRootOrdering',
        'numericMonthBranchMultiplier',
        'strengthClassifier',
      ]),
    );

    const plan = buildOfficialReadingPlanV1(semantics);
    const report = renderOfficialReadingV1(semantics, plan);
    expect(JSON.stringify(report.sections)).toContain(structuralUnit?.canonicalText?.headline);
    const reportJson = JSON.stringify(report.sections);
    expect(reportJson).toContain(
      '명식 전체의 강약이나 길흉을 확정하지 않습니다',
    );
    expect(reportJson).toContain(
      '월지는 명식을 읽을 때 중요한 구조축으로 보되',
    );
    expect(reportJson).not.toContain('MONTH_BRANCH_IMPORTANCE_NOT_EXCLUSIVE_AUTHORITY');
    expect(reportJson).not.toContain('monthBranchExclusiveAuthority');

    const reader = buildOfficialReadingCharacterGroundingV1({
      response: response(),
      semanticBundle: semantics,
      officialReadingReport: report,
      engineVersion: 'general-structural-integration-v1',
    });
    const readerUnit = reader.grounding.units.find(
      (unit) => unit.sourceCanonicalUnitRefs.includes(structuralUnit?.unitId ?? ''),
    );
    expect(readerUnit?.axis).toBe('structure');
    expect(readerUnit?.canonicalMeaning).toContain(
      structuralUnit?.canonicalText?.summary ?? '',
    );
    expect(readerUnit?.canonicalMeaning).toContain(
      '월지는 명식을 읽을 때 중요한 구조축으로 보되',
    );
    expect(readerUnit?.qualifiers).toEqual(
      expect.arrayContaining([
        'month_branch_relation_is_one_structural_axis',
        'overall_strength_not_determined',
        'fortune_polarity_not_determined',
        'MONTH_BRANCH_IMPORTANCE_NOT_EXCLUSIVE_AUTHORITY',
        'TONGGEN_PRIORITY_NOT_UNIVERSAL_ROOT_ORDERING',
      ]),
    );
    expect(readerUnit?.prohibitedExtensions).toEqual(
      expect.arrayContaining([
        'classificationAuthorized',
        'fortunePolarityAuthorized',
        'numericScoringAuthorized',
        'monthBranchExclusiveAuthority',
        'universalRootOrdering',
        'numericMonthBranchMultiplier',
        'strengthClassifier',
      ]),
    );
    expect(reader.parity.semanticHash).toBe(report.sourceSemanticHash);
  });
});
