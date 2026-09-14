import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_VERSION,
} from './general-natal-geju-establishment-outcome-representation-review.js';
import { GENERAL_NATAL_GEJU_MIXED_OUTCOME_APPLICATION_REVIEW } from './general-natal-geju-mixed-outcome-application-review.js';
import {
  GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_VERSION,
} from './general-natal-geju-xing-chong-po-hai-effect-primitive-authority-review.js';

export const GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_PRIMITIVE_AUTHORITY_REVIEW_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_PRIMITIVE_AUTHORITY_REVIEW_SCOPE =
  'ziping_zhenquan_rescue_precedence_weighting_primitive_authority' as const;
export const GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_PRIMITIVE_AUTHORITY_DECISION =
  'PARTIALLY_AUTHORIZED' as const;

const UPSTREAM_MIXED_OUTCOME_APPLICATION_REVIEW_HASH = createHash('sha256')
  .update(JSON.stringify(GENERAL_NATAL_GEJU_MIXED_OUTCOME_APPLICATION_REVIEW))
  .digest('hex');

export const GENERAL_NATAL_GEJU_DIRECT_RESCUE_EXAMPLE_CATALOG = Object.freeze([
  Object.freeze({ adversity: '官逢傷', rescue: '透印以解之' }),
  Object.freeze({ adversity: '雜煞', rescue: '合煞以清之' }),
  Object.freeze({ adversity: '刑沖', rescue: '會合以解之' }),
  Object.freeze({ adversity: '財逢劫', rescue: '透食以化之' }),
  Object.freeze({ adversity: '財逢劫', rescue: '生官以制之' }),
  Object.freeze({ adversity: '財逢煞', rescue: '食神制煞以生財' }),
  Object.freeze({ adversity: '財逢煞', rescue: '存財而合煞' }),
  Object.freeze({ adversity: '印逢財', rescue: '劫財以解之' }),
  Object.freeze({ adversity: '印逢財', rescue: '合財而存印' }),
  Object.freeze({ adversity: '食逢梟', rescue: '就煞以成格' }),
  Object.freeze({ adversity: '食逢梟', rescue: '生財以護食' }),
  Object.freeze({ adversity: '煞逢食制，印來護煞', rescue: '逢財以去印存食' }),
  Object.freeze({ adversity: '傷官生財透煞', rescue: '煞逢合' }),
  Object.freeze({ adversity: '陽刃用官煞帶傷食', rescue: '重印以護之' }),
  Object.freeze({ adversity: '建祿月劫用官，遇傷', rescue: '傷被合' }),
  Object.freeze({ adversity: '建祿月劫用財帶煞', rescue: '煞被合' }),
] as const);

export const GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_MISSING_AUTHORITIES = Object.freeze([
  'canonical_candidate_identity',
  'canonical_rescue_clause_input_resolution',
  'source_example_to_canonical_matcher',
  'multiple_rescue_overlap_resolution',
  'rescue_effect_settlement_predicate',
  'relative_weight_comparison_predicate',
  'fixed_precedence_order',
  'terminal_state_precedence',
] as const);

export const GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'source_example_as_universal_matcher',
    'source_list_order_as_precedence_order',
    'quan_qing_quan_zhong_as_numeric_weight_or_score',
    'first_matching_rescue_as_winner',
    'multiple_rescue_clauses_as_deterministic_ranking',
    'absence_of_listed_rescue_as_no_rescue',
    'structural_relation_match_as_rescue_effect_established',
    'generic_strength_clash_router_as_geju_establishment_settlement',
  ] as const);

