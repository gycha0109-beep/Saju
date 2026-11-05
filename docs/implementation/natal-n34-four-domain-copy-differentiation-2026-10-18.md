# P0-NATAL N34 — 실제 35건 HTTP에 결박한 4분야 연구 원문 차이 실험

2026-10-18 · Watchtower-Track: saju · internal research only

## 해결할 품질 문제

기존 N31–N33은 4분야의 T8 기존 한국어 Claim 원문과 원국/Rule/출처를 연결한다. 하지만 '다른 원국에서 서로 다른 연구 문장을 실제로 읽게 되는가'라는 질문에서 **원래 한국어 문구가 달라진 것**과 **같은 문구에 계산 위치만 달라 붙은 것**을 별도로 세지 않았다. 이 차이를 합치면 사용자 개인화 품질을 부풀린다.

## 범위

- 이미 존재하는 35개 General HTTP 입력·Canonical Snapshot 및 N10의 서로 다른 명식 간 20개 원문 충돌 사례쌍(고유 표시 원국 쌍 19)을 재사용하고, 동일 출생 대조 1쌍을 별도로 추가한다. 새 실인물 자료를 수집하지 않는다.
- 각 Canonical 명식에서 기존 4분야 통합 연구 Registry를 재실행하고 N32/N33의 Claim·출처·명식 검증을 통과한 원문만 별도로 비교한다. 연구 문구는 공식 Product 응답에 병합하지 않는다.
- 4분야마다 다음을 상호 배타적으로 분류한다: (1) 기존 한국어 프로필 원문 변동, (2) 원문은 같지만 Claim/Rule/Methodology/Profile/Source 근거 변동, (3) 원문과 근거는 같지만 계산된 십신 위치만 변동, (4) 동일, (5) 양쪽 근거 부족, (6) 한쪽만 근거 있음.
- 원본 Source/Rule/Position의 재검증 가능한 지문을 감사하고, 같은 원국 대조군에서 서로 다른 원문/근거/위치가 생성되면 fail-closed 한다.
- CI Quality의 기존 HTTP 감사 산출물에 `.n34-four-domain-copy-contrast.json`을 추가한다. 별도 CI workflow는 생성하지 않는다.

## 완료의 의미와 남는 문제

N34가 통과하더라도 기존 연구 해석의 사회적·예측적 진실, 체감 가치, 통합 성격 결론의 적절성이 증명된 것은 아니다. N29 의미 충분성, 다층 근거를 가진 도메인 종합해석, 실제 유저 관점 가독성과 유효성은 별도 후속 실험으로 남는다. `mayPublish=false`, `maySell=false`, `usefulComplete=false` 및 contested/unreviewed lifecycle 유지.

## 검증 기록

일반 CI / PIE / Container / 고정 SHA Integration / 병합 후 새 main 검증은 PR 생성 후 실제 결과로 기록한다. 진행 중인 검증을 PASS로 기록하지 않는다.

## N34 후속 — 실제 문구 나란히 열람

기존 `npm run preview:natal:audit`를 실행하면 원본 품질 감사 JSON과 함께
`*.n34-research-copy-comparison.html` 내부 검토 화면을 생성한다.

이 화면은 35건의 실제 로컬 HTTP 명식, 20개 서로 다른 명식 대조(고유 19쌍),
동일 입력 대조군 1쌍의 기존 Career/Wealth/Business/Relationship 연구 Claim
원문을 왼쪽·오른쪽에서 실제 계산 위치, Rule, 출처와 함께 펼쳐 읽게 한다.
코드가 기존 원문을 재작성하지 않으며 N34의 원문·Claim 근거·위치 변화 분류도
그대로 보여준다. 연구 출처의 진실성·새 해석·실제 유저 만족을 인증하지 않는다.

파일은 내부 결과물일 뿐 Public UI나 Official Reading이 아니다.
신규 비용, API, DB, 배포 또는 Commerce 권한 변경 없음.
