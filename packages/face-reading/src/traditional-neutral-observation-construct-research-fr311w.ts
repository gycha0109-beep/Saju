import {
  FR282_RGB_SELFIE_FEATURE_ENTRIES,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  STATIC_MISSING_REGION_DIRECT_RULES_FR311R,
} from './traditional-static-missing-region-semantics-fr311r.js';
import {
  FR311V_RULE_AUDIT,
} from './traditional-expanded-static-observation-gap-audit-fr311v.js';

export type NeutralConstructStatusFR311W =
  | 'registered_feature_reuse'
  | 'registered_feature_not_materialized'
  | 'new_neutral_surface_definition'
  | 'outside_v1_static_geometry_scope'
  | 'ordinary_rgb_proxy_not_authorized';

export type NeutralConstructMethodFR311W =
  | '2d_geometry'
  | 'contour_or_segmentation'
  | 'relative_3d_shape'
  | 'appearance'
  | 'not_applicable';

export interface NeutralConstructDefinitionFR311W {
  readonly constructKey: string;
  readonly status: NeutralConstructStatusFR311W;
  readonly method: NeutralConstructMethodFR311W;
  readonly neutralDefinition: string;
  readonly sourceRefs: readonly string[];
  readonly traditionalSemanticNameForbidden: true;
  readonly boneClaimForbidden: true;
  readonly thresholdAuthorized: false;
  readonly populationNormAuthorized: false;
  readonly traditionalBindingAuthorized: false;
  readonly productionActivated: false;
}

export type TargetConstructResolutionFR311W =
  | 'components_defined_extractor_research_required'
  | 'components_defined_registered_surface_not_materialized'
  | 'components_defined_existing_geometry_only'
  | 'partial_geometry_only_out_of_scope_component'
  | 'ordinary_rgb_skeletal_proxy_rejected';

