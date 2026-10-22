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

export interface FamilySourceScopeCandidate {
  sourceLayerId: string;
  sourceSurface: string;
  sourceLayer: string;
  originalSexScope: string;
  disposition: Exclude<ResearchScopeDisposition, 'REJECTED'>;
  observedFactPath?: string;
  observedPillar?: string;
  tenGodObservation?: FamilyTenGodSourceObservation;
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
    return {
      ...base, disposition: 'INCONCLUSIVE',
      ...(tenGodObservation === undefined ? {} : { tenGodObservation }),
      missingPrerequisites: [
        'SECTION_SCOPED_STAR_RELATION_METHOD_NOT_SELECTED',
        'HIDDEN_VS_VISIBLE_STAR_HANDLING',
        'HISTORICAL_TO_MODERN_FAMILY_TRANSLATION_NOT_ESTABLISHED',
        ...(tenGodObservation?.status === 'incomplete_input'
          ? ['TEN_GOD_CANONICAL_FACTS_NOT_FULLY_RESOLVED'] : []),
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
  const missingPrerequisites = [
    ...R070_EXECUTION_GAPS,
    ...new Set([
      ...methodCandidates.flatMap(candidate => candidate.missingPrerequisites),
      ...crossLayerMethodComparisons.flatMap(comparison => comparison.missingPrerequisites),
      ...branchClashPillarObservations.flatMap(item => item.missingPrerequisites),
    ]),
  ];
  return {
    version: FAMILY_PAIR_SOURCE_SCOPE_HANDOFF_VERSION,
    owner: 'R070', corpusVersion: R070_FAMILY_DOMAIN_CLAIM_CORPUS_VERSION,
    scope, snapshotId: snapshot.snapshotId, calculationHash: snapshot.calculationHash,
    historicalSex: snapshot.input.sexForTraditionalCalculation ?? 'unspecified',
    methodCandidates, methodCoexistences, crossLayerMethodComparisons,
    excludedSiblingSourceSurfaces: excludedSiblingSources(scope),
    unassignedConfigurationInputs: r070UnassignedConfigurationInputs(snapshot),
    branchClashPillarObservations, missingPrerequisites,
    interpretationDisposition: 'INCONCLUSIVE',
    familyT8Admitted: false, researchOnly: true,
    mayGrantOfficialAuthority: false, mayMarkMenuAvailable: false,
    mayPersist: false, mayPublish: false, maySell: false,
  };
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
