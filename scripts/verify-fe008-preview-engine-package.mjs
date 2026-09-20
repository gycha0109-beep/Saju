import process from 'node:process';

const EXPECTED_EXPORTS = Object.freeze([
  'FE004_CONTRACT_VERSION',
  'FE006_CONTRACT_VERSION',
  'FE007_CONTRACT_VERSION',
  'FE009_CONTRACT_VERSION',
  'FE010_CONTRACT_VERSION',
  'FE011_CONTRACT_VERSION',
  'FE013_CONTRACT_VERSION',
  'FE014_CONTRACT_VERSION',
  'FE015_CONTRACT_VERSION',
  'FE016_CONTRACT_VERSION',
  'assertBoundConsumerPreviewFaceEngineFE006',
  'assertBrowserBlobConsumerPreviewFaceEngineFE010',
  'assertConsumerPreviewEngineResultFE004',
  'assertHostBoundMediaPipeRuntimeFactoryFE016',
  'assertHostSafeBrowserPreviewFaceEngineFE011',
  'assertManagedConsumerPreviewFaceEngineFE007',
  'assertOneShotHostSafeBrowserPreviewResultFE013',
  'assertProductSafeBrowserPreviewTransportFE014',
  'assertReleaseManagedConsumerPreviewFaceEngineFE009',
  'createBoundConsumerPreviewFaceEngineFE006',
  'createBrowserBlobConsumerPreviewFaceEngineFE010',
  'createHostBoundMediaPipeRuntimeFactoryFE016',
  'createManagedConsumerPreviewFaceEngineFE007',
  'createReleaseManagedConsumerPreviewFaceEngineFE009',
  'openHostSafeBrowserPreviewFaceEngineFE011',
  'projectProductSafeBrowserPreviewTransportFE014',
  'runConsumerPreviewFaceEngineFE004',
  'runOneShotHostSafeBrowserPreviewFE013',
  'runProductSafeBrowserPreviewFE015',
  'serializeProductSafeBrowserPreviewTransportFE014',
]);

const preview = await import('@myeongha/face-reading/preview-engine');
const actual = Object.keys(preview).sort();
if (JSON.stringify(actual) !== JSON.stringify(EXPECTED_EXPORTS)) {
  throw new Error(
    `FE008 package export drift: expected=${JSON.stringify(EXPECTED_EXPORTS)} actual=${JSON.stringify(actual)}`,
  );
}

if (
  preview.FE004_CONTRACT_VERSION !== 'FE004-CONSUMER-PREVIEW-ENGINE-FACADE-v1' ||
  preview.FE006_CONTRACT_VERSION !== 'FE006-BOUND-CONSUMER-PREVIEW-ENGINE-v1' ||
  preview.FE007_CONTRACT_VERSION !== 'FE007-MANAGED-CONSUMER-PREVIEW-ENGINE-SESSION-v1' ||
  preview.FE009_CONTRACT_VERSION !== 'FE009-RELEASE-ASSET-MANAGED-PREVIEW-ENGINE-v1' ||
  preview.FE010_CONTRACT_VERSION !== 'FE010-BROWSER-BLOB-PREVIEW-INGRESS-v1' ||
  preview.FE011_CONTRACT_VERSION !== 'FE011-HOST-SAFE-BROWSER-PREVIEW-ATTEMPT-v1' ||
  preview.FE013_CONTRACT_VERSION !== 'FE013-ONE-SHOT-HOST-SAFE-BROWSER-PREVIEW-v1' ||
  preview.FE014_CONTRACT_VERSION !== 'FE014-PRODUCT-SAFE-NEUTRAL-PREVIEW-TRANSPORT-v1' ||
  preview.FE015_CONTRACT_VERSION !== 'FE015-ONE-CALL-PRODUCT-SAFE-BROWSER-PREVIEW-v1' ||
  preview.FE016_CONTRACT_VERSION !== 'FE016-HOST-BOUND-MEDIAPIPE-RUNTIME-ASSETS-v1'
) {
  throw new Error('FE008 package import resolved unexpected preview-engine contract versions.');
}

async function expectBlocked(specifier) {
  try {
    await import(specifier);
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'ERR_PACKAGE_PATH_NOT_EXPORTED'
    ) {
      return;
    }
    throw error;
  }
  throw new Error(`FE008 expected package export to block ${specifier}.`);
}

await expectBlocked('@myeongha/face-reading');
await expectBlocked('@myeongha/face-reading/preview-observable-engine-fe001');
await expectBlocked('@myeongha/face-reading/governed-metric-geometry-runtime-fr77');
await expectBlocked('@myeongha/face-reading/consumer-safe-preview-output-fe003');
await expectBlocked('@myeongha/face-reading/mediapipe-v0-10-35-geometry-metadata-fe009.generated');

process.stdout.write(`${JSON.stringify({
  status: 'FE008_PREVIEW_ENGINE_PACKAGE_EXPORT_PASS',
  package: '@myeongha/face-reading/preview-engine',
  runtimeValueExports: actual,
  internalPackagePathsBlocked: true,
  releaseAssetPayloadPathBlocked: true,
  rootIndexExported: false,
})}\n`);