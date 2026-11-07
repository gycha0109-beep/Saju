import type { CanonicalSajuSnapshot, PillarSlot } from '../contracts/calculation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import type { ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';

type Channel = 'visible_stems' | 'branches';
type Family = 'peer' | 'resource' | 'output' | 'wealth' | 'officer';
const FAMILIES: Readonly<Record<Family, readonly string[]>> = {
  peer: ['비견', '겁재'], resource: ['정인', '편인'],
  output: ['식신', '상관'], wealth: ['정재', '편재'],
  officer: ['정관', '편관'],
};
const SLOTS: Readonly<Record<PillarSlot, string>> = {
  year: '연주', month: '월주', day: '일주', hour: '시주',
};

export interface NatalExistingT5SourceContext {
  /** Existing T5 is not a General T8 synthesis nor any domain's future reading. */
  wholeChartSynthesisAuthorized: false;
  title: string;
  paragraph: string;
  themes: readonly {
    claimId: string;
    claimType: string;
    headline: string;
    summary: string;
    sourceIds: readonly string[];
    ruleIds: readonly string[];
    methodologyId: string;
    observedPositions: readonly string[];
    observedFactPaths: readonly string[];
  }[];
}

export function buildNatalExistingT5SourceContext(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
  alreadyConsumedT5ClaimIds: readonly string[] = [],
  hasSelectedPartialCore = false,
): NatalExistingT5SourceContext | undefined {
  const facts = snapshot.derivedFacts.tenGods;
  if (!snapshot.completeness.birthTimeKnown || facts.status !== 'resolved') return undefined;
  if (!execution.integrity.valid || execution.run.snapshotId !== snapshot.snapshotId ||
      execution.run.snapshotHash !== snapshot.calculationHash || execution.run.status === 'failed' ||
      execution.run.registrySnapshotId !== registry.snapshot.registrySnapshotId ||
      execution.run.packRef.id !== registry.pack.packId ||
      execution.run.packRef.version !== registry.pack.version ||
      registry.pack.status !== 'research') {
    throw new TypeError('Existing T5 source context requires the exact validated natal execution.');
  }
  const themes: NatalExistingT5SourceContext['themes'][number][] = [];
  const consumed = new Set(alreadyConsumedT5ClaimIds);
  for (const claim of execution.claims) {
    if (consumed.has(claim.claimId)) continue;
    if (claim.state !== 'active' || claim.snapshotId !== snapshot.snapshotId ||
        claim.scenarioRef !== undefined || claim.taxonomy.tier !== 'T5' ||
        claim.predicate !== 'ten_god_theme' || claim.sourceRefs.length === 0 ||
        claim.ruleRefs.length === 0 || !claim.methodologyRef.id) continue;
    const match = /^TEN_GOD_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u
      .exec(claim.claimType);
    if (!match) continue;
    const family = match[1]!.toLowerCase() as Family;
    const channel = match[2]!.toLowerCase() as Channel;
    const value = claim.value as Record<string, unknown>;
    if (value.family !== family || value.channel !== channel ||
        value.fortunePolarity !== 'not_determined' || value.dominance !== 'not_scored' ||
        typeof value.headline !== 'string' || value.headline.length === 0 ||
        typeof value.summary !== 'string' || value.summary.length === 0) {
      throw new TypeError('T5 partial source context contains an unauthorized meaning.');
    }
    // A reported T5 theme must be the ORIGINAL result of a matched research
    // rule, its registered semantic copy, method and source. An active Claim
    // with a plausible name alone is not enough to authorize interpretation.
    const ruleRef = claim.ruleRefs[0];
    const rule = registry.rules.find(item =>
      item.ruleId === ruleRef?.ruleId && item.version === ruleRef.version);
    const evaluation = execution.evaluations.find(item =>
      item.evaluationId === ruleRef?.evaluationId);
    const method = registry.methodologies.find(item =>
      item.methodologyId === claim.methodologyRef.id &&
      item.version === claim.methodologyRef.version);
    const registeredMeaning = rule?.output.value as Record<string, unknown> | undefined;
    const allowedSources = new Set(rule?.sourceRefs.map(ref => ref.sourceId) ?? []);
    if (claim.ruleRefs.length !== 1 || rule === undefined ||
        rule.status !== 'research' || rule.taxonomy.tier !== 'T5' ||
        rule.taxonomy.category !== 'ten_gods' ||
        rule.output.claimType !== claim.claimType ||
        rule.output.predicate !== claim.predicate ||
        rule.output.subject !== claim.subject ||
        rule.methodologyRef.id !== claim.methodologyRef.id ||
        rule.methodologyRef.version !== claim.methodologyRef.version ||
        registeredMeaning?.family !== family ||
        registeredMeaning?.channel !== channel ||
        registeredMeaning?.headline !== value.headline ||
        registeredMeaning?.summary !== value.summary ||
        method?.status !== 'research' ||
        !method.sourceIds.every(id => allowedSources.has(id)) ||
        evaluation?.status !== 'matched' ||
        evaluation.snapshotId !== snapshot.snapshotId ||
        evaluation.scenarioRef !== undefined ||
        evaluation.ruleRef.id !== ruleRef?.ruleId ||
        evaluation.ruleRef.version !== ruleRef?.version ||
        evaluation.interpretationPackRef.id !== registry.pack.packId ||
        evaluation.interpretationPackRef.version !== registry.pack.version ||
        !evaluation.emittedClaimIds.includes(claim.claimId) ||
        allowedSources.size === 0 ||
        claim.sourceRefs.length !== allowedSources.size ||
        !claim.sourceRefs.every(id => allowedSources.has(id) &&
          registry.sources.some(source => source.sourceId === id))) {
      throw new TypeError('T5 partial meaning lacks its executed registered rule, method, source or original copy.');
    }
    const key = channel === 'visible_stems' ? 'stem' : 'branch';
    const slots: readonly PillarSlot[] = channel === 'visible_stems'
      ? ['year', 'month', 'hour'] : ['year', 'month', 'day', 'hour'];
    const observed = slots.flatMap(slot => {
      const fact = facts.value[slot][key];
      if (fact?.status !== 'resolved' || !FAMILIES[family].includes(fact.value)) return [];
      return [{
        position: SLOTS[slot] + (key === 'stem' ? ' 천간 ' : ' 지지 대표 십신 ') + fact.value,
        path: 'derivedFacts.tenGods.value.' + slot + '.' + key + '.value',
      }];
    });
    if (observed.length === 0) {
      throw new TypeError('T5 source context has no matching Canonical chart position.');
    }
    themes.push({
      claimId: claim.claimId, claimType: claim.claimType,
      headline: value.headline, summary: value.summary,
      sourceIds: [...claim.sourceRefs],
      ruleIds: claim.ruleRefs.map(ref => ref.ruleId),
      methodologyId: claim.methodologyRef.id,
      observedPositions: observed.map(x => x.position),
      observedFactPaths: observed.map(x => x.path),
    });
  }
  if (themes.length === 0) return undefined;
  themes.sort((a,b) => a.claimType.localeCompare(b.claimType));
  // Distinct executed T5 claims can share exactly the same registered Korean
  // meaning across chart observation channels. Preserve every claim's title
  // and calculated position, but print identical source-owned prose only once.
  const displayedSummaries = new Set<string>();
  const sourceBoundObservations = themes.map(theme => {
    const firstMeaning = !displayedSummaries.has(theme.summary);
    displayedSummaries.add(theme.summary);
    return '‘' + theme.headline + '’ — ' + theme.observedPositions.join(' · ') +
      '에서 확인된 범위입니다.' + (firstMeaning ? ' ' + theme.summary : '');
  });
  return {
    wholeChartSynthesisAuthorized: false,
    title: hasSelectedPartialCore
      ? '총운 중심 부분풀이와 구별되는 기존 십신 관점'
      : '원국 종합 결론이 없을 때 확인된 기존 십신 부분 해석',
    paragraph: (hasSelectedPartialCore
      ? '이번 명식에는 출처가 확인된 총운 중심 부분풀이가 있지만 독립 보조 근거가 아직 부족합니다. '
      : '이번 명식에는 전체 원국의 복합 해석을 승인할 독립 근거가 부족합니다. ') +
      '아래에는 이미 실행된 십신 주제의 원래 한국어 설명과 실제 계산 위치만 보여줍니다. ' +
      sourceBoundObservations.join(' ') +
      (hasSelectedPartialCore
        ? ' 이 십신 관점은 중심 부분풀이에 쓰인 계산 근거를 반복하지 않으며, 부족한 독립 보조 복합 해석을 대신하지 않습니다.'
        : '') +
      ' 서로 다른 주제가 함께 있다는 사실만으로 그 관계나 개인의 성격·사건·운세 결과를 새로 추론하지 않습니다.',
    themes,
  };
}
