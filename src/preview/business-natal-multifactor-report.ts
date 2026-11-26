import { getTenGod } from 'manseryeok';
import { describeQuotedReadingAxis } from './korean-reading-headline.js';
import { buildSelectedWholeChartNatalReading, type WholeChartNatalReading } from './whole-chart-reading.js';
import type { CanonicalSajuSnapshot, PillarSlot } from '../contracts/calculation.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import { deterministicContentHash, type ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { buildReadingCompositionEvidence } from '../reading/reading-intent-composition.js';
import {
  BUSINESS_NATAL_MULTIFACTOR_PACK,
  BUSINESS_NATAL_MULTIFACTOR_NARRATIVES,
} from '../research/business-natal-multifactor-candidate.js';

export const BUSINESS_NATAL_MULTIFACTOR_REPORT_VERSION = '0.5.0-research-preview' as const;
type Axis = 'core' | 'execution' | 'governance' | 'preparation' | 'coordination';
type Status = 'complete' | 'partial' | 'insufficient';
type Family = 'peer' | 'resource' | 'output' | 'wealth' | 'officer';
type Channel = 'visible_stems' | 'branches' | 'hidden_stems';
export type BusinessMeaningArea =
  | 'production_proposal'
  | 'exchange_resource'
  | 'operations_responsibility'
  | 'preparation_execution'
  | 'initiative_collaboration'
  | 'sustainability';
export interface BusinessMeaningCoverage {
  required: readonly BusinessMeaningArea[];
  covered: readonly BusinessMeaningArea[];
  missing: readonly BusinessMeaningArea[];
}
export interface BusinessNatalMultifactorSection {
  claimType: string;
  pattern: string;
  axis: Axis;
  channel: Channel;
  families: readonly Family[];
  headline: string;
  paragraph: string;
  upstreamClaimIds: readonly string[];
  sourceIds: readonly string[];
  ruleId: string;
  observedPositions: readonly string[];
  observedFactPaths: readonly string[];
}
export interface BusinessNatalReadingGuide {
  title: string;
  paragraph: string;
  coreClaimType: string;
  supporting: readonly {
    claimType: string;
    distinctObservedFactPaths: readonly string[];
    distinctObservedPositions: readonly string[];
  }[];
}
export interface BusinessNatalMultifactorReport {
  snapshotId: string;
  calculationHash: string;
  version: typeof BUSINESS_NATAL_MULTIFACTOR_REPORT_VERSION;
  state: Status;
  title: string;
  introduction: string;
  sections: readonly BusinessNatalMultifactorSection[];
  meaningCoverage: BusinessMeaningCoverage;
  readingGuide?: BusinessNatalReadingGuide;
  wholeChart: WholeChartNatalReading;
  missing: readonly string[];
  limitations: readonly string[];
  researchOnly: true;
  mayPublish: false;
  maySell: false;
  usefulComplete: false;
}
const AXES: readonly Axis[] = ['core', 'execution', 'governance', 'preparation', 'coordination'];
const SLOT_NAMES: Readonly<Record<PillarSlot, string>> = {
  year: '연주', month: '월주', day: '일주', hour: '시주',
};
const FAMILIES: Readonly<Record<string, readonly string[]>> = {
  peer: ['비견','겁재'], resource: ['정인','편인'], output: ['식신','상관'],
  wealth: ['정재','편재'], officer: ['정관','편관'],
};
const EVIDENCE_ROLES: Readonly<Record<string, string>> = {
  'peer': '비겁(자기 기준·동료 관점)',
  'resource': '인성(학습·준비)',
  'output': '식상(표현·산출)',
  'wealth': '재성(현실 자원·교환)',
  'officer': '관성(규범·역할 기준)'
};
const LIMITATIONS = [
  '전통 문헌의 제한된 구조 관계를 이용한 미검토 연구 풀이입니다. 실제 삶의 성격·사건을 판정하지 않습니다.',
  '사업 성공·실패, 매출, 창업 역량, 수익, 조직 갈등이나 미래 사업 사건을 예측하지 않습니다.',
  '공식 게시·저장·판매에 사용할 수 없는 내부 실험입니다.',
] as const;

