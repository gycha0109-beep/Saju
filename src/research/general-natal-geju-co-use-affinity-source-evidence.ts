import { createHash } from 'node:crypto';
import type { CanonicalSajuSnapshot, EarthlyBranch, HeavenlyStem } from '../contracts/calculation.js';
import type { SourceReference } from '../contracts/interpretation.js';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
  type GeneralNatalGejuCandidatePredicateGap,
} from './general-natal-geju-candidate-source-frontier.js';
import {
  buildGeneralNatalGejuBranchMeetingSourceEvidence,
  type GeneralNatalGejuBranchMeetingSourceEvidenceReport,
} from './general-natal-geju-branch-meeting-source-evidence.js';
import {
  buildGeneralNatalGejuTransparencySlotSourceEvidence,
  type GeneralNatalGejuTransparencySlotSourceEvidenceReport,
} from './general-natal-geju-transparency-slot-source-evidence.js';

export const GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EVIDENCE_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_SCOPE =
  'ziping_zhenquan_mixed_qi_transparency_meeting_co_use_affinity_examples' as const;

export type GeneralNatalGejuSourceAffinityClassification =
  | 'source_direct_having_affinity'
  | 'source_direct_lacking_affinity';

export type GeneralNatalGejuCoUseAffinitySourceEvidenceStatus =
  | 'resolved_source_co_use_with_direct_exemplar_quality_evidence'
  | 'resolved_source_co_use_observed_quality_unsettled'
  | 'resolved_no_joint_transparency_meeting_evidence'
  | 'outside_selected_mixed_qi_scope'
  | 'canonical_substrate_unavailable';

export interface GeneralNatalGejuCoUseAffinitySourceExemplar {
  readonly exemplarId: string;
  readonly dayMaster: HeavenlyStem;
  readonly monthBranch: EarthlyBranch;
  readonly requiredTransparencyStems: readonly HeavenlyStem[];
  readonly requiredMeetingExampleId: string;
  readonly affinityClassification: GeneralNatalGejuSourceAffinityClassification;
  readonly sourceId: string;
  readonly authorityBoundary: string;
}

export interface GeneralNatalGejuDirectAffinityExemplarEvidence {
  readonly exemplarId: string;
  readonly dayMaster: HeavenlyStem;
  readonly monthBranch: EarthlyBranch;
  readonly requiredTransparencyStems: readonly HeavenlyStem[];
  readonly observedPositiveTransparencyStems: readonly HeavenlyStem[];
  readonly meetingExampleId: string;
  readonly affinityClassification: GeneralNatalGejuSourceAffinityClassification;
  readonly sourceDirectClassificationObserved: true;
  readonly generalizedAffinityPredicateEstablished: false;
  readonly branchMeetingSelectionEffectEstablished: false;
  readonly candidateEmitted: false;
  readonly establishmentVerdictEmitted: false;
}

