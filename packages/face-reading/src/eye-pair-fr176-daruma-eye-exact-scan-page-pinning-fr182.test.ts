import { describe, expect, it } from 'vitest';
import {
  assertFR182AuthorityBoundary,
  assertFR182FrozenEvidenceManifest,
  assertIssuedEyePairFR176DarumaEyeExactScanPagePinningFR182,
  FR182_FROZEN_EVIDENCE_MANIFEST,
  FR182_NEXT_FRONTIER,
  FR182_PAGE_146_IMAGE_SHA256,
  FR182_PAGE_146_REF,
  FR182_REMAINING_BLOCKERS,
  FR182_RESEARCH_NOTE_REF,
  FR182_VERDICT,
  FR182_VISUAL_CHECKER_REF,
  issueEyePairFR176DarumaEyeExactScanPagePinningFR182,
  type DarumaEyeFrozenEvidenceManifestFR182V1,
  type EyePairFR176DarumaEyeExactScanPagePinningFR182V1,
  type FR182AuthorityBoundaryV1,
} from './eye-pair-fr176-daruma-eye-exact-scan-page-pinning-fr182.js';

function forgedFR182(): EyePairFR176DarumaEyeExactScanPagePinningFR182V1 {
  return Object.freeze({}) as unknown as EyePairFR176DarumaEyeExactScanPagePinningFR182V1;
}

function forgedManifest(
  overrides: Record<string, unknown>,
): DarumaEyeFrozenEvidenceManifestFR182V1 {
  return Object.freeze({
    ...FR182_FROZEN_EVIDENCE_MANIFEST,
    ...overrides,
  }) as unknown as DarumaEyeFrozenEvidenceManifestFR182V1;
}

