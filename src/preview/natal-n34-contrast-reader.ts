import type { NatalN31Domain, NatalN31DomainClaim } from './natal-n31-four-domain-claim-readings.js';
import {
  auditNatalN34FourDomainCopyContrasts,
  type NatalN34Case,
  type NatalN34Difference,
} from './natal-n34-four-domain-copy-contrast.js';

export const NATAL_N34_CONTRAST_READER_VERSION = 'saju-n34-side-by-side-research-copy-reader-v1' as const;

type Audit = ReturnType<typeof auditNatalN34FourDomainCopyContrasts>;

const domainNames: Readonly<Record<NatalN31Domain, string>> = {
  career: '직업·일',
  wealth: '재물·자원',
  business: '사업·실행',
  relationship: '관계',
};
const differenceNames: Readonly<Record<NatalN34Difference, string>> = {
  insufficient_research_evidence: '양쪽 모두 검증 가능한 연구 근거 없음',
  coverage_changed: '한쪽에만 기존 연구 원문 존재',
  original_korean_copy_changed: '선택된 기존 한국어 연구 원문이 다름',
  same_copy_different_claim_basis: '같은 원문, 다른 Claim·Rule·출처 근거',
  same_copy_different_positions: '같은 원문·Claim 근거, 계산 위치만 다름',
  unchanged: '원문·근거·계산 위치 모두 같음',
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/gu, character => {
    switch (character) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      default: return '&#39;';
    }
  });
}

function claimsForDomain(input: NatalN34Case, domain: NatalN31Domain): readonly NatalN31DomainClaim[] {
  const first = input.reading.firstScreen.sections.find(item => item.domain === domain);
  const extra = input.reading.sections.find(item => item.domain === domain);
  if (first === undefined || extra === undefined) {
    throw new TypeError('N34 reader: missing audited research domain');
  }
  return [...first.visibleClaims, ...extra.additionalVerifiedClaims];
}

function renderClaims(input: NatalN34Case, domain: NatalN31Domain): string {
  const claims = claimsForDomain(input, domain);
  if (claims.length === 0) {
    return '<p class="empty">이 명식에 해당하는 기존 연구 Claim 원문이 없습니다.</p>';
  }
  return claims.map(claim =>
    '<article class="claim">' +
      '<h4>' + escapeHtml(claim.headline) + '</h4>' +
      '<p>' + escapeHtml(claim.summary) + '</p>' +
      '<p class="positions">계산에서 확인된 위치: ' +
        escapeHtml(claim.calculatedPositions.join(' · ')) + '</p>' +
      '<details><summary>해당 원문의 Claim·Rule·출처</summary>' +
        '<p>' + escapeHtml(claim.claimType) + ' · ' +
        escapeHtml(claim.claimRuleId) + '@' + escapeHtml(claim.claimRuleVersion) +
        ' · ' + escapeHtml(claim.methodologyId) + '@' +
        escapeHtml(claim.methodologyVersion) + '</p>' +
        '<p>원문 출처: ' + escapeHtml(claim.sourceIds.join(' / ')) + '</p>' +
        '<p>명식 사실 경로: ' + escapeHtml(claim.calculatedFactPaths.join(' · ')) + '</p>' +
      '</details>' +
    '</article>',
  ).join('');
}

/**
 * Human-readable, side-by-side comparison of already audited real Canonical
 * chart research copies. Never a compatibility reading, semantic synthesis,
 * Official/Production artifact, or permission to render Research as Product.
 */
