import { describe, expect, it } from 'vitest';
import {
  FR266_REFERENCE_REF,
  type NeutralNasalApexVerticalReferenceFR266V1,
} from './provider-independent-nasal-apex-reference-fr266.js';
import {
  FR297_NASAL_BRIDGE_ROOT_REFERENCE_DEFINITION_REF,
  type FR297NeutralNasalBridgeRootReference,
} from './provider-independent-neutral-nasal-bridge-root-reference-fr297.js';
import {
  FR304_CURRENT_GATE,
  FR304_NASAL_BRIDGE_ROOT_VERTICAL_REFERENCE_REF,
  assertFR304CurrentGate,
  assertNasalApexVerticalReferenceHandoffFR304,
  createNasalApexVerticalReferenceHandoffFR304,
  createNasalBridgeRootVerticalReferenceHandoffFR304,
} from './nasal-vertical-reference-handoffs-fr304.js';

function fr266Source():
NeutralNasalApexVerticalReferenceFR266V1 {
  return {
    schemaVersion:
      'fr266-neutral-nasal-apex-vertical-reference-v1',
    artifactVersion: '0.1.0',
    referenceRef: FR266_REFERENCE_REF,
    watchtowerTrack: 'face-research',
    authorityState:
      'provider_independent_research_annotation_vertical_reference_only',
    value: 2.4,
    unit: 'centimeter',
    coordinateFrame:
      'canonical_aligned_right_handed_metric_xy',
    source: {
      subjectId: 'synthetic-subject',
      captureId: 'synthetic-capture',
      annotatorId: 'synthetic-annotator',
      sourceCoordinateFrame:
        'canonical_aligned_right_handed_metric_3d',
      projectionRuleRef:
        'neutral.face.canonical_metric_xy_projection@0.1.0',
      annotationDefinition:
        'most_prominent_midline_nasal_apex_point_in_canonical_aligned_metric_3d',
      providerBlind: true,
      traditionalLabelBlind: true,
      frozenBeforeProviderScoring: true,
    },
    authorityBoundary: {
      neutralResearchReferenceOnly: true,
      automatedExtractionIssued: false,
      providerIndexIssued: false,
      providerIndexSemanticBindingIssued: false,
      anthropometricPronasaleIdentityPromotedToProduct: false,
      traditionalZhuntouEquivalenceIssued: false,
      threeDivisionsSpanIssued: false,
      thresholdIssued: false,
      calibrationIssued: false,
      classifierIssued: false,
      F1ClaimIssued: false,
      F6ClaimIssued: false,
      fortuneClaimIssued: false,
      productionActivated: false,
      commerceActivated: false,
    },
    researchNoteRef:
      'repo:research/face-reading/fr266-provider-independent-nasal-apex-reference.md',
    nextFrontier:
      'evaluate_automated_neutral_nasal_apex_candidates_against_frozen_provider_independent_annotations_before_zhuntou_admission',
  };
}

function fr297Source():
FR297NeutralNasalBridgeRootReference {
  return {
    schemaVersion:
      'fr297-neutral-nasal-bridge-root-reference-v1',
    artifactVersion: '0.1.0',
    referenceDefinitionRef:
      FR297_NASAL_BRIDGE_ROOT_REFERENCE_DEFINITION_REF,
    watchtowerTrack: 'face-engine',
    authorityState:
      'provider_independent_neutral_3d_bridge_root_reference_instance',
    coordinateFrame:
      'canonical_aligned_right_handed_metric_3d',
    unit: 'centimeter',
    point: {
      x: 0.1,
      y: 4.2,
      z: 1.7,
    },
    source: {
      subjectId: 'synthetic-subject',
      captureId: 'synthetic-capture',
      annotatorId: 'synthetic-annotator',
      annotationDefinition:
        'point_of_maximal_curvature_of_midline_nasal_profile_curve_at_nasal_root_end',
      independentReferenceSurfaceVerified: true,
      providerBlind: true,
      providerIndexBlind: true,
      traditionalLabelBlind: true,
      frozenBeforeRgbCandidateScoring: true,
    },
    authorityBoundary: {
      benchmarkReferenceComponentOnly: true,
      anthropometricSellionIdentityPromotedToProduct: false,
      nasionEquivalenceIssued: false,
      automatedExtractionIssued: false,
      rgbCandidateIssued: false,
      tipBridgeProjectionAxisIssued: false,
      candidateWinnerIssued: false,
      thresholdIssued: false,
      calibrationIssued: false,
      classifierIssued: false,
      traditionalBindingIssued: false,
      productColumnMaterialized: false,
      productionActivated: false,
      commerceActivated: false,
    },
  };
}

