import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import { findSharedNatalFactLinks } from './natal-five-domain-shared-evidence.js';
import { SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCE_AUTHORITY } from '../research/snapshot-bound-hidden-stem-ten-god-occurrences.js';
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
    const wealth = key === 'wealth' ? reports.wealth : undefined;
    // A real T5 partial meaning must not disappear behind a generic
    // "insufficient" label; conversely a context-only T8 must not be
    // promoted to a direct Wealth conclusion in the first-screen summary.
    const noDirectWealthCore = wealth !== undefined &&
      !wealth.sections.some(section =>
        ['core', 'creation', 'management', 'planning'].includes(section.axis));
    const firstT5 = noDirectWealthCore
      ? wealth.availableThemeContext?.themes[0] : undefined;
    const visibleSubject = noDirectWealthCore && firstSourceHeadline
      ? '재물 종합 결론 보류 · 기존 ' +
        (wealth!.sections[0]?.axis === 'tension' ? '긴장 관계' : '간접 구조') +
        ' 부분풀이: ' + firstSourceHeadline
      : noDirectWealthCore && firstT5
        ? '재물 종합 결론 보류 · 출처 있는 십신 부분풀이: ' +
          firstT5.headline + ' — ' + firstT5.summary
        : firstSourceHeadline ?? missingReason ?? '현재 확인된 해석 문단이 없습니다.';
    const gap = report.state === 'partial' && missingReason !== undefined
      ? '<p class="overview-gap"><strong>아직 설명하지 못하는 부분:</strong> ' +
        escapeHtml(missingReason) + '</p>'
      : '';
    return '<li><a href="#domain-' + key + '">' + escapeHtml(label) + '</a>' +
      '<p><strong>' + escapeHtml(STATE_LABELS[report.state]) + '</strong></p>' +
      '<p>' + (report.state === 'partial' && firstSourceHeadline !== undefined &&
        !noDirectWealthCore ? '확인된 부분 해석: ' : '') +
      escapeHtml(visibleSubject) + '</p>' +
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

function renderRelationshipReadingGuide(report: RelationshipNatalMultifactorReport): string {
  const guide = report.readingGuide;
  if (guide === undefined) return '';
  const core = report.sections[0];
  guard(core !== undefined && core.claimType === guide.coreClaimType &&
    core.axis !== 'coordination' && core.sourceIds.length > 0 &&
    guide.paragraph.includes(core.headline) &&
    core.observedPositions.every(position => guide.paragraph.includes(position)) &&
    guide.supporting.length === report.sections.length - 1,
    'Relationship guide must follow the selected source-qualified core');

  const seen = new Set(core.observedFactPaths);
  guide.supporting.forEach((support, index) => {
    const section = report.sections[index + 1];
    guard(section !== undefined && section.claimType === support.claimType &&
      section.sourceIds.length > 0 && section.upstreamClaimIds.length >= 2 &&
      support.distinctObservedFactPaths.length > 0 &&
      support.distinctObservedFactPaths.length === support.distinctObservedPositions.length &&
      guide.paragraph.includes(section.headline),
      'Relationship guide support is not an actual selected T8');
    const additional = section.observedFactPaths.flatMap((path, positionIndex) => {
      if (seen.has(path)) return [];
      const position = section.observedPositions[positionIndex];
      guard(position !== undefined, 'Relationship guide missing a source position');
      seen.add(path);
      return [{ path, position }];
    });
    guard(JSON.stringify(additional.map(item => item.path)) ===
      JSON.stringify(support.distinctObservedFactPaths) &&
      JSON.stringify(additional.map(item => item.position)) ===
      JSON.stringify(support.distinctObservedPositions) &&
      support.distinctObservedPositions.every(position => guide.paragraph.includes(position)),
      'Relationship guide duplicates or invents canonical observations');
  });
  guard(report.state === 'complete' && guide.supporting.length === 2 ||
    report.state === 'partial' && guide.supporting.length < 2,
    'Relationship guide overstates minimum useful reading status');
  return '<section class="reading-guide" aria-label="관계운 읽기 요약"><h3>' +
    escapeHtml(guide.title) + '</h3><p>' + escapeHtml(guide.paragraph) +
    '</p></section>';
}

