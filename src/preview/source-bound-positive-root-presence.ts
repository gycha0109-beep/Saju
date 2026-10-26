import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import {
  evaluateJiaYiWoodBoundedRootPresenceEvidence,
  GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_SOURCE,
  GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_DEFINITION_HASH,
} from '../research/general-natal-jia-yi-wood-bounded-root-presence-authority.js';
import {
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_SOURCE,
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_DEFINITION_HASH,
} from '../research/general-natal-bounded-sizhu-root-presence-evidence-authority.js';
import {
  GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_SOURCE,
  GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_DEFINITION_HASH,
} from '../research/general-natal-bounded-sizhu-yang-changsheng-root-presence-authority.js';
import {
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_SOURCE,
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_DEFINITION_HASH,
} from '../research/general-natal-bounded-sizhu-four-yang-lu-root-presence-authority.js';

/** Pre-existing research method, not an added T8 Claim or completed strength classifier. */
export const NATAL_BOUNDED_POSITIVE_ROOT_READING_VERSION =
  '0.1.0-internal-source-observation' as const;

export interface BoundedPositiveRootWitness {
  pillar: 'year'|'month'|'day'|'hour';
  branch: string;
  sourceRootKind: string;
  observedFactPath: string;
  dayMasterFactPath: 'derivedFacts.dayMaster';
  sourceId: string;
  sourceAuthorityId: 'R121_BASE_ROOT'|'R121_YANG_CHANGSHENG'|
    'R121_FOUR_YANG_LU'|'R121_JIA_YI_WOOD';
  methodologyDefinitionHash: string;
  /** Source-root wording is not an authorized final strong/weak verdict. */
  sourceDisposition: string | null;
  claimEmissionAuthorized: false;
  fullRootSettlementAuthorized: false;
  strengthVerdictAuthorized: false;
}

export interface BoundedPositiveRootResearchReading {
  version: typeof NATAL_BOUNDED_POSITIVE_ROOT_READING_VERSION;
  snapshotId: string;
  calculationHash: string;
  state: 'bounded_positive_observed'|'no_bounded_positive_evidence'|'calculation_unresolved';
  witnesses: readonly BoundedPositiveRootWitness[];
  mayInferNegativeRoot: false;
  mayCallStrongWeak: false;
  maySetYongshin: false;
  mayEstablishPattern: false;
  mayPublish: false;
  maySell: false;
  researchOnly: true;
}

const SOURCE_BY_ROOT_KIND = {
  '旺': {
    sourceId:GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_SOURCE.url,
    sourceAuthorityId:'R121_BASE_ROOT',
    methodologyDefinitionHash:GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_DEFINITION_HASH,
  },
  '墓庫': {
    sourceId:GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_SOURCE.url,
    sourceAuthorityId:'R121_BASE_ROOT',
    methodologyDefinitionHash:GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_DEFINITION_HASH,
  },
  '餘氣': {
    sourceId:GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_SOURCE.url,
    sourceAuthorityId:'R121_BASE_ROOT',
    methodologyDefinitionHash:GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_DEFINITION_HASH,
  },
  '長生': {
    sourceId:GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_SOURCE.url,
    sourceAuthorityId:'R121_YANG_CHANGSHENG',
    methodologyDefinitionHash:GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_DEFINITION_HASH,
  },
  '祿': {
    sourceId:GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_SOURCE.url,
    sourceAuthorityId:'R121_FOUR_YANG_LU',
    methodologyDefinitionHash:GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_DEFINITION_HASH,
  },
  'selected_source_explicit_wood_root_presence': {
    sourceId:GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_SOURCE.url,
    sourceAuthorityId:'R121_JIA_YI_WOOD',
    methodologyDefinitionHash:GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_DEFINITION_HASH,
  },
} as const;

function assert(v:unknown,reason:string):asserts v {
  if (!v) throw new TypeError('Bounded positive root source: '+reason);
}

/**
 * Reads the *existing* governed R121/Jia-Yi-Wood positive-only authority.
 * Every witness is tied to resolved canonical day-master and pillar branches.
 * No competing calculation, ordinal strength score, T8 or production authority.
 */
export function buildBoundedPositiveRootResearchReading(
  snapshot:CanonicalSajuSnapshot,
):BoundedPositiveRootResearchReading {
  const dayMaster=snapshot.derivedFacts.dayMaster;
  const slots=['year','month','day','hour'] as const;
  const branches:Partial<Record<typeof slots[number],string>>={};
  for(const slot of slots) {
    const pillar=snapshot.pillars[slot];
    if(pillar.status==='resolved') branches[slot]=pillar.value.branch.value;
  }
  if(dayMaster.status!=='resolved') {
    return {
      version:NATAL_BOUNDED_POSITIVE_ROOT_READING_VERSION,
      snapshotId:snapshot.snapshotId,calculationHash:snapshot.calculationHash,
      state:'calculation_unresolved',witnesses:[],
      mayInferNegativeRoot:false,mayCallStrongWeak:false,maySetYongshin:false,
      mayEstablishPattern:false,mayPublish:false,maySell:false,researchOnly:true,
    };
  }
  const evalResult=evaluateJiaYiWoodBoundedRootPresenceEvidence(
    dayMaster.value,
    Object.fromEntries(slots.filter(slot=>branches[slot]!==undefined)
      .map(slot=>[slot,branches[slot]])) as Parameters<
        typeof evaluateJiaYiWoodBoundedRootPresenceEvidence>[1],
  );
  assert(evalResult.authority==='research_only' &&
    evalResult.sizhuHasRootSettled===false &&
    evalResult.absenceMeansNoRoot===false &&
    evalResult.observationCountSemanticsAssigned===false &&
    evalResult.positionWeightAssigned===false,
  'source-licensed positive evidence was promoted to a final classifier');
  const witnesses=evalResult.observations.map(observation=>{
    const branch=branches[observation.pillarSlot];
    assert(branch===observation.branch &&
      snapshot.pillars[observation.pillarSlot].status==='resolved' &&
      observation.authority==='research_only',
    'root observation must match exact canonical pillar branch');
    const provenance=SOURCE_BY_ROOT_KIND[observation.sourceRootKind];
    assert(provenance !== undefined && provenance.methodologyDefinitionHash.length===64,
    'root observation has no matching governed source-method definition');
    const sourceDisposition='sourceDisposition' in observation ?
      String(observation.sourceDisposition):null;
    return {
      pillar:observation.pillarSlot,branch:observation.branch,
      sourceRootKind:observation.sourceRootKind,
      observedFactPath:'pillars.'+observation.pillarSlot+'.value.branch.value',
      dayMasterFactPath:'derivedFacts.dayMaster' as const,
      ...provenance,
      sourceDisposition,
      claimEmissionAuthorized:false as const,
      fullRootSettlementAuthorized:false as const,
      strengthVerdictAuthorized:false as const,
    };
  });
  return {
    version:NATAL_BOUNDED_POSITIVE_ROOT_READING_VERSION,
    snapshotId:snapshot.snapshotId,calculationHash:snapshot.calculationHash,
    state:witnesses.length?'bounded_positive_observed':'no_bounded_positive_evidence',
    witnesses,
    mayInferNegativeRoot:false,mayCallStrongWeak:false,maySetYongshin:false,
    mayEstablishPattern:false,mayPublish:false,maySell:false,researchOnly:true,
  };
}
