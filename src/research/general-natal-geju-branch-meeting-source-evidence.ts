import { createHash } from 'node:crypto';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  PillarSlot,
  StructuralRelationCandidate,
} from '../contracts/calculation.js';
import type { SourceReference } from '../contracts/interpretation.js';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
  type GeneralNatalGejuCandidatePredicateGap,
} from './general-natal-geju-candidate-source-frontier.js';
import { isGeneralNatalGejuMixedQiMonthBranch } from './general-natal-geju-mixed-qi-transparency-source-boundary.js';

export const GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_SCOPE =
  'ziping_zhenquan_mixed_qi_branch_meeting_examples' as const;

export type GeneralNatalGejuMixedQiMonthBranch = '진' | '술' | '축' | '미';

export interface GeneralNatalGejuBranchMeetingSourceExample {
  readonly exampleId: string;
  readonly monthBranch: GeneralNatalGejuMixedQiMonthBranch;
  readonly requiredBranches: readonly [EarthlyBranch, EarthlyBranch, EarthlyBranch];
  readonly sourceId: string;
  readonly authorityBoundary: string;
}

export type GeneralNatalGejuBranchMeetingSourceEvidenceStatus =
  | 'resolved_source_aligned_full_three_meeting_observed_effect_unresolved'
  | 'resolved_no_source_aligned_full_three_meeting_observed'
  | 'outside_selected_mixed_qi_scope'
  | 'canonical_substrate_unavailable';

export interface GeneralNatalGejuBranchMeetingEvidenceItem {
  readonly relationId: string;
  readonly exampleId: string;
  readonly monthBranch: GeneralNatalGejuMixedQiMonthBranch;
  readonly requiredSourceExampleBranches: readonly [EarthlyBranch, EarthlyBranch, EarthlyBranch];
  readonly observedParticipantPositions: readonly PillarSlot[];
  readonly observedParticipantBranches: readonly EarthlyBranch[];
  readonly relationStructuralMatchOnly: true;
  readonly relationTransformationEstablished: false;
  readonly sourceAlignedFullThreeMeetingObserved: true;
  readonly sourceMeetingUseAxisEvidenceEstablished: true;
  readonly branchMeetingSelectionEffectEstablished: false;
  readonly postInteractionEffectiveBureauEstablished: false;
  readonly candidateEmitted: false;
}

