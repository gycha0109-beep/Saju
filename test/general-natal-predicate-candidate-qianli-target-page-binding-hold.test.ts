import { describe, expect, it } from 'vitest';

import {
  R182_ADMISSION_GUARDS,
  R182_AUTHORITY,
  R182_HOLD,
  R182_LOCATOR_RECONCILIATION,
  R182_PAGE_LOCATOR_CANDIDATES,
  R182_PHYSICAL_ACCESS_ATTEMPTS,
  R182_QIANLI_TARGET_PAGE_BINDING_HOLD_VERSION,
  R182_REJECTED_SHORTCUTS,
  R182_REQUIRED_FOLLOW_UP,
  R182_TARGET_SURFACE_AUDIT,
} from '../src/research/general-natal-predicate-candidate-qianli-target-page-binding-hold.js';

describe('R182 Qianli target-page binding hold', () => {
  it('records two failed visual acquisition attempts without inventing a page binding', () => {
    expect(R182_QIANLI_TARGET_PAGE_BINDING_HOLD_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R182_PHYSICAL_ACCESS_ATTEMPTS).toHaveLength(2);
    for (const attempt of R182_PHYSICAL_ACCESS_ATTEMPTS) {
      expect(attempt.pageScreenshotAttempted).toBe(true);
      expect(attempt.pageScreenshotSucceeded).toBe(false);
      expect(attempt.acquisitionFailureClass).toBe('PAGE_RENDER_CACHE_MISS');
      expect(attempt.targetPageVisualVerificationComplete).toBe(false);
      expect(attempt.targetPrintedPageBound).toBe(false);
    }
    expect(R182_PHYSICAL_ACCESS_ATTEMPTS[0]).toMatchObject({
      physicalEditionIdentityMatchesR181: true,
      pdfPageCountReported: 123,
      carrierPageCountReported: 116,
    });
  });

  it('keeps page-like OCR locators as unverified candidates only', () => {
    expect(R182_PAGE_LOCATOR_CANDIDATES).toEqual([
      expect.objectContaining({
        reportedLocatorValue: 125,
        mappedToR181NlcPdfPage: false,
        mappedToR181PrintedPage: false,
        visuallyVerified: false,
      }),
      expect.objectContaining({
        reportedLocatorValue: 183,
        mappedToR181NlcPdfPage: false,
        mappedToR181PrintedPage: false,
        visuallyVerified: false,
      }),
    ]);
    expect(R182_LOCATOR_RECONCILIATION).toEqual({
      r181NlcPdfPageCount: 123,
      r181CarrierPageCount: 116,
      externalLocatorCandidateValues: [125, 183],
      locatorCandidatesShareOneNumberingSystem: false,
      anyLocatorMappedToNlcPdfPage: false,
      anyLocatorMappedToNlcPrintedPage: false,
      locatorCandidateMayBeUsedAsPhysicalBinding: false,
    });
  });

  it('preserves R181 target surfaces while leaving the primary page unbound', () => {
    expect(R182_TARGET_SURFACE_AUDIT).toMatchObject({
      sectionTitle: '干合而化',
      exactNonDayMasterNatalPairSurface: '若甲年己月，只合而不化也',
      r181PhysicalEditionCandidateBound: true,
      r181TargetPageVisualVerificationComplete: false,
      r182TargetPageVisualVerificationComplete: false,
      r182TargetPrintedPageBound: false,
      r182PrimaryPublicationTargetSurfaceBound: false,
    });
  });

  it('establishes a fail-closed access hold rather than negative textual evidence', () => {
    expect(R182_HOLD).toEqual({
      holdId: 'R182-H01-QIANLI-TARGET-PAGE-ACCESS-SURFACE',
      decision:
        'QIANLI_TARGET_PAGE_BINDING_BLOCKED_BY_CURRENT_ACCESS_SURFACE',
      exactTargetSurfaceCandidateStillSupportedByTranscription: true,
      physicalEditionIdentityStillSupported: true,
      physicalTargetPageBindingEstablished: false,
      absenceOfBindingIsNegativeTextualEvidence: false,
      repeatedSameSurfaceSearchAuthorizedAsProgress: false,
      alternateAcquisitionSurfaceRequiredForPageBinding: true,
      nextResearchMayProceedOnIndependentRequirement: true,
    });
  });

  it('regression-locks page-binding admission guards', () => {
    expect(R182_ADMISSION_GUARDS).toEqual({
      pageMarkerDoesNotEqualPrintedPageBinding: true,
      searchIndexDoesNotEqualVisualVerification: true,
      pdfPageCountDoesNotEqualCarrierPageCount: true,
      alternateEditionLocatorDoesNotMapToNlcScanByNumber: true,
      screenshotFailureDoesNotEqualTextAbsence: true,
      accessFailureDoesNotInvalidateR181TranscriptionCandidate: true,
      targetSurfaceCandidateDoesNotEqualNormativeAdmission: true,
    });
    expect(R182_REJECTED_SHORTCUTS).toContain(
      'CACHE_MISS_EQUALS_TEXT_NOT_PRESENT',
    );
    expect(R182_REQUIRED_FOLLOW_UP).toContain(
      'ALTERNATE_ACCESS_TO_NLC_SCAN_PAGE_IMAGES',
    );
  });

  it('leaves semantic and production authority closed', () => {
    expect(R182_AUTHORITY).toMatchObject({
      researchOnly: true,
      physicalEditionIdentityBound: true,
      targetSurfaceCandidatePreserved: true,
      pageLocatorCandidatesBound: true,
      targetPageVisualVerificationComplete: false,
      targetPrintedPageBound: false,
      primaryPublicationTargetSurfaceBound: false,
      pairLocalNormativeAuthorityAcquired: false,
      pairLocalInteractionOutcomeEstablished: false,
      jiaJiBindingEstablished: false,
      jiaJiTransformationEstablished: false,
      jiaJiNoEffectEstablished: false,
      coexistenceSettlementEstablished: false,
      exactContextSettlementEstablished: false,
      crossRelationPrecedenceAuthorized: false,
      settlementEstablished: false,
      executableResolverAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
