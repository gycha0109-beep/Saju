import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import {
  RELATIONSHIP_ANNUAL_TENSION_CLAIM_TYPE,
  RELATIONSHIP_ANNUAL_THEME_CLAIM_TYPE,
} from './relationship-annual-reading-candidate.js';

export const RELATIONSHIP_ANNUAL_NARRATIVE_PROFILE_VERSION = '0.1.0-research' as const;

export const RELATIONSHIP_ANNUAL_MANDATORY_QUALIFIER =
  '이는 해당 연도에 두드러질 수 있는 관계·소통 경향을 설명하며, 특정 만남·연애·결혼·이별·재회 같은 관계 결과를 확정하지 않습니다.';

export const RELATIONSHIP_ANNUAL_PROHIBITED_FUTURE_PHRASES = Object.freeze([
  '무조건 결혼',
  '반드시 결혼',
  '확실히 결혼',
  '100% 결혼',
  '결혼하게 됩니다',
  '결혼한다',
  '헤어지게 됩니다',
  '헤어진다',
  '재회하게 됩니다',
  '재회한다',
  '애인이 생깁니다',
  '애인이 생긴다',
  '새로운 사람이 나타납니다',
  '새로운 사람이 나타난다',
  '상대가 연락합니다',
  '상대가 연락한다',
  '임신하게 됩니다',
  '임신한다',
  '바람을 핍니다',
  '바람을 핀다',
] as const);

interface RelationshipAnnualThemeCopy {
  profileId: string;
  semanticKey: string;
  axis: 'closeness' | 'communication' | 'boundary' | 'reciprocity' | 'tension';
  order: number;
  headline: string;
  summary: string;
}

