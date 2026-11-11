import type {
  CanonicalSajuSnapshot, PillarSlot, TenGod,
} from '../contracts/calculation.js';
import type { PairwiseSourceScopeHandoff } from
  './family-pair-source-scope-handoff.js';
import type { T10YongshenMethodScopeResearchV1 } from
  './compatibility-t10-yongshen-method-scope.js';
import {
  GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_PRIMITIVE_AUTHORITY_REVIEW,
  GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
} from './general-natal-geju-rescue-precedence-weighting-primitive-authority-review.js';
import {
  GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_DECISION,
} from './general-natal-geju-establishment-source-clause-admission-review.js';

export const T10_GEJU_RESCUE_BRIDGE_VERSION =
  'saju-t10-geju-rescue-source-bridge-v1' as const;

export const T10_GEJU_RESCUE_SOURCE = Object.freeze({
  title: '子平真詮',
  section: '卷一·九、論用神成敗救應',
  url: 'https://www.donglishuzhai.net/chapter/3722.html',
  verifiedLayer: 'PUBLIC_CLASSICAL_TRANSCRIPTION_WITH_EDITIONAL_VARIANTS',
  originalContext: 'ONE_NATAL_GEJU_FORMATION_FAILURE_AND_RESCUE',
  importedResearchHash:
    GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
  importedEstablishmentHash:
    GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_DEFINITION_HASH,
  importedEstablishmentDecision:
    GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_DECISION,
  explicitCrossPersonRescueRule: false,
});

type VisibleGodTerm = '정관' | '상관' | '정인' | '편인' |
  '정재' | '편재' | '겁재' | '식신';
type ClauseId = 'officer_hurt_seal' | 'wealth_rob_food';
type ObservationFamily = 'officer' | 'hurt' | 'seal' | 'wealth' | 'rob' | 'food';
type ClauseDefinition = {
  readonly id: ClauseId;
  readonly adversity: string;
  readonly rescue: string;
  readonly requiredFamilies: readonly ObservationFamily[];
};
const CLAUSES: readonly ClauseDefinition[] = [
  {
    id: 'officer_hurt_seal',
    adversity: '官逢傷',
    rescue: '透印以解之',
    requiredFamilies: ['officer', 'hurt', 'seal'],
  },
  {
    id: 'wealth_rob_food',
    adversity: '財逢劫',
    rescue: '透食以化之',
    requiredFamilies: ['wealth', 'rob', 'food'],
  },
];
const FAMILY_TERMS: Readonly<Record<ObservationFamily, readonly VisibleGodTerm[]>> = {
  officer: ['정관'],
  hurt: ['상관'],
  seal: ['정인', '편인'],
  wealth: ['정재', '편재'],
  rob: ['겁재'],
  food: ['식신'],
};
const STEM_SLOTS = ['year', 'month', 'hour'] as const satisfies readonly PillarSlot[];

export interface T10GejuVisibleStem {
  readonly path: string;
  readonly slot: 'year' | 'month' | 'hour';
  readonly value: VisibleGodTerm;
  readonly sourceChartPersonRef: string;
}

export interface T10GejuRescueClauseAudit {
  readonly id: ClauseId;
  readonly adversity: string;
  readonly rescue: string;
  readonly sourceScope: 'WITHIN_ONE_NATAL_CHART';
  readonly availableFamilies: readonly ObservationFamily[];
  readonly sourceCase: typeof T10_GEJU_RESCUE_SOURCE;
  readonly sameChartVisibleStemWitnesses: readonly T10GejuVisibleStem[];
  readonly allListedStemFamiliesObservable: boolean;
  readonly rawVisibleFamiliesCoPresent: boolean;
  /** Presence of canonical ten-god values is NOT an established geju or rescue. */
  readonly sourceClauseSatisfied: false;
  readonly gejuEstablished: false;
  readonly rescueEffective: false;
  readonly relativePrecedenceResolved: false;
}

export interface T10PerPersonGejuRescueAudit {
  readonly personRef: string;
  readonly snapshotId: string;
  readonly calculationHash: string;
  readonly visibleStemCoverage: 'complete' | 'partial';
  readonly unresolvedStemFactPaths: readonly string[];
  readonly clauseAudits: readonly T10GejuRescueClauseAudit[];
  readonly mayClaimPersonalGejuOutcome: false;
}

export interface T10GejuRescueBridgeResearchV1 {
  readonly version: typeof T10_GEJU_RESCUE_BRIDGE_VERSION;
  readonly lifecycle: 'internal_research_only';
  readonly source: typeof T10_GEJU_RESCUE_SOURCE;
  readonly sourceRescueCatalogAligned: true;
  readonly sourceRescueRuntimeAuthorized: false;
  readonly subject: T10PerPersonGejuRescueAudit;
  readonly target: T10PerPersonGejuRescueAudit;
  readonly crossPersonWitnessFusionAllowed: false;
  readonly crossPersonRescueRuleEstablished: false;
  readonly methodSelectionEstablished: false;
  readonly unresolvedPrerequisites: readonly [
    'INDIVIDUAL_GEJU_CANDIDATE_IDENTITY',
    'INDIVIDUAL_STRENGTH_POSITION_AND_RELATION_EFFECT',
    'RESCUE_CLAUSE_CONDITION_AND_OVERLAP_SETTLEMENT',
    'SOURCE_QUALIFIED_CROSS_CHART_RESCUE_RULE_MISSING',
  ];
  readonly compatibilityVerdict: null;
  readonly pairwiseT10Admitted: false;
  readonly mayClaimInterpersonalMeaning: false;
  readonly mayGrantOfficialAuthority: false;
  readonly mayPublish: false;
  readonly maySell: false;
}

