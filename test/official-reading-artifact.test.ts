import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { createI7SeasonalSupportRegistry } from '../src/research/i7-seasonal-support-pack.js';
import {
  runInterpretation,
  type InterpretationExecutionResult,
} from '../src/interpretation/interpretation-engine.js';
import type {
  CalculationPolicySnapshot,
  CanonicalSajuSnapshot,
} from '../src/contracts/calculation.js';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import {
  GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
  type GovernedReadingEvidenceBundleV1,
} from '../src/reading/governed-reading-evidence.js';
import {
  buildCanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticQualifierBindingV1,
} from '../src/reading/canonical-reading-semantics.js';
import {
  assembleOfficialReadingArtifactV1,
  OFFICIAL_READING_ARTIFACT_SCHEMA_VERSION,
} from '../src/reading/official-reading-artifact.js';
import {
  OFFICIAL_READING_EXPLAINABILITY_BINDING_POLICY_VERSION,
  buildOfficialReadingPlanV1,
} from '../src/reading/official-reading-plan.js';
import {
  OFFICIAL_READING_ORDINARY_MULTI_CLAIM_PRESENTATION_POLICY_VERSION,
  OFFICIAL_READING_STRUCTURED_INSIGHT_MATERIALIZATION_POLICY_VERSION,
  OFFICIAL_READING_STRUCTURAL_REALIZATION_POLICY_VERSION,
  renderApprovedDetailedOfficialReadingV1,
  renderOfficialReadingV1,
} from '../src/reading/official-reading-renderer.js';
import {
  OFFICIAL_READING_DETAILED_REALIZATION_POLICY_VERSION,
} from '../src/reading/official-reading-detailed-realization.js';
import { buildReadingArtifactShell } from '../src/reading/reading-artifact-shell.js';
import {
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY,
} from '../src/research/general-natal-t8-structural-summary-candidate.js';

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/official-reading-artifact-test',
  policyVersion: '1.0.0',
  dayBoundary: 'midnight',
  trueSolarTime: {
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  },
  timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
};

function snapshot(): CanonicalSajuSnapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    calculationPolicy,
    { now: new Date('2026-09-23T00:00:00.000Z') },
  );
}

function fixture(summary = '실행과 준비가 서로 견제합니다.') {
  const currentSnapshot = snapshot();
  const registry = createI7SeasonalSupportRegistry();
  const base = runInterpretation(currentSnapshot, registry, {
    requestId: 'official-artifact-interpretation',
    now: new Date('2026-09-23T00:01:00.000Z'),
  });
  const claim: InterpretationClaim = {
    claimId: 'claim-official-artifact-general-tension',
    schemaVersion: 'official-reading-artifact-test',
    snapshotId: currentSnapshot.snapshotId,
    taxonomy: { tier: 'T8', category: 'general', subcategory: 'tension_conclusion' },
    claimType: 'GENERAL_NATAL_CONCLUSION_TENSION',
    subject: 'natal_chart',
    predicate: 'consumer_conclusion',
    value: {
      conclusionKind: 'tension',
      headline: '실행과 준비의 긴장',
      summary,
      futureTimingAuthorized: false,
    },
    methodologyRef: { id: 'method-official-artifact', version: '1' },
    ruleRefs: [
      {
        ruleId: 'rule-official-artifact',
        version: '1',
        evaluationId: 'eval-official-artifact',
      },
    ],
    factRefs: [],
    upstreamClaimRefs: [],
    sourceRefs: ['source-official-artifact'],
    state: 'active',
  };
  const interpretation: InterpretationExecutionResult = {
    ...base,
    claims: [claim],
    claimRelations: [],
    integrity: { valid: true, errors: [] },
    evidenceIndex: {},
  };
  const evidence: GovernedReadingEvidenceBundleV1 = {
    requestId: 'official-artifact-reading',
    purpose: 'full_reading',
    snapshotId: currentSnapshot.snapshotId,
    interpretationRunId: interpretation.run.interpretationRunId,
    registrySnapshotId: 'registry-official-artifact',
    canonicalFacts: [],
    claims: [claim],
    claimRelations: [],
    schemaVersion: GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
    constraints: {
      mayRecalculate: false,
      mayInventRules: false,
      mustPreserveMethodDifferences: true,
      mustDiscloseMaterialAmbiguity: true,
    },
  };
  const semantics = buildCanonicalReadingSemanticBundleV1({
    intent: { domain: 'general', temporalScope: 'natal' },
    evidence,
    targetClaimIds: [claim.claimId],
  });
  const plan = buildOfficialReadingPlanV1(semantics);
  const report = renderOfficialReadingV1(semantics, plan);
  return { currentSnapshot, interpretation, semantics, plan, report };
}

