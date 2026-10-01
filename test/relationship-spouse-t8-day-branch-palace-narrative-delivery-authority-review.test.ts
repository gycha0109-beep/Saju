import { describe, expect, test } from 'vitest';
import {
  deterministicContentHash,
} from '../src/interpretation/rule-registry.js';
import {
  PREVIEW_E2E_APPROVAL,
} from '../src/preview/preview-authority.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmission,
} from '../src/research/relationship-spouse-t8-day-branch-palace-staging-consumer-evidence-admission.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReview,
  evaluateRelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReview,
} from '../src/research/relationship-spouse-t8-day-branch-palace-narrative-delivery-authority-review.js';

describe('Relationship / Spouse T8 Day-Branch spouse-palace SA-5K narrative and delivery authority review', () => {
  test('completes the authority review with an explicit HOLD for narrative and delivery', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReview();

    expect(result.issue).toBe('#1916');
    expect(result.semanticVersion).toBe('2.0.0');
    expect(result.blockers).toEqual([]);
    expect(result.authorityReviewCompleted).toBe(true);
    expect(result.narrativeEligibilityEstablished).toBe(false);
    expect(result.deliveryAuthorityEstablished).toBe(false);
    expect(result.decision).toBe('HOLD_NARRATIVE_AND_DELIVERY_AUTHORITY');
    expect(result.nextDisposition).toBe(
      'RUN_SA_5L_DETERMINISTIC_POSITION_ONLY_NARRATIVE_MATERIALITY_GATE',
    );
    expect(result.reviewId).toMatch(/^[a-f0-9]{64}$/u);
  });

  test('preserves the SA-5J evidence-selection admission while granting no broader consumer authority', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReview();

    expect(result.checks.consumerAdmissionIntegrityValid).toBe(true);
    expect(result.checks.exactConsumerAdmissionBinding).toBe(true);
    expect(result.checks.evidenceSelectionAdmissionValid).toBe(true);
    expect(result.authorityBoundary).toEqual({
      exactCandidateOnly: true,
      governedEvidenceSelectionAuthorityPreserved: true,
      narrativeMaterialityAuthorized: false,
      narrativeProfileAuthorityEstablished: false,
      legacyNarrativeRuntimeAuthorityEstablished: false,
      narrativeGenerationAuthorized: false,
      artifactAssemblyAuthorized: false,
      deliveryAuthorityAuthorized: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      provenanceQualityPromotionAuthorized: false,
      productionAuthorityAuthorized: false,
      production: 'HOLD',
    });
  });

  test('proves spouse natal is not an Official Reading Preview section and resolves to legacy_narrative', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReview();

    expect(result.readingSection).toBe('relationship:natal:spouse');
    expect(
      (PREVIEW_E2E_APPROVAL.supportedReadingSections as readonly string[]).includes(
        result.readingSection,
      ),
    ).toBe(false);
    expect(result.previewConsumerAuthority).toMatchObject({
      readingSection: 'relationship:natal:spouse',
      authority: 'legacy_narrative',
    });
    expect(
      result.previewConsumerAuthority.supportedOfficialReadingSection,
    ).toBeUndefined();
    expect(result.checks.spouseSectionNotOfficialPreview).toBe(true);
  });

  test('fails closed without an authorized legacy narrative runtime', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReview();

    expect(result.governedExecution.state).toBe('invariant_blocked');
    expect(result.governedExecution.reasonCodes).toEqual([
      'LEGACY_NARRATIVE_RUNTIME_REQUIRED',
    ]);
    expect(result.governedExecution.modelCalls).toBe(0);
    expect(result.governedExecution.narrative).toBeUndefined();
    expect(result.governedExecution.artifact).toBeUndefined();
    expect(result.governedExecution.canonicalSemantics).toBeUndefined();
    expect(result.governedExecution.officialReadingPlan).toBeUndefined();
    expect(result.governedExecution.officialReadingReport).toBeUndefined();
    expect(
      result.checks.executionFailsClosedWithoutNarrativeRuntime,
    ).toBe(true);
    expect(result.checks.noNarrativeProfileAuthorityInjected).toBe(true);
  });

  test('maps the blocked governed execution to a temporarily unavailable delivery with no artifact', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReview();

    expect(result.delivery.state).toBe('temporarily_unavailable');
    expect(result.delivery.messageCode).toBe(
      'READING_TEMPORARILY_UNAVAILABLE',
    );
    expect(result.delivery.requiredAction).toBe('try_again_later');
    expect(result.delivery.artifact).toBeUndefined();
    expect(result.checks.deliveryFailsClosedWithoutArtifact).toBe(true);
    expect(result.checks.noDeliveryOrOfficialAuthorityExpansion).toBe(true);
  });

  test('preserves materialForNarrative=false until the automated materiality gate', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReview();

    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
        .materialForNarrative,
    ).toBe(false);
    expect(result.checks.narrativeMaterialityStillDenied).toBe(true);
  });

  test('fails closed when the SA-5J admission changes under a stale admissionId', async () => {
    const current =
      buildRelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmission();
    const forged = {
      ...current,
      governedConsumerEvidenceSelectionAdmitted: false,
    } as typeof current;

    const result =
      await evaluateRelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReview({
        consumerAdmission: forged,
      });

    expect(result.checks.consumerAdmissionIntegrityValid).toBe(false);
    expect(result.checks.exactConsumerAdmissionBinding).toBe(false);
    expect(result.checks.evidenceSelectionAdmissionValid).toBe(false);
    expect(result.authorityReviewCompleted).toBe(false);
    expect(result.decision).toBe('HOLD_AND_REPAIR_SA_5K_AUTHORITY_REVIEW');
    expect(result.authorityBoundary.exactCandidateOnly).toBe(false);
  });

  test('fails closed when a changed SA-5J admission is rehashed into a different valid identity', async () => {
    const current =
      buildRelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmission();
    const {
      admissionId: _currentAdmissionId,
      preparation,
      ...currentMaterial
    } = current;
    expect(_currentAdmissionId).toBe(current.admissionId);

    const changedMaterial = {
      ...currentMaterial,
      governedConsumerEvidenceSelectionAdmitted: false,
    };
    const changed = {
      admissionId: deterministicContentHash(changedMaterial),
      ...changedMaterial,
      preparation,
    } as typeof current;

    const result =
      await evaluateRelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReview({
        consumerAdmission: changed,
      });

    expect(result.checks.consumerAdmissionIntegrityValid).toBe(true);
    expect(result.checks.exactConsumerAdmissionBinding).toBe(false);
    expect(result.checks.evidenceSelectionAdmissionValid).toBe(false);
    expect(result.authorityReviewCompleted).toBe(false);
  });

  test('is deterministic for the exact same admitted evidence and blocked delivery boundary', async () => {
    const left =
      await buildRelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReview();
    const right =
      await buildRelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReview();

    expect(left.reviewId).toBe(right.reviewId);
    expect(left.governedExecutionId).toBe(right.governedExecutionId);
    expect(left.deliveryId).toBe(right.deliveryId);
    expect(left.previewConsumerAuthority).toEqual(
      right.previewConsumerAuthority,
    );
    expect(left.authorityBoundary).toEqual(right.authorityBoundary);
  });
});
