# P0-NATAL N32 — 네 분야 원본 연구 해석의 실제 독해 확장

2026-10-18 · Watchtower-Track: saju · internal research Preview

## 확인한 실제 누락

N31은 원래 Career/Wealth/Business/Relationship 후보 레지스트리에서 기존 T8 Claim의 정확한 Rule/Source/프로필 문구를 검증한다. 그러나 각 분야의 **첫 3개**만 `visibleClaims`로 내보내며 나머지를 `hiddenByLimitCount` 숫자로만 기록하여 HTML 독자는 원문을 읽을 수 없었다. 다중 십신 가족의 Business `channel-sensitive` 제약과 달리 표시되는 위치는 모든 채널의 단순 합집합이어서, 실제 승인된 공존 근거가 어느 채널인지 흐릴 위험이 있었다.

## 변경

- 기존 N31의 처음 3개 원본 연구 문장은 그대로 유지하고, 동일한 source/Claim/provenance/position 결박을 통과한 나머지 내용을 `additionalVerifiedClaims`로 보존한다. 충돌 Claim은 여전히 제외한다.
- `buildNatalN32ExpandedDomainResearchReading`은 같은 Canonical 원국에 대해 N31 검증을 다시 실행해 분야별 원본 전체 개수, 최초/추가 독해의 중복·누락 0, 연구 전용 권한을 확인한다.
- HTML 내부 연구 패널의 각 분야에 출처가 결박된 기존 한국어 해석을 펼쳐 읽는 요소를 추가한다. 기존 실제 Product 5분야 HTTP 응답과 원문 fingerprint를 수정하지 않는다.
- 채널 공존을 요구하는 `*-channel-sensitive` Business Claim은 실제로 해당 가족이 함께 관측된 채널의 기둥 위치만 출력한다. 채널 제약이 없는 기존 연구 Claim에 **새 채널 제약을 추가하지 않는다**.
- 테스트: 실제 레지스트리 실행 3개 명식의 모든 추가 원문, 미상시각 HOLD, 타인 명식·조작 문장 거부, 다중 가족 동일 채널 witness 검증. CI 실제 내부 HTML 생성 경로에 스모크 단언 추가.

## 권한 한계

출처가 결박된 **기존 연구 해석**을 더 읽기 쉽게 하는 것이지 새로운 명리 의미, 직업·돈·사업·연애 사건의 예측, 공식 소비자·Production·Commerce 판정이 아니다. `usefulComplete:false` 유지. 추가 승인·결론은 별도 근거가 확보되기 전까지 HOLD.
