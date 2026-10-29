import type { TenGod, TenGodChartFact, PillarSlot } from '../contracts/calculation.js';
import type { ExplainabilityIndex } from '../contracts/reading.js';
import {
  careerTenGodClaimType,
  CAREER_TEN_GOD_SEMANTIC_SPECS,
  type CareerTenGodChannel,
} from '../research/career-natal-reading-schema.js';
import type {
  CanonicalReadingSemanticBundleV1,
  CanonicalReadingSemanticUnitV1,
} from './canonical-reading-semantics.js';
import type { OfficialReadingPlanV1 } from './official-reading-plan.js';
import { CAREER_NATAL_APPROVED_CONCISE_DEFINITIONS } from './official-reading-concise-presentation-career.js';
import { CAREER_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 } from './official-reading-detailed-presentation-career.js';

export const APPROVED_CAREER_CHANNEL_CONTEXT_VERSION =
  'myeonghwa-approved-career-channel-context-v1' as const;

type ExplainabilityEntry = ExplainabilityIndex['entries'][number];
const TEN_GODS: readonly TenGod[] = Object.keys(CAREER_TEN_GOD_SEMANTIC_SPECS) as TenGod[];
const SLOTS: readonly PillarSlot[] = ['year', 'month', 'day', 'hour'];
const SLOT_KO: Readonly<Record<PillarSlot, string>> = {
  year: '연주', month: '월주', day: '일주', hour: '시주',
};

function sameList(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length &&
    [...left].sort().every((value, i) => value === [...right].sort()[i]);
}

function exactPositions(
  bundle: CanonicalReadingSemanticBundleV1,
  god: TenGod,
  channel: CareerTenGodChannel,
): readonly string[] | undefined {
  const facts = bundle.canonicalFacts.filter(item =>
    item.path === 'derivedFacts.tenGods' && item.scenarioRef === undefined);
  if (facts.length !== 1 || facts[0]?.fact.status !== 'resolved') return undefined;
  const value = facts[0].fact.value;
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return undefined;
  }
  const chart = value as TenGodChartFact;
  const observed: string[] = [];
  for (const slot of SLOTS) {
    if (channel === 'visible_stems' && slot === 'day') continue;
    const data = channel === 'visible_stems'
      ? chart[slot]?.stem
      : chart[slot]?.branch;
    if (data?.status === 'resolved' && data.value === god) {
      observed.push(SLOT_KO[slot] +
        (channel === 'visible_stems' ? ' 천간 ' : ' 지지 대표 십신 ') + god);
    }
  }
  return observed.length > 0 ? observed : undefined;
}

function identity(
  unit: CanonicalReadingSemanticUnitV1,
): { god: TenGod; channel: CareerTenGodChannel } | undefined {
  const value = unit.semanticPayload;
  if (value === null || typeof value !== 'object' || Array.isArray(value) ||
      !('tenGod' in value) || !('channel' in value)) return undefined;
  if (!TEN_GODS.some(god => god === value.tenGod)) return undefined;
  if (value.channel !== 'visible_stems' && value.channel !== 'branches') {
    return undefined;
  }
  return {
    god: value.tenGod as TenGod,
    channel: value.channel,
  };
}

interface CareerContextCandidate {
  explainabilityRef: string;
  god: TenGod;
  channel: CareerTenGodChannel;
  text: string;
  order: number;
}

export interface ApprovedCareerChannelContextV1 {
  domain: 'career';
  perspectives: readonly {
    explainabilityRef: string;
    text: string;
  }[];
}

/**
 * Uses the already-selected exact Ten-God/channel career Claim, its approved
 * Korean consumer copy and the same canonical Ten-God source in that person's
 * reading. This cannot decide occupation, strength or luck; nor may a branch
 * context be promoted into a visible-stem direct consumer conclusion.
 *
 * Each supplemental paragraph stays on its original Insight/explainability
 * reference and disappears when the claim, copy or fact does not match.
 */
