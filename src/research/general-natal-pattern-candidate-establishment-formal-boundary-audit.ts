import {
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION,
} from './general-natal-geju-candidate-source-frontier.js';
import {
  GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_VERSION,
} from './general-natal-geju-selection-signal-observation.js';
import {
  GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION,
} from './general-natal-geju-source-semantic-use-identity.js';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_VERSION,
} from './general-natal-geju-candidate-identity-admission-review.js';
import {
  GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_VERSION,
} from './general-natal-geju-establishment-source-clause-admission-review.js';
import {
  GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_VERSION,
} from './general-natal-geju-establishment-outcome-representation-review.js';
import { GENERAL_NATAL_GEJU_MIXED_OUTCOME_APPLICATION_REVIEW } from './general-natal-geju-mixed-outcome-application-review.js';
import {
  GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_VERSION,
} from './general-natal-geju-month-order-hidden-stem-selection-admission-review.js';
import {
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_VERSION,
} from './general-natal-geju-branch-meeting-selection-effect-admission-review.js';

export const R131_PATTERN_CANDIDATE_ESTABLISHMENT_BOUNDARY_VERSION =
  '0.1.0-research' as const;

export type R131StageId =
  | 'CANONICAL_SUBSTRATE'
  | 'SOURCE_SELECTION_SIGNAL'
  | 'SOURCE_SEMANTIC_USE'
  | 'SOURCE_PATTERN_WORDING'
  | 'CANONICAL_CANDIDATE_IDENTITY'
  | 'SOURCE_ESTABLISHMENT_CLAUSE'
  | 'CANONICAL_ESTABLISHMENT_PREDICATE'
  | 'SOURCE_OUTCOME_LAYER'
  | 'CANONICAL_TERMINAL_STATE'
  | 'EMITTED_PATTERN_FACT';

export type R131StageClass =
  | 'CANONICAL_INPUT'
  | 'SOURCE_OBSERVATION'
  | 'CANONICAL_CANDIDATE'
  | 'SOURCE_ESTABLISHMENT'
  | 'CANONICAL_ESTABLISHMENT'
  | 'OUTPUT_AUTHORITY';

export type R131StageStatus =
  | 'CANONICAL_SUBSTRATE_AVAILABLE'
  | 'BOUNDED_SOURCE_OBSERVATION'
  | 'EXACT_EXEMPLAR_SOURCE_OBSERVATION'
  | 'SOURCE_WORDING_OBSERVED'
  | 'CANONICAL_STAGE_NOT_AUTHORIZED'
  | 'SOURCE_CLAUSE_INVENTORY_OBSERVED'
  | 'SOURCE_LAYER_REPRESENTABLE'
  | 'FACT_EMISSION_NOT_AUTHORIZED';

export interface R131Stage {
  stageId: R131StageId;
  stageClass: R131StageClass;
  status: R131StageStatus;
  description: string;
  sourceObserved: boolean;
  canonicalAuthorityAuthorized: boolean;
  candidateAuthorityAuthorized: boolean;
  establishmentAuthorityAuthorized: boolean;
  factEmissionAuthorized: boolean;
  upstreamArtifacts: readonly string[];
  boundary: string;
}

export type R131TransitionStatus =
  | 'BOUNDED_OBSERVATION_AUTHORIZED'
  | 'EXACT_EXEMPLAR_OBSERVATION_AUTHORIZED'
  | 'SOURCE_RELATION_OBSERVED'
  | 'BLOCKED_CANONICAL_CANDIDATE_BRIDGE'
  | 'BLOCKED_CANONICAL_ESTABLISHMENT_BRIDGE'
  | 'BLOCKED_TERMINAL_REPRESENTATION'
  | 'BLOCKED_FACT_EMISSION'
  | 'NON_EQUIVALENT_STAGES';

export type R131TransitionScope =
  | 'BOUNDED_SOURCE'
  | 'EXACT_EXEMPLAR'
  | 'SOURCE_SEMANTIC'
  | 'CANONICAL_BRIDGE'
  | 'OUTPUT_BOUNDARY';

export interface R131TransitionAudit {
  transitionId: string;
  fromStage: R131StageId;
  toStage: R131StageId;
  transitionScope: R131TransitionScope;
  status: R131TransitionStatus;
  upstreamEvidence: readonly string[];
  observedBasis: string;
  missingBridge: string | null;
  directPromotionBlocked: boolean;
  candidateIdentityAuthorized: false;
  candidateDerivationAuthorized: false;
  establishmentPredicateAuthorized: false;
  canonicalTerminalStateAuthorized: false;
  candidateFactsEmitted: false;
  establishmentFactsEmitted: false;
  productionAuthorityPromoted: false;
  authorityConsequence: string;
}

export const R131_UPSTREAM_BINDINGS = Object.freeze({
  candidateSourceFrontier: Object.freeze({
    version: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION,
    definitionHash: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_DEFINITION_HASH,
  }),
  selectionSignalObservation: Object.freeze({
    version: GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_VERSION,
    definitionHash: GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_DEFINITION_HASH,
  }),
  sourceSemanticUseIdentity: Object.freeze({
    version: GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION,
    definitionHash: GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_DEFINITION_HASH,
  }),
  candidateIdentityAdmission: Object.freeze({
    version: GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_VERSION,
    definitionHash:
      GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_DEFINITION_HASH,
  }),
  establishmentSourceClauseAdmission: Object.freeze({
    version: GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_VERSION,
    definitionHash:
      GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_DEFINITION_HASH,
  }),
  establishmentOutcomeRepresentation: Object.freeze({
    version: GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_VERSION,
    definitionHash:
      GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_DEFINITION_HASH,
  }),
  mixedOutcomeApplication: Object.freeze({
    version: GENERAL_NATAL_GEJU_MIXED_OUTCOME_APPLICATION_REVIEW.version,
    upstreamVersion: GENERAL_NATAL_GEJU_MIXED_OUTCOME_APPLICATION_REVIEW.upstreamVersion,
    upstreamHash: GENERAL_NATAL_GEJU_MIXED_OUTCOME_APPLICATION_REVIEW.upstreamHash,
  }),
  monthOrderHiddenStemSelection: Object.freeze({
    version:
      GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_VERSION,
    definitionHash:
      GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_DEFINITION_HASH,
  }),
  branchMeetingSelectionEffect: Object.freeze({
    version:
      GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_VERSION,
    definitionHash:
      GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_DEFINITION_HASH,
  }),
});

