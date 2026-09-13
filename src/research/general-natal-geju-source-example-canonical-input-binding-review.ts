import { HIDDEN_STEM_MEMBERSHIP_VERSION } from '../calculation/hidden-stems.js';
import { STRUCTURAL_RELATION_DERIVATION_VERSION } from '../calculation/structural-relations.js';
import { GENERAL_NATAL_GEJU_ESTABLISHMENT_UNRESOLVED_PRIMITIVES } from './general-natal-geju-establishment-source-clause-admission-review.js';
import { GENERAL_NATAL_GEJU_MIXED_OUTCOME_APPLICATION_REVIEW } from './general-natal-geju-mixed-outcome-application-review.js';
import { GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_VERSION } from './general-natal-geju-month-order-transparency-observation.js';

export const GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW = Object.freeze({
  version: '0.1.0-research',
  upstreamMixedOutcomeApplicationVersion:
    GENERAL_NATAL_GEJU_MIXED_OUTCOME_APPLICATION_REVIEW.version,
  hiddenStemMembershipVersion: HIDDEN_STEM_MEMBERSHIP_VERSION,
  structuralRelationDerivationVersion: STRUCTURAL_RELATION_DERIVATION_VERSION,
  transparencyObservationVersion:
    GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_VERSION,
  governedRawFactPaths: Object.freeze([
    'pillars.*.stem',
    'pillars.*.branch',
    'derivedFacts.dayMaster',
    'derivedFacts.tenGods',
    'derivedFacts.hiddenStems.*',
    'derivedFacts.structuralRelations',
    'monthHiddenStem.visibleExactStemPositions',
  ] as const),
  researchOnlyRawFactBindingAuthorized: true,
  sourceExampleBindingComplete: false,
  unresolvedSemanticPrimitives: GENERAL_NATAL_GEJU_ESTABLISHMENT_UNRESOLVED_PRIMITIVES,
  generalizedSourceExampleMatcherAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
});
