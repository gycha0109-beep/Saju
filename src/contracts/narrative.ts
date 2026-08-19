import type { FactState, VersionedRef } from './common.js';
import type { ClaimRelation, InterpretationClaim } from './interpretation.js';

export type NarrativePurpose =
  | 'full_reading'
  | 'section_reading'
  | 'question_answer'
  | 'method_comparison';

export interface SelectedFact {
  ref: string;
  path: string;
  scenarioRef?: string;
  fact: FactState<unknown>;
}

export interface SourceSummary {
  sourceId: string;
  title: string;
  summary: string;
}

export interface NarrativeEvidenceBundle {
  requestId: string;
  purpose: NarrativePurpose;
  snapshotId: string;
  interpretationRunId: string;
  registrySnapshotId: string;
  canonicalFacts: readonly SelectedFact[];
  claims: readonly InterpretationClaim[];
  claimRelations: readonly ClaimRelation[];
  sourceSummaries?: readonly SourceSummary[];
  narrativePolicyVersion: string;
  constraints: {
    mayRecalculate: false;
    mayInventRules: false;
    mustPreserveMethodDifferences: true;
    mustDiscloseMaterialAmbiguity: true;
  };
}

export interface NarrativePolicy {
  policyId: string;
  version: string;
  language: string;
  certaintyPolicy: {
    deterministicFacts: 'direct';
    interpretationClaims: 'method_attributed';
    contestedClaims: 'explicit_difference';
    ambiguousFacts: 'explicit_uncertainty';
    futureClaims: 'non_deterministic';
  };
  tone: {
    style: 'clear' | 'consultative' | 'traditional';
    avoidFatalism: boolean;
    avoidFearInduction: boolean;
  };
  sensitiveDomains: {
    health: 'non_diagnostic';
    finance: 'non_advisory';
    legal: 'non_advisory';
    safety: 'no_harmful_direction';
  };
  sourceDisclosure: 'internal_only' | 'on_request' | 'visible';
}

export interface GroundedNarrativeRequest {
  requestId: string;
  purpose: NarrativePurpose;
  evidenceBundle: NarrativeEvidenceBundle;
  userRequest?: {
    question?: string;
    requestedSection?: string;
    preferredDetail?: 'concise' | 'standard' | 'detailed';
  };
  narrativePolicyRef: VersionedRef;
  outputSchemaVersion: string;
}

export type NarrativeEpistemicType =
  | 'deterministic_fact'
  | 'interpretation'
  | 'synthesis'
  | 'future_tendency';

export interface NarrativeAssertion {
  type: 'assertion';
  text: string;
  epistemicType: NarrativeEpistemicType;
  evidenceRefs: readonly {
    sourceType: 'canonical_fact' | 'claim';
    ref: string;
  }[];
  methodologyRefs?: readonly VersionedRef[];
}

export interface NarrativeComparison {
  type: 'comparison';
  topic: string;
  perspectives: readonly {
    methodologyRef: VersionedRef;
    summary: string;
    claimRefs: readonly string[];
  }[];
  synthesis?: string;
}

export interface NarrativeDisclosure {
  type: 'disclosure';
  disclosureType:
    | 'calculation_ambiguity'
    | 'methodology_difference'
    | 'insufficient_evidence'
    | 'scope_limitation';
  text: string;
  relatedRefs: readonly string[];
}

export interface NarrativeTransition {
  type: 'transition';
  text: string;
}

export type NarrativeBlock =
  | NarrativeAssertion
  | NarrativeComparison
  | NarrativeDisclosure
  | NarrativeTransition;

export interface NarrativeSection {
  sectionId: string;
  title: string;
  blocks: readonly NarrativeBlock[];
}

export interface NarrativeUnresolvedItem {
  question: string;
  reason:
    | 'no_matching_claim'
    | 'insufficient_resolved_facts'
    | 'methodology_not_enabled'
    | 'material_conflict';
}

export interface NarrativeDraft {
  schemaVersion: string;
  requestId: string;
  sections: readonly NarrativeSection[];
  unresolvedQuestions?: readonly NarrativeUnresolvedItem[];
}

export interface NarrativeRun {
  narrativeRunId: string;
  requestId: string;
  interpretationRunId: string;
  evidenceBundleHash: string;
  modelProvider: string;
  modelId: string;
  modelRevision?: string;
  promptCompilerVersion: string;
  narrativePolicyRef: VersionedRef;
  outputSchemaVersion: string;
  generationParams: {
    temperature?: number;
    maxOutputTokens?: number;
  };
  validation: {
    firstPass: 'passed' | 'failed';
    repairAttempted: boolean;
    final: 'passed' | 'failed' | 'fallback';
    violations: readonly string[];
  };
  createdAt: string;
}
