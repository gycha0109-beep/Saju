import type { CanonicalSajuSnapshot, PillarSlot } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';

export const COMPATIBILITY_TWO_CHART_PREVIEW_VERSION = '0.1.0-research-intake' as const;

const SLOTS: readonly PillarSlot[] = ['year', 'month', 'day', 'hour'];
const SLOT_KO: Record<PillarSlot, string> = {
  year: '연주', month: '월주', day: '일주', hour: '시주',
};

export interface CompatibilitySubjectInput {
  personRef: string;
  snapshot: CanonicalSajuSnapshot;
}

export interface CompatibilityPillarObservation {
  slot: PillarSlot;
  label: string;
  status: 'resolved' | 'unavailable';
  stemHanja?: string;
  branchHanja?: string;
  factPath: string;
}

export interface CompatibilitySubjectObservation {
  personRef: string;
  snapshotId: string;
  calculationHash: string;
  birthTimeKnown: boolean;
  pillars: readonly CompatibilityPillarObservation[];
}

export interface CompatibilityTwoChartIntakePreview {
  version: typeof COMPATIBILITY_TWO_CHART_PREVIEW_VERSION;
  mode: 'two_person_calculation_only';
  readingStatus: 'insufficient_interpersonal_meaning_authority';
  researchOnly: true;
  usefulComplete: false;
  mayPublish: false;
  maySell: false;
  requestId: string;
  subject: CompatibilitySubjectObservation;
  target: CompatibilitySubjectObservation;
  missing: readonly string[];
  limitations: readonly string[];
}

function guard(value: unknown, reason: string): asserts value {
  if (!value) throw new TypeError('Two-chart compatibility intake: ' + reason);
}

function observe(input: CompatibilitySubjectInput): CompatibilitySubjectObservation {
  const pillars: CompatibilityPillarObservation[] = SLOTS.map(slot => {
    const result = input.snapshot.pillars[slot];
    if (result.status !== 'resolved') {
      return {
        slot, label: SLOT_KO[slot],
        status: 'unavailable' as const,
        factPath: `pillars.${slot}`,
      };
    }
    return {
      slot, label: SLOT_KO[slot],
      status: 'resolved' as const,
      stemHanja: result.value.stem.hanja,
      branchHanja: result.value.branch.hanja,
      factPath: `pillars.${slot}.value`,
    };
  });
  return {
    personRef: input.personRef,
    snapshotId: input.snapshot.snapshotId,
    calculationHash: input.snapshot.calculationHash,
    birthTimeKnown: input.snapshot.completeness.birthTimeKnown,
    pillars,
  };
}

/**
 * Reuse TWO existing Canonical calculations without pretending individual
 * pillar observations are source-qualified T10 interpersonal interactions.
 * Equal calculation hashes are legitimate for different real people.
 */
