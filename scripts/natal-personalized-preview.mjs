import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import {
  createMyeonghwaProductionPreviewOnlyCalculationProcessV1,
  PRODUCTION_CALCULATION_PROCESS_ENV_V1,
} from '../dist/production-calculation-process.js';
import { PRODUCT_PREVIEW_READING_HTTP_PATH } from '../dist/production-calculation-host.js';

import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../dist/production/production-calculation-runtime.js';
import { buildNatalStructuralEvidence } from '../dist/preview/natal-structural-evidence.js';
import { buildNatalSynthesisPreview } from '../dist/preview/natal-synthesis-preview.js';
import { buildNatalN16GroundedReaderBrief } from '../dist/preview/natal-grounded-reader-brief.js';
import { buildNatalN30bFiveDomainVerifiedReader } from '../dist/preview/natal-n30b-five-domain-verified-reader.js';
import { buildNatalN32ExpandedDomainResearchReading } from '../dist/preview/natal-n32-expanded-domain-research-reading.js';
import { buildNatalN36CommonEvidenceIndex } from '../dist/preview/natal-n36-common-evidence-index.js';
import { createBusinessNatalReadingCandidateRegistry } from '../dist/research/business-natal-reading-candidate.js';
import { buildNatalActivatedThemePreview } from '../dist/preview/natal-activated-theme-preview.js';
import { buildNatalAppliedThemeContext } from '../dist/preview/natal-applied-theme-context.js';
import { createGeneralNatalIntegratedReadingRegistry } from '../dist/interpretation/general-natal-integrated-reading-registry.js';
import { createGeneralNatalSourceBoundedRegistry } from '../dist/research/general-natal-conclusion-source-bounded-candidate.js';
import { buildNatalN22ChartRelationGuide } from '../dist/research/general-natal-chart-relation-guide.js';
import { runInterpretation } from '../dist/interpretation/interpretation-engine.js';

const bearer = 'local-natal-preview-non-production-token';
const domains = [
  { text: '사주', title: '전체 사주' },
  { text: '직업운', title: '직업·일' },
  { text: '재물운', title: '재물·자원' },
  { text: '사업운', title: '사업·실행' },
  { text: '연애운', title: '관계' },
];

function escapeHtml(input) {
  return String(input).replace(/[&<>"']/gu, (character) => {
    switch (character) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      default:
        return '&#39;';
    }
  });
}

