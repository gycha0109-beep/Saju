import { createHash } from 'node:crypto';
import type { StemFact } from '../contracts/calculation.js';
import {
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW,
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
} from './general-natal-geju-root-weight-classification-primitive-authority-review.js';
import {
  GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY,
  GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DEFINITION_HASH,
} from './general-natal-changsheng-root-weight-binding-authority.js';

export const GENERAL_NATAL_YANGREN_ELIGIBILITY_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_YANGREN_ELIGIBILITY_SCOPE =
  'ziping_zhenquan_yangren_eligibility_with_yin_stem_exclusion' as const;
export const GENERAL_NATAL_YANGREN_ELIGIBILITY_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_YANGREN_ELIGIBILITY_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  sections: Object.freeze(['論陽刃', '論建祿月劫'] as const),
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_035.htm',
  accessedAt: '2026-09-14',
  sourceType: 'classical_transcription',
  authority:
    'Selected semantic authority for Yang-only Yangren scope. The reviewed body distinguishes Yang-stem 刃 from Yin-stem 劫 and does not authorize a ten-stem 刃 mapping.',
});

export const GENERAL_NATAL_YANGREN_ELIGIBILITY_SOURCE_OBSERVATIONS = Object.freeze([
  Object.freeze({
    observation: '祿前一位，惟五陽有之',
    authority: 'direct_source_scope_semantic' as const,
  }),
  Object.freeze({
    observation: '五陰無刃乎？陰陽家言，僅四長生，亦僅五刃而已',
    authority: 'direct_source_exclusion_semantic' as const,
  }),
  Object.freeze({
    observation: '月劫者月令逢劫也，陽干為刃，陰乾為劫',
    authority: 'direct_source_reclassification_semantic' as const,
  }),
] as const);

export const GENERAL_NATAL_YANGREN_ELIGIBILITY_CONFLICT_REFERENCE = Object.freeze({
  title: '千里命稿',
  url: 'https://libokang.com/zh-hant/guji/bazi/%E5%8D%83%E9%87%8C%E5%91%BD%E7%A8%BF/4/',
  accessedAt: '2026-09-14',
  role: 'conflict_reference_only',
  observation:
    'Publishes a different convention that assigns 刃 to both Yang and Yin stems and links the position to 帝旺; it is not merged into the selected 子平真詮評註 authority chain.',
});

export type YangrenEligibilityState =
  | 'eligible_for_yangren_classification'
  | 'excluded_by_selected_source_scope';

export interface YangrenEligibilityEvaluation {
  readonly stem: StemFact['value'];
  readonly yinYang: StemFact['yinYang'];
  readonly yangrenEligibility: YangrenEligibilityState;
  readonly authority: 'research_only';
}

export function evaluateYangrenEligibility(
  dayMaster: Pick<StemFact, 'value' | 'yinYang'>,
): YangrenEligibilityEvaluation {
  if (dayMaster.yinYang === '음') {
    return Object.freeze({
      stem: dayMaster.value,
      yinYang: dayMaster.yinYang,
      yangrenEligibility: 'excluded_by_selected_source_scope',
      authority: 'research_only',
    });
  }

  return Object.freeze({
    stem: dayMaster.value,
    yinYang: dayMaster.yinYang,
    yangrenEligibility: 'eligible_for_yangren_classification',
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_YANGREN_ELIGIBILITY_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'linguan_as_lu',
  'diwang_as_ren',
  'complete_lu_branch_mapping',
  'complete_ren_branch_mapping',
  'yin_stem_ren_mapping_from_conflicting_source',
  'yang_eligibility_as_specific_ren_branch_match',
  'yang_eligibility_as_heavy_root_by_itself',
  'ren_eligibility_as_numeric_strength',
  'ren_eligibility_as_ordinary_strength',
  'ren_eligibility_as_generalized_root_weight_classifier',
  'ren_eligibility_as_geju_candidate',
  'ren_eligibility_as_geju_establishment',
  'ren_eligibility_as_production_fact',
] as const);

export const GENERAL_NATAL_YANGREN_ELIGIBILITY_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_YANGREN_ELIGIBILITY_VERSION,
      scope: GENERAL_NATAL_YANGREN_ELIGIBILITY_SCOPE,
      decision: GENERAL_NATAL_YANGREN_ELIGIBILITY_DECISION,
      source: GENERAL_NATAL_YANGREN_ELIGIBILITY_SOURCE,
      sourceObservations: GENERAL_NATAL_YANGREN_ELIGIBILITY_SOURCE_OBSERVATIONS,
      conflictReference: GENERAL_NATAL_YANGREN_ELIGIBILITY_CONFLICT_REFERENCE,
      upstreamRootWeightReviewVersion:
        GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW.reviewVersion,
      upstreamRootWeightReviewDefinitionHash:
        GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
      upstreamChangshengBindingVersion:
        GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY.version,
      upstreamChangshengBindingDefinitionHash:
        GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DEFINITION_HASH,
      unauthorizedDerivations: GENERAL_NATAL_YANGREN_ELIGIBILITY_UNAUTHORIZED_DERIVATIONS,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_YANGREN_ELIGIBILITY_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_YANGREN_ELIGIBILITY_VERSION,
  definitionHash: GENERAL_NATAL_YANGREN_ELIGIBILITY_DEFINITION_HASH,
  decision: GENERAL_NATAL_YANGREN_ELIGIBILITY_DECISION,
  upstreamRootWeightReviewVersion:
    GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW.reviewVersion,
  upstreamRootWeightReviewDefinitionHash:
    GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
  upstreamChangshengBindingVersion:
    GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY.version,
  upstreamChangshengBindingDefinitionHash:
    GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DEFINITION_HASH,
  directSourceYangOnlyYangrenScopeObserved: true,
  directSourceYinStemReclassificationAsJieObserved: true,
  canonicalDayMasterYinYangAvailable: true,
  yangrenEligibilityPredicateAuthorizedResearchOnly: true,
  yinStemYangrenExclusionAuthorizedResearchOnly: true,
  selectedSourceScopeIsYangOnly: true,
  conflictingTenStemRenConventionObserved: true,
  crossSourceConventionMergeAuthorized: false,
  completeYangrenBranchMatcherAuthorized: false,
  completeLuBranchMappingAuthorized: false,
  completeRenBranchMappingAuthorized: false,
  renToDiWangEquivalenceAuthorized: false,
  luToLinGuanEquivalenceAuthorized: false,
  tenStemYangrenMappingAuthorized: false,
  generalizedRootWeightClassifierAuthorized: false,
  numericStrengthAuthorized: false,
  ordinaryStrengthClassificationAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations: GENERAL_NATAL_YANGREN_ELIGIBILITY_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'This research-only primitive authorizes only a selected-source eligibility boundary: canonical Yang day masters are eligible for later Yangren classification, while canonical Yin day masters are excluded from Yangren scope and are described by the source as 劫 in the month-command context. Eligibility does not identify a branch as 刃, does not equate 帝旺 with 刃 or 臨官 with 祿, and does not authorize any complete 祿/刃 mapping, generalized root-weight classifier, strength score, Gyeokguk candidate/establishment fact, or production emission. A conflicting ten-stem convention is recorded only to enforce fail-closed source isolation.',
});
