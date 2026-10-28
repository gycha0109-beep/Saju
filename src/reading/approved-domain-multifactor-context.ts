import type { TenGodChartFact, PillarSlot } from '../contracts/calculation.js';
import type { ExplainabilityIndex } from '../contracts/reading.js';
import type {
  CanonicalReadingSemanticBundleV1,
  CanonicalReadingSemanticUnitV1,
} from './canonical-reading-semantics.js';
import type { OfficialReadingPlanV1 } from './official-reading-plan.js';
import type { ApprovedOfficialReadingDetailedSourceProfileV1 } from './official-reading-detailed-presentation-definition.js';
import type { ApprovedOfficialReadingConciseDefinitionV1 } from './official-reading-concise-presentation-definition.js';
import { WEALTH_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 } from './official-reading-detailed-presentation-wealth.js';
import { BUSINESS_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 } from './official-reading-detailed-presentation-business.js';
import { WEALTH_NATAL_APPROVED_CONCISE_DEFINITIONS } from './official-reading-concise-presentation-wealth.js';
import { BUSINESS_NATAL_APPROVED_CONCISE_DEFINITIONS } from './official-reading-concise-presentation-business.js';

export const APPROVED_DOMAIN_MULTIFACTOR_CONTEXT_POLICY_VERSION =
  'myeonghwa-approved-domain-multifactor-context-v1' as const;

type Domain = 'wealth' | 'business';
type ExplainabilityEntry = ExplainabilityIndex['entries'][number];
type ConclusionAxis =
  | 'value_creation' | 'spending' | 'management' | 'friction'
  | 'decision_execution' | 'uncertainty' | 'allocation' | 'accountability'
  | 'partnership' | 'pressure';

const FAMILIES: Readonly<Record<string, { name: string; gods: readonly string[] }>> =
  Object.freeze({
    TEN_GOD_FAMILY_PEER_PRESENT: { name: '비겁', gods: ['비견', '겁재'] },
    TEN_GOD_FAMILY_RESOURCE_PRESENT: { name: '인성', gods: ['편인', '정인'] },
    TEN_GOD_FAMILY_OUTPUT_PRESENT: { name: '식상', gods: ['식신', '상관'] },
    TEN_GOD_FAMILY_WEALTH_PRESENT: { name: '재성', gods: ['편재', '정재'] },
    TEN_GOD_FAMILY_OFFICER_PRESENT: { name: '관성', gods: ['편관', '정관'] },
  });

const SLOTS: readonly PillarSlot[] = ['year', 'month', 'day', 'hour'];
const SLOT_LABEL: Readonly<Record<PillarSlot, string>> = {
  year: '연주', month: '월주', day: '일주', hour: '시주',
};
const AXES: Readonly<Record<Domain, readonly ConclusionAxis[]>> = {
  wealth: ['value_creation', 'spending', 'management', 'friction'],
  business: ['decision_execution', 'uncertainty', 'allocation', 'accountability',
    'partnership', 'pressure', 'friction'],
};

function equalSet(left: readonly string[], right: readonly string[]): boolean {
  if (left.length !== right.length) return false;
  const sortedLeft = [...left].sort();
  const sortedRight = [...right].sort();
  return sortedLeft.every((value, index) => value === sortedRight[index]);
}

function sourceProfiles(domain: Domain): {
  detailed: readonly ApprovedOfficialReadingDetailedSourceProfileV1[];
  concise: readonly ApprovedOfficialReadingConciseDefinitionV1[];
} {
  return domain === 'wealth'
    ? { detailed: WEALTH_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
        concise: WEALTH_NATAL_APPROVED_CONCISE_DEFINITIONS }
    : { detailed: BUSINESS_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
        concise: BUSINESS_NATAL_APPROVED_CONCISE_DEFINITIONS };
}

