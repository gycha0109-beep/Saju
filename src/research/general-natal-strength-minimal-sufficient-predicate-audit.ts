export const R130_STRENGTH_MINIMAL_SUFFICIENT_PREDICATE_AUDIT_VERSION =
  '0.1.0-research' as const;

export type R130AuditFamily =
  | 'SEASON_ONLY'
  | 'LABEL_NORMALIZATION'
  | 'SPRING_WOOD_BUNDLE'
  | 'AUTUMN_WOOD_BUNDLE'
  | 'ROOTLESS_REPETITION'
  | 'ROOT_PRESENCE'
  | 'ROOT_QUALITY'
  | 'SUPPORT'
  | 'CHALLENGE'
  | 'RELATION_CHAIN'
  | 'SOURCE_POLICY'
  | 'CIRCULARITY';

export type R130TargetKind =
  | 'SOURCE_NATIVE_LABEL'
  | 'QUALITATIVE_DISPOSITION'
  | 'ROOT_STATUS'
  | 'RELATION_FUNCTION'
  | 'NORMALIZATION_GUARD';

export type R130RuleScope =
  | 'EXACT_CASE'
  | 'SOURCE_LOCAL'
  | 'METHODOLOGY_LOCAL'
  | 'CROSS_SURFACE'
  | 'UNIVERSAL_CANDIDATE';

export type R130PredicateOrigin =
  | 'R129_PRIMITIVE'
  | 'SOURCE_LOCAL_FACT'
  | 'RESEARCH_HYPOTHESIS'
  | 'TARGET_LEAKAGE';

export type R130NecessityStatus =
  | 'EXPLICITLY_REQUIRED_SOURCE_LOCAL'
  | 'SUPPORTED_BY_REMOVAL_EVIDENCE'
  | 'FALSIFIED'
  | 'NOT_ESTABLISHED'
  | 'NOT_APPLICABLE';

export type R130SufficiencyStatus =
  | 'BOUNDED_SOURCE_RULE_SUPPORTED'
  | 'EXACT_CASE_ONLY'
  | 'FALSIFIED_BY_COUNTEREXAMPLE'
  | 'NOT_ESTABLISHED'
  | 'CIRCULAR_TARGET_LEAKAGE'
  | 'POLICY_DEPENDENT'
  | 'NOT_APPLICABLE';

export type R130MinimalityStatus =
  | 'MINIMAL_ESTABLISHED'
  | 'NON_MINIMAL'
  | 'NOT_ESTABLISHED'
  | 'NOT_APPLICABLE';

export type R130Disposition =
  | 'FALSIFIED'
  | 'EXACT_CASE_ONLY'
  | 'BOUNDED_RULE_CANDIDATE'
  | 'INSUFFICIENT_EVIDENCE'
  | 'POLICY_BLOCKED'
  | 'CIRCULAR'
  | 'NON_STRENGTH_RELATION_ONLY'
  | 'NORMALIZATION_GUARD';

export type R130RemovalResult =
  | 'REQUIRED_SUPPORTED'
  | 'NOT_REQUIRED_SUPPORTED'
  | 'UNKNOWN';

export type R130AdditionEffect =
  | 'TARGET_PRESERVED'
  | 'TARGET_CHANGED_LOCAL_FUNCTION'
  | 'TARGET_LABEL_UNRESOLVED'
  | 'MONOTONICITY_FALSIFIED_CONTEXTUALLY'
  | 'MONOTONICITY_NOT_ESTABLISHED'
  | 'UNKNOWN';

export type R130DependencyRisk = 'LOW' | 'MATERIAL' | 'HIGH' | 'POLICY_BLOCKING';

export interface R130PredicateRef {
  predicateId: string;
  origin: R130PredicateOrigin;
  meaning: string;
}

export interface R130RemovalAudit {
  removedPredicateId: string;
  pairedEvidenceExists: boolean;
  targetStillObserved: boolean | null;
  result: R130RemovalResult;
  evidenceRef: string | null;
  researchMeaning: string;
}

export interface R130AdditionAudit {
  addedPredicateId: string;
  sourceBacked: boolean;
  evidenceRef: string;
  observedEffect: R130AdditionEffect;
  researchMeaning: string;
}

export interface R130StrengthPredicateAudit {
  auditId: string;
  family: R130AuditFamily;
  targetKind: R130TargetKind;
  targetNativeLabel: string | null;
  targetMeaning: string;
  scope: R130RuleScope;
  candidatePredicates: readonly R130PredicateRef[];
  positiveEvidenceRefs: readonly string[];
  counterexampleRefs: readonly string[];
  necessityStatus: R130NecessityStatus;
  sufficiencyStatus: R130SufficiencyStatus;
  minimalityStatus: R130MinimalityStatus;
  disposition: R130Disposition;
  removalAudits: readonly R130RemovalAudit[];
  additionAudits: readonly R130AdditionAudit[];
  targetLeakage: boolean;
  circularityRisk: boolean;
  sourcePolicySensitive: boolean;
  sourceDependencyRisk: R130DependencyRisk;
  nativeLabelPreserved: boolean;
  researchConclusion: string;
  unresolvedFactors: readonly string[];
  prohibitedExtensions: readonly string[];
  universalRuleAuthorized: false;
  numericRuleAuthorized: false;
  finalClassifierAuthorized: false;
}

const REF = Object.freeze({
  R121: 'src/research/general-natal-root-strength-dependency-map.ts',
  R122: 'src/research/general-natal-season-root-interaction-counterexamples.ts',
  R124: 'src/research/general-natal-support-accumulation-saturation-audit.ts',
  R125: 'src/research/general-natal-peer-resource-support-discriminant-corpus.ts',
  R126: 'src/research/general-natal-control-drain-output-ordering-divergence.ts',
  R127: 'src/research/general-natal-strength-label-single-feature-perturbation.ts',
  R128: 'src/research/general-natal-cross-surface-borderline-strength-adjudication.ts',
  R129: 'src/research/general-natal-nonnumeric-strength-explanation-primitives.ts',
  R014: 'src/research/general-natal-muku-root-treatment.ts',
  R016: 'src/research/general-natal-changsheng-root-weight-binding-authority.ts',
  R017: 'src/research/general-natal-lu-diwang-root-strength.ts',
  R015: 'src/research/general-natal-yuqi-temporal-variability-source-observation-authority.ts',
} as const);

function pred(
  predicateId: string,
  origin: R130PredicateOrigin,
  meaning: string,
): R130PredicateRef {
  return Object.freeze({ predicateId, origin, meaning });
}

function removal(
  removedPredicateId: string,
  pairedEvidenceExists: boolean,
  targetStillObserved: boolean | null,
  result: R130RemovalResult,
  evidenceRef: string | null,
  researchMeaning: string,
): R130RemovalAudit {
  return Object.freeze({
    removedPredicateId,
    pairedEvidenceExists,
    targetStillObserved,
    result,
    evidenceRef,
    researchMeaning,
  });
}

function addition(
  addedPredicateId: string,
  sourceBacked: boolean,
  evidenceRef: string,
  observedEffect: R130AdditionEffect,
  researchMeaning: string,
): R130AdditionAudit {
  return Object.freeze({
    addedPredicateId,
    sourceBacked,
    evidenceRef,
    observedEffect,
    researchMeaning,
  });
}

function audit(
  input: Omit<
    R130StrengthPredicateAudit,
    'universalRuleAuthorized' | 'numericRuleAuthorized' | 'finalClassifierAuthorized'
  >,
): R130StrengthPredicateAudit {
  return Object.freeze({
    ...input,
    universalRuleAuthorized: false,
    numericRuleAuthorized: false,
    finalClassifierAuthorized: false,
  });
}

