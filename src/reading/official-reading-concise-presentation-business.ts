import { BUSINESS_NATAL_READING_METHODOLOGY } from '../research/business-natal-reading-candidate.js';
import {
  OFFICIAL_READING_CONCISE_NO_QUALIFIERS,
  type ApprovedOfficialReadingConciseDefinitionV1,
} from './official-reading-concise-presentation-definition.js';

const PROHIBITED = Object.freeze([
  'businessSuccessAuthorized',
  'entrepreneurSuitabilityAuthorized',
  'failureOutcomeAuthorized',
  'financialAdviceAuthorized',
  'fundingOutcomeAuthorized',
  'futureTimingAuthorized',
  'numericScoringAuthorized',
  'revenueOutcomeAuthorized',
  'specificIndustryAuthorized',
]);

const SPECS = Object.freeze([
  {
    id: 'PEER-DECISION-OWNERSHIP',
    headline: '중요한 판단에서 내가 결정할 수 있는 영역이 있을 때 움직이기 편한 편입니다',
    summary: '사업처럼 답이 정해져 있지 않은 상황에서는 모든 결정을 남에게 맡기기보다 내가 납득한 기준으로 선택할 수 있을 때 실행력이 살아날 수 있습니다. 반대로 책임은 지는데 결정권은 거의 없는 구조에서는 답답함이 커질 수 있습니다.',
    concise: '중요한 판단에서 스스로 결정할 수 있는 영역이 있을 때 실행하기 편한 편입니다.',
  },
  {
    id: 'RESOURCE-UNCERTAINTY-BEFORE-COMMIT',
    headline: '큰 결정을 하기 전에 정보를 모아 불확실성을 줄이는 과정이 중요한 편입니다',
    summary: '무작정 뛰어들기보다 상황과 조건을 이해하고 필요한 정보를 확인한 뒤 움직일 때 심리적으로 안정되기 쉽습니다. 다만 완전히 확실해질 때까지 기다리려 하면 결정 시점을 놓칠 수 있어 무엇까지 확인하면 실행할지 기준을 정해두는 편이 도움이 됩니다.',
    concise: '큰 결정을 앞두고 필요한 정보를 확인하되 실행 기준을 정해두면 과도한 지연을 줄이기 쉽습니다.',
  },
  {
    id: 'OUTPUT-TEST-BY-DOING',
    headline: '계속 검토만 하기보다 작게 실행해 반응을 확인할 때 판단이 빨라질 수 있습니다',
    summary: '아이디어를 머릿속에서 오래 굴리는 것보다 작은 형태로 먼저 실행해 결과와 반응을 확인하는 방식이 더 잘 맞을 수 있습니다. 직접 해본 결과가 다음 판단의 근거가 되기 때문에 실행과 수정의 반복이 중요해질 수 있습니다.',
    concise: '작게 실행해 실제 반응을 확인하고 수정하는 방식이 판단을 빠르게 만드는 데 도움이 될 수 있습니다.',
  },
  {
    id: 'WEALTH-RESOURCE-ALLOCATION',
    headline: '시간과 돈을 어디에 써야 실제 결과가 커지는지 따져보는 감각이 중요한 편입니다',
    summary: '여러 선택지가 있을수록 제한된 자원을 어디에 먼저 넣을지가 중요해집니다. 비용이나 노력의 크기만 보기보다 지금 무엇에 투입해야 실제 반응이나 성과를 확인할 수 있는지를 기준으로 우선순위를 잡는 방식이 잘 맞을 수 있습니다.',
    concise: '제한된 시간과 돈을 실제 반응이나 성과를 확인할 수 있는 곳에 우선 배분하는 감각이 중요할 수 있습니다.',
  },
  {
    id: 'OFFICER-ACCOUNTABILITY-BOUNDARY',
    headline: '역할과 책임 기준이 분명해야 사업이 안정적으로 굴러간다고 느끼기 쉬운 편입니다',
    summary: '누가 무엇을 결정하고 어디까지 책임지는지 애매한 상태가 길어지면 피로가 커질 수 있습니다. 함께 일하는 사람이 있다면 결정 기준, 기한, 책임 범위처럼 최소한의 운영 규칙을 분명히 해두는 편이 지속적으로 관리하기 쉽습니다.',
    concise: '결정권·기한·책임 범위를 분명히 하면 함께 일하는 구조를 안정적으로 관리하기 쉽습니다.',
  },
  {
    id: 'OUTPUT-WEALTH-MARKET-FEEDBACK',
    headline: '만든 것을 실제 반응과 연결해 빠르게 고치는 흐름에서 사업 감각을 확인하기 쉽습니다',
    summary: '무엇을 만들었는지 자체보다 외부 반응, 실제 이용 여부, 선택 결과처럼 확인 가능한 피드백이 들어올 때 다음 행동을 정하기 쉬울 수 있습니다. 반응이 없는데도 계속 만드는 것보다 작은 결과를 확인하면서 방향을 바꾸는 운영이 더 자연스러울 수 있습니다.',
    concise: '만든 결과를 실제 외부 반응과 연결해 확인하며 방향을 수정하는 운영이 자연스러울 수 있습니다.',
  },
  {
    id: 'RESOURCE-OUTPUT-ANALYZE-THEN-EXPERIMENT',
    headline: '조사와 실행을 따로 두기보다 확인한 내용을 바로 작은 실험으로 연결하는 편이 좋습니다',
    summary: '정보를 충분히 이해하고 싶어 하는 마음과 직접 시험해보고 싶은 마음이 함께 있을 수 있습니다. 조사만 길어지거나 반대로 근거 없이 실행만 반복하면 효율이 떨어질 수 있어, 하나를 확인하면 하나를 시험하는 식으로 검토와 실험을 짝지으면 판단 속도를 유지하기 쉽습니다.',
    concise: '조사한 내용을 작은 실험으로 바로 연결해 검토와 실행을 함께 돌리는 편이 판단 속도를 유지하기 쉽습니다.',
  },
  {
    id: 'PEER-OFFICER-PARTNER-DECISION-RIGHTS',
    headline: '파트너와 함께할 때는 친분보다 결정권과 책임 범위를 먼저 나누는 편이 안전합니다',
    summary: '각자 자기 방식대로 움직이고 싶은 성향과 역할 기준을 분명히 하고 싶은 성향이 함께 나타날 수 있습니다. 함께 사업을 한다면 누가 어떤 결정을 단독으로 할 수 있는지, 합의가 필요한 영역은 무엇인지 미리 정해두면 힘겨루기와 책임 떠넘기기를 줄이는 데 도움이 됩니다.',
    concise: '파트너와는 친분보다 단독 결정 영역과 합의 영역, 책임 범위를 먼저 나누는 편이 안전합니다.',
  },
  {
    id: 'WEALTH-OFFICER-BUDGET-ACCOUNTABILITY',
    headline: '예산과 책임을 함께 묶어 관리할 때 자원 낭비를 줄이기 쉬운 편입니다',
    summary: '돈을 쓰는 결정과 그 결과를 확인하는 책임이 떨어져 있으면 운영이 답답하게 느껴질 수 있습니다. 항목별로 얼마를 왜 쓰는지와 누가 결과를 확인할지를 연결해두면 비용을 줄이는 것보다 더 명확한 기준으로 자원을 배분하기 쉽습니다.',
    concise: '예산 사용과 결과 확인 책임을 함께 묶으면 자원 배분 기준을 더 명확하게 세우기 쉽습니다.',
  },
  {
    id: 'PEER-WEALTH-CONVICTION-VS-ECONOMICS',
    headline: '내가 밀고 싶은 방향과 실제 반응에서 확인되는 선택이 다를 때 갈등이 커질 수 있습니다',
    summary: '내 판단에 확신이 생기면 그대로 밀고 가고 싶지만 사업에서는 비용, 수요, 효율 때문에 방향을 조정해야 할 때가 있습니다. 무엇은 끝까지 지킬 원칙이고 무엇은 반응에 따라 바꿀 가설인지 구분해두면 고집과 성급한 포기 사이에서 균형을 잡기 쉽습니다.',
    concise: '지킬 원칙과 반응에 따라 바꿀 가설을 구분하면 확신과 현실 조건 사이의 갈등을 줄이기 쉽습니다.',
  },
  {
    id: 'OUTPUT-WEALTH-OFFICER-OPERATING-LOOP',
    headline: '만들기, 결과 확인, 운영 기준 정리를 한 흐름으로 연결할 때 사업을 다루기 편할 수 있습니다',
    summary: '아이디어를 실행하고 실제 반응을 확인한 뒤 그 결과를 다음 운영 기준으로 만드는 과정이 이어질 때 강점이 살아날 수 있습니다. 다만 결과 압박이 커질수록 당장 만드는 일에만 몰리거나 관리 기준만 늘어날 수 있어 실행과 점검을 같은 주기로 묶어두는 편이 좋습니다.',
    concise: '만들기·반응 확인·운영 기준 정리를 한 흐름으로 연결할 때 실행과 점검의 균형을 잡기 쉽습니다.',
  },
]);

export const BUSINESS_NATAL_APPROVED_CONCISE_DEFINITIONS: readonly ApprovedOfficialReadingConciseDefinitionV1[] =
  Object.freeze(
    SPECS.map((spec) =>
      Object.freeze({
        owner: 'business:natal' as const,
        profileId: `business-natal-${spec.id.toLowerCase()}-concise-v1`,
        profileVersion: '1' as const,
        claimType: `BUSINESS_NATAL_CONCLUSION_${spec.id.replaceAll('-', '_')}`,
        methodologyRef: {
          id: BUSINESS_NATAL_READING_METHODOLOGY.methodologyId,
          version: BUSINESS_NATAL_READING_METHODOLOGY.version,
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