function observedFamilyPositions(
  bundle: CanonicalReadingSemanticBundleV1,
  supportingTypes: readonly string[],
): readonly string[] | undefined {
  const selected = bundle.canonicalFacts.filter(fact =>
    fact.path === 'derivedFacts.tenGods' && fact.scenarioRef === undefined);
  if (selected.length !== 1 || selected[0]?.fact.status !== 'resolved') return undefined;
  const value = selected[0].fact.value;
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return undefined;
  const chart = value as TenGodChartFact;
  const result: string[] = [];

  for (const type of supportingTypes) {
    const family = FAMILIES[type];
    if (family === undefined) return undefined;
    const positions: string[] = [];
    for (const slot of SLOTS) {
      const pillar = chart[slot];
      for (const channel of ['stem', 'branch'] as const) {
        if (slot === 'day' && channel === 'stem') continue;
        const observed = pillar?.[channel];
        if (observed?.status !== 'resolved' ||
            !family.gods.includes(observed.value)) continue;
        positions.push(
          SLOT_LABEL[slot] +
          (channel === 'stem' ? ' 천간 ' : ' 지지 대표 십신 ') +
          observed.value,
        );
      }
    }
    if (positions.length === 0) return undefined;
    result.push(family.name + ': ' + positions.join(' · '));
  }
  return result;
}

function conclusionAxis(unit: CanonicalReadingSemanticUnitV1, domain: Domain):
  ConclusionAxis | undefined {
  const payload = unit.semanticPayload;
  if (payload === null || typeof payload !== 'object' || Array.isArray(payload)) {
    return undefined;
  }
  const axis = domain === 'wealth'
    ? ('wealthKind' in payload ? payload.wealthKind : undefined)
    : ('businessKind' in payload ? payload.businessKind : undefined);
  return AXES[domain].find(value => value === axis);
}

interface ApprovedContextCandidate {
  unitId: string;
  claimType: string;
  axis: ConclusionAxis;
  approvedSummary: string;
  approvedHeadline: string;
  evidencePositions: readonly string[];
  explainabilityRef: string;
  familyCount: number;
  approvedOrder: number;
}

export interface ApprovedDomainMultifactorContextV1 {
  domain: Domain;
  title: string;
  explanation: string;
  perspectives: readonly {
    explainabilityRef: string;
    headline: string;
    text: string;
  }[];
}

/**
 * Consumer-facing contextualization of EXISTING source-approved T8 composite
 * conclusions, never a new T8 Claim, strength, fortune, income or outcome rule.
 *
 * Fail closed on an unsupported source/Claim/profile mapping, a missing family
 * in canonical facts, a scenario, a contradiction, or dangling evidence.
 * The excerpt is inserted into the *same existing* insight with its original
 * explainabilityRef. No extra interpretation section or authority is created.
 */
