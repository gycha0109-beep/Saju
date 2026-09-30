import {
  calculateCanonicalSajuSnapshot,
} from '../calculation/calculation-engine.js';
import type {
  CalculationPolicySnapshot,
  CanonicalSajuSnapshot,
  EarthlyBranch,
} from '../contracts/calculation.js';
import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import {
  SOURCE_ADJUDICATION_STAGING_AUTHORIZATION_POLICY_VERSION,
  runInterpretation,
  type InterpretationExecutionResult,
  type InterpretationRunOptions,
} from '../interpretation/interpretation-engine.js';
import {
  buildSourceAdjudicationExecutionAuthorityRef,
  validateSourceAdjudicationExecutionAuthority,
  type SourceAdjudicationExecutionAuthority,
  type SourceAdjudicationExecutionAuthorityMaterial,
} from '../interpretation/promotion-authority.js';
import {
  deterministicContentHash,
} from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
} from './relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  runRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution,
} from './relationship-spouse-t8-day-branch-palace-isolated-research-execution.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_JUNG_RUNTIME_SOURCE_ID,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SAJU_ATELIER_RUNTIME_SOURCE_ID,
} from './relationship-spouse-t8-day-branch-palace-source-manifest-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision,
} from './relationship-spouse-t8-day-branch-palace-staging-governance-decision.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE,
  buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization,
} from './relationship-spouse-t8-day-branch-palace-staging-lifecycle-materialization.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
} from './relationship-spouse-t8-source-adjudicated-staging-runtime.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_ISOLATED_SHADOW_STAGING_EXECUTION_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-isolated-shadow-staging-execution-v1' as const;

const STAGING_EXECUTION_AUTHORITY_ID =
  'relationship-spouse-t8-day-branch-palace-source-adjudicated-staging-execution-authority' as const;
const STAGING_EXECUTION_AUTHORITY_VERSION = '1.0.0' as const;

const CALCULATION_NOW = new Date('2026-09-30T00:00:00.000Z');
const INTERPRETATION_NOW = new Date('2026-09-30T00:01:00.000Z');

const CALCULATION_POLICY = Object.freeze({
  policyId:
    'myeonghwa/relationship-spouse-t8-day-branch-palace-sa5i-shadow-staging',
  policyVersion: '1.0.0',
  dayBoundary: 'midnight',
  trueSolarTime: {
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  },
  timeZonePolicy: {
    source: 'service-default',
    timeZone: 'Asia/Seoul',
  },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
} as const satisfies CalculationPolicySnapshot);

const EARTHLY_BRANCHES = Object.freeze([
  '자',
  '축',
  '인',
  '묘',
  '진',
  '사',
  '오',
  '미',
  '신',
  '유',
  '술',
  '해',
] as const satisfies readonly EarthlyBranch[]);

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

export interface RelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthorityMaterial
  extends SourceAdjudicationExecutionAuthorityMaterial {
  readonly upstreamMaterializationId: string;
  readonly upstreamMaterializationRef: ContentAddressedVersionedRef;
}

export interface RelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthority
  extends SourceAdjudicationExecutionAuthority {
  readonly material:
    RelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthorityMaterial;
}

export function buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthority():
  RelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthority {
  const materialization =
    buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization();
  const governance =
    buildRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision();

  if (
    materialization.stagingLifecycleMaterializationEstablished !== true ||
    materialization.materializationRef === undefined ||
    materialization.governanceDecisionRef === undefined ||
    materialization.nextDisposition !==
      'RUN_SA_5I_ISOLATED_SHADOW_STAGING_EXECUTION_REVIEW' ||
    governance.sourceAdjudicationAuthorityEstablished !== true ||
    governance.decisionRef === undefined
  ) {
    throw new Error(
      'Relationship Spouse T8 Day-Branch spouse-palace shadow staging execution requires the exact established SA-5H lifecycle materialization and SA-5G governance decision.',
    );
  }

  const material = Object.freeze({
    authorityClass: 'source_adjudication' as const,
    lifecycleTarget: 'staging' as const,
    capabilityKey: 'relationship:natal:spouse',
    policyRef: Object.freeze({ ...materialization.policyRef }),
    candidateRef: Object.freeze({ ...materialization.candidateRef }),
    decisionRef: Object.freeze({ ...materialization.governanceDecisionRef }),
    authorizedRegistrySnapshotId:
      materialization.stagingRegistrySnapshotId,
    authorizedPackRef: Object.freeze({ ...materialization.stagingPackRef }),
    sourceAdjudicationAuthorityEstablished: true as const,
    productionAuthorityAuthorized: false as const,
    upstreamMaterializationId: materialization.materializationId,
    upstreamMaterializationRef: Object.freeze({
      ...materialization.materializationRef,
    }),
  } satisfies RelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthorityMaterial);

  const authorityRef = buildSourceAdjudicationExecutionAuthorityRef(
    STAGING_EXECUTION_AUTHORITY_ID,
    STAGING_EXECUTION_AUTHORITY_VERSION,
    material,
  );

  return Object.freeze({
    authorityRef,
    material,
  });
}

