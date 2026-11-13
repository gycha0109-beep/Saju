import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';
import { auditT10ThreeCompositionEligibilityV1 } from
  '../src/research/compatibility-t10-three-composition-eligibility-audit.js';

const birth = (year: number, month: number, day: number): BirthInput => ({
  calendarType: 'solar',
  date: { year, month, day },
  time: { known: true, hour: 14, minute: 30 },
  sexForTraditionalCalculation: 'unspecified',
});
const SUBJECT = birth(1990, 5, 15);
const FIRST = birth(1996, 6, 5);
const SECOND = birth(1996, 8, 5);

function run(
  subject: BirthInput, counterpart: BirthInput, targetPersonRef: string,
  subjectPersonRef = 'primary-human',
) {
  return buildCompatibilityTwoBirthResearchReading(subject, counterpart, {
    requestId: 't10-three-product-research',
    subjectPersonRef,
    targetPersonRef,
    referenceDateTime: '2026-11-11T00:00:00.000Z',
    candidateScope: 'traditional_marital_palace_comparison',
  });
}
function pair(output: ReturnType<typeof run>) {
  const { pairReadingBoundaryDraft: draft,
    productReadingQualityReview: quality,
    crossMethodContrastResearch: contrast } = output;
  if (!draft || !quality || !contrast) throw new TypeError('Need scoped pair evidence.');
  return { draft, quality, contrast };
}

describe('T10 stage-5 product compositions: independent research, always HOLD', () => {
  it('grounds each of the three products in its actual pair and natal-only evidence', () => {
    const first = run(SUBJECT, FIRST, 'initial-counterpart');
    const repeat = run(SUBJECT, SECOND, 'new-counterpart');
    const result = auditT10ThreeCompositionEligibilityV1(
      pair(first), pair(repeat), first.personalRelationship.subject);
    const [a, b, c] = result.products;
    expect(result.products.map(x => x.product)).toEqual([
      'first_comparison', 'repeat_comparison', 'natal_and_first_comparison',
    ]);
    expect(a.subject.personRef).toBe('primary-human');
    expect(a.counterpart.personRef).toBe('initial-counterpart');
    expect(b.counterpart.personRef).toBe('new-counterpart');
    expect(c.counterpart.personRef).toBe('initial-counterpart');
    expect(a.observedFactPaths.length).toBeGreaterThan(0);
    expect(b.observedFactPaths.length).toBeGreaterThan(0);
    expect(c.sourceUrls.length).toBeGreaterThan(0);
    expect(b.missingInterpretationPrerequisites).toContain(
      'EACH_NEW_COUNTERPART_REQUIRES_ITS_OWN_INDEPENDENT_T10_INTERPRETATION');
    expect(c.missingInterpretationPrerequisites).toContain(
      'T8_ONLY_PERSONAL_READING_CANNOT_SUBSTITUTE_MISSING_T10');
    expect(c.natalT8ResearchStatus).toBe('separate_research_not_a_t10_substitute');
    expect(result.products.every(x =>
      x.relationshipOutcomeEvidenceEstablished === false &&
      x.individualT10InterpretationReady === false &&
      x.eligibleToHandoffForSalesOrIssuance === false)).toBe(true);
    expect(result.maySell).toBe(false);
  });

  it('distinguishes different people even if the two counterparts share a birth chart', () => {
    const first = run(SUBJECT, FIRST, 'counterpart-a');
    const repeat = run(SUBJECT, FIRST, 'counterpart-b');
    const result = auditT10ThreeCompositionEligibilityV1(
      pair(first), pair(repeat), first.personalRelationship.subject);
    expect(result.products[0].counterpart.calculationHash)
      .toBe(result.products[1].counterpart.calculationHash);
    expect(result.products[0].counterpart.personRef)
      .not.toBe(result.products[1].counterpart.personRef);
    expect(result.sameBirthChartDoesNotImplySameCounterpart).toBe(true);
  });

  it('refuses reusing an existing counterpart as a purported repeat', () => {
    const first = run(SUBJECT, FIRST, 'same-person');
    const reused = run(SUBJECT, FIRST, 'same-person');
    expect(() => auditT10ThreeCompositionEligibilityV1(
      pair(first), pair(reused), first.personalRelationship.subject))
      .toThrow('distinct counterpart boundaries');
  });

  it('refuses an unrelated chart owner and a swapped subject/counterpart', () => {
    const first = run(SUBJECT, FIRST, 'first-counterpart');
    const foreign = run(SECOND, FIRST, 'new-counterpart');
    const swapped = run(FIRST, SUBJECT, 'new-counterpart', 'first-counterpart');
    for (const other of [foreign, swapped]) {
      expect(() => auditT10ThreeCompositionEligibilityV1(
        pair(first), pair(other), first.personalRelationship.subject))
        .toThrow('distinct counterpart boundaries');
    }
  });

  it('does not replace a missing two-person interpretation with the target natal T8', () => {
    const first = run(SUBJECT, FIRST, 'first-counterpart');
    const repeat = run(SUBJECT, SECOND, 'new-counterpart');
    expect(() => auditT10ThreeCompositionEligibilityV1(
      pair(first), pair(repeat), first.personalRelationship.target))
      .toThrow('distinct counterpart boundaries');
    const forged = { ...first.personalRelationship.subject,
      personRef: 'first-counterpart' };
    expect(() => auditT10ThreeCompositionEligibilityV1(
      pair(first), pair(repeat), forged))
      .toThrow('distinct counterpart boundaries');
  });

  it('rejects a forged sale-eligible repeat review without changing customer HTML', () => {
    const first = run(SUBJECT, FIRST, 'first-counterpart');
    const repeat = run(SUBJECT, SECOND, 'new-counterpart');
    const actual = pair(repeat);
    const forged = {
      ...actual,
      quality: {
        ...actual.quality,
        productEligibility: actual.quality.productEligibility.map(x =>
          x.product === 'repeat_comparison'
            ? { ...x, eligibleToHandoffForSalesOrIssuance: true as never }
            : x,
        ) as unknown as typeof actual.quality.productEligibility,
      },
    };
    expect(() => auditT10ThreeCompositionEligibilityV1(
      pair(first), forged, first.personalRelationship.subject))
      .toThrow();
    const publicView = buildCompatibilityTwoBirthResearchReading(SUBJECT, FIRST, {
      requestId: 't10-three-product-research',
      subjectPersonRef: 'primary-human',
      targetPersonRef: 'first-counterpart',
      referenceDateTime: '2026-11-11T00:00:00.000Z',
    });
    expect(publicView.html).toBe(first.html);
    expect(publicView.productReadingQualityReview).toBeUndefined();
    expect(first.mayPublish).toBe(false);
    expect(repeat.maySell).toBe(false);
  });
});
