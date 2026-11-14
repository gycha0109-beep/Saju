import type {
  CanonicalSajuSnapshot, EarthlyBranch, PillarSlot,
} from '../contracts/calculation.js';
import type { PairwiseSourceScopeHandoff } from
  './family-pair-source-scope-handoff.js';
import type { MaritalPalaceIntraChartResearchV1 } from
  './compatibility-marital-palace-intra-chart-research.js';

export const T10_SPOUSE_2025_SCOPE_REVIEW_VERSION =
  'saju-t10-2025-spouse-criteria-scope-review-v1' as const;

export const T10_SPOUSE_2025_SOURCE = Object.freeze({
  author: '김만태',
  year: 2025,
  title: '배우자 인연의 중시로서 궁합(宮合)에 관한 고찰',
  doi: '10.58936/gcr.2025.9.5.3.143',
  originalArticleUrl: 'https://www.namestory.kr/bbs/board.php?bo_table=sub3_1&wr_id=418',
  indexUrl: 'https://www.kci.go.kr/kciportal/landing/article.kci?arti_id=ART003250308',
  verifiedTextLayer: 'AUTHOR_POSTED_INDEXED_ARTICLE_EXCERPT',
  pdfFullTextVerified: false,
  relationScope: 'TRADITIONAL_MARRIAGE_AND_PERSONAL_SPOUSE_CHART',
  criteria: [
    { number: 1, id: 'SAME_DAY_STEM_BRANCH_ELEMENT', kind: 'one_chart_palace' },
    { number: 2, id: 'DAY_BRANCH_OTHER_BRANCH_RELATIONS', kind: 'one_chart_palace' },
    { number: 3, id: 'DAY_BRANCH_SPOUSE_STAR_TOMB_EXHAUST', kind: 'one_chart_spouse_star' },
    { number: 4, id: 'SPOUSE_STAR_WEAK', kind: 'one_chart_spouse_star' },
    { number: 5, id: 'SPOUSE_STAR_VOID_IMBALANCE_MIXED', kind: 'one_chart_spouse_star' },
    { number: 6, id: 'SPOUSE_STAR_TOMB_EXHAUST', kind: 'one_chart_spouse_star' },
    { number: 7, id: 'DAY_MASTER_ELEMENT_ABUNDANCE', kind: 'one_chart_element_strength' },
    { number: 8, id: 'HISTORICAL_FEMALE_OUTPUT_STAR_ABUNDANCE', kind: 'historical_sex_specific' },
    { number: 9, id: 'SPOUSE_PALACE_ELEMENT_ELSEWHERE_ABUNDANCE', kind: 'one_chart_element_strength' },
  ] as const,
  /** Author's relative palace/star importance is not a universal cross-chart weighting. */
  directTwoChartSynthesisRuleVerified: false,
  relationshipOutcomePredictionValidated: false,
});

export interface T102025SingleChartObservation {
  readonly personRef: string;
  readonly snapshotId: string;
  readonly calculationHash: string;
  readonly singleChartPalace: {
    readonly sourceCriterion: 1;
    readonly state: 'same_element' | 'different_element' | 'unresolved_day_pillar';
    readonly observedFactPaths: readonly string[];
    readonly personalSpouseOutcomeAuthorized: false;
  };
  readonly dayBranchOtherPillarRelations: {
    readonly sourceCriterion: 2;
    readonly sourceFactPath: 'derivedFacts.structuralRelations';
    readonly coverage: 'day_branch_clash_only' | 'structure_unavailable';
    readonly observed: readonly Readonly<{
      relationId: string;
      kind: 'branch_clash';
      sourceIds: readonly string[];
      participants: readonly Readonly<{
        factPath: string;
        value: EarthlyBranch;
      }>[];
    }>[];
    readonly allOtherClauseTypesCovered: false;
  };
  /** No spouse-star strength, exceptional stars, bias or source role inference. */
  readonly unassessedCriteria: readonly [3, 4, 5, 6, 7, 8, 9];
  readonly historicalSexSpecificRuleAuthorized: false;
  readonly personalSpouseOutcomeAuthorized: false;
}

export interface T102025SpouseScopeReviewV1 {
  readonly version: typeof T10_SPOUSE_2025_SCOPE_REVIEW_VERSION;
  readonly lifecycle: 'internal_research_only';
  readonly source: typeof T10_SPOUSE_2025_SOURCE;
  readonly subject: T102025SingleChartObservation;
  readonly target: T102025SingleChartObservation;
  readonly comparison: {
    readonly chartsAreIndependent: true;
    readonly bothBirthChartsCompared: false;
    readonly palaceOutranksSpouseStarAsUniversalT10Rule: false;
    readonly directTwoChartSynthesisAvailable: false;
    readonly missingPrerequisites: readonly [
      'FULL_2025_METHODOLOGY_AND_COUNTEREXAMPLES_NOT_VERIFIED',
      'NATAL_SPOUSE_STAR_STRENGTH_AND_EXCEPTIONS_NOT_ESTABLISHED',
      'SOURCE_QUALIFIED_TWO_CHART_SYNTHESIS_NOT_ESTABLISHED',
    ];
  };
  readonly pairwiseT10Admitted: false;
  readonly mayClaimInterpersonalMeaning: false;
  readonly mayGrantOfficialAuthority: false;
  readonly mayPublish: false;
  readonly maySell: false;
}

