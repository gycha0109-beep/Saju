import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import type { CareerT8SynthesisAuthorityGapId } from './career-personalization-t8-synthesis-authority-gap-requirements-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_AUTHORITY_ACQUISITION_CONTROL_IDS,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_DISCOVERY_LANES,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_INPUT_CLAIM_TYPES,
  type CareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReviewReport,
  type CareerT8CurrentT5T6BridgeLaneId,
} from './career-personalization-t8-current-t5-t6-semantic-bridge-authority-acquisition-readiness-review.js';

export const CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION =
  'myeonghwa-career-personalization-t8-current-t5-t6-semantic-bridge-authority-candidate-discovery-evidence-v1' as const;

export type CareerT8BridgeCandidateStatus =
  | 'DISCOVERY_LEAD_ONLY'
  | 'PARTIAL_METHODOLOGY_MIXED'
  | 'INCOMPATIBLE_NUMERIC_STRENGTH_METHOD'
  | 'TEMPORAL_SEMANTIC_MISMATCH';

export type CareerT8BridgeSourceClass =
  | 'published_practitioner_book_metadata'
  | 'scholarly_secondary'
  | 'unverified_transcription_surface';

export interface CareerT8BridgeCandidateSourceReference {
  sourceId: string;
  title: string;
  author: string;
  publicationYear: number | null;
  publisherOrJournal: string;
  sourceClass: CareerT8BridgeSourceClass;
  stableUrl: string;
  doi: string | null;
  isbn13: string | null;
  inspectedSurface: string;
}

export interface CareerT8BridgeDiscoveredCandidate {
  candidateId: string;
  sourceReference: CareerT8BridgeCandidateSourceReference;
  status: CareerT8BridgeCandidateStatus;
  laneIds: readonly CareerT8CurrentT5T6BridgeLaneId[];
  targetedGapIds: readonly CareerT8SynthesisAuthorityGapId[];
  observedEvidence: readonly string[];
  exactSourceIdentityObserved: boolean;
  stableReproducibleLocatorObserved: boolean;
  exactGapRelevantPassageLocatorObserved: boolean;
  originalSourceFullPassageInspected: boolean;
  explicitCareerOrWorkSemanticObserved: boolean;
  multiPatternOrStructureCareerSemanticObserved: boolean;
  natalStructuralModifierToCareerSemanticObserved: boolean;
  sourceConceptToCurrentClaimSemanticCorrespondenceEstablished: false;
  independentNormativeProvenanceObserved: boolean;
  numericStrengthWeightingObserved: boolean;
  yongshinOrXijiMethodologyObserved: boolean;
  gyeokgukMethodologyObserved: boolean;
  dynamicCareerChangeSemanticsObserved: boolean;
  natalCareerModifierSemanticsObserved: boolean;
  specificOccupationCohortOnly: boolean;
  methodologyCompatibilityWithCurrentT5T6Contract:
    | 'NOT_EVALUABLE_WITHOUT_FULL_PASSAGE'
    | 'INCOMPATIBLE_NUMERIC_WEIGHTING'
    | 'MIXED_COMPETING_METHODOLOGY'
    | 'TEMPORAL_AND_METHODOLOGY_MISMATCH';
  admissionAcceptedUnderB10: false;
  authorityAcquiredByDiscovery: false;
  limitingReasons: readonly string[];
}

export interface CareerT8BridgeDiscoveryLaneResult {
  laneId: CareerT8CurrentT5T6BridgeLaneId;
  searched: boolean;
  candidateIds: readonly string[];
  candidateCount: number;
  admissionCompatibleCandidateCount: 0;
  laneAuthorityAcquired: false;
  finding: string;
}

