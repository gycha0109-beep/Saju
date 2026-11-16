import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { FR293_PRODUCT_COLUMN_MAP } from '../packages/face-reading/src/rgb-selfie-product-column-map-fr293.js';
import { FR282_RGB_SELFIE_FEATURE_ENTRIES } from '../packages/face-reading/src/rgb-selfie-feature-authority-matrix-fr282.js';
import { FR294_HARD_GAP_FRONTIER } from '../packages/face-reading/src/rgb-selfie-hard-gap-frontier-fr294.js';
import { readingCatalogue } from '../tools/face-reading/two-view/reading-catalogue.mjs';
import { VISIBLE_BROW_MASK_ENVELOPE_VERSION } from '../tools/face-reading/two-view/visible-brow-mask-envelope.mjs';
import {
  auditWholeFaceSourceMapping,
  WHOLE_FACE_MAPPING_AUDIT_VERSION,
  renderWholeFaceMappingAuditMarkdown,
} from '../tools/face-reading/two-view/whole-face-source-mapping-audit.mjs';
const markdown = readFileSync(
  'research/face-reading/whole-face-feature-mapping-20261105.md',
  'utf8',
);
const input = () => ({
  mappingMarkdown: markdown,
  columns: FR293_PRODUCT_COLUMN_MAP,
  authorityEntries: FR282_RGB_SELFIE_FEATURE_ENTRIES,
  hardGaps: FR294_HARD_GAP_FRONTIER,
  readingItems: readingCatalogue().items,
  browEnvelopeVersion: VISIBLE_BROW_MASK_ENVELOPE_VERSION,
  sourceExists: (path: string) => existsSync(path),
});
describe('source-backed whole-face 29+18 roadmap mapping', () => {
  it('keeps the committed human-readable source mapping report synchronized', () => {
    const report = auditWholeFaceSourceMapping(input());
    const rendered = renderWholeFaceMappingAuditMarkdown(report);
    const target = 'research/face-reading/whole-face-source-implementation-audit-20261108.md';
    if (process.env['UPDATE_WHOLE_FACE_SOURCE_AUDIT'] === '1') {
      writeFileSync(target, rendered, 'utf8');
    }
    expect(readFileSync(target, 'utf8').replace(/\r\n/g, '\n')).toBe(rendered);
    expect(rendered).toContain('정규 29개');
    expect(rendered).toContain('추가 18개');
    expect(rendered).toContain('미간 실제 눈썹 사이 거리');
  });
  it('audits all approved 29, keeps 18 calculators and 11 unresolved distinct', () => {
    const a = auditWholeFaceSourceMapping(input());
    expect(a).toMatchObject({
      schemaVersion: WHOLE_FACE_MAPPING_AUDIT_VERSION,
      canonicalFeatureCount: 29,
      materializedCalculatorCount: 18,
      unavailableOrNewExtractorCount: 11,
      unapprovedExtensionCount: 18,
      traditionalPredicatesMapped: 0,
      photoExtractionAccuracyValidated: false,
      productInterpretationAuthorized: false,
    });
    expect(a.canonical).toHaveLength(29);
    expect(
      a.canonical.every(
        (row) =>
          row.photoExtractionValidated === false &&
          row.morphologyPredicateMapped === false &&
          row.traditionalBindingAuthorized === false,
      ),
    ).toBe(true);
    expect(a.extensions.every((row) => row.extensionAdmitted === false)).toBe(true);
    expect(new Set(a.canonical.map((row) => row.featureKey)).size).toBe(29);
  });
  it('connects the already implemented brow mask gap only as a noncanonical candidate', () => {
    const a = auditWholeFaceSourceMapping(input());
    const gap = a.extensions.find((row) => row.requirement === '미간 실제 눈썹 사이 거리');
    expect(gap?.existingResearchCandidate).toMatchObject({
      outputField: 'apparentInterBrowGapToMeanMaskXSpan',
      candidateOnly: true,
      actualInnerBrowGroundTruthValidated: false,
    });
    expect(gap?.relatedCanonicalKeys).toContain('eyebrow.span_arch_tail_orientation');
    expect(gap?.relatedCanonicalKeys).toContain('eye.inter_eye_spacing_ratio');
    expect(
      a.canonical.find((row) => row.featureKey === 'eye.inter_eye_spacing_ratio')
        ?.calculatorMaterialized,
    ).toBe(true);
  });
  it('keeps historical catalogue as region context only, not valid F1 predicates', () => {
    const a = auditWholeFaceSourceMapping(input());
    expect(
      a.canonical.map((row) => row.sourceRegionContext).filter((x, i, all) => all.indexOf(x) === i),
    ).toHaveLength(8);
    const forehead = a.canonical.find((row) => row.featureKey === 'forehead.visible_width_shape');
    expect(forehead).toMatchObject({
      hardGapLane: 'new_image_model',
      sourceRegionContext: 'forehead',
      morphologyPredicateMapped: false,
    });
    const ear = a.canonical.find(
      (row) => row.featureKey === 'ear.thickness_attachment_canal_boundary',
    );
    expect(ear).toMatchObject({
      hardGapLane: 'remain_unavailable',
      photoExtractionValidated: false,
    });
    expect(a.canonical.every((row) => typeof row.sourceVerificationState === 'string')).toBe(true);
  });
  it('rejects doc, calculator, FR294 or source-region authority drift', () => {
    const a = input();
    a.mappingMarkdown = a.mappingMarkdown.replace(
      'forehead.visible_width_shape',
      'forehead.unknown_width_shape',
    );
    expect(() => auditWholeFaceSourceMapping(a)).toThrow('WHOLE_FACE_MAPPING_AUDIT_INVALID');
    const b = input();
    b.columns = [
      { ...FR293_PRODUCT_COLUMN_MAP[0], outputType: 'scalar_ratio' },
      ...FR293_PRODUCT_COLUMN_MAP.slice(1),
    ] as unknown as typeof FR293_PRODUCT_COLUMN_MAP;
    expect(() => auditWholeFaceSourceMapping(b)).toThrow();
    const c = { ...input(), hardGaps: FR294_HARD_GAP_FRONTIER.slice(1) };
    expect(() => auditWholeFaceSourceMapping(c)).toThrow();
    const d = input();
    d.readingItems = [
      { ...readingCatalogue().items[0], traditionalBindingAuthorized: true },
      ...readingCatalogue().items.slice(1),
    ] as typeof d.readingItems;
    expect(() => auditWholeFaceSourceMapping(d)).toThrow();
  });
  it('reports missing primitive paths instead of declaring all code inputs implemented', () => {
    const a = auditWholeFaceSourceMapping({
      ...input(),
      sourceExists: (path: string) => (path.endsWith('fr207.ts') ? false : existsSync(path)),
    });
    expect(a.missingReferencedSourceFileCount).toBeGreaterThan(0);
    expect(
      a.canonical.some((row) => row.missingSourcePaths.some((path) => path.endsWith('fr207.ts'))),
    ).toBe(true);
    expect(a.photoExtractionAccuracyValidated).toBe(false);
  });
  it('works with CRLF mapping specs and does not expose private capture data', () => {
    const a = auditWholeFaceSourceMapping(input());
    const crlf = auditWholeFaceSourceMapping({
      ...input(),
      mappingMarkdown: markdown.replace(/\r?\n/g, '\r\n'),
    });
    expect(crlf).toEqual(a);
    expect(JSON.stringify(a)).not.toMatch(/capture-01|sourceSha256|rawLandmarks|maskBuffer/);
  });
});
