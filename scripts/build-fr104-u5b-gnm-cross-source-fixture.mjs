import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import process from 'node:process';

const OUTPUT_WIDTH = 1024;
const OUTPUT_HEIGHT = 1024;
const EXPECTED_RENDER_SHA256 = null;

const MATERIAL_RGB = Object.freeze([198, 151, 127]);
const BACKGROUND_RGB = Object.freeze([32, 32, 32]);
const AMBIENT_LIGHT = 0.35;
const DIFFUSE_LIGHT = 0.65;

const EXPECTED_SOURCE = Object.freeze({
  repository: 'google/GNM',
  upstreamCommit: 'fe31d4eb089f591a2e0c8ff0c38203b7b1fb1690',
  sourcePath: 'gnm/shape/data/versions/v3_0/gnm_head.npz',
  gitBlobSha: 'ae49903ad7d50ce1d64e464a0407441f2781873c',
  byteLength: 53305389,
  variantNormalized: 'head',
});

const EXPECTED_LEFT = Object.freeze({
  jointName: 'left_eye',
  jointIndex: 2,
  sourcePoint: Object.freeze([
    0.030839037150144577,
    0.30316492915153503,
    0.09888789802789688,
  ]),
});

const EXPECTED_RIGHT = Object.freeze({
  jointName: 'right_eye',
  jointIndex: 3,
  sourcePoint: Object.freeze([
    -0.030866222456097603,
    0.3031134307384491,
    0.09897840023040771,
  ]),
});

function fail(code, message) {
  throw new Error('FR104 U5B render [' + code + ']: ' + message);
}

function exactArray(actual, expected, label) {
  if (
    !Array.isArray(actual)
    || actual.length !== expected.length
    || actual.some((value, index) => !Object.is(value, expected[index]))
  ) {
    fail('SOURCE_DRIFT', label + ' mismatch.');
  }
}

function parseObj(text) {
  const vertices = [];
  const triangles = [];
  const minimum = [Infinity, Infinity, Infinity];
  const maximum = [-Infinity, -Infinity, -Infinity];

  for (const [lineIndex, line] of text.split(/\r?\n/u).entries()) {
    const trimmed = line.trim();
    if (trimmed.length === 0 || trimmed.startsWith('#')) continue;
    const parts = trimmed.split(/\s+/u);
    if (parts[0] === 'v') {
      if (parts.length !== 4) {
        fail(
          'SOURCE_GEOMETRY_INVALID',
          'vertex field count at line ' + (lineIndex + 1),
        );
      }
      const x = Number(parts[1]);
      const y = Number(parts[2]);
      const z = Number(parts[3]);
      if (![x, y, z].every(Number.isFinite)) {
        fail(
          'SOURCE_GEOMETRY_INVALID',
          'non-finite vertex at line ' + (lineIndex + 1),
        );
      }
      vertices.push(x, y, z);
      minimum[0] = Math.min(minimum[0], x);
      minimum[1] = Math.min(minimum[1], y);
      minimum[2] = Math.min(minimum[2], z);
      maximum[0] = Math.max(maximum[0], x);
      maximum[1] = Math.max(maximum[1], y);
      maximum[2] = Math.max(maximum[2], z);
      continue;
    }
    if (parts[0] === 'f') {
      if (parts.length !== 4) {
        fail(
          'SOURCE_GEOMETRY_INVALID',
          'triangle field count at line ' + (lineIndex + 1),
        );
      }
      for (const token of parts.slice(1)) {
        const index = Number.parseInt(token.split('/')[0], 10);
        if (!Number.isInteger(index) || index <= 0) {
          fail(
            'SOURCE_GEOMETRY_INVALID',
            'invalid positive OBJ index at line ' + (lineIndex + 1),
          );
        }
        triangles.push(index - 1);
      }
    }
  }

  const vertexCount = vertices.length / 3;
  if (!Number.isInteger(vertexCount) || vertexCount === 0) {
    fail('SOURCE_GEOMETRY_INVALID', 'no vertices.');
  }
  if (triangles.length === 0 || triangles.length % 3 !== 0) {
    fail('SOURCE_GEOMETRY_INVALID', 'no complete triangles.');
  }
  for (const index of triangles) {
    if (index < 0 || index >= vertexCount) {
      fail('SOURCE_GEOMETRY_INVALID', 'triangle index out of range.');
    }
  }

  return Object.freeze({
    vertices: Float64Array.from(vertices),
    triangles: Uint32Array.from(triangles),
    vertexCount,
    triangleCount: triangles.length / 3,
    bounds: Object.freeze({
      min: Object.freeze(minimum),
      max: Object.freeze(maximum),
      center: Object.freeze([
        (minimum[0] + maximum[0]) / 2,
        (minimum[1] + maximum[1]) / 2,
        (minimum[2] + maximum[2]) / 2,
      ]),
      span: Object.freeze([
        maximum[0] - minimum[0],
        maximum[1] - minimum[1],
        maximum[2] - minimum[2],
      ]),
    }),
  });
}

