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
import type { CanonicalSajuSnapshot, EarthlyBranch, HeavenlyStem } from '../src/contracts/calculation.js';
import { resolved, unavailable } from '../src/contracts/common.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { createResearchEvidenceRuntimeRegistry } from '../src/interpretation/research-evidence-runtime.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  SAJU_R36_BUREAU_BREAK_AUTHORITY,
  SAJU_R36_MECHANISMS,
  buildSajuR36BureauBreakResearchEvidence,
  projectSajuR36BureauBreak,
  validateSajuR36BureauBreakResearchEvidence,
  SAJU_R36_BUREAU_BREAK_RUNTIME_ADAPTER,
} from '../src/research/shared-natal-r36-bureau-break-research-evidence-adapter.js';
import {
  createSajuR36BureauBreakResearchRegistry,
  SAJU_R36_BUREAU_BREAK_CLAIM_TYPE_DEFINITION,
  SAJU_R36_BUREAU_BREAK_PACK,
} from '../src/research/shared-natal-r36-bureau-break-structural-claim.js';
import {
  DEFAULT_CALCULATION_POLICY,
  UPSTREAM_1992_GOLDEN_FIXTURE,
} from './fixtures/calculation-fixtures.js';

const now = new Date('2026-10-08T00:00:00Z');
const slots = ['year', 'month', 'day', 'hour'] as const;
const base = calculateCanonicalSajuSnapshot(
  UPSTREAM_1992_GOLDEN_FIXTURE.input,
  DEFAULT_CALCULATION_POLICY,
  { now },
);

// Deliberately synthetic structural fixture; no claim about a real birth-time chart.
function fixture(
  branches: readonly EarthlyBranch[] = ['인', '자', '오', '술'],
  dayMaster: HeavenlyStem = '갑',
  visibleStems: readonly HeavenlyStem[] = ['무', '임', '갑', '계'],
): CanonicalSajuSnapshot {
  const snapshot = structuredClone(base);
  const stemFact = (stem: HeavenlyStem) => ({
    value: stem,
    hanja: HEAVENLY_STEMS_HANJA[HEAVENLY_STEMS.indexOf(stem)]!,
    element: getHeavenlyStemElement(stem),
    yinYang: getHeavenlyStemYinYang(stem),
  });
  snapshot.derivedFacts.dayMaster = resolved(stemFact(dayMaster));
  for (const [i, slot] of slots.entries()) {
    const current = snapshot.pillars[slot];
    if (current.status !== 'resolved') throw new Error('resolved fixture required');
    const branch = branches[i]!;
    snapshot.pillars[slot] = resolved({
      ...current.value,
      stem: stemFact(slot === 'day' ? dayMaster : visibleStems[i]!),
      branch: {
        value: branch,
        hanja: EARTHLY_BRANCHES_HANJA[EARTHLY_BRANCHES.indexOf(branch)]!,
        element: getEarthlyBranchElement(branch),
        yinYang: getEarthlyBranchYinYang(branch),
      },
    });
  }
  snapshot.calculationHash = deterministicContentHash({ syntheticR36Pillars: snapshot.pillars });
  snapshot.snapshotId = 'synthetic_r36_' + snapshot.calculationHash.slice(0, 24);
  return snapshot;
}

function envelope(snapshot: CanonicalSajuSnapshot) {
  const result = buildSajuR36BureauBreakResearchEvidence(snapshot);
  if (result.status !== 'resolved') throw new Error(result.reasonCode);
  return result.envelope;
}

function run(snapshot: CanonicalSajuSnapshot) {
  return runInterpretation(snapshot, createSajuR36BureauBreakResearchRegistry(), {
    now,
    researchEvidence: {
      runtimeRegistry: createResearchEvidenceRuntimeRegistry([SAJU_R36_BUREAU_BREAK_RUNTIME_ADAPTER]),
      envelopes: [envelope(snapshot)],
    },
  });
}

