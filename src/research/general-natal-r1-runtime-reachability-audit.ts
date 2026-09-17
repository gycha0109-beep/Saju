import { runInterpretation } from '../interpretation/interpretation-engine.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { generateGroundedNarrative } from '../llm/narrative-orchestrator.js';
import { buildNarrativeEvidenceBundle } from '../narrative/evidence-selector.js';
import { createMyeonghwaProductHost } from '../host/product-host.js';
import { inspectMyeonghwaProductionComposition } from '../production/production-composition.js';
import { executeProductReading } from '../reading/governed-reading-execution.js';
import { resolveDomainReadingProfile } from '../reading/reading-intent-composition.js';
import {
  resolveReadingProfileSelectionAuthorization,
} from '../reading/reading-profile-authorization.js';
import { buildReadingCompositionEvidence } from '../reading/scenario-aware-reading-composition.js';
import {
  GENERAL_NATAL_CONCLUSION_PACK,
  GENERAL_NATAL_CONCLUSION_RULES,
  createGeneralNatalConclusionCandidateRegistry,
} from './general-natal-conclusion-synthesis-candidate.js';

export const GENERAL_NATAL_R1_RUNTIME_REACHABILITY_AUDIT_VERSION = '1.0.0' as const;
export const GENERAL_NATAL_R1_RUNTIME_REACHABILITY_AUDIT_BASE_SHA =
  'b92a0f1d98e7bddd4554432f1c79191a92b728c8' as const;

export type GeneralNatalR1CapabilityState =
  | 'IMPLEMENTED'
  | 'RESEARCH_ONLY'
  | 'BLOCKED';

export interface GeneralNatalR1RuntimeReachabilityAudit {
  evidenceId: string;
  auditVersion: typeof GENERAL_NATAL_R1_RUNTIME_REACHABILITY_AUDIT_VERSION;
  auditBaseSha: typeof GENERAL_NATAL_R1_RUNTIME_REACHABILITY_AUDIT_BASE_SHA;
  candidate: {
    packId: string;
    packVersion: string;
    packStatus: string;
    generalT8ProducerPresent: boolean;
    gyeokgukResolverRequiredForThisCandidate: false;
  };
  profile: {
    profileId: string;
    profileVersion: string;
    requiresGeneralT8Claim: boolean;
    selectionAuthorizationState: string;
    selectionAuthorizationScope?: string;
  };
  bindings: {
    interpretationAndClaimGraph: boolean;
    readingComposition: boolean;
    narrativeEvidenceBundle: boolean;
    groundedNarrative: boolean;
    readingArtifactExecution: boolean;
    genericProductHost: boolean;
  };
  capabilities: {
    generalT8Candidate: GeneralNatalR1CapabilityState;
    claimGraph: GeneralNatalR1CapabilityState;
    generalNatalDomainProfile: GeneralNatalR1CapabilityState;
    profileSelectionAuthorization: GeneralNatalR1CapabilityState;
    evidenceSelection: GeneralNatalR1CapabilityState;
    narrativeEvidenceBundle: GeneralNatalR1CapabilityState;
    groundedNarrativeOrchestration: GeneralNatalR1CapabilityState;
    readingArtifactAssembly: GeneralNatalR1CapabilityState;
    genericProductHost: GeneralNatalR1CapabilityState;
    authorizedProductionHostAdmission: GeneralNatalR1CapabilityState;
  };
  production: {
    inspectionStatus: 'blocked' | 'ready';
    blockerCodes: readonly string[];
    interpretationPackNotProduction: boolean;
    firstRuntimeBlocker: 'GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_ADMISSION_AUTHORITY';
    governingIssue: 730;
    productionState: 'HOLD';
  };
  nextAction: 'NEEDS_BOUNDED_RESEARCH';
  guardrails: {
    lifecyclePromotionPerformed: false;
    productionPackCreated: false;
    executionPlanWeakened: false;
    narrativeSemanticsChanged: false;
    llmGapFillingAuthorized: false;
    gyeokgukAuthorityAdded: false;
    commerceBehaviorChanged: false;
  };
}

function generalNatalProfileRequiresT8(): {
  profileId: string;
  profileVersion: string;
  requiresGeneralT8Claim: boolean;
  selectionAuthorizationState: string;
  selectionAuthorizationScope?: string;
} {
  const resolved = resolveDomainReadingProfile({ domain: 'general', temporalScope: 'natal' });
  if (resolved === undefined) {
    throw new Error('General natal DomainReadingProfile is not available.');
  }

  const requiresGeneralT8Claim = resolved.profile.requiredClaimSelectors.some(
    (group) =>
      group.requirementId === 'NATAL_DOMAIN_SYNTHESIS_CLAIM_REQUIRED' &&
      group.anyOf.some(
        (selector) =>
          selector.taxonomy?.tiers?.includes('T8') === true &&
          selector.taxonomy?.categories?.includes('general') === true,
      ),
  );
  const authorization = resolveReadingProfileSelectionAuthorization(resolved.profileRef);

  return {
    profileId: resolved.profile.profileId,
    profileVersion: resolved.profile.version,
    requiresGeneralT8Claim,
    selectionAuthorizationState: authorization.state,
    ...(authorization.authorization === undefined
      ? {}
      : { selectionAuthorizationScope: authorization.authorization.scope }),
  };
}

