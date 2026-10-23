import { createServer } from 'node:http';
import { Buffer } from 'node:buffer';
import { execFile } from 'node:child_process';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, URLSearchParams } from 'node:url';
import { promisify } from 'node:util';
import process from 'node:process';
import {
  SAJU_READING_MENUS, validateSajuMenuForm,
  renderLocalSelectedSajuMenuReading,
} from './natal-browser-menu-reading.mjs';

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = resolve(dirname(scriptPath), '..');
const runFile = promisify(execFile);
const MAX_FORM_BYTES = 4096;
const LOOPBACK_HOST = '127.0.0.1';

function escapeHtml(input) {
  return String(input).replace(/[&<>"']/gu, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;',
      "'": '&#39;' })[c]);
}

export function validateNatalBirthForm(form) {
  const date = form.get('date');
  const calendarType = form.get('calendarType') ?? 'solar';
  const sex = form.get('sex') ?? 'unspecified';
  const isLeapMonth = form.get('isLeapMonth') === 'on';
  const timeUnknown = form.get('timeUnknown') === 'on';
  const enteredTime = form.get('time');
  if (calendarType !== 'solar' && calendarType !== 'lunar') {
    throw new TypeError('달력 기준을 양력 또는 음력으로 선택해 주세요.');
  }
  if (sex !== 'male' && sex !== 'female' && sex !== 'unspecified') {
    throw new TypeError('전통 계산용 성별을 다시 선택해 주세요.');
  }
  if (calendarType === 'solar' && isLeapMonth) {
    throw new TypeError('윤달은 음력 출생정보에서만 선택할 수 있습니다.');
  }
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/u.test(date)) {
    throw new TypeError('출생일을 YYYY-MM-DD 형식으로 입력해 주세요.');
  }
  const [year, month, day] = date.split('-').map(Number);
  if (year < 1 || year > new Date().getUTCFullYear() ||
      month < 1 || month > 12 || day < 1 || (calendarType === 'lunar' && day > 30)) {
    throw new TypeError('유효한 출생 연월일을 입력해 주세요.');
  }
  if (calendarType === 'solar') {
    const parsed = new Date(date + 'T00:00:00.000Z');
    if (!Number.isFinite(parsed.getTime()) ||
        parsed.toISOString().slice(0, 10) !== date) {
      throw new TypeError('실제로 존재하는 출생일을 입력해 주세요.');
    }
    if (parsed.getTime() > Date.now()) {
      throw new TypeError('미래의 출생일은 사용할 수 없습니다.');
    }
  }
  let time;
  if (timeUnknown) time = 'unknown';
  else if (typeof enteredTime === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/u.test(enteredTime)) {
    time = enteredTime;
  } else {
    throw new TypeError('출생시간을 HH:MM 형식으로 입력하거나 시간 미상을 선택해 주세요.');
  }
  return { date, time, calendarType, isLeapMonth, sex };
}

