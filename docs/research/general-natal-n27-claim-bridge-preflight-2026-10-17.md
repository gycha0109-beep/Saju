# Bridge #2557 — N27 Claim별 현재 증거 사전검사

**2026-10-17 · Watchtower-Track: saju-bridge**

이 문서는 **독립 Bridge 판정이 아니라 현재 저장소 증거의 사전검사**다. Research PR #2553은 draft이며, 이 작업은 Research 법적·문헌적 판단을 대체하거나 ReviewAttestation/TrustGrant를 발행하지 않는다. 등록된 Bridge 재심사 이슈: [#2557](https://github.com/gycha0109-beep/Saju/issues/2557).

## 재사용한 기존 권한

- 기존 Source-Bounded Bridge 결정: `buildGeneralNatalSourceBoundedAuthorityBridgeReview` — `RETURN_TO_RESEARCH`, source-integrity qualification 부족, 연구 11개 content-addressed subject에 대한 실 리뷰 0, 독립 trust 없음.
- Re-entry: `buildGeneralNatalBridgeReentryReadiness` — 기존 surface hash 일치 필요. 고정 witness 직접 판면·hash·전사동일성 및 三命通會卷七 peer taxonomy 출처 무결성을 **모두** 만족해야 재심사 가능. 이후 Reviewer/Trust/Provenance/Lifecycle은 별도다.
- Preview: `createPreviewSemanticAdmissionRegistryV1` — 다른 General Natal 승인 항목이 존재하더라도 **본 3개 Research Claim의 소유 모듈에 적용되는 `general:natal` 항목은 0건**. 별개 모듈의 권한을 유추하여 재사용하지 않는다.

## 별개 원천을 혼합하지 않는 세 Claim

| Claim | 실제 원천 / 요구 근거 | 지금 관측된 한계 | consumer |
|---|---|---|---|
| `GENERAL_NATAL_SOURCE_BOUNDED_PEER_TO_WEALTH_ADVERSE` | 기존 `0.2.0-research`, `M-GENERAL-NATAL-CONCLUSION-SOURCE-BOUNDED-V1`, peer+wealth T5와 정확한 겁재 | 정량 손재 예측 금지; 2010년 05:30 T8 1 vs 19:30 T8 0은 **연구 적용 적격성만**. 고전 劫財/敗財·比肩분奪의 의미 및 원문 출처 무결성 충돌, Source integrity/reviewer/trust 미충족 | **HOLD** |
| `GENERAL_NATAL_OFFICER_VISIBLE_STEMS_THEME` | `general-natal-useful-reading-candidate` T8 | 1984년 00:30 천간 丙 편관; 12:30 지지 午 정관과 채널 **및** 正/偏 subtype이 동시에 다름 | **HOLD** |
| `GENERAL_NATAL_OFFICER_BRANCHES_THEME` | `general-natal-useful-reading-candidate` T8 | 동일 예시의 반대 쪽. 천간 외향·지지 내향 자동 등치 근거 없음 | **HOLD** |

`src/research/general-natal-n27-claim-scoped-bridge-preflight.ts`는 두 개 Research Registry에서 각각 정확히 한 Claim rule을 찾고 **Rule version + contentHash + sourceIds + methodologyRef**를 추적한다. 허가된 Preview module entry가 없음을 확인한다. 현재 Bridge 연구 사전조건이 이미 충족됐거나 Rule/권한 surface가 바뀌면 이 **현시점 HOLD 전용 preflight를 실패**시키고 재검토한다.

## 다음 독립 판정 요구

1. Research: 물리 판본/folio, 전사 identity, witness hash, source locator, 고전 명칭·방법론 조건과 반례를 검증하여 정확한 content-addressed 후보로 반환한다.
2. Bridge: source/method/version/claim/scenario/target section에 결박한 심사와 독립 Reviewer/TrustGrant를 확보한 후 실제 `hold|qualifier|observation|claim` disposition을 **별도로 기록**한다.
3. Engine: 명시적 허용 범위가 생기기 전까지 Canonical→Official/HTTP에 새 개인 해석을 투입하지 않는다. 기존 2010 연구 T8 1 vs 0, N15 overclaim, N29 실제 HTTP 5쌍 QA를 유지한다.

**금지:** 출처가 부족한 단순 복합적 성격/직업/재산 판단, `FAMILY_MEANING` 임의 재작성, 다른 Research Pack 의미 합성, Preview/Official/Production/Commerce 허가, 사람 리뷰 완료 사칭.

**상태:** independentBridgeReviewOfIssue2557Completed=false, newConsumerMeaningAdmitted=false, N12 usefulComplete=false, P0-NATAL 미완료.
