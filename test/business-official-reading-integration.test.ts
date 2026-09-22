import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot, TenGodChartFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  BUSINESS_NATAL_READING_CANDIDATE_VERSION,
  createBusinessNatalReadingCandidateRegistry,
} from '../src/research/business-natal-reading-candidate.js';
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

const PROHIBITED_EXTENSIONS = Object.freeze([
  'entrepreneurSuitabilityAuthorized',
  'specificIndustryAuthorized',
  'businessSuccessAuthorized',
  'revenueOutcomeAuthorized',
  'fundingOutcomeAuthorized',
  'failureOutcomeAuthorized',
  'futureTimingAuthorized',
  'financialAdviceAuthorized',
  'numericScoringAuthorized',
] as const);

function snapshot(): CanonicalSajuSnapshot {
  const base = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: new Date('2026-09-23T05:30:00.000Z') },
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
    responseId: 'reading_response_business1234567890abcdef',
    responseVersion: PRODUCT_READING_RESPONSE_VERSION,
    state: 'delivered',
    messageCode: 'READING_DELIVERED',
    requiredAction: 'none',
    reading: {
      readingId: 'preview-reading-business-fidelity',
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
          sectionType: 'custom',
          title: '가오픈 사업 결과',
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
      generatedAt: '2026-09-23T05:30:00.000Z',
    },
  };
}

describe('admitted Business Preview semantics -> Official Reading -> Reader', () => {
  it('preserves claim-owned business meanings and protected boundaries end to end', () => {
    const admission = requirePreviewSemanticAdmissionV1(
      'BUSINESS_NATAL_READING_CANDIDATE',
      'business:natal',
    );
    expect(admission.disposition).toBe('claim');
    expect(admission.researchRef.observedVersion).toBe(
      BUSINESS_NATAL_READING_CANDIDATE_VERSION,
    );
    expect(admission.semanticScope).toBe(
      'existing_ga_open_business_operating_style_consumer_conclusions',
    );

    const natalSnapshot = snapshot();
    const registry = createBusinessNatalReadingCandidateRegistry(
      '2026-09-23T05:30:00.000Z',
    );
    const execution = runInterpretation(natalSnapshot, registry, {
      requestId: 'business-official-reader-fidelity',
      now: new Date('2026-09-23T05:30:00.000Z'),
    });
    const composition = buildReadingCompositionEvidence(
      natalSnapshot,
      execution,
      registry,
      {
        requestId: 'business-official-reader-reading',
        intent: {
          domain: 'business',
          temporalScope: 'natal',
        },
      },
      { narrativePolicyVersion: 'business-official-reader-fidelity-v1' },
    );

    expect(composition.selection.coverageState).toBe('complete');
    if (composition.evidence === undefined) {
      throw new Error('Expected admitted Business reading evidence.');
    }

    const selectedBusinessClaims = composition.evidence.bundle.claims.filter(
      (claim) =>
        composition.selection.targetClaimIds.includes(claim.claimId) &&
        claim.predicate === 'business_conclusion',
    );
    expect(selectedBusinessClaims.length).toBeGreaterThan(0);
    expect(
      selectedBusinessClaims.every(
        (claim) => claim.taxonomy.category === 'business' && claim.predicate === 'business_conclusion',
      ),
    ).toBe(true);

    const semantics = buildCanonicalReadingSemanticBundleV1({
      intent: {
        domain: 'business',
        temporalScope: 'natal',
      },
      evidence: composition.evidence.bundle,
      targetClaimIds: composition.selection.targetClaimIds,
    });
    const primaryBusinessUnits = semantics.units.filter(
      (unit) => unit.role === 'primary' && unit.predicate === 'business_conclusion',
    );
    expect(primaryBusinessUnits).toHaveLength(selectedBusinessClaims.length);

    for (const unit of primaryBusinessUnits) {
      const sourceClaim = selectedBusinessClaims.find(
        (claim) => claim.claimId === unit.claimId,
      );
      if (sourceClaim === undefined) throw new Error(`Missing source claim: ${unit.claimId}`);
      const sourceValue = sourceClaim.value as {
        headline?: string;
        summary?: string;
      };
      expect(unit.canonicalText).toEqual({
        headline: sourceValue.headline,
        summary: sourceValue.summary,
      });
      expect(unit.canonicalTextProvenance).toBeUndefined();
      for (const boundary of PROHIBITED_EXTENSIONS) {
        expect(unit.prohibitedExtensions).toContain(boundary);
      }
    }

    const plan = buildOfficialReadingPlanV1(semantics);
    expect(plan.sections.some((section) => section.semanticGroup === 'work')).toBe(true);
    expect(plan.sections.some((section) => section.semanticGroup === 'limits')).toBe(true);

    const report = renderOfficialReadingV1(semantics, plan);
    expect(report.sourceSemanticHash).toBe(semantics.semanticHash);
    const reportJson = JSON.stringify(report.sections);
    for (const unit of primaryBusinessUnits) {
      expect(reportJson).toContain(unit.canonicalText?.summary);
    }
    for (const internalKey of PROHIBITED_EXTENSIONS) {
      expect(reportJson).not.toContain(internalKey);
    }

    const reader = buildOfficialReadingCharacterGroundingV1({
      response: response(),
      semanticBundle: semantics,
      officialReadingReport: report,
      engineVersion: 'business-official-reader-fidelity-v1',
    });
    expect(reader.grounding.units).toHaveLength(primaryBusinessUnits.length);
    expect(reader.grounding.units.every((unit) => unit.axis === 'work')).toBe(true);
    expect(reader.grounding.units.some((unit) => unit.narrativeRole === 'tension')).toBe(true);
    for (const unit of reader.grounding.units) {
      for (const boundary of PROHIBITED_EXTENSIONS) {
        expect(unit.prohibitedExtensions).toContain(boundary);
      }
    }
    expect(reader.grounding.sourceSemanticHash).toBe(semantics.semanticHash);
    expect(reader.parity.semanticHash).toBe(semantics.semanticHash);
    expect(reader.parity.semanticHash).toBe(report.sourceSemanticHash);
  });
});
