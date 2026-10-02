import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import process from 'node:process';

const WIDTH = 1024;
const HEIGHT = 1024;
const MATERIAL = Object.freeze([198, 151, 127]);
const BACKGROUND = Object.freeze([32, 32, 32]);
const AMBIENT = 0.35;
const DIFFUSE = 0.65;
const EXPECTED_ASSET_BLOB = 'ae49903ad7d50ce1d64e464a0407441f2781873c';
const EXPECTED_ASSET_BYTES = 53305389;
const EXPECTED_LEFT = Object.freeze([
  0.030839037150144577,
  0.30316492915153503,
  0.09888789802789688,
]);
const EXPECTED_RIGHT = Object.freeze([
  -0.030866222456097603,
  0.3031134307384491,
  0.09897840023040771,
]);

function fail(code, message) {
  throw new Error('FR104 U5B-B render [' + code + ']: ' + message);
}

function arg(name) {
  const prefix = '--' + name + '=';
  const found = process.argv.find((value) => value.startsWith(prefix));
  return found === undefined ? null : found.slice(prefix.length);
}

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function loadMetadata(path) {
  const value = JSON.parse(readFileSync(path, 'utf8'));
  if (value.schemaVersion !== 'fr104-u5b-gnm-render-staging-v1') {
    fail('STAGING_DRIFT', 'schemaVersion');
  }
  if (
    value.asset?.gitBlobSha !== EXPECTED_ASSET_BLOB
    || value.asset?.byteLength !== EXPECTED_ASSET_BYTES
    || value.asset?.variantNormalized !== 'head'
  ) {
    fail('SOURCE_DRIFT', 'pinned asset provenance mismatch');
  }
  if (
    JSON.stringify(value.semanticGroundTruth?.leftEye?.sourcePoint)
      !== JSON.stringify(EXPECTED_LEFT)
    || JSON.stringify(value.semanticGroundTruth?.rightEye?.sourcePoint)
      !== JSON.stringify(EXPECTED_RIGHT)
    || value.semanticGroundTruth?.leftEye?.jointName !== 'left_eye'
    || value.semanticGroundTruth?.rightEye?.jointName !== 'right_eye'
    || value.semanticGroundTruth?.leftEye?.jointIndex !== 2
    || value.semanticGroundTruth?.rightEye?.jointIndex !== 3
  ) {
    fail('SEMANTIC_ANCHOR_DRIFT', 'U5A semantic anchor mismatch');
  }
  if (
    value.execution?.providerExecuted !== false
    || value.execution?.providerPackageImported !== false
    || value.execution?.userImageConsumed !== false
  ) {
    fail('AUTHORITY_BOUNDARY_DRIFT', 'staging execution boundary');
  }
  return value;
}

function loadVertices(path, metadata) {
  const bytes = readFileSync(path);
  if (sha256(bytes) !== metadata.geometry.verticesSha256) {
    fail('STAGING_DRIFT', 'vertex binary digest');
  }
  const count = metadata.geometry.vertexCount;
  if (!Number.isInteger(count) || count <= 0 || bytes.length !== count * 3 * 8) {
    fail('GEOMETRY_INVALID', 'vertex byte length/count mismatch');
  }
  const vertices = new Array(count);
  for (let i = 0; i < count; i += 1) {
    const offset = i * 24;
    const point = [
      bytes.readDoubleLE(offset),
      bytes.readDoubleLE(offset + 8),
      bytes.readDoubleLE(offset + 16),
    ];
    if (!point.every(Number.isFinite)) {
      fail('GEOMETRY_INVALID', 'non-finite vertex ' + i);
    }
    vertices[i] = Object.freeze(point);
  }
  return Object.freeze(vertices);
}

