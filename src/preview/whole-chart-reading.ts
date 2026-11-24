import type { CanonicalSajuSnapshot, PillarSlot } from '../contracts/calculation.js';
import {
  WHOLE_CHART_CLAIM,
  wholeChartClaimValue,
  wholeChartRuleEvidence,
} from '../interpretation/whole-chart-claims.js';
import {
  requireWholeChartJudgment,
  type InterpretationExecutionResult,
} from '../interpretation/interpretation-engine.js';
import type { ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  judgeWholeChart,
  TEN_GOD_FAMILY,
  type ChartContact,
  type JudgmentEvidence,
  type ObservedWholeChart,
  type TenGodFamily,
  type WholeChartJudgment,
} from '../interpretation/whole-chart-judgment.js';
import { buildGovernedReadingEvidenceBundle } from '../narrative/evidence-selector.js';
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
const CONTACT_CONTEXT: Record<WholeChartNatalDomain, [string, string]> = {
  career: [
    '일하는 환경과 연결해 보는 월지',
    '협력할 조건과 업무 방식을 조정할 조건을 함께 살핍니다.',
  ],
  business: [
    '운영 환경과 연결해 보는 월지',
    '거래와 협업 조건이 바뀔 때 누가 결정하고 책임지는지 살핍니다.',
  ],
  wealth: ['자원 흐름과 연결해 보는 월지', '기존 수입이나 지출 조건 가운데 조정할 몫을 살핍니다.'],
  relationship: [
    '배우자궁의 위치인 일지',
    '가까워지는 조건과 함께 생활하면서 다시 조율할 몫을 구분해 살핍니다.',
  ],
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
  independent_support_with_contested_roots:
    '관계가 겹친 뿌리의 작용은 보류하되, 다른 자리에서 독립적으로 확인되는 뒷받침을 고려합니다.',
  support_and_pressure:
    '남아 있는 뿌리와 뿌리 있는 극·설이 함께 작용할 수 있어 한 방향으로 단정하기 어렵습니다.',
  season_and_grounded_pressure:
    '계절의 지원이 적고 뿌리 있는 극·설이 확인됩니다. 부담을 감당할 별도 지원이 있는지 점검합니다.',
  unresolved: '시각이나 뿌리 근거가 확정되지 않아 일간의 전체 강약을 보류합니다.',
};

export interface WholeChartNatalReading {
  judgmentId?: string;
  grounding?: { claimId: string; evidenceBundleHash: string };
  state: string;
  semanticKey: readonly string[];
  paragraphs: readonly string[];
  evidence: readonly JudgmentEvidence[];
  wealthBasis?: {
    observation: ObservedWholeChart['themes']['wealth']['state'];
    indirectPath?: NonNullable<
      ObservedWholeChart['themes']['wealth']['indirectEvidence']
    >['relation'];
  };
}

export function buildSelectedWholeChartNatalReading(
  snapshot: CanonicalSajuSnapshot,
  domain: WholeChartNatalDomain,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
): WholeChartNatalReading {
  const { chart, ...grounding } = selectWholeChartJudgment(snapshot, execution, registry);
  return {
    ...buildWholeChartNatalReading(snapshot, domain, execution.run.startedAt, chart),
    grounding,
  };
}

export function selectWholeChartJudgment(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
) {
  const chart = requireWholeChartJudgment(snapshot, execution);
  const claimIds = execution.claims
    .filter(({ state, claimType }) => state === 'active' && claimType === WHOLE_CHART_CLAIM)
    .map(({ claimId }) => claimId);
  if (claimIds.length !== 1) throw new TypeError('A single whole-chart claim is required.');
  const selected = buildGovernedReadingEvidenceBundle(snapshot, execution, registry, {
    requestId: execution.run.requestId,
    purpose: 'section_reading',
    targetClaimIds: claimIds,
  });
  const claim = selected.bundle.claims.find(({ claimType }) => claimType === WHOLE_CHART_CLAIM);
  const expected = wholeChartRuleEvidence(snapshot, chart).envelope.envelopeId;
  if (
    claim?.value !== wholeChartClaimValue(chart) ||
    !claim.researchEvidenceRefs?.includes(expected)
  ) {
    throw new TypeError('Whole-chart claim does not match the selected calculation judgment.');
  }
  return {
    chart,
    claimId: claim.claimId,
    evidenceBundleHash: selected.evidenceBundleHash,
  };
}