const SLOTS: readonly PillarSlot[] = ['year', 'month', 'day', 'hour'];

function observeDayBranchClashes(
  snapshot: CanonicalSajuSnapshot,
): T102025SingleChartObservation['dayBranchOtherPillarRelations'] {
  const fact = snapshot.derivedFacts.structuralRelations;
  if (fact?.status !== 'resolved') {
    return {
      sourceCriterion: 2,
      sourceFactPath: 'derivedFacts.structuralRelations',
      coverage: 'structure_unavailable',
      observed: [],
      allOtherClauseTypesCovered: false,
    };
  }

  const found: T102025SingleChartObservation['dayBranchOtherPillarRelations']['observed'][number][] = [];
  for (const relation of fact.value) {
    if (relation.kind !== 'branch_clash') continue;
    const participants = relation.participants;
    if (participants.length !== 2 ||
        !participants.some(p => p.pillar === 'day' && p.component === 'branch') ||
        !participants.some(p => p.pillar !== 'day' && p.component === 'branch')) continue;
    if (!relation.sourceIds.length ||
        !relation.semantics.structuralMatchOnly ||
        relation.semantics.transformationEstablished !== false ||
        participants.some(p => !SLOTS.includes(p.pillar))) {
      throw new TypeError('Source review requires exact structural day-branch provenance.');
    }
    found.push({
      relationId: relation.relationId,
      kind: 'branch_clash',
      sourceIds: [...relation.sourceIds],
      participants: participants.map(p => ({
        factPath: `pillars.${p.pillar}.value.branch`,
        value: p.value as EarthlyBranch,
      })),
    });
  }
  return {
    sourceCriterion: 2,
    sourceFactPath: 'derivedFacts.structuralRelations',
    coverage: 'day_branch_clash_only',
    observed: found.sort((a, b) => a.relationId.localeCompare(b.relationId)),
    allOtherClauseTypesCovered: false,
  };
}

function single(
  snapshot: CanonicalSajuSnapshot,
  personRef: string,
  palace: MaritalPalaceIntraChartResearchV1['subject'],
): T102025SingleChartObservation {
  if (snapshot.snapshotId !== palace.snapshotId ||
      snapshot.calculationHash !== palace.calculationHash ||
      personRef !== palace.personRef || !personRef) {
    throw new TypeError('2025 source inventory may not mix another person or chart.');
  }
  return {
    personRef,
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    singleChartPalace: {
      sourceCriterion: 1,
      state: palace.state,
      observedFactPaths: palace.evidence ? [
        palace.evidence.stemFactPath, palace.evidence.branchFactPath,
      ] : [],
      personalSpouseOutcomeAuthorized: false,
    },
    dayBranchOtherPillarRelations: observeDayBranchClashes(snapshot),
    unassessedCriteria: [3, 4, 5, 6, 7, 8, 9],
    historicalSexSpecificRuleAuthorized: false,
    personalSpouseOutcomeAuthorized: false,
  };
}

/** Source-scoped partial applicability, never an independent T10 meaning rule. */
export function reviewT102025SpouseCriteriaScopeV1(
  pair: PairwiseSourceScopeHandoff,
  palace: MaritalPalaceIntraChartResearchV1,
  subject: CanonicalSajuSnapshot,
  target: CanonicalSajuSnapshot,
): T102025SpouseScopeReviewV1 {
  if (pair.owner !== 'R068_R069' ||
      !pair.researchOnly || pair.pairwiseT10Admitted !== false ||
      pair.maySell !== false || pair.mayPublish !== false ||
      pair.mayGrantOfficialAuthority !== false ||
      palace.researchOnly !== true || palace.pairwiseT10Admitted !== false ||
      palace.maySell !== false || palace.mayPublish !== false ||
      pair.subject.personRef === pair.target.personRef ||
      pair.subject.snapshotId !== subject.snapshotId ||
      pair.target.snapshotId !== target.snapshotId ||
      pair.subject.calculationHash !== subject.calculationHash ||
      pair.target.calculationHash !== target.calculationHash) {
    throw new TypeError('2025 scope review requires independent protected birth charts.');
  }
  return {
    version: T10_SPOUSE_2025_SCOPE_REVIEW_VERSION,
    lifecycle: 'internal_research_only',
    source: T10_SPOUSE_2025_SOURCE,
    subject: single(subject, pair.subject.personRef, palace.subject),
    target: single(target, pair.target.personRef, palace.target),
    comparison: {
      chartsAreIndependent: true,
      bothBirthChartsCompared: false,
      palaceOutranksSpouseStarAsUniversalT10Rule: false,
      directTwoChartSynthesisAvailable: false,
      missingPrerequisites: [
        'FULL_2025_METHODOLOGY_AND_COUNTEREXAMPLES_NOT_VERIFIED',
        'NATAL_SPOUSE_STAR_STRENGTH_AND_EXCEPTIONS_NOT_ESTABLISHED',
        'SOURCE_QUALIFIED_TWO_CHART_SYNTHESIS_NOT_ESTABLISHED',
      ],
    },
    pairwiseT10Admitted: false,
    mayClaimInterpersonalMeaning: false,
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    maySell: false,
  };
}
