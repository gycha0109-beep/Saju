import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
  RELATIONSHIP_NATAL_READING_METHODOLOGY,
  RELATIONSHIP_NATAL_READING_RULES,
} from './relationship-natal-reading-candidate.js';

export const RELATIONSHIP_SPOUSE_T8_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-authority-acquisition-readiness-review-v1' as const;

export type RelationshipSpouseT8AuthorityGapId =
  | 'SPOUSE_SPECIFIC_SEMANTIC_BINDING_MISSING'
  | 'SPOUSE_APPLICABILITY_BOUNDARY_MISSING'
  | 'SPOUSE_MULTI_CLAIM_COMPOSITION_METHOD_MISSING'
  | 'SPOUSE_SCOPE_LIMITS_AND_EXCEPTIONS_MISSING'
  | 'SPOUSE_NORMATIVE_PROVENANCE_REVIEW_MISSING';

export interface RelationshipSpouseT8AuthorityRequirement {
  gapId: RelationshipSpouseT8AuthorityGapId;
  mandatory: true;
  authorityQuestion: string;
  requiredAuthorityAssertions: readonly string[];
  exactSourceIdentityRequired: true;
  exactLocatorRequired: true;
  originalOrVerifiedSourceContextRequired: true;
  explicitSpouseSemanticBindingRequired: true;
  explicitApplicabilityBoundaryRequired: true;
  explicitContextOrExceptionTreatmentRequired: true;
  currentlySatisfied: false;
  mayBeSatisfiedByBroadRelationshipClaimReuse: false;
  mayBeSatisfiedByDayBranchSpouseProjectionAlone: false;
  mayBeSatisfiedByGeneralKnowledge: false;
  mayBeSatisfiedBySearchSnippet: false;
  mayBeSatisfiedByModelSynthesis: false;
  mayBeSatisfiedByCompatibilityAuthority: false;
}

function requirement(
  gapId: RelationshipSpouseT8AuthorityGapId,
  authorityQuestion: string,
  requiredAuthorityAssertions: readonly string[],
): RelationshipSpouseT8AuthorityRequirement {
  return Object.freeze({
    gapId,
    mandatory: true,
    authorityQuestion,
    requiredAuthorityAssertions: Object.freeze([...requiredAuthorityAssertions]),
    exactSourceIdentityRequired: true,
    exactLocatorRequired: true,
    originalOrVerifiedSourceContextRequired: true,
    explicitSpouseSemanticBindingRequired: true,
    explicitApplicabilityBoundaryRequired: true,
    explicitContextOrExceptionTreatmentRequired: true,
    currentlySatisfied: false,
    mayBeSatisfiedByBroadRelationshipClaimReuse: false,
    mayBeSatisfiedByDayBranchSpouseProjectionAlone: false,
    mayBeSatisfiedByGeneralKnowledge: false,
    mayBeSatisfiedBySearchSnippet: false,
    mayBeSatisfiedByModelSynthesis: false,
    mayBeSatisfiedByCompatibilityAuthority: false,
  });
}

