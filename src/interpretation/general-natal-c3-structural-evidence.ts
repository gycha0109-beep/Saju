import type {
  CanonicalSajuSnapshot,
  HeavenlyStem,
  PillarSlot,
  TenGod,
} from '../contracts/calculation.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import type { InterpretationExecutionResult } from './interpretation-engine.js';

export const GENERAL_NATAL_C3_EVIDENCE_VERSION = '0.1.0-research' as const;

type FactUnavailable = { readonly status: 'unavailable'; readonly reasonCode: string };
type FactAmbiguous = { readonly status: 'ambiguous'; readonly reasonCodes: readonly string[] };
type FactNotResolved = FactUnavailable | FactAmbiguous;

export type GeneralNatalC3MonthContext =
  | {
      readonly status: 'resolved';
      readonly claimId: string;
      readonly guardClaimId: string;
      readonly relation: 'peer' | 'resource' | 'output' | 'wealth' | 'officer';
      readonly direction: 'supporting' | 'challenging';
      readonly dayMasterElement: string;
      readonly monthBranchElement: string;
      readonly factRefs: readonly ['derivedFacts.dayMaster', 'pillars.month'];
      readonly weight: 'not_assigned';
      readonly overallStrength: 'not_determined';
    }
  | FactNotResolved;

export interface GeneralNatalC3TenGodSlot {
  readonly pillar: PillarSlot;
  readonly component: 'stem' | 'branch';
  readonly status: 'resolved' | 'unavailable' | 'ambiguous';
  readonly claimId?: string;
  readonly tenGod?: TenGod;
  readonly family?: 'peer' | 'resource' | 'output' | 'wealth' | 'officer';
  readonly sourceFactRef: string;
  readonly reasonCode?: string;
  readonly reasonCodes?: readonly string[];
}

export interface GeneralNatalC3HiddenStemSlot {
  readonly pillar: PillarSlot;
  readonly status: 'resolved' | 'unavailable' | 'ambiguous';
  readonly stems?: readonly HeavenlyStem[];
  readonly sourceFactRef: string;
  readonly reasonCode?: string;
  readonly reasonCodes?: readonly string[];
}

export interface GeneralNatalC3StructuralEvidence {
  readonly schemaVersion: typeof GENERAL_NATAL_C3_EVIDENCE_VERSION;
  readonly snapshotId: string;
  readonly interpretationRunId: string;
  readonly month: GeneralNatalC3MonthContext;
  /** Exact existing T5 slots, not separate claims about strength or support. */
  readonly positionedTenGods: readonly GeneralNatalC3TenGodSlot[];
  /** Raw canonical hidden stems. Mere membership is not Tonggen. */
  readonly hiddenStemObservations: readonly GeneralNatalC3HiddenStemSlot[];
  readonly root: {
    readonly status: 'not_authorized';
    readonly tonggen: 'not_determined';
    readonly fourPillarHasRoot: 'not_determined';
    readonly rootWeight: 'not_assigned';
  };
  readonly synthesis: {
    readonly scope: 'independent_evidence_axes_only';
    readonly finalStrength: 'not_determined';
    readonly numericStrength: 'not_authorized';
    readonly monthEvidenceIsNotFinalVerdict: true;
    readonly tenGodPositionIsNotStrengthVerdict: true;
    readonly hiddenStemMembershipIsNotTonggen: true;
    readonly consumerProjectionAuthorized: false;
  };
}

const POSITIONS = [
  ['year', 'stem'], ['month', 'stem'], ['hour', 'stem'],
  ['year', 'branch'], ['month', 'branch'], ['day', 'branch'], ['hour', 'branch'],
] as const satisfies readonly (readonly [PillarSlot, 'stem' | 'branch'])[];

const PILLARS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];
const FAMILY: Readonly<Record<TenGod, 'peer' | 'resource' | 'output' | 'wealth' | 'officer'>> = {
  비견: 'peer', 겁재: 'peer',
  편인: 'resource', 정인: 'resource',
  식신: 'output', 상관: 'output',
  편재: 'wealth', 정재: 'wealth',
  편관: 'officer', 정관: 'officer',
};

