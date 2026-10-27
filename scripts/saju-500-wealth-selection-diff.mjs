import { readFileSync, writeFileSync } from 'node:fs';
import process from 'node:process';
import console from 'node:console';
const [beforeFile, afterFile, outFile] = process.argv.slice(2);
if (!beforeFile || !afterFile || !outFile) throw new Error('Expected before, after, output files');
const before = JSON.parse(readFileSync(beforeFile, 'utf8'));
const after = JSON.parse(readFileSync(afterFile, 'utf8'));
if (before.seed !== after.seed || before.count !== 500 || after.count !== 500) {
  throw new Error('Changed fixed population.');
}
const a = before.caseResults['재물'];
const b = after.caseResults['재물'];
const rows = [];
for (let i = 0; i < 500; i++) {
  const oldRow = a[i], newRow = b[i];
  if (oldRow.birth !== newRow.birth || oldRow.calculationHash !== newRow.calculationHash) {
    throw new Error('Different chart for case ' + i);
  }
  const oldClaims = oldRow.consumedMeaning.map(c => ({ claimType:c[0], axis:c[2], channel:c[3] }));
  const newlyDisplayed = newRow.consumedMeaning.map(c => c[0]);
  const alternatives = newRow.eligibleAlternatives ?? [];
  const differences = oldClaims.filter(c => !newlyDisplayed.includes(c.claimType));
  if (!differences.length) continue;
  const classifications = differences.map(c => {
    const found = alternatives.find(x => x.claimType === c.claimType);
    return {
      ...c,
      kind: found ? 'STILL_SOURCE_QUALIFIED_BUT_NOT_SELECTED' : 'NO_LONGER_IN_AVAILABLE_ALTERNATIVES',
      sourceIds: found?.sourceIds ?? [],
      ruleId: found?.ruleId ?? null,
      factPaths: found?.factPaths ?? [],
    };
  });
  rows.push({
    birth: oldRow.birth, beforeState:oldRow.state, afterState:newRow.state,
    beforeDisplayed:oldClaims,
    afterDisplayed:newRow.consumedMeaning,
    classifications,
    afterExplanation:newRow.coverageExplanation,
  });
}
const lost = rows.flatMap(x=>x.classifications);
const summary = {
  baselineSeed:before.seed,
  changedDisplayedCases:rows.length,
  changedDisplayedClaims:lost.length,
  stillSourceQualified:lost.filter(x=>x.kind==='STILL_SOURCE_QUALIFIED_BUT_NOT_SELECTED').length,
  noLongerEligible:lost.filter(x=>x.kind==='NO_LONGER_IN_AVAILABLE_ALTERNATIVES').length,
  cases:rows,
};
writeFileSync(outFile,JSON.stringify(summary,null,2)+'\n','utf8');
console.log('SAJU500_WEALTH_OMISSIONS '+JSON.stringify({
  changedDisplayedCases:summary.changedDisplayedCases,
  changedDisplayedClaims:summary.changedDisplayedClaims,
  stillSourceQualified:summary.stillSourceQualified,
  noLongerEligible:summary.noLongerEligible,
}));
