import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import type { TenGod } from '../contracts/calculation.js';
import {
  BUSINESS_ANNUAL_TENSION_CLAIM_TYPE,
  BUSINESS_ANNUAL_THEME_CLAIM_TYPE,
} from './business-annual-reading-candidate.js';

export const BUSINESS_ANNUAL_NARRATIVE_PROFILE_VERSION = '0.1.0-research' as const;

export const BUSINESS_ANNUAL_MANDATORY_QUALIFIER =
  '이는 해당 연도에 두드러질 수 있는 사업 운영 경향을 설명하며, 창업 성공·매출·수익·투자·자금조달·폐업 같은 사업 결과를 확정하거나 재무 조언을 제공하지 않습니다.';

export const BUSINESS_ANNUAL_PROHIBITED_FUTURE_PHRASES = Object.freeze([
  '무조건 성공',
  '반드시 성공',
  '확실히 성공',
  '100% 성공',
  '사업하면 성공',
  '창업하면 성공',
  '사업이 성공합니다',
  '사업이 성공한다',
  '매출이 오릅니다',
  '매출이 오른다',
  '수익이 늘어납니다',
  '수익이 늘어난다',
  '투자를 받습니다',
  '투자를 받는다',
  '자금조달에 성공합니다',
  '자금조달에 성공한다',
  '폐업하게 됩니다',
  '폐업한다',
  '사업이 망합니다',
  '사업이 망한다',
  '사업가 체질입니다',
  '사업가 체질이다',
] as const);

interface ThemeCopy {
  slug: string;
  semanticKey: string;
  axis: 'decision' | 'execution' | 'collaboration' | 'responsibility' | 'tension';
  headline: string;
  summary: string;
}