function unknownHourCalculatedContext(snapshot: CanonicalSajuSnapshot): string {
  const slots = [
    ['year', '연주'], ['month', '월주'], ['day', '일주'],
  ] as const;
  const observed = slots.map(([slot, label]) => {
    const fact = snapshot.pillars[slot];
    return label + ' ' + (fact.status === 'resolved'
      ? fact.value.stem.value + fact.value.branch.value
      : '미확정');
  });
  return '출생시각이 없어도 확인 가능한 본인 명식의 계산 사실은 ' +
    observed.join(' · ') + '입니다. 이는 실제 명식의 간지 관찰일 뿐 ' +
    '시주가 필요한 천간·지지 대표 십신 근거는 제외하고, 확정된 연주·월주·일주 지장간에서 확인된 근거만 부분적으로 사용합니다.';
}

function guard(v: unknown, message: string): asserts v {
  if (!v) throw new TypeError('Business multifactor: ' + message);
}
function textFor(claimType: string, key: 'headline'|'summary') {
  const profile = BUSINESS_NATAL_MULTIFACTOR_NARRATIVES.find(p => p.claimType === claimType);
  guard(profile, 'ClaimNarrativeProfile missing: ' + claimType);
  const matches = profile.templates?.filter(t => t.templateKey === key && t.language === 'ko') ?? [];
  guard(matches.length === 1 && matches[0]!.text.length > 0, 'Korean narrative template missing');
  return matches[0]!.text;
}
function positions(
  snapshot: CanonicalSajuSnapshot,
  channel: Channel,
  families: readonly string[],
) {
  guard(
    families.length >= 2 &&
      families.length <= 3 &&
      new Set(families).size === families.length &&
      families.every((family) => FAMILIES[family] !== undefined),
    'unresolved or unsupported exact chart input',
  );

  if (channel === 'hidden_stems') {
    const dayMaster = snapshot.derivedFacts.dayMaster;
    const hidden = snapshot.derivedFacts.hiddenStems;
    guard(dayMaster.status === 'resolved' && hidden !== undefined,
      'hidden-stem observations require the resolved day master and canonical hidden stems');
    const result = (['year', 'month', 'day', 'hour'] as const).flatMap((slot) => {
      const fact = hidden[slot];
      if (fact.status !== 'resolved') return [];
      return fact.value.flatMap((stem, index) => {
        const god = getTenGod(dayMaster.value.value, stem);
        const family = families.find((candidate) => FAMILIES[candidate]!.includes(god));
        if (!family) return [];
        return [{
          family,
          display: SLOT_NAMES[slot] + ' 지장간 ' + stem + '(' + god + ')',
          factPath: 'derivedFacts.hiddenStems.' + slot + '.value.' + index,
        }];
      });
    });
    guard(families.every((family) => result.some((item) => item.family === family)),
      'T8 hidden-stem family is not observed in its claimed channel');
    return result;
  }

  const fact = snapshot.derivedFacts.tenGods;
  guard(fact.status === 'resolved', 'visible-stem and branch T5 require resolved whole-chart Ten-Gods');
  const slots: readonly PillarSlot[] = channel === 'visible_stems'
    ? ['year', 'month', 'hour']
    : ['year', 'month', 'day', 'hour'];
  const key = channel === 'visible_stems' ? 'stem' : 'branch';
  const result = slots.flatMap((slot) => {
    const value = fact.value[slot][key];
    if (value?.status !== 'resolved') return [];
    const family = families.find((candidate) => FAMILIES[candidate]!.includes(value.value));
    if (!family) return [];
    return [{
      family,
      display: SLOT_NAMES[slot] + ' ' + (key === 'stem' ? '천간 ' : '지지 대표 십신 ') + value.value,
      factPath: 'derivedFacts.tenGods.value.' + slot + '.' + key + '.value',
    }];
  });
  guard(families.every((family) => result.some((item) => item.family === family)),
    'T8 upstream family is not observed in its claimed channel');
  return result;
}
function toSection(
  claim: InterpretationClaim,
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
): BusinessNatalMultifactorSection {
  const value = claim.value as Record<string, unknown>;
  guard(value && typeof value === 'object' && typeof value.pattern === 'string' &&
    AXES.includes(value.axis as Axis) &&
    (value.channel === 'visible_stems' || value.channel === 'branches' || value.channel === 'hidden_stems') &&
    Array.isArray(value.families) &&
    value.realLifeOutcomeAuthorized === false && value.futureTimingAuthorized === false &&
    value.healthOrMoneyOutcomeAuthorized === false && value.numericScoringAuthorized === false,
    'invalid or overclaiming structured T8 meaning');
  const upstream = claim.upstreamClaimRefs.map(id => execution.claims.find(c => c.claimId === id));
  const monthFood = value.pattern === 'MONTH_FOOD_WEALTH';
  guard(claim.scenarioRef === undefined && claim.methodologyRef.id ===
    (monthFood ? 'M-BUSINESS-NATAL-MONTH-FOOD-WEALTH-V1' : 'M-BUSINESS-NATAL-MULTIFACTOR-EXECUTION-GOVERNANCE-V1') &&
    new Set(claim.upstreamClaimRefs).size === claim.upstreamClaimRefs.length &&
    upstream.every(c => c && c.state === 'active' && c.taxonomy.tier === 'T5' &&
      c.snapshotId === snapshot.snapshotId && c.scenarioRef === undefined),
    'T8 requires only exact same-chart active T5 Claims');
  const ref = claim.ruleRefs[0];
  const rule = registry.rules.find(r => r.ruleId === ref?.ruleId && r.version === ref?.version);
  const evalResult = execution.evaluations.find(e => e.evaluationId === ref?.evaluationId);
  guard(claim.ruleRefs.length === 1 && rule &&
    rule.taxonomy.tier === 'T8' && rule.taxonomy.category === 'business' &&
    rule.taxonomy.subcategory === 'multifactor_structure' &&
    rule.output.predicate === 'business_multifactor_structure' && rule.status === 'research' &&
    rule.output.claimType === claim.claimType && rule.output.predicate === claim.predicate &&
    rule.methodologyRef.id === claim.methodologyRef.id &&
    rule.methodologyRef.version === claim.methodologyRef.version &&
    deterministicContentHash(rule.output.value) === deterministicContentHash(claim.value) &&
    evalResult?.status === 'matched' && evalResult.snapshotId === snapshot.snapshotId &&
    evalResult.scenarioRef === undefined && evalResult.ruleRef.id === rule.ruleId &&
    evalResult.ruleRef.version === rule.version &&
    evalResult.interpretationPackRef.id === registry.pack.packId &&
    evalResult.interpretationPackRef.version === registry.pack.version &&
    evalResult.emittedClaimIds.includes(claim.claimId),
    'Claim is not bound to the exact matched business source rule');
  const expected = rule.inputs.filter(i => i.source === 'interpretation_claim').map(i => {
    guard(i.required && i.source === 'interpretation_claim' &&
      i.cardinality === 'exactly_one', 'nonexact upstream T5');
    return i.pathOrClaimType;
  }).sort();
  const actual = upstream.map(c => c!.claimType).sort();
  const expectedFacts = rule.inputs.filter(i => i.source !== 'interpretation_claim')
    .map(i => i.pathOrClaimType).sort();
  guard(expected.length >= 2 && expected.length <= 3 &&
    JSON.stringify(expected) === JSON.stringify(actual) &&
    JSON.stringify(expectedFacts) === JSON.stringify([...claim.factRefs].sort()) &&
    rule.sourceRefs.length === claim.sourceRefs.length &&
    rule.sourceRefs.every(x => claim.sourceRefs.includes(x.sourceId)) &&
    claim.sourceRefs.every(id => registry.sources.some(x => x.sourceId === id)),
    'not exactly source-bound to Business T5 family and method inputs');
  const locations = positions(snapshot, value.channel as Channel, value.families as string[]);
  // Explain which *observed canonical fact* supports each upstream T5 family.
  // The existing T8 rule owns the conclusion; presentation may not infer a new one.
  const evidenceByFamily = (value.families as string[]).map(family => {
    const found = locations.filter(location => location.family === family);
    guard(found.length > 0 && EVIDENCE_ROLES[family] !== undefined,
      'missing actually observed Ten-God family for narrative');
    return `${EVIDENCE_ROLES[family]}: ${found.map(location => location.display).join(' · ')}`;
  });
  const channelName = value.channel === 'visible_stems' ? '천간' : value.channel === 'branches' ? '지지 대표 십신' : '지장간';
  const headline = textFor(claim.claimType,'headline');
  const hidden = snapshot.derivedFacts.hiddenStems?.month;
  const stems = snapshot.derivedFacts.tenGods;
  const anchors = monthFood && hidden?.status === 'resolved' && stems.status === 'resolved'
    ? hidden.value.flatMap((stem, index) => {
        const slots = (['year', 'month', 'hour'] as const).filter(slot => {
          const pillar = snapshot.pillars[slot];
          const god = stems.value[slot].stem;
          return pillar.status === 'resolved' && pillar.value.stem.value === stem &&
            god?.status === 'resolved' && god.value === '식신';
        });
        return slots.length ? [{
          display: `월지 지장간 ${stem}(식신)과 ${slots.map(slot => SLOT_NAMES[slot] + ' 천간').join('·')}의 일치`,
          factPath: `derivedFacts.hiddenStems.month.value.${index}`,
        }] : [];
      })
    : [];
  guard(!monthFood || anchors.length > 0, 'month Food God claim must retain the matched hidden stem');
  const paragraph = monthFood
    ? `${anchors.map(anchor => anchor.display).join(' · ')}가 확인됩니다. ${evidenceByFamily.join(' / ')}. ${textFor(claim.claimType,'summary')}`
    : `이 원국에서 확인된 근거는 ${evidenceByFamily.join(' / ')}입니다. 같은 ${channelName}에서 ${evidenceByFamily.length}개 십신 계열이 함께 확인되므로 ${describeQuotedReadingAxis(headline)} 구조적 관점으로 연결해 읽습니다. ${textFor(claim.claimType,'summary')}`;
  return {
    claimType: claim.claimType,
    pattern: value.pattern,
    axis: value.axis as Axis,
    channel: value.channel as Channel,
    families: [...(value.families as Family[])],
    headline: textFor(claim.claimType,'headline'),
    paragraph,
    upstreamClaimIds: [...claim.upstreamClaimRefs],
    sourceIds: [...claim.sourceRefs],
    ruleId: rule.ruleId,
    observedPositions: [...locations, ...anchors].map(x => x.display),
    observedFactPaths: [...locations, ...anchors].map(x => x.factPath),
  };
}
const BUSINESS_MEANING_ORDER: readonly BusinessMeaningArea[] = [
  'production_proposal', 'exchange_resource', 'operations_responsibility',
  'preparation_execution', 'initiative_collaboration', 'sustainability',
];
const BUSINESS_MEANING_LABEL: Readonly<Record<BusinessMeaningArea, string>> = {
  production_proposal: '산출·제안', exchange_resource: '교환·자원',
  operations_responsibility: '운영·책임', preparation_execution: '준비·실행',
  initiative_collaboration: '주도·협업', sustainability: '지속 조건',
};