function conciseFixture() {
  const currentSnapshot = snapshot();
  const registry = createI7SeasonalSupportRegistry();
  const base = runInterpretation(currentSnapshot, registry, {
    requestId: 'official-artifact-concise-interpretation',
    now: new Date('2026-09-23T00:01:00.000Z'),
  });
  const claim: InterpretationClaim = {
    claimId: 'claim-official-artifact-general-month-branch',
    schemaVersion: 'official-reading-artifact-concise-test',
    snapshotId: currentSnapshot.snapshotId,
    taxonomy: {
      tier: 'T8',
      category: 'general',
      subcategory: 'month_branch_structural_context',
    },
    claimType: GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
    subject: 'natal_chart',
    predicate: 'month_branch_structural_context',
    value: {
      relation: 'peer',
      structuralRelationship: 'same_element',
      headline: '월지와 일간이 같은 오행 관계입니다',
      summary:
        '월지의 오행이 일간과 같은 오행으로 연결됩니다. 이 관찰은 월지라는 한 구조축을 설명할 뿐, 명식 전체의 강약이나 길흉을 확정하지 않습니다.',
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
        ruleId: 'rule-official-artifact-general-month-branch',
        version: '1',
        evaluationId: 'eval-official-artifact-general-month-branch',
      },
    ],
    factRefs: ['pillars.month.branch', 'pillars.day.stem'],
    upstreamClaimRefs: [],
    sourceRefs: ['source-official-artifact-general'],
    state: 'active',
  };
  const interpretation: InterpretationExecutionResult = {
    ...base,
    claims: [claim],
    claimRelations: [],
    integrity: { valid: true, errors: [] },
    evidenceIndex: {},
  };
  const evidence: GovernedReadingEvidenceBundleV1 = {
    requestId: 'official-artifact-concise-reading',
    purpose: 'full_reading',
    snapshotId: currentSnapshot.snapshotId,
    interpretationRunId: interpretation.run.interpretationRunId,
    registrySnapshotId: 'registry-official-artifact-concise',
    canonicalFacts: [],
    claims: [claim],
    claimRelations: [],
    schemaVersion: GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
    constraints: {
      mayRecalculate: false,
      mayInventRules: false,
      mustPreserveMethodDifferences: true,
      mustDiscloseMaterialAmbiguity: true,
    },
  };
  const qualifierBinding: CanonicalReadingSemanticQualifierBindingV1 = {
    targetClaimId: claim.claimId,
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
      canonicalText: {
        summary:
          '월지는 명식을 읽을 때 중요한 구조축으로 보되, 그것만으로 명식 전체를 단독 판정하지 않습니다. 통근 범위에서의 월지 우선성도 모든 뿌리의 보편 순위나 수치 가중치로 확장하지 않습니다.',
      },
      prohibitedExtensions: [
        'monthBranchExclusiveAuthority',
        'universalRootOrdering',
        'numericMonthBranchMultiplier',
        'strengthClassifier',
      ],
      provenance: {
        admissionId: 'preview-admit-r012-month-branch-priority-qualifier-v1',
        admissionRegistryVersion: 'artifact-concise-test',
        researchId: 'R012_MONTH_BRANCH_PRIORITY',
        researchVersion: '0.2.0-research',
        authorityState: 'VERIFIED_BOUNDED_DIRECT_VISUAL_CLOSURE_COMPLETE',
      },
    },
  };
  const semantics = buildCanonicalReadingSemanticBundleV1({
    intent: { domain: 'general', temporalScope: 'natal' },
    evidence,
    targetClaimIds: [claim.claimId],
    semanticQualifierBindings: [qualifierBinding],
  });
  const plan = buildOfficialReadingPlanV1(semantics);
  const report = renderOfficialReadingV1(semantics, plan, {
    preferredDetail: 'concise',
  });
  return { currentSnapshot, interpretation, semantics, plan, report };
}

