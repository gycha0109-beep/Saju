import { describe, expect, it } from 'vitest';
import type { FaceCalibrationProtocolRegistry } from './calibration-protocol.js';
import { validateFaceCalibrationProtocolRegistry } from './calibration-protocol.js';
import { FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0 } from './five-officers-six-fus-research-v0.js';
import {
  FACE_LIPS_SUBSTANTIAL_CONSTRUCT_VALIDITY_PROTOCOL_RESEARCH_FR101,
  assertIssuedLipsSubstantialRoleFreeSeparationConstructValidityProtocolReviewFR101,
  reviewLipsSubstantialRoleFreeSeparationConstructValidityProtocolFR101,
} from './lips-substantial-role-free-separation-construct-validity-protocol-review-fr101.js';

const METRIC_REF = 'neutral.mouth.contour_set.symmetric_arclength_mean_nearest_set_distance@0.1.0';
const CONTEXT = {
  faceAuthorityRegistry: FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0,
  knownNeutralMetricRefs: new Set([METRIC_REF]),
};

describe('FR101 lips substantial construct-validity protocol authority hardening', () => {
  it('rejects a lookalike review artifact that was not issued by FR101', () => {
    const issued = reviewLipsSubstantialRoleFreeSeparationConstructValidityProtocolFR101();
    const lookalike = { ...issued };

    expect(() =>
      assertIssuedLipsSubstantialRoleFreeSeparationConstructValidityProtocolReviewFR101(lookalike),
    ).toThrow(/FR-101 artifact is not an issued FR-101 review/u);
  });

  it('rejects promotion to authorized_to_collect while the traditional source is unverified OCR', () => {
    const registry = FACE_LIPS_SUBSTANTIAL_CONSTRUCT_VALIDITY_PROTOCOL_RESEARCH_FR101;
    const promoted: FaceCalibrationProtocolRegistry = {
      ...registry,
      studies: registry.studies.map((study) => ({
        ...study,
        executionState: 'authorized_to_collect' as const,
        blockingReasons: [],
        status: 'reviewed' as const,
      })),
    };

    expect(() => validateFaceCalibrationProtocolRegistry(promoted, CONTEXT)).toThrow(
      /cannot collect human calibration data before all traditional sources are scan_checked/u,
    );
  });

  it('rejects a capture protocol that swaps the admitted neutral metric for an unknown metric', () => {
    const registry = FACE_LIPS_SUBSTANTIAL_CONSTRUCT_VALIDITY_PROTOCOL_RESEARCH_FR101;
    const drifted: FaceCalibrationProtocolRegistry = {
      ...registry,
      captureProtocols: registry.captureProtocols.map((protocol) => ({
        ...protocol,
        metricRefs: ['neutral.mouth.unissued_metric@0.1.0'],
      })),
    };

    expect(() => validateFaceCalibrationProtocolRegistry(drifted, CONTEXT)).toThrow(
      /references unknown neutral metric/u,
    );
  });

  it('rejects a labeling instruction that exposes metric values to traditional-criterion reviewers', () => {
    const registry = FACE_LIPS_SUBSTANTIAL_CONSTRUCT_VALIDITY_PROTOCOL_RESEARCH_FR101;
    const drifted: FaceCalibrationProtocolRegistry = {
      ...registry,
      supportArtifacts: registry.supportArtifacts.map((artifact) =>
        artifact.kind === 'labeling_instruction'
          ? {
              ...artifact,
              reviewerMustNotSee: ['candidate_threshold', 'peer_labels', 'fortune_output'],
            }
          : artifact,
      ),
    };

    expect(() => validateFaceCalibrationProtocolRegistry(drifted, CONTEXT)).toThrow(
      /must blind reviewers from metric, threshold, peer labels, and fortune output/u,
    );
  });

  it('keeps all downstream semantic and product authority closed after protocol issuance', () => {
    const review = reviewLipsSubstantialRoleFreeSeparationConstructValidityProtocolFR101();

    expect(review.authorityBoundary).toEqual({
      protocolIssuanceMeansEvidenceExists: false,
      protocolIssuanceMeansTraditionalBinding: false,
      protocolIssuanceMeansAnatomicalThickness: false,
      researchDesignParameterMeansTraditionalThreshold: false,
      researchDesignParameterMeansCalibrationThreshold: false,
      blindedLabelingProtocolMeansCriterionState: false,
      blockedStudyMeansHumanCollectionAuthorized: false,
      neutralMetricAssociationStudyMeansPhysicalAnthropometry: false,
    });
    expect(review.humanDataCollectionAuthorized).toBe(false);
    expect(review.constructValidityEvidenceIssued).toBe(0);
    expect(review.thresholdRefsIssued).toBe(0);
    expect(review.traditionalMetricBindingsIssued).toBe(0);
    expect(review.criterionStatesIssued).toBe(0);
    expect(review.claimsIssued).toBe(0);
  });
});
