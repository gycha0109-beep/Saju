import {
  GENERAL_NATAL_CONCLUSION_SOURCE,
} from '../research/general-natal-conclusion-synthesis-candidate.js';
import {
  GENERAL_NATAL_USEFUL_READING_SOURCE,
} from '../research/general-natal-useful-reading-candidate.js';
import {
  BUSINESS_NATAL_APPROVED_CONCISE_DEFINITIONS,
} from './official-reading-concise-presentation-business.js';
import {
  buildOfficialReadingDomainDetailedProfilesV1,
  type OfficialReadingDomainDetailedApprovalSpecV1,
} from './official-reading-detailed-presentation-domain.js';

const AUTHORITY_ID = 'SA-6S-BUSINESS-NATAL-DETAILED-MATERIAL';
const AUTHORITY_VERSION = '1';

const BOUNDARY =
  '이 사업 해석은 불확실성 처리·실행 방식·자원 배분·파트너 역할·운영 책임 같은 사업 운영 조건을 설명하는 범위에 한정됩니다. 창업 적성·특정 업종·사업 성공·매출·투자유치·실패·폐업·미래 시점을 예측하지 않으며 금융 조언이나 점수 판정으로 사용하지 않습니다.';

function familySupport(
  ...families: readonly ('peer' | 'resource' | 'output' | 'wealth' | 'officer')[]
): readonly string[] {
  return Object.freeze(
    families.map((family) => `TEN_GOD_FAMILY_${family.toUpperCase()}_PRESENT`),
  );
}

const SPECS = Object.freeze([
  {
    id: 'PEER-DECISION-OWNERSHIP',
    clarification:
      '이 항목은 정답이 정해지지 않은 운영 상황에서 책임만 지는 것보다 일정한 결정권을 함께 가질 때 실행하기 편할 수 있다는 주제를 설명합니다. 이를 창업가 적성이나 독립 사업 성공 가능성으로 확대하지 않습니다.',
    supportingClaimTypes: familySupport('peer'),
  },
  {
    id: 'RESOURCE-UNCERTAINTY-BEFORE-COMMIT',
    clarification:
      '이 항목은 큰 결정을 앞두고 필요한 정보와 조건을 확인해 불확실성을 낮춘 뒤 움직이는 방식을 설명합니다. 모든 변수를 알 때까지 기다려야 한다는 뜻이 아니라 실행에 필요한 확인 기준을 정하는 문제로 한정합니다.',
    supportingClaimTypes: familySupport('resource'),
  },
  {
    id: 'OUTPUT-TEST-BY-DOING',
    clarification:
      '이 항목은 아이디어를 완성된 계획으로 오래 보관하기보다 작은 실행으로 바꾸고 실제 반응을 다음 판단 근거로 쓰는 흐름을 설명합니다. 실험을 많이 한다는 이유로 시장 성공이나 매출을 예측하지 않습니다.',
    supportingClaimTypes: familySupport('output'),
  },
  {
    id: 'WEALTH-RESOURCE-ALLOCATION',
    clarification:
      '이 항목은 제한된 시간·돈·노력을 어디에 먼저 투입해야 실제 반응이나 결과를 확인할 수 있는지 우선순위를 세우는 문제를 설명합니다. 구체적인 투자 금액이나 자금 배분 비율을 권고하지 않습니다.',
    supportingClaimTypes: familySupport('wealth'),
  },
  {
    id: 'OFFICER-ACCOUNTABILITY-BOUNDARY',
    clarification:
      '이 항목은 함께 운영할 때 결정권·기한·책임 범위를 명확히 해두는 것이 지속적인 관리에 도움이 될 수 있다는 주제를 설명합니다. 조직 규모나 리더 역할의 적합성을 판정하지 않습니다.',
    supportingClaimTypes: familySupport('officer'),
  },
  {
    id: 'OUTPUT-WEALTH-MARKET-FEEDBACK',
    clarification:
      '이 항목은 만든 결과와 실제 외부 반응을 연결해 확인하고, 확인된 정보에 따라 다음 실행을 조정하는 운영 흐름을 설명합니다. 반응을 관찰한다는 사실만으로 시장성이나 수익성을 보장하지 않습니다.',
    supportingClaimTypes: familySupport('output', 'wealth'),
  },
  {
    id: 'RESOURCE-OUTPUT-ANALYZE-THEN-EXPERIMENT',
    clarification:
      '이 항목은 조사와 실행을 서로 대체하는 단계로 두기보다, 확인한 정보를 작은 실험으로 이어 다시 학습하는 반복 구조를 설명합니다. 분석 또는 실행 중 어느 하나가 항상 우선이라는 결론은 내리지 않습니다.',
    supportingClaimTypes: familySupport('resource', 'output'),
  },
  {
    id: 'PEER-OFFICER-PARTNER-DECISION-RIGHTS',
    clarification:
      '이 항목은 파트너 관계에서 친분만으로 운영하기보다 단독 결정 영역·합의 영역·책임 범위를 명시할 필요가 커질 수 있음을 설명합니다. 실제 파트너 갈등이나 동업 성공 여부를 예측하지 않습니다.',
    supportingClaimTypes: familySupport('peer', 'officer'),
  },
  {
    id: 'WEALTH-OFFICER-BUDGET-ACCOUNTABILITY',
    clarification:
      '이 항목은 자원을 쓰는 결정과 그 결과를 확인하는 책임을 연결해둘 때 운영 기준이 명확해질 수 있다는 주제를 설명합니다. 비용 절감 자체를 최우선 목표로 두거나 특정 회계 방식을 권고하지 않습니다.',
    supportingClaimTypes: familySupport('wealth', 'officer'),
  },
  {
    id: 'PEER-WEALTH-CONVICTION-VS-ECONOMICS',
    clarification:
      '이 항목은 스스로 밀고 싶은 방향과 비용·수요·효율 같은 현실 반응이 다를 때 생길 수 있는 의사결정 긴장을 설명합니다. 개인의 확신이나 시장 반응 중 어느 하나를 항상 따라야 한다는 뜻은 아닙니다.',
    supportingClaimTypes: familySupport('peer', 'wealth'),
  },
  {
    id: 'OUTPUT-WEALTH-OFFICER-OPERATING-LOOP',
    clarification:
      '이 항목은 만들기, 반응 확인, 다음 운영 기준 설정을 한 주기로 연결할 때 실행과 관리의 균형을 잡기 쉬울 수 있다는 구조를 설명합니다. 특정 사업 운영법이나 성장 공식을 제시하는 해석은 아닙니다.',
    supportingClaimTypes: familySupport('output', 'wealth', 'officer'),
  },
] as const);

const approvals: Record<string, OfficialReadingDomainDetailedApprovalSpecV1> = {};
for (const spec of SPECS) {
  approvals[`BUSINESS_NATAL_CONCLUSION_${spec.id.replaceAll('-', '_')}`] =
    Object.freeze({
      clarification: spec.clarification,
      supportingClaimTypes: spec.supportingClaimTypes,
    });
}

export const BUSINESS_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 =
  buildOfficialReadingDomainDetailedProfilesV1({
    owner: 'business:natal',
    authorityId: AUTHORITY_ID,
    authorityVersion: AUTHORITY_VERSION,
    sourceRefs: Object.freeze([
      GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
      GENERAL_NATAL_CONCLUSION_SOURCE.sourceId,
    ]),
    boundary: BOUNDARY,
    definitions: BUSINESS_NATAL_APPROVED_CONCISE_DEFINITIONS,
    approvals: Object.freeze(approvals),
  });
