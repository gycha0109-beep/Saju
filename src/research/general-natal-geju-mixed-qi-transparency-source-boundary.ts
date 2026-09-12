import { createHash } from 'node:crypto';
import type { EarthlyBranch } from '../contracts/calculation.js';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_REFERENCES,
  type GeneralNatalGejuCandidatePredicateGap,
} from './general-natal-geju-candidate-source-frontier.js';

export const GENERAL_NATAL_GEJU_MIXED_QI_TRANSPARENCY_SOURCE_BOUNDARY_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_GEJU_MIXED_QI_TRANSPARENCY_SOURCE_SCOPE =
  'ziping_zhenquan_mixed_qi_transparency_source_scope' as const;

export const GENERAL_NATAL_GEJU_MIXED_QI_MONTH_BRANCHES = Object.freeze([
  '진',
  '술',
  '축',
  '미',
] as const satisfies readonly EarthlyBranch[]);

export type GeneralNatalGejuMixedQiTransparencySourceBoundaryStatus =
  | 'selected_source_scope_applies_selection_predicate_unresolved'
  | 'outside_selected_source_scope';

export interface GeneralNatalGejuMixedQiTransparencySourceBoundaryReport {
  readonly reportId: string;
  readonly reportVersion: typeof GENERAL_NATAL_GEJU_MIXED_QI_TRANSPARENCY_SOURCE_BOUNDARY_VERSION;
  readonly sourceScope: typeof GENERAL_NATAL_GEJU_MIXED_QI_TRANSPARENCY_SOURCE_SCOPE;
  readonly monthBranch: EarthlyBranch;
  readonly status: GeneralNatalGejuMixedQiTransparencySourceBoundaryStatus;
  readonly mixedQiMonthScopePredicateAuthorized: true;
  readonly mixedQiMonthScopeApplies: boolean;
  readonly sourceTransparencyDefinitionObserved: true;
  readonly sourceSingleTransparencySingleUseObserved: true;
  readonly sourcePluralTransparencyPluralUseObserved: true;
  readonly sourceTransparencyAndBranchMeetingJointUseObserved: true;
  readonly canonicalPillarSlotAdmissibilityAuthorized: false;
  readonly exactMatchToTransparencySelectionAuthorized: false;
  readonly transparencySelectionPredicateAuthorized: false;
  readonly branchMeetingSelectionEffectAuthorized: false;
  readonly multipleCandidateRepresentationAuthorized: false;
  readonly candidateDerivationAuthorized: false;
  readonly establishmentPredicateAuthorized: false;
  readonly candidateFactsEmitted: false;
  readonly establishmentFactsEmitted: false;
  readonly sourceIds: readonly string[];
  readonly openPredicateGaps: readonly GeneralNatalGejuCandidatePredicateGap[];
  readonly authorityBoundary: string;
  readonly notes: readonly string[];
}

const SOURCE_IDS = Object.freeze([
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_REFERENCES.mixedQiSelection.sourceId,
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_REFERENCES.mixedQiPluralSelection.sourceId,
]);

export function isGeneralNatalGejuMixedQiMonthBranch(branch: EarthlyBranch): boolean {
  return GENERAL_NATAL_GEJU_MIXED_QI_MONTH_BRANCHES.some((candidate) => candidate === branch);
}