export const R131_STAGES: readonly R131Stage[] = Object.freeze([
  {
    stageId: 'CANONICAL_SUBSTRATE',
    stageClass: 'CANONICAL_INPUT',
    status: 'CANONICAL_SUBSTRATE_AVAILABLE',
    description:
      'Resolved month pillar, hidden-stem membership, Ten-God identity, and structural-relation substrate where available.',
    sourceObserved: false,
    canonicalAuthorityAuthorized: true,
    candidateAuthorityAuthorized: false,
    establishmentAuthorityAuthorized: false,
    factEmissionAuthorized: false,
    upstreamArtifacts: ['general-natal-geju-candidate-source-frontier'],
    boundary:
      'Resolved canonical inputs are structural substrate only; they do not select or establish Gyeokguk.',
  },
  {
    stageId: 'SOURCE_SELECTION_SIGNAL',
    stageClass: 'SOURCE_OBSERVATION',
    status: 'BOUNDED_SOURCE_OBSERVATION',
    description:
      'Governed positive transparency and source-aligned branch-meeting signals in the selected mixed-qi scope.',
    sourceObserved: true,
    canonicalAuthorityAuthorized: false,
    candidateAuthorityAuthorized: false,
    establishmentAuthorityAuthorized: false,
    factEmissionAuthorized: false,
    upstreamArtifacts: [
      'general-natal-geju-selection-signal-observation',
      'general-natal-geju-month-order-hidden-stem-selection-admission-review',
      'general-natal-geju-branch-meeting-selection-effect-admission-review',
    ],
    boundary:
      'Signal identity, count, coexistence, and serialization order are not candidate identity, rank, strength, precedence, or establishment.',
  },
  {
    stageId: 'SOURCE_SEMANTIC_USE',
    stageClass: 'SOURCE_OBSERVATION',
    status: 'EXACT_EXEMPLAR_SOURCE_OBSERVATION',
    description:
      'Direct source-named use identity observed only for exact mixed-qi exemplars.',
    sourceObserved: true,
    canonicalAuthorityAuthorized: false,
    candidateAuthorityAuthorized: false,
    establishmentAuthorityAuthorized: false,
    factEmissionAuthorized: false,
    upstreamArtifacts: ['general-natal-geju-source-semantic-use-identity'],
    boundary:
      'Exact source semantic-use identity is not a generalized signal-to-use predicate and is not canonical candidate identity.',
  },
  {
    stageId: 'SOURCE_PATTERN_WORDING',
    stageClass: 'SOURCE_OBSERVATION',
    status: 'SOURCE_WORDING_OBSERVED',
    description:
      'Direct source pattern wording such as 格, 局, 格成, 不成, and 兼格 observed in governed research.',
    sourceObserved: true,
    canonicalAuthorityAuthorized: false,
    candidateAuthorityAuthorized: false,
    establishmentAuthorityAuthorized: false,
    factEmissionAuthorized: false,
    upstreamArtifacts: ['general-natal-geju-candidate-identity-admission-review'],
    boundary:
      'Source directness for pattern wording does not define where a canonical pre-establishment candidate object begins or ends.',
  },
  {
    stageId: 'CANONICAL_CANDIDATE_IDENTITY',
    stageClass: 'CANONICAL_CANDIDATE',
    status: 'CANONICAL_STAGE_NOT_AUTHORIZED',
    description:
      'Hypothetical canonical pre-establishment GEJU_CANDIDATE identity and multiplicity contract.',
    sourceObserved: false,
    canonicalAuthorityAuthorized: false,
    candidateAuthorityAuthorized: false,
    establishmentAuthorityAuthorized: false,
    factEmissionAuthorized: false,
    upstreamArtifacts: ['general-natal-geju-candidate-identity-admission-review'],
    boundary:
      'The repository explicitly records that the canonical candidate stage is not defined and candidate identity/derivation remain unauthorized.',
  },
  {
    stageId: 'SOURCE_ESTABLISHMENT_CLAUSE',
    stageClass: 'SOURCE_ESTABLISHMENT',
    status: 'SOURCE_CLAUSE_INVENTORY_OBSERVED',
    description:
      'Direct source formation-success, formation-failure, mixed-outcome, and rescue clause families.',
    sourceObserved: true,
    canonicalAuthorityAuthorized: false,
    candidateAuthorityAuthorized: false,
    establishmentAuthorityAuthorized: false,
    factEmissionAuthorized: false,
    upstreamArtifacts: ['general-natal-geju-establishment-source-clause-admission-review'],
    boundary:
      'Source-semantic establishment clauses are inventoried, but canonical clause-input resolution and executable establishment remain unauthorized.',
  },
  {
    stageId: 'CANONICAL_ESTABLISHMENT_PREDICATE',
    stageClass: 'CANONICAL_ESTABLISHMENT',
    status: 'CANONICAL_STAGE_NOT_AUTHORIZED',
    description:
      'Hypothetical executable predicate that binds a canonical candidate to source establishment clauses.',
    sourceObserved: false,
    canonicalAuthorityAuthorized: false,
    candidateAuthorityAuthorized: false,
    establishmentAuthorityAuthorized: false,
    factEmissionAuthorized: false,
    upstreamArtifacts: ['general-natal-geju-establishment-source-clause-admission-review'],
    boundary:
      'Canonical candidate identity, clause input resolution, and several establishment primitives remain unresolved.',
  },
  {
    stageId: 'SOURCE_OUTCOME_LAYER',
    stageClass: 'SOURCE_ESTABLISHMENT',
    status: 'SOURCE_LAYER_REPRESENTABLE',
    description:
      'Separate source-semantic base, mixed-outcome, intervention, and causal-transition layers.',
    sourceObserved: true,
    canonicalAuthorityAuthorized: false,
    candidateAuthorityAuthorized: false,
    establishmentAuthorityAuthorized: false,
    factEmissionAuthorized: false,
    upstreamArtifacts: [
      'general-natal-geju-establishment-outcome-representation-review',
      'general-natal-geju-mixed-outcome-application-review',
    ],
    boundary:
      '成/敗, 成中有敗/敗中有成, 帶忌/救應, and causal-transition wording remain separate source-semantic layers.',
  },
  {
    stageId: 'CANONICAL_TERMINAL_STATE',
    stageClass: 'CANONICAL_ESTABLISHMENT',
    status: 'CANONICAL_STAGE_NOT_AUTHORIZED',
    description:
      'Hypothetical canonical terminal establishment state after clause application, intervention, and precedence settlement.',
    sourceObserved: false,
    canonicalAuthorityAuthorized: false,
    candidateAuthorityAuthorized: false,
    establishmentAuthorityAuthorized: false,
    factEmissionAuthorized: false,
    upstreamArtifacts: ['general-natal-geju-establishment-outcome-representation-review'],
    boundary:
      'Canonical terminal state, binary collapse, mixed-outcome equivalence, rescue precedence, and terminal precedence are not authorized.',
  },
  {
    stageId: 'EMITTED_PATTERN_FACT',
    stageClass: 'OUTPUT_AUTHORITY',
    status: 'FACT_EMISSION_NOT_AUTHORIZED',
    description:
      'Candidate or establishment fact emitted for downstream interpretation or production consumption.',
    sourceObserved: false,
    canonicalAuthorityAuthorized: false,
    candidateAuthorityAuthorized: false,
    establishmentAuthorityAuthorized: false,
    factEmissionAuthorized: false,
    upstreamArtifacts: [
      'general-natal-geju-candidate-source-frontier',
      'general-natal-geju-candidate-identity-admission-review',
      'general-natal-geju-establishment-source-clause-admission-review',
    ],
    boundary:
      'candidateFactsEmitted=false and establishmentFactsEmitted=false remain binding.',
  },
]);

