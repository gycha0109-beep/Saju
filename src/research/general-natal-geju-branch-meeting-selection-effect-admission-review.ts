import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
  type GeneralNatalGejuCandidatePredicateGap,
} from './general-natal-geju-candidate-source-frontier.js';
import {
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_VERSION,
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_REFERENCES,
} from './general-natal-geju-branch-meeting-source-evidence.js';
import {
  GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EVIDENCE_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EVIDENCE_VERSION,
  GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES,
} from './general-natal-geju-co-use-affinity-source-evidence.js';
import {
  GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_DIRECT_EXEMPLARS,
  GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION,
} from './general-natal-geju-source-semantic-use-identity.js';

export const GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_SCOPE =
  'ziping_zhenquan_branch_meeting_selection_effect_admission_review' as const;
export const GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_DECISION =
  'DIRECT_SOURCE_MEETING_RELEVANCE_OBSERVED_GENERALIZED_POST_INTERACTION_EFFECT_PREDICATE_NOT_ESTABLISHED' as const;

export type GeneralNatalGejuBranchMeetingSelectionEffectAdmissionEvidenceKey =
  | 'source_aligned_meeting_result_wording'
  | 'source_plural_co_use_and_affinity_wording'
  | 'source_direct_meeting_use_identity';

export interface GeneralNatalGejuBranchMeetingSelectionEffectAdmissionEvidence {
  readonly key: GeneralNatalGejuBranchMeetingSelectionEffectAdmissionEvidenceKey;
  readonly sourceIds: readonly string[];
  readonly directSourceSemanticRelevanceObserved: true;
  readonly canonicalTransformationEstablished: false;
  readonly generalizedPostInteractionEffectAuthorized: false;
  readonly authorityBoundary: string;
}

export interface GeneralNatalGejuBranchMeetingSelectionEffectAdmissionReviewReport {
  readonly reviewId: string;
  readonly reviewVersion: typeof GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_VERSION;
  readonly sourceScope: typeof GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_SCOPE;
  readonly decision: typeof GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_DECISION;
  readonly upstreamBranchMeetingEvidenceVersion: typeof GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_VERSION;
  readonly upstreamBranchMeetingEvidenceDefinitionHash: string;
  readonly upstreamCoUseAffinityEvidenceVersion: typeof GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EVIDENCE_VERSION;
  readonly upstreamCoUseAffinityEvidenceDefinitionHash: string;
  readonly upstreamSemanticUseIdentityVersion: typeof GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION;
  readonly upstreamSemanticUseIdentityDefinitionHash: string;
  readonly sourceAlignedBranchMeetingStructuralEvidenceAuthorized: true;
  readonly directSourceMeetingResultWordingObserved: true;
  readonly sourcePluralCoUseBoundaryObserved: true;
  readonly directSourceAffinityExemplarEvidenceObserved: true;
  readonly directSourceMeetingUseIdentityObserved: true;
  readonly canonicalTransformationEstablished: false;
  readonly postInteractionEffectiveBureau: 'unresolved';
  readonly clashDamageSettlementAuthorized: false;
  readonly competingInteractionSettlementAuthorized: false;
  readonly generalizedMeetingSurvivalPredicateAuthorized: false;
  readonly branchMeetingSelectionEffectAuthorized: false;
  readonly candidateDerivationAuthorized: false;
  readonly establishmentPredicateAuthorized: false;
  readonly candidateFactsEmitted: false;
  readonly establishmentFactsEmitted: false;
  readonly evidence: readonly GeneralNatalGejuBranchMeetingSelectionEffectAdmissionEvidence[];
  readonly sourceIds: readonly string[];
  readonly openPredicateGaps: readonly GeneralNatalGejuCandidatePredicateGap[];
  readonly authorityBoundary: string;
  readonly notes: readonly string[];
}

