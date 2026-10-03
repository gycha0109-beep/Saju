# SA-5S Position-Only Spouse Preview Admission Review v1

Issue: #2010  
Track: `saju-bridge`

## Purpose

SA-5R authorized one exact bounded capability through the project-governed legacy Narrative runtime and Product Reading delivery path:

- reading section: `relationship:natal:spouse`
- claim type: `relationship.spouse.traditional_spouse_palace_position`
- semantic family: `DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION`
- semantic scope: `position_only`

SA-5S reviews whether that capability can be admitted to the current Preview surface **without** widening its authority.

This review does not grant Preview, Official Reading, public semantic, persistence, general-availability, or Production authority.

## Current Preview architecture

The active Preview approval currently supports:

- `general:natal`
- `career:natal`
- `wealth:natal`
- `relationship:natal:general`
- `business:natal`

`relationship:natal:spouse` is not in that set.

The current consumer-authority resolver uses the same supported-section set to decide Official Reading authority. Every currently supported Preview section resolves to:

`authority = official_reading`

Unsupported sections, including the spouse section, remain:

`authority = legacy_narrative`

Therefore adding the spouse section directly to the existing supported-section set would not merely expose the already-authorized SA-5R legacy Narrative lane. Under the current resolver contract it would move the section onto the Official Reading path.

That is outside SA-5R authority.

## Current runtime probe

SA-5S executes the current Preview registry shape with a real normalized spouse request.

Observed state:

- request normalizes to `relationship:natal:spouse`;
- current Preview consumer authority remains `legacy_narrative`;
- the current Business-based Preview registry does not emit the governed spouse-palace position claim;
- composition therefore reports `insufficient_evidence`;
- required spouse claim group remains missing;
- reading execution stays blocked.

This is the correct fail-closed behavior for the current architecture.

## Semantic admission state

The Preview semantic admission registry has no entry targeting `relationship:natal:spouse`.

No admission is inferred from:

- the SA-5R merge,
- narrative materiality,
- successful Product Reading delivery,
- the existence of the ClaimNarrativeProfile,
- or the current Preview approval for other sections.

## Decision

`HOLD_POSITION_ONLY_PREVIEW_ADMISSION_PENDING_LEGACY_NARRATIVE_PREVIEW_LANE`

Blocking gaps:

1. `PREVIEW_SUPPORTED_SECTION_IMPLIES_OFFICIAL_READING_AUTHORITY`
2. `SPOUSE_POSITION_ONLY_OFFICIAL_READING_AUTHORITY_NOT_AUTHORIZED`
3. `PREVIEW_HOST_REGISTRY_DOES_NOT_MATERIALIZE_SPOUSE_POSITION_CLAIM`
4. `SPOUSE_PREVIEW_SEMANTIC_ADMISSION_NOT_REGISTERED`

The hold is architectural, not a regression in SA-5R. The bounded spouse claim remains authorized for the exact SA-5R legacy Narrative runtime and delivery path.

## Required remediation

SA-5T must provide an exact Preview lane that:

1. decouples Preview admission from automatic Official Reading authority;
2. routes the spouse Preview request through the exact SA-5R legacy Narrative runtime;
3. materializes the exact governed spouse-palace position claim in the Preview host path;
4. registers a position-only Preview semantic admission without Official promotion;
5. keeps Official Reading, public semantic, persistence, public GA, and Production authority fail-closed.

## Authority boundary after SA-5S

Authorized and retained:

- exact position-only capability upstream;
- legacy Narrative runtime authority;
- Product Reading delivery authority.

Still not authorized:

- spouse Preview admission;
- spouse Official Reading authority;
- public semantic authority;
- persistence authority;
- public general availability;
- Production interpretation authority.

Production remains `HOLD`.

## Next

`RUN_SA_5T_POSITION_ONLY_LEGACY_NARRATIVE_PREVIEW_LANE_REMEDIATION`
