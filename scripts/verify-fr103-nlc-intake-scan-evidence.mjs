import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import process from 'node:process';

import { FR103_NLC_INTAKE_SCAN_EVIDENCE } from '../.face-reading-dist/five-officers-mouth-scan-evidence-acquisition-fr103.js';

const PROVENANCE_PATH = 'packages/face-reading/evidence/fr103/acquisition-provenance.json';
const EXPECTED = Object.freeze({
  schemaVersion: 'fr103-nlc-scan-acquisition-provenance-v1',
  witnessId: 'witness.shenxiang_quanbian.nlc_1925',
  sourceFilePageRef: 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf',
  sourcePdfSha256: 'sha256:94167d8d19d47525535b39e18a20c6b315a3a30751c2063bc2492760f1d927af',
  sourcePdfSizeBytes: 19_310_489,
  sourcePdfPageCount: 576,
  pages: Object.freeze([
    Object.freeze({
      pdfPage: 87,
      repositoryPath: 'packages/face-reading/evidence/fr103/nlc-1925-page-87.png',
      sha256: 'sha256:9a3cbda77616c6c359e2aaca173d8f4d3c7ef867449247d9d3887847d9882073',
      gitBlobSha1: '1b69d78acca7655b2983e262a72d7b3093fff7e0',
      role: 'section_start_anchor_candidate',
    }),
    Object.freeze({
      pdfPage: 88,
      repositoryPath: 'packages/face-reading/evidence/fr103/nlc-1925-page-88.png',
      sha256: 'sha256:5ceedcabaa806ab2a4a55a1923681b5b7b246b01c62af42ee8ba56413d207fce',
      gitBlobSha1: '252dce5fa986a0be33513307e6d100a892207b69',
      role: 'target_passage_candidate',
    }),
  ]),
});

function sha256(bytes) {
  return `sha256:${createHash('sha256').update(bytes).digest('hex')}`;
}

function gitBlobSha1(bytes) {
  const prefix = Buffer.from(`blob ${bytes.length}\0`, 'utf8');
  return createHash('sha1').update(prefix).update(bytes).digest('hex');
}

const provenance = JSON.parse(await readFile(PROVENANCE_PATH, 'utf8'));

if (
  provenance.schemaVersion !== EXPECTED.schemaVersion ||
  provenance.witnessId !== EXPECTED.witnessId ||
  provenance.sourceFilePageRef !== EXPECTED.sourceFilePageRef ||
  provenance.sourcePdfSha256 !== EXPECTED.sourcePdfSha256 ||
  provenance.sourcePdfSizeBytes !== EXPECTED.sourcePdfSizeBytes ||
  provenance.sourcePdfPageCount !== EXPECTED.sourcePdfPageCount ||
  provenance.renderTool !== 'pdftoppm' ||
  provenance.renderDpi !== 320 ||
  provenance.visualVerificationPerformedByAcquisitionRunner !== false ||
  provenance.ocrUsedForEvidenceAdmission !== false ||
  provenance.searchIndexUsedForEvidenceAdmission !== false ||
  !Array.isArray(provenance.pages) ||
  provenance.pages.length !== EXPECTED.pages.length
) throw new Error('FR103 provenance authority drift.');

const verifiedPages = [];
for (let index = 0; index < EXPECTED.pages.length; index += 1) {
  const expected = EXPECTED.pages[index];
  const recorded = provenance.pages[index];
  if (
    recorded.pdfPage !== expected.pdfPage ||
    recorded.repositoryPath !== expected.repositoryPath ||
    recorded.sha256 !== expected.sha256 ||
    recorded.role !== expected.role
  ) throw new Error(`FR103 provenance page ${expected.pdfPage} drift.`);

  const bytes = await readFile(expected.repositoryPath);
  const actualSha256 = sha256(bytes);
  const actualGitBlobSha1 = gitBlobSha1(bytes);
  if (actualSha256 !== expected.sha256) {
    throw new Error(`FR103 SHA-256 mismatch for PDF page ${expected.pdfPage}: expected=${expected.sha256} actual=${actualSha256}`);
  }
  if (actualGitBlobSha1 !== expected.gitBlobSha1) {
    throw new Error(`FR103 Git blob SHA-1 mismatch for PDF page ${expected.pdfPage}: expected=${expected.gitBlobSha1} actual=${actualGitBlobSha1}`);
  }
  verifiedPages.push(Object.freeze({
    pdfPage: expected.pdfPage,
    sha256: actualSha256,
    gitBlobSha1: actualGitBlobSha1,
  }));
}