export const GENERAL_NATAL_GEJU_MIXED_QI_TRANSPARENCY_SOURCE_BOUNDARY_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_GEJU_MIXED_QI_TRANSPARENCY_SOURCE_BOUNDARY_VERSION,
        sourceScope: GENERAL_NATAL_GEJU_MIXED_QI_TRANSPARENCY_SOURCE_SCOPE,
        mixedQiMonthBranches: GENERAL_NATAL_GEJU_MIXED_QI_MONTH_BRANCHES,
        sourceIds: SOURCE_IDS,
        mixedQiMonthScopePredicateAuthorized: true,
        sourceTransparencyDefinitionObserved: true,
        sourceSingleTransparencySingleUseObserved: true,
        sourcePluralTransparencyPluralUseObserved: true,
        sourceTransparencyAndBranchMeetingJointUseObserved: true,
        canonicalPillarSlotAdmissibilityAuthorized: false,
        exactMatchToTransparencySelectionAuthorized: false,
        transparencySelectionPredicateAuthorized: false,
        branchMeetingSelectionEffectAuthorized: false,
        multipleCandidateRepresentationAuthorized: false,
        candidateDerivationAuthorized: false,
        establishmentPredicateAuthorized: false,
        openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
      }),
    )
    .digest('hex');

export function buildGeneralNatalGejuMixedQiTransparencySourceBoundary(
  monthBranch: EarthlyBranch,
): GeneralNatalGejuMixedQiTransparencySourceBoundaryReport {
  const mixedQiMonthScopeApplies = isGeneralNatalGejuMixedQiMonthBranch(monthBranch);
  const material = {
    reportVersion: GENERAL_NATAL_GEJU_MIXED_QI_TRANSPARENCY_SOURCE_BOUNDARY_VERSION,
    sourceScope: GENERAL_NATAL_GEJU_MIXED_QI_TRANSPARENCY_SOURCE_SCOPE,
    monthBranch,
    status: mixedQiMonthScopeApplies
      ? ('selected_source_scope_applies_selection_predicate_unresolved' as const)
      : ('outside_selected_source_scope' as const),
    mixedQiMonthScopePredicateAuthorized: true as const,
    mixedQiMonthScopeApplies,
    sourceTransparencyDefinitionObserved: true as const,
    sourceSingleTransparencySingleUseObserved: true as const,
    sourcePluralTransparencyPluralUseObserved: true as const,
    sourceTransparencyAndBranchMeetingJointUseObserved: true as const,
    canonicalPillarSlotAdmissibilityAuthorized: false as const,
    exactMatchToTransparencySelectionAuthorized: false as const,
    transparencySelectionPredicateAuthorized: false as const,
    branchMeetingSelectionEffectAuthorized: false as const,
    multipleCandidateRepresentationAuthorized: false as const,
    candidateDerivationAuthorized: false as const,
    establishmentPredicateAuthorized: false as const,
    candidateFactsEmitted: false as const,
    establishmentFactsEmitted: false as const,
    sourceIds: SOURCE_IDS,
    openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
    authorityBoundary:
      'The selected 子平真詮 mixed-qi passage is scoped to the four tomb/storehouse month branches and explicitly observes transparency-based single/plural usage plus joint transparency/branch-meeting usage. It does not enumerate which canonical pillar slots qualify as 透干, so an exact visible-stem match must not yet be promoted into a governed transparency-selection fact or GEJU_CANDIDATE.',
  };

  return Object.freeze({
    reportId: `general_natal_geju_mixed_qi_transparency_source_boundary_${createHash('sha256')
      .update(JSON.stringify(material))
      .digest('hex')
      .slice(0, 24)}`,
    ...material,
    notes: Object.freeze([
      '四墓/雜氣 source scope is bounded to 辰戌丑未 and must not be generalized to all twelve month branches from this passage alone.',
      'The selected passage defines a source-level transparency axis and explicitly permits one transparent use, plural transparent co-use, and transparency plus branch-meeting joint use.',
      'No year/month/day/hour admissibility policy is inferred from the undifferentiated source wording 干/干頭.',
      'The PR #441 exact visible-stem observations remain observation-only until canonical slot admissibility and source-to-canonical matching semantics are governed.',
      'All five coarse Gyeokguk predicate-authority gaps remain open; no candidate or establishment fact is emitted.',
      'Product, narrative, LLM, API presentation, and Commerce layers must not manufacture the missing positional, conflict, precedence, branch-meeting, candidate, or establishment predicates.',
    ]),
  });
}