function assertMetadata(metadata, geometry) {
  if (metadata?.schemaVersion !== 'fr104-u5b-gnm-geometry-preparation-v1') {
    fail('SOURCE_DRIFT', 'metadata schema mismatch.');
  }
  for (const [key, value] of Object.entries(EXPECTED_SOURCE)) {
    if (!Object.is(metadata.source?.[key], value)) {
      fail('SOURCE_DRIFT', 'source.' + key + ' mismatch.');
    }
  }
  if (
    metadata.geometry?.vertexCount !== geometry.vertexCount
    || metadata.geometry?.triangleCount !== geometry.triangleCount
  ) {
    fail('SOURCE_GEOMETRY_INVALID', 'geometry count mismatch.');
  }
  exactArray(metadata.geometry?.bounds?.min, geometry.bounds.min, 'bounds.min');
  exactArray(metadata.geometry?.bounds?.max, geometry.bounds.max, 'bounds.max');
  exactArray(
    metadata.geometry?.bounds?.center,
    geometry.bounds.center,
    'bounds.center',
  );
  exactArray(metadata.geometry?.bounds?.span, geometry.bounds.span, 'bounds.span');

  if (
    metadata.geometry?.coordinateConvention?.handedness !== 'right-handed'
    || metadata.geometry?.coordinateConvention?.upAxis !== '+Y'
    || metadata.geometry?.coordinateConvention?.forwardAxis !== '+Z'
    || metadata.geometry?.coordinateConvention?.unit !== 'meter'
  ) {
    fail('SOURCE_DRIFT', 'coordinate convention mismatch.');
  }

  const left = metadata.semanticGroundTruth?.leftEye;
  const right = metadata.semanticGroundTruth?.rightEye;
  if (
    left?.jointName !== EXPECTED_LEFT.jointName
    || left?.jointIndex !== EXPECTED_LEFT.jointIndex
  ) {
    fail('SOURCE_DRIFT', 'left semantic anchor identity mismatch.');
  }
  if (
    right?.jointName !== EXPECTED_RIGHT.jointName
    || right?.jointIndex !== EXPECTED_RIGHT.jointIndex
  ) {
    fail('SOURCE_DRIFT', 'right semantic anchor identity mismatch.');
  }
  exactArray(left?.sourcePoint, EXPECTED_LEFT.sourcePoint, 'left source point');
  exactArray(right?.sourcePoint, EXPECTED_RIGHT.sourcePoint, 'right source point');

  if (
    metadata.semanticGroundTruth?.semanticAuthority
      !== 'direct_gnm_source_joint_names_only'
    || metadata.semanticGroundTruth?.imageSpaceXSignDefinesAnatomicalSide !== false
    || metadata.semanticGroundTruth?.gnmAxisOrderingDefinesAnatomicalSide !== false
    || metadata.semanticGroundTruth?.providerLabelDerived !== false
    || metadata.semanticGroundTruth?.providerLandmarkDerived !== false
    || metadata.execution?.providerExecuted !== false
    || metadata.execution?.providerResultObserved !== false
  ) {
    fail('AUTHORITY_BOUNDARY_DRIFT', 'preparation boundary mismatch.');
  }
}

