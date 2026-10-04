import { describe, expect, it } from 'vitest';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import {
  GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
  type GovernedReadingEvidenceBundleV1,
} from '../src/reading/governed-reading-evidence.js';
import { buildCanonicalReadingSemanticBundleV1 } from '../src/reading/canonical-reading-semantics.js';
import { buildOfficialReadingPlanV1 } from '../src/reading/official-reading-plan.js';
import {
  OFFICIAL_READING_STRUCTURAL_REALIZATION_POLICY_VERSION,
  canRenderOfficialReadingV1,
  renderOfficialReadingV1,
} from '../src/reading/official-reading-renderer.js';

function evidence(summary = '현실 결과를 빨리 만들려는 축과 더 배우고 검토하려는 축이 서로 견제합니다.'): GovernedReadingEvidenceBundleV1 {
  const support: InterpretationClaim = {
    claimId: 'support-resource',
    schemaVersion: 'renderer-test',
    snapshotId: 'snapshot-1',
    taxonomy: { tier: 'T5', category: 'ten_gods', subcategory: 'family_presence' },
    claimType: 'TEN_GOD_FAMILY_RESOURCE_PRESENT',
    subject: 'natal_chart',
    predicate: 'ten_god_family_presence',
    value: { family: 'resource', presence: 'observed', dominance: 'not_scored' },
    methodologyRef: { id: 'method-family', version: '1' },
    ruleRefs: [{ ruleId: 'rule-family', version: '1', evaluationId: 'eval-family' }],
    factRefs: ['derivedFacts.tenGods'],
    upstreamClaimRefs: [],
    sourceRefs: ['source-1'],
    state: 'active',
  };
  const primary: InterpretationClaim = {
    claimId: 'primary-tension',
    schemaVersion: 'renderer-test',
    snapshotId: 'snapshot-1',
    taxonomy: { tier: 'T8', category: 'general', subcategory: 'tension_conclusion' },
    claimType: 'GENERAL_NATAL_CONCLUSION_WEALTH_RESOURCE_TENSION',
    subject: 'natal_chart',
    predicate: 'consumer_conclusion',
    value: {
      conclusionKind: 'tension',
      headline: '실행 속도와 충분한 준비 사이의 긴장',
      summary,
      futureTimingAuthorized: false,
      numericScoringAuthorized: false,
    },
    methodologyRef: { id: 'method-general', version: '1' },
    ruleRefs: [{ ruleId: 'rule-general', version: '1', evaluationId: 'eval-general' }],
    factRefs: [],
    upstreamClaimRefs: ['support-resource'],
    sourceRefs: ['source-1'],
    state: 'active',
  };
  return {
    requestId: 'request-1',
    purpose: 'full_reading',
    snapshotId: 'snapshot-1',
    interpretationRunId: 'interpretation-1',
    registrySnapshotId: 'registry-1',
    canonicalFacts: [],
    claims: [primary, support],
    claimRelations: [
      {
        relationId: 'relation-1',
        fromClaimId: 'primary-tension',
        toClaimId: 'support-resource',
        relation: 'derived_from',
      },
    ],
    schemaVersion: GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
    constraints: {
      mayRecalculate: false,
      mayInventRules: false,
      mustPreserveMethodDifferences: true,
      mustDiscloseMaterialAmbiguity: true,
    },
  };
}

function semantics() {
  return buildCanonicalReadingSemanticBundleV1({
    intent: { domain: 'general', temporalScope: 'natal' },
    evidence: evidence(),
    targetClaimIds: ['primary-tension'],
  });
}

