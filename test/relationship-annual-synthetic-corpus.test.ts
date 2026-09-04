import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildValidatedDeterministicFallback } from '../src/narrative/deterministic-fallback.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { buildAnnualInterpretationFacts } from '../src/reading/annual-interpretation-facts.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import { buildTemporalReadingContext } from '../src/reading/temporal-reading-context.js';
import { RELATIONSHIP_ANNUAL_CLAIM_NARRATIVE_PROFILES } from '../src/research/relationship-annual-narrative-profiles.js';
import { createRelationshipAnnualReadingCandidateRegistry } from '../src/research/relationship-annual-reading-candidate.js';
import { RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES } from '../src/research/relationship-natal-narrative-profiles.js';
import {
  auditBenchmarkANaturalSyntheticCorpus,
  deriveBenchmarkAFinalNarrativeSignature,
  type BenchmarkAObservation,
} from '../src/verification/benchmark-a-natural-synthetic-corpus.js';

const TARGET_CASES = 500;
const TARGET_YEAR = 2026;
const SYNTHETIC_HOURS = [0, 3, 6, 9, 12, 15, 18, 21] as const;
const FIXED_CALCULATION_TIME = new Date('2026-09-04T04:10:00.000Z');
const FIXED_INTERPRETATION_TIME = new Date('2026-09-04T04:11:00.000Z');
const NARRATIVE_POLICY_VERSION = 'myeongha-relationship-annual-narrative-v1';
const NARRATIVE_POLICY_KEY = `myeongha-relationship-annual@${NARRATIVE_POLICY_VERSION}`;
const NARRATIVE_PROFILES = [
  ...RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES,
  ...RELATIONSHIP_ANNUAL_CLAIM_NARRATIVE_PROFILES,
] as const;

function annualRequest(caseId: string): ReadingRequest {
  return {
    requestId: caseId,
    intent: { domain: 'relationship', temporalScope: 'annual', relationshipScope: 'general' },
    targetPeriod: {
      scope: 'annual',
      year: TARGET_YEAR,
      timeZone: 'Asia/Seoul',
      referenceDateTime: FIXED_INTERPRETATION_TIME.toISOString(),
      resolution: 'relative_current',
    },
  };
}

function selectedRelationshipClaims(
  claims: readonly InterpretationClaim[],
  selectedClaimIds: readonly string[],
): readonly InterpretationClaim[] {
  const selected = new Set(selectedClaimIds);
  return claims
    .filter((claim) => selected.has(claim.claimId) && claim.state === 'active')
    .filter(
      (claim) =>
        claim.taxonomy.category === 'relationship' &&
        ((claim.taxonomy.tier === 'T8' && claim.taxonomy.subcategory === 'general') ||
          (claim.taxonomy.tier === 'T9' && claim.taxonomy.subcategory === 'annual')),
    )
    .sort((left, right) => left.claimId.localeCompare(right.claimId));
}

function consumedInputFingerprint(
  execution: ReturnType<typeof runInterpretation>,
  selectedClaimIds: readonly string[],
): string {
  const evaluations = new Map(
    execution.evaluations.map((evaluation) => [evaluation.evaluationId, evaluation] as const),
  );
  const entries = selectedRelationshipClaims(execution.claims, selectedClaimIds)
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
            ...(inputRef.evidenceVersion === undefined ? {} : { evidenceVersion: inputRef.evidenceVersion }),
            ...(inputRef.definitionRef === undefined ? {} : { definitionRef: inputRef.definitionRef }),
            ...(inputRef.definitionContentHash === undefined ? {} : { definitionContentHash: inputRef.definitionContentHash }),
            ...(inputRef.payloadHash === undefined ? {} : { payloadHash: inputRef.payloadHash }),
          })),
        };
      }),
    )
    .sort((left, right) => deterministicContentHash(left).localeCompare(deterministicContentHash(right)));

  return `relationship_annual_consumed_input_${deterministicContentHash({
    domain: 'relationship',
    relationshipScope: 'general',
    temporalScope: 'annual',
    entries,
  })}`;
}

function interpretationSignature(
  execution: ReturnType<typeof runInterpretation>,
  selectedClaimIds: readonly string[],
): string {
  const selectedClaims = selectedRelationshipClaims(execution.claims, selectedClaimIds);
  if (selectedClaims.length === 0) throw new Error('Expected selected Relationship Annual claims.');
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
    .sort((left, right) => deterministicContentHash(left).localeCompare(deterministicContentHash(right)));

  return `relationship_annual_interpretation_${deterministicContentHash({
    domain: 'relationship',
    relationshipScope: 'general',
    temporalScope: 'annual',
    claims: materials,
  })}`;
}