function transition(
  input: Omit<
    R131TransitionAudit,
    | 'candidateIdentityAuthorized'
    | 'candidateDerivationAuthorized'
    | 'establishmentPredicateAuthorized'
    | 'canonicalTerminalStateAuthorized'
    | 'candidateFactsEmitted'
    | 'establishmentFactsEmitted'
    | 'productionAuthorityPromoted'
  >,
): R131TransitionAudit {
  return Object.freeze({
    ...input,
    candidateIdentityAuthorized: false,
    candidateDerivationAuthorized: false,
    establishmentPredicateAuthorized: false,
    canonicalTerminalStateAuthorized: false,
    candidateFactsEmitted: false,
    establishmentFactsEmitted: false,
    productionAuthorityPromoted: false,
  });
}

export const R131_TRANSITION_AUDITS: readonly R131TransitionAudit[] = Object.freeze([
  transition({
    transitionId: 'R131-T01-SUBSTRATE-TO-SELECTION-SIGNAL',
    fromStage: 'CANONICAL_SUBSTRATE',
    toStage: 'SOURCE_SELECTION_SIGNAL',
    transitionScope: 'BOUNDED_SOURCE',
    status: 'BOUNDED_OBSERVATION_AUTHORIZED',
    upstreamEvidence: [
      'candidate-source-frontier',
      'selection-signal-observation',
      'month-order-hidden-stem-selection-review',
      'branch-meeting-selection-effect-review',
    ],
    observedBasis:
      'Governed positive transparency and source-aligned full-three branch-meeting observations can be emitted as research signals in the selected scope.',
    missingBridge:
      'The signal set is non-exhaustive and no generalized month-order selector or branch-meeting post-interaction predicate is authorized.',
    directPromotionBlocked: false,
    authorityConsequence:
      'Research signal observation is allowed, but no candidate or establishment authority follows.',
  }),
  transition({
    transitionId: 'R131-T02-SIGNAL-TO-SEMANTIC-USE',
    fromStage: 'SOURCE_SELECTION_SIGNAL',
    toStage: 'SOURCE_SEMANTIC_USE',
    transitionScope: 'EXACT_EXEMPLAR',
    status: 'EXACT_EXEMPLAR_OBSERVATION_AUTHORIZED',
    upstreamEvidence: ['source-semantic-use-identity'],
    observedBasis:
      'Exact direct exemplars map governed signal sets to directly source-named semantic uses.',
    missingBridge:
      'No generalized signal-to-semantic-use identity predicate or exhaustive exemplar set exists.',
    directPromotionBlocked: false,
    authorityConsequence:
      'Exact exemplar semantic-use observation is allowed only within matched source examples.',
  }),
  transition({
    transitionId: 'R131-T03-SEMANTIC-USE-TO-PATTERN-WORDING',
    fromStage: 'SOURCE_SEMANTIC_USE',
    toStage: 'SOURCE_PATTERN_WORDING',
    transitionScope: 'SOURCE_SEMANTIC',
    status: 'SOURCE_RELATION_OBSERVED',
    upstreamEvidence: ['candidate-identity-admission-review'],
    observedBasis:
      'The governed source contains direct use-selection identity and direct pattern wording including 格/局/兼格 surfaces.',
    missingBridge:
      'The repository does not define a generalized semantic-use-to-pattern identity predicate.',
    directPromotionBlocked: false,
    authorityConsequence:
      'Source wording may be observed without creating canonical candidate identity.',
  }),
  transition({
    transitionId: 'R131-T04-PATTERN-WORDING-TO-CANDIDATE',
    fromStage: 'SOURCE_PATTERN_WORDING',
    toStage: 'CANONICAL_CANDIDATE_IDENTITY',
    transitionScope: 'CANONICAL_BRIDGE',
    status: 'BLOCKED_CANONICAL_CANDIDATE_BRIDGE',
    upstreamEvidence: ['candidate-identity-admission-review'],
    observedBasis:
      'Direct 格/局/格成/不成/兼格 wording exists.',
    missingBridge:
      'No canonical pre-establishment candidate-stage definition, identity contract, or source-wording bridge is authorized.',
    directPromotionBlocked: true,
    authorityConsequence:
      'Source pattern wording must not emit GEJU_CANDIDATE.',
  }),
  transition({
    transitionId: 'R131-T05-SIGNAL-TO-CANDIDATE',
    fromStage: 'SOURCE_SELECTION_SIGNAL',
    toStage: 'CANONICAL_CANDIDATE_IDENTITY',
    transitionScope: 'CANONICAL_BRIDGE',
    status: 'BLOCKED_CANONICAL_CANDIDATE_BRIDGE',
    upstreamEvidence: ['selection-signal-observation'],
    observedBasis:
      'Zero/one/multiple governed source signals can be observed.',
    missingBridge:
      'Signal identity, count, coexistence, and array order do not define candidate identity.',
    directPromotionBlocked: true,
    authorityConsequence:
      'A selection signal is not a candidate.',
  }),
  transition({
    transitionId: 'R131-T06-SEMANTIC-USE-TO-CANDIDATE',
    fromStage: 'SOURCE_SEMANTIC_USE',
    toStage: 'CANONICAL_CANDIDATE_IDENTITY',
    transitionScope: 'CANONICAL_BRIDGE',
    status: 'BLOCKED_CANONICAL_CANDIDATE_BRIDGE',
    upstreamEvidence: ['source-semantic-use-identity', 'candidate-identity-admission-review'],
    observedBasis:
      'Exact source semantic-use identities can be observed.',
    missingBridge:
      'Source-use identity is not canonical candidate identity; semantic deduplication into candidates is unauthorized.',
    directPromotionBlocked: true,
    authorityConsequence:
      'Same-use observations cannot be collapsed into a canonical candidate object.',
  }),
  transition({
    transitionId: 'R131-T07-SUBSTRATE-TO-CANDIDATE',
    fromStage: 'CANONICAL_SUBSTRATE',
    toStage: 'CANONICAL_CANDIDATE_IDENTITY',
    transitionScope: 'CANONICAL_BRIDGE',
    status: 'BLOCKED_CANONICAL_CANDIDATE_BRIDGE',
    upstreamEvidence: ['candidate-source-frontier'],
    observedBasis:
      'Month pillar, hidden-stem membership, Ten-God identity, and structural relations may be resolved.',
    missingBridge:
      'Resolved structural substrate does not supply ranked month-command selection or a canonical candidate derivation predicate.',
    directPromotionBlocked: true,
    authorityConsequence:
      'Canonical chart facts alone cannot emit a Gyeokguk candidate.',
  }),
  transition({
    transitionId: 'R131-T08-MULTIPLE-SIGNALS-TO-CANDIDATE-MULTIPLICITY',
    fromStage: 'SOURCE_SELECTION_SIGNAL',
    toStage: 'CANONICAL_CANDIDATE_IDENTITY',
    transitionScope: 'CANONICAL_BRIDGE',
    status: 'BLOCKED_CANONICAL_CANDIDATE_BRIDGE',
    upstreamEvidence: ['selection-signal-observation'],
    observedBasis:
      'The source permits plural/coexisting governed signals.',
    missingBridge:
      'No multiple-candidate representation contract, rank, precedence, strength, or winner semantics is authorized.',
    directPromotionBlocked: true,
    authorityConsequence:
      'Multiple signals do not mean multiple canonical candidates.',
  }),
  transition({
    transitionId: 'R131-T09-MULTIPLE-USES-TO-CANDIDATE-MULTIPLICITY',
    fromStage: 'SOURCE_SEMANTIC_USE',
    toStage: 'CANONICAL_CANDIDATE_IDENTITY',
    transitionScope: 'CANONICAL_BRIDGE',
    status: 'BLOCKED_CANONICAL_CANDIDATE_BRIDGE',
    upstreamEvidence: ['source-semantic-use-identity'],
    observedBasis:
      'Exact exemplars show both many-signals-to-one-use and distinct multiple source uses.',
    missingBridge:
      'Source-use cardinality is not candidate cardinality and no candidate multiplicity contract exists.',
    directPromotionBlocked: true,
    authorityConsequence:
      'Multiple semantic uses cannot be serialized as ranked candidate entries.',
  }),
  transition({
    transitionId: 'R131-T10-COUSE-TO-CANDIDATE-PRECEDENCE',
    fromStage: 'SOURCE_PATTERN_WORDING',
    toStage: 'CANONICAL_CANDIDATE_IDENTITY',
    transitionScope: 'CANONICAL_BRIDGE',
    status: 'BLOCKED_CANONICAL_CANDIDATE_BRIDGE',
    upstreamEvidence: ['candidate-identity-admission-review'],
    observedBasis:
      'Source primary/co-pattern wording and plural use can be observed.',
    missingBridge:
      'No generalized primary/co-pattern precedence, ordering, strength, or winner predicate is authorized.',
    directPromotionBlocked: true,
    authorityConsequence:
      'Co-use does not establish candidate precedence.',
  }),
  transition({
    transitionId: 'R131-T11-CANDIDATE-TO-SOURCE-ESTABLISHMENT-CLAUSE',
    fromStage: 'CANONICAL_CANDIDATE_IDENTITY',
    toStage: 'SOURCE_ESTABLISHMENT_CLAUSE',
    transitionScope: 'CANONICAL_BRIDGE',
    status: 'NON_EQUIVALENT_STAGES',
    upstreamEvidence: [
      'candidate-identity-admission-review',
      'establishment-source-clause-admission-review',
    ],
    observedBasis:
      'Source establishment clause families are independently inventoried even though canonical candidate identity is unavailable.',
    missingBridge:
      'There is no authorized binding from a canonical candidate object to applicable source clause families.',
    directPromotionBlocked: true,
    authorityConsequence:
      'Source clause inventory does not cure the missing candidate identity bridge.',
  }),
  transition({
    transitionId: 'R131-T12-PATTERN-WORDING-TO-SOURCE-ESTABLISHMENT-CLAUSE',
    fromStage: 'SOURCE_PATTERN_WORDING',
    toStage: 'SOURCE_ESTABLISHMENT_CLAUSE',
    transitionScope: 'SOURCE_SEMANTIC',
    status: 'SOURCE_RELATION_OBSERVED',
    upstreamEvidence: [
      'candidate-identity-admission-review',
      'establishment-source-clause-admission-review',
    ],
    observedBasis:
      'The governed source contains pattern wording and direct success/failure clause families.',
    missingBridge:
      'Observed source relation does not define canonical applicability or execution.',
    directPromotionBlocked: false,
    authorityConsequence:
      'Source-semantic linkage may be described without creating executable establishment logic.',
  }),
  transition({
    transitionId: 'R131-T13-ESTABLISHMENT-CLAUSE-TO-EXECUTABLE-PREDICATE',
    fromStage: 'SOURCE_ESTABLISHMENT_CLAUSE',
    toStage: 'CANONICAL_ESTABLISHMENT_PREDICATE',
    transitionScope: 'CANONICAL_BRIDGE',
    status: 'BLOCKED_CANONICAL_ESTABLISHMENT_BRIDGE',
    upstreamEvidence: ['establishment-source-clause-admission-review'],
    observedBasis:
      'Direct source formation-success and formation-failure clauses are observed.',
    missingBridge:
      'Canonical candidate identity and canonical clause-input resolution are unavailable; ordinary strength, root weight, position appropriateness, interaction effects, mixed outcome, and rescue precedence remain unresolved.',
    directPromotionBlocked: true,
    authorityConsequence:
      'Source clauses are not executable establishment predicates.',
  }),
  transition({
    transitionId: 'R131-T14-CANDIDATE-TO-EXECUTABLE-ESTABLISHMENT',
    fromStage: 'CANONICAL_CANDIDATE_IDENTITY',
    toStage: 'CANONICAL_ESTABLISHMENT_PREDICATE',
    transitionScope: 'CANONICAL_BRIDGE',
    status: 'BLOCKED_CANONICAL_ESTABLISHMENT_BRIDGE',
    upstreamEvidence: [
      'candidate-identity-admission-review',
      'establishment-source-clause-admission-review',
    ],
    observedBasis:
      'Candidate and establishment are explicitly preserved as distinct semantic stages.',
    missingBridge:
      'Candidate identity itself is unauthorized and no executable establishment predicate exists.',
    directPromotionBlocked: true,
    authorityConsequence:
      'No candidate-to-established state transition may execute.',
  }),
  transition({
    transitionId: 'R131-T15-SIGNAL-TO-EXECUTABLE-ESTABLISHMENT',
    fromStage: 'SOURCE_SELECTION_SIGNAL',
    toStage: 'CANONICAL_ESTABLISHMENT_PREDICATE',
    transitionScope: 'CANONICAL_BRIDGE',
    status: 'BLOCKED_CANONICAL_ESTABLISHMENT_BRIDGE',
    upstreamEvidence: ['selection-signal-observation', 'establishment-source-clause-admission-review'],
    observedBasis:
      'Selection signals are research observations only.',
    missingBridge:
      'Both the candidate identity bridge and executable establishment bridge are absent.',
    directPromotionBlocked: true,
    authorityConsequence:
      'A signal cannot skip candidate identity and establish a pattern.',
  }),
  transition({
    transitionId: 'R131-T16-SEMANTIC-USE-TO-EXECUTABLE-ESTABLISHMENT',
    fromStage: 'SOURCE_SEMANTIC_USE',
    toStage: 'CANONICAL_ESTABLISHMENT_PREDICATE',
    transitionScope: 'CANONICAL_BRIDGE',
    status: 'BLOCKED_CANONICAL_ESTABLISHMENT_BRIDGE',
    upstreamEvidence: ['source-semantic-use-identity', 'establishment-source-clause-admission-review'],
    observedBasis:
      'Exact source semantic use can be observed.',
    missingBridge:
      'Semantic use is neither canonical candidate identity nor an executable establishment predicate.',
    directPromotionBlocked: true,
    authorityConsequence:
      'Exact source use cannot establish Gyeokguk.',
  }),
  transition({
    transitionId: 'R131-T17-PATTERN-WORDING-TO-EXECUTABLE-ESTABLISHMENT',
    fromStage: 'SOURCE_PATTERN_WORDING',
    toStage: 'CANONICAL_ESTABLISHMENT_PREDICATE',
    transitionScope: 'CANONICAL_BRIDGE',
    status: 'BLOCKED_CANONICAL_ESTABLISHMENT_BRIDGE',
    upstreamEvidence: [
      'candidate-identity-admission-review',
      'establishment-source-clause-admission-review',
    ],
    observedBasis:
      'Direct 格成/不成 wording is source-observed.',
    missingBridge:
      'Source wording does not provide canonical chart predicates, input resolution, or generalized execution semantics.',
    directPromotionBlocked: true,
    authorityConsequence:
      '格成/不成 wording is not executable code authority.',
  }),
  transition({
    transitionId: 'R131-T18-ESTABLISHMENT-CLAUSE-TO-SOURCE-OUTCOME-LAYER',
    fromStage: 'SOURCE_ESTABLISHMENT_CLAUSE',
    toStage: 'SOURCE_OUTCOME_LAYER',
    transitionScope: 'SOURCE_SEMANTIC',
    status: 'SOURCE_RELATION_OBSERVED',
    upstreamEvidence: [
      'establishment-source-clause-admission-review',
      'establishment-outcome-representation-review',
    ],
    observedBasis:
      'Source base outcomes, mixed outcomes, interventions, and causal-transition vocabulary are represented as separate source-semantic layers.',
    missingBridge:
      'Only direct source relations are preserved; canonical application and terminal-state precedence remain unresolved.',
    directPromotionBlocked: false,
    authorityConsequence:
      'Layered source semantics may be represented without canonical terminal-state authority.',
  }),
  transition({
    transitionId: 'R131-T19-SOURCE-OUTCOME-TO-TERMINAL-STATE',
    fromStage: 'SOURCE_OUTCOME_LAYER',
    toStage: 'CANONICAL_TERMINAL_STATE',
    transitionScope: 'CANONICAL_BRIDGE',
    status: 'BLOCKED_TERMINAL_REPRESENTATION',
    upstreamEvidence: ['establishment-outcome-representation-review'],
    observedBasis:
      'Source-semantic outcome layers are representable.',
    missingBridge:
      'Canonical outcome representation, terminal-state precedence, intervention-effect resolution, and cross-section equivalence are unauthorized.',
    directPromotionBlocked: true,
    authorityConsequence:
      'Source outcome vocabulary cannot be collapsed into a canonical terminal state.',
  }),
  transition({
    transitionId: 'R131-T20-MIXED-OUTCOME-TO-TERMINAL-STATE',
    fromStage: 'SOURCE_OUTCOME_LAYER',
    toStage: 'CANONICAL_TERMINAL_STATE',
    transitionScope: 'CANONICAL_BRIDGE',
    status: 'BLOCKED_TERMINAL_REPRESENTATION',
    upstreamEvidence: [
      'establishment-outcome-representation-review',
      'mixed-outcome-application-review',
    ],
    observedBasis:
      '成中有敗 and 敗中有成 are direct source mixed-outcome vocabulary.',
    missingBridge:
      'Generalized mixed-outcome application, matcher, canonical segmentation, and state emission are unauthorized.',
    directPromotionBlocked: true,
    authorityConsequence:
      'Mixed outcome wording is not a terminal-state matcher.',
  }),
  transition({
    transitionId: 'R131-T21-INTERVENTION-TO-TERMINAL-STATE',
    fromStage: 'SOURCE_OUTCOME_LAYER',
    toStage: 'CANONICAL_TERMINAL_STATE',
    transitionScope: 'CANONICAL_BRIDGE',
    status: 'BLOCKED_TERMINAL_REPRESENTATION',
    upstreamEvidence: ['establishment-outcome-representation-review'],
    observedBasis:
      '帶忌 and 救應 are directly related to mixed-outcome expressions in the source layer.',
    missingBridge:
      'Intervention-effect resolution, rescue precedence, and terminal precedence are not authorized.',
    directPromotionBlocked: true,
    authorityConsequence:
      '救應 does not establish a winner, weight, or final state.',
  }),
  transition({
    transitionId: 'R131-T22-CAUSAL-TRANSITION-TO-TERMINAL-STATE',
    fromStage: 'SOURCE_OUTCOME_LAYER',
    toStage: 'CANONICAL_TERMINAL_STATE',
    transitionScope: 'CANONICAL_BRIDGE',
    status: 'BLOCKED_TERMINAL_REPRESENTATION',
    upstreamEvidence: ['establishment-outcome-representation-review'],
    observedBasis:
      '因成得敗 and 因敗得成 are observed as a separate causal-transition vocabulary layer.',
    missingBridge:
      'Mixed-outcome-to-transition equivalence and transition trigger predicates are not authorized.',
    directPromotionBlocked: true,
    authorityConsequence:
      'Causal-transition wording cannot be normalized into the mixed-outcome or terminal-state layer.',
  }),
  transition({
    transitionId: 'R131-T23-SOURCE-OUTCOME-TO-BINARY-COLLAPSE',
    fromStage: 'SOURCE_OUTCOME_LAYER',
    toStage: 'CANONICAL_TERMINAL_STATE',
    transitionScope: 'CANONICAL_BRIDGE',
    status: 'BLOCKED_TERMINAL_REPRESENTATION',
    upstreamEvidence: ['establishment-outcome-representation-review'],
    observedBasis:
      'The source distinguishes base, mixed, intervention, and causal-transition layers.',
    missingBridge:
      'binaryEstablishmentStateSufficient=false and binaryCollapseAuthorized=false.',
    directPromotionBlocked: true,
    authorityConsequence:
      'The source-semantic outcome space cannot be reduced to established/not-established.',
  }),
  transition({
    transitionId: 'R131-T24-CANDIDATE-TO-FACT-EMISSION',
    fromStage: 'CANONICAL_CANDIDATE_IDENTITY',
    toStage: 'EMITTED_PATTERN_FACT',
    transitionScope: 'OUTPUT_BOUNDARY',
    status: 'BLOCKED_FACT_EMISSION',
    upstreamEvidence: ['candidate-identity-admission-review'],
    observedBasis:
      'candidateFactsEmitted is explicitly false upstream.',
    missingBridge:
      'Canonical candidate identity and derivation authority are absent.',
    directPromotionBlocked: true,
    authorityConsequence:
      'No candidate fact may be emitted.',
  }),
  transition({
    transitionId: 'R131-T25-ESTABLISHMENT-PREDICATE-TO-FACT-EMISSION',
    fromStage: 'CANONICAL_ESTABLISHMENT_PREDICATE',
    toStage: 'EMITTED_PATTERN_FACT',
    transitionScope: 'OUTPUT_BOUNDARY',
    status: 'BLOCKED_FACT_EMISSION',
    upstreamEvidence: ['establishment-source-clause-admission-review'],
    observedBasis:
      'establishmentFactsEmitted is explicitly false upstream.',
    missingBridge:
      'No canonical executable establishment predicate exists.',
    directPromotionBlocked: true,
    authorityConsequence:
      'No establishment fact may be emitted.',
  }),
  transition({
    transitionId: 'R131-T26-TERMINAL-STATE-TO-FACT-EMISSION',
    fromStage: 'CANONICAL_TERMINAL_STATE',
    toStage: 'EMITTED_PATTERN_FACT',
    transitionScope: 'OUTPUT_BOUNDARY',
    status: 'BLOCKED_FACT_EMISSION',
    upstreamEvidence: ['establishment-outcome-representation-review'],
    observedBasis:
      'canonicalTerminalStateAuthorized is false upstream.',
    missingBridge:
      'No canonical terminal state exists to emit.',
    directPromotionBlocked: true,
    authorityConsequence:
      'No terminal establishment result may reach downstream interpretation.',
  }),
  transition({
    transitionId: 'R131-T27-PATTERN-WORDING-TO-FACT-EMISSION',
    fromStage: 'SOURCE_PATTERN_WORDING',
    toStage: 'EMITTED_PATTERN_FACT',
    transitionScope: 'OUTPUT_BOUNDARY',
    status: 'BLOCKED_FACT_EMISSION',
    upstreamEvidence: ['candidate-identity-admission-review'],
    observedBasis:
      'Direct source pattern wording exists.',
    missingBridge:
      'Source wording has not crossed canonical candidate or establishment authority.',
    directPromotionBlocked: true,
    authorityConsequence:
      'A source quote or source-named pattern is not a Production fact.',
  }),
  transition({
    transitionId: 'R131-T28-SOURCE-OUTCOME-TO-FACT-EMISSION',
    fromStage: 'SOURCE_OUTCOME_LAYER',
    toStage: 'EMITTED_PATTERN_FACT',
    transitionScope: 'OUTPUT_BOUNDARY',
    status: 'BLOCKED_FACT_EMISSION',
    upstreamEvidence: ['establishment-outcome-representation-review'],
    observedBasis:
      'Layered source outcomes are research-representable.',
    missingBridge:
      'Canonical application, terminal state, and establishment authority are absent.',
    directPromotionBlocked: true,
    authorityConsequence:
      'Source outcome vocabulary cannot be emitted as an established-pattern fact.',
  }),
  transition({
    transitionId: 'R131-T29-MONTH-HIDDEN-STEM-MEMBERSHIP-TO-CANDIDATE',
    fromStage: 'CANONICAL_SUBSTRATE',
    toStage: 'CANONICAL_CANDIDATE_IDENTITY',
    transitionScope: 'CANONICAL_BRIDGE',
    status: 'BLOCKED_CANONICAL_CANDIDATE_BRIDGE',
    upstreamEvidence: ['month-order-hidden-stem-selection-review'],
    observedBasis:
      'Month hidden-stem membership and exact 寅 本主 / transparency-substitution examples are governed.',
    missingBridge:
      'Storage order is not ranking; no all-branch 本/中/餘 mapping, month-command duration, or generalized hidden-stem selector is authorized.',
    directPromotionBlocked: true,
    authorityConsequence:
      'Hidden-stem membership cannot silently choose the canonical candidate.',
  }),
  transition({
    transitionId: 'R131-T30-BRANCH-MEETING-TO-CANDIDATE',
    fromStage: 'SOURCE_SELECTION_SIGNAL',
    toStage: 'CANONICAL_CANDIDATE_IDENTITY',
    transitionScope: 'CANONICAL_BRIDGE',
    status: 'BLOCKED_CANONICAL_CANDIDATE_BRIDGE',
    upstreamEvidence: ['branch-meeting-selection-effect-review'],
    observedBasis:
      'Exact source-aligned meeting result wording and structural matches are governed.',
    missingBridge:
      'Canonical transformation, clash/damage settlement, competing-interaction settlement, and generalized meeting survival are unresolved.',
    directPromotionBlocked: true,
    authorityConsequence:
      'A branch-meeting research signal is not a canonical pattern candidate.',
  }),
  transition({
    transitionId: 'R131-T31-SIGNAL-TO-PATTERN-WORDING',
    fromStage: 'SOURCE_SELECTION_SIGNAL',
    toStage: 'SOURCE_PATTERN_WORDING',
    transitionScope: 'EXACT_EXEMPLAR',
    status: 'EXACT_EXEMPLAR_OBSERVATION_AUTHORIZED',
    upstreamEvidence: [
      'branch-meeting-selection-effect-review',
      'candidate-identity-admission-review',
    ],
    observedBasis:
      'Exact governed mixed-qi exemplars preserve direct meeting-result wording such as 印, 金局, and 傷官之局 alongside their source-aligned signals.',
    missingBridge:
      'This is exact-exemplar source wording only; no generalized signal-to-pattern naming predicate is authorized.',
    directPromotionBlocked: false,
    authorityConsequence:
      'Exact source wording may be observed without defining canonical candidate identity.',
  }),
]);

