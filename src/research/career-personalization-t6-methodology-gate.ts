import {
  CAREER_PERSONALIZATION_METHODOLOGY_GATE_VERSION,
  careerMethodologyDecision,
} from './career-personalization-methodology-gate.js';
import { I113_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW_VERSION } from './i113-challenge-combination-support-channel-untouched-support-effect-source-ke-interaction-eligibility-methodology-review.js';
import { I116_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_PROMOTION_READINESS_REVIEW_VERSION } from './i116-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-positional-applicability-promotion-readiness-review.js';
import { I117_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW_VERSION } from './i117-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-effective-interaction-eligibility-methodology-review.js';

export const CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION =
  'myeonghwa-career-personalization-t6-methodology-gate-v1' as const;

export type CareerT6Dimension =
  | 't5_exact_subtype_upstream'
  | 't5_family_relation_upstream'
  | 'visible_stem_directional_relation'
  | 'visible_stem_positional_qualitative_context'
  | 'visible_stem_effective_interaction'
  | 'hidden_stem_interaction_eligibility'
  | 'activation_persistence_effective_support'
  | 'damage_magnitude_settlement'
  | 'cross_relation_precedence'
  | 'numeric_interaction_weighting'
  | 'career_t6_semantic_effect';

export type CareerT6DimensionMode =
  | 'available_upstream'
  | 'preserve_only'
  | 'blocked_authority_gap'
  | 'blocked';

export type CareerPostT6GateOption =
  | 'NEW_EXTERNAL_INTERACTION_AUTHORITY'
  | 'SEPARATE_T5_ONLY_T8_SYNTHESIS_METHODOLOGY_REVIEW';

export interface CareerT6DimensionDecision {
  dimension: CareerT6Dimension;
  mode: CareerT6DimensionMode;
  rationale: string;
  sourceIds: readonly string[];
  upstreamAuditRefs: readonly string[];
  t6AuthoringAuthorized: false;
  careerOutcomeAuthorized: false;
  numericWeightingAuthorized: false;
}

export interface CareerT6AuditContractRef {
  auditId: 'P1' | 'I113' | 'I116' | 'I117';
  version: string;
  supports: readonly string[];
  doesNotSupport: readonly string[];
}

export interface CareerPersonalizationT6MethodologyGate {
  gateId: 'CAREER-PERSONALIZATION-T6-METHODOLOGY-P3';
  version: typeof CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION;
  domain: 'career';
  temporalScope: 'natal';
  status: 'research';
  reviewerStatus: 'unreviewed';
  authorityScope: 't6_interaction_methodology_readiness_only';
  auditContracts: readonly CareerT6AuditContractRef[];
  decisions: readonly CareerT6DimensionDecision[];
  readiness: {
    t5Substrate: 'available_research_only';
    visibleStemPositionalEvidence: 'available_research_only';
    visibleStemEffectiveInteraction: 'blocked_authority_gap';
    hiddenStemInteraction: 'blocked_authority_gap';
    t6InteractionAuthoring: 'not_authorized';
    t8CareerSynthesis: 'not_authorized_by_this_gate';
    personalizedCareerPack: 't5_only_research_pack_exists';
    previewDefaultSwitch: 'not_authorized';
    productionPromotion: 'not_authorized';
  };
  globalConstraints: {
    positionalEvidenceIsInteractionEffect: false;
    qualitativeForceIsBinaryEligibility: false;
    farStemNoForceMeansNoInteraction: false;
    hiddenStemMayBorrowVisibleStemRule: false;
    coPresenceEstablishesEffectiveInteraction: false;
    directionEstablishesDamageOutcome: false;
    damageMayProceedWithoutEligibility: false;
    interactionMayBecomeCareerMeaningWithoutT6Rule: false;
    occurrenceCountIsInteractionMagnitude: false;
    numericInteractionScoreAuthorized: false;
    conflictWinnerAuthorized: false;
    crossRelationPrecedenceAuthorized: false;
    legacyCareerT8MaySubstituteForT6: false;
  };
  implementationEffects: {
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    registrySnapshotsCreated: 0;
    interpretationPacksCreated: 0;
    previewRoutesChanged: 0;
  };
  nextDecisionOptions: readonly [
    'NEW_EXTERNAL_INTERACTION_AUTHORITY',
    'SEPARATE_T5_ONLY_T8_SYNTHESIS_METHODOLOGY_REVIEW',
  ];
  automaticNextPathAuthorized: false;
}

