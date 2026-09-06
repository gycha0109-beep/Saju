import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8PostHaScholarlyCandidateDispositionEvidence } from './relationship-spouse-t8-post-ha-scholarly-candidate-disposition-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_EXTERNAL_CONTEXT_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-external-context-boundary-evidence-v1' as const;

export type ExternalContextBoundaryDisposition =
  | 'EXTERNAL_LIFE_FACT_REQUIRED_BY_SOURCE_WORKFLOW'
  | 'SOCIAL_ROLE_DUTY_REASSIGNMENT_NOT_NATAL_SNAPSHOT_ONLY';

export interface RelationshipSpouseT8ExternalContextBoundaryRecord {
  candidateId: string;
  author: string;
  publicationYear: number;
  title: string;
  sourceLocator: string;
  inspectedPublicSurface: 'SCHOLARLY_ABSTRACT_METADATA';
  directFullTextObjectInspected: false;
  pdfScreenshotReviewed: false;
  disposition: ExternalContextBoundaryDisposition;
  spouseSpecificPublicSurface: boolean;
  roleNeutralNatalSpouseMappingEstablished: false;
  completeDescribedWorkflowCanonicalSnapshotOnlyFit: false;
  externalContextKinds: readonly string[];
  exactBoundary: string;
  authorityImpact: 'NO_AUTHORITY_GAP_CLOSED';
}

export const RELATIONSHIP_SPOUSE_T8_EXTERNAL_CONTEXT_BOUNDARIES = Object.freeze([
  Object.freeze({
    candidateId: 'SHIN_JAEEOK_2024_DBPIA_T16939654',
    author: '신재억',
    publicationYear: 2024,
    title: '命理學 六親論 宮‧星의 변화 사례 硏究',
    sourceLocator: 'DBpia T16939654 public scholarly abstract/TOC',
    inspectedPublicSurface: 'SCHOLARLY_ABSTRACT_METADATA',
    directFullTextObjectInspected: false,
    pdfScreenshotReviewed: false,
    disposition: 'EXTERNAL_LIFE_FACT_REQUIRED_BY_SOURCE_WORKFLOW',
    spouseSpecificPublicSurface: false,
    roleNeutralNatalSpouseMappingEstablished: false,
    completeDescribedWorkflowCanonicalSnapshotOnlyFit: false,
    externalContextKinds: Object.freeze(['marriage_history', 'child_count']),
    exactBoundary:
      'The public abstract says that before interpretation the practitioner must ask whether the person has married and how many children they have in order to confirm the birth hour. Those life-history facts are not facts contained in CanonicalSajuSnapshot. This establishes an external-life-context dependency for the complete workflow described on the public surface, but it does not establish a spouse selector and must not be generalized from the abstract into the thesis body methodology.',
    authorityImpact: 'NO_AUTHORITY_GAP_CLOSED',
  }),
  Object.freeze({
    candidateId: 'HONG_YOOSEON_2022_KCI_ART003089059',
    author: '홍유선',
    publicationYear: 2022,
    title: '이데올로기적 접근을 통한 육친 간 상극관계 해석: 부부, 부자, 고부를 중심으로',
    sourceLocator:
      'KCI ART003089059 / DOI 10.54385/cbt.2022.2.2.75 / RISS A108419413, pp.75-89',
    inspectedPublicSurface: 'SCHOLARLY_ABSTRACT_METADATA',
    directFullTextObjectInspected: false,
    pdfScreenshotReviewed: false,
    disposition: 'SOCIAL_ROLE_DUTY_REASSIGNMENT_NOT_NATAL_SNAPSHOT_ONLY',
    spouseSpecificPublicSurface: true,
    roleNeutralNatalSpouseMappingEstablished: false,
    completeDescribedWorkflowCanonicalSnapshotOnlyFit: false,
    externalContextKinds: Object.freeze(['social_ideology', 'imposed_duties', 'social_roles']),
    exactBoundary:
      'The KCI abstract explicitly proposes reinterpreting and resetting Yukchin Ten-Star relations using duties and roles imposed on individuals by social ideology. It explains wife=Wealth through patriarchal post-marriage duties and husband=Officer through the husband controlling the wife under that ideology. The criterion therefore depends on external normative social-role context rather than natal-chart facts alone, and the exposed spouse explanation remains wife/husband gender-framed. Gender critique or modern reassignment intent is not an explicit role-neutral natal spouse selector.',
    authorityImpact: 'NO_AUTHORITY_GAP_CLOSED',
  }),
] as const satisfies readonly RelationshipSpouseT8ExternalContextBoundaryRecord[]);

