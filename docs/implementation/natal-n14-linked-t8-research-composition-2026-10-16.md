# P0-NATAL N14 — 기존 T8 두 관계를 연결한 내부 구조 연구

**2026-10-16, Research ONLY.** N13(#2541)을 개선하는 다음 좁은 종합 분석 단계로, 두 개의 *실제로 실행된* T8 생성 관계가 하나의 명식에서 **같은 T5 중간 계열 Claim**을 공유한다는 관측을 작성한다.

## 실제 구현

- 이미 검증된 N13 계산 snapshot→T5→T8→출처 연결 코드를 **그대로 호출**한다. 다시 규칙을 만들거나 계산 엔진을 복제하지 않는다.
- 단방향 생성 연구 관계 `食傷→財`, `財→官殺`, `官殺→印`만 2개씩 묶는다. 중간 계열 `wealth`, `officer`가 **같은 실제 upstream T5 Claim ID**로 발행되어야 한다.
- 서로 다른 두 T8 Claim, 각각의 두 T5 Claim이 중간 Claim 1개를 공유하여 전체 서로 다른 T5 Claim이 **3개**가 되는지 확인한다.
- 연결 결과는 *공동 관측*이지 추이·인과관계가 아니다. 명식이 `食傷→財`와 `財→官殺`를 모두 만족해도 `食傷→官殺` 같은 새 해석 관계나 성격·직업·재물·길흉을 결론 내리지 않는다.
- `src/research/general-natal-t8-linked-structure-draft.ts`가 구조적 연결, provenance union, 위치 사실, 의미 지문 및 `publicationAuthorized:false`를 제공한다.
- `test/general-natal-n14-linked-t8-structural-research.test.ts`는 5가족 충족 시 2개 연결, 중간 재성 부재의 0개 연결, 다른 Preview registry 호출 실패, 변조 snapshot 거부를 테스트한다.
- `scripts/natal-n14-linked-t8-research-packet.mjs`는 N13과 동일한 **실제 명식 8건**을 실행하여 JSON+HTML을 CI artifact로 남긴다.

## 안전 및 품질 한계

- 기존 N13 소스는 research-only, secondary_only, unreviewed다. 구조 관계의 **공존**에 대한 문자열 합성도 제품용 내용물은 아니다.
- 두 개의 관계로 새로운 명리학적 독자 의미가 자동 도출되는 것은 아니다. `transitiveCausalInferenceAuthorized=false`, `modernConsumerInferenceAuthorized=false`, `mayExposeAsConsumerInterpretation=false`가 강제된다.
- 기존 상품 Host, Preview semantic admission, Production registry, entitlement, narrative 및 `ProductReadingResponse`는 변경하지 않는다.
- N12 `useful_complete=0` 상태를 품질 성공으로 고치지 않는다. N14가 증명하는 것은 **기존 T8 관계 두 개의 참조 가능한 구조적 합성/공동 관측**뿐이다.
- 이 파일을 기반으로 현대적인 소비자용 인생 해석을 승인하려면 별도 고전 원문 무결성, 독립 도메인 리뷰, exact consumer-semantic bridge, Preview/Production 승인, E2E 사람이 읽는 품질 검수가 필요하다.

**개발 방향:** 계속해서 검사용 인프라를 늘리는 것이 아니라 이미 발행된 T8 여러 개 사이의 연결을 실제 실행하여 더 구조적인 근거를 만든다. 다만 리뷰 권한이 없는 상태에서 결론을 지어내지 않는다. P0-NATAL은 계속 ACTIVE/HOLD.
