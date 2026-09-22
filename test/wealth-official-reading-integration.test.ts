import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot, TenGodChartFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  createWealthNatalReadingCandidateRegistry,
  WEALTH_NATAL_READING_CANDIDATE_VERSION,
} from '../src/research/wealth-natal-reading-candidate.js';
import { requirePreviewSemanticAdmissionV1 } from '../src/preview/preview-semantic-admission.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-profile-authorization.js';
import { buildCanonicalReadingSemanticBundleV1 } from '../src/reading/canonical-reading-semantics.js';
import { buildOfficialReadingPlanV1 } from '../src/reading/official-reading-plan.js';
import { renderOfficialReadingV1 } from '../src/reading/official-reading-renderer.js';
import { buildOfficialReadingCharacterGroundingV1 } from '../src/reading/official-reading-reader-parity.js';
import {
  PRODUCT_READING_RESPONSE_VERSION,
  type ProductReadingResponse,
} from '../src/reading/product-reading-response.js';

const FIVE_FAMILY_TEN_GODS: TenGodChartFact = {
  year: { stem: resolved('비견'), branch: resolved('정인') },
  month: { stem: resolved('편재'), branch: resolved('정재') },
  day: { stem: resolved('일간'), branch: resolved('상관') },
  hour: { stem: resolved('편관'), branch: resolved('식신') },
};

function snapshot(): CanonicalSajuSnapshot {
  const base = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: new Date('2026-09-23T00:00:00.000Z') },
  );
  return {
    ...base,
    derivedFacts: {
      ...base.derivedFacts,
      tenGods: resolved(FIVE_FAMILY_TEN_GODS),
    },
  };
}

function response(): ProductReadingResponse {
  return {
    responseId: 'reading_response_wealth_abcdef0123456789',
    responseVersion: PRODUCT_READING_RESPONSE_VERSION,
    state: 'delivered',
    messageCode: 'READING_DELIVERED',
    requiredAction: 'none',
    reading: {
      readingId: 'preview-reading-wealth-fidelity',
      brand: { brandId: 'myeonghwa', displayName: '명화' },
      subject: {
        birthInputDisplay: {
          calendarType: 'solar',
          date: '2024-03-10',
          time: '12:00',
          timeKnown: true,
        },
        calculationState: 'resolved',
      },
      calculationSummary: {
        pillars: {
          year: { label: '년주', value: 'fixture', status: 'resolved' },
          month: { label: '월주', value: 'fixture', status: 'resolved' },
          day: { label: '일주', value: 'fixture', status: 'resolved' },
          hour: { label: '시주', value: 'fixture', status: 'resolved' },
        },
      },
      sections: [
        {
          sectionType: 'wealth',
          title: '가오픈 재물 결과',
          blocks: [{ type: 'paragraph', text: '기존 Preview consumer surface' }],
          state: 'complete',
        },
      ],
      disclosures: [
        {
          type: 'scope_limitation',
          text: '현재 범위 안에서만 설명합니다.',
        },
      ],
      generatedAt: '2026-09-23T00:00:00.000Z',
    },
  };
}

