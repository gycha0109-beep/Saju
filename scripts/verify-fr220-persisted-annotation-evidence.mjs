import { existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import process from 'node:process';
import {
  admitHumanAnnotationFR219,
  buildAnnotationEvidenceReceiptFR219,
  materializeBlindedReviewSessionFR219,
} from '../.face-reading-dist/observable-morphology-human-review-fr219.js';
import {
  verifyPersistedAnnotationEvidenceFR220,
} from '../.face-reading-dist/observable-morphology-persisted-annotation-intake-fr220.js';

const SMOKE = process.env.FR220_SMOKE === '1';

function fail(message) {
  throw new Error('FR220 VERIFY ' + message);
}

function readEvidence(ledgerPath, receiptPath) {
  if (!existsSync(ledgerPath) || !statSync(ledgerPath).isFile()) {
    fail('ledger path does not exist or is not a file.');
  }
  if (!existsSync(receiptPath) || !statSync(receiptPath).isFile()) {
    fail('receipt path does not exist or is not a file.');
  }
  const lines = readFileSync(ledgerPath, 'utf8')
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length === 0) fail('ledger contains no annotation records.');

  let records;
  let receipt;
  try {
    records = lines.map((line) => JSON.parse(line));
  } catch {
    fail('ledger contains invalid JSONL.');
  }
  try {
    receipt = JSON.parse(readFileSync(receiptPath, 'utf8'));
  } catch {
    fail('receipt contains invalid JSON.');
  }
  return { records, receipt };
}

function verifyFiles(ledgerPath, receiptPath) {
  const { records, receipt } = readEvidence(ledgerPath, receiptPath);
  return verifyPersistedAnnotationEvidenceFR220({
    annotationRecords: records,
    evidenceReceipt: receipt,
  });
}

function reviewItem() {
  return {
    reviewItemRef: 'review-item:fr220-smoke',
    reviewArtifactRef: 'review-artifact:fr220-smoke',
    constructRef: 'observable.eye_pair.outer_corner_orientation@0.1.0',
    reviewerPrompt: '이 사람의 눈꼬리는 전체적으로 어떻게 보이나요?',
    labelOptions: [
      { key: 'clearly_downturned', reviewerMeaning: '눈꼬리가 확실히 내려가 보임' },
      { key: 'slightly_downturned', reviewerMeaning: '눈꼬리가 약간 내려가 보임' },
      { key: 'approximately_horizontal', reviewerMeaning: '눈꼬리가 거의 수평으로 보임' },
      { key: 'slightly_upturned', reviewerMeaning: '눈꼬리가 약간 올라가 보임' },
      { key: 'clearly_upturned', reviewerMeaning: '눈꼬리가 확실히 올라가 보임' },
      { key: 'not_assessable', reviewerMeaning: '이 이미지에서는 판단하기 어려움' },
    ],
    metricValuesExposed: false,
    candidateMetricIdentityExposed: false,
    providerIdentityExposed: false,
    extractorIdentityExposed: false,
    coverageBinExposed: false,
    candidateThresholdExposed: false,
    traditionalMeaningExposed: false,
    fortuneOutputExposed: false,
    peerLabelsExposed: false,
  };
}

function session(reviewerKey, item) {
  return materializeBlindedReviewSessionFR219({
    sessionRef: 'session:' + reviewerKey,
    reviewerKey,
    reviewerHumanAttested: true,
    reviewerIndependenceAttested: true,
    items: [{
      reviewItem: item,
      assetPath: '/operator-private/sanitized.png',
      assetDigest: 'sha256:' + 'a'.repeat(64),
      mediaType: 'image/png',
      embeddedMetadataSanitizedAttested: true,
    }],
  });
}