export interface GeneralNatalGejuCoUseAffinitySourceEvidenceReport {
  readonly reportId: string;
  readonly reportVersion: typeof GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EVIDENCE_VERSION;
  readonly sourceScope: typeof GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_SCOPE;
  readonly snapshotId: string;
  readonly status: GeneralNatalGejuCoUseAffinitySourceEvidenceStatus;
  readonly unavailableReasonCode?: string;
  readonly monthBranch?: EarthlyBranch;
  readonly dayMaster?: HeavenlyStem;
  readonly mixedQiSourceScopeApplies: boolean;
  readonly upstreamTransparencyReportId: string;
  readonly upstreamBranchMeetingReportId: string;
  readonly positiveTransparencyStems: readonly HeavenlyStem[];
  readonly sourceAlignedMeetingExampleIds: readonly string[];
  readonly transparencyAndMeetingCoUseObserved: boolean;
  readonly transparencyAndMeetingCoUseSourceBoundaryAuthorized: true;
  readonly sourcePluralCoUseBoundaryObserved: true;
  readonly singleWinnerRequirementAuthorized: false;
  readonly directSourceExemplarAffinityEvidenceAuthorized: true;
  readonly generalizedAffinityPredicateAuthorized: false;
  readonly generalizedDisaffinityPredicateAuthorized: false;
  readonly transparencySelectionPredicateAuthorized: false;
  readonly branchMeetingSelectionEffectAuthorized: false;
  readonly postInteractionEffectiveBureauAuthorized: false;
  readonly multipleCandidateRepresentationAuthorized: false;
  readonly candidateDerivationAuthorized: false;
  readonly establishmentPredicateAuthorized: false;
  readonly candidateFactsEmitted: false;
  readonly establishmentFactsEmitted: false;
  readonly directExemplarEvidence: readonly GeneralNatalGejuDirectAffinityExemplarEvidence[];
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
  url: 'https://ctext.org/wiki.pl?chapter=974137&if=gb',
  accessedAt: '2026-09-12',
  provenanceTier: 'cross_reference',
  rights: {
    copyrightStatus: 'unknown',
    reusePolicy: 'metadata_only',
  },
} as const;

export const GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES = Object.freeze({
  coUseRule: {
    ...SOURCE_COMMON,
    sourceId: 'SRC-GEJU-ZIPING-ZHENQUAN-MIXED-QI-TRANSPARENCY-MEETING-CO-USE',
    locator: {
      section: '論雜氣如何取用',
      anchor: '一透則一用，兼透則兼用，透而又會，則透與會並用',
    },
    notes:
      'The selected source explicitly permits plural/coexisting use: one transparency gives one use, multiple transparencies may coexist, and transparency plus branch meeting are used together. This does not define a production candidate representation or establishment verdict.',
  } satisfies SourceReference,
  affinityDefinition: {
    ...SOURCE_COMMON,
    sourceId: 'SRC-GEJU-ZIPING-ZHENQUAN-MIXED-QI-AFFINITY-DEFINITION',
    locator: {
      section: '論雜氣如何取用',
      anchor: '其合而有情者吉，其合而無情者則不吉。何謂有情？順而相成者是也',
    },
    notes:
      'The source distinguishes compatible/cooperative combinations from incompatible/opposed combinations. This frontier binds only direct source exemplars and does not generalize 順而相成 into a canonical predicate.',
  } satisfies SourceReference,
  jiaChenGuiWaterAffinity: {
    ...SOURCE_COMMON,
    sourceId: 'SRC-GEJU-ZIPING-ZHENQUAN-MIXED-QI-JIA-CHEN-GUI-SHEN-ZI-AFFINITY',
    locator: {
      section: '論雜氣如何取用',
      anchor: '甲生辰月，透癸為印，而又會子會申以成局，印綬之格也，清而不雜，是透干與會支，合而有情也',
    },
    notes:
      'Direct source exemplar only: 甲 day master, 辰 month, 癸 transparency, and the 申子辰 meeting are explicitly classified as 透干與會支合而有情. No generalized establishment predicate is inferred.',
  } satisfies SourceReference,
  renWeiJiWoodNoAffinity: {
    ...SOURCE_COMMON,
    sourceId: 'SRC-GEJU-ZIPING-ZHENQUAN-MIXED-QI-REN-WEI-JI-HAI-MAO-NO-AFFINITY',
    locator: {
      section: '論雜氣如何取用',
      anchor: '壬生未月，透己為官，而地支會亥卯以成傷官之局，是透官與會支，合而無情者也',
    },
    notes:
      'Direct source exemplar only: 壬 day master, 未 month, 己 transparency, and the 亥卯未 meeting are explicitly classified as 透官與會支合而無情. No generalized conflict predicate is inferred.',
  } satisfies SourceReference,
  jiaXuXinDingFireNoAffinity: {
    ...SOURCE_COMMON,
    sourceId: 'SRC-GEJU-ZIPING-ZHENQUAN-MIXED-QI-JIA-XU-XIN-DING-YIN-WU-NO-AFFINITY',
    locator: {
      section: '論雜氣如何取用',
      anchor: '甲生戌月，透辛為官，而又透丁以傷官，月支又會寅會午以成傷官之局，是兩干並透，與會支合而無情也',
    },
    notes:
      'Direct source exemplar only: 甲 day master, 戌 month, 辛 and 丁 transparencies, and the 寅午戌 meeting are explicitly classified as multiple transparencies plus meeting combining without affinity. No generalized precedence or establishment rule is inferred.',
  } satisfies SourceReference,
});

