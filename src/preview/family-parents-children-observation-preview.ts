import type { CanonicalSajuSnapshot, PillarSlot } from '../contracts/calculation.js';
import {
  R070_AUTHORITY,
  R070_CLAIM_LAYERS,
  R070_FAMILY_DOMAIN_CLAIM_CORPUS_VERSION,
  R070_REJECTED_SHORTCUTS,
} from '../research/general-natal-family-domain-claim-corpus.js';

export const FAMILY_CANONICAL_OBSERVATION_PREVIEW_VERSION =
  'myeongha-family-canonical-observation-preview-v1' as const;

export type FamilyObservationScope = 'parents' | 'children';

export interface FamilyPillarObservation {
  pillarSlot: PillarSlot;
  factPath: string;
  pillarLabel: string;
  state: 'resolved' | 'ambiguous' | 'unavailable';
  observedPillar?: string;
  text: string;
}

export interface FamilyCanonicalObservationPreview {
  version: typeof FAMILY_CANONICAL_OBSERVATION_PREVIEW_VERSION;
  mode: 'internal_exploration';
  status: 'not_official_reading';
  scope: FamilyObservationScope;
  headline: string;
  snapshotId: string;
  calculationHash: string;
  observationCoverage: 'calculated_fact_only' | 'partial_fact_only' | 'insufficient_input';
  interpretationCoverage: 'insufficient_evidence';
  researchOnly: true;
  usefulComplete: false;
  mayPublish: false;
  maySell: false;
  corpusVersion: typeof R070_FAMILY_DOMAIN_CLAIM_CORPUS_VERSION;
  historicalLayerIds: readonly string[];
  observations: readonly FamilyPillarObservation[];
  observationSummary: string;
  introduction: string;
  missing: readonly string[];
  limitations: readonly string[];
}

const SLOT_LABEL: Readonly<Record<PillarSlot, string>> = {
  year: '연주',
  month: '월주',
  day: '일주',
  hour: '시주',
};
const SCOPE_SLOTS: Readonly<Record<FamilyObservationScope, readonly PillarSlot[]>> = {
  parents: ['year', 'month'],
  children: ['hour'],
};

function assertSourceIsObservationOnly(): void {
  if (R070_AUTHORITY.executableFamilyClassifierAuthorized !== false ||
      R070_AUTHORITY.deterministicFamilyOutcomeAuthorized !== false ||
      R070_AUTHORITY.productionAuthorityPromoted !== false ||
      R070_CLAIM_LAYERS.some(layer => layer.executable !== false) ||
      !R070_REJECTED_SHORTCUTS.includes('MONTH_PILLAR_ALONE_DETERMINES_PARENTS') ||
      !R070_REJECTED_SHORTCUTS.includes('HOUR_PILLAR_ALONE_DETERMINES_CHILDREN')) {
    throw new TypeError('Family research corpus does not authorize a family reading classifier.');
  }
}

function observation(
  snapshot: CanonicalSajuSnapshot,
  slot: PillarSlot,
): FamilyPillarObservation {
  const fact = snapshot.pillars[slot];
  const pillarLabel = SLOT_LABEL[slot];
  const factPath = 'pillars.' + slot;
  if (fact.status === 'resolved') {
    const observedPillar = fact.value.stem.value + fact.value.branch.value;
    return {
      pillarSlot: slot, pillarLabel, factPath,
      state: 'resolved', observedPillar,
      text: pillarLabel + '에 실제로 계산된 간지는 ' + observedPillar +
        '입니다. 이는 본인의 명식 계산 사실이며, 가족 구성원의 특성이나 운명을 설명하지 않습니다.',
    };
  }
  return {
    pillarSlot: slot, pillarLabel, factPath,
    state: fact.status === 'ambiguous' ? 'ambiguous' : 'unavailable',
    text: pillarLabel + '의 간지가 확정되지 않았으므로 관측값을 만들어내지 않습니다.',
  };
}

/**
 * Consumer-readable but calculation-only preview. R070 records incompatible
 * historical family attribution layers; none can be promoted to a T8 Claim.
 * This function never asserts anything about the parent's or child's fate,
 * personality, existence, health or relationship outcome.
 */
