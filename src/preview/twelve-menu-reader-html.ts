import type { ProductReadingResponseBlock } from '../reading/product-reading-response.js';
import {
  buildTwelveMenuReaderCards,
  type TwelveMenuReaderCard,
  type TwelveMenuReaderSection,
} from '../reading/twelve-menu-reader-cards.js';
import type { MenuReadingExecution } from '../reading/twelve-menu-engine-readiness.js';

export const TWELVE_MENU_READER_HTML_VERSION =
  'myeongha-twelve-menu-reader-html-preview-v1' as const;

const CARD_ORDER = [
  'general', 'career', 'wealth', 'relationship', 'business',
  'family', 'life_stage', 'annual', 'monthly', 'spouse', 'compatibility', 'question',
] as const;

const STATUS = {
  available: '해석 근거 확인 · 정식 서비스 공개 여부는 별개',
  partial: '부분 풀이 · 추가 근거 또는 입력 필요',
  unavailable: '근거 부족 또는 입력 필요',
} as const;

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/gu, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]!);
}

function items(strings: readonly string[]): string {
  return '<ul>' + strings.map(text =>
    '<li>' + escapeHtml(text) + '</li>').join('') + '</ul>';
}

function meaningful(block: ProductReadingResponseBlock): boolean {
  switch (block.type) {
    case 'paragraph': return block.text.trim().length > 0;
    case 'key_points': return block.items.some(x => x.trim().length > 0);
    case 'comparison': return block.perspectives.some(x => x.text.trim().length > 0);
    case 'ambiguity': return block.summary.trim().length > 0 ||
      block.scenarios.some(x => x.text.trim().length > 0);
    case 'timeline': return block.entries.some(x => x.text.trim().length > 0);
    case 'fact_table':
    case 'source_hint': return false;
  }
}

function renderBlock(block: ProductReadingResponseBlock): string {
  const e = escapeHtml;
  switch (block.type) {
    case 'paragraph':
      return '<p>' + e(block.text) + '</p>';
    case 'key_points':
      return items(block.items);
    case 'comparison':
      return '<h4>' + e(block.title) + '</h4><dl>' +
        block.perspectives.map(p => '<dt>' + e(p.label) + '</dt><dd>' +
          e(p.text) + '</dd>').join('') + '</dl>';
    case 'ambiguity':
      return '<p>' + e(block.summary) + '</p><dl>' +
        block.scenarios.map(p => '<dt>' + e(p.label) + '</dt><dd>' +
          e(p.text) + '</dd>').join('') + '</dl>';
    case 'timeline':
      return '<ol>' + block.entries.map(entry =>
        '<li><strong>' + e(entry.label) + '</strong> ' +
        e(entry.text) + '</li>').join('') + '</ol>';
    case 'fact_table':
      return '<table><tbody>' + block.rows.map(row =>
        '<tr><th scope="row">' + e(row.label) + '</th><td>' +
        e(row.value) + '</td></tr>').join('') + '</tbody></table>';
    case 'source_hint':
      return '<aside class="source-context">' + e(block.text) + '</aside>';
  }
}

function sectionHasMeaning(section: TwelveMenuReaderSection): boolean {
  return section.reading?.sections.some(item =>
    item.state !== 'unavailable' &&
    item.blocks.some(meaningful)) === true;
}

function assertBoundedCards(cards: readonly TwelveMenuReaderCard[]): void {
  if (cards.length !== CARD_ORDER.length) {
    throw new TypeError('Twelve-menu HTML requires all 12 exact governed card identities.');
  }
  cards.forEach((card, index) => {
    if (card.menuId !== CARD_ORDER[index] ||
        card.version !== 'myeongha-twelve-menu-reader-cards-preview-v1' ||
        card.constraints.previewOnly !== true ||
        card.constraints.mayPublish !== false ||
        card.constraints.maySell !== false ||
        card.constraints.mayGrantPublicAvailability !== false ||
        card.constraints.mayTreatReadinessAsMeaningQualityCompletion !== false ||
        card.sections.length !== (card.menuId === 'family' ? 2 : 1)) {
      throw new TypeError('Twelve-menu HTML rejects public, incomplete or reordered card projections.');
    }
    const canRead = card.sections.some(section =>
      section.state !== 'unavailable' && sectionHasMeaning(section));
    const computedState = card.sections.every(section =>
      section.state === 'available' && sectionHasMeaning(section))
      ? 'available' : canRead ? 'partial' : 'unavailable';
    if (card.state !== computedState) {
      throw new TypeError('Twelve-menu HTML rejects a menu without matching rendered interpretation.');
    }
    if (card.sections.some(section =>
      !section.readingSection.trim() ||
      !section.title.trim() ||
      (section.state === 'unavailable' && section.reading !== undefined) ||
      (section.state === 'available' && !sectionHasMeaning(section)) ||
      (section.reading?.sections.some(reading =>
        reading.state === 'unavailable' &&
        reading.blocks.some(meaningful)) === true))) {
      throw new TypeError('Twelve-menu HTML refuses unsupported or hidden interpreted paragraphs.');
    }
  });
}

