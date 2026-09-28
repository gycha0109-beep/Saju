import {
  R051_AUTHORITY,
  R051_FIVE_COMBINATION_FAMILIES,
  R051_HEAVENLY_STEM_FIVE_COMBINATION_VERSION,
} from './general-natal-heavenly-stem-five-combination.js';
import {
  R055_AUTHORITY,
  R055_SIX_CLASH_CONTEXT_VERSION,
  R055_SIX_CLASH_PAIRS,
} from './general-natal-six-clash-context.js';
import {
  R056_AUTHORITY,
  R056_DIRECTED_XING_RELATIONS,
  R056_XING_TAXONOMY_VERSION,
} from './general-natal-xing-taxonomy-self-punishment.js';
import {
  R057_AUTHORITY,
  R057_DIRECT_MODIFIERS,
  R057_LIUHAI_EVIDENCE_WEIGHT_VERSION,
  R057_LIUHAI_PAIRS,
} from './general-natal-liuhai-evidence-weight.js';
import {
  R059_AUTHORITY,
  R059_DIRECT_CASES,
  R059_INTERACTION_CONFLICT_CORPUS_VERSION,
} from './general-natal-interaction-conflict-corpus.js';
import {
  R141_AUTHORITY,
  R141_MULTI_RELATION_ORDER_SENSITIVITY_VERSION,
  R141_SUMMARY,
} from './general-natal-multi-relation-stem-branch-order-sensitivity-corpus.js';

export const R147_INTERACTION_DIRECTIONALITY_COUNTEREXAMPLE_VERSION =
  '0.1.0-research' as const;

export type R147RegistryClass =
  | 'DIRECTED_RELATION_IDENTITY'
  | 'SOURCE_BOUNDED_ACTOR_TARGET'
  | 'DIRECTIONAL_EFFECT_ASYMMETRY_OBSERVATION'
  | 'SYMMETRIC_PAIR_IDENTITY_CONTROL';

export type R147RelationFamily =
  | 'PUNISHMENT'
  | 'INTERACTION_CONFLICT'
  | 'HARM'
  | 'STEM_COMBINATION'
  | 'CLASH';

export interface R147DirectionalityRow {
  registryId: string;
  registryClass: R147RegistryClass;
  relationFamily: R147RelationFamily;
  sourceAsset: string;
  identityLabel: string;
  pairIdentitySymmetric: boolean;
  sourceDirectionObserved: boolean;
  actorTargetDirectionPreserved: boolean;
  reverseRelationExplicit: boolean;
  reverseInferenceAuthorized: false;
  pairStorageOrderSemantic: false;
  symmetricIdentityImpliesSymmetricEffectAuthorized: false;
  directionalIdentityImpliesHarmAuthorized: false;
  directionalIdentityImpliesSeverityAuthorized: false;
  generalizedDirectionalEffectAuthorized: false;
  globalPrecedenceAuthorized: false;
  numericWeightAuthorized: false;
  executable: false;
  productionAuthorityPromoted: false;
  notes: readonly string[];
}

const closedRow = (
  value: Omit<
    R147DirectionalityRow,
    | 'reverseInferenceAuthorized'
    | 'pairStorageOrderSemantic'
    | 'symmetricIdentityImpliesSymmetricEffectAuthorized'
    | 'directionalIdentityImpliesHarmAuthorized'
    | 'directionalIdentityImpliesSeverityAuthorized'
    | 'generalizedDirectionalEffectAuthorized'
    | 'globalPrecedenceAuthorized'
    | 'numericWeightAuthorized'
    | 'executable'
    | 'productionAuthorityPromoted'
  >,
): R147DirectionalityRow =>
  Object.freeze({
    ...value,
    reverseInferenceAuthorized: false,
    pairStorageOrderSemantic: false,
    symmetricIdentityImpliesSymmetricEffectAuthorized: false,
    directionalIdentityImpliesHarmAuthorized: false,
    directionalIdentityImpliesSeverityAuthorized: false,
    generalizedDirectionalEffectAuthorized: false,
    globalPrecedenceAuthorized: false,
    numericWeightAuthorized: false,
    executable: false,
    productionAuthorityPromoted: false,
  });

