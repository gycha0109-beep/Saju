import { describe, expect, test } from 'vitest';
import {
  EARTHLY_BRANCHES,
  EARTHLY_BRANCHES_HANJA,
  getEarthlyBranchElement,
  getEarthlyBranchYinYang,
  getHeavenlyStemElement,
  getHeavenlyStemYinYang,
  HEAVENLY_STEMS,
  HEAVENLY_STEMS_HANJA,
} from 'manseryeok';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { enrichCanonicalHiddenStems } from '../src/calculation/hidden-stems.js';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  HeavenlyStem,
  TenGod,
} from '../src/contracts/calculation.js';
import { resolved, unavailable, ambiguous } from '../src/contracts/common.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { createResearchEvidenceRuntimeRegistry } from '../src/interpretation/research-evidence-runtime.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  SAJU_R37_SUPPORT_PRECEDENCE_AUTHORITY,
  SAJU_R37_ROOT_CLASSES,
  buildSajuR37SupportPrecedenceResearchEvidence,
  projectSajuR37SupportPrecedence,
  validateSajuR37SupportPrecedenceResearchEvidence,
  SAJU_R37_SUPPORT_PRECEDENCE_RUNTIME_ADAPTER,
} from '../src/research/shared-natal-r37-support-precedence-research-evidence-adapter.js';
import {
  createSajuR37SupportPrecedenceResearchRegistry,
  SAJU_R37_SUPPORT_PRECEDENCE_CLAIM_TYPE_DEFINITION,
  SAJU_R37_SUPPORT_PRECEDENCE_PACK,
} from '../src/research/shared-natal-r37-support-precedence-structural-claim.js';
import {
  DEFAULT_CALCULATION_POLICY,
  UPSTREAM_1992_GOLDEN_FIXTURE,
} from './fixtures/calculation-fixtures.js';

const now = new Date('2026-10-08T00:00:00Z');
const slots = ['year', 'month', 'day', 'hour'] as const;
const base = calculateCanonicalSajuSnapshot(
  UPSTREAM_1992_GOLDEN_FIXTURE.input, DEFAULT_CALCULATION_POLICY, { now },
);

// Controlled supplied-domain fixture. Ten-God slots are independently pinned
// as research inputs; these are not asserted to be real computed birth charts.
function fixture(
  branches: readonly EarthlyBranch[] = ['인', '진', '해', '묘'],
  labels: readonly TenGod[] = ['비견', '정인', '겁재'],
  stem: HeavenlyStem = '갑',
): CanonicalSajuSnapshot {
  const snapshot = structuredClone(base);
  const master = {
    value: stem,
    element: getHeavenlyStemElement(stem),
    yinYang: getHeavenlyStemYinYang(stem),
    hanja: HEAVENLY_STEMS_HANJA[HEAVENLY_STEMS.indexOf(stem)]!,
  };
  snapshot.derivedFacts.dayMaster = resolved(master);
  for (const [index, slot] of slots.entries()) {
    const pillar = snapshot.pillars[slot];
    if (pillar.status !== 'resolved') throw new Error('resolved fixture required');
    const branch = branches[index]!;
    snapshot.pillars[slot] = resolved({
      ...pillar.value,
      ...(slot === 'day' ? { stem: structuredClone(master) } : {}),
      branch: {
        value: branch,
        hanja: EARTHLY_BRANCHES_HANJA[EARTHLY_BRANCHES.indexOf(branch)]!,
        element: getEarthlyBranchElement(branch),
        yinYang: getEarthlyBranchYinYang(branch),
      },
    });
  }
  snapshot.derivedFacts.tenGods = resolved({
    year: { stem: resolved(labels[0]!) },
    month: { stem: resolved(labels[1]!) },
    day: { stem: resolved('일간') },
    hour: { stem: resolved(labels[2]!) },
  });
  snapshot.calculationHash = deterministicContentHash({ syntheticR37: snapshot.pillars, labels });
  snapshot.snapshotId = 'synthetic_r37_' + snapshot.calculationHash.slice(0, 24);
  return enrichCanonicalHiddenStems(snapshot);
}

function envelope(snapshot: CanonicalSajuSnapshot) {
  const result = buildSajuR37SupportPrecedenceResearchEvidence(snapshot);
  if (result.status !== 'resolved') throw new Error(result.reasonCode);
  return result.envelope;
}

function run(snapshot: CanonicalSajuSnapshot) {
  return runInterpretation(snapshot, createSajuR37SupportPrecedenceResearchRegistry(), {
    now,
    researchEvidence: {
      runtimeRegistry: createResearchEvidenceRuntimeRegistry([
        SAJU_R37_SUPPORT_PRECEDENCE_RUNTIME_ADAPTER,
      ]),
      envelopes: [envelope(snapshot)],
    },
  });
}

