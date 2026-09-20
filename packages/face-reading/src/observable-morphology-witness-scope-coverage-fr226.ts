import { createHash } from 'node:crypto';
import {
  assertVerifiedCandidateAnnotationCorrespondenceFR222,
  type FR222VerifiedCandidateAnnotationCorrespondence,
} from './observable-morphology-candidate-annotation-correspondence-fr222.js';
import {
  assertDeclaredRepeatCaptureFamilyDescriptivesFR223,
  type FR223DeclaredRepeatCaptureFamilyEvidence,
} from './observable-morphology-repeat-capture-family-fr223.js';
import {
  assertEmpiricalStudyReadinessGateFR224,
  type FR224EmpiricalStudyReadinessGate,
} from './observable-morphology-empirical-study-readiness-fr224.js';
import {
  assertVerifiedPersistedExternalWitnessEvidenceFR225,
  type FR225ExternalWitnessRecord,
  type FR225VerifiedPersistedExternalWitnessEvidence,
} from './observable-morphology-external-witness-evidence-fr225.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR226_CONTRACT_VERSION =
  'FR226-WITNESS-SCOPE-COVERAGE-v1' as const;

export interface FR226PartitionCoverage {
  readonly partition: 'selection' | 'holdout';
  readonly expectedCaptureAdmissionCount: number;
  readonly witnessedCaptureAdmissionCount: number;
  readonly expectedRepeatFamilyCount: number;
  readonly witnessedRepeatFamilyCount: number;
  readonly uncoveredCaptureAdmissionRefs: readonly string[];
  readonly uncoveredCaptureFamilyKeys: readonly string[];
}

