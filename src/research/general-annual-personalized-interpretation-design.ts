import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  R139_AUTHORITY,
  R139_METHODOLOGY_COMPOSITION_MATRIX_VERSION,
} from './general-natal-methodology-composition-admissibility-matrix.js';
import {
  R154_AUTHORITY,
  R154_DAYUN_ANNUAL_CONFLICT_ORDER_SENSITIVITY_VERSION,
} from './general-natal-dayun-annual-conflict-order-sensitivity-corpus.js';
import { buildGeneralAnnualFourteenRuleDecision } from './general-annual-fact-only-preview.js';
import {
  buildGeneralAnnualThreeLayerFactCorpus,
  type ThreeLayerPairKey,
  type ThreeLayerPairMatch,
} from './general-annual-three-layer-fact-corpus.js';

export const GENERAL_ANNUAL_PERSONAL_INTERPRETATION_DESIGN_VERSION =
  'sa7d-general-annual-personal-interpretation-design-v1' as const;

export type GeneralAnnualInterpretationGate =
  | 'INPUT_UNAVAILABLE'
  | 'FACTS_READY_SEMANTICS_BLOCKED';

export type GeneralAnnualInterpretationResearchBlocker =
  | 'ANNUAL_MODERN_THEME_EVIDENCE_MISSING'
  | 'ANNUAL_CLASH_MEANING_EVIDENCE_MISSING'
  | 'DAYUN_ANNUAL_METHOD_COMPOSITION_UNAPPROVED'
  | 'GLOBAL_PRECEDENCE_NOT_AUTHORIZED'
  | 'MULTIPLE_RELATION_CONFLICT_NOT_ADJUDICATED'
  | 'TEMPORAL_EFFECT_TIMING_NOT_ESTABLISHED'
  | 'LIFE_DOMAIN_OUTCOME_EVIDENCE_MISSING'
  | 'SCHOOL_SCOPE_EXCEPTIONS_UNREVIEWED';

export type GeneralAnnualPersonalNarrativeSlot =
  | 'annual_ten_god_theme'
  | 'natal_dayun_annual_interaction'
  | 'coexisting_relations'
  | 'annual_effect_timing'
  | 'personal_life_domain'
  | 'exceptions_and_counterexamples';

export interface GeneralAnnualInterpretationSlotDesign {
  slot: GeneralAnnualPersonalNarrativeSlot;
  status: 'RESEARCH_HOLD';
  prerequisiteEvidenceCodes: readonly GeneralAnnualInterpretationResearchBlocker[];
  candidateInterpretationText: null;
  emittedClaimCount: 0;
}

export interface GeneralAnnualCoexistingPair {
  pairKey: ThreeLayerPairKey;
  observedRelationKinds: readonly ThreeLayerPairMatch['kind'][];
  evidenceIds: readonly string[];
  observedRelationCount: number;
  winningRelation: null;
  strengthRanking: null;
  eventImplication: null;
}

export type GeneralAnnualPersonalInterpretationDesign =
  | {
      status: 'blocked';
      gate: 'INPUT_UNAVAILABLE';
      upstreamReasonCode: string;
      interpretationAllowed: false;
      productionAuthorized: false;
    }
  | {
      status: 'design_only';
      gate: 'FACTS_READY_SEMANTICS_BLOCKED';
      schemaVersion: typeof GENERAL_ANNUAL_PERSONAL_INTERPRETATION_DESIGN_VERSION;
      designId: string;
      snapshotId: string;
      requestId: string;
      targetYear: number;
      effectiveYear: number;
      sourceBindings: {
        threeLayerCorpusHash: string;
        fourteenRuleDecisionHash: string;
        dayunContextId: string;
        structuralRelationDefinitionHash: string;
        methodologyReviewVersion: typeof R139_METHODOLOGY_COMPOSITION_MATRIX_VERSION;
        crossLayerOrderReviewVersion: typeof R154_DAYUN_ANNUAL_CONFLICT_ORDER_SENSITIVITY_VERSION;
      };
      inputs: {
        natalPillarCount: 4;
        dayunSegmentCount: 1;
        annualPillarCount: 1;
        computedPairCount: 9;
        observedPairMatchCount: number;
        observedPairKeys: readonly ThreeLayerPairKey[];
      };
      coexistence: readonly GeneralAnnualCoexistingPair[];
      unresolvedRelationCoexistence: boolean;
      slots: readonly GeneralAnnualInterpretationSlotDesign[];
      unresolvedEvidence: readonly GeneralAnnualInterpretationResearchBlocker[];
      authority: {
        approvedModernAnnualRuleCount: 0;
        natalBaselineMutationAuthorized: false;
        annualOverDayunPriorityAuthorized: false;
        dayunOverAnnualPriorityAuthorized: false;
        numericWeightOrSeverityAuthorized: false;
        mayGenerateAnnualInterpretation: false;
        mayCallModel: false;
        mayIssueInterpretationClaim: false;
        mayRenderOfficialReading: false;
        productionAuthorized: false;
        commerceAuthorized: false;
      };
    };

