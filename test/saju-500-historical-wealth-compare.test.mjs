import { describe, expect, it } from 'vitest';
import { compareHistoricalWealthCases } from '../scripts/saju-500-historical-wealth-compare.mjs';
import { FIXED_500_BASELINE } from '../scripts/saju-500-baseline-comparison.mjs';

const initial = FIXED_500_BASELINE.menuResults['재물'];

function pairFixture() {
  const before = [];
  const after = [];
  for (let i = 0; i < 500; i++) {
    const birth = 'matched-birth-' + String(i).padStart(3, '0');
    const hash = 'actual-chart-' + String(i).padStart(3, '0');
    const oldMissing = i < initial.missing;
    const nowMissing = i < 16;
    const selected = [{ claimType:'WEALTH_NATAL_MULTIFACTOR_TEST',
      pattern:'WEALTH_OFFICER', axis:'management', channel:'visible_stems',
      ruleId:'RULE-WEALTH', sourceIds:['SRC-A'],upstreamClaimIds:['T5-A','T5-B'] }];
    before.push({
      birth, calculationHash:hash, state:oldMissing?'insufficient':'partial',
      noT8:oldMissing, selectedT8:oldMissing?[]:selected,
      cause:oldMissing?'no_registered_combination_for_original_t5':'selected_original_t8',
      originalActiveT5ClaimTypes:['TEN_GOD_WEALTH_VISIBLE_STEMS_THEME'],
      originalEligibleT8RuleIds:[],
    });
    after.push({
      birth, calculationHash:hash,state:nowMissing?'insufficient':'partial',
      noT8:nowMissing,selectedT8:nowMissing?[]:selected,
      activeT5ClaimTypes:['TEN_GOD_WEALTH_VISIBLE_STEMS_THEME'],missing:[],
    });
  }
  return {
    old:{
      sourceCommit:FIXED_500_BASELINE.headSha,
      originalAuditRunId:FIXED_500_BASELINE.runId,
      referenceDateTime:FIXED_500_BASELINE.referenceDateTime,
      seed:FIXED_500_BASELINE.seed,count:500,
      withWealthT8:initial.readable,withoutWealthT8:initial.missing,
      cases:before,
    },
    current:{
      seed:FIXED_500_BASELINE.seed,
      referenceDateTime:FIXED_500_BASELINE.referenceDateTime,
      count:500,withWealthT8:484,withoutWealthT8:16,cases:after,
    },
  };
}
describe('original-SHA 500-case Wealth reconstruction versus source-verified current 500', () => {
  it('classifies exactly 95 recovered and 16 persisting original missing cases, never upgrading research authority', () => {
    const {old,current}=pairFixture();
    const x=compareHistoricalWealthCases(old,current);
    expect(x.originalMissing).toBe(111);
    expect(x.recoveredMissing).toBe(95);
    expect(x.stillMissing).toBe(16);
    expect(x.newlyMissing).toBe(0);
    expect(x.originallyCoveredAndStillCovered).toBe(389);
    expect(x.allOriginalMissingPaired).toHaveLength(111);
    expect(x.recovered).toHaveLength(95);
    expect(x.stillMissingCases).toHaveLength(16);
    expect(x.originalMissingByObservedCause).toEqual({
      no_registered_combination_for_original_t5:111,
    });
    expect(x.recoveredByOriginalCause).toEqual({
      no_registered_combination_for_original_t5:95,
    });
    expect(x.recovered[0].current.selectedT8[0].sourceIds).toEqual(['SRC-A']);
    expect(x.researchOnly).toBe(true);
    expect(x.mayPublish).toBe(false);
    expect(x.maySell).toBe(false);
    expect(x.mayCallOfficial).toBe(false);
  });
  it('rejects an invented baseline commit, date, missing count or incomplete 500 births', () => {
    const {old,current}=pairFixture();
    expect(()=>compareHistoricalWealthCases({...old,sourceCommit:'unverified'},current))
      .toThrow('exact original audited source');
    expect(()=>compareHistoricalWealthCases({...old,withoutWealthT8:110},current))
      .toThrow('exact original audited source');
    expect(()=>compareHistoricalWealthCases(old,{...current,referenceDateTime:'2026-10-26'}))
      .toThrow('exact original audited source');
    expect(()=>compareHistoricalWealthCases(old,{...current,cases:current.cases.slice(1)}))
      .toThrow('exact original audited source');
  });
  it('rejects any mismatched canonical hash or missing original birth', () => {
    const {old,current}=pairFixture();
    expect(()=>compareHistoricalWealthCases(old,{
      ...current,cases:[{...current.cases[0],calculationHash:'wrong-chart'},...current.cases.slice(1)],
    })).toThrow('every exact birth and canonical chart hash');
    expect(()=>compareHistoricalWealthCases(old,{
      ...current,cases:[{...current.cases[0],birth:'unknown-birth'},...current.cases.slice(1)],
    })).toThrow('every exact birth and canonical chart hash');
    expect(()=>compareHistoricalWealthCases(old,{
      ...current,cases:[{...current.cases[0],birth:current.cases[1].birth},...current.cases.slice(1)],
    })).toThrow('exact unique selected source evidence');
  });
  it('rejects a new regression even if overall counts are made to look correct', () => {
    const {old,current}=pairFixture();
    const worsened=[...current.cases];
    worsened[499]={...worsened[499],noT8:true,selectedT8:[]};
    worsened[0]={...worsened[0],noT8:false,selectedT8:[{
      claimType:'WEALTH_NATAL_MULTIFACTOR_TEST',
      pattern:'WEALTH_OFFICER',axis:'management',channel:'visible_stems',
      ruleId:'RULE-WEALTH',sourceIds:['SRC-A'],upstreamClaimIds:['T5-A','T5-B'],
    }]};
    expect(()=>compareHistoricalWealthCases(old,{...current,cases:worsened}))
      .toThrow('regressed original Wealth T8 evidence');
  });
  it('does not accept a fake source-free T8 as a recovered interpretation', () => {
    const {old,current}=pairFixture();
    const bad=[...current.cases];
    bad[17]={...bad[17],selectedT8:[{
      ...bad[17].selectedT8[0],sourceIds:[],
    }]};
    expect(()=>compareHistoricalWealthCases(old,{...current,cases:bad}))
      .toThrow('source evidence');
  });
});
