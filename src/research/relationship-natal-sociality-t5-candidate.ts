import type { TenGod } from '../contracts/calculation.js';
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
 * Research-only T5 sociality facets derived from Lee & Kim (2022).
 *
 * This is not a general-relationship T8 synthesis. The article describes
 * individual Ten-God sociality facets but does not define a multi-factor
 * relationship-composition rule. The source is CC BY-NC 3.0 and is therefore
 * not authorized for commercial product use.
 */
export const RELATIONSHIP_NATAL_SOCIALITY_T5_VERSION = '0.1.0-research' as const;

const METHOD_ID = 'M-RELATIONSHIP-NATAL-SOCIALITY-KIM-KI-SEUNG-2022';
export const RELATIONSHIP_NATAL_SOCIALITY_T5_RULE_SET =
  'relationship-natal-sociality-t5-research';

export type RelationshipSocialityT5Channel = 'visible_stems' | 'branches';
type SocialityFamily = 'peer' | 'output' | 'wealth' | 'officer' | 'resource';

interface SocialityMeaning {
  family: SocialityFamily;
  headline: string;
  resourceExpression: string;
  cautionExpression: string;
}

export const RELATIONSHIP_NATAL_SOCIALITY_T5_SOURCE: SourceReference = Object.freeze({
  sourceId: 'SRC-LEE-KIM-2022-SHIPSONG-CONCEPT-EXPANSION',
  sourceType: 'paper',
  title: '명리학에서 십성(十星)의 성립과 개념 확장에 관한 연구',
  author: '이남연·김기승',
  publisher: 'Industrial Promotion Institute',
  publicationYear: 2022,
  language: 'ko',
  locator: {
    volume: '7(1)',
    section: '5.1 현대 명리학에서 정의하는 십성의 개념; 표 1·2·3',
    page: '31-33',
  },
  url: 'https://www.koreascience.or.kr/article/JAKO202209059084683.pdf',
  accessedAt: '2026-11-26',
  provenanceTier: 'scholarly_secondary',
  rights: {
    license: 'CC BY-NC 3.0',
    copyrightStatus: 'open_license' as const,
    reusePolicy: 'paraphrase_only' as const,
  },
  notes:
    'Official KoreaScience full-text PDF, DOI 10.21186/IPR.2022.7.1.025. Pages 31-33 summarize Kim Ki-seung’s modern Ten-God sociality descriptors. This is secondary evidence; the cited underlying books were not independently inspected. CC BY-NC 3.0 does not authorize commercial reuse. Internal research only.',
});

const QUALITY: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'secondary_only',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
});

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
    headline: '책임감과 자기 주도성',
    resourceExpression: '책임감과 자기 주도성을 바탕으로 맡은 일을 수행하려는 관점',
    cautionExpression: '자기주장이 강해 타인의 조언을 받아들이기 어렵거나 논쟁이 길어질 수 있는 지점',
  },
  겁재: {
    family: 'peer',
    headline: '주관과 추진력',
    resourceExpression: '뚜렷한 주관과 추진력을 바탕으로 상황에 적극적으로 참여하는 관점',
    cautionExpression: '질투심이나 교만·불손함으로 표현될 수 있는 지점',
  },
  식신: {
    family: 'output',
    headline: '친화와 배려',
    resourceExpression: '관대함과 예의를 바탕으로 상대를 대하고 실질적인 도움을 제공하려는 관점',
    cautionExpression: '말과 계획에 비해 실행이나 마무리가 약해질 수 있는 지점',
  },
  상관: {
    family: 'output',
    headline: '표현과 설득',
    resourceExpression: '언어 표현과 설득, 새로운 발상을 활용하는 관점',
    cautionExpression: '직설적 표현이나 비밀 유지의 어려움으로 타인의 자존심을 건드릴 수 있는 지점',
  },
  정재: {
    family: 'wealth',
    headline: '정확성과 관리',
    resourceExpression: '정확한 기준과 관리, 정당한 대가를 중시하는 관점',
    cautionExpression: '이해득실을 지나치게 계산해 유연한 판단이 늦어지거나 인색하게 보일 수 있는 지점',
  },
  편재: {
    family: 'wealth',
    headline: '기회 포착과 개척',
    resourceExpression: '빠른 판단과 기회 포착, 개척적 행동을 활용하는 관점',
    cautionExpression: '지속성이 약해지거나 과장·경솔한 판단이 나타날 수 있는 지점',
  },
  정관: {
    family: 'officer',
    headline: '공정성과 질서',
    resourceExpression: '공정성과 질서, 책임을 중시하며 맡은 역할을 수행하려는 관점',
    cautionExpression: '관용과 이해가 부족해지거나 환경 변화에 적응하기 어려울 수 있는 지점',
  },
  편관: {
    family: 'officer',
    headline: '결단과 실행',
    resourceExpression: '결단과 실행력으로 어려운 상황에 빠르게 대응하려는 관점',
    cautionExpression: '목적을 앞세워 협의보다 행동이나 통제를 먼저 선택할 수 있는 지점',
  },
  정인: {
    family: 'resource',
    headline: '학습과 원칙',
    resourceExpression: '지식과 경험을 받아들이고 전통과 원칙을 존중하는 관점',
    cautionExpression: '유연성이 부족해 변화에 적응하거나 실행을 시작하는 데 시간이 걸릴 수 있는 지점',
  },
  편인: {
    family: 'resource',
    headline: '분석과 직관',
    resourceExpression: '기회를 포착하고 분석과 직관을 활용하는 관점',
    cautionExpression: '자기 이익에 치우치거나 시작한 일을 끝까지 이어가지 못할 수 있는 지점',
  },
});

