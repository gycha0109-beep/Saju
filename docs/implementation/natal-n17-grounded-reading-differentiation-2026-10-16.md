# P0-NATAL N17 — 35개 실제 명식의 계산 구조와 소비자 풀이 문구 차이 분리 감사

**상태:** 내부 품질 측정 전용. 실제 해석의 깊이·정확도 또는 T8 의미 승인 달성이 아님.

## 목적과 관측

- 기존 `npm run preview:natal:audit`가 이미 사용하는 **35개 실제 Canonical 계산 + General Natal Preview HTTP 응답**을 다시 사용한다. 새로운 테스트용 문구로 품질을 가장하지 않는다.
- N16 `buildNatalN16GroundedReaderBrief`로 각각의 실제 출처 보존된 해석 문구를 모으고, 별도로 N1 `buildNatalStructuralEvidence`의 관측 기둥·일간·십신·관계·계산 정책 및 출생시간 알려짐 여부를 정규화하여 비교한다.
- 서로 다른 `caseId`라도 같은 명식 구조와 같은 본문이면 정상 대조군이다. 같은 구조의 본문 불일치와 서로 다른 구조인데 본문이 동일한 충돌을 분리한다.
- **서로 다른 구조의 서로 다른 문구**조차 `DIFFERENT_STRUCTURE_DIFFERENT_TEXT_UNVERIFIED`다. 본문 차이가 단지 일간·십신 위치를 바꿔 쓴 결과일 수 있으므로 *개별 의미가 실질적으로 차별화됐다고 판정하지 않는다*.
- 출생시간 미상·부분 응답은 본문 0건으로 유지한다. 읽기 단위가 없는 쌍의 건수를 별도로 공개한다.
- `natal-personalization-baseline.n17-differentiation.json`에 case별 구조·본문 fingerprint, 2개 명식 쌍별 동일/상이 판정과 본문 겹침 수를 내보낸다. 기존 N6/N10/N12 감사의 임계값이나 승인 상태를 변경하지 않는다.

## 검증 및 한계

- Vitest: 동일 입력 재현성, 서로 다른 명식의 동일 풀이, 같은 명식의 상이한 풀이, 서로 다른 명식의 상이한 풀이, unknown-hour, 중복 case ID·타인 응답 차단을 검증한다.
- N17은 명식과 문구가 어떻게 달라졌는지 확인하는 **문제 식별기**다. 새로운 T5/T6/T8 인과 의미, 독립된 명리 해석, 사람 리뷰 결과, Official/Production/Commerce/Release 권한을 만들지 않는다.
- N12의 General Natal `usefulComplete:false` 및 source-qualified core T8 미승인 상태는 그대로다.
- 다음 단계: N17 충돌 쌍에서 원문 locator + 명확한 명제 + 반례 + scenario + 독립 T5/T6 근거가 있는 T8 *특정 패턴*을 기존 Registry에서 평가하고, 독립 review/admission 없이 Preview/Production의 새로운 의미로 투영하지 않는다. 실제 사람 10건 리뷰도 별도 완료할 것.

**P0-NATAL은 HOLD 유지.** 측정 결과의 통과·본문 유일성 또는 구조적 차별성만으로 종합풀이 완성을 선언하지 않는다.
