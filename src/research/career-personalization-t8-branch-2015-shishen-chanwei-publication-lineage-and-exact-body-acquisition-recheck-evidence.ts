import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_2016_LU_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE_VERSION,
  CAREER_T8_B50_2016_EXACT_BODY_CLOSURE_CONTROL_IDS,
  CAREER_T8_B50_LU_ZHIJI_2016_EXACT_BODY_EVIDENCE,
  type CareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidenceReport,
} from './career-personalization-t8-branch-2016-lu-exact-edition-body-compatibility-closure-evidence.js';

export const CAREER_PERSONALIZATION_T8_BRANCH_2015_SHISHEN_CHANWEI_PUBLICATION_LINEAGE_AND_EXACT_BODY_ACQUISITION_RECHECK_EVIDENCE_VERSION =
  'myeonghwa-career-personalization-t8-branch-2015-shishen-chanwei-publication-lineage-and-exact-body-acquisition-recheck-evidence-v1' as const;

export const CAREER_T8_B51_SHISHEN_CHANWEI_2015_LINEAGE_RECHECK_EVIDENCE = Object.freeze({
  publicationIdentity:
    '楊逸雲 著 / 李修梵 整理, 十神闡微, 香港星易圖書有限公司, 2015 first edition, 108 pages, ISBN 9789881412041',
  publicationMetadataEvidence: Object.freeze([
    'Current bookseller catalog surface identifies 十神闡微, 香港星易圖書有限公司, ISBN 9789881412041, 2015 first edition, 108 pages, traditional vertical layout.',
    'A 2015-03-19 pre-publication announcement states that 香港星易圖書 would publish 十神闡微 and explicitly identifies the work as 題楊逸雲著, 李修梵整理.',
  ]),
  underlyingTextLineageEvidence: Object.freeze([
    'Multiple accessible full-text witnesses are attributed to 楊逸雲 / 杨逸云 under the 十神闡微 title rather than constituting a directly inspected facsimile of the 2015 printed edition.',
    'The underlying text lineage describes 正官 through restraint, self-control, responsibility, superior or authority roles and 工作任務, which is materially related to the governed formal_responsibility semantic.',
    'The same underlying text lineage explicitly conditions Ten-God expression and outcome on 身旺 or related strength context and 日主喜忌, so those dependencies may not be silently discarded.',
  ]),
  exactPublicationMetadataBindingEstablished: true as const,
  authorOrganizerLineageStrengthened: true as const,
  underlyingAuthorAttribution: '楊逸雲' as const,
  organizerAttribution: '李修梵' as const,
  organizerPublicationMetadataMayCreateIndependentNormativeAuthority: false as const,
  underlyingAttributedFullTextWitnessObserved: true as const,
  exact2015PrintedTargetPassageBindingEstablished: false as const,
  exact2015PrintedTargetBodyDirectlyInspected: false as const,
  editionToUnderlyingTextExactTargetContinuityEstablished: false as const,
  exactTenGod: '정관' as const,
  currentT5SemanticKey: 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY' as const,
  currentT5Facet: 'formal_responsibility' as const,
  targetMechanismMaterialObservedInUnderlyingLineage: true as const,
  underlyingLineageStrengthOrWangshuaiDependencyObserved: true as const,
  underlyingLineageXijiDependencyObserved: true as const,
  sourceSpecificDependencySeparabilityEstablished: false as const,
  qualitativeAttenuationModeExact2015PrintedBodyEstablished: false as const,
  currentMethodCompatibilityEstablished: false as const,
  independentSingleSourceCompletePathEstablished: false as const,
  mayTreatDistinct2015PublicationMetadataAsIndependentNormativeSource: false as const,
  maySubstituteUnderlyingWebTextForExact2015PrintedTargetWitness: false as const,
  mayDropStrengthOrXijiDependenciesToForceCompatibility: false as const,
  disposition:
    'PUBLICATION_AUTHOR_ORGANIZER_LINEAGE_STRENGTHENED_EXACT_2015_PRINTED_TARGET_BODY_STILL_UNACQUIRED_COMPATIBILITY_PENDING' as const,
  evidenceNotes: Object.freeze([
    'B51 records a real provenance-state change: the 2015 edition is now more precisely bound as an edition organized by 李修梵 of material attributed to 楊逸雲, rather than being treated as an independent normative source merely because it has a distinct publisher, ISBN or organizer name.',
    'This lineage strengthening does not establish exact continuity between an accessible web full text and the target pages of the 2015 printed edition.',
    'Because the exact printed target body is still not directly inspected, B51 does not close the 2015 path as compatible or incompatible and does not activate the B48/B50 source trigger.',
    'The underlying attributed text nevertheless preserves strength and xiji dependencies, which remain mandatory caution signals for any future exact-edition compatibility review.',
  ]),
} as const);

