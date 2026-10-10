import {
  getEarthlyBranchElement,
  getEarthlyBranchYinYang,
  getHeavenlyStemElement,
  getHeavenlyStemYinYang,
} from 'manseryeok';
import {
  deriveStructuralRelationCandidates,
  STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH,
} from '../calculation/structural-relations.js';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  HeavenlyStem,
  PillarFact,
  PillarSlot,
  StructuralRelationKind,
  TenGod,
} from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { deriveAnnualStemTenGod } from '../reading/annual-interpretation-facts.js';
import { resolveDayunTemporalContext } from '../reading/dayun-temporal-context.js';
import {
  previewGeneralAnnualCalculatedFacts,
} from './general-annual-fact-only-preview.js';

export const GENERAL_ANNUAL_THREE_LAYER_CORPUS_VERSION =
  'sa7d-general-annual-three-layer-fact-corpus-v1' as const;

export type ThreeLayerPairKey =
  | 'annual:dayun'
  | 'annual:natal:year' | 'annual:natal:month' | 'annual:natal:day' | 'annual:natal:hour'
  | 'dayun:natal:year' | 'dayun:natal:month' | 'dayun:natal:day' | 'dayun:natal:hour';

export interface ThreeLayerPairMatch {
  pairKey: ThreeLayerPairKey;
  kind: Exclude<StructuralRelationKind, 'branch_three_combination'>;
  observedLeftStem: HeavenlyStem;
  observedRightStem: HeavenlyStem;
  observedLeftBranch: EarthlyBranch;
  observedRightBranch: EarthlyBranch;
  sourceIds: readonly string[];
  structuralMatchOnly: true;
  transformationEstablished: false;
  strengthOrOutcomeDetermined: false;
}

export interface ThreeLayerPairCheck {
  pairKey: ThreeLayerPairKey;
  checked: true;
  observedKinds: readonly ThreeLayerPairMatch['kind'][];
}

type UnavailableReason =
  | 'ANNUAL_FACTS_UNAVAILABLE'
  | 'DAYUN_CONTEXT_UNAVAILABLE'
  | 'DAYUN_MULTIPLE_SEGMENTS'
  | 'DAYUN_PARTIAL_YEAR_COVERAGE'
  | 'NATAL_PILLAR_UNRESOLVED';

export type ThreeLayerFactCorpusResult =
  | {
      state: 'research_three_layer_facts_only';
      corpusVersion: typeof GENERAL_ANNUAL_THREE_LAYER_CORPUS_VERSION;
      corpusHash: string;
      requestId: string;
      snapshotId: string;
      targetYear: number;
      effectiveYear: number;
      annualPillar: { stem: HeavenlyStem; branch: EarthlyBranch; cycleIndex: number };
      dayun: {
        contextId: string;
        segmentIndex: number;
        ageMarker: number;
        stem: HeavenlyStem;
        branch: EarthlyBranch;
        annualCoverageStart: string;
        annualCoverageEndExclusive: string;
      };
      natal: readonly {
        slot: PillarSlot;
        stem: HeavenlyStem;
        branch: EarthlyBranch;
      }[];
      computedTenGodRelations: {
        annualStemToNatalDayMaster: TenGod;
        dayunStemToNatalDayMaster: TenGod;
      };
      pairChecks: readonly ThreeLayerPairCheck[];
      pairMatches: readonly ThreeLayerPairMatch[];
      sourceBinding: {
        existingFourteenRuleDecisionHash: string;
        existingDayunContextId: string;
        structuralRelationDefinitionHash: string;
      };
      limits: {
        evidenceLayer: 'structural_pair_identity_only';
        natalBaselineUnchanged: true;
        multipleEffectsCombined: false;
        precedenceOrStrengthRankingAuthorized: false;
        tenGodMeaningAuthorized: false;
        mayGenerateAnnualInterpretation: false;
        mayRenderOfficialReading: false;
        mayCallModel: false;
        productionAuthorized: false;
      };
    }
  | {
      state: 'unavailable';
      reasonCode: UnavailableReason;
      upstreamReasonCode?: string;
      productionAuthorized: false;
    };

const SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];
const STEM_HANJA: Readonly<Record<HeavenlyStem, string>> = {
  갑: '甲', 을: '乙', 병: '丙', 정: '丁', 무: '戊',
  기: '己', 경: '庚', 신: '辛', 임: '壬', 계: '癸',
};
const BRANCH_HANJA: Readonly<Record<EarthlyBranch, string>> = {
  자: '子', 축: '丑', 인: '寅', 묘: '卯', 진: '辰', 사: '巳',
  오: '午', 미: '未', 신: '申', 유: '酉', 술: '戌', 해: '亥',
};

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

function inspectPair(
  pairKey: ThreeLayerPairKey,
  left: PillarFact,
  right: PillarFact,
): {
  checked: ThreeLayerPairCheck;
  matches: readonly ThreeLayerPairMatch[];
} {
  // Synthetic slot names only let the governed relation matcher compare two
  // real pillar values; they never claim these are the Natal year/month slots.
  const candidates = deriveStructuralRelationCandidates({ year: left, month: right });
  const matches = candidates.flatMap((item): ThreeLayerPairMatch[] => {
    if (item.kind === 'branch_three_combination') return [];
    return [{
      pairKey,
      kind: item.kind,
      observedLeftStem: left.stem.value,
      observedRightStem: right.stem.value,
      observedLeftBranch: left.branch.value,
      observedRightBranch: right.branch.value,
      sourceIds: Object.freeze([...item.sourceIds]),
      structuralMatchOnly: true,
      transformationEstablished: false,
      strengthOrOutcomeDetermined: false,
    }];
  });
  return {
    checked: {
      pairKey,
      checked: true,
      observedKinds: matches.map((item) => item.kind),
    },
    matches,
  };
}