/**
 * General, Wealth, Business and Relationship first-screen reading is the EXACT Korean
 * text of their selected, source-bounded T8 Claims, not a headline-only
 * explanation or a freshly inferred cross-Claim synthesis.
 *
 * The full per-Claim attribution remains available in the original details.
 * Partial reports show only the actually selected claims, never a three-axis
 * conclusion when their independent MUR supports are missing.
 */
function renderFirstScreenSelectedInterpretations(
  domain: string,
  report: ResearchReport,
): string {
  if (domain === 'general') {
    const scoped = report as GeneralNatalMultifactorReport;
    const guide = scoped.readingGuide;
    const sections = scoped.sections;
    if (sections.length === 0) return '';
    // Tension-only T8 already has a source-bound partial reading guide.
    // Keep that exact Claim/Rule/Source, but never promote it to a core.
    const tensionOnly = sections.length === 1 && sections[0]!.axis === 'tension';
    guard((tensionOnly
      ? guide !== undefined && scoped.state === 'partial' &&
        scoped.missing.includes('출처 있는 원국 중심 복합 해석 축') &&
        guide.sourceClaimType === sections[0]!.claimType &&
        guide.supporting.length === 0 &&
        guide.sourceIds.length === sections[0]!.sourceIds.length &&
        sections[0]!.sourceIds.every(id => guide.sourceIds.includes(id)) &&
        guide.ruleIds.length === 1 && guide.ruleIds[0] === sections[0]!.ruleId &&
        guide.paragraph.includes(sections[0]!.headline) &&
        guide.paragraph.includes(sections[0]!.paragraph)
      : guide !== undefined && sections[0]?.claimType === guide.sourceClaimType &&
        guide.sourceIds.length > 0 &&
        guide.sourceIds.every(id => id.trim().length > 0)) &&
      sections.every(section => section.sourceIds.length > 0 &&
        section.upstreamClaimIds.length >= 2 &&
        section.observedFactPaths.length >= 2 &&
        section.observedPositions.length === section.observedFactPaths.length &&
        section.paragraph.trim().length > 0),
      'General first-screen reading requires exact selected T8 evidence');
    const items = sections.map((section, i) =>
      '<section class="first-claim"><h4>' +
      escapeHtml(tensionOnly ? '확인된 부분 관점 · ' + section.headline :
        (i === 0 ? '중심 관점 · ' : '독립 보조 관점 · ') + section.headline) +
      '</h4><p>' + escapeHtml(section.paragraph) + '</p></section>').join('');
    const scope = tensionOnly
      ? '이 명식에서는 구조적 긴장에 대한 제한된 근거만 확인됐습니다. 총운의 중심 결론은 보류합니다.'
      : scoped.state === 'complete'
        ? '중심과 독립된 보조 관점을 확인한 연구용 풀이입니다. 성격·미래 사건을 단정하지 않습니다.'
        : '실제 확인된 부분 해석만 보여줍니다. 부족한 독립 보조 근거는 종합 결론으로 채우지 않습니다.';
    return '<section class="first-meaning" aria-label="총운 명식별 풀이 본문">' +
      '<h3>이 명식에서 먼저 읽을 실제 총운 풀이</h3>' + items +
      '<p class="bounded-note">' + escapeHtml(scope) + '</p></section>';
  }
  if (domain === 'wealth') {
    const scoped = report as WealthNatalMultifactorReport;
    const sections = scoped.sections;
    if (sections.length === 0) return '';
    const core = sections[0]!;
    const hasCore = ['core', 'creation', 'management', 'planning'].includes(core.axis);
    guard(sections.every(section =>
      section.sourceIds.length > 0 && section.upstreamClaimIds.length >= 2 &&
      section.observedFactPaths.length >= 2 &&
      section.observedPositions.length === section.observedFactPaths.length &&
      section.paragraph.trim().length > 0) &&
      (hasCore
        ? scoped.readingGuide?.coreClaimType === core.claimType &&
          sections.slice(1).every(section => section.axis !== 'context')
        : scoped.readingGuide === undefined && scoped.state === 'partial' &&
          sections.length <= 2 && sections.every(section =>
            section.axis === 'tension' || section.axis === 'context')),
      'Wealth first-screen requires only the source-owned selected T8 reading');
    const items = sections.map((section, i) => {
      const label = hasCore
        ? (i === 0 ? '중심 관점 · ' : '독립 보조 관점 · ')
        : section.axis === 'tension'
          ? '확인된 긴장 부분 관점 · ' : '재성 중심 결론이 아닌 간접 맥락 · ';
      return '<section class="first-claim"><h4>' +
        escapeHtml(label + section.headline) + '</h4><p>' +
        escapeHtml(section.paragraph) + '</p></section>';
    }).join('');
    const scope = !hasCore
      ? '이 명식에서는 재물운 중심 결론이 확립되지 않았습니다. 긴장 또는 간접 맥락의 기존 부분풀이만 보여주며 소득·투자 결과를 판단하지 않습니다.'
      : scoped.state === 'complete'
        ? '중심 하나와 서로 독립적인 보조 두 가지를 확인한 연구용 풀이입니다. 실제 재산이나 미래 수익을 판정하지 않습니다.'
        : '재물과 관련된 기존 중심 풀이가 있지만 독립적인 추가 근거가 부족하여 종합 판단은 보류합니다.';
    return '<section class="first-meaning" aria-label="재물운 명식별 풀이 본문">' +
      '<h3>이 명식에서 먼저 읽을 실제 재물 풀이</h3>' + items +
      '<p class="bounded-note">' + escapeHtml(scope) + '</p></section>';
  }
  if (domain !== 'business' && domain !== 'relationship') return '';
  const scoped = domain === 'business'
    ? report as BusinessNatalMultifactorReport
    : report as RelationshipNatalMultifactorReport;
  if (scoped.readingGuide === undefined || scoped.sections.length === 0) return '';
  const sections = scoped.sections;
  guard(sections[0]?.claimType === scoped.readingGuide.coreClaimType &&
    sections.every(section => section.sourceIds.length > 0 &&
      section.upstreamClaimIds.length >= 2 && section.paragraph.trim().length > 0),
    'first-screen interpretation must use exact selected sourced T8 paragraphs');
  const items = sections.map((section, i) =>
    '<section class="first-claim"><h4>' +
    escapeHtml((i === 0 ? '중심 관점 · ' : '독립 보조 관점 · ') +
      section.headline) + '</h4><p>' + escapeHtml(section.paragraph) +
    '</p></section>').join('');
  const scope = report.state === 'complete'
    ? '이 명식에서 확인된 중심 1개와 독립 보조 2개의 기존 연구 풀이입니다. 실제 사업·관계 결과를 예측하지 않습니다.'
    : '이 명식에서 출처가 확인된 부분 풀이만 보여줍니다. 보조 근거가 부족한 종합 결론은 보류합니다.';
  return '<section class="first-meaning" aria-label="' +
    (domain === 'business' ? '사업' : '관계') + ' 명식별 풀이 본문">' +
    '<h3>이 명식에서 먼저 읽을 실제 풀이</h3>' + items +
    '<p class="bounded-note">' + escapeHtml(scope) + '</p></section>';
}

