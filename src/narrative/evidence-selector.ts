import { resolved, type FactState } from '../contracts/common.js';
import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type {
  ClaimRelation,
  InterpretationClaim,
} from '../contracts/interpretation.js';
import type {
  NarrativeEvidenceBundle,
  NarrativePurpose,
  SelectedFact,
  SourceSummary,
} from '../contracts/narrative.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import {
  deterministicContentHash,
  type ResolvedRuleRegistrySnapshot,
} from '../interpretation/rule-registry.js';

const FORBIDDEN_PATH_SEGMENTS = new Set(['__proto__', 'prototype', 'constructor']);

export type EvidenceSelectionErrorCode =
  | 'RUN_SNAPSHOT_MISMATCH'
  | 'RUN_REGISTRY_MISMATCH'
  | 'TARGET_CLAIMS_REQUIRED'
  | 'TARGET_CLAIM_NOT_FOUND'
  | 'FACT_PATH_NOT_FOUND'
  | 'FACT_PATH_NOT_STATE'
  | 'SCENARIO_NOT_FOUND'
  | 'SCENARIO_FACT_UNRESOLVED'
  | 'SOURCE_NOT_FOUND';

export class EvidenceSelectionError extends Error {
  readonly code: EvidenceSelectionErrorCode;

  constructor(code: EvidenceSelectionErrorCode, message: string) {
    super(message);
    this.name = 'EvidenceSelectionError';
    this.code = code;
  }
}

export interface EvidenceSelectionRequest {
  requestId: string;
  purpose: NarrativePurpose;
  narrativePolicyVersion: string;
  targetClaimIds?: readonly string[];
  includeSourceSummaries?: boolean;
}

