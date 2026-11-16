export const WHOLE_FACE_MAPPING_AUDIT_VERSION: 'whole-face-source-mapping-audit@0.1.0';
export type SourceMappingRow = Readonly<{
  number: number;
  region: string;
  featureKey: string;
  outputType: string;
  calculatorMaterialized: boolean;
  requiredExtractor: string;
  sourcePaths: readonly string[];
  missingSourcePaths: readonly string[];
  observationRequirement: string;
  captureRequirement: string;
  visibilityRequirement: string;
  photoValidationNeed: string;
  hardGapLane: string | null;
  hardGapNextEvidence: string | null;
  sourceRegionContext: string;
  sourceLineageRefs: readonly string[];
  sourceVerificationState: string;
  photoExtractionValidated: false;
  independentAccuracyValidated: false;
  morphologyPredicateMapped: false;
  traditionalBindingAuthorized: false;
  productInterpretationAuthorized: false;
}>;
export type ExtensionMappingRow = Readonly<{
  number: number;
  requirement: string;
  relatedCanonicalKeys: readonly string[];
  sourceReferenceText: string;
  independentEvidenceNeeded: string;
  studyTechnique: string;
  existingResearchCandidate: null | Readonly<{
    sourcePath: string;
    methodVersion: string;
    outputField: string;
    candidateOnly: true;
    actualInnerBrowGroundTruthValidated: false;
  }>;
  extensionAdmitted: false;
  independentAccuracyValidated: false;
  traditionalBindingAuthorized: false;
  productInterpretationAuthorized: false;
}>;
export type WholeFaceMappingAudit = Readonly<{
  schemaVersion: typeof WHOLE_FACE_MAPPING_AUDIT_VERSION;
  canonicalFeatureCount: 29;
  materializedCalculatorCount: 18;
  unavailableOrNewExtractorCount: 11;
  unapprovedExtensionCount: 18;
  missingReferencedSourceFileCount: number;
  traditionalPredicatesMapped: 0;
  photoExtractionAccuracyValidated: false;
  productInterpretationAuthorized: false;
  canonical: readonly SourceMappingRow[];
  extensions: readonly ExtensionMappingRow[];
}>;
export function auditWholeFaceSourceMapping(input: {
  mappingMarkdown: string;
  columns: readonly unknown[];
  authorityEntries: readonly unknown[];
  hardGaps: readonly unknown[];
  readingItems: readonly unknown[];
  sourceExists: (path: string) => boolean;
  browEnvelopeVersion: string;
}): WholeFaceMappingAudit;

export function renderWholeFaceMappingAuditMarkdown(audit: WholeFaceMappingAudit): string;
