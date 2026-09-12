import { createHash } from 'node:crypto';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  HeavenlyStem,
  PillarSlot,
} from '../contracts/calculation.js';
import type { SourceReference } from '../contracts/interpretation.js';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
  type GeneralNatalGejuCandidatePredicateGap,
} from './general-natal-geju-candidate-source-frontier.js';
import {
  buildGeneralNatalGejuMonthOrderTransparencyObservation,
  type GeneralNatalGejuMonthHiddenStemVisibilityObservation,
} from './general-natal-geju-month-order-transparency-observation.js';
import { isGeneralNatalGejuMixedQiMonthBranch } from './general-natal-geju-mixed-qi-transparency-source-boundary.js';

export const GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_EVIDENCE_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_SCOPE =
  'ziping_zhenquan_pingzhu_mixed_qi_transparency_slot_examples' as const;

export const GENERAL_NATAL_GEJU_SOURCE_OBSERVED_TRANSPARENCY_SLOTS = Object.freeze([
  'year',
  'month',
  'hour',
] as const satisfies readonly PillarSlot[]);

export type GeneralNatalGejuSourceObservedTransparencySlot =
  (typeof GENERAL_NATAL_GEJU_SOURCE_OBSERVED_TRANSPARENCY_SLOTS)[number];

export type GeneralNatalGejuTransparencySlotSourceEvidenceStatus =
  | 'resolved_partial_slot_evidence_only'
  | 'outside_selected_mixed_qi_scope'
  | 'canonical_substrate_unavailable';

export type GeneralNatalGejuHiddenStemTransparencyEvidenceStatus =
  | 'positive_source_scoped_transparency_observed'
  | 'day_slot_match_source_admissibility_unresolved'
  | 'no_visible_exact_match_observed';

export interface GeneralNatalGejuHiddenStemTransparencySlotEvidence {
  readonly stem: HeavenlyStem;
  readonly status: GeneralNatalGejuHiddenStemTransparencyEvidenceStatus;
  readonly sourceObservedAdmissibleExactMatchPositions: readonly GeneralNatalGejuSourceObservedTransparencySlot[];
  readonly daySlotExactMatchObserved: boolean;
  readonly positiveTransparencyExistenceOnObservedSlotsEstablished: boolean;
  readonly fullTransparencyPredicateEstablished: false;
  readonly selectionEffectEstablished: false;
  readonly candidateEmitted: false;
}

export interface GeneralNatalGejuTransparencySlotSourceEvidenceReport {
  readonly reportId: string;
  readonly reportVersion: typeof GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_EVIDENCE_VERSION;
  readonly sourceScope: typeof GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_SCOPE;
  readonly snapshotId: string;
  readonly status: GeneralNatalGejuTransparencySlotSourceEvidenceStatus;
  readonly unavailableReasonCode?: string;
  readonly monthBranch?: EarthlyBranch;
  readonly mixedQiSourceScopeApplies: boolean;
  readonly sourceObservedTransparencySlots: readonly GeneralNatalGejuSourceObservedTransparencySlot[];
  readonly sourceObservedSlotSetExhaustive: false;
  readonly daySlotAdmissibilityAuthorized: false;
  readonly positiveTransparencyExistenceOnObservedSlotsAuthorized: true;
  readonly fullTransparencyPredicateAuthorized: false;
  readonly transparencySelectionPredicateAuthorized: false;
  readonly branchMeetingSelectionEffectAuthorized: false;
  readonly multipleCandidateRepresentationAuthorized: false;
  readonly candidateDerivationAuthorized: false;
  readonly establishmentPredicateAuthorized: false;
  readonly candidateFactsEmitted: false;
  readonly establishmentFactsEmitted: false;
  readonly hiddenStemEvidence: readonly GeneralNatalGejuHiddenStemTransparencySlotEvidence[];
  readonly sourceIds: readonly string[];
  readonly openPredicateGaps: readonly GeneralNatalGejuCandidatePredicateGap[];
  readonly authorityBoundary: string;
  readonly notes: readonly string[];
}

