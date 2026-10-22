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

function renderCareerReadingGuide(report: CareerMultifactorReport): string {
  const guide = report.readingGuide;
  if (guide === undefined) return '';
  const core = report.sections[0];
  guard(core !== undefined && core.claimType === guide.coreClaimType &&
    core.channel === 'visible_stems' && core.axis !== 'tension' &&
    guide.paragraph.includes(core.headline) &&
    core.calculatedPositions.every(position => guide.paragraph.includes(position)) &&
    guide.supporting.length === report.sections.length - 1,
    'Career reading guide must be derived from the actually selected core Claim');
  const used = new Set(core.calculatedFactPaths);
  guide.supporting.forEach((support, index) => {
    const source = report.sections[index + 1];
    guard(source !== undefined && support.claimType === source.claimType &&
      support.distinctCalculatedFactPaths.length === support.distinctCalculatedPositions.length &&
      support.distinctCalculatedFactPaths.length > 0 &&
      guide.paragraph.includes(source.headline),
      'Career supporting guide is not bound to the displayed Claim');
    const newlyObserved: string[] = [];
    source.calculatedFactPaths.forEach((path, i) => {
      if (used.has(path)) return;
      const position = source.calculatedPositions[i];
      guard(position !== undefined, 'Career observed fact path has no display position');
      newlyObserved.push(path);
      used.add(path);
    });
    guard(JSON.stringify(newlyObserved) ===
      JSON.stringify(support.distinctCalculatedFactPaths) &&
      support.distinctCalculatedPositions.every(position => guide.paragraph.includes(position)),
      'Career supporting guide is not bound to independent observed evidence');
  });
  return '<section class="reading-guide" aria-label="직업운 읽기 요약"><h3>' +
    escapeHtml(guide.title) + '</h3><p>' + escapeHtml(guide.paragraph) +
    '</p></section>';
}

function renderWealthReadingGuide(report: WealthNatalMultifactorReport): string {
  const guide = report.readingGuide;
  if (guide === undefined) return '';
  const core = report.sections[0];
  guard(core !== undefined && core.claimType === guide.coreClaimType &&
    core.axis !== 'tension' && core.sourceIds.length > 0 &&
    guide.paragraph.includes(core.headline) &&
    core.observedPositions.every(position => guide.paragraph.includes(position)) &&
    guide.supporting.length === report.sections.length - 1,
    'Wealth reading guide must follow the selected source-bound core');

  const usedPaths = new Set(core.observedFactPaths);
  guide.supporting.forEach((support, index) => {
    const section = report.sections[index + 1];
    guard(section !== undefined && section.claimType === support.claimType &&
      section.sourceIds.length > 0 &&
      support.distinctObservedFactPaths.length > 0 &&
      support.distinctObservedFactPaths.length === support.distinctObservedPositions.length &&
      guide.paragraph.includes(section.headline),
      'Wealth reading guide references a missing or unqualified support');
    const newlyObserved = section.observedFactPaths.flatMap((path, positionIndex) => {
      if (usedPaths.has(path)) return [];
      const position = section.observedPositions[positionIndex];
      guard(position !== undefined, 'Wealth evidence is missing its position');
      usedPaths.add(path);
      return [{ path, position }];
    });
    guard(JSON.stringify(newlyObserved.map(item => item.path)) ===
      JSON.stringify(support.distinctObservedFactPaths) &&
      JSON.stringify(newlyObserved.map(item => item.position)) ===
      JSON.stringify(support.distinctObservedPositions) &&
      support.distinctObservedPositions.every(position => guide.paragraph.includes(position)),
      'Wealth guide reuses or invents its supporting facts');
  });

  guard(report.state === 'complete' && guide.supporting.length === 2 ||
    report.state === 'partial' && guide.supporting.length < 2,
    'Wealth guide cannot misrepresent minimum useful reading status');
  return '<section class="reading-guide" aria-label="재물운 읽기 요약"><h3>' +
    escapeHtml(guide.title) + '</h3><p>' + escapeHtml(guide.paragraph) +
    '</p></section>';
}

