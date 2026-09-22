import type {
  ExplainabilityIndex,
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
} from './official-reading-plan.js';

export const OFFICIAL_READING_RENDERER_VERSION =
  'myeonghwa-official-reading-renderer-v1' as const;

export interface OfficialReadingRenderedContentV1 {
  rendererVersion: typeof OFFICIAL_READING_RENDERER_VERSION;
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

const LIMIT_LABELS: Readonly<Record<string, string>> = Object.freeze({
  netWorthAuthorized: '현재 재산 규모',
  investmentReturnAuthorized: '투자 수익률',
  windfallAuthorized: '횡재·일확천금',
  financialAdviceAuthorized: '투자·재무 조언',
  futureMoneyTimingAuthorized: '미래 금전 시기',
  futureTimingAuthorized: '미래 사건 시기',
  numericScoringAuthorized: '수치 점수·등급',
});

function titleFor(
  domain: CanonicalReadingSemanticBundleV1['intent']['domain'],
  group: OfficialReadingSemanticGroup,
): string {
  const domainTitles =
    domain === 'general' ? SECTION_TITLES.general : domain === 'wealth' ? SECTION_TITLES.wealth : SECTION_TITLES.default;
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

function primaryBlocks(units: readonly CanonicalReadingSemanticUnitV1[]) {
  return units.flatMap((unit) => {
    const headline = unit.canonicalText?.headline?.trim();
    const summary = unit.canonicalText?.summary?.trim();
    if (headline === undefined && summary === undefined) return [];
    if (headline !== undefined && summary !== undefined && headline !== summary) {
      return [
        { type: 'key_points' as const, items: [headline] },
        { type: 'paragraph' as const, text: summary },
      ];
    }
    return [{ type: 'paragraph' as const, text: summary ?? headline ?? '' }];
  });
}

function limitText(prohibitedExtensions: readonly string[]): string {
  const labels = prohibitedExtensions.map((key) => LIMIT_LABELS[key] ?? key);
  return `현재 근거 범위에서는 ${labels.join(' · ')}까지 확정하지 않습니다.`;
}

export function canRenderOfficialReadingV1(
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
): boolean {
  assertCanonicalReadingSemanticBundleV1(bundle);
  assertOfficialReadingPlanV1(plan, bundle);
  const index = unitMap(bundle);
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
  if (!canRenderOfficialReadingV1(bundle, plan)) {
    throw new TypeError(
      'Official Reading canonical renderer requires realizable text for every primary semantic unit.',
    );
  }

  const index = unitMap(bundle);
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
        : primaryBlocks(primaryUnits);

    if (blocks.length === 0) continue;
    explainabilityEntries.push(explainability);
    sections.push({
      sectionId: section.sectionId,
      sectionType: sectionTypeFor(section.semanticGroup),
      title: titleFor(bundle.intent.domain, section.semanticGroup),
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
