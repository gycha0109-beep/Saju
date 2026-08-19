import { createHash } from 'node:crypto';
import { getVoidBranches } from 'manseryeok';
import { ambiguous, resolved, unavailable, type FactCandidate, type FactState } from '../contracts/common.js';
import type {
  CalculationScenario,
  CanonicalSajuSnapshot,
  EarthlyBranch,
  HeavenlyStem,
  HiddenStemChartFact,
  PillarFact,
} from '../contracts/calculation.js';

export const HIDDEN_STEM_MEMBERSHIP_VERSION = 'myeonghwa-hidden-stem-membership-v1';
export const ENRICHED_CANONICAL_SCHEMA_VERSION = 'saju-canonical-v1.1';

export const HIDDEN_STEM_MEMBERSHIP_SOURCE = Object.freeze({
  title: '淵海子平 — 又地支藏遁歌',
  url: 'https://zh.wikisource.org/wiki/%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3%E5%A4%A7%E5%85%A8',
  sourceType: 'classical_transcription',
  accessedAt: '2026-08-19',
  scope:
    'Branch-to-hidden-stem membership only. Canonical array order is a storage order and must not be interpreted as main/secondary/residual strength or month-command duration.',
});

const STEM_ORDER = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'] as const satisfies readonly HeavenlyStem[];

const RAW_HIDDEN_STEM_MEMBERSHIP: Readonly<Record<EarthlyBranch, readonly HeavenlyStem[]>> = {
  자: ['계'],
  축: ['기', '신', '계'],
  인: ['갑', '병', '무'],
  묘: ['을'],
  진: ['을', '무', '계'],
  사: ['병', '무', '경'],
  오: ['정', '기'],
  미: ['을', '정', '기'],
  신: ['무', '경', '임'],
  유: ['신'],
  술: ['정', '무', '신'],
  해: ['갑', '임'],
};

function canonicalStemOrder(stems: readonly HeavenlyStem[]): readonly HeavenlyStem[] {
  return Object.freeze(
    [...stems].sort((left, right) => STEM_ORDER.indexOf(left) - STEM_ORDER.indexOf(right)),
  );
}

export const HIDDEN_STEM_MEMBERSHIP: Readonly<Record<EarthlyBranch, readonly HeavenlyStem[]>> = Object.freeze(
  Object.fromEntries(
    Object.entries(RAW_HIDDEN_STEM_MEMBERSHIP).map(([branch, stems]) => [branch, canonicalStemOrder(stems)]),
  ) as Record<EarthlyBranch, readonly HeavenlyStem[]>,
);

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value === null || typeof value !== 'object') return value;
  const record = value as Record<string, unknown>;
  return Object.fromEntries(
    Object.keys(record)
      .sort()
      .filter((key) => record[key] !== undefined)
      .map((key) => [key, canonicalize(record[key])]),
  );
}

function stableSerialize(value: unknown): string {
  return JSON.stringify(canonicalize(value)) ?? 'undefined';
}

export const HIDDEN_STEM_MEMBERSHIP_CONTENT_HASH = createHash('sha256')
  .update(stableSerialize(HIDDEN_STEM_MEMBERSHIP))
  .digest('hex');

export function getHiddenStemMembership(branch: EarthlyBranch): readonly HeavenlyStem[] {
  return HIDDEN_STEM_MEMBERSHIP[branch];
}

function hiddenStemState(state: FactState<PillarFact>): FactState<readonly HeavenlyStem[]> {
  if (state.status === 'unavailable') return unavailable(state.reasonCode);
  if (state.status === 'resolved') return resolved(getHiddenStemMembership(state.value.branch.value));

  const unique = new Map<string, { value: readonly HeavenlyStem[]; reasonRefs: readonly string[] }>();
  for (const candidate of state.candidates) {
    const value = getHiddenStemMembership(candidate.value.branch.value);
    const key = value.join('|');
    if (!unique.has(key)) unique.set(key, { value, reasonRefs: candidate.reasonRefs });
  }

  const candidates = [...unique.values()];
  if (candidates.length === 0) return unavailable('hidden-stem-source-pillar-has-no-candidates');
  if (candidates.length === 1) {
    const only = candidates[0];
    if (only === undefined) throw new Error('hidden-stem candidate invariant failed');
    return resolved(only.value);
  }

  return ambiguous(
    candidates.map(
      (candidate): FactCandidate<readonly HeavenlyStem[]> => ({
        candidateId: `hidden-stems:${candidate.value.join('-')}`,
        value: candidate.value,
        reasonRefs: candidate.reasonRefs,
      }),
    ),
    state.reasonCodes,
  );
}

function hiddenStemChart(snapshot: CanonicalSajuSnapshot): HiddenStemChartFact {
  return {
    year: hiddenStemState(snapshot.pillars.year),
    month: hiddenStemState(snapshot.pillars.month),
    day: hiddenStemState(snapshot.pillars.day),
    hour: hiddenStemState(snapshot.pillars.hour),
  };
}

