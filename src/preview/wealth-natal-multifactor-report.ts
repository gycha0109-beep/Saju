import { describeQuotedReadingAxis } from './korean-reading-headline.js';
import { selectIndependentNatalSupportingAxes } from './natal-independent-supporting-axes.js';
import type { CanonicalSajuSnapshot, PillarSlot } from '../contracts/calculation.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import { deterministicContentHash, type ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { buildReadingCompositionEvidence } from '../reading/reading-intent-composition.js';
import {
  WEALTH_NATAL_MULTIFACTOR_PACK,
  WEALTH_NATAL_MULTIFACTOR_NARRATIVES,
} from '../research/wealth-natal-multifactor-candidate.js';

export const WEALTH_NATAL_MULTIFACTOR_REPORT_VERSION = '0.3.0-research-preview' as const;
type Axis = 'core' | 'creation' | 'management' | 'planning' | 'tension' | 'context';
type Status = 'complete' | 'partial' | 'insufficient';
type Channel = 'visible_stems' | 'branches';
export interface WealthNatalMultifactorSection {
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
/** Existing source-qualified T5 observations, NOT a Wealth T8 synthesis. */
export interface WealthNatalAvailableThemeContext {
  title: string;
  paragraph: string;
  wealthConclusionAuthorized: false;
  themes: readonly {
    claimId: string;
    claimType: string;
    channel: Channel;
    family: string;
    headline: string;
    summary: string;
    sourceIds: readonly string[];
    observedPositions: readonly string[];
    observedFactPaths: readonly string[];
  }[];
}
export interface WealthNatalReadingGuide {
  title: string;
  paragraph: string;
  coreClaimType: string;
  supporting: readonly {
    claimType: string;
    distinctObservedFactPaths: readonly string[];
    distinctObservedPositions: readonly string[];
  }[];
}
export interface WealthNatalMultifactorReport {
  snapshotId: string;
  calculationHash: string;
  version: typeof WEALTH_NATAL_MULTIFACTOR_REPORT_VERSION;
  state: Status;
  title: string;
  introduction: string;
  sections: readonly WealthNatalMultifactorSection[];
  readingGuide?: WealthNatalReadingGuide;
  availableThemeContext?: WealthNatalAvailableThemeContext;
  missing: readonly string[];
  limitations: readonly string[];
  researchOnly: true;
  mayPublish: false;
  maySell: false;
  usefulComplete: false;
}
const AXES: readonly Axis[] = ['core', 'creation', 'management', 'planning', 'tension', 'context'];
const SLOT_NAMES: Readonly<Record<PillarSlot, string>> = {
  year: '연주', month: '월주', day: '일주', hour: '시주',
};
const FAMILIES: Readonly<Record<string, readonly string[]>> = {
  peer: ['비견','겁재'], resource: ['정인','편인'], output: ['식신','상관'],
  wealth: ['정재','편재'], officer: ['정관','편관'],
};
// Reader-facing meanings are limited labels for the actually observed T5 families.
// They do not infer dominance, personal conduct, future events or financial outcomes.
const EVIDENCE_ROLES: Readonly<Record<string, string>> = {
  peer: '비겁(자기 기준·공유 관점)',
  resource: '인성(준비·수용)',
  output: '식상(산출·표현)',
  wealth: '재성(현실 자원·교환)',
  officer: '관성(관리·책임 기준)',
};
const LIMITATIONS = [
  '전통 문헌의 제한된 구조 관계를 이용한 미검토 연구 풀이입니다. 실제 삶의 성격·사건을 판정하지 않습니다.',
  '소득, 자산 규모, 투자 수익, 소비 습관이나 미래 재물 사건을 예측하지 않습니다.',
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
    '재물의 많고 적음이나 다중 근거 T8 풀이를 뜻하지 않습니다.';
}

function guard(v: unknown, message: string): asserts v {
  if (!v) throw new TypeError('Wealth multifactor: ' + message);
}
/**
 * Explain an insufficient *existing* Wealth reading using the already emitted
 * same-chart T5 themes, without converting those themes to new T8 meanings.
 * This is a coverage explanation, never a substitute for a Wealth section.
 */
function explainMissingWealthT8(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
): string | undefined {
  if (!snapshot.completeness.birthTimeKnown) return undefined;
  const activeFamilies = new Map<Channel, Set<string>>([
    ['visible_stems', new Set<string>()],
    ['branches', new Set<string>()],
  ]);
  const names: Readonly<Record<string, string>> = {
    peer: '비겁',
    resource: '인성',
    output: '식상',
    wealth: '재성',
    officer: '관성',
  };
  const types: readonly string[] = ['peer', 'resource', 'output', 'wealth', 'officer'];
  for (const claim of execution.claims) {
    if (claim.state !== 'active' || claim.taxonomy.tier !== 'T5' ||
        claim.snapshotId !== snapshot.snapshotId || claim.sourceRefs.length === 0) continue;
    const match = /^TEN_GOD_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u
      .exec(claim.claimType);
    if (!match) continue;
    const family = match[1]!.toLowerCase();
    const channel = match[2]!.toLowerCase() as Channel;
    activeFamilies.get(channel)!.add(family);
  }

  const observed = ([
    ['visible_stems', '천간'],
    ['branches', '지지 대표 십신'],
  ] as const).flatMap(([channel, label]) => {
    const observedTypes = types.filter(family => activeFamilies.get(channel)?.has(family));
    return observedTypes.length
      ? [label + ': ' + observedTypes.map(family => names[family]).join('·')]
      : [];
  });
  const sourceNote = observed.length
    ? '현재 실제로 확인된 출처 연결 십신 관점은 ' + observed.join(' / ') + '입니다. '
    : '현재 적용 가능한 출처 연결 십신 관점이 확인되지 않습니다. ';
  const hasWealth = activeFamilies.get('visible_stems')!.has('wealth') ||
    activeFamilies.get('branches')!.has('wealth');
  const reason = hasWealth
    ? '재성 관련 십신 관점은 있지만 기존 재물 종합 규칙이 요구하는 같은 관측 범위 안의 다른 십신 계열과 결합되지 않아, 출처가 있는 재물 종합 결론을 만들 수 없습니다. '
    : '기존 십신 관점 규칙에서 재성 계열의 활성 근거가 확인되지 않아, 등록된 재물 복합 해석 규칙을 적용할 수 없습니다. ';
  return sourceNote + reason +
    '이는 재성이 없거나 돈이 없다는 판정이 아니며, 실제 소득·재산·재물운의 좋고 나쁨을 뜻하지 않습니다.';
}

/**
 * Preserve the actual, individually sourced upstream T5 meanings when no
 * authorized Wealth T8 paragraph exists. This is an observation aid, not a
 * new Wealth claim or a workaround for the EvidenceSelector.
 */
function buildAvailableThemeContext(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
): WealthNatalAvailableThemeContext | undefined {
  const tenGodFact = snapshot.derivedFacts.tenGods;
  if (!snapshot.completeness.birthTimeKnown || tenGodFact.status !== 'resolved') return undefined;
  const themes: WealthNatalAvailableThemeContext['themes'][number][] = [];
  const claims = execution.claims.filter(c => c.state === 'active' &&
    c.snapshotId === snapshot.snapshotId && c.scenarioRef === undefined &&
    c.taxonomy.tier === 'T5' && c.predicate === 'ten_god_theme' &&
    c.sourceRefs.length > 0)
    .sort((a, b) => a.claimType.localeCompare(b.claimType));
  for (const claim of claims) {
    const match = /^TEN_GOD_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u
      .exec(claim.claimType);
    if (!match) continue;
    const family = match[1]!.toLowerCase();
    const channel = match[2]!.toLowerCase() as Channel;
    const value = claim.value as Record<string, unknown>;
    guard(value.family === family && value.channel === channel &&
      value.fortunePolarity === 'not_determined' &&
      value.dominance === 'not_scored' &&
      typeof value.headline === 'string' && value.headline.length > 0 &&
      typeof value.summary === 'string' && value.summary.length > 0,
      'T5 source theme is not a bounded same-chart observation');
    const key = channel === 'visible_stems' ? 'stem' : 'branch';
    const slots: readonly PillarSlot[] = channel === 'visible_stems'
      ? ['year', 'month', 'hour'] : ['year', 'month', 'day', 'hour'];
    const observations = slots.flatMap(slot => {
      const tenGod = tenGodFact.value[slot][key];
      if (tenGod?.status !== 'resolved' ||
          !FAMILIES[family]?.includes(tenGod.value)) return [];
      return [{
        display: `${SLOT_NAMES[slot]} ${channel === 'visible_stems' ? '천간' : '지지 대표 십신'} ${tenGod.value}`,
        factPath: `derivedFacts.tenGods.value.${slot}.${key}.value`,
      }];
    });
    guard(observations.length > 0, 'T5 theme has no actual supporting chart position');
    themes.push({
      claimId: claim.claimId,
      claimType: claim.claimType,
      channel,
      family,
      headline: value.headline,
      summary: value.summary,
      sourceIds: [...claim.sourceRefs],
      observedPositions: observations.map(x => x.display),
      observedFactPaths: observations.map(x => x.factPath),
    });
  }
  if (!themes.length) return undefined;
  const sorted = themes.sort((a,b) =>
    (a.family === 'wealth' ? -1 : 0) - (b.family === 'wealth' ? -1 : 0) ||
    (a.channel === 'visible_stems' ? -1 : 0) -
      (b.channel === 'visible_stems' ? -1 : 0) ||
    a.family.localeCompare(b.family));
  const paragraphs = sorted.map(theme =>
    `‘${theme.headline}’ — ${theme.observedPositions.join(' · ')}에서 확인됐습니다. ${theme.summary}`);
  return {
    title: '재물 종합 결론 이전에 확인된 원국의 십신 주제',
    paragraph: '아래는 기존 출처와 연결된 십신별 구조 설명입니다. ' +
      paragraphs.join(' ') +
      ' 이 관측들은 현재 등록된 재물 분야의 복합 해석 근거를 충족하지 못했습니다. ' +
      '따라서 재물의 많고 적음, 소득, 투자 성과, 향후 재물운을 판단하는 해석으로 읽어서는 안 됩니다.',
    wealthConclusionAuthorized: false,
    themes: sorted,
  };
}

function textFor(claimType: string, key: 'headline'|'summary') {
  const profile = WEALTH_NATAL_MULTIFACTOR_NARRATIVES.find(p => p.claimType === claimType);
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
): WealthNatalMultifactorSection {
  const value = claim.value as Record<string, unknown>;
  guard(value && typeof value === 'object' && typeof value.pattern === 'string' &&
    AXES.includes(value.axis as Axis) &&
    (value.channel === 'visible_stems' || value.channel === 'branches') &&
    Array.isArray(value.families) &&
    value.realLifeOutcomeAuthorized === false && value.futureTimingAuthorized === false &&
    value.healthOrMoneyOutcomeAuthorized === false && value.numericScoringAuthorized === false &&
    (value.axis !== 'context' || (value.directWealthReadingAuthorized === false &&
      !(value.families as string[]).includes('wealth'))),
    'invalid or overclaiming structured T8 meaning');
  const upstream = claim.upstreamClaimRefs.map(id => execution.claims.find(c => c.claimId === id));
  guard(claim.scenarioRef === undefined && claim.methodologyRef.id ===
    'M-WEALTH-NATAL-MULTIFACTOR-RESOURCE-CHOICE-V1' &&
    new Set(claim.upstreamClaimRefs).size === claim.upstreamClaimRefs.length &&
    upstream.every(c => c && c.state === 'active' && c.taxonomy.tier === 'T5' &&
      c.snapshotId === snapshot.snapshotId && c.scenarioRef === undefined),
    'T8 requires only exact same-chart active T5 Claims');
  const ref = claim.ruleRefs[0];
  const rule = registry.rules.find(r => r.ruleId === ref?.ruleId && r.version === ref?.version);
  const evalResult = execution.evaluations.find(e => e.evaluationId === ref?.evaluationId);
  guard(claim.ruleRefs.length === 1 && rule &&
    rule.taxonomy.tier === 'T8' && rule.taxonomy.category === 'wealth' &&
    rule.taxonomy.subcategory === 'multifactor_structure' &&
    rule.output.predicate === 'wealth_multifactor_structure' && rule.status === 'research' &&
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
    'Claim is not bound to the exact matched wealth source rule');
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
    'not exactly source-bound to Wealth T5 family and method inputs');
  const locations = positions(snapshot, value.channel as Channel, value.families as string[]);
  const observedByFamily = (value.families as string[]).map(family => {
    const actual = locations.filter(location => location.family === family);
    guard(actual.length > 0 && EVIDENCE_ROLES[family] !== undefined,
      'unobserved or unsupported Ten-God family in consumer explanation');
    return `${EVIDENCE_ROLES[family]}: ${actual.map(x => x.display).join(' · ')}`;
  });
  const observedChannel = value.channel === 'visible_stems' ? '천간' : '지지 대표 십신';
  const headline = textFor(claim.claimType, 'headline');
  return {
    claimType: claim.claimType,
    pattern: value.pattern,
    axis: value.axis as Axis,
    channel: value.channel as Channel,
    headline: textFor(claim.claimType,'headline'),
    paragraph: `이 원국에서 확인된 근거는 ${observedByFamily.join(' / ')}입니다. 같은 ${observedChannel}에서 관측된 서로 다른 십신 계열을 ${describeQuotedReadingAxis(headline)} 구조적 관점에서 함께 읽습니다. ${textFor(claim.claimType,'summary')}`,
    upstreamClaimIds: [...claim.upstreamClaimRefs],
    sourceIds: [...claim.sourceRefs],
    ruleId: rule.ruleId,
    observedPositions: locations.map(x => x.display),
    observedFactPaths: locations.map(x => x.factPath),
  };
}
/**
 * Reorganize only source-owned, selected Wealth T8 observations into a
 * readable first-screen explanation. Not a new Claim or wealth prediction.
 * Every supporting detail must contribute a previously unused exact T0 path.
 */