describe('admitted Wealth Preview semantics -> Official Reading -> Reader', () => {
  it('preserves bounded wealth meanings, tension, and financial-scope boundaries end to end', () => {
    const admission = requirePreviewSemanticAdmissionV1(
      'WEALTH_NATAL_READING_CANDIDATE',
      'wealth:natal',
    );
    expect(admission.disposition).toBe('claim');
    expect(admission.researchRef.observedVersion).toBe(
      WEALTH_NATAL_READING_CANDIDATE_VERSION,
    );
    expect(admission.semanticScope).toBe(
      'existing_ga_open_wealth_consumer_conclusions',
    );

    const natalSnapshot = snapshot();
    const registry = createWealthNatalReadingCandidateRegistry(
      '2026-09-23T00:00:00.000Z',
    );
    const execution = runInterpretation(natalSnapshot, registry, {
      requestId: 'wealth-official-reader-fidelity',
      now: new Date('2026-09-23T00:00:00.000Z'),
    });
    const composition = buildReadingCompositionEvidence(
      natalSnapshot,
      execution,
      registry,
      {
        requestId: 'wealth-official-reader-reading',
        intent: { domain: 'wealth', temporalScope: 'natal' },
      },
      { narrativePolicyVersion: 'wealth-official-reader-fidelity-v1' },
    );

    expect(composition.selection.coverageState).toBe('complete');
    if (composition.evidence === undefined) {
      throw new Error('Expected admitted Wealth reading evidence.');
    }

    const selectedWealthClaims = composition.evidence.bundle.claims.filter(
      (claim) =>
        composition.selection.targetClaimIds.includes(claim.claimId) &&
        claim.predicate === 'wealth_conclusion',
    );
    expect(selectedWealthClaims.length).toBeGreaterThan(0);

    const semantics = buildCanonicalReadingSemanticBundleV1({
      intent: { domain: 'wealth', temporalScope: 'natal' },
      evidence: composition.evidence.bundle,
      targetClaimIds: composition.selection.targetClaimIds,
    });
    const primaryWealthUnits = semantics.units.filter(
      (unit) => unit.role === 'primary' && unit.predicate === 'wealth_conclusion',
    );
    expect(primaryWealthUnits).toHaveLength(selectedWealthClaims.length);
    expect(
      primaryWealthUnits.every(
        (unit) =>
          unit.canonicalText?.headline !== undefined &&
          unit.canonicalText.summary !== undefined,
      ),
    ).toBe(true);
    expect(
      primaryWealthUnits.some(
        (unit) =>
          (unit.semanticPayload as { wealthKind?: string }).wealthKind === 'friction',
      ),
    ).toBe(true);
    expect(
      primaryWealthUnits.every((unit) =>
        [
          'netWorthAuthorized',
          'investmentReturnAuthorized',
          'windfallAuthorized',
          'financialAdviceAuthorized',
          'futureMoneyTimingAuthorized',
          'numericScoringAuthorized',
        ].every((boundary) => unit.prohibitedExtensions.includes(boundary)),
      ),
    ).toBe(true);

    const plan = buildOfficialReadingPlanV1(semantics);
    for (const semanticGroup of [
      'wealth',
      'decision_style',
      'management',
      'tension',
      'limits',
    ] as const) {
      expect(plan.sections.some((section) => section.semanticGroup === semanticGroup)).toBe(true);
    }

    const report = renderOfficialReadingV1(semantics, plan);
    const reportJson = JSON.stringify(report.sections);
    expect(reportJson).toContain('가치가 만들어지는 방식');
    expect(reportJson).toContain('돈을 쓰는 기준');
    expect(reportJson).toContain('관리 방식');
    expect(reportJson).toContain('충돌·흔들림');
    expect(reportJson).toContain('현재 근거 범위에서는');
    for (const internalKey of [
      'netWorthAuthorized',
      'investmentReturnAuthorized',
      'financialAdviceAuthorized',
      'futureMoneyTimingAuthorized',
      'numericScoringAuthorized',
    ]) {
      expect(reportJson).not.toContain(internalKey);
    }

    const reader = buildOfficialReadingCharacterGroundingV1({
      response: response(),
      semanticBundle: semantics,
      officialReadingReport: report,
      engineVersion: 'wealth-official-reader-fidelity-v1',
    });
    expect(reader.grounding.units).toHaveLength(primaryWealthUnits.length);
    expect(
      new Set(reader.grounding.units.map((unit) => unit.axis)),
    ).toEqual(
      new Set(['wealth', 'decision_style', 'responsibility', 'tension']),
    );
    expect(
      reader.grounding.units.every((unit) =>
        [
          'netWorthAuthorized',
          'investmentReturnAuthorized',
          'windfallAuthorized',
          'financialAdviceAuthorized',
          'futureMoneyTimingAuthorized',
          'numericScoringAuthorized',
        ].every((boundary) => unit.prohibitedExtensions.includes(boundary)),
      ),
    ).toBe(true);
    expect(reader.parity.semanticHash).toBe(report.sourceSemanticHash);
  });
});
