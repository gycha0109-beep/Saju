import {
  getEarthlyBranchElement,
  getEarthlyBranchYinYang,
  getHeavenlyStemElement,
  getHeavenlyStemYinYang,
} from 'manseryeok';
import { deriveStructuralRelationCandidates } from '../calculation/structural-relations.js';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  FiveElement,
  HeavenlyStem,
  PillarFact,
  PillarSlot,
  TenGod,
  YinYang,
} from '../contracts/calculation.js';
import { ambiguous, resolved, unavailable, type FactState } from '../contracts/common.js';
import type { TemporalReadingContext } from './temporal-reading-context.js';

export const ANNUAL_INTERPRETATION_FACTS_VERSION =
  'myeongha-annual-interpretation-facts-v1' as const;
export const ANNUAL_INTERPRETATION_POLICY_ID = 'myeongha-annual-interpretation-policy-v1' as const;

const STEM_HANJA: Readonly<Record<HeavenlyStem, string>> = {
  갑: '甲',
  을: '乙',
  병: '丙',
  정: '丁',
  무: '戊',
  기: '己',
  경: '庚',
  신: '辛',
  임: '壬',
  계: '癸',
};

const BRANCH_HANJA: Readonly<Record<EarthlyBranch, string>> = {
  자: '子',
  축: '丑',
  인: '寅',
  묘: '卯',
  진: '辰',
  사: '巳',
  오: '午',
  미: '未',
  신: '申',
  유: '酉',
  술: '戌',
  해: '亥',
};

const GENERATES: Readonly<Record<FiveElement, FiveElement>> = {
  목: '화',
  화: '토',
  토: '금',
  금: '수',
  수: '목',
};

const CONTROLS: Readonly<Record<FiveElement, FiveElement>> = {
  목: '토',
  화: '금',
  토: '수',
  금: '목',
  수: '화',
};

const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];

export type AnnualBranchRelationKind = 'clash' | 'none';

export interface AnnualBranchRelationValue {
  pillar: PillarSlot;
  natalBranch: EarthlyBranch;
  annualBranch: EarthlyBranch;
  relation: AnnualBranchRelationKind;
}

export interface AnnualInterpretationFacts {
  schemaVersion: typeof ANNUAL_INTERPRETATION_FACTS_VERSION;
  policyId: typeof ANNUAL_INTERPRETATION_POLICY_ID;
  scope: 'annual';
  targetYear: number;
  timeZone: 'Asia/Seoul';
  referenceDateTime: string;
  annualPillar: {
    stem: HeavenlyStem;
    branch: EarthlyBranch;
    cycleIndex: number;
  };
  annualStemTenGod: TenGod;
  annualBranchRelations: Readonly<Record<PillarSlot, FactState<AnnualBranchRelationValue>>>;
}

function annualPillarFact(stem: HeavenlyStem, branch: EarthlyBranch): PillarFact {
  return {
    stem: {
      value: stem,
      hanja: STEM_HANJA[stem],
      element: getHeavenlyStemElement(stem),
      yinYang: getHeavenlyStemYinYang(stem),
    },
    branch: {
      value: branch,
      hanja: BRANCH_HANJA[branch],
      element: getEarthlyBranchElement(branch),
      yinYang: getEarthlyBranchYinYang(branch),
    },
  };
}

function samePolarity(left: YinYang, right: YinYang): boolean {
  return left === right;
}

export function deriveAnnualStemTenGod(
  dayMaster: { element: FiveElement; yinYang: YinYang },
  annualStem: HeavenlyStem,
): TenGod {
  const annualElement = getHeavenlyStemElement(annualStem);
  const annualYinYang = getHeavenlyStemYinYang(annualStem);
  const same = samePolarity(dayMaster.yinYang, annualYinYang);

  if (annualElement === dayMaster.element) return same ? '비견' : '겁재';
  if (GENERATES[dayMaster.element] === annualElement) return same ? '식신' : '상관';
  if (CONTROLS[dayMaster.element] === annualElement) return same ? '편재' : '정재';
  if (CONTROLS[annualElement] === dayMaster.element) return same ? '편관' : '정관';
  if (GENERATES[annualElement] === dayMaster.element) return same ? '편인' : '정인';

  throw new Error(`Unsupported Five-Element relation ${dayMaster.element} -> ${annualElement}.`);
}

