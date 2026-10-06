import type { CanonicalReadingSemanticTextV1 } from './canonical-reading-semantics.js';

export const OFFICIAL_READING_DETAILED_MATERIAL_SCHEMA_VERSION =
  'myeonghwa-official-reading-detailed-material-v1' as const;

export type OfficialReadingDetailedDomainKeyV1 =
  | 'general:natal'
  | 'career:natal'
  | 'wealth:natal'
  | 'relationship:natal:general'
  | 'business:natal';

export type OfficialReadingDetailedMaterialRoleV1 =
  | 'clarification'
  | 'condition'
  | 'boundary'
  | 'rationale'
  | 'structural_evidence'
  | 'scenario_note'
  | 'tension_note';

export interface OfficialReadingDetailedMaterialBaselineV1 {
  canonicalMeaningHash: string;
  qualifierStateHash: string;
  limitationStateHash: string;
  structuralContextHash: string;
}

export interface OfficialReadingDetailedMaterialProvenanceV1 {
  authorityId: string;
  authorityVersion: string;
  sourceRefs: readonly string[];
}

export interface ApprovedOfficialReadingDetailedSourceProfileV1 {
  owner: OfficialReadingDetailedDomainKeyV1;
  profileId: string;
  profileVersion: string;
  claimType: string;
  methodologyRef: {
    id: string;
    version: string;
  };
  standardText: CanonicalReadingSemanticTextV1;
  semanticQualifiers: readonly unknown[];
  prohibitedExtensions: readonly string[];
  supportingClaimTypes: readonly string[];
  scenarioPolicy: 'none' | 'preserve';
  contradictionPolicy: 'none' | 'preserve';
  approvedTextByRole: Readonly<
    Partial<Record<OfficialReadingDetailedMaterialRoleV1, string>>
  >;
  provenance: OfficialReadingDetailedMaterialProvenanceV1;
}

export interface ApprovedOfficialReadingDetailedMaterialDefinitionV1 {
  schemaVersion: typeof OFFICIAL_READING_DETAILED_MATERIAL_SCHEMA_VERSION;
  owner: OfficialReadingDetailedDomainKeyV1;
  materialId: string;
  materialVersion: string;
  semanticKey: string;
  claimType: string;
  methodologyRef: {
    id: string;
    version: string;
  };
  scenarioRef?: string;
  role: OfficialReadingDetailedMaterialRoleV1;
  approvedText: string;
  standardText: CanonicalReadingSemanticTextV1;
  baseline: OfficialReadingDetailedMaterialBaselineV1;
  provenance: OfficialReadingDetailedMaterialProvenanceV1;
  prohibitedExtensions: readonly string[];
}
