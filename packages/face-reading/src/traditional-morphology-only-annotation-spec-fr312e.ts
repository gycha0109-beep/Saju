import {
  FACE_DIRECT_RULE_EVIDENCE_FR311J,
} from './traditional-face-evidence-index-fr311j.js';
import {
  FR312D_LEGACY_ADMISSION,
  FR312D_MORPHOLOGY_ONLY_PILOT_PROTOCOL,
} from './traditional-empirical-admission-protocol-design-fr312d.js';

export type MorphologyAnnotationLabelFR312E =
  | 'present'
  | 'absent'
  | 'indeterminate'
  | 'not_observable';

export type MorphologyNotObservableReasonFR312E =
  | 'mouth_open'
  | 'speaking'
  | 'smile_or_non_neutral_expression'
  | 'lip_pursing'
  | 'deliberate_lip_compression'
  | 'material_pose_deviation'
  | 'hand_mask_facial_hair_or_other_occlusion'
  | 'target_region_cropped'
  | 'shape_distorting_filter'
  | 'insufficient_resolution'
  | 'motion_or_focus_blur'
  | 'other_capture_failure';

export type MorphologyPredicateRegionFR312E =
  | 'philtrum'
  | 'mouth_whole'
  | 'mouth_corner'
  | 'upper_lip'
  | 'lower_lip'
  | 'lips_pair'
  | 'lips_unspecified';

export type NeutralComparatorKeyFR312E =
  | 'mouth.philtrum_length_width'
  | 'mouth.width_and_relative_size'
  | 'mouth.corner_orientation'
  | 'mouth.visible_lip_fullness';

export type RequiredCaptureStateFR312E =
  | 'frontal_or_near_frontal'
  | 'neutral_resting_expression'
  | 'mouth_closed_without_deliberate_pursing_or_compression'
  | 'target_region_fully_visible'
  | 'adequate_focus_and_resolution'
  | 'no_shape_distorting_filter';

export type ForbiddenCaptureStateFR312E =
  | 'mouth_open'
  | 'speaking'
  | 'smile_or_exaggerated_expression'
  | 'lip_pursing'
  | 'deliberate_lip_compression'
  | 'material_head_yaw_or_pitch'
  | 'target_region_occluded'
  | 'target_region_cropped'
  | 'shape_distorting_filter'
  | 'insufficient_resolution'
  | 'motion_or_focus_blur';

export interface MorphologySensitivityFR312E {
  readonly expressionSensitive: boolean;
  readonly occlusionSensitive: boolean;
  readonly poseSensitive: boolean;
  readonly framingSensitive: boolean;
  readonly imageQualitySensitive: boolean;
}

export interface CanonicalMorphologyPredicateFR312E {
  readonly predicateId: string;
  readonly region: MorphologyPredicateRegionFR312E;
  readonly morphologyFragment: string;
  readonly neutralAnnotationGloss: string;
  readonly compoundDescriptor: boolean;
  readonly requiredCaptureState: readonly RequiredCaptureStateFR312E[];
  readonly forbiddenCaptureStates: readonly ForbiddenCaptureStateFR312E[];
  readonly positiveGuidance: string;
  readonly negativeGuidance: string;
  readonly indeterminateGuidance: string;
  readonly notObservableGuidance: string;
  readonly sensitivity: MorphologySensitivityFR312E;
  readonly annotationSemanticLeakProhibited: true;
  readonly metricLeakProhibited: true;
  readonly thresholdProhibited: true;
  readonly empiricalExecutionAuthorized: false;
  readonly automaticLabelAuthorized: false;
}

export interface MorphologySourceClauseFR312E {
  readonly clauseId: string;
  readonly sourceRuleId: string;
  readonly canonicalSourceRef: string;
  readonly fullHistoricalSourceExpression: string;
  readonly sourceMorphologyFragment: string;
  readonly semanticFragmentHiddenFromAnnotator: string;
  readonly canonicalPredicateId: string;
  readonly neutralComparatorKey: NeutralComparatorKeyFR312E;
  readonly observableFaceRegion: MorphologyPredicateRegionFR312E;
  readonly clauseIndexWithinRule: number;
  readonly annotationSemanticLeakProhibited: true;
  readonly metricLeakProhibited: true;
  readonly thresholdProhibited: true;
  readonly empiricalExecutionAuthorized: false;
}

