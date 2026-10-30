import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import type { NatalFiveDomainMultifactorReports } from './natal-five-domain-multifactor-reader.js';

export const QUESTION_RELATED_NATAL_READING_VERSION = '0.1.0-research-preview' as const;

type Topic = keyof NatalFiveDomainMultifactorReports;
type State = 'related_evidence' | 'ambiguous' | 'unsupported' | 'insufficient';
type DomainReport = NatalFiveDomainMultifactorReports[Topic];

const TOPICS: readonly { key: Topic; title: string; words: readonly string[] }[] = [
  { key: 'general', title: '전체 사주', words: ['전체 사주', '종합 사주', '사주 전반'] },
  { key: 'career', title: '직업·진로', words: ['직업운', '진로', '직업', '커리어', '취업', '직장', '이직', '퇴사', '적성', '면접', '일자리', '복직', '회사', '직무'] },
  { key: 'wealth', title: '재물', words: ['재물운', '재물', '금전운', '돈', '저축', '지출', '자금', '자산', '대출', '부채', '빚', '소비', '예산'] },
  { key: 'business', title: '사업', words: ['사업운', '사업', '창업', '동업', '개업', '자영업', '가게 운영'] },
  { key: 'relationship', title: '연애·관계', words: ['연애운', '연애', '관계운', '대인관계', '소통', '썸', '데이트', '연인', '애인', '친구 관계'] },
] as const;

/**
 * Question routing only: these labels match axes ALREADY issued in the
 * five-domain research reports. This table cannot mint meaning or source
 * evidence; a focused result contains exactly the source-owned T8 paragraphs
 * whose original section.axis matches the requested axis.
 */
interface QuestionAxisFocus {
  readonly axis: string;
  readonly label: string;
  readonly words: readonly string[];
}
const FOCUS_BY_TOPIC: Readonly<Partial<Record<Topic, readonly QuestionAxisFocus[]>>> = {
  general: [
    { axis: 'expression', label: '표현', words: ['표현 방식', '표현 성향'] },
    { axis: 'response', label: '대응', words: ['대응 방식', '반응 방식'] },
    { axis: 'responsibility', label: '역할·책임', words: ['책임', '역할'] },
    { axis: 'tension', label: '구조적 조율', words: ['조율', '긴장'] },
  ],
  career: [
    { axis: 'execution', label: '실행·산출', words: ['실행', '산출', '업무 수행'] },
    { axis: 'preparation', label: '학습·준비', words: ['준비', '학습', '역량 개발'] },
    { axis: 'responsibility', label: '역할·책임', words: ['책임', '역할'] },
    { axis: 'tension', label: '기준 조율', words: ['조율', '기준 충돌'] },
  ],
  wealth: [
    { axis: 'creation', label: '자원 형성', words: ['자원 형성', '자원 창출'] },
    { axis: 'management', label: '자원 관리', words: ['관리', '저축', '지출', '운용', '대출', '부채', '빚', '소비'] },
    { axis: 'planning', label: '자원 계획', words: ['계획', '예산', '준비'] },
    { axis: 'tension', label: '자원 선택의 긴장', words: ['긴장', '조율'] },
  ],
  business: [
    { axis: 'execution', label: '실행', words: ['실행', '산출'] },
    { axis: 'governance', label: '운영 기준', words: ['운영', '기준', '관리'] },
    { axis: 'preparation', label: '준비', words: ['준비', '학습'] },
    { axis: 'coordination', label: '조율', words: ['조율', '협업', '협력', '동업'] },
  ],
  relationship: [
    { axis: 'expression', label: '표현·소통', words: ['소통', '표현', '대화', '연락'] },
    { axis: 'boundaries', label: '관계의 경계', words: ['경계', '거리감'] },
    { axis: 'reception', label: '이해·수용', words: ['이해', '수용'] },
    { axis: 'coordination', label: '조율', words: ['조율', '협의'] },
  ],
} as const;

// Not an interpretation algorithm: any future-event/third-party topic needs
// its OWN source-owned claim, scoped input, and reading admission.
const CANONICAL_TEN_GOD_FACT_PATH =
  /^derivedFacts\.tenGods\.value\.(year|month|day|hour)\.(stem|branch)\.value$/u;

