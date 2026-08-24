import { describe, expect, it } from 'vitest';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import type { DomainReadingProfile, ReadingClaimSelectorGroup } from '../src/contracts/reading.js';
import { evaluateScenarioAwareReadingCoverage } from '../src/reading/scenario-aware-reading-composition.js';

function group(requirementId: string, claimType: string): ReadingClaimSelectorGroup {
  return {
    requirementId,
    anyOf: [
      {
        selectorId: `selector-${requirementId}`,
        taxonomy: { tiers: ['T8'], categories: ['career'] },
        claimTypes: [claimType],
      },
    ],
  };
}

function profile(
  requiredClaimSelectors: readonly ReadingClaimSelectorGroup[],
  mur?: DomainReadingProfile['minimumUsefulReading'],
): DomainReadingProfile {
  return {
    profileId: 'myeonghwa-reading-profile-synthetic-career-mur-v1',
    version: '1.0.0-test',
    registryVersion: 'test',
    intent: { domain: 'career', temporalScope: 'natal' },
    requiredClaimSelectors,
    optionalClaimSelectors: [],
    excludedClaimSelectors: [],
    temporalRequirements: {
      scope: 'natal',
      periodEvidence: 'not_required',
      explicitPeriodSubcategoryRequired: false,
    },
    scenarioHandling: 'preserve_claim_scenarios',
    ambiguityHandling: 'preserve',
    conflictPolicy: 'preserve_all',
    minimumEvidencePolicy: {
      complete: 'all_required_groups',
      partial: 'some_required_groups',
      insufficient: 'no_required_groups',
    },
    ...(mur === undefined ? {} : { minimumUsefulReading: mur }),
  };
}

function claim(id: string, claimType: string, scenarioRef?: string): InterpretationClaim {
  return {
    claimId: id,
    schemaVersion: 'scenario-aware-reading-test-v1',
    snapshotId: 'snapshot-test',
    ...(scenarioRef === undefined ? {} : { scenarioRef }),
    taxonomy: { tier: 'T8', category: 'career' },
    claimType,
    subject: 'career',
    predicate: 'synthetic',
    value: { id },
    methodologyRef: { id: 'METHOD-SYNTHETIC', version: '1.0.0-test' },
    ruleRefs: [],
    factRefs: [],
    upstreamClaimRefs: [],
    sourceRefs: [],
    state: 'active',
  };
}

