import { describe, expect, it } from 'vitest';
import {
  assertIssuedEyePairFR175ExactScanPagePinningFR181,
  FR181_NEXT_FRONTIER,
  FR181_REMAINING_BLOCKERS,
  FR181_RESEARCH_NOTE_REF,
  FR181_VERDICT,
  FR181_VISUAL_CHECKER_REF,
  issueEyePairFR175ExactScanPagePinningFR181,
  type EyePairFR175ExactScanPagePinningFR181V1,
} from './eye-pair-fr175-exact-scan-page-pinning-fr181.js';

function forgedFR181(): EyePairFR175ExactScanPagePinningFR181V1 {
  return Object.freeze({}) as unknown as EyePairFR175ExactScanPagePinningFR181V1;
}

describe('FR181 FR175 exact scan-page pinning', () => {
  it('keeps the historical FR175 unresolved locator immutable while consuming the exact FR180 frontier', () => {
    const result = issueEyePairFR175ExactScanPagePinningFR181();

    expect(result.upstreamAuthority).toEqual({
      fr180Verdict: 'OPERATIONALIZATION_REQUIREMENTS_DEFINED_TRADITIONAL_BINDING_NOT_ADMITTED',
      fr180NextFrontier: 'acquire_and_pin_exact_fr175_monitoring_officer_eye_passage_scan_page_before_any_xi_chang_calibration',
      fr175HistoricalDirectPassage: '眼須要含藏不露。黑白分明。瞳子端定。光彩射人。或細長極寸。乃為監察官成。',
      fr175HistoricalScanPageWindow: [87, 88],
      fr175HistoricalExactScanPage: null,
      fr175HistoricalExactScanPageResolved: false,
      fr175HistoricalScanCheckedPromotionAuthorized: false,
      fr103MouthVisualMatchReusedAsEyeVisualMatch: false,
    });
  });

  it('pins the immutable NLC source identity and exact visually matched page 88', () => {
    const result = issueEyePairFR175ExactScanPagePinningFR181();

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
    expect(result.visualReview).toMatchObject({
      reviewMode: 'direct_interactive_visual_review_of_repository_frozen_page_images',
      reviewedPageRefs: [
        'packages/face-reading/evidence/fr103/nlc-1925-page-87.png#sha256:9a3cbda77616c6c359e2aaca173d8f4d3c7ef867449247d9d3887847d9882073',
        'packages/face-reading/evidence/fr103/nlc-1925-page-88.png#sha256:5ceedcabaa806ab2a4a55a1923681b5b7b246b01c62af42ee8ba56413d207fce',
      ],
      page87Finding: 'five_officer_introduction_and_officer_sequence_without_full_fr175_target_passage',
      page88Finding: 'exact_fr175_monitoring_officer_direct_passage_visible',
      selectedExactScanPage: 88,
      selectedImmutablePageImageRef: 'packages/face-reading/evidence/fr103/nlc-1925-page-88.png#sha256:5ceedcabaa806ab2a4a55a1923681b5b7b246b01c62af42ee8ba56413d207fce',
      visuallyMatchedText: '眼須要含藏不露。黑白分明。瞳子端定。光彩射人。或細長極寸。乃為監察官成。',
      visualPassageMatchConfirmed: true,
      checkerRef: FR181_VISUAL_CHECKER_REF,
      fr103MouthCheckerReused: false,
      ocrUsedForEvidenceAdmission: false,
      searchIndexUsedForEvidenceAdmission: false,
      translationUsedAsAuthority: false,
      secondarySourceUsedAsAuthority: false,
    });
  });

  it('resolves only the FR175 locator gap, not scan-checked or double-checked promotion', () => {
    const result = issueEyePairFR175ExactScanPagePinningFR181();

    expect(result.locatorClosure).toEqual({
      exactEyePassageScanPage: 88,
      exactEyePassageScanPageResolved: true,
      locatorGapResolved: true,
      selectedPageInsideHistoricalWindow: true,
      immutablePageImagePinned: true,
      baseRegistryInsertionAuthorized: false,
      pageVerificationRecordAuthorized: false,
      scanCheckedEyePassagePromotionAuthorized: false,
      doubleCheckedSourceAuthorized: false,
      methodologyProductionPromotionAuthorized: false,
    });
    expect(result.resolvedBlockers).toEqual(['fr175_exact_eye_passage_scan_page_not_pinned']);
    expect(result.remainingBlockers).toBe(FR181_REMAINING_BLOCKERS);
    expect(result.remainingBlockers).not.toContain('fr175_exact_eye_passage_scan_page_not_pinned');
    expect(result.remainingBlockers).toContain('fr176_exact_daruma_eye_scan_page_not_pinned');
  });

  it('keeps all semantic, calibration, classifier, output, Production, and biometric authority closed', () => {
    const result = issueEyePairFR175ExactScanPagePinningFR181();

    expect(result.authorityBoundary).toEqual({
      exactPageMeansTraditionalXi: false,
      exactPageMeansTraditionalChang: false,
      directPassageMeansMetricDirectionality: false,
      directPassageMeansThreshold: false,
      directPassageMeansCalibrationEvidence: false,
      directPassageMeansCalibrationProtocol: false,
      directPassageMeansTraditionalJi: false,
      directPassageMeansTraditionalCun: false,
      exactPageMeansCompoundXiErChangRule: false,
      visualMatchMeansScanCheckedRegistryPromotion: false,
      singleVisualCheckerMeansDoubleChecked: false,
      thresholdIssued: false,
      classifierIssued: false,
      scoreIssued: false,
      rankIssued: false,
      calibrationIssued: false,
      morphologyProduced: false,
      criterionStatesIssued: 0,
      structuredClaimsIssued: 0,
      boundedNarrativesIssued: 0,
      productionRuleAuthorized: false,
      traditionalSemanticAuthorityPromoted: false,
    });
    expect(Object.values(result.privacyBoundary).every((value) => value === false)).toBe(true);
  });

  it('issues the locator-only verdict and advances only to FR176 exact scan-page acquisition', () => {
    const result = issueEyePairFR175ExactScanPagePinningFR181();

    expect(result.verdict).toBe(FR181_VERDICT);
    expect(FR181_VERDICT).toBe('FR175_EYE_PASSAGE_EXACT_SCAN_PAGE_PINNED_LOCATOR_ONLY');
    expect(result.researchNoteRef).toBe(FR181_RESEARCH_NOTE_REF);
    expect(FR181_RESEARCH_NOTE_REF).toBe('repo:research/face-reading/fr181-fr175-eye-passage-exact-scan-page-pinning.md');
    expect(result.nextFrontier).toBe(FR181_NEXT_FRONTIER);
    expect(FR181_NEXT_FRONTIER).toBe(
      'acquire_and_pin_exact_fr176_daruma_eye_scan_page_before_any_xi_chang_calibration',
    );
    expect(() => assertIssuedEyePairFR175ExactScanPagePinningFR181(result)).not.toThrow();
    expect(() => assertIssuedEyePairFR175ExactScanPagePinningFR181(forgedFR181())).toThrow(/not issued/u);
  });
});