const BRANCH_MEETING_SOURCE_IDS = Object.freeze([
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_REFERENCES.chenWaterMeeting.sourceId,
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_REFERENCES.chouMetalMeeting.sourceId,
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_REFERENCES.weiWoodMeeting.sourceId,
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_REFERENCES.xuFireMeeting.sourceId,
]);

const CO_USE_AFFINITY_SOURCE_IDS = Object.freeze([
  GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES.coUseRule.sourceId,
  GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES.affinityDefinition.sourceId,
  GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES.jiaChenGuiWaterAffinity.sourceId,
  GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES.renWeiJiWoodNoAffinity.sourceId,
  GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES.jiaXuXinDingFireNoAffinity.sourceId,
]);

const SEMANTIC_USE_SOURCE_IDS = Object.freeze(
  Array.from(
    new Set(GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_DIRECT_EXEMPLARS.map((item) => item.sourceId)),
  ).sort(),
);

const EVIDENCE = Object.freeze([
  {
    key: 'source_aligned_meeting_result_wording',
    sourceIds: BRANCH_MEETING_SOURCE_IDS,
    directSourceSemanticRelevanceObserved: true,
    canonicalTransformationEstablished: false,
    generalizedPostInteractionEffectAuthorized: false,
    authorityBoundary:
      'The selected mixed-qi examples directly use 會局 / 成局 wording and name water-印, 金局, or 傷官之局 outcomes. Merged #447 therefore authorizes exact source-aligned meeting evidence, but the canonical relation remains structuralMatchOnly=true with transformationEstablished=false. The exemplar wording does not define a chart-general predicate that proves survival after clashes, damage, or competing interactions.',
  },
  {
    key: 'source_plural_co_use_and_affinity_wording',
    sourceIds: CO_USE_AFFINITY_SOURCE_IDS,
    directSourceSemanticRelevanceObserved: true,
    canonicalTransformationEstablished: false,
    generalizedPostInteractionEffectAuthorized: false,
    authorityBoundary:
      'Merged #451 proves that transparency and meeting may be used together and records exact direct 有情/無情 exemplars. Those classifications demonstrate that interaction quality matters; they do not provide a generalized clash/damage settlement or effective-bureau survival predicate for arbitrary charts.',
  },
  {
    key: 'source_direct_meeting_use_identity',
    sourceIds: SEMANTIC_USE_SOURCE_IDS,
    directSourceSemanticRelevanceObserved: true,
    canonicalTransformationEstablished: false,
    generalizedPostInteractionEffectAuthorized: false,
    authorityBoundary:
      'Merged #469 records exact direct source-semantic use identities carried by governed transparency and branch-meeting signals. Exact source-use identity is an observation layer only and does not prove that a structural meeting remains post-interaction effective or that its source use is a canonical candidate.',
  },
] as const satisfies readonly GeneralNatalGejuBranchMeetingSelectionEffectAdmissionEvidence[]);

const SOURCE_IDS = Object.freeze(
  Array.from(new Set(EVIDENCE.flatMap((item) => item.sourceIds))).sort(),
);

export const GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_VERSION,
        sourceScope: GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_SCOPE,
        decision: GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_DECISION,
        upstreamBranchMeetingEvidenceVersion:
          GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_VERSION,
        upstreamBranchMeetingEvidenceDefinitionHash:
          GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_DEFINITION_HASH,
        upstreamCoUseAffinityEvidenceVersion:
          GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EVIDENCE_VERSION,
        upstreamCoUseAffinityEvidenceDefinitionHash:
          GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EVIDENCE_DEFINITION_HASH,
        upstreamSemanticUseIdentityVersion:
          GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION,
        upstreamSemanticUseIdentityDefinitionHash:
          GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_DEFINITION_HASH,
        evidence: EVIDENCE,
        sourceIds: SOURCE_IDS,
        sourceAlignedBranchMeetingStructuralEvidenceAuthorized: true,
        directSourceMeetingResultWordingObserved: true,
        sourcePluralCoUseBoundaryObserved: true,
        directSourceAffinityExemplarEvidenceObserved: true,
        directSourceMeetingUseIdentityObserved: true,
        canonicalTransformationEstablished: false,
        postInteractionEffectiveBureau: 'unresolved',
        clashDamageSettlementAuthorized: false,
        competingInteractionSettlementAuthorized: false,
        generalizedMeetingSurvivalPredicateAuthorized: false,
        branchMeetingSelectionEffectAuthorized: false,
        candidateDerivationAuthorized: false,
        establishmentPredicateAuthorized: false,
        openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
      }),
    )
    .digest('hex');

