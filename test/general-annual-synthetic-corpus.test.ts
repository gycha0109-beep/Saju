import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildValidatedDeterministicFallback } from '../src/narrative/deterministic-fallback.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { buildAnnualInterpretationFacts } from '../src/reading/annual-interpretation-facts.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import { buildTemporalReadingContext } from '../src/reading/temporal-reading-context.js';
import { GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES } from '../src/research/general-annual-narrative-profiles.js';
import { createGeneralAnnualReadingCandidateRegistry } from '../src/research/general-annual-reading-candidate.js';
import {
  auditBenchmarkANaturalSyntheticCorpus,
  deriveBenchmarkAFinalNarrativeSignature,
  type BenchmarkAObservation,
} from '../src/verification/benchmark-a-natural-synthetic-corpus.js';
import { deriveConsumedInputFingerprints } from '../src/verification/consumed-input-fingerprint.js';
import { deriveDomainInterpretationSignatures } from '../src/verification/domain-interpretation-signature.js';

const TARGET_CASES = 500;
const TARGET_YEAR = 2026;
const SYNTHETIC_HOURS = [0, 3, 6, 9, 12, 15, 18, 21] as const;
const FIXED_CALCULATION_TIME = new Date('2026-09-03T13:00:00.000Z');
const FIXED_INTERPRETATION_TIME = new Date('2026-09-03T13:01:00.000Z');
const NARRATIVE_POLICY_VERSION = 'myeongha-general-annual-narrative-v1';
const NARRATIVE_POLICY_KEY = `myeongha-general-annual@${NARRATIVE_POLICY_VERSION}`;

function annualRequest(caseId: string): ReadingRequest {
  return {
    requestId: caseId,
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual',
      year: TARGET_YEAR,
      timeZone: 'Asia/Seoul',
      referenceDateTime: FIXED_INTERPRETATION_TIME.toISOString(),
      resolution: 'relative_current',
    },
  };
}

describe('MyeongHa general annual synthetic corpus', () => {
  it(
    'measures 500 actual annual readings and rejects cross-semantic narrative clones or false diversity',
    () => {
      const registry = createGeneralAnnualReadingCandidateRegistry(
        FIXED_CALCULATION_TIME.toISOString(),
      );
      const observations: BenchmarkAObservation[] = [];
      let scannedBirthInputs = 0;

      outer: for (let month = 1; month <= 12; month += 1) {
        for (let day = 1; day <= 28; day += 1) {
          for (const hour of SYNTHETIC_HOURS) {
            scannedBirthInputs += 1;
            const caseId = `general-annual-synthetic-${String(scannedBirthInputs).padStart(4, '0')}`;
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
            const request = annualRequest(caseId);
            const temporalContext = buildTemporalReadingContext(request);
            if (temporalContext === undefined || temporalContext.scope !== 'annual') {
              throw new Error(`Annual temporal context missing for ${caseId}.`);
            }
            const annualFacts = buildAnnualInterpretationFacts(snapshot, temporalContext);
            const execution = runInterpretation(snapshot, registry, {
              requestId: caseId,
              temporalFacts: { ...annualFacts },
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
              throw new Error(`Annual evidence bundle missing for ${caseId}.`);
            }
            if (composition.selection.coverageState !== 'complete') {
              throw new Error(
                `Annual reading coverage was ${composition.selection.coverageState} for ${caseId}.`,
              );
            }
            if (composition.selection.constraints.mayPromoteResearchAuthority !== false) {
              throw new Error(`Research authority promotion became possible for ${caseId}.`);
            }

            const fingerprints = deriveConsumedInputFingerprints(
              execution,
              registry,
              composition.selection,
            );
            const signatures = deriveDomainInterpretationSignatures(
              execution.claims,
              execution.claimRelations,
              composition.selection,
            );
            if (fingerprints.length !== 1 || signatures.length !== 1) {
              throw new Error(
                `Expected one annual fingerprint/signature for ${caseId}; got ${fingerprints.length}/${signatures.length}.`,
              );
            }
            const fingerprint = fingerprints[0];
            const interpretationSignature = signatures[0];
            if (fingerprint === undefined || interpretationSignature === undefined) {
              throw new Error(`Incomplete annual semantic observation for ${caseId}.`);
            }

            const fallback = buildValidatedDeterministicFallback(
              composition.evidence.bundle,
              GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES,
            );
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
        `GENERAL_ANNUAL_SYNTHETIC_MEASUREMENT ${JSON.stringify({
          targetYear: TARGET_YEAR,
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
