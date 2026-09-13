import { createHash } from 'node:crypto';
import type { SourceReference } from '../contracts/interpretation.js';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION,
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_REFERENCES,
  type GeneralNatalGejuCandidatePredicateGap,
} from './general-natal-geju-candidate-source-frontier.js';
import {
  GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_VERSION,
} from './general-natal-geju-month-order-transparency-observation.js';

export const GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_SCOPE =
  'ziping_zhenquan_month_order_hidden_stem_selection_admission_review' as const;
export const GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_DECISION =
  'DIRECT_SOURCE_EXACT_YIN_PRIMARY_AND_TRANSPARENCY_SUBSTITUTION_OBSERVED_GENERALIZED_ALL_BRANCH_SELECTOR_NOT_ESTABLISHED' as const;

export type GeneralNatalGejuMonthOrderHiddenStemSelectionAdmissionEvidenceKey =
  | 'inherited_month_order_plurality'
  | 'inherited_hidden_stem_membership_observation'
  | 'direct_yin_primary_role'
  | 'direct_yin_transparency_substitution';

export interface GeneralNatalGejuMonthOrderHiddenStemSelectionAdmissionEvidence {
  readonly key: GeneralNatalGejuMonthOrderHiddenStemSelectionAdmissionEvidenceKey;
  readonly sourceId: string;
  readonly provenanceTier: SourceReference['provenanceTier'];
  readonly observationEstablished: true;
  readonly exactYinScoped: boolean;
  readonly hiddenStemStorageOrderRankingAuthorized: false;
  readonly allBranchPrimaryHiddenStemMappingAuthorized: false;
  readonly generalizedSelectionPredicateAuthorized: false;
  readonly authorityBoundary: string;
}

export interface GeneralNatalGejuMonthOrderHiddenStemSelectionAdmissionReviewReport {
  readonly reviewId: string;
  readonly reviewVersion: typeof GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_VERSION;
  readonly sourceScope: typeof GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_SCOPE;
  readonly decision: typeof GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_DECISION;
  readonly upstreamCandidateFrontierVersion: typeof GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION;
  readonly upstreamCandidateFrontierDefinitionHash: string;
  readonly upstreamMonthOrderObservationVersion: typeof GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_VERSION;
  readonly upstreamMonthOrderObservationDefinitionHash: string;
  readonly monthOrderHiddenStemMembershipEnumerationAuthorized: true;
  readonly directSourceMonthOrderPluralityObserved: true;
  readonly directSourceYinExactPrimaryRoleObserved: true;
  readonly directSourceYinExactTransparencySubstitutionObserved: true;
  readonly directSourceYinRoleGeneralizedBeyondYin: false;
  readonly hiddenStemStorageOrderRankingAuthorized: false;
  readonly mainSecondaryResidualMappingAuthorized: false;
  readonly monthCommandDurationAuthorized: false;
  readonly allBranchPrimaryHiddenStemMapping: 'unresolved';
  readonly generalizedMonthOrderHiddenStemSelectionPredicateAuthorized: false;
  readonly transparencySelectionPredicateAuthorized: false;
  readonly branchMeetingSelectionEffectAuthorized: false;
  readonly multipleCandidateRepresentationAuthorized: false;
  readonly candidateDerivationAuthorized: false;
  readonly establishmentPredicateAuthorized: false;
  readonly candidateFactsEmitted: false;
  readonly establishmentFactsEmitted: false;
  readonly evidence: readonly GeneralNatalGejuMonthOrderHiddenStemSelectionAdmissionEvidence[];
  readonly sourceIds: readonly string[];
  readonly openPredicateGaps: readonly GeneralNatalGejuCandidatePredicateGap[];
  readonly authorityBoundary: string;
  readonly notes: readonly string[];
}

const CLASSICAL_SOURCE_COMMON = {
  sourceType: 'classical_text',
  title: '子平真詮評注',
  author: '沈孝瞻',
  editor: '徐樂吾',
  language: 'zh-Hant',
  url: 'https://ctext.org/wiki.pl?chapter=974137&if=en',
  accessedAt: '2026-09-13',
  provenanceTier: 'cross_reference',
  rights: {
    copyrightStatus: 'unknown',
    reusePolicy: 'metadata_only',
  },
} as const;

