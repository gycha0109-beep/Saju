import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8DyadicCompatibilityBoundaryEvidence } from './relationship-spouse-t8-dyadic-compatibility-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_CURRENT_SCHOLARLY_METHOD_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-current-scholarly-method-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_CURRENT_SCHOLARLY_METHOD_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'KIM_MANTAE_2025_KCI_ART003250308',
  author: '김만태',
  publicationYear: 2025,
  title: '배우자 인연의 중시로서 궁합(宮合)에 관한 고찰',
  publication: '한류문화연구 5(3), pp.143-168',
  sourceLocator:
    'KCI ART003250308 / DOI 10.58936/gcr.2025.9.5.3.143 / author-hosted research-page indexed body passages',
  inspectedSurface: 'KCI_METADATA_ABSTRACT_PLUS_AUTHOR_HOSTED_SEARCH_INDEX_BODY_PASSAGES' as const,
  kciBibliographicAndAbstractSurfaceInspected: true as const,
  authorHostedIndexedBodyPassagesInspected: true as const,
  directAuthorHostedPageOpenSucceeded: false as const,
  directPdfObjectInspected: false as const,
  pdfScreenshotReviewed: false as const,
  spousePalaceDayBranchExplicit: true as const,
  spousePalacePrioritizedOverSpouseStarExplicit: true as const,
  genderedSpouseStarMappingExplicit: true as const,
  dyadicFullChartComparisonExplicit: true as const,
  singleNativeSpouseRelationshipFeatureListExposed: true as const,
  explicitRoleNeutralNatalSpouseSelectorEstablished: false as const,
  pureSingleNatalInputContractEstablished: false as const,
  canonicalLosslessFitEstablished: false as const,
  exposedGenderedMapping: Object.freeze({
    husbandCaseSpouseStar: 'Wealth / 財星',
    wifeCaseSpouseStar: 'Officer / 官星',
  } as const),
  exposedSingleNativeNegativeFeatures: Object.freeze([
    'Day Branch same Five Element as Day Stem / Ganyeojidong condition',
    'Day Branch relation conditions including Chung/Hae/Pa/Wonjin/Hyeongsal/Gwimungwansal',
    'Day Branch at spouse-star Jeolji or Myoji',
    'weak spouse star',
    'spouse-star Gongmang/Pyeonjung/Honhap/Wonjin/Baekho',
    'spouse star at Myojeol or rootless/weak through Seolgi or Pageuk',
    'many Five Elements identical to the Day Stem, explicitly emphasized for men',
    'many Siksang or Siksang at the Day Branch, explicitly stated for women',
    'same Five Element as spouse palace repeated in other stems/branches',
  ] as const),
  exposedDyadicCompatibilityFactors: Object.freeze([
    'cross-examine both partners full year/month/day/hour natal charts',
    'Yin-Yang/Five-Element balance and evenness of Jae/Gwan/In/Sik strength',
    'Gan-Hap or Yuk-Hap relation between partners',
    'partner chart containing Five Elements needed by the native',
    'same Yongsin',
    'partner supplying a Five Element absent from the native',
    'seasonal harmony',
    'Jung-hwa as the ultimate compatibility objective',
  ] as const),
  exactCurrentMethodBoundary:
    'The 2025 KCI article and author-hosted indexed body passages explicitly prioritize the Day Branch as spouse palace, expose a concrete list of single-native spouse-relationship features, and require full-chart comparison for compatibility. The same source nevertheless retains a gender-conditioned spouse-star mapping and gender-specific conditions, while relying on semantic states such as weakness/root, Myo/Jeol, Seolgi/Pageuk, Jung-hwa, Yongsin, and additional relations/sinsal not governed by the current canonical snapshot.',
  exactEvidenceTierBoundary:
    'KCI establishes the article identity, DOI, publication facts, and abstract. Search indexing of the author-hosted research page exposes substantial article body passages and an attached PDF filename, but the author-hosted page itself did not open in the current fetch path and the PDF object was not directly inspected. Therefore this evidence is stronger than abstract-only evidence but must not be relabeled as direct PDF inspection or page-by-page full-text review.',
  exactRoleNeutralBoundary:
    'The source explicitly maps the husband-case spouse star to Wealth and the wife-case spouse star to Officer and contains additional sex-specific conditions. Modern publication date and broader social use of compatibility do not convert those rules into a partner-gender-independent spouse selector.',
  exactCanonicalBoundary:
    'Current canonical facts can represent the Day Branch position, exact Ten-God observations, optional Five-Element counts, and a limited governed relation set, but they do not authorize spouse-palace semantics by themselves and do not govern the source-defined root/weakness, Myo/Jeol, Seolgi/Pageuk, Wonjin, Baekho, Gwimungwansal, complete Chung/Hae/Pa/Hyeong families, Jung-hwa, Yongsin, or source-specific thresholds. The compatibility procedure also requires a second natal chart.',
  requiredNonCurrentInputOrSemantics: Object.freeze([
    'partner natal chart for full compatibility comparison',
    'source-governed spouse-palace semantic correspondence',
    'gender-conditioned spouse-star selector',
    'complete Chung/Hae/Pa/Hyeong relation semantics',
    'Wonjin',
    'Hyeongsal',
    'Gwimungwansal',
    'Baekho',
    'Gongmang in the source method context',
    'Myo/Jeol state',
    'root / rootlessness',
    'source-defined weakness',
    'Seolgi',
    'Pageuk',
    'Jung-hwa',
    'Yongsin',
    'source-defined count, repetition, and dominance thresholds',
  ] as const),
  nextAction:
    'Continue Kweon 2021 actual-body acquisition for the role-neutral frontier. Separately attempt direct acquisition of the Kim 2025 attached PDF only to verify exact article pagination, context, definitions, and thresholds; do not promote the indexed body passages into a role-neutral or canonically complete spouse rule.',
});

