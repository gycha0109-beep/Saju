import type { ReadingSectionView, ExplainabilityIndex } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  CanonicalReadingSemanticBundleV1,
  CanonicalReadingSemanticUnitV1,
} from './canonical-reading-semantics.js';
import type { OfficialReadingPlanV1 } from './official-reading-plan.js';
import type { OfficialReadingDetailedRealizationV1 } from './official-reading-detailed-realization.js';
import {
  RELATIONSHIP_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
} from './official-reading-detailed-presentation-relationship.js';
import {
  RELATIONSHIP_NATAL_APPROVED_CONCISE_DEFINITIONS,
} from './official-reading-concise-presentation-relationship.js';

export const APPROVED_RELATIONSHIP_MULTIFACTOR_OVERVIEW_POLICY_VERSION =
  'myeonghwa-approved-relationship-multifactor-overview-v1' as const;

type ExplainabilityEntry = ExplainabilityIndex['entries'][number];
type RelationshipAxis = 'closeness' | 'expression' | 'values' | 'boundary' | 'friction';

const AXES: readonly RelationshipAxis[] = [
  'closeness', 'expression', 'values', 'boundary', 'friction',
];
const FAMILY_FACT_LABELS: Readonly<Record<string, string>> = Object.freeze({
  TEN_GOD_FAMILY_PEER_PRESENT: '비겁',
  TEN_GOD_FAMILY_RESOURCE_PRESENT: '인성',
  TEN_GOD_FAMILY_OUTPUT_PRESENT: '식상',
  TEN_GOD_FAMILY_WEALTH_PRESENT: '재성',
  TEN_GOD_FAMILY_OFFICER_PRESENT: '관성',
});

function sameSet(left: readonly string[], right: readonly string[]): boolean {
  if (left.length !== right.length) return false;
  const sortedLeft = [...left].sort();
  const sortedRight = [...right].sort();
  return sortedLeft.every((value, index) => value === sortedRight[index]);
}

function relationshipAxis(unit: CanonicalReadingSemanticUnitV1): RelationshipAxis | undefined {
  const value = unit.semanticPayload;
  if (value === null || typeof value !== 'object' || Array.isArray(value) ||
      !('relationshipKind' in value)) return undefined;
  const kind = value.relationshipKind;
  return AXES.find((axis) => axis === kind);
}

interface ApprovedComposite {
  claimType: string;
  confirmedFamilies: readonly string[];
  unitId: string;
  axis: RelationshipAxis;
  headline: string;
  explanation: string;
  explainabilityRef: string;
  distinctFamilies: number;
  approvedOrder: number;
}

/**
 * Presentation of already materialized, source-approved two-family T8
 * conclusions. A missing claim, missing upstream T5 family, scenario, or
 * inconsistent approved material cannot be summarized or substituted.
 * No new cross-family interpretation is generated here.
 */
