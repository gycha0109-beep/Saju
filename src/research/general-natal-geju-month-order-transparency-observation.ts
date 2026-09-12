import { createHash } from 'node:crypto';
import type {
  CanonicalSajuSnapshot,
  HeavenlyStem,
  PillarSlot,
} from '../contracts/calculation.js';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_REFERENCES,
  type GeneralNatalGejuCandidatePredicateGap,
} from './general-natal-geju-candidate-source-frontier.js';

export const GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_SCOPE =
  'canonical_month_order_hidden_stem_visible_exact_match_observation' as const;

const SLOT_ORDER = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];
const MONTH_PILLAR_UNRESOLVED_REASON =
  'general-natal-geju-observation-requires-resolved-month-pillar';
const MONTH_HIDDEN_STEMS_UNRESOLVED_REASON =
  'general-natal-geju-observation-requires-resolved-month-hidden-stems';
const FOUR_PILLAR_STEMS_UNRESOLVED_REASON =
  'general-natal-geju-observation-requires-resolved-four-pillar-stems';

export type GeneralNatalGejuMonthOrderTransparencyObservationStatus =
  | 'resolved_observation_only'
  | 'canonical_substrate_unavailable';

export interface GeneralNatalGejuMonthHiddenStemVisibilityObservation {
  readonly stem: HeavenlyStem;
  readonly visibleExactStemPositions: readonly PillarSlot[];
  readonly exactVisibilityObserved: boolean;
  readonly rankAssigned: false;
  readonly selectionEffectEstablished: false;
  readonly candidateEmitted: false;
}

export interface GeneralNatalGejuMonthOrderTransparencyObservationReport {
  readonly reportId: string;
  readonly reportVersion: typeof GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_VERSION;
  readonly sourceScope: typeof GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_SCOPE;
  readonly snapshotId: string;
  readonly status: GeneralNatalGejuMonthOrderTransparencyObservationStatus;
  readonly unavailableReasonCode?: string;
  readonly monthOrderHiddenStemMembershipEnumerationAuthorized: true;
  readonly visibleExactStemOccurrenceObservationAuthorized: true;
  readonly hiddenStemStorageOrderRankingAuthorized: false;
  readonly transparencySelectionPredicateAuthorized: false;
  readonly branchMeetingSelectionEffectAuthorized: false;
  readonly multipleCandidateRepresentationAuthorized: false;
  readonly candidateDerivationAuthorized: false;
  readonly establishmentPredicateAuthorized: false;
  readonly candidateFactsEmitted: false;
  readonly establishmentFactsEmitted: false;
  readonly monthHiddenStemObservations: readonly GeneralNatalGejuMonthHiddenStemVisibilityObservation[];
  readonly sourceIds: readonly string[];
  readonly sourceFactRefs: readonly string[];
  readonly openPredicateGaps: readonly GeneralNatalGejuCandidatePredicateGap[];
  readonly authorityBoundary: string;
  readonly notes: readonly string[];
}

const SOURCE_IDS = Object.freeze([
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_REFERENCES.monthOrderVariation.sourceId,
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_REFERENCES.mixedQiSelection.sourceId,
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_REFERENCES.mixedQiPluralSelection.sourceId,
]);

const SOURCE_FACT_REFS = Object.freeze([
  'pillars.month',
  'derivedFacts.hiddenStems.month',
  'pillars.year.stem',
  'pillars.month.stem',
  'pillars.day.stem',
  'pillars.hour.stem',
]);

function allPillarsResolved(snapshot: CanonicalSajuSnapshot): boolean {
  return SLOT_ORDER.every((slot) => snapshot.pillars[slot].status === 'resolved');
}

function visibleExactStemPositions(
  snapshot: CanonicalSajuSnapshot,
  stem: HeavenlyStem,
): readonly PillarSlot[] {
  return Object.freeze(
    SLOT_ORDER.filter((slot) => {
      const pillar = snapshot.pillars[slot];
      return pillar.status === 'resolved' && pillar.value.stem.value === stem;
    }),
  );
}

function observeHiddenStem(
  snapshot: CanonicalSajuSnapshot,
  stem: HeavenlyStem,
): GeneralNatalGejuMonthHiddenStemVisibilityObservation {
  const positions = visibleExactStemPositions(snapshot, stem);
  return Object.freeze({
    stem,
    visibleExactStemPositions: positions,
    exactVisibilityObserved: positions.length > 0,
    rankAssigned: false,
    selectionEffectEstablished: false,
    candidateEmitted: false,
  });
}

