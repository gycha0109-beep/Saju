/**
 * N11 — deterministic reviewer packet from the actual 35-case HTTP consumer response.
 * Internal QA only. No automated expert review, semantic admission or commerce.
 */
export const NATAL_READER_REVIEW_PACKET_VERSION = 'saju-natal-n11-real-http-review-packet-v1';

export const NATAL_READER_REVIEW_CASES = Object.freeze([
  { caseId: 'solar-1984-01-07-00:30', label: '동일 십신: 천간 관측' },
  { caseId: 'solar-1984-01-07-12:30', label: '동일 십신: 지지 관측' },
  { caseId: 'solar-1989-09-08-05:30', label: '복수 십신 계열 비교 A' },
  { caseId: 'solar-1989-09-08-12:30', label: '복수 십신 계열 비교 B' },
  { caseId: 'solar-1989-09-08-00:30', label: '관측 존재 여부 비교 A' },
  { caseId: 'solar-1989-09-08-19:30', label: '관측 존재 여부 비교 B' },
  { caseId: 'solar-1992-01-12-00:30', label: '동일 Research 규칙 비교 A' },
  { caseId: 'solar-1992-01-12-19:30', label: '동일 Research 규칙 비교 B' },
  { caseId: 'unknown-time-1992-01-12', label: '출생시각 미상 및 부분 응답 A' },
  { caseId: 'unknown-time-2024-03-10', label: '출생시각 미상 및 부분 응답 B' },
]);

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/gu,
  (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);

function list(values) {
  return '<ul>' + values.map((value) => '<li>' + escapeHtml(value) + '</li>').join('') + '</ul>';
}

function displayBlock(block) {
  if (block.type === 'paragraph') return '<p>' + escapeHtml(block.text) + '</p>';
  if (block.type === 'key_points') return list(block.items);
  if (block.type === 'comparison') {
    return '<h4>' + escapeHtml(block.title) + '</h4>' +
      block.perspectives.map((p) => '<p><strong>' + escapeHtml(p.label) +
      '</strong> ' + escapeHtml(p.text) + '</p>').join('');
  }
  if (block.type === 'ambiguity') {
    return '<p>' + escapeHtml(block.summary) + '</p>' +
      block.scenarios.map((s) => '<p><strong>' + escapeHtml(s.label) +
      '</strong> ' + escapeHtml(s.text) + '</p>').join('');
  }
  if (block.type === 'timeline') {
    return list(block.entries.map((item) => item.label + ': ' + item.text));
  }
  if (block.type === 'fact_table') {
    return list(block.rows.map((row) => row.label + ': ' + row.value));
  }
  if (block.type === 'source_hint') return '<p class="source-hint">' + escapeHtml(block.text) + '</p>';
  throw new TypeError('Unknown consumer reading block: ' + String(block.type));
}

function visibleChart(reading) {
  if (reading === undefined) return '<p class="notice">명식 미표시 — 부분/차단 응답을 직접 검수하십시오.</p>';
  const pillars = reading.calculationSummary?.pillars;
  if (!pillars) return '<p class="notice">명식 요약 없음</p>';
  const rows = ['year','month','day','hour'].map((slot) => {
    const entry = pillars[slot];
    return slot + ': ' + (entry?.status ?? 'missing') + ': ' + (entry?.value ?? '미상');
  });
  return list(rows);
}