export const CAREER_T8_B51_2015_LINEAGE_RECHECK_CONTROL_IDS = Object.freeze([
  'B51_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B50_2016_NEGATIVE_CLOSURE_BOUNDARY',
  'B49_2004_AND_B50_2016_NEGATIVE_CURRENT_METHOD_CLOSURES_ARE_PRESERVED_UNCHANGED',
  'THE_2015_SHISHEN_CHANWEI_PUBLICATION_METADATA_REMAINS_BOUND_TO_HONG_KONG_XINGYI_ISBN_9789881412041_AND_108_PAGES',
  'THE_2015_PREPUBLICATION_LINEAGE_IDENTIFIES_YANG_YIYUN_AS_ATTRIBUTED_AUTHOR_AND_LI_XIUFAN_AS_ORGANIZER',
  'A_DISTINCT_2015_PUBLISHER_ISBN_OR_ORGANIZER_NAME_DOES_NOT_CREATE_INDEPENDENT_NORMATIVE_PROVENANCE',
  'ACCESSIBLE_YANG_YIYUN_FULL_TEXT_WITNESSES_ARE_NOT_SUBSTITUTED_FOR_A_DIRECTLY_INSPECTED_2015_PRINTED_TARGET_PASSAGE',
  'EXACT_2015_PRINTED_TARGET_PASSAGE_BINDING_REMAINS_FALSE',
  'EXACT_2015_PRINTED_TARGET_BODY_DIRECT_INSPECTION_REMAINS_FALSE',
  'UNDERLYING_TEXT_STRENGTH_WANGSHUAI_AND_XIJI_DEPENDENCIES_ARE_PRESERVED_AS_UNRESOLVED_METHOD_COMPATIBILITY_REQUIREMENTS',
  'NO_SOURCE_DEPENDENCY_SEPARABILITY_OR_COMPLETE_PATH_TRIGGER_IS_ACTIVATED',
  'NO_METHOD_SPECIFIC_INPUT_CONTRACT_OR_UPSTREAM_AUTHORITY_TRIGGER_IS_ACTIVATED',
  'NO_CROSS_SOURCE_STITCHING_OR_UNDERLYING_TEXT_TO_PRINTED_EDITION_IDENTITY_INFERENCE_IS_AUTHORIZED',
  'ALL_SIX_HISTORICAL_CAREER_T8_AUTHORITY_GAPS_REMAIN_FORMALLY_OPEN',
  'NO_T5_T6_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_DEFAULT_OR_PRODUCTION_PROMOTION_IS_AUTHORIZED',
  'FUTURE_2015_PROGRESS_REQUIRES_DIRECT_PRINTED_TARGET_WITNESS_OR_ANOTHER_GENUINELY_QUALIFYING_SOURCE_OR_GOVERNED_METHOD_AUTHORITY_SIGNAL',
] as const);

