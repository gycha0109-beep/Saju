import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import { deterministicContentHash, type ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  buildNatalN13StructuralResearchReading,
  type NatalN13ResearchSentence,
} from './general-natal-t8-structural-reading-draft.js';

export const GENERAL_NATAL_N20_MIXED_RELATIONS_VERSION =
  'saju-n20-source-bounded-mixed-relation-observation-v1' as const;

type Family = 'peer' | 'output' | 'wealth' | 'officer' | 'resource';

interface MixedPattern {
  first: string;
  second: string;
  shared: Family;
  families: readonly [Family, Family, Family];
}

const PATTERNS: readonly MixedPattern[] = [
  {
    first: 'OUTPUT-TO-WEALTH', second: 'PEER-TO-WEALTH-ADVERSE',
    shared: 'wealth', families: ['output', 'wealth', 'peer'],
  },
  {
    first: 'OFFICER-TO-RESOURCE', second: 'WEALTH-RESOURCE-CONFLICT',
    shared: 'resource', families: ['officer', 'resource', 'wealth'],
  },
];

const FAMILY_LABEL: Readonly<Record<Family, string>> = {
  peer: '겁재', output: '식상', wealth: '재성', officer: '관성', resource: '인성',
};
const SLOT_LABEL = { year: '연주', month: '월주', day: '일주', hour: '시주' } as const;

export interface NatalN20ObservedFamily {
  family: Family;
  exactTenGodRequired: string | null;
  observed: readonly {
    factPath: string;
    slot: string;
    component: string;
    tenGod: string;
    display: string;
  }[];
}

export interface NatalN20MixedRelation {
  pattern: string;
  sharedFamily: Family;
  firstRelationId: string;
  secondRelationId: string;
  firstT8ClaimId: string;
  secondT8ClaimId: string;
  uniqueT5ClaimIds: readonly string[];
  factRefs: readonly string[];
  sourceLocators: readonly { sourceId: string; title: string; locator: string }[];
  observedFamilies: readonly NatalN20ObservedFamily[];
  locationFingerprint: string;
  structuralMeaningFingerprint: string;
  scenarioRef: string | null;
  text: string;
  relationCancellationInferred: false;
  transitiveCausalityInferred: false;
  realLifeOutcomeInferred: false;
  consumerProjectionAuthorized: false;
}

export interface NatalN20MixedRelationResearchReport {
  version: typeof GENERAL_NATAL_N20_MIXED_RELATIONS_VERSION;
  lifecycle: 'internal_research_only';
  mayPublish: false;
  maySell: false;
  mayAuthorizeInterpretation: false;
  snapshotId: string;
  calculationHash: string;
  relationCount: number;
  mixedPairCount: number;
  relationPatternSignature: string;
  locationSignature: string;
  mixedPairs: readonly NatalN20MixedRelation[];
  limitations: readonly string[];
}

function single(
  byId: ReadonlyMap<string, readonly NatalN13ResearchSentence[]>,
  relationId: string,
  scenarioRef: string | null,
): NatalN13ResearchSentence | undefined {
  const matches = (byId.get(relationId) ?? []).filter((x) => x.scenarioRef === scenarioRef);
  if (matches.length > 1) throw new TypeError('N20 duplicate source-bounded T8 pattern in scenario');
  return matches[0];
}

/**
 * Pair two independently emitted N13 T8 relations with different relation
 * kinds around the identical T5 anchor. This records co-presence only:
 * opposed relation *kinds* do not prove actual cancellation or life outcomes.
 * No alternative Rule Registry or novel T8 claim is created.
 */
