import { createHash } from 'node:crypto';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  HeavenlyStem,
  PillarSlot,
} from '../contracts/calculation.js';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
  type GeneralNatalGejuCandidatePredicateGap,
} from './general-natal-geju-candidate-source-frontier.js';
import {
  buildGeneralNatalGejuBranchMeetingSourceEvidence,
  type GeneralNatalGejuBranchMeetingEvidenceItem,
} from './general-natal-geju-branch-meeting-source-evidence.js';
import {
  GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES,
} from './general-natal-geju-co-use-affinity-source-evidence.js';
import {
  buildGeneralNatalGejuTransparencySlotSourceEvidence,
  type GeneralNatalGejuHiddenStemTransparencySlotEvidence,
  type GeneralNatalGejuSourceObservedTransparencySlot,
} from './general-natal-geju-transparency-slot-source-evidence.js';

export const GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_SCOPE =
  'governed_mixed_qi_source_selection_signal_observation' as const;

export type GeneralNatalGejuSelectionSignalKind = 'transparency' | 'branch_meeting';

export type GeneralNatalGejuSelectionSignalObservationStatus =
  | 'resolved_zero_governed_source_signals'
  | 'resolved_one_governed_source_signal'
  | 'resolved_multiple_governed_source_signals'
  | 'outside_selected_mixed_qi_scope'
  | 'canonical_substrate_unavailable';

interface GeneralNatalGejuSelectionSignalObservationBase {
  readonly signalId: string;
  readonly signalKind: GeneralNatalGejuSelectionSignalKind;
  readonly upstreamReportId: string;
  readonly selectionEffectEstablished: false;
  readonly candidateIdentityEstablished: false;
  readonly rankAssigned: false;
  readonly precedenceAssigned: false;
  readonly strengthAssigned: false;
  readonly candidateEmitted: false;
}

export interface GeneralNatalGejuTransparencySelectionSignalObservation
  extends GeneralNatalGejuSelectionSignalObservationBase {
  readonly signalKind: 'transparency';
  readonly stem: HeavenlyStem;
  readonly sourceObservedExactMatchPositions: readonly GeneralNatalGejuSourceObservedTransparencySlot[];
}

export interface GeneralNatalGejuBranchMeetingSelectionSignalObservation
  extends GeneralNatalGejuSelectionSignalObservationBase {
  readonly signalKind: 'branch_meeting';
  readonly relationId: string;
  readonly sourceExampleId: string;
  readonly monthBranch: EarthlyBranch;
  readonly observedParticipantPositions: readonly PillarSlot[];
  readonly observedParticipantBranches: readonly EarthlyBranch[];
}

export type GeneralNatalGejuSelectionSignalObservation =
  | GeneralNatalGejuTransparencySelectionSignalObservation
  | GeneralNatalGejuBranchMeetingSelectionSignalObservation;

export interface GeneralNatalGejuSelectionSignalObservationReport {
  readonly reportId: string;
  readonly reportVersion: typeof GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_VERSION;
  readonly sourceScope: typeof GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_SCOPE;
  readonly snapshotId: string;
  readonly status: GeneralNatalGejuSelectionSignalObservationStatus;
  readonly unavailableReasonCode?: string;
  readonly mixedQiSourceScopeApplies: boolean;
  readonly upstreamTransparencyReportId: string;
  readonly upstreamBranchMeetingReportId: string;
  readonly sourceIds: readonly string[];
  readonly signals: readonly GeneralNatalGejuSelectionSignalObservation[];
  readonly signalCount: number;
  readonly governedSourceSignalObservationAuthorized: true;
  readonly zeroOneMultipleSignalCardinalityObservationAuthorized: true;
  readonly sourceSignalCoexistenceAuthorized: true;
  readonly signalSetExhaustiveAuthorized: false;
  readonly zeroSignalMeansNoCandidateAuthorized: false;
  readonly signalArrayOrderSemanticAuthorized: false;
  readonly singleWinnerRequirementAuthorized: false;
  readonly signalRankingAuthorized: false;
  readonly signalPrecedenceAuthorized: false;
  readonly signalStrengthAuthorized: false;
  readonly candidateIdentityAuthorized: false;
  readonly multipleCandidateRepresentationAuthorized: false;
  readonly candidateDerivationAuthorized: false;
  readonly establishmentPredicateAuthorized: false;
  readonly candidateFactsEmitted: false;
  readonly establishmentFactsEmitted: false;
  readonly openPredicateGaps: readonly GeneralNatalGejuCandidatePredicateGap[];
  readonly authorityBoundary: string;
  readonly notes: readonly string[];
}