const TIMING_SCOPE = { dayun: '대운', annual: '세운', monthly: '월운' } as const;
const TOPIC_COPY = {
  career: ['직업', '업무 일정과 역할 배분'],
  business: ['사업', '운영 순서와 책임 분담'],
  wealth: ['재물', '교환 조건과 지출에 쓸 몫'],
  relationship: ['관계', '약속과 생활의 경계'],
} as const;

function describeTopic(topic: WholeChartPeriods['windows'][number]['topics'][number]) {
  const [label, focus] = TOPIC_COPY[topic.area];
  const reasons = [
    ...new Set(
      topic.evidence.map(({ basis, layer }) => {
        const detail =
          basis.kind === 'contact'
            ? `${basis.slot === 'day' ? '일지' : '월지'} ${basis.relation === 'clash' ? '충' : '합'}`
            : basis.kind === 'background_clash'
              ? `${TIMING_SCOPE[basis.background]} 지지와의 충`
              : basis.god;
        return `${TIMING_SCOPE[layer]}의 ${detail}`;
      }),
    ),
  ];
  const action = {
    competing: '이어갈 부분과 조율할 부분으로 나눠 봅니다.',
    pressure: '조정할 조건이 무엇인지 먼저 봅니다.',
    support: '이어갈 여지가 있는지 봅니다.',
  }[topic.direction];
  return `${label}에서는 ${reasons.join('·')}에 따라 ${focus}을 ${action}`;
}

function describeIncomingWealth(window: WholeChartPeriods['windows'][number]) {
  if (window.direction === 'held') return '';
  const arriving = window.layers.filter(({ introducesWealth }) => introducesWealth);
  if (!arriving.length) return '';
  const origins = arriving.map(({ kind, god }) => `${TIMING_SCOPE[kind]}의 ${god}`);
  return `원국에서 잠재해 있던 거래와 대가의 주제는 ${origins.join('·')} 작용이 드러나는 구간에서 구체적으로 살핍니다.`;
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
  const revealedRoles = window.layers.flatMap(({ kind, hiddenMonthRole }) =>
    hiddenMonthRole
      ? [
          `${TIMING_SCOPE[kind]} 천간의 ${hiddenMonthRole.stem}에서 원국 월지에 숨어 있던 ${hiddenMonthRole.god} 작용이 드러납니다.`,
        ]
      : [],
  );
  const competingBackground = window.layerRelations
    .filter(({ effect }) => effect === 'support_under_review')
    .map(
      ({ background, current, branches }) =>
        `${TIMING_SCOPE[background]}의 지지(${branches[0]})와 ${TIMING_SCOPE[current]}의 지지(${branches[1]})가 충을 이루어, 앞선 운의 지원이 이어지는지는 보류합니다.`,
    );
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
          contests_background_support: '월운에서 배경 운의 지원을 흔드는 근거가 새로 나타납니다.',
          reveals_month_role: '월운은 원국 월지에 모여 있던 역할이 드러나는 조건을 더합니다.',
          limited_change: '이번 월운이 연운과 대운의 작용을 추가로 바꾼다는 근거는 제한됩니다.',
        }[window.monthlyShift];
  const topics = window.topics.map(describeTopic);
  return [
    focus
      ? `${monthly ? '이 구간의 월운' : '입춘 기준 세운'}은 ${focus.pillar.stem}${focus.pillar.branch}입니다.`
      : '',
    title,
    specificMonth,
    ...(window.direction === 'held' ? [] : [...competingBackground, ...revealedRoles]),
    ...topics,
    describeIncomingWealth(window),
    activities.size ? `지지 충이 닿는 자리에서 ${[...activities].join('과 ')}을 점검합니다.` : '',
    signals.length ? `원국 판단과 연결되는 천간은 ${signals.join(', ')}입니다.` : '',
    regulation ? `${regulation}은 또한 일간을 조절하는 데 검토할 작용입니다.` : '',
  ]
    .filter(Boolean)
    .join(' ');
}

