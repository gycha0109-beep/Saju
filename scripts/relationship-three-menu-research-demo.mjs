import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../dist/production/production-calculation-runtime.js';
import { buildFamilyCanonicalObservationPreview } from '../dist/preview/family-parents-children-observation-preview.js';
import { buildCompatibilityTwoChartIntakePreview } from '../dist/preview/compatibility-two-chart-intake-preview.js';
import { buildRelationshipThreeMenuResearchPage } from '../dist/preview/relationship-three-menu-research-page.js';

const [firstDate = '1990-05-15', firstTime = '14:30',
  secondDate = '1996-01-09', secondTime = '09:30',
  htmlPath = 'relationship-three-menu-research-preview.html'] = process.argv.slice(2);

function parseBirth(date, time) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(date);
  const timeMatch = /^(\d{2}):(\d{2})$/u.exec(time);
  if (!match || (time !== 'unknown' && !timeMatch)) {
    throw new RangeError('Use YYYY-MM-DD and HH:mm|unknown for each person.');
  }
  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText), month = Number(monthText), day = Number(dayText);
  const hour = Number(timeMatch?.[1]), minute = Number(timeMatch?.[2]);
  const monthDays = new Date(Date.UTC(year, month, 0)).getUTCDate();
  if (year < 1800 || year > 2300 || month < 1 || month > 12 ||
      day < 1 || day > monthDays ||
      (time !== 'unknown' && (hour > 23 || minute > 59))) {
    throw new RangeError('Birth date or clock is outside the supported range.');
  }
  return {
    calendarType: 'solar',
    date: { year, month, day },
    time: time === 'unknown'
      ? { known: false }
      : { known: true, hour, minute },
    sexForTraditionalCalculation: 'unspecified',
  };
}

// This local research demo must only be used with birth information the caller
// is authorized to handle; it neither proves consent nor grants product access.
const now = new Date('2026-09-03T13:00:00.000Z');
const subject = calculateAuthorizedMyeonghwaProductionSnapshot(
  parseBirth(firstDate, firstTime), { now },
).snapshot;
const parents = buildFamilyCanonicalObservationPreview(subject, 'parents');
const children = buildFamilyCanonicalObservationPreview(subject, 'children');
let compatibility;
if (secondDate !== 'none') {
  const target = calculateAuthorizedMyeonghwaProductionSnapshot(
    parseBirth(secondDate, secondTime), { now },
  ).snapshot;
  compatibility = buildCompatibilityTwoChartIntakePreview(
    {
      requestId: 'three-relationship-menu-demo',
      intent: { domain: 'compatibility', temporalScope: 'natal' },
      targetPersonRef: 'other-person',
    },
    { personRef: 'self', snapshot: subject },
    { personRef: 'other-person', snapshot: target },
  );
}
const result = buildRelationshipThreeMenuResearchPage({
  subjectSnapshot: subject, parents, children,
  ...(compatibility === undefined ? {} : { compatibility }),
});
const file = resolve(htmlPath);
writeFileSync(file, result.html, 'utf8');
process.stdout.write('Relationship research preview: ' + file +
  ' (family=' + result.cards[0].state +
  ', spouse=' + result.cards[1].state +
  ', compatibility=' + result.cards[2].state +
  ', official=false)\n');