export const R131_REJECTED_COLLAPSES = Object.freeze([
  'SELECTION_SIGNAL_EQUALS_CANONICAL_CANDIDATE',
  'SOURCE_SEMANTIC_USE_EQUALS_CANONICAL_CANDIDATE_IDENTITY',
  'SOURCE_PATTERN_WORDING_EQUALS_PRE_ESTABLISHMENT_CANDIDATE_CONTRACT',
  'SOURCE_ESTABLISHMENT_CLAUSE_EQUALS_EXECUTABLE_ESTABLISHMENT_PREDICATE',
  'SOURCE_OUTCOME_LAYER_EQUALS_CANONICAL_TERMINAL_STATE',
  'MULTIPLE_SIGNALS_EQUAL_RANKED_CANDIDATES',
  'MULTIPLE_SOURCE_USES_EQUAL_CANDIDATE_MULTIPLICITY',
  'CO_USE_EQUALS_PRECEDENCE',
  'RESCUE_WORDING_EQUALS_RESCUE_WEIGHT_OR_WINNER',
  'SOURCE_PATTERN_WORDING_EQUALS_PRODUCTION_FACT',
  'SOURCE_OUTCOME_WORDING_EQUALS_ESTABLISHMENT_FACT',
  'BINARY_COLLAPSE_EQUALS_SOURCE_OUTCOME_MODEL',
] as const);

