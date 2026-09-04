import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import {
  CAREER_ANNUAL_TENSION_CLAIM_TYPE,
  CAREER_ANNUAL_THEME_CLAIM_TYPE,
} from './career-annual-reading-candidate.js';

export const CAREER_ANNUAL_NARRATIVE_PROFILE_VERSION = '0.1.0-research' as const;

export const CAREER_ANNUAL_MANDATORY_QUALIFIER =
  '이는 해당 연도에 두드러질 수 있는 경향을 설명하며, 특정 사건이나 결과를 확정하지 않습니다.';

export const CAREER_ANNUAL_PROHIBITED_FUTURE_PHRASES = Object.freeze([
  '무조건',
  '반드시',
  '확실히',
  '100%',
  '해고된다',
  '퇴사한다',
  '이직한다',
  '취업한다',
  '승진한다',
  '연봉이 오른다',
  '사업이 성공한다',
  '실직한다',
  '해고됩니다',
  '퇴사합니다',
  '이직하게 됩니다',
  '이직합니다',
  '취업합니다',
  '승진합니다',
  '연봉이 오릅니다',
  '사업이 성공합니다',
  '실직합니다',
] as const);

interface CareerAnnualThemeCopy {
  profileId: string;
  semanticKey: string;
  axis: 'core' | 'execution' | 'decision' | 'responsibility' | 'collaboration';
  order: number;
  headline: string;
  summary: string;
}

