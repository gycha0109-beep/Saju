import { createHash } from 'node:crypto';
import type { CanonicalSajuSnapshot, EarthlyBranch, HeavenlyStem } from '../contracts/calculation.js';
import {
  buildGeneralNatalGejuSelectionSignalObservation,
  type GeneralNatalGejuSelectionSignalObservation,
  type GeneralNatalGejuSelectionSignalKind,
} from './general-natal-geju-selection-signal-observation.js';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
  type GeneralNatalGejuCandidatePredicateGap,
} from './general-natal-geju-candidate-source-frontier.js';
import { GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES } from './general-natal-geju-co-use-affinity-source-evidence.js';

export const GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_SCOPE =
  'ziping_zhenquan_mixed_qi_direct_exemplar_semantic_use_identity' as const;

export type GeneralNatalGejuSourceSemanticUseKey =
  | 'source_yin'
  | 'source_guan'
  | 'source_shang_guan';

export type GeneralNatalGejuSourceSemanticUseLabel = '印' | '官' | '傷官';

export type GeneralNatalGejuSourceSemanticUseIdentityStatus =
  | 'resolved_source_direct_semantic_use_identity_observed'
  | 'resolved_no_direct_source_identity_exemplar'
  | 'outside_selected_mixed_qi_scope'
  | 'canonical_substrate_unavailable';

export type GeneralNatalGejuSourceSemanticUseRelation =
  | 'source_direct_same_semantic_use_across_signal_kinds'
  | 'source_direct_distinct_semantic_uses'
  | 'source_direct_many_signals_to_fewer_semantic_uses';

interface TransparencySignalRequirement {
  readonly signalKind: 'transparency';
  readonly stem: HeavenlyStem;
}

interface BranchMeetingSignalRequirement {
  readonly signalKind: 'branch_meeting';
  readonly sourceExampleId: string;
}

type SignalRequirement = TransparencySignalRequirement | BranchMeetingSignalRequirement;

interface SourceSemanticUseDefinition {
  readonly semanticUseKey: GeneralNatalGejuSourceSemanticUseKey;
  readonly sourceLabel: GeneralNatalGejuSourceSemanticUseLabel;
  readonly supportingSignals: readonly SignalRequirement[];
}

interface SourceDirectSemanticUseExemplar {
  readonly exemplarId: string;
  readonly dayMaster: HeavenlyStem;
  readonly monthBranch: EarthlyBranch;
  readonly requiredSignals: readonly SignalRequirement[];
  readonly sourceSemanticUses: readonly SourceSemanticUseDefinition[];
  readonly relationObservations: readonly GeneralNatalGejuSourceSemanticUseRelation[];
  readonly sourceId: string;
  readonly authorityBoundary: string;
}

export interface GeneralNatalGejuSourceSemanticUseIdentityObservation {
  readonly semanticUseId: string;
  readonly semanticUseKey: GeneralNatalGejuSourceSemanticUseKey;
  readonly sourceLabel: GeneralNatalGejuSourceSemanticUseLabel;
  readonly supportingSignalIds: readonly string[];
  readonly supportingSignalKinds: readonly GeneralNatalGejuSelectionSignalKind[];
  readonly sourceDirectIdentityObserved: true;
  readonly candidateIdentityEstablished: false;
  readonly candidateEmitted: false;
}

