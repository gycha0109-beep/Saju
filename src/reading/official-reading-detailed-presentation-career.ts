import {
  GENERAL_NATAL_CONCLUSION_SOURCE,
} from '../research/general-natal-conclusion-synthesis-candidate.js';
import {
  GENERAL_NATAL_USEFUL_READING_SOURCE,
} from '../research/general-natal-useful-reading-candidate.js';
import {
  careerTenGodClaimType,
  type CareerTenGodChannel,
} from '../research/career-natal-reading-schema.js';
import type { TenGod } from '../contracts/calculation.js';
import {
  CAREER_NATAL_APPROVED_CONCISE_DEFINITIONS,
} from './official-reading-concise-presentation-career.js';
import {
  buildOfficialReadingDomainDetailedProfilesV1,
  type OfficialReadingDomainDetailedApprovalSpecV1,
} from './official-reading-detailed-presentation-domain.js';

const AUTHORITY_ID = 'SA-6S-CAREER-NATAL-DETAILED-MATERIAL';
const AUTHORITY_VERSION = '1';

const BOUNDARY =
  '이 직업 해석은 업무 방식과 환경 조건을 설명하는 범위에 한정됩니다. 특정 직업을 지정하거나 취업·승진·연봉·소득·직업 성공 여부·미래 시점을 예측하지 않으며, 점수나 적성 등급으로 바꾸지 않습니다.';

const CLARIFICATIONS: Readonly<
  Record<TenGod, Readonly<Record<CareerTenGodChannel, string>>>