export interface MorphologyRuleObservationContractFR312E {
  readonly ruleId: string;
  readonly canonicalSourceRefs: readonly string[];
  readonly fullHistoricalSourceExpression: string;
  readonly morphologyClauseIds: readonly string[];
  readonly semanticFragmentsHiddenFromAnnotator: readonly string[];
  readonly neutralComparatorKeys: readonly NeutralComparatorKeyFR312E[];
  readonly observableFaceRegions: readonly MorphologyPredicateRegionFR312E[];
  readonly requiredCaptureState: readonly RequiredCaptureStateFR312E[];
  readonly forbiddenCaptureStates: readonly ForbiddenCaptureStateFR312E[];
  readonly positiveMorphologyGuidance: readonly string[];
  readonly negativeMorphologyGuidance: readonly string[];
  readonly indeterminateGuidance: readonly string[];
  readonly notObservableReasons: readonly MorphologyNotObservableReasonFR312E[];
  readonly expressionSensitive: boolean;
  readonly occlusionSensitive: boolean;
  readonly poseSensitive: boolean;
  readonly framingSensitive: boolean;
  readonly imageQualitySensitive: boolean;
  readonly annotationSemanticLeakProhibited: true;
  readonly metricLeakProhibited: true;
  readonly thresholdProhibited: true;
  readonly empiricalExecutionAuthorized: false;
}

export interface MorphologyAnnotatorCardFR312E {
  readonly predicateId: string;
  readonly morphologyFragment: string;
  readonly neutralAnnotationGloss: string;
  readonly labels: readonly MorphologyAnnotationLabelFR312E[];
  readonly positiveGuidance: string;
  readonly negativeGuidance: string;
  readonly indeterminateGuidance: string;
  readonly notObservableGuidance: string;
  readonly notObservableReasons: readonly MorphologyNotObservableReasonFR312E[];
}

const SOURCE_REF = 'witness.gujin473.art634.wikisource';

const REQUIRED_CAPTURE_STATE = Object.freeze([
  'frontal_or_near_frontal',
  'neutral_resting_expression',
  'mouth_closed_without_deliberate_pursing_or_compression',
  'target_region_fully_visible',
  'adequate_focus_and_resolution',
  'no_shape_distorting_filter',
] as const);

const FORBIDDEN_CAPTURE_STATES = Object.freeze([
  'mouth_open',
  'speaking',
  'smile_or_exaggerated_expression',
  'lip_pursing',
  'deliberate_lip_compression',
  'material_head_yaw_or_pitch',
  'target_region_occluded',
  'target_region_cropped',
  'shape_distorting_filter',
  'insufficient_resolution',
  'motion_or_focus_blur',
] as const);

export const FR312E_NOT_OBSERVABLE_REASONS:
readonly MorphologyNotObservableReasonFR312E[] = Object.freeze([
  'mouth_open',
  'speaking',
  'smile_or_non_neutral_expression',
  'lip_pursing',
  'deliberate_lip_compression',
  'material_pose_deviation',
  'hand_mask_facial_hair_or_other_occlusion',
  'target_region_cropped',
  'shape_distorting_filter',
  'insufficient_resolution',
  'motion_or_focus_blur',
  'other_capture_failure',
] as const);

const DEFAULT_SENSITIVITY: MorphologySensitivityFR312E = Object.freeze({
  expressionSensitive: true,
  occlusionSensitive: true,
  poseSensitive: true,
  framingSensitive: true,
  imageQualitySensitive: true,
});

