import { HIDDEN_STEM_MEMBERSHIP } from '../calculation/hidden-stems.js';
import type { PillarSlot, StructuralPillarInput } from '../calculation/structural-relations.js';
import type {
  CanonicalSajuSnapshot,
  FiveElement,
  HeavenlyStem,
} from '../contracts/calculation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { seasonalElementPhase, type SeasonalElementPhase } from './i20-relative-force-evidence.js';
import type { ChallengeMechanism } from './i24-challenge-mechanism-composition.js';

export const I27_CHALLENGE_MECHANISM_FORCE_EVIDENCE_VERSION =
  'myeonghwa-challenge-mechanism-force-evidence-v1';

const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];

const GENERATES: Readonly<Record<FiveElement, FiveElement>> = Object.freeze({
  목: '화', 화: '토', 토: '금', 금: '수', 수: '목',
});

const CONTROLS: Readonly<Record<FiveElement, FiveElement>> = Object.freeze({
  목: '토', 화: '금', 토: '수', 금: '목', 수: '화',
});

const STEM_ELEMENT: Readonly<Record<HeavenlyStem, FiveElement>> = Object.freeze({
  갑: '목', 을: '목', 병: '화', 정: '화', 무: '토', 기: '토', 경: '금', 신: '금', 임: '수', 계: '수',
});

export interface ChallengeMechanismForceEvidenceItem {
  mechanism: ChallengeMechanism;
  targetElement: FiveElement;
  seasonalPhase: SeasonalElementPhase;
  visibleStemPositions: readonly PillarSlot[];
  branchMainElementPositions: readonly PillarSlot[];
  hiddenMembershipPositions: readonly PillarSlot[];
  effectiveForce: 'not_determined';
  rootQuality: 'not_evaluated';
  postRelationEffect: 'not_evaluated';
  numericMagnitude: 'not_assigned';
}

export interface ChallengeMechanismForceEvidenceReport {
  reportId: string;
  evidenceVersion: string;
  status: 'RESOLVED_EVIDENCE' | 'SCENARIO_MATERIALIZATION_REQUIRED' | 'PILLARS_UNRESOLVED';
  snapshotId?: string;
  dayMasterElement?: FiveElement;
  commandElement?: FiveElement;
  mechanisms: readonly ChallengeMechanismForceEvidenceItem[];
  mechanismEffectiveForceContextSubstrate: 'structural_evidence_only';
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  sourceBasis: readonly {
    sourceId: string;
    finding: string;
  }[];
  notes: readonly string[];
}

export const I27_CHALLENGE_FORCE_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-I20-SANMING-TONGHUI-WUXING-PHASE-CTEXT',
    finding:
      'Reuses only the source-backed seasonal five-element phase relation as structural evidence for each target element.',
  },
  {
    sourceId: 'SRC-METHOD-YUANHAI-ZIPING-WIKISOURCE',
    finding:
      'The day-master relation taxonomy distinguishes 我生, 我克, and 克我, which deterministically identifies the output, wealth, and officer/control target elements.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-WIKISOURCE',
    finding:
      'Seasonal state and structural presence are not sufficient for final force/effect; roots and surrounding context may reverse naive conclusions.',
  },
] as const);

function controllingElement(target: FiveElement): FiveElement {
  const entry = (Object.entries(CONTROLS) as [FiveElement, FiveElement][]).find(
    ([, controlled]) => controlled === target,
  );
  if (entry === undefined) throw new Error(`No controlling element found for ${target}`);
  return entry[0];
}

export function challengeTargetElement(
  dayMasterElement: FiveElement,
  mechanism: ChallengeMechanism,
): FiveElement {
  if (mechanism === 'OUTPUT_LEAKAGE') return GENERATES[dayMasterElement];
  if (mechanism === 'WEALTH_EXPENDITURE_CONTROL') return CONTROLS[dayMasterElement];
  return controllingElement(dayMasterElement);
}

function visibleStemPositions(
  pillars: StructuralPillarInput,
  targetElement: FiveElement,
): readonly PillarSlot[] {
  return PILLAR_SLOTS.filter((slot) => pillars[slot]?.stem.element === targetElement);
}

function branchMainElementPositions(
  pillars: StructuralPillarInput,
  targetElement: FiveElement,
): readonly PillarSlot[] {
  return PILLAR_SLOTS.filter((slot) => pillars[slot]?.branch.element === targetElement);
}

function hiddenMembershipPositions(
  pillars: StructuralPillarInput,
  targetElement: FiveElement,
): readonly PillarSlot[] {
  return PILLAR_SLOTS.filter((slot) => {
    const branch = pillars[slot]?.branch.value;
    if (branch === undefined) return false;
    return HIDDEN_STEM_MEMBERSHIP[branch].some((stem) => STEM_ELEMENT[stem] === targetElement);
  });
}