export function buildApprovedRelationshipMultifactorOverviewV1(
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
  detailed: OfficialReadingDetailedRealizationV1 | undefined,
  explainabilityEntries: readonly ExplainabilityEntry[],
): ReadingSectionView | undefined {
  if (bundle.intent.domain !== 'relationship' ||
      bundle.intent.temporalScope !== 'natal' ||
      bundle.intent.relationshipScope !== 'general' ||
      detailed === undefined) return undefined;

  const unitsById = new Map(bundle.units.map(unit => [unit.unitId, unit]));
  const entriesByUnitId = new Map(
    explainabilityEntries.flatMap(entry =>
      entry.primaryUnitRefs?.length === 1
        ? [[entry.primaryUnitRefs[0]!, entry] as const]
        : []),
  );
  const detailByUnitId = new Map(detailed.units.map(unit => [unit.unitId, unit]));
  const profilesByClaimType = new Map(
    RELATIONSHIP_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1.map((profile, approvedOrder) =>
      [profile.claimType, { profile, approvedOrder }] as const),
  );

  const conciseByClaimType = new Map(
    RELATIONSHIP_NATAL_APPROVED_CONCISE_DEFINITIONS.map(definition =>
      [definition.claimType, definition] as const),
  );
  const candidates: ApprovedComposite[] = [];
  for (const section of plan.sections) {
    if (section.semanticGroup !== 'relationship') continue;
    for (const binding of section.primaryEvidenceBindings) {
      const unit = unitsById.get(binding.primaryUnitRef);
      if (unit === undefined || unit.role !== 'primary' ||
          unit.taxonomy.tier !== 'T8' ||
          unit.taxonomy.category !== 'relationship' ||
          unit.taxonomy.subcategory !== 'general' ||
          unit.predicate !== 'relationship_conclusion' ||
          unit.scenarioRef !== undefined) continue;

      const approval = profilesByClaimType.get(unit.claimType);
      const profile = approval?.profile;
      if (profile === undefined || profile.supportingClaimTypes.length < 2 ||
          profile.scenarioPolicy !== 'none' ||
          profile.contradictionPolicy !== 'none' ||
          unit.canonicalText?.headline !== profile.standardText.headline ||
          unit.canonicalText?.summary !== profile.standardText.summary ||
          unit.methodologyRef.id !== profile.methodologyRef.id ||
          unit.methodologyRef.version !== profile.methodologyRef.version ||
          !sameSet(unit.prohibitedExtensions, profile.prohibitedExtensions) ||
          profile.provenance.sourceRefs.some(source => !unit.sourceRefs.includes(source)) ||
          bundle.claimRelations.some(relation => relation.relation === 'contradicts' &&
            (relation.fromClaimId === unit.claimId ||
              relation.toClaimId === unit.claimId))) continue;

      const supportTypes = binding.supportingUnitRefs.map(ref =>
        unitsById.get(ref)?.claimType,
      );
      if (supportTypes.some(type => type === undefined) ||
          !sameSet(supportTypes as string[], profile.supportingClaimTypes) ||
          supportTypes.some(type => type === undefined || FAMILY_FACT_LABELS[type] === undefined)) {
        continue;
      }

      const detail = detailByUnitId.get(unit.unitId);
      const clarification = profile.approvedTextByRole.clarification;
      const concise = conciseByClaimType.get(unit.claimType);
      if (clarification === undefined ||
          detail?.roleTexts.find(role => role.role === 'clarification')?.text !== clarification ||
          concise === undefined ||
          concise.methodologyRef.id !== profile.methodologyRef.id ||
          concise.methodologyRef.version !== profile.methodologyRef.version ||
          concise.standardText.headline !== profile.standardText.headline ||
          concise.standardText.summary !== profile.standardText.summary ||
          concise.conciseText.trim().length === 0) {
        continue;
      }
      const entry = entriesByUnitId.get(unit.unitId);
      if (entry === undefined || entry.primaryUnitRefs?.length !== 1 ||
          entry.supportingUnitRefs === undefined ||
          !sameSet(entry.supportingUnitRefs, binding.supportingUnitRefs) ||
          entry.primaryUnitRefs[0] !== unit.unitId) continue;

      const axis = relationshipAxis(unit);
      if (axis === undefined) continue;
      candidates.push({
        claimType: unit.claimType,
        confirmedFamilies: profile.supportingClaimTypes.map(type => FAMILY_FACT_LABELS[type]!),
        unitId: unit.unitId,
        axis,
        headline: profile.standardText.headline!,
        explanation: concise.conciseText,
        explainabilityRef: entry.explainabilityRef,
        distinctFamilies: profile.supportingClaimTypes.length,
        approvedOrder: approval!.approvedOrder,
      });
    }
  }
  if (candidates.length === 0) return undefined;

  // Prefer independent interpretive axes; within an axis favor the larger
  // already-approved supporting family set, never an inferred score or rank.
  candidates.sort((left, right) =>
    right.distinctFamilies - left.distinctFamilies ||
    left.approvedOrder - right.approvedOrder ||
    left.claimType.localeCompare(right.claimType) ||
    left.unitId.localeCompare(right.unitId),
  );
  const selected: ApprovedComposite[] = [];
  const axes = new Set<RelationshipAxis>();
  for (const candidate of candidates) {
    if (axes.has(candidate.axis)) continue;
    axes.add(candidate.axis);
    selected.push(candidate);
    if (selected.length === 3) break;
  }
  const explainabilityRefs = selected.map(x => x.explainabilityRef);
  const idHash = deterministicContentHash({
    policy: APPROVED_RELATIONSHIP_MULTIFACTOR_OVERVIEW_POLICY_VERSION,
    semanticHash: bundle.semanticHash,
    primaryUnitIds: selected.map(x => x.unitId),
    explainabilityRefs,
  });

  return {
    sectionId: 'official_relationship_composite_' + idHash.slice(0, 20),
    sectionType: 'overview',
    title: '내 명식에서 함께 확인된 관계 주제',
    state: selected.length < 3 ? 'partial' : 'complete',
    explainabilityRefs,
    blocks: [
      {
        type: 'paragraph',
        text: '아래 항목은 실제 명식에서 각각 두 개 이상의 십신 계열 근거가 확인되고, 기존 승인된 관계풀이의 문장과 출처가 일치하는 경우만 모았습니다. 특정 상대의 성격, 궁합, 결혼이나 관계 결과를 판정하지 않습니다.' +
          (selected.length < 3
            ? ' 현재 확인된 서로 다른 관계 관점은 ' + selected.length +
              '개입니다. 다른 관점의 근거가 없으므로 이 요약만으로 관계 종합풀이의 완성을 뜻하지 않습니다.'
            : ' 세 관계 관점의 요약은 승인된 개별 풀이를 찾아 읽도록 돕는 것이며, 원국 전체의 최소 유효 해석 완료 판정과는 별개입니다.'),
      },
      {
        type: 'comparison',
        title: '서로 다른 관점으로 읽는 기존 승인된 해석',
        perspectives: selected.map(x => ({
          label: x.headline,
          text: x.explanation + '\n\n실제 명식에서 함께 확인된 십신 계열: ' +
            x.confirmedFamilies.join(' · '),
          explainabilityRef: x.explainabilityRef,
        })),
      },
    ],
  };
}
