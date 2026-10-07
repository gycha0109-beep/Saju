import {
  EYEBROW_NAMED_FORM_SEMANTICS_FR311A,
} from './traditional-eyebrow-named-form-semantics-fr311a.js';
import {
  EYE_NAMED_FORM_SEMANTICS_FR311B,
} from './traditional-eye-named-form-semantics-fr311b.js';
import {
  NOSE_DIRECT_RULES_FR311F,
  NOSE_NAMED_FORM_SEMANTICS_FR311F,
} from './traditional-nose-semantics-fr311f.js';
import {
  MOUTH_NAMED_FORM_SEMANTICS_FR311I,
  MOUTH_PHILTRUM_DIRECT_RULES_FR311I,
} from './traditional-mouth-philtrum-semantics-fr311i.js';
import {
  EAR_DIRECT_RULES_FR311L,
  EAR_NAMED_FORM_SEMANTICS_FR311L,
} from './traditional-ear-semantics-fr311l.js';
import {
  STATIC_MISSING_REGION_DIRECT_RULES_FR311R,
  STATIC_TRADITIONAL_REGIONS_FR311R,
} from './traditional-static-missing-region-semantics-fr311r.js';
import {
  STATIC_METHODOLOGIES_FR311S,
} from './traditional-static-structure-methodology-fr311s.js';

export type StaticResearchAreaKeyFR311T =
  | 'eyebrow'
  | 'eye'
  | 'nose'
  | 'mouth_philtrum_lips'
  | 'ear'
  | 'forehead'
  | 'cheekbones'
  | 'chin_lower_face'
  | 'whole_face'
  | 'five_officers'
  | 'five_mountains'
  | 'four_waterways'
  | 'six_ministries'
  | 'three_divisions'
  | 'thirteen_parts'
  | 'twelve_palaces'
  | 'five_stars_six_luminaries'
  | 'study_halls'
  | 'five_element_forms'
  | 'ten_observations'
  | 'five_methods'
  | 'three_masters'
  | 'three_pillars';

export interface StaticResearchCoverageEntryFR311T {
  readonly areaKey: StaticResearchAreaKeyFR311T;
  readonly evidenceKind: 'semantic_corpus' | 'region_semantics' | 'methodology_structure';
  readonly sourceBackedRecordCount: number;
  readonly researchState: 'static_source_research_complete';
  readonly automaticTraditionalBindingAuthorized: false;
  readonly empiricalValidationStarted: false;
  readonly productInterpretationAuthorized: false;
}

export interface ArchitectureExcludedResearchAreaFR311T {
  readonly areaKey:
    | 'dynamic_color_appearance_f5'
    | 'full_100_year_age_map';
  readonly state: 'architecture_disabled_outside_v1_static_research';
  readonly excludedFromStaticCoreMissingCount: true;
  readonly productionAuthorized: false;
}

function methodCount(kind: string): number {
  return STATIC_METHODOLOGIES_FR311S
    .filter((item) => item.structureKind === kind)
    .reduce((sum, item) => sum + item.members.length, 0);
}

function coverage(
  areaKey: StaticResearchAreaKeyFR311T,
  evidenceKind: StaticResearchCoverageEntryFR311T['evidenceKind'],
  sourceBackedRecordCount: number,
): StaticResearchCoverageEntryFR311T {
  return Object.freeze({
    areaKey,
    evidenceKind,
    sourceBackedRecordCount,
    researchState: 'static_source_research_complete' as const,
    automaticTraditionalBindingAuthorized: false as const,
    empiricalValidationStarted: false as const,
    productInterpretationAuthorized: false as const,
  });
}

const missingRegionRules = (region: string): number =>
  STATIC_MISSING_REGION_DIRECT_RULES_FR311R
    .filter((item) => item.region === region).length;

export const STATIC_FACE_RESEARCH_COVERAGE_FR311T:
readonly StaticResearchCoverageEntryFR311T[] = Object.freeze([
  coverage(
    'eyebrow',
    'semantic_corpus',
    EYEBROW_NAMED_FORM_SEMANTICS_FR311A.length,
  ),
  coverage(
    'eye',
    'semantic_corpus',
    EYE_NAMED_FORM_SEMANTICS_FR311B.length,
  ),
  coverage(
    'nose',
    'semantic_corpus',
    NOSE_DIRECT_RULES_FR311F.length +
      NOSE_NAMED_FORM_SEMANTICS_FR311F.length,
  ),
  coverage(
    'mouth_philtrum_lips',
    'semantic_corpus',
    MOUTH_PHILTRUM_DIRECT_RULES_FR311I.length +
      MOUTH_NAMED_FORM_SEMANTICS_FR311I.length,
  ),
  coverage(
    'ear',
    'semantic_corpus',
    EAR_DIRECT_RULES_FR311L.length +
      EAR_NAMED_FORM_SEMANTICS_FR311L.length,
  ),
  coverage(
    'forehead',
    'region_semantics',
    missingRegionRules('forehead'),
  ),
  coverage(
    'cheekbones',
    'region_semantics',
    missingRegionRules('cheekbone_pair') +
      missingRegionRules('left_cheekbone') +
      missingRegionRules('right_cheekbone'),
  ),
  coverage(
    'chin_lower_face',
    'region_semantics',
    missingRegionRules('chin') +
      missingRegionRules('jaw_lower_face'),
  ),
  coverage(
    'whole_face',
    'region_semantics',
    missingRegionRules('whole_face'),
  ),
  coverage(
    'five_officers',
    'methodology_structure',
    methodCount('five_officers'),
  ),
  coverage(
    'five_mountains',
    'methodology_structure',
    methodCount('five_mountains'),
  ),
  coverage(
    'four_waterways',
    'methodology_structure',
    methodCount('four_waterways'),
  ),
  coverage(
    'six_ministries',
    'methodology_structure',
    methodCount('six_ministries'),
  ),
  coverage(
    'three_divisions',
    'methodology_structure',
    methodCount('three_divisions'),
  ),
  coverage(
    'thirteen_parts',
    'methodology_structure',
    methodCount('thirteen_parts'),
  ),
  coverage(
    'twelve_palaces',
    'methodology_structure',
    methodCount('twelve_palaces'),
  ),
  coverage(
    'five_stars_six_luminaries',
    'methodology_structure',
    methodCount('five_stars_six_luminaries'),
  ),
  coverage(
    'study_halls',
    'methodology_structure',
    methodCount('four_study_halls') +
      methodCount('eight_study_halls'),
  ),
  coverage(
    'five_element_forms',
    'methodology_structure',
    methodCount('five_element_forms'),
  ),
  coverage(
    'ten_observations',
    'methodology_structure',
    methodCount('ten_observations'),
  ),
  coverage(
    'five_methods',
    'methodology_structure',
    methodCount('five_methods'),
  ),
  coverage(
    'three_masters',
    'methodology_structure',
    methodCount('three_masters'),
  ),
  coverage(
    'three_pillars',
    'methodology_structure',
    methodCount('three_pillars'),
  ),
]);

