import type {
  CanonicalSajuSnapshot, EarthlyBranch, HeavenlyStem, PillarSlot,
  StructuralRelationCandidate, TenGod,
} from '../contracts/calculation.js';
import {
  R068_AUTHORITY, R068_DIRECT_CLAIMS, R068_EXECUTION_GAPS,
  R068_RELATIONSHIP_CLAIM_CORPUS_VERSION, R068_REJECTED_ROMANCE_MAPPINGS,
} from './general-natal-relationship-claim-corpus.js';
import {
  R069_AUTHORITY, R069_DIRECT_CLAIMS, R069_EXECUTION_GAPS,
  R069_SPOUSE_CLAIM_CORPUS_VERSION, R069_REJECTED_SHORTCUTS,
} from './general-natal-spouse-claim-corpus.js';
import {
  R070_AUTHORITY, R070_CLAIM_LAYERS, R070_EXECUTION_GAPS,
  R070_FAMILY_DOMAIN_CLAIM_CORPUS_VERSION, R070_REJECTED_SHORTCUTS,
} from './general-natal-family-domain-claim-corpus.js';

export const FAMILY_PAIR_SOURCE_SCOPE_HANDOFF_VERSION =
  'saju-research-r068-r069-r070-source-scope-handoff-v1' as const;

export type ResearchScopeDisposition =
  | 'APPLICABLE_BOUNDED' | 'NARROW_OR_REPLACE' | 'INCONCLUSIVE' | 'REJECTED';
export type FamilyResearchScope = 'parents' | 'children';

export interface FamilyTenGodSourceObservation {
  /** This is a literal-family observation, not a father/mother/child rule. */
  sourceFactPath: 'derivedFacts.tenGods';
  sourceSurface: string;
  observedGroup: '편재' | '인성 계열' | '관성 계열' | '식상 계열';
  coverage: 'visible_stems_and_representative_branch_only';
  status: 'observed' | 'not_observed_in_resolved_positions' | 'incomplete_input';
  observedPositions: readonly {
    path: string;
    slot: PillarSlot;
    channel: 'stem' | 'branch';
    value: TenGod;
  }[];
  unresolvedFactPaths: readonly string[];
  /** Exact observed T5 values never make a historical relative-role prediction. */
  historicalRelativeRoleAuthorized: false;
}

/** Original family-star wording bound separately to visible T5 and raw hidden membership. */
export interface R070FamilyRelativeStarHiddenStemBoundary {
  sourceLayerId: 'TEN-GOD-FAMILY-RELATIONS' | 'FEMALE-CHILD-RELATION';
  sourceSurface: '父以偏財論' | '母以印綬論' | '子嗣者即官星也' | '我生者為子';
  requestedScope: FamilyResearchScope;
  originalSexScope: string;
  historicalSex: 'male' | 'female' | 'unspecified';
  visibleT5FactPath: 'derivedFacts.tenGods';
  hiddenStemFactPath: 'derivedFacts.hiddenStems';
  observedModernT5Group: FamilyTenGodSourceObservation['observedGroup'];
  visibleT5ObservationStatus: FamilyTenGodSourceObservation['status'];
  hiddenStemMembershipCoverage: R070HiddenStemMembershipContrast['coverage'];
  pillarObservations: readonly (R070HiddenStemMembershipPillarObservation & {
    /** Only the already-observed representative-branch / visible-stem T5 values. */
    visibleT5Positions: FamilyTenGodSourceObservation['observedPositions'];
    unresolvedVisibleT5FactPaths: readonly string[];
  })[];
  unresolvedHiddenStemMembershipFactPaths: readonly string[];
  missingPrerequisites: readonly string[];
  /** Membership is not an already-computed hidden TenGod fact. */
  hiddenStemTenGodClassificationAuthorized: false;
  visibleAndHiddenStarMethodReconciled: false;
  historicalRelativeRoleAuthorized: false;
  independentlyAdmittedFamilyClaims: 0;
  familyT8Admitted: false;
}

export interface FamilySourceScopeCandidate {
  sourceLayerId: string;
  sourceSurface: string;
  sourceLayer: string;
  originalSexScope: string;
  disposition: Exclude<ResearchScopeDisposition, 'REJECTED'>;
  observedFactPath?: string;
  observedPillar?: string;
  tenGodObservation?: FamilyTenGodSourceObservation;
  /** Present only when the original star clause survives historical sex filtering. */
  relativeStarHiddenStemBoundary?: R070FamilyRelativeStarHiddenStemBoundary;
  missingPrerequisites: readonly string[];
  /** This is source-wording applicability only, NEVER a personal T8 claim. */
  familyMeaningAuthorized: false;
}

export interface R070ConfigurationTenGodSearchTerm {
  sourceTerm: '官' | '煞' | '財' | '印';
  /** Modern T5 search vocabulary, not an admitted source-era equivalence. */
  canonicalSearchCategories: readonly TenGod[];
  observedPositions: readonly {
    path: string;
    slot: PillarSlot;
    channel: 'stem' | 'branch';
    value: TenGod;
  }[];
  unresolvedFactPaths: readonly string[];
  configurationMeaningAuthorized: false;
}

export interface R070HiddenStemMembershipPillarObservation {
  pillarSlot: PillarSlot;
  membershipFactPath: string;
  branchFactPath: string;
  status: 'resolved' | 'ambiguous' | 'unavailable' | 'not_provided';
  observedBranch?: EarthlyBranch;
  /** Exact canonical array order only: index has no main/secondary/strength meaning. */
  rawMembershipPositions: readonly {
    storageIndex: number;
    stem: HeavenlyStem;
  }[];
  /** No hidden-stem TenGod fact exists in this Canonical surface. */
  hiddenStemT5ClassificationAuthorized: false;
}

export interface R070HiddenStemMembershipContrast {
  sourceFactPath: 'derivedFacts.hiddenStems';
  visibleT5FactPath: 'derivedFacts.tenGods';
  coverage:
    | 'RESOLVED_MEMBERSHIP_ONLY'
    | 'PARTIAL_MEMBERSHIP'
    | 'MEMBERSHIP_FACTS_NOT_PROVIDED';
  pillarObservations: readonly R070HiddenStemMembershipPillarObservation[];
  unresolvedMembershipFactPaths: readonly string[];
  /** Raw stem membership never contributes to observed modern T5 groups. */
  hiddenStemContributionToObservedT5GroupCount: 0;
  canonicalStorageOrderIsStrengthPriority: false;
  historicalConfigurationConditionEstablished: false;
  hiddenStemRelativeRoleAuthorized: false;
  missingPrerequisites: readonly string[];
}

export interface R070ConfigurationTenGodGroupContrast {
  sourceLayerId: 'CONFIGURATION-OUTCOME';
  sourceSurface: '官煞混雜' | '財印';
  /** Original words as search terms, not approved historic-to-T5 equivalences. */
  sourceTerms: readonly [
    R070ConfigurationTenGodSearchTerm['sourceTerm'],
    R070ConfigurationTenGodSearchTerm['sourceTerm'],
  ];
  /** Counts observed modern T5 lookup groups only, not classical conditions. */
  observedGroupCount: 0 | 1 | 2;
  observationState:
    | 'BOTH_GROUPS_OBSERVED_IN_AT_LEAST_ONE_SHARED_PILLAR'
    | 'BOTH_GROUPS_OBSERVED_ONLY_IN_DISTINCT_PILLARS'
    | 'ONLY_ONE_GROUP_OBSERVED_IN_VISIBLE_T5'
    | 'NEITHER_GROUP_OBSERVED_IN_VISIBLE_T5';
  inputCoverage: 'RESOLVED_VISIBLE_T5' | 'PARTIAL_VISIBLE_T5';
  /** Separate Canonical stem membership; not an inferred hidden T5 value. */
  hiddenStemMembershipContrast: R070HiddenStemMembershipContrast;
  sharedPillarSlots: readonly PillarSlot[];
  firstGroupOnlyPillarSlots: readonly PillarSlot[];
  secondGroupOnlyPillarSlots: readonly PillarSlot[];
  unresolvedFactPaths: readonly string[];
  /** Co-occurrence is not the classic 混雜/財印 configuration or its effect. */
  originalConfigurationConditionEstablished: false;
  configurationInteractionOrPriorityEstablished: false;
  familyRelativeEffectAuthorized: false;
  familyT8Admitted: false;
  missingPrerequisites: readonly string[];
}

export interface R070UnassignedConfigurationInput {
  sourceLayerId: 'CONFIGURATION-OUTCOME';
  sourceSurface: string;
  familyScopeResolved: false;
  disposition: 'INCONCLUSIVE';
  canonicalObservationCoverage:
    'branch_clash_only' | 'visible_t5_search_categories_only' | 'none';
  canonicalFactPath?: 'derivedFacts.structuralRelations' | 'derivedFacts.tenGods';
  observedBranchClashIds: readonly string[];
  tenGodSearchTerms?: readonly R070ConfigurationTenGodSearchTerm[];
  /** Pairwise T5 position contrast within one person's chart; no R070 effect. */
  tenGodGroupContrast?: R070ConfigurationTenGodGroupContrast;
  missingPrerequisites: readonly string[];
  familyOutcomeAuthorized: false;
}

/**
 * R070's configuration layer has no approved mapping to one particular
 * parent/child claim. The only existing structural fact bound here is the
 * exact branch-clash candidate, not the complete 刑/沖/破/害 classifier.
 */
function r070ConfigurationTenGodSearchTerms(
  snapshot: CanonicalSajuSnapshot,
  sourceSurface: string,
): readonly R070ConfigurationTenGodSearchTerm[] {
  const terms: readonly {
    sourceTerm: R070ConfigurationTenGodSearchTerm['sourceTerm'];
    categories: readonly TenGod[];
  }[] = sourceSurface === '官煞混雜'
    ? [
        { sourceTerm: '官', categories: ['정관'] },
        { sourceTerm: '煞', categories: ['편관'] },
      ]
    : sourceSurface === '財印'
      ? [
          { sourceTerm: '財', categories: ['편재', '정재'] },
          { sourceTerm: '印', categories: ['편인', '정인'] },
        ]
      : [];
  const t5 = snapshot.derivedFacts.tenGods;
  return terms.map(term => {
    const observedPositions: R070ConfigurationTenGodSearchTerm['observedPositions'][number][] = [];
    const unresolvedFactPaths: string[] = [];
    for (const slot of TEN_GOD_OBSERVATION_SLOTS) {
      for (const channel of ['stem', 'branch'] as const) {
        if (slot === 'day' && channel === 'stem') continue;
        const path = 'derivedFacts.tenGods.' + slot + '.' + channel;
        const fact = t5.status === 'resolved' ? t5.value[slot][channel] : undefined;
        if (fact?.status !== 'resolved') {
          unresolvedFactPaths.push(path);
        } else if (term.categories.includes(fact.value as TenGod)) {
          observedPositions.push({ path, slot, channel, value: fact.value as TenGod });
        }
      }
    }
    return {
      sourceTerm: term.sourceTerm,
      canonicalSearchCategories: term.categories,
      observedPositions,
      unresolvedFactPaths,
      configurationMeaningAuthorized: false,
    };
  });
}

/**
 * The original R070 surface mentions two configuration terms, but supplies
 * no admitted rule for their co-location, interaction or parent/child effect.
 * This compares only the T5 facts already collected for each source term.
 */
function r070HiddenStemMembershipContrast(
  snapshot: CanonicalSajuSnapshot,
): R070HiddenStemMembershipContrast {
  const hiddenStems = snapshot.derivedFacts.hiddenStems;
  const pillarObservations: R070HiddenStemMembershipPillarObservation[] =
    TEN_GOD_OBSERVATION_SLOTS.map(slot => {
      const hidden = hiddenStems?.[slot];
      const pillar = snapshot.pillars[slot];
      return {
        pillarSlot: slot,
        membershipFactPath: 'derivedFacts.hiddenStems.' + slot,
        branchFactPath: 'pillars.' + slot + '.branch',
        status: hidden?.status ?? 'not_provided',
        ...(pillar.status === 'resolved'
          ? { observedBranch: pillar.value.branch.value } : {}),
        rawMembershipPositions: hidden?.status === 'resolved'
          ? hidden.value.map((stem, storageIndex) => ({ storageIndex, stem }))
          : [],
        hiddenStemT5ClassificationAuthorized: false as const,
      };
    });
  const unresolvedMembershipFactPaths = pillarObservations
    .filter(observation => observation.status !== 'resolved')
    .map(observation => observation.membershipFactPath);
  return {
    sourceFactPath: 'derivedFacts.hiddenStems',
    visibleT5FactPath: 'derivedFacts.tenGods',
    coverage: hiddenStems === undefined
      ? 'MEMBERSHIP_FACTS_NOT_PROVIDED'
      : unresolvedMembershipFactPaths.length > 0
        ? 'PARTIAL_MEMBERSHIP' : 'RESOLVED_MEMBERSHIP_ONLY',
    pillarObservations,
    unresolvedMembershipFactPaths,
    hiddenStemContributionToObservedT5GroupCount: 0,
    canonicalStorageOrderIsStrengthPriority: false,
    historicalConfigurationConditionEstablished: false,
    hiddenStemRelativeRoleAuthorized: false,
    missingPrerequisites: [
      'R070_HIDDEN_STEM_MEMBERSHIP_IS_NOT_HIDDEN_T5_CLASSIFICATION',
      'R070_HIDDEN_STEM_STRENGTH_AND_PRIORITY_NOT_SETTLED',
      'R070_HIDDEN_STEM_CONFIGURATION_METHOD_NOT_SOURCED',
      ...(unresolvedMembershipFactPaths.length > 0
        ? ['CANONICAL_HIDDEN_STEM_MEMBERSHIP_PARTIAL_OR_UNAVAILABLE'] : []),
    ],
  };
}