export function buildApprovedDomainMultifactorContextV1(
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
  explainability: readonly ExplainabilityEntry[],
): ApprovedDomainMultifactorContextV1 | undefined {
  if (bundle.intent.temporalScope !== 'natal' ||
      (bundle.intent.domain !== 'wealth' && bundle.intent.domain !== 'business') ||
      bundle.intent.relationshipScope !== undefined) return undefined;

  const domain = bundle.intent.domain;
  const profiles = sourceProfiles(domain);
  const details = new Map(profiles.detailed.map((profile, approvedOrder) =>
    [profile.claimType, { profile, approvedOrder }] as const));
  const concise = new Map(profiles.concise.map(def =>
    [def.claimType, def] as const));
  const units = new Map(bundle.units.map(unit => [unit.unitId, unit] as const));
  const unitsByClaim = new Map(bundle.units.map(unit => [unit.claimId, unit] as const));
  const entries = new Map(explainability.flatMap(entry =>
    entry.primaryUnitRefs?.length === 1
      ? [[entry.primaryUnitRefs[0]!, entry] as const]
      : []));
  const candidates: ApprovedContextCandidate[] = [];

  for (const section of plan.sections) {
    if (section.semanticGroup === 'evidence' || section.semanticGroup === 'limits') {
      continue;
    }
    for (const binding of section.primaryEvidenceBindings) {
      const unit = units.get(binding.primaryUnitRef);
      if (unit === undefined || unit.role !== 'primary' ||
          unit.taxonomy.tier !== 'T8' ||
          unit.taxonomy.category !== domain ||
          unit.predicate !== domain + '_conclusion' ||
          unit.scenarioRef !== undefined ||
          unit.ruleRefs.length === 0 || unit.sourceRefs.length === 0 ||
          bundle.claimRelations.some(relation =>
            relation.relation === 'contradicts' &&
            (relation.fromClaimId === unit.claimId ||
             relation.toClaimId === unit.claimId))) continue;

      const entry = details.get(unit.claimType);
      const profile = entry?.profile;
      const short = concise.get(unit.claimType);
      if (profile === undefined || short === undefined ||
          profile.supportingClaimTypes.length < 2 ||
          profile.scenarioPolicy !== 'none' ||
          profile.contradictionPolicy !== 'none' ||
          profile.owner !== domain + ':natal' ||
          unit.canonicalText?.headline !== profile.standardText.headline ||
          unit.canonicalText?.summary !== profile.standardText.summary ||
          unit.methodologyRef.id !== profile.methodologyRef.id ||
          unit.methodologyRef.version !== profile.methodologyRef.version ||
          short.methodologyRef.id !== profile.methodologyRef.id ||
          short.methodologyRef.version !== profile.methodologyRef.version ||
          short.standardText.headline !== profile.standardText.headline ||
          short.standardText.summary !== profile.standardText.summary ||
          short.conciseText.trim().length === 0 ||
          !equalSet(unit.prohibitedExtensions, profile.prohibitedExtensions) ||
          !equalSet(short.prohibitedExtensions, profile.prohibitedExtensions) ||
          !profile.provenance.sourceRefs.every(source =>
            unit.sourceRefs.includes(source))) continue;

      // The official plan includes TRANSITIVE evidence as well as the direct
      // T5 family prerequisites. Match the actual T8 Claim's direct upstream
      // family edges exactly; require every one in the plan's evidence binding.
      // Do not mistake additional transitive support for a new family premise.
      const directSupport = unit.upstreamClaimRefs.map(ref => unitsByClaim.get(ref));
      if (directSupport.some(item => item === undefined ||
          item.role !== 'supporting' || item.scenarioRef !== undefined ||
          !binding.supportingUnitRefs.includes(item.unitId))) continue;
      const types = directSupport.map(item => item!.claimType);
      if (!equalSet(types, profile.supportingClaimTypes) ||
          !types.every(type => FAMILIES[type] !== undefined)) continue;
      const evidencePositions = observedFamilyPositions(
        bundle, profile.supportingClaimTypes);
      if (evidencePositions === undefined) continue;

      const visible = entries.get(unit.unitId);
      if (visible === undefined || visible.primaryUnitRefs?.length !== 1 ||
          visible.primaryUnitRefs[0] !== unit.unitId ||
          !equalSet(visible.supportingUnitRefs ?? [], binding.supportingUnitRefs)) {
        continue;
      }
      const axis = conclusionAxis(unit, domain);
      if (axis === undefined || entry === undefined) continue;
      candidates.push({
        unitId: unit.unitId,
        claimType: unit.claimType,
        axis,
        approvedSummary: short.conciseText,
        approvedHeadline: profile.standardText.headline ?? '',
        evidencePositions,
        explainabilityRef: visible.explainabilityRef,
        familyCount: profile.supportingClaimTypes.length,
        approvedOrder: entry.approvedOrder,
      });
    }
  }
  if (candidates.length === 0) return undefined;
  // Different already-approved meaning axes, not a ranking of people or menus.
  candidates.sort((a, b) =>
    b.familyCount - a.familyCount ||
    a.approvedOrder - b.approvedOrder ||
    a.claimType.localeCompare(b.claimType) ||
    a.unitId.localeCompare(b.unitId));
  const selected: ApprovedContextCandidate[] = [];
  const usedAxes = new Set<ConclusionAxis>();
  for (const candidate of candidates) {
    if (usedAxes.has(candidate.axis)) continue;
    usedAxes.add(candidate.axis);
    selected.push(candidate);
    if (selected.length === 3) break;
  }
  const label = domain === 'wealth' ? '재물' : '사업';
  return {
    domain,
    title: label + '에서 함께 확인된 근거 기반 해석',
    explanation:
      '다음 내용은 이미 허용된 복합 해석의 원문 요지에 실제 명식의 근거 위치를 연결한 것입니다. ' +
      '한 가지 십신의 존재만으로 얻은 결론이 아니며, 추가 예측·성패·금액·등급을 만들지 않습니다. ' +
      '여기 표시하지 않은 다른 해석은 원래 항목에 그대로 남아 있습니다.',
    perspectives: selected.map(item => ({
      explainabilityRef: item.explainabilityRef,
      headline: item.approvedHeadline,
      text: item.approvedSummary +
        '\n\n이 결론에 사용된 실제 십신 계열과 관찰 위치: ' +
        item.evidencePositions.join(' / '),
    })),
  };
}
