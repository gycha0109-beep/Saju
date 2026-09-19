# R080 — bounded historical chronology backtest

Date: 2026-09-19  
Issue: #1023  
Status: ONE RETROSPECTIVE ALIGNMENT VERIFIED / PREDICTIVE VALIDATION NOT ESTABLISHED

## Method boundary

R080 separates three things:
1. interpretive-source claim;
2. independently checkable historical chronology;
3. whether the source claim predates the event.

A chronology match from a retrospective commentary is **not** prospective predictive validation.

## Candidate A — 袁世凱

### Interpretive source

子平真詮評註 gives:
- chart: `己未 癸酉 丁巳 丁未`;
- temporal claim: `至卯運...眾叛親離`.

Source:
https://www.ncc.com.tw/fate/paleo/bg/bg_033.htm

### Independent chronology

Independent authority records Yuan Shikai's birth as 1859-09-16 and death as 1916-06-06.

U.S. diplomatic records independently document:
- monarchy agitation in 1915;
- provincial defections and revolutionary opposition in 1916;
- cancellation of the monarchy on 1916-03-22/23;
- continuing demands for Yuan's resignation;
- death on 1916-06-06.

### Dayun-period derivation

Direct classical start-direction rule:
- 陰男逆行;
- start-age conversion uses approximately 3 days = 1 year.

Yuan's 己 year is Yin and the chart is male, so the month pillar 癸酉 is traversed in reverse:

`壬申 → 辛未 → 庚午 → 己巳 → 戊辰 → 丁卯`

Birth is about 7–8 days after 白露, producing a start age around 2.3–2.7 years under the cited conversion. This puts 丁卯 roughly in the 1912–1922 decade.

The documented 1915–1916 political collapse therefore lies inside the source-claimed 卯運 interval.

### Classification

`RETROSPECTIVE_CHRONOLOGY_ALIGNMENT`

Reason:
- temporal interval and event chronology are compatible;
- but the commentary was written after the events and cannot establish out-of-sample predictive validity.

## Candidate B — 李國傑

### Interpretive source

子平真詮評註 gives the claim:
`幼行未運，加以甲戌流年...受牢獄之災`.

### Independent chronology problem

Independent biographical material confirms Li Guojie as a historical person born in 1881 and later imprisoned in the early 1930s, but the exact independent birth date/time needed to reproduce his Dayun start is not secured in this frontier.

Additionally, the source's `甲戌流年` points to 1934 while commonly recorded conviction/imprisonment chronology begins in 1933. The discrepancy may reflect event-duration labeling, but it prevents a clean exact-year backtest.

### Classification

`REJECTED_FOR_CLEAN_BACKTEST_PENDING_BIRTH_AND_EVENT_CHRONOLOGY`

## Rejected shortcuts

- ONE_RETROSPECTIVE_MATCH_PROVES_PREDICTIVE_ACCURACY
- SOURCE_CASE_NARRATIVE_COUNTS_AS_INDEPENDENT_HISTORY
- APPROXIMATE_DECADE_MATCH_EQUALS_EVENT_PREDICTION
- FAILED_OR_AMBIGUOUS_CASES_ARE_DROPPED_SILENTLY
- HISTORICAL_ALIGNMENT_PROMOTES_PRODUCTION_TIMING_AUTHORITY

## Execution gaps

- PROSPECTIVE_OR_PRE_EVENT_SOURCE_CASES
- INDEPENDENT_EXACT_BIRTH_TIMESTAMPS
- REPRODUCIBLE_DAYUN_START_CALCULATION
- PRE_REGISTERED_EVENT_LABELS
- NEGATIVE_CASE_CORPUS
- SAMPLE_SIZE
- CALIBRATION_METRIC

No accuracy rate and no Production / SKU / Commerce temporal authority.