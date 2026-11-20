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
    summary: '돈의 액수보다 그 돈이 열어 주는 선택지를 먼저 보는 구조입니다. 같은 여유자금도 지금 쓸 돈인지, 다음 계획을 위해 남겨 둘 돈인지, 일을 더 쉽게 만드는 비용인지에 따라 평가 기준은 달라집니다. 이 풀이의 핵심은 자원의 많고 적음이 아니라, 목적을 분명히 했을 때 판단이 달라지는 지점에 있습니다.',
    concise: '돈을 실제 선택과 결과를 만드는 자원으로 보는 편이며, 용도가 분명할수록 관리 기준도 선명해질 수 있습니다.',
  },
  {
    id: 'OUTPUT-CREATE-VALUE',
    headline: '직접 만든 결과에 가치가 붙는 구조를 이해하기 쉽습니다',
    summary: '생각을 메모로 남기는 일, 실제로 쓸 수 있는 결과물로 만드는 일, 그 결과가 타인에게 필요해지는 일은 서로 다릅니다. 식상의 산출 관점에서는 이 세 단계를 구분할수록 금전적인 판단이 구체화됩니다. 다만 무언가를 잘 만들었다는 사실만으로 수익을 예상하지는 않습니다.',
    concise: '직접 만든 결과가 누구에게 어떤 가치가 되는지 보일 때 금전 판단이 구체화되기 쉽습니다.',
  },
  {
    id: 'RESOURCE-CAPABILITY-SPEND',
    headline: '배움과 도구에 쓰는 돈은 비교적 납득하기 쉬운 편입니다',
    summary: '새로운 것을 배우거나 도구를 더 갖출지, 지금 가진 것으로 먼저 시도할지 갈림길에 놓인 상황을 떠올려 보십시오. 준비에 쓰는 돈은 활동 범위를 넓힐 수 있지만, 실제 사용 시점이 없으면 준비와 실행이 분리됩니다. 이 항목은 그 둘을 함께 살펴야 하는 구조를 설명하며 실제 지출 습관을 알아맞히는 해석은 아닙니다.',
    concise: '배움·도구처럼 활동 범위를 넓히는 지출을 납득하기 쉽지만 실제 사용 시점을 함께 정하는 편이 좋습니다.',
  },
  {
    id: 'OFFICER-RULED-MANAGEMENT',
    headline: '돈 관리에도 최소한의 기준과 책임 경계가 있는 편이 안정적입니다',
    summary: '매달 반드시 나가는 비용과 그때그때 결정할 비용을 나누면, 새로운 지출이 생겨도 모든 판단을 처음부터 다시 하지 않아도 됩니다. 반대로 규칙을 지나치게 세밀하게 만들면 예외에 대응하기 어려울 수 있습니다. 이 해석에서 중요한 것은 언제나 절약하려는 성향이 아니라 지출의 기준과 재량의 경계를 정하는 방식입니다.',
    concise: '고정비·한도·우선순위처럼 최소한의 기준을 두면 돈을 더 안정적으로 관리하기 쉽습니다.',
  },
  {
    id: 'PEER-AUTONOMY-SPEND',
    headline: '돈을 선택권과 자율성을 확보하는 수단으로 느끼기 쉽습니다',
    summary: '똑같은 비용이라도 어떤 선택은 물건을 얻는 데 그치고, 어떤 선택은 자신의 시간이나 결정권을 넓히는 데 쓰입니다. 이 명식에서 보이는 자기 기준의 관점은 돈이 그런 자율성과 어떻게 연결되는지 살펴보게 합니다. 다만 편의를 위한 지출이 언제나 옳거나, 실제로 그런 지출을 많이 한다는 뜻은 아닙니다.',
    concise: '돈을 자율성과 선택권을 확보하는 수단으로 느끼기 쉬워 편의·독립성에 쓰는 비용을 중요하게 볼 수 있습니다.',
  },
  {
    id: 'OUTPUT-WEALTH-MAKE-TO-VALUE',
    headline: '직접 만든 것을 실제 가치와 연결할 때 돈의 감각이 선명해집니다',
    summary: '무엇인가를 완성하는 것과 누군가 그 결과에 가치를 부여하는 것은 별개의 단계입니다. 혼자 보기에는 만족스러운 작업이라도 상대에게 어떤 문제를 해결해 주는지 설명하기 어렵다면 교환의 기준은 불분명할 수 있습니다. 산출과 재성이 함께 보일 때에는 만드는 과정뿐 아니라 쓰임과 교환의 접점까지 살펴봅니다.',
    concise: '만든 결과를 실제 가치 교환과 연결해 볼 때 돈의 흐름을 이해하기 쉬운 편입니다.',
  },
  {
    id: 'WEALTH-OFFICER-RESULT-TO-BUDGET',
    headline: '들어오고 나가는 돈을 역할별로 나누면 관리가 쉬워집니다',
    summary: '여유자금 전체를 한 덩어리로 생각하면 필요할 때 서로 다른 목적이 충돌할 수 있습니다. 생활을 유지할 몫, 이미 약속한 지출, 새 기회를 위해 남길 몫을 구분하는 예시가 이 구조를 이해하는 데 도움이 됩니다. 재성과 관성을 함께 읽는 이유는 얼마를 가져야 한다는 뜻이 아니라 자원과 책임의 기준을 따로 두지 않기 위해서입니다.',
    concise: '돈의 역할을 나누고 결과와 기준을 함께 확인하면 관리가 안정되기 쉽습니다.',
  },
  {
    id: 'WEALTH-RESOURCE-LEARN-VS-RETURN',
    headline: '더 배우기 위해 쓰는 돈과 지금 결과를 내야 하는 돈 사이에서 흔들릴 수 있습니다',
    summary: '무언가를 한 번 더 배울지, 이미 배운 것으로 결과를 만들어 볼지 고민하는 장면을 떠올려 보십시오. 어느 한 선택만 늘 유리한 것은 아닙니다. 이 명식에서 관찰된 두 관점은 준비에 쓸 자원과 현재 활용할 자원을 동시에 살펴야 한다는 긴장을 보여 줍니다. 실제 수익 여부를 여기서 결정하지는 않습니다.',
    concise: '성장에 쓰는 비용과 지금 결과를 내야 하는 비용이 충돌할 수 있어 실제 사용 시점을 먼저 정하는 편이 도움이 됩니다.',
  },
  {
    id: 'PEER-WEALTH-MY-WAY-VS-BUDGET',
    headline: '내가 원하는 선택과 현실적인 예산이 부딪힐 때 스트레스가 커질 수 있습니다',
    summary: '원하는 방식을 유지하려면 추가 비용이 들고, 예산을 지키려면 일부 선택을 바꿔야 할 때가 있습니다. 이 구조는 자유를 위해 감수할 비용과 현실적으로 조정할 비용을 구분해 생각하게 합니다. 핵심은 욕구를 억누르는 것도 어떤 상황에서도 고집하는 것도 아니라, 자기 기준과 자원 조건이 만나는 지점을 보는 것입니다.',
    concise: '원하는 선택과 예산이 부딪힐 때 지킬 취향과 타협 가능한 비용을 미리 나누는 편이 현실적입니다.',
  },
  {
    id: 'OUTPUT-WEALTH-OFFICER-VALUE-OPERATING-LOOP',
    headline: '만들고, 가치가 생기는지 확인하고, 다시 관리하는 흐름이 잘 맞습니다',
    summary: '만들기, 실제 쓰임 확인, 다음 비용 배분을 따로따로 결정하면 한 단계의 결과가 다른 단계에 반영되지 않을 수 있습니다. 산출·재성·관성이 한 구조에서 확인될 때는 결과물을 만든 뒤 쓰임을 확인하고, 확인한 내용을 다음 관리 기준에 반영하는 흐름을 함께 읽습니다. 이 구조가 특정 사업의 성공을 보장하는 것은 아닙니다.',
    concise: '만들기·가치 확인·재투입을 한 흐름으로 보면 비용과 결과의 판단 기준을 세우기 쉽습니다.',
  },
  {
    id: 'PEER-WEALTH-RESOURCE-CHOICE-GROWTH-TRADEOFF',
    headline: '자유롭게 쓰고 싶은 마음, 성장에 쓰고 싶은 마음, 아껴야 한다는 현실이 동시에 생길 수 있습니다',
    summary: '자신의 선택권을 지키는 비용, 배움을 위해 쓰는 비용, 현재 생활을 유지하는 비용은 모두 필요할 수 있지만 같은 돈을 동시에 쓸 수는 없습니다. 비겁·재성·인성의 관점이 함께 보일 때에는 이 셋의 우선순위를 어떻게 구분할지를 질문합니다. 어느 목적이 반드시 우선인지는 이 명식만으로 정하지 않습니다.',
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
