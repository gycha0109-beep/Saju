import type { TenGod } from '../contracts/calculation.js';
import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import {
  WEALTH_MONTHLY_TENSION_CLAIM_TYPE,
  WEALTH_MONTHLY_THEME_CLAIM_TYPE,
  type WealthMonthlySegmentId,
} from './wealth-monthly-reading-candidate.js';

export const WEALTH_MONTHLY_NARRATIVE_PROFILE_VERSION = '0.1.0-research' as const;

export const WEALTH_MONTHLY_MANDATORY_QUALIFIER =
  '이는 해당 월에 두드러질 수 있는 재물 관리·의사결정 경향을 설명하며, 수입·수익·손실·투자 결과를 예측하거나 금융 조언을 제공하지 않습니다.';

export const WEALTH_MONTHLY_PROHIBITED_FUTURE_PHRASES = Object.freeze([
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

const SEGMENTS: Readonly<Record<WealthMonthlySegmentId, { id: string; label: string; orderBase: number }>> =
  Object.freeze({
    before_jeol: { id: 'BEFORE-JEOL', label: '이번 달 절입 전 구간', orderBase: 30 },
    after_jeol: { id: 'AFTER-JEOL', label: '이번 달 절입 이후 구간', orderBase: 50 },
  });

interface ThemeCopy {
  slug: string;
  semanticSuffix: string;
  axis: 'core' | 'execution' | 'decision' | 'responsibility' | 'collaboration';
  headline: string;
  summary: string;
}

const THEME_COPY: Readonly<Record<TenGod, ThemeCopy>> = Object.freeze({
  비견: {
    slug: 'BI-GYEON',
    semanticSuffix: 'AUTONOMY_SPENDING_BOUNDARIES',
    axis: 'decision',
    headline: '내가 통제할 수 있는 지출·선택 범위를 분명히 하려는 흐름이 두드러질 수 있습니다',
    summary:
      '돈을 어디에 쓰고 무엇을 남겨둘지 스스로 정하고 싶은 경향이 커질 수 있습니다. 자유롭게 쓸 범위와 지켜둘 범위를 미리 나누면 판단을 단순하게 유지하기 쉽습니다.',
  },
  겁재: {
    slug: 'GEOP-JAE',
    semanticSuffix: 'SHARED_RESOURCE_COORDINATION',
    axis: 'collaboration',
    headline: '공동 비용·공유 자원·몫의 경계를 조정하는 일이 중요해질 수 있습니다',
    summary:
      '다른 사람과 함께 쓰는 돈이나 자원, 비용 분담처럼 경계가 필요한 문제가 눈에 띌 수 있습니다. 부담과 분배 기준을 먼저 정하면 비교나 경쟁 때문에 생기는 마찰을 줄이기 쉽습니다.',
  },
  식신: {
    slug: 'SIK-SIN',
    semanticSuffix: 'STEADY_VALUE_CREATION_CADENCE',
    axis: 'execution',
    headline: '반복해서 가치를 만드는 활동의 비용과 리듬을 점검하는 흐름이 두드러질 수 있습니다',
    summary:
      '한 번의 큰 결과보다 꾸준히 만들고 제공하는 활동이 어떤 자원을 쓰는지 확인하는 일이 중요해질 수 있습니다. 지속 가능한 리듬과 비용 구조를 함께 점검하는 편이 좋습니다.',
  },
  상관: {
    slug: 'SANG-GWAN',
    semanticSuffix: 'RESOURCE_USE_EXPERIMENTATION',
    axis: 'decision',
    headline: '기존 소비·자원 사용 방식을 바꾸거나 새 기준을 시험하려는 흐름이 나타날 수 있습니다',
    summary:
      '익숙한 지출 방식이나 자원 배분 기준 대신 다른 방법을 시험하고 싶은 경향이 커질 수 있습니다. 무엇을 확인하려는 변화인지 기준을 세우면 과도한 흔들림을 줄이기 쉽습니다.',
  },
  편재: {
    slug: 'PYEON-JAE',
    semanticSuffix: 'VARIABLE_RESOURCE_OPTION_HANDLING',
    axis: 'decision',
    headline: '여러 선택지와 변동성 있는 자원을 동시에 살피는 흐름이 커질 수 있습니다',
    summary:
      '외부 제안, 새로운 소비 선택지, 가변적인 자원처럼 비교해야 할 대상이 늘 수 있습니다. 가능성 자체를 경제적 결과로 간주하지 말고 감당 가능한 범위와 우선순위를 먼저 정하는 편이 중요합니다.',
  },
  정재: {
    slug: 'JEONG-JAE',
    semanticSuffix: 'STRUCTURED_BUDGETING_ALLOCATION',
    axis: 'responsibility',
    headline: '예산과 지출 목적을 구조적으로 나누는 흐름이 두드러질 수 있습니다',
    summary:
      '생활비, 계획된 지출, 여유 자원처럼 돈의 역할을 구분하고 관리하는 경향이 강해질 수 있습니다. 각 범주의 목적과 한도를 분명히 두는 방식이 지속하기 쉽습니다.',
  },
  편관: {
    slug: 'PYEON-GWAN',
    semanticSuffix: 'OBLIGATION_PRESSURE_RESPONSE',
    axis: 'responsibility',
    headline: '금전적 의무와 기한 압박을 어떤 순서로 처리할지가 중요해질 수 있습니다',
    summary:
      '정해진 납부, 책임 비용, 예정된 지출처럼 피하기 어려운 의무가 크게 느껴질 수 있습니다. 기한과 필수도를 기준으로 순서를 정하면 부담을 더 구조적으로 다루기 쉽습니다.',
  },
  정관: {
    slug: 'JEONG-GWAN',
    semanticSuffix: 'FORMAL_FINANCIAL_RULES',
    axis: 'responsibility',
    headline: '돈을 다루는 공식 기준과 약속을 분명히 하는 흐름이 두드러질 수 있습니다',
    summary:
      '계약, 정기 결제, 공동 비용 규칙처럼 이미 정해진 기준을 확인하고 지키는 일이 중요하게 느껴질 수 있습니다. 책임 범위와 확인 절차를 명확히 두면 불확실성을 줄이기 쉽습니다.',
  },
  편인: {
    slug: 'PYEON-IN',
    semanticSuffix: 'EXPLORATORY_RESOURCE_LEARNING',
    axis: 'decision',
    headline: '새 도구·정보·비정형적인 관리 방법을 탐색하는 흐름이 나타날 수 있습니다',
    summary:
      '기존 방식과 다른 관리 도구나 정보를 찾아보고 싶은 경향이 커질 수 있습니다. 흥미만으로 적용하기보다 실제 생활의 비용·시간·관리 부담을 줄이는지 확인하며 시험하는 편이 안정적입니다.',
  },
  정인: {
    slug: 'JEONG-IN',
    semanticSuffix: 'FINANCIAL_FOUNDATION_REVIEW',
    axis: 'core',
    headline: '기초적인 돈 관리 기준과 필요한 정보를 다시 정리하는 흐름이 두드러질 수 있습니다',
    summary:
      '새 선택을 늘리기보다 현재의 고정비, 지출 기준, 필요한 자료를 차분히 정리하는 경향이 강해질 수 있습니다. 충분히 이해한 뒤 움직이는 방식이 판단의 안정성을 높일 수 있습니다.',
  },
});

const TEN_GODS = Object.keys(THEME_COPY) as TenGod[];
const PILLARS = [
  { slot: 'year', label: '연주', order: 0 },
  { slot: 'month', label: '월주', order: 1 },
  { slot: 'day', label: '일주', order: 2 },
  { slot: 'hour', label: '시주', order: 3 },
] as const;

function themeProfile(
  segmentId: WealthMonthlySegmentId,
  tenGod: TenGod,
  index: number,
): ClaimNarrativeProfile {
  const segment = SEGMENTS[segmentId];
  const copy = THEME_COPY[tenGod];
  return {
    profileId: `PROFILE-WEALTH-MONTHLY-${segment.id}-${copy.slug}`,
    version: WEALTH_MONTHLY_NARRATIVE_PROFILE_VERSION,
    claimType: WEALTH_MONTHLY_THEME_CLAIM_TYPE,
    semanticKeys: [`WEALTH_MONTHLY_${segmentId.toUpperCase()}_${copy.semanticSuffix}`],
    allowedEpistemicTypes: ['future_tendency'],
    requiredMethodAttribution: true,
    mandatoryQualifier: WEALTH_MONTHLY_MANDATORY_QUALIFIER,
    prohibitedPhrases: WEALTH_MONTHLY_PROHIBITED_FUTURE_PHRASES,
    renderingHints: [`axis:${copy.axis}`, 'role:primary', `order:${segment.orderBase + index}`],
    templates: [
      {
        templateKey: 'headline',
        language: 'ko',
        text: `${segment.label}: ${copy.headline}`,
      },
      {
        templateKey: 'summary',
        language: 'ko',
        text: `${segment.label}에는 ${copy.summary}`,
      },
    ],
  };
}

function tensionProfile(
  segmentId: WealthMonthlySegmentId,
  pillar: (typeof PILLARS)[number],
): ClaimNarrativeProfile {
  const segment = SEGMENTS[segmentId];
  return {
    profileId: `PROFILE-WEALTH-MONTHLY-${segment.id}-BRANCH-CLASH-${pillar.slot.toUpperCase()}`,
    version: WEALTH_MONTHLY_NARRATIVE_PROFILE_VERSION,
    claimType: WEALTH_MONTHLY_TENSION_CLAIM_TYPE,
    semanticKeys: [
      `WEALTH_MONTHLY_${segmentId.toUpperCase()}_BRANCH_CLASH_${pillar.slot.toUpperCase()}`,
    ],
    allowedEpistemicTypes: ['future_tendency'],
    requiredMethodAttribution: true,
    mandatoryQualifier: WEALTH_MONTHLY_MANDATORY_QUALIFIER,
    prohibitedPhrases: WEALTH_MONTHLY_PROHIBITED_FUTURE_PHRASES,
    renderingHints: [
      'axis:tension',
      'role:tension',
      `order:${80 + (segmentId === 'after_jeol' ? 10 : 0) + pillar.order}`,
    ],
    templates: [
      {
        templateKey: 'headline',
        language: 'ko',
        text: `${segment.label}: ${pillar.label}와 월운이 맞부딪히는 재물 계획 조정 신호가 확인됩니다`,
      },
      {
        templateKey: 'summary',
        language: 'ko',
        text: `${segment.label}의 월지와 원국 ${pillar.label}의 지지가 충 관계로 맞물립니다. 이를 손실·부채·수입 변화 같은 특정 금전 사건의 예고로 확대하지 않고, 예산·금전적 약속·공유 자원·지출 우선순위 중 일부를 다시 조정해야 할 압력이 생길 수 있다는 보조 신호로 제한해 해석합니다.`,
      },
    ],
  };
}

export const WEALTH_MONTHLY_CLAIM_NARRATIVE_PROFILES: readonly ClaimNarrativeProfile[] =
  Object.freeze([
    ...(['before_jeol', 'after_jeol'] as const).flatMap((segmentId) =>
      TEN_GODS.map((tenGod, index) => themeProfile(segmentId, tenGod, index)),
    ),
    ...(['before_jeol', 'after_jeol'] as const).flatMap((segmentId) =>
      PILLARS.map((pillar) => tensionProfile(segmentId, pillar)),
    ),
  ]);
