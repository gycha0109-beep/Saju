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
import { RELATIONSHIP_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 } from './official-reading-detailed-presentation-relationship.js';
import { WEALTH_NATAL_APPROVED_CONCISE_DEFINITIONS } from './official-reading-concise-presentation-wealth.js';
import { BUSINESS_NATAL_APPROVED_CONCISE_DEFINITIONS } from './official-reading-concise-presentation-business.js';
import { RELATIONSHIP_NATAL_APPROVED_CONCISE_DEFINITIONS } from './official-reading-concise-presentation-relationship.js';

export const APPROVED_DOMAIN_MULTIFACTOR_CONTEXT_POLICY_VERSION =
  'myeonghwa-approved-domain-multifactor-context-v1' as const;

type Domain = 'wealth' | 'business' | 'relationship';
type ExplainabilityEntry = ExplainabilityIndex['entries'][number];
type ConclusionAxis =
  | 'value_creation' | 'spending' | 'management' | 'friction'
  | 'decision_execution' | 'uncertainty' | 'allocation' | 'accountability'
  | 'partnership' | 'pressure'
  | 'closeness' | 'expression' | 'values' | 'boundary';

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
  relationship: ['closeness', 'expression', 'values', 'boundary', 'friction'],
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
    : domain === 'business'
      ? { detailed: BUSINESS_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
          concise: BUSINESS_NATAL_APPROVED_CONCISE_DEFINITIONS }
      : { detailed: RELATIONSHIP_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
          concise: RELATIONSHIP_NATAL_APPROVED_CONCISE_DEFINITIONS };
}

interface FamilyPositionEvidence {
  positions: readonly string[];
  sharedChannel?: '천간' | '지지';
}

function observedFamilyPositions(
  bundle: CanonicalReadingSemanticBundleV1,
  supportingTypes: readonly string[],
  requireSharedChannel: boolean,
): FamilyPositionEvidence | undefined {
  const selected = bundle.canonicalFacts.filter(fact =>
    fact.path === 'derivedFacts.tenGods' && fact.scenarioRef === undefined);
  const canonical = selected[0];
  if (selected.length !== 1 || canonical?.fact.status !== 'resolved') return undefined;
  const value = canonical.fact.value;
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return undefined;
  const chart = value as TenGodChartFact;

  const families: {
    name: string;
    stems: readonly string[];
    branches: readonly string[];
  }[] = [];
  for (const type of supportingTypes) {
    const family = FAMILIES[type];
    if (family === undefined) return undefined;
    const stems: string[] = [], branches: string[] = [];
    for (const slot of SLOTS) {
      const pillar = chart[slot];
      for (const channel of ['stem', 'branch'] as const) {
        if (slot === 'day' && channel === 'stem') continue;
        const observed = pillar?.[channel];
        if (observed?.status !== 'resolved' ||
            !family.gods.includes(observed.value)) continue;
        const line = SLOT_LABEL[slot] +
          (channel === 'stem' ? ' 천간 ' : ' 지지 대표 십신 ') +
          observed.value;
        if (channel === 'stem') stems.push(line);
        else branches.push(line);
      }
    }
    if (stems.length + branches.length === 0) return undefined;
    families.push({ name: family.name, stems, branches });
  }

  // The Business candidate's actual consumer rule requires every family
  // in the T8 composite to occur in ONE shared channel. Do not cite a
  // cross-channel mixture as its evidence, even if the same five-family
  // presence rule would admit a Wealth or Relationship conclusion.
  const sharedChannel = !requireSharedChannel ? undefined
    : families.every(item => item.stems.length > 0) ? '천간' as const
    : families.every(item => item.branches.length > 0) ? '지지' as const
    : undefined;
  if (requireSharedChannel && sharedChannel === undefined) return undefined;

  return {
    positions: families.map(item =>
      item.name + ': ' +
      (sharedChannel === '천간' ? item.stems
        : sharedChannel === '지지' ? item.branches
        : [...item.stems, ...item.branches]).join(' · ')),
    ...(sharedChannel === undefined ? {} : { sharedChannel }),
  };
}

function conclusionAxis(unit: CanonicalReadingSemanticUnitV1, domain: Domain):
  ConclusionAxis | undefined {
  const payload = unit.semanticPayload;
  if (payload === null || typeof payload !== 'object' || Array.isArray(payload)) {
    return undefined;
  }
  const axis = domain === 'wealth'
    ? ('wealthKind' in payload ? payload.wealthKind : undefined)
    : domain === 'business'
      ? ('businessKind' in payload ? payload.businessKind : undefined)
      : ('relationshipKind' in payload ? payload.relationshipKind : undefined);
  return AXES[domain].find(value => value === axis);
}

