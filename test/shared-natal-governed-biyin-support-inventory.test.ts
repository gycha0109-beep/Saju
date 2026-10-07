import { afterEach, describe, expect, test, vi } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { enrichCanonicalHiddenStems } from '../src/calculation/hidden-stems.js';
import type { CanonicalSajuSnapshot, EarthlyBranch, TenGod } from '../src/contracts/calculation.js';
import { ambiguous, resolved, unavailable } from '../src/contracts/common.js';
import {
  runInterpretation,
  ResearchEvidenceExecutionError,
} from '../src/interpretation/interpretation-engine.js';
import {
  createResearchEvidenceEnvelope,
  type ResearchEvidenceEnvelope,
} from '../src/interpretation/research-evidence.js';
import { createResearchEvidenceRuntimeRegistry } from '../src/interpretation/research-evidence-runtime.js';
import {
  createRuleRegistrySnapshot,
  deterministicContentHash,
  RegistryConfigurationError,
} from '../src/interpretation/rule-registry.js';
import {
  collectGovernedBiyinSupportInventory,
  GOVERNED_BIYIN_SUPPORT_INVENTORY_AUTHORITY,
} from '../src/research/governed-biyin-support-inventory-authority.js';
import {
  buildGovernedBiyinSupportInventoryResearchEvidence,
  validateGovernedBiyinSupportInventoryResearchEvidence,
  GOVERNED_BIYIN_SUPPORT_INVENTORY_EVIDENCE_DEFINITION as definition,
  GOVERNED_BIYIN_SUPPORT_INVENTORY_RUNTIME_ADAPTER,
} from '../src/research/shared-natal-governed-biyin-support-inventory-research-evidence-adapter.js';
import {
  createGovernedBiyinSupportInventoryResearchRegistry,
  GOVERNED_BIYIN_SUPPORT_INVENTORY_CLAIM_TYPE_DEFINITION,
  GOVERNED_BIYIN_SUPPORT_INVENTORY_CLAIM_VALUE_SCHEMA,
  GOVERNED_BIYIN_SUPPORT_INVENTORY_RULE,
  GOVERNED_BIYIN_SUPPORT_INVENTORY_METHODOLOGY,
  GOVERNED_BIYIN_SUPPORT_INVENTORY_SOURCES,
  GOVERNED_BIYIN_SUPPORT_INVENTORY_PACK,
} from '../src/research/shared-natal-governed-biyin-support-inventory-structural-claim.js';
import * as bijie from '../src/research/shared-natal-visible-stem-bijie-support-union-research-evidence-adapter.js';
import * as yin from '../src/research/shared-natal-visible-stem-yinshou-support-collection-research-evidence-adapter.js';
import * as hidden from '../src/research/shared-natal-hidden-biyin-support-constituent-research-evidence-adapter.js';
import * as root from '../src/research/shared-natal-bounded-tonggen-support-research-evidence-adapter.js';
import { buildGovernedSupportPartialOrderResearchEvidence } from '../src/research/shared-natal-governed-support-partial-order-research-evidence-adapter.js';
import {
  DEFAULT_CALCULATION_POLICY,
  UPSTREAM_1992_GOLDEN_FIXTURE,
} from './fixtures/calculation-fixtures.js';

