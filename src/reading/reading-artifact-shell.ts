import type {
  CanonicalSajuSnapshot,
  PillarFact,
} from '../contracts/calculation.js';
import type { FactState } from '../contracts/common.js';
import type { ReadingArtifact } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';

export interface ReadingArtifactShellOptions {
  displayLabel?: string;
}

export type ReadingArtifactShell = Pick<
  ReadingArtifact,
  'brand' | 'subject' | 'calculationSummary'
>;

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

function displayDate(snapshot: CanonicalSajuSnapshot): string {
  const { year, month, day } = snapshot.input.date;
  return `${year}-${pad(month)}-${pad(day)}`;
}

function displayTime(snapshot: CanonicalSajuSnapshot): string | undefined {
  if (!snapshot.input.time.known) return undefined;
  return `${pad(snapshot.input.time.hour)}:${pad(snapshot.input.time.minute)}`;
}

function formatPillar(value: PillarFact): string {
  return `${value.stem.value}${value.branch.value} (${value.stem.hanja}${value.branch.hanja})`;
}

function pillarDisplayFact(
  label: string,
  state: FactState<PillarFact>,
): ReadingArtifact['calculationSummary']['pillars']['year'] {
  if (state.status === 'resolved') {
    return { label, value: formatPillar(state.value), status: 'resolved' };
  }
  if (state.status === 'ambiguous') {
    const values = [...new Set(state.candidates.map((candidate) => formatPillar(candidate.value)))];
    return {
      label,
      ...(values.length === 0 ? {} : { value: values.join(' / ') }),
      status: 'ambiguous',
    };
  }
  return { label, status: 'unavailable' };
}

function calculationState(
  snapshot: CanonicalSajuSnapshot,
): ReadingArtifact['subject']['calculationState'] {
  if (snapshot.completeness.fullyResolved) return 'resolved';
  if (snapshot.completeness.resolvedPaths.length > 0) return 'partially_ambiguous';
  return 'insufficient_input';
}

function ambiguityViews(snapshot: CanonicalSajuSnapshot) {
  return snapshot.completeness.ambiguousPaths.map((path) => ({
    ambiguityId: `ambiguity_${deterministicContentHash({
      snapshotId: snapshot.snapshotId,
      path,
    }).slice(0, 16)}`,
    title: '계산 불확실성',
    summary: '입력 정보 또는 계산 경계 때문에 이 항목은 하나의 값으로 확정되지 않았습니다.',
    affectedPaths: [path],
  }));
}

export function buildReadingArtifactShell(
  snapshot: CanonicalSajuSnapshot,
  options: ReadingArtifactShellOptions = {},
): ReadingArtifactShell {
  const time = displayTime(snapshot);
  const ambiguity = ambiguityViews(snapshot);
  return {
    brand: { brandId: 'myeonghwa', displayName: '명화' },
    subject: {
      ...(options.displayLabel === undefined ? {} : { displayLabel: options.displayLabel }),
      birthInputDisplay: {
        calendarType: snapshot.input.calendarType,
        date: displayDate(snapshot),
        ...(time === undefined ? {} : { time }),
        timeKnown: snapshot.input.time.known,
        ...(snapshot.input.calendarType === 'lunar'
          ? { leapMonth: snapshot.input.isLeapMonth ?? false }
          : {}),
        ...(snapshot.input.birthplace?.label === undefined
          ? {}
          : { birthplaceLabel: snapshot.input.birthplace.label }),
      },
      calculationState: calculationState(snapshot),
    },
    calculationSummary: {
      pillars: {
        year: pillarDisplayFact('년주', snapshot.pillars.year),
        month: pillarDisplayFact('월주', snapshot.pillars.month),
        day: pillarDisplayFact('일주', snapshot.pillars.day),
        hour: pillarDisplayFact('시주', snapshot.pillars.hour),
      },
      ...(ambiguity.length === 0 ? {} : { ambiguity }),
    },
  };
}