export const GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_SOURCE_REFERENCES =
  Object.freeze({
    yinPrimaryRole: {
      ...CLASSICAL_SOURCE_COMMON,
      sourceId: 'SRC-GEJU-ZIPING-PINGZHU-YIN-MONTH-EXACT-PRIMARY-ROLE',
      locator: {
        section: '論用神變化',
        anchor: '即以寅論，甲為本主，如郡之有府，丙其長生，如郡之有同知，戊亦長生，如郡之有通判',
      },
      notes:
        'Direct exact-example evidence: within the 寅 discussion, 甲 is explicitly called 本主 while 丙 and 戊 are separately described through 長生 analogies. This exact wording is not an all-branch hidden-stem ranking table.',
    } satisfies SourceReference,
    yinTransparencySubstitution: {
      ...CLASSICAL_SOURCE_COMMON,
      sourceId: 'SRC-GEJU-ZIPING-PINGZHU-YIN-MONTH-TRANSPARENCY-SUBSTITUTION',
      locator: {
        section: '論用神變化',
        anchor: '假使寅月為提，不透甲而透丙，則如知府不臨郡，而同知得以作主',
      },
      notes:
        'Direct exact-example evidence: when the 寅-month 本主 甲 is not transparent while 丙 is transparent, the source says 丙 may 作主. This does not establish a generalized selector for every month branch, every hidden stem, or every competing signal configuration.',
    } satisfies SourceReference,
  });

const EVIDENCE = Object.freeze([
  {
    key: 'inherited_month_order_plurality',
    sourceId: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_REFERENCES.monthOrderVariation.sourceId,
    provenanceTier:
      GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_REFERENCES.monthOrderVariation.provenanceTier,
    observationEstablished: true,
    exactYinScoped: false,
    hiddenStemStorageOrderRankingAuthorized: false,
    allBranchPrimaryHiddenStemMappingAuthorized: false,
    generalizedSelectionPredicateAuthorized: false,
    authorityBoundary:
      'Merged #436 records that multiple month-order contents can change selection. It deliberately does not map repository hidden-stem array order to semantic rank or provide an all-branch selection predicate.',
  },
  {
    key: 'inherited_hidden_stem_membership_observation',
    sourceId: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_REFERENCES.monthOrderVariation.sourceId,
    provenanceTier:
      GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_REFERENCES.monthOrderVariation.provenanceTier,
    observationEstablished: true,
    exactYinScoped: false,
    hiddenStemStorageOrderRankingAuthorized: false,
    allBranchPrimaryHiddenStemMappingAuthorized: false,
    generalizedSelectionPredicateAuthorized: false,
    authorityBoundary:
      'Merged #441 authorizes enumeration of canonical derivedFacts.hiddenStems.month membership only. Membership and storage position remain non-semantic for rank, strength, command duration, and selection.',
  },
  {
    key: 'direct_yin_primary_role',
    sourceId:
      GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_SOURCE_REFERENCES
        .yinPrimaryRole.sourceId,
    provenanceTier:
      GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_SOURCE_REFERENCES
        .yinPrimaryRole.provenanceTier,
    observationEstablished: true,
    exactYinScoped: true,
    hiddenStemStorageOrderRankingAuthorized: false,
    allBranchPrimaryHiddenStemMappingAuthorized: false,
    generalizedSelectionPredicateAuthorized: false,
    authorityBoundary:
      '甲為本主 is admitted exactly for the source\'s 寅 example. It cannot be converted into hiddenStems.month[0] = 本主 or extrapolated into a twelve-branch primary-hidden-stem mapping without direct governed authority.',
  },
  {
    key: 'direct_yin_transparency_substitution',
    sourceId:
      GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_SOURCE_REFERENCES
        .yinTransparencySubstitution.sourceId,
    provenanceTier:
      GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_SOURCE_REFERENCES
        .yinTransparencySubstitution.provenanceTier,
    observationEstablished: true,
    exactYinScoped: true,
    hiddenStemStorageOrderRankingAuthorized: false,
    allBranchPrimaryHiddenStemMappingAuthorized: false,
    generalizedSelectionPredicateAuthorized: false,
    authorityBoundary:
      'The exact 寅 example authorizes observing that 丙 may 作主 when 甲 is not transparent and 丙 is transparent. It does not settle all other branches, multiple transparent hidden stems, branch meetings, conflict precedence, or candidate establishment.',
  },
] as const satisfies readonly GeneralNatalGejuMonthOrderHiddenStemSelectionAdmissionEvidence[]);

const SOURCE_IDS = Object.freeze(Array.from(new Set(EVIDENCE.map((item) => item.sourceId))).sort());