export function buildGeneralNatalR1RuntimeReachabilityAudit(): GeneralNatalR1RuntimeReachabilityAudit {
  const registry = createGeneralNatalConclusionCandidateRegistry();
  const profile = generalNatalProfileRequiresT8();
  const productionInspection = inspectMyeonghwaProductionComposition({ registry });
  const blockerCodes =
    productionInspection.status === 'blocked'
      ? productionInspection.blockers.map((blocker) => blocker.code).sort()
      : [];
  const interpretationPackNotProduction = blockerCodes.includes('INTERPRETATION_PACK_NOT_PRODUCTION');
  const generalT8ProducerPresent = GENERAL_NATAL_CONCLUSION_RULES.some(
    (rule) => rule.taxonomy.tier === 'T8' && rule.taxonomy.category === 'general',
  );

  const bindings = {
    interpretationAndClaimGraph: typeof runInterpretation === 'function',
    readingComposition: typeof buildReadingCompositionEvidence === 'function',
    narrativeEvidenceBundle: typeof buildNarrativeEvidenceBundle === 'function',
    groundedNarrative: typeof generateGroundedNarrative === 'function',
    readingArtifactExecution: typeof executeProductReading === 'function',
    genericProductHost: typeof createMyeonghwaProductHost === 'function',
  };

  const capabilities = {
    generalT8Candidate: 'RESEARCH_ONLY' as const,
    claimGraph: bindings.interpretationAndClaimGraph ? ('IMPLEMENTED' as const) : ('BLOCKED' as const),
    generalNatalDomainProfile:
      profile.requiresGeneralT8Claim ? ('IMPLEMENTED' as const) : ('BLOCKED' as const),
    profileSelectionAuthorization:
      profile.selectionAuthorizationState === 'authorized'
        ? ('IMPLEMENTED' as const)
        : ('BLOCKED' as const),
    evidenceSelection: bindings.readingComposition ? ('IMPLEMENTED' as const) : ('BLOCKED' as const),
    narrativeEvidenceBundle:
      bindings.narrativeEvidenceBundle ? ('IMPLEMENTED' as const) : ('BLOCKED' as const),
    groundedNarrativeOrchestration:
      bindings.groundedNarrative ? ('IMPLEMENTED' as const) : ('BLOCKED' as const),
    readingArtifactAssembly:
      bindings.readingArtifactExecution ? ('IMPLEMENTED' as const) : ('BLOCKED' as const),
    genericProductHost: bindings.genericProductHost ? ('IMPLEMENTED' as const) : ('BLOCKED' as const),
    authorizedProductionHostAdmission:
      interpretationPackNotProduction ? ('BLOCKED' as const) : ('IMPLEMENTED' as const),
  };

  const material = {
    auditVersion: GENERAL_NATAL_R1_RUNTIME_REACHABILITY_AUDIT_VERSION,
    auditBaseSha: GENERAL_NATAL_R1_RUNTIME_REACHABILITY_AUDIT_BASE_SHA,
    candidate: {
      packId: GENERAL_NATAL_CONCLUSION_PACK.packId,
      packVersion: GENERAL_NATAL_CONCLUSION_PACK.version,
      packStatus: GENERAL_NATAL_CONCLUSION_PACK.status,
      generalT8ProducerPresent,
      gyeokgukResolverRequiredForThisCandidate: false as const,
    },
    profile,
    bindings,
    capabilities,
    production: {
      inspectionStatus: productionInspection.status,
      blockerCodes,
      interpretationPackNotProduction,
      firstRuntimeBlocker: 'GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_ADMISSION_AUTHORITY' as const,
      governingIssue: 730 as const,
      productionState: 'HOLD' as const,
    },
    nextAction: 'NEEDS_BOUNDED_RESEARCH' as const,
    guardrails: {
      lifecyclePromotionPerformed: false as const,
      productionPackCreated: false as const,
      executionPlanWeakened: false as const,
      narrativeSemanticsChanged: false as const,
      llmGapFillingAuthorized: false as const,
      gyeokgukAuthorityAdded: false as const,
      commerceBehaviorChanged: false as const,
    },
  };

  return {
    evidenceId: `general_natal_r1_reachability_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
