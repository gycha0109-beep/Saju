import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import {
  inverseNeutralEarProviderRotationDegreesFR104,
  rotateNeutralEarProviderPointFR104,
} from '../.face-reading-dist/neutral-ear-makehuman-provider-rotation-dependence-fr104.js';
import {
  NEUTRAL_EAR_PROVIDER_COMPENSATED_OUTPUT_FRAME_FR104,
} from '../.face-reading-dist/neutral-ear-provider-compensated-output-frame-fr104.js';

const protocol =
  NEUTRAL_EAR_PROVIDER_COMPENSATED_OUTPUT_FRAME_FR104;

function fail(message) {
  throw new Error('FR104 U3.2.1: ' + message);
}

function object(value, label) {
  if (
    typeof value !== 'object'
    || value === null
    || Array.isArray(value)
  ) {
    fail(label + ' must be an object.');
  }
  return value;
}

function point(value, label) {
  const item = object(value, label);
  if (
    !Number.isFinite(item.x)
    || !Number.isFinite(item.y)
    || item.x < 0
    || item.x > 1
    || item.y < 0
    || item.y > 1
  ) {
    fail(label + ' must be finite within [0,1].');
  }
  return Object.freeze({ x:item.x, y:item.y });
}

function distance(left, right) {
  return Math.hypot(
    left.x - right.x,
    left.y - right.y,
  );
}

function midpoint(left, right) {
  return Object.freeze({
    x:(left.x + right.x) / 2,
    y:(left.y + right.y) / 2,
  });
}

function classify(sameLabelCost, crossLabelCost) {
  if (sameLabelCost < crossLabelCost) {
    return 'provider_same_label_closer';
  }
  if (crossLabelCost < sameLabelCost) {
    return 'provider_cross_label_closer';
  }
  return 'equal_or_unresolved';
}

function metrics(providerLeft, providerRight, baseline) {
  const sameLabelCost =
    distance(providerLeft, baseline.providerLeft)
    + distance(providerRight, baseline.providerRight);
  const crossLabelCost =
    distance(providerLeft, baseline.providerRight)
    + distance(providerRight, baseline.providerLeft);
  const providerMidpoint =
    midpoint(providerLeft, providerRight);
  const baselineMidpoint =
    midpoint(baseline.providerLeft, baseline.providerRight);

  return Object.freeze({
    providerEyeCentroids:Object.freeze({
      providerLeft,
      providerRight,
    }),
    sameLabelCost,
    crossLabelCost,
    unorderedPairCost:Math.min(
      sameLabelCost,
      crossLabelCost,
    ),
    pairMidpointError:distance(
      providerMidpoint,
      baselineMidpoint,
    ),
    interEyeDistanceAbsoluteDifference:Math.abs(
      distance(providerLeft, providerRight)
      - distance(
        baseline.providerLeft,
        baseline.providerRight,
      ),
    ),
    relation:classify(sameLabelCost, crossLabelCost),
    numericAcceptanceThresholdApplied:false,
  });
}

function mapPair(pair, degrees) {
  return Object.freeze({
    providerLeft:rotateNeutralEarProviderPointFR104(
      pair.providerLeft,
      degrees,
    ),
    providerRight:rotateNeutralEarProviderPointFR104(
      pair.providerRight,
      degrees,
    ),
  });
}

function findCase(result, id) {
  const item = result.cases.find(
    (candidate) => candidate.id === id,
  );
  if (item === undefined) {
    fail('U3_2_1_CASE_SHA_DRIFT missing case ' + id);
  }
  return item;
}

function requireCompensatedPair(item) {
  const compensated = object(
    item.compensated,
    item.id + '.compensated',
  );
  if (
    compensated.providerEligibilityState
      !== 'exact_one_face_478_landmarks_observed'
    || compensated.faceCount !== 1
    || compensated.landmarkCount !== 478
  ) {
    fail(
      'U3_2_1_CASE_SHA_DRIFT compensated provider unavailable '
        + item.id,
    );
  }
  const provider = object(
    compensated.providerEyeCentroids,
    item.id + '.providerEyeCentroids',
  );
  if (
    provider.topologyLabelAuthority
      !== 'provider_label_only_no_anatomical_meaning'
  ) {
    fail(
      'U3_2_1_UNAUTHORIZED_ANATOMICAL_DEPENDENCY '
        + item.id,
    );
  }
  return Object.freeze({
    providerLeft:point(
      provider.providerLeft,
      item.id + '.providerLeft',
    ),
    providerRight:point(
      provider.providerRight,
      item.id + '.providerRight',
    ),
  });
}

