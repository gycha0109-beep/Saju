import assert from 'node:assert/strict';
import { URLSearchParams } from 'node:url';
import { test } from 'node:test';
import {
  createLocalNatalReaderServer,
  validateNatalBirthForm,
} from './natal-browser-reader.mjs';

test('birth form accepts a real solar birth date, clock time, or explicit unknown', () => {
  assert.deepEqual(
    validateNatalBirthForm(new URLSearchParams('date=2024-03-10&time=12%3A30')),
    { date: '2024-03-10', time: '12:30', calendarType: 'solar', isLeapMonth: false, sex: 'unspecified' },
  );
  assert.deepEqual(
    validateNatalBirthForm(new URLSearchParams('date=2024-03-10&timeUnknown=on')),
    { date: '2024-03-10', time: 'unknown', calendarType: 'solar', isLeapMonth: false, sex: 'unspecified' },
  );
  for (const date of ['2024-02-30', '2025-02-29', 'garbage', '2999-01-01']) {
    assert.throws(
      () => validateNatalBirthForm(new URLSearchParams({ date, time: '12:00' })),
    );
  }
  assert.throws(() => validateNatalBirthForm(
    new URLSearchParams('date=2024-03-10&time=25%3A00')));
  assert.deepEqual(validateNatalBirthForm(new URLSearchParams(
    'calendarType=lunar&isLeapMonth=on&date=2020-04-30&timeUnknown=on&sex=female')),
    { date: '2020-04-30', time: 'unknown', calendarType: 'lunar', isLeapMonth: true, sex: 'female' });
  assert.throws(() => validateNatalBirthForm(new URLSearchParams(
    'calendarType=lunar&date=2020-04-31&time=12%3A00')));
  assert.throws(() => validateNatalBirthForm(new URLSearchParams(
    'calendarType=solar&isLeapMonth=on&date=2020-04-20&time=12%3A00')));
});

async function serve(render, run) {
  const server = createLocalNatalReaderServer(render);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    const address = server.address();
    assert.ok(address && typeof address !== 'string');
    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise((resolve, reject) =>
      server.close(error => error ? reject(error) : resolve()));
  }
}

test('browser GET → actual birth input POST → same generated HTML response', async () => {
  const captured = [];
  await serve(async (date, time, calendarType, isLeapMonth, sex) => {
    captured.push({ date, time, calendarType, isLeapMonth, sex });
    return '<!doctype html><html lang="ko"><body>실제 명식 기반 풀이</body></html>';
  }, async origin => {
    const landing = await globalThis.fetch(origin);
    assert.equal(landing.status, 200);
    const landingHtml = await landing.text();
    assert.match(landingHtml, /내 사주 결과 생성하기/u);
    assert.match(landingHtml, /value="lunar"/u);
    assert.match(landingHtml, /name="isLeapMonth"/u);
    assert.match(landing.headers.get('cache-control'), /no-store/u);
    const response = await globalThis.fetch(origin + '/reading', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ date: '2024-03-10', time: '08:45' }),
    });
    assert.equal(response.status, 200);
    assert.match(await response.text(), /실제 명식 기반 풀이/u);
    const unknown = await globalThis.fetch(origin + '/reading', {
      method: 'POST',
      body: new URLSearchParams({ date: '2024-03-10', timeUnknown: 'on' }),
    });
    assert.equal(unknown.status, 200);
    const lunarResponse = await globalThis.fetch(origin + '/reading', {
      method: 'POST',
      body: new URLSearchParams({
        calendarType: 'lunar', date: '2020-04-30', time: '11:15',
        isLeapMonth: 'on', sex: 'male',
      }),
    });
    assert.equal(lunarResponse.status, 200);
    assert.deepEqual(captured, [
      { date: '2024-03-10', time: '08:45', calendarType: 'solar', isLeapMonth: false, sex: 'unspecified' },
      { date: '2024-03-10', time: 'unknown', calendarType: 'solar', isLeapMonth: false, sex: 'unspecified' },
      { date: '2020-04-30', time: '11:15', calendarType: 'lunar', isLeapMonth: true, sex: 'male' },
    ]);
  });
});

test('malformed birth input cannot reach calculation and is explained on the form', async () => {
  let calls = 0;
  await serve(async () => { calls++; return ''; }, async origin => {
    const response = await globalThis.fetch(origin + '/reading', {
      method: 'POST',
      body: new URLSearchParams({ date: '2025-02-30', time: '12:00' }),
    });
    assert.equal(response.status, 400);
    assert.match(await response.text(), /실제로 존재하는 출생일/u);
    assert.equal(calls, 0);
  });
});

test('calculation failure produces safe error rather than exposing server internals', async () => {
  await serve(async () => { throw new Error('internal calculation secret'); }, async origin => {
    const response = await globalThis.fetch(origin + '/reading', {
      method: 'POST',
      body: new URLSearchParams({ date: '2024-03-10', time: '12:00' }),
    });
    assert.equal(response.status, 503);
    const html = await response.text();
    assert.match(html, /계산 또는 풀이를 완료하지 못했습니다/u);
    assert.doesNotMatch(html, /internal calculation secret/u);
    assert.match(html, /공식 공개·보관·판매되는 결과가 아닙니다/u);
  });
});

import {
  SAJU_READING_MENUS, validateSajuMenuForm,
  renderLocalSelectedSajuMenuReading,
} from './natal-browser-menu-reading.mjs';

