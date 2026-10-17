import type { CanonicalSajuSnapshot, PillarSlot, TenGod } from '../contracts/calculation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import type { ProductReadingResponse } from '../reading/product-reading-response.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { GENERAL_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 } from
  '../reading/official-reading-detailed-presentation-general.js';

export const NATAL_N27B_RECEIPT_AUDIT_VERSION =
  'saju-natal-n27b-autonomous-claim-receipt-integrity-v1' as const;
const TITLE = '명식별 십신 주제 연결 · 자동 실험 풀이';
const ORDER = ['hour', 'month', 'year', 'day'] as const satisfies readonly PillarSlot[];
const SLOT_LABEL: Record<PillarSlot,string> = {
  hour: '시주', month: '월주', year: '연주', day: '일주',
};
const FAMILIES: Readonly<Record<string,readonly TenGod[]>> = {
  PEER:['비견','겁재'], RESOURCE:['편인','정인'],
  OUTPUT:['식신','상관'], WEALTH:['편재','정재'], OFFICER:['편관','정관'],
};
const THEME = /^GENERAL_NATAL_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u;
function requireValid(condition: unknown, description: string): asserts condition {
  if (!condition) throw new TypeError('N27b autonomous receipt fail-closed: ' + description);
}

export interface NatalN27bClaimReceiptInput {
  snapshot: CanonicalSajuSnapshot;
  interpretation: InterpretationExecutionResult;
  originalHttpResponse: ProductReadingResponse;
  optInPreviewResponse: ProductReadingResponse;
}
export function auditNatalN27bClaimReceipts(input: NatalN27bClaimReceiptInput) {
  const {snapshot,interpretation,originalHttpResponse:base,optInPreviewResponse:reading}=input;
  requireValid(snapshot.snapshotId===interpretation.run.snapshotId,'execution must bind exact snapshot');
  requireValid(reading.responseId===base.responseId &&
    reading.state===base.state && reading.messageCode===base.messageCode,
    'opt-in must not rewrite original HTTP response contract');
  const before=base.reading, after=reading.reading;
  const section=after?.sections.filter(s=>s.title===TITLE) ?? [];
  requireValid(section.length<=1,'duplicate autonomous source section');
  const eligible=(base.state==='delivered'||base.state==='delivered_with_fallback') &&
    snapshot.completeness.birthTimeKnown && before?.subject.birthInputDisplay.timeKnown===true &&
    snapshot.derivedFacts.tenGods.status==='resolved';
  if(!eligible){
    requireValid(section.length===0,'unknown-time or nondelivered case generated autonomous meaning');
    requireValid(JSON.stringify(after)===JSON.stringify(before),'unqualified case modified');
    return Object.freeze({
      version:NATAL_N27B_RECEIPT_AUDIT_VERSION, snapshotId:snapshot.snapshotId,
      expectedClaims:0, checkedClaims:0, noUnqualifiedRendering:true,
      chartBoundSourceIntegrity:true, originalCopyPreserved:true,
      receiptHash:deterministicContentHash({snapshot:snapshot.calculationHash,empty:true}),
      claimReceipts:[],
    });
  }
  requireValid(before!==undefined&&after!==undefined,'delivered source reading missing');
  requireValid(JSON.stringify(after.subject)===JSON.stringify(before.subject)&&
    JSON.stringify(after.calculationSummary)===JSON.stringify(before.calculationSummary) &&
    after.readingId===before.readingId,'canonical displayed chart or identity changed');
  requireValid(JSON.stringify(after.sections.slice(0,before.sections.length))===
    JSON.stringify(before.sections),'existing original interpretation mutated');
  requireValid(after.sections.length===before.sections.length+1 ||
    (after.sections.length===before.sections.length&&section.length===0),
    'unknown new section inserted');
  const resolved=snapshot.derivedFacts.tenGods;
  requireValid(resolved.status==='resolved','missing source Ten-God facts');
  const profiles=new Map(GENERAL_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1
    .filter(p=>THEME.test(p.claimType)).map(p=>[p.claimType,p]));
  const active=interpretation.claims.filter(c=>
    c.state==='active' && c.taxonomy.tier==='T8' && c.taxonomy.category==='general' &&
    THEME.test(c.claimType));
  const all: {claimType:string; text:string; position:string; order:number;
    sourceIds:readonly string[]; ruleIds:readonly string[]}[]=[];
  const seen=new Set<string>();
  for(const claim of active){
    requireValid(!seen.has(claim.claimType),'duplicate active source T8 Claim type');
    seen.add(claim.claimType);
    const match=THEME.exec(claim.claimType);
    requireValid(match!==null,'claim pattern changed');
    const family=FAMILIES[match[1]!],p=profiles.get(claim.claimType);
    requireValid(family!==undefined&&p!==undefined,'unmapped family or source profile');
    requireValid(claim.methodologyRef.id===p.methodologyRef.id &&
      claim.methodologyRef.version===p.methodologyRef.version,
      'source version/methodology drift');
    requireValid(claim.ruleRefs.length>0&&claim.sourceRefs.length>0,
      'missing rule or source refs');
    const component=match[2]==='VISIBLE_STEMS'?'stem':'branch';
    const placements=ORDER.flatMap((slot,index)=>{
      const r=resolved.value[slot][component];
      return r?.status==='resolved'&&family.includes(r.value as TenGod)
        ? [{index,label:`${SLOT_LABEL[slot]} ${component==='stem'?'천간':'지지 대표 십신'} ${r.value}`}]
        : [];
    });
    requireValid(placements.length>0,'active T8 has no matching factual placement');
    const sourceText=p.standardText.summary, sourceTitle=p.standardText.headline;
    requireValid(typeof sourceText==='string'&&sourceText.length>0&&
      typeof sourceTitle==='string'&&sourceTitle.length>0,'source prose missing');
    const position=placements.map(x=>x.label).join(' · ');
    const text=`이 명식에서 확인된 십신 위치는 ${position}입니다. 전통적 주제는 ‘${sourceTitle}’입니다. ${sourceText} 각 십신 위치와 이 주제의 연결은 참고용이며, 이것만으로 개인의 성격이나 사건의 결과를 단정하지 않습니다.`;
    all.push({claimType:claim.claimType,text,position,order:placements[0]!.index,
      sourceIds:[...new Set(claim.sourceRefs)].sort(),
      ruleIds:[...new Set(claim.ruleRefs.map(x=>x.ruleId))].sort()});
  }
  all.sort((a,b)=>a.order-b.order||a.claimType.localeCompare(b.claimType));
  const bounded=all.slice(0,5);
  if(bounded.length===0){
    requireValid(section.length===0&&JSON.stringify(after)===JSON.stringify(before),
      'empty source claims fabricated reading');
  } else {
    requireValid(section.length===1,'source-owned T8 feature section absent');
    const actual=section[0]!;
    requireValid(actual.sectionType==='structure'&&actual.state==='complete' &&
      actual.blocks.length===1+bounded.length &&
      actual.blocks.every(x=>x.type==='paragraph'),
      'unexpected section shape');
    requireValid(actual.blocks.slice(1).every((b,i)=>
      b.type==='paragraph'&&b.text===bounded[i]?.text),
      'consumer prose does not exactly match Claim, subtype, source version and positions');
    requireValid(after.disclosures.length===before.disclosures.length+1 &&
      JSON.stringify(after.disclosures.slice(0,before.disclosures.length))===
      JSON.stringify(before.disclosures),'scope disclosure was mutated or omitted');
  }
  return Object.freeze({
    version:NATAL_N27B_RECEIPT_AUDIT_VERSION,snapshotId:snapshot.snapshotId,
    expectedClaims:bounded.length,checkedClaims:bounded.length,noUnqualifiedRendering:true,
    chartBoundSourceIntegrity:true,originalCopyPreserved:true,
    receiptHash:deterministicContentHash({
      chart:snapshot.calculationHash,
      bounded:bounded.map(x=>({claimType:x.claimType,position:x.position,sourceIds:x.sourceIds,
        ruleIds:x.ruleIds,text:x.text})),
    }),
    claimReceipts:bounded.map(x=>({
      claimType:x.claimType,position:x.position,
      sourceIds:x.sourceIds,ruleIds:x.ruleIds,
    })),
  });
}
