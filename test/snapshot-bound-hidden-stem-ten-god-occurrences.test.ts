import { describe, expect, test } from 'vitest';
import { getBranchTenGod } from 'manseryeok';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import {
  enrichCanonicalHiddenStems,
  HIDDEN_STEM_MEMBERSHIP,
} from '../src/calculation/hidden-stems.js';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  HeavenlyStem,
} from '../src/contracts/calculation.js';
import { ambiguous, resolved, unavailable } from '../src/contracts/common.js';
import { createResearchEvidenceEnvelope } from '../src/interpretation/research-evidence.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  projectSnapshotBoundHiddenStemTenGodOccurrences,
  SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCE_AUTHORITY,
} from '../src/research/snapshot-bound-hidden-stem-ten-god-occurrences.js';
import {
  buildSharedNatalHiddenStemTenGodOccurrenceResearchEvidence,
  validateSharedNatalHiddenStemTenGodOccurrenceResearchEvidence,
  SHARED_NATAL_HIDDEN_STEM_TEN_GOD_OCCURRENCE_RESEARCH_EVIDENCE_DEFINITION,
} from '../src/research/shared-natal-hidden-stem-ten-god-occurrence-research-evidence-adapter.js';
import {
  DEFAULT_CALCULATION_POLICY,
  UPSTREAM_1992_GOLDEN_FIXTURE,
} from './fixtures/calculation-fixtures.js';

const slots = ['year', 'month', 'day', 'hour'] as const;
const base = calculateCanonicalSajuSnapshot(
  UPSTREAM_1992_GOLDEN_FIXTURE.input,
  DEFAULT_CALCULATION_POLICY,
  { now: new Date('2026-10-07T00:00:00Z') },
);

// Synthetic semantic fixture derived from a real calculated snapshot. The
// pillar overrides are not claimed as the birth input's actual chart.
function fixture(branches: readonly EarthlyBranch[] = ['진', '해', '진', '묘']) {
  const snapshot = structuredClone(base);
  const master = {
    value: '갑' as const,
    element: '목' as const,
    yinYang: '양' as const,
    hanja: '甲',
  };
  snapshot.derivedFacts.dayMaster = resolved(master);
  for (const [index, slot] of slots.entries()) {
    const current = snapshot.pillars[slot];
    if (current.status !== 'resolved') throw new Error('fixture requires resolved pillars');
    const branch = branches[index];
    if (!branch) throw new Error('fixture branch missing');
    snapshot.pillars[slot] = resolved({
      ...current.value,
      ...(slot === 'day' ? { stem: master } : {}),
      branch: { ...current.value.branch, value: branch },
    });
  }
  snapshot.calculationHash = deterministicContentHash({ syntheticR27: snapshot.pillars });
  snapshot.snapshotId = `saju_synthetic_r27_${snapshot.calculationHash.slice(0, 24)}`;
  return enrichCanonicalHiddenStems(snapshot);
}

function projection(snapshot: CanonicalSajuSnapshot) {
  const result = projectSnapshotBoundHiddenStemTenGodOccurrences(snapshot);
  if (result.status !== 'resolved') throw new Error(result.reasonCode);
  return result.projection;
}
function evidence(snapshot: CanonicalSajuSnapshot) {
  const result = buildSharedNatalHiddenStemTenGodOccurrenceResearchEvidence(snapshot);
  if (result.status !== 'resolved') throw new Error(result.reasonCode);
  return result.envelope;
}
function hidden(snapshot: CanonicalSajuSnapshot) {
  if (!snapshot.derivedFacts.hiddenStems) throw new Error('fixture hidden missing');
  return snapshot.derivedFacts.hiddenStems;
}

