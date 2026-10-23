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
    const lunarResponse = await fetch(origin + '/reading', {
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
