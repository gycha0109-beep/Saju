import { createHash } from 'node:crypto';
import type { SourceReference } from '../contracts/interpretation.js';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
  type GeneralNatalGejuCandidatePredicateGap,
} from './general-natal-geju-candidate-source-frontier.js';
import {
  GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_VERSION,
} from './general-natal-geju-establishment-source-clause-admission-review.js';

export const GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_SCOPE =
  'ziping_zhenquan_establishment_outcome_representation_review' as const;
export const GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_DECISION =
  'SOURCE_SEMANTIC_LAYERS_REPRESENTABLE_CANONICAL_TERMINAL_STATE_NOT_AUTHORIZED' as const;

export const GENERAL_NATAL_GEJU_SOURCE_BASE_OUTCOME_VALUES = Object.freeze([
  'cheng',
  'bai',
] as const);

export const GENERAL_NATAL_GEJU_SOURCE_MIXED_OUTCOME_VALUES = Object.freeze([
  'cheng_zhong_you_bai',
  'bai_zhong_you_cheng',
] as const);

export const GENERAL_NATAL_GEJU_SOURCE_INTERVENTION_VALUES = Object.freeze([
  'dai_ji',
  'jiu_ying',
] as const);

export const GENERAL_NATAL_GEJU_SOURCE_CAUSAL_TRANSITION_VALUES = Object.freeze([
  'yin_cheng_de_bai',
  'yin_bai_de_cheng',
] as const);

export const GENERAL_NATAL_GEJU_SOURCE_OUTCOME_AXES = Object.freeze([
  {
    axis: 'base_outcome',
    values: GENERAL_NATAL_GEJU_SOURCE_BASE_OUTCOME_VALUES,
  },
  {
    axis: 'mixed_outcome',
    values: GENERAL_NATAL_GEJU_SOURCE_MIXED_OUTCOME_VALUES,
  },
  {
    axis: 'intervention',
    values: GENERAL_NATAL_GEJU_SOURCE_INTERVENTION_VALUES,
  },
  {
    axis: 'causal_transition',
    values: GENERAL_NATAL_GEJU_SOURCE_CAUSAL_TRANSITION_VALUES,
  },
] as const);

const SOURCE_COMMON = {
  sourceType: 'classical_text',
  title: '子平真詮評注',
  author: '沈孝瞻',
  editor: '徐樂吾',
  language: 'zh-Hant',
  url: 'https://ctext.org/wiki.pl?chapter=974137&if=gb',
  accessedAt: '2026-09-13',
  provenanceTier: 'cross_reference',
  rights: {
    copyrightStatus: 'unknown',
    reusePolicy: 'metadata_only',
  },
} as const;

export const GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_SOURCE_REFERENCES =
  Object.freeze({
    mixedOutcomeAndIntervention: {
      ...SOURCE_COMMON,
      sourceId: 'SRC-GEJU-ZIPING-ZHENQUAN-MIXED-OUTCOME-INTERVENTION',
      locator: {
        section: '論用神成敗救應',
        anchor: '成中有敗，必是帶忌；敗中有成，全憑救應',
      },
      notes:
        'Direct source relation between the two mixed-outcome expressions and their corresponding 帶忌 / 救應 layer. This does not establish canonical chart predicates or terminal-state precedence.',
    } satisfies SourceReference,
    causalTransitions: {
      ...SOURCE_COMMON,
      sourceId: 'SRC-GEJU-ZIPING-ZHENQUAN-CAUSAL-OUTCOME-TRANSITIONS',
      locator: {
        section: '論用神因成得敗因敗得成',
        anchor: '因成得敗，因敗得成',
      },
      notes:
        'Direct source transition vocabulary is observed in a separate section. It is preserved separately from 成中有敗 / 敗中有成; cross-section equivalence is not authorized.',
    } satisfies SourceReference,
  });

export const GENERAL_NATAL_GEJU_SOURCE_DIRECT_RELATION_BINDINGS = Object.freeze([
  {
    mixedOutcome: 'cheng_zhong_you_bai',
    intervention: 'dai_ji',
    sourceId:
      GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_SOURCE_REFERENCES
        .mixedOutcomeAndIntervention.sourceId,
  },
  {
    mixedOutcome: 'bai_zhong_you_cheng',
    intervention: 'jiu_ying',
    sourceId:
      GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_SOURCE_REFERENCES
        .mixedOutcomeAndIntervention.sourceId,
  },
] as const);

export const GENERAL_NATAL_GEJU_OUTCOME_REPRESENTATION_UNRESOLVED_CANONICAL_PRIMITIVES =
  Object.freeze([
    'canonical_candidate_identity',
    'canonical_clause_input_resolution',
    'mixed_outcome_application_predicate',
    'intervention_effect_resolution',
    'transition_trigger_predicate',
    'cross_section_semantic_equivalence',
    'terminal_state_precedence',
  ] as const);