function requiredBusinessMeaningAreas(snapshot: CanonicalSajuSnapshot, execution: InterpretationExecutionResult): BusinessMeaningArea[] {
  const byChannel = new Map<Channel, Set<Family>>([
    ['visible_stems', new Set()], ['branches', new Set()], ['hidden_stems', new Set()],
  ]);
  for (const claim of execution.claims) {
    if (claim.state !== 'active' || claim.taxonomy.tier !== 'T5' || claim.snapshotId !== snapshot.snapshotId || claim.sourceRefs.length === 0) continue;
    const match = /^TEN_GOD_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES|HIDDEN_STEMS)_THEME$/u.exec(claim.claimType);
    if (match) byChannel.get(match[2]!.toLowerCase() as Channel)?.add(match[1]!.toLowerCase() as Family);
  }
  const required = new Set<BusinessMeaningArea>();
  for (const families of byChannel.values()) {
    if (families.size < 2) continue;
    if (families.has('output')) required.add('production_proposal');
    if (families.has('wealth')) required.add('exchange_resource');
    if (families.has('officer')) required.add('operations_responsibility');
    if (families.has('resource')) required.add('preparation_execution');
    if (families.has('peer')) required.add('initiative_collaboration');
    if (families.has('resource') && (families.has('wealth') || families.has('officer'))) required.add('sustainability');
  }
  return BUSINESS_MEANING_ORDER.filter((area) => required.has(area));
}

