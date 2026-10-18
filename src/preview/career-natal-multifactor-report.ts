import type { CanonicalSajuSnapshot, PillarSlot } from '../contracts/calculation.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import type { ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { buildReadingCompositionEvidence } from '../reading/reading-intent-composition.js';
import {
  CAREER_MULTIFACTOR_NARRATIVE_PROFILES,
  CAREER_MULTIFACTOR_PACK,
} from '../research/career-natal-multifactor-candidate.js';

export const CAREER_MULTIFACTOR_REPORT_VERSION = '0.1.0-research-preview' as const;
type Axis = 'execution' | 'responsibility' | 'tension';
type Status = 'complete' | 'partial' | 'insufficient';

export interface CareerMultifactorReportSection {
  claimType: string;
  pattern: string;
  axis: Axis;
  channel: 'visible_stems' | 'branches';
  headline: string;
  paragraph: string;
  upstreamClaimIds: readonly string[];
  sourceIds: readonly string[];
  ruleId: string;
  calculatedPositions: readonly string[];
  calculatedFactPaths: readonly string[];
}
export interface CareerMultifactorReport {
  version: typeof CAREER_MULTIFACTOR_REPORT_VERSION;
  snapshotId: string;
  calculationHash: string;
  state: Status;
  title: string;
  introduction: string;
  sections: readonly CareerMultifactorReportSection[];
  limitations: readonly string[];
  missing: readonly string[];
  researchOnly: true;
  mayPublish: false;
  maySell: false;
  usefulComplete: false;
}

const MUR = Object.freeze([
  '하나의 천간 기반 다중 근거 중심 해석',
  '그것과 구별되는 두 가지 보조 구조 해석 축',
  '출처와 해당 근거 및 불확실성 명시',
]);