export const R131_SUMMARY = Object.freeze({
  stageCount: R131_STAGES.length,
  sourceObservedStageCount: R131_STAGES.filter((stage) => stage.sourceObserved).length,
  canonicalUnauthorizedStageCount: R131_STAGES.filter(
    (stage) =>
      stage.stageClass !== 'CANONICAL_INPUT' && stage.canonicalAuthorityAuthorized === false,
  ).length,
  transitionCount: R131_TRANSITION_AUDITS.length,
  boundedObservationTransitionCount: R131_TRANSITION_AUDITS.filter(
    (row) =>
      row.status === 'BOUNDED_OBSERVATION_AUTHORIZED' ||
      row.status === 'EXACT_EXEMPLAR_OBSERVATION_AUTHORIZED' ||
      row.status === 'SOURCE_RELATION_OBSERVED',
  ).length,
  blockedDirectPromotionCount: R131_TRANSITION_AUDITS.filter(
    (row) => row.directPromotionBlocked,
  ).length,
  candidateBridgeBlockedCount: R131_TRANSITION_AUDITS.filter(
    (row) => row.status === 'BLOCKED_CANONICAL_CANDIDATE_BRIDGE',
  ).length,
  establishmentBridgeBlockedCount: R131_TRANSITION_AUDITS.filter(
    (row) => row.status === 'BLOCKED_CANONICAL_ESTABLISHMENT_BRIDGE',
  ).length,
  terminalRepresentationBlockedCount: R131_TRANSITION_AUDITS.filter(
    (row) => row.status === 'BLOCKED_TERMINAL_REPRESENTATION',
  ).length,
  factEmissionBlockedCount: R131_TRANSITION_AUDITS.filter(
    (row) => row.status === 'BLOCKED_FACT_EMISSION',
  ).length,
  rejectedCollapseCount: R131_REJECTED_COLLAPSES.length,
} as const);

