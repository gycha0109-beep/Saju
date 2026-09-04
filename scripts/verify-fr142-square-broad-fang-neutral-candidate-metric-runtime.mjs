import fs from 'node:fs';

const sourcePath =
  'packages/face-reading/src/five-officers-square-broad-fang-neutral-candidate-metric-runtime-fr142.ts';
const notePath =
  'research/face-reading/fr142-square-broad-fang-neutral-candidate-metric-runtime.md';
const workflowPath =
  '.github/workflows/fr142-square-broad-fang-neutral-candidate-metric-runtime-ci.yml';

const source = fs.readFileSync(sourcePath, 'utf8');
const note = fs.readFileSync(notePath, 'utf8');
const workflow = fs.readFileSync(workflowPath, 'utf8');

const requiredSourceFragments = [
  "'neutral.mouth.contour_set.horizontal_reflection_nearest_set_residual_ratio'",
  "'neutral.mouth.contour_set.orthogonal_edge_orientation_concentration'",
  "'neutral.mouth.contour_set.turning_angle_concentration_index'",
  "'structural_regularity_and_alignment'",
  "'rectilinear_segment_persistence_continuous_surrogate'",
  "'localized_corner_distinctness_supporting_later_commentary'",
  'cycleStartInvariant: true',
  'cycleDirectionInvariant: true',
  'providerComponentOrderInvariant: true',
  'outerInnerAnatomicalRoleRequired: false',
  'providerVertexIdentityRequired: false',
  'namedMouthCornerRequired: false',
  'numericClassificationThreshold: null',
  'traditionalCriterionBindingRef: null',
  'calibrationRef: null',
  'arbitraryMetricCutoffIntroduced: false',
  'arbitraryFourCornerVertexSelectionIntroduced: false',
  'providerIndexSemanticUseIntroduced: false',
  'outerInnerRoleAssignmentIntroduced: false',
  'sourceLineageConflictPreserved: true',
  'fangEqualsSiziKouEstablished: false',
  'fourCornerFangLengIsPrimaryTargetDefinition: false',
  'humanSemanticCollectionAuthorized: false',
  'newNeutralMetricDefinitionsIssued: 3',
  'newNeutralMetricValuesIssued: 3',
  'traditionalMetricBindingsIssued: 0',
  'calibrationProtocolsIssued: 0',
  'thresholdsIssued: 0',
  'criterionStatesIssued: 0',
  'structuredClaimsIssued: 0',
  'boundedNarrativesIssued: 0',
  'traditionalSemanticAuthority: false',
  'horizontalReflectionResidualMeansTraditionalFang: false',
  'orthogonalOrientationConcentrationMeansTraditionalFang: false',
  'turningConcentrationMeansTraditionalFang: false',
  'localizedDirectionChangeMeansNamedTraditionalMouthCorner: false',
  'continuousCandidateMetricMeansConstructValidity: false',
];

for (const fragment of requiredSourceFragments) {
  if (!source.includes(fragment)) {
    throw new Error(`FR142 verifier: required source fragment missing: ${fragment}`);
  }
}

const forbiddenSourceFragments = [
  'providerVertexIdentityRequired: true',
  'namedMouthCornerRequired: true',
  'outerInnerAnatomicalRoleRequired: true',
  'arbitraryMetricCutoffIntroduced: true',
  'arbitraryFourCornerVertexSelectionIntroduced: true',
  'providerIndexSemanticUseIntroduced: true',
  'outerInnerRoleAssignmentIntroduced: true',
  'fangEqualsSiziKouEstablished: true',
  'fourCornerFangLengIsPrimaryTargetDefinition: true',
  'humanSemanticCollectionAuthorized: true',
  'traditionalMetricBindingsIssued: 1',
  'calibrationProtocolsIssued: 1',
  'thresholdsIssued: 1',
  'criterionStatesIssued: 1',
  'structuredClaimsIssued: 1',
  'boundedNarrativesIssued: 1',
  'traditionalSemanticAuthority: true',
  'horizontalReflectionResidualMeansTraditionalFang: true',
  'orthogonalOrientationConcentrationMeansTraditionalFang: true',
  'turningConcentrationMeansTraditionalFang: true',
  'continuousCandidateMetricMeansConstructValidity: true',
];

for (const fragment of forbiddenSourceFragments) {
  if (source.includes(fragment)) {
    throw new Error(`FR142 verifier: forbidden authority shortcut present: ${fragment}`);
  }
}

const requiredNoteFragments = [
  'It does not declare that any candidate is `方`.',
  'cyclic starting-point rotation',
  'cycle traversal reversal',
  'swapping the two contour components',
  'geometric upper/lower correspondence != anatomical upper/lower lip assignment != traditional 方',
  'high orthogonal concentration != 方',
  'does **not** select four vertices',
  'newNeutralMetricDefinitionsIssued = 3',
  'traditionalMetricBindingsIssued = 0',
  'thresholdsIssued = 0',
  'traditionalSemanticAuthority = false',
  'square_broad_fang_neutral_candidate_metric_repeatability_and_synthetic_geometry_discrimination_without_traditional_binding',
];

for (const fragment of requiredNoteFragments) {
  if (!note.includes(fragment)) {
    throw new Error(`FR142 verifier: required research-note boundary missing: ${fragment}`);
  }
}

const forbiddenNoteFragments = [
  'traditionalMetricBindingsIssued = 1',
  'thresholdsIssued = 1',
  'traditionalSemanticAuthority = true',
  'humanSemanticCollectionAuthorized = true',
];

for (const fragment of forbiddenNoteFragments) {
  if (note.includes(fragment)) {
    throw new Error(`FR142 verifier: forbidden research-note authority shortcut present: ${fragment}`);
  }
}

if (!workflow.includes('FR142 Square Broad Fang Neutral Candidate Metric Runtime CI')) {
  throw new Error('FR142 verifier: dedicated workflow identity missing.');
}
