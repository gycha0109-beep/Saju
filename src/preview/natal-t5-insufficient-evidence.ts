import type { CanonicalSajuSnapshot, PillarSlot } from '../contracts/calculation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import type { ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';

type Domain = 'general' | 'career' | 'business' | 'relationship';
type Channel = 'visible_stems' | 'branches';

export interface InsufficientNatalT5Evidence {
  status: 'source_matched_t5_only_without_domain_t8';
  domain: Domain;
  sourceQualifiedDomainT8Count: 0;
  observations: readonly {
    claimId: string;
    claimType: string;
    ruleId: string;
    sourceIds: readonly string[];
    channel: Channel;
    family: string;
    positions: readonly string[];
    factPaths: readonly string[];
  }[];
  researchOnly: true;
  mayPublish: false;
  maySell: false;
}

const FAMILIES: Readonly<Record<string, readonly string[]>> = {
  PEER: ['비견', '겁재'],
  RESOURCE: ['정인', '편인'],
  OUTPUT: ['식신', '상관'],
  WEALTH: ['정재', '편재'],
  OFFICER: ['정관', '편관'],
};
const CHANNELS: Readonly<Record<Channel, {
  positions: readonly PillarSlot[];
  key: 'stem' | 'branch';
}>> = {
  visible_stems: { positions: ['year', 'month', 'hour'], key: 'stem' },
  branches: { positions: ['year', 'month', 'day', 'hour'], key: 'branch' },
};
const POSITION_NAMES: Record<PillarSlot, string> = {
  year: '연주', month: '월주', day: '일주', hour: '시주',
};
function assert(condition: unknown, why: string): asserts condition {
  if (!condition) throw new TypeError('Unissued natal T8 source boundary: ' + why);
}

/**
 * For empty T8 research reports ONLY: expose the same chart's already-emitted,
 * source-matched T5 observations so an actual user sees why no composite
 * interpretation can be justified. This neither creates nor admits a T8.
 */
export function buildInsufficientNatalT5Evidence(
  domain: Domain,
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
): InsufficientNatalT5Evidence {
  assert(snapshot.completeness.birthTimeKnown &&
    snapshot.derivedFacts.tenGods.status === 'resolved' &&
    execution.run.snapshotId === snapshot.snapshotId &&
    execution.run.registrySnapshotId === registry.snapshot.registrySnapshotId &&
    execution.integrity.valid &&
    !execution.claims.some(claim => claim.state === 'active' &&
      claim.snapshotId === snapshot.snapshotId &&
      claim.taxonomy.tier === 'T8' &&
      claim.taxonomy.category === domain),
  'resolved exact chart, matched registry and no source-issued domain T8 required');
  const facts = snapshot.derivedFacts.tenGods;
  if (facts.status !== 'resolved') throw new TypeError('Ten Gods not resolved');
  const observations = execution.claims.flatMap(claim => {
    if (claim.state !== 'active' || claim.taxonomy.tier !== 'T5' ||
        claim.snapshotId !== snapshot.snapshotId) return [];
    const match = /^TEN_GOD_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u.exec(claim.claimType);
    if (!match) return [];
    const family = match[1]!;
    const channel: Channel = match[2] === 'VISIBLE_STEMS' ? 'visible_stems' : 'branches';
    const ruleId = 'RULE-GENERAL-NATAL-T5-' + family + '-' + match[2];
    const ruleRef = claim.ruleRefs[0];
    const rule = registry.rules.find(r =>
      r.ruleId === ruleId && r.version === ruleRef?.version);
    const evaluation = execution.evaluations.find(e =>
      e.evaluationId === ruleRef?.evaluationId);
    assert(claim.ruleRefs.length === 1 && ruleRef?.ruleId === ruleId &&
      rule?.status === 'research' && rule.output.claimType === claim.claimType &&
      evaluation?.status === 'matched' &&
      evaluation.emittedClaimIds.includes(claim.claimId) &&
      claim.factRefs.includes('derivedFacts.tenGods') &&
      claim.sourceRefs.length > 0 &&
      claim.sourceRefs.every(id => registry.sources.some(s => s.sourceId === id)) &&
      rule.sourceRefs.every(source => claim.sourceRefs.includes(source.sourceId)),
    'T5 observations must be issued by the matching rule and registered sources');
    const definition = CHANNELS[channel];
    const positions = definition.positions.flatMap(slot => {
      const value = facts.value[slot][definition.key];
      if (value?.status !== 'resolved' || !FAMILIES[family]!.includes(value.value)) return [];
      return [{
        label: POSITION_NAMES[slot] + ' ' +
          (definition.key === 'stem' ? '천간' : '지지 대표 십신') + ' ' + value.value,
        path: 'derivedFacts.tenGods.value.' + slot + '.' + definition.key + '.value',
      }];
    });
    assert(positions.length > 0 &&
      new Set(positions.map(item => item.path)).size === positions.length,
    'an emitted T5 must match existing Canonical observation paths');
    return [{
      claimId: claim.claimId,
      claimType: claim.claimType,
      ruleId,
      sourceIds: [...claim.sourceRefs],
      channel,
      family: family.toLowerCase(),
      positions: positions.map(item => item.label),
      factPaths: positions.map(item => item.path),
    }];
  }).sort((a, b) => a.claimType.localeCompare(b.claimType));
  return {
    status: 'source_matched_t5_only_without_domain_t8',
    domain,
    sourceQualifiedDomainT8Count: 0,
    observations,
    researchOnly: true,
    mayPublish: false,
    maySell: false,
  };
}
