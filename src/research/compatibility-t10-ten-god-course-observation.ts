import type {
  CanonicalSajuSnapshot, HeavenlyStem, PillarSlot, TenGod,
} from '../contracts/calculation.js';
import type { PairwiseSourceScopeHandoff } from
  './family-pair-source-scope-handoff.js';
import type { T10ClassicalCrossTenGodResearch } from
  './compatibility-t10-classical-cross-ten-god.js';

/**
 * Source tiers are distinct: the dissertation abstract provides the six
 * historically gendered courses, while the 2024 public book EXCERPT reports
 * scoring and rooting/transparency conditions. It does not expose sufficient
 * original-chart strength methodology to execute those grades.
 */
export const T10_TEN_GOD_COURSE_SOURCES = {
  dissertation: {
    author: '나혁진', year: 2017,
    title: '명리 궁합론의 현대적 재해석에 관한 연구',
    url: 'https://www.riss.kr/link?id=T14398372',
    evidenceLayer: 'RISS_PUBLIC_ABSTRACT',
  },
  bookExcerpt: {
    attributedAuthors: ['김기승', '나혁진'],
    title: '현대사주심리학: 십성코스 궁합론',
    publishedExcerptDate: '2024-10-22',
    url: 'https://career-consulting-center.tistory.com/466',
    evidenceLayer: 'PUBLIC_THIRD_PARTY_BOOK_EXCERPT',
    originalMeasurementAndValidationReproduced: false,
  },
} as const;

const SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];
const CHANNELS = ['stem', 'branch'] as const;
const COURSE_DEFINITIONS = [
  { id: 'male_food_to_wealth', role: 'male', name: '식상생재',
    a: ['식신', '상관'], b: ['정재', '편재'] },
  { id: 'male_wealth_to_official', role: 'male', name: '재생관',
    a: ['정재', '편재'], b: ['정관', '편관'] },
  { id: 'male_peer_vs_wealth', role: 'male', name: '비겁·재성',
    a: ['비견', '겁재'], b: ['정재', '편재'] },
  { id: 'female_official_to_resource', role: 'female', name: '관인상생',
    a: ['정관', '편관'], b: ['정인', '편인'] },
  { id: 'female_wealth_to_official', role: 'female', name: '재생관',
    a: ['정재', '편재'], b: ['정관', '편관'] },
  { id: 'female_food_vs_official', role: 'female', name: '식상·관성',
    a: ['식신', '상관'], b: ['정관', '편관'] },
] as const satisfies readonly {
  id: string; role: 'male' | 'female'; name: string;
  a: readonly TenGod[]; b: readonly TenGod[];
}[];

type Course = typeof COURSE_DEFINITIONS[number];
type Role = Course['role'];
type Group = 'a' | 'b';

/**
 * An EXACT stem character is visible in one of this same natal chart's
 * canonical hidden-stem arrays. No root quality, strength, grade or effect
 * may be inferred from such a literal character match.
 */
export interface T10VisibleStemHiddenStemMatch {
  readonly visibleTenGodFactPath: string;
  readonly visibleStemFactPath: string;
  readonly visibleStem: HeavenlyStem;
  readonly branchFactPath: string;
  readonly hiddenStemCollectionFactPath: string;
  readonly sameStemCharacterObserved: true;
  readonly sourceQualifiedRootingEstablished: false;
}

export interface T10TenGodCourseMethodInputAudit {
  readonly sourceStep: 1 | 2 | 3;
  readonly sourceCondition:
    'rooted_expressed_wealth_or_resource' |
    'rooted_expressed_wealth_and_official' |
    'relative_strength_and_balance';
  /** The 2024 excerpt uses original-chart rooting/strength conditions.
   * A representative branch ten-god label is NOT a verified root. */
  readonly inspectedGroups: readonly Readonly<{
    group: Group;
    stemVisibleFactPaths: readonly string[];
    representativeBranchFactPaths: readonly string[];
    bothDisplayChannelsObserved: boolean;
    groupUnresolvedFactPaths: readonly string[];
    /** Literal stem-to-hidden-stem cross-reference inside this ONE chart. */
    sameStemHiddenStemMatches: readonly T10VisibleStemHiddenStemMatch[];
    unresolvedHiddenStemFactPaths: readonly string[];
  }>[];
  readonly actualRootingEstablished: false;
  readonly originalStemExpressionMethodValidated: false;
  readonly originalCombinationClashEffectsSettled: false;
  readonly originalStrengthBalanceEstablished: false;
  readonly sourceGrade: null;
  readonly paragraph: string;
}