export interface GeneralNatalGejuSourceSemanticUseIdentityReport {
  readonly reportId: string;
  readonly reportVersion: typeof GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION;
  readonly sourceScope: typeof GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_SCOPE;
  readonly snapshotId: string;
  readonly status: GeneralNatalGejuSourceSemanticUseIdentityStatus;
  readonly unavailableReasonCode?: string;
  readonly upstreamSignalReportId: string;
  readonly governedSignalCount: number;
  readonly matchedDirectExemplarId?: string;
  readonly sourceSemanticUses: readonly GeneralNatalGejuSourceSemanticUseIdentityObservation[];
  readonly sourceSemanticUseCount: number;
  readonly relationObservations: readonly GeneralNatalGejuSourceSemanticUseRelation[];
  readonly sourceIds: readonly string[];
  readonly sourceDirectSemanticUseIdentityObservationAuthorized: true;
  readonly sourceDirectCrossSignalSameUseObservationAuthorized: true;
  readonly sourceDirectDistinctUseObservationAuthorized: true;
  readonly sourceDirectManySignalsToFewerUsesObservationAuthorized: true;
  readonly semanticUseSetExhaustiveAuthorized: false;
  readonly noDirectExemplarMeansNoSemanticUseAuthorized: false;
  readonly generalSignalToSemanticUseIdentityPredicateAuthorized: false;
  readonly semanticUseArrayOrderSemanticAuthorized: false;
  readonly signalSemanticDeduplicationIntoCandidateAuthorized: false;
  readonly candidateIdentityAuthorized: false;
  readonly multipleCandidateRepresentationAuthorized: false;
  readonly candidateDerivationAuthorized: false;
  readonly signalRankingAuthorized: false;
  readonly signalPrecedenceAuthorized: false;
  readonly signalStrengthAuthorized: false;
  readonly establishmentPredicateAuthorized: false;
  readonly candidateFactsEmitted: false;
  readonly establishmentFactsEmitted: false;
  readonly openPredicateGaps: readonly GeneralNatalGejuCandidatePredicateGap[];
  readonly authorityBoundary: string;
  readonly notes: readonly string[];
}

const SOURCE_IDS = Object.freeze([
  GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES.jiaChenGuiWaterAffinity.sourceId,
  GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES.renWeiJiWoodNoAffinity.sourceId,
  GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES.jiaXuXinDingFireNoAffinity.sourceId,
]);

export const GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_DIRECT_EXEMPLARS = Object.freeze([
  {
    exemplarId: 'JIA_CHEN_GUI_SHEN_ZI_ONE_YIN_USE',
    dayMaster: '갑',
    monthBranch: '진',
    requiredSignals: [
      { signalKind: 'transparency', stem: '계' },
      { signalKind: 'branch_meeting', sourceExampleId: 'CHEN_SHEN_ZI_MEETING' },
    ],
    sourceSemanticUses: [
      {
        semanticUseKey: 'source_yin',
        sourceLabel: '印',
        supportingSignals: [
          { signalKind: 'transparency', stem: '계' },
          { signalKind: 'branch_meeting', sourceExampleId: 'CHEN_SHEN_ZI_MEETING' },
        ],
      },
    ],
    relationObservations: ['source_direct_same_semantic_use_across_signal_kinds'],
    sourceId:
      GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES.jiaChenGuiWaterAffinity.sourceId,
    authorityBoundary:
      'Direct-source exemplar only: 癸 transparency is named 印, the 申子辰 meeting is used on the water/印 axis, and the combined example is named 印綬之格. This authorizes only an exact-exemplar same-source-use observation, not candidate identity or a generalized deduplication rule.',
  },
  {
    exemplarId: 'REN_WEI_JI_HAI_MAO_GUAN_AND_SHANG_GUAN_USES',
    dayMaster: '임',
    monthBranch: '미',
    requiredSignals: [
      { signalKind: 'transparency', stem: '기' },
      { signalKind: 'branch_meeting', sourceExampleId: 'WEI_HAI_MAO_MEETING' },
    ],
    sourceSemanticUses: [
      {
        semanticUseKey: 'source_guan',
        sourceLabel: '官',
        supportingSignals: [{ signalKind: 'transparency', stem: '기' }],
      },
      {
        semanticUseKey: 'source_shang_guan',
        sourceLabel: '傷官',
        supportingSignals: [
          { signalKind: 'branch_meeting', sourceExampleId: 'WEI_HAI_MAO_MEETING' },
        ],
      },
    ],
    relationObservations: ['source_direct_distinct_semantic_uses'],
    sourceId:
      GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES.renWeiJiWoodNoAffinity.sourceId,
    authorityBoundary:
      'Direct-source exemplar only: 己 transparency is named 官 while the 亥卯未 meeting is named 傷官之局. This authorizes only exact-exemplar distinct source-use identity observation, not a generalized candidate multiplicity contract.',
  },
  {
    exemplarId: 'JIA_XU_XIN_DING_YIN_WU_THREE_SIGNALS_TWO_USES',
    dayMaster: '갑',
    monthBranch: '술',
    requiredSignals: [
      { signalKind: 'transparency', stem: '신' },
      { signalKind: 'transparency', stem: '정' },
      { signalKind: 'branch_meeting', sourceExampleId: 'XU_YIN_WU_MEETING' },
    ],
    sourceSemanticUses: [
      {
        semanticUseKey: 'source_guan',
        sourceLabel: '官',
        supportingSignals: [{ signalKind: 'transparency', stem: '신' }],
      },
      {
        semanticUseKey: 'source_shang_guan',
        sourceLabel: '傷官',
        supportingSignals: [
          { signalKind: 'transparency', stem: '정' },
          { signalKind: 'branch_meeting', sourceExampleId: 'XU_YIN_WU_MEETING' },
        ],
      },
    ],
    relationObservations: [
      'source_direct_distinct_semantic_uses',
      'source_direct_same_semantic_use_across_signal_kinds',
      'source_direct_many_signals_to_fewer_semantic_uses',
    ],
    sourceId:
      GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES.jiaXuXinDingFireNoAffinity.sourceId,
    authorityBoundary:
      'Direct-source exemplar only: 辛 transparency is 官, 丁 transparency is 傷官, and the 寅午戌 meeting is also 傷官之局. Three governed signals therefore map to two directly source-named uses in this exemplar only. This does not authorize semantic deduplication into GEJU_CANDIDATE.',
  },
] as const satisfies readonly SourceDirectSemanticUseExemplar[]);

