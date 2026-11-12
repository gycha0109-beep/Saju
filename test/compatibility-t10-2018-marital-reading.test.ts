import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';
import { buildT102018MaritalResearchReadingV1 } from
  '../src/research/compatibility-t10-2018-marital-reading.js';

const birth = (
  year: number, month: number, day: number,
  sex: 'male' | 'female' | 'unspecified' = 'unspecified',
  known = true,
): BirthInput => ({
  calendarType: 'solar',
  date: { year, month, day },
  time: known ? { known: true, hour: 14, minute: 30 } : { known: false },
  sexForTraditionalCalculation: sex,
});
const male = birth(1990, 5, 15, 'male');
const female = birth(1996, 6, 5, 'female');
const compare = (
  a: BirthInput, b: BirthInput,
  relationshipContext: 'married_couple' | 'romantic_partner' |
    'friend' | 'family' | 'colleague' | 'unspecified' = 'married_couple',
  optIn = true,
) => buildCompatibilityTwoBirthResearchReading(a, b, {
  requestId: '2018-marital-korean-source-trace',
  subjectPersonRef: 'first-person',
  targetPersonRef: 'second-person',
  referenceDateTime: '2026-11-11T00:00:00.000Z',
  ...(optIn ? { candidateScope: 'traditional_marital_palace_comparison' as const } : {}),
  ...(optIn ? { relationshipContext } : {}),
});