function r070ConfigurationTenGodGroupContrast(
  snapshot: CanonicalSajuSnapshot,
  sourceSurface: '官煞混雜' | '財印',
  terms: readonly R070ConfigurationTenGodSearchTerm[],
): R070ConfigurationTenGodGroupContrast {
  const [first, second] = terms;
  const expected: readonly [string, string] = sourceSurface === '官煞混雜'
    ? ['官', '煞'] : ['財', '印'];
  if (first === undefined || second === undefined || terms.length !== 2 ||
      first.sourceTerm !== expected[0] || second.sourceTerm !== expected[1]) {
    throw new TypeError('R070 configuration T5 lookup terms must match the original layer.');
  }
  const firstSlots = TEN_GOD_OBSERVATION_SLOTS.filter(slot =>
    first.observedPositions.some(position => position.slot === slot));
  const secondSlots = TEN_GOD_OBSERVATION_SLOTS.filter(slot =>
    second.observedPositions.some(position => position.slot === slot));
  const sharedPillarSlots = firstSlots.filter(slot => secondSlots.includes(slot));
  const firstGroupOnlyPillarSlots = firstSlots.filter(slot => !secondSlots.includes(slot));
  const secondGroupOnlyPillarSlots = secondSlots.filter(slot => !firstSlots.includes(slot));
  const observedGroupCount = (Number(first.observedPositions.length > 0) +
    Number(second.observedPositions.length > 0)) as 0 | 1 | 2;
  const observationState = observedGroupCount === 2
    ? sharedPillarSlots.length > 0
      ? 'BOTH_GROUPS_OBSERVED_IN_AT_LEAST_ONE_SHARED_PILLAR' as const
      : 'BOTH_GROUPS_OBSERVED_ONLY_IN_DISTINCT_PILLARS' as const
    : observedGroupCount === 1
      ? 'ONLY_ONE_GROUP_OBSERVED_IN_VISIBLE_T5' as const
      : 'NEITHER_GROUP_OBSERVED_IN_VISIBLE_T5' as const;
  const unresolvedFactPaths = [...new Set([
    ...first.unresolvedFactPaths,
    ...second.unresolvedFactPaths,
  ])];
  const hiddenStemMembershipContrast = r070HiddenStemMembershipContrast(snapshot);
  return {
    sourceLayerId: 'CONFIGURATION-OUTCOME',
    sourceSurface,
    sourceTerms: [first.sourceTerm, second.sourceTerm],
    observedGroupCount,
    observationState,
    inputCoverage: unresolvedFactPaths.length > 0
      ? 'PARTIAL_VISIBLE_T5' : 'RESOLVED_VISIBLE_T5',
    hiddenStemMembershipContrast,
    sharedPillarSlots,
    firstGroupOnlyPillarSlots,
    secondGroupOnlyPillarSlots,
    unresolvedFactPaths,
    originalConfigurationConditionEstablished: false,
    configurationInteractionOrPriorityEstablished: false,
    familyRelativeEffectAuthorized: false,
    familyT8Admitted: false,
    missingPrerequisites: [
      'R070_TEN_GOD_COEXISTENCE_METHOD_NOT_ESTABLISHED',
      'R070_VISIBLE_T5_COOBSERVATION_IS_NOT_CLASSICAL_CONFIGURATION',
      'R070_CONFIGURATION_INTERACTION_AND_PRIORITY_NOT_SOURCED',
      'R070_CONFIGURATION_TO_FAMILY_EFFECT_NOT_SOURCED',
      'HIDDEN_VS_VISIBLE_STAR_HANDLING',
      ...hiddenStemMembershipContrast.missingPrerequisites,
      ...(unresolvedFactPaths.length > 0
        ? ['CANONICAL_T5_CONFIGURATION_GROUPS_PARTIAL'] : []),
      ...(observedGroupCount !== 2
        ? ['R070_UNOBSERVED_VISIBLE_T5_GROUP_IS_NOT_NEGATIVE_CONFIGURATION_EVIDENCE'] : []),
    ],
  };
}

function r070UnassignedConfigurationInputs(
  snapshot: CanonicalSajuSnapshot,
): readonly R070UnassignedConfigurationInput[] {
  const layer = R070_CLAIM_LAYERS.find(item => item.id === 'CONFIGURATION-OUTCOME');
  if (layer === undefined || layer.executable !== false ||
      layer.sourceSurfaces.length !== 5) {
    throw new TypeError('R070 unresolved configuration source layer has changed.');
  }
  return layer.sourceSurfaces.map(sourceSurface => {
    const isStructural = sourceSurface === '刑沖破害';
    const isTenGodSearch = sourceSurface === '官煞混雜' || sourceSurface === '財印';
    const structural = snapshot.derivedFacts.structuralRelations;
    const structuralKnown = isStructural && structural?.status === 'resolved';
    const tenGodSearchTerms = isTenGodSearch
      ? r070ConfigurationTenGodSearchTerms(snapshot, sourceSurface) : [];
    const tenGodGroupContrast =
      sourceSurface === '官煞混雜' || sourceSurface === '財印'
        ? r070ConfigurationTenGodGroupContrast(snapshot, sourceSurface, tenGodSearchTerms)
        : undefined;
    const tenGodKnown = isTenGodSearch && snapshot.derivedFacts.tenGods.status === 'resolved';
    const observedBranchClashIds = structuralKnown
      ? structural.value.filter(candidate => candidate.kind === 'branch_clash')
        .map(candidate => candidate.relationId)
      : [];
    return {
      sourceLayerId: 'CONFIGURATION-OUTCOME' as const,
      sourceSurface,
      familyScopeResolved: false as const,
      disposition: 'INCONCLUSIVE' as const,
      canonicalObservationCoverage: structuralKnown
        ? 'branch_clash_only' as const
        : tenGodKnown ? 'visible_t5_search_categories_only' as const : 'none' as const,
      ...(structuralKnown
        ? { canonicalFactPath: 'derivedFacts.structuralRelations' as const }
        : tenGodKnown ? { canonicalFactPath: 'derivedFacts.tenGods' as const } : {}),
      observedBranchClashIds,
      ...(isTenGodSearch ? { tenGodSearchTerms } : {}),
      ...(tenGodGroupContrast === undefined ? {} : { tenGodGroupContrast }),
      missingPrerequisites: [
        'CONFIGURATION_OUTCOME_SETTLEMENT',
        'FAMILY_CONFIGURATION_TO_RELATIVE_METHOD_SELECTION_NOT_ESTABLISHED',
        ...(isStructural
          ? ['XING_PO_HAI_AND_CONFIGURATION_INTERACTION_NOT_SETTLED'] : []),
        ...(!structuralKnown && isStructural
          ? ['CANONICAL_BRANCH_CLASH_CONTEXT_NOT_FULLY_RESOLVED'] : []),
        ...(isTenGodSearch
          ? ['R070_TEN_GOD_COEXISTENCE_METHOD_NOT_ESTABLISHED',
              'HIDDEN_VS_VISIBLE_STAR_HANDLING'] : []),
        ...(tenGodGroupContrast?.missingPrerequisites ?? []),
      ],
      familyOutcomeAuthorized: false as const,
    };
  });
}

export interface FamilyMethodCoexistence {
  sourceSurfaces: readonly [string, string];
  calculatedFactPaths: readonly string[];
  state: 'COEXISTING_NOT_RECONCILED';
  methodSelectionAuthorized: false;
  missingPrerequisites: readonly [
    'FAMILY_METHOD_SELECTION',
    'PILLAR_DOMAIN_VS_STAR_RELATION_RECONCILIATION',
  ];
}

/**
 * Two different R070 source layers may refer to the same person's family
 * question, but neither is a corroborating T8 claim for the other.
 * This preserves literal source identity, observed pillar, searched T5
 * category, incompleteness and the method bridge that is still missing.
 */
export interface R070ExcludedSiblingSource {
  sourceLayerId: 'PILLAR-DOMAIN-MALE-ALTERNATE' | 'TEN-GOD-FAMILY-RELATIONS';
  sourceSurface: '月為兄弟' | '兄弟者即劫財比肩';
  originalSexScope: string;
  originalRelationScope: 'siblings';
  requestedScope: FamilyResearchScope;
  disposition: 'NARROW_OR_REPLACE';
  admittedAsParentsOrChildrenSource: false;
  missingPrerequisites: readonly ['SIBLING_DOMAIN_IS_NOT_PARENTS_OR_CHILDREN'];
}

/**
 * R070 includes separate sibling clauses. They are exact original sources,
 * but neither the parents nor the children menu may silently claim them.
 */
function excludedSiblingSources(
  requestedScope: FamilyResearchScope,
): readonly R070ExcludedSiblingSource[] {
  const originals = [
    {
      sourceLayerId: 'PILLAR-DOMAIN-MALE-ALTERNATE' as const,
      sourceSurface: '月為兄弟' as const,
    },
    {
      sourceLayerId: 'TEN-GOD-FAMILY-RELATIONS' as const,
      sourceSurface: '兄弟者即劫財比肩' as const,
    },
  ];
  return originals.map(original => {
    const layer = R070_CLAIM_LAYERS.find(item =>
      item.id === original.sourceLayerId &&
      (item.sourceSurfaces as readonly string[]).includes(original.sourceSurface),
    );
    if (layer === undefined || layer.executable !== false) {
      throw new TypeError('R070 sibling exclusion must match the existing corpus.');
    }
    return {
      sourceLayerId: original.sourceLayerId,
      sourceSurface: original.sourceSurface,
      originalSexScope: layer.sexScope,
      originalRelationScope: 'siblings' as const,
      requestedScope,
      disposition: 'NARROW_OR_REPLACE' as const,
      admittedAsParentsOrChildrenSource: false as const,
      missingPrerequisites: ['SIBLING_DOMAIN_IS_NOT_PARENTS_OR_CHILDREN'] as const,
    };
  });
}

export interface R070PillarStarPositionContrast {
  /** R070 does not state that a star must occur inside this domain pillar. */
  pillarSlot: PillarSlot;
  pillarFactPath: string;
  state:
    | 'STAR_OBSERVED_IN_REFERENCED_PILLAR'
    | 'STAR_OBSERVED_ONLY_OUTSIDE_REFERENCED_PILLAR'
    | 'REFERENCED_PILLAR_T5_UNRESOLVED'
    | 'STAR_NOT_OBSERVED_IN_RESOLVED_T5_SURFACE';
  inReferencedPillar: FamilyTenGodSourceObservation['observedPositions'];
  outsideReferencedPillar: FamilyTenGodSourceObservation['observedPositions'];
  unresolvedReferencedPillarPaths: readonly string[];
  locationBasedFamilyInferenceAuthorized: false;
}

function compareR070PillarStarPositions(
  pillarFactPath: string,
  observation: FamilyTenGodSourceObservation,
): R070PillarStarPositionContrast {
  const pillarSlot = TEN_GOD_OBSERVATION_SLOTS.find(slot =>
    pillarFactPath === 'pillars.' + slot);
  if (pillarSlot === undefined) {
    throw new TypeError('R070 family pillar observation must have an exact Canonical slot.');
  }
  const inReferencedPillar = observation.observedPositions.filter(
    position => position.slot === pillarSlot,
  );
  const outsideReferencedPillar = observation.observedPositions.filter(
    position => position.slot !== pillarSlot,
  );
  const unresolvedReferencedPillarPaths = observation.unresolvedFactPaths.filter(
    path => path.startsWith('derivedFacts.tenGods.' + pillarSlot + '.'),
  );
  const state = inReferencedPillar.length > 0
    ? 'STAR_OBSERVED_IN_REFERENCED_PILLAR' as const
    : unresolvedReferencedPillarPaths.length > 0
      ? 'REFERENCED_PILLAR_T5_UNRESOLVED' as const
      : outsideReferencedPillar.length > 0
        ? 'STAR_OBSERVED_ONLY_OUTSIDE_REFERENCED_PILLAR' as const
        : 'STAR_NOT_OBSERVED_IN_RESOLVED_T5_SURFACE' as const;
  return {
    pillarSlot, pillarFactPath, state, inReferencedPillar, outsideReferencedPillar,
    unresolvedReferencedPillarPaths, locationBasedFamilyInferenceAuthorized: false,
  };
}

export interface FamilyCrossLayerMethodComparison {
  sourceSurfaces: readonly [string, string];
  sourceLayerIds: readonly [string, string];
  pillarObservation: {
    factPath: string;
    observedPillar: string;
  };
  starObservation: FamilyTenGodSourceObservation;
  /** A fact-level location contrast, not an approved family T8 bridge. */
  starPillarPositionContrast: R070PillarStarPositionContrast;
  state: 'PILLAR_AND_STAR_METHODS_NOT_RECONCILED';
  independentlyAdmittedFamilyClaims: 0;
  methodSelectionAuthorized: false;
  familyMeaningAuthorized: false;
  missingPrerequisites: readonly string[];
}

export interface R070FamilyBranchClashPillarObservation {
  /** Exact R070 phrases; no configuration outcome is assigned to this menu. */
  sourceLayerId: 'CONFIGURATION-OUTCOME';
  sourceSurface: '刑沖破害';
  pillarSourceLayerId: string;
  pillarSourceSurface: string;
  originalSexScope: string;
  requestedScope: FamilyResearchScope;
  referencePillarSlot: PillarSlot;
  referencePillarFactPath: string;
  referenceBranchFactPath: string;
  observedReferenceBranch?: string;
  state:
    | 'REFERENCED_PILLAR_UNRESOLVED'
    | 'STRUCTURAL_CLASH_CANDIDATES_UNRESOLVED'
    | 'REFERENCED_PILLAR_PARTICIPATES_IN_CLASH'
    | 'CLASH_ONLY_OUTSIDE_REFERENCED_PILLAR'
    | 'NO_CLASH_CANDIDATE_IN_RESOLVED_CHART';
  /** These are the engine's exact existing branch_clash candidates, not effects. */
  participatingClashes: readonly R070BranchClashFactReference[];
  outsideClashes: readonly R070BranchClashFactReference[];
  missingPrerequisites: readonly string[];
  independentlyAdmittedFamilyClaims: 0;
  configurationOutcomeAuthorized: false;
  familyT8Admitted: false;
}

export interface R070BranchClashFactReference {
  factPath: 'derivedFacts.structuralRelations';
  relationId: string;
  kind: 'branch_clash';
  participants: StructuralRelationCandidate['participants'];
  sourceIds: StructuralRelationCandidate['sourceIds'];
  structuralMatchOnly: true;
  transformationEstablished: false;
}

/**
 * "刑沖破害" is not a family-specific rule. Observe only whether a real
 * Canonical branch_clash candidate includes the exact R070 pillar named by
 * an already in-scope historical pillar clause. Keep outside candidates and
 * unknown-hour omissions visible, without manufacturing 形/破/害 or outcomes.
 */
