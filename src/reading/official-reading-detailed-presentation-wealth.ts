import {
  GENERAL_NATAL_CONCLUSION_SOURCE,
} from '../research/general-natal-conclusion-synthesis-candidate.js';
import {
  GENERAL_NATAL_USEFUL_READING_SOURCE,
} from '../research/general-natal-useful-reading-candidate.js';
import {
  WEALTH_NATAL_APPROVED_CONCISE_DEFINITIONS,
} from './official-reading-concise-presentation-wealth.js';
import {
  buildOfficialReadingDomainDetailedProfilesV1,
  type OfficialReadingDomainDetailedApprovalSpecV1,
} from './official-reading-detailed-presentation-domain.js';

const AUTHORITY_ID = 'SA-6S-WEALTH-NATAL-DETAILED-MATERIAL';
const AUTHORITY_VERSION = '1';

const BOUNDARY =
  '이 재물 해석은 돈과 자원을 다루는 의사결정 습관과 관리 조건을 설명하는 범위에 한정됩니다. 실제 자산 규모·소득·부채 결과·투자 수익·횡재·미래 금전 시점을 예측하지 않으며 투자·세금·신용 등 금융 조언이나 점수 판정으로 사용하지 않습니다.';

function familySupport(
  ...families: readonly ('peer' | 'resource' | 'output' | 'wealth' | 'officer')[]
): readonly string[] {
  return Object.freeze(
    families.map((family) => `TEN_GOD_FAMILY_${family.toUpperCase()}_PRESENT`),
  );
}

const SPECS = Object.freeze([
  {
    id: 'WEALTH-RESULT-AS-RESOURCE',
    clarification:
      '이 항목은 돈의 보유량보다 돈이 실제 선택과 활동 범위를 어떻게 바꾸는지를 읽는 데 초점을 둡니다. 목적이 분명한 자원과 목적이 불분명한 자원을 구분해 관리 기준이 달라질 수 있다는 정도까지 해석합니다.',
    supportingClaimTypes: familySupport('wealth'),
  },
  {
    id: 'OUTPUT-CREATE-VALUE',
    clarification:
      '이 항목은 표현이나 생산 활동이 실제 결과물로 이어지고, 그 결과물이 누군가에게 쓰임을 가질 때 금전 판단이 구체화되는 흐름을 설명합니다. 결과물을 만든다는 사실만으로 수익 발생을 보장하지 않습니다.',
    supportingClaimTypes: familySupport('output'),
  },
  {
    id: 'RESOURCE-CAPABILITY-SPEND',
    clarification:
      '이 항목은 배움·도구·자료에 쓰는 비용을 미래 활동 범위를 넓히는 준비 자원으로 받아들이기 쉬운 경향을 설명합니다. 준비 비용의 타당성은 실제 사용 계획과 분리해서 판단해야 한다는 한계도 함께 둡니다.',
    supportingClaimTypes: familySupport('resource'),
  },
  {
    id: 'OFFICER-RULED-MANAGEMENT',
    clarification:
      '이 항목은 돈을 다룰 때 완전한 즉흥 판단보다 최소한의 한도·우선순위·책임 기준이 있을수록 안정적으로 판단하기 쉬운 조건을 설명합니다. 특정 예산 비율이나 재무 규칙을 추천하는 해석은 아닙니다.',
    supportingClaimTypes: familySupport('officer'),
  },
  {
    id: 'PEER-AUTONOMY-SPEND',
    clarification:
      '이 항목은 지출의 가치를 물건 자체보다 선택권·독립성·시간 절약처럼 자기 결정 범위를 넓히는 효과와 연결해 느끼기 쉬운 주제를 설명합니다. 소비 성향의 좋고 나쁨이나 지출 규모를 판정하지 않습니다.',
    supportingClaimTypes: familySupport('peer'),
  },
  {
    id: 'OUTPUT-WEALTH-MAKE-TO-VALUE',
    clarification:
      '이 항목은 만든 결과와 현실 자원의 축이 함께 관찰될 때, 결과물이 실제 가치 교환으로 이어지는 과정을 금전 판단의 중요한 연결고리로 보기 쉽다는 뜻입니다. 실제 판매·수익·시장 성공을 예측하지 않습니다.',
    supportingClaimTypes: familySupport('output', 'wealth'),
  },
  {
    id: 'WEALTH-OFFICER-RESULT-TO-BUDGET',
    clarification:
      '이 항목은 자원이 들어오고 나가는 흐름을 목적별 역할과 관리 기준으로 나눌 때 판단이 안정되기 쉬운 주제를 설명합니다. 정해진 예산표나 특정 재무 비율을 권고하는 의미는 아닙니다.',
    supportingClaimTypes: familySupport('wealth', 'officer'),
  },
  {
    id: 'WEALTH-RESOURCE-LEARN-VS-RETURN',
    clarification:
      '이 항목은 더 배우거나 준비하기 위해 자원을 쓰려는 방향과, 현재 가진 것으로 먼저 결과를 내야 한다는 방향이 동시에 작동할 때 생기는 판단 긴장을 설명합니다. 어느 쪽이 항상 우선이라는 결론은 내리지 않습니다.',
    supportingClaimTypes: familySupport('wealth', 'resource'),
  },
  {
    id: 'PEER-WEALTH-MY-WAY-VS-BUDGET',
    clarification:
      '이 항목은 자신의 선택 기준을 지키고 싶은 방향과 현실적인 비용·효율을 맞춰야 하는 방향이 부딪힐 수 있음을 설명합니다. 취향을 포기하거나 반대로 예산을 무시해야 한다는 처방으로 확장하지 않습니다.',
    supportingClaimTypes: familySupport('peer', 'wealth'),
  },
  {
    id: 'OUTPUT-WEALTH-OFFICER-VALUE-OPERATING-LOOP',
    clarification:
      '이 항목은 만들기, 실제 가치 확인, 다음 자원 배분과 관리 기준 설정을 하나의 반복 흐름으로 볼 때 판단이 쉬워질 수 있다는 구조를 설명합니다. 특정 사업 모델이나 수익 전략을 제안하는 해석은 아닙니다.',
    supportingClaimTypes: familySupport('output', 'wealth', 'officer'),
  },
  {
    id: 'PEER-WEALTH-RESOURCE-CHOICE-GROWTH-TRADEOFF',
    clarification:
      '이 항목은 선택권을 위해 쓰는 자원, 성장과 준비에 쓰는 자원, 현재 유지에 필요한 자원이 동시에 중요해질 때 우선순위가 복잡해질 수 있음을 설명합니다. 세 목적의 실제 금액 배분을 대신 결정하지 않습니다.',
    supportingClaimTypes: familySupport('peer', 'wealth', 'resource'),
  },
] as const);

const approvals: Record<string, OfficialReadingDomainDetailedApprovalSpecV1> = {};
for (const spec of SPECS) {
  approvals[`WEALTH_NATAL_CONCLUSION_${spec.id.replaceAll('-', '_')}`] =
    Object.freeze({
      clarification: spec.clarification,
      supportingClaimTypes: spec.supportingClaimTypes,
    });
}

export const WEALTH_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 =
  buildOfficialReadingDomainDetailedProfilesV1({
    owner: 'wealth:natal',
    authorityId: AUTHORITY_ID,
    authorityVersion: AUTHORITY_VERSION,
    sourceRefs: Object.freeze([
      GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
      GENERAL_NATAL_CONCLUSION_SOURCE.sourceId,
    ]),
    boundary: BOUNDARY,
    definitions: WEALTH_NATAL_APPROVED_CONCISE_DEFINITIONS,
    approvals: Object.freeze(approvals),
  });
