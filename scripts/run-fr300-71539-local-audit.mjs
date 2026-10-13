#!/usr/bin/env node
/**
 * FR312G16 authorized-local-only AI-Hub 71539 first-pair preflight.
 *
 * Does not request/download/share data. Never issues rights, metric scale,
 * camera calibration, source pairing, FR299 GT or FR312G repeatability.
 * Repository output is deliberately forbidden; private output is gitignored.
 */
import { createHash } from 'node:crypto';
import { Buffer } from 'node:buffer';
import console from 'node:console';
import { createReadStream } from 'node:fs';
import { readFile, writeFile, mkdir, lstat, realpath, mkdtemp, rm } from 'node:fs/promises';
import { createInterface } from 'node:readline';
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import process from 'node:process';

const INPUT_SCHEMA = 'fr312g16-aihub71539-local-audit-input-v1';
const RECEIPT_SCHEMA = 'fr312g16-aihub71539-private-preflight-receipt-v1';
const maxSize = { rgb: 256 * 1024 * 1024, obj: 512 * 1024 * 1024,
  label: 8 * 1024 * 1024, camera: 1 * 1024 * 1024 };
const extensions = {
  rgb: ['.jpg', '.jpeg', '.png'], obj: ['.obj'], label: ['.json'], camera: ['.txt']
};
const sha = (bytes) => 'sha256:' + createHash('sha256').update(bytes).digest('hex');
const guard = (valid, code) => { if (!valid) throw new Error(code); };
const object = (x) => x !== null && typeof x === 'object' && !Array.isArray(x);

function isInside(child, parent) {
  const rel = relative(parent, child);
  return rel === '' || (rel !== '..' && !rel.startsWith('..' + sep) && !isAbsolute(rel));
}
function validatePrivatePath(file) {
  const full = resolve(file);
  const root = resolve(process.cwd());
  if (isInside(full, root)) {
    guard(isInside(full, join(root, '.cache', 'face-reading')),
      'PRIVATE_INPUT_IN_REPOSITORY');
  }
  return full;
}
function localBasename(name, type) {
  guard(typeof name === 'string' && name.length <= 180 &&
    /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/u.test(name) && !name.includes('..') &&
    extensions[type].some((ext) => name.toLowerCase().endsWith(ext)),
  'INVALID_PRIVATE_ASSET_NAME');
  return name;
}
async function checkedFile(path, maxBytes) {
  const stat = await lstat(path);
  guard(stat.isFile() && !stat.isSymbolicLink(), 'PRIVATE_ASSET_NOT_REGULAR_FILE');
  guard(stat.size > 0 && stat.size <= maxBytes, 'PRIVATE_ASSET_SIZE_INVALID');
  return stat.size;
}
async function boundedRead(path, maxBytes) {
  await checkedFile(path, maxBytes);
  const bytes = await readFile(path);
  guard(bytes.length <= maxBytes, 'PRIVATE_ASSET_SIZE_INVALID');
  return bytes;
}
async function digestFile(path, maxBytes) {
  await checkedFile(path, maxBytes);
  const hash = createHash('sha256');
  for await (const part of createReadStream(path)) hash.update(part);
  return 'sha256:' + hash.digest('hex');
}
function inspectLabel(bytes) {
  let json;
  try { json = JSON.parse(bytes.toString('utf8')); }
  catch { throw new Error('LABEL_NOT_JSON'); }
  guard(object(json) && object(json.category) &&
    json.category.type === 'Face' && json.category.type_id === 2,
    'LABEL_FACE_CATEGORY_INVALID');
  const a = json.annotation;
  guard(object(a) && a.num_landmarks === 68, 'LABEL_68_DECLARATION_INVALID');
  guard(typeof a.id === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,127}$/u.test(a.id) ||
    typeof a.id === 'number' && Number.isSafeInteger(a.id) && a.id >= 0,
    'LABEL_ANNOTATION_ID_INVALID');
  guard(Array.isArray(json.landmarks) && json.landmarks.length === 68,
    'LABEL_68_LANDMARK_LIST_INVALID');
  const seen = new Set();
  for (const p of json.landmarks) {
    guard(object(p) && Number.isSafeInteger(p.id) && p.id >= 0 && p.id < 68 &&
      !seen.has(p.id), 'LABEL_ID_OR_DUPLICATE_INVALID');
    seen.add(p.id);
    guard(['x', 'y', 'z'].every(axis => typeof p[axis] === 'number' &&
      Number.isFinite(p[axis])), 'LABEL_COORDINATE_INVALID');
  }
  guard(seen.size === 68, 'LABEL_ID_OR_DUPLICATE_INVALID');
  return true;
}
function inspectImage(bytes, name) {
  const png = bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  const jpeg = bytes.length >= 3 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  const ext = name.toLowerCase();
  guard((png && ext.endsWith('.png')) ||
    (jpeg && (ext.endsWith('.jpg') || ext.endsWith('.jpeg'))),
    'RGB_HEADER_EXTENSION_MISMATCH');
  if (png) {
    guard(bytes.length >= 24 &&
      bytes.subarray(12, 16).toString('ascii') === 'IHDR' &&
      bytes.readUInt32BE(16) > 0 && bytes.readUInt32BE(20) > 0,
      'PNG_HEADER_INVALID');
  }
  return png ? 'png' : 'jpeg';
}
async function inspectObj(path) {
  let vertices = 0;
  let faces = 0;
  const interfaceLines = createInterface({ input: createReadStream(path), crlfDelay: Infinity });
  try {
    for await (const line of interfaceLines) {
      guard(line.length < 1024 * 1024, 'OBJ_LINE_TOO_LONG');
      const trimmed = line.trim();
      if (trimmed.startsWith('v ')) {
        const c = trimmed.split(/\s+/u);
        guard(c.length >= 4 && c.slice(1, 4).every(v => v !== '' &&
          Number.isFinite(Number(v))), 'OBJ_VERTEX_INVALID');
        vertices += 1;
      } else if (trimmed.startsWith('f ')) {
        const parts = trimmed.split(/\s+/u).slice(1);
        guard(parts.length >= 3 && vertices >= 3, 'OBJ_FACE_INVALID');
        for (const part of parts) {
          const first = part.split('/')[0];
          const n = Number(first);
          guard(first !== '' && Number.isSafeInteger(n) && n > 0 && n <= vertices,
            'OBJ_FACE_INDEX_INVALID');
        }
        faces += 1;
      }
    }
  } finally {
    interfaceLines.close();
  }
  guard(vertices > 0 && faces > 0, 'OBJ_MESH_EMPTY');
  return { vertices, faces };
}