const SOURCE_COMMON = {
  sourceType: 'classical_text',
  title: '子平真詮評注',
  author: '沈孝瞻',
  editor: '徐樂吾',
  language: 'zh-Hant',
  url: 'https://book.taiyi.me/%E5%91%BD/%E5%AD%90%E5%B9%B3%E6%8E%A8%E5%91%BD/%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%AF%A0%28%E4%B8%8A%29',
  accessedAt: '2026-09-12',
  provenanceTier: 'cross_reference',
  rights: {
    copyrightStatus: 'unknown',
    reusePolicy: 'metadata_only',
  },
} as const;

export const GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_REFERENCES = Object.freeze({
  yearHourPlacement: {
    ...SOURCE_COMMON,
    sourceId: 'SRC-GEJU-ZIPING-PINGZHU-TRANSPARENCY-YEAR-HOUR-PLACEMENT',
    locator: {
      section: '論雜氣如何取用',
      anchor: '甲生辰月，壬戊財印兩透，如財印分居年時',
    },
    notes:
      'Source-example evidence only: the commentary explicitly discusses two transparent stems distributed in year/hour positions. This establishes observed positive usage at year and hour, not an exhaustive admissible-slot set.',
  } satisfies SourceReference,
  monthPlacement: {
    ...SOURCE_COMMON,
    sourceId: 'SRC-GEJU-ZIPING-PINGZHU-TRANSPARENCY-MONTH-PLACEMENT',
    locator: {
      section: '論雜氣如何取用',
      anchor: '如甲生辰月，而為丙年壬辰月；蓋壬透自辰',
    },
    notes:
      'Source-example evidence only: the commentary names a 壬辰 month and states that 壬 is transparent from 辰. This establishes observed positive usage at the month stem position, not an exhaustive admissible-slot set.',
  } satisfies SourceReference,
});

const SOURCE_IDS = Object.freeze([
  GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_REFERENCES.yearHourPlacement.sourceId,
  GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_REFERENCES.monthPlacement.sourceId,
]);

function isSourceObservedTransparencySlot(
  slot: PillarSlot,
): slot is GeneralNatalGejuSourceObservedTransparencySlot {
  return slot === 'year' || slot === 'month' || slot === 'hour';
}

function evidenceFromObservation(
  observation: GeneralNatalGejuMonthHiddenStemVisibilityObservation,
): GeneralNatalGejuHiddenStemTransparencySlotEvidence {
  const sourceObservedAdmissibleExactMatchPositions = Object.freeze(
    observation.visibleExactStemPositions.filter(isSourceObservedTransparencySlot),
  );
  const daySlotExactMatchObserved = observation.visibleExactStemPositions.includes('day');
  const positiveTransparencyExistenceOnObservedSlotsEstablished =
    sourceObservedAdmissibleExactMatchPositions.length > 0;

  const status: GeneralNatalGejuHiddenStemTransparencyEvidenceStatus =
    positiveTransparencyExistenceOnObservedSlotsEstablished
      ? 'positive_source_scoped_transparency_observed'
      : daySlotExactMatchObserved
        ? 'day_slot_match_source_admissibility_unresolved'
        : 'no_visible_exact_match_observed';

  return Object.freeze({
    stem: observation.stem,
    status,
    sourceObservedAdmissibleExactMatchPositions,
    daySlotExactMatchObserved,
    positiveTransparencyExistenceOnObservedSlotsEstablished,
    fullTransparencyPredicateEstablished: false as const,
    selectionEffectEstablished: false as const,
    candidateEmitted: false as const,
  });
}

export const GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_EVIDENCE_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_EVIDENCE_VERSION,
        sourceScope: GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_SCOPE,
        sourceObservedTransparencySlots: GENERAL_NATAL_GEJU_SOURCE_OBSERVED_TRANSPARENCY_SLOTS,
        sourceIds: SOURCE_IDS,
        sourceObservedSlotSetExhaustive: false,
        daySlotAdmissibilityAuthorized: false,
        positiveTransparencyExistenceOnObservedSlotsAuthorized: true,
        fullTransparencyPredicateAuthorized: false,
        transparencySelectionPredicateAuthorized: false,
        branchMeetingSelectionEffectAuthorized: false,
        multipleCandidateRepresentationAuthorized: false,
        candidateDerivationAuthorized: false,
        establishmentPredicateAuthorized: false,
        openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
      }),
    )
    .digest('hex');

