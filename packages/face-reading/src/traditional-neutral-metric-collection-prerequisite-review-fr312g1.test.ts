import { describe, expect, it } from 'vitest';
import {
  FR239_CONTRACT_VERSION,
} from './observable-morphology-repeatability-retention-privacy-policy-fr239.js';
import {
  FR240_CONTRACT_VERSION,
} from './observable-morphology-participant-consent-dry-run-admission-fr240.js';
import {
  FR241_CONTRACT_VERSION,
} from './observable-morphology-one-person-dry-run-runtime-fr241.js';
import {
  FR312F_PRIVACY_PREREQUISITES,
  FR312F_SAMPLE_DESIGN,
} from './traditional-morphology-pilot-dataset-capture-protocol-fr312f.js';
import {
  FR312G_COLLECTION_PREREQUISITES,
} from './traditional-neutral-metric-reliability-study-fr312g.js';
import {
  FR312G1_AUTHORITY_BOUNDARY,
  FR312G1_BLOCKER_ACCOUNTING,
  FR312G1_NUMERIC_POLICY_BOUNDARY,
  FR312G1_REQUIRED_DEDICATED_ARTIFACTS,
  FR312G1_REUSEABLE_PRINCIPLES,
  FR312G1_REUSE_FINDINGS,
  FR312G1_REVIEW,
  assertCollectionPrerequisiteReuseReviewFR312G1,
} from './traditional-neutral-metric-collection-prerequisite-review-fr312g1.js';

describe('FR312G1 collection prerequisite reuse review', () => {
  it('stays linked to the three reviewed predecessor contracts', () => {
    expect(() => assertCollectionPrerequisiteReuseReviewFR312G1())
      .not.toThrow();

    expect(
      new Set(
        FR312G1_REUSE_FINDINGS.map((item) => item.sourceContractVersion),
      ),
    ).toEqual(new Set([
      FR239_CONTRACT_VERSION,
      FR240_CONTRACT_VERSION,
      FR241_CONTRACT_VERSION,
    ]));
  });

  it('allows template reuse but refuses direct authority promotion', () => {
    expect(FR312G1_REUSE_FINDINGS).toHaveLength(3);

    for (const finding of FR312G1_REUSE_FINDINGS) {
      expect(finding.reusableAsTemplate).toBe(true);
      expect(finding.directAuthorityReuseAuthorized).toBe(false);
      expect(finding.numericPolicyValueInheritedAutomatically).toBe(false);
      expect(finding.fr312gExecutionAuthorizedByThisFinding).toBe(false);
    }

    expect(FR312G1_REUSE_FINDINGS.map((item) => item.decision)).toEqual([
      'template_reusable_dedicated_binding_required',
      'template_reusable_scope_incompatible',
      'dry_run_only_not_empirical_authority',
    ]);
  });

  it('does not inherit the FR239 retention number or invent study sizing', () => {
    expect(
      FR312G1_NUMERIC_POLICY_BOUNDARY.inheritedReviewImageRetentionDays,
    ).toBeNull();
    expect(
      FR312G1_NUMERIC_POLICY_BOUNDARY
        .fr239ThirtyDayValueAvailableOnlyAsHistoricalPrecedent,
    ).toBe(true);
    expect(FR312G1_NUMERIC_POLICY_BOUNDARY.participantCount).toBeNull();
    expect(FR312G1_NUMERIC_POLICY_BOUNDARY.partitionRatios).toBeNull();
    expect(
      FR312G1_NUMERIC_POLICY_BOUNDARY.minimumReliabilityAcceptanceValue,
    ).toBeNull();
    expect(
      FR312G1_NUMERIC_POLICY_BOUNDARY.numericPolicyAdoptionAuthorized,
    ).toBe(false);
  });

  it('requires dedicated FR312G collection-governance artifacts', () => {
    expect(FR312G1_REQUIRED_DEDICATED_ARTIFACTS).toEqual([
      'fr312g_retention_and_privacy_policy',
      'fr312g_participant_consent_and_withdrawal_protocol',
      'fr312g_participant_count_rationale',
      'fr312g_partition_allocation_rationale',
      'fr312g_empirical_collection_runtime_and_admission_gate',
    ]);

    expect(FR312G1_REUSEABLE_PRINCIPLES).toContain(
      'pseudonymous_participant_reference',
    );
    expect(FR312G1_REUSEABLE_PRINCIPLES).toContain(
      'finite_review_artifact_retention_required',
    );
    expect(FR312G1_REUSEABLE_PRINCIPLES).toContain(
      'explicit_consent_before_capture',
    );
    expect(FR312G1_REUSEABLE_PRINCIPLES).toContain(
      'quality_decision_before_metric_inspection',
    );
  });

  it('preserves all unresolved upstream collection blockers', () => {
    expect(
      FR312F_PRIVACY_PREREQUISITES.actualParticipantCollectionAuthorized,
    ).toBe(false);
    expect(FR312F_SAMPLE_DESIGN.participantCount).toBeNull();
    expect(FR312F_SAMPLE_DESIGN.partitionRatios).toBeNull();
    expect(FR312G_COLLECTION_PREREQUISITES.executionAuthorized).toBe(false);

    for (const [key, value] of Object.entries(FR312G1_BLOCKER_ACCOUNTING)) {
      expect(value, key).toBe(false);
    }
  });

  it('keeps FR312H entry and every authority promotion closed', () => {
    expect(FR312G1_REVIEW.authorityState)
      .toBe(
        'reuse_review_complete_dedicated_collection_prerequisites_still_required',
      );
    expect(FR312G1_REVIEW.nextAction)
      .toBe(
        'issue_dedicated_fr312g_precollection_governance_without_starting_collection',
      );
    expect(FR312G1_BLOCKER_ACCOUNTING.fr312hEntryAuthorized).toBe(false);

    for (const [key, value] of Object.entries(FR312G1_AUTHORITY_BOUNDARY)) {
      expect(value, key).toBe(false);
    }
  });
});