function signalMatchesRequirement(
  signal: GeneralNatalGejuSelectionSignalObservation,
  requirement: SignalRequirement,
): boolean {
  if (requirement.signalKind === 'transparency') {
    return signal.signalKind === 'transparency' && signal.stem === requirement.stem;
  }
  return (
    signal.signalKind === 'branch_meeting' &&
    signal.sourceExampleId === requirement.sourceExampleId
  );
}

function exactSignalSetMatches(
  signals: readonly GeneralNatalGejuSelectionSignalObservation[],
  requirements: readonly SignalRequirement[],
): boolean {
  if (signals.length !== requirements.length) return false;
  return requirements.every((requirement) =>
    signals.some((signal) => signalMatchesRequirement(signal, requirement)),
  );
}

function directExemplarFor(
  dayMaster: HeavenlyStem,
  monthBranch: EarthlyBranch,
  signals: readonly GeneralNatalGejuSelectionSignalObservation[],
): SourceDirectSemanticUseExemplar | undefined {
  return GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_DIRECT_EXEMPLARS.find(
    (exemplar) =>
      exemplar.dayMaster === dayMaster &&
      exemplar.monthBranch === monthBranch &&
      exactSignalSetMatches(signals, exemplar.requiredSignals),
  );
}

function semanticUseObservation(
  exemplar: SourceDirectSemanticUseExemplar,
  use: SourceSemanticUseDefinition,
  signals: readonly GeneralNatalGejuSelectionSignalObservation[],
): GeneralNatalGejuSourceSemanticUseIdentityObservation {
  const supportingSignals = signals.filter((signal) =>
    use.supportingSignals.some((requirement) => signalMatchesRequirement(signal, requirement)),
  );
  const identityMaterial = {
    exemplarId: exemplar.exemplarId,
    semanticUseKey: use.semanticUseKey,
    sourceLabel: use.sourceLabel,
    supportingSignalIds: supportingSignals.map((signal) => signal.signalId).sort(),
  };

  return Object.freeze({
    semanticUseId: `general_natal_geju_source_semantic_use_${createHash('sha256')
      .update(JSON.stringify(identityMaterial))
      .digest('hex')
      .slice(0, 20)}`,
    semanticUseKey: use.semanticUseKey,
    sourceLabel: use.sourceLabel,
    supportingSignalIds: Object.freeze(
      supportingSignals.map((signal) => signal.signalId).sort(),
    ),
    supportingSignalKinds: Object.freeze(
      Array.from(new Set(supportingSignals.map((signal) => signal.signalKind))).sort(),
    ) as readonly GeneralNatalGejuSelectionSignalKind[],
    sourceDirectIdentityObserved: true as const,
    candidateIdentityEstablished: false as const,
    candidateEmitted: false as const,
  });
}

