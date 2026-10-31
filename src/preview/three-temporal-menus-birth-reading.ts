import type { BirthInput } from '../contracts/calculation.js';
import {
  buildAnnualMonthlyBirthResearchReading,
  type AnnualMonthlyBirthResearchReading,
  type AnnualMonthlyBirthResearchTarget,
} from './annual-monthly-birth-research-runtime.js';
import {
  buildLifeStageBirthResearchReading,
  type LifeStageBirthResearchReading,
} from './life-stage-birth-research-runtime.js';

export const THREE_TEMPORAL_MENUS_BIRTH_READING_VERSION =
  'myeongha-three-temporal-menu-consumer-preview-v1' as const;

export interface ThreeTemporalMenusBirthReading {
  version: typeof THREE_TEMPORAL_MENUS_BIRTH_READING_VERSION;
  lifecycle: 'internal_research_only';
  researchOnly: true;
  mayPublish: false;
  mayPersist: false;
  maySell: false;
  mayGrantOfficialAuthority: false;
  snapshotId: string;
  calculationHash: string;
  annualMonthly: AnnualMonthlyBirthResearchReading;
  lifeStage: LifeStageBirthResearchReading;
  /** A real, separate Korean output for the three time menus in one document. */
  html: string;
}

const e = (s: string): string => s.replace(/[&<>"']/gu, x => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[x]!);

function enforceSourceScope(
  annualMonthly: AnnualMonthlyBirthResearchReading,
  lifeStage: LifeStageBirthResearchReading,
  reference: string,
): void {
  const joined = annualMonthly.report;
  const stage = lifeStage.report;
  const monthFocus = joined.monthly.referenceReading;
  const theme = monthFocus.theme;
  const currentTensions = monthFocus.sourceBoundTensions ?? [];
  const invalidCurrentTheme = monthFocus.state === 'in_period'
    ? theme === undefined || !joined.monthly.sections.includes(theme) ||
      theme.kind !== 'theme' || theme.segmentId !== monthFocus.segmentId
    : theme !== undefined || currentTensions.length > 0;
  const invalidCurrentTensions = currentTensions.some(section =>
    monthFocus.state !== 'in_period' || theme === undefined ||
    !joined.monthly.sections.includes(section) ||
    section.kind !== 'tension' || section.segmentId !== monthFocus.segmentId ||
    section.calculatedInterval.startsAt !== theme.calculatedInterval.startsAt ||
    section.calculatedInterval.endsAt !== theme.calculatedInterval.endsAt ||
    section.sourceIds.length === 0 || section.ruleIds.length === 0 ||
    section.relatedPillar === undefined || section.observedClash?.relation !== 'clash' ||
    !section.factPaths.includes(
      'temporal.segmentsById.' + section.segmentId +
      '.monthlyBranchRelations.' + section.relatedPillar + '.relation',
    ));
  if (annualMonthly.lifecycle !== 'internal_research_only' ||
      lifeStage.lifecycle !== 'internal_research_only' ||
      annualMonthly.mayPublish || annualMonthly.maySell ||
      annualMonthly.mayGrantOfficialAuthority ||
      lifeStage.mayPublish || lifeStage.maySell ||
      lifeStage.mayGrantOfficialAuthority ||
      !joined.researchOnly || joined.usefulComplete ||
      joined.mayPublish || joined.maySell ||
      !stage.researchOnly || stage.usefulComplete ||
      stage.mayPublish || stage.maySell ||
      stage.interpretationStatus !== 'source_authority_not_established' ||
      annualMonthly.monthlyMenu.authority.mayMarkMenuAvailable ||
      annualMonthly.monthlyMenu.authority.mayCallOfficial ||
      joined.snapshotId !== stage.snapshotId ||
      joined.calculationHash !== stage.calculationHash ||
      lifeStage.natalContext.snapshotId !== joined.snapshotId ||
      lifeStage.natalContext.calculationHash !== joined.calculationHash ||
      joined.monthly.referenceReading.referenceDateTime !== reference ||
      stage.referenceDateTime !== reference ||
      invalidCurrentTheme || invalidCurrentTensions ||
      joined.annualExecutedEvidence.length !== joined.annual.sections.length ||
      joined.annual.sections.some((section,i) => {
        const actual = joined.annualExecutedEvidence[i];
        return actual?.semanticKey !== section.id ||
          actual.claimType !== section.candidateClaimType ||
          actual.methodologyId !== section.methodologyId ||
          !actual.sourceIds.includes(section.policySourceId) ||
          !section.calculationFactPaths.every(path => actual.factPaths.includes(path)) ||
          actual.ruleIds.length === 0;
      }) ||
      !['bounded_natal_t8_research','insufficient_evidence'].includes(
        lifeStage.natalContext.availability) ||
      (lifeStage.natalContext.availability === 'insufficient_evidence') !==
        (lifeStage.natalContext.sections.length === 0) ||
      lifeStage.natalContext.sections.some(section =>
        !section.title.trim() || !section.paragraph.trim() ||
        !section.paragraph.includes('이 원국에서 확인된 근거는') ||
        section.sourceIds.length < 2 || section.factPaths.length < 2 ||
        section.factPaths.some(path =>
          !/^derivedFacts\.tenGods\.value\.(year|month|day|hour)\.(stem|branch)\.value$/u.test(path)))) {
    throw new TypeError('Three time menus require the same authorized chart, instant and research-only source.');
  }
}

function render(
  annualMonthly: AnnualMonthlyBirthResearchReading,
  lifeStage: LifeStageBirthResearchReading,
): string {
  const report = annualMonthly.report;
  const life = lifeStage.report;
  const annualReference = report.annualReference;
  const monthlyFocus = report.monthly.referenceReading;
  const yearNote = annualReference.state === 'in_target_civil_year'
    ? '조회 시각의 서울 달력 연도에 해당하는 연구용 연운입니다.'
    : '선택한 ' + report.targetYear +
      '년은 조회 시각의 현재 연도가 아닙니다. 현재 연운으로 적용하지 않고 비교만 합니다.';
  const annual = report.annual.sections.map((section, i) =>
    '<article><h3>' + e(section.title) + '</h3><p>' + e(section.text) + '</p>' +
    '<details><summary>연운 원문 출처와 계산 근거</summary><p>후보 프로필: ' +
    e(section.researchProfileId) + '</p><p>실제 실행된 연구 Claim: ' +
    e(report.annualExecutedEvidence[i]!.claimId) + '</p><p>실제 적용 규칙: ' +
    e(report.annualExecutedEvidence[i]!.ruleIds.join(' · ')) + '</p><p>계산 경로: ' +
    e(report.annualExecutedEvidence[i]!.factPaths.join(' · ')) + '</p><p>정책: ' +
    e(section.policySourceId) + ' · 방법론: ' + e(section.methodologyId) +
    '</p><p>독립 고전 근거가 아닌 내부 연구 정책이며 Official 승인은 아닙니다.</p></details></article>',
  ).join('') || '<p>이 연도에 적용할 개인별 연운 연구 문구가 없습니다.</p>';
  const theme = monthlyFocus.state === 'in_period' ? monthlyFocus.theme : undefined;
  const currentMonth = theme === undefined
    ? '<p>' + (monthlyFocus.state === 'outside_target_month'
      ? '조회 시각이 선택한 월 밖입니다. 현재 월운으로 표시하지 않습니다.'
      : '이 조회 시각의 개인별 월운 해석 근거가 충분하지 않습니다.') + '</p>'
    : '<article class="current"><h3>' + e(theme.title) + '</h3><p>' +
      e(theme.text) + '</p><details><summary>이 구간의 T9 근거</summary><p>Claim: ' +
      e(theme.claimId) + '</p><p>계산 구간: ' +
      e(theme.calculatedInterval.startsAt) + ' — ' +
      e(theme.calculatedInterval.endsAt) + '</p><p>실제 계산 경로: ' +
      e(theme.factPaths.join(' · ')) + '</p><p>출처: ' +
      e(theme.sourceIds.join(' · ')) + '</p><p>규칙: ' +
      e(theme.ruleIds.join(' · ')) + '</p><p>연구 방법론: ' +
      e(theme.methodologyId) + '</p></details></article>' +
      (monthlyFocus.sourceBoundTensions?.length
        ? '<div class="active-month-relations" aria-label="조회 시각 절입 구간의 실제 원국 충 관계">' +
          '<h4>이 절입 구간에서 함께 확인된 원국의 충 관계</h4>' +
          monthlyFocus.sourceBoundTensions.map(section =>
            '<article class="current-tension"><h4>' + e(section.title) +
            '</h4><p>' + e(section.text) +
            '</p><details><summary>현재 구간에 선택된 월운 T9 근거</summary>' +
            '<p>Claim: ' + e(section.claimId) +
            '</p><p>규칙: ' + e(section.ruleIds.join(' · ')) +
            '</p><p>연구 방법론: ' + e(section.methodologyId) +
            '</p><p>계산: ' + e(section.factPaths.join(' · ')) +
            '</p><p>출처: ' + e(section.sourceIds.join(' · ')) +
            '</p><p>적용 기간: ' + e(section.calculatedInterval.startsAt) +
            ' — ' + e(section.calculatedInterval.endsAt) +
            '</p></details></article>').join('') +
          '<p>관측된 지지 충의 연구용 설명이며 실제 사건·길흉을 예측하지 않습니다.</p></div>'
        : '');
  const monthly = report.monthly.sections.map(section =>
    '<article><small>' + (section.kind === 'theme'
      ? '절입 구간의 중심 주제' : '해당 구간의 조건부 원국 충 관계') +
      '</small><h3>' + (section.segmentId === 'before_jeol'
      ? '절입 전 · ' : '절입 이후 · ') + e(section.title) + '</h3><p>' +
      e(section.text) + '</p><details><summary>절입 기간·T9 Claim과 출처</summary>' +
      '<p>기간: ' + e(section.calculatedInterval.startsAt) + ' — ' +
      e(section.calculatedInterval.endsAt) + '</p><p>Claim: ' +
      e(section.claimId) + '</p><p>계산: ' + e(section.factPaths.join(' · ')) +
      '</p><p>규칙: ' + e(section.ruleIds.join(' · ')) +
      '</p><p>연구 방법론: ' + e(section.methodologyId) +
      '</p><p>출처: ' + e(section.sourceIds.join(' · ')) +
      '</p></details></article>',
  ).join('') || '<p>선택한 월에 읽을 수 있는 출처 연결 풀이가 없습니다.</p>';
  const periods = life.periods.map(period =>
    '<article><h3>' + (period.kind === 'current' ? '현재 대운' : '다음 대운') +
      ' · ' + e(period.pillar) + '</h3><p>' + e(period.text) +
      '</p><details><summary>대운 계산 근거</summary><p>기간: ' +
      e(period.startsAt) + ' — ' + e(period.endsAtExclusive) +
      '</p><p>정책: ' + e(life.policyId) + ' · ' +
      e(life.policyHash) + '</p></details></article>',
  ).join('') || '<p>' + e(life.missing.join(' · ') ||
    '이 명식에 확정된 현재·다음 대운 구간이 없습니다.') + '</p>';
  // This is the SAME person's already executed and source-bound natal T8
  // reading, not an annual/monthly T9 meaning or a Dayun event prediction.
  // Display it only once as shared context, never duplicate its interpretation
  // in the period sections or count it as a new temporal semantic profile.
  const natal = lifeStage.natalContext.sections.map(section =>
    '<article><h3>' + e(section.title) + '</h3><p>' +
      e(section.paragraph) + '</p><details><summary>원국 해석 출처</summary><p>' +
      e(section.sourceIds.join(' · ')) + '</p><p>' +
      e(section.factPaths.join(' · ')) + '</p></details></article>',
  ).join('');
  const natalPanel = natal
    ? '<section id="natal-reference" aria-label="연운과 월운에서 분리된 출처 있는 원국 근거">' +
      '<h2>대운과 분리된 원국 연구 풀이</h2>' +
      '<p>이 명식에서 이미 확인된 개별 원국 구조입니다. 올해·이번 달 풀이와 나란히 ' +
      '살펴볼 수 있지만 기간별 원인·결과·길흉을 결론 내린 것은 아닙니다. ' +
      '연운·월운과 원국의 의미 연결은 별도 출처·방법론이 확인되기 전까지 보류합니다.</p>' +
      natal + '</section>'
    : '<section id="natal-reference" aria-label="원국 해석 근거 부족">' +
      '<h2>원국과 기간별 해석의 구분</h2><p>현재 같은 명식에서 ' +
      '출처가 있는 원국 종합 풀이를 확인하지 못했습니다. 연·월운 풀이를 ' +
      '원국의 성격이나 사건 판단으로 확장하지 않습니다.</p></section>';
  const gaps = [...report.annual.caveats, ...report.monthly.missing,
    ...report.monthly.caveats, ...life.missing, ...life.caveats]
    .map(item => '<li>' + e(item) + '</li>').join('');
  return '<!doctype html><html lang="ko"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>명하 · 올해·이번 달·삶의 단계 풀이</title>' +
    '<style>body{font:16px/1.75 system-ui,sans-serif;color:#242826;background:#f7f4ee;margin:0}' +
    'main{max-width:880px;padding:28px 20px;margin:auto}header{padding:24px;color:white;background:#223f3a;border-radius:18px}' +
    'nav{display:flex;gap:16px;flex-wrap:wrap;margin:18px 0}nav a{color:#236654;font-weight:bold}' +
    'section{margin-top:28px}article{background:white;border:1px solid #ddd9d2;border-radius:14px;margin:12px 0;padding:16px 20px}' +
    '.current{border:2px solid #42755c}details,aside,small{font-size:13px;color:#555;overflow-wrap:anywhere}' +
    'aside{background:#ebe6df;padding:18px;border-radius:12px}h3{margin:0 0 8px}</style>' +
    '</head><body><main><header><small style="color:#e2eee9">명하 · 내부 연구 결과 · Official 아님</small>' +
    '<h1>올해 · 이번 달 · 삶의 단계</h1><p>조회 시각: ' +
    e(life.referenceLocalDateTime) + ' KST / 선택: ' +
    report.targetYear + '년 ' + report.targetMonth + '월</p>' +
    '</header><nav><a href="#annual">올해</a><a href="#monthly">이번 달</a>' +
    '<a href="#natal-reference">명식의 기존 근거</a>' +
    '<a href="#life-stage">삶의 단계</a></nav>' +
    natalPanel +
    '<section id="annual"><h2>올해 — ' + report.targetYear + '년</h2><p>' +
    e(yearNote) + '</p>' +
    '<p>올해 주제와 별개로 확인된 <a href="#natal-reference">원국의 연구 근거</a>는 ' +
    '연운 해석 결론으로 합산하지 않습니다.</p>' + annual + '</section>' +
    '<section id="monthly"><h2>이번 달 — ' + report.targetMonth + '월</h2>' +
    '<p>절입 전·후 월간 주제와 <a href="#natal-reference">같은 명식의 원국 근거</a>는 ' +
    '서로 다른 해석 범위입니다. 확인되지 않은 상호작용은 주장하지 않습니다.</p>' +
    '<h3>조회 시각에 해당하는 월운</h3>' + currentMonth +
    '<h3>절입 전후 전체 풀이</h3>' + monthly + '</section>' +
    '<section id="life-stage"><h2>삶의 단계 — 계산된 대운</h2><p>' +
    '대운의 간지·시각만 계산된 사실입니다. 길흉이나 사건 시기를 해석하지 않습니다.</p>' +
    periods +
    '</section><aside><h2>아직 허가되지 않은 내용과 한계</h2><ul>' +
    gaps + '</ul><p>공식 공개·저장·판매·결제 권한은 없습니다.</p></aside>' +
    '</main></body></html>';
}

/**
 * One real birth → three independently scoped time-menu results.
 * Existing annual/monthly T9 and canonical Dayun facts retain ownership;
 * this consumer presentation cannot invent an annual/dayun meaning or a T11 claim.
 */
export function buildThreeTemporalMenusBirthReading(
  birth: BirthInput,
  target: AnnualMonthlyBirthResearchTarget,
): ThreeTemporalMenusBirthReading {
  const annualMonthly = buildAnnualMonthlyBirthResearchReading(birth, target);
  const lifeStage = buildLifeStageBirthResearchReading(birth, target.referenceDateTime);
  enforceSourceScope(annualMonthly, lifeStage, target.referenceDateTime);
  return {
    version: THREE_TEMPORAL_MENUS_BIRTH_READING_VERSION,
    lifecycle: 'internal_research_only',
    researchOnly: true,
    mayPublish: false,
    mayPersist: false,
    maySell: false,
    mayGrantOfficialAuthority: false,
    snapshotId: annualMonthly.report.snapshotId,
    calculationHash: annualMonthly.report.calculationHash,
    annualMonthly,
    lifeStage,
    html: render(annualMonthly, lifeStage),
  };
}
