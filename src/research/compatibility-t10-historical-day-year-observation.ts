import type { PairwiseSourceScopeHandoff } from './family-pair-source-scope-handoff.js';
import {
  STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH,
  STRUCTURAL_RELATION_SOURCE_CATALOG,
} from '../calculation/structural-relations.js';
import {
  T10_2025_DIRECT_CLAUSE_SOURCE,
  type T102025DirectCombinationResearch,
  type T102025DirectCombinationCandidate,
} from './compatibility-t10-2025-direct-combination-candidate.js';

export const T10_HISTORICAL_DAY_YEAR_OBSERVATION_VERSION =
  'saju-t10-historical-day-year-observation-v1' as const;

export interface T10HistoricalDayYearSentence {
  readonly paragraph: string;
  readonly observedFactPaths: readonly [string, string];
  readonly sourceIds: readonly string[];
  /** Source for the calculated table is separate from the historical clause. */
  readonly calculationSourceUrls: readonly string[];
  readonly historicalClauseUrl: typeof T10_2025_DIRECT_CLAUSE_SOURCE.authorPostedTextUrl;
  readonly definitionContentHash: string;
  readonly historicalMeaningVerified: false;
  readonly interpersonalMeaningAuthorized: false;
}

export interface T10HistoricalDayYearObservation {
  readonly version: typeof T10_HISTORICAL_DAY_YEAR_OBSERVATION_VERSION;
  readonly lifecycle: 'internal_research_only';
  readonly subject: PairwiseSourceScopeHandoff['subject'];
  readonly target: PairwiseSourceScopeHandoff['target'];
  readonly state: 'direct_day_to_year_fact_observed' | 'no_direct_day_to_year_fact_observed';
  readonly sentences: readonly T10HistoricalDayYearSentence[];
  readonly primary1983SourceVerified: false;
  readonly relationshipOutcomeAuthorized: false;
  readonly compatibilityVerdict: null;
  readonly compatibilityScore: null;
  readonly mayGrantOfficialAuthority: false;
  readonly mayPublish: false;
  readonly maySell: false;
}

const CALCULATION_SOURCES = [
  STRUCTURAL_RELATION_SOURCE_CATALOG.yisiZhan,
  STRUCTURAL_RELATION_SOURCE_CATALOG.xuanzeYaolue,
] as const;
function samePerson(
  a: PairwiseSourceScopeHandoff['subject'],
  b: PairwiseSourceScopeHandoff['subject'],
): boolean {
  return a.personRef === b.personRef &&
    a.snapshotId === b.snapshotId &&
    a.calculationHash === b.calculationHash &&
    a.birthTimeKnown === b.birthTimeKnown;
}
function matchesOriginal(
  pair: PairwiseSourceScopeHandoff,
  candidate: T102025DirectCombinationCandidate,
): boolean {
  return pair.crossChartStructuralMatches.some(m =>
    m.kind === candidate.evidence.kind &&
    m.component === candidate.evidence.component &&
    m.subject.factPath === candidate.evidence.subject.factPath &&
    m.subject.value === candidate.evidence.subject.value &&
    m.target.factPath === candidate.evidence.target.factPath &&
    m.target.value === candidate.evidence.target.value &&
    m.definitionContentHash === candidate.evidence.definitionContentHash &&
    m.sourceIds.length === candidate.evidence.sourceIds.length &&
    m.sourceIds.every(id => candidate.evidence.sourceIds.includes(id)));
}

