import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8KweonModernFamilyFrontierEvidence } from './relationship-spouse-t8-kweon-modern-family-frontier-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_DYADIC_COMPATIBILITY_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-dyadic-compatibility-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_DYADIC_COMPATIBILITY_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'NAM_GIDONG_2020_RISS_T15540056',
  author: '남기동',
  publicationYear: 2020,
  title: '부부 궁합(宮合)에 관한 명리학적 연구',
  publication: '동방문화대학원대학교 미래예측학과 명리학전공 박사학위논문',
  sourceLocator: 'RISS T15540056 / control_no 6e314e369d786dffffe0bdc3ef48d419',
  inspectedPublicSurface: 'RISS_SCHOLARLY_METADATA_ABSTRACT_TOC' as const,
  directFullTextObjectInspected: false as const,
  pdfScreenshotReviewed: false as const,
  spouseSpecificMethodExplicitOnPublicSurface: true as const,
  dyadicPartnerNatalChartRequiredByProposedMethod: true as const,
  operationalAccumulationLogicExplicitOnPublicSurface: true as const,
  explicitGenderConditionPresentOnPublicSurface: true as const,
  explicitRoleNeutralNatalSpouseSelectorEstablished: false as const,
  singleNatalInputContractEstablished: false as const,
  canonicalLosslessFitEstablished: false as const,
  modernCompatibilityComponents: Object.freeze([
    'spouse palace',
    'spouse star',
    'neutralization compatibility',
    'modern sinsal compatibility',
  ] as const),
  negativeOrJudgmentStatesExposedByAbstract: Object.freeze([
    'yin-yang / Five-Element imbalance or destruction of neutralization',
    'spouse-palace Hyeong/Chung/Pa/Hae',
    'Wonjin',
    'Baekho',
    'Goegang',
    'Ipmyo of spouse palace/star',
    'Ganyeojidong',
    'multiple occurrence of the same Five Element as the Day Branch / spouse palace',
    'weak spouse star',
    'spouse-star Hyeong/Chung/Pa/Hae',
    'insufficient Johu',
    'Bigyeon/Geopjae count threshold',
    'Jeongwijeongseong Hap/Chung/Hyeong/Pa/Hae',
    'female-chart branch Inseong excess condition',
  ] as const),
  resolvingOrPositiveStatesExposedByAbstract: Object.freeze([
    'partner-level Yin-Yang / Five-Element supplementation',
    'Byeongyak Five Element',
    'defect/missing Five Element',
    'Johu Five Element',
    'Johu season',
    'Poguk concerning spouse palace/star',
    'Jeonggisin preparation',
    'partner possession of the native\'s Cheoneul nobleman',
  ] as const),
  exactMethodBoundary:
    'The RISS-authored abstract describes a modern compatibility procedure that calculates each partner\'s positive and negative factors from both natal charts, then judges whether one partner supplies neutralizing factors for the other and whether negative factors accumulate across the pair. This is an operational spouse/compatibility method, but it is dyadic rather than a single-native natal spouse interpretation path.',
  exactRoleNeutralBoundary:
    'The same public abstract contains an explicit female-chart-specific condition and repeatedly frames the base table as the individual data of a man and a woman. It therefore does not establish a role-neutral spouse selector or partner-gender-independent mapping.',
  exactCanonicalBoundary:
    'Current canonical facts can represent raw pillars, Day Branch position, exact Ten-God observations, some Five-Element counts, and a limited relation set, but they do not govern the complete source semantics for spouse-palace/spouse-star authority, Hyeong/Pa/Hae as a complete relation family, Wonjin, Baekho, Goegang, Ipmyo, weakness, Johu, Jung-hwa, Byeongyak, Poguk, Jeongwijeongseong, Jeonggisin, Cheoneul nobleman, or the source\'s accumulation and resolving thresholds. The complete method also requires a second person\'s natal chart.',
  requiredNonCurrentInputOrSemantics: Object.freeze([
    'partner natal chart',
    'source-governed spouse palace semantics',
    'source-governed spouse star semantics',
    'complete Hyeong/Chung/Pa/Hae semantics',
    'Wonjin',
    'Baekho',
    'Goegang',
    'Ipmyo',
    'source-defined spouse-star weakness',
    'Johu',
    'Jung-hwa / neutralization',
    'Byeongyak',
    'Poguk',
    'Jeongwijeongseong',
    'Jeonggisin',
    'Cheoneul nobleman',
    'source-defined positive/negative accumulation and resolution thresholds',
  ] as const),
  actualBodyTargets: Object.freeze([
    'II.2 신법(新法)명리 궁합론 — p.38',
    'III.1 신법명리 궁합론의 사례분석 — p.83',
    'IV.1 이별 부부 궁합의 명리적 특성 — p.168',
    'IV.2 해로 부부 궁합의 명리적 특성 — p.172',
    'IV.3 명리적 특성의 시사점 — p.174',
    'V.2 현대적 궁합론 모색 — p.181',
  ] as const),
  nextAction:
    'Acquire the actual thesis body to recover exact definitions and thresholds, but do not map the abstract procedure into Relationship T6/T8: the public method already requires a partner chart, gender-conditioned logic, and multiple ungoverned semantic states.',
});

