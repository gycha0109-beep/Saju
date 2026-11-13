import { getSolarTerm } from 'manseryeok';
import type { CanonicalSajuSnapshot, PillarSlot, TenGod } from '../contracts/calculation.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import {
  runInterpretation,
  type InterpretationExecutionResult,
} from '../interpretation/interpretation-engine.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { renderClaimNarrativeProfileSections } from '../narrative/claim-narrative-profile.js';
import { GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES } from '../research/general-annual-narrative-profiles.js';
import { createGeneralAnnualReadingCandidateRegistry } from '../research/general-annual-reading-candidate.js';
import { GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES } from '../research/general-monthly-narrative-profiles.js';
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
const PILLAR_SLOTS: readonly PillarSlot[] = ['year', 'month', 'day', 'hour'];
const annualWitness = GENERAL_ANNUAL_SOURCE_CANDIDATES.find(
  item => item.candidateId === 'NLC_MING_WANLI_SANMING_TONGHUI_VOLUME2_LOWER_SCAN',
)!;

type TemporalResearchSignal = Pick<InterpretationClaim, 'claimId' | 'factRefs' | 'ruleRefs' | 'sourceRefs'> & {
  segmentId: string;
  headline: string;
  statement: string;
  epistemicType: 'future_tendency';
} & ({ kind: 'primary'; stemTenGod: TenGod } | { kind: 'tension'; natalPillar: PillarSlot });

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

function buildResearchSignals(
  snapshot: CanonicalSajuSnapshot,
  scope: 'annual' | 'monthly',
  segments: readonly {
    id: string;
    stemTenGod: TenGod;
    natalBranchRelations: AnnualInterpretationFacts['annualBranchRelations'] |
      MonthlyInterpretationFacts['segments'][number]['monthlyBranchRelations'];
  }[],
  interpretation?: InterpretationExecutionResult,
  annualSegmentId: 'before_ipchun' | 'after_ipchun' = 'after_ipchun',
) {
  if (!interpretation?.integrity.valid || interpretation.run.snapshotId !== snapshot.snapshotId
    || interpretation.run.snapshotHash !== snapshot.calculationHash) return [];
  const claims = interpretation.claims.filter(claim => claim.state === 'active'
    && claim.snapshotId === snapshot.snapshotId && claim.taxonomy.tier === 'T9'
    && claim.taxonomy.category === 'general' && claim.taxonomy.subcategory === scope);
  const profiles = scope === 'annual' ? GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES : GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES;
  const sections = renderClaimNarrativeProfileSections({ claims }, profiles);
  const byClaimId = new Map(claims.map(claim => [claim.claimId, claim]));
  return sections.flatMap(section => section.blocks.flatMap<TemporalResearchSignal>(block => {
    if (block.type !== 'assertion' || block.epistemicType !== 'future_tendency' || block.evidenceRefs.length !== 1) return [];
    const claim = byClaimId.get(block.evidenceRefs[0]!.ref);
    if (claim === undefined || claim.value === null || typeof claim.value !== 'object') return [];
    const value = claim.value as Record<string, unknown>;
    const segment = segments.find(item => item.id === (scope === 'annual' ? annualSegmentId : value.segmentId));
    if (segment === undefined) return [];
    const signal = {
      claimId: claim.claimId, segmentId: segment.id,
      headline: section.title, statement: block.text, epistemicType: block.epistemicType as 'future_tendency',
      factRefs: claim.factRefs, ruleRefs: claim.ruleRefs, sourceRefs: claim.sourceRefs,
    };
    if (value.narrativeRole === 'primary') {
      return value.tenGod === segment.stemTenGod
        ? [{ ...signal, kind: 'primary' as const, stemTenGod: segment.stemTenGod }] : [];
    }
    const slot = PILLAR_SLOTS.find(pillar => pillar === value.natalPillar);
    const relation = slot === undefined ? undefined : segment.natalBranchRelations[slot];
    return value.narrativeRole === 'tension' && slot !== undefined && value.relation === 'clash'
      && relation?.status === 'resolved' && relation.value.relation === 'clash'
      ? [{ ...signal, kind: 'tension' as const, natalPillar: slot }] : [];
  }));
}

/**
 * Calendar, structural facts and exact source witnesses for internal Reader
 * review. The research themes and event conclusions are outside this evidence.
 */
export function buildTemporalReaderEvidence(
  snapshot: CanonicalSajuSnapshot,
  facts: AnnualInterpretationFacts | MonthlyInterpretationFacts,
  responseBodyHash: string,
  interpretation?: InterpretationExecutionResult,
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

  const precedingAnnualFacts = facts.scope === 'annual' ? buildAnnualInterpretationFacts(snapshot, {
    scope: 'annual', targetYear: targetYear - 1, timeZone, referenceDateTime,
    annualPillar: annualSexagenaryPillar(targetYear - 1),
  }) : undefined;
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
      return {
        ...common, scope: facts.scope, boundary: { name: term.name, hanja: term.hanja, at },
        segments: [precedingAnnualFacts!, facts].map((part, index) => ({
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
  const currentSignals = buildResearchSignals(snapshot, material.scope, material.segments, interpretation);
  // The civil year includes the preceding Saju year. Evaluate its held
  // research rules against that pillar and the same natal snapshot.
  const precedingSignals = precedingAnnualFacts === undefined || currentSignals.length === 0 ? [] :
    buildResearchSignals(snapshot, 'annual', material.segments, runInterpretation(
      snapshot, createGeneralAnnualReadingCandidateRegistry(referenceDateTime), {
        now: new Date(referenceDateTime), temporalFacts: { ...precedingAnnualFacts },
      },
    ), 'before_ipchun');
  const evidence = {
    ...material,
    referenceSegmentId: referenceSegment?.id ?? null,
    researchSignals: [...precedingSignals, ...currentSignals],
    dayunOverlap: dayunOverlap.status === 'resolved' && dayunOverlap.segments.length === 0
      ? { status: 'unavailable' as const, reasonCode: 'outside_resolved_dayun_period' as const }
      : dayunOverlap,
  };
  return { ...evidence, evidenceHash: deterministicContentHash(evidence) };
}

export type TemporalReaderEvidence = NonNullable<ReturnType<typeof buildTemporalReaderEvidence>>;