const THEME_COPY: readonly CareerAnnualThemeCopy[] = Object.freeze([
  {
    profileId: 'PROFILE-CAREER-ANNUAL-BI-GYEON',
    semanticKey: 'CAREER_ANNUAL_SELF_DIRECTED_WORK_DIRECTION',
    axis: 'decision',
    order: 30,
    headline: '업무에서 스스로 결정하고 책임질 범위를 분명히 하려는 흐름이 두드러질 수 있습니다',
    summary:
      '해당 연도에는 맡은 일의 방향을 직접 정하거나 내 판단으로 움직이고 싶은 경향이 커질 수 있습니다. 혼자 다 떠안기보다 결정권과 책임 범위를 함께 명확히 두는 방식이 이 흐름을 안정적으로 쓰는 데 도움이 됩니다.',
  },
  {
    profileId: 'PROFILE-CAREER-ANNUAL-GEOP-JAE',
    semanticKey: 'CAREER_ANNUAL_PEER_COORDINATION_PRESSURE',
    axis: 'collaboration',
    order: 31,
    headline: '동료·경쟁·협업 안에서 역할과 책임 범위를 조정하는 일이 중요해질 수 있습니다',
    summary:
      '해당 연도에는 함께 일하는 사람과 몫을 나누거나 경쟁과 협업의 경계를 정하는 장면이 눈에 띌 수 있습니다. 누가 무엇을 맡는지, 어디까지 협력할지를 구체화할수록 불필요한 업무 마찰을 줄이기 쉽습니다.',
  },
  {
    profileId: 'PROFILE-CAREER-ANNUAL-SIK-SIN',
    semanticKey: 'CAREER_ANNUAL_STEADY_PRODUCTION_CADENCE',
    axis: 'execution',
    order: 32,
    headline: '반복 가능한 산출 방식과 업무 루틴을 안정시키는 흐름이 두드러질 수 있습니다',
    summary:
      '해당 연도에는 단발성 성과보다 결과물을 꾸준히 쌓는 방식이 중요해질 수 있습니다. 작업 단위를 작게 나누고 지속 가능한 생산 리듬을 만드는 쪽이 업무 흐름을 다루기 쉽습니다.',
  },
  {
    profileId: 'PROFILE-CAREER-ANNUAL-SANG-GWAN',
    semanticKey: 'CAREER_ANNUAL_EXPRESSION_PROCESS_CHANGE',
    axis: 'execution',
    order: 33,
    headline: '업무 방식·제안·표현을 바꾸려는 흐름이 강해질 수 있습니다',
    summary:
      '해당 연도에는 기존 절차를 그대로 따르기보다 다른 방식으로 제안하거나 표현하고 싶은 경향이 커질 수 있습니다. 변화의 필요성을 구체적인 근거와 실행안으로 연결하면 마찰을 줄이면서 개선 의도를 전달하기 쉽습니다.',
  },
  {
    profileId: 'PROFILE-CAREER-ANNUAL-PYEON-JAE',
    semanticKey: 'CAREER_ANNUAL_EXTERNAL_PROJECT_RESOURCE_HANDLING',
    axis: 'execution',
    order: 34,
    headline: '외부 프로젝트·기회·자원을 다루는 폭이 넓어질 수 있는 흐름입니다',
    summary:
      '해당 연도에는 외부 협업, 새 프로젝트, 여러 선택지처럼 바깥에서 들어오는 자원을 동시에 살필 일이 늘 수 있습니다. 가능성 자체를 결과로 간주하기보다 실제로 감당할 수 있는 범위와 우선순위를 정하는 방식이 중요합니다.',
  },
  {
    profileId: 'PROFILE-CAREER-ANNUAL-JEONG-JAE',
    semanticKey: 'CAREER_ANNUAL_STRUCTURED_WORK_RESOURCE_MANAGEMENT',
    axis: 'responsibility',
    order: 35,
    headline: '일정·자원·업무량을 구조적으로 관리하는 흐름이 중요해질 수 있습니다',
    summary:
      '해당 연도에는 업무량과 시간, 책임 자원을 정해진 기준 안에서 관리하는 경향이 두드러질 수 있습니다. 지속 가능한 일정과 처리 기준을 세우고 누락 없이 운영하는 방식이 이 흐름과 잘 맞습니다.',
  },
  {
    profileId: 'PROFILE-CAREER-ANNUAL-PYEON-GWAN',
    semanticKey: 'CAREER_ANNUAL_PRESSURE_ACCOUNTABILITY_RESPONSE',
    axis: 'responsibility',
    order: 36,
    headline: '기한·책임·압박에 대응하는 방식이 중요해질 수 있습니다',
    summary:
      '해당 연도에는 빠른 대응이나 높은 책임을 요구하는 업무 압력이 체감될 수 있습니다. 모든 요구를 동시에 처리하기보다 우선순위와 대응 순서를 명확히 두는 것이 압박을 관리하는 데 도움이 됩니다.',
  },
  {
    profileId: 'PROFILE-CAREER-ANNUAL-JEONG-GWAN',
    semanticKey: 'CAREER_ANNUAL_FORMAL_ROLE_RESPONSIBILITY',
    axis: 'responsibility',
    order: 37,
    headline: '공식 역할과 업무 기준을 명확히 하는 흐름이 두드러질 수 있습니다',
    summary:
      '해당 연도에는 직책의 명칭보다 맡은 역할의 기준과 책임 범위를 분명히 하는 일이 중요해질 수 있습니다. 정해진 절차와 약속을 일관되게 지키는 방식이 업무 신뢰를 다지는 데 도움이 됩니다.',
  },
  {
    profileId: 'PROFILE-CAREER-ANNUAL-PYEON-IN',
    semanticKey: 'CAREER_ANNUAL_ALTERNATIVE_LEARNING_PROBLEM_SOLVING',
    axis: 'decision',
    order: 38,
    headline: '새 도구·다른 접근·비정형 학습을 시험하는 흐름이 나타날 수 있습니다',
    summary:
      '해당 연도에는 익숙한 해결법만 반복하기보다 새로운 도구나 다른 관점을 시험하고 싶은 경향이 커질 수 있습니다. 실험 자체를 늘리기보다 실제 업무 문제를 해결하는 데 유효한지 검증하며 적용하는 편이 안정적입니다.',
  },
  {
    profileId: 'PROFILE-CAREER-ANNUAL-JEONG-IN',
    semanticKey: 'CAREER_ANNUAL_FORMAL_SUPPORT_FOUNDATION',
    axis: 'core',
    order: 39,
    headline: '업무 기반 지식과 검증된 기준을 다지는 흐름이 두드러질 수 있습니다',
    summary:
      '해당 연도에는 기초 지식, 문서화된 기준, 주변의 지원을 활용해 업무 기반을 탄탄하게 만드는 경향이 강해질 수 있습니다. 충분히 이해하고 검증한 뒤 적용하는 방식이 판단의 안정성을 높이는 데 도움이 됩니다.',
  },
]);

