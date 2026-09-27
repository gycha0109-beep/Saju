import { describe, expect, it } from 'vitest';

import {
  R141_AUTHORITY,
  R141_GRAPH_CASES,
  R141_MULTI_RELATION_ORDER_SENSITIVITY_VERSION,
  R141_ORDER_VARIANTS,
  R141_REJECTED_ORDERING_SHORTCUTS,
  R141_SUMMARY,
  R141_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-multi-relation-stem-branch-order-sensitivity-corpus.js';

describe('R141 multi-relation stem/branch graph order-sensitivity corpus', () => {
  it('pins the deterministic corpus shape', () => {
    expect(R141_MULTI_RELATION_ORDER_SENSITIVITY_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R141_SUMMARY).toEqual({
      graphCaseCount: 10,
      relationNodeCount: 30,
      orderVariantCount: 60,
      variantsPerCase: 6,
      r059DirectReplayCaseCount: 6,
      r059ResolveReplayCount: 4,
      r059ReactivateReplayCount: 1,
      r059MayBeIneffectiveReplayCount: 1,
      mixedStemBranchCaseCount: 8,
      branchOnlyCaseCount: 2,
      sourceBoundedInteractionEdgeCount: 6,
      coobservedNoPrecedenceEdgeCount: 12,
      nodeSetKeyVariantCount: 10,
      firstNodeWinnerEmissionCount: 0,
      globalPrecedenceAppliedCount: 0,
      firstMatchWinsAppliedCount: 0,
      sequentialMutationAppliedCount: 0,
      numericWeightAppliedCount: 0,
      graphSettlementEmissionCount: 0,
      executableCount: 0,
    });
  });

  it('enumerates all six input orders for every three-node graph', () => {
    for (const graphCase of R141_GRAPH_CASES) {
      const variants = R141_ORDER_VARIANTS.filter(
        (item) => item.caseId === graphCase.caseId,
      );
      expect(variants).toHaveLength(6);
      expect(new Set(variants.map((item) => item.inputOrder.join('|'))).size).toBe(
        6,
      );
    }
  });

  it('keeps node and edge identity invariant across all input orders', () => {
    for (const graphCase of R141_GRAPH_CASES) {
      const variants = R141_ORDER_VARIANTS.filter(
        (item) => item.caseId === graphCase.caseId,
      );
      expect(new Set(variants.map((item) => item.canonicalNodeSetKey)).size).toBe(
        1,
      );
      expect(new Set(variants.map((item) => item.canonicalEdgeSetKey)).size).toBe(
        1,
      );
    }
  });

  it('replays every R059 direct bounded case without globalizing direction', () => {
    const direct = R141_GRAPH_CASES.filter(
      (item) => item.provenance === 'R059_DIRECT_REPLAY',
    );
    expect(direct).toHaveLength(6);
    expect(
      direct.every(
        (item) =>
          item.boundedAssertion !== null &&
          item.boundedAssertion.generalizedPrecedenceAuthorized === false &&
          item.globalPrecedenceAuthorized === false &&
          item.totalOrderAuthorized === false,
      ),
    ).toBe(true);

    for (const graphCase of direct) {
      const signatures = new Set(
        R141_ORDER_VARIANTS.filter(
          (item) => item.caseId === graphCase.caseId,
        ).map((item) => item.boundedAssertionSignature),
      );
      expect(signatures.size).toBe(1);
    }
  });

  it('keeps source-bounded actor-target direction distinct from array order', () => {
    const direct = R141_GRAPH_CASES.filter(
      (item) => item.provenance === 'R059_DIRECT_REPLAY',
    );
    for (const graphCase of direct) {
      const assertion = graphCase.boundedAssertion;
      expect(assertion).not.toBeNull();
      if (assertion === null) continue;

      const variants = R141_ORDER_VARIANTS.filter(
        (item) => item.caseId === graphCase.caseId,
      );
      expect(
        variants.some(
          (item) => item.inputOrder[0] !== assertion.actorNodeId,
        ),
      ).toBe(true);
      expect(
        variants.every(
          (item) =>
            item.firstEnumeratedNodeWinner === null &&
            item.globalPrecedenceApplied === false,
        ),
      ).toBe(true);
    }
  });

  it('contains both mixed stem/branch and branch-only stress graphs', () => {
    expect(R141_SUMMARY.mixedStemBranchCaseCount).toBe(8);
    expect(R141_SUMMARY.branchOnlyCaseCount).toBe(2);

    const mixed = R141_GRAPH_CASES.filter((item) => item.mixedStemBranch);
    expect(
      mixed.every((item) => {
        const layers = new Set(item.nodes.map((node) => node.layer));
        return layers.has('STEM') && layers.has('BRANCH');
      }),
    ).toBe(true);
  });

  it('keeps every node below generalized effect or transformation authority', () => {
    const nodes = R141_GRAPH_CASES.flatMap((item) => item.nodes);
    expect(
      nodes.every(
        (item) =>
          item.effectiveRelationAuthorized === false &&
          item.transformationAuthorized === false &&
          item.generalizedEffectAuthorized === false,
      ),
    ).toBe(true);
  });

  it('rejects first-match, sequential mutation, enum order, and numeric weighting', () => {
    expect(R141_REJECTED_ORDERING_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'ARRAY_ORDER_AS_RELATION_PRECEDENCE',
        'FIRST_ENUMERATED_RELATION_WINS',
        'FIRST_MATCH_SHORT_CIRCUIT',
        'SEQUENTIAL_RELATION_MUTATION',
        'RELATION_KIND_ENUM_ORDER_AS_PRIORITY',
        'SOURCE_CASE_DIRECTION_AS_GLOBAL_PRECEDENCE',
        'DIRECT_RESOLUTION_CASE_AS_TOTAL_ORDER',
        'STEM_LAYER_ALWAYS_BEFORE_BRANCH_LAYER',
        'BRANCH_LAYER_ALWAYS_BEFORE_STEM_LAYER',
        'NUMERIC_RELATION_WEIGHTING',
        'COOBSERVATION_AS_EFFECTIVE_INTERACTION',
        'STRUCTURAL_IDENTITY_AS_SETTLED_EFFECT',
      ]),
    );

    expect(
      R141_ORDER_VARIANTS.every(
        (item) =>
          item.firstEnumeratedNodeWinner === null &&
          item.globalPrecedenceApplied === false &&
          item.firstMatchWinsApplied === false &&
          item.sequentialMutationApplied === false &&
          item.numericWeightApplied === false &&
          item.graphSettlementEmitted === null &&
          item.executable === false,
      ),
    ).toBe(true);
  });

  it('pins upstream execution authority closed', () => {
    expect(R141_UPSTREAM_BINDINGS.r051).toMatchObject({
      pairFamilyCount: 5,
      effectiveCombinationResolverAuthorized: false,
      transformationResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
    expect(R141_UPSTREAM_BINDINGS.r055).toMatchObject({
      structuralPairCount: 6,
      pairPresenceImpliesEffectiveClash: false,
      universalCrossRelationPrecedenceAuthorized: false,
      executableEffectResolverAuthorized: false,
    });
    expect(R141_UPSTREAM_BINDINGS.r056).toMatchObject({
      directedNonSelfRelationCount: 8,
      selfXingBranchCount: 4,
      structuralPresenceImpliesHarm: false,
      executableEffectResolverAuthorized: false,
    });
    expect(R141_UPSTREAM_BINDINGS.r059).toMatchObject({
      directCaseCount: 6,
      universalPrecedenceAuthorized: false,
      totalOrderAuthorized: false,
      executableConflictResolverAuthorized: false,
      firstMatchWinsAuthorized: false,
      numericWeightAuthorized: false,
    });
    expect(R141_UPSTREAM_BINDINGS.branchBreak.sourceScopedPairCount).toBe(4);
  });

  it('keeps graph settlement and production authority closed', () => {
    expect(R141_AUTHORITY).toMatchObject({
      researchOnly: true,
      allR059DirectCasesReplayed: true,
      multiRelationGraphRepresentationObserved: true,
      mixedStemBranchGraphRepresentationObserved: true,
      inputEnumerationOrderInvariantRepresentationObserved: true,
      sourceBoundedDirectionDistinctFromGlobalPrecedenceObserved: true,
      globalRelationPrecedenceAuthorized: false,
      totalRelationOrderAuthorized: false,
      firstMatchWinsAuthorized: false,
      sequentialMutationResolverAuthorized: false,
      relationKindPriorityAuthorized: false,
      numericRelationWeightAuthorized: false,
      generalizedRelationEffectSettlementAuthorized: false,
      stemCombinationEffectResolverAuthorized: false,
      branchConflictResolverAuthorized: false,
      chartRoleFactEmissionAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