export function buildGeneralNatalGejuTransparencySlotSourceEvidence(
  snapshot: CanonicalSajuSnapshot,
): GeneralNatalGejuTransparencySlotSourceEvidenceReport {
  const observationReport = buildGeneralNatalGejuMonthOrderTransparencyObservation(snapshot);
  const monthPillar = snapshot.pillars.month;
  const monthBranch =
    monthPillar.status === 'resolved' ? monthPillar.value.branch.value : undefined;
  const mixedQiSourceScopeApplies =
    monthBranch !== undefined && isGeneralNatalGejuMixedQiMonthBranch(monthBranch);

  const status: GeneralNatalGejuTransparencySlotSourceEvidenceStatus =
    observationReport.status === 'canonical_substrate_unavailable'
      ? 'canonical_substrate_unavailable'
      : mixedQiSourceScopeApplies
        ? 'resolved_partial_slot_evidence_only'
        : 'outside_selected_mixed_qi_scope';

  const hiddenStemEvidence =
    status === 'resolved_partial_slot_evidence_only'
      ? Object.freeze(observationReport.monthHiddenStemObservations.map(evidenceFromObservation))
      : Object.freeze([] as GeneralNatalGejuHiddenStemTransparencySlotEvidence[]);

  const material = {
    reportVersion: GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_EVIDENCE_VERSION,
    sourceScope: GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_SCOPE,
    snapshotId: snapshot.snapshotId,
    status,
    ...(observationReport.unavailableReasonCode === undefined
      ? {}
      : { unavailableReasonCode: observationReport.unavailableReasonCode }),
    ...(monthBranch === undefined ? {} : { monthBranch }),
    mixedQiSourceScopeApplies,
    sourceObservedTransparencySlots: GENERAL_NATAL_GEJU_SOURCE_OBSERVED_TRANSPARENCY_SLOTS,
    sourceObservedSlotSetExhaustive: false as const,
    daySlotAdmissibilityAuthorized: false as const,
    positiveTransparencyExistenceOnObservedSlotsAuthorized: true as const,
    fullTransparencyPredicateAuthorized: false as const,
    transparencySelectionPredicateAuthorized: false as const,
    branchMeetingSelectionEffectAuthorized: false as const,
    multipleCandidateRepresentationAuthorized: false as const,
    candidateDerivationAuthorized: false as const,
    establishmentPredicateAuthorized: false as const,
    candidateFactsEmitted: false as const,
    establishmentFactsEmitted: false as const,
    hiddenStemEvidence,
    sourceIds: SOURCE_IDS,
    openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
    authorityBoundary:
      'Selected 子平真詮評注 examples establish positive transparency usage at year, month, and hour stem positions within the mixed-qi discussion. The selected corpus does not establish that these three positions are exhaustive and does not establish day-stem admissibility. Therefore an exact match at year/month/hour may be recorded as positive source-scoped transparency existence evidence, while the full transparency predicate, selection effect, candidate representation, and establishment verdict remain unauthorized.',
  };

  return Object.freeze({
    reportId: `general_natal_geju_transparency_slot_source_evidence_${createHash('sha256')
      .update(JSON.stringify(material))
      .digest('hex')
      .slice(0, 24)}`,
    ...material,
    notes: Object.freeze([
      'Year/hour positive slot evidence comes from the commentary phrase 財印兩透 followed by 財印分居年時.',
      'Month positive slot evidence comes from the commentary example 丙年壬辰月 together with 蓋壬透自辰.',
      'The evidence set {year, month, hour} is explicitly non-exhaustive; no negative inference about day-stem admissibility is permitted.',
      'A day-only exact match remains unresolved rather than being promoted to positive or negative source-semantic transparency.',
      'Positive source-scoped transparency existence does not establish 清, conflict, precedence, branch-meeting effects, candidate multiplicity, GEJU_CANDIDATE, or establishment state.',
      'All five coarse Gyeokguk predicate-authority gaps remain open and General Natal production/Commerce authority remains blocked.',
    ]),
  });
}
