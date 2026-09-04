import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import {
  WEALTH_ANNUAL_TENSION_CLAIM_TYPE,
  WEALTH_ANNUAL_THEME_CLAIM_TYPE,
} from './wealth-annual-reading-candidate.js';

export const WEALTH_ANNUAL_NARRATIVE_PROFILE_VERSION = '0.1.0-research' as const;

export const WEALTH_ANNUAL_MANDATORY_QUALIFIER =
  '이는 해당 연도에 두드러질 수 있는 재물 관리·의사결정 경향을 설명하며, 수입·수익·손실·투자 결과를 예측하거나 금융 조언을 제공하지 않습니다.';

export const WEALTH_ANNUAL_PROHIBITED_FUTURE_PHRASES = Object.freeze([
  '무조건',
  '반드시',
  '확실히',
  '100%',
  '부자가 된다',
  '부자가 됩니다',
  '돈을 많이 번다',
  '돈을 많이 법니다',
  '수익이 난다',
  '수익이 납니다',
  '투자하면 성공',
  '투자 수익을 보장',
  '재산이 늘어난다',
  '재산이 늘어납니다',
  '손실이 난다',
  '손실이 납니다',
  '빚이 생긴다',
  '빚이 생깁니다',
  '횡재한다',
  '횡재합니다',
  '로또에 당첨',
] as const);

interface WealthAnnualThemeCopy {
  profileId: string;
  semanticKey: string;
  axis: 'core' | 'execution' | 'decision' | 'responsibility' | 'collaboration';
  order: number;
  headline: string;
  summary: string;
}

