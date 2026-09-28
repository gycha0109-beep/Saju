import type {
  BirthInput,
  CalculationPolicySnapshot,
  CanonicalSajuSnapshot,
} from '../contracts/calculation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  SOURCE_ADJUDICATION_STAGING_AUTHORIZATION_POLICY_VERSION,
} from '../interpretation/interpretation-engine.js';
import {
  buildRelationshipSpouseT8EngineHardeningBinding,
  buildRelationshipSpouseT8EngineHardeningCompletionEvidence,
  runRelationshipSpouseT8EngineE2E,
} from '../reading/relationship-spouse-t8-engine-hardening.js';
import {
  prepareRelationshipSpouseT8EngineComposition,
} from '../reading/relationship-spouse-t8-engine-composition.js';
import {
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE,
} from './relationship-spouse-t8-runtime-admission.js';
import {
  RELATIONSHIP_SPOUSE_T8_RUNTIME_RULE_SOURCE_BINDINGS,
  RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID,
} from './relationship-spouse-t8-runtime-source-manifest.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_RULES,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION,
  runRelationshipSpouseT8SourceBoundRuntime,
} from './relationship-spouse-t8-source-bound-runtime.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_BOUNDARY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
  buildRelationshipSpouseT8SourceAdjudicatedStagingExecutionAuthority,
  buildRelationshipSpouseT8SourceAdjudicatedStagingLineage,
  runRelationshipSpouseT8SourceAdjudicatedStagingRuntime,
  validateRelationshipSpouseT8SourceAdjudicatedStagingAuthority,
} from './relationship-spouse-t8-source-adjudicated-staging-runtime.js';

export const RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_SHADOW_STAGING_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-source-adjudicated-shadow-staging-evidence-v1' as const;

const CALCULATION_NOW = new Date('2026-09-28T00:00:00.000Z');
const INTERPRETATION_NOW = new Date('2026-09-28T00:01:00.000Z');

