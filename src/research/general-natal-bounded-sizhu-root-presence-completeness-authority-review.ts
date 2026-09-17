import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_AUTHORITY,
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_CANONICAL_REPRESENTABILITY,
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_DEFINITION_HASH,
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_VERSION,
} from './general-natal-bounded-sizhu-four-yang-lu-root-presence-authority.js';
import {
  GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_AUTHORITY,
  GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_DEFINITION_HASH,
  GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_VERSION,
} from './general-natal-yin-changsheng-minggen-source-strata-conflict-authority.js';
import {
  GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY,
  GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_DEFINITION_HASH,
  GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_VERSION,
} from './general-natal-root-term-binding-authority.js';
import {
  GENERAL_NATAL_EARTH_LU_ATTACHMENT_BOUNDARY,
  GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_AUTHORITY,
  GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_DEFINITION_HASH,
  GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_VERSION,
} from './general-natal-lu-location-observations.js';
import {
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_AUTHORITY,
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_VERSION,
} from './general-natal-muku-yuqi-light-root-authority.js';
import {
  GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_AUTHORITY,
  GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_DEFINITION_HASH,
  GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_VERSION,
} from './general-natal-sizhu-has-root-capacity-observation-authority.js';

export const GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_SCOPE =
  'bounded_sizhu_root_presence_completeness_before_canonical_has_root_settlement_review' as const;
export const GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_DECISION =
  'INCOMPLETE_SETTLEMENT_BLOCKED' as const;

export const GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_SOURCE =
  Object.freeze({
    title: '子平真詮 / 子平真詮評註',
    section: '論十幹得時不旺失時不弱',
    url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
    revalidatedAt: '2026-09-17',
    sourceType: 'classical_transcription_with_commentary',
    directSizhuHasRootContextObserved:
      GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_AUTHORITY.directSourceSizhuHasRootCapacityContextObserved,
  });

export const GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_CURRENT_POSITIVE_SURFACE =
  Object.freeze([
    '旺',
    'non_earth_墓庫',
    'non_earth_餘氣',
    'yang_長生',
    'four_governed_non_earth_yang_祿',
  ] as const);

export const GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_BLOCKERS = Object.freeze({
  yinChangsheng: Object.freeze({
    state: 'UNRESOLVED_SOURCE_CONFLICT' as const,
    sourceStrataConflictObserved:
      GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_AUTHORITY
        .sourceStrataConflictObserved,
    sourceStrataPrecedenceRuleAvailable:
      GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_AUTHORITY
        .sourceStrataPrecedenceRuleAvailable,
    positiveRootPresenceAuthorized:
      GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_AUTHORITY
        .yinChangshengPositiveRootPresenceAuthorized,
    noRootAuthorized:
      GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_AUTHORITY
        .yinChangshengNoRootAuthorized,
  }),
  yinLu: Object.freeze({
    state: 'AMBIGUOUS' as const,
    sourceInternalInterpretation:
      GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY.sourceInternalYinLuInterpretation,
    completeLuBranchMatcherAuthorized:
      GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY
        .selectedSourceCompleteLuBranchMatcherAuthorized,
    boundedExamplesPromotedToGeneralMapping:
      GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY
        .boundedJiaYiExamplesPromotedToGeneralMapping,
  }),
  earthLu: Object.freeze({
    state: 'UNRESOLVED' as const,
    singleFixedLuLocationResolved:
      GENERAL_NATAL_EARTH_LU_ATTACHMENT_BOUNDARY.singleFixedLuLocationResolved,
    canonicalElementAndBranchSufficientToSelectAttachment:
      GENERAL_NATAL_EARTH_LU_ATTACHMENT_BOUNDARY
        .canonicalElementAndBranchSufficientToSelectAttachment,
    attachmentSelectionRuleAuthorized:
      GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_AUTHORITY.earthAttachmentSelectionRuleAuthorized,
  }),
  earthYuqi: Object.freeze({
    state: 'UNRESOLVED' as const,
    earthMukuNonApplicabilityObserved:
      GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_AUTHORITY.directSourceEarthMukuNonApplicabilityObserved,
    earthYuqiMappingResolved:
      GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_AUTHORITY.earthYuqiMappingResolved,
    completeFiveElementMukuYuqiMappingAuthorized:
      GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_AUTHORITY.completeFiveElementMukuYuqiMappingAuthorized,
  }),
  negativeRootAbsenceSemantics: Object.freeze({
    state: 'MISSING' as const,
    upstreamAbsenceMeansNoRoot:
      GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_AUTHORITY
        .noBoundedEvidenceToSizhuNoRootAuthorized,
    partialResolvedPillarInputAllowed:
      GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_AUTHORITY
        .partialResolvedPillarInputAllowed,
    partialPillarOmissionToNegativeAuthorized: false,
  }),
});