function guard(value: unknown, description: string): asserts value {
  if (!value) throw new TypeError('Career multifactor report: ' + description);
}
function profileText(claimType: string, key: 'headline' | 'summary') {
  const profile = CAREER_MULTIFACTOR_NARRATIVE_PROFILES.find(p => p.claimType === claimType);
  guard(profile !== undefined, 'unknown source-owned ClaimNarrativeProfile: ' + claimType);
  const matches = profile.templates?.filter(t => t.templateKey === key && t.language === 'ko') ?? [];
  guard(matches.length === 1 && matches[0]!.text.length > 0, 'missing Korean narrative template');
  return matches[0]!.text;
}
const SLOT_LABELS: Readonly<Record<PillarSlot, string>> = {
  year: '연주', month: '월주', day: '일주', hour: '시주',
};
const TEN_GOD_FAMILIES: Readonly<Record<string, readonly string[]>> = {
  peer: ['비견', '겁재'], resource: ['편인', '정인'],
  output: ['식신', '상관'], wealth: ['편재', '정재'],
  officer: ['편관', '정관'],
};
function findObservedPositions(
  snapshot: CanonicalSajuSnapshot,
  channel: 'visible_stems' | 'branches',
  families: readonly string[],
): readonly { display: string; factPath: string }[] {
  const facts = snapshot.derivedFacts.tenGods;
  guard(facts.status === 'resolved', 'Ten-God facts must be resolved for structural interpretation');
  const component = channel === 'visible_stems' ? 'stem' : 'branch';
  const slots: readonly PillarSlot[] =
    channel === 'visible_stems' ? ['year','month','hour'] : ['year','month','day','hour'];
  guard(families.length === 2 && new Set(families).size === 2 &&
    families.every(f => TEN_GOD_FAMILIES[f] !== undefined),
    'T8 must use two distinct recognized Ten-God families');
  const positions = slots.flatMap(slot => {
    const fact = facts.value[slot][component];
    if (fact?.status !== 'resolved' ||
      !families.some(family => TEN_GOD_FAMILIES[family]!.includes(fact.value))) return [];
    return [{
      display: `${SLOT_LABELS[slot]} ${component === 'stem' ? '천간' : '지지 대표 십신'} ${fact.value}`,
      factPath: `derivedFacts.tenGods.value.${slot}.${component}.value`,
      observedFamily: families.find(f => TEN_GOD_FAMILIES[f]!.includes(fact.value))!,
    }];
  });
  guard(families.every(f => positions.some(x => x.observedFamily === f)),
    'claimed two-family channel relation is not present in this exact Canonical chart');
  return positions;
}
function entry(claim: InterpretationClaim, snapshot: CanonicalSajuSnapshot,
               execution: InterpretationExecutionResult,
               registry: ResolvedRuleRegistrySnapshot): CareerMultifactorReportSection {
  const value = claim.value as Record<string, unknown>;
  guard(value && typeof value === 'object' &&
    typeof value.pattern === 'string' &&
    (value.axis === 'execution' || value.axis === 'responsibility' || value.axis === 'tension') &&
    (value.channel === 'visible_stems' || value.channel === 'branches') &&
    value.causalOutcomeAuthorized === false && value.occupationAuthorized === false &&
    value.careerSuccessAuthorized === false,
    'invalid structured meaning or invented outcome authority');
  guard(claim.methodologyRef.id === 'M-CAREER-NATAL-SOURCE-BOUNDED-PAIR-SYNTHESIS-V1' &&
    claim.upstreamClaimRefs.length === 2 &&
    new Set(claim.upstreamClaimRefs).size === 2 &&
    claim.sourceRefs.length === 2,
    'not an actual two-Claim research synthesis');
  const upstream = claim.upstreamClaimRefs.map(id => execution.claims.find(c => c.claimId === id));
  guard(upstream.every(c => c !== undefined &&
    c.taxonomy.tier === 'T5' && c.state === 'active' &&
    c.snapshotId === claim.snapshotId &&
    c.claimType.endsWith('_' + String(value.channel).toUpperCase() + '_THEME')),
    'cross-chart, cross-channel or absent T5 input');
  const ruleRef = claim.ruleRefs[0];
  const rule = registry.rules.find(r => r.ruleId === ruleRef?.ruleId && r.version === ruleRef?.version);
  const evaluated = execution.evaluations.find(e => e.evaluationId === ruleRef?.evaluationId);
  guard(claim.ruleRefs.length === 1 && rule !== undefined && rule.output.claimType === claim.claimType &&
    rule.status === 'research' && rule.taxonomy.tier === 'T8' &&
    evaluated?.status === 'matched' && evaluated.snapshotId === claim.snapshotId &&
    evaluated.emittedClaimIds.includes(claim.claimId),
    'Claim cannot be traced to a matched exact registry rule');
  guard(rule.sourceRefs.every(link => claim.sourceRefs.includes(link.sourceId)) &&
    claim.sourceRefs.every(id => registry.sources.some(s => s.sourceId === id)),
    'unverified source attribution');
  const locations = findObservedPositions(snapshot,
    value.channel as 'visible_stems' | 'branches', value.families as string[]);
  const locationText = locations.map(x => x.display).join(' · ');
  return {
    claimType: claim.claimType,
    pattern: value.pattern,
    axis: value.axis as Axis,
    channel: value.channel as 'visible_stems' | 'branches',
    headline: profileText(claim.claimType, 'headline'),
    paragraph: `실제 명식에서 확인한 근거는 ${locationText}입니다. ${profileText(claim.claimType, 'summary')}`,
    upstreamClaimIds: [...claim.upstreamClaimRefs],
    sourceIds: [...claim.sourceRefs],
    ruleId: rule.ruleId,
    calculatedPositions: locations.map(x => x.display),
    calculatedFactPaths: locations.map(x => x.factPath),
  };
}

/**
 * Existing ReadingIntent→DomainReadingProfile→EvidenceSelector are the delivery
 * boundary; the extra MUR state is deliberately stricter than generic T8
 * selector's 'complete'. Do not back-fill missing research with generic copy.
 */