export interface FR226WitnessScopeCoverage {
  readonly schemaVersion: 'fr226-witness-scope-coverage-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR226_CONTRACT_VERSION;
  readonly authorityState:
    'exact_declared_witness_scope_coverage_assembled_underlying_facts_unverified';
  readonly sourceEvidence: {
    readonly fr222CorrespondenceRef: string;
    readonly fr222CorrespondenceDigest: string;
    readonly fr223RepeatFamilyEvidenceRef: string;
    readonly fr223RepeatFamilyEvidenceDigest: string;
    readonly fr224StudyGateRef: string;
    readonly fr224StudyGateDigest: string;
    readonly fr225WitnessEvidenceRef: string;
    readonly fr225WitnessEvidenceDigest: string;
  };
  readonly reviewerCohortScopeRef: string;
  readonly reviewerHumanStatusWitnessPresent: boolean;
  readonly reviewerIndependenceWitnessPresent: boolean;
  readonly reviewerHumanStatusWitnessRecordCount: number;
  readonly reviewerIndependenceWitnessRecordCount: number;
  readonly expectedCaptureAdmissionCount: number;
  readonly witnessedCaptureAdmissionCount: number;
  readonly expectedRepeatFamilyCount: number;
  readonly witnessedRepeatFamilyCount: number;
  readonly selection: FR226PartitionCoverage;
  readonly holdout: FR226PartitionCoverage;
  readonly uncoveredCaptureAdmissionRefs: readonly string[];
  readonly uncoveredCaptureFamilyKeys: readonly string[];
  readonly coverageState:
    | 'DECLARED_WITNESS_SCOPE_COVERAGE_COMPLETE_AUTHORITY_BLOCKED'
    | 'DECLARED_WITNESS_SCOPE_COVERAGE_INCOMPLETE_AUTHORITY_BLOCKED';
  readonly integrityBoundary: {
    readonly activeFR222Required: true;
    readonly activeFR223Required: true;
    readonly activeFR224Required: true;
    readonly activeFR225Required: true;
    readonly exactFR224SourceBindingRequired: true;
    readonly exactFR225StudyGateBindingRequired: true;
    readonly exactReviewerCohortScopeRequired: true;
    readonly exactCaptureAdmissionScopeRequired: true;
    readonly exactCaptureFamilyScopeRequired: true;
    readonly outOfStudyWitnessScopeRejected: true;
    readonly selectionHoldoutPreserved: true;
  };
  readonly noInventedSufficiencyRule: {
    readonly minimumVerifierCountInvented: false;
    readonly witnessCoverageMeansEmpiricalSufficiency: false;
    readonly completeCoverageMeansCalibrationAuthorized: false;
  };
  readonly authorityBoundary: {
    readonly verifierIdentityIndependentlyVerified: false;
    readonly verifierIndependenceIndependentlyVerified: false;
    readonly externalEvidenceInspectedByRuntime: false;
    readonly witnessClaimCryptographicallyAuthenticated: false;
    readonly declaredWitnessCoverageMeansUnderlyingFactsEstablished: false;
    readonly reviewerHumanStatusIndependentlyVerified: false;
    readonly reviewerIndependenceIndependentlyVerified: false;
    readonly captureFreshnessIndependentlyVerified: false;
    readonly sameParticipantIdentityIndependentlyVerified: false;
    readonly captureQualityValidated: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly repeatCaptureStabilityEstablished: false;
    readonly empiricalSufficiencyEstablished: false;
    readonly calibrationAuthorized: false;
    readonly transitionZoneIssued: false;
    readonly thresholdIssued: false;
    readonly classifierIssued: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly coverageDigest: string;
  readonly coverageRef: string;
}

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-226 ${message}`);
}

function canonicalJson(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail('coverage evidence cannot contain non-finite numbers.');
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map((entry) => canonicalJson(entry)).join(',')}]`;
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => {
      const child = record[key];
      if (child === undefined) fail('coverage evidence cannot contain undefined.');
      return `${JSON.stringify(key)}:${canonicalJson(child)}`;
    }).join(',')}}`;
  }
  fail('coverage evidence must be JSON-compatible.');
}

function sha256(value: string): string {
  return `sha256:${createHash('sha256').update(value, 'utf8').digest('hex')}`;
}

function assertStudyInputsCoherent(input: {
  readonly correspondence: FR222VerifiedCandidateAnnotationCorrespondence;
  readonly repeatFamilies: FR223DeclaredRepeatCaptureFamilyEvidence;
  readonly studyGate: FR224EmpiricalStudyReadinessGate;
  readonly witnessEvidence: FR225VerifiedPersistedExternalWitnessEvidence;
}): void {
  assertVerifiedCandidateAnnotationCorrespondenceFR222(input.correspondence);
  assertDeclaredRepeatCaptureFamilyDescriptivesFR223(input.repeatFamilies);
  assertEmpiricalStudyReadinessGateFR224(input.studyGate);
  assertVerifiedPersistedExternalWitnessEvidenceFR225(input.witnessEvidence);

  if (
    input.studyGate.sourceEvidence.fr222CorrespondenceRef !== input.correspondence.correspondenceRef
    || input.studyGate.sourceEvidence.fr222CorrespondenceDigest !== input.correspondence.correspondenceDigest
    || input.studyGate.sourceEvidence.fr223RepeatFamilyEvidenceRef !== input.repeatFamilies.evidenceRef
    || input.studyGate.sourceEvidence.fr223RepeatFamilyEvidenceDigest !== input.repeatFamilies.evidenceDigest
  ) {
    fail('FR224 source evidence must exactly match supplied FR222 and FR223 evidence.');
  }
  if (
    input.witnessEvidence.studyGateRef !== input.studyGate.gateRef
    || input.witnessEvidence.studyGateDigest !== input.studyGate.gateDigest
  ) {
    fail('FR225 witness evidence must be bound to the exact supplied FR224 study gate.');
  }
}

function partitionCoverage(
  partition: 'selection' | 'holdout',
  repeatFamilies: FR223DeclaredRepeatCaptureFamilyEvidence,
  freshnessScopes: ReadonlySet<string>,
  sameParticipantScopes: ReadonlySet<string>,
): FR226PartitionCoverage {
  const families = repeatFamilies.repeatFamilies
    .filter((family) => family.partition === partition)
    .sort((left, right) => left.captureFamilyKey.localeCompare(right.captureFamilyKey));
  const captureAdmissionRefs = families
    .flatMap((family) => [...family.captureAdmissionRefs])
    .sort();
  const familyKeys = families.map((family) => family.captureFamilyKey).sort();

  const uncoveredCaptureAdmissionRefs = captureAdmissionRefs
    .filter((scopeRef) => !freshnessScopes.has(scopeRef));
  const uncoveredCaptureFamilyKeys = familyKeys
    .filter((scopeRef) => !sameParticipantScopes.has(scopeRef));

  return Object.freeze({
    partition,
    expectedCaptureAdmissionCount: captureAdmissionRefs.length,
    witnessedCaptureAdmissionCount:
      captureAdmissionRefs.length - uncoveredCaptureAdmissionRefs.length,
    expectedRepeatFamilyCount: familyKeys.length,
    witnessedRepeatFamilyCount: familyKeys.length - uncoveredCaptureFamilyKeys.length,
    uncoveredCaptureAdmissionRefs: Object.freeze(uncoveredCaptureAdmissionRefs),
    uncoveredCaptureFamilyKeys: Object.freeze(uncoveredCaptureFamilyKeys),
  });
}

function recordsForClaim(
  records: readonly FR225ExternalWitnessRecord[],
  claimType: FR225ExternalWitnessRecord['claimType'],
): readonly FR225ExternalWitnessRecord[] {
  return records.filter((record) => record.claimType === claimType);
}

export function assembleWitnessScopeCoverageFR226(input: {
  readonly correspondence: FR222VerifiedCandidateAnnotationCorrespondence;
  readonly repeatFamilies: FR223DeclaredRepeatCaptureFamilyEvidence;
  readonly studyGate: FR224EmpiricalStudyReadinessGate;
  readonly witnessEvidence: FR225VerifiedPersistedExternalWitnessEvidence;
}): FR226WitnessScopeCoverage {
  assertStudyInputsCoherent(input);

  const reviewerCohortScopeRef = input.correspondence.sourceEvidence.fr220AnnotationEvidenceRef;
  const expectedCaptureAdmissionRefs = new Set(
    input.repeatFamilies.repeatFamilies.flatMap((family) => family.captureAdmissionRefs),
  );
  const expectedCaptureFamilyKeys = new Set(
    input.repeatFamilies.repeatFamilies.map((family) => family.captureFamilyKey),
  );

  const humanRecords = recordsForClaim(
    input.witnessEvidence.records,
    'reviewer_cohort_human_status_observed',
  );
  const independenceRecords = recordsForClaim(
    input.witnessEvidence.records,
    'reviewer_cohort_independence_observed',
  );
  const freshnessRecords = recordsForClaim(
    input.witnessEvidence.records,
    'capture_freshness_observed',
  );
  const sameParticipantRecords = recordsForClaim(
    input.witnessEvidence.records,
    'capture_family_same_participant_observed',
  );

  for (const record of humanRecords) {
    if (record.scopeRef !== reviewerCohortScopeRef) {
      fail(`reviewer human-status witness scope is outside this study: ${record.scopeRef}.`);
    }
  }
  for (const record of independenceRecords) {
    if (record.scopeRef !== reviewerCohortScopeRef) {
      fail(`reviewer independence witness scope is outside this study: ${record.scopeRef}.`);
    }
  }
  for (const record of freshnessRecords) {
    if (!expectedCaptureAdmissionRefs.has(record.scopeRef)) {
      fail(`capture freshness witness scope is outside FR223 repeat families: ${record.scopeRef}.`);
    }
  }
  for (const record of sameParticipantRecords) {
    if (!expectedCaptureFamilyKeys.has(record.scopeRef)) {
      fail(`same-participant witness scope is outside FR223 repeat families: ${record.scopeRef}.`);
    }
  }

  const freshnessScopes = new Set(freshnessRecords.map((record) => record.scopeRef));
  const sameParticipantScopes = new Set(sameParticipantRecords.map((record) => record.scopeRef));

  const selection = partitionCoverage(
    'selection',
    input.repeatFamilies,
    freshnessScopes,
    sameParticipantScopes,
  );
  const holdout = partitionCoverage(
    'holdout',
    input.repeatFamilies,
    freshnessScopes,
    sameParticipantScopes,
  );
  const uncoveredCaptureAdmissionRefs = [
    ...selection.uncoveredCaptureAdmissionRefs,
    ...holdout.uncoveredCaptureAdmissionRefs,
  ].sort();
  const uncoveredCaptureFamilyKeys = [
    ...selection.uncoveredCaptureFamilyKeys,
    ...holdout.uncoveredCaptureFamilyKeys,
  ].sort();

  const reviewerHumanStatusWitnessPresent = humanRecords.length > 0;
  const reviewerIndependenceWitnessPresent = independenceRecords.length > 0;
  const expectedCaptureAdmissionCount =
    selection.expectedCaptureAdmissionCount + holdout.expectedCaptureAdmissionCount;
  const witnessedCaptureAdmissionCount =
    selection.witnessedCaptureAdmissionCount + holdout.witnessedCaptureAdmissionCount;
  const expectedRepeatFamilyCount =
    selection.expectedRepeatFamilyCount + holdout.expectedRepeatFamilyCount;
  const witnessedRepeatFamilyCount =
    selection.witnessedRepeatFamilyCount + holdout.witnessedRepeatFamilyCount;

  const complete =
    reviewerHumanStatusWitnessPresent
    && reviewerIndependenceWitnessPresent
    && uncoveredCaptureAdmissionRefs.length === 0
    && uncoveredCaptureFamilyKeys.length === 0;

  const coverageDigest = sha256(canonicalJson({
    contractVersion: FR226_CONTRACT_VERSION,
    fr222CorrespondenceRef: input.correspondence.correspondenceRef,
    fr222CorrespondenceDigest: input.correspondence.correspondenceDigest,
    fr223RepeatFamilyEvidenceRef: input.repeatFamilies.evidenceRef,
    fr223RepeatFamilyEvidenceDigest: input.repeatFamilies.evidenceDigest,
    fr224StudyGateRef: input.studyGate.gateRef,
    fr224StudyGateDigest: input.studyGate.gateDigest,
    fr225WitnessEvidenceRef: input.witnessEvidence.evidenceRef,
    fr225WitnessEvidenceDigest: input.witnessEvidence.evidenceDigest,
    reviewerCohortScopeRef,
    reviewerHumanStatusWitnessRecordCount: humanRecords.length,
    reviewerIndependenceWitnessRecordCount: independenceRecords.length,
    selection,
    holdout,
  }));

  const result: FR226WitnessScopeCoverage = Object.freeze({
    schemaVersion: 'fr226-witness-scope-coverage-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR226_CONTRACT_VERSION,
    authorityState:
      'exact_declared_witness_scope_coverage_assembled_underlying_facts_unverified' as const,
    sourceEvidence: Object.freeze({
      fr222CorrespondenceRef: input.correspondence.correspondenceRef,
      fr222CorrespondenceDigest: input.correspondence.correspondenceDigest,
      fr223RepeatFamilyEvidenceRef: input.repeatFamilies.evidenceRef,
      fr223RepeatFamilyEvidenceDigest: input.repeatFamilies.evidenceDigest,
      fr224StudyGateRef: input.studyGate.gateRef,
      fr224StudyGateDigest: input.studyGate.gateDigest,
      fr225WitnessEvidenceRef: input.witnessEvidence.evidenceRef,
      fr225WitnessEvidenceDigest: input.witnessEvidence.evidenceDigest,
    }),
    reviewerCohortScopeRef,
    reviewerHumanStatusWitnessPresent,
    reviewerIndependenceWitnessPresent,
    reviewerHumanStatusWitnessRecordCount: humanRecords.length,
    reviewerIndependenceWitnessRecordCount: independenceRecords.length,
    expectedCaptureAdmissionCount,
    witnessedCaptureAdmissionCount,
    expectedRepeatFamilyCount,
    witnessedRepeatFamilyCount,
    selection,
    holdout,
    uncoveredCaptureAdmissionRefs: Object.freeze(uncoveredCaptureAdmissionRefs),
    uncoveredCaptureFamilyKeys: Object.freeze(uncoveredCaptureFamilyKeys),
    coverageState: complete
      ? 'DECLARED_WITNESS_SCOPE_COVERAGE_COMPLETE_AUTHORITY_BLOCKED' as const
      : 'DECLARED_WITNESS_SCOPE_COVERAGE_INCOMPLETE_AUTHORITY_BLOCKED' as const,
    integrityBoundary: Object.freeze({
      activeFR222Required: true as const,
      activeFR223Required: true as const,
      activeFR224Required: true as const,
      activeFR225Required: true as const,
      exactFR224SourceBindingRequired: true as const,
      exactFR225StudyGateBindingRequired: true as const,
      exactReviewerCohortScopeRequired: true as const,
      exactCaptureAdmissionScopeRequired: true as const,
      exactCaptureFamilyScopeRequired: true as const,
      outOfStudyWitnessScopeRejected: true as const,
      selectionHoldoutPreserved: true as const,
    }),
    noInventedSufficiencyRule: Object.freeze({
      minimumVerifierCountInvented: false as const,
      witnessCoverageMeansEmpiricalSufficiency: false as const,
      completeCoverageMeansCalibrationAuthorized: false as const,
    }),
    authorityBoundary: Object.freeze({
      verifierIdentityIndependentlyVerified: false as const,
      verifierIndependenceIndependentlyVerified: false as const,
      externalEvidenceInspectedByRuntime: false as const,
      witnessClaimCryptographicallyAuthenticated: false as const,
      declaredWitnessCoverageMeansUnderlyingFactsEstablished: false as const,
      reviewerHumanStatusIndependentlyVerified: false as const,
      reviewerIndependenceIndependentlyVerified: false as const,
      captureFreshnessIndependentlyVerified: false as const,
      sameParticipantIdentityIndependentlyVerified: false as const,
      captureQualityValidated: false as const,
      empiricalRepeatabilityEstablished: false as const,
      repeatCaptureStabilityEstablished: false as const,
      empiricalSufficiencyEstablished: false as const,
      calibrationAuthorized: false as const,
      transitionZoneIssued: false as const,
      thresholdIssued: false as const,
      classifierIssued: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    coverageDigest,
    coverageRef:
      `evidence.fr226.witness_scope_coverage:${coverageDigest.slice('sha256:'.length)}`,
  });
  ISSUED.add(result);
  return result;
}

export function assertWitnessScopeCoverageFR226(
  coverage: FR226WitnessScopeCoverage,
): void {
  if (!ISSUED.has(coverage)) fail('witness scope coverage was not issued by active FR226 runtime.');
  if (
    coverage.schemaVersion !== 'fr226-witness-scope-coverage-v1'
    || coverage.contractVersion !== FR226_CONTRACT_VERSION
    || coverage.integrityBoundary.activeFR222Required !== true
    || coverage.integrityBoundary.activeFR223Required !== true
    || coverage.integrityBoundary.activeFR224Required !== true
    || coverage.integrityBoundary.activeFR225Required !== true
    || coverage.integrityBoundary.outOfStudyWitnessScopeRejected !== true
    || coverage.noInventedSufficiencyRule.minimumVerifierCountInvented !== false
    || coverage.noInventedSufficiencyRule.witnessCoverageMeansEmpiricalSufficiency !== false
    || coverage.noInventedSufficiencyRule.completeCoverageMeansCalibrationAuthorized !== false
    || coverage.authorityBoundary.declaredWitnessCoverageMeansUnderlyingFactsEstablished !== false
    || coverage.authorityBoundary.reviewerHumanStatusIndependentlyVerified !== false
    || coverage.authorityBoundary.reviewerIndependenceIndependentlyVerified !== false
    || coverage.authorityBoundary.captureFreshnessIndependentlyVerified !== false
    || coverage.authorityBoundary.sameParticipantIdentityIndependentlyVerified !== false
    || coverage.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || coverage.authorityBoundary.repeatCaptureStabilityEstablished !== false
    || coverage.authorityBoundary.empiricalSufficiencyEstablished !== false
    || coverage.authorityBoundary.calibrationAuthorized !== false
    || coverage.authorityBoundary.thresholdIssued !== false
    || coverage.authorityBoundary.classifierIssued !== false
    || coverage.authorityBoundary.traditionalBindingIssued !== false
  ) fail('FR226 witness-scope coverage authority boundary drift.');
}
