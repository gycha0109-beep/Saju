import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { resolvePreviewSemanticAdmissionV1 } from '../preview/preview-semantic-admission.js';
import { resolveDomainReadingProfile } from '../reading/reading-intent-composition.js';
import { resolveReadingProfileSelectionAuthorization } from '../reading/reading-profile-authorization.js';
import {
  GENERAL_NATAL_CONCLUSION_SOURCE,
} from './general-natal-conclusion-synthesis-candidate.js';
import {
  GENERAL_NATAL_USEFUL_READING_SOURCE,
} from './general-natal-useful-reading-candidate.js';
import {
  RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
  RELATIONSHIP_NATAL_READING_METHODOLOGY,
  RELATIONSHIP_NATAL_READING_RULES,
} from './relationship-natal-reading-candidate.js';

export const RELATIONSHIP_NATAL_GENERAL_AUTHORITY_BRIDGE_REVIEW_VERSION =
  'myeonghwa-relationship-natal-general-authority-bridge-review-v1' as const;

const GENERAL_SOURCE_IDS = Object.freeze([
  GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
  GENERAL_NATAL_CONCLUSION_SOURCE.sourceId,
] as const);

function sameStringSet(actual: readonly string[], expected: readonly string[]): boolean {
  const left = [...actual].sort();
  const right = [...expected].sort();
  return (
    left.length === right.length &&
    left.every((value, index) => value === right[index])
  );
}

