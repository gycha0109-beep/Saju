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
  if (execution.run.snapshotId !== snapshot.snapshotId) {
    throw new Error('WS_C2_SNAPSHOT_MISMATCH');
  }
  const settlements = snapshot.derivedFacts.stemInteractionSettlements;
  if (settlements?.status !== 'resolved') return [];
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
    for (const item of settlements.value) {
      for (const role of ['controller', 'controlled'] as const) {
        const participant = item.participants[role];
        if (participant.pillar !== pillar || participant.tenGod !== fact.value) continue;
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
  return Object.freeze(witness.sort((a,b)=>a.witnessId.localeCompare(b.witnessId)));
}