describe('FR182 FR176 Daruma Eye exact scan-page pinning', () => {
  it('keeps FR176 historical locator state immutable while consuming the exact FR181 frontier', () => {
    const result = issueEyePairFR176DarumaEyeExactScanPagePinningFR182();

    expect(result.upstreamAuthority).toEqual({
      fr181Verdict: 'FR175_EYE_PASSAGE_EXACT_SCAN_PAGE_PINNED_LOCATOR_ONLY',
      fr181NextFrontier: 'acquire_and_pin_exact_fr176_daruma_eye_scan_page_before_any_xi_chang_calibration',
      fr181ExactEyePassageScanPage: 88,
      fr176Verdict: 'SOURCE_SEMANTIC_NOT_COMPATIBLE_WITH_CURRENT_OBSERVATION',
      fr176NextFrontier: 'review_governed_role_invariant_eye_aperture_or_aspect_ratio_neutral_metric_feasibility_from_repeated_direct_source_need_without_semantic_thresholds',
      fr176HistoricalSection: '卷三 / 達摩相眼',
      fr176HistoricalSelectedClauses: ['秀而正', '細而長', '目大而光', '目有三角', '目長一寸', '目尾相垂'],
      fr176HistoricalExactDarumaEyeScanPage: null,
      fr176HistoricalExactDarumaEyeScanPageResolved: false,
      fr176HistoricalImmutableScanEvidenceAvailable: false,
      fr176HistoricalScanCheckedPromotionAuthorized: false,
    });
  });

  it('pins only the fixed NLC witness page 146 and immutable render digest', () => {
    const result = issueEyePairFR176DarumaEyeExactScanPagePinningFR182();

    expect(result.sourceIdentity).toEqual({
      workRef: 'work.shenxiang_quanbian',
      witnessId: 'witness.shenxiang_quanbian.nlc_1925',
      editionLabel: '文明書局 民國十四年本 — NLC scan',
      publicationYear: 1925,
      holdingInstitution: '國家圖書館',
      sourceFilePageRef: 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf',
      sourcePdfSha256: 'sha256:94167d8d19d47525535b39e18a20c6b315a3a30751c2063bc2492760f1d927af',
      sourcePdfPageCount: 576,
      sourceIdentityUnchanged: true,
    });
    expect(result.visualReview).toEqual({
      reviewMode: 'direct_interactive_visual_review_of_fixed_witness_render',
      reviewedPageWindow: [145, 147],
      page145Finding: 'preceding_xiang_mu_lun_context_without_fr176_daruma_eye_heading',
      page146Finding: 'exact_daruma_eye_heading_and_all_six_fr176_selected_clauses_visible',
      page147Finding: 'subsequent_eye_interpretation_continuation_after_fr176_target_page',
      selectedExactScanPage: 146,
      selectedImmutablePageImageRef: FR182_PAGE_146_REF,
      selectedImmutablePageImageSha256: FR182_PAGE_146_IMAGE_SHA256,
      visibleHeading: '達摩相眼',
      visuallyMatchedClauses: ['秀而正', '細而長', '目大而光', '目有三角', '目長一寸', '目尾相垂'],
      allSelectedClausesVisible: true,
      checkerRef: FR182_VISUAL_CHECKER_REF,
      ocrUsedForEvidenceAdmission: false,
      searchIndexUsedForEvidenceAdmission: false,
      translationUsedAsAuthority: false,
      secondarySourceUsedAsAuthority: false,
    });
    expect(result.locatorClosure).toEqual({
      exactDarumaEyeScanPage: 146,
      exactDarumaEyeScanPageResolved: true,
      locatorGapResolved: true,
      immutablePageImagePinned: true,
      baseRegistryInsertionAuthorized: false,
      pageVerificationRecordAuthorized: false,
      scanCheckedDarumaEyePassagePromotionAuthorized: false,
      doubleCheckedSourceAuthorized: false,
      methodologyProductionPromotionAuthorized: false,
    });
  });

  it('rejects witness, PDF, page-window, exact-page, image-digest, heading, and selected-clause drift', () => {
    expect(() => assertFR182FrozenEvidenceManifest(FR182_FROZEN_EVIDENCE_MANIFEST)).not.toThrow();

    const invalidManifests = [
      forgedManifest({ witnessId: 'witness.shenxiang_quanbian.other' }),
      forgedManifest({ sourcePdfSha256: 'sha256:wrong' }),
      forgedManifest({ sourcePdfPageCount: 575 }),
      forgedManifest({ reviewedPageWindow: [144, 147] }),
      forgedManifest({ exactScanPage: 145 }),
      forgedManifest({ immutablePageImageSha256: 'sha256:wrong' }),
      forgedManifest({ visibleHeading: '達磨相眼' }),
      forgedManifest({ visuallyMatchedClauses: ['秀而正', '細且長', '目大而光', '目有三角', '目長一寸', '目尾相垂'] }),
      forgedManifest({ ocrUsedForEvidenceAdmission: true }),
      forgedManifest({ searchIndexUsedForEvidenceAdmission: true }),
    ];

    for (const manifest of invalidManifests) {
      expect(() => assertFR182FrozenEvidenceManifest(manifest)).toThrow(/manifest drift/u);
    }
  });

  it('resolves exactly the FR176 locator blocker and preserves all remaining FR180 blockers', () => {
    const result = issueEyePairFR176DarumaEyeExactScanPagePinningFR182();

    expect(result.resolvedBlockers).toEqual(['fr176_exact_daruma_eye_scan_page_not_pinned']);
    expect(result.remainingBlockers).toBe(FR182_REMAINING_BLOCKERS);
    expect(result.remainingBlockers).not.toContain('fr176_exact_daruma_eye_scan_page_not_pinned');
    expect(result.remainingBlockers).toEqual([
      'xi_metric_to_source_concept_mapping_not_authorized',
      'xi_metric_directionality_not_governed',
      'xi_stable_criterion_identity_not_issued',
      'xi_criterion_specific_calibration_evidence_absent',
      'xi_criterion_specific_calibration_protocol_absent',
      'xi_calibrated_decision_rule_absent',
      'chang_metric_to_source_concept_mapping_not_authorized',
      'chang_metric_directionality_not_governed',
      'chang_stable_criterion_identity_not_issued',
      'chang_criterion_specific_calibration_evidence_absent',
      'chang_criterion_specific_calibration_protocol_absent',
      'chang_calibrated_decision_rule_absent',
      'compound_xi_er_chang_composition_rule_not_authorized',
    ]);
  });

  it('rejects semantic, calibration, registry, output, Production, laterality, and biometric authority widening', () => {
    const result = issueEyePairFR176DarumaEyeExactScanPagePinningFR182();
    expect(() => assertFR182AuthorityBoundary(result.authorityBoundary)).not.toThrow();

    const widenedBoundary = {
      ...result.authorityBoundary,
      thresholdIssued: true,
    } as unknown as FR182AuthorityBoundaryV1;
    expect(() => assertFR182AuthorityBoundary(widenedBoundary)).toThrow(/authority widening/u);

    expect(result.authorityBoundary).toEqual({
      thinMetricBindingAuthorized: false,
      longMetricBindingAuthorized: false,
      metricDirectionalityAuthorized: false,
      thresholdIssued: false,
      percentileIssued: false,
      referencePopulationIssued: false,
      calibrationEvidenceIssued: false,
      calibrationProtocolIssued: false,
      decisionRuleIssued: false,
      classifierIssued: false,
      scoreIssued: false,
      rankIssued: false,
      traditionalJiOperationalizationAuthorized: false,
      traditionalCunMappingAuthorized: false,
      compoundXiErChangRuleAuthorized: false,
      morphologyProduced: false,
      criterionStatesIssued: 0,
      structuredClaimsIssued: 0,
      boundedNarrativesIssued: 0,
      scanCheckedRegistryPromotionAuthorized: false,
      doubleCheckedSourceAuthorized: false,
      anatomicalLateralityResolved: false,
      individualEyeAsymmetryOutputAuthorized: false,
      productionRuleAuthorized: false,
      traditionalSemanticAuthorityPromoted: false,
    });
    expect(Object.values(result.privacyBoundary).every((value) => value === false)).toBe(true);
    expect(result.privacyBoundary.biometricIdentityMatchingPerformed).toBe(false);
  });

  it('issues only the locator provenance verdict and remains fail-closed', () => {
    const result = issueEyePairFR176DarumaEyeExactScanPagePinningFR182();

    expect(result.verdict).toBe(FR182_VERDICT);
    expect(FR182_VERDICT).toBe('FR176_DARUMA_EYE_EXACT_SCAN_PAGE_PINNED_LOCATOR_ONLY');
    expect(result.researchNoteRef).toBe(FR182_RESEARCH_NOTE_REF);
    expect(FR182_RESEARCH_NOTE_REF).toBe('repo:research/face-reading/fr182-fr176-daruma-eye-exact-scan-page-pinning.md');
    expect(result.nextFrontier).toBe(FR182_NEXT_FRONTIER);
    expect(FR182_NEXT_FRONTIER).toBe(
      'review_fr180_xi_chang_operationalization_requirements_with_both_exact_source_pages_pinned_while_traditional_binding_remains_not_admitted',
    );
    expect(() => assertIssuedEyePairFR176DarumaEyeExactScanPagePinningFR182(result)).not.toThrow();
    expect(() => assertIssuedEyePairFR176DarumaEyeExactScanPagePinningFR182(forgedFR182())).toThrow(/not issued/u);
  });
});