describe('SAJU-R37 bounded root-over-Bijian qualitative precedent', () => {
  test('emits real registered T2 comparisons with exact upstream provenance, not effect', () => {
    const snapshot = fixture();
    const originalHash = deterministicContentHash(snapshot);
    const e = envelope(snapshot);
    const positive = SAJU_R37_ROOT_CLASSES.filter((rootClass) =>
      e.payload.comparisons[rootClass].observed,
    );
    expect(positive).toContain('strong_birth_lu_wang_candidate');
    expect(positive).toContain('residual_storage_candidate');
    expect(run(snapshot).claims).toHaveLength(positive.length);
    for (const claim of run(snapshot).claims) {
      expect(claim).toMatchObject({
        taxonomy: { tier: 'T2' },
        researchEvidenceRefs: [e.envelopeId],
        value: {
          comparison: 'ROOT_CLASS_PRECEDES_VISIBLE_BIJIAN',
          effectiveSupport: 'not_determined',
          qiangRuo: 'not_determined',
          productionAuthority: false,
        },
      });
    }
    expect(e.payload.comparisons.strong_birth_lu_wang_candidate.bijianWitnesses).toEqual(
      expect.arrayContaining([expect.objectContaining({
        occurrenceId: 'visible:year',
        tenGod: '비견',
      })]),
    );
    expect(validateSajuR37SupportPrecedenceResearchEvidence(e, snapshot).valid).toBe(true);
    expect(deterministicContentHash(snapshot)).toBe(originalHash);
    expect(envelope(snapshot)).toEqual(e);
    expect(run(snapshot)).toEqual(run(snapshot));
  });

  test('does not use 劫財 as a proxy for 比肩', () => {
    const snapshot = fixture(undefined, ['겁재', '정인', '겁재']);
    const payload = envelope(snapshot).payload;
    expect(payload.comparisons.strong_birth_lu_wang_candidate.observed).toBe(false);
    expect(payload.comparisons.residual_storage_candidate.observed).toBe(false);
    expect(run(snapshot).claims).toHaveLength(0);
  });

  test('gates Yin 長生 without canonical same-element hidden membership', () => {
    const snapshot = fixture(['오', '유', '자', '유'], ['비견', '정재', '정관'], '을');
    const payload = envelope(snapshot).payload;
    expect(Object.values(payload.comparisons).every((c) => !c.observed)).toBe(true);
    expect(run(snapshot).claims).toHaveLength(0);
  });

  test('does not invent positive comparative support for absent bounded roots', () => {
    const snapshot = fixture(['유', '유', '유', '유'], ['비견', '정재', '정관']);
    const payload = envelope(snapshot).payload;
    expect(Object.values(payload.comparisons).every((c) => !c.observed)).toBe(true);
    expect(payload.allObservedNegativeMeansNoSupport).toBe(false);
  });

  test('does not sum multiple same-class roots or multiple visible 比肩 as magnitudes', () => {
    const snapshot = fixture(['묘', '묘', '묘', '묘'], ['비견', '비견', '비견']);
    const payload = envelope(snapshot).payload;
    expect(payload.comparisons.strong_birth_lu_wang_candidate.observed).toBe(true);
    expect(run(snapshot).claims).toHaveLength(1);
    expect(payload).not.toHaveProperty('score');
    expect(payload).not.toHaveProperty('supportTotal');
    expect(payload.wholeChartEffectiveSupport).toBe('not_determined');
    expect(payload.comparisons.strong_birth_lu_wang_candidate.numericMagnitude).toBe('not_assigned');
  });

  test('preserves Earth class unresolved without assigning support-precedence', () => {
    const snapshot = fixture(['진', '술', '축', '미'], ['비견', '비견', '비견'], '무');
    const result = projectSajuR37SupportPrecedence(snapshot);
    if (result.status === 'resolved') {
      expect(Object.values(result.projection.comparisons).every((c) => !c.observed)).toBe(true);
    } else {
      expect(result.reasonCode).toMatch(/unavailable|unresolved|r31/);
    }
  });

  test('rejects rehashed evidence tampering through independent full replay', () => {
    const snapshot = fixture();
    const e = envelope(snapshot);
    const altered = {
      ...e.payload,
      comparisons: {
        ...e.payload.comparisons,
        strong_birth_lu_wang_candidate: {
          ...e.payload.comparisons.strong_birth_lu_wang_candidate,
          observed: false,
        },
      },
    };
    const forged = { ...e, payload: altered, payloadHash: deterministicContentHash(altered) };
    const validation = validateSajuR37SupportPrecedenceResearchEvidence(forged, snapshot);
    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain(
      'saju_r37_support_precedence_payload_not_reproducible_from_bound_snapshot',
    );
  });

  test('fails closed on unresolved pillar/master and scenario instead of emitting negative support', () => {
    const missing = fixture();
    missing.pillars.year = unavailable('missing');
    const scenario = fixture();
    scenario.scenarios = [{}] as never;
    const unavailableMaster = fixture();
    unavailableMaster.derivedFacts.dayMaster = unavailable('missing');
    const ambiguousInput = fixture();
    const year = ambiguousInput.pillars.year;
    if (year.status !== 'resolved') throw new Error('resolved fixture');
    ambiguousInput.pillars.year = ambiguous([
      { candidateId: 'a', value: year.value, reasonRefs: [] },
      { candidateId: 'b', value: year.value, reasonRefs: [] },
    ], ['ambiguous']);
    for (const snapshot of [missing, scenario, unavailableMaster, ambiguousInput]) {
      expect(buildSajuR37SupportPrecedenceResearchEvidence(snapshot).status).toBe('unavailable');
    }
  });

  test('actual calculated canonical snapshot is replayable without changing its facts', () => {
    const hash = deterministicContentHash(base);
    const e = envelope(base);
    expect(validateSajuR37SupportPrecedenceResearchEvidence(e, base).valid).toBe(true);
    expect(deterministicContentHash(base)).toBe(hash);
    expect(SAJU_R37_SUPPORT_PRECEDENCE_AUTHORITY).toMatchObject({
      visibleJiecaiEquatedToBijian: false,
      earthRootClassSettled: false,
      effectiveSupportVerdictAuthorized: false,
      strengthClassifierAuthorized: false,
      productionAuthorityAuthorized: false,
    });
    expect(SAJU_R37_SUPPORT_PRECEDENCE_CLAIM_TYPE_DEFINITION.materialForNarrative).toBe(false);
    expect(SAJU_R37_SUPPORT_PRECEDENCE_PACK.status).toBe('research');
  });
});