const hasExplicitReverse = (from: string, to: string): boolean =>
  R056_DIRECTED_XING_RELATIONS.some(
    (item) => item.from === to && item.to === from,
  );

export const R147_DIRECTED_PUNISHMENT_ROWS: readonly R147DirectionalityRow[] =
  Object.freeze(
    R056_DIRECTED_XING_RELATIONS.map((item, index) =>
      closedRow({
        registryId: 'R147-XING-' + String(index + 1).padStart(2, '0'),
        registryClass: 'DIRECTED_RELATION_IDENTITY',
        relationFamily: 'PUNISHMENT',
        sourceAsset: 'R056',
        identityLabel: item.from + '→' + item.to + ':' + item.family,
        pairIdentitySymmetric: false,
        sourceDirectionObserved: true,
        actorTargetDirectionPreserved: true,
        reverseRelationExplicit: hasExplicitReverse(item.from, item.to),
        notes: [
          'R056 stores this punishment relation as a directed structural edge.',
          hasExplicitReverse(item.from, item.to)
            ? 'The reverse direction exists as a separately explicit governed relation and is not inferred from this row.'
            : 'No reverse directed edge is present in the governed R056 taxonomy; reverse inference remains unauthorized.',
        ],
      }),
    ),
  );

export const R147_R059_ACTOR_TARGET_ROWS: readonly R147DirectionalityRow[] =
  Object.freeze(
    R059_DIRECT_CASES.map((item, index) =>
      closedRow({
        registryId: 'R147-R059-' + String(index + 1).padStart(2, '0'),
        registryClass: 'SOURCE_BOUNDED_ACTOR_TARGET',
        relationFamily: 'INTERACTION_CONFLICT',
        sourceAsset: 'R059',
        identityLabel:
          item.actor +
          '→' +
          item.target +
          ':' +
          item.boundedResult +
          ':' +
          item.id,
        pairIdentitySymmetric: false,
        sourceDirectionObserved: true,
        actorTargetDirectionPreserved: true,
        reverseRelationExplicit: false,
        notes: [
          'The source-bounded assertion preserves actor→target direction exactly as recorded.',
          'Reversing actor and target would create a new assertion not authorized by R059.',
          'The directed source case is not global relation precedence.',
        ],
      }),
    ),
  );

const directionalHarmModifier = R057_DIRECT_MODIFIERS.find(
  (item) => item.modifier === 'DIRECTIONAL_ASYMMETRY_OBSERVED',
);

if (directionalHarmModifier === undefined) {
  throw new Error('R147 requires the R057 directional asymmetry observation');
}

export const R147_HARM_DIRECTIONAL_ASYMMETRY_ROW: R147DirectionalityRow =
  closedRow({
    registryId: 'R147-HARM-DIR-01',
    registryClass: 'DIRECTIONAL_EFFECT_ASYMMETRY_OBSERVATION',
    relationFamily: 'HARM',
    sourceAsset: 'R057',
    identityLabel:
      directionalHarmModifier.pair[0] +
      '↔' +
      directionalHarmModifier.pair[1] +
      ':DIRECTIONAL_ASYMMETRY_OBSERVED',
    pairIdentitySymmetric: true,
    sourceDirectionObserved: true,
    actorTargetDirectionPreserved: false,
    reverseRelationExplicit: false,
    notes: [
      'The structural harm pair remains an unordered pair identity.',
      'A source-bounded directional-asymmetry observation exists for this pair.',
      'That observation does not establish a universal directional effect resolver.',
    ],
  });