const CALCULATION_POLICY = Object.freeze({
  policyId: 'myeonghwa/relationship-spouse-t8-source-adjudicated-shadow-staging-evidence',
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

const CANONICAL_BIRTH_CASES = Object.freeze([
  Object.freeze({
    caseId: 'canonical-1992-10-24',
    birthInput: Object.freeze({
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    } as const satisfies BirthInput),
  }),
  Object.freeze({
    caseId: 'canonical-1992-10-25',
    birthInput: Object.freeze({
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 25 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    } as const satisfies BirthInput),
  }),
] as const);

function semanticProjection(
  claims: readonly {
    readonly taxonomy: unknown;
    readonly claimType: string;
    readonly subject: string;
    readonly predicate: string;
    readonly value: unknown;
    readonly polarity?: string;
  }[],
) {
  return claims.map((claim) =>
    Object.freeze({
      taxonomy: claim.taxonomy,
      claimType: claim.claimType,
      subject: claim.subject,
      predicate: claim.predicate,
      value: claim.value,
      polarity: claim.polarity ?? null,
    }),
  );
}

function refsEqual(
  left: { readonly id: string; readonly version: string; readonly contentHash: string },
  right: { readonly id: string; readonly version: string; readonly contentHash: string },
): boolean {
  return (
    left.id === right.id &&
    left.version === right.version &&
    left.contentHash === right.contentHash
  );
}

function withDayMaster(
  snapshot: CanonicalSajuSnapshot,
  dayMaster: unknown,
): CanonicalSajuSnapshot {
  return {
    ...snapshot,
    derivedFacts: {
      ...snapshot.derivedFacts,
      dayMaster,
    },
  } as CanonicalSajuSnapshot;
}

function ambiguousDayMaster(snapshot: CanonicalSajuSnapshot): CanonicalSajuSnapshot {
  const current = snapshot.derivedFacts.dayMaster;
  if (current.status !== 'resolved') {
    throw new Error('Spouse T8 shadow evidence fixture requires a resolved Day Master.');
  }

  return withDayMaster(snapshot, {
    status: 'ambiguous',
    candidates: [
      {
        candidateId: 'spouse-t8-shadow-yang',
        value: { ...current.value, yinYang: '양' },
        reasonRefs: ['spouse-t8-shadow-evidence'],
      },
      {
        candidateId: 'spouse-t8-shadow-yin',
        value: { ...current.value, yinYang: '음' },
        reasonRefs: ['spouse-t8-shadow-evidence'],
      },
    ],
    reasonCodes: ['spouse-t8-shadow-evidence-ambiguous'],
  });
}

function unavailableDayMaster(snapshot: CanonicalSajuSnapshot): CanonicalSajuSnapshot {
  return withDayMaster(snapshot, {
    status: 'unavailable',
    reasonCode: 'spouse-t8-shadow-evidence-unavailable',
  });
}

function pendingDayMaster(snapshot: CanonicalSajuSnapshot): CanonicalSajuSnapshot {
  return withDayMaster(snapshot, { status: 'pending' });
}

function missingDayMaster(snapshot: CanonicalSajuSnapshot): CanonicalSajuSnapshot {
  const derivedFacts = { ...snapshot.derivedFacts } as Record<string, unknown>;
  delete derivedFacts.dayMaster;
  return {
    ...snapshot,
    derivedFacts,
  } as unknown as CanonicalSajuSnapshot;
}

function exactSpouseClaimScope(
  claim: {
    readonly taxonomy: {
      readonly tier: string;
      readonly category: string;
      readonly subcategory?: string;
    };
    readonly claimType: string;
  },
): boolean {
  return (
    claim.taxonomy.tier === 'T8' &&
    claim.taxonomy.category === 'relationship' &&
    claim.taxonomy.subcategory === 'spouse' &&
    claim.claimType === RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE
  );
}

function canonicalCaseEvidence(
  caseId: string,
  birthInput: BirthInput,
) {
  const engineInput = {
    birthInput,
    calculationPolicy: CALCULATION_POLICY,
    calculationOptions: { now: CALCULATION_NOW },
    requestId: `spouse-t8-shadow-${caseId}`,
    interpretationNow: INTERPRETATION_NOW,
    includeSourceSummaries: true,
  } as const;

  const engineFirst = runRelationshipSpouseT8EngineE2E(engineInput);
  const engineSecond = runRelationshipSpouseT8EngineE2E(engineInput);
  const snapshot = engineFirst.snapshot;
  const dayMaster = snapshot.derivedFacts.dayMaster;

  const researchOptions = {
    requestId: `spouse-t8-shadow-research-${caseId}`,
    now: INTERPRETATION_NOW,
  } as const;
  const stagingOptions = {
    requestId: `spouse-t8-shadow-staging-${caseId}`,
    now: INTERPRETATION_NOW,
  } as const;

  const researchFirst = runRelationshipSpouseT8SourceBoundRuntime(
    snapshot,
    researchOptions,
  );
  const researchSecond = runRelationshipSpouseT8SourceBoundRuntime(
    snapshot,
    researchOptions,
  );
  const stagingFirst =
    runRelationshipSpouseT8SourceAdjudicatedStagingRuntime(
      snapshot,
      stagingOptions,
    );
  const stagingSecond =
    runRelationshipSpouseT8SourceAdjudicatedStagingRuntime(
      snapshot,
      stagingOptions,
    );

  const engineProjection = semanticProjection(
    engineFirst.composition.interpretation.claims,
  );
  const researchProjection = semanticProjection(researchFirst.claims);
  const stagingProjection = semanticProjection(stagingFirst.claims);

  const engineSemanticHash = deterministicContentHash(engineProjection);
  const researchSemanticHash = deterministicContentHash(researchProjection);
  const stagingSemanticHash = deterministicContentHash(stagingProjection);

  const engineDeterministic =
    engineFirst.e2eId === engineSecond.e2eId &&
    engineFirst.snapshot.snapshotId === engineSecond.snapshot.snapshotId &&
    engineFirst.snapshot.calculationHash === engineSecond.snapshot.calculationHash &&
    engineFirst.composition.interpretation.run.runHash ===
      engineSecond.composition.interpretation.run.runHash &&
    JSON.stringify(engineFirst.composition.interpretation.run.claimIds) ===
      JSON.stringify(engineSecond.composition.interpretation.run.claimIds) &&
    engineFirst.governedEvidenceHash === engineSecond.governedEvidenceHash;

  const researchDeterministic =
    researchFirst.run.runHash === researchSecond.run.runHash &&
    JSON.stringify(researchFirst.run.claimIds) ===
      JSON.stringify(researchSecond.run.claimIds) &&
    deterministicContentHash(semanticProjection(researchSecond.claims)) ===
      researchSemanticHash;

  const stagingDeterministic =
    stagingFirst.run.runHash === stagingSecond.run.runHash &&
    JSON.stringify(stagingFirst.run.claimIds) ===
      JSON.stringify(stagingSecond.run.claimIds) &&
    deterministicContentHash(semanticProjection(stagingSecond.claims)) ===
      stagingSemanticHash &&
    stagingFirst.run.sourceAdjudicationAuthorityRef !== undefined &&
    stagingSecond.run.sourceAdjudicationAuthorityRef !== undefined &&
    refsEqual(
      stagingFirst.run.sourceAdjudicationAuthorityRef,
      stagingSecond.run.sourceAdjudicationAuthorityRef,
    );

  const expectedStagingAuthority =
    buildRelationshipSpouseT8SourceAdjudicatedStagingExecutionAuthority();
  const stagingAuthorizationRecorded =
    stagingFirst.run.authorizationPolicyVersion ===
      SOURCE_ADJUDICATION_STAGING_AUTHORIZATION_POLICY_VERSION &&
    stagingFirst.run.sourceAdjudicationAuthorityRef !== undefined &&
    refsEqual(
      stagingFirst.run.sourceAdjudicationAuthorityRef,
      expectedStagingAuthority.authorityRef,
    );
  const lifecycleIdentitySeparated =
    researchFirst.run.runHash !== stagingFirst.run.runHash;

  const semanticParity =
    engineSemanticHash === researchSemanticHash &&
    researchSemanticHash === stagingSemanticHash;
  const claimCountParity =
    engineFirst.composition.interpretation.claims.length === 1 &&
    researchFirst.claims.length === 1 &&
    stagingFirst.claims.length === 1;

  const stagingScopeValid = stagingFirst.claims.every(exactSpouseClaimScope);
  const expectedSemanticMatch =
    dayMaster.status === 'resolved' &&
    stagingFirst.claims.length === 1 &&
    deterministicContentHash(stagingFirst.claims[0]?.value) ===
      deterministicContentHash(
        dayMaster.value.yinYang === '양'
          ? {
              dayMasterPolarity: '양',
              spouseStarSemantic: 'INDIRECT_WEALTH',
              tenGodNativeLabel: '편재',
              tenGodHanjaLabel: '偏財',
            }
          : {
              dayMasterPolarity: '음',
              spouseStarSemantic: 'INDIRECT_POWER',
              tenGodNativeLabel: '편관',
              tenGodHanjaLabel: '偏官',
            },
      );

  return Object.freeze({
    caseId,
    dayMasterStatus: dayMaster.status,
    dayMasterPolarity:
      dayMaster.status === 'resolved' ? dayMaster.value.yinYang : null,
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    engine: Object.freeze({
      e2eId: engineFirst.e2eId,
      interpretationRunHash:
        engineFirst.composition.interpretation.run.runHash,
      claimCount: engineFirst.composition.interpretation.claims.length,
      semanticHash: engineSemanticHash,
      governedEvidenceHash: engineFirst.governedEvidenceHash,
      deterministic: engineDeterministic,
    }),
    research: Object.freeze({
      registrySnapshotId:
        RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.snapshot
          .registrySnapshotId,
      interpretationRunHash: researchFirst.run.runHash,
      claimCount: researchFirst.claims.length,
      semanticHash: researchSemanticHash,
      deterministic: researchDeterministic,
    }),
    staging: Object.freeze({
      registrySnapshotId:
        RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_REGISTRY.snapshot
          .registrySnapshotId,
      interpretationRunHash: stagingFirst.run.runHash,
      claimCount: stagingFirst.claims.length,
      semanticHash: stagingSemanticHash,
      sourceAdjudicationAuthorityRef:
        stagingFirst.run.sourceAdjudicationAuthorityRef,
      deterministic: stagingDeterministic,
      exactScopeOnly: stagingScopeValid,
      authorizationPolicyVersion: stagingFirst.run.authorizationPolicyVersion,
      authorizationRecorded: stagingAuthorizationRecorded,
    }),
    semanticParity,
    claimCountParity,
    expectedSemanticMatch,
    lifecycleIdentitySeparated,
    casePass:
      dayMaster.status === 'resolved' &&
      engineFirst.composition.outcome === 'complete' &&
      engineFirst.governedEvidenceHash !== undefined &&
      semanticParity &&
      claimCountParity &&
      expectedSemanticMatch &&
      stagingAuthorizationRecorded &&
      lifecycleIdentitySeparated &&
      engineDeterministic &&
      researchDeterministic &&
      stagingDeterministic &&
      stagingScopeValid,
  });
}

function failClosedCaseEvidence(
  caseId: string,
  snapshot: CanonicalSajuSnapshot,
) {
  const engine = prepareRelationshipSpouseT8EngineComposition(snapshot, {
    requestId: `spouse-t8-shadow-failclosed-engine-${caseId}`,
    now: INTERPRETATION_NOW,
  });
  const research = runRelationshipSpouseT8SourceBoundRuntime(snapshot, {
    requestId: `spouse-t8-shadow-failclosed-research-${caseId}`,
    now: INTERPRETATION_NOW,
  });
  const staging = runRelationshipSpouseT8SourceAdjudicatedStagingRuntime(
    snapshot,
    {
      requestId: `spouse-t8-shadow-failclosed-staging-${caseId}`,
      now: INTERPRETATION_NOW,
    },
  );

  const engineFailClosed =
    engine.outcome === 'insufficient_evidence' &&
    engine.interpretation.claims.length === 0 &&
    engine.preparation.state === 'insufficient_evidence' &&
    (engine.preparation.composition?.selection.selectedClaimIds.length ?? 0) ===
      0 &&
    engine.preparation.composition?.evidence === undefined;
  const researchFailClosed = research.claims.length === 0;
  const stagingFailClosed = staging.claims.length === 0;

  return Object.freeze({
    caseId,
    engine: Object.freeze({
      outcome: engine.outcome,
      claimCount: engine.interpretation.claims.length,
      preparationState: engine.preparation.state,
    }),
    research: Object.freeze({
      claimCount: research.claims.length,
      runHash: research.run.runHash,
    }),
    staging: Object.freeze({
      claimCount: staging.claims.length,
      runHash: staging.run.runHash,
    }),
    engineFailClosed,
    researchFailClosed,
    stagingFailClosed,
    casePass: engineFailClosed && researchFailClosed && stagingFailClosed,
  });
}

export function buildRelationshipSpouseT8SourceAdjudicatedShadowStagingEvidence() {
  const hardeningBinding = buildRelationshipSpouseT8EngineHardeningBinding();
  const hardeningCompletion =
    buildRelationshipSpouseT8EngineHardeningCompletionEvidence();
  const stagingLineage =
    buildRelationshipSpouseT8SourceAdjudicatedStagingLineage();
  const stagingAuthority =
    buildRelationshipSpouseT8SourceAdjudicatedStagingExecutionAuthority();
  const stagingAuthorityValidation =
    validateRelationshipSpouseT8SourceAdjudicatedStagingAuthority(
      stagingAuthority,
    );

  const canonicalCases = Object.freeze(
    CANONICAL_BIRTH_CASES.map((fixture) =>
      canonicalCaseEvidence(fixture.caseId, fixture.birthInput),
    ),
  );

  const resolvedPolarities = canonicalCases
    .map((evidence) => evidence.dayMasterPolarity)
    .filter((value): value is '양' | '음' => value === '양' || value === '음');

  const baseEngine = runRelationshipSpouseT8EngineE2E({
    birthInput: CANONICAL_BIRTH_CASES[0].birthInput,
    calculationPolicy: CALCULATION_POLICY,
    calculationOptions: { now: CALCULATION_NOW },
    requestId: 'spouse-t8-shadow-failclosed-base',
    interpretationNow: INTERPRETATION_NOW,
  });
  const baseSnapshot = baseEngine.snapshot;

  const failClosedCases = Object.freeze([
    failClosedCaseEvidence(
      'ambiguous-day-master',
      ambiguousDayMaster(baseSnapshot),
    ),
    failClosedCaseEvidence(
      'unavailable-day-master',
      unavailableDayMaster(baseSnapshot),
    ),
    failClosedCaseEvidence(
      'pending-day-master',
      pendingDayMaster(baseSnapshot),
    ),
    failClosedCaseEvidence(
      'missing-day-master',
      missingDayMaster(baseSnapshot),
    ),
  ]);

  const exactLineageBound =
    hardeningCompletion.p2Complete === true &&
    hardeningCompletion.observedRouting === 'READY' &&
    stagingAuthorityValidation.valid === true &&
    RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION === '1.0.1' &&
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION ===
      '1.1.0' &&
    stagingLineage.sourceResearchRegistrySnapshotId ===
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.snapshot
        .registrySnapshotId &&
    stagingLineage.stagingRegistrySnapshotId ===
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_REGISTRY.snapshot
        .registrySnapshotId &&
    refsEqual(
      stagingLineage.stagingPackRef,
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_REGISTRY.snapshot
        .packRef,
    ) &&
    refsEqual(
      stagingLineage.sourceAdjudicationExecutionAuthorityRef,
      stagingAuthority.authorityRef,
    ) &&
    refsEqual(stagingLineage.policyRef, stagingAuthority.material.policyRef) &&
    refsEqual(
      stagingLineage.candidateRef,
      stagingAuthority.material.candidateRef,
    ) &&
    refsEqual(
      stagingLineage.governanceDecisionRef,
      stagingAuthority.material.decisionRef,
    );

  const canonicalYangParity =
    canonicalCases.some(
      (evidence) =>
        evidence.dayMasterPolarity === '양' &&
        evidence.semanticParity &&
        evidence.claimCountParity &&
        evidence.casePass,
    );
  const canonicalYinParity =
    canonicalCases.some(
      (evidence) =>
        evidence.dayMasterPolarity === '음' &&
        evidence.semanticParity &&
        evidence.claimCountParity &&
        evidence.casePass,
    );
  const canonicalPolarityCoverage =
    new Set(resolvedPolarities).size === 2 &&
    resolvedPolarities.includes('양') &&
    resolvedPolarities.includes('음');
  const failClosedParity = failClosedCases.every(
    (evidence) => evidence.casePass,
  );
  const engineDeterministic = canonicalCases.every(
    (evidence) => evidence.engine.deterministic,
  );
  const researchDeterministic = canonicalCases.every(
    (evidence) => evidence.research.deterministic,
  );
  const stagingDeterministic = canonicalCases.every(
    (evidence) => evidence.staging.deterministic,
  );

  const scopeIsolationPreserved =
    canonicalCases.every(
      (evidence) => evidence.staging.exactScopeOnly && evidence.casePass,
    ) &&
    Object.values(hardeningBinding.guardChecks).every((value) => value === true);

  const sourceRolePreserved =
    RELATIONSHIP_SPOUSE_T8_RUNTIME_RULE_SOURCE_BINDINGS.length === 2 &&
    RELATIONSHIP_SPOUSE_T8_RUNTIME_RULE_SOURCE_BINDINGS.every(
      (binding) =>
        binding.sourceRefs.length === 1 &&
        binding.sourceRefs[0]?.sourceId ===
          RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID &&
        binding.sourceRefs[0]?.supportType === 'direct_basis',
    ) &&
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES.every(
      (rule) =>
        rule.sourceRefs.length === 1 &&
        rule.sourceRefs[0]?.sourceId ===
          RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID &&
        rule.sourceRefs[0]?.supportType === 'direct_basis',
    );

  const qualityMetadataNotInflated =
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES.length ===
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_RULES.length &&
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES.every(
      (stagingRule, index) => {
        const researchRule =
          RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_RULES[index];
        return (
          researchRule !== undefined &&
          deterministicContentHash(stagingRule.quality) ===
            deterministicContentHash(researchRule.quality) &&
          stagingRule.quality.reviewerStatus === 'unreviewed' &&
          stagingRule.quality.provenanceQuality === 'unknown'
        );
      },
    );

  const spouseClaimType =
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_REGISTRY
      .claimTypeDefinitions.find(
        (definition) =>
          definition.claimType ===
          RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE,
      );
  const noNarrativeExpansion =
    spouseClaimType?.materialForNarrative === false;

  const previewOfficialProductionHeld =
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_BOUNDARY
      .previewActivated === false &&
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_BOUNDARY
      .officialReadingActivated === false &&
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_BOUNDARY
      .productionAdmissionAuthorized === false &&
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_BOUNDARY.production ===
      'HOLD' &&
    hardeningCompletion.authorityBoundary.previewExpansionAuthorized === false &&
    hardeningCompletion.authorityBoundary.officialReadingAuthorityAuthorized ===
      false &&
    hardeningCompletion.authorityBoundary.productionAdmissionAuthorized ===
      false &&
    hardeningCompletion.authorityBoundary.production === 'HOLD';

  const checks = Object.freeze({
    exactLineageBound,
    canonicalPolarityCoverage,
    canonicalYangParity,
    canonicalYinParity,
    failClosedParity,
    engineDeterministic,
    researchDeterministic,
    stagingDeterministic,
    scopeIsolationPreserved,
    sourceRolePreserved,
    qualityMetadataNotInflated,
    noNarrativeExpansion,
    previewOfficialProductionHeld,
  });

  const blockerEntries = [
    ['EXACT_LINEAGE_NOT_BOUND', checks.exactLineageBound],
    ['CANONICAL_POLARITY_COVERAGE_INCOMPLETE', checks.canonicalPolarityCoverage],
    ['CANONICAL_YANG_PARITY_FAILED', checks.canonicalYangParity],
    ['CANONICAL_YIN_PARITY_FAILED', checks.canonicalYinParity],
    ['FAIL_CLOSED_PARITY_FAILED', checks.failClosedParity],
    ['ENGINE_DETERMINISM_FAILED', checks.engineDeterministic],
    ['RESEARCH_DETERMINISM_FAILED', checks.researchDeterministic],
    ['STAGING_DETERMINISM_FAILED', checks.stagingDeterministic],
    ['SCOPE_ISOLATION_FAILED', checks.scopeIsolationPreserved],
    ['SOURCE_ROLE_DRIFTED', checks.sourceRolePreserved],
    ['QUALITY_METADATA_INFLATED', checks.qualityMetadataNotInflated],
    ['NARRATIVE_SCOPE_EXPANDED', checks.noNarrativeExpansion],
    ['PREVIEW_OFFICIAL_OR_PRODUCTION_OPENED', checks.previewOfficialProductionHeld],
  ] as const;

  const blockers = Object.freeze(
    blockerEntries
      .filter(([, satisfied]) => satisfied !== true)
      .map(([blocker]) => blocker),
  );

  const requiredShadowStagingEvidenceComplete = blockers.length === 0;

  const material = Object.freeze({
    evidenceVersion:
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_SHADOW_STAGING_EVIDENCE_VERSION,
    issue: '#1820' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    engineHardeningEvidenceId: hardeningCompletion.evidenceId,
    lineage: Object.freeze({
      researchRuntimeVersion:
        RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION,
      researchRegistrySnapshotId:
        RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.snapshot
          .registrySnapshotId,
      researchPackRef: Object.freeze({
        ...RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.snapshot.packRef,
      }),
      stagingRuntimeVersion:
        RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
      stagingRegistrySnapshotId:
        RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_REGISTRY.snapshot
          .registrySnapshotId,
      stagingPackRef: Object.freeze({
        ...RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_REGISTRY.snapshot
          .packRef,
      }),
      policyRef: Object.freeze({ ...stagingLineage.policyRef }),
      candidateRef: Object.freeze({ ...stagingLineage.candidateRef }),
      governanceDecisionRef: Object.freeze({
        ...stagingLineage.governanceDecisionRef,
      }),
      executionAuthorityRef: Object.freeze({
        ...stagingLineage.sourceAdjudicationExecutionAuthorityRef,
      }),
    }),
    fixtureContract: Object.freeze({
      calculationPolicyId: CALCULATION_POLICY.policyId,
      calculationPolicyVersion: CALCULATION_POLICY.policyVersion,
      calculationNow: CALCULATION_NOW.toISOString(),
      interpretationNow: INTERPRETATION_NOW.toISOString(),
      canonicalCaseIds: CANONICAL_BIRTH_CASES.map((fixture) => fixture.caseId),
      failClosedCaseIds: failClosedCases.map((fixture) => fixture.caseId),
    }),
    canonicalCases,
    failClosedCases,
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
      humanDomainReviewEstablished: false as const,
      reviewerTrustGrantEstablished: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: requiredShadowStagingEvidenceComplete
      ? ('REASSESS_PRODUCTION_PROVENANCE_SEPARATELY' as const)
      : ('HOLD_AND_REPAIR_SHADOW_STAGING_EVIDENCE' as const),
  });

  return Object.freeze({
    evidenceId: deterministicContentHash(material),
    ...material,
  });
}
