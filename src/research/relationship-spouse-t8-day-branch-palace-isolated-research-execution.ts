import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import {
  runInterpretation,
  type InterpretationExecutionResult,
  type InterpretationRunOptions,
} from '../interpretation/interpretation-engine.js';
import {
  deterministicContentHash,
  verifyResolvedRegistryContentIntegrity,
} from '../interpretation/rule-registry.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceBridgeReentryAdmissionReview,
} from './relationship-spouse-t8-day-branch-palace-bridge-reentry-admission-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE,
} from './relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_DIRECT_BASIS_SOURCE_LINKS,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_JUNG_RUNTIME_SOURCE_ID,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SAJU_ATELIER_RUNTIME_SOURCE_ID,
} from './relationship-spouse-t8-day-branch-palace-source-manifest-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
} from './relationship-spouse-t8-source-adjudicated-staging-runtime.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_ISOLATED_RESEARCH_EXECUTION_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-isolated-research-execution-v1' as const;

const EXECUTION_AUTHORITY_ID =
  'relationship-spouse-t8-day-branch-palace-isolated-research-execution-authority' as const;
const EXECUTION_AUTHORITY_VERSION = '1.0.0' as const;
const BRIDGE_REVIEW_REF_ID =
  'relationship-spouse-t8-day-branch-palace-bridge-reentry-admission-review' as const;
const BRIDGE_REVIEW_REF_VERSION = '1.0.0' as const;

const BRIDGE_REENTRY_ADMISSION_REVIEW =
  buildRelationshipSpouseT8DayBranchPalaceBridgeReentryAdmissionReview();

const BRIDGE_ADMISSION_REVIEW_REF = Object.freeze({
  id: BRIDGE_REVIEW_REF_ID,
  version: BRIDGE_REVIEW_REF_VERSION,
  contentHash: BRIDGE_REENTRY_ADMISSION_REVIEW.reviewId,
} satisfies ContentAddressedVersionedRef);

const REGISTRY_INTEGRITY_ERRORS = Object.freeze(
  verifyResolvedRegistryContentIntegrity(
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE,
  ),
);

export interface RelationshipSpouseT8DayBranchPalaceIsolatedResearchExecutionAuthorityMaterial {
  readonly authorityClass:
    'bridge_reentry_isolated_research_execution';
  readonly capabilityKey: 'relationship:natal:spouse';
  readonly semanticVersion: '2.0.0';
  readonly bridgeAdmissionReviewRef: ContentAddressedVersionedRef;
  readonly candidateRef: ContentAddressedVersionedRef;
  readonly authorizedRegistrySnapshotId: string;
  readonly authorizedPackRef: ContentAddressedVersionedRef;
  readonly isolatedResearchExecutionAuthorized: true;
  readonly lifecyclePromotionAuthorized: false;
  readonly productionAuthorityAuthorized: false;
}

export interface RelationshipSpouseT8DayBranchPalaceIsolatedResearchExecutionAuthority {
  readonly authorityRef: ContentAddressedVersionedRef;
  readonly material:
    RelationshipSpouseT8DayBranchPalaceIsolatedResearchExecutionAuthorityMaterial;
}

export interface RelationshipSpouseT8DayBranchPalaceIsolatedResearchExecutionAuthorityValidation {
  readonly valid: boolean;
  readonly blockers: readonly string[];
}

function refsEqual(
  left: ContentAddressedVersionedRef,
  right: ContentAddressedVersionedRef,
): boolean {
  return (
    left.id === right.id &&
    left.version === right.version &&
    left.contentHash === right.contentHash
  );
}

function contentRefValid(ref: ContentAddressedVersionedRef): boolean {
  return (
    ref.id.trim().length > 0 &&
    ref.version.trim().length > 0 &&
    /^[a-f0-9]{64}$/u.test(ref.contentHash)
  );
}

function buildBridgeAdmissionReviewRef(): ContentAddressedVersionedRef {
  return BRIDGE_ADMISSION_REVIEW_REF;
}

