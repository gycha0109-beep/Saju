import type {
  CanonicalSajuSnapshot,
  PillarSlot,
  StemInteractionFunctionState,
  StemInteractionSettlementFact,
  TenGod,
} from '../contracts/calculation.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import type { InterpretationExecutionResult } from './interpretation-engine.js';
import type { GeneralNatalThemeFamily } from '../research/general-natal-useful-reading-candidate.js';

export const GENERAL_NATAL_C2_STEM_SETTLEMENT_LINK_VERSION =
  'myeonghwa-general-natal-c2-stem-settlement-link-v1' as const;

type VisibleStemSlot = Exclude<PillarSlot, 'day'>;
type StemRole = 'controller' | 'controlled';

const FAMILY_BY_GOD: Readonly<Record<TenGod, GeneralNatalThemeFamily>> = Object.freeze({
  비견: 'peer',
  겁재: 'peer',
  식신: 'output',
  상관: 'output',
  편재: 'wealth',
  정재: 'wealth',
  편관: 'officer',
  정관: 'officer',
  편인: 'resource',
  정인: 'resource',
});

export interface GeneralNatalC2SettlementParticipantEvidence {
  readonly role: StemRole;
  readonly pillar: VisibleStemSlot;
  readonly tenGod: TenGod;
  readonly factRef: string;
  readonly t5ClaimId: string;
  readonly functionState: StemInteractionFunctionState;
}

export interface GeneralNatalC2StemSettlementEvidence {
  readonly schemaVersion: typeof GENERAL_NATAL_C2_STEM_SETTLEMENT_LINK_VERSION;
  readonly snapshotId: string;
  readonly settlementId: string;
  readonly relationId: string;
  readonly structuralFactRef: 'derivedFacts.stemInteractionSettlements';
  readonly upstreamT5ClaimIds: readonly [string, string];
  readonly participants: readonly [
    GeneralNatalC2SettlementParticipantEvidence,
    GeneralNatalC2SettlementParticipantEvidence,
  ];
  readonly transformationApplied: false;
  readonly pairControlEffective: boolean;
  readonly interpretationEffectAuthorized: false;
  readonly consumerProjectionAuthorized: false;
  readonly semanticScope: 'canonical_structural_settlement_only';
}

export type GeneralNatalC2StemSettlementLinkResult =
  | { readonly status: 'resolved'; readonly evidence: readonly GeneralNatalC2StemSettlementEvidence[] }
  | {
      readonly status: 'unavailable';
      readonly reason:
        | 'CALCULATION_INTERPRETATION_SNAPSHOT_MISMATCH'
        | 'CLAIM_GRAPH_INTEGRITY_FAILED'
        | 'CANONICAL_STEM_SETTLEMENT_UNRESOLVED'
        | 'CANONICAL_TEN_GODS_UNRESOLVED'
        | 'SETTLEMENT_RELATION_MISMATCH'
        | 'SETTLEMENT_PARTICIPANT_MISMATCH'
        | 'EXACT_POSITION_T5_WITNESS_MISSING_OR_DUPLICATED';
    };

function isVisibleStemSlot(value: PillarSlot): value is VisibleStemSlot {
  return value === 'year' || value === 'month' || value === 'hour';
}

function matchingPositionClaim(
  snapshotId: string,
  claims: readonly InterpretationClaim[],
  pillar: VisibleStemSlot,
  tenGod: TenGod,
): InterpretationClaim | undefined {
  const factRef = `derivedFacts.tenGods.${pillar}.stem`;
  const family = FAMILY_BY_GOD[tenGod];
  const matches = claims.filter((claim) => {
    if (
      claim.snapshotId !== snapshotId ||
      claim.state !== 'active' ||
      claim.taxonomy.tier !== 'T5' ||
      claim.taxonomy.category !== 'ten_gods' ||
      claim.claimType !== `TEN_GOD_${family.toUpperCase()}_VISIBLE_STEMS_THEME` ||
      claim.factRefs.length !== 1 ||
      claim.factRefs[0] !== factRef
    ) return false;
    const value = claim.value;
    return (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value) &&
      'family' in value &&
      value.family === family &&
      'channel' in value &&
      value.channel === 'visible_stems'
    );
  });
  return matches.length === 1 ? matches[0] : undefined;
}

