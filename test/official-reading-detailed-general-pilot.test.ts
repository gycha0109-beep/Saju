import { describe, expect, it } from 'vitest';

import type {
  CanonicalSajuSnapshot,
  TenGodChartFact,
} from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import type { ReadingIntent } from '../src/contracts/reading.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import type { ResolvedRuleRegistrySnapshot } from '../src/interpretation/rule-registry.js';
import { buildPreviewSemanticQualifierBindingsV1 } from '../src/preview/preview-semantic-qualifier-projection.js';
import { buildPreviewSemanticTextBindingsV1 } from '../src/preview/preview-semantic-text-projection.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { createRelationshipNatalReadingCandidateRegistry } from '../src/research/relationship-natal-reading-candidate.js';
import {
  GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
  GENERAL_NATAL_USEFUL_READING_SOURCE,
  GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY,
  createGeneralNatalUsefulReadingCandidateRegistry,
} from '../src/research/general-natal-useful-reading-candidate.js';
import { buildCanonicalReadingSemanticBundleV1 } from '../src/reading/canonical-reading-semantics.js';
import {
  GENERAL_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
} from '../src/reading/official-reading-detailed-presentation-general.js';
import {
  assessApprovedOfficialReadingDetailedCoverageV1,
  buildApprovedOfficialReadingDetailedReadinessV1,
} from '../src/reading/official-reading-detailed-presentation-registry.js';
import {
  OFFICIAL_READING_DETAIL_CAPABILITY_V1,
} from '../src/reading/official-reading-detail-presentation.js';
import {
  OFFICIAL_READING_DETAILED_REALIZATION_POLICY_VERSION,
  OFFICIAL_READING_DETAILED_ROLE_ORDER_V1,
  buildApprovedOfficialReadingDetailedRealizationV1,
} from '../src/reading/official-reading-detailed-realization.js';
import {
  GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
  type GovernedReadingEvidenceBundleV1,
} from '../src/reading/governed-reading-evidence.js';
import { buildOfficialReadingPlanV1 } from '../src/reading/official-reading-plan.js';
import {
  renderApprovedDetailedOfficialReadingV1,
  renderOfficialReadingV1,
} from '../src/reading/official-reading-renderer.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-profile-authorization.js';

const NOW = '2026-10-06T05:00:00.000Z';

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
    { now: new Date(NOW) },
  );
  return {
    ...base,
    derivedFacts: {
      ...base.derivedFacts,
      tenGods: resolved(FIVE_FAMILY_TEN_GODS),
    },
  };
}

function semanticsFor(input: {
  label: string;
  intent: ReadingIntent;
  registry: ResolvedRuleRegistrySnapshot;
}) {
  const natalSnapshot = snapshot();
  const execution = runInterpretation(natalSnapshot, input.registry, {
    requestId: `detailed-pilot-${input.label}-interpretation`,
    now: new Date(NOW),
  });
  const composition = buildReadingCompositionEvidence(
    natalSnapshot,
    execution,
    input.registry,
    {
      requestId: `detailed-pilot-${input.label}-reading`,
      intent: input.intent,
    },
    {
      narrativePolicyVersion: 'official-reading-detailed-pilot-v1',
    },
  );

  expect(composition.selection.coverageState).toBe('complete');
  expect(composition.selection.profileAuthorization.state).toBe('authorized');
  if (composition.evidence === undefined) {
    throw new Error(`Expected governed reading evidence for ${input.label}`);
  }

  const semanticTextBindings = buildPreviewSemanticTextBindingsV1({
    intent: input.intent,
    registry: input.registry,
    evidence: composition.evidence.bundle,
    targetClaimIds: composition.selection.targetClaimIds,
  });
  const semanticQualifierBindings = buildPreviewSemanticQualifierBindingsV1({
    intent: input.intent,
    registry: input.registry,
    evidence: composition.evidence.bundle,
    targetClaimIds: composition.selection.targetClaimIds,
  });

  return buildCanonicalReadingSemanticBundleV1({
    intent: input.intent,
    evidence: composition.evidence.bundle,
    targetClaimIds: composition.selection.targetClaimIds,
    semanticTextBindings,
    semanticQualifierBindings,
  });
}

