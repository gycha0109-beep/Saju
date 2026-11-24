import type { CanonicalSajuSnapshot, PillarSlot } from '../contracts/calculation.js';
import {
  judgeWholeChart,
  TEN_GOD_FAMILY,
  type ChartContact,
  type JudgmentEvidence,
  type ObservedWholeChart,
  type TenGodFamily,
  type WholeChartJudgment,
} from '../interpretation/whole-chart-judgment.js';
import { judgeWholeChartPeriods, type WholeChartPeriods } from '../reading/whole-chart-periods.js';

export type WholeChartNatalDomain = 'career' | 'business' | 'wealth' | 'relationship';
const SLOT: Record<PillarSlot, string> = { year: '연주', month: '월주', day: '일주', hour: '시주' };
const CONTACT: Record<ChartContact['kind'], string> = {
  combination: '육합',
  clash: '육충',
  punishment: '형',
  harm: '해',
  break: '파',
  meeting: '삼합 후보',
  stem_combination: '천간합',
};
const FAMILY: Record<TenGodFamily, string> = {
  peer: '자율성과 협력',
  output: '산출과 표현',
  wealth: '교환과 자원',
  officer: '책임과 규범',
  resource: '학습과 지원',
};
const DOMAIN: Record<WholeChartNatalDomain, Record<TenGodFamily, string>> = {
  career: {
    peer: '재량권이 필요한 일은 맡을 몫과 공동 결정을 나눠 보는 것이 핵심입니다.',
    output: '결과물을 직접 만들고 검토받는 역할에서 일의 방식과 산출 기준을 함께 살핍니다.',
    wealth: '성과를 실제 자원으로 연결하는 역할에서 교환 기준과 결과 책임을 함께 봅니다.',
    officer: '위임받은 권한과 평가 기준이 분명한 역할에서 책임을 맡는 방식을 봅니다.',
    resource: '자료·경험을 익혀 절차와 판단 기준으로 정리하는 일이 중심 주제가 됩니다.',
  },
  business: {
    peer: '동업과 경쟁을 함께 보며, 초기 의사결정권과 자원 배분 기준을 살핍니다.',
    output: '반복해 만들 수 있는 제안과 그 제안을 실제 운영 자원으로 연결할 조건을 봅니다.',
    wealth: '판매 조건과 운영에 남겨 둘 자원을 함께 조정하는 방식이 중심입니다.',
    officer: '거래를 늘릴 때 이행 책임과 품질 관리가 따라갈 수 있는지 살핍니다.',
    resource: '준비와 검토가 실제 실행을 받쳐 주는 지점과 의사결정 시점을 함께 봅니다.',
  },
  wealth: {
    peer: '개인 자원과 공동 자원을 섞어 쓸 때 배분 기준을 어떻게 세우는지가 중요합니다.',
    output:
      '어떤 산출을 반복해 만들 수 있는지와, 이를 실제 자원으로 연결할 거래 조건을 따로 봅니다.',
    wealth: '교환으로 들어오는 자원과 반복 지출, 남겨 둘 몫을 함께 살핍니다.',
    officer: '정기적으로 부담해야 하는 책임이 들어오는 자원을 얼마나 사용하는지 살핍니다.',
    resource: '현재 쓸 자원과 장기적으로 일을 지탱할 준비에 남길 자원의 관계를 봅니다.',
  },
  relationship: {
    peer: '가까운 사이에서 각자가 정할 일과 공동으로 결정할 일의 경계를 봅니다.',
    output: '친밀감을 표현하는 방식과 상대가 받아들이는 속도를 맞추는 일이 중심입니다.',
    wealth: '관계를 이어 가며 시간과 수고를 어떻게 주고받는지 살핍니다.',
    officer: '약속의 책임과 관계의 역할을 서로 같은 뜻으로 이해하는지 살핍니다.',
    resource: '안심하고 의지할 조건과 서로에게 필요한 거리를 함께 봅니다.',
  },
};
const STRENGTH: Record<ObservedWholeChart['strength']['state'], string> = {
  season_and_roots_support:
    '계절과 충돌이 관측되지 않은 통근 단서가 함께 일간을 받쳐 주어, 먼저 어떤 힘을 어떻게 쓰는지 살핍니다.',
  roots_offset_season:
    '계절만 보면 지원이 적지만, 다른 기둥의 뿌리가 남아 감당할 여지를 함께 봅니다.',
  grounded_visible_support:
    '일간 자체의 통근과 구별되는 투간된 생조 근거가 있어, 계절이 주는 부담을 보완할 여지를 함께 살핍니다.',
  season_support_only:
    '계절의 지원은 확인됩니다. 뿌리의 뒷받침까지 확정하기에는 근거가 부족합니다.',
  contested_roots:
    '뿌리가 있는 자리에 다른 지지 관계도 걸려, 그 뿌리의 실제 지원 정도를 보류합니다.',
  support_and_pressure:
    '남아 있는 뿌리와 뿌리 있는 극·설이 함께 작용할 수 있어 한 방향으로 단정하기 어렵습니다.',
  season_and_grounded_pressure:
    '계절의 지원이 적고 뿌리 있는 극·설이 확인됩니다. 부담을 감당할 별도 지원이 있는지 점검합니다.',
  unresolved: '시각이나 뿌리 근거가 확정되지 않아 일간의 전체 강약을 보류합니다.',
};

