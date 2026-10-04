# SAJU-R9 단일-fact 印綬 support constituent 세로 경로 v1

이슈: #2087

## 목적

R9은 이미 승인된 두 단계를 실제 엔진 입력 표면으로 연결한다.

```
resolved canonical 정인|편인 single fact
  -> 印綬 source-category member
  -> 印綬 support constituent
```

중요한 제한은 **single fact only**다.

## upstream 계약

#678/#680은 다음만 허용한다.

```
one already-supplied FactState<TenGod>
```

그리고 명시적으로 다음을 금지한다.

- pillar position을 내부에서 선택
- whole-chart 印 scan
- 印 count
- branch Ten-God scan
- hidden-stem Ten-God scan
- Ten-God recomputation

따라서 R9이 정인/편인을 찾아 chart를 순회하면 안 된다.

## caller-selected binding

R9 builder는 caller가 `year|month|hour` visible stem Ten-God slot 하나를 넘기도록 한다.

adapter는 그 slot 하나만 canonical snapshot에서 dereference하고 다시 검증한다.

이 slot은 **provenance binding**이다.

다음을 뜻하지 않는다.

- year/month/hour별 의미 차이
- pillar weight
- position-specific strength
- 위치별 印綬 해석

claim value에는 selected slot을 싣지 않는다.

## 실행 경로

```
CanonicalSajuSnapshot
+ caller-selected visible stem Ten-God slot
  -> exact one resolved FactState<TenGod>
  -> admitResolvedCanonicalYinToYinshouCategory
  -> bindGovernedYinshouMemberToDangZhongSupportConstituent
  -> SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CONSTITUENT_EVIDENCE
  -> DAY_MASTER_SINGLE_FACT_YINSHOU_SUPPORT_CONSTITUENT_EVIDENCE
```

## positive

### 정인

```
resolved 정인
-> 正印
-> 印綬
-> yinshou_support_constituent_observed
```

### 편인

```
resolved 편인
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

selected fact가 다른 resolved Ten-God이면:

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

다른 pillar에 정인/편인이 존재해도 R9은 찾아가지 않는다.

## fail-close

다음은 evidence 생성 자체를 중단한다.

- scenario materialization 필요
- outer Ten-God chart unresolved
- selected visible stem fact missing
- selected fact ambiguous/unavailable
- selected fact semantic mismatch
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

- selected position semantics = not_authorized
- whole-chart scan = not_authorized
- 印綬 count = not_authorized
- support aggregation = not_authorized
- 黨眾/助寡 = not determined
- 強弱/旺衰 = not determined
- 格局 = not determined
- Production = false

## 집계 금지

R9 이후에도:

```
visible 比肩
+ exact 甲乙 劫財
+ single-fact 印綬
+ bounded 通根扶助
!= complete support collection
```

이다.

현재 completeness review가 기록한 다음 blocker는 그대로 남는다.

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
- 그동안 병렬 연구 트랙에서 새로 확정된 authority
- 새 반례/충돌
- 기존 completeness blocker

를 최신 main 기준으로 다시 감사한다.

R10 결과 없이 黨眾/助寡 집계를 구현하지 않는다.
