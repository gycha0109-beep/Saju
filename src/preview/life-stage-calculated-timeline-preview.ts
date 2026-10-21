import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';

export const LIFE_STAGE_CALCULATED_TIMELINE_VERSION = '0.1.0-research-calculation-only' as const;

export interface LifeStageCalculatedEntry {
  index: number;
  startAge: number;
  pillarHanja: string;
  ageFactPath: string;
  pillarFactPath: string;
}

export interface LifeStageCalculatedTimelinePreview {
  version: typeof LIFE_STAGE_CALCULATED_TIMELINE_VERSION;
  kind: 'life_stage_calculation_only';
  status: 'calculated_no_semantic_reading' | 'insufficient_calculation';
  researchOnly: true;
  usefulComplete: false;
  mayPublish: false;
  maySell: false;
  requestId: string;
  snapshotId: string;
  calculationHash: string;
  heading: string;
  direction?: 'forward' | 'backward';
  startAge?: number;
  entries: readonly LifeStageCalculatedEntry[];
  missing: readonly string[];
  limitations: readonly string[];
}

function guard(condition: unknown, reason: string): asserts condition {
  if (!condition) throw new TypeError('Life-stage calculation-only preview: ' + reason);
}

/**
 * Existing engine age/pillar facts only: not an executable T9 life-stage claim.
 * No invented duration, present-day active luck pillar, or life outcome.
 */
export function buildLifeStageCalculatedTimelinePreview(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
): LifeStageCalculatedTimelinePreview {
  guard(request.requestId.trim().length > 0 &&
    request.intent.domain === 'life_stage' &&
    request.intent.temporalScope === 'life_stage' &&
    request.intent.relationshipScope === undefined &&
    request.targetPeriod === undefined,
  'requires the authorized life-stage intent without a fabricated period');
  const missing: string[] = [
    '현재·다음 시기의 명리적 의미를 설명할 source-qualified T9 life_stage Claim이 확립되지 않았습니다.',
  ];
  const cycle = snapshot.luckCycle;
  const resolved = snapshot.completeness.birthTimeKnown && cycle.status === 'resolved';
  if (!snapshot.completeness.birthTimeKnown) {
    missing.push('출생시각이 미상입니다. 대운 시작점과 단계 계산을 확정하지 않습니다.');
  }
  if (cycle.status === 'unavailable') {
    missing.push('대운 계산 결과가 없습니다: ' + cycle.reasonCode);
  } else if (cycle.status === 'ambiguous') {
    missing.push('대운 계산에 복수 시나리오가 있어 한 단계 순서로 확정할 수 없습니다.');
  }
  const entries: LifeStageCalculatedEntry[] = resolved
    ? cycle.value.pillars.map((item, index) => ({
        index,
        startAge: item.age,
        pillarHanja: item.pillar.stem.hanja + item.pillar.branch.hanja,
        ageFactPath: `luckCycle.value.pillars[${index}].age`,
        pillarFactPath: `luckCycle.value.pillars[${index}].pillar`,
      })) : [];
  if (resolved && entries.length === 0) {
    missing.push('계산된 대운 단계가 없습니다.');
  }
  guard(entries.every(entry => Number.isFinite(entry.startAge) &&
    entry.startAge >= 0 && entry.pillarHanja.length === 2),
  'engine returned invalid luck-cycle age or pillar');

  return {
    version: LIFE_STAGE_CALCULATED_TIMELINE_VERSION,
    kind: 'life_stage_calculation_only',
    status: entries.length > 0
      ? 'calculated_no_semantic_reading' : 'insufficient_calculation',
    researchOnly: true, usefulComplete: false, mayPublish: false, maySell: false,
    requestId: request.requestId,
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    heading: '삶의 단계 · 계산된 대운 순서',
    ...(resolved && entries.length > 0
      ? { direction: cycle.value.direction, startAge: cycle.value.start.age }
      : {}),
    entries,
    missing,
    limitations: [
      '각 연령과 대운 기둥은 기존 계산 엔진의 구조적 관측값입니다. 단계별 길이·양력 전환일·현재 진행 중인 대운을 새로 계산하지 않습니다.',
      '순행/역행은 해당 출생 입력과 계산 정책에서 산출된 결과이며 인생의 상승·하락을 뜻하지 않습니다.',
      '대운 해석, 전환점의 사건 예측, 현재·미래 성패 판단은 별도 출처와 방법론 검토 전까지 제공하지 않습니다.',
      '이 화면은 내부 연구용 계산 미리보기이며 정식 출판·판매·생성형 해석 서비스가 아닙니다.',
    ],
  };
}

function escapeHtml(input: string): string {
  return input.replace(/[&<>"']/gu, ch =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!);
}

export function renderLifeStageCalculatedTimelineHtml(report: LifeStageCalculatedTimelinePreview): string {
  guard(report.researchOnly === true && report.usefulComplete === false &&
    report.mayPublish === false && report.maySell === false &&
    report.kind === 'life_stage_calculation_only',
  'must remain a calculation-only research presentation');
  const list = report.entries.length > 0
    ? '<ol>' + report.entries.map(entry =>
        '<li><strong>계산 시작 연령 ' + escapeHtml(String(entry.startAge)) +
        '세</strong> · ' + escapeHtml(entry.pillarHanja) +
        '<details><summary>계산 경로</summary><code>' +
        escapeHtml(entry.ageFactPath + ' / ' + entry.pillarFactPath) +
        '</code></details></li>').join('') + '</ol>'
    : '<p>입력 또는 계산 근거가 부족하여 대운 순서를 표시할 수 없습니다.</p>';
  const limits = [...report.missing, ...report.limitations]
    .map(value => '<li>' + escapeHtml(value) + '</li>').join('');
  const direction = report.direction === undefined
    ? '' : '<p>계산된 배열 방향: ' +
      (report.direction === 'forward' ? '순행' : '역행') + '</p>';
  return '<!doctype html><html lang="ko"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>명하 삶의 단계 · 내부 계산 미리보기</title>' +
    '<style>body{max-width:790px;margin:2em auto;padding:0 1.4em;font:16px/1.7 system-ui,sans-serif}' +
    'li{margin:.6em 0}aside,details{font-size:13px;color:#666}</style></head><body>' +
    '<header><small>명하 · 내부 연구용 · 해석 전 단계</small><h1>' +
    escapeHtml(report.heading) + '</h1>' + direction +
    '<p>대운 기둥을 계산된 시작 연령 순서로 보여줍니다. 운명의 사건을 예측하지 않습니다.</p>' +
    '</header><main>' + list + '</main><aside><h2>아직 설명하지 못하는 부분</h2><ul>' +
    limits + '</ul></aside></body></html>';
}