function syntheticEvidence(
  claims: readonly InterpretationClaim[],
): GovernedReadingEvidenceBundleV1 {
  return {
    requestId: 'detailed-pilot-synthetic',
    purpose: 'full_reading',
    snapshotId: 'snapshot-detailed-pilot-synthetic',
    interpretationRunId: 'interpretation-detailed-pilot-synthetic',
    registrySnapshotId: 'registry-detailed-pilot-synthetic',
    canonicalFacts: [],
    claims: [...claims],
    claimRelations: [],
    schemaVersion: GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
    constraints: {
      mayRecalculate: false,
      mayInventRules: false,
      mustPreserveMethodDifferences: true,
      mustDiscloseMaterialAmbiguity: true,
    },
  };
}

function syntheticBaselineClaim(summary: string): InterpretationClaim {
  return {
    claimId: 'general-baseline-wood',
    schemaVersion: 'detailed-pilot-synthetic',
    snapshotId: 'snapshot-detailed-pilot-synthetic',
    taxonomy: {
      tier: 'T8',
      category: 'general',
      subcategory: 'self_baseline',
    },
    claimType: 'GENERAL_NATAL_DAY_MASTER_BASELINE',
    subject: 'natal_chart',
    predicate: 'self_baseline',
    value: {
      element: '목',
      headline: '성장과 관계를 향하는 기본축',
      summary,
      consumerSection: 'self_baseline',
      wholePersonConclusionAuthorized: false,
    },
    methodologyRef: {
      id: GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY.methodologyId,
      version: GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY.version,
    },
    ruleRefs: [
      {
        ruleId: 'RULE-GENERAL-NATAL-T8-DAY-MASTER-목',
        version: '0.1.0-research',
        evaluationId: 'eval-general-baseline-wood',
      },
    ],
    factRefs: [],
    upstreamClaimRefs: [],
    sourceRefs: [GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId],
    state: 'active',
  };
}

function syntheticBaselineBundle(summary: string) {
  const claim = syntheticBaselineClaim(summary);
  return buildCanonicalReadingSemanticBundleV1({
    intent: { domain: 'general', temporalScope: 'natal' },
    evidence: syntheticEvidence([claim]),
    targetClaimIds: [claim.claimId],
  });
}

function syntheticUnsupportedDetailedBundle() {
  const base = syntheticBaselineClaim(
    '승인 상세 재료가 없는 유효한 합성 공식 의미입니다.',
  );
  const claim: InterpretationClaim = {
    ...base,
    claimId: 'general-unapproved-detailed-test',
    claimType: 'GENERAL_NATAL_UNAPPROVED_DETAILED_TEST',
    predicate: 'unapproved_detailed_test',
    ruleRefs: [
      {
        ruleId: 'RULE-GENERAL-NATAL-UNAPPROVED-DETAILED-TEST',
        version: '0.1.0-test',
        evaluationId: 'eval-general-unapproved-detailed-test',
      },
    ],
  };
  return buildCanonicalReadingSemanticBundleV1({
    intent: { domain: 'general', temporalScope: 'natal' },
    evidence: syntheticEvidence([claim]),
    targetClaimIds: [claim.claimId],
  });
}

function syntheticThemeClaim(
  upstreamClaimRefs: readonly string[],
): InterpretationClaim {
  return {
    claimId: 'general-peer-visible-stems',
    schemaVersion: 'detailed-pilot-synthetic',
    snapshotId: 'snapshot-detailed-pilot-synthetic',
    taxonomy: {
      tier: 'T8',
      category: 'general',
      subcategory: 'relationships_and_agency',
    },
    claimType: 'GENERAL_NATAL_PEER_VISIBLE_STEMS_THEME',
    subject: 'natal_chart',
    predicate: 'consumer_theme',
    value: {
      family: 'peer',
      channel: 'visible_stems',
      headline: '자기 기준과 사람 사이의 힘',
      summary:
        '비견·겁재 계열은 나와 같은 편의 힘, 자기 기준, 동료와의 병행 또는 경쟁이라는 주제를 보여주는 축으로 읽습니다.',
      consumerSection: 'relationships_and_agency',
      outcomeAuthorized: false,
      futureTimingAuthorized: false,
    },
    methodologyRef: {
      id: GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY.methodologyId,
      version: GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY.version,
    },
    ruleRefs: [
      {
        ruleId: 'RULE-GENERAL-NATAL-T8-PEER-VISIBLE_STEMS',
        version: '0.1.0-research',
        evaluationId: 'eval-general-peer-visible-stems',
      },
    ],
    factRefs: [],
    upstreamClaimRefs,
    sourceRefs: [GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId],
    state: 'active',
  };
}

