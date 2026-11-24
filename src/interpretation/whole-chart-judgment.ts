import { getBranchTenGod, getTenGod } from 'manseryeok';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  HeavenlyStem,
  PillarSlot,
  TenGod,
} from '../contracts/calculation.js';
import {
  classicalDirectedPunishmentDirection,
  isClassicalSixHarmBranchPair,
  T10_CLASSICAL_SIX_HARM_SOURCE,
  T10_CLASSICAL_THREE_PUNISHMENTS_SOURCE,
} from '../research/compatibility-t10-direct-day-comparison.js';
import { deriveGeneralNatalSourceScopedBranchBreakCandidates } from '../research/general-natal-source-scoped-branch-break.js';
import { buildSajuR34StrengthRootSubstrate } from '../research/saju-r34-strength-root-substrate.js';
import { deterministicContentHash } from './rule-registry.js';

export const WHOLE_CHART_JUDGMENT_VERSION = 'whole-chart-judgment-v3';
export const TEN_GOD_FAMILY = {
  비견: 'peer',
  겁재: 'peer',
  식신: 'output',
  상관: 'output',
  정재: 'wealth',
  편재: 'wealth',
  정관: 'officer',
  편관: 'officer',
  정인: 'resource',
  편인: 'resource',
} as const satisfies Record<TenGod, string>;
export type TenGodFamily = (typeof TEN_GOD_FAMILY)[TenGod];
const SLOTS = ['year', 'month', 'day', 'hour'] as const;
const SELF_PUNISHMENT = new Set<EarthlyBranch>(['진', '오', '유', '해']);
const PATTERN_SOURCE = 'https://www.donglishuzhai.net/chapter/3722.html';
const SEASON_SOURCE = 'https://www.donglishuzhai.net/chapter/3719.html';
const MONTH_SOURCE = 'https://www.donglishuzhai.net/chapter/3721.html';
const SELECTION_SOURCE = 'https://www.donglishuzhai.net/chapter/3723.html';
const OFFICER_SOURCE = 'https://m.donglishuzhai.net/chapter/3744.html';
const STRESS_SOURCE = 'https://www.donglishuzhai.net/chapter/3740.html';
const FOOD_WEALTH_SOURCE = 'https://www.donglishuzhai.net/chapter/3750.html';
const FUYI_SOURCE = 'https://ncc.com.tw/fate/paleo/bg/bg_033.htm';
const SPOUSE_SOURCE =
  'https://www.shidianguji.com/zh/book/NGJ892411999032112149610/chapter/1lqbsmhhckpvt';
const STORAGE_BRANCHES: readonly EarthlyBranch[] = ['진', '술', '축', '미'];

export interface JudgmentEvidence {
  rule: string;
  paths: readonly string[];
  sources: readonly string[];
}
export interface TenGodPosition {
  slot: PillarSlot;
  stem: HeavenlyStem;
  god: TenGod;
  location: 'visible' | 'hidden';
  path: string;
}
export interface ChartContact {
  kind: 'combination' | 'clash' | 'punishment' | 'harm' | 'break' | 'meeting' | 'stem_combination';
  slots: readonly PillarSlot[];
  direction?: string;
  evidence: JudgmentEvidence;
}

