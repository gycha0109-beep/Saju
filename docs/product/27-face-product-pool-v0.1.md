# MyeongHa Face Product Pool v0.1

Status: planning inventory  
Track: `topic-face`

This document is a product-planning pool. It is not semantic authority and it is not a price registry.

Roadmap state (`NOW / NEAR / LATER / NOT_APPROPRIATE`) is distinct from runtime readiness (`available / partial / blocked`).

| Candidate key | Family | User question / JTBD | Input | Output hypothesis | Free/Paid hypothesis | Share | Repeat | Required authority | Current runtime signal | Main blocker | Precision / privacy risk | Framing | Roadmap |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `face.discover.structure` | DISCOVER | 내 사진에서 현재 근거 있게 확인되는 얼굴 구조는? | single RGB selfie | neutral structure cards | free entry | high | high | FR293 neutral morphology | available on pinned foundation fixture | none for selected neutral core | must not become personality/fate inference; no raw-photo history | 관측 가능한 구조 설명 | NOW |
| `face.discover.extended` | DISCOVER | 얼굴 구조를 더 넓게 보면 어디까지 확인 가능한가? | single RGB selfie | neutral structure cards with unavailable sections | free / premium UX hypothesis only | high | high | FR293 + FR294 gap closure | partial on pinned foundation fixture | forehead visible-width model among optional coverage | unavailable sections must remain explicit | 현재 가능한 범위만 표시 | NOW |
| `face.self.three_divisions` | SELF_READING | 전통 삼정 체계에서는 내 얼굴 세 구간을 어떻게 보는가? | single RGB selfie | provenance-visible traditional reading | paid hypothesis | medium | medium | T4/T5/T6 + governed vertical refs + FRB005 bindings + claims | blocked | #1521; FRB005 0/16 admitted | no invented anchors, thresholds or age mapping | 전통 체계의 해석임을 명시 | NEAR after authority handoff |
| `face.self.overview` | SELF_READING | 내 얼굴에서 전통 관상상 두드러지는 부분은? | single RGB selfie | multi-region overview | paid hypothesis | medium | medium | multiple governed traditional claim families | not yet admitted by this slice | product-safe claim inventory not yet complete | must not synthesize missing claims | 전통 해석 + provenance | LATER |
| `face.love.self` | LOVE | 전통 관상에서 관계/연애와 관련해 무엇을 말할 수 있나? | single RGB selfie | bounded relationship lens | paid hypothesis | medium | medium | governed relationship-related methodology/claims | not established by this slice | authority coverage audit required | exact marriage age and deterministic future claims prohibited without authority | bounded traditional lens | LATER |
| `face.career_money.self` | CAREER_MONEY | 전통 관상에서 일/재물 관련해 무엇을 말할 수 있나? | single RGB selfie | bounded career/money lens | paid hypothesis | medium | medium | governed career/money methodology/claims | not established by this slice | authority coverage audit required | exact money amount / guaranteed wealth prohibited | bounded traditional lens | LATER |
| `face.relationship.two_face` | RELATIONSHIP | 두 사람 얼굴을 비교하면 무엇을 볼 수 있나? | two faces | comparison reading | paid hypothesis | high | medium | multi-face semantics + consent/privacy contract | blocked by product boundary | v1 third-party/multi-face exclusion | third-party consent and biometric/privacy risk | not enabled | NOT_APPROPRIATE for v1 |
| `face.full_report` | FULL_REPORT | 여러 관상 방법론을 한 번에 깊게 보고 싶다 | single RGB selfie | durable full report | premium hypothesis | low | low | broad methodology + claim coverage + provenance | not established | insufficient admitted breadth | unsupported synthesis risk | source-traceable report | LATER |
| `face.history.result` | HISTORY_REPEAT | 이전 결과와 새 결과를 다시 보고 싶다 | result refs; new capture optional | result history / comparison | retention feature hypothesis | medium | high | result persistence contract | design only | persistence/privacy contract | raw photo history must remain separate and default-off | result history, not photo archive | LATER |

## Price boundary

Observed market price bands may be retained in research notes as hypotheses, but no price, discount, provider SKU or entitlement state is part of `FaceTopicDefinition`.

## Promotion equation

```text
Market Demand
∩ Traditional Authority
∩ Observation Capability
∩ Bridge Coverage
∩ Product Safety
= Implementable Face Topic
```

A candidate moves toward runtime only when the authority intersection exists. Market demand alone never promotes a topic.