const TEN_GODS = Object.keys(TEN_GOD_SLUGS) as TenGod[];
const CHANNELS: readonly RelationshipSocialityT5Channel[] = ['visible_stems', 'branches'];

const SLOT_PATHS: Readonly<Record<RelationshipSocialityT5Channel, readonly string[]>> = {
  visible_stems: ['year.stem.value', 'month.stem.value', 'hour.stem.value'],
  branches: ['year.branch.value', 'month.branch.value', 'day.branch.value', 'hour.branch.value'],
};

export const RELATIONSHIP_NATAL_SOCIALITY_T5_METHODOLOGY: MethodologyDefinition =
  Object.freeze({
    methodologyId: METHOD_ID,
    version: RELATIONSHIP_NATAL_SOCIALITY_T5_VERSION,
    family: 'ten_gods',
    name: 'Kim Ki-seung modern Ten-God sociality facet (secondary research)',
    description:
      'Maps one resolved Ten-God observation to its source-described sociality facet. It does not synthesize a whole relationship conclusion.',
    assumptions: [
      'This is one modern Myeongri lineage, specifically Kim Ki-seung’s method as summarized by Lee & Kim (2022), not a universal classical consensus.',
      'Pages 31-33 support individual Ten-God sociality descriptors; they do not define a multi-factor general-relationship synthesis rule.',
      'Each output is one T5 facet attached to an exact observed Ten-God. It does not establish actual behaviour, personality, relationship quality, or a real-life outcome.',
      'Visible-stem and branch observations remain separate engine channels. The source does not authorize channel weights, frequency scoring, or dominance.',
      'No spouse, romance, compatibility, family-role, gender-role, future-event, health, or psychological-diagnosis interpretation is authorized.',
      'The article is secondary evidence and cites underlying Kim Ki-seung books that were not independently inspected.',
      'The source is licensed CC BY-NC 3.0. This candidate is internal research only and is not authorized for commercial product use without separately established commercial rights.',
      'No T8 relationship conclusion is defined by this source. Multiple T5 facets must not be combined into a relationship outcome.',
    ],
    requiredFactTypes: ['derivedFacts.tenGods'],
    sourceIds: [RELATIONSHIP_NATAL_SOCIALITY_T5_SOURCE.sourceId],
    status: 'research',
  });

function claimType(tenGod: TenGod, channel: RelationshipSocialityT5Channel): string {
  return 'RELATIONSHIP_SOCIALITY_T5_' + TEN_GOD_SLUGS[tenGod] + '_' + channel.toUpperCase();
}

function observationExpressions(
  tenGod: TenGod,
  channel: RelationshipSocialityT5Channel,
): RuleExpression[] {
  return SLOT_PATHS[channel].map((path) => ({
    op: 'eq' as const,
    left: { kind: 'input' as const, key: 'tenGods', path },
    right: { kind: 'literal' as const, value: tenGod },
  }));
}

