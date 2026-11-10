import { getSolarTerm } from 'manseryeok';
import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  GENERAL_ANNUAL_ATOMIC_STEM_RELATION_PROPOSITION,
  GENERAL_ANNUAL_SOURCE_CANDIDATES,
} from '../research/general-annual-atomic-semantic-source-acquisition.js';
import {
  buildAnnualInterpretationFacts,
  type AnnualInterpretationFacts,
} from './annual-interpretation-facts.js';
import { resolveDayunTemporalContext } from './dayun-temporal-context.js';
import type { MonthlyInterpretationFacts } from './monthly-interpretation-facts.js';
import { annualSexagenaryPillar } from './temporal-reading-context.js';

const VERSION = 'myeonghwa-temporal-reader-evidence-v1';
const annualWitness = GENERAL_ANNUAL_SOURCE_CANDIDATES.find(
  item => item.candidateId === 'NLC_MING_WANLI_SANMING_TONGHUI_VOLUME2_LOWER_SCAN',
)!;

function directlyWitnessedAnnualIdentity(
  snapshot: CanonicalSajuSnapshot,
  facts: AnnualInterpretationFacts,
) {
  const dayMaster = snapshot.derivedFacts.dayMaster;
  if (dayMaster.status !== 'resolved' || dayMaster.value.value !== '갑') return null;
  const { stem } = facts.annualPillar;
  const identity = stem === '경' ? '편관' : stem === '무' ? '편재' : null;
  if (identity === null || identity !== facts.annualStemTenGod) return null;
  return {
    propositionId: GENERAL_ANNUAL_ATOMIC_STEM_RELATION_PROPOSITION.propositionId,
    scope: GENERAL_ANNUAL_ATOMIC_STEM_RELATION_PROPOSITION.outputScope,
    relation: identity,
    direction: stem === '경' ? 'annual_stem_controls_natal_day_stem' : 'natal_day_stem_controls_annual_stem',
    source: {
      id: annualWitness.candidateId,
      locator: annualWitness.sourceIdentity.locator,
      page: annualWitness.acquisition.pdfPageOneBased,
      fileSha256: annualWitness.acquisition.calculatedSha256,
    },
  };
}

/**
 * Calendar, structural facts and exact source witnesses for internal Reader
 * review. The research themes and event conclusions are outside this evidence.
 */
export function buildTemporalReaderEvidence(
  snapshot: CanonicalSajuSnapshot,
  facts: AnnualInterpretationFacts | MonthlyInterpretationFacts,
  responseBodyHash: string,
) {
  const { targetYear, timeZone, referenceDateTime } = facts;
  // The solar-term adapter's supported years. Historical annual policy remains intact.
  if (targetYear < 1800 || targetYear > 2300) return undefined;
  const dayun = resolveDayunTemporalContext(snapshot, targetYear);
  const common = {
    version: VERSION,
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    responseBodyHash,
    targetYear, timeZone, referenceDateTime,
    interpretationStatus: 'insufficient_authorized_semantics' as const,
    intervalConvention: 'half_open_start_inclusive_end_exclusive' as const,
  } as const;

  const material = facts.scope === 'monthly'
    ? {
      ...common, scope: facts.scope, targetMonth: facts.targetMonth,
      boundary: facts.jeolBoundary,
      segments: facts.segments.map(segment => ({
        id: segment.segmentId, startsAt: segment.startsAt, endsAt: segment.endsAt,
        pillar: segment.monthlyPillar, stemTenGod: segment.monthlyStemTenGod,
        natalBranchRelations: segment.monthlyBranchRelations,
      })),
    }
    : (() => {
      // The purchased civil-year window includes the preceding Saju year until Ipchun.
      const term = getSolarTerm(targetYear, 2);
      const at = term.date.toISOString();
      const startsAt = new Date(`${targetYear}-01-01T00:00:00+09:00`).toISOString();
      const endsAt = new Date(`${targetYear + 1}-01-01T00:00:00+09:00`).toISOString();
      if (!(startsAt < at && at < endsAt)) throw new RangeError('Ipchun is outside the requested year.');
      const preceding = buildAnnualInterpretationFacts(snapshot, {
        scope: 'annual', targetYear: targetYear - 1, timeZone, referenceDateTime,
        annualPillar: annualSexagenaryPillar(targetYear - 1),
      });
      return {
        ...common, scope: facts.scope, boundary: { name: term.name, hanja: term.hanja, at },
        segments: [preceding, facts].map((part, index) => ({
          id: index === 0 ? 'before_ipchun' : 'after_ipchun',
          startsAt: index === 0 ? startsAt : at,
          endsAt: index === 0 ? at : endsAt,
          pillar: part.annualPillar, stemTenGod: part.annualStemTenGod,
          natalBranchRelations: part.annualBranchRelations,
          directlyWitnessedIdentity: directlyWitnessedAnnualIdentity(snapshot, part),
        })),
      };
    })();

  const startsAt = material.segments[0]!.startsAt;
  const endsAt = material.segments.at(-1)!.endsAt;
  const referenceInstant = Date.parse(referenceDateTime);
  const referenceSegment = material.segments.find(
    segment => Date.parse(segment.startsAt) <= referenceInstant && referenceInstant < Date.parse(segment.endsAt),
  );
  const dayunOverlap = dayun.status === 'unavailable'
    ? { status: dayun.status, reasonCode: dayun.reasonCode }
    : {
      status: dayun.status, contextId: dayun.contextId,
      segments: dayun.segments.flatMap(segment => {
        const start = new Date(segment.annualOverlapStartLocalDateTime + '+09:00').toISOString();
        const end = new Date(segment.annualOverlapEndExclusiveLocalDateTime + '+09:00').toISOString();
        const overlapStart = start > startsAt ? start : startsAt;
        const overlapEnd = end < endsAt ? end : endsAt;
        return overlapStart < overlapEnd ? [{
          index: segment.index, startsAt: overlapStart, endsAt: overlapEnd,
          pillar: { stem: segment.pillar.stem.value, branch: segment.pillar.branch.value },
        }] : [];
      }),
    };
  const evidence = {
    ...material,
    referenceSegmentId: referenceSegment?.id ?? null,
    dayunOverlap: dayunOverlap.status === 'resolved' && dayunOverlap.segments.length === 0
      ? { status: 'unavailable' as const, reasonCode: 'outside_resolved_dayun_period' as const }
      : dayunOverlap,
  };
  return { ...evidence, evidenceHash: deterministicContentHash(evidence) };
}

export type TemporalReaderEvidence = NonNullable<ReturnType<typeof buildTemporalReaderEvidence>>;
