import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildValidatedDeterministicFallback } from '../src/narrative/deterministic-fallback.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { prepareProductReading } from '../src/reading/product-reading-integration.js';
import { createCareerNatalReadingCandidateRegistry } from '../src/research/career-natal-reading-candidate.js';
import {
  auditBenchmarkANaturalSyntheticCorpus,
  deriveBenchmarkAFinalNarrativeSignature,
  type BenchmarkAObservation,
} from '../src/verification/benchmark-a-natural-synthetic-corpus.js';
import { deriveConsumedInputFingerprints } from '../src/verification/consumed-input-fingerprint.js';
import { deriveDomainInterpretationSignatures } from '../src/verification/domain-interpretation-signature.js';

const TARGET_CASES = 500;
const SYNTHETIC_HOURS = [0, 3, 6, 9, 12, 15, 18, 21] as const;
const FIXED_CALCULATION_TIME = new Date('2026-08-28T00:00:00.000Z');
const FIXED_INTERPRETATION_TIME = new Date('2026-08-28T00:01:00.000Z');
const NARRATIVE_POLICY_REF = {
  id: 'myeonghwa-narrative-policy',
  version: '1.0.0-benchmark-a',
} as const;
const NARRATIVE_POLICY_KEY = `${NARRATIVE_POLICY_REF.id}@${NARRATIVE_POLICY_REF.version}`;
const INTEGRATION_OPTIONS = {
  narrativePolicyRef: NARRATIVE_POLICY_REF,
  outputSchemaVersion: 'myeonghwa-narrative-draft-v1',
} as const;

function observation(
  overrides: Partial<BenchmarkAObservation> = {},
): BenchmarkAObservation {
  return {
    caseId: 'case-a',
    calculationHash: 'calculation-a',
    consumedInputFingerprint: 'consumed-a',
    interpretationSignature: 'interpretation-a',
    narrativePolicyKey: 'policy@1',
    finalNarrativeSignature: 'narrative-a',
    sectionNarrativeSignatures: ['section-a'],
    narrativeSimilarityText: '가나다라마바사',
    ...overrides,
  };
}

describe('P5 Benchmark A audit gates', () => {
  it('fails when different interpretation signatures collapse to one exact final reading', () => {
    const report = auditBenchmarkANaturalSyntheticCorpus(
      [
        observation(),
        observation({
          caseId: 'case-b',
          calculationHash: 'calculation-b',
          consumedInputFingerprint: 'consumed-b',
          interpretationSignature: 'interpretation-b',
        }),
      ],
      2,
      0,
    );

    expect(report.crossSemanticExactFullReadingCloneGroupCount).toBe(1);
    expect(report.failures).toEqual(['CROSS_SEMANTIC_EXACT_NARRATIVE_CLONE_PRESENT']);
    expect(report.passed).toBe(false);
  });

  it('fails false diversity when one interpretation signature and policy produce different deterministic readings', () => {
    const report = auditBenchmarkANaturalSyntheticCorpus(
      [
        observation(),
        observation({
          caseId: 'case-b',
          calculationHash: 'calculation-b',
          consumedInputFingerprint: 'consumed-b',
          finalNarrativeSignature: 'narrative-b',
          sectionNarrativeSignatures: ['section-b'],
          narrativeSimilarityText: '가나다라마바아',
        }),
      ],
      2,
      0,
    );

    expect(report.falseDiversityGroupCount).toBe(1);
    expect(report.failures).toEqual(['FALSE_DIVERSITY_PRESENT']);
    expect(report.passed).toBe(false);
  });

  it('allows intentional same-signature deterministic convergence and keeps similarity observational', () => {
    const report = auditBenchmarkANaturalSyntheticCorpus(
      [
        observation(),
        observation({
          caseId: 'case-b',
          calculationHash: 'calculation-b',
          consumedInputFingerprint: 'consumed-b',
        }),
        observation({
          caseId: 'case-c',
          calculationHash: 'calculation-c',
          consumedInputFingerprint: 'consumed-c',
          interpretationSignature: 'interpretation-c',
          finalNarrativeSignature: 'narrative-c',
          sectionNarrativeSignatures: ['section-c'],
          narrativeSimilarityText: '가나다라마바사아',
        }),
      ],
      3,
      2,
    );

    expect(report.exactFullReadingCloneGroupCount).toBe(1);
    expect(report.crossSemanticExactFullReadingCloneGroupCount).toBe(0);
    expect(report.falseDiversityGroupCount).toBe(0);
    expect(report.highSimilarityCandidates.length).toBeGreaterThan(0);
    expect(report.highSimilarityPolicy).toEqual({
      gate: 'observational_only',
      threshold: 'not_defined_by_authority',
      candidateSelection: 'top_non_exact_pairs_by_normalized_character_bigram_dice',
    });
    expect(report.failures).toEqual([]);
    expect(report.passed).toBe(true);
  });
});

