import type {
  SajuEngineAuthorityIntakeContract,
  SajuEngineImplementationEvidence,
} from '../interpretation/saju-engine-authority-intake.js';
import {
  evaluateSajuEngineAuthorityIntake,
} from '../interpretation/saju-engine-authority-intake.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildRelationshipSpouseT8BoundedEngineDevelopmentAdmission,
} from './relationship-spouse-t8-bounded-engine-development-admission.js';
import {
  buildRelationshipSpouseT8EngineGovernanceHandoff,
} from './relationship-spouse-t8-engine-governance-handoff.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_BOUNDARY,
} from './relationship-spouse-t8-source-bound-runtime.js';

export const RELATIONSHIP_SPOUSE_T8_G2A_ADMITTED_HANDOFF_VERSION =
  'myeonghwa-relationship-spouse-t8-g2a-admitted-handoff-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_INITIAL_ENGINE_IMPLEMENTATION_EVIDENCE =
  Object.freeze({
    producerRuntimeExists: false,
    compositionIntegrated: false,
    deterministicGuardsComplete: false,
    e2eComplete: false,
  } as const satisfies SajuEngineImplementationEvidence);

export function createRelationshipSpouseT8G2AAdmittedContract(): SajuEngineAuthorityIntakeContract {
  const admission =
    buildRelationshipSpouseT8BoundedEngineDevelopmentAdmission();
  const governance =
    buildRelationshipSpouseT8EngineGovernanceHandoff();

  if (
    admission.boundedEngineDevelopmentAdmitted !== true ||
    admission.admittedAuthorityRef === undefined ||
    admission.admittedMethodologyRef === undefined ||
    admission.admittedRuleClaimContractRef === undefined
  ) {
    throw new Error(
      'Spouse T8 G2A handoff requires the exact bounded Engine-development admission refs.',
    );
  }

  return Object.freeze({
    capabilityKey: admission.capabilityKey,
    upstreamDisposition: 'ADMITTED' as const,
    admittedAuthorityRef: Object.freeze({
      ...admission.admittedAuthorityRef,
    }),
    requiredInputs: governance.governedClaimBoundary.requiredInputs,
    allowedClaims: governance.governedClaimBoundary.allowedClaims,
    forbiddenClaims: governance.governedClaimBoundary.forbiddenClaims,
    methodologyRef: Object.freeze({
      ...admission.admittedMethodologyRef,
    }),
    ruleClaimContractRef: Object.freeze({
      ...admission.admittedRuleClaimContractRef,
    }),
    runtimePrerequisites:
      governance.governedClaimBoundary.runtimePrerequisites,
    negativeCases: governance.governedClaimBoundary.negativeCases,
  });
}

export function evaluateRelationshipSpouseT8G2AAdmittedHandoff(
  evidence: SajuEngineImplementationEvidence =
    RELATIONSHIP_SPOUSE_T8_INITIAL_ENGINE_IMPLEMENTATION_EVIDENCE,
) {
  const admission =
    buildRelationshipSpouseT8BoundedEngineDevelopmentAdmission();
  const contract = createRelationshipSpouseT8G2AAdmittedContract();
  const evaluation =
    evaluateSajuEngineAuthorityIntake(contract, evidence);

  const researchRuntimeObserved =
    RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_BOUNDARY.sourceBindingMaterialized ===
      true &&
    RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_BOUNDARY.runtimeScope ===
      'isolated_research_only';

  const currentInitialP0RoutingValid =
    evidence.producerRuntimeExists === false &&
    evidence.compositionIntegrated === false &&
    evidence.deterministicGuardsComplete === false &&
    evidence.e2eComplete === false &&
    evaluation.authorityContractComplete === true &&
    evaluation.routing === 'P0_RUNTIME' &&
    evaluation.implementationMayProceed === true;

  const material = Object.freeze({
    handoffVersion:
      RELATIONSHIP_SPOUSE_T8_G2A_ADMITTED_HANDOFF_VERSION,
    issue: '#1780' as const,
    boundedAdmissionRef: Object.freeze({
      ...admission.admittedAuthorityRef!,
    }),
    contract,
    implementationEvidence: Object.freeze({ ...evidence }),
    g2aEvaluation: evaluation,
    researchRuntimeBoundary: Object.freeze({
      sourceBoundRuntimeObserved: researchRuntimeObserved,
      sourceBoundRuntimeScope:
        RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_BOUNDARY.runtimeScope,
      researchRuntimeCountsAsEngineProducer: false as const,
      researchRuntimeMaySkipP0Runtime: false as const,
    }),
    currentInitialP0RoutingValid,
    authorityBoundary: Object.freeze({
      independentHumanDomainReviewEstablished: false as const,
      reviewerTrustGrantEstablished: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      lifecyclePromotionAuthorized: false as const,
      previewExpansionAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      publicSemanticAuthorityAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: currentInitialP0RoutingValid
      ? ('IMPLEMENT_ENGINE_P0_SPOUSE_T8_PRODUCER' as const)
      : ('REPAIR_G2A_HANDOFF_OR_ENGINE_EVIDENCE' as const),
  });

  return Object.freeze({
    handoffId: deterministicContentHash(material),
    ...material,
  });
}

export function buildRelationshipSpouseT8G2AAdmittedHandoff() {
  return evaluateRelationshipSpouseT8G2AAdmittedHandoff(
    RELATIONSHIP_SPOUSE_T8_INITIAL_ENGINE_IMPLEMENTATION_EVIDENCE,
  );
}
