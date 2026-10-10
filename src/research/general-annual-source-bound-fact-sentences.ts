import type { CanonicalSajuSnapshot, HeavenlyStem, TenGod } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildGeneralAnnualAtomicSourceAcquisition,
  GENERAL_ANNUAL_SOURCE_CANDIDATES,
} from './general-annual-atomic-semantic-source-acquisition.js';
import { buildGeneralAnnualBranchClashAdjudication } from './general-annual-branch-clash-adjudication.js';
import { buildGeneralAnnualFourteenRuleDecision } from './general-annual-fact-only-preview.js';
import { designGeneralAnnualPersonalInterpretation } from './general-annual-personalized-interpretation-design.js';
import { buildGeneralAnnualThreeLayerFactCorpus } from './general-annual-three-layer-fact-corpus.js';

export const ANNUAL_SOURCE_BOUND_SENTENCE_VERSION = 'sa7d-annual-source-bound-factual-sentences-v1' as const;
const PRIMARY_WITNESS_ID = 'NLC_MING_WANLI_SANMING_TONGHUI_VOLUME2_LOWER_SCAN' as const;

// These two EXACT directional identities were verified at Ming scan PDF p. 25.
// They cannot be generalized to 10 themes or any modern event.
export const EXACT_PRIMARY_ANNUAL_TEN_GOD_CASES = Object.freeze([
  Object.freeze({
    caseId: 'MING_JIA_DAY_GENG_YEAR_PIAN_GUAN',
    dayStem: '갑',
    annualStem: '경',
    tenGod: '편관',
    passage: '歲君傷日者如庚剋甲日為偏官',
    primarySourceId: PRIMARY_WITNESS_ID,
    modernThemeAuthorized: false as const,
  }),
  Object.freeze({
    caseId: 'MING_JIA_DAY_WU_YEAR_PIAN_CAI',
    dayStem: '갑',
    annualStem: '무',
    tenGod: '편재',
    passage: '日犯歲君如甲日剋戊年為偏財',
    primarySourceId: PRIMARY_WITNESS_ID,
    modernThemeAuthorized: false as const,
  }),
] as const);

export function matchExactPrimaryAnnualTenGodCase(
  dayStem: HeavenlyStem,
  annualStem: HeavenlyStem,
  tenGod: TenGod,
) {
  return EXACT_PRIMARY_ANNUAL_TEN_GOD_CASES.find((item) =>
    item.dayStem === dayStem &&
    item.annualStem === annualStem &&
    item.tenGod === tenGod
  ) ?? null;
}

export interface AnnualEvidenceRuleRow {
  ruleId: string;
  semanticKey: string;
  kind: 'ten_god_modern_theme' | 'annual_natal_branch_clash_tension';
  modernMeaningStatus: 'RESEARCH_HOLD';
  modernMeaningEvidenceGrade: 'INSUFFICIENT';
  exactPrimaryExampleIds: readonly string[];
  sourceRefs: readonly string[];
  counterexamples: readonly string[];
  requiredNextEvidence: readonly string[];
  allowedWording: 'computed_relation_only';
  fortuneSentenceAuthorized: false;
}