function structuredPrimary(input: {
  claimId: string;
  headline: string;
  summary: string;
  scenarioRef?: string;
  subcategory?: string;
  claimType?: string;
}): InterpretationClaim {
  return {
    claimId: input.claimId,
    schemaVersion: 'renderer-structure-test',
    snapshotId: 'snapshot-1',
    ...(input.scenarioRef === undefined ? {} : { scenarioRef: input.scenarioRef }),
    taxonomy: {
      tier: 'T8',
      category: 'general',
      subcategory: input.subcategory ?? 'strength_conclusion',
    },
    claimType: input.claimType ?? 'GENERAL_STRENGTH_CONCLUSION',
    subject: 'natal_chart',
    predicate: 'consumer_conclusion',
    value: {
      conclusionKind: 'strength',
      headline: input.headline,
      summary: input.summary,
      futureTimingAuthorized: false,
    },
    methodologyRef: { id: 'method-general', version: '1' },
    ruleRefs: [
      {
        ruleId: `rule-${input.claimId}`,
        version: '1',
        evaluationId: `eval-${input.claimId}`,
      },
    ],
    factRefs: [],
    upstreamClaimRefs: [],
    sourceRefs: ['source-structure'],
    state: 'active',
  };
}

function structuredSemantics(
  claims: readonly InterpretationClaim[],
  claimRelations: GovernedReadingEvidenceBundleV1['claimRelations'] = [],
) {
  const evidenceBundle: GovernedReadingEvidenceBundleV1 = {
    requestId: 'request-structure',
    purpose: 'full_reading',
    snapshotId: 'snapshot-1',
    interpretationRunId: 'interpretation-structure',
    registrySnapshotId: 'registry-1',
    canonicalFacts: [],
    claims: [...claims],
    claimRelations: [...claimRelations],
    schemaVersion: GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
    constraints: {
      mayRecalculate: false,
      mayInventRules: false,
      mustPreserveMethodDifferences: true,
      mustDiscloseMaterialAmbiguity: true,
    },
  };
  return buildCanonicalReadingSemanticBundleV1({
    intent: { domain: 'general', temporalScope: 'natal' },
    evidence: evidenceBundle,
    targetClaimIds: claims.map((claim) => claim.claimId),
  });
}

