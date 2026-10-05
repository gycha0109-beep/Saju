import {
  FACE_DIRECT_RULE_EVIDENCE_FR311G,
  FACE_NAMED_FORM_EVIDENCE_FR311G,
  FR311G_INDEX_SUMMARY,
  type FaceEvidencePolarityFR311G,
} from './traditional-face-evidence-index-fr311g.js';
import {
  MOUTH_NAMED_FORM_SEMANTICS_FR311I,
  MOUTH_PHILTRUM_DIRECT_RULES_FR311I,
  type MouthPhiltrumObservationKindFR311I,
} from './traditional-mouth-philtrum-semantics-fr311i.js';

export type FaceEvidenceRegionFR311J =
  | 'eyebrow'
  | 'eye'
  | 'nose'
  | 'philtrum'
  | 'mouth'
  | 'mouth_corner'
  | 'upper_lip'
  | 'lower_lip'
  | 'lips'
  | 'eyebrow_eye'
  | 'context';

export type FaceEvidencePolarityFR311J = FaceEvidencePolarityFR311G;

export type FaceEvidenceCertaintyFR311J =
  | 'direct_clear'
  | 'phrase_uncertain';

export type FaceNamedEvidenceKindFR311J =
  | 'eyebrow_named_form'
  | 'eye_named_form'
  | 'nose_named_form'
  | 'mouth_named_form';