function predicate(
  predicateId: string,
  region: MorphologyPredicateRegionFR312E,
  morphologyFragment: string,
  neutralAnnotationGloss: string,
  compoundDescriptor: boolean,
  positiveGuidance: string,
  indeterminateGuidance: string,
): CanonicalMorphologyPredicateFR312E {
  return Object.freeze({
    predicateId,
    region,
    morphologyFragment,
    neutralAnnotationGloss,
    compoundDescriptor,
    requiredCaptureState: REQUIRED_CAPTURE_STATE,
    forbiddenCaptureStates: FORBIDDEN_CAPTURE_STATES,
    positiveGuidance,
    negativeGuidance:
      'Use absent only when the target region is fully observable and the source-bounded morphology predicate is clearly not supported. Never use absent for capture failure or a borderline case.',
    indeterminateGuidance,
    notObservableGuidance:
      'Use not_observable when capture, occlusion, expression, pose, framing, filter distortion, resolution, or blur prevents a stable morphology judgment.',
    sensitivity: DEFAULT_SENSITIVITY,
    annotationSemanticLeakProhibited: true as const,
    metricLeakProhibited: true as const,
    thresholdProhibited: true as const,
    empiricalExecutionAuthorized: false as const,
    automaticLabelAuthorized: false as const,
  });
}

export const FR312E_CANONICAL_MORPHOLOGY_PREDICATES:
readonly CanonicalMorphologyPredicateFR312E[] = Object.freeze([
  predicate(
    'fr312e.philtrum.thin_and_narrow',
    'philtrum',
    '細而狹',
    '인중이 “가늘고 좁다(細而狹)”는 원문 형태 조건',
    true,
    'Use present only when the complete source predicate 細而狹 is judged observable. Do not reduce the predicate to only 細 or only 狹.',
    'Use indeterminate when the image is gradable but the complete compound predicate cannot be stably decided, including a mixed judgment between 細 and 狹.',
  ),
  predicate(
    'fr312e.mouth.small_and_short',
    'mouth_whole',
    '口小而短',
    '입이 “작고 짧다(口小而短)”는 원문 형태 조건',
    true,
    'Use present only when the complete source predicate 口小而短 is judged observable. Do not define 小 and 短 as the same neutral dimension.',
    'Use indeterminate when the image is gradable but only part of the compound predicate is supported or the full 口小而短 predicate cannot be stably decided.',
  ),
  predicate(
    'fr312e.mouth_corner.bilateral_droop',
    'mouth_corner',
    '兩角低垂',
    '양 입꼬리가 “낮게 처진다(兩角低垂)”는 원문 형태 조건',
    false,
    'Use present only when the bilateral source predicate 兩角低垂 is judged observable.',
    'Use indeterminate when the image is gradable but the bilateral predicate is borderline, asymmetric, or otherwise not stably decidable.',
  ),
  predicate(
    'fr312e.upper_lip.thin',
    'upper_lip',
    '上脣薄',
    '윗입술이 “얇다(上脣薄)”는 원문 형태 조건',
    false,
    'Use present only when the source predicate 上脣薄 is judged observable.',
    'Use indeterminate when the image is gradable but the upper-lip morphology is borderline or cannot be stably placed as thin versus not thin without a numeric cutoff.',
  ),
  predicate(
    'fr312e.lower_lip.thin',
    'lower_lip',
    '下脣薄',
    '아랫입술이 “얇다(下脣薄)”는 원문 형태 조건',
    false,
    'Use present only when the source predicate 下脣薄 is judged observable.',
    'Use indeterminate when the image is gradable but the lower-lip morphology is borderline or cannot be stably placed as thin versus not thin without a numeric cutoff.',
  ),
  predicate(
    'fr312e.lips_pair.both_thick',
    'lips_pair',
    '上下俱厚',
    '위아래 입술이 “모두 두껍다(上下俱厚)”는 원문 형태 조건',
    true,
    'Use present only when both upper and lower lips support the source predicate 上下俱厚.',
    'Use indeterminate when the image is gradable but the upper and lower lips give a mixed judgment or the pair predicate cannot be stably decided.',
  ),
  predicate(
    'fr312e.lips_pair.both_thin',
    'lips_pair',
    '上下俱薄',
    '위아래 입술이 “모두 얇다(上下俱薄)”는 원문 형태 조건',
    true,
    'Use present only when both upper and lower lips support the source predicate 上下俱薄.',
    'Use indeterminate when the image is gradable but the upper and lower lips give a mixed judgment or the pair predicate cannot be stably decided.',
  ),
  predicate(
    'fr312e.upper_lip.thick',
    'upper_lip',
    '上脣厚',
    '윗입술이 “두껍다(上脣厚)”는 원문 형태 조건',
    false,
    'Use present only when the source predicate 上脣厚 is judged observable.',
    'Use indeterminate when the image is gradable but the upper-lip morphology is borderline or cannot be stably placed as thick versus not thick without a numeric cutoff.',
  ),
  predicate(
    'fr312e.lips_unspecified.thick',
    'lips_unspecified',
    '脣厚',
    '상·하 구분 없이 입술이 “두껍다(脣厚)”는 원문 형태 조건',
    false,
    'Use present only for the source predicate 脣厚 as written. Do not silently replace it with the distinct pair predicate 上下俱厚.',
    'Use indeterminate when the image is gradable but the source-unspecified 脣厚 predicate cannot be stably decided without inventing an upper/lower rule.',
  ),
  predicate(
    'fr312e.lips_unspecified.thin',
    'lips_unspecified',
    '脣薄',
    '상·하 구분 없이 입술이 “얇다(脣薄)”는 원문 형태 조건',
    false,
    'Use present only for the source predicate 脣薄 as normalized from the parallel source wording. Do not silently replace it with the distinct pair predicate 上下俱薄.',
    'Use indeterminate when the image is gradable but the source-unspecified 脣薄 predicate cannot be stably decided without inventing an upper/lower rule.',
  ),
]);

