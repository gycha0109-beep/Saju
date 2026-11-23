import type {
  ClaimTypeDefinition,
  ClaimValueSchemaDefinition,
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  RuleExpression,
  SourceReference,
} from '../contracts/interpretation.js';
import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import type { RuleRegistryInput } from '../interpretation/rule-registry.js';

const VERSION = '0.1.0-research';
const RULE_SET = 'general-temporal-branch-layer-research';
const PERIODS = ['annual', 'before_jeol', 'after_jeol'] as const;
const SLOTS = ['month', 'day'] as const;
const STATES = ['aligned_clash', 'aligned_combination', 'mixed'] as const;
const SOURCE = {
  sourceId: 'SRC-JAPYEONG-JINJEON-BRANCH-LAYERS',
  sourceType: 'classical_text',
  title: '子平真詮 論刑沖會合解法・論行運',
  language: 'zh-Hant',
  locator: { section: '七、論刑沖會合解法 / 二十五、論行運' },
  url: 'https://www.donglishuzhai.net/chapter/3720.html',
  provenanceTier: 'primary',
  notes:
    'Overlapping branch contacts may change the reading. This methodology compares local signals without establishing resolution, transformation, strength or outcome.',
} satisfies SourceReference;

export interface BranchLayerValue {
  period: (typeof PERIODS)[number];
  slot: (typeof SLOTS)[number];
  state: (typeof STATES)[number];
}

const SCHEMA = {
  schemaId: 'SCHEMA-GENERAL-TEMPORAL-BRANCH-LAYERS-V1',
  version: '1.0.0',
  root: {
    kind: 'object',
    required: ['period', 'slot', 'state'],
    properties: {
      period: { kind: 'string', enum: PERIODS },
      slot: { kind: 'string', enum: SLOTS },
      state: { kind: 'string', enum: STATES },
    },
    additionalProperties: false,
  },
} satisfies ClaimValueSchemaDefinition;

export const BRANCH_LAYER_CLAIM = {
  claimType: 'GENERAL_TEMPORAL_BRANCH_LAYERS',
  version: '1.0.0',
  valueSchemaRef: { id: SCHEMA.schemaId, version: SCHEMA.version },
  scope: 'period',
  exclusiveValue: false,
  scenarioSensitive: false,
  materialForNarrative: true,
  allowedTaxonomyTiers: ['T9'],
} satisfies ClaimTypeDefinition;

export function branchLayerFactPath(period: BranchLayerValue['period']) {
  return `branchLayers.${period}`;
}

const COPY = {
  aligned_clash: {
    headline: '같은 자리에 변화 압력이 겹치는 때',
    summary: '기존에 맞춰 온 방식과 새로 조정할 몫을 구분해 볼 시기로 읽습니다.',
  },
  aligned_combination: {
    headline: '같은 자리에서 맞물리는 조건이 거듭 보이는 때',
    summary: '이미 맞물린 역할이나 일정에서 무엇을 함께 이어갈 수 있는지 살펴봅니다.',
  },
  mixed: {
    headline: '맞추려는 조건과 바꾸려는 조건이 함께 걸리는 때',
    summary:
      '합과 충이 원국의 같은 자리에 걸립니다. 계속 맞춰 갈 조건과 조정해야 할 조건을 함께 보며, 어느 쪽이 우세한지 판정은 보류합니다.',
  },
};

const PROFILES: readonly ClaimNarrativeProfile[] = STATES.map((state) => ({
  profileId: `PROFILE-GENERAL-T9-BRANCH-LAYERS-${state}`,
  claimType: BRANCH_LAYER_CLAIM.claimType,
  version: VERSION,
  semanticKeys: ['period', 'slot', 'state'],
  allowedEpistemicTypes: ['future_tendency'],
  requiredMethodAttribution: true,
  templates: [
    { templateKey: 'headline', language: 'ko', text: COPY[state].headline },
    { templateKey: 'summary', language: 'ko', text: COPY[state].summary },
  ],
}));

export function branchLayerCopy(state: BranchLayerValue['state'], key: 'headline' | 'summary') {
  const profile = PROFILES.find(
    (item) => item.profileId === `PROFILE-GENERAL-T9-BRANCH-LAYERS-${state}`,
  );
  const text = profile?.templates?.find((template) => template.templateKey === key)?.text;
  if (!text) throw new TypeError('Missing Korean branch layer narrative.');
  return text;
}

