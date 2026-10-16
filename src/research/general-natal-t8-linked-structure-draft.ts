import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import { deterministicContentHash, type ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  buildNatalN13StructuralResearchReading,
} from './general-natal-t8-structural-reading-draft.js';

export const GENERAL_NATAL_N14_LINKED_T8_RESEARCH_VERSION =
  'saju-n14-linked-t8-research-composition-v1' as const;
export const GENERAL_NATAL_N19_POSITION_WITNESS_VERSION =
  'saju-n19-position-anchored-t8-research-observation-v1' as const;

type ChainFamily = 'output' | 'wealth' | 'officer' | 'resource';
type SupportedEdge = {
  relationId: string;
  from: ChainFamily;
  to: ChainFamily;
};
const SUPPORTED_GENERATING_EDGES: readonly SupportedEdge[] = [
  {relationId:'OUTPUT-TO-WEALTH',from:'output',to:'wealth'},
  {relationId:'WEALTH-TO-OFFICER',from:'wealth',to:'officer'},
  {relationId:'OFFICER-TO-RESOURCE',from:'officer',to:'resource'},
];
const FAMILY_LABEL: Readonly<Record<ChainFamily,string>> = {
  output:'식상',wealth:'재성',officer:'관성',resource:'인성',
};
const SLOT_LABEL = {year:'연주',month:'월주',day:'일주',hour:'시주'} as const;

export interface NatalN19PositionWitness {
  family: ChainFamily;
  familyLabel: string;
  positions: readonly {
    slot: string;
    component: string;
    tenGod: string;
    factPath: string;
    display: string;
  }[];
}
const BY_RELATION = new Map(SUPPORTED_GENERATING_EDGES.map((e) => [e.relationId,e]));

export interface NatalN14LinkedStructureDraft {
  researchKey: string;
  researchFingerprint: string;
  bridgeFamily: ChainFamily;
  firstRelationId: string;
  secondRelationId: string;
  firstT8ClaimId: string;
  secondT8ClaimId: string;
  independentUpstreamT5ClaimRefs: readonly string[];
  factRefs: readonly string[];
  sourceLocators: readonly {sourceId:string;title:string;locator:string}[];
  observedPositionFacts: readonly string[];
  positionWitnesses: readonly NatalN19PositionWitness[];
  positionEvidenceFingerprint: string;
  text: string;
  scenarioRef: string | null;
  transitiveCausalInferenceAuthorized: false;
  modernConsumerInferenceAuthorized: false;
  publicationAuthorized: false;
}

export interface NatalN14LinkedStructureResearchReport {
  version: typeof GENERAL_NATAL_N14_LINKED_T8_RESEARCH_VERSION;
  positionProjectionVersion: typeof GENERAL_NATAL_N19_POSITION_WITNESS_VERSION;
  status:'research_only';
  mayExposeAsConsumerInterpretation:false;
  mayApproveNewResearchRule:false;
  mayPromoteProduction:false;
  snapshotId:string;
  calculationHash:string;
  individualRelationCount:number;
  linkedPairCount:number;
  linkedSemanticSignature:string;
  linkedPositionSignature:string;
  linkedPairs:readonly NatalN14LinkedStructureDraft[];
  limitations:readonly string[];
}

/**
 * This is *not* transitive closure or a new T8 Claim. It only records a
 * two-edge observation where two independently evaluated generating T8
 * relations share exactly one middle Ten-God family in one scenario.
 * Neither a third A→C relation nor an outcome is inferred.
 */
