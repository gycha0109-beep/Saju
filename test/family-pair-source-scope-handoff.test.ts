import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  evaluateFamilySourceScopeV1, evaluatePairwiseSourceScopeV1,
  FAMILY_PAIR_SOURCE_SCOPE_HANDOFF_VERSION,
} from '../src/research/family-pair-source-scope-handoff.js';
import {
  R070_CLAIM_LAYERS, R070_FAMILY_DOMAIN_CLAIM_CORPUS_VERSION,
} from '../src/research/general-natal-family-domain-claim-corpus.js';
import {
  R068_DIRECT_CLAIMS,
} from '../src/research/general-natal-relationship-claim-corpus.js';
import {
  R069_DIRECT_CLAIMS,
} from '../src/research/general-natal-spouse-claim-corpus.js';

const now = new Date('2026-10-22T02:00:00.000Z');
function chart(input: {
  year?: number;
  day?: number;
  sex?: 'male' | 'female' | 'unspecified';
  timeKnown?: boolean;
} = {}) {
  return calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: input.year ?? 1990, month: 5, day: input.day ?? 15 },
    time: input.timeKnown === false
      ? { known: false as const }
      : { known: true as const, hour: 14, minute: 30 },
    sexForTraditionalCalculation: input.sex ?? 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
}

function familyCandidate(
  report: ReturnType<typeof evaluateFamilySourceScopeV1>,
  surface: string,
) {
  const candidate = report.methodCandidates.find(item => item.sourceSurface === surface);
  if (!candidate) throw new TypeError('Missing R070 historical source surface: ' + surface);
  return candidate;
}

