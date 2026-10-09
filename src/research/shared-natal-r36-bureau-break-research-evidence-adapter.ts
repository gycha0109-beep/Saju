import {
  EARTHLY_BRANCHES,
  EARTHLY_BRANCHES_HANJA,
  getEarthlyBranchElement,
  getEarthlyBranchYinYang,
  getHeavenlyStemElement,
  getHeavenlyStemYinYang,
  HEAVENLY_STEMS,
  HEAVENLY_STEMS_HANJA,
} from 'manseryeok';
import type { StructuralPillarInput } from '../calculation/structural-relations.js';
import type { CanonicalSajuSnapshot, PillarSlot } from '../contracts/calculation.js';
import {
  createResearchEvidenceEnvelope,
  validateResearchEvidenceEnvelope,
  type ResearchEvidenceDefinition,
  type ResearchEvidenceEnvelope,
  type ResearchEvidenceValidationResult,
} from '../interpretation/research-evidence.js';
import type { ResearchEvidenceRuntimeAdapter } from '../interpretation/research-evidence-runtime.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildResolvedI29ChallengeTargetIntrinsicRootEvidence } from './i29-challenge-target-intrinsic-root-evidence.js';
import { buildResolvedI31ChallengeTargetRelationParticipationEvidence } from './i31-challenge-target-relation-participation-evidence.js';
import { buildResolvedI35ChallengeTargetCombinationDependencyEvidence } from './i35-challenge-target-combination-dependency-evidence.js';
import { buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview } from './i36-challenge-target-combination-transformation-policy-methodology-review.js';
import { buildI37ChallengeTargetCombinationTransformationReference } from './i37-challenge-target-combination-transformation-reference.js';
import { buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview } from './i38-challenge-target-combination-condition-applicability-methodology-review.js';
import { buildResolvedI39ChallengeTargetCombinationConditionEvidence } from './i39-challenge-target-combination-condition-evidence.js';
import { buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview } from './i44-challenge-root-three-combination-effective-bureau-qualification-methodology-review.js';
import { buildI45ChallengeRootThreeCombinationBureauFormationEvidence } from './i45-challenge-root-three-combination-bureau-formation-evidence.js';
import {
  buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview,
  I46_CHALLENGE_ROOT_THREE_COMBINATION_SOURCE_BASIS,
} from './i46-challenge-root-three-combination-clash-break-damage-settlement-methodology-review.js';
import {
  buildI47ChallengeRootThreeCombinationClashPlacementSettlementEvidence,
  I47_CHALLENGE_ROOT_THREE_COMBINATION_CLASH_PLACEMENT_SETTLEMENT_EVIDENCE_VERSION,
} from './i47-challenge-root-three-combination-clash-placement-settlement-evidence.js';
import type { ChallengeMechanism } from './i24-challenge-mechanism-composition.js';

const SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];
export const SAJU_R36_BUREAU_BREAK_VERSION = '0.1.0-research' as const;
export const SAJU_R36_MECHANISMS = [
  'OUTPUT_LEAKAGE',
  'WEALTH_EXPENDITURE_CONTROL',
  'OFFICER_CONTROL_PRESSURE',
] as const satisfies readonly ChallengeMechanism[];

const definition = Object.freeze({
  primitiveId: 'SAJU_R36_SINGLE_TIGHT_EMBEDDED_BUREAU_BREAK',
  version: SAJU_R36_BUREAU_BREAK_VERSION,
  issue: 'GH-2419',
  decision: 'AUTHORIZED_RESEARCH_ONLY',
  semanticScope: 'single_i47_tight_embedded_clash_bureau_break_per_mechanism',
  upstreamVersion: I47_CHALLENGE_ROOT_THREE_COMBINATION_CLASH_PLACEMENT_SETTLEMENT_EVIDENCE_VERSION,
  sourceBasisHash: deterministicContentHash(I46_CHALLENGE_ROOT_THREE_COMBINATION_SOURCE_BASIS),
  singletonPerMechanismRequired: true,
  directBreakPlacement: 'EMBEDDED_WITHIN_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT',
  directBreakSettlement: 'BREAK_AUTHORIZED',
  directBreakVerdict: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
  otherPlacementNegativeVerdictAuthorized: false,
  intactBureauAuthorized: false,
  rootDestructionAuthorized: false,
  supportEffectAuthorized: false,
  effectiveForceAuthorized: false,
  hiddenActivationAuthorized: false,
  strengthClassificationAuthorized: false,
  transformationAuthorized: false,
  usefulFactorAuthorized: false,
  numericScoringAuthorized: false,
  narrativeMaterialityAuthorized: false,
  productionAuthorityAuthorized: false,
} as const);
export const SAJU_R36_BUREAU_BREAK_AUTHORITY = Object.freeze({
  ...definition,
  definitionHash: deterministicContentHash(definition),
});

