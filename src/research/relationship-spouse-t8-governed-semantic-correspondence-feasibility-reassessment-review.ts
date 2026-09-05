import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_CONCLUSION_CANDIDATE_VERSION,
  GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
  GENERAL_NATAL_CONCLUSION_METHODOLOGY,
} from './general-natal-conclusion-synthesis-candidate.js';
import {
  RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
  RELATIONSHIP_NATAL_READING_METHODOLOGY,
  RELATIONSHIP_NATAL_READING_RULES,
} from './relationship-natal-reading-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_REVIEW_VERSION,
  type RelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReviewReport,
} from './relationship-spouse-t8-post-primary-witness-authority-reassessment-review.js';
import { WANLI_DIRECT_TARGET_PAGE_RECORDS } from './wanli-direct-target-page-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_GOVERNED_SEMANTIC_CORRESPONDENCE_FEASIBILITY_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-governed-semantic-correspondence-feasibility-reassessment-review-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_GOVERNED_SEMANTIC_CORRESPONDENCE_FEASIBILITY_CONTROL_IDS =
  Object.freeze([
    'SEMANTIC_CORRESPONDENCE_FEASIBILITY_ACCEPTS_ONLY_THE_EXACT_POST_PRIMARY_WITNESS_AUTHORITY_SNAPSHOT',
    'POST_PRIMARY_WITNESS_REASSESSMENT_REMAINS_THE_CURRENT_FIVE_GAP_AUTHORITY_SNAPSHOT',
    'CURRENT_T5_FAMILY_PRESENCE_PRODUCER_BOUNDARY_IS_RECHECKED_DIRECTLY_FROM_GOVERNED_REPOSITORY_RULES',
    'CURRENT_T5_INPUT_CONDITIONS_OBSERVE_TEN_GOD_SUBTYPES_BUT_EMITTED_FAMILY_PRESENCE_COLLAPSES_SUBTYPE_IDENTITY',
    'CURRENT_T5_EMITTED_FAMILY_PRESENCE_DOES_NOT_PRESERVE_SOURCE_SLOT_SEASONAL_COMMAND_OR_STRENGTH_STATE',
    'WANLI_DIRECT_TARGET_PAGE_SEMANTIC_ANCHOR_EXPLICITLY_DISTINGUISHES_ZHENGCAI_AND_PIANCAI',
    'COLLAPSING_DIRECT_WANLI_SUBTYPE_DISTINCTION_INTO_BROAD_WEALTH_FAMILY_IS_NOT_SOURCE_BOUND_SEMANTIC_CORRESPONDENCE',
    'GENERAL_RELATIONSHIP_T8_METHODOLOGY_EXPLICITLY_FORBIDS_REUSE_AS_SPOUSE_SPECIFIC_AUTHORITY',
    'BROAD_RELATIONSHIP_T8_CLAIMS_CANNOT_BE_RELABELLED_AS_SPOUSE_CLAIMS',
    'NO_SOURCE_BOUND_RULE_MAPS_THE_EXACT_CURRENT_T5_FAMILY_PRESENCE_CLASSES_TO_SPOUSE_SPECIFIC_T8_SEMANTICS',
    'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
    'RELATIONSHIP_T6_INPUT_REMAINS_INDEPENDENTLY_OPEN',
    'EXACTLY_ONE_OF_FIVE_AUTHORITY_GAPS_REMAINS_CLOSED',
    'THIS_REASSESSMENT_CLOSES_ZERO_ADDITIONAL_AUTHORITY_GAPS',
    'NO_SEMANTIC_RECONSTRUCTION_METHOD_RELABELLING_OR_PRODUCER_AUTHORITY_IS_CREATED_BY_THIS_REASSESSMENT',
    'NO_CROSS_SOURCE_CROSS_FRONTIER_OR_CROSS_TASK_STITCHING_TO_SYNTHESIZE_MISSING_CORRESPONDENCE',
    'NO_SPOUSE_T8_RULE_CLAIM_PACK_NARRATIVE_COMPATIBILITY_PREVIEW_OR_PRODUCTION_EFFECT',
    'AUTHORITY_ADMISSION_REMAINS_NOT_READY',
  ] as const);

