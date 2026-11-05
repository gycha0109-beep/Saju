# N27A — 외부 전문가 없는 명식별 증거 기반 자동 Preview 실험

**기준 2026-10-17 / Watchtower-Track: saju**

## 실제 구현

`createGeneralNatalIntegratedPreviewProductHost({ enableAutonomousEvidenceReading:true })`를 호출하면 기존 General Natal Official/Product 출력 뒤 **추가 구조 섹션** `명식별 십신 주제 연결 · 자동 실험 풀이`를 생성한다. 기본값은 false로 유지해 기존 35건 HTTP 품질·원문/readingId·Claim identity의 회귀를 깨뜨리지 않는다. 선택한 실험 mode는 외부 Reviewer, TrustGrant, 원본 인쇄본을 요구하지 않는다.

- 실제 동일 Canonical Snapshot의 T8 `GENERAL_NATAL_<FAMILY>_<VISIBLE_STEMS|BRANCHES>_THEME` Claim 발행 여부 확인.
- 규격에 맞는 year/month/day/hour stem 또는 **branch 대표 십신** `derivedFacts.tenGods`에서 정/편 유형·천간/지지 위치를 재검증.
- 해당 Claim의 실제 methodology 버전과 `GENERAL_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1`에서 **기존 이미 존재하는 standardText**를 직접 매칭한다.
- 위치/십신/기존 전통적 의미의 연결을 읽기 문장으로 출력. 최상위 해석 권한이나 새로운 인과 Claim을 만들지 않는다.
- 출생시각 미상, 두 입력의 명식 혼합, 없는 Claim, 불명 십신은 fail-closed. 기존 일반 Preview가 아닌 다른 영역 요청에는 적용 안 함. 별도 scope limitation을 함께 노출.
- 구조 설명은 **실제 명식마다 달라질 수 있지만**, 문구 차이만으로 인생 운세가 다르다고 입증한 것이 아니다. 성격·직업·재물·사건 예측, 강약·격국·용신 및 disputed 劫財→財 결과는 미제공.

## 프로젝트 정책 변경

외부 전문가의 서명/TrustGrant와 사람 검수 10건을 **일반 Personalization Preview의 필수 게이트에서 제거한다.** `#2562`는 의무 중단(not_planned). 다만 분야별 전통적 용어에 대한 정확한 원문 확인은 자율 조사·대조로 할 수 있고, 충돌 주장만 Claim 단위 제외한다. 연구 PR #2553 및 Bridge #2557/#2560은 **분쟁/출처 격리 선택지**이지 신규 자율 경로 전체를 차단하지 않는다.

## 후속 acceptance

1. 실제 35건/19쌍의 공개 예측 없는 인과 오해 여부를 자동 회귀.
2. 실제 1984 관성 正/偏, 2010 比肩/劫財, 1996 채널과 위치 비교에서 각 Claim의 원천/자리 차분을 자동 판정.
3. N27B 재현성·오인·반례 gate 후에도 허용 범위만 opt-in general Preview에 확장; Production 및 판매는 기존 별도 배포 정책을 따른다.

이 PR은 **사용자 읽기 기능**을 가진 최초의 자율 실험 경로이고 N27 완결, P0-NATAL 완료, 새로운 인생 결과의 정확성 보증을 주장하지 않는다.