function renderBusinessReadingGuide(report: BusinessNatalMultifactorReport): string {
  const guide = report.readingGuide;
  if (guide === undefined) return '';
  const core = report.sections[0];
  guard(core !== undefined && core.claimType === guide.coreClaimType &&
    core.axis !== 'coordination' && core.sourceIds.length > 0 &&
    guide.paragraph.includes(core.headline) &&
    core.observedPositions.every(position => guide.paragraph.includes(position)) &&
    guide.supporting.length === report.sections.length - 1,
    'Business guide must describe the selected source-owned core');

  const usedPaths = new Set(core.observedFactPaths);
  guide.supporting.forEach((support, index) => {
    const section = report.sections[index + 1];
    guard(section !== undefined && section.claimType === support.claimType &&
      section.sourceIds.length > 0 &&
      support.distinctObservedFactPaths.length > 0 &&
      support.distinctObservedFactPaths.length === support.distinctObservedPositions.length &&
      guide.paragraph.includes(section.headline),
      'Business support does not match a qualified selected T8');
    const newFacts = section.observedFactPaths.flatMap((path, factIndex) => {
      if (usedPaths.has(path)) return [];
      const position = section.observedPositions[factIndex];
      guard(position !== undefined, 'Business chart path has no position');
      usedPaths.add(path);
      return [{ path, position }];
    });
    guard(JSON.stringify(newFacts.map(fact => fact.path)) ===
      JSON.stringify(support.distinctObservedFactPaths) &&
      JSON.stringify(newFacts.map(fact => fact.position)) ===
      JSON.stringify(support.distinctObservedPositions) &&
      support.distinctObservedPositions.every(position => guide.paragraph.includes(position)),
      'Business support reuses or changes its actual observations');
  });
  guard(report.state === 'complete' && guide.supporting.length === 2 ||
    report.state === 'partial' && guide.supporting.length < 2,
    'Business guide cannot override the actual MUR state');

  return '<section class="reading-guide" aria-label="사업운 읽기 요약"><h3>' +
    escapeHtml(guide.title) + '</h3><p>' + escapeHtml(guide.paragraph) +
    '</p></section>';
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
  const readingGuide = domain === 'career'
    ? renderCareerReadingGuide(report as CareerMultifactorReport)
    : domain === 'wealth'
      ? renderWealthReadingGuide(report as WealthNatalMultifactorReport)
      : domain === 'business'
        ? renderBusinessReadingGuide(report as BusinessNatalMultifactorReport) : '';
  return '<article aria-labelledby="domain-' + domain + '" class="domain">' +
    '<h2 id="domain-' + domain + '">' + escapeHtml(label) + '</h2>' +
    '<p><strong>' + escapeHtml(STATE_LABELS[report.state]) + '</strong></p>' +
    '<p>' + escapeHtml(report.introduction) + '</p>' + readingGuide + originalText + missing +
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
    'ol.overview li:last-child{border-bottom:none}' +
    'ol.overview p{margin:.2em 0}</style></head>' +
    '<body><header><h1>나의 원국을 다섯 관점에서 읽기</h1>' +
    '<p>하나의 실제 명식에서 계산되고, 기존 근거와 연결된 연구용 해석만 분야별로 모았습니다. ' +
    '부분 풀이와 풀이 보류는 종합풀이로 취급하지 않습니다.</p>' +
    '<p><strong>내부 연구용 미리보기 · 검토되지 않은 해석 · 출판 및 판매 불가</strong></p>' +
    '</header>' + renderOverview(reports) +
    renderSharedEvidence(reports, snapshot.completeness.birthTimeKnown) +
    '<main>' + domains + '</main><footer><p>분야별 문단은 출처가 있는 기존 해석을 ' +
    '그대로 표시한 것이며, 직업·금전·사업·관계의 실제 결과를 판단하지 않습니다.</p>' +
    '<small>보고서 버전: ' + escapeHtml(NATAL_FIVE_DOMAIN_MULTIFACTOR_READER_VERSION) +
    '</small></footer></body></html>';
}
