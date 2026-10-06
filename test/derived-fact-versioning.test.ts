import { describe, expect, test } from 'vitest';
import {
  INTERPRETATION_AUTHORIZATION_POLICY_VERSION,
  runInterpretation,
} from '../src/interpretation/interpretation-engine.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { createI13StrengthEvidenceRegistry } from '../src/research/i13-strength-evidence-pack.js';
import type { CalculationPolicySnapshot } from '../src/contracts/calculation.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/derived-fact-version-test',
  policyVersion: '1.0.0',
  dayBoundary: 'midnight',
  trueSolarTime: {
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  },
  timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
};

describe('derived fact and interpretation authority versioning', () => {
  test('records current derived-fact and exact-attestation authorization revisions', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 1992, month: 10, day: 24 },
        time: { known: true, hour: 5, minute: 30 },
        sexForTraditionalCalculation: 'unspecified',
      },
      policy,
    );
    const result = runInterpretation(snapshot, createI13StrengthEvidenceRegistry());

    expect(snapshot.schemaVersion).toBe('saju-canonical-v1.6');
    expect(snapshot.derivedFacts.hiddenStems).toBeDefined();
    expect(snapshot.derivedFacts.structuralRelations).toBeDefined();
    expect(snapshot.derivedFacts.branchClashContexts).toBeDefined();
    expect(snapshot.derivedFacts.branchClashQualifierObservations).toBeDefined();
    expect(snapshot.derivedFacts.stemInteractionSettlements).toBeDefined();
    expect(result.run.derivedFactSetVersion).toBe('myeonghwa-derived-facts-v1.4');
    expect(result.run.interpretationEngineVersion).toBe('0.5.0');
    expect(result.run.authorizationPolicyVersion).toBe(
      INTERPRETATION_AUTHORIZATION_POLICY_VERSION,
    );
    expect(result.run.authorizationPolicyVersion).toBe(
      'myeonghwa-interpretation-authorization-v4',
    );
  });
});