function syntheticThemeSupportClaim(): InterpretationClaim {
  return {
    claimId: 'ten-god-peer-visible-stems',
    schemaVersion: 'detailed-pilot-synthetic',
    snapshotId: 'snapshot-detailed-pilot-synthetic',
    taxonomy: {
      tier: 'T5',
      category: 'ten_gods',
      subcategory: 'peer_visible_stems',
    },
    claimType: 'TEN_GOD_PEER_VISIBLE_STEMS_THEME',
    subject: 'natal_chart',
    predicate: 'ten_god_theme',
    value: {
      family: 'peer',
      channel: 'visible_stems',
      headline: '자기 기준과 사람 사이의 힘',
      summary:
        '비견·겁재 계열은 나와 같은 편의 힘, 자기 기준, 동료와의 병행 또는 경쟁이라는 주제를 보여주는 축으로 읽습니다.',
      consumerSection: 'relationships_and_agency',
      fortunePolarity: 'not_determined',
      dominance: 'not_scored',
    },
    methodologyRef: {
      id: GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.methodologyId,
      version: GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.version,
    },
    ruleRefs: [
      {
        ruleId: 'RULE-GENERAL-NATAL-T5-PEER-VISIBLE_STEMS',
        version: '0.1.0-research',
        evaluationId: 'eval-ten-god-peer-visible-stems',
      },
    ],
    factRefs: [],
    upstreamClaimRefs: [],
    sourceRefs: [GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId],
    state: 'active',
  };
}

function syntheticThemeBundle(withSupport: boolean) {
  const support = syntheticThemeSupportClaim();
  const primary = syntheticThemeClaim(withSupport ? [support.claimId] : []);
  return buildCanonicalReadingSemanticBundleV1({
    intent: { domain: 'general', temporalScope: 'natal' },
    evidence: syntheticEvidence([support, primary]),
    targetClaimIds: [primary.claimId],
  });
}