export const R131_AUTHORITY = Object.freeze({
  status: 'RESEARCH_PATTERN_CANDIDATE_ESTABLISHMENT_FORMAL_BOUNDARY_AUDIT_COMPLETE' as const,
  researchOnly: true,
  stageInventoryComplete: true,
  transitionAuditComplete: true,
  candidateEstablishmentDistinctStagesPreserved: true,
  sourcePatternWordingDistinctFromCanonicalCandidatePreserved: true,
  sourceEstablishmentClauseDistinctFromExecutablePredicatePreserved: true,
  sourceOutcomeLayerDistinctFromCanonicalTerminalStatePreserved: true,
  sourceSignalObservationAuthorizedBoundedly: true,
  exactSemanticUseObservationAuthorizedBoundedly: true,
  sourceEstablishmentClauseInventoryAuthorized: true,
  sourceOutcomeLayerRepresentationAuthorized: true,
  candidateIdentityAuthorized: false,
  candidateDerivationAuthorized: false,
  multipleCandidateRepresentationAuthorized: false,
  candidateRankingAuthorized: false,
  candidatePrecedenceAuthorized: false,
  establishmentPredicateAuthorized: false,
  canonicalTerminalStateAuthorized: false,
  rescuePrecedenceAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  automaticAuthorityAdmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
