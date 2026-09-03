import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildValidatedDeterministicFallback } from '../src/narrative/deterministic-fallback.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { buildMonthlyInterpretationFacts } from '../src/reading/monthly-interpretation-facts.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import { buildTemporalReadingContext } from '../src/reading/temporal-reading-context.js';
import { GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES } from '../src/research/general-monthly-narrative-profiles.js';
import { createGeneralMonthlyReadingCandidateRegistry } from '../src/research/general-monthly-reading-candidate.js';
import {
  auditBenchmarkANaturalSyntheticCorpus,
  deriveBenchmarkAFinalNarrativeSignature,
  type BenchmarkAObservation,
} from '../src/verification/benchmark-a-natural-synthetic-corpus.js';

const TARGET_CASES = 500;
const TARGET_YEAR = 2026;
const TARGET_MONTH = 9;
const SYNTHETIC_HOURS = [0, 3, 6, 9, 12, 15, 18, 21] as const;
const FIXED_CALCULATION_TIME = new Date('2026-09-03T13:00:00.000Z');
const FIXED_INTERPRETATION_TIME = new Date('2026-09-03T13:01:00.000Z');
const NARRATIVE_POLICY_VERSION = 'myeongha-general-monthly-narrative-v1';
const NARRATIVE_POLICY_KEY = `myeongha-general-monthly@${NARRATIVE_POLICY_VERSION}`;

function monthlyRequest(caseId: string): ReadingRequest {
  return {
    requestId: caseId,
    intent: { domain: 'general', temporalScope: 'monthly' },
    targetPeriod: {
      scope: 'monthly',
      year: TARGET_YEAR,
      month: TARGET_MONTH,
      timeZone: 'Asia/Seoul',
      referenceDateTime: FIXED_INTERPRETATION_TIME.toISOString(),
      resolution: 'relative_current',
    },
  };
}

function selectedMonthlyClaims(
  claims: readonly InterpretationClaim[],
  selectedClaimIds: readonly string[],
): readonly InterpretationClaim[] {
  const selected = new Set(selectedClaimIds);
  return claims
    .filter((claim) => selected.has(claim.claimId))
    .filter((claim) => claim.state === 'active')
    .filter(
      (claim) =>
        claim.taxonomy.tier === 'T9' &&
        claim.taxonomy.category === 'general' &&
        claim.taxonomy.subcategory === 'monthly',
    )
    .sort((left, right) => left.claimId.localeCompare(right.claimId));
}

function monthlyConsumedInputFingerprint(
  execution: ReturnType<typeof runInterpretation>,
  selectedClaimIds: readonly string[],
): string {
  const evaluations = new Map(
    execution.evaluations.map((evaluation) => [evaluation.evaluationId, evaluation] as const),
  );
  const entries = selectedMonthlyClaims(execution.claims, selectedClaimIds)
    .flatMap((claim) =>
      claim.ruleRefs.map((ruleRef) => {
        const evaluation = evaluations.get(ruleRef.evaluationId);
        if (evaluation === undefined || evaluation.status !== 'matched') {
          throw new Error(`Missing matched producing evaluation ${ruleRef.evaluationId}.`);
        }
        return {
          ruleRef: { id: ruleRef.ruleId, version: ruleRef.version },
          inputs: evaluation.inputRefs.map((inputRef) => ({
            sourceType: inputRef.sourceType,
            idOrPath: inputRef.idOrPath,
            observedValue: inputRef.observedValue,
            ...(inputRef.evidenceType === undefined ? {} : { evidenceType: inputRef.evidenceType }),
            ...(inputRef.evidenceVersion === undefined
              ? {}
              : { evidenceVersion: inputRef.evidenceVersion }),
            ...(inputRef.definitionRef === undefined
              ? {}
              : { definitionRef: inputRef.definitionRef }),
            ...(inputRef.definitionContentHash === undefined
              ? {}
              : { definitionContentHash: inputRef.definitionContentHash }),
            ...(inputRef.payloadHash === undefined ? {} : { payloadHash: inputRef.payloadHash }),
          })),
        };
      }),
    )
    .sort((left, right) =>
      deterministicContentHash(left).localeCompare(deterministicContentHash(right)),
    );

  return `monthly_consumed_input_${deterministicContentHash({
    domain: 'general',
    temporalScope: 'monthly',
    targetYear: TARGET_YEAR,
    targetMonth: TARGET_MONTH,
    entries,
  })}`;
}

function monthlyInterpretationSignature(
  execution: ReturnType<typeof runInterpretation>,
  selectedClaimIds: readonly string[],
): string {
  const selectedClaims = selectedMonthlyClaims(execution.claims, selectedClaimIds);
  if (selectedClaims.length < 2) throw new Error('Expected both monthly phase T9 claims.');

  const materials = selectedClaims
    .map((claim) => ({
      taxonomy: claim.taxonomy,
      claimType: claim.claimType,
      subject: claim.subject,
      predicate: claim.predicate,
      value: claim.value,
      ...(claim.polarity === undefined ? {} : { polarity: claim.polarity }),
      ...(claim.emphasis === undefined ? {} : { emphasis: claim.emphasis }),
    }))
    .sort((left, right) =>
      deterministicContentHash(left).localeCompare(deterministicContentHash(right)),
    );

  return `monthly_interpretation_${deterministicContentHash({
    domain: 'general',
    temporalScope: 'monthly',
    targetYear: TARGET_YEAR,
    targetMonth: TARGET_MONTH,
    claims: materials,
  })}`;
}