export const GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_DEFINITION_HASH = createHash(
  'sha256',
)
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION,
      sourceScope: GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_SCOPE,
      exemplars: GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_DIRECT_EXEMPLARS,
      sourceDirectSemanticUseIdentityObservationAuthorized: true,
      sourceDirectCrossSignalSameUseObservationAuthorized: true,
      sourceDirectDistinctUseObservationAuthorized: true,
      sourceDirectManySignalsToFewerUsesObservationAuthorized: true,
      semanticUseSetExhaustiveAuthorized: false,
      noDirectExemplarMeansNoSemanticUseAuthorized: false,
      generalSignalToSemanticUseIdentityPredicateAuthorized: false,
      semanticUseArrayOrderSemanticAuthorized: false,
      signalSemanticDeduplicationIntoCandidateAuthorized: false,
      candidateIdentityAuthorized: false,
      multipleCandidateRepresentationAuthorized: false,
      candidateDerivationAuthorized: false,
      signalRankingAuthorized: false,
      signalPrecedenceAuthorized: false,
      signalStrengthAuthorized: false,
      establishmentPredicateAuthorized: false,
      openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
    }),
  )
  .digest('hex');

export function buildGeneralNatalGejuSourceSemanticUseIdentity(
  snapshot: CanonicalSajuSnapshot,
): GeneralNatalGejuSourceSemanticUseIdentityReport {
  const signalReport = buildGeneralNatalGejuSelectionSignalObservation(snapshot);
  const dayMaster =
    snapshot.derivedFacts.dayMaster.status === 'resolved'
      ? snapshot.derivedFacts.dayMaster.value.value
      : undefined;
  const monthBranch =
    snapshot.pillars.month.status === 'resolved'
      ? snapshot.pillars.month.value.branch.value
      : undefined;

  let status: GeneralNatalGejuSourceSemanticUseIdentityStatus;
  let unavailableReasonCode: string | undefined;
  let matchedExemplar: SourceDirectSemanticUseExemplar | undefined;
  let sourceSemanticUses: readonly GeneralNatalGejuSourceSemanticUseIdentityObservation[] =
    Object.freeze([]);
  let relationObservations: readonly GeneralNatalGejuSourceSemanticUseRelation[] = Object.freeze([]);

  if (signalReport.status === 'canonical_substrate_unavailable') {
    status = 'canonical_substrate_unavailable';
    unavailableReasonCode =
      signalReport.unavailableReasonCode ??
      'general-natal-geju-source-semantic-use-requires-resolved-upstream-signal-substrate';
  } else if (signalReport.status === 'outside_selected_mixed_qi_scope') {
    status = 'outside_selected_mixed_qi_scope';
  } else if (dayMaster === undefined || monthBranch === undefined) {
    status = 'canonical_substrate_unavailable';
    unavailableReasonCode =
      dayMaster === undefined
        ? 'general-natal-geju-source-semantic-use-requires-resolved-day-master'
        : 'general-natal-geju-source-semantic-use-requires-resolved-month-pillar';
  } else {
    matchedExemplar = directExemplarFor(dayMaster, monthBranch, signalReport.signals);
    if (matchedExemplar === undefined) {
      status = 'resolved_no_direct_source_identity_exemplar';
    } else {
      status = 'resolved_source_direct_semantic_use_identity_observed';
      sourceSemanticUses = Object.freeze(
        matchedExemplar.sourceSemanticUses
          .map((use) => semanticUseObservation(matchedExemplar!, use, signalReport.signals))
          .sort((left, right) => left.semanticUseId.localeCompare(right.semanticUseId)),
      );
      relationObservations = Object.freeze([...matchedExemplar.relationObservations].sort());
    }
  }

  const sourceIds = Object.freeze(
    matchedExemplar === undefined ? [...SOURCE_IDS].sort() : [matchedExemplar.sourceId],
  );

  const material = {
    reportVersion: GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION,
    sourceScope: GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_SCOPE,
    snapshotId: snapshot.snapshotId,
    status,
    ...(unavailableReasonCode === undefined ? {} : { unavailableReasonCode }),
    upstreamSignalReportId: signalReport.reportId,
    governedSignalCount: signalReport.signalCount,
    ...(matchedExemplar === undefined ? {} : { matchedDirectExemplarId: matchedExemplar.exemplarId }),
    sourceSemanticUses,
    sourceSemanticUseCount: sourceSemanticUses.length,
    relationObservations,
    sourceIds,
    sourceDirectSemanticUseIdentityObservationAuthorized: true as const,
    sourceDirectCrossSignalSameUseObservationAuthorized: true as const,
    sourceDirectDistinctUseObservationAuthorized: true as const,
    sourceDirectManySignalsToFewerUsesObservationAuthorized: true as const,
    semanticUseSetExhaustiveAuthorized: false as const,
    noDirectExemplarMeansNoSemanticUseAuthorized: false as const,
    generalSignalToSemanticUseIdentityPredicateAuthorized: false as const,
    semanticUseArrayOrderSemanticAuthorized: false as const,
    signalSemanticDeduplicationIntoCandidateAuthorized: false as const,
    candidateIdentityAuthorized: false as const,
    multipleCandidateRepresentationAuthorized: false as const,
    candidateDerivationAuthorized: false as const,
    signalRankingAuthorized: false as const,
    signalPrecedenceAuthorized: false as const,
    signalStrengthAuthorized: false as const,
    establishmentPredicateAuthorized: false as const,
    candidateFactsEmitted: false as const,
    establishmentFactsEmitted: false as const,
    openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
    authorityBoundary:
      'This research report observes source-named semantic-use identity only for exact direct exemplars from the selected mixed-qi passage. It demonstrates that governed signal count and directly source-named use count are not interchangeable: different signal mechanisms can refer to one source use, while other exemplars contain distinct source uses. This is not a generalized signal-to-use identity predicate and must not be promoted into GEJU_CANDIDATE identity, semantic deduplication, candidate count, ranking, precedence, strength, or establishment.',
  };

  return Object.freeze({
    reportId: `general_natal_geju_source_semantic_use_identity_${createHash('sha256')
      .update(JSON.stringify(material))
      .digest('hex')
      .slice(0, 24)}`,
    ...material,
    notes: Object.freeze([
      '甲辰 with 癸 transparency plus 申子辰 meeting is a direct source example where two governed signal mechanisms are named on one 印 use axis.',
      '壬未 with 己 transparency plus 亥卯未 meeting is a direct source example where 官 and 傷官 remain distinct source-named uses.',
      '甲戌 with 辛/丁 transparencies plus 寅午戌 meeting is a direct source example where three governed signals map to two source-named uses because 丁 transparency and the meeting both sit on the 傷官 axis.',
      'Exact exemplar matching requires the governed signal set to match the direct-source example exactly; extra governed signals prevent generalization from that exemplar.',
      'No direct exemplar match is not negative evidence for semantic use or candidate existence because this source-direct exemplar set is explicitly non-exhaustive.',
      'Source semantic use identity observation is not GEJU_CANDIDATE identity. All five coarse Gyeokguk authority gaps remain open, General Natal production authority remains blocked, and Commerce remains on hold.',
    ]),
  });
}
