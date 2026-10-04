import {
  TRADITIONAL_INTERPRETATION_RULES_FR311,
  TRADITIONAL_MORPHOLOGY_TERMS_FR311,
} from './traditional-eyebrow-eye-interpretation-fr311.js';
import {
  EYEBROW_NAMED_FORM_SEMANTICS_FR311A,
} from './traditional-eyebrow-named-form-semantics-fr311a.js';
import {
  EYE_NAMED_FORM_SEMANTICS_FR311B,
} from './traditional-eye-named-form-semantics-fr311b.js';

export type IntegratedEvidenceRegionFR311C = 'eyebrow' | 'eye';

export type IntegratedEvidencePolarityFR311C =
  | 'favorable'
  | 'challenging'
  | 'mixed'
  | 'conditional'
  | 'neutral';

export type IntegratedEvidenceCertaintyFR311C =
  | 'direct_clear'
  | 'phrase_uncertain';

export interface IntegratedNamedFormClaimFR311C {
  readonly evidenceId: string;
  readonly sourceKind: 'eyebrow_named_form' | 'eye_named_form';
  readonly region: IntegratedEvidenceRegionFR311C;
  readonly formKey: string;
  readonly traditionalLabel: string;
  readonly claimId: string;
  readonly topicKey: string;
  readonly relationTarget: string;
  readonly lifeStage: string;
  readonly polarity: IntegratedEvidencePolarityFR311C;
  readonly certainty: IntegratedEvidenceCertaintyFR311C;
  readonly sourceFragment: string;
  readonly meaningSummary: string;
  readonly sourceRefs: readonly string[];
  readonly sourceText: string;
  readonly modernScientificFactAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

export interface IntegratedDirectRuleFR311C {
  readonly evidenceId: string;
  readonly sourceKind: 'direct_rule';
  readonly ruleId: string;
  readonly regionScope: 'eyebrow' | 'eye' | 'eyebrow_eye';
  readonly sourceExpression: string;
  readonly morphologyTermKeys: readonly string[];
  readonly topicKeys: readonly string[];
  readonly traditionalMeaningSummary: string;
  readonly directness: 'direct_source_single_or_compound' | 'direct_source_cross_region_combination';
  readonly sourceRefs: readonly string[];
  readonly modernScientificFactAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

function freezeNamedEvidence(
  value: Omit<
    IntegratedNamedFormClaimFR311C,
    'modernScientificFactAuthorized' | 'productInterpretationAuthorized'
  >,
): IntegratedNamedFormClaimFR311C {
  return Object.freeze({
    ...value,
    sourceRefs: Object.freeze([...value.sourceRefs]),
    modernScientificFactAuthorized: false as const,
    productInterpretationAuthorized: false as const,
  });
}

export const INTEGRATED_NAMED_FORM_EVIDENCE_FR311C: readonly IntegratedNamedFormClaimFR311C[] =
  Object.freeze([
    ...EYEBROW_NAMED_FORM_SEMANTICS_FR311A.flatMap((record) =>
      record.claims.map((claim) => freezeNamedEvidence({
        evidenceId: `fr311c.named.${claim.claimId}`,
        sourceKind: 'eyebrow_named_form' as const,
        region: 'eyebrow' as const,
        formKey: record.formKey,
        traditionalLabel: record.traditionalLabel,
        claimId: claim.claimId,
        topicKey: claim.topicKey,
        relationTarget: claim.relationTarget,
        lifeStage: claim.lifeStage,
        polarity: claim.polarity,
        certainty: 'direct_clear' as const,
        sourceFragment: claim.sourceFragment,
        meaningSummary: claim.meaningSummary,
        sourceRefs: record.sourceRefs,
        sourceText: record.sourceText,
      }))),
    ...EYE_NAMED_FORM_SEMANTICS_FR311B.flatMap((record) =>
      record.claims.map((claim) => freezeNamedEvidence({
        evidenceId: `fr311c.named.${claim.claimId}`,
        sourceKind: 'eye_named_form' as const,
        region: 'eye' as const,
        formKey: record.formKey,
        traditionalLabel: record.traditionalLabel,
        claimId: claim.claimId,
        topicKey: claim.topicKey,
        relationTarget: claim.relationTarget,
        lifeStage: claim.lifeStage,
        polarity: claim.polarity,
        certainty: claim.certainty,
        sourceFragment: claim.sourceFragment,
        meaningSummary: claim.meaningSummary,
        sourceRefs: record.sourceRefs,
        sourceText: record.sourceText,
      }))),
  ]);

export const INTEGRATED_DIRECT_RULES_FR311C: readonly IntegratedDirectRuleFR311C[] =
  Object.freeze(TRADITIONAL_INTERPRETATION_RULES_FR311.map((rule) => Object.freeze({
    evidenceId: `fr311c.rule.${rule.ruleId}`,
    sourceKind: 'direct_rule' as const,
    ruleId: rule.ruleId,
    regionScope: rule.regionScope,
    sourceExpression: rule.sourceExpression,
    morphologyTermKeys: Object.freeze([...rule.morphologyTermKeys]),
    topicKeys: Object.freeze([...rule.topicKeys]),
    traditionalMeaningSummary: rule.traditionalMeaningSummary,
    directness: rule.directness,
    sourceRefs: Object.freeze([...rule.sourceRefs]),
    modernScientificFactAuthorized: false as const,
    productInterpretationAuthorized: false as const,
  })));

export const FR311C_INDEX_SUMMARY = Object.freeze({
  eyebrowNamedForms: EYEBROW_NAMED_FORM_SEMANTICS_FR311A.length,
  eyeNamedForms: EYE_NAMED_FORM_SEMANTICS_FR311B.length,
  namedFormsTotal:
    EYEBROW_NAMED_FORM_SEMANTICS_FR311A.length +
    EYE_NAMED_FORM_SEMANTICS_FR311B.length,
  eyebrowClaims: EYEBROW_NAMED_FORM_SEMANTICS_FR311A.reduce((sum, item) => sum + item.claims.length, 0),
  eyeClaims: EYE_NAMED_FORM_SEMANTICS_FR311B.reduce((sum, item) => sum + item.claims.length, 0),
  namedFormClaimsTotal: INTEGRATED_NAMED_FORM_EVIDENCE_FR311C.length,
  directRules: INTEGRATED_DIRECT_RULES_FR311C.length,
  morphologyTerms: TRADITIONAL_MORPHOLOGY_TERMS_FR311.length,
});

export const FR311C_AUTHORITY_BOUNDARY = Object.freeze({
  scoreAuthorized: false as const,
  automaticGoodBadJudgementAuthorized: false as const,
  unsupportedSynthesisAuthorized: false as const,
  reinforcementInferenceAuthorized: false as const,
  cancellationInferenceAuthorized: false as const,
  sourcePriorityInferenceAuthorized: false as const,
  namedFormClassifierAuthorized: false as const,
  metricThresholdAuthorized: false as const,
  providerGeometryBindingAuthorized: false as const,
  modernPsychologyOrMedicalFactAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

function assertUnique(values: readonly string[], path: string): void {
  if (new Set(values).size !== values.length) throw new Error(`fr311c_duplicate:${path}`);
}

export function assertIntegratedEvidenceIndexFR311C(): void {
  if (FR311C_INDEX_SUMMARY.eyebrowNamedForms !== 24) {
    throw new Error('fr311c_requires_24_eyebrow_forms');
  }
  if (FR311C_INDEX_SUMMARY.eyeNamedForms !== 39) {
    throw new Error('fr311c_requires_39_eye_forms');
  }
  if (FR311C_INDEX_SUMMARY.namedFormsTotal !== 63) {
    throw new Error('fr311c_requires_63_named_forms');
  }
  if (FR311C_INDEX_SUMMARY.eyebrowClaims !== 87) {
    throw new Error(`fr311c_eyebrow_claim_count_drift:${FR311C_INDEX_SUMMARY.eyebrowClaims}`);
  }
  if (FR311C_INDEX_SUMMARY.eyeClaims !== 116) {
    throw new Error(`fr311c_eye_claim_count_drift:${FR311C_INDEX_SUMMARY.eyeClaims}`);
  }
  if (FR311C_INDEX_SUMMARY.namedFormClaimsTotal !== 203) {
    throw new Error(`fr311c_claim_count_drift:${FR311C_INDEX_SUMMARY.namedFormClaimsTotal}`);
  }

  assertUnique(INTEGRATED_NAMED_FORM_EVIDENCE_FR311C.map((item) => item.evidenceId), 'named_evidence');
  assertUnique(INTEGRATED_DIRECT_RULES_FR311C.map((item) => item.evidenceId), 'rule_evidence');

  const formKeys = new Set([
    ...EYEBROW_NAMED_FORM_SEMANTICS_FR311A.map((item) => item.formKey),
    ...EYE_NAMED_FORM_SEMANTICS_FR311B.map((item) => item.formKey),
  ]);
  if (formKeys.size !== 63) throw new Error('fr311c_form_key_coverage_drift');

  for (const item of INTEGRATED_NAMED_FORM_EVIDENCE_FR311C) {
    if (!formKeys.has(item.formKey)) throw new Error(`fr311c_unknown_form:${item.formKey}`);
    if (item.modernScientificFactAuthorized !== false) {
      throw new Error(`fr311c_modern_fact_authority_widening:${item.evidenceId}`);
    }
    if (item.productInterpretationAuthorized !== false) {
      throw new Error(`fr311c_product_authority_widening:${item.evidenceId}`);
    }
  }

  for (const item of INTEGRATED_DIRECT_RULES_FR311C) {
    if (item.modernScientificFactAuthorized !== false) {
      throw new Error(`fr311c_rule_modern_fact_authority_widening:${item.evidenceId}`);
    }
    if (item.productInterpretationAuthorized !== false) {
      throw new Error(`fr311c_rule_product_authority_widening:${item.evidenceId}`);
    }
  }

  for (const [key, flag] of Object.entries(FR311C_AUTHORITY_BOUNDARY)) {
    if (flag !== false) throw new Error(`fr311c_authority_boundary_widening:${key}`);
  }
}
