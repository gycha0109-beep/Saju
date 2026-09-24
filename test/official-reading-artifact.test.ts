import { describe, expect, it } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  createI7SeasonalSupportRegistry,
  runInterpretation,
  type CalculationPolicySnapshot,
  type CanonicalSajuSnapshot,
  type InterpretationClaim,
  type InterpretationExecutionResult,
  GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
  type GovernedReadingEvidenceBundleV1,
} from '../src/index.js';
import { buildCanonicalReadingSemanticBundleV1 } from '../src/reading/canonical-reading-semantics.js';
import {
  assembleOfficialReadingArtifactV1,
  OFFICIAL_READING_ARTIFACT_SCHEMA_VERSION,
} from '../src/reading/official-reading-artifact.js';
import { buildOfficialReadingPlanV1 } from '../src/reading/official-reading-plan.js';
import { renderOfficialReadingV1 } from '../src/reading/official-reading-renderer.js';
import { buildReadingArtifactShell } from '../src/reading/reading-artifact-shell.js';

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
