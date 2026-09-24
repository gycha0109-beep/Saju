export const R101_SOURCE_REPRODUCTION_FALLBACK_VERSION = '0.1.0-research' as const;

export type R101FallbackRelationship =
  | 'EXACT_TARGET_REPRODUCTION'
  | 'SAME_EDITION_DIFFERENT_COPY'
  | 'SAME_LINEAGE_DIFFERENT_EDITION'
  | 'DERIVATIVE_OCR_OR_TRANSCRIPTION'
  | 'UNRESOLVED_RELATIONSHIP';

export const R101_FALLBACK_RELATIONSHIPS = Object.freeze([
  'EXACT_TARGET_REPRODUCTION',
  'SAME_EDITION_DIFFERENT_COPY',
  'SAME_LINEAGE_DIFFERENT_EDITION',
  'DERIVATIVE_OCR_OR_TRANSCRIPTION',
  'UNRESOLVED_RELATIONSHIP',
] as const);

export interface R101EvidenceUsePolicy {
  relationship: R101FallbackRelationship;
  mayAidLocator: boolean;
  mayCorroborateTextWithinDeclaredScope: boolean;
  mayEstablishExactTargetGlyph: boolean;
  mayEstablishExactTargetPage: boolean;
  mayEstablishEditionIdentity: boolean;
  mayCloseDirectInspectionRequirement: boolean;
  requiresRelationshipEvidence: boolean;
  requiresR097DirectInspectionForExactGlyphOrPage: boolean;
  boundary: readonly string[];
}

export const R101_EVIDENCE_USE_POLICIES: readonly R101EvidenceUsePolicy[] =
  Object.freeze([
    {
      relationship: 'EXACT_TARGET_REPRODUCTION',
      mayAidLocator: true,
      mayCorroborateTextWithinDeclaredScope: true,
      mayEstablishExactTargetGlyph: true,
      mayEstablishExactTargetPage: true,
      mayEstablishEditionIdentity: true,
      mayCloseDirectInspectionRequirement: true,
      requiresRelationshipEvidence: true,
      requiresR097DirectInspectionForExactGlyphOrPage: true,
      boundary: [
        'Exact-glyph and exact-page claims require an R097 direct-inspection manifest bound to the exact target witness.',
        'Relationship classification alone does not verify a textual proposition.',
        'Edition identity still requires R091 evidence; target-reproduction status does not fabricate edition metadata.',
      ],
    },
    {
      relationship: 'SAME_EDITION_DIFFERENT_COPY',
      mayAidLocator: true,
      mayCorroborateTextWithinDeclaredScope: true,
      mayEstablishExactTargetGlyph: false,
      mayEstablishExactTargetPage: false,
      mayEstablishEditionIdentity: true,
      mayCloseDirectInspectionRequirement: false,
      requiresRelationshipEvidence: true,
      requiresR097DirectInspectionForExactGlyphOrPage: false,
      boundary: [
        'A different physical copy may support the evidenced edition identity but not the target copy exact glyph or page.',
        'Copy-specific defects, annotations, missing leaves, rebinding, and scan ordering remain target-witness questions.',
        'Same-edition status requires evidence and must not be inferred from title, host, or similar text.',
      ],
    },
    {
      relationship: 'SAME_LINEAGE_DIFFERENT_EDITION',
      mayAidLocator: true,
      mayCorroborateTextWithinDeclaredScope: true,
      mayEstablishExactTargetGlyph: false,
      mayEstablishExactTargetPage: false,
      mayEstablishEditionIdentity: false,
      mayCloseDirectInspectionRequirement: false,
      requiresRelationshipEvidence: true,
      requiresR097DirectInspectionForExactGlyphOrPage: false,
      boundary: [
        'Lineage relation may explain textual overlap but does not establish target-edition identity.',
        'Variant wording, ordering, commentary strata, and pagination must remain edition-specific.',
        'Textual overlap is not independent corroboration when inheritance is plausible.',
      ],
    },
    {
      relationship: 'DERIVATIVE_OCR_OR_TRANSCRIPTION',
      mayAidLocator: true,
      mayCorroborateTextWithinDeclaredScope: true,
      mayEstablishExactTargetGlyph: false,
      mayEstablishExactTargetPage: false,
      mayEstablishEditionIdentity: false,
      mayCloseDirectInspectionRequirement: false,
      requiresRelationshipEvidence: true,
      requiresR097DirectInspectionForExactGlyphOrPage: false,
      boundary: [
        'OCR or transcription is a derivative surface and is not the witness image.',
        'Derivative text may narrow a locator or corroborate a reading only within declared uncertainty.',
        'OCR/transcription must never replace R097 visual inspection where exact glyph or page is required.',
      ],
    },
    {
      relationship: 'UNRESOLVED_RELATIONSHIP',
      mayAidLocator: true,
      mayCorroborateTextWithinDeclaredScope: false,
      mayEstablishExactTargetGlyph: false,
      mayEstablishExactTargetPage: false,
      mayEstablishEditionIdentity: false,
      mayCloseDirectInspectionRequirement: false,
      requiresRelationshipEvidence: false,
      requiresR097DirectInspectionForExactGlyphOrPage: false,
      boundary: [
        'Unknown relation remains unknown.',
        'A candidate surface may be retained as a search lead without being counted as corroborating evidence.',
        'No independence, edition identity, lineage, or target-witness equivalence is inferred.',
      ],
    },
  ]);

