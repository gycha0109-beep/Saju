import type { TenGod } from '../contracts/calculation.js';
import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import type {
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  RuleExpression,
  SourceReference,
} from '../contracts/interpretation.js';
import { createWholeChartRegistrySnapshot } from '../interpretation/whole-chart-claims.js';
import type { RuleRegistryInput } from '../interpretation/rule-registry.js';

/**
 * A separate, source-pinned sociality candidate.
 *
 * This is deliberately not merged into the terminal 0.7.0 Relationship
 * candidate or the existing Preview pack. It represents only the modern
 * Ten-God sociality method discussed by Lee & Kim (2022), not romance,
 * spouse, family, compatibility, or relationship outcomes.
 */
export const RELATIONSHIP_NATAL_SOCIALITY_VERSION = '0.1.0-research' as const;

const METHOD_ID = 'M-RELATIONSHIP-NATAL-KIM-KI-SEUNG-SOCIALITY-2022';
const T5_RULE_SET = 'relationship-natal-sociality-exact-ten-god-observation';
const T8_RULE_SET = 'relationship-natal-sociality-source-bounded-orientation';

export type RelationshipSocialityChannel = 'visible_stems' | 'branches';

export const RELATIONSHIP_NATAL_SOCIALITY_SOURCE: SourceReference = Object.freeze({
  sourceId: 'SRC-LEE-KIM-2022-SHIPSONG-CONCEPT-EXPANSION',
  sourceType: 'paper',
  title: '명리학에서 십성(十星)의 성립과 개념 확장에 관한 연구',
  author: '이남연·김기승',
  publisher: 'Industry Promotion Research',
  publicationYear: 2022,
  language: 'ko',
  locator: {
    volume: '7(1)',
    section: '4.1 현대 명리학에서 십성의 개념; 5.1 과학명리에서 정의하는 십성의 개념; 표 1·2·3',
    page: '29-33',
  },
  url: 'https://doi.org/10.21186/IPR.2022.7.1.025',
  accessedAt: '2026-11-26',
  provenanceTier: 'scholarly_secondary',
  rights: {
    license: 'CC BY-NC 3.0',
    copyrightStatus: 'open_license',
    reusePolicy: 'paraphrase_only',
  },
  notes:
    'Secondary scholarly analysis of Kim Ki-seung’s modern Ten-God method. Pages 31-33 describe Ten-God positive/caution traits and sociality applications, citing Science Myeongri (2016, pp. 367-384) and Saju Psychotherapy (2011, pp. 199-227). The cited books were not independently inspected here; this candidate therefore remains secondary-only and research-only.',
});

type SocialityFamily = 'peer' | 'output' | 'wealth' | 'officer' | 'resource';

interface SocialityMeaning {
  family: SocialityFamily;
  headline: string;
  supportiveExpression: string;
  cautionExpression: string;
}

const TEN_GOD_SLUGS: Readonly<Record<TenGod, string>> = Object.freeze({
  비견: 'BI_GYEON',
  겁재: 'GYEOB_JAE',
  식신: 'SIK_SIN',
  상관: 'SANG_GWAN',
  정재: 'JEONG_JAE',
  편재: 'PYEON_JAE',
  정관: 'JEONG_GWAN',
  편관: 'PYEON_GWAN',
  정인: 'JEONG_IN',
  편인: 'PYEON_IN',
});

