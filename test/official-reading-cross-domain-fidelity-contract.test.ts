import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { CanonicalSajuSnapshot, TenGodChartFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import type { ReadingIntent } from '../src/contracts/reading.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import type { ResolvedRuleRegistrySnapshot } from '../src/interpretation/rule-registry.js';
import { PREVIEW_E2E_APPROVAL, type PreviewE2eSupportedReadingSection } from '../src/preview/preview-authority.js';
import {
  createPreviewSemanticAdmissionRegistryV1,
  requirePreviewSemanticAdmissionV1,
} from '../src/preview/preview-semantic-admission.js';
import { buildPreviewSemanticQualifierBindingsV1 } from '../src/preview/preview-semantic-qualifier-projection.js';
import { buildPreviewSemanticTextBindingsV1 } from '../src/preview/preview-semantic-text-projection.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  createBusinessNatalReadingCandidateRegistry,
} from '../src/research/business-natal-reading-candidate.js';
import {
  createCareerNatalReadingCandidateRegistry,
} from '../src/research/career-natal-reading-candidate.js';
import {
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
} from '../src/research/general-natal-t8-structural-summary-candidate.js';
import {
  createRelationshipNatalReadingCandidateRegistry,
} from '../src/research/relationship-natal-reading-candidate.js';
import {
  createWealthNatalReadingCandidateRegistry,
} from '../src/research/wealth-natal-reading-candidate.js';
import {
  buildCanonicalReadingSemanticBundleV1,
  isCanonicalReadingScopeGuardUnitV1,
  type CanonicalReadingSemanticUnitV1,
} from '../src/reading/canonical-reading-semantics.js';
import { buildOfficialReadingPlanV1 } from '../src/reading/official-reading-plan.js';
import {
  canRenderOfficialReadingV1,
  renderOfficialReadingV1,
} from '../src/reading/official-reading-renderer.js';
import { buildOfficialReadingCharacterGroundingV1 } from '../src/reading/official-reading-reader-parity.js';
import {
  PRODUCT_READING_RESPONSE_VERSION,
  type ProductReadingResponse,
} from '../src/reading/product-reading-response.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-profile-authorization.js';

const NOW = '2026-09-23T06:30:00.000Z';

const FIVE_FAMILY_TEN_GODS: TenGodChartFact = {
  year: { stem: resolved('비견'), branch: resolved('정인') },
  month: { stem: resolved('편재'), branch: resolved('정재') },
  day: { stem: resolved('일간'), branch: resolved('상관') },
  hour: { stem: resolved('편관'), branch: resolved('식신') },
};

type TextAuthority = 'claim_owned' | 'explicit_projection' | 'general_structural';

interface DomainContractCase {
  label: string;
  targetSection: PreviewE2eSupportedReadingSection;
  researchId: string;
  researchVersion: string;
  authorityState: string;
  intent: ReadingIntent;
  createRegistry: (createdAt: string) => ResolvedRuleRegistrySnapshot;
  useFiveFamilyTenGods: boolean;
  semanticUnitPredicate: (unit: CanonicalReadingSemanticUnitV1) => boolean;
  textAuthority: TextAuthority;
  expectedSemanticGroups: readonly string[];
  expectedAxes: readonly string[];
  exactAxes: boolean;
  prohibitedExtensions: readonly string[];
  requiresTension: boolean;
}