interface PatternClause {
  /** Exact kinds preserve the difference between Food God and Hurting Officer, Direct Officer and Seven Killings. */
  follows: readonly TenGod[];
  challenges: readonly TenGod[];
  remedy: readonly TenGod[];
  supportRule: string;
  pressureRule: string;
  repairRule?: string;
}
const WEALTH_GODS = ['정재', '편재'] as const;
const RESOURCE_GODS = ['정인', '편인'] as const;
const CLAUSES: Partial<Record<TenGod, PatternClause>> = {
  식신: {
    follows: WEALTH_GODS,
    challenges: ['편인', '편관'],
    remedy: WEALTH_GODS,
    supportRule: 'food-generates-wealth',
    pressureRule: 'food-meets-owl-or-exposes-kill',
    repairRule: 'wealth-protects-food',
  },
  상관: {
    follows: WEALTH_GODS,
    challenges: ['정관', '편관'],
    remedy: RESOURCE_GODS,
    supportRule: 'hurting-officer-generates-wealth',
    pressureRule: 'hurting-officer-meets-officer-or-kill',
    repairRule: 'hurting-officer-uses-rooted-seal',
  },
  정관: {
    follows: [...WEALTH_GODS, ...RESOURCE_GODS],
    challenges: ['상관', '편관'],
    remedy: RESOURCE_GODS,
    supportRule: 'officer-meets-wealth-or-seal',
    pressureRule: 'officer-meets-hurting-or-mixes-with-kill',
    repairRule: 'seal-controls-hurting-protects-officer',
  },
  편관: {
    follows: ['식신'],
    challenges: WEALTH_GODS,
    remedy: [],
    supportRule: 'food-restrains-kill',
    pressureRule: 'wealth-supports-kill',
  },
  정재: {
    follows: ['식신', '정관'],
    challenges: ['겁재', '편관'],
    remedy: ['식신', '정관'],
    supportRule: 'wealth-fed-by-food-or-feeds-officer',
    pressureRule: 'wealth-meets-robwealth-or-kill',
    repairRule: 'food-transforms-robwealth',
  },
  편재: {
    follows: ['식신', '정관'],
    challenges: ['겁재', '편관'],
    remedy: ['식신', '정관'],
    supportRule: 'wealth-fed-by-food-or-feeds-officer',
    pressureRule: 'wealth-meets-robwealth-or-kill',
    repairRule: 'food-transforms-robwealth',
  },
  정인: {
    follows: ['정관', '편관'],
    challenges: WEALTH_GODS,
    remedy: ['겁재'],
    supportRule: 'officer-or-kill-generates-seal',
    pressureRule: 'wealth-controls-seal',
    repairRule: 'robwealth-protects-seal',
  },
  편인: {
    follows: ['정관', '편관'],
    challenges: WEALTH_GODS,
    remedy: ['겁재'],
    supportRule: 'officer-or-kill-generates-seal',
    pressureRule: 'wealth-controls-seal',
    repairRule: 'robwealth-protects-seal',
  },
};
const CONTACT_KIND = {
  branch_six_combination: 'combination',
  branch_three_combination: 'meeting',
  branch_clash: 'clash',
  stem_five_combination: 'stem_combination',
} as const;
const DISRUPTIVE: readonly ChartContact['kind'][] = ['clash', 'punishment', 'harm', 'break'];
const ROOT_CONTEST: readonly ChartContact['kind'][] = [...DISRUPTIVE, 'combination', 'meeting'];

function hasContact(
  contacts: readonly ChartContact[],
  slot: PillarSlot,
  kinds: readonly ChartContact['kind'][],
) {
  return contacts.some(({ kind, slots }) => slots.includes(slot) && kinds.includes(kind));
}

function chartContacts(snapshot: CanonicalSajuSnapshot): ChartContact[] {
  const native = snapshot.derivedFacts.structuralRelations;
  const contacts: ChartContact[] =
    native?.status === 'resolved'
      ? native.value.map((relation) => ({
          kind: CONTACT_KIND[relation.kind],
          slots: relation.participants.map(({ pillar }) => pillar),
          evidence: {
            rule: relation.relationId,
            paths: ['derivedFacts.structuralRelations'],
            sources: relation.sourceIds,
          },
        }))
      : [];
  const branches = SLOTS.flatMap((slot) => {
    const state = snapshot.pillars[slot];
    return state.status === 'resolved' ? [{ slot, branch: state.value.branch.value }] : [];
  });
  for (const [index, left] of branches.entries()) {
    for (const right of branches.slice(index + 1)) {
      const direction = classicalDirectedPunishmentDirection(left.branch, right.branch);
      const self = left.branch === right.branch && SELF_PUNISHMENT.has(left.branch);
      const paths = [`pillars.${left.slot}`, `pillars.${right.slot}`];
      const slots = [left.slot, right.slot];
      if (direction || self) {
        contacts.push({
          kind: 'punishment',
          slots,
          direction: direction ?? 'self',
          evidence: {
            rule: direction ? 'directed-branch-punishment' : 'repeated-self-punishment',
            paths,
            sources: [T10_CLASSICAL_THREE_PUNISHMENTS_SOURCE.sourceId],
          },
        });
      }
      if (isClassicalSixHarmBranchPair(left.branch, right.branch)) {
        contacts.push({
          kind: 'harm',
          slots,
          evidence: {
            rule: 'classical-six-harm',
            paths,
            sources: [T10_CLASSICAL_SIX_HARM_SOURCE.sourceId],
          },
        });
      }
    }
  }
  const breakInput = Object.fromEntries(
    branches.map(({ slot, branch }) => [slot, { branch: { value: branch } }]),
  );
  for (const relation of deriveGeneralNatalSourceScopedBranchBreakCandidates(breakInput)) {
    const slots = relation.participants.map(({ pillar }) => pillar);
    contacts.push({
      kind: 'break',
      slots,
      evidence: {
        rule: relation.relationId,
        paths: slots.map((slot) => `pillars.${slot}`),
        sources: relation.sourceIds,
      },
    });
  }
  return contacts;
}