export function validateRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthority(
  authority: RelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthority,
) {
  const materialization =
    buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization();
  const governance =
    buildRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision();
  const blockers = [
    ...validateSourceAdjudicationExecutionAuthority(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
      authority,
    ).blockers,
  ];

  if (
    materialization.stagingLifecycleMaterializationEstablished !== true ||
    materialization.materializationRef === undefined ||
    materialization.governanceDecisionRef === undefined
  ) {
    blockers.push('SA5I_STAGING_LIFECYCLE_MATERIALIZATION_NOT_ESTABLISHED');
  } else {
    if (
      authority.material.upstreamMaterializationId !==
      materialization.materializationId
    ) {
      blockers.push('SA5I_MATERIALIZATION_ID_DRIFT');
    }
    if (
      !refsEqual(
        authority.material.upstreamMaterializationRef,
        materialization.materializationRef,
      )
    ) {
      blockers.push('SA5I_MATERIALIZATION_REF_DRIFT');
    }
    if (
      authority.material.authorizedRegistrySnapshotId !==
      materialization.stagingRegistrySnapshotId
    ) {
      blockers.push('SA5I_STAGING_REGISTRY_SNAPSHOT_DRIFT');
    }
    if (
      !refsEqual(
        authority.material.authorizedPackRef,
        materialization.stagingPackRef,
      )
    ) {
      blockers.push('SA5I_STAGING_PACK_REF_DRIFT');
    }
    if (!refsEqual(authority.material.policyRef, materialization.policyRef)) {
      blockers.push('SA5I_POLICY_REF_DRIFT');
    }
    if (
      !refsEqual(
        authority.material.candidateRef,
        materialization.candidateRef,
      )
    ) {
      blockers.push('SA5I_CANDIDATE_REF_DRIFT');
    }
    if (
      !refsEqual(
        authority.material.decisionRef,
        materialization.governanceDecisionRef,
      )
    ) {
      blockers.push('SA5I_DECISION_REF_DRIFT');
    }
  }

  if (
    governance.sourceAdjudicationAuthorityEstablished !== true ||
    governance.decisionRef === undefined
  ) {
    blockers.push('SA5I_SOURCE_ADJUDICATION_GOVERNANCE_NOT_ESTABLISHED');
  } else {
    if (!refsEqual(authority.material.policyRef, governance.decisionMaterial.policyRef)) {
      blockers.push('SA5I_GOVERNANCE_POLICY_REF_DRIFT');
    }
    if (
      !refsEqual(
        authority.material.candidateRef,
        governance.decisionMaterial.candidateRef,
      )
    ) {
      blockers.push('SA5I_GOVERNANCE_CANDIDATE_REF_DRIFT');
    }
    if (!refsEqual(authority.material.decisionRef, governance.decisionRef)) {
      blockers.push('SA5I_GOVERNANCE_DECISION_REF_DRIFT');
    }
  }

  if (!contentRefValid(authority.material.upstreamMaterializationRef)) {
    blockers.push('SA5I_MATERIALIZATION_REF_INVALID');
  }

  if (
    authority.authorityRef.id !== STAGING_EXECUTION_AUTHORITY_ID ||
    authority.authorityRef.version !== STAGING_EXECUTION_AUTHORITY_VERSION ||
    authority.authorityRef.contentHash !==
      deterministicContentHash(authority.material)
  ) {
    blockers.push('SA5I_EXECUTION_AUTHORITY_REF_DRIFT');
  }

  return Object.freeze({
    valid: blockers.length === 0,
    blockers: Object.freeze([...new Set(blockers)].sort()),
  });
}

