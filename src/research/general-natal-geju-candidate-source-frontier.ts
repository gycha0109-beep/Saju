import { createHash } from 'node:crypto';
import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { SourceReference } from '../contracts/interpretation.js';

export const GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_SCOPE =
  'ziping_zhenquan_pingzhu_month_order_candidate_boundary' as const;

export type GeneralNatalGejuCandidatePredicateGap =
  | 'MONTH_ORDER_HIDDEN_STEM_SELECTION_PREDICATE_AUTHORITY_MISSING'
  | 'VISIBLE_STEM_TRANSPARENCY_SELECTION_PREDICATE_AUTHORITY_MISSING'
  | 'BRANCH_MEETING_SELECTION_EFFECT_AUTHORITY_MISSING'
  | 'MULTIPLE_GEJU_CANDIDATE_REPRESENTATION_AUTHORITY_MISSING'
  | 'GEJU_ESTABLISHMENT_SUCCESS_FAILURE_PREDICATE_AUTHORITY_MISSING';

export type GeneralNatalGejuSourceBoundaryKey =
  | 'month_order_primary_organizer'
  | 'month_hidden_content_can_change_selection'
  | 'visible_stem_transparency_is_selection_axis'
  | 'branch_meeting_is_selection_axis'
  | 'multiple_selections_can_coexist'
  | 'candidate_and_establishment_are_distinct';

export interface GeneralNatalGejuCandidateSourceBoundary {
  readonly key: GeneralNatalGejuSourceBoundaryKey;
  readonly sourceBoundaryObserved: true;
  readonly generalizedCanonicalPredicateAuthorized: false;
  readonly productionAuthorityCreated: false;
  readonly sourceIds: readonly string[];
  readonly authorityBoundary: string;
}

export interface GeneralNatalGejuCanonicalObservation {
  readonly path: string;
  readonly status: 'resolved' | 'ambiguous' | 'unavailable' | 'missing';
  readonly sufficientForCandidateDerivation: false;
  readonly authorityBoundary: string;
}

export interface GeneralNatalGejuCandidateSourceFrontierReport {
  readonly reportId: string;
  readonly reportVersion: typeof GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION;
  readonly sourceScope: typeof GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_SCOPE;
  readonly snapshotId: string;
  readonly status: 'source_boundary_observed_predicates_not_authorized';
  readonly monthOrderPrimaryOrganizerSourceBoundary: true;
  readonly transparencyAndBranchMeetingSelectionAxesObserved: true;
  readonly candidateEstablishmentSeparationObserved: true;
  readonly candidateDerivationAuthorized: false;
  readonly establishmentPredicateAuthorized: false;
  readonly candidateFactsEmitted: false;
  readonly establishmentFactsEmitted: false;
  readonly boundaries: readonly GeneralNatalGejuCandidateSourceBoundary[];
  readonly observedCanonicalSubstrate: readonly GeneralNatalGejuCanonicalObservation[];
  readonly openPredicateGaps: readonly GeneralNatalGejuCandidatePredicateGap[];
  readonly notes: readonly string[];
}

const SOURCE_COMMON = {
  sourceType: 'classical_text',
  title: '子平真詮評注',
  language: 'zh-Hant',
  url: 'https://ctext.org/wiki.pl?chapter=974137&if=gb',
  accessedAt: '2026-09-11',
  provenanceTier: 'cross_reference',
  rights: {
    copyrightStatus: 'unknown',
    reusePolicy: 'metadata_only',
  },
} as const;

