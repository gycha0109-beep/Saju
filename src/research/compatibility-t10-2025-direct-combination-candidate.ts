import type { CrossChartStructuralMatch, PairwiseSourceScopeHandoff } from
  './family-pair-source-scope-handoff.js';
import { STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH } from
  '../calculation/structural-relations.js';

export const T10_2025_DIRECT_CLAUSE_VERSION =
  'saju-t10-2025-direct-combination-source-candidate-v1' as const;

/**
 * Kim (2025) reports an older traditional pairing claim, referencing
 * Baek (1983:189). The author-posted HTML has been read; neither Baek's
 * original page nor the paper's downloadable PDF has been inspected.
 */
export const T10_2025_DIRECT_CLAUSE_SOURCE = Object.freeze({
  author: '김만태',
  year: 2025,
  title: '배우자 인연의 중시로서 궁합(宮合)에 관한 고찰',
  authorPostedTextUrl: 'https://namestory.kr/bbs/board.php?bo_table=sub3_1&wr_id=418',
  verifiedTextLayer: 'AUTHOR_POSTED_INDEXED_HTML_MAIN_TEXT',
  attributedSecondarySource: '백영관(1983), 사주정설, p.189',
  secondaryOriginalVerified: false,
  pdfFullTextVerified: false,
  traditionalScope: 'HISTORICAL_MARRIAGE_PAIRING_CLAIM_ONLY',
  sourceMeaningAuthorized: false,
});

/** The source mentions a person's natal DAY reference and the other's DAY/YEAR. */
export type T102025DirectCandidateOrientation =
  'subject_day_to_target_birth' | 'target_day_to_subject_birth';
export type T102025DirectCandidateOtherSlot = 'day' | 'year';
export type T102025DirectCandidateKind =
  'stem_five_combination' | 'branch_six_combination';

export interface T102025DirectCombinationCandidate {
  readonly orientation: T102025DirectCandidateOrientation;
  readonly anchorPersonRef: string;
  readonly birthPersonRef: string;
  readonly birthPillar: T102025DirectCandidateOtherSlot;
  readonly kind: T102025DirectCandidateKind;
  /** Existing tables are structural facts, not relationship conclusions. */
  readonly evidence: CrossChartStructuralMatch;
  readonly source: typeof T10_2025_DIRECT_CLAUSE_SOURCE;
  readonly historicalPositiveMeaningAdmitted: false;
  readonly currentRelationshipOutcomeAdmitted: false;
}

export interface T102025DirectCombinationResearch {
  readonly version: typeof T10_2025_DIRECT_CLAUSE_VERSION;
  readonly lifecycle: 'internal_research_only';
  readonly source: typeof T10_2025_DIRECT_CLAUSE_SOURCE;
  readonly subject: PairwiseSourceScopeHandoff['subject'];
  readonly target: PairwiseSourceScopeHandoff['target'];
  readonly candidates: readonly T102025DirectCombinationCandidate[];
  /** No matches means no listed structural hit, not poor compatibility. */
  readonly coverage: 'matching_traditional_structures_observed' | 'no_listed_match_observed';
  readonly sourceInterpretationStatus: 'SECONDARY_TRADITIONAL_CLAUSE_UNVALIDATED';
  readonly originalSourceAndOutcomeMissing: readonly [
    'BAEK_1983_P189_PRIMARY_TEXT_NOT_VERIFIED',
    'CROSS_CHART_WEIGHTING_AND_EXCEPTIONS_NOT_SETTLED',
    'REAL_RELATIONSHIP_OUTCOME_NOT_VALIDATED',
  ];
  readonly compatibilityScore: null;
  readonly compatibilityVerdict: null;
  readonly pairwiseT10Admitted: false;
  readonly mayClaimInterpersonalMeaning: false;
  readonly mayGrantOfficialAuthority: false;
  readonly mayPublish: false;
  readonly maySell: false;
}

const SLOTS: readonly T102025DirectCandidateOtherSlot[] = ['day', 'year'];
const KIND_COMPONENT = {
  stem_five_combination: 'stem',
  branch_six_combination: 'branch',
} as const;

function matchesEvidence(match: CrossChartStructuralMatch): boolean {
  return match.pairwiseMeaningAuthorized === false &&
    match.definitionContentHash === STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH &&
    match.sourceIds.length > 0;
}