const symmetricPairControl = (
  registryId: string,
  relationFamily: Extract<
    R147RelationFamily,
    'STEM_COMBINATION' | 'CLASH' | 'HARM'
  >,
  sourceAsset: string,
  identityLabel: string,
  notes: readonly string[],
): R147DirectionalityRow =>
  closedRow({
    registryId,
    registryClass: 'SYMMETRIC_PAIR_IDENTITY_CONTROL',
    relationFamily,
    sourceAsset,
    identityLabel,
    pairIdentitySymmetric: true,
    sourceDirectionObserved: false,
    actorTargetDirectionPreserved: false,
    reverseRelationExplicit: false,
    notes,
  });

const STEM_COMBINATION_CONTROLS: readonly R147DirectionalityRow[] = Object.freeze(
  R051_FIVE_COMBINATION_FAMILIES.map((item, index) =>
    symmetricPairControl(
      'R147-COMB-' + String(index + 1).padStart(2, '0'),
      'STEM_COMBINATION',
      'R051',
      item.left + '↔' + item.right + ':' + item.pairId,
      [
        'R051 verifies pair identity only.',
        'Stored left/right labels are not semantic interaction direction or precedence.',
      ],
    ),
  ),
);

const CLASH_CONTROLS: readonly R147DirectionalityRow[] = Object.freeze(
  R055_SIX_CLASH_PAIRS.map((pair, index) =>
    symmetricPairControl(
      'R147-CLASH-' + String(index + 1).padStart(2, '0'),
      'CLASH',
      'R055',
      pair[0] + '↔' + pair[1],
      [
        'R055 verifies structural clash pair identity without a directional effect resolver.',
        'Pair order cannot be converted into attacker/target semantics.',
      ],
    ),
  ),
);

const HARM_CONTROLS: readonly R147DirectionalityRow[] = Object.freeze(
  R057_LIUHAI_PAIRS.map((pair, index) =>
    symmetricPairControl(
      'R147-HARM-' + String(index + 1).padStart(2, '0'),
      'HARM',
      'R057',
      pair[0] + '↔' + pair[1],
      [
        'R057 verifies structural harm pair identity and context variance.',
        pair[0] === '酉' && pair[1] === '戌'
          ? 'This pair also has a separate directional-asymmetry observation; structural symmetry therefore must not be conflated with effect symmetry.'
          : 'No universal directional effect is admitted from the pair identity.',
      ],
    ),
  ),
);

export const R147_SYMMETRIC_PAIR_CONTROL_ROWS: readonly R147DirectionalityRow[] =
  Object.freeze([
    ...STEM_COMBINATION_CONTROLS,
    ...CLASH_CONTROLS,
    ...HARM_CONTROLS,
  ]);

export const R147_DIRECTIONALITY_REGISTRY: readonly R147DirectionalityRow[] =
  Object.freeze([
    ...R147_DIRECTED_PUNISHMENT_ROWS,
    ...R147_R059_ACTOR_TARGET_ROWS,
    R147_HARM_DIRECTIONAL_ASYMMETRY_ROW,
    ...R147_SYMMETRIC_PAIR_CONTROL_ROWS,
  ]);

export const R147_REJECTED_DIRECTIONALITY_COLLAPSES = Object.freeze([
  'DIRECTED_PUNISHMENT_AS_UNORDERED_PAIR',
  'MISSING_REVERSE_EDGE_AS_IMPLICIT_REVERSE',
  'EXPLICIT_REVERSE_EDGE_AS_DERIVED_REVERSE',
  'R059_ACTOR_TARGET_REVERSAL',
  'R059_ACTOR_DIRECTION_AS_GLOBAL_PRECEDENCE',
  'PAIR_STORAGE_LEFT_RIGHT_AS_INTERACTION_DIRECTION',
  'SYMMETRIC_PAIR_IDENTITY_IMPLIES_SYMMETRIC_EFFECT',
  'DIRECTIONAL_ASYMMETRY_OBSERVATION_AS_UNIVERSAL_DIRECTIONAL_EFFECT',
  'DIRECTIONAL_RELATION_IMPLIES_HARM',
  'DIRECTIONAL_RELATION_IMPLIES_SEVERITY',
  'ARRAY_ORDER_CREATES_ACTOR_TARGET_DIRECTION',
  'FIRST_ENUMERATED_RELATION_CREATES_PRECEDENCE',
  'DIRECTION_AS_NUMERIC_WEIGHT',
  'DIRECTION_AS_EXECUTABLE_SETTLEMENT',
] as const);

