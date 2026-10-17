import { describe, expect, test } from 'vitest';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildNatalStructuralEvidence } from '../src/preview/natal-structural-evidence.js';
import { createGeneralNatalSourceBoundedRegistry } from '../src/research/general-natal-conclusion-source-bounded-candidate.js';
import { buildNatalN13StructuralResearchReading } from '../src/research/general-natal-t8-structural-reading-draft.js';
import { GENERAL_NATAL_N10_PRIORITY_RESEARCH_CANDIDATES } from '../src/research/general-natal-p0-meaning-collision-adjudication.js';

const NOW = new Date('2026-10-15T00:00:00.000Z');
const REGISTRY = createGeneralNatalSourceBoundedRegistry(NOW.toISOString());
const EXACT_RELATION = 'GENERAL_NATAL_SOURCE_BOUNDED_PEER_TO_WEALTH_ADVERSE';

function replay2010(hour: number) {
  // Exactly the authorized policy, birth date, sex and audit "now" in N10's 35-case HTTP corpus.
  const calculated = calculateAuthorizedMyeonghwaProductionSnapshot({
    calendarType: 'solar',
    date: { year: 2010, month: 2, day: 3 },
    time: { known: true, hour, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  }, { now: NOW });
  const snapshot = calculated.snapshot;
  const facts = buildNatalStructuralEvidence(snapshot);
  const execution = runInterpretation(snapshot, REGISTRY, {
    requestId: 'n10-p0-research-n13-' + hour,
    now: NOW,
  });
  const reading = buildNatalN13StructuralResearchReading(snapshot, execution, REGISTRY);
  const exact = execution.claims.filter((c) =>
    c.state === 'active' && c.claimType === EXACT_RELATION);
  return { calculated, snapshot, facts, execution, reading, exact };
}

describe('P0 N10 two real canonical natal cases replayed against existing N13 T8 Registry', () => {
  test('2010-02-03 05:30 actually emits exact 劫財→財 research T8 with two independent T5 upstream claims', () => {
    const a = replay2010(5);
    expect(a.snapshot.completeness.birthTimeKnown).toBe(true);
    expect(a.execution.integrity.valid).toBe(true);
    expect(a.facts.pillars.find((p) => p.slot === 'hour')).toMatchObject({
      stem: '정', branch: '묘',
    });
    expect(a.facts.tenGods).toContainEqual(expect.objectContaining({
      slot: 'hour', component: 'branch', state: 'resolved', value: '겁재',
    }));
    expect(a.facts.tenGods.some((p) => ['정재', '편재'].includes(p.value ?? ''))).toBe(true);
    expect(a.exact).toHaveLength(1);
    const emitted = a.exact[0]!;
    expect(emitted.taxonomy).toMatchObject({ tier: 'T8', category: 'general', subcategory: 'source_bounded_relation' });
    expect(emitted.predicate).toBe('ten_god_structural_relation');
    expect(emitted.methodologyRef.id).toBe(
      GENERAL_NATAL_N10_PRIORITY_RESEARCH_CANDIDATES.exactRobWealthRelation.existingMethodology);
    expect(emitted.upstreamClaimRefs).toHaveLength(2);
    expect(new Set(emitted.upstreamClaimRefs).size).toBe(2);
    const sources = new Set(emitted.sourceRefs);
    expect(sources.size).toBe(2);
    const active = a.execution.claims.filter((c) => c.state === 'active');
    const parentClaims = emitted.upstreamClaimRefs.map((id) => active.find((c) => c.claimId === id));
    expect(parentClaims.every((c) => c !== undefined && c.snapshotId === emitted.snapshotId &&
      c.scenarioRef === emitted.scenarioRef)).toBe(true);
    expect(parentClaims.map((c) => c!.claimType).sort()).toEqual([
      'GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_PEER_PRESENT',
      'GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_WEALTH_PRESENT',
    ]);
    const q = a.reading.sentences.find((s) => s.relationId === 'PEER-TO-WEALTH-ADVERSE');
    expect(q).toBeDefined();
    expect(q?.researchClaimId).toBe(emitted.claimId);
    expect(q?.upstreamClaimRefs).toHaveLength(2);
    expect(q?.sourceLocators).toHaveLength(2);
    expect(q?.sourceLocators.every((s) => s.locator.length > 2 && sources.has(s.sourceId))).toBe(true);
    expect(q?.observedPositions).toContainEqual(expect.objectContaining({
      family: 'peer', slot: 'hour', component: 'branch', tenGod: '겁재',
    }));
    expect(q).toMatchObject({ researchOnly: true, consumerProjectionAuthorized: false });
    expect(a.reading).toMatchObject({
      snapshotId: a.snapshot.snapshotId, status: 'research_only',
      mayPublishToConsumer: false, mayApproveSemantics: false, mayPromoteProduction: false,
    });
  });

  test('2010-02-03 19:30 retains 比肩+財 facts but correctly emits NO 劫財→財 T8 and no N13 sentence', () => {
    const b = replay2010(19);
    expect(b.snapshot.completeness.birthTimeKnown).toBe(true);
    expect(b.execution.integrity.valid).toBe(true);
    expect(b.facts.pillars.find((p) => p.slot === 'hour')).toMatchObject({
      stem: '갑', branch: '술',
    });
    expect(b.facts.tenGods).toContainEqual(expect.objectContaining({
      slot: 'hour', component: 'stem', state: 'resolved', value: '비견',
    }));
    expect(b.facts.tenGods.some((p) => ['정재', '편재'].includes(p.value ?? ''))).toBe(true);
    expect(b.facts.tenGods.some((p) => p.state === 'resolved' && p.value === '겁재')).toBe(false);
    expect(b.execution.claims.some((c) => c.state === 'active' &&
      c.claimType === 'GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_PEER_PRESENT')).toBe(true);
    expect(b.execution.claims.some((c) => c.state === 'active' &&
      c.claimType === 'GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_WEALTH_PRESENT')).toBe(true);
    expect(b.exact).toHaveLength(0);
    expect(b.reading.sentences.some((s) => s.relationId === 'PEER-TO-WEALTH-ADVERSE')).toBe(false);
    expect(b.reading).toMatchObject({
      snapshotId: b.snapshot.snapshotId, status: 'research_only',
      mayPublishToConsumer: false, mayApproveSemantics: false, mayPromoteProduction: false,
    });
  });

  test('the real pair differs in a research structure relation, not authorized personalized fortune', () => {
    const left = replay2010(5), right = replay2010(19);
    expect(left.snapshot.snapshotId).not.toBe(right.snapshot.snapshotId);
    expect(left.snapshot.policy).toEqual(right.snapshot.policy);
    expect(left.exact).toHaveLength(1);
    expect(right.exact).toHaveLength(0);
    expect(left.reading.sentences.every((s) => s.researchOnly && !s.consumerProjectionAuthorized)).toBe(true);
    expect(right.reading.sentences.every((s) => s.researchOnly && !s.consumerProjectionAuthorized)).toBe(true);
    expect(GENERAL_NATAL_N10_PRIORITY_RESEARCH_CANDIDATES.overall).toMatchObject({
      consumerMeaningNewlyAdmitted: 0,
      minimumUsefulCompositeReadingApproved: 0,
      productionAuthorized: false,
      bridgeReviewPending: true,
    });
  });
});