function sentenceFor(
  pair: PairwiseSourceScopeHandoff,
  candidate: T102025DirectCombinationCandidate,
): T10HistoricalDayYearSentence {
  const match = candidate.evidence;
  const component = candidate.kind === 'stem_five_combination' ? 'stem' : 'branch';
  const forward = candidate.orientation === 'subject_day_to_target_birth';
  const anchor = forward ? pair.subject : pair.target;
  const other = forward ? pair.target : pair.subject;
  const anchorPath = (forward ? 'subject' : 'target') +
    '.pillars.day.value.' + component;
  const otherPath = (forward ? 'target' : 'subject') +
    '.pillars.year.value.' + component;
  const matchedAnchorPath = forward ? match.subject.factPath : match.target.factPath;
  const matchedOtherPath = forward ? match.target.factPath : match.subject.factPath;
  if (candidate.birthPillar !== 'year' ||
      candidate.anchorPersonRef !== anchor.personRef ||
      candidate.birthPersonRef !== other.personRef ||
      candidate.source !== T10_2025_DIRECT_CLAUSE_SOURCE ||
      candidate.historicalPositiveMeaningAdmitted !== false ||
      candidate.currentRelationshipOutcomeAdmitted !== false ||
      match.kind !== candidate.kind ||
      match.component !== component ||
      matchedAnchorPath !== anchorPath || matchedOtherPath !== otherPath ||
      match.pairwiseMeaningAuthorized !== false ||
      match.definitionContentHash !== STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH ||
      match.sourceIds.length !== CALCULATION_SOURCES.length ||
      !CALCULATION_SOURCES.every(source => match.sourceIds.includes(source.sourceId)) ||
      !matchesOriginal(pair, candidate)) {
    throw new TypeError('Historical day/year sentence requires exact original charts and sources.');
  }
  const anchorValue = forward ? match.subject.value : match.target.value;
  const otherValue = forward ? match.target.value : match.subject.value;
  const anchorPerson = forward ? '첫 번째 사람' : '두 번째 사람';
  const otherPerson = forward ? '두 번째 사람' : '첫 번째 사람';
  const anchorTerm = component === 'stem' ? '일간' : '일지';
  const otherTerm = component === 'stem' ? '연간' : '연지';
  const relation = component === 'stem' ? '천간오합' : '지지육합';
  return {
    paragraph: anchorPerson + '의 ' + anchorTerm + ' ' + anchorValue + '과 ' +
      otherPerson + '의 ' + otherTerm + ' ' + otherValue + ' 사이에는 ' +
      relation + ' 계산 구조가 관측됩니다. 이 위치를 비교하는 전통 방식은 ' +
      '2025년 연구자의 저술에 소개되지만, 인용된 1983년 원전의 세부 조건과 ' +
      '실제 관계 결과는 검증되지 않았습니다.',
    observedFactPaths: [anchorPath, otherPath],
    sourceIds: [...match.sourceIds],
    calculationSourceUrls: CALCULATION_SOURCES.map(source => source.url),
    historicalClauseUrl: T10_2025_DIRECT_CLAUSE_SOURCE.authorPostedTextUrl,
    definitionContentHash: match.definitionContentHash,
    historicalMeaningVerified: false,
    interpersonalMeaningAuthorized: false,
  };
}

/** Complements existing day/day observations; never double counts them. */
export function buildT10HistoricalDayYearObservation(
  pair: PairwiseSourceScopeHandoff,
  research: T102025DirectCombinationResearch,
): T10HistoricalDayYearObservation {
  if (pair.owner !== 'R068_R069' || pair.researchOnly !== true ||
      pair.pairwiseT10Admitted !== false || pair.maySell !== false ||
      pair.mayPublish !== false || pair.mayGrantOfficialAuthority !== false ||
      research.lifecycle !== 'internal_research_only' ||
      research.pairwiseT10Admitted !== false || research.maySell !== false ||
      research.mayPublish !== false || research.mayClaimInterpersonalMeaning !== false ||
      research.compatibilityVerdict !== null || research.compatibilityScore !== null ||
      research.source !== T10_2025_DIRECT_CLAUSE_SOURCE ||
      research.source.secondaryOriginalVerified !== false ||
      research.sourceInterpretationStatus !== 'SECONDARY_TRADITIONAL_CLAUSE_UNVALIDATED' ||
      !research.originalSourceAndOutcomeMissing.includes(
        'BAEK_1983_P189_PRIMARY_TEXT_NOT_VERIFIED') ||
      !samePerson(pair.subject, research.subject) ||
      !samePerson(pair.target, research.target) ||
      pair.subject.personRef === pair.target.personRef) {
    throw new TypeError('Historical comparison requires two protected source-bound charts.');
  }
  const yearMatches = research.candidates.filter(candidate =>
    candidate.birthPillar === 'year');
  const sentences = yearMatches.map(candidate => sentenceFor(pair, candidate));
  return {
    version: T10_HISTORICAL_DAY_YEAR_OBSERVATION_VERSION,
    lifecycle: 'internal_research_only',
    subject: pair.subject,
    target: pair.target,
    state: sentences.length > 0
      ? 'direct_day_to_year_fact_observed' : 'no_direct_day_to_year_fact_observed',
    sentences,
    primary1983SourceVerified: false,
    relationshipOutcomeAuthorized: false,
    compatibilityVerdict: null,
    compatibilityScore: null,
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    maySell: false,
  };
}
