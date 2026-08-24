import type { ContentAddressedVersionedRef, VersionedRef } from './common.js';

export type TaxonomyTier =
  | 'T0'
  | 'T1'
  | 'T2'
  | 'T3'
  | 'T4'
  | 'T5'
  | 'T6'
  | 'T7'
  | 'T8'
  | 'T9'
  | 'T10'
  | 'T11';

export type MethodologyFamily =
  | 'structural_balance'
  | 'day_master_strength'
  | 'gyeokguk'
  | 'yongshin'
  | 'ten_gods'
  | 'stem_branch_interaction'
  | 'shinsal'
  | 'domain_synthesis'
  | 'time_dynamics'
  | 'compatibility';

export type ProvenanceTier =
  | 'primary'
  | 'scholarly_secondary'
  | 'practitioner_secondary'
  | 'cross_reference'
  | 'heuristic'
  | 'internal';

export interface SourceReference {
  sourceId: string;
  sourceType:
    | 'classical_text'
    | 'modern_book'
    | 'paper'
    | 'article'
    | 'web'
    | 'repository'
    | 'dataset'
    | 'practitioner_note'
    | 'internal_research';
  title: string;
  author?: string;
  editor?: string;
  publisher?: string;
  edition?: string;
  publicationYear?: number;
  language?: string;
  locator?: {
    volume?: string;
    chapter?: string;
    section?: string;
    page?: string;
    anchor?: string;
  };
  url?: string;
  accessedAt?: string;
  provenanceTier: ProvenanceTier;
  rights?: {
    license?: string;
    copyrightStatus?: 'public_domain' | 'copyrighted' | 'open_license' | 'unknown';
    reusePolicy?: 'metadata_only' | 'paraphrase_only' | 'quoted_with_limit' | 'code_reuse_allowed';
  };
  notes?: string;
}

export interface ContentAddressedSourceRef {
  sourceId: string;
  contentHash: string;
}

export type MethodologyInputMode = 'allowed' | 'required' | 'forbidden';

export interface MethodologyFactInputContract {
  source: 'canonical_fact' | 'derived_fact';
  pathPattern: string;
  mode: MethodologyInputMode;
  rationale: string;
}

export interface MethodologyClaimInputContract {
  source: 'interpretation_claim';
  claimType: string;
  mode: MethodologyInputMode;
  rationale: string;
}

export interface MethodologyInputContract {
  factInputs?: readonly MethodologyFactInputContract[];
  claimInputs?: readonly MethodologyClaimInputContract[];
}

export interface MethodologyDefinition {
  methodologyId: string;
  version: string;
  family: MethodologyFamily;
  name: string;
  description: string;
  assumptions: readonly string[];
  requiredFactTypes: readonly string[];
  optionalFactTypes?: readonly string[];
  inputContract?: MethodologyInputContract;
  sourceIds: readonly string[];
  status: 'research' | 'reviewed' | 'active' | 'deprecated';
  supersedes?: string;
}

export interface InterpretationPack {
  packId: string;
  version: string;
  name: string;
  methodologyRefs: readonly VersionedRef[];
  enabledRuleSets: readonly string[];
  disabledRuleIds?: readonly string[];
  conflictPolicy: 'preserve_all' | 'prefer_declared_methodology';
  ambiguityPolicy: 'propagate' | 'skip_requires_resolved';
  compositionPolicyRef: VersionedRef;
  claimContractMode?: 'legacy_permissive' | 'registered_required';
  status: 'research' | 'staging' | 'production' | 'deprecated';
}

export type AmbiguityBehavior =
  | 'requires_resolved'
  | 'invariant_across_candidates'
  | 'scenario_preserving';

export interface RuleInputRequirement {
  key: string;
  source: 'canonical_fact' | 'derived_fact' | 'interpretation_claim';
  pathOrClaimType: string;
  acceptedStatuses?: readonly ('resolved' | 'ambiguous' | 'unavailable')[];
  required: boolean;
  ambiguityBehavior: AmbiguityBehavior;
}

export type RuleOperand =
  | { kind: 'input'; key: string; path?: string }
  | { kind: 'literal'; value: unknown };

