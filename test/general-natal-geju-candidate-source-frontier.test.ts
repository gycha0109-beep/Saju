import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_BOUNDARIES,
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION,
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_REFERENCES,
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_SCOPE,
  buildGeneralNatalGejuCandidateSourceFrontier,
} from '../src/research/general-natal-geju-candidate-source-frontier.js';

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

describe('General Natal Gyeokguk candidate source frontier', () => {
  it('records the source-observed month-order selection boundary without authorizing a candidate', () => {
    const report = buildGeneralNatalGejuCandidateSourceFrontier(snapshot());

    expect(report.reportVersion).toBe(GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION);
    expect(report.sourceScope).toBe(GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_SCOPE);
    expect(report.status).toBe('source_boundary_observed_predicates_not_authorized');
    expect(report.monthOrderPrimaryOrganizerSourceBoundary).toBe(true);
    expect(report.transparencyAndBranchMeetingSelectionAxesObserved).toBe(true);
    expect(report.candidateEstablishmentSeparationObserved).toBe(true);
    expect(report.candidateDerivationAuthorized).toBe(false);
    expect(report.establishmentPredicateAuthorized).toBe(false);
    expect(report.candidateFactsEmitted).toBe(false);
    expect(report.establishmentFactsEmitted).toBe(false);
  });

  it('pins all six source boundaries and never upgrades them into generalized predicates', () => {
    expect(GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_BOUNDARIES.map((item) => item.key)).toEqual([
      'month_order_primary_organizer',
      'month_hidden_content_can_change_selection',
      'visible_stem_transparency_is_selection_axis',
      'branch_meeting_is_selection_axis',
      'multiple_selections_can_coexist',
      'candidate_and_establishment_are_distinct',
    ]);

    for (const boundary of GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_BOUNDARIES) {
      expect(boundary.sourceBoundaryObserved).toBe(true);
      expect(boundary.generalizedCanonicalPredicateAuthorized).toBe(false);
      expect(boundary.productionAuthorityCreated).toBe(false);
      expect(boundary.sourceIds.length).toBeGreaterThan(0);
    }
  });

  it('keeps the exact predicate gaps open after source-boundary acquisition', () => {
    const report = buildGeneralNatalGejuCandidateSourceFrontier(snapshot());

    expect(report.openPredicateGaps).toEqual(GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS);
    expect(report.openPredicateGaps).toEqual([
      'MONTH_ORDER_HIDDEN_STEM_SELECTION_PREDICATE_AUTHORITY_MISSING',
      'VISIBLE_STEM_TRANSPARENCY_SELECTION_PREDICATE_AUTHORITY_MISSING',
      'BRANCH_MEETING_SELECTION_EFFECT_AUTHORITY_MISSING',
      'MULTIPLE_GEJU_CANDIDATE_REPRESENTATION_AUTHORITY_MISSING',
      'GEJU_ESTABLISHMENT_SUCCESS_FAILURE_PREDICATE_AUTHORITY_MISSING',
    ]);
  });

  it('observes resolved canonical substrate without treating it as candidate authority', () => {
    const report = buildGeneralNatalGejuCandidateSourceFrontier(snapshot());
    const statusByPath = Object.fromEntries(
      report.observedCanonicalSubstrate.map((item) => [item.path, item.status]),
    );

    expect(statusByPath['pillars.month']).toBe('resolved');
    expect(statusByPath['derivedFacts.hiddenStems.month']).toBe('resolved');
    expect(statusByPath['derivedFacts.tenGods']).toBe('resolved');
    expect(statusByPath['derivedFacts.structuralRelations']).toBe('resolved');
    expect(report.observedCanonicalSubstrate.every((item) => item.sufficientForCandidateDerivation === false)).toBe(
      true,
    );
  });

  it('pins source locators to the distinct selection and establishment boundaries', () => {
    expect(GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_REFERENCES.monthOrderSuccessFailure.locator.section).toBe(
      '論用神成敗救應',
    );
    expect(GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_REFERENCES.monthOrderVariation.locator.section).toBe(
      '論用神變化',
    );
    expect(GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_REFERENCES.mixedQiSelection.locator.section).toBe(
      '論雜氣如何取用',
    );
    expect(GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_REFERENCES.mixedQiPluralSelection.locator.section).toBe(
      '論雜氣如何取用',
    );
  });

  it('is deterministic and serializes no positive GEJU candidate or establishment shortcut', () => {
    const current = snapshot();
    const first = buildGeneralNatalGejuCandidateSourceFrontier(current);
    const second = buildGeneralNatalGejuCandidateSourceFrontier(current);
    const serialized = JSON.stringify(first);

    expect(first.reportId).toBe(second.reportId);
    expect(first).toEqual(second);
    expect(GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_DEFINITION_HASH).toMatch(/^[0-9a-f]{64}$/);
    expect(serialized).not.toContain('GEJU_CANDIDATE\":true');
    expect(serialized).not.toContain('GEJU_ESTABLISHMENT_STATE\":true');
    expect(serialized).not.toContain('patternEstablished\":true');
  });
});
