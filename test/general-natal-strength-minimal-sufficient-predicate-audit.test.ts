import { describe, expect, it } from 'vitest';
import {
  R130_AUTHORITY,
  R130_REJECTED_DERIVATIONS,
  R130_STRENGTH_MINIMAL_SUFFICIENT_PREDICATE_AUDIT_VERSION,
  R130_STRENGTH_PREDICATE_AUDITS,
  R130_SUMMARY,
} from '../src/research/general-natal-strength-minimal-sufficient-predicate-audit.js';
import { R129_STRENGTH_EXPLANATION_PRIMITIVES } from '../src/research/general-natal-nonnumeric-strength-explanation-primitives.js';

describe('R130 strength minimal/sufficient predicate audit', () => {
  it('publishes the intended audit corpus', () => {
    expect(R130_STRENGTH_MINIMAL_SUFFICIENT_PREDICATE_AUDIT_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R130_STRENGTH_PREDICATE_AUDITS).toHaveLength(36);
    expect(R130_SUMMARY.auditCount).toBe(36);
    expect(R130_SUMMARY.familyCount).toBe(12);
    expect(
      new Set(R130_STRENGTH_PREDICATE_AUDITS.map((row) => row.auditId)).size,
    ).toBe(36);
  });

  it('meets the falsification/removal/addition acceptance floor', () => {
    expect(R130_SUMMARY.counterexampleBackedFalsificationCount).toBe(11);
    expect(R130_SUMMARY.removalAuditCount).toBe(31);
    expect(R130_SUMMARY.additionSensitivityAuditCount).toBe(14);
    expect(R130_SUMMARY.circularRuleCount).toBe(3);
    expect(R130_SUMMARY.policyBlockedCount).toBe(3);
    expect(R130_SUMMARY.sourceNativeLabelTargetCount).toBe(15);
  });

  it('keeps each audit fully structured and non-authoritative', () => {
    for (const row of R130_STRENGTH_PREDICATE_AUDITS) {
      expect(row.candidatePredicates.length).toBeGreaterThan(0);
      expect(row.targetMeaning.length).toBeGreaterThan(0);
      expect(row.researchConclusion.length).toBeGreaterThan(0);
      expect(row.prohibitedExtensions.length).toBeGreaterThan(0);
      expect(row.universalRuleAuthorized).toBe(false);
      expect(row.numericRuleAuthorized).toBe(false);
      expect(row.finalClassifierAuthorized).toBe(false);
    }
  });

  it('validates every R129 primitive predicate reference against the R129 inventory', () => {
    const r129Ids = new Set(
      R129_STRENGTH_EXPLANATION_PRIMITIVES.map((row) => row.primitiveId),
    );

    for (const row of R130_STRENGTH_PREDICATE_AUDITS) {
      for (const predicate of row.candidatePredicates) {
        if (predicate.origin === 'R129_PRIMITIVE') {
          expect(r129Ids.has(predicate.predicateId)).toBe(true);
        }
      }
    }
  });

  it('falsifies season-only final-label rules with direct counterexamples', () => {
    const favorable = R130_STRENGTH_PREDICATE_AUDITS.find(
      (row) => row.auditId === 'R130-A01-DE-SHI-IMPLIES-WANG',
    );
    const unfavorable = R130_STRENGTH_PREDICATE_AUDITS.find(
      (row) => row.auditId === 'R130-A02-SHI-SHI-IMPLIES-RUO',
    );

    expect(favorable).toMatchObject({
      targetNativeLabel: '旺',
      sufficiencyStatus: 'FALSIFIED_BY_COUNTEREXAMPLE',
      disposition: 'FALSIFIED',
    });
    expect(unfavorable).toMatchObject({
      targetNativeLabel: '弱',
      sufficiencyStatus: 'FALSIFIED_BY_COUNTEREXAMPLE',
      disposition: 'FALSIFIED',
    });
  });

  it('blocks silent source-native label normalization', () => {
    for (const auditId of [
      'R130-A03-NOT-WANG-NORMALIZES-TO-RUO',
      'R130-A04-NOT-RUO-NORMALIZES-TO-QIANG',
      'R130-A05-WANG-NORMALIZES-TO-QIANG',
      'R130-A06-SHUAI-NORMALIZES-TO-RUO',
    ]) {
      const row = R130_STRENGTH_PREDICATE_AUDITS.find(
        (candidate) => candidate.auditId === auditId,
      );
      expect(row).toMatchObject({
        targetKind: 'NORMALIZATION_GUARD',
        disposition: 'NORMALIZATION_GUARD',
        nativeLabelPreserved: true,
      });
    }
  });

  it('keeps spring/autumn bundles exact-case-only rather than minimal rules', () => {
    const spring = R130_STRENGTH_PREDICATE_AUDITS.find(
      (row) => row.auditId === 'R130-A07-SPRING-WOOD-BUNDLE-TO-NOT-WANG',
    );
    const autumn = R130_STRENGTH_PREDICATE_AUDITS.find(
      (row) => row.auditId === 'R130-A08-AUTUMN-WOOD-BUNDLE-TO-NOT-RUO',
    );

    expect(spring).toMatchObject({
      targetNativeLabel: '不旺',
      sufficiencyStatus: 'EXACT_CASE_ONLY',
      minimalityStatus: 'NOT_ESTABLISHED',
      disposition: 'EXACT_CASE_ONLY',
    });
    expect(spring?.removalAudits).toHaveLength(3);

    expect(autumn).toMatchObject({
      targetNativeLabel: '不弱',
      sufficiencyStatus: 'EXACT_CASE_ONLY',
      minimalityStatus: 'NOT_ESTABLISHED',
      disposition: 'EXACT_CASE_ONLY',
    });
    expect(autumn?.removalAudits).toHaveLength(4);
  });

  it('uses 四辛卯 / 四丙申 to falsify visible-peer strength shortcuts', () => {
    const repeatedStrong = R130_STRENGTH_PREDICATE_AUDITS.find(
      (row) => row.auditId === 'R130-A09-VISIBLE-PEER-REPETITION-IMPLIES-QIANG',
    );
    const noRootWeak = R130_STRENGTH_PREDICATE_AUDITS.find(
      (row) => row.auditId === 'R130-A10-REPEATED-VISIBLE-NO-ROOT-IMPLIES-RUO',
    );

    expect(repeatedStrong).toMatchObject({
      targetNativeLabel: '強',
      disposition: 'FALSIFIED',
      sufficiencyStatus: 'FALSIFIED_BY_COUNTEREXAMPLE',
    });
    expect(noRootWeak).toMatchObject({
      targetNativeLabel: '弱',
      disposition: 'EXACT_CASE_ONLY',
      sufficiencyStatus: 'EXACT_CASE_ONLY',
      minimalityStatus: 'NOT_ESTABLISHED',
    });
  });

  it('withholds final labels after synthetic root addition', () => {
    for (const auditId of [
      'R130-A11-ONE-ROOT-IMPLIES-QIANG',
      'R130-A12-ONE-ROOT-IMPLIES-NOT-RUO',
    ]) {
      const row = R130_STRENGTH_PREDICATE_AUDITS.find(
        (candidate) => candidate.auditId === auditId,
      );
      expect(row).toMatchObject({
        disposition: 'INSUFFICIENT_EVIDENCE',
        sufficiencyStatus: 'NOT_ESTABLISHED',
        minimalityStatus: 'NOT_ESTABLISHED',
      });
      expect(
        row?.additionAudits.every(
          (entry) => entry.observedEffect === 'TARGET_LABEL_UNRESOLVED',
        ),
      ).toBe(true);
    }
  });

  it('keeps qualitative root classes from becoming final strength predicates', () => {
    const heavy = R130_STRENGTH_PREDICATE_AUDITS.find(
      (row) => row.auditId === 'R130-A13-HEAVY-ROOT-IMPLIES-QIANG',
    );
    const month = R130_STRENGTH_PREDICATE_AUDITS.find(
      (row) => row.auditId === 'R130-A14-MONTH-ROOT-IMPLIES-GLOBAL-OVERRIDE',
    );

    expect(heavy).toMatchObject({
      disposition: 'INSUFFICIENT_EVIDENCE',
      sufficiencyStatus: 'NOT_ESTABLISHED',
    });
    expect(month).toMatchObject({
      disposition: 'FALSIFIED',
      sufficiencyStatus: 'FALSIFIED_BY_COUNTEREXAMPLE',
    });
  });

  it('keeps mixed support bundle observed but not minimal', () => {
    const mixed = R130_STRENGTH_PREDICATE_AUDITS.find(
      (row) => row.auditId === 'R130-A15-MIXED-SUPPORT-BUNDLE-IMPLIES-NOT-RUO',
    );

    expect(mixed).toMatchObject({
      targetNativeLabel: '不弱',
      sufficiencyStatus: 'EXACT_CASE_ONLY',
      minimalityStatus: 'NOT_ESTABLISHED',
      disposition: 'EXACT_CASE_ONLY',
    });
    expect(mixed?.removalAudits).toHaveLength(4);
  });

  it('falsifies peer-strength and support monotonicity shortcuts', () => {
    const peer = R130_STRENGTH_PREDICATE_AUDITS.find(
      (row) => row.auditId === 'R130-A16-PEER-SUPPORT-IMPLIES-QIANG',
    );
    const resourceStrong = R130_STRENGTH_PREDICATE_AUDITS.find(
      (row) => row.auditId === 'R130-A17-RESOURCE-SUPPORT-IMPLIES-QIANG',
    );
    const moreResource = R130_STRENGTH_PREDICATE_AUDITS.find(
      (row) => row.auditId === 'R130-A18-MORE-RESOURCE-ALWAYS-MORE-FAVORABLE',
    );

    expect(peer?.disposition).toBe('FALSIFIED');
    expect(resourceStrong?.disposition).toBe('INSUFFICIENT_EVIDENCE');
    expect(moreResource).toMatchObject({
      disposition: 'FALSIFIED',
      sufficiencyStatus: 'FALSIFIED_BY_COUNTEREXAMPLE',
    });
    expect(moreResource?.additionAudits[0]?.observedEffect).toBe(
      'MONOTONICITY_FALSIFIED_CONTEXTUALLY',
    );
  });

  it('falsifies fixed polarity for output, wealth, control, and resource', () => {
    for (const auditId of [
      'R130-A19-OUTPUT-PRESENT-ALWAYS-ADVERSE',
      'R130-A20-WEALTH-PRESENT-ALWAYS-ADVERSE',
      'R130-A21-CONTROL-PRESENT-ALWAYS-ADVERSE',
      'R130-A22-RESOURCE-PRESENT-ALWAYS-BENEFICIAL',
    ]) {
      const row = R130_STRENGTH_PREDICATE_AUDITS.find(
        (candidate) => candidate.auditId === auditId,
      );
      expect(row).toMatchObject({
        disposition: 'FALSIFIED',
        sufficiencyStatus: 'FALSIFIED_BY_COUNTEREXAMPLE',
      });
      expect(row?.additionAudits.length).toBeGreaterThan(0);
    }
  });

  it('preserves bounded relation-function rules without promoting them to strength rules', () => {
    for (const auditId of [
      'R130-A23-FOOD-CONTROLS-KILL-LOCAL-RULE',
      'R130-A24-FOOD-CONTROL-PLUS-RESOURCE-CONTAMINATION',
      'R130-A25-FOOD-RESOURCE-WEALTH-RESCUE',
    ]) {
      const row = R130_STRENGTH_PREDICATE_AUDITS.find(
        (candidate) => candidate.auditId === auditId,
      );
      expect(row).toMatchObject({
        targetKind: 'RELATION_FUNCTION',
        sufficiencyStatus: 'BOUNDED_SOURCE_RULE_SUPPORTED',
        disposition: 'NON_STRENGTH_RELATION_ONLY',
        finalClassifierAuthorized: false,
      });
    }
  });

  it('marks target leakage as circular rather than sufficient', () => {
    for (const auditId of [
      'R130-A26-CAIDUO-SHENRUO-IMPLIES-RUO',
      'R130-A27-SHENQIANG-KILL-CONTROLLED-IMPLIES-QIANG',
      'R130-A28-CAIWANG-SHENSHUAI-IMPLIES-SHUAI',
    ]) {
      const row = R130_STRENGTH_PREDICATE_AUDITS.find(
        (candidate) => candidate.auditId === auditId,
      );
      expect(row).toMatchObject({
        sufficiencyStatus: 'CIRCULAR_TARGET_LEAKAGE',
        disposition: 'CIRCULAR',
        targetLeakage: true,
        circularityRisk: true,
      });
      expect(
        row?.candidatePredicates.some(
          (predicate) => predicate.origin === 'TARGET_LEAKAGE',
        ),
      ).toBe(true);
    }
  });

  it('admits only bounded non-final Yang Muku / Changsheng / Lu / Wang rules', () => {
    for (const auditId of [
      'R130-A29-YANG-MUKU-IMPLIES-BOUNDED-ROOT',
      'R130-A31-YANG-CHANGSHENG-IMPLIES-HEAVY-ROOT',
      'R130-A33-LU-IMPLIES-BOUNDED-HEAVY-ROOT',
      'R130-A34-WANG-IMPLIES-BOUNDED-HEAVY-ROOT',
    ]) {
      const row = R130_STRENGTH_PREDICATE_AUDITS.find(
        (candidate) => candidate.auditId === auditId,
      );
      expect(row).toMatchObject({
        targetKind: 'ROOT_STATUS',
        sufficiencyStatus: 'BOUNDED_SOURCE_RULE_SUPPORTED',
        disposition: 'BOUNDED_RULE_CANDIDATE',
        finalClassifierAuthorized: false,
      });
    }
  });

  it('fails closed on Yin Muku, Yin Changsheng, and Earth Muku', () => {
    for (const auditId of [
      'R130-A30-YIN-MUKU-IMPLIES-BOUNDED-ROOT',
      'R130-A32-YIN-CHANGSHENG-IMPLIES-HEAVY-ROOT',
      'R130-A35-EARTH-MUKU-IMPLIES-ROOT',
    ]) {
      const row = R130_STRENGTH_PREDICATE_AUDITS.find(
        (candidate) => candidate.auditId === auditId,
      );
      expect(row).toMatchObject({
        sufficiencyStatus: 'POLICY_DEPENDENT',
        minimalityStatus: 'NOT_APPLICABLE',
        disposition: 'POLICY_BLOCKED',
        sourcePolicySensitive: true,
        sourceDependencyRisk: 'POLICY_BLOCKING',
      });
    }
  });

  it('falsifies one timeless Yuqi-lightness predicate', () => {
    const yuqi = R130_STRENGTH_PREDICATE_AUDITS.find(
      (row) => row.auditId === 'R130-A36-YUQI-ALWAYS-FIXED-LIGHT-ROOT',
    );

    expect(yuqi).toMatchObject({
      disposition: 'FALSIFIED',
      sufficiencyStatus: 'FALSIFIED_BY_COUNTEREXAMPLE',
      sourcePolicySensitive: true,
    });
    expect(yuqi?.additionAudits[0]?.observedEffect).toBe(
      'MONOTONICITY_FALSIFIED_CONTEXTUALLY',
    );
  });

  it('reports actual necessity/sufficiency/minimality results rather than inventing them', () => {
    expect(R130_SUMMARY.necessityEstablishedCount).toBe(0);
    expect(R130_SUMMARY.sufficiencyEstablishedCount).toBe(7);
    expect(R130_SUMMARY.minimalityEstablishedCount).toBe(0);
    expect(R130_SUMMARY.exactCaseOnlyCount).toBe(4);
    expect(R130_SUMMARY.insufficientEvidenceCount).toBe(4);
    expect(R130_SUMMARY.boundedRuleCandidateCount).toBe(4);
  });

  it('never authorizes a universal rule, numeric rule, or final classifier', () => {
    expect(R130_SUMMARY.universalRuleAuthorizedCount).toBe(0);
    expect(R130_SUMMARY.numericRuleAuthorizedCount).toBe(0);
    expect(R130_SUMMARY.finalClassifierAuthorizedCount).toBe(0);

    expect(
      R130_STRENGTH_PREDICATE_AUDITS.every(
        (row) =>
          row.universalRuleAuthorized === false &&
          row.numericRuleAuthorized === false &&
          row.finalClassifierAuthorized === false,
      ),
    ).toBe(true);
  });

  it('locks the core research derivation boundaries', () => {
    for (const rejected of [
      'POSITIVE_CASE_EQUALS_SUFFICIENCY_PROOF',
      'SOURCE_CASE_BUNDLE_EQUALS_MINIMAL_PREDICATE_SET',
      'CO_OCCURRENCE_EQUALS_NECESSITY',
      'CO_OCCURRENCE_EQUALS_SUFFICIENCY',
      'SUFFICIENCY_WITHOUT_REMOVAL_AUDIT_EQUALS_MINIMALITY',
      'POLICY_SENSITIVE_PREDICATE_EQUALS_UNIVERSAL_RULE',
      'LOCAL_RELATION_SETTLEMENT_EQUALS_WHOLE_CHART_STRENGTH',
      'TARGET_LEAKAGE_EQUALS_VALID_RULE',
    ]) {
      expect(R130_REJECTED_DERIVATIONS).toContain(rejected);
    }
  });

  it('preserves the final research-only authority boundary', () => {
    expect(R130_AUTHORITY).toEqual({
      status: 'RESEARCH_STRENGTH_MINIMAL_SUFFICIENT_PREDICATE_AUDIT_COMPLETE',
      researchOnly: true,
      candidateRuleAuditComplete: true,
      counterexampleFalsificationOperationalized: true,
      removalAuditOperationalized: true,
      additionSensitivityAuditOperationalized: true,
      circularityGuardOperationalized: true,
      sourcePolicyBlockingOperationalized: true,
      boundedNonFinalPredicateRulesObserved: true,
      globalNecessaryPredicateEstablished: false,
      globalFinalStrengthSufficiencyEstablished: false,
      globalMinimalSufficientStrengthSetEstablished: false,
      numericStrengthRuleAuthorized: false,
      finalQiangRuoClassifierAuthorized: false,
      finalWangShuaiClassifierAuthorized: false,
      automaticAuthorityAdmissionAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
