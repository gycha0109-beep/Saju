import type {
  CanonicalSajuSnapshot,
  PillarSlot,
  StemInteractionSettlementFact,
} from '../contracts/calculation.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import type { InterpretationExecutionResult } from './interpretation-engine.js';
import { deterministicContentHash } from './rule-registry.js';

export const GENERAL_NATAL_C2_SETTLEMENT_BINDING_VERSION = 'ws-c2-position-settlement-v1' as const;

export interface GeneralNatalC2SettlementWitness {
  readonly settlementId: string;
  readonly relationId: string;
  readonly participantRole: 'controller' | 'controlled';
  readonly pillar: PillarSlot;
  readonly stem: StemInteractionSettlementFact['participants']['controller']['stem'];
  readonly tenGod: StemInteractionSettlementFact['participants']['controller']['tenGod'];
  readonly functionState: StemInteractionSettlementFact['participants']['controller']['functionState'];
  readonly t5ClaimId: string;
  readonly factRef: string;
  readonly source: 'canonical_calculation_settlement';
  readonly interpretationOutcomeAuthorized: false;
}

export type GeneralNatalC2SettlementBinding =
  | {
      readonly status: 'unavailable';
      readonly reason: 'SNAPSHOT_MISMATCH' | 'SETTLEMENT_FACT_NOT_RESOLVED' | 'POSITION_CLAIM_MISSING_OR_INCONSISTENT';
      readonly witnesses: readonly [];
    }
  | {
      readonly status: 'resolved';
      readonly snapshotId: string;
      readonly version: typeof GENERAL_NATAL_C2_SETTLEMENT_BINDING_VERSION;
      readonly witnesses: readonly GeneralNatalC2SettlementWitness[];
      readonly contentHash: string;
      readonly interpretationOutcomeAuthorized: false;
    };

function findExactPositionClaim(
  claims: readonly InterpretationClaim[],
  pillar: PillarSlot,
  tenGod: string,
): InterpretationClaim | undefined {
  const path = `derivedFacts.tenGods.${pillar}.stem`;
  const family = tenGod === '비견' || tenGod === '겁재' ? 'PEER'
    : tenGod === '정인' || tenGod === '편인' ? 'RESOURCE'
    : tenGod === '식신' || tenGod === '상관' ? 'OUTPUT'
    : tenGod === '정재' || tenGod === '편재' ? 'WEALTH'
    : tenGod === '정관' || tenGod === '편관' ? 'OFFICER' : undefined;
  if (family === undefined) return undefined;
  const type = `TEN_GOD_${family}_VISIBLE_STEMS_THEME`;
  const matches = claims.filter((claim) =>
    claim.claimType === type &&
    claim.snapshotId.length > 0 &&
    claim.factRefs.length === 1 &&
    claim.factRefs[0] === path &&
    claim.taxonomy.tier === 'T5' &&
    claim.taxonomy.category === 'ten_gods' &&
    claim.state === 'active'
  );
  return matches.length === 1 ? matches[0] : undefined;
}

/**
 * Binds canonical non-day visible-stem settlement observations to the
 * already-executed exact-position T5 Claim. This is observational provenance,
 * never a T6 causal judgment or a new T8 semantic/Production authority.
 * Fail closed if even one settlement participant cannot be bound.
 */
export function bindGeneralNatalC2Settlements(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
): GeneralNatalC2SettlementBinding {
  if (
    execution.run.snapshotId !== snapshot.snapshotId ||
    execution.claims.some((claim) => claim.snapshotId !== snapshot.snapshotId)
  ) {
    return { status: 'unavailable', reason: 'SNAPSHOT_MISMATCH', witnesses: [] };
  }
  const fact = snapshot.derivedFacts.stemInteractionSettlements;
  if (fact?.status !== 'resolved') {
    return { status: 'unavailable', reason: 'SETTLEMENT_FACT_NOT_RESOLVED', witnesses: [] };
  }

  const result: GeneralNatalC2SettlementWitness[] = [];
  for (const settlement of fact.value) {
    for (const role of ['controller', 'controlled'] as const) {
      const person = settlement.participants[role];
      const path = `derivedFacts.tenGods.${person.pillar}.stem`;
      const chartTenGods = snapshot.derivedFacts.tenGods;
      const exact = chartTenGods.status === 'resolved'
        ? person.pillar === 'year' ? chartTenGods.value.year.stem
          : person.pillar === 'month' ? chartTenGods.value.month.stem
          : person.pillar === 'hour' ? chartTenGods.value.hour.stem
          : undefined
        : undefined;
      const claim = findExactPositionClaim(execution.claims, person.pillar, person.tenGod);
      if (
        person.pillar === 'day' ||
        exact?.status !== 'resolved' ||
        exact.value !== person.tenGod ||
        claim === undefined
      ) {
        return {
          status: 'unavailable',
          reason: 'POSITION_CLAIM_MISSING_OR_INCONSISTENT',
          witnesses: [],
        };
      }
      result.push({
        settlementId: settlement.settlementId,
        relationId: settlement.relationId,
        participantRole: role,
        pillar: person.pillar,
        stem: person.stem,
        tenGod: person.tenGod,
        functionState: person.functionState,
        t5ClaimId: claim.claimId,
        factRef: path,
        source: 'canonical_calculation_settlement',
        interpretationOutcomeAuthorized: false,
      });
    }
  }
  const witnesses = result.sort((a, b) =>
    a.settlementId.localeCompare(b.settlementId) ||
    a.participantRole.localeCompare(b.participantRole),
  );
  return {
    status: 'resolved',
    snapshotId: snapshot.snapshotId,
    version: GENERAL_NATAL_C2_SETTLEMENT_BINDING_VERSION,
    witnesses,
    contentHash: deterministicContentHash({
      snapshotId: snapshot.snapshotId,
      version: GENERAL_NATAL_C2_SETTLEMENT_BINDING_VERSION,
      witnesses,
    }),
    interpretationOutcomeAuthorized: false,
  };
}