export interface GeneralNatalGejuEstablishmentOutcomeRepresentationReviewReport {
  readonly reviewId: string;
  readonly reviewVersion: typeof GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_VERSION;
  readonly sourceScope: typeof GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_SCOPE;
  readonly decision: typeof GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_DECISION;
  readonly upstreamEstablishmentReviewVersion: typeof GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_VERSION;
  readonly upstreamEstablishmentReviewDefinitionHash: string;
  readonly sourceSemanticLayeredRepresentationAuthorized: true;
  readonly sourceMixedOutcomeInterventionBindingsAuthorized: true;
  readonly sourceCausalTransitionVocabularyObserved: true;
  readonly mixedOutcomeToTransitionEquivalenceAuthorized: false;
  readonly canonicalOutcomeRepresentationAuthorized: false;
  readonly canonicalTerminalStateAuthorized: false;
  readonly binaryCollapseAuthorized: false;
  readonly rescuePrecedenceAuthorized: false;
  readonly candidateFactsEmitted: false;
  readonly establishmentFactsEmitted: false;
  readonly outcomeAxes: typeof GENERAL_NATAL_GEJU_SOURCE_OUTCOME_AXES;
  readonly directRelationBindings: typeof GENERAL_NATAL_GEJU_SOURCE_DIRECT_RELATION_BINDINGS;
  readonly unresolvedCanonicalPrimitives: typeof GENERAL_NATAL_GEJU_OUTCOME_REPRESENTATION_UNRESOLVED_CANONICAL_PRIMITIVES;
  readonly openPredicateGaps: readonly GeneralNatalGejuCandidatePredicateGap[];
  readonly sourceIds: readonly string[];
  readonly authorityBoundary: string;
  readonly notes: readonly string[];
}

const SOURCE_IDS = Object.freeze(
  Object.values(GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_SOURCE_REFERENCES)
    .map((source) => source.sourceId)
    .sort(),
);

export const GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_VERSION,
        sourceScope: GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_SCOPE,
        decision: GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_DECISION,
        upstreamEstablishmentReviewVersion:
          GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_VERSION,
        upstreamEstablishmentReviewDefinitionHash:
          GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_DEFINITION_HASH,
        outcomeAxes: GENERAL_NATAL_GEJU_SOURCE_OUTCOME_AXES,
        directRelationBindings: GENERAL_NATAL_GEJU_SOURCE_DIRECT_RELATION_BINDINGS,
        unresolvedCanonicalPrimitives:
          GENERAL_NATAL_GEJU_OUTCOME_REPRESENTATION_UNRESOLVED_CANONICAL_PRIMITIVES,
        sourceIds: SOURCE_IDS,
        sourceSemanticLayeredRepresentationAuthorized: true,
        mixedOutcomeToTransitionEquivalenceAuthorized: false,
        canonicalOutcomeRepresentationAuthorized: false,
        canonicalTerminalStateAuthorized: false,
        binaryCollapseAuthorized: false,
        rescuePrecedenceAuthorized: false,
        openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
      }),
    )
    .digest('hex');

export function buildGeneralNatalGejuEstablishmentOutcomeRepresentationReview(): GeneralNatalGejuEstablishmentOutcomeRepresentationReviewReport {
  const material = {
    reviewVersion: GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_VERSION,
    sourceScope: GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_SCOPE,
    decision: GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_DECISION,
    upstreamEstablishmentReviewVersion:
      GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_VERSION,
    upstreamEstablishmentReviewDefinitionHash:
      GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_DEFINITION_HASH,
    sourceSemanticLayeredRepresentationAuthorized: true as const,
    sourceMixedOutcomeInterventionBindingsAuthorized: true as const,
    sourceCausalTransitionVocabularyObserved: true as const,
    mixedOutcomeToTransitionEquivalenceAuthorized: false as const,
    canonicalOutcomeRepresentationAuthorized: false as const,
    canonicalTerminalStateAuthorized: false as const,
    binaryCollapseAuthorized: false as const,
    rescuePrecedenceAuthorized: false as const,
    candidateFactsEmitted: false as const,
    establishmentFactsEmitted: false as const,
    outcomeAxes: GENERAL_NATAL_GEJU_SOURCE_OUTCOME_AXES,
    directRelationBindings: GENERAL_NATAL_GEJU_SOURCE_DIRECT_RELATION_BINDINGS,
    unresolvedCanonicalPrimitives:
      GENERAL_NATAL_GEJU_OUTCOME_REPRESENTATION_UNRESOLVED_CANONICAL_PRIMITIVES,
    openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
    sourceIds: SOURCE_IDS,
    authorityBoundary:
      'Direct source semantics support a layered research representation that keeps base outcome, mixed outcome, intervention, and causal transition vocabularies distinct. This review does not authorize chart-level assignment, cross-section equivalence, rescue precedence, terminal-state reduction, or canonical GEJU_ESTABLISHMENT_STATE emission.',
  };

  return Object.freeze({
    reviewId: `general_natal_geju_establishment_outcome_representation_review_${createHash('sha256')
      .update(JSON.stringify(material))
      .digest('hex')
      .slice(0, 24)}`,
    ...material,
    notes: Object.freeze([
      '成/敗, 成中有敗/敗中有成, 帶忌/救應, and 因成得敗/因敗得成 are preserved as separate source-semantic layers rather than collapsed into one enum.',
      'Only the direct mixed-outcome to 帶忌/救應 relation is bound here; the later causal-transition vocabulary remains a separate observed layer.',
      'No absence of an intervention is treated as proof of a terminal outcome.',
      'All five coarse Gyeokguk gaps remain open; production authority and Commerce remain blocked.',
    ]),
  });
}