const THEME_COPY: readonly RelationshipAnnualThemeCopy[] = Object.freeze([
  {
    profileId: 'PROFILE-RELATIONSHIP-ANNUAL-BI-GYEON',
    semanticKey: 'RELATIONSHIP_ANNUAL_AUTONOMY_RECIPROCITY',
    axis: 'boundary',
    order: 30,
    headline: '가까워지더라도 각자의 선택권과 속도를 존중하려는 흐름이 두드러질 수 있습니다',
    summary:
      '해당 연도에는 관계를 유지하면서도 내 시간과 판단 범위를 분명히 두고 싶은 경향이 커질 수 있습니다. 친밀함과 독립성을 서로 반대되는 것으로 보기보다 각자 결정할 부분과 함께 맞출 부분을 구분하면 관계의 균형을 다루기 쉽습니다.',
  },
  {
    profileId: 'PROFILE-RELATIONSHIP-ANNUAL-GEOP-JAE',
    semanticKey: 'RELATIONSHIP_ANNUAL_BOUNDARY_NEGOTIATION',
    axis: 'boundary',
    order: 31,
    headline: '비교·경쟁·역할 분담 속에서 관계의 경계를 다시 조정하는 일이 중요해질 수 있습니다',
    summary:
      '해당 연도에는 누가 더 많이 맞추는지, 시간과 관심을 어떻게 나누는지처럼 관계의 몫을 의식하기 쉬울 수 있습니다. 상대를 이기거나 밀어내는 방향보다 서로 기대하는 범위와 양보 가능한 선을 구체적으로 확인하는 편이 불필요한 힘겨루기를 줄이기 쉽습니다.',
  },
  {
    profileId: 'PROFILE-RELATIONSHIP-ANNUAL-SIK-SIN',
    semanticKey: 'RELATIONSHIP_ANNUAL_STEADY_EXPRESSION',
    axis: 'communication',
    order: 32,
    headline: '꾸준하고 편안한 표현을 통해 관계의 리듬을 만드는 흐름이 두드러질 수 있습니다',
    summary:
      '해당 연도에는 큰 표현 한 번보다 자주 안부를 묻고 생각을 나누는 식의 지속적인 소통이 더 중요하게 느껴질 수 있습니다. 감정을 과장해서 전달하기보다 일상적인 표현과 반응을 쌓아가는 방식이 관계를 이해하는 데 잘 맞을 수 있습니다.',
  },
  {
    profileId: 'PROFILE-RELATIONSHIP-ANNUAL-SANG-GWAN',
    semanticKey: 'RELATIONSHIP_ANNUAL_COMMUNICATION_RENEGOTIATION',
    axis: 'communication',
    order: 33,
    headline: '기존의 말하기 방식이나 관계 규칙을 다시 표현하고 조정하려는 흐름이 나타날 수 있습니다',
    summary:
      '해당 연도에는 참고 넘어가던 부분을 말로 드러내거나 익숙한 소통 방식을 바꾸고 싶은 경향이 커질 수 있습니다. 솔직함 자체를 목표로 삼기보다 무엇을 바꾸고 싶은지와 상대가 이해할 수 있는 표현 방식을 함께 고려하면 조정이 더 명확해질 수 있습니다.',
  },
  {
    profileId: 'PROFILE-RELATIONSHIP-ANNUAL-PYEON-JAE',
    semanticKey: 'RELATIONSHIP_ANNUAL_SOCIAL_OPENNESS',
    axis: 'closeness',
    order: 34,
    headline: '다양한 사람과 상황을 접하며 관계 선택지를 넓게 바라보는 흐름이 커질 수 있습니다',
    summary:
      '해당 연도에는 새로운 환경이나 여러 형태의 교류에 관심이 넓어질 수 있습니다. 이를 특정 만남이나 연애 성사의 예고로 보지 않고, 어떤 관계가 내게 편한지 비교하고 경험 범위를 넓게 살피는 경향으로 제한해 해석합니다.',
  },
  {
    profileId: 'PROFILE-RELATIONSHIP-ANNUAL-JEONG-JAE',
    semanticKey: 'RELATIONSHIP_ANNUAL_CONSISTENT_RECIPROCITY',
    axis: 'reciprocity',
    order: 35,
    headline: '시간·약속·관심을 꾸준히 주고받는 관계의 안정성을 중요하게 보는 흐름이 두드러질 수 있습니다',
    summary:
      '해당 연도에는 말보다 실제로 시간을 내고 약속을 지키는 행동처럼 반복해서 확인되는 부분을 더 중요하게 볼 수 있습니다. 한쪽만 계속 맞추는지보다 서로 감당 가능한 수준에서 주고받는 방식이 유지되는지를 살피는 편이 잘 맞을 수 있습니다.',
  },
  {
    profileId: 'PROFILE-RELATIONSHIP-ANNUAL-PYEON-GWAN',
    semanticKey: 'RELATIONSHIP_ANNUAL_INTERACTION_PRESSURE_RESPONSE',
    axis: 'tension',
    order: 36,
    headline: '관계에서 요구·기한·책임이 커질 때 압박을 어떻게 다룰지가 중요해질 수 있습니다',
    summary:
      '해당 연도에는 즉답을 요구받거나 관계의 책임을 빠르게 정해야 하는 상황이 심리적으로 크게 느껴질 수 있습니다. 압박 자체를 관계 결과의 신호로 보지 말고 무엇이 실제 책임이고 무엇이 상대의 기대인지 구분해 반응 속도를 조절하는 편이 도움이 될 수 있습니다.',
  },
  {
    profileId: 'PROFILE-RELATIONSHIP-ANNUAL-JEONG-GWAN',
    semanticKey: 'RELATIONSHIP_ANNUAL_ROLE_EXPECTATION_CLARITY',
    axis: 'reciprocity',
    order: 37,
    headline: '관계에서 서로 기대하는 역할과 약속을 분명히 하고 싶은 흐름이 두드러질 수 있습니다',
    summary:
      '해당 연도에는 애매하게 이해하고 넘어가기보다 연락, 약속, 책임처럼 서로 기대하는 기준을 확인하는 일이 중요하게 느껴질 수 있습니다. 이런 경향을 결혼이나 관계 확정의 예고로 확대하지 않고, 현재 관계에서 역할과 기준을 명료하게 다루려는 흐름으로 봅니다.',
  },
  {
    profileId: 'PROFILE-RELATIONSHIP-ANNUAL-PYEON-IN',
    semanticKey: 'RELATIONSHIP_ANNUAL_REFLECTIVE_DISTANCE',
    axis: 'closeness',
    order: 38,
    headline: '관계를 바로 규정하기보다 한 발 떨어져 해석하고 생각을 정리하려는 흐름이 나타날 수 있습니다',
    summary:
      '해당 연도에는 상대의 말이나 관계 분위기를 곧바로 결론내리기보다 다른 가능성을 생각하며 관찰하고 싶은 경향이 커질 수 있습니다. 생각이 길어져 소통이 끊기지 않도록 필요한 거리와 다시 대화할 시점을 구분하는 방식이 유용할 수 있습니다.',
  },
  {
    profileId: 'PROFILE-RELATIONSHIP-ANNUAL-JEONG-IN',
    semanticKey: 'RELATIONSHIP_ANNUAL_SUPPORT_RECEPTIVITY',
    axis: 'closeness',
    order: 39,
    headline: '신뢰할 수 있는 지지와 이해를 주고받는 관계를 중요하게 느끼는 흐름이 두드러질 수 있습니다',
    summary:
      '해당 연도에는 내 상황을 충분히 이해해주는지, 필요할 때 안정적으로 지지해주는지를 관계의 중요한 기준으로 볼 수 있습니다. 도움을 받는 것과 의존을 같은 것으로 보지 않고 어떤 지원이 실제로 편한지 표현하면 상호 이해를 높이기 쉽습니다.',
  },
]);

