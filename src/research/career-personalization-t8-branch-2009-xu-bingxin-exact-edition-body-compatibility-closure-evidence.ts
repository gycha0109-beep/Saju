import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_2015_SHISHEN_CHANWEI_PUBLICATION_LINEAGE_AND_EXACT_BODY_ACQUISITION_RECHECK_EVIDENCE_VERSION,
  CAREER_T8_B51_2015_LINEAGE_RECHECK_CONTROL_IDS,
  CAREER_T8_B51_SHISHEN_CHANWEI_2015_LINEAGE_RECHECK_EVIDENCE,
  type CareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidenceReport,
} from './career-personalization-t8-branch-2015-shishen-chanwei-publication-lineage-and-exact-body-acquisition-recheck-evidence.js';

export const CAREER_PERSONALIZATION_T8_BRANCH_2009_XU_BINGXIN_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE_VERSION =
  'myeonghwa-career-personalization-t8-branch-2009-xu-bingxin-exact-edition-body-compatibility-closure-evidence-v1' as const;

export const CAREER_T8_B52_XU_BINGXIN_2009_EXACT_BODY_EVIDENCE = Object.freeze({
  sourceIdentity:
    '徐丙昕, 四柱学教程, 中国商业出版社, 2009-07 first edition, 368 pages, ISBN 9787504464903',
  bibliographicCorroboration: Object.freeze([
    'Inspected scan text layer opens with 中国易学文化传承解读丛书 / 四柱学教程 / 徐丙昕著 / 中国商业出版社.',
    'The same inspected scan closes with General Information identifying 四柱学教程, 徐丙昕著, 368 pages, publication date 2009.07 and 中国商业出版社.',
    'Independent bookseller catalog identifies the same title, author, publisher, 2009-07-01 publication date, 368 pages and ISBN 9787504464903.',
  ]),
  inspectedBodySurface:
    'Scribd document 744314994, 15-2009.07 四柱学教程 徐丙昕著; inspected text layer includes publication-identifying front/end matter and printed pp.212-216 of the 正官 discussion.',
  exactEditionBindingEstablished: true as const,
  targetBodyDirectlyInspected: true as const,
  exactTenGod: '정관' as const,
  currentT5SemanticKey: 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY' as const,
  currentT5Facet: 'formal_responsibility' as const,
  semanticTermsObserved: Object.freeze([
    'task_and_responsibility',
    'law_and_control',
    'administrative_coordination',
    'position_or_office_promotion',
  ] as const),
  targetCareerSemanticCorrespondenceObserved: true as const,
  natalGuanshaXingChongKePoConditionObserved: true as const,
  sourceQualitativeEffectClass: 'OFFICIAL_OR_CAREER_ELIGIBILITY_FAILURE_WHEN_USED_GUANSHA_IS_DAMAGED' as const,
  sourceSpecificYongshenDependencyObserved: true as const,
  sourceSpecificDayMasterStrengthDependencyObserved: true as const,
  sourceSpecificConfigurationDependencyObserved: true as const,
  sourceSpecificDependencySeparabilityEstablished: false as const,
  governedFlatAttenuationModeDirectlyEstablished: false as const,
  currentMethodCompatibilityEstablished: false as const,
  currentMethodIncompatibilityReason:
    'The source does not define a context-free branch-clash attenuation delta. It conditions Zhengguan career expression on 喜用/用神 status, day-master strength and whole-chart configuration, while its 刑冲克破 statement is framed as failure of official-career eligibility when 官杀 is the used configuration.' as const,
  independentSingleSourceCompletePathEstablished: false as const,
  normativeProvenanceIndependenceClaimedByThisGate: false as const,
  mayDropYongshenStrengthOrConfigurationDependenciesToForceCompatibility: false as const,
  mayConvertCareerEligibilityFailureIntoFlatAttenuation: false as const,
  mayBorrowModifierOrCompatibilityFromAnotherSource: false as const,
  disposition:
    'EXACT_2009_XU_BINGXIN_BODY_ACQUIRED_CURRENT_METHOD_INCOMPATIBLE_FOR_BOUNDED_FLAT_MODIFIER' as const,
  evidenceNotes: Object.freeze([
    'The exact inspected body defines 正官 in terms of task, responsibility, law or control and associates 正官为用 with administrative coordination, public service and position or office advancement, making the source materially relevant to formal_responsibility and career expression.',
    'The same local body says that where 官杀 is the used configuration and is 刑冲克破, the native does not qualify as a civil or military official and should develop in other occupations; this is a career-classification effect, not a source-defined bounded attenuation delta.',
    'The same section repeatedly conditions outcomes on 正官为喜用 or 用神, day-master strength, 官旺身弱 and supporting configuration. Those dependencies are source-mandatory and are not represented by the current bounded flat modifier contract.',
    'The 2009 source therefore constitutes a third distinct published negative compatibility path after B49 and B50. This does not establish normative provenance independence, an independent complete single-source authority path, or any B48 authority-trigger activation.',
  ]),
} as const);