export const RELATIONSHIP_SPOUSE_T8_DYADIC_COMPATIBILITY_BOUNDARY_CONTROL_IDS = Object.freeze([
  'PUBLIC_ABSTRACT_TOC_IS_NOT_RELABELED_AS_ACTUAL_BODY',
  'DYADIC_COMPATIBILITY_METHOD_IS_NOT_RELABELED_AS_SINGLE_NATIVE_SPOUSE_INTERPRETATION',
  'PARTNER_NATAL_CHART_IS_NOT_INVENTED_OR_DERIVED_FROM_NATIVE_CHART',
  'GENDER_CONDITIONED_METHOD_IS_NOT_RELABELED_AS_ROLE_NEUTRAL_MAPPING',
  'NO_UNGOVERNED_JUNG_HWA_JOHU_IPMYO_WONJIN_BAEKHO_GOEGAANG_OR_OTHER_SEMANTICS',
  'NO_PARTIAL_CANONICAL_RELATION_SET_IS_PROMOTED_TO_COMPLETE_HYEONG_CHUNG_PA_HAE_METHOD',
  'SOURCE_THRESHOLDS_ARE_NOT_NORMALIZED_OR_INVENTED_FROM_ABSTRACT_AMBIGUITY',
  'INDEPENDENT_NORMATIVE_PROVENANCE_FOR_CURRENT_SPOUSE_METHOD_REMAINS_OPEN',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_ONE_OF_FIVE_AUTHORITY_GAPS_REMAINS_CLOSED',
  'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
] as const);

export interface RelationshipSpouseT8DyadicCompatibilityBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_DYADIC_COMPATIBILITY_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status: 'OPERATIONAL_DYADIC_SPOUSE_METHOD_FOUND_BUT_PARTNER_INPUT_GENDER_AND_UNGOVERNED_SEMANTICS_BLOCK_T6_T8';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_DYADIC_COMPATIBILITY_BOUNDARY_CANDIDATE;
  directFullTextCandidateCount: 0;
  spouseSpecificOperationalMethodSurfaceFound: true;
  dyadicPartnerNatalChartRequired: true;
  roleNeutralNatalMappingEstablished: false;
  singleNatalInputPathEstablished: false;
  independentNormativeProvenanceForCurrentSpouseMethodEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  qualifyingPrimaryWitnessGapRemainsClosed: true;
  authorityGapsClosedCount: 1;
  authorityGapsOpenCount: 4;
  authorityAdmissionReady: false;
  crossSourceStitchingAuthorized: false;
  partnerChartInferenceAuthorized: false;
  spouseT8ProducerReady: false;
  productionPromotionReady: false;
  controlIds: typeof RELATIONSHIP_SPOUSE_T8_DYADIC_COMPATIBILITY_BOUNDARY_CONTROL_IDS;
  controlCount: 13;
  recommendedNextAction: 'CONTINUE_KWEON_ROLE_NEUTRAL_BODY_ACQUISITION_AND_ACQUIRE_NAM_GIDONG_BODY_ONLY_TO_BOUND_EXACT_DYADIC_METHOD_SEMANTICS';
}

export function buildRelationshipSpouseT8DyadicCompatibilityBoundaryEvidence(): RelationshipSpouseT8DyadicCompatibilityBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8KweonModernFamilyFrontierEvidence();
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_DYADIC_COMPATIBILITY_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status:
      'OPERATIONAL_DYADIC_SPOUSE_METHOD_FOUND_BUT_PARTNER_INPUT_GENDER_AND_UNGOVERNED_SEMANTICS_BLOCK_T6_T8' as const,
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_DYADIC_COMPATIBILITY_BOUNDARY_CANDIDATE,
    directFullTextCandidateCount: 0 as const,
    spouseSpecificOperationalMethodSurfaceFound: true as const,
    dyadicPartnerNatalChartRequired: true as const,
    roleNeutralNatalMappingEstablished: false as const,
    singleNatalInputPathEstablished: false as const,
    independentNormativeProvenanceForCurrentSpouseMethodEstablished: false as const,
    currentGovernedMethodSemanticCorrespondenceEstablished: false as const,
    currentRelationshipT6InputPathEstablished: false as const,
    qualifyingPrimaryWitnessGapRemainsClosed: true as const,
    authorityGapsClosedCount: 1 as const,
    authorityGapsOpenCount: 4 as const,
    authorityAdmissionReady: false as const,
    crossSourceStitchingAuthorized: false as const,
    partnerChartInferenceAuthorized: false as const,
    spouseT8ProducerReady: false as const,
    productionPromotionReady: false as const,
    controlIds: RELATIONSHIP_SPOUSE_T8_DYADIC_COMPATIBILITY_BOUNDARY_CONTROL_IDS,
    controlCount: 13 as const,
    recommendedNextAction:
      'CONTINUE_KWEON_ROLE_NEUTRAL_BODY_ACQUISITION_AND_ACQUIRE_NAM_GIDONG_BODY_ONLY_TO_BOUND_EXACT_DYADIC_METHOD_SEMANTICS' as const,
  };

  return {
    evidenceId: `relationship_spouse_t8_dyadic_compatibility_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
