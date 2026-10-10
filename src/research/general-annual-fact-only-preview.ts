import type { CanonicalSajuSnapshot, PillarSlot, TenGod } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildAnnualInterpretationFacts } from '../reading/annual-interpretation-facts.js';
import {
  resolveAnnualWithCodeApprovedIndependentE1,
} from '../reading/annual-lichun-independent-e1.js';
import { buildTemporalReadingContext } from '../reading/temporal-reading-context.js';
import {
  GENERAL_ANNUAL_ACTIVATION_RULES,
  GENERAL_ANNUAL_READING_PACK,
  GENERAL_ANNUAL_TENSION_RULES,
} from './general-annual-reading-candidate.js';
import { buildGeneralAnnualSA7DResearchReturnEvidence } from './general-annual-sa7d-return-evidence.js';

/**
 * Research successor only. This file never enters the public host/reading
 * exports, does not create interpretation claims, and cannot authorize LLM,
 * Official Reading, Product, persistence, commerce, or Production admission.
 */
export const GENERAL_ANNUAL_FACT_ONLY_PREVIEW_VERSION =
  'sa7d-general-annual-fact-only-research-v1' as const;

export type AnnualSemanticRuleDecision =
  | {
      kind: 'modern_ten_god_theme';
      semanticKey: string;
      ruleId: string;
      tenGod: TenGod;
      originalMeaningSupport: 'INSUFFICIENT';
      exactIdentityExampleSupport: 'PRIMARY_SUPPORTED' | 'INSUFFICIENT';
      proposedResearchHandling: 'REPLACE_WITH_RELATION_IDENTITY_ONLY' | 'HOLD';
      currentMeaningAdmitted: false;
      mayDeliver: false;
    }
  | {
      kind: 'annual_natal_branch_clash_tension';
      semanticKey: string;
      ruleId: string;
      natalPillar: PillarSlot;
      originalMeaningSupport: 'INSUFFICIENT';
      proposedResearchHandling: 'REPLACE_WITH_COMPUTED_RELATION_ONLY';
      currentMeaningAdmitted: false;
      mayDeliver: false;
    };

