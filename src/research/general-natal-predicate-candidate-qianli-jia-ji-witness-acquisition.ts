import {
  R180_AUTHORITY,
  R180_REQUIREMENT_COVERAGE,
} from './general-natal-predicate-candidate-jia-ji-repository-evidence-coverage-audit.js';

export const R181_QIANLI_JIA_JI_WITNESS_ACQUISITION_VERSION =
  '0.1.0-research' as const;

export const R181_QIANLI_PHYSICAL_EDITION_CANDIDATE = Object.freeze({
  candidateId: 'R181-C01-NLC-QIANLI-MINGGAO-1935',
  workTitle: '千里命稿' as const,
  attributedAuthor: '韋千里' as const,
  publisherLabel: '韋氏命苑' as const,
  publicationDateLabel: '民國24[1935]' as const,
  sourceInstitution: 'National Library of China' as const,
  nlcFileId: 'NLC416-01jh000372-10197' as const,
  publicScanMetadataUrl:
    'https://commons.wikimedia.org/wiki/File:NLC416-01jh000372-10197_%E5%8D%83%E9%87%8C%E5%91%BD%E7%A8%BF.pdf',
  publicScanPageCount: 123,
  catalogCarrierPageCount: 116,
  physicalEditionIdentityBound: true,
  targetSurfaceIndexedOutsideScan: true,
  targetPageVisualVerificationComplete: false,
  targetPrintedPageBound: false,
  primaryPublicationSurfaceBound: false,
  normativeAuthorityAcquired: false,
});

export const R181_PUBLIC_TRANSCRIPTION_WITNESSES = Object.freeze([
  Object.freeze({
    witnessId: 'R181-W01-KEEPDS-QIANLI',
    sourceLabel: 'KeepDS 千里命稿 transcription',
    sourceUrl: 'https://www.keepds.com/book/read?bo=qianliminggao',
    exactNonDayMasterNatalPairSurfaceObserved: true,
    exactNonDayMasterLuckSurfaceObserved: true,
    genericKeHeCompetitionSectionObserved: true,
    physicalEditionIdentityBoundByThisWitness: false,
    targetPrintedPageBound: false,
    lineageIndependenceEstablished: false,
    normativeAuthorityAcquired: false,
  }),
  Object.freeze({
    witnessId: 'R181-W02-SUANZHUN-QIANLI',
    sourceLabel: '算准网 千里命稿 transcription',
    sourceUrl: 'https://www.suanzhun.net/book/231.html',
    exactNonDayMasterNatalPairSurfaceObserved: true,
    exactNonDayMasterLuckSurfaceObserved: true,
    genericKeHeCompetitionSectionObserved: true,
    physicalEditionIdentityBoundByThisWitness: false,
    targetPrintedPageBound: false,
    lineageIndependenceEstablished: false,
    normativeAuthorityAcquired: false,
  }),
]);

export const R181_QIANLI_TARGET_SURFACES = Object.freeze({
  sectionTitle: '干合而化' as const,
  exactNonDayMasterNatalPairSurface: '若甲年己月，只合而不化也' as const,
  exactNonDayMasterNatalPairMeaning:
    'NON_DAY_MASTER_JIA_JI_COMBINATION_WITHOUT_TRANSFORMATION' as const,
  exactNonDayMasterLuckSurface:
    '若日干非甲，他干有一甲者，逢一己運己歲，尤不能化' as const,
  exactNonDayMasterLuckMeaning:
    'NON_JIA_DAY_MASTER_WITH_OTHER_JIA_AND_JI_LUCK_OR_YEAR_DOES_NOT_TRANSFORM' as const,
  sourceContextDimensionLabels: Object.freeze([
    '時令',
    '賓主',
    '明暗',
    '地位',
    '歲運',
  ] as const),
  exactPairIdentity: Object.freeze(['甲', '己'] as const),
  establishesCombinationWithoutTransformationLanguage: true,
  establishesGenericBindingVerdict: false,
  establishesNoEffectVerdict: false,
  establishesPostCombinationSubjectIdentity: false,
});