/**
 * Existing sourced T5 observations can still be read when Wealth T8 is
 * insufficient. This renders a bounded explanation, never a Wealth claim.
 */
function renderWealthAvailableThemeContext(report: WealthNatalMultifactorReport): string {
  const context = report.availableThemeContext;
  if (context === undefined) return '';
  // Only a bounded incomplete report may show unconsumed T5. With an
  // actual selected core, these are independent T5 notes, NOT new T8 supports.
  const partialAxes = report.sections.map(section => section.axis);
  const partialCore = report.state === 'partial' &&
    report.readingGuide !== undefined && report.sections.length > 0 &&
    ['core', 'creation', 'management', 'planning'].includes(report.sections[0]!.axis) &&
    report.readingGuide.coreClaimType === report.sections[0]!.claimType &&
    report.sections.length < 3;
  const limitedWithoutCore = report.sections.length === 0
    ? report.state === 'insufficient'
    : report.state === 'partial' && report.readingGuide === undefined &&
      partialAxes.length <= 2 && new Set(partialAxes).size === partialAxes.length &&
      report.sections.every(section =>
        section.axis === 'context' && section.pattern.endsWith('_CONTEXT') ||
        section.axis === 'tension' &&
          (section.pattern === 'PEER_WEALTH' ||
           section.pattern === 'PEER_WEALTH_RESOURCE')) &&
      (report.sections.length !== 2 ||
        report.sections[1]!.observedFactPaths.some(path =>
          !report.sections[0]!.observedFactPaths.includes(path)));
  guard((limitedWithoutCore || partialCore) &&
    context.wealthConclusionAuthorized === false &&
    context.themes.length > 0 && context.title.trim().length > 0 &&
    context.paragraph.trim().length > 0 &&
    (context.hiddenWealthEvidenceStatus === 'resolved' ||
      (context.hiddenWealthEvidenceStatus === 'unavailable' &&
        context.hiddenWealthMembership.length === 0 &&
        !!context.hiddenWealthUnavailableReason)),
    'existing theme context must not become a Wealth synthesis');
  const alreadyInterpreted = new Set(report.sections.flatMap(section =>
    section.upstreamClaimIds));
  const alreadyObserved = new Set(report.sections.flatMap(section =>
    section.observedFactPaths));
  guard(context.themes.every(theme =>
    !alreadyInterpreted.has(theme.claimId) &&
    theme.observedFactPaths.every(path => !alreadyObserved.has(path))),
    'existing theme context repeats an already interpreted T8 upstream claim');
  const currentGap = report.missing[0];
  guard(typeof currentGap === 'string' && currentGap.trim().length > 0,
    'partial Wealth context requires an exact missing-evidence reason');
  const hidden = context.hiddenWealthMembership.map(item => {
    guard(['year', 'month', 'day', 'hour'].includes(item.pillar) &&
      item.meaningAuthority === 'calculated_membership_only' &&
      item.wealthConclusionAuthorized === false &&
      (item.derivedTenGod === '편재' || item.derivedTenGod === '정재') &&
      item.factPaths.length === 2 &&
      item.factPaths[0] === 'derivedFacts.dayMaster' &&
      item.factPaths[1] === 'derivedFacts.hiddenStems.' + item.pillar &&
      item.sourcePillarRef === 'pillars.' + item.pillar &&
      item.occurrenceId === item.pillar + ':' + item.hiddenStem &&
      item.mappingAuthorityDefinitionHash ===
        SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCE_AUTHORITY.definitionHash &&
      item.membershipSourceUrl ===
        SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCE_AUTHORITY
          .sourceBindings.hiddenMembershipSource.url,
      'unverified hidden stem membership cannot be represented as an interpretation');
    return '<li>' + escapeHtml(item.pillar + ' 지지 ' + item.branch +
      '의 지장간 ' + item.hiddenStem + ' · ' + item.derivedTenGod) +
      ' (지장간 구성의 계산 기록 · 별도 해석 아님)' +
      '<details><summary>계산 경로와 지장간 구성 출처</summary>' +
      renderList(item.factPaths) + '<p>' +
      escapeHtml(item.membershipSourceUrl) + '</p></details></li>';
  }).join('');
  const inferredBoundary = report.sections.every(section => section.axis === 'context') &&
    context.themes.every(theme => theme.family !== 'wealth')
    ? context.hiddenWealthEvidenceStatus === 'unavailable'
      ? 'membership_unavailable'
      : context.hiddenWealthMembership.length > 0
        ? 'membership_only' : 'no_membership_observed'
    : undefined;
  guard(context.hiddenWealthT5Boundary === inferredBoundary,
    'hidden wealth evidence is not an executed direct Wealth T5 theme');
  const hiddenBoundaryNote = inferredBoundary === undefined ? ''
    : '<aside class="hidden-wealth-fact-boundary" aria-label="지장간 계산과 재물운 해석의 구분">' +
      '<strong>지장간 계산과 재물운 풀이의 차이</strong><p>' +
      (inferredBoundary === 'membership_only'
        ? '지장간 구성에는 재성 계열로 계산되는 천간이 실제로 포함됩니다. ' +
          '그러나 이는 지장간의 구성 기록이며, 기존 천간·지지 대표 십신의 재성 해석 근거(T5)가 아닙니다. ' +
          '따라서 이를 재물 중심 복합 풀이(T8)로 자동 연결하지 않습니다.'
        : inferredBoundary === 'no_membership_observed'
          ? '현재 계산된 지장간 구성에서도 재성 계열 항목은 관측되지 않았습니다. ' +
            '이 사실은 재산이나 돈이 없다는 뜻이 아니며, 직접 재성 해석 근거(T5)의 부족을 대신 설명하지도 않습니다.'
          : '현재 지장간 구성이 미확정이어서 재성 계열 포함 여부를 판단하지 않습니다. ' +
            '미확정 구성으로 재물 복합 해석을 보완하지 않습니다.') +
      '</p><p>위 설명은 계산 사실과 해석 권한의 경계이지 새로운 운세 주장이 아닙니다.</p></aside>';
  const hiddenSection = hidden.length
    ? '<details><summary>지장간의 재성 계열 구성 관측</summary><ul>' +
      hidden + '</ul></details>'
    : context.hiddenWealthEvidenceStatus === 'unavailable'
      ? '<p>지장간 십신 관계는 현재 명식에서 확정할 수 없어 구성 관측을 표시하지 않습니다. ' +
        '구성 미확정은 재성 부재의 증거가 아닙니다.</p>'
      : '';
  const themes = context.themes.map(theme => {
    guard(/^TEN_GOD_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u
      .test(theme.claimType) && theme.claimId.trim().length > 0 &&
      theme.headline.trim().length > 0 && theme.summary.trim().length > 0 &&
      theme.sourceIds.length > 0 &&
      theme.ruleIds.length > 0 && theme.ruleIds.every(rule => rule.trim().length > 0) &&
      theme.methodologyId.trim().length > 0 &&
      theme.observedPositions.length > 0 &&
      theme.observedFactPaths.length === theme.observedPositions.length &&
      theme.observedFactPaths.every(path => FACT_PATH.test(path)) &&
      context.paragraph.includes(theme.summary) &&
      theme.observedPositions.every(position => context.paragraph.includes(position)),
      'existing theme context has no actual sourced calculation evidence');
    return '<li><strong>' + escapeHtml(theme.headline) + '</strong>' +
      '<details><summary>확인된 십신 위치와 기존 출처</summary>' +
      '<p>계산된 위치</p>' + renderList(theme.observedPositions) +
      '<p>계산 근거 경로</p>' + renderList(theme.observedFactPaths) +
      '<p>기존 십신 주장: ' + escapeHtml(theme.claimType) + '</p>' +
      '<p>근거 식별자: ' + escapeHtml(theme.claimId) + '</p>' +
      '<p>실행된 규칙</p>' + renderList(theme.ruleIds) +
      '<p>해석 방법론: ' + escapeHtml(theme.methodologyId) + '</p>' +
      '<p>출처</p>' + renderList(theme.sourceIds) +
      '</details></li>';
  }).join('');
  return '<section class="bounded-source-context" aria-label="재물운 근거 있는 부분 설명">' +
    '<h3>' + escapeHtml(context.title) + '</h3>' +
    '<p><strong>재물운 종합 해석 아님 · 기존 십신 관측만 설명</strong></p>' +
    '<p class="source-gap"><strong>현재 종합 풀이가 보류된 이유: </strong>' +
    escapeHtml(currentGap) + '</p>' +
    '<p>' + escapeHtml(context.paragraph) + '</p>' +
    hiddenBoundaryNote +
    '<details><summary>주제별 계산 근거·출처 보기</summary><ul>' +
    themes + '</ul></details>' + hiddenSection + '</section>';
}

