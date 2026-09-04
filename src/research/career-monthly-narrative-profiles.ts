import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import type { TenGod } from '../contracts/calculation.js';
import {
  CAREER_MONTHLY_TENSION_CLAIM_TYPE,
  CAREER_MONTHLY_THEME_CLAIM_TYPE,
  type CareerMonthlySegmentId,
} from './career-monthly-reading-candidate.js';

export const CAREER_MONTHLY_NARRATIVE_PROFILE_VERSION = '0.1.0-research' as const;

export const CAREER_MONTHLY_MANDATORY_QUALIFIER =
  '이는 해당 월에 두드러질 수 있는 경향을 설명하며, 특정 사건이나 결과를 확정하지 않습니다.';

export const CAREER_MONTHLY_PROHIBITED_FUTURE_PHRASES = Object.freeze([
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

const SEGMENTS: Readonly<Record<CareerMonthlySegmentId, { id: string; label: string; orderBase: number }>> =
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
    semanticSuffix: 'SELF_DIRECTED_WORK_DIRECTION',
    axis: 'decision',
    headline: '업무에서 스스로 결정하고 책임질 범위를 분명히 하려는 흐름이 두드러질 수 있습니다',
    summary:
      '맡은 일의 방향을 직접 정하거나 내 판단으로 움직이고 싶은 경향이 커질 수 있습니다. 혼자 다 떠안기보다 결정권과 책임 범위를 함께 명확히 두는 편이 안정적입니다.',
  },
  겁재: {
    slug: 'GEOP-JAE',
    semanticSuffix: 'PEER_COORDINATION_PRESSURE',
    axis: 'collaboration',
    headline: '동료·경쟁·협업 안에서 역할과 책임 범위를 조정하는 일이 중요해질 수 있습니다',
    summary:
      '함께 일하는 사람과 몫을 나누거나 경쟁과 협업의 경계를 정하는 장면이 눈에 띌 수 있습니다. 누가 무엇을 맡는지 구체화하면 업무 마찰을 줄이기 쉽습니다.',
  },
  식신: {
    slug: 'SIK-SIN',
    semanticSuffix: 'STEADY_PRODUCTION_CADENCE',
    axis: 'execution',
    headline: '반복 가능한 산출 방식과 업무 루틴을 안정시키는 흐름이 두드러질 수 있습니다',
    summary:
      '단발성 결과보다 결과물을 꾸준히 쌓는 방식이 중요해질 수 있습니다. 작업 단위를 작게 나누고 지속 가능한 생산 리듬을 만드는 쪽이 유리합니다.',
  },
  상관: {
    slug: 'SANG-GWAN',
    semanticSuffix: 'EXPRESSION_PROCESS_CHANGE',
    axis: 'execution',
    headline: '업무 방식·제안·표현을 조정하려는 흐름이 강해질 수 있습니다',
    summary:
      '기존 절차를 그대로 따르기보다 다른 방식으로 제안하거나 표현하고 싶은 경향이 커질 수 있습니다. 변화의 필요성을 근거와 실행안으로 연결하는 편이 좋습니다.',
  },
  편재: {
    slug: 'PYEON-JAE',
    semanticSuffix: 'EXTERNAL_PROJECT_RESOURCE_HANDLING',
    axis: 'execution',
    headline: '외부 프로젝트·기회·자원을 다루는 폭이 넓어질 수 있습니다',
    summary:
      '외부 협업, 새 프로젝트, 여러 선택지처럼 바깥에서 들어오는 자원을 동시에 살필 일이 늘 수 있습니다. 가능성 자체를 결과로 간주하지 말고 감당 가능한 범위와 우선순위를 정하는 편이 중요합니다.',
  },
  정재: {
    slug: 'JEONG-JAE',
    semanticSuffix: 'STRUCTURED_WORK_RESOURCE_MANAGEMENT',
    axis: 'responsibility',
    headline: '일정·자원·업무량을 구조적으로 관리하는 흐름이 중요해질 수 있습니다',
    summary:
      '업무량과 시간, 책임 자원을 정해진 기준 안에서 관리하는 경향이 두드러질 수 있습니다. 일정과 처리 기준을 명확히 세워 누락을 줄이는 방식이 잘 맞습니다.',
  },
  편관: {
    slug: 'PYEON-GWAN',
    semanticSuffix: 'PRESSURE_ACCOUNTABILITY_RESPONSE',
    axis: 'responsibility',
    headline: '기한·책임·압박에 대응하는 방식이 중요해질 수 있습니다',
    summary:
      '빠른 대응이나 높은 책임을 요구하는 업무 압력이 체감될 수 있습니다. 모든 요구를 동시에 처리하기보다 우선순위와 대응 순서를 명확히 두는 편이 좋습니다.',
  },
  정관: {
    slug: 'JEONG-GWAN',
    semanticSuffix: 'FORMAL_ROLE_RESPONSIBILITY',
    axis: 'responsibility',
    headline: '공식 역할과 업무 기준을 명확히 하는 흐름이 두드러질 수 있습니다',
    summary:
      '직책의 명칭보다 맡은 역할의 기준과 책임 범위를 분명히 하는 일이 중요해질 수 있습니다. 정해진 절차와 약속을 일관되게 지키는 방식이 업무 신뢰에 도움이 됩니다.',
  },
  편인: {
    slug: 'PYEON-IN',
    semanticSuffix: 'ALTERNATIVE_LEARNING_PROBLEM_SOLVING',
    axis: 'decision',
    headline: '새 도구·다른 접근·비정형 학습을 시험하는 흐름이 나타날 수 있습니다',
    summary:
      '익숙한 해결법만 반복하기보다 새로운 도구나 다른 관점을 시험하고 싶은 경향이 커질 수 있습니다. 실제 업무 문제 해결에 유효한지 검증하며 적용하는 편이 안정적입니다.',
  },
  정인: {
    slug: 'JEONG-IN',
    semanticSuffix: 'FORMAL_SUPPORT_FOUNDATION',
    axis: 'core',
    headline: '업무 기반 지식과 검증된 기준을 다지는 흐름이 두드러질 수 있습니다',
    summary:
      '기초 지식, 문서화된 기준, 주변의 지원을 활용해 업무 기반을 탄탄하게 만드는 경향이 강해질 수 있습니다. 충분히 이해하고 검증한 뒤 적용하는 방식이 판단의 안정성을 높입니다.',
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
  segmentId: CareerMonthlySegmentId,
  tenGod: TenGod,
  index: number,
): ClaimNarrativeProfile {
  const segment = SEGMENTS[segmentId];
  const copy = THEME_COPY[tenGod];
  return {
    profileId: `PROFILE-CAREER-MONTHLY-${segment.id}-${copy.slug}`,
    version: CAREER_MONTHLY_NARRATIVE_PROFILE_VERSION,
    claimType: CAREER_MONTHLY_THEME_CLAIM_TYPE.claimType,
    semanticKeys: [`CAREER_MONTHLY_${segmentId.toUpperCase()}_${copy.semanticSuffix}`],
    allowedEpistemicTypes: ['future_tendency'],
    requiredMethodAttribution: true,
    mandatoryQualifier: CAREER_MONTHLY_MANDATORY_QUALIFIER,
    prohibitedPhrases: CAREER_MONTHLY_PROHIBITED_FUTURE_PHRASES,
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
  segmentId: CareerMonthlySegmentId,
  pillar: (typeof PILLARS)[number],
): ClaimNarrativeProfile {
  const segment = SEGMENTS[segmentId];
  return {
    profileId: `PROFILE-CAREER-MONTHLY-${segment.id}-BRANCH-CLASH-${pillar.slot.toUpperCase()}`,
    version: CAREER_MONTHLY_NARRATIVE_PROFILE_VERSION,
    claimType: CAREER_MONTHLY_TENSION_CLAIM_TYPE.claimType,
    semanticKeys: [
      `CAREER_MONTHLY_${segmentId.toUpperCase()}_BRANCH_CLASH_${pillar.slot.toUpperCase()}`,
    ],
    allowedEpistemicTypes: ['future_tendency'],
    requiredMethodAttribution: true,
    mandatoryQualifier: CAREER_MONTHLY_MANDATORY_QUALIFIER,
    prohibitedPhrases: CAREER_MONTHLY_PROHIBITED_FUTURE_PHRASES,
    renderingHints: ['axis:tension', 'role:tension', `order:${80 + (segmentId === 'after_jeol' ? 10 : 0) + pillar.order}`],
    templates: [
      {
        templateKey: 'headline',
        language: 'ko',
        text: `${segment.label}: ${pillar.label}와 월운이 맞부딪히는 업무 조정 신호가 확인됩니다`,
      },
      {
        templateKey: 'summary',
        language: 'ko',
        text: `${segment.label}의 월지와 원국 ${pillar.label}의 지지가 충 관계로 맞물립니다. 이를 특정 직업 사건의 예고로 확대하지 않고, 업무 역할·일정·협업 구조·작업 방식 중 일부를 조정해야 할 압력이 생길 수 있다는 보조 신호로 제한해 해석합니다.`,
      },
    ],
  };
}

export const CAREER_MONTHLY_CLAIM_NARRATIVE_PROFILES: readonly ClaimNarrativeProfile[] =
  Object.freeze([
    ...(['before_jeol', 'after_jeol'] as const).flatMap((segmentId) =>
      TEN_GODS.map((tenGod, index) => themeProfile(segmentId, tenGod, index)),
    ),
    ...(['before_jeol', 'after_jeol'] as const).flatMap((segmentId) =>
      PILLARS.map((pillar) => tensionProfile(segmentId, pillar)),
    ),
  ]);