export interface FaceNamedFormEvidenceFR311J {
  readonly evidenceId: string;
  readonly sourceKind: FaceNamedEvidenceKindFR311J;
  readonly region: Exclude<FaceEvidenceRegionFR311J, 'eyebrow_eye' | 'context'>;
  readonly formKey: string;
  readonly traditionalLabel: string;
  readonly claimId: string;
  readonly topicKey: string;
  readonly relationTarget: string;
  readonly lifeStage: string;
  readonly polarity: FaceEvidencePolarityFR311J;
  readonly certainty: FaceEvidenceCertaintyFR311J;
  readonly verificationState: string;
  readonly sourceFragment: string;
  readonly meaningSummary: string;
  readonly sourceRefs: readonly string[];
  readonly sourceText: string;
  readonly historicalTraditionalDoctrineOnly: true;
  readonly modernScientificFactAuthorized: false;
  readonly healthDiagnosisAuthorized: false;
  readonly lifespanPredictionAuthorized: false;
  readonly fertilityPredictionAuthorized: false;
  readonly childSexPredictionAuthorized: false;
  readonly personalityFactAuthorized: false;
  readonly criminalityInferenceAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

export type FaceDirectRuleKindFR311J =
  | 'eyebrow_eye_direct_rule'
  | 'eyebrow_eye_cross_region_rule'
  | 'nose_direct_rule'
  | 'mouth_philtrum_direct_rule';

export interface FaceDirectRuleEvidenceFR311J {
  readonly evidenceId: string;
  readonly ruleId: string;
  readonly sourceKind: FaceDirectRuleKindFR311J;
  readonly regionScope: FaceEvidenceRegionFR311J;
  readonly sourceExpression: string;
  readonly meaningSummary: string;
  readonly topicKeys: readonly string[];
  readonly polarity: FaceEvidencePolarityFR311J | null;
  readonly lifeStage: string | null;
  readonly relationTarget: string | null;
  readonly certainty: FaceEvidenceCertaintyFR311J;
  readonly observationKind: MouthPhiltrumObservationKindFR311I | null;
  readonly sourceRefs: readonly string[];
  readonly historicalTraditionalDoctrineOnly: true;
  readonly modernScientificFactAuthorized: false;
  readonly healthDiagnosisAuthorized: false;
  readonly lifespanPredictionAuthorized: false;
  readonly fertilityPredictionAuthorized: false;
  readonly childSexPredictionAuthorized: false;
  readonly personalityFactAuthorized: false;
  readonly criminalityInferenceAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

export interface MouthNamedFormContextFR311J {
  readonly contextId: string;
  readonly formKey: string;
  readonly traditionalLabel: string;
  readonly descriptorId: string;
  readonly sourceExpression: string;
  readonly meaningSummary: string;
  readonly sourceRefs: readonly string[];
  readonly certainty: FaceEvidenceCertaintyFR311J;
  readonly semanticCombinationAuthorized: false;
  readonly relationInferenceAuthorized: false;
  readonly neutralGeometryBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

function relationTargetForTopic(topicKey: string): string {
  switch (topicKey) {
    case 'spouse_relationship':
      return 'spouse';
    case 'children_family':
      return 'children';
    case 'parents':
      return 'parents';
    case 'interpersonal_relations':
      return 'relations';
    default:
      return 'none';
  }
}

function regionForMouthRule(region: string): FaceEvidenceRegionFR311J {
  switch (region) {
    case 'philtrum':
      return 'philtrum';
    case 'mouth_whole':
      return 'mouth';
    case 'mouth_corner':
      return 'mouth_corner';
    case 'upper_lip':
      return 'upper_lip';
    case 'lower_lip':
      return 'lower_lip';
    case 'lips_pair':
    case 'lip_color':
      return 'lips';
    case 'context':
      return 'context';
    default:
      throw new Error('fr311j_unknown_mouth_region:' + region);
  }
}

export const FACE_NAMED_FORM_EVIDENCE_FR311J: readonly FaceNamedFormEvidenceFR311J[] =
  Object.freeze([
    ...FACE_NAMED_FORM_EVIDENCE_FR311G.map((item) => Object.freeze({
      ...item,
      sourceRefs: Object.freeze([...item.sourceRefs]),
      historicalTraditionalDoctrineOnly: true as const,
      healthDiagnosisAuthorized: false as const,
      lifespanPredictionAuthorized: false as const,
      fertilityPredictionAuthorized: false as const,
      childSexPredictionAuthorized: false as const,
      personalityFactAuthorized: false as const,
      criminalityInferenceAuthorized: false as const,
      productInterpretationAuthorized: false as const,
    })),
    ...MOUTH_NAMED_FORM_SEMANTICS_FR311I.flatMap((record) =>
      record.claims.map((claim) => Object.freeze({
        evidenceId: 'fr311j.named.' + claim.claimId,
        sourceKind: 'mouth_named_form' as const,
        region: 'mouth' as const,
        formKey: record.formKey,
        traditionalLabel: record.traditionalLabel,
        claimId: claim.claimId,
        topicKey: claim.topicKey,
        relationTarget: relationTargetForTopic(claim.topicKey),
        lifeStage: claim.lifeStage,
        polarity: claim.polarity,
        certainty: 'direct_clear' as const,
        verificationState: record.verificationState,
        sourceFragment: claim.sourceFragment,
        meaningSummary: claim.meaningSummary,
        sourceRefs: Object.freeze([...record.sourceRefs]),
        sourceText: record.sourceText,
        historicalTraditionalDoctrineOnly: true as const,
        modernScientificFactAuthorized: false as const,
        healthDiagnosisAuthorized: false as const,
        lifespanPredictionAuthorized: false as const,
        fertilityPredictionAuthorized: false as const,
        childSexPredictionAuthorized: false as const,
        personalityFactAuthorized: false as const,
        criminalityInferenceAuthorized: false as const,
        productInterpretationAuthorized: false as const,
      }))),
  ]);

export const FACE_DIRECT_RULE_EVIDENCE_FR311J: readonly FaceDirectRuleEvidenceFR311J[] =
  Object.freeze([
    ...FACE_DIRECT_RULE_EVIDENCE_FR311G.map((item) => Object.freeze({
      ...item,
      certainty: 'direct_clear' as const,
      observationKind: null,
      historicalTraditionalDoctrineOnly: true as const,
      healthDiagnosisAuthorized: false as const,
      lifespanPredictionAuthorized: false as const,
      fertilityPredictionAuthorized: false as const,
      childSexPredictionAuthorized: false as const,
      personalityFactAuthorized: false as const,
      criminalityInferenceAuthorized: false as const,
      productInterpretationAuthorized: false as const,
    })),
    ...MOUTH_PHILTRUM_DIRECT_RULES_FR311I.map((rule) => Object.freeze({
      evidenceId: 'fr311j.direct.' + rule.ruleId,
      ruleId: rule.ruleId,
      sourceKind: 'mouth_philtrum_direct_rule' as const,
      regionScope: regionForMouthRule(rule.region),
      sourceExpression: rule.sourceExpression,
      meaningSummary: rule.meaningSummary,
      topicKeys: Object.freeze([...rule.topicKeys]),
      polarity: rule.polarity,
      lifeStage: rule.lifeStage,
      relationTarget: rule.relationTarget,
      certainty: rule.certainty,
      observationKind: rule.observationKind,
      sourceRefs: Object.freeze([...rule.sourceRefs]),
      historicalTraditionalDoctrineOnly: true as const,
      modernScientificFactAuthorized: false as const,
      healthDiagnosisAuthorized: false as const,
      lifespanPredictionAuthorized: false as const,
      fertilityPredictionAuthorized: false as const,
      childSexPredictionAuthorized: false as const,
      personalityFactAuthorized: false as const,
      criminalityInferenceAuthorized: false as const,
      productInterpretationAuthorized: false as const,
    })),
  ]);

export const MOUTH_NAMED_FORM_CONTEXTS_FR311J: readonly MouthNamedFormContextFR311J[] =
  Object.freeze(
    MOUTH_NAMED_FORM_SEMANTICS_FR311I.flatMap((record) =>
      record.descriptors
        .filter((descriptor) =>
          descriptor.region === 'context' ||
          descriptor.observationKind === 'cross_region_context')
        .map((descriptor) => Object.freeze({
          contextId: 'fr311j.context.' + descriptor.descriptorId,
          formKey: record.formKey,
          traditionalLabel: record.traditionalLabel,
          descriptorId: descriptor.descriptorId,
          sourceExpression: descriptor.sourceFragment,
          meaningSummary: '명명형 원문 내부의 동반 문맥이며 독립적인 일반 의미나 조합 공식으로 확장하지 않는다.',
          sourceRefs: Object.freeze([...record.sourceRefs]),
          certainty: descriptor.certainty,
          semanticCombinationAuthorized: false as const,
          relationInferenceAuthorized: false as const,
          neutralGeometryBindingAuthorized: false as const,
          productInterpretationAuthorized: false as const,
        })),
    ),
  );

const FORM_KEYS_FR311J = Object.freeze([
  ...new Set(FACE_NAMED_FORM_EVIDENCE_FR311J.map((item) => item.formKey)),
]);

export const FR311J_INDEX_SUMMARY = Object.freeze({
  inheritedNamedForms: FR311G_INDEX_SUMMARY.namedFormsTotal,
  mouthNamedForms: MOUTH_NAMED_FORM_SEMANTICS_FR311I.length,
  namedFormsTotal: FORM_KEYS_FR311J.length,
  inheritedNamedClaims: FR311G_INDEX_SUMMARY.namedClaimsTotal,
  mouthNamedClaims: MOUTH_NAMED_FORM_SEMANTICS_FR311I.reduce(
    (sum, item) => sum + item.claims.length,
    0,
  ),
  namedClaimsTotal: FACE_NAMED_FORM_EVIDENCE_FR311J.length,
  mouthPhiltrumDirectRules: MOUTH_PHILTRUM_DIRECT_RULES_FR311I.length,
  directRulesTotal: FACE_DIRECT_RULE_EVIDENCE_FR311J.length,
  mouthNamedFormContexts: MOUTH_NAMED_FORM_CONTEXTS_FR311J.length,
});

export const FR311J_INDEX_AUTHORITY_BOUNDARY = Object.freeze({
  scoreAuthorized: false as const,
  aggregateGoodBadJudgementAuthorized: false as const,
  unsupportedSynthesisAuthorized: false as const,
  sourcePriorityInferenceAuthorized: false as const,
  traditionalRuleInferenceAuthorized: false as const,
  namedFormClassifierAuthorized: false as const,
  traditionalRegionToNeutralGeometryBindingAuthorized: false as const,
  providerLandmarkBindingAuthorized: false as const,
  metricThresholdAuthorized: false as const,
  healthDiagnosisAuthorized: false as const,
  lifespanPredictionAuthorized: false as const,
  fertilityPredictionAuthorized: false as const,
  childSexPredictionAuthorized: false as const,
  personalityFactAuthorized: false as const,
  criminalityInferenceAuthorized: false as const,
  modernPsychologyOrMedicalFactAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

function assertUnique(values: readonly string[], path: string): void {
  if (new Set(values).size !== values.length) {
    throw new Error('fr311j_duplicate:' + path);
  }
}

export function assertFaceEvidenceIndexFR311J(): void {
  if (FR311J_INDEX_SUMMARY.inheritedNamedForms !== 87) {
    throw new Error('fr311j_requires_87_inherited_forms');
  }
  if (FR311J_INDEX_SUMMARY.mouthNamedForms !== 16) {
    throw new Error('fr311j_requires_16_mouth_forms');
  }
  if (FR311J_INDEX_SUMMARY.namedFormsTotal !== 103) {
    throw new Error('fr311j_named_form_count_drift:' + FR311J_INDEX_SUMMARY.namedFormsTotal);
  }
  if (FR311J_INDEX_SUMMARY.inheritedNamedClaims !== 257) {
    throw new Error('fr311j_requires_257_inherited_claims');
  }
  if (FR311J_INDEX_SUMMARY.mouthNamedClaims !== 45) {
    throw new Error('fr311j_requires_45_mouth_claims');
  }
  if (FR311J_INDEX_SUMMARY.namedClaimsTotal !== 302) {
    throw new Error('fr311j_named_claim_count_drift:' + FR311J_INDEX_SUMMARY.namedClaimsTotal);
  }
  if (FR311J_INDEX_SUMMARY.mouthPhiltrumDirectRules !== 127) {
    throw new Error('fr311j_requires_127_mouth_philtrum_rules');
  }

  assertUnique(FACE_NAMED_FORM_EVIDENCE_FR311J.map((item) => item.evidenceId), 'named_evidence');
  assertUnique(FACE_DIRECT_RULE_EVIDENCE_FR311J.map((item) => item.ruleId), 'direct_rule');
  assertUnique(MOUTH_NAMED_FORM_CONTEXTS_FR311J.map((item) => item.contextId), 'mouth_context');

  for (const item of FACE_NAMED_FORM_EVIDENCE_FR311J) {
    if (item.historicalTraditionalDoctrineOnly !== true ||
        item.modernScientificFactAuthorized !== false ||
        item.healthDiagnosisAuthorized !== false ||
        item.lifespanPredictionAuthorized !== false ||
        item.fertilityPredictionAuthorized !== false ||
        item.childSexPredictionAuthorized !== false ||
        item.personalityFactAuthorized !== false ||
        item.criminalityInferenceAuthorized !== false ||
        item.productInterpretationAuthorized !== false) {
      throw new Error('fr311j_named_authority_widening:' + item.evidenceId);
    }
  }

  for (const item of FACE_DIRECT_RULE_EVIDENCE_FR311J) {
    if (item.historicalTraditionalDoctrineOnly !== true ||
        item.modernScientificFactAuthorized !== false ||
        item.healthDiagnosisAuthorized !== false ||
        item.lifespanPredictionAuthorized !== false ||
        item.fertilityPredictionAuthorized !== false ||
        item.childSexPredictionAuthorized !== false ||
        item.personalityFactAuthorized !== false ||
        item.criminalityInferenceAuthorized !== false ||
        item.productInterpretationAuthorized !== false) {
      throw new Error('fr311j_direct_authority_widening:' + item.ruleId);
    }
  }

  for (const context of MOUTH_NAMED_FORM_CONTEXTS_FR311J) {
    if (context.semanticCombinationAuthorized !== false ||
        context.relationInferenceAuthorized !== false ||
        context.neutralGeometryBindingAuthorized !== false ||
        context.productInterpretationAuthorized !== false) {
      throw new Error('fr311j_context_authority_widening:' + context.contextId);
    }
  }

  for (const [key, flag] of Object.entries(FR311J_INDEX_AUTHORITY_BOUNDARY)) {
    if (flag !== false) {
      throw new Error('fr311j_authority_boundary_widening:' + key);
    }
  }
}
