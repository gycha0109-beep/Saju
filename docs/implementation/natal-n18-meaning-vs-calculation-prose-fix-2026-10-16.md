# P0-NATAL N18 — 명식 계산 설명과 실제 풀이 본문을 분리

**상태:** 내부 Preview/품질 비교의 실제 오분류 수정. 새로운 T8 의미나 제품 권한 승격 아님.

## 발견된 결함

- N5의 `이 사주풀이가 실제로 참조한 명식은 …` 및 N7의 `계산에서 확인한 십신 위치: …`는 이미 실제 계산에서 얻은 **사실 문장**이다.
- 그러나 N16의 기존 다섯 분야 보고서는 이 문장들을 일반 해석과 동일한 `readingUnits`에 넣었고, N17의 차별성 감사는 해당 문장을 **개별 의미의 텍스트 차이**로 계산했다.
- 결과적으로 서로 다른 기둥/십신 위치가 출력만 달라져도 `DIFFERENT_STRUCTURE_DIFFERENT_TEXT_UNVERIFIED`로 집계해, 실질적으로 동일한 풀이의 반복을 감출 수 있었다.
- 또 해석 자체가 없는 서로 다른 명식 두 건을 `DIFFERENT_STRUCTURE_SAME_TEXT_COLLISION`으로 집계할 수 있었다. 빈 텍스트와 같은 의미는 같지 않다.

## 수정

1. N16에서 **이미 존재하는 N5/N7 생성기의 정확한 표식과 고정 제한 문구**만 `calculated_chart_context`로 분류한다. 알 수 없는 형식의 동일 표식이 있으면 오분류 없이 거부한다.
2. 모든 원문/출처/응답 ID는 보존한다. 내부 HTML에서는 해석 본문이 먼저 나오고 계산 설명은 별도 펼침 영역으로 구별한다. `interpretationTextUnitCount`와 `calculatedContextTextUnitCount`를 구분한다.
3. N17은 **실제 bounded 해석 본문 단위**만 비교한다. 달라진 기둥을 소개하는 N5/N7 문장만으로 차별성 성공을 암시하지 않는다. 기존 서술 분류는 유지하되 `readingTextFingerprint`를 의미 후보 문장 기준으로 정정한다.
4. 비교 쌍 중 해석 본문이 하나라도 없으면 `MISSING_INTERPRETATION_EVIDENCE`로 따로 집계한다. 이는 텍스트 충돌도 차별성도 아니다.
5. N17의 기존 35개 실제 Canonical 명식/HTTP Preview 품질 감사와 N16의 기존 한 장 보고서를 재사용한다. 새로운 병렬 계산기나 리포트 엔진을 생성하지 않는다.

## 검증 기준

- N5/N7를 실제 기존 부착 함수로 두 개의 서로 다른 명식에 생성한 뒤, 풀이 문장이 동일하면 **명식 차이는 유지하면서 의미 차별성은 여전히 동일**하다고 판정한다.
- 계산 설명만 있는 문장 수와 진짜 풀이 문장 수를 따로 검사한다.
- 출생시간 미상 등 풀이가 없는 비교 쌍은 `MISSING_INTERPRETATION_EVIDENCE`이다.
- N5 표식을 붙여 임의 결론을 위장한 문장은 반드시 거부한다.
- Preview/Official Canonical 의미 내용, Rule Registry, Research/Bridge, Production, Release, Commerce 및 N12의 `usefulComplete:false`는 일절 바꾸지 않는다.

**실제 종합 사주풀이 품질:** 여전히 미완료. 이번 작업은 근거 없는 차별성 성공 착시를 제거하고, 사용자가 내부 보고서에서 계산 사실과 해석을 혼동하지 않도록 한다. 다음 우선순위는 해당 재측정 결과로 드러나는 같은 풀이 문제의 **실제 source-qualified T8 의미 적격성** 조사 및 사람 리뷰다.
