import type { ReadingSectionView, ExplainabilityIndex } from '../contracts/reading.js';
import type { CanonicalReadingSemanticBundleV1, CanonicalReadingSemanticUnitV1 } from './canonical-reading-semantics.js';

export const OFFICIAL_WEALTH_CHAPTER_SYNTHESIS_VERSION_V1 =
  'myeongha-official-wealth-natal-chapter-synthesis-v1' as const;

type Topic = 'value_creation' | 'spending' | 'management' | 'friction';
type EvidenceEntry = ExplainabilityIndex['entries'][number];
const ORDER: readonly Topic[] = ['value_creation','spending','management','friction'];
const LABELS: Record<Topic,string> = {
  value_creation:'가치가 만들어지는 방식', spending:'돈을 쓰는 기준',
  management:'자원을 관리하는 원칙', friction:'선택이 충돌하는 지점',
};

/** Approved interpretations are not added or rewritten here. These are questions
 * for reading TWO already-issued, independently grounded Wealth conclusions together.
 * The questions are not a new fortune, financial instruction or T8 claim.
 */
const PAIR_QUESTIONS: Readonly<Record<string,string>> = Object.freeze({
  'value_creation|spending':'지금 만들고 있는 결과물의 쓰임을 확인하는 일과, 그 일을 위해 자원을 쓰는 일은 각각 어떤 기준으로 판단해야 할까요?',
  'value_creation|management':'결과물을 만들고 가치를 확인하는 단계와, 확인한 뒤 자원을 관리하는 단계를 어떻게 구분할 수 있을까요?',
  'value_creation|friction':'가치를 만들기 위한 선택과 지금 지킬 수 있는 현실적 기준이 다르다면, 어느 지점부터 조정해야 할까요?',
  'spending|management':'지출 자체가 필요한 이유와 지출 후에도 유지해야 할 관리 기준을 각각 적어 본다면 무엇이 달라질까요?',
  'spending|friction':'선택권을 위한 지출과 실제 비용 사이에서 반드시 지킬 기준과 조정할 기준을 어떻게 나눌 수 있을까요?',
  'management|friction':'미리 정한 관리 원칙과 지금의 선택이 충돌한다면, 원칙을 바꿀지 선택을 바꿀지 무엇부터 확인해야 할까요?',
});

function topicOf(unit: CanonicalReadingSemanticUnitV1): Topic | undefined {
  if (unit.role !== 'primary' || unit.scenarioRef !== undefined ||
      unit.taxonomy.tier !== 'T8' || unit.taxonomy.category !== 'wealth' ||
      unit.predicate !== 'wealth_conclusion' ||
      !unit.claimType.startsWith('WEALTH_NATAL_CONCLUSION_') ||
      unit.sourceRefs.length === 0 || unit.upstreamClaimRefs.length === 0 ||
      !unit.canonicalText?.headline?.trim() || !unit.canonicalText.summary?.trim()) return undefined;
  const value = unit.semanticPayload;
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return undefined;
  const kind = (value as {wealthKind?:unknown}).wealthKind;
  return ORDER.find(topic => topic === kind);
}

function sourceDepth(unit: CanonicalReadingSemanticUnitV1): number {
  const value = unit.semanticPayload;
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return 0;
  const families = (value as {families?:unknown}).families;
  return Array.isArray(families) ? families.length : 0;
}

function citedRef(
  unit: CanonicalReadingSemanticUnitV1,
  entries: readonly EvidenceEntry[],
): string | undefined {
  const matches = entries.filter(entry =>
    entry.primaryUnitRefs?.length === 1 && entry.primaryUnitRefs[0] === unit.unitId &&
    entry.claimIds.includes(unit.claimId) &&
    entry.sourceIds.length > 0 &&
    entry.methodologyIds.length > 0,
  );
  return matches.length === 1 ? matches[0]!.explainabilityRef : undefined;
}

/** Integrate directly with Official Reading's existing signed section contract.
 * Adds a cited cross-chapter reading lens ONLY when at least two distinct
 * already-selected official Wealth meanings can be traced to their exact
 * Claim/evidence. Never fills a missing claim or overwrites existing sections.
 */