test('all twelve reading choices are real scoped entries and validate their specific inputs', () => {
  assert.equal(SAJU_READING_MENUS.length, 12);
  assert.equal(new Set(SAJU_READING_MENUS.map(item => item.id)).size, 12);
  assert.equal(validateSajuMenuForm(
    new URLSearchParams('readingMenu=general'), validateNatalBirthForm).menu, 'general');
  assert.throws(() => validateSajuMenuForm(
    new URLSearchParams('readingMenu=unknown'), validateNatalBirthForm), /열두 항목/u);
  assert.throws(() => validateSajuMenuForm(
    new URLSearchParams('readingMenu=monthly&targetPeriod=2026-13'),
    validateNatalBirthForm), /조회할 연월/u);
  assert.throws(() => validateSajuMenuForm(
    new URLSearchParams('readingMenu=question&question= '),
    validateNatalBirthForm), /질문/u);
  assert.throws(() => validateSajuMenuForm(
    new URLSearchParams('readingMenu=compatibility&partnerDate=1997-03-18'),
    validateNatalBirthForm), /사용 권한/u);
  assert.throws(() => validateSajuMenuForm(
    new URLSearchParams('readingMenu=compatibility&partnerBirthAuthorized=on&partnerDate=1997-02-30&partnerTime=14%3A00'),
    validateNatalBirthForm), /실제로 존재하는 출생일/u);
  const couple = validateSajuMenuForm(
    new URLSearchParams('readingMenu=compatibility&partnerBirthAuthorized=on&partnerDate=1997-03-18&partnerTime=14%3A00'),
    validateNatalBirthForm);
  assert.equal(couple.partner.date, '1997-03-18');
  assert.equal(couple.partner.time, '14:00');
});

test('browser exposes all twelve choices without requiring unrelated partner or question inputs', async () => {
  let rendered = 0;
  await serve(async () => {
    rendered++;
    return '<!doctype html><html lang="ko"><body>개인별 원국 보고서</body></html>';
  }, async origin => {
    const response = await globalThis.fetch(origin);
    assert.equal(response.status, 200);
    const html = await response.text();
    for (const menu of SAJU_READING_MENUS) {
      assert.match(html, new RegExp('value="' + menu.id + '"', 'u'));
    }
    const invalid = await globalThis.fetch(origin + '/reading', {
      method: 'POST',
      body: new URLSearchParams({
        readingMenu: 'question', question: '', date: '1996-01-09', time: '09:30',
      }),
    });
    assert.equal(invalid.status, 400);
    assert.match(await invalid.text(), /질문/u);
    assert.equal(rendered, 0);
    const natal = await globalThis.fetch(origin + '/reading', {
      method: 'POST',
      body: new URLSearchParams({
        readingMenu: 'career', date: '1996-01-09', time: '09:30',
      }),
    });
    assert.equal(natal.status, 200);
    assert.match(await natal.text(), /개인별 원국 보고서/u);
    assert.equal(rendered, 1);
  });
});

test('existing real source readings are accessible in the same local browser without new meaning', async () => {
  const self = {
    date: '1996-01-09', time: '09:30', calendarType: 'solar',
    isLeapMonth: false, sex: 'unspecified',
  };
  const annual = await renderLocalSelectedSajuMenuReading(self, {
    menu: 'annual', targetPeriod: '2026-09', question: '',
  });
  assert.match(annual, /id="year-reading"/u);
  assert.match(annual, /id="monthly-reading"/u);
  assert.match(annual, /항목 다시 선택/u);
  const family = await renderLocalSelectedSajuMenuReading(self, {
    menu: 'family', targetPeriod: '2026-09', question: '',
  });
  assert.match(family, /부모와 관련된 본인 명식/u);
  assert.match(family, /자녀와 관련된 본인 명식/u);
  assert.match(family, /정식 서비스·공개·보관·판매 권한은 없습니다/u);
  const question = await renderLocalSelectedSajuMenuReading(self, {
    menu: 'question', targetPeriod: '2026-09',
    question: '제 재물운 관리가 궁금해요',
  });
  assert.match(question, /질문:/u);
  assert.match(question, /제 재물운 관리가 궁금해요/u);
  assert.match(question, /정식 질문풀이 아님/u);
  const month = await renderLocalSelectedSajuMenuReading(self, {
    menu: 'monthly', targetPeriod: '2026-09', question: '',
  });
  assert.match(month, /id="monthly-reading"/u);
  const stage = await renderLocalSelectedSajuMenuReading(self, {
    menu: 'life-stage', targetPeriod: '2026-09', question: '',
  });
  assert.match(stage, /지금과 다음 삶의 단계/u);
  const spouse = await renderLocalSelectedSajuMenuReading(self, {
    menu: 'spouse', targetPeriod: '2026-09', question: '',
  });
  assert.match(spouse, /배우자궁/u);
  const pair = await renderLocalSelectedSajuMenuReading(self, {
    menu: 'compatibility', targetPeriod: '2026-09', question: '',
    partner: {
      ...self, date: '1997-03-18', time: '14:00',
    },
  });
  assert.match(pair, /두 사람/u);
  assert.match(pair, /궁합/u);
});

// Actual birth-date/hour/minute differentiation for the eight self-reading menus.
import './saju-eight-menu-random-differentiation.node-check.mjs';
