import type { TenGod } from '../contracts/calculation.js';
import type {
  ClaimTypeDefinition,
  ClaimValueSchemaDefinition,
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  RuleExpression,
  RuleInputRequirement,
  SourceReference,
} from '../contracts/interpretation.js';
import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import {
  createRuleRegistrySnapshot,
  type RuleRegistryInput,
} from '../interpretation/rule-registry.js';

const VERSION = '0.1.0-research';
export const STEM_INTERACTION_RULE_SET = 'general-temporal-t9-visible-stem-interaction';
const METHOD_ID = 'M-GENERAL-TEMPORAL-T9-VISIBLE-STEM-INTERACTION-V1';
export const TEMPORAL_INTERACTION_NATAL_STEMS = {
  year: 'derivedFacts.tenGods.year.stem',
  month: 'derivedFacts.tenGods.month.stem',
  hour: 'derivedFacts.tenGods.hour.stem',
} as const;
export type StemInteractionNatalSlot = keyof typeof TEMPORAL_INTERACTION_NATAL_STEMS;
const STEM_SLOTS = Object.keys(TEMPORAL_INTERACTION_NATAL_STEMS) as StemInteractionNatalSlot[];
const STEM_INTERACTION_PERIODS = ['annual', 'before_jeol', 'after_jeol'] as const;
type Period = (typeof STEM_INTERACTION_PERIODS)[number];

const NATAL_STEM_INPUTS = STEM_SLOTS.map((slot): RuleInputRequirement => ({
  key: slot,
  source: 'derived_fact',
  pathOrClaimType: TEMPORAL_INTERACTION_NATAL_STEMS[slot],
  required: true,
  ambiguityBehavior: 'requires_resolved',
}));

const SOURCE_BASIS = {
  sourceId: 'SRC-SAMYEONG-TONGHOE-V5-STEM-CONTROL',
  sourceType: 'classical_text',
  title: '三命通會（四庫全書本）卷五',
  author: '萬民英',
  language: 'zh',
  locator: { volume: '五', section: '子平說辯・論正官・論倒食' },
  url: 'https://zh.wikisource.org/wiki/三命通會_(四庫全書本)/卷05',
  provenanceTier: 'primary',
  notes:
    'Supports the exact stem Ten-God control relationships; 論倒食 qualifies the apparent control where a restraining combination or wealth intervenes.',
} satisfies SourceReference;

const SOURCE_TIMING = {
  sourceId: 'SRC-JAPYEONG-JINJEON-TRANSIT-AND-REMEDY',
  sourceType: 'classical_text',
  title: '秘本子平真詮 卷二 論行運',
  author: '沈孝瞻（전승 귀속）',
  language: 'zh',
  locator: { volume: '二', chapter: '二十五、論行運' },
  url: 'https://www.donglishuzhai.net/chapter/3738.html',
  provenanceTier: 'primary',
  notes:
    'Distinguishes a natal Direct Officer structure receiving Hurting Officer and other whole-chart contexts. The written passage concerns 行運; the app applies only the local control relation to the request-scoped stem, including the separately resolved monthly segments.',
} satisfies SourceReference;

const SOURCE_OFFICER_REMEDY = {
  sourceId: 'SRC-JAPYEONG-JINJEON-STRUCTURE-REMEDY',
  sourceType: 'classical_text',
  title: '秘本子平真詮 卷一 論用神成敗救應',
  author: '沈孝瞻（전승 귀속）',
  language: 'zh',
  locator: { volume: '一', chapter: '九、論用神成敗救應' },
  url: 'https://www.donglishuzhai.net/chapter/3722.html',
  provenanceTier: 'primary',
  notes:
    'Records a visible Resource as a possible remedy when Hurting Officer encounters Direct Officer. Its existence does not establish efficacy.',
} satisfies SourceReference;

const STEM_INTERACTION_SOURCES = [SOURCE_BASIS, SOURCE_TIMING, SOURCE_OFFICER_REMEDY] as const;

const PAIRS = {
  hurting_officer_direct_officer: {
    natal: '정관',
    period: '상관',
    mediators: ['정인', '편인'],
    title: '표현과 맡은 책임이 맞물리는 때',
    summary:
      '전통 명리에서는 상관이 정관을 제약하는 관계로 봅니다. 평소 따르는 기준이나 맡은 역할이 있다면, 바꾸고 싶은 점을 표현할 때 그대로 지킬 기준과 새로 제안할 부분을 구분해 볼 수 있습니다.',
    holding:
      '원국 천간에 인성이 드러나 있습니다. 고전에서는 인성이 상관과 정관의 관계를 조절할 가능성을 다루므로, 이 조합 하나로 기간 주제를 좁히는 풀이는 보류합니다.',
  },
  indirect_resource_eating_god: {
    natal: '식신',
    period: '편인',
    mediators: ['정재', '편재'],
    title: '검토와 꾸준한 산출 사이의 균형',
    summary:
      '전통 명리에서는 편인이 식신을 제약할 수 있다고 봅니다. 꾸준히 만들어 오던 일이 있다면, 새 자료나 방식을 검토하는 시간을 실제 결과물을 만드는 시간과 어떻게 배분할지 살펴볼 수 있습니다.',
    holding:
      '원국 천간에 재성이 드러나 있습니다. 고전에서는 재성이 편인의 제약을 조절할 가능성을 다루므로, 검토가 산출을 제약한다는 풀이는 보류합니다.',
  },
} as const satisfies Record<
  string,
  {
    natal: TenGod;
    period: TenGod;
    mediators: readonly TenGod[];
    title: string;
    summary: string;
    holding: string;
  }
