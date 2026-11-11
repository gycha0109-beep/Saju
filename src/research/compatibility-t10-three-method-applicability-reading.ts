import type { T10SourceBoundObservationReadingV1 } from
  './compatibility-t10-source-bound-observation-reading.js';
import type { T10ClassicalCrossTenGodResearch } from
  './compatibility-t10-classical-cross-ten-god.js';
import type { T10ClassicalUsefulElementResearchV1 } from
  './compatibility-t10-classical-useful-element.js';
import type { T10YongshenMethodScopeResearchV1 } from
  './compatibility-t10-yongshen-method-scope.js';

export const T10_THREE_METHOD_APPLICABILITY_VERSION =
  'saju-t10-three-source-method-applicability-reading-v1' as const;

export interface T10MethodApplicabilityAxis {
  readonly method: 'palace' | 'six_spirits' | 'useful_god';
  readonly state:
    'partial_direct_day_observations' |
    'historical_roles_only_no_strength_rule' |
    'historical_roles_not_matched' |
    'individual_month_command_inputs_only';
  readonly paragraph: string;
  /** These inputs exist or are requested; they are NOT all proven interpretations. */
  readonly consideredInputFactPaths: readonly string[];
  readonly sourceUrls: readonly string[];
  readonly unresolvedPrerequisites: readonly string[];
  readonly sourceQualifiedInterpersonalRule: false;
  readonly relationshipOutcomeAuthorized: false;
}

export interface T10ThreeMethodApplicabilityReadingV1 {
  readonly version: typeof T10_THREE_METHOD_APPLICABILITY_VERSION;
  readonly lifecycle: 'internal_research_only';
  readonly subject: T10SourceBoundObservationReadingV1['subject'];
  readonly target: T10SourceBoundObservationReadingV1['target'];
  readonly axes: readonly [
    T10MethodApplicabilityAxis,
    T10MethodApplicabilityAxis,
    T10MethodApplicabilityAxis,
  ];
  readonly sourceQualifiedThreeMethodPriority: null;
  readonly relationshipVerdict: null;
  readonly sourceQualifiedT10ReadingComplete: false;
  readonly mayGrantOfficialAuthority: false;
  readonly mayPublish: false;
  readonly maySell: false;
}

type Person = T10SourceBoundObservationReadingV1['subject'];
function samePerson(
  a: Person,
  b: Pick<Person, 'personRef' | 'snapshotId' | 'calculationHash'>,
): boolean {
  return a.personRef === b.personRef &&
    a.snapshotId === b.snapshotId &&
    a.calculationHash === b.calculationHash;
}

function distinct(items: readonly string[]): string[] {
  return [...new Set(items)];
}

/**
 * A narrow, readable METHOD eligibility ledger. Chart observations, historical
 * cross-ten-god wording and month-command inputs remain separate. This does
 * not choose a method or infer any modern relationship result.
 */