function positionInventory(
  snapshot: CanonicalSajuSnapshot,
  dayMaster: HeavenlyStem,
): TenGodPosition[] {
  return SLOTS.flatMap((slot) => {
    const pillar = snapshot.pillars[slot];
    const hidden = snapshot.derivedFacts.hiddenStems?.[slot];
    const position = (
      stem: HeavenlyStem,
      location: TenGodPosition['location'],
      path: string,
    ): TenGodPosition => ({ slot, stem, god: getTenGod(dayMaster, stem), location, path });
    return [
      ...(slot !== 'day' && pillar.status === 'resolved'
        ? [position(pillar.value.stem.value, 'visible', `pillars.${slot}`)]
        : []),
      ...(hidden?.status === 'resolved'
        ? hidden.value.map((stem, index) =>
            position(stem, 'hidden', `derivedFacts.hiddenStems.${slot}.value.${index}`),
          )
        : []),
    ];
  });
}

function isSupporting(god: TenGod) {
  const family = TEN_GOD_FAMILY[god];
  return family === 'peer' || family === 'resource';
}

function thematicStructures(
  snapshot: CanonicalSajuSnapshot,
  positions: readonly TenGodPosition[],
  contacts: readonly ChartContact[],
) {
  const traditionalSex = snapshot.input.sexForTraditionalCalculation;
  const partnerFamily =
    traditionalSex === 'male' ? 'wealth' : traditionalSex === 'female' ? 'officer' : undefined;
  const spouseWitnesses = partnerFamily
    ? positions.filter(({ god }) => TEN_GOD_FAMILY[god] === partnerFamily)
    : [];
  const wealthInStorage = positions.filter(({ slot, god, location }) => {
    const pillar = snapshot.pillars[slot];
    return (
      location === 'hidden' &&
      TEN_GOD_FAMILY[god] === 'wealth' &&
      pillar.status === 'resolved' &&
      STORAGE_BRANCHES.includes(pillar.value.branch.value)
    );
  });
  return {
    relationship: {
      dayBranchContacts: contacts.filter(
        ({ slots, kind }) => slots.includes('day') && kind !== 'stem_combination',
      ),
      spouseFamily: partnerFamily,
      spouseWitnesses,
      evidence: {
        rule: 'traditional-spouse-star-observation',
        paths: [
          'input.sexForTraditionalCalculation',
          'pillars.day',
          ...spouseWitnesses.map(({ path }) => path),
        ],
        sources: [SPOUSE_SOURCE],
      },
    },
    wealth: {
      wealthInStorage,
      storageContacts: contacts.filter(({ slots }) =>
        wealthInStorage.some(({ slot }) => slots.includes(slot)),
      ),
      evidence: {
        rule: 'storage-branch-containing-wealth-stem',
        paths: wealthInStorage.flatMap(({ slot, path }) => [`pillars.${slot}`, path]),
        sources: [SEASON_SOURCE],
      },
    },
  } as const;
}

