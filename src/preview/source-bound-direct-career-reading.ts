import type { CanonicalSajuSnapshot, TenGod } from '../contracts/calculation.js';
import { runInterpretation } from '../interpretation/interpretation-engine.js';
import { buildReadingCompositionEvidence } from '../reading/reading-intent-composition.js';
import {
  createCareerNatalReadingCandidateRegistry,
  CAREER_NATAL_READING_CANDIDATE_VERSION,
} from '../research/career-natal-reading-candidate.js';
import {
  careerTenGodClaimType,
  CAREER_TEN_GOD_SEMANTIC_SPECS,
  type CareerTenGodChannel,
} from '../research/career-natal-reading-schema.js';

export interface SourceBoundedCareerT8Observation {
  claimId: string;
  claimType: string;
  ruleId: string;
  sourceIds: readonly string[];
  methodologyId: string;
  tenGod: TenGod;
  channel: CareerTenGodChannel;
  interpretationKind: string;
  positions: readonly string[];
  factPaths: readonly string[];
  /** A single exact subtype/channel T8 cannot replace a multifactor core. */
  replacesMultifactorCore: false;
  authorizesOccupationOrIncomeOutcome: false;
}

export interface SourceBoundedCareerResearchReading {
  snapshotId: string;
  calculationHash: string;
  directVisibleStemT8: readonly SourceBoundedCareerT8Observation[];
  supportingBranchT8: readonly SourceBoundedCareerT8Observation[];
  researchOnly: true;
  mayPublish: false;
  maySell: false;
  mayConcludeCareerOutcome: false;
}

function assert(value: unknown, message: string): asserts value {
  if (!value) throw new TypeError('Direct career T8 research: '+message);
}

export function buildSourceBoundedCareerResearchReading(
  snapshot: CanonicalSajuSnapshot,
  options: { requestId?: string; now?: Date } = {},
): SourceBoundedCareerResearchReading {
  const registry = createCareerNatalReadingCandidateRegistry();
  const execution = runInterpretation(snapshot, registry, {
    requestId: (options.requestId ?? 'source-bound-career') + ':career-exact-t8',
    now: options.now ?? new Date('2026-10-25T00:00:00.000Z'),
  });
  assert(execution.integrity.valid &&
    execution.run.snapshotId === snapshot.snapshotId &&
    execution.run.snapshotHash === snapshot.calculationHash &&
    execution.run.packRef.id === registry.pack.packId &&
    registry.pack.status === 'research',
  'different snapshot, registry or authority');
  const selection = buildReadingCompositionEvidence(snapshot, execution, registry, {
    requestId: 'source-bound-direct-career-research',
    intent: { domain: 'career', temporalScope: 'natal' },
  });
  const selected = new Set(selection.evidence?.bundle.claims.map(x=>x.claimId)??[]);
  const directVisibleStemT8: SourceBoundedCareerT8Observation[] = [];
  const supportingBranchT8: SourceBoundedCareerT8Observation[] = [];
  const fact = snapshot.derivedFacts.tenGods;
  if(snapshot.completeness.birthTimeKnown)assert(fact.status==='resolved',
    'known birth time requires resolved Ten-God positions');
  for(const claim of execution.claims){
    if(claim.state!=='active' || claim.taxonomy.category!=='career' ||
      claim.taxonomy.tier!=='T8' ||
      claim.methodologyRef.id!=='M-CAREER-NATAL-READING-EXACT-TEN-GOD-CHANNEL-V2')
      continue;
    assert(selected.has(claim.claimId) && fact.status==='resolved' &&
      claim.snapshotId===snapshot.snapshotId && claim.scenarioRef===undefined,
    'T8 was not selected or chart is unresolved');
    const value = claim.value as Record<string,unknown>;
    const god = value.tenGod as TenGod;
    const channel = value.channel as CareerTenGodChannel;
    const spec=CAREER_TEN_GOD_SEMANTIC_SPECS[god];
    assert(spec !== undefined && (channel==='visible_stems'||channel==='branches') &&
      claim.claimType===careerTenGodClaimType(god,channel) &&
      value.careerKind===spec.kind &&
      value.specificOccupationAuthorized===false &&
      value.careerSuccessAuthorized===false &&
      value.incomeOutcomeAuthorized===false &&
      value.futureTimingAuthorized===false &&
      value.numericScoringAuthorized===false &&
      claim.predicate===(channel==='visible_stems'?'career_conclusion':'career_context'),
    'subtype or consumer-outcome authority was changed');
    const ref=claim.ruleRefs[0];
    const rule=registry.rules.find(x=>x.ruleId===ref?.ruleId &&
      x.version===ref.version && x.output.claimType===claim.claimType &&
      x.methodologyRef.id===claim.methodologyRef.id &&
      x.status==='research');
    const evaluation=execution.evaluations.find(x=>x.evaluationId===ref?.evaluationId);
    assert(rule && claim.ruleRefs.length===1 && evaluation?.status==='matched' &&
      evaluation.emittedClaimIds.includes(claim.claimId) &&
      claim.sourceRefs.length>0 &&
      claim.sourceRefs.every(x=>registry.sources.some(s=>s.sourceId===x)) &&
      claim.factRefs.includes('derivedFacts.tenGods') &&
      claim.methodologyRef.version===CAREER_NATAL_READING_CANDIDATE_VERSION,
    'selected T8 must have actual matched rule, fact and source references');
    const slots=channel==='visible_stems'
      ? ['year','month','hour'] as const : ['year','month','day','hour'] as const;
    const key=channel==='visible_stems'?'stem':'branch';
    const matched=slots.flatMap(slot=>{
      const observation=fact.value[slot][key];
      return observation?.status==='resolved' && observation.value===god
        ? [{position:slot+' '+key+' '+god,
           path:'derivedFacts.tenGods.value.'+slot+'.'+key+'.value'}] : [];
    });
    assert(matched.length>0, 'no actual same-chart exact subtype/channel position');
    const item: SourceBoundedCareerT8Observation = {
      claimId:claim.claimId, claimType:claim.claimType,
      ruleId:rule.ruleId, sourceIds:[...claim.sourceRefs],
      methodologyId:claim.methodologyRef.id, tenGod:god, channel,
      interpretationKind:spec.kind,
      positions:matched.map(x=>x.position),
      factPaths:matched.map(x=>x.path),
      replacesMultifactorCore:false,
      authorizesOccupationOrIncomeOutcome:false,
    };
    if(channel==='visible_stems')directVisibleStemT8.push(item);
    else supportingBranchT8.push(item);
  }
  return {
    snapshotId:snapshot.snapshotId,calculationHash:snapshot.calculationHash,
    directVisibleStemT8,supportingBranchT8,
    researchOnly:true,mayPublish:false,maySell:false,
    mayConcludeCareerOutcome:false,
  };
}
