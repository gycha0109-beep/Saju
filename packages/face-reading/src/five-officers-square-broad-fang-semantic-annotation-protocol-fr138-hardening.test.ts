import { describe, expect, it } from 'vitest';
import {
  assertIssuedSquareBroadFangSemanticAnnotationProtocolFR138,
  createSquareBroadFangBlindedAnnotationPacketFR138,
  materializeSquareBroadFangSemanticAnnotationProtocolFR138,
  type CreateSquareBroadFangBlindedAnnotationPacketFR138Input,
  type SquareBroadFangSemanticAnnotationProtocolFR138V1,
} from './five-officers-square-broad-fang-semantic-annotation-protocol-fr138.js';
import { FaceAuthorityValidationError } from './validation.js';

describe('FR138 square-broad 方 annotation protocol hardening', () => {
  it('rejects a forged protocol-shaped object', () => {
    const issued = materializeSquareBroadFangSemanticAnnotationProtocolFR138();
    const forged = {
      ...issued,
      target: { ...issued.target },
    } as SquareBroadFangSemanticAnnotationProtocolFR138V1;

    expect(() => assertIssuedSquareBroadFangSemanticAnnotationProtocolFR138(forged)).toThrow(
      FaceAuthorityValidationError,
    );
  });

  it('rejects metric, threshold, peer-label, provider, or automated interpretation leakage into the packet input', () => {
    const base = {
      packetRef: 'packet.research.square_broad.fang.002',
      researchSubjectRef: 'research-subject.002',
      captureSeriesRef: 'capture-series.002',
      captureRef: 'capture.002',
    };

    for (const forbidden of [
      ['metricValues', { axisAlignment: 0.5 }],
      ['candidateThreshold', 0.7],
      ['peerLabels', ['supports_fang_shape_hypothesis']],
      ['providerResult', 'square'],
      ['automatedTraditionalInterpretation', '方'],
    ] as const) {
      const input = { ...base, [forbidden[0]]: forbidden[1] } as unknown as CreateSquareBroadFangBlindedAnnotationPacketFR138Input;
      expect(() => createSquareBroadFangBlindedAnnotationPacketFR138(input)).toThrow(/forbidden or ungoverned field/u);
    }
  });

  it('rejects missing or blank opaque provenance refs', () => {
    expect(() =>
      createSquareBroadFangBlindedAnnotationPacketFR138({
        packetRef: '',
        researchSubjectRef: 'research-subject.003',
        captureSeriesRef: 'capture-series.003',
        captureRef: 'capture.003',
      }),
    ).toThrow(/packetRef must be a non-empty opaque reference/u);

    const missing = {
      packetRef: 'packet.research.square_broad.fang.003',
      researchSubjectRef: 'research-subject.003',
      captureSeriesRef: 'capture-series.003',
    } as unknown as CreateSquareBroadFangBlindedAnnotationPacketFR138Input;
    expect(() => createSquareBroadFangBlindedAnnotationPacketFR138(missing)).toThrow(/exactly the four opaque provenance refs/u);
  });

  it('does not let the research labels become metric binding, threshold, or criterion state authority', () => {
    const result = materializeSquareBroadFangSemanticAnnotationProtocolFR138();

    expect(result.authorityBoundary.researchProtocolCandidateMeansAnnotationAuthority).toBe(false);
    expect(result.authorityBoundary.researchLabelSchemaCandidateMeansTraditionalSemanticAuthority).toBe(false);
    expect(result.authorityBoundary.projectOwnerMethodologyGovernanceMeansAnnotationAuthority).toBe(false);
    expect(result.authorityBoundary.scanCheckedSourceMeansMethodologyReviewed).toBe(false);
    expect(result.authorityBoundary.fangHypothesisLabelMeansTraditionalCriterionState).toBe(false);
    expect(result.authorityBoundary.humanLabelMeansMetricBinding).toBe(false);
    expect(result.authorityBoundary.humanLabelMeansCalibrationThreshold).toBe(false);
    expect(result.authorityBoundary.protocolDesignMeansCollectionAuthority).toBe(false);
    expect(result.authorityBoundary.llmMayIssueHumanSemanticLabel).toBe(false);
  });

  it('returns immutable materialized protocol and packet objects', () => {
    const first = materializeSquareBroadFangSemanticAnnotationProtocolFR138();
    const second = materializeSquareBroadFangSemanticAnnotationProtocolFR138();
    const packet = createSquareBroadFangBlindedAnnotationPacketFR138({
      packetRef: 'packet.research.square_broad.fang.004',
      researchSubjectRef: 'research-subject.004',
      captureSeriesRef: 'capture-series.004',
      captureRef: 'capture.004',
    });

    expect(second).toBe(first);
    expect(Object.isFrozen(first)).toBe(true);
    expect(Object.isFrozen(first.protocolCandidate)).toBe(true);
    expect(Object.isFrozen(first.protocolCandidate.scopeExclusions)).toBe(true);
    expect(Object.isFrozen(first.labelSchemaCandidate.labels)).toBe(true);
    expect(Object.isFrozen(packet)).toBe(true);
    expect(Object.isFrozen(packet.hiddenFields)).toBe(true);
  });
});