const DOMAIN_CASES: readonly DomainContractCase[] = [
  {
    label: 'general',
    targetSection: 'general:natal',
    researchId: 'GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CANDIDATE',
    researchVersion: '0.2.0-research',
    authorityState: 'research',
    intent: { domain: 'general', temporalScope: 'natal' },
    createRegistry: createBusinessNatalReadingCandidateRegistry,
    useFiveFamilyTenGods: false,
    semanticUnitPredicate: (unit) =>
      unit.claimType === GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
    textAuthority: 'general_structural',
    expectedSemanticGroups: ['interpretation', 'limits'],
    expectedAxes: ['structure'],
    exactAxes: false,
    prohibitedExtensions: [
      'classificationAuthorized',
      'fortunePolarityAuthorized',
      'numericScoringAuthorized',
      'upstreamEvidenceDirectionAsFortuneMeaningAuthorized',
      'monthBranchExclusiveAuthority',
      'universalRootOrdering',
      'numericMonthBranchMultiplier',
      'strengthClassifier',
    ],
    requiresTension: false,
  },
  {
    label: 'career',
    targetSection: 'career:natal',
    researchId: 'CAREER_NATAL_READING_CANDIDATE',
    researchVersion: '0.5.0-research',
    authorityState: 'research',
    intent: { domain: 'career', temporalScope: 'natal' },
    createRegistry: createCareerNatalReadingCandidateRegistry,
    useFiveFamilyTenGods: true,
    semanticUnitPredicate: (unit) =>
      unit.predicate === 'career_conclusion' || unit.predicate === 'career_context',
    textAuthority: 'explicit_projection',
    expectedSemanticGroups: ['work', 'limits'],
    expectedAxes: ['work'],
    exactAxes: true,
    prohibitedExtensions: [
      'specificOccupationAuthorized',
      'careerSuccessAuthorized',
      'incomeOutcomeAuthorized',
      'futureTimingAuthorized',
      'numericScoringAuthorized',
    ],
    requiresTension: false,
  },
  {
    label: 'wealth',
    targetSection: 'wealth:natal',
    researchId: 'WEALTH_NATAL_READING_CANDIDATE',
    researchVersion: '0.4.0-research',
    authorityState: 'research',
    intent: { domain: 'wealth', temporalScope: 'natal' },
    createRegistry: createWealthNatalReadingCandidateRegistry,
    useFiveFamilyTenGods: true,
    semanticUnitPredicate: (unit) => unit.predicate === 'wealth_conclusion',
    textAuthority: 'claim_owned',
    expectedSemanticGroups: ['wealth', 'decision_style', 'management', 'tension', 'limits'],
    expectedAxes: ['wealth', 'decision_style', 'responsibility', 'tension'],
    exactAxes: true,
    prohibitedExtensions: [
      'netWorthAuthorized',
      'investmentReturnAuthorized',
      'windfallAuthorized',
      'financialAdviceAuthorized',
      'futureMoneyTimingAuthorized',
      'numericScoringAuthorized',
    ],
    requiresTension: true,
  },
  {
    label: 'relationship',
    targetSection: 'relationship:natal:general',
    researchId: 'RELATIONSHIP_NATAL_READING_CANDIDATE',
    researchVersion: '0.5.0-research',
    authorityState: 'research',
    intent: { domain: 'relationship', temporalScope: 'natal', relationshipScope: 'general' },
    createRegistry: createRelationshipNatalReadingCandidateRegistry,
    useFiveFamilyTenGods: true,
    semanticUnitPredicate: (unit) => unit.predicate === 'relationship_conclusion',
    textAuthority: 'claim_owned',
    expectedSemanticGroups: ['relationship', 'limits'],
    expectedAxes: ['relationship'],
    exactAxes: true,
    prohibitedExtensions: [
      'specificPartnerAuthorized',
      'partnerAttributePredictionAuthorized',
      'marriageOutcomeAuthorized',
      'breakupOutcomeAuthorized',
      'infidelityInferenceAuthorized',
      'futureTimingAuthorized',
      'compatibilityAuthorized',
      'numericScoringAuthorized',
    ],
    requiresTension: true,
  },
  {
    label: 'business',
    targetSection: 'business:natal',
    researchId: 'BUSINESS_NATAL_READING_CANDIDATE',
    researchVersion: '0.8.0-research',
    authorityState: 'research',
    intent: { domain: 'business', temporalScope: 'natal' },
    createRegistry: createBusinessNatalReadingCandidateRegistry,
    useFiveFamilyTenGods: true,
    semanticUnitPredicate: (unit) => unit.predicate === 'business_conclusion',
    textAuthority: 'claim_owned',
    expectedSemanticGroups: ['work', 'limits'],
    expectedAxes: ['work'],
    exactAxes: true,
    prohibitedExtensions: [
      'entrepreneurSuitabilityAuthorized',
      'specificIndustryAuthorized',
      'businessSuccessAuthorized',
      'revenueOutcomeAuthorized',
      'fundingOutcomeAuthorized',
      'failureOutcomeAuthorized',
      'futureTimingAuthorized',
      'financialAdviceAuthorized',
      'numericScoringAuthorized',
    ],
    requiresTension: true,
  },
];

