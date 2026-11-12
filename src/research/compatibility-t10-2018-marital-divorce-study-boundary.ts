import type {
  CanonicalSajuSnapshot, PillarSlot, TenGod, FiveElement,
} from '../contracts/calculation.js';
import type { PairwiseSourceScopeHandoff } from './family-pair-source-scope-handoff.js';
import type {
  MaritalPalaceIntraChartResearchV1,
  MaritalPalaceSingleChartObservationV1,
} from './compatibility-marital-palace-intra-chart-research.js';

export const T10_2018_DIVORCE_STUDY_BOUNDARY_VERSION =
  'saju-t10-2018-divorced-couple-source-boundary-v1' as const;

export const T10_2018_DIVORCE_STUDY_SOURCE = Object.freeze({
  authors: '남기동·김만태',
  year: 2018,
  title: '한국사회 이혼현상에 따른 부부궁합(夫婦宮合)의 명리학적 고찰',
  doi: '10.22143/HSS21.9.2.9',
  abstractUrl: 'https://www.kci.go.kr/kciportal/landing/article.kci?arti_id=ART002338687',
  authorIndexUrl: 'https://namestory.kr/bbs/board.php?bo_table=sub3_1&wr_id=147',
  verifiedLayer: 'KCI_PUBLIC_ABSTRACT_AND_AUTHOR_INDEX_ONLY',
  fullArticleMethodRead: false,
  sourcePopulation: 'HISTORICAL_DIVORCED_MARRIED_COUPLES',
  comparedMethodAxes: ['spouse_palace', 'spouse_star'] as const,
  abstractPriorityClaim: 'PALACE_MORE_IMPORTANT_THAN_STAR_IN_REPORTED_DIVORCE_CASES',
  primaryCaseEvidenceAudited: false,
  individualSpouseStarWeaknessThresholdVerified: false,
  validatedPredictionForNewCouples: false,
});

type HistoricalRole = 'husband' | 'wife' | 'not_in_2018_historical_sex_scope';
type PalaceState = MaritalPalaceSingleChartObservationV1['state'];
interface VisibleStar {
  readonly factPath: string;
  readonly pillar: PillarSlot;
  readonly channel: 'stem' | 'branch';
  readonly value: TenGod;
}
export interface T102018SpouseAxisObservation {
  readonly personRef: string;
  readonly snapshotId: string;
  readonly calculationHash: string;
  readonly historicalRole: HistoricalRole;
  readonly palaceState: PalaceState;
  readonly palaceObservedFactPaths: readonly string[];
  readonly visibleSpouseStarKind: '재성' | '관성' | null;
  readonly visibleSpouseStarPositions: readonly VisibleStar[];
  readonly unobservedStarFactPaths: readonly string[];
  readonly visibleSlotCount: number;
  readonly spouseStarStrengthVerified: false;
  readonly palaceOrStarIndicatesRealOutcome: false;
  readonly paragraph: string;
}

export interface T102018DivorcedCoupleSourceBoundaryV1 {
  readonly version: typeof T10_2018_DIVORCE_STUDY_BOUNDARY_VERSION;
  readonly lifecycle: 'internal_research_only';
  readonly source: typeof T10_2018_DIVORCE_STUDY_SOURCE;
  readonly subject: T102018SpouseAxisObservation;
  readonly target: T102018SpouseAxisObservation;
  readonly historicalSexScope: 'male_female_pair_in_original_marital_scope' |
    'original_historical_sex_roles_not_applicable';
  readonly palaceVsStarSourceClaim: 'abstract_reports_palace_priority_in_divorced_cases';
  readonly palaceOutranksStarForThisPair: false;
  readonly weakStarConditionEstablished: false;
  readonly twoPersonOutcomeRuleEstablished: false;
  readonly missingPrerequisites: readonly [
    'FULL_2018_CASES_AND_METHOD_EXCEPTIONS_UNREAD',
    'SPOUSE_STAR_STRENGTH_OR_WEAKNESS_NOT_ESTABLISHED',
    'MARITAL_SOURCE_OUTCOME_VALIDATION_MISSING',
    'PALACE_VS_STAR_PRIORITY_NOT_TRANSFERABLE_TO_INDIVIDUAL_PAIR',
  ];
  readonly sourceQualifiedT10Conclusion: null;
  readonly compatibilityScore: null;
  readonly mayGrantOfficialAuthority: false;
  readonly mayPublish: false;
  readonly mayPersist: false;
  readonly maySell: false;
}

const SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];
const CHANNELS = ['stem', 'branch'] as const;
const HUSBAND_STARS = ['정재', '편재'] as const satisfies readonly TenGod[];
const WIFE_STARS = ['정관', '편관'] as const satisfies readonly TenGod[];

function verifyPalace(
  chart: CanonicalSajuSnapshot,
  palace: MaritalPalaceSingleChartObservationV1,
): void {
  if (chart.snapshotId !== palace.snapshotId ||
      chart.calculationHash !== palace.calculationHash) {
    throw new TypeError('2018 study palace observation does not belong to its chart.');
  }
  const day = chart.pillars.day;
  const expectedState = day.status !== 'resolved'
    ? 'unresolved_day_pillar'
    : day.value.stem.element === day.value.branch.element
      ? 'same_element' : 'different_element';
  const exactEvidence = day.status === 'resolved' && palace.evidence &&
    palace.evidence.stemFactPath === 'pillars.day.value.stem.element' &&
    palace.evidence.branchFactPath === 'pillars.day.value.branch.element' &&
    palace.evidence.stemElement === day.value.stem.element &&
    palace.evidence.branchElement === day.value.branch.element;
  if (palace.state !== expectedState ||
      (day.status === 'resolved' && !exactEvidence) ||
      (day.status !== 'resolved' && palace.evidence !== undefined)) {
    throw new TypeError('2018 study palace observation does not match canonical day facts.');
  }
}

function observe(
  chart: CanonicalSajuSnapshot,
  palace: MaritalPalaceSingleChartObservationV1,
  personRef: string,
  role: HistoricalRole,
  label: string,
): T102018SpouseAxisObservation {
  verifyPalace(chart, palace);
  const starKind = role === 'husband' ? '재성'
    : role === 'wife' ? '관성' : null;
  const desired: readonly TenGod[] = role === 'husband' ? HUSBAND_STARS
    : role === 'wife' ? WIFE_STARS : [];
  const observed: VisibleStar[] = [];
  const missing: string[] = [];
  if (starKind !== null) {
    const tenGods = chart.derivedFacts.tenGods;
    for (const pillar of SLOTS) {
      for (const channel of CHANNELS) {
        if (pillar === 'day' && channel === 'stem') continue;
        const factPath = `derivedFacts.tenGods.${pillar}.${channel}`;
        const fact = tenGods.status === 'resolved'
          ? tenGods.value[pillar][channel] : undefined;
        if (fact?.status !== 'resolved') {
          missing.push(factPath);
        } else if (desired.includes(fact.value as TenGod)) {
          observed.push({ factPath, pillar, channel, value: fact.value as TenGod });
        }
      }
    }
  }
  const facts = palace.evidence ? [
    'pillars.day.value.stem.element',
    'pillars.day.value.branch.element',
  ] : [];
  const dayText = palace.state === 'same_element'
    ? '일간과 일지의 오행이 같은 구조가 관측됩니다.'
    : palace.state === 'different_element'
      ? '일간과 일지의 오행이 다른 구조가 관측됩니다.'
      : '일간·일지의 계산 정보가 부족하여 해당 구조를 관측할 수 없습니다.';
  const starText = starKind
    ? `역사적 ${role === 'husband' ? '남편' : '부인'} 역할에서 ${starKind}의 보이는 위치는 ${observed.length}곳입니다. ` +
      '이 수치만으로 실제 재성·관성의 강약을 판정할 수 없습니다.'
    : '2018년 이별 부부 연구의 역사적 남편·부인 역할 조건은 두 명식에 적용되지 않습니다.';
  return {
    personRef,
    snapshotId: chart.snapshotId,
    calculationHash: chart.calculationHash,
    historicalRole: role,
    palaceState: palace.state,
    palaceObservedFactPaths: facts,
    visibleSpouseStarKind: starKind,
    visibleSpouseStarPositions: observed,
    unobservedStarFactPaths: missing,
    visibleSlotCount: observed.length,
    spouseStarStrengthVerified: false,
    palaceOrStarIndicatesRealOutcome: false,
    paragraph: label + ': ' + dayText + ' ' + starText,
  };
}