const CHEN_YUAN = 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515';
const YUANHAI = 'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE';
const SAMYEONG = 'SRC-SAMYEONG-TONGHOE-V5-FOUR-LIBRARIES-TENGOD-RELATIONS';

function decision(
  dimension: CareerT6Dimension,
  mode: CareerT6DimensionMode,
  rationale: string,
  sourceIds: readonly string[],
  upstreamAuditRefs: readonly string[],
): CareerT6DimensionDecision {
  return Object.freeze({
    dimension,
    mode,
    rationale,
    sourceIds: Object.freeze([...sourceIds]),
    upstreamAuditRefs: Object.freeze([...upstreamAuditRefs]),
    t6AuthoringAuthorized: false,
    careerOutcomeAuthorized: false,
    numericWeightingAuthorized: false,
  });
}

function assertP1Boundary(): void {
  const structural = careerMethodologyDecision('structural_interactions');
  const hidden = careerMethodologyDecision('hidden_stem_participation');
  const subtype = careerMethodologyDecision('exact_ten_god_subtype');
  const family = careerMethodologyDecision('broad_family_context');
  if (
    structural.mode !== 'preserve_only' ||
    structural.authorizedSemanticTiers.length !== 0 ||
    !structural.sourceIds.includes(CHEN_YUAN) ||
    hidden.mode !== 'preserve_only' ||
    hidden.authorizedSemanticTiers.length !== 0 ||
    subtype.mode !== 'consume' ||
    !subtype.authorizedSemanticTiers.includes('T5') ||
    family.mode !== 'consume' ||
    !family.authorizedSemanticTiers.includes('T5')
  ) {
    throw new Error('P1 Career boundary no longer matches the P3 T6 readiness assumptions.');
  }
}

assertP1Boundary();