function r070FamilyBranchClashPillarObservations(
  snapshot: CanonicalSajuSnapshot,
  scope: FamilyResearchScope,
  methodCandidates: readonly FamilySourceScopeCandidate[],
): readonly R070FamilyBranchClashPillarObservation[] {
  const layer = R070_CLAIM_LAYERS.find(item =>
    item.id === 'CONFIGURATION-OUTCOME' &&
    (item.sourceSurfaces as readonly string[]).includes('刑沖破害'));
  if (layer === undefined || layer.executable !== false) {
    throw new TypeError('R070 configuration source cannot become an executable family rule.');
  }
  const structural = snapshot.derivedFacts.structuralRelations;
  const structuralResolved = structural?.status === 'resolved';
  const clashes: R070BranchClashFactReference[] = structuralResolved
    ? structural.value.filter(item => item.kind === 'branch_clash').map(item => ({
        factPath: 'derivedFacts.structuralRelations' as const,
        relationId: item.relationId,
        kind: 'branch_clash' as const,
        participants: item.participants,
        sourceIds: item.sourceIds,
        structuralMatchOnly: item.semantics.structuralMatchOnly,
        transformationEstablished: item.semantics.transformationEstablished,
      })) : [];

  return FAMILY_SURFACES.filter(definition =>
    definition.scope === scope && definition.pillar !== undefined).flatMap(definition => {
    const method = methodCandidates.find(candidate =>
      candidate.sourceLayerId === definition.layerId &&
      candidate.sourceSurface === definition.surface);
    if (method === undefined || method.disposition === 'NARROW_OR_REPLACE' ||
        definition.pillar === undefined) return [];
    const pillarSlot = definition.pillar;
    const pillar = snapshot.pillars[pillarSlot];
    const referencePillarResolved = pillar.status === 'resolved';
    const participatingClashes = clashes.filter(clash =>
      clash.participants.some(participant =>
        participant.component === 'branch' && participant.pillar === pillarSlot));
    const outsideClashes = clashes.filter(clash =>
      !clash.participants.some(participant =>
        participant.component === 'branch' && participant.pillar === pillarSlot));
    const state = !referencePillarResolved
      ? 'REFERENCED_PILLAR_UNRESOLVED' as const
      : !structuralResolved
        ? 'STRUCTURAL_CLASH_CANDIDATES_UNRESOLVED' as const
        : participatingClashes.length > 0
          ? 'REFERENCED_PILLAR_PARTICIPATES_IN_CLASH' as const
          : outsideClashes.length > 0
            ? 'CLASH_ONLY_OUTSIDE_REFERENCED_PILLAR' as const
            : 'NO_CLASH_CANDIDATE_IN_RESOLVED_CHART' as const;
    return [{
      sourceLayerId: 'CONFIGURATION-OUTCOME' as const,
      sourceSurface: '刑沖破害' as const,
      pillarSourceLayerId: method.sourceLayerId,
      pillarSourceSurface: method.sourceSurface,
      originalSexScope: method.originalSexScope,
      requestedScope: scope,
      referencePillarSlot: pillarSlot,
      referencePillarFactPath: 'pillars.' + pillarSlot,
      referenceBranchFactPath: 'pillars.' + pillarSlot + '.branch',
      ...(referencePillarResolved
        ? { observedReferenceBranch: pillar.value.branch.value } : {}),
      state,
      participatingClashes,
      outsideClashes,
      missingPrerequisites: [
        'CONFIGURATION_OUTCOME_SETTLEMENT',
        'FAMILY_CONFIGURATION_TO_RELATIVE_METHOD_SELECTION_NOT_ESTABLISHED',
        'XING_PO_HAI_AND_CONFIGURATION_INTERACTION_NOT_SETTLED',
        'R070_BRANCH_CLASH_PILLAR_TO_FAMILY_EFFECT_NOT_SOURCED',
        ...(!referencePillarResolved
          ? ['CANONICAL_' + pillarSlot.toUpperCase() + '_PILLAR_UNRESOLVED'] : []),
        ...(!structuralResolved
          ? ['CANONICAL_BRANCH_CLASH_CONTEXT_NOT_FULLY_RESOLVED'] : []),
        ...(state === 'CLASH_ONLY_OUTSIDE_REFERENCED_PILLAR'
          ? ['R070_OUTSIDE_PILLAR_CLASH_IS_NOT_FAMILY_EFFECT_EVIDENCE'] : []),
        ...(state === 'NO_CLASH_CANDIDATE_IN_RESOLVED_CHART'
          ? ['R070_NO_CLASH_CANDIDATE_IS_NOT_FAMILY_OUTCOME_ABSENCE'] : []),
      ],
      independentlyAdmittedFamilyClaims: 0 as const,
      configurationOutcomeAuthorized: false as const,
      familyT8Admitted: false as const,
    }];
  });
}

/**
 * A three-layer fact comparison. Shared coordinates do not make a sourced
 * family outcome, and reuse of one calculation is not new corroboration.
 */
export interface R070FamilyPillarStarClashOverlap {
  requestedScope: FamilyResearchScope;
  sourceLayerIds: readonly [string, string, 'CONFIGURATION-OUTCOME'];
  sourceSurfaces: readonly [string, string, '刑沖破害'];
  pillarSlot: PillarSlot;
  pillarFactPath: string;
  visibleT5FactPath: 'derivedFacts.tenGods';
  structuralFactPath: 'derivedFacts.structuralRelations';
  observedT5PositionsInPillar: FamilyTenGodSourceObservation['observedPositions'];
  unresolvedT5FactPathsInPillar: readonly string[];
  participatingClashes: readonly R070BranchClashFactReference[];
  outsideClashRelationIds: readonly string[];
  clashObservationState: R070FamilyBranchClashPillarObservation['state'];
  factOverlapState:
    | 'VISIBLE_T5_AND_BRANCH_CLASH_COLOCATED'
    | 'VISIBLE_T5_WITHOUT_REFERENCE_BRANCH_CLASH'
    | 'REFERENCE_BRANCH_CLASH_WITHOUT_VISIBLE_T5'
    | 'NO_VISIBLE_T5_OR_REFERENCE_BRANCH_CLASH'
    | 'INCOMPLETE_FACT_INPUTS';
  missingPrerequisites: readonly string[];
  crossLayerMethodReconciled: false;
  configurationEffectAuthorized: false;
  independentFamilyEvidenceWeightAssigned: false;
  independentlyAdmittedFamilyClaims: 0;
  familyT8Admitted: false;
}

/** One exact Canonical fact may be referenced by several historical phrases. */
export interface R070FamilyTripleLayerFactReuse {
  uniqueVisibleT5FactPaths: readonly string[];
  repeatedVisibleT5FactPaths: readonly string[];
  uniqueBranchClashRelationIds: readonly string[];
  repeatedBranchClashRelationIds: readonly string[];
  distinctHistoricalSourceCountIsEvidenceWeight: false;
  independentlyAdmittedFamilyClaims: 0;
}

function r070FamilyTripleLayerFactReuse(
  comparisons: readonly R070FamilyPillarStarClashOverlap[],
): R070FamilyTripleLayerFactReuse {
  const t5References = comparisons.flatMap(comparison =>
    comparison.observedT5PositionsInPillar.map(position => position.path));
  const clashReferences = comparisons.flatMap(comparison =>
    comparison.participatingClashes.map(clash => clash.relationId));
  const uniqueVisibleT5FactPaths = [...new Set(t5References)];
  const uniqueBranchClashRelationIds = [...new Set(clashReferences)];
  return {
    uniqueVisibleT5FactPaths,
    repeatedVisibleT5FactPaths: uniqueVisibleT5FactPaths.filter(path =>
      t5References.filter(reference => reference === path).length > 1),
    uniqueBranchClashRelationIds,
    repeatedBranchClashRelationIds: uniqueBranchClashRelationIds.filter(id =>
      clashReferences.filter(reference => reference === id).length > 1),
    distinctHistoricalSourceCountIsEvidenceWeight: false,
    independentlyAdmittedFamilyClaims: 0,
  };
}

function r070FamilyPillarStarClashOverlaps(
  scope: FamilyResearchScope,
  crossLayerComparisons: readonly FamilyCrossLayerMethodComparison[],
  pillarClashes: readonly R070FamilyBranchClashPillarObservation[],
): readonly R070FamilyPillarStarClashOverlap[] {
  return crossLayerComparisons.map(comparison => {
    const contrast = comparison.starPillarPositionContrast;
    const match = pillarClashes.find(candidate =>
      candidate.pillarSourceLayerId === comparison.sourceLayerIds[0] &&
      candidate.pillarSourceSurface === comparison.sourceSurfaces[0] &&
      candidate.referencePillarSlot === contrast.pillarSlot);
    if (match === undefined) {
      throw new TypeError('R070 triple-layer input must match its exact pillar source.');
    }
    const incomplete = contrast.unresolvedReferencedPillarPaths.length > 0 ||
      match.state === 'REFERENCED_PILLAR_UNRESOLVED' ||
      match.state === 'STRUCTURAL_CLASH_CANDIDATES_UNRESOLVED';
    const hasT5 = contrast.inReferencedPillar.length > 0;
    const hasClash = match.participatingClashes.length > 0;
    const factOverlapState = incomplete
      ? 'INCOMPLETE_FACT_INPUTS' as const
      : hasT5 && hasClash
        ? 'VISIBLE_T5_AND_BRANCH_CLASH_COLOCATED' as const
        : hasT5
          ? 'VISIBLE_T5_WITHOUT_REFERENCE_BRANCH_CLASH' as const
          : hasClash
            ? 'REFERENCE_BRANCH_CLASH_WITHOUT_VISIBLE_T5' as const
            : 'NO_VISIBLE_T5_OR_REFERENCE_BRANCH_CLASH' as const;
    return {
      requestedScope: scope,
      sourceLayerIds: [
        comparison.sourceLayerIds[0],
        comparison.sourceLayerIds[1],
        match.sourceLayerId,
      ] as const,
      sourceSurfaces: [
        comparison.sourceSurfaces[0],
        comparison.sourceSurfaces[1],
        match.sourceSurface,
      ] as const,
      pillarSlot: contrast.pillarSlot,
      pillarFactPath: comparison.pillarObservation.factPath,
      visibleT5FactPath: 'derivedFacts.tenGods' as const,
      structuralFactPath: 'derivedFacts.structuralRelations' as const,
      observedT5PositionsInPillar: contrast.inReferencedPillar,
      unresolvedT5FactPathsInPillar: contrast.unresolvedReferencedPillarPaths,
      participatingClashes: match.participatingClashes,
      outsideClashRelationIds: match.outsideClashes.map(item => item.relationId),
      clashObservationState: match.state,
      factOverlapState,
      missingPrerequisites: [
        'FAMILY_METHOD_SELECTION',
        'PILLAR_DOMAIN_VS_STAR_RELATION_RECONCILIATION',
        'CONFIGURATION_OUTCOME_SETTLEMENT',
        'R070_PILLAR_STAR_CLASH_TRIPLE_SYNTHESIS_NOT_SOURCED',
        'R070_SHARED_CALCULATION_FACT_IS_NOT_MULTIPLE_FAMILY_CLAIMS',
        ...(incomplete ? ['R070_TRIPLE_LAYER_CANONICAL_INPUTS_PARTIAL'] : []),
        ...comparison.missingPrerequisites,
        ...match.missingPrerequisites,
      ],
      crossLayerMethodReconciled: false as const,
      configurationEffectAuthorized: false as const,
      independentFamilyEvidenceWeightAssigned: false as const,
      independentlyAdmittedFamilyClaims: 0 as const,
      familyT8Admitted: false as const,
    };
  });
}

export interface R070FamilySourceConditionHold {
  sourceLayerId: string;
  sourceSurface: string;
  originalSexScope: string;
  disposition: FamilySourceScopeCandidate['disposition'];
  blockerKind:
    | 'HISTORICAL_SEX_SCOPE_NOT_APPLICABLE'
    | 'CANONICAL_CONCEPT_NOT_AVAILABLE'
    | 'REFERENCE_PILLAR_INPUT_UNRESOLVED'
    | 'SOURCE_CONTEXT_METHOD_NOT_SELECTED'
    | 'CALCULATED_PILLAR_POSITION_ONLY';
  observedFactPaths: readonly string[];
  unresolvedFactPaths: readonly string[];
  missingPrerequisites: readonly string[];
  familyMeaningAuthorized: false;
}

export interface R070FamilyMethodSelectionHold {
  methodPairKind:
    | 'ALTERNATIVE_PILLAR_DOMAIN_WORDINGS'
    | 'PILLAR_DOMAIN_VS_STAR_RELATION'
    | 'FEMALE_CHILD_STAR_RELATION_ALTERNATIVES';
  sourceLayerIds: readonly [string, string];
  sourceSurfaces: readonly [string, string];
  observedFactPaths: readonly string[];
  missingPrerequisites: readonly string[];
  coPresenceIsVerifiedContradiction: false;
  methodSelectionAuthorized: false;
  independentlyAdmittedFamilyClaims: 0;
}

export interface R070FamilyConfigurationHold {
  sourceLayerId: 'CONFIGURATION-OUTCOME';
  sourceSurface: string;
  canonicalObservationCoverage: R070UnassignedConfigurationInput['canonicalObservationCoverage'];
  missingPrerequisites: readonly string[];
  familyScopeResolved: false;
  familyOutcomeAuthorized: false;
}

export interface R070FamilyInterpretationBlockerHandoff {
  requestedScope: FamilyResearchScope;
  historicalSex: 'male' | 'female' | 'unspecified';
  sourceConditionHolds: readonly R070FamilySourceConditionHold[];
  methodSelectionHolds: readonly R070FamilyMethodSelectionHold[];
  configurationHolds: readonly R070FamilyConfigurationHold[];
  missingPrerequisites: readonly string[];
  originalTextContradictionEstablished: false;
  interpretationMethodSelected: false;
  independentlyAdmittedFamilyClaims: 0;
  familyT8Admitted: false;
}

