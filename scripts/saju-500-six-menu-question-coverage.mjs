export const SIX_MENU_QUESTION_COVERAGE_VERSION = 'saju-500-six-menu-question-coverage-v1';

// Product questions are an audit rubric, NOT new T8/T9 claims or a sales gate.
// Evidence is counted only when an existing research renderer actually displayed it.
const QUESTIONS = Object.freeze({
  '직업·커리어': [
    ['work_output', '일에서 무엇을 산출·실행하는가?', 'execution'],
    ['preparation', '학습·준비의 구조는 무엇인가?', 'preparation'],
    ['responsibility', '역할과 책임을 어떻게 다루는가?', 'responsibility'],
    ['tension', '기준이 충돌할 때 어떤 구조가 드러나는가?', 'tension'],
    ['career_outcome', '특정 직업 적성·승진·이직 결과를 판단할 수 있는가?', null],
  ],
  '사업': [
    ['core', '사업의 중심 구조를 설명할 수 있는가?', 'core'],
    ['execution', '실행과 산출을 어떤 근거로 설명하는가?', 'execution'],
    ['governance', '운영·책임 기준을 어떻게 다루는가?', 'governance'],
    ['preparation', '준비·자원의 관점을 설명할 수 있는가?', 'preparation'],
    ['coordination', '협력과 조율의 근거가 있는가?', 'coordination'],
    ['business_outcome', '창업 성공·매출·사업 수익을 예측할 수 있는가?', null],
  ],
  '재물': [
    ['core', '재물·자원 해석의 중심 근거가 있는가?', 'core'],
    ['creation', '산출과 자원의 연결이 보이는가?', 'creation'],
    ['management', '자원 관리·책임 관계가 보이는가?', 'management'],
    ['planning', '준비·지원 관계가 보이는가?', 'planning'],
    ['tension', '자원 관련 긴장 관계가 보이는가?', 'tension'],
    ['wealth_outcome', '실제 수입·자산·투자 수익을 예측할 수 있는가?', null],
  ],
  '연애·관계': [
    ['core', '관계의 중심 구조를 설명할 수 있는가?', 'core'],
    ['expression', '표현·전달의 관계를 설명할 수 있는가?', 'expression'],
    ['boundaries', '역할·경계의 근거가 있는가?', 'boundaries'],
    ['reception', '수용·이해의 근거가 있는가?', 'reception'],
    ['coordination', '서로 다른 기준의 조율 근거가 있는가?', 'coordination'],
    ['relationship_outcome', '특정 배우자·결혼 시기·상대 감정을 예측할 수 있는가?', null],
  ],
  '올해': [
    ['annual_theme', '해당 해의 핵심 주제 근거가 있는가?', 'annual_theme'],
    ['annual_tension', '원국과 연간 구조의 충돌 근거가 표시되는가?', 'annual_tension'],
    ['annual_period', '사용한 연도 기준과 계산 정책이 표시되는가?', 'annual_period'],
    ['annual_domain_synthesis', '직업·재물·관계의 승인된 연간 종합 결론이 있는가?', null],
  ],
  '이번 달': [
    ['before_jeol', '절입 이전 구간의 근거가 표시되는가?', 'before_jeol'],
    ['after_jeol', '절입 이후 구간의 근거가 표시되는가?', 'after_jeol'],
    ['monthly_tension', '원국과 월간 구조의 충돌 근거가 표시되는가?', 'monthly_tension'],
    ['reference_period', '조회 시점의 기간이 판정됐는가?', 'reference_period'],
    ['monthly_domain_synthesis', '직업·재물·관계의 승인된 월간 종합 결론이 있는가?', null],
  ],
});

function hasDisplayedEvidence(menu, row, evidenceKey) {
  if (evidenceKey === null || !row.text?.trim()) return false;
  if (['직업·커리어', '사업', '재물', '연애·관계'].includes(menu)) {
    return row.meaningComponents?.some(item => Array.isArray(item) && item[2] === evidenceKey) ?? false;
  }
  const evidence = row.sourceEvidence;
  if (!evidence) return false;
  if (menu === '올해') {
    if (evidenceKey === 'annual_theme') return evidence.sections?.some(s => s.kind === 'core') ?? false;
    if (evidenceKey === 'annual_tension') return evidence.sections?.some(s => s.kind === 'tension') ?? false;
    if (evidenceKey === 'annual_period') return Boolean(evidence.annualCalendarPolicy);
    return false;
  }
  if (evidenceKey === 'reference_period') return ['in_period','outside_target_month','insufficient_evidence'].includes(evidence.referenceState);
  if (evidenceKey === 'monthly_tension') return evidence.sections?.some(s => s.kind === 'tension') ?? false;
  return evidence.sections?.some(s => s.segmentId === evidenceKey && s.kind === 'theme') ?? false;
}

export function auditSixMenuQuestionCoverage(menuRows) {
  const count = menuRows['직업·커리어']?.length;
  if (!Number.isInteger(count) || count < 1 ||
      Object.keys(QUESTIONS).some(menu => !Array.isArray(menuRows[menu]) || menuRows[menu].length !== count)) {
    throw new TypeError('Six-menu question audit needs an equal, nonempty case count for all six menus');
  }
  return {
    version: SIX_MENU_QUESTION_COVERAGE_VERSION,
    caseCountPerMenu: count,
    interpretationScope: 'research_preview_observed_evidence_only',
    officialProductReadiness: 'not_evaluated_by_this_audit',
    noClaimGeneration: true,
    menus: Object.fromEntries(Object.entries(QUESTIONS).map(([menu, questions]) => [menu, {
      questions: questions.map(([id, question, evidenceKey]) => {
        const withDisplayedEvidence = evidenceKey === null ? 0 :
          menuRows[menu].filter(row => hasDisplayedEvidence(menu, row, evidenceKey)).length;
        return {
          id, question, evidenceKey,
          withDisplayedResearchEvidence: withDisplayedEvidence,
          withoutDisplayedResearchEvidence: count - withDisplayedEvidence,
          status: evidenceKey === null ? 'not_supported_by_current_research_report' :
            withDisplayedEvidence === 0 ? 'no_evidence_seen_in_sample' :
              withDisplayedEvidence === count ? 'observed_in_all_samples' : 'observed_in_some_samples',
          caveat: 'An absent research axis does not prove the structure is absent from the chart. An observed research axis does not establish approved production semantics.',
        };
      }),
    }])),
  };
}
