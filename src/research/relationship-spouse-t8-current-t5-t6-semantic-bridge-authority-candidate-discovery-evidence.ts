import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { GENERAL_NATAL_CONCLUSION_SOURCE } from './general-natal-conclusion-synthesis-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS,
  type RelationshipSpouseT8AuthorityGapId,
} from './relationship-spouse-t8-authority-acquisition-readiness-review.js';
import { RELATIONSHIP_SPOUSE_T8_DISCOVERED_AUTHORITY_CANDIDATES } from './relationship-spouse-t8-authority-candidate-discovery-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_BRIDGE_INPUT_CLAIM_TYPES,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_AUTHORITY_ACQUISITION_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_DISCOVERY_LANES,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
  type RelationshipSpouseT8CurrentBridgeDiscoveryLaneId,
  type RelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReviewReport,
} from './relationship-spouse-t8-current-t5-t6-semantic-bridge-authority-acquisition-readiness-review.js';

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-current-t5-t6-semantic-bridge-authority-candidate-discovery-evidence-v1' as const;

export type RelationshipSpouseT8CurrentBridgeCandidateStatus =
  | 'SAME_SOURCE_PARTIAL_VOCABULARY_BRIDGE_SCOPE_BLOCKED'
  | 'PUBLIC_TRANSCRIPTION_SEARCH_LEAD_ONLY'
  | 'COMPETING_METHODOLOGY_NO_CURRENT_T5_BRIDGE'
  | 'TRANSCRIPTION_LEAD_COMPETING_METHODOLOGY';

export type RelationshipSpouseT8CurrentBridgeSourceClass =
  | 'current_t5_registered_cross_reference'
  | 'public_classical_transcription_lead'
  | 'existing_primary_scan_discovery'
  | 'existing_scan_identity_transcription_lead';

export type RelationshipSpouseT8CurrentBridgeMethodCompatibility =
  | 'PARTIAL_SAME_SOURCE_VOCABULARY_CORRESPONDENCE_SCOPE_BLOCKED'
  | 'NOT_EVALUABLE_SEARCH_SNIPPET_ONLY'
  | 'COMPETING_YONGSHIN_XIJI_GYEOKGUK_METHOD'
  | 'COMPETING_WEALTH_XISHEN_STRENGTH_METHOD';

export type RelationshipSpouseT8CurrentBridgeModernScopeCompatibility =
  | 'HISTORICAL_GENDER_ROLE_NOT_PRODUCT_COMPATIBLE'
  | 'NOT_EVALUABLE_WITHOUT_EXACT_PASSAGE_AND_SCOPE_REVIEW';

export interface RelationshipSpouseT8CurrentBridgeCandidateSourceReference {
  sourceId: string;
  title: string;
  sourceClass: RelationshipSpouseT8CurrentBridgeSourceClass;
  stableUrl: string;
  locator: string;
  inspectedSurface: string;
  currentT5RegisteredSource: boolean;
}

export interface RelationshipSpouseT8CurrentBridgeDiscoveredCandidate {
  candidateId: string;
  sourceReference: RelationshipSpouseT8CurrentBridgeCandidateSourceReference;
  status: RelationshipSpouseT8CurrentBridgeCandidateStatus;
  laneIds: readonly RelationshipSpouseT8CurrentBridgeDiscoveryLaneId[];
  targetedGapIds: readonly RelationshipSpouseT8AuthorityGapId[];
  potentialCurrentT5ClaimTypes: readonly string[];
  correspondenceEstablishedCurrentT5ClaimTypes: readonly string[];
  exactSourceIdentityObserved: boolean;
  stableReproducibleLocatorObserved: boolean;
  exactGapRelevantPassageLocatorObserved: boolean;
  originalPrimaryWitnessPassageInspected: boolean;
  explicitSpouseSemanticObserved: boolean;
  sourceConceptToCurrentT5FamilySemanticCorrespondenceEstablished: boolean;
  explicitApplicabilityBoundaryObserved: boolean;
  explicitContextOrExceptionTreatmentObserved: boolean;
  independentNormativeProvenanceObserved: boolean;
  historicalGenderRoleConventionObserved: boolean;
  partnerAttributeOrOutcomeLanguageObserved: boolean;
  currentInputMethodologyCompatibility: RelationshipSpouseT8CurrentBridgeMethodCompatibility;
  modernProductScopeCompatibility: RelationshipSpouseT8CurrentBridgeModernScopeCompatibility;
  currentT6InputPathEstablishedByCandidate: false;
  admissionCompatibleCandidate: false;
  authorityAcquiredByDiscovery: false;
  observedEvidence: readonly string[];
  limitingReasons: readonly string[];
}

