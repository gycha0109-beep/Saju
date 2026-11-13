import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';

function birth(year: number, month: number, day: number,
  known = true): BirthInput {
  return {
    calendarType: 'solar', date: { year, month, day },
    time: known ? { known: true, hour: 14, minute: 30 } : { known: false },
    sexForTraditionalCalculation: 'unspecified',
  };
}
const A = birth(1990, 5, 15);
const SIX_WITH_CLASH = birth(1996, 6, 5);
const CLASH_WITH_SIX = birth(1996, 8, 5);
const NO_OPPOSITE = birth(1990, 5, 8);

function run(a: BirthInput, b: BirthInput, active = true) {
  return buildCompatibilityTwoBirthResearchReading(a, b, {
    requestId: 'internal-commercial-interpretation-test',
    subjectPersonRef: 'first-person',
    targetPersonRef: 'second-person',
    referenceDateTime: '2026-11-11T00:00:00.000Z',
    ...(active ? { candidateScope: 'traditional_marital_palace_comparison' as const } : {}),
  });
}

describe('MyeongHa internal interpretation is separate from external approval and issuance', () => {
  it('explains two opposite mixed structures as bounded conversations, not forecasts', () => {
    const six = run(A, SIX_WITH_CLASH);
    const clash = run(A, CLASH_WITH_SIX);
    const none = run(A, NO_OPPOSITE);
    const first = six.internalServiceInterpretationDraft;
    const second = clash.internalServiceInterpretationDraft;
    const third = none.internalServiceInterpretationDraft;
    expect(first?.policy.academicThirdPartyApprovalRequired).toBe(false);
    expect(first?.policy.adoption).toBe('project_owner_service_lexicon');
    expect(first?.sentences.some(x =>
      x.ruleId === 'T10-SERVICE-DAY-SIX-COMBINATION')).toBe(true);
    expect(second?.sentences.some(x =>
      x.ruleId === 'T10-SERVICE-DAY-CLASH')).toBe(true);
    expect(first?.sentences.some(x =>
      x.ruleId === 'T10-SERVICE-MIXED-POSITIONS')).toBe(true);
    expect(second?.sentences.some(x =>
      x.ruleId === 'T10-SERVICE-MIXED-POSITIONS')).toBe(true);
    expect(third?.sentences.some(x =>
      x.ruleId === 'T10-SERVICE-DAY-NO-SIX-OR-CLASH')).toBe(true);
    for (const result of [six, clash, none]) {
      const draft = result.internalServiceInterpretationDraft;
      expect(draft).toBeDefined();
      expect(draft?.koreanDraft).toBe(draft?.sentences.map(x =>
        x.paragraph).join('\n\n'));
      for (const line of draft?.sentences ?? []) {
        expect(line.paragraph.trim()).not.toBe('');
        expect(line.interpretationOwner).toBe('myeongha_internal_service');
        expect(line.individualOutcomeClaimed).toBe(false);
        expect(line.observedFactPaths.every(p =>
          /^(subject|target)\.pillars\./u.test(p))).toBe(true);
      }
      expect(draft?.overallScore).toBeNull();
      expect(draft?.relationshipForecast).toBeNull();
      expect(draft?.readyForOfficialIssue).toBe(false);
      expect(draft?.mayPublish).toBe(false);
      expect(draft?.maySell).toBe(false);
      expect(result.productReadingQualityReview?.actualCompatibilityReadingReady)
        .toBe(false);
      expect(result.maySell).toBe(false);
      expect(result.mayPublish).toBe(false);
    }
  });

  it('preserves person-owned facts on input reversal and keeps customer HTML unchanged', () => {
    const forward = run(A, SIX_WITH_CLASH);
    const reversed = run(SIX_WITH_CLASH, A);
    expect(forward.internalServiceInterpretationDraft?.subject.calculationHash)
      .toBe(reversed.internalServiceInterpretationDraft?.target.calculationHash);
    expect(forward.internalServiceInterpretationDraft?.target.calculationHash)
      .toBe(reversed.internalServiceInterpretationDraft?.subject.calculationHash);
    expect(forward.internalServiceInterpretationDraft?.sentences[0]?.ruleId)
      .toBe(reversed.internalServiceInterpretationDraft?.sentences[0]?.ruleId);
    const passive = run(A, SIX_WITH_CLASH, false);
    expect(passive.internalServiceInterpretationDraft).toBeUndefined();
    expect(passive.html).toBe(forward.html);
    expect(forward.html).not.toContain('명하는 이를');
  });

  it('keeps unknown-time facts conditional and never grants access', () => {
    const unknown = run(birth(1990, 5, 15, false), SIX_WITH_CLASH);
    const draft = unknown.internalServiceInterpretationDraft;
    expect(draft?.readyForOfficialIssue).toBe(false);
    expect(draft?.maySell).toBe(false);
    expect(draft?.sentences.every(x => x.individualOutcomeClaimed === false))
      .toBe(true);
    expect(unknown.report.researchOnly).toBe(true);
    expect(unknown.mayPersist).toBe(false);
  });
});