export const R130_STRENGTH_PREDICATE_AUDITS: readonly R130StrengthPredicateAudit[] =
  Object.freeze([
    audit({
      auditId: 'R130-A01-DE-SHI-IMPLIES-WANG',
      family: 'SEASON_ONLY',
      targetKind: 'SOURCE_NATIVE_LABEL',
      targetNativeLabel: '旺',
      targetMeaning: 'Treat seasonal timeliness alone as sufficient for 旺.',
      scope: 'UNIVERSAL_CANDIDATE',
      candidatePredicates: [
        pred('SEASON_CONTEXT_FAVORABLE', 'R129_PRIMITIVE', '得時 / favorable season context'),
      ],
      positiveEvidenceRefs: [],
      counterexampleRefs: [REF.R122, REF.R127],
      necessityStatus: 'NOT_ESTABLISHED',
      sufficiencyStatus: 'FALSIFIED_BY_COUNTEREXAMPLE',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'FALSIFIED',
      removalAudits: [],
      additionAudits: [],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'MATERIAL',
      nativeLabelPreserved: true,
      researchConclusion:
        '得時而不旺 directly falsifies seasonal timeliness as a universally sufficient 旺 predicate.',
      unresolvedFactors: [],
      prohibitedExtensions: ['DE_SHI_EQUALS_WANG', 'SEASON_FAVORABLE_EQUALS_STRONG'],
    }),
    audit({
      auditId: 'R130-A02-SHI-SHI-IMPLIES-RUO',
      family: 'SEASON_ONLY',
      targetKind: 'SOURCE_NATIVE_LABEL',
      targetNativeLabel: '弱',
      targetMeaning: 'Treat seasonal loss alone as sufficient for 弱.',
      scope: 'UNIVERSAL_CANDIDATE',
      candidatePredicates: [
        pred('SEASON_CONTEXT_UNFAVORABLE', 'R129_PRIMITIVE', '失時 / unfavorable season context'),
      ],
      positiveEvidenceRefs: [],
      counterexampleRefs: [REF.R122, REF.R127],
      necessityStatus: 'NOT_ESTABLISHED',
      sufficiencyStatus: 'FALSIFIED_BY_COUNTEREXAMPLE',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'FALSIFIED',
      removalAudits: [],
      additionAudits: [],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'MATERIAL',
      nativeLabelPreserved: true,
      researchConclusion:
        '失時而不弱 directly falsifies seasonal loss as a universally sufficient 弱 predicate.',
      unresolvedFactors: [],
      prohibitedExtensions: ['SHI_SHI_EQUALS_RUO', 'SEASON_UNFAVORABLE_EQUALS_WEAK'],
    }),
    audit({
      auditId: 'R130-A03-NOT-WANG-NORMALIZES-TO-RUO',
      family: 'LABEL_NORMALIZATION',
      targetKind: 'NORMALIZATION_GUARD',
      targetNativeLabel: '弱',
      targetMeaning: 'Silently normalize 不旺 to 弱.',
      scope: 'CROSS_SURFACE',
      candidatePredicates: [
        pred('SOURCE_NATIVE_LABEL_NOT_WANG', 'SOURCE_LOCAL_FACT', 'Source-native 不旺 label'),
      ],
      positiveEvidenceRefs: [],
      counterexampleRefs: [REF.R128],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'NOT_ESTABLISHED',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'NORMALIZATION_GUARD',
      removalAudits: [],
      additionAudits: [],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: true,
      sourceDependencyRisk: 'HIGH',
      nativeLabelPreserved: true,
      researchConclusion:
        'R128 preserves 旺衰 and 強弱 vocabulary distinctions; 不旺 cannot be silently converted to 弱.',
      unresolvedFactors: ['source-native taxonomy differs by surface'],
      prohibitedExtensions: ['NOT_WANG_EQUALS_RUO'],
    }),
    audit({
      auditId: 'R130-A04-NOT-RUO-NORMALIZES-TO-QIANG',
      family: 'LABEL_NORMALIZATION',
      targetKind: 'NORMALIZATION_GUARD',
      targetNativeLabel: '強',
      targetMeaning: 'Silently normalize 不弱 to 強.',
      scope: 'CROSS_SURFACE',
      candidatePredicates: [
        pred('SOURCE_NATIVE_LABEL_NOT_RUO', 'SOURCE_LOCAL_FACT', 'Source-native 不弱 label'),
      ],
      positiveEvidenceRefs: [],
      counterexampleRefs: [REF.R128],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'NOT_ESTABLISHED',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'NORMALIZATION_GUARD',
      removalAudits: [],
      additionAudits: [],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: true,
      sourceDependencyRisk: 'HIGH',
      nativeLabelPreserved: true,
      researchConclusion:
        '不弱 is retained as its own source-native result and does not automatically become 強.',
      unresolvedFactors: ['source-native taxonomy differs by surface'],
      prohibitedExtensions: ['NOT_RUO_EQUALS_QIANG'],
    }),
    audit({
      auditId: 'R130-A05-WANG-NORMALIZES-TO-QIANG',
      family: 'LABEL_NORMALIZATION',
      targetKind: 'NORMALIZATION_GUARD',
      targetNativeLabel: '強',
      targetMeaning: 'Silently normalize 旺 to 強.',
      scope: 'CROSS_SURFACE',
      candidatePredicates: [
        pred('SOURCE_NATIVE_LABEL_WANG', 'SOURCE_LOCAL_FACT', 'Source-native 旺 label'),
      ],
      positiveEvidenceRefs: [],
      counterexampleRefs: [REF.R128],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'NOT_ESTABLISHED',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'NORMALIZATION_GUARD',
      removalAudits: [],
      additionAudits: [],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: true,
      sourceDependencyRisk: 'HIGH',
      nativeLabelPreserved: true,
      researchConclusion:
        'R128 preserves the possibility that 旺 and 強 belong to different explanatory axes.',
      unresolvedFactors: [],
      prohibitedExtensions: ['WANG_EQUALS_QIANG'],
    }),
    audit({
      auditId: 'R130-A06-SHUAI-NORMALIZES-TO-RUO',
      family: 'LABEL_NORMALIZATION',
      targetKind: 'NORMALIZATION_GUARD',
      targetNativeLabel: '弱',
      targetMeaning: 'Silently normalize 衰 to 弱.',
      scope: 'CROSS_SURFACE',
      candidatePredicates: [
        pred('SOURCE_NATIVE_LABEL_SHUAI', 'SOURCE_LOCAL_FACT', 'Source-native 衰 label'),
      ],
      positiveEvidenceRefs: [],
      counterexampleRefs: [REF.R128],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'NOT_ESTABLISHED',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'NORMALIZATION_GUARD',
      removalAudits: [],
      additionAudits: [],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: true,
      sourceDependencyRisk: 'HIGH',
      nativeLabelPreserved: true,
      researchConclusion:
        'R128 does not authorize collapsing 衰 and 弱 into one binary label.',
      unresolvedFactors: [],
      prohibitedExtensions: ['SHUAI_EQUALS_RUO'],
    }),
    audit({
      auditId: 'R130-A07-SPRING-WOOD-BUNDLE-TO-NOT-WANG',
      family: 'SPRING_WOOD_BUNDLE',
      targetKind: 'SOURCE_NATIVE_LABEL',
      targetNativeLabel: '不旺',
      targetMeaning: 'Observed spring-Wood bounded bundle with source-native 不旺 result.',
      scope: 'EXACT_CASE',
      candidatePredicates: [
        pred('SEASON_CONTEXT_FAVORABLE', 'R129_PRIMITIVE', 'Spring Wood is seasonally timely'),
        pred('SOURCE_LOCAL_HEAVY_METAL_OPPOSITION', 'SOURCE_LOCAL_FACT', 'Heavy Metal opposition is source-observed'),
        pred('SOURCE_LOCAL_NO_FIRE_CONTROL', 'SOURCE_LOCAL_FACT', 'No Fire control is source-observed'),
      ],
      positiveEvidenceRefs: [REF.R122, REF.R128],
      counterexampleRefs: [],
      necessityStatus: 'NOT_ESTABLISHED',
      sufficiencyStatus: 'EXACT_CASE_ONLY',
      minimalityStatus: 'NOT_ESTABLISHED',
      disposition: 'EXACT_CASE_ONLY',
      removalAudits: [
        removal('SEASON_CONTEXT_FAVORABLE', false, null, 'UNKNOWN', null, 'No paired source case removes 得時 while holding the remaining bundle fixed.'),
        removal('SOURCE_LOCAL_HEAVY_METAL_OPPOSITION', false, null, 'UNKNOWN', null, 'No paired source case removes heavy Metal opposition.'),
        removal('SOURCE_LOCAL_NO_FIRE_CONTROL', false, null, 'UNKNOWN', null, 'No paired source case adds Fire control while otherwise preserving the exact case.'),
      ],
      additionAudits: [],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'HIGH',
      nativeLabelPreserved: true,
      researchConclusion:
        'The bundle is source-observed with 不旺, but necessity of each constituent and cross-case sufficiency are not established.',
      unresolvedFactors: ['complete four pillars unavailable', 'Xu/Ren textual dependency risk'],
      prohibitedExtensions: ['EXACT_CASE_BUNDLE_EQUALS_UNIVERSAL_NOT_WANG_RULE'],
    }),
    audit({
      auditId: 'R130-A08-AUTUMN-WOOD-BUNDLE-TO-NOT-RUO',
      family: 'AUTUMN_WOOD_BUNDLE',
      targetKind: 'SOURCE_NATIVE_LABEL',
      targetNativeLabel: '不弱',
      targetMeaning: 'Observed autumn-Wood bounded bundle with source-native 不弱 result.',
      scope: 'EXACT_CASE',
      candidatePredicates: [
        pred('SEASON_CONTEXT_UNFAVORABLE', 'R129_PRIMITIVE', 'Autumn Wood is out of season'),
        pred('ROOT_SUPPORT_PRESENT_BOUNDED', 'R129_PRIMITIVE', '寅卯 deep root support'),
        pred('PEER_SUPPORT_PRESENT', 'R129_PRIMITIVE', 'Visible 甲乙 peer support'),
        pred('SOURCE_LOCAL_DEEP_ROOT_CONTEXT', 'SOURCE_LOCAL_FACT', '木根深 wording is source-observed'),
      ],
      positiveEvidenceRefs: [REF.R122, REF.R128],
      counterexampleRefs: [],
      necessityStatus: 'NOT_ESTABLISHED',
      sufficiencyStatus: 'EXACT_CASE_ONLY',
      minimalityStatus: 'NOT_ESTABLISHED',
      disposition: 'EXACT_CASE_ONLY',
      removalAudits: [
        removal('SEASON_CONTEXT_UNFAVORABLE', false, null, 'UNKNOWN', null, 'No paired source case removes 失時 while preserving the remaining support bundle.'),
        removal('ROOT_SUPPORT_PRESENT_BOUNDED', false, null, 'UNKNOWN', null, 'R127 explicitly withholds the no-root counterfactual label.'),
        removal('PEER_SUPPORT_PRESENT', false, null, 'UNKNOWN', null, 'No source-labeled root-only counterpart is established.'),
        removal('SOURCE_LOCAL_DEEP_ROOT_CONTEXT', false, null, 'UNKNOWN', null, 'No source-labeled shallow-root counterpart is established.'),
      ],
      additionAudits: [],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'HIGH',
      nativeLabelPreserved: true,
      researchConclusion:
        'The exact bundle supports the observed 不弱 label, while predicate necessity/minimality remain unproven.',
      unresolvedFactors: ['counterfactual labels absent', 'textual dependency risk'],
      prohibitedExtensions: ['AUTUMN_BUNDLE_EQUALS_MINIMAL_NOT_RUO_RULE'],
    }),
    audit({
      auditId: 'R130-A09-VISIBLE-PEER-REPETITION-IMPLIES-QIANG',
      family: 'ROOTLESS_REPETITION',
      targetKind: 'SOURCE_NATIVE_LABEL',
      targetNativeLabel: '強',
      targetMeaning: 'Treat repeated visible same-kind stems as sufficient for 強.',
      scope: 'UNIVERSAL_CANDIDATE',
      candidatePredicates: [
        pred('PEER_SUPPORT_PRESENT', 'R129_PRIMITIVE', 'Visible same-kind peer support'),
        pred('SOURCE_LOCAL_VISIBLE_REPETITION', 'SOURCE_LOCAL_FACT', 'Multiple repeated visible stems'),
      ],
      positiveEvidenceRefs: [],
      counterexampleRefs: [REF.R122, REF.R127, REF.R128],
      necessityStatus: 'NOT_ESTABLISHED',
      sufficiencyStatus: 'FALSIFIED_BY_COUNTEREXAMPLE',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'FALSIFIED',
      removalAudits: [],
      additionAudits: [],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'MATERIAL',
      nativeLabelPreserved: true,
      researchConclusion:
        '四辛卯 and 四丙申 remain 弱 despite four repeated visible same-kind stems and therefore falsify the rule.',
      unresolvedFactors: [],
      prohibitedExtensions: ['VISIBLE_PEER_REPETITION_EQUALS_QIANG'],
    }),
    audit({
      auditId: 'R130-A10-REPEATED-VISIBLE-NO-ROOT-IMPLIES-RUO',
      family: 'ROOTLESS_REPETITION',
      targetKind: 'SOURCE_NATIVE_LABEL',
      targetNativeLabel: '弱',
      targetMeaning: 'Generalize the exact 四辛卯 / 四丙申 result into a universal repeated-visible-plus-no-root rule.',
      scope: 'UNIVERSAL_CANDIDATE',
      candidatePredicates: [
        pred('SOURCE_LOCAL_VISIBLE_REPETITION', 'SOURCE_LOCAL_FACT', 'Repeated visible same-kind stems'),
        pred('SOURCE_LOCAL_EXACT_NO_ROOT', 'SOURCE_LOCAL_FACT', 'Exact source states the relevant element is not rooted'),
      ],
      positiveEvidenceRefs: [REF.R122, REF.R127, REF.R128],
      counterexampleRefs: [],
      necessityStatus: 'NOT_ESTABLISHED',
      sufficiencyStatus: 'EXACT_CASE_ONLY',
      minimalityStatus: 'NOT_ESTABLISHED',
      disposition: 'EXACT_CASE_ONLY',
      removalAudits: [
        removal('SOURCE_LOCAL_VISIBLE_REPETITION', false, null, 'UNKNOWN', null, 'No paired non-repeated counterpart is supplied.'),
        removal('SOURCE_LOCAL_EXACT_NO_ROOT', false, null, 'UNKNOWN', null, 'R127 root-addition probes explicitly withhold the perturbed label.'),
      ],
      additionAudits: [
        addition('ROOT_SUPPORT_PRESENT_BOUNDED', false, REF.R127, 'TARGET_LABEL_UNRESOLVED', 'Synthetic root addition changes evidence semantics but the opposite label is not source-authorized.'),
      ],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'MATERIAL',
      nativeLabelPreserved: true,
      researchConclusion:
        'Two exact weak-labeled examples exist, but universal sufficiency and minimality are not established.',
      unresolvedFactors: ['no exhaustive repeated-stem/no-root corpus'],
      prohibitedExtensions: ['TWO_EXAMPLES_EQUAL_UNIVERSAL_WEAK_RULE'],
    }),
    audit({
      auditId: 'R130-A11-ONE-ROOT-IMPLIES-QIANG',
      family: 'ROOT_PRESENCE',
      targetKind: 'SOURCE_NATIVE_LABEL',
      targetNativeLabel: '強',
      targetMeaning: 'Treat one bounded positive root as sufficient for 強.',
      scope: 'UNIVERSAL_CANDIDATE',
      candidatePredicates: [
        pred('ROOT_SUPPORT_PRESENT_BOUNDED', 'R129_PRIMITIVE', 'One governed positive root relation'),
      ],
      positiveEvidenceRefs: [REF.R121],
      counterexampleRefs: [],
      necessityStatus: 'NOT_ESTABLISHED',
      sufficiencyStatus: 'NOT_ESTABLISHED',
      minimalityStatus: 'NOT_ESTABLISHED',
      disposition: 'INSUFFICIENT_EVIDENCE',
      removalAudits: [
        removal('ROOT_SUPPORT_PRESENT_BOUNDED', false, null, 'UNKNOWN', null, 'The source does not provide a one-root versus no-root paired strong-label comparison.'),
      ],
      additionAudits: [
        addition('ROOT_SUPPORT_PRESENT_BOUNDED_TO_FOUR_XIN', false, REF.R127, 'TARGET_LABEL_UNRESOLVED', 'Adding a root to 四辛卯 is a research probe with no authorized post-addition label.'),
        addition('ROOT_SUPPORT_PRESENT_BOUNDED_TO_FOUR_BING', false, REF.R127, 'TARGET_LABEL_UNRESOLVED', 'Adding a root to 四丙申 is a research probe with no authorized post-addition label.'),
      ],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'MATERIAL',
      nativeLabelPreserved: true,
      researchConclusion:
        'Positive root evidence is a support predicate, not a demonstrated sufficient 強 predicate.',
      unresolvedFactors: ['global root resolver incomplete', 'post-addition labels absent'],
      prohibitedExtensions: ['ONE_ROOT_EQUALS_QIANG'],
    }),
    audit({
      auditId: 'R130-A12-ONE-ROOT-IMPLIES-NOT-RUO',
      family: 'ROOT_PRESENCE',
      targetKind: 'SOURCE_NATIVE_LABEL',
      targetNativeLabel: '不弱',
      targetMeaning: 'Treat one bounded positive root as sufficient for 不弱.',
      scope: 'UNIVERSAL_CANDIDATE',
      candidatePredicates: [
        pred('ROOT_SUPPORT_PRESENT_BOUNDED', 'R129_PRIMITIVE', 'One governed positive root relation'),
      ],
      positiveEvidenceRefs: [REF.R121],
      counterexampleRefs: [],
      necessityStatus: 'NOT_ESTABLISHED',
      sufficiencyStatus: 'NOT_ESTABLISHED',
      minimalityStatus: 'NOT_ESTABLISHED',
      disposition: 'INSUFFICIENT_EVIDENCE',
      removalAudits: [
        removal('ROOT_SUPPORT_PRESENT_BOUNDED', false, null, 'UNKNOWN', null, 'No source-paired final-label comparison establishes one root as sufficient for 不弱.'),
      ],
      additionAudits: [
        addition('ROOT_SUPPORT_PRESENT_BOUNDED', false, REF.R127, 'TARGET_LABEL_UNRESOLVED', 'R127 explicitly withholds synthetic post-root labels.'),
      ],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'MATERIAL',
      nativeLabelPreserved: true,
      researchConclusion:
        'The reviewed evidence does not establish one root as a universal sufficient 不弱 predicate.',
      unresolvedFactors: ['counterfactual labels absent'],
      prohibitedExtensions: ['ONE_ROOT_EQUALS_NOT_RUO'],
    }),
    audit({
      auditId: 'R130-A13-HEAVY-ROOT-IMPLIES-QIANG',
      family: 'ROOT_QUALITY',
      targetKind: 'SOURCE_NATIVE_LABEL',
      targetNativeLabel: '強',
      targetMeaning: 'Treat a heavy-root class as sufficient for 強.',
      scope: 'UNIVERSAL_CANDIDATE',
      candidatePredicates: [
        pred('HEAVY_ROOT_CLASS_BOUNDED', 'R129_PRIMITIVE', 'Governed heavy-root qualitative class'),
      ],
      positiveEvidenceRefs: [REF.R124, REF.R128],
      counterexampleRefs: [],
      necessityStatus: 'NOT_ESTABLISHED',
      sufficiencyStatus: 'NOT_ESTABLISHED',
      minimalityStatus: 'NOT_ESTABLISHED',
      disposition: 'INSUFFICIENT_EVIDENCE',
      removalAudits: [
        removal('HEAVY_ROOT_CLASS_BOUNDED', false, null, 'UNKNOWN', null, 'No final-label paired evidence isolates heavy-root presence.'),
      ],
      additionAudits: [],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: true,
      sourceDependencyRisk: 'HIGH',
      nativeLabelPreserved: true,
      researchConclusion:
        'Heavy/light root wording is qualitative and does not provide a sufficient 強 rule.',
      unresolvedFactors: ['Yin Changsheng and some Lu scope gaps'],
      prohibitedExtensions: ['HEAVY_ROOT_EQUALS_QIANG'],
    }),
    audit({
      auditId: 'R130-A14-MONTH-ROOT-IMPLIES-GLOBAL-OVERRIDE',
      family: 'ROOT_QUALITY',
      targetKind: 'QUALITATIVE_DISPOSITION',
      targetNativeLabel: null,
      targetMeaning: 'Treat month-root priority as a global override of all other chart evidence.',
      scope: 'UNIVERSAL_CANDIDATE',
      candidatePredicates: [
        pred('MONTH_ROOT_PRIORITY_WITHIN_TONGGEN', 'R129_PRIMITIVE', 'Month branch root is especially important within Tonggen scope'),
      ],
      positiveEvidenceRefs: [REF.R122],
      counterexampleRefs: [REF.R122, REF.R128, REF.R129],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'FALSIFIED_BY_COUNTEREXAMPLE',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'FALSIFIED',
      removalAudits: [],
      additionAudits: [],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'LOW',
      nativeLabelPreserved: true,
      researchConclusion:
        'Month-root priority is scoped within Tonggen; month anti-rigidity evidence falsifies global-override promotion.',
      unresolvedFactors: [],
      prohibitedExtensions: ['MONTH_ROOT_PRIORITY_EQUALS_GLOBAL_OVERRIDE'],
    }),
    audit({
      auditId: 'R130-A15-MIXED-SUPPORT-BUNDLE-IMPLIES-NOT-RUO',
      family: 'SUPPORT',
      targetKind: 'SOURCE_NATIVE_LABEL',
      targetNativeLabel: '不弱',
      targetMeaning: 'Generalize repeated 比印 plus rooted support into a universal 不弱 rule.',
      scope: 'EXACT_CASE',
      candidatePredicates: [
        pred('PEER_SUPPORT_PRESENT', 'R129_PRIMITIVE', 'Peer support present'),
        pred('RESOURCE_SUPPORT_PRESENT', 'R129_PRIMITIVE', 'Resource support present'),
        pred('ROOT_SUPPORT_PRESENT_BOUNDED', 'R129_PRIMITIVE', 'Root support present'),
        pred('SUPPORT_ACCUMULATION_QUALITATIVE', 'R129_PRIMITIVE', 'Repeated/mixed support is qualitatively relevant'),
      ],
      positiveEvidenceRefs: [REF.R124, REF.R125, REF.R127],
      counterexampleRefs: [],
      necessityStatus: 'NOT_ESTABLISHED',
      sufficiencyStatus: 'EXACT_CASE_ONLY',
      minimalityStatus: 'NOT_ESTABLISHED',
      disposition: 'EXACT_CASE_ONLY',
      removalAudits: [
        removal('PEER_SUPPORT_PRESENT', false, null, 'UNKNOWN', null, 'No source-labeled resource+root counterpart is established.'),
        removal('RESOURCE_SUPPORT_PRESENT', false, null, 'UNKNOWN', null, 'No source-labeled peer+root counterpart is established.'),
        removal('ROOT_SUPPORT_PRESENT_BOUNDED', false, null, 'UNKNOWN', null, 'R127 explicitly withholds the no-root counterfactual label.'),
        removal('SUPPORT_ACCUMULATION_QUALITATIVE', false, null, 'UNKNOWN', null, 'No admitted threshold defines when accumulation ceases to be the same case family.'),
      ],
      additionAudits: [],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'MATERIAL',
      nativeLabelPreserved: true,
      researchConclusion:
        'The bounded source configuration reaches 不弱, but constituent necessity, threshold, and universal sufficiency remain unestablished.',
      unresolvedFactors: ['support constituent completeness', 'count threshold'],
      prohibitedExtensions: ['PEER_RESOURCE_ROOT_EQUALS_MINIMAL_NOT_RUO_SET'],
    }),
    audit({
      auditId: 'R130-A16-PEER-SUPPORT-IMPLIES-QIANG',
      family: 'SUPPORT',
      targetKind: 'SOURCE_NATIVE_LABEL',
      targetNativeLabel: '強',
      targetMeaning: 'Treat peer support presence as sufficient for 強.',
      scope: 'UNIVERSAL_CANDIDATE',
      candidatePredicates: [
        pred('PEER_SUPPORT_PRESENT', 'R129_PRIMITIVE', 'Peer support is present'),
      ],
      positiveEvidenceRefs: [REF.R125],
      counterexampleRefs: [REF.R122, REF.R127],
      necessityStatus: 'NOT_ESTABLISHED',
      sufficiencyStatus: 'FALSIFIED_BY_COUNTEREXAMPLE',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'FALSIFIED',
      removalAudits: [],
      additionAudits: [],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'MATERIAL',
      nativeLabelPreserved: true,
      researchConclusion:
        '四辛卯 and 四丙申 show that even repeated visible peer support can coexist with 弱 when root is absent.',
      unresolvedFactors: [],
      prohibitedExtensions: ['PEER_SUPPORT_EQUALS_QIANG'],
    }),
    audit({
      auditId: 'R130-A17-RESOURCE-SUPPORT-IMPLIES-QIANG',
      family: 'SUPPORT',
      targetKind: 'SOURCE_NATIVE_LABEL',
      targetNativeLabel: '強',
      targetMeaning: 'Treat resource support presence as sufficient for 強.',
      scope: 'UNIVERSAL_CANDIDATE',
      candidatePredicates: [
        pred('RESOURCE_SUPPORT_PRESENT', 'R129_PRIMITIVE', 'Resource support is present'),
      ],
      positiveEvidenceRefs: [REF.R125],
      counterexampleRefs: [],
      necessityStatus: 'NOT_ESTABLISHED',
      sufficiencyStatus: 'NOT_ESTABLISHED',
      minimalityStatus: 'NOT_ESTABLISHED',
      disposition: 'INSUFFICIENT_EVIDENCE',
      removalAudits: [
        removal('RESOURCE_SUPPORT_PRESENT', false, null, 'UNKNOWN', null, 'No paired final-strength source isolates resource presence as sufficient.'),
      ],
      additionAudits: [],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'MATERIAL',
      nativeLabelPreserved: true,
      researchConclusion:
        'Resource is a support mechanism, but no universal final-strength sufficiency is established.',
      unresolvedFactors: ['resource amount/context can vary'],
      prohibitedExtensions: ['RESOURCE_SUPPORT_EQUALS_QIANG'],
    }),
    audit({
      auditId: 'R130-A18-MORE-RESOURCE-ALWAYS-MORE-FAVORABLE',
      family: 'SUPPORT',
      targetKind: 'QUALITATIVE_DISPOSITION',
      targetNativeLabel: null,
      targetMeaning: 'Assume resource-support monotonicity: more resource is always more favorable.',
      scope: 'UNIVERSAL_CANDIDATE',
      candidatePredicates: [
        pred('RESOURCE_SUPPORT_PRESENT', 'R129_PRIMITIVE', 'Resource support exists'),
        pred('SOURCE_LOCAL_RESOURCE_MULTIPLICITY_INCREASE', 'RESEARCH_HYPOTHESIS', 'Resource multiplicity increases'),
      ],
      positiveEvidenceRefs: [REF.R125],
      counterexampleRefs: [REF.R125, REF.R127],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'FALSIFIED_BY_COUNTEREXAMPLE',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'FALSIFIED',
      removalAudits: [],
      additionAudits: [
        addition('RESOURCE_MULTIPLICITY_INCREASE', true, REF.R125, 'MONOTONICITY_FALSIFIED_CONTEXTUALLY', 'R125 preserves favorable resource multiplicity contexts and adverse 多/太過 contexts; universal monotonicity fails even though no exact +1 pair is supplied.'),
      ],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'MATERIAL',
      nativeLabelPreserved: true,
      researchConclusion:
        'Resource multiplicity is non-monotonic across reviewed contexts; no universal more-is-better rule survives.',
      unresolvedFactors: ['no exact numeric multiplicity boundary'],
      prohibitedExtensions: ['MORE_RESOURCE_ALWAYS_BETTER', 'RESOURCE_COUNT_EQUALS_MONOTONIC_STRENGTH'],
    }),
    audit({
      auditId: 'R130-A19-OUTPUT-PRESENT-ALWAYS-ADVERSE',
      family: 'CHALLENGE',
      targetKind: 'QUALITATIVE_DISPOSITION',
      targetNativeLabel: null,
      targetMeaning: 'Treat output presence as universally adverse to strength.',
      scope: 'UNIVERSAL_CANDIDATE',
      candidatePredicates: [
        pred('OUTPUT_RELATION_PRESENT', 'R129_PRIMITIVE', 'Output relation is present'),
      ],
      positiveEvidenceRefs: [],
      counterexampleRefs: [REF.R126, REF.R127, REF.R128],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'FALSIFIED_BY_COUNTEREXAMPLE',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'FALSIFIED',
      removalAudits: [],
      additionAudits: [
        addition('OUTPUT_RELATION_PRESENT', true, REF.R127, 'TARGET_CHANGED_LOCAL_FUNCTION', 'Adding 食傷 to 身印兩旺 yields source-stated useful leakage rather than a fixed adverse unit.'),
      ],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'MATERIAL',
      nativeLabelPreserved: true,
      researchConclusion:
        '身印兩旺而用食傷洩氣 falsifies universal adverse polarity for output.',
      unresolvedFactors: ['post-leakage final strength label not supplied'],
      prohibitedExtensions: ['OUTPUT_EQUALS_ALWAYS_ADVERSE', 'OUTPUT_EQUALS_NEGATIVE_POINT'],
    }),
    audit({
      auditId: 'R130-A20-WEALTH-PRESENT-ALWAYS-ADVERSE',
      family: 'CHALLENGE',
      targetKind: 'QUALITATIVE_DISPOSITION',
      targetNativeLabel: null,
      targetMeaning: 'Treat wealth presence as universally adverse to strength/local settlement.',
      scope: 'UNIVERSAL_CANDIDATE',
      candidatePredicates: [
        pred('WEALTH_RELATION_PRESENT', 'R129_PRIMITIVE', 'Wealth relation is present'),
      ],
      positiveEvidenceRefs: [],
      counterexampleRefs: [REF.R126, REF.R127],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'FALSIFIED_BY_COUNTEREXAMPLE',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'FALSIFIED',
      removalAudits: [],
      additionAudits: [
        addition('WEALTH_RELATION_PRESENT', true, REF.R127, 'TARGET_CHANGED_LOCAL_FUNCTION', 'In the 財去印存食 rescue sequence, added wealth serves a local rescue role.'),
      ],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'MATERIAL',
      nativeLabelPreserved: true,
      researchConclusion:
        'Wealth can be adverse, capacity-sensitive, generative, or rescuing in local chains; universal adverse polarity is falsified.',
      unresolvedFactors: [],
      prohibitedExtensions: ['WEALTH_EQUALS_ALWAYS_ADVERSE', 'WEALTH_EQUALS_FIXED_DRAIN'],
    }),
    audit({
      auditId: 'R130-A21-CONTROL-PRESENT-ALWAYS-ADVERSE',
      family: 'CHALLENGE',
      targetKind: 'QUALITATIVE_DISPOSITION',
      targetNativeLabel: null,
      targetMeaning: 'Treat officer/kill control presence as universally adverse.',
      scope: 'UNIVERSAL_CANDIDATE',
      candidatePredicates: [
        pred('CONTROL_RELATION_PRESENT', 'R129_PRIMITIVE', 'Officer/kill control relation is present'),
      ],
      positiveEvidenceRefs: [],
      counterexampleRefs: [REF.R126],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'FALSIFIED_BY_COUNTEREXAMPLE',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'FALSIFIED',
      removalAudits: [],
      additionAudits: [
        addition('OUTPUT_CONTROLS_KILL', true, REF.R126, 'TARGET_CHANGED_LOCAL_FUNCTION', '食神制煞 changes the local state of kill from uncontrolled to controlled.'),
      ],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'MATERIAL',
      nativeLabelPreserved: true,
      researchConclusion:
        '身強七煞逢制 and 食神制煞 show that control presence cannot be assigned one fixed adverse disposition.',
      unresolvedFactors: [],
      prohibitedExtensions: ['CONTROL_EQUALS_ALWAYS_ADVERSE', 'CONTROL_EQUALS_NEGATIVE_POINT'],
    }),
    audit({
      auditId: 'R130-A22-RESOURCE-PRESENT-ALWAYS-BENEFICIAL',
      family: 'SUPPORT',
      targetKind: 'QUALITATIVE_DISPOSITION',
      targetNativeLabel: null,
      targetMeaning: 'Treat resource presence as universally beneficial.',
      scope: 'UNIVERSAL_CANDIDATE',
      candidatePredicates: [
        pred('RESOURCE_SUPPORT_PRESENT', 'R129_PRIMITIVE', 'Resource relation is present'),
      ],
      positiveEvidenceRefs: [REF.R125],
      counterexampleRefs: [REF.R126, REF.R127],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'FALSIFIED_BY_COUNTEREXAMPLE',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'FALSIFIED',
      removalAudits: [],
      additionAudits: [
        addition('RESOURCE_SUPPORT_PRESENT', true, REF.R127, 'TARGET_CHANGED_LOCAL_FUNCTION', 'Adding 印 to an existing 食制煞 chain creates the source-stated contamination case.'),
      ],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'MATERIAL',
      nativeLabelPreserved: true,
      researchConclusion:
        'Resource can support the body but can also disrupt a favorable local relation chain; universal beneficial polarity is falsified.',
      unresolvedFactors: [],
      prohibitedExtensions: ['RESOURCE_ALWAYS_BENEFICIAL'],
    }),
    audit({
      auditId: 'R130-A23-FOOD-CONTROLS-KILL-LOCAL-RULE',
      family: 'RELATION_CHAIN',
      targetKind: 'RELATION_FUNCTION',
      targetNativeLabel: '食神制煞',
      targetMeaning: 'Preserve the source-local food-controls-kill relation.',
      scope: 'SOURCE_LOCAL',
      candidatePredicates: [
        pred('OUTPUT_CONTROLS_KILL', 'R129_PRIMITIVE', 'Food/output controls kill in the bounded chain'),
        pred('SOURCE_LOCAL_FOOD_PRESENT', 'SOURCE_LOCAL_FACT', '食神 is present'),
        pred('SOURCE_LOCAL_KILL_PRESENT', 'SOURCE_LOCAL_FACT', '七煞 is present'),
      ],
      positiveEvidenceRefs: [REF.R126],
      counterexampleRefs: [],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'BOUNDED_SOURCE_RULE_SUPPORTED',
      minimalityStatus: 'NOT_ESTABLISHED',
      disposition: 'NON_STRENGTH_RELATION_ONLY',
      removalAudits: [
        removal('SOURCE_LOCAL_FOOD_PRESENT', false, null, 'UNKNOWN', null, 'The lexical relation itself names 食神; this audit does not claim a whole-chart necessity theorem.'),
        removal('SOURCE_LOCAL_KILL_PRESENT', false, null, 'UNKNOWN', null, 'The lexical relation itself names 煞; no whole-chart minimality is inferred.'),
      ],
      additionAudits: [
        addition('RESOURCE_SUPPORT_PRESENT', true, REF.R126, 'TARGET_CHANGED_LOCAL_FUNCTION', 'Adding 印 creates 七煞逢食制而又逢印 contamination.'),
      ],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'MATERIAL',
      nativeLabelPreserved: true,
      researchConclusion:
        '食神制煞 is a bounded relation-function rule, not a whole-chart strength rule.',
      unresolvedFactors: ['whole-chart strength target absent'],
      prohibitedExtensions: ['FOOD_CONTROLS_KILL_EQUALS_STRONG'],
    }),
    audit({
      auditId: 'R130-A24-FOOD-CONTROL-PLUS-RESOURCE-CONTAMINATION',
      family: 'RELATION_CHAIN',
      targetKind: 'RELATION_FUNCTION',
      targetNativeLabel: '七煞逢食制而又逢印',
      targetMeaning: 'Preserve the source-local contamination relation.',
      scope: 'SOURCE_LOCAL',
      candidatePredicates: [
        pred('OUTPUT_CONTROLS_KILL', 'R129_PRIMITIVE', 'Existing 食制煞 relation'),
        pred('RESOURCE_SUPPORT_PRESENT', 'R129_PRIMITIVE', '印 is added/present'),
      ],
      positiveEvidenceRefs: [REF.R126, REF.R127],
      counterexampleRefs: [],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'BOUNDED_SOURCE_RULE_SUPPORTED',
      minimalityStatus: 'NOT_ESTABLISHED',
      disposition: 'NON_STRENGTH_RELATION_ONLY',
      removalAudits: [
        removal('OUTPUT_CONTROLS_KILL', false, null, 'UNKNOWN', null, 'No source-local contamination rule is inferred without the pre-existing 食制煞 chain.'),
        removal('RESOURCE_SUPPORT_PRESENT', true, false, 'REQUIRED_SUPPORTED', REF.R126, 'Without 印, the prior 食神制煞 local function remains and the contamination target itself no longer applies.'),
      ],
      additionAudits: [
        addition('WEALTH_RELATION_PRESENT', true, REF.R126, 'TARGET_CHANGED_LOCAL_FUNCTION', 'Adding 財 can remove 印 and preserve 食 in the 財去印存食 rescue sequence.'),
      ],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'MATERIAL',
      nativeLabelPreserved: true,
      researchConclusion:
        'The contamination relation is source-local and addition-sensitive; it must not become a whole-chart strength rule.',
      unresolvedFactors: [],
      prohibitedExtensions: ['RESOURCE_CONTAMINATION_EQUALS_FINAL_WEAKNESS'],
    }),
    audit({
      auditId: 'R130-A25-FOOD-RESOURCE-WEALTH-RESCUE',
      family: 'RELATION_CHAIN',
      targetKind: 'RELATION_FUNCTION',
      targetNativeLabel: '財去印存食',
      targetMeaning: 'Preserve the source-local rescue sequence after contamination.',
      scope: 'SOURCE_LOCAL',
      candidatePredicates: [
        pred('OUTPUT_CONTROLS_KILL', 'R129_PRIMITIVE', 'Food controls kill'),
        pred('RESOURCE_SUPPORT_PRESENT', 'R129_PRIMITIVE', 'Resource contaminates the chain'),
        pred('WEALTH_RELATION_PRESENT', 'R129_PRIMITIVE', 'Wealth removes resource in the bounded rescue'),
      ],
      positiveEvidenceRefs: [REF.R126, REF.R127],
      counterexampleRefs: [],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'BOUNDED_SOURCE_RULE_SUPPORTED',
      minimalityStatus: 'NOT_ESTABLISHED',
      disposition: 'NON_STRENGTH_RELATION_ONLY',
      removalAudits: [
        removal('OUTPUT_CONTROLS_KILL', false, null, 'UNKNOWN', null, 'The rescue sequence is defined relative to the pre-existing 食制煞 context.'),
        removal('RESOURCE_SUPPORT_PRESENT', false, null, 'UNKNOWN', null, 'Without 印 contamination there is no identical rescue problem to solve.'),
        removal('WEALTH_RELATION_PRESENT', true, false, 'REQUIRED_SUPPORTED', REF.R126, 'Within the quoted rescue sequence, 財 is the actor that 去印存食; removing it removes this specific rescue function.'),
      ],
      additionAudits: [
        addition('WEALTH_RELATION_PRESENT', true, REF.R127, 'TARGET_CHANGED_LOCAL_FUNCTION', 'Adding 財 changes the contaminated chain into the source-stated rescue configuration.'),
      ],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'MATERIAL',
      nativeLabelPreserved: true,
      researchConclusion:
        'The source supports this local rescue mechanism, not a final 強/弱 transition.',
      unresolvedFactors: [],
      prohibitedExtensions: ['CAI_RESCUE_EQUALS_STRONG'],
    }),
    audit({
      auditId: 'R130-A26-CAIDUO-SHENRUO-IMPLIES-RUO',
      family: 'CIRCULARITY',
      targetKind: 'SOURCE_NATIVE_LABEL',
      targetNativeLabel: '弱',
      targetMeaning: 'Infer 弱 from a predicate that already contains 身弱.',
      scope: 'SOURCE_LOCAL',
      candidatePredicates: [
        pred('SOURCE_LOCAL_WEALTH_MANY', 'SOURCE_LOCAL_FACT', '財多'),
        pred('SOURCE_LOCAL_BODY_WEAK', 'TARGET_LEAKAGE', '身弱 is already embedded in the source phrase'),
      ],
      positiveEvidenceRefs: [REF.R126],
      counterexampleRefs: [],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'CIRCULAR_TARGET_LEAKAGE',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'CIRCULAR',
      removalAudits: [
        removal('SOURCE_LOCAL_BODY_WEAK', false, null, 'UNKNOWN', null, 'Removing the leaked target leaves 財多 alone, which is not shown to entail 弱 universally.'),
      ],
      additionAudits: [
        addition('RESOURCE_SUPPORT_PRESENT', true, REF.R126, 'TARGET_LABEL_UNRESOLVED', '財多身弱要印扶身 supplies a remedy but no exact post-remedy opposite strength label.'),
      ],
      targetLeakage: true,
      circularityRisk: true,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'LOW',
      nativeLabelPreserved: true,
      researchConclusion:
        '財多身弱 is a bounded source phrase, not a non-circular theorem 財多 => 弱.',
      unresolvedFactors: ['post-remedy final label absent'],
      prohibitedExtensions: ['CAIDUO_ALONE_EQUALS_RUO'],
    }),
    audit({
      auditId: 'R130-A27-SHENQIANG-KILL-CONTROLLED-IMPLIES-QIANG',
      family: 'CIRCULARITY',
      targetKind: 'SOURCE_NATIVE_LABEL',
      targetNativeLabel: '強',
      targetMeaning: 'Infer 強 from 身強七煞逢制 when 身強 is already embedded.',
      scope: 'SOURCE_LOCAL',
      candidatePredicates: [
        pred('SOURCE_LOCAL_BODY_STRONG', 'TARGET_LEAKAGE', '身強 is already part of the source condition'),
        pred('CONTROL_RELATION_PRESENT', 'R129_PRIMITIVE', '七煞 present'),
        pred('OUTPUT_CONTROLS_KILL', 'R129_PRIMITIVE', 'Control is regulated'),
      ],
      positiveEvidenceRefs: [REF.R126],
      counterexampleRefs: [],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'CIRCULAR_TARGET_LEAKAGE',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'CIRCULAR',
      removalAudits: [
        removal('SOURCE_LOCAL_BODY_STRONG', false, null, 'UNKNOWN', null, 'Removing the embedded target leaves a control pattern, not a proved 強 rule.'),
      ],
      additionAudits: [],
      targetLeakage: true,
      circularityRisk: true,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'LOW',
      nativeLabelPreserved: true,
      researchConclusion:
        'The phrase is useful for local control context but cannot prove 強 because 強 is already a premise.',
      unresolvedFactors: [],
      prohibitedExtensions: ['SHENQIANG_PHRASE_USED_AS_PROOF_OF_QIANG'],
    }),
    audit({
      auditId: 'R130-A28-CAIWANG-SHENSHUAI-IMPLIES-SHUAI',
      family: 'CIRCULARITY',
      targetKind: 'SOURCE_NATIVE_LABEL',
      targetNativeLabel: '衰',
      targetMeaning: 'Infer 衰 from 財旺身衰 when 身衰 is already embedded.',
      scope: 'SOURCE_LOCAL',
      candidatePredicates: [
        pred('SOURCE_LOCAL_WEALTH_WANG', 'SOURCE_LOCAL_FACT', '財旺'),
        pred('SOURCE_LOCAL_BODY_SHUAI', 'TARGET_LEAKAGE', '身衰 is embedded in the source phrase'),
      ],
      positiveEvidenceRefs: [REF.R126],
      counterexampleRefs: [],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'CIRCULAR_TARGET_LEAKAGE',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'CIRCULAR',
      removalAudits: [
        removal('SOURCE_LOCAL_BODY_SHUAI', false, null, 'UNKNOWN', null, '財旺 alone is not established as a sufficient 衰 predicate.'),
      ],
      additionAudits: [],
      targetLeakage: true,
      circularityRisk: true,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'LOW',
      nativeLabelPreserved: true,
      researchConclusion:
        '財旺身衰 is retained as source language but rejected as a non-circular rule 財旺 => 衰.',
      unresolvedFactors: [],
      prohibitedExtensions: ['CAIWANG_ALONE_EQUALS_SHUAI'],
    }),
    audit({
      auditId: 'R130-A29-YANG-MUKU-IMPLIES-BOUNDED-ROOT',
      family: 'SOURCE_POLICY',
      targetKind: 'ROOT_STATUS',
      targetNativeLabel: 'ROOT_SUPPORTED_BOUNDED',
      targetMeaning: 'Governed non-Earth Yang own-Muku relation produces bounded positive root evidence.',
      scope: 'METHODOLOGY_LOCAL',
      candidatePredicates: [
        pred('SOURCE_LOCAL_NON_EARTH_YANG_STEM', 'SOURCE_LOCAL_FACT', 'Governed non-Earth Yang stem'),
        pred('SOURCE_LOCAL_OWN_ELEMENT_MUKU_RELATION', 'SOURCE_LOCAL_FACT', 'Governed own-element Muku relation'),
      ],
      positiveEvidenceRefs: [REF.R014, REF.R121, REF.R128, REF.R129],
      counterexampleRefs: [],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'BOUNDED_SOURCE_RULE_SUPPORTED',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'BOUNDED_RULE_CANDIDATE',
      removalAudits: [
        removal('MUKU_YANG_ROOT_BOUNDED', false, null, 'UNKNOWN', null, 'This audit preserves the already-governed bounded matcher rather than proving a minimal universal rule.'),
      ],
      additionAudits: [],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'MATERIAL',
      nativeLabelPreserved: true,
      researchConclusion:
        'A bounded non-final root-status rule is supported for the governed Yang/non-Earth own-Muku scope.',
      unresolvedFactors: ['does not extend to Yin or Earth'],
      prohibitedExtensions: ['YANG_MUKU_ROOT_EQUALS_FINAL_STRENGTH'],
    }),
    audit({
      auditId: 'R130-A30-YIN-MUKU-IMPLIES-BOUNDED-ROOT',
      family: 'SOURCE_POLICY',
      targetKind: 'ROOT_STATUS',
      targetNativeLabel: 'ROOT_SUPPORTED_BOUNDED',
      targetMeaning: 'Attempt to apply one source-neutral positive-root rule to Yin own-Muku.',
      scope: 'UNIVERSAL_CANDIDATE',
      candidatePredicates: [
        pred('SOURCE_LOCAL_YIN_STEM', 'SOURCE_LOCAL_FACT', 'Yin stem'),
        pred('SOURCE_LOCAL_OWN_ELEMENT_MUKU_RELATION', 'SOURCE_LOCAL_FACT', 'Own-element Muku relation under policy disagreement'),
      ],
      positiveEvidenceRefs: [REF.R014, REF.R128],
      counterexampleRefs: [REF.R014, REF.R128],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'POLICY_DEPENDENT',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'POLICY_BLOCKED',
      removalAudits: [],
      additionAudits: [],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: true,
      sourceDependencyRisk: 'POLICY_BLOCKING',
      nativeLabelPreserved: true,
      researchConclusion:
        'Source-stratum disagreement blocks a universal Yin-Muku positive-root rule.',
      unresolvedFactors: ['methodology selection required'],
      prohibitedExtensions: ['AUTO_SELECT_YIN_MUKU_WINNER'],
    }),
    audit({
      auditId: 'R130-A31-YANG-CHANGSHENG-IMPLIES-HEAVY-ROOT',
      family: 'SOURCE_POLICY',
      targetKind: 'ROOT_STATUS',
      targetNativeLabel: 'HEAVY_ROOT_BOUNDED',
      targetMeaning: 'Governed Yang Changsheng relation produces bounded heavy-root evidence.',
      scope: 'METHODOLOGY_LOCAL',
      candidatePredicates: [
        pred('SOURCE_LOCAL_YANG_DAY_MASTER', 'SOURCE_LOCAL_FACT', 'Governed Yang day master'),
        pred('SOURCE_LOCAL_CHANGSHENG_RELATION', 'SOURCE_LOCAL_FACT', 'Governed Changsheng relation'),
      ],
      positiveEvidenceRefs: [REF.R016, REF.R121, REF.R128, REF.R129],
      counterexampleRefs: [],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'BOUNDED_SOURCE_RULE_SUPPORTED',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'BOUNDED_RULE_CANDIDATE',
      removalAudits: [
        removal('YANG_CHANGSHENG_ROOT_BOUNDED', false, null, 'UNKNOWN', null, 'The existing bounded authority is preserved without universal minimality claims.'),
      ],
      additionAudits: [],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: false,
      sourceDependencyRisk: 'MATERIAL',
      nativeLabelPreserved: true,
      researchConclusion:
        'The governed Yang Changsheng root predicate is sufficient only for its bounded non-final root-status target.',
      unresolvedFactors: ['does not extend to Yin'],
      prohibitedExtensions: ['YANG_CHANGSHENG_ROOT_EQUALS_FINAL_STRENGTH'],
    }),
    audit({
      auditId: 'R130-A32-YIN-CHANGSHENG-IMPLIES-HEAVY-ROOT',
      family: 'SOURCE_POLICY',
      targetKind: 'ROOT_STATUS',
      targetNativeLabel: 'HEAVY_ROOT_BOUNDED',
      targetMeaning: 'Attempt to apply a universal heavy-root rule to Yin Changsheng.',
      scope: 'UNIVERSAL_CANDIDATE',
      candidatePredicates: [
        pred('SOURCE_LOCAL_YIN_DAY_MASTER', 'SOURCE_LOCAL_FACT', 'Yin day master'),
        pred('SOURCE_LOCAL_CHANGSHENG_RELATION', 'SOURCE_LOCAL_FACT', 'Changsheng relation under policy disagreement'),
      ],
      positiveEvidenceRefs: [REF.R016, REF.R128],
      counterexampleRefs: [REF.R016, REF.R128],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'POLICY_DEPENDENT',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'POLICY_BLOCKED',
      removalAudits: [],
      additionAudits: [],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: true,
      sourceDependencyRisk: 'POLICY_BLOCKING',
      nativeLabelPreserved: true,
      researchConclusion:
        'The explicit Yin exception and broader competing wording block a source-neutral heavy-root rule.',
      unresolvedFactors: ['methodology selection required'],
      prohibitedExtensions: ['DEFAULT_YIN_CHANGSHENG_HEAVY_ROOT'],
    }),
    audit({
      auditId: 'R130-A33-LU-IMPLIES-BOUNDED-HEAVY-ROOT',
      family: 'SOURCE_POLICY',
      targetKind: 'ROOT_STATUS',
      targetNativeLabel: 'HEAVY_ROOT_BOUNDED',
      targetMeaning: 'Governed source-native Lu relation produces bounded heavy-root evidence.',
      scope: 'METHODOLOGY_LOCAL',
      candidatePredicates: [
        pred('SOURCE_LOCAL_GOVERNED_LU_RELATION', 'SOURCE_LOCAL_FACT', 'Governed source-native Lu relation'),
      ],
      positiveEvidenceRefs: [REF.R017, REF.R121, REF.R129],
      counterexampleRefs: [],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'BOUNDED_SOURCE_RULE_SUPPORTED',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'BOUNDED_RULE_CANDIDATE',
      removalAudits: [
        removal('LU_ROOT_BOUNDED', false, null, 'UNKNOWN', null, 'Preserves bounded matcher without asserting universal necessity.'),
      ],
      additionAudits: [],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: true,
      sourceDependencyRisk: 'MATERIAL',
      nativeLabelPreserved: true,
      researchConclusion:
        'Bounded Lu root semantics are supported; 臨官 is not automatically bridged to this rule.',
      unresolvedFactors: ['Yin/Earth Lu gaps'],
      prohibitedExtensions: ['LINGUAN_EQUALS_LU_EXECUTABLE_BRIDGE'],
    }),
    audit({
      auditId: 'R130-A34-WANG-IMPLIES-BOUNDED-HEAVY-ROOT',
      family: 'SOURCE_POLICY',
      targetKind: 'ROOT_STATUS',
      targetNativeLabel: 'HEAVY_ROOT_BOUNDED',
      targetMeaning: 'Governed source-native 旺 relation produces bounded heavy-root evidence.',
      scope: 'METHODOLOGY_LOCAL',
      candidatePredicates: [
        pred('SOURCE_LOCAL_GOVERNED_WANG_RELATION', 'SOURCE_LOCAL_FACT', 'Governed source-native 旺 relation'),
      ],
      positiveEvidenceRefs: [REF.R017, REF.R121, REF.R129],
      counterexampleRefs: [],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'BOUNDED_SOURCE_RULE_SUPPORTED',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'BOUNDED_RULE_CANDIDATE',
      removalAudits: [
        removal('WANG_ROOT_BOUNDED', false, null, 'UNKNOWN', null, 'Preserves bounded source-native 旺 matcher without universal necessity.'),
      ],
      additionAudits: [],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: true,
      sourceDependencyRisk: 'MATERIAL',
      nativeLabelPreserved: true,
      researchConclusion:
        'Bounded source-native 旺 root semantics are supported; 帝旺 stage is not automatically bridged to this rule.',
      unresolvedFactors: [],
      prohibitedExtensions: ['DIWANG_EQUALS_WANG_EXECUTABLE_BRIDGE'],
    }),
    audit({
      auditId: 'R130-A35-EARTH-MUKU-IMPLIES-ROOT',
      family: 'SOURCE_POLICY',
      targetKind: 'ROOT_STATUS',
      targetNativeLabel: 'ROOT_SUPPORTED_BOUNDED',
      targetMeaning: 'Attempt to invent a universal Earth Muku positive-root rule.',
      scope: 'UNIVERSAL_CANDIDATE',
      candidatePredicates: [
        pred('SOURCE_LOCAL_EARTH_MUKU_QUERY', 'SOURCE_LOCAL_FACT', 'Earth-stem Muku relation query remains unresolved'),
      ],
      positiveEvidenceRefs: [],
      counterexampleRefs: [REF.R014, REF.R121, REF.R129],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'POLICY_DEPENDENT',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'POLICY_BLOCKED',
      removalAudits: [],
      additionAudits: [],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: true,
      sourceDependencyRisk: 'POLICY_BLOCKING',
      nativeLabelPreserved: true,
      researchConclusion:
        'The governed corpus explicitly leaves universal Earth Muku treatment unresolved.',
      unresolvedFactors: ['no universal Earth Muku mapping'],
      prohibitedExtensions: ['INVENT_EARTH_FIFTH_MUKU'],
    }),
    audit({
      auditId: 'R130-A36-YUQI-ALWAYS-FIXED-LIGHT-ROOT',
      family: 'ROOT_QUALITY',
      targetKind: 'QUALITATIVE_DISPOSITION',
      targetNativeLabel: 'FIXED_LIGHT_ROOT',
      targetMeaning: 'Treat Yuqi as one timeless fixed light-root state.',
      scope: 'UNIVERSAL_CANDIDATE',
      candidatePredicates: [
        pred('YUQI_ROOT_EVIDENCE_BOUNDED', 'R129_PRIMITIVE', 'Yuqi provides bounded root evidence'),
        pred('SOURCE_LOCAL_FIXED_LIGHT_ASSUMPTION', 'RESEARCH_HYPOTHESIS', 'Assume qualitative lightness is time-invariant'),
      ],
      positiveEvidenceRefs: [REF.R128],
      counterexampleRefs: [REF.R015, REF.R127, REF.R128, REF.R129],
      necessityStatus: 'NOT_APPLICABLE',
      sufficiencyStatus: 'FALSIFIED_BY_COUNTEREXAMPLE',
      minimalityStatus: 'NOT_APPLICABLE',
      disposition: 'FALSIFIED',
      removalAudits: [],
      additionAudits: [
        addition('YUQI_TEMPORAL_VARIABILITY', true, REF.R015, 'MONOTONICITY_FALSIFIED_CONTEXTUALLY', '清明後十二日 versus 土旺之後 changes the qualitative Yuqi description and falsifies one timeless fixed-light state.'),
      ],
      targetLeakage: false,
      circularityRisk: false,
      sourcePolicySensitive: true,
      sourceDependencyRisk: 'HIGH',
      nativeLabelPreserved: true,
      researchConclusion:
        'Source-observed temporal variability falsifies a single timeless Yuqi-lightness predicate.',
      unresolvedFactors: ['no executable temporal classifier'],
      prohibitedExtensions: ['YUQI_ALWAYS_FIXED_LIGHT_ROOT', 'YUQI_TEMPORAL_VARIABILITY_EQUALS_NUMERIC_WEIGHT'],
    }),
  ]);

