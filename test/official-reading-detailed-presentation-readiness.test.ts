import { describe, expect, it } from 'vitest';

import type {
  ClaimRelation,
  InterpretationClaim,
} from '../src/contracts/interpretation.js';
import type { ReadingIntent } from '../src/contracts/reading.js';
import {
  buildCanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticQualifierBindingV1,
  type CanonicalReadingSemanticUnitV1,
} from '../src/reading/canonical-reading-semantics.js';
import {
  OFFICIAL_READING_DETAILED_MATERIAL_SCHEMA_VERSION,
  type ApprovedOfficialReadingDetailedMaterialDefinitionV1,
  type OfficialReadingDetailedMaterialRoleV1,
} from '../src/reading/official-reading-detailed-presentation-definition.js';
import {
  assessOfficialReadingDetailedPresentationReadinessV1,
  buildOfficialReadingDetailedMaterialIndexV1,
  officialReadingDetailedMaterialBaselineV1,
  requiredOfficialReadingDetailedMaterialRolesV1,
} from '../src/reading/official-reading-detailed-presentation.js';
import {
  APPROVED_OFFICIAL_READING_DETAILED_MATERIALS_V1,
  OFFICIAL_READING_DETAILED_SUPPORTED_DOMAIN_KEYS_V1,
  assessApprovedOfficialReadingDetailedCoverageV1,
} from '../src/reading/official-reading-detailed-presentation-registry.js';
import {
  OFFICIAL_READING_DETAIL_CAPABILITY_V1,
  resolveOfficialReadingDetailPreferenceV1,
} from '../src/reading/official-reading-detail-presentation.js';
import {
  GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
  type GovernedReadingEvidenceBundleV1,
} from '../src/reading/governed-reading-evidence.js';
import { buildOfficialReadingPlanV1 } from '../src/reading/official-reading-plan.js';
import { renderOfficialReadingV1 } from '../src/reading/official-reading-renderer.js';

function primaryClaim(input: {
  claimId: string;
  headline: string;
  summary: string;
  predicate?: string;
  scenarioRef?: string;
  futureTimingAuthorized?: boolean;
  numericScoringAuthorized?: boolean;
}): InterpretationClaim {
  return {
    claimId: input.claimId,
    schemaVersion: 'detailed-readiness-test',
    snapshotId: 'snapshot-detailed-readiness',
    ...(input.scenarioRef === undefined
      ? {}
      : { scenarioRef: input.scenarioRef }),
    taxonomy: {
      tier: 'T8',
      category: 'general',
      subcategory: 'strength_conclusion',
    },
    claimType: 'GENERAL_DETAILED_READINESS',
    subject: 'natal_chart',
    predicate: input.predicate ?? 'consumer_conclusion',
    value: {
      headline: input.headline,
      summary: input.summary,
      ...(input.futureTimingAuthorized === undefined
        ? {}
        : { futureTimingAuthorized: input.futureTimingAuthorized }),
      ...(input.numericScoringAuthorized === undefined
        ? {}
        : { numericScoringAuthorized: input.numericScoringAuthorized }),
    },
    methodologyRef: {
      id: 'method-detailed-readiness',
      version: '1',
    },
    ruleRefs: [
      {
        ruleId: `rule-${input.claimId}`,
        version: '1',
        evaluationId: `eval-${input.claimId}`,
      },
    ],
    factRefs: [],
    upstreamClaimRefs: [],
    sourceRefs: ['source-detailed-readiness'],
    state: 'active',
  };
}

function qualifier(
  targetClaimId: string,
  input: {
    qualifierId: string;
    kind?: 'condition' | 'qualifier' | 'tension' | 'boundary';
    summary: string;
  },
): CanonicalReadingSemanticQualifierBindingV1 {
  return {
    targetClaimId,
    qualifier: {
      qualifierId: input.qualifierId,
      kind: input.kind ?? 'condition',
      semanticScope: 'detailed-readiness-test',
      semanticKeys: ['detailed.readiness.test'],
      canonicalText: { summary: input.summary },
      prohibitedExtensions: [],
      provenance: {
        admissionId: 'admission-detailed-readiness',
        admissionRegistryVersion: '1',
        researchId: 'research-detailed-readiness',
        researchVersion: '1',
        authorityState: 'admitted',
      },
    },
  };
}