export interface T10TenGodCourseVisibleObservation {
  readonly courseId: Course['id'];
  readonly historicalRole: Role;
  readonly personRef: string;
  readonly calculationHash: string;
  readonly label: string;
  readonly groups: readonly Readonly<{
    group: Group;
    terms: readonly TenGod[];
    actualVisiblePositions: readonly Readonly<{
      path: string; slot: PillarSlot; channel: 'stem' | 'branch'; value: TenGod;
    }>[];
    unresolvedFactPaths: readonly string[];
  }>[];
  readonly visibleGroupState:
    'both_seen' | 'only_a_seen' | 'only_b_seen' | 'neither_seen';
  readonly anyUnresolvedCanonicalSlots: boolean;
  readonly methodInputAudit: T10TenGodCourseMethodInputAudit;
  readonly strengthAndRootingEstablished: false;
  readonly sourceGradingConditionsSatisfied: false;
  readonly grade: null;
  readonly paragraph: string;
}

export interface T10TenGodCourseResearchV1 {
  readonly version: 'saju-t10-ten-god-course-observations-v1';
  readonly lifecycle: 'internal_research_only';
  readonly source: typeof T10_TEN_GOD_COURSE_SOURCES;
  readonly historicalScope: T10ClassicalCrossTenGodResearch['historicalScope'];
  readonly subject: PairwiseSourceScopeHandoff['subject'];
  readonly target: PairwiseSourceScopeHandoff['target'];
  readonly courses: readonly T10TenGodCourseVisibleObservation[];
  readonly sourceGradingTableDescribedButNotExecutable: true;
  readonly missingMethodPrerequisites: readonly [
    'ORIGINAL_ROOTING_TRANSPARENCY_AND_STRENGTH_RULE',
    'COURSE_GENERATION_AND_CONFLICT_VERIFICATION',
    'COMPLETE_REPRODUCIBLE_2017_MEASUREMENT_TABLE',
    'INDEPENDENT_MODERN_RELATIONSHIP_OUTCOME_VALIDATION',
  ];
  readonly compatibilityScore: null;
  readonly interpretationVerdict: null;
  readonly mayPublish: false;
  readonly maySell: false;
  readonly pairwiseT10Admitted: false;
}

function same(
  a: PairwiseSourceScopeHandoff['subject'],
  personRef: string, snapshot: CanonicalSajuSnapshot,
): boolean {
  return a.personRef === personRef &&
    a.snapshotId === snapshot.snapshotId &&
    a.calculationHash === snapshot.calculationHash;
}

