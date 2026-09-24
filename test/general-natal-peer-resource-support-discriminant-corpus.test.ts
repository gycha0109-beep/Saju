import { describe, expect, it } from 'vitest';
import {
  R125_AUTHORITY,
  R125_COMPARISON_GROUPS,
  R125_DISCRIMINANT_CASES,
  R125_PEER_RESOURCE_DISCRIMINANT_VERSION,
  R125_REJECTED_DERIVATIONS,
  R125_SUMMARY,
} from '../src/research/general-natal-peer-resource-support-discriminant-corpus.js';

describe('R125 peer-support versus resource-support discriminant corpus', () => {
  it('publishes the intended corpus size and comparison groups', () => {
    expect(R125_PEER_RESOURCE_DISCRIMINANT_VERSION).toBe('0.1.0-research');
    expect(R125_DISCRIMINANT_CASES).toHaveLength(18);
    expect(R125_SUMMARY.caseCount).toBe(18);
    expect(R125_SUMMARY.comparisonGroupCount).toBe(9);
    expect(new Set(R125_DISCRIMINANT_CASES.map((row) => row.caseId)).size).toBe(18);
  });

  it('meets family coverage targets', () => {
    expect(R125_SUMMARY.peerOnlyCount).toBeGreaterThanOrEqual(4);
    expect(R125_SUMMARY.resourceOnlyCount).toBeGreaterThanOrEqual(4);
    expect(R125_SUMMARY.mixedOrComparativeCount).toBeGreaterThanOrEqual(4);
  });

  it('separates source statement, interpretation, and inference in every case', () => {
    for (const row of R125_DISCRIMINANT_CASES) {
      expect(row.sourceStatement.length).toBeGreaterThan(0);
      expect(row.interpretiveReading.length).toBeGreaterThan(0);
      expect(row.researchInference.length).toBeGreaterThan(0);
      expect(row.sourceRefs.length).toBeGreaterThan(0);
      expect(row.prohibitedExtensions.length).toBeGreaterThan(0);
    }
  });

  it('preserves shared broad support context without mechanism equivalence', () => {
    const row = R125_DISCRIMINANT_CASES.find(
      (candidate) => candidate.caseId === 'R125-C01-BROAD-DANGZHONG-CONTEXT',
    );

    expect(row).toMatchObject({
      family: 'MIXED_PEER_RESOURCE',
      discriminant: 'BROAD_SUPPORT_CONTEXT',
      equivalenceStatus: 'SAME_BROAD_SUPPORT_CONTEXT',
      peerSupportObserved: true,
      resourceSupportObserved: true,
      mechanismEquivalentAuthorized: false,
      freeSubstitutionAuthorized: false,
      numericEquivalenceAuthorized: false,
    });
  });

  it('preserves distinct mechanism evidence for peer and resource support', () => {
    const peer = R125_DISCRIMINANT_CASES.find(
      (row) => row.caseId === 'R125-C02-PEER-FRIEND-SUPPORT-MECHANISM',
    );
    const resource = R125_DISCRIMINANT_CASES.find(
      (row) => row.caseId === 'R125-C03-RESOURCE-SHENGWO-MECHANISM',
    );

    expect(peer).toMatchObject({
      family: 'PEER_SUPPORT',
      discriminant: 'MECHANISM',
      equivalenceStatus: 'DISTINCT_MECHANISM',
    });
    expect(resource).toMatchObject({
      family: 'RESOURCE_SUPPORT',
      discriminant: 'MECHANISM',
      equivalenceStatus: 'DISTINCT_MECHANISM',
    });
    expect(peer?.mechanismEquivalentAuthorized).toBe(false);
    expect(resource?.mechanismEquivalentAuthorized).toBe(false);
  });

  it('keeps resource-specific 官生印 and 財破印 dependencies separate from peer behavior', () => {
    const guan = R125_DISCRIMINANT_CASES.find(
      (row) => row.caseId === 'R125-C04-RESOURCE-GUAN-SHENG-YIN',
    );
    const cai = R125_DISCRIMINANT_CASES.find(
      (row) => row.caseId === 'R125-C05-RESOURCE-CAI-PO-YIN',
    );

    expect(guan?.family).toBe('RESOURCE_SUPPORT');
    expect(cai?.family).toBe('RESOURCE_SUPPORT');
    expect(guan?.equivalenceStatus).toBe('DISTINCT_MECHANISM');
    expect(cai?.equivalenceStatus).toBe('DISTINCT_MECHANISM');
  });

  it('keeps peer 財 behavior context dependent', () => {
    const adverse = R125_DISCRIMINANT_CASES.find(
      (row) => row.caseId === 'R125-C06-PEER-ZHENGCAI-ADVERSE',
    );
    const remedial = R125_DISCRIMINANT_CASES.find(
      (row) => row.caseId === 'R125-C07-PEER-DIVIDES-CAI-WHEN-WEAK',
    );

    expect(adverse).toMatchObject({
      family: 'PEER_SUPPORT',
      discriminant: 'OPPOSITION_BEHAVIOR',
      equivalenceStatus: 'DISTINCT_MECHANISM',
    });
    expect(remedial).toMatchObject({
      family: 'PEER_SUPPORT',
      discriminant: 'SEASON_OR_STRENGTH_CONTEXT',
      equivalenceStatus: 'CONTEXT_DEPENDENT',
    });
  });

  it('treats peer protection of resource as composition rather than substitution', () => {
    const rescue = R125_DISCRIMINANT_CASES.find(
      (row) => row.caseId === 'R125-C08-PEER-REMOVES-CAI-TO-PROTECT-YIN',
    );
    const sanming = R125_DISCRIMINANT_CASES.find(
      (row) => row.caseId === 'R125-C09-PEER-ASSISTS-YINSHOU-CONTEXT',
    );

    expect(rescue).toMatchObject({
      family: 'MIXED_PEER_RESOURCE',
      discriminant: 'COMPOSITION',
      equivalenceStatus: 'PARTIAL_FUNCTIONAL_OVERLAP',
      freeSubstitutionAuthorized: false,
    });
    expect(sanming).toMatchObject({
      family: 'MIXED_PEER_RESOURCE',
      discriminant: 'COMPOSITION',
      equivalenceStatus: 'PARTIAL_FUNCTIONAL_OVERLAP',
      freeSubstitutionAuthorized: false,
    });
  });

  it('keeps resource use in weak-body contexts non-substitutable by default', () => {
    const row = R125_DISCRIMINANT_CASES.find(
      (candidate) => candidate.caseId === 'R125-C11-RESOURCE-WEAK-BODY-USE',
    );

    expect(row).toMatchObject({
      family: 'RESOURCE_SUPPORT',
      equivalenceStatus: 'NON_SUBSTITUTABLE_IN_OBSERVED_CONTEXT',
      freeSubstitutionAuthorized: false,
      numericEquivalenceAuthorized: false,
    });
  });

  it('preserves exact peer-without-root counterexamples', () => {
    for (const caseId of [
      'R125-C12-PEER-WITHOUT-ROOT-FOUR-XIN',
      'R125-C13-PEER-WITHOUT-ROOT-FOUR-BING',
    ]) {
      const row = R125_DISCRIMINANT_CASES.find(
        (candidate) => candidate.caseId === caseId,
      );
      expect(row).toMatchObject({
        family: 'PEER_SUPPORT',
        discriminant: 'ROOT_DEPENDENCY',
        equivalenceStatus: 'CONTEXT_DEPENDENT',
      });
      expect(row?.freeSubstitutionAuthorized).toBe(false);
    }
  });

  it('preserves resource multiplicity as context dependent and excess-capable', () => {
    const positive = R125_DISCRIMINANT_CASES.find(
      (row) => row.caseId === 'R125-C14-RESOURCE-MULTIPLICITY-POSITIVE',
    );
    const adverse = R125_DISCRIMINANT_CASES.find(
      (row) => row.caseId === 'R125-C15-RESOURCE-MULTIPLICITY-ADVERSE',
    );

    expect(positive).toMatchObject({
      family: 'RESOURCE_SUPPORT',
      discriminant: 'EXCESS_BEHAVIOR',
      equivalenceStatus: 'CONTEXT_DEPENDENT',
    });
    expect(adverse).toMatchObject({
      family: 'RESOURCE_SUPPORT',
      discriminant: 'EXCESS_BEHAVIOR',
      equivalenceStatus: 'DISTINCT_MECHANISM',
      commonExcessBehaviorAuthorized: false,
    });
  });

  it('keeps mixed 比印 support as cooperation rather than commensurability', () => {
    const row = R125_DISCRIMINANT_CASES.find(
      (candidate) => candidate.caseId === 'R125-C16-MIXED-BIYIN-REPETITION',
    );

    expect(row).toMatchObject({
      family: 'MIXED_PEER_RESOURCE',
      discriminant: 'COMPOSITION',
      equivalenceStatus: 'PARTIAL_FUNCTIONAL_OVERLAP',
      mechanismEquivalentAuthorized: false,
      freeSubstitutionAuthorized: false,
      numericEquivalenceAuthorized: false,
    });
  });

  it('finds no global substitution ratio or common threshold/excess law', () => {
    const substitution = R125_DISCRIMINANT_CASES.find(
      (row) => row.caseId === 'R125-C17-NO-GLOBAL-SUBSTITUTION-RATIO',
    );
    const commonLaw = R125_DISCRIMINANT_CASES.find(
      (row) => row.caseId === 'R125-C18-NO-COMMON-THRESHOLD-OR-EXCESS-LAW',
    );

    expect(substitution?.equivalenceStatus).toBe('NOT_ESTABLISHED');
    expect(commonLaw?.equivalenceStatus).toBe('NOT_ESTABLISHED');

    expect(R125_SUMMARY.numericEquivalenceAuthorizedCount).toBe(0);
    expect(R125_SUMMARY.freeSubstitutionAuthorizedCount).toBe(0);
    expect(R125_SUMMARY.mechanismEquivalentAuthorizedCount).toBe(0);
  });

  it('keeps all comparison groups paired', () => {
    for (const groupId of R125_COMPARISON_GROUPS) {
      const rows = R125_DISCRIMINANT_CASES.filter(
        (row) => row.comparisonGroupId === groupId,
      );
      expect(rows.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('rejects family-neutral support derivations', () => {
    expect(R125_REJECTED_DERIVATIONS).toContain(
      'BIJIE_SUPPORT_EQUALS_YINSHOU_SUPPORT',
    );
    expect(R125_REJECTED_DERIVATIONS).toContain(
      'ONE_BIJIE_EQUALS_ONE_YINSHOU',
    );
    expect(R125_REJECTED_DERIVATIONS).toContain(
      'YINSHOU_GLOBALLY_SUBSTITUTES_BIJIE',
    );
    expect(R125_REJECTED_DERIVATIONS).toContain(
      'PEER_RESOURCE_COMMON_SATURATION_CURVE',
    );
    expect(R125_REJECTED_DERIVATIONS).toContain(
      'SUPPORT_FAMILY_PRESENT_EQUALS_FINAL_QIANG_RUO',
    );
  });

  it('preserves the research-only authority boundary', () => {
    expect(R125_AUTHORITY).toEqual({
      status: 'RESEARCH_PEER_RESOURCE_DISCRIMINANT_CORPUS_COMPLETE',
      researchOnly: true,
      sharedBroadSupportContextObserved: true,
      peerSupportObserved: true,
      resourceSupportObserved: true,
      distinctMechanismEvidenceObserved: true,
      partialFunctionalOverlapObserved: true,
      mixedPeerResourceCooperationObserved: true,
      peerResourceMechanismEquivalenceEstablished: false,
      freePeerResourceSubstitutionEstablished: false,
      numericPeerResourceEquivalenceEstablished: false,
      commonPeerResourceThresholdEstablished: false,
      commonPeerResourceExcessBehaviorEstablished: false,
      familyNeutralSupportScalarAuthorized: false,
      completeChartSupportAggregationAuthorized: false,
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