> = Object.freeze({
  비견: Object.freeze({
    visible_stems:
      '비견이 겉으로 드러나는 업무 방식에 연결되면, 일을 처리할 때 스스로 납득한 기준과 판단권을 확보하는 문제가 전면에 나타나는 것으로 읽습니다. 자율성의 필요를 곧바로 독립 직무나 특정 직업 적성으로 확대하지는 않습니다.',
    branches:
      '비견이 일을 이어가는 바탕에 연결되면, 외부에서 보이는 주장보다 실제 선택 순간에 자기 기준을 유지할 수 있는지가 지속성에 영향을 주는 주제로 읽습니다. 이는 고집의 강도나 조직 적응 능력을 판정하는 뜻이 아닙니다.',
  }),
  겁재: Object.freeze({
    visible_stems:
      '겁재가 겉으로 드러나는 업무 방식에 연결되면, 협업 자체보다 역할·몫·공동 자원을 둘러싼 경계가 분명한지가 중요한 주제로 읽힙니다. 경쟁성이 있다는 이유만으로 갈등이나 성과를 예측하지 않습니다.',
    branches:
      '겁재가 일을 이어가는 바탕에 연결되면, 비교·경쟁·기여 배분이 누적될 때 업무 피로가 커질 수 있는 조건을 읽는 데 초점을 둡니다. 실제 대인 갈등이나 조직 내 승패를 단정하지 않습니다.',
  }),
  식신: Object.freeze({
    visible_stems:
      '식신이 겉으로 드러나는 업무 방식에 연결되면, 반복 가능한 생산 과정과 결과물 축적을 통해 역량을 드러내는 방식에 초점을 둡니다. 생산 성향이 있다고 해서 창작 직업이나 특정 성과가 자동으로 정해지는 것은 아닙니다.',
    branches:
      '식신이 일을 이어가는 바탕에 연결되면, 단발성 자극보다 일정한 리듬으로 만들고 완성하는 구조가 지속성에 도움이 되는 주제로 읽습니다. 실제 생산량이나 성취 수준을 계산하는 의미는 아닙니다.',
  }),
  상관: Object.freeze({
    visible_stems:
      '상관이 겉으로 드러나는 업무 방식에 연결되면, 문제를 발견한 뒤 표현·수정·개선으로 이어가는 통로가 열려 있는지가 중요한 주제로 읽힙니다. 비판 성향이나 규칙 위반 가능성을 단정하는 해석으로 사용하지 않습니다.',
    branches:
      '상관이 일을 이어가는 바탕에 연결되면, 납득되지 않는 비효율을 오래 방치하기보다 수정 가능성이 있을 때 집중하기 쉬운 조건을 읽습니다. 이는 조직 충돌이나 이직 결과를 예측하는 뜻이 아닙니다.',
  }),
  편재: Object.freeze({
    visible_stems:
      '편재가 겉으로 드러나는 업무 방식에 연결되면, 여러 사람·일정·자원·외부 반응을 동시에 보며 우선순위를 조정하는 현실 대응 방식을 읽습니다. 영업·사업 같은 특정 직무를 자동 지정하지 않습니다.',
    branches:
      '편재가 일을 이어가는 바탕에 연결되면, 선택지가 많을수록 자원을 어디에 먼저 배분할지 판단하는 문제가 지속성의 조건으로 작용할 수 있음을 봅니다. 수익 능력이나 돈 버는 규모를 뜻하지 않습니다.',
  }),
  정재: Object.freeze({
    visible_stems:
      '정재가 겉으로 드러나는 업무 방식에 연결되면, 완료 기준·책임 범위·관리 대상이 구체적일수록 업무 판단이 안정되는 방식을 읽습니다. 관리 직무나 재무 직무 적성을 직접 지정하는 해석은 아닙니다.',
    branches:
      '정재가 일을 이어가는 바탕에 연결되면, 일정·비용·품질처럼 현실 조건을 꾸준히 확인할 수 있는 구조가 지속성에 도움이 되는 주제로 읽습니다. 실제 성과 규모나 소득 결과를 예측하지 않습니다.',
  }),
  편관: Object.freeze({
    visible_stems:
      '편관이 겉으로 드러나는 업무 방식에 연결되면, 긴장도와 책임이 있는 상황에서 대응 권한이 함께 주어지는지가 중요한 조건으로 읽힙니다. 압박을 견딘다는 이유로 위험 직무나 리더 역할을 자동 지정하지 않습니다.',
    branches:
      '편관이 일을 이어가는 바탕에 연결되면, 책임이 무거워질수록 맡을 범위와 중단 기준을 분명히 해야 부담을 관리하기 쉽다는 주제로 읽습니다. 실제 스트레스 내성이나 성공 가능성을 측정하는 뜻은 아닙니다.',
  }),
  정관: Object.freeze({
    visible_stems:
      '정관이 겉으로 드러나는 업무 방식에 연결되면, 역할·절차·책임 기준이 명확할 때 판단과 실행을 안정적으로 이어가는 조건을 읽습니다. 공직·관리직 같은 특정 직업을 지정하지 않습니다.',
    branches:
      '정관이 일을 이어가는 바탕에 연결되면, 책임 소재와 운영 기준이 자주 바뀌지 않는 구조가 지속성에 도움이 되는 주제로 읽습니다. 순응성이나 승진 가능성을 평가하는 의미는 아닙니다.',
  }),
  편인: Object.freeze({
    visible_stems:
      '편인이 겉으로 드러나는 업무 방식에 연결되면, 낯선 자료와 관점을 연결해 기존 설명으로 바로 풀리지 않는 문제를 탐색하는 방식을 읽습니다. 이를 연구직·기획직 같은 특정 직무 적성으로 단정하지 않습니다.',
    branches:
      '편인이 일을 이어가는 바탕에 연결되면, 충분히 자료를 탐색하고 연결점을 찾을 시간이 있어야 사고 흐름을 유지하기 쉬운 조건을 봅니다. 실제 지적 능력이나 전문성 수준을 평가하는 뜻은 아닙니다.',
  }),
  정인: Object.freeze({
    visible_stems:
      '정인이 겉으로 드러나는 업무 방식에 연결되면, 정보와 원리를 이해하고 기준을 구조화한 뒤 움직일 때 안정적으로 판단하기 쉬운 방식을 읽습니다. 학력·자격·전문직 결과를 예측하지 않습니다.',
    branches:
      '정인이 일을 이어가는 바탕에 연결되면, 참고할 기준과 충분한 이해가 있을 때 업무 지속성이 높아질 수 있는 조건을 읽습니다. 준비가 필요하다는 사실을 실행력 부족으로 단정하지 않습니다.',
  }),
});

const GODS = Object.keys(CLARIFICATIONS) as TenGod[];
const CHANNELS: readonly CareerTenGodChannel[] = ['visible_stems', 'branches'];

const approvals: Record<string, OfficialReadingDomainDetailedApprovalSpecV1> = {};
for (const channel of CHANNELS) {
  for (const god of GODS) {
    approvals[careerTenGodClaimType(god, channel)] = Object.freeze({
      clarification: CLARIFICATIONS[god][channel],
      supportingClaimTypes: Object.freeze([]),
    });
  }
}

export const CAREER_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 =
  buildOfficialReadingDomainDetailedProfilesV1({
    owner: 'career:natal',
    authorityId: AUTHORITY_ID,
    authorityVersion: AUTHORITY_VERSION,
    sourceRefs: Object.freeze([
      GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
      GENERAL_NATAL_CONCLUSION_SOURCE.sourceId,
    ]),
    boundary: BOUNDARY,
    definitions: CAREER_NATAL_APPROVED_CONCISE_DEFINITIONS,
    approvals: Object.freeze(approvals),
  });
