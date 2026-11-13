export const CURRENT_2D_EVIDENCE_VERSION: 'engineering.current-2d-evidence-readiness@0.1.0';
export type Current2dEvidenceState = 'candidate_only' | 'partial' | 'unavailable' | 'not_evaluated';
export type Current2dFeatureEvidence = Readonly<{
  featureKey: string;
  label: string;
  state: Current2dEvidenceState;
  reason: string;
  nextEvidence: string;
  independentAccuracyValidated: false;
  canonicalF0Admitted: false;
  traditionalBindingAuthorized: false;
  productInterpretationAuthorized: false;
}>;
export type Current2dEvidenceSummary = Readonly<{
  methodVersion: typeof CURRENT_2D_EVIDENCE_VERSION;
  status: 'research_only';
  featureCount: 6;
  empiricalValidationCompleted: false;
  canonicalFeatureCountUnchanged: 29;
  unresolvedHardGapsUnchanged: 11;
  rawSourcePersistedOrEmitted: false;
  features: readonly Current2dFeatureEvidence[];
}>;
export function summarizeCurrent2dPhotoEvidence(input?: {
  viewRole?: 'frontal' | 'profile';
  parsing?: { status: string; methodVersion?: string } | null;
  previous?: boolean;
  foreheadSkinCandidate?: unknown;
  browPixelTextureCandidate?: unknown;
  lipPixelColorCandidate?: unknown;
  earMaskCandidate?: unknown;
  earRimCurveComparison?: unknown;
  currentEarRevision?: number | null;
  eyelidReview?: unknown;
}): Current2dEvidenceSummary;


export const CURRENT_2D_BATCH_EVIDENCE_VERSION: 'engineering.current-2d-session-coverage@0.1.0';
export type Current2dSessionCoverage = Readonly<{
  methodVersion: typeof CURRENT_2D_BATCH_EVIDENCE_VERSION;
  status: 'unverified_local_preview_coverage_only';
  includedPhotoCount: number;
  featureCount: 6;
  totalPhotoFeatureEntries: number;
  statusCounts: Readonly<Record<Current2dEvidenceState, number>>;
  features: readonly (Readonly<{
    featureKey: string;
    label: string;
  }> & Readonly<Record<Current2dEvidenceState, number>>)[];
  independentAccuracyValidated: false;
  independentRepeatabilityValidated: false;
  canonicalF0Admitted: false;
  traditionalBindingAuthorized: false;
  productInterpretationAuthorized: false;
  rawSourcePersistedOrEmitted: false;
}>;
export function summarizeCurrent2dSessionCoverage(
  photoSummaries: readonly Current2dEvidenceSummary[]
): Current2dSessionCoverage;