function clause(
  clauseId: string,
  sourceRuleId: string,
  fullHistoricalSourceExpression: string,
  sourceMorphologyFragment: string,
  semanticFragmentHiddenFromAnnotator: string,
  canonicalPredicateId: string,
  neutralComparatorKey: NeutralComparatorKeyFR312E,
  observableFaceRegion: MorphologyPredicateRegionFR312E,
  clauseIndexWithinRule: number,
): MorphologySourceClauseFR312E {
  return Object.freeze({
    clauseId,
    sourceRuleId,
    canonicalSourceRef: SOURCE_REF,
    fullHistoricalSourceExpression,
    sourceMorphologyFragment,
    semanticFragmentHiddenFromAnnotator,
    canonicalPredicateId,
    neutralComparatorKey,
    observableFaceRegion,
    clauseIndexWithinRule,
    annotationSemanticLeakProhibited: true as const,
    metricLeakProhibited: true as const,
    thresholdProhibited: true as const,
    empiricalExecutionAuthorized: false as const,
  });
}

export const FR312E_SOURCE_MORPHOLOGY_CLAUSES:
readonly MorphologySourceClauseFR312E[] = Object.freeze([
  clause(
    'fr312e.clause.philtrum.thin_narrow.1',
    'fr311i.philtrum.thin_narrow',
    '細而狹者，衣食逼迫',
    '細而狹',
    '衣食逼迫',
    'fr312e.philtrum.thin_and_narrow',
    'mouth.philtrum_length_width',
    'philtrum',
    1,
  ),
  clause(
    'fr312e.clause.mouth.small_short.1',
    'fr311i.mouth.small_short',
    '口小而短者貧',
    '口小而短',
    '貧',
    'fr312e.mouth.small_and_short',
    'mouth.width_and_relative_size',
    'mouth_whole',
    1,
  ),
  clause(
    'fr312e.clause.mouth.corners_droop.1',
    'fr311i.mouth.corners_droop_bad_speech',
    '兩角低垂說惡聲',
    '兩角低垂',
    '說惡聲',
    'fr312e.mouth_corner.bilateral_droop',
    'mouth.corner_orientation',
    'mouth_corner',
    1,
  ),
  clause(
    'fr312e.clause.lip.upper_thin.1',
    'fr311i.lip.upper_thin',
    '上脣薄者言語狡詐',
    '上脣薄',
    '言語狡詐',
    'fr312e.upper_lip.thin',
    'mouth.visible_lip_fullness',
    'upper_lip',
    1,
  ),
  clause(
    'fr312e.clause.lip.lower_thin.1',
    'fr311i.lip.lower_thin',
    '下脣薄者，貧賤蹇滯',
    '下脣薄',
    '貧賤蹇滯',
    'fr312e.lower_lip.thin',
    'mouth.visible_lip_fullness',
    'lower_lip',
    1,
  ),
  clause(
    'fr312e.clause.lip.both_thick.1',
    'fr311i.lip.both_thick',
    '上下俱厚者，忠信之人',
    '上下俱厚',
    '忠信之人',
    'fr312e.lips_pair.both_thick',
    'mouth.visible_lip_fullness',
    'lips_pair',
    1,
  ),
  clause(
    'fr312e.clause.lip.both_thin.1',
    'fr311i.lip.both_thin',
    '上下俱薄者，妄語',
    '上下俱薄',
    '妄語',
    'fr312e.lips_pair.both_thin',
    'mouth.visible_lip_fullness',
    'lips_pair',
    1,
  ),
  clause(
    'fr312e.clause.lip.upper_thick_short_life.1',
    'fr311i.lip.upper_thick_short_life',
    '上脣厚，命非久',
    '上脣厚',
    '命非久',
    'fr312e.upper_lip.thick',
    'mouth.visible_lip_fullness',
    'upper_lip',
    1,
  ),
  clause(
    'fr312e.clause.lip.lower_thin_gluttony.1',
    'fr311i.lip.lower_thin_gluttony',
    '下脣薄，主貪食',
    '下脣薄',
    '主貪食',
    'fr312e.lower_lip.thin',
    'mouth.visible_lip_fullness',
    'lower_lip',
    1,
  ),
  clause(
    'fr312e.clause.lip.thick_quiet_thin_litigious.1',
    'fr311i.lip.thick_quiet_thin_litigious',
    '脣厚少語薄多訟',
    '脣厚',
    '少語',
    'fr312e.lips_unspecified.thick',
    'mouth.visible_lip_fullness',
    'lips_unspecified',
    1,
  ),
  clause(
    'fr312e.clause.lip.thick_quiet_thin_litigious.2',
    'fr311i.lip.thick_quiet_thin_litigious',
    '脣厚少語薄多訟',
    '薄',
    '多訟',
    'fr312e.lips_unspecified.thin',
    'mouth.visible_lip_fullness',
    'lips_unspecified',
    2,
  ),
]);

