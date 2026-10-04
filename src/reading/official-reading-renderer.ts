import type {
  ExplainabilityIndex,
  InsightItemView,
  ReadingDisclosureView,
  ReadingSectionView,
} from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  assertCanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticUnitV1,
} from './canonical-reading-semantics.js';
import {
  assertOfficialReadingPlanV1,
  type OfficialReadingPlanSectionV1,
  type OfficialReadingPlanV1,
  type OfficialReadingSemanticGroup,
  type OfficialReadingSemanticLane,
} from './official-reading-plan.js';

export const OFFICIAL_READING_RENDERER_VERSION =
  'myeonghwa-official-reading-renderer-v1' as const;
export const OFFICIAL_READING_STRUCTURAL_REALIZATION_POLICY_VERSION =
  'myeonghwa-official-reading-structural-realization-policy-v1' as const;
export const OFFICIAL_READING_ORDINARY_MULTI_CLAIM_PRESENTATION_POLICY_VERSION =
  'myeonghwa-official-reading-ordinary-multi-claim-presentation-policy-v1' as const;
export const OFFICIAL_READING_STRUCTURED_INSIGHT_MATERIALIZATION_POLICY_VERSION =
  'myeonghwa-official-reading-structured-insight-materialization-policy-v1' as const;

export interface OfficialReadingRenderedContentV1 {
  rendererVersion: typeof OFFICIAL_READING_RENDERER_VERSION;
  structuralRealizationPolicyVersion:
    typeof OFFICIAL_READING_STRUCTURAL_REALIZATION_POLICY_VERSION;
  ordinaryMultiClaimPresentationPolicyVersion:
    typeof OFFICIAL_READING_ORDINARY_MULTI_CLAIM_PRESENTATION_POLICY_VERSION;
  structuredInsightMaterializationPolicyVersion:
    typeof OFFICIAL_READING_STRUCTURED_INSIGHT_MATERIALIZATION_POLICY_VERSION;
  reportId: string;
  reportHash: string;
  sourceSemanticHash: string;
  sourcePlanHash: string;
  sections: readonly ReadingSectionView[];
  disclosures: readonly ReadingDisclosureView[];
  explainability: ExplainabilityIndex;
}

const SECTION_TITLES: Readonly<
  Record<'general' | 'wealth' | 'default', Partial<Record<OfficialReadingSemanticGroup, string>>>
> = Object.freeze({
  general: Object.freeze({
    core: '핵심 구조',
    interpretation: '주요 해석',
    work: '일·성과',
    wealth: '돈·자원',
    relationship: '관계',
    tension: '구조적 긴장',
    limits: '해석 범위',
  }),
  wealth: Object.freeze({
    core: '재물 구조 핵심',
    interpretation: '주요 해석',
    decision_style: '돈을 쓰는 기준',
    management: '관리 방식',
    wealth: '가치가 만들어지는 방식',
    tension: '충돌·흔들림',
    limits: '해석 범위',
  }),
  default: Object.freeze({
    core: '핵심 구조',
    interpretation: '주요 해석',
    decision_style: '판단 방식',
    management: '관리 방식',
    work: '일·성과',
    wealth: '돈·자원',
    relationship: '관계',
    tension: '구조적 긴장',
    limits: '해석 범위',
  }),
});

const LANE_TITLES: Readonly<Record<OfficialReadingSemanticLane, string>> =
  Object.freeze({
    'career.driver': '일의 동력',
    'career.fit': '맞는 역할·조건',
    'career.environment': '업무 환경',
    'career.friction': '일의 마찰',
    'relationship.closeness': '가까워지는 방식',
    'relationship.expression': '표현과 소통',
    'relationship.values': '관계에서 중요하게 보는 기준',
    'relationship.boundary': '경계와 책임',
    'relationship.friction': '관계의 마찰',
    'business.decision_execution': '판단과 실행',
    'business.uncertainty': '불확실성 다루기',
    'business.allocation': '자원 배분',
    'business.accountability': '책임과 기준',
    'business.partnership': '파트너십',
    'business.pressure': '운영 압박',
    'business.friction': '사업상의 마찰',
  });