export const RELATIONSHIP_SPOUSE_T8_CURRENT_SCHOLARLY_METHOD_BOUNDARY_CONTROL_IDS = Object.freeze([
  'AUTHOR_HOSTED_SEARCH_INDEX_BODY_PASSAGES_ARE_NOT_RELABELED_AS_DIRECT_PDF_INSPECTION',
  'ATTACHED_PDF_FILENAME_DOES_NOT_COUNT_AS_INSPECTED_PDF_OBJECT',
  'CURRENT_PUBLICATION_DATE_DOES_NOT_OVERRIDE_GENDER_CONDITIONED_SOURCE_LOGIC',
  'GENDERED_WEALTH_OFFICER_SPOUSE_MAPPING_IS_NOT_SILENTLY_NEUTRALIZED',
  'DAY_BRANCH_SPOUSE_PALACE_PRIORITY_DOES_NOT_BY_ITSELF_DEFINE_ROLE_NEUTRAL_TEN_GOD_SELECTION',
  'NO_ROOT_WEAKNESS_MYO_JEOL_SEOLGI_PAGEUK_JUNG_HWA_YONGSIN_OR_SINSAL_INVENTION',
  'NO_PARTNER_NATAL_CHART_INFERENCE_FROM_SINGLE_NATIVE_FACTS',
  'NO_PARTIAL_RELATION_SET_IS_PROMOTED_TO_COMPLETE_SOURCE_RELATION_METHOD',
  'NO_CROSS_SOURCE_STITCHING_WITH_KWEON_HONG_SONG_NAM_OR_CLASSICAL_GENDERED_RULES',
  'INDEPENDENT_NORMATIVE_PROVENANCE_FOR_CURRENT_ROLE_NEUTRAL_SPOUSE_METHOD_REMAINS_OPEN',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_ONE_OF_FIVE_AUTHORITY_GAPS_REMAINS_CLOSED',
  'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
] as const);