function single(
  snapshot: CanonicalSajuSnapshot,
  personRef: string,
): T10PerPersonGejuRescueAudit {
  const all: T10GejuVisibleStem[] = [];
  const unresolved: string[] = [];
  const facts = snapshot.derivedFacts.tenGods;
  for (const slot of STEM_SLOTS) {
    const path = `derivedFacts.tenGods.${slot}.stem`;
    const fact = facts.status === 'resolved' ? facts.value[slot].stem : undefined;
    if (fact?.status !== 'resolved') {
      unresolved.push(path);
    } else {
      const term = fact.value;
      if (Object.values(FAMILY_TERMS).some(members =>
        (members as readonly string[]).includes(term))) {
        all.push({ path, slot, value: term as VisibleGodTerm, sourceChartPersonRef: personRef });
      }
    }
  }
  const clauseAudits: T10GejuRescueClauseAudit[] = CLAUSES.map(clause => {
    const availableFamilies = clause.requiredFamilies.filter(family =>
      all.some(witness => FAMILY_TERMS[family].some(term => term === witness.value)));
    return {
      id: clause.id, adversity: clause.adversity, rescue: clause.rescue,
      sourceScope: 'WITHIN_ONE_NATAL_CHART',
      availableFamilies,
      sourceCase: T10_GEJU_RESCUE_SOURCE,
      sameChartVisibleStemWitnesses: all.filter(witness =>
        clause.requiredFamilies.some(family =>
          FAMILY_TERMS[family].some(term => term === witness.value))),
      allListedStemFamiliesObservable: unresolved.length === 0,
      rawVisibleFamiliesCoPresent: availableFamilies.length === clause.requiredFamilies.length,
      sourceClauseSatisfied: false,
      gejuEstablished: false, rescueEffective: false, relativePrecedenceResolved: false,
    };
  });
  return {
    personRef, snapshotId: snapshot.snapshotId, calculationHash: snapshot.calculationHash,
    visibleStemCoverage: unresolved.length === 0 ? 'complete' : 'partial',
    unresolvedStemFactPaths: unresolved,
    clauseAudits,
    mayClaimPersonalGejuOutcome: false,
  };
}

/**
 * T10 may inspect each person's canonical stem facts, but a rescue clause in
 * Zi Ping Zhen Quan is intra-chart. Another person's visible Seal or Food
 * star cannot silently satisfy this person's source prerequisites.
 */
export function auditT10GejuRescueSourceBridgeV1(
  pair: PairwiseSourceScopeHandoff,
  prior: T10YongshenMethodScopeResearchV1,
  subject: CanonicalSajuSnapshot,
  target: CanonicalSajuSnapshot,
): T10GejuRescueBridgeResearchV1 {
  const upstream =
    GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_PRIMITIVE_AUTHORITY_REVIEW;
  if (pair.owner !== 'R068_R069' || pair.researchOnly !== true ||
      pair.pairwiseT10Admitted !== false ||
      pair.mayPublish !== false || pair.maySell !== false ||
      pair.mayGrantOfficialAuthority !== false ||
      prior.pairwiseT10Admitted !== false ||
      prior.conceptualConflationBlocked !== true ||
      prior.subject.personRef !== pair.subject.personRef ||
      prior.target.personRef !== pair.target.personRef ||
      prior.subject.calculationHash !== subject.calculationHash ||
      prior.target.calculationHash !== target.calculationHash ||
      pair.subject.personRef === pair.target.personRef ||
      !pair.subject.personRef || !pair.target.personRef ||
      pair.subject.snapshotId !== subject.snapshotId ||
      pair.target.snapshotId !== target.snapshotId ||
      pair.subject.calculationHash !== subject.calculationHash ||
      pair.target.calculationHash !== target.calculationHash ||
      upstream.generalizedRescueEffectPredicateAuthorized !== false ||
      upstream.generalizedRescuePrecedenceWeightingPredicateAuthorized !== false ||
      upstream.productionFactEmissionAuthorized !== false ||
      CLAUSES.some(clause => !upstream.rescueExamples.some(example =>
        example.adversity === clause.adversity && example.rescue === clause.rescue))) {
    throw new TypeError('Geju source bridge requires exact canonical provenance and blocked rescue authority.');
  }
  return {
    version: T10_GEJU_RESCUE_BRIDGE_VERSION,
    lifecycle: 'internal_research_only', source: T10_GEJU_RESCUE_SOURCE,
    sourceRescueCatalogAligned: true,
    sourceRescueRuntimeAuthorized: false,
    subject: single(subject, pair.subject.personRef),
    target: single(target, pair.target.personRef),
    crossPersonWitnessFusionAllowed: false,
    crossPersonRescueRuleEstablished: false,
    methodSelectionEstablished: false,
    unresolvedPrerequisites: [
      'INDIVIDUAL_GEJU_CANDIDATE_IDENTITY',
      'INDIVIDUAL_STRENGTH_POSITION_AND_RELATION_EFFECT',
      'RESCUE_CLAUSE_CONDITION_AND_OVERLAP_SETTLEMENT',
      'SOURCE_QUALIFIED_CROSS_CHART_RESCUE_RULE_MISSING',
    ],
    compatibilityVerdict: null,
    pairwiseT10Admitted: false,
    mayClaimInterpersonalMeaning: false,
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    maySell: false,
  };
}