const SLOT_REQUIREMENTS: readonly {
  slot: GeneralAnnualPersonalNarrativeSlot;
  prerequisiteEvidenceCodes: readonly GeneralAnnualInterpretationResearchBlocker[];
}[] = Object.freeze([
  {
    slot: 'annual_ten_god_theme',
    prerequisiteEvidenceCodes: ['ANNUAL_MODERN_THEME_EVIDENCE_MISSING'],
  },
  {
    slot: 'natal_dayun_annual_interaction',
    prerequisiteEvidenceCodes: [
      'DAYUN_ANNUAL_METHOD_COMPOSITION_UNAPPROVED',
      'GLOBAL_PRECEDENCE_NOT_AUTHORIZED',
    ],
  },
  {
    slot: 'coexisting_relations',
    prerequisiteEvidenceCodes: [
      'ANNUAL_CLASH_MEANING_EVIDENCE_MISSING',
      'MULTIPLE_RELATION_CONFLICT_NOT_ADJUDICATED',
    ],
  },
  {
    slot: 'annual_effect_timing',
    prerequisiteEvidenceCodes: ['TEMPORAL_EFFECT_TIMING_NOT_ESTABLISHED'],
  },
  {
    slot: 'personal_life_domain',
    prerequisiteEvidenceCodes: [
      'ANNUAL_MODERN_THEME_EVIDENCE_MISSING',
      'LIFE_DOMAIN_OUTCOME_EVIDENCE_MISSING',
    ],
  },
  {
    slot: 'exceptions_and_counterexamples',
    prerequisiteEvidenceCodes: ['SCHOOL_SCOPE_EXCEPTIONS_UNREVIEWED'],
  },
]);

/**
 * Architecture contract, not a Saju interpreter. We deliberately do not
 * accept caller-provided semantic rules or return proposed fortune wording.
 */