export const SAJU_R36_BUREAU_BREAK_EVIDENCE_DEFINITION = {
  definitionId: 'RESEARCH-EVIDENCE-SAJU-R36-TIGHT-EMBEDDED-BUREAU-BREAK',
  version: '1.0.0-research',
  evidenceType: 'SAJU_R36_TIGHT_EMBEDDED_BUREAU_BREAK_EVIDENCE',
  evidenceVersion: 'saju-r36-tight-embedded-bureau-break-v1',
  producerRef: { id: 'BUILD-SAJU-R36-BUREAU-BREAK', version: '1.0.0-research' },
  payloadContractRef: { id: 'CONTRACT-SAJU-R36-BUREAU-BREAK', version: '1.0.0-research' },
  sourceIds: ['SRC-METHOD-DITIANSUI-CHANWEI-FANGJU-TIGHT-EMBEDDED-CLASH'],
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
} as const satisfies ResearchEvidenceDefinition;

type BreakIdentity = {
  readonly mechanism: ChallengeMechanism;
  readonly formationRelationId: string;
  readonly bureauParticipantPositions: readonly PillarSlot[];
  readonly bureauSpanStart: PillarSlot;
  readonly bureauSpanEnd: PillarSlot;
  readonly clashRelationId: string;
  readonly clashedBureauParticipantPosition: PillarSlot;
  readonly clashCounterpartPosition: PillarSlot;
  readonly placementClass: 'EMBEDDED_WITHIN_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT';
  readonly postInteractionBureauState: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH';
};

export function projectSajuR36BureauBreak(snapshot: CanonicalSajuSnapshot) {
  const fail = (reason: string) => ({
    status: 'unavailable' as const,
    reasonCode: 'saju-r36-bureau-break-' + reason,
  });
  if (
    typeof snapshot.snapshotId !== 'string' ||
    !snapshot.snapshotId.trim() ||
    typeof snapshot.calculationHash !== 'string' ||
    !snapshot.calculationHash.trim()
  ) return fail('snapshot-binding-missing');
  if (!Array.isArray(snapshot.scenarios) || snapshot.scenarios.length !== 0)
    return fail('scenario-materialization-required');
  const master = snapshot.derivedFacts.dayMaster;
  const day = snapshot.pillars.day;
  if (master?.status !== 'resolved' || day?.status !== 'resolved')
    return fail('day-master-unresolved');
  const dayStem = master.value.value;
  const masterStemIndex = HEAVENLY_STEMS.indexOf(dayStem);
  if (
    masterStemIndex < 0 ||
    master.value.hanja !== HEAVENLY_STEMS_HANJA[masterStemIndex] ||
    master.value.element !== getHeavenlyStemElement(dayStem) ||
    master.value.yinYang !== getHeavenlyStemYinYang(dayStem) ||
    deterministicContentHash(master.value) !== deterministicContentHash(day.value.stem)
  ) return fail('day-master-metadata-or-parity-failed');

  const pillars: StructuralPillarInput = {};
  for (const slot of SLOTS) {
    const pillar = snapshot.pillars[slot];
    if (pillar?.status !== 'resolved') return fail(slot + '-pillar-unresolved');
    const stem = pillar.value.stem.value;
    const branch = pillar.value.branch.value;
    const stemIndex = HEAVENLY_STEMS.indexOf(stem);
    const branchIndex = EARTHLY_BRANCHES.indexOf(branch);
    if (
      stemIndex < 0 ||
      branchIndex < 0 ||
      pillar.value.stem.hanja !== HEAVENLY_STEMS_HANJA[stemIndex] ||
      pillar.value.stem.element !== getHeavenlyStemElement(stem) ||
      pillar.value.stem.yinYang !== getHeavenlyStemYinYang(stem) ||
      pillar.value.branch.hanja !== EARTHLY_BRANCHES_HANJA[branchIndex] ||
      pillar.value.branch.element !== getEarthlyBranchElement(branch) ||
      pillar.value.branch.yinYang !== getEarthlyBranchYinYang(branch)
    ) return fail(slot + '-pillar-metadata-failed');
    pillars[slot] = pillar.value;
  }

  const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(pillars, snapshot.snapshotId);
  const relations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(pillars, roots);
  const combinations = buildResolvedI35ChallengeTargetCombinationDependencyEvidence(
    pillars, roots, relations,
  );
  const policy36 = buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();
  const references = buildI37ChallengeTargetCombinationTransformationReference(combinations, policy36);
  const policy38 = buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview();
  const conditions = buildResolvedI39ChallengeTargetCombinationConditionEvidence(
    pillars, combinations, references, policy38,
  );
  const policy44 = buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview();
  const formations = buildI45ChallengeRootThreeCombinationBureauFormationEvidence(conditions, policy44);
  const policy46 = buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview();
  const settlements = buildI47ChallengeRootThreeCombinationClashPlacementSettlementEvidence(
    pillars, formations, policy46,
  );
  if (
    roots.status !== 'RESOLVED_EVIDENCE' ||
    relations.status !== 'RESOLVED_ROUTING_EVIDENCE' ||
    combinations.status !== 'RESOLVED_DEPENDENCY_EVIDENCE' ||
    references.status !== 'RESOLVED_REFERENCE_METADATA' ||
    conditions.status !== 'RESOLVED_CONDITION_EVIDENCE' ||
    formations.status !== 'RESOLVED_STRUCTURAL_BUREAU_FORMATION' ||
    settlements.status !== 'RESOLVED_CLASH_PLACEMENT_SETTLEMENT_EVIDENCE'
  ) return fail('upstream-chain-unresolved');

  const outcomes = Object.fromEntries(SAJU_R36_MECHANISMS.map((mechanism) => {
    // I35/I39/I45 may carry several observations of one structural
    // bureau (one per target-root subject). Preserve the I47 decision
    // per unique bureau/clash identity instead of falsely requiring one
    // observational I45 item for the entire mechanism.
    const admittedIdentities: BreakIdentity[] = [];
    const keys = new Set<string>();
    for (const item of settlements.items) {
      if (
        item.mechanism !== mechanism ||
        item.directBreakCount !== 1 ||
        item.postInteractionBureauState !== definition.directBreakVerdict ||
        item.postInteractionBureauStateBasis !== 'SINGLE_SOURCE_BOUNDED_TIGHT_EMBEDDED_CLASH'
      ) continue;

      const direct = item.clashes.filter((clash) =>
        clash.placementClass === definition.directBreakPlacement &&
        clash.settlement === definition.directBreakSettlement &&
        clash.deterministicBureauState === definition.directBreakVerdict,
      );
      if (direct.length !== 1) continue;
      const clash = direct[0]!;
      const identity: BreakIdentity = {
        mechanism,
        formationRelationId: item.formationRelationId,
        bureauParticipantPositions: [...item.bureauParticipantPositions],
        bureauSpanStart: item.bureauSpanStart,
        bureauSpanEnd: item.bureauSpanEnd,
        clashRelationId: clash.clashRelationId,
        clashedBureauParticipantPosition: clash.clashedBureauParticipantPosition,
        clashCounterpartPosition: clash.clashCounterpartPosition,
        placementClass: definition.directBreakPlacement,
        postInteractionBureauState: definition.directBreakVerdict,
      };
      const identityKey = deterministicContentHash(identity);
      if (!keys.has(identityKey)) {
        keys.add(identityKey);
        admittedIdentities.push(identity);
      }
    }

    // Multiple distinct positive bureaus/clashes per mechanism are not
    // aggregated into one conclusion. Repeated observations of the
    // same exact relation and clash are one already-settled I47 fact.
    const observed = admittedIdentities.length === 1;
    return [
      mechanism,
      {
        observed,
        identity: observed ? admittedIdentities[0]! : null,
      },
    ];
  })) as Record<ChallengeMechanism, { readonly observed: boolean; readonly identity: BreakIdentity | null }>;

  return {
    status: 'resolved' as const,
    projection: {
      snapshotId: snapshot.snapshotId,
      snapshotHash: snapshot.calculationHash,
      dayMaster: dayStem,
      pillarSourceRefs: SLOTS.map((slot) => 'pillars.' + slot),
      upstreamReportIds: {
        i29: roots.reportId,
        i31: relations.reportId,
        i35: combinations.reportId,
        i36: policy36.reviewId,
        i37: references.reportId,
        i38: policy38.reviewId,
        i39: conditions.reportId,
        i44: policy44.reviewId,
        i45: formations.reportId,
        i46: policy46.reviewId,
        i47: settlements.reportId,
      },
      mechanismOutcomes: outcomes,
      authorityDefinitionHash: SAJU_R36_BUREAU_BREAK_AUTHORITY.definitionHash,
      sourceBasisHash: definition.sourceBasisHash,
      constraints: SAJU_R36_BUREAU_BREAK_AUTHORITY,
    },
  } as const;
}