const EXPECTED_T5_CLAIM_TYPES = Object.freeze([
  'TEN_GOD_FAMILY_PEER_PRESENT',
  'TEN_GOD_FAMILY_RESOURCE_PRESENT',
  'TEN_GOD_FAMILY_OUTPUT_PRESENT',
  'TEN_GOD_FAMILY_WEALTH_PRESENT',
  'TEN_GOD_FAMILY_OFFICER_PRESENT',
] as const);

const EXPECTED_T5_SUBTYPE_SETS = Object.freeze({
  peer: Object.freeze(['비견', '겁재']),
  resource: Object.freeze(['편인', '정인']),
  output: Object.freeze(['식신', '상관']),
  wealth: Object.freeze(['편재', '정재']),
  officer: Object.freeze(['편관', '정관']),
} as const);

const EXPECTED_T5_SLOT_PATHS = Object.freeze([
  'year.stem.value',
  'month.stem.value',
  'hour.stem.value',
  'year.branch.value',
  'month.branch.value',
  'day.branch.value',
  'hour.branch.value',
] as const);

type CurrentT5Family = keyof typeof EXPECTED_T5_SUBTYPE_SETS;

export type RelationshipSpouseT8GovernedSemanticCorrespondenceAuthorityGapStatus = Readonly<{
  QUALIFYING_PRIMARY_WITNESS: 'CLOSED' | 'OPEN';
  INDEPENDENT_NORMATIVE_PROVENANCE: 'OPEN';
  EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING: 'OPEN';
  CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE: 'OPEN';
  RELATIONSHIP_T6_INPUT: 'OPEN';
}>;

export interface RelationshipSpouseT8GovernedSemanticCorrespondenceFeasibilityReassessmentReviewReport {
  reviewId: string;
  reviewVersion: typeof RELATIONSHIP_SPOUSE_T8_GOVERNED_SEMANTIC_CORRESPONDENCE_FEASIBILITY_REASSESSMENT_REVIEW_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_GOVERNED_SEMANTIC_CORRESPONDENCE_FEASIBILITY_REASSESSMENT'
    | 'UPSTREAM_POST_PRIMARY_WITNESS_AUTHORITY_SNAPSHOT_INVALID'
    | 'CURRENT_T5_PRODUCER_BOUNDARY_INVALID'
    | 'CURRENT_GENERAL_RELATIONSHIP_T8_BOUNDARY_INVALID'
    | 'DIRECT_WANLI_SEMANTIC_ANCHOR_INVALID';
  decision:
    | 'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN_CURRENT_T5_COLLAPSES_SOURCE_DISTINCTIONS_AND_GENERAL_RELATIONSHIP_REUSE_IS_FORBIDDEN_EXACTLY_ONE_OF_FIVE_GAPS_CLOSED'
    | 'GOVERNED_SEMANTIC_CORRESPONDENCE_FEASIBILITY_REASSESSMENT_NOT_ESTABLISHED';
  upstreamPostPrimaryWitnessReviewId: string;
  exactUpstreamPostPrimaryWitnessBoundaryAccepted: boolean;
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  currentFiveGapAuthoritySnapshotSource: 'POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT';
  currentT5ProducerPath: 'src/research/general-natal-conclusion-synthesis-candidate.ts';
  currentGeneralRelationshipT8Path: 'src/research/relationship-natal-reading-candidate.ts';
  exactCurrentT5ProducerBoundaryAccepted: boolean;
  exactCurrentGeneralRelationshipT8BoundaryAccepted: boolean;
  directWanliSemanticAnchorAccepted: boolean;
  currentT5ClaimTypes: readonly string[];
  currentT5ClaimCount: 5 | 0;
  currentT5InputConditionsPreserveSubtypeIdentityBeforeEmission: boolean;
  currentT5EmittedClaimPreservesTenGodSubtypeIdentity: false;
  currentT5EmittedClaimPreservesSourceSlotIdentity: false;
  currentT5EmittedClaimPreservesSeasonalCommand: false;
  currentT5EmittedClaimPreservesDayMasterStrengthOrWangShuai: false;
  currentT5DominanceScored: false;
  directWanliTargetExcerpt: '正財妻偏財妾也' | null;
  directWanliSpouseSemanticDistinguishesWealthSubtypes: boolean;
  broadRelationshipMethodExplicitlyForbidsSpouseSpecificReuse: boolean;
  broadRelationshipMayBeRelabelledAsSpouseAuthority: false;
  exactCurrentT5ToSpouseSourceBoundSemanticRuleEstablished: false;
  collapsedWealthFamilyQualifiesAsExactWanliSubtypeCorrespondence: false;
  semanticReconstructionWouldBeRequiredToRecoverDiscardedT5Distinctions: boolean;
  semanticReconstructionAuthorized: false;
  methodologyRelabellingAuthorized: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  authorityGapStatus: RelationshipSpouseT8GovernedSemanticCorrespondenceAuthorityGapStatus;
  authorityGapClosedByThisReview: false;
  authorityGapsClosedCount: 1 | 0;
  authorityGapsOpenCount: 4 | 5;
  authorityAdmissionReady: false;
  semanticProducerImplementationAuthorized: false;
  historicalGenderRoleUniversalizationAuthorized: false;
  userOrPartnerSexInferenceAuthorized: false;
  partnerSexualOrientationInferenceAuthorized: false;
  crossSourceStitchingAuthorized: false;
  crossFrontierStitchingAuthorized: false;
  crossTaskStitchingAuthorized: false;
  spouseT8RuleAuthoringAuthorized: false;
  spouseT8ClaimTypeCreationAuthorized: false;
  spouseInterpretationPackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  compatibilityAuthorityAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_GOVERNED_SEMANTIC_CORRESPONDENCE_FEASIBILITY_CONTROL_IDS)[number][];
  controlCount: 18 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    feasibilityReassessmentsPerformed: 1 | 0;
    currentT5ProducerBoundariesInspected: 1 | 0;
    currentGeneralRelationshipBoundariesInspected: 1 | 0;
    directWanliSemanticAnchorsInspected: 1 | 0;
    authorityGapsClosedByThisReview: 0;
    totalAuthorityGapsClosedAfterReview: 1 | 0;
    semanticReconstructionMethodsCreated: 0;
    methodologyRelabellingsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
    productionRoutesChanged: 0;
  };
  recommendedNextAction:
    | 'ACQUIRE_SOURCE_BOUND_CURRENT_GOVERNED_SPOUSE_SEMANTIC_CORRESPONDENCE_OR_AN_AUTHORIZED_NON_LOSSY_UPSTREAM_PRODUCER_METHOD_BEFORE_ANY_SPOUSE_T8_PRODUCER_GATE'
    | 'REESTABLISH_EXACT_GOVERNED_SEMANTIC_CORRESPONDENCE_FEASIBILITY_BOUNDARIES';
}