export const GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_CANONICAL_REPRESENTABILITY =
  Object.freeze({
    canonicalDayMasterValueAvailable:
      GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_CANONICAL_REPRESENTABILITY
        .canonicalDayMasterValueAvailable,
    canonicalDayMasterYinYangAvailable:
      GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_CANONICAL_REPRESENTABILITY
        .canonicalDayMasterYinYangAvailable,
    canonicalDayMasterElementAvailable:
      GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_CANONICAL_REPRESENTABILITY
        .canonicalDayMasterElementAvailable,
    canonicalPillarSlotAvailable:
      GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_CANONICAL_REPRESENTABILITY
        .canonicalPillarSlotAvailable,
    canonicalResolvedPillarBranchAvailable:
      GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_CANONICAL_REPRESENTABILITY
        .canonicalResolvedPillarBranchAvailable,
    chartFactsConsumedByReview: false,
    executableRootEvaluationConsumedByReview: false,
    status: 'RAW_IDENTITIES_AVAILABLE_SEMANTIC_COMPLETENESS_BLOCKED' as const,
  });

export const GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'current_positive_observation_to_canonical_sizhu_has_root_true',
    'zero_current_observations_to_sizhu_no_root',
    'missing_pillar_slot_to_negative_root_evidence',
    'yin_changsheng_classical_stratum_precedence',
    'yin_changsheng_commentary_stratum_precedence',
    'same_element_yin_stem_inherits_governed_yang_lu_branch',
    'earth_lu_guessed_single_attachment',
    'earth_yuqi_from_hidden_stem_storage_order',
    'foreign_twelve_growth_stage_to_selected_source_lu_or_root_completion',
    'bounded_tonggen_to_canonical_sizhu_has_root',
    'root_observation_count_to_completeness',
    'root_observation_count_to_strength',
    'pillar_position_to_numeric_weight',
    'pillar_position_to_nonnumeric_weight',
    'month_root_to_automatic_strongest_root_settlement',
    'root_presence_to_dang_zhong',
    'root_absence_to_zhu_gua',
    'root_presence_to_qiang',
    'root_presence_to_bu_ruo',
    'root_presence_to_final_qiang_ruo',
    'root_presence_to_final_wang_shuai',
    'root_presence_to_geju_candidate',
    'root_presence_to_geju_establishment',
    'root_presence_to_production_fact',
  ] as const);

const upstream = Object.freeze({
  boundedSizhuVersion: GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_VERSION,
  boundedSizhuDefinitionHash:
    GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_DEFINITION_HASH,
  yinChangshengConflictVersion:
    GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_VERSION,
  yinChangshengConflictDefinitionHash:
    GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_DEFINITION_HASH,
  luLinguanVersion: GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_VERSION,
  luLinguanDefinitionHash: GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_DEFINITION_HASH,
  luLocationVersion: GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_VERSION,
  luLocationDefinitionHash: GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_DEFINITION_HASH,
  mukuYuqiVersion: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_VERSION,
  mukuYuqiDefinitionHash: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH,
  sizhuCapacityVersion: GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_VERSION,
  sizhuCapacityDefinitionHash: GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_DEFINITION_HASH,
});