function bundle(input: {
  claims: readonly InterpretationClaim[];
  qualifiers?: readonly CanonicalReadingSemanticQualifierBindingV1[];
  relations?: readonly ClaimRelation[];
  intent?: ReadingIntent;
}) {
  const evidence: GovernedReadingEvidenceBundleV1 = {
    requestId: 'request-detailed-readiness',
    purpose: 'full_reading',
    snapshotId: 'snapshot-detailed-readiness',
    interpretationRunId: 'interpretation-detailed-readiness',
    registrySnapshotId: 'registry-detailed-readiness',
    canonicalFacts: [],
    claims: [...input.claims],
    claimRelations: [...(input.relations ?? [])],
    schemaVersion: GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
    constraints: {
      mayRecalculate: false,
      mayInventRules: false,
      mustPreserveMethodDifferences: true,
      mustDiscloseMaterialAmbiguity: true,
    },
  };
  return buildCanonicalReadingSemanticBundleV1({
    intent: input.intent ?? { domain: 'general', temporalScope: 'natal' },
    evidence,
    targetClaimIds: input.claims.map((claim) => claim.claimId),
    ...(input.qualifiers === undefined
      ? {}
      : { semanticQualifierBindings: input.qualifiers }),
  });
}

function primaryUnit(
  semanticBundle: ReturnType<typeof bundle>,
  claimId: string,
): CanonicalReadingSemanticUnitV1 {
  const unit = semanticBundle.units.find(
    (candidate) => candidate.claimId === claimId,
  );
  if (unit === undefined) throw new Error('fixture primary unit must exist');
  return unit;
}

function materialFor(
  semanticBundle: ReturnType<typeof bundle>,
  claimId: string,
  role: OfficialReadingDetailedMaterialRoleV1,
  input: { materialId?: string } = {},
): ApprovedOfficialReadingDetailedMaterialDefinitionV1 {
  const plan = buildOfficialReadingPlanV1(semanticBundle);
  const unit = primaryUnit(semanticBundle, claimId);
  if (unit.canonicalText === undefined) {
    throw new Error('fixture canonical text must exist');
  }
  return {
    schemaVersion: OFFICIAL_READING_DETAILED_MATERIAL_SCHEMA_VERSION,
    owner: 'general:natal',
    materialId: input.materialId ?? `detailed-${claimId}-${role}`,
    materialVersion: '1',
    semanticKey: unit.semanticKey,
    claimType: unit.claimType,
    methodologyRef: unit.methodologyRef,
    ...(unit.scenarioRef === undefined
      ? {}
      : { scenarioRef: unit.scenarioRef }),
    role,
    approvedText: `${claimId} ${role} 승인 설명`,
    standardText: unit.canonicalText,
    baseline: officialReadingDetailedMaterialBaselineV1(
      semanticBundle,
      plan,
      unit,
    ),
    provenance: {
      authorityId: 'authority-detailed-readiness',
      authorityVersion: '1',
      sourceRefs: ['source-detailed-readiness'],
    },
    prohibitedExtensions: unit.prohibitedExtensions,
  };
}

