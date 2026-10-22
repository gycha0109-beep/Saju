import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import { RELATIONSHIP_SPOUSE_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 } from '../reading/official-reading-detailed-presentation-spouse.js';
import type { CompatibilityTwoChartIntakePreview } from './compatibility-two-chart-intake-preview.js';
import type {
  FamilyCanonicalObservationPreview,
  FamilyPillarObservation,
} from './family-parents-children-observation-preview.js';

export const RELATIONSHIP_THREE_MENU_RESEARCH_PAGE_VERSION =
  'myeongha-relationship-three-menu-research-page-v1' as const;

export type RelationshipResearchCardId = 'family' | 'spouse' | 'compatibility';

export interface RelationshipResearchCard {
  menuId: RelationshipResearchCardId;
  label: string;
  state: 'partial' | 'unavailable';
  meaning: 'calculation_facts_only' | 'position_only' | 'none';
  summary: string;
  missing: readonly string[];
}

export interface RelationshipThreeMenuResearchPage {
  version: typeof RELATIONSHIP_THREE_MENU_RESEARCH_PAGE_VERSION;
  snapshotId: string;
  calculationHash: string;
  cards: readonly RelationshipResearchCard[];
  html: string;
  lifecycle: 'internal_research_only';
  mayClaimFamilyOutcomes: false;
  mayClaimPartnerTraits: false;
  mayClaimCompatibility: false;
  mayPublish: false;
  mayPersist: false;
  maySell: false;
  mayGrantOfficialAuthority: false;
}

export interface RelationshipThreeMenuResearchPageInput {
  subjectSnapshot: CanonicalSajuSnapshot;
  parents: FamilyCanonicalObservationPreview;
  children: FamilyCanonicalObservationPreview;
  compatibility?: CompatibilityTwoChartIntakePreview;
}

function matchesActualFamilyFact(
  snapshot: CanonicalSajuSnapshot,
  item: FamilyPillarObservation,
): boolean {
  const fact = snapshot.pillars[item.pillarSlot];
  const expectedState = fact.status === 'resolved'
    ? 'resolved' : fact.status === 'ambiguous' ? 'ambiguous' : 'unavailable';
  if (item.state !== expectedState) return false;
  if (expectedState !== 'resolved') return item.observedPillar === undefined;
  if (fact.status !== 'resolved') return false;
  return item.observedPillar === fact.value.stem.value + fact.value.branch.value;
}

function assertBoundedFamily(
  snapshot: CanonicalSajuSnapshot,
  report: FamilyCanonicalObservationPreview,
  scope: 'parents' | 'children',
): void {
  if (report.scope !== scope ||
      report.snapshotId !== snapshot.snapshotId ||
      report.calculationHash !== snapshot.calculationHash ||
      report.mode !== 'internal_exploration' ||
      report.status !== 'not_official_reading' ||
      report.interpretationCoverage !== 'insufficient_evidence' ||
      !report.researchOnly || report.usefulComplete ||
      report.mayPublish || report.maySell ||
      report.observations.some(item =>
        item.factPath !== 'pillars.' + item.pillarSlot ||
        !((scope === 'parents' && (item.pillarSlot === 'year' || item.pillarSlot === 'month')) ||
          (scope === 'children' && item.pillarSlot === 'hour')) ||
        !matchesActualFamilyFact(snapshot, item))) {
    throw new TypeError('Relationship page refuses mismatched or promoted family chart observations.');
  }
  const expectedSlots = scope === 'parents' ? ['year', 'month'] : ['hour'];
  if (report.observations.length !== expectedSlots.length ||
      !report.observations.every((item, index) =>
        item.pillarSlot === expectedSlots[index])) {
    throw new TypeError('Relationship page requires exact family scope pillar ordering.');
  }
}

function assertBoundedCompatibility(
  snapshot: CanonicalSajuSnapshot,
  report: CompatibilityTwoChartIntakePreview,
): void {
  if (report.mode !== 'two_person_calculation_only' ||
      report.readingStatus !== 'insufficient_interpersonal_meaning_authority' ||
      report.subject.snapshotId !== snapshot.snapshotId ||
      report.subject.calculationHash !== snapshot.calculationHash ||
      report.subject.personRef.trim().length === 0 ||
      report.target.personRef.trim().length === 0 ||
      report.subject.personRef === report.target.personRef ||
      !report.researchOnly || report.usefulComplete ||
      report.mayPublish || report.maySell) {
    throw new TypeError('Relationship page refuses a mixed-person or promoted compatibility report.');
  }
  const slots = ['year', 'month', 'day', 'hour'] as const;
  if (report.subject.pillars.length !== slots.length ||
      report.target.pillars.length !== slots.length ||
      !report.subject.pillars.every((item, index) =>
        item.slot === slots[index] &&
        item.status === (snapshot.pillars[item.slot].status === 'resolved' ? 'resolved' : 'unavailable'))) {
    throw new TypeError('Relationship page refuses an incompatible subject fact scope.');
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/gu, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]!);
}