export const R130_REJECTED_DERIVATIONS = Object.freeze([
  'POSITIVE_CASE_EQUALS_SUFFICIENCY_PROOF',
  'SOURCE_CASE_BUNDLE_EQUALS_MINIMAL_PREDICATE_SET',
  'CO_OCCURRENCE_EQUALS_NECESSITY',
  'CO_OCCURRENCE_EQUALS_SUFFICIENCY',
  'SUFFICIENCY_WITHOUT_REMOVAL_AUDIT_EQUALS_MINIMALITY',
  'POLICY_SENSITIVE_PREDICATE_EQUALS_UNIVERSAL_RULE',
  'SOURCE_NATIVE_LABEL_EQUALS_NORMALIZED_BINARY_LABEL',
  'LOCAL_RELATION_SETTLEMENT_EQUALS_WHOLE_CHART_STRENGTH',
  'COUNTERFACTUAL_LABEL_CAN_BE_INVENTED',
  'NO_MINIMAL_SET_FOUND_EQUALS_LICENSE_TO_SCORE',
  'TEXTUALLY_DEPENDENT_REPETITION_EQUALS_REPLICATED_RULE',
  'TARGET_LEAKAGE_EQUALS_VALID_RULE',
] as const);

export const R130_SUMMARY = Object.freeze({
  auditCount: R130_STRENGTH_PREDICATE_AUDITS.length,
  familyCount: new Set(R130_STRENGTH_PREDICATE_AUDITS.map((row) => row.family)).size,
  counterexampleBackedFalsificationCount: R130_STRENGTH_PREDICATE_AUDITS.filter(
    (row) => row.disposition === 'FALSIFIED' && row.counterexampleRefs.length > 0,
  ).length,
  removalAuditCount: R130_STRENGTH_PREDICATE_AUDITS.reduce(
    (sum, row) => sum + row.removalAudits.length,
    0,
  ),
  additionSensitivityAuditCount: R130_STRENGTH_PREDICATE_AUDITS.reduce(
    (sum, row) => sum + row.additionAudits.length,
    0,
  ),
  circularRuleCount: R130_STRENGTH_PREDICATE_AUDITS.filter(
    (row) => row.disposition === 'CIRCULAR',
  ).length,
  policyBlockedCount: R130_STRENGTH_PREDICATE_AUDITS.filter(
    (row) => row.disposition === 'POLICY_BLOCKED',
  ).length,
  sourceNativeLabelTargetCount: R130_STRENGTH_PREDICATE_AUDITS.filter(
    (row) => row.targetKind === 'SOURCE_NATIVE_LABEL' && row.targetNativeLabel !== null,
  ).length,
  necessityEstablishedCount: R130_STRENGTH_PREDICATE_AUDITS.filter(
    (row) =>
      row.necessityStatus === 'EXPLICITLY_REQUIRED_SOURCE_LOCAL' ||
      row.necessityStatus === 'SUPPORTED_BY_REMOVAL_EVIDENCE',
  ).length,
  sufficiencyEstablishedCount: R130_STRENGTH_PREDICATE_AUDITS.filter(
    (row) => row.sufficiencyStatus === 'BOUNDED_SOURCE_RULE_SUPPORTED',
  ).length,
  minimalityEstablishedCount: R130_STRENGTH_PREDICATE_AUDITS.filter(
    (row) => row.minimalityStatus === 'MINIMAL_ESTABLISHED',
  ).length,
  exactCaseOnlyCount: R130_STRENGTH_PREDICATE_AUDITS.filter(
    (row) => row.disposition === 'EXACT_CASE_ONLY',
  ).length,
  insufficientEvidenceCount: R130_STRENGTH_PREDICATE_AUDITS.filter(
    (row) => row.disposition === 'INSUFFICIENT_EVIDENCE',
  ).length,
  boundedRuleCandidateCount: R130_STRENGTH_PREDICATE_AUDITS.filter(
    (row) => row.disposition === 'BOUNDED_RULE_CANDIDATE',
  ).length,
  numericRuleAuthorizedCount: R130_STRENGTH_PREDICATE_AUDITS.filter(
    (row) => row.numericRuleAuthorized,
  ).length,
  finalClassifierAuthorizedCount: R130_STRENGTH_PREDICATE_AUDITS.filter(
    (row) => row.finalClassifierAuthorized,
  ).length,
  universalRuleAuthorizedCount: R130_STRENGTH_PREDICATE_AUDITS.filter(
    (row) => row.universalRuleAuthorized,
  ).length,
} as const);

export const R130_AUTHORITY = Object.freeze({
  status: 'RESEARCH_STRENGTH_MINIMAL_SUFFICIENT_PREDICATE_AUDIT_COMPLETE' as const,
  researchOnly: true,
  candidateRuleAuditComplete: true,
  counterexampleFalsificationOperationalized: true,
  removalAuditOperationalized: true,
  additionSensitivityAuditOperationalized: true,
  circularityGuardOperationalized: true,
  sourcePolicyBlockingOperationalized: true,
  boundedNonFinalPredicateRulesObserved: true,
  globalNecessaryPredicateEstablished: false,
  globalFinalStrengthSufficiencyEstablished: false,
  globalMinimalSufficientStrengthSetEstablished: false,
  numericStrengthRuleAuthorized: false,
  finalQiangRuoClassifierAuthorized: false,
  finalWangShuaiClassifierAuthorized: false,
  automaticAuthorityAdmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
