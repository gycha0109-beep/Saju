import { createHash } from 'node:crypto';

const SOURCE_REPOSITORY = 'makehumancommunity/makehuman';
const SOURCE_COMMIT =
  'a8bc2d54ff0ac92e78ff71431b1023eda42bf482';
const RAW_ROOT =
  'https://raw.githubusercontent.com/'
  + SOURCE_REPOSITORY
  + '/'
  + SOURCE_COMMIT
  + '/';

const files = Object.freeze({
  baseObj: Object.freeze({
    path: 'makehuman/data/3dobjs/base.obj',
    gitBlobSha1:
      'd26635e9326e3cca30778fd7b9c00062b03cce09',
  }),
  skeleton: Object.freeze({
    path: 'makehuman/data/rigs/default.mhskel',
    gitBlobSha1:
      'b02cbecae00143856410d7561adf006d83bf9b3e',
  }),
  skeletonRuntime: Object.freeze({
    path: 'makehuman/shared/skeleton.py',
    gitBlobSha1:
      '6a2d77f0557b72e886b6b1bcd754db571313793f',
  }),
  wavefrontRuntime: Object.freeze({
    path: 'makehuman/shared/wavefront.py',
    gitBlobSha1:
      '450a2c053294d05b164c127e9018b8554a26eb4e',
  }),
  orientationWitness: Object.freeze({
    path: 'makehuman/data/povray/makehuman_hair.inc',
    gitBlobSha1:
      'c017181d4d6d948833952fe6523e8798cc2c39c2',
  }),
});

function fail(message) {
  throw new Error('FR104 MakeHuman source geometry preflight: ' + message);
}

function gitBlobSha1(bytes) {
  const header = Buffer.from(
    'blob ' + bytes.byteLength + '\0',
    'utf8',
  );
  return createHash('sha1')
    .update(header)
    .update(bytes)
    .digest('hex');
}

