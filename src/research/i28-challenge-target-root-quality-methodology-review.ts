import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const I28_CHALLENGE_TARGET_ROOT_QUALITY_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-target-root-quality-methodology-review-v1';

export type ChallengeTargetRootReuseDisposition =
  | 'REUSE_AS_STRUCTURAL_SUBSTRATE'
  | 'ADAPT_UNDER_CHALLENGE_NAMESPACE'
  | 'DO_NOT_REUSE_DIRECTLY';

export interface ChallengeTargetRootReuseAuditItem {
  capability: string;
  disposition: ChallengeTargetRootReuseDisposition;
  rationale: string;
}

export interface ChallengeTargetRootQualityMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'CHALLENGE_SPECIFIC_MODIFIED_REUSE_REQUIRED';
  generalRootSemanticsBeyondDayMasterSupported: true;
  i18cDirectReuseAuthorized: false;
  visibleTargetStemAnchorRequired: true;
  hiddenOnlyTargetMembershipIsRootQuality: false;
  nonEarthBranchLocatorReuseAuthorized: true;
  earthRootConventionResolved: false;
  challengeSpecificCandidateEvidenceImplementationAuthorized: true;
  targetIntrinsicRootQualityVerdict: 'not_determined';
  targetPostRelationForceState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  reuseAudit: readonly ChallengeTargetRootReuseAuditItem[];
  sourceBasis: readonly {
    sourceId: string;
    supportType: 'direct_basis' | 'cross_reference' | 'scope_limit';
    finding: string;
  }[];
  requiredNextImplementationGuards: readonly string[];
  notes: readonly string[];
}

export const I28_CHALLENGE_TARGET_ROOT_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-WIKISOURCE',
    supportType: 'direct_basis' as const,
    finding:
      'The 衰旺 commentary explicitly ranks 長生/祿/旺 roots as heavier and 墓庫/餘氣 roots as lighter in a day-stem strength context, so the I18C class ordering has a direct day-master basis.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-WIKISOURCE',
    supportType: 'direct_basis' as const,
    finding:
      'Elsewhere the commentary describes non-day-master entities such as 壬水, 官印, 財星, and 官星 with 通根/無根/有氣 language, showing that rootedness as a structural concept is not exclusive to the day master.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-WIKISOURCE',
    supportType: 'scope_limit' as const,
    finding:
      'The explicit heavy-versus-light root comparison is stated for 日干/日主; the source does not directly authorize copying the I18C day-master claim contract onto an abstract challenge target element with no manifested target stem.',
  },
  {
    sourceId: 'SRC-I18C-XIEJI-FIVE-ELEMENT-GROWTH',
    supportType: 'cross_reference' as const,
    finding:
      'The five-element growth-stage locations corroborate non-earth branch locators but preserve competing earth growth-stage conventions, so earth root class must remain unresolved.',
  },
] as const);

const REUSE_AUDIT: readonly ChallengeTargetRootReuseAuditItem[] = Object.freeze([
  {
    capability: 'HIDDEN_STEM_MEMBERSHIP',
    disposition: 'REUSE_AS_STRUCTURAL_SUBSTRATE',
    rationale:
      'Branch hidden-stem membership is deterministic structural data and can locate whether a target-element stem is contained in a branch without assigning root quality by itself.',
  },
  {
    capability: 'NON_EARTH_STRONG_AND_RESIDUAL_BRANCH_LOCATORS',
    disposition: 'ADAPT_UNDER_CHALLENGE_NAMESPACE',
    rationale:
      'The I18C non-earth branch sets may seed challenge-specific root-location candidates only when a manifested target stem anchors the rootedness question; the day-master claim contract is not reused.',
  },
  {
    capability: 'I18C_ROOT_CLASS_LABELS_AND_CLAIM_TYPES',
    disposition: 'DO_NOT_REUSE_DIRECTLY',
    rationale:
      'I18C labels, methodology family, subject, polarity, and claim types are day-master-strength artifacts and would overstate source support if attached directly to an abstract mechanism target element.',
  },
  {
    capability: 'HIDDEN_ONLY_TARGET_ELEMENT_PRESENCE',
    disposition: 'DO_NOT_REUSE_DIRECTLY',
    rationale:
      'An element appearing only as branch-main or hidden membership remains structural presence evidence; without a target-stem anchor it is not automatically a root-quality verdict.',
  },
  {
    capability: 'EARTH_ROOT_CLASS',
    disposition: 'DO_NOT_REUSE_DIRECTLY',
    rationale:
      'The competing earth growth-stage conventions already preserved by I18C remain unresolved and cannot be silently normalized for challenge targets.',
  },
]);

const NEXT_IMPLEMENTATION_GUARDS = Object.freeze([
  'Require at least one visible heavenly stem of the mechanism target element before emitting challenge-target root-class candidate evidence.',
  'Keep branch-main-element and hidden-membership evidence as structural presence when no visible target stem anchors rootedness.',
  'Use a challenge-specific methodology ID, claim type, subject, and report namespace instead of reusing I18C day-master-strength claims.',
  'Reuse non-earth I18C branch sets only as source-bounded candidate locators, not as an effective-force magnitude.',
  'Preserve earth root class as unresolved until an explicit source-backed convention policy is selected.',
  'Do not infer post-relation root state, effective mechanism force, usefulness/harmfulness, final strength, or numeric weight from intrinsic root candidates.',
] as const);

export function buildI28ChallengeTargetRootQualityMethodologyReview(): ChallengeTargetRootQualityMethodologyReviewReport {
  const material = {
    reviewVersion: I28_CHALLENGE_TARGET_ROOT_QUALITY_METHODOLOGY_REVIEW_VERSION,
    decision: 'CHALLENGE_SPECIFIC_MODIFIED_REUSE_REQUIRED' as const,
    generalRootSemanticsBeyondDayMasterSupported: true as const,
    i18cDirectReuseAuthorized: false as const,
    visibleTargetStemAnchorRequired: true as const,
    hiddenOnlyTargetMembershipIsRootQuality: false as const,
    nonEarthBranchLocatorReuseAuthorized: true as const,
    earthRootConventionResolved: false as const,
    challengeSpecificCandidateEvidenceImplementationAuthorized: true as const,
    targetIntrinsicRootQualityVerdict: 'not_determined' as const,
    targetPostRelationForceState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    reuseAudit: REUSE_AUDIT,
    sourceBasis: I28_CHALLENGE_TARGET_ROOT_SOURCE_BASIS,
    requiredNextImplementationGuards: NEXT_IMPLEMENTATION_GUARDS,
    notes: [
      'I28 authorizes only a challenge-specific candidate-evidence adapter; it does not authorize direct I18C pack reuse.',
      'The source supports rootedness beyond the day master, but the exact I18C heavy/light contract is directly stated in a day-master context and must be adapted conservatively.',
      'A challenge target is initially an abstract relation-derived element. Root semantics require a manifested stem anchor rather than treating every hidden membership as a root automatically.',
      'The next implementation must remain intrinsic/pre-relation and non-numeric; post-relation state and effective force stay separate gates.',
    ],
  };

  return {
    reviewId: `challenge_target_root_quality_review_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
