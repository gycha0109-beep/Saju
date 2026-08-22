import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import type { ReviewAttestation, ReviewLevel } from '../contracts/interpretation.js';
import { deterministicContentHash } from './rule-registry.js';

const SHA256_HEX = /^[a-f0-9]{64}$/;

export interface ReviewerTrustGrant {
  reviewerId: string;
  allowedReviewLevels: readonly ReviewLevel[];
  trustedAttestationContentHashes: readonly string[];
  status: 'active' | 'revoked';
}

export interface ReviewerTrustContext {
  policyId: string;
  version: string;
  grants: readonly ReviewerTrustGrant[];
}

function normalizedGrant(grant: ReviewerTrustGrant): ReviewerTrustGrant {
  return {
    reviewerId: grant.reviewerId,
    allowedReviewLevels: [...new Set(grant.allowedReviewLevels)].sort(),
    trustedAttestationContentHashes: [...new Set(grant.trustedAttestationContentHashes)].sort(),
    status: grant.status,
  };
}

export function normalizeReviewerTrustContext(
  context: ReviewerTrustContext,
): ReviewerTrustContext {
  if (context.policyId.trim().length === 0 || context.version.trim().length === 0) {
    throw new TypeError('Reviewer trust context requires non-empty policyId and version.');
  }

  const grants = context.grants.map(normalizedGrant).sort((left, right) =>
    left.reviewerId.localeCompare(right.reviewerId),
  );
  const reviewerIds = grants.map((grant) => grant.reviewerId);
  if (reviewerIds.some((reviewerId) => reviewerId.trim().length === 0)) {
    throw new TypeError('Reviewer trust grant requires a non-empty reviewerId.');
  }
  if (new Set(reviewerIds).size !== reviewerIds.length) {
    throw new TypeError('Reviewer trust context cannot contain duplicate reviewerId grants.');
  }
  if (grants.some((grant) => grant.allowedReviewLevels.length === 0)) {
    throw new TypeError('Reviewer trust grant requires at least one allowed review level.');
  }
  if (
    grants.some((grant) =>
      grant.trustedAttestationContentHashes.some((hash) => !SHA256_HEX.test(hash)),
    )
  ) {
    throw new TypeError('Reviewer trust grants require lowercase SHA-256 attestation content hashes.');
  }
  if (
    grants.some(
      (grant) => grant.status === 'active' && grant.trustedAttestationContentHashes.length === 0,
    )
  ) {
    throw new TypeError('Active reviewer trust grants require at least one pinned attestation hash.');
  }

  return Object.freeze({
    policyId: context.policyId,
    version: context.version,
    grants: Object.freeze(
      grants.map((grant) =>
        Object.freeze({
          ...grant,
          allowedReviewLevels: Object.freeze([...grant.allowedReviewLevels]),
          trustedAttestationContentHashes: Object.freeze([
            ...grant.trustedAttestationContentHashes,
          ]),
        }),
      ),
    ),
  });
}

export function reviewerTrustPolicyRef(
  context: ReviewerTrustContext,
): ContentAddressedVersionedRef {
  const normalized = normalizeReviewerTrustContext(context);
  return {
    id: normalized.policyId,
    version: normalized.version,
    contentHash: deterministicContentHash(normalized),
  };
}

export function reviewerIsTrustedForLevel(
  context: ReviewerTrustContext,
  reviewerId: string,
  level: ReviewLevel,
): boolean {
  const normalized = normalizeReviewerTrustContext(context);
  const grant = normalized.grants.find((candidate) => candidate.reviewerId === reviewerId);
  return (
    grant !== undefined &&
    grant.status === 'active' &&
    grant.allowedReviewLevels.includes(level)
  );
}

export function reviewerTrustsAttestation(
  context: ReviewerTrustContext,
  attestation: ReviewAttestation,
): boolean {
  const normalized = normalizeReviewerTrustContext(context);
  const grant = normalized.grants.find(
    (candidate) => candidate.reviewerId === attestation.reviewerId,
  );
  if (
    grant === undefined ||
    grant.status !== 'active' ||
    !grant.allowedReviewLevels.includes(attestation.reviewLevel)
  ) {
    return false;
  }
  return grant.trustedAttestationContentHashes.includes(deterministicContentHash(attestation));
}