export function buildRelationshipNatalGeneralAuthorityBridgeReview() {
  const previewAdmission = resolvePreviewSemanticAdmissionV1(
    'RELATIONSHIP_NATAL_READING_CANDIDATE',
    'relationship:natal:general',
  );
  const readingProfile = resolveDomainReadingProfile({
    domain: 'relationship',
    temporalScope: 'natal',
    relationshipScope: 'general',
  });
  const readingAuthorization =
    readingProfile === undefined
      ? undefined
      : resolveReadingProfileSelectionAuthorization(readingProfile.profileRef);

  const exactCandidateVersion =
    RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION === '0.5.0-research';
  const exactRelationshipRuleCount = RELATIONSHIP_NATAL_READING_RULES.length === 11;
  const allRelationshipRulesResearchOnly =
    RELATIONSHIP_NATAL_READING_RULES.every((rule) => rule.status === 'research');
  const allRelationshipRulesUnreviewed =
    RELATIONSHIP_NATAL_READING_RULES.every(
      (rule) => rule.quality.reviewerStatus === 'unreviewed',
    );
  const allRelationshipRulesTaxonomyExact =
    RELATIONSHIP_NATAL_READING_RULES.every(
      (rule) =>
        rule.taxonomy.tier === 'T8' &&
        rule.taxonomy.category === 'relationship' &&
        rule.taxonomy.subcategory === 'general',
    );
  const methodologyResearchOnly =
    RELATIONSHIP_NATAL_READING_METHODOLOGY.status === 'research';
  const methodologyUsesOnlyGeneralNatalSources = sameStringSet(
    RELATIONSHIP_NATAL_READING_METHODOLOGY.sourceIds,
    GENERAL_SOURCE_IDS,
  );
  const everyRelationshipRuleUsesOnlyGeneralNatalSources =
    RELATIONSHIP_NATAL_READING_RULES.every((rule) =>
      sameStringSet(
        rule.sourceRefs.map((ref) => ref.sourceId),
        GENERAL_SOURCE_IDS,
      ),
    );

  const previewBaselinePresent =
    previewAdmission !== undefined &&
    previewAdmission.disposition === 'claim' &&
    previewAdmission.boundaries.includes('PREVIEW_BASELINE_ONLY') &&
    previewAdmission.effects.mayAffectProductionAuthority === false &&
    previewAdmission.effects.mayPromoteResearchLifecycle === false;

  const readingSelectionAuthorized =
    readingAuthorization?.state === 'authorized' &&
    readingAuthorization.authorization?.scope ===
      'reading_evidence_selection_only' &&
    readingAuthorization.authorization.constraints
      .mayAuthorizeInterpretationRules === false &&
    readingAuthorization.authorization.constraints
      .mayAuthorizeClaimGeneration === false &&
    readingAuthorization.authorization.constraints
      .mayAuthorizeDomainSemantics === false &&
    readingAuthorization.authorization.constraints
      .mayPromoteResearchAuthority === false;

  const candidateRepresentable =
    exactCandidateVersion &&
    exactRelationshipRuleCount &&
    allRelationshipRulesTaxonomyExact;

  const relationshipSpecificSourceAuthorityEstablished = false as const;
  const relationshipDomainProjectionAuthorityEstablished = false as const;
  const sourceGroundedAiInternalReviewPassed = false as const;

  const researchReturnRequired =
    candidateRepresentable &&
    methodologyResearchOnly &&
    allRelationshipRulesResearchOnly &&
    allRelationshipRulesUnreviewed &&
    methodologyUsesOnlyGeneralNatalSources &&
    everyRelationshipRuleUsesOnlyGeneralNatalSources &&
    previewBaselinePresent &&
    readingSelectionAuthorized &&
    !relationshipSpecificSourceAuthorityEstablished &&
    !relationshipDomainProjectionAuthorityEstablished;

  const material = Object.freeze({
    reviewVersion: RELATIONSHIP_NATAL_GENERAL_AUTHORITY_BRIDGE_REVIEW_VERSION,
    issue: '#1797' as const,
    capabilityKey: 'relationship:natal:general' as const,
    candidateVersion: RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
    relationshipRuleCount: RELATIONSHIP_NATAL_READING_RULES.length,
    candidateChecks: Object.freeze({
      exactCandidateVersion,
      exactRelationshipRuleCount,
      allRelationshipRulesResearchOnly,
      allRelationshipRulesUnreviewed,
      allRelationshipRulesTaxonomyExact,
      methodologyResearchOnly,
    }),
    sourceAuthority: Object.freeze({
      currentMethodologySourceIds: Object.freeze([
        ...RELATIONSHIP_NATAL_READING_METHODOLOGY.sourceIds,
      ]),
      generalNatalSourceIds: GENERAL_SOURCE_IDS,
      methodologyUsesOnlyGeneralNatalSources,
      everyRelationshipRuleUsesOnlyGeneralNatalSources,
      relationshipSpecificSourceAuthorityEstablished,
      relationshipDomainProjectionAuthorityEstablished,
      sourceGroundedAiInternalReviewPassed,
      reviewFinding:
        'CURRENT_BOUND_SOURCES_SUPPORT_GENERAL_TEN_GOD_VOCABULARY_AND_FAMILY_RELATIONS_BUT_DO_NOT_ESTABLISH_THE_11_RELATIONSHIP_DOMAIN_PROJECTIONS' as const,
    }),
    consumerAuthority: Object.freeze({
      previewBaselinePresent,
      previewAdmissionId: previewAdmission?.admissionId,
      previewAdmissionMayAffectProductionAuthority:
        previewAdmission?.effects.mayAffectProductionAuthority ?? false,
      readingSelectionAuthorized,
      readingProfileRef: readingProfile?.profileRef,
      previewAdmissionIsEngineSemanticAuthority: false as const,
      readingProfileAuthorizationIsEngineSemanticAuthority: false as const,
      officialReadingFidelityIsEngineSemanticAuthority: false as const,
    }),
    decision: Object.freeze({
      candidateRepresentable,
      candidateRejected: false as const,
      researchReturnRequired,
      bridgeDecision: researchReturnRequired
        ? ('RETURN_TO_RESEARCH' as const)
        : ('REVIEW_INCONSISTENT' as const),
      engineAuthorityPromotion: false as const,
      g2aAdmitted: false as const,
      previewExpansionAuthorized: false as const,
      officialReadingExpansionAuthorized: false as const,
      lifecyclePromotionAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    researchReturnWorkstreams: Object.freeze([
      'RELATIONSHIP_SPECIFIC_SOURCE_SUPPORT_FOR_EACH_RETAINED_CONCLUSION_FAMILY',
      'TEN_GOD_FAMILY_OR_RELATION_TO_RELATIONSHIP_DOMAIN_MAPPING_AUTHORITY',
      'RELATIONSHIP_SCOPE_QUALIFIERS_COUNTEREXAMPLES_AND_NON_IMPLICATIONS',
      'SCHOOL_DEPENDENCE_AND_METHOD_BOUNDARY',
      'EXACT_RETAIN_OR_REMOVE_DECISION_FOR_CURRENT_11_RULE_SURFACE',
      'FRESH_BRIDGE_REREVIEW_AFTER_SOURCE_CLOSURE',
    ] as const),
    prohibitedShortcuts: Object.freeze([
      'PREVIEW_BASELINE_DOES_NOT_IMPLY_ENGINE_AUTHORITY',
      'READING_PROFILE_SELECTION_DOES_NOT_IMPLY_ENGINE_AUTHORITY',
      'OFFICIAL_READING_FIDELITY_DOES_NOT_IMPLY_ENGINE_AUTHORITY',
      'GENERAL_TEN_GOD_SOURCE_AUTHORITY_DOES_NOT_AUTO_AUTHORIZE_RELATIONSHIP_DOMAIN_PROJECTION',
      'AI_REVIEW_MUST_NOT_APPROVE_UNSUPPORTED_DOMAIN_PROJECTION',
    ] as const),
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
  });
}