function condition(value: BranchLayerValue): RuleExpression {
  const { period, slot, state } = value;
  const primary = period === 'annual' ? 'annual' : 'monthly';
  const backgrounds = period === 'annual' ? ['dayun'] : ['annual', 'dayun'];
  const matches = (layer: string, relation: 'clash' | 'combination' | 'none'): RuleExpression => ({
    op: 'eq',
    left: { kind: 'input', key: 'layers', path: `positions.${slot}.${layer}` },
    right: { kind: 'literal', value: relation },
  });
  const has = (layers: readonly string[], relation: 'clash' | 'combination'): RuleExpression => ({
    op: 'or',
    expressions: layers.map((layer) => matches(layer, relation)),
  });
  const either = [primary, ...backgrounds];
  if (state === 'mixed')
    return {
      op: 'and',
      expressions: [
        { op: 'not', expression: matches(primary, 'none') },
        has(either, 'combination'),
        has(either, 'clash'),
      ],
    };
  const relation = state === 'aligned_clash' ? 'clash' : 'combination';
  const opposite = relation === 'clash' ? 'combination' : 'clash';
  return {
    op: 'and',
    expressions: [
      matches(primary, relation),
      has(backgrounds, relation),
      { op: 'not', expression: has(backgrounds, opposite) },
    ],
  };
}

export function addBranchLayerRules(
  scope: 'annual' | 'monthly',
  themeClaimType: string,
  input: RuleRegistryInput,
  pack: InterpretationPack,
) {
  if (pack.status !== 'research')
    throw new TypeError('Branch layer rules require a research pack.');
  const periods = scope === 'annual' ? PERIODS.slice(0, 1) : PERIODS.slice(1);
  const methodology: MethodologyDefinition = {
    methodologyId: `M-GENERAL-TEMPORAL-BRANCH-LAYERS-${scope.toUpperCase()}`,
    version: VERSION,
    family: 'time_dynamics',
    name: 'Branch contacts in overlapping natal, Dayun and calendar layers',
    description:
      'Compares traditional branch contacts that meet at the same resolved natal position.',
    assumptions: [
      'The active year follows the Li Chun instant; monthly periods use the exact Jeol window.',
      'Dayun must cover the reference instant or the entire Jeol window being interpreted.',
      'The selected period must contact the natal position alongside at least one distinct time layer.',
      'A contrary contact suspends a directional reading; contact does not establish transformation.',
    ],
    requiredFactTypes: [],
    sourceIds: [SOURCE.sourceId],
    status: 'research',
  };
  const rules = periods.flatMap((period) =>
    SLOTS.flatMap((slot) =>
      STATES.map((state): RuleDefinition => {
        const value: BranchLayerValue = { period, slot, state };
        return {
          ruleId: `RULE-GENERAL-T9-BRANCH-LAYERS-${period}-${slot}-${state}`,
          ruleSetId: RULE_SET,
          version: VERSION,
          taxonomy: { tier: 'T9', category: 'general', subcategory: scope },
          methodologyRef: { id: methodology.methodologyId, version: VERSION },
          title: branchLayerCopy(state, 'headline'),
          description: methodology.description,
          inputs: [
            {
              key: 'layers',
              source: 'temporal_fact',
              pathOrClaimType: branchLayerFactPath(period),
              required: true,
              ambiguityBehavior: 'requires_resolved',
            },
            {
              key: 'theme',
              source: 'interpretation_claim',
              pathOrClaimType: themeClaimType,
              required: true,
              cardinality: 'exactly_one',
              ambiguityBehavior: 'requires_resolved',
              ...(period === 'annual'
                ? {}
                : { claimSelector: { valueEquals: [{ path: 'segmentId', value: period }] } }),
            },
          ],
          condition: condition(value),
          output: {
            claimType: BRANCH_LAYER_CLAIM.claimType,
            subject: 'natal_chart',
            predicate: 'overlapping_branch_contacts',
            value,
            polarity: 'neutral',
            emphasis: 'moderate',
            tags: ['research', 'temporal', 'natal-branch-layers'],
          },
          sourceRefs: [{ sourceId: SOURCE.sourceId, supportType: 'interpretive_basis' }],
          quality: {
            provenanceQuality: 'heuristic',
            testCoverage: 'fixture_matrix',
            methodologyStability: 'contested',
            reviewerStatus: 'unreviewed',
          },
          status: 'research',
        };
      }),
    ),
  );
  return {
    input: {
      ...input,
      rules: [...input.rules, ...rules],
      methodologies: [...input.methodologies, methodology],
      sources: [...(input.sources ?? []), SOURCE],
      claimTypeDefinitions: [...(input.claimTypeDefinitions ?? []), BRANCH_LAYER_CLAIM],
      claimValueSchemas: [...(input.claimValueSchemas ?? []), SCHEMA],
    },
    pack: {
      ...pack,
      version: `${pack.version}.branch-layers`,
      methodologyRefs: [
        ...pack.methodologyRefs,
        { id: methodology.methodologyId, version: VERSION },
      ],
      enabledRuleSets: [...pack.enabledRuleSets, RULE_SET],
    },
  };
}
