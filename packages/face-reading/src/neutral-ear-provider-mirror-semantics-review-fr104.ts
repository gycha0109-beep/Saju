import {
  NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_EMPIRICAL_EVIDENCE_FR104,
} from './neutral-ear-mirror-multifixture-empirical-evidence-fr104.js';
import {
  NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_EMPIRICAL_EVIDENCE_FR104,
} from './neutral-ear-mirror-independent-fixture-empirical-evidence-fr104.js';

const multi =
  NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_EMPIRICAL_EVIDENCE_FR104;
const independent =
  NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_EMPIRICAL_EVIDENCE_FR104;

const multiSuccessfulCrossLabel =
  multi.successfulFixtures.every(
    (fixture) =>
      fixture.scalarEvidence.closerPattern
        === 'cross_label_reflection_closer',
  );

const independentSuccessfulCrossLabel =
  independent.status === 'paired_scalar_evidence'
  && independent.scalarEvidence?.closerPattern
    === 'cross_label_reflection_closer';

export const NEUTRAL_EAR_PROVIDER_MIRROR_SEMANTICS_REVIEW_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-provider-mirror-semantics-review-v1' as const,
    authorityState:
      'bounded_provider_mirror_behavior_supported_anatomical_mapping_unauthorized' as const,

    evidence: Object.freeze({
      runtime: Object.freeze({
        packageName: '@mediapipe/tasks-vision' as const,
        packageVersion: '0.10.35' as const,
        explicitTransform:
          'pixel_space_horizontal_mirror' as const,
      }),
      successfulTestedFixtureCount:
        multi.aggregate.successfulFixtureCount + 1,
      unavailableTestedFixtureCount:
        multi.aggregate.unavailableFixtureCount,
      mediaPipeSourceSuccessfulFixtureCount:
        multi.aggregate.successfulFixtureCount,
      independentSourceSuccessfulFixtureCount: 1 as const,
      allSuccessfulTestedFixturesCrossLabelCloser:
        multiSuccessfulCrossLabel
        && independentSuccessfulCrossLabel,
      unavailableFixturesUsedAsSemanticCounterexamples:
        false as const,
      numericAcceptanceThresholdApplied:
        false as const,
    }),

    supportedStatement: Object.freeze({
      status: 'supported_within_tested_boundary' as const,
      statement:
        'For @mediapipe/tasks-vision FaceLandmarker 0.10.35, under the exact tested IMAGE-mode runtime and explicit pixel-space horizontal reflection, every successfully detected tested fixture aligned provider-labeled eye topology more closely under cross-label correspondence than same-label correspondence.' as const,
      testedFixtureScopeOnly: true as const,
      includesIndependentPublicSourceFixture: true as const,
      mayBeUsedAsProviderMirrorBehaviorEvidence:
        true as const,
    }),

    notEstablished: Object.freeze({
      universalBehaviorForAllPossibleInputs:
        true as const,
      providerLeftMeansSubjectAnatomicalLeft:
        true as const,
      providerRightMeansSubjectAnatomicalRight:
        true as const,
      frontCameraMirrorSemantics:
        true as const,
      exifOrientationSemantics:
        true as const,
      capturePipelineMirrorProvenance:
        true as const,
      anatomicalEarLaterality:
        true as const,
      validatedExternalEarObservation:
        true as const,
      traditionalPhysiognomyBinding:
        true as const,
      productionAuthorization:
        true as const,
    }),

    decision: Object.freeze({
      boundedProviderMirrorBehaviorStatementAdmitted:
        true as const,
      generalUniversalProviderMirrorSemanticsAdmitted:
        false as const,
      providerLabelsAdmittedAsAnatomicalSide:
        false as const,
      anatomicalLateralityMappingAdmitted:
        false as const,
      nextGate:
        'combine bounded provider mirror behavior with separately governed capture-transform provenance and an independently sourced anatomical-side convention before any anatomical laterality assignment' as const,
    }),

    authority: Object.freeze({
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized:
        false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });
