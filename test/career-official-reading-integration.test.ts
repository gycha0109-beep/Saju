import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot, TenGodChartFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  CAREER_NATAL_READING_CANDIDATE_VERSION,
  createCareerNatalReadingCandidateRegistry,
} from '../src/research/career-natal-reading-candidate.js';
import { CAREER_NATAL_CLAIM_NARRATIVE_PROFILES } from '../src/research/career-natal-narrative-profiles.js';
import { requirePreviewSemanticAdmissionV1 } from '../src/preview/preview-semantic-admission.js';
import { buildPreviewSemanticTextBindingsV1 } from '../src/preview/preview-semantic-text-projection.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-profile-authorization.js';
import { buildCanonicalReadingSemanticBundleV1 } from '../src/reading/canonical-reading-semantics.js';
import { buildOfficialReadingPlanV1 } from '../src/reading/official-reading-plan.js';
import { renderOfficialReadingV1 } from '../src/reading/official-reading-renderer.js';
import { buildOfficialReadingCharacterGroundingV1 } from '../src/reading/official-reading-reader-parity.js';
import {
  PRODUCT_READING_RESPONSE_VERSION,
  type ProductReadingResponse,
} from '../src/reading/product-reading-response.js';

const CAREER_TEN_GODS: TenGodChartFact = {
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
    { now: new Date('2026-09-23T04:00:00.000Z') },
  );
  return {
    ...base,
    derivedFacts: {
      ...base.derivedFacts,
      tenGods: resolved(CAREER_TEN_GODS),
    },
  };
}

function response(): ProductReadingResponse {
  return {
    responseId: 'reading_response_1234567890abcdef12345678',
    responseVersion: PRODUCT_READING_RESPONSE_VERSION,
    state: 'delivered',
    messageCode: 'READING_DELIVERED',
    requiredAction: 'none',
    reading: {
      readingId: 'preview-reading-career-fidelity',
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
          sectionType: 'career',
          title: '가오픈 직업 결과',
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
      generatedAt: '2026-09-23T04:00:00.000Z',
    },
  };
}

function profileText(claimType: string) {
  const profile = CAREER_NATAL_CLAIM_NARRATIVE_PROFILES.find(
    (candidate) => candidate.claimType === claimType,
  );
  if (profile === undefined) throw new Error(`Missing Career narrative profile: ${claimType}`);
  const headline = profile.templates?.find(
    (template) => template.templateKey === 'headline' && template.language === 'ko',
  )?.text;
  const summary = profile.templates?.find(
    (template) => template.templateKey === 'summary' && template.language === 'ko',
  )?.text;
  if (headline === undefined || summary === undefined) {
    throw new Error(`Incomplete Career narrative profile: ${claimType}`);
  }
  return { headline, summary };
}