export function buildGeneralAnnualFourteenRuleDecision() {
  const returnEvidence = buildGeneralAnnualSA7DResearchReturnEvidence();
  const themes = returnEvidence.evidence.currentThemeDecisions;
  const clashes = returnEvidence.evidence.annualBranchClashDecisions;

  if (
    GENERAL_ANNUAL_READING_PACK.status !== 'research' ||
    returnEvidence.decision.production !== 'HOLD' ||
    returnEvidence.decision.bridgeReentryReady ||
    returnEvidence.decision.engineAuthorized ||
    returnEvidence.decision.previewAuthorized ||
    returnEvidence.decision.officialReadingAuthorized ||
    themes.length !== 10 ||
    clashes.length !== 4 ||
    GENERAL_ANNUAL_ACTIVATION_RULES.length !== 10 ||
    GENERAL_ANNUAL_TENSION_RULES.length !== 4
  ) {
    throw new Error('Annual candidate authority changed; renewed review required');
  }

  const rules = [...GENERAL_ANNUAL_ACTIVATION_RULES, ...GENERAL_ANNUAL_TENSION_RULES];
  const keys = rules.map((rule) => (rule.output.value as { semanticKey: string }).semanticKey);
  if (
    new Set(keys).size !== 14 ||
    rules.some(
      (rule) =>
        rule.status !== 'research' ||
        rule.quality.provenanceQuality !== 'heuristic' ||
        rule.quality.reviewerStatus !== 'unreviewed',
    )
  ) {
    throw new Error('Annual candidate rule identities or review status changed');
  }

  const decisions: AnnualSemanticRuleDecision[] = [];
  for (let index = 0; index < themes.length; index += 1) {
    const evidence = themes[index]!;
    const rule = GENERAL_ANNUAL_ACTIVATION_RULES[index]!;
    const output = rule.output.value as { semanticKey: string; tenGod: TenGod };
    if (
      output.semanticKey !== evidence.semanticKey ||
      output.tenGod !== evidence.tenGod ||
      evidence.sourceSupportGrade !== 'INSUFFICIENT' ||
      evidence.originalModernMeaningGate !== 'REQUIRES_SEPARATE_DIRECT_SUPPORT' ||
      evidence.sourceQualifiedModernAnnualMeaning ||
      evidence.productionAuthorization
    ) {
      throw new Error('Annual theme evidence is not bound to the candidate rule');
    }
    decisions.push(
      Object.freeze({
        kind: 'modern_ten_god_theme',
        semanticKey: evidence.semanticKey,
        ruleId: rule.ruleId,
        tenGod: evidence.tenGod,
        originalMeaningSupport: 'INSUFFICIENT',
        exactIdentityExampleSupport: evidence.identitySourceSupportGrade,
        proposedResearchHandling:
          evidence.identitySourceSupportGrade === 'PRIMARY_SUPPORTED'
            ? 'REPLACE_WITH_RELATION_IDENTITY_ONLY'
            : 'HOLD',
        currentMeaningAdmitted: false,
        mayDeliver: false,
      }),
    );
  }
  for (let index = 0; index < clashes.length; index += 1) {
    const evidence = clashes[index]!;
    const rule = GENERAL_ANNUAL_TENSION_RULES[index]!;
    const output = rule.output.value as { semanticKey: string; natalPillar: PillarSlot };
    if (
      output.semanticKey !== evidence.semanticKey ||
      output.natalPillar !== evidence.natalPillar ||
      evidence.sourceSupportGrade !== 'INSUFFICIENT' ||
      evidence.qualifiedTraditionalAnnualMeaning ||
      evidence.productionAuthorization
    ) {
      throw new Error('Annual clash evidence is not bound to the candidate rule');
    }
    decisions.push(
      Object.freeze({
        kind: 'annual_natal_branch_clash_tension',
        semanticKey: evidence.semanticKey,
        ruleId: rule.ruleId,
        natalPillar: evidence.natalPillar,
        originalMeaningSupport: 'INSUFFICIENT',
        proposedResearchHandling: 'REPLACE_WITH_COMPUTED_RELATION_ONLY',
        currentMeaningAdmitted: false,
        mayDeliver: false,
      }),
    );
  }

  if (
    decisions.filter(
      (decision) =>
        decision.kind === 'modern_ten_god_theme' &&
        decision.proposedResearchHandling === 'REPLACE_WITH_RELATION_IDENTITY_ONLY',
    ).length !== 2 ||
    decisions.filter((decision) => decision.kind === 'annual_natal_branch_clash_tension')
      .length !== 4
  ) {
    throw new Error('Annual exact-identity evidence set drifted');
  }

  const material = {
    version: GENERAL_ANNUAL_FACT_ONLY_PREVIEW_VERSION,
    evidenceId: returnEvidence.evidenceId,
    candidateSurfaceHash: returnEvidence.provenance.candidateSurfaceHash,
    decisions: Object.freeze(decisions),
    summary: Object.freeze({
      currentRuleCount: 14,
      modernMeaningAdmittedCount: 0,
      primaryWitnessedIdentityExamples: 2,
      unsupportedModernThemes: 10,
      unsupportedModernTensions: 4,
    }),
    authority: Object.freeze({
      calculationFactsOnly: true as const,
      semanticAuthorityGranted: false as const,
      mayGenerateAnnualInterpretation: false as const,
      mayRenderOfficialReading: false as const,
      mayCallModel: false as const,
      productionAuthorized: false as const,
      commerceAuthorized: false as const,
      monthlyAuthorized: false as const,
    }),
  };
  return Object.freeze({
    ...material,
    decisionHash: deterministicContentHash(material),
  });
}

export type GeneralAnnualFactOnlyPreview =
  | {
      state: 'research_fact_preview_only';
      snapshotId: string;
      requestId: string;
      decisionHash: string;
      targetYear: number;
      effectiveYear: number;
      annualPillar: { stem: string; branch: string; cycleIndex: number };
      tenGodRelation: {
        dayStem: string;
        annualStem: string;
        computedName: TenGod;
        exactPrimaryWitnessMatchesTheseStems: boolean;
      };
      branchClashFacts: readonly {
        natalPillar: PillarSlot;
        natalBranch: string;
        annualBranch: string;
        relation: 'clash';
      }[];
      omittedUnresolvedPillars: readonly PillarSlot[];
      displayRows: readonly { label: string; value: string }[];
      constraints: {
        calculationFactsOnly: true;
        sourceQualifiedModernAnnualMeaning: false;
        mayGenerateAnnualInterpretation: false;
        mayCallModel: false;
        productionAuthorized: false;
      };
    }
  | {
      state: 'unavailable';
      reasonCode:
        | 'ANNUAL_REQUEST_REQUIRED'
        | 'ANNUAL_E1_DATE_UNAVAILABLE'
        | 'ANNUAL_REFERENCE_INVALID'
        | 'NATAL_DAY_MASTER_UNRESOLVED'
        | 'ANNUAL_FACTS_UNAVAILABLE';
      productionAuthorized: false;
    };

const SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];

