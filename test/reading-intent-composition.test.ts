import { describe, expect, it } from 'vitest';
import {
  buildReadingCompositionEvidence,
  calculateCanonicalSajuSnapshot,
  createI7SeasonalSupportRegistry,
  resolveDomainReadingProfile,
  runInterpretation,
  type CalculationPolicySnapshot,
  type CanonicalSajuSnapshot,
  type ClaimRelation,
  type InterpretationClaim,
  type InterpretationExecutionResult,
} from '../src/index.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/reading-intent-composition-test',
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

function knownSnapshot(): CanonicalSajuSnapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy,
    { now: new Date('2026-08-23T00:00:00.000Z') },
  );
}

function ambiguousSnapshot(): CanonicalSajuSnapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 2, day: 4 },
      time: { known: false },
      sexForTraditionalCalculation: 'unspecified',
    },
    { ...policy, dayBoundary: 'jasi' },
    { now: new Date('2026-08-23T00:00:00.000Z') },
  );
}

interface ClaimFixture {
  id: string;
  tier: 'T8' | 'T9' | 'T10' | 'T11';
  category: string;
  subcategory?: string;
  scenarioRef?: string;
  methodologyId?: string;
  factRefs?: readonly string[];
}

function syntheticClaim(snapshotId: string, fixture: ClaimFixture): InterpretationClaim {
  return {
    claimId: fixture.id,
    schemaVersion: 'myeonghwa-reading-intent-test-claim-v1',
    snapshotId,
    ...(fixture.scenarioRef === undefined ? {} : { scenarioRef: fixture.scenarioRef }),
    taxonomy: {
      tier: fixture.tier,
      category: fixture.category,
      ...(fixture.subcategory === undefined ? {} : { subcategory: fixture.subcategory }),
    },
    claimType: `CLAIM-${fixture.id}`,
    subject: fixture.category,
    predicate: 'reading_fixture',
    value: { fixture: fixture.id },
    methodologyRef: {
      id: fixture.methodologyId ?? 'METHOD-READING-INTENT-TEST',
      version: '1.0.0-test',
    },
    ruleRefs: [
      {
        ruleId: `RULE-${fixture.id}`,
        version: '1.0.0-test',
        evaluationId: `eval-${fixture.id}`,
      },
    ],
    factRefs: fixture.factRefs ?? ['pillars.day'],
    upstreamClaimRefs: [],
    sourceRefs: [],
    state: 'active',
  };
}

function executionWithClaims(
  snapshot: CanonicalSajuSnapshot,
  registry: ReturnType<typeof createI7SeasonalSupportRegistry>,
  claims: readonly InterpretationClaim[],
  claimRelations: readonly ClaimRelation[] = [],
): InterpretationExecutionResult {
  const base = runInterpretation(snapshot, registry, {
    now: new Date('2026-08-23T01:00:00.000Z'),
  });
  return {
    ...base,
    claims,
    claimRelations,
    integrity: { valid: true, errors: [] },
    evidenceIndex: {},
  };
}

