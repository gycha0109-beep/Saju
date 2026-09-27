import { describe, expect, it } from 'vitest';
import {
  FR300_R2A_QG_AST_FACE_CONTROLLED,
  FR300_R2A_QG_CANDIDATES,
  FR300_R2A_QG_CRITICAL_GATES,
  FR300_R2A_QG_CURRENT_GATE,
  FR300_R2A_QG_MINDS,
  FR300_R2A_QG_UL_DD,
  assessFR300R2AQGAcquisitionReadiness,
  assertFR300R2AQGFirstReferenceAcquisitionQualificationContract,
} from './first-fr299-reference-acquisition-qualification-fr300-r2a-qg.js';

describe('FR300-R2A-QG first FR299 reference acquisition qualification', () => {
  it('uses the exact nine-gate qualification surface with six fail-closed critical gates', () => {
    expect(FR300_R2A_QG_CRITICAL_GATES).toEqual([
      'Q1_rights',
      'Q2_rgb_availability',
      'Q3_independent_3d',
      'Q4_metric_scale_authority',
      'Q5_rgb_3d_correspondence',
      'Q8_acquisition_authority',
    ]);

    for (const candidate of FR300_R2A_QG_CANDIDATES) {
      expect(candidate.gates.map((receipt) => receipt.gate)).toEqual(
        expect.arrayContaining([
          'Q0_source_identity',
          'Q1_rights',
          'Q2_rgb_availability',
          'Q3_independent_3d',
          'Q4_metric_scale_authority',
          'Q5_rgb_3d_correspondence',
          'Q6_canonical_registration_feasibility',
          'Q7_provider_blind_annotation_feasibility',
          'Q8_acquisition_authority',
        ]),
      );
      expect(candidate.gates).toHaveLength(9);
    }
  });

  it('keeps AST promising but blocked on exact metric-scale authority and controlled-access authority', () => {
    const byGate = new Map(
      FR300_R2A_QG_AST_FACE_CONTROLLED.gates.map((receipt) => [
        receipt.gate,
        receipt,
      ]),
    );

    expect(byGate.get('Q2_rgb_availability')).toMatchObject({
      state: 'pass',
      critical: true,
    });
    expect(byGate.get('Q3_independent_3d')).toMatchObject({
      state: 'pass',
      critical: true,
    });
    expect(byGate.get('Q4_metric_scale_authority')).toMatchObject({
      state: 'blocked',
      critical: true,
      blocker:
        'raw_obj_physical_coordinate_unit_export_scale_scanner_accuracy_and_artifact_bound_metric_authority_not_publicly_source_bound',
    });
    expect(byGate.get('Q5_rgb_3d_correspondence')).toMatchObject({
      state: 'promising_unverified',
      critical: true,
    });
    expect(byGate.get('Q8_acquisition_authority')).toMatchObject({
      state: 'blocked',
      critical: true,
    });

    expect(
      assessFR300R2AQGAcquisitionReadiness(
        FR300_R2A_QG_AST_FACE_CONTROLLED,
      ),
    ).toMatchObject({
      acquisitionReady: false,
      unresolvedCriticalGates: expect.arrayContaining([
        'Q1_rights',
        'Q4_metric_scale_authority',
        'Q5_rgb_3d_correspondence',
        'Q8_acquisition_authority',
      ]),
    });
  });

  it('keeps UL-DD rights-qualified but blocks exact metric stereo authority', () => {
    const byGate = new Map(
      FR300_R2A_QG_UL_DD.gates.map((receipt) => [
        receipt.gate,
        receipt,
      ]),
    );

    expect(byGate.get('Q1_rights')).toMatchObject({
      state: 'pass',
      critical: true,
    });
    expect(byGate.get('Q2_rgb_availability')).toMatchObject({
      state: 'pass',
      critical: true,
    });
    expect(byGate.get('Q4_metric_scale_authority')).toMatchObject({
      state: 'blocked',
      critical: true,
    });
    expect(
      FR300_R2A_QG_UL_DD.prohibitedSubstitutions,
    ).toContain(
      'generic_zed2_calibration_for_exact_capture_calibration',
    );

    expect(
      assessFR300R2AQGAcquisitionReadiness(FR300_R2A_QG_UL_DD)
        .acquisitionReady,
    ).toBe(false);
  });

  it('keeps MINDS blocked before subject-artifact inspection because participant commercial R&D scope is unresolved', () => {
    const byGate = new Map(
      FR300_R2A_QG_MINDS.gates.map((receipt) => [
        receipt.gate,
        receipt,
      ]),
    );

    expect(byGate.get('Q1_rights')).toMatchObject({
      state: 'blocked',
      critical: true,
      blocker:
        'participant_commercial_product_development_scope_unresolved_after_public_source_search',
    });
    expect(byGate.get('Q8_acquisition_authority')).toMatchObject({
      state: 'blocked',
      critical: true,
    });
    expect(FR300_R2A_QG_MINDS.prohibitedSubstitutions).toEqual(
      expect.arrayContaining([
        'cc_by_4_0_for_participant_commercial_consent',
        'public_release_for_participant_product_r_and_d_permission',
        'kinect_nosetip_for_fr266_truth',
        'kinect_nosetop_for_fr297_truth',
      ]),
    );

    expect(
      assessFR300R2AQGAcquisitionReadiness(FR300_R2A_QG_MINDS)
        .acquisitionReady,
    ).toBe(false);
  });

  it('does not use pass counts to override any unresolved critical gate', () => {
    for (const candidate of FR300_R2A_QG_CANDIDATES) {
      const result =
        assessFR300R2AQGAcquisitionReadiness(candidate);
      expect(result.unresolvedCriticalGateCount).toBeGreaterThan(0);
      expect(result.acquisitionReady).toBe(false);
      expect(candidate.acquisitionReady).toBe(false);
      expect(candidate.criticalGateBlocked).toBe(true);
    }
  });

  it('freezes the public-only terminal state with no acquisition, contact, spend, FR299, FR300-R2, or Product promotion', () => {
    expect(FR300_R2A_QG_CURRENT_GATE).toMatchObject({
      disposition:
        'all_candidates_hold_before_acquisition_authorization',
      candidateCount: 3,
      acquisitionReadyCandidateCount: 0,
      publicOnlyQualificationCompleted: true,
      controlledAccessRequested: false,
      restrictedAccessRequested: false,
      duaSigned: false,
      duaSubmitted: false,
      externalContactAuthorized: false,
      externalContactPerformed: false,
      participantArtifactDownloaded: false,
      participantArtifactInspected: false,
      paidSpendAuthorized: false,
      fr299EligibleCandidateCount: 0,
      fr300R2EligibleCandidateCount: 0,
      productMaterialization: '18/29',
      preferredPublicAuthorityFrontier:
        'ast_face_controlled_metric_scale_and_exact_pairing_authority',
    });

    expect(FR300_R2A_QG_CURRENT_GATE.authority).toEqual({
      acquisitionAuthorized: false,
      realFR299ReferenceMaterialized: false,
      fr300R2Authorized: false,
      productColumnMaterialized: false,
      productionActivated: false,
      commerceActivated: false,
    });

    expect(() =>
      assertFR300R2AQGFirstReferenceAcquisitionQualificationContract(),
    ).not.toThrow();
  });
});
