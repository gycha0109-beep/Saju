import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import { findSharedNatalFactLinks } from './natal-five-domain-shared-evidence.js';
import type { GeneralNatalMultifactorReport, GeneralNatalMultifactorSection } from './general-natal-multifactor-report.js';
import type { CareerMultifactorReport, CareerMultifactorReportSection } from './career-natal-multifactor-report.js';
import type { WealthNatalMultifactorReport, WealthNatalMultifactorSection } from './wealth-natal-multifactor-report.js';
import type { BusinessNatalMultifactorReport, BusinessNatalMultifactorSection } from './business-natal-multifactor-report.js';
import type { RelationshipNatalMultifactorReport, RelationshipNatalMultifactorSection } from './relationship-natal-multifactor-report.js';

export const NATAL_FIVE_DOMAIN_MULTIFACTOR_READER_VERSION =
  'saju-natal-five-domain-source-bound-reader-v1' as const;

export interface NatalFiveDomainMultifactorReports {
  general: GeneralNatalMultifactorReport;
  career: CareerMultifactorReport;
  wealth: WealthNatalMultifactorReport;
  business: BusinessNatalMultifactorReport;
  relationship: RelationshipNatalMultifactorReport;
}

type ResearchSection =
  | GeneralNatalMultifactorSection
  | CareerMultifactorReportSection
  | WealthNatalMultifactorSection
  | BusinessNatalMultifactorSection
  | RelationshipNatalMultifactorSection;
type ResearchState = 'complete' | 'partial' | 'insufficient';
type ResearchReport = NatalFiveDomainMultifactorReports[keyof NatalFiveDomainMultifactorReports];
const DOMAIN_ORDER = [
  { key: 'general', label: '총운' },
  { key: 'career', label: '직업운' },
  { key: 'wealth', label: '재물운' },
  { key: 'business', label: '사업운' },
  { key: 'relationship', label: '관계운' },
] as const satisfies readonly { key: keyof NatalFiveDomainMultifactorReports; label: string }[];
const STATE_LABELS: Readonly<Record<ResearchState, string>> = {
  complete: '연구용 최소 근거 충족 · 제품 완성 아님',
  partial: '부분 풀이 · 추가 근거 필요',
  insufficient: '풀이 보류 · 근거 부족',
};
const FACT_PATH = /^derivedFacts\.tenGods\.value\.(year|month|day|hour)\.(stem|branch)\.value$/u;

function guard(value: unknown, reason: string): asserts value {
  if (!value) throw new TypeError('Five-domain multifactor research reader: ' + reason);
}
function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/gu, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]!);
}
function renderList(items: readonly string[]): string {
  return '<ul>' + items.map(value => '<li>' + escapeHtml(value) + '</li>').join('') + '</ul>';
}

/**
 * Distinguish observed natal calculation facts from permitted T8 conclusions.
 * The unknown-clock engine keeps year/month/day facts where invariant but
 * does not resolve hour or the aggregate Ten-God chart. No inferred pillar,
 * fortune outcome, or cross-domain Claim is manufactured here.
 */
function renderCanonicalPillarLedger(snapshot: CanonicalSajuSnapshot): string {
  const slots = [
    { slot: 'year', label: '연주' },
    { slot: 'month', label: '월주' },
    { slot: 'day', label: '일주' },
    { slot: 'hour', label: '시주' },
  ] as const;
  const rows = slots.map(({ slot, label }) => {
    const fact = snapshot.pillars[slot];
    const observed = fact.status === 'resolved'
      ? fact.value.stem.value + fact.value.branch.value
      : fact.status === 'ambiguous'
        ? '계산 후보가 둘 이상이어서 미확정'
        : slot === 'hour' && !snapshot.completeness.birthTimeKnown
          ? '출생시각 미입력으로 미확정'
          : '계산값 미확정';
    return '<li><strong>' + label + '</strong> ' + escapeHtml(observed) +
      '<small>계산 경로: pillars.' + slot + ' · 상태: ' +
      fact.status + '</small></li>';
  }).join('');
  const uncertainty = snapshot.completeness.birthTimeKnown
    ? '네 기둥의 표시 사실은 아래 각 분야의 해석 결과와 별개입니다. 간지의 존재만으로 결과를 단정하지 않습니다.'
    : '출생시각이 입력되지 않았습니다. 확정된 연·월·일 계산값은 보여주되, ' +
      '시주를 추정하거나 미확정 십신·다중 근거 T8 해석을 확정하지 않습니다. ' +
      '일부 기둥도 경계 정책에 따라 미확정일 수 있습니다.';
  return '<section class="canonical-facts" aria-label="실제 명식의 계산 사실과 불확실성">' +
    '<h2>이번 풀이의 실제 명식 근거</h2>' +
    '<p>아래는 하나의 Canonical 명식에서 확인된 계산 사실입니다. ' +
    '분야별 성격·직업·재물·사업·관계 결론이 아닙니다.</p>' +
    '<ul class="canonical-pillars">' + rows + '</ul>' +
    '<p class="canonical-disclosure">' + escapeHtml(uncertainty) + '</p></section>';
}
function renderSection(section: ResearchSection): string {
  const positions = 'calculatedPositions' in section
    ? section.calculatedPositions : section.observedPositions;
  const paths = 'calculatedFactPaths' in section
    ? section.calculatedFactPaths : section.observedFactPaths;
  guard(section.headline.trim().length > 0 && section.paragraph.trim().length > 0 &&
    section.ruleId.trim().length > 0 && section.sourceIds.length > 0 &&
    section.upstreamClaimIds.length >= 2 && positions.length >= 2 &&
    paths.length === positions.length && paths.every(path => FACT_PATH.test(path)) &&
    positions.every(position => section.paragraph.includes(position)),
    'section has no exact calculated positions, upstream claims, or sources');
  return '<section class="meaning"><h3>' + escapeHtml(section.headline) + '</h3>' +
    '<p>' + escapeHtml(section.paragraph) + '</p>' +
    '<details><summary>명식 근거와 출처 확인</summary><p>확인 위치</p>' +
    renderList(positions) + '<p>계산 근거 경로</p>' + renderList(paths) +
    '<p>상위 십신 근거</p>' + renderList(section.upstreamClaimIds) +
    '<p>전통 출처</p>' + renderList(section.sourceIds) +
    '<p>적용 규칙: ' + escapeHtml(section.ruleId) + '</p></details></section>';
}
/**
 * A reader-first table of contents. These are the SAME T8-authored titles used
 * in the body, not inferred cross-domain conclusions. When the domain is held,
 * show the actual missing-evidence reason instead of a generic fortune.
 */
