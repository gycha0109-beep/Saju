import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildGeneralAnnualAtomicSourceAcquisition } from './general-annual-atomic-semantic-source-acquisition.js';
import {
  GENERAL_ANNUAL_POLICY_SOURCE,
  GENERAL_ANNUAL_TENSION_RULES,
} from './general-annual-reading-candidate.js';

export const GENERAL_ANNUAL_BRANCH_CLASH_ADJUDICATION_VERSION =
  'sa7d-a4-annual-branch-clash-adjudication-v1' as const;

const PILLAR_REVIEWS = Object.freeze([
  Object.freeze({
    semanticKey: 'ANNUAL_BRANCH_CLASH_YEAR',
    natalPillar: 'year',
    currentClaim: 'Annual-to-natal year-branch clash is emitted as a generic tension signal with minor emphasis.',
    unsupportedPillarInference: 'ancestry_or_family_event_from_natal_year_branch',
    counterexample: 'A computed year-branch clash alone does not identify a family or ancestral event.',
  }),
  Object.freeze({
    semanticKey: 'ANNUAL_BRANCH_CLASH_MONTH',
    natalPillar: 'month',
    currentClaim: 'Annual-to-natal month-branch clash is emitted as a generic tension signal with minor emphasis.',
    unsupportedPillarInference: 'occupation_or_workplace_event_from_natal_month_branch',
    counterexample: 'A computed month-branch clash alone does not identify a career or workplace change.',
  }),
  Object.freeze({
    semanticKey: 'ANNUAL_BRANCH_CLASH_DAY',
    natalPillar: 'day',
    currentClaim: 'Annual-to-natal day-branch clash is emitted as a generic tension signal with moderate emphasis.',
    unsupportedPillarInference: 'spouse_or_separation_event_from_natal_day_branch',
    counterexample: 'The candidate moderate day emphasis does not establish a spouse event or a stronger traditional effect.',
  }),
  Object.freeze({
    semanticKey: 'ANNUAL_BRANCH_CLASH_HOUR',
    natalPillar: 'hour',
    currentClaim: 'Annual-to-natal hour-branch clash is emitted as a generic tension signal with minor emphasis.',
    unsupportedPillarInference: 'children_or_late_life_event_from_natal_hour_branch',
    counterexample: 'A computed hour-branch clash alone does not identify a children-related or late-life event.',
  }),
] as const);

