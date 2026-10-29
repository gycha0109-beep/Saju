import { describeQuotedReadingAxis } from './korean-reading-headline.js';
import { selectSourceBoundNatalCore } from './natal-independent-supporting-axes.js';
import { selectOverlappingNatalT8Perspectives } from './natal-overlapping-t8-perspectives.js';
import type { CanonicalSajuSnapshot, PillarSlot } from '../contracts/calculation.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import { deterministicContentHash, type ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { buildReadingCompositionEvidence } from '../reading/reading-intent-composition.js';
import {
  BUSINESS_NATAL_MULTIFACTOR_PACK,
  BUSINESS_NATAL_MULTIFACTOR_NARRATIVES,
} from '../research/business-natal-multifactor-candidate.js';

export const BUSINESS_NATAL_MULTIFACTOR_REPORT_VERSION = '0.4.0-research-preview' as const;
type Axis = 'core' | 'execution' | 'governance' | 'preparation' | 'coordination';
type Status = 'complete' | 'partial' | 'insufficient';
type Channel = 'visible_stems' | 'branches';
export interface BusinessNatalMultifactorSection {
  claimType: string;
  pattern: string;
  axis: Axis;
  channel: Channel;
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
  /** Original source-issued preferred core if a different eligible T8 core yields
   * genuinely independent observed support; never counted as a fourth MUR axis. */
  displacedOriginalCore?: BusinessNatalMultifactorSection;
  readingGuide?: BusinessNatalReadingGuide;
  /** Other already-emitted T8 meanings reusing the selected evidence.
   * Readable nuance only; NEVER independent MUR support or new relationship outcome. */
  overlappingPerspectives?: readonly (BusinessNatalMultifactorSection & {
    overlapsSelectedFactPaths: readonly string[];
  })[];
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
const AXIS_NAMES: Readonly<Record<Axis, string>> = {
  'core': '전체 구조',
  'execution': '실행',
  'governance': '운영 기준',
  'preparation': '준비',
  'coordination': '조율'
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
    '사업에 관한 개인별 다중 근거 T8 해석을 뜻하지 않습니다.';
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
function positions(snapshot: CanonicalSajuSnapshot, channel: Channel, families: readonly string[]) {
  const fact = snapshot.derivedFacts.tenGods;
  guard(fact.status === 'resolved' && families.length >= 2 &&
    families.length <= 3 && new Set(families).size === families.length &&
    families.every(f => FAMILIES[f] !== undefined),
    'unresolved or unsupported exact chart input');
  const slots: readonly PillarSlot[] = channel === 'visible_stems'
    ? ['year','month','hour'] : ['year','month','day','hour'];
  const key = channel === 'visible_stems' ? 'stem' : 'branch';
  const result = slots.flatMap(slot => {
    const v = fact.value[slot][key];
    if(v?.status !== 'resolved') return [];
    const family = families.find(x => FAMILIES[x]!.includes(v.value));
    if(!family) return [];
    return [{
      family,
      display: `${SLOT_NAMES[slot]} ${key === 'stem' ? '천간' : '지지 대표 십신'} ${v.value}`,
      factPath: `derivedFacts.tenGods.value.${slot}.${key}.value`,
    }];
  });
  guard(families.every(f => result.some(x => x.family === f)),
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
    (value.channel === 'visible_stems' || value.channel === 'branches') &&
    Array.isArray(value.families) &&
    value.realLifeOutcomeAuthorized === false && value.futureTimingAuthorized === false &&
    value.healthOrMoneyOutcomeAuthorized === false && value.numericScoringAuthorized === false,
    'invalid or overclaiming structured T8 meaning');
  const upstream = claim.upstreamClaimRefs.map(id => execution.claims.find(c => c.claimId === id));
  guard(claim.scenarioRef === undefined && claim.methodologyRef.id ===
    'M-BUSINESS-NATAL-MULTIFACTOR-EXECUTION-GOVERNANCE-V1' &&
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
  const expected = rule.inputs.map(i => {
    guard(i.required && i.source === 'interpretation_claim' &&
      i.cardinality === 'exactly_one', 'nonexact upstream T5');
    return i.pathOrClaimType;
  }).sort();
  const actual = upstream.map(c => c!.claimType).sort();
  guard(expected.length >= 2 && expected.length <= 3 &&
    JSON.stringify(expected) === JSON.stringify(actual) &&
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
  const channelName = value.channel === 'visible_stems' ? '천간' : '지지 대표 십신';
  const headline = textFor(claim.claimType,'headline');
  return {
    claimType: claim.claimType,
    pattern: value.pattern,
    axis: value.axis as Axis,
    channel: value.channel as Channel,
    headline: textFor(claim.claimType,'headline'),
    paragraph: `이 원국에서 확인된 근거는 ${evidenceByFamily.join(' / ')}입니다. 같은 ${channelName}에서 ${evidenceByFamily.length}개 십신 계열이 함께 확인되므로 ${describeQuotedReadingAxis(headline)} 구조적 관점으로 연결해 읽습니다. ${textFor(claim.claimType,'summary')}`,
    upstreamClaimIds: [...claim.upstreamClaimRefs],
    sourceIds: [...claim.sourceRefs],
    ruleId: rule.ruleId,
    observedPositions: locations.map(x => x.display),
    observedFactPaths: locations.map(x => x.factPath),
  };
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
      ? ['서로 다른 구조적 관점 세 가지를 확인했지만, 이것은 창업 적성·매출·사업 성공이나 실패를 판정하지 않습니다.']
      : [`이 명식에서 독립적으로 설명할 수 있는 보조 관점은 ${supporting.length}개뿐이어서, 사업운 전체 종합 설명은 보류합니다.`]),
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
  // Canonical tenGods is unavailable with unknown birth time. Do not
  // promote a scenario-based Claim into a complete person-level reading.
  const result = snapshot.completeness.birthTimeKnown
    ? claims.map(c => toSection(c, snapshot, execution, registry))
        .sort((a,b) => AXES.indexOf(a.axis)-AXES.indexOf(b.axis) ||
          (a.channel === b.channel ? 0 : a.channel === 'visible_stems' ? -1 : 1))
    : [];
  // Prefer the 3-input core. When not observed, a narrower two-input core can
  // still be rendered, but completion needs two OTHER independently grounded axes.
  const coreChoice = selectSourceBoundNatalCore(result, ['core', 'execution', 'governance', 'preparation']);
  const core = coreChoice.core;
  const supportSelection = coreChoice.supports;
  // A genuine source-bound coordination-only observation is visible as a PARTIAL
  // reading, never promoted to a MUR core or a consumer product completion.

  const chosen: BusinessNatalMultifactorSection[] = core
    ? [core, ...(supportSelection?.supporting ?? [])]
    : result.filter(section => section.axis === 'coordination').slice(0, 1);
  const missing: string[] = [];
  if(!core) missing.push('출처 있는 원국 중심 복합 해석 축');
  if(!core && chosen.length > 0) missing.push('중심 해석 근거가 없어 실제 확인된 조율 관점만 부분적으로 보여줍니다. 전체 사업운 종합으로 확장할 수 없습니다.');
  if (supportSelection && supportSelection.overlapOnlyCount > 0 && chosen.length < 3) {
    missing.push('서로 다른 해석 축이어도 기존 해석과 같은 계산 위치만 반복하면 독립적인 보조 근거로 인정하지 않습니다.');
  }
  if(chosen.length < 3) {
    const observed = chosen.map(s => `${AXIS_NAMES[s.axis]}(${s.channel === 'visible_stems' ? '천간' : '지지'})`);
    missing.push(`이 명식에서 확인된 해석 축: ${observed.length ? observed.join(' · ') : '없음'}. 최소 유효 풀이에는 독립된 근거의 추가 해석 축 ${3 - chosen.length}개가 더 필요합니다.`);
  }
  const state: Status = snapshot.completeness.birthTimeKnown &&
    core !== undefined && chosen.length === 3
    ? 'complete' : result.length ? 'partial' : 'insufficient';
  const sections: readonly BusinessNatalMultifactorSection[] = chosen;
  const overlappingPerspectives = state === 'partial' && core !== undefined
    ? selectOverlappingNatalT8Perspectives(chosen, result)
    : [];
  const readingGuide = buildBusinessNatalReadingGuide(
    core, core === undefined ? [] : chosen.slice(1), state,
  );
  if(!snapshot.completeness.birthTimeKnown) {
    missing.unshift('출생시각 미상: 이 계산 정책에서 십신(T5) 전체가 미확정이므로 사업의 다중 근거 T8 해석은 보류합니다.');
  }
  return {
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    version: BUSINESS_NATAL_MULTIFACTOR_REPORT_VERSION,
    state,
    title: '나의 사업·실행 주제를 읽는 구조적 출발점',
    introduction: '실제 명식의 십신 관계를 바탕으로 산출과 실행, 운영 기준, 준비와 협업의 관계를 함께 살펴봅니다. 창업 적성이나 사업 성과를 예측하는 판정이 아닌 전통 명리 연구 후보입니다.' +
      (snapshot.completeness.birthTimeKnown ? '' : ' ' + unknownHourCalculatedContext(snapshot)),
    sections,
    ...(coreChoice.displacedCore === undefined ? {} : {
      displacedOriginalCore: coreChoice.displacedCore,
    }),
    ...(readingGuide === undefined ? {} : { readingGuide }),
    ...(overlappingPerspectives.length === 0 ? {} : { overlappingPerspectives }),
    missing,
    limitations: [...LIMITATIONS, ...(state === 'complete' ? [] :
      ['서로 구별되는 근거가 아직 부족하여 전체 해석의 완성으로 표시하지 않습니다.'])],
    researchOnly: true, mayPublish: false, maySell: false, usefulComplete: false,
  };
}