if (
  FR103_NLC_INTAKE_SCAN_EVIDENCE.provenanceSchemaVersion !== EXPECTED.schemaVersion ||
  FR103_NLC_INTAKE_SCAN_EVIDENCE.provenancePath !== PROVENANCE_PATH ||
  FR103_NLC_INTAKE_SCAN_EVIDENCE.witnessId !== EXPECTED.witnessId ||
  FR103_NLC_INTAKE_SCAN_EVIDENCE.sourceFilePageRef !== EXPECTED.sourceFilePageRef ||
  FR103_NLC_INTAKE_SCAN_EVIDENCE.sourcePdfSha256 !== EXPECTED.sourcePdfSha256 ||
  FR103_NLC_INTAKE_SCAN_EVIDENCE.sourcePdfSizeBytes !== EXPECTED.sourcePdfSizeBytes ||
  FR103_NLC_INTAKE_SCAN_EVIDENCE.sourcePdfPageCount !== EXPECTED.sourcePdfPageCount ||
  FR103_NLC_INTAKE_SCAN_EVIDENCE.exactScanPage !== 88 ||
  FR103_NLC_INTAKE_SCAN_EVIDENCE.targetPassagePrintedLeaf !== null ||
  FR103_NLC_INTAKE_SCAN_EVIDENCE.visualPassageMatchConfirmed !== true ||
  FR103_NLC_INTAKE_SCAN_EVIDENCE.visuallyMatchedText !== '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。' ||
  FR103_NLC_INTAKE_SCAN_EVIDENCE.evidenceAdmissionBasis !== 'immutable_repository_page_image_plus_interactive_visual_review' ||
  FR103_NLC_INTAKE_SCAN_EVIDENCE.ocrUsedForEvidenceAdmission !== false ||
  FR103_NLC_INTAKE_SCAN_EVIDENCE.searchIndexUsedForEvidenceAdmission !== false ||
  FR103_NLC_INTAKE_SCAN_EVIDENCE.visualEvidenceRefs.length !== 2 ||
  FR103_NLC_INTAKE_SCAN_EVIDENCE.checkerRefs.length !== 1
) throw new Error('FR103 compiled scan-evidence authority drift.');

if (!FR103_NLC_INTAKE_SCAN_EVIDENCE.immutablePageImageRef.includes(EXPECTED.pages[1].sha256)) {
  throw new Error('FR103 target passage immutable page reference is not bound to page-88 SHA-256.');
}

process.stdout.write(`${JSON.stringify({
  status: 'FR103_NLC_INTAKE_SCAN_EVIDENCE_PASS',
  witnessId: EXPECTED.witnessId,
  sourcePdfSha256: EXPECTED.sourcePdfSha256,
  sourcePdfPageCount: EXPECTED.sourcePdfPageCount,
  exactScanPage: FR103_NLC_INTAKE_SCAN_EVIDENCE.exactScanPage,
  visualPassageMatchConfirmed: FR103_NLC_INTAKE_SCAN_EVIDENCE.visualPassageMatchConfirmed,
  evidenceAdmissionBasis: FR103_NLC_INTAKE_SCAN_EVIDENCE.evidenceAdmissionBasis,
  ocrUsedForEvidenceAdmission: FR103_NLC_INTAKE_SCAN_EVIDENCE.ocrUsedForEvidenceAdmission,
  searchIndexUsedForEvidenceAdmission: FR103_NLC_INTAKE_SCAN_EVIDENCE.searchIndexUsedForEvidenceAdmission,
  verifiedPages,
})}\n`);
