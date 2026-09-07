import { unavailable, type FactState } from '../contracts/common.js';
import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_SOURCE_CONDITION_FACT_PATHS,
  type GeneralNatalSourceConditionKey,
} from './general-natal-source-conditioned-lower-tier-producer.js';

export const GENERAL_NATAL_SOURCE_CONDITION_RESOLVER_FRONTIER_VERSION =
  '0.1.0-research' as const;

export type GeneralNatalSourceConditionResolverGap =
  | 'GEJU_CANDIDATE_DERIVATION_AUTHORITY_MISSING'
  | 'GEJU_ESTABLISHMENT_PREDICATE_AUTHORITY_MISSING'
  | 'SOURCE_APPLICABLE_CONTEXT_PREDICATE_AUTHORITY_MISSING'
  | 'SHANG_GUAN_SHANG_JIN_QUALIFICATION_AUTHORITY_MISSING'
  | 'DAY_MASTER_FLOURISHING_CLASSIFICATION_AUTHORITY_MISSING'
  | 'FOOD_GOD_FLOURISHING_CLASSIFICATION_AUTHORITY_MISSING'
  | 'NO_CLASH_BREAK_QUALIFICATION_AUTHORITY_MISSING'
  | 'BRANCH_BREAK_RELATION_NOT_MODELED';

export interface PianCaiGeSourceConditionFact {
  readonly patternEstablished: true;
  readonly applicableContext: true;
}

export interface YinShouGeApplicableSourceConditionFact {
  readonly patternEstablished: true;
  readonly applicableContext: true;
}

export interface ShangGuanShangJinSourceConditionFact {
  readonly qualificationSatisfied: true;
}

export interface ShiShenGeQualifiedSourceConditionFact {
  readonly patternEstablished: true;
  readonly dayMasterFlourishing: true;
  readonly foodGodFlourishing: true;
  readonly noClashBreak: true;
}

export interface GeneralNatalSourceConditionFactSet {
  readonly pianCaiGe: FactState<PianCaiGeSourceConditionFact>;
  readonly yinShouGeApplicable: FactState<YinShouGeApplicableSourceConditionFact>;
  readonly shangGuanShangJin: FactState<ShangGuanShangJinSourceConditionFact>;
  readonly shiShenGeQualified: FactState<ShiShenGeQualifiedSourceConditionFact>;
}

export interface GeneralNatalCanonicalSubstrateObservation {
  readonly path: string;
  readonly status: 'resolved' | 'ambiguous' | 'unavailable' | 'missing';
  readonly authorityBoundary: string;
}

export interface GeneralNatalSourceConditionFrontierItem {
  readonly conditionKey: GeneralNatalSourceConditionKey;
  readonly targetFactPath: string;
  readonly resolutionStatus: 'unavailable_authority_gap';
  readonly reasonCode: string;
  readonly authorityGaps: readonly GeneralNatalSourceConditionResolverGap[];
}

export interface GeneralNatalSourceConditionResolverFrontierReport {
  readonly reportId: string;
  readonly reportVersion: typeof GENERAL_NATAL_SOURCE_CONDITION_RESOLVER_FRONTIER_VERSION;
  readonly snapshotId: string;
  readonly status: 'blocked_authority_gap';
  readonly canonicalResolverAuthorized: false;
  readonly sourceConditionFactsEmitted: false;
  readonly observedCanonicalSubstrate: readonly GeneralNatalCanonicalSubstrateObservation[];
  readonly conditions: readonly GeneralNatalSourceConditionFrontierItem[];
  readonly facts: GeneralNatalSourceConditionFactSet;
  readonly globalAuthorityGaps: readonly GeneralNatalSourceConditionResolverGap[];
  readonly notes: readonly string[];
}

