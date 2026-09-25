import { describe, expect, it } from 'vitest';
import {
  R133_AUTHORITY,
  R133_GRAPH_SCENARIOS,
  R133_PATTERN_RESCUE_FAILURE_PRECEDENCE_GRAPH_VERSION,
  R133_REJECTED_GLOBALIZATIONS,
  R133_SOURCE_REFERENCES,
  R133_SUMMARY,
  R133_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-pattern-rescue-failure-precedence-graph.js';
import {
  R022_WEALTH_PATTERN_PROPOSITIONS,
  R022_WEALTH_PATTERN_VERSION,
} from '../src/research/general-natal-wealth-pattern-conditions.js';
import {
  R023_OFFICER_PATTERN_PROPOSITIONS,
  R023_OFFICER_PATTERN_VERSION,
} from '../src/research/general-natal-officer-pattern-conditions.js';
import {
  R024_SEAL_PATTERN_PROPOSITIONS,
  R024_SEAL_PATTERN_VERSION,
} from '../src/research/general-natal-seal-pattern-conditions.js';
import {
  R025_FOOD_GOD_PATTERN_PROPOSITIONS,
  R025_FOOD_GOD_PATTERN_VERSION,
} from '../src/research/general-natal-food-god-pattern-conditions.js';
import {
  R026_HURTING_OFFICER_PATTERN_VERSION,
  R026_HURTING_OFFICER_PROPOSITIONS,
} from '../src/research/general-natal-hurting-officer-pattern-conditions.js';
import {
  R027_SEVEN_KILL_PROPOSITIONS,
  R027_SEVEN_KILL_PATTERN_VERSION,
} from '../src/research/general-natal-seven-kill-pattern-conditions.js';
import { R030_GEJU_CONFLICT_MATRIX_VERSION } from '../src/research/general-natal-geju-conflict-resolution-matrix.js';
import {
  R126_AUTHORITY,
  R126_CONTROL_DRAIN_OUTPUT_ORDERING_VERSION,
  R126_ORDERING_CASES,
} from '../src/research/general-natal-control-drain-output-ordering-divergence.js';
import {
  R131_AUTHORITY,
  R131_PATTERN_CANDIDATE_ESTABLISHMENT_BOUNDARY_VERSION,
} from '../src/research/general-natal-pattern-candidate-establishment-formal-boundary-audit.js';
import {
  R132_AUTHORITY,
  R132_MIXED_MONTH_QI_CANDIDATE_SELECTION_VARIANT_CORPUS_VERSION,
} from '../src/research/general-natal-mixed-month-qi-candidate-selection-variant-corpus.js';

describe('R133 pattern rescue/failure precedence graph', () => {
  it('publishes the bounded graph corpus with required coverage', () => {
    expect(R133_PATTERN_RESCUE_FAILURE_PRECEDENCE_GRAPH_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R133_GRAPH_SCENARIOS).toHaveLength(28);
    expect(new Set(R133_GRAPH_SCENARIOS.map((item) => item.caseId)).size).toBe(28);
    expect(R133_SUMMARY).toMatchObject({
      scenarioCount: 28,
      rescuePathCount: 13,
      contaminationOrFailurePathCount: 7,
      counterexampleCount: 8,
      sameActorOppositeFunctionCounterexampleCount: 5,
      representedPatternFamilyCount: 6,
      numericPrecedenceAuthorizedCount: 0,
      globalPrecedenceAuthorizedCount: 0,
      rescueResolverAuthorizedCount: 0,
      candidateFactsEmittedCount: 0,
      establishmentFactsEmittedCount: 0,
    });
    expect(R133_SUMMARY.explicitSourceSequenceEdgeCount).toBeGreaterThan(20);
  });

  it('binds all governed upstream versions and authority boundaries', () => {
    expect(R133_UPSTREAM_BINDINGS.r022).toEqual({
      version: R022_WEALTH_PATTERN_VERSION,
      propositionIds: R022_WEALTH_PATTERN_PROPOSITIONS.map((item) => item.id),
    });
    expect(R133_UPSTREAM_BINDINGS.r023).toEqual({
      version: R023_OFFICER_PATTERN_VERSION,
      propositionIds: R023_OFFICER_PATTERN_PROPOSITIONS.map((item) => item.id),
    });
    expect(R133_UPSTREAM_BINDINGS.r024).toEqual({
      version: R024_SEAL_PATTERN_VERSION,
      propositionIds: R024_SEAL_PATTERN_PROPOSITIONS.map((item) => item.id),
    });
    expect(R133_UPSTREAM_BINDINGS.r025).toEqual({
      version: R025_FOOD_GOD_PATTERN_VERSION,
      propositionIds: R025_FOOD_GOD_PATTERN_PROPOSITIONS.map((item) => item.id),
    });
    expect(R133_UPSTREAM_BINDINGS.r026).toEqual({
      version: R026_HURTING_OFFICER_PATTERN_VERSION,
      propositionIds: R026_HURTING_OFFICER_PROPOSITIONS.map((item) => item.id),
    });
    expect(R133_UPSTREAM_BINDINGS.r027).toEqual({
      version: R027_SEVEN_KILL_PATTERN_VERSION,
      propositionIds: R027_SEVEN_KILL_PROPOSITIONS.map((item) => item.id),
    });
    expect(R133_UPSTREAM_BINDINGS.r030.version).toBe(R030_GEJU_CONFLICT_MATRIX_VERSION);
    expect(R133_UPSTREAM_BINDINGS.r126).toEqual({
      version: R126_CONTROL_DRAIN_OUTPUT_ORDERING_VERSION,
      localRescueOrderingObserved: R126_AUTHORITY.localRescueOrderingObserved,
      localContaminationOrderingObserved: R126_AUTHORITY.localContaminationOrderingObserved,
      globalRelationPrecedenceAuthorized: R126_AUTHORITY.globalRelationPrecedenceAuthorized,
    });
    expect(R133_UPSTREAM_BINDINGS.r131).toEqual({
      version: R131_PATTERN_CANDIDATE_ESTABLISHMENT_BOUNDARY_VERSION,
      candidateIdentityAuthorized: R131_AUTHORITY.candidateIdentityAuthorized,
      establishmentPredicateAuthorized: R131_AUTHORITY.establishmentPredicateAuthorized,
    });
    expect(R133_UPSTREAM_BINDINGS.r132).toEqual({
      version: R132_MIXED_MONTH_QI_CANDIDATE_SELECTION_VARIANT_CORPUS_VERSION,
      candidateRankingAuthorized: R132_AUTHORITY.candidateRankingAuthorized,
      candidatePrecedenceAuthorized: R132_AUTHORITY.candidatePrecedenceAuthorized,
    });
  });

  it('keeps governed proposition references valid', () => {
    const idsByPrefix = new Map<string, Set<string>>([
      ['R022', new Set(R022_WEALTH_PATTERN_PROPOSITIONS.map((item) => item.id))],
      ['R023', new Set(R023_OFFICER_PATTERN_PROPOSITIONS.map((item) => item.id))],
      ['R024', new Set(R024_SEAL_PATTERN_PROPOSITIONS.map((item) => item.id))],
      ['R025', new Set(R025_FOOD_GOD_PATTERN_PROPOSITIONS.map((item) => item.id))],
      ['R026', new Set(R026_HURTING_OFFICER_PROPOSITIONS.map((item) => item.id))],
      ['R027', new Set(R027_SEVEN_KILL_PROPOSITIONS.map((item) => item.id))],
      ['R126', new Set(R126_ORDERING_CASES.map((item) => item.caseId))],
    ]);

    for (const scenario of R133_GRAPH_SCENARIOS) {
      for (const sourceRef of scenario.sourceRefs) {
        const separator = sourceRef.indexOf(':');
        if (separator < 0) continue;
        const prefix = sourceRef.slice(0, separator);
        const id = sourceRef.slice(separator + 1);
        const governedIds = idsByPrefix.get(prefix);
        if (governedIds === undefined) continue;
        expect(governedIds.has(id), sourceRef).toBe(true);
      }
    }
  });

  it('keeps source statement, interpretive reading, and research inference separate', () => {
    for (const scenario of R133_GRAPH_SCENARIOS) {
      expect(scenario.sourceStatement.length).toBeGreaterThan(0);
      expect(scenario.interpretiveReading.length).toBeGreaterThan(0);
      expect(scenario.researchInference.length).toBeGreaterThan(0);
      expect(scenario.sourceStratum.length).toBeGreaterThan(0);
      expect(scenario.sourceRefs.length).toBeGreaterThan(0);
      expect(scenario.unresolvedOperands.length).toBeGreaterThan(0);
    }
  });

  it('keeps every graph edge local and non-global', () => {
    for (const scenario of R133_GRAPH_SCENARIOS) {
      expect(scenario.edges.length).toBeGreaterThan(0);
      for (const graphEdge of scenario.edges) {
        expect(graphEdge.localOnly).toBe(true);
        expect(graphEdge.globalPrecedenceAuthorized).toBe(false);
        expect(scenario.nodes).toContain(graphEdge.from);
        expect(scenario.nodes).toContain(graphEdge.to);
      }
    }
  });

  it('preserves the multi-step Seven-Kill rescue chain without globalizing it', () => {
    const row = R133_GRAPH_SCENARIOS.find(
      (item) =>
        item.caseId === 'R133-C20-SEVEN-KILL-FOOD-SEAL-WEALTH-MULTISTEP-RESCUE',
    );

    expect(row).toBeDefined();
    expect(row).toMatchObject({
      patternFamily: 'SEVEN_KILL',
      scenarioKind: 'RESCUE_PATH',
      sourceStatement: '煞逢食制，印來護煞，而逢財以去印存食',
      rescuePath: true,
      rescuePreservesOriginalPath: true,
      rescueRedirectsPath: false,
      globalPrecedenceAuthorized: false,
      numericPrecedenceAuthorized: false,
      rescueResolverAuthorized: false,
    });
    expect(row?.nodes).toEqual(['煞', '食制', '印護煞', '財去印', '存食']);
  });

  it('preserves Seal contamination as a counterexample to universal 財去印 rescue', () => {
    const contamination = R133_GRAPH_SCENARIOS.find(
      (item) =>
        item.caseId === 'R133-C12-SEAL-KILL-GENERATION-WEALTH-CONTAMINATION',
    );
    const rescue = R133_GRAPH_SCENARIOS.find(
      (item) =>
        item.caseId === 'R133-C20-SEVEN-KILL-FOOD-SEAL-WEALTH-MULTISTEP-RESCUE',
    );
    const counterexample = R133_GRAPH_SCENARIOS.find(
      (item) =>
        item.caseId ===
        'R133-C21-COUNTEREXAMPLE-WEALTH-REMOVES-SEAL-OPPOSITE-FUNCTION',
    );

    expect(contamination).toMatchObject({
      sourceStatement: '透煞以生印，而又透財，以去印存煞',
      sourceOutcome: 'CONTAMINATION_OBSERVED',
    });
    expect(rescue).toMatchObject({
      sourceOutcome: 'RESCUE_OBSERVED',
    });
    expect(counterexample).toMatchObject({
      scenarioKind: 'COUNTEREXAMPLE',
      sameActorOppositeFunctionCounterexample: true,
    });
  });

  it('preserves alternative Wealth-versus-Rob-Wealth rescues without ranking', () => {
    const food = R133_GRAPH_SCENARIOS.find(
      (item) => item.caseId === 'R133-C05-WEALTH-ROBBERY-FOOD-RESCUE',
    );
    const officer = R133_GRAPH_SCENARIOS.find(
      (item) => item.caseId === 'R133-C06-WEALTH-ROBBERY-OFFICER-RESCUE',
    );
    const audit = R133_GRAPH_SCENARIOS.find(
      (item) =>
        item.caseId ===
        'R133-C26-COUNTEREXAMPLE-ALTERNATIVE-WEALTH-ROBBERY-RESCUES-UNRANKED',
    );

    expect(food?.candidateFactsEmitted).toBe(false);
    expect(officer?.candidateFactsEmitted).toBe(false);
    expect(audit?.researchInference).toContain('does not rank');
    expect(audit?.sourceSentenceOrderIsRuntimeOrder).toBe(false);
  });

  it('distinguishes Food-God rescue that redirects from rescue that preserves', () => {
    const redirect = R133_GRAPH_SCENARIOS.find(
      (item) => item.caseId === 'R133-C13-FOOD-OWL-REDIRECT-TO-KILL',
    );
    const preserve = R133_GRAPH_SCENARIOS.find(
      (item) => item.caseId === 'R133-C14-FOOD-OWL-WEALTH-PROTECTS-FOOD',
    );

    expect(redirect).toMatchObject({
      rescuePreservesOriginalPath: false,
      rescueRedirectsPath: true,
    });
    expect(preserve).toMatchObject({
      rescuePreservesOriginalPath: true,
      rescueRedirectsPath: false,
    });
  });

  it('records at least three same-actor opposite-function counterexamples', () => {
    const rows = R133_GRAPH_SCENARIOS.filter(
      (item) => item.sameActorOppositeFunctionCounterexample,
    );

    expect(rows.length).toBeGreaterThanOrEqual(3);
    expect(rows.map((item) => item.caseId)).toEqual(
      expect.arrayContaining([
        'R133-C21-COUNTEREXAMPLE-WEALTH-REMOVES-SEAL-OPPOSITE-FUNCTION',
        'R133-C22-COUNTEREXAMPLE-RESOURCE-RESCUES-OFFICER-CONTAMINATES-KILL',
        'R133-C23-COUNTEREXAMPLE-COMBINATION-RESCUES-KILL-BUT-HARMS-WEALTH',
      ]),
    );
  });

  it('rejects source sentence order, first-match, global DAG, and numeric priority', () => {
    expect(R133_REJECTED_GLOBALIZATIONS).toEqual(
      expect.arrayContaining([
        'SOURCE_SENTENCE_ORDER_EQUALS_RUNTIME_PRECEDENCE',
        'FIRST_MATCH_EQUALS_FINAL_OUTCOME',
        'LOCAL_RESCUE_CHAIN_EQUALS_GLOBAL_DAG',
        'LOCAL_ORDER_EQUALS_NUMERIC_PRIORITY',
        'ALTERNATIVE_RESCUES_ARE_SOURCE_RANKED',
      ]),
    );

    for (const scenario of R133_GRAPH_SCENARIOS) {
      expect(scenario.sourceSentenceOrderIsRuntimeOrder).toBe(false);
      expect(scenario.numericPrecedenceAuthorized).toBe(false);
      expect(scenario.globalPrecedenceAuthorized).toBe(false);
      expect(scenario.rescueResolverAuthorized).toBe(false);
    }
  });

  it('keeps source references research-scoped and dated', () => {
    expect(R133_SOURCE_REFERENCES.selectedBaseText).toMatchObject({
      sourceNature: 'BASE_TEXT_DIRECT',
      verifiedOn: '2026-09-26',
    });
    expect(R133_SOURCE_REFERENCES.nlcWitness).toMatchObject({
      sourceNature: 'BASE_TEXT_DIRECT',
      verifiedOn: '2026-09-26',
    });
    expect(R133_SOURCE_REFERENCES.selectedCommentary).toMatchObject({
      sourceNature: 'LATER_COMMENTARY',
      verifiedOn: '2026-09-26',
    });
  });

  it('preserves the final research-only authority boundary', () => {
    expect(R133_AUTHORITY).toEqual({
      status: 'RESEARCH_PATTERN_RESCUE_FAILURE_PRECEDENCE_GRAPH_COMPLETE',
      researchOnly: true,
      localSourceOrderingObserved: true,
      localRescueOrderingObserved: true,
      localContaminationOrderingObserved: true,
      rescuePreserveVsRedirectDistinctionObserved: true,
      sameActorOppositeFunctionObserved: true,
      alternativeRescuePathsObserved: true,
      counterexamplesToGlobalPrecedenceEstablished: true,
      sourceSentenceOrderRuntimePrecedenceAuthorized: false,
      firstMatchWinsAuthorized: false,
      globalRelationPrecedenceAuthorized: false,
      globalAcyclicPrecedenceGraphAuthorized: false,
      numericRescueWeightAuthorized: false,
      rescueRankingAuthorized: false,
      rescueResolverAuthorized: false,
      candidateIdentityAuthorized: false,
      candidateRankingAuthorized: false,
      candidatePrecedenceAuthorized: false,
      establishmentPredicateAuthorized: false,
      canonicalTerminalStateAuthorized: false,
      candidateFactsEmitted: false,
      establishmentFactsEmitted: false,
      automaticAuthorityAdmissionAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
