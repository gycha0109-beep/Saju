import type { CanonicalSajuSnapshot, PillarSlot, TenGod } from '../contracts/calculation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import type { ProductReadingResponse } from '../reading/product-reading-response.js';
import { GENERAL_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 } from
  '../reading/official-reading-detailed-presentation-general.js';

export const NATAL_N27_SELF_SERVICE_EVIDENCE_READING_VERSION =
  'saju-natal-n27-self-service-chart-theme-preview-v1' as const;

const SLOTS = ['hour', 'month', 'year', 'day'] as const satisfies readonly PillarSlot[];
const NAMES: Readonly<Record<PillarSlot,string>> = Object.freeze({
  year: '연주', month: '월주', day: '일주', hour: '시주',
});
const FAMILIES: Readonly<Record<string,readonly TenGod[]>> = Object.freeze({
  PEER: ['비견','겁재'],
  RESOURCE: ['편인','정인'],
  OUTPUT: ['식신','상관'],
  WEALTH: ['편재','정재'],
  OFFICER: ['편관','정관'],
});
const THEME = /^GENERAL_NATAL_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u;
const TITLE = '명식별 십신 주제 연결 · 자동 실험 풀이';

/**
 * Self-service, evidence-bound interpretation UX. It joins observed *existing*
 * T8 themes with same-snapshot precise Ten-God locations and existing
 * detailed-profile prose. No external reviewer dependency, invented Claim,
 * new relation, strength verdict, fate prediction or Production permission.
 */
export function attachNatalN27SelfServiceEvidenceReading(
  response: ProductReadingResponse,
  snapshot: CanonicalSajuSnapshot,
  interpretation: InterpretationExecutionResult,
): ProductReadingResponse {
  if (response.state !== 'delivered' && response.state !== 'delivered_with_fallback') {
    return response;
  }
  const reading = response.reading;
  if (!reading || !reading.subject.birthInputDisplay.timeKnown ||
      !snapshot.completeness.birthTimeKnown ||
      snapshot.snapshotId !== interpretation.run.snapshotId ||
      snapshot.derivedFacts.tenGods.status !== 'resolved') return response;
  if (reading.sections.some(section => section.title === TITLE)) return response;

  for (const slot of ['year','month','day','hour'] as const) {
    const pillar = snapshot.pillars[slot];
    const display = reading.calculationSummary.pillars[slot];
    if (pillar.status !== 'resolved' || display.status !== 'resolved' ||
        display.value !== `${pillar.value.stem.value}${pillar.value.branch.value} (${pillar.value.stem.hanja}${pillar.value.branch.hanja})`) {
      return response; // No mixing of different users/charts.
    }
  }
  const profiles = new Map(GENERAL_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1
    .filter(profile => THEME.test(profile.claimType))
    .map(profile => [profile.claimType, profile]));
  const units: { key:string; order:number; text:string }[] = [];
  const seen = new Set<string>();
  for (const claim of interpretation.claims) {
    if (claim.state !== 'active' || claim.taxonomy.tier !== 'T8' ||
        claim.taxonomy.category !== 'general') continue;
    const match = THEME.exec(claim.claimType);
    if (!match || seen.has(claim.claimType)) continue;
    const family = FAMILIES[match[1]!];
    const profile = profiles.get(claim.claimType);
    if (!family || !profile || profile.methodologyRef.version !== claim.methodologyRef.version ||
        profile.methodologyRef.id !== claim.methodologyRef.id ||
        !profile.standardText.summary || !profile.standardText.headline) continue;
    const component = match[2] === 'VISIBLE_STEMS' ? 'stem' : 'branch';
    const positions = SLOTS.flatMap((slot,i) => {
      const fact = snapshot.derivedFacts.tenGods.value[slot][component];
      if (fact?.status !== 'resolved' || !family.includes(fact.value as TenGod)) return [];
      return [{ slot, order:i, tenGod:fact.value as TenGod }];
    });
    if (positions.length === 0) continue;
    const highest = positions[0]!;
    const label = component === 'stem' ? '천간' : '지지 대표 십신';
    const where = positions.map(p => `${NAMES[p.slot]} ${label} ${p.tenGod}`).join(' · ');
    // The only semantic copy is the existing detailed source profile. "Where"
    // is a calculation receipt, not a new character/fortune statement.
    units.push({
      key: claim.claimType,
      order: highest.order,
      text: `${where}가 이 명식에서 확인됩니다. 전통적 주제는 ‘${profile.standardText.headline}’입니다. ${profile.standardText.summary} 위치와 주제의 연결은 참고용이며, 이것만으로 개인의 성격이나 사건의 결과를 단정하지 않습니다.`,
    });
    seen.add(claim.claimType);
  }
  if (units.length === 0) return response;
  units.sort((a,b) => a.order-b.order || a.key.localeCompare(b.key));
  const selected = units.slice(0, 5);
  return {
    ...response,
    reading: {
      ...reading,
      sections: [
        ...reading.sections,
        {
          sectionType: 'structure',
          title: TITLE,
          state: 'complete',
          blocks: [
            { type:'paragraph', text:
              '같은 명식에서 실제 발행된 십신 주제와 계산된 위치를 연결한 자동 실험 풀이입니다. 검증되지 않은 새 인과관계나 겁재→재성의 금전 결과를 추정하지 않습니다.' },
            ...selected.map(unit => ({type:'paragraph' as const,text:unit.text})),
          ],
        },
      ],
      disclosures: [
        ...reading.disclosures,
        { type:'scope_limitation', text:
          '자동 실험 풀이: 이미 있는 전통 주제의 재배열과 명식 위치 설명이며 독립된 전문가 승인, 운세 결과 판정 또는 Production 해석 승인이 아닙니다.' },
      ],
    },
  };
}