function pillarOverride(value: unknown): PillarFact | undefined {
  if (value === null || typeof value !== 'object') return undefined;
  const candidate = value as Partial<PillarFact>;
  if (candidate.branch?.value === undefined || candidate.stem?.value === undefined) return undefined;
  return candidate as PillarFact;
}

function enrichScenarioOverrides(
  scenario: CalculationScenario,
  newSnapshotId: string,
  scenarioIndex: number,
): CalculationScenario {
  const additional: CalculationScenario['factOverrides'][number][] = [];
  for (const override of scenario.factOverrides) {
    const match = /^pillars\.(year|month|day|hour)$/.exec(override.path);
    if (match === null) continue;
    const slot = match[1];
    if (slot === undefined) continue;
    const pillar = pillarOverride(override.value);
    if (pillar === undefined) continue;
    const stems = getHiddenStemMembership(pillar.branch.value);
    additional.push({
      path: `derivedFacts.hiddenStems.${slot}`,
      candidateId: `hidden-stems:${slot}:${stems.join('-')}`,
      value: stems,
    });

    if (slot === 'day') {
      additional.push(
        {
          path: 'derivedFacts.dayMaster',
          candidateId: `day-master:${pillar.stem.value}`,
          value: pillar.stem,
        },
        {
          path: 'derivedFacts.voidBranches',
          candidateId: `void-branches:${pillar.stem.value}${pillar.branch.value}`,
          value: [...getVoidBranches(pillar.stem.value, pillar.branch.value)],
        },
      );
    }
  }

  const deduplicated = new Map<string, CalculationScenario['factOverrides'][number]>();
  for (const override of [...scenario.factOverrides, ...additional]) {
    deduplicated.set(override.path, override);
  }

  return {
    ...scenario,
    scenarioId: `${newSnapshotId}:scenario:${scenarioIndex + 1}`,
    snapshotId: newSnapshotId,
    factOverrides: [...deduplicated.values()].sort((left, right) => left.path.localeCompare(right.path)),
  };
}

function enrichCompleteness(
  snapshot: CanonicalSajuSnapshot,
  hiddenStems: HiddenStemChartFact,
): CanonicalSajuSnapshot['completeness'] {
  const resolvedPaths = new Set(snapshot.completeness.resolvedPaths);
  const ambiguousPaths = new Set(snapshot.completeness.ambiguousPaths);
  const unavailablePaths = new Set(snapshot.completeness.unavailablePaths);

  for (const slot of ['year', 'month', 'day', 'hour'] as const) {
    const path = `derivedFacts.hiddenStems.${slot}`;
    resolvedPaths.delete(path);
    ambiguousPaths.delete(path);
    unavailablePaths.delete(path);
    const state = hiddenStems[slot];
    if (state.status === 'resolved') resolvedPaths.add(path);
    else if (state.status === 'ambiguous') ambiguousPaths.add(path);
    else unavailablePaths.add(path);
  }

  return {
    ...snapshot.completeness,
    fullyResolved: snapshot.completeness.fullyResolved && unavailablePaths.size === 0 && ambiguousPaths.size === 0,
    resolvedPaths: [...resolvedPaths].sort(),
    ambiguousPaths: [...ambiguousPaths].sort(),
    unavailablePaths: [...unavailablePaths].sort(),
  };
}

export function enrichCanonicalHiddenStems(snapshot: CanonicalSajuSnapshot): CanonicalSajuSnapshot {
  const hiddenStems = hiddenStemChart(snapshot);
  const calculationHash = createHash('sha256')
    .update(
      stableSerialize({
        baseCalculationHash: snapshot.calculationHash,
        schemaVersion: ENRICHED_CANONICAL_SCHEMA_VERSION,
        hiddenStemMembershipVersion: HIDDEN_STEM_MEMBERSHIP_VERSION,
        hiddenStemMembershipContentHash: HIDDEN_STEM_MEMBERSHIP_CONTENT_HASH,
      }),
    )
    .digest('hex');
  const snapshotId = `saju_${calculationHash.slice(0, 24)}`;
  const datasets = [
    ...(snapshot.provenance.datasets ?? []),
    {
      name: 'myeonghwa-hidden-stem-membership',
      version: HIDDEN_STEM_MEMBERSHIP_VERSION,
      source: HIDDEN_STEM_MEMBERSHIP_SOURCE.url,
      notes: `${HIDDEN_STEM_MEMBERSHIP_SOURCE.scope} contentHash=${HIDDEN_STEM_MEMBERSHIP_CONTENT_HASH}`,
    },
  ];

  return {
    ...snapshot,
    snapshotId,
    schemaVersion: ENRICHED_CANONICAL_SCHEMA_VERSION,
    calculationHash,
    derivedFacts: { ...snapshot.derivedFacts, hiddenStems },
    scenarios: snapshot.scenarios.map((scenario, index) =>
      enrichScenarioOverrides(scenario, snapshotId, index),
    ),
    completeness: enrichCompleteness(snapshot, hiddenStems),
    provenance: {
      ...snapshot.provenance,
      schema: { ...snapshot.provenance.schema, version: ENRICHED_CANONICAL_SCHEMA_VERSION },
      datasets,
    },
  };
}
