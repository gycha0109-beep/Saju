import { describe, expect, it } from 'vitest';

import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import {
  buildCanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticQualifierBindingV1,
} from '../src/reading/canonical-reading-semantics.js';
import {
  buildApprovedOfficialReadingConciseProfilesV1,
} from '../src/reading/official-reading-concise-presentation-registry.js';
import {
  GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
  type GovernedReadingEvidenceBundleV1,
} from '../src/reading/governed-reading-evidence.js';
import { buildOfficialReadingPlanV1 } from '../src/reading/official-reading-plan.js';
import { renderOfficialReadingV1 } from '../src/reading/official-reading-renderer.js';
import {
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY,
} from '../src/research/general-natal-t8-structural-summary-candidate.js';

const STANDARD_HEADLINE = '월지와 일간이 같은 오행 관계입니다';
const STANDARD_SUMMARY =
  '월지의 오행이 일간과 같은 오행으로 연결됩니다. 이 관찰은 월지라는 한 구조축을 설명할 뿐, 명식 전체의 강약이나 길흉을 확정하지 않습니다.';
const APPROVED_CONCISE =
  '월지와 일간은 같은 오행으로 연결되며, 이는 명식 전체의 강약이나 길흉을 확정하는 판정이 아닙니다.';
const QUALIFIER_SUMMARY =
  '월지는 명식을 읽을 때 중요한 구조축으로 보되, 그것만으로 명식 전체를 단독 판정하지 않습니다. 통근 범위에서의 월지 우선성도 모든 뿌리의 보편 순위나 수치 가중치로 확장하지 않습니다.';

function generalClaim(
  input: {
    claimId?: string;
    headline?: string;
    summary?: string;
    approvedType?: boolean;
  } = {},
): InterpretationClaim {
  const claimId = input.claimId ?? 'general-month-branch-peer';
  return {
    claimId,
    schemaVersion: 'concise-activation-test',
    snapshotId: 'snapshot-concise-activation',
    taxonomy: {
      tier: 'T8',
      category: 'general',
      subcategory: 'month_branch_structural_context',
    },
    claimType:
      input.approvedType === false
        ? 'GENERAL_NATAL_UNAPPROVED_TEST_CLAIM'
        : GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
    subject: 'natal_chart',
    predicate: 'month_branch_structural_context',
    value: {
      relation: 'peer',
      structuralRelationship: 'same_element',
      headline: input.headline ?? STANDARD_HEADLINE,
      summary: input.summary ?? STANDARD_SUMMARY,
      semanticScope: 'month_branch_structural_context_non_conclusive',
      classificationAuthorized: false,
      numericScoringAuthorized: false,
      fortunePolarityAuthorized: false,
      upstreamEvidenceDirectionAsFortuneMeaningAuthorized: false,
    },
    methodologyRef: {
      id: GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY.methodologyId,
      version: GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY.version,
    },
    ruleRefs: [
      {
        ruleId: `rule-${claimId}`,
        version: '1',
        evaluationId: `eval-${claimId}`,
      },
    ],
    factRefs: ['pillars.month.branch', 'pillars.day.stem'],
    upstreamClaimRefs: [],
    sourceRefs: ['source-general-concise'],
    state: 'active',
  };
}

function qualifier(
  targetClaimId: string,
): CanonicalReadingSemanticQualifierBindingV1 {
  return {
    targetClaimId,
    qualifier: {
      qualifierId: 'preview_qualifier_r012_month_branch_priority_v1',
      kind: 'qualifier',
      semanticScope: 'month_branch_priority_scope_boundary',
      semanticKeys: [
        'MONTH_BRANCH_IMPORTANCE_NOT_EXCLUSIVE_AUTHORITY',
        'TONGGEN_PRIORITY_NOT_UNIVERSAL_ROOT_ORDERING',
        'NO_NUMERIC_MONTH_BRANCH_MULTIPLIER',
        'NO_STRENGTH_CLASSIFIER',
      ],
      canonicalText: { summary: QUALIFIER_SUMMARY },
      prohibitedExtensions: [
        'monthBranchExclusiveAuthority',
        'universalRootOrdering',
        'numericMonthBranchMultiplier',
        'strengthClassifier',
      ],
      provenance: {
        admissionId: 'preview-admit-r012-month-branch-priority-qualifier-v1',
        admissionRegistryVersion: 'test-registry-v1',
        researchId: 'R012_MONTH_BRANCH_PRIORITY',
        researchVersion: '0.2.0-research',
        authorityState: 'VERIFIED_BOUNDED_DIRECT_VISUAL_CLOSURE_COMPLETE',
      },
    },
  };
}

