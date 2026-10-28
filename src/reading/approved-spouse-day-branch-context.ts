import type { EarthlyBranch, PillarFact } from '../contracts/calculation.js';
import type { ExplainabilityIndex } from '../contracts/reading.js';
import type { CanonicalReadingSemanticBundleV1 } from './canonical-reading-semantics.js';
import type { OfficialReadingPlanV1 } from './official-reading-plan.js';
import {
  RELATIONSHIP_SPOUSE_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
} from './official-reading-detailed-presentation-spouse.js';

export const APPROVED_SPOUSE_DAY_BRANCH_CONTEXT_VERSION =
  'myeonghwa-approved-spouse-day-branch-position-context-v1' as const;

const BRANCH_HANJA: Readonly<Record<EarthlyBranch, string>> = {
  자: '子', 축: '丑', 인: '寅', 묘: '卯', 진: '辰', 사: '巳',
  오: '午', 미: '未', 신: '申', 유: '酉', 술: '戌', 해: '亥',
};

type Entry = ExplainabilityIndex['entries'][number];

export interface ApprovedSpouseDayBranchContextV1 {
  explainabilityRef: string;
  text: string;
}

/**
 * Personalizes an already-authorized position-only spouse reading with the
 * same person's actual day-branch FACT. Not a spouse personality, marriage
 * fate, compatibility, spouse-star, polarity or result inference.
 */
export function buildApprovedSpouseDayBranchContextV1(
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
  entries: readonly Entry[],
): ApprovedSpouseDayBranchContextV1 | undefined {
  if (bundle.intent.domain !== 'relationship' ||
      bundle.intent.temporalScope !== 'natal' ||
      bundle.intent.relationshipScope !== 'spouse') return undefined;
  const profile = RELATIONSHIP_SPOUSE_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1[0];
  if (RELATIONSHIP_SPOUSE_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1.length !== 1 ||
      profile === undefined ||
      profile.claimType !== 'relationship.spouse.traditional_spouse_palace_position' ||
      profile.owner !== 'relationship:natal:spouse') return undefined;

  const facts = bundle.canonicalFacts.filter(fact =>
    fact.path === 'pillars.day' && fact.scenarioRef === undefined);
  if (facts.length !== 1 || facts[0]?.fact.status !== 'resolved') return undefined;
  const value = facts[0].fact.value;
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return undefined;
  }
  const day = value as PillarFact;
  const branch = day.branch;
  if (typeof branch?.value !== 'string' ||
      !Object.prototype.hasOwnProperty.call(BRANCH_HANJA, branch.value) ||
      BRANCH_HANJA[branch.value] !== branch.hanja) return undefined;

  const primary = bundle.units.filter(unit => unit.role === 'primary' &&
    unit.taxonomy.tier === 'T8' && unit.taxonomy.category === 'relationship' &&
    unit.taxonomy.subcategory === 'spouse' &&
    unit.predicate === 'traditional_spouse_palace_position');
  if (primary.length !== 1) return undefined;
  const unit = primary[0]!;
  if (unit.claimType !== profile.claimType ||
      unit.scenarioRef !== undefined ||
      unit.factRefs.length !== 1 || unit.factRefs[0] !== 'pillars.day' ||
      unit.ruleRefs.length === 0 ||
      unit.sourceRefs.length === 0 ||
      unit.canonicalText?.headline !== profile.standardText.headline ||
      unit.canonicalText?.summary !== profile.standardText.summary ||
      unit.methodologyRef.id !== profile.methodologyRef.id ||
      unit.methodologyRef.version !== profile.methodologyRef.version ||
      profile.provenance.sourceRefs.some(source => !unit.sourceRefs.includes(source)) ||
      unit.prohibitedExtensions.length !== profile.prohibitedExtensions.length ||
      [...unit.prohibitedExtensions].sort().some((v, i) =>
        v !== [...profile.prohibitedExtensions].sort()[i]) ||
      bundle.claimRelations.some(relation => relation.relation === 'contradicts' &&
        (relation.fromClaimId === unit.claimId ||
         relation.toClaimId === unit.claimId))) return undefined;

  const attached = plan.sections.flatMap(section =>
    section.primaryEvidenceBindings.filter(binding =>
      binding.primaryUnitRef === unit.unitId));
  if (attached.length !== 1 || attached[0]?.supportingUnitRefs.length !== 0) {
    return undefined;
  }
  const visible = entries.filter(entry =>
    entry.primaryUnitRefs?.length === 1 &&
    entry.primaryUnitRefs[0] === unit.unitId);
  if (visible.length !== 1 || visible[0] === undefined ||
      (visible[0].supportingUnitRefs?.length ?? 0) !== 0) return undefined;

  return {
    explainabilityRef: visible[0].explainabilityRef,
    text: '이 사람의 실제 일지(日支)는 ' + branch.value + '(' + branch.hanja +
      ')로 계산됐습니다. 기존 승인된 배우자궁 설명은 이 위치를 지칭합니다. ' +
      '이 지지를 특정 배우자의 성격·외모, 결혼 시기·성패나 궁합 결과로 해석하지 않습니다.',
  };
}
