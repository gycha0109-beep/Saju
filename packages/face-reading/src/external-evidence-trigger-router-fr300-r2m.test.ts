import { describe, expect, it } from 'vitest';
import {
  FR300_R2M_CURRENT_GATE,
  assertFR300R2MExternalEvidenceTriggerRouterContract,
  routeFR300R2MExternalEvidenceTrigger,
} from './external-evidence-trigger-router-fr300-r2m.js';

const BASE_INPUT = Object.freeze({
  schemaVersion:
    'fr300-r2m-external-evidence-trigger-input-v1' as const,
  providerResponseObserved: false,
  mindsExactArtifactIdentityEvidenceObserved: false,
  mindsExactMetricScaleBindingEvidenceObserved: false,
  mindsExactArtifactPairBindingEvidenceObserved: false,
  ulDdExactArtifactIdentityEvidenceObserved: false,
  ulDdExactCalibrationBundleEvidenceObserved: false,
  ulDdExactReleaseTransformEvidenceObserved: false,
  participantArtifactDownloaded: false,
  restrictedAccessRequested: false,
  rawProviderResponsePersistedInPublicRepository: false,
  providerMessageIdentifierPersistedInPublicRepository: false,
});

describe('FR300-R2M external evidence trigger router', () => {
  it('waits when no new external evidence is observed', () => {
    const receipt =
      routeFR300R2MExternalEvidenceTrigger(BASE_INPUT);

    expect(receipt).toMatchObject({
      route: 'await_external_evidence',
      triggers: {
        providerResponse: false,
        mindsExactArtifactReview: false,
        ulDdCalibrationReview: false,
      },
      nextAction: 'wait_for_new_external_evidence',
      authority: {
        providerApprovalIssued: false,
        realControlledArtifactIntakeAuthorized: false,
        participantArtifactDownloadAuthorized: false,
        restrictedAccessRequestAuthorized: false,
        mindsAuthorityPromoted: false,
        ulDdAuthorityPromoted: false,
        realFR299ReferenceMaterialized: false,
        fr300R2Authorized: false,
        productColumnMaterialized: false,
        productionActivated: false,
        commerceActivated: false,
      },
    });
  });

  it('routes an observed provider response only into R2I review', () => {
    const receipt =
      routeFR300R2MExternalEvidenceTrigger({
        ...BASE_INPUT,
        providerResponseObserved: true,
      });

    expect(receipt.route).toBe(
      'route_to_r2i_provider_response_review',
    );
    expect(receipt.nextAction).toBe(
      'apply_r2i_human_reviewed_provider_response_transition',
    );
    expect(receipt.authority.providerApprovalIssued).toBe(false);
    expect(
      receipt.authority.realControlledArtifactIntakeAuthorized,
    ).toBe(false);
  });

  it('reopens MINDS review only when exact artifact identity is paired with new exact scale or pairing evidence', () => {
    const partial =
      routeFR300R2MExternalEvidenceTrigger({
        ...BASE_INPUT,
        mindsExactMetricScaleBindingEvidenceObserved: true,
      });

    expect(partial.route).toBe('await_external_evidence');

    const exactCandidate =
      routeFR300R2MExternalEvidenceTrigger({
        ...BASE_INPUT,
        mindsExactArtifactIdentityEvidenceObserved: true,
        mindsExactMetricScaleBindingEvidenceObserved: true,
      });

    expect(exactCandidate.route).toBe(
      'reopen_minds_exact_artifact_authority_review',
    );
    expect(exactCandidate.nextAction).toBe(
      'adjudicate_new_minds_exact_artifact_evidence',
    );
    expect(exactCandidate.authority.mindsAuthorityPromoted).toBe(
      false,
    );
  });

  it('reopens UL-DD review only when exact artifact identity is paired with calibration or release-transform evidence', () => {
    const partial =
      routeFR300R2MExternalEvidenceTrigger({
        ...BASE_INPUT,
        ulDdExactCalibrationBundleEvidenceObserved: true,
      });

    expect(partial.route).toBe('await_external_evidence');

    const exactCandidate =
      routeFR300R2MExternalEvidenceTrigger({
        ...BASE_INPUT,
        ulDdExactArtifactIdentityEvidenceObserved: true,
        ulDdExactCalibrationBundleEvidenceObserved: true,
      });

    expect(exactCandidate.route).toBe(
      'reopen_ul_dd_calibration_authority_review',
    );
    expect(exactCandidate.nextAction).toBe(
      'adjudicate_new_ul_dd_calibration_evidence',
    );
    expect(exactCandidate.authority.ulDdAuthorityPromoted).toBe(
      false,
    );
  });

  it('keeps simultaneous new evidence lanes separate rather than combining authority', () => {
    const receipt =
      routeFR300R2MExternalEvidenceTrigger({
        ...BASE_INPUT,
        providerResponseObserved: true,
        mindsExactArtifactIdentityEvidenceObserved: true,
        mindsExactArtifactPairBindingEvidenceObserved: true,
      });

    expect(receipt.route).toBe(
      'multiple_new_triggers_require_separate_adjudication',
    );
    expect(receipt.nextAction).toBe(
      'split_and_adjudicate_each_new_trigger_independently',
    );
    expect(receipt.authority.fr300R2Authorized).toBe(false);
  });

  it('rejects participant acquisition, restricted access, and public provider-message persistence', () => {
    expect(() =>
      routeFR300R2MExternalEvidenceTrigger({
        ...BASE_INPUT,
        participantArtifactDownloaded: true,
      }),
    ).toThrow();

    expect(() =>
      routeFR300R2MExternalEvidenceTrigger({
        ...BASE_INPUT,
        restrictedAccessRequested: true,
      }),
    ).toThrow();

    expect(() =>
      routeFR300R2MExternalEvidenceTrigger({
        ...BASE_INPUT,
        rawProviderResponsePersistedInPublicRepository: true,
      }),
    ).toThrow();

    expect(() =>
      routeFR300R2MExternalEvidenceTrigger({
        ...BASE_INPUT,
        providerMessageIdentifierPersistedInPublicRepository: true,
      }),
    ).toThrow();
  });

  it('freezes the current gate at pending external evidence with zero authority promotion', () => {
    expect(FR300_R2M_CURRENT_GATE).toMatchObject({
      disposition:
        'external_evidence_router_ready_no_new_trigger_observed',
      providerResponseState: 'pending',
      providerResponseObserved: false,
      mindsMetricAuthorityLevel:
        'M2_exact_acquisition_export_metric_documented',
      mindsPairingAuthorityLevel:
        'P2_same_acquisition_with_cross_modal_mapping_documented',
      ulDdMetricAuthorityLevel:
        'M1_device_class_metric_capable',
      ulDdPairingAuthorityLevel:
        'P1_same_session_or_timeline',
      mindsExactEvidenceTriggerObserved: false,
      ulDdExactEvidenceTriggerObserved: false,
      participantArtifactDownloaded: false,
      restrictedAccessRequested: false,
      paidSpendAuthorized: false,
      currentRoute: 'await_external_evidence',
      fr299EligibleCandidateCount: 0,
      fr300R2EligibleCandidateCount: 0,
      productMaterialization: '18/29',
      authority: {
        providerApprovalIssued: false,
        realControlledArtifactIntakeAuthorized: false,
        realFR299ReferenceMaterialized: false,
        fr300R2Authorized: false,
        productColumnMaterialized: false,
        productionActivated: false,
        commerceActivated: false,
      },
    });

    expect(() =>
      assertFR300R2MExternalEvidenceTriggerRouterContract(),
    ).not.toThrow();
  });
});
