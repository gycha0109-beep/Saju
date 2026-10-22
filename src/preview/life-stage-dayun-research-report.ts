import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import {
  DAYUN_TEMPORAL_CONTEXT_POLICY,
  DAYUN_TEMPORAL_CONTEXT_POLICY_CONTENT_HASH,
  resolveDayunTemporalContext,
  type DayunTemporalSegment,
  type UnavailableDayunTemporalContext,
} from '../reading/dayun-temporal-context.js';

export const LIFE_STAGE_DAYUN_RESEARCH_REPORT_VERSION =
  'myeongha-life-stage-dayun-fact-reader-v1' as const;

export interface LifeStageDayunFactPeriod {
  kind: 'current' | 'next';
  pillar: string;
  cycleIndex: number;
  ageMarker: number;
  startsAt: string;
  endsAtExclusive: string;
  text: string;
}

export interface LifeStageDayunResearchReport {
  version: typeof LIFE_STAGE_DAYUN_RESEARCH_REPORT_VERSION;
  mode: 'internal_exploration';
  status: 'not_official_reading';
  coverage: 'calculated_only' | 'unavailable';
  interpretationStatus: 'source_authority_not_established';
  researchOnly: true;
  usefulComplete: false;
  mayPublish: false;
  maySell: false;
  snapshotId: string;
  calculationHash: string;
  referenceDateTime: string;
  referenceLocalDateTime: string;
  timeZone: 'Asia/Seoul';
  policyId: typeof DAYUN_TEMPORAL_CONTEXT_POLICY.policyId;
  policyHash: typeof DAYUN_TEMPORAL_CONTEXT_POLICY_CONTENT_HASH;
  headline: string;
  periods: readonly LifeStageDayunFactPeriod[];
  transitionSummary?: string;
  missing: readonly string[];
  caveats: readonly string[];
}

function normalizedLocalDateTime(input: string): { instant: string; local: string; year: number } {
  if (!/(?:Z|[+-]\d{2}:\d{2})$/u.test(input)) {
    throw new RangeError('Life-stage reference time must include an explicit UTC offset.');
  }
  const parsed = new Date(input);
  if (!Number.isFinite(parsed.getTime())) {
    throw new RangeError('Life-stage reference time is invalid.');
  }
  const local = new Date(parsed.getTime() + 9 * 60 * 60 * 1000)
    .toISOString().slice(0, 16);
  return { instant: parsed.toISOString(), local, year: Number(local.slice(0, 4)) };
}

const UNAVAILABLE_REASON_KO: Readonly<
  Record<UnavailableDayunTemporalContext['reasonCode'], string>
> = {
  invalid_target_year: '조회 연도에 맞는 대운 계산 범위를 확인할 수 없습니다.',
  luck_cycle_unavailable: '이 명식에서 대운 계산 정보가 확정되지 않았습니다.',
  birth_solar_date_unavailable: '양력 생년월일이 확정되지 않아 대운 구간을 계산할 수 없습니다.',
  birth_clock_time_unavailable: '출생시각이 확정되지 않아 대운 구간을 계산할 수 없습니다.',
  unsupported_time_zone: '대운 계산에 필요한 서울 시간 정책을 적용할 수 없습니다.',
  detailed_start_unavailable: '대운 시작 연·월·일의 계산 근거가 충분하지 않습니다.',
  malformed_luck_cycle: '대운 계산 자료의 순서가 일치하지 않습니다.',
  target_before_first_dayun: '현재 시각은 계산상 첫 대운이 시작하기 전입니다.',
  target_after_available_dayun_range: '현재 시각은 제공된 대운 계산 범위를 벗어났습니다.',
};