function page(message = '') {
  const groups = [...new Set(SAJU_READING_MENUS.map(item => item.group))];
  const menuOptions = groups.map(group =>
    '<optgroup label="' + escapeHtml(group) + '">' +
    SAJU_READING_MENUS.filter(item => item.group === group).map(item =>
      '<option value="' + item.id + '">' + escapeHtml(item.label) + '</option>').join('') +
    '</optgroup>').join('');
  const todaySeoul = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 7);
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>명하 사주 · 내 명식으로 풀이 보기</title>
<style>
  :root{color-scheme:dark}*{box-sizing:border-box}
  body{font:16px/1.65 system-ui,sans-serif;color:#ede9f8;background:#10121d;margin:0}
  main{max-width:680px;margin:5vh auto;padding:34px;background:#1d2031;border:1px solid #3e405d;border-radius:20px}
  h1{font-size:28px;margin:0 0 12px}p{color:#ccc8e0}label{display:block;margin:22px 0 8px;font-weight:600}
  input[type=text],input[type=time],input[type=month],textarea,select{display:block;width:100%;padding:12px;border:1px solid #76748a;border-radius:9px;background:#121523;color:#fff;font:inherit}
  textarea{min-height:86px;resize:vertical}fieldset{border:1px solid #53556d;border-radius:12px;padding:12px 20px;margin-top:22px}
  legend{font-weight:700}fieldset label{margin-top:12px}
  .check{display:flex;align-items:center;gap:10px;font-weight:400}
  .check input{width:20px;height:20px}
  button{margin-top:24px;background:#cbc3fa;color:#171422;padding:14px 22px;border:0;border-radius:11px;font:700 16px system-ui;cursor:pointer;width:100%}
  .notice{border-left:3px solid #a99cd8;padding-left:15px;color:#c7c2d9;font-size:14px}
  .error{color:#ffb4b4;font-weight:600}
</style></head><body><main><h1>내 명식으로 사주 풀이 보기</h1>
<p>생년월일과 출생시간을 입력하고 아래 12개 항목 중 하나를 선택하세요. 해당 명식의 근거가 허용된 한국어 풀이 또는 아직 해석하지 못하는 이유를 바로 보여줍니다.</p>
<p class="notice">현재는 <strong>개발자용 로컬 연구 미리보기</strong>입니다. 양력·음력(윤달)을 선택할 수 있고 출생시각을 모르면 미상으로 선택할 수 있습니다. 근거가 부족한 풀이는 부족하다고 표시합니다. 공식 공개·보관·판매되는 결과가 아닙니다.</p>
${message ? `<p role="alert" class="error">${escapeHtml(message)}</p>` : ''}
<form method="post" action="/reading">
<label for="readingMenu">보고 싶은 사주 항목</label>
<select id="readingMenu" name="readingMenu">${menuOptions}</select>
<p class="notice">전체 사주·직업·재물·연애·사업을 고르면 동일 명식의 다섯 분야를 함께 보여줍니다. 다른 항목은 선택한 범위만 풀이합니다.</p>
<label for="calendarType">달력 기준</label>
<select id="calendarType" name="calendarType"><option value="solar">양력</option><option value="lunar">음력</option></select>
<label class="check" for="isLeapMonth"><input id="isLeapMonth" name="isLeapMonth" type="checkbox">음력 윤달 (음력 선택 시)</label>
<label for="date">출생일 (YYYY-MM-DD)</label><input id="date" name="date" type="text" inputmode="numeric" placeholder="1996-01-09" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" required>
<label for="sex">전통 계산용 성별</label><select id="sex" name="sex"><option value="unspecified">선택하지 않음</option><option value="male">남성</option><option value="female">여성</option></select>
<label for="time">출생시간 (24시간제)</label><input id="time" name="time" type="time" value="12:00">
<label class="check" for="timeUnknown"><input id="timeUnknown" name="timeUnknown" type="checkbox">출생시간을 모릅니다</label>
<fieldset><legend>올해·이번 달 — 조회 기간</legend>
<label for="targetPeriod">선택 연월 (서울 달력)</label>
<input type="month" id="targetPeriod" name="targetPeriod" value="${todaySeoul}">
<p class="notice">연도·월이 현재와 다르면 지난달 또는 미래 달의 연구 비교로 표시하며 현재 적용 풀이로 착각하지 않도록 구분합니다.</p></fieldset>
<fieldset><legend>지금 고민으로 보기 — 질문</legend>
<label for="question">묻고 싶은 내용</label>
<textarea id="question" name="question" maxlength="400" placeholder="예: 제 직업운에서 준비와 실행은 어떻게 읽나요?"></textarea>
<p class="notice">확인된 명식 근거와 관련된 부분만 답합니다. 미래 사건·금액·결혼 결과를 임의로 예측하지 않습니다.</p></fieldset>
<fieldset><legend>궁합 — 상대 출생정보 (궁합 선택 시에만 필요)</legend>
<label for="partnerCalendarType">상대 달력 기준</label>
<select id="partnerCalendarType" name="partnerCalendarType"><option value="solar">양력</option><option value="lunar">음력</option></select>
<label class="check" for="partnerLeapMonth"><input id="partnerLeapMonth" name="partnerLeapMonth" type="checkbox">상대 음력 윤달</label>
<label for="partnerDate">상대 출생일</label><input id="partnerDate" name="partnerDate" type="text" inputmode="numeric" placeholder="1997-03-18" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}">
<label for="partnerTime">상대 출생시간</label><input id="partnerTime" name="partnerTime" type="time">
<label class="check" for="partnerTimeUnknown"><input id="partnerTimeUnknown" name="partnerTimeUnknown" type="checkbox">상대 출생시간 미상</label>
<label for="partnerSex">상대 전통 계산용 성별</label>
<select id="partnerSex" name="partnerSex"><option value="unspecified">선택하지 않음</option><option value="male">남성</option><option value="female">여성</option></select>
<label class="check" for="partnerBirthAuthorized"><input id="partnerBirthAuthorized" name="partnerBirthAuthorized" type="checkbox">상대 출생정보를 이 계산에 사용할 권한이 있습니다</label>
<p class="notice">두 명식을 따로 계산하지만 실제 상호 궁합의 좋고 나쁨이나 결혼 결과는 제공하지 않습니다.</p></fieldset>
<button type="submit">내 사주 결과 생성하기</button>
</form></main></body></html>`;
}

function setPrivateHeaders(res) {
  res.setHeader('content-type', 'text/html; charset=utf-8');
  res.setHeader('cache-control', 'no-store, max-age=0');
  res.setHeader('referrer-policy', 'no-referrer');
  res.setHeader('x-content-type-options', 'nosniff');
  res.setHeader('x-frame-options', 'DENY');
  res.setHeader('content-security-policy',
    "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'");
}

async function readPostBody(req) {
  let body = '';
  for await (const chunk of req) {
    body += chunk.toString('utf8');
    if (Buffer.byteLength(body, 'utf8') > MAX_FORM_BYTES) {
      throw new TypeError('요청이 너무 큽니다.');
    }
  }
  return new URLSearchParams(body);
}

export async function renderLocalNatalReading(date, time, calendarType = 'solar', isLeapMonth = false, sex = 'unspecified') {
  const folder = await mkdtemp(join(tmpdir(), 'myeongha-local-natal-'));
  const output = join(folder, 'private-reading.html');
  try {
    await runFile(process.execPath, [
      join(repoRoot, 'scripts', 'natal-personalized-preview.mjs'),
      date, time, output, calendarType, String(isLeapMonth), sex,
    ], { cwd: repoRoot, timeout: 120000, maxBuffer: 1024 * 1024 });
    const html = await readFile(output, 'utf8');
    if (!html.startsWith('<!doctype html>') ||
        !html.includes('내부 개발·품질 비교 전용')) {
      throw new TypeError('기존 Preview 결과 형식이 올바르지 않습니다.');
    }
    return html;
  } finally {
    await rm(folder, { recursive: true, force: true });
  }
}

export function createLocalNatalReaderServer(render = renderLocalNatalReading) {
  return createServer(async (req, res) => {
    setPrivateHeaders(res);
    if (req.method === 'GET' && req.url === '/') {
      res.writeHead(200);
      res.end(page());
      return;
    }
    if (req.method !== 'POST' || req.url !== '/reading') {
      res.writeHead(404);
      res.end(page('지원되지 않는 경로입니다.'));
      return;
    }
    let birth, selection;
    try {
      const form = await readPostBody(req);
      birth = validateNatalBirthForm(form);
      selection = validateSajuMenuForm(form, validateNatalBirthForm);
    } catch (error) {
      res.writeHead(400);
      res.end(page(error instanceof TypeError ? error.message :
        '입력값을 확인해 주세요.'));
      return;
    }
    try {
      const html = SAJU_READING_MENUS.slice(0, 5).some(item => item.id === selection.menu)
        ? await render(birth.date, birth.time, birth.calendarType,
          birth.isLeapMonth, birth.sex)
        : await renderLocalSelectedSajuMenuReading(birth, selection);
      res.writeHead(200);
      res.end(html);
    } catch {
      // A calculation's internal TypeError is not a safe form validation
      // message. No private birth data or internal paths are leaked.
      res.writeHead(503);
      res.end(page('현재 계산 또는 풀이를 완료하지 못했습니다. 출생정보와 서버 실행 상태를 확인해 주세요.'));
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === scriptPath) {
  const server = createLocalNatalReaderServer();
  server.listen(0, LOOPBACK_HOST, () => {
    const address = server.address();
    if (address === null || typeof address === 'string') throw new Error('Missing local port');
    process.stdout.write(`명하 로컬 사주 결과 화면: http://${LOOPBACK_HOST}:${address.port}\n`);
    process.stdout.write('브라우저에 위 주소를 입력하십시오. Ctrl+C로 종료합니다.\n');
  });
}