function loadTriangles(path, metadata, vertexCount) {
  const bytes = readFileSync(path);
  if (sha256(bytes) !== metadata.geometry.trianglesSha256) {
    fail('STAGING_DRIFT', 'triangle binary digest');
  }
  const count = metadata.geometry.triangleCount;
  if (!Number.isInteger(count) || count <= 0 || bytes.length !== count * 3 * 4) {
    fail('GEOMETRY_INVALID', 'triangle byte length/count mismatch');
  }
  const triangles = new Array(count);
  for (let i = 0; i < count; i += 1) {
    const offset = i * 12;
    const triangle = [
      bytes.readInt32LE(offset),
      bytes.readInt32LE(offset + 4),
      bytes.readInt32LE(offset + 8),
    ];
    if (!triangle.every((index) =>
      Number.isInteger(index) && index >= 0 && index < vertexCount)) {
      fail('GEOMETRY_INVALID', 'triangle index out of range ' + i);
    }
    triangles[i] = Object.freeze(triangle);
  }
  return Object.freeze(triangles);
}

function bounds(vertices) {
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (const point of vertices) {
    for (let axis = 0; axis < 3; axis += 1) {
      if (point[axis] < min[axis]) min[axis] = point[axis];
      if (point[axis] > max[axis]) max[axis] = point[axis];
    }
  }
  const span = max.map((value, axis) => value - min[axis]);
  if (
    !min.every(Number.isFinite)
    || !max.every(Number.isFinite)
    || !(span[0] > 0)
    || !(span[1] > 0)
    || !(span[2] > 0)
  ) {
    fail('FRAMING_UNRESOLVED', 'degenerate full-template bounds');
  }
  return Object.freeze({
    min:Object.freeze(min),
    max:Object.freeze(max),
    span:Object.freeze(span),
    center:Object.freeze(max.map((value, axis) => (value + min[axis]) / 2)),
  });
}

function buildCamera(box) {
  const span = Math.max(box.span[1] * 1.24, box.span[0] * 1.34);
  if (!(span > 0) || !Number.isFinite(span)) {
    fail('FRAMING_UNRESOLVED', 'orthographic span');
  }
  return Object.freeze({
    center:box.center,
    span,
    halfSpan:span / 2,
    screenRightAxis:Object.freeze([1, 0, 0]),
    screenUpAxis:Object.freeze([0, 1, 0]),
    cameraLookDirection:Object.freeze([0, 0, -1]),
  });
}

function project(point, camera) {
  const x = 0.5 + (point[0] - camera.center[0]) / camera.span;
  const y = 0.5 - (point[1] - camera.center[1]) / camera.span;
  const depth = point[2] - camera.center[2];
  return Object.freeze({normalizedX:x, normalizedY:y, depth});
}

function viewMatrix(camera) {
  const [cx, cy, cz] = camera.center;
  return Object.freeze([
    1,0,0,-cx,
    0,1,0,-cy,
    0,0,-1,cz,
    0,0,0,1,
  ]);
}

function projectionMatrix(camera, box) {
  const depthSpan = box.span[2];
  return Object.freeze([
    2 / camera.span,0,0,0,
    0,2 / camera.span,0,0,
    0,0,2 / depthSpan,0,
    0,0,0,1,
  ]);
}

function multiply4(matrix, vector) {
  return [
    matrix[0]*vector[0] + matrix[1]*vector[1] + matrix[2]*vector[2] + matrix[3]*vector[3],
    matrix[4]*vector[0] + matrix[5]*vector[1] + matrix[6]*vector[2] + matrix[7]*vector[3],
    matrix[8]*vector[0] + matrix[9]*vector[1] + matrix[10]*vector[2] + matrix[11]*vector[3],
    matrix[12]*vector[0] + matrix[13]*vector[1] + matrix[14]*vector[2] + matrix[15]*vector[3],
  ];
}

function projectViaMatrices(point, view, projection) {
  const camera = multiply4(view, [point[0], point[1], point[2], 1]);
  const clip = multiply4(projection, camera);
  if (!Number.isFinite(clip[3]) || clip[3] === 0) {
    fail('PROJECTION_UNRESOLVED', 'matrix w');
  }
  return Object.freeze({
    normalizedX:(clip[0] / clip[3] + 1) / 2,
    normalizedY:(1 - clip[1] / clip[3]) / 2,
  });
}

