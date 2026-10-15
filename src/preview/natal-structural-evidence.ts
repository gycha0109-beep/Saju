import type {
  CanonicalSajuSnapshot,
  FiveElement,
  PillarSlot,
  StructuralRelationKind,
  TenGod,
} from '../contracts/calculation.js';

export const NATAL_STRUCTURAL_EVIDENCE_VERSION = 'saju-natal-structural-evidence-n1-v1' as const;
const SLOTS = ['year', 'month', 'day', 'hour'] as const;
const ELEMENTS = ['목', '화', '토', '금', '수'] as const;

export interface NatalEvidencePillar {
  slot: PillarSlot;
  state: 'resolved' | 'ambiguous' | 'unavailable';
  label?: string;
  stem?: string;
  branch?: string;
  sourcePath: string;
}

export interface NatalEvidenceTenGod {
  slot: PillarSlot;
  component: 'stem' | 'branch';
  state: 'resolved' | 'ambiguous' | 'unavailable';
  value?: TenGod | '일간';
  sourcePath: string;
}

export interface NatalEvidenceStructuralRelation {
  kind: StructuralRelationKind;
  participants: readonly { slot: PillarSlot; component: 'stem' | 'branch'; value: string }[];
  sourcePaths: readonly string[];
  sourceIds: readonly string[];
  structuralMatchOnly: true;
  transformationEstablished: false;
}

export interface NatalStructuralEvidence {
  version: typeof NATAL_STRUCTURAL_EVIDENCE_VERSION;
  lifecycle: 'internal_structural_observation';
  snapshotId: string;
  calculationHash: string;
  calculationPolicyId: string;
  birthTimeKnown: boolean;
  mayInferStrength: false;
  mayInferGeju: false;
  mayInferYongshin: false;
  mayPromoteResearch: false;
  mayPublish: false;
  pillars: readonly NatalEvidencePillar[];
  dayMaster?: { label: string; element: FiveElement; sourcePath: 'derivedFacts.dayMaster' };
  fiveElementCounts?: readonly { element: FiveElement; count: number; sourcePath: string }[];
  tenGods: readonly NatalEvidenceTenGod[];
  hiddenStemObservations: readonly {
    slot: PillarSlot;
    stems: readonly string[];
    sourcePath: string;
  }[];
  structuralRelations: readonly NatalEvidenceStructuralRelation[];
  unavailableEvidencePaths: readonly string[];
}

/**
 * N1: project the *calculation* contract, never conclude a person's fate,
 * personality, strength, geju or yongshin from unadmitted structural matches.
 */
export function buildNatalStructuralEvidence(
  snapshot: CanonicalSajuSnapshot,
): NatalStructuralEvidence {
  const unavailable = new Set<string>();
  const pillars: NatalEvidencePillar[] = SLOTS.map((slot) => {
    const fact = snapshot.pillars[slot];
    if (fact.status !== 'resolved') {
      unavailable.add(`pillars.${slot}`);
      return { slot, state: fact.status, sourcePath: `pillars.${slot}` };
    }
    return {
      slot,
      state: 'resolved',
      label: fact.value.stem.hanja + fact.value.branch.hanja,
      stem: fact.value.stem.value,
      branch: fact.value.branch.value,
      sourcePath: `pillars.${slot}`,
    };
  });

  const master = snapshot.derivedFacts.dayMaster;
  if (master.status !== 'resolved') unavailable.add('derivedFacts.dayMaster');

  const counts = snapshot.derivedFacts.fiveElementCounts;
  if (counts?.status !== 'resolved') unavailable.add('derivedFacts.fiveElementCounts');

  const tenGods: NatalEvidenceTenGod[] = [];
  const chartTenGods = snapshot.derivedFacts.tenGods;
  if (chartTenGods.status !== 'resolved') {
    unavailable.add('derivedFacts.tenGods');
  } else {
    for (const slot of SLOTS) {
      for (const component of ['stem', 'branch'] as const) {
        const path = `derivedFacts.tenGods.${slot}.${component}`;
        const state = chartTenGods.value[slot][component];
        if (state === undefined || state.status !== 'resolved') {
          unavailable.add(path);
          tenGods.push({ slot, component, state: state?.status ?? 'unavailable', sourcePath: path });
        } else {
          tenGods.push({ slot, component, state: 'resolved', value: state.value, sourcePath: path });
        }
      }
    }
  }

  const hiddenStemObservations: NatalStructuralEvidence['hiddenStemObservations'][number][] = [];
  for (const slot of SLOTS) {
    const value = snapshot.derivedFacts.hiddenStems?.[slot];
    if (value?.status === 'resolved') {
      hiddenStemObservations.push({
        slot,
        stems: [...value.value],
        sourcePath: `derivedFacts.hiddenStems.${slot}`,
      });
    } else {
      unavailable.add(`derivedFacts.hiddenStems.${slot}`);
    }
  }

  const relations = snapshot.derivedFacts.structuralRelations;
  if (relations?.status !== 'resolved') unavailable.add('derivedFacts.structuralRelations');

  const structuralRelations: NatalEvidenceStructuralRelation[] =
    relations?.status === 'resolved'
      ? relations.value.map((relation) => ({
          kind: relation.kind,
          participants: relation.participants.map((part) => ({
            slot: part.pillar,
            component: part.component,
            value: part.value,
          })),
          sourcePaths: relation.participants.map(
            (part) => `pillars.${part.pillar}.${part.component}`,
          ),
          sourceIds: [...relation.sourceIds],
          structuralMatchOnly: true as const,
          transformationEstablished: false as const,
        }))
      : [];

  return {
    version: NATAL_STRUCTURAL_EVIDENCE_VERSION,
    lifecycle: 'internal_structural_observation',
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    calculationPolicyId: snapshot.policy.policyId,
    birthTimeKnown: snapshot.completeness.birthTimeKnown,
    mayInferStrength: false,
    mayInferGeju: false,
    mayInferYongshin: false,
    mayPromoteResearch: false,
    mayPublish: false,
    pillars,
    ...(master.status === 'resolved'
      ? {
          dayMaster: {
            label: master.value.value,
            element: master.value.element,
            sourcePath: 'derivedFacts.dayMaster' as const,
          },
        }
      : {}),
    ...(counts?.status === 'resolved'
      ? {
          fiveElementCounts: ELEMENTS.map((element) => ({
            element,
            count: counts.value[element],
            sourcePath: `derivedFacts.fiveElementCounts.${element}`,
          })),
        }
      : {}),
    tenGods,
    hiddenStemObservations,
    structuralRelations,
    unavailableEvidencePaths: [...unavailable].sort(),
  };
}