function mechanismEvidence(
  mechanism: ChallengeMechanism,
  dayMasterElement: FiveElement,
  commandElement: FiveElement,
  pillars: StructuralPillarInput,
): ChallengeMechanismForceEvidenceItem {
  const targetElement = challengeTargetElement(dayMasterElement, mechanism);
  return {
    mechanism,
    targetElement,
    seasonalPhase: seasonalElementPhase(commandElement, targetElement),
    visibleStemPositions: visibleStemPositions(pillars, targetElement),
    branchMainElementPositions: branchMainElementPositions(pillars, targetElement),
    hiddenMembershipPositions: hiddenMembershipPositions(pillars, targetElement),
    effectiveForce: 'not_determined',
    rootQuality: 'not_evaluated',
    postRelationEffect: 'not_evaluated',
    numericMagnitude: 'not_assigned',
  };
}

function finalized(
  material: Omit<ChallengeMechanismForceEvidenceReport, 'reportId'>,
): ChallengeMechanismForceEvidenceReport {
  return {
    reportId: `challenge_mechanism_force_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildResolvedI27ChallengeMechanismForceEvidence(
  pillars: StructuralPillarInput,
  snapshotId?: string,
): ChallengeMechanismForceEvidenceReport {
  const day = pillars.day;
  const month = pillars.month;
  if (day === undefined || month === undefined || PILLAR_SLOTS.some((slot) => pillars[slot] === undefined)) {
    return finalized({
      evidenceVersion: I27_CHALLENGE_MECHANISM_FORCE_EVIDENCE_VERSION,
      status: 'PILLARS_UNRESOLVED',
      ...(snapshotId === undefined ? {} : { snapshotId }),
      mechanisms: [],
      mechanismEffectiveForceContextSubstrate: 'structural_evidence_only',
      challengeEffectVerdict: 'not_determined',
      relativeForceVerdictAuthorized: false,
      classificationAuthorized: false,
      numericScoringAuthorized: false,
      sourceBasis: I27_CHALLENGE_FORCE_SOURCE_BASIS,
      notes: ['All four resolved pillars are required for mechanism-specific structural force evidence.'],
    });
  }

  const dayMasterElement = day.stem.element;
  const commandElement = month.branch.element;
  const mechanisms = (
    ['OUTPUT_LEAKAGE', 'WEALTH_EXPENDITURE_CONTROL', 'OFFICER_CONTROL_PRESSURE'] as const
  ).map((mechanism) => mechanismEvidence(mechanism, dayMasterElement, commandElement, pillars));

  return finalized({
    evidenceVersion: I27_CHALLENGE_MECHANISM_FORCE_EVIDENCE_VERSION,
    status: 'RESOLVED_EVIDENCE',
    ...(snapshotId === undefined ? {} : { snapshotId }),
    dayMasterElement,
    commandElement,
    mechanisms,
    mechanismEffectiveForceContextSubstrate: 'structural_evidence_only',
    challengeEffectVerdict: 'not_determined',
    relativeForceVerdictAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    sourceBasis: I27_CHALLENGE_FORCE_SOURCE_BASIS,
    notes: [
      'Target-element seasonal phase and structural presence are evidence only; effective force is not inferred.',
      'Visible stems, branch main elements, and hidden membership are preserved as separate positional channels and are not counted into points.',
      'Root quality, transformation, clash/combination effects, and relation-specific usefulness remain unresolved.',
    ],
  });
}

export function buildI27ChallengeMechanismForceEvidence(
  snapshot: CanonicalSajuSnapshot,
): ChallengeMechanismForceEvidenceReport {
  if (snapshot.scenarios.length > 0) {
    return finalized({
      evidenceVersion: I27_CHALLENGE_MECHANISM_FORCE_EVIDENCE_VERSION,
      status: 'SCENARIO_MATERIALIZATION_REQUIRED',
      snapshotId: snapshot.snapshotId,
      mechanisms: [],
      mechanismEffectiveForceContextSubstrate: 'structural_evidence_only',
      challengeEffectVerdict: 'not_determined',
      relativeForceVerdictAuthorized: false,
      classificationAuthorized: false,
      numericScoringAuthorized: false,
      sourceBasis: I27_CHALLENGE_FORCE_SOURCE_BASIS,
      notes: ['Each calculation scenario must be materialized before challenge mechanism force evidence is derived.'],
    });
  }

  const pillars: StructuralPillarInput = {};
  for (const slot of PILLAR_SLOTS) {
    const state = snapshot.pillars[slot];
    if (state.status !== 'resolved') {
      return finalized({
        evidenceVersion: I27_CHALLENGE_MECHANISM_FORCE_EVIDENCE_VERSION,
        status: 'PILLARS_UNRESOLVED',
        snapshotId: snapshot.snapshotId,
        mechanisms: [],
        mechanismEffectiveForceContextSubstrate: 'structural_evidence_only',
        challengeEffectVerdict: 'not_determined',
        relativeForceVerdictAuthorized: false,
        classificationAuthorized: false,
        numericScoringAuthorized: false,
        sourceBasis: I27_CHALLENGE_FORCE_SOURCE_BASIS,
        notes: [`Resolved ${slot} pillar is required for challenge mechanism force evidence.`],
      });
    }
    pillars[slot] = state.value;
  }

  return buildResolvedI27ChallengeMechanismForceEvidence(pillars, snapshot.snapshotId);
}