function assertProjected(label, point, camera, view, projection) {
  const direct = project(point, camera);
  const matrix = projectViaMatrices(point, view, projection);
  const error = Math.hypot(
    direct.normalizedX - matrix.normalizedX,
    direct.normalizedY - matrix.normalizedY,
  );
  if (
    !Number.isFinite(direct.normalizedX)
    || !Number.isFinite(direct.normalizedY)
    || direct.normalizedX < 0
    || direct.normalizedX > 1
    || direct.normalizedY < 0
    || direct.normalizedY > 1
  ) {
    fail('PROJECTION_OUT_OF_BOUNDS', label);
  }
  if (!Number.isFinite(error) || error > 1e-12) {
    fail('PROJECTION_MISMATCH', label + ' error=' + error);
  }
  return Object.freeze({direct, matrix, error});
}

function edge(ax, ay, bx, by, px, py) {
  return (px - ax) * (by - ay) - (py - ay) * (bx - ax);
}

function shade(triangle) {
  const [a,b,c] = triangle;
  const ux=b[0]-a[0], uy=b[1]-a[1], uz=b[2]-a[2];
  const vx=c[0]-a[0], vy=c[1]-a[1], vz=c[2]-a[2];
  const nx=uy*vz-uz*vy, ny=uz*vx-ux*vz, nz=ux*vy-uy*vx;
  const length=Math.hypot(nx,ny,nz);
  if (!(length > 0) || !Number.isFinite(length)) return null;
  const intensity = AMBIENT + DIFFUSE * Math.abs(nz / length);
  return MATERIAL.map((channel) =>
    Math.max(0, Math.min(255, Math.round(channel * intensity))));
}

function render(vertices, triangles, camera) {
  const pixels=Buffer.alloc(WIDTH*HEIGHT*3);
  for(let i=0;i<WIDTH*HEIGHT;i+=1){
    const o=i*3;
    pixels[o]=BACKGROUND[0];
    pixels[o+1]=BACKGROUND[1];
    pixels[o+2]=BACKGROUND[2];
  }
  const z=new Float64Array(WIDTH*HEIGHT);
  z.fill(Number.NEGATIVE_INFINITY);
  let rasterizedTriangles=0;

  for(const indices of triangles){
    const world=[vertices[indices[0]],vertices[indices[1]],vertices[indices[2]]];
    const color=shade(world);
    if(color===null) continue;
    const p=world.map((point)=>project(point,camera));
    const xy=p.map((point)=>[
      point.normalizedX*(WIDTH-1),
      point.normalizedY*(HEIGHT-1),
    ]);
    const minXf=Math.min(xy[0][0],xy[1][0],xy[2][0]);
    const maxXf=Math.max(xy[0][0],xy[1][0],xy[2][0]);
    const minYf=Math.min(xy[0][1],xy[1][1],xy[2][1]);
    const maxYf=Math.max(xy[0][1],xy[1][1],xy[2][1]);
    if(maxXf<0||minXf>WIDTH-1||maxYf<0||minYf>HEIGHT-1) continue;
    const area=edge(xy[0][0],xy[0][1],xy[1][0],xy[1][1],xy[2][0],xy[2][1]);
    if(!Number.isFinite(area)||Math.abs(area)<1e-12) continue;
    const minX=Math.max(0,Math.floor(minXf));
    const maxX=Math.min(WIDTH-1,Math.ceil(maxXf));
    const minY=Math.max(0,Math.floor(minYf));
    const maxY=Math.min(HEIGHT-1,Math.ceil(maxYf));
    rasterizedTriangles+=1;
    for(let y=minY;y<=maxY;y+=1){
      const py=y+0.5;
      for(let x=minX;x<=maxX;x+=1){
        const px=x+0.5;
        const w0=edge(xy[1][0],xy[1][1],xy[2][0],xy[2][1],px,py)/area;
        const w1=edge(xy[2][0],xy[2][1],xy[0][0],xy[0][1],px,py)/area;
        const w2=edge(xy[0][0],xy[0][1],xy[1][0],xy[1][1],px,py)/area;
        if(w0<-1e-12||w1<-1e-12||w2<-1e-12) continue;
        const depth=w0*p[0].depth+w1*p[1].depth+w2*p[2].depth;
        const pixel=y*WIDTH+x;
        if(depth<=z[pixel]) continue;
        z[pixel]=depth;
        const o=pixel*3;
        pixels[o]=color[0]; pixels[o+1]=color[1]; pixels[o+2]=color[2];
      }
    }
  }

  let foregroundPixels=0;
  for(let i=0;i<WIDTH*HEIGHT;i+=1){
    const o=i*3;
    if(
      pixels[o]!==BACKGROUND[0]
      || pixels[o+1]!==BACKGROUND[1]
      || pixels[o+2]!==BACKGROUND[2]
    ) foregroundPixels+=1;
  }
  if(rasterizedTriangles===0||foregroundPixels===0){
    fail('RASTERIZATION_FAILED','empty render');
  }
  return Object.freeze({
    png:encodePngRgb(WIDTH,HEIGHT,pixels),
    rasterizedTriangles,
    foregroundPixels,
  });
}