export type RelationshipSpouseT8DayBranchPalaceShadowStagingRunOptions = Omit<
  InterpretationRunOptions,
  'promotionAuthorityContext' | 'reviewerTrustContext'
>;

export function runRelationshipSpouseT8DayBranchPalaceShadowStagingExecution(
  snapshot: CanonicalSajuSnapshot,
  options: RelationshipSpouseT8DayBranchPalaceShadowStagingRunOptions = {},
): InterpretationExecutionResult {
  if (
    'promotionAuthorityContext' in options ||
    'reviewerTrustContext' in options
  ) {
    throw new Error(
      'Relationship Spouse T8 Day-Branch spouse-palace shadow staging execution owns its exact source-adjudication authority; callers may not inject promotion or reviewer-trust authority.',
    );
  }

  const authority =
    buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthority();
  const validation =
    validateRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthority(
      authority,
    );

  if (!validation.valid) {
    throw new Error(
      `Relationship Spouse T8 Day-Branch spouse-palace shadow staging authority invalid: ${validation.blockers.join(', ')}`,
    );
  }

  return runInterpretation(
    snapshot,
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
    {
      ...options,
      promotionAuthorityContext: {
        mode: 'source_adjudication',
        sourceAdjudicationAuthority: authority,
      },
    },
  );
}

function baseSnapshot(
  sexForTraditionalCalculation:
    | 'male'
    | 'female'
    | 'unspecified' = 'unspecified',
): CanonicalSajuSnapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation,
    },
    CALCULATION_POLICY,
    { now: CALCULATION_NOW },
  );
}

function resolvedDayPillarValue(snapshot = baseSnapshot()) {
  const day = snapshot.pillars.day;
  if (day.status !== 'resolved') {
    throw new Error('SA-5I fixture requires a resolved Day Pillar.');
  }
  return day.value;
}

function withDayPillar(
  day: unknown,
  snapshot = baseSnapshot(),
): CanonicalSajuSnapshot {
  return {
    ...snapshot,
    pillars: {
      ...snapshot.pillars,
      day,
    },
  } as CanonicalSajuSnapshot;
}

function withDayBranch(branch: EarthlyBranch): CanonicalSajuSnapshot {
  const value = resolvedDayPillarValue();
  return withDayPillar({
    status: 'resolved',
    value: {
      ...value,
      branch: {
        ...value.branch,
        value: branch,
      },
    },
  });
}

function ambiguousDayPillar(): CanonicalSajuSnapshot {
  const value = resolvedDayPillarValue();
  return withDayPillar({
    status: 'ambiguous',
    candidates: [
      {
        candidateId: 'sa5i-day-a',
        value,
        reasonRefs: ['sa5i'],
      },
      {
        candidateId: 'sa5i-day-b',
        value: {
          ...value,
          branch: {
            ...value.branch,
            value: value.branch.value === '자' ? '축' : '자',
          },
        },
        reasonRefs: ['sa5i'],
      },
    ],
    reasonCodes: ['sa5i-ambiguous'],
  });
}

function unavailableDayPillar(): CanonicalSajuSnapshot {
  return withDayPillar({
    status: 'unavailable',
    reasonCode: 'sa5i-unavailable',
  });
}

function missingDayPillar(): CanonicalSajuSnapshot {
  const snapshot = baseSnapshot();
  const pillars = { ...snapshot.pillars } as Record<string, unknown>;
  delete pillars.day;
  return { ...snapshot, pillars } as unknown as CanonicalSajuSnapshot;
}

function semanticProjection(result: InterpretationExecutionResult) {
  return result.claims.map((claim) =>
    Object.freeze({
      claimType: claim.claimType,
      taxonomy: claim.taxonomy,
      subject: claim.subject,
      predicate: claim.predicate,
      value: claim.value,
      polarity: claim.polarity,
      factRefs: claim.factRefs,
    }),
  );
}

function runResearch(snapshot: CanonicalSajuSnapshot) {
  return runRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution(
    snapshot,
    {
      requestId: 'sa5i-research-shadow',
      now: INTERPRETATION_NOW,
    },
  );
}

function runStaging(snapshot: CanonicalSajuSnapshot) {
  return runRelationshipSpouseT8DayBranchPalaceShadowStagingExecution(
    snapshot,
    {
      requestId: 'sa5i-staging-shadow',
      now: INTERPRETATION_NOW,
    },
  );
}