const LIMIT_LABELS: Readonly<Record<string, string>> = Object.freeze({
  netWorthAuthorized: '현재 재산 규모',
  investmentReturnAuthorized: '투자 수익률',
  windfallAuthorized: '횡재·일확천금',
  financialAdviceAuthorized: '투자·재무 조언',
  futureMoneyTimingAuthorized: '미래 금전 시기',
  futureTimingAuthorized: '미래 사건 시기',
  numericScoringAuthorized: '수치 점수·등급',
  classificationAuthorized: '명식 전체 강약 분류',
  fortunePolarityAuthorized: '길흉·유불리 판정',
  upstreamEvidenceDirectionAsFortuneMeaningAuthorized:
    '근거 방향을 길흉 의미로 확장하는 해석',
  monthBranchExclusiveAuthority: '월지만으로 명식 전체를 단독 판정하는 것',
  universalRootOrdering: '모든 뿌리에 적용되는 보편 순위',
  numericMonthBranchMultiplier: '월지의 수치 가중치',
  strengthClassifier: '신강·신약 등 전체 강약 판정',
});

function titleFor(
  domain: CanonicalReadingSemanticBundleV1['intent']['domain'],
  group: OfficialReadingSemanticGroup,
  lane: OfficialReadingSemanticLane | undefined,
): string {
  if (lane !== undefined) return LANE_TITLES[lane];
  const domainTitles =
    domain === 'general'
      ? SECTION_TITLES.general
      : domain === 'wealth'
        ? SECTION_TITLES.wealth
        : SECTION_TITLES.default;
  return domainTitles[group] ?? SECTION_TITLES.default[group] ?? '주요 해석';
}

function sectionTypeFor(group: OfficialReadingSemanticGroup): ReadingSectionView['sectionType'] {
  switch (group) {
    case 'core':
      return 'overview';
    case 'work':
      return 'career';
    case 'wealth':
    case 'decision_style':
    case 'management':
      return 'wealth';
    case 'relationship':
      return 'relationship';
    case 'tension':
    case 'interpretation':
    case 'evidence':
    case 'limits':
      return 'structure';
  }
}

function unitMap(
  bundle: CanonicalReadingSemanticBundleV1,
): ReadonlyMap<string, CanonicalReadingSemanticUnitV1> {
  return new Map(bundle.units.map((unit) => [unit.unitId, unit]));
}

function unitsForRefs(
  refs: readonly string[],
  index: ReadonlyMap<string, CanonicalReadingSemanticUnitV1>,
): readonly CanonicalReadingSemanticUnitV1[] {
  return refs.map((ref) => {
    const unit = index.get(ref);
    if (unit === undefined) {
      throw new TypeError(`Official Reading renderer received unknown canonical unit ref: ${ref}`);
    }
    return unit;
  });
}

function explainabilityEntry(
  section: OfficialReadingPlanSectionV1,
  primaryUnits: readonly CanonicalReadingSemanticUnitV1[],
  supportingUnits: readonly CanonicalReadingSemanticUnitV1[],
): ExplainabilityIndex['entries'][number] {
  const units = [...primaryUnits, ...supportingUnits];
  const claimIds = [...new Set(units.map((unit) => unit.claimId))].sort();
  const factRefs = [...new Set(units.flatMap((unit) => unit.factRefs))].sort();
  const methodologyIds = [
    ...new Set(units.map((unit) => `${unit.methodologyRef.id}@${unit.methodologyRef.version}`)),
  ].sort();
  const sourceIds = [...new Set(units.flatMap((unit) => unit.sourceRefs))].sort();
  const explainabilityRef = `explain_official_${deterministicContentHash({
    sectionId: section.sectionId,
    claimIds,
    factRefs,
    methodologyIds,
    sourceIds,
  }).slice(0, 16)}`;
  return {
    explainabilityRef,
    claimIds,
    factRefs,
    methodologyIds,
    sourceIds,
  };
}

