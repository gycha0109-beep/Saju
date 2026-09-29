import { createHash } from 'node:crypto';
import {
  existsSync,
  readFileSync,
  statSync,
} from 'node:fs';
import {
  dirname,
  relative,
  resolve,
  sep,
} from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const EXPECTED_PACKAGE = '@mediapipe/tasks-vision';
const EXPECTED_VERSION = '0.10.35';
const EXPECTED_ARTIFACTS = Object.freeze({
  packageJson: Object.freeze({
    sizeBytes: 1084,
    sha256:
      '5c96247445e57a2d087758114b116fed7d46eb401342aee19b1acc56d36fe707',
  }),
  declaration: Object.freeze({
    sizeBytes: 116918,
    sha256:
      '3825dba564fc06720dc0934b72a22711ac6b7491ae8662e573ac205699ea016b',
  }),
  runtimeEntry: Object.freeze({
    relativePath: 'vision_bundle.mjs',
    sizeBytes: 136993,
    sha256:
      '55d7ab624fbb70dcc5adc4ae6d7ea9cfcb569139d3dbfbf2b1deafcb966bc0fe',
  }),
});

function fail(message) {
  throw new Error('FR104 U3.2A: ' + message);
}

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function requireFile(path, label) {
  if (!existsSync(path) || !statSync(path).isFile()) {
    fail(label + ' missing: ' + path);
  }
  return readFileSync(path);
}

function findPackageRoot(entryPath) {
  let current = dirname(entryPath);
  for (;;) {
    const packageJsonPath = resolve(current, 'package.json');
    if (existsSync(packageJsonPath)) {
      try {
        const parsed = JSON.parse(
          readFileSync(packageJsonPath, 'utf8'),
        );
        if (parsed.name === EXPECTED_PACKAGE) {
          return current;
        }
      } catch {
        // Continue upward; malformed unrelated metadata has no authority.
      }
    }
    const parent = dirname(current);
    if (parent === current) break;
    current = parent;
  }
  fail(
    'could not locate exact installed package root from '
      + entryPath,
  );
}

const runtimeEntry = fileURLToPath(
  import.meta.resolve(EXPECTED_PACKAGE),
);
const packageRoot = findPackageRoot(runtimeEntry);
const packageJsonPath = resolve(packageRoot, 'package.json');
const declarationPath = resolve(packageRoot, 'vision.d.ts');

const packageJsonBytes =
  requireFile(packageJsonPath, 'package.json');
const declarationBytes =
  requireFile(declarationPath, 'vision.d.ts');
const runtimeEntryBytes =
  requireFile(runtimeEntry, 'runtime entry');

const packageJson = JSON.parse(
  packageJsonBytes.toString('utf8'),
);
if (packageJson.name !== EXPECTED_PACKAGE) {
  fail(
    'U3_2_PACKAGE_VERSION_DRIFT package name expected='
      + EXPECTED_PACKAGE
      + ' observed='
      + packageJson.name,
  );
}
if (packageJson.version !== EXPECTED_VERSION) {
  fail(
    'U3_2_PACKAGE_VERSION_DRIFT expected='
      + EXPECTED_VERSION
      + ' observed='
      + packageJson.version,
  );
}

const artifactObservation = Object.freeze({
  packageJson: Object.freeze({
    sizeBytes: packageJsonBytes.length,
    sha256: sha256(packageJsonBytes),
  }),
  declaration: Object.freeze({
    sizeBytes: declarationBytes.length,
    sha256: sha256(declarationBytes),
  }),
  runtimeEntry: Object.freeze({
    relativePath:
      relative(packageRoot, runtimeEntry).split(sep).join('/'),
    sizeBytes: runtimeEntryBytes.length,
    sha256: sha256(runtimeEntryBytes),
  }),
});