function buildCamera(bounds) {
  const spanX = bounds.span[0];
  const spanY = bounds.span[1];
  if (
    !Number.isFinite(spanX)
    || !Number.isFinite(spanY)
    || !(spanX > 0)
    || !(spanY > 0)
  ) {
    fail('CAMERA_BOUNDS_DEGENERATE', 'projected source bounds are degenerate.');
  }
  const span = Math.max(spanY * 1.24, spanX * 1.34);
  if (!Number.isFinite(span) || !(span > 0)) {
    fail('CAMERA_BOUNDS_DEGENERATE', 'orthographic span is invalid.');
  }
  const center = bounds.center;
  return Object.freeze({
    center,
    span,
    halfSpan: span / 2,
    viewDirection: Object.freeze([0, 0, -1]),
    screenRightAxis: Object.freeze([1, 0, 0]),
    screenUpAxis: Object.freeze([0, 1, 0]),
  });
}

function projectPoint(point, camera) {
  return Object.freeze({
    normalizedX: 0.5 + (point[0] - camera.center[0]) / camera.span,
    normalizedY: 0.5 - (point[1] - camera.center[1]) / camera.span,
    depth: point[2],
  });
}

function multiplyMatrix4Vector4(matrix, vector) {
  const result = new Array(4);
  for (let row = 0; row < 4; row += 1) {
    result[row] =
      matrix[row * 4] * vector[0]
      + matrix[row * 4 + 1] * vector[1]
      + matrix[row * 4 + 2] * vector[2]
      + matrix[row * 4 + 3] * vector[3];
  }
  return result;
}

function buildViewMatrix(camera) {
  return Object.freeze([
    1, 0, 0, -camera.center[0],
    0, 1, 0, -camera.center[1],
    0, 0, 1, -camera.center[2],
    0, 0, 0, 1,
  ]);
}

