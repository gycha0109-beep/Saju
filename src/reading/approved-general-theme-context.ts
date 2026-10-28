import type { TenGodChartFact, PillarSlot } from '../contracts/calculation.js';
import type { ExplainabilityIndex } from '../contracts/reading.js';
import type {
  CanonicalReadingSemanticBundleV1,
} from './canonical-reading-semantics.js';
import type { OfficialReadingPlanV1 } from './official-reading-plan.js';
import { GENERAL_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 } from './official-reading-detailed-presentation-general.js';

export const APPROVED_GENERAL_THEME_CONTEXT_VERSION =
  'myeonghwa-approved-general-theme-context-v1' as const;

const FAMILIES: Readonly<Record<string, readonly string[]>> = {
  PEER: ['비견', '겁재'],
  RESOURCE: ['편인', '정인'],
  OUTPUT: ['식신', '상관'],
  WEALTH: ['편재', '정재'],
  OFFICER: ['편관', '정관'],
};
const SLOTS: readonly PillarSlot[] = ['year', 'month', 'day', 'hour'];
const KO: Readonly<Record<PillarSlot, string>> = {
  year: '연주', month: '월주', day: '일주', hour: '시주',
};
function sameSet(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length &&
    [...a].sort().every((x, i) => x === [...b].sort()[i]);
}
type Entry = ExplainabilityIndex['entries'][number];

export interface ApprovedGeneralThemeContextV1 {
  perspectives: readonly { explainabilityRef: string; text: string }[];
}

/**
 * The existing approved GENERAL T8 themes carry different source-bound
 * semantic axes. Connect each emitted axis to the exact observed Ten-God
 * family and its stem/branch channel. This neither ranks families nor
 * synthesizes a new whole-person result.
 */
export function buildApprovedGeneralThemeContextV1(
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
  entries: readonly Entry[],
): ApprovedGeneralThemeContextV1 | undefined {
  if (bundle.intent.domain !== 'general' ||
      bundle.intent.temporalScope !== 'natal' ||
      bundle.intent.relationshipScope !== undefined) return undefined;

  const facts = bundle.canonicalFacts.filter(item =>
    item.path === 'derivedFacts.tenGods' && item.scenarioRef === undefined);
  if (facts.length !== 1 || facts[0]?.fact.status !== 'resolved') return undefined;
  const value = facts[0].fact.value;
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return undefined;
  const chart = value as TenGodChartFact;
  const units = new Map(bundle.units.map(unit => [unit.unitId, unit] as const));
  const byClaim = new Map(bundle.units.map(unit => [unit.claimId, unit] as const));
  const perspectives: { explainabilityRef: string; text: string }[] = [];
  const seen = new Set<string>();

  for (const section of plan.sections) {
    if (section.semanticGroup === 'evidence' ||
        section.semanticGroup === 'limits') continue;
    for (const binding of section.primaryEvidenceBindings) {
      const unit = units.get(binding.primaryUnitRef);
      if (!unit || unit.role !== 'primary' ||
          unit.taxonomy.tier !== 'T8' ||
          unit.taxonomy.category !== 'general' ||
          unit.predicate !== 'consumer_theme' ||
          unit.scenarioRef !== undefined ||
          unit.ruleRefs.length === 0 ||
          unit.sourceRefs.length === 0 ||
          unit.upstreamClaimRefs.length !== 1 ||
          bundle.claimRelations.some(relation =>
            relation.relation === 'contradicts' &&
            (relation.fromClaimId === unit.claimId ||
              relation.toClaimId === unit.claimId))) continue;

      const payload = unit.semanticPayload;
      if (payload === null || typeof payload !== 'object' || Array.isArray(payload) ||
          !('family' in payload) || !('channel' in payload)) continue;
      const family = typeof payload.family === 'string'
        ? payload.family.toUpperCase() : '';
      const channel = payload.channel;
      if (!Object.hasOwn(FAMILIES, family) ||
          (channel !== 'visible_stems' && channel !== 'branches')) continue;
      const claimType = 'GENERAL_NATAL_' + family + '_' +
        (channel === 'visible_stems' ? 'VISIBLE_STEMS' : 'BRANCHES') + '_THEME';
      if (unit.claimType !== claimType) continue;
      const profile = GENERAL_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1.find(x =>
        x.claimType === claimType);
      if (!profile || profile.owner !== 'general:natal' ||
          profile.supportingClaimTypes.length !== 1 ||
          profile.scenarioPolicy !== 'none' ||
          profile.contradictionPolicy !== 'none' ||
          profile.methodologyRef.id !== unit.methodologyRef.id ||
          profile.methodologyRef.version !== unit.methodologyRef.version ||
          unit.canonicalText?.headline !== profile.standardText.headline ||
          unit.canonicalText?.summary !== profile.standardText.summary ||
          !sameSet(unit.prohibitedExtensions, profile.prohibitedExtensions) ||
          !profile.provenance.sourceRefs.every(ref => unit.sourceRefs.includes(ref)))
        continue;

      const supporting = byClaim.get(unit.upstreamClaimRefs[0]!);
      if (!supporting || supporting.scenarioRef !== undefined ||
          supporting.claimType !== profile.supportingClaimTypes[0] ||
          !binding.supportingUnitRefs.includes(supporting.unitId)) continue;
      const evidence = entries.filter(entry =>
        entry.primaryUnitRefs?.length === 1 &&
        entry.primaryUnitRefs[0] === unit.unitId &&
        sameSet(entry.supportingUnitRefs ?? [], binding.supportingUnitRefs));
      if (evidence.length !== 1 || evidence[0] === undefined) continue;

      const positions: string[] = [];
      for (const slot of SLOTS) {
        if (channel === 'visible_stems' && slot === 'day') continue;
        const observed = channel === 'visible_stems'
          ? chart[slot]?.stem : chart[slot]?.branch;
        if (observed?.status === 'resolved' &&
            FAMILIES[family]!.includes(observed.value)) {
          positions.push(KO[slot] +
            (channel === 'visible_stems' ? ' 천간 ' : ' 지지 대표 십신 ') +
            observed.value);
        }
      }
      if (positions.length === 0 || seen.has(claimType)) continue;
      seen.add(claimType);
      perspectives.push({
        explainabilityRef: evidence[0].explainabilityRef,
        text: '이 주제는 이 사람의 ' +
          (channel === 'visible_stems' ? '천간에 드러난' : '지지에 확인된') +
          ' 십신 계열을 바탕으로 한 승인된 해석입니다. 실제 관측 위치: ' +
          positions.join(' · ') + '. ' +
          '다른 주제와 함께 읽을 근거이며 이 계열 하나로 성격·길흉·성과를 확정하지 않습니다.',
      });
    }
  }

  return perspectives.length === 0 ? undefined : { perspectives };
}
