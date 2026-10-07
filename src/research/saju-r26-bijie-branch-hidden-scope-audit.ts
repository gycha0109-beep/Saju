import {
  HIDDEN_STEM_MEMBERSHIP_CONTENT_HASH,
  HIDDEN_STEM_MEMBERSHIP_SOURCE,
  HIDDEN_STEM_MEMBERSHIP_VERSION,
} from '../calculation/hidden-stems.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { R060_AUTHORITY } from './general-natal-hidden-stem-interaction-boundary.js';
import { R123_AUTHORITY } from './general-natal-hidden-stem-qualitative-depth-evidence.js';
import { GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY } from './general-natal-tonggen-dang-zhong-support-constituent-authority.js';
import { GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY } from './general-natal-visible-stem-bijie-support-constituent-union-authority.js';
import { GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_AUTHORITY } from './general-natal-visible-stem-bijie-support-member-count-authority.js';
import { SHARED_NATAL_SUPPLIED_SINGLE_TEN_GOD_FACT_BINDING_AUTHORITY } from './shared-natal-supplied-single-ten-god-fact-binding.js';

export const SAJU_R26_BIJIE_BRANCH_HIDDEN_SCOPE_AUDIT_VERSION = '0.1.0-research' as const;

export const SAJU_R26_BIJIE_SCOPE_DECISION = Object.freeze({
  decision: 'SEPARATE_HIDDEN_OCCURRENCE_SCOPE_REQUIRED_SUPPORT_UNRESOLVED',
  visibleStemScope: GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_AUTHORITY.semanticScope,
  visibleStemSlots: GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY.slots,
  visibleStemScopeWidened: false,
  representativeBranchTenGodIsCompleteHiddenCollection: false,
  representativeBranchTenGodAddedAlongsideItsHiddenMembers: false,
  proposedHiddenOccurrenceScope:
    'canonical_hidden_stem_occurrences_in_year_month_day_hour_branches',
  proposedHiddenOccurrenceSlots: Object.freeze(['year', 'month', 'day', 'hour'] as const),
  dayBranchIncludedInProposedScope: true,
  dayVisibleSelfIncluded: false,
  occurrenceIdentity: 'pillar_slot_and_hidden_stem_value',
  sameStemAcrossDifferentSlotsCollapsed: false,
  canonicalArrayIndexIsSemanticRank: false,
  hiddenMembershipImpliesActiveSupport: false,
  hiddenMembershipImpliesTonggen: false,
  proposedScopeIsCompleteSupportCollection: false,
} as const);

export const SAJU_R26_NEXT_REQUIRED_PRIMITIVE = Object.freeze({
  primitiveId: 'SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCES',
  readiness: 'READY_FOR_EXPLICIT_STRUCTURAL_MAPPING_CONTRACT',
  purpose:
    'preserve every canonical hidden-stem occurrence and its deterministic Ten-God relation before any hidden Bijie support decision',
  canonicalHiddenMembershipInput: 'derivedFacts.hiddenStems',
  dayMasterInput: 'derivedFacts.dayMaster',
  existingMapper: 'manseryeok@2.0.0#getTenGod',
  mappingIsCalculationOnly: true,
  mustBindExactSnapshotIdAndHash: true,
  mustVerifyHiddenMembershipAgainstSourcePillars: true,
  mustVerifyDayMasterAgainstDayPillar: true,
  mustPreserveSlotAndStemIdentity: true,
  mustRejectDuplicateMembersWithinSlot: true,
  mustPreserveSameStemAcrossDifferentSlots: true,
  mustNotUseRepresentativeBranchTenGodAsHiddenMember: true,
  mustNotAssignMeaningToArrayIndex: true,
  mustFailClosedOnMissingUnresolvedOrInconsistentInputs: true,
  unmaterializedScenarios: 'unavailable',
  missingHiddenDataMeans: 'unavailable_not_empty_or_negative',
  hiddenSupportAuthorityReusableFromVisibleR23: false,
  supportCountOrWeightAuthorized: false,
  implementationAuthorizedByThisAudit: false,
} as const);

const audit = Object.freeze({
  version: SAJU_R26_BIJIE_BRANCH_HIDDEN_SCOPE_AUDIT_VERSION,
  authorityEffect: 'scope_audit_only',
  scopeDecision: SAJU_R26_BIJIE_SCOPE_DECISION,
  nextRequiredPrimitive: SAJU_R26_NEXT_REQUIRED_PRIMITIVE,
  sourceBindings: Object.freeze({
    hiddenMembershipVersion: HIDDEN_STEM_MEMBERSHIP_VERSION,
    hiddenMembershipContentHash: HIDDEN_STEM_MEMBERSHIP_CONTENT_HASH,
    hiddenMembershipSource: HIDDEN_STEM_MEMBERSHIP_SOURCE,
    r23DefinitionHash:
      GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY.definitionHash,
    r25DefinitionHash:
      GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_AUTHORITY.definitionHash,
    singleFactBindingDefinitionHash:
      SHARED_NATAL_SUPPLIED_SINGLE_TEN_GOD_FACT_BINDING_AUTHORITY.definitionHash,
    hiddenInteractionBoundaryHash: deterministicContentHash(R060_AUTHORITY),
    hiddenQualitativeDepthBoundaryHash: deterministicContentHash(R123_AUTHORITY),
    tonggenSupportDefinitionHash:
      GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY.definitionHash,
  }),
  remainingBlockers: Object.freeze({
    visibleStemSupportMemberCount: 'CLOSED_RESEARCH_ONLY',
    hiddenStemTenGodOccurrenceProjection: 'MISSING',
    hiddenBijieSupportAuthority: 'NOT_AUTHORIZED',
    completeBijieSupportCollection: 'MISSING',
    supportCompositionMethodology: 'NOT_SETTLED',
    dangZhongZhuGuaSettlement: 'NOT_READY',
    productionStructuralChain: 'NOT_PROVEN',
  }),
  interpretationClaimEmissionAuthorized: false,
  hiddenTenGodProjectionAuthorized: false,
  hiddenBijieSupportAuthorized: false,
  wholeChartBijieCountAuthorized: false,
  completeBijieCollectionAuthorized: false,
  supportCompositionAuthorized: false,
  supportWeightAuthorized: false,
  dangZhongSettlementAuthorized: false,
  zhuGuaSettlementAuthorized: false,
  qiangRuoClassificationAuthorized: false,
  wangShuaiClassificationAuthorized: false,
  gyeokgukDerivationAuthorized: false,
  narrativeMaterialityAuthorized: false,
  productionAuthorityAuthorized: false,
} as const);

export const SAJU_R26_BIJIE_BRANCH_HIDDEN_SCOPE_AUDIT_AUTHORITY = Object.freeze({
  ...audit,
  definitionHash: deterministicContentHash(audit),
  authorityBoundary:
    'This scope audit separates fixed visible support membership from representative branch Ten-Gods, raw hidden-stem occurrences, and governed Tonggen. It identifies a snapshot-bound structural mapping prerequisite without executing it or granting hidden support, complete collection, weighting, strength, Narrative or Production authority.',
});
