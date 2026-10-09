import type { VersionedRef } from '../contracts/common.js';
import type {
  MethodologyResearchEvidenceInputContract,
  RuleInputRequirement,
} from '../contracts/interpretation.js';
import {
  SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_DEFINITION,
  SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_TYPE,
  SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_VERSION,
} from './shared-natal-bounded-root-research-evidence-adapter.js';

export const SHARED_NATAL_BOUNDED_ROOT_RESEARCH_CONSUMER_INPUT_CONTRACT_VERSION =
  'myeonghwa-shared-natal-bounded-root-research-consumer-input-contract-v1' as const;

export const SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_DEFINITION_REF = Object.freeze({
  id: SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_DEFINITION.definitionId,
  version: SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_DEFINITION.version,
}) satisfies VersionedRef;

export const SHARED_NATAL_BOUNDED_ROOT_METHODOLOGY_RESEARCH_INPUT = Object.freeze({
  source: 'research_evidence',
  evidenceType: SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_TYPE,
  evidenceVersion: SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_VERSION,
  definitionRef: SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_DEFINITION_REF,
  mode: 'allowed',
  rationale:
    'Allows the exact snapshot-bound R2 bounded positive root observation envelope as research-only structural input. It does not settle canonical 四柱有根, infer 無根, assign root count/position weight, or classify 黨眾/助寡/強弱/旺衰/格局.',
}) satisfies MethodologyResearchEvidenceInputContract;

export const SHARED_NATAL_BOUNDED_ROOT_RULE_INPUT_REQUIREMENT = Object.freeze({
  key: 'boundedPositiveRootEvidence',
  source: 'research_evidence',
  pathOrClaimType: SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_TYPE,
  required: true,
  ambiguityBehavior: 'requires_resolved',
  evidenceVersion: SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_VERSION,
  researchEvidenceDefinitionRef:
    SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_DEFINITION_REF,
}) satisfies RuleInputRequirement;

export const SHARED_NATAL_BOUNDED_ROOT_RESEARCH_CONSUMER_INPUT_CONTRACT = Object.freeze({
  contractVersion:
    SHARED_NATAL_BOUNDED_ROOT_RESEARCH_CONSUMER_INPUT_CONTRACT_VERSION,
  evidenceBinding: Object.freeze({
    evidenceType: SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_TYPE,
    evidenceVersion: SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_VERSION,
    definitionRef: SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_DEFINITION_REF,
    authority: SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_DEFINITION.authority,
    snapshotBinding:
      SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_DEFINITION.snapshotBinding,
  }),
  methodologyInput: SHARED_NATAL_BOUNDED_ROOT_METHODOLOGY_RESEARCH_INPUT,
  ruleInput: SHARED_NATAL_BOUNDED_ROOT_RULE_INPUT_REQUIREMENT,
  authorityBoundary: Object.freeze({
    exactEvidenceBindingRequired: true as const,
    researchOnlyConsumption: true as const,
    canonicalSizhuHasRootSettlementAuthorized: false as const,
    noRootInferenceAuthorized: false as const,
    observationCountSemanticsAuthorized: false as const,
    positionWeightingAuthorized: false as const,
    dangZhongSettlementAuthorized: false as const,
    qiangRuoClassificationAuthorized: false as const,
    wangShuaiClassificationAuthorized: false as const,
    gyeokgukDerivationAuthorized: false as const,
    semanticClaimEmissionAuthorized: false as const,
    runtimeRouteActivationAuthorized: false as const,
    narrativeMaterialityAuthorized: false as const,
    previewAuthorityAuthorized: false as const,
    officialReadingAuthorityAuthorized: false as const,
    publicSemanticAuthorityAuthorized: false as const,
    productionFactEmissionAuthorized: false as const,
    productionClaimEmissionAuthorized: false as const,
    productionPackConsumptionAuthorized: false as const,
    productionAuthorityPromoted: false as const,
    externalHumanDomainReviewRequired: false as const,
  }),
});