const RELATION_LABEL: Record<string, string> = {
  combination: '육합',
  clash: '충',
  punishment: '형',
  harm: '해',
  break: '파',
  meeting: '삼합',
  stem_combination: '천간 오합',
};

function describeMonthStemObservations(pattern: ObservedWholeChart['pattern']) {
  if (pattern.monthStemObservations.length < 2) return '';
  const describePositions = (items: readonly { slot: PillarSlot; god: string }[]) =>
    [...new Set(items.map(({ slot, god }) => `${SLOT[slot]} ${god}`))].join('·');
  const observations = pattern.monthStemObservations.map(
    ({
      position,
      exposure,
      visibleMatches,
      supportContext,
      challenges,
      remedyCandidates,
      stemCombinationContacts,
    }) => {
      const exposureText =
        exposure === 'visible'
          ? `동일 글자 천간 관측(${visibleMatches.map(({ slot }) => SLOT[slot]).join('·')})`
          : '월지 지장간 구성만 관측';
      const roots = supportContext.witnesses.map(({ position: witness, roots, independentRoots }) => {
        const rootSlots = independentRoots.length
          ? independentRoots.map(({ slot }) => slot)
          : roots.map(({ slot }) => slot);
        const rootText = independentRoots.length
          ? `독립 통근 ${[...new Set(rootSlots.map((slot) => SLOT[slot]))].join('·')}`
          : roots.length
            ? `뿌리 접점 검토 ${[...new Set(rootSlots.map((slot) => SLOT[slot]))].join('·')}`
            : '동일 글자 뿌리 미확인';
        return `${SLOT[witness.slot]} ${witness.god}(${rootText})`;
      });
      const supportParts = [
        supportContext.active.length ? `지원 연결 ${describePositions(supportContext.active)}` : '',
        roots.length ? `지원 근거 ${roots.join(' / ')}` : '',
        supportContext.concealed.length
          ? `지장간 지원 후보 ${describePositions(supportContext.concealed)}`
          : '',
      ].filter(Boolean);
      const supportText = supportParts.length ? supportParts.join(', ') : '지원 연결 근거 미확인';
      const challengeText = challenges.length
        ? `제약 후보 ${describePositions(challenges)}`
        : '직접 제약 후보 미확인';
      const remedyText = remedyCandidates.length
        ? `구응 후보 ${describePositions(remedyCandidates)}`
        : '';
      const combinations = stemCombinationContacts.map(
        ({ slots }) => `천간 오합 접점(${slots.map((slot) => SLOT[slot]).join('·')})`,
      );
      return `${position.stem}·${position.god}(${exposureText}; ${supportText}; ${challengeText}${remedyText ? `; ${remedyText}` : ''}${combinations.length ? `; ${combinations.join('·')}` : ''})`;
    },
  );
  const contacts = pattern.monthContacts.map(
    ({ kind, slots }) =>
      `${RELATION_LABEL[kind] ?? kind}(${slots.map((slot) => SLOT[slot]).join('·')})`,
  );
  const contactText = contacts.length
    ? `월지에 닿는 구조 접점은 ${contacts.join(' / ')}입니다.`
    : '현재 계산에서 확인된 월지 구조 접점은 없습니다.';
  return `월지 지장간 구성 요소를 각각 관측했습니다: ${observations.join(' / ')}. ${contactText} 각 신호의 지원·제약·통근은 관측 근거로만 기록하며, 격국 후보의 정체·순위·강도·성립이나 복수 격국의 공존, 합화 및 구응 효과를 확정하지 않습니다.`;
}

function describeCompetingMonthPerspectives(
  domain: WholeChartNatalDomain,
  pattern: ObservedWholeChart['pattern'],
) {
  const perspectives = new Map<TenGodFamily, string[]>();
  for (const { position } of pattern.monthStemObservations) {
    const family = TEN_GOD_FAMILY[position.god];
    const gods = perspectives.get(family) ?? [];
    if (!gods.includes(position.god)) gods.push(position.god);
    perspectives.set(family, gods);
  }
  const details = [...perspectives.entries()].map(
    ([family, gods]) =>
      `${gods.join('·')}(${FAMILY[family]}) 관점에서는 ${DOMAIN[domain][family]}`,
  );
  return `월령에서 복수의 십신 작용이 관측되어 하나를 대표로 선택하지 않습니다. ${details.join(' ')}`;
}