function buildObservation(caseId: string, month: number, day: number, hour: number): BenchmarkAObservation {
  const registry = createRelationshipAnnualReadingCandidateRegistry(FIXED_CALCULATION_TIME.toISOString());
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
    throw new Error(`Relationship Annual temporal context missing for ${caseId}.`);
  }
  const annualFacts = buildAnnualInterpretationFacts(snapshot, temporalContext);
  const execution = runInterpretation(snapshot, registry, {
    requestId: caseId,
    temporalFacts: { ...annualFacts },
    now: FIXED_INTERPRETATION_TIME,
  });
  const composition = buildReadingCompositionEvidence(snapshot, execution, registry, request, {
    narrativePolicyVersion: NARRATIVE_POLICY_VERSION,
  });
  if (composition.evidence === undefined || composition.selection.coverageState !== 'complete') {
    throw new Error(`Relationship Annual complete evidence missing for ${caseId}.`);
  }
  if (composition.selection.constraints.mayPromoteResearchAuthority !== false) {
    throw new Error(`Research authority promotion became possible for ${caseId}.`);
  }

  const selectedClaims = selectedRelationshipClaims(execution.claims, composition.selection.selectedClaimIds);
  if (
    !selectedClaims.some((claim) => claim.taxonomy.tier === 'T8') ||
    !selectedClaims.some((claim) => claim.taxonomy.tier === 'T9' && claim.taxonomy.subcategory === 'annual')
  ) {
    throw new Error(`Relationship Annual T8/T9 composition missing for ${caseId}.`);
  }

  const fallback = buildValidatedDeterministicFallback(composition.evidence.bundle, NARRATIVE_PROFILES);
  if (!fallback.validation.valid) throw new Error(`Invalid Relationship Annual fallback for ${caseId}.`);
  const narrativeSignature = deriveBenchmarkAFinalNarrativeSignature(fallback.draft);

  return {
    caseId,
    calculationHash: snapshot.calculationHash,
    consumedInputFingerprint: consumedInputFingerprint(execution, composition.selection.selectedClaimIds),
    interpretationSignature: interpretationSignature(execution, composition.selection.selectedClaimIds),
    narrativePolicyKey: NARRATIVE_POLICY_KEY,
    finalNarrativeSignature: narrativeSignature.signature,
    sectionNarrativeSignatures: narrativeSignature.sectionSignatures,
    narrativeSimilarityText: narrativeSignature.similarityText,
  };
}

describe('MyeongHa Relationship Annual synthetic corpus', () => {
  it('keeps all identity signatures deterministic', () => {
    const first = buildObservation('relationship-annual-determinism', 1, 9, 9);
    const repeated = buildObservation('relationship-annual-determinism', 1, 9, 9);
    expect(repeated.calculationHash).toBe(first.calculationHash);
    expect(repeated.consumedInputFingerprint).toBe(first.consumedInputFingerprint);
    expect(repeated.interpretationSignature).toBe(first.interpretationSignature);
    expect(repeated.finalNarrativeSignature).toBe(first.finalNarrativeSignature);
    expect(repeated.sectionNarrativeSignatures).toEqual(first.sectionNarrativeSignatures);
  });

  it(
    'measures 500 actual Relationship Annual readings and rejects clones or false diversity',
    () => {
      const observations: BenchmarkAObservation[] = [];
      let scannedBirthInputs = 0;
      outer: for (let month = 1; month <= 12; month += 1) {
        for (let day = 1; day <= 28; day += 1) {
          for (const hour of SYNTHETIC_HOURS) {
            scannedBirthInputs += 1;
            const caseId = `relationship-annual-synthetic-${String(scannedBirthInputs).padStart(4, '0')}`;
            observations.push(buildObservation(caseId, month, day, hour));
            if (observations.length >= TARGET_CASES) break outer;
          }
        }
      }

      const report = auditBenchmarkANaturalSyntheticCorpus(observations, TARGET_CASES, 20);
      process.stdout.write(
        `RELATIONSHIP_ANNUAL_SYNTHETIC_MEASUREMENT ${JSON.stringify({
          targetYear: TARGET_YEAR,
          scannedBirthInputs,
          observationCount: report.observationCount,
          distinctCalculationHashes: report.distinctCalculationHashes,
          distinctConsumedInputFingerprints: report.distinctConsumedInputFingerprints,
          distinctInterpretationSignatures: report.distinctInterpretationSignatures,
          distinctFinalNarrativeSignatures: report.distinctFinalNarrativeSignatures,
          crossSemanticExactFullReadingCloneGroupCount: report.crossSemanticExactFullReadingCloneGroupCount,
          falseDiversityGroupCount: report.falseDiversityGroupCount,
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
