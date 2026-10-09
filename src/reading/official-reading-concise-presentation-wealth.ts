import { WEALTH_NATAL_READING_METHODOLOGY } from '../research/wealth-natal-reading-candidate.js';
import {
  OFFICIAL_READING_CONCISE_NO_QUALIFIERS,
  type ApprovedOfficialReadingConciseDefinitionV1,
} from './official-reading-concise-presentation-definition.js';

const PROHIBITED = Object.freeze([
  'financialAdviceAuthorized',
  'futureMoneyTimingAuthorized',
  'investmentReturnAuthorized',
  'netWorthAuthorized',
  'numericScoringAuthorized',
  'windfallAuthorized',
]);

const SPECS = Object.freeze([
  {
    id: 'WEALTH-RESULT-AS-RESOURCE',
    headline: '돈을 숫자보다 실제 선택지를 만드는 자원으로 보는 편입니다',
    summary: '돈이 얼마나 쌓였는지만 보는 것보다 그 돈으로 무엇을 할 수 있는지, 어떤 결과를 만들 수 있는지를 함께 생각하는 편에 가깝습니다. 목적이 분명한 돈은 관리하기 쉽지만 용도가 명확하지 않은 돈은 기준이 흐려질 수 있습니다.',
    concise: '돈을 실제 선택과 결과를 만드는 자원으로 보는 편이며, 용도가 분명할수록 관리 기준도 선명해질 수 있습니다.',
  },
  {
    id: 'OUTPUT-CREATE-VALUE',
    headline: '직접 만든 결과에 가치가 붙는 구조를 이해하기 쉽습니다',
    summary: '생각이나 능력을 실제 결과물로 바꾸는 과정이 돈의 흐름을 이해하는 출발점이 될 수 있습니다. 무엇을 만들었고 누가 왜 필요로 하는지가 보일 때 금전적인 판단도 더 구체적으로 하기 쉬운 편입니다.',
    concise: '직접 만든 결과가 누구에게 어떤 가치가 되는지 보일 때 금전 판단이 구체화되기 쉽습니다.',
  },
  {
    id: 'RESOURCE-CAPABILITY-SPEND',
    headline: '배움과 도구에 쓰는 돈은 비교적 납득하기 쉬운 편입니다',
    summary: '배움, 준비, 도구, 자료처럼 앞으로의 판단이나 활동 범위를 넓혀주는 지출에는 의미를 느끼기 쉽습니다. 다만 준비 자체가 목적이 되면 실제로 써보지 못한 채 비용만 늘어날 수 있어 사용 시점을 함께 정하는 편이 좋습니다.',
    concise: '배움·도구처럼 활동 범위를 넓히는 지출을 납득하기 쉽지만 실제 사용 시점을 함께 정하는 편이 좋습니다.',
  },
  {
    id: 'OFFICER-RULED-MANAGEMENT',
    headline: '돈 관리에도 최소한의 기준과 책임 경계가 있는 편이 안정적입니다',
    summary: '매번 기분에 따라 판단하기보다 고정비, 한도, 우선순위처럼 미리 정한 기준이 있으면 돈을 다루기 훨씬 편할 수 있습니다. 기준이 너무 촘촘할 필요는 없지만 어디까지 써도 되는지는 분명한 구조가 잘 맞습니다.',
    concise: '고정비·한도·우선순위처럼 최소한의 기준을 두면 돈을 더 안정적으로 관리하기 쉽습니다.',
  },
  {
    id: 'PEER-AUTONOMY-SPEND',
    headline: '돈을 선택권과 자율성을 확보하는 수단으로 느끼기 쉽습니다',
    summary: '남이 정한 방식에 맞추기보다 내가 원하는 선택을 할 수 있게 해주는 돈의 역할을 중요하게 볼 수 있습니다. 그래서 편의, 독립성, 시간을 아끼는 데 쓰는 돈은 단순 소비보다 선택권을 사는 비용처럼 느껴질 수 있습니다.',
    concise: '돈을 자율성과 선택권을 확보하는 수단으로 느끼기 쉬워 편의·독립성에 쓰는 비용을 중요하게 볼 수 있습니다.',
  },
  {
    id: 'OUTPUT-WEALTH-MAKE-TO-VALUE',
    headline: '직접 만든 것을 실제 가치와 연결할 때 돈의 감각이 선명해집니다',
    summary: '만든 결과가 사람에게 어떤 도움을 주고 어떤 대가를 받을 수 있는지까지 이어서 볼 때 금전적인 판단이 구체화될 수 있습니다. 결과물과 가치 교환이 가까이 있는 구조에서 돈의 흐름을 이해하기 쉬운 편입니다.',
    concise: '만든 결과를 실제 가치 교환과 연결해 볼 때 돈의 흐름을 이해하기 쉬운 편입니다.',
  },
  {
    id: 'WEALTH-OFFICER-RESULT-TO-BUDGET',
    headline: '들어오고 나가는 돈을 역할별로 나누면 관리가 쉬워집니다',
    summary: '돈이 생겼을 때 전부 한 덩어리로 보기보다 생활비, 계획된 지출, 여유자금처럼 역할을 나누는 방식이 잘 맞을 수 있습니다. 현실적인 결과를 확인하면서도 지켜야 할 기준을 함께 두면 판단이 안정되는 편입니다.',
    concise: '돈의 역할을 나누고 결과와 기준을 함께 확인하면 관리가 안정되기 쉽습니다.',
  },
  {
    id: 'WEALTH-RESOURCE-LEARN-VS-RETURN',
    headline: '더 배우기 위해 쓰는 돈과 지금 결과를 내야 하는 돈 사이에서 흔들릴 수 있습니다',
    summary: '조금 더 배우거나 더 나은 준비 수단을 갖추면 결과가 좋아질 것 같다는 생각과, 지금 가진 것으로 먼저 결과를 내야 한다는 현실이 충돌하기 쉽습니다. 지출 전에 “이걸 언제 실제로 쓸 것인가”를 정하면 과잉 준비를 줄이는 데 도움이 됩니다.',
    concise: '성장에 쓰는 비용과 지금 결과를 내야 하는 비용이 충돌할 수 있어 실제 사용 시점을 먼저 정하는 편이 도움이 됩니다.',
  },
  {
    id: 'PEER-WEALTH-MY-WAY-VS-BUDGET',
    headline: '내가 원하는 선택과 현실적인 예산이 부딪힐 때 스트레스가 커질 수 있습니다',
    summary: '원하는 방식이 분명할수록 비용이나 효율 때문에 선택을 바꿔야 할 때 답답함을 느끼기 쉽습니다. 모든 선택을 아끼는 방향으로 만들기보다 반드시 지킬 취향과 타협 가능한 비용을 미리 나누는 편이 현실적입니다.',
    concise: '원하는 선택과 예산이 부딪힐 때 지킬 취향과 타협 가능한 비용을 미리 나누는 편이 현실적입니다.',
  },
  {
    id: 'OUTPUT-WEALTH-OFFICER-VALUE-OPERATING-LOOP',
    headline: '만들고, 가치가 생기는지 확인하고, 다시 관리하는 흐름이 잘 맞습니다',
    summary: '돈을 따로 떼어 생각하기보다 무엇을 만들었는지, 실제 가치가 생겼는지, 다음에 얼마를 다시 쓸지까지 한 흐름으로 보는 편이 이해하기 쉽습니다. 작은 선택에서도 결과와 비용을 함께 확인하면 판단 기준이 빠르게 선명해질 수 있습니다.',
    concise: '만들기·가치 확인·재투입을 한 흐름으로 보면 비용과 결과의 판단 기준을 세우기 쉽습니다.',
  },
  {
    id: 'PEER-WEALTH-RESOURCE-CHOICE-GROWTH-TRADEOFF',
    headline: '자유롭게 쓰고 싶은 마음, 성장에 쓰고 싶은 마음, 아껴야 한다는 현실이 동시에 생길 수 있습니다',
    summary: '내 선택권을 위해 쓰는 돈과 배우기 위해 쓰는 돈이 모두 중요하게 느껴지면 우선순위가 자주 흔들릴 수 있습니다. 한 번의 결제로 여러 목적을 만족시키려 하기보다 선택권·성장·유지비를 따로 구분해 보는 편이 판단을 단순하게 만듭니다.',
    concise: '선택권·성장·유지비를 분리해 우선순위를 정하면 여러 지출 목적이 겹칠 때 판단을 단순하게 만들 수 있습니다.',
  },
]);

export const WEALTH_NATAL_APPROVED_CONCISE_DEFINITIONS: readonly ApprovedOfficialReadingConciseDefinitionV1[] =
  Object.freeze(
    SPECS.map((spec) =>
      Object.freeze({
        owner: 'wealth:natal' as const,
        profileId: `wealth-natal-${spec.id.toLowerCase().replaceAll('_', '-').replaceAll('--', '-')}-concise-v1`,
        profileVersion: '1' as const,
        claimType: `WEALTH_NATAL_CONCLUSION_${spec.id.replaceAll('-', '_')}`,
        methodologyRef: {
          id: WEALTH_NATAL_READING_METHODOLOGY.methodologyId,
          version: WEALTH_NATAL_READING_METHODOLOGY.version,
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
