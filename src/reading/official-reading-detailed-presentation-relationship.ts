import {
  GENERAL_NATAL_CONCLUSION_SOURCE,
} from '../research/general-natal-conclusion-synthesis-candidate.js';
import {
  GENERAL_NATAL_USEFUL_READING_SOURCE,
} from '../research/general-natal-useful-reading-candidate.js';
import {
  RELATIONSHIP_NATAL_APPROVED_CONCISE_DEFINITIONS,
} from './official-reading-concise-presentation-relationship.js';
import {
  buildOfficialReadingDomainDetailedProfilesV1,
  type OfficialReadingDomainDetailedApprovalSpecV1,
} from './official-reading-detailed-presentation-domain.js';

const AUTHORITY_ID = 'SA-6S-RELATIONSHIP-NATAL-GENERAL-DETAILED-MATERIAL';
const AUTHORITY_VERSION = '1';

const BOUNDARY =
  '이 관계 해석은 일반적인 친밀감·표현·상호성·경계·갈등 처리 방식을 설명하는 범위에 한정됩니다. 특정 상대·배우자 특성·궁합·결혼·이별·외도·관계 결과·미래 시점을 예측하지 않으며 점수나 적합도 판정으로 바꾸지 않습니다.';

function familySupport(
  ...families: readonly ('peer' | 'resource' | 'output' | 'wealth' | 'officer')[]
): readonly string[] {
  return Object.freeze(
    families.map((family) => `TEN_GOD_FAMILY_${family.toUpperCase()}_PRESENT`),
  );
}

const SPECS = Object.freeze([
  {
    id: 'PEER-EQUAL-FOOTING',
    clarification:
      '이 항목은 가까운 관계에서도 각자의 선택권과 독립된 판단 영역이 남아 있을 때 편안함을 느끼기 쉬운 주제를 설명합니다. 독립성이 필요하다는 사실을 거리감이나 애정 부족으로 단정하지 않습니다.',
    supportingClaimTypes: familySupport('peer'),
  },
  {
    id: 'RESOURCE-UNDERSTAND-BEFORE-CLOSE',
    clarification:
      '이 항목은 상대의 맥락을 이해하고 신뢰할 근거를 충분히 확보한 뒤 친밀감을 높이는 방식이 자연스러울 수 있다는 뜻입니다. 관계의 속도가 느리다는 이유로 회피 성향이나 관계 실패를 판정하지 않습니다.',
    supportingClaimTypes: familySupport('resource'),
  },
  {
    id: 'OUTPUT-EXPRESS-TO-CONNECT',
    clarification:
      '이 항목은 생각과 감정을 말·행동·반응 교환으로 밖에 표현할 수 있을 때 관계의 연결감을 확인하기 쉬운 주제를 설명합니다. 표현이 많고 적음을 애정의 크기와 동일시하지 않습니다.',
    supportingClaimTypes: familySupport('output'),
  },
  {
    id: 'WEALTH-PRACTICAL-RECIPROCITY',
    clarification:
      '이 항목은 마음의 표현뿐 아니라 시간·노력·약속 이행처럼 현실에서 확인되는 상호성을 중요하게 느끼기 쉬운 구조를 설명합니다. 상대가 반드시 같은 방식으로 표현해야 한다는 요구로 확장하지 않습니다.',
    supportingClaimTypes: familySupport('wealth'),
  },
  {
    id: 'OFFICER-RELIABLE-BOUNDARY',
    clarification:
      '이 항목은 가까운 사이일수록 약속·책임·행동 기준이 일정하게 유지될 때 신뢰를 확인하기 쉬운 주제를 설명합니다. 규칙을 중시한다는 이유로 관계의 경직성이나 장기 결과를 단정하지 않습니다.',
    supportingClaimTypes: familySupport('officer'),
  },
  {
    id: 'PEER-OFFICER-AUTONOMY-WITH-BOUNDARY',
    clarification:
      '이 항목은 각자의 자율성을 인정하는 방향과 서로 지켜야 할 약속·책임의 경계를 분명히 하는 방향이 함께 필요할 수 있음을 설명합니다. 자유와 규칙 중 어느 하나를 항상 우선하라는 결론은 내리지 않습니다.',
    supportingClaimTypes: familySupport('peer', 'officer'),
  },
  {
    id: 'RESOURCE-OUTPUT-PROCESS-THEN-SPEAK',
    clarification:
      '이 항목은 감정이나 생각을 바로 말하기 전에 정리할 시간이 필요하면서도, 정리가 끝난 뒤에는 실제 표현으로 이어져야 관계 정보가 공유된다는 구조를 설명합니다. 침묵이나 즉시 표현 중 하나만 정답으로 보지 않습니다.',
    supportingClaimTypes: familySupport('resource', 'output'),
  },
  {
    id: 'OUTPUT-WEALTH-WORDS-TO-ACTION',
    clarification:
      '이 항목은 말로 표현된 마음과 실제 시간·도움·약속 이행이 연결될 때 신뢰를 확인하기 쉬운 주제를 설명합니다. 행동 표현이 다르다는 이유만으로 진정성이나 관계 결과를 판단하지 않습니다.',
    supportingClaimTypes: familySupport('output', 'wealth'),
  },
  {
    id: 'OFFICER-RESOURCE-CARE-THROUGH-PREPARATION',
    clarification:
      '이 항목은 관심을 감정 표현보다 정보 확인·준비·문제 해결·약속 기억 같은 책임 있는 행동으로 드러내기 쉬운 방식을 설명합니다. 상대가 그 표현 방식을 동일하게 받아들일 것이라고 가정하지 않습니다.',
    supportingClaimTypes: familySupport('officer', 'resource'),
  },
  {
    id: 'PEER-WEALTH-MY-CHOICE-VS-SHARED-RESOURCE',
    clarification:
      '이 항목은 개인의 선택권과 함께 써야 하는 시간·돈·에너지 같은 공동 자원이 충돌할 때 조율이 필요해질 수 있음을 설명합니다. 실제 갈등 발생이나 관계 지속 여부를 예측하지 않습니다.',
    supportingClaimTypes: familySupport('peer', 'wealth'),
  },
  {
    id: 'WEALTH-RESOURCE-SOLVE-VS-UNDERSTAND',
    clarification:
      '이 항목은 현실적인 해결을 빨리 만들고 싶은 방향과 충분히 이해하고 납득한 뒤 움직이고 싶은 방향이 동시에 작동할 때 생기는 갈등 처리 긴장을 설명합니다. 어느 방식이 항상 더 옳다고 판정하지 않습니다.',
    supportingClaimTypes: familySupport('wealth', 'resource'),
  },
] as const);

const approvals: Record<string, OfficialReadingDomainDetailedApprovalSpecV1> = {};
for (const spec of SPECS) {
  approvals[
    `RELATIONSHIP_NATAL_CONCLUSION_${spec.id.replaceAll('-', '_')}`
  ] = Object.freeze({
    clarification: spec.clarification,
    supportingClaimTypes: spec.supportingClaimTypes,
  });
}

export const RELATIONSHIP_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 =
  buildOfficialReadingDomainDetailedProfilesV1({
    owner: 'relationship:natal:general',
    authorityId: AUTHORITY_ID,
    authorityVersion: AUTHORITY_VERSION,
    sourceRefs: Object.freeze([
      GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
      GENERAL_NATAL_CONCLUSION_SOURCE.sourceId,
    ]),
    boundary: BOUNDARY,
    definitions: RELATIONSHIP_NATAL_APPROVED_CONCISE_DEFINITIONS,
    approvals: Object.freeze(approvals),
  });