function caseHtml(item, index) {
  const reading = item.response.reading;
  const consumerSections = reading?.sections ?? [];
  const sections = consumerSections.map((section) => '<section><h3>' +
    escapeHtml(section.title) + ' <small>(' + escapeHtml(section.state) + ')</small></h3>' +
    section.blocks.map(displayBlock).join('') + '</section>').join('');
  const disclosures = reading?.disclosures ?? [];
  return '<article class="review-case" data-case="' + escapeHtml(item.caseId) + '">' +
    '<h2>' + (index + 1) + '/10 — ' + escapeHtml(item.label) + '</h2>' +
    '<p><strong>검사 입력:</strong> ' + escapeHtml(item.caseId) +
    ' · <strong>응답 상태:</strong> ' + escapeHtml(item.response.state) + '</p>' +
    '<h3>실제 응답의 계산 표시</h3>' + visibleChart(reading) +
    '<h3>실제 사용자 본문</h3>' +
    (sections || '<p class="notice">표시된 해석 본문 없음 — 사실을 보충하거나 추론하지 마십시오.</p>') +
    '<h3>실제 응답의 한계·안내</h3>' +
    (disclosures.length ? list(disclosures.map((d) => d.type + ': ' + d.text))
      : '<p class="notice">별도 disclosure 없음</p>') +
    '<div class="review"><strong>사람 검수 기록 — 미완료</strong>' +
    '<p>계산 사실 충실성 / 실제 해석 근거 / 개인화 적절성 / 반복·모순 / 가독성·과잉 단정을 각각 검토하십시오.</p>' +
    '<p>검수자: __________________　날짜: __________________</p>' +
    '<p>판정(적절 / 수정 필요 / 보류): __________________</p>' +
    '<p>근거·결함·필요한 후속 작업: __________________________________________________</p>' +
    '</div></article>';
}

/** All content originates from the current actual Preview HTTP response. */
export function renderNatalReaderReviewPacketV1(inputs) {
  if (!Array.isArray(inputs) || inputs.length < 30) {
    throw new TypeError('N11 requires the complete real HTTP audit corpus of at least 30 inputs.');
  }
  const byId = new Map();
  for (const item of inputs) {
    if (byId.has(item.caseId)) throw new TypeError('N11 duplicate audit case ID: ' + item.caseId);
    byId.set(item.caseId, item);
  }
  const selected = NATAL_READER_REVIEW_CASES.map(({caseId, label}) => {
    const item = byId.get(caseId);
    if (item === undefined || !item.response || typeof item.response.state !== 'string') {
      throw new TypeError('N11 missing actual consumer response for ' + caseId);
    }
    return { ...item, label };
  });
  if (selected.length !== 10 ||
      selected.filter((item) => item.response.state === 'partial_evidence').length !== 2 ||
      selected.filter((item) => item.response.state === 'delivered').length !== 8) {
    throw new TypeError('N11 representative consumer response states changed; require review.');
  }
  return '<!doctype html><html lang="ko"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>명하 사주풀이 대표 10건 사람 검수 자료</title>' +
    '<style>body{font:16px/1.7 system-ui,sans-serif;max-width:940px;margin:30px auto;padding:0 22px;color:#252525;background:#f6f6f4}' +
    '.review-case{background:white;border:1px solid #ddd;border-radius:8px;padding:24px;margin:25px 0;break-inside:avoid}' +
    '.review{border-top:1px dashed #888;padding-top:15px;margin-top:22px}.notice,.source-hint,small{color:#555}' +
    'h1,h2,h3{line-height:1.35}p,li{overflow-wrap:anywhere}@media print{body{background:white}.review-case{break-after:page;border:0}}</style></head><body>' +
    '<h1>명하 일반 원국 사주풀이 — 대표 10건 사람 검수 자료</h1>' +
    '<p>' + NATAL_READER_REVIEW_PACKET_VERSION + ' · 내부 품질검사 전용 · 판매·공개 불가</p>' +
    '<p><strong>사람 검수 미완료.</strong> 이 문서는 실제 35건 HTTP 결과 중 선정된 10건을 복사했으며, ' +
    '전통 해석의 타당성·개인화 완료·Production/판매 승인을 판정하지 않습니다. ' +
    '동일한 의미가 정당할 수도 있으므로 반드시 출처와 맥락을 사람에게 검증받아야 합니다.</p>' +
    selected.map(caseHtml).join('') + '</body></html>\n';
}