const THEME_COPY: Readonly<Record<TenGod, ThemeCopy>> = Object.freeze({
  비견: {
    slug: 'BI-GYEON',
    semanticKey: 'BUSINESS_ANNUAL_DECISION_OWNERSHIP',
    axis: 'decision',
    headline: '핵심 판단에서 직접 결정하고 책임질 범위를 분명히 하려는 흐름이 두드러질 수 있습니다',
    summary:
      '해당 연도에는 사업 운영에서 남의 판단을 그대로 따르기보다 내가 납득한 기준으로 선택하고 싶은 경향이 커질 수 있습니다. 모든 일을 혼자 결정하기보다 어떤 사안은 직접 정하고 어떤 사안은 합의할지 결정권의 경계를 구체화하는 편이 안정적입니다.',
  },
  겁재: {
    slug: 'GEOP-JAE',
    semanticKey: 'BUSINESS_ANNUAL_PARTNER_COORDINATION',
    axis: 'collaboration',
    headline: '파트너·동료·경쟁 관계에서 역할과 몫을 다시 조정하는 일이 중요해질 수 있습니다',
    summary:
      '해당 연도에는 누가 무엇을 맡고 어떤 자원과 기회를 나눌지에 대한 조율이 더 크게 느껴질 수 있습니다. 상대를 이기거나 밀어내는 신호로 보지 않고 결정권·책임·기여 범위를 명확히 하는 운영 과제로 제한해 보는 편이 좋습니다.',
  },
  식신: {
    slug: 'SIK-SIN',
    semanticKey: 'BUSINESS_ANNUAL_EXECUTION_CADENCE',
    axis: 'execution',
    headline: '아이디어를 꾸준히 결과물과 운영 루틴으로 바꾸는 흐름이 중요해질 수 있습니다',
    summary:
      '해당 연도에는 한 번의 큰 시도보다 반복 가능한 실행과 산출 리듬을 만드는 일이 눈에 띌 수 있습니다. 특정 성과를 보장하는 신호가 아니라 무엇을 얼마나 자주 만들고 검증할지를 운영 주기로 정리하려는 경향으로 해석합니다.',
  },
  상관: {
    slug: 'SANG-GWAN',
    semanticKey: 'BUSINESS_ANNUAL_EXPERIMENTATION_FEEDBACK',
    axis: 'execution',
    headline: '기존 방식에 의문을 제기하고 작은 실험과 피드백으로 운영 방식을 바꾸려는 흐름이 커질 수 있습니다',
    summary:
      '해당 연도에는 익숙한 절차를 그대로 유지하기보다 다른 제안·표현·실험을 시험하고 싶은 경향이 나타날 수 있습니다. 변화 자체를 성공 예고로 확대하지 않고 가설을 작게 검증하고 반응을 확인하는 운영 방식으로 제한해 봅니다.',
  },
  편재: {
    slug: 'PYEON-JAE',
    semanticKey: 'BUSINESS_ANNUAL_OPPORTUNITY_ALLOCATION',
    axis: 'decision',
    headline: '외부 기회와 여러 선택지 사이에서 자원을 어디에 배분할지 판단하는 일이 중요해질 수 있습니다',
    summary:
      '해당 연도에는 프로젝트·협업·시장 선택지처럼 바깥에서 들어오는 가능성을 넓게 살피는 경향이 커질 수 있습니다. 이를 매출이나 투자 성과의 예고로 보지 않고 감당 가능한 범위, 우선순위, 검증 비용을 정하는 자원 배분 문제로 제한해 해석합니다.',
  },
  정재: {
    slug: 'JEONG-JAE',
    semanticKey: 'BUSINESS_ANNUAL_BUDGET_DISCIPLINE',
    axis: 'responsibility',
    headline: '예산·시간·업무량을 일정한 기준으로 관리하는 운영 규율이 중요해질 수 있습니다',
    summary:
      '해당 연도에는 비용과 시간을 정해진 기준 안에서 관리하고 반복되는 운영 항목을 정리하고 싶은 경향이 두드러질 수 있습니다. 수익 증가를 뜻하는 신호가 아니라 자원을 어디에 얼마나 쓰고 어떻게 점검할지 구조화하려는 흐름으로 봅니다.',
  },
  편관: {
    slug: 'PYEON-GWAN',
    semanticKey: 'BUSINESS_ANNUAL_PRESSURE_RISK_RESPONSE',
    axis: 'tension',
    headline: '기한·책임·변동성이 커질 때 압박과 위험 신호에 대응하는 방식이 중요해질 수 있습니다',
    summary:
      '해당 연도에는 빠른 판단이나 높은 책임을 요구받는 상황을 더 크게 체감할 수 있습니다. 이를 실패나 손실의 예고로 단정하지 않고 우선순위를 정하고 감당 가능한 위험 범위를 구분하는 운영 대응 경향으로 제한해 해석합니다.',
  },
  정관: {
    slug: 'JEONG-GWAN',
    semanticKey: 'BUSINESS_ANNUAL_ACCOUNTABILITY_GOVERNANCE',
    axis: 'responsibility',
    headline: '역할·기준·책임 소재를 명확히 하는 운영 거버넌스가 중요해질 수 있습니다',
    summary:
      '해당 연도에는 누가 어떤 결정을 내리고 그 결과를 누가 확인할지처럼 운영 기준을 분명히 하고 싶은 경향이 커질 수 있습니다. 회사 규모 확대나 제도적 성공을 예고하는 신호가 아니라 책임과 절차를 명료하게 관리하려는 흐름으로 봅니다.',
  },
  편인: {
    slug: 'PYEON-IN',
    semanticKey: 'BUSINESS_ANNUAL_ALTERNATIVE_RESEARCH',
    axis: 'decision',
    headline: '기존 정답보다 다른 자료·도구·전략을 탐색하며 문제를 다시 정의하려는 흐름이 나타날 수 있습니다',
    summary:
      '해당 연도에는 익숙한 운영법만 반복하기보다 새로운 정보나 다른 관점에서 문제를 살피고 싶은 경향이 커질 수 있습니다. 아이디어를 결과로 간주하지 않고 실제 사업 문제에 유효한지 작은 검증으로 연결하는 편이 좋습니다.',
  },
  정인: {
    slug: 'JEONG-IN',
    semanticKey: 'BUSINESS_ANNUAL_FOUNDATION_SUPPORT',
    axis: 'responsibility',
    headline: '기초 정보·문서·지원 체계를 정리해 운영 기반을 다지는 흐름이 두드러질 수 있습니다',
    summary:
      '해당 연도에는 충분히 이해한 기준, 검증된 정보, 주변의 지원을 활용해 운영 기반을 안정시키려는 경향이 강해질 수 있습니다. 특정 사업 결과를 보장하는 신호가 아니라 판단과 실행을 받쳐주는 기반을 정리하는 흐름으로 제한해 해석합니다.',
  },
});

