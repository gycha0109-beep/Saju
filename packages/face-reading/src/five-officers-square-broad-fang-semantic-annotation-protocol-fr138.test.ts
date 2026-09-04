import { describe, expect, it } from 'vitest';
import {
  FR138_NEXT_FRONTIER,
  createSquareBroadFangBlindedAnnotationPacketFR138,
  materializeSquareBroadFangSemanticAnnotationProtocolFR138,
  requireSquareBroadFangHumanSemanticCollectionAuthorizationFR138,
} from './five-officers-square-broad-fang-semantic-annotation-protocol-fr138.js';
import { FaceAuthorityValidationError } from './validation.js';

describe('FR138 square-broad 方 research annotation protocol candidate', () => {
  it('materializes a source-grounded 方-only protocol candidate without collection authority', () => {
    const result = materializeSquareBroadFangSemanticAnnotationProtocolFR138();

    expect(result.authorityState).toBe(
      'square_broad_fang_research_annotation_protocol_candidate_materialized_collection_not_authorized',
    );
    expect(result.target).toEqual({
      criterionRef: 'criterion.intake.square_broad',
      sourceConcept: '方大',
      activeConstructScope: 'fang_shape_candidate_features_only',
    });
    expect(result.sourceGrounding.focalSourceTerm).toBe('方');
    expect(result.sourceGrounding.methodologyReviewStatus).toBe('research');
    expect(result.methodologyGovernance.targetSpecificReviewDecisionPresent).toBe(false);
    expect(result.methodologyGovernance.reviewedPromotionAuthorized).toBe(false);
    expect(result.collectionGate.humanSemanticCollectionAuthorized).toBe(false);
    expect(result.collectionGate.empiricalSemanticEvidenceAcquisitionAuthorized).toBe(false);
    expect(result.nextFrontier).toBe(FR138_NEXT_FRONTIER);
  });

  it('defines an independent blinded assessment with a mandatory unable-to-conclude path', () => {
    const result = materializeSquareBroadFangSemanticAnnotationProtocolFR138();

    expect(result.protocolCandidate.independentInitialAssessmentRequired).toBe(true);
    expect(result.protocolCandidate.abstentionPathRequired).toBe(true);
    expect(result.protocolCandidate.blinding.fr134CandidateMetricValuesHidden).toBe(true);
    expect(result.protocolCandidate.blinding.candidateThresholdsHidden).toBe(true);
    expect(result.protocolCandidate.blinding.peerLabelsHiddenDuringInitialAssessment).toBe(true);
    expect(result.protocolCandidate.blinding.modelOrProviderResultsHidden).toBe(true);
    expect(result.protocolCandidate.blinding.automatedTraditionalInterpretationHidden).toBe(true);
    expect(result.labelSchemaCandidate.labels).toEqual([
      'supports_fang_shape_hypothesis',
      'does_not_support_fang_shape_hypothesis',
      'unable_to_conclude',
    ]);
    expect(result.labelSchemaCandidate.labelsMeanTraditionalCriterionState).toBe(false);
  });

  it('creates a provenance-only packet that carries no candidate metrics, thresholds, or peer labels', () => {
    const packet = createSquareBroadFangBlindedAnnotationPacketFR138({
      packetRef: 'packet.research.square_broad.fang.001',
      researchSubjectRef: 'research-subject.001',
      captureSeriesRef: 'capture-series.001',
      captureRef: 'capture.001',
    });

    expect(packet.criterionRef).toBe('criterion.intake.square_broad');
    expect(packet.activeConstructScope).toBe('fang_shape_candidate_features_only');
    expect(packet.sourcePassageRef).toBe('passage.shenxiang.five_officers.intake.nlc_1925');
    expect(packet.hiddenFields).toEqual([
      'fr134_candidate_metric_values',
      'candidate_thresholds',
      'peer_labels',
      'model_or_provider_results',
      'automated_traditional_interpretation',
    ]);
    expect(Object.keys(packet)).not.toContain('metricValues');
    expect(Object.keys(packet)).not.toContain('threshold');
    expect(Object.keys(packet)).not.toContain('peerLabels');
  });

  it('keeps all reviewer policy values and downstream traditional execution unresolved', () => {
    const result = materializeSquareBroadFangSemanticAnnotationProtocolFR138();

    expect(result.unresolvedPolicy.annotationAuthorityRef).toBeNull();
    expect(result.unresolvedPolicy.reviewerCount).toBeNull();
    expect(result.unresolvedPolicy.quorum).toBeNull();
    expect(result.unresolvedPolicy.consensusThreshold).toBeNull();
    expect(result.unresolvedPolicy.adjudicationRuleRef).toBeNull();
    expect(result.unresolvedPolicy.reviewerQualificationRef).toBeNull();
    expect(result.execution.annotationAuthoritiesIssued).toBe(0);
    expect(result.execution.humanSemanticCollectionsStarted).toBe(0);
    expect(result.execution.empiricalSemanticLabelsIssued).toBe(0);
    expect(result.execution.traditionalMetricBindingsIssued).toBe(0);
    expect(result.execution.calibrationProtocolsIssued).toBe(0);
    expect(result.execution.thresholdsIssued).toBe(0);
    expect(result.execution.criterionStatesIssued).toBe(0);
    expect(result.execution.structuredClaimsIssued).toBe(0);
    expect(result.execution.boundedNarrativesIssued).toBe(0);
    expect(result.execution.traditionalSemanticAuthority).toBe(false);
  });

  it('fails closed when semantic collection is requested', () => {
    expect(() => requireSquareBroadFangHumanSemanticCollectionAuthorizationFR138()).toThrow(
      FaceAuthorityValidationError,
    );
    expect(() => requireSquareBroadFangHumanSemanticCollectionAuthorizationFR138()).toThrow(
      /human semantic collection is not authorized/u,
    );
  });
});
