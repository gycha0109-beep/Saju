import assert from 'node:assert/strict';
import process from 'node:process';
import { readFileSync } from 'node:fs';
import { auditCapabilities } from './saju-500-capability-reachability-audit.mjs';

const file = process.argv[2];
if (!file) throw new TypeError('Usage: node scripts/saju-500-capability-reachability-check.mjs 500-AUDIT.json');
const basis = JSON.parse(readFileSync(file,'utf8'));
const clone = value => JSON.parse(JSON.stringify(value));

const current = auditCapabilities(basis);
assert.deepEqual(current.errors, []);
assert.equal(current.source.calculationHashVerifiedPerBirth,500);
assert.equal(current.source.menus,8);
assert.equal(Object.keys(current.structuralCalculation).length,11);
for (const value of Object.values(current.structuralCalculation)) {
  assert.equal(value.resolvedBirths,500);
}
for (const [menu, stats] of Object.entries(current.natalReadingConsumption)) {
  assert.equal(stats.selectedT8Sections,
    basis.caseRows[menu].reduce((sum,r)=>sum+r.sourceEvidence.length,0));
  assert.ok(stats.selectedT8Births <= stats.deliveredReadableBirths,
    menu + ' reports more T8 cases than source-bounded readable cases');
}
assert.ok(current.fourStageCapabilityMatrix.length >= 20);
assert.ok(current.provenance.selectedT8FactPaths.length>0);
assert.ok(current.provenance.selectedT8FactPaths.every(item =>
  item.path.startsWith('derivedFacts.tenGods.value.')));
assert.equal(current.lifeStage.authorizedLifeStageMeaningBirths,0);

const wrongHash = clone(basis);
wrongHash.caseRows['이번 달'][0].calculationHash = 'fabricated-calculation-hash';
const corrupted = auditCapabilities(wrongHash);
assert.equal(corrupted.status,'FAIL');
assert.ok(corrupted.errors.some(error => error.includes('canonical calculation hash differs')));

const missingMenuRow = clone(basis);
missingMenuRow.caseRows['재물'].pop();
assert.throws(()=>auditCapabilities(missingMenuRow),/unchanged successful 500-person/);

const wrongClaim = clone(basis);
const original = wrongClaim.caseRows['전체 사주']
  .find(row=>row.sourceEvidence.length>0);
original.sourceEvidence[0].ruleId='fabricated-t8-rule';
const broken = auditCapabilities(wrongClaim);
assert.equal(broken.status,'FAIL');
assert.ok(broken.errors.some(error => error.includes('not a registered T8')));

process.stdout.write('SAJU500_CAPABILITY_CHECK PASS - actual T0/T8/T9 consumption, 24-family inventory and three tamper guards verified\n');