const OUT_OF_SCOPE = [
  '올해', '내년', '내후년', '이번 달', '이번달', '다음 달', '다음달', '언제',
  '몇 살', '몇 년', '시기', '미래', '확률', '정확히', '얼마',
  '궁합', '배우자', '결혼', '이혼', '부모', '자녀', '가족', '건강', '수명',
  '성공할', '합격할', '승진할', '당첨', '수익률', '매출 얼마', '투자 수익',
] as const;

/** Input guidance only; it never upgrades held T9/T10/T11 semantics. */
function unsupportedQuestionRequirements(forbidden: readonly string[]): string[] {
  const has = (...terms: string[]) => terms.some(term => forbidden.includes(term));
  const required: string[] = [];
  if (has('올해', '내년', '내후년', '이번 달', '이번달', '다음 달', '다음달',
    '언제', '몇 살', '몇 년', '시기', '미래')) {
    required.push('시기 질문은 조회 연도·월 또는 삶의 단계 범위와 그 기간에 독립적으로 허용된 해석 근거가 필요합니다. 현재 원국 근거만으로 사건의 시점이나 결과를 정할 수 없습니다.');
  }
  if (has('궁합')) {
    required.push('궁합은 서로 다른 두 사람의 출생정보와 당사자 동의, 각 명식 및 실제 관계 근거가 필요합니다. 현재 질문형 원국 근거만으로 두 사람의 결과를 판단하지 않습니다.');
  }
  if (has('부모', '자녀', '가족')) {
    required.push('가족 질문은 부모·자녀 중 관계 대상의 범위를 정하고 그 대상에 허용된 가족 해석 근거를 따로 확인해야 합니다. 본인 연애운을 가족 해석으로 바꾸지 않습니다.');
  }
  if (has('배우자')) {
    required.push('배우자 질문은 현재 허용된 일지 배우자궁의 위치 관찰과 미승인 관계 결론을 구분해야 합니다. 상대의 성격이나 결혼 결과는 확정하지 않습니다.');
  }
  if (has('결혼', '이혼')) {
    required.push('결혼·이혼의 실제 발생이나 결과를 확정할 수 있는 승인된 근거가 없습니다.');
  }
  if (has('얼마', '확률', '정확히')) {
    required.push('금액·확률·확정적인 결과를 계산하는 근거가 없어 수치나 결과를 만들어 내지 않습니다.');
  }
  if (has('건강', '수명')) {
    required.push('건강 상태 또는 수명을 판단하는 사주 해석을 제공하지 않습니다.');
  }
  if (has('성공할', '합격할', '승진할', '당첨', '수익률', '매출 얼마', '투자 수익')) {
    required.push('합격·승진·사업 성공·투자 수익이나 당첨 등 특정 결과를 판정할 근거가 없어 기존 업무·자원 관리 성향의 해석을 정답처럼 제시하지 않습니다.');
  }
  return required;
}

export interface QuestionRelatedNatalSection {
  title: string;
  paragraph: string;
  claimType: string;
  ruleId: string;
  sourceIds: readonly string[];
  factPaths: readonly string[];
  /** Already-issued T8 using the same facts, never independent T11 support. */
  evidenceMode?: 'reused_calculated_paths' | 'preexisting_additional_t8' |
    'preexisting_displaced_core_t8';
}

export interface QuestionRelatedNatalReading {
  version: typeof QUESTION_RELATED_NATAL_READING_VERSION;
  status: State;
  researchOnly: true;
  usefulComplete: false;
  mayPublish: false;
  maySell: false;
  snapshotId: string;
  calculationHash: string;
  question: string;
  topic?: Topic;
  topicLabel?: string;
  /** An axis requested by this question, not an independently issued T11 claim. */
  focusAxis?: string;
  /** A navigational explanation of selected existing evidence, not an answer or T11 Claim. */
  selectedEvidenceIntroduction?: string;
  focusLabel?: string;
  /** Several independently issued axes from ONE requested natal domain, never a T11 synthesis. */
  focusAxes?: readonly { axis: string; label: string }[];
  reportState?: DomainReport['state'];
  headline: string;
  sections: readonly QuestionRelatedNatalSection[];
  missing: readonly string[];
  caveats: readonly string[];
}

type SourceSection = DomainReport['sections'][number];

type RetainedDisplacedCore = SourceSection & { displacedExistingCore: true };

/**
 * A source-issued original core can be displaced by a better-supported
 * three-axis first-screen selection. Preserve it for directly focused and
 * broad questions without counting it as a fourth independent MUR support.
 */
