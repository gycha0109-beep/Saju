import fs from 'node:fs';

const sourcePath =
  'packages/face-reading/src/five-officers-square-broad-fang-source-lineage-construct-refinement-fr141.ts';
const notePath =
  'research/face-reading/fr141-square-broad-fang-source-lineage-construct-refinement.md';
const workflowPath =
  '.github/workflows/fr141-square-broad-fang-source-lineage-construct-refinement-ci.yml';

const source = fs.readFileSync(sourcePath, 'utf8');
const note = fs.readFileSync(notePath, 'utf8');
const workflow = fs.readFileSync(workflowPath, 'utf8');

const requiredSourceFragments = [
  "'criterion.intake.square_broad'",
  "'方大'",
  "'fang_shape_candidate_features_only'",
  "'passage.shenxiang.five_officers.intake.nlc_1925'",
  'shenxiangNamedMouthTaxonomySeparatesSiziKouAndFangKou: true',
  'gujinCompilationPreservesSeparateSiziKouAndFangKouEntries: true',
  'gongduLaterCommentaryEquatesFangKouWithAncientSiziKou: true',
  'gongduLaterCommentaryDescribesUpperAndLowerFourCornersWithFangLeng: true',
  'gongduLaterCommentaryListsKuoDaSeparatelyAfterFangKou: true',
  'taxonomyConflictPresent: true',
  'fangEqualsSiziKouEstablished: false',
  'fourCornerFangLengIsPrimaryTargetDefinition: false',
  'fangMeansLiteralSquareBoundingBoxEstablished: false',
  "'structural_regularity_and_alignment'",
  "'rectilinear_segment_persistence'",
  "'localized_corner_distinctness_supporting_later_commentary'",
  'directAspectRatioProxyForFangAuthorized: false',
  'directMouthWidthProxyForFangAuthorized: false',
  "'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0'",
  "'neutral.mouth.contour_set.closed_cycle_axis_alignment_mean@0.1.0'",
  "'neutral.mouth.contour_set.closed_cycle_mean_absolute_turning_angle@0.1.0'",
  "'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0'",
  'sourceGroundedCandidateMetricFamilyImplemented: false',
  'reviewerActorAssignmentDeferred: true',
  'humanSemanticCollectionAuthorized: false',
  'empiricalSemanticEvidenceAcquisitionAuthorized: false',
  'newNeutralMetricDefinitionsIssued: 0',
  'traditionalMetricBindingsIssued: 0',
  'thresholdsIssued: 0',
  'criterionStatesIssued: 0',
  'structuredClaimsIssued: 0',
  'boundedNarrativesIssued: 0',
  'traditionalSemanticAuthority: false',
];

for (const fragment of requiredSourceFragments) {
  if (!source.includes(fragment)) {
    throw new Error(`FR141 verifier: required source fragment missing: ${fragment}`);
  }
}

const forbiddenSourceFragments = [
  'externalResearchSourcesAreAuthorityRegistryEntries: true',
  'externalResearchSourcesAutomaticallyAmendReviewedMethodology: true',
  'modernInternetIllustrationsAreGroundTruthLabels: true',
  'laterCommentaryMayOverridePrimaryTargetPassage: true',
  'fangEqualsSiziKouEstablished: true',
  'fourCornerFangLengIsPrimaryTargetDefinition: true',
  'fangMeansLiteralSquareBoundingBoxEstablished: true',
  'directAspectRatioProxyForFangAuthorized: true',
  'directMouthWidthProxyForFangAuthorized: true',
  'sourceGroundedCandidateMetricFamilyImplemented: true',
  'reviewerActorAssignmentDeferred: false',
  'collectionAuthorizationPresent: true',
  'humanSemanticCollectionAuthorized: true',
  'empiricalSemanticEvidenceAcquisitionAuthorized: true',
  'traditionalMetricBindingsIssued: 1',
  'calibrationProtocolsIssued: 1',
  'thresholdsIssued: 1',
  'criterionStatesIssued: 1',
  'structuredClaimsIssued: 1',
  'boundedNarrativesIssued: 1',
  'traditionalSemanticAuthority: true',
];

for (const fragment of forbiddenSourceFragments) {
  if (source.includes(fragment)) {
    throw new Error(`FR141 verifier: forbidden authority shortcut present: ${fragment}`);
  }
}

const requiredNoteFragments = [
  'FR141 does **not** append new source refs to the Face Authority Registry',
  '四字口 and 方口 are separate named entries',
  '方口者。即古之四字口也。上下四角有方棱。',
  'taxonomy conflict',
  'modern Internet illustration != ground-truth label != traditional authority',
  '方 == bounding-box square aspect ratio',
  'structural_regularity_and_alignment',
  'rectilinear_segment_persistence',
  'localized_corner_distinctness_supporting_later_commentary',
  'humanSemanticCollectionAuthorized = false',
  'Production remains fail-closed',
  'square_broad_fang_source_grounded_neutral_candidate_metric_design_and_runtime_without_traditional_binding',
];

for (const fragment of requiredNoteFragments) {
  if (!note.includes(fragment)) {
    throw new Error(`FR141 verifier: research-note boundary missing: ${fragment}`);
  }
}

const forbiddenNoteFragments = [
  '四字口 == 方口',
  'modern Internet illustration = ground-truth label',
  'humanSemanticCollectionAuthorized = true',
  'traditionalSemanticAuthority = true',
];

for (const fragment of forbiddenNoteFragments) {
  if (note.includes(fragment)) {
    throw new Error(`FR141 verifier: forbidden research-note shortcut present: ${fragment}`);
  }
}

if (!workflow.includes('FR141 Square Broad Fang Source Lineage Construct Refinement CI')) {
  throw new Error('FR141 verifier: dedicated workflow identity missing.');
}
