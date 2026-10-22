import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import {
  buildFamilyBirthResearchReading,
} from '../src/preview/family-birth-research-runtime.js';
import {
  buildLifeStageBirthResearchReading,
} from '../src/preview/life-stage-birth-research-runtime.js';
import {
  buildSpousePositionBirthResearchReading,
} from '../src/preview/spouse-position-birth-research-runtime.js';
import {
  buildCompatibilityTwoBirthResearchReading,
} from '../src/preview/compatibility-two-birth-research-runtime.js';
import {
  assessFamilyMenuMur,
  assessLifeStageMenuMur,
  assessSpousePositionMenuMur,
  assessCompatibilityMenuMur,
} from '../src/preview/relationship-adjacent-menu-mur.js';

const TIME = '2030-06-01T03:00:00.000Z';
const FIRST: BirthInput = {
  calendarType: 'solar',
  date: { year: 1990, month: 5, day: 15 },
  time: { known: true, hour: 14, minute: 30 },
  sexForTraditionalCalculation: 'male',
};
const SECOND: BirthInput = {
  ...FIRST,
  date: { year: 2024, month: 3, day: 10 },
  time: { known: true, hour: 12, minute: 0 },
};
function noSemanticUpgrade(mur: {
  usefulComplete: boolean; mayPublish: boolean; maySell: boolean;
  mayChangeProductDelivery: boolean; mayAuthorizeNewClaim: boolean;
  missingRequirements: readonly string[]; state: string;
}) {
  expect(mur.state).not.toBe('complete');
  expect(mur.usefulComplete).toBe(false);
  expect(mur.mayPublish).toBe(false);
  expect(mur.maySell).toBe(false);
  expect(mur.mayChangeProductDelivery).toBe(false);
  expect(mur.mayAuthorizeNewClaim).toBe(false);
  expect(mur.missingRequirements.length).toBeGreaterThan(0);
}