const countTrue = (
  key:
    | 'reverseInferenceAuthorized'
    | 'pairStorageOrderSemantic'
    | 'symmetricIdentityImpliesSymmetricEffectAuthorized'
    | 'directionalIdentityImpliesHarmAuthorized'
    | 'directionalIdentityImpliesSeverityAuthorized'
    | 'generalizedDirectionalEffectAuthorized'
    | 'globalPrecedenceAuthorized'
    | 'numericWeightAuthorized'
    | 'executable'
    | 'productionAuthorityPromoted',
): number => R147_DIRECTIONALITY_REGISTRY.filter((item) => item[key]).length;

export const R147_SUMMARY = Object.freeze({
  registryRowCount: R147_DIRECTIONALITY_REGISTRY.length,
  directedPunishmentRowCount: R147_DIRECTED_PUNISHMENT_ROWS.length,
  directedPunishmentReverseExplicitCount:
    R147_DIRECTED_PUNISHMENT_ROWS.filter((item) => item.reverseRelationExplicit)
      .length,
  directedPunishmentReverseAbsentCount:
    R147_DIRECTED_PUNISHMENT_ROWS.filter((item) => !item.reverseRelationExplicit)
      .length,
  sourceBoundedActorTargetRowCount: R147_R059_ACTOR_TARGET_ROWS.length,
  directionalAsymmetryObservationRowCount: 1,
  symmetricPairControlCount: R147_SYMMETRIC_PAIR_CONTROL_ROWS.length,
  stemCombinationControlCount: STEM_COMBINATION_CONTROLS.length,
  clashControlCount: CLASH_CONTROLS.length,
  harmControlCount: HARM_CONTROLS.length,
  reverseInferenceAuthorizedCount: countTrue('reverseInferenceAuthorized'),
  pairStorageOrderSemanticCount: countTrue('pairStorageOrderSemantic'),
  symmetricIdentityImpliesSymmetricEffectAuthorizedCount: countTrue(
    'symmetricIdentityImpliesSymmetricEffectAuthorized',
  ),
  directionalIdentityImpliesHarmAuthorizedCount: countTrue(
    'directionalIdentityImpliesHarmAuthorized',
  ),
  directionalIdentityImpliesSeverityAuthorizedCount: countTrue(
    'directionalIdentityImpliesSeverityAuthorized',
  ),
  generalizedDirectionalEffectAuthorizedCount: countTrue(
    'generalizedDirectionalEffectAuthorized',
  ),
  globalPrecedenceAuthorizedCount: countTrue('globalPrecedenceAuthorized'),
  numericWeightAuthorizedCount: countTrue('numericWeightAuthorized'),
  executableCount: countTrue('executable'),
  productionAuthorityPromotedCount: countTrue('productionAuthorityPromoted'),
});

