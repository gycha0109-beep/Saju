import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { InterpretationExecutionResult } from './interpretation-engine.js';
import type { GeneralNatalC3StructuralEvidence } from './general-natal-c3-structural-evidence.js';
import {
  buildGeneralNatalGejuSelectionSignalObservation,
  type GeneralNatalGejuSelectionSignalObservationReport,
} from '../research/general-natal-geju-selection-signal-observation.js';
import {
  R034_AUTHORITY, R034_TIAOHOU_PRIORITY_VERSION,
} from '../research/general-natal-tiaohou-priority-conditions.js';
import {
  R040_AUTHORITY, R040_NONCOLLAPSING_EVIDENCE_VERSION,
} from '../research/general-natal-noncollapsing-yongxi-evidence.js';

export const GENERAL_NATAL_C4_METHOD_EVIDENCE_VERSION = '0.1.0-research' as const;

export interface GeneralNatalC4GejuSignalLink {
  readonly signalId: string;
  readonly signalKind: 'transparency' | 'branch_meeting';
  readonly canonicalFactRefs: readonly string[];
  readonly exactT5ClaimIds: readonly string[];
  readonly t5LineageState: 'resolved' | 'partially_unavailable' | 'not_applicable';
}

export interface GeneralNatalC4MethodScopedEvidence {
  readonly schemaVersion: typeof GENERAL_NATAL_C4_METHOD_EVIDENCE_VERSION;
  readonly snapshotId: string;
  readonly interpretationRunId: string;
  readonly geju: {
    readonly scope: 'governed_source_signals_only';
    readonly observation: GeneralNatalGejuSelectionSignalObservationReport;
    readonly links: readonly GeneralNatalC4GejuSignalLink[];
    readonly candidate: 'not_determined';
    readonly establishment: 'not_determined';
    readonly winner: 'not_authorized';
  };
  readonly tiaohou: {
    readonly methodologyVersion: typeof R034_TIAOHOU_PRIORITY_VERSION;
    readonly status: 'unresolved_no_governed_chart_resolver';
    readonly climateRequirement: 'not_determined';
    readonly executableResolverAuthorized: false;
  };
  readonly yongxi: {
    readonly methodologyVersion: typeof R040_NONCOLLAPSING_EVIDENCE_VERSION;
    readonly status: 'unresolved_no_governed_role_assignment';
    readonly primaryUse: 'not_determined';
    readonly xiShen: 'not_determined';
    readonly jiShen: 'not_determined';
    readonly singleWinnerAuthorized: false;
  };
  readonly semanticScope: 'source_observation_without_method_decision';
  readonly t8SynthesisAuthorized: false;
  readonly consumerProjectionAuthorized: false;
}

function linkSourceSignal(
  snapshot: CanonicalSajuSnapshot,
  c3: GeneralNatalC3StructuralEvidence,
  signal: GeneralNatalGejuSelectionSignalObservationReport['signals'][number],
): GeneralNatalC4GejuSignalLink {
  if (signal.signalKind === 'transparency') {
    const monthHidden = c3.hiddenStemObservations.find((entry) => entry.pillar === 'month');
    if (monthHidden?.status !== 'resolved' || !monthHidden.stems?.includes(signal.stem)) {
      throw new Error('WS_C4_TRANSPARENCY_HIDDEN_STEM_MISMATCH');
    }
    const refs = ['derivedFacts.hiddenStems.month'];
    const ids: string[] = [];
    for (const pillar of signal.sourceObservedExactMatchPositions) {
      const canonical = snapshot.pillars[pillar];
      if (canonical.status !== 'resolved' || canonical.value.stem.value !== signal.stem) {
        throw new Error('WS_C4_TRANSPARENCY_POSITION_MISMATCH');
      }
      const slot = c3.positionedTenGods.find((entry) =>
        entry.pillar === pillar && entry.component === 'stem'
      );
      if (slot === undefined) throw new Error('WS_C4_POSITION_EVIDENCE_MISSING');
      refs.push('pillars.' + pillar, slot.sourceFactRef);
      if (slot.status === 'resolved' && slot.claimId !== undefined) ids.push(slot.claimId);
    }
    return {
      signalId: signal.signalId,
      signalKind: 'transparency',
      canonicalFactRefs: Object.freeze([...new Set(refs)].sort()),
      exactT5ClaimIds: Object.freeze([...new Set(ids)].sort()),
      t5LineageState: ids.length === signal.sourceObservedExactMatchPositions.length
        ? 'resolved' : 'partially_unavailable',
    };
  }
  const relations = snapshot.derivedFacts.structuralRelations;
  if (
    relations?.status !== 'resolved' ||
    !relations.value.some((relation) =>
      relation.relationId === signal.relationId &&
      relation.kind === 'branch_three_combination' &&
      relation.semantics.structuralMatchOnly === true &&
      relation.semantics.transformationEstablished === false
    )
  ) throw new Error('WS_C4_BRANCH_MEETING_CANONICAL_MISMATCH');
  return {
    signalId: signal.signalId,
    signalKind: 'branch_meeting',
    canonicalFactRefs: ['derivedFacts.structuralRelations.' + signal.relationId, 'pillars.month'],
    exactT5ClaimIds: [],
    t5LineageState: 'not_applicable',
  };
}

