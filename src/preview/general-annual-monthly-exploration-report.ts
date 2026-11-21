import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { LifeStageNatalStructureContext } from './life-stage-dayun-research-report.js';
import { buildNatalStructureContext } from './natal-structure-context.js';
import type { ReadingRequest } from '../contracts/reading.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import type { ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { buildAnnualInterpretationFacts } from '../reading/annual-interpretation-facts.js';
import type {
  MonthlyInterpretationFacts,
  MonthlySegmentId,
} from '../reading/monthly-interpretation-facts.js';
import { buildTemporalReadingContext } from '../reading/temporal-reading-context.js';
import {
  buildGeneralAnnualExplorationReport,
  type GeneralAnnualExplorationReport,
} from './general-annual-exploration-report.js';
import {
  buildGeneralMonthlyExplorationReport,
  type GeneralMonthlyExplorationReport,
  type GeneralMonthlyExplorationSection,
} from './general-monthly-exploration-report.js';

export const GENERAL_ANNUAL_MONTHLY_EXPLORATION_VERSION =
  'myeongha-annual-monthly-joined-preview-v1' as const;

export interface GeneralAnnualMonthlyExplorationReport {
  version: typeof GENERAL_ANNUAL_MONTHLY_EXPLORATION_VERSION;
  mode: 'internal_exploration';
  status: 'not_official_reading';
  researchOnly: true;
  usefulComplete: false;
  mayPublish: false;
  maySell: false;
  snapshotId: string;
  calculationHash: string;
  targetYear: number;
  targetMonth: number;
  annual: GeneralAnnualExplorationReport;
  monthly: GeneralMonthlyExplorationReport;
  periodComparison: string;
  /** The yearly profile is for a Seoul civil calendar year, not an Ipchun annual pillar. */
  annualReference: {
    referenceDateTime: string;
    civilYearAtReference: number;
    state: 'in_target_civil_year' | 'outside_target_civil_year';
  };
  /** Shared with the exact single-month research result. */
  referenceReading: GeneralMonthlyExplorationReport['referenceReading'];
  natalContext: LifeStageNatalStructureContext;
  temporalNatalComparison: readonly {
    period: 'annual' | 'monthly_before_jeol' | 'monthly_after_jeol';
    periodFamily: 'peer' | 'resource' | 'output' | 'wealth' | 'officer';
    natalMatches: readonly {
      pattern: string;
      family: 'peer' | 'resource' | 'output' | 'wealth' | 'officer';
      axis: string;
      channel: string;
      observedPositions: readonly string[];
    }[];
    interpretation: 'co_observed_only_no_interaction_claim';
  }[];
  caveats: readonly string[];
}

function requireLinkedPeriod(value: unknown, reason: string): asserts value {
  if (!value) throw new TypeError('Annual/Monthly joined exploration: ' + reason);
}

/**
 * One person's year-to-month reading journey, using existing Annual research
 * profiles and the Monthly T9 -> EvidenceSelector -> NarrativeProfile path.
 * Presenting periods together never creates cross-period meaning or authority.
 */