function provenanceFanout(observations: readonly BenchmarkAObservation[]): {
  maxConsumedFingerprintsPerInterpretation: number;
  interpretationSignaturesWithMultipleConsumedFingerprints: number;
} {
  const grouped = new Map<string, Set<string>>();
  for (const observation of observations) {
    const fingerprints = grouped.get(observation.interpretationSignature) ?? new Set<string>();
    fingerprints.add(observation.consumedInputFingerprint);
    grouped.set(observation.interpretationSignature, fingerprints);
  }
  const counts = [...grouped.values()].map((values) => values.size);
  return {
    maxConsumedFingerprintsPerInterpretation: Math.max(0, ...counts),
    interpretationSignaturesWithMultipleConsumedFingerprints: counts.filter((count) => count > 1).length,
  };
}

describe('MyeongHa general monthly synthetic corpus', () => {
  it(
    'measures 500 segmented monthly readings and rejects cross-semantic narrative clones or false diversity',
    () => {
      const registry = createGeneralMonthlyReadingCandidateRegistry(
        FIXED_CALCULATION_TIME.toISOString(),
      );
      const observations: BenchmarkAObservation[] = [];
      let scannedBirthInputs = 0;

      outer: for (let month = 1; month <= 12; month += 1) {
        for (let day = 1; day <= 28; day += 1) {
          for (const hour of SYNTHETIC_HOURS) {
            scannedBirthInputs += 1;
            const caseId = `general-monthly-synthetic-${String(scannedBirthInputs).padStart(4, '0')}`;
            const snapshot = calculateCanonicalSajuSnapshot(
              {
                calendarType: 'solar',
                date: { year: 1996, month, day },
                time: { known: true, hour, minute: 0 },
                sexForTraditionalCalculation: 'unspecified',
              },
              PRODUCTION_DEFAULT_CALCULATION_POLICY,
              { now: FIXED_CALCULATION_TIME },
            );
            const request = monthlyRequest(caseId);
            const temporalContext = buildTemporalReadingContext(request);
            if (temporalContext === undefined || temporalContext.scope !== 'monthly') {
              throw new Error(`Monthly temporal context missing for ${caseId}.`);
            }
            const monthlyFacts = buildMonthlyInterpretationFacts(snapshot, temporalContext);
            const execution = runInterpretation(snapshot, registry, {
              requestId: caseId,
              temporalFacts: { ...monthlyFacts },
              now: FIXED_INTERPRETATION_TIME,
            });
            const composition = buildReadingCompositionEvidence(
              snapshot,
              execution,
              registry,
              request,
              { narrativePolicyVersion: NARRATIVE_POLICY_VERSION },
            );
            if (composition.evidence === undefined) {
              throw new Error(`Monthly evidence bundle missing for ${caseId}.`);
            }
            if (composition.selection.coverageState !== 'complete') {
              throw new Error(
                `Monthly reading coverage was ${composition.selection.coverageState} for ${caseId}.`,
              );
            }
            if (composition.selection.constraints.mayPromoteResearchAuthority !== false) {
              throw new Error(`Research authority promotion became possible for ${caseId}.`);
            }

            const selectedClaims = selectedMonthlyClaims(
              execution.claims,
              composition.selection.selectedClaimIds,
            );
            const phaseIds = selectedClaims
              .filter((claim) => claim.claimType === 'GENERAL_MONTHLY_SEGMENT_THEME_ACTIVATION')
              .map((claim) => (claim.value as { segmentId?: string }).segmentId)
              .sort();
            if (phaseIds.join('|') !== 'after_jeol|before_jeol') {
              throw new Error(`Both monthly phases were not preserved for ${caseId}.`);
            }

            const fingerprint = monthlyConsumedInputFingerprint(
              execution,
              composition.selection.selectedClaimIds,
            );
            const interpretationSignature = monthlyInterpretationSignature(
              execution,
              composition.selection.selectedClaimIds,
            );
            const fallback = buildValidatedDeterministicFallback(
              composition.evidence.bundle,
              GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES,
            );
            if (!fallback.validation.valid) {
              throw new Error(`Monthly fallback grounding failed for ${caseId}.`);
            }
            const narrativeSignature = deriveBenchmarkAFinalNarrativeSignature(fallback.draft);

            observations.push({
              caseId,
              calculationHash: snapshot.calculationHash,
              consumedInputFingerprint: fingerprint,
              interpretationSignature,
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
      const fanout = provenanceFanout(observations);

      process.stdout.write(
        `GENERAL_MONTHLY_SYNTHETIC_MEASUREMENT ${JSON.stringify({
          targetYear: TARGET_YEAR,
          targetMonth: TARGET_MONTH,
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
          maxConsumedFingerprintsPerInterpretation:
            fanout.maxConsumedFingerprintsPerInterpretation,
          interpretationSignaturesWithMultipleConsumedFingerprints:
            fanout.interpretationSignaturesWithMultipleConsumedFingerprints,
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
