# P0-NATAL N15 — 소비자형 연구 T8 과잉 추론을 실제 출처 제한 구조로 축소

**2026-10-16 · Research/HOLD · 독립 소비자 의미 승인 아님.**

## 무엇을 변경하는가

기존 `general-natal-conclusion-synthesis-candidate.ts`는 서로 다른 십신 계열의 **존재만으로** 모두 10개의 종합 결론을 발행한다. 포함 문구에는 `압박을 공부와 체계화로 소화하는 축`, `일에서는 산출물과 책임이 붙는 역할이 맞물립니다`, `돈은 보유보다 운용과 선택의 문제`처럼 일반인 개인 특성·직업·돈에 직접 귀속되는 해석이 있다. 현재 `research`, `unreviewed`, `secondary_only`이므로 소비자용으로 승인돼 있지 않다.

**N15는 기존 생성한 연구 Claim을 소비자용으로 승격하거나 기존 프로듀서의 pinned 버전을 변조하지 않는다.** 대신 별도 실행 가능한 필터 `general-natal-n15-structural-only-conclusion-filter.ts`로 두 실행 결과를 비교한다.

1. 기존 10개 `consumer_conclusion` 후보는 실제 T5 family Claim ID와 동일 snapshot/registry/rule/version을 검증한다.
2. 별도로 N13의 source-bounded Rule Registry에서 실제로 실행된 T8 구조 관계를 가져온다. 여기에도 정확한 T5 2개, 출처 2개, 위치 근거, 정책 제한이 검증돼 있다.
3. **원 결론의 텍스트는 모두 차단**하고 다섯 개 패턴 중 해당 관계가 발행된 경우에만 기존 N13의 **좁은 구조 관측 문장**을 내부 연구용으로 대체한다:
   - `OUTPUT_TO_WEALTH` → `OUTPUT-TO-WEALTH`
   - `WEALTH_TO_OFFICER` → `WEALTH-TO-OFFICER`
   - `OFFICER_TO_RESOURCE` → `OFFICER-TO-RESOURCE`
   - `PEER_WEALTH_TENSION` → *정확히 겁재가 있는* `PEER-TO-WEALTH-ADVERSE`
   - `WEALTH_RESOURCE_TENSION` → `WEALTH-RESOURCE-CONFLICT`
4. 나머지 다섯 개(`CORE_FIVE_FAMILY_CYCLE`, `PEER_OFFICER_TENSION`, `WORK_OUTPUT_WEALTH_OFFICER`, `MONEY_WEALTH_PEER_RESOURCE`, `RELATIONSHIP_PEER_OFFICER`)의 현대적 개인 결론은 **차단**한다.
5. 원 연구 규칙이 발행되지 않았으면 `not_emitted`, 관계 근거가 부족하면 `blocked_missing_structural_evidence`로 분리한다.

### 어떻게 품질을 검증하는가

- 정확한 겁재 대 비견, 재성 부재, 원 T5 삭제, 잘못된 source-bounded Registry, snapshot mismatch, 원본 Claim 변경을 테스트한다.
- 동일한 실제 생년월일시 8건에서 기존 10개 종합결론 후보와 좁힌 결과를 JSON+HTML로 비교한다. 한 건의 개인 결론도 사용자용 문장으로 내보내지 않고, 출처 제한 구조만 검사한다.
- 보고서에 **원래 `headline/summary`를 복사하지 않는다.** N13 문장을 사용할 때에도 `Research/HOLD`로 표시한다.
- 소비자 Host/Official Reading/Preview/Production/결제/캐릭터/엔타이틀먼트와 현재 N12 MUR 판정은 모두 변경하지 않는다.

### 앞으로 실제로 필요한 단계

1. N15로 차단된 각 현대적 결론에 대해 원문 판본 무결성·소스 의미 범위·조건·반례를 검증한다.
2. 개인 행위·직업·돈·관계에 관해 실질적인 **외부 독립 도메인 승인**이 있는 결론만 정확히 claim-scoped Preview admission을 추가한다. 출력이 매끄럽다는 이유로 승인 금지.
3. 그때서야 기존 `OfficialReadingPlan → renderer → HTTP`에 소비자용 구조와 개인화 해석을 결합한다.
4. N12 MUR는 실제 승인된 다중 근거 종합 의미가 생성되고 사용자 본문까지 연결되기 전까지 `useful_complete=0` 유지.

**N15는 불충분한 연구 의미를 소비자용 결론으로 오인하는 개발 위험을 줄인 작업이며, 유료 제품 품질이 완료됐다는 뜻이 아니다.**