export function buildGeneralAnnualMonthlyExplorationReport(
  snapshot: CanonicalSajuSnapshot,
  facts: MonthlyInterpretationFacts,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
  request: ReadingRequest,
  natalContext: LifeStageNatalStructureContext = buildNatalStructureContext(
    snapshot,
    new Date(facts.referenceDateTime),
  ),
): GeneralAnnualMonthlyExplorationReport {
  const period = request.targetPeriod;
  requireLinkedPeriod(
    request.intent.domain === 'general' &&
      request.intent.temporalScope === 'monthly' &&
      period?.scope === 'monthly' &&
      period.year === facts.targetYear &&
      period.month === facts.targetMonth &&
      period.timeZone === facts.timeZone &&
      period.referenceDateTime === facts.referenceDateTime &&
      facts.scope === 'monthly',
    'the requested month must match the exact calculation period',
  );
  const monthly = buildGeneralMonthlyExplorationReport(
    snapshot,
    facts,
    execution,
    registry,
    request,
  );
  requireLinkedPeriod(
    monthly.snapshotId === snapshot.snapshotId &&
      monthly.calculationHash === snapshot.calculationHash &&
      monthly.targetYear === facts.targetYear &&
      monthly.targetMonth === facts.targetMonth &&
      monthly.researchOnly &&
      !monthly.mayPublish &&
      !monthly.maySell,
    'monthly research evidence must belong to the same person and period',
  );
  const annualRequest: ReadingRequest = {
    requestId: request.requestId + ':year-context',
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual',
      year: period.year,
      timeZone: period.timeZone,
      referenceDateTime: period.referenceDateTime,
      resolution: period.resolution,
    },
  };
  const annualContext = buildTemporalReadingContext(annualRequest);
  requireLinkedPeriod(annualContext?.scope === 'annual', 'annual context unavailable');
  const annual = buildGeneralAnnualExplorationReport(
    buildAnnualInterpretationFacts(snapshot, annualContext),
  );
  requireLinkedPeriod(
    annual.targetYear === monthly.targetYear &&
      annual.referenceDateTime === facts.referenceDateTime &&
      annual.calendarPolicy === 'civil_year_only' &&
      annual.mode === 'internal_exploration' &&
      annual.status === 'not_official_reading' &&
      !annual.permissions.mayPublish &&
      !annual.permissions.maySell,
    'annual context must match the same monthly research period',
  );
  requireLinkedPeriod(
    natalContext.snapshotId === snapshot.snapshotId &&
      natalContext.calculationHash === snapshot.calculationHash &&
      natalContext.sections.every(
        (section) =>
          section.families.length >= 2 &&
          section.sourceIds.length > 0 &&
          section.factPaths.length > 0,
      ),
    'natal context must be grounded in the exact same canonical chart',
  );
  const themes = monthly.sections.filter((section) => section.kind === 'theme');
  const phase = (id: MonthlySegmentId, label: string) => {
    const found = themes.find((section) => section.segmentId === id);
    return found === undefined
      ? label + '의 개인별 해석 근거는 아직 충분하지 않습니다'
      : label + '에는 ' + found.tenGod + ' 십신에 근거한 별도 월별 관점이 있습니다';
  };
  // Reuse the exact single-month selection; joining Annual never reinterprets it.
  const referenceReading = monthly.referenceReading;
  // Use the requested instant in Asia/Seoul, not the machine's timezone
  // or the Ipchun effective year. This is applicability context, not T8/T9 meaning.
  const atReference = Date.parse(referenceReading.referenceDateTime);
  requireLinkedPeriod(
    Number.isFinite(atReference) && referenceReading.referenceDateTime === annual.referenceDateTime,
    'year and month must use the exact same reference instant',
  );
  const civilYearAtReference = new Date(atReference + 9 * 60 * 60 * 1000).getUTCFullYear();
  const annualReference = {
    referenceDateTime: referenceReading.referenceDateTime,
    civilYearAtReference,
    state:
      civilYearAtReference === annual.targetYear
        ? ('in_target_civil_year' as const)
        : ('outside_target_civil_year' as const),
  };

  const periodComparison =
    String(annual.targetYear) +
    '년 전체 미리보기는 ' +
    annual.annualStemTenGod +
    '을(를) 기준으로 읽습니다. ' +
    String(monthly.targetMonth) +
    '월은 ' +
    phase('before_jeol', '절입 전') +
    ', ' +
    phase('after_jeol', '절입 이후') +
    '. ' +
    '이는 서로 다른 기간의 연구 해석 후보를 나란히 읽는 안내이며, 한쪽 결과로 다른 기간의 사건을 예측하지 않습니다.';

  const periodThemes = [
    { period: 'annual' as const, family: annual.annualStemTenGod },
    ...monthly.sections
      .filter((section) => section.kind === 'theme')
      .map((section) => ({
        period: ('monthly_' + section.segmentId) as 'monthly_before_jeol' | 'monthly_after_jeol',
        family: section.tenGod,
      })),
  ];
  type TenGodFamily = 'peer' | 'resource' | 'output' | 'wealth' | 'officer';
  const familyOf = (god: string): TenGodFamily => {
    if (['\uBE44\uACAC', '\uAC81\uC7AC'].includes(god)) return 'peer';
    if (['\uC815\uC778', '\uD3B8\uC778'].includes(god)) return 'resource';
    if (['\uC2DD\uC2E0', '\uC0C1\uAD00'].includes(god)) return 'output';
    if (['\uC815\uC7AC', '\uD3B8\uC7AC'].includes(god)) return 'wealth';
    if (['\uC815\uAD00', '\uD3B8\uAD00'].includes(god)) return 'officer';
    throw new TypeError('Unknown Ten-God family in temporal reading.');
  };
  const temporalNatalComparison = periodThemes.map((item) => {
    const periodFamily = familyOf(item.family);
    return {
      period: item.period,
      periodFamily,
      natalMatches: natalContext.sections
        .filter((section) => section.families.includes(periodFamily))
        .map((section) => ({
          pattern: section.pattern,
          family: periodFamily,
          axis: section.axis,
          channel: section.channel,
          observedPositions: [...section.observedPositions],
        })),
      interpretation: 'co_observed_only_no_interaction_claim' as const,
    };
  });
  return {
    version: GENERAL_ANNUAL_MONTHLY_EXPLORATION_VERSION,
    mode: 'internal_exploration',
    status: 'not_official_reading',
    researchOnly: true,
    usefulComplete: false,
    mayPublish: false,
    maySell: false,
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    targetYear: monthly.targetYear,
    targetMonth: monthly.targetMonth,
    annual,
    monthly,
    periodComparison,
    annualReference,
    referenceReading,
    natalContext,
    temporalNatalComparison,
    caveats: [
      '원국 T8과 연·월운 T9의 같은 십성 계열은 함께 관측된 사실만 비교합니다. 서로의 작용·강화·길흉을 새로 추론하지 않습니다.',
      '올해는 서울 달력 연도(입춘 효력 연주가 아님), 이번 달은 실제 절입 시각으로 구분합니다.',
      '이 연결 화면은 별도 통합 운세 규칙이 아니라 기존 연운 연구 문구와 월운 T9 근거를 순서대로 보여줍니다.',
      '개인별 명식의 계산 사실 외에 특정 사건, 재물 규모, 건강 및 관계 결과를 예측하지 않습니다.',
      '내부 연구 미리보기이며 Official Reading, 공개 또는 판매 권한을 부여하지 않습니다.',
    ],
  };
}

