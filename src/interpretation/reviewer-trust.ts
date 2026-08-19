import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import type { ReviewLevel } from '../contracts/interpretation.js';
import { deterministicContentHash } from './rule-registry.js';

export interface ReviewerTrustGrant {
  reviewerId: string;
  allowedReviewLevels: readonly ReviewLevel[];
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

  return Object.freeze({
    policyId: context.policyId,
    version: context.version,
    grants: Object.freeze(grants.map((grant) => Object.freeze(grant))),
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
