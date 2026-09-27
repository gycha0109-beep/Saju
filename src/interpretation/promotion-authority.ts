import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import { deterministicContentHash, type ResolvedRuleRegistrySnapshot } from './rule-registry.js';
import type { ReviewerTrustContext } from './reviewer-trust.js';

export interface SourceAdjudicationExecutionAuthorityMaterial {
  readonly authorityClass: 'source_adjudication';
  readonly lifecycleTarget: 'staging';
  readonly capabilityKey: string;
  readonly policyRef: ContentAddressedVersionedRef;
  readonly candidateRef: ContentAddressedVersionedRef;
  readonly decisionRef: ContentAddressedVersionedRef;
  readonly authorizedRegistrySnapshotId: string;
  readonly authorizedPackRef: ContentAddressedVersionedRef;
  readonly sourceAdjudicationAuthorityEstablished: true;
  readonly productionAuthorityAuthorized: false;
}

export interface SourceAdjudicationExecutionAuthority {
  readonly authorityRef: ContentAddressedVersionedRef;
  readonly material: SourceAdjudicationExecutionAuthorityMaterial;
}

export type InterpretationPromotionAuthorityContext =
  | {
      readonly mode: 'trusted_review';
      readonly reviewerTrustContext: ReviewerTrustContext;
    }
  | {
      readonly mode: 'source_adjudication';
      readonly sourceAdjudicationAuthority: SourceAdjudicationExecutionAuthority;
    };

export interface SourceAdjudicationExecutionAuthorityValidation {
  readonly valid: boolean;
  readonly blockers: readonly string[];
}

function contentRefValid(ref: ContentAddressedVersionedRef): boolean {
  return (
    ref.id.length > 0 &&
    ref.version.length > 0 &&
    /^[a-f0-9]{64}$/.test(ref.contentHash)
  );
}

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

export function buildSourceAdjudicationExecutionAuthorityRef(
  id: string,
  version: string,
  material: SourceAdjudicationExecutionAuthorityMaterial,
): ContentAddressedVersionedRef {
  return Object.freeze({
    id,
    version,
    contentHash: deterministicContentHash(material),
  });
}

export function validateSourceAdjudicationExecutionAuthority(
  registry: ResolvedRuleRegistrySnapshot,
  authority: SourceAdjudicationExecutionAuthority,
): SourceAdjudicationExecutionAuthorityValidation {
  const material = authority.material;
  const blockers: string[] = [];

  if (registry.pack.status !== 'staging') {
    blockers.push(
      registry.pack.status === 'production'
        ? 'SOURCE_ADJUDICATION_NOT_AUTHORIZED_FOR_PRODUCTION'
        : 'SOURCE_ADJUDICATION_REQUIRES_STAGING_PACK',
    );
  }

  if (material.authorityClass !== 'source_adjudication') {
    blockers.push('SOURCE_ADJUDICATION_AUTHORITY_CLASS_MISMATCH');
  }
  if (material.lifecycleTarget !== 'staging') {
    blockers.push('SOURCE_ADJUDICATION_LIFECYCLE_TARGET_MISMATCH');
  }
  if (material.sourceAdjudicationAuthorityEstablished !== true) {
    blockers.push('SOURCE_ADJUDICATION_AUTHORITY_NOT_ESTABLISHED');
  }
  if (material.productionAuthorityAuthorized !== false) {
    blockers.push('SOURCE_ADJUDICATION_PRODUCTION_AUTHORITY_MUST_REMAIN_FALSE');
  }
  if (material.capabilityKey.trim().length === 0) {
    blockers.push('SOURCE_ADJUDICATION_CAPABILITY_KEY_MISSING');
  }

  for (const [name, ref] of [
    ['policy', material.policyRef],
    ['candidate', material.candidateRef],
    ['decision', material.decisionRef],
    ['pack', material.authorizedPackRef],
    ['authority', authority.authorityRef],
  ] as const) {
    if (!contentRefValid(ref)) {
      blockers.push(`SOURCE_ADJUDICATION_${name.toUpperCase()}_REF_INVALID`);
    }
  }

  if (
    material.authorizedRegistrySnapshotId !== registry.snapshot.registrySnapshotId
  ) {
    blockers.push('SOURCE_ADJUDICATION_REGISTRY_SNAPSHOT_MISMATCH');
  }
  if (!refsEqual(material.authorizedPackRef, registry.snapshot.packRef)) {
    blockers.push('SOURCE_ADJUDICATION_PACK_REF_MISMATCH');
  }

  const expectedAuthorityHash = deterministicContentHash(material);
  if (authority.authorityRef.contentHash !== expectedAuthorityHash) {
    blockers.push('SOURCE_ADJUDICATION_AUTHORITY_HASH_MISMATCH');
  }

  return Object.freeze({
    valid: blockers.length === 0,
    blockers: Object.freeze(blockers.sort()),
  });
}