export function buildRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecutionAuthority():
  RelationshipSpouseT8DayBranchPalaceIsolatedResearchExecutionAuthority {
  const review = BRIDGE_REENTRY_ADMISSION_REVIEW;

  if (
    review.bridgeReentryAdmissionAuthorized !== true ||
    review.nextDisposition !==
      'BUILD_SA_5E_ISOLATED_RESEARCH_EXECUTION'
  ) {
    throw new Error(
      'Relationship Spouse T8 Day-Branch spouse-palace isolated execution requires the exact SA-5D Bridge re-entry admission.',
    );
  }

  const material = Object.freeze({
    authorityClass:
      'bridge_reentry_isolated_research_execution' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticVersion: '2.0.0' as const,
    bridgeAdmissionReviewRef: buildBridgeAdmissionReviewRef(),
    candidateRef: Object.freeze({ ...review.candidateRef }),
    authorizedRegistrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.snapshot
        .registrySnapshotId,
    authorizedPackRef: Object.freeze({
      ...RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.snapshot
        .packRef,
    }),
    isolatedResearchExecutionAuthorized: true as const,
    lifecyclePromotionAuthorized: false as const,
    productionAuthorityAuthorized: false as const,
  } satisfies RelationshipSpouseT8DayBranchPalaceIsolatedResearchExecutionAuthorityMaterial);

  const authorityRef = Object.freeze({
    id: EXECUTION_AUTHORITY_ID,
    version: EXECUTION_AUTHORITY_VERSION,
    contentHash: deterministicContentHash(material),
  });

  return Object.freeze({
    authorityRef,
    material,
  });
}

export function validateRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecutionAuthority(
  authority:
    RelationshipSpouseT8DayBranchPalaceIsolatedResearchExecutionAuthority,
): RelationshipSpouseT8DayBranchPalaceIsolatedResearchExecutionAuthorityValidation {
  const review = BRIDGE_REENTRY_ADMISSION_REVIEW;
  const expectedReviewRef = buildBridgeAdmissionReviewRef();
  const blockers: string[] = [];

  if (review.bridgeReentryAdmissionAuthorized !== true) {
    blockers.push('SA5E_BRIDGE_REENTRY_ADMISSION_NOT_AUTHORIZED');
  }
  if (
    review.nextDisposition !==
    'BUILD_SA_5E_ISOLATED_RESEARCH_EXECUTION'
  ) {
    blockers.push('SA5E_BRIDGE_REENTRY_DISPOSITION_MISMATCH');
  }

  if (
    authority.material.authorityClass !==
    'bridge_reentry_isolated_research_execution'
  ) {
    blockers.push('SA5E_AUTHORITY_CLASS_MISMATCH');
  }
  if (
    authority.material.capabilityKey !==
    'relationship:natal:spouse'
  ) {
    blockers.push('SA5E_CAPABILITY_KEY_MISMATCH');
  }
  if (authority.material.semanticVersion !== '2.0.0') {
    blockers.push('SA5E_SEMANTIC_VERSION_MISMATCH');
  }
  if (
    authority.material.isolatedResearchExecutionAuthorized !== true
  ) {
    blockers.push('SA5E_ISOLATED_RESEARCH_EXECUTION_NOT_AUTHORIZED');
  }
  if (authority.material.lifecyclePromotionAuthorized !== false) {
    blockers.push('SA5E_LIFECYCLE_PROMOTION_MUST_REMAIN_FALSE');
  }
  if (authority.material.productionAuthorityAuthorized !== false) {
    blockers.push('SA5E_PRODUCTION_AUTHORITY_MUST_REMAIN_FALSE');
  }

  for (const [label, ref] of [
    ['BRIDGE_REVIEW', authority.material.bridgeAdmissionReviewRef],
    ['CANDIDATE', authority.material.candidateRef],
    ['PACK', authority.material.authorizedPackRef],
    ['AUTHORITY', authority.authorityRef],
  ] as const) {
    if (!contentRefValid(ref)) {
      blockers.push(`SA5E_${label}_REF_INVALID`);
    }
  }

  if (
    !refsEqual(
      authority.material.bridgeAdmissionReviewRef,
      expectedReviewRef,
    )
  ) {
    blockers.push('SA5E_BRIDGE_REVIEW_REF_DRIFT');
  }
  if (!refsEqual(authority.material.candidateRef, review.candidateRef)) {
    blockers.push('SA5E_CANDIDATE_REF_DRIFT');
  }
  if (
    authority.material.authorizedRegistrySnapshotId !==
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.snapshot
      .registrySnapshotId
  ) {
    blockers.push('SA5E_REGISTRY_SNAPSHOT_DRIFT');
  }
  if (
    !refsEqual(
      authority.material.authorizedPackRef,
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.snapshot
        .packRef,
    )
  ) {
    blockers.push('SA5E_PACK_REF_DRIFT');
  }

  if (
    authority.authorityRef.id !== EXECUTION_AUTHORITY_ID ||
    authority.authorityRef.version !== EXECUTION_AUTHORITY_VERSION ||
    authority.authorityRef.contentHash !==
      deterministicContentHash(authority.material)
  ) {
    blockers.push('SA5E_AUTHORITY_REF_DRIFT');
  }

  return Object.freeze({
    valid: blockers.length === 0,
    blockers: Object.freeze([...new Set(blockers)].sort()),
  });
}

