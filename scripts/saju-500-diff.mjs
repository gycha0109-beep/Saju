import { readFileSync, writeFileSync } from 'node:fs';
import process from 'node:process';
const [baselinePath, candidatePath, outputPath] = process.argv.slice(2);
if (!baselinePath || !candidatePath) {
  throw new Error('Usage: node scripts/saju-500-diff.mjs baseline.json candidate.json [output.json]');
}
const a = JSON.parse(readFileSync(baselinePath, 'utf8'));
const b = JSON.parse(readFileSync(candidatePath, 'utf8'));
const menus = Object.keys(a.caseResults ?? {});
if (a.seed !== b.seed || a.count !== b.count || menus.length !== 8) {
  throw new Error('Comparison requires matching fixed 500-case inputs and eight menus.');
}
const differences = {};
for (const menu of menus) {
  const left = a.caseResults[menu];
  const right = b.caseResults?.[menu];
  if (!Array.isArray(right) || left.length !== right.length) {
    throw new Error('Missing or misaligned case results for ' + menu);
  }
  const changed = [];
  const movements = {};
  for (let i = 0; i < left.length; ++i) {
    const before = left[i], after = right[i];
    if (before.birth !== after.birth || before.calculationHash !== after.calculationHash) {
      throw new Error('Calculation input or output diverged at ' + menu + '/' + i);
    }
    if (before.meaningSignature !== after.meaningSignature ||
        before.state !== after.state || before.exactTextHash !== after.exactTextHash) {
      const prior = new Set(before.consumedMeaning.map(x => JSON.stringify(x)));
      const subsequent = new Set(after.consumedMeaning.map(x => JSON.stringify(x)));
      const lost = before.consumedMeaning.filter(x => !subsequent.has(JSON.stringify(x)));
      const gained = after.consumedMeaning.filter(x => !prior.has(JSON.stringify(x)));
      const transition = before.state + ' → ' + after.state;
      movements[transition] = (movements[transition] ?? 0) + 1;
      changed.push({
        birth: before.birth,
        calculationHash: before.calculationHash,
        transition,
        meaningChanged: before.meaningSignature !== after.meaningSignature,
        textChanged: before.exactTextHash !== after.exactTextHash,
        lost,
        gained,
        beforeText: before.text,
        afterText: after.text,
      });
    }
  }
  differences[menu] = {
    changedCases: changed.length,
    changedMeaningCases: changed.filter(x => x.meaningChanged).length,
    changesWithLostMeaning: changed.filter(x => x.lost.length > 0).length,
    changesWithGainedMeaning: changed.filter(x => x.gained.length > 0).length,
    stateMovements: movements,
    changed,
  };
}
const result = {
  baselineCommit: '4d430070f2528b6c767b124813ade9c894f22856',
  referenceCommit: '527aa1407bf71b165fba67a139efd98dd6b83980',
  fixedSeed: a.seed,
  inputs: a.count,
  menus: Object.fromEntries(Object.entries(differences).map(([name, d]) => [
    name, { changedCases:d.changedCases, changedMeaningCases:d.changedMeaningCases,
      changesWithLostMeaning:d.changesWithLostMeaning, changesWithGainedMeaning:d.changesWithGainedMeaning,
      stateMovements:d.stateMovements },
  ])),
  details: differences,
};
if (outputPath) writeFileSync(outputPath, JSON.stringify(result,null,2)+'\n');
process.stdout.write('SAJU500_COMPARISON '+JSON.stringify(result.menus)+'\n');