/**
 * Research-only: never exported from the host, reading barrel, or product API.
 * A whole-year Dayun ambiguity is not collapsed into one segment.
 */
export function buildGeneralAnnualThreeLayerFactCorpus(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
): ThreeLayerFactCorpusResult {
  const unavailable = (
    reasonCode: UnavailableReason,
    upstreamReasonCode?: string,
  ): ThreeLayerFactCorpusResult => ({
    state: 'unavailable',
    reasonCode,
    ...(upstreamReasonCode === undefined ? {} : { upstreamReasonCode }),
    productionAuthorized: false,
  });

  const annual = previewGeneralAnnualCalculatedFacts(snapshot, request);
  if (annual.state !== 'research_fact_preview_only') {
    return unavailable('ANNUAL_FACTS_UNAVAILABLE', annual.reasonCode);
  }
  const dayun = resolveDayunTemporalContext(snapshot, annual.targetYear);
  if (dayun.status !== 'resolved') {
    return unavailable('DAYUN_CONTEXT_UNAVAILABLE', dayun.reasonCode);
  }
  if (dayun.segments.length !== 1) {
    return unavailable('DAYUN_MULTIPLE_SEGMENTS');
  }
  const segment = dayun.segments[0];
  if (
    segment === undefined ||
    segment.annualOverlapStartLocalDateTime !==
      String(annual.targetYear) + '-01-01T00:00' ||
    segment.annualOverlapEndExclusiveLocalDateTime !==
      String(annual.targetYear + 1) + '-01-01T00:00'
  ) {
    return unavailable('DAYUN_PARTIAL_YEAR_COVERAGE');
  }

  const natalPillars: { slot: PillarSlot; pillar: PillarFact }[] = [];
  for (const slot of SLOTS) {
    const state = snapshot.pillars[slot];
    if (state.status !== 'resolved') {
      return unavailable('NATAL_PILLAR_UNRESOLVED', slot);
    }
    natalPillars.push({ slot, pillar: state.value });
  }

  const annualPillar = annualPillarFact(
    annual.annualPillar.stem as HeavenlyStem,
    annual.annualPillar.branch as EarthlyBranch,
  );
  const dayunPillar = segment.pillar;
  const checks: ThreeLayerPairCheck[] = [];
  const matches: ThreeLayerPairMatch[] = [];
  const append = (key: ThreeLayerPairKey, left: PillarFact, right: PillarFact): void => {
    const current = inspectPair(key, left, right);
    checks.push(current.checked);
    matches.push(...current.matches);
  };

  append('annual:dayun', annualPillar, dayunPillar);
  for (const natal of natalPillars) {
    append(('annual:natal:' + natal.slot) as ThreeLayerPairKey, annualPillar, natal.pillar);
    append(('dayun:natal:' + natal.slot) as ThreeLayerPairKey, dayunPillar, natal.pillar);
  }

  const dayMaster = snapshot.derivedFacts.dayMaster;
  if (dayMaster.status !== 'resolved') {
    return unavailable('ANNUAL_FACTS_UNAVAILABLE', 'NATAL_DAY_MASTER_UNRESOLVED');
  }
  const input = {
    corpusVersion: GENERAL_ANNUAL_THREE_LAYER_CORPUS_VERSION,
    requestId: request.requestId,
    snapshotId: snapshot.snapshotId,
    targetYear: annual.targetYear,
    effectiveYear: annual.effectiveYear,
    annualPillar: { ...annual.annualPillar } as {
      stem: HeavenlyStem;
      branch: EarthlyBranch;
      cycleIndex: number;
    },
    dayun: {
      contextId: dayun.contextId,
      segmentIndex: segment.index,
      ageMarker: segment.ageMarker,
      stem: dayunPillar.stem.value,
      branch: dayunPillar.branch.value,
      annualCoverageStart: segment.annualOverlapStartLocalDateTime,
      annualCoverageEndExclusive: segment.annualOverlapEndExclusiveLocalDateTime,
    },
    natal: natalPillars.map((item) => ({
      slot: item.slot,
      stem: item.pillar.stem.value,
      branch: item.pillar.branch.value,
    })),
    computedTenGodRelations: {
      annualStemToNatalDayMaster: annual.tenGodRelation.computedName,
      dayunStemToNatalDayMaster: deriveAnnualStemTenGod(dayMaster.value, dayunPillar.stem.value),
    },
    pairChecks: checks,
    pairMatches: matches,
    sourceBinding: {
      existingFourteenRuleDecisionHash: annual.decisionHash,
      existingDayunContextId: dayun.contextId,
      structuralRelationDefinitionHash: STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH,
    },
    limits: {
      evidenceLayer: 'structural_pair_identity_only' as const,
      natalBaselineUnchanged: true as const,
      multipleEffectsCombined: false as const,
      precedenceOrStrengthRankingAuthorized: false as const,
      tenGodMeaningAuthorized: false as const,
      mayGenerateAnnualInterpretation: false as const,
      mayRenderOfficialReading: false as const,
      mayCallModel: false as const,
      productionAuthorized: false as const,
    },
  };
  return Object.freeze({
    state: 'research_three_layer_facts_only',
    ...input,
    corpusHash: deterministicContentHash(input),
  });
}
