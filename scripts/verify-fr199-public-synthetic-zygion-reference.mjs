import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import process from 'node:process';

import {
  FACE_READING_PUBLIC_SYNTHETIC_ASSETS_FR199,
  derivePublishedSourceExactZygionFR199,
  parseWavefrontVerticesFR199,
} from '../.face-reading-dist/face-reading-public-synthetic-zygion-reference-fr199.js';

function gitBlobSha(bytes) {
  const prefix = Buffer.from(`blob ${bytes.length}\0`, 'utf8');
  return createHash('sha1').update(prefix).update(bytes).digest('hex');
}

function rawUrl(asset, kind) {
  const source = asset[kind];
  return `https://raw.githubusercontent.com/${asset.repository}/${asset.commitSha}/${source.path}`;
}

async function fetchExact(asset, kind) {
  const source = asset[kind];
  const response = await globalThis.fetch(rawUrl(asset, kind), {
    headers: { 'user-agent': 'myeongha-fr199-public-synthetic-reference-verifier' },
  });
  if (!response.ok) {
    throw new Error(`FR199 failed to fetch ${asset.sampleId} ${kind}: HTTP ${response.status}`);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length !== source.sizeBytes) {
    throw new Error(
      `FR199 byte-size mismatch for ${asset.sampleId} ${kind}: expected=${source.sizeBytes} actual=${bytes.length}`,
    );
  }
  const actualSha = gitBlobSha(bytes);
  if (actualSha !== source.gitBlobSha) {
    throw new Error(
      `FR199 Git blob SHA mismatch for ${asset.sampleId} ${kind}: expected=${source.gitBlobSha} actual=${actualSha}`,
    );
  }
  return bytes;
}

const receipts = [];
for (const asset of FACE_READING_PUBLIC_SYNTHETIC_ASSETS_FR199) {
  const objBytes = await fetchExact(asset, 'obj');
  const vertices = parseWavefrontVerticesFR199(objBytes.toString('utf8'));

  try {
    const reference = derivePublishedSourceExactZygionFR199(asset.sampleId, vertices);
    receipts.push({
      sampleId: asset.sampleId,
      objGitBlobSha: asset.obj.gitBlobSha,
      imageGitBlobSha: asset.image.gitBlobSha,
      vertexCount: vertices.length,
      sourceExactStatus: 'bilateral_reference_derived',
      pronasale: reference.pronasale,
      bilateralZygion: reference.bilateralZygion,
      providerCandidateVisibleDuringReferenceDerivation:
        reference.providerCandidateVisibleDuringReferenceDerivation,
      providerIndexAdmissionAuthorized: reference.providerIndexAdmissionAuthorized,
    });
  } catch (error) {
    if (
      error instanceof Error
      && error.message === 'fr199_source_exact_bilateral_zygion_incomplete'
    ) {
      receipts.push({
        sampleId: asset.sampleId,
        objGitBlobSha: asset.obj.gitBlobSha,
        imageGitBlobSha: asset.image.gitBlobSha,
        vertexCount: vertices.length,
        sourceExactStatus: 'bilateral_reference_incomplete_fail_closed',
        error: error.message,
        providerCandidateVisibleDuringReferenceDerivation: false,
        providerIndexAdmissionAuthorized: false,
      });
      continue;
    }
    throw error;
  }
}

if (receipts.length !== FACE_READING_PUBLIC_SYNTHETIC_ASSETS_FR199.length) {
  throw new Error('FR199 fixed public corpus receipt count drift.');
}
if (
  receipts.some(
    (receipt) =>
      receipt.providerCandidateVisibleDuringReferenceDerivation !== false
      || receipt.providerIndexAdmissionAuthorized !== false,
  )
) {
  throw new Error('FR199 reference-stage authority widening.');
}

const successCount = receipts.filter(
  (receipt) => receipt.sourceExactStatus === 'bilateral_reference_derived',
).length;
const incompleteCount = receipts.length - successCount;

process.stdout.write(`${JSON.stringify({
  status: 'FR199_PUBLIC_SYNTHETIC_REFERENCE_STAGE_EXECUTED',
  corpusSize: receipts.length,
  bilateralReferenceDerivedCount: successCount,
  bilateralReferenceIncompleteFailClosedCount: incompleteCount,
  sampleSizeMandateIssued: false,
  numericAcceptanceThresholdIssued: false,
  providerStageExecuted: false,
  providerIndexAdmissionAuthorized: false,
  receipts,
})}\n`);