export const R181_KE_HE_COMPETITION_METHOD_CANDIDATE = Object.freeze({
  sectionTitle: '干克干合並見' as const,
  methodSurfaceObserved: true,
  positionConditionObserved: true,
  controllerControlledDirectionObserved: true,
  strengthConditionObserved: true,
  examplesUseExactJiaJiPair: false,
  exactJiaJiOutcomeEstablished: false,
  genericCrossRelationPrecedenceAuthorized: false,
  directTransferToR177JiaJiAuthorized: false,
});

export const R181_R180_REQUIREMENT_REASSESSMENT = Object.freeze(
  R180_REQUIREMENT_COVERAGE.map((row) => {
    switch (row.requirementId) {
      case 'EXACT_NON_DAY_MASTER_JIA_JI_INTERACTION_SOURCE':
        return Object.freeze({
          requirementId: row.requirementId,
          acquisitionCandidateNowAvailable: true,
          exactPairLanguageCandidateAvailable: true,
          physicalTargetPageBound: false,
          normativeAuthoritySatisfied: false,
          nextGap: 'PHYSICAL_SCAN_TARGET_PAGE_BINDING',
        });
      case 'CONTROL_AND_COMBINATION_COEXISTENCE_SEMANTICS':
        return Object.freeze({
          requirementId: row.requirementId,
          acquisitionCandidateNowAvailable: true,
          exactPairLanguageCandidateAvailable: false,
          physicalTargetPageBound: false,
          normativeAuthoritySatisfied: false,
          nextGap: 'EXACT_JIA_JI_KE_HE_COEXISTENCE_SOURCE',
        });
      case 'BINDING_OR_NON_BINDING_SEMANTICS':
        return Object.freeze({
          requirementId: row.requirementId,
          acquisitionCandidateNowAvailable: true,
          exactPairLanguageCandidateAvailable: true,
          physicalTargetPageBound: false,
          normativeAuthoritySatisfied: false,
          nextGap: 'BINDING_MEANING_DISTINCT_FROM_NON_TRANSFORMATION',
        });
      case 'CONTEXT_AND_EXCEPTION_CONDITIONS':
        return Object.freeze({
          requirementId: row.requirementId,
          acquisitionCandidateNowAvailable: true,
          exactPairLanguageCandidateAvailable: false,
          physicalTargetPageBound: false,
          normativeAuthoritySatisfied: false,
          nextGap: 'EXACT_PAIR_CONTEXT_SUFFICIENCY_AND_EXCEPTIONS',
        });
      case 'POST_COMBINATION_SUBJECT_IDENTITY_OR_FUNCTION_PERSISTENCE':
        return Object.freeze({
          requirementId: row.requirementId,
          acquisitionCandidateNowAvailable: false,
          exactPairLanguageCandidateAvailable: false,
          physicalTargetPageBound: false,
          normativeAuthoritySatisfied: false,
          nextGap: 'POST_COMBINATION_SUBJECT_OR_FUNCTION_PERSISTENCE_SOURCE',
        });
      case 'PAIR_LOCAL_OUTCOME_DISTINCT_FROM_CROSS_RELATION_PRECEDENCE':
        return Object.freeze({
          requirementId: row.requirementId,
          acquisitionCandidateNowAvailable: false,
          exactPairLanguageCandidateAvailable: false,
          physicalTargetPageBound: false,
          normativeAuthoritySatisfied: false,
          nextGap: 'TRADITIONAL_SOURCE_SEPARATION_IF_ANY',
        });
    }
  }),
);

export const R181_DISCOVERY_AUDIT = Object.freeze({
  r180ExternalDiscoveryRequired:
    R180_AUTHORITY.externalPrimaryCanonicalWitnessDiscoveryRequired,
  physicalEditionCandidateCount: 1,
  publicTranscriptionWitnessCount: R181_PUBLIC_TRANSCRIPTION_WITNESSES.length,
  witnessesReportingExactNonDayMasterNatalPairSurface:
    R181_PUBLIC_TRANSCRIPTION_WITNESSES.filter(
      (item) => item.exactNonDayMasterNatalPairSurfaceObserved,
    ).length,
  witnessesReportingExactNonDayMasterLuckSurface:
    R181_PUBLIC_TRANSCRIPTION_WITNESSES.filter(
      (item) => item.exactNonDayMasterLuckSurfaceObserved,
    ).length,
  witnessesReportingGenericKeHeCompetitionSection:
    R181_PUBLIC_TRANSCRIPTION_WITNESSES.filter(
      (item) => item.genericKeHeCompetitionSectionObserved,
    ).length,
  targetPageVisualVerificationCompleteCount: 0,
  targetPrintedPageBoundCount: 0,
  normativeAuthoritySatisfiedRequirementCount:
    R181_R180_REQUIREMENT_REASSESSMENT.filter(
      (item) => item.normativeAuthoritySatisfied,
    ).length,
});