export const RELATIONSHIP_SPOUSE_T8_EXTERNAL_CONTEXT_BOUNDARY_CONTROL_IDS = Object.freeze([
  'PUBLIC_ABSTRACT_IS_NOT_RELABELED_AS_DIRECT_FULLTEXT_BODY_INSPECTION',
  'SHIN_2024_BIRTH_TIME_VERIFICATION_LIFE_FACTS_ARE_NOT_CANONICAL_SNAPSHOT_FACTS',
  'SHIN_2024_EXTERNAL_WORKFLOW_DEPENDENCY_IS_NOT_GENERALIZED_INTO_A_SPOUSE_SELECTOR',
  'HONG_2022_SOCIAL_IDEOLOGY_DUTY_ROLE_CONTEXT_IS_NOT_INVENTED_FROM_NATAL_FACTS',
  'HONG_2022_GENDER_CRITIQUE_IS_NOT_EQUIVALENT_TO_ROLE_NEUTRAL_NATAL_MAPPING',
  'HONG_2022_WIFE_WEALTH_AND_HUSBAND_OFFICER_EXPLANATION_IS_NOT_UNIVERSALIZED',
  'NO_EXTERNAL_LIFE_FACT_OR_SOCIAL_ROLE_CONTEXT_IS_SYNTHESIZED_FROM_CANONICAL_SAJU_SNAPSHOT',
  'NO_CROSS_SOURCE_SPOUSE_SEMANTIC_STITCHING',
  'INDEPENDENT_NORMATIVE_PROVENANCE_FOR_CURRENT_SPOUSE_METHOD_REMAINS_OPEN',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_ONE_OF_FIVE_AUTHORITY_GAPS_REMAINS_CLOSED',
  'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
] as const);

export interface RelationshipSpouseT8ExternalContextBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_EXTERNAL_CONTEXT_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status: 'MATERIAL_EXTERNAL_CONTEXT_BOUNDARIES_ESTABLISHED_NO_ROLE_NEUTRAL_AUTHORITY_CLOSURE';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  boundaries: typeof RELATIONSHIP_SPOUSE_T8_EXTERNAL_CONTEXT_BOUNDARIES;
  boundaryCount: 2;
  directFullTextObjectCount: 0;
  pdfScreenshotReviewedCount: 0;
  roleNeutralNatalMappingEstablished: false;
  canonicalSnapshotOnlySpouseMethodEstablished: false;
  independentNormativeProvenanceForCurrentSpouseMethodEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  qualifyingPrimaryWitnessGapRemainsClosed: true;
  authorityGapsClosedCount: 1;
  authorityGapsOpenCount: 4;
  authorityAdmissionReady: false;
  spouseT8ProducerReady: false;
  productionPromotionReady: false;
  controlIds: typeof RELATIONSHIP_SPOUSE_T8_EXTERNAL_CONTEXT_BOUNDARY_CONTROL_IDS;
  controlCount: 14;
  recommendedNextAction:
    'ACQUIRE_KIM_YOUNGJIN_2020_ACTUAL_BODY_THEN_JUNG_SUA_2025_THEN_SHIN_JAEEOK_2024_AND_ONLY_ADMIT_A_SAME_SOURCE_EXPLICIT_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_WITH_COMPLETE_GOVERNED_INPUTS';
}

export function buildRelationshipSpouseT8ExternalContextBoundaryEvidence(): RelationshipSpouseT8ExternalContextBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8PostHaScholarlyCandidateDispositionEvidence();
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_EXTERNAL_CONTEXT_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status:
      'MATERIAL_EXTERNAL_CONTEXT_BOUNDARIES_ESTABLISHED_NO_ROLE_NEUTRAL_AUTHORITY_CLOSURE' as const,
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    boundaries: RELATIONSHIP_SPOUSE_T8_EXTERNAL_CONTEXT_BOUNDARIES,
    boundaryCount: 2 as const,
    directFullTextObjectCount: 0 as const,
    pdfScreenshotReviewedCount: 0 as const,
    roleNeutralNatalMappingEstablished: false as const,
    canonicalSnapshotOnlySpouseMethodEstablished: false as const,
    independentNormativeProvenanceForCurrentSpouseMethodEstablished: false as const,
    currentGovernedMethodSemanticCorrespondenceEstablished: false as const,
    currentRelationshipT6InputPathEstablished: false as const,
    qualifyingPrimaryWitnessGapRemainsClosed: true as const,
    authorityGapsClosedCount: 1 as const,
    authorityGapsOpenCount: 4 as const,
    authorityAdmissionReady: false as const,
    spouseT8ProducerReady: false as const,
    productionPromotionReady: false as const,
    controlIds: RELATIONSHIP_SPOUSE_T8_EXTERNAL_CONTEXT_BOUNDARY_CONTROL_IDS,
    controlCount: 14 as const,
    recommendedNextAction:
      'ACQUIRE_KIM_YOUNGJIN_2020_ACTUAL_BODY_THEN_JUNG_SUA_2025_THEN_SHIN_JAEEOK_2024_AND_ONLY_ADMIT_A_SAME_SOURCE_EXPLICIT_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_WITH_COMPLETE_GOVERNED_INPUTS' as const,
  };

  return Object.freeze({
    evidenceId: `relationship_spouse_t8_external_context_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  });
}