const THEME_COPY: readonly WealthAnnualThemeCopy[] = Object.freeze([
  {
    profileId: 'PROFILE-WEALTH-ANNUAL-BI-GYEON',
    semanticKey: 'WEALTH_ANNUAL_AUTONOMY_SPENDING_BOUNDARIES',
    axis: 'decision',
    order: 30,
    headline: '내가 통제할 수 있는 지출·선택 범위를 분명히 하려는 흐름이 두드러질 수 있습니다',
    summary:
      '해당 연도에는 돈을 어디에 쓰고 무엇을 남겨둘지 스스로 결정하고 싶은 경향이 커질 수 있습니다. 모든 선택을 즉흥적으로 가져가기보다 자유롭게 쓸 범위와 지켜둘 범위를 미리 나누는 방식이 판단을 단순하게 만들 수 있습니다.',
  },
  {
    profileId: 'PROFILE-WEALTH-ANNUAL-GEOP-JAE',
    semanticKey: 'WEALTH_ANNUAL_SHARED_RESOURCE_COORDINATION',
    axis: 'collaboration',
    order: 31,
    headline: '공동 비용·공유 자원·몫의 경계를 조정하는 일이 중요해질 수 있습니다',
    summary:
      '해당 연도에는 다른 사람과 함께 쓰는 돈이나 자원, 비용 분담처럼 경계가 필요한 문제가 눈에 띌 수 있습니다. 누가 무엇을 부담하고 어떤 기준으로 나눌지를 먼저 정하면 비교나 경쟁 때문에 생기는 불필요한 마찰을 줄이기 쉽습니다.',
  },
  {
    profileId: 'PROFILE-WEALTH-ANNUAL-SIK-SIN',
    semanticKey: 'WEALTH_ANNUAL_STEADY_VALUE_CREATION_CADENCE',
    axis: 'execution',
    order: 32,
    headline: '돈 자체보다 반복해서 가치를 만드는 활동을 점검하는 흐름이 두드러질 수 있습니다',
    summary:
      '해당 연도에는 한 번의 큰 결과를 기대하기보다 꾸준히 만들고 제공하는 활동이 어떤 가치를 만드는지 확인하는 일이 중요해질 수 있습니다. 결과물을 지속 가능한 리듬으로 쌓고 비용과 시간을 함께 점검하는 방식이 잘 맞을 수 있습니다.',
  },
  {
    profileId: 'PROFILE-WEALTH-ANNUAL-SANG-GWAN',
    semanticKey: 'WEALTH_ANNUAL_RESOURCE_USE_EXPERIMENTATION',
    axis: 'decision',
    order: 33,
    headline: '기존 소비·자원 사용 방식을 바꾸거나 새 기준을 시험해보려는 흐름이 나타날 수 있습니다',
    summary:
      '해당 연도에는 익숙한 지출 방식이나 자원 배분 기준을 그대로 두기보다 다른 방법을 시험하고 싶은 경향이 커질 수 있습니다. 변화 자체를 목표로 삼기보다 무엇을 확인하려는 실험인지 기준을 세우면 판단을 과도하게 흔들지 않고 조정하기 쉽습니다.',
  },
  {
    profileId: 'PROFILE-WEALTH-ANNUAL-PYEON-JAE',
    semanticKey: 'WEALTH_ANNUAL_VARIABLE_RESOURCE_OPTION_HANDLING',
    axis: 'decision',
    order: 34,
    headline: '여러 선택지와 변동성 있는 자원을 동시에 살피는 흐름이 커질 수 있습니다',
    summary:
      '해당 연도에는 외부 제안, 새로운 소비 선택지, 가변적인 자원처럼 비교해야 할 대상이 늘 수 있습니다. 가능성이 많다는 사실을 실제 경제적 결과로 간주하지 말고, 감당 가능한 범위와 우선순위를 먼저 정하는 방식이 중요합니다.',
  },
  {
    profileId: 'PROFILE-WEALTH-ANNUAL-JEONG-JAE',
    semanticKey: 'WEALTH_ANNUAL_STRUCTURED_BUDGETING_ALLOCATION',
    axis: 'responsibility',
    order: 35,
    headline: '예산과 지출 목적을 구조적으로 나누는 흐름이 두드러질 수 있습니다',
    summary:
      '해당 연도에는 생활비, 계획된 지출, 여유 자원처럼 돈의 역할을 구분하고 관리하는 경향이 강해질 수 있습니다. 숫자를 촘촘하게 통제하기보다 각 범주의 목적과 한도를 분명히 두는 편이 지속하기 쉽습니다.',
  },
  {
    profileId: 'PROFILE-WEALTH-ANNUAL-PYEON-GWAN',
    semanticKey: 'WEALTH_ANNUAL_OBLIGATION_PRESSURE_RESPONSE',
    axis: 'responsibility',
    order: 36,
    headline: '금전적 의무와 기한 압박을 어떤 순서로 처리할지가 중요해질 수 있습니다',
    summary:
      '해당 연도에는 정해진 납부, 책임 비용, 예정된 지출처럼 피하기 어려운 의무가 심리적으로 크게 느껴질 수 있습니다. 모든 부담을 하나로 보지 말고 기한과 필수도를 기준으로 순서를 정하는 방식이 압박을 관리하는 데 도움이 됩니다.',
  },
  {
    profileId: 'PROFILE-WEALTH-ANNUAL-JEONG-GWAN',
    semanticKey: 'WEALTH_ANNUAL_FORMAL_FINANCIAL_RULES',
    axis: 'responsibility',
    order: 37,
    headline: '돈을 다루는 공식 기준과 약속을 분명히 하는 흐름이 두드러질 수 있습니다',
    summary:
      '해당 연도에는 계약, 정기 결제, 공동 비용 규칙처럼 이미 정해진 기준을 확인하고 지키는 일이 중요하게 느껴질 수 있습니다. 책임 범위와 확인 절차가 분명할수록 자원 관리의 불확실성을 줄이기 쉽습니다.',
  },
  {
    profileId: 'PROFILE-WEALTH-ANNUAL-PYEON-IN',
    semanticKey: 'WEALTH_ANNUAL_EXPLORATORY_RESOURCE_LEARNING',
    axis: 'decision',
    order: 38,
    headline: '새 도구·정보·비정형적인 관리 방법을 탐색하는 흐름이 나타날 수 있습니다',
    summary:
      '해당 연도에는 기존 방식과 다른 관리 도구나 정보를 찾아보고 싶은 경향이 커질 수 있습니다. 새로운 방법이 흥미롭다는 이유만으로 적용하기보다 실제 생활의 비용·시간·관리 부담을 줄이는지 확인하며 시험하는 편이 안정적입니다.',
  },
  {
    profileId: 'PROFILE-WEALTH-ANNUAL-JEONG-IN',
    semanticKey: 'WEALTH_ANNUAL_FINANCIAL_FOUNDATION_REVIEW',
    axis: 'core',
    order: 39,
    headline: '기초적인 돈 관리 기준과 필요한 정보를 다시 정리하는 흐름이 두드러질 수 있습니다',
    summary:
      '해당 연도에는 새로운 선택을 늘리기보다 현재의 고정비, 지출 기준, 필요한 자료를 차분히 정리하는 경향이 강해질 수 있습니다. 충분히 이해하지 못한 선택을 서두르기보다 기본 구조를 확인한 뒤 움직이는 방식이 판단의 안정성을 높일 수 있습니다.',
  },
]);

