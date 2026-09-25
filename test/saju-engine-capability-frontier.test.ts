import { describe, expect, it } from 'vitest';
import { buildCurrentSajuEngineCapabilityFrontier } from '../src/interpretation/saju-engine-capability-frontier.js';

describe('Saju Engine capability frontier G2B', () => {
  it('materializes exactly the 21 G1 capability rows', () => {
    const frontier = buildCurrentSajuEngineCapabilityFrontier();

    expect(frontier.entries).toHaveLength(21);
    expect(new Set(frontier.entries.map((entry) => entry.capabilityKey)).size).toBe(21);
    expect(frontier.counts.total).toBe(21);
  });

  it('preserves the current G1 routing without inventing Engine work', () => {
    const frontier = buildCurrentSajuEngineCapabilityFrontier();

    expect(frontier.counts).toEqual({
      total: 21,
      boundedPreviewReady: 5,
      holdAuthority: 10,
      holdResearch: 6,
      p0Runtime: 0,
      p1Composition: 0,
      p2Hardening: 0,
      readyFromAdmittedIntake: 0,
      invalidEvidence: 0,
    });
    expect(frontier.engineWorkQueue).toEqual([]);
  });

  it('does not treat temporal or spouse Research runtimes as semantic admission', () => {
    const frontier = buildCurrentSajuEngineCapabilityFrontier();
    const authorityHeld = frontier.entries.filter(
      (entry) => entry.currentRouting === 'HOLD_AUTHORITY',
    );

    expect(authorityHeld).toHaveLength(10);
    expect(authorityHeld.every((entry) => entry.producerRuntimeExists)).toBe(true);
    expect(authorityHeld.every((entry) => entry.implementationMayProceed === false)).toBe(true);
    expect(authorityHeld.map((entry) => entry.capabilityKey)).toContain(
      'relationship:natal:spouse',
    );
  });

  it('keeps the five current Canary capabilities bounded to Preview readiness', () => {
    const frontier = buildCurrentSajuEngineCapabilityFrontier();
    const previewReady = frontier.entries
      .filter((entry) => entry.currentRouting === 'BOUNDED_PREVIEW_READY')
      .map((entry) => entry.capabilityKey);

    expect(previewReady).toEqual([
      'general:natal',
      'career:natal',
      'wealth:natal',
      'business:natal',
      'relationship:natal:general',
    ]);

    for (const entry of frontier.entries.filter(
      (candidate) => candidate.currentRouting === 'BOUNDED_PREVIEW_READY',
    )) {
      expect(entry.intakeEvaluationHash).toBeNull();
      expect(entry.implementationMayProceed).toBe(false);
      expect(entry.constraints.boundedPreviewReadinessIsNewEngineAdmission).toBe(false);
      expect(entry.constraints.mayPromoteProductionAuthority).toBe(false);
    }
  });

  it('honors the merged General Annual Bridge return-to-research disposition', () => {
    const frontier = buildCurrentSajuEngineCapabilityFrontier();
    const generalAnnual = frontier.entries.find(
      (entry) => entry.capabilityKey === 'general:annual',
    );

    expect(generalAnnual?.currentRouting).toBe('HOLD_RESEARCH');
    expect(generalAnnual?.producerRuntimeExists).toBe(true);
    expect(generalAnnual?.implementationMayProceed).toBe(false);
  });

  it('keeps current Research-return and Research-gap capabilities upstream of Engine', () => {
    const frontier = buildCurrentSajuEngineCapabilityFrontier();
    const researchHeld = frontier.entries
      .filter((entry) => entry.currentRouting === 'HOLD_RESEARCH')
      .map((entry) => entry.capabilityKey);

    expect(researchHeld).toEqual([
      'general:annual',
      'family:natal:parents',
      'family:natal:children',
      'compatibility:natal',
      'life_stage:life_stage',
      'question_specific:natal',
    ]);
  });

  it('is deterministic and cannot itself promote authority', () => {
    const left = buildCurrentSajuEngineCapabilityFrontier();
    const right = buildCurrentSajuEngineCapabilityFrontier();

    expect(left.frontierHash).toBe(right.frontierHash);
    expect(left.frontierHash).toMatch(/^[a-f0-9]{64}$/);
    expect(left.constraints).toEqual({
      snapshotIsAuthoritySource: false,
      mayPromoteResearchAuthority: false,
      mayTreatPreviewAsProductionAuthority: false,
      mayCreateSemanticsFromInventory: false,
    });
  });
});
