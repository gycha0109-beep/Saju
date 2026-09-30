import type {
  CalculationPolicySnapshot,
  CanonicalSajuSnapshot,
  EarthlyBranch,
  SexForTraditionalCalculation,
} from '../contracts/calculation.js';
import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import {
  calculateCanonicalSajuSnapshot,
} from '../calculation/calculation-engine.js';
import {
  runInterpretation,
  SOURCE_ADJUDICATION_STAGING_AUTHORIZATION_POLICY_VERSION,
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
  verifyResolvedRegistryContentIntegrity,
} from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
} from './relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  runRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution,
} from './relationship-spouse-t8-day-branch-palace-isolated-research-execution.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_JUNG_RUNTIME_SOURCE_ID,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SAJU_ATELIER_RUNTIME_SOURCE_ID,
} from './relationship-spouse-t8-day-branch-palace-source-manifest-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE,
  buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization,
} from './relationship-spouse-t8-day-branch-palace-staging-lifecycle-materialization.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
} from './relationship-spouse-t8-source-adjudicated-staging-runtime.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SHADOW_STAGING_EXECUTION_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-shadow-staging-execution-review-v1' as const;

const STAGING_EXECUTION_AUTHORITY_ID =
  'relationship-spouse-t8-day-branch-palace-source-adjudicated-staging-execution-authority' as const;
const STAGING_EXECUTION_AUTHORITY_VERSION = '1.0.0' as const;

const CALCULATION_NOW = new Date('2026-10-01T00:00:00.000Z');
const INTERPRETATION_NOW = new Date('2026-10-01T00:01:00.000Z');