function period(kind: 'current' | 'next', segment: DayunTemporalSegment): LifeStageDayunFactPeriod {
  const pillar = segment.pillar.stem.value + segment.pillar.branch.value;
  const text = kind === 'current'
    ? '현재 기준으로 명식에서 계산된 대운은 ' + pillar + ' 구간입니다. ' +
      segment.startLocalDateTime + '부터 ' + segment.endExclusiveLocalDateTime +
      ' 전까지로 계산됩니다. 이 구간의 간지와 기간만 확인한 것으로, 삶의 성패나 사건을 뜻하지 않습니다.'
    : '다음 계산상 대운은 ' + pillar + ' 구간입니다. ' +
      segment.startLocalDateTime + '부터 ' + segment.endExclusiveLocalDateTime +
      ' 전까지로 계산됩니다. 전환 시각은 계산상의 구간 경계이며 특정 변화를 예고하지 않습니다.';
  return {
    kind, pillar, cycleIndex: segment.index, ageMarker: segment.ageMarker,
    startsAt: segment.startLocalDateTime,
    endsAtExclusive: segment.endExclusiveLocalDateTime,
    text,
  };
}

/** Relates two consecutive computed segments without claiming a future event. */
function summarizeDayunTransition(
  periods: readonly LifeStageDayunFactPeriod[],
): string | undefined {
  const current = periods.find(item => item.kind === 'current');
  if (current === undefined) return undefined;
  const next = periods.find(item => item.kind === 'next');
  if (next === undefined) {
    return '현재 확인 가능한 대운은 ' + current.pillar + '이며 ' +
      current.endsAtExclusive + ' 이전까지가 계산 범위입니다. ' +
      '그 이후의 대운 간지·시작 구간은 아직 확인되지 않아 전환을 설명하지 않습니다.';
  }
  if (next.cycleIndex !== current.cycleIndex + 1 ||
      next.startsAt !== current.endsAtExclusive) {
    throw new TypeError('Life-stage transition must use adjacent canonical Dayun periods.');
  }
  return '이 명식에서 ' + current.pillar + ' 대운은 ' +
    current.endsAtExclusive + ' 직전까지, 이어지는 ' +
    next.pillar + ' 대운은 같은 시각부터 계산됩니다. ' +
    '이는 서로 맞닿는 대운 기간을 보여주는 계산 사실이며 삶의 변화·길흉·사건 발생을 뜻하지 않습니다.';
}

/**
 * Life-stage internal research read: a consumer-visible presentation of
 * already-computed canonical Daeyun boundaries, NOT a T8 interpretation.
 * Does not create an independent temporal oracle or use narrative inference.
 */
