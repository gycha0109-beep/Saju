# SAJU-R36 source-bounded tight embedded bureau break

Issue: #2419

Watchtower-Track: saju

## 단일 의미 결정

I46/I47가 이미 허용한 단 하나의 긍정적 결과
`BROKEN_BY_TIGHT_EMBEDDED_CLASH`만 연구용 T2 Claim으로 실행한다.

이는 새로운 일반 삼합/충 해석기, 격국 판정, root destruction 알고리즘이 아니다.

## 실제 연결

Canonical Saju Snapshot (4 resolved pillars, exact pinned stem/branch metadata, day master parity)
→ unchanged I29/I31/I35/I36/I37/I38/I39/I44/I45/I46/I47
→ I47 source-specific direct break
→ snapshot/hash-bound research envelope
→ independent whole-payload replay from snapshot
→ isolated registered research T2 claim.

각 메커니즘(OUTPUT_LEAKAGE, WEALTH_EXPENDITURE_CONTROL,
OFFICER_CONTROL_PRESSURE)을 서로 합치지 않는다.

확정 가능한 경우는 **해당 메커니즘에 정확히 하나의 고유한 파국 identity**가 있고,
해당 I47 item의 **directBreakCount가 정확히 하나**, 그 충이 국 내부에 있으며 직접 충한
삼합 구성 지지와 인접하고, I46 settlement가 정확히 BREAK_AUTHORIZED이며,
I47의 postInteractionBureauState가 직접 파괴로 확정된 경우뿐이다.
같은 삼합·충 identity를 다른 target-root subject에서 반복 관찰한 item은
하나로 보존한다. 서로 다른 파국 identity를 합산하지 않는다. 이는 현재
adapter 구현에 맞춘 문서 정정이며 판정 로직 변경이 아니다.

기존 I47에 더 많은 복합 사례가 존재하더라도 이 R36은 결론을 만들어내지 않는다.

## 증거·정책 무결성

- I46 sourceBasis의 deterministic hash, I47 version과 R36 definition hash를 고정한다.
- snapshotId, calculationHash, 정확한 pillar source refs를 유지한다.
- I29~I47 report IDs, 세부 삼합·충 relation IDs, constituent slots,
  embedded span, 직접 충 대상과 counterpart slot을 보존한다.
- caller-supplied report를 사용하지 않고 독립적으로 처음부터 다시 산출한다.
- evidence envelope의 단순 재해시만으로 변조가 수용되지 않도록 원 snapshot
  projection 전체와 비교한다.
- 미확정/시나리오/위조 입력은 negative verdict가 아니라 unavailable이다.

## Claim 경계

실제 규칙은 메커니즘별로 positive observed가 true일 때만 일치한다.
나머지 false는 등록된 Negative 또는 Intactness Claim이 아니다.

Claim value에는 메커니즘과 제한적인 bureauBreak 사실만 들어가며,
충돌 관계의 exact identity는 검증된 research evidence에 보존된다.
아래 의미는 모두 불허한다.

- generic bureau intactness/damage magnitude
- 통근 또는 다른 root의 파괴
- support effect / challenge effective force
- 정성/정량 강약, 旺衰/格局/喜用忌
- 계절/지원 상태를 사용한 numeric override
- hidden activation, transformation
- Narrative/Production, default registry, API/DB/product route

## 검사·수용

- synthetic positive 구조를 포함한 네 삼합국 계열, 두 embedded slot 및
  non-tight/outside/no-clash 경계 검증
- 실제 canonical fixture에서 R36 projection/replay/registry 실행
- exact source/provenance, forged and rehashed-payload rejection
- resolved metadata, scenario, no false-to-negative
- I45/I47/R33/R34/R35 불간섭 및 typecheck/lint/build/회귀 테스트

실제 출생일 positive와 기존 제품 경로의 차단 검증은 issue #2435의
`test/saju-refresh-canonical-product-boundary-smoke.test.ts`에 추가했다.
1989-09-08 01:30의 금국 및 1992-01-12 05:30의 목국에서 계산된
원본 snapshot을 수정하지 않고 실제 T2 및 exact 삼합·충 위치를 검증한다.
제품 facade는 두 positive 모두 General Natal의 필수 근거 부족으로 차단한다.
상세 범위는 [post-R37 제품 경계 감사](saju-refresh-post-r37-product-boundary-audit-2026-10-09.md)를 따른다.
Synthetic source-domain fixture는 실제 출생일 표본과 구분한다.

## 후속

R37은 R31/R34와 I21~I23가 금지한 support-effect 합성을 묵시적으로 열지 말고,
정당한 bounded methodological predicate가 존재하는지 검증한 후
사용 가능한 경우에만 실행한다. 그렇지 않으면 해당 미해결 방법론을
구체적으로 남기고 R 단계만 늘리지 않는다.

A/B/C 및 제품 smoke는 미완료다.