function assessStrength(
  snapshot: CanonicalSajuSnapshot,
  monthGod: TenGod,
  positions: readonly TenGodPosition[],
  contacts: readonly ChartContact[],
) {
  const rootSubstrate = buildSajuR34StrengthRootSubstrate(snapshot);
  const rootSlots =
    rootSubstrate.status === 'resolved'
      ? SLOTS.filter((slot) => rootSubstrate.substrate.rootTopology[slot].intrinsicTonggen)
      : [];
  const contestedRootSlots = rootSlots.filter((slot) => hasContact(contacts, slot, ROOT_CONTEST));
  const availableRoots = rootSlots.filter((slot) => !contestedRootSlots.includes(slot));
  const visible = positions.filter(({ location }) => location === 'visible');
  const grounded = visible.flatMap((position) => {
    const roots = positions.filter(
      ({ stem, location, slot }) =>
        stem === position.stem &&
        location === 'hidden' &&
        !hasContact(contacts, slot, ROOT_CONTEST),
    );
    return roots.length ? [{ position, roots }] : [];
  });
  const groundedPressure = grounded.filter(({ position }) => !isSupporting(position.god));
  const groundedSupport = grounded.filter(({ position }) => isSupporting(position.god));
  const hasSubstrate = availableRoots.length > 0 || groundedSupport.length > 0;
  const seasonalSupport = isSupporting(monthGod);
  const state =
    rootSubstrate.status !== 'resolved'
      ? 'unresolved'
      : hasSubstrate && groundedPressure.length
        ? 'support_and_pressure'
        : contestedRootSlots.length
          ? hasSubstrate
            ? 'independent_support_with_contested_roots'
            : 'contested_roots'
          : availableRoots.length
            ? seasonalSupport
              ? 'season_and_roots_support'
              : 'roots_offset_season'
            : groundedSupport.length
              ? 'grounded_visible_support'
              : seasonalSupport
                ? 'season_support_only'
                : groundedPressure.length
                  ? 'season_and_grounded_pressure'
                  : 'unresolved';
  const evidence: JudgmentEvidence = {
    rule: 'season-compared-with-intrinsic-roots-and-grounded-visible-pressure',
    paths: [
      'derivedFacts.dayMaster',
      'pillars.month',
      'derivedFacts.structuralRelations',
      ...rootSlots.map((slot) => `derivedFacts.hiddenStems.${slot}`),
      ...contacts
        .filter(
          ({ kind, slots }) =>
            ROOT_CONTEST.includes(kind) && slots.some((slot) => rootSlots.includes(slot)),
        )
        .flatMap(({ evidence }) => evidence.paths),
      ...grounded.flatMap(({ position, roots }) => [
        position.path,
        ...roots.map(({ path }) => path),
      ]),
    ],
    sources: [SEASON_SOURCE],
  };
  return {
    state,
    seasonalSupport,
    rootSlots,
    contestedRootSlots,
    availableRoots,
    groundedSupport,
    groundedPressure,
    evidence,
  } as const;
}

function resolveOfficerRepair(
  anchor: TenGodPosition | undefined,
  challenges: readonly TenGodPosition[],
  remedies: readonly TenGodPosition[],
  visible: readonly TenGodPosition[],
  contacts: readonly ChartContact[],
  strength: ReturnType<typeof assessStrength>,
) {
  // 官逢傷，透印以解之 and 官格透傷用印又忌見財.
  // Keep this source clause local to the officer/Seal relation and preserve unrelated damage.
  const damage = challenges[0];
  if (anchor?.god !== '정관' || challenges.length !== 1 || damage?.god !== '상관') {
    return { state: 'not_applicable' } as const;
  }
  const groundedRemedies = strength.groundedSupport.filter(({ position }) =>
    remedies.includes(position),
  );
  const competingWealth = visible.filter(({ god }) => TEN_GOD_FAMILY[god] === 'wealth');
  const effectiveRemedies = hasContact(contacts, damage.slot, ['stem_combination'])
    ? []
    : groundedRemedies
        .filter(({ position }) => !hasContact(contacts, position.slot, ['stem_combination']))
        .map(({ position }) => position);
  const evidence: JudgmentEvidence = {
    rule: 'officer-hurting-officer-seal-protection',
    paths: [
      anchor.path,
      damage.path,
      ...remedies.map(({ path }) => path),
      ...groundedRemedies.flatMap(({ roots }) => roots.map(({ path }) => path)),
      ...competingWealth.map(({ path }) => path),
      'derivedFacts.structuralRelations',
    ],
    sources: [PATTERN_SOURCE, OFFICER_SOURCE],
  };
  if (!remedies.length) return { state: 'not_applicable' } as const;
  if (competingWealth.length) return { state: 'competing_wealth', evidence } as const;
  if (!effectiveRemedies.length)
    return { state: 'grounding_or_combination_unsettled', evidence } as const;
  return { state: 'local_protection', remedies: effectiveRemedies, evidence } as const;
}