export const GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_VERSION,
        scope: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_SCOPE,
        decision: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_DECISION,
        source: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_SOURCE,
        currentPositiveSurface:
          GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_CURRENT_POSITIVE_SURFACE,
        blockers: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_BLOCKERS,
        representability:
          GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_CANONICAL_REPRESENTABILITY,
        upstream,
        surfaceCompleteForCanonicalSettlement: false,
        canonicalSizhuHasRootResolverAuthorized: false,
        rootEvidenceToSizhuHasRootSettlementAuthorized: false,
        noBoundedEvidenceToSizhuNoRootAuthorized: false,
        unauthorizedDerivations:
          GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_UNAUTHORIZED_DERIVATIONS,
        productionFactEmissionAuthorized: false,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_AUTHORITY =
  Object.freeze({
    version: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_VERSION,
    definitionHash:
      GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_DEFINITION_HASH,
    decision: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_DECISION,
    upstreamBoundedSizhuVersion: upstream.boundedSizhuVersion,
    upstreamBoundedSizhuDefinitionHash: upstream.boundedSizhuDefinitionHash,
    upstreamYinChangshengConflictVersion: upstream.yinChangshengConflictVersion,
    upstreamYinChangshengConflictDefinitionHash: upstream.yinChangshengConflictDefinitionHash,
    upstreamLuLinguanVersion: upstream.luLinguanVersion,
    upstreamLuLinguanDefinitionHash: upstream.luLinguanDefinitionHash,
    upstreamLuLocationVersion: upstream.luLocationVersion,
    upstreamLuLocationDefinitionHash: upstream.luLocationDefinitionHash,
    upstreamMukuYuqiVersion: upstream.mukuYuqiVersion,
    upstreamMukuYuqiDefinitionHash: upstream.mukuYuqiDefinitionHash,
    upstreamSizhuCapacityVersion: upstream.sizhuCapacityVersion,
    upstreamSizhuCapacityDefinitionHash: upstream.sizhuCapacityDefinitionHash,
    directSourceSizhuHasRootContextObserved:
      GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_AUTHORITY.directSourceSizhuHasRootCapacityContextObserved,
    currentBoundedPositiveRootSurfaceAvailableResearchOnly: true,
    canonicalRootInputIdentitiesAvailable: true,
    yinChangshengRootStatusCompleteness: 'UNRESOLVED_SOURCE_CONFLICT' as const,
    yinLuCompleteness: 'AMBIGUOUS' as const,
    earthLuAttachmentCompleteness: 'UNRESOLVED' as const,
    earthYuqiCompleteness: 'UNRESOLVED' as const,
    negativeRootAbsenceSemantics: 'MISSING' as const,
    partialPillarOmissionToNegativeAuthorized: false,
    boundedRootPresenceSurfaceCompleteForCanonicalSettlement: false,
    canonicalSizhuHasRootResolverAuthorized: false,
    rootEvidenceToSizhuHasRootSettlementAuthorized: false,
    noBoundedEvidenceToSizhuNoRootAuthorized: false,
    sourceStrataPrecedenceAssigned: false,
    rootObservationCountSemanticsAuthorized: false,
    rootPositionWeightingAuthorized: false,
    dangZhongCounterAuthorized: false,
    zhuGuaCounterAuthorized: false,
    chartLevelQiangRuoClassifierAuthorized: false,
    chartLevelWangShuaiClassifierAuthorized: false,
    numericStrengthAuthorized: false,
    nonNumericStrengthScalarAuthorized: false,
    generalizedRootWeightClassifierAuthorized: false,
    ordinaryStrengthClassificationAuthorized: false,
    candidateDerivationAuthorized: false,
    establishmentPredicateAuthorized: false,
    candidateFactsEmitted: false,
    establishmentFactsEmitted: false,
    productionFactEmissionAuthorized: false,
    nextProductionSku: 'NONE' as const,
    commerce: 'HOLD' as const,
    blockers: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_BLOCKERS,
    unauthorizedDerivations:
      GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_UNAUTHORIZED_DERIVATIONS,
    authorityBoundary:
      'Research-only non-executable completeness review. Canonical chart identities are representable, but the current bounded positive surface remains semantically incomplete because Yin Changsheng has an unresolved source-strata conflict, Yin Lu remains ambiguous, Earth Lu attachment remains unresolved, Earth Yuqi remains unresolved, and negative/absence semantics are missing. Therefore the bounded positive surface cannot be promoted to a canonical 四柱有根 or 四柱無根 settlement. No matcher, resolver, weighting, strength, Gyeokguk, Production, SKU, or Commerce authority is created.',
  });