function retainedDisplacedCore(
  topic: Topic,
  reports: NatalFiveDomainMultifactorReports,
): RetainedDisplacedCore | undefined {
  const report = reports[topic];
  const core = topic === 'general' ? reports.general.displacedOriginalCore
    : topic === 'business' ? reports.business.displacedOriginalCore
      : topic === 'relationship' ? reports.relationship.displacedOriginalCore
        : undefined;
  if (core === undefined) return undefined;
  const selected = report.sections;
  assert(report.state === 'complete' && selected.length === 3 &&
    core.claimType.startsWith(topic.toUpperCase() + '_NATAL_MULTIFACTOR_') &&
    core.ruleId === 'RULE-' + core.claimType &&
    !selected.some(section => section.claimType === core.claimType) &&
    core.upstreamClaimIds.length >= 2 && core.sourceIds.length > 0 &&
    core.observedFactPaths.length === core.observedPositions.length &&
    core.observedFactPaths.length >= 2 &&
    core.observedFactPaths.every(path => CANONICAL_TEN_GOD_FACT_PATH.test(path)) &&
    core.observedPositions.every(position => core.paragraph.includes(position)) &&
    core.paragraph.trim().length > 0,
  'Question cannot reintroduce an unsourced or selected displaced T8 core');
  return { ...core, displacedExistingCore: true };
}

/**
 * An explicitly requested question axis can use source-issued T8 views omitted
 * from the independent first-screen MUR. Such views reuse the very same
 * canonical paths and must NEVER increase support counts or grant T11 meaning.
 */
function availableOriginalSections(
  topic: Topic,
  reports: NatalFiveDomainMultifactorReports,
): readonly (SourceSection & {
  overlapsSelectedFactPaths?: readonly string[];
  additionalExistingCareer?: true;
  displacedExistingCore?: true;
})[] {
  const report = reports[topic];
  const selected: readonly SourceSection[] = report.sections;
  // Career's extra T8 clauses are already issued and EvidenceSelector-selected,
  // but excluded from the first-screen summary. A specifically requested axis
  // can read them independently without enlarging the MUR support count.
  if (topic === 'career') {
    const sources = reports.career.additionalVerifiedSections;
    const selectedTypes = new Set(selected.map(section => section.claimType));
    const usedPaths = new Set(selected.flatMap(section =>
      'calculatedFactPaths' in section ? section.calculatedFactPaths : section.observedFactPaths));
    const extra: (typeof sources[number] & { additionalExistingCareer: true })[] = [];
    for (const section of sources) {
      assert(section.claimType.startsWith('CAREER_NATAL_MULTIFACTOR_') &&
        section.ruleId === 'RULE-' + section.claimType &&
        !selectedTypes.has(section.claimType) &&
        section.sourceIds.length > 0 && section.upstreamClaimIds.length >= 2 &&
        section.calculatedFactPaths.length >= 2 &&
        section.calculatedFactPaths.length === section.calculatedPositions.length &&
        section.calculatedFactPaths.every(path => CANONICAL_TEN_GOD_FACT_PATH.test(path)) &&
        section.calculatedPositions.every(position => section.paragraph.includes(position)) &&
        section.paragraph.trim().length > 0 &&
        section.calculatedFactPaths.some(path => !usedPaths.has(path)),
        'Question cannot use unverified or repeated Career T8 evidence');
      section.calculatedFactPaths.forEach(path => usedPaths.add(path));
      selectedTypes.add(section.claimType);
      // A second source-issued Claim on the same broad axis is still an
      // independent existing paragraph when its Claim and fact paths differ.
      // Do not silently discard the branch version of a visible-stem reading.
      extra.push({ ...section, additionalExistingCareer: true });
    }
    return [...selected, ...extra];
  }
  const alternatives = topic === 'general'
    ? reports.general.overlappingPerspectives ?? []
    : topic === 'wealth'
      ? reports.wealth.overlappingPerspectives ?? []
    : topic === 'business'
      ? reports.business.overlappingPerspectives ?? []
      : topic === 'relationship'
        ? reports.relationship.overlappingPerspectives ?? []
        : [];
  const displaced = retainedDisplacedCore(topic, reports);
  if (alternatives.length === 0) return displaced === undefined
    ? selected : [...selected, displaced];
  const selectedPaths = new Set(selected.flatMap(section =>
    'calculatedFactPaths' in section
      ? section.calculatedFactPaths : section.observedFactPaths));
  const selectedAxes = new Set(selected.map(section => section.axis));
  const selectedClaims = new Set(selected.map(section => section.claimType));
  const alternativeAxes = new Set(alternatives.map(section => section.axis));
  assert(report.state === 'partial' && alternatives.length <= 2 &&
    alternativeAxes.size === alternatives.length &&
    alternatives.every(section =>
      !selectedAxes.has(section.axis) &&
      !selectedClaims.has(section.claimType) &&
      section.claimType.startsWith(topic.toUpperCase() + '_NATAL_MULTIFACTOR_') &&
      section.ruleId === 'RULE-' + section.claimType &&
      section.sourceIds.length > 0 &&
      section.upstreamClaimIds.length >= 2 &&
      section.observedFactPaths.length >= 2 &&
      section.paragraph.trim().length > 0 &&
      section.observedFactPaths.every(path => selectedPaths.has(path)) &&
      JSON.stringify(section.overlapsSelectedFactPaths) ===
        JSON.stringify(section.observedFactPaths)),
    'Question cannot promote an unrelated or unsourced secondary T8 view');
  return [...selected, ...alternatives, ...(displaced === undefined ? [] : [displaced])];
}