const SOCIALITY: Readonly<Record<TenGod, SocialityMeaning>> = Object.freeze({
  비견: {
    family: 'peer',
    headline: '자기 기준과 동료 관계의 사회성',
    supportiveExpression: '주체성과 추진력을 바탕으로 맡은 일에 책임을 다하고 동료와 나란히 참여하는 관점',
    cautionExpression: '자기주장이 고착되거나 타인의 조언을 받아들이기 어려워 논쟁이 길어지는 지점',
  },
  겁재: {
    family: 'peer',
    headline: '주도성과 협력 관계의 사회성',
    supportiveExpression: '분명한 주관과 실행력을 공동 목표나 협력 관계에 활용하는 관점',
    cautionExpression: '경쟁심이 배타성이나 우월감으로 기울어 동료와의 협력을 해치는 지점',
  },
  식신: {
    family: 'output',
    headline: '친화와 배려를 드러내는 사회성',
    supportiveExpression: '온화함과 예의를 바탕으로 상대를 대하고 도움을 제공하는 관점',
    cautionExpression: '표현한 생각이 실제 행동과 마무리로 이어지는지 확인할 지점',
  },
  상관: {
    family: 'output',
    headline: '언어 표현과 설득의 사회성',
    supportiveExpression: '언어 감각과 새로운 발상으로 의견을 설명하고 상대를 설득하는 관점',
    cautionExpression: '직설적인 표현이나 비판이 상대의 자존심을 건드리거나 논쟁을 키우는 지점',
  },
  정재: {
    family: 'wealth',
    headline: '정확성과 신뢰를 중시하는 사회성',
    supportiveExpression: '약속한 몫과 기준을 정확히 관리하고 안정적인 교환을 중시하는 관점',
    cautionExpression: '이해득실을 지나치게 따져 유연함이나 관대함이 줄어드는 지점',
  },
  편재: {
    family: 'wealth',
    headline: '융통성과 폭넓은 판단의 사회성',
    supportiveExpression: '상황을 넓게 살피고 자원과 기회를 빠르게 연결하는 관점',
    cautionExpression: '과장이나 경솔함, 지속성 부족으로 신뢰가 흔들리는 지점',
  },
  정관: {
    family: 'officer',
    headline: '규칙과 공정성을 중시하는 사회성',
    supportiveExpression: '역할과 규정을 존중하고 공정한 기준으로 책임을 다하는 관점',
    cautionExpression: '관용이 부족하거나 달라진 환경에 적응하기 어려워지는 지점',
  },
  편관: {
    family: 'officer',
    headline: '결단과 책임을 앞세우는 사회성',
    supportiveExpression: '빠른 판단과 실행력으로 책임을 맡고 어려운 상황을 돌파하는 관점',
    cautionExpression: '강압적인 통제나 목적 중심의 판단으로 타협 여지가 줄어드는 지점',
  },
  정인: {
    family: 'resource',
    headline: '학습과 이해를 바탕으로 한 사회성',
    supportiveExpression: '지식과 경험을 받아들이고 기록·정리하여 관계의 기준을 이해하는 관점',
    cautionExpression: '전통이나 익숙한 방식에 머물러 융통성과 실행 속도가 떨어지는 지점',
  },
  편인: {
    family: 'resource',
    headline: '분석과 직관을 활용하는 사회성',
    supportiveExpression: '관찰과 직관으로 기회를 포착하고 복합적인 상황을 분석하는 관점',
    cautionExpression: '기회주의적으로 보이거나 시작한 일을 꾸준히 이어가지 못하는 지점',
  },
});

const TEN_GODS = Object.keys(TEN_GOD_SLUGS) as TenGod[];

const SLOT_PATHS: Readonly<Record<RelationshipSocialityChannel, readonly string[]>> = {
  visible_stems: ['year.stem.value', 'month.stem.value', 'hour.stem.value'],
  branches: ['year.branch.value', 'month.branch.value', 'day.branch.value', 'hour.branch.value'],
};

const QUALITY: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'secondary_only',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
});

export const RELATIONSHIP_NATAL_SOCIALITY_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: METHOD_ID,
  version: RELATIONSHIP_NATAL_SOCIALITY_VERSION,
  family: 'domain_synthesis',
  name: 'Kim Ki-seung modern Ten-God sociality interpretation (secondary research)',
  description:
    'Maps individually observed Ten Gods to bounded sociality themes using the modern Myeongri method summarized by Lee & Kim (2022).',
  assumptions: [
    'This is one separately pinned modern Myeongri lineage, not a universal or cross-school synthesis.',
    'The source supports sociality and interpersonal tendencies; it does not authorize romance, spouse, marriage, compatibility, family-role, or event predictions.',
    'An observed Ten God is one interpretive facet only. It does not establish dominance, a fixed personality, actual conduct, or relationship quality.',
    'Supportive and caution expressions are both retained; the engine does not select one polarity or calculate a score.',
    'The source article is secondary evidence and cites primary books that were not independently inspected. Domain and Engine admission remain open review questions.',
    'Psychological terminology in the source is not used as a clinical, psychometric, attachment, or diagnostic model.',
    'The candidate is research-only and is not connected to Preview, Official Reading, or Production.',
  ],
  requiredFactTypes: ['derivedFacts.tenGods'],
  sourceIds: [RELATIONSHIP_NATAL_SOCIALITY_SOURCE.sourceId],
  status: 'research',
});

function t5ClaimType(tenGod: TenGod, channel: RelationshipSocialityChannel): string {
  return `RELATIONSHIP_SOCIALITY_T5_${TEN_GOD_SLUGS[tenGod]}_${channel.toUpperCase()}`;
}