const PREDICATE_BY_ID = new Map(
  FR312E_CANONICAL_MORPHOLOGY_PREDICATES
    .map((item) => [item.predicateId, item] as const),
);

function unique<T>(values: readonly T[]): readonly T[] {
  return Object.freeze([...new Set(values)]);
}

export const FR312E_RULE_OBSERVATION_CONTRACTS:
readonly MorphologyRuleObservationContractFR312E[] = Object.freeze(
  FR312D_MORPHOLOGY_ONLY_PILOT_PROTOCOL.candidateRuleIds.map((ruleId) => {
    const source = FACE_DIRECT_RULE_EVIDENCE_FR311J
      .find((item) => item.ruleId === ruleId);
    const clauses = FR312E_SOURCE_MORPHOLOGY_CLAUSES
      .filter((item) => item.sourceRuleId === ruleId);
    if (source === undefined || clauses.length === 0) {
      throw new Error('fr312e_missing_rule_contract_source:' + ruleId);
    }
    const predicates = clauses.map((item) => {
      const value = PREDICATE_BY_ID.get(item.canonicalPredicateId);
      if (value === undefined) {
        throw new Error(
          'fr312e_unknown_predicate_in_rule_contract:' +
          item.canonicalPredicateId,
        );
      }
      return value;
    });

    return Object.freeze({
      ruleId,
      canonicalSourceRefs: Object.freeze([...source.sourceRefs]),
      fullHistoricalSourceExpression: source.sourceExpression,
      morphologyClauseIds: Object.freeze(clauses.map((item) => item.clauseId)),
      semanticFragmentsHiddenFromAnnotator: Object.freeze(
        clauses.map((item) => item.semanticFragmentHiddenFromAnnotator),
      ),
      neutralComparatorKeys: unique(
        clauses.map((item) => item.neutralComparatorKey),
      ),
      observableFaceRegions: unique(
        clauses.map((item) => item.observableFaceRegion),
      ),
      requiredCaptureState: REQUIRED_CAPTURE_STATE,
      forbiddenCaptureStates: FORBIDDEN_CAPTURE_STATES,
      positiveMorphologyGuidance: Object.freeze(
        predicates.map((item) => item.positiveGuidance),
      ),
      negativeMorphologyGuidance: Object.freeze(
        predicates.map((item) => item.negativeGuidance),
      ),
      indeterminateGuidance: Object.freeze(
        predicates.map((item) => item.indeterminateGuidance),
      ),
      notObservableReasons: FR312E_NOT_OBSERVABLE_REASONS,
      expressionSensitive: predicates.some(
        (item) => item.sensitivity.expressionSensitive,
      ),
      occlusionSensitive: predicates.some(
        (item) => item.sensitivity.occlusionSensitive,
      ),
      poseSensitive: predicates.some(
        (item) => item.sensitivity.poseSensitive,
      ),
      framingSensitive: predicates.some(
        (item) => item.sensitivity.framingSensitive,
      ),
      imageQualitySensitive: predicates.some(
        (item) => item.sensitivity.imageQualitySensitive,
      ),
      annotationSemanticLeakProhibited: true as const,
      metricLeakProhibited: true as const,
      thresholdProhibited: true as const,
      empiricalExecutionAuthorized: false as const,
    });
  }),
);

