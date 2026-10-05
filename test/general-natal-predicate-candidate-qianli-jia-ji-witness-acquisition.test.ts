import { describe, expect, it } from 'vitest';

import {
  R181_ADMISSION_GUARDS,
  R181_AUTHORITY,
  R181_DISCOVERY_AUDIT,
  R181_GOVERNANCE,
  R181_KE_HE_COMPETITION_METHOD_CANDIDATE,
  R181_PUBLIC_TRANSCRIPTION_WITNESSES,
  R181_QIANLI_JIA_JI_WITNESS_ACQUISITION_VERSION,
  R181_QIANLI_PHYSICAL_EDITION_CANDIDATE,
  R181_QIANLI_TARGET_SURFACES,
  R181_R180_REQUIREMENT_REASSESSMENT,
  R181_REJECTED_SHORTCUTS,
  R181_REQUIRED_FOLLOW_UP,
} from '../src/research/general-natal-predicate-candidate-qianli-jia-ji-witness-acquisition.js';

describe('R181 Qianli Jia-Ji witness acquisition', () => {
  it('binds the 1935 Qianli physical-edition candidate without pretending to bind the target page', () => {
    expect(R181_QIANLI_JIA_JI_WITNESS_ACQUISITION_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R181_QIANLI_PHYSICAL_EDITION_CANDIDATE).toMatchObject({
      candidateId: 'R181-C01-NLC-QIANLI-MINGGAO-1935',
      workTitle: '千里命稿',
      attributedAuthor: '韋千里',
      publisherLabel: '韋氏命苑',
      publicationDateLabel: '民國24[1935]',
      sourceInstitution: 'National Library of China',
      nlcFileId: 'NLC416-01jh000372-10197',
      physicalEditionIdentityBound: true,
      targetSurfaceIndexedOutsideScan: true,
      targetPageVisualVerificationComplete: false,
      targetPrintedPageBound: false,
      primaryPublicationSurfaceBound: false,
      normativeAuthorityAcquired: false,
    });
  });

  it('preserves the exact non-day-master candidate language while withholding outcome authority', () => {
    expect(R181_QIANLI_TARGET_SURFACES).toMatchObject({
      sectionTitle: '干合而化',
      exactNonDayMasterNatalPairSurface: '若甲年己月，只合而不化也',
      exactNonDayMasterNatalPairMeaning:
        'NON_DAY_MASTER_JIA_JI_COMBINATION_WITHOUT_TRANSFORMATION',
      exactNonDayMasterLuckMeaning:
        'NON_JIA_DAY_MASTER_WITH_OTHER_JIA_AND_JI_LUCK_OR_YEAR_DOES_NOT_TRANSFORM',
      exactPairIdentity: ['甲', '己'],
      establishesCombinationWithoutTransformationLanguage: true,
      establishesGenericBindingVerdict: false,
      establishesNoEffectVerdict: false,
      establishesPostCombinationSubjectIdentity: false,
    });
    expect(R181_QIANLI_TARGET_SURFACES.sourceContextDimensionLabels).toEqual([
      '時令',
      '賓主',
      '明暗',
      '地位',
      '歲運',
    ]);
  });

  it('tracks public transcriptions as candidates rather than physical witnesses', () => {
    expect(R181_PUBLIC_TRANSCRIPTION_WITNESSES).toHaveLength(2);
    for (const witness of R181_PUBLIC_TRANSCRIPTION_WITNESSES) {
      expect(witness).toMatchObject({
        exactNonDayMasterNatalPairSurfaceObserved: true,
        exactNonDayMasterLuckSurfaceObserved: true,
        genericKeHeCompetitionSectionObserved: true,
        physicalEditionIdentityBoundByThisWitness: false,
        targetPrintedPageBound: false,
        lineageIndependenceEstablished: false,
        normativeAuthorityAcquired: false,
      });
    }
  });

  it('keeps the generic Ke-He competition method separate from exact Jia-Ji settlement', () => {
    expect(R181_KE_HE_COMPETITION_METHOD_CANDIDATE).toEqual({
      sectionTitle: '干克干合並見',
      methodSurfaceObserved: true,
      positionConditionObserved: true,
      controllerControlledDirectionObserved: true,
      strengthConditionObserved: true,
      examplesUseExactJiaJiPair: false,
      exactJiaJiOutcomeEstablished: false,
      genericCrossRelationPrecedenceAuthorized: false,
      directTransferToR177JiaJiAuthorized: false,
    });
  });

  it('reassesses all six R180 requirements without closing any one of them', () => {
    expect(R181_R180_REQUIREMENT_REASSESSMENT).toHaveLength(6);
    expect(
      R181_R180_REQUIREMENT_REASSESSMENT.filter(
        (item) => item.acquisitionCandidateNowAvailable,
      ).length,
    ).toBe(4);
    expect(
      R181_R180_REQUIREMENT_REASSESSMENT.filter(
        (item) => item.normativeAuthoritySatisfied,
      ),
    ).toHaveLength(0);
    expect(
      R181_R180_REQUIREMENT_REASSESSMENT.find(
        (item) =>
          item.requirementId === 'EXACT_NON_DAY_MASTER_JIA_JI_INTERACTION_SOURCE',
      ),
    ).toMatchObject({
      acquisitionCandidateNowAvailable: true,
      exactPairLanguageCandidateAvailable: true,
      physicalTargetPageBound: false,
      normativeAuthoritySatisfied: false,
      nextGap: 'PHYSICAL_SCAN_TARGET_PAGE_BINDING',
    });
  });

  it('summarizes a real discovery advance with zero authority promotion', () => {
    expect(R181_DISCOVERY_AUDIT).toEqual({
      r180ExternalDiscoveryRequired: true,
      physicalEditionCandidateCount: 1,
      publicTranscriptionWitnessCount: 2,
      witnessesReportingExactNonDayMasterNatalPairSurface: 2,
      witnessesReportingExactNonDayMasterLuckSurface: 2,
      witnessesReportingGenericKeHeCompetitionSection: 2,
      targetPageVisualVerificationCompleteCount: 0,
      targetPrintedPageBoundCount: 0,
      normativeAuthoritySatisfiedRequirementCount: 0,
    });
  });

  it('regression-locks admission guards and production closure', () => {
    expect(R181_ADMISSION_GUARDS).toEqual({
      catalogIdentityDoesNotEqualTargetPageBinding: true,
      publicTranscriptionDoesNotEqualPhysicalPageVerification: true,
      transcriptionMultiplicityDoesNotEstablishLineageIndependence: true,
      nonTransformationDoesNotEqualNoEffect: true,
      nonTransformationDoesNotEqualGenericBinding: true,
      genericKeHeMethodDoesNotEqualExactJiaJiSettlement: true,
      contextDimensionListDoesNotEqualSufficientConditionSet: true,
      sourceCandidateDoesNotEqualProductionAuthority: true,
    });
    expect(R181_REJECTED_SHORTCUTS).toContain(
      'GENERIC_KE_HE_METHOD_EQUALS_EXACT_JIA_JI_PRECEDENCE',
    );
    expect(R181_REQUIRED_FOLLOW_UP).toContain(
      'QIANLI_1935_TARGET_PAGE_VISUAL_BINDING',
    );
    expect(R181_GOVERNANCE).toEqual({
      r180RepositoryGapPreserved: true,
      externalCandidateDiscoveryProgressEstablished: true,
      physicalEditionIdentityDistinctFromTargetSurfaceBinding: true,
      exactNonDayMasterLanguageCandidateDistinctFromNormativeAdmission: true,
      exactPairCombinationWithoutTransformationLanguagePreserved: true,
      genericCompetitionMethodKeptOutOfExactPairSettlement: true,
      normativeAuthorityStillClosedPendingPhysicalBinding: true,
    });
    expect(R181_AUTHORITY).toMatchObject({
      researchOnly: true,
      qianli1935PhysicalEditionCandidateBound: true,
      exactNonDayMasterJiaJiLanguageCandidateBound: true,
      exactNonDayMasterJiaLuckJiLanguageCandidateBound: true,
      genericKeHeCompetitionMethodCandidateBound: true,
      targetPageVisualVerificationComplete: false,
      targetPrintedPageBound: false,
      primaryPublicationTargetSurfaceBound: false,
      lineageIndependenceEstablished: false,
      pairLocalNormativeAuthorityAcquired: false,
      pairLocalInteractionOutcomeEstablished: false,
      jiaJiBindingEstablished: false,
      jiaJiTransformationEstablished: false,
      jiaJiNoEffectEstablished: false,
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
