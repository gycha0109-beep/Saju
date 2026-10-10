import {
  getEarthlyBranchElement,
  getEarthlyBranchYinYang,
  getHeavenlyStemElement,
  getHeavenlyStemYinYang,
} from 'manseryeok';
import { deriveStructuralRelationCandidates, STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH } from '../calculation/structural-relations.js';
import type {
  CanonicalSajuSnapshot, EarthlyBranch, HeavenlyStem, PillarFact, PillarSlot,
} from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildGeneralAnnualThreeLayerFactCorpus } from './general-annual-three-layer-fact-corpus.js';
import { auditPianGuanCoexistingRelationCounterexamples } from './general-annual-pian-guan-coexistence-counterexamples.js';

/**
 * Supplements nine pair checks with 16 *cross-temporal* triple checks.
 * A match is only a candidate set of three branches, never 合化 or a verdict.
 */
export const ANNUAL_CROSS_LAYER_TRIPLE_CANDIDATE_VERSION =
  'sa7d-annual-cross-layer-branch-three-combination-candidate-v1' as const;

export const ANNUAL_CROSS_LAYER_TRIPLE_SOURCE = Object.freeze({
  section: '三命通會/卷二·論支元三合' as const,
  witness: 'digital_transcription_not_reverified_against_print' as const,
  url: 'https://zh.wikisource.org/zh-hant/三命通會/卷二' as const,
  excerpt: '若三字缺一則化不成局，不可以三合化局論' as const,
  whatItSupports: 'The cited classical text distinguishes a complete triple from an incomplete triple.' as const,
  automaticTransformationAuthorized: false as const,
  historicalPianGuanSeverityAuthorized: false as const,
  modernPredictionAuthorized: false as const,
});

export type AnnualTripleSlot =
  | 'annual' | 'dayun'
  | 'natal:year' | 'natal:month' | 'natal:day' | 'natal:hour';

export type AnnualTripleScope =
  | 'annual_dayun_natal'
  | 'annual_two_natal'
  | 'dayun_two_natal';

const ORDER: readonly AnnualTripleSlot[] = [
  'annual', 'dayun', 'natal:year', 'natal:month', 'natal:day', 'natal:hour',
] as const;

const STEM_HANJA: Readonly<Record<HeavenlyStem, string>> = {
  갑: '甲', 을: '乙', 병: '丙', 정: '丁', 무: '戊',
  기: '己', 경: '庚', 신: '辛', 임: '壬', 계: '癸',
};
const BRANCH_HANJA: Readonly<Record<EarthlyBranch, string>> = {
  자: '子', 축: '丑', 인: '寅', 묘: '卯', 진: '辰', 사: '巳',
  오: '午', 미: '未', 신: '申', 유: '酉', 술: '戌', 해: '亥',
};
const NATAL_SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];

function checkedPillar(stem: HeavenlyStem, branch: EarthlyBranch): PillarFact {
  return {
    stem: {
      value: stem, hanja: STEM_HANJA[stem],
      element: getHeavenlyStemElement(stem),
      yinYang: getHeavenlyStemYinYang(stem),
    },
    branch: {
      value: branch, hanja: BRANCH_HANJA[branch],
      element: getEarthlyBranchElement(branch),
      yinYang: getEarthlyBranchYinYang(branch),
    },
  };
}

export const ANNUAL_CROSS_LAYER_TRIPLE_UNRESOLVED = Object.freeze([
  'ANNUAL_NATAL_DAYUN_TRIPLE_IS_A_STRUCTURAL_CANDIDATE_ONLY',
  'COMBINATION_TRANSFORMATION_CONDITIONS_NOT_ADJUDICATED',
  'COEXISTING_PAIR_CLASH_OR_COMBINATION_PRECEDENCE_UNKNOWN',
  'TRIPLE_COVERAGE_EXCLUDES_NATAL_ONLY_AND_HIGHER_ARITY_RELATIONS',
  'ORIGINAL_PRINT_THREE_COMBINATION_SECTION_NOT_PAGE_BOUND',
  'EXACT_PIAN_GUAN_EXAMPLE_IS_NOT_A_GENERAL_TRIPLE_METHOD',
  'PERSONAL_EVENT_OR_SEVERITY_NOT_VALIDATED',
] as const);