export const GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EXEMPLARS = Object.freeze([
  {
    exemplarId: 'JIA_CHEN_GUI_SHEN_ZI_HAVING_AFFINITY',
    dayMaster: '갑',
    monthBranch: '진',
    requiredTransparencyStems: ['계'],
    requiredMeetingExampleId: 'CHEN_SHEN_ZI_MEETING',
    affinityClassification: 'source_direct_having_affinity',
    sourceId:
      GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES.jiaChenGuiWaterAffinity.sourceId,
    authorityBoundary:
      'Exact direct-source exemplar evidence only; it does not authorize a generalized 印綬 establishment or success predicate.',
  },
  {
    exemplarId: 'REN_WEI_JI_HAI_MAO_LACKING_AFFINITY',
    dayMaster: '임',
    monthBranch: '미',
    requiredTransparencyStems: ['기'],
    requiredMeetingExampleId: 'WEI_HAI_MAO_MEETING',
    affinityClassification: 'source_direct_lacking_affinity',
    sourceId:
      GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES.renWeiJiWoodNoAffinity.sourceId,
    authorityBoundary:
      'Exact direct-source exemplar evidence only; it does not authorize a generalized 官/傷官 conflict or failure predicate.',
  },
  {
    exemplarId: 'JIA_XU_XIN_DING_YIN_WU_LACKING_AFFINITY',
    dayMaster: '갑',
    monthBranch: '술',
    requiredTransparencyStems: ['신', '정'],
    requiredMeetingExampleId: 'XU_YIN_WU_MEETING',
    affinityClassification: 'source_direct_lacking_affinity',
    sourceId:
      GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES.jiaXuXinDingFireNoAffinity.sourceId,
    authorityBoundary:
      'Exact direct-source exemplar evidence only; it does not authorize a generalized multi-transparency precedence, conflict, or failure predicate.',
  },
] as const satisfies readonly GeneralNatalGejuCoUseAffinitySourceExemplar[]);

const SOURCE_IDS = Object.freeze([
  GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES.coUseRule.sourceId,
  GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES.affinityDefinition.sourceId,
  ...GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EXEMPLARS.map((exemplar) => exemplar.sourceId),
]);

function positiveTransparencyStems(
  report: GeneralNatalGejuTransparencySlotSourceEvidenceReport,
): readonly HeavenlyStem[] {
  return Object.freeze(
    report.hiddenStemEvidence
      .filter((item) => item.positiveTransparencyExistenceOnObservedSlotsEstablished)
      .map((item) => item.stem),
  );
}

function meetingExampleIds(
  report: GeneralNatalGejuBranchMeetingSourceEvidenceReport,
): readonly string[] {
  return Object.freeze(report.meetingEvidence.map((item) => item.exampleId));
}