function businessMeaningAreasForSection(section: BusinessNatalMultifactorSection): BusinessMeaningArea[] {
  const families = new Set(section.families);
  if (families.size < 2) return [];
  const areas = new Set<BusinessMeaningArea>();
  if (families.has('output')) areas.add('production_proposal');
  if (families.has('wealth')) areas.add('exchange_resource');
  if (families.has('officer')) areas.add('operations_responsibility');
  if (families.has('resource')) areas.add('preparation_execution');
  if (families.has('peer')) areas.add('initiative_collaboration');
  if (families.has('resource') && (families.has('wealth') || families.has('officer'))) areas.add('sustainability');
  return BUSINESS_MEANING_ORDER.filter((area) => areas.has(area));
}

function buildBusinessMeaningCoverage(required: readonly BusinessMeaningArea[], sections: readonly BusinessNatalMultifactorSection[]): BusinessMeaningCoverage {
  const coveredSet = new Set(sections.flatMap(businessMeaningAreasForSection));
  return {
    required: [...required],
    covered: BUSINESS_MEANING_ORDER.filter((area) => coveredSet.has(area)),
    missing: required.filter((area) => !coveredSet.has(area)),
  };
}

function selectBusinessMeaningSections(anchor: BusinessNatalMultifactorSection, candidates: readonly BusinessNatalMultifactorSection[], required: readonly BusinessMeaningArea[]) {
  const selected = [anchor];
  const remaining = candidates.filter((section) => section.claimType !== anchor.claimType);
  const usedPaths = new Set(anchor.observedFactPaths);
  const usedAreas = new Set(businessMeaningAreasForSection(anchor));
  let overlapOnlyCount = 0;
  while (required.some((area) => !usedAreas.has(area))) {
    const ranked = remaining.map((section) => ({
      section,
      newAreas: businessMeaningAreasForSection(section).filter((area) => required.includes(area) && !usedAreas.has(area)),
      newPaths: section.observedFactPaths.filter((path) => !usedPaths.has(path)),
    })).filter((item) => item.newAreas.length > 0 && item.newPaths.length > 0).sort((left, right) =>
      right.newAreas.length - left.newAreas.length || right.newPaths.length - left.newPaths.length ||
      AXES.indexOf(left.section.axis) - AXES.indexOf(right.section.axis) ||
      (left.section.channel === right.section.channel ? 0 : left.section.channel === 'visible_stems' ? -1 : left.section.channel === 'branches' ? 0 : 1),
    );
    const next = ranked[0];
    if (!next) {
      overlapOnlyCount += remaining.filter((section) => businessMeaningAreasForSection(section).some((area) => required.includes(area) && !usedAreas.has(area))).length;
      break;
    }
    selected.push(next.section);
    next.newPaths.forEach((path) => usedPaths.add(path));
    next.newAreas.forEach((area) => usedAreas.add(area));
    const index = remaining.findIndex((section) => section.claimType === next.section.claimType);
    if (index >= 0) remaining.splice(index, 1);
  }
  return { sections: selected, overlapOnlyCount };
}
/**
 * Product-readable arrangement of EXISTING selected, research-only Business
 * T8 headings and observed Canonical positions. It cannot predict startup
 * success, revenues, management skill or future business events.
 */
