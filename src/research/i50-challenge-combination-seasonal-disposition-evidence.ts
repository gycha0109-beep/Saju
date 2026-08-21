import type { FiveElement } from '../contracts/calculation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  seasonalElementPhase,
  type SeasonalElementPhase,
} from './i20-relative-force-evidence.js';
import type {
  ChallengeTargetCombinationConditionEvidenceItem,
  ChallengeTargetCombinationConditionEvidenceReport,
} from './i39-challenge-target-combination-condition-evidence.js';
import type {
  ChallengeRootThreeCombinationBureauFormationEvidenceItem,
  ChallengeRootThreeCombinationBureauFormationEvidenceReport,
} from './i45-challenge-root-three-combination-bureau-formation-evidence.js';
import {
  I49_SEASONAL_DISPOSITION_BY_PHASE,
  type ChallengeCombinationSeasonalCommandEffectMethodologyReviewReport,
  type ChallengeCombinationSeasonalDisposition,
} from './i49-challenge-combination-seasonal-command-effect-methodology-review.js';

export const I50_CHALLENGE_COMBINATION_SEASONAL_DISPOSITION_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-seasonal-disposition-evidence-v1';

export interface ChallengeCombinationParticipantSeasonalDispositionEvidence {
  pillar: ChallengeTargetCombinationConditionEvidenceItem['subjectPosition'];
  component: 'stem' | 'branch';
  value: string;
  element: FiveElement;
  seasonalPhase: SeasonalElementPhase;
  seasonalDisposition: ChallengeCombinationSeasonalDisposition;
  numericWeight: 'not_assigned';
}

export interface ChallengeCombinationFormedBureauSeasonalDispositionEvidence {
  formationState: 'STRUCTURAL_BUREAU_FORMED';
  bureauElement: FiveElement;
  seasonalPhase: SeasonalElementPhase;
  seasonalDisposition: ChallengeCombinationSeasonalDisposition;
  postInteractionBureauState: 'not_determined';
  effectiveBureauForce: 'not_determined';
  numericWeight: 'not_assigned';
}