export interface CareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof CAREER_PERSONALIZATION_T8_BRANCH_2015_SHISHEN_CHANWEI_PUBLICATION_LINEAGE_AND_EXACT_BODY_ACQUISITION_RECHECK_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_BRANCH_2015_SHISHEN_CHANWEI_PUBLICATION_LINEAGE_AND_EXACT_BODY_ACQUISITION_RECHECK_EVIDENCE'
    | 'UPSTREAM_B50_BOUNDARY_INVALID';
  decision:
    | '2015_PUBLICATION_AUTHOR_ORGANIZER_LINEAGE_STRENGTHENED_EXACT_PRINTED_TARGET_BODY_STILL_UNACQUIRED_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS'
    | 'BRANCH_2015_SHISHEN_CHANWEI_PUBLICATION_LINEAGE_RECHECK_NOT_ESTABLISHED';
  upstreamB50EvidenceId: string;
  exactB50BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  prior2004And2016NegativeClosuresPreserved: boolean;
  sourceEvidence: typeof CAREER_T8_B51_SHISHEN_CHANWEI_2015_LINEAGE_RECHECK_EVIDENCE | null;
  sourceEvidenceStateChangedSinceB50: boolean;
  publicationLineageResearchPerformed: boolean;
  exact2015PublicationMetadataBindingEstablished: boolean;
  authorOrganizerLineageStrengthened: boolean;
  underlyingAttributedFullTextWitnessObserved: boolean;
  exact2015PrintedTargetPassageBindingEstablished: false;
  exact2015PrintedTargetBodyDirectlyInspected: false;
  editionToUnderlyingTextExactTargetContinuityEstablished: false;
  exactZhengguanSemanticCorrespondenceObservedInUnderlyingLineage: boolean;
  targetMechanismMaterialObservedInUnderlyingLineage: boolean;
  underlyingLineageStrengthOrWangshuaiDependencyObserved: boolean;
  underlyingLineageXijiDependencyObserved: boolean;
  sourceSpecificDependencySeparabilityEstablished: false;
  qualitativeAttenuationModeExact2015PrintedBodyEstablished: false;
  currentMethodCompatibilityEstablished: false;
  currentMethodIncompatibilityEstablishedByThisGate: false;
  independentSingleSourceCompletePathEstablished: false;
  sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated: false;
  methodSpecificInputContractAndUpstreamAuthorityTriggerActivated: false;
  satisfiedOpenAuthorityTriggerCount: 0;
  authorityResearchLaneReopenedCount: 0;
  immediatelyExecutableAuthorityAdmissionLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane: null;
  branchAuthorityHoldActive: boolean;
  exact2015FacsimileOrPageWitnessAcquisitionRemainsEligible: boolean;
  differentQualifyingSourceSignalRemainsEligible: boolean;
  governedMethodAuthoritySignalRemainsEligible: boolean;
  broadUnchangedSurfaceSearchRestartAuthorized: false;
  repeat2004PathSearchAuthorized: false;
  repeat2016PathSearchAuthorized: false;
  repeat2015LineageOnlySearchAuthorized: false;
  crossSourceStitchingAuthorized: false;
  sourceMandatoryDependencyDroppingAuthorized: false;
  webTextSubstitutionForExactPrintedWitnessAuthorized: false;
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
  controlIds: readonly (typeof CAREER_T8_B51_2015_LINEAGE_RECHECK_CONTROL_IDS)[number][];
  controlCount: 15 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    publicationLineagesStrengthened: 1 | 0;
    exactPrintedTargetBodiesAcquired: 0;
    newlyNegativelyClosedSourcePaths: 0;
    cumulativeNegativelyClosedIndependentPublishedBranchPaths: 2 | 0;
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
    | 'BRANCH_2015_SHISHEN_CHANWEI_PUBLICATION_LINEAGE_AND_EXACT_BODY_ACQUISITION_RECHECK_EVIDENCE';
}