function qualifierTextsFor(
  unit: CanonicalReadingSemanticUnitV1,
): readonly string[] {
  return [
    ...new Set(
      (unit.semanticQualifiers ?? [])
        .map(
          (qualifier) =>
            qualifier.canonicalText?.summary?.trim() ??
            qualifier.canonicalText?.headline?.trim(),
        )
        .filter((text): text is string => text !== undefined && text.length > 0),
    ),
  ];
}

function insightItem(
  unit: CanonicalReadingSemanticUnitV1,
): InsightItemView {
  const headline = unit.canonicalText?.headline?.trim();
  const summary = unit.canonicalText?.summary?.trim();
  const qualifiers = qualifierTextsFor(unit);
  if (headline === undefined && summary === undefined) {
    throw new TypeError(
      'Official Reading structured insight materialization requires canonical text.',
    );
  }
  return {
    ...(headline === undefined ? {} : { headline }),
    ...(summary === undefined ? {} : { summary }),
    ...(qualifiers.length === 0 ? {} : { qualifiers }),
  };
}

function structuralUnitText(
  unit: CanonicalReadingSemanticUnitV1,
): string {
  const item = insightItem(unit);
  return [
    ...(item.headline === undefined ? [] : [item.headline]),
    ...(item.summary === undefined || item.summary === item.headline
      ? []
      : [item.summary]),
    ...(item.qualifiers ?? []),
  ].join('\n');
}

function ordinaryRunBlocks(
  units: readonly CanonicalReadingSemanticUnitV1[],
): ReadingSectionView['blocks'] {
  if (units.length === 0) return [];
  return [
    {
      type: 'insights',
      items: units.map(insightItem),
    },
  ];
}

interface StructuralUnitGroup {
  kind: 'scenario' | 'contradiction';
  units: readonly CanonicalReadingSemanticUnitV1[];
}

function scenarioGroups(
  units: readonly CanonicalReadingSemanticUnitV1[],
): readonly StructuralUnitGroup[] {
  const bySemanticKey = new Map<
    string,
    CanonicalReadingSemanticUnitV1[]
  >();

  for (const unit of units) {
    if (unit.scenarioRef === undefined) continue;
    const current = bySemanticKey.get(unit.semanticKey) ?? [];
    current.push(unit);
    bySemanticKey.set(unit.semanticKey, current);
  }

  return [...bySemanticKey.values()]
    .filter(
      (group) =>
        new Set(group.map((unit) => unit.scenarioRef)).size > 1,
    )
    .map((group) => ({ kind: 'scenario' as const, units: group }));
}

function contradictionGroups(
  bundle: CanonicalReadingSemanticBundleV1,
  units: readonly CanonicalReadingSemanticUnitV1[],
): readonly StructuralUnitGroup[] {
  const byClaimId = new Map(units.map((unit) => [unit.claimId, unit]));
  const adjacency = new Map<string, Set<string>>();

  for (const relation of bundle.claimRelations) {
    if (relation.relation !== 'contradicts') continue;
    if (
      relation.fromClaimId === relation.toClaimId ||
      !byClaimId.has(relation.fromClaimId) ||
      !byClaimId.has(relation.toClaimId)
    ) {
      continue;
    }
    const from = adjacency.get(relation.fromClaimId) ?? new Set<string>();
    const to = adjacency.get(relation.toClaimId) ?? new Set<string>();
    from.add(relation.toClaimId);
    to.add(relation.fromClaimId);
    adjacency.set(relation.fromClaimId, from);
    adjacency.set(relation.toClaimId, to);
  }

  const visited = new Set<string>();
  const groups: StructuralUnitGroup[] = [];

  for (const unit of units) {
    if (visited.has(unit.claimId) || !adjacency.has(unit.claimId)) continue;
    const pending = [unit.claimId];
    const component = new Set<string>();

    while (pending.length > 0) {
      const claimId = pending.shift();
      if (claimId === undefined || component.has(claimId)) continue;
      component.add(claimId);
      for (const neighbor of adjacency.get(claimId) ?? []) pending.push(neighbor);
    }

    for (const claimId of component) visited.add(claimId);
    if (component.size < 2) continue;
    groups.push({
      kind: 'contradiction',
      units: units.filter((candidate) => component.has(candidate.claimId)),
    });
  }

  return groups;
}