export function buildCareerMultifactorResearchReport(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
): CareerMultifactorReport {
  guard(execution.run.snapshotId === snapshot.snapshotId &&
    registry.pack.packId === CAREER_MULTIFACTOR_PACK.packId &&
    registry.pack.version === CAREER_MULTIFACTOR_PACK.version &&
    registry.pack.status === 'research',
    'cross-person or non-research registry');
  const evidence = buildReadingCompositionEvidence(snapshot, execution, registry, {
    requestId: 'career-multifactor-research-preview',
    intent: { domain: 'career', temporalScope: 'natal' },
  });
  const selected = new Set(
    evidence.evidence?.bundle.claims.map(claim => claim.claimId) ?? [],
  );
  const active = execution.claims.filter(claim =>
    claim.taxonomy.tier === 'T8' && claim.taxonomy.category === 'career' &&
    claim.taxonomy.subcategory === 'multifactor_structure' &&
    claim.state === 'active' && claim.snapshotId === snapshot.snapshotId);
  guard(active.every(c => selected.has(c.claimId)),
    'some matched Career claims were not selected by the original EvidenceSelector');
  // Reader ordering is explicit narrative policy; never registry/ClaimId/hash order.
  const AXES: readonly Axis[] = ['execution', 'responsibility', 'tension'];
  const units = active.map(claim => entry(claim, snapshot, execution, registry))
    .sort((a, b) => AXES.indexOf(a.axis) - AXES.indexOf(b.axis) ||
      (a.channel === b.channel ? 0 : a.channel === 'visible_stems' ? -1 : 1));
  const visible = units.filter(unit => unit.channel === 'visible_stems');
  const primary = visible[0];
  const supporting = units.filter(unit => unit.claimType !== primary?.claimType &&
    unit.pattern !== primary?.pattern)
    .filter((unit, i, all) => all.findIndex(x => x.pattern === unit.pattern) === i)
    .slice(0, 2);
  const shown = primary ? [primary, ...supporting] : [];
  const enough = primary !== undefined && supporting.length >= 2;
  const state: Status = enough ? 'complete' : units.length > 0 ? 'partial' : 'insufficient';
  const missing: string[] = [];
  if (!primary) missing.push(MUR[0]!);
  if (supporting.length < 2) missing.push(MUR[1]!);
  if (!snapshot.completeness.birthTimeKnown) {
    // Never convert an unknown-hour chart into a four-pillar comprehensive claim.
    return {
      version: CAREER_MULTIFACTOR_REPORT_VERSION,
      snapshotId: snapshot.snapshotId,
      calculationHash: snapshot.calculationHash,
      state: 'insufficient', title: '직업 해석 — 출생시간 미상',
      introduction: '시주가 확정되지 않아 4기둥 전체를 전제하는 종합 결론을 보류합니다.',
      sections: [], limitations: ['관측된 일부 십신은 전체 명식의 결론으로 확장하지 않습니다.'],
      missing: ['출생시각 미상', ...MUR],
      researchOnly: true, mayPublish: false, maySell: false, usefulComplete: false,
    };
  }
  return {
    version: CAREER_MULTIFACTOR_REPORT_VERSION,
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    state,
    title: '나의 일과 역할 — 명식 구조 기반 해석',
    introduction: '실제 명식에서 관측된 서로 다른 십신 근거를 연결하여, 전통 명리에서 일을 읽는 구조적 관점을 정리했습니다. 심리 검사나 개인의 직업 운명을 확정하는 결과가 아닙니다.',
    sections: shown,
    limitations: [
      '사용한 해석은 고전 관계를 제한적으로 참고한 미검토 연구 후보입니다. Production 또는 유료 보고서에 사용할 수 없습니다.',
      '명식에 관측된 관계만 설명하며 직업 적성·연봉·성공·미래 사건·신강신약·용신을 단정하지 않습니다.',
      ...(state !== 'complete' ? ['개인별 종합풀이의 최소 근거가 부족하므로 완성된 해석으로 표시하지 않습니다.'] : []),
    ],
    missing,
    researchOnly: true, mayPublish: false, maySell: false, usefulComplete: false,
  };
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/gu, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]!);
}

/** Real reader-facing preview; never bypasses an existing Product/Official authority boundary. */
export function renderCareerMultifactorResearchHtml(report: CareerMultifactorReport): string {
  const e = escapeHtml;
  const rows = report.sections.map(s => `<section><h2>${e(s.headline)}</h2><p>${e(s.paragraph)}</p><details><summary>근거와 출처</summary><p>${e(s.calculatedPositions.join(' · '))}</p><p>${e(s.calculatedFactPaths.join(' · '))}</p><p>${e(s.upstreamClaimIds.join(' · '))}</p><p>${e(s.sourceIds.join(' · '))}</p><p>${e(s.ruleId)}</p></details></section>`).join('\n');
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${e(report.title)}</title><style>body{max-width:760px;margin:3em auto;padding:0 1.5em;font:17px/1.8 system-ui,sans-serif;color:#222}section{padding:1.2em 0;border-bottom:1px solid #ddd}small,details{color:#666}h2{font-size:1.2em}</style></head><body><header><h1>${e(report.title)}</h1><p>${e(report.introduction)}</p><p><strong>최소 유효 풀이: ${e(report.state)}</strong></p></header>${rows || '<p>현재 출처로 뒷받침되는 종합 해석을 구성할 수 없습니다.</p>'}<h2>해석 한계</h2>${report.limitations.map(t=>`<p><small>${e(t)}</small></p>`).join('')}<p>연구용 내부 미리보기 · 출판 및 판매 불가</p></body></html>`;
}
