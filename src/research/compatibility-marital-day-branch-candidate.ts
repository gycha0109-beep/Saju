import type {
  CrossChartStructuralMatch,
  PairwiseSourceScopeHandoff,
} from './family-pair-source-scope-handoff.js';

const source = Object.freeze({
  id: 'SRC-NAM-KIM-2018-MARITAL-PALACE-PAIR',
  doi: '10.22143/HSS21.9.2.9',
  locators: Object.freeze(['pp. 107–108, § II.1 궁위 궁합론', 'p. 111, n. 12 육합']),
  authorCopySha256: 'adda4474baf27754ca25efed615bdffdc96f55726e0495d42b0e894395c475c0',
});

const interpretations = {
  branch_six_combination: 'supportive_factor',
  branch_clash: 'challenging_factor',
} as const;

interface MaritalDayBranchCandidateBaseV1 {
  readonly scope: 'traditional_marital_palace_comparison';
  readonly source: typeof source;
  readonly subject: PairwiseSourceScopeHandoff['subject'];
  readonly target: PairwiseSourceScopeHandoff['target'];
  readonly review: 'unreviewed';
  readonly pairwiseT10Admitted: false;
}

export type MaritalDayBranchCandidateV1 = MaritalDayBranchCandidateBaseV1 & (
  | { readonly state: 'insufficient_day_pillar' | 'no_covered_factor' }
  | {
      readonly state: 'candidate_factor';
      readonly sourceInterpretation: typeof interpretations[keyof typeof interpretations];
      readonly evidence: CrossChartStructuralMatch;
    }
);

/**
 * The source treats inter-chart Day Branch combination and clash as factors in
 * a traditional marital comparison. This review slice covers only the existing
 * six-combination and clash tables. Other factors and their precedence are open.
 */
export function buildMaritalDayBranchCandidateV1(
  pair: PairwiseSourceScopeHandoff,
): MaritalDayBranchCandidateV1 {
  const base: MaritalDayBranchCandidateBaseV1 = {
    scope: 'traditional_marital_palace_comparison',
    source,
    subject: pair.subject,
    target: pair.target,
    review: 'unreviewed',
    pairwiseT10Admitted: false,
  };
  const day = pair.factualPairObservations.find(item => item.pillarSlot === 'day');
  if (day?.status !== 'both_resolved') return { ...base, state: 'insufficient_day_pillar' };

  for (const match of pair.crossChartStructuralMatches) {
    if (match.subject.factPath !== 'subject.pillars.day.value.branch'
      || match.target.factPath !== 'target.pillars.day.value.branch'
      || match.kind === 'stem_five_combination') continue;
    return {
      ...base,
      state: 'candidate_factor',
      sourceInterpretation: interpretations[match.kind],
      evidence: match,
    };
  }
  return { ...base, state: 'no_covered_factor' };
}