export const CAREER_T8_B52_2009_EXACT_BODY_CLOSURE_CONTROL_IDS = Object.freeze([
  'B52_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B51_LINEAGE_RECHECK_BOUNDARY',
  'THE_B49_2004_AND_B50_2016_NEGATIVE_CURRENT_METHOD_CLOSURES_ARE_PRESERVED_UNCHANGED',
  'THE_B51_2015_SHISHEN_CHANWEI_EXACT_PRINTED_TARGET_BODY_HOLD_IS_PRESERVED_UNCHANGED',
  'THE_2009_XU_BINGXIN_FIRST_EDITION_IS_BOUND_FROM_PUBLICATION_IDENTIFYING_SCAN_MATTER_AND_MATCHING_BIBLIOGRAPHIC_METADATA',
  'THE_2009_BODY_IS_DIRECTLY_INSPECTED_AT_PRINTED_P212_TO_P216_FOR_ZHENGGUAN_CAREER_SEMANTICS_AND_XING_CHONG_KE_PO_CONDITION',
  'ZHENGGUAN_TASK_RESPONSIBILITY_CONTROL_ADMINISTRATION_AND_POSITION_TERMS_ARE_MATERIAL_TO_FORMAL_RESPONSIBILITY_AND_CAREER_EXPRESSION_ONLY',
  'THE_SOURCE_DESCRIBES_DAMAGE_TO_USED_GUANSHA_AS_OFFICIAL_OR_CAREER_ELIGIBILITY_FAILURE_NOT_AS_A_GOVERNED_FLAT_T5_ATTENUATION_DELTA',
  'THE_SAME_LOCAL_SOURCE_REQUIRES_YONGSHEN_DAY_MASTER_STRENGTH_AND_WHOLE_CHART_CONFIGURATION_CONTEXT',
  'SOURCE_MANDATORY_YONGSHEN_STRENGTH_AND_CONFIGURATION_DEPENDENCIES_ARE_NOT_DROPPED_TO_FORCE_CURRENT_METHOD_COMPATIBILITY',
  'THE_2009_XU_BINGXIN_PATH_IS_NEGATIVELY_CLOSED_AS_CURRENT_METHOD_INCOMPATIBLE_FOR_A_BOUNDED_FLAT_MODIFIER',
  'THE_2009_PATH_IS_NOT_COUNTED_AS_AN_INDEPENDENT_COMPLETE_SINGLE_SOURCE_AUTHORITY_PATH_AND_ACTIVATES_NO_OPEN_AUTHORITY_TRIGGER',
  'DISTINCT_PUBLICATION_IDENTITY_DOES_NOT_BY_ITSELF_ESTABLISH_NORMATIVE_PROVENANCE_INDEPENDENCE',
  'NO_CROSS_SOURCE_OR_CROSS_METHODOLOGY_STITCHING_IS_AUTHORIZED',
  'ALL_SIX_HISTORICAL_CAREER_T8_AUTHORITY_GAPS_REMAIN_FORMALLY_OPEN',
  'NO_T5_T6_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_DEFAULT_OR_PRODUCTION_PROMOTION_IS_AUTHORIZED',
  'FUTURE_BRANCH_RESEARCH_REQUIRES_EXACT_2015_BODY_A_DIFFERENT_QUALIFYING_SOURCE_SIGNAL_OR_GOVERNED_METHOD_AUTHORITY_CHANGE',
] as const);