describe('R070 family source scope against actual Canonical birth evidence', () => {
  it('distinguishes exact parent month domain wording from male-only alternative and section-specific star', () => {
    const snapshot = chart();
    const report = evaluateFamilySourceScopeV1(snapshot, 'parents');
    expect(report.version).toBe(FAMILY_PAIR_SOURCE_SCOPE_HANDOFF_VERSION);
    expect(report.snapshotId).toBe(snapshot.snapshotId);
    expect(report.calculationHash).toBe(snapshot.calculationHash);
    expect(report.corpusVersion).toBe(R070_FAMILY_DOMAIN_CLAIM_CORPUS_VERSION);
    const month = familyCandidate(report, '月為父母兄弟門戶');
    expect(month.disposition).toBe('APPLICABLE_BOUNDED');
    expect(month.observedFactPath).toBe('pillars.month');
    expect(month.observedPillar).toBe(
      snapshot.pillars.month.status === 'resolved'
        ? snapshot.pillars.month.value.stem.value + snapshot.pillars.month.value.branch.value
        : undefined,
    );
    expect(month.familyMeaningAuthorized).toBe(false);
    expect(familyCandidate(report, '年為父').disposition).toBe('NARROW_OR_REPLACE');
    expect(report.methodCoexistences).toEqual([]);
    expect(familyCandidate(report, '父以偏財論').disposition).toBe('INCONCLUSIVE');
    expect(familyCandidate(report, '母以印綬論').disposition).toBe('INCONCLUSIVE');
    expect(report.methodCandidates.every(item =>
      R070_CLAIM_LAYERS.some(layer =>
        layer.id === item.sourceLayerId &&
        (layer.sourceSurfaces as readonly string[]).includes(item.sourceSurface),
      ),
    )).toBe(true);
    expect(report.methodCandidates.some(item => item.sourceSurface === '子嗣者即官星也')).toBe(false);
    expect(report.interpretationDisposition).toBe('INCONCLUSIVE');
    expect(report.familyT8Admitted).toBe(false);
    expect(report.researchOnly).toBe(true);
    expect(report.mayGrantOfficialAuthority).toBe(false);
    expect(report.mayMarkMenuAvailable).toBe(false);
    expect(report.mayPersist).toBe(false);
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
    expect(evaluateFamilySourceScopeV1(snapshot, 'parents')).toEqual(report);
  });

  it('preserves the historic male father mapping and refuses a missing fetal calculation or full family method', () => {
    const report = evaluateFamilySourceScopeV1(chart({ sex: 'male' }), 'parents');
    expect(familyCandidate(report, '年為父').disposition).toBe('APPLICABLE_BOUNDED');
    expect(familyCandidate(report, '年為父').observedFactPath).toBe('pillars.year');
    expect(familyCandidate(report, '胎為母').disposition).toBe('INCONCLUSIVE');
    expect(familyCandidate(report, '胎為母').missingPrerequisites).toContain(
      'FETAL_PILLAR_NOT_DEFINED_BY_CANONICAL_SNAPSHOT',
    );
    expect(familyCandidate(report, '月為父母兄弟門戶').disposition).toBe('APPLICABLE_BOUNDED');
    expect(report.missingPrerequisites).toContain('FAMILY_METHOD_SELECTION');
    expect(report.missingPrerequisites).toContain('PILLAR_DOMAIN_VS_STAR_RELATION_RECONCILIATION');
    expect(report.methodCoexistences).toEqual([{
      sourceSurfaces: ['月為父母兄弟門戶', '年為父'],
      calculatedFactPaths: ['pillars.month', 'pillars.year'],
      state: 'COEXISTING_NOT_RECONCILED',
      methodSelectionAuthorized: false,
      missingPrerequisites: [
        'FAMILY_METHOD_SELECTION',
        'PILLAR_DOMAIN_VS_STAR_RELATION_RECONCILIATION',
      ],
    }]);
    expect(report.familyT8Admitted).toBe(false);
  });

  it('keeps child hour domain separate from gender-scoped child star methodology', () => {
    const female = evaluateFamilySourceScopeV1(chart({ sex: 'female' }), 'children');
    const male = evaluateFamilySourceScopeV1(chart({ sex: 'male' }), 'children');
    expect(familyCandidate(female, '時為子息').disposition).toBe('APPLICABLE_BOUNDED');
    expect(familyCandidate(female, '時為子息').observedFactPath).toBe('pillars.hour');
    expect(familyCandidate(female, '時為子孫').disposition).toBe('NARROW_OR_REPLACE');
    expect(familyCandidate(male, '時為子孫').disposition).toBe('APPLICABLE_BOUNDED');
    expect(familyCandidate(female, '我生者為子').disposition).toBe('INCONCLUSIVE');
    expect(familyCandidate(male, '我生者為子').disposition).toBe('NARROW_OR_REPLACE');
    expect(familyCandidate(female, '子嗣者即官星也').disposition).toBe('INCONCLUSIVE');
    expect(female.methodCoexistences).toEqual([]);
    expect(male.methodCoexistences).toEqual([{
      sourceSurfaces: ['時為子息', '時為子孫'],
      calculatedFactPaths: ['pillars.hour'],
      state: 'COEXISTING_NOT_RECONCILED',
      methodSelectionAuthorized: false,
      missingPrerequisites: [
        'FAMILY_METHOD_SELECTION',
        'PILLAR_DOMAIN_VS_STAR_RELATION_RECONCILIATION',
      ],
    }]);
    expect(female.methodCandidates.some(item => item.sourceSurface === '父以偏財論')).toBe(false);
    expect(female.familyT8Admitted).toBe(false);
    expect(male.familyT8Admitted).toBe(false);
  });

  it('does not promote a child interpretation when birth hour is unknown', () => {
    const snapshot = chart({ year: 1993, timeKnown: false });
    const child = evaluateFamilySourceScopeV1(snapshot, 'children');
    const parent = evaluateFamilySourceScopeV1(snapshot, 'parents');
    expect(familyCandidate(child, '時為子息').disposition).toBe('INCONCLUSIVE');
    expect(familyCandidate(child, '時為子息').observedPillar).toBeUndefined();
    expect(familyCandidate(child, '時為子息').missingPrerequisites)
      .toContain('CANONICAL_HOUR_PILLAR_UNRESOLVED');
    expect(familyCandidate(parent, '月為父母兄弟門戶').disposition)
      .toBe('APPLICABLE_BOUNDED');
    expect(child.familyT8Admitted).toBe(false);
    expect(() => evaluateFamilySourceScopeV1(
      snapshot, 'family' as 'parents',
    )).toThrow('exact parents/children');
  });
});