export const R181_ADMISSION_GUARDS = Object.freeze({
  catalogIdentityDoesNotEqualTargetPageBinding: true,
  publicTranscriptionDoesNotEqualPhysicalPageVerification: true,
  transcriptionMultiplicityDoesNotEstablishLineageIndependence: true,
  nonTransformationDoesNotEqualNoEffect: true,
  nonTransformationDoesNotEqualGenericBinding: true,
  genericKeHeMethodDoesNotEqualExactJiaJiSettlement: true,
  contextDimensionListDoesNotEqualSufficientConditionSet: true,
  sourceCandidateDoesNotEqualProductionAuthority: true,
});

export const R181_REQUIRED_FOLLOW_UP = Object.freeze([
  'QIANLI_1935_TARGET_PAGE_VISUAL_BINDING',
  'QIANLI_EXACT_PRINTED_PAGE_OR_FOLIO_LOCATOR',
  'PUBLIC_TRANSCRIPTION_TO_PHYSICAL_SCAN_SURFACE_COLLATION',
  'EXACT_JIA_JI_KE_HE_COEXISTENCE_SOURCE_AUDIT',
  'NON_TRANSFORMATION_VERSUS_BINDING_MEANING_AUDIT',
  'POST_COMBINATION_SUBJECT_FUNCTION_PERSISTENCE_SOURCE_DISCOVERY',
] as const);

export const R181_REJECTED_SHORTCUTS = Object.freeze([
  'QIANLI_CATALOG_RECORD_EQUALS_TARGET_SURFACE',
  'PUBLIC_TRANSCRIPTION_EQUALS_PRIMARY_PAGE_WITNESS',
  'TWO_TRANSCRIPTIONS_EQUALS_INDEPENDENT_LINEAGES',
  'ZHI_HE_ER_BU_HUA_EQUALS_GENERIC_JIBAN',
  'ZHI_HE_ER_BU_HUA_EQUALS_NO_EFFECT',
  'NON_DAY_MASTER_CANNOT_TRANSFORM_EQUALS_CANNOT_COMBINE',
  'GENERIC_KE_HE_METHOD_EQUALS_EXACT_JIA_JI_PRECEDENCE',
  'POSITION_STRENGTH_METHOD_EQUALS_EXECUTABLE_WEIGHTING',
] as const);

export const R181_GOVERNANCE = Object.freeze({
  r180RepositoryGapPreserved:
    !R180_AUTHORITY.normativePairLocalOutcomeAuthorityFoundInRepository,
  externalCandidateDiscoveryProgressEstablished: true,
  physicalEditionIdentityDistinctFromTargetSurfaceBinding: true,
  exactNonDayMasterLanguageCandidateDistinctFromNormativeAdmission: true,
  exactPairCombinationWithoutTransformationLanguagePreserved: true,
  genericCompetitionMethodKeptOutOfExactPairSettlement: true,
  normativeAuthorityStillClosedPendingPhysicalBinding: true,
});

export const R181_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_QIANLI_JIA_JI_NON_DAY_MASTER_WITNESS_CANDIDATES_ACQUIRED' as const,
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
  competingRelationSettlementResolved: false,
  exactConfigurationTuplePredicateEstablished: false,
  exactMinimalPredicateSetEstablished: false,
  matchingSufficiencyEstablished: false,
  outcomeSufficiencyEstablished: false,
  settlementEstablished: false,
  mechanismRankingAuthorized: false,
  numericWeightAuthorized: false,
  executableResolverAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