export function buildNatalN14LinkedT8ResearchReport(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
): NatalN14LinkedStructureResearchReport {
  const n13 = buildNatalN13StructuralResearchReading(snapshot,execution,registry);
  const links: NatalN14LinkedStructureDraft[] = [];
  for (const left of n13.sentences) {
    const a = BY_RELATION.get(left.relationId);
    if (!a) continue;
    for (const right of n13.sentences) {
      const b = BY_RELATION.get(right.relationId);
      if (!b || a.to !== b.from || a.relationId === b.relationId ||
          left.scenarioRef !== right.scenarioRef ||
          left.researchClaimId === right.researchClaimId) continue;
      // N13 checked both original T8s, two distinct upstream T5 Claims,
      // source locators, and source/position/snapshot authorization boundaries.
      const upstream = [...new Set([...left.upstreamClaimRefs,...right.upstreamClaimRefs])].sort();
      const commonT5 = left.upstreamClaimRefs.filter((id) => right.upstreamClaimRefs.includes(id));
      if (commonT5.length !== 1 || upstream.length !== 3) {
        throw new TypeError('N14 linked relation must share exactly one real T5 middle-family Claim');
      }
      const sourceMap = new Map([...left.sourceLocators,...right.sourceLocators]
        .map((source) => [source.sourceId,source]));
      const sources = [...sourceMap.values()].sort((p,q) => p.sourceId.localeCompare(q.sourceId));
      if (sources.length < 2) throw new TypeError('N14 linked structure requires real source locators');
      const observedPositionFacts = [...new Set([
        ...left.observedPositions.map((p) => p.factPath+':'+p.tenGod),
        ...right.observedPositions.map((p) => p.factPath+':'+p.tenGod),
      ])].sort();
      // Exactly three already-validated T5 families. The positions are
      // projections of N13's real resolved T0 witnesses, not new relations.
      const positionWitnesses: NatalN19PositionWitness[] = [a.from,a.to,b.to].map((family) => {
        const found = new Map([...left.observedPositions,...right.observedPositions]
          .filter((p) => p.family === family)
          .map((p) => [p.factPath + ':' + p.tenGod, p]));
        const positions = [...found.values()].sort((x,y) =>
          x.factPath.localeCompare(y.factPath) || x.tenGod.localeCompare(y.tenGod))
          .map((p) => ({
            slot:p.slot,
            component:p.component,
            tenGod:p.tenGod,
            factPath:p.factPath,
            display:SLOT_LABEL[p.slot as keyof typeof SLOT_LABEL] +
              (p.component === 'stem' ? ' 천간 ' : ' 지지 대표 ') + p.tenGod,
          }));
        if (positions.length === 0) {
          throw new TypeError('N19 linked T8 family has no resolved source-bound position');
        }
        return { family, familyLabel:FAMILY_LABEL[family], positions };
      });
      const positionEvidenceFingerprint = deterministicContentHash(
        positionWitnesses.map((group) => ({
          family:group.family,
          locations:group.positions.map((p) => [p.factPath,p.tenGod]),
        })),
      );
      const chartPositions = positionWitnesses.map((group) =>
        group.familyLabel + ': ' + group.positions.map((p) => p.display).join(' · '))
        .join(' / ');
      const pairIdentity = {
        first:left.relationId,second:right.relationId,
        bridge:a.to,scenario:left.scenarioRef,
      };
      links.push({
        researchKey:'GENERAL_NATAL_N14_LINKED_' + left.relationId.replaceAll('-','_') +
          '__' + right.relationId.replaceAll('-','_'),
        researchFingerprint:deterministicContentHash(pairIdentity),
        bridgeFamily:a.to,
        firstRelationId:left.relationId,
        secondRelationId:right.relationId,
        firstT8ClaimId:left.researchClaimId,
        secondT8ClaimId:right.researchClaimId,
        independentUpstreamT5ClaimRefs:upstream,
        factRefs:[...new Set([...left.factRefs,...right.factRefs])].sort(),
        sourceLocators:sources,
        observedPositionFacts,
        positionWitnesses,
        positionEvidenceFingerprint,
        text:FAMILY_LABEL[a.from]+'→'+FAMILY_LABEL[a.to]+' 관계 후보와 ' +
          FAMILY_LABEL[b.from]+'→'+FAMILY_LABEL[b.to]+' 관계 후보가 같은 명식에서 각각 관측됩니다. ' +
          '두 후보는 '+FAMILY_LABEL[a.to]+' 계열의 관측을 공유합니다. ' +
          '이 명식에서 실제 계산된 십신 위치는 '+chartPositions+'입니다. ' +
          '이는 관측 위치를 그대로 적은 것이지 세 계열 간 효과의 크기나 우세를 평가하지 않습니다. ' +
          '이것은 두 관계가 공존한다는 연구용 구조 기록일 뿐, ' +
          FAMILY_LABEL[a.from]+'에서 '+FAMILY_LABEL[b.to]+'으로 이어지는 인과 흐름이나 ' +
          '성격·직업·재물·사건·길흉을 확정하지 않습니다.',
        scenarioRef:left.scenarioRef,
        transitiveCausalInferenceAuthorized:false,
        modernConsumerInferenceAuthorized:false,
        publicationAuthorized:false,
      });
    }
  }
  links.sort((a,b) => a.researchKey.localeCompare(b.researchKey) ||
    (a.scenarioRef??'').localeCompare(b.scenarioRef??''));
  if (new Set(links.map((p) => p.researchKey+'@'+String(p.scenarioRef))).size !== links.length) {
    throw new TypeError('N14 duplicate composition identity');
  }
  return {
    version:GENERAL_NATAL_N14_LINKED_T8_RESEARCH_VERSION,
    positionProjectionVersion:GENERAL_NATAL_N19_POSITION_WITNESS_VERSION,
    status:'research_only',
    mayExposeAsConsumerInterpretation:false,
    mayApproveNewResearchRule:false,
    mayPromoteProduction:false,
    snapshotId:n13.snapshotId,
    calculationHash:n13.calculationHash,
    individualRelationCount:n13.relationCount,
    linkedPairCount:links.length,
    linkedSemanticSignature:deterministicContentHash(links.map((x) => x.researchFingerprint).sort()),
    linkedPositionSignature:deterministicContentHash(links.map((x) => x.positionEvidenceFingerprint).sort()),
    linkedPairs:links,
    limitations:[
      'Only two independently emitted existing T8 generating relations with the same T5 middle-family Claim may be co-presented.',
      'N19 position details are exact observed Ten-God labels and paths, not chart strength, predicted outcomes or new causal meaning.',
      'The two-edge graph observation is not transitive closure and does not authorize a new T8 consumer conclusion.',
      'Provenance, independent reviewer trust, Preview semantic bridge, Production authorization and sale remain HOLD.',
    ],
  };
}