const CALCULATION_POLICY = Object.freeze({
  policyId:
    'myeonghwa/relationship-spouse-t8-day-branch-palace-shadow-staging-execution-review',
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
    ref.id.length > 0 &&
    ref.version.length > 0 &&
    /^[a-f0-9]{64}$/u.test(ref.contentHash)
  );
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

function semanticProjection(result: InterpretationExecutionResult) {
  return result.claims.map((claim) =>
    Object.freeze({
      taxonomy: claim.taxonomy,
      claimType: claim.claimType,
      subject: claim.subject,
      predicate: claim.predicate,
      value: claim.value,
      polarity: claim.polarity ?? null,
      factRefs: claim.factRefs,
    }),
  );
}

function baseSnapshot(
  sexForTraditionalCalculation: SexForTraditionalCalculation = 'unspecified',
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
    throw new Error(
      'Relationship Spouse T8 Day-Branch shadow staging fixture requires a resolved Day Pillar.',
    );
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

function withDayBranch(
  branch: EarthlyBranch,
  snapshot = baseSnapshot(),
): CanonicalSajuSnapshot {
  const value = resolvedDayPillarValue(snapshot);
  return withDayPillar(
    {
      status: 'resolved',
      value: {
        ...value,
        branch: {
          ...value.branch,
          value: branch,
        },
      },
    },
    snapshot,
  );
}

function ambiguousDayPillar(): CanonicalSajuSnapshot {
  const snapshot = baseSnapshot();
  const value = resolvedDayPillarValue(snapshot);
  return withDayPillar(
    {
      status: 'ambiguous',
      candidates: [
        {
          candidateId: 'sa5i-day-a',
          value,
          reasonRefs: ['sa5i-shadow-staging'],
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
          reasonRefs: ['sa5i-shadow-staging'],
        },
      ],
      reasonCodes: ['sa5i-shadow-staging-ambiguous'],
    },
    snapshot,
  );
}

function unavailableDayPillar(): CanonicalSajuSnapshot {
  return withDayPillar({
    status: 'unavailable',
    reasonCode: 'sa5i-shadow-staging-unavailable',
  });
}

function pendingDayPillar(): CanonicalSajuSnapshot {
  return withDayPillar({ status: 'pending' });
}

function missingDayPillar(): CanonicalSajuSnapshot {
  const snapshot = baseSnapshot();
  const pillars = { ...snapshot.pillars } as Record<string, unknown>;
  delete pillars.day;
  return {
    ...snapshot,
    pillars,
  } as unknown as CanonicalSajuSnapshot;
}

function exactSpousePalaceClaimScope(
  result: InterpretationExecutionResult,
): boolean {
  return result.claims.every(
    (claim) =>
      claim.taxonomy.tier === 'T8' &&
      claim.taxonomy.category === 'relationship' &&
      claim.taxonomy.subcategory === 'spouse' &&
      claim.claimType === RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
  );
}

function currentMaterializationIntegrityValid(
  materialization: ReturnType<
    typeof buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization
  >,
): boolean {
  const {
    materializationId: declaredMaterializationId,
    materializationRef,
    ...material
  } = materialization;

  return (
    deterministicContentHash(
      Object.freeze({
        material: Object.freeze({ ...material }),
        materializationRef,
      }),
    ) === declaredMaterializationId &&
    materializationRef !== undefined &&
    materializationRef.contentHash === deterministicContentHash(material)
  );
}

export function buildRelationshipSpouseT8DayBranchPalaceStagingExecutionAuthority():
  SourceAdjudicationExecutionAuthority {
  const materialization =
    buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization();

  if (
    materialization.stagingLifecycleMaterializationEstablished !== true ||
    materialization.materializationRef === undefined ||
    materialization.governanceDecisionRef === undefined ||
    materialization.nextDisposition !==
      'RUN_SA_5I_ISOLATED_SHADOW_STAGING_EXECUTION_REVIEW'
  ) {
    throw new Error(
      'Relationship Spouse T8 Day-Branch staging execution requires the exact established SA-5H lifecycle materialization.',
    );
  }

  const material = Object.freeze({
    authorityClass: 'source_adjudication',
    lifecycleTarget: 'staging',
    capabilityKey: 'relationship:natal:spouse',
    policyRef: Object.freeze({ ...materialization.policyRef }),
    candidateRef: Object.freeze({ ...materialization.candidateRef }),
    decisionRef: Object.freeze({ ...materialization.governanceDecisionRef }),
    authorizedRegistrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .registrySnapshotId,
    authorizedPackRef: Object.freeze({
      ...RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .packRef,
    }),
    sourceAdjudicationAuthorityEstablished: true,
    productionAuthorityAuthorized: false,
  } as const satisfies SourceAdjudicationExecutionAuthorityMaterial);

  return Object.freeze({
    authorityRef: buildSourceAdjudicationExecutionAuthorityRef(
      STAGING_EXECUTION_AUTHORITY_ID,
      STAGING_EXECUTION_AUTHORITY_VERSION,
      material,
    ),
    material,
  });
}

export function validateRelationshipSpouseT8DayBranchPalaceStagingExecutionAuthority(
  authority: SourceAdjudicationExecutionAuthority,
) {
  const blockers = [
    ...validateSourceAdjudicationExecutionAuthority(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
      authority,
    ).blockers,
  ];
  const materialization =
    buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization();

  if (
    materialization.stagingLifecycleMaterializationEstablished !== true ||
    materialization.materializationRef === undefined ||
    materialization.governanceDecisionRef === undefined
  ) {
    blockers.push('SA5I_STAGING_MATERIALIZATION_NOT_ESTABLISHED');
  } else {
    if (!currentMaterializationIntegrityValid(materialization)) {
      blockers.push('SA5I_STAGING_MATERIALIZATION_INTEGRITY_INVALID');
    }
    if (
      !refsEqual(
        authority.material.policyRef,
        materialization.policyRef,
      )
    ) {
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
      blockers.push('SA5I_GOVERNANCE_DECISION_REF_DRIFT');
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
  }

  if (authority.material.capabilityKey !== 'relationship:natal:spouse') {
    blockers.push('SA5I_CAPABILITY_KEY_MISMATCH');
  }

  const expected =
    buildRelationshipSpouseT8DayBranchPalaceStagingExecutionAuthority();
  if (!refsEqual(authority.authorityRef, expected.authorityRef)) {
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
      'Relationship Spouse T8 Day-Branch shadow staging execution owns its exact source-adjudication authority; callers may not inject promotion or reviewer-trust authority.',
    );
  }

  const materialization =
    buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization();
  if (
    materialization.stagingLifecycleMaterializationEstablished !== true ||
    !currentMaterializationIntegrityValid(materialization)
  ) {
    throw new Error(
      'Relationship Spouse T8 Day-Branch shadow staging execution requires an integrity-valid SA-5H materialization.',
    );
  }

  const authority =
    buildRelationshipSpouseT8DayBranchPalaceStagingExecutionAuthority();
  const validation =
    validateRelationshipSpouseT8DayBranchPalaceStagingExecutionAuthority(
      authority,
    );
  if (!validation.valid) {
    throw new Error(
      `Relationship Spouse T8 Day-Branch staging execution authority invalid: ${validation.blockers.join(', ')}`,
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

function resolvedBranchEvidence(branch: EarthlyBranch) {
  const snapshot = withDayBranch(branch);
  const research = runRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution(
    snapshot,
    {
      requestId: `sa5i-research-${branch}`,
      now: INTERPRETATION_NOW,
    },
  );
  const stagingFirst =
    runRelationshipSpouseT8DayBranchPalaceShadowStagingExecution(snapshot, {
      requestId: `sa5i-staging-${branch}`,
      now: INTERPRETATION_NOW,
    });
  const stagingSecond =
    runRelationshipSpouseT8DayBranchPalaceShadowStagingExecution(snapshot, {
      requestId: `sa5i-staging-${branch}`,
      now: INTERPRETATION_NOW,
    });

  const expectedAuthority =
    buildRelationshipSpouseT8DayBranchPalaceStagingExecutionAuthority();
  const researchProjection = semanticProjection(research);
  const stagingProjection = semanticProjection(stagingFirst);
  const semanticParity =
    deterministicContentHash(researchProjection) ===
    deterministicContentHash(stagingProjection);

  const exactPositionOnlyClaim =
    stagingFirst.claims.length === 1 &&
    stagingFirst.claims[0]?.claimType ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE &&
    deterministicContentHash(stagingFirst.claims[0]?.value) ===
      deterministicContentHash({
        position: 'day_branch',
        traditionalRole: 'spouse_palace',
        semanticScope: 'position_only',
      }) &&
    stagingFirst.claims[0]?.polarity === 'neutral' &&
    exactArray(stagingFirst.claims[0]?.factRefs ?? [], ['pillars.day']) &&
    !JSON.stringify(stagingFirst.claims[0]?.value).includes(branch);

  const stagingDeterministic =
    stagingFirst.run.runHash === stagingSecond.run.runHash &&
    exactArray(stagingFirst.run.claimIds, stagingSecond.run.claimIds) &&
    deterministicContentHash(semanticProjection(stagingSecond)) ===
      deterministicContentHash(stagingProjection);

  const stagingAuthorizationRecorded =
    stagingFirst.run.authorizationPolicyVersion ===
      SOURCE_ADJUDICATION_STAGING_AUTHORIZATION_POLICY_VERSION &&
    stagingFirst.run.sourceAdjudicationAuthorityRef !== undefined &&
    refsEqual(
      stagingFirst.run.sourceAdjudicationAuthorityRef,
      expectedAuthority.authorityRef,
    );

  const lifecycleIdentitySeparated =
    research.run.runHash !== stagingFirst.run.runHash &&
    research.run.interpretationPackRef.id !==
      stagingFirst.run.interpretationPackRef.id;

  const casePass =
    research.integrity.valid === true &&
    stagingFirst.integrity.valid === true &&
    semanticParity &&
    exactPositionOnlyClaim &&
    exactSpousePalaceClaimScope(stagingFirst) &&
    stagingDeterministic &&
    stagingAuthorizationRecorded &&
    lifecycleIdentitySeparated;

  return Object.freeze({
    branch,
    researchSemanticHash: deterministicContentHash(researchProjection),
    stagingSemanticHash: deterministicContentHash(stagingProjection),
    semanticParity,
    exactPositionOnlyClaim,
    stagingDeterministic,
    stagingAuthorizationRecorded,
    lifecycleIdentitySeparated,
    stagingRunHash: stagingFirst.run.runHash,
    stagingAuthorityRef: stagingFirst.run.sourceAdjudicationAuthorityRef,
    casePass,
  });
}

function failClosedCaseEvidence(
  caseId: string,
  snapshot: CanonicalSajuSnapshot,
) {
  const research = runRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution(
    snapshot,
    {
      requestId: `sa5i-failclosed-research-${caseId}`,
      now: INTERPRETATION_NOW,
    },
  );
  const staging =
    runRelationshipSpouseT8DayBranchPalaceShadowStagingExecution(snapshot, {
      requestId: `sa5i-failclosed-staging-${caseId}`,
      now: INTERPRETATION_NOW,
    });

  const researchFailClosed = research.claims.length === 0;
  const stagingFailClosed = staging.claims.length === 0;
  const semanticParity =
    deterministicContentHash(semanticProjection(research)) ===
    deterministicContentHash(semanticProjection(staging));

  return Object.freeze({
    caseId,
    researchClaimCount: research.claims.length,
    stagingClaimCount: staging.claims.length,
    semanticParity,
    researchFailClosed,
    stagingFailClosed,
    casePass:
      researchFailClosed &&
      stagingFailClosed &&
      semanticParity &&
      staging.integrity.valid === true,
  });
}

function demographicEvidence(
  sexForTraditionalCalculation: SexForTraditionalCalculation,
) {
  const snapshot = baseSnapshot(sexForTraditionalCalculation);
  const staging =
    runRelationshipSpouseT8DayBranchPalaceShadowStagingExecution(snapshot, {
      requestId: `sa5i-demographic-${sexForTraditionalCalculation}`,
      now: INTERPRETATION_NOW,
    });

  return Object.freeze({
    sexForTraditionalCalculation,
    semanticHash: deterministicContentHash(semanticProjection(staging)),
    claimCount: staging.claims.length,
    exactPositionOnlyClaim:
      staging.claims.length === 1 &&
      deterministicContentHash(staging.claims[0]?.value) ===
        deterministicContentHash({
          position: 'day_branch',
          traditionalRole: 'spouse_palace',
          semanticScope: 'position_only',
        }),
  });
}

export interface RelationshipSpouseT8DayBranchPalaceShadowStagingExecutionReviewInput {
  readonly materialization: ReturnType<
    typeof buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization
  >;
}

export function evaluateRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionReview(
  input: RelationshipSpouseT8DayBranchPalaceShadowStagingExecutionReviewInput,
) {
  const currentMaterialization =
    buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization();
  const materialization = input.materialization;
  const materializationIntegrityValid =
    currentMaterializationIntegrityValid(materialization);

  const exactMaterializationBinding =
    materializationIntegrityValid &&
    currentMaterialization.materializationRef !== undefined &&
    materialization.materializationRef !== undefined &&
    materialization.materializationId ===
      currentMaterialization.materializationId &&
    refsEqual(
      materialization.materializationRef,
      currentMaterialization.materializationRef,
    ) &&
    materialization.stagingRegistrySnapshotId ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .registrySnapshotId &&
    refsEqual(
      materialization.stagingPackRef,
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot.packRef,
    );

  const materializationStateValid =
    materialization.stagingLifecycleMaterializationEstablished === true &&
    materialization.blockers.length === 0 &&
    materialization.authorityBoundary.stagingLifecycleMaterialized === true &&
    materialization.authorityBoundary.stagingRegistryMaterialized === true &&
    materialization.authorityBoundary.stagingExecutionAuthorityCreated ===
      false &&
    materialization.authorityBoundary.stagingExecutionAuthorized === false &&
    materialization.nextDisposition ===
      'RUN_SA_5I_ISOLATED_SHADOW_STAGING_EXECUTION_REVIEW';

  const registryIntegrityErrors =
    verifyResolvedRegistryContentIntegrity(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
    );
  const stagingAuthority =
    buildRelationshipSpouseT8DayBranchPalaceStagingExecutionAuthority();
  const stagingAuthorityValidation =
    validateRelationshipSpouseT8DayBranchPalaceStagingExecutionAuthority(
      stagingAuthority,
    );

  const exactAuthorityLineage =
    contentRefValid(stagingAuthority.authorityRef) &&
    materialization.governanceDecisionRef !== undefined &&
    refsEqual(
      stagingAuthority.material.policyRef,
      materialization.policyRef,
    ) &&
    refsEqual(
      stagingAuthority.material.candidateRef,
      materialization.candidateRef,
    ) &&
    refsEqual(
      stagingAuthority.material.decisionRef,
      materialization.governanceDecisionRef,
    ) &&
    stagingAuthority.material.authorizedRegistrySnapshotId ===
      materialization.stagingRegistrySnapshotId &&
    refsEqual(
      stagingAuthority.material.authorizedPackRef,
      materialization.stagingPackRef,
    ) &&
    stagingAuthority.material.productionAuthorityAuthorized === false;

  const resolvedBranchCases = Object.freeze(
    EARTHLY_BRANCHES.map((branch) => resolvedBranchEvidence(branch)),
  );
  const allTwelveBranchesPass =
    resolvedBranchCases.length === 12 &&
    resolvedBranchCases.every((evidence) => evidence.casePass);

  const failClosedCases = Object.freeze([
    failClosedCaseEvidence('ambiguous-day-pillar', ambiguousDayPillar()),
    failClosedCaseEvidence('unavailable-day-pillar', unavailableDayPillar()),
    failClosedCaseEvidence('pending-day-pillar', pendingDayPillar()),
    failClosedCaseEvidence('missing-day-pillar', missingDayPillar()),
  ]);
  const failClosedParity =
    failClosedCases.every((evidence) => evidence.casePass);

  const demographicCases = Object.freeze(
    (['male', 'female', 'unspecified'] as const).map((sex) =>
      demographicEvidence(sex),
    ),
  );
  const demographicInputIsolation =
    demographicCases.every(
      (evidence) =>
        evidence.claimCount === 1 &&
        evidence.exactPositionOnlyClaim,
    ) &&
    demographicCases.every(
      (evidence) =>
        evidence.semanticHash === demographicCases[0]?.semanticHash,
    );

  const sourceIds =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.sources.map(
      (source) => source.sourceId,
    );
  const exactSourceAndQualityBoundary =
    exactArray(sourceIds, [
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_JUNG_RUNTIME_SOURCE_ID,
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SAJU_ATELIER_RUNTIME_SOURCE_ID,
    ]) &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
      .provenanceQuality === 'multi_source_supported' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
      .reviewerStatus === 'unreviewed' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY
      .reviewAttestations.length === 0 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
      .materialForNarrative === false;

  const legacyV110Isolated =
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION ===
      '1.1.0' &&
    resolvedBranchCases.every((evidence) => evidence.casePass);

  const noConsumerOrProductionExpansion =
    materialization.authorityBoundary.narrativeConsumerActivated === false &&
    materialization.authorityBoundary.previewAuthorityAuthorized === false &&
    materialization.authorityBoundary
      .officialReadingAuthorityAuthorized === false &&
    materialization.authorityBoundary.productionAuthorityAuthorized ===
      false &&
    materialization.authorityBoundary.production === 'HOLD';

  const checks = Object.freeze({
    materializationIntegrityValid,
    exactMaterializationBinding,
    materializationStateValid,
    stagingRegistryIntegrityVerified: registryIntegrityErrors.length === 0,
    stagingAuthorityValidationValid: stagingAuthorityValidation.valid,
    exactAuthorityLineage,
    allTwelveBranchesPass,
    failClosedParity,
    demographicInputIsolation,
    exactSourceAndQualityBoundary,
    legacyV110Isolated,
    noConsumerOrProductionExpansion,
    registryIntegrityErrors: Object.freeze([...registryIntegrityErrors]),
    stagingAuthorityValidationBlockers: Object.freeze([
      ...stagingAuthorityValidation.blockers,
    ]),
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(
        ([key, value]) =>
          key !== 'registryIntegrityErrors' &&
          key !== 'stagingAuthorityValidationBlockers' &&
          value !== true,
      )
      .map(
        ([key]) =>
          `SA5I_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .concat(
        registryIntegrityErrors.map(
          (error) => `SA5I_REGISTRY_INTEGRITY:${error}`,
        ),
        stagingAuthorityValidation.blockers.map(
          (blocker) => `SA5I_AUTHORITY_VALIDATION:${blocker}`,
        ),
      )
      .sort(),
  );

  const requiredShadowStagingEvidenceComplete = blockers.length === 0;

  const material = Object.freeze({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SHADOW_STAGING_EXECUTION_REVIEW_VERSION,
    issue: '#1904' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    upstreamMaterializationId: materialization.materializationId,
    upstreamMaterializationRef: materialization.materializationRef,
    stagingRegistrySnapshotId: materialization.stagingRegistrySnapshotId,
    stagingPackRef: materialization.stagingPackRef,
    executionAuthorityRef: stagingAuthority.authorityRef,
    authorizationPolicyVersion:
      SOURCE_ADJUDICATION_STAGING_AUTHORIZATION_POLICY_VERSION,
    fixtureContract: Object.freeze({
      calculationPolicyId: CALCULATION_POLICY.policyId,
      calculationPolicyVersion: CALCULATION_POLICY.policyVersion,
      calculationNow: CALCULATION_NOW.toISOString(),
      interpretationNow: INTERPRETATION_NOW.toISOString(),
      resolvedBranches: EARTHLY_BRANCHES,
      failClosedCaseIds: failClosedCases.map((item) => item.caseId),
      demographicInputs: demographicCases.map(
        (item) => item.sexForTraditionalCalculation,
      ),
    }),
    resolvedBranchCases,
    failClosedCases,
    demographicCases,
    checks,
    blockers,
    gate14Resolution: Object.freeze({
      gateId: 'REQUIRED_SHADOW_STAGING_EVIDENCE_COMPLETE' as const,
      status: requiredShadowStagingEvidenceComplete
        ? ('SATISFIED' as const)
        : ('BLOCKED' as const),
    }),
    requiredShadowStagingEvidenceComplete,
    authorityBoundary: Object.freeze({
      exactCandidateOnly:
        exactMaterializationBinding &&
        exactAuthorityLineage,
      sourceAdjudicationAuthorityEstablished:
        stagingAuthorityValidation.valid,
      stagingLifecycleMaterialized:
        materialization.stagingLifecycleMaterializationEstablished,
      stagingExecutionAuthorityCreated:
        stagingAuthorityValidation.valid,
      stagingExecutionAuthorized:
        requiredShadowStagingEvidenceComplete,
      shadowExecutionAuthorized:
        requiredShadowStagingEvidenceComplete,
      shadowExecutionCompleted:
        requiredShadowStagingEvidenceComplete,
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
    nextDisposition: requiredShadowStagingEvidenceComplete
      ? ('RUN_SA_5J_STAGING_CONSUMER_ADMISSION_REVIEW' as const)
      : ('HOLD_AND_REPAIR_SA_5I_SHADOW_STAGING_EXECUTION' as const),
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
  });
}

export function buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionReview() {
  return evaluateRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionReview({
    materialization:
      buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization(),
  });
}