describe('R27 snapshot-bound hidden-stem Ten-God occurrences', () => {
  test('consumes an actual canonical calculation without mutating it', () => {
    const before = deterministicContentHash(base);
    const result = projection(base);
    expect(result.snapshotId).toBe(base.snapshotId);
    expect(result.snapshotHash).toBe(base.calculationHash);
    for (const slot of slots) {
      const members = hidden(base)[slot];
      if (members.status !== 'resolved') throw new Error('expected resolved fixture');
      expect(
        result.occurrences.filter((o) => o.pillarSlot === slot).map((o) => o.hiddenStem),
      ).toEqual(members.value);
    }
    expect(deterministicContentHash(base)).toBe(before);
  });
  test('maps all hidden relations, includes day branch and retains repeated stems across slots', () => {
    const result = projection(fixture());
    expect(
      result.occurrences
        .filter((o) => o.pillarSlot === 'year')
        .map((o) => [o.hiddenStem, o.tenGod]),
    ).toEqual([
      ['을', '겁재'],
      ['무', '편재'],
      ['계', '정인'],
    ]);
    expect(
      result.occurrences.filter((o) => o.hiddenStem === '을').map((o) => o.occurrenceId),
    ).toEqual(['year:을', 'day:을', 'hour:을']);
    expect(result.occurrences.find((o) => o.occurrenceId === 'month:갑')?.tenGod).toBe('비견');
    expect(
      result.occurrences.every(
        (o) => o.sourceFactRef === `derivedFacts.hiddenStems.${o.pillarSlot}`,
      ),
    ).toBe(true);
    expect(result.occurrences.every((o) => o.sourcePillarRef === `pillars.${o.pillarSlot}`)).toBe(
      true,
    );
    expect(new Set(result.occurrences.map((o) => o.occurrenceId)).size).toBe(
      result.occurrences.length,
    );
  });
  test('never substitutes or adds representative branch Ten-Gods or visible day self', () => {
    const snapshot = fixture();
    snapshot.derivedFacts.tenGods = unavailable('irrelevant-visible-chart');
    const result = projection(snapshot);
    expect(getBranchTenGod('갑', '해')).toBe('편인');
    expect(result.occurrences.filter((o) => o.pillarSlot === 'month').map((o) => o.tenGod)).toEqual(
      ['비견', '편인'],
    );
    expect(
      result.occurrences.filter((o) => o.pillarSlot === 'day').map((o) => o.occurrenceId),
    ).toEqual(['day:을', 'day:무', 'day:계']);
  });
  test.each(slots)(
    'rejects missing/unresolved/ambiguous hidden input in %s without partial/empty results',
    (slot) => {
      const snapshot = fixture();
      hidden(snapshot)[slot] = unavailable('missing');
      expect(projectSnapshotBoundHiddenStemTenGodOccurrences(snapshot)).toEqual({
        status: 'unavailable',
        reasonCode: `hidden-stem-ten-god-occurrences-${slot}-source-unresolved`,
      });
      hidden(snapshot)[slot] = ambiguous(
        [
          { candidateId: 'a', value: ['갑'], reasonRefs: ['a'] },
          { candidateId: 'b', value: ['을'], reasonRefs: ['b'] },
        ],
        ['uncertain'],
      );
      expect(projectSnapshotBoundHiddenStemTenGodOccurrences(snapshot).status).toBe('unavailable');
      delete (hidden(snapshot) as Partial<ReturnType<typeof hidden>>)[slot];
      expect(projectSnapshotBoundHiddenStemTenGodOccurrences(snapshot).status).toBe('unavailable');
    },
  );
  test.each(slots)(
    'rejects duplicate/incomplete/wrong/order-mismatched membership in %s',
    (slot) => {
      for (const value of [
        [],
        ['갑', '갑'],
        ['경'],
        [...HIDDEN_STEM_MEMBERSHIP.진].reverse(),
      ] as HeavenlyStem[][]) {
        const snapshot = fixture(['진', '진', '진', '진']);
        hidden(snapshot)[slot] = resolved(value);
        expect(projectSnapshotBoundHiddenStemTenGodOccurrences(snapshot).status).toBe(
          'unavailable',
        );
      }
    },
  );
  test.each(slots)(
    'requires resolved source pillar in %s even if hidden membership is resolved',
    (slot) => {
      const snapshot = fixture();
      snapshot.pillars[slot] = unavailable('pillar-unknown');
      expect(projectSnapshotBoundHiddenStemTenGodOccurrences(snapshot).status).toBe('unavailable');
    },
  );
  test('requires day-master/day-pillar parity including metadata and valid stem', () => {
    const snapshot = fixture();
    if (snapshot.derivedFacts.dayMaster.status !== 'resolved') throw new Error('fixture');
    snapshot.derivedFacts.dayMaster = resolved({
      ...snapshot.derivedFacts.dayMaster.value,
      element: '수',
    });
    expect(projectSnapshotBoundHiddenStemTenGodOccurrences(snapshot).status).toBe('unavailable');
    snapshot.derivedFacts.dayMaster = unavailable('missing');
    expect(projectSnapshotBoundHiddenStemTenGodOccurrences(snapshot).status).toBe('unavailable');
  });
  test('fails closed for missing chart, missing binding and unmaterialized scenarios', () => {
    const snapshot = fixture();
    delete snapshot.derivedFacts.hiddenStems;
    expect(projectSnapshotBoundHiddenStemTenGodOccurrences(snapshot).status).toBe('unavailable');
    const noBinding = fixture();
    noBinding.calculationHash = '';
    expect(projectSnapshotBoundHiddenStemTenGodOccurrences(noBinding).status).toBe('unavailable');
    const uncertain = fixture();
    uncertain.scenarios = [
      {
        scenarioId: 'unmaterialized-r27',
        snapshotId: uncertain.snapshotId,
        factOverrides: [],
        reasonRefs: ['uncertain'],
      },
    ];
    expect(projectSnapshotBoundHiddenStemTenGodOccurrences(uncertain).status).toBe('unavailable');
  });
  test('rejects invalid runtime stem and branch values before calling the mapper', () => {
    const invalidStem = fixture();
    if (
      invalidStem.derivedFacts.dayMaster.status !== 'resolved' ||
      invalidStem.pillars.day.status !== 'resolved'
    )
      throw new Error('fixture');
    invalidStem.derivedFacts.dayMaster.value.value = 'invalid' as HeavenlyStem;
    invalidStem.pillars.day.value.stem.value = 'invalid' as HeavenlyStem;
    expect(projectSnapshotBoundHiddenStemTenGodOccurrences(invalidStem).status).toBe('unavailable');
    const invalidBranch = fixture();
    if (invalidBranch.pillars.year.status !== 'resolved') throw new Error('fixture');
    invalidBranch.pillars.year.value.branch.value = 'invalid' as EarthlyBranch;
    expect(projectSnapshotBoundHiddenStemTenGodOccurrences(invalidBranch).status).toBe(
      'unavailable',
    );
  });
  test('reproduces evidence and binds both snapshot identity and hash', () => {
    const snapshot = fixture();
    const envelope = evidence(snapshot);
    expect(evidence(structuredClone(snapshot))).toEqual(envelope);
    expect(
      validateSharedNatalHiddenStemTenGodOccurrenceResearchEvidence(envelope, snapshot).valid,
    ).toBe(true);
    expect(
      validateSharedNatalHiddenStemTenGodOccurrenceResearchEvidence(envelope, {
        ...snapshot,
        snapshotId: 'other',
      }).valid,
    ).toBe(false);
    expect(
      validateSharedNatalHiddenStemTenGodOccurrenceResearchEvidence(envelope, {
        ...snapshot,
        calculationHash: 'other',
      }).valid,
    ).toBe(false);
  });
  test('rejects rehashed forged Ten-God, identity, source, omission, count and promoted authority', () => {
    const snapshot = fixture();
    const payload = projection(snapshot);
    const first = payload.occurrences[0];
    if (!first) throw new Error('fixture occurrence');
    const forgeries = [
      { ...payload, occurrences: [{ ...first, tenGod: '비견' }, ...payload.occurrences.slice(1)] },
      {
        ...payload,
        occurrences: [{ ...first, occurrenceId: 'month:을' }, ...payload.occurrences.slice(1)],
      },
      {
        ...payload,
        occurrences: [
          { ...first, sourceFactRef: 'derivedFacts.tenGods.year.branch' },
          ...payload.occurrences.slice(1),
        ],
      },
      { ...payload, occurrences: payload.occurrences.slice(1) },
      { ...payload, count: payload.occurrences.length },
      { ...payload, constraints: { ...payload.constraints, hiddenSupportAuthorized: true } },
    ];
    for (const forged of forgeries) {
      const envelope = createResearchEvidenceEnvelope(
        SHARED_NATAL_HIDDEN_STEM_TEN_GOD_OCCURRENCE_RESEARCH_EVIDENCE_DEFINITION,
        snapshot,
        forged,
      );
      expect(
        validateSharedNatalHiddenStemTenGodOccurrenceResearchEvidence(envelope, snapshot).valid,
      ).toBe(false);
    }
    const envelope = evidence(snapshot);
    envelope.authority = 'production' as typeof envelope.authority;
    expect(
      validateSharedNatalHiddenStemTenGodOccurrenceResearchEvidence(envelope, snapshot).valid,
    ).toBe(false);
    hidden(snapshot).hour = unavailable('now-missing');
    expect(
      validateSharedNatalHiddenStemTenGodOccurrenceResearchEvidence(evidence(fixture()), snapshot)
        .valid,
    ).toBe(false);
  });
  test('has reproducible mapping authority and no support, rank, claim or Production authorization', () => {
    const { definitionHash, ...material } = SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCE_AUTHORITY;
    expect(deterministicContentHash(material)).toBe(definitionHash);
    for (const [key, value] of Object.entries(material)) {
      if (key.endsWith('Authorized')) expect(value, key).toBe(false);
    }
    expect(material.canonicalArrayIndexIsSemanticRank).toBe(false);
    expect(material.authority).toBe('structural_mapping_only');
    expect(SHARED_NATAL_HIDDEN_STEM_TEN_GOD_OCCURRENCE_RESEARCH_EVIDENCE_DEFINITION.authority).toBe(
      'research_only',
    );
  });
});
