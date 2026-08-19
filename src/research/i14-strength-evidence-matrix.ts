import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { InterpretationClaim, RuleEvaluation } from '../contracts/interpretation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const I14_STRENGTH_EVIDENCE_MATRIX_SCHEMA_VERSION = 'myeonghwa-strength-evidence-matrix-v1';

export type StrengthEvidenceExecutionState = 'complete' | 'partial' | 'failed' | 'not_evaluated';

export interface StrengthEvidenceScenarioMatrix {
  basis: 'canonical' | 'scenario';
  scenarioRef?: string;
  executionState: StrengthEvidenceExecutionState;
  evaluationIds: readonly string[];
  blockedEvaluationIds: readonly string[];
  seasonalSupportSignalClaimIds: readonly string[];
  visibleStemEvidenceClaimIds: readonly string[];
  hiddenPeerRootClaimIds: readonly string[];
  hiddenResourceSupportClaimIds: readonly string[];
  scopeGuardClaimIds: readonly string[];
  classificationAuthorized: false;
  numericScoringAuthorized: false;
}

export interface StrengthEvidenceMatrix {
  matrixId: string;
  schemaVersion: string;
  snapshotId: string;
  interpretationRunId: string;
  registrySnapshotId: string;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  scenarioPreservationRequired: boolean;
  scenarios: readonly StrengthEvidenceScenarioMatrix[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function evidenceKind(claim: InterpretationClaim): string | undefined {
  return isRecord(claim.value) && typeof claim.value.evidenceKind === 'string'
    ? claim.value.evidenceKind
    : undefined;
}

function executionState(evaluations: readonly RuleEvaluation[]): StrengthEvidenceExecutionState {
  if (evaluations.length === 0) return 'not_evaluated';
  if (evaluations.some((evaluation) => evaluation.status === 'error')) return 'failed';
  if (evaluations.some((evaluation) => evaluation.status !== 'matched' && evaluation.status !== 'not_matched')) {
    return 'partial';
  }
  return 'complete';
}

function sortedClaimIds(claims: readonly InterpretationClaim[]): readonly string[] {
  return claims.map((claim) => claim.claimId).sort();
}

function scenarioMatrix(
  execution: InterpretationExecutionResult,
  scenarioRef: string | undefined,
): StrengthEvidenceScenarioMatrix {
  const claims = execution.claims.filter((claim) => claim.scenarioRef === scenarioRef);
  const evaluations = execution.evaluations.filter((evaluation) => evaluation.scenarioRef === scenarioRef);
  const evidenceClaims = claims.filter((claim) => claim.claimType === 'DAY_MASTER_STRENGTH_EVIDENCE');

  return {
    basis: scenarioRef === undefined ? 'canonical' : 'scenario',
    ...(scenarioRef === undefined ? {} : { scenarioRef }),
    executionState: executionState(evaluations),
    evaluationIds: evaluations.map((evaluation) => evaluation.evaluationId).sort(),
    blockedEvaluationIds: evaluations
      .filter((evaluation) => evaluation.status !== 'matched' && evaluation.status !== 'not_matched')
      .map((evaluation) => evaluation.evaluationId)
      .sort(),
    seasonalSupportSignalClaimIds: sortedClaimIds(
      claims.filter((claim) => claim.claimType === 'CLAIM-DAY-MASTER-SEASONAL-SUPPORT-SIGNAL'),
    ),
    visibleStemEvidenceClaimIds: sortedClaimIds(
      evidenceClaims.filter((claim) => evidenceKind(claim) === 'visible_stem_relation'),
    ),
    hiddenPeerRootClaimIds: sortedClaimIds(
      evidenceClaims.filter((claim) => evidenceKind(claim) === 'hidden_peer_root'),
    ),
    hiddenResourceSupportClaimIds: sortedClaimIds(
      evidenceClaims.filter((claim) => evidenceKind(claim) === 'hidden_resource_support'),
    ),
    scopeGuardClaimIds: sortedClaimIds(
      claims.filter(
        (claim) =>
          claim.claimType === 'CLAIM-DAY-MASTER-STRENGTH-SCOPE-GUARD' ||
          claim.claimType === 'DAY_MASTER_STRENGTH_SCOPE_GUARD',
      ),
    ),
    classificationAuthorized: false,
    numericScoringAuthorized: false,
  };
}

export function buildI14StrengthEvidenceMatrix(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
): StrengthEvidenceMatrix {
  if (execution.run.snapshotId !== snapshot.snapshotId) {
    throw new Error(`Strength evidence matrix snapshot mismatch: ${snapshot.snapshotId} != ${execution.run.snapshotId}`);
  }
  if (execution.run.registrySnapshotId !== execution.executionPlan.registrySnapshotId) {
    throw new Error('Strength evidence matrix requires one internally consistent interpretation run.');
  }
  if (!execution.integrity.valid) {
    throw new Error('Strength evidence matrix cannot be built from an invalid claim graph.');
  }

  const scenarioRefs = snapshot.scenarios.length === 0
    ? [undefined]
    : snapshot.scenarios.map((scenario) => scenario.scenarioId).sort();
  const scenarios = scenarioRefs.map((scenarioRef) => scenarioMatrix(execution, scenarioRef));
  const matrixMaterial = {
    schemaVersion: I14_STRENGTH_EVIDENCE_MATRIX_SCHEMA_VERSION,
    snapshotId: snapshot.snapshotId,
    interpretationRunId: execution.run.interpretationRunId,
    registrySnapshotId: execution.run.registrySnapshotId,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    scenarioPreservationRequired: snapshot.scenarios.length > 0,
    scenarios,
  };

  return {
    matrixId: `strength_matrix_${deterministicContentHash(matrixMaterial).slice(0, 24)}`,
    ...matrixMaterial,
  };
}