function resolvedBranchCase(branch: EarthlyBranch) {
  const snapshot = withDayBranch(branch);
  const research = runResearch(snapshot);
  const staging = runStaging(snapshot);
  const authority =
    buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthority();
  const researchProjection = semanticProjection(research);
  const stagingProjection = semanticProjection(staging);
  const researchSemanticHash = deterministicContentHash(researchProjection);
  const stagingSemanticHash = deterministicContentHash(stagingProjection);
  const authorizationRecorded =
    staging.run.authorizationPolicyVersion ===
      SOURCE_ADJUDICATION_STAGING_AUTHORIZATION_POLICY_VERSION &&
    staging.run.sourceAdjudicationAuthorityRef !== undefined &&
    refsEqual(staging.run.sourceAdjudicationAuthorityRef, authority.authorityRef);
  const exactPositionOnlyClaim =
    staging.claims.length === 1 &&
    staging.claims[0]?.claimType ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE &&
    deterministicContentHash(staging.claims[0]?.value) ===
      deterministicContentHash({
        position: 'day_branch',
        traditionalRole: 'spouse_palace',
        semanticScope: 'position_only',
      });

  return Object.freeze({
    branch,
    researchClaimCount: research.claims.length,
    stagingClaimCount: staging.claims.length,
    researchSemanticHash,
    stagingSemanticHash,
    semanticParity: researchSemanticHash === stagingSemanticHash,
    authorizationRecorded,
    exactPositionOnlyClaim,
    casePass:
      research.integrity.valid &&
      staging.integrity.valid &&
      research.claims.length === 1 &&
      staging.claims.length === 1 &&
      researchSemanticHash === stagingSemanticHash &&
      authorizationRecorded &&
      exactPositionOnlyClaim,
  });
}

function failClosedCase(
  caseId: 'ambiguous-day-pillar' | 'unavailable-day-pillar' | 'missing-day-pillar',
  snapshot: CanonicalSajuSnapshot,
) {
  const research = runResearch(snapshot);
  const staging = runStaging(snapshot);
  const researchSemanticHash = deterministicContentHash(
    semanticProjection(research),
  );
  const stagingSemanticHash = deterministicContentHash(
    semanticProjection(staging),
  );

  return Object.freeze({
    caseId,
    researchClaimCount: research.claims.length,
    stagingClaimCount: staging.claims.length,
    semanticParity: researchSemanticHash === stagingSemanticHash,
    casePass:
      research.integrity.valid &&
      staging.integrity.valid &&
      research.claims.length === 0 &&
      staging.claims.length === 0 &&
      researchSemanticHash === stagingSemanticHash,
  });
}

function sexInvariantCase(
  sex: 'male' | 'female' | 'unspecified',
) {
  const snapshot = baseSnapshot(sex);
  const research = runResearch(snapshot);
  const staging = runStaging(snapshot);
  const researchSemanticHash = deterministicContentHash(
    semanticProjection(research),
  );
  const stagingSemanticHash = deterministicContentHash(
    semanticProjection(staging),
  );

  return Object.freeze({
    sex,
    researchClaimCount: research.claims.length,
    stagingClaimCount: staging.claims.length,
    researchSemanticHash,
    stagingSemanticHash,
    semanticParity: researchSemanticHash === stagingSemanticHash,
    casePass:
      research.integrity.valid &&
      staging.integrity.valid &&
      research.claims.length === 1 &&
      staging.claims.length === 1 &&
      researchSemanticHash === stagingSemanticHash,
  });
}

