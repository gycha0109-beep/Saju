import { describe, expect, it } from 'vitest';
import {
  FACE_DIRECT_RULE_EVIDENCE_FR311J,
  FACE_NAMED_FORM_EVIDENCE_FR311J,
} from './traditional-face-evidence-index-fr311j.js';
import {
  FACE_EVIDENCE_LENSES_FR311J,
} from './traditional-face-evidence-query-fr311j.js';
import {
  queryFaceEvidenceFR311O,
} from './traditional-face-evidence-query-fr311o.js';
import {
  FACE_CANONICAL_EVIDENCE_FR311P,
  FR311P_EVIDENCE_INVENTORY,
  LENS_UNMAPPED_CANONICAL_EVIDENCE_IDS_FR311P,
  UNMAPPED_TOPIC_KEYS_FR311P,
} from './traditional-face-evidence-integrity-fr311p.js';
import {
  FACE_LENS_GAP_ADJUDICATIONS_FR311Q,
  FR311Q_AUTHORITY_BOUNDARY,
  FR311Q_GAP_SUMMARY,
  assertFaceLensGapAdjudicationFR311Q,
} from './traditional-face-lens-gap-adjudication-fr311q.js';

describe('FR311Q lens-gap adjudication', () => {
  it('adjudicates every FR311P gap exactly once', () => {
    assertFaceLensGapAdjudicationFR311Q();

    expect(FR311Q_GAP_SUMMARY).toMatchObject({
      totalGapEvidence: 28,
      namedClaims: 25,
      directRules: 3,
      intelligence: 8,
      ability: 1,
      sexuality: 4,
      longevityMortality: 5,
      wealthStatus: 10,
      existingLensMappings: 0,
      newExactCompoundLensRequired: 10,
      permanentlyUnsupportedProductQuery: 18,
      familyIsUnmappedToken: true,
      familyGapEvidence: 0,
    });

    expect(
      new Set(FACE_LENS_GAP_ADJUDICATIONS_FR311Q.map((item) => item.evidenceId)).size,
    ).toBe(28);
    expect(
      [...FACE_LENS_GAP_ADJUDICATIONS_FR311Q.map((item) => item.evidenceId)].sort(),
    ).toEqual([...LENS_UNMAPPED_CANONICAL_EVIDENCE_IDS_FR311P].sort());
  });

  it('keeps every adjudication tied to a canonical source-backed evidence record', () => {
    for (const item of FACE_LENS_GAP_ADJUDICATIONS_FR311Q) {
      const canonical = FACE_CANONICAL_EVIDENCE_FR311P.find(
        (candidate) => candidate.canonicalId === item.evidenceId,
      );
      expect(canonical, item.evidenceId).toBeDefined();
      expect(canonical?.owner, item.evidenceId).toBe('fr311j');
      expect(item.sourceRefs.length, item.evidenceId).toBeGreaterThan(0);
      expect(item.sourceExpression.length, item.evidenceId).toBeGreaterThan(0);
      expect(item.meaningSummary.length, item.evidenceId).toBeGreaterThan(0);
    }
  });

  it('approves no implicit existing-lens remap', () => {
    expect(FACE_EVIDENCE_LENSES_FR311J).toHaveLength(21);
    expect(FR311Q_GAP_SUMMARY.existingLensMappings).toBe(0);

    for (const item of FACE_LENS_GAP_ADJUDICATIONS_FR311Q) {
      expect(item.existingLensMappingApproved, item.evidenceId).toBe(false);
      expect(item.automaticTopicRemappingAuthorized, item.evidenceId).toBe(false);
    }
  });

  it('keeps wealth_status intact as an exact compound-lens requirement without activating it', () => {
    const items = FACE_LENS_GAP_ADJUDICATIONS_FR311Q.filter(
      (item) => item.topicKey === 'wealth_status',
    );

    expect(items).toHaveLength(10);
    expect(items.filter((item) => item.evidenceKind === 'named_claim')).toHaveLength(7);
    expect(items.filter((item) => item.evidenceKind === 'direct_rule')).toHaveLength(3);

    for (const item of items) {
      expect(item.disposition, item.evidenceId).toBe('new_exact_compound_lens_required');
      expect(item.targetLensKey, item.evidenceId).toBe('wealth_status');
      expect(item.reasonCode, item.evidenceId).toBe(
        'preserve_wealth_status_compound_without_split',
      );
      expect(item.wealthStatusSplitAuthorized, item.evidenceId).toBe(false);
      expect(item.newLensActivationAuthorized, item.evidenceId).toBe(false);
      expect(item.productQueryAuthorized, item.evidenceId).toBe(false);
    }
  });

  it('keeps intelligence and ability out of face-wide product query', () => {
    const items = FACE_LENS_GAP_ADJUDICATIONS_FR311Q.filter(
      (item) => item.topicKey === 'intelligence' || item.topicKey === 'ability',
    );

    expect(items).toHaveLength(9);
    for (const item of items) {
      expect(item.disposition, item.evidenceId).toBe(
        'permanently_unsupported_product_query',
      );
      expect(item.targetLensKey, item.evidenceId).toBeNull();
      expect(item.intelligenceInferenceAuthorized, item.evidenceId).toBe(false);
      expect(item.abilityInferenceAuthorized, item.evidenceId).toBe(false);
      expect(item.productQueryAuthorized, item.evidenceId).toBe(false);
      expect(item.historicalResearchRetentionAuthorized, item.evidenceId).toBe(true);
    }
  });

  it('keeps sexuality claims research-only and permanently unsupported for face query', () => {
    const items = FACE_LENS_GAP_ADJUDICATIONS_FR311Q.filter(
      (item) => item.topicKey === 'sexuality',
    );

    expect(items).toHaveLength(4);
    for (const item of items) {
      expect(item.disposition, item.evidenceId).toBe(
        'permanently_unsupported_product_query',
      );
      expect(item.reasonCode, item.evidenceId).toBe('sexuality_inference_boundary');
      expect(item.sexualityInferenceAuthorized, item.evidenceId).toBe(false);
      expect(item.productQueryAuthorized, item.evidenceId).toBe(false);
    }
  });

  it('does not collapse mortality claims into the longevity lens', () => {
    const items = FACE_LENS_GAP_ADJUDICATIONS_FR311Q.filter(
      (item) => item.topicKey === 'longevity_mortality',
    );

    expect(items).toHaveLength(5);
    for (const item of items) {
      expect(item.disposition, item.evidenceId).toBe(
        'permanently_unsupported_product_query',
      );
      expect(item.reasonCode, item.evidenceId).toBe('mortality_prediction_boundary');
      expect(item.mortalityToLongevityCollapseAuthorized, item.evidenceId).toBe(false);
      expect(item.mortalityPredictionAuthorized, item.evidenceId).toBe(false);
      expect(item.productQueryAuthorized, item.evidenceId).toBe(false);
    }
  });

  it('distinguishes the family token from the 28 fully lens-unmapped evidence records', () => {
    expect(UNMAPPED_TOPIC_KEYS_FR311P).toContain('family');
    expect(
      FACE_LENS_GAP_ADJUDICATIONS_FR311Q.some(
        (item) => (item.topicKey as string) === 'family',
      ),
    ).toBe(false);

    const familyCanonical = FACE_CANONICAL_EVIDENCE_FR311P.filter(
      (item) => item.topicKeys.includes('family'),
    );
    expect(familyCanonical.length).toBeGreaterThan(0);
    for (const item of familyCanonical) {
      expect(
        item.topicKeys.some((topic) =>
          FACE_EVIDENCE_LENSES_FR311J.some(
            (lens) =>
              lens.topicKeys.includes(topic) ||
              lens.ruleTopicKeys.includes(topic),
          )),
        item.canonicalId,
      ).toBe(true);
      expect(LENS_UNMAPPED_CANONICAL_EVIDENCE_IDS_FR311P).not.toContain(
        item.canonicalId,
      );
    }
  });

  it('does not alter the FR311P frozen baseline or activate a 22nd lens', () => {
    expect(FR311P_EVIDENCE_INVENTORY.canonicalEvidence).toBe(621);
    expect(FR311P_EVIDENCE_INVENTORY.lensUnmappedEvidence).toBe(28);
    expect(FACE_EVIDENCE_LENSES_FR311J).toHaveLength(21);
  });

  it('keeps all 28 gap records unreachable through current 21 lenses even with exact ids', () => {
    for (const item of FACE_LENS_GAP_ADJUDICATIONS_FR311Q) {
      const named = FACE_NAMED_FORM_EVIDENCE_FR311J.find(
        (candidate) => candidate.evidenceId === item.evidenceId,
      );
      const direct = FACE_DIRECT_RULE_EVIDENCE_FR311J.find(
        (candidate) => candidate.evidenceId === item.evidenceId,
      );

      for (const lens of FACE_EVIDENCE_LENSES_FR311J) {
        const result = queryFaceEvidenceFR311O({
          lensKey: lens.lensKey,
          ...(named === undefined ? {} : { formKeys: [named.formKey] }),
          ...(direct === undefined ? {} : { traditionalRuleIds: [direct.ruleId] }),
        });

        expect(result.namedEvidenceIds, item.evidenceId).not.toContain(item.evidenceId);
        if (direct !== undefined) {
          expect(result.directRuleIds, item.evidenceId).not.toContain(direct.ruleId);
        }
      }
    }
  });

  it('keeps every FR311Q authority boundary closed', () => {
    for (const [key, flag] of Object.entries(FR311Q_AUTHORITY_BOUNDARY)) {
      expect(flag, key).toBe(false);
    }
  });
});