function active(execution: InterpretationExecutionResult, type: string): InterpretationClaim[] {
  return execution.claims.filter((claim) => claim.state === 'active' && claim.claimType === type);
}

function monthEvidence(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
): GeneralNatalC3MonthContext {
  const month = snapshot.pillars.month;
  const master = snapshot.derivedFacts.dayMaster;
  if (month.status === 'ambiguous' || master.status === 'ambiguous') {
    return { status: 'ambiguous', reasonCodes: [
      ...(month.status === 'ambiguous' ? month.reasonCodes : []),
      ...(master.status === 'ambiguous' ? master.reasonCodes : []),
    ] };
  }
  if (month.status !== 'resolved' || master.status !== 'resolved') {
    return { status: 'unavailable', reasonCode: 'month_or_day_master_not_resolved' };
  }
  const relationClaims = active(execution, 'DAY_MASTER_MONTH_BRANCH_EVIDENCE');
  const guardClaims = active(execution, 'DAY_MASTER_MONTH_BRANCH_SCOPE_GUARD');
  if (relationClaims.length !== 1 || guardClaims.length !== 1) {
    throw new Error('WS_C3_MONTH_EVIDENCE_NOT_UNIQUE');
  }
  const claim = relationClaims[0]!;
  const guard = guardClaims[0]!;
  const value = claim.value as Record<string, unknown>;
  const limit = guard.value as Record<string, unknown>;
  const relation = value.relation;
  const direction = value.direction;
  if (
    claim.taxonomy.tier !== 'T2' ||
    claim.taxonomy.subcategory !== 'month_branch_elemental_relation' ||
    guard.taxonomy.tier !== 'T2' ||
    value.dayMasterElement !== master.value.element ||
    value.monthBranchElement !== month.value.branch.element ||
    !['peer', 'resource', 'output', 'wealth', 'officer'].includes(String(relation)) ||
    !['supporting', 'challenging'].includes(String(direction)) ||
    (direction === 'supporting') !== (relation === 'peer' || relation === 'resource') ||
    value.weight !== 'not_assigned' ||
    value.overallStrength !== 'not_determined' ||
    limit.classificationAuthorized !== false ||
    limit.numericScoringAuthorized !== false ||
    limit.overallStrength !== 'not_determined' ||
    !claim.factRefs.includes('derivedFacts.dayMaster') ||
    !claim.factRefs.includes('pillars.month') ||
    !guard.factRefs.includes('derivedFacts.dayMaster') ||
    !guard.factRefs.includes('pillars.month')
  ) throw new Error('WS_C3_MONTH_SCOPE_OR_FACT_MISMATCH');
  return {
    status: 'resolved',
    claimId: claim.claimId,
    guardClaimId: guard.claimId,
    relation: relation as 'peer' | 'resource' | 'output' | 'wealth' | 'officer',
    direction: direction as 'supporting' | 'challenging',
    dayMasterElement: master.value.element,
    monthBranchElement: month.value.branch.element,
    factRefs: ['derivedFacts.dayMaster', 'pillars.month'],
    weight: 'not_assigned',
    overallStrength: 'not_determined',
  };
}