function contentAddressedB50IdentityValid(
  b50: CareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidenceReport,
): boolean {
  const { evidenceId, ...material } = b50;
  return (
    evidenceId ===
    `career_personalization_t8_branch_2016_lu_exact_edition_body_compatibility_closure_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB50Accepted(
  b50: CareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidenceReport,
): boolean {
  return (
    contentAddressedB50IdentityValid(b50) &&
    b50.evidenceVersion ===
      CAREER_PERSONALIZATION_T8_BRANCH_2016_LU_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE_VERSION &&
    b50.status === 'RESOLVED_BRANCH_2016_LU_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE' &&
    b50.decision ===
      'EXACT_2016_LU_BODY_ACQUIRED_SOURCE_DEPENDENCIES_CONFIRMED_CURRENT_METHOD_INCOMPATIBLE_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS' &&
    b50.exactB49BoundaryAccepted &&
    b50.domain === 'career' &&
    b50.temporalScope === 'natal' &&
    b50.statusClass === 'research' &&
    b50.prior2004NegativeClosurePreserved &&
    deterministicContentHash(b50.sourceEvidence) ===
      deterministicContentHash(CAREER_T8_B50_LU_ZHIJI_2016_EXACT_BODY_EVIDENCE) &&
    b50.sourceEvidenceStateChangedSinceB49 &&
    b50.sourceAcquisitionPerformed &&
    b50.exact2016EditionBindingEstablished &&
    b50.exact2016TargetBodyDirectlyInspected &&
    b50.currentMethodIncompatibilityForFlatModifierEstablished &&
    b50.sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated === false &&
    b50.methodSpecificInputContractAndUpstreamAuthorityTriggerActivated === false &&
    b50.satisfiedOpenAuthorityTriggerCount === 0 &&
    b50.authorityResearchLaneReopenedCount === 0 &&
    b50.branchAuthorityHoldActive &&
    b50.exact2015PrintedTargetPassageBindingEstablished === false &&
    b50.methodSpecificUpstreamAuthorityEstablished === false &&
    b50.repeat2004PathSearchAuthorized === false &&
    b50.repeat2016PathSearchAuthorized === false &&
    b50.crossSourceStitchingAuthorized === false &&
    b50.sourceMandatoryDependencyDroppingAuthorized === false &&
    b50.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b50.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b50.authorityAdmittedByThisGate === false &&
    b50.authorityGapClosedByThisGate === false &&
    b50.methodologyDefinitionCreatedByThisGate === false &&
    b50.t5RuleAuthoringAuthorized === false &&
    b50.t6RuleAuthoringAuthorized === false &&
    b50.t8RuleAuthoringAuthorized === false &&
    b50.claimTypeCreationAuthorized === false &&
    b50.personalizedT8PackCreationAuthorized === false &&
    b50.consumerNarrativeAuthorized === false &&
    b50.previewDefaultSwitchAuthorized === false &&
    b50.productionPromotionAuthorized === false &&
    b50.productionImpact === 'NONE' &&
    b50.controlCount === 14 &&
    b50.controlsFrozen &&
    deterministicContentHash(b50.controlIds) ===
      deterministicContentHash(CAREER_T8_B50_2016_EXACT_BODY_CLOSURE_CONTROL_IDS) &&
    b50.implementationEffects.cumulativeNegativelyClosedIndependentPublishedBranchPaths === 2 &&
    b50.implementationEffects.authorityTriggersActivated === 0 &&
    b50.recommendedNextGate === 'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE'
  );
}

function sourceEvidenceValid(): boolean {
  const e = CAREER_T8_B51_SHISHEN_CHANWEI_2015_LINEAGE_RECHECK_EVIDENCE;
  return (
    e.publicationIdentity.includes('9789881412041') &&
    e.publicationIdentity.includes('楊逸雲') &&
    e.publicationIdentity.includes('李修梵') &&
    e.exactPublicationMetadataBindingEstablished &&
    e.authorOrganizerLineageStrengthened &&
    e.underlyingAuthorAttribution === '楊逸雲' &&
    e.organizerAttribution === '李修梵' &&
    e.organizerPublicationMetadataMayCreateIndependentNormativeAuthority === false &&
    e.underlyingAttributedFullTextWitnessObserved &&
    e.exact2015PrintedTargetPassageBindingEstablished === false &&
    e.exact2015PrintedTargetBodyDirectlyInspected === false &&
    e.editionToUnderlyingTextExactTargetContinuityEstablished === false &&
    e.exactTenGod === '정관' &&
    e.currentT5SemanticKey === 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY' &&
    e.currentT5Facet === 'formal_responsibility' &&
    e.targetMechanismMaterialObservedInUnderlyingLineage &&
    e.underlyingLineageStrengthOrWangshuaiDependencyObserved &&
    e.underlyingLineageXijiDependencyObserved &&
    e.sourceSpecificDependencySeparabilityEstablished === false &&
    e.qualitativeAttenuationModeExact2015PrintedBodyEstablished === false &&
    e.currentMethodCompatibilityEstablished === false &&
    e.independentSingleSourceCompletePathEstablished === false &&
    e.mayTreatDistinct2015PublicationMetadataAsIndependentNormativeSource === false &&
    e.maySubstituteUnderlyingWebTextForExact2015PrintedTargetWitness === false &&
    e.mayDropStrengthOrXijiDependenciesToForceCompatibility === false
  );
}

function finalized(
  material: Omit<
    CareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidenceReport,
    'evidenceId'
  >,
): CareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidenceReport {
  return {
    evidenceId: `career_personalization_t8_branch_2015_shishen_chanwei_publication_lineage_recheck_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence(
  b50: CareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidenceReport,
): CareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidenceReport {
  const accepted = exactB50Accepted(b50) && sourceEvidenceValid();

  return finalized({
    evidenceVersion:
      CAREER_PERSONALIZATION_T8_BRANCH_2015_SHISHEN_CHANWEI_PUBLICATION_LINEAGE_AND_EXACT_BODY_ACQUISITION_RECHECK_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_BRANCH_2015_SHISHEN_CHANWEI_PUBLICATION_LINEAGE_AND_EXACT_BODY_ACQUISITION_RECHECK_EVIDENCE'
      : 'UPSTREAM_B50_BOUNDARY_INVALID',
    decision: accepted
      ? '2015_PUBLICATION_AUTHOR_ORGANIZER_LINEAGE_STRENGTHENED_EXACT_PRINTED_TARGET_BODY_STILL_UNACQUIRED_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS'
      : 'BRANCH_2015_SHISHEN_CHANWEI_PUBLICATION_LINEAGE_RECHECK_NOT_ESTABLISHED',
    upstreamB50EvidenceId: b50.evidenceId,
    exactB50BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    prior2004And2016NegativeClosuresPreserved: accepted,
    sourceEvidence: accepted ? CAREER_T8_B51_SHISHEN_CHANWEI_2015_LINEAGE_RECHECK_EVIDENCE : null,
    sourceEvidenceStateChangedSinceB50: accepted,
    publicationLineageResearchPerformed: accepted,
    exact2015PublicationMetadataBindingEstablished: accepted,
    authorOrganizerLineageStrengthened: accepted,
    underlyingAttributedFullTextWitnessObserved: accepted,
    exact2015PrintedTargetPassageBindingEstablished: false,
    exact2015PrintedTargetBodyDirectlyInspected: false,
    editionToUnderlyingTextExactTargetContinuityEstablished: false,
    exactZhengguanSemanticCorrespondenceObservedInUnderlyingLineage: accepted,
    targetMechanismMaterialObservedInUnderlyingLineage: accepted,
    underlyingLineageStrengthOrWangshuaiDependencyObserved: accepted,
    underlyingLineageXijiDependencyObserved: accepted,
    sourceSpecificDependencySeparabilityEstablished: false,
    qualitativeAttenuationModeExact2015PrintedBodyEstablished: false,
    currentMethodCompatibilityEstablished: false,
    currentMethodIncompatibilityEstablishedByThisGate: false,
    independentSingleSourceCompletePathEstablished: false,
    sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated: false,
    methodSpecificInputContractAndUpstreamAuthorityTriggerActivated: false,
    satisfiedOpenAuthorityTriggerCount: 0,
    authorityResearchLaneReopenedCount: 0,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane: null,
    branchAuthorityHoldActive: accepted,
    exact2015FacsimileOrPageWitnessAcquisitionRemainsEligible: accepted,
    differentQualifyingSourceSignalRemainsEligible: accepted,
    governedMethodAuthoritySignalRemainsEligible: accepted,
    broadUnchangedSurfaceSearchRestartAuthorized: false,
    repeat2004PathSearchAuthorized: false,
    repeat2016PathSearchAuthorized: false,
    repeat2015LineageOnlySearchAuthorized: false,
    crossSourceStitchingAuthorized: false,
    sourceMandatoryDependencyDroppingAuthorized: false,
    webTextSubstitutionForExactPrintedWitnessAuthorized: false,
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
    controlIds: accepted ? CAREER_T8_B51_2015_LINEAGE_RECHECK_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 15 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      publicationLineagesStrengthened: accepted ? 1 : 0,
      exactPrintedTargetBodiesAcquired: 0,
      newlyNegativelyClosedSourcePaths: 0,
      cumulativeNegativelyClosedIndependentPublishedBranchPaths: accepted ? 2 : 0,
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
      : 'BRANCH_2015_SHISHEN_CHANWEI_PUBLICATION_LINEAGE_AND_EXACT_BODY_ACQUISITION_RECHECK_EVIDENCE',
  });
}
