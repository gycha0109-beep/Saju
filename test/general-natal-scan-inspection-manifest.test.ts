import { describe, expect, it } from 'vitest';
import {
  R097_AUTHORITY,
  R097_REJECTED_SHORTCUTS,
  R097_REQUIRED_FIELDS,
  R097_SCAN_INSPECTION_MANIFEST_VERSION,
  R097_TRANSCRIPTION_METHODS,
} from '../src/research/general-natal-scan-inspection-manifest.js';

describe('R097 reproducible scan-page inspection manifest', () => {
  it('records file, page, region, rendering, transcription, and claim identity', () => {
    expect(R097_SCAN_INSPECTION_MANIFEST_VERSION).toBe('0.1.0-research');
    expect(R097_REQUIRED_FIELDS).toContain('FILE_CHECKSUM');
    expect(R097_REQUIRED_FIELDS).toContain('PAGE_INDEX');
    expect(R097_REQUIRED_FIELDS).toContain('COORDINATE_SYSTEM');
    expect(R097_REQUIRED_FIELDS).toContain('SUPPORTED_CLAIM_IDS');
  });

  it('keeps OCR as a last-resort transcription method', () => {
    expect(R097_TRANSCRIPTION_METHODS).toEqual([
      'HUMAN_VISUAL','BUILT_IN_VISION','OCR_LAST_RESORT',
    ]);
  });

  it('rejects page-number, OCR, and screenshot shortcuts', () => {
    expect(R097_REJECTED_SHORTCUTS).toContain('PDF_INDEX_EQUALS_PRINTED_PAGE');
    expect(R097_REJECTED_SHORTCUTS).toContain('OCR_OUTPUT_EQUALS_WITNESS_TEXT');
    expect(R097_REJECTED_SHORTCUTS).toContain('SCREENSHOT_WITHOUT_WITNESS_IDENTITY');
  });

  it('requires reinspection after checksum changes and keeps authority bounded', () => {
    expect(R097_AUTHORITY).toEqual({
      status:'REPRODUCIBLE_SCAN_INSPECTION_MANIFEST_DEFINED',
      pageIndexEqualsPrintedPage:false,
      ocrAsWitnessAuthorized:false,
      checksumChangeRequiresReinspection:true,
      sourceIdentityRequired:true,
      productionAuthorityPromoted:false,
    });
  });
});
