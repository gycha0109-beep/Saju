import type {
  CanonicalSajuSnapshot,
  PillarSlot,
  StemInteractionSettlementFact,
  TenGod,
} from '../contracts/calculation.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import type { InterpretationExecutionResult } from './interpretation-engine.js';
import { deterministicContentHash } from './rule-registry.js';

export const GENERAL_NATAL_STEM_INTERACTION_WITNESS_VERSION = '0.1.0-research' as const;

export interface GeneralNatalStemInteractionWitness {
  readonly witnessId: string;
  readonly snapshotId: string;
  readonly claimId: string;
  readonly settlementId: string;
  readonly pairControlEffective: boolean;
  readonly relationId: string;
  readonly sourceFactRef: string;
  readonly participantRole: 'controller' | 'controlled';
  readonly pillar: PillarSlot;
  readonly tenGod: TenGod;
  readonly functionState: StemInteractionSettlementFact['participants']['controller']['functionState']
    | StemInteractionSettlementFact['participants']['controlled']['functionState'];
  readonly transformationApplied: false;
  readonly semanticScope: 'structural_provenance_only';
  readonly t6EffectClaimAuthorized: false;
  readonly consumerProjectionAuthorized: false;
}

function exactStemLocation(claim: InterpretationClaim): PillarSlot | undefined {
  if (
    claim.taxonomy.tier !== 'T5' ||
    claim.taxonomy.category !== 'ten_gods' ||
    claim.predicate !== 'ten_god_theme' ||
    claim.factRefs.length !== 1
  ) return undefined;
  const ref = claim.factRefs[0];
  if (ref === undefined) return undefined;
  const match = /^derivedFacts\.tenGods\.(year|month|hour)\.stem$/u.exec(ref);
  return match?.[1] as PillarSlot | undefined;
}

/**
 * Join existing exact-position T5 claims to the *already settled* visible-stem
 * canonical pair without inventing a fresh T6 effect or position-based verdict.
 * An unresolved settlement fact is not equivalent to 'no interaction'.
 * This is internal provenance only, not a new consumer reading claim.
 */
export function bindGeneralNatalStemInteractionWitnesses(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
): readonly GeneralNatalStemInteractionWitness[] {
  if (execution.run.snapshotId !== snapshot.snapshotId || execution.run.snapshotHash !== snapshot.calculationHash) {
    throw new Error('WS_C2_SNAPSHOT_MISMATCH');
  }
  if (!execution.integrity.valid) throw new Error('WS_C2_CLAIM_GRAPH_INVALID');
  if (execution.claims.some((claim) => claim.snapshotId !== snapshot.snapshotId)) {
    throw new Error('WS_C2_CLAIM_SNAPSHOT_MISMATCH');
  }
  const settlements = snapshot.derivedFacts.stemInteractionSettlements;
  if (settlements?.status !== 'resolved') return [];
  const structuralRelations = snapshot.derivedFacts.structuralRelations;
  if (structuralRelations?.status !== 'resolved' || snapshot.derivedFacts.tenGods.status !== 'resolved') {
    throw new Error('WS_C2_CANONICAL_FACT_MISMATCH');
  }
  for (const item of settlements.value) {
    const relations = structuralRelations.value.filter((relation) =>
      relation.relationId === item.relationId && relation.kind === 'stem_five_combination'
    );
    if (relations.length !== 1 || item.kind !== 'stem_five_combination' || item.transformationApplied !== false) {
      throw new Error('WS_C2_SETTLEMENT_RELATION_MISMATCH');
    }
    const expected = relations[0]!.participants.map((participant) =>
      participant.pillar + ':' + participant.component + ':' + participant.value
    ).sort();
    const actual = (['controller', 'controlled'] as const).map((role) => {
      const participant = item.participants[role];
      return participant.pillar + ':stem:' + participant.stem;
    }).sort();
    if (expected.length !== 2 || expected.some((value, index) => value !== actual[index])) {
      throw new Error('WS_C2_SETTLEMENT_PARTICIPANT_MISMATCH');
    }
  }
  const witness: GeneralNatalStemInteractionWitness[] = [];
  for (const claim of execution.claims) {
    if (claim.snapshotId !== snapshot.snapshotId || claim.state !== 'active') continue;
    const pillar = exactStemLocation(claim);
    if (pillar === undefined) continue;
    const canonicalPosition = snapshot.derivedFacts.tenGods;
    if (canonicalPosition.status !== 'resolved') continue;
    const fact = canonicalPosition.value[pillar].stem;
    if (fact?.status !== 'resolved') continue;
    const family = claim.value as { family?: string; channel?: string };
    if (family?.channel !== 'visible_stems') continue;
    const godFamily: Readonly<Record<TenGod, string>> = {
      비견: 'peer', 겁재: 'peer',
      식신: 'output', 상관: 'output',
      편재: 'wealth', 정재: 'wealth',
      편관: 'officer', 정관: 'officer',
      편인: 'resource', 정인: 'resource',
    };
    if (
      family.family !== godFamily[fact.value as TenGod] ||
      claim.claimType !== 'TEN_GOD_' + family.family.toUpperCase() + '_VISIBLE_STEMS_THEME' ||
      claim.taxonomy.subcategory !== family.family + '_visible_stems' ||
      !claim.ruleRefs.some((ref) => ref.ruleId.endsWith('-POSITION-' + pillar.toUpperCase() + '-STEM'))
    ) continue;
    for (const item of settlements.value) {
      for (const role of ['controller', 'controlled'] as const) {
        const participant = item.participants[role];
        if (participant.pillar !== pillar || participant.tenGod !== fact.value) continue;
        if (participant.identityPreserved !== true) throw new Error('WS_C2_SETTLEMENT_PARTICIPANT_MISMATCH');
        if (snapshot.pillars[pillar].status !== 'resolved') continue;
        const stem = snapshot.pillars[pillar];
        if (stem.status !== 'resolved' || stem.value.stem.value !== participant.stem) continue;
        const material = {
          snapshotId: snapshot.snapshotId,
          claimId: claim.claimId,
          settlementId: item.settlementId,
          role,
          sourceFactRef: claim.factRefs[0],
        };
        witness.push(Object.freeze({
          witnessId: `witness_${deterministicContentHash(material).slice(0, 24)}`,
          snapshotId: snapshot.snapshotId,
          claimId: claim.claimId,
          settlementId: item.settlementId,
          pairControlEffective: item.pairControlEffective,
          relationId: item.relationId,
          sourceFactRef: claim.factRefs[0]!,
          participantRole: role,
          pillar,
          tenGod: participant.tenGod,
          functionState: participant.functionState,
          transformationApplied: false,
          semanticScope: 'structural_provenance_only',
          t6EffectClaimAuthorized: false,
          consumerProjectionAuthorized: false,
        }));
      }
    }
  }
  for (const item of settlements.value) {
    for (const role of ['controller', 'controlled'] as const) {
      const matches = witness.filter((entry) => entry.settlementId === item.settlementId &&
        entry.participantRole === role);
      if (matches.length !== 1) throw new Error('WS_C2_POSITION_T5_NOT_UNIQUE');
    }
  }
  return Object.freeze(witness.sort((a, b) => a.witnessId.localeCompare(b.witnessId)));
}