export interface TargetConstructResearchFR311W {
  readonly targetId: string;
  readonly sourceExpression: string;
  readonly resolution: TargetConstructResolutionFR311W;
  readonly registeredFeatureKeys: readonly string[];
  readonly proposedConstructKeys: readonly string[];
  readonly blockedComponentKeys: readonly string[];
  readonly compoundConstruct: boolean;
  readonly automaticSynthesisAuthorized: false;
  readonly sourceToVisibleEquivalenceEstablished: false;
  readonly empiricalValidationEligible: false;
  readonly extractorImplementationAuthorizedByThisStudy: false;
  readonly automaticTraditionalBindingAuthorized: false;
  readonly metricThresholdAuthorized: false;
  readonly populationNormAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

const REF_FR282 =
  'packages/face-reading/src/rgb-selfie-feature-authority-matrix-fr282.ts';
const REF_FR293 =
  'packages/face-reading/src/rgb-selfie-product-column-map-fr293.ts';
const REF_FR207 =
  'packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts';
const REF_HAIRLINE =
  'packages/face-reading/src/visible-hairline-model-admission-review-fr313.ts';
const REF_CHEEK_WIDTH =
  'packages/face-reading/src/visible-midface-band-fr211.ts';
const REF_CHEEK_CONTOUR =
  'packages/face-reading/src/visible-cheek-contour-prominence-fr217.ts';
const REF_LOWER_WIDTH =
  'packages/face-reading/src/visible-lower-face-width-fr213.ts';
const REF_LOWER_CONTOUR =
  'packages/face-reading/src/canonical-visible-lower-face-contour-fr216.ts';
const REF_CHIN =
  'packages/face-reading/src/central-chin-reference-trace-protocol-fr54.ts';

function construct(
  constructKey: string,
  status: NeutralConstructStatusFR311W,
  method: NeutralConstructMethodFR311W,
  neutralDefinition: string,
  sourceRefs: readonly string[],
): NeutralConstructDefinitionFR311W {
  return Object.freeze({
    constructKey,
    status,
    method,
    neutralDefinition,
    sourceRefs: Object.freeze([...sourceRefs]),
    traditionalSemanticNameForbidden: true as const,
    boneClaimForbidden: true as const,
    thresholdAuthorized: false as const,
    populationNormAuthorized: false as const,
    traditionalBindingAuthorized: false as const,
    productionActivated: false as const,
  });
}

export const FR311W_NEUTRAL_CONSTRUCT_CATALOG:
readonly NeutralConstructDefinitionFR311W[] = Object.freeze([
  construct(
    'forehead.visible_width_shape',
    'registered_feature_not_materialized',
    'contour_or_segmentation',
    'Visible forehead horizontal extent and planform shape within an admitted visible hair/skin boundary; not an anatomical forehead boundary.',
    [REF_FR282, REF_FR293, REF_FR207],
  ),
  construct(
    'forehead.visible_hairline_boundary',
    'registered_feature_not_materialized',
    'contour_or_segmentation',
    'Visible hair-skin boundary only when directly visible; hidden or occluded boundary completion is forbidden.',
    [REF_FR282, REF_FR293, REF_HAIRLINE],
  ),
  construct(
    'forehead.relative_surface_curvature',
    'registered_feature_not_materialized',
    'relative_3d_shape',
    'Relative visible forehead surface shape from ordinary RGB only after a separately benchmarked relative-shape method; no millimeter depth or skull claim.',
    [REF_FR282, REF_FR293],
  ),
  construct(
    'cheek_midface.visible_width_ratio',
    'registered_feature_reuse',
    '2d_geometry',
    'Visible mid-face band width ratio; explicitly not skeletal bizygomatic breadth.',
    [REF_FR282, REF_FR293, REF_CHEEK_WIDTH],
  ),
  construct(
    'cheek_midface.visible_contour_prominence',
    'registered_feature_reuse',
    '2d_geometry',
    'Visible side-contour prominence of the mid-face; explicitly not zygomatic-bone projection.',
    [REF_FR282, REF_FR293, REF_CHEEK_CONTOUR],
  ),
  construct(
    'cheek_midface.relative_3d_prominence',
    'registered_feature_not_materialized',
    'relative_3d_shape',
    'Relative visible mid-face projection from RGB after benchmark; no physical skeletal prominence claim.',
    [REF_FR282, REF_FR293],
  ),
  construct(
    'chin_lower_face.visible_width_ratio',
    'registered_feature_reuse',
    '2d_geometry',
    'Visible soft-tissue lower-face width ratio; explicitly not mandibular bone width.',
    [REF_FR282, REF_FR293, REF_LOWER_WIDTH],
  ),
  construct(
    'chin_lower_face.visible_contour',
    'registered_feature_reuse',
    'contour_or_segmentation',
    'Canonical visible soft-tissue lower-face contour; no mandibular bone-boundary claim.',
    [REF_FR282, REF_FR293, REF_LOWER_CONTOUR],
  ),
  construct(
    'chin_lower_face.chin_height_width_center_deviation',
    'registered_feature_reuse',
    '2d_geometry',
    'Visible chin height/width/center-deviation axes using governed visible references; not a skeletal chin classifier.',
    [REF_FR282, REF_FR293, REF_CHIN],
  ),
  construct(
    'chin_lower_face.relative_projection',
    'registered_feature_not_materialized',
    'relative_3d_shape',
    'Relative visible lower-face projection from RGB after benchmark; not physical tissue thickness or mandibular depth.',
    [REF_FR282, REF_FR293],
  ),

  construct(
    'neutral.forehead.visible_height_to_width_ratio',
    'new_neutral_surface_definition',
    '2d_geometry',
    'Ratio of admitted visible forehead vertical extent to admitted visible forehead horizontal extent in a canonical frontal frame.',
    [REF_FR207, REF_HAIRLINE],
  ),
  construct(
    'neutral.forehead.visible_outline_rectilinearity',
    'new_neutral_surface_definition',
    'contour_or_segmentation',
    'Role-free deviation of the admitted visible forehead outline from locally straight segments; no square-category threshold.',
    [REF_FR207, REF_HAIRLINE],
  ),
  construct(
    'neutral.forehead.visible_hairline_path_irregularity',
    'new_neutral_surface_definition',
    'contour_or_segmentation',
    'Normalized geometric irregularity of a directly visible admitted hair-skin boundary path; no reconstruction of occluded hairline.',
    [REF_HAIRLINE],
  ),
  construct(
    'neutral.forehead.visible_hair_coverage_vertical_fraction',
    'new_neutral_surface_definition',
    'contour_or_segmentation',
    'Fraction of the visible forehead vertical span occupied by directly visible descending hair coverage in the canonical frame.',
    [REF_FR207, REF_HAIRLINE],
  ),
  construct(
    'neutral.forehead.visible_local_depression_profile',
    'new_neutral_surface_definition',
    'relative_3d_shape',
    'Relative local surface-deviation profile within the visible forehead after a validated RGB relative-shape benchmark; no bone-defect claim.',
    [REF_FR282, REF_FR207],
  ),

  construct(
    'neutral.whole_face.visible_height_to_width_ratio',
    'new_neutral_surface_definition',
    '2d_geometry',
    'Visible face-outline vertical extent divided by visible face-outline horizontal extent under the governed frontal capture frame.',
    [REF_FR207],
  ),
  construct(
    'neutral.whole_face.visible_outline_rectilinearity',
    'new_neutral_surface_definition',
    'contour_or_segmentation',
    'Role-free geometric straight-segment tendency of the visible face outline; no traditional square-face classification.',
    [REF_FR207],
  ),
  construct(
    'neutral.whole_face.upper_lower_taper_profile',
    'new_neutral_surface_definition',
    '2d_geometry',
    'Continuous width profile across upper, middle and lower visible face bands describing taper without assigning a named shape.',
    [REF_FR207],
  ),
  construct(
    'neutral.whole_face.visible_width_profile',
    'new_neutral_surface_definition',
    '2d_geometry',
    'Continuous normalized visible face width sampled across governed vertical positions; no traditional region semantics.',
    [REF_FR207],
  ),

  construct(
    'neutral.cheek_midface.visible_vertical_position_ratio',
    'new_neutral_surface_definition',
    '2d_geometry',
    'Vertical location of maximum admitted visible mid-face contour prominence relative to the governed visible face height.',
    [REF_CHEEK_CONTOUR, REF_FR207],
  ),
  construct(
    'neutral.cheek_midface.bilateral_orientation_difference',
    'new_neutral_surface_definition',
    '2d_geometry',
    'Unsigned left-right difference in local visible mid-face contour orientation; no anatomical cheekbone tilt claim.',
    [REF_CHEEK_CONTOUR],
  ),
  construct(
    'neutral.cheek_midface.bilateral_prominence_balance',
    'new_neutral_surface_definition',
    '2d_geometry',
    'Symmetric comparison of left/right visible mid-face contour-prominence magnitudes; no skeletal-support semantics.',
    [REF_CHEEK_CONTOUR],
  ),

  construct(
    'neutral.chin_lower_face.visible_height_to_width_ratio',
    'new_neutral_surface_definition',
    '2d_geometry',
    'Visible lower-face vertical extent divided by visible lower-face horizontal extent within governed soft-tissue boundaries.',
    [REF_LOWER_WIDTH, REF_LOWER_CONTOUR, REF_CHIN],
  ),
  construct(
    'neutral.chin_lower_face.visible_contour_rectilinearity',
    'new_neutral_surface_definition',
    'contour_or_segmentation',
    'Role-free straight-segment tendency of the visible lower-face contour; no square-jaw or bone-shape classification.',
    [REF_LOWER_CONTOUR],
  ),
  construct(
    'neutral.chin_lower_face.visible_taper_profile',
    'new_neutral_surface_definition',
    '2d_geometry',
    'Continuous lower-face width profile toward the inferior visible chin, expressing taper without a pointedness threshold.',
    [REF_LOWER_WIDTH, REF_LOWER_CONTOUR],
  ),
  construct(
    'neutral.chin_lower_face.visible_fullness_area_ratio',
    'new_neutral_surface_definition',
    '2d_geometry',
    'Visible lower-face enclosed soft-tissue area normalized by squared visible face width; no tissue-thickness or bone-volume claim.',
    [REF_LOWER_CONTOUR, REF_FR207],
  ),

  construct(
    'blocked.static_surface_lustre',
    'outside_v1_static_geometry_scope',
    'appearance',
    'Brightness/lustre wording is preserved as a source component but is outside the V1 static geometry research scope and is not proxied by uncalibrated image luminance.',
    [REF_FR207],
  ),
  construct(
    'blocked.mandibular_or_zygomatic_bone_from_ordinary_rgb',
    'ordinary_rgb_proxy_not_authorized',
    'not_applicable',
    'Ordinary frontal RGB visible soft-tissue geometry is not authorized as a proxy for named mandibular or zygomatic bone morphology.',
    [REF_FR207, REF_FR282],
  ),
]);

const CONSTRUCT_KEYS = new Set(
  FR311W_NEUTRAL_CONSTRUCT_CATALOG.map((item) => item.constructKey),
);

function plan(
  targetId: string,
  resolution: TargetConstructResolutionFR311W,
  registeredFeatureKeys: readonly string[],
  proposedConstructKeys: readonly string[],
  blockedComponentKeys: readonly string[],
  compoundConstruct: boolean,
): TargetConstructResearchFR311W {
  const source = STATIC_MISSING_REGION_DIRECT_RULES_FR311R.find(
    (item) => item.ruleId === targetId,
  );
  if (source === undefined) {
    throw new Error('fr311w_unknown_target:' + targetId);
  }
  return Object.freeze({
    targetId,
    sourceExpression: source.sourceExpression,
    resolution,
    registeredFeatureKeys: Object.freeze([...registeredFeatureKeys]),
    proposedConstructKeys: Object.freeze([...proposedConstructKeys]),
    blockedComponentKeys: Object.freeze([...blockedComponentKeys]),
    compoundConstruct,
    automaticSynthesisAuthorized: false as const,
    sourceToVisibleEquivalenceEstablished: false as const,
    empiricalValidationEligible: false as const,
    extractorImplementationAuthorizedByThisStudy: false as const,
    automaticTraditionalBindingAuthorized: false as const,
    metricThresholdAuthorized: false as const,
    populationNormAuthorized: false as const,
    productInterpretationAuthorized: false as const,
  });
}

export const FR311W_TARGET_CONSTRUCT_RESEARCH:
readonly TargetConstructResearchFR311W[] = Object.freeze([
  plan(
    'fr311r.forehead.raised_broad',
    'components_defined_registered_surface_not_materialized',
    ['forehead.visible_width_shape', 'forehead.relative_surface_curvature'],
    [],
    [],
    true,
  ),
  plan(
    'fr311r.forehead.steep_broad',
    'components_defined_registered_surface_not_materialized',
    ['forehead.visible_width_shape', 'forehead.relative_surface_curvature'],
    [],
    [],
    true,
  ),
  plan(
    'fr311r.forehead.bright_square_long',
    'partial_geometry_only_out_of_scope_component',
    ['forehead.visible_width_shape'],
    [
      'neutral.forehead.visible_height_to_width_ratio',
      'neutral.forehead.visible_outline_rectilinearity',
    ],
    ['blocked.static_surface_lustre'],
    true,
  ),
  plan(
    'fr311r.forehead.small_narrow',
    'components_defined_registered_surface_not_materialized',
    ['forehead.visible_width_shape'],
    [],
    [],
    false,
  ),
  plan(
    'fr311r.forehead.defective_sunken',
    'components_defined_extractor_research_required',
    ['forehead.relative_surface_curvature'],
    ['neutral.forehead.visible_local_depression_profile'],
    [],
    true,
  ),
  plan(
    'fr311r.forehead.narrow_low_hair',
    'components_defined_extractor_research_required',
    ['forehead.visible_width_shape', 'forehead.visible_hairline_boundary'],
    ['neutral.forehead.visible_hair_coverage_vertical_fraction'],
    [],
    true,
  ),
  plan(
    'fr311r.forehead.large_face_square',
    'components_defined_extractor_research_required',
    ['forehead.visible_width_shape'],
    [
      'neutral.whole_face.visible_height_to_width_ratio',
      'neutral.whole_face.visible_outline_rectilinearity',
    ],
    [],
    true,
  ),
  plan(
    'fr311r.forehead.wide_face_broad',
    'components_defined_extractor_research_required',
    ['forehead.visible_width_shape'],
    ['neutral.whole_face.visible_width_profile'],
    [],
    true,
  ),
  plan(
    'fr311r.forehead.hairline_irregular',
    'components_defined_extractor_research_required',
    ['forehead.visible_hairline_boundary'],
    ['neutral.forehead.visible_hairline_path_irregularity'],
    [],
    false,
  ),
  plan(
    'fr311r.forehead.square_raised',
    'components_defined_extractor_research_required',
    ['forehead.visible_width_shape', 'forehead.relative_surface_curvature'],
    ['neutral.forehead.visible_outline_rectilinearity'],
    [],
    true,
  ),

  plan(
    'fr311r.cheekbones.bilateral_support',
    'components_defined_extractor_research_required',
    [
      'cheek_midface.visible_width_ratio',
      'cheek_midface.visible_contour_prominence',
      'cheek_midface.relative_3d_prominence',
    ],
    ['neutral.cheek_midface.bilateral_prominence_balance'],
    ['blocked.mandibular_or_zygomatic_bone_from_ordinary_rgb'],
    true,
  ),
  plan(
    'fr311r.cheekbones.tilted_exposed',
    'components_defined_extractor_research_required',
    [
      'cheek_midface.visible_contour_prominence',
      'cheek_midface.relative_3d_prominence',
    ],
    ['neutral.cheek_midface.bilateral_orientation_difference'],
    [],
    true,
  ),
  plan(
    'fr311r.cheekbones.high_narrow',
    'components_defined_extractor_research_required',
    [
      'cheek_midface.visible_width_ratio',
      'cheek_midface.visible_contour_prominence',
    ],
    ['neutral.cheek_midface.visible_vertical_position_ratio'],
    ['blocked.mandibular_or_zygomatic_bone_from_ordinary_rgb'],
    true,
  ),

  plan(
    'fr311r.lower_face.yi_bone.square_horizontal',
    'ordinary_rgb_skeletal_proxy_rejected',
    ['chin_lower_face.visible_width_ratio', 'chin_lower_face.visible_contour'],
    [],
    ['blocked.mandibular_or_zygomatic_bone_from_ordinary_rgb'],
    true,
  ),
  plan(
    'fr311r.lower_face.han_bone.broad',
    'ordinary_rgb_skeletal_proxy_rejected',
    ['chin_lower_face.visible_width_ratio'],
    [],
    ['blocked.mandibular_or_zygomatic_bone_from_ordinary_rgb'],
    false,
  ),
  plan(
    'fr311r.lower_face.han_bone.sharp',
    'ordinary_rgb_skeletal_proxy_rejected',
    ['chin_lower_face.visible_contour'],
    [],
    ['blocked.mandibular_or_zygomatic_bone_from_ordinary_rgb'],
    false,
  ),

  plan(
    'fr311r.whole_face.upper_lower_pointed_datepit',
    'components_defined_extractor_research_required',
    [],
    ['neutral.whole_face.upper_lower_taper_profile'],
    [],
    false,
  ),
  plan(
    'fr311r.chin.square_broad',
    'components_defined_extractor_research_required',
    [
      'chin_lower_face.visible_width_ratio',
      'chin_lower_face.visible_contour',
      'chin_lower_face.chin_height_width_center_deviation',
    ],
    ['neutral.chin_lower_face.visible_contour_rectilinearity'],
    [],
    true,
  ),
  plan(
    'fr311r.chin.forehead_square_flat',
    'components_defined_extractor_research_required',
    [
      'forehead.visible_width_shape',
      'forehead.relative_surface_curvature',
      'chin_lower_face.visible_contour',
      'chin_lower_face.chin_height_width_center_deviation',
    ],
    [
      'neutral.forehead.visible_outline_rectilinearity',
      'neutral.chin_lower_face.visible_contour_rectilinearity',
    ],
    [],
    true,
  ),
  plan(
    'fr311r.lower_face.flat_full_upright_thick',
    'components_defined_extractor_research_required',
    [
      'chin_lower_face.visible_width_ratio',
      'chin_lower_face.visible_contour',
      'chin_lower_face.chin_height_width_center_deviation',
      'chin_lower_face.relative_projection',
    ],
    ['neutral.chin_lower_face.visible_fullness_area_ratio'],
    [],
    true,
  ),
  plan(
    'fr311r.lower_face.long_narrow_sharp_thin',
    'components_defined_extractor_research_required',
    [
      'chin_lower_face.visible_width_ratio',
      'chin_lower_face.visible_contour',
      'chin_lower_face.chin_height_width_center_deviation',
      'chin_lower_face.relative_projection',
    ],
    [
      'neutral.chin_lower_face.visible_height_to_width_ratio',
      'neutral.chin_lower_face.visible_taper_profile',
    ],
    [],
    true,
  ),
  plan(
    'fr311r.whole_face.long_square',
    'components_defined_extractor_research_required',
    [],
    [
      'neutral.whole_face.visible_height_to_width_ratio',
      'neutral.whole_face.visible_outline_rectilinearity',
    ],
    [],
    true,
  ),
]);

function countResolution(
  value: TargetConstructResolutionFR311W,
): number {
  return FR311W_TARGET_CONSTRUCT_RESEARCH
    .filter((item) => item.resolution === value).length;
}

const PROPOSED_NEW_SURFACE_KEYS_FR311W = Object.freeze(
  FR311W_NEUTRAL_CONSTRUCT_CATALOG
    .filter((item) => item.status === 'new_neutral_surface_definition')
    .map((item) => item.constructKey),
);

export const FR311W_RESEARCH_SUMMARY = Object.freeze({
  targetCount: FR311W_TARGET_CONSTRUCT_RESEARCH.length,
  neutralConstructCatalogSize: FR311W_NEUTRAL_CONSTRUCT_CATALOG.length,
  proposedNewNeutralSurfaceCount: PROPOSED_NEW_SURFACE_KEYS_FR311W.length,
  registeredFeatureReuseCount:
    FR311W_NEUTRAL_CONSTRUCT_CATALOG
      .filter((item) => item.status === 'registered_feature_reuse').length,
  registeredFeatureNotMaterializedCount:
    FR311W_NEUTRAL_CONSTRUCT_CATALOG
      .filter((item) => item.status === 'registered_feature_not_materialized')
      .length,
  outsideStaticGeometryScopeCount:
    FR311W_NEUTRAL_CONSTRUCT_CATALOG
      .filter((item) => item.status === 'outside_v1_static_geometry_scope')
      .length,
  ordinaryRgbProxyNotAuthorizedCount:
    FR311W_NEUTRAL_CONSTRUCT_CATALOG
      .filter((item) => item.status === 'ordinary_rgb_proxy_not_authorized')
      .length,

  registeredSurfaceNotMaterializedTargets:
    countResolution('components_defined_registered_surface_not_materialized'),
  extractorResearchRequiredTargets:
    countResolution('components_defined_extractor_research_required'),
  existingGeometryOnlyTargets:
    countResolution('components_defined_existing_geometry_only'),
  partialGeometryOutOfScopeTargets:
    countResolution('partial_geometry_only_out_of_scope_component'),
  ordinaryRgbSkeletalProxyRejectedTargets:
    countResolution('ordinary_rgb_skeletal_proxy_rejected'),

  empiricalValidationEligibleTargets:
    FR311W_TARGET_CONSTRUCT_RESEARCH
      .filter((item) => item.empiricalValidationEligible).length,
  automaticTraditionalBindingsAuthorized: 0,
  metricThresholdsAuthorized: 0,
  populationNormsAuthorized: 0,
  productInterpretationsAuthorized: 0,
});

export const FR311W_AUTHORITY_BOUNDARY = Object.freeze({
  extractorImplementationAuthorized: false as const,
  sourceToVisibleEquivalenceEstablished: false as const,
  empiricalValidationAuthorized: false as const,
  automaticTraditionalBindingAuthorized: false as const,
  providerLandmarkDirectBindingAuthorized: false as const,
  metricThresholdAuthorized: false as const,
  populationNormAuthorized: false as const,
  multiFeatureSynthesisAuthorized: false as const,
  skeletalProxyFromOrdinaryRgbAuthorized: false as const,
  appearanceScopeExpansionAuthorized: false as const,
  namedFormClassifierAuthorized: false as const,
  productInterpretationAuthorized: false as const,
  modernScientificFactAuthorized: false as const,
});

export function assertNeutralObservationConstructResearchFR311W(): void {
  const expectedTargets = FR311V_RULE_AUDIT
    .filter((item) =>
      item.nextResearchLane === 'neutral_observation_construct_research')
    .map((item) => item.targetId)
    .sort();

  const actualTargets = FR311W_TARGET_CONSTRUCT_RESEARCH
    .map((item) => item.targetId)
    .sort();

  if (
    expectedTargets.length !== 22 ||
    actualTargets.length !== 22 ||
    JSON.stringify(expectedTargets) !== JSON.stringify(actualTargets)
  ) {
    throw new Error('fr311w_target_coverage_drift');
  }

  const catalogKeys = FR311W_NEUTRAL_CONSTRUCT_CATALOG
    .map((item) => item.constructKey);
  if (new Set(catalogKeys).size !== catalogKeys.length) {
    throw new Error('fr311w_duplicate_construct_key');
  }

  const knownRegistered = new Set(
    FR282_RGB_SELFIE_FEATURE_ENTRIES.map((item) => item.featureKey),
  );
  const materialized = new Set(
    FR293_PRODUCT_COLUMN_MAP
      .filter((item) =>
        item.implementationState === 'canonical_extractor_materialized')
      .map((item) => item.featureKey),
  );

  for (const definition of FR311W_NEUTRAL_CONSTRUCT_CATALOG) {
    if (
      definition.neutralDefinition.trim().length === 0 ||
      definition.sourceRefs.length === 0 ||
      definition.traditionalSemanticNameForbidden !== true ||
      definition.boneClaimForbidden !== true ||
      definition.thresholdAuthorized !== false ||
      definition.populationNormAuthorized !== false ||
      definition.traditionalBindingAuthorized !== false ||
      definition.productionActivated !== false
    ) {
      throw new Error('fr311w_invalid_construct:' + definition.constructKey);
    }

    if (
      definition.status === 'registered_feature_reuse' &&
      (
        !knownRegistered.has(definition.constructKey) ||
        !materialized.has(definition.constructKey)
      )
    ) {
      throw new Error(
        'fr311w_registered_reuse_not_materialized:' +
        definition.constructKey,
      );
    }

    if (
      definition.status === 'registered_feature_not_materialized' &&
      (
        !knownRegistered.has(definition.constructKey) ||
        materialized.has(definition.constructKey)
      )
    ) {
      throw new Error(
        'fr311w_registered_gap_state_drift:' + definition.constructKey,
      );
    }
  }

  for (const target of FR311W_TARGET_CONSTRUCT_RESEARCH) {
    for (const featureKey of target.registeredFeatureKeys) {
      if (!knownRegistered.has(featureKey)) {
        throw new Error(
          'fr311w_unknown_registered_feature:' +
          target.targetId + ':' + featureKey,
        );
      }
    }
    for (const constructKey of [
      ...target.proposedConstructKeys,
      ...target.blockedComponentKeys,
    ]) {
      if (!CONSTRUCT_KEYS.has(constructKey)) {
        throw new Error(
          'fr311w_unknown_construct:' +
          target.targetId + ':' + constructKey,
        );
      }
    }

    if (
      target.automaticSynthesisAuthorized !== false ||
      target.sourceToVisibleEquivalenceEstablished !== false ||
      target.empiricalValidationEligible !== false ||
      target.extractorImplementationAuthorizedByThisStudy !== false ||
      target.automaticTraditionalBindingAuthorized !== false ||
      target.metricThresholdAuthorized !== false ||
      target.populationNormAuthorized !== false ||
      target.productInterpretationAuthorized !== false
    ) {
      throw new Error('fr311w_target_authority_drift:' + target.targetId);
    }

    if (
      target.resolution === 'ordinary_rgb_skeletal_proxy_rejected' &&
      !target.blockedComponentKeys.includes(
        'blocked.mandibular_or_zygomatic_bone_from_ordinary_rgb',
      )
    ) {
      throw new Error('fr311w_skeletal_rejection_missing:' + target.targetId);
    }
  }

  if (
    FR311W_RESEARCH_SUMMARY.targetCount !== 22 ||
    FR311W_RESEARCH_SUMMARY.empiricalValidationEligibleTargets !== 0
  ) {
    throw new Error('fr311w_summary_drift');
  }

  for (const [key, value] of Object.entries(FR311W_AUTHORITY_BOUNDARY)) {
    if (value !== false) {
      throw new Error('fr311w_global_authority_widening:' + key);
    }
  }
}
