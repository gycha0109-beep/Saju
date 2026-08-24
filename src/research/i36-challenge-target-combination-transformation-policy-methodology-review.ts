import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { EarthlyBranch, FiveElement, HeavenlyStem } from '../contracts/calculation.js';

export const I36_CHALLENGE_TARGET_COMBINATION_TRANSFORMATION_POLICY_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-target-combination-transformation-policy-methodology-review-v1';

export type TraditionalStemTransformationReferenceScope =
  'DAY_STEM_SCOPED_REFERENCE_ONLY';

export interface TraditionalStemTransformationReference {
  pair: readonly [HeavenlyStem, HeavenlyStem];
  traditionalElement: FiveElement;
  scope: TraditionalStemTransformationReferenceScope;
  challengeTransformationStateAuthorized: false;
}

export interface TraditionalThreeCombinationBureauReference {
  branches: readonly [EarthlyBranch, EarthlyBranch, EarthlyBranch];
  traditionalBureauElement: Exclude<FiveElement, '토'>;
  fullMembershipRequiredBySource: true;
  structuralMembershipAloneEstablishesEffectiveBureau: false;
  challengeRootTransformationStateAuthorized: false;
}

export interface ChallengeTargetCombinationTransformationPolicyMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'REFERENCE_MAPPINGS_ONLY_TRANSFORMATION_STATE_BLOCKED';
  stemPairTraditionalReferenceEmissionAuthorized: true;
  stemPairReferenceDirectChallengeTransformationUseAuthorized: false;
  stemTransformationDayStemScopeExplicit: true;
  stemTransformationMonthOrTimeConditionDependencyRequired: true;
  stemTransformationCompetingStemInterferenceDependencyRequired: true;
  threeCombinationTraditionalBureauReferenceEmissionAuthorized: true;
  threeCombinationFullMembershipRequired: true;
  threeCombinationFullMembershipEstablishesEffectiveBureau: false;
  threeCombinationClashOrCompetingTopologyCanMatter: true;
  sixCombinationTraditionalTransformedElementMappingResolved: false;
  sixCombinationTransformationTargetElementEmissionAuthorized: false;
  challengeTransformationStateEmissionAuthorized: false;
  combinationBindingStateEmissionAuthorized: false;
  postCombinationSubjectIdentityPolicyResolved: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  stemReferences: readonly TraditionalStemTransformationReference[];
  threeCombinationReferences: readonly TraditionalThreeCombinationBureauReference[];
  sourceBasis: readonly {
    sourceId: string;
    supportType: 'direct_basis' | 'scope_limit' | 'cross_reference';
    finding: string;
  }[];
  requiredNextImplementationGuards: readonly string[];
  notes: readonly string[];
}

export const I36_TRADITIONAL_STEM_TRANSFORMATION_REFERENCES = Object.freeze([
  {
    pair: ['갑', '기'] as const,
    traditionalElement: '토' as const,
    scope: 'DAY_STEM_SCOPED_REFERENCE_ONLY' as const,
    challengeTransformationStateAuthorized: false as const,
  },
  {
    pair: ['을', '경'] as const,
    traditionalElement: '금' as const,
    scope: 'DAY_STEM_SCOPED_REFERENCE_ONLY' as const,
    challengeTransformationStateAuthorized: false as const,
  },
  {
    pair: ['병', '신'] as const,
    traditionalElement: '수' as const,
    scope: 'DAY_STEM_SCOPED_REFERENCE_ONLY' as const,
    challengeTransformationStateAuthorized: false as const,
  },
  {
    pair: ['정', '임'] as const,
    traditionalElement: '목' as const,
    scope: 'DAY_STEM_SCOPED_REFERENCE_ONLY' as const,
    challengeTransformationStateAuthorized: false as const,
  },
  {
    pair: ['무', '계'] as const,
    traditionalElement: '화' as const,
    scope: 'DAY_STEM_SCOPED_REFERENCE_ONLY' as const,
    challengeTransformationStateAuthorized: false as const,
  },
] as const);

export const I36_TRADITIONAL_THREE_COMBINATION_BUREAU_REFERENCES = Object.freeze([
  {
    branches: ['신', '자', '진'] as const,
    traditionalBureauElement: '수' as const,
    fullMembershipRequiredBySource: true as const,
    structuralMembershipAloneEstablishesEffectiveBureau: false as const,
    challengeRootTransformationStateAuthorized: false as const,
  },
  {
    branches: ['사', '유', '축'] as const,
    traditionalBureauElement: '금' as const,
    fullMembershipRequiredBySource: true as const,
    structuralMembershipAloneEstablishesEffectiveBureau: false as const,
    challengeRootTransformationStateAuthorized: false as const,
  },
  {
    branches: ['해', '묘', '미'] as const,
    traditionalBureauElement: '목' as const,
    fullMembershipRequiredBySource: true as const,
    structuralMembershipAloneEstablishesEffectiveBureau: false as const,
    challengeRootTransformationStateAuthorized: false as const,
  },
  {
    branches: ['인', '오', '술'] as const,
    traditionalBureauElement: '화' as const,
    fullMembershipRequiredBySource: true as const,
    structuralMembershipAloneEstablishesEffectiveBureau: false as const,
    challengeRootTransformationStateAuthorized: false as const,
  },
] as const);