export interface RelationshipSpouseT8CurrentBridgeDiscoveryLaneResult {
  laneId: RelationshipSpouseT8CurrentBridgeDiscoveryLaneId;
  searched: boolean;
  candidateIds: readonly string[];
  candidateCount: number;
  establishedCurrentT5CorrespondenceCandidateCount: number;
  admissionCompatibleCandidateCount: 0;
  laneAuthorityAcquired: false;
  finding: string;
}

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_CANDIDATE_DISCOVERY_CONTROL_IDS = Object.freeze([
  'DISCOVERY_EVIDENCE_IS_NOT_AUTHORITY_ACCEPTANCE',
  'CURRENT_T5_REGISTERED_SOURCE_MAY_BE_REINSPECTED_WITHOUT_EXPANDING_ITS_EXISTING_METHODOLOGY',
  'SAME_SOURCE_VOCABULARY_CORRESPONDENCE_DOES_NOT_AUTHORIZE_SPOUSE_SEMANTICS',
  'WEALTH_FAMILY_TO_WIFE_LANGUAGE_IS_HISTORICAL_GENDER_ROLE_EVIDENCE_NOT_GENDER_NEUTRAL_PRODUCT_AUTHORITY',
  'OFFICER_TO_HUSBAND_AND_WEALTH_TO_WIFE_SEARCH_SNIPPET_IS_DISCOVERY_LEAD_ONLY',
  'PUBLIC_TRANSCRIPTION_DOES_NOT_SUBSTITUTE_FOR_REQUIRED_PRIMARY_WITNESS_INSPECTION',
  'ZIPING_WIFE_PALACE_YONGSHIN_XIJI_GYEOKGUK_METHOD_MAY_NOT_BE_SILENTLY_IMPORTED',
  'DITIAN_WEALTH_WIFE_XISHEN_STRENGTH_METHOD_MAY_NOT_BE_SILENTLY_IMPORTED',
  'NO_CURRENT_RELATIONSHIP_T6_INPUT_PATH_IS_CREATED_BY_DISCOVERY',
  'NO_CROSS_CANDIDATE_STITCHING_WITHIN_ONE_GAP',
  'NO_HISTORICAL_PARTNER_ATTRIBUTE_OR_OUTCOME_LANGUAGE_IS_PRODUCT_AUTHORITY',
  'NO_SPOUSE_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

export interface RelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
    | 'UPSTREAM_CURRENT_BRIDGE_READINESS_BOUNDARY_INVALID';
  decision:
    | 'FOUR_BRIDGE_LEADS_DISCOVERED_ONE_SAME_SOURCE_WEALTH_VOCABULARY_CORRESPONDENCE_ZERO_ADMISSION_COMPATIBLE_NO_AUTHORITY_ACQUIRED_ALL_FIVE_GAPS_OPEN'
    | 'RELATIONSHIP_SPOUSE_T8_CURRENT_BRIDGE_CANDIDATE_DISCOVERY_NOT_ESTABLISHED';
  upstreamReadinessReviewId: string;
  exactReadinessBoundaryAccepted: boolean;
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  discoveryPerformed: boolean;
  inspectedCandidateCount: 4 | 0;
  inspectedCandidates: readonly RelationshipSpouseT8CurrentBridgeDiscoveredCandidate[];
  discoveryLaneCount: 2 | 0;
  laneResults: readonly RelationshipSpouseT8CurrentBridgeDiscoveryLaneResult[];
  sameSourceCurrentT5CandidateCount: 1 | 0;
  sameSourceCurrentT5VocabularyCorrespondenceCandidateCount: 1 | 0;
  publicTranscriptionSearchLeadCount: 1 | 0;
  competingMethodologyCandidateCount: 2 | 0;
  admissionCompatibleCandidateCount: 0;
  registeredCandidateCount: 0;
  authorityAcceptedCandidateCount: 0;
  authorityGapClosedCount: 0;
  allFiveGapsRemainOpen: true;
  unresolvedGapIds: readonly RelationshipSpouseT8AuthorityGapId[];
  strongestCurrentLeadCandidateId: string | null;
  strongestCurrentLeadCurrentT5ClaimTypes: readonly string[];
  strongestCurrentLeadRequiresPrimaryWitnessBinding: boolean;
  strongestCurrentLeadRequiresModernScopeRemediation: boolean;
  wealthFamilyHistoricalSpouseVocabularyCorrespondenceObserved: boolean;
  officerFamilyHistoricalSpouseVocabularyLeadObserved: boolean;
  officerFamilyHistoricalSpouseVocabularyCorrespondenceEstablished: false;
  currentT6InputPathEstablished: false;
  currentClaimSemanticCorrespondenceEstablishedForAllFiveDirectT5Claims: false;
  modernProductScopeCompatibilityEstablishedByThisGate: false;
  primaryWitnessRequirementSatisfiedByStrongestLead: false;
  sameGapCrossCandidateCompositionPerformed: false;
  sameGapCrossCandidateCompositionAuthorized: false;
  candidateRegisteredByThisGate: false;
  requirementCoverageEvaluatedByThisGate: false;
  authorityAcquiredByThisGate: false;
  spouseT8RuleAuthoringAuthorized: false;
  spouseT8ClaimTypeCreationAuthorized: false;
  spouseInterpretationPackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  compatibilityAuthorityAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_CANDIDATE_DISCOVERY_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    candidateEvidenceRecordsCreated: 4 | 0;
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
    | 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW'
    | 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW';
}

const ALL_GAP_IDS = Object.freeze(
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.map((requirement) => requirement.gapId),
);
const WEALTH_FAMILY_CLAIM = 'TEN_GOD_FAMILY_WEALTH_PRESENT';
const OFFICER_FAMILY_CLAIM = 'TEN_GOD_FAMILY_OFFICER_PRESENT';

function laneIds(
  ...ids: RelationshipSpouseT8CurrentBridgeDiscoveryLaneId[]
): readonly RelationshipSpouseT8CurrentBridgeDiscoveryLaneId[] {
  return Object.freeze(ids);
}

function gapIds(
  ...ids: RelationshipSpouseT8AuthorityGapId[]
): readonly RelationshipSpouseT8AuthorityGapId[] {
  return Object.freeze(ids);
}

function normalizedSource(
  sourceId: string,
  title: string,
  sourceClass: RelationshipSpouseT8CurrentBridgeSourceClass,
  stableUrl: string,
  locator: string,
  inspectedSurface: string,
  currentT5RegisteredSource: boolean,
): RelationshipSpouseT8CurrentBridgeCandidateSourceReference {
  return Object.freeze({
    sourceId,
    title,
    sourceClass,
    stableUrl,
    locator,
    inspectedSurface,
    currentT5RegisteredSource,
  });
}

function candidateId(material: object): string {
  return `relationship_spouse_t8_current_bridge_candidate_${deterministicContentHash(material).slice(0, 20)}`;
}

function samyeongV5CurrentSourceCandidate(): RelationshipSpouseT8CurrentBridgeDiscoveredCandidate {
  const sourceReference = normalizedSource(
    GENERAL_NATAL_CONCLUSION_SOURCE.sourceId,
    GENERAL_NATAL_CONCLUSION_SOURCE.title,
    'current_t5_registered_cross_reference',
    GENERAL_NATAL_CONCLUSION_SOURCE.url ?? '',
    '卷五 / 論古人立印食官財名義',
    'Current repository source identity plus directly inspected Wikisource transcription of the named section',
    true,
  );
  const material = {
    sourceId: sourceReference.sourceId,
    currentT5ClaimTypes: [WEALTH_FAMILY_CLAIM],
    status: 'SAME_SOURCE_PARTIAL_VOCABULARY_BRIDGE_SCOPE_BLOCKED' as const,
  };
  return Object.freeze({
    candidateId: candidateId(material),
    sourceReference,
    status: material.status,
    laneIds: laneIds(
      'CURRENT_T5_FAMILY_TO_SPOUSE_SEMANTIC_BRIDGE',
      'CURRENT_T5_FAMILY_TO_SPOUSE_COMPOSITION_AND_BOUNDARY_BRIDGE',
    ),
    targetedGapIds: ALL_GAP_IDS,
    potentialCurrentT5ClaimTypes: Object.freeze([WEALTH_FAMILY_CLAIM]),
    correspondenceEstablishedCurrentT5ClaimTypes: Object.freeze([WEALTH_FAMILY_CLAIM]),
    exactSourceIdentityObserved: true,
    stableReproducibleLocatorObserved: true,
    exactGapRelevantPassageLocatorObserved: true,
    originalPrimaryWitnessPassageInspected: false,
    explicitSpouseSemanticObserved: true,
    sourceConceptToCurrentT5FamilySemanticCorrespondenceEstablished: true,
    explicitApplicabilityBoundaryObserved: true,
    explicitContextOrExceptionTreatmentObserved: true,
    independentNormativeProvenanceObserved: false,
    historicalGenderRoleConventionObserved: true,
    partnerAttributeOrOutcomeLanguageObserved: true,
    currentInputMethodologyCompatibility:
      'PARTIAL_SAME_SOURCE_VOCABULARY_CORRESPONDENCE_SCOPE_BLOCKED',
    modernProductScopeCompatibility: 'HISTORICAL_GENDER_ROLE_NOT_PRODUCT_COMPATIBLE',
    currentT6InputPathEstablishedByCandidate: false,
    admissionCompatibleCandidate: false,
    authorityAcquiredByDiscovery: false,
    observedEvidence: Object.freeze([
      'The same 三命通會 volume-five source already registered for current T5 family-presence semantics explicitly explains the historical 妻財 naming of the wealth relation.',
      'The inspected section distinguishes 正妻 and 偏妻 through the same 克我/我克 Ten-God vocabulary family from which current wealth-family semantics are derived.',
      'This establishes a source-bound vocabulary correspondence lead for the current wealth-family claim, not a gender-neutral spouse product rule.',
    ]),
    limitingReasons: Object.freeze([
      'The current registered source is a cross-reference transcription surface; the required original primary witness passage has not been bound and inspected for this bridge admission.',
      'The spouse mapping is historically wife-specific and embeds sex/gender and household-role assumptions that cannot be universalized into the modern product contract.',
      'The current T5 claim records neutral wealth-family presence only; it does not itself authorize spouse identity, partner attributes, relationship outcomes, or timing.',
      'No current relationship T6 input exists, and this candidate cannot create one.',
    ]),
  });
}

function samyeongV6OfficerHusbandLead(): RelationshipSpouseT8CurrentBridgeDiscoveredCandidate {
  const sourceReference = normalizedSource(
    'source_samyeong_tonghoe_v6_four_libraries_spouse_role_transcription_lead',
    '三命通會（四庫全書本）卷六',
    'public_classical_transcription_lead',
    'https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B706',
    '卷六 / 從象 search lead',
    'Wikisource page identity and search-result excerpt exposing 官煞者夫 / 財者妻 terminology',
    false,
  );
  const material = {
    sourceId: sourceReference.sourceId,
    currentT5ClaimTypes: [OFFICER_FAMILY_CLAIM, WEALTH_FAMILY_CLAIM],
    status: 'PUBLIC_TRANSCRIPTION_SEARCH_LEAD_ONLY' as const,
  };
  return Object.freeze({
    candidateId: candidateId(material),
    sourceReference,
    status: material.status,
    laneIds: laneIds('CURRENT_T5_FAMILY_TO_SPOUSE_SEMANTIC_BRIDGE'),
    targetedGapIds: gapIds(
      'SPOUSE_SPECIFIC_SEMANTIC_BINDING_MISSING',
      'SPOUSE_APPLICABILITY_BOUNDARY_MISSING',
      'SPOUSE_NORMATIVE_PROVENANCE_REVIEW_MISSING',
    ),
    potentialCurrentT5ClaimTypes: Object.freeze([OFFICER_FAMILY_CLAIM, WEALTH_FAMILY_CLAIM]),
    correspondenceEstablishedCurrentT5ClaimTypes: Object.freeze([]),
    exactSourceIdentityObserved: true,
    stableReproducibleLocatorObserved: true,
    exactGapRelevantPassageLocatorObserved: false,
    originalPrimaryWitnessPassageInspected: false,
    explicitSpouseSemanticObserved: true,
    sourceConceptToCurrentT5FamilySemanticCorrespondenceEstablished: false,
    explicitApplicabilityBoundaryObserved: false,
    explicitContextOrExceptionTreatmentObserved: false,
    independentNormativeProvenanceObserved: false,
    historicalGenderRoleConventionObserved: true,
    partnerAttributeOrOutcomeLanguageObserved: false,
    currentInputMethodologyCompatibility: 'NOT_EVALUABLE_SEARCH_SNIPPET_ONLY',
    modernProductScopeCompatibility: 'NOT_EVALUABLE_WITHOUT_EXACT_PASSAGE_AND_SCOPE_REVIEW',
    currentT6InputPathEstablishedByCandidate: false,
    admissionCompatibleCandidate: false,
    authorityAcquiredByDiscovery: false,
    observedEvidence: Object.freeze([
      'The public discovery surface exposes a direct historical role vocabulary lead linking 官煞 with husband and 財 with wife.',
      'The terminology overlaps the current officer-family and wealth-family vocabulary, but only a search lead has been inspected at this gate.',
    ]),
    limitingReasons: Object.freeze([
      'The exact passage has not been rebound to a directly inspected page segment or primary witness.',
      'Search-result wording cannot establish current-claim semantic correspondence or normative provenance.',
      'The male/female spouse-role split requires explicit modern-scope adjudication before any product use.',
    ]),
  });
}

function existingZipingCandidate(): RelationshipSpouseT8CurrentBridgeDiscoveredCandidate {
  const source = RELATIONSHIP_SPOUSE_T8_DISCOVERED_AUTHORITY_CANDIDATES.find(
    (candidate) => candidate.sourceReference.title === '子平真詮',
  );
  if (!source) {
    throw new Error('Expected governed 子平真詮 spouse discovery candidate');
  }
  const sourceReference = normalizedSource(
    source.sourceReference.sourceId,
    source.sourceReference.title,
    'existing_primary_scan_discovery',
    source.sourceReference.url ?? '',
    `${source.sourceReference.locator?.section ?? ''} / ${source.sourceReference.locator?.page ?? ''}`,
    'Existing governed discovery record with exact primary page inspection',
    false,
  );
  const material = {
    sourceId: sourceReference.sourceId,
    status: 'COMPETING_METHODOLOGY_NO_CURRENT_T5_BRIDGE' as const,
  };
  return Object.freeze({
    candidateId: candidateId(material),
    sourceReference,
    status: material.status,
    laneIds: laneIds(
      'CURRENT_T5_FAMILY_TO_SPOUSE_SEMANTIC_BRIDGE',
      'CURRENT_T5_FAMILY_TO_SPOUSE_COMPOSITION_AND_BOUNDARY_BRIDGE',
    ),
    targetedGapIds: ALL_GAP_IDS,
    potentialCurrentT5ClaimTypes: Object.freeze([]),
    correspondenceEstablishedCurrentT5ClaimTypes: Object.freeze([]),
    exactSourceIdentityObserved: source.sourceIdentityVerified,
    stableReproducibleLocatorObserved: true,
    exactGapRelevantPassageLocatorObserved: source.exactPrimaryWitnessPassageLocatorVerified,
    originalPrimaryWitnessPassageInspected: source.exactPrimaryWitnessPassageLocatorVerified,
    explicitSpouseSemanticObserved: source.spouseBindingObserved,
    sourceConceptToCurrentT5FamilySemanticCorrespondenceEstablished: false,
    explicitApplicabilityBoundaryObserved: true,
    explicitContextOrExceptionTreatmentObserved: true,
    independentNormativeProvenanceObserved: source.independentNormativeProvenanceObserved,
    historicalGenderRoleConventionObserved: true,
    partnerAttributeOrOutcomeLanguageObserved: true,
    currentInputMethodologyCompatibility: 'COMPETING_YONGSHIN_XIJI_GYEOKGUK_METHOD',
    modernProductScopeCompatibility: 'HISTORICAL_GENDER_ROLE_NOT_PRODUCT_COMPATIBLE',
    currentT6InputPathEstablishedByCandidate: false,
    admissionCompatibleCandidate: false,
    authorityAcquiredByDiscovery: false,
    observedEvidence: Object.freeze([
      'The existing governed primary-page candidate explicitly binds spouse interpretation to 妻宮 with 月令用神, 喜忌 and 格局 context.',
      'Its method inputs are not the five current neutral T5 family-presence claims and therefore do not establish the current bridge.',
    ]),
    limitingReasons: Object.freeze([
      'Using 妻宮/用神/喜忌/格局 as bridge inputs would silently import a competing historical method outside the current acquisition contract.',
      'Historical wife-role and partner-attribute language remains outside modern product scope.',
    ]),
  });
}

function existingDitianCandidate(): RelationshipSpouseT8CurrentBridgeDiscoveredCandidate {
  const source = RELATIONSHIP_SPOUSE_T8_DISCOVERED_AUTHORITY_CANDIDATES.find(
    (candidate) => candidate.sourceReference.title === '滴天髓闡微',
  );
  if (!source) {
    throw new Error('Expected governed 滴天髓闡微 spouse discovery candidate');
  }
  const sourceReference = normalizedSource(
    source.sourceReference.sourceId,
    source.sourceReference.title,
    'existing_scan_identity_transcription_lead',
    source.sourceReference.url ?? '',
    `${source.sourceReference.locator?.section ?? ''} / ${source.sourceReference.locator?.page ?? ''}`,
    'Existing governed scan-identity plus transcription discovery record',
    false,
  );
  const material = {
    sourceId: sourceReference.sourceId,
    status: 'TRANSCRIPTION_LEAD_COMPETING_METHODOLOGY' as const,
  };
  return Object.freeze({
    candidateId: candidateId(material),
    sourceReference,
    status: material.status,
    laneIds: laneIds(
      'CURRENT_T5_FAMILY_TO_SPOUSE_SEMANTIC_BRIDGE',
      'CURRENT_T5_FAMILY_TO_SPOUSE_COMPOSITION_AND_BOUNDARY_BRIDGE',
    ),
    targetedGapIds: ALL_GAP_IDS,
    potentialCurrentT5ClaimTypes: Object.freeze([WEALTH_FAMILY_CLAIM]),
    correspondenceEstablishedCurrentT5ClaimTypes: Object.freeze([]),
    exactSourceIdentityObserved: source.sourceIdentityVerified,
    stableReproducibleLocatorObserved: true,
    exactGapRelevantPassageLocatorObserved: false,
    originalPrimaryWitnessPassageInspected: false,
    explicitSpouseSemanticObserved: source.spouseBindingObserved,
    sourceConceptToCurrentT5FamilySemanticCorrespondenceEstablished: false,
    explicitApplicabilityBoundaryObserved: true,
    explicitContextOrExceptionTreatmentObserved: true,
    independentNormativeProvenanceObserved: false,
    historicalGenderRoleConventionObserved: true,
    partnerAttributeOrOutcomeLanguageObserved: true,
    currentInputMethodologyCompatibility: 'COMPETING_WEALTH_XISHEN_STRENGTH_METHOD',
    modernProductScopeCompatibility: 'HISTORICAL_GENDER_ROLE_NOT_PRODUCT_COMPATIBLE',
    currentT6InputPathEstablishedByCandidate: false,
    admissionCompatibleCandidate: false,
    authorityAcquiredByDiscovery: false,
    observedEvidence: Object.freeze([
      'The existing governed transcription lead explicitly treats 財 as a wife-related input and requires context-sensitive 財神/喜神/day-master-strength reasoning.',
      'The 財 vocabulary overlaps the current wealth-family concept, but exact primary-page binding and current-method correspondence remain unresolved.',
    ]),
    limitingReasons: Object.freeze([
      'The exact target passage has not been bound to and inspected in the identified primary scan.',
      '財神/喜神/day-master-strength reasoning is not the current neutral family-presence input contract and cannot be silently imported.',
      'Historical wife-role and deterministic partner language is not modern product authority.',
    ]),
  });
}

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_DISCOVERED_CANDIDATES = Object.freeze([
  samyeongV5CurrentSourceCandidate(),
  samyeongV6OfficerHusbandLead(),
  existingZipingCandidate(),
  existingDitianCandidate(),
] as const);

function contentAddressedReadinessIdentityValid(
  readiness: RelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReviewReport,
): boolean {
  const { reviewId, ...material } = readiness;
  return (
    reviewId ===
    `relationship_spouse_t8_current_t5_t6_bridge_acquisition_readiness_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactReadinessBoundaryAccepted(
  readiness: RelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReviewReport,
): boolean {
  return (
    contentAddressedReadinessIdentityValid(readiness) &&
    readiness.reviewVersion ===
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION &&
    readiness.status ===
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS' &&
    readiness.decision ===
      'CURRENT_T5_FAMILY_SUBSTRATE_FROZEN_NO_CURRENT_RELATIONSHIP_T6_INPUT_PATH_SOURCE_DISCOVERY_AUTHORIZED_ONLY_NO_AUTHORITY_ACQUIRED' &&
    readiness.exactResidualBoundaryAccepted &&
    readiness.acquisitionTrackId === 'CURRENT_SPOUSE_T5_T6_SEMANTIC_BRIDGE_AUTHORITY' &&
    readiness.currentDirectT5InputClaimTypeCount === 5 &&
    deterministicContentHash(readiness.currentDirectT5InputClaimTypes) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_CURRENT_T5_BRIDGE_INPUT_CLAIM_TYPES) &&
    readiness.currentDirectT6InputClaimTypeCount === 0 &&
    readiness.currentDirectT6InputClaimTypes.length === 0 &&
    readiness.currentRelationshipT6InputPathEstablished === false &&
    readiness.t6BridgeDiscoveryLaneAuthorized === false &&
    readiness.discoveryLaneCount === 2 &&
    deterministicContentHash(readiness.discoveryLanes) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_DISCOVERY_LANES) &&
    readiness.admissionContractCount === 5 &&
    readiness.allFiveGapsCoveredExactlyOnceByAdmissionContract &&
    readiness.allFiveGapsAssignedExactlyOnceToDiscoveryLane &&
    readiness.candidateDiscoveryPerformedByThisGate === false &&
    readiness.authorityAcquiredByThisGate === false &&
    readiness.authorityGapClosedByThisGate === false &&
    readiness.spouseT8RuleAuthoringAuthorized === false &&
    readiness.spouseT8ClaimTypeCreationAuthorized === false &&
    readiness.spouseInterpretationPackCreationAuthorized === false &&
    readiness.consumerNarrativeAuthorized === false &&
    readiness.previewDefaultSwitchAuthorized === false &&
    readiness.productionPromotionAuthorized === false &&
    readiness.controlsFrozen &&
    readiness.controlCount ===
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_AUTHORITY_ACQUISITION_CONTROL_IDS.length &&
    readiness.recommendedNextGate ===
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
  );
}

function laneResults(
  candidates: readonly RelationshipSpouseT8CurrentBridgeDiscoveredCandidate[],
): readonly RelationshipSpouseT8CurrentBridgeDiscoveryLaneResult[] {
  return Object.freeze(
    RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_DISCOVERY_LANES.map((lane) => {
      const laneCandidates = candidates.filter((candidate) => candidate.laneIds.includes(lane.laneId));
      return Object.freeze({
        laneId: lane.laneId,
        searched: true,
        candidateIds: Object.freeze(laneCandidates.map((candidate) => candidate.candidateId)),
        candidateCount: laneCandidates.length,
        establishedCurrentT5CorrespondenceCandidateCount: laneCandidates.filter(
          (candidate) => candidate.sourceConceptToCurrentT5FamilySemanticCorrespondenceEstablished,
        ).length,
        admissionCompatibleCandidateCount: 0 as const,
        laneAuthorityAcquired: false as const,
        finding:
          lane.laneId === 'CURRENT_T5_FAMILY_TO_SPOUSE_SEMANTIC_BRIDGE'
            ? 'One same-source wealth-family vocabulary correspondence lead exists, but no candidate satisfies primary-witness, current-method and modern-scope admission requirements.'
            : 'Historical composition and exception methods were observed, but none operate solely on the current T5 family-presence substrate under modern product scope.',
      });
    }),
  );
}

function finalized(
  material: Omit<
    RelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidenceReport,
    'evidenceId'
  >,
): RelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidenceReport {
  return {
    evidenceId: `relationship_spouse_t8_current_bridge_candidate_discovery_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
  readiness: RelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReviewReport,
): RelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidenceReport {
  const accepted = exactReadinessBoundaryAccepted(readiness);
  const candidates = accepted
    ? RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_DISCOVERED_CANDIDATES
    : Object.freeze([] as RelationshipSpouseT8CurrentBridgeDiscoveredCandidate[]);
  const lanes = accepted ? laneResults(candidates) : Object.freeze([]);
  const strongest = accepted ? candidates[0] : undefined;
  const unresolvedGapIds = Object.freeze([...ALL_GAP_IDS]);

  return finalized({
    evidenceVersion:
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
      : 'UPSTREAM_CURRENT_BRIDGE_READINESS_BOUNDARY_INVALID',
    decision: accepted
      ? 'FOUR_BRIDGE_LEADS_DISCOVERED_ONE_SAME_SOURCE_WEALTH_VOCABULARY_CORRESPONDENCE_ZERO_ADMISSION_COMPATIBLE_NO_AUTHORITY_ACQUIRED_ALL_FIVE_GAPS_OPEN'
      : 'RELATIONSHIP_SPOUSE_T8_CURRENT_BRIDGE_CANDIDATE_DISCOVERY_NOT_ESTABLISHED',
    upstreamReadinessReviewId: readiness.reviewId,
    exactReadinessBoundaryAccepted: accepted,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    discoveryPerformed: accepted,
    inspectedCandidateCount: accepted ? 4 : 0,
    inspectedCandidates: candidates,
    discoveryLaneCount: accepted ? 2 : 0,
    laneResults: lanes,
    sameSourceCurrentT5CandidateCount: accepted ? 1 : 0,
    sameSourceCurrentT5VocabularyCorrespondenceCandidateCount: accepted ? 1 : 0,
    publicTranscriptionSearchLeadCount: accepted ? 1 : 0,
    competingMethodologyCandidateCount: accepted ? 2 : 0,
    admissionCompatibleCandidateCount: 0,
    registeredCandidateCount: 0,
    authorityAcceptedCandidateCount: 0,
    authorityGapClosedCount: 0,
    allFiveGapsRemainOpen: true,
    unresolvedGapIds,
    strongestCurrentLeadCandidateId: strongest?.candidateId ?? null,
    strongestCurrentLeadCurrentT5ClaimTypes:
      strongest?.correspondenceEstablishedCurrentT5ClaimTypes ?? Object.freeze([]),
    strongestCurrentLeadRequiresPrimaryWitnessBinding: accepted,
    strongestCurrentLeadRequiresModernScopeRemediation: accepted,
    wealthFamilyHistoricalSpouseVocabularyCorrespondenceObserved: accepted,
    officerFamilyHistoricalSpouseVocabularyLeadObserved: accepted,
    officerFamilyHistoricalSpouseVocabularyCorrespondenceEstablished: false,
    currentT6InputPathEstablished: false,
    currentClaimSemanticCorrespondenceEstablishedForAllFiveDirectT5Claims: false,
    modernProductScopeCompatibilityEstablishedByThisGate: false,
    primaryWitnessRequirementSatisfiedByStrongestLead: false,
    sameGapCrossCandidateCompositionPerformed: false,
    sameGapCrossCandidateCompositionAuthorized: false,
    candidateRegisteredByThisGate: false,
    requirementCoverageEvaluatedByThisGate: false,
    authorityAcquiredByThisGate: false,
    spouseT8RuleAuthoringAuthorized: false,
    spouseT8ClaimTypeCreationAuthorized: false,
    spouseInterpretationPackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    compatibilityAuthorityAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_CANDIDATE_DISCOVERY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      candidateEvidenceRecordsCreated: accepted ? 4 : 0,
      registeredSourcesCreated: 0,
      methodologyDefinitionsCreated: 0,
      methodologyChoicesAdopted: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW'
      : 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW',
  });
}
