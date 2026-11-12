import process from 'node:process';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from '../../.face-reading-dist/rgb-selfie-product-column-map-fr293.js';
import { validateBatch } from '../../tools/face-reading/two-view/server.mjs';
import { validateFreshResearchIntake } from '../../tools/face-reading/two-view/fresh-research-intake-contract.mjs';
import { validateParsingSummary } from '../../tools/face-reading/two-view/parsing-contract.mjs';
import { validateEyeFoldReviewStore } from '../../tools/face-reading/two-view/eye-fold-review.mjs';
import {
  summarizeWholeFaceCoverage,
  traceWholeFaceSourceGaps,
  traceWholeFaceExtensionRequirements,
} from '../../tools/face-reading/two-view/feature-coverage.mjs';
import { FR282_RGB_SELFIE_FEATURE_ENTRIES } from '../../.face-reading-dist/rgb-selfie-feature-authority-matrix-fr282.js';

async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}
async function maybeJson(file) {
  try {
    return await readJson(file);
  } catch (e) {
    if (e.code === 'ENOENT') return null;
    throw e;
  }
}

async function loadLocal(intake) {
  // Read source bytes only when verifying a saved human-review SHA; never emit or persist them.
  const base = await readJson(join(intake, 'inventory.json'));
  const extra = (await maybeJson(join(intake, 'additional-inventory.json'))) ?? [];
  const fresh = await maybeJson(join(intake, 'fresh-research-intake.json'));
  if (fresh) {
    validateFreshResearchIntake(fresh, base, extra);
    if (await maybeJson(join(intake, 'combined-active.json')))
      throw Error('FRESH_RESEARCH_INTAKE_INVALID');
  }
  const manifest = fresh
    ? { recordIds: [] }
    : await (async () => {
        const render = await readJson(join(intake, 'combined-active.json'));
        return readJson(resolve(render.path, 'manifest.json'));
      })();
  if (
    !Array.isArray(base) ||
    !Array.isArray(extra) ||
    !Array.isArray(manifest.recordIds) ||
    manifest.recordIds.some((id) => !base.some((r) => r.recordId === id))
  )
    throw Error('INVENTORY_INVALID');
  const baseIds = [
    ...manifest.recordIds,
    ...base.map((r) => r.recordId).filter((id) => !manifest.recordIds.includes(id)),
  ];
  const ids = [...baseIds, ...extra.map((r) => r.recordId)];
  if (
    new Set(ids).size !== ids.length ||
    extra.some((r) => !['frontal', 'profile'].includes(r.viewRole))
  )
    throw Error('INVENTORY_INVALID');
  const roles = new Map([
    ...baseIds.map((id) => [id, 'frontal']),
    ...extra.map((r) => [r.recordId, r.viewRole]),
  ]);
  const humanReviewStore = await maybeJson(join(intake, 'eye-fold-human-reviews.json'));
  const humanReviews = [];
  let staleHumanReviewCount = 0;
  if (humanReviewStore) {
    const validated = validateEyeFoldReviewStore(humanReviewStore, ids);
    const sourceById = new Map([...base, ...extra].map((record) => [record.recordId, record]));
    for (const [captureRef, review] of Object.entries(validated.records)) {
      const source = sourceById.get(captureRef);
      if (!source || roles.get(captureRef) !== 'frontal') throw Error('HUMAN_REVIEW_ROLE_INVALID');
      let currentSha256;
      try {
        currentSha256 = createHash('sha256')
          .update(await readFile(source.sourcePath))
          .digest('hex');
      } catch {
        staleHumanReviewCount++;
        continue;
      }
      if (currentSha256 !== review.sourceSha256) {
        staleHumanReviewCount++;
        continue;
      }
      humanReviews.push({
        captureRef,
        imageLeft: review.imageLeft,
        imageRight: review.imageRight,
        humanReviewed: review.humanReviewed,
        independentAccuracyValidated: review.independentAccuracyValidated,
        modelTrainingAuthorized: review.modelTrainingAuthorized,
      });
    }
  }

  // The original local preview permits metric and parsing runs independently.
  // A missing active run is not evidence that a model failed.
  const metrics = new Map();
  const metricActive = await maybeJson(join(intake, 'two-view-runs', 'active.json'));
  if (metricActive) {
    if (!/^[a-f0-9-]{36}$/.test(metricActive.runId)) throw Error('METRICS_RUN_INVALID');
    const saved = await readJson(join(intake, 'two-view-runs', metricActive.runId, 'metrics.json'));
    const validated = validateBatch(saved, ids, roles);
    for (const record of validated) metrics.set(record.captureRef, record.metrics);
  }

  const parserActive = await maybeJson(join(intake, 'parsing-runs', 'active.json'));
  const parsing = new Map();
  if (parserActive) {
    if (!/^[a-f0-9-]{36}$/.test(parserActive.runId)) throw Error('PARSING_RUN_INVALID');
    const saved = await readJson(join(intake, 'parsing-runs', parserActive.runId, 'summary.json'));
    if (
      !Array.isArray(saved.records) ||
      saved.records.length !== ids.length ||
      new Set(saved.records.map((r) => r.captureRef)).size !== ids.length ||
      saved.records.some((r) => !roles.has(r.captureRef))
    )
      throw Error('PARSING_RUN_INVALID');
    for (const r of saved.records)
      parsing.set(
        r.captureRef,
        validateParsingSummary(r.parsing, {
          allowLegacy: true,
          viewRole: roles.get(r.captureRef),
        }),
      );
  }
  return {
    records: ids.map((captureRef) => ({
      captureRef,
      viewRole: roles.get(captureRef),
      metrics: metrics.get(captureRef) ?? [],
      parsing: parsing.get(captureRef) ?? null,
    })),
    metricsValidated: Boolean(metricActive),
    parsingValidated: Boolean(parserActive),
    humanReviews,
    humanReviewStoreValidated: Boolean(humanReviewStore),
    staleHumanReviewCount,
  };
}