function tenGodPositions(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
): readonly GeneralNatalC3TenGodSlot[] {
  const root = snapshot.derivedFacts.tenGods;
  return POSITIONS.map(([pillar, component]) => {
    const sourceFactRef = `derivedFacts.tenGods.${pillar}.${component}`;
    if (root.status === 'ambiguous') {
      return { pillar, component, sourceFactRef, status: 'ambiguous', reasonCodes: root.reasonCodes };
    }
    if (root.status === 'unavailable') {
      return { pillar, component, sourceFactRef, status: 'unavailable', reasonCode: root.reasonCode };
    }
    const state = root.value[pillar][component];
    if (state === undefined) {
      return { pillar, component, sourceFactRef, status: 'unavailable', reasonCode: 'position_fact_absent' };
    }
    if (state.status !== 'resolved') {
      return {
        pillar, component, sourceFactRef, status: state.status,
        ...(state.status === 'ambiguous'
          ? { reasonCodes: state.reasonCodes }
          : { reasonCode: state.reasonCode }),
      };
    }
    if (state.value === '일간') throw new Error('WS_C3_UNEXPECTED_DAY_MASTER_POSITION');
    const family = FAMILY[state.value];
    const channel = component === 'stem' ? 'VISIBLE_STEMS' : 'BRANCHES';
    const type = `TEN_GOD_${family.toUpperCase()}_${channel}_THEME`;
    const matches = active(execution, type).filter((claim) =>
      claim.taxonomy.tier === 'T5' &&
      claim.taxonomy.category === 'ten_gods' &&
      claim.predicate === 'ten_god_theme' &&
      claim.factRefs.length === 1 &&
      claim.factRefs[0] === sourceFactRef &&
      claim.ruleRefs.some((ref) =>
        ref.ruleId.endsWith(`-POSITION-${pillar.toUpperCase()}-${component.toUpperCase()}`)) &&
      (claim.value as { family?: string; channel?: string }).family === family &&
      (claim.value as { family?: string; channel?: string }).channel ===
        (component === 'stem' ? 'visible_stems' : 'branches')
    );
    if (matches.length !== 1) throw new Error('WS_C3_POSITION_T5_NOT_UNIQUE');
    return {
      pillar, component, sourceFactRef, status: 'resolved',
      tenGod: state.value, family, claimId: matches[0]!.claimId,
    };
  });
}

function hiddenStems(snapshot: CanonicalSajuSnapshot): readonly GeneralNatalC3HiddenStemSlot[] {
  return PILLARS.map((pillar) => {
    const sourceFactRef = `derivedFacts.hiddenStems.${pillar}`;
    const fact = snapshot.derivedFacts.hiddenStems?.[pillar];
    if (fact === undefined) {
      return { pillar, sourceFactRef, status: 'unavailable', reasonCode: 'hidden_stem_fact_absent' };
    }
    if (fact.status === 'resolved') {
      return { pillar, sourceFactRef, status: 'resolved', stems: [...fact.value] };
    }
    if (fact.status === 'ambiguous') {
      return { pillar, sourceFactRef, status: 'ambiguous', reasonCodes: fact.reasonCodes };
    }
    return { pillar, sourceFactRef, status: 'unavailable', reasonCode: fact.reasonCode };
  });
}

/**
 * C3 structural integration is executable only as internal evidence. There is
 * no root classifier, generic support aggregation, strength verdict or T8
 * consumer semantic added by this projection.
 */
export function bindGeneralNatalC3StructuralEvidence(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
): GeneralNatalC3StructuralEvidence {
  if (
    execution.run.snapshotId !== snapshot.snapshotId ||
    execution.run.snapshotHash !== snapshot.calculationHash
  ) throw new Error('WS_C3_SNAPSHOT_MISMATCH');
  if (!execution.integrity.valid ||
      execution.claims.some((claim) => claim.snapshotId !== snapshot.snapshotId)) {
    throw new Error('WS_C3_CLAIM_GRAPH_INVALID');
  }
  return {
    schemaVersion: GENERAL_NATAL_C3_EVIDENCE_VERSION,
    snapshotId: snapshot.snapshotId,
    interpretationRunId: execution.run.interpretationRunId,
    month: monthEvidence(snapshot, execution),
    positionedTenGods: tenGodPositions(snapshot, execution),
    hiddenStemObservations: hiddenStems(snapshot),
    root: {
      status: 'not_authorized',
      tonggen: 'not_determined',
      fourPillarHasRoot: 'not_determined',
      rootWeight: 'not_assigned',
    },
    synthesis: {
      scope: 'independent_evidence_axes_only',
      finalStrength: 'not_determined',
      numericStrength: 'not_authorized',
      monthEvidenceIsNotFinalVerdict: true,
      tenGodPositionIsNotStrengthVerdict: true,
      hiddenStemMembershipIsNotTonggen: true,
      consumerProjectionAuthorized: false,
    },
  };
}