function qualifyPatternSupport(
  anchor: TenGodPosition | undefined,
  clause: PatternClause | undefined,
  positions: readonly TenGodPosition[],
  contacts: readonly ChartContact[],
) {
  const allowed = clause?.follows ?? [];
  const hidden = positions.filter(
    ({ location, god }) => location === 'hidden' && allowed.includes(god),
  );
  const visible = positions.filter(
    ({ location, god }) => location === 'visible' && allowed.includes(god),
  );
  const needsRoot = anchor?.god === '식신';
  const witnesses = visible.map((position) => {
    const roots = hidden.filter(({ stem }) => stem === position.stem);
    const independentRoots = roots.filter(({ slot }) => !hasContact(contacts, slot, ROOT_CONTEST));
    const state = hasContact(contacts, position.slot, ['stem_combination'])
      ? 'combination_review'
      : independentRoots.length
        ? 'exposed_with_independent_root'
        : roots.length
          ? 'root_under_review'
          : 'exposed_without_same_stem_root';
    return { position, roots, independentRoots, state } as const;
  });
  const active = witnesses
    .filter(
      ({ state }) =>
        state === 'exposed_with_independent_root' ||
        (!needsRoot && state === 'exposed_without_same_stem_root'),
    )
    .map(({ position }) => position);
  const concealed = hidden.filter(
    ({ stem, slot }) =>
      !visible.some((position) => position.stem === stem) &&
      !hasContact(contacts, slot, ROOT_CONTEST),
  );
  const contestedEvidence = contacts
    .filter(
      ({ kind, slots }) =>
        (kind === 'stem_combination' && visible.some(({ slot }) => slots.includes(slot))) ||
        (ROOT_CONTEST.includes(kind) && hidden.some(({ slot }) => slots.includes(slot))),
    )
    .map(({ evidence }) => evidence);
  const evidence: JudgmentEvidence = {
    rule: needsRoot ? 'food-wealth-requires-wealth-root' : 'compare-exposed-and-hidden-support',
    paths: [
      ...new Set([
        ...visible.map(({ path }) => path),
        ...hidden.map(({ path }) => path),
        'derivedFacts.structuralRelations',
        ...contestedEvidence.flatMap(({ paths }) => paths),
      ]),
    ],
    sources: [
      ...new Set([
        STRESS_SOURCE,
        ...(needsRoot ? [FOOD_WEALTH_SOURCE] : []),
        ...contestedEvidence.flatMap(({ sources }) => sources),
      ]),
    ],
  };
  return { active, concealed, witnesses, needsRoot, evidence } as const;
}

