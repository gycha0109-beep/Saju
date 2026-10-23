import type { BirthInput } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../production/production-calculation-runtime.js';
import { buildAnnualInterpretationFacts } from '../reading/annual-interpretation-facts.js';
import { buildTemporalReadingContext } from '../reading/temporal-reading-context.js';
import {
  buildGeneralAnnualExplorationReport,
  type GeneralAnnualExplorationReport,
} from './general-annual-exploration-report.js';

export const ANNUAL_BIRTH_RESEARCH_RUNTIME_VERSION =
  'myeongha-annual-birth-research-runtime-v1' as const;

export interface AnnualBirthResearchTarget {
  requestId: string;
  targetYear: number;
  /** Canonical UTC timestamp. Seoul civil year and Ipchun effective year are distinct. */
  referenceDateTime: string;
}

export interface AnnualBirthResearchReading {
  version: typeof ANNUAL_BIRTH_RESEARCH_RUNTIME_VERSION;
  lifecycle: 'internal_research_only';
  researchOnly: true;
  mayPublish: false;
  mayPersist: false;
  maySell: false;
  mayGrantOfficialAuthority: false;
  snapshotId: string;
  calculationHash: string;
  reference: {
    referenceDateTime: string;
    civilYearAtReference: number;
    state: 'in_target_civil_year' | 'outside_target_civil_year';
  };
  report: GeneralAnnualExplorationReport;
  html: string;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/gu, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]!);
}

function kst(instant: string): string {
  return new Date(Date.parse(instant) + 9 * 60 * 60 * 1000)
    .toISOString().slice(0, 16).replace('T', ' ') + ' KST';
}

function renderAnnualBirthResearchHtml(
  reading: Omit<AnnualBirthResearchReading, 'html'>,
): string {
  const report = reading.report;
  const ref = reading.reference;
  if (!reading.researchOnly || reading.mayPublish || reading.mayPersist ||
      reading.maySell || reading.mayGrantOfficialAuthority ||
      report.mode !== 'internal_exploration' || report.status !== 'not_official_reading' ||
      report.permissions.mayClaimOfficialAuthority || report.permissions.mayPublish ||
      report.permissions.maySell || report.permissions.mayAutoPromoteResearch ||
      report.referenceDateTime !== ref.referenceDateTime ||
      ref.civilYearAtReference !==
        new Date(Date.parse(ref.referenceDateTime) + 9 * 60 * 60 * 1000).getUTCFullYear() ||
      (ref.state === 'in_target_civil_year') !==
        (ref.civilYearAtReference === report.targetYear)) {
    throw new TypeError('Annual birth research cannot elevate authority or mislabel a reference year.');
  }
  const e = escapeHtml;
  const applicability = ref.state === 'in_target_civil_year'
    ? '조회 시각 ' + kst(ref.referenceDateTime) + '은 서울 달력 ' +
      report.targetYear + '년에 속합니다. 올해의 연구 풀이 후보입니다.'
    : '조회 시각 ' + kst(ref.referenceDateTime) + '은 서울 달력 ' +
      ref.civilYearAtReference + '년입니다. ' + report.targetYear +
      '년의 문단은 현재 적용되는 올해 풀이가 아니라 선택한 연도의 연구 비교 자료입니다.';
  const sections = report.sections.map(section =>
    '<article class="reading-card"><small>' +
      (section.kind === 'core' ? '연간 중심 연구 관점' : '연간 조건부 충 관계') +
      '</small><h2>' + e(section.title) + '</h2><p>' + e(section.text) +
      '</p><details><summary>해석 후보의 계산 근거와 연구 출처</summary>' +
      '<p>실행 상태: 연구 프로필 후보이며 Official Claim이 아닙니다.</p>' +
      '<p>프로필: ' + e(section.researchProfileId) +
      ' / 후보 주장: ' + e(section.candidateClaimType) + '</p>' +
      '<p>계산 경로: ' + e(section.calculationFactPaths.join(' · ')) + '</p>' +
      '<p>방법론: ' + e(section.methodologyId) + '</p>' +
      '<p>연구 정책 출처: ' + e(section.policySourceId) +
      ' (독립 고전 근거 아님)</p></details></article>',
  ).join('');
  const limits = report.caveats.map(item => '<li>' + e(item) + '</li>').join('');
  return '<!doctype html><html lang="ko"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>' + e(report.headline) + ' · 연구용</title>' +
    '<style>body{max-width:820px;margin:2em auto;padding:0 1.2em;font:16px/1.7 system-ui,sans-serif}' +
    '.reading-card{border-top:1px solid #ddd;padding:1em 0}details,aside{font-size:13px;color:#555}' +
    'small{color:#825d38}aside{border-top:1px solid #ddd;padding-top:1em}</style>' +
    '</head><body><header><small>명하 · 내부 연구용 · Official Reading 아님</small>' +
    '<h1>' + e(report.headline) + '</h1><p id="annual-civil-year-reference">' +
    e(applicability) + '</p><p>서울 달력 연도 기준 · 연간 ' +
    e(report.annualPillarLabel) + ' · 십신 ' +
    e(report.annualStemTenGod) + '</p></header>' +
    '<main id="annual-reading">' + sections + '</main>' +
    '<aside><h2>근거 범위와 부족한 부분</h2><ul>' + limits + '</ul>' +
    '<p>내부 연구 해석이며 공개·저장·판매 또는 공식 서비스 권한이 없습니다.</p></aside>' +
    '</body></html>';
}

