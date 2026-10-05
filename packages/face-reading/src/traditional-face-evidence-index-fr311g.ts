import {
  INTEGRATED_DIRECT_RULES_FR311C,
  INTEGRATED_NAMED_FORM_EVIDENCE_FR311C,
  type IntegratedEvidencePolarityFR311C,
} from './traditional-eyebrow-eye-evidence-index-fr311c.js';
import {
  DIRECT_CROSS_REGION_EVIDENCE_FR311E,
} from './traditional-eyebrow-eye-cross-region-evidence-fr311e.js';
import {
  NOSE_DIRECT_RULES_FR311F,
  NOSE_NAMED_FORM_SEMANTICS_FR311F,
} from './traditional-nose-semantics-fr311f.js';

export type FaceEvidenceRegionFR311G = 'eyebrow' | 'eye' | 'nose';

export type FaceEvidencePolarityFR311G = IntegratedEvidencePolarityFR311C;

export type FaceEvidenceCertaintyFR311G =
  | 'direct_clear'
  | 'phrase_uncertain';

export type FaceEvidenceVerificationFR311G =
  | 'fr311c_inherited'
  | 'gujin634_transcription_reviewed';

export interface FaceNamedFormEvidenceFR311G {
  readonly evidenceId: string;
  readonly sourceKind: 'eyebrow_named_form' | 'eye_named_form' | 'nose_named_form';
  readonly region: FaceEvidenceRegionFR311G;
  readonly formKey: string;
  readonly traditionalLabel: string;
  readonly claimId: string;
  readonly topicKey: string;
  readonly relationTarget: string;
  readonly lifeStage: string;
  readonly polarity: FaceEvidencePolarityFR311G;
  readonly certainty: FaceEvidenceCertaintyFR311G;
  readonly verificationState: FaceEvidenceVerificationFR311G;
  readonly sourceFragment: string;
  readonly meaningSummary: string;
  readonly sourceRefs: readonly string[];
  readonly sourceText: string;
  readonly modernScientificFactAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

export type FaceDirectRuleKindFR311G =
  | 'eyebrow_eye_direct_rule'
  | 'eyebrow_eye_cross_region_rule'
  | 'nose_direct_rule';

export interface FaceDirectRuleEvidenceFR311G {
  readonly evidenceId: string;
  readonly ruleId: string;
  readonly sourceKind: FaceDirectRuleKindFR311G;
  readonly regionScope: 'eyebrow' | 'eye' | 'eyebrow_eye' | 'nose';
  readonly sourceExpression: string;
  readonly meaningSummary: string;
  readonly topicKeys: readonly string[];
  readonly polarity: FaceEvidencePolarityFR311G | null;
  readonly lifeStage: string | null;
  readonly relationTarget: string | null;
  readonly sourceRefs: readonly string[];
  readonly modernScientificFactAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

function relationTargetForNoseTopic(topicKey: string): string {
  switch (topicKey) {
    case 'spouse_relationship':
      return 'spouse';
    case 'siblings':
      return 'siblings';
    case 'children_family':
      return 'children';
    case 'kinship':
      return 'kin';
    default:
      return 'none';
  }
}

function freezeNamed(
  value: Omit<
    FaceNamedFormEvidenceFR311G,
    'modernScientificFactAuthorized' | 'productInterpretationAuthorized'
  >,
): FaceNamedFormEvidenceFR311G {
  return Object.freeze({
    ...value,
    sourceRefs: Object.freeze([...value.sourceRefs]),
    modernScientificFactAuthorized: false as const,
    productInterpretationAuthorized: false as const,
  });
}

export const FACE_NAMED_FORM_EVIDENCE_FR311G: readonly FaceNamedFormEvidenceFR311G[] =
  Object.freeze([
    ...INTEGRATED_NAMED_FORM_EVIDENCE_FR311C.map((claim) => freezeNamed({
      evidenceId: claim.evidenceId,
      sourceKind: claim.sourceKind,
      region: claim.region,
      formKey: claim.formKey,
      traditionalLabel: claim.traditionalLabel,
      claimId: claim.claimId,
      topicKey: claim.topicKey,
      relationTarget: claim.relationTarget,
      lifeStage: claim.lifeStage,
      polarity: claim.polarity,
      certainty: claim.certainty,
      verificationState: 'fr311c_inherited' as const,
      sourceFragment: claim.sourceFragment,
      meaningSummary: claim.meaningSummary,
      sourceRefs: claim.sourceRefs,
      sourceText: claim.sourceText,
    })),
    ...NOSE_NAMED_FORM_SEMANTICS_FR311F.flatMap((record) =>
      record.claims.map((claim) => freezeNamed({
        evidenceId: `fr311g.named.${claim.claimId}`,
        sourceKind: 'nose_named_form' as const,
        region: 'nose' as const,
        formKey: record.formKey,
        traditionalLabel: record.traditionalLabel,
        claimId: claim.claimId,
        topicKey: claim.topicKey,
        relationTarget: relationTargetForNoseTopic(claim.topicKey),
        lifeStage: claim.lifeStage,
        polarity: claim.polarity,
        certainty: 'direct_clear' as const,
        verificationState: 'gujin634_transcription_reviewed' as const,
        sourceFragment: claim.sourceFragment,
        meaningSummary: claim.meaningSummary,
        sourceRefs: record.sourceRefs,
        sourceText: record.sourceText,
      }))),
  ]);

const CROSS_REGION_RULE_IDS = new Set(
  DIRECT_CROSS_REGION_EVIDENCE_FR311E.map((rule) => rule.ruleId),
);

export const FACE_DIRECT_RULE_EVIDENCE_FR311G: readonly FaceDirectRuleEvidenceFR311G[] =
  Object.freeze([
    ...INTEGRATED_DIRECT_RULES_FR311C
      .filter((rule) => !CROSS_REGION_RULE_IDS.has(rule.ruleId))
      .map((rule) => Object.freeze({
        evidenceId: `fr311g.direct.${rule.ruleId}`,
        ruleId: rule.ruleId,
        sourceKind: 'eyebrow_eye_direct_rule' as const,
        regionScope: rule.regionScope,
        sourceExpression: rule.sourceExpression,
        meaningSummary: rule.traditionalMeaningSummary,
        topicKeys: Object.freeze([...rule.topicKeys]),
        polarity: null,
        lifeStage: null,
        relationTarget: null,
        sourceRefs: Object.freeze([...rule.sourceRefs]),
        modernScientificFactAuthorized: false as const,
        productInterpretationAuthorized: false as const,
      })),
    ...DIRECT_CROSS_REGION_EVIDENCE_FR311E.map((rule) => Object.freeze({
      evidenceId: `fr311g.direct.${rule.ruleId}`,
      ruleId: rule.ruleId,
      sourceKind: 'eyebrow_eye_cross_region_rule' as const,
      regionScope: 'eyebrow_eye' as const,
      sourceExpression: rule.sourceExpression,
      meaningSummary: rule.traditionalMeaningSummary,
      topicKeys: Object.freeze([...rule.topicKeys]),
      polarity: null,
      lifeStage: null,
      relationTarget: null,
      sourceRefs: Object.freeze([...rule.sourceRefs]),
      modernScientificFactAuthorized: false as const,
      productInterpretationAuthorized: false as const,
    })),
    ...NOSE_DIRECT_RULES_FR311F.map((rule) => Object.freeze({
      evidenceId: `fr311g.direct.${rule.ruleId}`,
      ruleId: rule.ruleId,
      sourceKind: 'nose_direct_rule' as const,
      regionScope: 'nose' as const,
      sourceExpression: rule.sourceExpression,
      meaningSummary: rule.meaningSummary,
      topicKeys: Object.freeze([...rule.topicKeys]),
      polarity: rule.polarity,
      lifeStage: rule.lifeStage,
      relationTarget: rule.relationTarget,
      sourceRefs: Object.freeze([...rule.sourceRefs]),
      modernScientificFactAuthorized: false as const,
      productInterpretationAuthorized: false as const,
    })),
  ]);

const FACE_FORM_KEYS_FR311G = Object.freeze([
  ...new Set(FACE_NAMED_FORM_EVIDENCE_FR311G.map((item) => item.formKey)),
]);

export const FR311G_INDEX_SUMMARY = Object.freeze({
  eyebrowEyeNamedForms: 63,
  noseNamedForms: NOSE_NAMED_FORM_SEMANTICS_FR311F.length,
  namedFormsTotal: FACE_FORM_KEYS_FR311G.length,
  eyebrowEyeNamedClaims: INTEGRATED_NAMED_FORM_EVIDENCE_FR311C.length,
  noseNamedClaims: NOSE_NAMED_FORM_SEMANTICS_FR311F.reduce(
    (sum, item) => sum + item.claims.length,
    0,
  ),
  namedClaimsTotal: FACE_NAMED_FORM_EVIDENCE_FR311G.length,
  noseDirectRules: NOSE_DIRECT_RULES_FR311F.length,
  directRulesTotal: FACE_DIRECT_RULE_EVIDENCE_FR311G.length,
});

export const FR311G_INDEX_AUTHORITY_BOUNDARY = Object.freeze({
  scoreAuthorized: false as const,
  aggregateGoodBadJudgementAuthorized: false as const,
  unsupportedSynthesisAuthorized: false as const,
  sourcePriorityInferenceAuthorized: false as const,
  namedFormClassifierAuthorized: false as const,
  traditionalRegionToNeutralGeometryBindingAuthorized: false as const,
  metricThresholdAuthorized: false as const,
  modernPsychologyOrMedicalFactAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

function assertUnique(values: readonly string[], path: string): void {
  if (new Set(values).size !== values.length) {
    throw new Error(`fr311g_duplicate:${path}`);
  }
}

export function assertFaceEvidenceIndexFR311G(): void {
  if (FR311G_INDEX_SUMMARY.eyebrowEyeNamedForms !== 63) {
    throw new Error('fr311g_requires_63_eyebrow_eye_forms');
  }
  if (FR311G_INDEX_SUMMARY.noseNamedForms !== 24) {
    throw new Error('fr311g_requires_24_nose_forms');
  }
  if (FR311G_INDEX_SUMMARY.namedFormsTotal !== 87) {
    throw new Error(`fr311g_named_form_count_drift:${FR311G_INDEX_SUMMARY.namedFormsTotal}`);
  }
  if (FR311G_INDEX_SUMMARY.eyebrowEyeNamedClaims !== 203) {
    throw new Error('fr311g_requires_203_eyebrow_eye_claims');
  }
  if (FR311G_INDEX_SUMMARY.noseNamedClaims !== 54) {
    throw new Error(`fr311g_nose_claim_count_drift:${FR311G_INDEX_SUMMARY.noseNamedClaims}`);
  }
  if (FR311G_INDEX_SUMMARY.namedClaimsTotal !== 257) {
    throw new Error(`fr311g_named_claim_count_drift:${FR311G_INDEX_SUMMARY.namedClaimsTotal}`);
  }
  if (FR311G_INDEX_SUMMARY.noseDirectRules !== 20) {
    throw new Error('fr311g_requires_20_nose_direct_rules');
  }

  assertUnique(FACE_NAMED_FORM_EVIDENCE_FR311G.map((item) => item.evidenceId), 'named_evidence');
  assertUnique(FACE_DIRECT_RULE_EVIDENCE_FR311G.map((item) => item.ruleId), 'direct_rule');

  for (const item of FACE_NAMED_FORM_EVIDENCE_FR311G) {
    if (item.modernScientificFactAuthorized !== false ||
        item.productInterpretationAuthorized !== false) {
      throw new Error(`fr311g_named_authority_widening:${item.evidenceId}`);
    }
  }
  for (const item of FACE_DIRECT_RULE_EVIDENCE_FR311G) {
    if (item.modernScientificFactAuthorized !== false ||
        item.productInterpretationAuthorized !== false) {
      throw new Error(`fr311g_direct_authority_widening:${item.ruleId}`);
    }
  }
  for (const [key, flag] of Object.entries(FR311G_INDEX_AUTHORITY_BOUNDARY)) {
    if (flag !== false) throw new Error(`fr311g_authority_boundary_widening:${key}`);
  }
}