function assert(value: unknown, message: string): asserts value {
  if (!value) throw new TypeError('Question related natal research: ' + message);
}

function normalize(value: string): string {
  return value.normalize('NFKC').trim().replace(/\s+/gu, ' ');
}

function base(
  snapshot: CanonicalSajuSnapshot,
  question: string,
  status: State,
  headline: string,
  missing: readonly string[],
  details?: {
    topic: Topic;
    topicLabel: string;
    focusAxis?: string;
    focusLabel?: string;
    focusAxes?: readonly { axis: string; label: string }[];
    selectedEvidenceIntroduction?: string;
    reportState: DomainReport['state'];
    sections: readonly QuestionRelatedNatalSection[];
  },
): QuestionRelatedNatalReading {
  return {
    version: QUESTION_RELATED_NATAL_READING_VERSION,
    status,
    researchOnly: true, usefulComplete: false, mayPublish: false, maySell: false,
    snapshotId: snapshot.snapshotId, calculationHash: snapshot.calculationHash,
    question,
    ...(details === undefined ? {} : details),
    headline,
    sections: details?.sections ?? [],
    missing,
    caveats: [
      '이 화면은 질문 자체에 답하는 T11 풀이가 아닙니다. 이미 확인된 원국 분야의 기존 연구 해석만 연결한 제한적 미리보기입니다.',
      '연애 결과·취업·수익·미래 사건을 예측하지 않습니다.',
      '내부 연구용으로 공식 출판·저장·판매할 수 없으며, 사용자용 정식 서비스 완료를 뜻하지 않습니다.',
    ],
  };
}

/**
 * Explicit question_specific input → ONE matching existing natal domain report.
 * Never synthesize a T11 claim or derive a fresh answer from question wording.
 */
