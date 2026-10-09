import {
  EAR_DIRECT_RULES_FR311L,
  EAR_NAMED_FORM_SEMANTICS_FR311L,
  FR311L_EAR_SUMMARY,
  type EarCertaintyFR311L,
  type EarLifeStageFR311L,
  type EarObservationKindFR311L,
  type EarPolarityFR311L,
  type EarRegionKeyFR311L,
  type EarSemanticTopicFR311L,
} from './traditional-ear-semantics-fr311l.js';

export interface EarNamedFormEvidenceFR311O {
  readonly evidenceId: string;
  readonly formKey: string;
  readonly traditionalLabel: string;
  readonly claimId: string;
  readonly topicKey: EarSemanticTopicFR311L;
  readonly lifeStage: EarLifeStageFR311L;
  readonly polarity: EarPolarityFR311L;
  readonly certainty: EarCertaintyFR311L;
  readonly sourceFragment: string;
  readonly meaningSummary: string;
  readonly sourceText: string;
  readonly sourceRefs: readonly string[];
  readonly historicalTraditionalDoctrineOnly: true;
  readonly modernScientificFactAuthorized: false;
  readonly healthDiagnosisAuthorized: false;
  readonly lifespanPredictionAuthorized: false;
  readonly spouseDeathPredictionAuthorized: false;
  readonly familyDeathPredictionAuthorized: false;
  readonly fertilityPredictionAuthorized: false;
  readonly childSexPredictionAuthorized: false;
  readonly personalityFactAuthorized: false;
  readonly moralityFactAuthorized: false;
  readonly criminalityFactAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

export interface EarDirectRuleEvidenceFR311O {
  readonly evidenceId: string;
  readonly ruleId: string;
  readonly region: EarRegionKeyFR311L;
  readonly sourceExpression: string;
  readonly observationKind: EarObservationKindFR311L;
  readonly meaningSummary: string;
  readonly topicKeys: readonly EarSemanticTopicFR311L[];
  readonly polarity: EarPolarityFR311L;
  readonly lifeStage: EarLifeStageFR311L;
  readonly relationTarget: string | null;
  readonly certainty: EarCertaintyFR311L;
  readonly sourceRefs: readonly string[];
  readonly historicalTraditionalDoctrineOnly: true;
  readonly modernScientificFactAuthorized: false;
  readonly healthDiagnosisAuthorized: false;
  readonly lifespanPredictionAuthorized: false;
  readonly spouseDeathPredictionAuthorized: false;
  readonly familyDeathPredictionAuthorized: false;
  readonly fertilityPredictionAuthorized: false;
  readonly childSexPredictionAuthorized: false;
  readonly personalityFactAuthorized: false;
  readonly moralityFactAuthorized: false;
  readonly criminalityFactAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

export interface EarNamedFormContextFR311O {
  readonly contextId: string;
  readonly formKey: string;
  readonly traditionalLabel: string;
  readonly descriptorId: string;
  readonly sourceExpression: string;
  readonly contextSummary: string;
  readonly certainty: EarCertaintyFR311L;
  readonly sourceRefs: readonly string[];
  readonly semanticCombinationAuthorized: false;
  readonly relationInferenceAuthorized: false;
  readonly neutralGeometryBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

export const EAR_NAMED_FORM_EVIDENCE_FR311O: readonly EarNamedFormEvidenceFR311O[] =
  Object.freeze(
    EAR_NAMED_FORM_SEMANTICS_FR311L.flatMap((record) =>
      record.claims.map((claim) => Object.freeze({
        evidenceId: 'fr311o.named.' + claim.claimId,
        formKey: record.formKey,
        traditionalLabel: record.traditionalLabel,
        claimId: claim.claimId,
        topicKey: claim.topicKey,
        lifeStage: claim.lifeStage,
        polarity: claim.polarity,
        certainty: claim.certainty,
        sourceFragment: claim.sourceFragment,
        meaningSummary: claim.meaningSummary,
        sourceText: record.sourceText,
        sourceRefs: Object.freeze([...record.sourceRefs]),
        historicalTraditionalDoctrineOnly: true as const,
        modernScientificFactAuthorized: false as const,
        healthDiagnosisAuthorized: false as const,
        lifespanPredictionAuthorized: false as const,
        spouseDeathPredictionAuthorized: false as const,
        familyDeathPredictionAuthorized: false as const,
        fertilityPredictionAuthorized: false as const,
        childSexPredictionAuthorized: false as const,
        personalityFactAuthorized: false as const,
        moralityFactAuthorized: false as const,
        criminalityFactAuthorized: false as const,
        productInterpretationAuthorized: false as const,
      })),
    ),
  );

export const EAR_DIRECT_RULE_EVIDENCE_FR311O: readonly EarDirectRuleEvidenceFR311O[] =
  Object.freeze(
    EAR_DIRECT_RULES_FR311L.map((rule) => Object.freeze({
      evidenceId: 'fr311o.direct.' + rule.ruleId,
      ruleId: rule.ruleId,
      region: rule.region,
      sourceExpression: rule.sourceExpression,
      observationKind: rule.observationKind,
      meaningSummary: rule.meaningSummary,
      topicKeys: Object.freeze([...rule.topicKeys]),
      polarity: rule.polarity,
      lifeStage: rule.lifeStage,
      relationTarget: rule.relationTarget,
      certainty: rule.certainty,
      sourceRefs: Object.freeze([...rule.sourceRefs]),
      historicalTraditionalDoctrineOnly: true as const,
      modernScientificFactAuthorized: false as const,
      healthDiagnosisAuthorized: false as const,
      lifespanPredictionAuthorized: false as const,
      spouseDeathPredictionAuthorized: false as const,
      familyDeathPredictionAuthorized: false as const,
      fertilityPredictionAuthorized: false as const,
      childSexPredictionAuthorized: false as const,
      personalityFactAuthorized: false as const,
      moralityFactAuthorized: false as const,
      criminalityFactAuthorized: false as const,
      productInterpretationAuthorized: false as const,
    })),
  );

export const EAR_NAMED_FORM_CONTEXTS_FR311O: readonly EarNamedFormContextFR311O[] =
  Object.freeze(
    EAR_NAMED_FORM_SEMANTICS_FR311L.flatMap((record) =>
      record.descriptors
        .filter((descriptor) =>
          descriptor.observationKind === 'cross_region_context' ||
          descriptor.region === 'context')
        .map((descriptor) => Object.freeze({
          contextId: 'fr311o.context.' + descriptor.descriptorId,
          formKey: record.formKey,
          traditionalLabel: record.traditionalLabel,
          descriptorId: descriptor.descriptorId,
          sourceExpression: descriptor.sourceFragment,
          contextSummary: '귀 명명형 원문 내부의 타부위 동반 문맥이며 독립적인 일반 관계·조합 의미로 승격하지 않는다.',
          certainty: descriptor.certainty,
          sourceRefs: Object.freeze([...record.sourceRefs]),
          semanticCombinationAuthorized: false as const,
          relationInferenceAuthorized: false as const,
          neutralGeometryBindingAuthorized: false as const,
          productInterpretationAuthorized: false as const,
        })),
    ),
  );

export const FR311O_INDEX_SUMMARY = Object.freeze({
  sourceDirectRules: FR311L_EAR_SUMMARY.directRules,
  directRules: EAR_DIRECT_RULE_EVIDENCE_FR311O.length,
  sourceNamedForms: FR311L_EAR_SUMMARY.namedForms,
  namedForms: new Set(EAR_NAMED_FORM_EVIDENCE_FR311O.map((item) => item.formKey)).size,
  sourceNamedClaims: FR311L_EAR_SUMMARY.namedFormClaims,
  namedClaims: EAR_NAMED_FORM_EVIDENCE_FR311O.length,
  namedFormContexts: EAR_NAMED_FORM_CONTEXTS_FR311O.length,
});

export const FR311O_INDEX_AUTHORITY_BOUNDARY = Object.freeze({
  namedFormClassifierAuthorized: false as const,
  traditionalRuleInferenceAuthorized: false as const,
  contextSemanticPromotionAuthorized: false as const,
  scoreAuthorized: false as const,
  aggregateGoodBadJudgementAuthorized: false as const,
  unsupportedSynthesisAuthorized: false as const,
  sourcePriorityInferenceAuthorized: false as const,
  traditionalRegionToNeutralGeometryBindingAuthorized: false as const,
  providerLandmarkBindingAuthorized: false as const,
  metricThresholdAuthorized: false as const,
  modernScientificFactAuthorized: false as const,
  healthDiagnosisAuthorized: false as const,
  lifespanPredictionAuthorized: false as const,
  spouseDeathPredictionAuthorized: false as const,
  familyDeathPredictionAuthorized: false as const,
  fertilityPredictionAuthorized: false as const,
  childSexPredictionAuthorized: false as const,
  personalityFactAuthorized: false as const,
  moralityFactAuthorized: false as const,
  criminalityFactAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

function assertUnique(values: readonly string[], path: string): void {
  if (new Set(values).size !== values.length) {
    throw new Error('fr311o_duplicate:' + path);
  }
}

export function assertFaceEarEvidenceIndexFR311O(): void {
  if (FR311O_INDEX_SUMMARY.directRules !== 57 ||
      FR311O_INDEX_SUMMARY.sourceDirectRules !== 57) {
    throw new Error('fr311o_direct_rule_count_drift:' + FR311O_INDEX_SUMMARY.directRules);
  }
  if (FR311O_INDEX_SUMMARY.namedForms !== 16 ||
      FR311O_INDEX_SUMMARY.sourceNamedForms !== 16) {
    throw new Error('fr311o_named_form_count_drift:' + FR311O_INDEX_SUMMARY.namedForms);
  }
  if (FR311O_INDEX_SUMMARY.namedClaims !== 46 ||
      FR311O_INDEX_SUMMARY.sourceNamedClaims !== 46) {
    throw new Error('fr311o_named_claim_count_drift:' + FR311O_INDEX_SUMMARY.namedClaims);
  }
  if (FR311O_INDEX_SUMMARY.namedFormContexts !== 10) {
    throw new Error('fr311o_named_context_count_drift:' + FR311O_INDEX_SUMMARY.namedFormContexts);
  }

  assertUnique(EAR_NAMED_FORM_EVIDENCE_FR311O.map((item) => item.evidenceId), 'named_evidence');
  assertUnique(EAR_NAMED_FORM_EVIDENCE_FR311O.map((item) => item.claimId), 'named_claim');
  assertUnique(EAR_DIRECT_RULE_EVIDENCE_FR311O.map((item) => item.ruleId), 'direct_rule');
  assertUnique(EAR_NAMED_FORM_CONTEXTS_FR311O.map((item) => item.contextId), 'named_context');

  for (const item of EAR_NAMED_FORM_EVIDENCE_FR311O) {
    if (item.historicalTraditionalDoctrineOnly !== true ||
        item.modernScientificFactAuthorized !== false ||
        item.healthDiagnosisAuthorized !== false ||
        item.lifespanPredictionAuthorized !== false ||
        item.spouseDeathPredictionAuthorized !== false ||
        item.familyDeathPredictionAuthorized !== false ||
        item.fertilityPredictionAuthorized !== false ||
        item.childSexPredictionAuthorized !== false ||
        item.personalityFactAuthorized !== false ||
        item.moralityFactAuthorized !== false ||
        item.criminalityFactAuthorized !== false ||
        item.productInterpretationAuthorized !== false) {
      throw new Error('fr311o_named_authority_widening:' + item.evidenceId);
    }
  }

  for (const item of EAR_DIRECT_RULE_EVIDENCE_FR311O) {
    if (item.historicalTraditionalDoctrineOnly !== true ||
        item.modernScientificFactAuthorized !== false ||
        item.healthDiagnosisAuthorized !== false ||
        item.lifespanPredictionAuthorized !== false ||
        item.spouseDeathPredictionAuthorized !== false ||
        item.familyDeathPredictionAuthorized !== false ||
        item.fertilityPredictionAuthorized !== false ||
        item.childSexPredictionAuthorized !== false ||
        item.personalityFactAuthorized !== false ||
        item.moralityFactAuthorized !== false ||
        item.criminalityFactAuthorized !== false ||
        item.productInterpretationAuthorized !== false) {
      throw new Error('fr311o_direct_authority_widening:' + item.ruleId);
    }
  }

  for (const context of EAR_NAMED_FORM_CONTEXTS_FR311O) {
    if (context.semanticCombinationAuthorized !== false ||
        context.relationInferenceAuthorized !== false ||
        context.neutralGeometryBindingAuthorized !== false ||
        context.productInterpretationAuthorized !== false) {
      throw new Error('fr311o_context_authority_widening:' + context.contextId);
    }
  }

  for (const [key, flag] of Object.entries(FR311O_INDEX_AUTHORITY_BOUNDARY)) {
    if (flag !== false) {
      throw new Error('fr311o_index_authority_widening:' + key);
    }
  }
}
