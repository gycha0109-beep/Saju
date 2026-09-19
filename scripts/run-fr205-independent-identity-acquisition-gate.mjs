import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const SOURCES = Object.freeze({
  astFace: {
    repository: 'zhaopu99/AST-face',
    commit: '02132155adda9fba6853f0c154cc33b57b31fed9',
  },
  mica: {
    repository: 'Zielon/MICA',
    commit: 'af22e7a5810d474bc28a1433db533723d6bd2b07',
  },
  threeDdfa: {
    repository: 'cleardusk/3DDFA_V2',
    commit: '1b6c67601abffc1e9f248b291708aef0e43b55ae',
  },
});

function sha256(bytes) {
  return `sha256:${createHash('sha256').update(bytes).digest('hex')}`;
}

function rawUrl(repository, commit, path) {
  return `https://raw.githubusercontent.com/${repository}/${commit}/${path
    .split('/')
    .map(encodeURIComponent)
    .join('/')}`;
}

async function fetchBytes(repository, commit, path) {
  const url = rawUrl(repository, commit, path);
  const response = await globalThis.fetch(url, {
    redirect: 'follow',
    headers: { 'user-agent': 'myeongha-fr205-acquisition-gate' },
    signal: globalThis.AbortSignal.timeout(120000),
  });
  if (!response.ok) {
    throw new Error(`FR205 fetch failed ${response.status}: ${repository}@${commit}:${path}`);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  return { url, bytes, digest: sha256(bytes) };
}

async function fetchText(repository, commit, path) {
  const receipt = await fetchBytes(repository, commit, path);
  return { ...receipt, text: receipt.bytes.toString('utf8') };
}

function countObjRows(text, prefix) {
  return text
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter((line) => line.startsWith(prefix)).length;
}

function failUnless(value, message) {
  if (!value) throw new Error(message);
}

const ast = SOURCES.astFace;
const mica = SOURCES.mica;
const threeDdfa = SOURCES.threeDdfa;

const [
  astReadme,
  astDua,
  astLandmarks,
  astObj,
  astMtl,
  astTexture,
  micaLicense,
  micaReadme,
  ddfaLicense,
  ddfaBfmReadme,
] = await Promise.all([
  fetchText(ast.repository, ast.commit, 'README.md'),
  fetchBytes(ast.repository, ast.commit, 'Data Usage Agreement (DUA) .pdf'),
  fetchText(
    ast.repository,
    ast.commit,
    'ASTFace Pipline/05_edge_nicp/testdata/astface_show/show_au27_landmarks.txt',
  ),
  fetchText(
    ast.repository,
    ast.commit,
    'ASTFace Pipline/05_edge_nicp/testdata/astface_show/show_au27.obj',
  ),
  fetchText(
    ast.repository,
    ast.commit,
    'ASTFace Pipline/05_edge_nicp/testdata/astface_show/show_au27.mtl',
  ),
  fetchBytes(
    ast.repository,
    ast.commit,
    'ASTFace Pipline/05_edge_nicp/testdata/astface_show/show_au27.jpg',
  ),
  fetchText(mica.repository, mica.commit, 'LICENSE'),
  fetchText(mica.repository, mica.commit, 'README.md'),
  fetchText(threeDdfa.repository, threeDdfa.commit, 'LICENSE'),
  fetchText(threeDdfa.repository, threeDdfa.commit, 'bfm/readme.md'),
]);

const landmarkRows = astLandmarks.text
  .split(/\r?\n/u)
  .map((line) => line.trim())
  .filter(Boolean);
const parsedLandmarks = landmarkRows.map((line) =>
  line.split(/\s+/u).map((value) => Number(value)),
);

failUnless(
  parsedLandmarks.length === 84 &&
    parsedLandmarks.every(
      (point) => point.length === 3 && point.every(Number.isFinite),
    ),
  'FR205 AST-Face public demo must expose exactly 84 finite XYZ landmarks.',
);

const astObjStats = {
  vertices: countObjRows(astObj.text, 'v '),
  textureCoordinates: countObjRows(astObj.text, 'vt '),
  normals: countObjRows(astObj.text, 'vn '),
  faces: countObjRows(astObj.text, 'f '),
};
failUnless(
  astObjStats.vertices > 0 &&
    astObjStats.textureCoordinates > 0 &&
    astObjStats.faces > 0,
  'FR205 AST-Face public demo OBJ must contain textured triangle geometry.',
);
const astMapKd = astMtl.text
  .split(/\r?\n/u)
  .map((line) => line.trim())
  .find((line) => line.startsWith('map_Kd '));
failUnless(
  astMapKd === 'map_Kd show_au27.jpg',
  `FR205 AST-Face demo texture binding drift: ${astMapKd ?? 'missing'}`,
);

const astControlledAccessAssertions = {
  publicTierMentionsStandardizedMeshes:
    astReadme.text.includes('Topology-standardized meshes'),
  publicTierMentionsLandmarks:
    astReadme.text.includes('84-point anatomical landmarks'),
  rawScansControlled:
    astReadme.text.includes('Raw 3D facial scans') &&
    astReadme.text.includes('Data Usage Agreement'),
  rgbControlled:
    astReadme.text.includes('synchronized multi-view RGB images') &&
    astReadme.text.includes('52 participants'),
  accessRequiresOsfAccount:
    astReadme.text.includes('Create an OSF account'),
  accessRequiresSignedDua:
    astReadme.text.includes('Read, complete, and sign the DUA'),
};
failUnless(
  Object.values(astControlledAccessAssertions).every(Boolean),
  'FR205 AST-Face access-contract assertions drifted.',
);

const micaAssertions = {
  nonCommercialScientificResearchOnly:
    micaLicense.text.includes(
      'Software Copyright License for non-commercial scientific research purposes',
    ),
  commercialProductProhibited:
    micaLicense.text.includes('incorporation in a commercial product'),
  commercialServiceProhibited:
    micaLicense.text.includes('use in a commercial service'),
  flameAccountRequired:
    micaReadme.text.includes('FLAME2020 model is needed') &&
    micaReadme.text.includes('flame_user') &&
    micaReadme.text.includes('flame_password'),
};
failUnless(
  Object.values(micaAssertions).every(Boolean),
  'FR205 MICA license/runtime assertions drifted.',
);

const ddfaAssertions = {
  codeMit:
    ddfaLicense.text.includes('MIT License'),
  bundledModifiedBfmAcademicOnly:
    ddfaBfmReadme.text.includes(
      'modified BFM2009 face model in `../configs/bfm_noneck_v3.pkl` is only for academic use',
    ),
  commercialBfmLicenseRequired:
    ddfaBfmReadme.text.includes(
      'For commercial use, you need to apply for the commercial license',
    ),
};
failUnless(
  Object.values(ddfaAssertions).every(Boolean),
  'FR205 3DDFA/BFM license assertions drifted.',
);

const artifact = {
  schemaVersion: 'fr205-independent-identity-acquisition-gate-v1',
  authorityState: 'research_acquisition_gate_only',
  candidate: {
    measurement: 'roll_normalized_full_official_face_oval_x_envelope',
    frozenCalibrationFactor: 0.8185802384926992,
    source: 'FR204',
    refitAuthorized: false,
  },
  astFace: {
    ...ast,
    publicDemo: {
      landmarks: 84,
      objStats: astObjStats,
      mapKd: astMapKd,
      digests: {
        landmarks: astLandmarks.digest,
        obj: astObj.digest,
        mtl: astMtl.digest,
        texture: astTexture.digest,
      },
      provesPipelineAssetShapeOnly: true,
      provesIndependentIdentityValidation: false,
    },
    accessContract: astControlledAccessAssertions,
    duaDigest: astDua.digest,
    publicGeometryReady: true,
    publicFrontalRgbReady: false,
    controlledAccessRequiredForPairedRgbRawScanValidation: true,
  },
  researchOracles: {
    mica: {
      ...micaAssertions,
      licenseDigest: micaLicense.digest,
      productionDependencyAuthorized: false,
      researchOracleOnly: true,
    },
    threeDdfaV2: {
      ...ddfaAssertions,
      codeLicenseDigest: ddfaLicense.digest,
      bfmNoticeDigest: ddfaBfmReadme.digest,
      productionDependencyAuthorized: false,
      researchOracleOnly: true,
    },
  },
  decision: {
    preferredIndependentIdentityPath:
      'AST-Face controlled-access raw scan + frontal RGB subset',
    executableWithoutExternalAccess: false,
    externalActionRequired:
      'Obtain AST-Face controlled-access permission by OSF account + signed DUA.',
    fallbackOracleConsensusAvailableWithoutLicensingReview: false,
  },
  authority: {
    independentIdentityValidationComplete: false,
    calibrationAuthorized: false,
    productionAuthorized: false,
    commerceAuthorized: false,
  },
};

const outDir = resolve(ROOT, 'artifacts', 'face-reading');
await mkdir(outDir, { recursive: true });
await writeFile(
  resolve(outDir, 'fr205-independent-identity-acquisition-gate.json'),
  `${JSON.stringify(artifact, null, 2)}\n`,
  'utf8',
);

globalThis.console.log(
  JSON.stringify({
    status: 'acquisition_gate_complete',
    astFaceDemoLandmarks: artifact.astFace.publicDemo.landmarks,
    astFaceDemoObjStats: artifact.astFace.publicDemo.objStats,
    astFaceControlledAccessRequired:
      artifact.astFace.controlledAccessRequiredForPairedRgbRawScanValidation,
    micaResearchOracleOnly: artifact.researchOracles.mica.researchOracleOnly,
    threeDdfaResearchOracleOnly:
      artifact.researchOracles.threeDdfaV2.researchOracleOnly,
    preferredIndependentIdentityPath:
      artifact.decision.preferredIndependentIdentityPath,
    executableWithoutExternalAccess:
      artifact.decision.executableWithoutExternalAccess,
  }),
);