const REASON_CODES = Object.freeze({
  pianCaiGe: 'general-natal-pian-cai-ge-resolver-authority-missing',
  yinShouGeApplicable: 'general-natal-yin-shou-ge-applicable-resolver-authority-missing',
  shangGuanShangJin: 'general-natal-shang-guan-shang-jin-resolver-authority-missing',
  shiShenGeQualified: 'general-natal-shi-shen-ge-qualified-resolver-authority-missing',
} as const);

const CONDITION_FRONTIER = Object.freeze([
  {
    conditionKey: 'pian_cai_ge',
    targetFactPath: GENERAL_NATAL_SOURCE_CONDITION_FACT_PATHS.pianCaiGe,
    resolutionStatus: 'unavailable_authority_gap',
    reasonCode: REASON_CODES.pianCaiGe,
    authorityGaps: [
      'GEJU_CANDIDATE_DERIVATION_AUTHORITY_MISSING',
      'GEJU_ESTABLISHMENT_PREDICATE_AUTHORITY_MISSING',
      'SOURCE_APPLICABLE_CONTEXT_PREDICATE_AUTHORITY_MISSING',
    ],
  },
  {
    conditionKey: 'yin_shou_ge_applicable_context',
    targetFactPath: GENERAL_NATAL_SOURCE_CONDITION_FACT_PATHS.yinShouGeApplicable,
    resolutionStatus: 'unavailable_authority_gap',
    reasonCode: REASON_CODES.yinShouGeApplicable,
    authorityGaps: [
      'GEJU_CANDIDATE_DERIVATION_AUTHORITY_MISSING',
      'GEJU_ESTABLISHMENT_PREDICATE_AUTHORITY_MISSING',
      'SOURCE_APPLICABLE_CONTEXT_PREDICATE_AUTHORITY_MISSING',
    ],
  },
  {
    conditionKey: 'shang_guan_shang_jin',
    targetFactPath: GENERAL_NATAL_SOURCE_CONDITION_FACT_PATHS.shangGuanShangJin,
    resolutionStatus: 'unavailable_authority_gap',
    reasonCode: REASON_CODES.shangGuanShangJin,
    authorityGaps: ['SHANG_GUAN_SHANG_JIN_QUALIFICATION_AUTHORITY_MISSING'],
  },
  {
    conditionKey: 'shi_shen_ge_flourishing_no_clash_break',
    targetFactPath: GENERAL_NATAL_SOURCE_CONDITION_FACT_PATHS.shiShenGeQualified,
    resolutionStatus: 'unavailable_authority_gap',
    reasonCode: REASON_CODES.shiShenGeQualified,
    authorityGaps: [
      'GEJU_CANDIDATE_DERIVATION_AUTHORITY_MISSING',
      'GEJU_ESTABLISHMENT_PREDICATE_AUTHORITY_MISSING',
      'DAY_MASTER_FLOURISHING_CLASSIFICATION_AUTHORITY_MISSING',
      'FOOD_GOD_FLOURISHING_CLASSIFICATION_AUTHORITY_MISSING',
      'NO_CLASH_BREAK_QUALIFICATION_AUTHORITY_MISSING',
      'BRANCH_BREAK_RELATION_NOT_MODELED',
    ],
  },
] as const satisfies readonly GeneralNatalSourceConditionFrontierItem[]);

function stateStatus(value: { readonly status: string } | undefined): GeneralNatalCanonicalSubstrateObservation['status'] {
  if (value === undefined) return 'missing';
  if (value.status === 'resolved' || value.status === 'ambiguous' || value.status === 'unavailable') {
    return value.status;
  }
  return 'missing';
}