function contentAddressedPostPrimaryWitnessIdentityValid(
  review: RelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReviewReport,
): boolean {
  const { reviewId, ...material } = review;
  return (
    reviewId ===
    `relationship_spouse_t8_post_primary_witness_authority_reassessment_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactPostPrimaryWitnessBoundaryAccepted(
  review: RelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReviewReport,
): boolean {
  return (
    contentAddressedPostPrimaryWitnessIdentityValid(review) &&
    review.reviewVersion ===
      RELATIONSHIP_SPOUSE_T8_POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_REVIEW_VERSION &&
    review.status ===
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_REVIEW' &&
    review.decision ===
      'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED_MODERN_EDITORIAL_CANDIDATE_REMAINS_INADEQUATE_EXACTLY_ONE_OF_FIVE_GAPS_CLOSED' &&
    review.exactUpstreamDirectWitnessBoundaryAccepted &&
    review.exactUpstreamApplicabilityCandidateBoundaryAccepted &&
    review.qualifyingPrimaryWitnessEstablished &&
    review.authorityGapStatus.QUALIFYING_PRIMARY_WITNESS === 'CLOSED' &&
    review.authorityGapStatus.INDEPENDENT_NORMATIVE_PROVENANCE === 'OPEN' &&
    review.authorityGapStatus.EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING === 'OPEN' &&
    review.authorityGapStatus.CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE === 'OPEN' &&
    review.authorityGapStatus.RELATIONSHIP_T6_INPUT === 'OPEN' &&
    review.authorityGapsClosedCount === 1 &&
    review.authorityGapsOpenCount === 4 &&
    review.currentGovernedMethodSemanticCorrespondenceEstablished === false &&
    review.currentRelationshipT6InputPathEstablished === false &&
    review.authorityAdmissionReady === false &&
    review.semanticProducerImplementationAuthorized === false &&
    review.crossSourceStitchingAuthorized === false &&
    review.crossTaskStitchingAuthorized === false &&
    review.productionPromotionAuthorized === false &&
    review.controlCount === 16 &&
    review.controlsFrozen &&
    deterministicContentHash(review.controlIds) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_CONTROL_IDS,
      )
  );
}

function currentT5FamilyForClaimType(claimType: string): CurrentT5Family | null {
  const index = EXPECTED_T5_CLAIM_TYPES.indexOf(
    claimType as (typeof EXPECTED_T5_CLAIM_TYPES)[number],
  );
  if (index < 0) return null;
  return (['peer', 'resource', 'output', 'wealth', 'officer'] as const)[index];
}

function exactCurrentT5ProducerBoundaryAccepted(): boolean {
  if (
    GENERAL_NATAL_CONCLUSION_CANDIDATE_VERSION !== '0.2.0-research' ||
    GENERAL_NATAL_CONCLUSION_METHODOLOGY.status !== 'research' ||
    !GENERAL_NATAL_CONCLUSION_METHODOLOGY.assumptions.includes(
      'Specific income, occupation, spouse, health, event, luck polarity, and future timing remain outside this candidate.',
    ) ||
    GENERAL_NATAL_CONCLUSION_FAMILY_RULES.length !== 5
  ) {
    return false;
  }

  const observedClaimTypes: string[] = [];
  for (const rule of GENERAL_NATAL_CONCLUSION_FAMILY_RULES) {
    if (
      rule.status !== 'research' ||
      rule.taxonomy.tier !== 'T5' ||
      rule.taxonomy.category !== 'ten_gods' ||
      rule.taxonomy.subcategory !== 'family_presence' ||
      rule.output.predicate !== 'ten_god_family_presence'
    ) {
      return false;
    }

    const family = currentT5FamilyForClaimType(rule.output.claimType);
    if (family === null) return false;
    observedClaimTypes.push(rule.output.claimType);

    const value = rule.output.value as unknown as Record<string, unknown>;
    if (
      value.family !== family ||
      value.presence !== 'observed' ||
      value.dominance !== 'not_scored' ||
      Object.keys(value).sort().join('|') !== 'dominance|family|presence'
    ) {
      return false;
    }

    const condition = rule.condition as unknown as {
      op?: unknown;
      expressions?: readonly unknown[];
    };
    if (
      condition.op !== 'or' ||
      !Array.isArray(condition.expressions) ||
      condition.expressions.length !== EXPECTED_T5_SLOT_PATHS.length
    ) {
      return false;
    }

    const observedPaths: string[] = [];
    for (const rawExpression of condition.expressions) {
      const expression = rawExpression as {
        op?: unknown;
        value?: { kind?: unknown; key?: unknown; path?: unknown };
        set?: unknown;
      };
      if (
        expression.op !== 'in' ||
        expression.value?.kind !== 'input' ||
        expression.value?.key !== 'tenGods' ||
        typeof expression.value?.path !== 'string' ||
        !Array.isArray(expression.set) ||
        deterministicContentHash(expression.set) !==
          deterministicContentHash(EXPECTED_T5_SUBTYPE_SETS[family])
      ) {
        return false;
      }
      observedPaths.push(expression.value.path);
    }

    if (
      deterministicContentHash([...observedPaths].sort()) !==
      deterministicContentHash([...EXPECTED_T5_SLOT_PATHS].sort())
    ) {
      return false;
    }
  }

  return (
    deterministicContentHash([...observedClaimTypes].sort()) ===
    deterministicContentHash([...EXPECTED_T5_CLAIM_TYPES].sort())
  );
}

function exactCurrentGeneralRelationshipT8BoundaryAccepted(): boolean {
  return (
    RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION === '0.5.0-research' &&
    RELATIONSHIP_NATAL_READING_METHODOLOGY.status === 'research' &&
    RELATIONSHIP_NATAL_READING_METHODOLOGY.assumptions.includes(
      'General relationship conclusions must not be reused as spouse-specific claims or compatibility claims.',
    ) &&
    RELATIONSHIP_NATAL_READING_RULES.length > 0 &&
    RELATIONSHIP_NATAL_READING_RULES.every(
      (rule) =>
        rule.status === 'research' &&
        rule.taxonomy.tier === 'T8' &&
        rule.taxonomy.category === 'relationship' &&
        rule.taxonomy.subcategory === 'general',
    )
  );
}

function directWanliSemanticAnchorAccepted(): boolean {
  const target = WANLI_DIRECT_TARGET_PAGE_RECORDS.find((record) => record.scanPage === 50);
  return (
    target !== undefined &&
    target.role === 'DIRECT_TARGET' &&
    target.targetPassageVisible === true &&
    'observedTargetExcerpt' in target &&
    target.observedTargetExcerpt === '正財妻偏財妾也'
  );
}

function finalized(
  material: Omit<RelationshipSpouseT8GovernedSemanticCorrespondenceFeasibilityReassessmentReviewReport, 'reviewId'>,
): RelationshipSpouseT8GovernedSemanticCorrespondenceFeasibilityReassessmentReviewReport {
  return {
    reviewId: `relationship_spouse_t8_governed_semantic_correspondence_feasibility_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildRelationshipSpouseT8GovernedSemanticCorrespondenceFeasibilityReassessmentReview(
  postPrimaryWitnessReview: RelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReviewReport,
): RelationshipSpouseT8GovernedSemanticCorrespondenceFeasibilityReassessmentReviewReport {
  const postPrimaryAccepted = exactPostPrimaryWitnessBoundaryAccepted(postPrimaryWitnessReview);
  const t5ProducerAccepted = exactCurrentT5ProducerBoundaryAccepted();
  const generalRelationshipAccepted = exactCurrentGeneralRelationshipT8BoundaryAccepted();
  const wanliSemanticAnchorAccepted = directWanliSemanticAnchorAccepted();
  const accepted =
    postPrimaryAccepted &&
    t5ProducerAccepted &&
    generalRelationshipAccepted &&
    wanliSemanticAnchorAccepted;

  return finalized({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_GOVERNED_SEMANTIC_CORRESPONDENCE_FEASIBILITY_REASSESSMENT_REVIEW_VERSION,
    status: !postPrimaryAccepted
      ? 'UPSTREAM_POST_PRIMARY_WITNESS_AUTHORITY_SNAPSHOT_INVALID'
      : !t5ProducerAccepted
        ? 'CURRENT_T5_PRODUCER_BOUNDARY_INVALID'
        : !generalRelationshipAccepted
          ? 'CURRENT_GENERAL_RELATIONSHIP_T8_BOUNDARY_INVALID'
          : !wanliSemanticAnchorAccepted
            ? 'DIRECT_WANLI_SEMANTIC_ANCHOR_INVALID'
            : 'RESOLVED_RELATIONSHIP_SPOUSE_T8_GOVERNED_SEMANTIC_CORRESPONDENCE_FEASIBILITY_REASSESSMENT',
    decision: accepted
      ? 'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN_CURRENT_T5_COLLAPSES_SOURCE_DISTINCTIONS_AND_GENERAL_RELATIONSHIP_REUSE_IS_FORBIDDEN_EXACTLY_ONE_OF_FIVE_GAPS_CLOSED'
      : 'GOVERNED_SEMANTIC_CORRESPONDENCE_FEASIBILITY_REASSESSMENT_NOT_ESTABLISHED',
    upstreamPostPrimaryWitnessReviewId: postPrimaryWitnessReview.reviewId,
    exactUpstreamPostPrimaryWitnessBoundaryAccepted: postPrimaryAccepted,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    currentFiveGapAuthoritySnapshotSource: 'POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT',
    currentT5ProducerPath: 'src/research/general-natal-conclusion-synthesis-candidate.ts',
    currentGeneralRelationshipT8Path: 'src/research/relationship-natal-reading-candidate.ts',
    exactCurrentT5ProducerBoundaryAccepted: t5ProducerAccepted,
    exactCurrentGeneralRelationshipT8BoundaryAccepted: generalRelationshipAccepted,
    directWanliSemanticAnchorAccepted: wanliSemanticAnchorAccepted,
    currentT5ClaimTypes: t5ProducerAccepted ? EXPECTED_T5_CLAIM_TYPES : Object.freeze([]),
    currentT5ClaimCount: t5ProducerAccepted ? 5 : 0,
    currentT5InputConditionsPreserveSubtypeIdentityBeforeEmission: t5ProducerAccepted,
    currentT5EmittedClaimPreservesTenGodSubtypeIdentity: false,
    currentT5EmittedClaimPreservesSourceSlotIdentity: false,
    currentT5EmittedClaimPreservesSeasonalCommand: false,
    currentT5EmittedClaimPreservesDayMasterStrengthOrWangShuai: false,
    currentT5DominanceScored: false,
    directWanliTargetExcerpt: wanliSemanticAnchorAccepted ? '正財妻偏財妾也' : null,
    directWanliSpouseSemanticDistinguishesWealthSubtypes: wanliSemanticAnchorAccepted,
    broadRelationshipMethodExplicitlyForbidsSpouseSpecificReuse: generalRelationshipAccepted,
    broadRelationshipMayBeRelabelledAsSpouseAuthority: false,
    exactCurrentT5ToSpouseSourceBoundSemanticRuleEstablished: false,
    collapsedWealthFamilyQualifiesAsExactWanliSubtypeCorrespondence: false,
    semanticReconstructionWouldBeRequiredToRecoverDiscardedT5Distinctions:
      t5ProducerAccepted && wanliSemanticAnchorAccepted,
    semanticReconstructionAuthorized: false,
    methodologyRelabellingAuthorized: false,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    authorityGapStatus: Object.freeze({
      QUALIFYING_PRIMARY_WITNESS: postPrimaryAccepted ? 'CLOSED' : 'OPEN',
      INDEPENDENT_NORMATIVE_PROVENANCE: 'OPEN',
      EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING: 'OPEN',
      CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE: 'OPEN',
      RELATIONSHIP_T6_INPUT: 'OPEN',
    }),
    authorityGapClosedByThisReview: false,
    authorityGapsClosedCount: postPrimaryAccepted ? 1 : 0,
    authorityGapsOpenCount: postPrimaryAccepted ? 4 : 5,
    authorityAdmissionReady: false,
    semanticProducerImplementationAuthorized: false,
    historicalGenderRoleUniversalizationAuthorized: false,
    userOrPartnerSexInferenceAuthorized: false,
    partnerSexualOrientationInferenceAuthorized: false,
    crossSourceStitchingAuthorized: false,
    crossFrontierStitchingAuthorized: false,
    crossTaskStitchingAuthorized: false,
    spouseT8RuleAuthoringAuthorized: false,
    spouseT8ClaimTypeCreationAuthorized: false,
    spouseInterpretationPackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    compatibilityAuthorityAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted
      ? RELATIONSHIP_SPOUSE_T8_GOVERNED_SEMANTIC_CORRESPONDENCE_FEASIBILITY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? 18 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      feasibilityReassessmentsPerformed: accepted ? 1 : 0,
      currentT5ProducerBoundariesInspected: t5ProducerAccepted ? 1 : 0,
      currentGeneralRelationshipBoundariesInspected: generalRelationshipAccepted ? 1 : 0,
      directWanliSemanticAnchorsInspected: wanliSemanticAnchorAccepted ? 1 : 0,
      authorityGapsClosedByThisReview: 0,
      totalAuthorityGapsClosedAfterReview: postPrimaryAccepted ? 1 : 0,
      semanticReconstructionMethodsCreated: 0,
      methodologyRelabellingsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
      productionRoutesChanged: 0,
    },
    recommendedNextAction: accepted
      ? 'ACQUIRE_SOURCE_BOUND_CURRENT_GOVERNED_SPOUSE_SEMANTIC_CORRESPONDENCE_OR_AN_AUTHORIZED_NON_LOSSY_UPSTREAM_PRODUCER_METHOD_BEFORE_ANY_SPOUSE_T8_PRODUCER_GATE'
      : 'REESTABLISH_EXACT_GOVERNED_SEMANTIC_CORRESPONDENCE_FEASIBILITY_BOUNDARIES',
  });
}