export interface CareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof CAREER_PERSONALIZATION_T8_BRANCH_2009_XU_BINGXIN_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_BRANCH_2009_XU_BINGXIN_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE'
    | 'UPSTREAM_B51_BOUNDARY_INVALID';
  decision:
    | 'EXACT_2009_XU_BINGXIN_BODY_ACQUIRED_SOURCE_DEPENDENCIES_CONFIRMED_CURRENT_METHOD_INCOMPATIBLE_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS'
    | 'BRANCH_2009_XU_BINGXIN_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_NOT_ESTABLISHED';
  upstreamB51EvidenceId: string;
  exactB51BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  prior2004And2016NegativeClosuresPreserved: boolean;
  prior2015ExactBodyHoldPreserved: boolean;
  sourceEvidence: typeof CAREER_T8_B52_XU_BINGXIN_2009_EXACT_BODY_EVIDENCE | null;
  sourceEvidenceStateChangedSinceB51: boolean;
  sourceAcquisitionPerformed: boolean;
  exact2009EditionBindingEstablished: boolean;
  exact2009TargetBodyDirectlyInspected: boolean;
  exactZhengguanSemanticCorrespondenceObserved: boolean;
  targetCareerSemanticCorrespondenceObserved: boolean;
  natalGuanshaXingChongKePoConditionObserved: boolean;
  sourceSpecificYongshenDependencyObserved: boolean;
  sourceSpecificDayMasterStrengthDependencyObserved: boolean;
  sourceSpecificConfigurationDependencyObserved: boolean;
  sourceSpecificDependencySeparabilityEstablished: false;
  governedFlatAttenuationModeDirectlyEstablished: false;
  currentMethodCompatibilityEstablished: false;
  currentMethodIncompatibilityForFlatModifierEstablished: boolean;
  independentSingleSourceCompletePathEstablished: false;
  normativeProvenanceIndependenceClaimedByThisGate: false;
  sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated: false;
  methodSpecificInputContractAndUpstreamAuthorityTriggerActivated: false;
  satisfiedOpenAuthorityTriggerCount: 0;
  authorityResearchLaneReopenedCount: 0;
  immediatelyExecutableAuthorityAdmissionLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane: null;
  branchAuthorityHoldActive: boolean;
  exact2015PrintedTargetPassageBindingEstablished: false;
  exact2015PrintedTargetBodyDirectlyInspected: false;
  exact2015FacsimileOrPageWitnessAcquisitionRemainsEligible: boolean;
  differentQualifyingSourceSignalRemainsEligible: boolean;
  governedMethodAuthoritySignalRemainsEligible: boolean;
  broadUnchangedSurfaceSearchRestartAuthorized: false;
  repeat2004PathSearchAuthorized: false;
  repeat2016PathSearchAuthorized: false;
  repeat2009XuBingxinPathSearchAuthorized: false;
  repeat2015LineageOnlySearchAuthorized: false;
  crossSourceStitchingAuthorized: false;
  sourceMandatoryDependencyDroppingAuthorized: false;
  careerEligibilityFailureToFlatAttenuationConversionAuthorized: false;
  publicationMetadataIndependenceInferenceAuthorized: false;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  authorityAdmittedByThisGate: false;
  authorityGapClosedByThisGate: false;
  methodologyDefinitionCreatedByThisGate: false;
  t5RuleAuthoringAuthorized: false;
  t6RuleAuthoringAuthorized: false;
  t8RuleAuthoringAuthorized: false;
  claimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B52_2009_EXACT_BODY_CLOSURE_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    exactEditionSourceBodiesAcquired: 1 | 0;
    sourcePathsNegativelyClosedForCurrentMethod: 1 | 0;
    cumulativeNegativelyClosedIndependentPublishedBranchPaths: 3 | 0;
    authorityTriggersActivated: 0;
    authorityResearchLanesReopened: 0;
    authorityComponentsAdmitted: 0;
    authorityGapsClosed: 0;
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE'
    | 'BRANCH_2009_XU_BINGXIN_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE';
}