function structuralGroupsForSection(
  bundle: CanonicalReadingSemanticBundleV1,
  units: readonly CanonicalReadingSemanticUnitV1[],
): ReadonlyMap<string, StructuralUnitGroup> {
  const scenarios = scenarioGroups(units);
  const contradictions = contradictionGroups(bundle, units);
  const scenarioUnitIds = new Set(
    scenarios.flatMap((group) => group.units.map((unit) => unit.unitId)),
  );
  const contradictionUnitIds = new Set(
    contradictions.flatMap((group) => group.units.map((unit) => unit.unitId)),
  );

  if (
    [...scenarioUnitIds].some((unitId) => contradictionUnitIds.has(unitId))
  ) {
    throw new TypeError(
      'Official Reading structural realization does not support overlapping scenario and contradiction groups.',
    );
  }

  const result = new Map<string, StructuralUnitGroup>();
  for (const group of [...scenarios, ...contradictions]) {
    for (const unit of group.units) result.set(unit.unitId, group);
  }
  return result;
}

function structurallyPreservedBlocks(
  bundle: CanonicalReadingSemanticBundleV1,
  units: readonly CanonicalReadingSemanticUnitV1[],
): ReadingSectionView['blocks'] {
  const groups = structuralGroupsForSection(bundle, units);
  const emittedGroups = new Set<StructuralUnitGroup>();
  const blocks: ReadingSectionView['blocks'][number][] = [];
  let ordinaryRun: CanonicalReadingSemanticUnitV1[] = [];

  const flushOrdinaryRun = (): void => {
    if (ordinaryRun.length === 0) return;
    blocks.push(...ordinaryRunBlocks(ordinaryRun));
    ordinaryRun = [];
  };

  for (const unit of units) {
    const group = groups.get(unit.unitId);
    if (group === undefined) {
      ordinaryRun.push(unit);
      continue;
    }

    flushOrdinaryRun();
    if (emittedGroups.has(group)) continue;
    emittedGroups.add(group);

    if (group.kind === 'scenario') {
      const scenarioRefs: string[] = [];
      const unitsByScenario = new Map<string, CanonicalReadingSemanticUnitV1[]>();
      for (const member of group.units) {
        const scenarioRef = member.scenarioRef;
        if (scenarioRef === undefined) {
          throw new TypeError(
            'Official Reading scenario group contains a unit without scenarioRef.',
          );
        }
        if (!unitsByScenario.has(scenarioRef)) scenarioRefs.push(scenarioRef);
        const current = unitsByScenario.get(scenarioRef) ?? [];
        current.push(member);
        unitsByScenario.set(scenarioRef, current);
      }
      blocks.push({
        type: 'ambiguity',
        summary: '서로 다른 시나리오를 하나로 합치지 않고 함께 표시합니다.',
        scenarios: scenarioRefs.map((scenarioRef, index) => ({
          label: `시나리오 ${index + 1}`,
          text: (unitsByScenario.get(scenarioRef) ?? [])
            .map(structuralUnitText)
            .join('\n\n'),
        })),
      });
      continue;
    }

    blocks.push({
      type: 'comparison',
      title: '함께 보존되는 상반된 해석',
      perspectives: group.units.map((member, index) => ({
        label: `관점 ${index + 1}`,
        text: structuralUnitText(member),
      })),
    });
  }

  flushOrdinaryRun();
  return blocks;
}

function assertStructuralRealizationSupported(
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
  index: ReadonlyMap<string, CanonicalReadingSemanticUnitV1>,
): void {
  for (const section of plan.sections) {
    if (
      section.semanticGroup === 'evidence' ||
      section.semanticGroup === 'limits'
    ) {
      continue;
    }
    structuralGroupsForSection(
      bundle,
      unitsForRefs(section.primaryUnitRefs, index),
    );
  }
}