export function buildFamilyCanonicalObservationPreview(
  snapshot: CanonicalSajuSnapshot,
  scope: FamilyObservationScope,
): FamilyCanonicalObservationPreview {
  assertSourceIsObservationOnly();
  if (scope !== 'parents' && scope !== 'children') {
    throw new TypeError('Family scope must explicitly select parents or children.');
  }
  const observations = SCOPE_SLOTS[scope].map(slot => observation(snapshot, slot));
  const readyCount = observations.filter(item => item.state === 'resolved').length;
  const observationCoverage = readyCount === 0
    ? 'insufficient_input' as const
    : readyCount === observations.length
      ? 'calculated_fact_only' as const
      : 'partial_fact_only' as const;
  const parents = scope === 'parents';
  const historicalLayerIds = parents
    ? ['PILLAR-DOMAIN-GENERAL', 'PILLAR-DOMAIN-MALE-ALTERNATE', 'TEN-GOD-FAMILY-RELATIONS']
    : ['PILLAR-DOMAIN-GENERAL', 'TEN-GOD-FAMILY-RELATIONS', 'FEMALE-CHILD-RELATION'];
  const details = observations.map(item =>
    item.state === 'resolved'
      ? item.pillarLabel + ' ' + item.observedPillar
      : item.pillarLabel + ' 계산값 미확정');
  const observationSummary = parents
    ? '본인 명식에서 부모 주제로 확인할 수 있는 기둥은 ' +
      details.join(' · ') + '입니다. 연주와 월주가 실제 계산된 사실을 나란히 보여주며, ' +
      '서로 다른 고전의 배속 방법이 승인되지 않아 이 수치로 부모의 성격이나 관계를 판정하지 않습니다.'
    : '본인 명식에서 자녀 주제로 확인할 수 있는 기둥은 ' +
      details.join(' · ') + '입니다. 시주가 미확정이면 관측 자체가 보류되고, ' +
      '확정되어도 자녀 본인의 성향·존재 여부나 가족 관계의 결과를 판정하지 않습니다.';
  const introduction = parents
    ? '부모 관련 고전 배속에는 월주를 보는 설명과 일부 남성 명식의 연주·태를 다루는 설명이 병존합니다. ' +
      '어느 방법을 현재 명식에 적용할지 승인되지 않아, 이 화면은 원국의 연·월주 계산 사실만 보여줍니다.'
    : '자녀와 관련된 고전 배속에는 시주를 보는 설명과 성별·별(십신) 기준의 별도 설명이 병존합니다. ' +
      '어느 방법을 적용할지 승인되지 않아, 이 화면은 원국의 시주 계산 사실만 보여줍니다.';
  const missing = [
    ...(observations.some(item => item.state !== 'resolved')
      ? ['선택한 가족 주제와 관련해 표시할 명식의 일부 기둥 정보가 확정되지 않았습니다.']
      : []),
    '부모 또는 자녀에 대한 개인별 T8 해석 Claim·선택 방법론·source 근거가 아직 승인되지 않았습니다.',
    '가족 구성원 자체의 삶을 분석하려면 그 사람의 별도 출생 입력과 정당한 사용 범위가 필요합니다.',
  ];
  return {
    version: FAMILY_CANONICAL_OBSERVATION_PREVIEW_VERSION,
    mode: 'internal_exploration', status: 'not_official_reading',
    scope,
    headline: parents ? '부모와 관련된 명식 관찰' : '자녀와 관련된 명식 관찰',
    snapshotId: snapshot.snapshotId, calculationHash: snapshot.calculationHash,
    observationCoverage, interpretationCoverage: 'insufficient_evidence',
    researchOnly: true, usefulComplete: false, mayPublish: false, maySell: false,
    corpusVersion: R070_FAMILY_DOMAIN_CLAIM_CORPUS_VERSION,
    historicalLayerIds,
    observations, observationSummary, introduction, missing,
    limitations: [
      '고전 자료의 다양한 부모·자녀 배속은 연구 분류일 뿐 실행 승인된 가족운 판정 규칙이 아닙니다.',
      '연주·월주·시주나 십신의 유무를 가족의 존재, 성격, 수명, 관계 결과와 자동 연결하지 않습니다.',
      '한 사람의 명식 관찰과 다른 가족 구성원의 실제 출생정보를 혼동하지 않습니다.',
      '현재 출력은 공식 가족운 풀이가 아닌 내부 연구용 부분 입력 맥락이며, 공개·저장·판매 권한이 없습니다.',
    ],
  };
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/gu, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]!);
}

export function renderFamilyCanonicalObservationHtml(
  report: FamilyCanonicalObservationPreview,
): string {
  const e = escapeHtml;
  const cards = report.observations.map(item =>
    '<section><h2>' + e(item.pillarLabel) + '</h2><p>' + e(item.text) + '</p>' +
    '<details><summary>계산 근거</summary><p>' + e(item.factPath) + '</p></details></section>',
  ).join('\n');
  return '<!doctype html><html lang="ko"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>' + e(report.headline) + ' · 내부 연구</title>' +
    '<style>body{background:#f7f2ec;color:#2a2824;font-family:system-ui,"Malgun Gothic",sans-serif;line-height:1.7;margin:0}' +
    'main{max-width:800px;margin:auto;padding:28px 20px 64px}' +
    'section{background:white;padding:20px;border-radius:14px;margin:16px 0}' +
    'aside{background:#eee6dc;padding:20px;border-radius:14px}details{font-size:13px}</style>' +
    '</head><body><main><small>MYEONGHA · INTERNAL RESEARCH ONLY</small><h1>' +
    e(report.headline) + '</h1><p>' + e(report.introduction) + '</p>' +
    '<section aria-label="선택한 가족 범위의 명식 요약"><h2>이 명식에서 확인되는 계산 사실</h2><p>' +
    e(report.observationSummary) + '</p></section>' + cards +
    '<aside><strong>아직 해석할 수 없는 부분</strong><ul>' +
    [...report.missing, ...report.limitations].map(x => '<li>' + e(x) + '</li>').join('') +
    '</ul><p>기존 연구 분류: ' + e(report.corpusVersion) +
    ' / ' + e(report.historicalLayerIds.join(', ')) + '</p></aside></main></body></html>';
}