function unavailableReason(snapshot: CanonicalSajuSnapshot): string | undefined {
  if (snapshot.pillars.month.status !== 'resolved') return MONTH_PILLAR_UNRESOLVED_REASON;
  const monthHiddenStems = snapshot.derivedFacts.hiddenStems?.month;
  if (monthHiddenStems === undefined || monthHiddenStems.status !== 'resolved') {
    return MONTH_HIDDEN_STEMS_UNRESOLVED_REASON;
  }
  if (!allPillarsResolved(snapshot)) return FOUR_PILLAR_STEMS_UNRESOLVED_REASON;
  return undefined;
}

export const GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_VERSION,
        sourceScope: GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_SCOPE,
        sourceIds: SOURCE_IDS,
        sourceFactRefs: SOURCE_FACT_REFS,
        monthOrderHiddenStemMembershipEnumerationAuthorized: true,
        visibleExactStemOccurrenceObservationAuthorized: true,
        hiddenStemStorageOrderRankingAuthorized: false,
        transparencySelectionPredicateAuthorized: false,
        branchMeetingSelectionEffectAuthorized: false,
        multipleCandidateRepresentationAuthorized: false,
        candidateDerivationAuthorized: false,
        establishmentPredicateAuthorized: false,
        openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
      }),
    )
    .digest('hex');

export function buildGeneralNatalGejuMonthOrderTransparencyObservation(
  snapshot: CanonicalSajuSnapshot,
): GeneralNatalGejuMonthOrderTransparencyObservationReport {
  const reasonCode = unavailableReason(snapshot);
  const monthHiddenStemState = snapshot.derivedFacts.hiddenStems?.month;
  const observations =
    reasonCode === undefined && monthHiddenStemState?.status === 'resolved'
      ? Object.freeze(monthHiddenStemState.value.map((stem) => observeHiddenStem(snapshot, stem)))
      : Object.freeze([] as GeneralNatalGejuMonthHiddenStemVisibilityObservation[]);

  const material = {
    reportVersion: GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_VERSION,
    sourceScope: GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_SCOPE,
    snapshotId: snapshot.snapshotId,
    status:
      reasonCode === undefined
        ? ('resolved_observation_only' as const)
        : ('canonical_substrate_unavailable' as const),
    ...(reasonCode === undefined ? {} : { unavailableReasonCode: reasonCode }),
    monthOrderHiddenStemMembershipEnumerationAuthorized: true as const,
    visibleExactStemOccurrenceObservationAuthorized: true as const,
    hiddenStemStorageOrderRankingAuthorized: false as const,
    transparencySelectionPredicateAuthorized: false as const,
    branchMeetingSelectionEffectAuthorized: false as const,
    multipleCandidateRepresentationAuthorized: false as const,
    candidateDerivationAuthorized: false as const,
    establishmentPredicateAuthorized: false as const,
    candidateFactsEmitted: false as const,
    establishmentFactsEmitted: false as const,
    monthHiddenStemObservations: observations,
    sourceIds: SOURCE_IDS,
    sourceFactRefs: SOURCE_FACT_REFS,
    openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
    authorityBoundary:
      'This report authorizes only canonical month-order hidden-stem membership enumeration and exact visible-stem position observation. It does not assign hidden-stem rank, decide whether an exact match constitutes source-semantic 透干 selection, apply 會支 effects, choose or rank Gyeokguk candidates, or judge establishment success/failure.',
  };

  return Object.freeze({
    reportId: `general_natal_geju_month_order_transparency_observation_${createHash('sha256')
      .update(JSON.stringify(material))
      .digest('hex')
      .slice(0, 24)}`,
    ...material,
    notes: Object.freeze([
      'Month hidden stems are consumed from derivedFacts.hiddenStems.month; this module does not duplicate or redefine the canonical hidden-stem dataset.',
      'Hidden-stem array order remains storage-only and is never converted into main/secondary/residual rank, strength, or month-command duration.',
      'Exact visible-stem positions are raw canonical observations following the same observation-only pattern already used by branch-clash qualifier facts.',
      'Zero, one, or multiple exact visible positions are preserved as observations; plurality does not create precedence, winner, strength, or candidate multiplicity semantics.',
      'The five coarse Gyeokguk predicate-authority gaps remain open because this substrate observation does not authorize selection or establishment semantics.',
      'Product, narrative, LLM, API presentation, and Commerce layers must not promote these observations into GEJU_CANDIDATE or GEJU_ESTABLISHMENT_STATE facts.',
    ]),
  });
}