interface RelationshipAnnualTensionCopy {
  profileId: string;
  semanticKey: string;
  order: number;
  pillarLabel: string;
}

const TENSION_COPY: readonly RelationshipAnnualTensionCopy[] = Object.freeze([
  { profileId: 'PROFILE-RELATIONSHIP-ANNUAL-BRANCH-CLASH-YEAR', semanticKey: 'RELATIONSHIP_ANNUAL_BRANCH_CLASH_YEAR', order: 80, pillarLabel: '연주' },
  { profileId: 'PROFILE-RELATIONSHIP-ANNUAL-BRANCH-CLASH-MONTH', semanticKey: 'RELATIONSHIP_ANNUAL_BRANCH_CLASH_MONTH', order: 81, pillarLabel: '월주' },
  { profileId: 'PROFILE-RELATIONSHIP-ANNUAL-BRANCH-CLASH-DAY', semanticKey: 'RELATIONSHIP_ANNUAL_BRANCH_CLASH_DAY', order: 82, pillarLabel: '일주' },
  { profileId: 'PROFILE-RELATIONSHIP-ANNUAL-BRANCH-CLASH-HOUR', semanticKey: 'RELATIONSHIP_ANNUAL_BRANCH_CLASH_HOUR', order: 83, pillarLabel: '시주' },
]);

function themeProfile(copy: RelationshipAnnualThemeCopy): ClaimNarrativeProfile {
  return {
    profileId: copy.profileId,
    version: RELATIONSHIP_ANNUAL_NARRATIVE_PROFILE_VERSION,
    claimType: RELATIONSHIP_ANNUAL_THEME_CLAIM_TYPE,
    semanticKeys: [copy.semanticKey],
    allowedEpistemicTypes: ['future_tendency'],
    requiredMethodAttribution: true,
    mandatoryQualifier: RELATIONSHIP_ANNUAL_MANDATORY_QUALIFIER,
    prohibitedPhrases: RELATIONSHIP_ANNUAL_PROHIBITED_FUTURE_PHRASES,
    renderingHints: [`axis:${copy.axis}`, 'role:primary', `order:${copy.order}`],
    templates: [
      { templateKey: 'headline', language: 'ko', text: copy.headline },
      { templateKey: 'summary', language: 'ko', text: copy.summary },
    ],
  };
}

function tensionProfile(copy: RelationshipAnnualTensionCopy): ClaimNarrativeProfile {
  return {
    profileId: copy.profileId,
    version: RELATIONSHIP_ANNUAL_NARRATIVE_PROFILE_VERSION,
    claimType: RELATIONSHIP_ANNUAL_TENSION_CLAIM_TYPE,
    semanticKeys: [copy.semanticKey],
    allowedEpistemicTypes: ['future_tendency'],
    requiredMethodAttribution: true,
    mandatoryQualifier: RELATIONSHIP_ANNUAL_MANDATORY_QUALIFIER,
    prohibitedPhrases: RELATIONSHIP_ANNUAL_PROHIBITED_FUTURE_PHRASES,
    renderingHints: ['axis:tension', 'role:tension', `order:${copy.order}`],
    templates: [
      {
        templateKey: 'headline',
        language: 'ko',
        text: `${copy.pillarLabel}에서 연운과 원국이 맞부딪히는 관계 조정 신호가 확인됩니다`,
      },
      {
        templateKey: 'summary',
        language: 'ko',
        text: `해당 연도의 지지와 원국 ${copy.pillarLabel}의 지지가 충 관계로 맞물립니다. 이를 이별·다툼·재회 같은 특정 관계 사건의 예고로 확대하지 않고, 소통 방식·서로의 기대·관계의 경계·진행 속도 중 일부를 다시 맞춰야 할 압력이 생길 수 있다는 보조 신호로 제한해 해석합니다.`,
      },
    ],
  };
}

export const RELATIONSHIP_ANNUAL_CLAIM_NARRATIVE_PROFILES: readonly ClaimNarrativeProfile[] =
  Object.freeze([...THEME_COPY.map(themeProfile), ...TENSION_COPY.map(tensionProfile)]);
