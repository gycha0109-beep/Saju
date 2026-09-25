import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type {
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  RuleSourceLink,
} from '../contracts/interpretation.js';
import {
  runInterpretation,
  type InterpretationExecutionResult,
  type InterpretationRunOptions,
} from '../interpretation/interpretation-engine.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE_DEFINITION,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_VALUE_SCHEMA,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES,
} from './relationship-spouse-t8-runtime-admission.js';
import {
  RELATIONSHIP_SPOUSE_T8_RUNTIME_METHODOLOGY_SOURCE_IDS,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_RULE_SOURCE_BINDINGS,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_SOURCES,
} from './relationship-spouse-t8-runtime-source-manifest.js';

export const RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION = '1.0.1' as const;

function sourceRefsForRule(ruleId: string): readonly RuleSourceLink[] {
  const binding = RELATIONSHIP_SPOUSE_T8_RUNTIME_RULE_SOURCE_BINDINGS.find(
    (candidate) => candidate.ruleId === ruleId,
  );
  if (binding === undefined) {
    throw new Error(`Missing reviewed Spouse T8 runtime source binding for rule ${ruleId}`);
  }
  return binding.sourceRefs;
}

export const RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_METHODOLOGY = Object.freeze({
  ...RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY,
  version: RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION,
  sourceIds: RELATIONSHIP_SPOUSE_T8_RUNTIME_METHODOLOGY_SOURCE_IDS,
} as const satisfies MethodologyDefinition);

export const RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_RULES = Object.freeze(
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES.map(
    (rule) =>
      Object.freeze({
        ...rule,
        version: RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION,
        methodologyRef: {
          ...rule.methodologyRef,
          version: RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION,
        },
        sourceRefs: sourceRefsForRule(rule.ruleId),
      }) satisfies RuleDefinition,
  ),
);

export const RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_PACK = Object.freeze({
  ...RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK,
  version: RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION,
  name: 'Relationship Spouse T8 isolated source-bound research runtime',
  methodologyRefs: [
    {
      id: RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_METHODOLOGY.methodologyId,
      version: RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION,
    },
  ],
} as const satisfies InterpretationPack);

export const RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY =
  createRuleRegistrySnapshot(
    {
      rules: RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_RULES,
      methodologies: [RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_METHODOLOGY],
      sources: RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_SOURCES,
      claimTypeDefinitions: [RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE_DEFINITION],
      claimValueSchemas: [RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_VALUE_SCHEMA],
    },
    RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_PACK,
  );

export const RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_BOUNDARY = Object.freeze({
  historicalRuntimeVersionPreserved: '1.0.0' as const,
  sourceBoundRuntimeVersion: RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION,
  sourceBindingMaterialized: true as const,
  registeredSourceCount:
    RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.sources.length,
  methodologySourceCount:
    RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_METHODOLOGY.sourceIds.length,
  ruleSourceBindingCount:
    RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_RULES.reduce(
      (count, rule) => count + rule.sourceRefs.length,
      0,
    ),
  runtimeScope: 'isolated_research_only' as const,
  reviewerStatusChanged: false as const,
  lifecyclePromotionAuthorized: false as const,
  productionSourceTierEligibility: false as const,
  consumerNarrativeActivated: false as const,
  compatibilityConsumerActivated: false as const,
  previewDefaultRouteChanged: false as const,
  officialReadingAuthorityAuthorized: false as const,
  productionAdmissionAuthorized: false as const,
  productionState: 'HOLD' as const,
});

export function runRelationshipSpouseT8SourceBoundRuntime(
  snapshot: CanonicalSajuSnapshot,
  options: InterpretationRunOptions = {},
): InterpretationExecutionResult {
  return runInterpretation(
    snapshot,
    RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
    options,
  );
}