function runSmoke() {
  const temp = mkdtempSync(join(tmpdir(), 'fr220-smoke-'));
  try {
    const item = reviewItem();
    const first = session('reviewer:fr220:1', item);
    const second = session('reviewer:fr220:2', item);
    const annotations = [
      admitHumanAnnotationFR219(first, {
        reviewItemRef: item.reviewItemRef,
        label: 'slightly_upturned',
        recordedAt: '2026-09-20T12:40:00.000Z',
      }),
      admitHumanAnnotationFR219(second, {
        reviewItemRef: item.reviewItemRef,
        label: 'approximately_horizontal',
        recordedAt: '2026-09-20T12:41:00.000Z',
      }),
    ];
    const receipt = buildAnnotationEvidenceReceiptFR219([first, second], annotations);

    const ledgerPath = join(temp, 'annotations.jsonl');
    const receiptPath = ledgerPath + '.receipt.json';
    writeFileSync(
      ledgerPath,
      annotations.map((record) => JSON.stringify(record)).join('\n') + '\n',
      'utf8',
    );
    writeFileSync(receiptPath, JSON.stringify(receipt, null, 2) + '\n', 'utf8');

    const verified = verifyFiles(ledgerPath, receiptPath);
    if (
      verified.fr219EvidenceRef !== receipt.evidenceRef
      || verified.annotationCount !== 2
      || verified.reviewedItemCount !== 1
      || verified.reviewerCount !== 2
      || verified.sessionCount !== 2
      || verified.itemDistributions[0]?.countsByLabel.slightly_upturned !== 1
      || verified.itemDistributions[0]?.countsByLabel.approximately_horizontal !== 1
      || verified.declaredHumanAnnotationEvidencePresent !== true
      || verified.authorityBoundary.reviewerHumanStatusIndependentlyVerified !== false
      || verified.authorityBoundary.empiricalSufficiencyEstablished !== false
      || verified.authorityBoundary.repeatCaptureStabilityEstablished !== false
      || verified.authorityBoundary.thresholdIssued !== false
      || verified.authorityBoundary.classifierIssued !== false
      || verified.authorityBoundary.traditionalBindingIssued !== false
    ) fail('smoke verified evidence boundary drift.');

    const tampered = JSON.parse(JSON.stringify(annotations[0]));
    tampered.label = 'clearly_upturned';
    writeFileSync(
      ledgerPath,
      [tampered, annotations[1]].map((record) => JSON.stringify(record)).join('\n') + '\n',
      'utf8',
    );
    let tamperRejected = false;
    try {
      verifyFiles(ledgerPath, receiptPath);
    } catch {
      tamperRejected = true;
    }
    if (!tamperRejected) fail('smoke tampered persisted annotation was accepted.');

    process.stdout.write(JSON.stringify({
      status: 'FR220_PERSISTED_ANNOTATION_EVIDENCE_INTAKE_PASS',
      serializationRoundTripVerified: true,
      annotationDigestRecomputed: true,
      evidenceDigestRecomputed: true,
      evidenceRefRecomputed: true,
      disagreementPreserved: true,
      tamperRejected: true,
      declaredHumanAnnotationEvidencePresent: true,
      reviewerHumanStatusIndependentlyVerified: false,
      reviewerIndependenceIndependentlyVerified: false,
      empiricalSufficiencyEstablished: false,
      repeatCaptureStabilityEstablished: false,
      thresholdIssued: false,
      classifierIssued: false,
      traditionalBindingIssued: false,
    }) + '\n');
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}

if (SMOKE) {
  runSmoke();
} else {
  const ledger = process.env.FR220_LEDGER_PATH?.trim();
  if (!ledger) fail('set FR220_LEDGER_PATH.');
  const ledgerPath = resolve(ledger);
  const receiptPath = resolve(process.env.FR220_RECEIPT_PATH?.trim() || ledgerPath + '.receipt.json');
  const verified = verifyFiles(ledgerPath, receiptPath);
  process.stdout.write(JSON.stringify({
    status: 'FR220_PERSISTED_ANNOTATION_EVIDENCE_VERIFIED',
    evidenceRef: verified.fr219EvidenceRef,
    annotationCount: verified.annotationCount,
    reviewedItemCount: verified.reviewedItemCount,
    reviewerCount: verified.reviewerCount,
    sessionCount: verified.sessionCount,
    declaredHumanAnnotationEvidencePresent: verified.declaredHumanAnnotationEvidencePresent,
    allReviewersIndependentAttested: verified.allReviewersIndependentAttested,
    reviewerHumanStatusIndependentlyVerified:
      verified.authorityBoundary.reviewerHumanStatusIndependentlyVerified,
    empiricalSufficiencyEstablished: verified.authorityBoundary.empiricalSufficiencyEstablished,
    repeatCaptureStabilityEstablished: verified.authorityBoundary.repeatCaptureStabilityEstablished,
    thresholdIssued: verified.authorityBoundary.thresholdIssued,
    classifierIssued: verified.authorityBoundary.classifierIssued,
    traditionalBindingIssued: verified.authorityBoundary.traditionalBindingIssued,
  }, null, 2) + '\n');
}
