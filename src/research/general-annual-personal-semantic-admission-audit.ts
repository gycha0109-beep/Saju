import type { CanonicalSajuSnapshot, PillarSlot, TenGod } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildGeneralAnnualFourteenRuleDecision } from './general-annual-fact-only-preview.js';
import {
  buildAnnualSourceBoundEvidenceCasebook,
  buildAnnualSourceBoundFactSentences,
  matchExactPrimaryAnnualTenGodCase,
} from './general-annual-source-bound-fact-sentences.js';
import { designGeneralAnnualPersonalInterpretation } from './general-annual-personalized-interpretation-design.js';
import { buildGeneralAnnualThreeLayerFactCorpus } from './general-annual-three-layer-fact-corpus.js';

export const ANNUAL_PERSONAL_SEMANTIC_ADMISSION_AUDIT_VERSION =
  'sa7d-personal-annual-semantic-admission-audit-v1' as const;

export type AnnualCandidateApplicability =
  | 'COMPUTED_INPUT_NOT_MATCHED'
  | 'COMPUTED_INPUT_MATCHED_SEMANTICS_HOLD'
  | 'EXACT_PRIMARY_IDENTITY_MATCHED_SEMANTICS_HOLD';

export type AnnualSemanticEvidenceRequirement =
  | 'DIRECT_ANNUAL_MEANING_WITNESS'
  | 'SCHOOL_BOUND_METHOD_SELECTED'
  | 'THREE_LAYER_COMPOSITION_ADJUDICATED'
  | 'COEXISTING_RELATION_EXCEPTION_ADJUDICATED'
  | 'ANNUAL_EFFECT_TIMING_VERIFIED'
  | 'LIFE_DOMAIN_OUTCOME_EVIDENCE_VERIFIED'
  | 'CONTRAINDICATIONS_AND_COUNTEREXAMPLES_REVIEWED';

export interface AnnualPersonalSemanticCandidateReview {
  ruleId: string;
  semanticKey: string;
  kind: 'modern_ten_god_theme' | 'annual_natal_branch_clash_tension';
  matchedComputedInput: boolean;
  applicability: AnnualCandidateApplicability;
  matchedTenGod: TenGod | null;
  matchedNatalPillar: PillarSlot | null;
  exactVerifiedPrimaryPairId: string | null;
  currentMeaningEvidence: 'INSUFFICIENT';
  allRequiredEvidenceSatisfied: false;
  missingEvidence: readonly AnnualSemanticEvidenceRequirement[];
  sourceRefs: readonly string[];
  counterexamples: readonly string[];
  sourceSpecificOpenQuestions: readonly string[];
  sourceBoundMeaningAuthorized: false;
  productionInterpretationAuthorized: false;
  proposedFortuneSentence: null;
}

export type AnnualSemanticAdmissionAudit =
  | {
      status: 'unavailable';
      reasonCode: string;
      annualInterpretationAuthorized: false;
      productionAuthorized: false;
    }
  | {
      status: 'research_semantic_admission_hold';
      version: typeof ANNUAL_PERSONAL_SEMANTIC_ADMISSION_AUDIT_VERSION;
      auditHash: string;
      casebookHash: string;
      designId: string;
      factualResultHash: string;
      threeLayerCorpusHash: string;
      snapshotId: string;
      requestId: string;
      effectiveYear: number;
      annualStem: string;
      natalDayStem: string;
      yearScopedCandidateCount: 14;
      factMatchedCandidateCount: number;
      exactPrimaryIdentityMatches: number;
      meaningAdmittedCandidateCount: 0;
      candidates: readonly AnnualPersonalSemanticCandidateReview[];
      semanticGate: {
        inputsResolved: true;
        threeLayerFactReviewComplete: true;
        existingResearchMeaningAuthorityGranted: false;
        schoolSpecificMeaningAuthorityGranted: false;
        crossLayerPrecedenceGranted: false;
        counterexampleReconciliationGranted: false;
        concreteLifeEventInferenceGranted: false;
        mayGenerateAnnualInterpretation: false;
        mayRenderOfficialReading: false;
        mayCallModel: false;
        productionAuthorized: false;
        commerceAuthorized: false;
        monthlyAuthorized: false;
      };
    };