/**
 * Factual research display only, NOT a "fortune", personality reading, or
 * consumer artifact. Even the two primary examples apply only to the EXACT
 * 甲-day/庚-year and 甲-day/戊-year pairs respectively.
 */
export function previewGeneralAnnualCalculatedFacts(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
): GeneralAnnualFactOnlyPreview {
  const unavailable = (
    reasonCode: Extract<GeneralAnnualFactOnlyPreview, { state: 'unavailable' }>['reasonCode'],
  ): GeneralAnnualFactOnlyPreview =>
    ({ state: 'unavailable', reasonCode, productionAuthorized: false });

  const review = buildGeneralAnnualFourteenRuleDecision();
  if (request.intent.temporalScope !== 'annual' || request.targetPeriod?.scope !== 'annual') {
    return unavailable('ANNUAL_REQUEST_REQUIRED');
  }
  const source = resolveAnnualWithCodeApprovedIndependentE1(request);
  if (source.state === 'source_unavailable') return unavailable('ANNUAL_E1_DATE_UNAVAILABLE');
  if (source.state !== 'research_candidate') return unavailable('ANNUAL_REFERENCE_INVALID');
  if (snapshot.derivedFacts.dayMaster.status !== 'resolved') {
    return unavailable('NATAL_DAY_MASTER_UNRESOLVED');
  }

  let temporal;
  try {
    temporal = buildTemporalReadingContext(request);
  } catch {
    return unavailable('ANNUAL_REFERENCE_INVALID');
  }
  if (
    temporal === undefined ||
    temporal.scope !== 'annual' ||
    temporal.annualPillar.stem !== source.annualPillar.stem ||
    temporal.annualPillar.branch !== source.annualPillar.branch
  ) {
    return unavailable('ANNUAL_FACTS_UNAVAILABLE');
  }

  let facts;
  try {
    facts = buildAnnualInterpretationFacts(snapshot, temporal);
  } catch {
    return unavailable('ANNUAL_FACTS_UNAVAILABLE');
  }

  const clashFacts: Extract<GeneralAnnualFactOnlyPreview, { state: 'research_fact_preview_only' }>['branchClashFacts'][number][] = [];
  const omitted: PillarSlot[] = [];
  for (const slot of SLOTS) {
    const state = facts.annualBranchRelations[slot];
    if (state.status !== 'resolved') {
      omitted.push(slot);
    } else if (state.value.relation === 'clash') {
      clashFacts.push(
        Object.freeze({
          natalPillar: slot,
          natalBranch: state.value.natalBranch,
          annualBranch: state.value.annualBranch,
          relation: 'clash',
        }),
      );
    }
  }

  const dayStem = snapshot.derivedFacts.dayMaster.value.value;
  const annualStem = facts.annualPillar.stem;
  const exactPrimaryWitnessMatchesTheseStems =
    dayStem === '갑' &&
    ((annualStem === '경' && facts.annualStemTenGod === '편관') ||
      (annualStem === '무' && facts.annualStemTenGod === '편재'));

  const displayRows = Object.freeze([
    Object.freeze({
      label: '기준 연도',
      value: String(facts.targetYear),
    }),
    Object.freeze({
      label: '적용 연주',
      value: facts.annualPillar.stem + facts.annualPillar.branch,
    }),
    Object.freeze({
      label: '연간 천간·일간 관계(계산)',
      value: facts.annualStemTenGod,
    }),
    Object.freeze({
      label: '원국 지지와의 충(계산)',
      value: clashFacts.length === 0
        ? '확정된 충 관계 없음'
        : clashFacts.map((x) => x.natalPillar + ': ' + x.natalBranch + '-' + x.annualBranch).join(', '),
    }),
  ]);

  return Object.freeze({
    state: 'research_fact_preview_only',
    snapshotId: snapshot.snapshotId,
    requestId: request.requestId,
    decisionHash: review.decisionHash,
    targetYear: facts.targetYear,
    effectiveYear: source.effectiveYear,
    annualPillar: Object.freeze({ ...facts.annualPillar }),
    tenGodRelation: Object.freeze({
      dayStem,
      annualStem,
      computedName: facts.annualStemTenGod,
      exactPrimaryWitnessMatchesTheseStems,
    }),
    branchClashFacts: Object.freeze(clashFacts),
    omittedUnresolvedPillars: Object.freeze(omitted),
    displayRows,
    constraints: Object.freeze({
      calculationFactsOnly: true,
      sourceQualifiedModernAnnualMeaning: false,
      mayGenerateAnnualInterpretation: false,
      mayCallModel: false,
      productionAuthorized: false,
    }),
  });
}
