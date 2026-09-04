import type { SourceReference } from '../contracts/interpretation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS,
  buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview,
  type RelationshipSpouseT8AuthorityGapId,
} from './relationship-spouse-t8-authority-acquisition-readiness-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_DISCOVERY_LANES,
  buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview,
  type RelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReviewReport,
  type RelationshipSpouseT8AuthorityDiscoveryLaneId,
} from './relationship-spouse-t8-authority-candidate-discovery-readiness-review.js';

export const RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-authority-candidate-discovery-evidence-v1' as const;

export type RelationshipSpouseT8CandidateDiscoveryStatus =
  | 'POTENTIAL_PARTIAL_COVERAGE_COMPETING_METHODOLOGY_INPUTS'
  | 'DISCOVERY_LEAD_ONLY';

export interface RelationshipSpouseT8CandidateGapObservation {
  gapId: RelationshipSpouseT8AuthorityGapId;
  exactRelevantLocatorVerifiedOnInspectedSurface: boolean;
  originalPrimaryWitnessExactPassageVerified: boolean;
  explicitSpouseSemanticAssertionObserved: boolean;
  explicitApplicabilityBoundaryObserved: boolean;
  explicitContextOrExceptionTreatmentObserved: boolean;
  currentSpouseT8InputContractDirectlySupported: false;
  requirementCoverageEvaluated: false;
  countsAsRequirementSatisfied: false;
  observation: string;
}

export interface RelationshipSpouseT8DiscoveredAuthorityCandidate {
  candidateId: string;
  discoveryStatus: RelationshipSpouseT8CandidateDiscoveryStatus;
  laneIds: readonly RelationshipSpouseT8AuthorityDiscoveryLaneId[];
  targetGapIds: readonly RelationshipSpouseT8AuthorityGapId[];
  sourceReference: SourceReference;
  sourceIdentityVerified: boolean;
  nationalLibraryOrEquivalentWitnessIdentityVerified: boolean;
  exactPassageInspectedOnAtLeastOneSurface: boolean;
  exactPrimaryWitnessPassageLocatorVerified: boolean;
  independentNormativeProvenanceObserved: boolean;
  spouseBindingObserved: boolean;
  spouseBindingMethodInputs: readonly string[];
  currentSpouseT8InputContractDirectlySupported: false;
  competingMethodologyApplicabilityReviewRequired: boolean;
  historicalRoleAndScopeModernizationReviewRequired: boolean;
  gapObservations: readonly RelationshipSpouseT8CandidateGapObservation[];
  supports: readonly string[];
  doesNotEstablish: readonly string[];
  admissionAcceptedUnderDiscoveryReadiness: false;
  requirementCoverageEvaluationStatus: 'NOT_STARTED';
  authorityGapClosed: false;
}

export interface RelationshipSpouseT8CandidateDiscoveryLaneResult {
  laneId: RelationshipSpouseT8AuthorityDiscoveryLaneId;
  searched: boolean;
  candidateIds: readonly string[];
  candidateCount: number;
  fullAdmissionCandidateDiscovered: false;
  unresolvedGapIds: readonly RelationshipSpouseT8AuthorityGapId[];
}