const SHARED_SEMANTIC_REQUIREMENTS: readonly AnnualSemanticEvidenceRequirement[] = Object.freeze([
  'DIRECT_ANNUAL_MEANING_WITNESS',
  'SCHOOL_BOUND_METHOD_SELECTED',
  'THREE_LAYER_COMPOSITION_ADJUDICATED',
  'COEXISTING_RELATION_EXCEPTION_ADJUDICATED',
  'ANNUAL_EFFECT_TIMING_VERIFIED',
  'LIFE_DOMAIN_OUTCOME_EVIDENCE_VERIFIED',
  'CONTRAINDICATIONS_AND_COUNTEREXAMPLES_REVIEWED',
]);

/**
 * Research-only eligibility audit, NOT an interpretation or a promotion path.
 * "Matched" means the numeric/symbolic antecedent is present; it does NOT
 * mean the traditional meaning, strength, timing or outcome is established.
 * No caller-provided rules or evidence grades are trusted.
 */
export function auditAnnualPersonalSemanticAdmission(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
): AnnualSemanticAdmissionAudit {
  const design = designGeneralAnnualPersonalInterpretation(snapshot, request);
  if (design.status !== 'design_only') {
    return {
      status: 'unavailable',
      reasonCode: design.upstreamReasonCode,
      annualInterpretationAuthorized: false,
      productionAuthorized: false,
    };
  }

  const corpus = buildGeneralAnnualThreeLayerFactCorpus(snapshot, request);
  if (
    corpus.state !== 'research_three_layer_facts_only' ||
    corpus.corpusHash !== design.sourceBindings.threeLayerCorpusHash ||
    corpus.pairChecks.length !== 9 ||
    corpus.limits.mayGenerateAnnualInterpretation ||
    corpus.limits.productionAuthorized
  ) throw new Error('Annual admission audit requires unpromoted three-layer evidence');

  const factual = buildAnnualSourceBoundFactSentences(snapshot, request);
  if (
    factual.status !== 'research_fact_sentences_only' ||
    factual.threeLayerCorpusHash !== corpus.corpusHash ||
    factual.designId !== design.designId ||
    factual.authority.mayGenerateAnnualInterpretation ||
    factual.authority.productionAuthorized ||
    factual.emittedFortuneSentenceCount !== 0
  ) throw new Error('Annual fact sentence source contract changed');

  const casebook = buildAnnualSourceBoundEvidenceCasebook();
  const rules = buildGeneralAnnualFourteenRuleDecision();
  if (
    casebook.rows.length !== 14 ||
    rules.decisions.length !== 14 ||
    casebook.fourteenRuleDecisionHash !== rules.decisionHash ||
    casebook.casebookHash !== factual.casebookHash ||
    rules.summary.modernMeaningAdmittedCount !== 0 ||
    rules.authority.mayGenerateAnnualInterpretation ||
    design.slots.length !== 6 ||
    design.slots.some((slot) => slot.status !== 'RESEARCH_HOLD') ||
    design.authority.mayGenerateAnnualInterpretation ||
    design.authority.productionAuthorized
  ) throw new Error('Annual admission authority drift requires renewed review');

  const natalDayStem = corpus.natal.find((item) => item.slot === 'day')?.stem;
  if (natalDayStem === undefined) throw new Error('Missing natal day stem in admitted facts');
  const exact = matchExactPrimaryAnnualTenGodCase(
    natalDayStem, corpus.annualPillar.stem,
    corpus.computedTenGodRelations.annualStemToNatalDayMaster,
  );

  const candidates: AnnualPersonalSemanticCandidateReview[] = casebook.rows.map((row) => {
    const matchingRules = rules.decisions.filter((item) => item.semanticKey === row.semanticKey);
    if (matchingRules.length !== 1) throw new Error('Annual candidate evidence key is not unique');
    const rule = matchingRules[0]!;
    if (row.ruleId !== rule.ruleId ||
        row.modernMeaningEvidenceGrade !== 'INSUFFICIENT' ||
        row.modernMeaningStatus !== 'RESEARCH_HOLD' ||
        row.fortuneSentenceAuthorized ||
        row.counterexamples.length === 0 ||
        row.requiredNextEvidence.length === 0) {
      throw new Error('Annual meaning candidate mutated without source review');
    }

    const matchedTenGod = rule.kind === 'modern_ten_god_theme' ? rule.tenGod : null;
    const matchedNatalPillar = rule.kind === 'annual_natal_branch_clash_tension'
      ? rule.natalPillar : null;
    const matchedComputedInput = rule.kind === 'modern_ten_god_theme'
      ? rule.tenGod === corpus.computedTenGodRelations.annualStemToNatalDayMaster
      : corpus.pairMatches.some((match) =>
          match.pairKey === ('annual:natal:' + rule.natalPillar) &&
          match.kind === 'branch_clash' &&
          match.structuralMatchOnly &&
          !match.strengthOrOutcomeDetermined
        );

    // A witness supports only its exact day-stem / annual-stem / Ten-God
    // triplet. The same Ten-God from other stems is NOT direct verification.
    const exactVerifiedPrimaryPairId =
      matchedComputedInput && matchedTenGod === exact?.tenGod &&
      row.exactPrimaryExampleIds.includes(exact.caseId)
        ? exact.caseId
        : null;
    const applicability: AnnualCandidateApplicability = !matchedComputedInput
      ? 'COMPUTED_INPUT_NOT_MATCHED'
      : exactVerifiedPrimaryPairId === null
        ? 'COMPUTED_INPUT_MATCHED_SEMANTICS_HOLD'
        : 'EXACT_PRIMARY_IDENTITY_MATCHED_SEMANTICS_HOLD';

    return Object.freeze({
      ruleId: rule.ruleId,
      semanticKey: row.semanticKey,
      kind: row.kind,
      matchedComputedInput,
      applicability,
      matchedTenGod,
      matchedNatalPillar,
      exactVerifiedPrimaryPairId,
      currentMeaningEvidence: 'INSUFFICIENT',
      allRequiredEvidenceSatisfied: false,
      missingEvidence: SHARED_SEMANTIC_REQUIREMENTS,
      sourceRefs: row.sourceRefs,
      counterexamples: row.counterexamples,
      sourceSpecificOpenQuestions: row.requiredNextEvidence,
      sourceBoundMeaningAuthorized: false,
      productionInterpretationAuthorized: false,
      proposedFortuneSentence: null,
    });
  });

  const expectedMatches = candidates.filter((x) => x.matchedComputedInput);
  const actualTenGodMatches = expectedMatches.filter((x) => x.matchedTenGod !== null);
  if (
    candidates.length !== 14 ||
    new Set(candidates.map((x) => x.semanticKey)).size !== 14 ||
    actualTenGodMatches.length !== 1 ||
    (exact !== null && !candidates.some((x) => x.exactVerifiedPrimaryPairId === exact.caseId)) ||
    candidates.some((x) => x.matchedComputedInput && x.missingEvidence.length !== 7)
  ) throw new Error('Annual candidate applicability does not reconcile with facts');

  const data = {
    version: ANNUAL_PERSONAL_SEMANTIC_ADMISSION_AUDIT_VERSION,
    casebookHash: casebook.casebookHash,
    designId: design.designId,
    factualResultHash: factual.resultHash,
    threeLayerCorpusHash: corpus.corpusHash,
    snapshotId: corpus.snapshotId,
    requestId: corpus.requestId,
    effectiveYear: corpus.effectiveYear,
    annualStem: corpus.annualPillar.stem,
    natalDayStem,
    yearScopedCandidateCount: 14 as const,
    factMatchedCandidateCount: expectedMatches.length,
    exactPrimaryIdentityMatches: candidates.filter(
      (x) => x.exactVerifiedPrimaryPairId !== null,
    ).length,
    meaningAdmittedCandidateCount: 0 as const,
    candidates,
    semanticGate: {
      inputsResolved: true as const,
      threeLayerFactReviewComplete: true as const,
      existingResearchMeaningAuthorityGranted: false as const,
      schoolSpecificMeaningAuthorityGranted: false as const,
      crossLayerPrecedenceGranted: false as const,
      counterexampleReconciliationGranted: false as const,
      concreteLifeEventInferenceGranted: false as const,
      mayGenerateAnnualInterpretation: false as const,
      mayRenderOfficialReading: false as const,
      mayCallModel: false as const,
      productionAuthorized: false as const,
      commerceAuthorized: false as const,
      monthlyAuthorized: false as const,
    },
  };
  return Object.freeze({
    status: 'research_semantic_admission_hold',
    ...data,
    auditHash: deterministicContentHash(data),
  });
}