export const GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_VERSION,
        sourceScope: GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_SCOPE,
        decision: GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_DECISION,
        upstreamCandidateFrontierVersion: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION,
        upstreamCandidateFrontierDefinitionHash:
          GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_DEFINITION_HASH,
        upstreamMonthOrderObservationVersion:
          GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_VERSION,
        upstreamMonthOrderObservationDefinitionHash:
          GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_DEFINITION_HASH,
        evidence: EVIDENCE,
        sourceIds: SOURCE_IDS,
        directSourceYinRoleGeneralizedBeyondYin: false,
        hiddenStemStorageOrderRankingAuthorized: false,
        mainSecondaryResidualMappingAuthorized: false,
        monthCommandDurationAuthorized: false,
        allBranchPrimaryHiddenStemMapping: 'unresolved',
        generalizedMonthOrderHiddenStemSelectionPredicateAuthorized: false,
        transparencySelectionPredicateAuthorized: false,
        branchMeetingSelectionEffectAuthorized: false,
        multipleCandidateRepresentationAuthorized: false,
        candidateDerivationAuthorized: false,
        establishmentPredicateAuthorized: false,
        openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
      }),
    )
    .digest('hex');

export function buildGeneralNatalGejuMonthOrderHiddenStemSelectionAdmissionReview(): GeneralNatalGejuMonthOrderHiddenStemSelectionAdmissionReviewReport {
  const material = {
    reviewVersion: GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_VERSION,
    sourceScope: GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_SCOPE,
    decision: GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_DECISION,
    upstreamCandidateFrontierVersion: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION,
    upstreamCandidateFrontierDefinitionHash:
      GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_DEFINITION_HASH,
    upstreamMonthOrderObservationVersion:
      GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_VERSION,
    upstreamMonthOrderObservationDefinitionHash:
      GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_DEFINITION_HASH,
    monthOrderHiddenStemMembershipEnumerationAuthorized: true as const,
    directSourceMonthOrderPluralityObserved: true as const,
    directSourceYinExactPrimaryRoleObserved: true as const,
    directSourceYinExactTransparencySubstitutionObserved: true as const,
    directSourceYinRoleGeneralizedBeyondYin: false as const,
    hiddenStemStorageOrderRankingAuthorized: false as const,
    mainSecondaryResidualMappingAuthorized: false as const,
    monthCommandDurationAuthorized: false as const,
    allBranchPrimaryHiddenStemMapping: 'unresolved' as const,
    generalizedMonthOrderHiddenStemSelectionPredicateAuthorized: false as const,
    transparencySelectionPredicateAuthorized: false as const,
    branchMeetingSelectionEffectAuthorized: false as const,
    multipleCandidateRepresentationAuthorized: false as const,
    candidateDerivationAuthorized: false as const,
    establishmentPredicateAuthorized: false as const,
    candidateFactsEmitted: false as const,
    establishmentFactsEmitted: false as const,
    evidence: EVIDENCE,
    sourceIds: SOURCE_IDS,
    openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
    authorityBoundary:
      'The governed source directly establishes month-order plurality and an exact 寅 hierarchy/substitution example: 甲 is called 本主, and when 甲 is not transparent while 丙 is transparent, 丙 may 作主. Merged canonical substrate exposes hidden-stem membership but no semantic rank. The current direct corpus does not provide a governed primary-hidden-stem mapping and selection procedure for all twelve month branches or all competing transparency/meeting configurations. Therefore the exact 寅 evidence is retained without converting storage order, practitioner convention, or analogy into a generalized month-order hidden-stem selector.',
  };

  return Object.freeze({
    reviewId: `general_natal_geju_month_order_hidden_stem_selection_admission_review_${createHash(
      'sha256',
    )
      .update(JSON.stringify(material))
      .digest('hex')
      .slice(0, 24)}`,
    ...material,
    notes: Object.freeze([
      '甲為本主 is direct source evidence for the exact 寅 discussion, not authority for hiddenStems.month[0] or a repository-wide 本主 index convention.',
      '不透甲而透丙 ... 同知得以作主 is retained as exact 寅 transparency-substitution evidence only.',
      'No 本氣/中氣/餘氣 mapping, strength weighting, month-command duration, hidden-stem array ranking, or all-branch primary mapping is inferred.',
      'The existing transparency and branch-meeting frontiers remain separate; this review does not bypass their unresolved slot/effect predicates.',
      'MONTH_ORDER_HIDDEN_STEM_SELECTION_PREDICATE_AUTHORITY_MISSING remains open; no GEJU_CANDIDATE or GEJU_ESTABLISHMENT_STATE fact is emitted.',
      'General Natal production authority, P0-CM-03, NEXT_PRODUCTION_SKU, and Commerce remain blocked.',
    ]),
  });
}