export const I36_CHALLENGE_TARGET_COMBINATION_TRANSFORMATION_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-T0-SANMING-TONGHUI-V2',
    supportType: 'scope_limit' as const,
    finding:
      'The 化氣 section explicitly states that transformation is taken with the day stem and its combining counterpart, so its result contract is day-stem scoped and cannot be directly applied to a non-day-master challenge-target stem.',
  },
  {
    sourceId: 'SRC-T0-SANMING-TONGHUI-V2',
    supportType: 'direct_basis' as const,
    finding:
      'The same section records the traditional stem-pair references 甲己→土, 乙庚→金, 丙辛→水, 丁壬→木, 戊癸→火 together with month/time vitality and interfering-stem conditions.',
  },
  {
    sourceId: 'SRC-T0-DITIANSUI-TRUE-TRANSFORMATION-WIKISOURCE',
    supportType: 'cross_reference' as const,
    finding:
      'The true-transformation discussion is framed with day-master examples and requires the transformation qi to connect to month command, reinforcing that combination presence alone is not true transformation.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-WIKISOURCE',
    supportType: 'cross_reference' as const,
    finding:
      'The commentary explicitly distinguishes combination that transforms from combination that does not transform and shows that surrounding root/support and competing relations can change the consequence.',
  },
  {
    sourceId: 'SRC-T0-SANMING-TONGHUI-V2',
    supportType: 'direct_basis' as const,
    finding:
      'The 支元三合 section identifies 申子辰 as water bureau, 巳酉丑 as metal bureau, 亥卯未 as wood bureau, and 寅午戌 as fire bureau, and states that if one of the three is missing it cannot be treated as a transformed three-combination bureau.',
  },
  {
    sourceId: 'SRC-T0-SANMING-TONGHUI-V5',
    supportType: 'cross_reference' as const,
    finding:
      'A separate three-combination discussion again records the four bureau-element correspondences as a structural five-element pattern.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-WIKISOURCE',
    supportType: 'scope_limit' as const,
    finding:
      'The commentary states that full three-branch combination strength can still be affected by clash, spacing, and whether the relevant qi is led out, so full structural membership is necessary evidence but not a sufficient effective-bureau verdict for this challenge-target policy.',
  },
  {
    sourceId: 'SRC-T0-SANMING-TONGHUI-V2',
    supportType: 'scope_limit' as const,
    finding:
      'The 支元六合 section establishes the six pairing relations but does not provide one unambiguous transformed-element result contract suitable for challenge-target emission; six-combination transformed-element mapping therefore remains unresolved here.',
  },
] as const);

const NEXT_IMPLEMENTATION_GUARDS = Object.freeze([
  'If a traditional stem-pair transformation element is exposed, label it explicitly as a day-stem-scoped reference and never as the current challenge-target transformed state.',
  'Preserve the traditional stem-pair mapping separately from month/time vitality, competing-stem interference, support/interference, and relation-precedence dependencies.',
  'For a branch three-combination, expose the traditional bureau element only as a reference attached to an exact full three-branch structural candidate.',
  'Do not treat full three-branch membership as an effective bureau, transformed root state, or effective mechanism force; retain clash/spacing/competing topology dependencies.',
  'Do not emit any branch six-combination transformed element until a dedicated source-backed convention is selected and its scope is audited.',
  'Do not emit transformation, binding, disappearance, preservation, replacement subject identity, or post-combination root state from reference mappings alone.',
  'Keep hidden-only challenge targets outside root-effect transformation subjects and preserve the unresolved earth root convention.',
  'Do not infer effective mechanism force, relation-specific usefulness/harmfulness, numeric scoring, or strong/weak classification.',
] as const);

export function buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview(): ChallengeTargetCombinationTransformationPolicyMethodologyReviewReport {
  const material = {
    reviewVersion:
      I36_CHALLENGE_TARGET_COMBINATION_TRANSFORMATION_POLICY_METHODOLOGY_REVIEW_VERSION,
    decision: 'REFERENCE_MAPPINGS_ONLY_TRANSFORMATION_STATE_BLOCKED' as const,
    stemPairTraditionalReferenceEmissionAuthorized: true as const,
    stemPairReferenceDirectChallengeTransformationUseAuthorized: false as const,
    stemTransformationDayStemScopeExplicit: true as const,
    stemTransformationMonthOrTimeConditionDependencyRequired: true as const,
    stemTransformationCompetingStemInterferenceDependencyRequired: true as const,
    threeCombinationTraditionalBureauReferenceEmissionAuthorized: true as const,
    threeCombinationFullMembershipRequired: true as const,
    threeCombinationFullMembershipEstablishesEffectiveBureau: false as const,
    threeCombinationClashOrCompetingTopologyCanMatter: true as const,
    sixCombinationTraditionalTransformedElementMappingResolved: false as const,
    sixCombinationTransformationTargetElementEmissionAuthorized: false as const,
    challengeTransformationStateEmissionAuthorized: false as const,
    combinationBindingStateEmissionAuthorized: false as const,
    postCombinationSubjectIdentityPolicyResolved: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    stemReferences: I36_TRADITIONAL_STEM_TRANSFORMATION_REFERENCES,
    threeCombinationReferences: I36_TRADITIONAL_THREE_COMBINATION_BUREAU_REFERENCES,
    sourceBasis: I36_CHALLENGE_TARGET_COMBINATION_TRANSFORMATION_SOURCE_BASIS,
    requiredNextImplementationGuards: NEXT_IMPLEMENTATION_GUARDS,
    notes: [
      'I36 separates source-documented traditional mapping references from an actual challenge-target transformation state.',
      'Stem-pair mappings are allowed only as day-stem-scoped reference metadata because the primary 化氣 passage explicitly limits its subject to the day stem and its combining counterpart.',
      'Three-combination bureau elements are source-documented references for exact full structural groups, but effective-bureau state remains blocked by unresolved clash/spacing/lead-out and other context effects.',
      'Six-combination transformed-element mapping remains unresolved rather than importing a popular convention without an explicit source policy.',
      'The next implementation, if any, may expose reference metadata only; it must not convert references into transformed challenge state or downstream force/effect verdicts.',
    ],
  };

  return {
    reviewId: `challenge_target_combination_transformation_policy_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
