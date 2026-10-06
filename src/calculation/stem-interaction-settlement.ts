import { createHash } from 'node:crypto';
import type {
  HeavenlyStem,
  PillarSlot,
  StemInteractionFunctionState,
  StemInteractionSettlementFact,
  StructuralRelationCandidate,
  TenGod,
  TenGodChartFact,
} from '../contracts/calculation.js';

export const JIA_JI_NON_DAY_MASTER_SETTLEMENT_POLICY = Object.freeze({
  policyId: 'myeongha/jia-ji-non-day-master-settlement-v1',
  policyVersion: '1.0.0',
  decisionAuthority: 'PROJECT_OWNER',
  decisionRef: 'GH-2219',
  scope: 'EXACT_NON_DAY_MASTER_JIA_JI',
  transformationRule: 'DO_NOT_APPLY_UNLESS_CANONICALLY_ESTABLISHED',
  identityRule: 'PRESERVE_ORIGINAL_STEM_AND_TEN_GOD_WHEN_NOT_TRANSFORMED',
  combinationRule: 'CONSTRAIN_BOTH_PARTICIPANTS',
  controlRule: 'PRESERVE_JIA_CONTROLS_JI',
  resultRule: 'JIA_CONSTRAINED_JI_IMPAIRED',
} as const);

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value === null || typeof value !== 'object') return value;
  const record = value as Record<string, unknown>;
  return Object.fromEntries(
    Object.keys(record)
      .sort()
      .filter((key) => record[key] !== undefined)
      .map((key) => [key, canonicalize(record[key])]),
  );
}

export const JIA_JI_NON_DAY_MASTER_SETTLEMENT_POLICY_CONTENT_HASH = createHash('sha256')
  .update(JSON.stringify(canonicalize(JIA_JI_NON_DAY_MASTER_SETTLEMENT_POLICY)))
  .digest('hex');

export type StructureRoleDisposition =
  | 'supports_structure'
  | 'harms_structure'
  | 'neutral';

export type StructureImpact =
  | 'weakens_structure'
  | 'strengthens_structure'
  | 'maintains_structure';

function resolvedStemTenGod(
  tenGods: TenGodChartFact,
  pillar: PillarSlot,
): TenGod | undefined {
  const state = tenGods[pillar].stem;
  if (state === undefined || state.status !== 'resolved' || state.value === '일간') {
    return undefined;
  }
  return state.value;
}

function exactJiaJiParticipants(
  relation: StructuralRelationCandidate,
):
  | {
      jia: { pillar: PillarSlot; stem: '갑' };
      ji: { pillar: PillarSlot; stem: '기' };
    }
  | undefined {
  if (
    relation.kind !== 'stem_five_combination' ||
    relation.participants.length !== 2 ||
    relation.semantics.transformationEstablished !== false
  ) {
    return undefined;
  }

  const stemParticipants = relation.participants.filter(
    (participant) => participant.component === 'stem',
  );
  if (stemParticipants.length !== 2) return undefined;

  const jia = stemParticipants.find((participant) => participant.value === '갑');
  const ji = stemParticipants.find((participant) => participant.value === '기');
  if (jia === undefined || ji === undefined) return undefined;
  if (jia.pillar === 'day' || ji.pillar === 'day') return undefined;

  return {
    jia: { pillar: jia.pillar, stem: '갑' },
    ji: { pillar: ji.pillar, stem: '기' },
  };
}

export function deriveAdoptedStemInteractionSettlements(
  relations: readonly StructuralRelationCandidate[],
  tenGods: TenGodChartFact,
  dayMaster: HeavenlyStem,
): readonly StemInteractionSettlementFact[] {
  if (dayMaster === '갑' || dayMaster === '기') return [];

  const settlements: StemInteractionSettlementFact[] = [];

  for (const relation of relations) {
    const participants = exactJiaJiParticipants(relation);
    if (participants === undefined) continue;

    const jiaTenGod = resolvedStemTenGod(tenGods, participants.jia.pillar);
    const jiTenGod = resolvedStemTenGod(tenGods, participants.ji.pillar);
    if (jiaTenGod === undefined || jiTenGod === undefined) continue;

    settlements.push({
      settlementId: `jia_ji_settlement:${relation.relationId}`,
      relationId: relation.relationId,
      kind: 'stem_five_combination',
      scope: 'non_day_master_jia_ji',
      pair: ['갑', '기'],
      transformationApplied: false,
      activeRelations: ['stem_five_combination', 'jia_controls_ji'],
      participants: {
        jia: {
          pillar: participants.jia.pillar,
          stem: '갑',
          tenGod: jiaTenGod,
          element: '목',
          identityPreserved: true,
          functionState: 'constrained',
        },
        ji: {
          pillar: participants.ji.pillar,
          stem: '기',
          tenGod: jiTenGod,
          element: '토',
          identityPreserved: true,
          functionState: 'impaired',
        },
      },
    });
  }

  return settlements.sort((left, right) =>
    left.settlementId.localeCompare(right.settlementId),
  );
}

export function resolveStructureImpactFromFunctionState(
  functionState: StemInteractionFunctionState,
  disposition: StructureRoleDisposition,
): StructureImpact {
  if (functionState === 'preserved' || disposition === 'neutral') {
    return 'maintains_structure';
  }
  return disposition === 'supports_structure'
    ? 'weakens_structure'
    : 'strengthens_structure';
}