describe('SAJU-R36 tight embedded bureau break — research T2', () => {
  test('admits only the I47 positive break, with actual registry execution and evidence provenance', () => {
    const snapshot = fixture();
    const e = envelope(snapshot);
    const claims = run(snapshot).claims;
    const positives = Object.values(e.payload.mechanismOutcomes).filter((item) => item.observed);
    expect(positives.length).toBeGreaterThan(0);
    expect(claims).toHaveLength(positives.length);
    for (const claim of claims) {
      expect(claim).toMatchObject({
        taxonomy: { tier: 'T2' },
        researchEvidenceRefs: [e.envelopeId],
        value: {
          bureauBreak: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
          rootDestruction: 'not_determined',
          effectiveMechanismForce: 'not_determined',
          qiangRuo: 'not_determined',
          productionAuthority: false,
        },
      });
      const evidenceItem = e.payload.mechanismOutcomes[
        claim.value.mechanism as keyof typeof e.payload.mechanismOutcomes
      ];
      expect(evidenceItem.observed).toBe(true);
      expect(evidenceItem.identity?.formationRelationId).toBeTruthy();
      expect(evidenceItem.identity?.clashRelationId).toBeTruthy();
    }
    expect(validateSajuR36BureauBreakResearchEvidence(e, snapshot).valid).toBe(true);
    expect(createSajuR36BureauBreakResearchRegistry()).toEqual(
      createSajuR36BureauBreakResearchRegistry(),
    );
    expect(run(snapshot)).toEqual(run(snapshot));
  });

  test.each([
    { label: 'fire bureau embedded month', branches: ['인', '자', '오', '술'] },
    { label: 'fire bureau embedded day', branches: ['인', '오', '자', '술'] },
    { label: 'water bureau embedded month', branches: ['신', '오', '자', '진'] },
    { label: 'wood bureau embedded month', branches: ['해', '유', '묘', '미'] },
    { label: 'metal bureau embedded month', branches: ['사', '묘', '유', '축'] },
  ] as const)('$label stays restricted to positive I47 identities', ({ branches }) => {
    const snapshot = fixture(branches);
    const result = projectSajuR36BureauBreak(snapshot);
    expect(result.status).toBe('resolved');
    if (result.status !== 'resolved') return;
    for (const mechanism of SAJU_R36_MECHANISMS) {
      const outcome = result.projection.mechanismOutcomes[mechanism];
      if (outcome.observed) {
        expect(outcome.identity).toMatchObject({
          mechanism,
          placementClass: 'EMBEDDED_WITHIN_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT',
          postInteractionBureauState: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
        });
      } else {
        expect(outcome.identity).toBeNull();
      }
    }
  });

  test.each([
    { label: 'embedded non-tight', branches: ['인', '오', '신', '술'] },
    { label: 'outside tight', branches: ['인', '오', '술', '진'] },
    { label: 'outside non-tight', branches: ['자', '인', '오', '술'] },
    { label: 'no clash', branches: ['인', '오', '술', '축'] },
  ] as const)('$label never emits negative or intactness claims', ({ branches }) => {
    const snapshot = fixture(branches);
    const result = run(snapshot);
    expect(result.claims).toHaveLength(0);
    expect(envelope(snapshot).payload).not.toHaveProperty('bureauIntact');
  });

  test('does not infer damage, strength or scores from an actual calculated snapshot', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      UPSTREAM_1992_GOLDEN_FIXTURE.input,
      DEFAULT_CALCULATION_POLICY,
      { now },
    );
    const before = deterministicContentHash(snapshot);
    const e = envelope(snapshot);
    expect(validateSajuR36BureauBreakResearchEvidence(e, snapshot).valid).toBe(true);
    expect(deterministicContentHash(snapshot)).toBe(before);
    expect(SAJU_R36_BUREAU_BREAK_AUTHORITY).toMatchObject({
      rootDestructionAuthorized: false,
      effectiveForceAuthorized: false,
      strengthClassificationAuthorized: false,
      numericScoringAuthorized: false,
      productionAuthorityAuthorized: false,
    });
    expect(SAJU_R36_BUREAU_BREAK_CLAIM_TYPE_DEFINITION.materialForNarrative).toBe(false);
    expect(SAJU_R36_BUREAU_BREAK_PACK.status).toBe('research');
  });

  test('rejects rehashed I47 mechanism, bureau, clash and authority changes', () => {
    const snapshot = fixture();
    const e = envelope(snapshot);
    const forgedPayload = structuredClone(e.payload);
    const selected = SAJU_R36_MECHANISMS.find((mechanism) =>
      forgedPayload.mechanismOutcomes[mechanism].observed,
    );
    if (selected === undefined) throw new Error('expected a positive case');
    forgedPayload.mechanismOutcomes[selected].identity!.clashRelationId = 'forged';
    const forged = {
      ...e,
      payload: forgedPayload,
      payloadHash: deterministicContentHash(forgedPayload),
    };
    const outcome = validateSajuR36BureauBreakResearchEvidence(forged, snapshot);
    expect(outcome.valid).toBe(false);
    expect(outcome.errors).toContain('saju_r36_bureau_break_not_reproducible_from_snapshot');
  });

  test('rejects unresolved, ambiguous, scenario and wrong day-master inputs', () => {
    const bad = [
      (() => { const s=fixture(); s.scenarios=[{}] as never; return s; })(),
      (() => { const s=fixture(); s.pillars.month=unavailable('missing'); return s; })(),
      (() => { const s=fixture(); s.derivedFacts.dayMaster=unavailable('missing'); return s; })(),
      (() => { const s=fixture(); s.snapshotId=''; return s; })(),
      (() => { const s=fixture(); if (s.pillars.day.status==='resolved') s.pillars.day.value.stem.value='을'; return s; })(),
    ];
    for (const s of bad) {
      expect(buildSajuR36BureauBreakResearchEvidence(s).status).toBe('unavailable');
    }
  });
});
