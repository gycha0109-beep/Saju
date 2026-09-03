import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import {
  GENERAL_ANNUAL_TENSION_CLAIM_TYPE,
  GENERAL_ANNUAL_THEME_CLAIM_TYPE,
} from './general-annual-reading-candidate.js';

export const GENERAL_ANNUAL_NARRATIVE_PROFILE_VERSION = '0.1.0-research' as const;

const PROHIBITED_FUTURE_PHRASES = Object.freeze([
  '무조건',
  '반드시',
  '확실히',
  '100%',
  '대박',
  '망한다',
  '사고가 난다',
  '병에 걸린다',
  '이별한다',
  '파산한다',
  '당첨된다',
  '승진한다',
  '결혼한다',
] as const);

const ANNUAL_QUALIFIER =
  '이는 해당 연도에 두드러질 수 있는 경향을 설명하며, 특정 사건이나 결과를 확정하지 않습니다.';

interface AnnualThemeCopy {
  profileId: string;
  semanticKey: string;
  order: number;
  headline: string;
  summary: string;
}

const THEME_COPY: readonly AnnualThemeCopy[] = Object.freeze([
  {
    profileId: 'PROFILE-GENERAL-ANNUAL-BI-GYEON',
    semanticKey: 'ANNUAL_PEER_SELF_DIRECTION',
    order: 10,
    headline: '내 기준을 세우고 직접 움직이는 힘이 커질 수 있습니다',
    summary:
      '해당 연도에는 스스로 판단하고 방향을 정하려는 흐름이 두드러질 수 있습니다. 남의 속도에 맞추기보다 내가 책임질 범위와 결정권을 분명히 할수록 이 흐름을 안정적으로 쓰기 쉽습니다.',
  },
  {
    profileId: 'PROFILE-GENERAL-ANNUAL-GEOP-JAE',
    semanticKey: 'ANNUAL_PEER_COMPETITION_COORDINATION',
    order: 11,
    headline: '사람과 자원을 나누는 방식이 중요해질 수 있습니다',
    summary:
      '해당 연도에는 경쟁, 협업, 역할 분담처럼 다른 사람과 몫을 조정하는 상황이 눈에 띌 수 있습니다. 누가 무엇을 맡고 어디까지 책임지는지 경계를 분명히 할수록 불필요한 소모를 줄이는 데 도움이 됩니다.',
  },
  {
    profileId: 'PROFILE-GENERAL-ANNUAL-SIK-SIN',
    semanticKey: 'ANNUAL_OUTPUT_STEADY_PRODUCTION',
    order: 12,
    headline: '꾸준히 만들고 쌓아 가는 흐름을 활용하기 좋은 해입니다',
    summary:
      '해당 연도에는 한 번의 큰 변화보다 결과물을 꾸준히 만들어 내고 생활 리듬을 안정시키는 방향이 잘 맞을 수 있습니다. 작더라도 반복 가능한 생산 방식과 루틴을 만드는 쪽이 흐름을 쓰기 쉽습니다.',
  },
  {
    profileId: 'PROFILE-GENERAL-ANNUAL-SANG-GWAN',
    semanticKey: 'ANNUAL_OUTPUT_EXPRESSION_CHANGE',
    order: 13,
    headline: '표현 방식과 기존 방식을 바꾸려는 힘이 커질 수 있습니다',
    summary:
      '해당 연도에는 생각을 밖으로 드러내거나 새로운 방식으로 바꾸고 싶은 욕구가 커질 수 있습니다. 제안과 변화 시도에는 힘이 실릴 수 있지만, 규칙이나 상대의 기대와 부딪히지 않도록 표현의 강도와 타이밍을 조절하는 편이 유리합니다.',
  },
  {
    profileId: 'PROFILE-GENERAL-ANNUAL-PYEON-JAE',
    semanticKey: 'ANNUAL_WEALTH_EXTERNAL_RESOURCES',
    order: 14,
    headline: '바깥의 기회와 여러 자원을 연결하는 일이 늘어날 수 있습니다',
    summary:
      '해당 연도에는 사람, 정보, 프로젝트처럼 외부에서 들어오는 여러 선택지를 빠르게 살피는 흐름이 두드러질 수 있습니다. 기회가 많아질수록 전부 잡기보다 실제로 감당할 수 있는 범위를 정해 선택과 집중을 하는 편이 안정적입니다.',
  },
  {
    profileId: 'PROFILE-GENERAL-ANNUAL-JEONG-JAE',
    semanticKey: 'ANNUAL_WEALTH_STRUCTURED_RESOURCES',
    order: 15,
    headline: '현실적인 관리와 안정적인 축적이 중요해질 수 있습니다',
    summary:
      '해당 연도에는 돈뿐 아니라 시간, 일정, 자원처럼 현실적으로 관리해야 할 항목을 정돈하는 흐름이 강해질 수 있습니다. 무리하게 넓히기보다 기준을 세우고 반복 가능한 관리 방식을 만드는 쪽이 잘 맞습니다.',
  },
  {
    profileId: 'PROFILE-GENERAL-ANNUAL-PYEON-GWAN',
    semanticKey: 'ANNUAL_OFFICER_PRESSURE_RESPONSE',
    order: 16,
    headline: '압박이 생길수록 우선순위와 대응 방식이 중요해질 수 있습니다',
    summary:
      '해당 연도에는 기한, 경쟁, 책임처럼 빠른 대응을 요구하는 압력이 체감될 수 있습니다. 모든 요구에 즉시 반응하기보다 무엇을 먼저 처리할지 기준을 세우고 대응 순서를 정하는 편이 흐름을 안정시키는 데 도움이 됩니다.',
  },
  {
    profileId: 'PROFILE-GENERAL-ANNUAL-JEONG-GWAN',
    semanticKey: 'ANNUAL_OFFICER_ROLE_RESPONSIBILITY',
    order: 17,
    headline: '역할과 책임을 분명히 하는 흐름이 두드러질 수 있습니다',
    summary:
      '해당 연도에는 정해진 기준, 공식적인 역할, 책임 범위가 이전보다 중요하게 느껴질 수 있습니다. 해야 할 일과 지켜야 할 기준을 명확히 하고 신뢰를 쌓는 방식이 이 흐름과 잘 맞습니다.',
  },
  {
    profileId: 'PROFILE-GENERAL-ANNUAL-PYEON-IN',
    semanticKey: 'ANNUAL_RESOURCE_ALTERNATIVE_LEARNING',
    order: 18,
    headline: '익숙하지 않은 관점과 새로운 학습 방식을 탐색할 수 있습니다',
    summary:
      '해당 연도에는 기존에 익숙한 방식만 따르기보다 다른 관점, 독학, 실험적인 접근에 관심이 커질 수 있습니다. 새로운 정보를 넓게 받아들이되 실제로 쓸 것과 버릴 것을 구분해야 산만함을 줄일 수 있습니다.',
  },
  {
    profileId: 'PROFILE-GENERAL-ANNUAL-JEONG-IN',
    semanticKey: 'ANNUAL_RESOURCE_SUPPORT_LEARNING',
    order: 19,
    headline: '배우고 정리하며 기반을 다지는 흐름이 강해질 수 있습니다',
    summary:
      '해당 연도에는 충분히 이해하고 근거를 정리한 뒤 움직이는 방식이 잘 맞을 수 있습니다. 학습, 자료 정리, 검증된 기준을 확보하는 과정에 시간을 쓰면 이후 판단의 안정성을 높이는 데 도움이 됩니다.',
  },
]);

