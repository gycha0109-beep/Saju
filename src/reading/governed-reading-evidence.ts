import type { ClaimRelation, InterpretationClaim } from '../contracts/interpretation.js';
import type {
  NarrativePurpose,
  SelectedFact,
  SourceSummary,
} from '../contracts/narrative.js';

export const GOVERNED_READING_EVIDENCE_SCHEMA_VERSION =
  'myeonghwa-governed-reading-evidence-v1' as const;

export interface GovernedReadingEvidenceContentV1 {
  requestId: string;
  purpose: NarrativePurpose;
  snapshotId: string;
  interpretationRunId: string;
  registrySnapshotId: string;
  canonicalFacts: readonly SelectedFact[];
  claims: readonly InterpretationClaim[];
  claimRelations: readonly ClaimRelation[];
  sourceSummaries?: readonly SourceSummary[];
  constraints: {
    mayRecalculate: false;
    mayInventRules: false;
    mustPreserveMethodDifferences: true;
    mustDiscloseMaterialAmbiguity: true;
  };
}

export interface GovernedReadingEvidenceBundleV1
  extends GovernedReadingEvidenceContentV1 {
  schemaVersion: typeof GOVERNED_READING_EVIDENCE_SCHEMA_VERSION;
}

export interface BuiltGovernedReadingEvidenceBundleV1 {
  bundle: GovernedReadingEvidenceBundleV1;
  evidenceBundleHash: string;
}