/** A source-owned T5 partial reading is not a missing General T8 synthesis. */
function renderGeneralExistingT5Context(report: GeneralNatalMultifactorReport): string {
  const context = report.availableThemeContext;
  if (context === undefined) return '';
  const noT8 = report.state === 'insufficient' && report.sections.length === 0;
  const tensionOnly = report.state === 'partial' && report.sections.length === 1 &&
    report.sections[0]?.axis === 'tension';
  const partialCore = report.state === 'partial' && report.readingGuide !== undefined &&
    report.sections.length > 0 && report.sections.length < 3 &&
    report.sections[0]!.axis !== 'tension' &&
    report.readingGuide.sourceClaimType === report.sections[0]!.claimType;
  const consumedT5 = new Set(report.sections.flatMap(section => section.upstreamClaimIds));
  const usedFactPaths = new Set(report.sections.flatMap(section => section.observedFactPaths));
  guard((noT8 || tensionOnly || partialCore) &&
    context.themes.every(theme =>
      !consumedT5.has(theme.claimId) &&
      theme.observedFactPaths.every(path => !usedFactPaths.has(path))) &&
    context.wholeChartSynthesisAuthorized === false && context.themes.length > 0 &&
    report.researchOnly && !report.mayPublish && !report.maySell &&
    context.title.length > 0 && context.paragraph.length > 0,
    'General T5 context cannot substitute for a source-qualified T8 synthesis');
  const items = context.themes.map(theme => {
    guard(/^TEN_GOD_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u
      .test(theme.claimType) && theme.claimId.length > 0 &&
      theme.sourceIds.length > 0 && theme.ruleIds.length > 0 &&
      theme.methodologyId.length > 0 && theme.observedPositions.length > 0 &&
      theme.observedPositions.length === theme.observedFactPaths.length &&
      theme.observedFactPaths.every(path => FACT_PATH.test(path)) &&
      context.paragraph.includes(theme.summary) &&
      theme.observedPositions.every(position => context.paragraph.includes(position)),
      'General T5 partial reading lacks original rule, source, or calculated chart facts');
    return '<li><strong>' + escapeHtml(theme.headline) + '</strong>' +
      '<p>' + escapeHtml(theme.summary) + '</p>' +
      '<p>확인된 명식 위치: ' + escapeHtml(theme.observedPositions.join(' · ')) + '</p>' +
      '<details><summary>기존 십신 해석의 실제 근거</summary>' +
      '<p>Claim: ' + escapeHtml(theme.claimId) + ' · ' + escapeHtml(theme.claimType) + '</p>' +
      '<p>계산 경로</p>' + renderList(theme.observedFactPaths) +
      '<p>규칙</p>' + renderList(theme.ruleIds) +
      '<p>방법론: ' + escapeHtml(theme.methodologyId) + '</p>' +
      '<p>출처</p>' + renderList(theme.sourceIds) + '</details></li>';
  }).join('');
  return '<section class="bounded-general-t5" aria-label="전체 원국의 기존 십신 부분 해석">' +
    '<h3>' + escapeHtml(context.title) + '</h3>' +
    '<p><strong>원국 종합해석 아님 · 등록된 개별 십신 해석만 확인</strong></p>' +
    '<p>' + escapeHtml(context.paragraph) + '</p><ul>' + items + '</ul></section>';
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
    (domain === 'wealth' &&
      (report as WealthNatalMultifactorReport).availableThemeContext !== undefined
      ? '<p>재물운의 중심 복합 해석 근거는 아직 확인되지 않았습니다. ' +
        '아래에는 출처 있는 개별 십신 관점만 부분적으로 설명합니다.</p>'
      : '<p>현재 이 명식에서 근거가 확인된 해석 문단은 없습니다.</p>');
  const missing = report.missing.length > 0
    ? '<section class="missing"><h3>아직 설명하지 못하는 부분</h3>' + renderList(report.missing) + '</section>'
    : '';
  const readingGuide = domain === 'career'
    ? renderCareerReadingGuide(report as CareerMultifactorReport)
    : domain === 'wealth'
      ? renderWealthReadingGuide(report as WealthNatalMultifactorReport)
      : domain === 'business'
        ? renderBusinessReadingGuide(report as BusinessNatalMultifactorReport)
        : domain === 'relationship'
          ? renderRelationshipReadingGuide(report as RelationshipNatalMultifactorReport) : '';
  const existingWealthContext = domain === 'wealth'
    ? renderWealthAvailableThemeContext(report as WealthNatalMultifactorReport) : '';
  const existingGeneralContext = domain === 'general' && birthTimeKnown
    ? renderGeneralExistingT5Context(report as GeneralNatalMultifactorReport) : '';
  const firstMeaning = renderFirstScreenSelectedInterpretations(domain, report);
  const details = firstMeaning === '' ? readingGuide + originalText
    : '<details class="full-claim-evidence"><summary>원국 풀이의 상세 설명·명식 근거와 출처</summary>' +
      readingGuide + originalText + '</details>';
  return '<article aria-labelledby="domain-' + domain + '" class="domain">' +
    '<h2 id="domain-' + domain + '">' + escapeHtml(label) + '</h2>' +
    '<p><strong>' + escapeHtml(STATE_LABELS[report.state]) + '</strong></p>' +
    '<p>' + escapeHtml(report.introduction) + '</p>' + firstMeaning +
    existingGeneralContext + existingWealthContext + details + missing +
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
    'ol.overview p{margin:.2em 0}' +
    '.first-meaning{padding:16px 18px;border-radius:12px;background:#eff3ed}' +
    '.first-claim{border-bottom:1px solid #d3ddd2;padding:7px 0}' +
    '.first-claim:last-of-type{border-bottom:none}' +
    '.bounded-note{font-size:.9em;color:#536054}' +
    '.full-claim-evidence{margin:14px 0}</style></head>' +
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