>;
type Pair = keyof typeof PAIRS;
const PAIR_IDS = Object.keys(PAIRS) as Pair[];
const STATES = ['conditional', 'held_visible_mediator'] as const;

export interface StemInteractionValue {
  pair: Pair;
  period: Period;
  state: (typeof STATES)[number];
}

export const STEM_INTERACTION_SCHEMA = {
  schemaId: 'SCHEMA-GENERAL-TEMPORAL-STEM-INTERACTION-V1',
  version: '1.0.0',
  root: {
    kind: 'object',
    required: ['pair', 'period', 'state'],
    properties: {
      pair: { kind: 'string', enum: PAIR_IDS },
      period: { kind: 'string', enum: STEM_INTERACTION_PERIODS },
      state: { kind: 'string', enum: STATES },
    },
    additionalProperties: false,
  },
} satisfies ClaimValueSchemaDefinition;

export const STEM_INTERACTION_CLAIM = {
  claimType: 'GENERAL_TEMPORAL_VISIBLE_STEM_CONTROL',
  version: '1.0.0',
  valueSchemaRef: {
    id: STEM_INTERACTION_SCHEMA.schemaId,
    version: STEM_INTERACTION_SCHEMA.version,
  },
  scope: 'period',
  exclusiveValue: false,
  scenarioSensitive: false,
  materialForNarrative: true,
  allowedTaxonomyTiers: ['T9'],
} satisfies ClaimTypeDefinition;

function createStemInteractionMethod(
  scope: 'annual' | 'monthly',
  themeClaimType: string,
): MethodologyDefinition {
  const factPaths = NATAL_STEM_INPUTS.map((input) => input.pathOrClaimType);
  return {
    methodologyId: `${METHOD_ID}-${scope.toUpperCase()}`,
    version: VERSION,
    family: 'time_dynamics',
    name: 'Request-scoped classical visible stem control',
    description:
      'Reads a directional, exact Ten-God pair in the selected T9 period against resolved visible natal stems.',
    assumptions: [
      'The civil annual stem and each Jeol-segment monthly stem are already resolved by the existing T9 theme rule.',
      'Require resolved year, month and hour stems to check visible mediators. The day stem is the reference.',
      'Visible Resource or Wealth, as appropriate to the pair, suspends the local interpretation; efficacy of a remedy is not decided.',
      'No strength, rooting, transformation, whole-chart pattern, or outcome is determined. Monthly application is a bounded methodology extension.',
    ],
    requiredFactTypes: factPaths,
    inputContract: {
      factInputs: factPaths.map((pathPattern) => ({
        source: 'derived_fact',
        pathPattern,
        mode: 'required',
        rationale: 'Resolved visible natal stem and possible countervailing factor.',
      })),
      claimInputs: [
        {
          source: 'interpretation_claim',
          claimType: themeClaimType,
          mode: 'required',
          rationale: 'Exact active period and subtype from the existing T9 theme rule.',
        },
      ],
    },
    sourceIds: STEM_INTERACTION_SOURCES.map((source) => source.sourceId),
    status: 'research',
  };
}

