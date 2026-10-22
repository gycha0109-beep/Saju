import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import type { NatalFiveDomainMultifactorReports } from './natal-five-domain-multifactor-reader.js';

export const QUESTION_RELATED_NATAL_READING_VERSION = '0.1.0-research-preview' as const;

type Topic = keyof NatalFiveDomainMultifactorReports;
type State = 'related_evidence' | 'ambiguous' | 'unsupported' | 'insufficient';
type DomainReport = NatalFiveDomainMultifactorReports[Topic];

const TOPICS: readonly { key: Topic; title: string; words: readonly string[] }[] = [
  { key: 'general', title: '전체 사주', words: ['전체 사주', '종합 사주', '사주 전반'] },
  { key: 'career', title: '직업·진로', words: ['직업운', '진로', '직업', '커리어', '취업', '직장', '이직', '퇴사', '적성'] },
  { key: 'wealth', title: '재물', words: ['재물운', '재물', '금전운', '돈', '저축', '지출', '자금', '자산'] },
  { key: 'business', title: '사업', words: ['사업운', '사업', '창업'] },
  { key: 'relationship', title: '연애·관계', words: ['연애운', '연애', '관계운', '대인관계', '소통', '썸'] },
] as const;

// Not an interpretation algorithm: any future-event/third-party topic needs
// its OWN source-owned claim, scoped input, and reading admission.
const OUT_OF_SCOPE = [
  '올해', '내년', '내후년', '이번 달', '이번달', '다음 달', '다음달', '언제',
  '몇 살', '몇 년', '시기', '미래', '확률', '정확히', '얼마',
  '궁합', '배우자', '결혼', '이혼', '부모', '자녀', '가족', '건강', '수명',
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
  return required;
}

export interface QuestionRelatedNatalSection {
  title: string;
  paragraph: string;
  claimType: string;
  ruleId: string;
  sourceIds: readonly string[];
  factPaths: readonly string[];
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
  reportState?: DomainReport['state'];
  headline: string;
  sections: readonly QuestionRelatedNatalSection[];
  missing: readonly string[];
  caveats: readonly string[];
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
  if (!snapshot.completeness.birthTimeKnown || report.sections.length === 0 || report.state === 'insufficient') {
    return base(snapshot, question, 'insufficient', '이 질문과 관련된 해석 근거가 부족합니다.',
      [...report.missing, ...(!snapshot.completeness.birthTimeKnown
        ? ['출생시각이 없어 전체 원국 해석을 생성할 수 없습니다.'] : [])],
      { topic: item.key, topicLabel: item.title, reportState: report.state, sections: [] });
  }
  const sections = report.sections.map(section => {
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
    };
  });
  return base(snapshot, question, 'related_evidence',
    `${item.title}에 관해 이 명식에서 확인된 기존 관점`,
    report.missing,
    { topic: item.key, topicLabel: item.title, reportState: report.state, sections });
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
    escapeHtml(section.paragraph) + '</p><details><summary>기존 근거 확인</summary><p>' +
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
    '</p></header><main>' + (sections || '<p>현재 연결할 수 있는 근거 있는 풀이가 없습니다.</p>') +
    '</main><aside><h2>해석 범위와 부족한 부분</h2><ul>' + reasons +
    '</ul></aside></body></html>';
}