function exactExemplarEvidence(
  dayMaster: HeavenlyStem | undefined,
  monthBranch: EarthlyBranch | undefined,
  observedTransparencyStems: readonly HeavenlyStem[],
  observedMeetingExampleIds: readonly string[],
): readonly GeneralNatalGejuDirectAffinityExemplarEvidence[] {
  if (dayMaster === undefined || monthBranch === undefined) return Object.freeze([]);

  return Object.freeze(
    GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EXEMPLARS.filter(
      (exemplar) =>
        exemplar.dayMaster === dayMaster &&
        exemplar.monthBranch === monthBranch &&
        exemplar.requiredTransparencyStems.every((stem) =>
          observedTransparencyStems.includes(stem),
        ) &&
        observedMeetingExampleIds.includes(exemplar.requiredMeetingExampleId),
    ).map((exemplar) => ({
      exemplarId: exemplar.exemplarId,
      dayMaster: exemplar.dayMaster,
      monthBranch: exemplar.monthBranch,
      requiredTransparencyStems: exemplar.requiredTransparencyStems,
      observedPositiveTransparencyStems: Object.freeze(
        observedTransparencyStems.filter((stem) => exemplar.requiredTransparencyStems.includes(stem)),
      ),
      meetingExampleId: exemplar.requiredMeetingExampleId,
      affinityClassification: exemplar.affinityClassification,
      sourceDirectClassificationObserved: true as const,
      generalizedAffinityPredicateEstablished: false as const,
      branchMeetingSelectionEffectEstablished: false as const,
      candidateEmitted: false as const,
      establishmentVerdictEmitted: false as const,
    })),
  );
}

export const GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EVIDENCE_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EVIDENCE_VERSION,
        sourceScope: GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_SCOPE,
        sourceIds: SOURCE_IDS,
        exemplars: GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EXEMPLARS,
        transparencyAndMeetingCoUseSourceBoundaryAuthorized: true,
        sourcePluralCoUseBoundaryObserved: true,
        singleWinnerRequirementAuthorized: false,
        directSourceExemplarAffinityEvidenceAuthorized: true,
        generalizedAffinityPredicateAuthorized: false,
        generalizedDisaffinityPredicateAuthorized: false,
        transparencySelectionPredicateAuthorized: false,
        branchMeetingSelectionEffectAuthorized: false,
        postInteractionEffectiveBureauAuthorized: false,
        multipleCandidateRepresentationAuthorized: false,
        candidateDerivationAuthorized: false,
        establishmentPredicateAuthorized: false,
        openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
      }),
    )
    .digest('hex');

