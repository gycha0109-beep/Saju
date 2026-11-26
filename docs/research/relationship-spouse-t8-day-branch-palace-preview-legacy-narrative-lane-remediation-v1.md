# SA-5T Spouse Position-Only Legacy Narrative Preview Lane Remediation v1

Issue: #2017  
Track: `saju-bridge`

## Purpose

SA-5S found that the existing Preview support set was also the Official Reading authority set. Directly adding `relationship:natal:spouse` would therefore have widened the bounded SA-5R legacy Narrative authority into Official Reading authority.

SA-5T removes that coupling and admits only the already-governed position-only spouse capability to Preview.

## Exact admitted capability

- reading section: `relationship:natal:spouse`
- claim type: `relationship.spouse.traditional_spouse_palace_position`
- semantic family: `DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION`
- semantic scope: `position_only`
- canonical fact dependency: `pillars.day`

Visible meaning remains exactly:

> 전통 명리에서는 일지(日支)를 배우자궁의 위치로 봅니다.

Mandatory qualifier remains:

> 이는 배우자궁의 위치에 대한 전통적 분류이며, 배우자의 성격이나 정체, 결혼 시기 또는 관계 결과를 의미하지 않습니다.

## Remediation

### 1. Preview support and Official authority are separate sets

Preview authority v2 now contains:

- `supportedReadingSections`: the product-observation Preview surface
- `officialReadingSections`: the smaller set allowed onto the Official Reading path

The existing five Official Preview sections remain unchanged.

`relationship:natal:spouse` is present only in the supported Preview set.

Its consumer authority therefore resolves to:

`legacy_narrative`

and never to:

`official_reading`

### 2. Dedicated spouse Preview host lane

The Preview host routes a normalized natal spouse request to a dedicated host.

That host uses:

- the exact SA-5R narrative-materialized registry;
- the exact source-adjudicated shadow execution authority already established upstream;
- the exact position-only ClaimNarrativeProfile;
- the existing grounded Narrative orchestrator and delivery path.

The ordinary Preview host path explicitly rejects accidental spouse routing.

### 3. Explicit semantic admission

The Preview semantic admission registry contains one spouse entry whose scope is:

`traditional_spouse_palace_day_branch_position_only`

The admission grants Preview claim exposure only. It grants no Official Reading or Production authority.

## Prohibited expansion

The Preview lane still forbids:

- spouse personality or identity;
- spouse appearance or occupation;
- marriage timing or outcome;
- divorce or remarriage;
- favorable/unfavorable spouse-palace judgment;
- Yongshin/Jisin semantics;
- 財星/官星 spouse-role auto-selection;
- second-chart compatibility.

## Runtime proof

The SA-5T remediation artifact invokes the real approved Preview host with `배우자운`.

Required observed state:

- response state = `delivered`;
- reading ID is not `official_reading_*`;
- exact position-only summary is present;
- mandatory qualifier is present;
- prohibited expansion phrases are absent;
- Official/public semantic/persistence/public-GA/Production authority remain closed.

## Decision

`POSITION_ONLY_LEGACY_NARRATIVE_PREVIEW_LANE_REMEDIATED`

Authorized:

- exact position-only spouse Preview admission;
- legacy Narrative Preview lane.

Still not authorized:

- spouse Official Reading authority;
- public semantic authority;
- persistence;
- public general availability;
- Production interpretation authority.

Production remains `HOLD`.

## Next

`RUN_SA_5U_POSITION_ONLY_PREVIEW_DELIVERY_AUTHORITY_REVIEW`
