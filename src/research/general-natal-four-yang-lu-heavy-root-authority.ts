import { createHash } from 'node:crypto';
import type { EarthlyBranch, HeavenlyStem, StemFact } from '../contracts/calculation.js';
import {
  GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY,
  GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_DEFINITION_HASH,
} from './general-natal-root-term-binding-authority.js';
import {
  GENERAL_NATAL_FOUR_ELEMENT_DOCTRINAL_LU_LOCATION_MAPPING,
  GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_AUTHORITY,
  GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_DEFINITION_HASH,
} from './general-natal-lu-location-observations.js';

export const GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_SCOPE =
  'four_non_earth_yang_stem_lu_heavy_root_matcher' as const;
export const GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export type GovernedNonEarthYangLuStem = Extract<HeavenlyStem, '갑' | '병' | '경' | '임'>;

export const GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_MAPPING = Object.freeze({
  갑: GENERAL_NATAL_FOUR_ELEMENT_DOCTRINAL_LU_LOCATION_MAPPING.목,
  병: GENERAL_NATAL_FOUR_ELEMENT_DOCTRINAL_LU_LOCATION_MAPPING.화,
  경: GENERAL_NATAL_FOUR_ELEMENT_DOCTRINAL_LU_LOCATION_MAPPING.금,
  임: GENERAL_NATAL_FOUR_ELEMENT_DOCTRINAL_LU_LOCATION_MAPPING.수,
} as const satisfies Readonly<Record<GovernedNonEarthYangLuStem, EarthlyBranch>>);

export const GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_SOURCE_OBSERVATIONS = Object.freeze([
  Object.freeze({
    observation: '長生祿旺，根之重者也',
    authority: 'direct_selected_source_lu_heavy_root_semantic' as const,
  }),
  Object.freeze({
    observation: '祿臨官也',
    authority: 'direct_selected_source_lu_linguan_term_identity' as const,
  }),
  Object.freeze({
    observation: '甲祿於寅',
    authority: 'direct_selected_source_jia_lu_anchor' as const,
  }),
  Object.freeze({
    observation: '巳為火之祿，亥為水之祿，與午子相去一間耳。金木可以類推。',
    authority: 'direct_selected_source_non_earth_lu_location_surface' as const,
  }),
  Object.freeze({
    observation:
      'This matcher deliberately restricts execution to the Yang stem of each governed non-Earth element; it does not resolve the selected source internal Yin-Lu ambiguity.',
    authority: 'bounded_authority_chain_scope' as const,
  }),
] as const);

const GOVERNED_STEMS = Object.freeze(
  new Set<GovernedNonEarthYangLuStem>(['갑', '병', '경', '임']),
);

export type FourYangLuHeavyRootState =
  | 'lu_heavy_root_established'
  | 'no_governed_lu_match'
  | 'outside_governed_yang_non_earth_scope';

export interface FourYangLuHeavyRootEvaluation {
  readonly stem: HeavenlyStem;
  readonly branch: EarthlyBranch;
  readonly heavyRootState: FourYangLuHeavyRootState;
  readonly authority: 'research_only';
}

export function evaluateFourYangLuHeavyRoot(
  dayMaster: Pick<StemFact, 'value'>,
  branch: EarthlyBranch,
): FourYangLuHeavyRootEvaluation {
  if (!GOVERNED_STEMS.has(dayMaster.value as GovernedNonEarthYangLuStem)) {
    return Object.freeze({
      stem: dayMaster.value,
      branch,
      heavyRootState: 'outside_governed_yang_non_earth_scope',
      authority: 'research_only',
    });
  }

  const governedStem = dayMaster.value as GovernedNonEarthYangLuStem;
  if (branch === GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_MAPPING[governedStem]) {
    return Object.freeze({
      stem: dayMaster.value,
      branch,
      heavyRootState: 'lu_heavy_root_established',
      authority: 'research_only',
    });
  }

  return Object.freeze({
    stem: dayMaster.value,
    branch,
    heavyRootState: 'no_governed_lu_match',
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'yin_stem_lu_branch_matcher',
  'earth_stem_lu_branch_matcher',
  'same_element_yin_stem_inherits_governed_yang_lu_branch',
  'mingli_tanyuan_linguan_stage_cell_to_selected_source_lu',
  'foreign_twelve_growth_mapping_to_lu',
  'hidden_stem_order_to_lu_root_class',
  'lu_to_numeric_weight',
  'lu_to_ordinary_strength',
  'lu_to_generalized_root_weight_classifier',
  'lu_to_geju_candidate',
  'lu_to_geju_establishment',
  'lu_to_production_fact',
] as const);

export const GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_VERSION,
      scope: GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_SCOPE,
      decision: GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_DECISION,
      mapping: GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_MAPPING,
      sourceObservations: GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_SOURCE_OBSERVATIONS,
      upstreamLuLinguanDefinitionHash: GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_DEFINITION_HASH,
      upstreamLuLocationDefinitionHash: GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_DEFINITION_HASH,
      sourceInternalYinLuInterpretation:
        GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY.sourceInternalYinLuInterpretation,
      foreignTwelveGrowthMappingConsumedAsLuInput: false,
      hiddenStemDataConsumedByMatcher: false,
      unauthorizedDerivations: GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_UNAUTHORIZED_DERIVATIONS,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_VERSION,
  definitionHash: GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_DEFINITION_HASH,
  decision: GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_DECISION,
  upstreamLuLinguanVersion: GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY.version,
  upstreamLuLinguanDefinitionHash: GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_DEFINITION_HASH,
  upstreamLuLocationVersion: GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_AUTHORITY.version,
  upstreamLuLocationDefinitionHash: GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_DEFINITION_HASH,
  directSourceLuHeavyRootSemanticObserved:
    GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_AUTHORITY.directSourceLuHeavyRootSemanticObserved,
  selectedSourceLuLinguanTermBindingObserved:
    GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY.directSourceLuLinguanTermEquivalenceObserved,
  selectedSourceNonEarthLuLocationRegistryAvailableObservationOnly:
    GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_AUTHORITY
      .fourElementDoctrinalLuLocationRegistryAuthorizedObservationOnly,
  directSourceJiaYinLuObserved: true,
  directSourceFireWaterLuObserved: true,
  directSourceMetalWoodAnalogyObserved: true,
  fourNonEarthYangStemLuMatcherAuthorizedResearchOnly: true,
  yinStemLuMatcherAuthorized: false,
  earthStemLuMatcherAuthorized: false,
  sourceInternalYinLuInterpretation:
    GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY.sourceInternalYinLuInterpretation,
  sourceInternalYinLuAmbiguityPreserved: true,
  foreignTwelveGrowthMappingConsumedAsLuInput: false,
  mingliTanyuanLinguanStageAsLuInputAuthorized: false,
  hiddenStemDataConsumedByMatcher: false,
  generalizedRootWeightClassifierAuthorized: false,
  numericRootWeightAuthorized: false,
  ordinaryStrengthClassificationAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations: GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected-source authority chain permits a research-only Lu heavy-root matcher for exactly four non-Earth Yang stems: 甲-寅, 丙-巳, 庚-申, 壬-亥. The matcher reuses the governed #569 doctrinal Lu-location registry and preserves #559 source-internal Yin-Lu ambiguity. Yin stems and Earth stems remain outside governed scope, no #548 Twelve-Growth cell is consumed, and numeric strength, generalized root-weight classification, Gyeokguk candidate/establishment, and production emission remain unauthorized.',
});