export interface GeneralNatalGejuBranchMeetingSourceEvidenceReport {
  readonly reportId: string;
  readonly reportVersion: typeof GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_VERSION;
  readonly sourceScope: typeof GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_SCOPE;
  readonly snapshotId: string;
  readonly status: GeneralNatalGejuBranchMeetingSourceEvidenceStatus;
  readonly unavailableReasonCode?: string;
  readonly monthBranch?: EarthlyBranch;
  readonly mixedQiSourceScopeApplies: boolean;
  readonly structuralMatchToSourceMeetingEvidenceBridgeAuthorized: true;
  readonly sourceMeetingUseAxisEvidenceAuthorized: true;
  readonly transformationPredicateAuthorized: false;
  readonly postInteractionEffectiveBureauAuthorized: false;
  readonly branchMeetingSelectionEffectAuthorized: false;
  readonly multipleCandidateRepresentationAuthorized: false;
  readonly candidateDerivationAuthorized: false;
  readonly establishmentPredicateAuthorized: false;
  readonly candidateFactsEmitted: false;
  readonly establishmentFactsEmitted: false;
  readonly meetingEvidence: readonly GeneralNatalGejuBranchMeetingEvidenceItem[];
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

export const GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_REFERENCES = Object.freeze({
  chenWaterMeeting: {
    ...SOURCE_COMMON,
    sourceId: 'SRC-GEJU-ZIPING-ZHENQUAN-MIXED-QI-CHEN-SHEN-ZI-MEETING',
    locator: {
      section: '論雜氣如何取用',
      anchor: '何謂會支？如甲生辰月，逢申與子會局，則用水印是也',
    },
    notes:
      'Direct selected-source example: 辰 month together with 申 and 子 is explicitly described as 會局 and used on the water/印 axis. This does not by itself establish post-interaction effectiveness or a canonical GEJU_CANDIDATE.',
  } satisfies SourceReference,
  chouMetalMeeting: {
    ...SOURCE_COMMON,
    sourceId: 'SRC-GEJU-ZIPING-ZHENQUAN-MIXED-QI-CHOU-SI-YOU-MEETING',
    locator: {
      section: '論雜氣如何取用',
      anchor: '又如甲生丑月，辛透為官，或巳酉會成金局',
    },
    notes:
      'Selected-source example binds 丑 month with the 巳/酉 meeting surface and explicitly names a 金局. This frontier requires the canonical full-three structural relation before recording source-aligned meeting evidence.',
  } satisfies SourceReference,
  weiWoodMeeting: {
    ...SOURCE_COMMON,
    sourceId: 'SRC-GEJU-ZIPING-ZHENQUAN-MIXED-QI-WEI-HAI-MAO-MEETING',
    locator: {
      section: '論雜氣如何取用',
      anchor: '如壬生未月，透己為官，而地支會亥卯以成傷官之局',
    },
    notes:
      'Direct selected-source example: 未 month together with 亥 and 卯 is explicitly described as forming the branch-meeting pattern used in the example. No post-interaction or establishment verdict is imported.',
  } satisfies SourceReference,
  xuFireMeeting: {
    ...SOURCE_COMMON,
    sourceId: 'SRC-GEJU-ZIPING-ZHENQUAN-MIXED-QI-XU-YIN-WU-MEETING',
    locator: {
      section: '論雜氣如何取用',
      anchor: '如甲生戌月，透辛為官，而又透丁以傷官，月支又會寅會午以成傷官之局',
    },
    notes:
      'Direct selected-source example: 戌 month together with 寅 and 午 is explicitly described as a branch-meeting formation in the mixed-qi discussion. The later auspicious/inauspicious settlement remains a separate stage.',
  } satisfies SourceReference,
});

export const GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EXAMPLES = Object.freeze([
  {
    exampleId: 'CHEN_SHEN_ZI_MEETING',
    monthBranch: '진',
    requiredBranches: ['진', '신', '자'],
    sourceId: GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_REFERENCES.chenWaterMeeting.sourceId,
    authorityBoundary:
      '辰 month with 申 and 子 is source-observed 會支 evidence only; structural membership does not establish post-interaction effectiveness.',
  },
  {
    exampleId: 'CHOU_SI_YOU_MEETING',
    monthBranch: '축',
    requiredBranches: ['축', '사', '유'],
    sourceId: GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_REFERENCES.chouMetalMeeting.sourceId,
    authorityBoundary:
      '丑 month is matched only against a canonical full 巳酉丑 structural relation; the source example is not used to relax full-three structural membership.',
  },
  {
    exampleId: 'WEI_HAI_MAO_MEETING',
    monthBranch: '미',
    requiredBranches: ['미', '해', '묘'],
    sourceId: GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_REFERENCES.weiWoodMeeting.sourceId,
    authorityBoundary:
      '未 month with 亥 and 卯 is source-observed 會支 evidence only; useful/harmful settlement is not emitted.',
  },
  {
    exampleId: 'XU_YIN_WU_MEETING',
    monthBranch: '술',
    requiredBranches: ['술', '인', '오'],
    sourceId: GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_REFERENCES.xuFireMeeting.sourceId,
    authorityBoundary:
      '戌 month with 寅 and 午 is source-observed 會支 evidence only; establishment success/failure remains unauthorized.',
  },
] as const satisfies readonly GeneralNatalGejuBranchMeetingSourceExample[]);

const SOURCE_IDS = Object.freeze(
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EXAMPLES.map((example) => example.sourceId),
);

function sourceExampleForMonthBranch(
  monthBranch: EarthlyBranch,
): GeneralNatalGejuBranchMeetingSourceExample | undefined {
  return GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EXAMPLES.find(
    (example) => example.monthBranch === monthBranch,
  );
}

function relationMatchesExample(
  relation: StructuralRelationCandidate,
  example: GeneralNatalGejuBranchMeetingSourceExample,
): boolean {
  if (relation.kind !== 'branch_three_combination') return false;
  if (!relation.semantics.structuralMatchOnly || relation.semantics.transformationEstablished) {
    return false;
  }

  const branchParticipants = relation.participants.filter(
    (participant) => participant.component === 'branch',
  );
  if (branchParticipants.length !== 3) return false;

  const monthParticipantMatches = branchParticipants.some(
    (participant) => participant.pillar === 'month' && participant.value === example.monthBranch,
  );
  if (!monthParticipantMatches) return false;

  return example.requiredBranches.every((requiredBranch) =>
    branchParticipants.some((participant) => participant.value === requiredBranch),
  );
}

function evidenceFromRelation(
  relation: StructuralRelationCandidate,
  example: GeneralNatalGejuBranchMeetingSourceExample,
): GeneralNatalGejuBranchMeetingEvidenceItem {
  const branchParticipants = relation.participants.filter(
    (participant) => participant.component === 'branch',
  );

  return Object.freeze({
    relationId: relation.relationId,
    exampleId: example.exampleId,
    monthBranch: example.monthBranch,
    requiredSourceExampleBranches: example.requiredBranches,
    observedParticipantPositions: Object.freeze(
      branchParticipants.map((participant) => participant.pillar),
    ),
    observedParticipantBranches: Object.freeze(
      branchParticipants.map((participant) => participant.value as EarthlyBranch),
    ),
    relationStructuralMatchOnly: true as const,
    relationTransformationEstablished: false as const,
    sourceAlignedFullThreeMeetingObserved: true as const,
    sourceMeetingUseAxisEvidenceEstablished: true as const,
    branchMeetingSelectionEffectEstablished: false as const,
    postInteractionEffectiveBureauEstablished: false as const,
    candidateEmitted: false as const,
  });
}

export const GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_DEFINITION_HASH = createHash(
  'sha256',
)
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_VERSION,
      sourceScope: GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_SCOPE,
      sourceExamples: GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EXAMPLES,
      structuralMatchToSourceMeetingEvidenceBridgeAuthorized: true,
      sourceMeetingUseAxisEvidenceAuthorized: true,
      transformationPredicateAuthorized: false,
      postInteractionEffectiveBureauAuthorized: false,
      branchMeetingSelectionEffectAuthorized: false,
      multipleCandidateRepresentationAuthorized: false,
      candidateDerivationAuthorized: false,
      establishmentPredicateAuthorized: false,
      openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
    }),
  )
  .digest('hex');