export interface WholeChartNatalReading {
  judgmentId?: string;
  state: string;
  semanticKey: readonly string[];
  paragraphs: readonly string[];
  evidence: readonly JudgmentEvidence[];
}

function describeWindow(window: WholeChartPeriods['windows'][number], monthly: boolean) {
  const focus = monthly
    ? window.layers.find((item) => item.kind === 'monthly')
    : window.layers.find((item) => item.kind === 'annual');
  const pressure = window.layers.flatMap((item) =>
    item.contacts.filter((contact) => contact.relation === 'clash'),
  );
  const activities = new Set(
    pressure.map(({ slot }) =>
      slot === 'day'
        ? '가까운 관계의 약속'
        : slot === 'month'
          ? '업무 환경과 일정'
          : '기존 자원이나 계획',
    ),
  );
  const signals = window.layers
    .filter(({ roleImpact }) => roleImpact !== 'unsettled')
    .map(
      ({ kind, god }) =>
        `${kind === 'annual' ? '세운' : kind === 'monthly' ? '월운' : '대운'}의 ${god}`,
    );
  const regulation = window.layers
    .filter((layer) => layer.regulation)
    .map((layer) => layer.god)
    .join('·');
  const title = {
    held: '대운 또는 원국 근거가 더 필요합니다.',
    competing:
      '원국의 지원과 부담이 함께 반복됩니다. 지원이 닿는 자리와 조정할 자리를 함께 살핍니다.',
    pressure: '원국의 부담이 되풀이되는 구간입니다. 이미 감당 중인 책임부터 살핍니다.',
    reinforced:
      '원국에서 구조를 받쳐 주던 역할이 되풀이됩니다. 해당 역할을 활용할 조건이 이어지는지 봅니다.',
    no_settled_change:
      '이 구간에는 원국의 확정 역할을 강화하거나 손상한다고 판정할 만한 접점이 부족합니다.',
  }[window.direction];
  const specificMonth =
    window.direction === 'held' || !window.monthlyShift
      ? ''
      : {
          requires_adjustment: '이번 절입 구간의 월운이 직접 닿는 일정이나 약속부터 조정해 봅니다.',
          reinforces_natal_role:
            '월운이 원국의 보조 역할을 더합니다. 이번 절입 구간에서 활용할 여지를 봅니다.',
          adds_coordination: '월운에서 새로 확인되는 합의 자리에서 상대와 맞춰 갈 조건을 살핍니다.',
          limited_change: '이번 월운이 연운과 대운의 작용을 추가로 바꾼다는 근거는 제한됩니다.',
        }[window.monthlyShift];
  const topics = window.topics.map(({ area, direction }) => {
    const label = { career: '직업', wealth: '재물', relationship: '관계' }[area];
    const focus = {
      career: '업무 일정과 역할 배분',
      wealth: '교환 조건과 지출에 쓸 몫',
      relationship: '약속과 생활의 경계',
    }[area];
    return `${label}에서는 ${focus}을 ${
      direction === 'competing'
        ? '이어갈 부분과 조율할 부분으로 나눠 봅니다.'
        : direction === 'pressure'
          ? '조정할 조건이 무엇인지 먼저 봅니다.'
          : '이어갈 여지가 있는지 봅니다.'
    }`;
  });
  return [
    focus
      ? `${monthly ? '이 구간의 월운' : '입춘 기준 세운'}은 ${focus.pillar.stem}${focus.pillar.branch}입니다.`
      : '',
    title,
    specificMonth,
    ...topics,
    activities.size ? `지지 충이 닿는 자리에서 ${[...activities].join('과 ')}을 점검합니다.` : '',
    signals.length ? `원국 판단과 연결되는 천간은 ${signals.join(', ')}입니다.` : '',
    regulation ? `${regulation}은 또한 일간을 조절하는 데 검토할 작용입니다.` : '',
  ]
    .filter(Boolean)
    .join(' ');
}

