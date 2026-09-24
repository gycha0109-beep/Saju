import { describe, expect, it } from 'vitest';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import {
  GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
  type GovernedReadingEvidenceBundleV1,
} from '../src/reading/governed-reading-evidence.js';
import { buildCanonicalReadingSemanticBundleV1 } from '../src/reading/canonical-reading-semantics.js';
import { buildOfficialReadingPlanV1 } from '../src/reading/official-reading-plan.js';
import {
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