async function main() {
  const args = process.argv.slice(2);
  if (!(
    (args.length === 1 && args[0] === '--schema-only') ||
    (args.length === 2 && args[0] === '--intake' && args[1])
  )) {
    process.stderr.write('Usage: npm run face:coverage -- --schema-only | --intake PRIVATE_DIR\n');
    process.exitCode = 2;
    return;
  }
  assertFR293ProductColumnMap();
  const schemaOnly = args[0] === '--schema-only';
  const local = schemaOnly
    ? {
        records: [],
        metricsValidated: false,
        parsingValidated: false,
        humanReviews: [],
        humanReviewStoreValidated: false,
        staleHumanReviewCount: 0,
      }
    : await loadLocal(resolve(args[1]));
  const report = summarizeWholeFaceCoverage(
    FR293_PRODUCT_COLUMN_MAP,
    local.records,
    local.humanReviews,
  );
  const sourceTrace = traceWholeFaceSourceGaps(
    FR293_PRODUCT_COLUMN_MAP,
    FR282_RGB_SELFIE_FEATURE_ENTRIES,
    local.records,
    local.humanReviews,
  );
  const extensionRequirements = traceWholeFaceExtensionRequirements(
    await readFile(resolve('research/face-reading/whole-face-feature-mapping-20261105.md'), 'utf8'),
    FR293_PRODUCT_COLUMN_MAP.map((column) => column.featureKey),
  );
  // Intentionally aggregate only: no capture ID, source filename, mask or raw coordinates.
  process.stdout.write(
    JSON.stringify(
      {
        ...report,
        sourceTrace,
        extensionRequirements,
        evidenceSource: schemaOnly
          ? 'canonical_schema_only'
          : local.metricsValidated || local.parsingValidated
            ? 'validated_local_saved_runs'
            : local.humanReviews.length > 0
              ? 'validated_local_human_review_labels'
              : local.humanReviewStoreValidated
                ? 'validated_local_human_review_store_no_current_labels'
                : 'local_inventory_only',
        frontalMetricsSavedAndValidated: local.metricsValidated,
        parsingSavedAndValidated: local.parsingValidated,
        humanReviewStoreValidated: local.humanReviewStoreValidated,
        staleHumanReviewCount: local.staleHumanReviewCount,
      },
      null,
      2,
    ) + '\n',
  );
}
main().catch(() => {
  process.stderr.write('FACE_COVERAGE_UNAVAILABLE: invalid or missing private batch\n');
  process.exitCode = 1;
});
