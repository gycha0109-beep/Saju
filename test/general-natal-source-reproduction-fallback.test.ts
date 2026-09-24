import { describe, expect, it } from 'vitest';
import {
  R101_AUTHORITY,
  R101_EVIDENCE_USE_POLICIES,
  R101_FALLBACK_RELATIONSHIPS,
  R101_NON_EQUIVALENCE_INVARIANTS,
  R101_REQUIRED_ASSERTION_FIELDS,
  R101_RETROSPECTIVE_CASES,
  R101_SOURCE_REPRODUCTION_FALLBACK_VERSION,
} from '../src/research/general-natal-source-reproduction-fallback.js';

describe('R101 source reproduction fallback protocol', () => {
  it('defines the required relationship states without collapsing witness identity', () => {
    expect(R101_SOURCE_REPRODUCTION_FALLBACK_VERSION).toBe('0.1.0-research');
    expect(R101_FALLBACK_RELATIONSHIPS).toEqual([
      'EXACT_TARGET_REPRODUCTION',
      'SAME_EDITION_DIFFERENT_COPY',
      'SAME_LINEAGE_DIFFERENT_EDITION',
      'DERIVATIVE_OCR_OR_TRANSCRIPTION',
      'UNRESOLVED_RELATIONSHIP',
    ]);
    expect(new Set(R101_FALLBACK_RELATIONSHIPS).size).toBe(
      R101_FALLBACK_RELATIONSHIPS.length,
    );
  });

  it('allows exact target closure only through exact target direct inspection', () => {
    const exact = R101_EVIDENCE_USE_POLICIES.find(
      (policy) => policy.relationship === 'EXACT_TARGET_REPRODUCTION',
    );
    expect(exact).toMatchObject({
      mayAidLocator: true,
      mayCorroborateTextWithinDeclaredScope: true,
      mayEstablishExactTargetGlyph: true,
      mayEstablishExactTargetPage: true,
      mayEstablishEditionIdentity: true,
      mayCloseDirectInspectionRequirement: true,
      requiresR097DirectInspectionForExactGlyphOrPage: true,
    });
  });

  it('keeps same-edition different-copy evidence below target-copy glyph/page authority', () => {
    const sameEdition = R101_EVIDENCE_USE_POLICIES.find(
      (policy) => policy.relationship === 'SAME_EDITION_DIFFERENT_COPY',
    );
    expect(sameEdition).toMatchObject({
      mayAidLocator: true,
      mayCorroborateTextWithinDeclaredScope: true,
      mayEstablishExactTargetGlyph: false,
      mayEstablishExactTargetPage: false,
      mayEstablishEditionIdentity: true,
      mayCloseDirectInspectionRequirement: false,
    });
  });

  it('keeps lineage-level evidence below edition identity and direct inspection', () => {
    const lineage = R101_EVIDENCE_USE_POLICIES.find(
      (policy) => policy.relationship === 'SAME_LINEAGE_DIFFERENT_EDITION',
    );
    expect(lineage).toMatchObject({
      mayAidLocator: true,
      mayCorroborateTextWithinDeclaredScope: true,
      mayEstablishExactTargetGlyph: false,
      mayEstablishExactTargetPage: false,
      mayEstablishEditionIdentity: false,
      mayCloseDirectInspectionRequirement: false,
    });
  });

  it('treats OCR and transcription as locator/corroboration derivatives only', () => {
    const derivative = R101_EVIDENCE_USE_POLICIES.find(
      (policy) => policy.relationship === 'DERIVATIVE_OCR_OR_TRANSCRIPTION',
    );
    expect(derivative).toMatchObject({
      mayAidLocator: true,
      mayCorroborateTextWithinDeclaredScope: true,
      mayEstablishExactTargetGlyph: false,
      mayEstablishExactTargetPage: false,
      mayEstablishEditionIdentity: false,
      mayCloseDirectInspectionRequirement: false,
    });
    expect(R101_NON_EQUIVALENCE_INVARIANTS).toContain(
      'OCR_OR_TRANSCRIPTION_DOES_NOT_EQUAL_WITNESS_IMAGE',
    );
  });

  it('fails closed when the relationship is unresolved', () => {
    const unresolved = R101_EVIDENCE_USE_POLICIES.find(
      (policy) => policy.relationship === 'UNRESOLVED_RELATIONSHIP',
    );
    expect(unresolved).toMatchObject({
      mayAidLocator: true,
      mayCorroborateTextWithinDeclaredScope: false,
      mayEstablishExactTargetGlyph: false,
      mayEstablishExactTargetPage: false,
      mayEstablishEditionIdentity: false,
      mayCloseDirectInspectionRequirement: false,
    });
  });

  it('requires explicit provenance and allowed/prohibited use records', () => {
    expect(R101_REQUIRED_ASSERTION_FIELDS).toContain('TARGET_WITNESS_REF');
    expect(R101_REQUIRED_ASSERTION_FIELDS).toContain(
      'FALLBACK_WITNESS_OR_DERIVATIVE_REF',
    );
    expect(R101_REQUIRED_ASSERTION_FIELDS).toContain(
      'RELATIONSHIP_EVIDENCE_REFS',
    );
    expect(R101_REQUIRED_ASSERTION_FIELDS).toContain(
      'ALLOWED_EVIDENCE_PURPOSES',
    );
    expect(R101_REQUIRED_ASSERTION_FIELDS).toContain(
      'PROHIBITED_EVIDENCE_PURPOSES',
    );
  });

  it('does not auto-close R006 R007 R008 or R011', () => {
    expect(R101_RETROSPECTIVE_CASES.map((item) => item.frontier)).toEqual([
      'R006',
      'R007',
      'R008',
      'R011',
    ]);
    expect(
      R101_RETROSPECTIVE_CASES.every(
        (item) => item.originalFrontierAutoClosed === false,
      ),
    ).toBe(true);
  });

  it('preserves existing research governance and blocks implicit authority promotion', () => {
    expect(R101_AUTHORITY).toEqual({
      status: 'RESEARCH_FALLBACK_PROTOCOL_CANDIDATE',
      researchOnly: true,
      replacesR091IdentityAuthority: false,
      replacesR095LineageAuthority: false,
      replacesR097InspectionAuthority: false,
      replacesR098PromotionAuthority: false,
      fallbackEvidenceAutoClosesOriginalFrontier: false,
      fallbackEvidenceVerifiesExactTargetGlyph: false,
      fallbackEvidenceVerifiesExactTargetPage: false,
      universalSourceEquivalenceAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
