import type {
  ClaimTypeDefinition,
  ClaimValueSchemaDefinition,
  InterpretationPack,
  MethodologyDefinition,
  MethodologyResearchEvidenceInputContract,
  RuleDefinition,
  RuleInputRequirement,
} from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_SOURCE as source } from './general-natal-wood-month-command-de-shi-shi-shi-authority.js';
import { WOOD_MONTH_COMMAND_TIMING_EVIDENCE_DEFINITION as definition } from './shared-natal-wood-month-command-timing-research-evidence-adapter.js';

const version = '0.1.0-research';
const methodologyId = 'M-WOOD-MONTH-COMMAND-TIMING';
const ruleSetId = 'saju-r35-wood-month-command-timing';
const schemaId = 'day_master.wood_month_command_timing.schema';
const definitionRef = { id: definition.definitionId, version: definition.version };
export const WOOD_MONTH_COMMAND_TIMING_CLAIM_TYPE = 'DAY_MASTER_WOOD_MONTH_COMMAND_TIMING';
export const WOOD_MONTH_COMMAND_TIMING_SOURCES = [
  {
    sourceId: definition.sourceIds[0],
    sourceType: 'web',
    title: `${source.title}: ${source.section}`,
    language: 'zh-Hant',
    url: source.url,
    accessedAt: source.accessedAt,
    provenanceTier: 'cross_reference',
    rights: { copyrightStatus: 'unknown', reusePolicy: 'metadata_only' },
    notes:
      'Transcription with commentary. Existing bounded matcher authority only; source strata are not adjudicated.',
  },
] as const;
const researchInput = {
  source: 'research_evidence',
  evidenceType: definition.evidenceType,
  evidenceVersion: definition.evidenceVersion,
  definitionRef,
  mode: 'allowed',
  rationale: 'Only the independently replayed day-master/month-command timing axis is admitted.',
} as const satisfies MethodologyResearchEvidenceInputContract;
const input = {
  key: 'woodMonthCommandTimingEvidence',
  source: 'research_evidence',
  pathOrClaimType: definition.evidenceType,
  required: true,
  ambiguityBehavior: 'requires_resolved',
  evidenceVersion: definition.evidenceVersion,
  researchEvidenceDefinitionRef: definitionRef,
} as const satisfies RuleInputRequirement;
const states = ['de_shi_month_observed', 'shi_shi_month_observed'] as const;
export function woodMonthCommandTimingClaimValue(timingState: (typeof states)[number]) {
  return {
    evidenceKind: 'wood_month_command_timing',
    semanticScope: 'wood_day_master_canonical_month_command_only',
    timingState,
    sourceFactRef: 'pillars.month.branch',
    seasonResolverUsed: false,
    wholeChartWangShuai: 'not_determined',
    qiangRuo: 'not_determined',
    rootEffect: 'not_determined',
    supportEffect: 'not_determined',
    numericStrength: 'not_authorized',
    gyeokguk: 'not_determined',
    narrativeMateriality: false,
    productionAuthority: false,
  } as const;
}
const variants = states.map((timingState) => ({
  timingState,
  value: woodMonthCommandTimingClaimValue(timingState),
}));
export const WOOD_MONTH_COMMAND_TIMING_CLAIM_VALUE_SCHEMA = {
  schemaId,
  version,
  root: {
    kind: 'union',
    anyOf: variants.map(({ value }) => ({
      kind: 'object' as const,
      required: Object.keys(value),
      properties: Object.fromEntries(
        Object.entries(value).map(([key, literal]) => [
          key,
          { kind: 'literal' as const, value: literal },
        ]),
      ),
      additionalProperties: false,
    })),
  },
} as const satisfies ClaimValueSchemaDefinition;
export const WOOD_MONTH_COMMAND_TIMING_CLAIM_TYPE_DEFINITION = {
  claimType: WOOD_MONTH_COMMAND_TIMING_CLAIM_TYPE,
  version,
  valueSchemaRef: { id: schemaId, version },
  scope: 'natal',
  exclusiveValue: true,
  scenarioSensitive: true,
  materialForNarrative: false,
  allowedTaxonomyTiers: ['T2'],
} as const satisfies ClaimTypeDefinition;
export const WOOD_MONTH_COMMAND_TIMING_METHODOLOGY = {
  methodologyId,
  version,
  family: 'day_master_strength',
  name: 'Bounded Wood month-command timing',
  description:
    'Execute the existing governed 甲乙 × 寅卯/申酉 timing matcher without extending it to a chart classifier.',
  assumptions: [
    'Pinned master metadata and day-pillar parity plus canonical resolved month-branch metadata are required.',
    'Other Wood months are unresolved; non-Wood masters are outside scope. Missing inputs do not become negative timing.',
    'Root/support, year/hour branches, season resolution and Twelve Growth Stage do not enter this predicate.',
    'Timing does not authorize final 旺衰/強弱, effect, weight, 格局, Narrative or Production.',
  ],
  requiredFactTypes: [],
  inputContract: { researchEvidenceInputs: [researchInput] },
  sourceIds: WOOD_MONTH_COMMAND_TIMING_SOURCES.map((s) => s.sourceId),
  status: 'research',
} as const satisfies MethodologyDefinition;
export const WOOD_MONTH_COMMAND_TIMING_RULES = variants.map(
  ({ timingState, value }, index): RuleDefinition => ({
    ruleId: `RULE-SAJU-R35-WOOD-MONTH-COMMAND-TIMING-${index}`,
    version,
    ruleSetId,
    taxonomy: {
      tier: 'T2',
      category: 'day_master_strength',
      subcategory: 'wood_month_command_timing',
    },
    methodologyRef: { id: methodologyId, version },
    title: `Wood month-command ${timingState}`,
    description:
      'Scoped actual timing verdict, independently replayed from canonical month and day master.',
    inputs: [input],
    condition: {
      op: 'eq',
      left: { kind: 'input', key: input.key, path: 'timingState' },
      right: { kind: 'literal', value: timingState },
    },
    output: {
      claimType: WOOD_MONTH_COMMAND_TIMING_CLAIM_TYPE,
      subject: 'day_master',
      predicate: 'wood_month_command_timing_observed',
      value,
      polarity: 'neutral',
      emphasis: 'minor',
      tags: ['research', 'month-command-timing', 'wood-only'],
    },
    sourceRefs: WOOD_MONTH_COMMAND_TIMING_SOURCES.map((s) => ({
      sourceId: s.sourceId,
      supportType: 'interpretive_basis',
      notes: 'Existing selected-source matcher scope only.',
    })),
    quality: {
      provenanceQuality: 'secondary_only',
      testCoverage: 'fixture_matrix',
      methodologyStability: 'contested',
      reviewerStatus: 'unreviewed',
    },
    status: 'research',
  }),
);
export const WOOD_MONTH_COMMAND_TIMING_PACK = {
  packId: 'PACK-SAJU-R35-WOOD-MONTH-COMMAND-TIMING-RESEARCH',
  version,
  name: 'SAJU-R35 Wood Month-Command Timing Research Pack',
  methodologyRefs: [{ id: methodologyId, version }],
  enabledRuleSets: [ruleSetId],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'skip_requires_resolved',
  compositionPolicyRef: { id: 'COMPOSITION-SAJU-R35-WOOD-MONTH-COMMAND-TIMING-RESEARCH', version },
  claimContractMode: 'registered_required',
  status: 'research',
} as const satisfies InterpretationPack;
export function createWoodMonthCommandTimingResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: WOOD_MONTH_COMMAND_TIMING_RULES,
      methodologies: [WOOD_MONTH_COMMAND_TIMING_METHODOLOGY],
      sources: [...WOOD_MONTH_COMMAND_TIMING_SOURCES],
      claimTypeDefinitions: [WOOD_MONTH_COMMAND_TIMING_CLAIM_TYPE_DEFINITION],
      claimValueSchemas: [WOOD_MONTH_COMMAND_TIMING_CLAIM_VALUE_SCHEMA],
      reviewAttestations: [],
    },
    WOOD_MONTH_COMMAND_TIMING_PACK,
    createdAt,
  );
}
