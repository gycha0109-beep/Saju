import { describe, expect, it } from 'vitest';
import {
  R128_ADJUDICATION_CASES,
  R128_AUTHORITY,
  R128_COMPARISON_GROUPS,
  R128_CROSS_SURFACE_STRENGTH_ADJUDICATION_VERSION,
  R128_REJECTED_DERIVATIONS,
  R128_SUMMARY,
} from '../src/research/general-natal-cross-surface-borderline-strength-adjudication.js';

describe('R128 cross-surface borderline-strength adjudication', () => {
  it('publishes the intended corpus', () => {
    expect(R128_CROSS_SURFACE_STRENGTH_ADJUDICATION_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R128_ADJUDICATION_CASES).toHaveLength(24);
    expect(R128_COMPARISON_GROUPS).toHaveLength(11);
    expect(R128_SUMMARY.caseCount).toBe(24);
    expect(R128_SUMMARY.comparisonGroupCount).toBe(11);
    expect(new Set(R128_ADJUDICATION_CASES.map((row) => row.caseId)).size).toBe(
      24,
    );
  });

  it('keeps every row fully auditable', () => {
    for (const row of R128_ADJUDICATION_CASES) {
      expect(row.canonicalCaseFingerprint.length).toBeGreaterThan(0);
      expect(row.sourceSurfaceA.length).toBeGreaterThan(0);
      expect(row.sourceSurfaceB.length).toBeGreaterThan(0);
      expect(row.sourceStratumA.length).toBeGreaterThan(0);
      expect(row.sourceStratumB.length).toBeGreaterThan(0);
      expect(row.sourceRefs.length).toBeGreaterThan(0);
      expect(row.sourceAStatement.length).toBeGreaterThan(0);
      expect(row.sourceBStatement.length).toBeGreaterThan(0);
      expect(row.sourceStatement.length).toBeGreaterThan(0);
      expect(row.interpretiveReading.length).toBeGreaterThan(0);
      expect(row.researchInference.length).toBeGreaterThan(0);
      expect(row.prohibitedExtensions.length).toBeGreaterThan(0);
    }
  });

  it('has enough exact or near case comparisons', () => {
    const exactOrNear = R128_ADJUDICATION_CASES.filter(
      (row) =>
        row.caseMatchQuality === 'EXACT_TEXTUAL_SAME_CASE' ||
        row.caseMatchQuality === 'NEAR_IDENTICAL_CASE_VARIANT',
    );
    expect(exactOrNear.length).toBeGreaterThanOrEqual(6);
  });

  it('reports zero direct same-case label conflicts', () => {
    expect(R128_SUMMARY.directLabelConflictCount).toBe(0);
    expect(
      R128_ADJUDICATION_CASES.some(
        (row) => row.divergenceType === 'DIRECT_LABEL_CONFLICT',
      ),
    ).toBe(false);
  });

  it('finds multiple predicate and source-policy divergences', () => {
    expect(R128_SUMMARY.predicateDivergenceCount).toBeGreaterThanOrEqual(4);
    expect(R128_SUMMARY.sourcePolicyDivergenceCount).toBeGreaterThanOrEqual(3);
  });

  it('keeps spring-Wood agreement distinct from exact same-case replication', () => {
    const row = R128_ADJUDICATION_CASES.find(
      (candidate) => candidate.caseId === 'R128-C01-SPRING-WOOD-XU-REN',
    );

    expect(row).toMatchObject({
      caseMatchQuality: 'NEAR_IDENTICAL_CASE_VARIANT',
      sourceANativeLabel: '不旺',
      sourceBNativeLabel: '不旺',
      agreementType: 'EXACT_LABEL_AGREEMENT',
      divergenceType: 'MATERIAL_CASE_VARIANT',
      textualDependency: 'TEXTUAL_DEPENDENCY_RISK_HIGH',
      independenceStatus: 'INDEPENDENCE_NOT_ESTABLISHED',
    });
    expect(row?.variantFacts).toContain('Xu: 支酉丑');
    expect(row?.variantFacts).toContain('Ren: 支申酉');
  });

  it('keeps autumn-Wood label agreement separate from rationale identity', () => {
    const row = R128_ADJUDICATION_CASES.find(
      (candidate) => candidate.caseId === 'R128-C02-AUTUMN-WOOD-XU-REN',
    );

    expect(row).toMatchObject({
      sourceANativeLabel: '不弱',
      sourceBNativeLabel: '不弱',
      agreementType: 'EXACT_LABEL_AGREEMENT',
      divergenceType: 'RATIONALE_DIVERGENCE',
      labelComparable: true,
      predicateComparable: true,
    });
  });

  it('does not normalize source-native strength vocabulary into one binary axis', () => {
    const row = R128_ADJUDICATION_CASES.find(
      (candidate) =>
        candidate.caseId === 'R128-C03-WANGSHUAI-QIANGRUO-VOCABULARY',
    );

    expect(row).toMatchObject({
      divergenceType: 'LABEL_VOCABULARY_DIFFERENCE',
      labelComparable: false,
      classifierRisk: 'HIGH',
    });
    for (const rejected of [
      'WANG_EQUALS_QIANG',
      'SHUAI_EQUALS_RUO',
      'NOT_WANG_EQUALS_RUO',
      'NOT_RUO_EQUALS_QIANG',
    ]) {
      expect(R128_REJECTED_DERIVATIONS).toContain(rejected);
    }
  });

  it('preserves root-comparison agreement without inventing cardinal reconciliation', () => {
    for (const caseId of [
      'R128-C04-ONE-PEER-VS-MUKU',
      'R128-C05-TWO-PEERS-VS-YUQI',
      'R128-C06-PEERS-VS-CHANGSHENG-LU',
      'R128-C07-DRY-STEMS-VS-ROOT-METAPHOR',
    ]) {
      const row = R128_ADJUDICATION_CASES.find(
        (candidate) => candidate.caseId === caseId,
      );
      expect(row?.predicateComparable).toBe(true);
      expect(row?.numericReconciliationAuthorized).toBe(false);
    }
  });

  it('marks Yin-Muku cross-surface and internal-stratum forks as blocking', () => {
    const crossSurface = R128_ADJUDICATION_CASES.find(
      (row) => row.caseId === 'R128-C09-YIN-MUKU-XU-REN',
    );
    const internal = R128_ADJUDICATION_CASES.find(
      (row) => row.caseId === 'R128-C10-YIN-MUKU-INTERNAL-STRATUM',
    );

    expect(crossSurface).toMatchObject({
      divergenceType: 'PREDICATE_DIVERGENCE',
      classifierRisk: 'BLOCKING',
      majorityVoteAuthorized: false,
    });
    expect(internal).toMatchObject({
      divergenceType: 'SOURCE_POLICY_DIVERGENCE',
      textualDependency: 'DIRECT_INTERNAL_STRATUM_RELATION',
      independenceStatus: 'NOT_INDEPENDENT',
      classifierRisk: 'BLOCKING',
    });
  });

  it('keeps Yang Changsheng agreement from resolving Yin Changsheng', () => {
    const yang = R128_ADJUDICATION_CASES.find(
      (row) => row.caseId === 'R128-C11-YANG-CHANGSHENG',
    );
    const yin = R128_ADJUDICATION_CASES.find(
      (row) => row.caseId === 'R128-C12-YIN-CHANGSHENG',
    );

    expect(yang).toMatchObject({
      agreementType: 'QUALIFIED_AGREEMENT',
      divergenceType: 'SCOPE_DIVERGENCE',
    });
    expect(yin).toMatchObject({
      agreementType: 'NO_DIRECT_LABEL_COMPARISON',
      divergenceType: 'SOURCE_POLICY_DIVERGENCE',
      classifierRisk: 'BLOCKING',
    });
  });

  it('separates month importance from exclusive month authority', () => {
    const importance = R128_ADJUDICATION_CASES.find(
      (row) => row.caseId === 'R128-C13-MONTH-IMPORTANCE',
    );
    const antiRigidity = R128_ADJUDICATION_CASES.find(
      (row) => row.caseId === 'R128-C14-MONTH-ANTI-RIGIDITY',
    );

    expect(importance).toMatchObject({
      agreementType: 'QUALIFIED_AGREEMENT',
      divergenceType: 'SCOPE_DIVERGENCE',
    });
    expect(antiRigidity).toMatchObject({
      agreementType: 'QUALIFIED_AGREEMENT',
      divergenceType: 'NONE',
      classifierRisk: 'LOW',
    });
  });

  it('preserves Yuqi temporal and cardinal policy differences', () => {
    const temporal = R128_ADJUDICATION_CASES.find(
      (row) => row.caseId === 'R128-C15-YUQI-GENERAL-VS-TEMPORAL',
    );
    const cardinal = R128_ADJUDICATION_CASES.find(
      (row) => row.caseId === 'R128-C16-YUQI-PEER-CARDINALITY',
    );

    expect(temporal).toMatchObject({
      divergenceType: 'SOURCE_POLICY_DIVERGENCE',
      classifierRisk: 'HIGH',
    });
    expect(cardinal).toMatchObject({
      divergenceType: 'PREDICATE_DIVERGENCE',
      numericReconciliationAuthorized: false,
      classifierRisk: 'HIGH',
    });
  });

  it('does not turn analogous general principles into second exact labels', () => {
    for (const caseId of [
      'R128-C17-FOUR-XIN-EXACT-VS-GENERAL',
      'R128-C18-FOUR-BING-EXACT-VS-GENERAL',
    ]) {
      const row = R128_ADJUDICATION_CASES.find(
        (candidate) => candidate.caseId === caseId,
      );
      expect(row).toMatchObject({
        caseMatchQuality: 'ANALOGOUS_PREDICATE_ONLY',
        sourceBNativeLabel: null,
        agreementType: 'NO_DIRECT_LABEL_COMPARISON',
      });
    }
  });

  it('keeps support-family coverage and resource mechanism separate', () => {
    const coverage = R128_ADJUDICATION_CASES.find(
      (row) => row.caseId === 'R128-C19-SUPPORT-FAMILY-COVERAGE',
    );
    const mechanism = R128_ADJUDICATION_CASES.find(
      (row) => row.caseId === 'R128-C20-RESOURCE-MECHANISM-CROSS-SURFACE',
    );

    expect(coverage).toMatchObject({
      comparisonFamily: 'SUPPORT_FAMILY',
      divergenceType: 'SCOPE_DIVERGENCE',
    });
    expect(mechanism).toMatchObject({
      comparisonFamily: 'SUPPORT_FAMILY',
      divergenceType: 'RATIONALE_DIVERGENCE',
      numericReconciliationAuthorized: false,
    });
  });

  it('keeps challenging collector direction non-conclusive across source-local cases', () => {
    for (const caseId of [
      'R128-C21-I13-OUTPUT-VS-USEFUL-LEAKAGE',
      'R128-C22-I13-WEALTH-VS-CAPACITY',
    ]) {
      const row = R128_ADJUDICATION_CASES.find(
        (candidate) => candidate.caseId === caseId,
      );
      expect(row).toMatchObject({
        comparisonFamily: 'CHALLENGING_SIDE',
        textualDependency: 'REPOSITORY_METHOD_VS_SOURCE',
        independenceStatus: 'REPOSITORY_METHOD_SURFACE',
        finalStrengthAuthorityAuthorized: false,
      });
    }
  });

  it('treats repeated text and title-only witnesses as non-votes', () => {
    const dependency = R128_ADJUDICATION_CASES.find(
      (row) => row.caseId === 'R128-C23-TEXTUAL-DEPENDENCY-NO-VOTE',
    );
    const compilation = R128_ADJUDICATION_CASES.find(
      (row) => row.caseId === 'R128-C24-COMPILATION-WITNESS-NOT-VOTE',
    );

    expect(dependency).toMatchObject({
      textualDependency: 'TEXTUAL_DEPENDENCY_RISK_HIGH',
      independenceStatus: 'INDEPENDENCE_NOT_ESTABLISHED',
      majorityVoteAuthorized: false,
    });
    expect(compilation).toMatchObject({
      caseMatchQuality: 'NOT_COMPARABLE',
      independenceStatus: 'NOT_INDEPENDENT',
      agreementType: 'NOT_COMPARABLE',
      majorityVoteAuthorized: false,
    });
  });

  it('never authorizes majority vote, automatic synthesis, numeric reconciliation, or final authority', () => {
    expect(R128_SUMMARY.independenceEstablishedCount).toBe(0);
    expect(R128_SUMMARY.majorityVoteAuthorizedCount).toBe(0);
    expect(R128_SUMMARY.automaticSynthesisAuthorizedCount).toBe(0);
    expect(R128_SUMMARY.numericReconciliationAuthorizedCount).toBe(0);

    expect(
      R128_ADJUDICATION_CASES.every(
        (row) =>
          row.majorityVoteAuthorized === false &&
          row.automaticSynthesisAuthorized === false &&
          row.numericReconciliationAuthorized === false &&
          row.finalStrengthAuthorityAuthorized === false,
      ),
    ).toBe(true);
  });

  it('locks source-count and consensus shortcuts closed', () => {
    for (const rejected of [
      'SOURCE_COUNT_EQUALS_VOTE_COUNT',
      'TEXTUAL_DUPLICATE_EQUALS_INDEPENDENT_CORROBORATION',
      'SAME_LABEL_EQUALS_SAME_REASONING',
      'DIFFERENT_WORDING_EQUALS_DIFFERENT_ADJUDICATION',
      'SHARED_CASE_SCAFFOLD_EQUALS_EXACT_SAME_CASE',
      'MAJORITY_SOURCE_COUNT_EQUALS_CANONICAL_TRUTH',
      'XU_PLUS_REN_EQUALS_CROSS_SCHOOL_CONSENSUS',
      'MAJORITY_VOTE_EQUALS_PRODUCTION_AUTHORITY',
    ]) {
      expect(R128_REJECTED_DERIVATIONS).toContain(rejected);
    }
  });

  it('preserves the research-only authority boundary', () => {
    expect(R128_AUTHORITY).toEqual({
      status: 'RESEARCH_CROSS_SURFACE_BORDERLINE_STRENGTH_ADJUDICATION_COMPLETE',
      researchOnly: true,
      crossSurfaceComparisonObserved: true,
      sharedBroadPrinciplesObserved: true,
      materialTextualVariantsObserved: true,
      predicateLevelDivergenceObserved: true,
      sourcePolicyDivergenceObserved: true,
      textualDependencyRiskMaterial: true,
      exactIndependentSchoolAgreementEstablished: false,
      directSameCaseOppositeStrengthLabelsEstablished: false,
      independentTraditionCountSettled: false,
      majorityVoteAdjudicationAuthorized: false,
      automaticCrossSurfaceSynthesisAuthorized: false,
      numericReconciliationAuthorized: false,
      canonicalWinningSourceSelected: false,
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
