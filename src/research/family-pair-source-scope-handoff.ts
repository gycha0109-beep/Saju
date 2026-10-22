import type { CanonicalSajuSnapshot, PillarSlot, TenGod } from '../contracts/calculation.js';
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

export interface R070UnassignedConfigurationInput {
  sourceLayerId: 'CONFIGURATION-OUTCOME';
  sourceSurface: string;
  familyScopeResolved: false;
  disposition: 'INCONCLUSIVE';
  canonicalObservationCoverage: 'branch_clash_only' | 'none';
  canonicalFactPath?: 'derivedFacts.structuralRelations';
  observedBranchClashIds: readonly string[];
  missingPrerequisites: readonly string[];
  familyOutcomeAuthorized: false;
}

/**
 * R070's configuration layer has no approved mapping to one particular
 * parent/child claim. The only existing structural fact bound here is the
 * exact branch-clash candidate, not the complete 刑/沖/破/害 classifier.
 */
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
    const structural = snapshot.derivedFacts.structuralRelations;
    const structuralKnown = isStructural && structural?.status === 'resolved';
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
        ? 'branch_clash_only' as const : 'none' as const,
      ...(structuralKnown
        ? { canonicalFactPath: 'derivedFacts.structuralRelations' as const } : {}),
      observedBranchClashIds,
      missingPrerequisites: [
        'CONFIGURATION_OUTCOME_SETTLEMENT',
        'FAMILY_CONFIGURATION_TO_RELATIVE_METHOD_SELECTION_NOT_ESTABLISHED',
        ...(isStructural
          ? ['XING_PO_HAI_AND_CONFIGURATION_INTERACTION_NOT_SETTLED'] : []),
        ...(!structuralKnown && isStructural
          ? ['CANONICAL_BRANCH_CLASH_CONTEXT_NOT_FULLY_RESOLVED'] : []),
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
  /** Unassigned R070 configuration source phrases, never selected family T8. */
  unassignedConfigurationInputs: readonly R070UnassignedConfigurationInput[];
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
  const missingPrerequisites = [
    ...R070_EXECUTION_GAPS,
    ...new Set(methodCandidates.flatMap(candidate => candidate.missingPrerequisites)),
  ];
  return {
    version: FAMILY_PAIR_SOURCE_SCOPE_HANDOFF_VERSION,
    owner: 'R070', corpusVersion: R070_FAMILY_DOMAIN_CLAIM_CORPUS_VERSION,
    scope, snapshotId: snapshot.snapshotId, calculationHash: snapshot.calculationHash,
    historicalSex: snapshot.input.sexForTraditionalCalculation ?? 'unspecified',
    methodCandidates, methodCoexistences,
    unassignedConfigurationInputs: r070UnassignedConfigurationInputs(snapshot),
    missingPrerequisites,
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
      ],
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