export const GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version:
          GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_PRIMITIVE_AUTHORITY_REVIEW_VERSION,
        scope: GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_PRIMITIVE_AUTHORITY_REVIEW_SCOPE,
        decision:
          GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_PRIMITIVE_AUTHORITY_DECISION,
        upstreamOutcomeVersion:
          GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_VERSION,
        upstreamOutcomeHash:
          GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_DEFINITION_HASH,
        upstreamMixedOutcomeApplicationVersion:
          GENERAL_NATAL_GEJU_MIXED_OUTCOME_APPLICATION_REVIEW.version,
        upstreamMixedOutcomeApplicationHash: UPSTREAM_MIXED_OUTCOME_APPLICATION_REVIEW_HASH,
        upstreamXingChongPoHaiVersion:
          GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_VERSION,
        upstreamXingChongPoHaiHash:
          GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
        rescueExamples: GENERAL_NATAL_GEJU_DIRECT_RESCUE_EXAMPLE_CATALOG,
        sourceCatalogExhaustive: false,
        generalizedRescueEffectPredicateAuthorized: false,
        generalizedRescuePrecedenceWeightingPredicateAuthorized: false,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_PRIMITIVE_AUTHORITY_REVIEW =
  Object.freeze({
    reviewVersion:
      GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_PRIMITIVE_AUTHORITY_REVIEW_VERSION,
    sourceScope: GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_PRIMITIVE_AUTHORITY_REVIEW_SCOPE,
    decision: GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_PRIMITIVE_AUTHORITY_DECISION,
    upstreamOutcomeVersion:
      GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_VERSION,
    upstreamOutcomeHash:
      GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_DEFINITION_HASH,
    upstreamMixedOutcomeApplicationVersion:
      GENERAL_NATAL_GEJU_MIXED_OUTCOME_APPLICATION_REVIEW.version,
    upstreamMixedOutcomeApplicationHash: UPSTREAM_MIXED_OUTCOME_APPLICATION_REVIEW_HASH,
    upstreamXingChongPoHaiVersion:
      GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_VERSION,
    upstreamXingChongPoHaiHash:
      GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
    directSourceRescueMaterialityObserved: true,
    directSourceRescueExampleCatalogObserved: true,
    directSourceRelativeWeightingPrincipleObserved: true,
    directSourceFixedPrecedenceOrderObserved: false,
    sourceRescueCatalogExhaustive: false,
    canonicalRescueClauseInputResolution: 'BLOCKED',
    generalizedRescueEffectPredicateAuthorized: false,
    generalizedRescuePrecedenceWeightingPredicateAuthorized: false,
    numericWeightingAuthorized: false,
    sourceListOrderAsPrecedenceAuthorized: false,
    multipleRescueOverlapResolutionAuthorized: false,
    terminalStatePrecedenceAuthorized: false,
    productionFactEmissionAuthorized: false,
    candidateFactsEmitted: false,
    establishmentFactsEmitted: false,
    rescueExamples: GENERAL_NATAL_GEJU_DIRECT_RESCUE_EXAMPLE_CATALOG,
    missingAuthorities: GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_MISSING_AUTHORITIES,
    unauthorizedDerivations:
      GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_UNAUTHORIZED_DERIVATIONS,
    authorityBoundary:
      'The selected source directly establishes rescue materiality and lists concrete rescue relations, while its 權輕權重，甚是活潑 language establishes only that relative weighting matters and remains context-sensitive. The listed examples do not define an exhaustive matcher, fixed precedence order, numeric weighting function, overlap settlement rule, or canonical terminal-state reducer. Current canonical clause input resolution remains blocked, so rescue effect and rescue precedence/weighting execution remain unauthorized.',
    notes: Object.freeze([
      '敗中有成，全憑救應 authorizes rescue as a source-semantic intervention layer, not a canonical chart predicate.',
      'The 何謂救應 passage is preserved as a direct research-only example catalog; source order is not rank or precedence.',
      '權輕權重，甚是活潑 authorizes context-sensitive relative-weight materiality but supplies no numeric or fixed-order algorithm.',
      'The 刑沖而會合以解之 example cannot be promoted to execution because #539 keeps relation/effect settlement incomplete.',
      'No GEJU_CANDIDATE or GEJU_ESTABLISHMENT_STATE is emitted; production authority and Commerce remain blocked.',
    ]),
  } as const);