export interface ChallengeCombinationSeasonalDispositionEvidenceItem {
  mechanism: ChallengeTargetCombinationConditionEvidenceItem['mechanism'];
  relationId: string;
  relationKind: ChallengeTargetCombinationConditionEvidenceItem['relationKind'];
  subjectKind: ChallengeTargetCombinationConditionEvidenceItem['subjectKind'];
  subjectPosition: ChallengeTargetCombinationConditionEvidenceItem['subjectPosition'];
  subjectValue: string;
  monthBranch: ChallengeTargetCombinationConditionEvidenceItem['seasonalCondition']['monthBranch'];
  commandElement: FiveElement;
  targetElement: FiveElement;
  targetSeasonalPhase: SeasonalElementPhase;
  targetSeasonalDisposition: ChallengeCombinationSeasonalDisposition;
  participantSeasonalDispositions: readonly ChallengeCombinationParticipantSeasonalDispositionEvidence[];
  formedThreeCombinationBureau?: ChallengeCombinationFormedBureauSeasonalDispositionEvidence;
  transformedResultSeasonalDisposition: 'not_emitted';
  seasonalCommandConditionEffect: 'RESOLVED_CATEGORICAL_DISPOSITION';
  participantSeasonalDispositionAggregation: 'not_performed';
  transformationConditionVerdict: 'not_determined';
  bindingState: 'not_determined';
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ChallengeCombinationSeasonalDispositionEvidenceReport {
  reportId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SEASONAL_DISPOSITION_EVIDENCE'
    | 'CONDITION_EVIDENCE_UNRESOLVED'
    | 'BUREAU_EVIDENCE_UNRESOLVED'
    | 'BUREAU_EVIDENCE_MISALIGNED'
    | 'METHODOLOGY_NOT_AUTHORIZED';
  upstreamI39ReportId: string;
  upstreamI45ReportId: string;
  upstreamI49ReviewId: string;
  items: readonly ChallengeCombinationSeasonalDispositionEvidenceItem[];
  seasonalDispositionEvidenceAvailable: boolean;
  seasonalCommandConditionEffectResolvedCategorically: boolean;
  participantSeasonalDispositionAggregationAuthorized: false;
  transformedResultSeasonalDispositionEmissionAuthorized: false;
  postInteractionBureauStateEmissionAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function finalized(
  material: Omit<ChallengeCombinationSeasonalDispositionEvidenceReport, 'reportId'>,
): ChallengeCombinationSeasonalDispositionEvidenceReport {
  return {
    reportId: `challenge_combination_seasonal_disposition_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function unresolved(
  status: Exclude<
    ChallengeCombinationSeasonalDispositionEvidenceReport['status'],
    'RESOLVED_SEASONAL_DISPOSITION_EVIDENCE'
  >,
  conditionEvidence: ChallengeTargetCombinationConditionEvidenceReport,
  bureauEvidence: ChallengeRootThreeCombinationBureauFormationEvidenceReport,
  methodology: ChallengeCombinationSeasonalCommandEffectMethodologyReviewReport,
  notes: readonly string[],
): ChallengeCombinationSeasonalDispositionEvidenceReport {
  return finalized({
    evidenceVersion: I50_CHALLENGE_COMBINATION_SEASONAL_DISPOSITION_EVIDENCE_VERSION,
    status,
    upstreamI39ReportId: conditionEvidence.reportId,
    upstreamI45ReportId: bureauEvidence.reportId,
    upstreamI49ReviewId: methodology.reviewId,
    items: [],
    seasonalDispositionEvidenceAvailable: false,
    seasonalCommandConditionEffectResolvedCategorically: false,
    participantSeasonalDispositionAggregationAuthorized: false,
    transformedResultSeasonalDispositionEmissionAuthorized: false,
    postInteractionBureauStateEmissionAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes,
  });
}

function methodologyAuthorized(
  methodology: ChallengeCombinationSeasonalCommandEffectMethodologyReviewReport,
): boolean {
  return (
    methodology.decision ===
      'SOURCE_BOUNDED_SEASONAL_DISPOSITION_AUTHORIZED_RELATION_RESULT_BLOCKED' &&
    methodology.monthCommandSeasonalPhaseContractResolved &&
    methodology.targetElementSeasonalDispositionAuthorized &&
    methodology.participantElementSeasonalDispositionAuthorized &&
    methodology.formedThreeCombinationBureauElementSeasonalDispositionAuthorized &&
    methodology.formedThreeCombinationBureauElementRequiresStructuralFormationEvidence &&
    methodology.seasonalDispositionAdapterAuthorized &&
    methodology.stemChallengeTransformedElementSeasonalDispositionAuthorized === false &&
    methodology.sixCombinationTransformedElementSeasonalDispositionAuthorized === false &&
    methodology.seasonalDispositionIsFinalRelativeForceVerdict === false &&
    methodology.seasonalDispositionToTransformationVerdictAuthorized === false &&
    methodology.seasonalDispositionToBindingVerdictAuthorized === false &&
    methodology.seasonalDispositionToPostInteractionBureauStateAuthorized === false &&
    methodology.seasonalDispositionToTargetPostRelationRootStateAuthorized === false &&
    methodology.seasonalDispositionToEffectiveMechanismForceAuthorized === false &&
    methodology.participantSeasonalDispositionAggregationAuthorized === false &&
    methodology.seasonalDispositionWeightingAuthorized === false &&
    methodology.additiveSeasonalScoringAuthorized === false &&
    methodology.classificationAuthorized === false &&
    methodology.numericScoringAuthorized === false
  );
}

function bureauEvidenceAligned(
  conditionEvidence: ChallengeTargetCombinationConditionEvidenceReport,
  bureauEvidence: ChallengeRootThreeCombinationBureauFormationEvidenceReport,
): boolean {
  const threeItems = conditionEvidence.items.filter(
    (item) => item.relationKind === 'branch_three_combination',
  );
  if (threeItems.length !== bureauEvidence.items.length) return false;

  return threeItems.every((condition) => {
    const bureau = bureauEvidence.items.find(
      (item) =>
        item.relationId === condition.relationId &&
        item.mechanism === condition.mechanism &&
        item.subjectPosition === condition.subjectPosition &&
        item.subjectValue === String(condition.subjectValue),
    );
    return (
      bureau !== undefined &&
      bureau.formationState === 'STRUCTURAL_BUREAU_FORMED' &&
      bureau.formationBasis === 'FULL_THREE_BRANCH_MEMBERSHIP' &&
      bureau.fullMembershipObserved &&
      bureau.targetPostRelationRootState === 'not_determined' &&
      bureau.effectiveMechanismForceVerdict === 'not_determined'
    );
  });
}

function formedBureauFor(
  condition: ChallengeTargetCombinationConditionEvidenceItem,
  bureauItems: readonly ChallengeRootThreeCombinationBureauFormationEvidenceItem[],
): ChallengeRootThreeCombinationBureauFormationEvidenceItem | undefined {
  if (condition.relationKind !== 'branch_three_combination') return undefined;
  return bureauItems.find(
    (item) =>
      item.relationId === condition.relationId &&
      item.mechanism === condition.mechanism &&
      item.subjectPosition === condition.subjectPosition &&
      item.subjectValue === String(condition.subjectValue),
  );
}

function participantDisposition(
  participant: ChallengeTargetCombinationConditionEvidenceItem['supportInterference']['participantContexts'][number],
): ChallengeCombinationParticipantSeasonalDispositionEvidence {
  return {
    pillar: participant.pillar,
    component: participant.component,
    value: String(participant.value),
    element: participant.element,
    seasonalPhase: participant.seasonalPhase,
    seasonalDisposition: I49_SEASONAL_DISPOSITION_BY_PHASE[participant.seasonalPhase],
    numericWeight: 'not_assigned',
  };
}

function evidenceItem(
  condition: ChallengeTargetCombinationConditionEvidenceItem,
  bureauItems: readonly ChallengeRootThreeCombinationBureauFormationEvidenceItem[],
): ChallengeCombinationSeasonalDispositionEvidenceItem {
  const bureau = formedBureauFor(condition, bureauItems);
  const formedThreeCombinationBureau =
    bureau === undefined
      ? undefined
      : (() => {
          const phase = seasonalElementPhase(
            condition.seasonalCondition.commandElement,
            bureau.traditionalBureauElement,
          );
          return {
            formationState: 'STRUCTURAL_BUREAU_FORMED' as const,
            bureauElement: bureau.traditionalBureauElement,
            seasonalPhase: phase,
            seasonalDisposition: I49_SEASONAL_DISPOSITION_BY_PHASE[phase],
            postInteractionBureauState: 'not_determined' as const,
            effectiveBureauForce: 'not_determined' as const,
            numericWeight: 'not_assigned' as const,
          };
        })();

  return {
    mechanism: condition.mechanism,
    relationId: condition.relationId,
    relationKind: condition.relationKind,
    subjectKind: condition.subjectKind,
    subjectPosition: condition.subjectPosition,
    subjectValue: String(condition.subjectValue),
    monthBranch: condition.seasonalCondition.monthBranch,
    commandElement: condition.seasonalCondition.commandElement,
    targetElement: condition.targetElement,
    targetSeasonalPhase: condition.seasonalCondition.targetElementSeasonalPhase,
    targetSeasonalDisposition:
      I49_SEASONAL_DISPOSITION_BY_PHASE[condition.seasonalCondition.targetElementSeasonalPhase],
    participantSeasonalDispositions:
      condition.supportInterference.participantContexts.map(participantDisposition),
    ...(formedThreeCombinationBureau === undefined ? {} : { formedThreeCombinationBureau }),
    transformedResultSeasonalDisposition: 'not_emitted',
    seasonalCommandConditionEffect: 'RESOLVED_CATEGORICAL_DISPOSITION',
    participantSeasonalDispositionAggregation: 'not_performed',
    transformationConditionVerdict: 'not_determined',
    bindingState: 'not_determined',
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    numericScore: 'not_assigned',
  };
}

export function buildI50ChallengeCombinationSeasonalDispositionEvidence(
  conditionEvidence: ChallengeTargetCombinationConditionEvidenceReport,
  bureauEvidence: ChallengeRootThreeCombinationBureauFormationEvidenceReport,
  methodology: ChallengeCombinationSeasonalCommandEffectMethodologyReviewReport,
): ChallengeCombinationSeasonalDispositionEvidenceReport {
  if (conditionEvidence.status !== 'RESOLVED_CONDITION_EVIDENCE') {
    return unresolved('CONDITION_EVIDENCE_UNRESOLVED', conditionEvidence, bureauEvidence, methodology, [
      'Resolved I39 condition evidence is required before I50 seasonal-disposition materialization.',
    ]);
  }
  if (bureauEvidence.status !== 'RESOLVED_STRUCTURAL_BUREAU_FORMATION') {
    return unresolved('BUREAU_EVIDENCE_UNRESOLVED', conditionEvidence, bureauEvidence, methodology, [
      'Resolved I45 structural bureau-formation evidence is required so three-combination bureau seasonal disposition cannot be invented from reference metadata alone.',
    ]);
  }
  if (
    bureauEvidence.upstreamI39ReportId !== conditionEvidence.reportId ||
    !bureauEvidenceAligned(conditionEvidence, bureauEvidence)
  ) {
    return unresolved('BUREAU_EVIDENCE_MISALIGNED', conditionEvidence, bureauEvidence, methodology, [
      'The supplied I45 report is not aligned to the exact I39 condition evidence used by I50.',
    ]);
  }
  if (!methodologyAuthorized(methodology)) {
    return unresolved('METHODOLOGY_NOT_AUTHORIZED', conditionEvidence, bureauEvidence, methodology, [
      'I49 does not authorize the source-bounded categorical seasonal-disposition evidence contract required by I50.',
    ]);
  }

  const items = conditionEvidence.items.map((item) => evidenceItem(item, bureauEvidence.items));

  return finalized({
    evidenceVersion: I50_CHALLENGE_COMBINATION_SEASONAL_DISPOSITION_EVIDENCE_VERSION,
    status: 'RESOLVED_SEASONAL_DISPOSITION_EVIDENCE',
    upstreamI39ReportId: conditionEvidence.reportId,
    upstreamI45ReportId: bureauEvidence.reportId,
    upstreamI49ReviewId: methodology.reviewId,
    items,
    seasonalDispositionEvidenceAvailable: true,
    seasonalCommandConditionEffectResolvedCategorically: true,
    participantSeasonalDispositionAggregationAuthorized: false,
    transformedResultSeasonalDispositionEmissionAuthorized: false,
    postInteractionBureauStateEmissionAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [
      'I50 converts only already-resolved I39 旺/相/休/囚/死 phases into I49-authorized categorical seasonal dispositions.',
      'Target and participant dispositions remain identity-local and are never aggregated into one relation score or force verdict.',
      'For an aligned I45 STRUCTURAL_BUREAU_FORMED item, I50 also derives the formed bureau element seasonal disposition against the same month command.',
      'The formed bureau seasonal disposition does not establish post-interaction survival, damage, root state, or effective mechanism force.',
      'No transformed-result seasonal disposition is emitted for stem or six-combination routes, preserving I42/I43 scope closures.',
      'Transformation, binding, usefulness/harmfulness, numeric scoring, classification, and final relative force remain unresolved or unauthorized.',
    ],
  });
}
