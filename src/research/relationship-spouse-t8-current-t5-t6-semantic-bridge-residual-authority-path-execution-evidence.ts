import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS } from './relationship-spouse-t8-authority-acquisition-readiness-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_READINESS_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_TASKS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS_REVIEW_VERSION,
  type RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReviewReport,
  type RelationshipSpouseT8ResidualExecutionDisposition,
  type RelationshipSpouseT8ResidualExecutionTaskId,
} from './relationship-spouse-t8-current-t5-t6-semantic-bridge-residual-authority-path-execution-readiness-review.js';

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-current-t5-t6-semantic-bridge-residual-authority-path-execution-evidence-v1' as const;

export type RelationshipSpouseT8ResidualEvidenceCandidateId =
  | 'WYG_0810_SCAN_CONTAINER'
  | 'KANRIPO_WYG_V5_FOLIO_INDEX'
  | 'KANRIPO_WYG_V6_FOLIO_INDEX'
  | 'NCL_06593_YUANHAI_MING_1600_SCAN'
  | 'NLC_YUANHAI_MING_SCAN_SERIES'
  | 'SHIDIAN_YUANHAI_VOL3_OCR_CONTEXT'
  | 'CLARIFY_GENDER_NEUTRAL_SPOUSE_POLICY'
  | 'OPENFATE_GENDER_NEUTRAL_SPOUSE_POLICY'
  | 'AUSPDAY_RELATIONSHIP_COMPOSITION_GUIDE'
  | 'SUPERBAZI_RELATIONSHIP_COMPOSITION_GUIDE';

export type RelationshipSpouseT8ResidualEvidenceSourceClass =
  | 'PRIMARY_FACSIMILE_SCAN_CONTAINER'
  | 'CANONICAL_INDEXED_TEXT'
  | 'PRIMARY_HISTORICAL_SCAN_SERIES'
  | 'OCR_DERIVED_FROM_PRIMARY_SCAN'
  | 'MODERN_EDITORIAL_POLICY'
  | 'MODERN_PRACTITIONER_GUIDE';

export interface RelationshipSpouseT8ResidualExecutionCandidateEvidence {
  candidateId: RelationshipSpouseT8ResidualEvidenceCandidateId;
  taskId: RelationshipSpouseT8ResidualExecutionTaskId;
  sourceClass: RelationshipSpouseT8ResidualEvidenceSourceClass;
  sourceIdentity: string;
  sourceLocator: string;
  inspectedSurface: string;
  inspectedAt: '2026-09-05';
  disposition: RelationshipSpouseT8ResidualExecutionDisposition;
  exactSourceIdentityConfirmed: boolean;
  reproducibleLocatorConfirmed: boolean;
  boundedLocalContextInspected: boolean;
  directFacsimilePageImageInspected: boolean;
  primaryOrVerifiedWitnessCandidateLocated: boolean;
  exactPrimaryPassagePageLocatorEstablished: boolean;
  historicalSpouseRoleMappingExplicit: boolean;
  historicalGenderRoleBoundaryExplicit: boolean;
  independentFromSamyeongAtWorkIdentityLevel: boolean;
  genderNeutralApplicabilityPolicyExplicit: boolean;
  noSexOrOrientationInferencePolicyExplicit: boolean;
  multiClaimCompositionPatternExplicit: boolean;
  conflictOrAmbiguityTreatmentExplicit: boolean;
  scopeExclusionsExplicit: boolean;
  independentNormativeProvenanceAdequate: boolean;
  currentGovernedMethodSemanticCorrespondenceEstablished: boolean;
  qualifyingCandidate: false;
  authorityAdmissionAuthorized: false;
  gapClosureAuthorized: false;
  evidenceNote: string;
}

