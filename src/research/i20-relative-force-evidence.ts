import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  FiveElement,
  HeavenlyStem,
} from '../contracts/calculation.js';
import type { PillarSlot, StructuralPillarInput } from '../calculation/structural-relations.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const I20_RELATIVE_FORCE_EVIDENCE_VERSION = 'myeonghwa-relative-force-evidence-v1';

const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];

const STEM_ELEMENT: Readonly<Record<HeavenlyStem, FiveElement>> = Object.freeze({
  갑: '목', 을: '목', 병: '화', 정: '화', 무: '토', 기: '토', 경: '금', 신: '금', 임: '수', 계: '수',
});

const GENERATES: Readonly<Record<FiveElement, FiveElement>> = Object.freeze({
  목: '화', 화: '토', 토: '금', 금: '수', 수: '목',
});

const CONTROLS: Readonly<Record<FiveElement, FiveElement>> = Object.freeze({
  목: '토', 화: '금', 토: '수', 금: '목', 수: '화',
});

export type SeasonalElementPhase = '旺' | '相' | '休' | '囚' | '死';

export interface RelativeForcePositionEvidence {
  position: PillarSlot;
  branch: EarthlyBranch;
  branchElement: FiveElement;
  seasonalPhase: SeasonalElementPhase;
  visibleSameElementStemPositions: readonly PillarSlot[];
  visibleResourceStemPositions: readonly PillarSlot[];
  sameElementBranchPositions: readonly PillarSlot[];
  resourceBranchPositions: readonly PillarSlot[];
  relativeForceVerdict: 'not_determined';
  numericWeight: 'not_assigned';
}

export interface RelativeForceEvidenceReport {
  reportId: string;
  evidenceVersion: string;
  status: 'RESOLVED_EVIDENCE' | 'SCENARIO_MATERIALIZATION_REQUIRED' | 'PILLARS_UNRESOLVED';
  snapshotId?: string;
  monthBranch?: EarthlyBranch;
  commandElement?: FiveElement;
  positions: readonly RelativeForcePositionEvidence[];
  seasonalPhaseAuthority: 'month_branch_element_relation_only';
  relativeForceVerdictAuthorized: false;
  rootEffectResolutionAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  sourceBasis: readonly {
    sourceId: string;
    finding: string;
  }[];
  notes: readonly string[];
}

export const I20_RELATIVE_FORCE_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-I20-SANMING-TONGHUI-WUXING-PHASE-CTEXT',
    finding:
      'The seasonal five-element phase relation is expressed as command element flourishing, what it generates assisting, what generates it resting, what controls it confined, and what it controls in the dead phase.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-WIKISOURCE',
    finding:
      'Whole-chart context, roots, and surrounding support can reverse a naive seasonal strength conclusion; seasonal phase therefore remains evidence rather than a final verdict.',
  },
] as const);

export function seasonalElementPhase(
  commandElement: FiveElement,
  targetElement: FiveElement,
): SeasonalElementPhase {
  if (targetElement === commandElement) return '旺';
  if (GENERATES[commandElement] === targetElement) return '相';
  if (GENERATES[targetElement] === commandElement) return '休';
  if (CONTROLS[targetElement] === commandElement) return '囚';
  return '死';
}

function visibleStemPositions(
  pillars: StructuralPillarInput,
  targetElement: FiveElement,
): readonly PillarSlot[] {
  return PILLAR_SLOTS.filter((slot) => {
    const pillar = pillars[slot];
    return pillar !== undefined && STEM_ELEMENT[pillar.stem.value] === targetElement;
  });
}

function branchPositions(
  pillars: StructuralPillarInput,
  targetElement: FiveElement,
): readonly PillarSlot[] {
  return PILLAR_SLOTS.filter((slot) => {
    const pillar = pillars[slot];
    return pillar !== undefined && pillar.branch.element === targetElement;
  });
}

function evidenceForPosition(
  position: PillarSlot,
  pillars: StructuralPillarInput,
  commandElement: FiveElement,
): RelativeForcePositionEvidence | undefined {
  const pillar = pillars[position];
  if (pillar === undefined) return undefined;

  const branchElement = pillar.branch.element;
  const resourceElement = Object.entries(GENERATES).find(([, generated]) => generated === branchElement)?.[0] as
    | FiveElement
    | undefined;
  if (resourceElement === undefined) {
    throw new Error(`No generating element found for ${branchElement}`);
  }

  return {
    position,
    branch: pillar.branch.value,
    branchElement,
    seasonalPhase: seasonalElementPhase(commandElement, branchElement),
    visibleSameElementStemPositions: visibleStemPositions(pillars, branchElement),
    visibleResourceStemPositions: visibleStemPositions(pillars, resourceElement),
    sameElementBranchPositions: branchPositions(pillars, branchElement),
    resourceBranchPositions: branchPositions(pillars, resourceElement),
    relativeForceVerdict: 'not_determined',
    numericWeight: 'not_assigned',
  };
}