export function buildAnnualSourceBoundEvidenceCasebook() {
  const review = buildGeneralAnnualFourteenRuleDecision();
  const acquisition = buildGeneralAnnualAtomicSourceAcquisition();
  const clash = buildGeneralAnnualBranchClashAdjudication();
  const witness = GENERAL_ANNUAL_SOURCE_CANDIDATES.find(
    (item) => item.candidateId === PRIMARY_WITNESS_ID,
  );
  if (
    review.decisions.length !== 14 ||
    review.summary.modernMeaningAdmittedCount !== 0 ||
    review.authority.semanticAuthorityGranted ||
    review.authority.productionAuthorized ||
    witness?.candidateId !== PRIMARY_WITNESS_ID ||
    !witness.acquisition.relevantPassageVisuallyVerified ||
    witness.acquisition.pdfPageOneBased !== 25 ||
    !EXACT_PRIMARY_ANNUAL_TEN_GOD_CASES.every(
      (item) => witness.acquisition.examplesOnLeftLeaf.some(
        (passage) => item.passage.includes(passage) || passage.includes(item.passage),
      ),
    ) ||
    acquisition.currentThemeSemanticAdjudication.decisions.length !== 10 ||
    clash.decisions.length !== 4 ||
    clash.boundary.genericAnnualTensionSemanticAuthorized ||
    clash.boundary.productionAdmissionAuthorized
  ) throw new Error('Annual source evidence changed: fresh review required');

  const evidence = [
    ...acquisition.currentThemeSemanticAdjudication.decisions.map((item) => ({
      semanticKey: item.semanticKey,
      kind: 'ten_god_modern_theme' as const,
      sourceGrade: item.sourceSupportGrade,
      exactCaseIds: EXACT_PRIMARY_ANNUAL_TEN_GOD_CASES.filter(
        (example) => example.tenGod === item.tenGod,
      ).map((example) => example.caseId),
      sourceRefs: item.sourceRefs,
      counterexamples: item.counterexamples,
      requiredNextEvidence: item.unresolvedEvidence,
      meaningAdmitted: item.sourceQualifiedModernAnnualMeaning,
      productionAuthorized: item.productionAuthorization,
      identityGrade: item.identitySourceSupportGrade,
    })),
    ...clash.decisions.map((item) => ({
      semanticKey: item.semanticKey,
      kind: 'annual_natal_branch_clash_tension' as const,
      sourceGrade: item.sourceSupportGrade,
      exactCaseIds: [] as string[],
      sourceRefs: item.sourceRefs,
      counterexamples: item.counterexamples,
      requiredNextEvidence: item.unresolvedEvidence,
      meaningAdmitted: item.qualifiedTraditionalAnnualMeaning,
      productionAuthorized: item.productionAuthorization,
      identityGrade: 'INSUFFICIENT' as const,
    })),
  ];

  const rows: AnnualEvidenceRuleRow[] = review.decisions.map((rule) => {
    const sameKey = evidence.filter((item) => item.semanticKey === rule.semanticKey);
    if (sameKey.length !== 1) throw new Error('Annual rule lacks one-to-one evidence binding');
    const item = sameKey[0]!;
    const expectedKind = rule.kind === 'modern_ten_god_theme'
      ? 'ten_god_modern_theme' : 'annual_natal_branch_clash_tension';
    const expectedExamples = (
      rule.semanticKey === 'ANNUAL_WEALTH_EXTERNAL_RESOURCES' ||
      rule.semanticKey === 'ANNUAL_OFFICER_PRESSURE_RESPONSE'
    ) ? 1 : 0;
    if (
      item.kind !== expectedKind ||
      item.sourceGrade !== 'INSUFFICIENT' ||
      item.meaningAdmitted ||
      item.productionAuthorized ||
      rule.currentMeaningAdmitted ||
      rule.mayDeliver ||
      item.exactCaseIds.length !== expectedExamples ||
      (expectedExamples === 1 && item.identityGrade !== 'PRIMARY_SUPPORTED') ||
      item.counterexamples.length === 0 ||
      item.requiredNextEvidence.length === 0
    ) throw new Error('Annual rule meaning/evidence authority drifted');
    return {
      ruleId: rule.ruleId,
      semanticKey: rule.semanticKey,
      kind: item.kind,
      modernMeaningStatus: 'RESEARCH_HOLD',
      modernMeaningEvidenceGrade: 'INSUFFICIENT',
      exactPrimaryExampleIds: [...item.exactCaseIds],
      sourceRefs: [...item.sourceRefs],
      counterexamples: [...item.counterexamples],
      requiredNextEvidence: [...item.requiredNextEvidence],
      allowedWording: 'computed_relation_only',
      fortuneSentenceAuthorized: false,
    };
  });
  const data = {
    version: ANNUAL_SOURCE_BOUND_SENTENCE_VERSION,
    fourteenRuleDecisionHash: review.decisionHash,
    atomicAcquisitionId: acquisition.acquisitionId,
    branchClashAdjudicationId: clash.adjudicationId,
    primaryWitnessId: PRIMARY_WITNESS_ID,
    primaryWitnessPdfPageOneBased: 25,
    rows,
    authority: {
      exactPrimaryRelationExampleCount: 2,
      approvedModernMeaningCount: 0,
      mayEmitInterpretationClaim: false,
      mayProduceAnnualFortune: false,
      productionAuthorized: false,
    },
  };
  return Object.freeze({ ...data, casebookHash: deterministicContentHash(data) });
}

export type AnnualResearchSentenceKind =
  | 'effective_annual_pillar'
  | 'annual_stem_ten_god_calculation'
  | 'dayun_stem_ten_god_calculation'
  | 'cross_layer_relation_count'
  | 'no_event_inference_notice';

export interface AnnualResearchSentence {
  kind: AnnualResearchSentenceKind;
  text: string;
  evidenceRef: string;
  level: 'FACT_ONLY';
  interpretationAuthorized: false;
  consumerDeliveryAuthorized: false;
}

export type AnnualSourceBoundSentenceResult =
  | {
      status: 'unavailable';
      upstreamReasonCode: string;
      productionAuthorized: false;
    }
  | {
      status: 'research_fact_sentences_only';
      version: typeof ANNUAL_SOURCE_BOUND_SENTENCE_VERSION;
      resultHash: string;
      casebookHash: string;
      designId: string;
      threeLayerCorpusHash: string;
      classicalExample: {
        exactMatch: boolean;
        caseId: string | null;
        sourceId: typeof PRIMARY_WITNESS_ID | null;
      };
      sentences: readonly AnnualResearchSentence[];
      blockedSemanticSlots: readonly string[];
      emittedFortuneSentenceCount: 0;
      authority: {
        mayGenerateAnnualInterpretation: false;
        mayCallModel: false;
        mayIssueInterpretationClaim: false;
        mayRenderOfficialReading: false;
        productionAuthorized: false;
        commerceAuthorized: false;
      };
    };

