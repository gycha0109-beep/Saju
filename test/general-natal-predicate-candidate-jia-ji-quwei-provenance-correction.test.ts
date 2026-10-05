import { describe, expect, it } from 'vitest';

import {
  R186_AUTHORITY,
  R186_AUTHORITY_BOUNDARY,
  R186_CHRONOLOGY_CORRECTION,
  R186_JIA_JI_QUWEI_PROVENANCE_CORRECTION_VERSION,
  R186_PROVENANCE_PROGRESS,
  R186_QUWEI_INDEXED_TEXT_WITNESS,
  R186_QUWEI_WORK_CANDIDATE,
  R186_R185_RECLASSIFICATION,
  R186_REJECTED_SHORTCUTS,
  R186_REQUIRED_FOLLOW_UP,
} from '../src/research/general-natal-predicate-candidate-jia-ji-quwei-provenance-correction.js';

describe('R186 Jia-Ji Qu Wei provenance correction', () => {
  it('binds Qu Wei Sizhuxiangzhen as an earlier attributable named-work candidate', () => {
    expect(R186_JIA_JI_QUWEI_PROVENANCE_CORRECTION_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R186_QUWEI_WORK_CANDIDATE).toEqual({
      candidateId: 'R186-P01-QUWEI-SIZHU-XIANGZHEN',
      workTitle: '四柱详真',
      attributedAuthor: '曲炜',
      workAuthorshipAttributionBound: true,
      authorOfficialBiographySurface: 'https://www.zhouyiqw.com/qwjj.php',
      authorOfficialBiographyPublicationYearStatementObserved: true,
      publicationYearCandidate: 2001,
      exactPublicationDateEstablished: false,
      publisherOrFormalImprintEstablished: false,
      formalEditionStatementEstablished: false,
      classicalOrCanonicalWork: false,
    });
  });

  it('binds the direct-rule text only at indexed PDF/OCR level', () => {
    expect(R186_QUWEI_INDEXED_TEXT_WITNESS).toMatchObject({
      exactJiaJiDirectRuleFamilyObserved: true,
      indexedPageLabelCandidateObserved: true,
      indexedPageLabelCandidate: 50,
      indexedCarrierPageCountCandidate: 118,
      pdfOrOcrTextSurfaceAccessible: true,
      physicalPageVisualVerificationAttempted: true,
      physicalPageVisualVerificationSucceeded: false,
      physicalPrintedPageBound: false,
      primaryPrintedWitnessBound: false,
      ruleOriginalAuthorshipEstablished: false,
      normativeAuthorityAcquired: false,
    });
    expect(R186_QUWEI_INDEXED_TEXT_WITNESS.exactRuleSurfaces).toContain(
      '例甲与己合而不化，以甲木合克己土来论',
    );
  });

  it('corrects the chronology without claiming rule creation', () => {
    expect(R186_CHRONOLOGY_CORRECTION).toEqual({
      r185EarliestAttributableSurfaceCandidate:
        'R185-P01-SONG-KUN-2011-10-06',
      r185EarliestObservedDisplayedDate: '2011-10-06',
      r185CandidateYear: 2011,
      earlierAttributableWorkCandidateFound: true,
      earlierWorkTitle: '四柱详真',
      earlierWorkAttributedAuthor: '曲炜',
      earlierWorkPublicationYearCandidate: 2001,
      chronologyOrderEstablishedAtYearGranularity: true,
      r185SurfaceRemainsEarliestCandidate: false,
      r185SurfaceReclassifiedAsLaterTransmissionCandidate: true,
      directDerivationFromQuWeiToSongKunEstablished: false,
      firstCreationOfRuleFamilyEstablished: false,
    });
  });

  it('reclassifies the Song Kun surface without erasing its observed metadata', () => {
    expect(R186_R185_RECLASSIFICATION).toEqual({
      r185PreviousStatus: 'EARLIEST_ATTRIBUTABLE_PUBLIC_SURFACE_CANDIDATE',
      r186CurrentStatus: 'LATER_ATTRIBUTABLE_TRANSMISSION_SURFACE_CANDIDATE',
      displayedNamePreserved: '宋坤',
      displayedDatePreserved: '2011-10-06',
      sameOrNearRuleFamilyObserved: true,
      textualDerivationChainEstablished: false,
      independentLineageEstablished: false,
      normativeWitnessCountIncreaseAuthorized: false,
    });
  });

  it('records provenance progress while leaving direct-case lineage separate', () => {
    expect(R186_PROVENANCE_PROGRESS).toEqual({
      r185EarliestAttributablePublicSurfaceCandidateEstablished: true,
      attributableNamedWorkCandidateNowEstablished: true,
      attributableWorkYearCandidateNowEstablished: true,
      chronologyImprovedFrom2011To2001WorkCandidate: true,
      workAuthorshipAttributionBound: true,
      ruleOriginalAuthorshipEstablished: false,
      exactPublicationDateEstablished: false,
      primaryPrintedWitnessEstablished: false,
      physicalTargetPageVisualVerificationComplete: false,
      directNonDayMasterCaseProvenanceStillOpen: true,
      canonicalTraditionalLineageEstablished: false,
    });
  });

  it('regression-locks chronology and provenance shortcuts', () => {
    expect(R186_AUTHORITY_BOUNDARY).toEqual({
      workPublicationYearDoesNotEqualRuleCreationYear: true,
      workAuthorshipDoesNotEqualRuleOriginalAuthorship: true,
      indexedPdfTextDoesNotEqualPhysicalPageVerification: true,
      indexedPageLabelDoesNotEqualPrintedPageBinding: true,
      modernNamedBookDoesNotEqualClassicalCanonicalAuthority: true,
      earlierChronologyDoesNotEqualNormativeAdmission: true,
      laterSimilarTextDoesNotProveDirectCopying: true,
      ruleFamilyProvenanceDoesNotResolveDirectCaseProvenance: true,
    });
    expect(R186_REJECTED_SHORTCUTS).toContain(
      'INDEXED_PAGE_50_EQUALS_PRINTED_PAGE_50',
    );
    expect(R186_REQUIRED_FOLLOW_UP).toContain(
      'TRACE_READ01_DIRECT_NON_DAY_MASTER_CASE_SEPARATELY',
    );
  });

  it('keeps semantic and production authority closed', () => {
    expect(R186_AUTHORITY).toMatchObject({
      researchOnly: true,
      earlierAttributableNamedWorkCandidateEstablished: true,
      attributedAuthorBound: true,
      publicationYearCandidateBound: true,
      exactJiaJiDirectRuleFamilyIndexedInWork: true,
      chronologyCorrectionEstablished: true,
      r185SurfaceStillEarliestCandidate: false,
      directQuWeiToSongKunDerivationEstablished: false,
      ruleOriginalAuthorshipEstablished: false,
      firstPublicationEstablished: false,
      physicalPageVisualVerificationComplete: false,
      physicalPrintedPageBound: false,
      primaryPrintedWitnessEstablished: false,
      directNonDayMasterCaseProvenanceResolved: false,
      primaryOrCanonicalDirectMatchAuthorityObserved: false,
      pairLocalNormativeAuthorityAcquired: false,
      pairLocalInteractionOutcomeEstablished: false,
      coexistenceSettlementEstablished: false,
      exactContextSettlementEstablished: false,
      crossRelationPrecedenceAuthorized: false,
      executableResolverAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