function contentAddressedB51IdentityValid(
  b51: CareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidenceReport,
): boolean {
  const { evidenceId, ...material } = b51;
  return (
    evidenceId ===
    `career_personalization_t8_branch_2015_shishen_chanwei_publication_lineage_recheck_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB51Accepted(
  b51: CareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidenceReport,
): boolean {
  return (
    contentAddressedB51IdentityValid(b51) &&
    b51.evidenceVersion ===
      CAREER_PERSONALIZATION_T8_BRANCH_2015_SHISHEN_CHANWEI_PUBLICATION_LINEAGE_AND_EXACT_BODY_ACQUISITION_RECHECK_EVIDENCE_VERSION &&
    b51.status === 'RESOLVED_BRANCH_2015_SHISHEN_CHANWEI_PUBLICATION_LINEAGE_AND_EXACT_BODY_ACQUISITION_RECHECK_EVIDENCE' &&
    b51.decision ===
      '2015_PUBLICATION_AUTHOR_ORGANIZER_LINEAGE_STRENGTHENED_EXACT_PRINTED_TARGET_BODY_STILL_UNACQUIRED_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS' &&
    b51.exactB50BoundaryAccepted &&
    b51.domain === 'career' &&
    b51.temporalScope === 'natal' &&
    b51.statusClass === 'research' &&
    b51.prior2004And2016NegativeClosuresPreserved &&
    deterministicContentHash(b51.sourceEvidence) ===
      deterministicContentHash(CAREER_T8_B51_SHISHEN_CHANWEI_2015_LINEAGE_RECHECK_EVIDENCE) &&
    b51.sourceEvidenceStateChangedSinceB50 &&
    b51.publicationLineageResearchPerformed &&
    b51.exact2015PublicationMetadataBindingEstablished &&
    b51.authorOrganizerLineageStrengthened &&
    b51.underlyingAttributedFullTextWitnessObserved &&
    b51.exact2015PrintedTargetPassageBindingEstablished === false &&
    b51.exact2015PrintedTargetBodyDirectlyInspected === false &&
    b51.editionToUnderlyingTextExactTargetContinuityEstablished === false &&
    b51.sourceSpecificDependencySeparabilityEstablished === false &&
    b51.qualitativeAttenuationModeExact2015PrintedBodyEstablished === false &&
    b51.currentMethodCompatibilityEstablished === false &&
    b51.currentMethodIncompatibilityEstablishedByThisGate === false &&
    b51.independentSingleSourceCompletePathEstablished === false &&
    b51.sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated === false &&
    b51.methodSpecificInputContractAndUpstreamAuthorityTriggerActivated === false &&
    b51.satisfiedOpenAuthorityTriggerCount === 0 &&
    b51.authorityResearchLaneReopenedCount === 0 &&
    b51.branchAuthorityHoldActive &&
    b51.repeat2004PathSearchAuthorized === false &&
    b51.repeat2016PathSearchAuthorized === false &&
    b51.repeat2015LineageOnlySearchAuthorized === false &&
    b51.crossSourceStitchingAuthorized === false &&
    b51.sourceMandatoryDependencyDroppingAuthorized === false &&
    b51.webTextSubstitutionForExactPrintedWitnessAuthorized === false &&
    b51.publicationMetadataIndependenceInferenceAuthorized === false &&
    b51.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b51.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b51.authorityAdmittedByThisGate === false &&
    b51.authorityGapClosedByThisGate === false &&
    b51.methodologyDefinitionCreatedByThisGate === false &&
    b51.t5RuleAuthoringAuthorized === false &&
    b51.t6RuleAuthoringAuthorized === false &&
    b51.t8RuleAuthoringAuthorized === false &&
    b51.claimTypeCreationAuthorized === false &&
    b51.personalizedT8PackCreationAuthorized === false &&
    b51.consumerNarrativeAuthorized === false &&
    b51.previewDefaultSwitchAuthorized === false &&
    b51.productionPromotionAuthorized === false &&
    b51.productionImpact === 'NONE' &&
    b51.controlCount === 15 &&
    b51.controlsFrozen &&
    deterministicContentHash(b51.controlIds) ===
      deterministicContentHash(CAREER_T8_B51_2015_LINEAGE_RECHECK_CONTROL_IDS) &&
    b51.implementationEffects.cumulativeNegativelyClosedIndependentPublishedBranchPaths === 2 &&
    b51.implementationEffects.authorityTriggersActivated === 0 &&
    b51.recommendedNextGate === 'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE'
  );
}

function sourceEvidenceValid(): boolean {
  const e = CAREER_T8_B52_XU_BINGXIN_2009_EXACT_BODY_EVIDENCE;
  return (
    e.sourceIdentity.includes('徐丙昕') &&
    e.sourceIdentity.includes('四柱学教程') &&
    e.sourceIdentity.includes('中国商业出版社') &&
    e.sourceIdentity.includes('9787504464903') &&
    e.exactEditionBindingEstablished &&
    e.targetBodyDirectlyInspected &&
    e.exactTenGod === '정관' &&
    e.currentT5SemanticKey === 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY' &&
    e.currentT5Facet === 'formal_responsibility' &&
    e.targetCareerSemanticCorrespondenceObserved &&
    e.natalGuanshaXingChongKePoConditionObserved &&
    e.sourceSpecificYongshenDependencyObserved &&
    e.sourceSpecificDayMasterStrengthDependencyObserved &&
    e.sourceSpecificConfigurationDependencyObserved &&
    e.sourceSpecificDependencySeparabilityEstablished === false &&
    e.governedFlatAttenuationModeDirectlyEstablished === false &&
    e.currentMethodCompatibilityEstablished === false &&
    e.independentSingleSourceCompletePathEstablished === false &&
    e.normativeProvenanceIndependenceClaimedByThisGate === false &&
    e.mayDropYongshenStrengthOrConfigurationDependenciesToForceCompatibility === false &&
    e.mayConvertCareerEligibilityFailureIntoFlatAttenuation === false &&
    e.mayBorrowModifierOrCompatibilityFromAnotherSource === false
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidenceReport, 'evidenceId'>,
): CareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidenceReport {
  return {
    evidenceId: `career_personalization_t8_branch_2009_xu_bingxin_exact_edition_body_compatibility_closure_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence(
  b51: CareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidenceReport,
): CareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidenceReport {
  const accepted = exactB51Accepted(b51) && sourceEvidenceValid();

  return finalized({
    evidenceVersion: CAREER_PERSONALIZATION_T8_BRANCH_2009_XU_BINGXIN_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_BRANCH_2009_XU_BINGXIN_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE'
      : 'UPSTREAM_B51_BOUNDARY_INVALID',
    decision: accepted
      ? 'EXACT_2009_XU_BINGXIN_BODY_ACQUIRED_SOURCE_DEPENDENCIES_CONFIRMED_CURRENT_METHOD_INCOMPATIBLE_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS'
      : 'BRANCH_2009_XU_BINGXIN_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_NOT_ESTABLISHED',
    upstreamB51EvidenceId: b51.evidenceId,
    exactB51BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    prior2004And2016NegativeClosuresPreserved: accepted,
    prior2015ExactBodyHoldPreserved: accepted,
    sourceEvidence: accepted ? CAREER_T8_B52_XU_BINGXIN_2009_EXACT_BODY_EVIDENCE : null,
    sourceEvidenceStateChangedSinceB51: accepted,
    sourceAcquisitionPerformed: accepted,
    exact2009EditionBindingEstablished: accepted,
    exact2009TargetBodyDirectlyInspected: accepted,
    exactZhengguanSemanticCorrespondenceObserved: accepted,
    targetCareerSemanticCorrespondenceObserved: accepted,
    natalGuanshaXingChongKePoConditionObserved: accepted,
    sourceSpecificYongshenDependencyObserved: accepted,
    sourceSpecificDayMasterStrengthDependencyObserved: accepted,
    sourceSpecificConfigurationDependencyObserved: accepted,
    sourceSpecificDependencySeparabilityEstablished: false,
    governedFlatAttenuationModeDirectlyEstablished: false,
    currentMethodCompatibilityEstablished: false,
    currentMethodIncompatibilityForFlatModifierEstablished: accepted,
    independentSingleSourceCompletePathEstablished: false,
    normativeProvenanceIndependenceClaimedByThisGate: false,
    sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated: false,
    methodSpecificInputContractAndUpstreamAuthorityTriggerActivated: false,
    satisfiedOpenAuthorityTriggerCount: 0,
    authorityResearchLaneReopenedCount: 0,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane: null,
    branchAuthorityHoldActive: accepted,
    exact2015PrintedTargetPassageBindingEstablished: false,
    exact2015PrintedTargetBodyDirectlyInspected: false,
    exact2015FacsimileOrPageWitnessAcquisitionRemainsEligible: accepted,
    differentQualifyingSourceSignalRemainsEligible: accepted,
    governedMethodAuthoritySignalRemainsEligible: accepted,
    broadUnchangedSurfaceSearchRestartAuthorized: false,
    repeat2004PathSearchAuthorized: false,
    repeat2016PathSearchAuthorized: false,
    repeat2009XuBingxinPathSearchAuthorized: false,
    repeat2015LineageOnlySearchAuthorized: false,
    crossSourceStitchingAuthorized: false,
    sourceMandatoryDependencyDroppingAuthorized: false,
    careerEligibilityFailureToFlatAttenuationConversionAuthorized: false,
    publicationMetadataIndependenceInferenceAuthorized: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    methodologyDefinitionCreatedByThisGate: false,
    t5RuleAuthoringAuthorized: false,
    t6RuleAuthoringAuthorized: false,
    t8RuleAuthoringAuthorized: false,
    claimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? CAREER_T8_B52_2009_EXACT_BODY_CLOSURE_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 16 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      exactEditionSourceBodiesAcquired: accepted ? 1 : 0,
      sourcePathsNegativelyClosedForCurrentMethod: accepted ? 1 : 0,
      cumulativeNegativelyClosedIndependentPublishedBranchPaths: accepted ? 3 : 0,
      authorityTriggersActivated: 0,
      authorityResearchLanesReopened: 0,
      authorityComponentsAdmitted: 0,
      authorityGapsClosed: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE'
      : 'BRANCH_2009_XU_BINGXIN_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE',
  });
}