function observedCanonicalSubstrate(
  snapshot: CanonicalSajuSnapshot,
): readonly GeneralNatalCanonicalSubstrateObservation[] {
  return Object.freeze([
    {
      path: 'derivedFacts.dayMaster',
      status: stateStatus(snapshot.derivedFacts.dayMaster),
      authorityBoundary:
        'Canonical day-master identity exists, but ordinary strong/weak classification is not authorized by the current strength-readiness graph.',
    },
    {
      path: 'derivedFacts.tenGods',
      status: stateStatus(snapshot.derivedFacts.tenGods),
      authorityBoundary:
        'Ten-God relation identity is not equivalent to Gyeokguk establishment or any of the four source conditions.',
    },
    {
      path: 'derivedFacts.hiddenStems.month',
      status: stateStatus(snapshot.derivedFacts.hiddenStems?.month),
      authorityBoundary:
        'Hidden-stem membership order is storage-only and is not authority for main/secondary/residual strength or month-command duration.',
    },
    {
      path: 'derivedFacts.structuralRelations',
      status: stateStatus(snapshot.derivedFacts.structuralRelations),
      authorityBoundary:
        'Current relations are structural matches only; transformation/effect is not established and branch break is not modeled.',
    },
  ]);
}

function unavailableFacts(): GeneralNatalSourceConditionFactSet {
  return Object.freeze({
    pianCaiGe: unavailable(REASON_CODES.pianCaiGe),
    yinShouGeApplicable: unavailable(REASON_CODES.yinShouGeApplicable),
    shangGuanShangJin: unavailable(REASON_CODES.shangGuanShangJin),
    shiShenGeQualified: unavailable(REASON_CODES.shiShenGeQualified),
  });
}

function orderedGlobalGaps(): readonly GeneralNatalSourceConditionResolverGap[] {
  const ordered: readonly GeneralNatalSourceConditionResolverGap[] = Object.freeze([
    'GEJU_CANDIDATE_DERIVATION_AUTHORITY_MISSING',
    'GEJU_ESTABLISHMENT_PREDICATE_AUTHORITY_MISSING',
    'SOURCE_APPLICABLE_CONTEXT_PREDICATE_AUTHORITY_MISSING',
    'SHANG_GUAN_SHANG_JIN_QUALIFICATION_AUTHORITY_MISSING',
    'DAY_MASTER_FLOURISHING_CLASSIFICATION_AUTHORITY_MISSING',
    'FOOD_GOD_FLOURISHING_CLASSIFICATION_AUTHORITY_MISSING',
    'NO_CLASH_BREAK_QUALIFICATION_AUTHORITY_MISSING',
    'BRANCH_BREAK_RELATION_NOT_MODELED',
  ]);
  const present = new Set(CONDITION_FRONTIER.flatMap((condition) => condition.authorityGaps));
  return ordered.filter((gap) => present.has(gap));
}

export function buildGeneralNatalSourceConditionResolverFrontier(
  snapshot: CanonicalSajuSnapshot,
): GeneralNatalSourceConditionResolverFrontierReport {
  const substrate = observedCanonicalSubstrate(snapshot);
  const globalAuthorityGaps = orderedGlobalGaps();
  const material = {
    reportVersion: GENERAL_NATAL_SOURCE_CONDITION_RESOLVER_FRONTIER_VERSION,
    snapshotId: snapshot.snapshotId,
    status: 'blocked_authority_gap' as const,
    canonicalResolverAuthorized: false as const,
    sourceConditionFactsEmitted: false as const,
    observedCanonicalSubstrate: substrate,
    conditions: CONDITION_FRONTIER,
    globalAuthorityGaps,
  };

  return Object.freeze({
    reportId: `general_natal_source_condition_resolver_frontier_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
    facts: unavailableFacts(),
    notes: Object.freeze([
      'This research frontier records authority gaps; it does not infer any source condition from raw pillars, Ten-God presence, hidden-stem membership, or structural-relation presence/absence.',
      'A fully resolved canonical snapshot is insufficient to establish the four PR #335 source conditions under current repository authority.',
      'Do not translate unavailable source-condition facts into false negatives. Downstream source-conditioned rules must remain fail-closed until a reviewed resolver is introduced.',
      'Product, narrative, LLM, and Commerce layers must not fill these missing predicates.',
    ]),
  });
}