export async function auditLocal71539(manifestPath) {
  const input = validatePrivatePath(manifestPath);
  await checkedFile(input, 64 * 1024);
  const inputDir = await realpath(dirname(input));
  const manifestBytes = await boundedRead(input, 64 * 1024);
  const manifest = JSON.parse(manifestBytes.toString('utf8'));
  guard(object(manifest) && manifest.schemaVersion === INPUT_SCHEMA &&
    manifest.datasetRef === 'aihub:71539:release-1.1',
    'MANIFEST_SCHEMA_INVALID');
  guard(object(manifest.authorization) &&
    manifest.authorization.localUseReviewedByOperator === true &&
    manifest.authorization.independentBenchmarkApprovalRecorded === true &&
    typeof manifest.authorization.privateEvidenceRef === 'string' &&
    /^private:[a-zA-Z0-9_.:/-]{3,200}$/u.test(manifest.authorization.privateEvidenceRef),
    'AUTHORIZATION_REVIEW_REQUIRED');
  guard(object(manifest.assets), 'ASSETS_REQUIRED');
  const paths = {};
  for (const type of ['rgb', 'obj', 'label', 'camera']) {
    const name = localBasename(manifest.assets[type], type);
    const path = join(inputDir, name);
    const actual = await realpath(path);
    guard(isInside(actual, inputDir) && actual === path, 'ASSET_PATH_ESCAPE');
    await checkedFile(actual, maxSize[type]);
    paths[type] = actual;
  }
  guard(new Set(Object.values(paths)).size === 4, 'DUPLICATED_ASSET');
  const [label, image, camera] = await Promise.all([
    boundedRead(paths.label, maxSize.label),
    boundedRead(paths.rgb, maxSize.rgb),
    boundedRead(paths.camera, maxSize.camera)
  ]);
  inspectLabel(label);
  const imageFormat = inspectImage(image, basename(paths.rgb));
  guard(camera.some(b => b !== 0 && b !== 9 && b !== 10 && b !== 13 && b !== 32),
    'CAMERA_FILE_EMPTY');
  const mesh = await inspectObj(paths.obj);
  const digests = {
    rgb: sha(image), obj: await digestFile(paths.obj, maxSize.obj),
    label: sha(label), camera: sha(camera)
  };

  return {
    schemaVersion: RECEIPT_SCHEMA,
    datasetRef: 'aihub:71539:release-1.1',
    localAssetByteInspectionCompleted: true,
    rightsEvidenceStatus: 'operator_claim_only_not_independently_verified',
    labelPublished68PointShapePassed: true,
    imageHeaderFormat: imageFormat,
    meshVertexCount: mesh.vertices,
    meshFaceCount: mesh.faces,
    privateSourceSha256: digests,
    cameraFileBytesPresent: true,
    authority: {
      commercialBenchmarkRightsVerified: false,
      canonicalPhysicalUnitVerified: false,
      calibratedCameraIntrinsicsExtrinsicsVerified: false,
      rgbObjSameCaptureVerified: false,
      independent3DReferenceValidated: false,
      registrationFrozenBeforeScoring: false,
      fr299ReferenceMaterialized: false,
      fr300RealPilotAdmitted: false,
      fr312gTwoSessionTwoCaptureProven: false,
      productActivationAllowed: false
    }
  };
}