export function buildQuestionRelatedNatalReading(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
  reports: NatalFiveDomainMultifactorReports,
): QuestionRelatedNatalReading {
  assert(request.intent.domain === 'question_specific' &&
    request.intent.temporalScope === 'natal' &&
    request.intent.relationshipScope === undefined &&
    request.targetPeriod === undefined &&
    typeof request.question === 'string',
  'requires a question-specific natal ReadingRequest, without a foreign time scope');
  assert((Object.keys(reports) as Topic[]).length === TOPICS.length &&
    TOPICS.every(item => {
      const report = reports[item.key];
      return report.snapshotId === snapshot.snapshotId &&
        report.calculationHash === snapshot.calculationHash &&
        report.researchOnly === true && report.usefulComplete === false &&
        report.mayPublish === false && report.maySell === false;
    }), 'all five source-owned reports must belong to the same chart and restricted scope');

  const question = normalize(request.question);
  if (!question) return base(snapshot, question, 'unsupported', '질문 내용을 입력해 주세요.', ['질문 내용이 없습니다.']);
  const forbidden = OUT_OF_SCOPE.filter(term => question.includes(term));
  if (forbidden.length > 0) {
    return base(snapshot, question, 'unsupported', '이 질문에 직접 답할 근거가 아직 없습니다.',
      [`현재 연구용 원국 풀이로 답할 수 없는 대상·시기·결과 표현: ${forbidden.join(', ')}.`,
        ...unsupportedQuestionRequirements(forbidden)]);
  }
  const candidates = TOPICS.filter(item => item.words.some(word => question.includes(word)));
  if (candidates.length > 1) {
    return base(snapshot, question, 'ambiguous', '어떤 주제를 먼저 살펴볼까요?',
      [`여러 분야가 함께 감지됐습니다: ${candidates.map(x => x.title).join(' · ')}. 한 분야씩 선택해 주세요.`]);
  }
  if (candidates.length === 0) {
    return base(snapshot, question, 'unsupported', '이 질문에 연결할 명식 분야가 아직 없습니다.',
      ['지원된 원국 분야(전체 사주·직업·재물·사업·연애·관계) 중 하나를 명시해 주세요.']);
  }
  const item = candidates[0]!;
  const report = reports[item.key];
  const axes = (FOCUS_BY_TOPIC[item.key] ?? []).filter(axis =>
    axis.words.some(word => question.includes(word)));
  // A question may request several axes of the SAME natal topic. Display each
  // already-issued bounded T8 section independently, without asserting a new
  // combined interpretation, preference, conflict winner or T11 meaning.
  const focus = axes.length === 1 ? axes[0] : undefined;
  // Broad questions retain first-screen priority. An explicit axis may
  // select a different already-issued T8 meaning that reuses the same facts.
  const availableSections = axes.length === 0
    ? (() => {
      const displaced = retainedDisplacedCore(item.key, reports);
      return displaced === undefined ? report.sections : [...report.sections, displaced];
    })()
    : availableOriginalSections(item.key, reports);
  const matchingSections = axes.length === 0
    ? availableSections
    : availableSections.filter(section =>
        axes.some(axis => axis.axis === section.axis));
  const absentAxes = axes.filter(axis =>
    !matchingSections.some(section => section.axis === axis.axis));
  const focusDetails = axes.length === 0 ? {} : axes.length === 1 ? {
    focusAxis: focus!.axis, focusLabel: focus!.label,
  } : {
    focusAxes: axes.map(({ axis, label }) => ({ axis, label })),
  };
  if (!snapshot.completeness.birthTimeKnown || matchingSections.length === 0 ||
      report.state === 'insufficient') {
    return base(snapshot, question, 'insufficient', '이 질문과 관련된 해석 근거가 부족합니다.',
      [...report.missing,
        ...absentAxes.map(axis =>
          axis.label + ' 관점의 명식별 해석 근거가 없어 다른 관점으로 답하지 않습니다.'),
        ...(!snapshot.completeness.birthTimeKnown
          ? ['출생시각이 없어 전체 원국 해석을 생성할 수 없습니다.'] : [])],
      { topic: item.key, topicLabel: item.title, ...focusDetails,
        reportState: report.state, sections: [] });
  }
  const sections: QuestionRelatedNatalSection[] = matchingSections.map(section => {
    const factPaths = 'calculatedFactPaths' in section
      ? section.calculatedFactPaths : section.observedFactPaths;
    assert(section.sourceIds.length > 0 && section.upstreamClaimIds.length >= 2 &&
      factPaths.length >= 2 &&
      section.paragraph.trim().length > 0 && section.ruleId.length > 0,
    'selected existing domain claim has no exact fact, source, or Korean explanation');
    return {
      title: section.headline,
      paragraph: section.paragraph,
      claimType: section.claimType,
      ruleId: section.ruleId,
      sourceIds: section.sourceIds,
      factPaths,
      ...('overlapsSelectedFactPaths' in section &&
        Array.isArray(section.overlapsSelectedFactPaths)
        ? { evidenceMode: 'reused_calculated_paths' as const } :
        ('additionalExistingCareer' in section && section.additionalExistingCareer === true)
          ? { evidenceMode: 'preexisting_additional_t8' as const }
          : ('displacedExistingCore' in section && section.displacedExistingCore === true)
            ? { evidenceMode: 'preexisting_displaced_core_t8' as const } : {}),
    };
  });
  return base(snapshot, question, 'related_evidence',
    axes.length === 0
      ? `${item.title}에 관해 이 명식에서 확인된 기존 관점`
      : `${item.title} · ${axes.map(axis => axis.label).join('·')}에 관해 각각 확인된 기존 관점`,
    [...report.missing,
      ...absentAxes.map(axis => axis.label +
        ' 관점은 해당 명식에서 승인된 연구 근거가 없어 별도 해석을 보류합니다.')],
    { topic: item.key, topicLabel: item.title, ...focusDetails,
      selectedEvidenceIntroduction:
        '질문에서 ' + item.title + ' 분야' +
        (axes.length > 0
          ? '의 ' + axes.map(axis => axis.label).join('·') + ' 관점이'
          : '가') +
        ' 요청된 것으로 확인했습니다. 같은 사용자에 대해 기존에 발행된 ' +
        sections.length + '개 근거 있는 연구 해석을 원문 그대로 연결했습니다. ' +
        (sections.some(section => section.evidenceMode === 'reused_calculated_paths')
          ? '이 중 일부는 이미 사용한 계산 경로를 다시 읽는 별도의 기존 T8 관점으로 독립 근거가 늘어난 것은 아닙니다. '
          : '') +
        (sections.some(section => section.evidenceMode === 'preexisting_additional_t8')
          ? '첫 화면에서 제외됐지만 원래 발행된 직업 T8 관점을 해당 질문에 한해 읽으며, 이를 전체 직업운의 독립 종합 결론으로 세지 않습니다. '
          : '') +
        (sections.some(section => section.evidenceMode === 'preexisting_displaced_core_t8')
          ? '중심 해석을 재선정하면서 첫 화면에서 교체된 기존 T8 문단도 원래 출처와 계산 위치 그대로 읽습니다. 독립 보조 근거나 종합 해석 개수를 추가하지 않습니다. '
          : '') +
        '질문의 개별 상황에서 무엇을 선택해야 하는지나 미래 결과를 별도로 판정한 내용은 아닙니다.',
      reportState: report.state, sections });
}