export type RuleExpression =
  | { op: 'eq'; left: RuleOperand; right: RuleOperand }
  | { op: 'in'; value: RuleOperand; set: readonly unknown[] }
  | { op: 'gt' | 'gte' | 'lt' | 'lte'; left: RuleOperand; right: RuleOperand }
  | { op: 'and'; expressions: readonly RuleExpression[] }
  | { op: 'or'; expressions: readonly RuleExpression[] }
  | { op: 'not'; expression: RuleExpression }
  | { op: 'exists'; value: RuleOperand };

export interface RuleOutputTemplate {
  claimType: string;
  subject: string;
  predicate: string;
  value: unknown;
  polarity?: 'supportive' | 'challenging' | 'neutral' | 'mixed';
  emphasis?: 'minor' | 'moderate' | 'major';
  tags?: readonly string[];
}

export interface RuleSourceLink {
  sourceId: string;
  supportType:
    | 'direct_basis'
    | 'interpretive_basis'
    | 'corroboration'
    | 'contrast'
    | 'implementation_reference';
  notes?: string;
}

export interface RuleQualityMetadata {
  provenanceQuality:
    | 'primary_supported'
    | 'multi_source_supported'
    | 'secondary_only'
    | 'single_practitioner'
    | 'heuristic'
    | 'unknown';
  testCoverage: 'none' | 'examples' | 'unit' | 'fixture_matrix' | 'regression_suite';
  methodologyStability: 'stable_within_method' | 'contested' | 'experimental';
  reviewerStatus: 'unreviewed' | 'internal_reviewed' | 'domain_reviewed';
}

export interface RuleDefinition {
  ruleId: string;
  version: string;
  ruleSetId: string;
  taxonomy: {
    tier: Exclude<TaxonomyTier, 'T0'>;
    category: string;
    subcategory?: string;
  };
  methodologyRef: VersionedRef;
  title: string;
  description: string;
  inputs: readonly RuleInputRequirement[];
  condition: RuleExpression;
  output: RuleOutputTemplate;
  sourceRefs: readonly RuleSourceLink[];
  quality: RuleQualityMetadata;
  status: 'research' | 'reviewed' | 'active' | 'deprecated' | 'rejected';
  relations?: {
    conflictsWith?: readonly string[];
    requires?: readonly string[];
    supersedes?: readonly string[];
    mutuallyExclusiveWith?: readonly string[];
  };
}

export type RuleEvaluationStatus =
  | 'matched'
  | 'not_matched'
  | 'skipped_missing_input'
  | 'skipped_ambiguous_input'
  | 'skipped_dependency_unresolved'
  | 'skipped_disabled'
  | 'blocked_policy'
  | 'error';

export interface RuleEvaluation {
  evaluationId: string;
  ruleRef: VersionedRef;
  snapshotId: string;
  scenarioRef?: string;
  interpretationPackRef: VersionedRef;
  status: RuleEvaluationStatus;
  inputRefs: readonly {
    sourceType: 'fact' | 'claim';
    idOrPath: string;
    observedValue?: unknown;
  }[];
  emittedClaimIds: readonly string[];
  evaluatedAt: string;
}

export interface InterpretationClaim {
  claimId: string;
  schemaVersion: string;
  snapshotId: string;
  scenarioRef?: string;
  taxonomy: {
    tier: Exclude<TaxonomyTier, 'T0'>;
    category: string;
    subcategory?: string;
  };
  claimType: string;
  subject: string;
  predicate: string;
  value: unknown;
  methodologyRef: VersionedRef;
  ruleRefs: readonly {
    ruleId: string;
    version: string;
    evaluationId: string;
  }[];
  factRefs: readonly string[];
  upstreamClaimRefs: readonly string[];
  sourceRefs: readonly string[];
  polarity?: 'supportive' | 'challenging' | 'neutral' | 'mixed';
  emphasis?: 'minor' | 'moderate' | 'major';
  state: 'active' | 'superseded' | 'retracted';
}

