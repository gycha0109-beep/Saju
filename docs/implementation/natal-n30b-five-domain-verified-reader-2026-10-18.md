# P0-NATAL N30b — 일반 근거 검증 풀이의 5분야 실제 소비자 Preview 연결

2026-10-18 · Watchtower-Track: saju · 내부 명식별 보고서

## 실제 경로

기존 `scripts/natal-personalized-preview.mjs`는 General/Career/Wealth/Business/Relationship 다섯 개의 실제 HTTP Preview를 조회해 N21/N24 원문을 보여주지만, N27b의 **Claim / Rule / Source / 명식 위치가 정확히 결박된** N28 General 보고서는 결과물 앞에 표시하지 않았다. 따라서 여러 분야를 한 번에 보는 독자에게 검증된 핵심 원국 해석보다 기존 반복되는 출처별 문장이 먼저 노출됐다.

## 구현

- `buildNatalN30bFiveDomainVerifiedReader`: 같은 Canonical snapshot으로 N16/N21/N24 다섯 도메인의 정확한 입력·명식·원문을 검증한다.
- `general` 실제 원본 응답으로만 N27a opt-in → N27b Claim receipt 감사 → N28 General 사용자 보고서를 생성하고, 이 소스 증빙을 별도 개요로 노출한다. 다른 분야의 독립적인 결과 문장을 **General 템플릿에서 추론하지 않는다**.
- N28의 새 설명 문장은 N16/N21/N24의 **기존 다섯 분야 의미 fingerprint/원문 건수에 합산하지 않는다**. 결합된 보고서에서도 오리지널과 새 계산 위치 설명의 구분을 유지한다.
- 기존 내부 HTML 명식 Preview의 최상단에 출처와 위치를 검증한 General 핵심 구조를 표시하고, 그 아래 다섯 분야의 실제 원문을 원래 방식대로 이어 보여준다.
- 5개 분야 데이터 누락/다른 원국, 미상시각 partial, 원국 확정 기둥의 누락을 fail-closed 검증한다. 연구 전용 고전의 금전·직업 결과 확장 및 공용 Admission은 없고 `usefulComplete:false`다.

## 검증

- 기존 5분야 실제 HTTP HTML 스모크 경로에 연결. 자동 테스트는 실제 General 통합 Host를 사용해 N28의 출처 영수증을 확인하고, 나머지 분야 원문이 그대로여서 허위 개인화로 집계되지 않음을 확인한다.
- Production/Commerce/새 명리 의미 승인 없음. N30b는 5분야의 **실제 고유 인과적 해석 확대가 아니라 연결/표시 및 출처 결박 개선**이다. N29 사용자 가치와 P0-NATAL 완료는 별도 미해결.