export const RELATIONSHIP_SPOUSE_T8_CANDIDATE_DISCOVERY_CONTROL_IDS = Object.freeze([
  'DISCOVERY_EVIDENCE_DOES_NOT_ACCEPT_REGISTER_OR_PROMOTE_AUTHORITY',
  'SEARCH_RESULTS_AND_TRANSCRIPTION_SNIPPETS_ARE_DISCOVERY_LEADS_ONLY',
  'EXACT_PASSAGE_MUST_BE_DISTINGUISHED_FROM_SOURCE_IDENTITY_ONLY',
  'PRIMARY_SCAN_IDENTITY_DOES_NOT_IMPLY_EXACT_TARGET_PAGE_BINDING',
  'SPOUSE_VOCABULARY_OR_ROLE_MAPPING_ALONE_DOES_NOT_ESTABLISH_CURRENT_T8_SEMANTICS',
  'HISTORICAL_SEX_GENDER_AND_ROLE_ASSUMPTIONS_MAY_NOT_BE_SILENTLY_UNIVERSALIZED',
  'ZIPING_WIFE_PALACE_USESHEN_XIJI_INPUTS_DO_NOT_AUTO_MAP_TO_CURRENT_T5_T6_INPUTS',
  'HISTORICAL_PARTNER_ATTRIBUTE_OR_RELATIONSHIP_OUTCOME_LANGUAGE_IS_NOT_PRODUCTION_AUTHORITY',
  'NO_PARTIAL_CANDIDATE_STITCHING_WITHIN_ONE_GAP',
  'COMPATIBILITY_AUTHORITY_CANNOT_SUBSTITUTE_FOR_SPOUSE_AUTHORITY',
  'NO_MISSING_GAP_DEFAULT_SEMANTIC',
  'REQUIREMENT_COVERAGE_EVALUATION_IS_REQUIRED_BEFORE_ANY_ADMISSION',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

function discoveryLaneIds(
  ...ids: readonly RelationshipSpouseT8AuthorityDiscoveryLaneId[]
): readonly RelationshipSpouseT8AuthorityDiscoveryLaneId[] {
  return Object.freeze([...ids]);
}

function allSpouseGapIds(): readonly RelationshipSpouseT8AuthorityGapId[] {
  return Object.freeze(
    RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.map((requirement) => requirement.gapId),
  );
}

function sourceZipingZhenquan(): SourceReference {
  return {
    sourceId: 'source_ziping_zhenquan_nlc_11jh010455_35296_spouse_t8_discovery',
    sourceType: 'classical_text',
    title: '子平真詮',
    author: '沈孝瞻',
    publisher: '世界圖書館',
    edition: 'NLC witness NLC416-11jh010455-35296',
    language: 'zh-Hant',
    locator: {
      section: '論妻子',
      page: 'PDF p.53 / printed p.44 directly inspected; neighboring printed pp.43 and 46 also inspected',
      anchor: '妻以配身; 妻宮坐財; 月令用神配成喜忌; 其理不可執一',
    },
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/NLC416-11jh010455-35296_%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%A9%AE.pdf',
    accessedAt: '2026-09-05',
    provenanceTier: 'primary',
    rights: { copyrightStatus: 'public_domain', reusePolicy: 'paraphrase_only' },
    notes:
      'The National Library of China witness identity is verified through the Wikimedia Commons NLC record. PDF p.53 / printed p.44 was directly inspected and explicitly discusses wife/spouse interpretation through 妻宮 together with 月令用神 and 喜忌, including cases where an apparently favorable or adverse palace condition reverses under contextual configuration. This is discovery evidence only and does not establish a bridge to the current Myeonghwa T5/T6 spouse-synthesis input contract.',
  };
}

function sourceDitianSuiChanwei(): SourceReference {
  return {
    sourceId: 'source_ditian_sui_chanwei_shanghai_1947_spouse_t8_discovery',
    sourceType: 'classical_text',
    title: '滴天髓闡微',
    publisher: '上海大東書局',
    edition: '1947 scan family / SSID-11335994',
    publicationYear: 1947,
    language: 'zh-Hant',
    locator: {
      section: '六親論 / 一、夫妻',
      page: '516-page 1947 scan exact target page not yet bound; Wikisource transcription inspected',
      anchor: '夫妻因緣宿世來; 大率依財看妻; 然看財神又須活法',
    },
    url: 'https://commons.wikimedia.org/wiki/File:SSID-11335994_%E6%BB%B4%E5%A4%A9%E9%AB%93%E9%97%A1%E5%BE%AE.pdf',
    accessedAt: '2026-09-05',
    provenanceTier: 'cross_reference',
    rights: { copyrightStatus: 'public_domain', reusePolicy: 'paraphrase_only' },
    notes:
      'The 1947 Shanghai Dado Book Company scan identity is publicly catalogued on Wikimedia Commons. A Wikisource transcription exposes the 六親論/夫妻 passage and its context-sensitive 財/喜神 reasoning, but this gate has not bound that passage to an exact page of the 516-page scan. It therefore remains a discovery lead only.',
  };
}

function gapObservation(
  gapId: RelationshipSpouseT8AuthorityGapId,
  exactRelevantLocatorVerifiedOnInspectedSurface: boolean,
  originalPrimaryWitnessExactPassageVerified: boolean,
  explicitSpouseSemanticAssertionObserved: boolean,
  explicitApplicabilityBoundaryObserved: boolean,
  explicitContextOrExceptionTreatmentObserved: boolean,
  observation: string,
): RelationshipSpouseT8CandidateGapObservation {
  return Object.freeze({
    gapId,
    exactRelevantLocatorVerifiedOnInspectedSurface,
    originalPrimaryWitnessExactPassageVerified,
    explicitSpouseSemanticAssertionObserved,
    explicitApplicabilityBoundaryObserved,
    explicitContextOrExceptionTreatmentObserved,
    currentSpouseT8InputContractDirectlySupported: false,
    requirementCoverageEvaluated: false,
    countsAsRequirementSatisfied: false,
    observation,
  });
}

function zipingCandidate(): RelationshipSpouseT8DiscoveredAuthorityCandidate {
  const sourceReference = sourceZipingZhenquan();
  const targetGapIds = allSpouseGapIds();
  const material = {
    sourceId: sourceReference.sourceId,
    targetGapIds,
    discoveryStatus: 'POTENTIAL_PARTIAL_COVERAGE_COMPETING_METHODOLOGY_INPUTS' as const,
  };
  return Object.freeze({
    candidateId: `relationship_spouse_t8_candidate_${deterministicContentHash(material).slice(0, 20)}`,
    discoveryStatus: material.discoveryStatus,
    laneIds: discoveryLaneIds(
      'SPOUSE_SEMANTIC_AND_APPLICABILITY',
      'SPOUSE_COMPOSITION_AND_SCOPE',
      'SPOUSE_NORMATIVE_PROVENANCE',
    ),
    targetGapIds,
    sourceReference,
    sourceIdentityVerified: true,
    nationalLibraryOrEquivalentWitnessIdentityVerified: true,
    exactPassageInspectedOnAtLeastOneSurface: true,
    exactPrimaryWitnessPassageLocatorVerified: true,
    independentNormativeProvenanceObserved: true,
    spouseBindingObserved: true,
    spouseBindingMethodInputs: Object.freeze(['妻宮', '月令用神', '喜忌', '格局']),
    currentSpouseT8InputContractDirectlySupported: false,
    competingMethodologyApplicabilityReviewRequired: true,
    historicalRoleAndScopeModernizationReviewRequired: true,
    gapObservations: Object.freeze([
      gapObservation(
        'SPOUSE_SPECIFIC_SEMANTIC_BINDING_MISSING',
        true,
        true,
        true,
        true,
        true,
        'The inspected primary page explicitly enters a wife-specific judgment and names 妻宮 rather than only a broad interpersonal tendency. The historical output vocabulary is not adopted here.',
      ),
      gapObservation(
        'SPOUSE_APPLICABILITY_BOUNDARY_MISSING',
        true,
        true,
        true,
        true,
        true,
        'The primary passage makes spouse interpretation conditional on 月令用神, 喜忌 and 格局 context, and explicitly shows that the same palace symbol can change meaning under a different configuration.',
      ),
      gapObservation(
        'SPOUSE_MULTI_CLAIM_COMPOSITION_METHOD_MISSING',
        true,
        true,
        true,
        true,
        true,
        'The source combines 妻宮 with wider 用神/喜忌/格局 context instead of using a single symbol in isolation, but those operative inputs are not the current Myeonghwa spouse T5/T6 contract.',
      ),
      gapObservation(
        'SPOUSE_SCOPE_LIMITS_AND_EXCEPTIONS_MISSING',
        true,
        true,
        true,
        true,
        true,
        'The passage contains explicit reversals and states that the principle cannot be applied rigidly. It does not itself define Myeonghwa modern-product exclusions for partner attributes, outcomes, fidelity, divorce, or timing.',
      ),
      gapObservation(
        'SPOUSE_NORMATIVE_PROVENANCE_REVIEW_MISSING',
        true,
        true,
        true,
        true,
        true,
        'A reproducible NLC witness identity and exact primary page are available, but adequacy, applicability, conflict and provenance coverage are deliberately deferred to the next governed evaluation gate.',
      ),
    ]),
    supports: Object.freeze([
      'Direct primary-scan evidence of spouse-specific 妻宮 semantics.',
      'Direct primary-scan evidence that spouse judgment is context-dependent rather than a single-symbol shortcut.',
      'A reproducible source identity and exact primary-page locator for later requirement-coverage review.',
    ]),
    doesNotEstablish: Object.freeze([
      'A bridge from current Myeonghwa T5/T6 claims to relationship/spouse T8.',
      'A production-safe modernization of historical wife, gender, virtue, wealth, or household-role language.',
      'Specific partner appearance, occupation, personality, fidelity, marriage, divorce, breakup, children, or future timing.',
      'T10 compatibility authority.',
      'Any executable rule, claim type, interpretation pack, narrative, preview route, or production promotion.',
    ]),
    admissionAcceptedUnderDiscoveryReadiness: false,
    requirementCoverageEvaluationStatus: 'NOT_STARTED',
    authorityGapClosed: false,
  });
}

function ditianCandidate(): RelationshipSpouseT8DiscoveredAuthorityCandidate {
  const sourceReference = sourceDitianSuiChanwei();
  const targetGapIds = allSpouseGapIds();
  const material = {
    sourceId: sourceReference.sourceId,
    targetGapIds,
    discoveryStatus: 'DISCOVERY_LEAD_ONLY' as const,
  };
  return Object.freeze({
    candidateId: `relationship_spouse_t8_candidate_${deterministicContentHash(material).slice(0, 20)}`,
    discoveryStatus: material.discoveryStatus,
    laneIds: discoveryLaneIds(
      'SPOUSE_SEMANTIC_AND_APPLICABILITY',
      'SPOUSE_COMPOSITION_AND_SCOPE',
      'SPOUSE_NORMATIVE_PROVENANCE',
    ),
    targetGapIds,
    sourceReference,
    sourceIdentityVerified: true,
    nationalLibraryOrEquivalentWitnessIdentityVerified: false,
    exactPassageInspectedOnAtLeastOneSurface: true,
    exactPrimaryWitnessPassageLocatorVerified: false,
    independentNormativeProvenanceObserved: false,
    spouseBindingObserved: true,
    spouseBindingMethodInputs: Object.freeze(['財神', '喜神', '日主衰旺', '喜忌']),
    currentSpouseT8InputContractDirectlySupported: false,
    competingMethodologyApplicabilityReviewRequired: true,
    historicalRoleAndScopeModernizationReviewRequired: true,
    gapObservations: Object.freeze([
      gapObservation(
        'SPOUSE_SPECIFIC_SEMANTIC_BINDING_MISSING',
        true,
        false,
        true,
        true,
        true,
        'The inspected transcription surface explicitly discusses 夫妻 and 財 as a wife-related interpretive input, but the exact 1947 scan page is not yet bound.',
      ),
      gapObservation(
        'SPOUSE_APPLICABILITY_BOUNDARY_MISSING',
        true,
        false,
        true,
        true,
        true,
        'The transcription repeatedly requires context-sensitive treatment through 財神, 喜神, day-master strength and other conditions rather than an unconditional mapping.',
      ),
      gapObservation(
        'SPOUSE_MULTI_CLAIM_COMPOSITION_METHOD_MISSING',
        true,
        false,
        true,
        true,
        true,
        'The transcription composes multiple structural conditions, but primary-page verification and current-input-contract applicability remain unresolved.',
      ),
      gapObservation(
        'SPOUSE_SCOPE_LIMITS_AND_EXCEPTIONS_MISSING',
        true,
        false,
        true,
        true,
        true,
        'The transcription contains exception logic, but also historical deterministic partner and relationship language that cannot be carried into product semantics without a separate scope review.',
      ),
      gapObservation(
        'SPOUSE_NORMATIVE_PROVENANCE_REVIEW_MISSING',
        false,
        false,
        true,
        true,
        true,
        'The 1947 scan family is identified, but the exact target page is not bound and this candidate therefore cannot yet supply primary passage provenance.',
      ),
    ]),
    supports: Object.freeze([
      'An independent source-family discovery lead for spouse-specific, context-sensitive reasoning.',
      'A concrete target section for later exact 1947 scan page binding.',
    ]),
    doesNotEstablish: Object.freeze([
      'Exact primary-witness target-page binding.',
      'Independent normative provenance for the target passage.',
      'A current Myeonghwa T5/T6-to-spouse T8 bridge.',
      'Production-safe partner attributes, relationship outcomes, timing, or compatibility semantics.',
    ]),
    admissionAcceptedUnderDiscoveryReadiness: false,
    requirementCoverageEvaluationStatus: 'NOT_STARTED',
    authorityGapClosed: false,
  });
}

export const RELATIONSHIP_SPOUSE_T8_DISCOVERED_AUTHORITY_CANDIDATES = Object.freeze([
  zipingCandidate(),
  ditianCandidate(),
] as const);

function exactReadinessBoundaryAccepted(
  readiness: RelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReviewReport,
): boolean {
  const acquisition = buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview();
  const expected = buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview(acquisition);
  return (
    deterministicContentHash(readiness) === deterministicContentHash(expected) &&
    readiness.reviewId === expected.reviewId &&
    readiness.status ===
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW' &&
    readiness.decision ===
      'GAP_SCOPED_SPOUSE_AUTHORITY_CANDIDATE_DISCOVERY_CONTRACT_FROZEN_NO_AUTHORITY_ACQUIRED' &&
    readiness.discoveryLaneCount === RELATIONSHIP_SPOUSE_T8_AUTHORITY_DISCOVERY_LANES.length &&
    readiness.admissionContractCount === RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.length &&
    readiness.candidateDiscoveryPerformedByThisGate === false &&
    readiness.authorityAdmittedByThisGate === false &&
    readiness.spouseT8RuleAuthoringAuthorized === false &&
    readiness.productionPromotionAuthorized === false &&
    readiness.recommendedNextGate ===
      'RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
  );
}

function laneResults(): readonly RelationshipSpouseT8CandidateDiscoveryLaneResult[] {
  return RELATIONSHIP_SPOUSE_T8_AUTHORITY_DISCOVERY_LANES.map((lane) => {
    const candidates = RELATIONSHIP_SPOUSE_T8_DISCOVERED_AUTHORITY_CANDIDATES.filter((candidate) =>
      candidate.laneIds.includes(lane.laneId),
    );
    return Object.freeze({
      laneId: lane.laneId,
      searched: true,
      candidateIds: Object.freeze(candidates.map((candidate) => candidate.candidateId)),
      candidateCount: candidates.length,
      fullAdmissionCandidateDiscovered: false,
      unresolvedGapIds: Object.freeze([...lane.targetGapIds]),
    });
  });
}

function finalized(
  material: Omit<RelationshipSpouseT8AuthorityCandidateDiscoveryEvidenceReport, 'evidenceId'>,
): RelationshipSpouseT8AuthorityCandidateDiscoveryEvidenceReport {
  return {
    evidenceId: `relationship_spouse_t8_authority_discovery_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export interface RelationshipSpouseT8AuthorityCandidateDiscoveryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
    | 'UPSTREAM_DISCOVERY_READINESS_BOUNDARY_INVALID';
  decision:
    | 'TWO_CANDIDATES_DISCOVERED_ONE_PRIMARY_BOUND_PARTIAL_ONE_LEAD_ONLY_NO_AUTHORITY_ACCEPTED_OR_GAP_CLOSED'
    | 'RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_NOT_PERFORMED';
  upstreamReadinessReviewId: string;
  exactReadinessBoundaryAccepted: boolean;
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  discoveryPerformed: boolean;
  laneResults: readonly RelationshipSpouseT8CandidateDiscoveryLaneResult[];
  laneCount: 3 | 0;
  inspectedCandidateCount: 2 | 0;
  inspectedCandidates: readonly RelationshipSpouseT8DiscoveredAuthorityCandidate[];
  potentialPartialCoverageCandidateCount: 1 | 0;
  discoveryLeadOnlyCandidateCount: 1 | 0;
  fullAdmissionCandidateCount: 0;
  registeredCandidateCount: 0;
  allFiveGapsRemainOpen: true;
  unresolvedGapIds: readonly RelationshipSpouseT8AuthorityGapId[];
  zipingExplicitSpouseBindingObserved: boolean;
  zipingExactPrimaryPageBindingVerified: boolean;
  zipingBindingUsesCurrentSpouseT8Inputs: false;
  zipingCompetingMethodologyApplicabilityReviewRequired: boolean;
  ditianExactPrimaryPageBindingMissing: boolean;
  candidateRequirementCoverageEvaluatedByThisGate: false;
  candidateDiscoveryMeansRequirementSatisfied: false;
  sameGapCrossCandidateCompositionPerformed: false;
  sameGapCrossCandidateCompositionAuthorized: false;
  searchSnippetOrTranscriptionMayCountAsAuthorityEvidence: false;
  historicalRoleLanguageMayBeUniversalizedWithoutReview: false;
  historicalPartnerAttributeLanguageMayBeProductionSemantic: false;
  noCandidateFoundMayCreateDefaultSemantic: false;
  authorityAdmittedByThisGate: false;
  spouseT8RuleAuthoringAuthorized: false;
  spouseT8ClaimTypeCreationAuthorized: false;
  spouseInterpretationPackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  compatibilityAuthorityAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_CANDIDATE_DISCOVERY_CONTROL_IDS)[number][];
  controlCount: 13 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    candidateEvidenceRecordsCreated: 2 | 0;
    registeredSourcesCreated: 0;
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    registrySnapshotsCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION'
    | 'RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE';
}

export function buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence(
  readiness: RelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReviewReport,
): RelationshipSpouseT8AuthorityCandidateDiscoveryEvidenceReport {
  const upstreamAccepted = exactReadinessBoundaryAccepted(readiness);
  const candidates = upstreamAccepted
    ? RELATIONSHIP_SPOUSE_T8_DISCOVERED_AUTHORITY_CANDIDATES
    : Object.freeze([]);
  const ziping = candidates.find((candidate) => candidate.sourceReference.title === '子平真詮');
  const ditian = candidates.find((candidate) => candidate.sourceReference.title === '滴天髓闡微');
  return finalized({
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION,
    status: upstreamAccepted
      ? 'RESOLVED_RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
      : 'UPSTREAM_DISCOVERY_READINESS_BOUNDARY_INVALID',
    decision: upstreamAccepted
      ? 'TWO_CANDIDATES_DISCOVERED_ONE_PRIMARY_BOUND_PARTIAL_ONE_LEAD_ONLY_NO_AUTHORITY_ACCEPTED_OR_GAP_CLOSED'
      : 'RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_NOT_PERFORMED',
    upstreamReadinessReviewId: readiness.reviewId,
    exactReadinessBoundaryAccepted: upstreamAccepted,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    discoveryPerformed: upstreamAccepted,
    laneResults: upstreamAccepted ? laneResults() : Object.freeze([]),
    laneCount: upstreamAccepted ? 3 : 0,
    inspectedCandidateCount: upstreamAccepted ? 2 : 0,
    inspectedCandidates: candidates,
    potentialPartialCoverageCandidateCount: upstreamAccepted ? 1 : 0,
    discoveryLeadOnlyCandidateCount: upstreamAccepted ? 1 : 0,
    fullAdmissionCandidateCount: 0,
    registeredCandidateCount: 0,
    allFiveGapsRemainOpen: true,
    unresolvedGapIds: allSpouseGapIds(),
    zipingExplicitSpouseBindingObserved: ziping?.spouseBindingObserved ?? false,
    zipingExactPrimaryPageBindingVerified:
      ziping?.exactPrimaryWitnessPassageLocatorVerified ?? false,
    zipingBindingUsesCurrentSpouseT8Inputs: false,
    zipingCompetingMethodologyApplicabilityReviewRequired:
      ziping?.competingMethodologyApplicabilityReviewRequired ?? false,
    ditianExactPrimaryPageBindingMissing:
      ditian !== undefined && !ditian.exactPrimaryWitnessPassageLocatorVerified,
    candidateRequirementCoverageEvaluatedByThisGate: false,
    candidateDiscoveryMeansRequirementSatisfied: false,
    sameGapCrossCandidateCompositionPerformed: false,
    sameGapCrossCandidateCompositionAuthorized: false,
    searchSnippetOrTranscriptionMayCountAsAuthorityEvidence: false,
    historicalRoleLanguageMayBeUniversalizedWithoutReview: false,
    historicalPartnerAttributeLanguageMayBeProductionSemantic: false,
    noCandidateFoundMayCreateDefaultSemantic: false,
    authorityAdmittedByThisGate: false,
    spouseT8RuleAuthoringAuthorized: false,
    spouseT8ClaimTypeCreationAuthorized: false,
    spouseInterpretationPackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    compatibilityAuthorityAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: upstreamAccepted
      ? RELATIONSHIP_SPOUSE_T8_CANDIDATE_DISCOVERY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: upstreamAccepted ? 13 : 0,
    controlsFrozen: upstreamAccepted,
    implementationEffects: Object.freeze({
      candidateEvidenceRecordsCreated: upstreamAccepted ? 2 : 0,
      registeredSourcesCreated: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    }),
    recommendedNextGate: upstreamAccepted
      ? 'RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION'
      : 'RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
  });
}
