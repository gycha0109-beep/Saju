import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import {
  assessNeutralEarControlledAnatomicalMappingFR104,
  NEUTRAL_EAR_CONTROLLED_ANATOMICAL_SIDE_MAPPING_AUDIT_FR104,
} from '../.face-reading-dist/neutral-ear-controlled-anatomical-side-mapping-audit-fr104.js';
import {
  inverseNeutralEarProviderRotationDegreesFR104,
  rotateNeutralEarProviderPointFR104,
} from '../.face-reading-dist/neutral-ear-makehuman-provider-rotation-dependence-fr104.js';
import {
  NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_EMPIRICAL_SOURCE_FR104,
} from '../.face-reading-dist/neutral-ear-makehuman-transform-empirical-evidence-fr104.js';

const protocol =
  NEUTRAL_EAR_CONTROLLED_ANATOMICAL_SIDE_MAPPING_AUDIT_FR104;
const transformEvidence =
  NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_EMPIRICAL_SOURCE_FR104;

function fail(message) {
  throw new Error('FR104 U4A controlled anatomical mapping: ' + message);
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

function mapPoint(value, degrees, label) {
  return rotateNeutralEarProviderPointFR104(
    point(value, label),
    degrees,
  );
}

function findCase(cases, id, label) {
  const item = cases.find((candidate) => candidate.id === id);
  if (item === undefined) {
    fail(label + ' missing case ' + id);
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
    return null;
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
      'provider topology authority drift for '
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

function main() {
  const inputPath = resolve(
    process.cwd(),
    process.env.FR104_U3_2_RESULT_IN?.trim()
      || '.cache/face-geometry/fr104-u3-2-result.json',
  );
  const serialized = readFileSync(inputPath, 'utf8').trim();
  const predecessorSha256 = createHash('sha256')
    .update(serialized)
    .digest('hex');

  if (
    predecessorSha256
      !== protocol.predecessors.u3_2CompensationResultSha256
  ) {
    fail(
      'U3.2 digest drift expected='
        + protocol.predecessors.u3_2CompensationResultSha256
        + ' observed='
        + predecessorSha256,
    );
  }
  if (
    protocol.predecessors
      .u3_3ProspectiveComposedNormalizationValidated !== true
    || protocol.predecessors
      .providerCompensatedOutputFrameProspectivelyValidated !== true
  ) {
    fail('U3.3 prospective authority is not admitted.');
  }

  const predecessor = JSON.parse(serialized);
  if (
    predecessor.schemaVersion
      !== 'fr104-provider-rotation-compensation-result-v1'
    || !Array.isArray(predecessor.cases)
    || predecessor.cases.length !== 8
  ) {
    fail('U3.2 predecessor schema/case count drift.');
  }

  const cases = protocol.cases.map((expected) => {
    const live = findCase(
      predecessor.cases,
      expected.id,
      'U3.2 live result',
    );
    const anatomical = findCase(
      transformEvidence.cases,
      expected.id,
      'U3 transform evidence',
    );

    if (
      live.family !== expected.family
      || live.physicalClockwiseRotationDegrees
        !== expected.physicalClockwiseRotationDegrees
      || live.nativeRgbaSha256
        !== expected.transformedRgbaSha256
      || anatomical.transformedRgbaSha256
        !== expected.transformedRgbaSha256
      || anatomical.reflectionParity
        !== expected.reflectionParity
      || anatomical.transformedAnatomicalGroundTruth
        .anatomicalIdentityPreserved !== true
    ) {
      fail('transform provenance drift for ' + expected.id);
    }

    const providerPair = requireCompensatedPair(live);
    if (providerPair === null) {
      return Object.freeze({
        id:expected.id,
        family:expected.family,
        reflectionParity:expected.reflectionParity,
        physicalClockwiseRotationDegrees:
          expected.physicalClockwiseRotationDegrees,
        compensationDegrees:live.compensationDegrees,
        transformedRgbaSha256:
          expected.transformedRgbaSha256,
        available:false,
        canonicalProviderEyeCentroids:null,
        canonicalAnatomicalGroundTruth:null,
        directCost:null,
        swappedCost:null,
        relation:'unavailable',
      });
    }

    const inverse =
      inverseNeutralEarProviderRotationDegreesFR104(
        expected.physicalClockwiseRotationDegrees,
      );

    const canonicalProvider = Object.freeze({
      providerLeft:mapPoint(
        providerPair.providerLeft,
        inverse,
        expected.id + '.providerLeft',
      ),
      providerRight:mapPoint(
        providerPair.providerRight,
        inverse,
        expected.id + '.providerRight',
      ),
    });

    const transformedGroundTruth =
      anatomical.transformedAnatomicalGroundTruth;
    const canonicalAnatomical = Object.freeze({
      anatomicalLeftEye:mapPoint(
        transformedGroundTruth.anatomicalLeftEye,
        inverse,
        expected.id + '.anatomicalLeftEye',
      ),
      anatomicalRightEye:mapPoint(
        transformedGroundTruth.anatomicalRightEye,
        inverse,
        expected.id + '.anatomicalRightEye',
      ),
    });

    const directCost =
      distance(
        canonicalProvider.providerLeft,
        canonicalAnatomical.anatomicalLeftEye,
      )
      + distance(
        canonicalProvider.providerRight,
        canonicalAnatomical.anatomicalRightEye,
      );
    const swappedCost =
      distance(
        canonicalProvider.providerLeft,
        canonicalAnatomical.anatomicalRightEye,
      )
      + distance(
        canonicalProvider.providerRight,
        canonicalAnatomical.anatomicalLeftEye,
      );

    const relation =
      directCost < swappedCost
        ? 'direct_assignment_closer'
        : swappedCost < directCost
          ? 'swapped_assignment_closer'
          : 'equal_or_unresolved';

    return Object.freeze({
      id:expected.id,
      family:expected.family,
      reflectionParity:expected.reflectionParity,
      physicalClockwiseRotationDegrees:
        expected.physicalClockwiseRotationDegrees,
      compensationDegrees:live.compensationDegrees,
      transformedRgbaSha256:
        expected.transformedRgbaSha256,
      available:true,
      canonicalProviderEyeCentroids:canonicalProvider,
      canonicalAnatomicalGroundTruth:canonicalAnatomical,
      directCost,
      swappedCost,
      relation,
    });
  });

  const assessment =
    assessNeutralEarControlledAnatomicalMappingFR104(
      cases.map((item) =>
        Object.freeze({
          id:item.id,
          available:item.available,
          reflectionParity:item.reflectionParity,
          directCost:item.directCost,
          swappedCost:item.swappedCost,
        }),
      ),
    );

  const result = Object.freeze({
    schemaVersion:
      'fr104-controlled-anatomical-side-mapping-audit-result-v1',
    authorityState:
      'retrospective_controlled_mapping_candidate_not_admitted',
    studyKind:protocol.studyKind,
    predecessors:Object.freeze({
      u3_2CompensationResultSha256:predecessorSha256,
      u3_2LiveReplayVerified:true,
      u3_3ProspectiveResultSha256:
        protocol.predecessors.u3_3ProspectiveResultSha256,
      u3_3ProspectiveComposedNormalizationValidated:
        protocol.predecessors
          .u3_3ProspectiveComposedNormalizationValidated,
      providerCompensatedOutputFrameProspectivelyValidated:
        protocol.predecessors
          .providerCompensatedOutputFrameProspectivelyValidated,
    }),
    controlledReference:Object.freeze({
      fixturePngSha256:
        protocol.controlledReference.fixturePngSha256,
      canonicalRgbaSha256:
        protocol.controlledReference.canonicalRgbaSha256,
      independentAnatomicalGroundTruthSource:
        protocol.controlledReference
          .independentAnatomicalGroundTruthSource,
      providerLandmarkDerived:false,
      providerLabelDerived:false,
    }),
    normalization:protocol.normalization,
    cases:Object.freeze(cases),
    assessment,
    interpretationBoundary:protocol.interpretationBoundary,
    privacy:protocol.privacy,
    authority:Object.freeze({
      controlledAnatomicalMappingAudited:false,
      reflectionParityConditionalMappingSupportedOnExactFixture:
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

  const resultSerialized = JSON.stringify(result);
  const resultSha256 = createHash('sha256')
    .update(resultSerialized)
    .digest('hex');

  const out = process.env.FR104_U4A_RESULT_OUT?.trim();
  if (out) {
    const path = resolve(process.cwd(), out);
    mkdirSync(dirname(path), { recursive:true });
    writeFileSync(path, resultSerialized + '\n', 'utf8');
  }

  process.stdout.write(
    'FR104_U4A_RESULT_SHA256 '
      + resultSha256
      + '\n',
  );
  process.stdout.write(
    'FR104_U4A_DERIVED_RESULT '
      + resultSerialized
      + '\n',
  );
}

main();