function observationHtml(item: FamilyPillarObservation): string {
  return '<li><strong>' + escapeHtml(item.pillarLabel) + '</strong> ' +
    escapeHtml(item.text) + ' <small>' +
    escapeHtml(item.factPath) + '</small></li>';
}

function list(items: readonly string[]): string {
  return '<ul>' + items.map(item => '<li>' + escapeHtml(item) + '</li>').join('') + '</ul>';
}

/**
 * Product-readable internal C-track page for three already-existing scopes.
 * No calculation, Claim, or source is synthesized; callers pass the exact
 * existing family and optional two-person research outputs for ONE person.
 * Position-only spouse wording comes from the already approved SA-7C profile.
 * UI/HTTP/storage/commerce authorization remains a separate MyeongHa task.
 */
export function buildRelationshipThreeMenuResearchPage(
  input: RelationshipThreeMenuResearchPageInput,
): RelationshipThreeMenuResearchPage {
  const { subjectSnapshot: snapshot, parents, children, compatibility } = input;
  assertBoundedFamily(snapshot, parents, 'parents');
  assertBoundedFamily(snapshot, children, 'children');
  if (compatibility !== undefined) assertBoundedCompatibility(snapshot, compatibility);

  const spouseSource = RELATIONSHIP_SPOUSE_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1;
  if (spouseSource.length !== 1 ||
      spouseSource[0]?.owner !== 'relationship:natal:spouse' ||
      spouseSource[0].claimType !== 'relationship.spouse.traditional_spouse_palace_position' ||
      spouseSource[0].supportingClaimTypes.length !== 0 ||
      spouseSource[0].provenance.sourceRefs.length === 0 ||
      spouseSource[0].prohibitedExtensions.length === 0) {
    throw new TypeError('Relationship page only supports the exact bounded spouse position profile.');
  }
  const profile = spouseSource[0]!;
  const day = snapshot.pillars.day;
  const dayResolved = day.status === 'resolved';
  const resolvedFamily = [...parents.observations, ...children.observations]
    .some(item => item.state === 'resolved');
  const parentState = parents.observations.some(item => item.state === 'resolved')
    ? '계산 관찰 가능' : '계산 근거 부족';
  const childState = children.observations.some(item => item.state === 'resolved')
    ? '계산 관찰 가능' : '출생시각 또는 계산 근거 부족';

  const compatibilityHasFacts = compatibility !== undefined &&
    compatibility.subject.pillars.some(item => item.status === 'resolved') &&
    compatibility.target.pillars.some(item => item.status === 'resolved');

  const cards: RelationshipResearchCard[] = [
    {
      menuId: 'family', label: '가족',
      state: resolvedFamily ? 'partial' : 'unavailable',
      meaning: resolvedFamily ? 'calculation_facts_only' : 'none',
      summary: '부모와 자녀의 서로 다른 고전 배속 후보에 대응하는 본인 명식 계산 사실만 표시합니다.',
      missing: [...new Set([...parents.missing, ...children.missing])],
    },
    {
      menuId: 'spouse', label: '배우자·관계',
      state: dayResolved ? 'partial' : 'unavailable',
      meaning: dayResolved ? 'position_only' : 'none',
      summary: dayResolved
        ? '본인의 일지(日支) ' + day.value.branch.hanja +
          '는 전통 명리에서 배우자궁으로 부르는 위치입니다.'
        : '일지 계산값이 확정되지 않아 배우자궁 위치를 개인별로 표시하지 않습니다.',
      missing: ['위치만 표시할 수 있으며 배우자의 성격, 외모, 결혼 시기, 관계 결과는 추론하지 않습니다.'],
    },
    {
      menuId: 'compatibility', label: '궁합',
      state: compatibilityHasFacts ? 'partial' : 'unavailable',
      meaning: compatibilityHasFacts ? 'calculation_facts_only' : 'none',
      summary: compatibility === undefined
        ? '상대방의 허용된 출생정보가 입력되면 두 명식 계산값을 나란히 확인할 수 있습니다.'
        : '두 명식의 독립된 계산 사실만 표시합니다. 상호관계의 원인이나 점수는 해석하지 않습니다.',
      missing: compatibility === undefined
        ? ['상대방 출생정보와 처리 동의가 필요합니다.', '근거 있는 T10 궁합 상호 해석은 아직 미승인입니다.']
        : [...compatibility.missing],
    },
  ];
  const e = escapeHtml;
  const status = (card: RelationshipResearchCard) =>
    card.state === 'partial' ? '계산/위치 부분 지원 · 정식 풀이 아님' : '필요한 정보 또는 해석 근거 부족';
  const family = '<section id="family"><h2>가족 · 부모와 자녀를 따로 확인</h2>' +
    '<p>' + e(cards[0]!.summary) + '</p>' +
    '<h3>부모 (' + parentState + ')</h3><p>' + e(parents.introduction) + '</p>' +
    '<ul>' + parents.observations.map(observationHtml).join('') + '</ul>' +
    '<h3>자녀 (' + childState + ')</h3><p>' + e(children.introduction) + '</p>' +
    '<ul>' + children.observations.map(observationHtml).join('') + '</ul>' +
    '<details><summary>부모·자녀 해석에 아직 부족한 근거</summary>' +
    list(cards[0]!.missing) + '</details></section>';
  const spouse = '<section id="spouse"><h2>배우자·관계 · 일지 위치만</h2>' +
    '<p>' + e(cards[1]!.summary) + '</p>' +
    '<p>' + e(profile.standardText.summary) + '</p>' +
    '<p>' + e(profile.approvedTextByRole.clarification) + '</p>' +
    '<p>' + e(profile.approvedTextByRole.boundary) + '</p>' +
    '<details><summary>승인된 위치 설명의 출처</summary><p>' +
    e(profile.profileId) + ' / pillars.day</p>' +
    list(profile.provenance.sourceRefs) + '</details></section>';
  const compatibilityHtml = compatibility === undefined
    ? '<p>상대방 명식을 아직 입력하지 않았습니다. 궁합을 추정하지 않습니다.</p>'
    : '<p>첫 번째 명식: ' + e(compatibility.subject.personRef) +
      ' / 두 번째 명식: ' + e(compatibility.target.personRef) + '</p>' +
      [compatibility.subject, compatibility.target].map(person =>
        '<h3>' + (person === compatibility.subject ? '본인' : '상대방') +
        '의 계산된 기둥</h3><ul>' + person.pillars.map(pillar =>
          '<li>' + e(pillar.label) + ': ' +
          (pillar.status === 'resolved'
            ? e(pillar.stemHanja! + pillar.branchHanja!) : '미확정') +
          ' <small>' + e(pillar.factPath) + '</small></li>').join('') + '</ul>').join('') +
      list(compatibility.missing);
  const compare = '<section id="compatibility"><h2>궁합 · 두 명식 확인</h2>' +
    '<p>' + e(cards[2]!.summary) + '</p>' + compatibilityHtml +
    '<p>두 사람의 기둥을 나란히 보는 것만으로 T10 궁합 해석이나 점수를 만들지 않습니다.</p></section>';
  const html = '<!doctype html><html lang="ko"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>명하 관계 메뉴 읽기 · 내부 연구</title>' +
    '<style>body{margin:0;background:#f7f3ed;color:#292722;font:16px/1.7 system-ui,"Malgun Gothic",sans-serif}' +
    'main{max-width:850px;margin:auto;padding:24px 20px 72px}section{margin:22px 0;background:white;border-radius:14px;padding:20px}' +
    'small,details{font-size:12px;overflow-wrap:anywhere}li{margin:5px 0}nav a{margin-right:18px}h2{margin-top:0}' +
    '.note{padding:15px;background:#ede8de;border-radius:10px}</style></head><body><main>' +
    '<h1>사람과의 관계 · 확인 가능한 내용부터</h1>' +
    '<p class="note">본인 명식에 실제 계산된 내용과 승인된 배우자궁의 위치만 표시합니다. ' +
    '가족의 성격·관계 결과, 결혼 시기, 궁합 점수 등 근거가 없는 주장은 만들지 않습니다.</p>' +
    '<nav><a href="#family">가족</a><a href="#spouse">배우자·관계</a>' +
    '<a href="#compatibility">궁합</a></nav><ol>' +
    cards.map(card => '<li><strong>' + e(card.label) + '</strong>: ' +
      status(card) + '</li>').join('') + '</ol>' + family + spouse + compare +
    '<footer class="note">내부 연구용 부분 지원 · Official/Production 승격, 공개·보관·판매 불가' +
    '</footer></main></body></html>';

  return {
    version: RELATIONSHIP_THREE_MENU_RESEARCH_PAGE_VERSION,
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    cards, html,
    lifecycle: 'internal_research_only',
    mayClaimFamilyOutcomes: false,
    mayClaimPartnerTraits: false,
    mayClaimCompatibility: false,
    mayPublish: false,
    mayPersist: false,
    maySell: false,
    mayGrantOfficialAuthority: false,
  };
}