describe('ReadingIntent composition contract', () => {
  it('selects natal T8 domain claims for a general natal reading and excludes unrelated period claims', () => {
    const snapshot = knownSnapshot();
    const registry = createI7SeasonalSupportRegistry();
    const career = syntheticClaim(snapshot.snapshotId, {
      id: 'claim-career-natal',
      tier: 'T8',
      category: 'career',
    });
    const wealth = syntheticClaim(snapshot.snapshotId, {
      id: 'claim-wealth-natal',
      tier: 'T8',
      category: 'wealth',
    });
    const annual = syntheticClaim(snapshot.snapshotId, {
      id: 'claim-general-annual',
      tier: 'T9',
      category: 'general',
      subcategory: 'annual',
    });
    const execution = executionWithClaims(snapshot, registry, [career, wealth, annual]);

    const result = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'general-natal',
        intent: { domain: 'general', temporalScope: 'natal' },
      },
      { narrativePolicyVersion: 'reading-intent-test-v1' },
    );

    expect(result.selection.coverageState).toBe('complete');
    expect(result.selection.targetClaimIds).toEqual([career.claimId, wealth.claimId].sort());
    expect(result.selection.selectedClaimIds).toEqual([career.claimId, wealth.claimId].sort());
    expect(result.selection.omittedClaimIds).toContain(annual.claimId);
    expect(result.evidence?.bundle.claims.map((claim) => claim.claimId)).not.toContain(annual.claimId);
  });

  it('selects only explicitly parent-scoped family claims and does not fabricate missing parent evidence', () => {
    const snapshot = knownSnapshot();
    const registry = createI7SeasonalSupportRegistry();
    const parent = syntheticClaim(snapshot.snapshotId, {
      id: 'claim-family-parents',
      tier: 'T8',
      category: 'family',
      subcategory: 'parents',
    });
    const child = syntheticClaim(snapshot.snapshotId, {
      id: 'claim-family-children',
      tier: 'T8',
      category: 'family',
      subcategory: 'children',
    });

    const supported = buildReadingCompositionEvidence(
      snapshot,
      executionWithClaims(snapshot, registry, [parent, child]),
      registry,
      {
        requestId: 'parents-supported',
        intent: {
          domain: 'family',
          temporalScope: 'natal',
          relationshipScope: 'parents',
        },
      },
      { narrativePolicyVersion: 'reading-intent-test-v1' },
    );
    expect(supported.selection.targetClaimIds).toEqual([parent.claimId]);
    expect(supported.selection.selectedClaimIds).toEqual([parent.claimId]);
    expect(supported.selection.omittedClaimIds).toContain(child.claimId);

    const missing = buildReadingCompositionEvidence(
      snapshot,
      executionWithClaims(snapshot, registry, [child]),
      registry,
      {
        requestId: 'parents-missing',
        intent: {
          domain: 'family',
          temporalScope: 'natal',
          relationshipScope: 'parents',
        },
      },
      { narrativePolicyVersion: 'reading-intent-test-v1' },
    );
    expect(missing.selection.coverageState).toBe('insufficient_evidence');
    expect(missing.selection.targetClaimIds).toEqual([]);
    expect(missing.evidence).toBeUndefined();
  });

  it('combines natal domain claims with matching annual T9 claims while excluding monthly and unrelated domains', () => {
    const snapshot = knownSnapshot();
    const registry = createI7SeasonalSupportRegistry();
    const careerNatal = syntheticClaim(snapshot.snapshotId, {
      id: 'claim-career-natal',
      tier: 'T8',
      category: 'career',
    });
    const careerAnnual = syntheticClaim(snapshot.snapshotId, {
      id: 'claim-career-annual',
      tier: 'T9',
      category: 'career',
      subcategory: 'annual',
    });
    const careerMonthly = syntheticClaim(snapshot.snapshotId, {
      id: 'claim-career-monthly',
      tier: 'T9',
      category: 'career',
      subcategory: 'monthly',
    });
    const wealthAnnual = syntheticClaim(snapshot.snapshotId, {
      id: 'claim-wealth-annual',
      tier: 'T9',
      category: 'wealth',
      subcategory: 'annual',
    });
    const execution = executionWithClaims(snapshot, registry, [
      careerNatal,
      careerAnnual,
      careerMonthly,
      wealthAnnual,
    ]);

    const career = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'career-annual',
        intent: { domain: 'career', temporalScope: 'annual' },
      },
      { narrativePolicyVersion: 'reading-intent-test-v1' },
    );
    expect(career.selection.coverageState).toBe('complete');
    expect(career.selection.targetClaimIds).toEqual(
      [careerNatal.claimId, careerAnnual.claimId].sort(),
    );
    expect(career.selection.omittedClaimIds).toEqual(
      [careerMonthly.claimId, wealthAnnual.claimId].sort(),
    );

    const businessNatal = syntheticClaim(snapshot.snapshotId, {
      id: 'claim-business-natal',
      tier: 'T8',
      category: 'business',
    });
    const businessAnnual = syntheticClaim(snapshot.snapshotId, {
      id: 'claim-business-annual',
      tier: 'T9',
      category: 'business',
      subcategory: 'annual',
    });
    const business = buildReadingCompositionEvidence(
      snapshot,
      executionWithClaims(snapshot, registry, [businessNatal, businessAnnual]),
      registry,
      {
        requestId: 'business-annual',
        intent: { domain: 'business', temporalScope: 'annual' },
      },
      { narrativePolicyVersion: 'reading-intent-test-v1' },
    );
    expect(business.selection.coverageState).toBe('complete');
    expect(business.selection.targetClaimIds).toEqual(
      [businessNatal.claimId, businessAnnual.claimId].sort(),
    );
  });

  it('preserves unknown-time scenario claims and scenario-resolved facts without collapsing them', () => {
    const snapshot = ambiguousSnapshot();
    const registry = createI7SeasonalSupportRegistry();
    expect(snapshot.scenarios.length).toBeGreaterThan(1);
    const claims = snapshot.scenarios.map((scenario, index) =>
      syntheticClaim(snapshot.snapshotId, {
        id: `claim-career-scenario-${index}`,
        tier: 'T8',
        category: 'career',
        scenarioRef: scenario.scenarioId,
        factRefs: ['pillars.day'],
      }),
    );
    const execution = executionWithClaims(snapshot, registry, claims);

    const result = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'career-unknown-time',
        intent: { domain: 'career', temporalScope: 'natal' },
      },
      { narrativePolicyVersion: 'reading-intent-test-v1' },
    );

    expect(result.selection.coverageState).toBe('complete');
    expect(result.selection.scenarioRefs).toEqual(
      snapshot.scenarios.map((scenario) => scenario.scenarioId).sort(),
    );
    expect(result.selection.constraints.mayCollapseScenarios).toBe(false);
    expect(result.evidence?.bundle.canonicalFacts.some((fact) => fact.fact.status === 'ambiguous')).toBe(
      true,
    );
    const scenarioFacts = result.evidence?.bundle.canonicalFacts.filter(
      (fact) => fact.scenarioRef !== undefined,
    );
    expect(scenarioFacts?.length).toBeGreaterThan(0);
  });

  it('preserves contradictory methodology claims and their contradiction relation', () => {
    const snapshot = knownSnapshot();
    const registry = createI7SeasonalSupportRegistry();
    const methodA = syntheticClaim(snapshot.snapshotId, {
      id: 'claim-career-method-a',
      tier: 'T8',
      category: 'career',
      methodologyId: 'METHOD-A',
    });
    const methodB = syntheticClaim(snapshot.snapshotId, {
      id: 'claim-career-method-b',
      tier: 'T8',
      category: 'career',
      methodologyId: 'METHOD-B',
    });
    const contradiction: ClaimRelation = {
      relationId: 'relation-career-contradiction',
      fromClaimId: methodA.claimId,
      toClaimId: methodB.claimId,
      relation: 'contradicts',
      reason: 'test-methodology-disagreement',
    };

    const result = buildReadingCompositionEvidence(
      snapshot,
      executionWithClaims(snapshot, registry, [methodA, methodB], [contradiction]),
      registry,
      {
        requestId: 'career-conflict',
        intent: { domain: 'career', temporalScope: 'natal' },
      },
      { narrativePolicyVersion: 'reading-intent-test-v1' },
    );

    expect(result.selection.selectedClaimIds).toEqual([methodA.claimId, methodB.claimId].sort());
    expect(result.selection.conflictRelationIds).toEqual([contradiction.relationId]);
    expect(result.selection.constraints.mayResolveConflicts).toBe(false);
    expect(result.evidence?.bundle.claimRelations).toEqual([contradiction]);
  });

  it('reports partial, insufficient and unsupported states deterministically instead of inventing claims', () => {
    const snapshot = knownSnapshot();
    const registry = createI7SeasonalSupportRegistry();
    const careerNatal = syntheticClaim(snapshot.snapshotId, {
      id: 'claim-career-natal-only',
      tier: 'T8',
      category: 'career',
    });
    const execution = executionWithClaims(snapshot, registry, [careerNatal]);

    const partial = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'career-annual-partial',
        intent: { domain: 'career', temporalScope: 'annual' },
      },
      { narrativePolicyVersion: 'reading-intent-test-v1' },
    );
    expect(partial.selection.coverageState).toBe('partial_coverage');
    expect(partial.selection.targetClaimIds).toEqual([careerNatal.claimId]);
    expect(partial.selection.missingRequirements).toEqual([
      'ANNUAL_CAREER_PERIOD_CLAIM_REQUIRED',
    ]);

    const insufficient = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'business-annual-insufficient',
        intent: { domain: 'business', temporalScope: 'annual' },
      },
      { narrativePolicyVersion: 'reading-intent-test-v1' },
    );
    expect(insufficient.selection.coverageState).toBe('insufficient_evidence');
    expect(insufficient.selection.selectedClaimIds).toEqual([]);
    expect(insufficient.evidence).toBeUndefined();

    const unsupported = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'family-invalid-shape',
        intent: { domain: 'family', temporalScope: 'natal' },
      },
      { narrativePolicyVersion: 'reading-intent-test-v1' },
    );
    expect(unsupported.selection.coverageState).toBe('unsupported_intent');
    expect(unsupported.selection.missingRequirements).toEqual([
      'READING_PROFILE_NOT_AVAILABLE_FOR_INTENT',
    ]);
    expect(unsupported.evidence).toBeUndefined();
    expect(unsupported.selection.constraints.mayGenerateClaims).toBe(false);
    expect(unsupported.selection.constraints.mayPromoteResearchAuthority).toBe(false);
  });

  it('produces deterministic selection identity from snapshot, interpretation run, intent and profile content', () => {
    const snapshot = knownSnapshot();
    const registry = createI7SeasonalSupportRegistry();
    const career = syntheticClaim(snapshot.snapshotId, {
      id: 'claim-career-deterministic',
      tier: 'T8',
      category: 'career',
    });
    const execution = executionWithClaims(snapshot, registry, [career]);
    const intent = { domain: 'career', temporalScope: 'natal' } as const;

    const first = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      { requestId: 'request-one', intent },
      { narrativePolicyVersion: 'reading-intent-test-v1' },
    );
    const second = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      { requestId: 'request-two', intent, outputPreferences: { preferredDetail: 'detailed' } },
      { narrativePolicyVersion: 'reading-intent-test-v1' },
    );
    const profileA = resolveDomainReadingProfile(intent);
    const profileB = resolveDomainReadingProfile(intent);

    expect(first.selection.selectionId).toBe(second.selection.selectionId);
    expect(first.selection.targetClaimIds).toEqual(second.selection.targetClaimIds);
    expect(first.selection.selectedClaimIds).toEqual(second.selection.selectedClaimIds);
    expect(profileA?.profileRef).toEqual(profileB?.profileRef);
    expect(first.selection.profileRef?.contentHash).toBe(profileA?.profileRef.contentHash);
  });

  it('never turns reading selection into interpretation authority or claim generation', () => {
    const snapshot = knownSnapshot();
    const registry = createI7SeasonalSupportRegistry();
    const execution = executionWithClaims(snapshot, registry, []);
    const beforeClaims = execution.claims.length;

    const result = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'no-authority-escalation',
        intent: { domain: 'wealth', temporalScope: 'natal' },
      },
      { narrativePolicyVersion: 'reading-intent-test-v1' },
    );

    expect(execution.claims).toHaveLength(beforeClaims);
    expect(result.selection.coverageState).toBe('insufficient_evidence');
    expect(result.selection.selectedClaimIds).toEqual([]);
    expect(result.selection.constraints).toEqual({
      mayGenerateClaims: false,
      mayResolveConflicts: false,
      mayCollapseScenarios: false,
      mayPromoteResearchAuthority: false,
    });
    expect(result.evidence).toBeUndefined();
  });
});
