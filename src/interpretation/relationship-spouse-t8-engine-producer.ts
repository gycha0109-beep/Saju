import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import {
  runInterpretation,
  type InterpretationExecutionResult,
  type InterpretationRunOptions,
} from './interpretation-engine.js';
import type { SajuEngineImplementationEvidence } from './saju-engine-authority-intake.js';
import { deterministicContentHash } from './rule-registry.js';
import {
  buildRelationshipSpouseT8BoundedEngineDevelopmentAdmission,
} from '../research/relationship-spouse-t8-bounded-engine-development-admission.js';
import {
  buildRelationshipSpouseT8G2AAdmittedHandoff,
  evaluateRelationshipSpouseT8G2AAdmittedHandoff,
} from '../research/relationship-spouse-t8-g2a-admitted-handoff.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
} from '../research/relationship-spouse-t8-source-bound-runtime.js';

export const RELATIONSHIP_SPOUSE_T8_ENGINE_PRODUCER_VERSION =
  'myeonghwa-relationship-spouse-t8-engine-producer-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_ENGINE_PRODUCER_IMPLEMENTATION_EVIDENCE =
  Object.freeze({
    producerRuntimeExists: true,
    compositionIntegrated: false,
    deterministicGuardsComplete: false,
    e2eComplete: false,
  } as const satisfies SajuEngineImplementationEvidence);

function sameRef(
  left:
    | {
        readonly id: string;
        readonly version: string;
        readonly contentHash: string;
      }
    | undefined,
  right:
    | {
        readonly id: string;
        readonly version: string;
        readonly contentHash: string;
      }
    | undefined,
): boolean {
  return (
    left !== undefined &&
    right !== undefined &&
    left.id === right.id &&
    left.version === right.version &&
    left.contentHash === right.contentHash
  );
}

export function buildRelationshipSpouseT8EngineProducerBinding() {
  const admission =
    buildRelationshipSpouseT8BoundedEngineDevelopmentAdmission();
  const handoff = buildRelationshipSpouseT8G2AAdmittedHandoff();
  const registry = RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY;
  const methodologyRef = registry.snapshot.methodologies[0];

  const boundedAdmissionValid =
    admission.boundedEngineDevelopmentAdmitted === true &&
    admission.admittedAuthorityRef !== undefined &&
    admission.admittedMethodologyRef !== undefined &&
    admission.admittedRuleClaimContractRef !== undefined;

  const g2aP0GateValid =
    handoff.contract.upstreamDisposition === 'ADMITTED' &&
    handoff.g2aEvaluation.authorityContractComplete === true &&
    handoff.g2aEvaluation.routing === 'P0_RUNTIME' &&
    handoff.g2aEvaluation.implementationMayProceed === true &&
    handoff.currentInitialP0RoutingValid === true;

  const admittedAuthorityRefMatches =
    sameRef(
      handoff.contract.admittedAuthorityRef,
      admission.admittedAuthorityRef,
    );

  const admittedMethodologyRefMatches =
    sameRef(handoff.contract.methodologyRef, admission.admittedMethodologyRef) &&
    sameRef(handoff.contract.methodologyRef, methodologyRef);

  const admittedRuleClaimContractRefMatches =
    sameRef(
      handoff.contract.ruleClaimContractRef,
      admission.admittedRuleClaimContractRef,
    );

  const registrySnapshotMatchesAdmission =
    admission.registrySnapshotId === registry.snapshot.registrySnapshotId;

  const exactRegistryShape =
    registry.snapshot.methodologies.length === 1 &&
    registry.snapshot.rules.length === 2 &&
    registry.snapshot.sources.length === 2 &&
    registry.pack.status === 'research';

  const engineProducerReady =
    boundedAdmissionValid &&
    g2aP0GateValid &&
    admittedAuthorityRefMatches &&
    admittedMethodologyRefMatches &&
    admittedRuleClaimContractRefMatches &&
    registrySnapshotMatchesAdmission &&
    exactRegistryShape;

  const material = Object.freeze({
    producerVersion: RELATIONSHIP_SPOUSE_T8_ENGINE_PRODUCER_VERSION,
    issue: '#1782' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    boundedAdmissionRef: admission.admittedAuthorityRef,
    methodologyRef: handoff.contract.methodologyRef,
    ruleClaimContractRef: handoff.contract.ruleClaimContractRef,
    registrySnapshotId: registry.snapshot.registrySnapshotId,
    bindingChecks: Object.freeze({
      boundedAdmissionValid,
      g2aP0GateValid,
      admittedAuthorityRefMatches,
      admittedMethodologyRefMatches,
      admittedRuleClaimContractRefMatches,
      registrySnapshotMatchesAdmission,
      exactRegistryShape,
    }),
    executionBoundary: Object.freeze({
      engineOwnedExecutionSurface: true as const,
      genericInterpretationEngineUsed: true as const,
      researchRuntimeWrapperDelegatedTo: false as const,
      admittedRegistrySemanticMaterialReused: true as const,
      rulesReauthoredInEngine: false as const,
      newSajuSemanticsAuthorized: false as const,
    }),
    authorityBoundary: Object.freeze({
      compositionIntegrated: false as const,
      deterministicGuardsComplete: false as const,
      e2eComplete: false as const,
      previewExpansionAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      publicSemanticAuthorityAuthorized: false as const,
      lifecyclePromotionAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    engineProducerReady,
  });

  return Object.freeze({
    bindingId: deterministicContentHash(material),
    ...material,
  });
}

export function runRelationshipSpouseT8EngineProducer(
  snapshot: CanonicalSajuSnapshot,
  options: InterpretationRunOptions = {},
): InterpretationExecutionResult {
  const binding = buildRelationshipSpouseT8EngineProducerBinding();
  if (!binding.engineProducerReady) {
    throw new Error(
      'Relationship Spouse T8 Engine producer requires the exact admitted P0 binding.',
    );
  }

  return runInterpretation(
    snapshot,
    RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
    options,
  );
}

export function buildRelationshipSpouseT8EngineProducerCompletionEvidence() {
  const binding = buildRelationshipSpouseT8EngineProducerBinding();
  const g2a = evaluateRelationshipSpouseT8G2AAdmittedHandoff(
    RELATIONSHIP_SPOUSE_T8_ENGINE_PRODUCER_IMPLEMENTATION_EVIDENCE,
  );

  const p0Complete =
    binding.engineProducerReady === true &&
    g2a.g2aEvaluation.authorityContractComplete === true &&
    g2a.g2aEvaluation.routing === 'P1_COMPOSITION' &&
    g2a.g2aEvaluation.implementationMayProceed === true;

  const material = Object.freeze({
    evidenceVersion:
      'myeonghwa-relationship-spouse-t8-p0-engine-producer-evidence-v1' as const,
    issue: '#1782' as const,
    producerBindingId: binding.bindingId,
    implementationEvidence:
      RELATIONSHIP_SPOUSE_T8_ENGINE_PRODUCER_IMPLEMENTATION_EVIDENCE,
    g2aEvaluationHash: g2a.g2aEvaluation.evaluationHash,
    expectedNextRouting: 'P1_COMPOSITION' as const,
    observedNextRouting: g2a.g2aEvaluation.routing,
    p0Complete,
    nextDisposition: p0Complete
      ? ('IMPLEMENT_ENGINE_P1_SPOUSE_T8_COMPOSITION' as const)
      : ('REPAIR_ENGINE_P0_SPOUSE_T8_PRODUCER' as const),
    authorityBoundary: binding.authorityBoundary,
  });

  return Object.freeze({
    evidenceId: deterministicContentHash(material),
    ...material,
  });
}
