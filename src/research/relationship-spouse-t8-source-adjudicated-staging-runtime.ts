import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import type {
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
} from '../contracts/interpretation.js';
import {
  runInterpretation,
  type InterpretationExecutionResult,
  type InterpretationRunOptions,
} from '../interpretation/interpretation-engine.js';
import {
  buildSourceAdjudicationExecutionAuthorityRef,
  validateSourceAdjudicationExecutionAuthority,
  type SourceAdjudicationExecutionAuthority,
  type SourceAdjudicationExecutionAuthorityMaterial,
} from '../interpretation/promotion-authority.js';
import {
  createRuleRegistrySnapshot,
  deterministicContentHash,
} from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE_DEFINITION,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_VALUE_SCHEMA,
} from './relationship-spouse-t8-runtime-admission.js';
import {
  buildRelationshipSpouseT8SourceAdjudicationGovernanceDecision,
} from './relationship-spouse-t8-source-adjudication-governance-decision.js';
import {
  RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_SOURCES,
} from './relationship-spouse-t8-runtime-source-manifest.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_PACK,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_RULES,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION,
} from './relationship-spouse-t8-source-bound-runtime.js';

export const RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION =
  '1.1.0' as const;

export const RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_SCOPE =
  'source_adjudicated_staging_shadow_only' as const;

const STAGING_EXECUTION_AUTHORITY_ID =
  'relationship-spouse-t8-source-adjudicated-staging-execution-authority' as const;
const STAGING_EXECUTION_AUTHORITY_VERSION = '1.0.0' as const;

function refsEqual(
  left: ContentAddressedVersionedRef,
  right: ContentAddressedVersionedRef,
): boolean {
  return (
    left.id === right.id &&
    left.version === right.version &&
    left.contentHash === right.contentHash
  );
}

function contentAddressedRef(
  id: string,
  version: string,
  material: unknown,
): ContentAddressedVersionedRef {
  return Object.freeze({
    id,
    version,
    contentHash: deterministicContentHash(material),
  });
}

export const RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY =
  Object.freeze({
    ...RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_METHODOLOGY,
    version: RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
    name: 'Relationship Spouse T8 source-adjudicated staging methodology',
    status: 'reviewed',
  } as const satisfies MethodologyDefinition);

export const RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES =
  Object.freeze(
    RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_RULES.map(
      (rule) =>
        Object.freeze({
          ...rule,
          version:
            RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
          methodologyRef: {
            ...rule.methodologyRef,
            version:
              RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
          },
          status: 'reviewed',
        }) satisfies RuleDefinition,
    ),
  );

export const RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK =
  Object.freeze({
    ...RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_PACK,
    version: RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
    name: 'Relationship Spouse T8 source-adjudicated staging runtime',
    methodologyRefs: [
      {
        id: RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY.methodologyId,
        version:
          RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
      },
    ],
    status: 'staging',
  } as const satisfies InterpretationPack);

export const RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_REGISTRY =
  createRuleRegistrySnapshot(
    {
      rules: RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES,
      methodologies: [
        RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY,
      ],
      sources: RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_SOURCES,
      claimTypeDefinitions: [
        RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE_DEFINITION,
      ],
      claimValueSchemas: [
        RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_VALUE_SCHEMA,
      ],
    },
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK,
  );

export function buildRelationshipSpouseT8SourceResearchRuntimeRef(): ContentAddressedVersionedRef {
  const material = Object.freeze({
    runtimeVersion: RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION,
    registrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.snapshot
        .registrySnapshotId,
    packRef:
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.snapshot.packRef,
  });

  return contentAddressedRef(
    'relationship-spouse-t8-source-bound-runtime',
    RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION,
    material,
  );
}

export function buildRelationshipSpouseT8SourceAdjudicatedStagingExecutionAuthority(): SourceAdjudicationExecutionAuthority {
  const decision =
    buildRelationshipSpouseT8SourceAdjudicationGovernanceDecision();

  if (
    decision.sourceAdjudicationAuthorityEstablished !== true ||
    decision.decisionRef === undefined
  ) {
    throw new Error(
      'Relationship Spouse T8 staging execution requires the exact established source-adjudication governance decision.',
    );
  }

  const material = Object.freeze({
    authorityClass: 'source_adjudication',
    lifecycleTarget: 'staging',
    capabilityKey: 'relationship:natal:spouse',
    policyRef: Object.freeze({ ...decision.decisionMaterial.policyRef }),
    candidateRef: Object.freeze({ ...decision.decisionMaterial.candidateRef }),
    decisionRef: Object.freeze({ ...decision.decisionRef }),
    authorizedRegistrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_REGISTRY.snapshot
        .registrySnapshotId,
    authorizedPackRef: Object.freeze({
      ...RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_REGISTRY.snapshot
        .packRef,
    }),
    sourceAdjudicationAuthorityEstablished: true,
    productionAuthorityAuthorized: false,
  } as const satisfies SourceAdjudicationExecutionAuthorityMaterial);

  const authorityRef = buildSourceAdjudicationExecutionAuthorityRef(
    STAGING_EXECUTION_AUTHORITY_ID,
    STAGING_EXECUTION_AUTHORITY_VERSION,
    material,
  );

  return Object.freeze({
    authorityRef,
    material,
  });
}

export interface RelationshipSpouseT8SourceAdjudicatedStagingAuthorityValidation {
  readonly valid: boolean;
  readonly blockers: readonly string[];
}

