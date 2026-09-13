import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION,
  type GeneralNatalGejuCandidatePredicateGap,
} from './general-natal-geju-candidate-source-frontier.js';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_VERSION,
} from './general-natal-geju-candidate-identity-admission-review.js';

export const GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_SCOPE =
  'ziping_zhenquan_establishment_source_clause_admission_review' as const;
export const GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_DECISION =
  'SOURCE_CLAUSE_FAMILIES_OBSERVED_CANONICAL_EXECUTION_NOT_AUTHORIZED' as const;

export const GENERAL_NATAL_GEJU_ESTABLISHMENT_PATTERN_FAMILIES = Object.freeze([
  'zheng_guan',
  'cai',
  'yin',
  'shi_shen',
  'qi_sha',
  'shang_guan',
  'yang_ren',
  'jian_lu_yue_jie',
] as const);

export const GENERAL_NATAL_GEJU_ESTABLISHMENT_UNRESOLVED_PRIMITIVES = Object.freeze([
  'canonical_candidate_identity',
  'ordinary_strength_classification',
  'root_weight_classification',
  'position_appropriateness',
  'xing_chong_po_hai_effect',
  'mixed_outcome_representation',
  'rescue_precedence_and_weighting',
] as const);

export interface GeneralNatalGejuEstablishmentSourceClauseAdmissionReviewReport {
  readonly reviewId: string;
  readonly reviewVersion: typeof GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_VERSION;
  readonly sourceScope: typeof GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_SCOPE;
  readonly decision: typeof GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_DECISION;
  readonly upstreamCandidateFrontierVersion: typeof GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION;
  readonly upstreamCandidateFrontierDefinitionHash: string;
  readonly upstreamCandidateIdentityReviewVersion: typeof GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_VERSION;
  readonly upstreamCandidateIdentityReviewDefinitionHash: string;
  readonly directSourceFormationSuccessClausesObserved: true;
  readonly directSourceFormationFailureClausesObserved: true;
  readonly directSourceMixedOutcomeAndRescueLayerObserved: true;
  readonly sourceSemanticEstablishmentClauseInventoryAuthorized: true;
  readonly sourcePatternFamilyScopeObserved: true;
  readonly binaryEstablishmentStateSufficient: false;
  readonly canonicalCandidateIdentityAvailable: false;
  readonly canonicalClauseInputResolutionAuthorized: false;
  readonly canonicalExecutableEstablishmentPredicateAuthorized: false;
  readonly candidateDerivationAuthorized: false;
  readonly establishmentPredicateAuthorized: false;
  readonly candidateFactsEmitted: false;
  readonly establishmentFactsEmitted: false;
  readonly establishmentGapNarrowedToCanonicalExecution: true;
  readonly establishmentCoarseGapClosed: false;
  readonly patternFamilies: typeof GENERAL_NATAL_GEJU_ESTABLISHMENT_PATTERN_FAMILIES;
  readonly unresolvedPrimitives: typeof GENERAL_NATAL_GEJU_ESTABLISHMENT_UNRESOLVED_PRIMITIVES;
  readonly openPredicateGaps: readonly GeneralNatalGejuCandidatePredicateGap[];
  readonly authorityBoundary: string;
  readonly notes: readonly string[];
}

export const GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_VERSION,
        sourceScope: GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_SCOPE,
        decision: GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_DECISION,
        upstreamCandidateFrontierVersion: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION,
        upstreamCandidateFrontierDefinitionHash:
          GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_DEFINITION_HASH,
        upstreamCandidateIdentityReviewVersion:
          GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_VERSION,
        upstreamCandidateIdentityReviewDefinitionHash:
          GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_DEFINITION_HASH,
        patternFamilies: GENERAL_NATAL_GEJU_ESTABLISHMENT_PATTERN_FAMILIES,
        unresolvedPrimitives: GENERAL_NATAL_GEJU_ESTABLISHMENT_UNRESOLVED_PRIMITIVES,
        sourceSemanticEstablishmentClauseInventoryAuthorized: true,
        binaryEstablishmentStateSufficient: false,
        canonicalClauseInputResolutionAuthorized: false,
        canonicalExecutableEstablishmentPredicateAuthorized: false,
        establishmentCoarseGapClosed: false,
        openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
      }),
    )
    .digest('hex');

export function buildGeneralNatalGejuEstablishmentSourceClauseAdmissionReview(): GeneralNatalGejuEstablishmentSourceClauseAdmissionReviewReport {
  const material = {
    reviewVersion: GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_VERSION,
    sourceScope: GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_SCOPE,
    decision: GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_DECISION,
    upstreamCandidateFrontierVersion: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION,
    upstreamCandidateFrontierDefinitionHash:
      GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_DEFINITION_HASH,
    upstreamCandidateIdentityReviewVersion:
      GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_VERSION,
    upstreamCandidateIdentityReviewDefinitionHash:
      GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_DEFINITION_HASH,
    directSourceFormationSuccessClausesObserved: true as const,
    directSourceFormationFailureClausesObserved: true as const,
    directSourceMixedOutcomeAndRescueLayerObserved: true as const,
    sourceSemanticEstablishmentClauseInventoryAuthorized: true as const,
    sourcePatternFamilyScopeObserved: true as const,
    binaryEstablishmentStateSufficient: false as const,
    canonicalCandidateIdentityAvailable: false as const,
    canonicalClauseInputResolutionAuthorized: false as const,
    canonicalExecutableEstablishmentPredicateAuthorized: false as const,
    candidateDerivationAuthorized: false as const,
    establishmentPredicateAuthorized: false as const,
    candidateFactsEmitted: false as const,
    establishmentFactsEmitted: false as const,
    establishmentGapNarrowedToCanonicalExecution: true as const,
    establishmentCoarseGapClosed: false as const,
    patternFamilies: GENERAL_NATAL_GEJU_ESTABLISHMENT_PATTERN_FAMILIES,
    unresolvedPrimitives: GENERAL_NATAL_GEJU_ESTABLISHMENT_UNRESOLVED_PRIMITIVES,
    openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
    authorityBoundary:
      'Merged source authority now supports a research-only inventory of direct establishment success and failure clause families plus mixed-outcome and rescue semantics. Canonical execution remains blocked because candidate identity and required clause primitives are not governed, and the mixed-outcome layer cannot be reduced to an unqualified binary state.',
  };

  return Object.freeze({
    reviewId: `general_natal_geju_establishment_source_clause_admission_review_${createHash('sha256')
      .update(JSON.stringify(material))
      .digest('hex')
      .slice(0, 24)}`,
    ...material,
    notes: Object.freeze([
      'Direct source clause evidence advances the establishment frontier without creating canonical runtime authority.',
      'The coarse establishment gap remains open because the remaining blocker is canonical execution and representation, not absence of source clauses.',
      'All five coarse Gyeokguk gaps remain listed until a later review explicitly revises the shared frontier contract.',
      'General Natal production authority, P0-CM-03, NEXT_PRODUCTION_SKU, and Commerce remain blocked.',
    ]),
  });
}
