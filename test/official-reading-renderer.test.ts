import { describe, expect, it } from 'vitest';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import type { ReadingBlockView } from '../src/contracts/reading.js';
import {
  GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
  type GovernedReadingEvidenceBundleV1,
} from '../src/reading/governed-reading-evidence.js';
import {
  buildCanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticQualifierBindingV1,
} from '../src/reading/canonical-reading-semantics.js';
import {
  OFFICIAL_READING_EXPLAINABILITY_BINDING_POLICY_VERSION,
  buildOfficialReadingPlanV1,
} from '../src/reading/official-reading-plan.js';
import {
  OFFICIAL_READING_DETAIL_PRESENTATION_POLICY_VERSION,
} from '../src/reading/official-reading-detail-presentation.js';
import {
  OFFICIAL_READING_ORDINARY_MULTI_CLAIM_PRESENTATION_POLICY_VERSION,
  OFFICIAL_READING_SOURCE_SUMMARY_PRESENTATION_POLICY_VERSION,
  OFFICIAL_READING_STRUCTURED_INSIGHT_MATERIALIZATION_POLICY_VERSION,
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
  semanticQualifierBindings: readonly CanonicalReadingSemanticQualifierBindingV1[] = [],
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
    ...(semanticQualifierBindings.length === 0
      ? {}
      : { semanticQualifierBindings }),
  });
}

function domainPrimary(
  domain: 'career' | 'relationship' | 'business',
  claimId: string,
  kind: string,
): InterpretationClaim {
  const kindKey =
    domain === 'career'
      ? 'careerKind'
      : domain === 'relationship'
        ? 'relationshipKind'
        : 'businessKind';
  return {
    ...structuredPrimary({
      claimId,
      headline: `${kind} headline`,
      summary: `${kind} summary`,
      subcategory: kind,
      claimType: `${domain.toUpperCase()}_${kind.toUpperCase()}_CONCLUSION`,
    }),
    taxonomy: {
      tier: 'T8',
      category: domain,
      subcategory: kind,
    },
    predicate: `${domain}_conclusion`,
    value: {
      [kindKey]: kind,
      headline: `${kind} headline`,
      summary: `${kind} summary`,
      futureTimingAuthorized: false,
    },
  };
}

function domainSemantics(
  domain: 'career' | 'relationship' | 'business',
  claims: readonly InterpretationClaim[],
  claimRelations: GovernedReadingEvidenceBundleV1['claimRelations'] = [],
) {
  const evidenceBundle: GovernedReadingEvidenceBundleV1 = {
    requestId: `request-${domain}-renderer`,
    purpose: 'full_reading',
    snapshotId: 'snapshot-1',
    interpretationRunId: `interpretation-${domain}-renderer`,
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
    intent: { domain, temporalScope: 'natal' },
    evidence: evidenceBundle,
    targetClaimIds: claims.map((claim) => claim.claimId),
  });
}