// Research-only deterministic factual wording; not a fortune interpretation.
export function buildAnnualSourceBoundFactSentences(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
): AnnualSourceBoundSentenceResult {
  const design = designGeneralAnnualPersonalInterpretation(snapshot, request);
  if (design.status !== 'design_only') {
    return {
      status: 'unavailable',
      upstreamReasonCode: design.upstreamReasonCode,
      productionAuthorized: false,
    };
  }
  const corpus = buildGeneralAnnualThreeLayerFactCorpus(snapshot, request);
  if (
    corpus.state !== 'research_three_layer_facts_only' ||
    corpus.corpusHash !== design.sourceBindings.threeLayerCorpusHash
  ) throw new Error('Annual fact evidence changed between design and wording');

  const casebook = buildAnnualSourceBoundEvidenceCasebook();
  if (
    casebook.fourteenRuleDecisionHash !== design.sourceBindings.fourteenRuleDecisionHash ||
    design.slots.length !== 6 ||
    design.slots.some((slot) =>
      slot.status !== 'RESEARCH_HOLD' ||
      slot.candidateInterpretationText !== null ||
      slot.emittedClaimCount !== 0,
    ) ||
    design.authority.mayGenerateAnnualInterpretation ||
    design.authority.productionAuthorized
  ) throw new Error('Research fact sentences cannot promote semantics');

  const natalDay = corpus.natal.find((item) => item.slot === 'day');
  if (natalDay === undefined) throw new Error('Resolved natal day stem missing');
  const exact = matchExactPrimaryAnnualTenGodCase(
    natalDay.stem,
    corpus.annualPillar.stem,
    corpus.computedTenGodRelations.annualStemToNatalDayMaster,
  );
  const fact = (
    kind: AnnualResearchSentenceKind,
    text: string,
    evidenceRef: string,
  ): AnnualResearchSentence => ({
    kind, text, evidenceRef, level: 'FACT_ONLY',
    interpretationAuthorized: false,
    consumerDeliveryAuthorized: false,
  });
  const sentences: readonly AnnualResearchSentence[] = Object.freeze([
    fact(
      'effective_annual_pillar',
      '기준 연도 ' + corpus.targetYear + '년의 해당 기준시각에 적용된 연주는 ' +
        corpus.annualPillar.stem + corpus.annualPillar.branch + '입니다.',
      corpus.corpusHash,
    ),
    fact(
      'annual_stem_ten_god_calculation',
      '출생 일간 ' + natalDay.stem + '과 연운 천간 ' + corpus.annualPillar.stem +
        '의 계산상 십신 관계는 ' +
        corpus.computedTenGodRelations.annualStemToNatalDayMaster + '입니다.',
      exact?.caseId ?? corpus.sourceBinding.existingFourteenRuleDecisionHash,
    ),
    fact(
      'dayun_stem_ten_god_calculation',
      '출생 일간 ' + natalDay.stem + '과 대운 천간 ' + corpus.dayun.stem +
        '의 계산상 십신 관계는 ' +
        corpus.computedTenGodRelations.dayunStemToNatalDayMaster + '입니다.',
      corpus.dayun.contextId,
    ),
    fact(
      'cross_layer_relation_count',
      '원국·대운·연운의 9개 기둥 쌍에서 천간 오합·지지 육합·지지 충 관계 일치 ' +
        corpus.pairMatches.length + '건을 계산했습니다.',
      corpus.corpusHash,
    ),
    fact(
      'no_event_inference_notice',
      '이 계산 관계만으로 직업·재물·연애·건강의 결과나 특정 사건은 판단하지 않습니다.',
      casebook.casebookHash,
    ),
  ]);
  const payload = {
    version: ANNUAL_SOURCE_BOUND_SENTENCE_VERSION,
    casebookHash: casebook.casebookHash,
    designId: design.designId,
    threeLayerCorpusHash: corpus.corpusHash,
    classicalExample: {
      exactMatch: exact !== null,
      caseId: exact?.caseId ?? null,
      sourceId: exact?.primarySourceId ?? null,
    },
    sentences,
    blockedSemanticSlots: design.slots.map((slot) => slot.slot),
    emittedFortuneSentenceCount: 0 as const,
    authority: {
      mayGenerateAnnualInterpretation: false as const,
      mayCallModel: false as const,
      mayIssueInterpretationClaim: false as const,
      mayRenderOfficialReading: false as const,
      productionAuthorized: false as const,
      commerceAuthorized: false as const,
    },
  };
  return Object.freeze({
    status: 'research_fact_sentences_only',
    ...payload,
    resultHash: deterministicContentHash(payload),
  });
}