function describePatternRoles({ pattern, roles }: ObservedWholeChart) {
  if (pattern.state === 'competing_month_signals' && pattern.monthStemObservations.length > 1) {
    return describeMonthStemObservations(pattern);
  }
  if (roles.status === 'competing_methods') {
    return '월령의 구조를 받치는 작용과 일간의 균형에 필요한 방향이 엇갈려, 한 가지 유리한 역할을 확정하는 판단은 보류합니다.';
  }
  if (pattern.state === 'locally_protected' && pattern.officerRepair.state === 'local_protection') {
    const safeguards = pattern.officerRepair.remedies.map(
      ({ slot, god }) => `${SLOT[slot]}의 ${god}`,
    );
    return `상관이 정관을 제약할 수 있습니다. ${safeguards.join('·')} 작용이 이 부담을 조절할 근거가 됩니다.`;
  }
  if (roles.xi.length) {
    const effective = new Set(roles.xi.map(({ slot, god }) => `${SLOT[slot]}의 ${god}`));
    return `이 구조는 ${[...effective].join(', ')} 작용이 뒷받침합니다.`;
  }
  switch (pattern.officerRepair.state) {
    case 'competing_wealth':
      return '상관의 부담을 덜어 줄 인성이 드러났고 그 인성을 제약할 재성도 함께 있어, 정관을 보호하는 효과는 보류합니다.';
    case 'grounding_or_combination_unsettled':
      return '드러난 인성이 상관을 조절할 수 있으나 통근이나 천간합을 함께 검토해야 하므로 효과를 보류합니다.';
  }
  if (pattern.remedies.length) {
    return `${pattern.challenges.map(({ god }) => god).join('·')}의 부담과 ${pattern.remedies.map(({ god }) => god).join('·')}의 구응 가능성이 공존합니다.`;
  }
  return pattern.challenges.length
    ? `중심 작용을 제약할 수 있는 요소는 ${pattern.challenges.map(({ god }) => god).join('·')}입니다.`
    : '';
}

function describeSupportPositions({ pattern }: ObservedWholeChart) {
  const { supportContext } = pattern;
  const rooted = supportContext.witnesses.filter(
    ({ state }) => state === 'exposed_with_independent_root',
  );
  if (rooted.length) {
    const links = rooted.map(({ position, independentRoots }) => {
      const places = [...new Set(independentRoots.map(({ slot }) => SLOT[slot]))].join('·');
      return `${SLOT[position.slot]}의 ${position.god} 작용에는 ${places} 지장간의 뿌리가 있습니다.`;
    });
    return links.join(' ');
  }
  if (supportContext.witnesses.length) {
    if (supportContext.needsRoot) {
      return '산출물을 자원으로 연결할 재성이 천간에 드러났습니다. 같은 재성의 독립적인 지장간 뿌리를 확인하지 못해 연결의 지속성은 보류합니다.';
    }
    if (
      supportContext.witnesses.some(
        ({ state }) => state === 'root_under_review' || state === 'combination_review',
      )
    ) {
      return '천간에 드러난 지원 단서에 합이나 뿌리의 접촉이 같이 걸려, 그 지원이 실제로 얼마나 작용하는지는 보류합니다.';
    }
  }
  if (supportContext.concealed.length) {
    const names = new Set(
      supportContext.concealed.map(({ slot, god }) => `${SLOT[slot]}의 ${god}`),
    );
    return `${[...names].join('·')} 작용은 지장간에 있습니다. 이 역할이 밖으로 드러날 조건이 생기면 중심 구조를 뒷받침할 수 있습니다.`;
  }
  return '';
}