export const CAREER_T8_CURRENT_T5_T6_BRIDGE_CANDIDATE_DISCOVERY_CONTROL_IDS = Object.freeze([
  'DISCOVERY_EVIDENCE_IS_NOT_AUTHORITY_ACCEPTANCE',
  'BOOK_METADATA_OR_TABLE_OF_CONTENTS_IS_DISCOVERY_LEAD_ONLY_WITHOUT_EXACT_PASSAGE',
  'ACADEMIC_ABSTRACT_MAY_ESTABLISH_METHOD_CHARACTERISTICS_BUT_NOT_CURRENT_CLAIM_CORRESPONDENCE',
  'NUMERIC_TEN_GOD_STRENGTH_AGGREGATION_IS_INCOMPATIBLE_WITH_CURRENT_CONTRACT',
  'YONGSHIN_XIJI_OR_GYEOKGUK_CANNOT_BE_SILENTLY_IMPORTED',
  'DYNAMIC_PROFESSION_CHANGE_IS_NOT_NATAL_CAREER_MODIFIER_SEMANTICS',
  'SPECIFIC_OCCUPATION_COHORT_RESULTS_DO_NOT_GENERALIZE_TO_CAREER_SEMANTIC_AUTHORITY',
  'SOURCE_CONCEPT_TO_CURRENT_CLAIM_CORRESPONDENCE_REMAINS_UNESTABLISHED_WITHOUT_EXACT_EVIDENCE',
  'NO_CROSS_CANDIDATE_STITCHING_WITHIN_ONE_GAP',
  'NO_HISTORICAL_RANK_TO_MODERN_CAREER_CONVERSION',
  'NO_NUMERIC_WEIGHTING_WINNER_LOSER_DAMAGE_OR_PRECEDENCE_INFERENCE',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

export interface CareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
    | 'UPSTREAM_B10_BOUNDARY_INVALID';
  decision:
    | 'FIVE_BRIDGE_CANDIDATES_DISCOVERED_ZERO_ADMISSION_COMPATIBLE_NO_AUTHORITY_ACQUIRED_ALL_SIX_GAPS_OPEN'
    | 'CURRENT_T5_T6_CAREER_BRIDGE_CANDIDATE_DISCOVERY_NOT_ESTABLISHED';
  upstreamB10ReviewId: string;
  exactB10BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  discoveryPerformed: boolean;
  inspectedCandidateCount: 5 | 0;
  inspectedCandidates: readonly CareerT8BridgeDiscoveredCandidate[];
  discoveryLaneCount: 3 | 0;
  laneResults: readonly CareerT8BridgeDiscoveryLaneResult[];
  leadOnlyCandidateCount: 1 | 0;
  methodologyMixedCandidateCount: 2 | 0;
  numericIncompatibleCandidateCount: 1 | 0;
  temporalMismatchCandidateCount: 1 | 0;
  admissionCompatibleCandidateCount: 0;
  registeredCandidateCount: 0;
  authorityAcceptedCandidateCount: 0;
  authorityGapClosedCount: 0;
  allSixGapsRemainOpen: true;
  unresolvedGapIds: readonly CareerT8SynthesisAuthorityGapId[];
  strongestCurrentLeadCandidateId: string | null;
  strongestCurrentLeadRequiresExactPassageAccess: boolean;
  t5LaneHasPromisingButUnadmittedEvidence: boolean;
  t6LaneHasNoNatalMethodologyCompatibleBridgeCandidate: boolean;
  multiPatternLaneHasNoNonNumericMethodologyCompatibleBridgeCandidate: boolean;
  numericStrengthMethodRejectedFromCurrentTrack: boolean;
  competingYongshinXijiMethodologyDeferred: boolean;
  dynamicCareerChangeNotPromotedToNatalModifier: boolean;
  currentClaimSemanticCorrespondenceEstablishedByThisGate: false;
  sameGapCrossCandidateCompositionPerformed: false;
  sameGapCrossCandidateCompositionAuthorized: false;
  candidateRegisteredByThisGate: false;
  requirementCoverageEvaluatedByThisGate: false;
  authorityAcquiredByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof CAREER_T8_CURRENT_T5_T6_BRIDGE_CANDIDATE_DISCOVERY_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    candidateEvidenceRecordsCreated: 5 | 0;
    registeredSourcesCreated: 0;
    methodologyDefinitionsCreated: 0;
    methodologyChoicesAdopted: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    registrySnapshotsCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW';
}

const T5_GAPS = Object.freeze([
  'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
  'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
] as const satisfies readonly CareerT8SynthesisAuthorityGapId[]);

const T6_GAPS = Object.freeze([
  'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
  'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
  'SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
] as const satisfies readonly CareerT8SynthesisAuthorityGapId[]);

const MULTI_GAP = Object.freeze([
  'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
] as const satisfies readonly CareerT8SynthesisAuthorityGapId[]);

export const CAREER_T8_CURRENT_T5_T6_BRIDGE_DISCOVERED_CANDIDATES = Object.freeze([
  Object.freeze({
    candidateId: 'cheonbu_myeongri_tongbyeonron_2020',
    sourceReference: Object.freeze({
      sourceId: 'source_kim_yonghyeok_cheonbu_myeongri_tongbyeonron_2020_isbn9788957175262',
      title: '천부명리학 : 통변론',
      author: '김용혁',
      publicationYear: 2020,
      publisherOrJournal: '내하출판사',
      sourceClass: 'published_practitioner_book_metadata',
      stableUrl: 'https://www.yes24.com/product/goods/91729012',
      doi: null,
      isbn13: '9788957175262',
      inspectedSurface: 'YES24 bibliographic metadata, book description, and table of contents',
    }),
    status: 'DISCOVERY_LEAD_ONLY',
    laneIds: Object.freeze([
      'T5_TEN_GOD_TO_CAREER_SEMANTIC_BRIDGE',
      'MULTI_PATTERN_CAREER_COMPOSITION_BRIDGE',
    ]),
    targetedGapIds: Object.freeze([...T5_GAPS, ...MULTI_GAP]),
    observedEvidence: Object.freeze([
      'The published table of contents has a Career chapter with distinct sections for Ten-God activity, Ten-God occupational aptitude, and occupational characteristics by Ten-God structure.',
      'Bibliographic metadata identifies 김용혁, 내하출판사, publication date 2020-08-25, 386 pages, and ISBN13 9788957175262.',
    ]),
    exactSourceIdentityObserved: true,
    stableReproducibleLocatorObserved: true,
    exactGapRelevantPassageLocatorObserved: false,
    originalSourceFullPassageInspected: false,
    explicitCareerOrWorkSemanticObserved: true,
    multiPatternOrStructureCareerSemanticObserved: true,
    natalStructuralModifierToCareerSemanticObserved: false,
    sourceConceptToCurrentClaimSemanticCorrespondenceEstablished: false,
    independentNormativeProvenanceObserved: false,
    numericStrengthWeightingObserved: false,
    yongshinOrXijiMethodologyObserved: false,
    gyeokgukMethodologyObserved: false,
    dynamicCareerChangeSemanticsObserved: false,
    natalCareerModifierSemanticsObserved: false,
    specificOccupationCohortOnly: false,
    methodologyCompatibilityWithCurrentT5T6Contract: 'NOT_EVALUABLE_WITHOUT_FULL_PASSAGE',
    admissionAcceptedUnderB10: false,
    authorityAcquiredByDiscovery: false,
    limitingReasons: Object.freeze([
      'The public surface exposes table-of-contents labels, not the exact source passages required to establish semantic correspondence to current T5 claims.',
      'No independent normative provenance has yet been established for the book’s proposed occupational mappings.',
      'The table of contents alone cannot establish a non-numeric multi-pattern composition policy.',
    ]),
  }),
  Object.freeze({
    candidateId: 'choi_eunhee_2020_prosperous_ten_stars_aptitude',
    sourceReference: Object.freeze({
      sourceId: 'source_choi_eunhee_2020_ten_stars_gyeokguk_aptitude_art002596247',
      title: '명리학의 적성론(適性論)에서 왕(旺)한 십성(十星)과 격국(格局)의 비교 연구',
      author: '최은희',
      publicationYear: 2020,
      publisherOrJournal: '인문사회 21, 11(3), 753-766',
      sourceClass: 'scholarly_secondary',
      stableUrl: 'https://www.kci.go.kr/kciportal/landing/article.kci?arti_id=ART002596247',
      doi: null,
      isbn13: null,
      inspectedSurface: 'KCI article metadata and abstract',
    }),
    status: 'INCOMPATIBLE_NUMERIC_STRENGTH_METHOD',
    laneIds: Object.freeze([
      'T5_TEN_GOD_TO_CAREER_SEMANTIC_BRIDGE',
      'MULTI_PATTERN_CAREER_COMPOSITION_BRIDGE',
    ]),
    targetedGapIds: Object.freeze([...T5_GAPS, ...MULTI_GAP]),
    observedEvidence: Object.freeze([
      'The abstract explicitly treats occupational aptitude through multiple Ten Stars rather than one single pattern.',
      'The method quantifies and sums Ten-Star capacities, classifies prosperity/decline, and derives occupational aptitude from prosperous Ten Stars.',
    ]),
    exactSourceIdentityObserved: true,
    stableReproducibleLocatorObserved: true,
    exactGapRelevantPassageLocatorObserved: true,
    originalSourceFullPassageInspected: false,
    explicitCareerOrWorkSemanticObserved: true,
    multiPatternOrStructureCareerSemanticObserved: true,
    natalStructuralModifierToCareerSemanticObserved: false,
    sourceConceptToCurrentClaimSemanticCorrespondenceEstablished: false,
    independentNormativeProvenanceObserved: true,
    numericStrengthWeightingObserved: true,
    yongshinOrXijiMethodologyObserved: true,
    gyeokgukMethodologyObserved: true,
    dynamicCareerChangeSemanticsObserved: false,
    natalCareerModifierSemanticsObserved: false,
    specificOccupationCohortOnly: false,
    methodologyCompatibilityWithCurrentT5T6Contract: 'INCOMPATIBLE_NUMERIC_WEIGHTING',
    admissionAcceptedUnderB10: false,
    authorityAcquiredByDiscovery: false,
    limitingReasons: Object.freeze([
      'Its core method numerically quantifies and aggregates Ten-Star strength, which is prohibited by the current contract.',
      'The abstract also situates the comparison against Gyeokguk and notes Yongshin as an unstudied complementary factor, so it cannot be silently reduced to the current T5 semantic substrate.',
    ]),
  }),
  Object.freeze({
    candidateId: 'kim_woojung_2025_sizhu_jingshuo_occupational_aptitude',
    sourceReference: Object.freeze({
      sourceId: 'source_kim_woojung_2025_sizhu_jingshuo_occupational_aptitude_art003288882',
      title: '사주정설의 직업적성론 연구',
      author: '김우정',
      publicationYear: 2025,
      publisherOrJournal: '동방문화와 사상 19, 65-99',
      sourceClass: 'scholarly_secondary',
      stableUrl: 'https://www.kci.go.kr/kciportal/mobile/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003288882',
      doi: '10.35203/EACT.2025.19.65',
      isbn13: null,
      inspectedSurface: 'KCI article metadata and abstract',
    }),
    status: 'PARTIAL_METHODOLOGY_MIXED',
    laneIds: Object.freeze([
      'T5_TEN_GOD_TO_CAREER_SEMANTIC_BRIDGE',
      'MULTI_PATTERN_CAREER_COMPOSITION_BRIDGE',
    ]),
    targetedGapIds: Object.freeze([...T5_GAPS, ...MULTI_GAP]),
    observedEvidence: Object.freeze([
      'The abstract explicitly discusses occupational aptitude and reports a framework combining Five-Element personality, Ten-God personality, Gyeokguk occupational fields, and Yongshin.',
      'It also states that the underlying Sizhu Jingshuo examples do not establish one common theory capable of covering all occupational aptitude.',
    ]),
    exactSourceIdentityObserved: true,
    stableReproducibleLocatorObserved: true,
    exactGapRelevantPassageLocatorObserved: true,
    originalSourceFullPassageInspected: false,
    explicitCareerOrWorkSemanticObserved: true,
    multiPatternOrStructureCareerSemanticObserved: true,
    natalStructuralModifierToCareerSemanticObserved: false,
    sourceConceptToCurrentClaimSemanticCorrespondenceEstablished: false,
    independentNormativeProvenanceObserved: true,
    numericStrengthWeightingObserved: false,
    yongshinOrXijiMethodologyObserved: true,
    gyeokgukMethodologyObserved: true,
    dynamicCareerChangeSemanticsObserved: false,
    natalCareerModifierSemanticsObserved: false,
    specificOccupationCohortOnly: false,
    methodologyCompatibilityWithCurrentT5T6Contract: 'MIXED_COMPETING_METHODOLOGY',
    admissionAcceptedUnderB10: false,
    authorityAcquiredByDiscovery: false,
    limitingReasons: Object.freeze([
      'The occupational framework explicitly depends on Gyeokguk and Yongshin in addition to Ten-God semantics.',
      'The abstract does not establish source-bound correspondence between the current exact T5/T6 claim primitives and a bounded Career synthesis rule.',
    ]),
  }),
  Object.freeze({
    candidateId: 'kim_taesoo_2022_financial_sales_profession',
    sourceReference: Object.freeze({
      sourceId: 'source_kim_taesoo_2022_financial_sales_profession_art002881716',
      title: '금융영업직에 관한 명리학적 고찰',
      author: '김태수',
      publicationYear: 2022,
      publisherOrJournal: '역사와 융합 6(3), 333-361',
      sourceClass: 'scholarly_secondary',
      stableUrl: 'https://www.kci.go.kr/kciportal/mobile/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002881716',
      doi: '10.55793/jkhc.2022.12.333',
      isbn13: null,
      inspectedSurface: 'KCI article metadata and abstract',
    }),
    status: 'PARTIAL_METHODOLOGY_MIXED',
    laneIds: Object.freeze(['T5_TEN_GOD_TO_CAREER_SEMANTIC_BRIDGE']),
    targetedGapIds: T5_GAPS,
    observedEvidence: Object.freeze([
      'The study explicitly investigates one profession, financial sales, using a cohort of 42 practitioners.',
      'Its method jointly compares Yin-Yang/Five Elements, Ten Stars, Twelve Stages, day stem, Gyeokguk, and Yongshin and concludes that comprehensive interaction analysis is necessary.',
    ]),
    exactSourceIdentityObserved: true,
    stableReproducibleLocatorObserved: true,
    exactGapRelevantPassageLocatorObserved: true,
    originalSourceFullPassageInspected: false,
    explicitCareerOrWorkSemanticObserved: true,
    multiPatternOrStructureCareerSemanticObserved: true,
    natalStructuralModifierToCareerSemanticObserved: false,
    sourceConceptToCurrentClaimSemanticCorrespondenceEstablished: false,
    independentNormativeProvenanceObserved: true,
    numericStrengthWeightingObserved: false,
    yongshinOrXijiMethodologyObserved: true,
    gyeokgukMethodologyObserved: true,
    dynamicCareerChangeSemanticsObserved: false,
    natalCareerModifierSemanticsObserved: false,
    specificOccupationCohortOnly: true,
    methodologyCompatibilityWithCurrentT5T6Contract: 'MIXED_COMPETING_METHODOLOGY',
    admissionAcceptedUnderB10: false,
    authorityAcquiredByDiscovery: false,
    limitingReasons: Object.freeze([
      'The result is profession-specific and cannot be generalized into a universal current T5 Career bridge.',
      'The stated method depends on Gyeokguk and Yongshin alongside other systems and therefore is not current-T5/T6-only authority.',
    ]),
  }),
  Object.freeze({
    candidateId: 'chenyuan_sizhu_yuce_rumen_branch_clash_profession_change_transcription',
    sourceReference: Object.freeze({
      sourceId: 'source_chenyuan_sizhu_yuce_rumen_branch_clash_profession_change_transcription',
      title: '四柱预测学入门（陈园）',
      author: '陈园',
      publicationYear: null,
      publisherOrJournal: 'web transcription surface; canonical edition not bound in this gate',
      sourceClass: 'unverified_transcription_surface',
      stableUrl: 'https://www.wangdailin.com/li/iuuetuf.html',
      doi: null,
      isbn13: null,
      inspectedSurface: 'web transcription reproducing 地支六冲主事 and later 用神/喜忌 material',
    }),
    status: 'TEMPORAL_SEMANTIC_MISMATCH',
    laneIds: Object.freeze(['T6_STRUCTURAL_QUALIFIER_TO_CAREER_MODIFIER_BRIDGE']),
    targetedGapIds: T6_GAPS,
    observedEvidence: Object.freeze([
      'The transcription labels some branch clashes as associated with profession change or residence-plus-profession change.',
      'The same transcription evaluates clash outcomes through favorable/unfavorable Yongshin/Xiji logic elsewhere in the method.',
    ]),
    exactSourceIdentityObserved: false,
    stableReproducibleLocatorObserved: true,
    exactGapRelevantPassageLocatorObserved: true,
    originalSourceFullPassageInspected: false,
    explicitCareerOrWorkSemanticObserved: true,
    multiPatternOrStructureCareerSemanticObserved: false,
    natalStructuralModifierToCareerSemanticObserved: false,
    sourceConceptToCurrentClaimSemanticCorrespondenceEstablished: false,
    independentNormativeProvenanceObserved: false,
    numericStrengthWeightingObserved: false,
    yongshinOrXijiMethodologyObserved: true,
    gyeokgukMethodologyObserved: false,
    dynamicCareerChangeSemanticsObserved: true,
    natalCareerModifierSemanticsObserved: false,
    specificOccupationCohortOnly: false,
    methodologyCompatibilityWithCurrentT5T6Contract: 'TEMPORAL_AND_METHODOLOGY_MISMATCH',
    admissionAcceptedUnderB10: false,
    authorityAcquiredByDiscovery: false,
    limitingReasons: Object.freeze([
      'Profession change is a dynamic/event semantic and is not equivalent to a natal qualitative modifier of an already-authorized Career pattern.',
      'Canonical edition/provenance is not bound by this discovery record.',
      'Yongshin/Xiji dependence cannot be imported into the current track without a separate methodology choice.',
    ]),
  }),
] as const satisfies readonly CareerT8BridgeDiscoveredCandidate[]);

function contentAddressedB10IdentityValid(
  b10: CareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReviewReport,
): boolean {
  const { reviewId, ...material } = b10;
  return (
    reviewId ===
    `career_t8_current_t5_t6_bridge_authority_acquisition_readiness_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB10Accepted(
  b10: CareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReviewReport,
): boolean {
  return (
    contentAddressedB10IdentityValid(b10) &&
    b10.reviewVersion ===
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION &&
    b10.status ===
      'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS' &&
    b10.decision ===
      'CURRENT_T5_T6_TO_CAREER_BRIDGE_GAP_SCOPED_ACQUISITION_CONTRACT_FROZEN_NO_AUTHORITY_ACQUIRED' &&
    b10.exactB9BoundaryAccepted &&
    b10.acquisitionTrackId === 'CURRENT_T5_T6_TO_CAREER_SEMANTIC_BRIDGE_AUTHORITY' &&
    deterministicContentHash(b10.allowedCurrentInputClaimTypes) ===
      deterministicContentHash(CAREER_T8_CURRENT_T5_T6_BRIDGE_INPUT_CLAIM_TYPES) &&
    b10.allowedCurrentInputClaimTypeCount === 5 &&
    deterministicContentHash(b10.discoveryLanes) ===
      deterministicContentHash(CAREER_T8_CURRENT_T5_T6_BRIDGE_DISCOVERY_LANES) &&
    b10.discoveryLaneCount === 3 &&
    b10.admissionContractCount === 6 &&
    b10.allSixGapsCoveredExactlyOnceByAdmissionContract &&
    b10.allSixGapsAssignedExactlyOnceToDiscoveryLane &&
    b10.currentT5T6ClaimSemanticsOnly &&
    b10.sourceConceptToCurrentClaimSemanticCorrespondenceRequired &&
    b10.inputMethodologyCompatibilityRequired &&
    b10.qianliYongshinXijiTrackIncludedInThisAcquisition === false &&
    b10.competingMethodologyMayBeSilentlyAdopted === false &&
    b10.crossCandidateCompositionForSameGapAuthorized === false &&
    b10.candidateDiscoveryPerformedByThisGate === false &&
    b10.authorityAcquiredByThisGate === false &&
    b10.authorityGapClosedByThisGate === false &&
    b10.t8RuleAuthoringAuthorized === false &&
    b10.personalizedT8PackCreationAuthorized === false &&
    b10.productionPromotionAuthorized === false &&
    deterministicContentHash(b10.controlIds) ===
      deterministicContentHash(CAREER_T8_CURRENT_T5_T6_BRIDGE_AUTHORITY_ACQUISITION_CONTROL_IDS) &&
    b10.controlsFrozen &&
    b10.controlCount === 16 &&
    b10.recommendedNextGate ===
      'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
  );
}

function laneResults(): readonly CareerT8BridgeDiscoveryLaneResult[] {
  return Object.freeze(
    CAREER_T8_CURRENT_T5_T6_BRIDGE_DISCOVERY_LANES.map((lane) => {
      const candidates = CAREER_T8_CURRENT_T5_T6_BRIDGE_DISCOVERED_CANDIDATES.filter(
        (candidate) => candidate.laneIds.includes(lane.laneId),
      );
      let finding: string;
      if (lane.laneId === 'T5_TEN_GOD_TO_CAREER_SEMANTIC_BRIDGE') {
        finding =
          'Direct occupational semantics were discovered, but the strongest book lead lacks exact passage access and the scholarly candidates either use numeric strength aggregation or mix Gyeokguk/Yongshin with Ten-God analysis.';
      } else if (lane.laneId === 'T6_STRUCTURAL_QUALIFIER_TO_CAREER_MODIFIER_BRIDGE') {
        finding =
          'A profession-change clash transcription was found, but it is dynamic rather than natal, lacks canonical provenance, and is methodologically tied to Yongshin/Xiji; no admissible natal Career modifier bridge was found.';
      } else {
        finding =
          'Multi-pattern occupational semantics were discovered only as an uninspected book-TOC lead or through a numeric/mixed-method framework; no non-numeric current-contract composition authority was found.';
      }
      return Object.freeze({
        laneId: lane.laneId,
        searched: true,
        candidateIds: Object.freeze(candidates.map((candidate) => candidate.candidateId)),
        candidateCount: candidates.length,
        admissionCompatibleCandidateCount: 0,
        laneAuthorityAcquired: false,
        finding,
      });
    }),
  );
}

function finalized(
  material: Omit<
    CareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidenceReport,
    'evidenceId'
  >,
): CareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidenceReport {
  return {
    evidenceId: `career_t8_current_t5_t6_bridge_candidate_discovery_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
  b10: CareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReviewReport,
): CareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidenceReport {
  const accepted = exactB10Accepted(b10);
  const candidates = accepted
    ? CAREER_T8_CURRENT_T5_T6_BRIDGE_DISCOVERED_CANDIDATES
    : Object.freeze([]);
  const lanes = accepted ? laneResults() : Object.freeze([]);

  return finalized({
    evidenceVersion:
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
      : 'UPSTREAM_B10_BOUNDARY_INVALID',
    decision: accepted
      ? 'FIVE_BRIDGE_CANDIDATES_DISCOVERED_ZERO_ADMISSION_COMPATIBLE_NO_AUTHORITY_ACQUIRED_ALL_SIX_GAPS_OPEN'
      : 'CURRENT_T5_T6_CAREER_BRIDGE_CANDIDATE_DISCOVERY_NOT_ESTABLISHED',
    upstreamB10ReviewId: b10.reviewId,
    exactB10BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    discoveryPerformed: accepted,
    inspectedCandidateCount: accepted ? 5 : 0,
    inspectedCandidates: candidates,
    discoveryLaneCount: accepted ? 3 : 0,
    laneResults: lanes,
    leadOnlyCandidateCount: accepted ? 1 : 0,
    methodologyMixedCandidateCount: accepted ? 2 : 0,
    numericIncompatibleCandidateCount: accepted ? 1 : 0,
    temporalMismatchCandidateCount: accepted ? 1 : 0,
    admissionCompatibleCandidateCount: 0,
    registeredCandidateCount: 0,
    authorityAcceptedCandidateCount: 0,
    authorityGapClosedCount: 0,
    allSixGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    strongestCurrentLeadCandidateId: accepted ? 'cheonbu_myeongri_tongbyeonron_2020' : null,
    strongestCurrentLeadRequiresExactPassageAccess: accepted,
    t5LaneHasPromisingButUnadmittedEvidence: accepted,
    t6LaneHasNoNatalMethodologyCompatibleBridgeCandidate: accepted,
    multiPatternLaneHasNoNonNumericMethodologyCompatibleBridgeCandidate: accepted,
    numericStrengthMethodRejectedFromCurrentTrack: accepted,
    competingYongshinXijiMethodologyDeferred: accepted,
    dynamicCareerChangeNotPromotedToNatalModifier: accepted,
    currentClaimSemanticCorrespondenceEstablishedByThisGate: false,
    sameGapCrossCandidateCompositionPerformed: false,
    sameGapCrossCandidateCompositionAuthorized: false,
    candidateRegisteredByThisGate: false,
    requirementCoverageEvaluatedByThisGate: false,
    authorityAcquiredByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted
      ? CAREER_T8_CURRENT_T5_T6_BRIDGE_CANDIDATE_DISCOVERY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      candidateEvidenceRecordsCreated: accepted ? 5 : 0,
      registeredSourcesCreated: 0,
      methodologyDefinitionsCreated: 0,
      methodologyChoicesAdopted: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    }),
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW',
  });
}
