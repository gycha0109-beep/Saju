import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import process from 'node:process';

const SOURCE_REPOSITORY = 'makehumancommunity/makehuman';
const SOURCE_COMMIT = 'a8bc2d54ff0ac92e78ff71431b1023eda42bf482';
const RAW_ROOT =
  'https://raw.githubusercontent.com/'
  + SOURCE_REPOSITORY
  + '/'
  + SOURCE_COMMIT
  + '/';

const OUTPUT_WIDTH = 1024;
const OUTPUT_HEIGHT = 1024;
const ORTHOGRAPHIC_SPAN_IN_MAKEHUMAN_UNITS = 3;
const TARGET_WEIGHT = 1;
const EXPECTED_RENDER_SHA256 = null;

const BODY_COLOR = Object.freeze([198, 151, 127]);
const EYE_COLOR = Object.freeze([220, 220, 220]);
const BACKGROUND_COLOR = Object.freeze([32, 32, 32]);
const AMBIENT_LIGHT = 0.35;
const DIFFUSE_LIGHT = 0.65;

const files = Object.freeze({
  baseObj: Object.freeze({
    path: 'makehuman/data/3dobjs/base.obj',
    gitBlobSha1: 'd26635e9326e3cca30778fd7b9c00062b03cce09',
  }),
  skeleton: Object.freeze({
    path: 'makehuman/data/rigs/default.mhskel',
    gitBlobSha1: 'b02cbecae00143856410d7561adf006d83bf9b3e',
  }),
  skeletonRuntime: Object.freeze({
    path: 'makehuman/shared/skeleton.py',
    gitBlobSha1: '6a2d77f0557b72e886b6b1bcd754db571313793f',
  }),
  wavefrontRuntime: Object.freeze({
    path: 'makehuman/shared/wavefront.py',
    gitBlobSha1: '450a2c053294d05b164c127e9018b8554a26eb4e',
  }),
  proxyRuntime: Object.freeze({
    path: 'makehuman/shared/proxy.py',
    gitBlobSha1: 'ac98a19632b0769b23ad3276380cc6132b2e0928',
  }),
  orientationWitness: Object.freeze({
    path: 'makehuman/data/povray/makehuman_hair.inc',
    gitBlobSha1: 'c017181d4d6d948833952fe6523e8798cc2c39c2',
  }),
  highPolyEyeObj: Object.freeze({
    path: 'makehuman/data/eyes/high-poly/high-poly.obj',
    gitBlobSha1: '01562a9caf4dca9ebb1fd5c24db083c17e724330',
  }),
  highPolyEyeProxy: Object.freeze({
    path: 'makehuman/data/eyes/high-poly/high-poly.mhclo',
    gitBlobSha1: '22bc5f77f398c59088804f7f4c9bb0e39d38661d',
  }),
  morphTarget: Object.freeze({
    path: 'makehuman/data/targets/head/head-scale-horiz-incr.target',
    gitBlobSha1: '9a32e90f7bd4d0a90092052d89137a365e272a67',
  }),
  targetRuntime: Object.freeze({
    path: 'makehuman/core/algos3d.py',
    gitBlobSha1: 'eaaf4e9c3d9c67d374a3fe8761812929f2c0f81e',
  }),
});

function fail(code, message) {
  throw new Error('FR104 U4B render [' + code + ']: ' + message);
}

function gitBlobSha1(bytes) {
  const header = Buffer.from('blob ' + bytes.byteLength + '\0', 'utf8');
  return createHash('sha1').update(header).update(bytes).digest('hex');
}