interface CareerAnnualTensionCopy {
  profileId: string;
  semanticKey: string;
  order: number;
  pillarLabel: string;
}

const TENSION_COPY: readonly CareerAnnualTensionCopy[] = Object.freeze([
  {
    profileId: 'PROFILE-CAREER-ANNUAL-BRANCH-CLASH-YEAR',
    semanticKey: 'CAREER_ANNUAL_BRANCH_CLASH_YEAR',
    order: 80,
    pillarLabel: '연주',
  },
  {
    profileId: 'PROFILE-CAREER-ANNUAL-BRANCH-CLASH-MONTH',
    semanticKey: 'CAREER_ANNUAL_BRANCH_CLASH_MONTH',
    order: 81,
    pillarLabel: '월주',
  },
  {
    profileId: 'PROFILE-CAREER-ANNUAL-BRANCH-CLASH-DAY',
    semanticKey: 'CAREER_ANNUAL_BRANCH_CLASH_DAY',
    order: 82,
    pillarLabel: '일주',
  },
  {
    profileId: 'PROFILE-CAREER-ANNUAL-BRANCH-CLASH-HOUR',
    semanticKey: 'CAREER_ANNUAL_BRANCH_CLASH_HOUR',
    order: 83,
    pillarLabel: '시주',
  },
]);

function themeProfile(copy: CareerAnnualThemeCopy): ClaimNarrativeProfile {
  return {
    profileId: copy.profileId,
    version: CAREER_ANNUAL_NARRATIVE_PROFILE_VERSION,
    claimType: CAREER_ANNUAL_THEME_CLAIM_TYPE.claimType,
    semanticKeys: [copy.semanticKey],
    allowedEpistemicTypes: ['future_tendency'],
    requiredMethodAttribution: true,
    mandatoryQualifier: CAREER_ANNUAL_MANDATORY_QUALIFIER,
    prohibitedPhrases: CAREER_ANNUAL_PROHIBITED_FUTURE_PHRASES,
    renderingHints: [`axis:${copy.axis}`, 'role:primary', `order:${copy.order}`],
    templates: [
      { templateKey: 'headline', language: 'ko', text: copy.headline },
      { templateKey: 'summary', language: 'ko', text: copy.summary },
    ],
  };
}

function tensionProfile(copy: CareerAnnualTensionCopy): ClaimNarrativeProfile {
  return {
    profileId: copy.profileId,
    version: CAREER_ANNUAL_NARRATIVE_PROFILE_VERSION,
    claimType: CAREER_ANNUAL_TENSION_CLAIM_TYPE.claimType,
    semanticKeys: [copy.semanticKey],
    allowedEpistemicTypes: ['future_tendency'],
    requiredMethodAttribution: true,
    mandatoryQualifier: CAREER_ANNUAL_MANDATORY_QUALIFIER,
    prohibitedPhrases: CAREER_ANNUAL_PROHIBITED_FUTURE_PHRASES,
    renderingHints: ['axis:tension', 'role:tension', `order:${copy.order}`],
    templates: [
      {
        templateKey: 'headline',
        language: 'ko',
        text: `${copy.pillarLabel}에서 연운과 원국이 맞부딪히는 업무 조정 신호가 확인됩니다`,
      },
      {
        templateKey: 'summary',
        language: 'ko',
        text: `해당 연도의 지지와 원국 ${copy.pillarLabel}의 지지가 충 관계로 맞물립니다. 이를 특정 직업 사건의 예고로 확대하지 않고, 업무 역할·일정·협업 구조·작업 방식 중 일부를 조정해야 할 압력이 생길 수 있다는 보조 신호로 제한해 해석합니다.`,
      },
    ],
  };
}

export const CAREER_ANNUAL_CLAIM_NARRATIVE_PROFILES: readonly ClaimNarrativeProfile[] =
  Object.freeze([...THEME_COPY.map(themeProfile), ...TENSION_COPY.map(tensionProfile)]);