function t8ClaimType(tenGod: TenGod, channel: RelationshipSocialityChannel): string {
  return `RELATIONSHIP_NATAL_SOCIALITY_${TEN_GOD_SLUGS[tenGod]}_${channel.toUpperCase()}`;
}

function tenGodExpressions(
  tenGod: TenGod,
  channel: RelationshipSocialityChannel,
): RuleExpression[] {
  return SLOT_PATHS[channel].map((path) => ({
    op: 'eq' as const,
    left: { kind: 'input' as const, key: 'tenGods', path },
    right: { kind: 'literal' as const, value: tenGod },
  }));
}

function observationRule(
  tenGod: TenGod,
  channel: RelationshipSocialityChannel,
): RuleDefinition {
  const meaning = SOCIALITY[tenGod];
  return {
    ruleId: `RULE-${t5ClaimType(tenGod, channel)}`,
    version: RELATIONSHIP_NATAL_SOCIALITY_VERSION,
    ruleSetId: T5_RULE_SET,
    taxonomy: { tier: 'T5', category: 'ten_gods', subcategory: `relationship_sociality_${channel}` },
    methodologyRef: { id: METHOD_ID, version: RELATIONSHIP_NATAL_SOCIALITY_VERSION },
    title: `Exact Ten-God sociality observation: ${tenGod} / ${channel}`,
    description:
      'Records one exact Ten-God value in the stated chart channel. It does not score frequency, strength, or dominance.',
    inputs: [{
      key: 'tenGods',
      source: 'derived_fact',
      pathOrClaimType: 'derivedFacts.tenGods',
      acceptedStatuses: ['resolved'],
      required: true,
      ambiguityBehavior: 'requires_resolved',
    }],
    condition: { op: 'or', expressions: tenGodExpressions(tenGod, channel) },
    output: {
      claimType: t5ClaimType(tenGod, channel),
      subject: 'natal_chart',
      predicate: 'relationship_sociality_observation',
      value: {
        tenGod,
        family: meaning.family,
        channel,
        observation: 'present',
        dominance: 'not_scored',
      },
      polarity: 'neutral',
      emphasis: 'moderate',
      tags: ['research', 'relationship-natal', 'sociality', 'exact-ten-god'],
    },
    sourceRefs: [{
      sourceId: RELATIONSHIP_NATAL_SOCIALITY_SOURCE.sourceId,
      supportType: 'interpretive_basis',
      notes: 'Lee & Kim (2022), pp. 31-33; secondary summary of the source-specific modern Ten-God sociality method.',
    }],
    quality: QUALITY,
    status: 'research',
  };
}

function socialityRule(
  tenGod: TenGod,
  channel: RelationshipSocialityChannel,
): RuleDefinition {
  const meaning = SOCIALITY[tenGod];
  return {
    ruleId: `RULE-${t8ClaimType(tenGod, channel)}`,
    version: RELATIONSHIP_NATAL_SOCIALITY_VERSION,
    ruleSetId: T8_RULE_SET,
    taxonomy: { tier: 'T8', category: 'relationship', subcategory: 'sociality_orientation' },
    methodologyRef: { id: METHOD_ID, version: RELATIONSHIP_NATAL_SOCIALITY_VERSION },
    title: meaning.headline,
    description:
      'Projects one exact, same-chart T5 Ten-God observation into its source-bounded sociality facet without synthesizing an outcome.',
    inputs: [{
      key: 'observation',
      source: 'interpretation_claim',
      pathOrClaimType: t5ClaimType(tenGod, channel),
      required: true,
      cardinality: 'exactly_one',
      ambiguityBehavior: 'requires_resolved',
    }],
    condition: { op: 'exists', value: { kind: 'input', key: 'observation' } },
    output: {
      claimType: t8ClaimType(tenGod, channel),
      subject: 'natal_chart',
      predicate: 'relationship_sociality_orientation',
      value: {
        tenGod,
        family: meaning.family,
        channel,
        headline: meaning.headline,
        supportiveExpression: meaning.supportiveExpression,
        cautionExpression: meaning.cautionExpression,
        relationshipScope: 'general_sociality',
        dominance: 'not_scored',
        relationshipOutcomeAuthorized: false,
        romanceAuthorized: false,
        spouseAuthorized: false,
        compatibilityAuthorized: false,
        familyRoleAuthorized: false,
        futureTimingAuthorized: false,
        diagnosisAuthorized: false,
        wholeRelationshipConclusionAuthorized: false,
      },
      polarity: 'neutral',
      emphasis: 'moderate',
      tags: ['research', 'relationship-natal', 'sociality', 'non-predictive', channel],
    },
    sourceRefs: [{
      sourceId: RELATIONSHIP_NATAL_SOCIALITY_SOURCE.sourceId,
      supportType: 'interpretive_basis',
      notes: 'Lee & Kim (2022), pp. 31-33; exact Ten-God sociality facet only, not a relationship outcome.',
    }],
    quality: QUALITY,
    status: 'research',
  };
}