export function inspectAnnualCrossLayerTripleCandidates(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
) {
  const predecessor = auditPianGuanCoexistingRelationCounterexamples(snapshot, request);
  if (predecessor.status === 'input_unavailable') return Object.freeze({
    status: 'input_unavailable' as const,
    reasonCode: predecessor.reasonCode,
    productionAuthorized: false as const,
  });

  const corpus = buildGeneralAnnualThreeLayerFactCorpus(snapshot, request);
  if (
    corpus.state !== 'research_three_layer_facts_only' ||
    corpus.corpusHash !== predecessor.threeLayerCorpusHash ||
    corpus.pairChecks.length !== 9 ||
    corpus.natal.length !== 4 ||
    corpus.sourceBinding.structuralRelationDefinitionHash !== STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH ||
    corpus.limits.productionAuthorized ||
    corpus.limits.precedenceOrStrengthRankingAuthorized ||
    predecessor.gates.crossPairConflictResolverAuthorized ||
    predecessor.gates.modernPersonalInterpretationAuthorized ||
    predecessor.gates.productionAuthorized
  ) throw new Error('Upstream annual structural-fact authority drift');

  const pillars = new Map<AnnualTripleSlot, PillarFact>([
    ['annual', checkedPillar(corpus.annualPillar.stem, corpus.annualPillar.branch)],
    ['dayun', checkedPillar(corpus.dayun.stem, corpus.dayun.branch)],
    ...NATAL_SLOTS.map((slot): [AnnualTripleSlot, PillarFact] => {
      const natal = corpus.natal.find((item) => item.slot === slot);
      if (!natal) throw new Error('Missing natal ' + slot);
      return [('natal:' + slot) as AnnualTripleSlot, checkedPillar(natal.stem, natal.branch)];
    }),
  ]);
  if (pillars.size !== 6) throw new Error('Expected six distinct identity-bearing pillars');

  const checks: {
    slots: readonly [AnnualTripleSlot, AnnualTripleSlot, AnnualTripleSlot];
    scope: AnnualTripleScope;
    observedBranches: readonly [EarthlyBranch, EarthlyBranch, EarthlyBranch];
    candidateKind: 'branch_three_combination' | null;
    matchingSourceIds: readonly string[];
    structuralMatchOnly: true;
    transformationEstablished: false;
    severityOrOutcomeEstablished: false;
  }[] = [];

  for (let i = 0; i < ORDER.length; i += 1) {
    for (let j = i + 1; j < ORDER.length; j += 1) {
      for (let k = j + 1; k < ORDER.length; k += 1) {
        const a = ORDER[i];
        const b = ORDER[j];
        const c = ORDER[k];
        if (!a || !b || !c) throw new Error('Unexpected triple position');
        // Existing natal-only groups belong to the natal chart, not this delta.
        if (a !== 'annual' && a !== 'dayun') continue;
        const left = pillars.get(a);
        const middle = pillars.get(b);
        const right = pillars.get(c);
        if (!left || !middle || !right) throw new Error('Missing reconstructed pillar');
        const triple = deriveStructuralRelationCandidates({
          year: left, month: middle, day: right,
        }).filter((relation) => relation.kind === 'branch_three_combination');
        if (triple.length > 1 ||
          triple.some((x) => !x.semantics.structuralMatchOnly ||
            x.semantics.transformationEstablished || x.participants.length !== 3)) {
          throw new Error('Unreviewed triple derivation result');
        }
        const matched = triple[0];
        const scope: AnnualTripleScope = a === 'annual' && b === 'dayun'
          ? 'annual_dayun_natal'
          : a === 'annual' ? 'annual_two_natal' : 'dayun_two_natal';
        checks.push(Object.freeze({
          slots: [a, b, c] as const,
          scope,
          observedBranches: [left.branch.value, middle.branch.value, right.branch.value] as const,
          candidateKind: matched ? 'branch_three_combination' as const : null,
          matchingSourceIds: Object.freeze(matched ? [...matched.sourceIds] : []),
          structuralMatchOnly: true as const,
          transformationEstablished: false as const,
          severityOrOutcomeEstablished: false as const,
        }));
      }
    }
  }

  if (
    checks.length !== 16 ||
    checks.filter((x) => x.scope === 'annual_dayun_natal').length !== 4 ||
    checks.filter((x) => x.scope === 'annual_two_natal').length !== 6 ||
    checks.filter((x) => x.scope === 'dayun_two_natal').length !== 6 ||
    new Set(checks.map((x) => x.slots.join('|'))).size !== 16
  ) throw new Error('Cross-temporal triple coverage changed');

  const material = {
    status: 'research_triple_candidates_only_hold' as const,
    version: ANNUAL_CROSS_LAYER_TRIPLE_CANDIDATE_VERSION,
    parentCounterexampleAuditHash: predecessor.auditHash,
    originalPairCorpusHash: corpus.corpusHash,
    structuralMatcherHash: STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH,
    source: ANNUAL_CROSS_LAYER_TRIPLE_SOURCE,
    targetYear: corpus.targetYear,
    effectiveYear: corpus.effectiveYear,
    annualBranch: corpus.annualPillar.branch,
    dayunBranch: corpus.dayun.branch,
    pairCheckCountUnchanged: 9 as const,
    tripleCheckCount: 16 as const,
    observedCandidateCount: checks.filter((x) => x.candidateKind !== null).length,
    checks: Object.freeze(checks),
    unresolved: ANNUAL_CROSS_LAYER_TRIPLE_UNRESOLVED,
    authority: Object.freeze({
      onlyStructureObserved: true as const,
      natalOnlyTripleCountNotIncluded: 4 as const,
      missingTripleDoesNotMeanSafety: true as const,
      tripleFoundDoesNotProveTransformation: true as const,
      pairAndTriplePrecedenceAdmitted: false as const,
      classicalSeverityAdmitted: false as const,
      realWorldOutcomeAdmitted: false as const,
      consumerClaimAdmitted: false as const,
      productionAuthorized: false as const,
    }),
    appliedTransformation: null,
    winningRelation: null,
    personalFortuneClaim: null,
  };
  return Object.freeze({ ...material, auditHash: deterministicContentHash(material) });
}