export function buildNatalN20MixedRelationResearchReport(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
): NatalN20MixedRelationResearchReport {
  const base = buildNatalN13StructuralResearchReading(snapshot, execution, registry);
  const byId = new Map<string, NatalN13ResearchSentence[]>();
  for (const sentence of base.sentences) {
    if (!byId.has(sentence.relationId)) byId.set(sentence.relationId, []);
    byId.get(sentence.relationId)!.push(sentence);
  }
  const scenarios = [...new Set(base.sentences.map((x) => x.scenarioRef))].sort(
    (a, b) => (a ?? '').localeCompare(b ?? ''),
  );
  const mixedPairs: NatalN20MixedRelation[] = [];
  for (const scenarioRef of scenarios) {
    for (const pattern of PATTERNS) {
      const first = single(byId, pattern.first, scenarioRef);
      const second = single(byId, pattern.second, scenarioRef);
      if (!first || !second) continue;
      if (first.researchClaimId === second.researchClaimId ||
          first.scenarioRef !== second.scenarioRef ||
          !first.researchOnly || !second.researchOnly ||
          first.consumerProjectionAuthorized || second.consumerProjectionAuthorized) {
        throw new TypeError('N20 mixed pair has incompatible T8 evidence or authorization');
      }
      const sharedT5 = first.upstreamClaimRefs.filter((id) => second.upstreamClaimRefs.includes(id));
      const uniqueT5ClaimIds = [...new Set([...first.upstreamClaimRefs, ...second.upstreamClaimRefs])].sort();
      if (sharedT5.length !== 1 || uniqueT5ClaimIds.length !== 3) {
        throw new TypeError('N20 relations must share exactly one real T5 anchor Claim');
      }
      const evidence = [...first.observedPositions, ...second.observedPositions];
      const observedFamilies: NatalN20ObservedFamily[] = pattern.families.map((family) => {
        // Only exact 겁재, not other peer-family members, supports this
        // adverse relation. This distinction must survive into the reading.
        const exactTenGodRequired = family === 'peer' ? '겁재' : null;
        const unique = new Map(evidence
          .filter((p) => p.family === family &&
            (exactTenGodRequired === null || p.tenGod === exactTenGodRequired))
          .map((p) => [p.factPath + ':' + p.tenGod, p]));
        const observed = [...unique.values()]
          .sort((a, b) => a.factPath.localeCompare(b.factPath) || a.tenGod.localeCompare(b.tenGod))
          .map((p) => ({
            factPath: p.factPath,
            slot: p.slot,
            component: p.component,
            tenGod: p.tenGod,
            display: SLOT_LABEL[p.slot as keyof typeof SLOT_LABEL] +
              (p.component === 'stem' ? ' 천간 ' : ' 지지 대표 ') + p.tenGod,
          }));
        if (!observed.length) {
          throw new TypeError('N20 relation lacks exact actually observed family witness: ' + family);
        }
        return { family, exactTenGodRequired, observed };
      });
      const sources = new Map([...first.sourceLocators, ...second.sourceLocators]
        .map((x) => [x.sourceId, x]));
      if (sources.size < 2) throw new TypeError('N20 relations require actual classical source locators');
      const sourceLocators = [...sources.values()].sort((a, b) => a.sourceId.localeCompare(b.sourceId));
      const factRefs = [...new Set([...first.factRefs, ...second.factRefs])].sort();
      const locationFingerprint = deterministicContentHash(observedFamilies.map((f) => ({
        family: f.family, locations: f.observed.map((p) => [p.factPath, p.tenGod]),
      })));
      const structuralMeaningFingerprint = deterministicContentHash({
        firstRelationId: first.relationId, secondRelationId: second.relationId,
        sharedFamily: pattern.shared, scenarioRef,
      });
      const displayed = observedFamilies.map((family) =>
        FAMILY_LABEL[family.family] + ': ' + family.observed.map((p) => p.display).join(' · '));
      mixedPairs.push({
        pattern: pattern.first + '__' + pattern.second,
        sharedFamily: pattern.shared,
        firstRelationId: first.relationId,
        secondRelationId: second.relationId,
        firstT8ClaimId: first.researchClaimId,
        secondT8ClaimId: second.researchClaimId,
        uniqueT5ClaimIds, factRefs, sourceLocators, observedFamilies,
        locationFingerprint, structuralMeaningFingerprint, scenarioRef,
        text: '이 명식에서 고전의 ' + first.sourcePattern + ' 관계 후보와 ' +
          second.sourcePattern + ' 관계 후보가 각각 검출됩니다. ' +
          '둘은 ' + FAMILY_LABEL[pattern.shared] + ' 관측을 공유하지만 관계의 종류가 다릅니다. ' +
          '실제 십신 위치: ' + displayed.join(' / ') + '. ' +
          '이는 상반된 방향의 구조 관계가 공존한다는 연구 기록이며, ' +
          '서로 상쇄되거나 어느 쪽이 우세하다는 판단도, 개인의 재물·직업·관계·길흉 결과도 아닙니다.',
        relationCancellationInferred: false,
        transitiveCausalityInferred: false,
        realLifeOutcomeInferred: false,
        consumerProjectionAuthorized: false,
      });
    }
  }
  mixedPairs.sort((a, b) =>
    a.pattern.localeCompare(b.pattern) || (a.scenarioRef ?? '').localeCompare(b.scenarioRef ?? ''));
  if (new Set(mixedPairs.map((p) => p.pattern + '@' + p.scenarioRef)).size !== mixedPairs.length) {
    throw new TypeError('N20 duplicate mixed relation');
  }
  return {
    version: GENERAL_NATAL_N20_MIXED_RELATIONS_VERSION,
    lifecycle: 'internal_research_only',
    mayPublish: false, maySell: false, mayAuthorizeInterpretation: false,
    snapshotId: base.snapshotId, calculationHash: base.calculationHash,
    relationCount: base.relationCount, mixedPairCount: mixedPairs.length,
    relationPatternSignature: deterministicContentHash(
      mixedPairs.map((p) => p.structuralMeaningFingerprint).sort(),
    ),
    locationSignature: deterministicContentHash(
      mixedPairs.map((p) => p.locationFingerprint).sort(),
    ),
    mixedPairs,
    limitations: [
      'N20 reuses two actually emitted source-bounded T8s and a single identical T5 anchor; it does not create a new Rule or Claim.',
      'Relations of different kinds can co-occur. Their intensity, polarity, dominance or cancellation is not established.',
      'Only exact 겁재 satisfies the peer-to-wealth adverse relation; mere 비견 is not sufficient.',
      'Research, independent review, claim-scoped Preview admission, Production authorization and commerce remain HOLD.',
    ],
  };
}
