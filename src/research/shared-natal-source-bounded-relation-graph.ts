import type { CanonicalSajuSnapshot, TenGod } from '../contracts/calculation.js';
import { runInterpretation } from '../interpretation/interpretation-engine.js';
import {
  createSharedNatalStructuralSynthesisRegistry,
  SHARED_NATAL_STRUCTURAL_CLAIM_PREFIX,
} from './shared-natal-structural-synthesis-candidate.js';
import {
  buildNatalN22ChartRelationGuide,
  type NatalN22ChartRelationGuide,
} from './general-natal-chart-relation-guide.js';

/**
 * Additional source-owned structural relations are admitted only into the
 * existing Research Claim Graph. N13/N14/N20/N22 explicitly forbid
 * consumer projection: this module MUST NOT be used as a Preview or
 * production reading source.
 */
export const SHARED_NATAL_SOURCE_BOUND_RELATION_GRAPH_VERSION =
  '0.1.0-internal-research-only' as const;

export interface SourceBoundedRelationContextWitness {
  kind: 'individual' | 'linked' | 'mixed';
  identity: string;
  sourceClaimIds: readonly string[];
  observedFactPaths: readonly string[];
  sourceIds: readonly string[];
  /** Directly overlapping T0 Ten-God fact paths, not a semantic conclusion. */
  overlappingSharedT8: readonly {
    sharedT8ClaimId: string;
    sharedT8RuleId: string;
    observedFactPaths: readonly string[];
  }[];
  newInterpretationAuthorized: false;
  consumerProjectionAuthorized: false;
}

export interface SharedNatalSourceBoundedRelationGraph {
  version: typeof SHARED_NATAL_SOURCE_BOUND_RELATION_GRAPH_VERSION;
  snapshotId: string;
  calculationHash: string;
  relationGuide: NatalN22ChartRelationGuide;
  contextWitnesses: readonly SourceBoundedRelationContextWitness[];
  actualN13T8ClaimIds: readonly string[];
  actualSharedStructuralT8ClaimIds: readonly string[];
  researchOnly: true;
  mayPublish: false;
  maySell: false;
  mayCallOfficial: false;
  mayProjectToPreview: false;
}

type Family = 'peer' | 'resource' | 'output' | 'wealth' | 'officer';
const FAMILY_MEMBERS: Readonly<Record<Family, readonly TenGod[]>> = {
  peer: ['비견','겁재'], resource: ['편인','정인'],
  output: ['식신','상관'], wealth: ['편재','정재'],
  officer: ['편관','정관'],
};
function actualT5FactPaths(
  snapshot: CanonicalSajuSnapshot,
  claimType: string,
): readonly string[] {
  const match = /^TEN_GOD_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u.exec(claimType);
  assert(match !== null, 'unrecognized source-owned Ten-God T5 theme');
  const family = match[1]!.toLowerCase() as Family;
  const channel = match[2]!;
  const value = snapshot.derivedFacts.tenGods;
  assert(value.status === 'resolved', 'T5 theme cannot bind unresolved Ten-God positions');
  const slots = ['year','month','day','hour'] as const;
  const positions: string[] = [];
  for(const slot of slots){
    for(const component of (channel === 'VISIBLE_STEMS' ? ['stem'] as const : ['branch'] as const)){
      if(channel === 'VISIBLE_STEMS' && slot === 'day')continue;
      const observation = value.value[slot][component];
      if(observation?.status === 'resolved' &&
        FAMILY_MEMBERS[family].some(member => member === observation.value)){
        positions.push('derivedFacts.tenGods.'+slot+'.'+component);
      }
    }
  }
  assert(positions.length > 0, 'T5 source Claim has no actual same-family position');
  return positions;
}
function assert(condition: unknown, reason: string): asserts condition {
  if (!condition) throw new TypeError('Source-bounded natal graph: ' + reason);
}

/**
 * Reuses the existing shared N13/T2/T5/T8 registry, its real matched
 * evaluation, and N22's already reviewed research-only projection boundary.
 * It neither re-computes the chart nor creates another semantic authority.
 */