export const ARCHITECTURE_EXCLUDED_RESEARCH_AREAS_FR311T:
readonly ArchitectureExcludedResearchAreaFR311T[] = Object.freeze([
  Object.freeze({
    areaKey: 'dynamic_color_appearance_f5' as const,
    state: 'architecture_disabled_outside_v1_static_research' as const,
    excludedFromStaticCoreMissingCount: true as const,
    productionAuthorized: false as const,
  }),
  Object.freeze({
    areaKey: 'full_100_year_age_map' as const,
    state: 'architecture_disabled_outside_v1_static_research' as const,
    excludedFromStaticCoreMissingCount: true as const,
    productionAuthorized: false as const,
  }),
]);

export const FR311T_STATIC_RESEARCH_CLOSURE = Object.freeze({
  staticCoreAreas: STATIC_FACE_RESEARCH_COVERAGE_FR311T.length,
  staticCoreResearchComplete:
    STATIC_FACE_RESEARCH_COVERAGE_FR311T
      .filter((item) =>
        item.researchState === 'static_source_research_complete')
      .length,
  staticCoreResearchMissing:
    STATIC_FACE_RESEARCH_COVERAGE_FR311T
      .filter((item) =>
        item.researchState !== 'static_source_research_complete')
      .length,
  explicitArchitectureExclusions:
    ARCHITECTURE_EXCLUDED_RESEARCH_AREAS_FR311T.length,
  missingTraditionalRegions:
    STATIC_TRADITIONAL_REGIONS_FR311R
      .filter((item) => item.sourceRefs.length === 0).length,
  empiricalValidationStarted: false,
  automaticTraditionalBindingsAuthorized: 0,
  metricThresholdsAuthorized: 0,
  populationNormsAuthorized: 0,
  productInterpretationsAuthorized: 0,
});

export const FR311T_STATIC_RESEARCH_AUTHORITY_BOUNDARY = Object.freeze({
  empiricalValidationAuthorized: false as const,
  automaticTraditionalBindingAuthorized: false as const,
  providerLandmarkDirectBindingAuthorized: false as const,
  metricThresholdAuthorized: false as const,
  populationNormAuthorized: false as const,
  crossLineageCanonicalMapAuthorized: false as const,
  namedFormClassifierAuthorized: false as const,
  aggregateScoreAuthorized: false as const,
  modernScientificFactAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

export function assertStaticFaceResearchClosureFR311T(): void {
  const areaKeys = STATIC_FACE_RESEARCH_COVERAGE_FR311T
    .map((item) => item.areaKey);
  if (
    new Set(areaKeys).size !== areaKeys.length ||
    FR311T_STATIC_RESEARCH_CLOSURE.staticCoreAreas !== 23 ||
    FR311T_STATIC_RESEARCH_CLOSURE.staticCoreResearchComplete !== 23 ||
    FR311T_STATIC_RESEARCH_CLOSURE.staticCoreResearchMissing !== 0 ||
    FR311T_STATIC_RESEARCH_CLOSURE.explicitArchitectureExclusions !== 2 ||
    FR311T_STATIC_RESEARCH_CLOSURE.missingTraditionalRegions !== 0
  ) {
    throw new Error('fr311t_static_research_coverage_drift');
  }

  for (const item of STATIC_FACE_RESEARCH_COVERAGE_FR311T) {
    if (
      item.sourceBackedRecordCount <= 0 ||
      item.researchState !== 'static_source_research_complete' ||
      item.automaticTraditionalBindingAuthorized !== false ||
      item.empiricalValidationStarted !== false ||
      item.productInterpretationAuthorized !== false
    ) {
      throw new Error('fr311t_invalid_area:' + item.areaKey);
    }
  }

  for (const excluded of ARCHITECTURE_EXCLUDED_RESEARCH_AREAS_FR311T) {
    if (
      excluded.state !== 'architecture_disabled_outside_v1_static_research' ||
      excluded.excludedFromStaticCoreMissingCount !== true ||
      excluded.productionAuthorized !== false
    ) {
      throw new Error('fr311t_exclusion_drift:' + excluded.areaKey);
    }
  }

  for (const [key, value] of Object.entries(
    FR311T_STATIC_RESEARCH_AUTHORITY_BOUNDARY,
  )) {
    if (value !== false) {
      throw new Error('fr311t_authority_widening:' + key);
    }
  }
}