describe('FR304 nasal vertical reference handoffs', () => {
  it('fails closed when no FR266 reference instance exists', () => {
    const result =
      createNasalApexVerticalReferenceHandoffFR304();

    expect(result).toEqual({
      schemaVersion:
        'fr304-nasal-apex-vertical-reference-handoff-v1',
      artifactVersion: '0.1.0',
      contractVersion:
        'FR304-NASAL-VERTICAL-REFERENCE-HANDOFF-v1',
      authorityState:
        'neutral_research_reference_handoff_only',
      status: 'unavailable',
      reason: 'fr266_reference_instance_unavailable',
      fallbackInvented: false,
      automatedRgbExtractionReady: false,
      bridgeReviewState:
        'neutral_reference_instance_unavailable_for_binding_review',
      sourceContractRef: FR266_REFERENCE_REF,
      authorityBoundary: {
        neutralReferenceHandoffOnly: true,
        automatedRgbExtractionIssued: false,
        productRuntimeObservationIssued: false,
        anthropometricIdentityPromotedToProduct: false,
        traditionalZhuntouEquivalenceIssued: false,
        traditionalShangenEquivalenceIssued: false,
        traditionalBindingIssued: false,
        threeDivisionsBoundaryIssued: false,
        threeDivisionsSpanIssued: false,
        thresholdIssued: false,
        calibrationIssued: false,
        classifierIssued: false,
        productColumnMaterialized: false,
        productionActivated: false,
        commerceActivated: false,
      },
    });
  });

  it('hands off the FR266 canonical XY value without exposing subject identifiers', () => {
    const result =
      createNasalApexVerticalReferenceHandoffFR304(
        fr266Source(),
      );

    expect(result.status).toBe('available');
    if (result.status !== 'available') return;

    expect(result).toMatchObject({
      observationRef: FR266_REFERENCE_REF,
      value: 2.4,
      unit: 'centimeter',
      coordinateFrame:
        'canonical_aligned_right_handed_metric_xy',
      automatedRgbExtractionReady: false,
      failClosedWhenUnavailable: true,
    });

    expect(result.source).toEqual({
      sourceKind:
        'fr266_provider_independent_nasal_apex',
      sourceReferenceRef: FR266_REFERENCE_REF,
      sourceAuthority: 'research_reference_only',
      sourceCoordinateFrame:
        'canonical_aligned_right_handed_metric_xy',
      sourceUnit: 'centimeter',
      subjectIdExposed: false,
      captureIdExposed: false,
      annotatorIdExposed: false,
      providerIndexExposed: false,
      traditionalSemanticsExposed: false,
    });
  });

  it('projects the FR297 bridge-root point through FR265 and emits only the Y reference', () => {
    const result =
      createNasalBridgeRootVerticalReferenceHandoffFR304(
        fr297Source(),
      );

    expect(result.status).toBe('available');
    if (result.status !== 'available') return;

    expect(result).toMatchObject({
      observationRef:
        FR304_NASAL_BRIDGE_ROOT_VERTICAL_REFERENCE_REF,
      value: 4.2,
      unit: 'centimeter',
      coordinateFrame:
        'canonical_aligned_right_handed_metric_xy',
      projectionRuleRef:
        'neutral.face.canonical_metric_xy_projection@0.1.0',
      automatedRgbExtractionReady: false,
      failClosedWhenUnavailable: true,
    });

    expect(result.source.subjectIdExposed).toBe(false);
    expect(result.source.captureIdExposed).toBe(false);
    expect(result.source.annotatorIdExposed).toBe(false);
  });

  it('fails closed when no FR297 reference instance exists', () => {
    const result =
      createNasalBridgeRootVerticalReferenceHandoffFR304();

    expect(result).toMatchObject({
      status: 'unavailable',
      reason: 'fr297_reference_instance_unavailable',
      fallbackInvented: false,
      automatedRgbExtractionReady: false,
      sourceDefinitionRef:
        FR297_NASAL_BRIDGE_ROOT_REFERENCE_DEFINITION_REF,
    });
  });

  it('rejects forged product or traditional authority on the FR266 source', () => {
    const source = fr266Source();

    expect(() =>
      createNasalApexVerticalReferenceHandoffFR304({
        ...source,
        authorityBoundary: {
          ...source.authorityBoundary,
          traditionalZhuntouEquivalenceIssued: true,
        },
      } as never),
    ).toThrow(/authority widened/);
  });

  it('rejects forged widened authority on the FR304 handoff', () => {
    const result =
      createNasalApexVerticalReferenceHandoffFR304(
        fr266Source(),
      );

    expect(() =>
      assertNasalApexVerticalReferenceHandoffFR304({
        ...result,
        authorityBoundary: {
          ...result.authorityBoundary,
          productRuntimeObservationIssued: true,
        },
      } as never),
    ).toThrow(/authority widened/);
  });

  it('freezes #1521 at six reference contracts while automated RGB extraction and product materialization remain unchanged', () => {
    expect(FR304_CURRENT_GATE).toMatchObject({
      parentIssue: 1521,
      requiredNeutralVerticalReferenceCapabilityCount: 7,
      handoffReadyNeutralReferenceCapabilityCount: 6,
      remainingNeutralReferenceCapabilityCount: 1,
      traditionalBindingAdmittedCount: 0,
      nasalApexReferenceContractReady: true,
      nasalBridgeRootReferenceContractReady: true,
      automatedRgbNasalApexExtractionReady: false,
      automatedRgbNasalBridgeRootExtractionReady: false,
      realIndependentReferenceInstanceMaterialized: false,
      productMaterializedCount: 18,
      threeDivisionsSpanExecutionReady: false,
      hairlineHardGapPreserved: true,
      productionActivated: false,
      commerceActivated: false,
    });

    expect(() => assertFR304CurrentGate()).not.toThrow();
  });
});