function finalized(
  material: Omit<RelativeForceEvidenceReport, 'reportId'>,
): RelativeForceEvidenceReport {
  return {
    reportId: `relative_force_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildResolvedRelativeForceEvidence(
  pillars: StructuralPillarInput,
  snapshotId?: string,
): RelativeForceEvidenceReport {
  const month = pillars.month;
  if (month === undefined) {
    return finalized({
      evidenceVersion: I20_RELATIVE_FORCE_EVIDENCE_VERSION,
      status: 'PILLARS_UNRESOLVED',
      ...(snapshotId === undefined ? {} : { snapshotId }),
      positions: [],
      seasonalPhaseAuthority: 'month_branch_element_relation_only',
      relativeForceVerdictAuthorized: false,
      rootEffectResolutionAuthorized: false,
      classificationAuthorized: false,
      numericScoringAuthorized: false,
      sourceBasis: I20_RELATIVE_FORCE_SOURCE_BASIS,
      notes: ['A resolved month pillar is required before seasonal phase evidence can be derived.'],
    });
  }

  const commandElement = month.branch.element;
  const positions = PILLAR_SLOTS.flatMap((position) => {
    const evidence = evidenceForPosition(position, pillars, commandElement);
    return evidence === undefined ? [] : [evidence];
  });

  if (positions.length !== PILLAR_SLOTS.length) {
    return finalized({
      evidenceVersion: I20_RELATIVE_FORCE_EVIDENCE_VERSION,
      status: 'PILLARS_UNRESOLVED',
      ...(snapshotId === undefined ? {} : { snapshotId }),
      monthBranch: month.branch.value,
      commandElement,
      positions,
      seasonalPhaseAuthority: 'month_branch_element_relation_only',
      relativeForceVerdictAuthorized: false,
      rootEffectResolutionAuthorized: false,
      classificationAuthorized: false,
      numericScoringAuthorized: false,
      sourceBasis: I20_RELATIVE_FORCE_SOURCE_BASIS,
      notes: ['All four resolved pillars are required for complete local support-context evidence.'],
    });
  }

  return finalized({
    evidenceVersion: I20_RELATIVE_FORCE_EVIDENCE_VERSION,
    status: 'RESOLVED_EVIDENCE',
    ...(snapshotId === undefined ? {} : { snapshotId }),
    monthBranch: month.branch.value,
    commandElement,
    positions,
    seasonalPhaseAuthority: 'month_branch_element_relation_only',
    relativeForceVerdictAuthorized: false,
    rootEffectResolutionAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    sourceBasis: I20_RELATIVE_FORCE_SOURCE_BASIS,
    notes: [
      'Seasonal phase is an independently derived evidence state, not a final relative-force verdict.',
      'Visible and branch support locations are preserved as raw positional context and are not summed or weighted.',
      'This report does not evaluate hidden-stem strength, relation precedence, transformation, rescue effectiveness, or clash victory.',
    ],
  });
}

export function buildI20RelativeForceEvidence(
  snapshot: CanonicalSajuSnapshot,
): RelativeForceEvidenceReport {
  const base = {
    evidenceVersion: I20_RELATIVE_FORCE_EVIDENCE_VERSION,
    snapshotId: snapshot.snapshotId,
    positions: [] as readonly RelativeForcePositionEvidence[],
    seasonalPhaseAuthority: 'month_branch_element_relation_only' as const,
    relativeForceVerdictAuthorized: false as const,
    rootEffectResolutionAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    sourceBasis: I20_RELATIVE_FORCE_SOURCE_BASIS,
  };

  if (snapshot.scenarios.length > 0) {
    return finalized({
      ...base,
      status: 'SCENARIO_MATERIALIZATION_REQUIRED',
      notes: [
        'Relative-force evidence is not derived from an unresolved base snapshot when calculation scenarios exist.',
        'Each scenario must be materialized before relative-force evidence is generated.',
      ],
    });
  }

  const pillars: StructuralPillarInput = {};
  for (const slot of PILLAR_SLOTS) {
    const state = snapshot.pillars[slot];
    if (state.status !== 'resolved') {
      return finalized({
        ...base,
        status: 'PILLARS_UNRESOLVED',
        notes: [`Resolved ${slot} pillar is required for relative-force evidence.`],
      });
    }
    pillars[slot] = state.value;
  }

  return buildResolvedRelativeForceEvidence(pillars, snapshot.snapshotId);
}