export function designGeneralAnnualPersonalInterpretation(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
): GeneralAnnualPersonalInterpretationDesign {
  const corpus = buildGeneralAnnualThreeLayerFactCorpus(snapshot, request);
  if (corpus.state === 'unavailable') {
    return {
      status: 'blocked',
      gate: 'INPUT_UNAVAILABLE',
      upstreamReasonCode: corpus.upstreamReasonCode ?? corpus.reasonCode,
      interpretationAllowed: false,
      productionAuthorized: false,
    };
  }
  const review = buildGeneralAnnualFourteenRuleDecision();

  // These are repository-researched limitations, not "defaults". If the
  // upstream authority advances, new admission review is required.
  if (
    review.summary.currentRuleCount !== 14 ||
    review.summary.modernMeaningAdmittedCount !== 0 ||
    review.decisionHash !== corpus.sourceBinding.existingFourteenRuleDecisionHash ||
    review.authority.mayGenerateAnnualInterpretation ||
    review.authority.productionAuthorized ||
    !R139_AUTHORITY.researchOnly ||
    R139_AUTHORITY.globalCompositionAuthorized ||
    R139_AUTHORITY.methodWinnerResolverAuthorized ||
    R139_AUTHORITY.numericMethodPriorityAuthorized ||
    R139_AUTHORITY.interpretationClaimEmissionAuthorized ||
    !R154_AUTHORITY.researchOnly ||
    R154_AUTHORITY.annualAlwaysOverridesDayunAuthorized ||
    R154_AUTHORITY.dayunAlwaysOverridesAnnualAuthorized ||
    R154_AUTHORITY.firstMatchWinsAuthorized ||
    R154_AUTHORITY.lastAppliedWinsAuthorized ||
    R154_AUTHORITY.relationCountAsSeverityAuthorized ||
    R154_AUTHORITY.deterministicTemporalEventAuthorized ||
    R154_AUTHORITY.interpretationClaimEmissionAuthorized
  ) {
    throw new Error('Annual interpretation design requires fresh review after authority drift');
  }

  const observedPairKeys = corpus.pairChecks.map((item) => item.pairKey);
  if (
    corpus.pairChecks.length !== 9 ||
    new Set(observedPairKeys).size !== 9 ||
    corpus.limits.precedenceOrStrengthRankingAuthorized ||
    corpus.limits.mayGenerateAnnualInterpretation ||
    corpus.limits.productionAuthorized
  ) {
    throw new Error('Annual interpretation design received an unreviewed three-layer corpus');
  }

  const coexistence = corpus.pairChecks.map((check): GeneralAnnualCoexistingPair => {
    const observed = corpus.pairMatches.filter((match) => match.pairKey === check.pairKey);
    if (
      observed.length !== check.observedKinds.length ||
      observed.some((match, index) =>
        match.kind !== check.observedKinds[index] ||
        !match.structuralMatchOnly ||
        match.transformationEstablished ||
        match.strengthOrOutcomeDetermined
      )
    ) {
      throw new Error('Annual pair evidence does not match the checked relation facts');
    }

    return {
      pairKey: check.pairKey,
      observedRelationKinds: [...check.observedKinds],
      evidenceIds: observed.map((match) =>
        deterministicContentHash({
          corpusHash: corpus.corpusHash,
          pairKey: match.pairKey,
          kind: match.kind,
          observedLeftStem: match.observedLeftStem,
          observedRightStem: match.observedRightStem,
          observedLeftBranch: match.observedLeftBranch,
          observedRightBranch: match.observedRightBranch,
          sourceIds: match.sourceIds,
        }),
      ),
      observedRelationCount: observed.length,
      winningRelation: null,
      strengthRanking: null,
      eventImplication: null,
    };
  });

  const slots = SLOT_REQUIREMENTS.map(({ slot, prerequisiteEvidenceCodes }) => ({
    slot,
    status: 'RESEARCH_HOLD' as const,
    prerequisiteEvidenceCodes: [...prerequisiteEvidenceCodes],
    candidateInterpretationText: null,
    emittedClaimCount: 0 as const,
  }));
  const unresolvedEvidence = [...new Set(
    slots.flatMap((slot) => slot.prerequisiteEvidenceCodes),
  )];

  const data = {
    schemaVersion: GENERAL_ANNUAL_PERSONAL_INTERPRETATION_DESIGN_VERSION,
    snapshotId: corpus.snapshotId,
    requestId: corpus.requestId,
    targetYear: corpus.targetYear,
    effectiveYear: corpus.effectiveYear,
    sourceBindings: {
      threeLayerCorpusHash: corpus.corpusHash,
      fourteenRuleDecisionHash: review.decisionHash,
      dayunContextId: corpus.dayun.contextId,
      structuralRelationDefinitionHash: corpus.sourceBinding.structuralRelationDefinitionHash,
      methodologyReviewVersion: R139_METHODOLOGY_COMPOSITION_MATRIX_VERSION,
      crossLayerOrderReviewVersion: R154_DAYUN_ANNUAL_CONFLICT_ORDER_SENSITIVITY_VERSION,
    },
    inputs: {
      natalPillarCount: 4 as const,
      dayunSegmentCount: 1 as const,
      annualPillarCount: 1 as const,
      computedPairCount: 9 as const,
      observedPairMatchCount: corpus.pairMatches.length,
      observedPairKeys,
    },
    coexistence,
    unresolvedRelationCoexistence:
      corpus.pairMatches.length > 1 ||
      coexistence.some((pair) => pair.observedRelationCount > 1),
    slots,
    unresolvedEvidence,
    authority: {
      approvedModernAnnualRuleCount: 0 as const,
      natalBaselineMutationAuthorized: false as const,
      annualOverDayunPriorityAuthorized: false as const,
      dayunOverAnnualPriorityAuthorized: false as const,
      numericWeightOrSeverityAuthorized: false as const,
      mayGenerateAnnualInterpretation: false as const,
      mayCallModel: false as const,
      mayIssueInterpretationClaim: false as const,
      mayRenderOfficialReading: false as const,
      productionAuthorized: false as const,
      commerceAuthorized: false as const,
    },
  };

  return Object.freeze({
    status: 'design_only',
    gate: 'FACTS_READY_SEMANTICS_BLOCKED',
    ...data,
    designId: deterministicContentHash(data),
  });
}