export function buildSharedNatalSourceBoundedRelationGraph(
  snapshot: CanonicalSajuSnapshot,
  options: { requestId?: string; now?: Date } = {},
): SharedNatalSourceBoundedRelationGraph {
  const registry = createSharedNatalStructuralSynthesisRegistry();
  const execution = runInterpretation(snapshot, registry, {
    requestId: options.requestId ?? 'shared-natal-source-bounded-research',
    now: options.now ?? new Date('2026-10-25T00:00:00.000Z'),
  });
  assert(registry.pack.status === 'research' && execution.integrity.valid &&
    execution.run.snapshotId === snapshot.snapshotId &&
    execution.run.snapshotHash === snapshot.calculationHash,
    'actual interpretation execution failed or was not from the canonical snapshot');

  const guide = buildNatalN22ChartRelationGuide(snapshot, execution, registry);
  assert(guide.lifecycle === 'internal_research_only' &&
    guide.snapshotId === snapshot.snapshotId &&
    guide.calculationHash === snapshot.calculationHash &&
    !guide.mayPublish && !guide.maySell && !guide.mayAddProductInterpretation,
  'N22 research/consumer authority boundary was violated');

  const byId = new Map(execution.claims.map(claim => [claim.claimId, claim]));
  assert(byId.size === execution.claims.length, 'duplicate same-snapshot Claim IDs');

  const shared = execution.claims.filter(claim =>
    claim.state === 'active' && claim.taxonomy.tier === 'T8' &&
    claim.taxonomy.category === 'general' &&
    claim.claimType.startsWith(SHARED_NATAL_STRUCTURAL_CLAIM_PREFIX));

  const witnesses = shared.map(claim => {
    const upstream = claim.upstreamClaimRefs.map(id => byId.get(id));
    assert(upstream.length >= 3 && upstream.every(x =>
      x?.state === 'active' && x.snapshotId === snapshot.snapshotId),
    'shared T8 lacks exact source-owned upstream Claims');
    const themes = upstream.filter(x =>
      /^TEN_GOD_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u.test(x!.claimType));
    assert(themes.length === 1 && themes[0]!.factRefs.includes('derivedFacts.tenGods'),
      'shared contextual T8 must consume one source-owned T5 theme with canonical fact lineage');
    // The original Claim references the entire tenGods fact; identify the
    // precise observed positions through its source-owned family predicate.
    const facts = [...actualT5FactPaths(snapshot,themes[0]!.claimType)].sort();
    return { claimId: claim.claimId, ruleId: claim.ruleRefs[0]?.ruleId,
      observedFactPaths: facts };
  });

  const relations = [
    ...guide.individualRelations, ...guide.linkedRelations, ...guide.mixedRelations,
  ];
  const contextWitnesses: SourceBoundedRelationContextWitness[] = relations.map(relation => {
    const paths = new Set(relation.calculatedFactPaths);
    assert(relation.researchOnly && !relation.realLifeOutcomeInferred &&
      relation.claimIds.length >= 3 && paths.size > 0 &&
      relation.sourceLocators.length >= 2,
    'N22 relation not source-bounded to actual observed Ten-God paths');
    const upstream = relation.claimIds.map(id => byId.get(id));
    assert(upstream.every(claim => claim?.state === 'active' &&
      claim.snapshotId === snapshot.snapshotId),
    'N22 research relation references missing current-graph Claims');
    const overlap = witnesses.flatMap(witness => {
      const common = witness.observedFactPaths.filter(path => paths.has(path));
      return common.length && witness.ruleId ? [{
        sharedT8ClaimId: witness.claimId,
        sharedT8RuleId: witness.ruleId,
        observedFactPaths: common,
      }] : [];
    });
    return {
      kind: relation.kind, identity: relation.identity,
      sourceClaimIds: [...relation.claimIds],
      observedFactPaths: [...paths].sort(),
      sourceIds: [...new Set(relation.sourceLocators.map(x => x.sourceId))].sort(),
      overlappingSharedT8: overlap,
      newInterpretationAuthorized: false, consumerProjectionAuthorized: false,
    };
  });

  return {
    version: SHARED_NATAL_SOURCE_BOUND_RELATION_GRAPH_VERSION,
    snapshotId: snapshot.snapshotId, calculationHash: snapshot.calculationHash,
    relationGuide: guide, contextWitnesses,
    actualN13T8ClaimIds: execution.claims
      .filter(x => x.state === 'active' && x.taxonomy.tier === 'T8' &&
        x.taxonomy.subcategory === 'source_bounded_relation')
      .map(x => x.claimId),
    actualSharedStructuralT8ClaimIds: shared.map(x => x.claimId),
    researchOnly: true, mayPublish: false, maySell: false,
    mayCallOfficial: false, mayProjectToPreview: false,
  };
}