const SEGMENTS = ['before_jeol', 'after_jeol'] as const satisfies readonly MonthlySegmentId[];
const SEGMENT_LABEL: Readonly<Record<MonthlySegmentId, string>> = {
  before_jeol: '절입 전',
  after_jeol: '절입 이후',
};

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/gu,
    (char) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[char]!,
  );
}
function kst(instant: string): string {
  const local = new Date(new Date(instant).getTime() + 9 * 60 * 60 * 1000);
  return local.toISOString().slice(0, 16).replace('T', ' ') + ' KST';
}

function monthlyCard(section: GeneralMonthlyExplorationSection): string {
  const e = escapeHtml;
  return (
    '<article class="reading-card">' +
    '<small>' +
    (section.kind === 'theme' ? '이 구간의 중심 관점' : '충 관계에 대한 보조 관점') +
    '</small>' +
    '<h4>' +
    e(section.title) +
    '</h4><p>' +
    e(section.text) +
    '</p>' +
    '<details><summary>이 풀이의 계산 근거와 출처</summary>' +
    '<p>기간: ' +
    e(kst(section.calculatedInterval.startsAt)) +
    '부터 ' +
    e(kst(section.calculatedInterval.endsAt)) +
    ' 전까지</p>' +
    '<p>십신: ' +
    e(section.tenGod) +
    ' / Claim: ' +
    e(section.claimId) +
    '</p>' +
    '<p>계산: ' +
    e(section.factPaths.join(' · ')) +
    '</p>' +
    '<p>규칙: ' +
    e(section.ruleIds.join(' · ')) +
    ' / 방법: ' +
    e(section.methodologyId) +
    '</p>' +
    '<p>출처: ' +
    e(section.sourceIds.join(' · ')) +
    '</p></details></article>'
  );
}