function renderOverview(reports: NatalFiveDomainMultifactorReports): string {
  const items = DOMAIN_ORDER.map(({ key, label }) => {
    const report = reports[key];
    const firstSourceHeadline = report.sections[0]?.headline;
    const missingReason = report.missing[0];
    const visibleSubject = firstSourceHeadline ??
      missingReason ?? '현재 확인된 해석 문단이 없습니다.';
    const gap = report.state === 'partial' && missingReason !== undefined
      ? '<p class="overview-gap"><strong>아직 설명하지 못하는 부분:</strong> ' +
        escapeHtml(missingReason) + '</p>'
      : '';
    return '<li><a href="#domain-' + key + '">' + escapeHtml(label) + '</a>' +
      '<p><strong>' + escapeHtml(STATE_LABELS[report.state]) + '</strong></p>' +
      '<p>' + (report.state === 'partial' && firstSourceHeadline !== undefined
        ? '확인된 부분 해석: ' : '') + escapeHtml(visibleSubject) + '</p>' +
      gap + '</li>';
  }).join('');
  return '<nav class="overview" aria-label="다섯 분야의 근거 기반 요약">' +
    '<h2>이 명식에서 먼저 확인할 다섯 관점</h2>' +
    '<p>각 분야에 실제 확인된 첫 해석 제목 또는 아직 부족한 근거를 먼저 표시합니다.</p>' +
    '<ol class="overview">' + items + '</ol></nav>';
}

function renderDomain(domain: string, label: string, report: ResearchReport, birthTimeKnown: boolean): string {
  guard(report.researchOnly === true && report.usefulComplete === false &&
    report.mayPublish === false && report.maySell === false &&
    report.title.trim().length > 0 && report.introduction.trim().length > 0 &&
    ['complete', 'partial', 'insufficient'].includes(report.state) &&
    (report.state !== 'complete' || report.sections.length >= 3) &&
    (report.state !== 'insufficient' || report.sections.length === 0) &&
    (report.state !== 'partial' || report.missing.length > 0) &&
    // Same-chart evidence is not interchangeable across domain claims.
    report.sections.every(section =>
      section.claimType.startsWith(domain.toUpperCase() + '_NATAL_MULTIFACTOR_') &&
      section.ruleId === 'RULE-' + section.claimType) &&
    (birthTimeKnown || report.state === 'insufficient' && report.sections.length === 0),
    'a domain is not a bounded source-qualified research reading');
  const originalText = report.sections.map(renderSection).join('') ||
    '<p>현재 이 명식에서 근거가 확인된 해석 문단은 없습니다.</p>';
  const missing = report.missing.length > 0
    ? '<section class="missing"><h3>아직 설명하지 못하는 부분</h3>' + renderList(report.missing) + '</section>'
    : '';
  return '<article aria-labelledby="domain-' + domain + '" class="domain">' +
    '<h2 id="domain-' + domain + '">' + escapeHtml(label) + '</h2>' +
    '<p><strong>' + escapeHtml(STATE_LABELS[report.state]) + '</strong></p>' +
    '<p>' + escapeHtml(report.introduction) + '</p>' + originalText + missing +
    '<section class="limitations"><h3>해석 범위와 한계</h3>' +
    renderList(report.limitations) + '</section></article>';
}

/**
 * Show how an exactly identical calculated fact is used by two independently
 * source-owned domain interpretations. This is an explanatory link, NOT a new T8.
 */