describe('Official Reading general natal detailed material pilot', () => {
  it('stores explicit approved source profiles for the general natal pilot', () => {
    expect(GENERAL_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1).toHaveLength(20);
    expect(
      GENERAL_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1.every(
        (profile) => profile.owner === 'general:natal',
      ),
    ).toBe(true);

    const materialCount =
      GENERAL_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1.reduce(
        (count, profile) =>
          count +
          Object.values(profile.approvedTextByRole).filter(
            (value) => typeof value === 'string' && value.trim().length > 0,
          ).length,
        0,
      );
    expect(materialCount).toBe(45);
  });

  it('marks the current general natal official reading fully ready without enabling detailed rendering', () => {
    const semantics = semanticsFor({
      label: 'general',
      intent: { domain: 'general', temporalScope: 'natal' },
      registry: createGeneralNatalUsefulReadingCandidateRegistry(NOW),
    });
    const plan = buildOfficialReadingPlanV1(semantics);
    const coverage = assessApprovedOfficialReadingDetailedCoverageV1(
      semantics,
      plan,
    );
    const readiness = buildApprovedOfficialReadingDetailedReadinessV1(
      semantics,
      plan,
    );
    const report = renderOfficialReadingV1(semantics, plan, {
      preferredDetail: 'detailed',
    });

    expect(coverage.state).toBe('ready');
    expect(coverage.domainKey).toBe('general:natal');
    expect(coverage.requiredMaterialCount).toBeGreaterThan(0);
    expect(coverage.approvedMaterialCount).toBe(
      coverage.requiredMaterialCount,
    );
    expect(coverage.missingTargetCount).toBe(0);
    expect(coverage.staleTargetCount).toBe(0);

    expect(readiness?.state).toBe('ready');
    expect(readiness?.bindings).toHaveLength(
      coverage.requiredMaterialCount,
    );
    expect(readiness?.missingTargets).toEqual([]);
    expect(readiness?.staleTargets).toEqual([]);

    expect(OFFICIAL_READING_DETAIL_CAPABILITY_V1.detailed).toEqual({
      materialState: 'conditional',
      productState: 'pre_activation',
      missingMaterialFallbackReason: 'missing_expansion_material',
      inactiveFallbackReason: 'detailed_not_activated',
    });
    expect(report.detailPreferenceResolution).toEqual({
      requestedDetail: 'detailed',
      resolvedDetail: 'standard',
      resolution: 'fallback_to_standard',
      fallbackReason: 'detailed_not_activated',
    });
  });

  it('classifies changed canonical wording as stale approved material', () => {
    const current = syntheticBaselineBundle(
      '전통 오행 성정에서 목은 인(仁), 성장·확장·배려의 방향과 연결됩니다. 이는 일간의 기본 바탕을 설명하는 한 축일 뿐 전체 성격을 단정하지 않습니다.',
    );
    const changed = syntheticBaselineBundle(
      '변경된 설명으로 기존 승인 상세 문구와 더 이상 같은 의미 상태가 아닙니다.',
    );

    const currentCoverage = assessApprovedOfficialReadingDetailedCoverageV1(
      current,
      buildOfficialReadingPlanV1(current),
    );
    const changedCoverage = assessApprovedOfficialReadingDetailedCoverageV1(
      changed,
      buildOfficialReadingPlanV1(changed),
    );

    expect(currentCoverage.state).toBe('ready');
    expect(currentCoverage.requiredMaterialCount).toBe(2);
    expect(changedCoverage.state).toBe('incomplete');
    expect(changedCoverage.approvedMaterialCount).toBe(0);
    expect(changedCoverage.missingTargetCount).toBe(0);
    expect(changedCoverage.staleTargetCount).toBe(2);
  });

  it('treats a required supporting-claim structure change as stale', () => {
    const current = syntheticThemeBundle(true);
    const changed = syntheticThemeBundle(false);

    const currentCoverage = assessApprovedOfficialReadingDetailedCoverageV1(
      current,
      buildOfficialReadingPlanV1(current),
    );
    const changedCoverage = assessApprovedOfficialReadingDetailedCoverageV1(
      changed,
      buildOfficialReadingPlanV1(changed),
    );

    expect(currentCoverage.state).toBe('ready');
    expect(currentCoverage.requiredMaterialCount).toBe(2);
    expect(changedCoverage.state).toBe('incomplete');
    expect(changedCoverage.missingTargetCount).toBe(0);
    expect(changedCoverage.staleTargetCount).toBe(2);
  });

  it('keeps spouse relationship readings outside detailed authority', () => {
    const generalRelationship = semanticsFor({
      label: 'relationship-general-authority-boundary',
      intent: {
        domain: 'relationship',
        temporalScope: 'natal',
        relationshipScope: 'general',
      },
      registry: createRelationshipNatalReadingCandidateRegistry(NOW),
    });
    const spouseLike = {
      ...generalRelationship,
      intent: {
        domain: 'relationship' as const,
        temporalScope: 'natal' as const,
        relationshipScope: 'spouse' as const,
      },
    };
    const plan = buildOfficialReadingPlanV1(generalRelationship);
    const coverage = assessApprovedOfficialReadingDetailedCoverageV1(
      spouseLike,
      plan,
    );

    expect(coverage.domainKey).toBeUndefined();
    expect(coverage.state).toBe('unsupported_domain');
    expect(coverage.approvedMaterialCount).toBe(0);
    expect(coverage.requiredMaterialCount).toBeGreaterThan(0);
    expect(coverage.missingTargetCount).toBe(
      coverage.requiredMaterialCount,
    );
    expect(coverage.staleTargetCount).toBe(0);
  });
});


