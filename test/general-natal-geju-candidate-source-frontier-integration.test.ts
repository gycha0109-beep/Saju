import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { buildGeneralNatalGejuCandidateSourceFrontier } from '../src/research/general-natal-geju-candidate-source-frontier.js';
import { buildGeneralNatalSourceConditionResolverFrontier } from '../src/research/general-natal-source-condition-resolver-frontier.js';

function snapshot() {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: new Date('2026-09-11T00:00:00.000Z') },
  );
}

describe('General Natal Gyeokguk source frontier integration boundary', () => {
  it('refines the Gyeokguk source question without closing the canonical resolver gaps', () => {
    const current = snapshot();
    const gejuSource = buildGeneralNatalGejuCandidateSourceFrontier(current);
    const resolver = buildGeneralNatalSourceConditionResolverFrontier(current);

    expect(gejuSource.monthOrderPrimaryOrganizerSourceBoundary).toBe(true);
    expect(gejuSource.transparencyAndBranchMeetingSelectionAxesObserved).toBe(true);
    expect(gejuSource.candidateEstablishmentSeparationObserved).toBe(true);
    expect(gejuSource.candidateDerivationAuthorized).toBe(false);
    expect(gejuSource.establishmentPredicateAuthorized).toBe(false);

    expect(resolver.globalAuthorityGaps).toContain('GEJU_CANDIDATE_DERIVATION_AUTHORITY_MISSING');
    expect(resolver.globalAuthorityGaps).toContain('GEJU_ESTABLISHMENT_PREDICATE_AUTHORITY_MISSING');
    expect(resolver.canonicalResolverAuthorized).toBe(false);
    expect(resolver.sourceConditionFactsEmitted).toBe(false);
    expect(Object.values(resolver.facts).every((fact) => fact.status === 'unavailable')).toBe(true);
  });

  it('does not convert resolved canonical substrate into a positive or negative Gyeokguk verdict', () => {
    const gejuSource = buildGeneralNatalGejuCandidateSourceFrontier(snapshot());
    const serialized = JSON.stringify(gejuSource);

    expect(gejuSource.observedCanonicalSubstrate.every((item) => item.status === 'resolved')).toBe(true);
    expect(gejuSource.candidateFactsEmitted).toBe(false);
    expect(gejuSource.establishmentFactsEmitted).toBe(false);
    expect(serialized).not.toContain('candidateDerivationAuthorized\":true');
    expect(serialized).not.toContain('establishmentPredicateAuthorized\":true');
  });
});