/** Source-observation-only C4. No new interpreter claim, chart-level GEJU
 * candidate, climate selector, multi-method winner or Yongshen result. */
export function bindGeneralNatalC4MethodScopedEvidence(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  c3: GeneralNatalC3StructuralEvidence,
): GeneralNatalC4MethodScopedEvidence {
  if (
    execution.run.snapshotId !== snapshot.snapshotId ||
    execution.run.snapshotHash !== snapshot.calculationHash ||
    c3.snapshotId !== snapshot.snapshotId ||
    c3.interpretationRunId !== execution.run.interpretationRunId
  ) throw new Error('WS_C4_EXECUTION_IDENTITY_MISMATCH');
  if (!execution.integrity.valid ||
      execution.claims.some((claim) => claim.snapshotId !== snapshot.snapshotId)) {
    throw new Error('WS_C4_CLAIM_GRAPH_INVALID');
  }
  if (
    R034_AUTHORITY.executableTiaohouResolverAuthorized !== false ||
    R034_AUTHORITY.globalPriorityResolverAuthorized !== false ||
    R040_AUTHORITY.finalYongShenFieldAuthorized !== false ||
    R040_AUTHORITY.methodWinnerResolverAuthorized !== false ||
    R040_AUTHORITY.chartRoleAssignmentAuthorized !== false
  ) throw new Error('WS_C4_METHOD_AUTHORITY_CHANGED');

  const geju = buildGeneralNatalGejuSelectionSignalObservation(snapshot);
  if (
    geju.snapshotId !== snapshot.snapshotId ||
    geju.candidateDerivationAuthorized !== false ||
    geju.establishmentPredicateAuthorized !== false ||
    geju.signalRankingAuthorized !== false ||
    geju.signalSetExhaustiveAuthorized !== false ||
    geju.zeroSignalMeansNoCandidateAuthorized !== false ||
    geju.signals.length !== geju.signalCount
  ) throw new Error('WS_C4_GEJU_SOURCE_BOUNDARY_MISMATCH');

  return {
    schemaVersion: GENERAL_NATAL_C4_METHOD_EVIDENCE_VERSION,
    snapshotId: snapshot.snapshotId,
    interpretationRunId: execution.run.interpretationRunId,
    geju: {
      scope: 'governed_source_signals_only',
      observation: geju,
      links: Object.freeze(geju.signals.map((signal) => linkSourceSignal(snapshot, c3, signal))),
      candidate: 'not_determined',
      establishment: 'not_determined',
      winner: 'not_authorized',
    },
    tiaohou: {
      methodologyVersion: R034_TIAOHOU_PRIORITY_VERSION,
      status: 'unresolved_no_governed_chart_resolver',
      climateRequirement: 'not_determined',
      executableResolverAuthorized: false,
    },
    yongxi: {
      methodologyVersion: R040_NONCOLLAPSING_EVIDENCE_VERSION,
      status: 'unresolved_no_governed_role_assignment',
      primaryUse: 'not_determined',
      xiShen: 'not_determined',
      jiShen: 'not_determined',
      singleWinnerAuthorized: false,
    },
    semanticScope: 'source_observation_without_method_decision',
    t8SynthesisAuthorized: false,
    consumerProjectionAuthorized: false,
  };
}
