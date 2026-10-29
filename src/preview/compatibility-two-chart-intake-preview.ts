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

/** Literal comparison of two Canonical pillar observations; never a T10 relation. */
export interface CompatibilityPillarFactComparison {
  slot: PillarSlot;
  label: string;
  subjectFactPath: string;
  targetFactPath: string;
  subjectObserved?: string;
  targetObserved?: string;
  observation: 'same_calculated_pillar' | 'different_calculated_pillar' | 'insufficient_input';
  explanation: string;
}

/** Existing same-person natal T8 research, never a two-person T10 result. */
export interface CompatibilityPersonalRelationshipReading {
  personRef: string;
  snapshotId: string;
  calculationHash: string;
  coverage: 'bounded_natal_t8_research' | 'insufficient_evidence';
  introduction: string;
  sections: readonly {
    title: string;
    paragraph: string;
    sourceIds: readonly string[];
    observedFactPaths: readonly string[];
    /** Independently issued T8 interpretation using previously selected facts. */
    evidenceMode?: 'reused_calculated_paths' | 'original_source_core';
  }[];
}

export interface CompatibilityPersonalRelationshipContext {
  subject: CompatibilityPersonalRelationshipReading;
  target: CompatibilityPersonalRelationshipReading;
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
  comparisons: readonly CompatibilityPillarFactComparison[];
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

function comparePillars(
  subject: CompatibilitySubjectObservation,
  target: CompatibilitySubjectObservation,
): readonly CompatibilityPillarFactComparison[] {
  return SLOTS.map((slot, index) => {
    const left = subject.pillars[index];
    const right = target.pillars[index];
    guard(left?.slot === slot && right?.slot === slot,
      'both persons must have separate complete canonical pillar slots');
    const shared = {
      slot, label: SLOT_KO[slot],
      subjectFactPath: left.factPath,
      targetFactPath: right.factPath,
    };
    if (left.status !== 'resolved' || right.status !== 'resolved') {
      return {
        ...shared, observation: 'insufficient_input' as const,
        explanation: SLOT_KO[slot] +
          '는 두 사람 중 한 명 이상에서 계산 정보가 확정되지 않아 비교하지 않습니다.',
      };
    }
    guard(left.stemHanja !== undefined && left.branchHanja !== undefined &&
      right.stemHanja !== undefined && right.branchHanja !== undefined,
      'resolved two-chart pillar must contain exact stem and branch');
    const subjectObserved = left.stemHanja + left.branchHanja;
    const targetObserved = right.stemHanja + right.branchHanja;
    const equal = subjectObserved === targetObserved;
    return {
      ...shared, subjectObserved, targetObserved,
      observation: equal ? 'same_calculated_pillar' as const :
        'different_calculated_pillar' as const,
      explanation: '계산 사실만 비교하면 ' + SLOT_KO[slot] + '는 첫 번째 명식 ' +
        subjectObserved + ', 두 번째 명식 ' + targetObserved +
        (equal ? '으로 동일합니다.' : '으로 서로 다릅니다.') +
        ' 일치·차이는 궁합의 좋고 나쁨을 뜻하지 않습니다.',
    };
  });
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
  const comparisons = comparePillars(first, second);
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
    comparisons,
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

function comparisonHtml(report: CompatibilityTwoChartIntakePreview): string {
  guard(report.comparisons.length === SLOTS.length &&
    report.comparisons.every((item, index) => {
      const slot = SLOTS[index]!;
      const left = report.subject.pillars[index];
      const right = report.target.pillars[index];
      if (item.slot !== slot || left?.slot !== slot || right?.slot !== slot ||
          item.subjectFactPath !== left.factPath ||
          item.targetFactPath !== right.factPath) return false;
      if (left.status !== 'resolved' || right.status !== 'resolved') {
        return item.observation === 'insufficient_input' &&
          item.subjectObserved === undefined && item.targetObserved === undefined;
      }
      const a = left.stemHanja! + left.branchHanja!;
      const b = right.stemHanja! + right.branchHanja!;
      return item.subjectObserved === a && item.targetObserved === b &&
        item.observation === (a === b ? 'same_calculated_pillar' : 'different_calculated_pillar');
    }),
  'comparison must repeat exact two-person source observations only');
  return '<section aria-label="두 명식의 실제 계산 차이"><h2>두 명식에서 계산된 차이</h2>' +
    '<p>아래 일치·차이는 양쪽 명식의 간지만 대조한 사실이며 궁합 점수·관계 결과는 아닙니다.</p><ul>' +
    report.comparisons.map(item => '<li>' + escapeHtml(item.explanation) +
      '</li>').join('') + '</ul></section>';
}

function personalRelationshipHtml(
  report: CompatibilityTwoChartIntakePreview,
  context: CompatibilityPersonalRelationshipContext,
): string {
  const people = [
    { name: '첫 번째 사람의 원국 관계 풀이', facts: report.subject, reading: context.subject },
    { name: '두 번째 사람의 원국 관계 풀이', facts: report.target, reading: context.target },
  ];
  for (const { facts, reading } of people) {
    guard(reading.personRef === facts.personRef &&
      reading.snapshotId === facts.snapshotId &&
      reading.calculationHash === facts.calculationHash &&
      reading.sections.every((section, index) =>
        section.title.trim().length > 0 &&
        section.paragraph.trim().length > 0 &&
        section.sourceIds.length >= 2 &&
        section.observedFactPaths.length >= 2 &&
        (section.evidenceMode !== 'reused_calculated_paths' ||
          (index > 0 && section.observedFactPaths.every(path =>
            reading.sections.slice(0, index).some(prior =>
              prior.evidenceMode === undefined &&
              prior.observedFactPaths.includes(path)))))) &&
      (reading.coverage === 'bounded_natal_t8_research' ?
        reading.sections.length > 0 : reading.sections.length === 0),
    'each personal T8 interpretation must retain its own calculated snapshot and sources');
  }
  return '<section aria-label="두 사람 각각의 근거 있는 원국 관계 풀이">' +
    '<h2>두 사람 각각의 관계 풀이 · 내부 연구</h2>' +
    '<p>각각 본인 명식의 기존 T8 관계 해석 근거만 사용합니다. ' +
    '이 두 풀이가 서로의 궁합·갈등·결혼 결과를 나타내지는 않습니다.</p>' +
    people.map(({ name, reading }) =>
      '<article><h3>' + escapeHtml(name) + '</h3>' +
      '<p>' + escapeHtml(reading.introduction) + '</p>' +
      (reading.sections.length === 0
        ? '<p>이 사람의 명식에서는 출처를 갖춘 원국 관계 풀이가 부족합니다.</p>'
        : reading.sections.map(section =>
          '<div><h4>' + escapeHtml(section.title) + '</h4><p>' +
          escapeHtml(section.paragraph) + '</p>' +
          (section.evidenceMode === 'reused_calculated_paths'
            ? '<p>같은 사람에게서 이미 사용한 근거를 다시 읽는 별도 기존 T8 관점입니다. ' +
              '궁합이나 두 사람의 관계 결과가 아니며 독립 근거가 추가된 것도 아닙니다.</p>'
            : section.evidenceMode === 'original_source_core'
              ? '<p>원래 중심 후보로 발행된 같은 사람의 별도 T8 원문입니다. ' +
                '다른 실제 근거를 우선해 첫 화면에서 제외했지만, 궁합·상호작용의 독립 근거가 아닙니다.</p>'
              : '') + '<details><summary>해석 근거</summary>' +
          '<p>Source: ' + escapeHtml(section.sourceIds.join(' · ')) +
          '</p><p>계산 사실 경로: ' +
          escapeHtml(section.observedFactPaths.join(' · ')) +
          '</p></details></div>').join('')) + '</article>',
    ).join('') + '</section>';
}

/** Calculation-only side-by-side UI, not a compatibility result. */
export function renderCompatibilityTwoChartIntakeHtml(
  report: CompatibilityTwoChartIntakePreview,
  personalRelationship?: CompatibilityPersonalRelationshipContext,
): string {
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
    comparisonHtml(report) +
    (personalRelationship === undefined ? '' :
      personalRelationshipHtml(report, personalRelationship)) +
    '</main><aside><h2>부족한 근거와 제한</h2><ul>' + limits +
    '</ul></aside></body></html>';
}