export function buildT10ThreeMethodApplicabilityReadingV1(
  factual: T10SourceBoundObservationReadingV1,
  sixSpirits: T10ClassicalCrossTenGodResearch,
  usefulExamples: T10ClassicalUsefulElementResearchV1,
  yongshen: T10YongshenMethodScopeResearchV1,
): T10ThreeMethodApplicabilityReadingV1 {
  const historicalRoles = sixSpirits.historicalScope === 'male_female_role_matched';
  const matchingRoleEvidence = (
    person: { personRef: string; snapshotId: string; calculationHash: string;
      historicalRole: 'male' | 'female' },
    role: 'male' | 'female',
  ): boolean => person.historicalRole === role &&
    [factual.subject, factual.target].some(subject => samePerson(subject, person));
  if (factual.lifecycle !== 'internal_research_only' ||
      factual.mayPublish !== false || factual.maySell !== false ||
      factual.sourceQualifiedFourCase !== null ||
      factual.compositeCompatibilityMeaning !== null ||
      sixSpirits.lifecycle !== 'internal_research_only' ||
      sixSpirits.pairwiseT10Admitted !== false ||
      sixSpirits.maySell !== false || sixSpirits.comparisonVerdict !== null ||
      usefulExamples.lifecycle !== 'internal_research_only' ||
      usefulExamples.pairwiseT10Admitted !== false ||
      usefulExamples.maySell !== false ||
      usefulExamples.usefulGodComparisonAuthorized !== false ||
      usefulExamples.compatibilityVerdict !== null ||
      yongshen.lifecycle !== 'internal_research_only' ||
      yongshen.pairwiseT10Admitted !== false ||
      yongshen.maySell !== false ||
      yongshen.pairwiseUsefulGodSelected !== false ||
      !samePerson(factual.subject, sixSpirits.subject) ||
      !samePerson(factual.target, sixSpirits.target) ||
      !samePerson(factual.subject, usefulExamples.subject) ||
      !samePerson(factual.target, usefulExamples.target) ||
      !samePerson(factual.subject, yongshen.subject) ||
      !samePerson(factual.target, yongshen.target) ||
      factual.subject.personRef === factual.target.personRef ||
      usefulExamples.historicalScope !== sixSpirits.historicalScope ||
      historicalRoles !== (sixSpirits.male !== null &&
        sixSpirits.female !== null &&
        usefulExamples.male !== null && usefulExamples.female !== null) ||
      (historicalRoles && (!sixSpirits.male || !sixSpirits.female ||
        !usefulExamples.male || !usefulExamples.female ||
        !matchingRoleEvidence(sixSpirits.male, 'male') ||
        !matchingRoleEvidence(sixSpirits.female, 'female') ||
        !matchingRoleEvidence(usefulExamples.male, 'male') ||
        !matchingRoleEvidence(usefulExamples.female, 'female') ||
        sixSpirits.male.strengthOrHeavyCriterionEstablished !== false ||
        sixSpirits.female.strengthOrHeavyCriterionEstablished !== false ||
        usefulExamples.male.actualUsefulGodSelected !== false ||
        usefulExamples.female.actualUsefulGodSelected !== false)) ||
      sixSpirits.traditionalHeavyPairCondition !==
        'not_established_no_source_qualified_threshold_or_strength' ||
      usefulExamples.hypotheticalExamples.some(item =>
        item.prerequisiteEstablished !== false ||
        item.usefulElementSelectionVerified !== false ||
        item.elementComplementVerdict !== null)) {
    throw new TypeError('T10 three-method audit requires the same protected source-bound charts.');
  }

  const toPosition = (personRef: string, factPath: string): string => {
    const role = personRef === factual.subject.personRef ? 'subject'
      : personRef === factual.target.personRef ? 'target' : null;
    if (role === null) {
      throw new TypeError('T10 historical source fact belongs to a foreign person.');
    }
    return role + '.' + factPath;
  };
  const historicInputs = historicalRoles
    ? [sixSpirits.male, sixSpirits.female].flatMap(person => person
      ? [toPosition(person.personRef, person.sourceFactPath),
        ...person.observed.map(item => toPosition(person.personRef, item.path)),
        ...person.unresolvedPaths.map(path => toPosition(person.personRef, path))]
      : [])
    : [];

  const palacePaths = distinct(factual.sentences.filter(sentence =>
    sentence.evidenceScope === 'calculated_structural_fact' &&
    sentence.kind !== 'unknown_hour').flatMap(sentence =>
    [...sentence.observedFactPaths]));
  const gejuInputPaths = distinct([
    'subject.' + yongshen.subject.dayStem.factPath,
    'subject.' + yongshen.subject.monthBranch.factPath,
    'subject.' + yongshen.subject.monthBranchTenGod.factPath,
    'target.' + yongshen.target.dayStem.factPath,
    'target.' + yongshen.target.monthBranch.factPath,
    'target.' + yongshen.target.monthBranchTenGod.factPath,
  ]);

  return {
    version: T10_THREE_METHOD_APPLICABILITY_VERSION,
    lifecycle: 'internal_research_only',
    subject: factual.subject,
    target: factual.target,
    axes: [
      {
        method: 'palace',
        state: 'partial_direct_day_observations',
        paragraph: '궁위론: 두 명식의 일간·일지 구조 중 계산 가능한 요소만 ' +
          '관측했습니다. 2016년 기혼 부부 사례의 전체 분류·예외는 검증되지 않았습니다.',
        consideredInputFactPaths: palacePaths,
        sourceUrls: ['https://www.dbpia.co.kr/journal/detail?nodeId=T14205410'],
        unresolvedPrerequisites: [
          'FULL_2016_CASE_METHOD_AND_EXCEPTION_TEXT',
          'CROSS_RELATIONSHIP_POPULATION_APPLICABILITY',
        ],
        sourceQualifiedInterpersonalRule: false,
        relationshipOutcomeAuthorized: false,
      },
      {
        method: 'six_spirits',
        state: historicalRoles ? 'historical_roles_only_no_strength_rule'
          : 'historical_roles_not_matched',
        paragraph: historicalRoles
          ? '육신론: 고전의 남녀 역할 조건에는 해당하지만 각자 십신의 ' +
            '강약과 다소 판단 기준이 검증되지 않아 궁합을 판단하지 않습니다.'
          : '육신론: 이 고전의 역사적 남녀 역할 입력 조건에 해당하지 않아 ' +
            '해당 방식으로 상대 관계를 추론하지 않습니다.',
        consideredInputFactPaths: distinct(historicInputs),
        sourceUrls: [
          sixSpirits.sources.traditional.url,
          sixSpirits.sources.challenge.url,
        ],
        unresolvedPrerequisites: [...sixSpirits.missingPrerequisites],
        sourceQualifiedInterpersonalRule: false,
        relationshipOutcomeAuthorized: false,
      },
      {
        method: 'useful_god',
        state: 'individual_month_command_inputs_only',
        paragraph: '용신론: 두 사람의 일간·월령 및 관련 분류는 각자 확인하지만 ' +
          '개인별 실제 용신 선정과 서로의 오행 보완 효과는 검증되지 않았습니다.',
        consideredInputFactPaths: gejuInputPaths,
        sourceUrls: [
          yongshen.sources.monthCommandGeju.originalTextUrl,
          usefulExamples.source.url,
        ],
        unresolvedPrerequisites: distinct([
          ...yongshen.unresolvedPrerequisites,
          ...usefulExamples.missingPrerequisites,
        ]),
        sourceQualifiedInterpersonalRule: false,
        relationshipOutcomeAuthorized: false,
      },
    ],
    sourceQualifiedThreeMethodPriority: null,
    relationshipVerdict: null,
    sourceQualifiedT10ReadingComplete: false,
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    maySell: false,
  };
}