export function buildRelationshipSpouseT8DayBranchPalaceIsolatedShadowStagingExecutionReview() {
  const materialization =
    buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization();
  const authority =
    buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthority();
  const authorityValidation =
    validateRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionAuthority(
      authority,
    );

  const resolvedBranchCases = Object.freeze(
    EARTHLY_BRANCHES.map((branch) => resolvedBranchCase(branch)),
  );
  const failClosedCases = Object.freeze([
    failClosedCase('ambiguous-day-pillar', ambiguousDayPillar()),
    failClosedCase('unavailable-day-pillar', unavailableDayPillar()),
    failClosedCase('missing-day-pillar', missingDayPillar()),
  ]);
  const sexInvariantCases = Object.freeze(
    (['male', 'female', 'unspecified'] as const).map((sex) =>
      sexInvariantCase(sex),
    ),
  );

  const registeredSourceIds =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.sources.map(
      (source) => source.sourceId,
    );
  const exactSourceBinding =
    registeredSourceIds.length === 2 &&
    registeredSourceIds[0] ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_JUNG_RUNTIME_SOURCE_ID &&
    registeredSourceIds[1] ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SAJU_ATELIER_RUNTIME_SOURCE_ID;

  const reviewAuthorityPreserved =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
      .provenanceQuality === 'multi_source_supported' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
      .reviewerStatus === 'unreviewed' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY
      .reviewAttestations.length === 0;

  const legacyV110Isolated =
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION ===
      '1.1.0' &&
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK.status ===
      'staging' &&
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES.every(
      (rule) =>
        rule.output.claimType !==
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
    );

  const sexBaseline = sexInvariantCases[0]?.stagingSemanticHash;
  const sexInvariant =
    sexBaseline !== undefined &&
    sexInvariantCases.every(
      (item) =>
        item.casePass &&
        item.stagingSemanticHash === sexBaseline,
    );

  const consumerAuthorityHeld =
    materialization.authorityBoundary.narrativeConsumerActivated === false &&
    materialization.authorityBoundary.previewAuthorityAuthorized === false &&
    materialization.authorityBoundary.officialReadingAuthorityAuthorized ===
      false &&
    materialization.authorityBoundary.productionAuthorityAuthorized === false &&
    materialization.authorityBoundary.production === 'HOLD';

  const checks = Object.freeze({
    exactMaterializationBinding:
      authority.material.upstreamMaterializationId ===
        materialization.materializationId &&
      materialization.materializationRef !== undefined &&
      refsEqual(
        authority.material.upstreamMaterializationRef,
        materialization.materializationRef,
      ),
    authorityValidationValid: authorityValidation.valid,
    exactSourceBinding,
    reviewAuthorityPreserved,
    legacyV110Isolated,
    resolvedBranchCoverage: resolvedBranchCases.length === 12,
    resolvedBranchParity: resolvedBranchCases.every((item) => item.casePass),
    failClosedParity: failClosedCases.every((item) => item.casePass),
    sexInvariant,
    authorizationRecorded: resolvedBranchCases.every(
      (item) => item.authorizationRecorded,
    ),
    consumerAuthorityHeld,
    authorityValidationBlockers: Object.freeze([
      ...authorityValidation.blockers,
    ]),
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(
        ([key, value]) =>
          key !== 'authorityValidationBlockers' && value !== true,
      )
      .map(
        ([key]) =>
          `SA5I_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .concat(
        authorityValidation.blockers.map(
          (blocker) => `SA5I_AUTHORITY_VALIDATION:${blocker}`,
        ),
      )
      .sort(),
  );

  const isolatedShadowStagingExecutionComplete = blockers.length === 0;

  const material = Object.freeze({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_ISOLATED_SHADOW_STAGING_EXECUTION_VERSION,
    issue: '#1904' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    upstreamMaterializationId: materialization.materializationId,
    upstreamMaterializationRef: authority.material.upstreamMaterializationRef,
    policyRef: authority.material.policyRef,
    candidateRef: authority.material.candidateRef,
    decisionRef: authority.material.decisionRef,
    stagingRegistrySnapshotId:
      authority.material.authorizedRegistrySnapshotId,
    stagingPackRef: authority.material.authorizedPackRef,
    executionAuthorityRef: authority.authorityRef,
    resolvedBranchCases,
    failClosedCases,
    sexInvariantCases,
    checks,
    blockers,
    isolatedShadowStagingExecutionComplete,
    authorityBoundary: Object.freeze({
      sourceAdjudicationAuthorityEstablished: true as const,
      stagingExecutionAuthorityValid: authorityValidation.valid,
      isolatedShadowStagingExecutionComplete,
      humanDomainReviewEstablished: false as const,
      reviewAttestationCreated: false as const,
      reviewerTrustGrantEstablished: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      narrativeConsumerActivated: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: isolatedShadowStagingExecutionComplete
      ? ('READY_FOR_SEPARATE_CONSUMER_ADMISSION_REVIEW' as const)
      : ('HOLD_AND_REPAIR_SA_5I_SHADOW_STAGING_EXECUTION' as const),
  });

  return Object.freeze({
    evidenceId: deterministicContentHash(material),
    ...material,
  });
}
