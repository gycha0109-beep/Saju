import { describe, expect, test } from 'vitest';
import {
  GENERAL_NATAL_R1_RUNTIME_REACHABILITY_AUDIT_BASE_SHA,
  buildGeneralNatalR1RuntimeReachabilityAudit,
} from '../src/research/general-natal-r1-runtime-reachability-audit.js';

describe('General Natal SAJU-R1 end-to-end runtime reachability audit', () => {
  test('binds to the exact fresh-main audit baseline and the research conclusion candidate', () => {
    const audit = buildGeneralNatalR1RuntimeReachabilityAudit();

    expect(audit.auditBaseSha).toBe(GENERAL_NATAL_R1_RUNTIME_REACHABILITY_AUDIT_BASE_SHA);
    expect(audit.auditBaseSha).toBe('b92a0f1d98e7bddd4554432f1c79191a92b728c8');
    expect(audit.candidate.packId).toBe('PACK-GENERAL-NATAL-CONCLUSION-SYNTHESIS-CANDIDATE');
    expect(audit.candidate.packVersion).toBe('0.2.0-research');
    expect(audit.candidate.packStatus).toBe('research');
    expect(audit.candidate.generalT8ProducerPresent).toBe(true);
    expect(audit.candidate.gyeokgukResolverRequiredForThisCandidate).toBe(false);
  });

  test('proves the general natal reading profile requires T8/general and is selection-authorized', () => {
    const audit = buildGeneralNatalR1RuntimeReachabilityAudit();

    expect(audit.profile.profileId).toBe('myeonghwa-reading-profile-general-natal-v1');
    expect(audit.profile.profileVersion).toBe('1.0.0');
    expect(audit.profile.requiresGeneralT8Claim).toBe(true);
    expect(audit.profile.selectionAuthorizationState).toBe('authorized');
    expect(audit.profile.selectionAuthorizationScope).toBe('reading_evidence_selection_only');
  });

  test('records existing downstream bindings instead of inventing a second reading engine', () => {
    const audit = buildGeneralNatalR1RuntimeReachabilityAudit();

    expect(audit.bindings).toEqual({
      interpretationAndClaimGraph: true,
      readingComposition: true,
      narrativeEvidenceBundle: true,
      groundedNarrative: true,
      readingArtifactExecution: true,
      genericProductHost: true,
    });
    expect(audit.capabilities).toEqual({
      generalT8Candidate: 'RESEARCH_ONLY',
      claimGraph: 'IMPLEMENTED',
      generalNatalDomainProfile: 'IMPLEMENTED',
      profileSelectionAuthorization: 'IMPLEMENTED',
      evidenceSelection: 'IMPLEMENTED',
      narrativeEvidenceBundle: 'IMPLEMENTED',
      groundedNarrativeOrchestration: 'IMPLEMENTED',
      readingArtifactAssembly: 'IMPLEMENTED',
      genericProductHost: 'IMPLEMENTED',
      authorizedProductionHostAdmission: 'BLOCKED',
    });
  });

  test('locates the first production-facing blocker at the existing #730 authority frontier', () => {
    const audit = buildGeneralNatalR1RuntimeReachabilityAudit();

    expect(audit.production.inspectionStatus).toBe('blocked');
    expect(audit.production.blockerCodes).toContain('INTERPRETATION_PACK_NOT_PRODUCTION');
    expect(audit.production.interpretationPackNotProduction).toBe(true);
    expect(audit.production.firstRuntimeBlocker).toBe(
      'GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_ADMISSION_AUTHORITY',
    );
    expect(audit.production.governingIssue).toBe(730);
    expect(audit.production.productionState).toBe('HOLD');
    expect(audit.nextAction).toBe('NEEDS_BOUNDED_RESEARCH');
  });

  test('is deterministic and preserves all fail-closed non-authorities', () => {
    const first = buildGeneralNatalR1RuntimeReachabilityAudit();
    const second = buildGeneralNatalR1RuntimeReachabilityAudit();

    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first.guardrails).toEqual({
      lifecyclePromotionPerformed: false,
      productionPackCreated: false,
      executionPlanWeakened: false,
      narrativeSemanticsChanged: false,
      llmGapFillingAuthorized: false,
      gyeokgukAuthorityAdded: false,
      commerceBehaviorChanged: false,
    });
  });
});
