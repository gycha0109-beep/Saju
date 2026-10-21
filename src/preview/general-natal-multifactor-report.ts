import { describeQuotedReadingAxis } from './korean-reading-headline.js';
import { selectIndependentNatalSupportingAxes } from './natal-independent-supporting-axes.js';
import type { CanonicalSajuSnapshot, PillarSlot } from '../contracts/calculation.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import { deterministicContentHash, type ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { buildReadingCompositionEvidence } from '../reading/reading-intent-composition.js';
import {
  GENERAL_NATAL_MULTIFACTOR_PACK,
  GENERAL_NATAL_MULTIFACTOR_NARRATIVES,
} from '../research/general-natal-multifactor-candidate.js';

export const GENERAL_NATAL_MULTIFACTOR_REPORT_VERSION = '0.3.0-research-preview' as const;
type Axis = 'core' | 'expression' | 'response' | 'responsibility' | 'tension';
type Status = 'complete' | 'partial' | 'insufficient';
type Channel = 'visible_stems' | 'branches';
export interface GeneralNatalMultifactorSection {
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
export interface GeneralNatalMultifactorReport {
  snapshotId: string;
  calculationHash: string;
  version: typeof GENERAL_NATAL_MULTIFACTOR_REPORT_VERSION;
  state: Status;
  title: string;
  introduction: string;
  sections: readonly GeneralNatalMultifactorSection[];
  missing: readonly string[];
  limitations: readonly string[];
  researchOnly: true;
  mayPublish: false;
  maySell: false;
  usefulComplete: false;
}
const AXES: readonly Axis[] = ['core', 'expression', 'response', 'responsibility', 'tension'];
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
  peer: '비겁(자기 기준·동료 관점)',
  resource: '인성(학습·수용)',
  output: '식상(표현·산출)',
  wealth: '재성(현실 자원·교환)',
  officer: '관성(역할·규범 기준)',
};
const LIMITATIONS = [
  '전통 문헌의 제한된 구조 관계를 이용한 미검토 연구 풀이입니다. 실제 삶의 성격·사건을 판정하지 않습니다.',
  '재물·직업·건강·관계 결과와 특정 미래 시기를 예측하거나 오행 강약·용신·격국을 단정하지 않습니다.',
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
    '원국 전체에 관한 개인별 다중 근거 T8 해석을 뜻하지 않습니다.';
}

