# SAJU-R8 exact 甲乙 劫財 → 比劫 구성요소 세로 경로 v1

이슈: #2073

## 목적

R8은 기존 exact `甲日主 + visible 乙 -> 劫財 -> 比劫 support constituent` 권한을 실행 가능한 research evidence와 T2 claim으로 연결한다.

핵심은 **whole-chart 劫財 scanner를 만들지 않는 것**이다.

## 실행 경로

```
CanonicalSajuSnapshot
+ explicit selected visible pillar slot(year|month|hour)
  -> resolved day master
  -> exact selected visible stem
  -> observeJiaYiJiecaiExactRelation
  -> bindExactJiaYiJiecaiToBijieDangZhongSupportConstituent
  -> SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CONSTITUENT_EVIDENCE
  -> DAY_MASTER_EXACT_JIA_YI_BIJIE_SUPPORT_CONSTITUENT_EVIDENCE
```

## 왜 explicit slot인가

현재 upstream authority는 다음을 명시한다.

- exact 甲 + visible 乙 pair matcher만 승인
- bounded pair input only
- whole-chart 劫財 scan unauthorized
- generalized 劫財 resolver unauthorized

따라서 R8이 year/month/hour 전체를 순회하면서 乙을 찾으면 기존 권한을 넘어선다.

R8 builder는 caller가 `year|month|hour` 중 정확히 한 slot을 선택하도록 강제한다.

validator는 payload의 selected slot을 다시 읽어 동일 snapshot에서 그 slot 하나만 재현한다.

## positive

다음일 때만 positive다.

```
resolved day master = 갑
selected visible stem = 을
```

기존 relation evaluator가 `jia_yi_jiecai_relation_observed`를 반환하고,
기존 support bridge가 `jia_yi_jiecai_bijie_support_constituent_observed`를 반환해야 한다.

의미:

- source relation = 劫財
- source support category = 比劫
- bounded selected-pair support constituent observed

## non-positive

selected slot이 乙이 아니거나 day master가 甲이 아니면 selected pair는 non-positive일 수 있다.

그러나 다음은 절대 뜻하지 않는다.

- 명식 전체에 劫財가 없음
- 명식 전체에 比劫 support가 없음
- 助寡
- 弱

다른 slot에 乙이 존재하더라도 R8은 찾아가지 않는다.

## 미해결

다음은 non-positive로 축소하지 않고 evidence 생성 자체를 중단한다.

- scenario materialization 필요
- day master unresolved
- selected visible pillar unresolved
- relation/support bridge parity mismatch

## 금지선

R8은 다음을 만들지 않는다.

- whole-chart 劫財 scan
- generalized 劫財 resolver
- same-element opposite-polarity 일반 규칙
- 乙日主 + 甲 대칭 규칙
- canonical 겁재 -> source 劫財 global alias
- 劫財 ⊂ 比劫 ontology 일반화
- hidden stem/branch Ten-God
- 劫財 count
- 比肩 + 劫財 count
- support collection completeness
- 黨眾/助寡
- 強弱/旺衰
- 格局
- Production

selected pillar 위치에도 별도 의미나 가중치를 부여하지 않는다.

## T2 claim

claim type:

`DAY_MASTER_EXACT_JIA_YI_BIJIE_SUPPORT_CONSTITUENT_EVIDENCE`

claim은 positive pair의 semantic family만 보존한다.

selected pillar slot 자체는 claim value에 싣지 않는다.

따라서 year/month/hour 어디에서 관측됐는지는 evidence provenance에는 남지만, 위치 의미로 승격되지 않는다.

## 제품 경계

research pack 전용이다.

Narrative, Preview, Official, public semantic, Production 권한은 모두 닫혀 있다.

외부 사람/전문가 검토는 요구하지 않는다.

## 다음 단계

R9에서는 resolved single canonical 정인/편인 fact를 existing 印綬 membership + support bridge로 연결하되,
whole-chart 印綬 scan/count는 만들지 않는다.

R9 이후 R10에서 그동안 병렬 연구 결과까지 포함해 support-surface readiness를 다시 감사한다.