function stableSignalHash(material: unknown): string {
  return createHash('sha256').update(JSON.stringify(material)).digest('hex').slice(0, 20);
}

function transparencySignal(
  evidence: GeneralNatalGejuHiddenStemTransparencySlotEvidence,
  upstreamReportId: string,
): GeneralNatalGejuTransparencySelectionSignalObservation {
  const identityMaterial = {
    kind: 'transparency',
    stem: evidence.stem,
    positions: [...evidence.sourceObservedAdmissibleExactMatchPositions].sort(),
  };

  return Object.freeze({
    signalId: `general_natal_geju_source_signal_transparency_${stableSignalHash(identityMaterial)}`,
    signalKind: 'transparency' as const,
    upstreamReportId,
    stem: evidence.stem,
    sourceObservedExactMatchPositions: Object.freeze(
      [...evidence.sourceObservedAdmissibleExactMatchPositions].sort() as GeneralNatalGejuSourceObservedTransparencySlot[],
    ),
    selectionEffectEstablished: false as const,
    candidateIdentityEstablished: false as const,
    rankAssigned: false as const,
    precedenceAssigned: false as const,
    strengthAssigned: false as const,
    candidateEmitted: false as const,
  });
}

function branchMeetingSignal(
  evidence: GeneralNatalGejuBranchMeetingEvidenceItem,
  upstreamReportId: string,
): GeneralNatalGejuBranchMeetingSelectionSignalObservation {
  const identityMaterial = {
    kind: 'branch_meeting',
    relationId: evidence.relationId,
    sourceExampleId: evidence.exampleId,
  };

  return Object.freeze({
    signalId: `general_natal_geju_source_signal_branch_meeting_${stableSignalHash(identityMaterial)}`,
    signalKind: 'branch_meeting' as const,
    upstreamReportId,
    relationId: evidence.relationId,
    sourceExampleId: evidence.exampleId,
    monthBranch: evidence.monthBranch,
    observedParticipantPositions: Object.freeze([...evidence.observedParticipantPositions]),
    observedParticipantBranches: Object.freeze([...evidence.observedParticipantBranches]),
    selectionEffectEstablished: false as const,
    candidateIdentityEstablished: false as const,
    rankAssigned: false as const,
    precedenceAssigned: false as const,
    strengthAssigned: false as const,
    candidateEmitted: false as const,
  });
}

export const GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_VERSION,
        sourceScope: GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_SCOPE,
        coUseSourceId:
          GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES.coUseRule.sourceId,
        governedSourceSignalObservationAuthorized: true,
        zeroOneMultipleSignalCardinalityObservationAuthorized: true,
        sourceSignalCoexistenceAuthorized: true,
        signalSetExhaustiveAuthorized: false,
        zeroSignalMeansNoCandidateAuthorized: false,
        signalArrayOrderSemanticAuthorized: false,
        singleWinnerRequirementAuthorized: false,
        signalRankingAuthorized: false,
        signalPrecedenceAuthorized: false,
        signalStrengthAuthorized: false,
        candidateIdentityAuthorized: false,
        multipleCandidateRepresentationAuthorized: false,
        candidateDerivationAuthorized: false,
        establishmentPredicateAuthorized: false,
        openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
      }),
    )
    .digest('hex');