describe('2018 actual-chart Korean research reading with original source bounds', () => {
  it('writes a separate palace and visible spouse-star factual sentence per person', () => {
    const result = compare(male, female);
    const reading = result.maritalResearchReading2018;
    expect(reading?.relationshipContext).toBe('married_couple');
    expect(reading?.sentences).toHaveLength(3);
    expect(reading?.sentences[0]?.historicalRole).toBe('husband');
    expect(reading?.sentences[1]?.historicalRole).toBe('wife');
    expect(reading?.sentences[0]?.observedFactPaths).toEqual(
      expect.arrayContaining([
        'subject.pillars.day.value.stem.element',
        'subject.pillars.day.value.branch.element',
      ]),
    );
    expect(reading?.sentences[1]?.sourceUrls).toContain(
      'https://www.kci.go.kr/kciportal/landing/article.kci?arti_id=ART002338687',
    );
    expect(reading?.sentences[2]?.missingPrerequisites)
      .toContain('FULL_2018_CASES_AND_METHOD_EXCEPTIONS_UNREAD');
    expect(reading?.contextBoundedKoreanReading)
      .toContain(result.relationshipContextBoundary?.contextBoundedKoreanDraft);
    expect(reading?.contextBoundedKoreanReading)
      .toContain('2018년 이별 부부 연구 — 원국에서 확인된 사실');
    expect(reading?.palaceStarPriorityApplicableToThisPair).toBe(false);
    expect(reading?.spouseStarStrengthEstablished).toBe(false);
    expect(reading?.relationshipVerdict).toBeNull();
  });

  it('does not include any divorce-study sentence for unrelated declared contexts', () => {
    for (const kind of ['romantic_partner', 'friend', 'family',
      'colleague', 'unspecified'] as const) {
      const result = compare(male, female, kind);
      expect(result.maritalResearchReading2018).toBeUndefined();
      expect(result.relationshipContextBoundary?.contextBoundedKoreanDraft)
        .not.toContain('2018년 이별 부부 연구 — 원국에서 확인된 사실');
    }
    const defaultResult = compare(male, female, 'married_couple', false);
    expect(defaultResult.maritalResearchReading2018).toBeUndefined();
  });

  it('keeps historical roles and the two original people separate after reversing', () => {
    const forward = compare(male, female).maritalResearchReading2018;
    const reverse = compare(female, male).maritalResearchReading2018;
    expect(forward?.sentences[0]?.historicalRole).toBe('husband');
    expect(reverse?.sentences[0]?.historicalRole).toBe('wife');
    expect(forward?.sentences[0]?.paragraph)
      .toBe(reverse?.sentences[1]?.paragraph.replace('두 번째 명식', '첫 번째 명식'));
    expect(forward?.target.calculationHash).toBe(reverse?.subject.calculationHash);
  });

  it('reports missing hour positions as unavailable instead of silently counting them as zero', () => {
    const missing = birth(1996, 6, 5, 'female', false);
    const reading = compare(male, missing).maritalResearchReading2018;
    expect(reading?.sentences[1]?.unavailableFactPaths).toEqual(
      expect.arrayContaining([
        'target.derivedFacts.tenGods.hour.stem',
        'target.derivedFacts.tenGods.hour.branch',
      ]),
    );
    expect(reading?.sentences[1]?.paragraph).toContain('일부 계산 위치가 미상');
    expect(reading?.sentences[1]?.paragraph).not.toContain('0개이므로 미약');
  });

  it('does not infer the historical spouse role from modern relationship declaration', () => {
    const reading = compare(birth(1990, 5, 15), female).maritalResearchReading2018;
    expect(reading?.sentences[0]?.historicalRole)
      .toBe('not_in_2018_historical_sex_scope');
    expect(reading?.sentences[1]?.historicalRole)
      .toBe('not_in_2018_historical_sex_scope');
    expect(reading?.sentences[0]?.paragraph)
      .toContain('역사적 남편·부인 분류 조건에 해당하지 않아');
  });

  it('rejects forged sources, fact paths or person identity before Korean rendering', () => {
    const result = compare(male, female);
    const scope = result.relationshipContextBoundary;
    const draft = result.pairReadingBoundaryDraft;
    const quality = result.productReadingQualityReview;
    const study = result.divorceStudy2018MethodBoundary;
    const palace = result.maritalPalaceIntraChartResearch;
    if (!scope || !draft || !quality || !study || !palace) {
      throw new TypeError('Missing T10 study data.');
    }
    // A fresh canonical calculation is also used when rebuilding the source audit.
    // The generated report is compared to the original independently recalculated evidence.
    const calc = (b: BirthInput) => {
      const { calculateAuthorizedMyeonghwaProductionSnapshot } =
        require('../src/production/production-calculation-runtime.js');
      return calculateAuthorizedMyeonghwaProductionSnapshot(
        b, { now: new Date('2026-11-11T00:00:00.000Z') },
      ).snapshot;
    };
    const subject = calc(male);
    const target = calc(female);
    const args = [result.sourceScopeHandoff, palace, subject, target] as const;
    expect(() => buildT102018MaritalResearchReadingV1(
      scope, draft, quality,
      { ...study, subject: { ...study.subject, visibleSlotCount: 999 } },
      ...args,
    )).toThrow('evidence substitution');
    expect(() => buildT102018MaritalResearchReadingV1(
      scope, draft, quality,
      { ...study, target: { ...study.target, calculationHash: 'wrong-hash' } },
      ...args,
    )).toThrow();
    expect(() => buildT102018MaritalResearchReadingV1(
      { ...scope, contextBoundedKoreanDraft: '두 사람의 결혼 운명은 확정됨' },
      draft, quality, study, ...args,
    )).toThrow('evidence substitution');
  });

  it('leaves the public page and T10 official product authorizations unchanged', () => {
    const ordinary = compare(male, female, 'married_couple', false);
    const scoped = compare(male, female);
    expect(ordinary.html).toBe(scoped.html);
    expect(scoped.maritalResearchReading2018?.sentences.every(sentence =>
      sentence.relationshipInterpretationAuthorized === false)).toBe(true);
    expect(scoped.maritalResearchReading2018?.mayPublish).toBe(false);
    expect(scoped.maritalResearchReading2018?.maySell).toBe(false);
    expect(scoped.maySell).toBe(false);
    expect(scoped.mayPersist).toBe(false);
    expect(scoped.mayMarkMenuAvailable).toBe(false);
  });
});