const now = new Date('2026-10-07T00:00:00Z');
const slots = ['year', 'month', 'day', 'hour'] as const;
const visibleSlots = ['year', 'month', 'hour'] as const;
const base = calculateCanonicalSajuSnapshot(
  UPSTREAM_1992_GOLDEN_FIXTURE.input,
  DEFAULT_CALCULATION_POLICY,
  { now },
);
// Synthetic supplied-semantic inputs, not an actual birth calculation. The
// hidden membership and day-master/pillar identity remain canonical.
function fixture(
  branches: readonly EarthlyBranch[] = ['인', '진', '해', '묘'],
  labels: readonly TenGod[] = ['비견', '정인', '겁재'],
) {
  const snapshot = structuredClone(base);
  const master = {
    value: '갑' as const,
    element: '목' as const,
    yinYang: '양' as const,
    hanja: '甲',
  };
  snapshot.derivedFacts.dayMaster = resolved(master);
  for (const [i, slot] of slots.entries()) {
    const pillar = snapshot.pillars[slot];
    if (pillar.status !== 'resolved' || !branches[i]) throw new Error('fixture pillar required');
    snapshot.pillars[slot] = resolved({
      ...pillar.value,
      ...(slot === 'day' ? { stem: structuredClone(master) } : {}),
      branch: { ...pillar.value.branch, value: branches[i] },
    });
  }
  snapshot.derivedFacts.tenGods = resolved({
    year: { stem: resolved(labels[0]!) },
    month: { stem: resolved(labels[1]!) },
    day: { stem: resolved('일간') },
    hour: { stem: resolved(labels[2]!) },
  });
  snapshot.calculationHash = deterministicContentHash({ syntheticR31: snapshot.pillars, labels });
  snapshot.snapshotId = `synthetic_r31_${snapshot.calculationHash.slice(0, 24)}`;
  return enrichCanonicalHiddenStems(snapshot);
}
function evidence(snapshot: CanonicalSajuSnapshot) {
  const result = buildGovernedBiyinSupportInventoryResearchEvidence(snapshot);
  if (result.status !== 'resolved') throw new Error(result.reasonCode);
  return result.envelope;
}
function run(
  snapshot: CanonicalSajuSnapshot,
  envelopes: readonly ResearchEvidenceEnvelope[] = [evidence(snapshot)],
) {
  return runInterpretation(snapshot, createGovernedBiyinSupportInventoryResearchRegistry(), {
    now,
    researchEvidence: {
      runtimeRegistry: createResearchEvidenceRuntimeRegistry([
        GOVERNED_BIYIN_SUPPORT_INVENTORY_RUNTIME_ADAPTER,
      ]),
      envelopes,
    },
  });
}
afterEach(() => vi.restoreAllMocks());