let crcTable;
function crc32(bytes){
  if(crcTable===undefined){
    crcTable=new Uint32Array(256);
    for(let n=0;n<256;n+=1){
      let c=n;
      for(let k=0;k<8;k+=1)c=(c&1)!==0?0xedb88320^(c>>>1):c>>>1;
      crcTable[n]=c>>>0;
    }
  }
  let c=0xffffffff;
  for(const byte of bytes)c=crcTable[(c^byte)&0xff]^(c>>>8);
  return (c^0xffffffff)>>>0;
}
function adler32(bytes){
  let a=1,b=0;
  for(const byte of bytes){a=(a+byte)%65521;b=(b+a)%65521;}
  return ((b<<16)|a)>>>0;
}
function chunk(type,data){
  const t=Buffer.from(type,'ascii');
  const length=Buffer.alloc(4); length.writeUInt32BE(data.length,0);
  const crc=Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t,data])),0);
  return Buffer.concat([length,t,data,crc]);
}
function storedZlib(bytes){
  const parts=[Buffer.from([0x78,0x01])];
  let offset=0;
  while(offset<bytes.length){
    const length=Math.min(65535,bytes.length-offset);
    const final=offset+length===bytes.length;
    const header=Buffer.alloc(5);
    header[0]=final?1:0;
    header.writeUInt16LE(length,1);
    header.writeUInt16LE((~length)&0xffff,3);
    parts.push(header,bytes.subarray(offset,offset+length));
    offset+=length;
  }
  const checksum=Buffer.alloc(4); checksum.writeUInt32BE(adler32(bytes),0);
  parts.push(checksum);
  return Buffer.concat(parts);
}
function encodePngRgb(width,height,pixels){
  const raw=Buffer.alloc(height*(1+width*3));
  for(let y=0;y<height;y+=1){
    const row=y*(1+width*3);
    raw[row]=0;
    pixels.copy(raw,row+1,y*width*3,(y+1)*width*3);
  }
  const ihdr=Buffer.alloc(13);
  ihdr.writeUInt32BE(width,0); ihdr.writeUInt32BE(height,4);
  ihdr[8]=8; ihdr[9]=2;
  return Buffer.concat([
    Buffer.from([137,80,78,71,13,10,26,10]),
    chunk('IHDR',ihdr),
    chunk('IDAT',storedZlib(raw)),
    chunk('IEND',Buffer.alloc(0)),
  ]);
}

function canonicalJson(value){
  if(value===null||typeof value!=='object') return JSON.stringify(value);
  if(Array.isArray(value)) return '['+value.map(canonicalJson).join(',')+']';
  return '{'+Object.keys(value).sort().map((key)=>
    JSON.stringify(key)+':'+canonicalJson(value[key])).join(',')+'}';
}