export function buildGeneralNatalGejuSelectionSignalObservation(
  snapshot: CanonicalSajuSnapshot,
): GeneralNatalGejuSelectionSignalObservationReport {
  const transparencyReport = buildGeneralNatalGejuTransparencySlotSourceEvidence(snapshot);
  const branchMeetingReport = buildGeneralNatalGejuBranchMeetingSourceEvidence(snapshot);
  const mixedQiSourceScopeApplies =
    transparencyReport.mixedQiSourceScopeApplies && branchMeetingReport.mixedQiSourceScopeApplies;

  const transparencySignals = transparencyReport.hiddenStemEvidence
    .filter((evidence) => evidence.positiveTransparencyExistenceOnObservedSlotsEstablished)
    .map((evidence) => transparencySignal(evidence, transparencyReport.reportId));

  const branchMeetingSignals = branchMeetingReport.meetingEvidence.map((evidence) =>
    branchMeetingSignal(evidence, branchMeetingReport.reportId),
  );

  const signals = Object.freeze(
    [...transparencySignals, ...branchMeetingSignals].sort((left, right) =>
      left.signalId.localeCompare(right.signalId),
    ),
  );

  let status: GeneralNatalGejuSelectionSignalObservationStatus;
  let unavailableReasonCode: string | undefined;

  if (
    transparencyReport.status === 'canonical_substrate_unavailable' ||
    branchMeetingReport.status === 'canonical_substrate_unavailable'
  ) {
    status = 'canonical_substrate_unavailable';
    unavailableReasonCode =
      transparencyReport.unavailableReasonCode ??
      branchMeetingReport.unavailableReasonCode ??
      'general-natal-geju-selection-signal-observation-requires-resolved-upstream-substrate';
  } else if (!mixedQiSourceScopeApplies) {
    status = 'outside_selected_mixed_qi_scope';
  } else if (signals.length === 0) {
    status = 'resolved_zero_governed_source_signals';
  } else if (signals.length === 1) {
    status = 'resolved_one_governed_source_signal';
  } else {
    status = 'resolved_multiple_governed_source_signals';
  }

  const emittedSignals =
    status === 'canonical_substrate_unavailable' || status === 'outside_selected_mixed_qi_scope'
      ? Object.freeze([] as GeneralNatalGejuSelectionSignalObservation[])
      : signals;

  const sourceIds = Object.freeze(
    Array.from(
      new Set([
        ...transparencyReport.sourceIds,
        ...branchMeetingReport.sourceIds,
        GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES.coUseRule.sourceId,
      ]),
    ).sort(),
  );

  const material = {
    reportVersion: GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_VERSION,
    sourceScope: GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_SCOPE,
    snapshotId: snapshot.snapshotId,
    status,
    ...(unavailableReasonCode === undefined ? {} : { unavailableReasonCode }),
    mixedQiSourceScopeApplies,
    upstreamTransparencyReportId: transparencyReport.reportId,
    upstreamBranchMeetingReportId: branchMeetingReport.reportId,
    sourceIds,
    signals: emittedSignals,
    signalCount: emittedSignals.length,
    governedSourceSignalObservationAuthorized: true as const,
    zeroOneMultipleSignalCardinalityObservationAuthorized: true as const,
    sourceSignalCoexistenceAuthorized: true as const,
    signalSetExhaustiveAuthorized: false as const,
    zeroSignalMeansNoCandidateAuthorized: false as const,
    signalArrayOrderSemanticAuthorized: false as const,
    singleWinnerRequirementAuthorized: false as const,
    signalRankingAuthorized: false as const,
    signalPrecedenceAuthorized: false as const,
    signalStrengthAuthorized: false as const,
    candidateIdentityAuthorized: false as const,
    multipleCandidateRepresentationAuthorized: false as const,
    candidateDerivationAuthorized: false as const,
    establishmentPredicateAuthorized: false as const,
    candidateFactsEmitted: false as const,
    establishmentFactsEmitted: false as const,
    openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
    authorityBoundary:
      'This report represents only currently governed source-evidence signals from positive transparency observations and source-aligned full-three branch-meeting observations. The selected mixed-qi source permits one, plural, and transparency-plus-meeting co-use, so zero/one/multiple governed signal cardinality may be observed without forcing a single winner. The signal set is explicitly non-exhaustive and is not a GEJU_CANDIDATE contract: signal identity, array order, cardinality, or coexistence must not be interpreted as candidate identity, rank, precedence, strength, final selection effect, or establishment state.',
  };

  return Object.freeze({
    reportId: `general_natal_geju_selection_signal_observation_${createHash('sha256')
      .update(JSON.stringify(material))
      .digest('hex')
      .slice(0, 24)}`,
    ...material,
    notes: Object.freeze([
      'Transparency emits at most one governed observation signal per upstream positive hidden-stem evidence item; multiple observed positions for the same stem remain attached to that one signal and do not become ranked candidates.',
      'Branch-meeting signals preserve upstream relationId and source example identity but do not claim transformation or post-interaction effectiveness.',
      'Signal array order is normalized only for deterministic serialization and has no semantic ranking or precedence meaning.',
      'A resolved zero-signal report means no currently governed positive source signal was observed; it does not establish that no candidate exists because the signal set is non-exhaustive.',
      'Multiple governed signals may coexist because the selected source explicitly permits 兼透 and 透與會並用; coexistence does not authorize a production candidate multiplicity contract.',
      'All five coarse Gyeokguk predicate-authority gaps remain open. General Natal production authority and Commerce remain blocked.',
    ]),
  });
}