export function buildWholeChartNatalReading(
  snapshot: CanonicalSajuSnapshot,
  domain: WholeChartNatalDomain,
  reference: string,
  chart: WholeChartJudgment = judgeWholeChart(snapshot),
): WholeChartNatalReading {
  if (chart.state === 'unavailable')
    return {
      state: 'unavailable',
      semanticKey: [chart.reason],
      paragraphs: ['일간 또는 월지가 확정되는 범위에서만 원국의 중심을 판단할 수 있습니다.'],
      evidence: [],
    };
  const { strength, pattern, roles } = chart;
  const family = TEN_GOD_FAMILY[pattern.anchor?.god ?? chart.month.god];
  const paragraph = DOMAIN[domain][family];
  const observations = pattern.anchor
    ? `${chart.month.branch}월의 지장간에서 ${pattern.anchor.god}를 중심 후보로 살폈습니다.`
    : `${chart.month.branch}월은 ${FAMILY[family]}의 단서를 줍니다. ${chart.allResolved ? '월령 후보 사이의 우선순위는 보류합니다.' : '확정된 기둥을 기준으로 부분적으로 읽습니다.'}`;
  const roleText =
    roles.status === 'competing_methods'
      ? '월령의 구조를 받치는 작용과 일간의 균형에 필요한 방향이 엇갈려, 한 가지 유리한 역할을 확정하는 판단은 보류합니다.'
      : roles.xi.length
        ? `${[...new Set(roles.xi.map((item) => `${SLOT[item.slot]}의 ${item.god}`))].join(', ')}가 이 구조의 작용을 뒷받침합니다.`
        : pattern.remedies.length
          ? `${pattern.challenges.map((item) => item.god).join('·')}의 부담과 ${pattern.remedies.map((item) => item.god).join('·')}의 구응 가능성이 공존합니다.`
          : pattern.challenges.length
            ? `${pattern.challenges.map((item) => item.god).join('·')}이 중심 작용을 제약할 수 있습니다.`
            : '';
  const focusContacts =
    domain === 'relationship'
      ? chart.themes.relationship.dayBranchContacts
      : chart.contacts.filter((item) => item.slots.includes('month'));
  const contacts = [...new Set(focusContacts.map((item) => CONTACT[item.kind]))];
  const contactText = contacts.length
    ? `${domain === 'relationship' ? '배우자궁의 위치인 일지' : '일하는 환경과 연결해 보는 월지'}에는 ${contacts.join('·')} 접점이 있습니다. ${
        domain === 'relationship'
          ? '가까워지는 조건과 함께 생활하면서 다시 조율할 몫을 구분해 살핍니다.'
          : '협력할 조건과 기존 방식의 조정이 필요한 조건을 함께 살핍니다.'
      }`
    : '';
  const spouse = chart.themes.relationship;
  const storage = chart.themes.wealth;
  const topical =
    domain === 'relationship' && spouse.spouseWitnesses.length
      ? `전통 배우자성의 단서는 ${[...new Set(spouse.spouseWitnesses.map((item) => SLOT[item.slot] + '의 ' + item.god))].join(', ')}입니다. ${spouse.dayBranchContacts.length ? '일지에 닿는 관계와 함께 약속의 방식과 조율의 조건을 봅니다.' : '가까운 관계에서 역할을 이해하는 단서로 읽습니다.'}`
      : domain === 'wealth' && storage.wealthInStorage.length
        ? `${[...new Set(storage.wealthInStorage.map((item) => SLOT[item.slot] + ' 지장간의 ' + item.god))].join(', ')}에서 재성의 저장 단서를 확인했습니다. ${storage.storageContacts.length ? '접촉 조건도 걸려 있어 유지와 소모를 함께 살핍니다.' : '꾸준히 남길 자원의 조건을 살핍니다.'}`
        : '';
  const topicEvidence =
    domain === 'relationship' && spouse.spouseWitnesses.length
      ? [spouse.evidence]
      : domain === 'wealth' && storage.wealthInStorage.length
        ? [storage.evidence]
        : [];
  const date = Date.parse(reference);
  const year = new Date(date + 9 * 3600000).getUTCFullYear();
  const period =
    year >= 1800 && year <= 2300
      ? judgeWholeChartPeriods(snapshot, chart, year).windows.find(
          ({ startsAt, endsAt }) => startsAt <= reference && reference < endsAt,
        )
      : undefined;
  return {
    judgmentId: chart.judgmentId,
    state: chart.pattern.state,
    semanticKey: [
      family,
      strength.state,
      pattern.state,
      roles.status,
      ...contacts,
      ...(topical ? ['present_topic_witness'] : []),
      period?.direction ?? 'no_period',
    ],
    paragraphs: [
      `${observations} ${paragraph} ${STRENGTH[strength.state]}`,
      [roleText, contactText].filter(Boolean).join(' '),
      topical,
      ...(period ? [describeWindow(period, false)] : []),
    ].filter(Boolean),
    evidence: [
      pattern.selection,
      pattern.evidence,
      strength.evidence,
      roles.evidence,
      ...focusContacts.map((item) => item.evidence),
      ...topicEvidence,
    ],
  };
}

export function describeWholeChartPeriods(periods: WholeChartPeriods) {
  return periods.windows.map((window) => ({
    ...window,
    text: describeWindow(window, periods.scope === 'monthly'),
    evidence: {
      rule: periods.rule,
      paths: periods.paths,
      snapshotId: periods.snapshotId,
      calculationHash: periods.calculationHash,
    },
  }));
}

export function currentWholeChartWindow(
  windows: ReturnType<typeof describeWholeChartPeriods>,
  reference: string,
) {
  return windows.find(({ startsAt, endsAt }) => startsAt <= reference && reference < endsAt);
}

export function renderWholeChartPeriods(
  periods: ReturnType<typeof describeWholeChartPeriods>,
  escape: (value: string) => string,
  format: (value: string) => string,
) {
  return periods
    .map(
      ({ startsAt, endsAt, text, evidence }) =>
        '<p><strong>' +
        escape(format(startsAt)) +
        '부터 ' +
        escape(format(endsAt)) +
        ' 전까지</strong> ' +
        escape(text) +
        '</p><details><summary>구간 판단 근거</summary><p>' +
        escape([evidence.rule, ...evidence.paths].join(' · ')) +
        '</p></details>',
    )
    .join('');
}