interface AnnualTensionCopy {
  profileId: string;
  semanticKey: string;
  order: number;
  pillarLabel: string;
}

const TENSION_COPY: readonly AnnualTensionCopy[] = Object.freeze([
  {
    profileId: 'PROFILE-GENERAL-ANNUAL-BRANCH-CLASH-YEAR',
    semanticKey: 'ANNUAL_BRANCH_CLASH_YEAR',
    order: 70,
    pillarLabel: '연주',
  },
  {
    profileId: 'PROFILE-GENERAL-ANNUAL-BRANCH-CLASH-MONTH',
    semanticKey: 'ANNUAL_BRANCH_CLASH_MONTH',
    order: 71,
    pillarLabel: '월주',
  },
  {
    profileId: 'PROFILE-GENERAL-ANNUAL-BRANCH-CLASH-DAY',
    semanticKey: 'ANNUAL_BRANCH_CLASH_DAY',
    order: 72,
    pillarLabel: '일주',
  },
  {
    profileId: 'PROFILE-GENERAL-ANNUAL-BRANCH-CLASH-HOUR',
    semanticKey: 'ANNUAL_BRANCH_CLASH_HOUR',
    order: 73,
    pillarLabel: '시주',
  },
]);

function themeProfile(copy: AnnualThemeCopy): ClaimNarrativeProfile {
  return {
    profileId: copy.profileId,
    version: GENERAL_ANNUAL_NARRATIVE_PROFILE_VERSION,
    claimType: GENERAL_ANNUAL_THEME_CLAIM_TYPE.claimType,
    semanticKeys: [copy.semanticKey],
    allowedEpistemicTypes: ['future_tendency'],
    requiredMethodAttribution: true,
    mandatoryQualifier: ANNUAL_QUALIFIER,
    prohibitedPhrases: PROHIBITED_FUTURE_PHRASES,
    renderingHints: ['axis:core', `order:${copy.order}`],
    templates: [
      { templateKey: 'headline', language: 'ko', text: copy.headline },
      { templateKey: 'summary', language: 'ko', text: copy.summary },
    ],
  };
}

function tensionProfile(copy: AnnualTensionCopy): ClaimNarrativeProfile {
  return {
    profileId: copy.profileId,
    version: GENERAL_ANNUAL_NARRATIVE_PROFILE_VERSION,
    claimType: GENERAL_ANNUAL_TENSION_CLAIM_TYPE.claimType,
    semanticKeys: [copy.semanticKey],
    allowedEpistemicTypes: ['future_tendency'],
    requiredMethodAttribution: true,
    mandatoryQualifier: ANNUAL_QUALIFIER,
    prohibitedPhrases: PROHIBITED_FUTURE_PHRASES,
    renderingHints: ['axis:tension', `order:${copy.order}`],
    templates: [
      {
        templateKey: 'headline',
        language: 'ko',
        text: `${copy.pillarLabel}에서 연운과 원국이 맞부딪히는 보조 신호가 확인됩니다`,
      },
      {
        templateKey: 'summary',
        language: 'ko',
        text: `해당 연도의 지지와 원국 ${copy.pillarLabel}의 지지가 충 관계로 맞물립니다. 이를 특정 사건의 예고로 보지 않고, 기존 흐름과 새 연도의 요구 사이에서 조정이 필요할 수 있다는 보조 신호로 제한해 해석합니다.`,
      },
    ],
  };
}

export const GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES: readonly ClaimNarrativeProfile[] =
  Object.freeze([...THEME_COPY.map(themeProfile), ...TENSION_COPY.map(tensionProfile)]);