function buildBusinessNatalReadingGuide(
  core: BusinessNatalMultifactorSection | undefined,
  supports: readonly BusinessNatalMultifactorSection[],
  state: Status,
  meaningCoverage: BusinessMeaningCoverage,
): BusinessNatalReadingGuide | undefined {
  if (core === undefined || core.axis === 'coordination') return undefined;
  guard(core.sourceIds.length > 0 && core.upstreamClaimIds.length >= 2 &&
    core.observedFactPaths.length >= 2 &&
    core.observedFactPaths.length === core.observedPositions.length,
    'Business reading guide requires exact qualified source evidence');

  const usedPaths = new Set(core.observedFactPaths);
  const supporting = supports.map(section => {
    guard(section.sourceIds.length > 0 && section.upstreamClaimIds.length >= 2 &&
      section.observedFactPaths.length === section.observedPositions.length,
      'Business supporting interpretation has no exact source evidence');
    const newFacts = section.observedFactPaths.flatMap((path, index) => {
      if (usedPaths.has(path)) return [];
      const position = section.observedPositions[index];
      guard(position !== undefined && position.trim().length > 0,
        'Business supporting observation has no position');
      usedPaths.add(path);
      return [{ path, position }];
    });
    guard(newFacts.length > 0, 'Business support cannot repeat the same calculated facts');
    return {
      claimType: section.claimType,
      distinctObservedFactPaths: newFacts.map(value => value.path),
      distinctObservedPositions: newFacts.map(value => value.position),
    };
  });

  const paragraphs = [
    `사업이라는 주제에서 이 명식의 중심 구조적 관점은 ‘${core.headline}’입니다. 이 표현은 ${core.observedPositions.join(' · ')}에서 실제 관측된 기존 십신 근거에 연결된 연구 후보입니다.`,
    ...supports.map((section, index) =>
      `또 다른 관점인 ‘${section.headline}’은 기존 관찰과 다른 ${supporting[index]!.distinctObservedPositions.join(' · ')}의 계산 사실을 추가해 구별합니다.`),
    ...(state === 'complete'
      ? ['적용 가능한 핵심 의미 영역인 ' + meaningCoverage.covered.map((area) => BUSINESS_MEANING_LABEL[area]).join('·') + '을 실제 명식 근거로 연결했습니다. 이것은 창업 적성·매출·사업 성공이나 실패를 판정하지 않습니다.']
      : ['확인된 핵심 의미 영역은 ' + (meaningCoverage.covered.map((area) => BUSINESS_MEANING_LABEL[area]).join('·') || '없음') + '이며, 연결되지 않은 영역은 별도로 표시합니다.']),
  ];
  return {
    title: '이 명식의 사업·실행 중심과 보조 관점',
    paragraph: paragraphs.join(' '),
    coreClaimType: core.claimType,
    supporting,
  };
}

