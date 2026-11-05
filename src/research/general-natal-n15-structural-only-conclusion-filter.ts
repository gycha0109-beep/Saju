import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import { deterministicContentHash, type ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_CONCLUSION_CANDIDATE_VERSION,
  GENERAL_NATAL_CONCLUSION_RULES,
  type ConclusionFamily,
} from './general-natal-conclusion-synthesis-candidate.js';
import {
  buildNatalN13StructuralResearchReading,
} from './general-natal-t8-structural-reading-draft.js';

export const GENERAL_NATAL_N15_CONCLUSION_FILTER_VERSION =
  'saju-n15-structural-only-conclusion-filter-v1' as const;

type CandidateCategory = 'core' | 'strength' | 'tension' | 'work' | 'money' | 'relationship';
type Decision = 'structural_observation_only'
  | 'blocked_personal_semantic_overreach'
  | 'blocked_missing_structural_evidence'
  | 'not_emitted';

interface CandidatePolicy {
  id: string;
  kind: CandidateCategory;
  families: readonly ConclusionFamily[];
  /** null: no validated source-bounded relation supports the original claim. */
  relationId: string | null;
}

const CANDIDATE_POLICIES: readonly CandidatePolicy[] = [
  {id:'CORE_FIVE_FAMILY_CYCLE',kind:'core',families:['peer','resource','output','wealth','officer'],relationId:null},
  {id:'OUTPUT_TO_WEALTH',kind:'strength',families:['output','wealth'],relationId:'OUTPUT-TO-WEALTH'},
  {id:'WEALTH_TO_OFFICER',kind:'strength',families:['wealth','officer'],relationId:'WEALTH-TO-OFFICER'},
  {id:'OFFICER_TO_RESOURCE',kind:'strength',families:['officer','resource'],relationId:'OFFICER-TO-RESOURCE'},
  {id:'PEER_WEALTH_TENSION',kind:'tension',families:['peer','wealth'],relationId:'PEER-TO-WEALTH-ADVERSE'},
  {id:'WEALTH_RESOURCE_TENSION',kind:'tension',families:['wealth','resource'],relationId:'WEALTH-RESOURCE-CONFLICT'},
  {id:'PEER_OFFICER_TENSION',kind:'tension',families:['peer','officer'],relationId:null},
  {id:'WORK_OUTPUT_WEALTH_OFFICER',kind:'work',families:['output','wealth','officer'],relationId:null},
  {id:'MONEY_WEALTH_PEER_RESOURCE',kind:'money',families:['wealth','peer','resource'],relationId:null},
  {id:'RELATIONSHIP_PEER_OFFICER',kind:'relationship',families:['peer','officer'],relationId:null},
] as const;

const POLICIES_BY_TYPE = new Map(CANDIDATE_POLICIES.map((p) =>
  ['GENERAL_NATAL_CONCLUSION_'+p.id,p],
));
const ORIGINAL_RULES_BY_TYPE = new Map(GENERAL_NATAL_CONCLUSION_RULES.map((r) =>
  [r.output.claimType,r],
));

export interface GeneralNatalN15ResearchDecision {
  originalClaimType: string;
  originalConclusionKind: CandidateCategory;
  originalClaimId: string | null;
  decision: Decision;
  originalConsumerConclusionAllowed: false;
  modernBehaviorInferenceAllowed: false;
  researchStructuralText?: string;
  supportingT8ClaimId?: string;
  supportingT5ClaimIds: readonly string[];
  supportingFactRefs: readonly string[];
  supportingSourceLocators: readonly {sourceId:string;title:string;locator:string}[];
  semanticEvidenceFingerprint: string;
  snapshotId: string;
  scenarioRef: string | null;
  reason: string;
}

export interface GeneralNatalN15FilteredResearchReading {
  version: typeof GENERAL_NATAL_N15_CONCLUSION_FILTER_VERSION;
  lifecycle:'internal_research_only';
  originalConsumerConclusionsPublished: false;
  modernConsumerSemanticsApproved: false;
  productionAuthorized: false;
  maySell: false;
  snapshotId: string;
  originalT8CandidateCount: number;
  structuralObservationCount: number;
  blockedOverreachCount: number;
  missingRelationEvidenceCount: number;
  notEmittedCount: number;
  originalConsumerConclusionCount: 0;
  decisions: readonly GeneralNatalN15ResearchDecision[];
  limitations: readonly string[];
}