function runSelfTest(){
  const box=bounds([
    [-1,-2,-0.5],[1,2,0.5],[0,0,0],
  ]);
  const camera=buildCamera(box);
  if(camera.span!==4.96) fail('SELF_TEST_FAILED','camera span');
  const view=viewMatrix(camera);
  const projection=projectionMatrix(camera,box);
  assertProjected('synthetic',[0.25,0.5,0],camera,view,projection);
  const renderA=render(
    [[-0.5,-0.5,0],[0.5,-0.5,0],[0,0.5,0]],
    [[0,1,2]],
    buildCamera(bounds([[-1,-1,-1],[1,1,1]])),
  );
  const renderB=render(
    [[-0.5,-0.5,0],[0.5,-0.5,0],[0,0.5,0]],
    [[0,1,2]],
    buildCamera(bounds([[-1,-1,-1],[1,1,1]])),
  );
  if(!renderA.png.equals(renderB.png)||sha256(renderA.png)!==sha256(renderB.png)){
    fail('SELF_TEST_FAILED','deterministic PNG');
  }
  process.stdout.write(JSON.stringify({
    schemaVersion:'fr104-u5b-render-self-test-v1',
    deterministicPng:true,
    boundsCamera:true,
    directVsMatrixProjection:true,
    providerExecutionRequired:false,
  })+'\n');
}