export function buildBusinessNatalMultifactorReport(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
): BusinessNatalMultifactorReport {
  guard(execution.run.snapshotId === snapshot.snapshotId &&
    execution.run.snapshotHash === snapshot.calculationHash &&
    execution.run.registrySnapshotId === registry.snapshot.registrySnapshotId &&
    execution.run.packRef.id === registry.pack.packId &&
    execution.run.packRef.version === registry.pack.version &&
    execution.integrity.valid && execution.run.status !== 'failed' &&
    registry.pack.packId === BUSINESS_NATAL_MULTIFACTOR_PACK.packId &&
    registry.pack.version === BUSINESS_NATAL_MULTIFACTOR_PACK.version &&
    registry.pack.status === 'research', 'wrong chart, integrity or pack authority');
  const selection = buildReadingCompositionEvidence(snapshot, execution, registry, {
    requestId: 'business-natal-multifactor-preview',
    intent: { domain: 'business', temporalScope: 'natal' },
  });
  const selected = new Set(selection.evidence?.bundle.claims.map(c => c.claimId) ?? []);
  const claims = execution.claims.filter(c =>
    c.taxonomy.tier === 'T8' && c.taxonomy.category === 'business' &&
    c.predicate === 'business_multifactor_structure' &&
    c.state === 'active' && c.snapshotId === snapshot.snapshotId);
  // Select only registered Business T8 claims through the existing reading profile.
  // Do not synthesize evidence for absent patterns or missing birth-hour cases.
  guard(selection.selection.coverageState !== 'unsupported_intent' &&
    claims.every(c => selected.has(c.claimId)) &&
    (claims.length === 0 || selection.evidence !== undefined),
    'Business meaning not selected by existing ReadingIntent/EvidenceSelector');
  // Visible/branch T5 still requires resolved whole-chart Ten-Gods.
  // Shared hidden-stem T5 remains usable for resolved year/month/day when hour is unknown.
  const result = claims
    .map((claim) => toSection(claim, snapshot, execution, registry))
    .sort((a, b) =>
      AXES.indexOf(a.axis) - AXES.indexOf(b.axis) ||
      (a.channel === b.channel ? 0 : a.channel === 'visible_stems' ? -1 : a.channel === 'branches' ? 0 : 1),
    );
  const core = result.find((section) => section.axis === 'core') ??
    result.find((section) => section.axis === 'execution') ??
    result.find((section) => section.axis === 'governance') ??
    result.find((section) => section.axis === 'preparation');
  const coordination = result.find((section) => section.axis === 'coordination');
  const requiredAreas = requiredBusinessMeaningAreas(snapshot, execution);
  const anchor = core ?? coordination;
  const supportSelection = anchor
    ? selectBusinessMeaningSections(anchor, result, requiredAreas)
    : undefined;
  const chosen: BusinessNatalMultifactorSection[] = supportSelection?.sections ?? [];
  const meaningCoverage = buildBusinessMeaningCoverage(requiredAreas, chosen);
  const missing: string[] = [];
  if (!core) missing.push('출처 있는 원국 중심 복합 해석 축');
  if (!core && chosen.length > 0) {
    missing.push('중심 해석 근거가 없어 실제 확인된 조율 관점만 부분적으로 보여줍니다. 전체 사업운 종합으로 확장할 수 없습니다.');
  }
  if (requiredAreas.length === 0) {
    missing.push('같은 관측 채널에서 두 개 이상의 사업 관련 십신 계열을 연결하는 근거가 확인되지 않았습니다.');
  }
  if (meaningCoverage.missing.length > 0) {
    missing.push(
      '명식에서 확인된 사업 핵심 영역 중 ' +
        meaningCoverage.missing.map((area) => BUSINESS_MEANING_LABEL[area]).join('·') +
        ' 근거가 선택된 풀이에 연결되지 않았습니다.',
    );
  }
  if (supportSelection && supportSelection.overlapOnlyCount > 0 && meaningCoverage.missing.length > 0) {
    missing.push('추가 해석 후보가 기존 문단과 같은 계산 위치를 반복하여 독립 근거로 선택되지 않았습니다.');
  }
  const hasRequiredMeaning = requiredAreas.length > 0 && meaningCoverage.missing.length === 0;
  const state: Status = snapshot.completeness.birthTimeKnown &&
    core !== undefined && hasRequiredMeaning
    ? 'complete' : result.length ? 'partial' : 'insufficient';
  const sections: readonly BusinessNatalMultifactorSection[] = chosen;
  const readingGuide = buildBusinessNatalReadingGuide(
    core,
    core === undefined ? [] : chosen.filter((section) => section.claimType !== core.claimType),
    state,
    meaningCoverage,
  );
  if (!snapshot.completeness.birthTimeKnown) {
    missing.unshift(
      result.some((section) => section.channel === 'hidden_stems')
        ? '출생시각 미상: 시주 근거는 제외하고 확정된 연주·월주·일주 지장간에서 확인된 사업 해석만 부분 반영합니다.'
        : '출생시각 미상: 시주가 필요한 천간·지지 대표 십신 근거가 미확정이므로 다중 근거 사업 해석은 보류합니다.',
    );
  }
  return {
    snapshotId: snapshot.snapshotId,
    wholeChart: buildSelectedWholeChartNatalReading(
      snapshot, 'business', execution, registry,
    ),
    calculationHash: snapshot.calculationHash,
    version: BUSINESS_NATAL_MULTIFACTOR_REPORT_VERSION,
    state,
    title: '나의 사업·실행 주제를 읽는 구조적 출발점',
    introduction: '실제 명식의 십신 관계를 바탕으로 산출과 실행, 운영 기준, 준비와 협업의 관계를 함께 살펴봅니다. 창업 적성이나 사업 성과를 예측하는 판정이 아닌 전통 명리 연구 후보입니다.' +
      (snapshot.completeness.birthTimeKnown ? '' : ' ' + unknownHourCalculatedContext(snapshot)),
    sections,
    meaningCoverage,
    ...(readingGuide === undefined ? {} : { readingGuide }),
    missing,
    limitations: [...LIMITATIONS, ...(state === 'complete' ? [] :
      ['서로 구별되는 근거가 아직 부족하여 전체 해석의 완성으로 표시하지 않습니다.'])],
    researchOnly: true, mayPublish: false, maySell: false, usefulComplete: false,
  };
}