export function buildGeneralNatalGejuBranchMeetingSourceEvidence(
  snapshot: CanonicalSajuSnapshot,
): GeneralNatalGejuBranchMeetingSourceEvidenceReport {
  const monthPillar = snapshot.pillars.month;
  const structuralRelations = snapshot.derivedFacts.structuralRelations;

  const monthBranch =
    monthPillar.status === 'resolved' ? monthPillar.value.branch.value : undefined;
  const mixedQiSourceScopeApplies =
    monthBranch !== undefined && isGeneralNatalGejuMixedQiMonthBranch(monthBranch);

  let status: GeneralNatalGejuBranchMeetingSourceEvidenceStatus;
  let unavailableReasonCode: string | undefined;
  let meetingEvidence: readonly GeneralNatalGejuBranchMeetingEvidenceItem[] = Object.freeze([]);

  if (monthBranch === undefined) {
    status = 'canonical_substrate_unavailable';
    unavailableReasonCode = 'general-natal-geju-branch-meeting-requires-resolved-month-pillar';
  } else if (!mixedQiSourceScopeApplies) {
    status = 'outside_selected_mixed_qi_scope';
  } else if (structuralRelations === undefined || structuralRelations.status !== 'resolved') {
    status = 'canonical_substrate_unavailable';
    unavailableReasonCode =
      'general-natal-geju-branch-meeting-requires-resolved-structural-relations';
  } else {
    const example = sourceExampleForMonthBranch(monthBranch);
    const matches =
      example === undefined
        ? []
        : structuralRelations.value
            .filter((relation) => relationMatchesExample(relation, example))
            .map((relation) => evidenceFromRelation(relation, example));

    meetingEvidence = Object.freeze(matches);
    status =
      meetingEvidence.length > 0
        ? 'resolved_source_aligned_full_three_meeting_observed_effect_unresolved'
        : 'resolved_no_source_aligned_full_three_meeting_observed';
  }

  const material = {
    reportVersion: GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_VERSION,
    sourceScope: GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_SCOPE,
    snapshotId: snapshot.snapshotId,
    status,
    ...(unavailableReasonCode === undefined ? {} : { unavailableReasonCode }),
    ...(monthBranch === undefined ? {} : { monthBranch }),
    mixedQiSourceScopeApplies,
    structuralMatchToSourceMeetingEvidenceBridgeAuthorized: true as const,
    sourceMeetingUseAxisEvidenceAuthorized: true as const,
    transformationPredicateAuthorized: false as const,
    postInteractionEffectiveBureauAuthorized: false as const,
    branchMeetingSelectionEffectAuthorized: false as const,
    multipleCandidateRepresentationAuthorized: false as const,
    candidateDerivationAuthorized: false as const,
    establishmentPredicateAuthorized: false as const,
    candidateFactsEmitted: false as const,
    establishmentFactsEmitted: false as const,
    meetingEvidence,
    sourceIds: SOURCE_IDS,
    openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
    authorityBoundary:
      'The selected mixed-qi source directly gives 會支 examples for the four tomb/storehouse month branches. A resolved canonical full-three branch_three_combination structural match may therefore be bridged to source-aligned branch-meeting evidence when its month branch and three participants match the selected source example. The canonical relation remains structural-only with transformationEstablished=false, so no post-interaction effective-bureau, branch-meeting selection effect, GEJU_CANDIDATE, or establishment verdict is authorized.',
  };

  return Object.freeze({
    reportId: `general_natal_geju_branch_meeting_source_evidence_${createHash('sha256')
      .update(JSON.stringify(material))
      .digest('hex')
      .slice(0, 24)}`,
    ...material,
    notes: Object.freeze([
      'The bridge is intentionally exact: the canonical month branch must be one of 辰戌丑未 and must participate in the source-aligned full-three branch set for that month.',
      'The 丑 example is not used to relax the canonical full-three requirement; only an already resolved 巳酉丑 branch_three_combination relation can produce this evidence.',
      'Canonical structuralRelations remain structural matches only and explicitly do not establish transformation.',
      'Source-aligned 會支 evidence establishes that the meeting axis is present in the selected source context, not that all competing interactions have been settled.',
      'Clash/damage, post-interaction effectiveness, 清/濁, 有情/無情, precedence, plurality, candidate representation, and establishment remain separate unresolved authorities.',
      'All five coarse Gyeokguk predicate-authority gaps remain open and General Natal production/Commerce authority remains blocked.',
    ]),
  });
}