async function fetchPinned(spec) {
  const response = await globalThis.fetch(RAW_ROOT + spec.path, {
    cache: 'no-store',
    headers: {
      'user-agent': 'myeongha-fr104-u4b-morph-render-preflight',
    },
  });
  if (!response.ok) {
    fail('SOURCE_FETCH_FAILED', spec.path + ' HTTP ' + response.status);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  const observed = gitBlobSha1(bytes);
  if (observed !== spec.gitBlobSha1) {
    fail(
      'SOURCE_DRIFT',
      spec.path + ' expected=' + spec.gitBlobSha1 + ' observed=' + observed,
    );
  }
  return Object.freeze({
    bytes,
    text: bytes.toString('utf8'),
    gitBlobSha1: observed,
  });
}

function vector(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function midpoint(a, b) {
  return [
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2,
    (a[2] + b[2]) / 2,
  ];
}

function scale(v, factor) {
  return [v[0] * factor, v[1] * factor, v[2] * factor];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function magnitude(v) {
  return Math.hypot(v[0], v[1], v[2]);
}

function normalize(v, label) {
  const length = magnitude(v);
  if (!(length > 0) || !Number.isFinite(length)) {
    fail('CAMERA_BASIS_DEGENERATE', label + ' is degenerate.');
  }
  return Object.freeze({
    magnitude: length,
    unit: Object.freeze(v.map((value) => value / length)),
  });
}

function parseObj(text, options = {}) {
  const vertices = [];
  const triangles = [];
  let groups = [];
  const includeGroup = options.includeGroup ?? null;

  for (const line of text.split(/\r?\n/u)) {
    const trimmed = line.trim();
    if (trimmed.length === 0 || trimmed.startsWith('#')) continue;
    const parts = trimmed.split(/\s+/u);
    if (parts[0] === 'v') {
      if (parts.length !== 4) {
        fail('SOURCE_GEOMETRY_INVALID', 'unexpected OBJ vertex field count.');
      }
      const point = parts.slice(1).map(Number);
      if (!point.every(Number.isFinite)) {
        fail('SOURCE_GEOMETRY_INVALID', 'non-finite OBJ vertex.');
      }
      vertices.push(Object.freeze(point));
      continue;
    }
    if (parts[0] === 'g') {
      groups = parts.slice(1);
      continue;
    }
    if (parts[0] !== 'f') continue;
    if (includeGroup !== null && !groups.includes(includeGroup)) continue;

    const indices = parts.slice(1).map((token) => {
      const raw = Number.parseInt(token.split('/')[0], 10);
      if (!Number.isInteger(raw) || raw === 0) {
        fail('SOURCE_GEOMETRY_INVALID', 'invalid OBJ face index.');
      }
      const index = raw > 0 ? raw - 1 : vertices.length + raw;
      if (index < 0 || index >= vertices.length) {
        fail('SOURCE_GEOMETRY_INVALID', 'OBJ face index out of range.');
      }
      return index;
    });
    if (indices.length < 3) {
      fail('SOURCE_GEOMETRY_INVALID', 'OBJ face has fewer than three vertices.');
    }
    for (let i = 1; i < indices.length - 1; i += 1) {
      triangles.push(Object.freeze([indices[0], indices[i], indices[i + 1]]));
    }
  }

  if (vertices.length === 0) {
    fail('SOURCE_GEOMETRY_INVALID', 'OBJ contained no vertices.');
  }
  if (options.requireTriangles !== false && triangles.length === 0) {
    fail(
      'SOURCE_GEOMETRY_INVALID',
      includeGroup === null
        ? 'OBJ contained no triangles.'
        : 'OBJ group ' + includeGroup + ' contained no triangles.',
    );
  }
  return Object.freeze({
    vertices: Object.freeze(vertices),
    triangles: Object.freeze(triangles),
  });
}


function parseTarget(text, vertexCount) {
  const entries = [];
  const seen = new Set();

  for (const [lineIndex, line] of text.split(/\r?\n/u).entries()) {
    const trimmed = line.trim();
    if (trimmed.length === 0 || trimmed.startsWith('#')) continue;
    const parts = trimmed.split(/\s+/u);
    if (parts.length !== 4) {
      fail(
        'TARGET_FORMAT_INVALID',
        'line ' + (lineIndex + 1) + ' must contain index plus xyz delta.',
      );
    }
    const index = Number.parseInt(parts[0], 10);
    const delta = parts.slice(1).map(Number);
    if (
      !Number.isInteger(index)
      || index < 0
      || index >= vertexCount
      || !delta.every(Number.isFinite)
    ) {
      fail(
        'TARGET_FORMAT_INVALID',
        'line ' + (lineIndex + 1) + ' contains invalid target data.',
      );
    }
    if (seen.has(index)) {
      fail(
        'TARGET_FORMAT_INVALID',
        'duplicate target vertex index ' + index + '.',
      );
    }
    seen.add(index);
    entries.push(Object.freeze({
      index,
      delta: Object.freeze(delta),
    }));
  }

  if (entries.length === 0) {
    fail('TARGET_FORMAT_INVALID', 'target contains no vertex deltas.');
  }
  return Object.freeze(entries);
}

function applyTarget(baseVertices, entries, weight) {
  if (!Number.isFinite(weight)) {
    fail('TARGET_WEIGHT_INVALID', 'morph weight must be finite.');
  }
  const vertices = baseVertices.map((point) => [...point]);
  for (const entry of entries) {
    const point = vertices[entry.index];
    if (point === undefined) {
      fail(
        'TARGET_FORMAT_INVALID',
        'target vertex index out of range: ' + entry.index,
      );
    }
    point[0] += entry.delta[0] * weight;
    point[1] += entry.delta[1] * weight;
    point[2] += entry.delta[2] * weight;
    if (!point.every(Number.isFinite)) {
      fail(
        'TARGET_APPLICATION_INVALID',
        'target produced non-finite vertex ' + entry.index + '.',
      );
    }
  }
  return Object.freeze(vertices.map((point) => Object.freeze(point)));
}

function requireJointIndices(skeleton, jointName) {
  const joints = skeleton?.joints;
  if (typeof joints !== 'object' || joints === null || Array.isArray(joints)) {
    fail('SOURCE_GEOMETRY_INVALID', 'skeleton.joints unavailable.');
  }
  const indices = joints[jointName];
  if (
    !Array.isArray(indices)
    || indices.length === 0
    || !indices.every((value) => Number.isInteger(value) && value >= 0)
  ) {
    fail('SOURCE_GEOMETRY_INVALID', 'invalid joint indices for ' + jointName);
  }
  return Object.freeze([...indices]);
}

function meanPoint(vertices, indices, label) {
  const total = [0, 0, 0];
  for (const index of indices) {
    const point = vertices[index];
    if (point === undefined) {
      fail('SOURCE_GEOMETRY_INVALID', label + ' index out of range: ' + index);
    }
    total[0] += point[0];
    total[1] += point[1];
    total[2] += point[2];
  }
  return Object.freeze(total.map((value) => value / indices.length));
}

function parseMhclo(text) {
  const scaleData = [null, null, null];
  const mappings = [];
  let inVerts = false;

  for (const line of text.split(/\r?\n/u)) {
    const trimmed = line.trim();
    if (trimmed.length === 0 || trimmed.startsWith('#')) continue;
    const parts = trimmed.split(/\s+/u);
    const key = parts[0];

    if (key === 'x_scale' || key === 'y_scale' || key === 'z_scale') {
      if (parts.length !== 4) {
        fail('SOURCE_ASSEMBLY_INVALID', key + ' has unexpected field count.');
      }
      const axis = key === 'x_scale' ? 0 : key === 'y_scale' ? 1 : 2;
      const entry = {
        first: Number.parseInt(parts[1], 10),
        second: Number.parseInt(parts[2], 10),
        denominator: Number(parts[3]),
      };
      if (
        !Number.isInteger(entry.first)
        || !Number.isInteger(entry.second)
        || !(entry.denominator > 0)
      ) {
        fail('SOURCE_ASSEMBLY_INVALID', 'invalid ' + key + ' data.');
      }
      scaleData[axis] = Object.freeze(entry);
      continue;
    }

    if (key === 'verts') {
      inVerts = true;
      continue;
    }

    if (!inVerts) continue;
    if (!/^-?\d+$/u.test(key)) {
      inVerts = false;
      continue;
    }

    if (parts.length !== 6 && parts.length !== 9) {
      fail('SOURCE_ASSEMBLY_INVALID', 'unexpected proxy mapping field count.');
    }

    const refs = parts.slice(0, 3).map((value) => Number.parseInt(value, 10));
    const weights = parts.slice(3, 6).map(Number);
    const offsets = parts.length === 9 ? parts.slice(6, 9).map(Number) : [0, 0, 0];
    if (
      !refs.every((value) => Number.isInteger(value) && value >= 0)
      || !weights.every(Number.isFinite)
      || !offsets.every(Number.isFinite)
    ) {
      fail('SOURCE_ASSEMBLY_INVALID', 'invalid proxy mapping data.');
    }
    mappings.push(Object.freeze({
      refs: Object.freeze(refs),
      weights: Object.freeze(weights),
      offsets: Object.freeze(offsets),
    }));
  }

  if (scaleData.some((entry) => entry === null)) {
    fail('SOURCE_ASSEMBLY_INVALID', 'proxy scale data incomplete.');
  }
  if (mappings.length === 0) {
    fail('SOURCE_ASSEMBLY_INVALID', 'proxy vertex mappings unavailable.');
  }

  return Object.freeze({
    scaleData: Object.freeze(scaleData),
    mappings: Object.freeze(mappings),
  });
}

function buildScaleDiagonal(baseVertices, scaleData) {
  return Object.freeze(scaleData.map((entry, axis) => {
    const first = baseVertices[entry.first];
    const second = baseVertices[entry.second];
    if (first === undefined || second === undefined) {
      fail('SOURCE_ASSEMBLY_INVALID', 'proxy scale vertex index out of range.');
    }
    const value = Math.abs(first[axis] - second[axis]) / entry.denominator;
    if (!(value > 0) || !Number.isFinite(value)) {
      fail('SOURCE_ASSEMBLY_INVALID', 'proxy scale is degenerate.');
    }
    return value;
  }));
}

function assembleProxyVertices(baseVertices, proxy) {
  const scaleDiagonal = buildScaleDiagonal(baseVertices, proxy.scaleData);
  const vertices = proxy.mappings.map((mapping) => {
    const result = [0, 0, 0];
    for (let i = 0; i < 3; i += 1) {
      const source = baseVertices[mapping.refs[i]];
      if (source === undefined) {
        fail('SOURCE_ASSEMBLY_INVALID', 'proxy reference index out of range.');
      }
      result[0] += source[0] * mapping.weights[i];
      result[1] += source[1] * mapping.weights[i];
      result[2] += source[2] * mapping.weights[i];
    }
    result[0] += scaleDiagonal[0] * mapping.offsets[0];
    result[1] += scaleDiagonal[1] * mapping.offsets[1];
    result[2] += scaleDiagonal[2] * mapping.offsets[2];
    if (!result.every(Number.isFinite)) {
      fail('SOURCE_ASSEMBLY_INVALID', 'assembled proxy vertex is non-finite.');
    }
    return Object.freeze(result);
  });
  return Object.freeze({
    scaleDiagonal,
    vertices: Object.freeze(vertices),
  });
}

function buildCamera(leftEye, rightEye, head) {
  const eyeMidpoint = midpoint(leftEye, rightEye);
  const leftRight = normalize(
    vector(rightEye, leftEye),
    'MakeHuman r_eye-l_eye',
  );
  const forward = normalize(
    vector(eyeMidpoint, head),
    'MakeHuman eye-midpoint-head',
  );
  const up = normalize(
    cross(leftRight.unit, forward.unit),
    'MakeHuman parietal up',
  );
  const screenRight = normalize(
    vector(leftEye, rightEye),
    'screen-right anatomical basis',
  );

  const orthogonality = Object.freeze({
    leftRightDotForward: dot(leftRight.unit, forward.unit),
    leftRightDotUp: dot(leftRight.unit, up.unit),
    forwardDotUp: dot(forward.unit, up.unit),
  });
  for (const [key, value] of Object.entries(orthogonality)) {
    if (!Number.isFinite(value) || Math.abs(value) > 1e-12) {
      fail('CAMERA_BASIS_DEGENERATE', key + '=' + value);
    }
  }

  const span = forward.magnitude * ORTHOGRAPHIC_SPAN_IN_MAKEHUMAN_UNITS;
  if (!(span > 0) || !Number.isFinite(span)) {
    fail('FRAMING_UNRESOLVED', 'orthographic span is invalid.');
  }

  return Object.freeze({
    center: Object.freeze(eyeMidpoint),
    sourceLeftRight: leftRight,
    forward,
    up,
    screenRight,
    span,
    halfSpan: span / 2,
    orthogonality,
  });
}

function cameraCoordinates(point, camera) {
  const relative = vector(point, camera.center);
  return Object.freeze([
    dot(relative, camera.screenRight.unit),
    dot(relative, camera.up.unit),
    dot(relative, camera.forward.unit),
  ]);
}

function buildViewMatrix(camera) {
  const r = camera.screenRight.unit;
  const u = camera.up.unit;
  const f = camera.forward.unit;
  const c = camera.center;
  return Object.freeze([
    r[0], r[1], r[2], -dot(r, c),
    u[0], u[1], u[2], -dot(u, c),
    f[0], f[1], f[2], -dot(f, c),
    0, 0, 0, 1,
  ]);
}

function depthRange(vertexSets, camera) {
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  for (const vertices of vertexSets) {
    for (const point of vertices) {
      const depth = cameraCoordinates(point, camera)[2];
      if (depth < min) min = depth;
      if (depth > max) max = depth;
    }
  }
  if (!Number.isFinite(min) || !Number.isFinite(max) || !(max > min)) {
    fail('PROJECTION_UNRESOLVED', 'camera depth range is degenerate.');
  }
  return Object.freeze({ min, max });
}

function buildProjectionMatrix(camera, range) {
  const zHalf = (range.max - range.min) / 2;
  const zMid = (range.max + range.min) / 2;
  return Object.freeze([
    1 / camera.halfSpan, 0, 0, 0,
    0, 1 / camera.halfSpan, 0, 0,
    0, 0, 1 / zHalf, -zMid / zHalf,
    0, 0, 0, 1,
  ]);
}

function multiplyMatrix4Vector4(matrix, vector4) {
  return [
    matrix[0] * vector4[0] + matrix[1] * vector4[1]
      + matrix[2] * vector4[2] + matrix[3] * vector4[3],
    matrix[4] * vector4[0] + matrix[5] * vector4[1]
      + matrix[6] * vector4[2] + matrix[7] * vector4[3],
    matrix[8] * vector4[0] + matrix[9] * vector4[1]
      + matrix[10] * vector4[2] + matrix[11] * vector4[3],
    matrix[12] * vector4[0] + matrix[13] * vector4[1]
      + matrix[14] * vector4[2] + matrix[15] * vector4[3],
  ];
}

function projectPoint(point, camera) {
  const cameraPoint = cameraCoordinates(point, camera);
  return Object.freeze({
    normalizedX: 0.5 + cameraPoint[0] / camera.span,
    normalizedY: 0.5 - cameraPoint[1] / camera.span,
    depth: cameraPoint[2],
  });
}

function projectPointViaMatrices(point, viewMatrix, projectionMatrix) {
  const cameraPoint = multiplyMatrix4Vector4(
    viewMatrix,
    [point[0], point[1], point[2], 1],
  );
  const clip = multiplyMatrix4Vector4(projectionMatrix, cameraPoint);
  if (clip[3] === 0) {
    fail('GROUND_TRUTH_PROJECTION_MISMATCH', 'matrix projection w=0.');
  }
  const ndcX = clip[0] / clip[3];
  const ndcY = clip[1] / clip[3];
  return Object.freeze({
    normalizedX: (ndcX + 1) / 2,
    normalizedY: (1 - ndcY) / 2,
  });
}

function assertProjectionConsistency(
  label,
  point,
  direct,
  viewMatrix,
  projectionMatrix,
) {
  const matrix = projectPointViaMatrices(point, viewMatrix, projectionMatrix);
  const error = Math.hypot(
    direct.normalizedX - matrix.normalizedX,
    direct.normalizedY - matrix.normalizedY,
  );
  if (!Number.isFinite(error) || error > 1e-12) {
    fail(
      'GROUND_TRUTH_PROJECTION_MISMATCH',
      label + ' direct/matrix error=' + error,
    );
  }
  return Object.freeze({ matrix, error });
}

function assertGroundTruthInFrame(label, projected) {
  if (
    !Number.isFinite(projected.normalizedX)
    || !Number.isFinite(projected.normalizedY)
    || projected.normalizedX < 0
    || projected.normalizedX > 1
    || projected.normalizedY < 0
    || projected.normalizedY > 1
  ) {
    fail('PROJECTION_OUT_OF_BOUNDS', label + ' is outside canonical frame.');
  }
}

function shadeColor(baseColor, intensity) {
  return baseColor.map((channel) => Math.max(
    0,
    Math.min(255, Math.round(channel * intensity)),
  ));
}

function edge(ax, ay, bx, by, px, py) {
  return (px - ax) * (by - ay) - (py - ay) * (bx - ax);
}

function rasterizeTriangle(
  pixels,
  zBuffer,
  width,
  height,
  world0,
  world1,
  world2,
  camera,
  baseColor,
) {
  const p0 = projectPoint(world0, camera);
  const p1 = projectPoint(world1, camera);
  const p2 = projectPoint(world2, camera);

  const x0 = p0.normalizedX * (width - 1);
  const y0 = p0.normalizedY * (height - 1);
  const x1 = p1.normalizedX * (width - 1);
  const y1 = p1.normalizedY * (height - 1);
  const x2 = p2.normalizedX * (width - 1);
  const y2 = p2.normalizedY * (height - 1);

  const minXFloat = Math.min(x0, x1, x2);
  const maxXFloat = Math.max(x0, x1, x2);
  const minYFloat = Math.min(y0, y1, y2);
  const maxYFloat = Math.max(y0, y1, y2);
  if (
    maxXFloat < 0
    || minXFloat > width - 1
    || maxYFloat < 0
    || minYFloat > height - 1
  ) {
    return;
  }

  const area = edge(x0, y0, x1, y1, x2, y2);
  if (!Number.isFinite(area) || Math.abs(area) < 1e-12) return;

  const normal = cross(vector(world1, world0), vector(world2, world0));
  const normalLength = magnitude(normal);
  if (!(normalLength > 0)) return;
  const normalUnit = scale(normal, 1 / normalLength);
  const frontal = Math.abs(dot(normalUnit, camera.forward.unit));
  const intensity = AMBIENT_LIGHT + DIFFUSE_LIGHT * frontal;
  const color = shadeColor(baseColor, intensity);

  const minX = Math.max(0, Math.floor(minXFloat));
  const maxX = Math.min(width - 1, Math.ceil(maxXFloat));
  const minY = Math.max(0, Math.floor(minYFloat));
  const maxY = Math.min(height - 1, Math.ceil(maxYFloat));

  for (let y = minY; y <= maxY; y += 1) {
    const py = y + 0.5;
    for (let x = minX; x <= maxX; x += 1) {
      const px = x + 0.5;
      const w0 = edge(x1, y1, x2, y2, px, py) / area;
      const w1 = edge(x2, y2, x0, y0, px, py) / area;
      const w2 = edge(x0, y0, x1, y1, px, py) / area;
      if (w0 < -1e-12 || w1 < -1e-12 || w2 < -1e-12) continue;

      const depth = w0 * p0.depth + w1 * p1.depth + w2 * p2.depth;
      const pixelIndex = y * width + x;
      if (depth <= zBuffer[pixelIndex]) continue;

      zBuffer[pixelIndex] = depth;
      const offset = pixelIndex * 3;
      pixels[offset] = color[0];
      pixels[offset + 1] = color[1];
      pixels[offset + 2] = color[2];
    }
  }
}

function renderScene(scene) {
  const pixels = Buffer.alloc(OUTPUT_WIDTH * OUTPUT_HEIGHT * 3);
  for (let i = 0; i < OUTPUT_WIDTH * OUTPUT_HEIGHT; i += 1) {
    const offset = i * 3;
    pixels[offset] = BACKGROUND_COLOR[0];
    pixels[offset + 1] = BACKGROUND_COLOR[1];
    pixels[offset + 2] = BACKGROUND_COLOR[2];
  }
  const zBuffer = new Float64Array(OUTPUT_WIDTH * OUTPUT_HEIGHT);
  zBuffer.fill(Number.NEGATIVE_INFINITY);

  for (const triangle of scene.bodyTriangles) {
    rasterizeTriangle(
      pixels,
      zBuffer,
      OUTPUT_WIDTH,
      OUTPUT_HEIGHT,
      scene.baseVertices[triangle[0]],
      scene.baseVertices[triangle[1]],
      scene.baseVertices[triangle[2]],
      scene.camera,
      BODY_COLOR,
    );
  }

  for (const triangle of scene.eyeTriangles) {
    rasterizeTriangle(
      pixels,
      zBuffer,
      OUTPUT_WIDTH,
      OUTPUT_HEIGHT,
      scene.eyeVertices[triangle[0]],
      scene.eyeVertices[triangle[1]],
      scene.eyeVertices[triangle[2]],
      scene.camera,
      EYE_COLOR,
    );
  }

  return encodePngRgb(OUTPUT_WIDTH, OUTPUT_HEIGHT, pixels);
}

let crcTable;

function crc32(bytes) {
  if (crcTable === undefined) {
    crcTable = new Uint32Array(256);
    for (let n = 0; n < 256; n += 1) {
      let c = n;
      for (let k = 0; k < 8; k += 1) {
        c = (c & 1) !== 0 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      }
      crcTable[n] = c >>> 0;
    }
  }
  let c = 0xffffffff;
  for (const byte of bytes) {
    c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function adler32(bytes) {
  let a = 1;
  let b = 0;
  const mod = 65521;
  for (const byte of bytes) {
    a = (a + byte) % mod;
    b = (b + a) % mod;
  }
  return ((b << 16) | a) >>> 0;
}

function pngChunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii');
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const crcInput = Buffer.concat([typeBytes, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcInput), 0);
  return Buffer.concat([length, typeBytes, data, crc]);
}

function zlibStored(bytes) {
  const parts = [Buffer.from([0x78, 0x01])];
  let offset = 0;
  while (offset < bytes.length) {
    const length = Math.min(65535, bytes.length - offset);
    const final = offset + length === bytes.length;
    const header = Buffer.alloc(5);
    header[0] = final ? 1 : 0;
    header.writeUInt16LE(length, 1);
    header.writeUInt16LE((~length) & 0xffff, 3);
    parts.push(header, bytes.subarray(offset, offset + length));
    offset += length;
  }
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE(adler32(bytes), 0);
  parts.push(checksum);
  return Buffer.concat(parts);
}

function encodePngRgb(width, height, pixels) {
  if (pixels.length !== width * height * 3) {
    fail('RASTERIZATION_FAILED', 'RGB buffer length mismatch.');
  }
  const raw = Buffer.alloc(height * (1 + width * 3));
  for (let y = 0; y < height; y += 1) {
    const rowOffset = y * (1 + width * 3);
    raw[rowOffset] = 0;
    pixels.copy(
      raw,
      rowOffset + 1,
      y * width * 3,
      (y + 1) * width * 3,
    );
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', zlibStored(raw)),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function assertPinnedRuntimeSemantics(loaded) {
  if (
    !loaded.wavefrontRuntime.text.includes("if command == 'v':")
    || !loaded.wavefrontRuntime.text.includes(
      'verts.append((float(lineData[1]), float(lineData[2]), float(lineData[3])))',
    )
    || !loaded.wavefrontRuntime.text.includes('obj.setCoords(verts)')
  ) {
    fail('SOURCE_DRIFT', 'pinned Wavefront loader semantics witness drifted.');
  }
  if (
    !loaded.skeletonRuntime.text.includes(
      'verts = human.getRestposeCoordinates()[v_idx]',
    )
    || !loaded.skeletonRuntime.text.includes('return verts.mean(axis=0)')
  ) {
    fail('SOURCE_DRIFT', 'pinned skeleton semantics witness drifted.');
  }
  if (
    !loaded.proxyRuntime.text.includes(
      'hcoord[ref_vIdxs[:,0]] * weights[:,0,None]',
    )
    || !loaded.proxyRuntime.text.includes(
      'np.dot(matrix, self.offsets.transpose()).transpose()',
    )
    || !loaded.proxyRuntime.text.includes(
      'matrix[n][n] = (num/den)',
    )
  ) {
    fail('SOURCE_DRIFT', 'pinned proxy assembly semantics witness drifted.');
  }
  if (
    !loaded.targetRuntime.text.includes('translationData = line.split()')
    || !loaded.targetRuntime.text.includes('if len(translationData) != 4:')
    || !loaded.targetRuntime.text.includes(
      'translationVector = (float(translationData[1]), float(translationData[2]), float(translationData[3]))',
    )
    || !loaded.targetRuntime.text.includes(
      'obj.coord[dstVerts] += self.data[srcVerts] * scale[None,:]',
    )
  ) {
    fail('SOURCE_DRIFT', 'pinned MakeHuman target runtime semantics drifted.');
  }
  if (
    !loaded.orientationWitness.text.includes(
      'MakeHuman_HeadFwVector = vnormalize((MakeHuman_joint_l_eye+MakeHuman_joint_r_eye)/2-MakeHuman_joint_head)',
    )
    || !loaded.orientationWitness.text.includes(
      'MakeHuman_HeadLRVector = vnormalize(MakeHuman_joint_r_eye-MakeHuman_joint_l_eye)',
    )
    || !loaded.orientationWitness.text.includes(
      'MakeHuman_HeadPaVector = VPerp_To_Plane(MakeHuman_HeadFwVector, MakeHuman_HeadLRVector)',
    )
    || !loaded.orientationWitness.text.includes(
      'pointing up through the back of the cranium',
    )
  ) {
    fail('SOURCE_DRIFT', 'pinned MakeHuman head-basis witness drifted.');
  }
}

async function buildCanonicalScene() {
  const loaded = {};
  for (const [key, spec] of Object.entries(files)) {
    loaded[key] = await fetchPinned(spec);
  }
  assertPinnedRuntimeSemantics(loaded);

  const base = parseObj(loaded.baseObj.text, { includeGroup: 'body' });
  const allBaseVertices = parseObj(
    loaded.baseObj.text,
    { requireTriangles: false },
  ).vertices;
  if (base.vertices.length !== allBaseVertices.length) {
    fail('SOURCE_GEOMETRY_INVALID', 'base OBJ vertex parse mismatch.');
  }

  const targetEntries = parseTarget(
    loaded.morphTarget.text,
    allBaseVertices.length,
  );
  const morphedBaseVertices = applyTarget(
    allBaseVertices,
    targetEntries,
    TARGET_WEIGHT,
  );

  const skeleton = JSON.parse(loaded.skeleton.text);
  const leftIndices = requireJointIndices(skeleton, 'eye.L____head');
  const rightIndices = requireJointIndices(skeleton, 'eye.R____head');
  const headIndices = requireJointIndices(skeleton, 'head____head');
  const leftEye = meanPoint(morphedBaseVertices, leftIndices, 'eye.L____head');
  const rightEye = meanPoint(morphedBaseVertices, rightIndices, 'eye.R____head');
  const head = meanPoint(morphedBaseVertices, headIndices, 'head____head');

  const proxy = parseMhclo(loaded.highPolyEyeProxy.text);
  const eyeObject = parseObj(loaded.highPolyEyeObj.text);
  if (proxy.mappings.length !== eyeObject.vertices.length) {
    fail(
      'SOURCE_ASSEMBLY_INVALID',
      'proxy mapping count=' + proxy.mappings.length
        + ' eye OBJ vertices=' + eyeObject.vertices.length,
    );
  }
  const assembledEye = assembleProxyVertices(morphedBaseVertices, proxy);
  const camera = buildCamera(leftEye, rightEye, head);
  const range = depthRange(
    [morphedBaseVertices, assembledEye.vertices],
    camera,
  );
  const viewMatrix = buildViewMatrix(camera);
  const projectionMatrix = buildProjectionMatrix(camera, range);
  const leftProjected = projectPoint(leftEye, camera);
  const rightProjected = projectPoint(rightEye, camera);
  assertGroundTruthInFrame('anatomical left eye', leftProjected);
  assertGroundTruthInFrame('anatomical right eye', rightProjected);
  const leftConsistency = assertProjectionConsistency(
    'anatomical left eye',
    leftEye,
    leftProjected,
    viewMatrix,
    projectionMatrix,
  );
  const rightConsistency = assertProjectionConsistency(
    'anatomical right eye',
    rightEye,
    rightProjected,
    viewMatrix,
    projectionMatrix,
  );

  return Object.freeze({
    loaded,
    targetEntries,
    baseVertices: morphedBaseVertices,
    bodyTriangles: base.triangles,
    eyeVertices: assembledEye.vertices,
    eyeTriangles: eyeObject.triangles,
    eyeScaleDiagonal: assembledEye.scaleDiagonal,
    camera,
    depthRange: range,
    viewMatrix,
    projectionMatrix,
    leftEye,
    rightEye,
    head,
    leftProjected,
    rightProjected,
    projectionConsistency: Object.freeze({
      leftError: leftConsistency.error,
      rightError: rightConsistency.error,
    }),
  });
}

async function runPreflight(writeRenderPath = null) {
  const scene = await buildCanonicalScene();
  const first = renderScene(scene);
  const second = renderScene(scene);
  const firstSha = sha256(first);
  const secondSha = sha256(second);
  if (firstSha !== secondSha || !first.equals(second)) {
    fail(
      'NON_DETERMINISTIC_RENDER',
      'repeat renders differ: first=' + firstSha + ' second=' + secondSha,
    );
  }
  if (
    EXPECTED_RENDER_SHA256 !== null
    && firstSha !== EXPECTED_RENDER_SHA256
  ) {
    fail(
      'RENDER_DIGEST_DRIFT',
      'expected=' + EXPECTED_RENDER_SHA256 + ' observed=' + firstSha,
    );
  }

  if (writeRenderPath !== null) {
    writeFileSync(writeRenderPath, first);
  }

  const summary = Object.freeze({
    schemaVersion: 'fr104-u4b-makehuman-morph-render-result-v1',
    authorityState:
      EXPECTED_RENDER_SHA256 === null
        ? 'prospective_u4b_geometry_render_observed_digest_not_yet_pinned_no_provider_execution'
        : 'prospective_u4b_geometry_render_digest_pinned_no_provider_execution',
    source: Object.freeze({
      repository: SOURCE_REPOSITORY,
      commit: SOURCE_COMMIT,
      verifiedGitBlobSha1: Object.freeze(
        Object.fromEntries(
          Object.entries(files).map(([key, spec]) => [key, spec.gitBlobSha1]),
        ),
      ),
    }),
    morph: Object.freeze({
      targetPath: files.morphTarget.path,
      targetGitBlobSha1: files.morphTarget.gitBlobSha1,
      targetRuntimePath: files.targetRuntime.path,
      targetRuntimeGitBlobSha1: files.targetRuntime.gitBlobSha1,
      targetWeight: TARGET_WEIGHT,
      targetEntryCount: scene.targetEntries.length,
      applicationSemantics:
        'coord_at_target_vertex_plus_equals_target_vector_times_morph_factor',
      demographicMacroTargetUsed: false,
      asymmetricTargetUsed: false,
      geometryUsedInU4a: false,
      sameSourceFamilyAsU4a: true,
      independentSourceFamily: false,
    }),
    assembly: Object.freeze({
      baseSurfaceGroup: 'body',
      baseVertexCount: scene.baseVertices.length,
      bodyTriangleCount: scene.bodyTriangles.length,
      highPolyEyeVertexCount: scene.eyeVertices.length,
      highPolyEyeTriangleCount: scene.eyeTriangles.length,
      proxySemantics:
        'weighted_rest_mesh_reference_vertices_plus_source_scale_matrix_times_offset',
      proxyScaleDiagonal: scene.eyeScaleDiagonal,
    }),
    renderer: Object.freeze({
      implementation: 'fr104_bounded_cpu_triangle_rasterizer_v1_with_exact_makehuman_text_target_application',
      dependencySurface: 'node_builtin_only',
      outputFormat: 'PNG',
      pngColorType: 'rgb8',
      pngCompression: 'zlib_stored_blocks',
      width: OUTPUT_WIDTH,
      height: OUTPUT_HEIGHT,
      backgroundRgb: BACKGROUND_COLOR,
      bodyMaterialRgb: BODY_COLOR,
      eyeMaterialRgb: EYE_COLOR,
      lighting: Object.freeze({
        model: 'symmetric_camera_frontal_flat_lambert',
        ambient: AMBIENT_LIGHT,
        diffuse: DIFFUSE_LIGHT,
        facingTerm: 'abs(dot(triangle_normal,makehuman_forward))',
      }),
      postRenderTransform: Object.freeze({
        exifMetadataPresent: false,
        cropApplied: false,
        resizeApplied: false,
        rotationDegrees: 0,
        horizontalMirrorApplied: false,
      }),
    }),
    camera: Object.freeze({
      pose: Object.freeze({
        yawDegrees: 0,
        pitchDegrees: 0,
        rollDegrees: 0,
      }),
      centerRule: 'morphed_makehuman_eye_midpoint',
      projectionModel: 'orthographic',
      spanRule:
        '3_times_morphed_eye_midpoint_to_head_distance',
      span: scene.camera.span,
      halfSpan: scene.camera.halfSpan,
      sourceLeftRightAxis: scene.camera.sourceLeftRight.unit,
      screenRightAxis: scene.camera.screenRight.unit,
      forwardAxis: scene.camera.forward.unit,
      upAxis: scene.camera.up.unit,
      upAxisWitness:
        'MakeHuman_HeadPaVector_is_perpendicular_and_points_up_through_back_of_cranium',
      orthogonality: scene.camera.orthogonality,
      modelMatrix: Object.freeze([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
      ]),
      viewMatrix: scene.viewMatrix,
      projectionMatrix: scene.projectionMatrix,
      depthRange: scene.depthRange,
    }),
    anatomicalGroundTruth: Object.freeze({
      anatomicalLeftEye: Object.freeze({
        sourceJoint: 'eye.L____head',
        sourcePoint: scene.leftEye,
        normalizedImageCoordinate: Object.freeze({
          x: scene.leftProjected.normalizedX,
          y: scene.leftProjected.normalizedY,
        }),
      }),
      anatomicalRightEye: Object.freeze({
        sourceJoint: 'eye.R____head',
        sourcePoint: scene.rightEye,
        normalizedImageCoordinate: Object.freeze({
          x: scene.rightProjected.normalizedX,
          y: scene.rightProjected.normalizedY,
        }),
      }),
      sameCameraMatrixAsRenderedFixture: true,
      directVsMatrixProjectionMaximumError: Math.max(
        scene.projectionConsistency.leftError,
        scene.projectionConsistency.rightError,
      ),
      providerLandmarkDerived: false,
      providerLabelDerived: false,
      florencePromptSideDerived: false,
      imageSpaceXSignDefinesAnatomicalSide: false,
    }),
    deterministicRender: Object.freeze({
      repeatRenderByteEqual: true,
      repeatRenderSha256Equal: true,
      renderSha256: firstSha,
      expectedRenderSha256: EXPECTED_RENDER_SHA256,
      renderedFixtureDigestPinned: EXPECTED_RENDER_SHA256 !== null,
      renderedBytesPersistedByVerifier: writeRenderPath !== null,
      ephemeralRenderWrittenForDownstreamPreflight:
        writeRenderPath !== null,
      renderedImageRepositoryPersisted: false,
    }),
    privacy: Object.freeze({
      userImageConsumed: false,
      cameraAccessed: false,
      sourceAssetPersistedByVerifier: false,
      renderedImagePersistedByVerifier: writeRenderPath !== null,
      renderedImageRepositoryPersisted: false,
      biometricTemplateProduced: false,
    }),
    execution: Object.freeze({
      renderExecuted: true,
      providerExecuted: false,
      providerResultObserved: false,
      renderDigestAdmitted: false,
    }),
    authority: Object.freeze({
      u4bFixtureDigestPinned: false,
      prospectiveIndependentGeometryValidationExecuted: false,
      prospectiveIndependentGeometryMappingValidated: false,
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
}

function runSelfTest() {
  let degeneracyRejected = false;
  try {
    normalize([0, 0, 0], 'synthetic zero axis');
  } catch (error) {
    degeneracyRejected = String(error).includes('CAMERA_BASIS_DEGENERATE');
  }
  if (!degeneracyRejected) {
    fail('SELF_TEST_FAILED', 'axis degeneracy was not rejected.');
  }

  let outOfBoundsRejected = false;
  try {
    assertGroundTruthInFrame('synthetic', {
      normalizedX: 1.01,
      normalizedY: 0.5,
    });
  } catch (error) {
    outOfBoundsRejected = String(error).includes('PROJECTION_OUT_OF_BOUNDS');
  }
  if (!outOfBoundsRejected) {
    fail('SELF_TEST_FAILED', 'out-of-frame ground truth was not rejected.');
  }

  const pixels = Buffer.from([
    0, 0, 0, 255, 255, 255,
    255, 0, 0, 0, 255, 0,
  ]);
  const pngA = encodePngRgb(2, 2, pixels);
  const pngB = encodePngRgb(2, 2, pixels);
  if (!pngA.equals(pngB) || sha256(pngA) !== sha256(pngB)) {
    fail('SELF_TEST_FAILED', 'deterministic PNG encoding failed.');
  }

  const camera = buildCamera(
    [1, 1, 1],
    [-1, 1, 1],
    [0, 0, 0],
  );
  const view = buildViewMatrix(camera);
  const projection = buildProjectionMatrix(camera, { min: -1, max: 1 });
  const point = [0.5, 1, 1];
  const direct = projectPoint(point, camera);
  assertProjectionConsistency('synthetic', point, direct, view, projection);

  process.stdout.write(JSON.stringify({
    schemaVersion: 'fr104-u4b-makehuman-morph-render-self-test-v1',
    axisDegeneracyReject: true,
    outOfBoundsReject: true,
    deterministicPngEncoding: true,
    directVsMatrixProjectionConsistency: true,
    providerInputRequired: false,
  }) + '\n');
}

const writeRenderArgument = process.argv.find(
  (argument) => argument.startsWith('--write-render='),
);
const writeRenderPath = writeRenderArgument === undefined
  ? null
  : writeRenderArgument.slice('--write-render='.length);
if (writeRenderArgument !== undefined && writeRenderPath.length === 0) {
  fail('INVALID_OUTPUT_PATH', '--write-render requires a non-empty path.');
}

if (process.argv.includes('--self-test')) {
  if (writeRenderArgument !== undefined) {
    fail('INVALID_ARGUMENTS', '--self-test cannot materialize a render.');
  }
  runSelfTest();
} else {
  await runPreflight(writeRenderPath);
}