function observeCourse(
  def: Course, personRef: string, snapshot: CanonicalSajuSnapshot,
): T10TenGodCourseVisibleObservation {
  const chart = snapshot.derivedFacts.tenGods;
  const slots: { path: string; slot: PillarSlot;
    channel: 'stem' | 'branch'; value: TenGod | null }[] = [];
  for (const slot of SLOTS) {
    for (const channel of CHANNELS) {
      if (slot === 'day' && channel === 'stem') continue;
      const fact = chart.status === 'resolved' ? chart.value[slot][channel] : undefined;
      if (fact?.status === 'resolved' && fact.value === '일간') {
        throw new TypeError('T10 source course cannot classify a Day Master as a ten god.');
      }
      slots.push({
        path: `derivedFacts.tenGods.${slot}.${channel}`,
        slot, channel,
        value: fact?.status === 'resolved' && fact.value !== '일간'
          ? fact.value : null,
      });
    }
  }
  const groups = (['a', 'b'] as const).map(group => {
    const terms: readonly TenGod[] = def[group];
    return {
      group, terms,
      actualVisiblePositions: slots.filter(item =>
        item.value !== null && terms.includes(item.value)).map(item => ({
        path: item.path, slot: item.slot, channel: item.channel,
        value: item.value!,
      })),
      unresolvedFactPaths: slots.filter(item => item.value === null)
        .map(item => item.path),
    };
  });
  const groupA = groups[0]!;
  const groupB = groups[1]!;
  const hasA = groupA.actualVisiblePositions.length > 0;
  const hasB = groupB.actualVisiblePositions.length > 0;
  const visibleGroupState = hasA && hasB ? 'both_seen'
    : hasA ? 'only_a_seen' : hasB ? 'only_b_seen' : 'neither_seen';
  const step = def.id === 'male_food_to_wealth' ||
    def.id === 'female_official_to_resource' ? 1
    : def.id === 'male_wealth_to_official' ||
      def.id === 'female_wealth_to_official' ? 2 : 3;
  const sourceCondition = step === 1
    ? 'rooted_expressed_wealth_or_resource' as const
    : step === 2 ? 'rooted_expressed_wealth_and_official' as const
      : 'relative_strength_and_balance' as const;
  const relevantGroups = step === 1 ? [groupB] : [groupA, groupB];
  const inspectedGroups = relevantGroups.map(item => {
    const visibleStems = item.actualVisiblePositions
      .filter(p => p.channel === 'stem');
    const stemVisibleFactPaths = visibleStems.map(p => p.path);
    const representativeBranchFactPaths = item.actualVisiblePositions
      .filter(p => p.channel === 'branch').map(p => p.path);
    const unresolvedHiddenStemFactPaths = SLOTS.filter(slot =>
      snapshot.derivedFacts.hiddenStems?.[slot]?.status !== 'resolved')
      .map(slot => 'derivedFacts.hiddenStems.' + slot);
    const sameStemHiddenStemMatches: T10VisibleStemHiddenStemMatch[] = [];
    for (const visible of visibleStems) {
      const stemPillar = snapshot.pillars[visible.slot];
      if (stemPillar.status !== 'resolved') {
        throw new TypeError('A resolved course term cannot have an unresolved visible stem.');
      }
      const visibleStem = stemPillar.value.stem.value;
      for (const hiddenSlot of SLOTS) {
        const hidden = snapshot.derivedFacts.hiddenStems?.[hiddenSlot];
        const branchPillar = snapshot.pillars[hiddenSlot];
        if (hidden?.status !== 'resolved') continue;
        if (branchPillar.status !== 'resolved') {
          throw new TypeError('Canonical hidden stems need their resolved source branch.');
        }
        if (hidden.value.includes(visibleStem)) {
          sameStemHiddenStemMatches.push({
            visibleTenGodFactPath: visible.path,
            visibleStemFactPath: 'pillars.' + visible.slot + '.value.stem',
            visibleStem,
            branchFactPath: 'pillars.' + hiddenSlot + '.value.branch',
            hiddenStemCollectionFactPath: 'derivedFacts.hiddenStems.' + hiddenSlot,
            sameStemCharacterObserved: true,
            sourceQualifiedRootingEstablished: false,
          });
        }
      }
    }
    return {
      group: item.group,
      stemVisibleFactPaths,
      representativeBranchFactPaths,
      bothDisplayChannelsObserved: stemVisibleFactPaths.length > 0 &&
        representativeBranchFactPaths.length > 0,
      groupUnresolvedFactPaths: [...item.unresolvedFactPaths],
      sameStemHiddenStemMatches,
      unresolvedHiddenStemFactPaths,
    };
  });
  const evidenceDescriptions = inspectedGroups.map(item =>
    (item.group === 'a' ? '첫째' : '둘째') +
    ' 계열의 천간 표시 ' + item.stemVisibleFactPaths.length +
    '곳·지지 대표 십신 표시 ' + item.representativeBranchFactPaths.length +
    '곳·같은 글자 지장간 대조 ' + item.sameStemHiddenStemMatches.length +
    '건' +
    (item.unresolvedHiddenStemFactPaths.length
      ? '·지장간 미확정 ' + item.unresolvedHiddenStemFactPaths.length + '곳'
      : '')).join(', ');
  const methodInputAudit: T10TenGodCourseMethodInputAudit = {
    sourceStep: step,
    sourceCondition,
    inspectedGroups,
    actualRootingEstablished: false,
    originalStemExpressionMethodValidated: false,
    originalCombinationClashEffectsSettled: false,
    originalStrengthBalanceEstablished: false,
    sourceGrade: null,
    paragraph: step === 3
      ? '저서 발췌의 세 번째 평가는 두 계열의 힘과 균형을 요구합니다. ' +
        evidenceDescriptions +
        '이 관측되지만 가시 자리의 개수만으로 실제 강약·균형은 판정할 수 없습니다.'
      : '저서 발췌의 ' + (step === 1 ? '첫 번째' : '두 번째') +
        ' 평가는 해당 십신 계열의 천간 투출·지지 통근과 합충의 영향을 요구합니다. ' +
        evidenceDescriptions +
        '이 관측됩니다. 같은 글자가 지장간에 있어도 실제 통근·투출의 성립이나 합충 효과를 확정하지 않습니다.',
  };
  const describe = (item: typeof groups[number]) =>
    (item.group === 'a' ? '첫째 계열' : '둘째 계열') + ' ' +
    (item.actualVisiblePositions.length
      ? item.actualVisiblePositions.map(p =>
        ({ year: '연', month: '월', day: '일', hour: '시' }[p.slot]) +
        (p.channel === 'stem' ? '간 ' : '지 ') + p.value).join('·')
      : '확정된 가시 위치에서 미관측') +
    (item.unresolvedFactPaths.length
      ? '(확인 불가 ' + item.unresolvedFactPaths.length + '곳)' : '');
  return {
    courseId: def.id, historicalRole: def.role,
    personRef, calculationHash: snapshot.calculationHash,
    label: def.name, groups, visibleGroupState,
    anyUnresolvedCanonicalSlots: groupA.unresolvedFactPaths.length > 0,
    methodInputAudit,
    strengthAndRootingEstablished: false,
    sourceGradingConditionsSatisfied: false,
    grade: null,
    paragraph: def.name + '의 두 십신 계열은 ' + groups.map(describe).join('; ') +
      '입니다. 겉자리 관측은 통근·투출의 원전 조건, 강약과 합충 처리 또는 ' +
      '실제 상대에 대한 심리·관계 결과를 입증하지 않습니다. ' +
      methodInputAudit.paragraph,
  };
}

