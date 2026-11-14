import type {
  CanonicalSajuSnapshot, PillarSlot,
} from '../contracts/calculation.js';
import { matchStructuralPillarPair } from '../calculation/structural-relations.js';
import type {
  CrossChartStructuralMatch, PairwiseSourceScopeHandoff,
} from './family-pair-source-scope-handoff.js';

/**
 * A MyeongHa-owned interpretation vocabulary. A structural interaction is
 * described as a topic to examine together, never an outcome prediction.
 * This does not alter R068/R069 source permission or Production issuance.
 */
export const T10_INTERNAL_SERVICE_INTERPRETATION_POLICY = Object.freeze({
  policyId: 'myeongha-t10-internal-relational-explanation-v1',
  policyVersion: '2026-11-13',
  adoption: 'project_owner_service_lexicon',
  academicThirdPartyApprovalRequired: false,
  scope: 'two_independent_natal_charts',
  prohibited: [
    'relationship_success_prediction', 'marriage_or_divorce_prediction',
    'unsupported_strength_balance', 'compatibility_score',
  ] as const,
});

type SectionId = 'day_branch_interaction' | 'day_stem_interaction' | 'coexisting_structure' | 'other_positions' | 'interpretation_boundary';

export interface T10InternalServiceInterpretationSentence {
  readonly sectionId: SectionId;
  readonly ruleId: string;
  readonly paragraph: string;
  readonly observedFactPaths: readonly string[];
  readonly calculationSourceIds: readonly string[];
  readonly sourceDefinitionHashes: readonly string[];
  readonly interpretationOwner: 'myeongha_internal_service';
  readonly individualOutcomeClaimed: false;
}

export interface T10InternalServiceInterpretationV1 {
  readonly version: 'saju-t10-internal-service-interpretation-v1';
  readonly lifecycle: 'internal_policy_trial';
  readonly policy: typeof T10_INTERNAL_SERVICE_INTERPRETATION_POLICY;
  readonly subject: PairwiseSourceScopeHandoff['subject'];
  readonly target: PairwiseSourceScopeHandoff['target'];
  readonly sentences: readonly T10InternalServiceInterpretationSentence[];
  readonly koreanDraft: string;
  readonly ruleCoverage: 'resolved_day_stem_branch_and_other_positions';
  readonly overallScore: null;
  readonly relationshipForecast: null;
  readonly readyForOfficialIssue: false;
  readonly mayPublish: false;
  readonly maySell: false;
}

function original(
  match: CrossChartStructuralMatch,
  subject: CanonicalSajuSnapshot,
  target: CanonicalSajuSnapshot,
): boolean {
  const parts = [match.subject, match.target] as const;
  const charts = [subject, target] as const;
  const slots: PillarSlot[] = [];
  for (let i = 0; i < charts.length; i += 1) {
    const part = parts[i]!;
    const found = /^(?:subject|target)\.pillars\.(year|month|day|hour)\.value\.(stem|branch)$/u.exec(part.factPath);
    if (!found || (i === 0 ? !part.factPath.startsWith('subject.') :
        !part.factPath.startsWith('target.'))) return false;
    const slot = found[1] as PillarSlot;
    const component = found[2] as 'stem' | 'branch';
    if (component !== match.component) return false;
    const pillar = charts[i]!.pillars[slot];
    if (pillar.status !== 'resolved' || pillar.value[component].value !== part.value)
      return false;
    slots.push(slot);
  }
  const left = subject.pillars[slots[0]!];
  const right = target.pillars[slots[1]!];
  if (left.status !== 'resolved' || right.status !== 'resolved') return false;
  return matchStructuralPillarPair(left.value, right.value).some(x =>
    x.kind === match.kind && x.component === match.component &&
    x.sourceIds.length === match.sourceIds.length &&
    x.sourceIds.every(sourceId => match.sourceIds.includes(sourceId)));
}

function sentence(
  sectionId: SectionId,
  ruleId: string,
  paragraph: string,
  matches: readonly CrossChartStructuralMatch[],
): T10InternalServiceInterpretationSentence {
  return {
    sectionId, ruleId, paragraph,
    observedFactPaths: [...new Set(matches.flatMap(x =>
      [x.subject.factPath, x.target.factPath]))],
    calculationSourceIds: [...new Set(matches.flatMap(x => x.sourceIds))],
    sourceDefinitionHashes: [...new Set(matches.map(x => x.definitionContentHash))],
    interpretationOwner: 'myeongha_internal_service',
    individualOutcomeClaimed: false,
  };
}

