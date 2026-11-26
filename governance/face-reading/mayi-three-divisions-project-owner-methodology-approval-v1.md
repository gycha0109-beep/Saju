# Mayi Three-Divisions — Project-Owner Methodology Approval v1

Status: approved
Effective date: 2026-11-02 (Asia/Seoul)
Authority actor: `actor.myeongha.project_owner@0.1.0`
Authority scope: `methodology_review_promotion`

## Explicit target-specific decision

The project owner explicitly approved this exact promotion in the project
execution chat, in response to the bound review-proposal question:

```text
target methodology = method.mayi.face_three_divisions.fr261@0.2.0
reviewed successor = method.mayi.face_three_divisions.fr261@0.3.0
source snapshot = face-traditional-review-source:f4bbaa5e03d373406f85f5442d97c5f61116f58e433bb6563a0fde1c43404413
review packet = face-traditional-review-packet:0868afd3f6bf9457bd92cfcf3f01472b77aa7c065acc506cf921152d3a42dc9b
outcome = approved_for_reviewed_promotion
```

The explicit response named all four coordinates and stated:

> 승인 범위는 《麻衣相法》의 역사적 삼정 구간 정의에 대한 방법론 검토 상태에 한정합니다.
> 수치 임계값, 실제 관찰값과의 측정 연결, 개인 관상 해석, Character 공개, Production 활성화는 승인하지 않습니다.

The owner also explicitly requested implementation, required verification, PR and
automatic merge within that scope. This approval is not inferred from authorship,
CI, source verification, a merged PR or a generic instruction to continue.

## Materialization

Issue the proposal's exact `0.3.0 / reviewed` definition, retaining the research
predecessor, source refs, description and every limitation unchanged. Preserve
`test/fixtures/face-traditional-authority-review-packet.json` as the immutable
historical proposal; its `targetSpecificProjectOwnerApprovalPresent=false` and
`proposedReviewedSuccessorNotIssued` describe that historical packet, not current
approval state. The source-snapshot and packet hashes must continue to match it.

The reviewed registry extends the existing Face authority registry with only the
approved passage, research predecessor and reviewed successor. Existing native
registry validation and exact-version lookup consume the registered definition.
Research T4/T5/T6/T7/FRB005 pins remain unchanged; review does not silently rebind
their version references or create a reviewed executable pack.

## Excluded authority

- No numeric tolerance, threshold, calibration or age map.
- No observed/neutral metric binding, registration or cross-reference subtraction.
- No individual interpretation, criterion state, claim or narrative generation.
- No Character publication, Product activation or Production authorization.
- No promotion of Mayi Three Fus/Three Governors or Shenyi/Gujin methodologies.

FRB006 remains 13/16 admitted slots with three hairline slots blocked. Real
FR318/FR319 evidence, binding, executable metric/rule authority and publication
decisions remain separate gates. #2343 remains open until those are actually met.

## Implementation and verification

The exact reviewed definition and the existing FaceAuthorityRegistry extension
are implemented in `packages/face-reading/src/mayi-three-divisions-reviewed-methodology.ts`.
`getReviewedMayiThreeDivisionsMethodology` uses the existing registry validator
and exact-version lookup. The source authority receipt regression consumes this
lookup while remaining blocked before engine execution. No production provider
or route is activated by registration.

The existing closeout verifier recomputes both approved hashes with the existing
`deterministicContentHash`, compares the complete issued definition to the exact
proposal and checks this governance record. No second canonicalization/hash
algorithm is introduced. The historical proposal bytes remain unchanged.

Local tests: 66 tests across eight direct registry, T4 bridge/FRB005/FRB006 and
source runtime/grounding suites pass. Native source validation rejects downgraded
passages and rejects an attempted production rule whose methodology is merely
reviewed. Existing Face Reading CI runs the direct review/closeout suites.

Architecture Check:

- Docs updated: yes — this decision and the current 005L decision surface.
- Ghost-code risk: passed locally for registered definition -> native validation
  and lookup -> source authority receipt -> blocked runtime regression.
- Notes: the reviewed registry is an immutable extension of the existing research
  registry, following the existing reviewed-successor pattern. It is needed to
  register the approved version without rewriting the historical research
  definitions, exact approved proposal or executable pack pins. There is one
  reviewed definition; no alias, new domain, fallback, numeric normalization,
  pipeline stage, rule/claim family, storage schema or publication mode is added.