export const R101_REQUIRED_ASSERTION_FIELDS = Object.freeze([
  'ASSERTION_ID',
  'TARGET_WITNESS_REF',
  'FALLBACK_WITNESS_OR_DERIVATIVE_REF',
  'RELATIONSHIP',
  'RELATIONSHIP_EVIDENCE_REFS',
  'WORK_IDENTITY_REF',
  'TARGET_EDITION_IDENTITY_REF_OR_UNKNOWN',
  'FALLBACK_EDITION_IDENTITY_REF_OR_UNKNOWN',
  'LINEAGE_ASSERTION_REF_OR_UNKNOWN',
  'ALLOWED_EVIDENCE_PURPOSES',
  'PROHIBITED_EVIDENCE_PURPOSES',
  'RECORDED_AT',
] as const);

export const R101_NON_EQUIVALENCE_INVARIANTS = Object.freeze([
  'SAME_TEXT_DOES_NOT_IMPLY_SAME_EDITION',
  'SAME_EDITION_DOES_NOT_IMPLY_SAME_COPY',
  'SAME_LINEAGE_DOES_NOT_IMPLY_SAME_EDITION',
  'SAME_HOST_DOES_NOT_IMPLY_SAME_WITNESS',
  'DIFFERENT_HOST_DOES_NOT_IMPLY_INDEPENDENT_PROVENANCE',
  'OCR_OR_TRANSCRIPTION_DOES_NOT_EQUAL_WITNESS_IMAGE',
  'LOCATOR_AID_DOES_NOT_EQUAL_TEXTUAL_VERIFICATION',
  'TEXTUAL_CORROBORATION_DOES_NOT_EQUAL_EXACT_GLYPH_VERIFICATION',
  'FALLBACK_RELATIONSHIP_DOES_NOT_CLOSE_TARGET_DIRECT_INSPECTION',
  'FALLBACK_EVIDENCE_DOES_NOT_PROMOTE_RESEARCH_AUTHORITY',
] as const);

export const R101_ESCALATION_RULES = Object.freeze([
  'EXACT_GLYPH_REQUIRED_THEN_REQUIRE_EXACT_TARGET_R097_INSPECTION',
  'EXACT_PAGE_REQUIRED_THEN_REQUIRE_EXACT_TARGET_R097_INSPECTION',
  'TARGET_COPY_SPECIFIC_CLAIM_THEN_REQUIRE_TARGET_COPY',
  'RELATIONSHIP_UNRESOLVED_THEN_PRESERVE_UNKNOWN_AND_CONTINUE_PROVENANCE_RESEARCH',
  'DIRECT_INSPECTION_GATE_UNSATISFIED_THEN_ORIGINAL_FRONTIER_REMAINS_OPEN',
] as const);

export const R101_RETROSPECTIVE_CASES = Object.freeze([
  {
    frontier: 'R006',
    issueRef: '#933',
    currentBlocker: 'BLOCKED_EXTERNAL_ACQUISITION',
    fallbackUse: 'LOCATOR_OR_LINEAGE_RESEARCH_ONLY',
    originalFrontierAutoClosed: false,
  },
  {
    frontier: 'R007',
    issueRef: '#1254',
    currentBlocker: 'BLOCKED_EXTERNAL_ACQUISITION',
    fallbackUse: 'CATALOG_AND_LINEAGE_LOCATOR_ONLY_UNTIL_REPRODUCTION_ACQUIRED',
    originalFrontierAutoClosed: false,
  },
  {
    frontier: 'R008',
    issueRef: '#1255',
    currentBlocker: 'BLOCKED_EXTERNAL_ACQUISITION',
    fallbackUse: 'CATALOG_AND_LINEAGE_LOCATOR_ONLY_UNTIL_REPRODUCTION_ACQUIRED',
    originalFrontierAutoClosed: false,
  },
  {
    frontier: 'R011',
    issueRef: '#934',
    currentBlocker: 'BLOCKED_DIRECT_VISUAL_LOCATOR',
    fallbackUse: 'DERIVATIVE_TEXT_AND_ALTERNATE_WITNESS_LOCATOR_AID',
    originalFrontierAutoClosed: false,
  },
] as const);

export const R101_EXTERNAL_MODEL_NOTES = Object.freeze({
  iflaLrm:
    'Work/expression/manifestation/item distinctions support keeping edition-level and copy/item-level identity separate.',
  iiif:
    'Manifest/canvas/image-resource distinctions support keeping presentation locators separate from the underlying image resource used for inspection.',
  repositoryAuthority:
    'R091 identity, R095 lineage, R097 direct inspection, and R098 promotion boundaries remain authoritative inside this repository.',
} as const);

export const R101_AUTHORITY = Object.freeze({
  status: 'RESEARCH_FALLBACK_PROTOCOL_CANDIDATE' as const,
  researchOnly: true,
  replacesR091IdentityAuthority: false,
  replacesR095LineageAuthority: false,
  replacesR097InspectionAuthority: false,
  replacesR098PromotionAuthority: false,
  fallbackEvidenceAutoClosesOriginalFrontier: false,
  fallbackEvidenceVerifiesExactTargetGlyph: false,
  fallbackEvidenceVerifiesExactTargetPage: false,
  universalSourceEquivalenceAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