function escapeHtml(input: string): string {
  return input.replace(/[&<>"']/gu, char =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
}

/** Static HTML for the question menu's bounded internal research preview. */
export function renderQuestionRelatedNatalReadingHtml(reading: QuestionRelatedNatalReading): string {
  assert(reading.researchOnly && !reading.usefulComplete && !reading.mayPublish && !reading.maySell,
    'question report authority cannot be upgraded in presentation');
  const sections = reading.sections.map(section =>
    '<article><h2>' + escapeHtml(section.title) + '</h2><p>' +
    escapeHtml(section.paragraph) + '</p>' +
    (section.evidenceMode === 'reused_calculated_paths'
      ? '<p>기존 계산 근거를 다시 사용하는 다른 T8 의미축이며, 새로운 독립 근거나 질문에 대한 T11 결론이 아닙니다.</p>'
      : section.evidenceMode === 'preexisting_additional_t8'
        ? '<p>기존 직업 T8 규칙이 발행한 별도 관점이며, 새로운 T11 답변이나 종합 완료 판정이 아닙니다.</p>'
        : section.evidenceMode === 'preexisting_displaced_core_t8'
          ? '<p>첫 화면의 중심 후보에서 교체됐지만 이미 발행된 원래 T8 해석입니다. 독립 보조 근거가 추가되거나 T11 질문 답변이 완성된 것이 아닙니다.</p>'
          : '') + '<details><summary>기존 근거 확인</summary><p>' +
    escapeHtml(section.factPaths.join(' · ')) + '</p><p>' +
    escapeHtml(section.sourceIds.join(' · ')) + '</p><p>' +
    escapeHtml(section.claimType + ' · ' + section.ruleId) + '</p></details></article>').join('');
  const reasons = [...reading.missing, ...reading.caveats].map(text =>
    '<li>' + escapeHtml(text) + '</li>').join('');
  return '<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>명하 질문 관련 원국 근거 · 연구용</title><style>' +
    'body{max-width:780px;margin:2em auto;padding:0 1.2em;font:16px/1.75 system-ui,sans-serif}' +
    'article{border-top:1px solid #bbb;padding:1em 0}details,aside{color:#555;font-size:13px}' +
    '</style></head><body><header><small>명하 · 내부 연구용 · 정식 질문풀이 아님</small><h1>' +
    escapeHtml(reading.headline) + '</h1><p>질문: ' + escapeHtml(reading.question) +
    '</p></header><main>' +
    (reading.selectedEvidenceIntroduction === undefined ? '' :
      '<p>' + escapeHtml(reading.selectedEvidenceIntroduction) + '</p>') +
    (sections || '<p>현재 연결할 수 있는 근거 있는 풀이가 없습니다.</p>') +
    '</main><aside><h2>해석 범위와 부족한 부분</h2><ul>' + reasons +
    '</ul></aside></body></html>';
}