export function renderNatalN34ResearchCopyComparisonHtml(
  cases: readonly NatalN34Case[],
  audit: Audit,
): string {
  // No caller-provided "difference" label is trusted without exact re-audit
  // of the same immutable research receipts. This only reuses local evidence.
  const rechecked = auditNatalN34FourDomainCopyContrasts(
    cases, audit.pairs.map(pair => ({ left: pair.left, right: pair.right })),
  );
  if (JSON.stringify(rechecked) !== JSON.stringify(audit) ||
      !audit.researchOnly || audit.mayPublish || audit.maySell ||
      audit.usefulComplete || audit.independentHumanMeaningValidated) {
    throw new TypeError('N34 reader: research-only evidence or comparison integrity invalid');
  }
  const byId = new Map(cases.map(input => [input.caseId, input]));
  const pairs = audit.pairs.map((pair, index) => {
    const left = byId.get(pair.left);
    const right = byId.get(pair.right);
    if (left === undefined || right === undefined) {
      throw new TypeError('N34 reader: missing comparison case');
    }
    const domains = pair.domains.map(item =>
      '<section class="domain">' +
        '<h3>' + escapeHtml(domainNames[item.domain]) + '</h3>' +
        '<p class="classification">' + escapeHtml(differenceNames[item.difference]) + '</p>' +
        '<div class="comparison">' +
          '<section><h4 class="case-label">왼쪽 명식 · Claim ' +
            String(item.leftClaimCount) + '개</h4>' + renderClaims(left, item.domain) + '</section>' +
          '<section><h4 class="case-label">오른쪽 명식 · Claim ' +
            String(item.rightClaimCount) + '개</h4>' + renderClaims(right, item.domain) + '</section>' +
        '</div>' +
      '</section>',
    ).join('');
    return '<details class="pair">' +
      '<summary>대조 ' + String(index + 1) + ' · ' +
        escapeHtml(pair.left) + ' ↔ ' + escapeHtml(pair.right) +
        (pair.sameChart ? ' · 동일 명식 대조군' : ' · 서로 다른 명식') +
      '</summary><div class="pair-body">' + domains + '</div></details>';
  }).join('');
  const counts = Object.entries(audit.counts).map(([key, value]) =>
    '<li>' + escapeHtml(differenceNames[key as NatalN34Difference]) + ': ' +
    String(value) + '개 분야별 대조</li>',
  ).join('');
  return '<!doctype html><html lang="ko"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>명하 · 명식별 원문 비교 내부 보고서</title>' +
    '<style>body{font:15px/1.7 system-ui,sans-serif;margin:0;color:#263044;background:#f4f6fa}' +
    'main{max-width:1120px;margin:auto;padding:30px 18px 70px}h1{font-size:27px}' +
    'h2{font-size:19px}h3{font-size:17px}h4{font-size:15px}' +
    'p{overflow-wrap:anywhere}.note,.classification{color:#6a466f}' +
    '.pair,.domain{border:1px solid #ccd2de;background:#fff;border-radius:12px;padding:16px;margin:16px 0}' +
    '.pair>summary{cursor:pointer;font-weight:700;overflow-wrap:anywhere}' +
    '.domain{background:#f9f9fc}.comparison{display:grid;grid-template-columns:1fr 1fr;gap:16px}' +
    '.comparison>section{min-width:0}.claim{border-top:1px solid #d5d8e2;padding:8px 0}' +
    '.positions,.empty{color:#626c80}.case-label{color:#4e5870}' +
    '.claim details{font-size:12px;color:#5f6675}summary{cursor:pointer}' +
    '@media(max-width:720px){.comparison{grid-template-columns:1fr}}' +
    '</style></head><body><main>' +
    '<header><p class="note">N34 · INTERNAL RESEARCH / NOT OFFICIAL READING</p>' +
    '<h1>명식별 기존 한국어 풀이 원문을 나란히 비교</h1>' +
    '<p>실제 Canonical 명식에서 실행된 기존 직업·재물·사업·관계의 연구 T8 원문과 ' +
    '계산 위치를 비교합니다. 서로 다른 위치는 새로운 사람의 성격·성과·미래를 뜻하지 않습니다.</p>' +
    '<p>HTTP 연결 명식 ' + String(audit.actualCaseCount) + '건 · 다른 명식 ' +
    String(audit.distinctChartPairCount) + '쌍 대조(고유 ' +
    String(audit.uniqueDifferentChartPairCount) + '쌍) · 동일 명식 대조군 ' +
    String(audit.sameChartControlPairCount) + '쌍</p></header>' +
    '<section class="domain"><h2>차이를 구분해서 읽는 기준</h2><ul>' + counts + '</ul>' +
    '<p class="note">원문 차이와 계산 위치 차이를 합쳐서 새로운 의미로 계산하지 않습니다.</p></section>' +
    pairs +
    '<footer class="note">N34 원문 비교는 내부 제품 품질 검토 전용입니다. 출처가 ' +
    '미승인인 연구 해석은 공식 풀이·Production·판매에 추가되지 않습니다. ' +
    '사람의 의미 적절성 검토가 완료됐다는 증거도 아닙니다.</footer>' +
    '</main></body></html>';
}
