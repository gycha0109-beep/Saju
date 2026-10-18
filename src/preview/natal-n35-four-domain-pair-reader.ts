import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { NatalN31Domain, NatalN31DomainClaim } from './natal-n31-four-domain-claim-readings.js';
import {
  auditNatalN34FourDomainCopyContrasts,
  type NatalN34Case,
  type NatalN34Pair,
} from './natal-n34-four-domain-copy-contrast.js';

export const NATAL_N35_PAIR_READER_VERSION =
  'saju-n35-original-korean-copy-side-by-side-research-review-v1' as const;

const DOMAINS = [
  ['career','직업·일'],['wealth','재물·자원'],
  ['business','사업·실행'],['relationship','관계'],
] as const satisfies readonly (readonly [NatalN31Domain,string])[];

function guard(condition:unknown,reason:string):asserts condition {
  if(!condition)throw new TypeError('N35 original-copy comparison: '+reason);
}
function escapeHtml(value:string):string {
  return value.replace(/[&<>"']/gu,char=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;',
  })[char]!);
}
function claimHtml(claim:NatalN31DomainClaim):string {
  return '<article class="claim"><h5>'+escapeHtml(claim.headline)+'</h5>'+
    '<p>'+escapeHtml(claim.summary)+'</p>'+
    '<p class="fact">계산으로 확인된 위치: '+
    escapeHtml(claim.calculatedPositions.join(' · '))+'</p>'+
    '<details><summary>실제 원국·Rule·Source 근거</summary>'+
    '<p>Claim: '+escapeHtml(claim.claimId)+' / '+escapeHtml(claim.claimType)+'</p>'+
    '<p>Rule: '+escapeHtml(claim.claimRuleId)+'@'+
    escapeHtml(claim.claimRuleVersion)+'</p>'+
    '<p>Methodology: '+escapeHtml(claim.methodologyId)+'@'+
    escapeHtml(claim.methodologyVersion)+'</p>'+
    '<p>Narrative Profile version: '+escapeHtml(claim.profileVersion)+'</p>'+
    '<p>Source IDs: '+escapeHtml(claim.sourceIds.join(' · '))+'</p>'+
    '<p>Canonical fact paths: '+escapeHtml(claim.calculatedFactPaths.join(' · '))+
    '</p></details></article>';
}
function claimsFor(item:NatalN34Case,domain:NatalN31Domain):readonly NatalN31DomainClaim[] {
  const section=item.reading.firstScreen.sections.find(s=>s.domain===domain);
  const detail=item.reading.sections.find(s=>s.domain===domain);
  guard(section!==undefined&&detail!==undefined,'missing specialist domain '+domain);
  const claims=[...section.visibleClaims,...detail.additionalVerifiedClaims];
  guard(claims.length===section.eligibleClaimCount &&
    claims.length===detail.totalQualifiedOriginalCount,
    'unread or invented specialist original');
  return claims;
}
function readerSide(item:NatalN34Case,domain:NatalN31Domain):string {
  const claims=claimsFor(item,domain);
  return '<div class="side"><h4>'+escapeHtml(item.caseId)+'</h4>'+
    (claims.length>0 ? claims.map(claimHtml).join('') :
      '<p class="hold">해당 명식에서 출처와 연결된 연구 해석 없음 — 빈 문장을 채우지 않습니다.</p>')+
    '</div>';
}

/**
 * All 21 pairs are actual research receipts from the N34 35-case HTTP corpus.
 * Recomputes N34 independently; no new interpretation, semantic ranking or
 * Production/Commerce admission is possible through this HTML report.
 */