function requireRecord(input: unknown, where: string): Record<string,unknown> {
  if(input===null || typeof input!=='object' || Array.isArray(input)) {
    throw new TypeError('N15 expected a bounded research value: '+where);
  }
  return input as Record<string,unknown>;
}

function exactOriginalClaim(
  claim: InterpretationClaim,
  policy: CandidatePolicy,
  registry: ResolvedRuleRegistrySnapshot,
  all: ReadonlyMap<string,InterpretationClaim>,
  snapshotId: string,
): void {
  const sourceRule = ORIGINAL_RULES_BY_TYPE.get(claim.claimType);
  const value = requireRecord(claim.value,'original research candidate');
  if(!sourceRule || sourceRule.version!==GENERAL_NATAL_CONCLUSION_CANDIDATE_VERSION ||
      !registry.rules.some((r)=>r.ruleId===sourceRule.ruleId &&
        r.version===sourceRule.version && r.status==='research') ||
      claim.snapshotId!==snapshotId || claim.state!=='active' ||
      claim.taxonomy.tier!=='T8' || claim.taxonomy.category!=='general' ||
      claim.taxonomy.subcategory!==sourceRule.taxonomy.subcategory ||
      claim.predicate!=='consumer_conclusion' ||
      !claim.ruleRefs.some((r)=>r.ruleId===sourceRule.ruleId && r.version===sourceRule.version) ||
      claim.methodologyRef.id!==sourceRule.methodologyRef.id ||
      claim.methodologyRef.version!==sourceRule.methodologyRef.version ||
      value.conclusionKind!==policy.kind ||
      !Array.isArray(value.families) || value.families.join(',')!==policy.families.join(',') ||
      claim.upstreamClaimRefs.length!==policy.families.length ||
      new Set(claim.upstreamClaimRefs).size!==policy.families.length) {
    throw new TypeError('N15 original conclusion is not the exact pinned research candidate: '+claim.claimType);
  }
  const found = new Set<string>();
  for(const upstreamId of claim.upstreamClaimRefs) {
    const upstream=all.get(upstreamId);
    if(!upstream || upstream.state!=='active' ||
        upstream.snapshotId!==snapshotId || upstream.scenarioRef!==claim.scenarioRef ||
        upstream.taxonomy.tier!=='T5' ||
        upstream.predicate!=='ten_god_family_presence' ||
        !upstream.claimType.startsWith('TEN_GOD_FAMILY_') ||
        !upstream.claimType.endsWith('_PRESENT')) {
      throw new TypeError('N15 detached original T5 family support');
    }
    found.add(upstream.claimType.slice('TEN_GOD_FAMILY_'.length,-'_PRESENT'.length).toLowerCase());
  }
  if(found.size!==policy.families.length || !policy.families.every((f)=>found.has(f))) {
    throw new TypeError('N15 original conclusion has incorrect actual family support');
  }
}

/**
 * An executable semantic reduction of the ten legacy *research* conclusion
 * candidates. It never copies their personality/work/money/relationship
 * headline/summary into user-visible prose. The only possible text is the
 * independently executed N13 narrow structural observation for the identical
 * snapshot/scenario and exact T8 relation. No consumer or release admission.
 */