function candidate(
  value: RelationshipSpouseT8ResidualExecutionCandidateEvidence,
): RelationshipSpouseT8ResidualExecutionCandidateEvidence {
  return Object.freeze(value);
}

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_CANDIDATES = Object.freeze([
  candidate({
    candidateId: 'WYG_0810_SCAN_CONTAINER',
    taskId: 'WYG_0810_DIRECT_FACSIMILE_PAGE_BINDING_EXECUTION',
    sourceClass: 'PRIMARY_FACSIMILE_SCAN_CONTAINER',
    sourceIdentity: '景印文淵閣四庫全書 第0810冊 子部 術數類 命書相書之屬 / 三命通會',
    sourceLocator:
      'Chinese Wikisource Index:文淵閣四庫全書 0810冊.djvu; scan has 1,031 pages and the index assigns 三命通會 to scan-index range 1-692',
    inspectedSurface:
      'Public file/index metadata for the 0810 facsimile container. The scan identity and 三命通會 range are exposed, but the exact WYG folios 005-2a/2b/3a and 006-89b/90a were not bound to concrete 0810 scan pages in this execution.',
    inspectedAt: '2026-09-05',
    disposition: 'PAGE_BINDING_NOT_ESTABLISHED',
    exactSourceIdentityConfirmed: true,
    reproducibleLocatorConfirmed: true,
    boundedLocalContextInspected: false,
    directFacsimilePageImageInspected: false,
    primaryOrVerifiedWitnessCandidateLocated: true,
    exactPrimaryPassagePageLocatorEstablished: false,
    historicalSpouseRoleMappingExplicit: false,
    historicalGenderRoleBoundaryExplicit: false,
    independentFromSamyeongAtWorkIdentityLevel: false,
    genderNeutralApplicabilityPolicyExplicit: false,
    noSexOrOrientationInferencePolicyExplicit: false,
    multiClaimCompositionPatternExplicit: false,
    conflictOrAmbiguityTreatmentExplicit: false,
    scopeExclusionsExplicit: false,
    independentNormativeProvenanceAdequate: false,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    qualifyingCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    evidenceNote:
      'The correct WYG-derived scan container is now located, materially narrowing the access problem. Container discovery is not target-page inspection: exact folio-to-scan-page binding and direct target image review remain unsatisfied.',
  }),
  candidate({
    candidateId: 'KANRIPO_WYG_V5_FOLIO_INDEX',
    taskId: 'WYG_0810_DIRECT_FACSIMILE_PAGE_BINDING_EXECUTION',
    sourceClass: 'CANONICAL_INDEXED_TEXT',
    sourceIdentity: '三命通會 四庫全書・文淵閣 WYG 卷五',
    sourceLocator: 'Kanripo KR3g0042/WYG/005, folios 005-2a through 005-3a',
    inspectedSurface:
      'Indexed WYG text at 論古人立印食官財名義 and the 妻財 / 正妻 / 偏妻 continuation. It provides exact folio navigation and bounded text context, not a direct page-image witness.',
    inspectedAt: '2026-09-05',
    disposition: 'PARTIAL_EVIDENCE_ACQUIRED',
    exactSourceIdentityConfirmed: true,
    reproducibleLocatorConfirmed: true,
    boundedLocalContextInspected: true,
    directFacsimilePageImageInspected: false,
    primaryOrVerifiedWitnessCandidateLocated: true,
    exactPrimaryPassagePageLocatorEstablished: true,
    historicalSpouseRoleMappingExplicit: true,
    historicalGenderRoleBoundaryExplicit: true,
    independentFromSamyeongAtWorkIdentityLevel: false,
    genderNeutralApplicabilityPolicyExplicit: false,
    noSexOrOrientationInferencePolicyExplicit: false,
    multiClaimCompositionPatternExplicit: false,
    conflictOrAmbiguityTreatmentExplicit: false,
    scopeExclusionsExplicit: false,
    independentNormativeProvenanceAdequate: false,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    qualifyingCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    evidenceNote:
      'The indexed WYG surface confirms the historical wealth/wife vocabulary and exact folio neighborhood, but #291 requires the matching direct 0810 page image. Indexed text cannot satisfy that requirement.',
  }),
  candidate({
    candidateId: 'KANRIPO_WYG_V6_FOLIO_INDEX',
    taskId: 'WYG_0810_DIRECT_FACSIMILE_PAGE_BINDING_EXECUTION',
    sourceClass: 'CANONICAL_INDEXED_TEXT',
    sourceIdentity: '三命通會 四庫全書・文淵閣 WYG 卷六',
    sourceLocator: 'Kanripo KR3g0042/WYG/006, folios 006-89b through 006-90a, 從象',
    inspectedSurface:
      'Indexed WYG text exposes the bounded 從象 context and the historical 官煞者夫也財者妻也 analogy. The direct page-image endpoint was not inspectable in this execution.',
    inspectedAt: '2026-09-05',
    disposition: 'PARTIAL_EVIDENCE_ACQUIRED',
    exactSourceIdentityConfirmed: true,
    reproducibleLocatorConfirmed: true,
    boundedLocalContextInspected: true,
    directFacsimilePageImageInspected: false,
    primaryOrVerifiedWitnessCandidateLocated: true,
    exactPrimaryPassagePageLocatorEstablished: true,
    historicalSpouseRoleMappingExplicit: true,
    historicalGenderRoleBoundaryExplicit: true,
    independentFromSamyeongAtWorkIdentityLevel: false,
    genderNeutralApplicabilityPolicyExplicit: false,
    noSexOrOrientationInferencePolicyExplicit: false,
    multiClaimCompositionPatternExplicit: false,
    conflictOrAmbiguityTreatmentExplicit: false,
    scopeExclusionsExplicit: false,
    independentNormativeProvenanceAdequate: false,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    qualifyingCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    evidenceNote:
      'This is strong navigation/context evidence for the historical husband/wife role split, but the required primary image inspection and modern applicability authority are still absent.',
  }),
  candidate({
    candidateId: 'NCL_06593_YUANHAI_MING_1600_SCAN',
    taskId: 'YUANHAI_PRIMARY_WITNESS_CORROBORATION_UPGRADE_EXECUTION',
    sourceClass: 'PRIMARY_HISTORICAL_SCAN_SERIES',
    sourceIdentity: '刻京臺增補淵海子平大全, 明萬曆庚子二十八年(1600)閩書林劉龍田喬山堂刊本, NCL-06593',
    sourceLocator: 'Wikimedia Commons File:NCL-06593 刻京臺增補淵海子平大全.pdf; 160-page National Central Library scan',
    inspectedSurface:
      'Public scan-container metadata confirms a materially independent Ming-edition primary witness candidate. The exact 六親總要 target scan page was not directly inspected in this execution.',
    inspectedAt: '2026-09-05',
    disposition: 'PARTIAL_EVIDENCE_ACQUIRED',
    exactSourceIdentityConfirmed: true,
    reproducibleLocatorConfirmed: true,
    boundedLocalContextInspected: false,
    directFacsimilePageImageInspected: false,
    primaryOrVerifiedWitnessCandidateLocated: true,
    exactPrimaryPassagePageLocatorEstablished: false,
    historicalSpouseRoleMappingExplicit: false,
    historicalGenderRoleBoundaryExplicit: false,
    independentFromSamyeongAtWorkIdentityLevel: true,
    genderNeutralApplicabilityPolicyExplicit: false,
    noSexOrOrientationInferencePolicyExplicit: false,
    multiClaimCompositionPatternExplicit: false,
    conflictOrAmbiguityTreatmentExplicit: false,
    scopeExclusionsExplicit: false,
    independentNormativeProvenanceAdequate: false,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    qualifyingCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    evidenceNote:
      'Unlike the prior transcription-only lead, a primary historical scan candidate now exists with precise edition identity. The passage-level witness remains unverified until the target image is located and inspected.',
  }),
  candidate({
    candidateId: 'NLC_YUANHAI_MING_SCAN_SERIES',
    taskId: 'YUANHAI_PRIMARY_WITNESS_CORROBORATION_UPGRADE_EXECUTION',
    sourceClass: 'PRIMARY_HISTORICAL_SCAN_SERIES',
    sourceIdentity: '刻京臺增補淵海子平大全, 明萬曆刻本, National Library of China multi-volume scan series',
    sourceLocator:
      'Wikimedia Commons NLC892-2642-210287 through 210318 scan files covering 卷一 through 卷六',
    inspectedSurface:
      'Public file metadata independently exposes a second institutional Ming-edition scan series. Exact target-page binding and direct image inspection were not completed.',
    inspectedAt: '2026-09-05',
    disposition: 'PARTIAL_EVIDENCE_ACQUIRED',
    exactSourceIdentityConfirmed: true,
    reproducibleLocatorConfirmed: true,
    boundedLocalContextInspected: false,
    directFacsimilePageImageInspected: false,
    primaryOrVerifiedWitnessCandidateLocated: true,
    exactPrimaryPassagePageLocatorEstablished: false,
    historicalSpouseRoleMappingExplicit: false,
    historicalGenderRoleBoundaryExplicit: false,
    independentFromSamyeongAtWorkIdentityLevel: true,
    genderNeutralApplicabilityPolicyExplicit: false,
    noSexOrOrientationInferencePolicyExplicit: false,
    multiClaimCompositionPatternExplicit: false,
    conflictOrAmbiguityTreatmentExplicit: false,
    scopeExclusionsExplicit: false,
    independentNormativeProvenanceAdequate: false,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    qualifyingCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    evidenceNote:
      'This further reduces the risk that the Yuanhai lead depends on a single modern transcription, but metadata-level scan discovery is not passage-level provenance admission.',
  }),
  candidate({
    candidateId: 'SHIDIAN_YUANHAI_VOL3_OCR_CONTEXT',
    taskId: 'YUANHAI_PRIMARY_WITNESS_CORROBORATION_UPGRADE_EXECUTION',
    sourceClass: 'OCR_DERIVED_FROM_PRIMARY_SCAN',
    sourceIdentity: '刻京臺增補淵海子平大全 卷三, 論六親總要 OCR/text surface',
    sourceLocator: '識典古籍 public 卷三 text, 論六親總要 / adjacent 論妻妾 and 論夫婦總訣 context',
    inspectedSurface:
      'The bounded text explicitly contains 正財爲妻, 偏財爲妾 and female-chart 正官爲夫 / 七殺偏夫 role mappings. It is text/OCR evidence associated with the historical work, not direct inspection of the institutional scan page.',
    inspectedAt: '2026-09-05',
    disposition: 'PROVENANCE_INSUFFICIENT',
    exactSourceIdentityConfirmed: true,
    reproducibleLocatorConfirmed: true,
    boundedLocalContextInspected: true,
    directFacsimilePageImageInspected: false,
    primaryOrVerifiedWitnessCandidateLocated: true,
    exactPrimaryPassagePageLocatorEstablished: false,
    historicalSpouseRoleMappingExplicit: true,
    historicalGenderRoleBoundaryExplicit: true,
    independentFromSamyeongAtWorkIdentityLevel: true,
    genderNeutralApplicabilityPolicyExplicit: false,
    noSexOrOrientationInferencePolicyExplicit: false,
    multiClaimCompositionPatternExplicit: false,
    conflictOrAmbiguityTreatmentExplicit: false,
    scopeExclusionsExplicit: false,
    independentNormativeProvenanceAdequate: false,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    qualifyingCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    evidenceNote:
      'The local semantic correspondence is materially stronger than the earlier generic lead, but #291 expressly requires a primary or verified witness. OCR agreement cannot substitute for direct target-image verification.',
  }),
  candidate({
    candidateId: 'CLARIFY_GENDER_NEUTRAL_SPOUSE_POLICY',
    taskId: 'MODERN_GENDER_NEUTRAL_SPOUSE_APPLICABILITY_AUTHORITY_DISCOVERY_EXECUTION',
    sourceClass: 'MODERN_EDITORIAL_POLICY',
    sourceIdentity: 'Clarify BaZi spouse-role / female-chart marriage editorial guidance',
    sourceLocator: 'Public Clarify articles on female BaZi marriage, husband star, and spouse star conventions',
    inspectedSurface:
      'The guidance explicitly distinguishes historical gendered spouse conventions from modern user identity, advises neutral partner wording when context is unknown, and prohibits inference of orientation, partner gender, or relationship outcome.',
    inspectedAt: '2026-09-05',
    disposition: 'PARTIAL_EVIDENCE_ACQUIRED',
    exactSourceIdentityConfirmed: true,
    reproducibleLocatorConfirmed: true,
    boundedLocalContextInspected: true,
    directFacsimilePageImageInspected: false,
    primaryOrVerifiedWitnessCandidateLocated: false,
    exactPrimaryPassagePageLocatorEstablished: false,
    historicalSpouseRoleMappingExplicit: true,
    historicalGenderRoleBoundaryExplicit: true,
    independentFromSamyeongAtWorkIdentityLevel: true,
    genderNeutralApplicabilityPolicyExplicit: true,
    noSexOrOrientationInferencePolicyExplicit: true,
    multiClaimCompositionPatternExplicit: false,
    conflictOrAmbiguityTreatmentExplicit: false,
    scopeExclusionsExplicit: true,
    independentNormativeProvenanceAdequate: false,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    qualifyingCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    evidenceNote:
      'This is useful evidence that a role-neutral product policy can preserve historical wording without inferring identity. It is a modern editorial web policy, not sufficient normative authority for new spouse semantics in this repository.',
  }),
  candidate({
    candidateId: 'OPENFATE_GENDER_NEUTRAL_SPOUSE_POLICY',
    taskId: 'MODERN_GENDER_NEUTRAL_SPOUSE_APPLICABILITY_AUTHORITY_DISCOVERY_EXECUTION',
    sourceClass: 'MODERN_EDITORIAL_POLICY',
    sourceIdentity: 'OpenFate modern spouse-star editorial guidance',
    sourceLocator: 'Public OpenFate spouse-star / partner-star guidance',
    inspectedSurface:
      'The material presents male-Wealth/female-Officer as a historical convention and separates that convention from modern partner identity, orientation, marital status, and outcome claims.',
    inspectedAt: '2026-09-05',
    disposition: 'PARTIAL_EVIDENCE_ACQUIRED',
    exactSourceIdentityConfirmed: true,
    reproducibleLocatorConfirmed: true,
    boundedLocalContextInspected: true,
    directFacsimilePageImageInspected: false,
    primaryOrVerifiedWitnessCandidateLocated: false,
    exactPrimaryPassagePageLocatorEstablished: false,
    historicalSpouseRoleMappingExplicit: true,
    historicalGenderRoleBoundaryExplicit: true,
    independentFromSamyeongAtWorkIdentityLevel: true,
    genderNeutralApplicabilityPolicyExplicit: true,
    noSexOrOrientationInferencePolicyExplicit: true,
    multiClaimCompositionPatternExplicit: false,
    conflictOrAmbiguityTreatmentExplicit: false,
    scopeExclusionsExplicit: true,
    independentNormativeProvenanceAdequate: false,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    qualifyingCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    evidenceNote:
      'A second modern policy lead converges on the same safety boundary, but convergence among web editorial sources does not establish independent normative authority or the current governed spouse semantic bridge.',
  }),
  candidate({
    candidateId: 'AUSPDAY_RELATIONSHIP_COMPOSITION_GUIDE',
    taskId: 'SPOUSE_MULTI_CLAIM_COMPOSITION_SCOPE_AUTHORITY_DISCOVERY_EXECUTION',
    sourceClass: 'MODERN_PRACTITIONER_GUIDE',
    sourceIdentity: 'AuspDay BaZi relationship interpretation guide',
    sourceLocator: 'Public AuspDay relationship-reading guidance',
    inspectedSurface:
      'The guide explicitly recommends combining spouse palace, spouse star, and timing/context instead of reading a single character, and frames outputs as tendencies rather than verdicts.',
    inspectedAt: '2026-09-05',
    disposition: 'PARTIAL_EVIDENCE_ACQUIRED',
    exactSourceIdentityConfirmed: true,
    reproducibleLocatorConfirmed: true,
    boundedLocalContextInspected: true,
    directFacsimilePageImageInspected: false,
    primaryOrVerifiedWitnessCandidateLocated: false,
    exactPrimaryPassagePageLocatorEstablished: false,
    historicalSpouseRoleMappingExplicit: true,
    historicalGenderRoleBoundaryExplicit: false,
    independentFromSamyeongAtWorkIdentityLevel: true,
    genderNeutralApplicabilityPolicyExplicit: false,
    noSexOrOrientationInferencePolicyExplicit: false,
    multiClaimCompositionPatternExplicit: true,
    conflictOrAmbiguityTreatmentExplicit: false,
    scopeExclusionsExplicit: true,
    independentNormativeProvenanceAdequate: false,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    qualifyingCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    evidenceNote:
      'This supports the general principle that spouse reading should not collapse to one symbol, but it does not define the repository’s exact eligible upstream claim classes or a governed conflict-composition method.',
  }),
  candidate({
    candidateId: 'SUPERBAZI_RELATIONSHIP_COMPOSITION_GUIDE',
    taskId: 'SPOUSE_MULTI_CLAIM_COMPOSITION_SCOPE_AUTHORITY_DISCOVERY_EXECUTION',
    sourceClass: 'MODERN_PRACTITIONER_GUIDE',
    sourceIdentity: 'SuperBazi relationship / Marriage Palace and Partner Star guidance',
    sourceLocator: 'Public SuperBazi relationship interpretation guidance',
    inspectedSurface:
      'The guide combines Marriage Palace, Partner Star, effective context, branch relations and timing, and warns against treating one symbol as a deterministic relationship conclusion.',
    inspectedAt: '2026-09-05',
    disposition: 'PARTIAL_EVIDENCE_ACQUIRED',
    exactSourceIdentityConfirmed: true,
    reproducibleLocatorConfirmed: true,
    boundedLocalContextInspected: true,
    directFacsimilePageImageInspected: false,
    primaryOrVerifiedWitnessCandidateLocated: false,
    exactPrimaryPassagePageLocatorEstablished: false,
    historicalSpouseRoleMappingExplicit: true,
    historicalGenderRoleBoundaryExplicit: false,
    independentFromSamyeongAtWorkIdentityLevel: true,
    genderNeutralApplicabilityPolicyExplicit: false,
    noSexOrOrientationInferencePolicyExplicit: false,
    multiClaimCompositionPatternExplicit: true,
    conflictOrAmbiguityTreatmentExplicit: true,
    scopeExclusionsExplicit: true,
    independentNormativeProvenanceAdequate: false,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    qualifyingCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    evidenceNote:
      'This is a useful modern multi-layer composition lead, but its layer model is not an admitted source-bound mapping to the exact current T5/T6 claim classes and does not provide sufficient independent normative provenance.',
  }),
] as const satisfies readonly RelationshipSpouseT8ResidualExecutionCandidateEvidence[]);

