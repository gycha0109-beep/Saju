import type { CanonicalSajuSnapshot, FiveElement } from '../contracts/calculation.js';

const SOURCE = Object.freeze({
  id: 'SRC-NAM-KIM-2018-MARITAL-PALACE-INTRA-CHART',
  doi: '10.22143/HSS21.9.2.9',
  reference: '남기동·김만태(2018), 한국사회 이혼현상에 따른 부부궁합의 명리학적 고찰',
  verifiedTextLayer: 'KCI_ABSTRACT_ONLY',
  url: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002338687',
});

/** A single person's day-stem/day-branch five-element identity, not a two-chart claim. */
export interface MaritalPalaceSingleChartObservationV1 {
  readonly personRef: string;
  readonly snapshotId: string;
  readonly calculationHash: string;
  readonly state: 'same_element' | 'different_element' | 'unresolved_day_pillar';
  readonly evidence?: Readonly<{
    stemFactPath: 'pillars.day.value.stem.element';
    branchFactPath: 'pillars.day.value.branch.element';
    stemElement: FiveElement;
    branchElement: FiveElement;
  }>;
}

export interface MaritalPalaceIntraChartResearchV1 {
  readonly version: 'saju-marital-palace-intra-chart-research-v1';
  readonly scope: 'two_independent_natal_observations';
  readonly source: typeof SOURCE;
  readonly subject: MaritalPalaceSingleChartObservationV1;
  readonly target: MaritalPalaceSingleChartObservationV1;
  readonly sourceInterpretation: 'historical_marital_case_study_only';
  readonly pairwiseT10Admitted: false;
  readonly researchOnly: true;
  readonly mayClaimRelationshipOutcome: false;
  readonly mayPublish: false;
  readonly maySell: false;
}

function observe(
  snapshot: CanonicalSajuSnapshot,
  personRef: string,
): MaritalPalaceSingleChartObservationV1 {
  const base = {
    personRef,
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
  };
  const day = snapshot.pillars.day;
  if (day.status !== 'resolved') {
    return { ...base, state: 'unresolved_day_pillar' };
  }
  const stemElement = day.value.stem.element;
  const branchElement = day.value.branch.element;
  return {
    ...base,
    state: stemElement === branchElement ? 'same_element' : 'different_element',
    evidence: {
      stemFactPath: 'pillars.day.value.stem.element',
      branchFactPath: 'pillars.day.value.branch.element',
      stemElement,
      branchElement,
    },
  };
}

/**
 * The 2018 study abstract describes 干與支同 as an intra-chart marital-palace
 * factor in its historical divorced-couple sample. This function preserves the
 * directly calculated observation only: it cannot conclude divorce, affinity,
 * contemporary partnership outcomes, cross-chart compatibility, or T10.
 * Full-text methodology and counterexamples remain for source review.
 */
export function buildMaritalPalaceIntraChartResearchV1(
  subject: { readonly personRef: string; readonly snapshot: CanonicalSajuSnapshot },
  target: { readonly personRef: string; readonly snapshot: CanonicalSajuSnapshot },
): MaritalPalaceIntraChartResearchV1 {
  if (!subject.personRef.trim() || !target.personRef.trim() ||
      subject.personRef.trim() === target.personRef.trim()) {
    throw new TypeError('Marital palace research needs distinct nonblank persons.');
  }
  return {
    version: 'saju-marital-palace-intra-chart-research-v1',
    scope: 'two_independent_natal_observations',
    source: SOURCE,
    subject: observe(subject.snapshot, subject.personRef.trim()),
    target: observe(target.snapshot, target.personRef.trim()),
    sourceInterpretation: 'historical_marital_case_study_only',
    pairwiseT10Admitted: false,
    researchOnly: true,
    mayClaimRelationshipOutcome: false,
    mayPublish: false,
    maySell: false,
  };
}