/** An original source being in scope never settles its interpretation method. */
function r070FamilyInterpretationBlockerHandoff(
  scope: FamilyResearchScope,
  historicalSex: 'male' | 'female' | 'unspecified',
  candidates: readonly FamilySourceScopeCandidate[],
  coexisting: readonly FamilyMethodCoexistence[],
  crossLayer: readonly FamilyCrossLayerMethodComparison[],
  configurations: readonly R070UnassignedConfigurationInput[],
): R070FamilyInterpretationBlockerHandoff {
  const sourceConditionHolds: R070FamilySourceConditionHold[] = candidates.map(candidate => {
    const hidden = candidate.relativeStarHiddenStemBoundary;
    const visible = candidate.tenGodObservation;
    const observedFactPaths = [
      ...(candidate.observedFactPath === undefined ? [] : [candidate.observedFactPath]),
      ...(visible?.observedPositions.map(position => position.path) ?? []),
      ...(hidden?.pillarObservations.flatMap(pillar =>
        pillar.status === 'resolved' ? [pillar.membershipFactPath] : []) ?? []),
    ];
    const unresolvedFactPaths = [
      ...(candidate.observedFactPath !== undefined &&
        candidate.disposition === 'INCONCLUSIVE' && visible === undefined
        ? [candidate.observedFactPath] : []),
      ...(visible?.unresolvedFactPaths ?? []),
      ...(hidden?.unresolvedHiddenStemMembershipFactPaths ?? []),
    ];
    const blockerKind = candidate.disposition === 'NARROW_OR_REPLACE'
      ? 'HISTORICAL_SEX_SCOPE_NOT_APPLICABLE' as const
      : candidate.disposition === 'APPLICABLE_BOUNDED'
        ? 'CALCULATED_PILLAR_POSITION_ONLY' as const
        : candidate.observedFactPath !== undefined
          ? 'REFERENCE_PILLAR_INPUT_UNRESOLVED' as const
          : visible !== undefined
            ? 'SOURCE_CONTEXT_METHOD_NOT_SELECTED' as const
            : 'CANONICAL_CONCEPT_NOT_AVAILABLE' as const;
    return {
      sourceLayerId: candidate.sourceLayerId,
      sourceSurface: candidate.sourceSurface,
      originalSexScope: candidate.originalSexScope,
      disposition: candidate.disposition,
      blockerKind,
      observedFactPaths: [...new Set(observedFactPaths)],
      unresolvedFactPaths: [...new Set(unresolvedFactPaths)],
      missingPrerequisites: [...candidate.missingPrerequisites,
        ...(candidate.disposition === 'APPLICABLE_BOUNDED'
          ? ['R070_PILLAR_LOCATION_IS_NOT_FAMILY_OUTCOME_RULE'] : [])],
      familyMeaningAuthorized: false,
    };
  });
  const methodSelectionHolds: R070FamilyMethodSelectionHold[] = [
    ...coexisting.map(pair => ({
      methodPairKind: 'ALTERNATIVE_PILLAR_DOMAIN_WORDINGS' as const,
      sourceLayerIds: pair.sourceSurfaces.map(surface => {
        const source = candidates.find(candidate => candidate.sourceSurface === surface);
        if (source === undefined) throw new TypeError('R070 coexisting method source missing.');
        return source.sourceLayerId;
      }) as [string, string],
      sourceSurfaces: pair.sourceSurfaces,
      observedFactPaths: pair.calculatedFactPaths,
      missingPrerequisites: pair.missingPrerequisites,
      coPresenceIsVerifiedContradiction: false as const,
      methodSelectionAuthorized: false as const,
      independentlyAdmittedFamilyClaims: 0 as const,
    })),
    ...crossLayer.map(pair => ({
      methodPairKind: 'PILLAR_DOMAIN_VS_STAR_RELATION' as const,
      sourceLayerIds: pair.sourceLayerIds,
      sourceSurfaces: pair.sourceSurfaces,
      observedFactPaths: [...new Set([
        pair.pillarObservation.factPath,
        ...pair.starObservation.observedPositions.map(position => position.path),
      ])],
      missingPrerequisites: pair.missingPrerequisites,
      coPresenceIsVerifiedContradiction: false as const,
      methodSelectionAuthorized: false as const,
      independentlyAdmittedFamilyClaims: 0 as const,
    })),
  ];
  if (scope === 'children') {
    const sourceSurfaces = ['子嗣者即官星也', '我生者為子'] as const;
    const stars = sourceSurfaces.map(surface => candidates.find(candidate =>
      candidate.sourceSurface === surface));
    if (stars.length === 2 && stars.every(candidate =>
      candidate?.disposition === 'INCONCLUSIVE' &&
      candidate.tenGodObservation !== undefined)) {
      const first = stars[0];
      const second = stars[1];
      if (first === undefined || second === undefined ||
          first.tenGodObservation === undefined || second.tenGodObservation === undefined) {
        throw new TypeError('R070 child-star pair lost an original source.');
      }
      methodSelectionHolds.push({
        methodPairKind: 'FEMALE_CHILD_STAR_RELATION_ALTERNATIVES',
        sourceLayerIds: [first.sourceLayerId, second.sourceLayerId],
        sourceSurfaces,
        observedFactPaths: [...new Set([
          ...first.tenGodObservation.observedPositions.map(position => position.path),
          ...second.tenGodObservation.observedPositions.map(position => position.path),
        ])],
        missingPrerequisites: [
          'SECTION_SCOPED_STAR_RELATION_METHOD_NOT_SELECTED',
          'R070_CHILD_STAR_RELATION_ALTERNATIVES_NOT_RECONCILED',
          'HISTORICAL_TO_MODERN_FAMILY_TRANSLATION_NOT_ESTABLISHED',
        ],
        coPresenceIsVerifiedContradiction: false,
        methodSelectionAuthorized: false,
        independentlyAdmittedFamilyClaims: 0,
      });
    }
  }
  const configurationHolds: R070FamilyConfigurationHold[] = configurations.map(source => ({
    sourceLayerId: source.sourceLayerId,
    sourceSurface: source.sourceSurface,
    canonicalObservationCoverage: source.canonicalObservationCoverage,
    missingPrerequisites: source.missingPrerequisites,
    familyScopeResolved: false,
    familyOutcomeAuthorized: false,
  }));
  return {
    requestedScope: scope,
    historicalSex,
    sourceConditionHolds,
    methodSelectionHolds,
    configurationHolds,
    missingPrerequisites: [...new Set([
      ...sourceConditionHolds.flatMap(item => item.missingPrerequisites),
      ...methodSelectionHolds.flatMap(item => item.missingPrerequisites),
      ...configurationHolds.flatMap(item => item.missingPrerequisites),
    ])],
    originalTextContradictionEstablished: false,
    interpretationMethodSelected: false,
    independentlyAdmittedFamilyClaims: 0,
    familyT8Admitted: false,
  };
}

export interface R070FamilyMenuUnsupportedReason {
  category: 'SOURCE_APPLICABILITY' | 'SOURCE_CONTEXT' | 'CANONICAL_INPUT'
    | 'METHOD_SELECTION' | 'OFFICIAL_AUTHORITY';
  reasonCode:
    | 'R070_MENU_PILLAR_POSITION_NOT_FAMILY_INTERPRETATION'
    | 'R070_MENU_SOURCE_CONTEXT_METHOD_NOT_SELECTED'
    | 'R070_MENU_CANONICAL_REFERENCE_INPUT_UNRESOLVED'
    | 'R070_MENU_CANONICAL_CONCEPT_NOT_AVAILABLE'
    | 'R070_MENU_HISTORICAL_METHODS_NOT_RECONCILED'
    | 'R070_MENU_OFFICIAL_FAMILY_T8_NOT_ADMITTED';
  sourceLayerIds: readonly string[];
  sourceSurfaces: readonly string[];
  observedFactPaths: readonly string[];
  unresolvedFactPaths: readonly string[];
  missingPrerequisites: readonly string[];
  officialMenuCanBeEnabledFromThisReason: false;
}

export interface R070FamilyMenuScopeExclusion {
  sourceLayerId: string;
  sourceSurface: string;
  originalSexScope: string;
  historicalSex: 'male' | 'female' | 'unspecified';
  missingPrerequisites: readonly string[];
  /** Excluding a nonmatching historical clause is not itself an interpretation rule. */
  exclusionIsMenuUnavailabilityReason: false;
}

export interface R070FamilyMenuUnresolvedCanonicalInput {
  factPath: string;
  canonicalInputKind: 'pillar' | 'visible_t5' | 'hidden_stem_membership';
  /** Every still-in-scope original clause referring to this exact missing fact. */
  affectedOriginalSources: readonly {
    sourceLayerId: string;
    sourceSurface: string;
  }[];
  /** An unknown fact cannot be filled by another source or another pillar. */
  substituteAnotherPillarAuthorized: false;
  familyMeaningAuthorized: false;
}

/**
 * The exact pre-existing reason references for one missing prerequisite code.
 * A repeated prerequisite or source phrase never creates another T8 claim.
 */
export interface R070FamilyMenuPrerequisiteTrace {
  prerequisiteCode: string;
  origins: readonly {
    reasonCode: R070FamilyMenuUnsupportedReason['reasonCode'];
    category: R070FamilyMenuUnsupportedReason['category'];
    sourceLayerIds: readonly string[];
    sourceSurfaces: readonly string[];
    observedFactPaths: readonly string[];
    unresolvedFactPaths: readonly string[];
  }[];
  /** This is a provenance index, not a priority or weight. */
  repetitionIsIndependentEvidence: false;
  familyMeaningAuthorized: false;
}

/** An unassigned configuration phrase remains its own, non-family rule source. */
export interface R070FamilyConfigurationPrerequisiteTrace {
  prerequisiteCode: string;
  origins: readonly {
    sourceLayerId: 'CONFIGURATION-OUTCOME';
    sourceSurface: string;
    canonicalObservationCoverage: R070FamilyConfigurationHold['canonicalObservationCoverage'];
  }[];
  configurationIsFamilyMeaningAuthorized: false;
  repeatedSourceIsIndependentFamilyEvidence: false;
}

/** Exact code overlap across two separate lanes never selects or reconciles them. */
export interface R070FamilyCrossLanePrerequisiteOverlap {
  prerequisiteCode: string;
  menuOrigins: R070FamilyMenuPrerequisiteTrace['origins'];
  unassignedConfigurationOrigins: R070FamilyConfigurationPrerequisiteTrace['origins'];
  menuAndConfigurationMethodsReconciled: false;
  independentlyAdmittedFamilyClaims: 0;
}

export interface R070FamilyMenuSupportHandoff {
  requestedScope: FamilyResearchScope;
  historicalSex: 'male' | 'female' | 'unspecified';
  supportState: 'UNAVAILABLE_RESEARCH_ONLY';
  /** Menu-blocking reasons from already-recorded family source and method gaps. */
  unsupportedReasons: readonly R070FamilyMenuUnsupportedReason[];
  /** Historical sex exclusions are separate from menu-blocking prerequisites. */
  excludedHistoricalSources: readonly R070FamilyMenuScopeExclusion[];
  /** Exact unfilled Canonical paths deduplicated across applicable source wording. */
  unresolvedCanonicalInputs: readonly R070FamilyMenuUnresolvedCanonicalInput[];
  /** Deduplicated source/method/authority blockers with original reason references. */
  prerequisiteTrace: readonly R070FamilyMenuPrerequisiteTrace[];
  /** Unassigned CONFIGURATION-OUTCOME stays supplemental, never a family menu rule. */
  unassignedConfigurationSources: readonly R070FamilyConfigurationHold[];
  /** Actual menu holds: never includes a code solely from unassigned configuration. */
  menuBlockingPrerequisites: readonly string[];
  /** A separate provenance lane; not extra prerequisites to activate this menu. */
  unassignedConfigurationPrerequisites: readonly string[];
  /** Same configuration gap may occur in several original, unassigned phrases. */
  unassignedConfigurationPrerequisiteTrace: readonly R070FamilyConfigurationPrerequisiteTrace[];
  /** A code shared across lanes retains both provenance sets, with no merger. */
  crossLanePrerequisiteOverlaps: readonly R070FamilyCrossLanePrerequisiteOverlap[];
  /** Legacy aggregate for research consumers, not a list of menu activation gates. */
  missingPrerequisites: readonly string[];
  admittedFamilyClaimCount: 0;
  familyT8Admitted: false;
  mayEnableMenu: false;
  mayDisplayFamilyInterpretation: false;
  mayPersist: false;
  mayPublish: false;
  maySell: false;
}

/** The unsupported-menu contract is a research handoff, not a product gate setter. */
function r070FamilyMenuSupportHandoff(
  blockers: R070FamilyInterpretationBlockerHandoff,
): R070FamilyMenuSupportHandoff {
  const unsupportedReasons: R070FamilyMenuUnsupportedReason[] = [
    {
      category: 'OFFICIAL_AUTHORITY',
      reasonCode: 'R070_MENU_OFFICIAL_FAMILY_T8_NOT_ADMITTED',
      sourceLayerIds: [],
      sourceSurfaces: [],
      observedFactPaths: [],
      unresolvedFactPaths: [],
      missingPrerequisites: ['R070_FAMILY_T8_OFFICIAL_METHOD_NOT_ADMITTED'],
      officialMenuCanBeEnabledFromThisReason: false,
    },
  ];
  const excludedHistoricalSources: R070FamilyMenuScopeExclusion[] = [];
  const applicableSourceHolds = blockers.sourceConditionHolds.filter(item =>
    item.blockerKind !== 'HISTORICAL_SEX_SCOPE_NOT_APPLICABLE');
  const unresolvedCanonicalInputs: R070FamilyMenuUnresolvedCanonicalInput[] =
    [...new Set(applicableSourceHolds.flatMap(item => item.unresolvedFactPaths))]
      .map(factPath => {
        const canonicalInputKind = factPath.startsWith('pillars.')
          ? 'pillar' as const
          : factPath.startsWith('derivedFacts.tenGods.')
            ? 'visible_t5' as const
            : factPath.startsWith('derivedFacts.hiddenStems.')
              ? 'hidden_stem_membership' as const
              : undefined;
        if (canonicalInputKind === undefined) {
          throw new TypeError('R070 menu input gap must identify an existing Canonical fact path.');
        }
        return {
          factPath,
          canonicalInputKind,
          affectedOriginalSources: applicableSourceHolds
            .filter(item => item.unresolvedFactPaths.includes(factPath))
            .map(item => ({
              sourceLayerId: item.sourceLayerId,
              sourceSurface: item.sourceSurface,
            })),
          substituteAnotherPillarAuthorized: false as const,
          familyMeaningAuthorized: false as const,
        };
      });
  for (const item of blockers.sourceConditionHolds) {
    if (item.blockerKind === 'HISTORICAL_SEX_SCOPE_NOT_APPLICABLE') {
      excludedHistoricalSources.push({
        sourceLayerId: item.sourceLayerId,
        sourceSurface: item.sourceSurface,
        originalSexScope: item.originalSexScope,
        historicalSex: blockers.historicalSex,
        missingPrerequisites: item.missingPrerequisites,
        exclusionIsMenuUnavailabilityReason: false,
      });
      continue;
    }
    const reasonCode = item.blockerKind === 'CALCULATED_PILLAR_POSITION_ONLY'
      ? 'R070_MENU_PILLAR_POSITION_NOT_FAMILY_INTERPRETATION' as const
      : item.blockerKind === 'SOURCE_CONTEXT_METHOD_NOT_SELECTED'
        ? 'R070_MENU_SOURCE_CONTEXT_METHOD_NOT_SELECTED' as const
        : item.blockerKind === 'REFERENCE_PILLAR_INPUT_UNRESOLVED'
          ? 'R070_MENU_CANONICAL_REFERENCE_INPUT_UNRESOLVED' as const
          : 'R070_MENU_CANONICAL_CONCEPT_NOT_AVAILABLE' as const;
    unsupportedReasons.push({
      category: item.blockerKind === 'CALCULATED_PILLAR_POSITION_ONLY'
        ? 'SOURCE_APPLICABILITY'
        : item.blockerKind === 'SOURCE_CONTEXT_METHOD_NOT_SELECTED'
          ? 'SOURCE_CONTEXT' : 'CANONICAL_INPUT',
      reasonCode,
      sourceLayerIds: [item.sourceLayerId],
      sourceSurfaces: [item.sourceSurface],
      observedFactPaths: item.observedFactPaths,
      unresolvedFactPaths: item.unresolvedFactPaths,
      missingPrerequisites: item.missingPrerequisites,
      officialMenuCanBeEnabledFromThisReason: false,
    });
  }
  for (const item of blockers.methodSelectionHolds) {
    unsupportedReasons.push({
      category: 'METHOD_SELECTION',
      reasonCode: 'R070_MENU_HISTORICAL_METHODS_NOT_RECONCILED',
      sourceLayerIds: item.sourceLayerIds,
      sourceSurfaces: item.sourceSurfaces,
      observedFactPaths: item.observedFactPaths,
      unresolvedFactPaths: [],
      missingPrerequisites: item.missingPrerequisites,
      officialMenuCanBeEnabledFromThisReason: false,
    });
  }
  const prerequisiteTrace: R070FamilyMenuPrerequisiteTrace[] =
    [...new Set(unsupportedReasons.flatMap(item => item.missingPrerequisites))]
      .map(prerequisiteCode => ({
        prerequisiteCode,
        origins: unsupportedReasons
          .filter(reason => reason.missingPrerequisites.includes(prerequisiteCode))
          .map(reason => ({
            reasonCode: reason.reasonCode,
            category: reason.category,
            sourceLayerIds: reason.sourceLayerIds,
            sourceSurfaces: reason.sourceSurfaces,
            observedFactPaths: reason.observedFactPaths,
            unresolvedFactPaths: reason.unresolvedFactPaths,
          })),
        repetitionIsIndependentEvidence: false as const,
        familyMeaningAuthorized: false as const,
      }));
  const menuBlockingPrerequisites =
    [...new Set(unsupportedReasons.flatMap(item => item.missingPrerequisites))];
  const unassignedConfigurationPrerequisites =
    [...new Set(blockers.configurationHolds.flatMap(item => item.missingPrerequisites))];
  const unassignedConfigurationPrerequisiteTrace: R070FamilyConfigurationPrerequisiteTrace[] =
    unassignedConfigurationPrerequisites.map(prerequisiteCode => ({
      prerequisiteCode,
      origins: blockers.configurationHolds
        .filter(source => source.missingPrerequisites.includes(prerequisiteCode))
        .map(source => ({
          sourceLayerId: source.sourceLayerId,
          sourceSurface: source.sourceSurface,
          canonicalObservationCoverage: source.canonicalObservationCoverage,
        })),
      configurationIsFamilyMeaningAuthorized: false,
      repeatedSourceIsIndependentFamilyEvidence: false,
    }));
  const crossLanePrerequisiteOverlaps: R070FamilyCrossLanePrerequisiteOverlap[] =
    prerequisiteTrace.flatMap(menuTrace => {
      const configurationTrace = unassignedConfigurationPrerequisiteTrace.find(item =>
        item.prerequisiteCode === menuTrace.prerequisiteCode);
      return configurationTrace === undefined ? [] : [{
        prerequisiteCode: menuTrace.prerequisiteCode,
        menuOrigins: menuTrace.origins,
        unassignedConfigurationOrigins: configurationTrace.origins,
        menuAndConfigurationMethodsReconciled: false as const,
        independentlyAdmittedFamilyClaims: 0 as const,
      }];
    });
  return {
    requestedScope: blockers.requestedScope,
    historicalSex: blockers.historicalSex,
    supportState: 'UNAVAILABLE_RESEARCH_ONLY',
    unsupportedReasons,
    excludedHistoricalSources,
    unresolvedCanonicalInputs,
    prerequisiteTrace,
    unassignedConfigurationSources: blockers.configurationHolds,
    menuBlockingPrerequisites,
    unassignedConfigurationPrerequisites,
    unassignedConfigurationPrerequisiteTrace,
    crossLanePrerequisiteOverlaps,
    missingPrerequisites: [...new Set([
      ...menuBlockingPrerequisites,
      ...unassignedConfigurationPrerequisites,
    ])],
    admittedFamilyClaimCount: 0,
    familyT8Admitted: false,
    mayEnableMenu: false,
    mayDisplayFamilyInterpretation: false,
    mayPersist: false,
    mayPublish: false,
    maySell: false,
  };
}