export const FR312E_ANNOTATION_LABELS:
readonly MorphologyAnnotationLabelFR312E[] = Object.freeze([
  'present',
  'absent',
  'indeterminate',
  'not_observable',
] as const);

export const FR312E_ANNOTATOR_CARDS:
readonly MorphologyAnnotatorCardFR312E[] = Object.freeze(
  FR312E_CANONICAL_MORPHOLOGY_PREDICATES.map((item) => Object.freeze({
    predicateId: item.predicateId,
    morphologyFragment: item.morphologyFragment,
    neutralAnnotationGloss: item.neutralAnnotationGloss,
    labels: FR312E_ANNOTATION_LABELS,
    positiveGuidance: item.positiveGuidance,
    negativeGuidance: item.negativeGuidance,
    indeterminateGuidance: item.indeterminateGuidance,
    notObservableGuidance: item.notObservableGuidance,
    notObservableReasons: FR312E_NOT_OBSERVABLE_REASONS,
  })),
);

export const FR312E_ANNOTATION_CONTRACT = Object.freeze({
  candidateRuleCount: 10 as const,
  sourceClauseCount: 11 as const,
  canonicalPredicateCount: 10 as const,
  ruleObservationContractCount: 10 as const,
  labels: FR312E_ANNOTATION_LABELS,
  annotationUnit:
    'single_image_single_canonical_morphology_predicate' as const,
  semanticClaimVisibleToAnnotator: false as const,
  neutralMetricVisibleToAnnotator: false as const,
  comparatorCalculationVisibleToAnnotator: false as const,
  modelPredictionVisibleToAnnotator: false as const,
  existingTraditionalClassificationVisibleToAnnotator: false as const,
  productResultVisibleToAnnotator: false as const,
  otherAnnotatorAnswerVisibleToAnnotator: false as const,
  thresholdCandidateVisibleToAnnotator: false as const,
  numericThresholdAuthorized: false as const,
  empiricalExecutionAuthorized: false as const,
  automaticTraditionalBindingAuthorized: false as const,
});

