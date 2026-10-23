import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { buildThreeTemporalMenusBirthReading } from
  '../dist/preview/three-temporal-menus-birth-reading.js';

const usage = 'node scripts/saju-three-temporal-reading.mjs YYYY-MM-DD HH:MM|unknown [YYYY-MM] [output.html] [--sex male|female|unspecified] [--lunar] [--leap]';
const args = process.argv.slice(2);
const dateInput = args[0] ?? '';
const timeInput = args[1] ?? '';
if (args.length < 2) throw new TypeError(usage);
let optional = args.slice(2);
const sexIndex = optional.indexOf('--sex');
const sex = sexIndex < 0 ? 'unspecified' : optional[sexIndex + 1];
if (!['male', 'female', 'unspecified'].includes(sex)) throw new TypeError(usage);
if (sexIndex >= 0) optional = optional.filter((_, i) => i !== sexIndex && i !== sexIndex + 1);
const lunar = optional.includes('--lunar');
const leap = optional.includes('--leap');
optional = optional.filter(arg => arg !== '--lunar' && arg !== '--leap');
if (optional.length > 2 || (leap && !lunar)) throw new TypeError(usage);
const date = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(dateInput);
const time = /^([01]\d|2[0-3]):([0-5]\d)$/u.exec(timeInput);
if (!date || (!time && timeInput !== 'unknown')) throw new TypeError(usage);
const yr = Number(date[1]), mon = Number(date[2]), day = Number(date[3]);
if (yr < 1800 || yr > 2300 || mon < 1 || mon > 12 || day < 1 || day > 31) {
  throw new RangeError('지원되지 않는 생년월일입니다.');
}
if (!lunar) {
  const expected = new Date(Date.UTC(yr, mon - 1, day));
  if (expected.getUTCFullYear() !== yr ||
      expected.getUTCMonth() + 1 !== mon ||
      expected.getUTCDate() !== day) throw new RangeError('실제 존재하는 생년월일을 입력하세요.');
}
const now = new Date();
const inSeoul = new Date(now.getTime() + 9 * 60 * 60 * 1000);
const defaultPeriod = inSeoul.toISOString().slice(0, 7);
const targetPeriod = optional[0] && /^\d{4}-\d{2}$/u.test(optional[0])
  ? optional.shift() : defaultPeriod;
if (optional.length > 1) throw new TypeError(usage);
const selected = /^(\d{4})-(\d{2})$/u.exec(targetPeriod);
if (!selected) throw new TypeError(usage);
const year = Number(selected[1]), month = Number(selected[2]);
if (year < 1800 || year > 2300 || month < 1 || month > 12) throw new RangeError('선택 연월이 유효하지 않습니다.');
const output = resolve(optional[0] || 'saju-time-reading.html');
const birth = {
  calendarType: lunar ? 'lunar' : 'solar',
  date: { year: yr, month: mon, day },
  time: time ? { known: true, hour: Number(time[1]), minute: Number(time[2]) } : { known: false },
  sexForTraditionalCalculation: sex,
  ...(lunar ? { isLeapMonth: leap } : {}),
};
const result = buildThreeTemporalMenusBirthReading(birth, {
  requestId: 'local-three-time-menu-reading',
  targetYear: year, targetMonth: month,
  referenceDateTime: now.toISOString(),
});
writeFileSync(output, result.html, 'utf8');
const report = result.annualMonthly.report;
const lines = [
  '명하 사주 — 올해 · 이번 달 · 삶의 단계',
  '생년월일: ' + dateInput + ' ' + timeInput +
    (lunar ? ' (음력' + (leap ? ' 윤달' : '') + ')' : ' (양력)'),
  '선택 연월: ' + year + '년 ' + month + '월 · 내부 연구용 결과',
  '',
  '━━ 올해 ━━',
];
for (const section of report.annual.sections) {
  lines.push(section.title, section.text);
}
if (report.annualReference.state === 'outside_target_civil_year') {
  lines.push('선택 연도는 조회 시각의 현재 연도가 아닌 연구 비교 자료입니다.');
}
lines.push('', '━━ 이번 달 ━━');
const ref = report.monthly.referenceReading;
if (ref.state === 'in_period' && ref.theme) {
  lines.push(ref.theme.title, ref.theme.text);
} else if (ref.state === 'outside_target_month') {
  lines.push('조회 시각이 선택한 달 밖입니다. 현재 월운으로 표시하지 않습니다.');
} else {
  lines.push('선택한 구간의 월운 연구 근거가 부족합니다.');
}
lines.push('절입 전·후 전체 문단은 HTML 결과에 포함되어 있습니다.', '', '━━ 삶의 단계 ━━');
const life = result.lifeStage.report;
if (life.periods.length === 0) lines.push(...life.missing);
for (const period of life.periods) lines.push(period.text);
lines.push('대운은 계산 기간만 확인되었으며 사건·길흉 해석이 아닙니다.',
  '', '전체 3메뉴 풀이 HTML: ' + output,
  'Official/공개/저장/판매 권한 없음');
process.stdout.write(lines.join('\n') + '\n');
