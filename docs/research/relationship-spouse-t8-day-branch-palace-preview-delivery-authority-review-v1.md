# SA-5U Spouse Position-Only Preview Delivery Authority Review v1

Issue: #2032  
Track: `saju-bridge`

## Purpose

SA-5T established the exact bounded spouse position-only legacy Narrative lane inside Preview.

SA-5U reviews the actual delivery boundary and authorizes only that exact Preview delivery capability. It does not promote the spouse section to Official Reading, public semantics, persistence, public general availability, commerce, or Production interpretation authority.

## Exact reviewed capability

- reading section: `relationship:natal:spouse`
- claim type: `relationship.spouse.traditional_spouse_palace_position`
- semantic family: `DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION`
- semantic scope: `position_only`
- delivery route: `POST /api/preview/readings`
- consumer authority: `legacy_narrative`

Visible meaning remains exactly:

> 전통 명리에서는 일지(日支)를 배우자궁의 위치로 봅니다.

Mandatory qualifier remains:

> 이는 배우자궁의 위치에 대한 전통적 분류이며, 배우자의 성격이나 정체, 결혼 시기 또는 관계 결과를 의미하지 않습니다.

## Delivery-boundary proof

The review invokes the real Preview-enabled calculation process over an ephemeral HTTP server.

It proves:

1. the Preview reading route rejects a request without the Saju service bearer;
2. the authenticated route returns the source-owned Product Reading response admission header;
3. the response lifecycle header is exactly `preview`;
4. the spouse request is delivered through the bounded legacy Narrative lane;
5. the response contains the exact position-only summary and mandatory qualifier;
6. the response does not use an `official_reading_*` reading ID;
7. prohibited spouse semantic expansions remain absent;
8. `POST /api/readings` remains unavailable from the Preview process.

## Authority decision

Decision:

`AUTHORIZE_POSITION_ONLY_LEGACY_NARRATIVE_PREVIEW_DELIVERY`

Authorized:

- exact spouse position-only Preview delivery;
- authenticated Preview HTTP delivery;
- source-owned Product Reading response admission;
- the existing legacy Narrative Preview lane.

Still not authorized:

- spouse Official Reading authority;
- public semantic authority;
- commerce authority;
- persistence;
- public general availability;
- Production interpretation authority.

External human domain review, review attestation, reviewer trust context, and reviewer trust grant are not required by this bounded capability.

Production remains `HOLD`.

## Next

`RUN_SA_5V_POSITION_ONLY_OFFICIAL_READING_ADMISSION_REVIEW`