async function fetchPinned(spec) {
  const response = await fetch(RAW_ROOT + spec.path, {
    cache: 'no-store',
    headers: {
      'user-agent': 'myeongha-fr104-makehuman-source-preflight',
    },
  });
  if (!response.ok) {
    fail(
      'fetch failed for '
        + spec.path
        + ': HTTP '
        + response.status,
    );
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  const observed = gitBlobSha1(bytes);
  if (observed !== spec.gitBlobSha1) {
    fail(
      'git blob mismatch for '
        + spec.path
        + ': expected='
        + spec.gitBlobSha1
        + ' observed='
        + observed,
    );
  }
  return Object.freeze({
    bytes,
    text: bytes.toString('utf8'),
    gitBlobSha1: observed,
  });
}

function parseObjVertices(text) {
  const vertices = [];
  for (const line of text.split(/\r?\n/u)) {
    if (!line.startsWith('v ')) continue;
    const parts = line.trim().split(/\s+/u);
    if (parts.length !== 4) {
      fail('unexpected OBJ vertex field count.');
    }
    const point = parts.slice(1).map(Number);
    if (!point.every(Number.isFinite)) {
      fail('non-finite OBJ vertex.');
    }
    vertices.push(Object.freeze(point));
  }
  if (vertices.length === 0) {
    fail('OBJ contained no vertices.');
  }
  return Object.freeze(vertices);
}

function requireJointIndices(skeleton, jointName) {
  const joints = skeleton?.joints;
  if (
    typeof joints !== 'object'
    || joints === null
    || Array.isArray(joints)
  ) {
    fail('skeleton.joints is unavailable.');
  }
  const indices = joints[jointName];
  if (
    !Array.isArray(indices)
    || indices.length === 0
    || !indices.every(
      (value) =>
        Number.isInteger(value)
        && value >= 0,
    )
  ) {
    fail('invalid skeleton joint indices for ' + jointName);
  }
  return Object.freeze([...indices]);
}

function meanPoint(vertices, indices, jointName) {
  const sum = [0, 0, 0];
  for (const index of indices) {
    const point = vertices[index];
    if (point === undefined) {
      fail(
        jointName
          + ' vertex index out of range: '
          + index,
      );
    }
    sum[0] += point[0];
    sum[1] += point[1];
    sum[2] += point[2];
  }
  return Object.freeze(
    sum.map((value) => value / indices.length),
  );
}

function subtract(a, b) {
  return Object.freeze([
    a[0] - b[0],
    a[1] - b[1],
    a[2] - b[2],
  ]);
}

function midpoint(a, b) {
  return Object.freeze([
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2,
    (a[2] + b[2]) / 2,
  ]);
}

function length(vector) {
  return Math.hypot(vector[0], vector[1], vector[2]);
}

function normalize(vector, label) {
  const magnitude = length(vector);
  if (!(magnitude > 0)) {
    fail(label + ' is degenerate.');
  }
  return Object.freeze({
    magnitude,
    unit: Object.freeze(
      vector.map((value) => value / magnitude),
    ),
  });
}

const loaded = {};
for (const [key, spec] of Object.entries(files)) {
  loaded[key] = await fetchPinned(spec);
}

if (
  !loaded.wavefrontRuntime.text.includes(
    "if command == 'v':",
  )
  || !loaded.wavefrontRuntime.text.includes(
    'verts.append((float(lineData[1]), float(lineData[2]), float(lineData[3])))',
  )
  || !loaded.wavefrontRuntime.text.includes(
    'obj.setCoords(verts)',
  )
) {
  fail('pinned Wavefront loader semantics witness drifted.');
}

if (
  !loaded.skeletonRuntime.text.includes(
    'verts = human.getRestposeCoordinates()[v_idx]',
  )
  || !loaded.skeletonRuntime.text.includes(
    'return verts.mean(axis=0)',
  )
) {
  fail('pinned skeleton joint-center semantics witness drifted.');
}

if (
  !loaded.orientationWitness.text.includes(
    'MakeHuman_HeadLRVector = vnormalize(MakeHuman_joint_r_eye-MakeHuman_joint_l_eye)',
  )
  || !loaded.orientationWitness.text.includes(
    'MakeHuman_HeadFwVector = vnormalize((MakeHuman_joint_l_eye+MakeHuman_joint_r_eye)/2-MakeHuman_joint_head)',
  )
) {
  fail('pinned MakeHuman head-basis witness drifted.');
}

const vertices = parseObjVertices(loaded.baseObj.text);
const skeleton = JSON.parse(loaded.skeleton.text);

const leftIndices = requireJointIndices(
  skeleton,
  'eye.L____head',
);
const rightIndices = requireJointIndices(
  skeleton,
  'eye.R____head',
);
const headIndices = requireJointIndices(
  skeleton,
  'head____head',
);

const leftEye = meanPoint(
  vertices,
  leftIndices,
  'eye.L____head',
);
const rightEye = meanPoint(
  vertices,
  rightIndices,
  'eye.R____head',
);
const head = meanPoint(
  vertices,
  headIndices,
  'head____head',
);

const eyeMidpoint = midpoint(leftEye, rightEye);
const leftRight = normalize(
  subtract(rightEye, leftEye),
  'MakeHuman left-right eye axis',
);
const forward = normalize(
  subtract(eyeMidpoint, head),
  'MakeHuman head-to-eye-midpoint forward axis',
);

const summary = Object.freeze({
  schemaVersion:
    'fr104-makehuman-source-geometry-preflight-result-v1',
  authorityState:
    'independent_makehuman_source_geometry_only_no_render_no_provider_mapping',
  source: Object.freeze({
    repository: SOURCE_REPOSITORY,
    commit: SOURCE_COMMIT,
    verifiedGitBlobSha1: Object.freeze(
      Object.fromEntries(
        Object.entries(files).map(([key, spec]) => [
          key,
          spec.gitBlobSha1,
        ]),
      ),
    ),
  }),
  geometry: Object.freeze({
    objVertexCount: vertices.length,
    jointCenterSemantics:
      'mean_of_zero_based_rest_mesh_vertex_indices_in_source_order',
    leftEye: Object.freeze({
      jointName: 'eye.L____head',
      vertexIndices: leftIndices,
      point: leftEye,
    }),
    rightEye: Object.freeze({
      jointName: 'eye.R____head',
      vertexIndices: rightIndices,
      point: rightEye,
    }),
    head: Object.freeze({
      jointName: 'head____head',
      vertexIndices: headIndices,
      point: head,
    }),
    eyeMidpoint,
    leftRightAxis: Object.freeze({
      definition: 'normalize(r_eye-l_eye)',
      magnitude: leftRight.magnitude,
      unit: leftRight.unit,
      nonDegenerate: true,
    }),
    forwardAxis: Object.freeze({
      definition:
        'normalize(((l_eye+r_eye)/2)-head)',
      magnitude: forward.magnitude,
      unit: forward.unit,
      nonDegenerate: true,
    }),
  }),
  privacy: Object.freeze({
    userImageConsumed: false,
    cameraAccessed: false,
    renderedImageProduced: false,
    sourceAssetPersistedByVerifier: false,
    biometricTemplateProduced: false,
  }),
  authority: Object.freeze({
    anatomicalReferenceAdmitted: false,
    providerFaceDetectabilityVerified: false,
    providerLabelMappedToAnatomicalSide: false,
    anatomicalLateralityAuthorized: false,
    validatedExternalEarObservationAuthorized: false,
    traditionalBindingAuthorized: false,
    productionAuthorization: false,
  }),
});

process.stdout.write(JSON.stringify(summary) + '\n');
