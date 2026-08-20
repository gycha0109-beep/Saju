import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const I43_CHALLENGE_ROOT_SIX_COMBINATION_TRANSFORMATION_CONVENTION_SCOPE_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-root-six-combination-transformation-convention-scope-methodology-review-v1';

export interface ChallengeRootSixCombinationTransformationConventionScopeMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'UNIFORM_CHALLENGE_ROOT_SIX_COMBINATION_TRANSFORMED_ELEMENT_ROUTE_BLOCKED';
  sixCombinationStructuralPairingSourceResolved: true;
  sixCombinationStructuralParticipationRemainsValid: true;
  sanmingUniformTransformedElementResultContractAvailable: false;
  externalMappingLikeReferenceObserved: true;
  externalMappingLikeReferenceCompleteUniformElementSet: false;
  externalMappingLikeReferenceDomainMatchesChallengeRootBazi: false;
  externalMappingLikeReferenceDirectAdoptionAuthorized: false;
  sixCombinationTraditionalReferenceElementEmissionAuthorized: false;
  sixCombinationChallengeRootTransformationStateEmissionAuthorized: false;
  sixCombinationChallengeRootTransformationTargetElementAdoptionAuthorized: false;
  sixCombinationNoEffectConclusionAuthorized: false;
  sixCombinationStructuralInteractionEvidenceStillRelevant: true;
  sixCombinationInteractionSettlementPolicyStillRequired: true;
  postCombinationSubjectIdentityPolicyResolved: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  sourceBasis: readonly {
    sourceId: string;
    supportType: 'direct_structure' | 'scope_limit' | 'cross_domain_reference';
    finding: string;
  }[];
  requiredNextImplementationGuards: readonly string[];
  notes: readonly string[];
}

export const I43_CHALLENGE_ROOT_SIX_COMBINATION_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-T0-SANMING-TONGHUI-V2-ZHIYUAN-LIUHE',
    supportType: 'direct_structure' as const,
    finding:
      'The 支元六合 section explicitly establishes 子丑, 寅亥, 卯戌, 辰酉, 巳申, 午未 as six structural yin-yang pairing relations and discusses their harmonizing/relational use.',
  },
  {
    sourceId: 'SRC-T0-SANMING-TONGHUI-V2-ZHIYUAN-LIUHE',
    supportType: 'scope_limit' as const,
    finding:
      'The same section does not provide one uniform transformed-element result contract for all six pairings that can be applied as a challenge-root post-relation transformation rule.',
  },
  {
    sourceId: 'SRC-CROSSDOMAIN-XUANZE-JIYAO-SHANG',
    supportType: 'cross_domain_reference' as const,
    finding:
      'A selection-method text annotates 子丑 with earth, 寅亥 wood, 卯戌 fire, 辰酉 metal, 巳申 water, but annotates 午未 as “午為日，未為月” rather than a sixth uniform transformed element.',
  },
  {
    sourceId: 'SRC-CROSSDOMAIN-XUANZE-JIYAO-SHANG',
    supportType: 'scope_limit' as const,
    finding:
      'That mapping-like material occurs in a calendrical selection context, so it cannot silently become the normative post-relation result contract for a Bazi challenge-root evidence track.',
  },
] as const);

const NEXT_IMPLEMENTATION_GUARDS = Object.freeze([
  'Preserve branch six-combination structural participation and relation identity as valid evidence.',
  'Close the unresolved six-combination transformed-element route rather than selecting a popular mapping convention without a complete same-domain authority contract.',
  'Do not emit a transformed reference element for branch six-combination under the current policy.',
  'Do not interpret blocked transformed-element adoption as proof that 六合 has no structural, binding, interaction, or settlement effect.',
  'Retain seasonal, support/interference, competing-relation, and relation-participant evidence already materialized for six-combination candidates.',
  'Keep binding/interaction settlement, post-combination subject identity, post-relation root state, effective force, usefulness/harmfulness, scoring, and classification unresolved or unauthorized.',
] as const);

export function buildI43ChallengeRootSixCombinationTransformationConventionScopeMethodologyReview(): ChallengeRootSixCombinationTransformationConventionScopeMethodologyReviewReport {
  const material = {
    reviewVersion:
      I43_CHALLENGE_ROOT_SIX_COMBINATION_TRANSFORMATION_CONVENTION_SCOPE_METHODOLOGY_REVIEW_VERSION,
    decision: 'UNIFORM_CHALLENGE_ROOT_SIX_COMBINATION_TRANSFORMED_ELEMENT_ROUTE_BLOCKED' as const,
    sixCombinationStructuralPairingSourceResolved: true as const,
    sixCombinationStructuralParticipationRemainsValid: true as const,
    sanmingUniformTransformedElementResultContractAvailable: false as const,
    externalMappingLikeReferenceObserved: true as const,
    externalMappingLikeReferenceCompleteUniformElementSet: false as const,
    externalMappingLikeReferenceDomainMatchesChallengeRootBazi: false as const,
    externalMappingLikeReferenceDirectAdoptionAuthorized: false as const,
    sixCombinationTraditionalReferenceElementEmissionAuthorized: false as const,
    sixCombinationChallengeRootTransformationStateEmissionAuthorized: false as const,
    sixCombinationChallengeRootTransformationTargetElementAdoptionAuthorized: false as const,
    sixCombinationNoEffectConclusionAuthorized: false as const,
    sixCombinationStructuralInteractionEvidenceStillRelevant: true as const,
    sixCombinationInteractionSettlementPolicyStillRequired: true as const,
    postCombinationSubjectIdentityPolicyResolved: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    sourceBasis: I43_CHALLENGE_ROOT_SIX_COMBINATION_SOURCE_BASIS,
    requiredNextImplementationGuards: NEXT_IMPLEMENTATION_GUARDS,
    notes: [
      'I43 separates well-supported 六合 structural pairing from a transformed-element result convention.',
      'The primary Bazi source supports the six pairings but does not supply one uniform post-relation transformed-element contract for this challenge-root track.',
      'A cross-domain selection text contains five element-like annotations but its 午未 entry is not a sixth uniform element and the source domain does not match the challenge-root Bazi result contract.',
      'Accordingly the transformed-element route is closed rather than left indefinitely unresolved or filled from an incomplete convention.',
      'Negative convention closure is not a no-effect verdict; binding/interaction settlement remains an explicit unresolved effect problem.',
    ],
  };

  return {
    reviewId: `challenge_root_six_combination_transformation_scope_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
