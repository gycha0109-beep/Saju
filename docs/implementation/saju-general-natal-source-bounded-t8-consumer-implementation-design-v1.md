# SAJU — General Natal source-bounded T8 소비 및 권한 복구 구현 설계 v1

Issue: #2455
Baseline: `main @ f16ef27e5122b15836cf368d93eabb0667e093e1`
Watchtower-Track: saju

## 0. 결정

**기존 T8 producer 재사용 + 실제 Reading 소비 경계 회귀검증**이 첫 구현 단위다. 생산용 해석을 승인하는 설계로 오해하지 않는다. 이미 구현된 후보나 외부 심사 수단을 중복 개발하지 않는다.

구현 목적은 먼저 한 명식에 대해 source-bounded T8 구조 사실이 실제 해석 런타임을 통과하고 읽기용 구조적 근거로는 식별되는지 확인하면서, 아직 소비자 문장/Production 권한은 없는 상태를 정확히 차단하는 것이다.

**신규 T8 규칙 0개, 새 registry/semantic authority 0개, 새 일반 제품 Profile 0개, 새 reviewer-trust framework 0개.**

## 1. 근거: 두 후보를 혼동하지 말 것

| 대상 | 현재 코드와 사실 | 허용 범위 |
| --- | --- | --- |
| 구조 한정 후보 | `src/research/general-natal-conclusion-source-bounded-candidate.ts` — T5 5개와 T8 5개, 1 methodology/3 classical source refs, pack `research` | 정확한 고전 관계와 식별 정보만 |
| 소비자 종합 결론 후보 | `src/research/general-natal-conclusion-synthesis-candidate.ts` — T5 5개와 T8 10개에 별도 기존 기본/주제 규칙을 포함한 `research` pack | 소비자 표현 후보를 실험할 수 있으나 Production 권한 없음 |
| 소비자 후보의 고전 증거 | `general-natal-conclusion-t8-passage-witness-evidence.ts` — 15 exact rules 중 10 passage-bound, 5 unsupported, 현재 exact consumer Production-supported 0 | 구조 근거 부분 확인. 현재 `headline/summary`에 대한 Production 승인 아님 |
| Production readiness | `general-natal-conclusion-t8-promotion-provenance-trust-readiness.ts` — pack/method/rules `research`, `secondary_only`, `unreviewed`, domain trust 부재 | `HOLD` |
| 실제 소비 차이 | `test/saju-refresh-general-natal-consumer-differential.test.ts` (#2451) | T2-only와 제한형 T5/T8 Preview 비교 완료. 신규 설계에서 반복할 필요 없음 |

구조 한정 T8은 정확히 다음 5개만 갖는다.

1. OUTPUT→WEALTH: generates, 食傷→財
2. WEALTH→OFFICER: generates, 財→官殺
3. OFFICER→RESOURCE: generates, 官殺→印
4. PEER→WEALTH: adverse_to, 劫財→財 — `겁재` exact-member 필요. `비견` 단독은 불가
5. WEALTH↔RESOURCE: conflicts_with, 財↔印

`consumerProjectionAuthorized=false`, `behavioralInferenceAuthorized=false`, `futureTimingAuthorized=false`, `numericScoringAuthorized=false`를 유지한다. T8의 structured `classicalPattern`과 `relationKind`가 소비자용 조언, 성격 단정, 강약/용신/직업 결과를 뜻하지 않는다.

## 2. 구현할 실행 수직선

```text
Birth Input
→ existing Calculation Policy
→ CanonicalSajuSnapshot (source identity/hash unchanged)
→ createGeneralNatalSourceBoundedRegistry()
→ runInterpretation(snapshot, registry)
→ existing 5 x T5 family-presence
→ existing 5 x T8 source_bounded_relation (condition-specific subset)
→ prepareProductReading(snapshot, execution, registry, "전체 사주")
   → general-natal-v2 Profile
   → required group FOUNDATION  [self_baseline OR month_branch_structural_context]
   → required group SYNTHESIS   [includes source_bounded_relation]
   → synthesis group may match; foundation group is NOT supplied by this pack
→ coverage = partial_coverage if at least one bounded relation is emitted
→ readingExecution = blocked_coverage
→ Narrative / Official Reading / Product Artifact = blocked
→ Production Composition = blocked (research pack)
```

이 결과는 **T8이 미구현이라는 뜻이 아니라, 정확한 기존 범위의 T8이 실행돼도 공식 읽기의 전체 근거가 충족되지 않는다는 뜻**이다. 현재 독립된 foundation claim이 없는 pack에 다른 후보의 일간 baseline을 묵시적으로 끼워 넣거나 `requiredClaimSelectors`를 축소하지 않는다.

기존 source-bounded T8이 0개인 경우 `insufficient_evidence`로 남는다. 어느 경우에도 보강 문장을 LLM이 작성하거나 Profile의 통과 판정을 강제로 바꾸지 않는다.

## 3. 실제 코드/권한별 소유권

| 단계 | 소유 코드 | 이번 설계의 조치 |
| --- | --- | --- |
| 계산 및 scenario | `src/calculation/calculation-engine.ts` | 수정 금지. canonical snapshot 사용 |
| T5/T8 producer | `src/research/general-natal-conclusion-source-bounded-candidate.ts` | 기존 방법론·규칙 그대로 호출 |
| Rule registry/claim lineage | `src/interpretation/rule-registry.ts`, `interpretation-engine.ts` | 생성 규칙 또는 fallback 추가 금지 |
| 필수 Profile | `src/reading/reading-intent-composition.ts` | 두 required group 유지 |
| 선택 및 scenario/authorization | `src/reading/scenario-aware-reading-composition.ts`, `reading-profile-authorization.ts` | 선택 Claim ID, coverage, 누락 조건 실증 |
| 실행 차단 | `src/reading/product-reading-integration.ts`, `governed-reading-execution.ts` | partial/insufficient → blocked; 모델 호출 금지 |
| 실제 Production admission | `src/production/production-composition.ts` 및 기존 registry governance | 별도 independent authorization 없으면 HOLD |

### 설계 인터페이스 — 신규 런타임 API가 아닌 **테스트에서 관찰할 기존 결과**

```text
snapshotId / canonical content hash
registrySnapshotId / interpretationRunId
T5 and T8 actual emitted claim IDs
T8 taxonomy = {tier:T8, category:general, subcategory:source_bounded_relation}
T8 value = relationId, fromFamily, toFamily, relationKind,
           classicalPattern, evidenceScope, exactTenGodConstraint
reading selection = coverageState, missingRequirements,
                    targetClaimIds, selectedClaimIds, omittedClaimIds
preparation = normalization, readingExecution=blocked_coverage
execution = insufficient_evidence OR partial_coverage, modelCalls=0,
            no artifact, no consumer reading
Production inspection = blocked, INTERPRETATION_PACK_NOT_PRODUCTION
```

**중복 API/DB 테이블을 만들지 않는다.** 검증은 기존 결과 객체 및 provenance에 대해서만 수행한다.

## 4. 1차 PR — 지금 구현 가능한 범위

기존 단위 테스트의 조건식 반복 대신 다음 **E2E consumer differential**를 추가한다.

- 양력 1984-06-14 05:30 (甲子 庚午 己卯 丁卯)와 양력 1984-02-06 05:30 (甲子 丙寅 庚午 己卯)를 기존 계산 정책으로 각각 실계산.
- T8 relation 1개 이상 실제 생성 및 원천 claim `upstreamClaimRefs` 연결 확인. 구체 수량을 임의 고정하지 않는다.
- Profile 합성 그룹은 매칭되지만 독립 Foundation 그룹이 없어서 `partial_coverage`, `NATAL_GENERAL_FOUNDATION_CLAIM_REQUIRED` 누락을 검증.
- 실제 Product execution = `blocked_coverage`, `modelCalls=0`, Reading/Artifact 없음.
- 구조 relation의 4가지 prohibition 플래그 및 연구 pack 미승인 확인.
- snapshot 불변성, 동일 input replay 결과 결정성, 다른 domain으로 근거 누출 금지.
- 종합 결론 후보의 소비자 `headline/summary`를 구조 candidate에 복제하지 않는다.

이 첫 PR의 성공은 **source-bounded T8 구조 소비의 E2E 경계 구현 확인**이지 General Natal 공식 상품 완료가 아니다.

## 5. 2차 승인 조건 — 이미 구현된 외부 경로의 재사용

새로운 `productionEligible=true` 플래그나 승인 엔진을 만들지 않는다.

```text
Fixed witness + Samyeong 卷七 peer source integrity
  └─ exact scan / transcription identity / physical folio / digest 재현
  └─ current Bridge disposition RETURN_TO_RESEARCH
  └─ 4 trigger evidence materially changed only -> Bridge re-review
      └─ exact same content-addressed methodology and 10 rules
      └─ existing 11-subject domain-review manifest
          └─ externally supplied real ReviewAttestation
          └─ independently governed ReviewerTrustGrant (hash pin)
              └─ separate rule provenance quality determination
              └─ separate pack/method/rule lifecycle promotion
                  └─ Product Profile / Official Reading materiality gate
                      └─ actual Product runtime smoke
```

기존 `general-natal-source-bounded-bridge-reentry-v1.md` 및 `general-natal-source-bounded-authority-bridge-review-20260924.md`의 `RETURN_TO_RESEARCH`를 무효화하지 않는다. `READY_FOR_BRIDGE_REREVIEW`도 승인 자체가 아니다.

**중요한 추가 경계:** source-bounded 10-rule pack이 장차 진짜 승인을 받더라도 현대적 소비자용 행동·직업·재물·관계 문장으로 자동 투영하지 않는다. 별도로 해당 exact T8 내용에 맞는 consumer-semantic materiality가 승인되어야 한다. 승인 전에는 구조적 데이터가 곧 완성된 상담 문장이 아니다.

## 6. 필요한 부정 사례

- `비견`은 존재하지만 `겁재`가 없으면 PEER→WEALTH 예외는 생성되지 않음 (기존 predicate 테스트 재활용).
- 출생시각 미상에서 `known hour` 요구 조건이 있으면 음성 false 판정 또는 임의 시주를 합성하지 않음. scenario 보존.
- 자기 결론과 다른 candidate 결론의 claimId 충돌/복제/의미권한 묵시적 합성 금지.
- candidate hash 변동은 기존 11 subject manifest의 stale 검토 거부로 연결; current hash 미검증 외부 리뷰 재사용 금지.
- source-integrity READY 하나만으로 domain-review/Production READY 결론 금지.
- 구조 T8 존재 = narrativeMateriality = true 가 아님.

## 7. 종료 조건

| 게이트 | PASS 정의 |
| --- | --- |
| A — 재사용 설계 | 기존 canonical→T5→T8→Profile→execution 경로와 소유 코드 매핑, 중복 시스템 없음 |
| B — 실행형 근거 | 최소 두 실제 계산 명식에서 source-bounded T8 + `partial_coverage`/차단을 검증하고 product leak 0 |
| C — CI 검증 | exact HEAD lint/typecheck/build/tests/PIE/Container/Integration PASS, SHA-pinned squash merge |
| 외부 권한 게이트 | 별도 HOLD; 코드 CI PASS가 source-integrity/domain-reviewed/Production PASS로 변환되지 않음 |

다음 직접 **기능 구현** 후보는 (1) independent source-integrity evidence가 실제로 바뀌었는지 먼저 확인하고, (2) 승인된 구성만 existing Registry/Reading 경로에서 재소비하도록 최소 연결을 구현하는 것이다. 독립적 source/리뷰 입력이 오지 않았다면 또 다른 readiness report를 만들지 않고 Research HOLD와 기존 제한 Preview를 유지한다.
