import { writeFileSync } from 'node:fs';
import process from 'node:process';
import { resolve } from 'node:path';
import {
  createMyeonghwaProductionPreviewOnlyCalculationProcessV1,
  PRODUCTION_CALCULATION_PROCESS_ENV_V1,
} from '../dist/production-calculation-process.js';
import { PRODUCT_PREVIEW_READING_HTTP_PATH } from '../dist/production-calculation-host.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../dist/production/production-calculation-runtime.js';
import { createGeneralNatalIntegratedReadingRegistry } from '../dist/interpretation/general-natal-integrated-reading-registry.js';
import { runInterpretation } from '../dist/interpretation/interpretation-engine.js';
import { buildReadingCompositionEvidence } from '../dist/reading/reading-intent-composition.js';
import { evaluateGeneralNatalMurShadowV1 } from '../dist/reading/general-natal-mur-shadow.js';

const dates = ['1984-01-07','1989-09-08','1992-01-12','1996-01-09',
  '2001-06-21','2010-02-03','2018-07-14','2024-03-10'];
const cases = [
  ...dates.flatMap((date) => ['00:30','05:30','12:30','19:30'].map((time) =>
    ({caseId:'solar-'+date+'-'+time,date,time}))),
  ...['1992-01-12','2024-03-10'].map((date) =>
    ({caseId:'unknown-time-'+date,date,time:null})),
  {caseId:'same-birth-control-2024-03-10-12:30',date:'2024-03-10',time:'12:30'},
];
const now = new Date('2026-10-15T00:00:00.000Z');
const bearer = 'n12-local-loopback-qa-only';
const registry = createGeneralNatalIntegratedReadingRegistry(now.toISOString());
const runtime = createMyeonghwaProductionPreviewOnlyCalculationProcessV1({
  [PRODUCTION_CALCULATION_PROCESS_ENV_V1.serviceBearer]: bearer,
  [PRODUCTION_CALCULATION_PROCESS_ENV_V1.host]:'127.0.0.1',
  [PRODUCTION_CALCULATION_PROCESS_ENV_V1.port]:'3000',
});

async function main() {
  await new Promise((ok,fail) => {
    runtime.server.once('error',fail);
    runtime.server.listen(0,'127.0.0.1',ok);
  });
  const address = runtime.server.address();
  if (!address || typeof address === 'string') throw new TypeError('Expected loopback port');
  const output = [];
  try {
    for (const item of cases) {
      const response = await globalThis.fetch('http://127.0.0.1:' + address.port + PRODUCT_PREVIEW_READING_HTTP_PATH,{
        method:'POST',
        headers:{authorization:'Bearer '+bearer,'content-type':'application/json'},
        body:JSON.stringify({birth:{calendarType:'solar',date:item.date,time:item.time,sex:'unspecified'},
          reading:{text:'사주'}}),
      });
      if (!response.ok) throw new TypeError('N12 HTTP not OK: ' + item.caseId + '/' + response.status);
      const body = await response.json();
      const [year,month,day] = item.date.split('-').map(Number);
      const [hour,minute] = item.time === null ? [] : item.time.split(':').map(Number);
      const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot({
        calendarType:'solar',date:{year,month,day},
        time:hour === undefined || minute === undefined
          ? {known:false} : {known:true,hour,minute},
        sexForTraditionalCalculation:'unspecified',
      },{now}).snapshot;
      const interpretation = runInterpretation(snapshot,registry,{
        now,requestId:'n12-'+item.caseId,
      });
      const composition = buildReadingCompositionEvidence(snapshot,interpretation,registry,{
        requestId:'n12-'+item.caseId,intent:{domain:'general',temporalScope:'natal'},
      });
      const shadow = evaluateGeneralNatalMurShadowV1({
        snapshotId:snapshot.snapshotId,interpretation,selection:composition.selection,response:body,
      });
      output.push({caseId:item.caseId,...shadow});
    }
  } finally {
    await new Promise((ok,fail) => runtime.server.close((e) => e ? fail(e) : ok()));
  }
  if (output.length !== 35) throw new TypeError('N12 must evaluate exactly 35 real HTTP cases.');
  const report = {
    version:'saju-natal-n12-http-mur-shadow-v1',
    lifecycle:'internal_quality_shadow',
    mayPublish:false,maySell:false,
    caseCount:output.length,
    technicalDeliveredCount:output.filter((x) => x.technicalDelivered).length,
    usefulCompleteCount:output.filter((x) => x.usefulComplete).length,
    states:Object.fromEntries([...new Set(output.map((x) => x.state))].sort()
      .map((name) => [name,output.filter((x) => x.state === name).length])),
    cases:output,
  };
  const path = resolve(process.argv[2] ?? 'natal-mur-shadow.json');
  writeFileSync(path,JSON.stringify(report,null,2)+'\n','utf8');
  process.stdout.write('N12 MUR shadow: '+report.technicalDeliveredCount+'/'+report.caseCount+
    ' HTTP delivered; '+report.usefulCompleteCount+' admitted substantive core; '+path+'\n');
}

main().catch((e) => {
  process.stderr.write('N12 MUR audit failed: '+String(e)+'\n');
  process.exitCode=1;
});
