import { createHash } from 'node:crypto';
import {
  STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH,
  STRUCTURAL_RELATION_DERIVATION_VERSION,
} from '../calculation/structural-relations.js';
import { GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW } from './general-natal-geju-source-example-canonical-input-binding-review.js';

export const GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_SCOPE =
  'ziping_zhenquan_xing_chong_po_hai_effect_primitive_authority' as const;
export const GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_DECISION =
  'PARTIALLY_AUTHORIZED' as const;

const UPSTREAM_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW_DEFINITION_HASH = createHash('sha256')
  .update(JSON.stringify(GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW))
  .digest('hex');

export const GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_SOURCE_OBSERVATIONS = Object.freeze([
  Object.freeze({
    source: '子平真詮 / 子平真詮評注 — 論用神成敗救應',
    observation: '官逢財印，又無刑衝破害，官格成也',
    authority: 'direct_source_establishment_materiality' as const,
  }),
  Object.freeze({
    source: '子平真詮 — 論正官',
    observation: '官以克身，雖與七煞有別，終受彼制，何以切忌刑沖破害',
    authority: 'direct_source_adverse_relation_materiality' as const,
  }),
  Object.freeze({
    source: '子平真詮評注 — 論用神成敗救應',
    observation: '刑破害須酌量衡之，非必盡破格也',
    authority: 'direct_commentary_contextual_effect_limit' as const,
  }),
] as const);

export const GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_CANONICAL_INPUT_STATUS = Object.freeze({
  branchClash: 'AVAILABLE_STRUCTURAL_MATCH_ONLY',
  branchXing: 'MISSING',
  branchPo: 'MISSING',
  branchHai: 'MISSING',
} as const);

export const GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_MISSING_AUTHORITIES = Object.freeze([
  'canonical_branch_xing_relation_vocabulary',
  'canonical_branch_po_relation_vocabulary',
  'canonical_branch_hai_relation_vocabulary',
  'source_scoped_relation_target_binding',
  'contextual_effect_resolution_predicate',
  'relation_rescue_and_settlement_predicate',
  'complete_geju_establishment_interaction_predicate',
] as const);

export const GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'branch_clash_presence_as_automatic_po_ge',
  'branch_clash_absence_as_wu_xing_chong_po_hai',
  'missing_xing_po_hai_relation_as_false',
  'structural_match_as_contextual_effect',
  'generic_clash_strength_router_as_geju_establishment_authority',
  'contextual_commentary_as_numeric_score_or_threshold',
  'cross_source_stitching_as_missing_selected_source_predicate',
] as const);

export interface GeneralNatalGejuXingChongPoHaiEffectPrimitiveAuthorityReview {
  readonly reviewVersion: typeof GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_VERSION;
  readonly sourceScope: typeof GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_SCOPE;
  readonly decision: typeof GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_DECISION;
  readonly upstreamVersion: string;
  readonly upstreamDefinitionHash: string;
  readonly structuralRelationVersion: typeof STRUCTURAL_RELATION_DERIVATION_VERSION;
  readonly structuralRelationContentHash: string;
  readonly sourceObservations: typeof GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_SOURCE_OBSERVATIONS;
  readonly canonicalInputStatus: typeof GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_CANONICAL_INPUT_STATUS;
  readonly directSourceXingChongPoHaiMaterialityObserved: true;
  readonly directSourceAutomaticBreakEquivalenceObserved: false;
  readonly sourceContextEffectRequirementObserved: true;
  readonly sourceScopeExhaustive: false;
  readonly canonicalBranchClashInputAvailable: true;
  readonly canonicalBranchClashAuthorityLimitedToStructuralMatch: true;
  readonly canonicalBranchXingInputAvailable: false;
  readonly canonicalBranchPoInputAvailable: false;
  readonly canonicalBranchHaiInputAvailable: false;
  readonly generalizedXingChongPoHaiEffectPredicateAuthorized: false;
  readonly boundedClashOnlyEffectMatcherAuthorized: false;
  readonly productionFactEmissionAuthorized: false;
  readonly candidateDerivationAuthorized: false;
  readonly establishmentPredicateAuthorized: false;
  readonly candidateFactsEmitted: false;
  readonly establishmentFactsEmitted: false;
  readonly missingAuthorities: typeof GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_MISSING_AUTHORITIES;
  readonly unauthorizedDerivations: typeof GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_UNAUTHORIZED_DERIVATIONS;
  readonly authorityBoundary: string;
  readonly notes: readonly string[];
}