const TEN_GODS = Object.keys(THEME_COPY) as TenGod[];
const PILLARS = [
  { slot: 'year', label: '연주', order: 0 },
  { slot: 'month', label: '월주', order: 1 },
  { slot: 'day', label: '일주', order: 2 },
  { slot: 'hour', label: '시주', order: 3 },
] as const;

function themeProfile(tenGod: TenGod, index: number): ClaimNarrativeProfile {
  const copy = THEME_COPY[tenGod];
  return {
    profileId: `PROFILE-BUSINESS-ANNUAL-${copy.slug}`,
    version: BUSINESS_ANNUAL_NARRATIVE_PROFILE_VERSION,
    claimType: BUSINESS_ANNUAL_THEME_CLAIM_TYPE,
    semanticKeys: [copy.semanticKey],
    allowedEpistemicTypes: ['future_tendency'],
    requiredMethodAttribution: true,
    mandatoryQualifier: BUSINESS_ANNUAL_MANDATORY_QUALIFIER,
    prohibitedPhrases: BUSINESS_ANNUAL_PROHIBITED_FUTURE_PHRASES,
    renderingHints: [`axis:${copy.axis}`, 'role:primary', `order:${30 + index}`],
    templates: [
      { templateKey: 'headline', language: 'ko', text: copy.headline },
      { templateKey: 'summary', language: 'ko', text: copy.summary },
    ],
  };
}

function tensionProfile(pillar: (typeof PILLARS)[number]): ClaimNarrativeProfile {
  return {
    profileId: `PROFILE-BUSINESS-ANNUAL-BRANCH-CLASH-${pillar.slot.toUpperCase()}`,
    version: BUSINESS_ANNUAL_NARRATIVE_PROFILE_VERSION,
    claimType: BUSINESS_ANNUAL_TENSION_CLAIM_TYPE,
    semanticKeys: [`BUSINESS_ANNUAL_BRANCH_CLASH_${pillar.slot.toUpperCase()}`],
    allowedEpistemicTypes: ['future_tendency'],
    requiredMethodAttribution: true,
    mandatoryQualifier: BUSINESS_ANNUAL_MANDATORY_QUALIFIER,
    prohibitedPhrases: BUSINESS_ANNUAL_PROHIBITED_FUTURE_PHRASES,
    renderingHints: ['axis:tension', 'role:tension', `order:${80 + pillar.order}`],
    templates: [
      {
        templateKey: 'headline',
        language: 'ko',
        text: `${pillar.label}에서 연운과 원국이 맞부딪히는 사업 운영 조정 신호가 확인됩니다`,
      },
      {
        templateKey: 'summary',
        language: 'ko',
        text: `해당 연도의 지지와 원국 ${pillar.label}의 지지가 충 관계로 맞물립니다. 이를 사업 실패·매출 하락·자금조달 실패·파트너 결별 같은 특정 사건의 예고로 확대하지 않고, 결정권·자원 배분·파트너 및 팀 조율·운영 속도 중 일부를 다시 맞춰야 할 압력이 생길 수 있다는 보조 신호로 제한해 해석합니다.`,
      },
    ],
  };
}

export const BUSINESS_ANNUAL_CLAIM_NARRATIVE_PROFILES: readonly ClaimNarrativeProfile[] =
  Object.freeze([
    ...TEN_GODS.map((tenGod, index) => themeProfile(tenGod, index)),
    ...PILLARS.map(tensionProfile),
  ]);