export type ClaimRelationType =
  | 'supports'
  | 'qualifies'
  | 'contradicts'
  | 'depends_on'
  | 'derived_from'
  | 'supersedes';

export interface ClaimRelation {
  relationId: string;
  fromClaimId: string;
  toClaimId: string;
  relation: ClaimRelationType;
  reason?: string;
}

export interface EvidenceIndexEntry {
  claimId: string;
  factRefs: readonly string[];
  upstreamClaimRefs: readonly string[];
  sourceRefs: readonly string[];
  ruleRefs: readonly VersionedRef[];
  methodologyRef: VersionedRef;
}

export type ClaimValueSchemaNode =
  | { kind: 'string'; enum?: readonly string[] }
  | { kind: 'number'; integer?: boolean }
  | { kind: 'boolean' }
  | { kind: 'null' }
  | { kind: 'literal'; value: unknown }
  | { kind: 'array'; items: ClaimValueSchemaNode; minItems?: number; maxItems?: number }
  | {
      kind: 'object';
      required: readonly string[];
      properties: Readonly<Record<string, ClaimValueSchemaNode>>;
      additionalProperties: boolean;
    }
  | { kind: 'union'; anyOf: readonly ClaimValueSchemaNode[] };

export interface ClaimValueSchemaDefinition {
  schemaId: string;
  version: string;
  root: ClaimValueSchemaNode;
}

export interface ClaimTypeDefinition {
  claimType: string;
  version: string;
  valueSchemaRef: VersionedRef;
  scope: 'natal' | 'period' | 'compatibility' | 'question';
  exclusiveValue: boolean;
  scenarioSensitive: boolean;
  materialForNarrative: boolean;
  allowedTaxonomyTiers: readonly TaxonomyTier[];
}

export interface CompositionPolicy {
  compositionPolicyId: string;
  version: string;
  allowedMethodologyCombinations: readonly {
    families: readonly MethodologyFamily[];
    mode: 'allowed' | 'comparison_only' | 'forbidden';
  }[];
}

export type ReviewSubjectType = 'methodology' | 'rule';
export type ReviewLevel = 'internal' | 'domain';
export type ReviewDecision = 'approved' | 'rejected';

export interface ReviewAttestation {
  attestationId: string;
  subjectType: ReviewSubjectType;
  subjectRef: ContentAddressedVersionedRef;
  reviewLevel: ReviewLevel;
  reviewerId: string;
  reviewedAt: string;
  decision: ReviewDecision;
  notes?: string;
}

export interface ContentAddressedReviewAttestationRef {
  attestationId: string;
  contentHash: string;
}

export interface RuleRegistrySnapshot {
  registrySnapshotId: string;
  createdAt: string;
  rules: readonly ContentAddressedVersionedRef[];
  methodologies: readonly ContentAddressedVersionedRef[];
  sources: readonly ContentAddressedSourceRef[];
  claimTypeDefinitions?: readonly ContentAddressedVersionedRef[];
  claimValueSchemas?: readonly ContentAddressedVersionedRef[];
  reviewAttestations: readonly ContentAddressedReviewAttestationRef[];
  packRef: ContentAddressedVersionedRef;
}

export interface ExecutionCompleteness {
  state: 'complete' | 'partial' | 'failed';
  completedCoreGroups: readonly string[];
  blockedCoreGroups: readonly string[];
  skippedOptionalGroups: readonly string[];
  reasons: readonly string[];
}

export interface InterpretationRun {
  interpretationRunId: string;
  requestId: string;
  snapshotId: string;
  snapshotHash: string;
  registrySnapshotId: string;
  packRef: VersionedRef;
  compositionPolicyRef: VersionedRef;
  derivedFactSetVersion: string;
  interpretationEngineVersion: string;
  authorizationPolicyVersion: string;
  reviewerTrustPolicyRef?: ContentAddressedVersionedRef;
  startedAt: string;
  completedAt?: string;
  status: 'completed' | 'partial' | 'failed';
  completeness: ExecutionCompleteness;
  evaluationIds: readonly string[];
  claimIds: readonly string[];
  claimRelationIds: readonly string[];
  runHash: string;
}