/**
 * A standalone '올해' research journey from real authorized birth input.
 * Reuses one Canonical snapshot and the existing annual facts/narrative profile.
 * Never requires or invents a monthly T9 interpretation or an Ipchun forecast.
 */
export function buildAnnualBirthResearchReading(
  birth: BirthInput,
  target: AnnualBirthResearchTarget,
): AnnualBirthResearchReading {
  if (!Number.isInteger(target.targetYear) ||
      target.targetYear < 1800 || target.targetYear > 2300) {
    throw new RangeError('Annual birth research requires a civil year from 1800 to 2300.');
  }
  if (typeof target.requestId !== 'string' ||
      !target.requestId.trim() || target.requestId.length > 200) {
    throw new TypeError('Annual birth research requires a nonempty bounded request ID.');
  }
  if (typeof target.referenceDateTime !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u.test(target.referenceDateTime)) {
    throw new TypeError('Annual birth research requires an explicit canonical UTC reference timestamp.');
  }
  const now = new Date(target.referenceDateTime);
  if (!Number.isFinite(now.getTime()) ||
      now.toISOString() !== target.referenceDateTime) {
    throw new RangeError('Annual birth research requires an existing calendar instant.');
  }
  const { snapshot } = calculateAuthorizedMyeonghwaProductionSnapshot(birth, { now });
  const request: ReadingRequest = {
    requestId: target.requestId,
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual', year: target.targetYear,
      timeZone: 'Asia/Seoul', referenceDateTime: target.referenceDateTime,
      resolution: 'relative_current',
    },
  };
  const context = buildTemporalReadingContext(request);
  if (context?.scope !== 'annual') {
    throw new TypeError('Annual birth research requires an exact annual temporal context.');
  }
  const report = buildGeneralAnnualExplorationReport(
    buildAnnualInterpretationFacts(snapshot, context),
  );
  const civilYearAtReference = new Date(now.getTime() + 9 * 60 * 60 * 1000)
    .getUTCFullYear();
  const reference = {
    referenceDateTime: target.referenceDateTime,
    civilYearAtReference,
    state: civilYearAtReference === target.targetYear
      ? 'in_target_civil_year' as const : 'outside_target_civil_year' as const,
  };
  const bounded = {
    version: ANNUAL_BIRTH_RESEARCH_RUNTIME_VERSION,
    lifecycle: 'internal_research_only' as const,
    researchOnly: true as const,
    mayPublish: false as const,
    mayPersist: false as const,
    maySell: false as const,
    mayGrantOfficialAuthority: false as const,
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    reference,
    report,
  };
  return { ...bounded, html: renderAnnualBirthResearchHtml(bounded) };
}