describe('admitted Career Preview semantics -> Official Reading -> Reader', () => {
  it('uses one shared Career semantic text source through claim, report, and Reader grounding', () => {
    const admission = requirePreviewSemanticAdmissionV1(
      'CAREER_NATAL_READING_CANDIDATE',
      'career:natal',
    );
    expect(admission.disposition).toBe('claim');
    expect(admission.researchRef.observedVersion).toBe(
      CAREER_NATAL_READING_CANDIDATE_VERSION,
    );
    expect(admission.semanticScope).toBe(
      'existing_ga_open_career_exact_ten_god_channel_conclusions',
    );

    const natalSnapshot = snapshot();
    const registry = createCareerNatalReadingCandidateRegistry(
      '2026-09-23T04:00:00.000Z',
    );
    const execution = runInterpretation(natalSnapshot, registry, {
      requestId: 'career-official-reader-fidelity',
      now: new Date('2026-09-23T04:00:00.000Z'),
    });
    const composition = buildReadingCompositionEvidence(
      natalSnapshot,
      execution,
      registry,
      {
        requestId: 'career-official-reader-reading',
        intent: { domain: 'career', temporalScope: 'natal' },
      });

    expect(composition.selection.coverageState).toBe('complete');
    if (composition.evidence === undefined) {
      throw new Error('Expected admitted Career reading evidence.');
    }

    const selectedCareerSemanticClaims = composition.evidence.bundle.claims.filter(
      (claim) =>
        composition.selection.targetClaimIds.includes(claim.claimId) &&
        (claim.predicate === 'career_conclusion' || claim.predicate === 'career_context'),
    );
    const selectedCareerClaims = selectedCareerSemanticClaims.filter(
      (claim) => claim.predicate === 'career_conclusion',
    );
    expect(selectedCareerSemanticClaims.length).toBeGreaterThan(0);
    expect(selectedCareerClaims.length).toBeGreaterThan(0);

    for (const claim of selectedCareerClaims) {
      const value = claim.value as {
        tenGod?: string;
        channel?: string;
      };
      expect(value).not.toHaveProperty('headline');
      expect(value).not.toHaveProperty('summary');
      expect(value.channel).toBe('visible_stems');
      expect(typeof value.tenGod).toBe('string');
    }

    const semanticTextBindings = buildPreviewSemanticTextBindingsV1({
      intent: { domain: 'career', temporalScope: 'natal' },
      registry,
      evidence: composition.evidence.bundle,
      targetClaimIds: composition.selection.targetClaimIds,
    });
    expect(semanticTextBindings).toHaveLength(selectedCareerSemanticClaims.length);

    const semantics = buildCanonicalReadingSemanticBundleV1({
      intent: { domain: 'career', temporalScope: 'natal' },
      evidence: composition.evidence.bundle,
      targetClaimIds: composition.selection.targetClaimIds,
      semanticTextBindings,
    });
    const primaryCareerUnits = semantics.units.filter(
      (unit) =>
        unit.role === 'primary' &&
        (unit.predicate === 'career_conclusion' || unit.predicate === 'career_context'),
    );
    expect(primaryCareerUnits).toHaveLength(selectedCareerSemanticClaims.length);

    for (const unit of primaryCareerUnits) {
      const expected = profileText(unit.claimType);
      expect(unit.canonicalText).toEqual(expected);
      expect(unit.canonicalTextProvenance).toEqual(
        expect.objectContaining({
          researchId: 'CAREER_NATAL_READING_CANDIDATE',
          researchVersion: CAREER_NATAL_READING_CANDIDATE_VERSION,
          authorityState: 'research',
        }),
      );
      expect(unit.semanticPayload).not.toHaveProperty('headline');
      expect(unit.semanticPayload).not.toHaveProperty('summary');
      for (const boundary of [
        'specificOccupationAuthorized',
        'careerSuccessAuthorized',
        'incomeOutcomeAuthorized',
        'futureTimingAuthorized',
        'numericScoringAuthorized',
      ]) {
        expect(unit.prohibitedExtensions).toContain(boundary);
      }
    }

    const plan = buildOfficialReadingPlanV1(semantics);
    expect(plan.sections.some((section) => section.semanticGroup === 'work')).toBe(true);
    expect(plan.sections.some((section) => section.semanticGroup === 'limits')).toBe(true);

    const report = renderOfficialReadingV1(semantics, plan);
    const reportJson = JSON.stringify(report.sections);
    for (const unit of primaryCareerUnits) {
      expect(reportJson).toContain(unit.canonicalText?.summary);
    }
    for (const internalKey of [
      'specificOccupationAuthorized',
      'careerSuccessAuthorized',
      'incomeOutcomeAuthorized',
      'futureTimingAuthorized',
      'numericScoringAuthorized',
    ]) {
      expect(reportJson).not.toContain(internalKey);
    }

    const reader = buildOfficialReadingCharacterGroundingV1({
      response: response(),
      semanticBundle: semantics,
      officialReadingReport: report,
      engineVersion: 'career-official-reader-fidelity-v1',
    });
    expect(reader.grounding.units).toHaveLength(primaryCareerUnits.length);
    expect(reader.grounding.units.every((unit) => unit.axis === 'work')).toBe(true);
    for (const unit of reader.grounding.units) {
      for (const boundary of [
        'specificOccupationAuthorized',
        'careerSuccessAuthorized',
        'incomeOutcomeAuthorized',
        'futureTimingAuthorized',
        'numericScoringAuthorized',
      ]) {
        expect(unit.prohibitedExtensions).toContain(boundary);
      }
    }
    expect(reader.parity.semanticHash).toBe(report.sourceSemanticHash);
  });
});