/** Consumer-readable internal HTML; all interpretive copy is pre-existing profile text. */
export function renderGeneralAnnualMonthlyExplorationHtml(
  report: GeneralAnnualMonthlyExplorationReport,
): string {
  const e = escapeHtml;
  const annual = report.annual.sections
    .map(
      (section) =>
        '<article class="reading-card"><small>' +
        (section.kind === 'core' ? '올해의 중심 관점' : '연운의 조건부 충 관계') +
        '</small><h3>' +
        e(section.title) +
        '</h3><p>' +
        e(section.text) +
        '</p>' +
        '<details><summary>올해 문구의 계산 근거와 연구 출처</summary>' +
        '<p>해석 범위: 내부 연구 프로필 후보(Official Claim 실행 또는 승인 아님)</p>' +
        '<p>문구 프로필: ' +
        e(section.researchProfileId) +
        '</p>' +
        '<p>후보 Claim 유형: ' +
        e(section.candidateClaimType) +
        '</p>' +
        '<p>계산 경로: ' +
        e(section.calculationFactPaths.join(' · ')) +
        '</p>' +
        '<p>연구 방법론: ' +
        e(section.methodologyId) +
        '</p>' +
        '<p>출처: ' +
        e(section.policySourceId) +
        ' (명하 내부 연구 정책, 독립 고전 근거 아님)</p>' +
        '</details></article>',
    )
    .join('\n');
  const selected = report.referenceReading;
  const annualAt = report.annualReference;
  if (
    annualAt.referenceDateTime !== selected.referenceDateTime ||
    annualAt.civilYearAtReference !==
      new Date(Date.parse(selected.referenceDateTime) + 9 * 60 * 60 * 1000).getUTCFullYear() ||
    (annualAt.state === 'in_target_civil_year') !==
      (annualAt.civilYearAtReference === report.targetYear)
  ) {
    throw new TypeError('Annual/monthly HTML requires matching civil-year reference context.');
  }
  const annualContext =
    annualAt.state === 'in_target_civil_year'
      ? '조회 시각 ' +
        kst(annualAt.referenceDateTime) +
        '은 서울 달력 ' +
        report.targetYear +
        '년에 속합니다. 이 연운은 해당 선택 연도의 연구용 풀이입니다.'
      : '조회 시각 ' +
        kst(annualAt.referenceDateTime) +
        '은 서울 달력 ' +
        annualAt.civilYearAtReference +
        '년입니다. 아래 ' +
        report.targetYear +
        '년 연운은 현재 연도에 적용되는 풀이가 아니라 선택한 연도의 연구 비교 자료입니다.';
  const focus =
    selected.state === 'in_period' && selected.theme !== undefined
      ? '<p class="muted">해당 절입 구간: ' +
        e(SEGMENT_LABEL[selected.segmentId!]) +
        ' · ' +
        e(kst(selected.theme.calculatedInterval.startsAt)) +
        '부터 ' +
        e(kst(selected.theme.calculatedInterval.endsAt)) +
        ' 전까지</p>' +
        monthlyCard(selected.theme)
      : selected.state === 'insufficient_evidence'
        ? '<p>이 조회 시각에 적용되는 ' +
          e(SEGMENT_LABEL[selected.segmentId!]) +
          ' 구간의 개인별 연구 해석 근거는 아직 충분하지 않습니다.</p>'
        : '<p>조회 기준 시각이 선택한 ' +
          report.targetYear +
          '년 ' +
          report.targetMonth +
          '월 밖에 있어 현재 적용 구간을 정하지 않았습니다. ' +
          '아래의 월별 두 구간을 비교할 수 있습니다.</p>';
  const monthly = SEGMENTS.map((id) => {
    const sections = report.monthly.sections.filter((section) => section.segmentId === id);
    const interval = sections[0]?.calculatedInterval;
    const visiblePeriod =
      interval === undefined
        ? ''
        : '<p class="muted">실제 계산 적용 기간: ' +
          escapeHtml(kst(interval.startsAt)) +
          '부터 ' +
          escapeHtml(kst(interval.endsAt)) +
          ' 전까지</p>';
    return (
      '<section class="phase" id="phase-' +
      id +
      '"><h3>' +
      SEGMENT_LABEL[id] +
      (selected.segmentId === id ? ' · 조회 시각 구간' : '') +
      '</h3>' +
      visiblePeriod +
      (sections.length === 0
        ? '<p>이 구간의 해석 근거가 충분하지 않습니다.</p>'
        : sections.map(monthlyCard).join('\n')) +
      '</section>'
    );
  }).join('\n');
  const natalContextHtml =
    '<section id="natal-context"><h2>원국의 기존 구조적 배경</h2>' +
    '<p>' +
    e(report.natalContext.introduction) +
    '</p>' +
    (report.natalContext.sections.length === 0
      ? '<p>원국에서 연결할 수 있는 충분한 연구 근거가 없습니다.</p>'
      : report.natalContext.sections
          .map(
            (section) =>
              '<article class="reading-card"><h4>' +
              e(section.title) +
              '</h4><p>' +
              e(section.paragraph) +
              '</p><details><summary>원국 근거</summary><p>패턴: ' +
              e(section.pattern) +
              ' · 계열: ' +
              e(section.families.join(' · ')) +
              ' · 위치: ' +
              e(section.observedPositions.join(' · ')) +
              '</p><p>' +
              e(section.sourceIds.join(' · ')) +
              '</p><p>' +
              e(section.factPaths.join(' · ')) +
              '</p></details></article>',
          )
          .join('')) +
    '</section>';
  const comparisonHtml =
    '<section id="natal-temporal-comparison"><h2>원국과 기간별 십성 주제 비교</h2>' +
    '<p>같은 계열이 원국과 해당 기간에 함께 관측되는지만 보여줍니다. 상호작용이나 길흉을 뜻하지 않습니다.</p>' +
    report.temporalNatalComparison
      .map(
        (item) =>
          '<article class="reading-card"><h4>' +
          e(item.period) +
          ' · ' +
          e(item.periodFamily) +
          '</h4><p>' +
          (item.natalMatches.length === 0
            ? '같은 계열의 원국 T8 관측 근거가 선택되지 않았습니다.'
            : item.natalMatches
                .map((match) =>
                  e(
                    match.pattern +
                      ' · ' +
                      match.channel +
                      ' · ' +
                      match.observedPositions.join(' / '),
                  ),
                )
                .join('<br>')) +
          '</p></article>',
      )
      .join('') +
    '</section>';
  const caveats = [
    ...report.annual.caveats,
    ...report.monthly.missing,
    ...report.monthly.caveats,
    ...report.caveats,
  ]
    .map((s) => '<li>' + e(s) + '</li>')
    .join('\n');
  return (
    '<!doctype html><html lang="ko"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<title>' +
    report.targetYear +
    '년에서 ' +
    report.targetMonth +
    '월로 · 명하 내부 미리보기</title>' +
    '<style>' +
    "body{margin:0;background:#f6f2eb;color:#272925;font-family:system-ui,'Malgun Gothic',sans-serif;line-height:1.7}" +
    'main{max-width:850px;margin:auto;padding:28px 20px 72px}' +
    'header{background:#233b3c;color:white;padding:28px;border-radius:20px}' +
    'h1{margin:8px 0}.lead{max-width:760px}nav{display:flex;gap:20px;margin:18px 0 30px}' +
    'nav a{color:#235c65;font-weight:bold}.reading-card{background:#fff;border:1px solid #e4dfd6;border-radius:16px;padding:20px 24px;margin:12px 0}' +
    '.reading-card small{color:#8e6337;font-weight:bold}.reading-card h3,.reading-card h4{margin:8px 0}' +
    '.phase{padding-top:8px}.phase h3{font-size:20px}.muted{font-size:13px;color:#64625f}' +
    '.current-reading{background:#e9f2ed;border-radius:16px;padding:16px 20px;margin-top:22px}' +
    'details{font-size:12px;overflow-wrap:anywhere;color:#625d58}' +
    'aside{background:#eae5dc;border-radius:14px;padding:20px;margin-top:26px;font-size:13px}' +
    '</style></head><body><main><header><small>MYEONGHA · INTERNAL RESEARCH ONLY</small>' +
    '<h1>' +
    report.targetYear +
    '년 전체 흐름 → ' +
    report.targetMonth +
    '월의 흐름</h1>' +
    '<p class="lead">한 사람의 실제 명식에서 계산된 연간·월간 사실을, 각각 허용된 연구 해석 범위 안에서 함께 읽습니다.</p></header>' +
    '<nav aria-label="풀이 기간 바로가기"><a href="#year-reading">올해의 흐름</a>' +
    '<a href="#monthly-reading">' +
    report.targetMonth +
    '월 절입 전·후</a>' +
    '<a href="#reference-month-reading">조회 시각의 풀이</a></nav>' +
    natalContextHtml +
    comparisonHtml +
    '<section class="current-reading" id="reference-month-reading">' +
    '<h2>조회 시각에 해당하는 이번 달의 풀이</h2>' +
    '<p class="muted">조회 기준: ' +
    e(kst(selected.referenceDateTime)) +
    ' · 연구용 월별 적용 범위만 안내합니다.</p>' +
    focus +
    '</section>' +
    '<section id="year-reading"><h2>' +
    e(report.annual.headline) +
    '</h2>' +
    '<p class="muted" id="reference-year-context">' +
    e(annualContext) +
    '</p>' +
    '<p class="muted">서울 달력 연도 기준 · 연간 ' +
    e(report.annual.annualPillarLabel) +
    ' · 십신 ' +
    e(report.annual.annualStemTenGod) +
    '</p>' +
    annual +
    '</section>' +
    '<section id="monthly-reading"><h2>' +
    e(report.monthly.headline) +
    '</h2>' +
    '<p>' +
    e(report.periodComparison) +
    '</p>' +
    '<p class="muted">' +
    e(report.monthly.jeolBoundary.name) +
    ' 절입: ' +
    e(kst(report.monthly.jeolBoundary.at)) +
    '</p>' +
    monthly +
    '</section>' +
    '<aside><strong>해석 범위와 아직 모르는 부분</strong><ul>' +
    caveats +
    '</ul></aside>' +
    '</main></body></html>'
  );
}
