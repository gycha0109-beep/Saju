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
import { buildApprovedRelationshipMultifactorOverviewV1 } from '../src/reading/approved-relationship-multifactor-overview.js';
import { buildApprovedDomainMultifactorContextV1 } from '../src/reading/approved-domain-multifactor-context.js';
import { buildApprovedOfficialReadingDetailedRealizationV1 } from '../src/reading/official-reading-detailed-realization.js';
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

function snapshot(tenGods: TenGodChartFact = FIVE_FAMILY_TEN_GODS): CanonicalSajuSnapshot {
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
      tenGods: resolved(tenGods),
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
    // The regular consumer reading must present already-approved multi-family
    // relationship meaning, not reserve it solely for the detailed surface.
    expect(reportJson).toContain('연애·관계에서 함께 확인된 근거 기반 해석');
    expect(reportJson).toContain('이 결론에 사용된 실제 십신 계열과 관찰 위치');
    expect(reportJson).toMatch(/(?:연주|월주|일주|시주) (?:천간|지지 대표 십신)/u);
    const standardComposite = buildApprovedDomainMultifactorContextV1(
      semantics, plan, report.explainability.entries);
    expect(standardComposite?.domain).toBe('relationship');
    expect(standardComposite?.perspectives.length).toBeGreaterThan(3);
    const renderedRelationshipAxes = report.sections.flatMap(section =>
      section.blocks.flatMap(block => block.type === 'insights' ? block.items : []));
    expect(standardComposite!.perspectives.some(perspective =>
      perspective.text.includes('단일 계열 해석에 사용된 실제 십신과 관찰 위치')))
      .toBe(true);
    for (const perspective of standardComposite!.perspectives) {
      expect(renderedRelationshipAxes.some(item =>
        item.explainabilityRef === perspective.explainabilityRef &&
        item.summary?.includes(perspective.headline) &&
        item.summary?.includes(perspective.text))).toBe(true);
    }

    // No relationship-specific T8 evidence can be used to answer spouse or
    // two-person compatibility questions merely by changing the selected menu.
    expect(buildApprovedDomainMultifactorContextV1({
      ...semantics,
      intent: { domain: 'relationship', temporalScope: 'natal',
        relationshipScope: 'spouse' },
    }, plan, report.explainability.entries)).toBeUndefined();
    expect(buildApprovedDomainMultifactorContextV1({
      ...semantics, canonicalFacts: [],
    }, plan, report.explainability.entries)).toBeUndefined();
    for (const unit of primaryRelationshipUnits) {
      expect(reportJson).toContain(unit.canonicalText?.summary);
    }
    for (const internalKey of PROHIBITED_EXTENSIONS) {
      expect(reportJson).not.toContain(internalKey);
    }

    const detailedReport = renderOfficialReadingV1(semantics, plan, {
      preferredDetail: 'detailed',
    });
    expect(detailedReport.detailPreferenceResolution?.resolvedDetail).toBe('detailed');
    const focus = detailedReport.sections.find(section =>
      section.blocks.some(block => block.type === 'insights' &&
        block.items.some(item =>
          item.summary?.includes('내 명식에서 함께 확인된 관계 주제'))),
    );
    expect(focus).toBeDefined();
    expect(focus?.sectionType).toBe('relationship');
    expect(focus?.state).toBe('complete');
    expect(JSON.stringify(focus?.blocks)).toContain('최소 유효 해석 완료 판정과는 별개');
    const focusedItems = detailedReport.sections
      .filter(section => section.sectionType === 'relationship')
      .flatMap(section => section.blocks)
      .filter(block => block.type === 'insights')
      .flatMap(block => block.items)
      .filter(item => item.summary?.includes('실제 명식에서 함께 확인된 십신 계열:'));
    expect(focusedItems.length).toBeGreaterThanOrEqual(2);
    expect(focusedItems.length).toBeLessThanOrEqual(3);
    const proofRefs = new Set(detailedReport.explainability.entries.map(x => x.explainabilityRef));
    for (const item of focusedItems) {
      expect(item.explainabilityRef).toBeDefined();
      expect(proofRefs.has(item.explainabilityRef!)).toBe(true);
      expect(item.summary).toContain('실제 명식에서 함께 확인된 십신 계열:');
      expect(item.summary).toContain('관찰된 명식 위치:');
      expect(item.summary).toMatch(/연주|월주|일주|시주/u);
      expect(item.summary).not.toContain('TEN_GOD_FAMILY_');
      expect(item.summary).not.toContain('궁합 점수:');
    }
    const standardReport = report;
    expect(standardReport.sections[0]?.title).not.toBe('내 명식에서 함께 확인된 관계 주제');
    expect(detailedReport.sourceSemanticHash).toBe(standardReport.sourceSemanticHash);
    expect(detailedReport.sourcePlanHash).toBe(standardReport.sourcePlanHash);
    expect(detailedReport.sections.map(x => x.sectionId)).toEqual(
      standardReport.sections.map(x => x.sectionId),
    );
    expect(detailedReport.explainability).toEqual(standardReport.explainability);

    const approvedDetailedMaterial =
      buildApprovedOfficialReadingDetailedRealizationV1(semantics, plan);
    expect(approvedDetailedMaterial).toBeDefined();
    const focusEntry = detailedReport.explainability.entries.find(entry =>
      entry.explainabilityRef === focusedItems[0]?.explainabilityRef,
    );
    const targetUnitId = focusEntry?.primaryUnitRefs?.[0];
    const focusedUnit = semantics.units.find(unit => unit.unitId === targetUnitId);
    expect(focusedUnit).toBeDefined();
    if (targetUnitId !== undefined && focusedUnit !== undefined) {
      const originalHeadline = focusedUnit.canonicalText?.headline;
      const manipulated = {
        ...semantics,
        units: semantics.units.map(unit => unit.unitId === targetUnitId
          ? { ...unit, canonicalText: {
            headline: '승인되지 않은 관계 결론', summary: '검증 없는 부당한 주장',
          } }
          : unit),
      };
      const rejected = buildApprovedRelationshipMultifactorOverviewV1(
        manipulated, plan, approvedDetailedMaterial, detailedReport.explainability.entries,
      );
      expect(JSON.stringify(rejected)).not.toContain('승인되지 않은 관계 결론');
      expect(JSON.stringify(rejected)).not.toContain(originalHeadline);

      const brokenBinding = {
        ...plan,
        sections: plan.sections.map(section => ({
          ...section,
          primaryEvidenceBindings: section.primaryEvidenceBindings.map(binding =>
            binding.primaryUnitRef === targetUnitId
              ? { ...binding, supportingUnitRefs: binding.supportingUnitRefs.slice(1) }
              : binding,
          ),
        })),
      };
      const missingSource = buildApprovedRelationshipMultifactorOverviewV1(
        semantics, brokenBinding, approvedDetailedMaterial,
        detailedReport.explainability.entries,
      );
      expect(JSON.stringify(missingSource)).not.toContain(originalHeadline);
    }
    // The approved T8 claims alone do not license this positional paragraph.
    // It must disappear when the actual Canonical T0/T5 source fact is absent.
    const chartFactMissing = buildApprovedRelationshipMultifactorOverviewV1(
      { ...semantics, canonicalFacts: [] },
      plan, approvedDetailedMaterial, detailedReport.explainability.entries,
    );
    expect(chartFactMissing).toBeUndefined();

    const spouseScope = buildApprovedRelationshipMultifactorOverviewV1(
      { ...semantics, intent: {
        domain: 'relationship', temporalScope: 'natal', relationshipScope: 'spouse',
      } },
      plan, approvedDetailedMaterial, detailedReport.explainability.entries,
    );
    expect(spouseScope).toBeUndefined();

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
  it('changes the approved multifactor summary when the real chart has only resource/output families', () => {
    const limitedTenGods: TenGodChartFact = {
      year: { stem: resolved('정인'), branch: resolved('비견') },
      month: { stem: resolved('식신'), branch: resolved('편인') },
      day: { stem: resolved('일간'), branch: resolved('상관') },
      hour: { stem: resolved('비견'), branch: resolved('정인') },
    };
    const limitedSnapshot = snapshot(limitedTenGods);
    const registry = createRelationshipNatalReadingCandidateRegistry(
      '2026-09-23T05:00:00.000Z',
    );
    const result = runInterpretation(limitedSnapshot, registry, {
      requestId: 'relationship-resource-output-limited-actual-chart',
      now: new Date('2026-09-23T05:00:00.000Z'),
    });
    const request = {
      requestId: 'relationship-resource-output-reading',
      intent: {
        domain: 'relationship' as const,
        temporalScope: 'natal' as const,
        relationshipScope: 'general' as const,
      },
    };
    const evidence = buildReadingCompositionEvidence(
      limitedSnapshot, result, registry, request,
    );
    expect(evidence.evidence).toBeDefined();
    if (!evidence.evidence) return;
    const semantics = buildCanonicalReadingSemanticBundleV1({
      intent: request.intent,
      evidence: evidence.evidence.bundle,
      targetClaimIds: evidence.selection.targetClaimIds,
    });
    const plan = buildOfficialReadingPlanV1(semantics);
    const report = renderOfficialReadingV1(semantics, plan, {
      preferredDetail: 'detailed',
    });
    const focus = report.sections.find(section =>
      section.blocks.some(block => block.type === 'insights' &&
        block.items.some(item =>
          item.summary?.includes('내 명식에서 함께 확인된 관계 주제'))),
    );
    expect(focus).toBeDefined();
    const focusedItems = focus?.blocks
      .filter(block => block.type === 'insights')
      .flatMap(block => block.items)
      .filter(item => item.summary?.includes('실제 명식에서 함께 확인된 십신 계열:')) ?? [];
    expect(focusedItems).toHaveLength(1);
    expect(focus?.state).toBe('complete');
    expect(JSON.stringify(focus?.blocks)).toContain('관계 종합풀이의 완성을 뜻하지 않습니다.');
    expect(focusedItems[0]?.summary).toContain('생각을 정리한 뒤');
    expect(focusedItems[0]?.summary).toContain('대화');
    expect(focusedItems[0]?.summary).toContain('인성');
    expect(focusedItems[0]?.summary).toContain('식상');
    expect(focusedItems[0]?.summary).not.toContain('관성');
    expect(focusedItems[0]?.summary).not.toContain('재성');
    expect(focusedItems[0]?.summary).toContain('연주 천간 정인');
    expect(focusedItems[0]?.summary).toContain('월주 천간 식신');
    expect(focusedItems[0]?.summary).not.toContain('월주 천간 편재');
    expect(focusedItems.every(item =>
      !item.summary?.includes('결혼 시기가 확정') &&
      !item.summary?.includes('궁합 점수:'),
    )).toBe(true);
  });

});
