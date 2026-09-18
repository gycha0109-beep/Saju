import {
  FACE_READING_INDEPENDENT_ZYGION_REFERENCE_ACQUISITION_FR198,
  assertFaceReadingIndependentZygionReferenceAcquisitionFR198,
} from './face-reading-independent-zygion-reference-acquisition-fr198.js';

export interface FaceReadingPoint3DFR199 {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface FaceReadingPublicSyntheticAssetFR199 {
  readonly sampleId: string;
  readonly repository: string;
  readonly commitSha: string;
  readonly obj: {
    readonly path: string;
    readonly gitBlobSha: string;
    readonly sizeBytes: number;
  };
  readonly image: {
    readonly path: string;
    readonly gitBlobSha: string;
    readonly sizeBytes: number;
  };
}

export interface FaceReadingPublicSyntheticZygionReferenceFR199 {
  readonly schemaVersion: 'fr199-public-synthetic-zygion-reference-v1';
  readonly authorityState: 'independent_public_synthetic_zygion_reference_research_only';
  readonly sampleId: string;
  readonly sourceAlgorithm: {
    readonly repository: 'research-digitized-rhinoplasty/3D-Facial-Landmark-Detection';
    readonly commitSha: 'a31c73078616a492b6deed43b3620e04fe6e148d';
    readonly notebookPath: 'Facial_Landmark_Detection_Based_on_Geometric_Properties.ipynb';
    readonly notebookBlobSha: '42971c751145ba556d136d430f3205b3d2430b77';
    readonly sourceControlFlowQuirkPreserved: true;
    readonly publishedLeftZygionMeanErrorMm: 8.08;
    readonly publishedErrorUsedAsAcceptanceThreshold: false;
  };
  readonly pronasale: FaceReadingPoint3DFR199;
  readonly bilateralZygion: readonly [
    {
      readonly referenceLabel: 'source_left_zygion';
      readonly point: FaceReadingPoint3DFR199;
    },
    {
      readonly referenceLabel: 'source_right_zygion';
      readonly point: FaceReadingPoint3DFR199;
    },
  ];
  readonly providerCandidateVisibleDuringReferenceDerivation: false;
  readonly providerCandidateUsedToSeedReference: false;
  readonly providerCandidateUsedToFilterReference: false;
  readonly referenceFrozenBeforeProviderExecutionRequired: true;
  readonly providerReferenceCorrespondenceExecuted: false;
  readonly providerIndexAdmissionAuthorized: false;
  readonly thresholdAuthorized: false;
  readonly calibrationAuthorized: false;
  readonly productionActivationAuthorized: false;
  readonly commerceActivationAuthorized: false;
}

const MALE_REPOSITORY =
  'research-digitized-rhinoplasty/3D-face-morph-dataset-male' as const;
const MALE_COMMIT =
  'c3417d0f71b3c37444f77085f0715bf0700333b6' as const;
const FEMALE_REPOSITORY =
  'research-digitized-rhinoplasty/3D-face-morph-dataset-female' as const;
const FEMALE_COMMIT =
  '804bbf72a0e377c1175a6a38fd1f833242b775b3' as const;

function asset(
  sampleId: string,
  repository: string,
  commitSha: string,
  objSha: string,
  objSize: number,
  imageSha: string,
  imageSize: number,
): FaceReadingPublicSyntheticAssetFR199 {
  return Object.freeze({
    sampleId,
    repository,
    commitSha,
    obj: Object.freeze({
      path: `3D-models/${sampleId}.obj`,
      gitBlobSha: objSha,
      sizeBytes: objSize,
    }),
    image: Object.freeze({
      path: `2D-photos/${sampleId}.png`,
      gitBlobSha: imageSha,
      sizeBytes: imageSize,
    }),
  });
}

export const FACE_READING_PUBLIC_SYNTHETIC_ASSETS_FR199 = Object.freeze([
  asset('male-23', MALE_REPOSITORY, MALE_COMMIT, '8edb807701019504efd090b3e3cbf18e8add3a5c', 1282328, '02ad9fbf13b6cf0a92e6939038369e2e32eb3d18', 504990),
  asset('male-27', MALE_REPOSITORY, MALE_COMMIT, 'ee3befdaf4688adacb833fabffe2eff323b37d88', 1281531, 'fa6061ee6933f5457b67c9be78b0b153c8f4018b', 503147),
  asset('male-32', MALE_REPOSITORY, MALE_COMMIT, '7c51d72e0fc86877a064a63b7477b2ec7868c886', 1281770, 'df7608e712598d6df8530ccd29f7d5cf44a0798c', 81004),
  asset('male-33', MALE_REPOSITORY, MALE_COMMIT, 'cb4920c199ecbfea910076c0f8add2774c226dae', 1281382, 'df6002d4981a0b4fb4b0f22925e1e5cbcbb7ab8b', 92958),
  asset('male-34', MALE_REPOSITORY, MALE_COMMIT, '8dc86e4f26d2136e2af2a9339f0b044226d937b8', 1282126, '5d2fc77a259ff131641b652a19ff650b1149b75e', 503788),
  asset('male-35', MALE_REPOSITORY, MALE_COMMIT, 'ac95f2df78f45ac1d5039b7cb103a2fd09325061', 1282538, '665a8979dfaa06f918ebaa0f8e69d40bcf97e7b3', 91400),
  asset('male-36', MALE_REPOSITORY, MALE_COMMIT, '54986f955f55242bc2bbe9a64eab380dec6f7d0f', 1281684, '70219045e713c84b509a3a40cdc6612845082c0b', 499866),
  asset('male-39', MALE_REPOSITORY, MALE_COMMIT, 'dbf0b655f71f718a5668413f90334e0ab1952759', 1282804, 'ed199fa1b09234186795458abaf859dccd8bf066', 1611142),
  asset('male-45', MALE_REPOSITORY, MALE_COMMIT, 'a9ae15f42d0f14ddf0f252ad02e4f98be7d9ab98', 1287759, '1a31e8ffbe90ca012c5da9851816891d61b86b79', 448360),
  asset('male-47', MALE_REPOSITORY, MALE_COMMIT, '55877adca215ba120e4ff1349b43e7b65a4f0c96', 1283395, '1142b09366842b9866d5b5228eb3d35f466c7e6d', 1662291),
  asset('female-26', FEMALE_REPOSITORY, FEMALE_COMMIT, 'c3f590a0acde831cbd52b340694f67cbd295ea71', 799386, '635fe2c5274808d505ffb9ec6fae985c2bdcd585', 101460),
  asset('female-27', FEMALE_REPOSITORY, FEMALE_COMMIT, 'ad3d43eb0e2f3c667f785bcd0af1cc592a50a8ff', 788095, '030bcc370cdf226c9683b209b2e08aae2ae263a2', 1709080),
  asset('female-28', FEMALE_REPOSITORY, FEMALE_COMMIT, 'ad77f32a7deea6e485940b5620a7da943ce766b6', 773770, '667d530ea2f52b5d15b24fe69bbf437383c7cc6b', 1680151),
  asset('female-29', FEMALE_REPOSITORY, FEMALE_COMMIT, '63af3fb8684e5dbe523ac69137678ad97fb8ac81', 1296653, '537f51eded52e77219b71e7dbc0472ed585aab17', 424295),
  asset('female-30', FEMALE_REPOSITORY, FEMALE_COMMIT, '77dff13b1933aae76a4380bf9ccfe6e91a104738', 1290707, '7fbe8c5f8c75d268c635a73239936b2e3ab7601a', 470879),
  asset('female-31', FEMALE_REPOSITORY, FEMALE_COMMIT, '1e8ff8d42a2e5edf960ebab62814d7b00e087f4d', 1288354, 'e54f11eb745b2bb41424292793e51bca58a8c425', 440257),
  asset('female-33', FEMALE_REPOSITORY, FEMALE_COMMIT, '6c6c626747beb2a42995aa35a58f3101380276a8', 1292933, '20e6fb6d7683d5a135596d4913367e239d05f222', 97475),
  asset('female-34', FEMALE_REPOSITORY, FEMALE_COMMIT, '6c65717eb8ff934a37b1c93c89867f2335f9b4bb', 783588, '1255abf9a992f3667577d339d22d405d6735a072', 1747530),
  asset('female-40', FEMALE_REPOSITORY, FEMALE_COMMIT, '74a20f7708c697c11a3a548eb6e94ec83884a1cd', 1282202, '386ecffdc58260c0ef6b02e859792bdc334bac14', 1607852),
  asset('female-59', FEMALE_REPOSITORY, FEMALE_COMMIT, '7e0d1b4a73af86ecdc2c53507f5b1d2beacb02c7', 1278981, 'c1fcbbec538529d7bf34290466cf7c5f7f418ded', 1651118),
] as const);

export const FACE_READING_ZYGION_SOURCE_ALGORITHM_FR199 = Object.freeze({
  repository:
    'research-digitized-rhinoplasty/3D-Facial-Landmark-Detection' as const,
  commitSha: 'a31c73078616a492b6deed43b3620e04fe6e148d' as const,
  notebookPath:
    'Facial_Landmark_Detection_Based_on_Geometric_Properties.ipynb' as const,
  notebookBlobSha: '42971c751145ba556d136d430f3205b3d2430b77' as const,
  publishedLeftZygionMeanErrorMm: 8.08 as const,
  publishedErrorUsedAsAcceptanceThreshold: false as const,
  sourceControlFlowQuirk:
    "zygion=[] followed by if 'zygion' in locals(): return zygion" as const,
  sourceControlFlowQuirkPreserved: true as const,
  silentRepairAllowed: false as const,
});

function finitePoint(point: FaceReadingPoint3DFR199): boolean {
  return Number.isFinite(point.x) && Number.isFinite(point.y) && Number.isFinite(point.z);
}

export function parseWavefrontVerticesFR199(
  objText: string,
): readonly FaceReadingPoint3DFR199[] {
  if (typeof objText !== 'string' || objText.length === 0) {
    throw new Error('fr199_obj_text_missing');
  }

  const vertices: FaceReadingPoint3DFR199[] = [];
  for (const line of objText.split(/\r?\n/u)) {
    if (!line.startsWith('v ')) continue;
    const parts = line.trim().split(/\s+/u);
    if (parts.length < 4) throw new Error('fr199_obj_vertex_shape_invalid');
    const point = {
      x: Number(parts[1]),
      y: Number(parts[2]),
      z: Number(parts[3]),
    };
    if (!finitePoint(point)) throw new Error('fr199_obj_vertex_non_finite');
    vertices.push(Object.freeze(point));
  }

  if (vertices.length < 3) throw new Error('fr199_obj_vertex_set_too_small');
  return Object.freeze(vertices);
}

function findPronasaleSourceExact(
  vertices: readonly FaceReadingPoint3DFR199[],
): FaceReadingPoint3DFR199 {
  const xs = vertices.map((point) => point.x);
  const ys = vertices.map((point) => point.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const maxDifference = 40;

  const section = vertices
    .filter(
      (point) =>
        point.x > ((maxX + minX) / 2) - maxDifference
        && point.x < ((maxX + minX) / 2) + maxDifference
        && point.y > ((maxY + minY) / 3) - maxDifference
        && point.y < ((maxY + minY) / 3) + maxDifference,
    )
    .toSorted((a, b) => a.z - b.z);

  const pronasale = section.at(-1);
  if (!pronasale) throw new Error('fr199_source_exact_pronasale_not_found');
  return pronasale;
}

export function derivePublishedSourceExactZygionFR199(
  sampleId: string,
  vertices: readonly FaceReadingPoint3DFR199[],
): FaceReadingPublicSyntheticZygionReferenceFR199 {
  assertFaceReadingIndependentZygionReferenceAcquisitionFR198(
    FACE_READING_INDEPENDENT_ZYGION_REFERENCE_ACQUISITION_FR198,
  );

  if (!FACE_READING_PUBLIC_SYNTHETIC_ASSETS_FR199.some((asset) => asset.sampleId === sampleId)) {
    throw new Error('fr199_unregistered_public_synthetic_sample');
  }
  if (!Array.isArray(vertices) || vertices.length < 3 || vertices.some((point) => !finitePoint(point))) {
    throw new Error('fr199_reference_vertices_invalid');
  }

  const pronasale = findPronasaleSourceExact(vertices);
  const maxHeight = 10;
  const maxDepth = 100;
  const standardDeviation = 5;
  const currentMinWidth = 55 - (standardDeviation / 2);
  const currentMaxWidth = 55 + (standardDeviation / 2);

  const leftSection = vertices
    .filter(
      (point) =>
        point.x > pronasale.x + currentMinWidth
        && point.x < pronasale.x + currentMaxWidth
        && point.y > pronasale.y
        && point.y < pronasale.y + maxHeight
        && point.z < pronasale.z
        && point.z > pronasale.z - maxDepth,
    )
    .toSorted((a, b) => (a.x + a.y) - (b.x + b.y));

  const rightSection = vertices
    .filter(
      (point) =>
        point.x < pronasale.x - currentMinWidth
        && point.x > pronasale.x - currentMaxWidth
        && point.y > pronasale.y
        && point.y < pronasale.y + maxHeight
        && point.z < pronasale.z
        && point.z > pronasale.z - maxDepth,
    )
    .toSorted((a, b) => (a.x - a.y) - (b.x - b.y));

  const left = leftSection.at(-1);
  const right = rightSection.at(0);

  // Preserve the public notebook's effective first-band return behavior.
  // Governance adds only a fail-closed completeness check; it does not widen
  // or silently repair the published algorithm.
  if (!left || !right || !finitePoint(left) || !finitePoint(right)) {
    throw new Error('fr199_source_exact_bilateral_zygion_incomplete');
  }

  return Object.freeze({
    schemaVersion: 'fr199-public-synthetic-zygion-reference-v1' as const,
    authorityState:
      'independent_public_synthetic_zygion_reference_research_only' as const,
    sampleId,
    sourceAlgorithm: Object.freeze({
      repository: FACE_READING_ZYGION_SOURCE_ALGORITHM_FR199.repository,
      commitSha: FACE_READING_ZYGION_SOURCE_ALGORITHM_FR199.commitSha,
      notebookPath: FACE_READING_ZYGION_SOURCE_ALGORITHM_FR199.notebookPath,
      notebookBlobSha: FACE_READING_ZYGION_SOURCE_ALGORITHM_FR199.notebookBlobSha,
      sourceControlFlowQuirkPreserved: true as const,
      publishedLeftZygionMeanErrorMm: 8.08 as const,
      publishedErrorUsedAsAcceptanceThreshold: false as const,
    }),
    pronasale: Object.freeze({ ...pronasale }),
    bilateralZygion: Object.freeze([
      Object.freeze({
        referenceLabel: 'source_left_zygion' as const,
        point: Object.freeze({ ...left }),
      }),
      Object.freeze({
        referenceLabel: 'source_right_zygion' as const,
        point: Object.freeze({ ...right }),
      }),
    ]),
    providerCandidateVisibleDuringReferenceDerivation: false as const,
    providerCandidateUsedToSeedReference: false as const,
    providerCandidateUsedToFilterReference: false as const,
    referenceFrozenBeforeProviderExecutionRequired: true as const,
    providerReferenceCorrespondenceExecuted: false as const,
    providerIndexAdmissionAuthorized: false as const,
    thresholdAuthorized: false as const,
    calibrationAuthorized: false as const,
    productionActivationAuthorized: false as const,
    commerceActivationAuthorized: false as const,
  });
}