const CHANNELS: readonly RelationshipSocialityChannel[] = ['visible_stems', 'branches'];

export const RELATIONSHIP_NATAL_SOCIALITY_T5_RULES: readonly RuleDefinition[] = Object.freeze(
  TEN_GODS.flatMap((tenGod) => CHANNELS.map((channel) => observationRule(tenGod, channel))),
);

export const RELATIONSHIP_NATAL_SOCIALITY_T8_RULES: readonly RuleDefinition[] = Object.freeze(
  TEN_GODS.flatMap((tenGod) => CHANNELS.map((channel) => socialityRule(tenGod, channel))),
);

export const RELATIONSHIP_NATAL_SOCIALITY_RULES: readonly RuleDefinition[] = Object.freeze([
  ...RELATIONSHIP_NATAL_SOCIALITY_T5_RULES,
  ...RELATIONSHIP_NATAL_SOCIALITY_T8_RULES,
]);

export const RELATIONSHIP_NATAL_SOCIALITY_NARRATIVES: readonly ClaimNarrativeProfile[] =
  Object.freeze(TEN_GODS.flatMap((tenGod, order) => CHANNELS.map((channel) => {
    const meaning = SOCIALITY[tenGod];
    return {
      profileId: `PROFILE-${t8ClaimType(tenGod, channel)}`,
      version: RELATIONSHIP_NATAL_SOCIALITY_VERSION,
      claimType: t8ClaimType(tenGod, channel),
      semanticKeys: ['tenGod', 'family', 'channel', 'supportiveExpression', 'cautionExpression'],
      allowedEpistemicTypes: ['interpretation' as const],
      requiredMethodAttribution: true,
      prohibitedPhrases: [
        '반드시 성공',
        '이별한다',
        '결혼한다',
        '배우자는',
        '궁합이 좋다',
        '애착유형',
        '정신질환',
        '성격이 확정된다',
      ],
      renderingHints: [`sociality:${meaning.family}`, `order:${order}`, `channel:${channel}`],
      templates: [
        { templateKey: 'headline', language: 'ko', text: meaning.headline },
        {
          templateKey: 'summary',
          language: 'ko',
          text:
            (channel === 'visible_stems'
              ? '천간에서 확인된 '
              : '지지 대표 십신에서 확인된 ') +
            tenGod +
            '의 사회성 해석 후보입니다. 도움이 되는 방향은 ' +
            meaning.supportiveExpression +
            '이며, 함께 살펴볼 주의점은 ' +
            meaning.cautionExpression +
            '입니다. 이 한 가지 근거만으로 실제 관계의 결과를 판단하지 않습니다.',
        },
      ],
    };
  })));

export const RELATIONSHIP_NATAL_SOCIALITY_PACK: InterpretationPack = Object.freeze({
  wholeChartJudgment: 'research',
  packId: 'PACK-RELATIONSHIP-NATAL-KIM-KI-SEUNG-SOCIALITY-RESEARCH',
  version: RELATIONSHIP_NATAL_SOCIALITY_VERSION,
  name: 'Relationship natal sociality / Kim Ki-seung modern Ten-God method / research',
  methodologyRefs: [{ id: METHOD_ID, version: RELATIONSHIP_NATAL_SOCIALITY_VERSION }],
  enabledRuleSets: [T5_RULE_SET, T8_RULE_SET],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'skip_requires_resolved',
  compositionPolicyRef: {
    id: 'COMPOSITION-RELATIONSHIP-NATAL-SOCIALITY-RESEARCH',
    version: RELATIONSHIP_NATAL_SOCIALITY_VERSION,
  },
  status: 'research',
});

export function createRelationshipNatalSocialityRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  const input: RuleRegistryInput = {
    rules: RELATIONSHIP_NATAL_SOCIALITY_RULES,
    methodologies: [RELATIONSHIP_NATAL_SOCIALITY_METHODOLOGY],
    sources: [RELATIONSHIP_NATAL_SOCIALITY_SOURCE],
  };
  return createWholeChartRegistrySnapshot(input, RELATIONSHIP_NATAL_SOCIALITY_PACK, createdAt);
}