if(process.argv.includes('--self-test')){
  runSelfTest();
} else {
  const metadataPath=arg('metadata');
  const verticesPath=arg('vertices');
  const trianglesPath=arg('triangles');
  const renderOut=arg('write-render');
  const resultOut=arg('write-result');
  const expectedRenderSha=arg('expected-render-sha256');
  if(!metadataPath||!verticesPath||!trianglesPath||!resultOut){
    fail('INVALID_ARGUMENTS','metadata, vertices, triangles, and write-result are required');
  }

  const metadata=loadMetadata(metadataPath);
  const vertices=loadVertices(verticesPath,metadata);
  const triangles=loadTriangles(trianglesPath,metadata,vertices.length);
  const box=bounds(vertices);
  const camera=buildCamera(box);
  const view=viewMatrix(camera);
  const projection=projectionMatrix(camera,box);
  const left=assertProjected('left_eye',EXPECTED_LEFT,camera,view,projection);
  const right=assertProjected('right_eye',EXPECTED_RIGHT,camera,view,projection);
  const first=render(vertices,triangles,camera);
  const second=render(vertices,triangles,camera);
  const renderSha=sha256(first.png);
  if(!first.png.equals(second.png)||renderSha!==sha256(second.png)){
    fail('NON_DETERMINISTIC_RENDER','repeat render mismatch');
  }
  if(expectedRenderSha!==null&&renderSha!==expectedRenderSha){
    fail('RENDER_DIGEST_DRIFT','expected='+expectedRenderSha+' observed='+renderSha);
  }
  if(renderOut!==null) writeFileSync(renderOut,first.png);

  const result={
    schemaVersion:'fr104-u5b-gnm-render-only-result-v1',
    authorityState:'render_only_candidate_not_admitted',
    studyKind:'cross_source_family_deterministic_gnm_fixture_render_only',
    sourceAsset:metadata.asset,
    staging:{
      vertexCount:metadata.geometry.vertexCount,
      triangleCount:metadata.geometry.triangleCount,
      verticesSha256:metadata.geometry.verticesSha256,
      trianglesSha256:metadata.geometry.trianglesSha256,
    },
    renderer:{
      implementation:'fr104_bounded_cpu_triangle_rasterizer_v2_gnm_template',
      outputFormat:'PNG',
      pngColorType:'rgb8',
      width:WIDTH,
      height:HEIGHT,
      materialRgb:MATERIAL,
      backgroundRgb:BACKGROUND,
      lighting:{
        model:'symmetric_camera_frontal_flat_lambert',
        ambient:AMBIENT,
        diffuse:DIFFUSE,
        facingTerm:'abs(dot(triangle_normal,camera_axis))',
      },
      postRenderTransform:{
        cropApplied:false,
        resizeApplied:false,
        rotationDegrees:0,
        horizontalMirrorApplied:false,
        exifMetadataPresent:false,
      },
    },
    camera:{
      projectionModel:'orthographic',
      centerRule:'full_gnm_template_xyz_bounds_midpoint',
      bounds:box,
      spanRule:'max(full_template_span_y_times_1_24,full_template_span_x_times_1_34)',
      span:camera.span,
      screenRightAxis:'+X',
      screenUpAxis:'+Y',
      cameraLookDirection:'-Z',
      viewMatrix:view,
      projectionMatrix:projection,
    },
    anatomicalGroundTruth:{
      anatomicalLeftEye:{
        sourceJoint:'left_eye',
        sourceJointIndex:2,
        sourcePoint:EXPECTED_LEFT,
        normalizedImageCoordinate:{
          x:left.direct.normalizedX,
          y:left.direct.normalizedY,
        },
      },
      anatomicalRightEye:{
        sourceJoint:'right_eye',
        sourceJointIndex:3,
        sourcePoint:EXPECTED_RIGHT,
        normalizedImageCoordinate:{
          x:right.direct.normalizedX,
          y:right.direct.normalizedY,
        },
      },
      sameCameraMatrixAsRenderedFixture:true,
      directVsMatrixProjectionMaximumError:Math.max(left.error,right.error),
      providerLandmarkDerived:false,
      providerLabelDerived:false,
      imageSpaceXSignDefinesAnatomicalSide:false,
      gnmAxisOrderingDefinesAnatomicalSide:false,
    },
    deterministicRender:{
      repeatRenderByteEqual:true,
      repeatRenderSha256Equal:true,
      renderSha256:renderSha,
      expectedRenderSha256:expectedRenderSha,
      renderDigestPinned:expectedRenderSha!==null,
      rasterizedTriangleCount:first.rasterizedTriangles,
      foregroundPixelCount:first.foregroundPixels,
      renderedImageRepositoryPersisted:false,
    },
    execution:{
      renderExecuted:true,
      providerExecuted:false,
      providerPackageImported:false,
      providerResultObserved:false,
      userImageConsumed:false,
    },
    privacy:{
      userImageConsumed:false,
      cameraAccessed:false,
      rawProviderLandmarksReturned:false,
      rawProviderLandmarksPersisted:false,
      transformedRasterPersisted:false,
      biometricEmbeddingProduced:false,
      identityTemplateProduced:false,
    },
    authority:{
      gnmCrossSourceSemanticWitnessAudited:true,
      gnmCrossSourceFixtureDigestPinned:false,
      gnmCrossSourceGeometricValidationExecuted:false,
      gnmCrossSourceGeometricMappingValidated:false,
      providerLabelMappedToAnatomicalSide:false,
      globalProviderAnatomicalSemanticsEstablished:false,
      anatomicalReferenceAdmitted:false,
      anatomicalLateralityAuthorized:false,
      validatedExternalEarObservationAuthorized:false,
      traditionalBindingAuthorized:false,
      productionAuthorization:false,
    },
  };
  const serialized=canonicalJson(result);
  const resultSha=sha256(Buffer.from(serialized,'utf8'));
  writeFileSync(resultOut,serialized+'\n','utf8');
  process.stdout.write('FR104_U5B_RENDER_SHA256 '+renderSha+'\n');
  process.stdout.write('FR104_U5B_RENDER_RESULT_SHA256 '+resultSha+'\n');
  process.stdout.write('FR104_U5B_LEFT_PROJECTED '+JSON.stringify(result.anatomicalGroundTruth.anatomicalLeftEye.normalizedImageCoordinate)+'\n');
  process.stdout.write('FR104_U5B_RIGHT_PROJECTED '+JSON.stringify(result.anatomicalGroundTruth.anatomicalRightEye.normalizedImageCoordinate)+'\n');
  process.stdout.write('FR104_U5B_RENDER_RESULT '+serialized+'\n');
}