export function buildLifeStageDayunResearchReport(
  snapshot: CanonicalSajuSnapshot,
  referenceDateTime: string,
): LifeStageDayunResearchReport {
  const ref = normalizedLocalDateTime(referenceDateTime);
  if (DAYUN_TEMPORAL_CONTEXT_POLICY.semanticRule !== 'NO_INTERPRETATION_OR_POLARITY') {
    throw new TypeError('Life-stage factual preview cannot use a semantic Dayun policy.');
  }
  const currentYear = resolveDayunTemporalContext(snapshot, ref.year);
  const periods: LifeStageDayunFactPeriod[] = [];
  const missing: string[] = [];
  if (currentYear.status === 'unavailable') {
    missing.push(UNAVAILABLE_REASON_KO[currentYear.reasonCode]);
  } else {
    if (currentYear.snapshotId !== snapshot.snapshotId) {
      throw new TypeError('Life-stage Dayun result must belong to the source natal chart.');
    }
    const current = currentYear.segments.find(segment =>
      segment.startLocalDateTime <= ref.local &&
      ref.local < segment.endExclusiveLocalDateTime);
    if (current === undefined) {
      missing.push('현재 시각에 해당하는 계산상 대운 구간을 확인할 수 없습니다.');
    } else {
      periods.push(period('current', current));
      const boundaryYear = Number(current.endExclusiveLocalDateTime.slice(0, 4));
      const boundary = resolveDayunTemporalContext(snapshot, boundaryYear);
      const next = boundary.status === 'resolved'
        ? boundary.segments.find(segment =>
            segment.index === current.index + 1 &&
            segment.startLocalDateTime === current.endExclusiveLocalDateTime)
        : undefined;
      if (next !== undefined) periods.push(period('next', next));
      else missing.push('다음 대운의 시작 시각 및 간지는 계산 자료에서 확정할 수 없습니다.');
    }
  }
  const transitionSummary = summarizeDayunTransition(periods);
  return {
    version: LIFE_STAGE_DAYUN_RESEARCH_REPORT_VERSION,
    mode: 'internal_exploration', status: 'not_official_reading',
    coverage: periods.length > 0 ? 'calculated_only' : 'unavailable',
    interpretationStatus: 'source_authority_not_established',
    researchOnly: true, usefulComplete: false, mayPublish: false, maySell: false,
    snapshotId: snapshot.snapshotId, calculationHash: snapshot.calculationHash,
    referenceDateTime: ref.instant, referenceLocalDateTime: ref.local,
    timeZone: 'Asia/Seoul',
    policyId: DAYUN_TEMPORAL_CONTEXT_POLICY.policyId,
    policyHash: DAYUN_TEMPORAL_CONTEXT_POLICY_CONTENT_HASH,
    headline: '지금과 다음 삶의 단계 — 계산상 대운 구간',
    periods,
    ...(transitionSummary === undefined ? {} : { transitionSummary }),
    missing,
    caveats: [
      '대운 간지와 적용 구간은 Canonical 계산 사실이며, 각 구간의 좋고 나쁨이나 미래 사건을 뜻하지 않습니다.',
      '대운과 원국의 합·충 또는 강약을 연결하는 개인별 해석 근거는 아직 허가되지 않았습니다.',
      '따라서 이 화면은 삶의 단계 종합풀이가 아니며 내부 연구 시제품입니다. 공식 공개·저장·판매에 사용할 수 없습니다.',
    ],
  };
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/gu, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]!);
}

export function renderLifeStageDayunResearchHtml(report: LifeStageDayunResearchReport): string {
  const e = escapeHtml;
  const periods = report.periods.map(p =>
    '<section><h2>' + (p.kind === 'current' ? '지금의 계산 구간' : '다음 계산 구간') +
    '</h2><p>' + e(p.text) + '</p>' +
    '<details><summary>계산 근거</summary><p>대운 순서: ' + p.cycleIndex +
    ', 전통식 연령 표시: ' + p.ageMarker + '</p><p>구간: ' +
    e(p.startsAt) + ' — ' + e(p.endsAtExclusive) + ' (종료 시각 제외)</p><p>정책: ' +
    e(report.policyId) + ' · ' + e(report.policyHash) + '</p></details></section>',
  ).join('\n');
  return '<!doctype html><html lang="ko"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<title>' + e(report.headline) + ' · 내부 연구</title>' +
    '<style>body{font-family:system-ui,"Malgun Gothic",sans-serif;background:#f6f2eb;color:#292a27;line-height:1.75;margin:0}' +
    'main{max-width:800px;margin:auto;padding:30px 20px 60px}section{background:#fff;padding:22px;border-radius:16px;margin:16px 0}' +
    'details{font-size:12px;overflow-wrap:anywhere}aside{background:#eee8de;padding:20px;border-radius:12px}</style>' +
    '</head><body><main><small>MYEONGHA · INTERNAL RESEARCH ONLY</small>' +
    '<h1>' + e(report.headline) + '</h1><p>조회 기준: ' +
    e(report.referenceLocalDateTime) + ' KST</p>' +
    (report.transitionSummary === undefined ? '' :
      '<section aria-label="현재와 다음 대운의 계산 전환"><h2>지금과 다음 대운의 경계</h2><p>' +
      e(report.transitionSummary) + '</p></section>') + periods +
    '<aside><strong>아직 알 수 없는 부분</strong><ul>' +
    [...report.missing, ...report.caveats].map(s => '<li>' + e(s) + '</li>').join('') +
    '</ul></aside></main></body></html>';
}