interface WealthAnnualTensionCopy {
  profileId: string;
  semanticKey: string;
  order: number;
  pillarLabel: string;
}

const TENSION_COPY: readonly WealthAnnualTensionCopy[] = Object.freeze([
  {
    profileId: 'PROFILE-WEALTH-ANNUAL-BRANCH-CLASH-YEAR',
    semanticKey: 'WEALTH_ANNUAL_BRANCH_CLASH_YEAR',
    order: 80,
    pillarLabel: '연주',
  },
  {
    profileId: 'PROFILE-WEALTH-ANNUAL-BRANCH-CLASH-MONTH',
    semanticKey: 'WEALTH_ANNUAL_BRANCH_CLASH_MONTH',
    order: 81,
    pillarLabel: '월주',
  },
  {
    profileId: 'PROFILE-WEALTH-ANNUAL-BRANCH-CLASH-DAY',
    semanticKey: 'WEALTH_ANNUAL_BRANCH_CLASH_DAY',
    order: 82,
    pillarLabel: '일주',
  },
  {
    profileId: 'PROFILE-WEALTH-ANNUAL-BRANCH-CLASH-HOUR',
    semanticKey: 'WEALTH_ANNUAL_BRANCH_CLASH_HOUR',
    order: 83,
    pillarLabel: '시주',
  },
]);

function themeProfile(copy: WealthAnnualThemeCopy): ClaimNarrativeProfile {
  return {
    profileId: copy.profileId,
    version: WEALTH_ANNUAL_NARRATIVE_PROFILE_VERSION,
    claimType: WEALTH_ANNUAL_THEME_CLAIM_TYPE,
    semanticKeys: [copy.semanticKey],
    allowedEpistemicTypes: ['future_tendency'],
    requiredMethodAttribution: true,
    mandatoryQualifier: WEALTH_ANNUAL_MANDATORY_QUALIFIER,
    prohibitedPhrases: WEALTH_ANNUAL_PROHIBITED_FUTURE_PHRASES,
    renderingHints: [`axis:${copy.axis}`, 'role:primary', `order:${copy.order}`],
    templates: [
      { templateKey: 'headline', language: 'ko', text: copy.headline },
      { templateKey: 'summary', language: 'ko', text: copy.summary },
    ],
  };
}

function tensionProfile(copy: WealthAnnualTensionCopy): ClaimNarrativeProfile {
  return {
    profileId: copy.profileId,
    version: WEALTH_ANNUAL_NARRATIVE_PROFILE_VERSION,
    claimType: WEALTH_ANNUAL_TENSION_CLAIM_TYPE,
    semanticKeys: [copy.semanticKey],
    allowedEpistemicTypes: ['future_tendency'],
    requiredMethodAttribution: true,
    mandatoryQualifier: WEALTH_ANNUAL_MANDATORY_QUALIFIER,
    prohibitedPhrases: WEALTH_ANNUAL_PROHIBITED_FUTURE_PHRASES,
    renderingHints: ['axis:tension', 'role:tension', `order:${copy.order}`],
    templates: [
      {
        templateKey: 'headline',
        language: 'ko',
        text: `${copy.pillarLabel}에서 연운과 원국이 맞부딪히는 재물 계획 조정 신호가 확인됩니다`,
      },
      {
        templateKey: 'summary',
        language: 'ko',
        text: `해당 연도의 지지와 원국 ${copy.pillarLabel}의 지지가 충 관계로 맞물립니다. 이를 손실·부채·수입 변화 같은 특정 금전 사건의 예고로 확대하지 않고, 예산·금전적 약속·공유 자원·지출 우선순위 중 일부를 다시 조정해야 할 압력이 생길 수 있다는 보조 신호로 제한해 해석합니다.`,
      },
    ],
  };
}

export const WEALTH_ANNUAL_CLAIM_NARRATIVE_PROFILES: readonly ClaimNarrativeProfile[] =
  Object.freeze([...THEME_COPY.map(themeProfile), ...TENSION_COPY.map(tensionProfile)]);