export function renderNatalN35FourDomainPairReader(
  cases:readonly NatalN34Case[],
  pairs:readonly NatalN34Pair[],
  expectedAudit:ReturnType<typeof auditNatalN34FourDomainCopyContrasts>,
):string {
  const recalculated=auditNatalN34FourDomainCopyContrasts(cases,pairs);
  guard(recalculated.pairCount===expectedAudit.pairCount &&
    recalculated.actualCaseCount===expectedAudit.actualCaseCount &&
    deterministicContentHash(recalculated)===deterministicContentHash(expectedAudit) &&
    !expectedAudit.mayPublish && !expectedAudit.maySell &&
    !expectedAudit.usefulComplete && !expectedAudit.independentHumanMeaningValidated,
    'original comparison result or research permission mismatch');
  const index=new Map(cases.map(item=>[item.caseId,item]));
  const pairHtml=recalculated.pairs.map((pair,i)=>{
    const left=index.get(pair.left),right=index.get(pair.right);
    guard(left!==undefined&&right!==undefined,'missing pair case');
    const panels=DOMAINS.map(([domain,label])=>{
      const classified=pair.domains.find(d=>d.domain===domain);
      guard(classified!==undefined,'missing classified domain');
      return '<section class="domain"><h3>'+escapeHtml(label)+' — '+
        escapeHtml(classified.difference)+'</h3>'+
        '<p class="scope">왼쪽 '+classified.leftClaimCount+'개 / 오른쪽 '+
        classified.rightClaimCount+'개. 기존 연구 Claim 원문만 표시합니다.</p>'+
        '<div class="columns">'+readerSide(left,domain)+readerSide(right,domain)+
        '</div></section>';
    }).join('');
    return '<details class="pair"><summary>'+String(i+1)+'/21 · '+
      escapeHtml(pair.left)+' ↔ '+escapeHtml(pair.right)+
      (pair.sameChart?' · 동일 입력 대조':' · 서로 다른 계산 명식')+
      '</summary>'+panels+'</details>';
  }).join('');
  return '<!doctype html><html lang="ko"><head><meta charset="utf-8">'+
    '<meta name="viewport" content="width=device-width,initial-scale=1">'+
    '<title>명하 N35 네 분야 실제 연구 원문 대조</title>'+
    '<style>body{font:15px/1.7 system-ui,sans-serif;max-width:1180px;'+
    'margin:24px auto;padding:0 18px;background:#f7f7f6;color:#222}'+
    '.pair,.domain,.claim{border:1px solid #ddd;border-radius:8px;'+
    'background:white;padding:12px;margin:10px 0}summary{cursor:pointer;font-weight:600}'+
    '.columns{display:grid;grid-template-columns:1fr 1fr;gap:12px}'+
    '.side{min-width:0;padding:8px;background:#fbfbfb}'+
    '.fact,.scope,.hold{color:#555}p{overflow-wrap:anywhere}'+
    '@media(max-width:730px){.columns{grid-template-columns:1fr}}'+
    '@media print{.pair{break-before:page}.columns{grid-template-columns:1fr 1fr}}'+
    '</style></head><body>'+
    '<h1>실제 명식별 네 분야 한국어 원문 대조 (N35)</h1>'+
    '<p>실제 35건 HTTP 입력을 바탕으로 계산한 연구 후보를 20개 서로 다른 명식 대조와 '+
    '1개 동일 입력 대조에서 비교합니다. 19개의 고유 명식쌍이며, '+
    '동일 출생 대조는 별도의 반복 확인입니다.</p>'+
    '<p><strong>기존 연구문 원문 변경 '+recalculated.counts.original_korean_copy_changed+
    '건 / 문장은 같고 위치만 변경 '+
    recalculated.counts.same_copy_different_positions+
    '건.</strong> 이는 사주 해석의 진실성·효용성이나 승인된 소비자 개인화 품질의 증거가 아닙니다.</p>'+
    '<p>내부 연구 검토 전용 · 출처·방법론 경합 미해결 · 사람 검수 미완료 · '+
    'Product/Official/Production/Commerce 승격 및 판매·공개 금지.</p>'+
    '<p>자료 버전 '+escapeHtml(NATAL_N35_PAIR_READER_VERSION)+'</p>'+
    pairHtml+'</body></html>\n';
}