export function buildApprovedCareerChannelContextV1(
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
  entries: readonly ExplainabilityEntry[],
  presentation: 'standard' | 'detailed' = 'standard',
): ApprovedCareerChannelContextV1 | undefined {
  if (bundle.intent.domain !== 'career' ||
      bundle.intent.temporalScope !== 'natal' ||
      bundle.intent.relationshipScope !== undefined) return undefined;

  const defs = new Map(CAREER_NATAL_APPROVED_CONCISE_DEFINITIONS.map((def, order) =>
    [def.claimType, { def, order }] as const));
  const detailedSources = new Map(CAREER_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1.map(profile =>
    [profile.claimType, profile] as const));
  const units = new Map(bundle.units.map(unit => [unit.unitId, unit] as const));
  const evidence = new Map(entries.flatMap(entry =>
    entry.primaryUnitRefs?.length === 1
      ? [[entry.primaryUnitRefs[0]!, entry] as const] : []));
  const chosen: CareerContextCandidate[] = [];

  for (const section of plan.sections) {
    if (section.semanticGroup !== 'work') continue;
    for (const binding of section.primaryEvidenceBindings) {
      const unit = units.get(binding.primaryUnitRef);
      if (unit === undefined || unit.role !== 'primary' ||
          unit.taxonomy.tier !== 'T8' ||
          unit.taxonomy.category !== 'career' ||
          unit.scenarioRef !== undefined ||
          unit.ruleRefs.length === 0 || unit.sourceRefs.length === 0 ||
          bundle.claimRelations.some(relation =>
            relation.relation === 'contradicts' &&
            (relation.fromClaimId === unit.claimId ||
              relation.toClaimId === unit.claimId))) continue;

      const target = identity(unit);
      if (target === undefined ||
          unit.claimType !== careerTenGodClaimType(target.god, target.channel) ||
          unit.predicate !== (target.channel === 'visible_stems'
            ? 'career_conclusion' : 'career_context') ||
          unit.taxonomy.subcategory !== 'ten_god_' + target.channel) continue;

      const approved = defs.get(unit.claimType);
      if (approved === undefined || approved.def.owner !== 'career:natal' ||
          approved.def.methodologyRef.id !== unit.methodologyRef.id ||
          approved.def.methodologyRef.version !== unit.methodologyRef.version ||
          unit.canonicalText?.headline !== approved.def.standardText.headline ||
          unit.canonicalText?.summary !== approved.def.standardText.summary ||
          !sameList(unit.prohibitedExtensions, approved.def.prohibitedExtensions) ||
          approved.def.conciseText.trim().length === 0) continue;

      const detailed = detailedSources.get(unit.claimType);
      if (detailed === undefined || detailed.owner !== 'career:natal' ||
          detailed.scenarioPolicy !== 'none' ||
          detailed.contradictionPolicy !== 'none' ||
          detailed.standardText.headline !== approved.def.standardText.headline ||
          detailed.standardText.summary !== approved.def.standardText.summary ||
          detailed.methodologyRef.id !== approved.def.methodologyRef.id ||
          detailed.methodologyRef.version !== approved.def.methodologyRef.version ||
          !sameList(detailed.prohibitedExtensions, approved.def.prohibitedExtensions) ||
          detailed.approvedTextByRole.clarification?.trim().length === 0 ||
          detailed.approvedTextByRole.clarification === undefined) continue;

      const entry = evidence.get(unit.unitId);
      if (entry === undefined || entry.primaryUnitRefs?.[0] !== unit.unitId ||
          !sameList(entry.supportingUnitRefs ?? [], binding.supportingUnitRefs)) {
        continue;
      }
      const locations = exactPositions(bundle, target.god, target.channel);
      if (locations === undefined) continue;

      const role = target.channel === 'visible_stems'
        ? '겉으로 드러나는 업무 방식'
        : '일을 이어가는 바탕';
      chosen.push({
        explainabilityRef: entry.explainabilityRef,
        god: target.god,
        channel: target.channel,
        order: approved.order,
        text: (presentation === 'standard'
          ? approved.def.conciseText + '\n\n' +
            detailed.approvedTextByRole.clarification + '\n\n'
          : '') +
          '이 해석을 뒷받침하는 실제 위치: ' + locations.join(' · ') +
          '\n이 위치는 ' + role +
          '에 대한 기존 해석의 관찰 근거이지, 직업 적성·성공·강약의 판정은 아닙니다.',
      });
    }
  }

  if (chosen.length === 0) return undefined;
  // All selected interpretations remain visible; the context only attaches to
  // the exact current Insight, never to an unrelated career-section headline.
  return {
    domain: 'career',
    perspectives: chosen
      .sort((a, b) =>
        a.order - b.order ||
        a.channel.localeCompare(b.channel) ||
        a.god.localeCompare(b.god))
      .map(({ explainabilityRef, text }) => ({ explainabilityRef, text })),
  };
}