describe('Official Reading Artifact V1', () => {
  it('packages Official Reading report content without semantic rewriting and pins provenance', () => {
    const { currentSnapshot, interpretation, semantics, plan, report } = fixture();
    const artifact = assembleOfficialReadingArtifactV1(
      currentSnapshot,
      interpretation,
      semantics,
      plan,
      report,
      {
        readingVersion: 'official-reading-artifact-test-v1',
        displayLabel: '테스트 사용자',
        generatedAt: new Date('2026-09-23T00:02:00.000Z'),
      },
    );

    expect(artifact.schemaVersion).toBe(OFFICIAL_READING_ARTIFACT_SCHEMA_VERSION);
    expect(report.structuralRealizationPolicyVersion).toBe(
      OFFICIAL_READING_STRUCTURAL_REALIZATION_POLICY_VERSION,
    );
    expect(report.ordinaryMultiClaimPresentationPolicyVersion).toBe(
      OFFICIAL_READING_ORDINARY_MULTI_CLAIM_PRESENTATION_POLICY_VERSION,
    );
    expect(report.structuredInsightMaterializationPolicyVersion).toBe(
      OFFICIAL_READING_STRUCTURED_INSIGHT_MATERIALIZATION_POLICY_VERSION,
    );
    expect(report.explainabilityBindingPolicyVersion).toBe(
      OFFICIAL_READING_EXPLAINABILITY_BINDING_POLICY_VERSION,
    );
    expect(report.sourceSummaryPresentationPolicyVersion).toBeUndefined();
    expect(artifact.readingId).toMatch(/^official_reading_[a-f0-9]{24}$/u);
    expect(artifact.status).toBe(
      currentSnapshot.completeness.fullyResolved ? 'ready' : 'ready_with_ambiguity',
    );
    expect(artifact.sections).toEqual(report.sections);
    expect(artifact.disclosures).toEqual(report.disclosures);
    expect(artifact.explainability).toEqual(report.explainability);
    expect(artifact.provenance).toEqual({
      snapshotId: currentSnapshot.snapshotId,
      interpretationRunId: interpretation.run.interpretationRunId,
      readingVersion: 'official-reading-artifact-test-v1',
      canonicalSemanticHash: semantics.semanticHash,
      officialReadingPlanHash: plan.planHash,
      officialReadingReportId: report.reportId,
      officialReadingReportHash: report.reportHash,
      contentAuthority: 'official_reading',
    });
    expect(artifact.provenance).not.toHaveProperty('narrativeRunId');
    expect(artifact.generatedAt).toBe('2026-09-23T00:02:00.000Z');

    const shell = buildReadingArtifactShell(currentSnapshot, {
      displayLabel: '테스트 사용자',
    });
    expect(artifact.brand).toEqual(shell.brand);
    expect(artifact.subject).toEqual(shell.subject);
    expect(artifact.calculationSummary).toEqual(shell.calculationSummary);
  });

  it('keeps Official artifact identity stable across audit timestamps', () => {
    const { currentSnapshot, interpretation, semantics, plan, report } = fixture();
    const first = assembleOfficialReadingArtifactV1(
      currentSnapshot,
      interpretation,
      semantics,
      plan,
      report,
      {
        readingVersion: 'official-reading-artifact-test-v1',
        generatedAt: new Date('2026-09-23T00:02:00.000Z'),
      },
    );
    const second = assembleOfficialReadingArtifactV1(
      currentSnapshot,
      interpretation,
      semantics,
      plan,
      report,
      {
        readingVersion: 'official-reading-artifact-test-v1',
        generatedAt: new Date('2026-09-24T00:02:00.000Z'),
      },
    );

    expect(second.readingId).toBe(first.readingId);
    expect(second.generatedAt).not.toBe(first.generatedAt);
  });

  it('fails closed when report content or report identity is not bound to its declared hash', () => {
    const { currentSnapshot, interpretation, semantics, plan, report } = fixture();

    expect(() =>
      assembleOfficialReadingArtifactV1(
        currentSnapshot,
        interpretation,
        semantics,
        plan,
        { ...report, reportHash: 'tampered-report-hash' },
        { readingVersion: 'official-reading-artifact-test-v1' },
      ),
    ).toThrow(/report hash is invalid/u);

    expect(() =>
      assembleOfficialReadingArtifactV1(
        currentSnapshot,
        interpretation,
        semantics,
        plan,
        { ...report, reportId: 'official_reading_report_tampered' },
        { readingVersion: 'official-reading-artifact-test-v1' },
      ),
    ).toThrow(/report identity is invalid/u);
  });

  it('rejects a report that declares a different structural realization policy', () => {
    const { currentSnapshot, interpretation, semantics, plan, report } = fixture();

    expect(() =>
      assembleOfficialReadingArtifactV1(
        currentSnapshot,
        interpretation,
        semantics,
        plan,
        {
          ...report,
          structuralRealizationPolicyVersion: 'tampered-policy' as never,
        },
        { readingVersion: 'official-reading-artifact-test-v1' },
      ),
    ).toThrow(/structural realization policy version/u);
  });

  it('rejects a report that declares a different ordinary multi-claim presentation policy', () => {
    const { currentSnapshot, interpretation, semantics, plan, report } = fixture();

    expect(() =>
      assembleOfficialReadingArtifactV1(
        currentSnapshot,
        interpretation,
        semantics,
        plan,
        {
          ...report,
          ordinaryMultiClaimPresentationPolicyVersion: 'tampered-policy' as never,
        },
        { readingVersion: 'official-reading-artifact-test-v1' },
      ),
    ).toThrow(/ordinary multi-claim presentation policy version/u);
  });

  it('rejects a report that declares a different structured insight materialization policy', () => {
    const { currentSnapshot, interpretation, semantics, plan, report } = fixture();

    expect(() =>
      assembleOfficialReadingArtifactV1(
        currentSnapshot,
        interpretation,
        semantics,
        plan,
        {
          ...report,
          structuredInsightMaterializationPolicyVersion: 'tampered-policy' as never,
        },
        { readingVersion: 'official-reading-artifact-test-v1' },
      ),
    ).toThrow(/structured insight materialization policy version/u);
  });

  it('accepts governed detail fallback metadata and rejects a tampered resolution', () => {
    const { currentSnapshot, interpretation, semantics, plan } = fixture();
    const report = renderOfficialReadingV1(semantics, plan, {
      preferredDetail: 'concise',
    });

    expect(() =>
      assembleOfficialReadingArtifactV1(
        currentSnapshot,
        interpretation,
        semantics,
        plan,
        report,
        { readingVersion: 'official-reading-artifact-test-v1' },
      ),
    ).not.toThrow();

    expect(() =>
      assembleOfficialReadingArtifactV1(
        currentSnapshot,
        interpretation,
        semantics,
        plan,
        {
          ...report,
          detailPreferenceResolution: {
            ...report.detailPreferenceResolution!,
            fallbackReason: 'missing_expansion_material',
          },
        },
        { readingVersion: 'official-reading-artifact-test-v1' },
      ),
    ).toThrow(/detail preference resolution does not match/u);
  });

  it('accepts exact concise registry metadata and rejects a tampered profile-set identity', () => {
    const { currentSnapshot, interpretation, semantics, plan, report } =
      conciseFixture();

    expect(report.detailPreferenceResolution).toEqual({
      requestedDetail: 'concise',
      resolvedDetail: 'concise',
      resolution: 'exact',
    });
    expect(report.concisePresentationProfileSetHash).toMatch(
      /^[0-9a-f]{64}$/u,
    );

    expect(() =>
      assembleOfficialReadingArtifactV1(
        currentSnapshot,
        interpretation,
        semantics,
        plan,
        report,
        { readingVersion: 'official-reading-artifact-concise-test-v1' },
      ),
    ).not.toThrow();

    expect(() =>
      assembleOfficialReadingArtifactV1(
        currentSnapshot,
        interpretation,
        semantics,
        plan,
        {
          ...report,
          concisePresentationProfileSetHash: '0'.repeat(64),
        },
        { readingVersion: 'official-reading-artifact-concise-test-v1' },
      ),
    ).toThrow(/concise presentation metadata does not match/u);
  });

  it('accepts exact governed detailed metadata and rejects tampered detailed authority', () => {
    const { currentSnapshot, interpretation, semantics, plan } =
      conciseFixture();
    const report = renderApprovedDetailedOfficialReadingV1(
      semantics,
      plan,
    );

    expect(report.detailPreferenceResolution).toEqual({
      requestedDetail: 'detailed',
      resolvedDetail: 'detailed',
      resolution: 'exact',
    });
    expect(report.detailedRealizationPolicyVersion).toBe(
      OFFICIAL_READING_DETAILED_REALIZATION_POLICY_VERSION,
    );

    expect(() =>
      assembleOfficialReadingArtifactV1(
        currentSnapshot,
        interpretation,
        semantics,
        plan,
        report,
        { readingVersion: 'official-reading-artifact-detailed-test-v1' },
      ),
    ).not.toThrow();

    expect(() =>
      assembleOfficialReadingArtifactV1(
        currentSnapshot,
        interpretation,
        semantics,
        plan,
        {
          ...report,
          detailedRealizationPolicyVersion: 'tampered-policy' as never,
        },
        { readingVersion: 'official-reading-artifact-detailed-test-v1' },
      ),
    ).toThrow(/detailed presentation metadata does not match/u);

    const reportWithoutDetailedPolicy = { ...report };
    delete reportWithoutDetailedPolicy.detailedRealizationPolicyVersion;
    expect(() =>
      assembleOfficialReadingArtifactV1(
        currentSnapshot,
        interpretation,
        semantics,
        plan,
        reportWithoutDetailedPolicy,
        { readingVersion: 'official-reading-artifact-detailed-test-v1' },
      ),
    ).toThrow(/detailed presentation metadata does not match/u);
  });

  it('rejects a report that declares a different source-summary presentation policy', () => {
    const { currentSnapshot, interpretation, semantics, plan, report } = fixture();

    expect(() =>
      assembleOfficialReadingArtifactV1(
        currentSnapshot,
        interpretation,
        semantics,
        plan,
        {
          ...report,
          sourceSummaryPresentationPolicyVersion: 'tampered-policy' as never,
        },
        { readingVersion: 'official-reading-artifact-test-v1' },
      ),
    ).toThrow(/source-summary presentation policy version/u);
  });

  it('rejects a report that declares a different explainability binding policy', () => {
    const { currentSnapshot, interpretation, semantics, plan, report } = fixture();

    expect(() =>
      assembleOfficialReadingArtifactV1(
        currentSnapshot,
        interpretation,
        semantics,
        plan,
        {
          ...report,
          explainabilityBindingPolicyVersion: 'tampered-policy' as never,
        },
        { readingVersion: 'official-reading-artifact-test-v1' },
      ),
    ).toThrow(/explainability binding policy version/u);
  });

  it('rejects a valid report produced from different canonical meaning', () => {
    const first = fixture('의미 A');
    const second = fixture('의미 B');

    expect(() =>
      assembleOfficialReadingArtifactV1(
        first.currentSnapshot,
        first.interpretation,
        first.semantics,
        first.plan,
        second.report,
        { readingVersion: 'official-reading-artifact-test-v1' },
      ),
    ).toThrow(/semantic hash does not match/u);
  });
});