export function composeOfficialWealthNatalChaptersV1(input: Readonly<{
  bundle: CanonicalReadingSemanticBundleV1;
  sections: readonly ReadingSectionView[];
  explainability: ExplainabilityIndex;
}>): readonly ReadingSectionView[] {
  if (input.bundle.intent.domain !== 'wealth' ||
      input.bundle.intent.temporalScope !== 'natal') return input.sections;

  const selected = new Set(input.bundle.targetClaimIds);
  const primary = input.bundle.units.filter(unit => selected.has(unit.claimId) && topicOf(unit));
  const conflictingPairs = new Set(input.bundle.claimRelations
    .filter(relation => relation.relation === 'contradicts')
    .map(relation => [relation.fromClaimId,relation.toClaimId].sort().join('|')));
  const byTopic = new Map<Topic,{unit:CanonicalReadingSemanticUnitV1;ref:string}>();
  for (const topic of ORDER) {
    const candidates = primary.filter(unit =>
      topicOf(unit) === topic)
      .map(unit => ({unit,ref:citedRef(unit,input.explainability.entries)}))
      .filter((item):item is {unit:CanonicalReadingSemanticUnitV1;ref:string} =>
        item.ref !== undefined)
      .sort((a,b)=> sourceDepth(b.unit)-sourceDepth(a.unit) ||
        a.unit.claimType.localeCompare(b.unit.claimType));
    if (candidates[0] !== undefined) byTopic.set(topic,candidates[0]);
  }
  if (byTopic.size < 2) return input.sections;

  const pairs: {refs:string[];text:string}[] = [];
  for(let i=0;i<ORDER.length;i++) for(let j=i+1;j<ORDER.length;j++) {
    const left=ORDER[i]!,right=ORDER[j]!;
    const first=byTopic.get(left),second=byTopic.get(right);
    if(!first||!second) continue;
    if (conflictingPairs.has([first.unit.claimId,second.unit.claimId].sort().join('|'))) continue;
    const question=PAIR_QUESTIONS[left+'|'+right];
    if(!question) throw new TypeError('Missing approved Wealth chapter question');
    pairs.push({refs:[first.ref,second.ref],text:question});
  }
  if(pairs.length === 0) return input.sections;
  const topics=ORDER.filter(topic=>byTopic.has(topic));
  const representative=topics.slice(0,3).map(topic=>{
    const selected=byTopic.get(topic)!;
    return `${LABELS[topic]}: ${selected.unit.canonicalText!.headline}`;
  });
  const refs=[...new Set([...byTopic.values()].map(item=>item.ref))];
  const intro: ReadingSectionView = {
    sectionId:'official_wealth_chapter_01_evidence_synthesis_v1',
    sectionType:'overview',
    title:'01 · 재물운에서 먼저 구분할 판단',
    state:'complete',
    explainabilityRefs:refs,
    blocks:[
      {type:'paragraph',text:'이 명식에서 실제 근거가 선택된 재물 관점은 서로 다른 질문을 다룹니다. 한 문장으로 재물의 좋고 나쁨을 판정하기보다, 다음 관점들이 각각 어떤 선택을 설명하는지 분리해서 읽겠습니다.'},
      {type:'key_points',items:representative},
    ],
  };
  const outro: ReadingSectionView = {
    sectionId:'official_wealth_chapter_final_questions_v1',
    sectionType:'structure',
    title:'마지막 · 두 관점을 함께 점검할 질문',
    state:'complete',
    explainabilityRefs:[...new Set(pairs.flatMap(pair=>pair.refs))],
    blocks:[
      {type:'paragraph',text:'다음 질문은 위에서 실제 확인된 두 해석을 연결해 읽기 위한 점검입니다. 새로운 명리적 결론이나 돈이 들어오는 시기·수익의 예측은 아닙니다.'},
      {type:'key_points',items:pairs.slice(0,4).map(pair=>pair.text)},
    ],
  };
  const limitationIndex = input.sections.findIndex(section =>
    section.title==='해석 범위' ||
    section.blocks.some(block => block.type==='paragraph' &&
      block.text.includes('현재 근거 범위에서는')));
  const original = [...input.sections];
  if(limitationIndex<0) return [intro,...original,outro];
  original.splice(limitationIndex,0,outro);
  return [intro,...original];
}