function socialityRule(
  tenGod: TenGod,
  channel: RelationshipSocialityT5Channel,
): RuleDefinition {
  const meaning = SOCIALITY[tenGod];
  return {
    ruleId: 'RULE-' + claimType(tenGod, channel),
    version: RELATIONSHIP_NATAL_SOCIALITY_T5_VERSION,
    ruleSetId: RELATIONSHIP_NATAL_SOCIALITY_T5_RULE_SET,
    taxonomy: { tier: 'T5', category: 'ten_gods', subcategory: 'relationship_sociality' },
    methodologyRef: { id: METHOD_ID, version: RELATIONSHIP_NATAL_SOCIALITY_T5_VERSION },
    title: meaning.headline + ' (' + tenGod + ')',
    description:
      'Records one source-bounded sociality facet when the exact Ten-God value is observed in the stated channel. No counting, scoring, or cross-facet synthesis is performed.',
    inputs: [{
      key: 'tenGods',
      source: 'derived_fact',
      pathOrClaimType: 'derivedFacts.tenGods',
      acceptedStatuses: ['resolved'],
      required: true,
      ambiguityBehavior: 'scenario_preserving',
    }],
    condition: { op: 'or', expressions: observationExpressions(tenGod, channel) },
    output: {
      claimType: claimType(tenGod, channel),
      subject: 'natal_chart',
      predicate: 'relationship_sociality_facet',
      value: {
        tenGod,
        family: meaning.family,
        channel,
        headline: meaning.headline,
        resourceExpression: meaning.resourceExpression,
        cautionExpression: meaning.cautionExpression,
        interpretationScope: 'single_ten_god_sociality_facet',
        dominance: 'not_scored',
        actualBehaviourAuthorized: false,
        personalityConclusionAuthorized: false,
        relationshipQualityAuthorized: false,
        relationshipOutcomeAuthorized: false,
        wholeRelationshipConclusionAuthorized: false,
        romanceAuthorized: false,
        spouseAuthorized: false,
        compatibilityAuthorized: false,
        familyRoleAuthorized: false,
        futureTimingAuthorized: false,
        diagnosisAuthorized: false,
        commercialUseAuthorized: false,
      },
      polarity: 'neutral',
      emphasis: 'moderate',
      tags: [
        'research',
        'relationship-natal',
        'sociality-t5',
        'secondary-source',
        'non-commercial-source',
        'non-predictive',
      ],
    },
    sourceRefs: [{
      sourceId: RELATIONSHIP_NATAL_SOCIALITY_T5_SOURCE.sourceId,
      supportType: 'interpretive_basis',
      notes:
        'Lee & Kim (2022), §5.1, pp.31-33. Secondary support for individual Ten-God sociality descriptors only; not a T8 relationship synthesis or spouse selector.',
    }],
    quality: QUALITY,
    status: 'research',
  };
}

export const RELATIONSHIP_NATAL_SOCIALITY_T5_RULES: readonly RuleDefinition[] = Object.freeze(
  TEN_GODS.flatMap((tenGod) => CHANNELS.map((channel) => socialityRule(tenGod, channel))),
);

export const RELATIONSHIP_NATAL_SOCIALITY_T5_PACK: InterpretationPack = Object.freeze({
  wholeChartJudgment: 'research',
  packId: 'PACK-RELATIONSHIP-NATAL-SOCIALITY-T5-LEE-KIM-2022-RESEARCH',
  version: RELATIONSHIP_NATAL_SOCIALITY_T5_VERSION,
  name: 'Relationship natal sociality T5 facets / Lee & Kim 2022 / research only',
  methodologyRefs: [{
    id: RELATIONSHIP_NATAL_SOCIALITY_T5_METHODOLOGY.methodologyId,
    version: RELATIONSHIP_NATAL_SOCIALITY_T5_METHODOLOGY.version,
  }],
  enabledRuleSets: [RELATIONSHIP_NATAL_SOCIALITY_T5_RULE_SET],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-RELATIONSHIP-NATAL-SOCIALITY-T5-RESEARCH',
    version: RELATIONSHIP_NATAL_SOCIALITY_T5_VERSION,
  },
  status: 'research',
});

export function createRelationshipNatalSocialityT5Registry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  const input: RuleRegistryInput = {
    rules: RELATIONSHIP_NATAL_SOCIALITY_T5_RULES,
    methodologies: [RELATIONSHIP_NATAL_SOCIALITY_T5_METHODOLOGY],
    sources: [RELATIONSHIP_NATAL_SOCIALITY_T5_SOURCE],
  };
  return createWholeChartRegistrySnapshot(
    input,
    RELATIONSHIP_NATAL_SOCIALITY_T5_PACK,
    createdAt,
  );
}