/**
 * Enumerates source-identified DAY-to-DAY or DAY-to-YEAR combination
 * patterns under BOTH directed interpretations. Does not compute new
 * structural relations or infer auspiciousness from observed combinations.
 */
export function observeT102025DirectCombinationCandidates(
  pair: PairwiseSourceScopeHandoff,
): T102025DirectCombinationResearch {
  if (pair.owner !== 'R068_R069' || pair.researchOnly !== true ||
      pair.pairwiseT10Admitted !== false || pair.mayPublish !== false ||
      pair.maySell !== false || pair.mayGrantOfficialAuthority !== false ||
      !pair.subject.personRef || !pair.target.personRef ||
      pair.subject.personRef === pair.target.personRef ||
      !pair.subject.snapshotId || !pair.target.snapshotId ||
      !pair.subject.calculationHash || !pair.target.calculationHash) {
    throw new TypeError('Traditional direct comparison requires two protected birth identities.');
  }
  const out: T102025DirectCombinationCandidate[] = [];
  const day = pair.factualPairObservations.find(x => x.pillarSlot === 'day');
  const year = pair.factualPairObservations.find(x => x.pillarSlot === 'year');
  for (const match of pair.crossChartStructuralMatches) {
    if (match.kind !== 'stem_five_combination' &&
        match.kind !== 'branch_six_combination') continue;
    if (!matchesEvidence(match)) {
      throw new TypeError('Unverified cross-chart evidence cannot support a source candidate.');
    }
    const component = KIND_COMPONENT[match.kind];
    const orientations = [
      {
        orientation: 'subject_day_to_target_birth' as const,
        anchorPersonRef: pair.subject.personRef,
        birthPersonRef: pair.target.personRef,
        anchorPath: `subject.pillars.day.value.${component}`,
        birthPrefix: 'target',
      },
      {
        orientation: 'target_day_to_subject_birth' as const,
        anchorPersonRef: pair.target.personRef,
        birthPersonRef: pair.subject.personRef,
        anchorPath: `target.pillars.day.value.${component}`,
        birthPrefix: 'subject',
      },
    ];
    for (const orientation of orientations) {
      const anchor = orientation.orientation === 'subject_day_to_target_birth'
        ? match.subject.factPath : match.target.factPath;
      const birth = orientation.orientation === 'subject_day_to_target_birth'
        ? match.target.factPath : match.subject.factPath;
      if (anchor !== orientation.anchorPath) continue;
      for (const slot of SLOTS) {
        if (birth !== `${orientation.birthPrefix}.pillars.${slot}.value.${component}`) {
          continue;
        }
        if ((slot === 'day' && day?.status !== 'both_resolved') ||
            (slot === 'year' && year?.status !== 'both_resolved')) continue;
        out.push({
          orientation: orientation.orientation,
          anchorPersonRef: orientation.anchorPersonRef,
          birthPersonRef: orientation.birthPersonRef,
          birthPillar: slot,
          kind: match.kind,
          evidence: match,
          source: T10_2025_DIRECT_CLAUSE_SOURCE,
          historicalPositiveMeaningAdmitted: false,
          currentRelationshipOutcomeAdmitted: false,
        });
      }
    }
  }
  return {
    version: T10_2025_DIRECT_CLAUSE_VERSION,
    lifecycle: 'internal_research_only',
    source: T10_2025_DIRECT_CLAUSE_SOURCE,
    subject: pair.subject,
    target: pair.target,
    candidates: out,
    coverage: out.length > 0
      ? 'matching_traditional_structures_observed' : 'no_listed_match_observed',
    sourceInterpretationStatus: 'SECONDARY_TRADITIONAL_CLAUSE_UNVALIDATED',
    originalSourceAndOutcomeMissing: [
      'BAEK_1983_P189_PRIMARY_TEXT_NOT_VERIFIED',
      'CROSS_CHART_WEIGHTING_AND_EXCEPTIONS_NOT_SETTLED',
      'REAL_RELATIONSHIP_OUTCOME_NOT_VALIDATED',
    ],
    compatibilityScore: null,
    compatibilityVerdict: null,
    pairwiseT10Admitted: false,
    mayClaimInterpersonalMeaning: false,
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    maySell: false,
  };
}