function limitText(prohibitedExtensions: readonly string[]): string {
  const knownLabels = [
    ...new Set(
      prohibitedExtensions
        .map((key) => LIMIT_LABELS[key])
        .filter((label): label is string => label !== undefined),
    ),
  ];
  const unknownCount = prohibitedExtensions.filter(
    (key) => LIMIT_LABELS[key] === undefined,
  ).length;
  const labels = [
    ...knownLabels,
    ...(unknownCount === 0 ? [] : ['그 밖의 근거 범위를 벗어난 추가 결론']),
  ];
  return `현재 근거 범위에서는 ${labels.join(' · ')}까지 확정하지 않습니다.`;
}

export function canRenderOfficialReadingV1(
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
): boolean {
  assertCanonicalReadingSemanticBundleV1(bundle);
  assertOfficialReadingPlanV1(plan, bundle);
  const index = unitMap(bundle);
  try {
    assertStructuralRealizationSupported(bundle, plan, index);
  } catch {
    return false;
  }
  return plan.sections
    .filter((section) => section.semanticGroup !== 'evidence' && section.semanticGroup !== 'limits')
    .flatMap((section) => unitsForRefs(section.primaryUnitRefs, index))
    .every(
      (unit) =>
        unit.canonicalText?.headline !== undefined || unit.canonicalText?.summary !== undefined,
    );
}

export function renderOfficialReadingV1(
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
): OfficialReadingRenderedContentV1 {
  assertCanonicalReadingSemanticBundleV1(bundle);
  assertOfficialReadingPlanV1(plan, bundle);
  const index = unitMap(bundle);
  assertStructuralRealizationSupported(bundle, plan, index);
  if (!canRenderOfficialReadingV1(bundle, plan)) {
    throw new TypeError(
      'Official Reading canonical renderer requires realizable text for every primary semantic unit.',
    );
  }

  const sections: ReadingSectionView[] = [];
  const explainabilityEntries: ExplainabilityIndex['entries'][number][] = [];

  for (const section of plan.sections) {
    if (section.semanticGroup === 'evidence') continue;

    const primaryUnits = unitsForRefs(section.primaryUnitRefs, index);
    const supportingUnits = unitsForRefs(section.supportingUnitRefs, index);
    const explainability = explainabilityEntry(section, primaryUnits, supportingUnits);
    const blocks =
      section.semanticGroup === 'limits'
        ? section.prohibitedExtensions.length === 0
          ? []
          : [{ type: 'paragraph' as const, text: limitText(section.prohibitedExtensions) }]
        : structurallyPreservedBlocks(bundle, primaryUnits);

    if (blocks.length === 0) continue;
    explainabilityEntries.push(explainability);
    sections.push({
      sectionId: section.sectionId,
      sectionType: sectionTypeFor(section.semanticGroup),
      title: titleFor(
        bundle.intent.domain,
        section.semanticGroup,
        section.semanticLane,
      ),
      blocks,
      state: 'complete',
      explainabilityRefs: [explainability.explainabilityRef],
    });
  }

  if (sections.length === 0) {
    throw new RangeError('Official Reading renderer produced no report sections.');
  }

  const disclosures: readonly ReadingDisclosureView[] = [];
  const explainability: ExplainabilityIndex = {
    entries: explainabilityEntries.sort((left, right) =>
      left.explainabilityRef.localeCompare(right.explainabilityRef),
    ),
  };
  const reportMaterial = {
    rendererVersion: OFFICIAL_READING_RENDERER_VERSION,
    structuralRealizationPolicyVersion:
      OFFICIAL_READING_STRUCTURAL_REALIZATION_POLICY_VERSION,
    ordinaryMultiClaimPresentationPolicyVersion:
      OFFICIAL_READING_ORDINARY_MULTI_CLAIM_PRESENTATION_POLICY_VERSION,
    structuredInsightMaterializationPolicyVersion:
      OFFICIAL_READING_STRUCTURED_INSIGHT_MATERIALIZATION_POLICY_VERSION,
    sourceSemanticHash: bundle.semanticHash,
    sourcePlanHash: plan.planHash,
    sections,
    disclosures,
    explainability,
  };
  const reportHash = deterministicContentHash(reportMaterial);
  return {
    ...reportMaterial,
    reportId: `official_reading_report_${reportHash.slice(0, 24)}`,
    reportHash,
  };
}