export function buildGeneralNatalGejuCoUseAffinitySourceEvidence(
  snapshot: CanonicalSajuSnapshot,
): GeneralNatalGejuCoUseAffinitySourceEvidenceReport {
  const transparencyReport = buildGeneralNatalGejuTransparencySlotSourceEvidence(snapshot);
  const branchMeetingReport = buildGeneralNatalGejuBranchMeetingSourceEvidence(snapshot);
  const dayMaster =
    snapshot.derivedFacts.dayMaster.status === 'resolved'
      ? snapshot.derivedFacts.dayMaster.value.value
      : undefined;
  const monthBranch =
    snapshot.pillars.month.status === 'resolved'
      ? snapshot.pillars.month.value.branch.value
      : undefined;
  const mixedQiSourceScopeApplies =
    transparencyReport.mixedQiSourceScopeApplies && branchMeetingReport.mixedQiSourceScopeApplies;
  const observedTransparencyStems = positiveTransparencyStems(transparencyReport);
  const observedMeetingExampleIds = meetingExampleIds(branchMeetingReport);
  const transparencyAndMeetingCoUseObserved =
    observedTransparencyStems.length > 0 && observedMeetingExampleIds.length > 0;
  const directExemplarEvidence = exactExemplarEvidence(
    dayMaster,
    monthBranch,
    observedTransparencyStems,
    observedMeetingExampleIds,
  );

  let status: GeneralNatalGejuCoUseAffinitySourceEvidenceStatus;
  let unavailableReasonCode: string | undefined;

  if (
    transparencyReport.status === 'canonical_substrate_unavailable' ||
    branchMeetingReport.status === 'canonical_substrate_unavailable'
  ) {
    status = 'canonical_substrate_unavailable';
    unavailableReasonCode =
      transparencyReport.unavailableReasonCode ??
      branchMeetingReport.unavailableReasonCode ??
      'general-natal-geju-co-use-requires-resolved-upstream-substrate';
  } else if (!mixedQiSourceScopeApplies) {
    status = 'outside_selected_mixed_qi_scope';
  } else if (!transparencyAndMeetingCoUseObserved) {
    status = 'resolved_no_joint_transparency_meeting_evidence';
  } else if (directExemplarEvidence.length > 0) {
    status = 'resolved_source_co_use_with_direct_exemplar_quality_evidence';
  } else {
    status = 'resolved_source_co_use_observed_quality_unsettled';
  }

  const material = {
    reportVersion: GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EVIDENCE_VERSION,
    sourceScope: GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_SCOPE,
    snapshotId: snapshot.snapshotId,
    status,
    ...(unavailableReasonCode === undefined ? {} : { unavailableReasonCode }),
    ...(monthBranch === undefined ? {} : { monthBranch }),
    ...(dayMaster === undefined ? {} : { dayMaster }),
    mixedQiSourceScopeApplies,
    upstreamTransparencyReportId: transparencyReport.reportId,
    upstreamBranchMeetingReportId: branchMeetingReport.reportId,
    positiveTransparencyStems: observedTransparencyStems,
    sourceAlignedMeetingExampleIds: observedMeetingExampleIds,
    transparencyAndMeetingCoUseObserved,
    transparencyAndMeetingCoUseSourceBoundaryAuthorized: true as const,
    sourcePluralCoUseBoundaryObserved: true as const,
    singleWinnerRequirementAuthorized: false as const,
    directSourceExemplarAffinityEvidenceAuthorized: true as const,
    generalizedAffinityPredicateAuthorized: false as const,
    generalizedDisaffinityPredicateAuthorized: false as const,
    transparencySelectionPredicateAuthorized: false as const,
    branchMeetingSelectionEffectAuthorized: false as const,
    postInteractionEffectiveBureauAuthorized: false as const,
    multipleCandidateRepresentationAuthorized: false as const,
    candidateDerivationAuthorized: false as const,
    establishmentPredicateAuthorized: false as const,
    candidateFactsEmitted: false as const,
    establishmentFactsEmitted: false as const,
    directExemplarEvidence,
    sourceIds: SOURCE_IDS,
    openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
    authorityBoundary:
      'The selected mixed-qi source explicitly allows transparency and branch meeting to be used together and directly labels specific combinations as 有情 or 無情. This report may therefore record source-scoped co-use evidence and exact direct-exemplar affinity classifications when canonical evidence matches those examples. It does not generalize 順而相成/逆而相背 into a canonical affinity predicate, does not settle post-interaction branch-meeting effectiveness, does not define a production candidate multiplicity contract, and does not emit GEJU_CANDIDATE or establishment state.',
  };

  return Object.freeze({
    reportId: `general_natal_geju_co_use_affinity_source_evidence_${createHash('sha256')
      .update(JSON.stringify(material))
      .digest('hex')
      .slice(0, 24)}`,
    ...material,
    notes: Object.freeze([
      '透而又會，則透與會並用 is treated as source authority for coexistence evidence, not as authority to collapse multiple source axes into one winner.',
      'Direct 有情/無情 classifications are emitted only for exact source exemplars encoded in this research frontier.',
      'The 甲辰/癸/申子 exemplar is direct source evidence of having affinity; no generalized 印綬 establishment predicate is created.',
      'The 壬未/己/亥卯 and 甲戌/辛丁/寅午 exemplars are direct source evidence of lacking affinity; no generalized 官傷 conflict or failure predicate is created.',
      'The selected source also contains additional examples whose canonical generalization requires separate review; they are intentionally not inferred here.',
      'All five coarse Gyeokguk predicate-authority gaps remain open. General Natal production authority and Commerce remain blocked.',
    ]),
  });
}