export function buildSajuR36BureauBreakResearchEvidence(snapshot: CanonicalSajuSnapshot) {
  const result = projectSajuR36BureauBreak(snapshot);
  if (result.status !== 'resolved') return result;
  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      SAJU_R36_BUREAU_BREAK_EVIDENCE_DEFINITION, snapshot, result.projection,
    ),
  } as const;
}

export function validateSajuR36BureauBreakResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const validation = validateResearchEvidenceEnvelope(
    envelope, snapshot, SAJU_R36_BUREAU_BREAK_EVIDENCE_DEFINITION,
  );
  const errors = [...validation.errors];
  const result = projectSajuR36BureauBreak(snapshot);
  if (result.status !== 'resolved') errors.push(result.reasonCode);
  if (
    result.status !== 'resolved' ||
    deterministicContentHash(result.projection) !== deterministicContentHash(envelope.payload)
  ) errors.push('saju_r36_bureau_break_not_reproducible_from_snapshot');
  return { valid: errors.length === 0, errors: [...new Set(errors)].sort() };
}

export const SAJU_R36_BUREAU_BREAK_RUNTIME_ADAPTER = {
  definition: SAJU_R36_BUREAU_BREAK_EVIDENCE_DEFINITION,
  validate: validateSajuR36BureauBreakResearchEvidence,
} satisfies ResearchEvidenceRuntimeAdapter;
