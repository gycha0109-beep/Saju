import { createHash } from 'node:crypto';
import process from 'node:process';

import {
  FR199_FEMALE_DATASET_COMMIT,
  FR199_FEMALE_DATASET_REPOSITORY,
  FR199_MALE_DATASET_COMMIT,
  FR199_MALE_DATASET_REPOSITORY,
  FR199_PUBLIC_CORPUS,
  deriveAndFreezeIndependentZygionReferenceFR199,
  deriveZygionIntendedLoopRepairFR199,
  parseObjVerticesFR199,
} from '../.face-reading-dist/face-reading-public-synthetic-zygion-correspondence-fr199.js';

function sha256(text) {
  return `sha256:${createHash('sha256').update(text, 'utf8').digest('hex')}`;
}

async function fetchObj(sampleId) {
  const male = sampleId.startsWith('male-');
  const repository = male ? FR199_MALE_DATASET_REPOSITORY : FR199_FEMALE_DATASET_REPOSITORY;
  const commit = male ? FR199_MALE_DATASET_COMMIT : FR199_FEMALE_DATASET_COMMIT;
  const url = `https://raw.githubusercontent.com/${repository}/${commit}/3D-models/${sampleId}.obj`;
  const response = await globalThis.fetch(url, { headers: { 'user-agent': 'myeongha-fr199-reference-experiment' } });
  if (!response.ok) throw new Error(`FR199 failed to fetch ${sampleId}: HTTP ${response.status}`);
  const objText = await response.text();
  return { objText, objDigest: sha256(objText) };
}

const receipts = [];
const failures = [];
for (const sampleId of FR199_PUBLIC_CORPUS) {
  try {
    const source = await fetchObj(sampleId);
    const receipt = deriveAndFreezeIndependentZygionReferenceFR199({ sampleId, ...source });
    receipts.push({
      sampleId,
      objDigest: receipt.sourceAsset.objDigest,
      pronasale: receipt.pronasale,
      bilateralReference: receipt.bilateralReference,
      sourceExactControlFlowQuirkPreserved: receipt.sourceAlgorithm.sourceExactControlFlowQuirkPreserved,
    });
  } catch (error) {
    failures.push({ sampleId, error: error instanceof Error ? error.message : String(error) });
  }
}

const intendedRepairReceipts = [];
const intendedRepairFailures = [];
for (const sampleId of FR199_PUBLIC_CORPUS) {
  try {
    const source = await fetchObj(sampleId);
    const repaired = deriveZygionIntendedLoopRepairFR199(parseObjVerticesFR199(source.objText));
    intendedRepairReceipts.push({
      sampleId,
      objDigest: source.objDigest,
      referenceMethod: repaired.referenceMethod,
      pronasale: repaired.pronasale,
      bilateralReference: repaired.bilateral,
      bandsVisited: repaired.bandsVisited,
      providerCandidateVisibleDuringDerivation: false,
      providerIndexAdmissionAuthorized: false,
    });
  } catch (error) {
    intendedRepairFailures.push({
      sampleId,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

process.stdout.write(`${JSON.stringify({
  status: failures.length === 0 ? 'FR199_PUBLIC_REFERENCE_EXPERIMENT_COMPLETE' : 'FR199_PUBLIC_REFERENCE_EXPERIMENT_PARTIAL',
  corpusCount: FR199_PUBLIC_CORPUS.length,
  sourceExactSuccessCount: receipts.length,
  sourceExactFailureCount: failures.length,
  receipts,
  failures,
  intendedLoopRepairMethod: 'topsakal_2023_public_notebook_intended_loop_repair_v1',
  intendedLoopRepairSuccessCount: intendedRepairReceipts.length,
  intendedLoopRepairFailureCount: intendedRepairFailures.length,
  intendedLoopRepairReceipts: intendedRepairReceipts,
  intendedLoopRepairFailures: intendedRepairFailures,
  providerStageExecuted: false,
  providerIndexAdmissionAuthorized: false,
})}\n`);

if (receipts.length === 0) process.exitCode = 1;
