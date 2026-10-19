import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import type { InterpretationPack, MethodologyDefinition, RuleDefinition, RuleExpression } from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
  GENERAL_NATAL_USEFUL_READING_SOURCE,
  GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
} from './general-natal-useful-reading-candidate.js';
import { GENERAL_NATAL_CONCLUSION_SOURCE } from './general-natal-conclusion-synthesis-candidate.js';

/**
 * Wealth's source-bounded first T5->T8 vertical slice. Do not mix
 * old single-family WEALTH_NATAL_READING_RULES into this research pack.
 */
export const WEALTH_MULTIFACTOR_VERSION = '0.1.0-research' as const;
const METHOD_ID = 'M-WEALTH-NATAL-TWO-T5-STRUCTURAL-SYNTHESIS-V1';
const RULE_SET = 'wealth-natal-source-bounded-multifactor';
type Family = 'output' | 'wealth' | 'officer' | 'resource';
type Channel = 'visible_stems' | 'branches';
type Axis = 'core' | 'management' | 'tension';
interface Pattern {
  id: string;
  families: readonly [Family, Family];
  axis: Axis;
  headline: string;
  summary: string;
}
const PATTERNS: readonly Pattern[] = Object.freeze([
  {
    id: 'OUTPUT_WEALTH',
    families: ['output', 'wealth'],
    axis: 'core',
    headline: '산출과 현실 자원의 연결',
    summary: '식상과 재성이 같은 관측 채널에서 확인됩니다. 전통적 식상생재 관계에 한정하여 산출물과 가치·자원의 연결이라는 주제를 읽습니다. 소득이나 실제 금전 행동을 예측하지 않습니다.',
  },
  {
    id: 'WEALTH_OFFICER',
    families: ['wealth', 'officer'],
    axis: 'management',
    headline: '자원과 기준·책임의 연결',
    summary: '재성과 관성이 같은 관측 채널에서 확인됩니다. 전통적 재생관 관계에 한정하여 자원 운용과 규범·책임을 함께 검토하는 주제를 읽습니다. 실제 자산이나 재정관리 능력을 판정하지 않습니다.',
  },
  {
    id: 'WEALTH_RESOURCE',
    families: ['wealth', 'resource'],
    axis: 'tension',
    headline: '현실 자원과 준비·학습의 긴장',
    summary: '재성과 인성이 같은 관측 채널에서 확인됩니다. 전통적 재극인 관계에 한정하여 자원 투입과 준비·학습이 서로 요구하는 조건을 함께 살핍니다. 소비·투자 결과를 단정하지 않습니다.',
  },
]);
const QUALITY: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality:'secondary_only', testCoverage:'fixture_matrix',
  methodologyStability:'contested', reviewerStatus:'unreviewed',
});
const REFS: RuleDefinition['sourceRefs'] = [
  { sourceId: GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId, supportType:'interpretive_basis',
    notes:'Bounded Ten-God presence and channels; no actual person financial behavior asserted.' },
  { sourceId: GENERAL_NATAL_CONCLUSION_SOURCE.sourceId, supportType:'interpretive_basis',
    notes:'Classical generation/control relation basis, not money outcome or investment advice.' },
];
export const WEALTH_MULTIFACTOR_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: METHOD_ID,
  version: WEALTH_MULTIFACTOR_VERSION,
  family: 'domain_synthesis',
  name: 'Wealth natal independently evaluated two-T5 same-channel structural research',
  description: 'Combines two exact existing Ten-God T5 claim types from a single canonical channel, restricting interpretation to traditional resource structure.',
  assumptions: [
    'The chart is an interpretive model and not evidence of the user\'s financial behavior.',
    'Both T5 input Claims must be independently matched and from the same observed channel.',
    'No wealth amount, income, investment, debt, luck, occupation or future monetary outcome is authorized.',
    'Source quality contested and research-only. No Production/Commerce admission.',
  ],
  requiredFactTypes: ['derivedFacts.tenGods'],
  sourceIds: REFS.map(x => x.sourceId),
  status: 'research',
});
function claimType(pattern: Pattern, channel: Channel): string {
  return 'WEALTH_NATAL_MULTIFACTOR_' + pattern.id + '_' + channel.toUpperCase();
}
function t5Type(family: Family, channel: Channel): string {
  return 'TEN_GOD_' + family.toUpperCase() + '_' + channel.toUpperCase() + '_THEME';
}
function makeRule(pattern: Pattern, channel: Channel): RuleDefinition {
  const input = (key: string, family: Family) => ({
    key, source:'interpretation_claim' as const,
    pathOrClaimType:t5Type(family,channel),
    required:true, ambiguityBehavior:'scenario_preserving' as const,
    cardinality:'exactly_one' as const,
  });
  const condition: RuleExpression = {
    op:'and', expressions:[
      { op:'exists', value:{kind:'input',key:'left'} },
      { op:'exists', value:{kind:'input',key:'right'} },
    ],
  };
  return {
    ruleId:'RULE-'+claimType(pattern,channel),
    version:WEALTH_MULTIFACTOR_VERSION,
    ruleSetId:RULE_SET,
    taxonomy:{tier:'T8',category:'wealth',subcategory:'multifactor_structure'},
    methodologyRef:{id:METHOD_ID,version:WEALTH_MULTIFACTOR_VERSION},
    title:pattern.headline+' — '+channel,
    description:'Exact two-T5 structural wealth-domain research only, no causal money prediction.',
    inputs:[input('left',pattern.families[0]),input('right',pattern.families[1])],
    condition,
    output:{
      claimType:claimType(pattern,channel),
      subject:'natal_chart',predicate:'wealth_multifactor_structure',
      value:{
        pattern:pattern.id,families:[...pattern.families],channel,axis:pattern.axis,
        financialOutcomeAuthorized:false,investmentAdviceAuthorized:false,
        futureTimingAuthorized:false,causalLifeBehaviorAuthorized:false,
      },
      polarity:'neutral',
      emphasis:channel==='visible_stems'?'major':'minor',
      tags:['research','wealth','natal','two-upstream-t5',channel,pattern.axis],
    },
    sourceRefs:REFS,quality:QUALITY,status:'research',
  };
}
export const WEALTH_MULTIFACTOR_RULES: readonly RuleDefinition[] = Object.freeze(
  PATTERNS.flatMap(p=> (['visible_stems','branches'] as const).map(c=>makeRule(p,c))),
);
export const WEALTH_MULTIFACTOR_NARRATIVES: readonly ClaimNarrativeProfile[] =
  Object.freeze(PATTERNS.flatMap((p,order)=>
    (['visible_stems','branches'] as const).map(channel=>({
      profileId:'PROFILE-'+claimType(p,channel),
      version:WEALTH_MULTIFACTOR_VERSION,
      claimType:claimType(p,channel),
      semanticKeys:['pattern','families','channel','axis'],
      allowedEpistemicTypes:['interpretation' as const],
      requiredMethodAttribution:true,
      prohibitedPhrases:['반드시 부자','돈을 많이 번다','수익을 보장','투자 성공','로또'],
      renderingHints:['axis:'+p.axis,'order:'+order],
      templates:[
        {templateKey:'headline',language:'ko',text:p.headline},
        {templateKey:'summary',language:'ko',text:
          (channel==='branches'?'지지 대표 십신에서 보조적으로 관측된 연구 구조입니다. ':
            '천간에서 관측된 중심 연구 구조입니다. ')+p.summary},
      ],
    })),
  ));
