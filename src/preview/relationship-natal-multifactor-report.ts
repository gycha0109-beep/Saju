import type { CanonicalSajuSnapshot, PillarSlot } from '../contracts/calculation.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import { deterministicContentHash, type ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { buildReadingCompositionEvidence } from '../reading/reading-intent-composition.js';
import {
  RELATIONSHIP_NATAL_MULTIFACTOR_PACK,
  RELATIONSHIP_NATAL_MULTIFACTOR_NARRATIVES,
} from '../research/relationship-natal-multifactor-candidate.js';

export const RELATIONSHIP_NATAL_MULTIFACTOR_REPORT_VERSION = '0.1.0-research-preview' as const;
type Axis = 'core' | 'expression' | 'boundaries' | 'reception' | 'coordination';
type Status = 'complete' | 'partial' | 'insufficient';
type Channel = 'visible_stems' | 'branches';
export interface RelationshipNatalMultifactorSection {
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
export interface RelationshipNatalMultifactorReport {
  snapshotId: string;
  calculationHash: string;
  version: typeof RELATIONSHIP_NATAL_MULTIFACTOR_REPORT_VERSION;
  state: Status;
  title: string;
  introduction: string;
  sections: readonly RelationshipNatalMultifactorSection[];
  missing: readonly string[];
  limitations: readonly string[];
  researchOnly: true;
  mayPublish: false;
  maySell: false;
  usefulComplete: false;
}
const AXES: readonly Axis[] = ['core', 'expression', 'boundaries', 'reception', 'coordination'];
const SLOT_NAMES: Readonly<Record<PillarSlot, string>> = {
  year: '연주', month: '월주', day: '일주', hour: '시주',
};
const FAMILIES: Readonly<Record<string, readonly string[]>> = {
  peer: ['비견','겁재'], resource: ['정인','편인'], output: ['식신','상관'],
  wealth: ['정재','편재'], officer: ['정관','편관'],
};
const LIMITATIONS = [
  '전통 문헌의 제한된 구조 관계를 이용한 미검토 연구 풀이입니다. 실제 삶의 성격·사건을 판정하지 않습니다.',
  '배우자 성격, 결혼 여부, 궁합, 연애 성패, 갈등이나 미래 관계 사건을 판정하지 않습니다.',
  '공식 게시·저장·판매에 사용할 수 없는 내부 실험입니다.',
] as const;
function guard(v: unknown, message: string): asserts v {
  if (!v) throw new TypeError('Relationship multifactor: ' + message);
}
function textFor(claimType: string, key: 'headline'|'summary') {
  const profile = RELATIONSHIP_NATAL_MULTIFACTOR_NARRATIVES.find(p => p.claimType === claimType);
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
): RelationshipNatalMultifactorSection {
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
    'M-RELATIONSHIP-NATAL-MULTIFACTOR-BOUNDARY-DIALOGUE-V1' &&
    new Set(claim.upstreamClaimRefs).size === claim.upstreamClaimRefs.length &&
    upstream.every(c => c && c.state === 'active' && c.taxonomy.tier === 'T5' &&
      c.snapshotId === snapshot.snapshotId && c.scenarioRef === undefined),
    'T8 requires only exact same-chart active T5 Claims');
  const ref = claim.ruleRefs[0];
  const rule = registry.rules.find(r => r.ruleId === ref?.ruleId && r.version === ref?.version);
  const evalResult = execution.evaluations.find(e => e.evaluationId === ref?.evaluationId);
  guard(claim.ruleRefs.length === 1 && rule &&
    rule.taxonomy.tier === 'T8' && rule.taxonomy.category === 'relationship' &&
    rule.taxonomy.subcategory === 'multifactor_structure' &&
    rule.output.predicate === 'relationship_multifactor_structure' && rule.status === 'research' &&
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
    'Claim is not bound to the exact matched relationship source rule');
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
    'not exactly source-bound to Relationship T5 family and method inputs');
  const locations = positions(snapshot, value.channel as Channel, value.families as string[]);
  return {
    claimType: claim.claimType,
    pattern: value.pattern,
    axis: value.axis as Axis,
    channel: value.channel as Channel,
    headline: textFor(claim.claimType,'headline'),
    paragraph: `이 원국에서 확인된 근거는 ${locations.map(x => x.display).join(' · ')}입니다. ${textFor(claim.claimType,'summary')}`,
    upstreamClaimIds: [...claim.upstreamClaimRefs],
    sourceIds: [...claim.sourceRefs],
    ruleId: rule.ruleId,
    observedPositions: locations.map(x => x.display),
    observedFactPaths: locations.map(x => x.factPath),
  };
}
export function buildRelationshipNatalMultifactorReport(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
): RelationshipNatalMultifactorReport {
  guard(execution.run.snapshotId === snapshot.snapshotId &&
    execution.run.snapshotHash === snapshot.calculationHash &&
    execution.run.registrySnapshotId === registry.snapshot.registrySnapshotId &&
    execution.run.packRef.id === registry.pack.packId &&
    execution.run.packRef.version === registry.pack.version &&
    execution.integrity.valid && execution.run.status !== 'failed' &&
    registry.pack.packId === RELATIONSHIP_NATAL_MULTIFACTOR_PACK.packId &&
    registry.pack.version === RELATIONSHIP_NATAL_MULTIFACTOR_PACK.version &&
    registry.pack.status === 'research', 'wrong chart, integrity or pack authority');
  const selection = buildReadingCompositionEvidence(snapshot, execution, registry, {
    requestId: 'relationship-natal-multifactor-preview',
    intent: { domain: 'relationship', temporalScope: 'natal', relationshipScope: 'general' },
  });
  const selected = new Set(selection.evidence?.bundle.claims.map(c => c.claimId) ?? []);
  const claims = execution.claims.filter(c =>
    c.taxonomy.tier === 'T8' && c.taxonomy.category === 'relationship' &&
    c.predicate === 'relationship_multifactor_structure' &&
    c.state === 'active' && c.snapshotId === snapshot.snapshotId);
  // Select only registered Relationship T8 claims through the existing reading profile.
  // Do not synthesize evidence for absent patterns or missing birth-hour cases.
  guard(selection.selection.coverageState !== 'unsupported_intent' &&
    claims.every(c => selected.has(c.claimId)) &&
    (claims.length === 0 || selection.evidence !== undefined),
    'Relationship meaning not selected by existing ReadingIntent/EvidenceSelector');
  const result = claims.map(c => toSection(c, snapshot, execution, registry))
    .sort((a,b) => AXES.indexOf(a.axis)-AXES.indexOf(b.axis) ||
      (a.channel === b.channel ? 0 : a.channel === 'visible_stems' ? -1 : 1));
  // Prefer the 3-input core. When not observed, a narrower two-input core can
  // still be rendered, but completion needs two OTHER independently grounded axes.
  const core = result.find(s => s.axis === 'core') ??
    result.find(s => s.axis === 'expression') ??
    result.find(s => s.axis === 'boundaries') ??
    result.find(s => s.axis === 'reception');
  const chosen: RelationshipNatalMultifactorSection[] = core ? [core] : [];
  const axes = new Set<Axis>(core ? [core.axis] : []);
  for(const unit of result) {
    if (!core || axes.has(unit.axis)) continue;
    chosen.push(unit);
    axes.add(unit.axis);
    if(chosen.length === 3) break;
  }
  const missing: string[] = [];
  if(!core) missing.push('출처 있는 원국 중심 복합 해석 축');
  if(chosen.length < 3) missing.push('중심 결론과 구별되는 두 개의 서로 다른 추가 구조 축');
  let state: Status = chosen.length === 3 ? 'complete' : result.length ? 'partial' : 'insufficient';
  let sections: readonly RelationshipNatalMultifactorSection[] = chosen;
  if(!snapshot.completeness.birthTimeKnown) {
    sections = [];
    state = 'insufficient';
    missing.unshift('출생시각 미상: 시주를 포함하는 전체 원국 종합은 보류');
  }
  return {
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    version: RELATIONSHIP_NATAL_MULTIFACTOR_REPORT_VERSION,
    state,
    title: '나의 관계·소통 주제를 읽는 구조적 출발점',
    introduction: '실제 명식의 십신 관계를 바탕으로 자기 관점과 표현, 서로의 역할, 받아들이는 태도의 구조적 관점을 함께 살펴봅니다. 실제 관계의 질이나 결혼 결과를 추론하지 않는 전통 명리 연구 후보입니다.',
    sections,
    missing,
    limitations: [...LIMITATIONS, ...(state === 'complete' ? [] :
      ['서로 구별되는 근거가 아직 부족하여 전체 해석의 완성으로 표시하지 않습니다.'])],
    researchOnly: true, mayPublish: false, maySell: false, usefulComplete: false,
  };
}