function exactArray(
  left: readonly string[],
  right: readonly string[],
): boolean {
  return (
    left.length === right.length &&
    left.every((value, index) => value === right[index])
  );
}

export function buildRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution() {
  const review = BRIDGE_REENTRY_ADMISSION_REVIEW;
  const authority =
    buildRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecutionAuthority();
  const authorityValidation =
    validateRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecutionAuthority(
      authority,
    );
  const registryIntegrityErrors = REGISTRY_INTEGRITY_ERRORS;

  const exactBridgeAdmission =
    review.bridgeReentryAdmissionAuthorized === true &&
    review.semanticVersion === '2.0.0' &&
    review.nextDisposition ===
      'BUILD_SA_5E_ISOLATED_RESEARCH_EXECUTION';

  const exactCandidateBinding =
    refsEqual(authority.material.candidateRef, review.candidateRef) &&
    refsEqual(
      authority.material.bridgeAdmissionReviewRef,
      buildBridgeAdmissionReviewRef(),
    );

  const exactRegistryBinding =
    authority.material.authorizedRegistrySnapshotId ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.snapshot
        .registrySnapshotId &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.rules
      .length === 1 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE
      .methodologies.length === 1 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.sources
      .length === 2;

  const exactPackBinding =
    refsEqual(
      authority.material.authorizedPackRef,
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.snapshot
        .packRef,
    ) &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK.status === 'research';

  const registeredSourceIds =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.sources.map(
      (source) => source.sourceId,
    );
  const expectedSourceIds = [
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_JUNG_RUNTIME_SOURCE_ID,
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SAJU_ATELIER_RUNTIME_SOURCE_ID,
  ] as const;

  const exactSourceBinding =
    exactArray(registeredSourceIds, expectedSourceIds) &&
    exactArray(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY.sourceIds,
      expectedSourceIds,
    ) &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_DIRECT_BASIS_SOURCE_LINKS
      .length === 2 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_DIRECT_BASIS_SOURCE_LINKS.every(
      (sourceRef, index) =>
        sourceRef.sourceId === expectedSourceIds[index] &&
        sourceRef.supportType === 'direct_basis',
    );

  const noCorroborationInflation = registeredSourceIds.every(
    (sourceId) =>
      !sourceId.includes('LEI') &&
      !sourceId.includes('OPENFATE') &&
      !sourceId.includes('ZIPING'),
  );

  const exactClaimSurface =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.rules
      .length === 1 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.output.claimType ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.output.value.position ===
      'day_branch' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.output.value
      .traditionalRole === 'spouse_palace' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.output.value
      .semanticScope === 'position_only';

  const reviewAuthorityPreserved =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.quality.reviewerStatus ===
      'unreviewed' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE
      .reviewAttestations.length === 0;

  const legacyV110Isolated =
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION ===
      '1.1.0' &&
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY.status ===
      'reviewed' &&
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES.every(
      (rule) =>
        rule.status === 'reviewed' &&
        rule.quality.provenanceQuality === 'unknown' &&
        rule.quality.reviewerStatus === 'unreviewed',
    ) &&
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK.status ===
      'staging';

  const authorityInjectionBlocked = true;

  const checks = Object.freeze({
    exactBridgeAdmission,
    exactCandidateBinding,
    exactRegistryBinding,
    exactPackBinding,
    registryIntegrityVerified: registryIntegrityErrors.length === 0,
    exactSourceBinding,
    noCorroborationInflation,
    exactClaimSurface,
    reviewAuthorityPreserved,
    legacyV110Isolated,
    authorityInjectionBlocked,
    authorityValidationValid: authorityValidation.valid,
    registryIntegrityErrors: Object.freeze([...registryIntegrityErrors]),
    authorityValidationBlockers: Object.freeze([
      ...authorityValidation.blockers,
    ]),
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(
        ([key, value]) =>
          key !== 'registryIntegrityErrors' &&
          key !== 'authorityValidationBlockers' &&
          value !== true,
      )
      .map(([key]) =>
        `SA5E_${key
          .replace(/[A-Z]/gu, (match) => `_${match}`)
          .toUpperCase()}_FAILED`,
      )
      .concat(
        registryIntegrityErrors.map(
          (error) => `SA5E_REGISTRY_INTEGRITY:${error}`,
        ),
        authorityValidation.blockers.map(
          (blocker) => `SA5E_AUTHORITY_VALIDATION:${blocker}`,
        ),
      )
      .sort(),
  );

  const isolatedResearchExecutionAuthorized =
    blockers.length === 0;

  const material = Object.freeze({
    executionVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_ISOLATED_RESEARCH_EXECUTION_VERSION,
    issue: '#1862' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    upstreamBridgeAdmissionReviewId: review.reviewId,
    bridgeAdmissionReviewRef:
      authority.material.bridgeAdmissionReviewRef,
    candidateRef: authority.material.candidateRef,
    authorizedRegistrySnapshotId:
      authority.material.authorizedRegistrySnapshotId,
    authorizedPackRef: authority.material.authorizedPackRef,
    executionAuthorityRef: authority.authorityRef,
    checks,
    blockers,
    isolatedResearchExecutionAuthorized,
    authorityBoundary: Object.freeze({
      bridgeReentryAdmissionAuthorized: true as const,
      isolatedResearchExecutionAuthorized,
      sourceBoundCandidateReusedWithoutMutation: true as const,
      newRegistryCreated: false as const,
      legacyV110Mutated: false as const,
      reviewAttestationCreated: false as const,
      reviewerTrustGrantEstablished: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      lifecycleMutationAuthorized: false as const,
      stagingAuthorized: false as const,
      shadowExecutionAuthorized: false as const,
      narrativeConsumerActivated: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: isolatedResearchExecutionAuthorized
      ? ('RUN_SA_5F_STAGING_LIFECYCLE_ELIGIBILITY_REVIEW' as const)
      : ('REPAIR_SA_5E_ISOLATED_RESEARCH_EXECUTION' as const),
  });

  return Object.freeze({
    executionId: deterministicContentHash(material),
    executionAuthority: authority,
    ...material,
  });
}

let cachedIsolatedResearchExecution:
  | ReturnType<
      typeof buildRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution
    >
  | undefined;

function getRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution() {
  cachedIsolatedResearchExecution ??=
    buildRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution();
  return cachedIsolatedResearchExecution;
}

export type RelationshipSpouseT8DayBranchPalaceIsolatedResearchRunOptions =
  Omit<
    InterpretationRunOptions,
    'promotionAuthorityContext' | 'reviewerTrustContext'
  >;

export function runRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution(
  snapshot: CanonicalSajuSnapshot,
  options:
    RelationshipSpouseT8DayBranchPalaceIsolatedResearchRunOptions = {},
): InterpretationExecutionResult {
  if (
    'promotionAuthorityContext' in options ||
    'reviewerTrustContext' in options
  ) {
    throw new Error(
      'Relationship Spouse T8 Day-Branch spouse-palace isolated research execution does not accept caller-supplied promotion or reviewer-trust authority.',
    );
  }

  const execution =
    getRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution();

  if (!execution.isolatedResearchExecutionAuthorized) {
    throw new Error(
      `Relationship Spouse T8 Day-Branch spouse-palace isolated research execution is not authorized: ${execution.blockers.join(', ')}`,
    );
  }

  return runInterpretation(
    snapshot,
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE,
    options,
  );
}