export const RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS = Object.freeze([
  requirement(
    'SPOUSE_SPECIFIC_SEMANTIC_BINDING_MISSING',
    'What source-bound rule permits natal-chart evidence to support a spouse-specific T8 relationship claim rather than only a broad interpersonal tendency?',
    [
      'Authority must explicitly bind identified chart structure to spouse-specific relationship semantics.',
      'Authority must distinguish spouse-specific meaning from broad relationship/general meaning.',
      'Authority must not infer a specific partner attribute, intention, or outcome unless that narrower semantic is separately authorized.',
    ],
  ),
  requirement(
    'SPOUSE_APPLICABILITY_BOUNDARY_MISSING',
    'Under which chart, role, sex/polarity, or traditional-method assumptions does the spouse-specific rule apply, and when must it not apply?',
    [
      'Authority must state the applicability boundary instead of silently universalizing a tradition-specific role mapping.',
      'Any sex-, polarity-, or role-sensitive assumption present in the source must remain explicit in the methodology contract.',
      'A day-branch/spouse or Ten-God/spouse mapping cannot be activated from prototype convention or general knowledge alone.',
    ],
  ),
  requirement(
    'SPOUSE_MULTI_CLAIM_COMPOSITION_METHOD_MISSING',
    'What governed method permits multiple upstream claims to form a spouse-specific T8 synthesis without turning one symbol into a deterministic life conclusion?',
    [
      'Authority must define which upstream claim classes participate in spouse synthesis and how they compose.',
      'Single-feature shortcuts must not directly become spouse appearance, occupation, fidelity, marriage, divorce, breakup, children, or future-timing conclusions.',
      'Conflict or ambiguity among eligible upstream claims must be preserved or resolved only by a separately governed method.',
    ],
  ),
  requirement(
    'SPOUSE_SCOPE_LIMITS_AND_EXCEPTIONS_MISSING',
    'Which spouse-related conclusions are actually licensed, and which conclusions remain outside the authorized scope?',
    [
      'Authority must define positive semantic scope and explicit exclusions or exceptions.',
      'Marriage outcome, divorce, breakup, infidelity, children, future relationship timing, and specific-partner attributes remain unauthorized unless independently evidenced and reviewed.',
      'Spouse-specific natal authority must not be reused as T10 compatibility authority.',
    ],
  ),
  requirement(
    'SPOUSE_NORMATIVE_PROVENANCE_REVIEW_MISSING',
    'Which independently traceable source and exact passage provide the normative basis for the proposed spouse-specific methodology?',
    [
      'A reproducible source identity and exact locator are required before authority admission.',
      'The passage must be reviewed in its original or otherwise verified surrounding context.',
      'Source availability or registration alone does not authorize a rule; adequacy, applicability, conflict, and provenance review remain required.',
    ],
  ),
] as const satisfies readonly RelationshipSpouseT8AuthorityRequirement[]);

export const RELATIONSHIP_SPOUSE_T8_AUTHORITY_CONTROL_IDS = Object.freeze([
  'BROAD_RELATIONSHIP_GENERAL_AUTHORITY_CANNOT_BE_RELABELED_AS_SPOUSE_AUTHORITY',
  'DAY_BRANCH_SPOUSE_PROJECTION_IS_NOT_ACTIVATED_BY_THIS_GATE',
  'TEN_GOD_SPOUSE_ROLE_MAPPING_IS_NOT_ACTIVATED_BY_THIS_GATE',
  'SOURCE_IDENTITY_AND_EXACT_LOCATOR_ARE_REQUIRED',
  'SOURCE_CONTEXT_AND_APPLICABILITY_BOUNDARY_ARE_REQUIRED',
  'GENERAL_KNOWLEDGE_CANNOT_CLOSE_THE_AUTHORITY_GAP',
  'SEARCH_SNIPPET_CANNOT_CLOSE_THE_AUTHORITY_GAP',
  'MODEL_SYNTHESIS_CANNOT_CREATE_MISSING_NORMATIVE_AUTHORITY',
  'COMPATIBILITY_AUTHORITY_CANNOT_SUBSTITUTE_FOR_SPOUSE_AUTHORITY',
  'SPECIFIC_PARTNER_ATTRIBUTES_AND_RELATIONSHIP_OUTCOMES_REMAIN_OUT_OF_SCOPE',
  'AUTHORITY_CANDIDATE_REQUIRES_SEPARATE_ADEQUACY_AND_PROVENANCE_REVIEW',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT_BY_THIS_GATE',
] as const);