export interface RelationshipSpouseT8ResidualTaskExecutionEvidence {
  taskId: RelationshipSpouseT8ResidualExecutionTaskId;
  executionPerformed: true;
  candidateIds: readonly RelationshipSpouseT8ResidualEvidenceCandidateId[];
  candidateAttemptCount: number;
  primaryDisposition: RelationshipSpouseT8ResidualExecutionDisposition;
  secondaryDispositions: readonly RelationshipSpouseT8ResidualExecutionDisposition[];
  partialEvidenceCount: number;
  qualifyingCandidateCount: 0;
  authorityCandidatesAccepted: 0;
  gapsClosed: 0;
}

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_TASK_EXECUTION_EVIDENCE = Object.freeze([
  Object.freeze({
    taskId: 'WYG_0810_DIRECT_FACSIMILE_PAGE_BINDING_EXECUTION',
    executionPerformed: true,
    candidateIds: Object.freeze([
      'WYG_0810_SCAN_CONTAINER',
      'KANRIPO_WYG_V5_FOLIO_INDEX',
      'KANRIPO_WYG_V6_FOLIO_INDEX',
    ] as const),
    candidateAttemptCount: 3,
    primaryDisposition: 'PAGE_BINDING_NOT_ESTABLISHED',
    secondaryDispositions: Object.freeze(['PARTIAL_EVIDENCE_ACQUIRED'] as const),
    partialEvidenceCount: 2,
    qualifyingCandidateCount: 0,
    authorityCandidatesAccepted: 0,
    gapsClosed: 0,
  }),
  Object.freeze({
    taskId: 'YUANHAI_PRIMARY_WITNESS_CORROBORATION_UPGRADE_EXECUTION',
    executionPerformed: true,
    candidateIds: Object.freeze([
      'NCL_06593_YUANHAI_MING_1600_SCAN',
      'NLC_YUANHAI_MING_SCAN_SERIES',
      'SHIDIAN_YUANHAI_VOL3_OCR_CONTEXT',
    ] as const),
    candidateAttemptCount: 3,
    primaryDisposition: 'PARTIAL_EVIDENCE_ACQUIRED',
    secondaryDispositions: Object.freeze(['PROVENANCE_INSUFFICIENT'] as const),
    partialEvidenceCount: 2,
    qualifyingCandidateCount: 0,
    authorityCandidatesAccepted: 0,
    gapsClosed: 0,
  }),
  Object.freeze({
    taskId: 'MODERN_GENDER_NEUTRAL_SPOUSE_APPLICABILITY_AUTHORITY_DISCOVERY_EXECUTION',
    executionPerformed: true,
    candidateIds: Object.freeze([
      'CLARIFY_GENDER_NEUTRAL_SPOUSE_POLICY',
      'OPENFATE_GENDER_NEUTRAL_SPOUSE_POLICY',
    ] as const),
    candidateAttemptCount: 2,
    primaryDisposition: 'PARTIAL_EVIDENCE_ACQUIRED',
    secondaryDispositions: Object.freeze(['HISTORICAL_ROLE_ASSUMPTION_REQUIRED'] as const),
    partialEvidenceCount: 2,
    qualifyingCandidateCount: 0,
    authorityCandidatesAccepted: 0,
    gapsClosed: 0,
  }),
  Object.freeze({
    taskId: 'SPOUSE_MULTI_CLAIM_COMPOSITION_SCOPE_AUTHORITY_DISCOVERY_EXECUTION',
    executionPerformed: true,
    candidateIds: Object.freeze([
      'AUSPDAY_RELATIONSHIP_COMPOSITION_GUIDE',
      'SUPERBAZI_RELATIONSHIP_COMPOSITION_GUIDE',
    ] as const),
    candidateAttemptCount: 2,
    primaryDisposition: 'PARTIAL_EVIDENCE_ACQUIRED',
    secondaryDispositions: Object.freeze(['PROVENANCE_INSUFFICIENT'] as const),
    partialEvidenceCount: 2,
    qualifyingCandidateCount: 0,
    authorityCandidatesAccepted: 0,
    gapsClosed: 0,
  }),
] as const satisfies readonly RelationshipSpouseT8ResidualTaskExecutionEvidence[]);

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_EVIDENCE_CONTROL_IDS = Object.freeze([
  'EXECUTION_EVIDENCE_RUNS_ONLY_THE_FOUR_RESIDUAL_TASKS_AUTHORIZED_BY_READINESS',
  'WYG_0810_SCAN_CONTAINER_DISCOVERY_IS_NOT_TARGET_FOLIO_PAGE_BINDING_OR_IMAGE_INSPECTION',
  'KANRIPO_INDEXED_WYG_TEXT_REMAINS_NAVIGATION_AND_CONTEXT_EVIDENCE_NOT_PRIMARY_IMAGE_SUBSTITUTE',
  'YUANHAI_PRIMARY_SCAN_CANDIDATES_ARE_LOCATED_BUT_TARGET_PASSAGE_IMAGES_REMAIN_UNINSPECTED',
  'YUANHAI_OCR_CONTEXT_CONFIRMS_HISTORICAL_ROLE_TEXT_BUT_DOES_NOT_COMPLETE_PRIMARY_WITNESS_PROVENANCE',
  'INDEPENDENT_WORK_IDENTITY_DOES_NOT_BY_ITSELF_ADMIT_NORMATIVE_PROVENANCE',
  'MODERN_ROLE_NEUTRAL_WEB_POLICIES_ARE_DISCOVERY_LEADS_NOT_NORMATIVE_SPOUSE_AUTHORITY',
  'MODERN_POLICY_LEADS_MUST_NOT_REWRITE_HISTORICAL_GENDER_ROLE_SOURCE_MEANING',
  'MODERN_COMPOSITION_GUIDES_DO_NOT_DEFINE_THE_EXACT_CURRENT_UPSTREAM_CLAIM_CLASS_CONTRACT',
  'PARTIAL_MULTI_LAYER_COMPOSITION_EVIDENCE_DOES_NOT_AUTHORIZE_SINGLE_SYMBOL_OR_OUTCOME_SHORTCUTS',
  'NO_CROSS_SOURCE_OR_CROSS_TASK_STITCHING_TO_CLOSE_A_SINGLE_AUTHORITY_GAP',
  'NO_CURRENT_RELATIONSHIP_T6_PATH_IS_CREATED_OR_INFERRED',
  'ALL_FIVE_SPOUSE_T8_AUTHORITY_GAPS_REMAIN_OPEN',
  'NO_SPOUSE_T8_RULE_CLAIM_PACK_NARRATIVE_COMPATIBILITY_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

export interface RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_EVIDENCE'
    | 'UPSTREAM_RESIDUAL_EXECUTION_READINESS_BOUNDARY_INVALID';
  decision:
    | 'WYG_PAGE_BINDING_PENDING_YUANHAI_PRIMARY_SCAN_CANDIDATES_LOCATED_IMAGE_VERIFICATION_PENDING_MODERN_APPLICABILITY_AND_COMPOSITION_PARTIAL_LEADS_NO_AUTHORITY_ACQUIRED'
    | 'RESIDUAL_AUTHORITY_PATH_EXECUTION_EVIDENCE_NOT_ESTABLISHED';
  upstreamReadinessReviewId: string;
  exactReadinessBoundaryAccepted: boolean;
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  executionPerformed: boolean;
  taskEvidenceRecords: readonly RelationshipSpouseT8ResidualTaskExecutionEvidence[];
  taskEvidenceRecordCount: 4 | 0;
  candidateEvidence: readonly RelationshipSpouseT8ResidualExecutionCandidateEvidence[];
  totalCandidateAttemptCount: 10 | 0;
  qualifyingCandidateCount: 0;
  authorityAcceptedCandidateCount: 0;
  authorityGapClosedCount: 0;
  wyg0810ScanContainerLocated: boolean;
  wyg0810SamyeongRangeKnown: boolean;
  wyg0810FolioToScanPageBindingEstablished: false;
  wyg0810DirectTargetPageImageInspected: false;
  kanripoWygV5BoundedTextContextConfirmed: boolean;
  kanripoWygV6BoundedTextContextConfirmed: boolean;
  yuanhaiPrimaryHistoricalScanCandidateCount: 2 | 0;
  yuanhaiPrimaryWitnessCandidateLocated: boolean;
  yuanhaiExactPrimaryPassagePageLocatorEstablished: false;
  yuanhaiDirectPrimaryPassageImageInspected: false;
  yuanhaiBoundedOcrSpouseRoleContextConfirmed: boolean;
  yuanhaiIndependentFromSamyeongAtWorkIdentityLevel: boolean;
  independentNormativeProvenanceEstablished: false;
  modernApplicabilityPolicyLeadCount: 2 | 0;
  modernGenderNeutralPolicyPatternObserved: boolean;
  modernNoSexInferencePolicyPatternObserved: boolean;
  modernApplicabilityNormativeAuthorityAdequateCount: 0;
  compositionScopeLeadCount: 2 | 0;
  multiLayerCompositionPatternObserved: boolean;
  conflictAmbiguityPatternObserved: boolean;
  scopeExclusionPatternObserved: boolean;
  exactCurrentClaimClassCompositionAuthorityEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  negativeAndPartialEvidencePreserved: boolean;
  fallbackSemanticSynthesisAuthorized: false;
  crossSourceStitchingAuthorized: false;
  crossTaskStitchingAuthorized: false;
  currentRelationshipT6InputPathEstablished: false;
  relationshipT6ExecutionTaskCreated: false;
  allFiveGapsRemainOpen: true;
  unresolvedGapIds: readonly string[];
  authorityAcquiredByThisGate: false;
  authorityGapClosedByThisGate: false;
  spouseT8RuleAuthoringAuthorized: false;
  spouseT8ClaimTypeCreationAuthorized: false;
  spouseInterpretationPackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  compatibilityAuthorityAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_EVIDENCE_CONTROL_IDS)[number][];
  controlCount: 14 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    candidateAttemptsRecorded: 10 | 0;
    evidenceRecordsCreated: 4 | 0;
    registeredSourcesCreated: 0;
    registeredCandidatesCreated: 0;
    authorityCandidatesAccepted: 0;
    authorityGapsClosed: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW'
    | 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS_REVIEW';
}