describe('Official Reading detailed material readiness foundation', () => {
  it('keeps the production detailed registry empty and bounded to the five approved natal surfaces', () => {
    expect(OFFICIAL_READING_DETAILED_SUPPORTED_DOMAIN_KEYS_V1).toEqual([
      'general:natal',
      'career:natal',
      'wealth:natal',
      'relationship:natal:general',
      'business:natal',
    ]);
    expect(OFFICIAL_READING_DETAILED_SUPPORTED_DOMAIN_KEYS_V1).not.toContain(
      'relationship:natal:spouse',
    );
    expect(APPROVED_OFFICIAL_READING_DETAILED_MATERIALS_V1).toEqual([]);
  });

  it('validates material identity and target uniqueness', () => {
    const semanticBundle = bundle({
      claims: [
        primaryClaim({
          claimId: 'base',
          headline: '기본 제목',
          summary: '기본 본문',
        }),
      ],
    });
    const material = materialFor(semanticBundle, 'base', 'clarification');

    expect(() =>
      buildOfficialReadingDetailedMaterialIndexV1([
        material,
        { ...material, role: 'rationale' },
      ]),
    ).toThrow(/duplicate.*material identity/iu);

    expect(() =>
      buildOfficialReadingDetailedMaterialIndexV1([
        material,
        { ...material, materialId: 'different-material-id' },
      ]),
    ).toThrow(/duplicate.*material target/iu);

    expect(() =>
      buildOfficialReadingDetailedMaterialIndexV1([
        { ...material, approvedText: '   ' },
      ]),
    ).toThrow(/approvedText/u);

    expect(() =>
      buildOfficialReadingDetailedMaterialIndexV1([
        {
          ...material,
          baseline: {
            ...material.baseline,
            canonicalMeaningHash: 'invalid',
          },
        },
      ]),
    ).toThrow(/canonicalMeaningHash/u);
  });

  it('reports ready only when every required current material exists', () => {
    const semanticBundle = bundle({
      claims: [
        primaryClaim({
          claimId: 'base',
          headline: '기본 제목',
          summary: '기본 본문',
        }),
      ],
    });
    const plan = buildOfficialReadingPlanV1(semanticBundle);
    const unit = primaryUnit(semanticBundle, 'base');

    expect(
      requiredOfficialReadingDetailedMaterialRolesV1(
        semanticBundle,
        plan,
        unit,
      ),
    ).toEqual(['clarification']);

    const complete = assessOfficialReadingDetailedPresentationReadinessV1(
      'general:natal',
      semanticBundle,
      plan,
      [materialFor(semanticBundle, 'base', 'clarification')],
    );
    expect(complete.state).toBe('ready');
    expect(complete.bindings).toHaveLength(1);
    expect(complete.missingTargets).toEqual([]);
    expect(complete.staleTargets).toEqual([]);

    const missing = assessOfficialReadingDetailedPresentationReadinessV1(
      'general:natal',
      semanticBundle,
      plan,
      [],
    );
    expect(missing.state).toBe('fallback_to_standard');
    expect(missing.bindings).toEqual([]);
    expect(missing.missingTargets).toHaveLength(1);
    expect(missing.staleTargets).toEqual([]);
  });

  it('distinguishes stale material from missing material when the canonical meaning changes', () => {
    const previous = bundle({
      claims: [
        primaryClaim({
          claimId: 'base',
          headline: '기본 제목',
          summary: '이전 본문',
        }),
      ],
    });
    const current = bundle({
      claims: [
        primaryClaim({
          claimId: 'base',
          headline: '기본 제목',
          summary: '현재 본문',
        }),
      ],
    });
    const stale = assessOfficialReadingDetailedPresentationReadinessV1(
      'general:natal',
      current,
      buildOfficialReadingPlanV1(current),
      [materialFor(previous, 'base', 'clarification')],
    );

    expect(stale.state).toBe('fallback_to_standard');
    expect(stale.missingTargets).toEqual([]);
    expect(stale.staleTargets).toHaveLength(1);
    expect(stale.staleTargets[0]?.role).toBe('clarification');
  });

  it('requires governed condition and boundary material only when the canonical unit needs them', () => {
    const semanticBundle = bundle({
      claims: [
        primaryClaim({
          claimId: 'base',
          headline: '조건 제목',
          summary: '조건 본문',
          futureTimingAuthorized: false,
        }),
      ],
      qualifiers: [
        qualifier('base', {
          qualifierId: 'condition-a',
          kind: 'condition',
          summary: '조건 A',
        }),
      ],
    });
    const plan = buildOfficialReadingPlanV1(semanticBundle);
    const unit = primaryUnit(semanticBundle, 'base');

    expect(
      requiredOfficialReadingDetailedMaterialRolesV1(
        semanticBundle,
        plan,
        unit,
      ),
    ).toEqual(['clarification', 'condition', 'boundary']);

    const readiness = assessOfficialReadingDetailedPresentationReadinessV1(
      'general:natal',
      semanticBundle,
      plan,
      [
        materialFor(semanticBundle, 'base', 'clarification'),
        materialFor(semanticBundle, 'base', 'condition'),
      ],
    );
    expect(readiness.state).toBe('fallback_to_standard');
    expect(readiness.missingTargets.map((target) => target.role)).toEqual([
      'boundary',
    ]);
  });

  it('makes qualifier and limitation changes stale while ignoring input ordering noise', () => {
    const base = bundle({
      claims: [
        primaryClaim({
          claimId: 'base',
          headline: '기본 제목',
          summary: '기본 본문',
          futureTimingAuthorized: false,
        }),
      ],
      qualifiers: [
        qualifier('base', {
          qualifierId: 'condition-a',
          summary: '조건 A',
        }),
        qualifier('base', {
          qualifierId: 'condition-b',
          summary: '조건 B',
        }),
      ],
    });
    const reordered = bundle({
      claims: [
        primaryClaim({
          claimId: 'base',
          headline: '기본 제목',
          summary: '기본 본문',
          futureTimingAuthorized: false,
        }),
      ],
      qualifiers: [
        qualifier('base', {
          qualifierId: 'condition-b',
          summary: '조건 B',
        }),
        qualifier('base', {
          qualifierId: 'condition-a',
          summary: '조건 A',
        }),
      ],
    });
    const changedQualifier = bundle({
      claims: [
        primaryClaim({
          claimId: 'base',
          headline: '기본 제목',
          summary: '기본 본문',
          futureTimingAuthorized: false,
        }),
      ],
      qualifiers: [
        qualifier('base', {
          qualifierId: 'condition-a',
          summary: '변경된 조건 A',
        }),
        qualifier('base', {
          qualifierId: 'condition-b',
          summary: '조건 B',
        }),
      ],
    });
    const changedLimit = bundle({
      claims: [
        primaryClaim({
          claimId: 'base',
          headline: '기본 제목',
          summary: '기본 본문',
          numericScoringAuthorized: false,
        }),
      ],
      qualifiers: [
        qualifier('base', {
          qualifierId: 'condition-a',
          summary: '조건 A',
        }),
        qualifier('base', {
          qualifierId: 'condition-b',
          summary: '조건 B',
        }),
      ],
    });

    const baseBaseline = officialReadingDetailedMaterialBaselineV1(
      base,
      buildOfficialReadingPlanV1(base),
      primaryUnit(base, 'base'),
    );
    const reorderedBaseline = officialReadingDetailedMaterialBaselineV1(
      reordered,
      buildOfficialReadingPlanV1(reordered),
      primaryUnit(reordered, 'base'),
    );
    const qualifierBaseline = officialReadingDetailedMaterialBaselineV1(
      changedQualifier,
      buildOfficialReadingPlanV1(changedQualifier),
      primaryUnit(changedQualifier, 'base'),
    );
    const limitBaseline = officialReadingDetailedMaterialBaselineV1(
      changedLimit,
      buildOfficialReadingPlanV1(changedLimit),
      primaryUnit(changedLimit, 'base'),
    );

    expect(reorderedBaseline).toEqual(baseBaseline);
    expect(qualifierBaseline.qualifierStateHash).not.toBe(
      baseBaseline.qualifierStateHash,
    );
    expect(limitBaseline.limitationStateHash).not.toBe(
      baseBaseline.limitationStateHash,
    );
  });

  it('includes scenario and contradiction structure in currentness and requires their explanation roles', () => {
    const singleScenario = bundle({
      claims: [
        primaryClaim({
          claimId: 'first',
          scenarioRef: 'scenario-a',
          headline: '첫 번째',
          summary: '첫 번째 본문',
        }),
      ],
    });
    const twoScenarios = bundle({
      claims: [
        primaryClaim({
          claimId: 'first',
          scenarioRef: 'scenario-a',
          headline: '첫 번째',
          summary: '첫 번째 본문',
        }),
        primaryClaim({
          claimId: 'second',
          scenarioRef: 'scenario-b',
          headline: '두 번째',
          summary: '두 번째 본문',
        }),
      ],
    });
    const noConflict = bundle({
      claims: [
        primaryClaim({
          claimId: 'first',
          headline: '첫 번째',
          summary: '첫 번째 본문',
          predicate: 'first_view',
        }),
        primaryClaim({
          claimId: 'second',
          headline: '두 번째',
          summary: '두 번째 본문',
          predicate: 'second_view',
        }),
      ],
    });
    const withConflict = bundle({
      claims: [
        primaryClaim({
          claimId: 'first',
          headline: '첫 번째',
          summary: '첫 번째 본문',
          predicate: 'first_view',
        }),
        primaryClaim({
          claimId: 'second',
          headline: '두 번째',
          summary: '두 번째 본문',
          predicate: 'second_view',
        }),
      ],
      relations: [
        {
          relationId: 'relation-conflict',
          fromClaimId: 'first',
          toClaimId: 'second',
          relation: 'contradicts',
          reason: '두 관점을 함께 보존',
        },
      ],
    });

    const singlePlan = buildOfficialReadingPlanV1(singleScenario);
    const twoPlan = buildOfficialReadingPlanV1(twoScenarios);
    const singleBaseline = officialReadingDetailedMaterialBaselineV1(
      singleScenario,
      singlePlan,
      primaryUnit(singleScenario, 'first'),
    );
    const twoBaseline = officialReadingDetailedMaterialBaselineV1(
      twoScenarios,
      twoPlan,
      primaryUnit(twoScenarios, 'first'),
    );
    expect(twoBaseline.structuralContextHash).not.toBe(
      singleBaseline.structuralContextHash,
    );
    expect(
      requiredOfficialReadingDetailedMaterialRolesV1(
        twoScenarios,
        twoPlan,
        primaryUnit(twoScenarios, 'first'),
      ),
    ).toContain('scenario_note');

    const noConflictBaseline = officialReadingDetailedMaterialBaselineV1(
      noConflict,
      buildOfficialReadingPlanV1(noConflict),
      primaryUnit(noConflict, 'first'),
    );
    const conflictPlan = buildOfficialReadingPlanV1(withConflict);
    const conflictBaseline = officialReadingDetailedMaterialBaselineV1(
      withConflict,
      conflictPlan,
      primaryUnit(withConflict, 'first'),
    );
    expect(conflictBaseline.structuralContextHash).not.toBe(
      noConflictBaseline.structuralContextHash,
    );
    expect(
      requiredOfficialReadingDetailedMaterialRolesV1(
        withConflict,
        conflictPlan,
        primaryUnit(withConflict, 'first'),
      ),
    ).toContain('tension_note');
  });

  it('does not grant detailed authority to unsupported reading intents', () => {
    const unsupported = bundle({
      intent: {
        domain: 'family',
        temporalScope: 'natal',
        relationshipScope: 'parents',
      },
      claims: [
        primaryClaim({
          claimId: 'base',
          headline: '가족 제목',
          summary: '가족 본문',
        }),
      ],
    });
    const coverage = assessApprovedOfficialReadingDetailedCoverageV1(
      unsupported,
      buildOfficialReadingPlanV1(unsupported),
    );
    expect(coverage.state).toBe('unsupported_domain');
    expect(coverage.domainKey).toBeUndefined();
    expect(coverage.approvedMaterialCount).toBe(0);
    expect(coverage.missingTargetCount).toBeGreaterThan(0);
  });

  it('keeps detailed runtime on whole-result standard fallback and does not expose registry diagnostics', () => {
    const semanticBundle = bundle({
      claims: [
        primaryClaim({
          claimId: 'base',
          headline: '기본 제목',
          summary: '기본 본문',
        }),
      ],
    });
    const plan = buildOfficialReadingPlanV1(semanticBundle);
    const coverage = assessApprovedOfficialReadingDetailedCoverageV1(
      semanticBundle,
      plan,
    );
    const rendered = renderOfficialReadingV1(semanticBundle, plan, {
      preferredDetail: 'detailed',
    });

    expect(coverage.state).toBe('incomplete');
    expect(OFFICIAL_READING_DETAIL_CAPABILITY_V1.detailed).toEqual({
      state: 'fallback_only',
      fallbackReason: 'missing_expansion_material',
    });
    expect(resolveOfficialReadingDetailPreferenceV1('detailed')).toEqual({
      requestedDetail: 'detailed',
      resolvedDetail: 'standard',
      resolution: 'fallback_to_standard',
      fallbackReason: 'missing_expansion_material',
    });
    expect(rendered.detailPreferenceResolution).toEqual({
      requestedDetail: 'detailed',
      resolvedDetail: 'standard',
      resolution: 'fallback_to_standard',
      fallbackReason: 'missing_expansion_material',
    });
    const serialized = JSON.stringify(rendered);
    expect(serialized).not.toContain('missingTargets');
    expect(serialized).not.toContain('staleTargets');
    expect(serialized).not.toContain(
      'myeonghwa-official-reading-approved-detailed-registry-v1',
    );
  });
});