/**
 * A transfer boundary for the R070 research engine, not an executable family
 * interpretation or a Product/Reader menu availability contract.
 * Every array is an unmodified reference to the existing menu handoff facts.
 */
export interface R070FamilyEngineTransferBoundary {
  route: 'R070_RESEARCH_ONLY_NOT_EXECUTABLE';
  requestedScope: FamilyResearchScope;
  sourceSnapshotId: string;
  sourceCalculationHash: string;
  /** Missing Canonical paths: never substitute a different pillar or relative. */
  unresolvedCanonicalInputs: readonly R070FamilyMenuUnresolvedCanonicalInput[];
  /** Includes missing calculation concepts with no invented Canonical fact path. */
  canonicalInputAndConceptHolds: readonly R070FamilyMenuUnsupportedReason[];
  /** Observed source applicability and historical method choices are not outcomes. */
  sourceAndMethodHolds: readonly R070FamilyMenuUnsupportedReason[];
  /** A separate non-source claim authority barrier, always present. */
  officialAuthorityHold: R070FamilyMenuUnsupportedReason;
  /** Nonmatching original sex scopes are exclusions, not menu-blocking claims. */
  excludedHistoricalSources: readonly R070FamilyMenuScopeExclusion[];
  /** Existing R070 configuration input is still unassigned to either menu. */
  unassignedConfigurationSources: readonly R070FamilyConfigurationHold[];
  /** Research provenance is never an EvidenceSelector weight. */
  prerequisiteTrace: readonly R070FamilyMenuPrerequisiteTrace[];
  /** These are only current menu barriers, with official authority still held. */
  menuBlockingPrerequisites: readonly string[];
  /** Unassigned configuration remains a different, non-menu research lane. */
  unassignedConfigurationPrerequisites: readonly string[];
  /** Link each unassigned code to its exact configuration source surfaces. */
  unassignedConfigurationPrerequisiteTrace: readonly R070FamilyConfigurationPrerequisiteTrace[];
  /** Shared strings are recorded without combining the source methodologies. */
  crossLanePrerequisiteOverlaps: readonly R070FamilyCrossLanePrerequisiteOverlap[];
  researchEvidenceMayBecomeFamilyClaim: false;
  canSelectHistoricalMethod: false;
  canGrantFamilyT8Authority: false;
  canEnableMenu: false;
  canPublishOrSell: false;
}

function r070FamilyEngineTransferBoundary(
  snapshot: CanonicalSajuSnapshot,
  menu: R070FamilyMenuSupportHandoff,
): R070FamilyEngineTransferBoundary {
  const authorityHolds = menu.unsupportedReasons.filter(reason =>
    reason.category === 'OFFICIAL_AUTHORITY' &&
    reason.reasonCode === 'R070_MENU_OFFICIAL_FAMILY_T8_NOT_ADMITTED');
  if (authorityHolds.length !== 1 || menu.supportState !== 'UNAVAILABLE_RESEARCH_ONLY') {
    throw new TypeError('R070 research engine handoff requires its single official T8 hold.');
  }
  const officialAuthorityHold = authorityHolds[0];
  if (officialAuthorityHold === undefined) {
    throw new TypeError('R070 research engine handoff lost the official authority hold.');
  }
  return {
    route: 'R070_RESEARCH_ONLY_NOT_EXECUTABLE',
    requestedScope: menu.requestedScope,
    sourceSnapshotId: snapshot.snapshotId,
    sourceCalculationHash: snapshot.calculationHash,
    unresolvedCanonicalInputs: menu.unresolvedCanonicalInputs,
    canonicalInputAndConceptHolds: menu.unsupportedReasons.filter(reason =>
      reason.category === 'CANONICAL_INPUT'),
    sourceAndMethodHolds: menu.unsupportedReasons.filter(reason =>
      reason.category === 'SOURCE_APPLICABILITY' ||
      reason.category === 'SOURCE_CONTEXT' ||
      reason.category === 'METHOD_SELECTION'),
    officialAuthorityHold,
    excludedHistoricalSources: menu.excludedHistoricalSources,
    unassignedConfigurationSources: menu.unassignedConfigurationSources,
    prerequisiteTrace: menu.prerequisiteTrace,
    menuBlockingPrerequisites: menu.menuBlockingPrerequisites,
    unassignedConfigurationPrerequisites: menu.unassignedConfigurationPrerequisites,
    unassignedConfigurationPrerequisiteTrace: menu.unassignedConfigurationPrerequisiteTrace,
    crossLanePrerequisiteOverlaps: menu.crossLanePrerequisiteOverlaps,
    researchEvidenceMayBecomeFamilyClaim: false,
    canSelectHistoricalMethod: false,
    canGrantFamilyT8Authority: false,
    canEnableMenu: false,
    canPublishOrSell: false,
  };
}

export interface FamilySourceScopeHandoff {
  version: typeof FAMILY_PAIR_SOURCE_SCOPE_HANDOFF_VERSION;
  owner: 'R070';
  corpusVersion: typeof R070_FAMILY_DOMAIN_CLAIM_CORPUS_VERSION;
  scope: FamilyResearchScope;
  snapshotId: string;
  calculationHash: string;
  historicalSex: 'male' | 'female' | 'unspecified';
  methodCandidates: readonly FamilySourceScopeCandidate[];
  methodCoexistences: readonly FamilyMethodCoexistence[];
  /** Cross-layer literal source comparison, not an approved family T8. */
  crossLayerMethodComparisons: readonly FamilyCrossLayerMethodComparison[];
  /** Sibling-only original clauses cannot be reused as parent/child meanings. */
  excludedSiblingSourceSurfaces: readonly R070ExcludedSiblingSource[];
  /** Unassigned R070 configuration source phrases, never selected family T8. */
  unassignedConfigurationInputs: readonly R070UnassignedConfigurationInput[];
  /** Existing branch_clash participants vs exact R070 parent/child pillar positions. */
  branchClashPillarObservations: readonly R070FamilyBranchClashPillarObservation[];
  /** Three original source layers at one Canonical pillar, never a combined T8. */
  pillarStarClashOverlaps: readonly R070FamilyPillarStarClashOverlap[];
  /** Distinct calculation facts cannot be multiplied by repeated source wording. */
  tripleLayerFactReuse: R070FamilyTripleLayerFactReuse;
  /** Original source boundaries and unresolved method/configuration selection. */
  interpretationBlockers: R070FamilyInterpretationBlockerHandoff;
  /** Research-only, menu-specific unavailable reasons, not product availability. */
  menuSupportHandoff: R070FamilyMenuSupportHandoff;
  /** R070-only transfer: Canonical gaps and non-executable method holds separated. */
  engineTransferBoundary: R070FamilyEngineTransferBoundary;
  missingPrerequisites: readonly string[];
  interpretationDisposition: 'INCONCLUSIVE';
  familyT8Admitted: false;
  researchOnly: true;
  mayGrantOfficialAuthority: false;
  mayMarkMenuAvailable: false;
  mayPersist: false;
  mayPublish: false;
  maySell: false;
}

const R070_TEN_GOD_OBSERVATION_GROUPS = Object.freeze({
  '父以偏財論': { label: '편재', values: ['편재'] },
  '母以印綬論': { label: '인성 계열', values: ['편인', '정인'] },
  '子嗣者即官星也': { label: '관성 계열', values: ['편관', '정관'] },
  '我生者為子': { label: '식상 계열', values: ['식신', '상관'] },
} as const);

const TEN_GOD_OBSERVATION_SLOTS: readonly PillarSlot[] =
  ['year', 'month', 'day', 'hour'];
const R070_FAMILY_STAR_SURFACES: readonly (keyof typeof R070_TEN_GOD_OBSERVATION_GROUPS)[] =
  ['父以偏財論', '母以印綬論', '子嗣者即官星也', '我生者為子'];

function tenGodSourceObservation(
  snapshot: CanonicalSajuSnapshot,
  sourceSurface: keyof typeof R070_TEN_GOD_OBSERVATION_GROUPS,
): FamilyTenGodSourceObservation {
  const group = R070_TEN_GOD_OBSERVATION_GROUPS[sourceSurface];
  const t5 = snapshot.derivedFacts.tenGods;
  const observedPositions: FamilyTenGodSourceObservation['observedPositions'][number][] = [];
  const unresolvedFactPaths: string[] = [];
  for (const slot of TEN_GOD_OBSERVATION_SLOTS) {
    for (const channel of ['stem', 'branch'] as const) {
      if (slot === 'day' && channel === 'stem') continue; // day master, not T5
      const path = 'derivedFacts.tenGods.' + slot + '.' + channel;
      const fact = t5.status === 'resolved' ? t5.value[slot][channel] : undefined;
      if (fact?.status !== 'resolved') {
        unresolvedFactPaths.push(path);
      } else if ((group.values as readonly string[]).includes(fact.value)) {
        observedPositions.push({ path, slot, channel, value: fact.value as TenGod });
      }
    }
  }
  return {
    sourceFactPath: 'derivedFacts.tenGods',
    sourceSurface,
    observedGroup: group.label,
    coverage: 'visible_stems_and_representative_branch_only',
    status: unresolvedFactPaths.length > 0 ? 'incomplete_input'
      : observedPositions.length > 0 ? 'observed' : 'not_observed_in_resolved_positions',
    observedPositions,
    unresolvedFactPaths,
    historicalRelativeRoleAuthorized: false,
  };
}

/**
 * An exact R070 family-star source owns its visible T5 lookup group, while
 * Canonical hiddenStems owns only branch-to-stem membership. Keep the two
 * fact surfaces separate; neither co-location nor identical stem spelling
 * can select a relative-role method or classify a hidden TenGod.
 */
function r070FamilyRelativeStarHiddenStemBoundary(
  snapshot: CanonicalSajuSnapshot,
  scope: FamilyResearchScope,
  definition: FamilySurfaceDefinition,
  originalSexScope: string,
  observation: FamilyTenGodSourceObservation,
): R070FamilyRelativeStarHiddenStemBoundary {
  if (definition.tenGodGroupSurface === undefined ||
      !R070_FAMILY_STAR_SURFACES.includes(definition.tenGodGroupSurface)) {
    throw new TypeError('R070 family hidden-stem bridge requires an existing star source.');
  }
  const sourceSurface = definition.tenGodGroupSurface;
  const layerId = definition.layerId;
  if (layerId !== 'TEN-GOD-FAMILY-RELATIONS' && layerId !== 'FEMALE-CHILD-RELATION') {
    throw new TypeError('R070 hidden-stem comparison cannot change family source ownership.');
  }
  const hidden = r070HiddenStemMembershipContrast(snapshot);
  const pillarObservations = hidden.pillarObservations.map(pillar => ({
    ...pillar,
    visibleT5Positions: observation.observedPositions.filter(
      position => position.slot === pillar.pillarSlot),
    unresolvedVisibleT5FactPaths: observation.unresolvedFactPaths.filter(path =>
      path.startsWith('derivedFacts.tenGods.' + pillar.pillarSlot + '.')),
  }));
  return {
    sourceLayerId: layerId,
    sourceSurface,
    requestedScope: scope,
    originalSexScope,
    historicalSex: snapshot.input.sexForTraditionalCalculation ?? 'unspecified',
    visibleT5FactPath: 'derivedFacts.tenGods',
    hiddenStemFactPath: 'derivedFacts.hiddenStems',
    observedModernT5Group: observation.observedGroup,
    visibleT5ObservationStatus: observation.status,
    hiddenStemMembershipCoverage: hidden.coverage,
    pillarObservations,
    unresolvedHiddenStemMembershipFactPaths: hidden.unresolvedMembershipFactPaths,
    missingPrerequisites: [
      'SECTION_SCOPED_STAR_RELATION_METHOD_NOT_SELECTED',
      'HIDDEN_VS_VISIBLE_STAR_HANDLING',
      'R070_FAMILY_STAR_HIDDEN_STEM_T5_CLASSIFICATION_NOT_ESTABLISHED',
      'R070_FAMILY_STAR_HIDDEN_STEM_RELATIVE_ROLE_METHOD_NOT_SOURCED',
      'HISTORICAL_TO_MODERN_FAMILY_TRANSLATION_NOT_ESTABLISHED',
      ...(observation.status === 'incomplete_input'
        ? ['TEN_GOD_CANONICAL_FACTS_NOT_FULLY_RESOLVED'] : []),
      ...(hidden.unresolvedMembershipFactPaths.length > 0
        ? ['CANONICAL_HIDDEN_STEM_MEMBERSHIP_PARTIAL_OR_UNAVAILABLE'] : []),
    ],
    hiddenStemTenGodClassificationAuthorized: false,
    visibleAndHiddenStarMethodReconciled: false,
    historicalRelativeRoleAuthorized: false,
    independentlyAdmittedFamilyClaims: 0,
    familyT8Admitted: false,
  };
}