interface ApprovedContextCandidate {
  unitId: string;
  claimType: string;
  axis: ConclusionAxis;
  approvedSummary: string;
  approvedHeadline: string;
  evidencePositions: readonly string[];
  sharedChannel?: '천간' | '지지';
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
      (bundle.intent.domain !== 'wealth' &&
       bundle.intent.domain !== 'business' &&
       bundle.intent.domain !== 'relationship') ||
      (bundle.intent.domain === 'relationship'
        ? bundle.intent.relationshipScope !== 'general'
        : bundle.intent.relationshipScope !== undefined)) return undefined;

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
          (domain === 'relationship' && unit.taxonomy.subcategory !== 'general') ||
          unit.predicate !== domain + '_conclusion' ||
          unit.scenarioRef !== undefined ||
          unit.ruleRefs.length === 0 || unit.sourceRefs.length === 0 ||
          // Business conclusions in this product registry are issued by the
          // channel-sensitive versions of the approved T8 candidate rules.
          (domain === 'business' && !unit.ruleRefs.some(rule =>
            rule.ruleId.startsWith('RULE-CHANNEL-SENSITIVE-BUSINESS-NATAL-'))) ||
          bundle.claimRelations.some(relation =>
            relation.relation === 'contradicts' &&
            (relation.fromClaimId === unit.claimId ||
             relation.toClaimId === unit.claimId))) continue;

      const entry = details.get(unit.claimType);
      const profile = entry?.profile;
      const short = concise.get(unit.claimType);
      if (profile === undefined || short === undefined ||
          profile.supportingClaimTypes.length < 1 ||
          profile.scenarioPolicy !== 'none' ||
          profile.contradictionPolicy !== 'none' ||
          profile.owner !== (domain === 'relationship'
            ? 'relationship:natal:general'
            : domain + ':natal') ||
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
      const familyEvidence = observedFamilyPositions(
        bundle, profile.supportingClaimTypes, domain === 'business');
      if (familyEvidence === undefined) continue;

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
        evidencePositions: familyEvidence.positions,
        ...(familyEvidence.sharedChannel === undefined ? {} : {
          sharedChannel: familyEvidence.sharedChannel,
        }),
        explainabilityRef: visible.explainabilityRef,
        familyCount: profile.supportingClaimTypes.length,
        approvedOrder: entry.approvedOrder,
      });
    }
  }
  if (candidates.length === 0) return undefined;
  // Show every independently admitted meaning axis. An arbitrary first-three
  // presentation cap withheld valid source-owned explanations from the reading.
  // A one-family T8 can receive its own exact chart positions only when its
  // individual source profile is approved. It is never described as a composite.
  // The individual source-owned T8 meaning is not interchangeable with
  // another approved Claim simply because their broad display axis matches.
  // Preserve each distinct selected meaning on its own original Insight.
  // Repeating an axis does NOT increase the number of independent axes.
  candidates.sort((a, b) =>
    b.familyCount - a.familyCount ||
    a.approvedOrder - b.approvedOrder ||
    a.claimType.localeCompare(b.claimType) ||
    a.unitId.localeCompare(b.unitId));
  const selected: ApprovedContextCandidate[] = [];
  const seenClaims = new Set<string>();
  for (const candidate of candidates) {
    if (seenClaims.has(candidate.claimType)) continue;
    seenClaims.add(candidate.claimType);
    selected.push(candidate);
  }
  const label = domain === 'wealth' ? '재물'
    : domain === 'business' ? '사업' : '연애·관계';
  return {
    domain,
    title: label + '에서 함께 확인된 근거 기반 해석',
    explanation:
      '다음 내용은 이미 허용된 개별 해석과 복합 해석의 원문 요지에 실제 명식의 근거 위치를 연결한 것입니다. ' +
      '단일 계열의 기존 해석과 복합 근거의 기존 해석은 서로 구분하며, ' +
      '단일 계열을 명식 전체의 종합 판단으로 승격하지 않습니다. ' +
      '금전 규모·사업 성패·특정 상대의 속성·궁합·관계 결과나 등급을 예측하지 않습니다. ' +
      '출처와 계산 근거가 확인된 기존 결론을 각각 원래 항목에 연결합니다. ' +
      '같은 주제 축의 결론 여러 개도 독립된 새 근거로 세지 않으며 다른 해석은 원래 항목에 남아 있습니다.',
    perspectives: selected.map(item => ({
      explainabilityRef: item.explainabilityRef,
      headline: item.approvedHeadline,
      text: item.approvedSummary +
        (item.familyCount === 1
          ? '\n\n이 단일 계열 해석에 사용된 실제 십신과 관찰 위치: '
          : '\n\n이 결론에 사용된 실제 십신 계열과 관찰 위치: ') +
        item.evidencePositions.join(' / ') +
        (item.familyCount === 1
          ? '\n이 문단은 이미 승인된 한 가지 계열의 관점이며 서로 독립적인 복합 해석이나 인생 전체의 결론이 아닙니다.'
          : '') +
        (item.sharedChannel === undefined ? '' : item.familyCount === 1
          ? '\n이 단일 계열은 ' + item.sharedChannel +
            '에서 관찰됐습니다. 다른 계열과의 결합이나 우세·성패 판정이 아닙니다.'
          : '\n이 복합 결론의 선행 십신 계열은 모두 ' +
            item.sharedChannel +
            '에서 함께 관찰되었습니다. 이는 채널 일치의 사실이며 우세·성패 판정이 아닙니다.'),
    })),
  };
}
