import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const I32_CHALLENGE_TARGET_CLASH_DEPENDENCY_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-target-clash-dependency-methodology-review-v1';

export type ChallengeTargetClashReuseDisposition =
  | 'REUSE_AS_GENERIC_STRUCTURAL_SUBSTRATE'
  | 'ADAPT_UNDER_CHALLENGE_NAMESPACE'
  | 'DO_NOT_REUSE_REPORT_CONTRACT';

export interface ChallengeTargetClashReuseAuditItem {
  capability: string;
  disposition: ChallengeTargetClashReuseDisposition;
  rationale: string;
}

export interface ChallengeTargetClashDependencyMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'CHALLENGE_SPECIFIC_CLASH_DEPENDENCY_ADAPTER_REQUIRED';
  i20ReportContractDirectReuseAuthorized: false;
  i20bReportContractDirectReuseAuthorized: false;
  i20cReportContractDirectReuseAuthorized: false;
  i20dReportContractDirectReuseAuthorized: false;
  seasonalElementPhaseReuseAuthorized: true;
  positionalSupportLocatorReuseAuthorized: true;
  seasonalAdvantageCandidateReuseAuthorized: true;
  rescueCandidateTopologyReuseAuthorized: true;
  seasonalAdvantageIsClashWinner: false;
  supportPresenceDeterminesSupportEffect: false;
  rescueCandidateDeterminesSettlement: false;
  challengeRootCandidateIdentityAlignmentRequired: true;
  hiddenOnlyTargetClashRootEffectAuthorized: false;
  earthRootEffectResolutionAuthorized: false;
  challengeSpecificClashDependencyEvidenceImplementationAuthorized: true;
  relativeBranchForceVerdict: 'not_determined';
  clashWinnerVerdict: 'not_determined';
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  reuseAudit: readonly ChallengeTargetClashReuseAuditItem[];
  sourceBasis: readonly {
    sourceId: string;
    supportType: 'direct_basis' | 'cross_reference' | 'scope_limit';
    finding: string;
  }[];
  requiredNextImplementationGuards: readonly string[];
  notes: readonly string[];
}

export const I32_CHALLENGE_TARGET_CLASH_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-I20-SANMING-TONGHUI-WUXING-PHASE-CTEXT',
    supportType: 'direct_basis' as const,
    finding:
      'The 旺/相/休/囚/死 relation is expressed generically between the seasonal command element and another five-element subject, so seasonal phase can be reused as structural evidence without importing a day-master subject contract.',
  },
  {
    sourceId: 'SRC-I19-DITIANSUI-ORIGINAL-WIKISOURCE',
    supportType: 'direct_basis' as const,
    finding:
      'Clash outcome is conditional on relative flourishing and decline, supporting seasonal/force comparison as a prerequisite while rejecting clash-presence-only root destruction.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-WIKISOURCE',
    supportType: 'cross_reference' as const,
    finding:
      'Season, roots, same-element assistance, resource support, and surrounding combinations can alter clash/root outcomes; these factors are relevant evidence channels but are not additive weights or final verdicts.',
  },
  {
    sourceId: 'SRC-I20D-DITIANSUI-ZHANHE-WIKISOURCE',
    supportType: 'direct_basis' as const,
    finding:
      'A clash may be settled or redirected by a combination/meeting relation only when that rescue influence has effective force, so structural rescue topology is a candidate router rather than settlement proof.',
  },
  {
    sourceId: 'SRC-I20C-DITIANSUI-ROOT-SUPPORT-WIKISOURCE',
    supportType: 'scope_limit' as const,
    finding:
      'Visible same-element assistance and branch rooting are qualitatively distinct support channels. Their locations may be projected generically, but the existing I20C report is bound to the day-master/root review pipeline and cannot be reused as a challenge-target result contract.',
  },
] as const);