interface FamilySurfaceDefinition {
  layerId: string;
  surface: string;
  scope: FamilyResearchScope;
  pillar?: PillarSlot;
  historicalSex?: 'male' | 'female';
  sourceContextRequired?: true;
  tenGodGroupSurface?: keyof typeof R070_TEN_GOD_OBSERVATION_GROUPS;
  missingCanonicalConcept?: string;
}

const FAMILY_SURFACES: readonly FamilySurfaceDefinition[] = Object.freeze([
  { layerId: 'PILLAR-DOMAIN-GENERAL', surface: '月為父母兄弟門戶', scope: 'parents', pillar: 'month' },
  { layerId: 'PILLAR-DOMAIN-MALE-ALTERNATE', surface: '年為父', scope: 'parents', pillar: 'year', historicalSex: 'male' },
  { layerId: 'PILLAR-DOMAIN-MALE-ALTERNATE', surface: '胎為母', scope: 'parents', historicalSex: 'male', missingCanonicalConcept: 'FETAL_PILLAR_NOT_DEFINED_BY_CANONICAL_SNAPSHOT' },
  { layerId: 'TEN-GOD-FAMILY-RELATIONS', surface: '父以偏財論', scope: 'parents', sourceContextRequired: true, tenGodGroupSurface: '父以偏財論' },
  { layerId: 'TEN-GOD-FAMILY-RELATIONS', surface: '母以印綬論', scope: 'parents', sourceContextRequired: true, tenGodGroupSurface: '母以印綬論' },
  { layerId: 'PILLAR-DOMAIN-GENERAL', surface: '時為子息', scope: 'children', pillar: 'hour' },
  { layerId: 'PILLAR-DOMAIN-MALE-ALTERNATE', surface: '時為子孫', scope: 'children', pillar: 'hour', historicalSex: 'male' },
  { layerId: 'TEN-GOD-FAMILY-RELATIONS', surface: '子嗣者即官星也', scope: 'children', sourceContextRequired: true, tenGodGroupSurface: '子嗣者即官星也' },
  { layerId: 'FEMALE-CHILD-RELATION', surface: '我生者為子', scope: 'children', historicalSex: 'female', sourceContextRequired: true, tenGodGroupSurface: '我生者為子' },
]);

function sourceLayer(definition: FamilySurfaceDefinition) {
  const layer = R070_CLAIM_LAYERS.find(record =>
    record.id === definition.layerId &&
    (record.sourceSurfaces as readonly string[]).includes(definition.surface),
  );
  if (layer === undefined || layer.executable !== false) {
    throw new TypeError('R070 source corpus no longer supports the exact bounded historical surface.');
  }
  return layer;
}

function evaluateFamilySurface(
  snapshot: CanonicalSajuSnapshot,
  definition: FamilySurfaceDefinition,
): FamilySourceScopeCandidate {
  const layer = sourceLayer(definition);
  const sex = snapshot.input.sexForTraditionalCalculation ?? 'unspecified';
  const base = {
    sourceLayerId: layer.id,
    sourceSurface: definition.surface,
    sourceLayer: layer.layer,
    originalSexScope: layer.sexScope,
    familyMeaningAuthorized: false as const,
  };
  if (definition.historicalSex !== undefined && definition.historicalSex !== sex) {
    return {
      ...base, disposition: 'NARROW_OR_REPLACE',
      missingPrerequisites: ['HISTORICAL_SEX_SCOPE_NOT_MATCHED_OR_NOT_SPECIFIED'],
    };
  }
  if (definition.missingCanonicalConcept !== undefined) {
    return {
      ...base, disposition: 'INCONCLUSIVE',
      missingPrerequisites: [definition.missingCanonicalConcept],
    };
  }
  if (definition.sourceContextRequired) {
    // R070's observed T5 family may help determine what is factually present,
    // but this cannot select a historical parent/child classification method.
    const tenGodObservation = definition.tenGodGroupSurface === undefined
      ? undefined : tenGodSourceObservation(snapshot, definition.tenGodGroupSurface);
    const relativeStarHiddenStemBoundary = tenGodObservation === undefined
      ? undefined : r070FamilyRelativeStarHiddenStemBoundary(
        snapshot, definition.scope, definition, layer.sexScope, tenGodObservation,
      );
    return {
      ...base, disposition: 'INCONCLUSIVE',
      ...(tenGodObservation === undefined ? {} : { tenGodObservation }),
      ...(relativeStarHiddenStemBoundary === undefined
        ? {} : { relativeStarHiddenStemBoundary }),
      missingPrerequisites: relativeStarHiddenStemBoundary?.missingPrerequisites ?? [
        'SECTION_SCOPED_STAR_RELATION_METHOD_NOT_SELECTED',
        'HIDDEN_VS_VISIBLE_STAR_HANDLING',
        'HISTORICAL_TO_MODERN_FAMILY_TRANSLATION_NOT_ESTABLISHED',
      ],
    };
  }
  if (definition.pillar === undefined) {
    throw new TypeError('R070 research surface lacks a bounded canonical observation.');
  }
  const fact = snapshot.pillars[definition.pillar];
  const observedFactPath = 'pillars.' + definition.pillar;
  if (fact.status !== 'resolved') {
    return {
      ...base, observedFactPath, disposition: 'INCONCLUSIVE',
      missingPrerequisites: ['CANONICAL_' + definition.pillar.toUpperCase() + '_PILLAR_UNRESOLVED'],
    };
  }
  return {
    ...base, observedFactPath, disposition: 'APPLICABLE_BOUNDED',
    observedPillar: fact.value.stem.value + fact.value.branch.value,
    missingPrerequisites: [],
  };
}

/**
 * Research-only selection of EXACT existing R070 historical wording against
 * a real individual's chart. Even APPLICABLE_BOUNDED licenses *only the
 * factual placement/quotation*, never a selected family T8 method.
 * The competing male-conditional and section-specific methods remain visible.
 */
export function evaluateFamilySourceScopeV1(
  snapshot: CanonicalSajuSnapshot,
  scope: FamilyResearchScope,
): FamilySourceScopeHandoff {
  if (scope !== 'parents' && scope !== 'children') {
    throw new TypeError('R070 source handoff requires the exact parents/children scope.');
  }
  if (R070_AUTHORITY.executableFamilyClassifierAuthorized !== false ||
      R070_AUTHORITY.productionAuthorityPromoted !== false ||
      !R070_REJECTED_SHORTCUTS.includes('FAMILY_STAR_PRESENCE_IMPLIES_FIXED_RELATIVE_OUTCOME')) {
    throw new TypeError('R070 source authority cannot be upgraded to a family outcome.');
  }
  const methodCandidates = FAMILY_SURFACES
    .filter(definition => definition.scope === scope)
    .map(definition => evaluateFamilySurface(snapshot, definition));
  const simultaneousMethods: readonly [string, string][] = scope === 'parents'
    ? [['月為父母兄弟門戶', '年為父']]
    : [['時為子息', '時為子孫']];
  const methodCoexistences: FamilyMethodCoexistence[] =
    simultaneousMethods.flatMap(sourceSurfaces => {
      const pair = sourceSurfaces.map(surface => methodCandidates.find(candidate =>
        candidate.sourceSurface === surface,
      ));
      if (pair.length !== 2 || pair.some(candidate =>
        candidate?.disposition !== 'APPLICABLE_BOUNDED')) return [];
      return [{
        sourceSurfaces,
        calculatedFactPaths: [...new Set(pair.flatMap(candidate =>
          candidate?.observedFactPath === undefined
            ? [] : [candidate.observedFactPath],
        ))],
        state: 'COEXISTING_NOT_RECONCILED' as const,
        methodSelectionAuthorized: false as const,
        missingPrerequisites: [
          'FAMILY_METHOD_SELECTION',
          'PILLAR_DOMAIN_VS_STAR_RELATION_RECONCILIATION',
        ] as const,
      }];
    });
  // Compare existing source layers only if both original methods are in
  // scope and the Canonical pillar was actually resolved. A modern T5
  // search hit is never independent corroboration of a parent/child outcome.
  const crossLayerSourcePairs: readonly (readonly [string, string])[] =
    scope === 'parents'
      ? [
          ['月為父母兄弟門戶', '父以偏財論'],
          ['月為父母兄弟門戶', '母以印綬論'],
          ['年為父', '父以偏財論'],
        ]
      : [
          ['時為子息', '子嗣者即官星也'],
          ['時為子息', '我生者為子'],
          ['時為子孫', '子嗣者即官星也'],
        ];
  const crossLayerMethodComparisons: FamilyCrossLayerMethodComparison[] =
    crossLayerSourcePairs.flatMap(sourceSurfaces => {
      const pillar = methodCandidates.find(candidate =>
        candidate.sourceSurface === sourceSurfaces[0]);
      const star = methodCandidates.find(candidate =>
        candidate.sourceSurface === sourceSurfaces[1]);
      if (pillar?.disposition !== 'APPLICABLE_BOUNDED' ||
          pillar.observedFactPath === undefined ||
          pillar.observedPillar === undefined ||
          star?.disposition !== 'INCONCLUSIVE' ||
          star.tenGodObservation === undefined) return [];
      const observation = star.tenGodObservation;
      const contrast = compareR070PillarStarPositions(pillar.observedFactPath, observation);
      return [{
        sourceSurfaces: [sourceSurfaces[0], sourceSurfaces[1]] as const,
        sourceLayerIds: [pillar.sourceLayerId, star.sourceLayerId] as const,
        pillarObservation: {
          factPath: pillar.observedFactPath,
          observedPillar: pillar.observedPillar,
        },
        starObservation: observation,
        starPillarPositionContrast: contrast,
        state: 'PILLAR_AND_STAR_METHODS_NOT_RECONCILED' as const,
        independentlyAdmittedFamilyClaims: 0 as const,
        methodSelectionAuthorized: false as const,
        familyMeaningAuthorized: false as const,
        missingPrerequisites: [
          'FAMILY_METHOD_SELECTION',
          'PILLAR_DOMAIN_VS_STAR_RELATION_RECONCILIATION',
          'SECTION_SCOPED_STAR_RELATION_METHOD_NOT_SELECTED',
          'HIDDEN_VS_VISIBLE_STAR_HANDLING',
          'HISTORICAL_TO_MODERN_FAMILY_TRANSLATION_NOT_ESTABLISHED',
          'R070_PILLAR_STAR_LOCATION_SYNTHESIS_RULE_NOT_SOURCED',
          ...(contrast.state === 'STAR_OBSERVED_ONLY_OUTSIDE_REFERENCED_PILLAR'
            ? ['R070_OUTSIDE_PILLAR_T5_IS_NOT_NEGATIVE_FAMILY_EVIDENCE'] : []),
          ...(contrast.state === 'STAR_NOT_OBSERVED_IN_RESOLVED_T5_SURFACE'
            ? ['R070_UNOBSERVED_T5_IS_NOT_RELATIVE_ABSENCE'] : []),
          ...(contrast.state === 'REFERENCED_PILLAR_T5_UNRESOLVED'
            ? ['R070_REFERENCED_PILLAR_T5_POSITION_UNRESOLVED'] : []),
          ...(observation.status === 'incomplete_input'
            ? ['TEN_GOD_CANONICAL_FACTS_NOT_FULLY_RESOLVED'] : []),
          ...(observation.status === 'not_observed_in_resolved_positions'
            ? ['T5_STAR_NOT_OBSERVED_IN_VISIBLE_FACTS_IS_NOT_RELATIVE_ABSENCE'] : []),
        ],
      }];
    });
  const branchClashPillarObservations =
    r070FamilyBranchClashPillarObservations(snapshot, scope, methodCandidates);
  const pillarStarClashOverlaps = r070FamilyPillarStarClashOverlaps(
    scope, crossLayerMethodComparisons, branchClashPillarObservations,
  );
  const tripleLayerFactReuse = r070FamilyTripleLayerFactReuse(pillarStarClashOverlaps);
  const unassignedConfigurationInputs = r070UnassignedConfigurationInputs(snapshot);
  const historicalSex = snapshot.input.sexForTraditionalCalculation ?? 'unspecified';
  const interpretationBlockers = r070FamilyInterpretationBlockerHandoff(
    scope, historicalSex, methodCandidates, methodCoexistences,
    crossLayerMethodComparisons, unassignedConfigurationInputs,
  );
  const menuSupportHandoff = r070FamilyMenuSupportHandoff(interpretationBlockers);
  const engineTransferBoundary = r070FamilyEngineTransferBoundary(snapshot, menuSupportHandoff);
  const missingPrerequisites = [
    ...R070_EXECUTION_GAPS,
    ...new Set([
      ...methodCandidates.flatMap(candidate => candidate.missingPrerequisites),
      ...crossLayerMethodComparisons.flatMap(comparison => comparison.missingPrerequisites),
      ...branchClashPillarObservations.flatMap(item => item.missingPrerequisites),
      ...pillarStarClashOverlaps.flatMap(item => item.missingPrerequisites),
      ...unassignedConfigurationInputs.flatMap(item => item.missingPrerequisites),
      ...interpretationBlockers.missingPrerequisites,
      ...menuSupportHandoff.missingPrerequisites,
    ]),
  ];
  return {
    version: FAMILY_PAIR_SOURCE_SCOPE_HANDOFF_VERSION,
    owner: 'R070', corpusVersion: R070_FAMILY_DOMAIN_CLAIM_CORPUS_VERSION,
    scope, snapshotId: snapshot.snapshotId, calculationHash: snapshot.calculationHash,
    historicalSex,
    methodCandidates, methodCoexistences, crossLayerMethodComparisons,
    excludedSiblingSourceSurfaces: excludedSiblingSources(scope),
    unassignedConfigurationInputs,
    branchClashPillarObservations, pillarStarClashOverlaps,
    tripleLayerFactReuse, interpretationBlockers, menuSupportHandoff,
    engineTransferBoundary, missingPrerequisites,
    interpretationDisposition: 'INCONCLUSIVE',
    familyT8Admitted: false, researchOnly: true,
    mayGrantOfficialAuthority: false, mayMarkMenuAvailable: false,
    mayPersist: false, mayPublish: false, maySell: false,
  };
}

/**
 * R070-only engine ingress: a research handoff can be consumed only for its
 * exact menu and original Canonical calculation. Never silently recycle a
 * parent's observation for children or another person's snapshot.
 */