function strictLess(value, first, second) {
  return value < first && value < second;
}

function main() {
  const inputPath = resolve(
    process.cwd(),
    process.env.FR104_U3_2_RESULT_IN?.trim()
      || protocol.predecessor.liveReplayResultPath,
  );
  const serialized = readFileSync(inputPath, 'utf8').trim();
  const resultSha256 = createHash('sha256')
    .update(serialized)
    .digest('hex');

  if (resultSha256 !== protocol.predecessor.resultSha256) {
    fail(
      'U3_2_1_PREDECESSOR_DIGEST_DRIFT expected='
        + protocol.predecessor.resultSha256
        + ' observed='
        + resultSha256,
    );
  }

  const predecessor = JSON.parse(serialized);
  if (
    predecessor.schemaVersion
      !== 'fr104-provider-rotation-compensation-result-v1'
  ) {
    fail('U3_2_1_PREDECESSOR_DIGEST_DRIFT schema.');
  }

  const r0 = findCase(predecessor, 'R0');
  const m0 = findCase(predecessor, 'M0');
  const baselines = Object.freeze({
    non_mirrored:requireCompensatedPair(r0),
    mirrored:requireCompensatedPair(m0),
  });

  const cases = predecessor.cases.map((item) => {
    if (
      !['non_mirrored','mirrored'].includes(item.family)
      || ![0,90,180,270].includes(
        item.physicalClockwiseRotationDegrees,
      )
    ) {
      fail(
        'U3_2_1_FRAME_TRANSFORM_CONTRACT_DRIFT '
          + item.id,
      );
    }
    const pair = requireCompensatedPair(item);
    const physical =
      item.physicalClockwiseRotationDegrees;
    const inverse =
      inverseNeutralEarProviderRotationDegreesFR104(
        physical,
      );
    const baseline = baselines[item.family];

    const identityPair = mapPair(pair, 0);
    const inversePair = mapPair(pair, inverse);
    const oppositePair = mapPair(pair, physical);

    return Object.freeze({
      id:item.id,
      family:item.family,
      physicalClockwiseRotationDegrees:physical,
      compensationDegrees:item.compensationDegrees,
      nativeRgbaSha256:item.nativeRgbaSha256,
      hypotheses:Object.freeze({
        canonical_output_frame:
          metrics(
            identityPair.providerLeft,
            identityPair.providerRight,
            baseline,
          ),
        original_input_image_frame:
          metrics(
            inversePair.providerLeft,
            inversePair.providerRight,
            baseline,
          ),
        opposite_rotated_output_frame:
          metrics(
            oppositePair.providerLeft,
            oppositePair.providerRight,
            baseline,
          ),
      }),
    });
  });

  const byId = new Map(
    cases.map((item) => [item.id, item]),
  );

  const quarterTurnDominance =
    protocol.quarterTurnCases.every((id) => {
      const item = byId.get(id);
      if (item === undefined) {
        fail('U3_2_1_CASE_SHA_DRIFT missing ' + id);
      }
      const hypotheses = item.hypotheses;
      return strictLess(
        hypotheses.original_input_image_frame
          .unorderedPairCost,
        hypotheses.canonical_output_frame
          .unorderedPairCost,
        hypotheses.opposite_rotated_output_frame
          .unorderedPairCost,
      );
    });

  const halfTurnIdentityRejected =
    protocol.halfTurnCases.every((id) => {
      const item = byId.get(id);
      if (item === undefined) {
        fail('U3_2_1_CASE_SHA_DRIFT missing ' + id);
      }
      const hypotheses = item.hypotheses;
      if (
        !Object.is(
          hypotheses.original_input_image_frame
            .unorderedPairCost,
          hypotheses.opposite_rotated_output_frame
            .unorderedPairCost,
        )
      ) {
        fail(
          'U3_2_1_FRAME_TRANSFORM_CONTRACT_DRIFT half-turn '
            + id,
        );
      }
      return (
        hypotheses.original_input_image_frame
          .unorderedPairCost
        < hypotheses.canonical_output_frame
          .unorderedPairCost
      );
    });

  const rotatedIds = [
    ...protocol.quarterTurnCases,
    ...protocol.halfTurnCases,
  ];
  const aggregate = Object.freeze({
    canonical_output_frame:
      rotatedIds.reduce(
        (sum,id) =>
          sum
          + byId.get(id).hypotheses
            .canonical_output_frame.unorderedPairCost,
        0,
      ),
    original_input_image_frame:
      rotatedIds.reduce(
        (sum,id) =>
          sum
          + byId.get(id).hypotheses
            .original_input_image_frame.unorderedPairCost,
        0,
      ),
    opposite_rotated_output_frame:
      rotatedIds.reduce(
        (sum,id) =>
          sum
          + byId.get(id).hypotheses
            .opposite_rotated_output_frame.unorderedPairCost,
        0,
      ),
  });

  let state = 'mixed_or_unresolved_output_frame';
  if (
    quarterTurnDominance
    && halfTurnIdentityRejected
    && aggregate.original_input_image_frame
      < aggregate.canonical_output_frame
    && aggregate.original_input_image_frame
      < aggregate.opposite_rotated_output_frame
  ) {
    state = 'original_input_frame_supported';
  } else if (
    aggregate.canonical_output_frame
      < aggregate.original_input_image_frame
    && aggregate.canonical_output_frame
      < aggregate.opposite_rotated_output_frame
  ) {
    state = 'canonical_output_frame_supported';
  } else if (
    aggregate.opposite_rotated_output_frame
      < aggregate.original_input_image_frame
    && aggregate.opposite_rotated_output_frame
      < aggregate.canonical_output_frame
  ) {
    state = 'opposite_rotation_frame_supported';
  }

  const selectedHypothesis =
    state === 'original_input_frame_supported'
      ? 'original_input_image_frame'
      : state === 'canonical_output_frame_supported'
        ? 'canonical_output_frame'
        : state === 'opposite_rotation_frame_supported'
          ? 'opposite_rotated_output_frame'
          : null;

  const selectedSameLabelCaseIds =
    selectedHypothesis === null
      ? []
      : cases
        .filter(
          (item) =>
            item.hypotheses[selectedHypothesis].relation
              === 'provider_same_label_closer',
        )
        .map((item) => item.id);
  const selectedCrossLabelCaseIds =
    selectedHypothesis === null
      ? []
      : cases
        .filter(
          (item) =>
            item.hypotheses[selectedHypothesis].relation
              === 'provider_cross_label_closer',
        )
        .map((item) => item.id);

  const derived = Object.freeze({
    schemaVersion:
      'fr104-provider-compensated-output-frame-result-v1',
    authorityState:
      'bounded_coordinate_frame_candidate_no_anatomical_mapping',
    studyKind:protocol.studyKind,
    predecessor:Object.freeze({
      resultSha256,
      liveReplayVerified:true,
      repositoryPersistence:false,
    }),
    cases:Object.freeze(cases),
    summary:Object.freeze({
      state,
      selectedHypothesis,
      quarterTurnOriginalInputFrameStrictDominance:
        quarterTurnDominance,
      halfTurnIdentityRejected,
      aggregateUnorderedPairCost:aggregate,
      selectedSameLabelCaseIds:Object.freeze(
        selectedSameLabelCaseIds,
      ),
      selectedCrossLabelCaseIds:Object.freeze(
        selectedCrossLabelCaseIds,
      ),
      providerLabelsUsedToChooseFrame:false,
      anatomicalInterpretationUsed:false,
      anatomicalMappingReviewOutcome:'hold',
    }),
    authority:Object.freeze({
      providerCompensatedOutputFrameAudited:false,
      providerCompensatedOutputFrame:'unresolved',
      composedProviderOrientationNormalizationAvailableForExactFixture:
        false,
      providerLabelMappedToAnatomicalSide:false,
      globalProviderAnatomicalSemanticsEstablished:false,
      anatomicalReferenceAdmitted:false,
      anatomicalLateralityAuthorized:false,
      validatedExternalEarObservationAuthorized:false,
      traditionalBindingAuthorized:false,
      productionAuthorization:false,
    }),
  });

  const derivedSerialized = JSON.stringify(derived);
  const derivedSha256 = createHash('sha256')
    .update(derivedSerialized)
    .digest('hex');

  process.stdout.write(
    'FR104_U3_2_1_RESULT_SHA256 '
      + derivedSha256
      + '\n',
  );
  process.stdout.write(
    'FR104_U3_2_1_DERIVED_RESULT '
      + derivedSerialized
      + '\n',
  );
}

main();
