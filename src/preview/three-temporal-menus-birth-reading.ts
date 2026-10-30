import type { BirthInput } from '../contracts/calculation.js';
import { renderT9ClassicalAnnualDayunAlignment } from
  './t9-annual-dayun-classical-alignment.js';
import { renderT9CurrentSourceOwnedMonthlyContext } from
  './t9-current-source-owned-monthly-context.js';
import { annualReferenceBoundaryText } from '../reading/annual-reference-boundary.js';
import { buildAnnualPrimaryWitnessIdentityContext } from
  './annual-primary-witness-identity-context.js';
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
      stage.referenceDateTime !== reference) {
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
  const currentT9 = annualMonthly.monthlyMenu.currentT9SourceContext;
  const classical = annualMonthly.monthlyMenu.historicalAnnualDayunAlignment;
  if (!classical || classical.snapshotId !== report.snapshotId ||
      classical.calculationHash !== report.calculationHash ||
      classical.newlyEmittedT9Claims !== 0 ||
      classical.compositionalOutcomeAuthorized) {
    throw new TypeError('Historical temporal label must belong to this chart and retain HOLD');
  }
  if ((currentT9 !== undefined) !== (monthlyFocus.state === 'in_period') ||
      (currentT9 !== undefined && (
        currentT9.snapshotId !== report.snapshotId ||
        currentT9.calculationHash !== report.calculationHash ||
        currentT9.referenceDateTime !== monthlyFocus.referenceDateTime ||
        currentT9.sourceTheme.claimId !== monthlyFocus.theme?.claimId))) {
    throw new TypeError('Three time menus cannot borrow source-issued T9 facts from another instant.');
  }
  const selectedRelation = report.t9EvidenceLinks.referenceEvidenceFocus;
  const selectedLink = selectedRelation.activeLink;
  const referenceInstant = Date.parse(monthlyFocus.referenceDateTime);
  if (selectedRelation.referenceDateTime !== monthlyFocus.referenceDateTime ||
      selectedRelation.state !== monthlyFocus.state ||
      selectedRelation.segmentId !== (monthlyFocus.segmentId ?? null) ||
      (monthlyFocus.state === 'outside_target_month' && selectedLink !== null) ||
      (monthlyFocus.state !== 'outside_target_month' &&
        (!selectedLink || !(Date.parse(selectedLink.startsAt) <= referenceInstant &&
          referenceInstant < Date.parse(selectedLink.endsAtExclusive)) ||
         selectedLink.existingT9ClaimId !== (monthlyFocus.theme?.claimId ?? null)))) {
    throw new TypeError('Current three-menu monthly evidence must belong to the exact Jeol and Dayun interval.');
  }
  const selectedStructuralReading = monthlyFocus.state === 'in_period' && selectedLink
    ? '<article><h3>이 시각의 조건부 계산 근거 (새 운세 아님)</h3><p>' +
      e(selectedLink.koreanExplanation) + '</p><small>적용 구간: ' +
      e(selectedLink.startsAt) + ' — ' + e(selectedLink.endsAtExclusive) +
      '</small></article>' : '';
  const yearNote = annualReference.state === 'in_target_civil_year'
    ? '조회 시각의 서울 달력 연도에 해당하는 연구용 연운입니다.'
    : '선택한 ' + report.targetYear +
      '년은 조회 시각의 현재 연도가 아닙니다. 현재 연운으로 적용하지 않고 비교만 합니다.';
  const structural = report.observedStructuralContext;
  const exactAnnualWitness = buildAnnualPrimaryWitnessIdentityContext(report);
  const annualWitnessHtml = exactAnnualWitness === undefined ? '' :
    '<article><h3>고전 원문과 정확히 일치하는 십신 관계 · 연구</h3><p>' +
    e(exactAnnualWitness.text) + '</p>' +
    '<details><summary>검증된 원문·계산 경로</summary><p>' +
    e(exactAnnualWitness.historicalPassage) + '</p><p>' +
    e(exactAnnualWitness.exactSourceCandidateId) + ' · PDF ' +
    exactAnnualWitness.sourcePdfPageOneBased + '쪽</p><p>' +
    e(exactAnnualWitness.sourceLocator) + '</p><p>' +
    e(exactAnnualWitness.calculatedFactPaths.join(' · ')) +
    '</p></details></article>';
  const observedAnnual = '원국 일간 ' + (structural.natalDayStem ?? '미확정') +
    ' · 서울 달력연도 표시용 간지 ' + structural.annualPillarLabel +
    ' · 십신 관계 ' + structural.annualStemTenGod +
    '. 이 내용은 계산된 관계 식별이며 운세 해석이나 사건 예측이 아닙니다. ' +
    annualReferenceBoundaryText(annualReference.ipchunBoundary);
  const conditional = report.conditionalComposition;
  const linkedT9 = report.t9EvidenceLinks.existingT9ClaimLinks.map(link =>
    '<article><p>' + e(link.koreanExplanation) + '</p><details><summary>원본 T9 Claim·방법론</summary><p>' +
    e(link.existingT9ClaimId ?? '없음') + ' · ' +
    e(link.existingT9MethodologyId ?? '없음') + '</p></details></article>'
  ).join('');
  const conditionals = conditional.slices.map(slice =>
    '<article><h3>' + (slice.segmentId === 'before_jeol' ? '절입 전' : '절입 후') +
    ' · 조건부 구조 관계</h3><p>' + e(slice.koreanExplanation) +
    '</p><details><summary>연구 출처·대운 기간</summary><p>' +
    e(conditional.source.study) + '</p><p>' +
    e(slice.startsAt) + ' — ' + e(slice.endsAtExclusive) +
    ' · 대운 지지: ' + e(slice.dayunBranch ?? '미확정') +
    '</p></details></article>'
  ).join('');
  const observedMonthly = structural.monthlyPhases.map(phase =>
    '<p>계산된 ' + (phase.segmentId === 'before_jeol' ? '절입 전' : '절입 후') +
    ' 월주는 ' + e(phase.pillarLabel) + '이며 원국 일간과의 월간 십신 관계는 ' +
    e(phase.monthlyStemTenGod) + '입니다. 적용 구간: ' +
    e(phase.startsAt) + '부터 ' + e(phase.endsAt) +
    ' 전까지. 추가 운세 의미를 부여하지 않습니다.</p>'
  ).join('');
  const annual = report.annual.sections.map(section =>
    '<article><h3>' + e(section.title) + '</h3><p>' + e(section.text) + '</p>' +
    '<p>이 연운 문단은 출처 권한이 확립되지 않은 내부 연구 가설이며, 특정 개인의 실제 미래를 입증하지 않습니다.</p>' +
    (section.observedClash ? '<p>원국 ' + e(section.relatedPillar ?? '') +
      ' 지지 ' + e(section.observedClash.natalBranch) + '와 해당 연운 지지 ' +
      e(section.observedClash.annualBranch) + ' 사이의 충이 계산되었습니다. ' +
      '이는 확인된 구조 사실이며 특정 사건의 예측이 아닙니다.</p>' : '') +
    '<details><summary>연운 원문 출처와 계산 근거</summary><p>후보 프로필: ' +
    e(section.researchProfileId) + '</p><p>계산 경로: ' +
    e(section.calculationFactPaths.join(' · ')) + '</p><p>정책: ' +
    e(section.policySourceId) + ' · 방법론: ' + e(section.methodologyId) +
    '</p><p>독립 고전 근거가 아닌 내부 연구 정책입니다.</p></details></article>',
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
      e(theme.calculatedInterval.endsAt) + '</p><p>출처: ' +
      e(theme.sourceIds.join(' · ')) + '</p><p>규칙: ' +
      e(theme.ruleIds.join(' · ')) + '</p></details></article>';
  const monthly = report.monthly.sections.map(section =>
    '<article><h3>' + (section.segmentId === 'before_jeol'
      ? '절입 전 · ' : '절입 이후 · ') + e(section.title) + '</h3><p>' +
      e(section.text) + '</p>' +
      (section.observedClash ? '<p>원국 ' + e(section.relatedPillar ?? '') +
        ' 지지 ' + e(section.observedClash.natalBranch) + '와 해당 월운 지지 ' +
        e(section.observedClash.monthlyBranch) + ' 사이의 충이 계산되었습니다. ' +
        '이는 확인된 구조 사실이며 특정 사건의 예측이 아닙니다.</p>' : '') +
      '<details><summary>절입 기간·T9 Claim과 출처</summary>' +
      '<p>기간: ' + e(section.calculatedInterval.startsAt) + ' — ' +
      e(section.calculatedInterval.endsAt) + '</p><p>Claim: ' +
      e(section.claimId) + '</p><p>계산: ' + e(section.factPaths.join(' · ')) +
      '</p><p>출처: ' + e(section.sourceIds.join(' · ')) +
      '</p><p>방법론: ' + e(section.methodologyId) +
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
  const natal = lifeStage.natalContext.sections.map(section =>
    '<article><h3>' + e(section.title) + '</h3><p>' +
      e(section.paragraph) + '</p>' +
      (section.evidenceMode === undefined ? '' :
        '<p>이미 발행된 다른 원국 T8 해석이며, 대운·시기 결과 또는 독립 종합 근거로 추가 계산하지 않습니다.</p>') +
      '<details><summary>원국 해석 출처</summary><p>' +
      e(section.sourceIds.join(' · ')) + '</p><p>' +
      e(section.factPaths.join(' · ')) + '</p></details></article>',
  ).join('');
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
    '<a href="#life-stage">삶의 단계</a></nav>' +
    '<section id="annual"><h2>올해 — ' + report.targetYear + '년</h2><p>' +
    e(yearNote) + '</p><p>' + e(observedAnnual) + '</p>' +
    annualWitnessHtml + annual +
    '</section>' +
    '<section id="monthly"><h2>이번 달 — ' + report.targetMonth + '월</h2>' +
    '<h3>조회 시각에 해당하는 월운</h3>' + currentMonth +
    (currentT9 === undefined ? '' : renderT9CurrentSourceOwnedMonthlyContext(currentT9)) +
    selectedStructuralReading +
    renderT9ClassicalAnnualDayunAlignment(classical) +
    '<h3>절입 전후 전체 풀이 (현재 해석이 아닌 구간도 포함)</h3>' +
    '<p>아래 두 구간은 출처 있는 비교 자료입니다. 현재 적용되는 해석은 위의 조회 시각 구간 하나뿐입니다.</p>' +
    observedMonthly + monthly +
    '<h3>원국·대운·세운·월운의 조건부 구조 관계</h3>' + conditionals +
    '<h3>기존 월운 T9 Claim의 연구용 근거 연결</h3>' + linkedT9 +
    '<p>월운 T9 근거와 위의 원국 해석은 구분합니다. ' +
    '상호작용을 설명하는 출처 있는 시간 해석 규칙이 확보되기 전에는 합쳐서 운세로 단정하지 않습니다.</p></section>' +
    '<section id="life-stage"><h2>삶의 단계 — 계산된 대운</h2><p>' +
    '대운의 간지·시각만 계산된 사실입니다. 길흉이나 사건 시기를 해석하지 않습니다.</p>' +
    (life.transitionSummary === undefined ? '' :
      '<article><h3>지금과 다음 대운의 정확한 전환 경계</h3><p>' +
      e(life.transitionSummary) +
      '</p><p>이 내용은 두 기간의 연결만 확인하며 개인의 인생 전환·성과·관계를 예측하지 않습니다.</p></article>') +
    periods +
    (natal ? '<h3>같은 사람에게서 별도로 확인한 사주 해석 근거</h3><p>' +
      '아래는 이 사람에 대해 이미 선택된 독립적인 T8 연구 해석입니다. ' +
      '대운 구간과 동일한 사람의 정보라는 것만 확인되며, ' +
      '대운이 이 성향을 강화·약화하거나 삶의 사건을 일으킨다는 뜻은 아닙니다.</p>' +
      natal : '<p>이 사람에 대해 추가로 연결할 기존 개인별 해석 근거는 확인되지 않았습니다.</p>') +
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
