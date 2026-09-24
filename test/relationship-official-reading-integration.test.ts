import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot, TenGodChartFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  createRelationshipNatalReadingCandidateRegistry,
  RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
} from '../src/research/relationship-natal-reading-candidate.js';
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
  'specificPartnerAuthorized',
  'partnerAttributePredictionAuthorized',
  'marriageOutcomeAuthorized',
  'breakupOutcomeAuthorized',
  'infidelityInferenceAuthorized',
  'futureTimingAuthorized',
  'compatibilityAuthorized',
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
    { now: new Date('2026-09-23T05:00:00.000Z') },
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
    responseId: 'reading_response_abcdef1234567890abcdef12',
    responseVersion: PRODUCT_READING_RESPONSE_VERSION,
    state: 'delivered',
    messageCode: 'READING_DELIVERED',
    requiredAction: 'none',
    reading: {
      readingId: 'preview-reading-relationship-fidelity',
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
          sectionType: 'relationship',
          title: '가오픈 관계 결과',
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
      generatedAt: '2026-09-23T05:00:00.000Z',
    },
  };
}

describe('admitted general Relationship Preview semantics -> Official Reading -> Reader', () => {
  it('preserves claim-owned relationship meanings and protected boundaries end to end', () => {
    const admission = requirePreviewSemanticAdmissionV1(
      'RELATIONSHIP_NATAL_READING_CANDIDATE',
      'relationship:natal:general',
    );
    expect(admission.disposition).toBe('claim');
    expect(admission.researchRef.observedVersion).toBe(
      RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
    );
    expect(admission.semanticScope).toBe(
      'existing_ga_open_relationship_general_consumer_conclusions',
    );

    const natalSnapshot = snapshot();
    const registry = createRelationshipNatalReadingCandidateRegistry(
      '2026-09-23T05:00:00.000Z',
    );
    const execution = runInterpretation(natalSnapshot, registry, {
      requestId: 'relationship-official-reader-fidelity',
      now: new Date('2026-09-23T05:00:00.000Z'),
    });
    const composition = buildReadingCompositionEvidence(
      natalSnapshot,
      execution,
      registry,
      {
        requestId: 'relationship-official-reader-reading',
        intent: {
          domain: 'relationship',
          temporalScope: 'natal',
          relationshipScope: 'general',
        },
      });

    expect(composition.selection.coverageState).toBe('complete');
    if (composition.evidence === undefined) {
      throw new Error('Expected admitted general Relationship reading evidence.');
    }

    const selectedRelationshipClaims = composition.evidence.bundle.claims.filter(
      (claim) =>
        composition.selection.targetClaimIds.includes(claim.claimId) &&
        claim.predicate === 'relationship_conclusion',
    );
    expect(selectedRelationshipClaims.length).toBeGreaterThan(0);

    const semantics = buildCanonicalReadingSemanticBundleV1({
      intent: {
        domain: 'relationship',
        temporalScope: 'natal',
        relationshipScope: 'general',
      },
      evidence: composition.evidence.bundle,
      targetClaimIds: composition.selection.targetClaimIds,
    });
    const primaryRelationshipUnits = semantics.units.filter(
      (unit) => unit.role === 'primary' && unit.predicate === 'relationship_conclusion',
    );
    expect(primaryRelationshipUnits).toHaveLength(selectedRelationshipClaims.length);

    for (const unit of primaryRelationshipUnits) {
      const sourceClaim = selectedRelationshipClaims.find(
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
    expect(plan.sections.some((section) => section.semanticGroup === 'relationship')).toBe(true);
    expect(plan.sections.some((section) => section.semanticGroup === 'limits')).toBe(true);

    const report = renderOfficialReadingV1(semantics, plan);
    const reportJson = JSON.stringify(report.sections);
    for (const unit of primaryRelationshipUnits) {
      expect(reportJson).toContain(unit.canonicalText?.summary);
    }
    for (const internalKey of PROHIBITED_EXTENSIONS) {
      expect(reportJson).not.toContain(internalKey);
    }

    const reader = buildOfficialReadingCharacterGroundingV1({
      response: response(),
      semanticBundle: semantics,
      officialReadingReport: report,
      engineVersion: 'relationship-official-reader-fidelity-v1',
    });
    expect(reader.grounding.units).toHaveLength(primaryRelationshipUnits.length);
    expect(reader.grounding.units.every((unit) => unit.axis === 'relationship')).toBe(true);
    expect(reader.grounding.units.some((unit) => unit.narrativeRole === 'tension')).toBe(true);
    for (const unit of reader.grounding.units) {
      for (const boundary of PROHIBITED_EXTENSIONS) {
        expect(unit.prohibitedExtensions).toContain(boundary);
      }
    }
    expect(reader.parity.semanticHash).toBe(report.sourceSemanticHash);
  });
});