export const CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE: CareerPersonalizationT6MethodologyGate =
  Object.freeze({
    gateId: 'CAREER-PERSONALIZATION-T6-METHODOLOGY-P3',
    version: CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION,
    domain: 'career',
    temporalScope: 'natal',
    status: 'research',
    reviewerStatus: 'unreviewed',
    authorityScope: 't6_interaction_methodology_readiness_only',
    auditContracts: Object.freeze([
      Object.freeze({
        auditId: 'P1',
        version: CAREER_PERSONALIZATION_METHODOLOGY_GATE_VERSION,
        supports: Object.freeze(['T5 subtype/family substrate.', 'Structural interaction evidence preservation.']),
        doesNotSupport: Object.freeze(['T6 interaction authoring.', 'Career interaction-effect conclusions.']),
      }),
      Object.freeze({
        auditId: 'I113',
        version: I113_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW_VERSION,
        supports: Object.freeze(['Visible-stem positional applicability language for research.', 'Visible/hidden authority separation.']),
        doesNotSupport: Object.freeze(['Effective interaction eligibility.', 'Hidden-stem eligibility.', 'Damage or numeric weighting.']),
      }),
      Object.freeze({
        auditId: 'I116',
        version: I116_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_PROMOTION_READINESS_REVIEW_VERSION,
        supports: Object.freeze(['Visible-stem directional plus qualitative positional evidence substrate.']),
        doesNotSupport: Object.freeze(['Promotion to effective interaction.', '无力 as no interaction.', 'Damage, settlement, numeric force, or hidden-stem borrowing.']),
      }),
      Object.freeze({
        auditId: 'I117',
        version: I117_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW_VERSION,
        supports: Object.freeze(['Non-binary qualitative ordering may remain research evidence.', 'Binary-threshold authority gap is explicit.']),
        doesNotSupport: Object.freeze(['Boolean effective-interaction threshold.', '力大/次之 as active thresholds.', '无力 as no interaction or zero damage.', 'Damage before eligibility.']),
      }),
    ]),
    decisions: Object.freeze([
      decision('t5_exact_subtype_upstream', 'available_upstream', 'P2 T5 subtype claims are available research evidence, not T6 authority.', [YUANHAI], ['P1', 'P2']),
      decision('t5_family_relation_upstream', 'available_upstream', 'P2 T5 family relations are structural context, not interaction effect.', [YUANHAI, SAMYEONG], ['P1', 'P2']),
      decision('visible_stem_directional_relation', 'preserve_only', 'Directional 克 evidence exists but direction alone does not establish effective interaction or damage.', [CHEN_YUAN], ['I113', 'I116', 'I117']),
      decision('visible_stem_positional_qualitative_context', 'preserve_only', '邻干/隔干/远干 with 力大/次之/无力 remains non-binary, non-numeric positional evidence.', [CHEN_YUAN], ['I113', 'I116', 'I117']),
      decision('visible_stem_effective_interaction', 'blocked_authority_gap', 'I117 confirms no boolean threshold for promoting qualitative position to effective interaction.', [CHEN_YUAN], ['I117']),
      decision('hidden_stem_interaction_eligibility', 'blocked_authority_gap', 'Hidden-stem interaction eligibility is not established and may not borrow the visible-stem rule.', [CHEN_YUAN], ['I113', 'I116', 'I117']),
      decision('activation_persistence_effective_support', 'blocked_authority_gap', 'Activation, persistence, and effective-support verdicts remain unauthorized.', [CHEN_YUAN], ['I113', 'I116', 'I117']),
      decision('damage_magnitude_settlement', 'blocked_authority_gap', 'Damage cannot proceed before effective-interaction eligibility; magnitude and settlement authority are absent.', [CHEN_YUAN], ['I113', 'I116', 'I117']),
      decision('cross_relation_precedence', 'blocked', 'No reviewed Career winner or precedence policy exists.', [], ['P1', 'I113', 'I116', 'I117']),
      decision('numeric_interaction_weighting', 'blocked', 'Qualitative force and slot distance may not become numeric weights or scores.', [CHEN_YUAN], ['I113', 'I116', 'I117']),
      decision('career_t6_semantic_effect', 'blocked_authority_gap', 'No current methodology connects T5 plus preserved interaction evidence to a governed Career T6 semantic effect.', [YUANHAI, SAMYEONG, CHEN_YUAN], ['P1', 'I113', 'I116', 'I117']),
    ]),
    readiness: Object.freeze({
      t5Substrate: 'available_research_only',
      visibleStemPositionalEvidence: 'available_research_only',
      visibleStemEffectiveInteraction: 'blocked_authority_gap',
      hiddenStemInteraction: 'blocked_authority_gap',
      t6InteractionAuthoring: 'not_authorized',
      t8CareerSynthesis: 'not_authorized_by_this_gate',
      personalizedCareerPack: 't5_only_research_pack_exists',
      previewDefaultSwitch: 'not_authorized',
      productionPromotion: 'not_authorized',
    }),
    globalConstraints: Object.freeze({
      positionalEvidenceIsInteractionEffect: false,
      qualitativeForceIsBinaryEligibility: false,
      farStemNoForceMeansNoInteraction: false,
      hiddenStemMayBorrowVisibleStemRule: false,
      coPresenceEstablishesEffectiveInteraction: false,
      directionEstablishesDamageOutcome: false,
      damageMayProceedWithoutEligibility: false,
      interactionMayBecomeCareerMeaningWithoutT6Rule: false,
      occurrenceCountIsInteractionMagnitude: false,
      numericInteractionScoreAuthorized: false,
      conflictWinnerAuthorized: false,
      crossRelationPrecedenceAuthorized: false,
      legacyCareerT8MaySubstituteForT6: false,
    }),
    implementationEffects: Object.freeze({
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      previewRoutesChanged: 0,
    }),
    nextDecisionOptions: Object.freeze([
      'NEW_EXTERNAL_INTERACTION_AUTHORITY',
      'SEPARATE_T5_ONLY_T8_SYNTHESIS_METHODOLOGY_REVIEW',
    ]),
    automaticNextPathAuthorized: false,
  });

export function careerT6Decision(dimension: CareerT6Dimension): CareerT6DimensionDecision {
  const found = CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.decisions.find(
    (candidate) => candidate.dimension === dimension,
  );
  if (found === undefined) throw new Error(`Career T6 methodology gate is missing dimension ${dimension}.`);
  return found;
}

export function careerT6MayAuthor(dimension: CareerT6Dimension): boolean {
  return careerT6Decision(dimension).t6AuthoringAuthorized;
}