function renderSection(section: TwelveMenuReaderSection): string {
  const e = escapeHtml;
  const details = section.reading;
  const contents = details?.sections
    .filter(item => item.state !== 'unavailable')
    .map(item => '<div class="reading-unit"><h4>' + e(item.title) + '</h4>' +
      item.blocks.map(renderBlock).join('') + '</div>').join('') ?? '';
  const disclosures = details === undefined ? '' :
    '<details><summary>이 풀이의 적용 범위·제한</summary>' +
    items(details.disclosures.map(item => item.text)) + '</details>';
  return '<div class="reading-section"><h3>' + e(section.title) + '</h3>' +
    '<p class="status status-' + section.state + '">' + e(STATUS[section.state]) +
    '</p><p>' + e(section.message) + '</p>' +
    contents + disclosures + '</div>';
}

/**
 * User-readable internal web page for the exact governed twelve-card content.
 * Does not execute interpretations, invent missing claims or grant public
 * availability. Its input is the existing twelve-menu ProductReading service
 * projection; source-hint and fact-table blocks alone are never interpretations.
 */
export function renderTwelveMenuReaderHtml(
  cards: readonly TwelveMenuReaderCard[],
): string {
  assertBoundedCards(cards);
  const e = escapeHtml;
  const toc = cards.map(card => '<li><a href="#menu-' + card.menuId + '">' +
    e(card.title) + '</a> · ' + e(STATUS[card.state]) + '</li>').join('');
  const sections = cards.map(card =>
    '<article class="menu" id="menu-' + card.menuId + '">' +
    '<h2>' + e(card.title) + '</h2>' +
    '<p class="status status-' + card.state + '">' + e(STATUS[card.state]) + '</p>' +
    card.sections.map(renderSection).join('') + '</article>').join('');
  return '<!doctype html><html lang="ko"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>명하 · 12개 메뉴 읽기 · 내부 미리보기</title>' +
    '<style>body{font:16px/1.75 system-ui,"Malgun Gothic",sans-serif;margin:0;background:#f7f3ec;color:#252724}' +
    'main{max-width:820px;margin:auto;padding:26px 20px 70px}' +
    '.menu{background:white;padding:20px;border-radius:16px;margin:22px 0;border:1px solid #e4dcd3}' +
    '.reading-section{border-top:1px solid #ddd;padding-top:15px;margin-top:18px}' +
    '.reading-unit{padding:12px 0}h2{font-size:1.3em}.status{font-size:.87em;font-weight:650}' +
    '.status-unavailable{color:#814e21}.status-partial{color:#36596b}' +
    'ul,ol{padding-left:23px}dl{margin-left:12px}dt{font-weight:650}' +
    'dd{margin:0 0 8px 12px}table{border-collapse:collapse}th,td{padding:6px;border:1px solid #ddd}' +
    'details,.source-context{font-size:.82em;overflow-wrap:anywhere}' +
    '.note{padding:15px;background:#eae4da;border-radius:12px}</style></head>' +
    '<body><main><header><h1>나를 읽기 · 12개 주제</h1>' +
    '<p class="note">메뉴가 보이거나 응답이 전달된 사실만으로 개인별 종합풀이가 완성된 것은 아닙니다. ' +
    '입력 부족, 해석 근거 부족, 부분 지원을 그대로 표시합니다. 공식 공개·저장·판매 권한은 별도입니다.</p>' +
    '</header><nav aria-label="12개 읽기 메뉴"><ol>' + toc + '</ol></nav>' +
    sections + '<footer class="note">내부 연구용 읽기 화면 · Official·Production·판매 승인 아님</footer>' +
    '</main></body></html>';
}

/** Direct bridge from actual governed execution data to readable HTML. */
export function renderExecutedTwelveMenuReaderHtml(
  executions: readonly MenuReadingExecution[],
): string {
  return renderTwelveMenuReaderHtml(buildTwelveMenuReaderCards(executions));
}