export function validateRelationshipSpouseT8SourceAdjudicatedStagingAuthority(
  authority: SourceAdjudicationExecutionAuthority,
): RelationshipSpouseT8SourceAdjudicatedStagingAuthorityValidation {
  const blockers = [
    ...validateSourceAdjudicationExecutionAuthority(
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_REGISTRY,
      authority,
    ).blockers,
  ];
  const decision =
    buildRelationshipSpouseT8SourceAdjudicationGovernanceDecision();

  if (
    decision.sourceAdjudicationAuthorityEstablished !== true ||
    decision.decisionRef === undefined
  ) {
    blockers.push('SPOUSE_T8_SOURCE_ADJUDICATION_DECISION_NOT_ESTABLISHED');
  } else {
    if (!refsEqual(authority.material.policyRef, decision.decisionMaterial.policyRef)) {
      blockers.push('SPOUSE_T8_SOURCE_ADJUDICATION_POLICY_REF_DRIFT');
    }
    if (
      !refsEqual(
        authority.material.candidateRef,
        decision.decisionMaterial.candidateRef,
      )
    ) {
      blockers.push('SPOUSE_T8_SOURCE_ADJUDICATION_CANDIDATE_REF_DRIFT');
    }
    if (!refsEqual(authority.material.decisionRef, decision.decisionRef)) {
      blockers.push('SPOUSE_T8_SOURCE_ADJUDICATION_DECISION_REF_DRIFT');
    }
  }

  if (authority.material.capabilityKey !== 'relationship:natal:spouse') {
    blockers.push('SPOUSE_T8_SOURCE_ADJUDICATION_CAPABILITY_MISMATCH');
  }

  const expected = buildRelationshipSpouseT8SourceAdjudicatedStagingExecutionAuthority();
  if (!refsEqual(authority.authorityRef, expected.authorityRef)) {
    blockers.push('SPOUSE_T8_SOURCE_ADJUDICATION_AUTHORITY_REF_DRIFT');
  }

  return Object.freeze({
    valid: blockers.length === 0,
    blockers: Object.freeze([...new Set(blockers)].sort()),
  });
}

export function buildRelationshipSpouseT8SourceAdjudicatedStagingLineage() {
  const decision =
    buildRelationshipSpouseT8SourceAdjudicationGovernanceDecision();
  const authority =
    buildRelationshipSpouseT8SourceAdjudicatedStagingExecutionAuthority();

  if (decision.decisionRef === undefined) {
    throw new Error(
      'Relationship Spouse T8 staging lineage requires an exact governance decision ref.',
    );
  }

  return Object.freeze({
    sourceResearchRuntimeRef:
      buildRelationshipSpouseT8SourceResearchRuntimeRef(),
    sourceResearchRegistrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.snapshot
        .registrySnapshotId,
    candidateRef: Object.freeze({ ...decision.decisionMaterial.candidateRef }),
    policyRef: Object.freeze({ ...decision.decisionMaterial.policyRef }),
    governanceDecisionRef: Object.freeze({ ...decision.decisionRef }),
    stagingRegistrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_REGISTRY.snapshot
        .registrySnapshotId,
    stagingPackRef: Object.freeze({
      ...RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_REGISTRY.snapshot
        .packRef,
    }),
    sourceAdjudicationExecutionAuthorityRef: Object.freeze({
      ...authority.authorityRef,
    }),
  });
}

export const RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_BOUNDARY =
  Object.freeze({
    sourceAdjudicationAuthorityEstablished: true as const,
    researchRuntimePreserved: true as const,
    stagingRegistryMaterialized: true as const,
    stagingLifecycleMutationApplied: true as const,
    sourceAdjudicatedStagingExecutionAuthorized: true as const,
    shadowExecutionAuthorized: true as const,
    runtimeScope:
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_SCOPE,
    humanDomainReviewEstablished: false as const,
    reviewerTrustGrantEstablished: false as const,
    productConsumerActivated: false as const,
    narrativeActivated: false as const,
    previewActivated: false as const,
    officialReadingActivated: false as const,
    productionAdmissionAuthorized: false as const,
    production: 'HOLD' as const,
    gate14ShadowStagingEvidenceComplete: false as const,
    nextDisposition:
      'RUN_SOURCE_ADJUDICATED_SHADOW_STAGING_EVIDENCE' as const,
  });

export type RelationshipSpouseT8SourceAdjudicatedStagingRunOptions = Omit<
  InterpretationRunOptions,
  'promotionAuthorityContext' | 'reviewerTrustContext'
>;

export function runRelationshipSpouseT8SourceAdjudicatedStagingRuntime(
  snapshot: CanonicalSajuSnapshot,
  options: RelationshipSpouseT8SourceAdjudicatedStagingRunOptions = {},
): InterpretationExecutionResult {
  if (
    'promotionAuthorityContext' in options ||
    'reviewerTrustContext' in options
  ) {
    throw new Error(
      'Relationship Spouse T8 staging runtime owns its exact promotion authority; callers may not inject promotion or reviewer-trust authority.',
    );
  }

  const authority =
    buildRelationshipSpouseT8SourceAdjudicatedStagingExecutionAuthority();
  const validation =
    validateRelationshipSpouseT8SourceAdjudicatedStagingAuthority(authority);
  if (!validation.valid) {
    throw new Error(
      `Relationship Spouse T8 source-adjudicated staging authority invalid: ${validation.blockers.join(', ')}`,
    );
  }

  return runInterpretation(
    snapshot,
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_REGISTRY,
    {
      ...options,
      promotionAuthorityContext: {
        mode: 'source_adjudication',
        sourceAdjudicationAuthority: authority,
      },
    },
  );
}