function createStemInteractionRules(
  scope: 'annual' | 'monthly',
  themeClaimType: string,
): RuleDefinition[] {
  const periods = STEM_INTERACTION_PERIODS.filter(
    (period) => (period === 'annual') === (scope === 'annual'),
  );
  return periods.flatMap((period) =>
    PAIR_IDS.flatMap((pair) => {
      const definition = PAIRS[pair];
      const mediator: RuleExpression = {
        op: 'or',
        expressions: STEM_SLOTS.map((key) => ({
          op: 'in',
          value: { kind: 'input', key },
          set: definition.mediators,
        })),
      };
      return STATES.map((state): RuleDefinition => ({
        ruleId: `RULE-GENERAL-T9-STEM-${period}-${pair}-${state}`,
        version: VERSION,
        ruleSetId: STEM_INTERACTION_RULE_SET,
        taxonomy: { tier: 'T9', category: 'general', subcategory: scope },
        methodologyRef: { id: `${METHOD_ID}-${scope.toUpperCase()}`, version: VERSION },
        title: `${definition.period} → ${definition.natal} (${period})`,
        description:
          'Limits interpretation to the exact period subtype, visible natal counterpart and visible exceptions.',
        inputs: [
          ...NATAL_STEM_INPUTS,
          {
            key: 'periodTheme',
            source: 'interpretation_claim',
            pathOrClaimType: themeClaimType,
            required: true,
            cardinality: 'exactly_one',
            ambiguityBehavior: 'requires_resolved',
            claimSelector: {
              valueEquals: [
                { path: 'tenGod', value: definition.period },
                ...(period === 'annual' ? [] : [{ path: 'segmentId', value: period }]),
              ],
            },
          },
        ],
        condition: {
          op: 'and',
          expressions: [
            {
              op: 'or',
              expressions: STEM_SLOTS.map((key) => ({
                op: 'eq',
                left: { kind: 'input', key },
                right: { kind: 'literal', value: definition.natal },
              })),
            },
            state === 'conditional' ? { op: 'not', expression: mediator } : mediator,
          ],
        },
        output: {
          claimType: STEM_INTERACTION_CLAIM.claimType,
          subject: period,
          predicate: 'bounded_visible_stem_control',
          value: { pair, period, state } satisfies StemInteractionValue,
          polarity: 'neutral',
          emphasis: 'minor',
        },
        sourceRefs:
          pair === 'hurting_officer_direct_officer'
            ? [
                { sourceId: SOURCE_BASIS.sourceId, supportType: 'direct_basis' },
                { sourceId: SOURCE_TIMING.sourceId, supportType: 'interpretive_basis' },
                { sourceId: SOURCE_OFFICER_REMEDY.sourceId, supportType: 'interpretive_basis' },
              ]
            : [{ sourceId: SOURCE_BASIS.sourceId, supportType: 'direct_basis' }],
        quality: {
          provenanceQuality: 'primary_supported',
          testCoverage: 'fixture_matrix',
          methodologyStability: 'experimental',
          reviewerStatus: 'unreviewed',
        },
        status: 'research',
      }));
    }),
  );
}

const STEM_INTERACTION_PROFILES = PAIR_IDS.flatMap((pair) =>
  STATES.map((state) => {
    const definition = PAIRS[pair];
    return {
      profileId: `PROFILE-GENERAL-T9-STEM-${pair}-${state}`,
      claimType: STEM_INTERACTION_CLAIM.claimType,
      version: VERSION,
      allowedEpistemicTypes: ['future_tendency'],
      requiredMethodAttribution: true,
      mandatoryQualifier:
        '천간 두 십신의 연구용 비교이며, 월령·지장간·통근과 합화에 따른 전체 작용이나 실제 사건은 판단하지 않습니다.',
      templates: [
        {
          templateKey: 'headline',
          language: 'ko',
          text: state === 'conditional' ? definition.title : '함께 드러난 조절 근거',
        },
        {
          templateKey: 'summary',
          language: 'ko',
          text: state === 'conditional' ? definition.summary : definition.holding,
        },
      ],
    } satisfies ClaimNarrativeProfile;
  }),
);

/** Extend a research registry with executable rules without altering its baseline candidate pack. */
export function createStemInteractionResearchRegistry(
  scope: 'annual' | 'monthly',
  themeClaimType: string,
  input: RuleRegistryInput,
  pack: InterpretationPack,
  createdAt: string,
) {
  if (pack.status !== 'research')
    throw new TypeError('Stem interaction rules require a research pack.');
  const methodology = createStemInteractionMethod(scope, themeClaimType);
  return createRuleRegistrySnapshot(
    {
      ...input,
      rules: [...input.rules, ...createStemInteractionRules(scope, themeClaimType)],
      methodologies: [...input.methodologies, methodology],
      sources: [...(input.sources ?? []), ...STEM_INTERACTION_SOURCES],
      claimTypeDefinitions: [...(input.claimTypeDefinitions ?? []), STEM_INTERACTION_CLAIM],
      claimValueSchemas: [...(input.claimValueSchemas ?? []), STEM_INTERACTION_SCHEMA],
    },
    {
      ...pack,
      version: `${pack.version}.stem-interaction`,
      methodologyRefs: [
        ...pack.methodologyRefs,
        { id: methodology.methodologyId, version: methodology.version },
      ],
      enabledRuleSets: [...pack.enabledRuleSets, STEM_INTERACTION_RULE_SET],
    },
    createdAt,
  );
}

export function stemInteractionCopy(value: StemInteractionValue) {
  const { natal, period, mediators } = PAIRS[value.pair];
  const profile = STEM_INTERACTION_PROFILES.find(
    (item) => item.profileId === `PROFILE-GENERAL-T9-STEM-${value.pair}-${value.state}`,
  )!;
  return {
    natalTenGod: natal,
    periodTenGod: period,
    mediatorTenGods: mediators as readonly TenGod[],
    title: profile.templates[0]!.text,
    summary: profile.templates[1]!.text,
    qualifier: profile.mandatoryQualifier,
  };
}