export const FR312E_AUTHORITY_BOUNDARY = Object.freeze({
  empiricalExecutionAuthorized: false as const,
  semanticClaimValidationAuthorized: false as const,
  thresholdDiscoveryAuthorized: false as const,
  thresholdValueAuthorized: false as const,
  partitionRatioAuthorized: false as const,
  participantSamplingRuleAuthorized: false as const,
  minimumAcceptanceValueAuthorized: false as const,
  automaticTraditionalBindingAuthorized: false as const,
  providerLandmarkDirectBindingAuthorized: false as const,
  populationNormAuthorized: false as const,
  scoreAuthorized: false as const,
  rankAuthorized: false as const,
  productInterpretationAuthorized: false as const,
  modernScientificFactAuthorized: false as const,
  modernPsychologyFactAuthorized: false as const,
  healthDiagnosisAuthorized: false as const,
  lifespanPredictionAuthorized: false as const,
  mortalityPredictionAuthorized: false as const,
  intelligenceInferenceAuthorized: false as const,
  abilityInferenceAuthorized: false as const,
  sexualityInferenceAuthorized: false as const,
  moralityInferenceAuthorized: false as const,
  criminalityInferenceAuthorized: false as const,
});

export function assertMorphologyOnlyAnnotationSpecFR312E(): void {
  const pilotIds = [
    ...FR312D_MORPHOLOGY_ONLY_PILOT_PROTOCOL.candidateRuleIds,
  ].sort();
  const clauseRuleIds = [
    ...new Set(
      FR312E_SOURCE_MORPHOLOGY_CLAUSES.map((item) => item.sourceRuleId),
    ),
  ].sort();
  const contractRuleIds = FR312E_RULE_OBSERVATION_CONTRACTS
    .map((item) => item.ruleId)
    .sort();

  if (
    pilotIds.length !== 10 ||
    clauseRuleIds.length !== 10 ||
    contractRuleIds.length !== 10 ||
    JSON.stringify(pilotIds) !== JSON.stringify(clauseRuleIds) ||
    JSON.stringify(pilotIds) !== JSON.stringify(contractRuleIds)
  ) {
    throw new Error('fr312e_pilot_rule_coverage_drift');
  }

  if (
    FR312E_SOURCE_MORPHOLOGY_CLAUSES.length !== 11 ||
    FR312E_CANONICAL_MORPHOLOGY_PREDICATES.length !== 10 ||
    FR312E_ANNOTATOR_CARDS.length !== 10
  ) {
    throw new Error('fr312e_clause_predicate_or_card_count_drift');
  }

  const predicateIds = FR312E_CANONICAL_MORPHOLOGY_PREDICATES
    .map((item) => item.predicateId);
  if (new Set(predicateIds).size !== predicateIds.length) {
    throw new Error('fr312e_duplicate_canonical_predicate');
  }
  const predicateSet = new Set(predicateIds);

  const sourceByRule = new Map(
    FACE_DIRECT_RULE_EVIDENCE_FR311J
      .map((item) => [item.ruleId, item] as const),
  );
  const admissionByRule = new Map(
    FR312D_LEGACY_ADMISSION
      .filter((item) => item.morphologyOnlyPilotEligible)
      .map((item) => [item.targetId, item] as const),
  );

  for (const sourceClause of FR312E_SOURCE_MORPHOLOGY_CLAUSES) {
    const source = sourceByRule.get(sourceClause.sourceRuleId);
    const admission = admissionByRule.get(sourceClause.sourceRuleId);
    if (source === undefined || admission === undefined) {
      throw new Error(
        'fr312e_missing_source_or_admission:' + sourceClause.sourceRuleId,
      );
    }
    if (
      source.sourceExpression !== sourceClause.fullHistoricalSourceExpression ||
      !source.sourceRefs.includes(sourceClause.canonicalSourceRef) ||
      !source.sourceExpression.includes(sourceClause.sourceMorphologyFragment) ||
      !source.sourceExpression.includes(
        sourceClause.semanticFragmentHiddenFromAnnotator,
      )
    ) {
      throw new Error(
        'fr312e_source_clause_provenance_drift:' + sourceClause.clauseId,
      );
    }
    if (
      !admission.candidateNeutralFeatureKeys.includes(
        sourceClause.neutralComparatorKey,
      )
    ) {
      throw new Error(
        'fr312e_comparator_not_in_fr312d_admission:' + sourceClause.clauseId,
      );
    }
    if (!predicateSet.has(sourceClause.canonicalPredicateId)) {
      throw new Error(
        'fr312e_unknown_canonical_predicate:' +
        sourceClause.canonicalPredicateId,
      );
    }
    if (
      sourceClause.annotationSemanticLeakProhibited !== true ||
      sourceClause.metricLeakProhibited !== true ||
      sourceClause.thresholdProhibited !== true ||
      sourceClause.empiricalExecutionAuthorized !== false
    ) {
      throw new Error(
        'fr312e_source_clause_authority_drift:' + sourceClause.clauseId,
      );
    }
  }

  const lowerThinClauses = FR312E_SOURCE_MORPHOLOGY_CLAUSES
    .filter((item) => item.sourceMorphologyFragment === '下脣薄');
  if (
    lowerThinClauses.length !== 2 ||
    new Set(
      lowerThinClauses.map((item) => item.canonicalPredicateId),
    ).size !== 1
  ) {
    throw new Error('fr312e_lower_lip_thin_deduplication_drift');
  }

  const contrastClauses = FR312E_SOURCE_MORPHOLOGY_CLAUSES
    .filter((item) =>
      item.sourceRuleId === 'fr311i.lip.thick_quiet_thin_litigious');
  if (
    contrastClauses.length !== 2 ||
    contrastClauses
      .map((item) => item.sourceMorphologyFragment)
      .sort()
      .join('|') !== ['脣厚', '薄'].sort().join('|')
  ) {
    throw new Error('fr312e_contrast_rule_clause_split_drift');
  }

  for (const item of FR312E_CANONICAL_MORPHOLOGY_PREDICATES) {
    if (
      item.requiredCaptureState.length === 0 ||
      item.forbiddenCaptureStates.length === 0 ||
      item.positiveGuidance.trim().length === 0 ||
      item.negativeGuidance.trim().length === 0 ||
      item.indeterminateGuidance.trim().length === 0 ||
      item.notObservableGuidance.trim().length === 0 ||
      item.annotationSemanticLeakProhibited !== true ||
      item.metricLeakProhibited !== true ||
      item.thresholdProhibited !== true ||
      item.empiricalExecutionAuthorized !== false ||
      item.automaticLabelAuthorized !== false
    ) {
      throw new Error(
        'fr312e_incomplete_or_widened_predicate:' + item.predicateId,
      );
    }
  }

  if (
    JSON.stringify(FR312E_ANNOTATION_LABELS) !==
      JSON.stringify(['present', 'absent', 'indeterminate', 'not_observable']) ||
    FR312E_ANNOTATION_CONTRACT.candidateRuleCount !== 10 ||
    FR312E_ANNOTATION_CONTRACT.sourceClauseCount !== 11 ||
    FR312E_ANNOTATION_CONTRACT.canonicalPredicateCount !== 10 ||
    FR312E_ANNOTATION_CONTRACT.ruleObservationContractCount !== 10
  ) {
    throw new Error('fr312e_annotation_contract_drift');
  }

  for (const card of FR312E_ANNOTATOR_CARDS) {
    const raw = card as unknown as Record<string, unknown>;
    for (const forbidden of [
      'fullHistoricalSourceExpression',
      'semanticFragmentHiddenFromAnnotator',
      'neutralComparatorKey',
      'modelPrediction',
      'productResult',
      'thresholdCandidate',
    ]) {
      if (forbidden in raw) {
        throw new Error(
          'fr312e_annotator_card_leak:' + card.predicateId + ':' + forbidden,
        );
      }
    }
  }

  for (const [key, value] of Object.entries(FR312E_AUTHORITY_BOUNDARY)) {
    if (value !== false) {
      throw new Error('fr312e_global_authority_widening:' + key);
    }
  }
}