describe('Official Reading detailed renderer connection', () => {
  function generalFixture() {
    const semantics = semanticsFor({
      label: 'general-renderer-connection',
      intent: { domain: 'general', temporalScope: 'natal' },
      registry: createGeneralNatalUsefulReadingCandidateRegistry(NOW),
    });
    return {
      semantics,
      plan: buildOfficialReadingPlanV1(semantics),
    };
  }

  function insightItems(
    report: ReturnType<typeof renderOfficialReadingV1>,
  ) {
    return report.sections.flatMap((section) =>
      section.blocks.flatMap((block) =>
        block.type === 'insights' ? [...block.items] : [],
      ),
    );
  }

  function sourceHintCount(
    report: ReturnType<typeof renderOfficialReadingV1>,
  ): number {
    return report.sections.reduce(
      (count, section) =>
        count +
        section.blocks.filter((block) => block.type === 'source_hint').length,
      0,
    );
  }

  it('realizes every visible primary unit in canonical plan order with deterministic role order', () => {
    const { semantics, plan } = generalFixture();
    const realization = buildApprovedOfficialReadingDetailedRealizationV1(
      semantics,
      plan,
    );
    expect(realization).toBeDefined();
    expect(realization?.policyVersion).toBe(
      OFFICIAL_READING_DETAILED_REALIZATION_POLICY_VERSION,
    );

    const visibleUnitIds: string[] = [];
    const seen = new Set<string>();
    for (const section of plan.sections) {
      if (
        section.semanticGroup === 'evidence' ||
        section.semanticGroup === 'limits'
      ) {
        continue;
      }
      for (const unitId of section.primaryUnitRefs) {
        if (seen.has(unitId)) continue;
        seen.add(unitId);
        visibleUnitIds.push(unitId);
      }
    }

    expect(realization?.units.map((unit) => unit.unitId)).toEqual(
      visibleUnitIds,
    );

    const order = new Map(
      OFFICIAL_READING_DETAILED_ROLE_ORDER_V1.map((role, index) => [
        role,
        index,
      ]),
    );
    for (const unit of realization?.units ?? []) {
      const roleIndexes = unit.roleTexts.map((item) => order.get(item.role));
      expect(roleIndexes.every((index) => index !== undefined)).toBe(true);
      expect(roleIndexes).toEqual(
        [...roleIndexes].sort(
          (left, right) => (left ?? -1) - (right ?? -1),
        ),
      );
      expect(
        unit.summarySuffixes.length + unit.qualifierSuffixes.length,
      ).toBe(unit.roleTexts.length);
    }
  });

  it('renders approved detail as a strict semantic-preserving expansion of standard output', () => {
    const { semantics, plan } = generalFixture();
    const standard = renderOfficialReadingV1(semantics, plan);
    const detailed = renderApprovedDetailedOfficialReadingV1(
      semantics,
      plan,
    );

    expect(detailed.detailPreferenceResolution).toEqual({
      requestedDetail: 'detailed',
      resolvedDetail: 'detailed',
      resolution: 'exact',
    });
    expect(detailed.detailedRealizationPolicyVersion).toBe(
      OFFICIAL_READING_DETAILED_REALIZATION_POLICY_VERSION,
    );
    expect(
      detailed.sections.map((section) => ({
        sectionId: section.sectionId,
        sectionType: section.sectionType,
        title: section.title,
        state: section.state,
        explainabilityRefs: section.explainabilityRefs,
        blockTypes: section.blocks.map((block) => block.type),
      })),
    ).toEqual(
      standard.sections.map((section) => ({
        sectionId: section.sectionId,
        sectionType: section.sectionType,
        title: section.title,
        state: section.state,
        explainabilityRefs: section.explainabilityRefs,
        blockTypes: section.blocks.map((block) => block.type),
      })),
    );
    expect(detailed.explainability).toEqual(standard.explainability);

    const standardItems = insightItems(standard);
    const detailedItems = insightItems(detailed);
    expect(detailedItems.map((item) => item.explainabilityRef)).toEqual(
      standardItems.map((item) => item.explainabilityRef),
    );
    expect(detailedItems).toHaveLength(standardItems.length);

    let expansionObserved = false;
    for (let index = 0; index < standardItems.length; index += 1) {
      const standardItem = standardItems[index];
      const detailedItem = detailedItems[index];
      expect(detailedItem?.headline).toBe(standardItem?.headline);
      if (standardItem?.summary !== undefined) {
        expect(detailedItem?.summary?.startsWith(standardItem.summary)).toBe(
          true,
        );
      }
      for (const qualifier of standardItem?.qualifiers ?? []) {
        expect(detailedItem?.qualifiers).toContain(qualifier);
      }
      if (
        detailedItem?.summary !== standardItem?.summary ||
        (detailedItem?.qualifiers?.length ?? 0) >
          (standardItem?.qualifiers?.length ?? 0)
      ) {
        expansionObserved = true;
      }
    }
    expect(expansionObserved).toBe(true);

    const standardLimits = standard.sections.find(
      (section) => section.title === '해석 범위',
    );
    const detailedLimits = detailed.sections.find(
      (section) => section.title === '해석 범위',
    );
    expect(detailedLimits?.blocks).toEqual(standardLimits?.blocks);
  });

  it('keeps the public detailed preference on standard fallback even when internal detailed material is ready', () => {
    const { semantics, plan } = generalFixture();
    const standard = renderOfficialReadingV1(semantics, plan);
    const publicDetailedRequest = renderOfficialReadingV1(
      semantics,
      plan,
      { preferredDetail: 'detailed' },
    );

    expect(publicDetailedRequest.sections).toEqual(standard.sections);
    expect(publicDetailedRequest.detailPreferenceResolution).toEqual({
      requestedDetail: 'detailed',
      resolvedDetail: 'standard',
      resolution: 'fallback_to_standard',
      fallbackReason: 'detailed_not_activated',
    });
    expect(
      publicDetailedRequest.detailedRealizationPolicyVersion,
    ).toBeUndefined();
  });

  it('fails closed instead of partially rendering a valid unit without approved detailed material', () => {
    const semantics = syntheticUnsupportedDetailedBundle();
    const plan = buildOfficialReadingPlanV1(semantics);
    const coverage = assessApprovedOfficialReadingDetailedCoverageV1(
      semantics,
      plan,
    );

    expect(coverage.state).toBe('incomplete');
    expect(coverage.missingTargetCount).toBeGreaterThan(0);
    expect(
      buildApprovedOfficialReadingDetailedRealizationV1(semantics, plan),
    ).toBeUndefined();
    expect(() =>
      renderApprovedDetailedOfficialReadingV1(semantics, plan),
    ).toThrow(/requires complete current detailed material/iu);
  });

  it('keeps source summaries independent from detailed realization and exposes no registry diagnostics', () => {
    const { semantics, plan } = generalFixture();
    const withoutSummaries = renderApprovedDetailedOfficialReadingV1(
      semantics,
      plan,
    );
    expect(sourceHintCount(withoutSummaries)).toBe(0);

    const sourceIds = [
      ...new Set(
        withoutSummaries.explainability.entries.flatMap(
          (entry) => entry.sourceIds,
        ),
      ),
    ];
    const withSummaries = renderApprovedDetailedOfficialReadingV1(
      semantics,
      plan,
      {
        sourceSummaries: sourceIds.map((sourceId, index) => ({
          sourceId,
          title: `승인 출처 ${index + 1}`,
          summary: `승인된 출처 요약 ${index + 1}`,
        })),
      },
    );
    expect(sourceHintCount(withSummaries)).toBeGreaterThan(0);

    const serialized = JSON.stringify(withoutSummaries);
    expect(serialized).not.toContain('missingTargets');
    expect(serialized).not.toContain('staleTargets');
    expect(serialized).not.toContain('materialId');
    expect(serialized).not.toContain('profileId');
    expect(serialized).not.toContain('authorityId');

    const repeated = renderApprovedDetailedOfficialReadingV1(
      semantics,
      plan,
    );
    expect(repeated.reportHash).toBe(withoutSummaries.reportHash);
    expect(repeated.sections).toEqual(withoutSummaries.sections);
  });
});