function snapshot(useFiveFamilyTenGods: boolean): CanonicalSajuSnapshot {
  const base = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: new Date(NOW) },
  );
  if (!useFiveFamilyTenGods) return base;
  return {
    ...base,
    derivedFacts: {
      ...base.derivedFacts,
      tenGods: resolved(FIVE_FAMILY_TEN_GODS),
    },
  };
}

function response(label: string): ProductReadingResponse {
  return {
    responseId: 'reading_response_abcdef1234567890abcdef56',
    responseVersion: PRODUCT_READING_RESPONSE_VERSION,
    state: 'delivered',
    messageCode: 'READING_DELIVERED',
    requiredAction: 'none',
    reading: {
      readingId: 'preview-reading-cross-domain-' + label,
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
          sectionType: 'overview',
          title: '가오픈 결과',
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
      generatedAt: NOW,
    },
  };
}

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function sorted(values: readonly string[]): readonly string[] {
  return [...values].sort();
}

describe('cross-domain Official Reading semantic fidelity contract', () => {
  it('keeps the Preview supported surface exactly aligned with the fidelity matrix', () => {
    expect(sorted(PREVIEW_E2E_APPROVAL.supportedReadingSections)).toEqual(
      sorted(DOMAIN_CASES.map((candidate) => candidate.targetSection)),
    );
    expect(PREVIEW_E2E_APPROVAL.lifecycle).toBe('preview');
    expect(PREVIEW_E2E_APPROVAL.productionInterpretationAuthorityGranted).toBe(false);
    expect(PREVIEW_E2E_APPROVAL.persistenceAuthorityGranted).toBe(false);
  });

  it('pins every admitted semantic carrier and keeps all admissions outside Production authority', () => {
    const registry = createPreviewSemanticAdmissionRegistryV1();

    for (const candidate of DOMAIN_CASES) {
      const admission = requirePreviewSemanticAdmissionV1(
        candidate.researchId,
        candidate.targetSection,
      );
      expect(admission.disposition).toBe('claim');
      expect(admission.researchRef.expectedVersion).toBe(candidate.researchVersion);
      expect(admission.researchRef.observedVersion).toBe(candidate.researchVersion);
      expect(admission.researchRef.expectedAuthorityState).toBe(candidate.authorityState);
      expect(admission.researchRef.observedAuthorityState).toBe(candidate.authorityState);
    }

    for (const admission of registry.entries) {
      expect(admission.effects.mayAffectProductionAuthority).toBe(false);
      expect(admission.effects.mayPromoteResearchLifecycle).toBe(false);
      expect(admission.effects.mayInferMissingSemantics).toBe(false);
      expect(admission.effects.mayOverrideCalculationAuthority).toBe(false);
    }
  });

  it.each(DOMAIN_CASES)(
    '$label preserves admitted meaning, boundaries, and semantic identity end to end',
    (candidate) => {
      const natalSnapshot = snapshot(candidate.useFiveFamilyTenGods);
      const registry = candidate.createRegistry(NOW);
      const execution = runInterpretation(natalSnapshot, registry, {
        requestId: 'cross-domain-' + candidate.label + '-interpretation',
        now: new Date(NOW),
      });
      const composition = buildReadingCompositionEvidence(
        natalSnapshot,
        execution,
        registry,
        {
          requestId: 'cross-domain-' + candidate.label + '-reading',
          intent: candidate.intent,
        });

      expect(composition.selection.coverageState).toBe('complete');
      expect(composition.selection.profileAuthorization.state).toBe('authorized');
      expect(composition.profileAuthorization?.constraints).toEqual({
        mayAuthorizeInterpretationRules: false,
        mayAuthorizeClaimGeneration: false,
        mayAuthorizeDomainSemantics: false,
        mayPromoteResearchAuthority: false,
        mayOverrideInterpretationAuthorization: false,
      });
      if (composition.evidence === undefined) {
        throw new Error('Expected admitted reading evidence for ' + candidate.label);
      }

      const semanticTextBindings = buildPreviewSemanticTextBindingsV1({
        intent: candidate.intent,
        registry,
        evidence: composition.evidence.bundle,
        targetClaimIds: composition.selection.targetClaimIds,
      });
      const semanticQualifierBindings = buildPreviewSemanticQualifierBindingsV1({
        intent: candidate.intent,
        registry,
        evidence: composition.evidence.bundle,
        targetClaimIds: composition.selection.targetClaimIds,
      });

      if (candidate.textAuthority === 'explicit_projection') {
        expect(semanticTextBindings.length).toBeGreaterThan(0);
        expect(semanticQualifierBindings).toHaveLength(0);
      } else if (candidate.textAuthority === 'general_structural') {
        expect(semanticTextBindings).toHaveLength(0);
        expect(semanticQualifierBindings).toHaveLength(1);
        expect(semanticQualifierBindings[0]?.qualifier.provenance.researchId).toBe(
          'R012_MONTH_BRANCH_PRIORITY',
        );
        expect(semanticQualifierBindings[0]?.qualifier.provenance.researchVersion).toBe(
          '0.2.0-research',
        );
      } else {
        expect(semanticTextBindings).toHaveLength(0);
        expect(semanticQualifierBindings).toHaveLength(0);
      }

      const semantics = buildCanonicalReadingSemanticBundleV1({
        intent: candidate.intent,
        evidence: composition.evidence.bundle,
        targetClaimIds: composition.selection.targetClaimIds,
        semanticTextBindings,
        semanticQualifierBindings,
      });

      expect(semantics.constraints).toEqual({
        mayGenerateClaims: false,
        mayResolveConflicts: false,
        mayCollapseScenarios: false,
        mayPromoteResearchAuthority: false,
        mayInferMissingSemantics: false,
      });

      const unitsByClaimId = new Map(semantics.units.map((unit) => [unit.claimId, unit]));
      const claimsById = new Map(
        composition.evidence.bundle.claims.map((claim) => [claim.claimId, claim]),
      );
      const targetUnits = composition.selection.targetClaimIds.map((claimId) => {
        const unit = unitsByClaimId.get(claimId);
        if (unit === undefined || unit.role !== 'primary') {
          throw new Error('Missing primary canonical unit for ' + claimId);
        }
        return unit;
      });
      const realizablePrimaryUnits = targetUnits.filter(
        (unit) => !isCanonicalReadingScopeGuardUnitV1(unit),
      );
      expect(realizablePrimaryUnits.length).toBeGreaterThan(0);

      for (const unit of realizablePrimaryUnits) {
        expect(
          (unit.canonicalText?.headline?.trim().length ?? 0) > 0 ||
            (unit.canonicalText?.summary?.trim().length ?? 0) > 0,
        ).toBe(true);
        const sourceClaim = claimsById.get(unit.claimId);
        if (sourceClaim === undefined) {
          throw new Error('Missing source claim for ' + unit.claimId);
        }
        expect(unit.methodologyRef).toEqual(sourceClaim.methodologyRef);
        expect(unit.ruleRefs).toEqual(sourceClaim.ruleRefs);
        expect(unit.factRefs).toEqual(sorted(sourceClaim.factRefs));
        expect(unit.upstreamClaimRefs).toEqual(sorted(sourceClaim.upstreamClaimRefs));
        expect(unit.researchEvidenceRefs).toEqual(sorted(sourceClaim.researchEvidenceRefs ?? []));
        expect(unit.sourceRefs).toEqual(sorted(sourceClaim.sourceRefs));
      }

      const semanticUnits = realizablePrimaryUnits.filter(candidate.semanticUnitPredicate);
      expect(semanticUnits.length).toBeGreaterThan(0);

      if (candidate.textAuthority === 'explicit_projection') {
        expect(semanticTextBindings).toHaveLength(semanticUnits.length);
        for (const unit of semanticUnits) {
          expect(unit.canonicalTextProvenance).toEqual(
            expect.objectContaining({
              researchId: candidate.researchId,
              researchVersion: candidate.researchVersion,
              authorityState: candidate.authorityState,
            }),
          );
        }
      } else {
        for (const unit of semanticUnits) {
          const sourceClaim = claimsById.get(unit.claimId);
          if (sourceClaim === undefined || !isRecord(sourceClaim.value)) {
            throw new Error('Missing claim-owned semantic payload for ' + unit.claimId);
          }
          expect(unit.canonicalText).toEqual({
            headline: sourceClaim.value.headline,
            summary: sourceClaim.value.summary,
          });
          expect(unit.canonicalTextProvenance).toBeUndefined();
        }
      }

      if (candidate.textAuthority === 'general_structural') {
        for (const unit of semanticUnits) {
          expect(unit.semanticQualifiers).toEqual([
            expect.objectContaining({
              qualifierId: 'preview_qualifier_r012_month_branch_priority_v1',
              provenance: expect.objectContaining({
                researchId: 'R012_MONTH_BRANCH_PRIORITY',
                researchVersion: '0.2.0-research',
                authorityState: 'VERIFIED_BOUNDED_DIRECT_VISUAL_CLOSURE_COMPLETE',
              }),
            }),
          ]);
        }
      }

      for (const unit of semanticUnits) {
        for (const boundary of candidate.prohibitedExtensions) {
          expect(unit.prohibitedExtensions).toContain(boundary);
        }
      }

      const plan = buildOfficialReadingPlanV1(semantics);
      expect(plan.sourceSemanticHash).toBe(semantics.semanticHash);
      for (const semanticGroup of candidate.expectedSemanticGroups) {
        expect(plan.sections.some((section) => section.semanticGroup === semanticGroup)).toBe(true);
      }
      const limits = plan.sections.find((section) => section.semanticGroup === 'limits');
      expect(limits).toBeDefined();
      for (const boundary of candidate.prohibitedExtensions) {
        expect(limits?.prohibitedExtensions).toContain(boundary);
      }

      expect(canRenderOfficialReadingV1(semantics, plan)).toBe(true);
      const report = renderOfficialReadingV1(semantics, plan);
      expect(report.sourceSemanticHash).toBe(semantics.semanticHash);
      const reportJson = JSON.stringify(report.sections);
      for (const unit of realizablePrimaryUnits) {
        const visibleMeaning = unit.canonicalText?.summary ?? unit.canonicalText?.headline;
        expect(visibleMeaning).toBeDefined();
        expect(reportJson).toContain(visibleMeaning);
      }
      for (const internalKey of candidate.prohibitedExtensions) {
        expect(reportJson).not.toContain(internalKey);
      }
      if (candidate.textAuthority === 'general_structural') {
        expect(reportJson).toContain('월지는 명식을 읽을 때 중요한 구조축으로 보되');
      }

      const reader = buildOfficialReadingCharacterGroundingV1({
        response: response(candidate.label),
        semanticBundle: semantics,
        officialReadingReport: report,
        engineVersion: 'cross-domain-official-reading-fidelity-v1',
      });
      expect(reader.grounding.units).toHaveLength(realizablePrimaryUnits.length);

      const actualAxes = new Set(reader.grounding.units.map((unit) => unit.axis));
      for (const axis of candidate.expectedAxes) {
        expect(actualAxes.has(axis as never)).toBe(true);
      }
      if (candidate.exactAxes) {
        expect(sorted([...actualAxes])).toEqual(sorted(candidate.expectedAxes));
      }
      if (candidate.requiresTension) {
        expect(reader.grounding.units.some((unit) => unit.narrativeRole === 'tension')).toBe(true);
      }

      for (const semanticUnit of semanticUnits) {
        const groundingUnit = reader.grounding.units.find((unit) =>
          unit.sourceCanonicalUnitRefs.includes(semanticUnit.unitId),
        );
        expect(groundingUnit).toBeDefined();
        for (const boundary of candidate.prohibitedExtensions) {
          expect(groundingUnit?.prohibitedExtensions).toContain(boundary);
        }
      }

      expect(reader.grounding.sourceSemanticHash).toBe(semantics.semanticHash);
      expect(reader.parity.semanticHash).toBe(semantics.semanticHash);
      expect(reader.parity.semanticHash).toBe(report.sourceSemanticHash);
      expect(reader.parity.officialReportHash).toBe(report.reportHash);
      expect(reader.parity.groundingHash).toBe(reader.grounding.groundingHash);
    },
  );
});
