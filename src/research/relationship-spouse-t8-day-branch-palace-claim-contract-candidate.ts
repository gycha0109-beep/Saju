import type {
  ClaimTypeDefinition,
  ClaimValueSchemaDefinition,
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
} from '../contracts/interpretation.js';
import {
  createRuleRegistrySnapshot,
} from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_DIRECT_BASIS_SOURCE_LINKS,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY_SOURCE_IDS,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SOURCE_MANIFEST_CANDIDATE_SOURCES,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_TARGET_RULE_ID,
} from './relationship-spouse-t8-day-branch-palace-source-manifest-candidate.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_VERSION =
  '2.0.0' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE =
  'relationship.spouse.traditional_spouse_palace_position' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_SCHEMA_ID =
  'relationship.spouse.traditional_spouse_palace_position.schema' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY_ID =
  'relationship-spouse-t8-day-branch-spouse-palace-position' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE_SET_ID =
  'relationship-spouse-t8-day-branch-palace-2-0-research' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_VALUE_SCHEMA =
  Object.freeze({
    schemaId: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_SCHEMA_ID,
    version: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_VERSION,
    root: {
      kind: 'object',
      required: ['position', 'traditionalRole', 'semanticScope'],
      properties: {
        position: {
          kind: 'literal',
          value: 'day_branch',
        },
        traditionalRole: {
          kind: 'literal',
          value: 'spouse_palace',
        },
        semanticScope: {
          kind: 'literal',
          value: 'position_only',
        },
      },
      additionalProperties: false,
    },
  } as const satisfies ClaimValueSchemaDefinition);

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION =
  Object.freeze({
    claimType: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
    version: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_VERSION,
    valueSchemaRef: {
      id: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_SCHEMA_ID,
      version: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_VERSION,
    },
    scope: 'natal',
    exclusiveValue: true,
    scenarioSensitive: false,
    materialForNarrative: false,
    allowedTaxonomyTiers: ['T8'],
  } as const satisfies ClaimTypeDefinition);

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY =
  Object.freeze({
    methodologyId:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY_ID,
    version: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_VERSION,
    family: 'domain_synthesis',
    name: 'Day-Branch traditional spouse-palace positional methodology',
    description:
      'Research-only semantic successor that recognizes only the resolved natal Day Branch as the traditional spouse-palace position. It does not select a spouse star or infer partner characteristics, relationship events, timing, quality, or compatibility.',
    assumptions: Object.freeze([
      'Only a resolved natal Day Pillar is consumed.',
      'The Day Branch is used only as a traditional spouse-palace positional convention.',
      'The claim does not authorize spouse-star selection, partner identity or personality, marriage timing or outcome, favorable/unfavorable palace judgment, Yongsin/Jisin semantics, or second-chart compatibility.',
      'Position determination does not consume native sex, partner sex, relationship role, household role, or subject intent.',
    ] as const),
    requiredFactTypes: Object.freeze(['pillars.day'] as const),
    inputContract: {
      factInputs: [
        {
          source: 'canonical_fact',
          pathPattern: 'pillars.day',
          mode: 'required',
          rationale:
            'A resolved canonical Day Pillar is required so the rule can confirm that branch.value exists before emitting the positional semantic marker.',
        },
      ],
    },
    sourceIds:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY_SOURCE_IDS,
    status: 'research',
  } as const satisfies MethodologyDefinition);

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE =
  Object.freeze({
    ruleId: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_TARGET_RULE_ID,
    version: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_VERSION,
    ruleSetId: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE_SET_ID,
    taxonomy: {
      tier: 'T8',
      category: 'relationship',
      subcategory: 'spouse',
    },
    methodologyRef: {
      id: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY_ID,
      version: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_VERSION,
    },
    title: 'Day Branch traditional spouse-palace position',
    description:
      'If the natal Day Pillar is resolved and contains a Day Branch, emit one neutral position-only marker that the Day Branch is the traditional spouse-palace position.',
    inputs: [
      {
        key: 'relationship_spouse_day_pillar',
        source: 'canonical_fact',
        pathOrClaimType: 'pillars.day',
        acceptedStatuses: ['resolved'],
        required: true,
        ambiguityBehavior: 'requires_resolved',
      },
    ],
    condition: {
      op: 'exists',
      value: {
        kind: 'input',
        key: 'relationship_spouse_day_pillar',
        path: 'branch.value',
      },
    },
    output: {
      claimType: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
      subject: 'native_chart',
      predicate: 'traditional_spouse_palace_position',
      value: {
        position: 'day_branch',
        traditionalRole: 'spouse_palace',
        semanticScope: 'position_only',
      },
      polarity: 'neutral',
      tags: [
        'relationship',
        'spouse',
        'spouse_palace',
        'day_branch',
        'position_only',
        'research_only',
      ],
    },
    sourceRefs:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_DIRECT_BASIS_SOURCE_LINKS,
    quality: {
      provenanceQuality: 'multi_source_supported',
      testCoverage: 'fixture_matrix',
      methodologyStability: 'stable_within_method',
      reviewerStatus: 'unreviewed',
    },
    status: 'research',
  } as const satisfies RuleDefinition);

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK =
  Object.freeze({
    packId:
      'relationship-spouse-t8-day-branch-palace-research-candidate',
    version: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_VERSION,
    name: 'Relationship Spouse T8 Day-Branch spouse-palace 2.0 research candidate',
    methodologyRefs: [
      {
        id: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY_ID,
        version:
          RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_VERSION,
      },
    ],
    enabledRuleSets: [
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE_SET_ID,
    ],
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'skip_requires_resolved',
    compositionPolicyRef: {
      id: 'relationship-spouse-t8-day-branch-palace-research-policy',
      version:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_VERSION,
    },
    claimContractMode: 'registered_required',
    status: 'research',
  } as const satisfies InterpretationPack);

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE =
  createRuleRegistrySnapshot(
    {
      rules: [RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE],
      methodologies: [RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY],
      sources:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SOURCE_MANIFEST_CANDIDATE_SOURCES,
      claimTypeDefinitions: [
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
      ],
      claimValueSchemas: [
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_VALUE_SCHEMA,
      ],
      reviewAttestations: [],
    },
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK,
  );

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_BOUNDARY =
  Object.freeze({
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_VERSION,
    runtimeScope: 'materialized_research_candidate_only' as const,
    resolvedDayPillarRequired: true as const,
    spouseStarSelectorAuthorized: false as const,
    partnerIdentityOrPersonalityInferenceAuthorized: false as const,
    nativeSexInputRequired: false as const,
    partnerSexInputRequired: false as const,
    marriageTimingOrOutcomeInferenceAuthorized: false as const,
    favorableUnfavorablePalaceJudgmentAuthorized: false as const,
    yongsinJisinOrGungSeongImportAuthorized: false as const,
    secondChartCompatibilityAuthorized: false as const,
    narrativeConsumerActivated: false as const,
    previewDefaultRouteChanged: false as const,
    bridgeAdmissionAuthorized: false as const,
    stagingAuthorized: false as const,
    officialReadingAuthorityAuthorized: false as const,
    productionAuthorityAuthorized: false as const,
    production: 'HOLD' as const,
  });