function buildProjectionMatrix(camera) {
  return Object.freeze([
    2 / camera.span, 0, 0, 0,
    0, 2 / camera.span, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ]);
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

function projectionConsistency(label, point, camera, view, projection) {
  const direct = projectPoint(point, camera);
  const matrix = projectPointViaMatrices(point, view, projection);
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
  if (
    direct.normalizedX < 0
    || direct.normalizedX > 1
    || direct.normalizedY < 0
    || direct.normalizedY > 1
  ) {
    fail('PROJECTION_OUT_OF_BOUNDS', label + ' is outside canonical frame.');
  }
  return Object.freeze({ direct, matrix, error });
}

function edge(ax, ay, bx, by, px, py) {
  return (px - ax) * (by - ay) - (py - ay) * (bx - ax);
}

function shadeColor(intensity) {
  return MATERIAL_RGB.map((channel) => Math.max(
    0,
    Math.min(255, Math.round(channel * intensity)),
  ));
}

function renderGeometry(geometry, camera) {
  const pixelCount = OUTPUT_WIDTH * OUTPUT_HEIGHT;
  const pixels = Buffer.alloc(pixelCount * 3);
  for (let i = 0; i < pixelCount; i += 1) {
    const offset = i * 3;
    pixels[offset] = BACKGROUND_RGB[0];
    pixels[offset + 1] = BACKGROUND_RGB[1];
    pixels[offset + 2] = BACKGROUND_RGB[2];
  }
  const zBuffer = new Float64Array(pixelCount);
  zBuffer.fill(Number.NEGATIVE_INFINITY);

  const vertices = geometry.vertices;
  const triangles = geometry.triangles;

  for (let t = 0; t < triangles.length; t += 3) {
    const ia = triangles[t] * 3;
    const ib = triangles[t + 1] * 3;
    const ic = triangles[t + 2] * 3;

    const ax = vertices[ia];
    const ay = vertices[ia + 1];
    const az = vertices[ia + 2];
    const bx = vertices[ib];
    const by = vertices[ib + 1];
    const bz = vertices[ib + 2];
    const cx = vertices[ic];
    const cy = vertices[ic + 1];
    const cz = vertices[ic + 2];

    const pax = (0.5 + (ax - camera.center[0]) / camera.span)
      * (OUTPUT_WIDTH - 1);
    const pay = (0.5 - (ay - camera.center[1]) / camera.span)
      * (OUTPUT_HEIGHT - 1);
    const pbx = (0.5 + (bx - camera.center[0]) / camera.span)
      * (OUTPUT_WIDTH - 1);
    const pby = (0.5 - (by - camera.center[1]) / camera.span)
      * (OUTPUT_HEIGHT - 1);
    const pcx = (0.5 + (cx - camera.center[0]) / camera.span)
      * (OUTPUT_WIDTH - 1);
    const pcy = (0.5 - (cy - camera.center[1]) / camera.span)
      * (OUTPUT_HEIGHT - 1);

    const minXFloat = Math.min(pax, pbx, pcx);
    const maxXFloat = Math.max(pax, pbx, pcx);
    const minYFloat = Math.min(pay, pby, pcy);
    const maxYFloat = Math.max(pay, pby, pcy);
    if (
      maxXFloat < 0
      || minXFloat > OUTPUT_WIDTH - 1
      || maxYFloat < 0
      || minYFloat > OUTPUT_HEIGHT - 1
    ) {
      continue;
    }

    const area = edge(pax, pay, pbx, pby, pcx, pcy);
    if (!Number.isFinite(area) || Math.abs(area) < 1e-12) continue;

    const ux = bx - ax;
    const uy = by - ay;
    const uz = bz - az;
    const vx = cx - ax;
    const vy = cy - ay;
    const vz = cz - az;
    const nx = uy * vz - uz * vy;
    const ny = uz * vx - ux * vz;
    const nz = ux * vy - uy * vx;
    const normalLength = Math.hypot(nx, ny, nz);
    if (!(normalLength > 0) || !Number.isFinite(normalLength)) continue;

    const frontal = Math.abs(nz / normalLength);
    const intensity = AMBIENT_LIGHT + DIFFUSE_LIGHT * frontal;
    const color = shadeColor(intensity);

    const minX = Math.max(0, Math.floor(minXFloat));
    const maxX = Math.min(OUTPUT_WIDTH - 1, Math.ceil(maxXFloat));
    const minY = Math.max(0, Math.floor(minYFloat));
    const maxY = Math.min(OUTPUT_HEIGHT - 1, Math.ceil(maxYFloat));

    for (let y = minY; y <= maxY; y += 1) {
      const py = y + 0.5;
      for (let x = minX; x <= maxX; x += 1) {
        const px = x + 0.5;
        const w0 = edge(pbx, pby, pcx, pcy, px, py) / area;
        const w1 = edge(pcx, pcy, pax, pay, px, py) / area;
        const w2 = edge(pax, pay, pbx, pby, px, py) / area;
        if (w0 < -1e-12 || w1 < -1e-12 || w2 < -1e-12) continue;

        const depth = w0 * az + w1 * bz + w2 * cz;
        const pixelIndex = y * OUTPUT_WIDTH + x;
        if (depth <= zBuffer[pixelIndex]) continue;
        zBuffer[pixelIndex] = depth;

        const offset = pixelIndex * 3;
        pixels[offset] = color[0];
        pixels[offset + 1] = color[1];
        pixels[offset + 2] = color[2];
      }
    }
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

function readArg(prefix) {
  const argument = process.argv.find((value) => value.startsWith(prefix));
  return argument === undefined ? null : argument.slice(prefix.length);
}

function runSelfTest() {
  const geometry = parseObj([
    'v -1 -1 0',
    'v 1 -1 0',
    'v 0 1 0',
    'f 1 2 3',
    '',
  ].join('\n'));
  const camera = buildCamera(geometry.bounds);
  const view = buildViewMatrix(camera);
  const projection = buildProjectionMatrix(camera);
  const point = [0, 0, 0];
  projectionConsistency('synthetic', point, camera, view, projection);

  const pixels = Buffer.from([
    0, 0, 0, 255, 255, 255,
    255, 0, 0, 0, 255, 0,
  ]);
  const a = encodePngRgb(2, 2, pixels);
  const b = encodePngRgb(2, 2, pixels);
  if (!a.equals(b) || sha256(a) !== sha256(b)) {
    fail('SELF_TEST_FAILED', 'deterministic PNG encoding failed.');
  }

  let invalidIndexRejected = false;
  try {
    parseObj('v 0 0 0\nv 1 0 0\nv 0 1 0\nf 1 2 4\n');
  } catch (error) {
    invalidIndexRejected = String(error).includes('triangle index out of range');
  }
  if (!invalidIndexRejected) {
    fail('SELF_TEST_FAILED', 'invalid triangle index was not rejected.');
  }

  process.stdout.write(JSON.stringify({
    schemaVersion: 'fr104-u5b-gnm-render-self-test-v1',
    deterministicPngEncoding: true,
    directVsMatrixProjectionConsistency: true,
    invalidTriangleIndexReject: true,
    providerInputRequired: false,
  }) + '\n');
}

function run() {
  const objPath = readArg('--obj=');
  const metadataPath = readArg('--metadata=');
  const writeRenderPath = readArg('--write-render=');
  if (!objPath || !metadataPath) {
    fail('INVALID_ARGUMENTS', '--obj and --metadata are required.');
  }

  const geometry = parseObj(readFileSync(objPath, 'utf8'));
  const metadata = JSON.parse(readFileSync(metadataPath, 'utf8'));
  assertMetadata(metadata, geometry);

  const camera = buildCamera(geometry.bounds);
  const viewMatrix = buildViewMatrix(camera);
  const projectionMatrix = buildProjectionMatrix(camera);
  const left = projectionConsistency(
    'anatomical left eye',
    EXPECTED_LEFT.sourcePoint,
    camera,
    viewMatrix,
    projectionMatrix,
  );
  const right = projectionConsistency(
    'anatomical right eye',
    EXPECTED_RIGHT.sourcePoint,
    camera,
    viewMatrix,
    projectionMatrix,
  );

  const first = renderGeometry(geometry, camera);
  const second = renderGeometry(geometry, camera);
  const firstSha = sha256(first);
  const secondSha = sha256(second);
  if (!first.equals(second) || firstSha !== secondSha) {
    fail(
      'NON_DETERMINISTIC_RENDER',
      'repeat renders differ first=' + firstSha + ' second=' + secondSha,
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
    if (writeRenderPath.length === 0) {
      fail('INVALID_OUTPUT_PATH', '--write-render requires a path.');
    }
    writeFileSync(writeRenderPath, first);
  }

  const summary = Object.freeze({
    schemaVersion: 'fr104-u5b-gnm-cross-source-render-result-v1',
    authorityState:
      EXPECTED_RENDER_SHA256 === null
        ? 'u5b_render_observed_digest_not_yet_admitted_no_provider_execution'
        : 'u5b_render_digest_pinned_no_provider_execution',
    source: Object.freeze({
      ...EXPECTED_SOURCE,
      sourceFamily: 'google_gnm_head',
      sourceFamilyDistinctFromMakeHuman: true,
      sourceFamilyDistinctFromMediaPipe: true,
    }),
    geometry: Object.freeze({
      vertexCount: geometry.vertexCount,
      triangleCount: geometry.triangleCount,
      bounds: geometry.bounds,
    }),
    renderer: Object.freeze({
      implementation: 'fr104_bounded_cpu_triangle_rasterizer_v2_gnm_template',
      dependencySurface: 'node_builtin_plus_pinned_npz_decode_stage',
      outputFormat: 'PNG',
      pngColorType: 'rgb8',
      pngCompression: 'zlib_stored_blocks',
      width: OUTPUT_WIDTH,
      height: OUTPUT_HEIGHT,
      materialRgb: MATERIAL_RGB,
      backgroundRgb: BACKGROUND_RGB,
      lighting: Object.freeze({
        model: 'symmetric_camera_frontal_flat_lambert',
        ambient: AMBIENT_LIGHT,
        diffuse: DIFFUSE_LIGHT,
        facingTerm: 'abs(dot(triangle_normal,positive_z_axis))',
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
      projectionModel: 'orthographic',
      centerRule: 'full_gnm_template_xyz_bounds_midpoint',
      center: camera.center,
      spanRule:
        'max(full_template_span_y_times_1_24,full_template_span_x_times_1_34)',
      span: camera.span,
      halfSpan: camera.halfSpan,
      viewDirection: camera.viewDirection,
      screenRightAxis: camera.screenRightAxis,
      screenUpAxis: camera.screenUpAxis,
      viewMatrix,
      projectionMatrix,
    }),
    anatomicalGroundTruth: Object.freeze({
      anatomicalLeftEye: Object.freeze({
        sourceJoint: EXPECTED_LEFT.jointName,
        sourceJointIndex: EXPECTED_LEFT.jointIndex,
        sourcePoint: EXPECTED_LEFT.sourcePoint,
        normalizedImageCoordinate: Object.freeze({
          x: left.direct.normalizedX,
          y: left.direct.normalizedY,
        }),
      }),
      anatomicalRightEye: Object.freeze({
        sourceJoint: EXPECTED_RIGHT.jointName,
        sourceJointIndex: EXPECTED_RIGHT.jointIndex,
        sourcePoint: EXPECTED_RIGHT.sourcePoint,
        normalizedImageCoordinate: Object.freeze({
          x: right.direct.normalizedX,
          y: right.direct.normalizedY,
        }),
      }),
      sameCameraMatrixAsRenderedFixture: true,
      directVsMatrixProjectionMaximumError: Math.max(
        left.error,
        right.error,
      ),
      providerLandmarkDerived: false,
      providerLabelDerived: false,
      imageSpaceXSignDefinesAnatomicalSide: false,
      gnmAxisOrderingDefinesAnatomicalSide: false,
    }),
    deterministicRender: Object.freeze({
      repeatRenderByteEqual: true,
      repeatRenderSha256Equal: true,
      renderSha256: firstSha,
      expectedRenderSha256: EXPECTED_RENDER_SHA256,
      renderedFixtureDigestPinned: EXPECTED_RENDER_SHA256 !== null,
      renderedBytesPersistedByVerifier: writeRenderPath !== null,
      renderedImageRepositoryPersisted: false,
    }),
    execution: Object.freeze({
      geometryPreparationExecuted: true,
      renderExecuted: true,
      providerExecuted: false,
      providerResultObserved: false,
      renderDigestAdmitted: EXPECTED_RENDER_SHA256 !== null,
    }),
    privacy: Object.freeze({
      userImageConsumed: false,
      cameraAccessed: false,
      rawProviderLandmarksReturned: false,
      rawProviderLandmarksPersisted: false,
      transformedRasterPersisted: false,
      biometricEmbeddingProduced: false,
      identityTemplateProduced: false,
    }),
    authority: Object.freeze({
      gnmCrossSourceSemanticWitnessAudited: true,
      gnmCrossSourceFixtureDigestPinned: EXPECTED_RENDER_SHA256 !== null,
      gnmCrossSourceGeometricValidationExecuted: false,
      gnmCrossSourceGeometricMappingValidated: false,
      providerLabelMappedToAnatomicalSide: false,
      globalProviderAnatomicalSemanticsEstablished: false,
      anatomicalReferenceAdmitted: false,
      anatomicalLateralityAuthorized: false,
      validatedExternalEarObservationAuthorized: false,
      traditionalBindingAuthorized: false,
      productionAuthorization: false,
    }),
  });

  process.stdout.write(JSON.stringify(summary) + '\n');
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
} else {
  run();
}
