import type { InterpretationClaim } from '../contracts/interpretation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import { deterministicContentHash, type ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES,
  GENERAL_NATAL_SOURCE_BOUNDED_METHODOLOGY,
  GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION,
  type GeneralNatalSourceBoundedFamily,
  type GeneralNatalSourceBoundedRelationKind,
} from './general-natal-conclusion-source-bounded-candidate.js';

export const GENERAL_NATAL_N13_RESEARCH_READING_VERSION = 'saju-n13-source-bounded-t8-research-reading-v1' as const;

interface Pattern {
  id: string;
  from: GeneralNatalSourceBoundedFamily;
  to: GeneralNatalSourceBoundedFamily;
  pattern: string;
  relationKind: GeneralNatalSourceBoundedRelationKind;
  constraint: string | null;
  evidenceScope: 'family_level' | 'exact_member_intersection';
  reading: string;
}

/** Exact structural observations, never personality, money, work or fortune claims. */
const PATTERNS: readonly Pattern[] = [
  { id:'OUTPUT-TO-WEALTH',from:'output',to:'wealth',pattern:'食傷→財',
    relationKind:'generates',constraint:null,evidenceScope:'family_level',
    reading:'식상과 재성의 관측을 근거로 고전의 식상→재성 생성 관계가 구조 후보로 매칭됩니다.' },
  { id:'WEALTH-TO-OFFICER',from:'wealth',to:'officer',pattern:'財→官殺',
    relationKind:'generates',constraint:null,evidenceScope:'family_level',
    reading:'재성과 관성의 관측을 근거로 고전의 재성→관성 생성 관계가 구조 후보로 매칭됩니다.' },
  { id:'OFFICER-TO-RESOURCE',from:'officer',to:'resource',pattern:'官殺→印',
    relationKind:'generates',constraint:null,evidenceScope:'family_level',
    reading:'관성과 인성의 관측을 근거로 고전의 관성→인성 생성 관계가 구조 후보로 매칭됩니다.' },
  { id:'PEER-TO-WEALTH-ADVERSE',from:'peer',to:'wealth',pattern:'劫財→財',
    relationKind:'adverse_to',constraint:'겁재',evidenceScope:'exact_member_intersection',
    reading:'정확히 겁재가 관측되고 재성이 관측되어 고전의 겁재→재성 견제 관계가 제한된 구조 후보로 매칭됩니다.' },
  { id:'WEALTH-RESOURCE-CONFLICT',from:'wealth',to:'resource',pattern:'財↔印',
    relationKind:'conflicts_with',constraint:null,evidenceScope:'family_level',
    reading:'재성과 인성의 관측을 근거로 고전의 재성·인성 구조적 충돌 관계가 후보로 매칭됩니다.' },
];
const BY_ID = new Map(PATTERNS.map((p) => [p.id,p]));
const RULES = new Map(GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES.map((r) => [r.output.claimType,r]));

export interface NatalN13ResearchSentence {
  semanticKey: string;
  meaningFingerprint: string;
  researchClaimId: string;
  relationId: string;
  sourcePattern: string;
  text: string;
  upstreamClaimRefs: readonly [string,string];
  factRefs: readonly string[];
  sourceLocators: readonly {sourceId:string;title:string;locator:string}[];
  scenarioRef: string | null;
  ruleId: string;
  consumerProjectionAuthorized: false;
  researchOnly: true;
}

export interface NatalN13ResearchReading {
  version: typeof GENERAL_NATAL_N13_RESEARCH_READING_VERSION;
  status: 'research_only';
  mayPublishToConsumer: false;
  mayApproveSemantics: false;
  mayPromoteProduction: false;
  snapshotId: string;
  relationCount: number;
  meaningSignature: string;
  sentences: readonly NatalN13ResearchSentence[];
  limitations: readonly string[];
}

function asRecord(input: unknown, context: string): Record<string,unknown> {
  if (input === null || typeof input !== 'object' || Array.isArray(input)) {
    throw new TypeError('N13 expected an object: ' + context);
  }
  return input as Record<string,unknown>;
}

function endpoint(
  candidate: InterpretationClaim | undefined,
  parent: InterpretationClaim,
  family: GeneralNatalSourceBoundedFamily,
): InterpretationClaim {
  if (!candidate) throw new TypeError('N13 missing upstream T5 Claim');
  const value = asRecord(candidate.value,'T5');
  if (candidate.state !== 'active' ||
      candidate.snapshotId !== parent.snapshotId ||
      candidate.scenarioRef !== parent.scenarioRef ||
      candidate.taxonomy.tier !== 'T5' ||
      candidate.claimType !== 'GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_' + family.toUpperCase() + '_PRESENT' ||
      candidate.predicate !== 'ten_god_family_presence' ||
      value.family !== family || value.presence !== 'observed' ||
      value.consumerProjectionAuthorized !== false ||
      candidate.methodologyRef.id !== GENERAL_NATAL_SOURCE_BOUNDED_METHODOLOGY.methodologyId ||
      candidate.methodologyRef.version !== GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION) {
    throw new TypeError('N13 incompatible T5 endpoint for ' + family);
  }
  return candidate;
}