describe('scenario-aware reading coverage', () => {
  it('does not let sibling scenarios complete each other required groups', () => {
    const readingProfile = profile([
      group('CORE_REQUIRED', 'CAREER-CORE'),
      group('ENV_REQUIRED', 'CAREER-ENV'),
    ]);
    const result = evaluateScenarioAwareReadingCoverage(readingProfile, [
      claim('scenario-a-core', 'CAREER-CORE', 'scenario-a'),
      claim('scenario-b-env', 'CAREER-ENV', 'scenario-b'),
    ]);

    expect(result.coverageState).toBe('partial_coverage');
    expect(result.scenarioCoverage).toEqual([
      {
        scenarioRef: 'scenario-a',
        coverageState: 'partial_coverage',
        matchedRequirementIds: ['CORE_REQUIRED'],
        missingRequirements: ['ENV_REQUIRED'],
        targetClaimIds: ['scenario-a-core'],
      },
      {
        scenarioRef: 'scenario-b',
        coverageState: 'partial_coverage',
        matchedRequirementIds: ['ENV_REQUIRED'],
        missingRequirements: ['CORE_REQUIRED'],
        targetClaimIds: ['scenario-b-env'],
      },
    ]);
    expect(result.missingRequirements).toEqual([
      'SCENARIO[scenario-a]:ENV_REQUIRED',
      'SCENARIO[scenario-b]:CORE_REQUIRED',
    ]);
  });

  it('allows non-scenario invariant claims to support every preserved scenario', () => {
    const readingProfile = profile([
      group('CORE_REQUIRED', 'CAREER-CORE'),
      group('ENV_REQUIRED', 'CAREER-ENV'),
    ]);
    const result = evaluateScenarioAwareReadingCoverage(readingProfile, [
      claim('global-core', 'CAREER-CORE'),
      claim('scenario-a-env', 'CAREER-ENV', 'scenario-a'),
      claim('scenario-b-env', 'CAREER-ENV', 'scenario-b'),
    ]);

    expect(result.coverageState).toBe('complete');
    expect(result.scenarioCoverage.every((item) => item.coverageState === 'complete')).toBe(true);
    expect(result.scenarioCoverage[0]?.targetClaimIds).toEqual(['global-core', 'scenario-a-env']);
    expect(result.scenarioCoverage[1]?.targetClaimIds).toEqual(['global-core', 'scenario-b-env']);
  });

  it('keeps legacy no-scenario all-required-groups semantics when MUR is absent', () => {
    const readingProfile = profile([
      group('CORE_REQUIRED', 'CAREER-CORE'),
      group('ENV_REQUIRED', 'CAREER-ENV'),
    ]);
    const result = evaluateScenarioAwareReadingCoverage(readingProfile, [
      claim('core', 'CAREER-CORE'),
      claim('env', 'CAREER-ENV'),
    ]);

    expect(result.coverageState).toBe('complete');
    expect(result.scenarioCoverage).toEqual([
      {
        coverageState: 'complete',
        matchedRequirementIds: ['CORE_REQUIRED', 'ENV_REQUIRED'],
        missingRequirements: [],
        targetClaimIds: ['core', 'env'],
      },
    ]);
  });

  it('requires all MUR core groups plus the configured supplementary minimum', () => {
    const readingProfile = profile(
      [
        group('CORE_REQUIRED', 'CAREER-CORE'),
        group('ENV_REQUIRED', 'CAREER-ENV'),
        group('FRICTION_REQUIRED', 'CAREER-FRICTION'),
      ],
      {
        coreRequirementIds: ['CORE_REQUIRED'],
        supplementaryRequirementIds: ['ENV_REQUIRED', 'FRICTION_REQUIRED'],
        minimumSupplementaryMatches: 1,
        scenarioMode: 'each_scenario',
      },
    );
    const result = evaluateScenarioAwareReadingCoverage(readingProfile, [
      claim('core', 'CAREER-CORE'),
      claim('friction', 'CAREER-FRICTION'),
    ]);

    expect(result.coverageState).toBe('complete');
    expect(result.scenarioCoverage[0]?.matchedRequirementIds).toEqual([
      'CORE_REQUIRED',
      'FRICTION_REQUIRED',
    ]);
    expect(result.scenarioCoverage[0]?.missingRequirements).toEqual([]);
  });

  it('does not treat one core T8 claim as a Minimum Useful Reading', () => {
    const readingProfile = profile(
      [
        group('CORE_REQUIRED', 'CAREER-CORE'),
        group('ENV_REQUIRED', 'CAREER-ENV'),
        group('FRICTION_REQUIRED', 'CAREER-FRICTION'),
      ],
      {
        coreRequirementIds: ['CORE_REQUIRED'],
        supplementaryRequirementIds: ['ENV_REQUIRED', 'FRICTION_REQUIRED'],
        minimumSupplementaryMatches: 1,
        scenarioMode: 'each_scenario',
      },
    );
    const result = evaluateScenarioAwareReadingCoverage(readingProfile, [
      claim('core-only', 'CAREER-CORE'),
    ]);

    expect(result.coverageState).toBe('partial_coverage');
    expect(result.missingRequirements).toEqual(['MUR_SUPPLEMENTARY_MINIMUM_NOT_MET:0/1']);
  });

  it('does not allow supplementary evidence to replace a missing MUR core', () => {
    const readingProfile = profile(
      [
        group('CORE_REQUIRED', 'CAREER-CORE'),
        group('ENV_REQUIRED', 'CAREER-ENV'),
        group('FRICTION_REQUIRED', 'CAREER-FRICTION'),
      ],
      {
        coreRequirementIds: ['CORE_REQUIRED'],
        supplementaryRequirementIds: ['ENV_REQUIRED', 'FRICTION_REQUIRED'],
        minimumSupplementaryMatches: 1,
        scenarioMode: 'each_scenario',
      },
    );
    const result = evaluateScenarioAwareReadingCoverage(readingProfile, [
      claim('env', 'CAREER-ENV'),
      claim('friction', 'CAREER-FRICTION'),
    ]);

    expect(result.coverageState).toBe('partial_coverage');
    expect(result.missingRequirements).toEqual(['CORE_REQUIRED']);
  });

  it('applies the MUR threshold independently to every scenario', () => {
    const readingProfile = profile(
      [
        group('CORE_REQUIRED', 'CAREER-CORE'),
        group('ENV_REQUIRED', 'CAREER-ENV'),
      ],
      {
        coreRequirementIds: ['CORE_REQUIRED'],
        supplementaryRequirementIds: ['ENV_REQUIRED'],
        minimumSupplementaryMatches: 1,
        scenarioMode: 'each_scenario',
      },
    );
    const result = evaluateScenarioAwareReadingCoverage(readingProfile, [
      claim('global-core', 'CAREER-CORE'),
      claim('scenario-a-env', 'CAREER-ENV', 'scenario-a'),
      claim('scenario-b-unrelated', 'CAREER-OTHER', 'scenario-b'),
    ]);

    expect(result.coverageState).toBe('partial_coverage');
    expect(result.scenarioCoverage[0]?.coverageState).toBe('complete');
    expect(result.scenarioCoverage[1]?.coverageState).toBe('partial_coverage');
    expect(result.missingRequirements).toEqual([
      'SCENARIO[scenario-b]:MUR_SUPPLEMENTARY_MINIMUM_NOT_MET:0/1',
    ]);
  });

  it('fails closed when an MUR policy does not classify the required selector set exactly', () => {
    const readingProfile = profile(
      [
        group('CORE_REQUIRED', 'CAREER-CORE'),
        group('ENV_REQUIRED', 'CAREER-ENV'),
      ],
      {
        coreRequirementIds: ['CORE_REQUIRED'],
        supplementaryRequirementIds: [],
        minimumSupplementaryMatches: 0,
        scenarioMode: 'each_scenario',
      },
    );

    expect(() => evaluateScenarioAwareReadingCoverage(readingProfile, [])).toThrow(
      /must classify every required selector group/,
    );
  });
});