export interface RelationshipSpouseT8CurrentScholarlyMethodBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_CURRENT_SCHOLARLY_METHOD_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status: 'CURRENT_2025_SPOUSE_METHOD_BODY_PASSAGES_FOUND_BUT_GENDER_AND_UNGOVERNED_SEMANTICS_BLOCK_AUTHORITY';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_CURRENT_SCHOLARLY_METHOD_BOUNDARY_CANDIDATE;
  directPdfCandidateCount: 0;
  authorHostedIndexedBodyPassageCandidateCount: 1;
  currentSpouseSpecificMethodPassagesFound: true;
  roleNeutralNatalMappingEstablished: false;
  pureSingleNatalInputPathEstablished: false;
  independentNormativeProvenanceForCurrentRoleNeutralSpouseMethodEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  qualifyingPrimaryWitnessGapRemainsClosed: true;
  authorityGapsClosedCount: 1;
  authorityGapsOpenCount: 4;
  authorityAdmissionReady: false;
  crossSourceStitchingAuthorized: false;
  genderOrOrientationInferenceAuthorized: false;
  spouseT8ProducerReady: false;
  productionPromotionReady: false;
  controlIds: typeof RELATIONSHIP_SPOUSE_T8_CURRENT_SCHOLARLY_METHOD_BOUNDARY_CONTROL_IDS;
  controlCount: 15;
  recommendedNextAction: 'ACQUIRE_KWEON_ACTUAL_BODY_FIRST_THEN_DIRECTLY_ACQUIRE_KIM_2025_PDF_TO_VERIFY_CURRENT_METHOD_CONTEXT_WITHOUT_NEUTRALIZING_GENDERED_RULES';
}

export function buildRelationshipSpouseT8CurrentScholarlyMethodBoundaryEvidence(): RelationshipSpouseT8CurrentScholarlyMethodBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8DyadicCompatibilityBoundaryEvidence();
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_CURRENT_SCHOLARLY_METHOD_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status:
      'CURRENT_2025_SPOUSE_METHOD_BODY_PASSAGES_FOUND_BUT_GENDER_AND_UNGOVERNED_SEMANTICS_BLOCK_AUTHORITY' as const,
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_CURRENT_SCHOLARLY_METHOD_BOUNDARY_CANDIDATE,
    directPdfCandidateCount: 0 as const,
    authorHostedIndexedBodyPassageCandidateCount: 1 as const,
    currentSpouseSpecificMethodPassagesFound: true as const,
    roleNeutralNatalMappingEstablished: false as const,
    pureSingleNatalInputPathEstablished: false as const,
    independentNormativeProvenanceForCurrentRoleNeutralSpouseMethodEstablished: false as const,
    currentGovernedMethodSemanticCorrespondenceEstablished: false as const,
    currentRelationshipT6InputPathEstablished: false as const,
    qualifyingPrimaryWitnessGapRemainsClosed: true as const,
    authorityGapsClosedCount: 1 as const,
    authorityGapsOpenCount: 4 as const,
    authorityAdmissionReady: false as const,
    crossSourceStitchingAuthorized: false as const,
    genderOrOrientationInferenceAuthorized: false as const,
    spouseT8ProducerReady: false as const,
    productionPromotionReady: false as const,
    controlIds: RELATIONSHIP_SPOUSE_T8_CURRENT_SCHOLARLY_METHOD_BOUNDARY_CONTROL_IDS,
    controlCount: 15 as const,
    recommendedNextAction:
      'ACQUIRE_KWEON_ACTUAL_BODY_FIRST_THEN_DIRECTLY_ACQUIRE_KIM_2025_PDF_TO_VERIFY_CURRENT_METHOD_CONTEXT_WITHOUT_NEUTRALIZING_GENDERED_RULES' as const,
  };

  return {
    evidenceId: `relationship_spouse_t8_current_scholarly_method_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