export function selectR070FamilyResearchTransferForContext(
  report: FamilySourceScopeHandoff,
  expected: Readonly<{
    scope: FamilyResearchScope;
    snapshotId: string;
    calculationHash: string;
  }>,
): R070FamilyEngineTransferBoundary {
  const transfer = report.engineTransferBoundary;
  if (report.version !== FAMILY_PAIR_SOURCE_SCOPE_HANDOFF_VERSION ||
      report.owner !== 'R070' ||
      report.scope !== expected.scope ||
      report.snapshotId !== expected.snapshotId ||
      report.calculationHash !== expected.calculationHash ||
      transfer.route !== 'R070_RESEARCH_ONLY_NOT_EXECUTABLE' ||
      transfer.requestedScope !== expected.scope ||
      transfer.sourceSnapshotId !== expected.snapshotId ||
      transfer.sourceCalculationHash !== expected.calculationHash ||
      report.researchOnly !== true ||
      report.familyT8Admitted !== false ||
      report.mayGrantOfficialAuthority !== false ||
      report.mayMarkMenuAvailable !== false ||
      report.mayPersist !== false ||
      report.mayPublish !== false ||
      report.maySell !== false ||
      transfer.canSelectHistoricalMethod !== false ||
      transfer.canGrantFamilyT8Authority !== false ||
      transfer.canEnableMenu !== false ||
      transfer.canPublishOrSell !== false) {
    throw new TypeError('R070 family research handoff does not match the requested Canonical context or authority boundary.');
  }
  return transfer;
}

/**
 * Korean, deterministic research-only explanation of why an R070 family
 * reading cannot be supplied. This is not a family interpretation narrative
 * and may not be forwarded as an Official Reading or product availability.
 */
export interface R070FamilyResearchUnavailableExplanationKo {
  locale: 'ko';
  scope: FamilyResearchScope;
  snapshotId: string;
  calculationHash: string;
  availability: 'unsupported';
  heading: string;
  /** Human-readable status, not a T8 claim about any real relative. */
  explanation: string;
  /** Only Canonical facts that are actually unresolved can cause this notice. */
  inputNotices: readonly string[];
  /** No input supplied later can itself select a historical family method. */
  methodNotice: string;
  authorityNotice: string;
  /** A precise, research-only pointer to the input and authority explanation. */
  unresolvedCanonicalFactPaths: readonly string[];
  missingCanonicalConceptSourceSurfaces: readonly string[];
  /** Original-source-level Korean reasons, preserving their exact calculation paths. */
  sourceReasons: readonly {
    reasonCode: R070FamilyMenuUnsupportedReason['reasonCode'];
    category: R070FamilyMenuUnsupportedReason['category'];
    sourceSurfaces: readonly string[];
    observedFactPaths: readonly string[];
    unresolvedFactPaths: readonly string[];
    missingPrerequisites: readonly string[];
    koreanExplanation: string;
  }[];
  readingMeaningAdmitted: false;
  officialReadingAuthorized: false;
  productMenuCanBeEnabled: false;
  mayPersist: false;
  mayPublish: false;
  maySell: false;
}

/**
 * Produces an actual Korean unsupported-state paragraph rather than asking a
 * Consumer/Reader to invent what missing Canonical facts or sources mean.
 * The existing scope/hash/snapshot guard must pass before any text is built.
 */
export function explainR070FamilyResearchUnavailabilityKo(
  report: FamilySourceScopeHandoff,
  expected: Readonly<{
    scope: FamilyResearchScope;
    snapshotId: string;
    calculationHash: string;
  }>,
): R070FamilyResearchUnavailableExplanationKo {
  const transfer = selectR070FamilyResearchTransferForContext(report, expected);
  const unresolved = transfer.unresolvedCanonicalInputs;
  const inputNotices: string[] = [];
  if (unresolved.some(item => item.canonicalInputKind === 'pillar')) {
    inputNotices.push(
      '일부 명식의 기둥이 확정되지 않았습니다. 출생시각 등 해당 계산 입력을 확인해도 가족 해석 방법이 자동으로 승인되지는 않습니다.',
    );
  }
  if (unresolved.some(item => item.canonicalInputKind === 'visible_t5')) {
    inputNotices.push(
      '십신 조회에 필요한 계산값 중 확정되지 않은 위치가 있습니다. 확인되지 않은 값을 가족 구성원의 유무나 상태로 해석할 수 없습니다.',
    );
  }
  if (unresolved.some(item => item.canonicalInputKind === 'hidden_stem_membership')) {
    inputNotices.push(
      '일부 지장간 소속 정보가 확정되지 않았으며, 지장간을 부모·자녀 역할로 해석하는 규칙도 승인되지 않았습니다.',
    );
  }
  const missingCanonicalConceptSourceSurfaces = transfer.canonicalInputAndConceptHolds
    .filter(item => item.reasonCode === 'R070_MENU_CANONICAL_CONCEPT_NOT_AVAILABLE')
    .flatMap(item => item.sourceSurfaces);
  if (missingCanonicalConceptSourceSurfaces.includes('胎為母')) {
    inputNotices.push(
      '일부 역사적 부모 원문은 태(胎)를 참조하지만 현행 Canonical 명식에는 태주 계산 사실이 정의되지 않았습니다.',
    );
  }
  const topic = expected.scope === 'parents' ? '부모' : '자녀';
  const heading = topic + ' 풀이를 아직 제공할 수 없습니다.';
  const methodNotice = topic +
    '에 관한 역사적 기둥 배속과 십신 배속의 선택·조정 근거가 아직 확립되지 않았습니다.';
  const authorityNotice =
    '현재 공식 가족 T8 해석 권한이 없어 계산 입력을 모두 채우더라도 가족운 결론을 발행할 수 없습니다.';
  if (transfer.officialAuthorityHold.reasonCode !==
      'R070_MENU_OFFICIAL_FAMILY_T8_NOT_ADMITTED') {
    throw new TypeError('R070 Korean research explanation requires the official family hold.');
  }
  return {
    locale: 'ko',
    scope: expected.scope,
    snapshotId: expected.snapshotId,
    calculationHash: expected.calculationHash,
    availability: 'unsupported',
    heading,
    explanation: [heading, ...inputNotices, methodNotice, authorityNotice].join(' '),
    inputNotices,
    methodNotice,
    authorityNotice,
    unresolvedCanonicalFactPaths: unresolved.map(item => item.factPath),
    missingCanonicalConceptSourceSurfaces: [...new Set(missingCanonicalConceptSourceSurfaces)],
    sourceReasons: report.menuSupportHandoff.unsupportedReasons.map(reason => ({
      reasonCode: reason.reasonCode,
      category: reason.category,
      sourceSurfaces: reason.sourceSurfaces,
      observedFactPaths: reason.observedFactPaths,
      unresolvedFactPaths: reason.unresolvedFactPaths,
      missingPrerequisites: reason.missingPrerequisites,
      koreanExplanation: r070KoreanFamilyUnavailabilityDetail(expected.scope, reason),
    })),
    readingMeaningAdmitted: false,
    officialReadingAuthorized: false,
    productMenuCanBeEnabled: false,
    mayPersist: false,
    mayPublish: false,
    maySell: false,
  };
}

function r070KoreanFamilyUnavailabilityDetail(
  scope: FamilyResearchScope,
  reason: R070FamilyMenuUnsupportedReason,
): string {
  const subject = scope === 'parents' ? '부모' : '자녀';
  const quoted = reason.sourceSurfaces.map(surface => '「' + surface + '」').join('·');
  switch (reason.reasonCode) {
    case 'R070_MENU_OFFICIAL_FAMILY_T8_NOT_ADMITTED':
      return subject + ' 풀이에 사용할 공식 가족 T8 해석 방법론이 아직 승인되지 않았습니다.';
    case 'R070_MENU_PILLAR_POSITION_NOT_FAMILY_INTERPRETATION':
      return quoted + '의 기둥 위치는 계산되지만 이를 ' + subject +
        '의 상태·사건으로 해석할 규칙은 승인되지 않았습니다.';
    case 'R070_MENU_SOURCE_CONTEXT_METHOD_NOT_SELECTED':
      return quoted + '의 현대 십신 계산값을 관찰하더라도 역사적 ' + subject +
        ' 역할 배속의 방법과 적용 문맥은 확정되지 않았습니다.' +
        (reason.unresolvedFactPaths.length > 0
          ? ' 미확정 계산 경로: ' + reason.unresolvedFactPaths.join(', ') + '.' : '');
    case 'R070_MENU_CANONICAL_REFERENCE_INPUT_UNRESOLVED':
      return quoted + '에 필요한 기둥 계산 입력이 미확정입니다. 미확정 경로: ' +
        reason.unresolvedFactPaths.join(', ') + '.';
    case 'R070_MENU_CANONICAL_CONCEPT_NOT_AVAILABLE':
      return quoted + '에서 요구하는 계산 개념이 현재 Canonical 명식에 정의되지 않았습니다.';
    case 'R070_MENU_HISTORICAL_METHODS_NOT_RECONCILED':
      return quoted + '에 나타난 ' + subject +
        ' 관련 역사적 방법의 선택·조정 규칙이 아직 확정되지 않았습니다.';
  }
}

export interface R069SingleChartScopeObservation {
  personRole: 'subject' | 'target';
  originalHistoricalSexScope: string;
  historicalScopeMatch: 'matched' | 'mismatched' | 'unspecified';
  disposition: 'BOUNDED_FACT_OBSERVED' | 'INCONCLUSIVE' | 'NARROW_OR_REPLACE';
  observedFactPaths: readonly string[];
  observedDayPillar?: string;
  observedTenGodPositions: readonly {
    path: string;
    slot: PillarSlot;
    channel: 'stem' | 'branch';
    value: TenGod;
  }[];
  missingPrerequisites: readonly string[];
  /** Neither a one-person spouse prediction nor a T10 relation is admitted. */
  oneChartSpouseMeaningAuthorized: false;
  pairwiseMeaningAuthorized: false;
}

/**
 * Match a historical R069 one-chart passage against each person's actual
 * chart separately. The unapproved spouse-star method is never selected.
 * The T5 observations are only existing Canonical categories and paths.
 */
function observeR069SingleChartScope(
  snapshot: CanonicalSajuSnapshot,
  personRole: 'subject' | 'target',
  claim: typeof R069_DIRECT_CLAIMS[number],
): R069SingleChartScopeObservation {
  const actualSex = snapshot.input.sexForTraditionalCalculation ?? 'unspecified';
  // New or unrecognized original gender/claim conventions cannot silently
  // inherit the female rule from this historic R069 candidate set.
  if (claim.historicalSexScope !== 'MALE_CHART' &&
      claim.historicalSexScope !== 'FEMALE_CHART') {
    throw new TypeError('R069 historical gender surface is not an admitted scope.');
  }
  const expectedSex = claim.historicalSexScope === 'MALE_CHART'
    ? 'male' : 'female';
  const historicalScopeMatch = actualSex === 'unspecified'
    ? 'unspecified' as const
    : actualSex === expectedSex ? 'matched' as const : 'mismatched' as const;
  const base = {
    personRole,
    originalHistoricalSexScope: claim.historicalSexScope,
    historicalScopeMatch,
    oneChartSpouseMeaningAuthorized: false as const,
    pairwiseMeaningAuthorized: false as const,
  };
  if (historicalScopeMatch !== 'matched') {
    return {
      ...base, disposition: 'NARROW_OR_REPLACE',
      observedFactPaths: [], observedTenGodPositions: [],
      missingPrerequisites: ['R069_HISTORICAL_SEX_SCOPE_NOT_MATCHED'],
    };
  }
  const contextLimitations = [
    'SPOUSE_STAR_CONTEXT_SETTLEMENT',
    'MODERN_PARTNER_TRANSLATION',
    'PAIRWISE_COMPATIBILITY_BRIDGE',
  ];
  if (claim.claimType === 'DAY_DOMAIN') {
    const pillar = snapshot.pillars.day;
    return pillar.status === 'resolved'
      ? {
          ...base, disposition: 'BOUNDED_FACT_OBSERVED',
          observedFactPaths: ['pillars.day'],
          observedDayPillar: pillar.value.stem.value + pillar.value.branch.value,
          observedTenGodPositions: [],
          missingPrerequisites: contextLimitations,
        }
      : {
          ...base, disposition: 'INCONCLUSIVE',
          observedFactPaths: [], observedTenGodPositions: [],
          missingPrerequisites: ['R069_DAY_PILLAR_NOT_RESOLVED', ...contextLimitations],
        };
  }
  if (claim.claimType !== 'SPOUSE_STAR_RELATION') {
    return {
      ...base, disposition: 'INCONCLUSIVE',
      observedFactPaths: [], observedTenGodPositions: [],
      missingPrerequisites: [
        'R069_CONFIGURATION_METHOD_NOT_ESTABLISHED',
        'CONFIGURATION_OUTCOME_SETTLEMENT',
        ...contextLimitations,
      ],
    };
  }
  if (claim.id !== 'MALE-I-CONTROL-WIFE' &&
      claim.id !== 'FEMALE-CONTROLS-ME-HUSBAND') {
    throw new TypeError('R069 spouse-star input method has not been established for this source.');
  }
  const allowed: readonly TenGod[] = claim.id === 'MALE-I-CONTROL-WIFE'
    ? ['편재', '정재'] : ['편관', '정관'];
  const chart = snapshot.derivedFacts.tenGods;
  const observedTenGodPositions: R069SingleChartScopeObservation['observedTenGodPositions'][number][] = [];
  const unresolved: string[] = [];
  for (const slot of TEN_GOD_OBSERVATION_SLOTS) {
    for (const channel of ['stem', 'branch'] as const) {
      if (slot === 'day' && channel === 'stem') continue;
      const fact = chart.status === 'resolved' ? chart.value[slot][channel] : undefined;
      const path = 'derivedFacts.tenGods.' + slot + '.' + channel;
      if (fact?.status !== 'resolved') {
        unresolved.push(path);
      } else if ((allowed as readonly string[]).includes(fact.value)) {
        observedTenGodPositions.push({ path, slot, channel, value: fact.value as TenGod });
      }
    }
  }
  return {
    ...base,
    disposition: observedTenGodPositions.length > 0 && unresolved.length === 0
      ? 'BOUNDED_FACT_OBSERVED' : 'INCONCLUSIVE',
    observedFactPaths: observedTenGodPositions.map(position => position.path),
    observedTenGodPositions,
    missingPrerequisites: [
      ...contextLimitations,
      ...(unresolved.length ? ['R069_TEN_GOD_INPUT_PARTIAL'] : []),
      ...(!observedTenGodPositions.length ? ['R069_STAR_NOT_OBSERVED_IN_VISIBLE_FACTS'] : []),
    ],
  };
}

export interface R068NatalStructureObservation {
  personRole: 'subject' | 'target';
  sourceFactPath: 'derivedFacts.structuralRelations';
  calculationState: 'resolved' | 'incomplete';
  observedCombinationCandidates: readonly {
    relationId: string;
    kind: 'branch_six_combination' | 'branch_three_combination';
    sourceIds: readonly string[];
  }[];
  /** Within-chart relation IDs cannot imply a cross-person relationship. */
  socialOutcomeAuthorized: false;
  pairwiseMeaningAuthorized: false;
}

