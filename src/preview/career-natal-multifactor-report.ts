import type { CanonicalSajuSnapshot, PillarSlot } from '../contracts/calculation.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import { deterministicContentHash, type ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { buildReadingCompositionEvidence } from '../reading/reading-intent-composition.js';
import {
  CAREER_MULTIFACTOR_NARRATIVE_PROFILES,
  CAREER_MULTIFACTOR_PACK,
} from '../research/career-natal-multifactor-candidate.js';

export const CAREER_MULTIFACTOR_REPORT_VERSION = '0.4.0-research-preview' as const;
type Axis = 'execution' | 'preparation' | 'responsibility' | 'tension';
const AXIS_LABELS: Readonly<Record<Axis, string>> = {
  execution: '실행·산출',
  preparation: '요구에 따른 학습·준비',
  responsibility: '역할·책임',
  tension: '서로 다른 기준의 조율',
};
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
export interface CareerMultifactorReadingGuide {
  title: string;
  /** Existing source-owned observations arranged into a readable order; no new T8. */
  paragraph: string;
  coreClaimType: string;
  supporting: readonly {
    claimType: string;
    /** New actually observed paths beyond the core and preceding supports. */
    distinctCalculatedFactPaths: readonly string[];
    distinctCalculatedPositions: readonly string[];
  }[];
}
export interface CareerMultifactorReport {
  version: typeof CAREER_MULTIFACTOR_REPORT_VERSION;
  snapshotId: string;
  calculationHash: string;
  state: Status;
  title: string;
  introduction: string;
  sections: readonly CareerMultifactorReportSection[];
  /** Additional exact, rule-verified T8 observations omitted from the MUR top-three.
   * These are not counted as independent MUR axes or proof of completeness.
   */
  additionalVerifiedSections: readonly CareerMultifactorReportSection[];
  readingGuide?: CareerMultifactorReadingGuide;
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
const EVIDENCE_ROLES: Readonly<Record<string, string>> = {
  peer: '비겁(자기 기준·동료 관점)',
  resource: '인성(학습·수용)',
  output: '식상(표현·산출)',
  wealth: '재성(현실 자원·교환)',
  officer: '관성(역할·책임 기준)',
};
function findObservedPositions(
  snapshot: CanonicalSajuSnapshot,
  channel: 'visible_stems' | 'branches',
  families: readonly string[],
): readonly { display: string; factPath: string; observedFamily: string }[] {
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
    (value.axis === 'execution' || value.axis === 'preparation' ||
     value.axis === 'responsibility' || value.axis === 'tension') &&
    (value.channel === 'visible_stems' || value.channel === 'branches') &&
    value.causalOutcomeAuthorized === false && value.occupationAuthorized === false &&
    value.careerSuccessAuthorized === false,
    'invalid structured meaning or invented outcome authority');
  guard(claim.scenarioRef === undefined &&
    claim.methodologyRef.id === 'M-CAREER-NATAL-SOURCE-BOUNDED-PAIR-SYNTHESIS-V1' &&
    claim.upstreamClaimRefs.length === 2 &&
    new Set(claim.upstreamClaimRefs).size === 2 &&
    claim.sourceRefs.length === 2,
    'not an actual two-Claim research synthesis');
  const upstream = claim.upstreamClaimRefs.map(id => execution.claims.find(c => c.claimId === id));
  guard(upstream.every(c => c !== undefined &&
    c.taxonomy.tier === 'T5' && c.state === 'active' &&
    c.snapshotId === claim.snapshotId && c.scenarioRef === undefined &&
    c.claimType.endsWith('_' + String(value.channel).toUpperCase() + '_THEME')),
    'cross-chart, cross-channel or absent T5 input');
  const ruleRef = claim.ruleRefs[0];
  const rule = registry.rules.find(r => r.ruleId === ruleRef?.ruleId && r.version === ruleRef?.version);
  const evaluated = execution.evaluations.find(e => e.evaluationId === ruleRef?.evaluationId);
  guard(claim.ruleRefs.length === 1 && rule !== undefined && rule.output.claimType === claim.claimType &&
    rule.status === 'research' && rule.taxonomy.tier === 'T8' &&
    rule.taxonomy.category === 'career' && rule.taxonomy.subcategory === 'multifactor_structure' &&
    rule.output.predicate === claim.predicate &&
    rule.methodologyRef.id === claim.methodologyRef.id &&
    rule.methodologyRef.version === claim.methodologyRef.version &&
    deterministicContentHash(rule.output.value) === deterministicContentHash(claim.value) &&
    evaluated?.status === 'matched' && evaluated.snapshotId === claim.snapshotId &&
    evaluated.scenarioRef === undefined &&
    evaluated.ruleRef.id === rule.ruleId && evaluated.ruleRef.version === rule.version &&
    evaluated.interpretationPackRef.id === registry.pack.packId &&
    evaluated.interpretationPackRef.version === registry.pack.version &&
    evaluated.emittedClaimIds.includes(claim.claimId),
    'Claim meaning differs from matched exact registry T8 rule');
  // Being two T5 Claims in the same channel is NOT sufficient: each upstream
  // family must be the exact claim type demanded by this particular T8 rule.
  // Otherwise a different pair can be relabeled with a plausible Korean Profile.
  const expectedInputs = rule.inputs.map(input => {
    guard(input.source === 'interpretation_claim' && input.required &&
      input.cardinality === 'exactly_one',
      'T8 rule is not an exact required two-Claim composition');
    return input.pathOrClaimType;
  }).sort();
  const actualInputs = upstream.map(input => input!.claimType).sort();
  guard(expectedInputs.length === 2 &&
    JSON.stringify(actualInputs) === JSON.stringify(expectedInputs),
    'T8 has a different T5 family/channel than its original rule inputs');
  guard(claim.sourceRefs.length === rule.sourceRefs.length &&
    rule.sourceRefs.every(link => claim.sourceRefs.includes(link.sourceId)) &&
    claim.sourceRefs.every(id => registry.sources.some(s => s.sourceId === id)),
    'unverified source attribution');
  const locations = findObservedPositions(snapshot,
    value.channel as 'visible_stems' | 'branches', value.families as string[]);
  const locationText = (value.families as string[]).map(family => {
    const positions = locations.filter(x => x.observedFamily === family);
    guard(positions.length > 0 && EVIDENCE_ROLES[family] !== undefined,
      'source-backed Ten-God family is not actually observed');
    return `${EVIDENCE_ROLES[family]}: ${positions.map(x => x.display).join(' · ')}`;
  }).join(' / ');
  // Name the two exact, source-owned upstream families in their observed
  // canonical positions, not as a free-floating thematic keyword list.
  // First observed slot is a deterministic display example, never rank/weight.
  const pairBasis = (value.families as string[]).map(family => {
    const first = locations.find(x => x.observedFamily === family);
    guard(first !== undefined && EVIDENCE_ROLES[family] !== undefined,
      'source-owned pair is absent from the exact canonical observation channel');
    return `${first.display}의 ${EVIDENCE_ROLES[family]}`;
  });
  guard(pairBasis.length === 2 && pairBasis.every(Boolean),
    'a Career synthesis must explain exactly two upstream families');
  const channelName = value.channel === 'visible_stems' ? '천간' : '지지 대표 십신';
  const headline = profileText(claim.claimType, 'headline');
  return {
    claimType: claim.claimType,
    pattern: value.pattern,
    axis: value.axis as Axis,
    channel: value.channel as 'visible_stems' | 'branches',
    headline,
    paragraph: `실제 명식에서 확인한 근거는 ${locationText}입니다. ${pairBasis[0]}와 ${pairBasis[1]}가 같은 ${channelName} 관찰 범위에서 확인되므로, 기존 출처에 연결된 ‘${headline}’이라는 구조적 해석 후보를 함께 살핍니다. ${profileText(claim.claimType, 'summary')}`,
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
    observed.join(' · ') + '입니다. 직업 적성이나 다중 근거 T8 해석을 뜻하지 않습니다.';
}

/**
 * Build the reader's first-screen explanation from the SAME selected,
 * source-bound T8 section copies. This is presentation composition, not
 * an additional Claim or a causal relation between different Career axes.
 */
function buildCareerMultifactorReadingGuide(
  core: CareerMultifactorReportSection | undefined,
  supporting: readonly CareerMultifactorReportSection[],
  state: Status,
): CareerMultifactorReadingGuide | undefined {
  if (core === undefined || core.channel !== 'visible_stems' || core.axis === 'tension') {
    return undefined;
  }
  const usedPaths = new Set(core.calculatedFactPaths);
  const distinctSupporting = supporting.map(section => {
    const newPositions = section.calculatedFactPaths.flatMap((path, index) => {
      if (usedPaths.has(path)) return [];
      const position = section.calculatedPositions[index];
      guard(position !== undefined, 'supporting calculated position is missing');
      usedPaths.add(path);
      return [{ path, position }];
    });
    guard(newPositions.length > 0, 'supporting axis must add a distinct calculated fact');
    return {
      claimType: section.claimType,
      distinctCalculatedFactPaths: newPositions.map(item => item.path),
      distinctCalculatedPositions: newPositions.map(item => item.position),
    };
  });
  const paragraphs = [
    `이 명식에서 직업운의 중심으로 살펴볼 구조적 관점은 ‘${core.headline}’입니다. ${core.calculatedPositions.join(' · ')}에서 관측된 근거에 연결된 연구용 해석 후보입니다.`,
    ...supporting.map((section, index) =>
      `별도 관점인 ‘${section.headline}’은 ${AXIS_LABELS[section.axis]}에 관한 기존 연구 문구입니다. 중심 관찰과 앞선 보조 관찰에서 사용하지 않은 ${distinctSupporting[index]!.distinctCalculatedPositions.join(' · ')}를 추가 근거로 확인했습니다.`),
    ...(state === 'complete'
      ? ['중심 관점 하나와 서로 다른 계산 근거를 더하는 보조 관점 두 가지를 구분해 읽을 수 있습니다. 이는 연구용 풀이 구성 기준이지 직업 적성·성공 여부의 검증이 아닙니다.']
      : [`현재 독립적인 보조 관점은 ${distinctSupporting.length}개만 확인되어, 필요한 두 가지 보조 관점을 모두 설명할 수 없습니다. 직업운 종합 결론은 보류합니다.`]),
  ];
  return {
    title: '이 명식에서 확인된 일의 중심과 보조 관점',
    paragraph: paragraphs.join(' '),
    coreClaimType: core.claimType,
    supporting: distinctSupporting,
  };
}

export function buildCareerMultifactorResearchReport(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
): CareerMultifactorReport {
  guard(execution.run.snapshotId === snapshot.snapshotId &&
    execution.run.snapshotHash === snapshot.calculationHash &&
    execution.run.registrySnapshotId === registry.snapshot.registrySnapshotId &&
    execution.run.packRef.id === registry.pack.packId &&
    execution.run.packRef.version === registry.pack.version &&
    execution.integrity.valid && execution.run.status !== 'failed' &&
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
  // The two classical source-owned relations are distinct: officer→resource
  // (preparation) and wealth→officer (responsibility). Do not require
  // tension when three other chart-grounded, non-overlapping axes exist.
  const AXES: readonly Axis[] = ['execution', 'preparation', 'responsibility', 'tension'];
  // Canonical tenGods is unavailable without a known birth clock time.
  // Scenario-sensitive claims cannot be promoted to one non-scenario T8.
  const units = snapshot.completeness.birthTimeKnown
    ? active.map(claim => entry(claim, snapshot, execution, registry))
        .sort((a, b) => AXES.indexOf(a.axis) - AXES.indexOf(b.axis) ||
          (a.channel === b.channel ? 0 : a.channel === 'visible_stems' ? -1 : 1))
    : [];
  const visible = units.filter(unit => unit.channel === 'visible_stems');
  // A tension-only visible-stem finding is meaningful supporting evidence,
  // but cannot stand in for the independent central Career interpretation.
  const primary = visible.find(unit => unit.axis !== 'tension');
  // MUR needs genuinely distinct interpretation axes, not merely three
  // rules that restate the same responsibility or tension perspective.
  const supporting: typeof units = [];
  const usedAxes = new Set<Axis>(primary === undefined ? [] : [primary.axis]);
  const usedFactPaths = new Set(primary?.calculatedFactPaths ?? []);
  let overlappingOnlyCount = 0;
  for (const unit of units) {
    if (primary === undefined || unit.claimType === primary.claimType ||
      usedAxes.has(unit.axis)) continue;
    // Distinct narrative axes alone do not make independent evidence.
    // The next support must add an ACTUAL canonical T0 observation path
    // beyond those already consumed by the core and preceding supports.
    // Never turn repeated labels for the same facts into a complete MUR.
    const newFactPaths = unit.calculatedFactPaths.filter(path => !usedFactPaths.has(path));
    if (newFactPaths.length === 0) {
      overlappingOnlyCount++;
      continue;
    }
    supporting.push(unit);
    usedAxes.add(unit.axis);
    for (const path of unit.calculatedFactPaths) usedFactPaths.add(path);
    if (supporting.length === 2) break;
  }
  // Without a visible-stem core preserve each DISTINCT grounded supporting
  // axis, even though three supports cannot establish a complete Career MUR.
  const partialEvidence = primary === undefined
    ? [...visible, ...units.filter(unit => unit.channel === 'branches')]
      .filter((unit, index, all) =>
        all.findIndex(other => other.axis === unit.axis) === index).slice(0, AXES.length)
    : [];
  const shown = primary ? [primary, ...supporting] : partialEvidence;
  // A first-screen MUR has a three-axis cap, but extra observed and verified
  // Career structure must remain inspectable in the *research* preview. Do not
  // count the extras as new MUR evidence, change the chosen core, or infer an
  // additional relationship from their coexistence.
  const shownTypes = new Set(shown.map(unit => unit.claimType));
  const seenFactPaths = new Set(shown.flatMap(unit => unit.calculatedFactPaths));
  const additionalVerifiedSections: CareerMultifactorReportSection[] = [];
  for (const unit of units) {
    if (shownTypes.has(unit.claimType)) continue;
    if (!unit.calculatedFactPaths.some(path => !seenFactPaths.has(path))) continue;
    additionalVerifiedSections.push(unit);
    for (const path of unit.calculatedFactPaths) seenFactPaths.add(path);
  }
  const enough = primary !== undefined && supporting.length >= 2;
  const state: Status = snapshot.completeness.birthTimeKnown && enough
    ? 'complete' : units.length > 0 ? 'partial' : 'insufficient';
  const missing: string[] = [];
  if (!primary) {
    missing.push(MUR[0]!);
    if (partialEvidence.length > 0) {
      missing.push(`이 명식에서는 ${partialEvidence.map(s =>
        `${s.channel === 'visible_stems' ? '천간' : '지지 대표 십신'}의 ${AXIS_LABELS[s.axis]}`).join('·')}에 관한 보조 근거를 확인했습니다. 그러나 천간 중심의 독립된 종합 근거가 없어 전체 직업운으로 판단하지 않고 부분 풀이만 보여드립니다.`);
    }
  }
  if (primary && supporting.length < 2) {
    const observed = shown.map(section => AXIS_LABELS[section.axis]);
    const label = observed.length > 0 ? observed.join('·') : '없음';
    missing.push(`현재 확인된 해석 관점: ${label}. 완전한 직업 종합풀이에는 천간 중심 해석에 더해 서로 구별되는 보조 근거 축 ${2 - supporting.length}개가 필요합니다.`);
    if (overlappingOnlyCount > 0) {
      missing.push('서로 다른 해석 제목이 있어도 앞선 해석에 사용한 계산 위치만 반복하면 독립적인 보조 근거로 세지 않습니다.');
    }
  }
  if (!primary) {
    // The missing core, not a fabricated shortage of two supports, is what
    // prevents a complete Career MUR when real partial evidence exists.
    const unexplainedAxes = AXES.filter(axis =>
      !partialEvidence.some(section => section.axis === axis));
    missing.push(`완전한 직업 종합풀이에는 천간 중심의 독립된 핵심 해석이 먼저 필요합니다.${unexplainedAxes.length > 0
      ? ` 현재 명식에서 등록된 다중 근거 규칙으로 설명하지 못한 관점: ${unexplainedAxes.map(axis => AXIS_LABELS[axis]).join('·')}.`
      : ' 서로 다른 보조 관점 세 가지가 관측되어도 핵심 근거 부재를 대신할 수 없습니다.'}`);
  }
  if (!snapshot.completeness.birthTimeKnown) {
    missing.unshift('출생시각 미상');
    missing.push('이 계산 정책에서 십신(T5) 전체가 미확정이므로 직업의 다중 근거 T8 해석을 보류합니다. 확정된 간지만 계산 사실로 표시합니다.');
  }
  const readingGuide = buildCareerMultifactorReadingGuide(primary, supporting, state);
  return {
    version: CAREER_MULTIFACTOR_REPORT_VERSION,
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    state,
    title: '나의 일과 역할 — 명식 구조 기반 해석',
    introduction: '실제 명식에서 관측된 서로 다른 십신 근거를 연결하여, 전통 명리에서 일을 읽는 구조적 관점을 정리했습니다. 심리 검사나 개인의 직업 운명을 확정하는 결과가 아닙니다.' +
      (snapshot.completeness.birthTimeKnown ? '' : ' ' + unknownHourCalculatedContext(snapshot)),
    sections: shown,
    additionalVerifiedSections,
    ...(readingGuide === undefined ? {} : { readingGuide }),
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
  const extraRows = report.additionalVerifiedSections.map(s => `<section><h3>${e(s.headline)}</h3><p>${e(s.paragraph)}</p><details><summary>근거와 출처</summary><p>${e(s.calculatedPositions.join(' · '))}</p><p>${e(s.calculatedFactPaths.join(' · '))}</p><p>${e(s.upstreamClaimIds.join(' · '))}</p><p>${e(s.sourceIds.join(' · '))}</p><p>${e(s.ruleId)}</p></details></section>`).join('\n');
  const additionalMarkup = extraRows.length === 0
    ? ''
    : `<aside aria-label="추가로 확인된 직업 관련 구조"><h2>추가로 확인된 직업 관련 구조</h2><p>아래는 실제 명식과 출처가 확인된 연구용 관찰입니다. 위의 최소 유효 풀이 판정에 새로운 해석 축으로 더하지 않으며, 직업 적성이나 성패를 확정하지 않습니다.</p>${extraRows}</aside>`;
  const readingGuideMarkup = report.readingGuide === undefined
    ? ''
    : `<section aria-label="직업운 읽기 요약"><h2>${e(report.readingGuide.title)}</h2><p>${e(report.readingGuide.paragraph)}</p></section>`;
  // A partial research result must explain the missing MUR evidence in the HTML,
  // not merely in the report object that downstream readers may never inspect.
  const stateLabel: Readonly<Record<Status, string>> = {
    complete: '연구 풀이 최소 근거 충족 · 제품 품질 검증 전',
    partial: '부분 풀이 · 원국 종합 근거 부족',
    insufficient: '풀이 보류 · 출생정보 또는 근거 부족',
  };
  const missingMarkup = report.missing.length > 0
    ? `<section aria-label="아직 설명할 수 없는 부분"><h2>아직 설명할 수 없는 부분</h2><ul>${report.missing.map(reason => `<li>${e(reason)}</li>`).join('')}</ul></section>`
    : '';
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${e(report.title)}</title><style>body{max-width:760px;margin:3em auto;padding:0 1.5em;font:17px/1.8 system-ui,sans-serif;color:#222}section{padding:1.2em 0;border-bottom:1px solid #ddd}small,details{color:#666}h2{font-size:1.2em}</style></head><body><header><h1>${e(report.title)}</h1><p>${e(report.introduction)}</p><p><strong>해석 상태: ${e(stateLabel[report.state])}</strong></p></header>${readingGuideMarkup}${rows || '<p>현재 출처로 뒷받침되는 종합 해석을 구성할 수 없습니다.</p>'}${additionalMarkup}${missingMarkup}<h2>해석 한계</h2>${report.limitations.map(t=>`<p><small>${e(t)}</small></p>`).join('')}<p>연구용 내부 미리보기 · 출판 및 판매 불가</p></body></html>`;
}