function renderBlock(block) {
  if (block.type === 'paragraph' || block.type === 'source_hint') {
    return `<p>${escapeHtml(block.text)}</p>`;
  }
  if (block.type === 'key_points') {
    return `<ul>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
  }
  if (block.type === 'fact_table') {
    return `<dl>${block.rows
      .map((row) => `<dt>${escapeHtml(row.label)}</dt><dd>${escapeHtml(row.value)}</dd>`)
      .join('')}</dl>`;
  }
  if (block.type === 'comparison') {
    return `<h5>${escapeHtml(block.title)}</h5>${block.perspectives
      .map((entry) => `<p><strong>${escapeHtml(entry.label)}:</strong> ${escapeHtml(entry.text)}</p>`)
      .join('')}`;
  }
  if (block.type === 'ambiguity') {
    return `<p>${escapeHtml(block.summary)}</p><ul>${block.scenarios
      .map((entry) => `<li>${escapeHtml(entry.label)}: ${escapeHtml(entry.text)}</li>`)
      .join('')}</ul>`;
  }
  if (block.type === 'timeline') {
    return `<ul>${block.entries
      .map((entry) => `<li>${escapeHtml(entry.label)}: ${escapeHtml(entry.text)}</li>`)
      .join('')}</ul>`;
  }
  return '';
}

function renderDomain(domain, response) {
  if (response.reading === undefined) {
    return `<section class="domain"><h2>${escapeHtml(domain.title)}</h2><p class="limited">현재 결과 없음: ${escapeHtml(response.state)} — 근거가 없는 해석은 추가하지 않습니다.</p></section>`;
  }
  const sections = response.reading.sections
    .map(
      (section) => `<section class="interpretation">
        <h3>${escapeHtml(section.title)}</h3>
        ${section.blocks.map(renderBlock).join('')}
      </section>`,
    )
    .join('');
  const limitations = response.reading.disclosures.map((d) => escapeHtml(d.text));
  return `<section class="domain">
    <div class="domain-heading"><h2>${escapeHtml(domain.title)}</h2><span>${escapeHtml(response.state)}</span></div>
    ${sections || '<p class="limited">전달 가능한 해석 본문이 없습니다.</p>'}
    ${limitations.length ? `<details><summary>해석의 한계</summary>${limitations.map((d) => `<p>${d}</p>`).join('')}</details>` : ''}
  </section>`;
}

function renderSynthesis(synthesis) {
  const statements = synthesis.statements.map((statement) => {
    const name = statement.kind === 'existing_preview_interpretation'
      ? '기존 Preview 해석' : '명식 계산에서 관측된 사실';
    const sources = statement.sourcePaths.length > 0
      ? `<details><summary>계산 근거 경로</summary><p>${escapeHtml(statement.sourcePaths.join(' · '))}</p></details>`
      : statement.readingSource
        ? `<p class="limited">기존 ${escapeHtml(statement.readingSource.domain)} Reading 응답에서 인용</p>`
        : '';
    return `<section class="interpretation"><h3>${escapeHtml(statement.title)}</h3>
      <p class="limited">${escapeHtml(name)}</p><p>${escapeHtml(statement.text)}</p>${sources}</section>`;
  }).join('');
  return `<section class="domain">
    <div class="domain-heading"><h2>명식을 종합해서 읽는 출발점</h2><span>N1·N2 내부 시제품</span></div>
    <p class="limited">실제 계산 구조와 기존 해석을 연결했습니다. 근거가 없는 성격·강약·용신·격국 판단은 생성하지 않습니다.</p>
    ${statements}
    <details><summary>남은 해석 한계</summary>
    ${synthesis.limits.map((limit) => `<p>${escapeHtml(limit)}</p>`).join('')}</details>
  </section>`;
}

function renderActivatedThemes(themes) {
  const items = themes.themes.map((theme) =>
    `<section class="interpretation"><h3>${escapeHtml(theme.headline)} <small>${escapeHtml(theme.channel === 'visible_stems' ? '천간' : '지지')}</small></h3>
    <p>${escapeHtml(theme.summary)}</p>
    <details><summary>실제 매칭된 연구 규칙과 근거</summary>
    <p>${escapeHtml(theme.ruleIds.join(' · '))}</p>
    <p>${escapeHtml(theme.factRefs.join(' · '))}</p></details></section>`
  ).join('');
  return `<section class="domain">
    <div class="domain-heading"><h2>명식에서 실제 활성화된 해석 테마</h2><span>연구 단계 · 내부 비교 전용</span></div>
    <p class="limited">${escapeHtml(themes.disclosure)}</p>
    ${items || '<p>활성화된 연구 테마 없음. 의미를 임의로 생성하지 않습니다.</p>'}
  </section>`;
}

function renderAppliedThemeContext(context) {
  const items = context.statements.map((statement) => {
    const positions = statement.positions.map((p) => p.display).join(' · ');
    return `<section class="interpretation">
      <h3>${escapeHtml(statement.headline)}</h3>
      <p>${escapeHtml(statement.contextualReading)}</p>
      <details><summary>해석과 연결된 실제 근거</summary>
      <p>${escapeHtml(positions)}</p>
      <p>${escapeHtml(statement.positions.map((p) => p.evidencePath).join(' · '))}</p>
      <p>${escapeHtml(statement.sourceRuleIds.join(' · '))}</p></details>
    </section>`;
  }).join('');
  return `<section class="domain">
    <div class="domain-heading"><h2>내 명식의 구조를 반영한 해석</h2><span>내부 시제품 · 연구 단계</span></div>
    <p class="limited">${escapeHtml(context.disclosure)}</p>
    ${context.structuralHourPillar === undefined ? '' :
      `<p class="limited">계산된 시주: ${escapeHtml(context.structuralHourPillar)}. 시주 정보 자체는 해석 결론이 아닙니다.</p>`}
    ${items || '<p>검증 가능한 활성 테마가 없어 새 해석을 만들지 않았습니다.</p>'}
  </section>`;
}

/** The first screen is only original source-owned reading text, not template-generated predictions. */
function renderReaderFirstStory(story, expanded) {
  if (story.snapshotId !== expanded.snapshotId ||
      story.previewMeaningFingerprint !== expanded.previewMeaningFingerprint ||
      expanded.sections.length !== story.sections.length ||
      expanded.mayPublish || expanded.maySell ||
      expanded.createsNewInterpretation || expanded.originalLeftUnreadCount !== 0) {
    throw new TypeError('N24 expanded original source reading mismatch');
  }
  const basis = story.factualBasis.map((fact) =>
    '<span class="basis-chip">' + escapeHtml(fact.text) +
    '<details><summary>계산 사실의 위치</summary><p>' +
    escapeHtml(fact.factPaths.join(' · ')) + '</p></details></span>'
  ).join('');
  const domainCards = story.sections.map((section, index) => {
    const more = expanded.sections[index];
    if (!more || more.domain !== section.domain || more.responseState !== section.responseState) {
      throw new TypeError('N24 expanded source domain mismatch');
    }
    const authenticMore = more.additionalOriginalExcerpts.map((excerpt) => {
      const refs = excerpt.provenance.map((p) =>
        p.domain + ' · ' + p.sectionTitle + ' · ' + p.responseId + ' · ' + p.readingId).join(' / ');
      const title = excerpt.selectionBasis === 'domain_distinctive'
        ? '이 분야에만 전달된 실제 풀이' : '여러 분야에서 공유된 실제 풀이';
      return '<div class="reader-paragraph"><small class="reader-kind">' +
        title + '</small><p>' + escapeHtml(excerpt.text) + '</p>' +
        '<details><summary>원래 Preview 출처</summary><p>' +
        escapeHtml(refs) + '</p></details></div>';
    }).join('');
    const expandedDetail = authenticMore
      ? '<details class="reader-deep"><summary>이 분야의 실제 추가 풀이 ' +
        more.additionalOriginalExcerpts.length + '개 읽기</summary>' +
        authenticMore + '</details>' : '';
    const original = section.excerpts.map((excerpt, i) => {
      const references = excerpt.provenance.map((p) => p.domain + ' · ' +
        p.sectionTitle + ' · ' + p.responseId + ' · ' + p.readingId).join(' / ');
      const kind = excerpt.selectionBasis === 'domain_distinctive'
        ? '이 분야에만 전달된 풀이' : '여러 분야에서 공유된 풀이';
      return '<div class="reader-paragraph' + (index === 0 && i === 0 ? ' reader-lead' : '') + '">' +
        '<small class="reader-kind">' + kind + '</small><p>' + escapeHtml(excerpt.text) + '</p>' +
        '<details><summary>이 문장의 실제 Preview 출처</summary><p>' +
        escapeHtml(references) + '</p></details></div>';
    }).join('');
    const notes = [];
    if (section.sharedEarlier.length) {
      notes.push('이미 앞 분야에 있는 동일 설명 ' + section.sharedEarlier.length + '개');
    }
    if (section.remainingOriginalInterpretationCount) {
      notes.push('이 분야 원문 중 아직 앞 화면에 나오지 않은 풀이를 아래에서 볼 수 있습니다.');
    }
    if (section.calculatedExplanationCount) {
      notes.push('풀이로 세지 않은 계산 설명 ' + section.calculatedExplanationCount + '개');
    }
    return '<article class="reader-domain">' +
      '<div class="reader-domain-head"><h3>' + escapeHtml(section.title) + '</h3>' +
      '<small>' + escapeHtml(section.responseState) + '</small></div>' +
      (original || '<p class="limited">현재 이 분야에서 전달된 별도 풀이 본문이 없습니다. ' +
        '부족한 내용을 임의로 채우지 않았습니다.</p>') +
      expandedDetail +
      (notes.length ? '<p class="reader-note">' + escapeHtml(notes.join(' · ')) + '</p>' : '') +
      (section.limitations.length ? '<details><summary>이 분야의 해석 범위</summary>' +
        section.limitations.map(text => '<p>' + escapeHtml(text) + '</p>').join('') +
        '</details>' : '') + '</article>';
  }).join('');
  return '<section class="domain reader-first"><div class="domain-heading">' +
    '<h2>내 사주풀이, 핵심부터 읽기</h2><span>N21 · 실제 Preview 답변</span></div>' +
    '<p class="limited">내 명식의 계산 사실을 먼저 확인하고, 이미 제공된 다섯 분야의 ' +
    '해석 문장을 중복 없이 이어 읽습니다. 분야별 고유 원문을 먼저 배치하지만 그만큼 더 중요하다는 의미는 아닙니다.</p>' +
    '<div class="basis-grid">' + basis + '</div>' +
    '<div class="reader-domains">' + domainCards + '</div>' +
    '<p class="reader-note">실제 풀이 ' + story.displayedOriginalInterpretationCount +
    '개 우선 표시 · 분야별 고유 풀이 ' + story.displayedDomainDistinctiveCount +
    '개 · 여러 분야 공통 풀이 ' + story.displayedCrossDomainSharedCount +
    '개 · 분야별 상세 실제 원문 ' + expanded.additionalOriginalCount +
    '개 · 같은 문장 반복 ' + story.hiddenDuplicateCount +
    '개 제외 · 계산 사실만 설명한 문장 ' +
    story.calculationFactsExcludedFromInterpretation + '개 별도</p>' +
    '<details><summary>이 한 장 풀이의 정확한 범위</summary>' +
    story.limitations.map(x => '<p>' + escapeHtml(x) + '</p>').join('') +
    '</details></section>';
}

function renderActualChartRelations(guide) {
  if (guide.mayPublish || guide.maySell || guide.mayAddProductInterpretation) {
    throw new TypeError('N22 research must never be presented as official consumer authority');
  }
  const renderUnit = (unit) => {
    const refs = unit.sourceLocators.map((source) =>
      source.title + ' · ' + source.locator + ' [' + source.sourceId + ']'
    ).join(' / ');
    return '<article class="reader-paragraph"><p>' + escapeHtml(unit.text) + '</p>' +
      '<details><summary>실제 계산·연구 출처</summary>' +
      '<p>원본 주장: ' + escapeHtml(unit.claimIds.join(' · ')) + '</p>' +
      '<p>실제 관측 위치: ' + escapeHtml(unit.calculatedFactPaths.join(' · ')) + '</p>' +
      '<p>고전 원문 위치: ' + escapeHtml(refs) + '</p></details></article>';
  };
  const sections = [
    {title:'서로 이어져 관측된 관계',items:guide.linkedRelations},
    {title:'서로 다른 방향으로 함께 관측된 관계',items:guide.mixedRelations},
    {title:'명식에 개별적으로 관측된 관계',items:guide.individualRelations},
  ];
  const body = guide.state === 'birth_time_unknown'
    ? '<p class="limited">출생시간을 모르므로 시주 관련 구조 관계의 계산을 확정하지 않았습니다.</p>'
    : sections.map((section) => '<div class="research-relationship-group"><h3>' +
        escapeHtml(section.title) + '</h3>' +
        (section.items.length
          ? section.items.map(renderUnit).join('')
          : '<p class="limited">이 명식에서 현재 연구 규칙으로 확인된 후보가 없습니다.</p>') +
        '</div>').join('');
  return '<section class="domain research-scope"><div class="domain-heading">' +
    '<h2>내 명식에서 확인된 십신 관계</h2><span>연구용 관측 · 공식 해석 아님</span></div>' +
    '<p class="limited">현재 명식에서 실제 실행된 연구 규칙에 해당하는 관계만 보여줍니다. ' +
    '성공·실패, 돈·직업 결과, 특정 사건이나 관계의 우열을 예측하는 해석이 아닙니다.</p>' +
    body + '<details><summary>연구 해석의 정확한 한계</summary>' +
    guide.limits.map((x) => '<p>' + escapeHtml(x) + '</p>').join('') +
    '</details></section>';
}

function renderGroundedReaderBrief(brief) {
  const byId = new Map(brief.readingUnits.map((u) => [u.unitId, u]));
  const meaningUnitIds = new Set(brief.readingUnits.filter((u) =>
    u.kind === 'existing_preview_interpretation').map((u) => u.unitId));
  const shown = new Set();
  const contexts = brief.context.map((item) =>
    '<section class="interpretation"><h3>' + escapeHtml(item.title) + '</h3>' +
    '<p>' + escapeHtml(item.text) + '</p><details><summary>계산 근거</summary><p>' +
    escapeHtml(item.factPaths.join(' · ')) + '</p></details></section>').join('');
  const domainsHtml = brief.domains.map((domain) => {
    const units = domain.unitIds.filter((id) => meaningUnitIds.has(id)).map((id) => {
      const unit = byId.get(id);
      if (!unit) throw new TypeError('N16 missing referenced reading text unit: ' + id);
      if (shown.has(id)) {
        return '<li class="limited">이미 앞의 분야에서 표시한 동일 문장 (' +
          escapeHtml(unit.appearingInDomains.join(' · ')) + ')</li>';
      }
      shown.add(id);
      const refs = unit.sources.map((s) => s.domain + ' / ' + s.sectionTitle +
        ' / response ' + s.responseId + ' / reading ' + s.readingId).join(' | ');
      return '<li>' + escapeHtml(unit.text) +
        '<details><summary>실제 응답 출처</summary><p>' + escapeHtml(refs) + '</p></details></li>';
    }).join('');
    const calculated = domain.unitIds.filter((id) => !meaningUnitIds.has(id)).map((id) => {
      const unit = byId.get(id);
      if (!unit) throw new TypeError('N18 missing calculated text provenance: ' + id);
      return '<li>' + escapeHtml(unit.text) + '</li>';
    }).join('');
    return '<section class="interpretation"><h3>' + escapeHtml(domain.title) +
      ' <small>' + escapeHtml(domain.responseState) + '</small></h3>' +
      (units.length ? '<ul>' + units + '</ul>' :
        '<p class="limited">현재 전달된 풀이 본문이 없습니다. 근거가 없는 내용을 채우지 않습니다.</p>') +
      (calculated ? '<details><summary>계산 사실만 설명한 기존 문장 (풀이 내용으로 세지 않음)</summary><ul>' +
        calculated + '</ul></details>' : '') +
      (domain.disclosures.length ? '<details><summary>해석 범위 안내</summary>' +
        domain.disclosures.map(x => '<p>' + escapeHtml(x) + '</p>').join('') + '</details>' : '') +
      '</section>';
  }).join('');
  return '<section class="domain"><div class="domain-heading"><h2>내 사주를 한 장으로 읽기</h2>' +
    '<span>N16 내부 Preview 정리</span></div>' +
    '<p class="limited">기존 다섯 분야의 실제 답변을 그대로 묶었습니다. 명식 계산 사실과 실제 풀이 본문을 구별하며 새 해석은 만들지 않습니다.</p>' +
    contexts +
    '<p class="limited">원문 설명 ' + brief.totalOriginalTextUnitCount + '개 · 서로 다른 설명 ' +
    brief.uniqueTextUnitCount + '개 · 풀이 본문 ' + brief.interpretationTextUnitCount +
    '개 · 계산 설명 ' + brief.calculatedContextTextUnitCount +
    '개 · 중복 출현 ' + brief.exactRepeatedTextCount + '회</p>' +
    domainsHtml +
    '<details><summary>한계와 사용 범위</summary>' +
    brief.limitations.map(x => '<p>' + escapeHtml(x) + '</p>').join('') + '</details></section>';
}

function renderN30bVerifiedGeneral(result) {
  const overview = result.generalSourceOverview;
  if (overview === null) {
    return '<section class="domain"><div class="domain-heading"><h2>명식별 검증된 핵심 구조</h2>' +
      '<span>N30b · 현재 제공 가능한 근거 없음</span></div>' +
      '<p class="limited">충분한 확정 근거가 없어서 이 영역을 새로 만들어 채우지 않았습니다.</p></section>';
  }
  const receipts = overview.verifiedReceipts.map((entry) =>
    '<li>실제 관측 위치: ' + escapeHtml(entry.position) +
    '<details><summary>Claim / Rule / Source 출처</summary><p>' +
    escapeHtml(entry.claimType) + ' · ' +
    escapeHtml(entry.ruleIds.join(' · ')) + ' · ' +
    escapeHtml(entry.sourceIds.join(' · ')) + '</p></details></li>'
  ).join('');
  return '<section class="domain reader-first"><div class="domain-heading"><h2>' +
    escapeHtml(overview.title) + '</h2><span>N30b · General 출처 검증</span></div>' +
    '<p class="limited">원국에서 실제 확인된 십신 위치와 기존 출처 문장을 앞에 표시합니다. ' +
    '이를 직업·재물·사업·관계의 결과로 자동 해석하지 않습니다.</p>' +
    overview.blocks.map(renderBlock).join('') +
    '<details><summary>해석별 실제 Claim / Rule / Source</summary><ul>' +
    receipts + '</ul></details></section>';
}

function renderN31FourDomainResearch(result) {
  if (result.mayPublish || result.maySell || result.newSemanticRulesAdded) {
    throw new TypeError('N31 cannot promote research claims to consumer authority');
  }
  const titles={career:'직업·일',wealth:'재물·자원',business:'사업·실행',relationship:'관계'};
  const cards=result.sections.map(section=>{
    const renderClaim=(claim)=>
      '<article class="reader-paragraph"><h3>'+escapeHtml(claim.headline)+'</h3>' +
      '<p>'+escapeHtml(claim.summary)+'</p>' +
      '<p class="reader-note">이 명식에서 관측한 십신: '+
      escapeHtml(claim.calculatedPositions.join(' · '))+'</p>' +
      '<details><summary>기존 연구 Claim · Rule · Source</summary><p>'+
      escapeHtml(claim.claimType)+' · '+escapeHtml(claim.claimRuleId)+
      '@'+escapeHtml(claim.claimRuleVersion)+' · '+
      escapeHtml(claim.methodologyId)+'@'+escapeHtml(claim.methodologyVersion)+
      ' · Narrative Profile@'+escapeHtml(claim.profileVersion)+' · '+
      escapeHtml(claim.sourceIds.join(' / '))+'</p>'+
      '<p>계산 사실 경로: '+escapeHtml(claim.calculatedFactPaths.join(' · '))+
      '</p></details></article>';
    const excerpts=section.visibleClaims.map(renderClaim).join('');
    const additional=section.additionalVerifiedClaims.map(renderClaim).join('');
    const more=additional
      ? '<details class="reader-deep"><summary>N32 · 이 분야의 출처 검증 추가 해석 '+
        section.additionalVerifiedClaims.length+'개 읽기</summary>'+additional+'</details>' : '';
    return '<div class="reader-domain"><div class="reader-domain-head"><h3>'+
      escapeHtml(titles[section.domain])+'</h3><small>기존 T8 연구 · '+
      escapeHtml(section.state)+'</small></div>'+
      (excerpts||'<p class="limited">현재 검증 가능한 연구 문장이 없습니다. 빈칸을 임의로 채우지 않습니다.</p>')+
      more+
      (section.hiddenByLimitCount||section.heldConflictingClaimCount
        ? '<p class="reader-note">추가 펼쳐 읽기 '+
          section.hiddenByLimitCount+'개 · 충돌 보류 '+
          section.heldConflictingClaimCount+'개</p>':'')+'</div>';
  }).join('');
  return '<section class="domain research-scope"><div class="domain-heading">'+
    '<h2>네 분야의 명식별 기존 연구 해석</h2><span>N31 · 출처 확인 · 연구 전용</span></div>'+
    '<p class="limited">실제 원국과 기존 T8 연구 규칙에서 발행된 직업·재물·사업·관계의 개별 해석만 보여줍니다. '+
    '이는 아래 실제 HTTP 제품 응답에 새로 승인된 문장이 아니며, 분야별 성과나 미래를 확정하지 않습니다.</p>'+
    '<div class="reader-domains">'+cards+'</div>'+
    '<details><summary>연구 범위 및 권한 제한</summary>'+
    result.limitations.map(x=>'<p>'+escapeHtml(x)+'</p>').join('')+'</details></section>';
}

function renderN36CommonChartEvidence(index) {
  if (!index.researchOnly || index.mayPublish || index.maySell ||
      index.createsNewInterpretation || index.independentDomainMeaningProven) {
    throw new TypeError('N36 cannot promote shared calculation facts to a new meaning');
  }
  const titles = {career:'직업·일',wealth:'재물·자원',business:'사업·실행',relationship:'관계'};
  const facts = index.sharedFacts.map(fact => {
    const references = fact.domains.map(item =>
      '<li><strong>'+escapeHtml(titles[item.domain])+'</strong> · 기존 Claim '+
      item.claims.length+'개<details><summary>원래 분야별 출처 보기</summary>'+
      item.claims.map(claim => '<p>'+escapeHtml(claim.claimType)+' · '+
        escapeHtml(claim.ruleId)+'@'+escapeHtml(claim.ruleVersion)+' · '+
        escapeHtml(claim.sourceIds.join(' / '))+'</p>').join('')+
      '</details></li>').join('');
    return '<article class="reader-paragraph"><h3>'+escapeHtml(fact.calculatedPosition)+'</h3>'+
      '<p class="limited">서로 독립적으로 실행된 기존 연구 분야 '+
      fact.domains.length+'곳에서 이 정확한 계산 사실을 참조합니다.</p>'+
      '<ul>'+references+'</ul><details><summary>Canonical 계산 사실 경로</summary><p>'+
      escapeHtml(fact.factPath)+'</p></details></article>';
  }).join('');
  return '<section class="domain research-scope"><div class="domain-heading">'+
    '<h2>여러 분야가 함께 참조한 내 명식의 계산 근거</h2>'+
    '<span>N36 · 내부 연구용 사실 연결</span></div>'+
    '<p class="limited">'+escapeHtml(index.limitation)+'</p>'+
    (facts||'<p class="limited">서로 다른 분야에서 공통 참조한 확정 계산 근거가 없습니다. 연관성을 임의로 만들지 않습니다.</p>')+
    '</section>';
}

function renderPillars(summary) {
  if (summary === undefined) return '<p>명식 요약을 사용할 수 없습니다.</p>';
  return `<div class="pillars">${(['year', 'month', 'day', 'hour'])
    .map((slot) => {
      const fact = summary.pillars[slot];
      const labels = { year: '연주', month: '월주', day: '일주', hour: '시주' };
      return `<div class="pillar"><span>${labels[slot]}</span><strong>${escapeHtml(fact?.value ?? '미상')}</strong><small>${escapeHtml(fact?.status ?? 'unavailable')}</small></div>`;
    })
    .join('')}</div>`;
}

function renderPage(date, time, responses, synthesis, themes, applied, brief, story, expanded, relations, verifiedFiveDomains, domainResearch, commonEvidence) {
  const general = responses[0]?.response.reading;
  const status = responses.map(({ domain, response }) => `${domain.title}:${response.state}`);
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>명하 — 개인별 원국 사주풀이 내부 시제품</title>
  <style>
    :root{font-family:system-ui,-apple-system,"Malgun Gothic",sans-serif;color:#e9eaf0;background:#11141d}
    *{box-sizing:border-box} body{margin:0}main{max-width:920px;margin:auto;padding:48px 24px 96px}
    header{padding:28px 0 34px;border-bottom:1px solid #323847}h1{font-size:clamp(27px,5vw,42px);letter-spacing:-1.2px;margin:12px 0}
    .eyebrow{font-size:12px;letter-spacing:2px;color:#b9aafa}header p{color:#b2b9c6;line-height:1.8}
    .pillars{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:24px 0 36px}
    .pillar{background:#202533;border:1px solid #3c4153;border-radius:13px;padding:18px 12px;text-align:center;display:flex;flex-direction:column;gap:8px}
    .pillar span,.pillar small{color:#9fa7b7;font-size:12px}.pillar strong{font-size:25px}
    .domain{background:#1b2030;border:1px solid #303849;border-radius:18px;padding:24px;margin:18px 0}
    .domain-heading{display:flex;gap:12px;align-items:baseline;justify-content:space-between}
    h2{font-size:22px;margin:0 0 16px}h3{font-size:16px;color:#d8d2ff;margin:18px 0 8px}
    h5{font-size:14px}p,li,dd{font-size:15px;line-height:1.9;color:#cfd4df}
    li{margin:4px 0}dl{display:grid;grid-template-columns:125px 1fr;gap:8px}
    dt{color:#a6b1c3;font-size:13px}dd{margin:0}.interpretation{border-top:1px solid #2e3542;padding-top:6px}
    .domain-heading span,.limited,summary{color:#a2aabc;font-size:12px}details{border-top:1px solid #374052;margin-top:18px;padding-top:14px}
    .reader-first{border-color:#716888;background:#21243a}
    .research-scope{border-color:#55536b}.research-relationship-group{padding:10px 0}
    .basis-grid{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 22px}
    .basis-chip{display:block;border:1px solid #565b78;border-radius:10px;padding:10px 12px;font-size:12px;color:#d1d6e6;line-height:1.7;max-width:100%}
    .basis-chip details{margin-top:6px;padding-top:6px}
    .reader-domains{display:grid;gap:14px}
    .reader-domain{background:#1a1e2d;border:1px solid #3f435a;border-radius:12px;padding:16px}
    .reader-domain-head{display:flex;align-items:baseline;justify-content:space-between;gap:8px}
    .reader-domain-head h3{margin:0 0 8px}.reader-domain-head small{color:#a8aec0}
    .reader-paragraph{border-top:1px solid #313648;padding-top:8px}
    .reader-paragraph:first-of-type{border-top:0}
    .reader-lead p{font-size:18px;color:#f0eafa;font-weight:550;line-height:1.85}
    .reader-note{font-size:12px;color:#a7b1c9;margin:10px 0}
    .reader-kind{font-size:11px;color:#c0a9e5;letter-spacing:.02em}
    .full-data{border:1px solid #313849;border-radius:15px;padding:16px;margin-top:24px}
    .full-data>summary{font-size:17px;color:#d6d5e8;cursor:pointer}
    footer{margin-top:36px;color:#adb6c9;font-size:12px;line-height:1.9}
    @media(max-width:540px){main{padding:30px 14px 50px}.pillars{gap:6px}.pillar{padding:13px 5px}.pillar strong{font-size:17px}.domain{padding:16px}dl{grid-template-columns:100px 1fr}}
  </style></head><body><main>
  <header><div class="eyebrow">MYEONGHA · INTERNAL NATAL EXPLORATION</div>
  <h1>나의 사주, 한 장의 흐름</h1>
  <p>${escapeHtml(date)} · ${escapeHtml(time ?? '출생시간 미상')} 입력으로 현재 명하 엔진의 실제 Preview 해석을 조합한 내부 시제품입니다. 해석을 새로 생성하거나 근거 없는 빈칸을 채우지 않습니다.</p>
  </header>
  ${renderPillars(general?.calculationSummary)}
  ${renderN30bVerifiedGeneral(verifiedFiveDomains)}
  ${renderN36CommonChartEvidence(commonEvidence)}
  ${renderN31FourDomainResearch(domainResearch)}
  ${renderReaderFirstStory(story, expanded)}
  ${renderActualChartRelations(relations)}
  <details class="full-data"><summary>전체 원문·명식 계산 근거·연구용 부가 해설 펼쳐보기</summary>
  ${renderGroundedReaderBrief(brief)}
  ${renderSynthesis(synthesis)}
  ${renderActivatedThemes(themes)}
  ${renderAppliedThemeContext(applied)}
  ${responses.map(({ domain, response }) => renderDomain(domain, response)).join('')}
  </details>
  <footer>내부 개발·품질 비교 전용 · Official Production 공개/저장/판매 불가. 이 화면의 해석은 전통적 방법론의 제한된 제안을 다루며 현실의 개인 성격·성과·미래 사건을 검증하거나 보증하지 않습니다.
  <p>실제 응답 상태: ${escapeHtml(status.join(' · '))}</p></footer>
  </main></body></html>`;
}

async function listenEphemeral(server) {
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      server.off('error', reject);
      resolve();
    });
  });
  const address = server.address();
  if (address === null || typeof address === 'string') throw new TypeError('No loopback address');
  return `http://127.0.0.1:${address.port}`;
}