function withoutAtomExplainability(
  blocks: readonly ReadingBlockView[] | undefined,
): unknown {
  return blocks?.map((block) => {
    switch (block.type) {
      case 'insights':
        return {
          ...block,
          items: block.items.map((item) => {
            const { explainabilityRef, ...visible } = item;
            void explainabilityRef;
            return visible;
          }),
        };
      case 'comparison':
        return {
          ...block,
          perspectives: block.perspectives.map((item) => {
            const { explainabilityRef, ...visible } = item;
            void explainabilityRef;
            return visible;
          }),
        };
      case 'ambiguity':
        return {
          ...block,
          scenarios: block.scenarios.map((item) => {
            const { explainabilityRefs, ...visible } = item;
            void explainabilityRefs;
            return visible;
          }),
        };
      default:
        return block;
    }
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
    expect(withoutAtomExplainability(rendered.sections[0]?.blocks)).toEqual([
      {
        type: 'insights',
        items: [
          {
            headline: '실행 속도와 충분한 준비 사이의 긴장',
            summary: '현실 결과를 빨리 만들려는 축과 더 배우고 검토하려는 축이 서로 견제합니다.',
          },
        ],
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

    const primaryUnitRef = bundle.units.find(
      (unit) => unit.claimId === 'primary-tension',
    )?.unitId;
    const supportingUnitRef = bundle.units.find(
      (unit) => unit.claimId === 'support-resource',
    )?.unitId;
    expect(rendered.explainabilityBindingPolicyVersion).toBe(
      OFFICIAL_READING_EXPLAINABILITY_BINDING_POLICY_VERSION,
    );
    expect(entry?.primaryUnitRefs).toEqual([primaryUnitRef]);
    expect(entry?.supportingUnitRefs).toEqual([supportingUnitRef]);
    expect(entry?.claimIds).toEqual(['primary-tension', 'support-resource']);
    expect(entry?.factRefs).toEqual(['derivedFacts.tenGods']);
    expect(entry?.methodologyIds).toEqual(['method-family@1', 'method-general@1']);
    expect(entry?.sourceIds).toEqual(['source-1']);
    const insight = tension?.blocks[0];
    expect(insight?.type).toBe('insights');
    if (insight?.type === 'insights') {
      expect(insight.items[0]?.explainabilityRef).toBe(entry?.explainabilityRef);
    }
  });

  it('emits requested source summaries from the exact atom explainability source set', () => {
    const bundle = semantics();
    const plan = buildOfficialReadingPlanV1(bundle);
    const rendered = renderOfficialReadingV1(bundle, plan, {
      sourceSummaries: [
        {
          sourceId: 'source-1',
          title: '검증 출처',
          summary: '이 atom의 등록된 출처 요약입니다.',
        },
      ],
    });
    const tension = rendered.sections.find((section) => section.title === '구조적 긴장');
    const insight = tension?.blocks[0];
    if (insight?.type !== 'insights') {
      throw new Error('fixture must render an insight block');
    }
    const explainabilityRef = insight.items[0]?.explainabilityRef;
    expect(explainabilityRef).toBeDefined();
    expect(rendered.sourceSummaryPresentationPolicyVersion).toBe(
      OFFICIAL_READING_SOURCE_SUMMARY_PRESENTATION_POLICY_VERSION,
    );
    expect(tension?.blocks[1]).toEqual({
      type: 'source_hint',
      text: '출처: 검증 출처 — 이 atom의 등록된 출처 요약입니다.',
      explainabilityRef,
    });
  });

  it('resolves detail requests without changing governed visible meaning or source-summary behavior', () => {
    const bundle = semantics();
    const plan = buildOfficialReadingPlanV1(bundle);
    const baseline = renderOfficialReadingV1(bundle, plan);
    const standard = renderOfficialReadingV1(bundle, plan, {
      preferredDetail: 'standard',
    });
    const concise = renderOfficialReadingV1(bundle, plan, {
      preferredDetail: 'concise',
    });
    const detailed = renderOfficialReadingV1(bundle, plan, {
      preferredDetail: 'detailed',
    });
    const conciseWithSource = renderOfficialReadingV1(bundle, plan, {
      preferredDetail: 'concise',
      sourceSummaries: [
        {
          sourceId: 'source-1',
          title: '검증 출처',
          summary: '등록된 출처 요약',
        },
      ],
    });

    expect(baseline.detailPresentationPolicyVersion).toBeUndefined();
    expect(baseline.detailPreferenceResolution).toBeUndefined();

    expect(standard.sections).toEqual(baseline.sections);
    expect(standard.disclosures).toEqual(baseline.disclosures);
    expect(standard.explainability).toEqual(baseline.explainability);
    expect(standard.detailPresentationPolicyVersion).toBe(
      OFFICIAL_READING_DETAIL_PRESENTATION_POLICY_VERSION,
    );
    expect(standard.detailPreferenceResolution).toEqual({
      requestedDetail: 'standard',
      resolvedDetail: 'standard',
      resolution: 'exact',
    });

    expect(concise.sections).toEqual(baseline.sections);
    expect(concise.disclosures).toEqual(baseline.disclosures);
    expect(concise.explainability).toEqual(baseline.explainability);
    expect(concise.detailPreferenceResolution).toEqual({
      requestedDetail: 'concise',
      resolvedDetail: 'standard',
      resolution: 'fallback_to_standard',
      fallbackReason: 'missing_text_role_authority',
    });

    expect(detailed.sections).toEqual(baseline.sections);
    expect(detailed.disclosures).toEqual(baseline.disclosures);
    expect(detailed.explainability).toEqual(baseline.explainability);
    expect(detailed.detailPreferenceResolution).toEqual({
      requestedDetail: 'detailed',
      resolvedDetail: 'standard',
      resolution: 'fallback_to_standard',
      fallbackReason: 'missing_expansion_material',
    });

    expect(
      conciseWithSource.sections.flatMap((section) => section.blocks).some(
        (block) => block.type === 'source_hint',
      ),
    ).toBe(true);
    expect(conciseWithSource.sourceSummaryPresentationPolicyVersion).toBe(
      OFFICIAL_READING_SOURCE_SUMMARY_PRESENTATION_POLICY_VERSION,
    );
    expect(conciseWithSource.detailPreferenceResolution).toEqual(
      concise.detailPreferenceResolution,
    );
  });

  it('does not emit source hints when source summaries were not requested', () => {
    const bundle = semantics();
    const plan = buildOfficialReadingPlanV1(bundle);
    const rendered = renderOfficialReadingV1(bundle, plan);

    expect(
      rendered.sections.flatMap((section) => section.blocks).some(
        (block) => block.type === 'source_hint',
      ),
    ).toBe(false);
  });

  it('fails closed when requested source metadata cannot satisfy an atom source binding', () => {
    const bundle = semantics();
    const plan = buildOfficialReadingPlanV1(bundle);

    expect(() =>
      renderOfficialReadingV1(bundle, plan, { sourceSummaries: [] }),
    ).toThrow(/missing source metadata: source-1/u);
  });

  it('isolates primary-specific upstream provenance inside a shared insight section', () => {
    const baseSupport = evidence().claims.find(
      (claim) => claim.claimId === 'support-resource',
    );
    if (baseSupport === undefined) throw new Error('fixture must contain support');

    const supportA: InterpretationClaim = {
      ...baseSupport,
      claimId: 'support-a',
      methodologyRef: { id: 'method-support-a', version: '1' },
      factRefs: ['facts.supportA'],
      sourceRefs: ['source-a'],
    };
    const supportB: InterpretationClaim = {
      ...baseSupport,
      claimId: 'support-b',
      methodologyRef: { id: 'method-support-b', version: '1' },
      factRefs: ['facts.supportB'],
      sourceRefs: ['source-b'],
    };
    const primaryA: InterpretationClaim = {
      ...structuredPrimary({
        claimId: 'primary-a',
        subcategory: 'alpha_conclusion',
        claimType: 'GENERAL_ALPHA_CONCLUSION',
        headline: 'A 핵심',
        summary: 'A 설명',
      }),
      upstreamClaimRefs: ['support-a'],
    };
    const primaryB: InterpretationClaim = {
      ...structuredPrimary({
        claimId: 'primary-b',
        subcategory: 'beta_conclusion',
        claimType: 'GENERAL_BETA_CONCLUSION',
        headline: 'B 핵심',
        summary: 'B 설명',
      }),
      upstreamClaimRefs: ['support-b'],
    };
    const evidenceBundle: GovernedReadingEvidenceBundleV1 = {
      requestId: 'request-isolated-explainability',
      purpose: 'full_reading',
      snapshotId: 'snapshot-1',
      interpretationRunId: 'interpretation-isolated-explainability',
      registrySnapshotId: 'registry-1',
      canonicalFacts: [],
      claims: [primaryB, supportA, primaryA, supportB],
      claimRelations: [
        {
          relationId: 'relation-primary-a-support-a',
          fromClaimId: 'primary-a',
          toClaimId: 'support-a',
          relation: 'derived_from',
        },
        {
          relationId: 'relation-primary-b-support-b',
          fromClaimId: 'primary-b',
          toClaimId: 'support-b',
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
    const bundle = buildCanonicalReadingSemanticBundleV1({
      intent: { domain: 'general', temporalScope: 'natal' },
      evidence: evidenceBundle,
      targetClaimIds: ['primary-b', 'primary-a'],
    });
    const rendered = renderOfficialReadingV1(
      bundle,
      buildOfficialReadingPlanV1(bundle),
      {
        sourceSummaries: [
          { sourceId: 'source-a', title: 'A 전용 출처', summary: 'A support 요약' },
          { sourceId: 'source-b', title: 'B 전용 출처', summary: 'B support 요약' },
          {
            sourceId: 'source-structure',
            title: '공통 primary 출처',
            summary: 'primary 공통 출처 요약',
          },
        ],
      },
    );
    const section = rendered.sections.find((candidate) => candidate.title === '주요 해석');
    const block = section?.blocks[0];
    expect(block?.type).toBe('insights');
    if (block?.type !== 'insights') throw new Error('fixture must render insights');

    const byHeadline = new Map(block.items.map((item) => [item.headline, item]));
    const entryA = rendered.explainability.entries.find(
      (entry) => entry.explainabilityRef === byHeadline.get('A 핵심')?.explainabilityRef,
    );
    const entryB = rendered.explainability.entries.find(
      (entry) => entry.explainabilityRef === byHeadline.get('B 핵심')?.explainabilityRef,
    );

    expect(entryA?.claimIds).toEqual(['primary-a', 'support-a']);
    expect(entryA?.factRefs).toEqual(['facts.supportA']);
    expect(entryA?.sourceIds).toEqual(['source-a', 'source-structure']);
    expect(entryB?.claimIds).toEqual(['primary-b', 'support-b']);
    expect(entryB?.factRefs).toEqual(['facts.supportB']);
    expect(entryB?.sourceIds).toEqual(['source-b', 'source-structure']);
    expect(entryA?.claimIds).not.toContain('support-b');
    expect(entryB?.claimIds).not.toContain('support-a');
    expect(section?.explainabilityRefs).toEqual(
      block.items.map((item) => item.explainabilityRef),
    );

    const sourceHints = section?.blocks.filter(
      (candidate) => candidate.type === 'source_hint',
    ) ?? [];
    expect(sourceHints).toEqual([
      {
        type: 'source_hint',
        text: '출처: A 전용 출처 — A support 요약',
        explainabilityRef: byHeadline.get('A 핵심')?.explainabilityRef,
      },
      {
        type: 'source_hint',
        text: '출처: 공통 primary 출처 — primary 공통 출처 요약',
        explainabilityRef: byHeadline.get('A 핵심')?.explainabilityRef,
      },
      {
        type: 'source_hint',
        text: '출처: B 전용 출처 — B support 요약',
        explainabilityRef: byHeadline.get('B 핵심')?.explainabilityRef,
      },
      {
        type: 'source_hint',
        text: '출처: 공통 primary 출처 — primary 공통 출처 요약',
        explainabilityRef: byHeadline.get('B 핵심')?.explainabilityRef,
      },
    ]);
    expect(
      sourceHints.filter(
        (hint) =>
          hint.type === 'source_hint' &&
          hint.explainabilityRef === byHeadline.get('A 핵심')?.explainabilityRef,
      ).map((hint) => hint.text),
    ).not.toContain('출처: B 전용 출처 — B support 요약');
    expect(
      sourceHints.filter(
        (hint) =>
          hint.type === 'source_hint' &&
          hint.explainabilityRef === byHeadline.get('B 핵심')?.explainabilityRef,
      ).map((hint) => hint.text),
    ).not.toContain('출처: A 전용 출처 — A support 요약');
  });

  it('renders explicit scope limits without converting them into positive fortune claims', () => {
    const bundle = semantics();
    const plan = buildOfficialReadingPlanV1(bundle);
    const rendered = renderOfficialReadingV1(bundle, plan);
    const limits = rendered.sections.find((section) => section.title === '해석 범위');

    expect(withoutAtomExplainability(limits?.blocks)).toEqual([
      {
        type: 'paragraph',
        text: '현재 근거 범위에서는 미래 사건 시기 · 수치 점수·등급까지 확정하지 않습니다.',
      },
    ]);
  });

  it('renders domain-kind sections with deterministic consumer titles', () => {
    const cases = [
      ['career', 'driver', '일의 동력'],
      ['career', 'fit', '맞는 역할·조건'],
      ['career', 'environment', '업무 환경'],
      ['career', 'friction', '일의 마찰'],
      ['relationship', 'closeness', '가까워지는 방식'],
      ['relationship', 'expression', '표현과 소통'],
      ['relationship', 'values', '관계에서 중요하게 보는 기준'],
      ['relationship', 'boundary', '경계와 책임'],
      ['relationship', 'friction', '관계의 마찰'],
      ['business', 'decision_execution', '판단과 실행'],
      ['business', 'uncertainty', '불확실성 다루기'],
      ['business', 'allocation', '자원 배분'],
      ['business', 'accountability', '책임과 기준'],
      ['business', 'partnership', '파트너십'],
      ['business', 'pressure', '운영 압박'],
      ['business', 'friction', '사업상의 마찰'],
    ] as const;

    for (const [domain, kind, expectedTitle] of cases) {
      const claim = domainPrimary(domain, `${domain}-${kind}`, kind);
      const bundle = domainSemantics(domain, [claim]);
      const rendered = renderOfficialReadingV1(
        bundle,
        buildOfficialReadingPlanV1(bundle),
      );
      const semanticSection = rendered.sections.find(
        (section) => section.title !== '해석 범위',
      );
      expect(semanticSection?.title).toBe(expectedTitle);
      expect(withoutAtomExplainability(semanticSection?.blocks)).toEqual([
        {
          type: 'insights',
          items: [{ headline: `${kind} headline`, summary: `${kind} summary` }],
        },
      ]);
    }
  });

  it('renders unknown domain kinds through the existing coarse section title', () => {
    const claim = domainPrimary('career', 'career-unknown', 'unknown_kind');
    const bundle = domainSemantics('career', [claim]);
    const rendered = renderOfficialReadingV1(
      bundle,
      buildOfficialReadingPlanV1(bundle),
    );
    const work = rendered.sections.find((section) => section.title === '일·성과');

    expect(withoutAtomExplainability(work?.blocks)).toEqual([
      {
        type: 'insights',
        items: [{ headline: 'unknown_kind headline', summary: 'unknown_kind summary' }],
      },
    ]);
  });

  it('keeps a cross-lane contradiction in one coarse section for SA-6C comparison rendering', () => {
    const driver = domainPrimary('career', 'career-driver-conflict', 'driver');
    const fit = domainPrimary('career', 'career-fit-conflict', 'fit');
    const bundle = domainSemantics(
      'career',
      [fit, driver],
      [
        {
          relationId: 'career-cross-lane-conflict',
          fromClaimId: 'career-driver-conflict',
          toClaimId: 'career-fit-conflict',
          relation: 'contradicts',
        },
      ],
    );
    const rendered = renderOfficialReadingV1(
      bundle,
      buildOfficialReadingPlanV1(bundle),
    );
    const work = rendered.sections.find((section) => section.title === '일·성과');

    expect(withoutAtomExplainability(work?.blocks)).toEqual([
      {
        type: 'comparison',
        title: '함께 보존되는 상반된 해석',
        perspectives: [
          {
            label: '관점 1',
            text: 'driver headline\ndriver summary',
          },
          {
            label: '관점 2',
            text: 'fit headline\nfit summary',
          },
        ],
      },
    ]);
  });

  it('compacts consecutive ordinary claims into one governed key-point list without losing canonical pairs', () => {
    const alpha = structuredPrimary({
      claimId: 'ordinary-alpha',
      subcategory: 'alpha_conclusion',
      claimType: 'GENERAL_ALPHA_CONCLUSION',
      headline: '알파 핵심',
      summary: '알파 설명',
    });
    const zeta = structuredPrimary({
      claimId: 'ordinary-zeta',
      subcategory: 'zeta_conclusion',
      claimType: 'GENERAL_ZETA_CONCLUSION',
      headline: '제타 핵심',
      summary: '제타 설명',
    });
    const bundle = structuredSemantics([zeta, alpha]);
    const rendered = renderOfficialReadingV1(
      bundle,
      buildOfficialReadingPlanV1(bundle),
    );
    const interpretation = rendered.sections.find(
      (section) => section.title === '주요 해석',
    );

    expect(OFFICIAL_READING_ORDINARY_MULTI_CLAIM_PRESENTATION_POLICY_VERSION).toBe(
      'myeonghwa-official-reading-ordinary-multi-claim-presentation-policy-v1',
    );
    expect(rendered.ordinaryMultiClaimPresentationPolicyVersion).toBe(
      OFFICIAL_READING_ORDINARY_MULTI_CLAIM_PRESENTATION_POLICY_VERSION,
    );
    expect(OFFICIAL_READING_STRUCTURED_INSIGHT_MATERIALIZATION_POLICY_VERSION).toBe(
      'myeonghwa-official-reading-structured-insight-materialization-policy-v1',
    );
    expect(rendered.structuredInsightMaterializationPolicyVersion).toBe(
      OFFICIAL_READING_STRUCTURED_INSIGHT_MATERIALIZATION_POLICY_VERSION,
    );
    expect(withoutAtomExplainability(interpretation?.blocks)).toEqual([
      {
        type: 'insights',
        items: [
          { headline: '알파 핵심', summary: '알파 설명' },
          { headline: '제타 핵심', summary: '제타 설명' },
        ],
      },
    ]);
  });

  it('compacts only consecutive ordinary runs and keeps structural groups at their governed position', () => {
    const claims = [
      structuredPrimary({
        claimId: 'run-left-a',
        subcategory: 'alpha_a_conclusion',
        claimType: 'GENERAL_ALPHA_A_CONCLUSION',
        headline: '왼쪽 A 핵심',
        summary: '왼쪽 A 설명',
      }),
      structuredPrimary({
        claimId: 'run-left-b',
        subcategory: 'alpha_b_conclusion',
        claimType: 'GENERAL_ALPHA_B_CONCLUSION',
        headline: '왼쪽 B 핵심',
        summary: '왼쪽 B 설명',
      }),
      structuredPrimary({
        claimId: 'run-conflict-a',
        subcategory: 'beta_conclusion',
        claimType: 'GENERAL_BETA_CONCLUSION',
        headline: '충돌 A 핵심',
        summary: '충돌 A 설명',
      }),
      structuredPrimary({
        claimId: 'run-conflict-b',
        subcategory: 'gamma_conclusion',
        claimType: 'GENERAL_GAMMA_CONCLUSION',
        headline: '충돌 B 핵심',
        summary: '충돌 B 설명',
      }),
      structuredPrimary({
        claimId: 'run-right-a',
        subcategory: 'zeta_a_conclusion',
        claimType: 'GENERAL_ZETA_A_CONCLUSION',
        headline: '오른쪽 A 핵심',
        summary: '오른쪽 A 설명',
      }),
      structuredPrimary({
        claimId: 'run-right-b',
        subcategory: 'zeta_b_conclusion',
        claimType: 'GENERAL_ZETA_B_CONCLUSION',
        headline: '오른쪽 B 핵심',
        summary: '오른쪽 B 설명',
      }),
    ];
    const bundle = structuredSemantics(
      [...claims].reverse(),
      [
        {
          relationId: 'run-conflict',
          fromClaimId: 'run-conflict-a',
          toClaimId: 'run-conflict-b',
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

    expect(withoutAtomExplainability(interpretation?.blocks)).toEqual([
      {
        type: 'insights',
        items: [
          { headline: '왼쪽 A 핵심', summary: '왼쪽 A 설명' },
          { headline: '왼쪽 B 핵심', summary: '왼쪽 B 설명' },
        ],
      },
      {
        type: 'comparison',
        title: '함께 보존되는 상반된 해석',
        perspectives: [
          { label: '관점 1', text: '충돌 A 핵심\n충돌 A 설명' },
          { label: '관점 2', text: '충돌 B 핵심\n충돌 B 설명' },
        ],
      },
      {
        type: 'insights',
        items: [
          { headline: '오른쪽 A 핵심', summary: '오른쪽 A 설명' },
          { headline: '오른쪽 B 핵심', summary: '오른쪽 B 설명' },
        ],
      },
    ]);
  });

  it('preserves canonical qualifiers as structured insight fields instead of flattening them into prose', () => {
    const claim = structuredPrimary({
      claimId: 'qualified-ordinary',
      subcategory: 'qualified_conclusion',
      claimType: 'GENERAL_QUALIFIED_CONCLUSION',
      headline: '조건부 핵심',
      summary: '조건부 설명',
    });
    const semanticKey = [
      'T8',
      'general',
      'qualified_conclusion',
      'GENERAL_QUALIFIED_CONCLUSION',
      'natal_chart',
      'consumer_conclusion',
    ].join(':');
    const bundle = structuredSemantics(
      [claim],
      [],
      [
        {
          targetClaimId: claim.claimId,
          qualifier: {
            qualifierId: 'qualifier-ordinary-1',
            kind: 'qualifier',
            semanticScope: 'qualified_conclusion',
            semanticKeys: [semanticKey],
            canonicalText: { summary: '이 해석은 조건이 충족되는 범위에서만 적용합니다.' },
            prohibitedExtensions: [],
            provenance: {
              admissionId: 'admission-qualifier-1',
              admissionRegistryVersion: '1',
              researchId: 'research-qualifier-1',
              researchVersion: '1',
              authorityState: 'active',
            },
          },
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

    expect(withoutAtomExplainability(interpretation?.blocks)).toEqual([
      {
        type: 'insights',
        items: [
          {
            headline: '조건부 핵심',
            summary: '조건부 설명',
            qualifiers: ['이 해석은 조건이 충족되는 범위에서만 적용합니다.'],
          },
        ],
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
    expect(withoutAtomExplainability(interpretation?.blocks)).toEqual([
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
    const ambiguity = interpretation?.blocks[0];
    expect(ambiguity?.type).toBe('ambiguity');
    if (ambiguity?.type === 'ambiguity') {
      expect(ambiguity.scenarios.flatMap((scenario) => scenario.explainabilityRefs)).toEqual(
        interpretation?.explainabilityRefs,
      );
      for (const scenario of ambiguity.scenarios) {
        expect(scenario.explainabilityRefs).toHaveLength(1);
        const [scenarioExplainabilityRef] = scenario.explainabilityRefs ?? [];
        expect(scenarioExplainabilityRef).toBeDefined();
        expect(
          rendered.explainability.entries.some(
            (entry) => entry.explainabilityRef === scenarioExplainabilityRef,
          ),
        ).toBe(true);
      }
    }
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

    expect(withoutAtomExplainability(interpretation?.blocks)).toEqual([
      {
        type: 'comparison',
        title: '함께 보존되는 상반된 해석',
        perspectives: [
          { label: '관점 1', text: '관점 A 핵심\n관점 A 설명' },
          { label: '관점 2', text: '관점 B 핵심\n관점 B 설명' },
        ],
      },
    ]);
    const comparison = interpretation?.blocks[0];
    expect(comparison?.type).toBe('comparison');
    if (comparison?.type === 'comparison') {
      expect(comparison.perspectives.map((item) => item.explainabilityRef)).toEqual(
        interpretation?.explainabilityRefs,
      );
    }
    expect(JSON.stringify(interpretation?.blocks)).toContain('관점 A 설명');
    expect(JSON.stringify(interpretation?.blocks)).toContain('관점 B 설명');
  });

  it('preserves a multi-claim contradiction component without selecting a winner', () => {
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
    const rendered = renderOfficialReadingV1(
      bundle,
      buildOfficialReadingPlanV1(bundle),
    );
    const interpretation = rendered.sections.find(
      (section) => section.title === '주요 해석',
    );

    expect(withoutAtomExplainability(interpretation?.blocks)).toEqual([
      {
        type: 'comparison',
        title: '함께 보존되는 상반된 해석',
        perspectives: [
          { label: '관점 1', text: '복합 A 핵심\n복합 A 설명' },
          { label: '관점 2', text: '복합 B 핵심\n복합 B 설명' },
          { label: '관점 3', text: '복합 C 핵심\n복합 C 설명' },
        ],
      },
    ]);
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