export function buildGeneralNatalN15FilteredResearchReading(
  snapshot: CanonicalSajuSnapshot,
  original: InterpretationExecutionResult,
  originalRegistry: ResolvedRuleRegistrySnapshot,
  sourceBounded: InterpretationExecutionResult,
  sourceBoundedRegistry: ResolvedRuleRegistrySnapshot,
): GeneralNatalN15FilteredResearchReading {
  if(original.run.snapshotId!==snapshot.snapshotId ||
      sourceBounded.run.snapshotId!==snapshot.snapshotId ||
      !original.integrity.valid || !sourceBounded.integrity.valid ||
      originalRegistry.pack.packId!=='PACK-GENERAL-NATAL-CONCLUSION-SYNTHESIS-CANDIDATE' ||
      originalRegistry.pack.status!=='research' ||
      original.run.registrySnapshotId!==originalRegistry.snapshot.registrySnapshotId ||
      original.run.packRef.id!==originalRegistry.pack.packId ||
      original.run.packRef.version!==originalRegistry.pack.version ||
      sourceBounded.run.registrySnapshotId!==sourceBoundedRegistry.snapshot.registrySnapshotId) {
    throw new TypeError('N15 requires identical valid research-bound canonical executions');
  }
  const structural=buildNatalN13StructuralResearchReading(
    snapshot,sourceBounded,sourceBoundedRegistry);
  const active=original.claims.filter((claim)=>claim.state==='active');
  const all = new Map(active.map((claim)=>[claim.claimId,claim]));
  if(all.size!==active.length) throw new TypeError('N15 duplicate active original claim IDs');
  const originals=active.filter((claim)=>claim.predicate==='consumer_conclusion');
  const byType=new Map<string,InterpretationClaim>();
  for(const claim of originals) {
    if(!POLICIES_BY_TYPE.has(claim.claimType) || byType.has(claim.claimType)) {
      throw new TypeError('N15 unsupported or duplicate research-only original consumer claim: '+claim.claimType);
    }
    const policy=POLICIES_BY_TYPE.get(claim.claimType);
    if(!policy) throw new TypeError('N15 missing policy');
    exactOriginalClaim(claim,policy,originalRegistry,all,snapshot.snapshotId);
    byType.set(claim.claimType,claim);
  }

  const decisions:GeneralNatalN15ResearchDecision[]=CANDIDATE_POLICIES.map((policy)=>{
    const originalType='GENERAL_NATAL_CONCLUSION_'+policy.id;
    const claim=byType.get(originalType);
    const relation=claim===undefined || policy.relationId===null ? undefined :
      structural.sentences.find((s)=>s.relationId===policy.relationId &&
        s.scenarioRef===(claim.scenarioRef??null));
    if(claim!==undefined && policy.relationId!==null &&
        structural.sentences.filter((s)=>s.relationId===policy.relationId &&
        s.scenarioRef===(claim.scenarioRef??null)).length>1) {
      throw new TypeError('N15 ambiguous duplicate source-bounded relation candidate');
    }
    const decision:Decision = claim===undefined ? 'not_emitted'
      : policy.relationId===null ? 'blocked_personal_semantic_overreach'
      : relation===undefined ? 'blocked_missing_structural_evidence'
      : 'structural_observation_only';
    const reason=decision==='not_emitted'?'Original research T8 candidate was not emitted.'
      :decision==='blocked_personal_semantic_overreach'?
        'Original modern psychological, work, money, relationship or whole-person inference has no exact independently approved consumer-semantic bridge.'
      :decision==='blocked_missing_structural_evidence'?
        'Family co-presence did not produce the exact source-bounded research T8 relation required for a structural-only replacement.'
      :'Original personal conclusion suppressed; only the actual source-bounded structural relation may be inspected as research.';
    return {
      originalClaimType:originalType,
      originalConclusionKind:policy.kind,
      originalClaimId:claim?.claimId??null,
      decision,
      originalConsumerConclusionAllowed:false,
      modernBehaviorInferenceAllowed:false,
      ...(relation===undefined ? {} : {
        researchStructuralText:relation.text,
        supportingT8ClaimId:relation.researchClaimId,
      }),
      supportingT5ClaimIds:relation?.upstreamClaimRefs??[],
      supportingFactRefs:relation?.factRefs??[],
      supportingSourceLocators:relation?.sourceLocators??[],
      semanticEvidenceFingerprint:deterministicContentHash({
        originalType,decision,
        relationId:relation?.relationId??null,
        relationMeaning:relation?.meaningFingerprint??null,
      }),
      snapshotId:snapshot.snapshotId,
      scenarioRef:claim?.scenarioRef??null,
      reason,
    };
  });
  return {
    version:GENERAL_NATAL_N15_CONCLUSION_FILTER_VERSION,
    lifecycle:'internal_research_only',
    originalConsumerConclusionsPublished:false,
    modernConsumerSemanticsApproved:false,
    productionAuthorized:false,
    maySell:false,
    snapshotId:snapshot.snapshotId,
    originalT8CandidateCount:originals.length,
    structuralObservationCount:decisions.filter((p)=>p.decision==='structural_observation_only').length,
    blockedOverreachCount:decisions.filter((p)=>p.decision==='blocked_personal_semantic_overreach').length,
    missingRelationEvidenceCount:decisions.filter((p)=>p.decision==='blocked_missing_structural_evidence').length,
    notEmittedCount:decisions.filter((p)=>p.decision==='not_emitted').length,
    originalConsumerConclusionCount:0,
    decisions,
    limitations:[
      'Original research-personalized prose is not authorized merely by Ten-God family co-presence.',
      'N13 structural texts remain unreviewed Research/HOLD; this filtered research draft is not a consumer reading.',
      'Structural co-observation is not a behavioral, work, money, relationship or whole-person inference.',
      'Independent source-integrity, expert semantic admission and Product/Production release boundaries are unchanged.',
    ],
  };
}