function branchRelation(
  slot: PillarSlot,
  natalPillar: PillarFact,
  annualPillar: PillarFact,
): AnnualBranchRelationValue {
  const relation = deriveStructuralRelationCandidates({
    year: annualPillar,
    month: natalPillar,
  }).some((candidate) => candidate.kind === 'branch_clash')
    ? 'clash'
    : 'none';

  return {
    pillar: slot,
    natalBranch: natalPillar.branch.value,
    annualBranch: annualPillar.branch.value,
    relation,
  };
}

function annualBranchRelationState(
  slot: PillarSlot,
  natalState: CanonicalSajuSnapshot['pillars'][PillarSlot],
  annualPillar: PillarFact,
): FactState<AnnualBranchRelationValue> {
  if (natalState.status === 'resolved') {
    return resolved(branchRelation(slot, natalState.value, annualPillar));
  }
  if (natalState.status === 'unavailable') {
    return unavailable(natalState.reasonCode);
  }

  const bySemanticValue = new Map<
    string,
    { value: AnnualBranchRelationValue; reasonRefs: Set<string> }
  >();
  for (const candidate of natalState.candidates) {
    const value = branchRelation(slot, candidate.value, annualPillar);
    const key = JSON.stringify(value);
    const existing = bySemanticValue.get(key);
    if (existing === undefined) {
      bySemanticValue.set(key, { value, reasonRefs: new Set(candidate.reasonRefs) });
    } else {
      for (const reasonRef of candidate.reasonRefs) existing.reasonRefs.add(reasonRef);
    }
  }

  const candidates = [...bySemanticValue.values()]
    .map(({ value, reasonRefs }, index) => ({
      candidateId: `annual-${slot}-relation-${index + 1}`,
      value,
      reasonRefs: [...reasonRefs].sort(),
    }))
    .sort((left, right) => JSON.stringify(left.value).localeCompare(JSON.stringify(right.value)));

  if (candidates.length === 1) return resolved(candidates[0]!.value);
  return ambiguous(candidates, natalState.reasonCodes);
}

export function buildAnnualInterpretationFacts(
  snapshot: CanonicalSajuSnapshot,
  temporalContext: TemporalReadingContext,
): AnnualInterpretationFacts {
  if (temporalContext.scope !== 'annual') {
    throw new RangeError('Annual interpretation facts require an annual temporal context.');
  }
  if (snapshot.derivedFacts.dayMaster.status !== 'resolved') {
    throw new RangeError('Annual interpretation facts require a resolved natal day master.');
  }

  const annualPillar = annualPillarFact(
    temporalContext.annualPillar.stem,
    temporalContext.annualPillar.branch,
  );
  const annualBranchRelations = Object.fromEntries(
    PILLAR_SLOTS.map((slot) => [
      slot,
      annualBranchRelationState(slot, snapshot.pillars[slot], annualPillar),
    ]),
  ) as Readonly<Record<PillarSlot, FactState<AnnualBranchRelationValue>>>;

  return {
    schemaVersion: ANNUAL_INTERPRETATION_FACTS_VERSION,
    policyId: ANNUAL_INTERPRETATION_POLICY_ID,
    scope: 'annual',
    targetYear: temporalContext.targetYear,
    timeZone: temporalContext.timeZone,
    referenceDateTime: temporalContext.referenceDateTime,
    annualPillar: temporalContext.annualPillar,
    annualStemTenGod: deriveAnnualStemTenGod(
      snapshot.derivedFacts.dayMaster.value,
      temporalContext.annualPillar.stem,
    ),
    annualBranchRelations,
  };
}