function assessPattern(
  month: readonly TenGodPosition[],
  monthGod: TenGod,
  visible: readonly TenGodPosition[],
  positions: readonly TenGodPosition[],
  contacts: readonly ChartContact[],
  strength: ReturnType<typeof assessStrength>,
  allResolved: boolean,
) {
  const exposed = month.filter((position) => visible.some(({ stem }) => stem === position.stem));
  const monthContacts = contacts.filter(
    ({ slots, kind }) => slots.includes('month') && kind !== 'stem_combination',
  );
  const competingMeeting = monthContacts.some(({ kind }) => kind === 'meeting');
  const candidates = exposed.length ? exposed : month;
  const anchor =
    allResolved &&
    !competingMeeting &&
    candidates.length === 1 &&
    (exposed.length === 1 || month.length === 1)
      ? candidates[0]
      : undefined;
  const selection: JudgmentEvidence = {
    rule: 'month-membership-and-exact-transparency',
    paths: [
      ...month.map(({ path }) => path),
      ...visible
        .filter(({ stem }) => month.some((position) => position.stem === stem))
        .map(({ path }) => path),
    ],
    sources: [MONTH_SOURCE, SELECTION_SOURCE],
  };
  const selectionMode = !anchor
    ? 'held'
    : anchor.god !== monthGod
      ? 'exposed_secondary_month_role'
      : exposed.length
        ? 'exposed_representative_month_role'
        : 'single_hidden_month_role';
  const clause = anchor && CLAUSES[anchor.god];
  const supportContext = qualifyPatternSupport(anchor, clause, positions, contacts);
  const supports = supportContext.active;
  const challenges = clause ? visible.filter(({ god }) => clause.challenges.includes(god)) : [];
  const disrupting = monthContacts.filter(({ kind }) => DISRUPTIVE.includes(kind));
  const anchorBound =
    !!anchor &&
    contacts.some(
      ({ kind, slots }) =>
        kind === 'stem_combination' &&
        visible.some(({ slot, stem }) => stem === anchor.stem && slots.includes(slot)),
    );
  // A remedy is considered only for the matching disturbance. A second disturbance can still prevent settlement.
  const repairApplicable =
    !!anchor &&
    challenges.some(
      ({ god }) =>
        (anchor.god === '식신' && god === '편인') ||
        (anchor.god === '상관' && god === '정관') ||
        (anchor.god === '정관' && god === '상관') ||
        (TEN_GOD_FAMILY[anchor.god] === 'wealth' && god === '겁재') ||
        TEN_GOD_FAMILY[anchor.god] === 'resource',
    );
  const remedies =
    clause && repairApplicable ? visible.filter(({ god }) => clause.remedy.includes(god)) : [];
  const officerRepair = resolveOfficerRepair(
    anchor,
    challenges,
    remedies,
    visible,
    contacts,
    strength,
  );
  const localProtection = officerRepair.state === 'local_protection';
  const requiresBodySupport = anchor?.god === '편관';
  const bodySupportsClause = strength.state === 'season_and_roots_support';
  const state = !allResolved
    ? 'unresolved'
    : competingMeeting || candidates.length > 1
      ? 'competing_month_signals'
      : !anchor || !clause
        ? 'candidate_only'
        : localProtection && !disrupting.length && !anchorBound
          ? 'locally_protected'
          : remedies.length
            ? 'repair_under_review'
            : challenges.length || disrupting.length || anchorBound
              ? 'challenged'
              : requiresBodySupport && !bodySupportsClause
                ? 'strength_required'
                : supports.length
                  ? 'supported'
                  : 'candidate_only';
  return {
    state,
    anchor,
    candidates,
    supports,
    supportContext,
    challenges,
    remedies,
    disrupting,
    selectionMode,
    officerRepair,
    selection,
    evidence: {
      rule:
        state === 'repair_under_review' || state === 'locally_protected'
          ? (clause?.repairRule ?? 'unsettled-remedy')
          : state === 'challenged'
            ? (clause?.pressureRule ?? 'month-contact')
            : (clause?.supportRule ?? 'unsettled-month-structure'),
      paths: [
        ...new Set([
          ...selection.paths,
          ...(requiresBodySupport ? strength.evidence.paths : []),
          ...supports.map(({ path }) => path),
          ...supportContext.evidence.paths,
          ...challenges.map(({ path }) => path),
          ...remedies.map(({ path }) => path),
          ...('evidence' in officerRepair ? officerRepair.evidence.paths : []),
          ...monthContacts.flatMap(({ evidence }) => evidence.paths),
        ]),
      ],
      sources: [
        PATTERN_SOURCE,
        ...supportContext.evidence.sources,
        ...('evidence' in officerRepair ? officerRepair.evidence.sources : []),
        ...(requiresBodySupport ? strength.evidence.sources : []),
        ...new Set(monthContacts.flatMap(({ evidence }) => evidence.sources)),
      ],
    },
  } as const;
}