export const GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_REFERENCES = Object.freeze({
  monthOrderSuccessFailure: {
    ...SOURCE_COMMON,
    sourceId: 'SRC-GEJU-ZIPING-ZHENQUAN-MONTH-ORDER-SUCCESS-FAILURE',
    locator: {
      section: '論用神成敗救應',
      anchor: '用神專尋月令，以四柱配之，必有成敗',
    },
    notes:
      'Research-only source boundary: month order is a primary organizing context, while establishment success/failure still depends on the rest of the chart. This does not authorize a generalized establishment predicate.',
  } satisfies SourceReference,
  monthOrderVariation: {
    ...SOURCE_COMMON,
    sourceId: 'SRC-GEJU-ZIPING-ZHENQUAN-MONTH-ORDER-VARIATION',
    locator: {
      section: '論用神變化',
      anchor: '月令所藏不一，而用神遂有變化',
    },
    notes:
      'Research-only source boundary: multiple month-order contents can change selection. Canonical hidden-stem storage order is not promoted into main/secondary/residual authority.',
  } satisfies SourceReference,
  mixedQiSelection: {
    ...SOURCE_COMMON,
    sourceId: 'SRC-GEJU-ZIPING-ZHENQUAN-MIXED-QI-SELECTION',
    locator: {
      section: '論雜氣如何取用',
      anchor: '透幹會取其清者用之',
    },
    notes:
      'Research-only source boundary: visible-stem transparency and branch meeting are selection axes in the mixed-qi discussion. The phrase does not by itself supply a complete generalized predicate for what counts as 清, how conflicts settle, or how transformations are authorized.',
  } satisfies SourceReference,
  mixedQiPluralSelection: {
    ...SOURCE_COMMON,
    sourceId: 'SRC-GEJU-ZIPING-ZHENQUAN-MIXED-QI-PLURAL-SELECTION',
    locator: {
      section: '論雜氣如何取用',
      anchor: '一透則一用，兼透則兼用，透而又會，則透與會並用',
    },
    notes:
      'Research-only source boundary: the selected source permits plural/coexisting selections. No canonical GEJU_CANDIDATE multiplicity contract is authorized here.',
  } satisfies SourceReference,
});

const SOURCE_IDS = Object.freeze({
  monthOrderSuccessFailure: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_REFERENCES.monthOrderSuccessFailure.sourceId,
  monthOrderVariation: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_REFERENCES.monthOrderVariation.sourceId,
  mixedQiSelection: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_REFERENCES.mixedQiSelection.sourceId,
  mixedQiPluralSelection: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_REFERENCES.mixedQiPluralSelection.sourceId,
});

export const GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_BOUNDARIES = Object.freeze([
  {
    key: 'month_order_primary_organizer',
    sourceBoundaryObserved: true,
    generalizedCanonicalPredicateAuthorized: false,
    productionAuthorityCreated: false,
    sourceIds: [SOURCE_IDS.monthOrderSuccessFailure],
    authorityBoundary:
      'The source makes month order the primary organizing context, but explicitly evaluates the four pillars for success/failure; month branch identity alone is not an established-pattern predicate.',
  },
  {
    key: 'month_hidden_content_can_change_selection',
    sourceBoundaryObserved: true,
    generalizedCanonicalPredicateAuthorized: false,
    productionAuthorityCreated: false,
    sourceIds: [SOURCE_IDS.monthOrderVariation],
    authorityBoundary:
      'Multiple contents of the month order can change selection. Current hidden-stem membership order remains storage-only and cannot be treated as ranking or command-duration authority.',
  },
  {
    key: 'visible_stem_transparency_is_selection_axis',
    sourceBoundaryObserved: true,
    generalizedCanonicalPredicateAuthorized: false,
    productionAuthorityCreated: false,
    sourceIds: [SOURCE_IDS.mixedQiSelection],
    authorityBoundary:
      'Visible-stem transparency is a source-observed selection axis, but the source surface does not by itself authorize a complete generalized 清/conflict/precedence predicate.',
  },
  {
    key: 'branch_meeting_is_selection_axis',
    sourceBoundaryObserved: true,
    generalizedCanonicalPredicateAuthorized: false,
    productionAuthorityCreated: false,
    sourceIds: [SOURCE_IDS.mixedQiSelection],
    authorityBoundary:
      'Branch meeting is a source-observed selection axis. Current canonical structural relations are structural matches and do not establish the source-specific selection/transformation effect.',
  },
  {
    key: 'multiple_selections_can_coexist',
    sourceBoundaryObserved: true,
    generalizedCanonicalPredicateAuthorized: false,
    productionAuthorityCreated: false,
    sourceIds: [SOURCE_IDS.mixedQiPluralSelection],
    authorityBoundary:
      'The source permits plural/coexisting selections, so a future candidate contract must not silently force a single winner before an authorized precedence rule exists.',
  },
  {
    key: 'candidate_and_establishment_are_distinct',
    sourceBoundaryObserved: true,
    generalizedCanonicalPredicateAuthorized: false,
    productionAuthorityCreated: false,
    sourceIds: [SOURCE_IDS.monthOrderSuccessFailure, SOURCE_IDS.mixedQiSelection],
    authorityBoundary:
      'Selection from month-order context and 成格/敗格 judgment are separate semantic stages. A candidate signal must not be promoted directly to established-pattern state.',
  },
] as const satisfies readonly GeneralNatalGejuCandidateSourceBoundary[]);