describe('R068/R069 pairwise source boundary on two real Canonical charts', () => {
  it('records the actual 4+4 chart comparison without converting social or spouse corpus into T10', () => {
    const subject = chart({ year: 1989, day: 17 });
    const target = chart({ year: 1995, day: 23 });
    const report = evaluatePairwiseSourceScopeV1(
      { personRef: 'self', snapshot: subject },
      { personRef: 'partner', snapshot: target },
    );
    expect(report.subject.snapshotId).toBe(subject.snapshotId);
    expect(report.target.snapshotId).toBe(target.snapshotId);
    expect(report.subject.calculationHash).not.toBe(report.target.calculationHash);
    expect(report.factualPairObservations.map(item => item.pillarSlot))
      .toEqual(['year', 'month', 'day', 'hour']);
    expect(report.factualPairObservations.every(item =>
      item.status === 'both_resolved' && item.pairwiseMeaningAuthorized === false))
      .toBe(true);
    expect(report.factualPairObservations.some(item =>
      item.exactPillarIdentity === 'different')).toBe(true);
    expect(report.factualPairObservations[2]?.subjectFactPath).toBe('subject.pillars.day');
    expect(report.factualPairObservations[2]?.targetFactPath).toBe('target.pillars.day');
    expect(report.comparedSourceSurfaces.filter(item => item.corpusId === 'R068')
      .map(item => item.sourceSurface)).toEqual(R068_DIRECT_CLAIMS.map(item => item.sourceSurface));
    expect(report.comparedSourceSurfaces.filter(item => item.corpusId === 'R069')
      .map(item => item.sourceSurface)).toEqual(R069_DIRECT_CLAIMS.map(item => item.sourceSurface));
    expect(report.comparedSourceSurfaces.every(item => !item.eligiblePairwiseClaim)).toBe(true);
    expect(report.comparedSourceSurfaces.filter(item => item.corpusId === 'R068')
      .every(item => item.disposition === 'NARROW_OR_REPLACE')).toBe(true);
    expect(report.comparedSourceSurfaces.filter(item => item.corpusId === 'R069')
      .every(item => item.disposition === 'REJECTED')).toBe(true);
    expect(report.missingPrerequisites).toContain('ROMANCE_TRANSFER_EVIDENCE');
    expect(report.missingPrerequisites)
      .toContain('EXACT_CROSS_CHART_T10_RULE_WITH_DIRECT_PAIRWISE_SOURCE_NOT_ESTABLISHED');
    expect(report.pairwiseT10Admitted).toBe(false);
    expect(report.pairwiseDisposition).toBe('INCONCLUSIVE');
    expect(report.researchOnly).toBe(true);
    expect(report.mayGrantOfficialAuthority).toBe(false);
    expect(report.mayMarkMenuAvailable).toBe(false);
    expect(report.mayPersist).toBe(false);
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
    expect(evaluatePairwiseSourceScopeV1(
      { personRef: 'self', snapshot: subject },
      { personRef: 'partner', snapshot: target },
    )).toEqual(report);
  });

  it('keeps a missing target birth hour and identical charts as facts, not an affinity score', () => {
    const subject = chart({ year: 1990 });
    const target = chart({ year: 1990, timeKnown: false });
    const report = evaluatePairwiseSourceScopeV1(
      { personRef: 'self', snapshot: subject },
      { personRef: 'other', snapshot: target },
    );
    expect(report.target.birthTimeKnown).toBe(false);
    expect(report.factualPairObservations[3]?.status).toBe('incomplete');
    expect(report.factualPairObservations[3]?.exactPillarIdentity).toBeUndefined();
    expect(report.missingPrerequisites).toContain('TARGET_HOUR_INPUT_UNRESOLVED');
    expect(report.pairwiseT10Admitted).toBe(false);

    const same = evaluatePairwiseSourceScopeV1(
      { personRef: 'self', snapshot: subject },
      { personRef: 'different-person', snapshot: subject },
    );
    expect(same.subject.calculationHash).toBe(same.target.calculationHash);
    expect(same.factualPairObservations.every(item =>
      item.status === 'both_resolved' && item.exactPillarIdentity === 'same')).toBe(true);
    expect(same.pairwiseT10Admitted).toBe(false);
  });

  it('swaps observed facts but never authorizes directional or symmetric interpersonal meaning', () => {
    const first = chart({ year: 1985, day: 18 });
    const second = chart({ year: 2001, day: 22 });
    const forward = evaluatePairwiseSourceScopeV1(
      { personRef: 'person-one', snapshot: first },
      { personRef: 'person-two', snapshot: second },
    );
    const backward = evaluatePairwiseSourceScopeV1(
      { personRef: 'person-two', snapshot: second },
      { personRef: 'person-one', snapshot: first },
    );
    expect(forward.factualPairObservations.map(item => item.exactPillarIdentity))
      .toEqual(backward.factualPairObservations.map(item => item.exactPillarIdentity));
    for (let i = 0; i < forward.factualPairObservations.length; i++) {
      expect(forward.factualPairObservations[i]?.subjectPillar)
        .toEqual(backward.factualPairObservations[i]?.targetPillar);
      expect(forward.factualPairObservations[i]?.targetPillar)
        .toEqual(backward.factualPairObservations[i]?.subjectPillar);
    }
    expect(forward.pairwiseT10Admitted).toBe(false);
    expect(backward.pairwiseT10Admitted).toBe(false);
    expect(forward.comparedSourceSurfaces.every(x => x.eligiblePairwiseClaim === false))
      .toBe(true);
  });

  it('rejects self pairing and non-comparable policy without issuing a T10 conclusion', () => {
    const subject = chart();
    expect(() => evaluatePairwiseSourceScopeV1(
      { personRef: 'same', snapshot: subject },
      { personRef: 'same', snapshot: subject },
    )).toThrow('two different');
    expect(() => evaluatePairwiseSourceScopeV1(
      { personRef: 'self', snapshot: subject },
      { personRef: 'other', snapshot: {
        ...chart({ year: 2000 }),
        policy: { ...subject.policy, policyVersion: 'incompatible-research-policy' },
      } },
    )).toThrow('comparable governed');
  });
});
