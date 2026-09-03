import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import {
  GENERAL_MONTHLY_TENSION_CLAIM_TYPE,
  GENERAL_MONTHLY_THEME_CLAIM_TYPE,
  type GeneralMonthlySegmentId,
} from './general-monthly-reading-candidate.js';

export const GENERAL_MONTHLY_NARRATIVE_PROFILE_VERSION = '0.1.0-research' as const;

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

interface ThemeCopy {
  id: string;
  semanticSuffix: string;
  headline: string;
  summary: string;
}

const THEME_COPY: readonly ThemeCopy[] = Object.freeze([
  {
    id: 'BI-GYEON',
    semanticSuffix: 'PEER_SELF_DIRECTION',
    headline: '내 기준으로 직접 움직이려는 힘이 커질 수 있습니다',
    summary:
      '스스로 판단하고 방향을 정하려는 흐름이 두드러질 수 있습니다. 다른 사람의 속도보다 내가 책임질 범위와 결정권을 분명히 하면 이 흐름을 안정적으로 쓰기 쉽습니다.',
  },
  {
    id: 'GEOP-JAE',
    semanticSuffix: 'PEER_COMPETITION_COORDINATION',
    headline: '사람과 몫을 조정하는 일이 중요해질 수 있습니다',
    summary:
      '경쟁, 협업, 역할 분담처럼 다른 사람과 자원이나 책임을 나누는 상황이 눈에 띌 수 있습니다. 누가 무엇을 맡는지 경계를 분명히 하면 불필요한 소모를 줄이는 데 도움이 됩니다.',
  },
  {
    id: 'SIK-SIN',
    semanticSuffix: 'OUTPUT_STEADY_PRODUCTION',
    headline: '작더라도 꾸준히 결과를 만드는 흐름을 쓰기 좋습니다',
    summary:
      '한 번의 큰 변화보다 결과물을 차근차근 만들고 생활 리듬을 안정시키는 방향이 잘 맞을 수 있습니다. 반복 가능한 작업이나 루틴을 두는 편이 이 흐름을 활용하기 쉽습니다.',
  },
  {
    id: 'SANG-GWAN',
    semanticSuffix: 'OUTPUT_EXPRESSION_CHANGE',
    headline: '표현 방식과 기존 방식을 바꾸려는 힘이 커질 수 있습니다',
    summary:
      '생각을 밖으로 드러내거나 새로운 방식으로 바꾸고 싶은 욕구가 커질 수 있습니다. 변화 시도에는 힘이 실릴 수 있지만 규칙이나 상대의 기대와 부딪히지 않도록 표현 강도를 조절하는 편이 좋습니다.',
  },
  {
    id: 'PYEON-JAE',
    semanticSuffix: 'WEALTH_EXTERNAL_RESOURCES',
    headline: '바깥의 기회와 여러 자원을 연결하는 흐름이 생길 수 있습니다',
    summary:
      '사람, 정보, 일정, 프로젝트처럼 외부에서 들어오는 여러 선택지를 빠르게 살피는 흐름이 두드러질 수 있습니다. 선택지가 많아질수록 실제로 감당할 범위를 정하는 편이 안정적입니다.',
  },
  {
    id: 'JEONG-JAE',
    semanticSuffix: 'WEALTH_STRUCTURED_RESOURCES',
    headline: '현실적인 관리와 정리가 중요해질 수 있습니다',
    summary:
      '돈뿐 아니라 시간, 일정, 자원처럼 현실적으로 관리해야 할 항목을 정돈하는 흐름이 강해질 수 있습니다. 무리하게 넓히기보다 기준을 정하고 반복 가능한 관리 방식을 만드는 편이 잘 맞습니다.',
  },
  {
    id: 'PYEON-GWAN',
    semanticSuffix: 'OFFICER_PRESSURE_RESPONSE',
    headline: '압박이 생길수록 대응 순서를 정하는 일이 중요할 수 있습니다',
    summary:
      '기한, 경쟁, 책임처럼 빠른 대응을 요구하는 압력이 체감될 수 있습니다. 모든 요구에 즉시 반응하기보다 무엇을 먼저 처리할지 기준과 순서를 두는 편이 흐름을 안정시키는 데 도움이 됩니다.',
  },
  {
    id: 'JEONG-GWAN',
    semanticSuffix: 'OFFICER_ROLE_RESPONSIBILITY',
    headline: '역할과 책임 범위를 분명히 하는 흐름이 두드러질 수 있습니다',
    summary:
      '정해진 기준, 공식적인 역할, 책임 범위가 중요하게 느껴질 수 있습니다. 해야 할 일과 지켜야 할 기준을 명확히 하고 신뢰를 쌓는 방식이 이 흐름과 잘 맞습니다.',
  },
  {
    id: 'PYEON-IN',
    semanticSuffix: 'RESOURCE_ALTERNATIVE_LEARNING',
    headline: '익숙하지 않은 관점과 새로운 방식을 탐색할 수 있습니다',
    summary:
      '익숙한 방식만 따르기보다 다른 관점, 독학, 실험적인 접근에 관심이 커질 수 있습니다. 정보를 넓게 받아들이되 실제로 쓸 것과 버릴 것을 구분하면 산만함을 줄일 수 있습니다.',
  },
  {
    id: 'JEONG-IN',
    semanticSuffix: 'RESOURCE_SUPPORT_LEARNING',
    headline: '배우고 정리하며 기반을 다지는 흐름이 강해질 수 있습니다',
    summary:
      '충분히 이해하고 근거를 정리한 뒤 움직이는 방식이 잘 맞을 수 있습니다. 학습, 자료 정리, 검증된 기준을 확보하는 과정에 시간을 쓰면 판단의 안정성을 높이는 데 도움이 됩니다.',
  },
]);