function describeIndirectWealth(chart: ObservedWholeChart) {
  const evidence = chart.themes.wealth.indirectEvidence;
  if (!evidence) return '';
  const describe = (witnesses: typeof evidence.production) =>
    [
      ...new Set(
        witnesses.map(
          ({ slot, god, location }) =>
            `${SLOT[slot]}${location === 'hidden' ? ' 지장간' : ''}의 ${god}`,
        ),
      ),
    ].join('·');
  const production = describe(evidence.production);
  const resources = describe(evidence.resources);
  const basis = {
    production_and_resources: `${production} 작용은 반복해 만들 결과물을, ${resources} 작용은 이를 계속 만들기 위해 남겨 둘 시간·도구·협력 조건을 읽는 근거입니다.`,
    production: `${production} 작용에서 반복해 만들 수 있는 결과물의 종류와 산출 조건을 봅니다.`,
    resources: `${resources} 작용에서 계속 활용할 수 있는 기존 자원과 이를 유지하는 조건을 봅니다.`,
    no_independent_path:
      '원국에서 산출이나 자원 유지의 연결을 뒷받침하는 독립적인 근거도 확인하기 어렵습니다.',
  }[evidence.relation];
  return `확정된 원국의 천간·지지·지장간에서 재성은 관측되지 않습니다. ${basis} 거래 조건과 대가는 재성 근거가 드러나는 시기에 따로 살핍니다.`;
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
  const competingMonthSignals =
    pattern.state === 'competing_month_signals' && pattern.monthStemObservations.length > 1;
  const family = TEN_GOD_FAMILY[pattern.anchor?.god ?? chart.month.god];
  const paragraph = competingMonthSignals
    ? describeCompetingMonthPerspectives(domain, pattern)
    : DOMAIN[domain][family];
  const semanticFamily = competingMonthSignals
    ? `competing_month_signals:${[...new Set(pattern.monthStemObservations.map(({ position }) => TEN_GOD_FAMILY[position.god]))].sort().join('|')}`
    : family;
  const monthStemText = describeMonthStemObservations(pattern);
  const observations = pattern.monthStemObservations.length > 1
    ? monthStemText
    : pattern.anchor
      ? pattern.selectionMode === 'exposed_secondary_month_role'
        ? `${chart.month.branch}월의 대표 작용은 ${chart.month.god}입니다. 지장간에서 밖으로 드러난 ${pattern.anchor.god} 작용을 중심 후보로 삼았습니다.`
        : `${chart.month.branch}월의 지장간에서 살핀 중심 후보는 ${pattern.anchor.god}입니다.`
      : `${chart.month.branch}월은 ${FAMILY[family]}의 단서를 줍니다. ${chart.allResolved ? '월령 후보 사이의 우선순위는 보류합니다.' : '확정된 기둥을 기준으로 부분적으로 읽습니다.'}`;
  const roleText = pattern.monthStemObservations.length > 1 ? '' : describePatternRoles(chart);
  const supportText = pattern.monthStemObservations.length > 1 ? '' : describeSupportPositions(chart);
  const focusContacts =
    domain === 'relationship'
      ? chart.themes.relationship.dayBranchContacts
      : chart.contacts.filter((item) => item.slots.includes('month'));
  const contacts = [...new Set(focusContacts.map((item) => CONTACT[item.kind]))];
  const contactText = contacts.length
    ? `${CONTACT_CONTEXT[domain][0]}에는 ${contacts.join('·')} 접점이 있습니다. ${CONTACT_CONTEXT[domain][1]}`
    : '';
  const spouse = chart.themes.relationship;
  const storage = chart.themes.wealth;
  const topical =
    domain === 'relationship' && spouse.spouseWitnesses.length
      ? `전통 배우자성의 단서는 ${[...new Set(spouse.spouseWitnesses.map((item) => SLOT[item.slot] + '의 ' + item.god))].join(', ')}입니다. ${spouse.dayBranchContacts.length ? '일지에 닿는 관계와 함께 약속의 방식과 조율의 조건을 봅니다.' : '가까운 관계에서 역할을 이해하는 단서로 읽습니다.'}`
      : domain === 'wealth' && storage.wealthInStorage.length
        ? `${[...new Set(storage.wealthInStorage.map((item) => SLOT[item.slot] + ' 지장간의 ' + item.god))].join(', ')}에서 재성의 저장 단서를 확인했습니다. ${storage.storageContacts.length ? '접촉 조건도 걸려 있어 유지와 소모를 함께 살핍니다.' : '꾸준히 남길 자원의 조건을 살핍니다.'}`
        : domain === 'wealth'
          ? describeIndirectWealth(chart)
          : '';
  const topicEvidence =
    domain === 'relationship' && spouse.spouseWitnesses.length
      ? [spouse.evidence]
      : domain === 'wealth' && (storage.wealthInStorage.length || storage.indirectEvidence)
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
  const periodTopic = period?.topics.find(({ area }) => area === domain);
  return {
    judgmentId: chart.judgmentId,
    state: chart.pattern.state,
    ...(domain === 'wealth'
      ? {
          wealthBasis: {
            observation: storage.state,
            ...(storage.indirectEvidence
              ? { indirectPath: storage.indirectEvidence.relation }
              : {}),
          },
        }
      : {}),
    semanticKey: [
      semanticFamily,
      strength.state,
      pattern.state,
      pattern.selectionMode,
      pattern.officerRepair.state,
      roles.status,
      ...pattern.supportContext.witnesses.map(({ state }) => state),
      ...pattern.monthStemObservations.map(
        ({
          position,
          exposure,
          visibleMatches,
          supportContext,
          challenges,
          remedyCandidates,
          stemCombinationContacts,
          monthContacts,
        }) => {
          const positionsKey = (items: readonly { slot: PillarSlot; god: string }[]) =>
            items.map(({ slot, god }) => `${slot}.${god}`).sort().join(',');
          const witnessKey = supportContext.witnesses
            .map(({ position: witness, state, roots, independentRoots }) =>
              `${witness.slot}.${witness.god}.${state}.roots=${positionsKey(roots)}.independent=${positionsKey(independentRoots)}`,
            )
            .sort()
            .join(';');
          const stemContactKey = stemCombinationContacts
            .map(({ slots }) => [...slots].sort().join(','))
            .sort()
            .join(';');
          const monthContactKey = monthContacts
            .map(({ kind, slots }) => `${kind}.${[...slots].sort().join(',')}`)
            .sort()
            .join(';');
          return `month_component:${position.stem}:${position.god}:${exposure}:visible=${visibleMatches.map(({ slot }) => slot).sort().join(',')}:active=${positionsKey(supportContext.active)}:witness=${witnessKey}:concealed=${positionsKey(supportContext.concealed)}:challenge=${positionsKey(challenges)}:remedy=${positionsKey(remedyCandidates)}:stem=${stemContactKey}:month=${monthContactKey}`;
        },
      ),
      ...(pattern.supportContext.concealed.length ? ['concealed_support'] : []),
      ...contacts,
      ...(topical ? ['present_topic_witness'] : []),
      ...(domain === 'wealth' && storage.indirectEvidence
        ? [storage.indirectEvidence.relation]
        : []),
      period?.direction ?? 'no_period',
      periodTopic?.direction ?? 'no_direct_topic',
      ...(domain === 'wealth' && period?.direction !== 'held'
        ? (period?.layers
            .filter(({ introducesWealth }) => introducesWealth)
            .map(({ kind, god }) => `${kind}:${god}`) ?? [])
        : []),
    ],
    paragraphs: [
      `${observations} ${paragraph} ${STRENGTH[strength.state]}`,
      [roleText, contactText].filter(Boolean).join(' '),
      supportText,
      topical,
      ...(periodTopic ? [describeTopic(periodTopic)] : []),
      ...(domain === 'wealth' && period ? [describeIncomingWealth(period)] : []),
    ].filter(Boolean),
    evidence: [
      pattern.selection,
      pattern.evidence,
      pattern.supportContext.evidence,
      ...pattern.monthStemObservations.map(({ evidence }) => evidence),
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
      paths: [
        ...new Set([
          ...periods.paths,
          ...window.layers.flatMap(({ hiddenMonthRole }) => hiddenMonthRole?.paths ?? []),
        ]),
      ],
      sources: [
        ...new Set([
          ...window.layerRelations.flatMap(({ sources }) => sources),
          ...window.layers.flatMap(({ hiddenMonthRole }) =>
            hiddenMonthRole ? [hiddenMonthRole.source] : [],
          ),
        ]),
      ],
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