const ALL_GAP_IDS = Object.freeze(
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.map((requirement) => requirement.gapId),
);

function contentAddressedReadinessIdentityValid(
  readiness: RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReviewReport,
): boolean {
  const { reviewId, ...material } = readiness;
  return (
    reviewId ===
    `relationship_spouse_t8_current_bridge_residual_execution_readiness_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactReadinessBoundaryAccepted(
  readiness: RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReviewReport,
): boolean {
  return (
    contentAddressedReadinessIdentityValid(readiness) &&
    readiness.reviewVersion ===
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS_REVIEW_VERSION &&
    readiness.status ===
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS' &&
    readiness.decision ===
      'FOUR_RESIDUAL_RESEARCH_TASKS_EXECUTION_READY_NO_AUTHORITY_ACQUIRED_ALL_FIVE_GAPS_OPEN' &&
    readiness.exactResidualBoundaryAccepted &&
    readiness.executionTaskCount === 4 &&
    deterministicContentHash(readiness.executionTasks) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_TASKS) &&
    readiness.executablePathCount === 4 &&
    readiness.wyg0810DirectFacsimileExecutionReady &&
    readiness.wyg0810ExactPageBindingRequired &&
    readiness.wyg0810DirectImageInspectionRequired &&
    readiness.yuanhaiPrimaryWitnessUpgradeExecutionReady &&
    readiness.yuanhaiAdditionalTranscriptionOnlyResultMayQualify === false &&
    readiness.modernApplicabilityAuthorityDiscoveryExecutionReady &&
    readiness.rawHistoricalGenderRoleUniversalizationAuthorized === false &&
    readiness.compositionScopeAuthorityDiscoveryExecutionReady &&
    readiness.singleSymbolOutcomeShortcutAuthorized === false &&
    readiness.negativeEvidencePreservedAsFirstClassResult &&
    readiness.fallbackSemanticSynthesisAuthorized === false &&
    readiness.currentRelationshipT6InputPathEstablished === false &&
    readiness.relationshipT6ExecutionTaskCreated === false &&
    readiness.crossSourceStitchingAuthorized === false &&
    readiness.crossTaskStitchingAuthorized === false &&
    readiness.allFiveGapsRemainOpen &&
    deterministicContentHash(readiness.unresolvedGapIds) === deterministicContentHash(ALL_GAP_IDS) &&
    readiness.authorityAcquiredByThisGate === false &&
    readiness.authorityGapClosedByThisGate === false &&
    readiness.residualExecutionPerformedByThisGate === false &&
    readiness.productionPromotionAuthorized === false &&
    readiness.controlsFrozen &&
    readiness.controlCount === 16 &&
    deterministicContentHash(readiness.controlIds) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_READINESS_CONTROL_IDS) &&
    readiness.recommendedNextGate ===
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_EVIDENCE'
  );
}

function finalized(
  material: Omit<
    RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidenceReport,
    'evidenceId'
  >,
): RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidenceReport {
  return {
    evidenceId: `relationship_spouse_t8_current_bridge_residual_execution_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidence(
  readiness: RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReviewReport,
): RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidenceReport {
  const accepted = exactReadinessBoundaryAccepted(readiness);

  return finalized({
    evidenceVersion:
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_EVIDENCE'
      : 'UPSTREAM_RESIDUAL_EXECUTION_READINESS_BOUNDARY_INVALID',
    decision: accepted
      ? 'WYG_PAGE_BINDING_PENDING_YUANHAI_PRIMARY_SCAN_CANDIDATES_LOCATED_IMAGE_VERIFICATION_PENDING_MODERN_APPLICABILITY_AND_COMPOSITION_PARTIAL_LEADS_NO_AUTHORITY_ACQUIRED'
      : 'RESIDUAL_AUTHORITY_PATH_EXECUTION_EVIDENCE_NOT_ESTABLISHED',
    upstreamReadinessReviewId: readiness.reviewId,
    exactReadinessBoundaryAccepted: accepted,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    executionPerformed: accepted,
    taskEvidenceRecords: accepted
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_TASK_EXECUTION_EVIDENCE
      : Object.freeze([]),
    taskEvidenceRecordCount: accepted ? 4 : 0,
    candidateEvidence: accepted
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_CANDIDATES
      : Object.freeze([]),
    totalCandidateAttemptCount: accepted ? 10 : 0,
    qualifyingCandidateCount: 0,
    authorityAcceptedCandidateCount: 0,
    authorityGapClosedCount: 0,
    wyg0810ScanContainerLocated: accepted,
    wyg0810SamyeongRangeKnown: accepted,
    wyg0810FolioToScanPageBindingEstablished: false,
    wyg0810DirectTargetPageImageInspected: false,
    kanripoWygV5BoundedTextContextConfirmed: accepted,
    kanripoWygV6BoundedTextContextConfirmed: accepted,
    yuanhaiPrimaryHistoricalScanCandidateCount: accepted ? 2 : 0,
    yuanhaiPrimaryWitnessCandidateLocated: accepted,
    yuanhaiExactPrimaryPassagePageLocatorEstablished: false,
    yuanhaiDirectPrimaryPassageImageInspected: false,
    yuanhaiBoundedOcrSpouseRoleContextConfirmed: accepted,
    yuanhaiIndependentFromSamyeongAtWorkIdentityLevel: accepted,
    independentNormativeProvenanceEstablished: false,
    modernApplicabilityPolicyLeadCount: accepted ? 2 : 0,
    modernGenderNeutralPolicyPatternObserved: accepted,
    modernNoSexInferencePolicyPatternObserved: accepted,
    modernApplicabilityNormativeAuthorityAdequateCount: 0,
    compositionScopeLeadCount: accepted ? 2 : 0,
    multiLayerCompositionPatternObserved: accepted,
    conflictAmbiguityPatternObserved: accepted,
    scopeExclusionPatternObserved: accepted,
    exactCurrentClaimClassCompositionAuthorityEstablished: false,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    negativeAndPartialEvidencePreserved: accepted,
    fallbackSemanticSynthesisAuthorized: false,
    crossSourceStitchingAuthorized: false,
    crossTaskStitchingAuthorized: false,
    currentRelationshipT6InputPathEstablished: false,
    relationshipT6ExecutionTaskCreated: false,
    allFiveGapsRemainOpen: true,
    unresolvedGapIds: accepted ? ALL_GAP_IDS : Object.freeze([]),
    authorityAcquiredByThisGate: false,
    authorityGapClosedByThisGate: false,
    spouseT8RuleAuthoringAuthorized: false,
    spouseT8ClaimTypeCreationAuthorized: false,
    spouseInterpretationPackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    compatibilityAuthorityAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_EVIDENCE_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? 14 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      candidateAttemptsRecorded: accepted ? 10 : 0,
      evidenceRecordsCreated: accepted ? 4 : 0,
      registeredSourcesCreated: 0,
      registeredCandidatesCreated: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW'
      : 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS_REVIEW',
  });
}