function observeR068NatalStructure(
  snapshot: CanonicalSajuSnapshot,
  personRole: 'subject' | 'target',
): R068NatalStructureObservation {
  const structural = snapshot.derivedFacts.structuralRelations;
  const candidates = structural?.status === 'resolved'
    ? structural.value.filter(candidate =>
      candidate.kind === 'branch_six_combination' ||
      candidate.kind === 'branch_three_combination',
    ).map(candidate => ({
      relationId: candidate.relationId,
      kind: candidate.kind as 'branch_six_combination' | 'branch_three_combination',
      sourceIds: candidate.sourceIds,
    }))
    : [];
  return {
    personRole,
    sourceFactPath: 'derivedFacts.structuralRelations',
    calculationState: structural?.status === 'resolved' ? 'resolved' : 'incomplete',
    observedCombinationCandidates: candidates,
    socialOutcomeAuthorized: false,
    pairwiseMeaningAuthorized: false,
  };
}

export interface R068KinTermObservation {
  exactHistoricalTerm: '傷官' | '七煞';
  /** Search label in modern T5, not approval of historical method equivalence. */
  canonicalSearchCategory: '상관' | '편관';
  observedPositions: readonly {
    path: string;
    slot: PillarSlot;
    channel: 'stem' | 'branch';
    value: TenGod;
  }[];
  unresolvedFactPaths: readonly string[];
  observationCoverage: 'visible_stems_and_representative_branch_only';
}

export interface R068KinConditionalObservation {
  personRole: 'subject' | 'target';
  originalClaimId: 'KIN-FRIEND-BOND-HARM-CONFIGURATION';
  sourceFactPath: 'derivedFacts.tenGods';
  terms: readonly [R068KinTermObservation, R068KinTermObservation];
  /** 羊刃 is not available as a governed executable Canonical fact. */
  yangrenInput: 'not_defined_by_canonical';
  conjunctionOfTermsEstablished: false;
  historicalKinFriendContextEstablished: false;
  natalKinOutcomeAuthorized: false;
  pairwiseMeaningAuthorized: false;
  missingPrerequisites: readonly string[];
}

/**
 * R068 supplies a three-part historical condition.  Only the existing modern
 * chart's 상관/편관 search categories can be inspected. 羊刃 and its
 * contextual conjunction cannot be computed or inferred from their presence.
 */
function observeR068KinConditional(
  snapshot: CanonicalSajuSnapshot,
  personRole: 'subject' | 'target',
): R068KinConditionalObservation {
  const t5 = snapshot.derivedFacts.tenGods;
  const observeTerm = (
    exactHistoricalTerm: R068KinTermObservation['exactHistoricalTerm'],
    canonicalSearchCategory: R068KinTermObservation['canonicalSearchCategory'],
  ): R068KinTermObservation => {
    const observedPositions: R068KinTermObservation['observedPositions'][number][] = [];
    const unresolvedFactPaths: string[] = [];
    for (const slot of TEN_GOD_OBSERVATION_SLOTS) {
      for (const channel of ['stem', 'branch'] as const) {
        // Day stem is the day master, never an ordinary Ten-God category.
        if (slot === 'day' && channel === 'stem') continue;
        const path = 'derivedFacts.tenGods.' + slot + '.' + channel;
        const fact = t5.status === 'resolved' ? t5.value[slot][channel] : undefined;
        if (fact?.status !== 'resolved') {
          unresolvedFactPaths.push(path);
        } else if (fact.value === canonicalSearchCategory) {
          observedPositions.push({ path, slot, channel, value: fact.value });
        }
      }
    }
    return {
      exactHistoricalTerm,
      canonicalSearchCategory,
      observedPositions,
      unresolvedFactPaths,
      observationCoverage: 'visible_stems_and_representative_branch_only',
    };
  };
  const terms: readonly [R068KinTermObservation, R068KinTermObservation] = [
    observeTerm('傷官', '상관'),
    observeTerm('七煞', '편관'),
  ];
  return {
    personRole,
    originalClaimId: 'KIN-FRIEND-BOND-HARM-CONFIGURATION',
    sourceFactPath: 'derivedFacts.tenGods',
    terms,
    yangrenInput: 'not_defined_by_canonical',
    conjunctionOfTermsEstablished: false,
    historicalKinFriendContextEstablished: false,
    natalKinOutcomeAuthorized: false,
    pairwiseMeaningAuthorized: false,
    missingPrerequisites: [
      'YANGREN_CANONICAL_INPUT_NOT_DEFINED',
      'R068_THREE_TERM_CONJUNCTION_METHOD_NOT_SELECTED',
      'KIN_FRIEND_CONTEXT_AND_POLARITY_NOT_SETTLED',
      'SOCIAL_VS_KIN_SCOPE',
      ...(terms.some(term => term.unresolvedFactPaths.length > 0)
        ? ['R068_TEN_GOD_OBSERVATIONS_PARTIAL'] : []),
    ],
  };
}

export interface PairwiseCanonicalObservation {
  pillarSlot: PillarSlot;
  subjectFactPath: string;
  targetFactPath: string;
  status: 'both_resolved' | 'incomplete';
  subjectPillar?: string;
  targetPillar?: string;
  exactPillarIdentity?: 'same' | 'different';
  /** Value equality is never a relationship, affinity or T10 claim. */
  pairwiseMeaningAuthorized: false;
}

const PILLAR_SLOTS: readonly PillarSlot[] = ['year', 'month', 'day', 'hour'];

function observePair(
  subject: CanonicalSajuSnapshot,
  target: CanonicalSajuSnapshot,
): readonly PairwiseCanonicalObservation[] {
  return PILLAR_SLOTS.map(pillarSlot => {
    const left = subject.pillars[pillarSlot];
    const right = target.pillars[pillarSlot];
    const base = {
      pillarSlot,
      subjectFactPath: 'subject.pillars.' + pillarSlot,
      targetFactPath: 'target.pillars.' + pillarSlot,
      pairwiseMeaningAuthorized: false as const,
    };
    if (left.status !== 'resolved' || right.status !== 'resolved') {
      return { ...base, status: 'incomplete' as const };
    }
    const subjectPillar = left.value.stem.value + left.value.branch.value;
    const targetPillar = right.value.stem.value + right.value.branch.value;
    return {
      ...base,
      status: 'both_resolved' as const,
      subjectPillar, targetPillar,
      exactPillarIdentity: subjectPillar === targetPillar
        ? 'same' as const : 'different' as const,
    };
  });
}

export interface PairwiseSourceScopeHandoff {
  version: typeof FAMILY_PAIR_SOURCE_SCOPE_HANDOFF_VERSION;
  owner: 'R068_R069';
  sourceVersions: readonly [
    typeof R068_RELATIONSHIP_CLAIM_CORPUS_VERSION,
    typeof R069_SPOUSE_CLAIM_CORPUS_VERSION,
  ];
  subject: {
    personRef: string; snapshotId: string; calculationHash: string;
    birthTimeKnown: boolean;
    originalScenarioIds: readonly string[];
    ambiguousFactPaths: readonly string[];
    unavailableFactPaths: readonly string[];
  };
  target: {
    personRef: string; snapshotId: string; calculationHash: string;
    birthTimeKnown: boolean;
    originalScenarioIds: readonly string[];
    ambiguousFactPaths: readonly string[];
    unavailableFactPaths: readonly string[];
  };
  factualPairObservations: readonly PairwiseCanonicalObservation[];
  comparedSourceSurfaces: readonly {
    corpusId: 'R068' | 'R069';
    originalClaimId: string;
    sourceSurface: string;
    originalDomain: string;
    historicalSexScope?: string;
    /** Existing internal combination candidates per person, not cross-chart. */
    singleChartCombinationObservations?: readonly [
      R068NatalStructureObservation, R068NatalStructureObservation,
    ];
    /** R068 three-term kin/friend clause; modern natal T5 observations only. */
    singleChartKinConditionObservations?: readonly [
      R068KinConditionalObservation, R068KinConditionalObservation,
    ];
    oneChartScopeObservations?: readonly [
      R069SingleChartScopeObservation, R069SingleChartScopeObservation,
    ];
    /** Existing corpus prerequisites; not permissions or newly sourced T10 rules. */
    missingPrerequisites: readonly string[];
    disposition: 'NARROW_OR_REPLACE' | 'REJECTED';
    eligiblePairwiseClaim: false;
  }[];
  missingPrerequisites: readonly string[];
  pairwiseT10Admitted: false;
  pairwiseDisposition: 'INCONCLUSIVE';
  researchOnly: true;
  mayGrantOfficialAuthority: false;
  mayMarkMenuAvailable: false;
  mayPersist: false;
  mayPublish: false;
  maySell: false;
}

/**
 * An actual two-chart input is useful for pinpointing which T10 prerequisites
 * are absent, but NEVER turns social/kin R068 or historical one-chart spouse
 * R069 surfaces into a cross-person meaning or an Official compatibility rule.
 */
export function evaluatePairwiseSourceScopeV1(
  subject: { personRef: string; snapshot: CanonicalSajuSnapshot },
  target: { personRef: string; snapshot: CanonicalSajuSnapshot },
): PairwiseSourceScopeHandoff {
  const subjectRef = subject.personRef.trim();
  const targetRef = target.personRef.trim();
  if (!subjectRef || !targetRef || subjectRef === targetRef) {
    throw new TypeError('T10 research requires two different nonblank person references.');
  }
  if (subject.snapshot.policy.policyId !== target.snapshot.policy.policyId ||
      subject.snapshot.policy.policyVersion !== target.snapshot.policy.policyVersion ||
      !subject.snapshot.snapshotId || !target.snapshot.snapshotId ||
      !subject.snapshot.calculationHash || !target.snapshot.calculationHash) {
    throw new TypeError('T10 research requires comparable governed Canonical calculations.');
  }
  if (R068_AUTHORITY.romanceCompatibilityMappingAuthorized !== false ||
      R068_AUTHORITY.productionAuthorityPromoted !== false ||
      R069_AUTHORITY.productionAuthorityPromoted !== false ||
      R068_DIRECT_CLAIMS.some(claim => claim.executable !== false) ||
      R069_DIRECT_CLAIMS.some(claim => claim.executable !== false) ||
      R069_AUTHORITY.universalModernPartnerOntologyAuthorized !== false ||
      !R068_REJECTED_ROMANCE_MAPPINGS.includes('ONE_RELATION_EQUALS_COMPATIBILITY_SCORE') ||
      !R069_REJECTED_SHORTCUTS.includes('NATAL_SPOUSE_CLAIM_IMPLIES_PAIRWISE_COMPATIBILITY')) {
    throw new TypeError('R068/R069 historical source authority must not become T10.');
  }
  const comparedSourceSurfaces = [
    ...R068_DIRECT_CLAIMS.map(claim => ({
      corpusId: 'R068' as const, originalClaimId: claim.id,
      sourceSurface: claim.sourceSurface,
      originalDomain: claim.domain, disposition: 'NARROW_OR_REPLACE' as const,
      ...(claim.id === 'SOCIAL-FRIENDLINESS-SANHE-LIUHE' ||
          claim.id === 'COMBINATION-CONTEXT-VARIANCE'
        ? {
            singleChartCombinationObservations: [
              observeR068NatalStructure(subject.snapshot, 'subject'),
              observeR068NatalStructure(target.snapshot, 'target'),
            ] as const,
          } : {}),
      ...(claim.id === 'KIN-FRIEND-BOND-HARM-CONFIGURATION'
        ? {
            singleChartKinConditionObservations: [
              observeR068KinConditional(subject.snapshot, 'subject'),
              observeR068KinConditional(target.snapshot, 'target'),
            ] as const,
          } : {}),
      missingPrerequisites: [
        'SOCIAL_VS_KIN_SCOPE',
        'ROMANCE_TRANSFER_EVIDENCE',
        ...(claim.id === 'COMBINATION-CONTEXT-VARIANCE'
          ? ['CONTEXT_EFFECT_SETTLEMENT', 'MULTI_RELATION_CONFLICT'] : []),
      ],
      eligiblePairwiseClaim: false as const,
    })),
    ...R069_DIRECT_CLAIMS.map(claim => ({
      corpusId: 'R069' as const, originalClaimId: claim.id,
      sourceSurface: claim.sourceSurface,
      originalDomain: claim.claimType,
      historicalSexScope: claim.historicalSexScope,
      oneChartScopeObservations: [
        observeR069SingleChartScope(subject.snapshot, 'subject', claim),
        observeR069SingleChartScope(target.snapshot, 'target', claim),
      ] as const,
      missingPrerequisites: [
        'HISTORICAL_GENDER_SCOPE',
        'MODERN_PARTNER_TRANSLATION',
        'PAIRWISE_COMPATIBILITY_BRIDGE',
        ...(claim.claimType === 'CONFIGURATION_LEVEL'
          ? ['SPOUSE_STAR_CONTEXT_SETTLEMENT'] : []),
      ],
      disposition: 'REJECTED' as const,
      eligiblePairwiseClaim: false as const,
    })),
  ];
  return {
    version: FAMILY_PAIR_SOURCE_SCOPE_HANDOFF_VERSION,
    owner: 'R068_R069',
    sourceVersions: [R068_RELATIONSHIP_CLAIM_CORPUS_VERSION, R069_SPOUSE_CLAIM_CORPUS_VERSION],
    subject: {
      personRef: subjectRef, snapshotId: subject.snapshot.snapshotId,
      calculationHash: subject.snapshot.calculationHash,
      birthTimeKnown: subject.snapshot.completeness.birthTimeKnown,
      originalScenarioIds: subject.snapshot.scenarios.map(scenario => scenario.scenarioId),
      ambiguousFactPaths: subject.snapshot.completeness.ambiguousPaths,
      unavailableFactPaths: subject.snapshot.completeness.unavailablePaths,
    },
    target: {
      personRef: targetRef, snapshotId: target.snapshot.snapshotId,
      calculationHash: target.snapshot.calculationHash,
      birthTimeKnown: target.snapshot.completeness.birthTimeKnown,
      originalScenarioIds: target.snapshot.scenarios.map(scenario => scenario.scenarioId),
      ambiguousFactPaths: target.snapshot.completeness.ambiguousPaths,
      unavailableFactPaths: target.snapshot.completeness.unavailablePaths,
    },
    factualPairObservations: observePair(subject.snapshot, target.snapshot),
    comparedSourceSurfaces,
    missingPrerequisites: [
      ...R068_EXECUTION_GAPS, ...R069_EXECUTION_GAPS,
      'EXACT_CROSS_CHART_T10_RULE_WITH_DIRECT_PAIRWISE_SOURCE_NOT_ESTABLISHED',
      'TWO_PERSON_METHOD_CONTEXT_AND_CONFLICT_SETTLEMENT_NOT_ESTABLISHED',
      ...(!subject.snapshot.completeness.birthTimeKnown
        ? ['SUBJECT_HOUR_INPUT_UNRESOLVED'] : []),
      ...(!target.snapshot.completeness.birthTimeKnown
        ? ['TARGET_HOUR_INPUT_UNRESOLVED'] : []),
    ],
    pairwiseDisposition: 'INCONCLUSIVE', pairwiseT10Admitted: false,
    researchOnly: true, mayGrantOfficialAuthority: false,
    mayMarkMenuAvailable: false, mayPersist: false,
    mayPublish: false, maySell: false,
  };
}