function bindParticipant(
  snapshot: CanonicalSajuSnapshot,
  claims: readonly InterpretationClaim[],
  settlement: StemInteractionSettlementFact,
  role: StemRole,
): GeneralNatalC2SettlementParticipantEvidence | undefined {
  const participant = settlement.participants[role];
  if (!isVisibleStemSlot(participant.pillar)) return undefined;
  const pillar = snapshot.pillars[participant.pillar];
  const tenGods = snapshot.derivedFacts.tenGods;
  if (pillar.status !== 'resolved' || tenGods.status !== 'resolved') return undefined;
  const exactGod = tenGods.value[participant.pillar].stem;
  if (
    pillar.value.stem.value !== participant.stem ||
    exactGod?.status !== 'resolved' ||
    exactGod.value !== participant.tenGod ||
    participant.identityPreserved !== true
  ) return undefined;
  const claim = matchingPositionClaim(
    snapshot.snapshotId,
    claims,
    participant.pillar,
    participant.tenGod,
  );
  if (claim === undefined) return undefined;
  return {
    role,
    pillar: participant.pillar,
    tenGod: participant.tenGod,
    factRef: `derivedFacts.tenGods.${participant.pillar}.stem`,
    t5ClaimId: claim.claimId,
    functionState: participant.functionState,
  };
}

/**
 * Opt-in bridge from canonical stem-settlement facts to exact existing C2 T5
 * slot witnesses. Returns structural T6-ready evidence, not a new T6
 * interpretation rule or a T8/consumer conclusion. Fail-closed on any
 * provenance or position mismatch; never synthesize missing semantics.
 */
export function linkGeneralNatalC2StemSettlementsToT5(
  snapshot: CanonicalSajuSnapshot,
  interpretation: InterpretationExecutionResult,
): GeneralNatalC2StemSettlementLinkResult {
  if (
    interpretation.run.snapshotId !== snapshot.snapshotId ||
    interpretation.run.snapshotHash !== snapshot.calculationHash
  ) {
    return { status: 'unavailable', reason: 'CALCULATION_INTERPRETATION_SNAPSHOT_MISMATCH' };
  }
  if (!interpretation.integrity.valid) {
    return { status: 'unavailable', reason: 'CLAIM_GRAPH_INTEGRITY_FAILED' };
  }
  const settlements = snapshot.derivedFacts.stemInteractionSettlements;
  if (settlements?.status !== 'resolved') {
    return { status: 'unavailable', reason: 'CANONICAL_STEM_SETTLEMENT_UNRESOLVED' };
  }
  if (snapshot.derivedFacts.tenGods.status !== 'resolved') {
    return { status: 'unavailable', reason: 'CANONICAL_TEN_GODS_UNRESOLVED' };
  }
  const structuralRelations = snapshot.derivedFacts.structuralRelations;
  if (structuralRelations?.status !== 'resolved') {
    return { status: 'unavailable', reason: 'SETTLEMENT_RELATION_MISMATCH' };
  }
  const evidence: GeneralNatalC2StemSettlementEvidence[] = [];
  for (const settlement of settlements.value) {
    const relation = structuralRelations.value.find(
      (candidate) =>
        candidate.relationId === settlement.relationId &&
        candidate.kind === 'stem_five_combination',
    );
    if (relation === undefined || settlement.transformationApplied !== false) {
      return { status: 'unavailable', reason: 'SETTLEMENT_RELATION_MISMATCH' };
    }
    const observedParticipants = relation.participants
      .map((participant) => `${participant.pillar}:${participant.component}:${participant.value}`)
      .sort();
    const settlementParticipants = [
      settlement.participants.controller,
      settlement.participants.controlled,
    ].map((participant) => `${participant.pillar}:stem:${participant.stem}`).sort();
    if (
      observedParticipants.length !== 2 ||
      observedParticipants.some((value, index) => value !== settlementParticipants[index])
    ) {
      return { status: 'unavailable', reason: 'SETTLEMENT_PARTICIPANT_MISMATCH' };
    }
    const controller = bindParticipant(snapshot, interpretation.claims, settlement, 'controller');
    const controlled = bindParticipant(snapshot, interpretation.claims, settlement, 'controlled');
    if (controller === undefined || controlled === undefined) {
      return { status: 'unavailable', reason: 'EXACT_POSITION_T5_WITNESS_MISSING_OR_DUPLICATED' };
    }
    evidence.push({
      schemaVersion: GENERAL_NATAL_C2_STEM_SETTLEMENT_LINK_VERSION,
      snapshotId: snapshot.snapshotId,
      settlementId: settlement.settlementId,
      relationId: settlement.relationId,
      structuralFactRef: 'derivedFacts.stemInteractionSettlements',
      upstreamT5ClaimIds: [controller.t5ClaimId, controlled.t5ClaimId].sort() as [string, string],
      participants: [controller, controlled],
      transformationApplied: false,
      pairControlEffective: settlement.pairControlEffective,
      interpretationEffectAuthorized: false,
      consumerProjectionAuthorized: false,
      semanticScope: 'canonical_structural_settlement_only',
    });
  }
  return {
    status: 'resolved',
    evidence: evidence.sort((left, right) => left.settlementId.localeCompare(right.settlementId)),
  };
}
