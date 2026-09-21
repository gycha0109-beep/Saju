import { describe, expect, it } from 'vitest';
import {
  R097_AUTHORITY,
  R097_CLAIM_BINDING_RELATION,
  R097_COORDINATE_CONTRACT,
  R097_DERIVATIVE_REQUIREMENTS,
  R097_IDENTITY_REF_FIELDS,
  R097_LOCATOR_STABILITY_STATES,
  R097_PAGE_INDEX_CONVENTION,
  R097_REJECTED_SHORTCUTS,
  R097_REQUIRED_FIELDS,
  R097_SCAN_INSPECTION_MANIFEST_VERSION,
  R097_TRANSCRIPTION_METHODS,
} from '../src/research/general-natal-scan-inspection-manifest.js';

describe('R097 reproducible scan-page inspection manifest', () => {
  it('references separate R091 work, edition, and witness identities', () => {
    expect(R097_SCAN_INSPECTION_MANIFEST_VERSION).toBe('0.2.0-research');
    expect(R097_IDENTITY_REF_FIELDS).toEqual([
      'WORK_IDENTITY_REF',
      'EDITION_IDENTITY_REF_IF_ESTABLISHED',
      'WITNESS_IDENTITY_REF',
    ]);
    expect(R097_AUTHORITY.identityAuthorityOwnedByR091).toBe(true);
  });

  it('binds inspection to exact file bytes rather than URL identity', () => {
    expect(R097_LOCATOR_STABILITY_STATES).toContain('MUTABLE_LOCATOR');
    expect(R097_REQUIRED_FIELDS).toContain('CHECKSUM_ALGORITHM');
    expect(R097_REQUIRED_FIELDS).toContain('FILE_CHECKSUM');
    expect(R097_AUTHORITY.urlAloneCountsAsImmutableWitness).toBe(false);
    expect(R097_AUTHORITY.checksumAlgorithmRequired).toBe(true);
  });

  it('separates zero-based file page index from printed page label', () => {
    expect(R097_PAGE_INDEX_CONVENTION).toBe('ZERO_BASED_FILE_PAGE_INDEX');
    expect(R097_REQUIRED_FIELDS).toContain('FILE_PAGE_INDEX');
    expect(R097_REQUIRED_FIELDS).toContain('PRINTED_PAGE_LABEL_IF_VISIBLE');
    expect(R097_AUTHORITY.pageIndexEqualsPrintedPage).toBe(false);
  });

  it('declares reproducible rendered-page coordinates and dimensions', () => {
    expect(R097_COORDINATE_CONTRACT).toEqual({
      coordinateSystem: 'RENDERED_PAGE_CARTESIAN',
      origin: 'TOP_LEFT',
      units: 'RENDERED_PAGE_PIXELS',
      boundingBoxFormat: 'X_Y_WIDTH_HEIGHT',
    });
    expect(R097_REQUIRED_FIELDS).toContain('RENDERED_PAGE_WIDTH');
    expect(R097_REQUIRED_FIELDS).toContain('RENDERED_PAGE_HEIGHT');
    expect(R097_REQUIRED_FIELDS).toContain('TRANSFORM_ORDER');
    expect(R097_AUTHORITY.renderedDimensionsRequiredForCoordinates).toBe(true);
  });

  it('keeps OCR as last-resort transcription rather than witness authority', () => {
    expect(R097_TRANSCRIPTION_METHODS).toEqual([
      'HUMAN_VISUAL',
      'BUILT_IN_VISION',
      'OCR_LAST_RESORT',
    ]);
    expect(R097_REJECTED_SHORTCUTS).toContain('OCR_OUTPUT_EQUALS_WITNESS_TEXT');
    expect(R097_AUTHORITY.ocrAsWitnessAuthorized).toBe(false);
  });

  it('requires derived crops to retain parent inspection provenance', () => {
    expect(R097_DERIVATIVE_REQUIREMENTS).toEqual([
      'PARENT_INSPECTION_MANIFEST_REF',
      'DERIVATIVE_CHECKSUM',
      'PARENT_REGION_REF',
    ]);
    expect(R097_AUTHORITY.detachedScreenshotProvenanceSufficient).toBe(false);
  });

  it('does not turn region-to-claim binding into claim verification', () => {
    expect(R097_CLAIM_BINDING_RELATION).toBe(
      'INSPECTED_REGION_EVIDENCE_FOR_CLAIM',
    );
    expect(R097_REJECTED_SHORTCUTS).toContain(
      'CLAIM_BINDING_EQUALS_CLAIM_VERIFICATION',
    );
    expect(R097_AUTHORITY.claimBindingVerifiesClaim).toBe(false);
  });

  it('requires reinspection after checksum changes without rewriting history', () => {
    expect(R097_REJECTED_SHORTCUTS).toContain(
      'REUSE_REGION_AFTER_FILE_CHECKSUM_CHANGE',
    );
    expect(R097_AUTHORITY.checksumChangeRequiresNewInspection).toBe(true);
    expect(R097_AUTHORITY.oldManifestRewrittenOnChecksumChange).toBe(false);
  });

  it('keeps inspection metadata outside Production authority', () => {
    expect(R097_AUTHORITY.productionAuthorityPromoted).toBe(false);
  });
});