describe('scope-specific research MUR never grants Official family/Dayun/spouse/T10 meaning', () => {
  it('separates parents and children and does not upgrade calculated pillar observations into family T8', () => {
    const parents = buildFamilyBirthResearchReading(FIRST, {
      scope: 'parents', referenceDateTime: TIME,
    });
    const children = buildFamilyBirthResearchReading(FIRST, {
      scope: 'children', referenceDateTime: TIME,
    });
    expect(parents.mur.scope).toBe('family:parents');
    expect(children.mur.scope).toBe('family:children');
    expect(parents.mur.state).toBe('unsupported');
    expect(children.mur.state).toBe('unsupported');
    expect(parents.mur.observedFactPaths).toEqual([
      'pillars.month.value', 'pillars.year.value',
    ]);
    expect(children.mur.observedFactPaths).toEqual(['pillars.hour.value']);
    expect(parents.mur.sourceIds).toEqual([]);
    expect(parents.mur.missingRequirements.join(' ')).toContain('T8');
    noSemanticUpgrade(parents.mur);
    noSemanticUpgrade(children.mur);
    expect(assessFamilyMenuMur(parents.report)).toEqual(parents.mur);
    expect(assessFamilyMenuMur(children.report)).toEqual(children.mur);
  });

  it('marks unresolved child hour insufficient without borrowing parent facts', () => {
    const result = buildFamilyBirthResearchReading(
      { ...FIRST, time: { known: false } },
      { scope: 'children', referenceDateTime: TIME },
    );
    expect(result.mur.scope).toBe('family:children');
    expect(result.mur.state).toBe('insufficient');
    expect(result.mur.availableEvidence).toBe('none');
    expect(result.mur.observedFactPaths).toHaveLength(0);
    noSemanticUpgrade(result.mur);
    expect(() => assessFamilyMenuMur({
      ...result.report, scope: 'parents',
    })).toThrow('R070 observations');
  });

  it('keeps source-bounded spouse palace POSITION and blocks partner traits', () => {
    const result = buildSpousePositionBirthResearchReading(FIRST, TIME);
    expect(result.mur.scope).toBe('relationship:natal:spouse');
    expect(result.mur.state).toBe('partial');
    expect(result.mur.availableEvidence).toBe('bounded_position');
    expect(result.mur.observedFactPaths).toEqual(['pillars.day']);
    expect(result.mur.sourceIds.length).toBeGreaterThan(0);
    expect(result.mur.missingRequirements.join(' ')).toContain('배우자궁 위치 이외');
    noSemanticUpgrade(result.mur);
    expect(assessSpousePositionMenuMur(result.report)).toEqual(result.mur);
    expect(() => assessSpousePositionMenuMur({
      ...result.report, mayInferPartnerTraits: true as false,
    })).toThrow('approved position-only');
  });

  it('keeps current and next Dayun timing apart from same-person source-bound natal T8', () => {
    const result = buildLifeStageBirthResearchReading(FIRST, TIME);
    expect(result.mur.scope).toBe('life-stage:general');
    expect(result.mur.snapshotIds).toEqual([result.report.snapshotId]);
    expect(result.mur.calculationHashes).toEqual([result.report.calculationHash]);
    expect(result.mur.missingRequirements.join(' ')).toContain('대운별 의미');
    const hasPeriods = result.report.periods.length === 2;
    const hasNatal = result.natalContext.sections.length > 0;
    expect(result.mur.state).toBe(hasPeriods && hasNatal
      ? 'partial'
      : result.report.periods.length > 0 || hasNatal
        ? 'unsupported' : 'insufficient');
    if (hasNatal) {
      expect(result.mur.sourceIds.length).toBeGreaterThan(0);
    }
    noSemanticUpgrade(result.mur);
    expect(assessLifeStageMenuMur(result.report, result.natalContext)).toEqual(result.mur);
    const different = buildLifeStageBirthResearchReading(SECOND, TIME);
    expect(() => assessLifeStageMenuMur(result.report, different.natalContext))
      .toThrow('two different Canonical calculations');
    expect(() => assessLifeStageMenuMur(result.report, {
      ...result.natalContext, availability: 'bounded_natal_t8_research', sections: [],
    })).toThrow('natal-only boundary');
  });

  it('keeps two real people and their own T8 interpretations distinct from missing T10 authority', () => {
    const result = buildCompatibilityTwoBirthResearchReading(FIRST, SECOND, {
      requestId: 'compat-mur-two-person',
      subjectPersonRef: 'me', targetPersonRef: 'other',
      referenceDateTime: TIME,
    });
    expect(result.mur.scope).toBe('compatibility:natal');
    expect(result.mur.state).toBe('unsupported');
    expect(result.mur.snapshotIds).toEqual([
      result.report.subject.snapshotId,
      result.report.target.snapshotId,
    ]);
    expect(result.mur.missingRequirements.join(' ')).toContain('T10');
    noSemanticUpgrade(result.mur);
    expect(assessCompatibilityMenuMur(result.report, result.personalRelationship))
      .toEqual(result.mur);
    expect(() => assessCompatibilityMenuMur(result.report, {
      subject: result.personalRelationship.target,
      target: result.personalRelationship.subject,
    })).toThrow('exchange person-bound T8');
  });

  it('never fabricates dyadic meaning when second person has unknown hour', () => {
    const result = buildCompatibilityTwoBirthResearchReading(
      FIRST, { ...SECOND, time: { known: false } }, {
        requestId: 'compat-mur-partial-input',
        subjectPersonRef: 'me', targetPersonRef: 'other',
        referenceDateTime: TIME,
      });
    expect(result.mur.missingRequirements.join(' ')).toContain('출생시각 미상');
    expect(result.mur.state).not.toBe('complete');
    expect(result.mur.availableEvidence).toBe('calculated_facts');
    expect(result.mur.snapshotIds).toHaveLength(2);
    noSemanticUpgrade(result.mur);
  });
});
