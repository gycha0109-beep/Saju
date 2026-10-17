# N31 — 기존 4분야 T8 해석의 실제 명식별 재현·원문·출처 검증

2026-10-18 · Watchtower-Track: saju

## 확인한 간극

N30a/b는 Canonical 표시와 N27b General 의미 보존을 해결했다. 그러나 기존 Career/Wealth/Business/Relationship의 각 T8 독해 규칙과 한국어 ClaimNarrativeProfile은 다섯 HTTP Preview 합본에서 별도로 표시되지 않았다. 이 문장들은 현재 **secondary_only / contested / unreviewed 연구**이며, 공식 고객 운세로 투입할 권한은 없다.

## 이번 변경

- 같은 원국의 실제 `createBusinessNatalReadingCandidateRegistry` 통합 레지스트리에서 `runInterpretation`으로 기존 Specialist 4개 도메인의 **활성 T8 Claim**을 계산한다.
- 각 문장은 Claim의 **정확한 Rule ID/Version, 원본 Rule.output.value, Claim.sourceRefs, 등록된 Source 및 기존 한국어 Profile 템플릿**과 일치해야 표시한다. 연결 가능한 Canonical 십신의 슬롯·천간/지지·정확한 하위유형을 제시한다.
- Career는 기존 subtype+visible/branch 구분을 보존하고, Wealth/Business/Relationship은 본래 family 조합을 보존한다. 단순 family 존재를 새로운 원인/운명 명제로 승격하지 않는다. 비충돌 원문을 각 분야 최대 3개 표시한다.
- 출생시각 미상, Claim 충돌, Source/Rule/해석 텍스트 불일치는 HOLD/Fail Closed. **기존 5분야 HTTP Original 응답의 원문 및 N16/N21/N24 지문은 수정하지 않는다.**
- 내부 HTML 보고서에서 `연구 전용` 섹션으로 실제 연구 문장을 별도 표시한다. Official·Production·Commerce에 아무 권한도 부여하지 않는다. `usefulComplete:false`.

## 한계

이것은 기존 4분야에 실제 존재하나 합본에 표시되지 않았던 **명식별 연구 해석을 활용하는 실험**이다. T8 원문의 전통적 정확성이나 5분야 인과적 완결성 검증을 의미하지 않는다. 후속 작업은 독립적 소스·방법 충돌 해소와 사용자 가치 평가다.
