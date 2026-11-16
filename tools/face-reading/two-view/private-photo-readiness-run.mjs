import { createHash } from 'node:crypto';
import { readFile, writeFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';
import { validateBatch } from './server.mjs';
import { validateParsingSummary } from './parsing-contract.mjs';
import {
  summarizeWholeFaceCoverage,
  traceWholeFacePerCaptureReadiness,
} from './feature-coverage.mjs';

// Reads only an existing local intake with previously validated metrics and parser results.
// Writes no photos, hashes, metric values or contours to the repository or stdout.
async function localJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}
const runRef = (x) => typeof x === 'string' && /^[a-f0-9-]{36}$/.test(x);

export async function runPrivatePhotoReadiness(intake) {
  const inventory = await localJson(join(intake, 'inventory.json'));
  if (
    !Array.isArray(inventory) ||
    inventory.length === 0 ||
    new Set(inventory.map((x) => x.recordId)).size !== inventory.length ||
    inventory.some(
      (x) => !/^capture-[0-9]{2,}$/.test(x.recordId || '') || typeof x.sourcePath !== 'string',
    )
  )
    throw Error('PHOTO_READINESS_INVENTORY_INVALID');
  const hashes = new Set();
  for (const record of inventory) {
    const info = await stat(record.sourcePath);
    if (!info.isFile() || info.size <= 0) throw Error('PHOTO_READINESS_IMAGE_MISSING');
    const hash = createHash('sha256')
      .update(await readFile(record.sourcePath))
      .digest('hex');
    if (hashes.has(hash)) throw Error('PHOTO_READINESS_DUPLICATE_IMAGE');
    hashes.add(hash);
  }
  const ids = inventory.map((x) => x.recordId);
  const roles = new Map(ids.map((id) => [id, 'frontal']));
  const activeMetrics = await localJson(join(intake, 'two-view-runs', 'active.json'));
  const activeParsing = await localJson(join(intake, 'parsing-runs', 'active.json'));
  if (!runRef(activeMetrics.runId) || !runRef(activeParsing.runId))
    throw Error('PHOTO_READINESS_RUN_ID_INVALID');
  const metricsBatch = await localJson(
    join(intake, 'two-view-runs', activeMetrics.runId, 'metrics.json'),
  );
  const parsingBatch = await localJson(
    join(intake, 'parsing-runs', activeParsing.runId, 'summary.json'),
  );
  if (
    !Array.isArray(parsingBatch.records) ||
    parsingBatch.records.length !== ids.length ||
    new Set(parsingBatch.records.map((r) => r.captureRef)).size !== ids.length ||
    parsingBatch.records.some((r) => !ids.includes(r.captureRef)) ||
    parsingBatch.records.some((r) => r.parsing?.methodVersion !== parsingBatch.methodVersion)
  )
    throw Error('PHOTO_READINESS_PARSER_BATCH_INVALID');
  const verifiedMetrics = validateBatch(metricsBatch, ids, roles);
  const parsing = new Map(
    parsingBatch.records.map((r) => [
      r.captureRef,
      validateParsingSummary(r.parsing, { allowLegacy: true, viewRole: 'frontal' }),
    ]),
  );
  const captures = verifiedMetrics.map((r) => ({
    captureRef: r.captureRef,
    viewRole: 'frontal',
    metrics: r.metrics,
    parsing: parsing.get(r.captureRef),
  }));
  const earlier = await localJson(join(intake, 'coverage-summary-20261107.json'));
  if (
    earlier.canonicalFeatureCount !== 29 ||
    earlier.canonicalCalculatorMaterializedCount !== 18 ||
    earlier.unresolvedCanonicalCount !== 11 ||
    earlier.totalCaptureCount !== ids.length ||
    earlier.sourceTrace?.features?.length !== 29 ||
    earlier.features?.length !== 29
  )
    throw Error('PHOTO_READINESS_SOURCE_COVERAGE_INVALID');
  const byKey = new Map(earlier.features.map((f) => [f.featureKey, f]));
  const columns = earlier.sourceTrace.features.map((feature) => {
    const legacy = byKey.get(feature.featureKey);
    if (
      !legacy ||
      legacy.regionKey !== feature.regionKey ||
      legacy.canonicalCalculatorMaterialized !== feature.canonicalCalculatorMaterialized ||
      legacy.requiredExtractor !== feature.requiredExtractor ||
      legacy.qualityDependency !== feature.visibilityAndQualityRequirement ||
      feature.canonicalPhotoMeasurementVerified !== false ||
      feature.traditionalBindingIssued !== false
    )
      throw Error('PHOTO_READINESS_SOURCE_DRIFT');
    return {
      featureKey: feature.featureKey,
      regionKey: feature.regionKey,
      implementationState: feature.calculatorState,
      requiredExtractor: feature.requiredExtractor,
      qualityDependency: feature.visibilityAndQualityRequirement,
    };
  });
  const report = traceWholeFacePerCaptureReadiness(columns, captures);
  const aggregate = summarizeWholeFaceCoverage(columns, captures);
  if (
    aggregate.featuresWithLocalPhotoProxy !== earlier.featuresWithLocalPhotoProxy ||
    aggregate.features.some(
      (x) => x.candidatePhotoCount !== byKey.get(x.featureKey)?.candidatePhotoCount,
    )
  )
    throw Error('PHOTO_READINESS_AGGREGATE_MISMATCH');
  const filename =
    'whole-face-per-photo-readiness-v1-' +
    activeMetrics.runId.slice(0, 8) +
    '-' +
    activeParsing.runId.slice(0, 8) +
    '.json';
  const payload =
    JSON.stringify(
      {
        ...report,
        sources: {
          metricMethodVersion: metricsBatch.methodVersion,
          parsingMethodVersion: parsingBatch.methodVersion,
          savedMetricsValidation: true,
          savedParsingValidation: true,
          uniqueOriginalImagesRehashed: hashes.size,
          previousAggregateCrossChecked: true,
        },
      },
      null,
      2,
    ) + '\n';
  const destination = join(intake, filename);
  try {
    await writeFile(destination, payload, { flag: 'wx' });
  } catch (error) {
    if (error.code !== 'EEXIST' || (await readFile(destination, 'utf8')) !== payload)
      throw Error('PHOTO_READINESS_PRIVATE_OUTPUT_EXISTS_DIFFERENT', { cause: error });
  }
  return Object.freeze({
    photoCount: report.photoCount,
    canonicalFeatureCount: report.canonicalFeatureCount,
    canonicalCalculatorCount: report.canonicalCalculatorCount,
    canonicalHardGapCount: report.canonicalHardGapCount,
    statusCounts: report.statusCounts,
    originalImagesRehashed: hashes.size,
    validatedLocalStorageOnly: true,
    filename,
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.length !== 3) {
    process.stderr.write('Usage: node private-photo-readiness-run.mjs <private-intake-folder>\n');
    process.exitCode = 2;
  } else {
    try {
      process.stdout.write(JSON.stringify(await runPrivatePhotoReadiness(process.argv[2])) + '\n');
    } catch (error) {
      process.stderr.write(
        'PHOTO_READINESS_FAILED: ' +
          (/^PHOTO_READINESS_/.test(error.message) ? error.message : 'INVALID_LOCAL_INPUT') +
          '\n',
      );
      process.exitCode = 1;
    }
  }
}