export function buildGeneralAnnualBranchClashAdjudication() {
  const acquisition = buildGeneralAnnualAtomicSourceAcquisition();
  if (
    !acquisition.observations.exactMingLunTaisuiPassageVisuallyVerified ||
    !acquisition.annualBranchClashBoundary.deterministicRelationFactMayBeInputEvidence ||
    acquisition.annualBranchClashBoundary.genericAnnualTensionSemanticAuthorized
  ) {
    throw new Error('Annual branch-clash adjudication requires the fail-closed Research source contract');
  }

  const material = Object.freeze({
    version: GENERAL_ANNUAL_BRANCH_CLASH_ADJUDICATION_VERSION,
    parentIssue: '#2386' as const,
    acquisitionRef: Object.freeze({
      version: acquisition.version,
      acquisitionId: acquisition.acquisitionId,
      mingLunTaisuiIsAnnualBranchClashEvidence: false as const,
    }),
    candidateBinding: Object.freeze({
      internalPolicySourceId: GENERAL_ANNUAL_POLICY_SOURCE.sourceId,
      candidateRuleCount: GENERAL_ANNUAL_TENSION_RULES.length,
      currentCandidateCodeMutated: false as const,
    }),
    sourceInventory: Object.freeze([
      Object.freeze({
        sourceId: 'KIM_MAN_TAE_2013_BRANCH_CLASH_ORIGIN',
        sourceClass: 'modern_scholarly_secondary',
        locator: 'https://doi.org/10.25024/ksq.36.3.201309.134',
        supportedUse: 'branch_clash_structural_context_only',
        annualPillarSpecificDirectSupport: false as const,
      }),
      Object.freeze({
        sourceId: 'LEE_JAE_SEUNG_2021_BRANCH_COMBINATION_STRENGTH',
        sourceClass: 'modern_scholarly_secondary',
        locator: 'https://www.kci.go.kr/kciportal/landing/article.kci?arti_id=ART002788509',
        supportedUse: 'interaction_context_and_conditional_combination_only',
        annualPillarSpecificDirectSupport: false as const,
        abstractNotesDaewoonAndSewoonInteractionAsFutureResearch: true as const,
      }),
      Object.freeze({
        sourceId: GENERAL_ANNUAL_POLICY_SOURCE.sourceId,
        sourceClass: 'internal_product_policy',
        supportedUse: 'current_candidate_description_only',
        annualPillarSpecificDirectSupport: false as const,
      }),
    ]),
    decisions: Object.freeze(PILLAR_REVIEWS.map((pillar) => Object.freeze({
      semanticKey: pillar.semanticKey,
      currentClaim: pillar.currentClaim,
      natalPillar: pillar.natalPillar,
      sourceRefs: Object.freeze([
        'KIM_MAN_TAE_2013_BRANCH_CLASH_ORIGIN',
        'LEE_JAE_SEUNG_2021_BRANCH_COMBINATION_STRENGTH',
        GENERAL_ANNUAL_POLICY_SOURCE.sourceId,
      ] as const),
      sourceStatement: Object.freeze({
        primaryAnnualClashPassageVerified: false as const,
        kim2013: 'Modern scholarly research discusses clash and punishment as earthly-branch interaction concepts, not these four annual pillar-specific meanings.',
        lee2021: 'The scholarly abstract studies context-dependent combination strength and explicitly calls for future Daewoon/Sewoon combination-clash research.',
        currentClaimOrigin: 'The present tension and emphasis assignments are from internal research policy, not an independently verified classical passage.',
      }),
      interpretiveReading:
        'A governed Six-Clash relation may describe a relationship between the target-year branch and this resolved natal branch, without assigning a life event, tension or severity.',
      researchInference:
        'Only the deterministic relation identity may be carried as candidate structural input; bounded annual interaction meaning requires separate source and methodology review.',
      preconditions: Object.freeze([
        'RESOLVED_TARGET_YEAR_ANNUAL_BRANCH',
        'RESOLVED_NATAL_' + pillar.natalPillar.toUpperCase() + '_BRANCH',
        'GOVERNED_EXACT_SIX_CLASH_PAIR_MATCH',
        'PRESERVE_PERIOD_AND_NATAL_PILLAR_IDENTITIES',
      ]),
      meaningStrength: 'relation_fact_only' as const,
      qualifiers: Object.freeze([
        'CALCULATED_RELATION_IS_NOT_INTERPRETATION',
        'COEXISTING_COMBINATIONS_AND_OTHER_INTERACTIONS_NOT_RESOLVED',
        'PILLAR_SPECIFIC_EMPHASIS_FROM_INTERNAL_CANDIDATE_IS_NOT_SOURCE_QUALIFIED',
      ]),
      exceptions: Object.freeze([
        'UNKNOWN_OR_AMBIGUOUS_ANNUAL_OR_NATAL_BRANCH_FAIL_CLOSED',
        'NON_CLASHING_BRANCH_PAIR_DOES_NOT_EMIT_RELATION_FACT',
        'MULTIPLE_INTERACTIONS_REQUIRE_METHOD_SPECIFIC_CONTEXT',
      ]),
      counterexamples: Object.freeze([
        'NON_SIX_CLASH_BRANCH_PAIR_DOES_NOT_SATISFY_SIX_CLASH',
        pillar.counterexample,
        'ANNUAL_BRANCH_CLASH_DOES_NOT_ESTABLISH_A_SPECIFIC_EVENT',
      ]),
      schoolDependencies: Object.freeze([
        'INTERACTION_STRENGTH_AND_ESTABLISHMENT_REQUIRE_A_SELECTED_GOVERNED_METHOD',
        'PALACE_OR_PILLAR_MEANING_REQUIRES_DIRECT_SCHOOL_SPECIFIC_EVIDENCE',
      ]),
      nonImplications: Object.freeze([
        'NO_GENERIC_ANNUAL_TENSION',
        'NO_PILLAR_SPECIFIC_LIFE_DOMAIN_EVENT',
        'NO_ACCIDENT_ILLNESS_SEPARATION_OR_FINANCIAL_LOSS_PREDICTION',
        'NO_STRENGTH_RANKING_FROM_CURRENT_CANDIDATE_EMPHASIS',
        'NO_MONTHLY_AUTHORITY',
        'NO_ENGINE_PREVIEW_OFFICIAL_READING_OR_PRODUCTION',
      ]),
      sourceSupportGrade: 'INSUFFICIENT' as const,
      structuralContextGrade: 'CROSS_REFERENCE_ONLY' as const,
      semanticDisposition: 'REQUIRES_SEPARATE_DIRECT_SUPPORT' as const,
      unresolvedEvidence: Object.freeze([
        'EXACT_PRIMARY_WITNESS_AND_PASSAGE_FOR_ANNUAL_TO_THIS_NATAL_PILLAR_CLASH_MEANING',
        'SOURCE_GROUNDED_RULE_FOR_TENSION_OR_STRUCTURAL_EFFECT',
        'EXCEPTION_AND_COEXISTING_INTERACTION_METHOD',
        'DIRECT_EVIDENCE_FOR_' + pillar.unsupportedPillarInference.toUpperCase(),
      ]),
      qualifiedTraditionalAnnualMeaning: false as const,
      productionAuthorization: false as const,
    }))),
    boundary: Object.freeze({
      deterministicClashRelationIsInputFactOnly: true as const,
      genericTensionAuthorized: false as const,
      pillarSpecificEmphasisAuthorized: false as const,
      specificEventPredictionAuthorized: false as const,
      bridgeReentryReady: false as const,
      engineAuthorityAuthorized: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      monthlyAuthorityAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition:
      'HOLD_UNTIL_DIRECT_ANNUAL_CLASH_MEANING_AND_PILLAR_SPECIFIC_SUPPORT_IS_ACQUIRED' as const,
  });

  return Object.freeze({
    ...material,
    adjudicationId: deterministicContentHash(material),
  });
}