function publicSummary(receipt) {
  return {
    schemaVersion: 'fr312g16-aihub71539-repo-safe-summary-v1',
    status: 'local_structure_checked_but_reference_not_admitted',
    localAssetByteInspectionCompleted: receipt.localAssetByteInspectionCompleted,
    labelPublished68PointShapePassed: receipt.labelPublished68PointShapePassed,
    cameraFileBytesPresent: receipt.cameraFileBytesPresent,
    evidenceClaimsAreOperatorSuppliedNotIndependentlyVerified: true,
    independentReferenceBlocked: true,
    rightsOrMetricAuthorityIssued: false,
    rawDataOrSourceDigestsIncluded: false
  };
}
async function selfCheck() {
  const dir = await mkdtemp(join(tmpdir(), 'fr312g16-'));
  try {
    const input = {
      schemaVersion: INPUT_SCHEMA, datasetRef: 'aihub:71539:release-1.1',
      authorization: { localUseReviewedByOperator: true,
        independentBenchmarkApprovalRecorded: true,
        privateEvidenceRef: 'private:fixture-only-not-real-approval' },
      assets: { rgb: 'fixture.png', obj: 'fixture.obj',
        label: 'fixture.json', camera: 'fixture.txt' }
    };
    const png = Buffer.alloc(24);
    Buffer.from([137,80,78,71,13,10,26,10]).copy(png);
    png.write('IHDR', 12, 'ascii'); png.writeUInt32BE(1,16);png.writeUInt32BE(1,20);
    await writeFile(join(dir, 'fixture.png'), png);
    await writeFile(join(dir, 'fixture.obj'),
      'v 0 0 0\nv 1 0 0\nv 0 1 0\nf 1 2 3\n');
    await writeFile(join(dir, 'fixture.txt'), 'synthetic-camera-not-calibration');
    await writeFile(join(dir, 'fixture.json'), JSON.stringify({
      category: {type:'Face',type_id:2},annotation:{id:'synthetic',num_landmarks:68},
      landmarks:Array.from({length:68}, (_,id)=>({id,x:id,y:0,z:0}))
    }));
    const manifestPath = join(dir,'private.json');
    await writeFile(manifestPath, JSON.stringify(input));
    const passed = await auditLocal71539(manifestPath);
    guard(passed.meshVertexCount === 3 && passed.meshFaceCount === 1 &&
      passed.authority.fr300RealPilotAdmitted === false,
      'SELF_CHECK_POSITIVE_FAILED');
    const withoutApproval = {...input, authorization:{...input.authorization,
      independentBenchmarkApprovalRecorded:false}};
    await writeFile(manifestPath, JSON.stringify(withoutApproval));
    let blocked=false;
    try {await auditLocal71539(manifestPath);}
    catch(e){blocked=e.message === 'AUTHORIZATION_REVIEW_REQUIRED';}
    guard(blocked,'SELF_CHECK_AUTHORIZATION_FAIL_OPEN');
    await writeFile(manifestPath, JSON.stringify(input));
    const broken = JSON.parse(await readFile(join(dir,'fixture.json'),'utf8'));
    broken.landmarks[67].id = 0;
    await writeFile(join(dir,'fixture.json'),JSON.stringify(broken));
    blocked=false;
    try {await auditLocal71539(manifestPath);}
    catch(e){blocked=e.message === 'LABEL_ID_OR_DUPLICATE_INVALID';}
    guard(blocked,'SELF_CHECK_LABEL_FAIL_OPEN');
    return {status:'synthetic_self_check_pass',actualSourceInspected:false};
  } finally {await rm(dir,{recursive:true,force:true});}
}
async function main() {
  const args=process.argv.slice(2);
  if (args.length===1 && args[0]==='--self-check') {
    console.log(JSON.stringify(await selfCheck()));return;
  }
  if(args.length===1 && args[0]==='--help'){
    console.log('Usage: node scripts/run-fr300-71539-local-audit.mjs --input <private.json>');
    console.log('Private manifest may be outside repository or within .cache/face-reading/.');
    console.log('Files must reside together as basenames. No network, no raw or biometric output.');
    return;
  }
  guard(args.length===2 && args[0]==='--input','USAGE_INVALID');
  const privateReceipt=await auditLocal71539(args[1]);
  const dir=join('.cache','face-reading','fr312g16');
  await mkdir(dir,{recursive:true});
  await writeFile(join(dir,'private-preflight-receipt.json'),
    JSON.stringify(privateReceipt,null,2)+'\n',{mode:0o600});
  console.log(JSON.stringify(publicSummary(privateReceipt)));
}
if (process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  main().catch(error=>{
    // Do not print filenames, IDs, locations, SHA-256 or exception stacks.
    const safeCodes = /^[A-Z][A-Z0-9_]+$/u;
    const code=String(error?.message??'PRIVATE_AUDIT_FAILED');
    console.error(safeCodes.test(code)?code:'PRIVATE_AUDIT_FAILED');
    process.exitCode=1;
  });
}