export const R147_UPSTREAM_BINDINGS = Object.freeze({
  r051: {
    version: R051_HEAVENLY_STEM_FIVE_COMBINATION_VERSION,
    pairFamilyCount: R051_AUTHORITY.pairFamilyCount,
    effectiveCombinationResolverAuthorized:
      R051_AUTHORITY.effectiveCombinationResolverAuthorized,
    productionAuthorityPromoted: R051_AUTHORITY.productionAuthorityPromoted,
  },
  r055: {
    version: R055_SIX_CLASH_CONTEXT_VERSION,
    structuralPairCount: R055_AUTHORITY.structuralPairCount,
    pairPresenceImpliesEffectiveClash:
      R055_AUTHORITY.pairPresenceImpliesEffectiveClash,
    numericClashStrengthAuthorized:
      R055_AUTHORITY.numericClashStrengthAuthorized,
    executableEffectResolverAuthorized:
      R055_AUTHORITY.executableEffectResolverAuthorized,
  },
  r056: {
    version: R056_XING_TAXONOMY_VERSION,
    directedNonSelfRelationCount: R056_AUTHORITY.directedNonSelfRelationCount,
    structuralPresenceImpliesHarm:
      R056_AUTHORITY.structuralPresenceImpliesHarm,
    numericSeverityAuthorized: R056_AUTHORITY.numericSeverityAuthorized,
    executableEffectResolverAuthorized:
      R056_AUTHORITY.executableEffectResolverAuthorized,
  },
  r057: {
    version: R057_LIUHAI_EVIDENCE_WEIGHT_VERSION,
    structuralPairCount: R057_AUTHORITY.structuralPairCount,
    universalDirectionalEffectAuthorized:
      R057_AUTHORITY.universalDirectionalEffectAuthorized,
    pairPresenceImpliesHarmfulPolarity:
      R057_AUTHORITY.pairPresenceImpliesHarmfulPolarity,
    numericWeightAuthorized: R057_AUTHORITY.numericWeightAuthorized,
  },
  r059: {
    version: R059_INTERACTION_CONFLICT_CORPUS_VERSION,
    directCaseCount: R059_AUTHORITY.directCaseCount,
    universalPrecedenceAuthorized:
      R059_AUTHORITY.universalPrecedenceAuthorized,
    totalOrderAuthorized: R059_AUTHORITY.totalOrderAuthorized,
    executableConflictResolverAuthorized:
      R059_AUTHORITY.executableConflictResolverAuthorized,
  },
  r141: {
    version: R141_MULTI_RELATION_ORDER_SENSITIVITY_VERSION,
    orderVariantCount: R141_SUMMARY.orderVariantCount,
    inputEnumerationOrderInvariantRepresentationObserved:
      R141_AUTHORITY.inputEnumerationOrderInvariantRepresentationObserved,
    sourceBoundedDirectionDistinctFromGlobalPrecedenceObserved:
      R141_AUTHORITY.sourceBoundedDirectionDistinctFromGlobalPrecedenceObserved,
    globalRelationPrecedenceAuthorized:
      R141_AUTHORITY.globalRelationPrecedenceAuthorized,
    firstMatchWinsAuthorized: R141_AUTHORITY.firstMatchWinsAuthorized,
    sequentialMutationResolverAuthorized:
      R141_AUTHORITY.sequentialMutationResolverAuthorized,
    numericRelationWeightAuthorized:
      R141_AUTHORITY.numericRelationWeightAuthorized,
  },
});

export const R147_AUTHORITY = Object.freeze({
  status: 'RESEARCH_INTERACTION_DIRECTIONALITY_COUNTEREXAMPLE_REGISTRY_COMPLETE' as const,
  researchOnly: true,
  allR056DirectedRelationsRegistered: true,
  allR059DirectActorTargetCasesRegistered: true,
  r057DirectionalAsymmetryObservationRegistered: true,
  symmetricPairControlsRegistered: true,
  directedIdentityDistinctFromUndirectedPairObserved: true,
  explicitReverseDistinctFromInferredReverseObserved: true,
  sourceBoundedDirectionDistinctFromGlobalPrecedenceObserved: true,
  structuralPairSymmetryDistinctFromEffectSymmetryObserved: true,
  pairStorageOrderDistinctFromDirectionObserved: true,
  inputEnumerationOrderDistinctFromDirectionObserved: true,
  reverseInferenceAuthorized: false,
  pairStorageOrderSemantic: false,
  symmetricIdentityImpliesSymmetricEffectAuthorized: false,
  universalDirectionalEffectAuthorized: false,
  directionalIdentityImpliesHarmAuthorized: false,
  directionalIdentityImpliesSeverityAuthorized: false,
  globalPrecedenceAuthorized: false,
  numericDirectionWeightAuthorized: false,
  executableDirectionResolverAuthorized: false,
  chartRoleFactEmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