/**
 * Independently computes the author-listed six course INPUT inventories on
 * original canonical T5 chart data. This is not a course establishment claim
 * or a shortened version of the source's graded compatibility assessment.
 */
export function observeT10TenGodCourseInputsV1(
  pair: PairwiseSourceScopeHandoff,
  historical: T10ClassicalCrossTenGodResearch,
  subject: CanonicalSajuSnapshot,
  target: CanonicalSajuSnapshot,
): T10TenGodCourseResearchV1 {
  if (pair.owner !== 'R068_R069' || pair.researchOnly !== true ||
      pair.pairwiseT10Admitted !== false || pair.maySell !== false ||
      historical.pairwiseT10Admitted !== false || historical.maySell !== false ||
      !same(pair.subject, pair.subject.personRef, subject) ||
      !same(pair.target, pair.target.personRef, target) ||
      pair.subject.personRef === pair.target.personRef ||
      historical.subject.personRef !== pair.subject.personRef ||
      historical.target.personRef !== pair.target.personRef ||
      historical.subject.calculationHash !== pair.subject.calculationHash ||
      historical.target.calculationHash !== pair.target.calculationHash ||
      subject.policy.policyId !== target.policy.policyId ||
      subject.policy.policyVersion !== target.policy.policyVersion) {
    throw new TypeError('T10 courses require two original protected canonical charts.');
  }
  const male = subject.input.sexForTraditionalCalculation === 'male'
    ? { personRef: pair.subject.personRef, snapshot: subject }
    : target.input.sexForTraditionalCalculation === 'male'
      ? { personRef: pair.target.personRef, snapshot: target } : null;
  const female = subject.input.sexForTraditionalCalculation === 'female'
    ? { personRef: pair.subject.personRef, snapshot: subject }
    : target.input.sexForTraditionalCalculation === 'female'
      ? { personRef: pair.target.personRef, snapshot: target } : null;
  const eligible = historical.historicalScope === 'male_female_role_matched';
  if (eligible !== (male !== null && female !== null &&
        male.personRef !== female.personRef)) {
    throw new TypeError('Course historical roles must match earlier T10 source audit.');
  }
  const courses = eligible && male && female ? COURSE_DEFINITIONS.map(def =>
    observeCourse(def, (def.role === 'male' ? male : female).personRef,
      (def.role === 'male' ? male : female).snapshot)) : [];
  return {
    version: 'saju-t10-ten-god-course-observations-v1',
    lifecycle: 'internal_research_only',
    source: T10_TEN_GOD_COURSE_SOURCES,
    historicalScope: historical.historicalScope,
    subject: pair.subject, target: pair.target,
    courses,
    sourceGradingTableDescribedButNotExecutable: true,
    missingMethodPrerequisites: [
      'ORIGINAL_ROOTING_TRANSPARENCY_AND_STRENGTH_RULE',
      'COURSE_GENERATION_AND_CONFLICT_VERIFICATION',
      'COMPLETE_REPRODUCIBLE_2017_MEASUREMENT_TABLE',
      'INDEPENDENT_MODERN_RELATIONSHIP_OUTCOME_VALIDATION',
    ],
    compatibilityScore: null,
    interpretationVerdict: null,
    mayPublish: false, maySell: false, pairwiseT10Admitted: false,
  };
}