describe('Official Reading renderer v1', () => {
  it('renders report text only from canonical primary meaning', () => {
    const bundle = semantics();
    const plan = buildOfficialReadingPlanV1(bundle);
    const rendered = renderOfficialReadingV1(bundle, plan);

    expect(rendered.sections.map((section) => section.title)).toEqual([
      '구조적 긴장',
      '해석 범위',
    ]);
    expect(rendered.sections[0]?.blocks).toEqual([
      {
        type: 'key_points',
        items: ['실행 속도와 충분한 준비 사이의 긴장'],
      },
      {
        type: 'paragraph',
        text: '현실 결과를 빨리 만들려는 축과 더 배우고 검토하려는 축이 서로 견제합니다.',
      },
    ]);
    expect(JSON.stringify(rendered.sections)).not.toContain('support-resource');
    expect(rendered.sourceSemanticHash).toBe(bundle.semanticHash);
    expect(rendered.sourcePlanHash).toBe(plan.planHash);
  });

  it('keeps supporting evidence in internal explainability rather than consumer prose', () => {
    const bundle = semantics();
    const plan = buildOfficialReadingPlanV1(bundle);
    const rendered = renderOfficialReadingV1(bundle, plan);
    const tension = rendered.sections.find((section) => section.title === '구조적 긴장');
    const ref = tension?.explainabilityRefs?.[0];
    const entry = rendered.explainability.entries.find(
      (candidate) => candidate.explainabilityRef === ref,
    );

    expect(entry?.claimIds).toEqual(['primary-tension', 'support-resource']);
    expect(entry?.factRefs).toEqual(['derivedFacts.tenGods']);
    expect(entry?.methodologyIds).toEqual(['method-family@1', 'method-general@1']);
    expect(entry?.sourceIds).toEqual(['source-1']);
  });

  it('renders explicit scope limits without converting them into positive fortune claims', () => {
    const bundle = semantics();
    const plan = buildOfficialReadingPlanV1(bundle);
    const rendered = renderOfficialReadingV1(bundle, plan);
    const limits = rendered.sections.find((section) => section.title === '해석 범위');

    expect(limits?.blocks).toEqual([
      {
        type: 'paragraph',
        text: '현재 근거 범위에서는 미래 사건 시기 · 수치 점수·등급까지 확정하지 않습니다.',
      },
    ]);
  });

  it('preserves distinct same-semantic-key scenarios as one ambiguity block', () => {
    const claims = [
      structuredPrimary({
        claimId: 'scenario-b',
        scenarioRef: 'scenario-b',
        headline: '시나리오 B 핵심',
        summary: '시나리오 B 설명',
      }),
      structuredPrimary({
        claimId: 'scenario-a',
        scenarioRef: 'scenario-a',
        headline: '시나리오 A 핵심',
        summary: '시나리오 A 설명',
      }),
    ];
    const bundle = structuredSemantics(claims);
    const plan = buildOfficialReadingPlanV1(bundle);
    const rendered = renderOfficialReadingV1(bundle, plan);
    const interpretation = rendered.sections.find(
      (section) => section.title === '주요 해석',
    );

    expect(OFFICIAL_READING_STRUCTURAL_REALIZATION_POLICY_VERSION).toBe(
      'myeonghwa-official-reading-structural-realization-policy-v1',
    );
    expect(rendered.structuralRealizationPolicyVersion).toBe(
      OFFICIAL_READING_STRUCTURAL_REALIZATION_POLICY_VERSION,
    );
    expect(interpretation?.blocks).toEqual([
      {
        type: 'ambiguity',
        summary: '서로 다른 시나리오를 하나로 합치지 않고 함께 표시합니다.',
        scenarios: [
          {
            label: '시나리오 1',
            text: '시나리오 A 핵심\n시나리오 A 설명',
          },
          {
            label: '시나리오 2',
            text: '시나리오 B 핵심\n시나리오 B 설명',
          },
        ],
      },
    ]);
  });

  it('keeps scenario rendering invariant to evidence permutation', () => {
    const claims = [
      structuredPrimary({
        claimId: 'scenario-a',
        scenarioRef: 'scenario-a',
        headline: '시나리오 A 핵심',
        summary: '시나리오 A 설명',
      }),
      structuredPrimary({
        claimId: 'scenario-b',
        scenarioRef: 'scenario-b',
        headline: '시나리오 B 핵심',
        summary: '시나리오 B 설명',
      }),
    ];
    const forward = structuredSemantics(claims);
    const reverse = structuredSemantics([...claims].reverse());
    const forwardReport = renderOfficialReadingV1(
      forward,
      buildOfficialReadingPlanV1(forward),
    );
    const reverseReport = renderOfficialReadingV1(
      reverse,
      buildOfficialReadingPlanV1(reverse),
    );

    expect(reverseReport.sections.map((section) => section.blocks)).toEqual(
      forwardReport.sections.map((section) => section.blocks),
    );
  });

  it('preserves explicit same-section contradictions as a comparison block without choosing a winner', () => {
    const left = structuredPrimary({
      claimId: 'conflict-left',
      subcategory: 'alpha_conclusion',
      claimType: 'GENERAL_ALPHA_CONCLUSION',
      headline: '관점 A 핵심',
      summary: '관점 A 설명',
    });
    const right = structuredPrimary({
      claimId: 'conflict-right',
      subcategory: 'beta_conclusion',
      claimType: 'GENERAL_BETA_CONCLUSION',
      headline: '관점 B 핵심',
      summary: '관점 B 설명',
    });
    const bundle = structuredSemantics(
      [right, left],
      [
        {
          relationId: 'relation-contradiction',
          fromClaimId: 'conflict-left',
          toClaimId: 'conflict-right',
          relation: 'contradicts',
        },
      ],
    );
    const rendered = renderOfficialReadingV1(
      bundle,
      buildOfficialReadingPlanV1(bundle),
    );
    const interpretation = rendered.sections.find(
      (section) => section.title === '주요 해석',
    );

    expect(interpretation?.blocks).toEqual([
      {
        type: 'comparison',
        title: '함께 보존되는 상반된 해석',
        perspectives: [
          { label: '관점 1', text: '관점 A 핵심\n관점 A 설명' },
          { label: '관점 2', text: '관점 B 핵심\n관점 B 설명' },
        ],
      },
    ]);
    expect(JSON.stringify(interpretation?.blocks)).toContain('관점 A 설명');
    expect(JSON.stringify(interpretation?.blocks)).toContain('관점 B 설명');
  });

  it('fails closed on complex contradiction topology instead of inventing a merged comparison', () => {
    const first = structuredPrimary({
      claimId: 'complex-a',
      subcategory: 'alpha_conclusion',
      claimType: 'GENERAL_ALPHA_CONCLUSION',
      headline: '복합 A 핵심',
      summary: '복합 A 설명',
    });
    const second = structuredPrimary({
      claimId: 'complex-b',
      subcategory: 'beta_conclusion',
      claimType: 'GENERAL_BETA_CONCLUSION',
      headline: '복합 B 핵심',
      summary: '복합 B 설명',
    });
    const third = structuredPrimary({
      claimId: 'complex-c',
      subcategory: 'gamma_conclusion',
      claimType: 'GENERAL_GAMMA_CONCLUSION',
      headline: '복합 C 핵심',
      summary: '복합 C 설명',
    });
    const bundle = structuredSemantics(
      [first, second, third],
      [
        {
          relationId: 'relation-complex-ab',
          fromClaimId: 'complex-a',
          toClaimId: 'complex-b',
          relation: 'contradicts',
        },
        {
          relationId: 'relation-complex-bc',
          fromClaimId: 'complex-b',
          toClaimId: 'complex-c',
          relation: 'contradicts',
        },
      ],
    );
    const plan = buildOfficialReadingPlanV1(bundle);

    expect(canRenderOfficialReadingV1(bundle, plan)).toBe(false);
    expect(() => renderOfficialReadingV1(bundle, plan)).toThrow(
      /complex contradiction topology/u,
    );
  });

  it('fails closed when scenario and contradiction grouping overlap', () => {
    const left = structuredPrimary({
      claimId: 'overlap-a',
      scenarioRef: 'scenario-a',
      headline: '겹침 A 핵심',
      summary: '겹침 A 설명',
    });
    const right = structuredPrimary({
      claimId: 'overlap-b',
      scenarioRef: 'scenario-b',
      headline: '겹침 B 핵심',
      summary: '겹침 B 설명',
    });
    const bundle = structuredSemantics(
      [left, right],
      [
        {
          relationId: 'relation-overlap',
          fromClaimId: 'overlap-a',
          toClaimId: 'overlap-b',
          relation: 'contradicts',
        },
      ],
    );
    const plan = buildOfficialReadingPlanV1(bundle);

    expect(canRenderOfficialReadingV1(bundle, plan)).toBe(false);
    expect(() => renderOfficialReadingV1(bundle, plan)).toThrow(
      /overlapping scenario and contradiction groups/u,
    );
  });

  it('refuses canonical report rendering when a primary unit has no realizable text', () => {
    const noTextEvidence = evidence();
    const primary = noTextEvidence.claims.find((claim) => claim.claimId === 'primary-tension');
    if (primary === undefined) throw new Error('fixture must contain primary');
    const bundle = buildCanonicalReadingSemanticBundleV1({
      intent: { domain: 'general', temporalScope: 'natal' },
      evidence: {
        ...noTextEvidence,
        claims: [
          { ...primary, value: { conclusionKind: 'tension', futureTimingAuthorized: false } },
          ...noTextEvidence.claims.filter((claim) => claim.claimId !== 'primary-tension'),
        ],
      },
      targetClaimIds: ['primary-tension'],
    });
    const plan = buildOfficialReadingPlanV1(bundle);

    expect(canRenderOfficialReadingV1(bundle, plan)).toBe(false);
    expect(() => renderOfficialReadingV1(bundle, plan)).toThrow(TypeError);
  });
});
