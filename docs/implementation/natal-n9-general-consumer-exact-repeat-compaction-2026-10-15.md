# P0-NATAL N9 — 중복 문장 제거와 실제 개인화 지표 분리

Date: 2026-10-15. Scope: **General Natal Preview 소비자 표시만**. Official Reading 의미/해석 규칙/권한 수정 아님.

## 재현된 소비자 가독성 결함

N8 병합 후 실제 35건 Preview HTTP 산출물 `natal-baseline.json`을 재검토했다.

- 35건 중 33건 `delivered`, 출생시각 미상 2건 `partial_evidence`.
- 동일 보고서 안에서 동일 해석 항목이 한 번 이상 반복된 사례 **31건**, 원문 그대로 반복된 개별 항목 **49개**(N9 전 스냅샷).
- 원인: 서로 다른 Research T8 천간/지지 Claim의 `headline/summary`가 같아, 일반 사용자 결과의 `key_points` 항목에 동일 텍스트가 중복 출력됐다. claim identity 및 provenance는 분리되어 있지만 소비자 표현만 반복된다.

현재 `N6`는 텍스트 **순서와 반복 횟수까지 포함**한 지문을 비교하므로, 두 명식의 텍스트 종류가 같아도 반복 횟수가 다르면 "다른 해석"으로 계산될 수 있다. 이는 충분히 독립적인 사주 의미 차이를 입증하지 못한다. N9에서는 이를 감추거나 거짓으로 개선했다고 선언하지 않고, **반복 없는 소비자 본문으로 다시 검사하여 품질 수치가 악화되더라도 정확히 공개**한다.

## 구현

- `src/preview/general-natal-consumer-repeat-compaction.ts`를 **기존 General Natal Preview Host의 마지막 소비자 표시 단계**에 연결한다.
- 상태 `delivered / delivered_with_fallback`, 섹션 `주요 해석`의 동일 `key_points` 블록에서 **문자까지 정확히 같은 항목만** 최초 1개로 유지한다.
- 동일 단락이라도 다른 블록/섹션, 시나리오/충돌 `comparison/ambiguity`, 출생정보 계산 문단, 십신 위치 기록, 지침/한계, 서로 다른 qualifier는 그대로 둔다.
- **Canonical Saju Snapshot, InterpretationClaim, CanonicalReadingSemanticBundleV1, OfficialReadingPlanV1, Official Reader Report, Explainability Index, Reference / Rule / Source 증거는 건드리지 않는다.**
- Public `ProductReadingResponse`에는 원래 claim ID/explainability ref가 노출되지 않으므로, UI만 복제 제거한다. 기존 response/reading ID, 전달 상태, 제한 고지는 불변.
- Preview/Production/출시/판매 의미 권한 추가 없음.

## 검증 및 목표

- 실제 birth input 결과에서 반복 없는 소비자 `key_points`와 N5/N7 계산 문단 유지.
- 35건 실행의 `natal-baseline.n9-repetition.json`: N9 후 문자 그대로 반복된 같은 블록 텍스트 0개. 의미-only 중복 수/유일 본문 수를 그대로 노출한다.
- N8 최초 3쌍은 **명시적으로 식별**해 계속 stage trace; 신규 발견 중복은 N3의 별도 warning으로 관측한다.
- N6의 `meaningTextUnique` 하락이나 `repeatedMeaningPairs` 증가는 오류를 감추지 않는 진실한 결과다. 계산 사실·단순 표현량 변화는 전통적으로 유의미한 다른 해석을 증명하지 않는다.

## 남은 조건

관성/비겁의 천간·지지별 실제 해석 차이는 #2535 source/Preview admission HOLD, 동일 Research 규칙 3쌍의 복합 조건은 #2529. 다른 명식이 동일한 의미를 공유할 수도 있다. 새로운 충돌은 실제 인간 리뷰로 정당성을 판단하기 전까지 무리하게 고유 문장으로 변경하지 않는다.

**P0-NATAL 종합풀이 품질 종료 조건 미충족.** 10건 대표 소비자 결과의 별도 사람이 수행하는 읽기/개인화 적절성 검수도 남아 있다.