/** A deterministic interpretation of one canonical chart. Methods with unresolved predicates retain their reasons. */
export function judgeWholeChart(snapshot: CanonicalSajuSnapshot) {
  const day = snapshot.derivedFacts.dayMaster;
  const month = snapshot.pillars.month;
  const common = {
    version: WHOLE_CHART_JUDGMENT_VERSION,
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
  } as const;
  if (day.status !== 'resolved' || month.status !== 'resolved') {
    return { ...common, state: 'unavailable', reason: 'unresolved_day_master_or_month' } as const;
  }
  const positions = positionInventory(snapshot, day.value.value);
  const contacts = chartContacts(snapshot);
  const allResolved =
    SLOTS.every(
      (slot) =>
        snapshot.pillars[slot].status === 'resolved' &&
        snapshot.derivedFacts.hiddenStems?.[slot].status === 'resolved',
    ) && snapshot.derivedFacts.structuralRelations?.status === 'resolved';
  const visible = positions.filter(({ location }) => location === 'visible');
  const monthGod = getBranchTenGod(day.value.value, month.value.branch.value);
  const strength = assessStrength(snapshot, monthGod, positions, contacts);
  const pattern = assessPattern(
    positions.filter(({ slot, location }) => slot === 'month' && location === 'hidden'),
    monthGod,
    visible,
    positions,
    contacts,
    strength,
    allResolved,
  );
  const themes = thematicStructures(snapshot, positions, contacts);
  const supported = pattern.state === 'supported' || pattern.state === 'locally_protected';
  const effectiveSupports =
    pattern.state === 'locally_protected' && pattern.officerRepair.state === 'local_protection'
      ? pattern.officerRepair.remedies
      : pattern.supports;
  const fuyi =
    strength.state === 'season_and_roots_support'
      ? {
          status: 'conditional_direction',
          direction: 'regulate_or_drain',
          families: ['officer', 'output'],
        }
      : strength.state === 'season_and_grounded_pressure' &&
          allResolved &&
          positions.every(({ god }) => !isSupporting(god))
        ? { status: 'conditional_direction', direction: 'support', families: ['peer', 'resource'] }
        : { status: 'held_pending_relative_strength' };
  const methodConflict =
    supported &&
    fuyi.status === 'conditional_direction' &&
    effectiveSupports.some(({ god }) =>
      fuyi.direction === 'support' ? !isSupporting(god) : isSupporting(god),
    );
  const roleEvidence: JudgmentEvidence = {
    rule: 'keep-month-pattern-and-body-regulation-distinct-on-conflict',
    paths: [...new Set([...pattern.evidence.paths, ...strength.evidence.paths])],
    sources: [PATTERN_SOURCE, SEASON_SOURCE, FUYI_SOURCE],
  };
  // An established structural support can still be unsuitable for regulating the body.
  const roles = {
    method: 'month_pattern',
    yong: pattern.anchor,
    xi: supported && !methodConflict ? effectiveSupports : [],
    ji: pattern.state === 'locally_protected' ? [] : pattern.challenges,
    repair: pattern.remedies,
    fuyi,
    status: methodConflict ? 'competing_methods' : supported ? 'conditional_pattern_roles' : 'held',
    evidence: roleEvidence,
  } as const;
  const material = {
    ...common,
    state: 'observed' as const,
    allResolved,
    month: { branch: month.value.branch.value, god: monthGod },
    positions,
    contacts,
    strength,
    pattern,
    roles,
    themes,
  };
  return { ...material, judgmentId: deterministicContentHash(material) };
}

export type WholeChartJudgment = ReturnType<typeof judgeWholeChart>;
export type ObservedWholeChart = Extract<WholeChartJudgment, { state: 'observed' }>;
