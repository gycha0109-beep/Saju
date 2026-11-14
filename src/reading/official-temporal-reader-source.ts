import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { AnnualInterpretationFacts } from './annual-interpretation-facts.js';
import type {
  CharacterGroundingBundleV2,
  CharacterGroundingUnitV2,
} from './character-grounding-v2.js';
import type { MonthlyInterpretationFacts } from './monthly-interpretation-facts.js';
import type {
  OfficialReadingSemanticSourceHandoff,
  OfficialReadingSemanticSourceUnitHandoff,
} from './official-reading-semantic-source-handoff.js';
import { buildTemporalReaderEvidence } from './temporal-reader-evidence.js';

type ReaderCalendar = NonNullable<ReturnType<typeof buildTemporalReaderEvidence>>;
type ReaderCalendarFacts = Omit<
  ReaderCalendar,
  'interpretationStatus' | 'researchSignals' | 'evidenceHash'
> & { readonly dayunDisclosureVersion: 'calculated_overlap_v1' };

export type OfficialTemporalReaderSource = Readonly<{
  calendar: ReaderCalendarFacts;
  unitWindows: readonly Readonly<{ unitId: string; segmentIds: readonly string[] }>[];
}>;

function segmentForFact(path: string, scope: ReaderCalendar['scope']): string | undefined {
  const explicit =
    /^temporal\.segmentsById\.(before_jeol|after_jeol|before_ipchun|after_ipchun)\./u.exec(
      path,
    )?.[1];
  if (scope === 'monthly') return explicit?.endsWith('_jeol') ? explicit : undefined;
  if (explicit?.endsWith('_ipchun')) return explicit;
  // The original annual T9 paths are for the selected Saju year, starting at Ipchun.
  if (/^temporal\.annual(?:Pillar|StemTenGod|BranchRelations)(?:\.|$)/u.test(path))
    return 'after_ipchun';
  return undefined;
}

/** Bind only already admitted canonical judgments to the calculated purchase windows. */
export function bindOfficialTemporalReaderSource(
  snapshot: CanonicalSajuSnapshot,
  facts: AnnualInterpretationFacts | MonthlyInterpretationFacts,
  responseBodyHash: string,
  semanticSource: Pick<OfficialReadingSemanticSourceHandoff, 'snapshotId' | 'semanticHash'> & {
    readonly units: readonly Pick<
      OfficialReadingSemanticSourceUnitHandoff,
      'unitId' | 'factRefs'
    >[];
  },
  grounding: Pick<CharacterGroundingBundleV2, 'sourceSemanticHash'> & {
    readonly units: readonly Pick<
      CharacterGroundingUnitV2,
      'unitId' | 'sourceCanonicalUnitRefs' | 'narrativeRole' | 'realizationPolicyRef'
    >[];
  },
): OfficialTemporalReaderSource | undefined {
  const evidence = buildTemporalReaderEvidence(snapshot, facts, responseBodyHash);
  if (
    evidence === undefined ||
    evidence.referenceSegmentId === null ||
    semanticSource.snapshotId !== evidence.snapshotId ||
    semanticSource.semanticHash !== grounding.sourceSemanticHash
  ) {
    return undefined;
  }
  const calendar = {
    version: evidence.version,
    snapshotId: evidence.snapshotId,
    calculationHash: evidence.calculationHash,
    responseBodyHash: evidence.responseBodyHash,
    scope: evidence.scope,
    targetYear: evidence.targetYear,
    ...('targetMonth' in evidence ? { targetMonth: evidence.targetMonth } : {}),
    timeZone: evidence.timeZone,
    referenceDateTime: evidence.referenceDateTime,
    referenceSegmentId: evidence.referenceSegmentId,
    intervalConvention: evidence.intervalConvention,
    boundary: evidence.boundary,
    segments: evidence.segments,
    dayunOverlap: evidence.dayunOverlap,
    dayunDisclosureVersion: 'calculated_overlap_v1',
  } satisfies ReaderCalendarFacts;
  const sourceById = new Map(semanticSource.units.map((unit) => [unit.unitId, unit]));
  const primaryCoverage = new Set<string>();
  const unitWindows = grounding.units.flatMap((unit) => {
    const observed = new Set(
      unit.sourceCanonicalUnitRefs.flatMap(
        (ref) =>
          sourceById
            .get(ref)
            ?.factRefs.flatMap((path) => segmentForFact(path, calendar.scope) ?? []) ?? [],
      ),
    );
    const segmentIds = calendar.segments
      .map((segment) => segment.id)
      .filter((id) => observed.has(id));
    if (unit.narrativeRole === 'primary' && unit.realizationPolicyRef !== 'protected_only_v1') {
      segmentIds.forEach((id) => primaryCoverage.add(id));
    }
    return segmentIds.length === 0 ? [] : [{ unitId: unit.unitId, segmentIds }];
  });
  if (calendar.segments.some((segment) => !primaryCoverage.has(segment.id))) return undefined;
  return { calendar, unitWindows };
}
