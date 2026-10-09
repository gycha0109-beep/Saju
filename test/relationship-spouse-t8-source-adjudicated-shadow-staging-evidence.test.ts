import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { describe, expect, test } from 'vitest';
import {
  buildRelationshipSpouseT8SourceAdjudicatedShadowStagingEvidence,
} from '../src/research/relationship-spouse-t8-source-adjudicated-shadow-staging-evidence.js';

const evidence =
  buildRelationshipSpouseT8SourceAdjudicatedShadowStagingEvidence();

describe('Relationship / Spouse T8 source-adjudicated shadow staging evidence', () => {
  test('binds exact Research 1.0.1, Engine READY, and Staging 1.1.0 lineage', () => {
    expect(evidence.engineHardeningEvidenceId).toMatch(/^[a-f0-9]{64}$/);
    expect(evidence.lineage.researchRuntimeVersion).toBe('1.0.1');
    expect(evidence.lineage.stagingRuntimeVersion).toBe('1.1.0');
    expect(evidence.lineage.researchRegistrySnapshotId).toMatch(
      /^registry_[a-f0-9]{24}$/,
    );
    expect(evidence.lineage.stagingRegistrySnapshotId).toMatch(
      /^registry_[a-f0-9]{24}$/,
    );
    expect(evidence.lineage.researchRegistrySnapshotId).not.toBe(
      evidence.lineage.stagingRegistrySnapshotId,
    );
    expect(evidence.lineage.policyRef.contentHash).toMatch(/^[a-f0-9]{64}$/);
    expect(evidence.lineage.candidateRef.contentHash).toMatch(/^[a-f0-9]{64}$/);
    expect(evidence.lineage.governanceDecisionRef.contentHash).toMatch(
      /^[a-f0-9]{64}$/,
    );
    expect(evidence.lineage.executionAuthorityRef.contentHash).toMatch(
      /^[a-f0-9]{64}$/,
    );
    expect(evidence.checks.exactLineageBound).toBe(true);
  });

  test('covers both canonical Day Master polarities with exact semantic parity and oracle checks', () => {
    expect(evidence.canonicalCases).toHaveLength(2);
    expect(
      new Set(evidence.canonicalCases.map((item) => item.dayMasterPolarity)),
    ).toEqual(new Set(['양', '음']));

    for (const item of evidence.canonicalCases) {
      expect(item.dayMasterStatus).toBe('resolved');
      expect(item.engine.claimCount).toBe(1);
      expect(item.research.claimCount).toBe(1);
      expect(item.staging.claimCount).toBe(1);
      expect(item.semanticParity).toBe(true);
      expect(item.claimCountParity).toBe(true);
      expect(item.expectedSemanticMatch).toBe(true);
      expect(item.staging.exactScopeOnly).toBe(true);
      expect(item.staging.authorizationRecorded).toBe(true);
      expect(item.lifecycleIdentitySeparated).toBe(true);
      expect(item.casePass).toBe(true);

      expect(item.engine.semanticHash).toBe(item.research.semanticHash);
      expect(item.research.semanticHash).toBe(item.staging.semanticHash);
      expect(item.staging.sourceAdjudicationAuthorityRef).toEqual(
        evidence.lineage.executionAuthorityRef,
      );
    }

    expect(evidence.checks.canonicalPolarityCoverage).toBe(true);
    expect(evidence.checks.canonicalYangParity).toBe(true);
    expect(evidence.checks.canonicalYinParity).toBe(true);
  });

  test('fails closed identically for ambiguous, unavailable, pending, and missing Day Master', () => {
    expect(evidence.failClosedCases.map((item) => item.caseId)).toEqual([
      'ambiguous-day-master',
      'unavailable-day-master',
      'pending-day-master',
      'missing-day-master',
    ]);

    for (const item of evidence.failClosedCases) {
      expect(item.engine.outcome).toBe('insufficient_evidence');
      expect(item.engine.claimCount).toBe(0);
      expect(item.engine.preparationState).toBe('insufficient_evidence');
      expect(item.research.claimCount).toBe(0);
      expect(item.staging.claimCount).toBe(0);
      expect(item.engineFailClosed).toBe(true);
      expect(item.researchFailClosed).toBe(true);
      expect(item.stagingFailClosed).toBe(true);
      expect(item.casePass).toBe(true);
    }

    expect(evidence.checks.failClosedParity).toBe(true);
  });

  test('records deterministic execution independently within all three lanes', () => {
    expect(evidence.checks.engineDeterministic).toBe(true);
    expect(evidence.checks.researchDeterministic).toBe(true);
    expect(evidence.checks.stagingDeterministic).toBe(true);

    for (const item of evidence.canonicalCases) {
      expect(item.engine.deterministic).toBe(true);
      expect(item.research.deterministic).toBe(true);
      expect(item.staging.deterministic).toBe(true);
    }
  });

  test('preserves scope, source roles, factual quality metadata, and narrative boundary', () => {
    expect(evidence.checks.scopeIsolationPreserved).toBe(true);
    expect(evidence.checks.sourceRolePreserved).toBe(true);
    expect(evidence.checks.qualityMetadataNotInflated).toBe(true);
    expect(evidence.checks.noNarrativeExpansion).toBe(true);
  });

  test('satisfies Gate 14 without activating Preview, Official Reading, or Production', () => {
    expect(evidence.blockers).toEqual([]);
    expect(evidence.requiredShadowStagingEvidenceComplete).toBe(true);
    expect(evidence.gate14Resolution).toEqual({
      gateId: 'REQUIRED_SHADOW_STAGING_EVIDENCE_COMPLETE',
      status: 'SATISFIED',
    });
    expect(evidence.checks.previewOfficialProductionHeld).toBe(true);
    expect(evidence.authorityBoundary).toEqual({
      humanDomainReviewEstablished: false,
      reviewerTrustGrantEstablished: false,
      reviewerStatusPromotionAuthorized: false,
      provenanceQualityPromotionAuthorized: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      production: 'HOLD',
    });
    expect(evidence.nextDisposition).toBe(
      'REASSESS_PRODUCTION_PROVENANCE_SEPARATELY',
    );
  });

  test('produces a deterministic content-addressed evidence artifact', () => {
    const { evidenceId, ...material } = evidence;

    expect(evidenceId).toMatch(/^[a-f0-9]{64}$/);
    expect(evidenceId).toBe(deterministicContentHash(material));
  });
});
