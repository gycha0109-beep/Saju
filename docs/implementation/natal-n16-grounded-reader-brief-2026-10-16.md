# P0-NATAL N16 — 실제 Preview 다섯 분야를 한 장으로 읽는 내부 보고서

**범위:** 독립 명리 의미 승인 없는 내부 UX 개선. N15 이후 소비자 제품·공식 의미·출시 권한 변경 없음.

## 변경 내용

- 기존 `natal-personalized-preview.mjs`의 **진짜 5개 HTTP Preview 응답**에 읽기 자료를 추가한다.
- 다섯 분야의 이미 전달된 `paragraph`·`key_points`·`comparison`·`ambiguity`·`timeline` 텍스트만 원문 그대로 추출한다. 제한 안내는 disclosures로 별도 표시하고 계산 표를 새 해석으로 세지 않는다.
- 동일한 설명이 여러 분야에서 반복될 때 **정확히 같은 텍스트는 한 번만 표시**, 해당 문장의 모든 도메인, `responseId`, `readingId`, section, block, item 위치는 계속 보존한다. 반복 문장을 독립적인 개인화 근거로 세지 않는다.
- 실제 canonical snapshot의 일간, 연·월·일·시주, 십신 위치를 먼저 제시하되, 계산 사실로 명확히 표시한다.
- 기존 `buildNatalSynthesisPreview`의 서로 다른 명식/중복 도메인 거절 검사를 재사용하고, **출생 입력의 실제 양음력·날짜·시각·윤달 표기**까지 확인해 우연히 같은 기둥이 나온 타인의 해석이 합쳐지지 않게 한다.
- 해석이 없는 분야와 출생시간 미상의 `partial_evidence`를 빈 영역으로 유지한다. 근거 없는 문구를 생성하지 않는다.
- 실제 `natal-preview.html`에 사람이 읽을 수 있는 내부 요약 섹션을 노출하고 CI에서 해당 섹션과 원본 응답 근거를 확인한다.

## 범위 한계 및 다음 단계

- N16은 **기존 bounded Preview의 내용만 정리하는 작업**이다. 더 깊은 T8 의미를 생성하거나 검증하지 않으며 **N12 MUR `useful_complete=0` 상태를 변경하지 않는다**.
- `ProductReadingResponse`, Canonical Bundle, T8 Rule Registry, Methodology, Release/Commerce/Production authority는 변경하지 않는다.
- 명리학적 종합해석의 실제 개선은 원전의 정확한 구절·방법론·반례를 검증하고, 검증된 의미에 한해서 별도로 승인·합성해야 한다.
- 대표 실사용 10건 사람 리뷰는 여전히 별도의 제품 게이트다.

**완료 판정:** 내부 HTML로 실제 다섯 분야 원문을 한 번씩 읽을 수 있고, 중복/출처/미상/틀린 사람 연결이 안전하게 작동하며 일반·보호 CI가 모두 통과하는 것. P0-NATAL 전체 완료와는 구분한다.