const REUSE_AUDIT: readonly ChallengeTargetClashReuseAuditItem[] = Object.freeze([
  {
    capability: 'SEASONAL_ELEMENT_PHASE_BY_COMMAND_RELATION',
    disposition: 'REUSE_AS_GENERIC_STRUCTURAL_SUBSTRATE',
    rationale:
      'The phase function depends only on command element and participant element and emits evidence, not a strength verdict.',
  },
  {
    capability: 'POSITIONAL_SAME_ELEMENT_AND_RESOURCE_SUPPORT_LOCATORS',
    disposition: 'ADAPT_UNDER_CHALLENGE_NAMESPACE',
    rationale:
      'Same-element/resource stem and branch positions can be projected for clash participants, but support effect, precedence, and weight remain unresolved.',
  },
  {
    capability: 'SEASONAL_PHASE_ADVANTAGE_CANDIDATE',
    disposition: 'ADAPT_UNDER_CHALLENGE_NAMESPACE',
    rationale:
      'A source-backed phase ordering may identify which participant has the stronger seasonal-phase candidate, but this is not a complete relative-force verdict or clash winner.',
  },
  {
    capability: 'CLASH_RESCUE_RELATION_TOPOLOGY',
    disposition: 'ADAPT_UNDER_CHALLENGE_NAMESPACE',
    rationale:
      'A six- or three-combination sharing a clash participant can be routed as a rescue candidate, but rescue strength/effect and clash settlement remain unresolved.',
  },
  {
    capability: 'I20_I20B_I20C_I20D_REPORT_IDENTITIES_AND_DAY_MASTER_ROOT_BINDINGS',
    disposition: 'DO_NOT_REUSE_REPORT_CONTRACT',
    rationale:
      'The existing reports are chained through day-master root-review identifiers. Reusing those report contracts would mix subject identity even when lower-level structural calculations are generic.',
  },
  {
    capability: 'HIDDEN_ONLY_TARGET_ROOT_CLASH_EFFECT',
    disposition: 'DO_NOT_REUSE_REPORT_CONTRACT',
    rationale:
      'I29 does not establish a rooted target without a visible target-stem anchor, so clash evidence cannot manufacture a root-effect subject for hidden-only target presence.',
  },
  {
    capability: 'EARTH_TARGET_CLASH_ROOT_EFFECT',
    disposition: 'DO_NOT_REUSE_REPORT_CONTRACT',
    rationale:
      'Seasonal/support/rescue evidence may still be observed structurally, but the unresolved earth root convention blocks a resolved earth target root-effect state.',
  },
]);

const NEXT_IMPLEMENTATION_GUARDS = Object.freeze([
  'Consume only I31 root-candidate branch clash participation aligned to the same I29 report and resolved pillar material.',
  'Reuse seasonalElementPhase only as command-element relation evidence for the two clash participant branches.',
  'Project same-element and resource stem/branch positions as named support channels without summing or weighting them.',
  'Emit seasonal advantage only as a candidate and never as a relative-force verdict or clash winner.',
  'Route six- and three-combination relations sharing a clash participant as rescue candidates without assigning rescue strength, rescue effect, or clash settlement.',
  'Do not reuse I20/I20B/I20C/I20D report IDs or day-master root-review contracts as challenge-target identities.',
  'Do not create clash-root effects for hidden-only targets with no visible target-stem anchor.',
  'Keep earth target root-effect resolution blocked by the unresolved earth root convention.',
  'Do not infer target post-relation root state, effective mechanism force, usefulness/harmfulness, numeric scoring, or strong/weak classification.',
] as const);

export function buildI32ChallengeTargetClashDependencyMethodologyReview(): ChallengeTargetClashDependencyMethodologyReviewReport {
  const material = {
    reviewVersion: I32_CHALLENGE_TARGET_CLASH_DEPENDENCY_METHODOLOGY_REVIEW_VERSION,
    decision: 'CHALLENGE_SPECIFIC_CLASH_DEPENDENCY_ADAPTER_REQUIRED' as const,
    i20ReportContractDirectReuseAuthorized: false as const,
    i20bReportContractDirectReuseAuthorized: false as const,
    i20cReportContractDirectReuseAuthorized: false as const,
    i20dReportContractDirectReuseAuthorized: false as const,
    seasonalElementPhaseReuseAuthorized: true as const,
    positionalSupportLocatorReuseAuthorized: true as const,
    seasonalAdvantageCandidateReuseAuthorized: true as const,
    rescueCandidateTopologyReuseAuthorized: true as const,
    seasonalAdvantageIsClashWinner: false as const,
    supportPresenceDeterminesSupportEffect: false as const,
    rescueCandidateDeterminesSettlement: false as const,
    challengeRootCandidateIdentityAlignmentRequired: true as const,
    hiddenOnlyTargetClashRootEffectAuthorized: false as const,
    earthRootEffectResolutionAuthorized: false as const,
    challengeSpecificClashDependencyEvidenceImplementationAuthorized: true as const,
    relativeBranchForceVerdict: 'not_determined' as const,
    clashWinnerVerdict: 'not_determined' as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    reuseAudit: REUSE_AUDIT,
    sourceBasis: I32_CHALLENGE_TARGET_CLASH_SOURCE_BASIS,
    requiredNextImplementationGuards: NEXT_IMPLEMENTATION_GUARDS,
    notes: [
      'I32 separates generic structural calculations from day-master/root report identity: the former may be adapted, the latter may not be reused directly.',
      'Seasonal advantage, positional support, and rescue topology are dependency evidence only and do not constitute a clash winner or root-effect result.',
      'The next adapter should operate only on clash relations already routed to an I31 challenge root candidate, preserving upstream target identity.',
      'Hidden-only and earth boundaries remain fail-closed, and all effective-force/usefulness/classification outputs stay unauthorized.',
    ],
  };

  return {
    reviewId: `challenge_target_clash_dependency_review_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