/**
 * The 2018 authors compare spouse palace and spouse star within historical
 * divorced-couple cases. This audits existing chart facts and never transfers
 * sample-level priority, weakness, divorce or compatibility to the pair.
 */
export function auditT102018DivorcedCoupleMethodBoundaryV1(
  pair: PairwiseSourceScopeHandoff,
  palace: MaritalPalaceIntraChartResearchV1,
  subject: CanonicalSajuSnapshot,
  target: CanonicalSajuSnapshot,
): T102018DivorcedCoupleSourceBoundaryV1 {
  if (pair.owner !== 'R068_R069' ||
      pair.researchOnly !== true ||
      pair.pairwiseT10Admitted !== false ||
      pair.maySell !== false || pair.mayPublish !== false ||
      palace.researchOnly !== true ||
      palace.pairwiseT10Admitted !== false ||
      palace.maySell !== false ||
      palace.source.doi !== T10_2018_DIVORCE_STUDY_SOURCE.doi ||
      palace.source.verifiedTextLayer !== 'KCI_ABSTRACT_ONLY' ||
      palace.scope !== 'two_independent_natal_observations' ||
      pair.subject.personRef === pair.target.personRef ||
      pair.subject.personRef !== palace.subject.personRef ||
      pair.target.personRef !== palace.target.personRef ||
      pair.subject.snapshotId !== subject.snapshotId ||
      pair.target.snapshotId !== target.snapshotId ||
      pair.subject.calculationHash !== subject.calculationHash ||
      pair.target.calculationHash !== target.calculationHash ||
      subject.policy.policyId !== target.policy.policyId ||
      subject.policy.policyVersion !== target.policy.policyVersion) {
    throw new TypeError('2018 study requires protected identical independent source charts.');
  }
  const firstSex = subject.input.sexForTraditionalCalculation ?? 'unspecified';
  const secondSex = target.input.sexForTraditionalCalculation ?? 'unspecified';
  const historicallyPaired = (firstSex === 'male' && secondSex === 'female') ||
    (firstSex === 'female' && secondSex === 'male');
  const firstRole: HistoricalRole = historicallyPaired
    ? firstSex === 'male' ? 'husband' : 'wife'
    : 'not_in_2018_historical_sex_scope';
  const secondRole: HistoricalRole = historicallyPaired
    ? secondSex === 'male' ? 'husband' : 'wife'
    : 'not_in_2018_historical_sex_scope';
  return {
    version: T10_2018_DIVORCE_STUDY_BOUNDARY_VERSION,
    lifecycle: 'internal_research_only',
    source: T10_2018_DIVORCE_STUDY_SOURCE,
    subject: observe(subject, palace.subject, pair.subject.personRef, firstRole,
      '첫 번째 사람'),
    target: observe(target, palace.target, pair.target.personRef, secondRole,
      '두 번째 사람'),
    historicalSexScope: historicallyPaired
      ? 'male_female_pair_in_original_marital_scope'
      : 'original_historical_sex_roles_not_applicable',
    palaceVsStarSourceClaim: 'abstract_reports_palace_priority_in_divorced_cases',
    palaceOutranksStarForThisPair: false,
    weakStarConditionEstablished: false,
    twoPersonOutcomeRuleEstablished: false,
    missingPrerequisites: [
      'FULL_2018_CASES_AND_METHOD_EXCEPTIONS_UNREAD',
      'SPOUSE_STAR_STRENGTH_OR_WEAKNESS_NOT_ESTABLISHED',
      'MARITAL_SOURCE_OUTCOME_VALIDATION_MISSING',
      'PALACE_VS_STAR_PRIORITY_NOT_TRANSFERABLE_TO_INDIVIDUAL_PAIR',
    ],
    sourceQualifiedT10Conclusion: null,
    compatibilityScore: null,
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    mayPersist: false,
    maySell: false,
  };
}