function buildWealthNatalReadingGuide(
  core: WealthNatalMultifactorSection | undefined,
  supports: readonly WealthNatalMultifactorSection[],
  state: Status,
): WealthNatalReadingGuide | undefined {
  if (core === undefined || core.axis === 'tension') return undefined;
  guard(core.sourceIds.length > 0 && core.upstreamClaimIds.length >= 2 &&
    core.observedFactPaths.length === core.observedPositions.length &&
    core.observedFactPaths.length >= 2,
    'Wealth guide core requires source-qualified chart observations');

  const usedPaths = new Set(core.observedFactPaths);
  const supporting = supports.map(section => {
    guard(section.sourceIds.length > 0 && section.upstreamClaimIds.length >= 2 &&
      section.observedFactPaths.length === section.observedPositions.length,
      'Wealth guide support requires its original T8 evidence');
    const newlyObserved = section.observedFactPaths.flatMap((path, index) => {
      if (usedPaths.has(path)) return [];
      const position = section.observedPositions[index];
      guard(position !== undefined && position.trim().length > 0,
        'Wealth supporting path has no observed position');
      usedPaths.add(path);
      return [{ path, position }];
    });
    guard(newlyObserved.length > 0, 'Wealth supporting axis repeats previous evidence');
    return {
      claimType: section.claimType,
      distinctObservedFactPaths: newlyObserved.map(item => item.path),
      distinctObservedPositions: newlyObserved.map(item => item.position),
    };
  });

  const paragraphs = [
    `이 명식에서 재물과 자원을 읽는 중심 구조적 관점은 ‘${core.headline}’입니다. ${core.observedPositions.join(' · ')}에서 관측된 근거와 연결된 연구용 해석 후보입니다.`,
    ...supports.map((section, index) =>
      `별도 관점인 ‘${section.headline}’은 ${supporting[index]!.distinctObservedPositions.join(' · ')}에서 추가로 확인된 계산 근거를 바탕으로 함께 살핍니다.`),
    ...(state === 'complete'
      ? ['중심 관점 하나와 독립적인 계산 근거를 더하는 보조 관점 두 가지를 구분해 읽을 수 있습니다. 다만 이 기준 충족은 실제 소득·재산·투자 성과의 판단이 아닙니다.']
      : [`독립적인 보조 관점은 현재 ${supporting.length}개만 확인되어 필요한 두 가지를 모두 설명하지 못합니다. 재물운 전체 종합 판단은 보류합니다.`]),
  ];
  return {
    title: '내 명식의 재물·자원 중심과 보조 관점',
    paragraph: paragraphs.join(' '),
    coreClaimType: core.claimType,
    supporting,
  };
}