for (const key of ['packageJson', 'declaration']) {
  if (
    artifactObservation[key].sizeBytes
      !== EXPECTED_ARTIFACTS[key].sizeBytes
    || artifactObservation[key].sha256
      !== EXPECTED_ARTIFACTS[key].sha256
  ) {
    fail(
      'U3_2_RUNTIME_ARTIFACT_SHA_DRIFT '
        + key
        + ' expected='
        + JSON.stringify(EXPECTED_ARTIFACTS[key])
        + ' observed='
        + JSON.stringify(artifactObservation[key]),
    );
  }
}
if (
  artifactObservation.runtimeEntry.relativePath
    !== EXPECTED_ARTIFACTS.runtimeEntry.relativePath
  || artifactObservation.runtimeEntry.sizeBytes
    !== EXPECTED_ARTIFACTS.runtimeEntry.sizeBytes
  || artifactObservation.runtimeEntry.sha256
    !== EXPECTED_ARTIFACTS.runtimeEntry.sha256
) {
  fail(
    'U3_2_RUNTIME_ARTIFACT_SHA_DRIFT runtimeEntry expected='
      + JSON.stringify(EXPECTED_ARTIFACTS.runtimeEntry)
      + ' observed='
      + JSON.stringify(artifactObservation.runtimeEntry),
  );
}

const declaration = declarationBytes.toString('utf8');
const detectWithImageProcessingOptions =
  /detect\s*\(\s*image\s*:\s*ImageSource\s*,\s*imageProcessingOptions\s*\??\s*:\s*ImageProcessingOptions\s*\)\s*:\s*FaceLandmarkerResult\s*;/u
    .test(declaration);
const rotationDegreesProperty =
  /rotationDegrees\s*\??\s*:\s*number\s*;/u
    .test(declaration);
const imageProcessingOptionsDeclared =
  /interface\s+ImageProcessingOptions\b/u
    .test(declaration)
  || /type\s+ImageProcessingOptions\b/u
    .test(declaration);
const clockwiseTextObserved =
  /clockwise/iu.test(declaration);
const multipleOf90TextObserved =
  /90\s*(?:degrees?|°)|multiple\s+of\s+90/iu
    .test(declaration);

if (!detectWithImageProcessingOptions) {
  fail(
    'U3_2_ROTATION_API_UNAVAILABLE detect(ImageSource, ImageProcessingOptions) declaration missing.',
  );
}
if (!rotationDegreesProperty || !imageProcessingOptionsDeclared) {
  fail(
    'U3_2_ROTATION_API_UNAVAILABLE rotationDegrees declaration missing.',
  );
}

const result = Object.freeze({
  schemaVersion:
    'fr104-mediapipe-rotation-api-artifact-audit-result-v1',
  package: Object.freeze({
    name: packageJson.name,
    version: packageJson.version,
    packageRootRelativeToCwd:
      relative(process.cwd(), packageRoot).split(sep).join('/'),
  }),
  artifacts: Object.freeze({
    packageJson: Object.freeze({
      relativePath: 'package.json',
      ...artifactObservation.packageJson,
    }),
    declaration: Object.freeze({
      relativePath: 'vision.d.ts',
      ...artifactObservation.declaration,
    }),
    runtimeEntry: artifactObservation.runtimeEntry,
  }),
  declarationEvidence: Object.freeze({
    faceLandmarkerDetectAcceptsImageProcessingOptions:
      detectWithImageProcessingOptions,
    imageProcessingOptionsDeclared,
    rotationDegreesProperty,
    clockwiseTextObserved,
    multipleOf90TextObserved,
  }),
  interpretationBoundary: Object.freeze({
    exactInstalledArtifactInspected: true,
    upstreamMasterUsedAsExactPackageAuthority: false,
    runtimeBehavioralSemanticsPendingBrowserProbe: true,
  }),
});

process.stdout.write(
  'FR104_U3_2A_ARTIFACT_AUDIT '
    + JSON.stringify(result)
    + '\n',
);