export interface RelationshipSpouseT8AuthorityAcquisitionReadinessReviewReport {
  reviewId: string;
  reviewVersion: typeof RELATIONSHIP_SPOUSE_T8_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_AUTHORITY_ACQUISITION_READINESS_REVIEW'
    | 'BROAD_RELATIONSHIP_BOUNDARY_INVALID';
  decision:
    | 'FIVE_SPOUSE_T8_AUTHORITY_REQUIREMENTS_FROZEN_ZERO_SATISFIED_NO_SPOUSE_SEMANTICS_AUTHORIZED'
    | 'SPOUSE_T8_AUTHORITY_REQUIREMENTS_NOT_FROZEN';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  reviewerStatus: 'unreviewed';
  inheritedBroadRelationshipCandidateVersion: typeof RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION;
  broadRelationshipBoundaryAccepted: boolean;
  broadRelationshipRuleCount: number;
  broadRelationshipMayBeReusedAsSpouseAuthority: false;
  broadRelationshipAuthorityInsufficientForSpouse: boolean;
  spouseAuthorityAdmittedByThisGate: false;
  spouseAuthorityGapClosedByThisGate: false;
  requirements: readonly RelationshipSpouseT8AuthorityRequirement[];
  requirementCount: 5 | 0;
  allRequirementsMandatory: boolean;
  allRequirementsCurrentlyUnsatisfied: boolean;
  sourceIdentityRequired: true;
  exactLocatorRequired: true;
  originalOrVerifiedSourceContextRequired: true;
  explicitSpouseSemanticBindingRequired: true;
  applicabilityBoundaryRequired: true;
  dayBranchSpouseProjectionAuthorized: false;
  tenGodSpouseRoleMappingAuthorized: false;
  spouseT8RuleAuthoringAuthorized: false;
  spouseT8ClaimTypeCreationAuthorized: false;
  spouseInterpretationPackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  compatibilityAuthorityAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_AUTHORITY_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    registrySnapshotsCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW'
    | 'RELATIONSHIP_SPOUSE_T8_AUTHORITY_ACQUISITION_READINESS_REVIEW';
}

function broadRelationshipBoundaryAccepted(): boolean {
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

function finalized(
  material: Omit<RelationshipSpouseT8AuthorityAcquisitionReadinessReviewReport, 'reviewId'>,
): RelationshipSpouseT8AuthorityAcquisitionReadinessReviewReport {
  return {
    reviewId: `relationship_spouse_t8_authority_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview(): RelationshipSpouseT8AuthorityAcquisitionReadinessReviewReport {
  const boundaryAccepted = broadRelationshipBoundaryAccepted();

  return finalized({
    reviewVersion: RELATIONSHIP_SPOUSE_T8_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
    status: boundaryAccepted
      ? 'RESOLVED_RELATIONSHIP_SPOUSE_T8_AUTHORITY_ACQUISITION_READINESS_REVIEW'
      : 'BROAD_RELATIONSHIP_BOUNDARY_INVALID',
    decision: boundaryAccepted
      ? 'FIVE_SPOUSE_T8_AUTHORITY_REQUIREMENTS_FROZEN_ZERO_SATISFIED_NO_SPOUSE_SEMANTICS_AUTHORIZED'
      : 'SPOUSE_T8_AUTHORITY_REQUIREMENTS_NOT_FROZEN',
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    reviewerStatus: 'unreviewed',
    inheritedBroadRelationshipCandidateVersion: RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
    broadRelationshipBoundaryAccepted: boundaryAccepted,
    broadRelationshipRuleCount: boundaryAccepted ? RELATIONSHIP_NATAL_READING_RULES.length : 0,
    broadRelationshipMayBeReusedAsSpouseAuthority: false,
    broadRelationshipAuthorityInsufficientForSpouse: boundaryAccepted,
    spouseAuthorityAdmittedByThisGate: false,
    spouseAuthorityGapClosedByThisGate: false,
    requirements: boundaryAccepted ? RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS : Object.freeze([]),
    requirementCount: boundaryAccepted ? 5 : 0,
    allRequirementsMandatory:
      boundaryAccepted && RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.every((item) => item.mandatory),
    allRequirementsCurrentlyUnsatisfied:
      boundaryAccepted && RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.every((item) => !item.currentlySatisfied),
    sourceIdentityRequired: true,
    exactLocatorRequired: true,
    originalOrVerifiedSourceContextRequired: true,
    explicitSpouseSemanticBindingRequired: true,
    applicabilityBoundaryRequired: true,
    dayBranchSpouseProjectionAuthorized: false,
    tenGodSpouseRoleMappingAuthorized: false,
    spouseT8RuleAuthoringAuthorized: false,
    spouseT8ClaimTypeCreationAuthorized: false,
    spouseInterpretationPackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    compatibilityAuthorityAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: boundaryAccepted ? RELATIONSHIP_SPOUSE_T8_AUTHORITY_CONTROL_IDS : Object.freeze([]),
    controlCount: boundaryAccepted ? 12 : 0,
    controlsFrozen: boundaryAccepted,
    implementationEffects: {
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: boundaryAccepted
      ? 'RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW'
      : 'RELATIONSHIP_SPOUSE_T8_AUTHORITY_ACQUISITION_READINESS_REVIEW',
  });
}
