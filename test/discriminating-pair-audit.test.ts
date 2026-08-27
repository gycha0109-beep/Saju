import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot, TenGodChartFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import type { ReadingEvidenceSelection } from '../src/contracts/reading.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { createCareerNatalReadingCandidateRegistry } from '../src/research/career-natal-reading-candidate.js';
import {
  auditDiscriminatingPair,
  type PersonalizationObservation,
} from '../src/verification/discriminating-pair-audit.js';
import { deriveConsumedInputFingerprints } from '../src/verification/consumed-input-fingerprint.js';
import { deriveDomainInterpretationSignatures } from '../src/verification/domain-interpretation-signature.js';

const FIVE_FAMILY_TEN_GODS: TenGodChartFact = {
  year: { stem: resolved('비견'), branch: resolved('정인') },
  month: { stem: resolved('편재'), branch: resolved('정재') },
  day: { stem: resolved('일간'), branch: resolved('상관') },
  hour: { stem: resolved('편관'), branch: resolved('식신') },
};

const ALTERNATE_TEN_GODS: TenGodChartFact = {
  year: { stem: resolved('정재'), branch: resolved('정인') },
  month: { stem: resolved('상관'), branch: resolved('편재') },
  day: { stem: resolved('일간'), branch: resolved('편관') },
  hour: { stem: resolved('식신'), branch: resolved('비견') },
};

function fixture(tenGods: TenGodChartFact, day: number): CanonicalSajuSnapshot {
  const base = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: new Date('2026-08-27T08:00:00.000Z') },
  );
  return {
    ...base,
    derivedFacts: { ...base.derivedFacts, tenGods: resolved(tenGods) },
  };
}

function careerSelection(
  execution: ReturnType<typeof runInterpretation>,
  caseId: string,
): ReadingEvidenceSelection {
  const selectedClaimIds = execution.claims
    .filter(
      (claim) =>
        claim.state === 'active' &&
        claim.taxonomy.tier === 'T8' &&
        claim.taxonomy.category === 'career',
    )
    .map((claim) => claim.claimId)
    .sort();
  if (selectedClaimIds.length === 0) throw new Error(`Expected Career T8 claims for ${caseId}.`);

  return {
    selectionId: `selection-${caseId}`,
    intent: { domain: 'career', temporalScope: 'natal' },
    coverageState: 'complete',
    targetClaimIds: selectedClaimIds,
    selectedClaimIds,
    omittedClaimIds: [],
    missingRequirements: [],
    scenarioRefs: [],
    conflictRelationIds: [],
    constraints: {
      mayGenerateClaims: false,
      mayResolveConflicts: false,
      mayCollapseScenarios: false,
      mayPromoteResearchAuthority: false,
    },
  };
}

function observe(snapshot: CanonicalSajuSnapshot, caseId: string): PersonalizationObservation {
  const registry = createCareerNatalReadingCandidateRegistry();
  const execution = runInterpretation(snapshot, registry, {
    requestId: `request-${caseId}`,
    now: new Date('2026-08-27T08:01:00.000Z'),
  });
  const selection = careerSelection(execution, caseId);
  const fingerprints = deriveConsumedInputFingerprints(execution, registry, selection);
  const signatures = deriveDomainInterpretationSignatures(
    execution.claims,
    execution.claimRelations,
    selection,
  );

  if (fingerprints.length !== 1) {
    throw new Error(`Expected exactly one consumed-input fingerprint for ${caseId}.`);
  }
  if (signatures.length !== 1) {
    throw new Error(`Expected exactly one interpretation signature for ${caseId}.`);
  }
  const fingerprint = fingerprints[0];
  const signature = signatures[0];
  if (fingerprint === undefined || signature === undefined) {
    throw new Error(`Expected complete personalization observation for ${caseId}.`);
  }

  return {
    caseId,
    consumedInputFingerprint: fingerprint.fingerprint,
    interpretationSignature: signature.signature,
  };
}

describe('P5 discriminating pair audit', () => {
  it('detects a methodology-consumed Ten-God structure change and the resulting T8 semantic change', () => {
    const left = observe(fixture(FIVE_FAMILY_TEN_GODS, 10), 'consumed-structure-a');
    const right = observe(fixture(ALTERNATE_TEN_GODS, 10), 'consumed-structure-b');

    const result = auditDiscriminatingPair(left, right, {
      consumedInput: 'different',
      interpretation: 'different',
    });

    expect(result.passed).toBe(true);
    expect(result.failures).toEqual([]);
    expect(result.observed).toEqual({
      consumedInput: 'different',
      interpretation: 'different',
    });
  });

  it('keeps T8 personalization stable when only a non-consumed birth-date dimension changes', () => {
    const left = observe(fixture(FIVE_FAMILY_TEN_GODS, 10), 'control-date-a');
    const right = observe(fixture(FIVE_FAMILY_TEN_GODS, 11), 'control-date-b');

    const result = auditDiscriminatingPair(left, right, {
      consumedInput: 'same',
      interpretation: 'same',
    });

    expect(result.passed).toBe(true);
    expect(result.failures).toEqual([]);
    expect(result.observed).toEqual({ consumedInput: 'same', interpretation: 'same' });
  });

  it('reports input collapse separately from interpretation convergence', () => {
    const sameFingerprintDifferentSignature = auditDiscriminatingPair(
      {
        caseId: 'left',
        consumedInputFingerprint: 'input-a',
        interpretationSignature: 'signature-a',
      },
      {
        caseId: 'right',
        consumedInputFingerprint: 'input-a',
        interpretationSignature: 'signature-b',
      },
      { consumedInput: 'different', interpretation: 'different' },
    );

    expect(sameFingerprintDifferentSignature.passed).toBe(false);
    expect(sameFingerprintDifferentSignature.failures).toEqual([
      'EXPECTED_CONSUMED_INPUT_DIFFERENCE_COLLAPSED',
    ]);

    const differentFingerprintSameSignature = auditDiscriminatingPair(
      {
        caseId: 'left',
        consumedInputFingerprint: 'input-a',
        interpretationSignature: 'signature-a',
      },
      {
        caseId: 'right',
        consumedInputFingerprint: 'input-b',
        interpretationSignature: 'signature-a',
      },
      { consumedInput: 'different', interpretation: 'different' },
    );

    expect(differentFingerprintSameSignature.passed).toBe(false);
    expect(differentFingerprintSameSignature.failures).toEqual([
      'EXPECTED_INTERPRETATION_DIFFERENCE_COLLAPSED',
    ]);
  });

  it('detects false diversity when a declared non-consumed control changes fingerprint or semantics', () => {
    const result = auditDiscriminatingPair(
      {
        caseId: 'control-a',
        consumedInputFingerprint: 'input-a',
        interpretationSignature: 'signature-a',
      },
      {
        caseId: 'control-b',
        consumedInputFingerprint: 'input-b',
        interpretationSignature: 'signature-b',
      },
      { consumedInput: 'same', interpretation: 'same' },
    );

    expect(result.passed).toBe(false);
    expect(result.failures).toEqual([
      'EXPECTED_CONSUMED_INPUT_STABILITY_BROKEN',
      'EXPECTED_INTERPRETATION_STABILITY_BROKEN',
    ]);
  });
});