export function buildGeneralNatalGejuBranchMeetingSelectionEffectAdmissionReview(): GeneralNatalGejuBranchMeetingSelectionEffectAdmissionReviewReport {
  const material = {
    reviewVersion: GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_VERSION,
    sourceScope: GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_SCOPE,
    decision: GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_DECISION,
    upstreamBranchMeetingEvidenceVersion:
      GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_VERSION,
    upstreamBranchMeetingEvidenceDefinitionHash:
      GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_DEFINITION_HASH,
    upstreamCoUseAffinityEvidenceVersion:
      GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EVIDENCE_VERSION,
    upstreamCoUseAffinityEvidenceDefinitionHash:
      GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EVIDENCE_DEFINITION_HASH,
    upstreamSemanticUseIdentityVersion: GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION,
    upstreamSemanticUseIdentityDefinitionHash:
      GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_DEFINITION_HASH,
    sourceAlignedBranchMeetingStructuralEvidenceAuthorized: true as const,
    directSourceMeetingResultWordingObserved: true as const,
    sourcePluralCoUseBoundaryObserved: true as const,
    directSourceAffinityExemplarEvidenceObserved: true as const,
    directSourceMeetingUseIdentityObserved: true as const,
    canonicalTransformationEstablished: false as const,
    postInteractionEffectiveBureau: 'unresolved' as const,
    clashDamageSettlementAuthorized: false as const,
    competingInteractionSettlementAuthorized: false as const,
    generalizedMeetingSurvivalPredicateAuthorized: false as const,
    branchMeetingSelectionEffectAuthorized: false as const,
    candidateDerivationAuthorized: false as const,
    establishmentPredicateAuthorized: false as const,
    candidateFactsEmitted: false as const,
    establishmentFactsEmitted: false as const,
    evidence: EVIDENCE,
    sourceIds: SOURCE_IDS,
    openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
    authorityBoundary:
      'The governed source corpus proves that source-aligned branch meetings are semantically relevant, may coexist with transparency, receive exact direct affinity classifications, and can carry exact source-named semantic uses. It does not define a generalized canonical rule that upgrades a structural branch_three_combination into transformationEstablished=true or proves that the meeting survives every clash, damage, and competing interaction. Therefore post-interaction effective bureau remains unresolved and generalized branch-meeting selection effect remains unauthorized.',
  };

  return Object.freeze({
    reviewId: `general_natal_geju_branch_meeting_selection_effect_admission_review_${createHash(
      'sha256',
    )
      .update(JSON.stringify(material))
      .digest('hex')
      .slice(0, 24)}`,
    ...material,
    notes: Object.freeze([
      '會局 / 成局 wording is preserved as direct source exemplar semantics; it is not retyped as canonical transformation authority.',
      'Merged #447 remains the canonical source-aligned structural-meeting evidence bridge and continues to require transformationEstablished=false.',
      'Merged #451 proves coexistence and exact affinity/disaffinity examples, but does not generalize interaction quality or branch-meeting survival.',
      'Merged #469 proves exact source-semantic use identity, not post-interaction effective-bureau or candidate identity.',
      'No absence of a known clash is treated as proof of effectiveness, and no structural membership is treated as interaction settlement.',
      'All five coarse Gyeokguk gaps remain open; General Natal production authority, P0-CM-03, NEXT_PRODUCTION_SKU, and Commerce remain blocked.',
    ]),
  });
}