export const GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS = Object.freeze([
  'MONTH_ORDER_HIDDEN_STEM_SELECTION_PREDICATE_AUTHORITY_MISSING',
  'VISIBLE_STEM_TRANSPARENCY_SELECTION_PREDICATE_AUTHORITY_MISSING',
  'BRANCH_MEETING_SELECTION_EFFECT_AUTHORITY_MISSING',
  'MULTIPLE_GEJU_CANDIDATE_REPRESENTATION_AUTHORITY_MISSING',
  'GEJU_ESTABLISHMENT_SUCCESS_FAILURE_PREDICATE_AUTHORITY_MISSING',
] as const satisfies readonly GeneralNatalGejuCandidatePredicateGap[]);

function stateStatus(value: { readonly status: string } | undefined): GeneralNatalGejuCanonicalObservation['status'] {
  if (value === undefined) return 'missing';
  if (value.status === 'resolved' || value.status === 'ambiguous' || value.status === 'unavailable') {
    return value.status;
  }
  return 'missing';
}

function observeCanonicalSubstrate(
  snapshot: CanonicalSajuSnapshot,
): readonly GeneralNatalGejuCanonicalObservation[] {
  return Object.freeze([
    {
      path: 'pillars.month',
      status: stateStatus(snapshot.pillars.month),
      sufficientForCandidateDerivation: false,
      authorityBoundary:
        'Resolved month pillar identity supplies the structural location only; it does not choose or establish a Gyeokguk candidate.',
    },
    {
      path: 'derivedFacts.hiddenStems.month',
      status: stateStatus(snapshot.derivedFacts.hiddenStems?.month),
      sufficientForCandidateDerivation: false,
      authorityBoundary:
        'Resolved hidden-stem membership is not ranked month-command authority; array order remains storage-only.',
    },
    {
      path: 'derivedFacts.tenGods',
      status: stateStatus(snapshot.derivedFacts.tenGods),
      sufficientForCandidateDerivation: false,
      authorityBoundary:
        'Resolved Ten-God identity does not decide which month-order content is selected or whether a pattern is established.',
    },
    {
      path: 'derivedFacts.structuralRelations',
      status: stateStatus(snapshot.derivedFacts.structuralRelations),
      sufficientForCandidateDerivation: false,
      authorityBoundary:
        'Resolved structural matches do not establish source-specific branch-meeting selection effects or transformation outcomes.',
    },
  ]);
}

export const GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION,
      sourceScope: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_SCOPE,
      sourceIds: Object.values(SOURCE_IDS),
      boundaries: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_BOUNDARIES,
      openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
      candidateDerivationAuthorized: false,
      establishmentPredicateAuthorized: false,
    }),
  )
  .digest('hex');

export function buildGeneralNatalGejuCandidateSourceFrontier(
  snapshot: CanonicalSajuSnapshot,
): GeneralNatalGejuCandidateSourceFrontierReport {
  const observedCanonicalSubstrate = observeCanonicalSubstrate(snapshot);
  const material = {
    reportVersion: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION,
    sourceScope: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_SCOPE,
    snapshotId: snapshot.snapshotId,
    status: 'source_boundary_observed_predicates_not_authorized' as const,
    monthOrderPrimaryOrganizerSourceBoundary: true as const,
    transparencyAndBranchMeetingSelectionAxesObserved: true as const,
    candidateEstablishmentSeparationObserved: true as const,
    candidateDerivationAuthorized: false as const,
    establishmentPredicateAuthorized: false as const,
    candidateFactsEmitted: false as const,
    establishmentFactsEmitted: false as const,
    boundaries: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_BOUNDARIES,
    observedCanonicalSubstrate,
    openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
  };

  return Object.freeze({
    reportId: `general_natal_geju_candidate_source_frontier_${createHash('sha256')
      .update(JSON.stringify(material))
      .digest('hex')
      .slice(0, 24)}`,
    ...material,
    notes: Object.freeze([
      'This report records source-observed selection axes and semantic stage separation; it does not emit GEJU_CANDIDATE or GEJU_ESTABLISHMENT_STATE facts.',
      'Month-order hidden-stem membership must not be ranked from storage order. No main/secondary/residual qi or month-command duration is inferred here.',
      'Source-observed 透干 and 會支 relevance does not authorize a generalized canonical selection effect, transformation, precedence, or conflict-resolution predicate.',
      'Plural/coexisting source selections prohibit silently collapsing all charts to a single Gyeokguk candidate without an authorized representation and precedence contract.',
      'Candidate selection and established-pattern judgment remain separate authority stages.',
      'Product, narrative, LLM, API presentation, and Commerce layers must not manufacture the missing predicates.',
    ]),
  });
}