export const GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_VERSION,
        sourceScope: GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_SCOPE,
        decision: GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_DECISION,
        upstreamVersion: GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW.version,
        upstreamDefinitionHash:
          UPSTREAM_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW_DEFINITION_HASH,
        structuralRelationVersion: STRUCTURAL_RELATION_DERIVATION_VERSION,
        structuralRelationContentHash: STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH,
        sourceObservations: GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_SOURCE_OBSERVATIONS,
        canonicalInputStatus: GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_CANONICAL_INPUT_STATUS,
        sourceScopeExhaustive: false,
        generalizedXingChongPoHaiEffectPredicateAuthorized: false,
        boundedClashOnlyEffectMatcherAuthorized: false,
        productionFactEmissionAuthorized: false,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW: GeneralNatalGejuXingChongPoHaiEffectPrimitiveAuthorityReview =
  Object.freeze({
    reviewVersion: GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_VERSION,
    sourceScope: GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_SCOPE,
    decision: GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_DECISION,
    upstreamVersion: GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW.version,
    upstreamDefinitionHash:
      UPSTREAM_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW_DEFINITION_HASH,
    structuralRelationVersion: STRUCTURAL_RELATION_DERIVATION_VERSION,
    structuralRelationContentHash: STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH,
    sourceObservations: GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_SOURCE_OBSERVATIONS,
    canonicalInputStatus: GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_CANONICAL_INPUT_STATUS,
    directSourceXingChongPoHaiMaterialityObserved: true,
    directSourceAutomaticBreakEquivalenceObserved: false,
    sourceContextEffectRequirementObserved: true,
    sourceScopeExhaustive: false,
    canonicalBranchClashInputAvailable: true,
    canonicalBranchClashAuthorityLimitedToStructuralMatch: true,
    canonicalBranchXingInputAvailable: false,
    canonicalBranchPoInputAvailable: false,
    canonicalBranchHaiInputAvailable: false,
    generalizedXingChongPoHaiEffectPredicateAuthorized: false,
    boundedClashOnlyEffectMatcherAuthorized: false,
    productionFactEmissionAuthorized: false,
    candidateDerivationAuthorized: false,
    establishmentPredicateAuthorized: false,
    candidateFactsEmitted: false,
    establishmentFactsEmitted: false,
    missingAuthorities: GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_MISSING_AUTHORITIES,
    unauthorizedDerivations: GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_UNAUTHORIZED_DERIVATIONS,
    authorityBoundary:
      'The selected source directly makes 刑沖破害 material to Gyeokguk success/failure, while the selected commentary explicitly requires contextual weighing and denies an automatic all-cases break equivalence. Current canonical structural relations can represent branch clash as a structural match only and do not model 刑, 破, or 害. Therefore the semantic materiality is admitted, but neither a complete input contract nor a generalized establishment-effect predicate is authorized.',
    notes: Object.freeze([
      'Direct source wording authorizes materiality, not a relation-presence-to-破格 function.',
      'The commentary phrase 非必盡破格 prevents treating every 刑/破/害 occurrence as automatic establishment failure.',
      'Canonical branch_clash remains structuralMatchOnly with transformationEstablished=false and carries no Gyeokguk settlement semantics.',
      'Absence of a modeled clash cannot stand in for 無刑衝破害 because 刑, 破, and 害 are not modeled by the current canonical relation vocabulary.',
      'The generic I20D clash-rescue research router is not promoted into selected-source Gyeokguk establishment authority.',
      'This review emits no GEJU_CANDIDATE or GEJU_ESTABLISHMENT_STATE and does not change General Natal production, P0-CM-03, NEXT_PRODUCTION_SKU, or Commerce HOLD.',
    ]),
  });
