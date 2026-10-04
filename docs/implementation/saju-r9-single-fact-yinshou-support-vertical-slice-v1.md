# SAJU-R9 supplied single-fact 印綬 support constituent 세로 경로 v1

이슈: #2087

## 목적

R9은 이미 승인된 두 semantic 단계를 실제 엔진 입력 표면으로 연결한다.

```
resolved canonical 정인|편인 single fact
  -> 印綬 source-category member
  -> 印綬 support constituent
```

핵심 제한은 **single fact only**이며, R9이 chart 안에서 그 fact를 고르면 안 된다.

## 발견된 prerequisite

기존 upstream authority는 다음만 허용한다.

```
one already-supplied FactState<TenGod>
```

동시에 다음을 명시적으로 금지한다.

- pillar position selection
- whole-chart 印 scan
- 印 count
- branch Ten-God scan
- hidden-stem Ten-God scan
- Ten-God recomputation

최신 main 조사에서는 downstream에 전달할 single canonical Ten-God fact를 선택해 주는 별도 governed selector/binder가 발견되지 않았다.

따라서 R8처럼 R9 adapter가 `year|month|hour` slot을 인자로 받아 snapshot 내부에서 fact를 선택하는 방식은 사용하지 않는다.

## prerequisite binding contract

R9에는 structural provenance 전용 binding contract를 먼저 둔다.

```
caller already has exactly one canonical FactState<TenGod>
+
caller supplies its exact canonical sourceFactRef
↓
binding contract
↓
same snapshot의 exact source fact와 byte-equivalent parity 검증
↓
bound single canonical Ten-God fact
```

허용 source fact ref는 현재 R9 visible-stem 범위에만 고정한다.

```
derivedFacts.tenGods.year.stem
derivedFacts.tenGods.month.stem
derivedFacts.tenGods.hour.stem
```

이 목록은 어떤 pillar를 골라야 한다는 selection policy가 아니다.

binder는:

- caller가 이미 공급한 fact와 ref를 검증
- exact snapshot provenance를 고정
- 단 하나의 ref만 직접 dereference

만 수행한다.

binder는 다음을 하지 않는다.

- pillar 선택
- 정인/편인 탐색
- 다른 pillar fallback
- position 의미/가중치 부여
- whole-chart scan
- Ten-God recomputation
- 사주 의미 해석
- Production 승격

## 실행 경로

```
CanonicalSajuSnapshot
+
caller-supplied {
  sourceFactRef,
  fact: FactState<TenGod>
}
↓
structural provenance binding
↓
exact one bound FactState<TenGod>
↓
admitResolvedCanonicalYinToYinshouCategory
↓
bindGovernedYinshouMemberToDangZhongSupportConstituent
↓
SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CONSTITUENT_EVIDENCE
↓
DAY_MASTER_SINGLE_FACT_YINSHOU_SUPPORT_CONSTITUENT_EVIDENCE
```

## positive

### 정인

```
caller-supplied resolved 정인
+ exact snapshot binding parity
-> 正印
-> 印綬
-> yinshou_support_constituent_observed
```

### 편인

```
caller-supplied resolved 편인
+ exact snapshot binding parity
-> 偏印
-> 印綬
-> yinshou_support_constituent_observed
```

두 경우 모두:

- dangZhongEstablished = false
- zhuGuaEstablished = false
- qiangRuoEstablished = false
- authority = research_only

## bounded non-positive

caller가 공급한 exact bound fact가 다른 resolved Ten-God이면:

```
resolved_outside_authorized_yin_label_scope
-> no_yinshou_support_constituent_evidence
```

이다.

이는 다음을 뜻하지 않는다.

- chart 전체에 印綬가 없다
- 다른 pillar에도 정인/편인이 없다
- 助寡
- 弱

R9은 다른 source fact를 찾아가지 않는다.

## fail-close

다음은 evidence 생성 자체를 중단한다.

- scenario materialization 필요
- outer Ten-God chart unresolved
- supplied source fact missing
- supplied source fact가 canonical Ten-God가 아님
- supplied fact와 sourceFactRef의 snapshot parity 불일치
- supplied fact ambiguous/unavailable
- upstream membership/support parity mismatch

## T2 claims

claim type:

`DAY_MASTER_SINGLE_FACT_YINSHOU_SUPPORT_CONSTITUENT_EVIDENCE`

정인과 편인에 각각 rule 하나를 둔다.

정인 claim:

- canonicalConstituent = 정인
- sourceMemberLabel = 正印
- sourceSupportCategory = 印綬

편인 claim:

- canonicalConstituent = 편인
- sourceMemberLabel = 偏印
- sourceSupportCategory = 印綬

공통 경계:

- sourceFactRef = provenance only
- pillar selection = not_authorized
- source ref semantic weight = not_authorized
- whole-chart scan = not_authorized
- 印綬 count = not_authorized
- support aggregation = not_authorized
- 黨眾/助寡 = not determined
- 強弱/旺衰 = not determined
- 格局 = not determined
- Production = false

sourceFactRef는 evidence provenance에는 남지만 claim value에는 싣지 않는다.

## 집계 금지

R9 이후에도:

```
visible 比肩
+ exact 甲乙 劫財
+ supplied single-fact 印綬
+ bounded 通根扶助
!= complete support collection
```

이다.

현재 completeness blocker는 그대로 남는다.

- general 比劫 coverage incomplete
- whole-chart 印綬 coverage incomplete
- Tonggen support coverage incomplete
- 黨眾 cardinality rule missing
- 比印重疊 threshold missing
- 通根 + 比印 composition rule missing

## 제품 경계

research pack 전용이다.

Narrative, Preview, Official, public semantic, Production 권한은 모두 닫혀 있다.

외부 사람/전문가 검토는 요구하지 않는다.

## 다음 단계

R9 병합 이후 R10에서:

- R2~R9 실행 표면
- 병렬 연구 트랙에서 새로 확정된 authority
- 새 반례/충돌
- 기존 completeness blocker

를 최신 main 기준으로 다시 감사한다.

R10 결과 없이 黨眾/助寡 집계를 구현하지 않는다.
