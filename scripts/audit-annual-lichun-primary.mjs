#!/usr/bin/env node
import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import process from 'node:process';
import { createReadStream } from 'node:fs';
import { open, stat } from 'node:fs/promises';
import { pathToFileURL, URL } from 'node:url';

const MAX_BYTES = 64 * 1024 * 1024;

/**
 * Offline capture audit, not a source authority approval.
 * No network fetch, PDF text inference, registry writes, or Production admission.
 */
export async function auditPrimaryPdf(filePath, sourceUrl, year) {
  if (!Number.isSafeInteger(year) || year < 2 || year > 9999) {
    throw new Error('year must be a four-digit positive supported year');
  }

  let url;
  try {
    url = new URL(sourceUrl);
  } catch {
    throw new Error('source URL must be a valid HTTPS URL');
  }
  const host = url.hostname.toLowerCase();
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.port ||
    !(
      host === 'kasa.go.kr' ||
      host.endsWith('.kasa.go.kr') ||
      host === 'gwanbo.go.kr' ||
      host.endsWith('.gwanbo.go.kr')
    )
  ) {
    throw new Error('source URL must refer to the HTTPS KASA or Gwanbo domain');
  }

  const metadata = await stat(filePath);
  if (!metadata.isFile() || metadata.size < 8 || metadata.size > MAX_BYTES) {
    throw new Error('source PDF must be a regular file with size 8 bytes to 64 MiB');
  }

  const fileHandle = await open(filePath, 'r');
  try {
    const signature = Buffer.alloc(5);
    const { bytesRead } = await fileHandle.read(signature, 0, 5, 0);
    if (bytesRead !== 5 || signature.toString('ascii') !== '%PDF-') {
      throw new Error('source file does not have a PDF header');
    }
  } finally {
    await fileHandle.close();
  }

  const hash = createHash('sha256');
  let size = 0;
  for await (const chunk of createReadStream(filePath)) {
    hash.update(chunk);
    size += chunk.length;
  }
  if (size !== metadata.size) {
    throw new Error('source file changed while being audited; re-run');
  }

  return {
    auditFormat: 'saju-annual-lichun-primary-pdf-capture-v1',
    year,
    publishedDocumentUri: url.toString(),
    byteLength: size,
    originalPdfSha256: hash.digest('hex'),
    mimeSignature: '%PDF-',
    originalPageNumber: null,
    printedLichunText: null,
    printedTimeZone: null,
    printedPrecision: null,
    reviewerDecisionRef: null,
    status: 'BINARY_CAPTURED_CONTENT_UNREVIEWED',
    suitableForPrimaryRegistry: false,
    productionAuthorized: false,
    note:
      'A PDF header and hash do not authenticate the source or its printed LiChun time. An independent page-level review is required.',
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [filePath, yearText, sourceUrl] = process.argv.slice(2);
  if (!filePath || !/^\d{4}$/.test(yearText ?? '') || !sourceUrl) {
    process.stderr.write(
      'Usage: node scripts/audit-annual-lichun-primary.mjs ORIGINAL.pdf YEAR https://OFFICIAL-DOCUMENT-URL\n',
    );
    process.exitCode = 2;
  } else {
    auditPrimaryPdf(filePath, sourceUrl, Number(yearText))
      .then((result) => {
        process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
      })
      .catch((error) => {
        process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
        process.exitCode = 1;
      });
  }
}
