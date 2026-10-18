# N35 — 네 분야 기존 한국어 T8 해석의 명식별 직접 독해 대조

2026-10-18 · Watchtower-Track: saju · 내부 검토 전용

## 해결할 품질 간극

N34는 실제 HTTP 35건, 서로 다른 원국 대조 20건(19고유쌍), 동일 입력 대조 1쌍 × 네 분야의 기존 연구 Claim 차이를 수치로 나눈다. 하지만 차이가 난 **구체적 한국어 풀이 문장**을 원국별로 직접 읽거나 출처·계산 근거를 비교하는 독자 화면은 없다. 이 공백은 숫자와 사용자 독해의 의미가 같다고 오해할 위험이 있다.

## 구현 범위

- N34의 이미 소스·원국이 결박된 원본 연구 해석 35건을 다시 확인하고 21개 모든 비교에 대한 네 분야 좌우 독해 HTML을 생성한다.
- 각 Claim의 기존 원문 headline/summary, 실제 계산 십신 위치, Canonical fact paths, Claim ID/Type, Rule ID·version, Methodology ID·version, Source IDs, Narrative Profile version을 기록한다.
- N34 감사 결과를 독립적으로 재산출해 받은 판정과 지문이 달라지면 출력을 중단하고, 원본 한국어 headline/summary가 분야별 ClaimNarrativeProfile과 불일치해도 중단한다. N34의 기존 fingerprint가 headline을 포함하지 않는 경우에도 원문 변조가 허용되지 않는다.
- 기존 35개 HTTP 감사 작업에서 `.n35-four-domain-original-copy-pairs.html`을 생성한다. 별도 워크플로 또는 새 제품 API는 만들지 않는다.

## 제한과 평가

이 HTML은 개인별 문장이 왜 다르게 선택됐는지 **검토 가능한 원문 증거**다. 원문이 실제 사용자의 성격·행동·미래에 정확하다는 실증, 체감 가치, 사람 검수 완료, Source 경합 해소는 아니다. 원래 5분야 Product 응답, 연구 상태, 판매/공개 금지, `usefulComplete:false`는 유지한다.

완료 표시와 CI/PIE/Container/고정 SHA Integration/새 main 검증 기록은 실제 결과 확인 이후에만 남긴다.