async function close(server) {
  if (!server.listening) return;
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}

async function main() {
  const date = process.argv[2] ?? '2024-03-10';
  const timeArg = process.argv[3] ?? '12:00';
  const time = timeArg === 'unknown' ? null : timeArg;
  const output = resolve(process.argv[4] ?? 'natal-personalized-preview.html');
  const runtime = createMyeonghwaProductionPreviewOnlyCalculationProcessV1({
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.serviceBearer]: bearer,
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.host]: '127.0.0.1',
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.port]: '3000',
  });
  const origin = await listenEphemeral(runtime.server);
  const responses = [];
  try {
    for (const domain of domains) {
      const request = await globalThis.fetch(`${origin}${PRODUCT_PREVIEW_READING_HTTP_PATH}`, {
        method: 'POST',
        headers: { authorization: `Bearer ${bearer}`, 'content-type': 'application/json' },
        body: JSON.stringify({
          birth: { calendarType: 'solar', date, time, sex: 'unspecified' },
          reading: { text: domain.text },
        }),
      });
      if (!request.ok) throw new Error(`Preview HTTP ${request.status} at ${domain.text}`);
      responses.push({ domain, response: await request.json() });
    }
  } finally {
    await close(runtime.server);
  }
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time === null ? [] : time.split(':').map(Number);
  const calculated = calculateAuthorizedMyeonghwaProductionSnapshot({
    calendarType: 'solar',
    date: { year, month, day },
    time: time === null ? { known: false } : { known: true, hour, minute },
    sexForTraditionalCalculation: 'unspecified',
  });
  const evidence = buildNatalStructuralEvidence(calculated.snapshot);
  const domainKeys = ['general', 'career', 'wealth', 'business', 'relationship'];
  const realSources = responses.map((item, i) => ({ domain: domainKeys[i], response: item.response }));
  const synthesis = buildNatalSynthesisPreview(evidence, realSources);
  const researchNow = new Date('2026-10-15T00:00:00.000Z');
  const registry = createGeneralNatalIntegratedReadingRegistry(researchNow.toISOString());
  const interpretation = runInterpretation(calculated.snapshot, registry, {
    requestId: 'n3-theme-preview-internal-only',
    now: researchNow,
  });
  const verifiedFiveDomains = buildNatalN30bFiveDomainVerifiedReader(
    calculated.snapshot, interpretation, realSources,
  );
  const brief = buildNatalN16GroundedReaderBrief(calculated.snapshot, realSources);
  const {story, full:expanded} = verifiedFiveDomains;
  const n31Registry = createBusinessNatalReadingCandidateRegistry(researchNow.toISOString());
  const n31Execution = runInterpretation(calculated.snapshot, n31Registry, {
    requestId:'n31-domain-semantic-research-internal-only', now:researchNow,
  });
  const expandedDomainResearch = buildNatalN32ExpandedDomainResearchReading(
    calculated.snapshot,n31Execution,n31Registry,
  );
  const domainResearch = expandedDomainResearch.firstScreen;
  const commonEvidence = buildNatalN36CommonEvidenceIndex(expandedDomainResearch);
  const themes = buildNatalActivatedThemePreview(interpretation);
  const applied = buildNatalAppliedThemeContext(evidence, themes);
  const researchRegistry = createGeneralNatalSourceBoundedRegistry(researchNow.toISOString());
  const researchExecution = runInterpretation(calculated.snapshot, researchRegistry, {
    requestId: 'n22-real-chart-research-relations-internal-only', now: researchNow,
  });
  const relations = buildNatalN22ChartRelationGuide(
    calculated.snapshot, researchExecution, researchRegistry,
  );
  writeFileSync(output, renderPage(date, time, responses, synthesis, themes, applied, brief, story, expanded, relations, verifiedFiveDomains, domainResearch, commonEvidence), 'utf8');
  process.stdout.write('N36 shared chart facts across independent domain Claims: ' +
    commonEvidence.sharedFactCount + '; research-only structural links, no new semantic authority\n');
  process.stdout.write('N32 original four-domain research: ' +
    expandedDomainResearch.initialClaimCount+' visible + '+
    expandedDomainResearch.expandedOriginalClaimCount+' additional = '+
    expandedDomainResearch.allQualifiedOriginalClaimCount+
    ' original, 0 unread; research/HOLD only\\n');
  process.stdout.write('N31 specialist source-backed Research only: ' +
    domainResearch.sections.map(s=>s.domain+':'+s.visibleClaims.length).join(', ') +
    '; existing T8 meaning only; Production/Commerce HOLD\\n');
  process.stdout.write('N30b five-domain General verification: ' +
    (verifiedFiveDomains.generalSourceOverview?.verifiedReceipts.length ?? 0) +
    ' source-verified claims in reader-first General; other four domain meanings unchanged; no authority promotion\n');
  process.stdout.write('N22 real source-bound chart relations: ' +
    relations.individualRelations.length + ' individual, ' +
    relations.linkedRelations.length + ' linked, ' +
    relations.mixedRelations.length + ' mixed; Research/HOLD\n');
  process.stdout.write('N24 full original reading: ' +
    expanded.firstScreenOriginalCount + ' initial + ' + expanded.additionalOriginalCount +
    ' domain details = ' + expanded.totalDistinctOriginalCount +
    ' genuine source units, 0 unshown; no new meaning\\n');
  process.stdout.write('N23 distinct-first reading: ' +
    story.displayedDomainDistinctiveCount + ' domain-specific and ' +
    story.displayedCrossDomainSharedCount + ' shared original excerpts; unchanged meaning authority\n');
  process.stdout.write('N21 reader-first story: ' + story.displayedOriginalInterpretationCount +
    ' real bounded paragraphs across ' + story.sections.filter(x => x.hasInterpretation).length +
    '/5 domains; ' + story.calculationFactsExcludedFromInterpretation +
    ' calculation-only units excluded, no invented meanings\n');
  process.stdout.write(`N16 grounded brief: ${brief.totalOriginalTextUnitCount} real original text units, ${brief.uniqueTextUnitCount} distinct units, ${brief.exactRepeatedTextCount} repeated occurrences; internal only\n`);
  process.stdout.write(`N4 chart-bound interpretations: ${applied.statements.length} actual theme positions\\n`);
  process.stdout.write(`N3 actually matched research themes: ${themes.themes.length}\\n`);
  process.stdout.write(`N1/N2 evidence: ${synthesis.statements.length} traced statements, ` +
    `${synthesis.domainCoverage.filter((entry) => entry.hasInterpretation).length}/5 interpreted domains\\n`);
  process.stdout.write(`Rendered real natal Preview responses to ${output}\n`);
  process.stdout.write(`${responses.map((r) => `${r.domain.title}: ${r.response.state}`).join(' | ')}\n`);
}

await main();