function bundle(
  claims: readonly InterpretationClaim[],
  qualifierClaimIds: readonly string[],
) {
  const evidence: GovernedReadingEvidenceBundleV1 = {
    requestId: 'request-concise-activation',
    purpose: 'full_reading',
    snapshotId: 'snapshot-concise-activation',
    interpretationRunId: 'interpretation-concise-activation',
    registrySnapshotId: 'registry-concise-activation',
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
  return buildCanonicalReadingSemanticBundleV1({
    intent: { domain: 'general', temporalScope: 'natal' },
    evidence,
    targetClaimIds: claims.map((claim) => claim.claimId),
    semanticQualifierBindings: qualifierClaimIds.map(qualifier),
  });
}

function interpretationSection(
  report: ReturnType<typeof renderOfficialReadingV1>,
) {
  const section = report.sections.find(
    (candidate) => candidate.title === '주요 해석',
  );
  if (section === undefined) throw new Error('interpretation section must exist');
  return section;
}

describe('Official Reading concise activation', () => {
  it('renders approved concise text only when every primary item is current and approved', () => {
    const semanticBundle = bundle([generalClaim()], [
      'general-month-branch-peer',
    ]);
    const plan = buildOfficialReadingPlanV1(semanticBundle);
    const profiles = buildApprovedOfficialReadingConciseProfilesV1(
      semanticBundle,
      plan,
    );
    expect(profiles).toHaveLength(1);

    const standard = renderOfficialReadingV1(semanticBundle, plan);
    const concise = renderOfficialReadingV1(semanticBundle, plan, {
      preferredDetail: 'concise',
    });

    expect(concise.detailPreferenceResolution).toEqual({
      requestedDetail: 'concise',
      resolvedDetail: 'concise',
      resolution: 'exact',
    });
    expect(concise.concisePresentationProfileSetHash).toMatch(/^[0-9a-f]{64}$/u);

    const standardJson = JSON.stringify(interpretationSection(standard).blocks);
    const conciseJson = JSON.stringify(interpretationSection(concise).blocks);
    expect(standardJson).toContain(STANDARD_HEADLINE);
    expect(standardJson).toContain(STANDARD_SUMMARY);
    expect(conciseJson).toContain(APPROVED_CONCISE);
    expect(conciseJson).toContain(QUALIFIER_SUMMARY);
    expect(conciseJson).not.toContain(STANDARD_SUMMARY);
    expect(conciseJson).not.toContain(STANDARD_HEADLINE);
    expect(concise.explainability).toEqual(standard.explainability);
  });

  it('falls the entire report back to standard when one primary item has no approved concise profile', () => {
    const approved = generalClaim();
    const unapproved = generalClaim({
      claimId: 'unapproved-primary',
      approvedType: false,
      headline: '별도 해석 제목',
      summary: '별도 해석 설명',
    });
    const semanticBundle = bundle(
      [approved, unapproved],
      [approved.claimId, unapproved.claimId],
    );
    const plan = buildOfficialReadingPlanV1(semanticBundle);
    const standard = renderOfficialReadingV1(semanticBundle, plan);
    const requestedConcise = renderOfficialReadingV1(semanticBundle, plan, {
      preferredDetail: 'concise',
    });

    expect(requestedConcise.detailPreferenceResolution).toEqual({
      requestedDetail: 'concise',
      resolvedDetail: 'standard',
      resolution: 'fallback_to_standard',
      fallbackReason: 'missing_approved_concise_material',
    });
    expect(requestedConcise.sections).toEqual(standard.sections);
    expect(requestedConcise.concisePresentationProfileSetHash).toBeUndefined();
  });

  it('invalidates the approved concise material when the standard text changes', () => {
    const changed = generalClaim({
      summary: `${STANDARD_SUMMARY} 변경됨`,
    });
    const semanticBundle = bundle([changed], [changed.claimId]);
    const plan = buildOfficialReadingPlanV1(semanticBundle);
    expect(
      buildApprovedOfficialReadingConciseProfilesV1(semanticBundle, plan),
    ).toEqual([]);

    const standard = renderOfficialReadingV1(semanticBundle, plan);
    const requestedConcise = renderOfficialReadingV1(semanticBundle, plan, {
      preferredDetail: 'concise',
    });
    expect(requestedConcise.detailPreferenceResolution?.resolvedDetail).toBe(
      'standard',
    );
    expect(requestedConcise.sections).toEqual(standard.sections);
  });

  it('keeps source summaries and explainability independent from concise text density', () => {
    const semanticBundle = bundle([generalClaim()], [
      'general-month-branch-peer',
    ]);
    const plan = buildOfficialReadingPlanV1(semanticBundle);
    const sourceSummaries = [
      {
        sourceId: 'source-general-concise',
        title: '근거 자료',
        summary: '월지 구조 관계의 근거 요약',
      },
    ];
    const standard = renderOfficialReadingV1(semanticBundle, plan, {
      sourceSummaries,
      preferredDetail: 'standard',
    });
    const concise = renderOfficialReadingV1(semanticBundle, plan, {
      sourceSummaries,
      preferredDetail: 'concise',
    });

    const standardHints = standard.sections.flatMap((section) =>
      section.blocks.filter((block) => block.type === 'source_hint'),
    );
    const conciseHints = concise.sections.flatMap((section) =>
      section.blocks.filter((block) => block.type === 'source_hint'),
    );
    expect(conciseHints).toEqual(standardHints);
    expect(concise.explainability).toEqual(standard.explainability);
  });

  it('keeps detailed on the existing standard fallback', () => {
    const semanticBundle = bundle([generalClaim()], [
      'general-month-branch-peer',
    ]);
    const plan = buildOfficialReadingPlanV1(semanticBundle);
    const standard = renderOfficialReadingV1(semanticBundle, plan);
    const detailed = renderOfficialReadingV1(semanticBundle, plan, {
      preferredDetail: 'detailed',
    });

    expect(detailed.detailPreferenceResolution).toEqual({
      requestedDetail: 'detailed',
      resolvedDetail: 'standard',
      resolution: 'fallback_to_standard',
      fallbackReason: 'missing_expansion_material',
    });
    expect(detailed.sections).toEqual(standard.sections);
  });
});