export function draftT10InternalServiceInterpretationV1(
  pair: PairwiseSourceScopeHandoff,
  subject: CanonicalSajuSnapshot,
  target: CanonicalSajuSnapshot,
): T10InternalServiceInterpretationV1 {
  if (pair.owner !== 'R068_R069' || !pair.researchOnly ||
      pair.pairwiseT10Admitted !== false || pair.maySell !== false ||
      pair.subject.personRef === pair.target.personRef ||
      pair.subject.snapshotId !== subject.snapshotId ||
      pair.target.snapshotId !== target.snapshotId ||
      pair.subject.calculationHash !== subject.calculationHash ||
      pair.target.calculationHash !== target.calculationHash ||
      subject.policy.policyId !== target.policy.policyId ||
      subject.policy.policyVersion !== target.policy.policyVersion ||
      pair.crossChartStructuralMatches.some(x => !original(x, subject, target))) {
    throw new TypeError('T10 internal interpretation needs two exact original canonical charts.');
  }
  const matches = pair.crossChartStructuralMatches;
  const day = matches.filter(x =>
    x.subject.factPath === 'subject.pillars.day.value.branch' &&
    x.target.factPath === 'target.pillars.day.value.branch');
  const daySix = day.find(x => x.kind === 'branch_six_combination');
  const dayClash = day.find(x => x.kind === 'branch_clash');
  const result: T10InternalServiceInterpretationSentence[] = [];
  const firstDay = subject.pillars.day;
  const secondDay = target.pillars.day;

  if (firstDay.status !== 'resolved' || secondDay.status !== 'resolved') {
    result.push(sentence('day_branch_interaction', 'T10-SERVICE-DAY-UNKNOWN',
      '두 사람 중 일지 입력이 확정되지 않아 일지의 구조적 상호작용은 판단하지 않습니다. 확인되는 다른 명식 사실만 설명할 수 있습니다.', []));
  } else if (daySix) {
    result.push(sentence('day_branch_interaction', 'T10-SERVICE-DAY-SIX-COMBINATION',
      '첫 번째 사람의 일지 ' + daySix.subject.value +
      '과 두 번째 사람의 일지 ' + daySix.target.value +
      ' 사이에 육합 구조가 있습니다. 명하는 이를 서로의 관점을 연결해 볼 접점으로 설명합니다. 실제 소통 방식과 관계의 질은 두 사람의 경험에 따라 달라지며, 이 구조만으로 관계가 성공한다고 단정하지 않습니다.', [daySix]));
  } else if (dayClash) {
    result.push(sentence('day_branch_interaction', 'T10-SERVICE-DAY-CLASH',
      '첫 번째 사람의 일지 ' + dayClash.subject.value +
      '과 두 번째 사람의 일지 ' + dayClash.target.value +
      ' 사이에 충 구조가 있습니다. 명하는 이를 차이를 확인하고 조율할 필요가 있는 지점으로 설명합니다. 실제 갈등이나 이별을 뜻하지 않으며, 서로의 대응과 대화에 따라 해석 범위가 달라집니다.', [dayClash]));
  } else {
    result.push(sentence('day_branch_interaction', 'T10-SERVICE-DAY-NO-SIX-OR-CLASH',
      '두 사람의 계산된 일지 사이에는 현재 지원하는 육합·충 구조가 확인되지 않습니다. 이것은 서로 잘 맞거나 맞지 않는다는 판정이 아닙니다. 다른 위치와 실제 관계 맥락을 함께 살펴야 합니다.', []));
  }

  const dayStemMatches = matches.filter(x =>
    x.kind === 'stem_five_combination' &&
    x.subject.factPath === 'subject.pillars.day.value.stem' &&
    x.target.factPath === 'target.pillars.day.value.stem');
  const firstStem = subject.pillars.day;
  const secondStem = target.pillars.day;
  if (firstStem.status !== 'resolved' || secondStem.status !== 'resolved') {
    result.push(sentence('day_stem_interaction', 'T10-SERVICE-DAY-STEM-UNKNOWN',
      '두 사람의 일간을 확정할 수 없어 일간의 오합 여부는 판단하지 않습니다.', []));
  } else if (dayStemMatches[0]) {
    const observed = dayStemMatches[0];
    result.push(sentence('day_stem_interaction', 'T10-SERVICE-DAY-STEM-FIVE-COMBINATION',
      '첫 번째 사람의 일간 ' + observed.subject.value +
      '과 두 번째 사람의 일간 ' + observed.target.value +
      ' 사이에는 천간 오합 구조가 관찰됩니다. 명하는 이를 두 사람의 관점을 함께 살펴볼 또 하나의 접점으로 설명합니다. 실제 가치관이나 관계의 성패를 단정하지는 않습니다.',
      [observed]));
  } else {
    result.push(sentence('day_stem_interaction', 'T10-SERVICE-DAY-STEM-NO-FIVE-COMBINATION',
      '두 사람의 일간 사이에서 현재 지원하는 천간 오합은 관찰되지 않습니다. 이것은 성격이 다르거나 관계가 어렵다는 증거가 아닙니다.', []));
  }

  const opposite = daySix
    ? matches.filter(x => x.kind === 'branch_clash' && !day.includes(x))
    : dayClash ? matches.filter(x =>
      x.kind === 'branch_six_combination' && !day.includes(x)) : [];
  if (opposite.length) {
    const first = opposite[0]!;
    const otherTerm = daySix ? '충' : '육합';
    result.push(sentence('coexisting_structure', 'T10-SERVICE-MIXED-POSITIONS',
      '일지의 ' + (daySix ? '육합' : '충') +
      '과 별도로, 첫 번째 사람의 ' + first.subject.value +
      '과 두 번째 사람의 ' + first.target.value +
      ' 사이에서 다른 위치의 ' + otherTerm +
      '도 관측됩니다. 접점과 조율 지점이 함께 있을 수 있으므로 한쪽 구조만으로 관계 전체를 좋음·나쁨으로 정하지 않습니다.', opposite));
  }
  // Other locations may coexist. They are illustrative evidence, never a
  // hidden priority ranking or a statement about relationship outcomes.
  const remaining = matches.filter(x =>
    !day.includes(x) && !dayStemMatches.includes(x) && !opposite.includes(x) &&
    (x.kind === 'branch_six_combination' || x.kind === 'branch_clash'));
  if (remaining.length > 0) {
    const examples = remaining.slice(0, 2);
    const label = (path: string): string => ({
      year: '연주', month: '월주', day: '일주', hour: '시주',
    } as Record<string, string>)[path.split('.')[2] ?? ''] ?? '해당 위치';
    const description = examples.map(x =>
      '첫 번째 사람의 ' + label(x.subject.factPath) + ' ' + x.subject.value +
      '과 두 번째 사람의 ' + label(x.target.factPath) + ' ' + x.target.value +
      ' 사이의 ' + (x.kind === 'branch_clash' ? '충' : '육합')).join(', ');
    result.push(sentence('other_positions', 'T10-SERVICE-OTHER-STRUCTURES',
      '일지·일간과 별도로 ' + description + ' 구조도 관찰됩니다. ' +
      (remaining.length > examples.length ? '다른 위치에서도 추가 구조가 확인되지만, ' : '') +
      '이 예시는 관련 위치를 함께 살펴보자는 뜻이지 결혼·연애의 유불리나 중요도를 평가한 것은 아닙니다.',
      examples));
  }
  result.push(sentence('interpretation_boundary', 'T10-SERVICE-BOUNDED-SCOPE',
    '이 해석은 두 명식의 검증된 구조를 명하가 채택한 설명 규칙으로 읽은 것이며 학술적 예측 검증이나 상대의 실제 성격·감정·결혼 결과를 증명하지 않습니다. 십신 강약·용신 보완·최종 점수는 현재 제공 범위에 포함되지 않습니다.', []));

  return {
    version: 'saju-t10-internal-service-interpretation-v1',
    lifecycle: 'internal_policy_trial',
    policy: T10_INTERNAL_SERVICE_INTERPRETATION_POLICY,
    subject: pair.subject, target: pair.target,
    sentences: result,
    koreanDraft: result.map(x => x.paragraph).join('\n\n'),
    ruleCoverage: 'resolved_day_stem_branch_and_other_positions',
    overallScore: null, relationshipForecast: null,
    readyForOfficialIssue: false,
    mayPublish: false, maySell: false,
  };
}