function renderSharedEvidence(reports: NatalFiveDomainMultifactorReports, birthTimeKnown: boolean): string {
  if (!birthTimeKnown) return '';
  const domains = DOMAIN_ORDER.map(({ key, label }) => ({
    domain: key,
    label,
    sections: reports[key].sections.map(section => ({
      headline: section.headline,
      positions: 'calculatedPositions' in section
        ? section.calculatedPositions : section.observedPositions,
      factPaths: 'calculatedFactPaths' in section
        ? section.calculatedFactPaths : section.observedFactPaths,
      sourceIds: section.sourceIds,
    })),
  }));
  const shared = findSharedNatalFactLinks(domains);
  if (!shared.length) return '';
  const links = shared.map(link =>
    '<li><p>공통 계산 근거: <strong>' + escapeHtml(link.position) + '</strong>.</p>' +
    '<p><a href="#domain-' + escapeHtml(link.left.domain) + '">' +
      escapeHtml(link.left.label) + '</a>에서는 ‘' + escapeHtml(link.left.headline) +
      '’, <a href="#domain-' + escapeHtml(link.right.domain) + '">' +
      escapeHtml(link.right.label) + '</a>에서는 ‘' + escapeHtml(link.right.headline) +
      '’라는 기존 해석에 각각 사용됩니다.</p></li>',
  ).join('');
  return '<section class="shared-evidence" aria-label="같은 명식 근거의 분야별 해석">' +
    '<h2>같은 명식 근거, 서로 다른 분야의 관점</h2>' +
    '<p>아래는 실제 명식의 동일 계산 근거가 여러 분야의 출처 있는 풀이에서 ' +
    '어떻게 다시 쓰이는지 보여줍니다. 새로운 해석 결론이 아니며, ' +
    '한 분야의 실제 결과가 다른 분야의 결과를 뜻하지 않습니다.</p>' +
    '<ol>' + links + '</ol></section>';
}

/**
 * One canonical birth chart, five existing T5-to-T8 research reports, one
 * readable Korean page. This is presentation of ORIGINAL source-owned text,
 * never another Product Mapper, interpretation engine, T8 meaning, or Official
 * publication decision. Each domain keeps its own MUR assessment.
 */
export function renderNatalFiveDomainMultifactorResearchHtml(
  snapshot: CanonicalSajuSnapshot,
  reports: NatalFiveDomainMultifactorReports,
): string {
  guard(Object.keys(reports).length === DOMAIN_ORDER.length &&
    DOMAIN_ORDER.every(({ key }) =>
      reports[key]?.snapshotId === snapshot.snapshotId &&
      reports[key]?.calculationHash === snapshot.calculationHash),
    'missing domain or mismatched canonical chart/hash');
  const domains = DOMAIN_ORDER.map(({ key, label }) =>
    renderDomain(key, label, reports[key], snapshot.completeness.birthTimeKnown)).join('\n');
  return '<!doctype html><html lang="ko"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<title>명하 원국 5분야 풀이 · 연구용 미리보기</title>' +
    '<style>body{max-width:820px;margin:2.5em auto;padding:0 1.5em;' +
    'font:17px/1.75 system-ui,sans-serif;color:#222}article{border-top:2px solid #bbb;' +
    'padding:1.25em 0;margin-top:1.5em}section.meaning{border-bottom:1px solid #ddd;' +
    'padding:.75em 0}section.missing{margin-top:1.5em}details,small{color:#555}' +
    'h2{font-size:1.35em}h3{font-size:1.1em}li{margin:.2em 0}' +
    'nav.overview{border:1px solid #ccc}ol.overview{padding-left:1.5em}' +
    'ol.overview li{border-bottom:1px solid #ddd;padding:.4em 0}' +
    'section.canonical-facts{margin:1.2em 0;padding:1em 1.25em;border:1px solid #bbb}' +
    'ul.canonical-pillars{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(155px,1fr));gap:.5em}' +
    'ul.canonical-pillars li{padding:.5em;background:#f5f5f5}' +
    'ul.canonical-pillars small{display:block;font-size:.72em}' +
    '.canonical-disclosure{font-size:.89em}' +
    'ol.overview li:last-child{border-bottom:none}' +
    'ol.overview p{margin:.2em 0}</style></head>' +
    '<body><header><h1>나의 원국을 다섯 관점에서 읽기</h1>' +
    '<p>하나의 실제 명식에서 계산되고, 기존 근거와 연결된 연구용 해석만 분야별로 모았습니다. ' +
    '부분 풀이와 풀이 보류는 종합풀이로 취급하지 않습니다.</p>' +
    '<p><strong>내부 연구용 미리보기 · 검토되지 않은 해석 · 출판 및 판매 불가</strong></p>' +
    '</header>' + renderCanonicalPillarLedger(snapshot) + renderOverview(reports) +
    renderSharedEvidence(reports, snapshot.completeness.birthTimeKnown) +
    '<main>' + domains + '</main><footer><p>분야별 문단은 출처가 있는 기존 해석을 ' +
    '그대로 표시한 것이며, 직업·금전·사업·관계의 실제 결과를 판단하지 않습니다.</p>' +
    '<small>보고서 버전: ' + escapeHtml(NATAL_FIVE_DOMAIN_MULTIFACTOR_READER_VERSION) +
    '</small></footer></body></html>';
}
