# N28b — Canonical → Official 내 계산 십신 사실 Qualifier 실험

2026-10-17 · saju · Preview-only, 별도 전문가 승인 불필요

## 구현

N28a는 Official 보고서가 만들어진 다음 Product Preview의 읽기 순서를 재배치한다. N28b는 **Official 계획이 작성되기 전**에 기존 T8 Claim의 계산 십신 근거를 Canonical Qualifier로 투입하는 첫 수직 절편이다.

`createGeneralNatalIntegratedPreviewProductHost({enableAutonomousCanonicalFactQualifiers:true})`로만 실행한다.

1. 기존 `buildPreviewSemanticTextBindingsV1`과 `buildPreviewSemanticQualifierBindingsV1`을 유지한다.
2. General Natal에서 실제로 타깃으로 선택한 `GENERAL_NATAL_{FAMILY}_{VISIBLE_STEMS|BRANCHES}_THEME` T8 Claim에 대해 정·편 subtype과 연·월·일·시주 천간 또는 지지 대표 십신을 재계산한다.
3. 기존 Claim의 ruleRefs/sourceRefs, 정확한 methodologyRef, 기존 Detailed Source Profile이 일치할 때에만 **자동 계산 사실** Qualifier를 만든다.
4. 이 Qualifier는 `buildCanonicalReadingSemanticBundleV1` → `buildOfficialReadingPlanV1` → `renderOfficialReadingV1` → Artifact → Product를 통과해 기존 해석에 붙는다.
5. `N28B_AUTONOMOUS_CALCULATED_FACT_SCOPE` provenance는 자동 관측 권한일 뿐 ReviewerTrustGrant, 전문가 판단 또는 새 개인 성격·재물 결과 Claim 승인이 아니다.

시간 미상·다른 분야·다른 명식·근거 미확정은 새 Qualifier를 발행하지 않는다. 원본 Canonical/Official 읽기 생성 계약, 기존 Claim과 불확실성, Production 기본값을 유지한다.

### 단계 구분

- N27a: Product 뒤의 실험 독해 (완료)
- N27b: Claim/계산 위치 영수증 독립 검증 (완료)
- N28a: Product Preview에서 원래 Official 본문 앞쪽에 구조 독해 배치 (선행 PR #2565)
- **N28b: 내부 Canonical 의미 Qualifier가 Official 계획/렌더러로 실제 들어가는 절편 (현재 구현)**
- N28 전체 완료: canonical unit의 fact/Claim provenance와 소비자 보고서 간 전면 추적, 분량·품질·도메인 경계의 회귀 필요. N12 usefulComplete false.

이 코드는 금전 손실·직업 적합성·심리/성격 확정이나 겁재→재성의 경합 중인 고전적 결과를 허가하지 않는다.
