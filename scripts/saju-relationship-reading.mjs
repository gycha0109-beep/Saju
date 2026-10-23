import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { buildThreeRelationshipMenusBirthReading } from
  '../dist/preview/three-relationship-menus-birth-reading.js';

const usage = 'node scripts/saju-relationship-reading.mjs MY-YYYY-MM-DD MY-HH:MM|unknown OTHER-YYYY-MM-DD OTHER-HH:MM|unknown --consent-other [output.html]';
const args = process.argv.slice(2);
if (args.length < 5 || !args.includes('--consent-other')) {
  throw new TypeError('두 사람의 출생정보와 상대 정보 사용 동의가 필요합니다. ' + usage);
}
const [subjectDate, subjectTime, targetDate, targetTime] = args;
const tail = args.slice(4).filter(x => x !== '--consent-other');
if (tail.length > 1 || tail.some(x => x.startsWith('--'))) throw new TypeError(usage);
function parseBirth(dateInput, timeInput) {
  const date = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(dateInput);
  const time = /^([01]\d|2[0-3]):([0-5]\d)$/u.exec(timeInput);
  if (!date || (!time && timeInput !== 'unknown')) throw new TypeError(usage);
  const year = Number(date[1]), month = Number(date[2]), day = Number(date[3]);
  if (year < 1800 || year > 2300 || month < 1 || month > 12 || day < 1 || day > 31) {
    throw new RangeError('생년월일이 지원 범위를 벗어났습니다.');
  }
  const check = new Date(Date.UTC(year, month - 1, day));
  if (check.getUTCFullYear() !== year ||
      check.getUTCMonth() + 1 !== month ||
      check.getUTCDate() !== day) {
    throw new RangeError('실제 존재하지 않는 생년월일입니다.');
  }
  return {
    calendarType: 'solar',
    date: { year, month, day },
    time: time
      ? { known: true, hour: Number(time[1]), minute: Number(time[2]) }
      : { known: false },
    sexForTraditionalCalculation: 'unspecified',
  };
}
const subject = parseBirth(subjectDate, subjectTime);
const target = parseBirth(targetDate, targetTime);
const output = resolve(tail[0] || 'saju-relationship-reading.html');
const result = buildThreeRelationshipMenusBirthReading(subject, target, {
  requestId: 'local-relationship-research',
  subjectPersonRef: 'subject',
  targetPersonRef: 'other',
  referenceDateTime: new Date().toISOString(),
  targetBirthUseAuthorized: true,
});
writeFileSync(output, result.html, 'utf8');
const lines = [
  '명하 사주 · 가족/배우자/궁합 한 번에 읽기',
  '내 출생: ' + subjectDate + ' ' + subjectTime,
  '상대 출생: ' + targetDate + ' ' + targetTime,
  '내부 연구용 · 두 사람의 실제 관계/미래 결과 미판정',
  '',
  '━━ 가족 · 부모/자녀 별도 범위 ━━',
];
for (const scope of ['parents', 'children']) {
  const report = result.family[scope].report;
  lines.push(scope === 'parents' ? '부모 관련' : '자녀 관련');
  for (const obs of report.observations) lines.push(obs.text);
  if (report.missing.length) lines.push('근거 부족: ' + report.missing.join(' / '));
}
lines.push('', '━━ 배우자궁 · 위치만 ━━', result.spouse.report.observation,
  '', '━━ 궁합 · 두 명식 계산 비교 ━━');
for (const row of result.compatibility.report.comparisons) lines.push(row.explanation);
for (const [title, reading] of [
  ['내 원국 관계 풀이', result.compatibility.personalRelationship.subject],
  ['상대 원국 관계 풀이', result.compatibility.personalRelationship.target],
]) {
  lines.push(title);
  if (reading.sections.length === 0) lines.push('현재 확인된 출처 한정 문단이 없습니다.');
  for (const section of reading.sections) lines.push(section.title, section.paragraph);
}
lines.push('두 사람의 상호 궁합 T10 해석은 아직 미승인입니다.',
  '', '전체 결과 HTML: ' + output, '공식·공개·저장·판매 권한 없음');
process.stdout.write(lines.join('\n') + '\n');