export interface BuiltNarrativeEvidenceBundle {
  bundle: NarrativeEvidenceBundle;
  evidenceBundleHash: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isFactState(value: unknown): value is FactState<unknown> {
  return (
    isRecord(value) &&
    (value.status === 'resolved' || value.status === 'ambiguous' || value.status === 'unavailable')
  );
}

function getPath(root: unknown, path: string): { found: boolean; value?: unknown } {
  const segments = path.split('.').filter((segment) => segment.length > 0);
  if (segments.length === 0 || segments.some((segment) => FORBIDDEN_PATH_SEGMENTS.has(segment))) {
    return { found: false };
  }

  let cursor: unknown = root;
  for (const segment of segments) {
    if (!isRecord(cursor) || !Object.prototype.hasOwnProperty.call(cursor, segment)) {
      return { found: false };
    }
    cursor = cursor[segment];
  }
  return { found: true, value: cursor };
}

function canonicalFact(snapshot: CanonicalSajuSnapshot, path: string): FactState<unknown> {
  const located = getPath(snapshot, path);
  if (!located.found) {
    throw new EvidenceSelectionError('FACT_PATH_NOT_FOUND', `Canonical fact path not found: ${path}`);
  }
  if (!isFactState(located.value)) {
    throw new EvidenceSelectionError('FACT_PATH_NOT_STATE', `Narrative fact path is not a FactState: ${path}`);
  }
  return located.value;
}

function temporalFact(
  execution: InterpretationExecutionResult,
  claim: InterpretationClaim,
  path: string,
): FactState<unknown> {
  const matches = claim.ruleRefs.flatMap((ruleRef) => {
    const evaluation = execution.evaluations.find(
      (candidate) => candidate.evaluationId === ruleRef.evaluationId,
    );
    if (evaluation === undefined) return [];
    return evaluation.inputRefs.filter(
      (inputRef) => inputRef.sourceType === 'temporal_fact' && inputRef.idOrPath === path,
    );
  });

  const withObservedValue = matches.filter((inputRef) =>
    Object.prototype.hasOwnProperty.call(inputRef, 'observedValue'),
  );
  const first = withObservedValue[0];
  if (first === undefined) {
    throw new EvidenceSelectionError(
      'FACT_PATH_NOT_FOUND',
      `Temporal fact path not found in claim evaluation provenance: ${path}`,
    );
  }

  const firstHash = deterministicContentHash(first.observedValue);
  if (
    withObservedValue.some(
      (inputRef) => deterministicContentHash(inputRef.observedValue) !== firstHash,
    )
  ) {
    throw new EvidenceSelectionError(
      'FACT_PATH_NOT_STATE',
      `Temporal fact path has conflicting observed values across claim evaluations: ${path}`,
    );
  }

  return resolved(first.observedValue);
}

function activeClaimIndex(
  execution: InterpretationExecutionResult,
): ReadonlyMap<string, InterpretationClaim> {
  return new Map(
    execution.claims
      .filter((claim) => claim.state === 'active')
      .map((claim) => [claim.claimId, claim]),
  );
}

function initialClaimIds(
  execution: InterpretationExecutionResult,
  request: EvidenceSelectionRequest,
): Set<string> {
  const active = activeClaimIndex(execution);
  if (request.purpose === 'full_reading') return new Set(active.keys());

  if (request.targetClaimIds === undefined || request.targetClaimIds.length === 0) {
    throw new EvidenceSelectionError(
      'TARGET_CLAIMS_REQUIRED',
      `${request.purpose} evidence selection requires explicit targetClaimIds.`,
    );
  }

  const selected = new Set<string>();
  for (const claimId of request.targetClaimIds) {
    if (!active.has(claimId)) {
      throw new EvidenceSelectionError(
        'TARGET_CLAIM_NOT_FOUND',
        `Requested active claim is not available in the current interpretation run: ${claimId}`,
      );
    }
    selected.add(claimId);
  }
  return selected;
}

function addContextClaim(
  selected: Set<string>,
  active: ReadonlyMap<string, InterpretationClaim>,
  claimId: string,
): boolean {
  if (!active.has(claimId) || selected.has(claimId)) return false;
  selected.add(claimId);
  return true;
}

function expandClaimContext(
  execution: InterpretationExecutionResult,
  initial: Set<string>,
): Set<string> {
  const active = activeClaimIndex(execution);
  const selected = new Set(initial);
  let changed = true;

  while (changed) {
    changed = false;

    for (const claimId of [...selected]) {
      const claim = active.get(claimId);
      if (claim === undefined) continue;
      for (const upstreamClaimId of claim.upstreamClaimRefs) {
        if (addContextClaim(selected, active, upstreamClaimId)) changed = true;
      }
    }

    for (const relation of execution.claimRelations) {
      switch (relation.relation) {
        case 'depends_on':
        case 'derived_from':
          if (
            selected.has(relation.fromClaimId) &&
            addContextClaim(selected, active, relation.toClaimId)
          ) {
            changed = true;
          }
          break;
        case 'contradicts':
        case 'qualifies':
        case 'supports':
          if (
            selected.has(relation.fromClaimId) &&
            addContextClaim(selected, active, relation.toClaimId)
          ) {
            changed = true;
          }
          if (
            selected.has(relation.toClaimId) &&
            addContextClaim(selected, active, relation.fromClaimId)
          ) {
            changed = true;
          }
          break;
        case 'supersedes':
          break;
      }
    }
  }

  return selected;
}

function scenarioFactRef(scenarioId: string, path: string): string {
  return `scenario:${scenarioId}:${path}`;
}

function selectedFactsForClaim(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  claim: InterpretationClaim,
): readonly SelectedFact[] {
  const facts: SelectedFact[] = [];

  for (const path of claim.factRefs) {
    if (path.startsWith('temporal.')) {
      facts.push({ ref: path, path, fact: temporalFact(execution, claim, path) });
      continue;
    }

    const base = canonicalFact(snapshot, path);

    if (claim.scenarioRef === undefined) {
      facts.push({ ref: path, path, fact: base });
      continue;
    }

    const scenario = snapshot.scenarios.find((candidate) => candidate.scenarioId === claim.scenarioRef);
    if (scenario === undefined) {
      throw new EvidenceSelectionError(
        'SCENARIO_NOT_FOUND',
        `Claim ${claim.claimId} references missing calculation scenario ${claim.scenarioRef}`,
      );
    }

    if (base.status === 'ambiguous') {
      facts.push({ ref: path, path, fact: base });
    }

    const override = scenario.factOverrides.find((candidate) => candidate.path === path);
    if (override !== undefined) {
      facts.push({
        ref: scenarioFactRef(scenario.scenarioId, path),
        path,
        scenarioRef: scenario.scenarioId,
        fact: resolved(override.value),
      });
      continue;
    }

    if (base.status !== 'resolved') {
      throw new EvidenceSelectionError(
        'SCENARIO_FACT_UNRESOLVED',
        `Scenario ${scenario.scenarioId} does not resolve claim fact ${path}.`,
      );
    }

    facts.push({
      ref: scenarioFactRef(scenario.scenarioId, path),
      path,
      scenarioRef: scenario.scenarioId,
      fact: base,
    });
  }

  return facts;
}

function selectFacts(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  claims: readonly InterpretationClaim[],
): readonly SelectedFact[] {
  const byRef = new Map<string, SelectedFact>();
  for (const claim of claims) {
    for (const fact of selectedFactsForClaim(snapshot, execution, claim)) byRef.set(fact.ref, fact);
  }
  return [...byRef.values()].sort((left, right) => left.ref.localeCompare(right.ref));
}

function selectRelations(
  execution: InterpretationExecutionResult,
  selectedClaimIds: ReadonlySet<string>,
): readonly ClaimRelation[] {
  return execution.claimRelations
    .filter(
      (relation) =>
        selectedClaimIds.has(relation.fromClaimId) && selectedClaimIds.has(relation.toClaimId),
    )
    .sort((left, right) => left.relationId.localeCompare(right.relationId));
}

function sourceSummaries(
  registry: ResolvedRuleRegistrySnapshot,
  claims: readonly InterpretationClaim[],
): readonly SourceSummary[] {
  const sourceIds = new Set(claims.flatMap((claim) => claim.sourceRefs));
  const summaries: SourceSummary[] = [];

  for (const sourceId of [...sourceIds].sort()) {
    const source = registry.sources.find((candidate) => candidate.sourceId === sourceId);
    if (source === undefined) {
      throw new EvidenceSelectionError(
        'SOURCE_NOT_FOUND',
        `Selected claim references source missing from Registry Snapshot: ${sourceId}`,
      );
    }
    summaries.push({
      sourceId,
      title: source.title,
      summary: source.notes ?? 'Registered source metadata; no source text included.',
    });
  }

  return summaries;
}

export function buildNarrativeEvidenceBundle(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
  request: EvidenceSelectionRequest,
): BuiltNarrativeEvidenceBundle {
  if (execution.run.snapshotId !== snapshot.snapshotId) {
    throw new EvidenceSelectionError(
      'RUN_SNAPSHOT_MISMATCH',
      `Interpretation run snapshot ${execution.run.snapshotId} does not match ${snapshot.snapshotId}.`,
    );
  }
  if (execution.run.registrySnapshotId !== registry.snapshot.registrySnapshotId) {
    throw new EvidenceSelectionError(
      'RUN_REGISTRY_MISMATCH',
      'Interpretation run and Registry Snapshot identities do not match.',
    );
  }

  const active = activeClaimIndex(execution);
  const selectedClaimIds = expandClaimContext(execution, initialClaimIds(execution, request));
  const claims = [...selectedClaimIds]
    .map((claimId) => active.get(claimId))
    .filter((claim): claim is InterpretationClaim => claim !== undefined)
    .sort((left, right) => left.claimId.localeCompare(right.claimId));
  const canonicalFacts = selectFacts(snapshot, execution, claims);
  const claimRelations = selectRelations(execution, selectedClaimIds);

  const bundle: NarrativeEvidenceBundle = {
    requestId: request.requestId,
    purpose: request.purpose,
    snapshotId: snapshot.snapshotId,
    interpretationRunId: execution.run.interpretationRunId,
    registrySnapshotId: registry.snapshot.registrySnapshotId,
    canonicalFacts,
    claims,
    claimRelations,
    ...(request.includeSourceSummaries === true
      ? { sourceSummaries: sourceSummaries(registry, claims) }
      : {}),
    narrativePolicyVersion: request.narrativePolicyVersion,
    constraints: {
      mayRecalculate: false,
      mayInventRules: false,
      mustPreserveMethodDifferences: true,
      mustDiscloseMaterialAmbiguity: true,
    },
  };

  return {
    bundle,
    evidenceBundleHash: deterministicContentHash(bundle),
  };
}