export const WEALTH_MULTIFACTOR_PACK: InterpretationPack = Object.freeze({
  packId:'PACK-WEALTH-NATAL-TWO-T5-SOURCE-BOUNDED-RESEARCH',
  version:WEALTH_MULTIFACTOR_VERSION,
  name:'Wealth natal multifactor structural interpretation — research only',
  methodologyRefs:[
    {id:GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.methodologyId,
      version:GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.version},
    {id:METHOD_ID,version:WEALTH_MULTIFACTOR_VERSION},
  ],
  enabledRuleSets:[...new Set([...GENERAL_NATAL_USEFUL_TEN_GOD_RULES.map(r=>r.ruleSetId),RULE_SET])],
  conflictPolicy:'preserve_all',
  ambiguityPolicy:'propagate',
  compositionPolicyRef:{id:'COMPOSITION-WEALTH-MULTIFACTOR-RESEARCH',version:WEALTH_MULTIFACTOR_VERSION},
  status:'research',
});
export function createWealthMultifactorResearchRegistry(createdAt='1970-01-01T00:00:00.000Z') {
  return createRuleRegistrySnapshot({
    rules:[...GENERAL_NATAL_USEFUL_TEN_GOD_RULES,...WEALTH_MULTIFACTOR_RULES],
    methodologies:[GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,WEALTH_MULTIFACTOR_METHODOLOGY],
    sources:[GENERAL_NATAL_USEFUL_READING_SOURCE,GENERAL_NATAL_CONCLUSION_SOURCE],
  },WEALTH_MULTIFACTOR_PACK,createdAt);
}
