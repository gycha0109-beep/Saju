import { RELATIONSHIP_NATAL_READING_METHODOLOGY } from '../research/relationship-natal-reading-candidate.js';
import {
  OFFICIAL_READING_CONCISE_NO_QUALIFIERS,
  type ApprovedOfficialReadingConciseDefinitionV1,
} from './official-reading-concise-presentation-definition.js';

const PROHIBITED = Object.freeze([
  'breakupOutcomeAuthorized',
  'compatibilityAuthorized',
  'futureTimingAuthorized',
  'infidelityInferenceAuthorized',
  'marriageOutcomeAuthorized',
  'numericScoringAuthorized',
  'partnerAttributePredictionAuthorized',
  'specificPartnerAuthorized',
]);

const SPECS = Object.freeze([
  {
    id: 'PEER-EQUAL-FOOTING',
    headline: '가까워져도 서로의 선택권이 남아 있는 관계가 편한 편입니다',
    summary: '친해질수록 모든 것을 함께해야 하는 관계보다 각자 결정할 수 있는 영역이 있으면서 필요할 때 나란히 움직이는 관계를 편하게 느낄 수 있습니다. 지나치게 간섭받는다고 느끼면 가까운 사이에서도 거리를 두고 싶어질 수 있습니다.',
    concise: '가까워져도 서로의 선택권이 남고 필요할 때 함께 움직일 수 있는 관계가 편한 편입니다.',
  },
  {
    id: 'RESOURCE-UNDERSTAND-BEFORE-CLOSE',
    headline: '상대를 충분히 이해했다는 느낌이 있어야 마음을 열기 쉬운 편입니다',
    summary: '처음부터 빠르게 가까워지기보다 대화를 통해 상대의 생각과 맥락을 이해하고 신뢰를 확인하는 시간이 중요할 수 있습니다. 마음이 복잡할 때도 바로 반응하기보다 먼저 생각을 정리할 시간이 있으면 관계를 더 안정적으로 다루기 쉽습니다.',
    concise: '대화로 상대의 생각과 맥락을 이해하고 신뢰를 확인할 시간이 있어야 마음을 열기 쉬운 편입니다.',
  },
  {
    id: 'OUTPUT-EXPRESS-TO-CONNECT',
    headline: '생각과 감정을 표현할 통로가 있을 때 관계가 더 자연스럽습니다',
    summary: '마음속으로만 이해하는 것보다 말이나 행동으로 표현하고 반응을 확인할 수 있을 때 관계가 살아 있다고 느끼기 쉽습니다. 하고 싶은 말을 계속 삼켜야 하는 관계에서는 답답함이 쌓일 수 있습니다.',
    concise: '생각과 감정을 말이나 행동으로 표현하고 반응을 확인할 통로가 있을 때 관계가 자연스럽습니다.',
  },
  {
    id: 'WEALTH-PRACTICAL-RECIPROCITY',
    headline: '관계에서도 서로 실제로 무엇을 해주는지가 중요한 편입니다',
    summary: '좋은 마음만큼 시간과 노력, 약속을 지키는 행동처럼 현실에서 확인되는 부분을 중요하게 볼 수 있습니다. 한쪽만 계속 챙기거나 부담을 떠안는 흐름이 반복되면 관계의 균형이 깨졌다고 느끼기 쉽습니다.',
    concise: '관계에서도 시간·노력·약속처럼 실제 행동으로 확인되는 상호성을 중요하게 볼 수 있습니다.',
  },
  {
    id: 'OFFICER-RELIABLE-BOUNDARY',
    headline: '가까운 사이일수록 약속과 책임이 분명한 관계를 중요하게 보는 편입니다',
    summary: '친하다는 이유로 기준이 계속 바뀌는 관계보다 서로 지킬 것은 지키고 맡은 부분은 책임지는 관계에서 신뢰를 느끼기 쉽습니다. 말과 행동이 자주 달라지는 상대와는 피로가 커질 수 있습니다.',
    concise: '가까운 사이일수록 약속과 책임 기준이 분명할 때 신뢰를 느끼기 쉬운 편입니다.',
  },
  {
    id: 'PEER-OFFICER-AUTONOMY-WITH-BOUNDARY',
    headline: '자유롭게 지내되 서로 넘지 않을 선은 분명한 관계가 잘 맞을 수 있습니다',
    summary: '내 방식과 상대의 방식을 모두 인정하면서도 약속이나 책임의 경계가 분명하면 관계를 편하게 유지하기 쉽습니다. 반대로 간섭은 많은데 책임 기준은 애매한 관계에서는 특히 답답함을 느낄 수 있습니다.',
    concise: '서로의 자율성을 인정하면서 넘지 않을 약속과 책임의 경계가 분명한 관계가 잘 맞을 수 있습니다.',
  },
  {
    id: 'RESOURCE-OUTPUT-PROCESS-THEN-SPEAK',
    headline: '생각을 정리한 뒤 솔직하게 풀어낼 때 소통이 가장 잘 되는 편입니다',
    summary: '바로 말해야 한다는 압박을 받으면 표현이 꼬일 수 있지만 충분히 생각만 하고 말하지 않으면 상대는 알기 어렵습니다. 잠깐 정리할 시간을 가진 뒤 실제 대화로 이어가는 방식이 관계 갈등을 줄이는 데 더 잘 맞을 수 있습니다.',
    concise: '생각을 정리할 시간을 가진 뒤 실제 대화로 이어갈 때 갈등을 줄이기 쉬운 편입니다.',
  },
  {
    id: 'OUTPUT-WEALTH-WORDS-TO-ACTION',
    headline: '말로 표현한 마음이 실제 행동까지 이어질 때 신뢰가 커지기 쉽습니다',
    summary: '좋다고 말하는 것만큼 시간을 내고 도와주고 약속을 실행하는 것처럼 눈에 보이는 행동을 중요하게 볼 수 있습니다. 표현과 실제 행동이 자주 어긋나면 말 자체를 믿기 어려워질 수 있습니다.',
    concise: '말로 표현한 마음이 시간·도움·약속 실행 같은 행동으로 이어질 때 신뢰가 커지기 쉽습니다.',
  },
  {
    id: 'OFFICER-RESOURCE-CARE-THROUGH-PREPARATION',
    headline: '관심을 보여주는 방식이 챙기고 준비하고 책임지는 쪽으로 나타날 수 있습니다',
    summary: '감정을 크게 드러내는 것보다 필요한 정보를 알아두거나 약속을 기억하고 실제 문제를 챙겨주는 방식으로 마음을 표현하기 쉬울 수 있습니다. 다만 상대가 원하는 표현 방식과 다르면 내가 충분히 표현했다고 생각해도 전달이 약할 수 있습니다.',
    concise: '관심을 정보·준비·문제 해결처럼 챙기는 행동으로 표현하기 쉬울 수 있습니다.',
  },
  {
    id: 'PEER-WEALTH-MY-CHOICE-VS-SHARED-RESOURCE',
    headline: '내 선택과 함께 써야 하는 시간·돈·에너지의 균형에서 갈등이 생길 수 있습니다',
    summary: '내가 원하는 방식이 분명할수록 공동 일정이나 비용, 서로에게 쓰는 노력 때문에 선택을 조정해야 할 때 답답함을 느끼기 쉽습니다. 무엇을 각자 결정하고 무엇을 함께 정할지 미리 나누면 불필요한 힘겨루기를 줄이는 데 도움이 됩니다.',
    concise: '각자 결정할 영역과 함께 정할 시간·돈·에너지의 범위를 나누면 힘겨루기를 줄이기 쉽습니다.',
  },
  {
    id: 'WEALTH-RESOURCE-SOLVE-VS-UNDERSTAND',
    headline: '문제를 빨리 해결하고 싶은 마음과 충분히 이해하고 싶은 마음이 충돌할 수 있습니다',
    summary: '갈등이 생기면 현실적인 해결책을 빨리 찾고 싶으면서도 왜 이런 일이 생겼는지 충분히 납득하고 싶을 수 있습니다. 해결책만 서두르거나 반대로 생각만 길어지면 답답함이 커질 수 있어 이해할 시간과 결정할 시간을 나눠두는 편이 좋습니다.',
    concise: '갈등에서는 이해할 시간과 해결을 결정할 시간을 나누는 편이 답답함을 줄이는 데 도움이 됩니다.',
  },
]);

export const RELATIONSHIP_NATAL_APPROVED_CONCISE_DEFINITIONS: readonly ApprovedOfficialReadingConciseDefinitionV1[] =
  Object.freeze(
    SPECS.map((spec) =>
      Object.freeze({
        owner: 'relationship:natal:general' as const,
        profileId: `relationship-natal-${spec.id.toLowerCase()}-concise-v1`,
        profileVersion: '1' as const,
        claimType: `RELATIONSHIP_NATAL_CONCLUSION_${spec.id.replaceAll('-', '_')}`,
        methodologyRef: {
          id: RELATIONSHIP_NATAL_READING_METHODOLOGY.methodologyId,
          version: RELATIONSHIP_NATAL_READING_METHODOLOGY.version,
        },
        standardText: Object.freeze({
          headline: spec.headline,
          summary: spec.summary,
        }),
        semanticQualifiers: OFFICIAL_READING_CONCISE_NO_QUALIFIERS,
        prohibitedExtensions: PROHIBITED,
        conciseText: spec.concise,
      }),
    ),
  );