describe('R31 non-additive governed BiYin inventory', () => {
  test('replays an actual canonical snapshot through registered T2 evidence without mutating it', () => {
    const before = deterministicContentHash(base);
    const envelope = evidence(base);
    expect(validateGovernedBiyinSupportInventoryResearchEvidence(envelope, base).valid).toBe(true);
    expect(run(base).claims[0]).toMatchObject({
      taxonomy: { tier: 'T2' },
      researchEvidenceRefs: [envelope.envelopeId],
    });
    expect(GOVERNED_BIYIN_SUPPORT_INVENTORY_CLAIM_TYPE_DEFINITION.materialForNarrative).toBe(false);
    expect(deterministicContentHash(base)).toBe(before);
  });
  test.each(
    visibleSlots.flatMap((slot) =>
      (['비견', '겁재', '정인', '편인'] as const).map((label) => ({ slot, label })),
    ),
  )('keeps governed $label at visible $slot with its provenance', ({ slot, label }) => {
    const labels: TenGod[] = ['식신', '정재', '정관'];
    labels[visibleSlots.indexOf(slot)] = label;
    const snapshot = fixture(undefined, labels);
    const occurrence = evidence(snapshot).payload.visibleOccurrences.find(
      (o) => o.pillarSlot === slot,
    );
    expect(occurrence).toMatchObject({
      occurrenceId: `visible:${slot}`,
      tenGod: label,
      supportConstituentObserved: true,
      sourceSupportCategory: ['비견', '겁재'].includes(label) ? '比劫' : '印綬',
      sourceFactRef: `derivedFacts.tenGods.${slot}.stem`,
    });
    expect(occurrence?.upstreamEnvelopeIds).toHaveLength(2);
  });
  test('preserves hidden day branch, repeated stems and separate visible occurrence identities', () => {
    const payload = evidence(fixture(['묘', '묘', '묘', '묘'], ['겁재', '겁재', '겁재'])).payload;
    expect(payload.hiddenOccurrences.map((o) => o.occurrenceId)).toEqual([
      'hidden:year:을',
      'hidden:month:을',
      'hidden:day:을',
      'hidden:hour:을',
    ]);
    expect(payload.visibleOccurrences.map((o) => o.occurrenceId)).toEqual([
      'visible:year',
      'visible:month',
      'visible:hour',
    ]);
    expect(payload.hiddenOccurrences.every((o) => o.supportConstituentObserved)).toBe(true);
    expect(payload.constraints.visibleDaySelfIncluded).toBe(false);
    expect(payload.constraints.representativeBranchAdded).toBe(false);
  });
  test('retains overlapping root kinds as context facets without adding them as hidden members', () => {
    const snapshot = fixture(['묘', '묘', '묘', '묘']);
    const payload = evidence(snapshot).payload;
    const original = hidden.buildHiddenBiyinSupportConstituentResearchEvidence(snapshot);
    if (original.status !== 'resolved') throw new Error(original.reasonCode);
    expect(payload.hiddenOccurrences.map((o) => o.upstreamOccurrenceId)).toEqual(
      original.envelope.payload.occurrences.map((o) => o.occurrenceId),
    );
    for (const context of payload.branchContexts) {
      expect(context.hiddenOccurrenceIds).toEqual([`hidden:${context.pillarSlot}:을`]);
      expect(context.boundedRootFacets).toEqual(
        expect.arrayContaining([expect.objectContaining({ sourceRootKind: '旺' })]),
      );
      expect(context).toMatchObject({
        association: 'same_branch_context_only',
        exactHiddenRootIdentity: 'not_determined',
        additiveSupport: 'not_authorized',
      });
    }
    for (const key of ['count', 'score', 'weight', 'supportTotal', 'strongWeakVerdict'])
      expect(payload).not.toHaveProperty(key);
  });
  test('preserves exact upstream references and all outside-scope hidden members', () => {
    const snapshot = fixture();
    const payload = evidence(snapshot).payload;
    const result = root.buildSharedNatalBoundedTonggenSupportResearchEvidence(snapshot);
    if (result.status !== 'resolved') throw new Error(result.reasonCode);
    expect(payload.upstreamEvidence.root.payloadHash).toBe(result.envelope.payloadHash);
    expect(payload.branchContexts.flatMap((c) => c.boundedRootFacets)).toEqual(
      result.envelope.payload.observations,
    );
    expect(
      payload.hiddenOccurrences.some(
        (o) => !o.supportConstituentObserved && o.sourceSupportCategory === null,
      ),
    ).toBe(true);
  });
  test('does not read representative branch Ten-Gods as extra occurrences', () => {
    const snapshot = fixture();
    if (snapshot.derivedFacts.tenGods.status !== 'resolved') throw new Error('chart');
    for (const slot of slots) {
      Object.defineProperty(snapshot.derivedFacts.tenGods.value[slot], 'branch', {
        get: () => {
          throw new Error('representative branch must not be consumed');
        },
      });
    }
    expect(evidence(snapshot).payload.visibleOccurrences.map((o) => o.occurrenceId)).toEqual([
      'visible:year',
      'visible:month',
      'visible:hour',
    ]);
  });
  test('resolved no-positive inventory differs from missing evidence and never establishes no support', () => {
    const snapshot = fixture(['유', '유', '유', '유'], ['식신', '정재', '정관']);
    const payload = evidence(snapshot).payload;
    expect(payload.supportConstituentObserved).toBe(false);
    expect(payload.coverage).toMatchObject({
      rootCompleteness: 'unresolved',
      effectiveSupportCompleteness: 'unresolved',
      absenceMeaning: 'no_positive_in_admitted_domain_only',
    });
    expect(run(snapshot).claims).toEqual([]);
    expect(run(snapshot, []).claims).toEqual([]);
    expect(collectGovernedBiyinSupportInventory(snapshot).status).toBe('resolved');
    delete snapshot.derivedFacts.hiddenStems;
    expect(collectGovernedBiyinSupportInventory(snapshot).status).toBe('unavailable');
  });
  test.each(slots)('fails closed for unresolved or ambiguous branch %s', (slot) => {
    const snapshot = fixture();
    const pillar = snapshot.pillars[slot];
    if (pillar.status !== 'resolved') throw new Error('pillar');
    snapshot.pillars[slot] = unavailable('pillar missing');
    expect(collectGovernedBiyinSupportInventory(snapshot).status).toBe('unavailable');
    snapshot.pillars[slot] = ambiguous(
      [
        { candidateId: 'original', value: pillar.value, reasonRefs: [] },
        {
          candidateId: 'alternative',
          value: { ...pillar.value, branch: { ...pillar.value.branch, value: '유' } },
          reasonRefs: [],
        },
      ],
      ['pillar alternatives'],
    );
    expect(collectGovernedBiyinSupportInventory(snapshot).status).toBe('unavailable');
  });
  test('rejects scenario, master parity, hidden membership, missing binding and unresolved visible inputs', () => {
    const changes: ((s: CanonicalSajuSnapshot) => void)[] = [
      (s) => {
        s.snapshotId = '';
      },
      (s) => {
        s.calculationHash = '';
      },
      (s) => {
        s.derivedFacts.dayMaster = unavailable('master');
      },
      (s) => {
        if (s.derivedFacts.dayMaster.status === 'resolved')
          s.derivedFacts.dayMaster.value.hanja = 'wrong';
      },
      (s) => {
        if (s.derivedFacts.hiddenStems) s.derivedFacts.hiddenStems.year = resolved([]);
      },
      (s) => {
        if (s.derivedFacts.tenGods.status === 'resolved')
          s.derivedFacts.tenGods.value.hour.stem = unavailable('hour');
      },
      (s) => {
        s.scenarios = [
          { scenarioId: 'unmaterialized' } as CanonicalSajuSnapshot['scenarios'][number],
        ];
      },
    ];
    for (const [index, change] of changes.entries()) {
      const snapshot = fixture();
      change(snapshot);
      expect(collectGovernedBiyinSupportInventory(snapshot).status, `change ${index}`).toBe(
        'unavailable',
      );
    }
  });
  test('any missing governed upstream aborts rather than yielding partial inventory', () => {
    for (const spy of [
      () => vi.spyOn(bijie, 'buildSharedNatalVisibleStemBijieSupportUnionResearchEvidence'),
      () => vi.spyOn(yin, 'buildVisibleStemYinshouSupportCollectionResearchEvidence'),
      () => vi.spyOn(hidden, 'buildHiddenBiyinSupportConstituentResearchEvidence'),
      () => vi.spyOn(root, 'buildSharedNatalBoundedTonggenSupportResearchEvidence'),
    ]) {
      spy().mockReturnValue({ status: 'unavailable', reasonCode: 'test-unavailable' } as never);
      expect(collectGovernedBiyinSupportInventory(fixture()).status).toBe('unavailable');
      vi.restoreAllMocks();
    }
  });
  test('rejects forged upstream payload and cross-family visible parity failures', () => {
    const snapshot = fixture();
    const original = bijie.buildSharedNatalVisibleStemBijieSupportUnionResearchEvidence(snapshot);
    if (original.status !== 'resolved') throw new Error(original.reasonCode);
    const payload = structuredClone(original.envelope.payload);
    Object.assign(payload.slots.year, { canonicalTenGod: '정인' });
    const forged = createResearchEvidenceEnvelope(
      bijie.SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_DEFINITION,
      snapshot,
      payload,
    );
    vi.spyOn(bijie, 'buildSharedNatalVisibleStemBijieSupportUnionResearchEvidence').mockReturnValue(
      { status: 'resolved', envelope: forged },
    );
    expect(collectGovernedBiyinSupportInventory(snapshot).status).toBe('unavailable');
    vi.spyOn(
      bijie,
      'validateSharedNatalVisibleStemBijieSupportUnionResearchEvidence',
    ).mockReturnValue({ valid: true, errors: [] });
    expect(collectGovernedBiyinSupportInventory(snapshot)).toMatchObject({
      status: 'unavailable',
      reasonCode: 'biyin-inventory-visible-slot-parity-unresolved',
    });
  });
  test('full replay rejects rehashed omission, duplicate, namespace, root addition and promoted authority', () => {
    const snapshot = fixture();
    for (const mutate of [
      (p: Record<string, unknown>) => {
        (p.visibleOccurrences as unknown[]).pop();
      },
      (p: Record<string, unknown>) => {
        const o = p.hiddenOccurrences as unknown[];
        o.push(o[0]);
      },
      (p: Record<string, unknown>) => {
        (p.hiddenOccurrences as { occurrenceId: string }[])[0]!.occurrenceId = 'visible:year';
      },
      (p: Record<string, unknown>) => {
        (p.visibleOccurrences as unknown[]).push({ family: '通根' });
      },
      (p: Record<string, unknown>) => {
        p.count = 7;
      },
      (p: Record<string, unknown>) => {
        (p.constraints as Record<string, unknown>).effectiveSupportCollectionComplete = true;
      },
      (p: Record<string, unknown>) => {
        (p.upstreamEvidence as { hidden: { payloadHash: string } }).hidden.payloadHash = 'forged';
      },
      (p: Record<string, unknown>) => {
        (p.branchContexts as { exactHiddenRootIdentity: string }[])[0]!.exactHiddenRootIdentity =
          'established';
      },
      (p: Record<string, unknown>) => {
        (p.branchContexts as { hiddenOccurrenceIds: string[] }[])[0]!.hiddenOccurrenceIds = [
          'hidden:day:wrong',
        ];
      },
      (p: Record<string, unknown>) => {
        (p.branchContexts as { boundedRootFacets: unknown[] }[])[0]!.boundedRootFacets = [];
      },
    ]) {
      const payload = structuredClone(evidence(snapshot).payload);
      mutate(payload);
      const forged = createResearchEvidenceEnvelope(definition, snapshot, payload);
      expect(validateGovernedBiyinSupportInventoryResearchEvidence(forged, snapshot).valid).toBe(
        false,
      );
      expect(() => run(snapshot, [forged])).toThrow(ResearchEvidenceExecutionError);
    }
  });
  test('snapshot ID/hash and fact drift invalidate evidence; reproduction is deterministic', () => {
    const snapshot = fixture();
    const envelope = evidence(snapshot);
    expect(evidence(snapshot)).toEqual(envelope);
    expect(createGovernedBiyinSupportInventoryResearchRegistry()).toEqual(
      createGovernedBiyinSupportInventoryResearchRegistry(),
    );
    expect(run(snapshot)).toEqual(run(snapshot));
    for (const key of ['snapshotId', 'calculationHash'] as const) {
      const changed = structuredClone(snapshot);
      changed[key] += '_different';
      expect(validateGovernedBiyinSupportInventoryResearchEvidence(envelope, changed).valid).toBe(
        false,
      );
    }
    if (snapshot.derivedFacts.tenGods.status === 'resolved')
      snapshot.derivedFacts.tenGods.value.year.stem = resolved('식신');
    expect(validateGovernedBiyinSupportInventoryResearchEvidence(envelope, snapshot).valid).toBe(
      false,
    );
  });
  test('does not extend R29 frontier or admit Production promotion', () => {
    const snapshot = fixture();
    const before = buildGovernedSupportPartialOrderResearchEvidence(snapshot);
    evidence(snapshot);
    expect(buildGovernedSupportPartialOrderResearchEvidence(snapshot)).toEqual(before);
    expect(GOVERNED_BIYIN_SUPPORT_INVENTORY_AUTHORITY.r29FrontierExtensionAuthorized).toBe(false);
    expect(() =>
      createRuleRegistrySnapshot(
        {
          rules: [GOVERNED_BIYIN_SUPPORT_INVENTORY_RULE],
          methodologies: [GOVERNED_BIYIN_SUPPORT_INVENTORY_METHODOLOGY],
          sources: GOVERNED_BIYIN_SUPPORT_INVENTORY_SOURCES,
          claimTypeDefinitions: [GOVERNED_BIYIN_SUPPORT_INVENTORY_CLAIM_TYPE_DEFINITION],
          claimValueSchemas: [GOVERNED_BIYIN_SUPPORT_INVENTORY_CLAIM_VALUE_SCHEMA],
          reviewAttestations: [],
        },
        { ...GOVERNED_BIYIN_SUPPORT_INVENTORY_PACK, status: 'production' },
        now.toISOString(),
      ),
    ).toThrow(RegistryConfigurationError);
  });
});
