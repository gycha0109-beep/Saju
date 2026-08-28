import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { prepareProductReading } from '../src/reading/product-reading-integration.js';
import { createBusinessNatalReadingCandidateRegistry } from '../src/research/business-natal-reading-candidate.js';
import {
  CAREER_RESEARCH_PREVIEW_SELECTION,
  assertCareerResearchPreviewEvidenceIsolation,
  inspectCareerResearchPreviewIsolation,
} from '../src/research/career-research-preview-isolation.js';

const FIXED_CALCULATION_TIME = new Date('2026-08-28T00:00:00.000Z');
const FIXED_INTERPRETATION_TIME = new Date('2026-08-28T00:01:00.000Z');

function actualCareerEvidence() {
  const registry = createBusinessNatalReadingCandidateRegistry(
    FIXED_CALCULATION_TIME.toISOString(),
  );
  const snapshot = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: FIXED_CALCULATION_TIME },
  );
  const execution = runInterpretation(snapshot, registry, {
    requestId: 'career-preview-isolation-actual-engine',
    now: FIXED_INTERPRETATION_TIME,
  });
  const prepared = prepareProductReading(
    snapshot,
    execution,
    registry,
    { requestId: 'career-preview-isolation-actual-engine', text: '직업운' },
    {
      narrativePolicyRef: { id: 'myeonghwa-narrative-policy', version: '1.0.0-test' },
      outputSchemaVersion: 'myeonghwa-narrative-draft-v1',
    },
  );

  expect(prepared.state).toBe('ready_for_narrative');
  if (prepared.state !== 'ready_for_narrative' || prepared.narrativeRequest === undefined) {
    throw new Error('Synthetic Career preview fixture must reach ready_for_narrative.');
  }
  return prepared.narrativeRequest.evidenceBundle;
}

describe('P7 Career research preview isolation gate', () => {
  it('explicitly keeps the current preview on the isolated legacy direct-T8 path', () => {
    const report = assertCareerResearchPreviewEvidenceIsolation(actualCareerEvidence());

    expect(CAREER_RESEARCH_PREVIEW_SELECTION).toEqual({
      version: '0.1.0-research',
      defaultPath: 'legacy_direct_t8',
      personalizedDefaultAllowed: false,
      switchRequirement:
        'authorized_personalized_career_t8_pack_plus_explicit_preview_isolation_validation',
    });
    expect(report.state).toBe('isolated_legacy_direct_t8');
    expect(report.configuredPath).toBe('legacy_direct_t8');
    expect(report.activeCareerT8ClaimCount).toBeGreaterThan(0);
    expect(report.legacyDirectT8ClaimCount).toBe(report.activeCareerT8ClaimCount);
    expect(report.nonLegacyCareerT8ClaimCount).toBe(0);
    expect(report.directCareerConclusionCount).toBeGreaterThan(0);
    expect(report.personalizedDefaultAllowed).toBe(false);
    expect(report.reasons).toEqual([]);
  });

  it('fails closed instead of mixing a non-legacy Career T8 claim into the preview bundle', () => {
    const evidence = actualCareerEvidence();
    const baseCareerClaim = evidence.claims.find(
      (claim) => claim.taxonomy.tier === 'T8' && claim.taxonomy.category === 'career',
    );
    expect(baseCareerClaim).toBeDefined();
    if (baseCareerClaim === undefined) throw new Error('Expected a Career T8 claim.');

    const nonLegacyClaim: InterpretationClaim = {
      ...baseCareerClaim,
      claimId: `${baseCareerClaim.claimId}:personalized-sentinel`,
      methodologyRef: { id: 'M-PERSONALIZED-CAREER-T5-T6-T8-SENTINEL', version: '0.0.0-test' },
      upstreamClaimRefs: ['T5-PERSONALIZED-SENTINEL'],
    };
    const contaminated = {
      ...evidence,
      claims: [...evidence.claims, nonLegacyClaim],
    };

    const report = inspectCareerResearchPreviewIsolation(contaminated);
    expect(report.state).toBe('blocked');
    expect(report.nonLegacyCareerT8ClaimCount).toBe(1);
    expect(report.reasons).toContain('NON_LEGACY_CAREER_T8_PRESENT');
    expect(() => assertCareerResearchPreviewEvidenceIsolation(contaminated)).toThrow(
      'CAREER_RESEARCH_PREVIEW_ISOLATION_BLOCKED:NON_LEGACY_CAREER_T8_PRESENT',
    );
  });

  it('fails closed when no active Career T8 evidence is available', () => {
    const evidence = actualCareerEvidence();
    const withoutCareer = {
      ...evidence,
      claims: evidence.claims.filter(
        (claim) => !(claim.taxonomy.tier === 'T8' && claim.taxonomy.category === 'career'),
      ),
    };

    const report = inspectCareerResearchPreviewIsolation(withoutCareer);
    expect(report.state).toBe('blocked');
    expect(report.reasons).toEqual([
      'NO_ACTIVE_CAREER_T8_CLAIMS',
      'NO_DIRECT_CAREER_CONCLUSION',
    ]);
    expect(() => assertCareerResearchPreviewEvidenceIsolation(withoutCareer)).toThrow(
      'CAREER_RESEARCH_PREVIEW_ISOLATION_BLOCKED:NO_ACTIVE_CAREER_T8_CLAIMS,NO_DIRECT_CAREER_CONCLUSION',
    );
  });
});