export function buildCompatibilityTwoChartIntakePreview(
  request: ReadingRequest,
  subject: CompatibilitySubjectInput,
  target: CompatibilitySubjectInput,
): CompatibilityTwoChartIntakePreview {
  guard(request.intent.domain === 'compatibility' &&
    request.intent.temporalScope === 'natal' &&
    request.intent.relationshipScope === undefined &&
    request.targetPeriod === undefined,
  'only canonical two-person natal compatibility input is accepted');
  const personRef = subject.personRef.trim();
  const targetRef = target.personRef.trim();
  guard(request.requestId.trim().length > 0 &&
    personRef.length > 0 && targetRef.length > 0 &&
    personRef !== targetRef && request.targetPersonRef === targetRef,
  'two different subject references and exact requested target are required');
  guard(subject.snapshot.snapshotId.length > 0 &&
    target.snapshot.snapshotId.length > 0 &&
    subject.snapshot.calculationHash.length > 0 &&
    target.snapshot.calculationHash.length > 0,
  'both Canonical snapshot identities are required');
  const first = observe({ ...subject, personRef });
  const second = observe({ ...target, personRef: targetRef });
  const missing: string[] = [
    '두 명식 사이의 상호작용을 설명하는 source-qualified T10 Claim·Methodology가 아직 승인되지 않았습니다. 궁합 결과나 점수를 만들지 않습니다.',
  ];
  if (!first.birthTimeKnown) missing.push('첫 번째 사람의 출생시각 미상: 시주와 관련된 상호 구조 판단을 보류합니다.');
  if (!second.birthTimeKnown) missing.push('두 번째 사람의 출생시각 미상: 시주와 관련된 상호 구조 판단을 보류합니다.');
  return {
    version: COMPATIBILITY_TWO_CHART_PREVIEW_VERSION,
    mode: 'two_person_calculation_only',
    readingStatus: 'insufficient_interpersonal_meaning_authority',
    researchOnly: true, usefulComplete: false, mayPublish: false, maySell: false,
    requestId: request.requestId,
    subject: first,
    target: second,
    missing,
    limitations: [
      '두 사람 각각의 기존 명식 계산 사실만 제시합니다. 나란히 표시한 것이 궁합 관계의 해석 근거는 아닙니다.',
      '상대방 출생정보 사용·공유 동의와 접근 권한은 별도 명하 UX/개인정보 계약에 따라 확인해야 합니다.',
      '갈등·성격·결혼 결과·확률·결혼 시기·운명을 추정하지 않으며 공식 출판·판매용으로 사용할 수 없습니다.',
    ],
  };
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/gu, char =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
}

function personHtml(person: CompatibilitySubjectObservation, label: string): string {
  const rows = person.pillars.map(pillar =>
    '<tr><th scope="row">' + escapeHtml(pillar.label) + '</th><td>' +
    (pillar.status === 'resolved'
      ? escapeHtml(pillar.stemHanja! + pillar.branchHanja!)
      : '확인 불가') + '</td><td><code>' + escapeHtml(pillar.factPath) +
    '</code></td></tr>').join('');
  return '<section><h2>' + escapeHtml(label) + '</h2><table><thead><tr><th>기둥</th>' +
    '<th>계산 관측</th><th>원국 경로</th></tr></thead><tbody>' +
    rows + '</tbody></table></section>';
}

/** Calculation-only side-by-side UI, not a compatibility result. */
export function renderCompatibilityTwoChartIntakeHtml(report: CompatibilityTwoChartIntakePreview): string {
  guard(report.mode === 'two_person_calculation_only' &&
    report.readingStatus === 'insufficient_interpersonal_meaning_authority' &&
    report.researchOnly === true && report.usefulComplete === false &&
    report.mayPublish === false && report.maySell === false,
  'unapproved two-person content cannot be displayed as official meaning');
  const limits = [...report.missing, ...report.limitations]
    .map(item => '<li>' + escapeHtml(item) + '</li>').join('');
  return '<!doctype html><html lang="ko"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<title>명하 궁합 명식 확인 · 내부 연구용</title>' +
    '<style>body{max-width:780px;margin:2em auto;padding:0 1.3em;font:16px/1.75 system-ui,sans-serif}' +
    'table{border-collapse:collapse;width:100%;margin:1em 0}th,td{padding:.5em;border:1px solid #ddd}' +
    'code,aside{font-size:12px;color:#666}section{margin-top:2em}</style>' +
    '</head><body><header><h1>두 사람의 명식 확인</h1>' +
    '<p>궁합 해석은 아직 제공할 수 없습니다. 계산 가능한 명식만 각각 확인합니다.</p>' +
    '<strong>내부 연구용 · 궁합 점수·상호 관계 판정 없음</strong></header>' +
    '<main>' + personHtml(report.subject, '첫 번째 명식') +
    personHtml(report.target, '두 번째 명식') +
    '</main><aside><h2>부족한 근거와 제한</h2><ul>' + limits +
    '</ul></aside></body></html>';
}