const SEGMENT_COPY: Readonly<
  Record<GeneralMonthlySegmentId, { id: string; semanticPrefix: string; label: string; axis: 'core' | 'execution'; orderBase: number; qualifier: string }>
> = Object.freeze({
  before_jeol: {
    id: 'BEFORE-JEOL',
    semanticPrefix: 'MONTHLY_BEFORE_JEOL',
    label: '이번 달 절입 전 구간',
    axis: 'core',
    orderBase: 10,
    qualifier:
      '이는 해당 월의 절입 전 구간에서 두드러질 수 있는 경향을 설명하며, 특정 사건이나 결과를 확정하지 않습니다.',
  },
  after_jeol: {
    id: 'AFTER-JEOL',
    semanticPrefix: 'MONTHLY_AFTER_JEOL',
    label: '이번 달 절입 이후 구간',
    axis: 'execution',
    orderBase: 30,
    qualifier:
      '이는 해당 월의 절입 이후 구간에서 두드러질 수 있는 경향을 설명하며, 특정 사건이나 결과를 확정하지 않습니다.',
  },
});

function themeProfile(
  segmentId: GeneralMonthlySegmentId,
  copy: ThemeCopy,
  index: number,
): ClaimNarrativeProfile {
  const segment = SEGMENT_COPY[segmentId];
  return {
    profileId: `PROFILE-GENERAL-MONTHLY-${segment.id}-${copy.id}`,
    version: GENERAL_MONTHLY_NARRATIVE_PROFILE_VERSION,
    claimType: GENERAL_MONTHLY_THEME_CLAIM_TYPE.claimType,
    semanticKeys: [`${segment.semanticPrefix}_${copy.semanticSuffix}`],
    allowedEpistemicTypes: ['future_tendency'],
    requiredMethodAttribution: true,
    mandatoryQualifier: segment.qualifier,
    prohibitedPhrases: PROHIBITED_FUTURE_PHRASES,
    renderingHints: [`axis:${segment.axis}`, `order:${segment.orderBase + index}`],
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

const PILLAR_COPY = Object.freeze([
  ['year', '연주'],
  ['month', '월주'],
  ['day', '일주'],
  ['hour', '시주'],
] as const);

function tensionProfile(
  segmentId: GeneralMonthlySegmentId,
  slot: (typeof PILLAR_COPY)[number][0],
  pillarLabel: string,
  index: number,
): ClaimNarrativeProfile {
  const segment = SEGMENT_COPY[segmentId];
  return {
    profileId: `PROFILE-GENERAL-MONTHLY-${segment.id}-BRANCH-CLASH-${slot.toUpperCase()}`,
    version: GENERAL_MONTHLY_NARRATIVE_PROFILE_VERSION,
    claimType: GENERAL_MONTHLY_TENSION_CLAIM_TYPE.claimType,
    semanticKeys: [`${segment.semanticPrefix}_BRANCH_CLASH_${slot.toUpperCase()}`],
    allowedEpistemicTypes: ['future_tendency'],
    requiredMethodAttribution: true,
    mandatoryQualifier: segment.qualifier,
    prohibitedPhrases: PROHIBITED_FUTURE_PHRASES,
    renderingHints: ['axis:tension', `order:${70 + (segmentId === 'before_jeol' ? 0 : 10) + index}`],
    templates: [
      {
        templateKey: 'headline',
        language: 'ko',
        text: `${segment.label}의 월운과 원국 ${pillarLabel}가 맞부딪히는 보조 신호가 있습니다`,
      },
      {
        templateKey: 'summary',
        language: 'ko',
        text: `${segment.label}의 지지와 원국 ${pillarLabel}의 지지가 충 관계로 맞물립니다. 이를 특정 사건의 예고로 보지 않고, 기존 흐름과 해당 구간의 요구 사이에서 조정이 필요할 수 있다는 보조 신호로 제한해 해석합니다.`,
      },
    ],
  };
}

export const GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES: readonly ClaimNarrativeProfile[] =
  Object.freeze([
    ...(['before_jeol', 'after_jeol'] as const).flatMap((segmentId) =>
      THEME_COPY.map((copy, index) => themeProfile(segmentId, copy, index)),
    ),
    ...(['before_jeol', 'after_jeol'] as const).flatMap((segmentId) =>
      PILLAR_COPY.map(([slot, label], index) => tensionProfile(segmentId, slot, label, index)),
    ),
  ]);