function renderRelation(
  claim: InterpretationClaim,
  active: ReadonlyMap<string,InterpretationClaim>,
  registry: ResolvedRuleRegistrySnapshot,
): NatalN13ResearchSentence {
  const value = asRecord(claim.value,'T8');
  const pattern = BY_ID.get(String(value.relationId));
  const rule = RULES.get(claim.claimType);
  if (!pattern || !rule || rule.ruleId !== 'RULE-GENERAL-NATAL-SOURCE-BOUNDED-' + pattern.id ||
      !registry.rules.some((r) => r.ruleId === rule.ruleId && r.version === rule.version && r.status === 'research') ||
      !claim.ruleRefs.some((r) => r.ruleId === rule.ruleId && r.version === rule.version) ||
      claim.taxonomy.tier !== 'T8' || claim.taxonomy.category !== 'general' ||
      claim.taxonomy.subcategory !== 'source_bounded_relation' ||
      claim.predicate !== 'ten_god_structural_relation' ||
      claim.methodologyRef.id !== GENERAL_NATAL_SOURCE_BOUNDED_METHODOLOGY.methodologyId ||
      claim.methodologyRef.version !== GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION ||
      value.fromFamily !== pattern.from || value.toFamily !== pattern.to ||
      value.relationKind !== pattern.relationKind || value.classicalPattern !== pattern.pattern ||
      value.evidenceScope !== pattern.evidenceScope ||
      value.exactTenGodConstraint !== pattern.constraint ||
      value.consumerProjectionAuthorized !== false ||
      value.behavioralInferenceAuthorized !== false ||
      value.futureTimingAuthorized !== false || value.numericScoringAuthorized !== false) {
    throw new TypeError('N13 unrecognized or unapproved structural relation');
  }
  const ids = claim.upstreamClaimRefs;
  if (ids.length !== 2 || new Set(ids).size !== 2 || !ids[0] || !ids[1]) {
    throw new TypeError('N13 relation must have exactly two independent T5 endpoints');
  }
  const from = endpoint(ids.map((id) => active.get(id)).find((c) =>
    c?.claimType === 'GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_' + pattern.from.toUpperCase() + '_PRESENT'),
    claim,pattern.from);
  const to = endpoint(ids.map((id) => active.get(id)).find((c) =>
    c?.claimType === 'GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_' + pattern.to.toUpperCase() + '_PRESENT'),
    claim,pattern.to);
  const expectedSources = new Set(rule.sourceRefs.map((s) => s.sourceId));
  if (expectedSources.size !== 2 || claim.sourceRefs.length !== 2 ||
      claim.sourceRefs.some((id) => !expectedSources.has(id))) {
    throw new TypeError('N13 T8 source identity mismatch');
  }
  const sources = new Map(registry.sources.map((s) => [s.sourceId,s]));
  const locators = [...expectedSources].sort().map((id) => {
    const s = sources.get(id);
    if (!s || !s.locator || !s.title) throw new TypeError('N13 source locator missing: ' + id);
    return {sourceId:id,title:s.title,locator:JSON.stringify(s.locator)};
  });
  return {
    semanticKey:'GENERAL_NATAL_N13_' + pattern.id.replaceAll('-','_'),
    meaningFingerprint:deterministicContentHash({
      relationId:pattern.id,scope:pattern.evidenceScope,
      constraint:pattern.constraint,scenario:claim.scenarioRef ?? null,
    }),
    researchClaimId:claim.claimId,
    relationId:pattern.id,
    sourcePattern:pattern.pattern,
    text:pattern.reading +
      ' 이는 연구용 구조 관측이며 성격·행동·직업·재물 결과·실제 사건·미래의 길흉을 단정하지 않습니다.',
    upstreamClaimRefs:[from.claimId,to.claimId],
    factRefs:[...new Set([...claim.factRefs,...from.factRefs,...to.factRefs])].sort(),
    sourceLocators:locators,
    scenarioRef:claim.scenarioRef ?? null,
    ruleId:rule.ruleId,
    consumerProjectionAuthorized:false,
    researchOnly:true,
  };
}

/**
 * Converts actually emitted T8 relations (not rule definitions or mere T5
 * co-presence) into bounded, independently source-identifiable research prose.
 * Research outputs cannot be projected into Preview/Production.
 */
export function buildNatalN13StructuralResearchReading(
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
): NatalN13ResearchReading {
  if (!execution.integrity.valid || registry.pack.status !== 'research' ||
      !registry.rules.some((r) => r.ruleSetId === 'general-natal-source-bounded-structural-relation')) {
    throw new TypeError('N13 requires a valid source-bounded research execution');
  }
  const active = execution.claims.filter((c) => c.state === 'active');
  const byId = new Map(active.map((c) => [c.claimId,c]));
  if (byId.size !== active.length) throw new TypeError('N13 duplicate active Claim IDs');
  const relations = active.filter((c) => c.taxonomy.tier === 'T8' &&
    c.taxonomy.category === 'general' && c.taxonomy.subcategory === 'source_bounded_relation');
  const sentences = relations.map((c) => renderRelation(c,byId,registry))
    .sort((a,b) => a.relationId.localeCompare(b.relationId) ||
      (a.scenarioRef ?? '').localeCompare(b.scenarioRef ?? ''));
  return {
    version:GENERAL_NATAL_N13_RESEARCH_READING_VERSION,
    status:'research_only',
    mayPublishToConsumer:false,
    mayApproveSemantics:false,
    mayPromoteProduction:false,
    snapshotId:execution.run.snapshotId,
    relationCount:sentences.length,
    meaningSignature:deterministicContentHash(sentences.map((s) => s.meaningFingerprint).sort()),
    sentences,
    limitations:[
      'Each structural relation requires two distinct actual T5 family observations.',
      'Family co-presence does not establish position, strength, outcome, personality, or causal life events.',
      'Source witness and reviewer trust remain research-only, with no Preview semantic admission.',
      'Do not copy these draft sentences to an authorized consumer reading or commercial product.',
    ],
  };
}