describe('P5 Benchmark A — natural synthetic Career corpus', () => {
  it(
    'measures 500 actual engine readings and rejects cross-semantic clones or false diversity',
    () => {
      const registry = createCareerNatalReadingCandidateRegistry(
        FIXED_CALCULATION_TIME.toISOString(),
      );
      const observations: BenchmarkAObservation[] = [];
      let scannedBirthInputs = 0;

      outer: for (let month = 1; month <= 12; month += 1) {
        for (let day = 1; day <= 28; day += 1) {
          for (const hour of SYNTHETIC_HOURS) {
            scannedBirthInputs += 1;
            const caseId = `benchmark-a-engine-${String(scannedBirthInputs).padStart(4, '0')}`;
            const snapshot = calculateCanonicalSajuSnapshot(
              {
                calendarType: 'solar',
                date: { year: 2024, month, day },
                time: { known: true, hour, minute: 0 },
                sexForTraditionalCalculation: 'unspecified',
              },
              PRODUCTION_DEFAULT_CALCULATION_POLICY,
              { now: FIXED_CALCULATION_TIME },
            );
            const execution = runInterpretation(snapshot, registry, {
              requestId: caseId,
              now: FIXED_INTERPRETATION_TIME,
            });
            const prepared = prepareProductReading(
              snapshot,
              execution,
              registry,
              { requestId: caseId, text: '직업운' },
              INTEGRATION_OPTIONS,
            );

            if (prepared.state !== 'ready_for_narrative') continue;
            const selection = prepared.composition?.selection;
            const request = prepared.narrativeRequest;
            if (selection === undefined || request === undefined) {
              throw new Error(`ready_for_narrative must include selection/request for ${caseId}.`);
            }
            if (selection.profileAuthorization.state !== 'authorized') {
              throw new Error(`Career selection authorization was lost for ${caseId}.`);
            }
            if (selection.constraints.mayPromoteResearchAuthority !== false) {
              throw new Error(`Research authority promotion became possible for ${caseId}.`);
            }

            const fingerprints = deriveConsumedInputFingerprints(execution, registry, selection);
            const signatures = deriveDomainInterpretationSignatures(
              execution.claims,
              execution.claimRelations,
              selection,
            );
            if (fingerprints.length !== 1 || signatures.length !== 1) {
              throw new Error(
                `Expected one Career fingerprint/signature for ${caseId}; got ${fingerprints.length}/${signatures.length}.`,
              );
            }
            const fingerprint = fingerprints[0];
            const interpretationSignature = signatures[0];
            if (fingerprint === undefined || interpretationSignature === undefined) {
              throw new Error(`Incomplete Benchmark A semantic observation for ${caseId}.`);
            }

            const fallback = buildValidatedDeterministicFallback(request.evidenceBundle);
            if (!fallback.validation.valid) {
              throw new Error(`Deterministic fallback grounding failed for ${caseId}.`);
            }
            const narrativeSignature = deriveBenchmarkAFinalNarrativeSignature(fallback.draft);

            observations.push({
              caseId,
              calculationHash: snapshot.calculationHash,
              consumedInputFingerprint: fingerprint.fingerprint,
              interpretationSignature: interpretationSignature.signature,
              narrativePolicyKey: NARRATIVE_POLICY_KEY,
              finalNarrativeSignature: narrativeSignature.signature,
              sectionNarrativeSignatures: narrativeSignature.sectionSignatures,
              narrativeSimilarityText: narrativeSignature.similarityText,
            });

            if (observations.length >= TARGET_CASES) break outer;
          }
        }
      }

      const report = auditBenchmarkANaturalSyntheticCorpus(observations, TARGET_CASES, 20);

      process.stdout.write(
        `BENCHMARK_A_MEASUREMENT ${JSON.stringify({
          scannedBirthInputs,
          observationCount: report.observationCount,
          distinctCalculationHashes: report.distinctCalculationHashes,
          distinctConsumedInputFingerprints: report.distinctConsumedInputFingerprints,
          distinctInterpretationSignatures: report.distinctInterpretationSignatures,
          distinctFinalNarrativeSignatures: report.distinctFinalNarrativeSignatures,
          exactFullReadingCloneGroupCount: report.exactFullReadingCloneGroupCount,
          exactSectionCloneGroupCount: report.exactSectionCloneGroupCount,
          crossSemanticExactFullReadingCloneGroupCount:
            report.crossSemanticExactFullReadingCloneGroupCount,
          falseDiversityGroupCount: report.falseDiversityGroupCount,
          highestSimilarityCandidates: report.highSimilarityCandidates.slice(0, 5).map((pair) => ({
            leftCaseId: pair.leftCaseId,
            rightCaseId: pair.rightCaseId,
            similarity: Number(pair.similarity.toFixed(6)),
            sameInterpretationSignature:
              pair.leftInterpretationSignature === pair.rightInterpretationSignature,
          })),
          highSimilarityThreshold: report.highSimilarityPolicy.threshold,
        })}\n`,
      );

      expect(scannedBirthInputs).toBeGreaterThanOrEqual(TARGET_CASES);
      expect(report.observationCount).toBe(TARGET_CASES);
      expect(report.distinctCalculationHashes).toBeGreaterThan(1);
      expect(report.distinctConsumedInputFingerprints).toBeGreaterThan(1);
      expect(report.distinctInterpretationSignatures).toBeGreaterThan(1);
      expect(report.distinctFinalNarrativeSignatures).toBeGreaterThan(1);
      expect(report.crossSemanticExactFullReadingCloneGroupCount).toBe(0);
      expect(report.falseDiversityGroupCount).toBe(0);
      expect(report.failures).toEqual([]);
      expect(report.passed).toBe(true);
    },
    120_000,
  );
});
