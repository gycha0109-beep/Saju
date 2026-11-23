import {
  deriveBranchPairRelation,
  STRUCTURAL_RELATION_SOURCE_CATALOG,
} from '../calculation/structural-relations.js';
import type { EarthlyBranch } from '../contracts/calculation.js';
import type {
  MethodologyDefinition,
  RuleDefinition,
  RuleExpression,
  SourceReference,
} from '../contracts/interpretation.js';
import type { ClaimNarrativeProfile } from '../contracts/narrative.js';

const BRANCHES = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'] as const;
export const INTIMACY_SLOTS = ['year', 'month', 'hour'] as const;
const VERSION = '0.1.0-research';
export const INTIMACY_RULE_SET = 'relationship-natal-intimacy-day-branch';
export const INTIMACY_CLAIM = 'RELATIONSHIP_NATAL_INTIMACY_DAY_BRANCH';
const CATALOG = STRUCTURAL_RELATION_SOURCE_CATALOG.yisiZhan;
export const INTIMACY_SOURCE: SourceReference = {
  ...CATALOG,
  sourceType: 'classical_text',
  language: 'zh-Hant',
  provenanceTier: 'primary',
  notes:
    'Provides the branch pair list. Relationship discussion and ambiguity handling are bounded internal application.',
};
export const INTIMACY_METHODOLOGY: MethodologyDefinition = {
  methodologyId: 'M-RELATIONSHIP-NATAL-INTIMACY-DAY-BRANCH-V1',
  version: VERSION,
  family: 'domain_synthesis',
  name: 'Day-branch contacts in close relationships',
  description:
    'Uses verified local branch contacts to discuss coordination in one person’s close relationships.',
  assumptions: [
    'Only contacts with the actual day branch are read.',
    'When both combination and clash touch that day branch, retain both and withhold a dominant effect.',
    'Require all four branches to be resolved when characterizing the observed contact profile.',
    'No partner identity, spouse star, marriage outcome, transformation or two-chart compatibility is inferred.',
  ],
  requiredFactTypes: ['pillars.day', ...INTIMACY_SLOTS.map((slot) => 'pillars.' + slot)],
  sourceIds: [INTIMACY_SOURCE.sourceId],
  status: 'research',
};

const COPY = {
  combination: [
    '가까운 관계에서 일상을 맞추는 조건',
    '함께 정할 일과 각자 정할 일을 가려, 반복되는 약속을 어떻게 맞춰 갈 수 있는지 살펴봅니다.',
  ],
  clash: [
    '가까운 관계에서 생활 방식을 조율하는 조건',
    '가까워질수록 생활 리듬이나 결정 속도가 달라질 때를 살피고, 서로 정할 기준을 미리 구체화하는 관점으로 읽습니다.',
  ],
  mixed: [
    '가까운 관계에서 이어갈 약속과 다시 맞출 기준',
    '생활을 함께 맞추는 조건과 각자 조정해야 할 조건이 공존합니다. 유지할 약속과 협의할 경계를 함께 살피며 어느 쪽의 작용이 우세한지는 보류합니다.',
  ],
} as const;
export type IntimacyContact = keyof typeof COPY;
const kinds = Object.keys(COPY) as IntimacyContact[];
const INTIMACY_PROFILES = kinds.map((kind): ClaimNarrativeProfile => ({
  profileId: `PROFILE-${INTIMACY_CLAIM}-${kind}`,
  claimType: INTIMACY_CLAIM,
  version: VERSION,
  semanticKeys: ['kind'],
  allowedEpistemicTypes: ['interpretation'],
  requiredMethodAttribution: true,
  templates: [
    { templateKey: 'headline', language: 'ko', text: COPY[kind][0] },
    { templateKey: 'summary', language: 'ko', text: COPY[kind][1] },
  ],
}));

export function intimacyCopy(kind: IntimacyContact, key: 'headline' | 'summary') {
  const profile = INTIMACY_PROFILES.find(
    (item) => item.profileId === `PROFILE-${INTIMACY_CLAIM}-${kind}`,
  );
  const text = profile?.templates?.find((item) => item.templateKey === key)?.text;
  if (!text) throw new TypeError('Missing Korean day branch narrative.');
  return text;
}

function pair(natal: EarthlyBranch, relation: 'combination' | 'clash'): RuleExpression {
  const counterpart = BRANCHES.find(
    (branch) => deriveBranchPairRelation(natal, branch) === relation,
  );
  if (!counterpart) throw new TypeError('Missing traditional branch pair.');
  return {
    op: 'or',
    expressions: INTIMACY_SLOTS.map((key) => ({
      op: 'eq',
      left: { kind: 'input', key, path: 'branch.value' },
      right: { kind: 'literal', value: counterpart },
    })),
  };
}

export const INTIMACY_RULES: readonly RuleDefinition[] = kinds.map((kind) => ({
  ruleId: `RULE-${INTIMACY_CLAIM}-${kind.toUpperCase()}`,
  ruleSetId: INTIMACY_RULE_SET,
  version: VERSION,
  taxonomy: { tier: 'T8', category: 'relationship', subcategory: 'intimacy_day_branch' },
  methodologyRef: { id: INTIMACY_METHODOLOGY.methodologyId, version: VERSION },
  title: intimacyCopy(kind, 'headline'),
  description: INTIMACY_METHODOLOGY.description,
  inputs: ['day', ...INTIMACY_SLOTS].map((key) => ({
    key,
    pathOrClaimType: 'pillars.' + key,
    source: 'canonical_fact',
    required: true,
    ambiguityBehavior: 'requires_resolved',
  })),
  condition: {
    op: 'or',
    expressions: BRANCHES.map((natal) => ({
      op: 'and',
      expressions: [
        {
          op: 'eq',
          left: { kind: 'input', key: 'day', path: 'branch.value' },
          right: { kind: 'literal', value: natal },
        },
        kind === 'clash'
          ? { op: 'not', expression: pair(natal, 'combination') }
          : pair(natal, 'combination'),
        kind === 'combination'
          ? { op: 'not', expression: pair(natal, 'clash') }
          : pair(natal, 'clash'),
      ],
    })),
  },
  output: {
    claimType: INTIMACY_CLAIM,
    subject: 'natal_chart',
    predicate: 'close_relationship_day_branch',
    value: { kind },
    polarity: 'neutral',
    emphasis: 'moderate',
    tags: ['research', 'intimacy', 'natal-branch'],
  },
  sourceRefs: [{ sourceId: INTIMACY_SOURCE.sourceId, supportType: 'interpretive_basis' }],
  quality: {
    provenanceQuality: 'heuristic',
    testCoverage: 'fixture_matrix',
    methodologyStability: 'contested',
    reviewerStatus: 'unreviewed',
  },
  status: 'research',
}));