function guard(v: unknown, message: string): asserts v {
  if (!v) throw new TypeError('General multifactor: ' + message);
}
function textFor(claimType: string, key: 'headline'|'summary') {
  const profile = GENERAL_NATAL_MULTIFACTOR_NARRATIVES.find(p => p.claimType === claimType);
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
): GeneralNatalMultifactorSection {
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
    'M-GENERAL-NATAL-MULTIFACTOR-WHOLE-CHART-V1' &&
    new Set(claim.upstreamClaimRefs).size === claim.upstreamClaimRefs.length &&
    upstream.every(c => c && c.state === 'active' && c.taxonomy.tier === 'T5' &&
      c.snapshotId === snapshot.snapshotId && c.scenarioRef === undefined),
    'T8 requires only exact same-chart active T5 Claims');
  const ref = claim.ruleRefs[0];
  const rule = registry.rules.find(r => r.ruleId === ref?.ruleId && r.version === ref?.version);
  const evalResult = execution.evaluations.find(e => e.evaluationId === ref?.evaluationId);
  guard(claim.ruleRefs.length === 1 && rule &&
    rule.taxonomy.tier === 'T8' && rule.taxonomy.category === 'general' &&
    ['core_conclusion','strength_conclusion','tension_conclusion'].includes(rule.taxonomy.subcategory ?? '') &&
    rule.output.predicate === 'general_multifactor_structure' && rule.status === 'research' &&
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
    'Claim is not bound to the exact matched general source rule');
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
    'not exactly source-bound to General T5 family and method inputs');
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
export function buildGeneralNatalMultifactorReport(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
): GeneralNatalMultifactorReport {
  guard(execution.run.snapshotId === snapshot.snapshotId &&
    execution.run.snapshotHash === snapshot.calculationHash &&
    execution.run.registrySnapshotId === registry.snapshot.registrySnapshotId &&
    execution.run.packRef.id === registry.pack.packId &&
    execution.run.packRef.version === registry.pack.version &&
    execution.integrity.valid && execution.run.status !== 'failed' &&
    registry.pack.packId === GENERAL_NATAL_MULTIFACTOR_PACK.packId &&
    registry.pack.version === GENERAL_NATAL_MULTIFACTOR_PACK.version &&
    registry.pack.status === 'research', 'wrong chart, integrity or pack authority');
  const selection = buildReadingCompositionEvidence(snapshot, execution, registry, {
    requestId: 'general-natal-multifactor-preview',
    intent: { domain: 'general', temporalScope: 'natal' },
  });
  const selected = new Set(selection.evidence?.bundle.claims.map(c => c.claimId) ?? []);
  const claims = execution.claims.filter(c =>
    c.taxonomy.tier === 'T8' && c.taxonomy.category === 'general' &&
    c.predicate === 'general_multifactor_structure' &&
    c.state === 'active' && c.snapshotId === snapshot.snapshotId);
  // The natal profile also requires a separate General foundation claim. A
  // research T8-only registry may have partial profile coverage even when all
  // its actual synthesis claims are selected. Never manufacture that foundation.
  guard(selection.selection.coverageState !== 'unsupported_intent' &&
    claims.every(c => selected.has(c.claimId)) &&
    (claims.length === 0 || selection.evidence !== undefined),
    'General meaning not selected by existing ReadingIntent/EvidenceSelector');
  // Canonical tenGods is unavailable with unknown birth time. Do not
  // promote a scenario-based Claim into a complete person-level reading.
  const result = snapshot.completeness.birthTimeKnown
    ? claims.map(c => toSection(c, snapshot, execution, registry))
        .sort((a,b) => AXES.indexOf(a.axis)-AXES.indexOf(b.axis) ||
          (a.channel === b.channel ? 0 : a.channel === 'visible_stems' ? -1 : 1))
    : [];
  // Prefer the 3-input core. When not observed, a narrower two-input core can
  // still be rendered, but completion needs two OTHER independently grounded axes.
  const core = result.find(s => s.axis === 'core') ??
    result.find(s => s.axis === 'expression') ??
    result.find(s => s.axis === 'response') ??
    result.find(s => s.axis === 'responsibility');
  const supportSelection = core ? selectIndependentNatalSupportingAxes(core, result) : undefined;
  const chosen: GeneralNatalMultifactorSection[] = core
    ? [core, ...(supportSelection?.supporting ?? [])] : [];
  // Tension-only source-qualified T8 is useful partial evidence, but never
  // a substitute for the independently grounded whole-chart core.
  // Only one representative of the same tension axis is displayed. More
  // patterns on that axis cannot count as independent MUR supporting axes.
  const partialTension = core ? [] : result.filter(unit =>
    unit.axis === 'tension').slice(0, 1);
  const missing: string[] = [];
  if(!core) missing.push('출처 있는 원국 중심 복합 해석 축');
  if(partialTension.length > 0) missing.push(
    `확인된 보조 해석: ${partialTension.map(s =>
      `${s.headline}(${s.channel === 'visible_stems' ? '천간' : '지지 대표 십신'})`).join(' · ')}. 이 근거만으로 원국 전체의 중심 결론을 세울 수 없어 부분 풀이로만 보여드립니다.`);
  if (supportSelection && supportSelection.overlapOnlyCount > 0 && chosen.length < 3) {
    missing.push('서로 다른 해석 축이어도 기존 해석과 같은 계산 위치만 반복하면 독립적인 보조 근거로 인정하지 않습니다.');
  }
  const missingSupportingAxes = 2 - Math.max(0, chosen.length - 1);
  if(missingSupportingAxes > 0) missing.push(
    `중심 결론과 구별되는 추가 구조 축 ${missingSupportingAxes}개 부족`);
  const state: Status = snapshot.completeness.birthTimeKnown && chosen.length === 3
    ? 'complete' : result.length ? 'partial' : 'insufficient';
  const sections: readonly GeneralNatalMultifactorSection[] = core ? chosen : partialTension;
  if(!snapshot.completeness.birthTimeKnown) {
    missing.unshift('출생시각 미상: 이 계산 정책에서 십신(T5) 전체가 미확정이므로 원국 전체의 다중 근거 T8 해석은 보류합니다.');
  }
  return {
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    version: GENERAL_NATAL_MULTIFACTOR_REPORT_VERSION,
    state,
    title: '나의 원국 전체를 읽는 구조적 출발점',
    introduction: '서로 다른 십신 관계가 같은 실제 명식에서 어떤 구조적 주제를 만드는지 연결했습니다. 전통적인 읽기의 연구 후보로, 실제 삶의 특징이나 운세 결과를 판단한 것은 아닙니다.' +
      (snapshot.completeness.birthTimeKnown ? '' : ' ' + unknownHourCalculatedContext(snapshot)),
    sections,
    missing,
    limitations: [...LIMITATIONS, ...(state === 'complete' ? [] :
      ['서로 구별되는 근거가 아직 부족하여 전체 해석의 완성으로 표시하지 않습니다.'])],
    researchOnly: true, mayPublish: false, maySell: false, usefulComplete: false,
  };
}
