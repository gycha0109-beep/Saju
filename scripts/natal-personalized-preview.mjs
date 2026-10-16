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
import { buildNatalActivatedThemePreview } from '../dist/preview/natal-activated-theme-preview.js';
import { buildNatalAppliedThemeContext } from '../dist/preview/natal-applied-theme-context.js';
import { createGeneralNatalIntegratedReadingRegistry } from '../dist/interpretation/general-natal-integrated-reading-registry.js';
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

function renderGroundedReaderBrief(brief) {
  const byId = new Map(brief.readingUnits.map((u) => [u.unitId, u]));
  const shown = new Set();
  const contexts = brief.context.map((item) =>
    '<section class="interpretation"><h3>' + escapeHtml(item.title) + '</h3>' +
    '<p>' + escapeHtml(item.text) + '</p><details><summary>계산 근거</summary><p>' +
    escapeHtml(item.factPaths.join(' · ')) + '</p></details></section>').join('');
  const domainsHtml = brief.domains.map((domain) => {
    const units = domain.unitIds.map((id) => {
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
    return '<section class="interpretation"><h3>' + escapeHtml(domain.title) +
      ' <small>' + escapeHtml(domain.responseState) + '</small></h3>' +
      (units.length ? '<ul>' + units + '</ul>' :
        '<p class="limited">현재 전달된 풀이 본문이 없습니다. 근거가 없는 내용을 채우지 않습니다.</p>') +
      (domain.disclosures.length ? '<details><summary>해석 범위 안내</summary>' +
        domain.disclosures.map(x => '<p>' + escapeHtml(x) + '</p>').join('') + '</details>' : '') +
      '</section>';
  }).join('');
  return '<section class="domain"><div class="domain-heading"><h2>내 사주를 한 장으로 읽기</h2>' +
    '<span>N16 내부 Preview 정리</span></div>' +
    '<p class="limited">기존 다섯 분야의 실제 답변을 그대로 묶었습니다. 중복 문장은 한 번만 표시하며 새 해석은 만들지 않습니다.</p>' +
    contexts +
    '<p class="limited">원문 설명 ' + brief.totalOriginalTextUnitCount + '개 · 서로 다른 설명 ' +
    brief.uniqueTextUnitCount + '개 · 중복 출현 ' + brief.exactRepeatedTextCount + '회</p>' +
    domainsHtml +
    '<details><summary>한계와 사용 범위</summary>' +
    brief.limitations.map(x => '<p>' + escapeHtml(x) + '</p>').join('') + '</details></section>';
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

function renderPage(date, time, responses, synthesis, themes, applied, brief) {
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
    footer{margin-top:36px;color:#adb6c9;font-size:12px;line-height:1.9}
    @media(max-width:540px){main{padding:30px 14px 50px}.pillars{gap:6px}.pillar{padding:13px 5px}.pillar strong{font-size:17px}.domain{padding:16px}dl{grid-template-columns:100px 1fr}}
  </style></head><body><main>
  <header><div class="eyebrow">MYEONGHA · INTERNAL NATAL EXPLORATION</div>
  <h1>나의 사주, 한 장의 흐름</h1>
  <p>${escapeHtml(date)} · ${escapeHtml(time ?? '출생시간 미상')} 입력으로 현재 명하 엔진의 실제 Preview 해석을 조합한 내부 시제품입니다. 해석을 새로 생성하거나 근거 없는 빈칸을 채우지 않습니다.</p>
  </header>
  ${renderPillars(general?.calculationSummary)}
  ${renderGroundedReaderBrief(brief)}
  ${renderSynthesis(synthesis)}
  ${renderActivatedThemes(themes)}
  ${renderAppliedThemeContext(applied)}
  ${responses.map(({ domain, response }) => renderDomain(domain, response)).join('')}
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
  const brief = buildNatalN16GroundedReaderBrief(calculated.snapshot, realSources);
  const researchNow = new Date('2026-10-15T00:00:00.000Z');
  const registry = createGeneralNatalIntegratedReadingRegistry(researchNow.toISOString());
  const interpretation = runInterpretation(calculated.snapshot, registry, {
    requestId: 'n3-theme-preview-internal-only',
    now: researchNow,
  });
  const themes = buildNatalActivatedThemePreview(interpretation);
  const applied = buildNatalAppliedThemeContext(evidence, themes);
  writeFileSync(output, renderPage(date, time, responses, synthesis, themes, applied, brief), 'utf8');
  process.stdout.write(`N16 grounded brief: ${brief.totalOriginalTextUnitCount} real original text units, ${brief.uniqueTextUnitCount} distinct units, ${brief.exactRepeatedTextCount} repeated occurrences; internal only\n`);
  process.stdout.write(`N4 chart-bound interpretations: ${applied.statements.length} actual theme positions\\n`);
  process.stdout.write(`N3 actually matched research themes: ${themes.themes.length}\\n`);
  process.stdout.write(`N1/N2 evidence: ${synthesis.statements.length} traced statements, ` +
    `${synthesis.domainCoverage.filter((entry) => entry.hasInterpretation).length}/5 interpreted domains\\n`);
  process.stdout.write(`Rendered real natal Preview responses to ${output}\n`);
  process.stdout.write(`${responses.map((r) => `${r.domain.title}: ${r.response.state}`).join(' | ')}\n`);
}

await main();
