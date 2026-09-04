import process from 'node:process';

const {
  getSquareBroadNeutralShapeMetricDefinitionsFR134,
} = await import('../.face-reading-dist/five-officers-square-broad-neutral-shape-metric-runtime-fr134.js');
const {
  assessSquareBroadImageMeasurementConstructDesignFR133,
  assertIssuedSquareBroadImageMeasurementConstructDesignFR133,
} = await import('../.face-reading-dist/five-officers-square-broad-image-measurement-construct-design-fr133.js');

const predecessor = assessSquareBroadImageMeasurementConstructDesignFR133();
assertIssuedSquareBroadImageMeasurementConstructDesignFR133(predecessor);
const definitions = getSquareBroadNeutralShapeMetricDefinitionsFR134();
const [axis, turn] = definitions;

if (
  predecessor.authorityState !== 'square_broad_image_measurement_constructs_decomposed_partial_neutral_observability_no_traditional_binding' ||
  predecessor.nextFrontier !== 'square_broad_neutral_shape_metric_implementation_and_construct_validity_dataset_design' ||
  predecessor.findings.fangRoleInvariantCycleOrientationCandidateDerivable !== true ||
  predecessor.findings.fangRoleInvariantTurningAngleCandidateDerivable !== true ||
  predecessor.findings.fangExternalOutlineSquarenessCurrentlyGoverned !== false ||
  predecessor.findings.traditionalSquareBroadConstructValidityEstablished !== false ||
  predecessor.findings.squareBroadCriterionMachineMeasurableUnderCurrentAuthority !== false ||
  predecessor.predecessor.targetSpecificApprovalExplicitlyDeferred !== true ||
  predecessor.execution.traditionalMetricBindingsIssued !== 0 ||
  predecessor.execution.calibrationProtocolsIssued !== 0 ||
  predecessor.execution.thresholdsIssued !== 0 ||
  predecessor.execution.criterionStatesIssued !== 0 ||
  definitions.length !== 2 ||
  axis?.metricRef !== 'neutral.mouth.contour_set.closed_cycle_axis_alignment_mean@0.1.0' ||
  axis.unit !== 'ratio' ||
  axis.outerInnerAnatomicalRoleRequired !== false ||
  axis.providerComponentOrderRequired !== false ||
  axis.traditionalCriterionBindingRef !== null ||
  axis.calibrationRef !== null ||
  !axis.interpretationBoundary.includes('no_external_outline_or_traditional_fang_classification') ||
  turn?.metricRef !== 'neutral.mouth.contour_set.closed_cycle_mean_absolute_turning_angle@0.1.0' ||
  turn.unit !== 'radian' ||
  turn.outerInnerAnatomicalRoleRequired !== false ||
  turn.providerComponentOrderRequired !== false ||
  turn.traditionalCriterionBindingRef !== null ||
  turn.calibrationRef !== null ||
  !turn.interpretationBoundary.includes('no_named_corners_or_traditional_fang_classification')
) throw new Error('FR134 exact predecessor or neutral metric-definition boundary drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR134_SQUARE_BROAD_NEUTRAL_SHAPE_METRIC_RUNTIME_PASS',
  predecessor: predecessor.authorityState,
  neutralMetricDefinitionsIssued: definitions.length,
  traditionalBindingAuthorized: false,
  calibrationAuthorized: false,
  thresholdAuthorized: false,
  criterionStateAuthorized: false,
  nextFrontier: 'square_broad_construct_validity_annotation_governance_and_dataset_acquisition',
})}\n`);