export function buildWealthNatalMultifactorReport(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
): WealthNatalMultifactorReport {
  guard(execution.run.snapshotId === snapshot.snapshotId &&
    execution.run.snapshotHash === snapshot.calculationHash &&
    execution.run.registrySnapshotId === registry.snapshot.registrySnapshotId &&
    execution.run.packRef.id === registry.pack.packId &&
    execution.run.packRef.version === registry.pack.version &&
    execution.integrity.valid && execution.run.status !== 'failed' &&
    registry.pack.packId === WEALTH_NATAL_MULTIFACTOR_PACK.packId &&
    registry.pack.version === WEALTH_NATAL_MULTIFACTOR_PACK.version &&
    registry.pack.status === 'research', 'wrong chart, integrity or pack authority');
  const selection = buildReadingCompositionEvidence(snapshot, execution, registry, {
    requestId: 'wealth-natal-multifactor-preview',
    intent: { domain: 'wealth', temporalScope: 'natal' },
  });
  const selected = new Set(selection.evidence?.bundle.claims.map(c => c.claimId) ?? []);
  const claims = execution.claims.filter(c =>
    c.taxonomy.tier === 'T8' && c.taxonomy.category === 'wealth' &&
    c.predicate === 'wealth_multifactor_structure' &&
    c.state === 'active' && c.snapshotId === snapshot.snapshotId);
  // Select only registered Wealth T8 claims through the existing reading profile.
  // Do not synthesize evidence for absent patterns or missing birth-hour cases.
  guard(selection.selection.coverageState !== 'unsupported_intent' &&
    claims.every(c => selected.has(c.claimId)) &&
    (claims.length === 0 || selection.evidence !== undefined),
    'Wealth meaning not selected by existing ReadingIntent/EvidenceSelector');
  // Unknown birth hour makes the canonical Ten-God chart unavailable. The
  // existing T5/T8 engine cannot authorize a non-scenario composite Claim.
  // Do not project hypothetical partial meanings out of pillar observations.
  const result = snapshot.completeness.birthTimeKnown
    ? claims.map(c => toSection(c, snapshot, execution, registry))
        .sort((a,b) => AXES.indexOf(a.axis)-AXES.indexOf(b.axis) ||
          (a.channel === b.channel ? 0 : a.channel === 'visible_stems' ? -1 : 1))
    : [];
  // Prefer the 3-input core. When not observed, a narrower two-input core can
  // still be rendered, but completion needs two OTHER independently grounded axes.
  const core = result.find(s => s.axis === 'core') ??
    result.find(s => s.axis === 'creation') ??
    result.find(s => s.axis === 'management') ??
    result.find(s => s.axis === 'planning');
  // Actual Wealth relations take priority. Context-only T8 may fill an otherwise
  // empty research page, but never establishes the missing Wealth synthesis.
  const supportSelection = core
    ? selectIndependentNatalSupportingAxes(core, result.filter(section => section.axis !== 'context'))
    : undefined;
  const tensionOnly = result.filter(section => section.axis === 'tension').slice(0, 1);
  const contextOnly = result.filter(section => section.axis === 'context').slice(0, 1);
  const chosen: WealthNatalMultifactorSection[] = core
    ? [core, ...(supportSelection?.supporting ?? [])]
    : tensionOnly.length ? tensionOnly : contextOnly;
  const missing: string[] = [];
  if (snapshot.completeness.birthTimeKnown &&
    (chosen.length === 0 || chosen[0]?.axis === 'context')) {
    const sourceBoundReason = explainMissingWealthT8(snapshot, execution);
    if (sourceBoundReason) missing.push(sourceBoundReason);
  }
  if(!core) missing.push('출처 있는 원국 중심 복합 해석 축');
  if(!core && chosen[0]?.axis === 'tension') {
    missing.push('중심 종합 근거 없이 실제 확인된 긴장 관점만 부분적으로 보여줍니다. 실제 소득·재산·투자 결과로 확장하지 않습니다.');
  }
  if(!core && chosen[0]?.axis === 'context') {
    missing.push('관성·인성 또는 관성·비겁의 간접적인 구조 설명만 확인됩니다. 이것은 재성 중심 재물운 종합 해석이 아니며 결과를 부분 연구 관점으로 제한합니다.');
  }
  if (supportSelection && supportSelection.overlapOnlyCount > 0 && chosen.length < 3) {
    missing.push('서로 다른 해석 축이어도 기존 해석과 같은 계산 위치만 반복하면 독립적인 보조 근거로 인정하지 않습니다.');
  }
  const missingSupportingAxes = 2 - (core ? chosen.length - 1 : chosen.filter(s => s.axis === 'tension').length);
  if(missingSupportingAxes > 0) missing.push(
    `중심 결론과 구별되는 추가 구조 축 ${missingSupportingAxes}개 부족`);
  const state: Status = snapshot.completeness.birthTimeKnown &&
    core !== undefined && chosen.length === 3
    ? 'complete' : result.length ? 'partial' : 'insufficient';
  const sections: readonly WealthNatalMultifactorSection[] = chosen;
  const availableThemeContext = sections.length === 0
    ? buildAvailableThemeContext(snapshot, execution) : undefined;
  const readingGuide = buildWealthNatalReadingGuide(
    core, core === undefined ? [] : chosen.slice(1), state,
  );
  if(!snapshot.completeness.birthTimeKnown) {
    missing.unshift('출생시각 미상: 이 계산 정책에서 십신(T5) 전체가 미확정이므로 재물의 다중 근거 T8 해석은 보류합니다.');
  }
  return {
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    version: WEALTH_NATAL_MULTIFACTOR_REPORT_VERSION,
    state,
    title: '나의 자원과 재물 주제를 읽는 구조적 출발점',
    introduction: '실제 명식의 십신 관계를 바탕으로 가치를 만들어 내는 과정, 자원을 다루는 기준, 준비와 배분 사이의 구조를 함께 살펴봅니다. 수입이나 재산을 예측하는 판정이 아닌 전통 명리 연구 후보입니다.' +
      (snapshot.completeness.birthTimeKnown ? '' : ' ' + unknownHourCalculatedContext(snapshot)),
    sections,
    ...(readingGuide === undefined ? {} : { readingGuide }),
    ...(availableThemeContext === undefined ? {} : { availableThemeContext }),
    missing,
    limitations: [...LIMITATIONS, ...(state === 'complete' ? [] :
      ['서로 구별되는 근거가 아직 부족하여 전체 해석의 완성으로 표시하지 않습니다.'])],
    researchOnly: true, mayPublish: false, maySell: false, usefulComplete: false,
  };
}
