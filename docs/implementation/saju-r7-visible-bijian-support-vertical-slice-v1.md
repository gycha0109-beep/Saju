# SAJU-R7 가시 比肩 구성요소 세로 경로 v1

이슈: #2053

## 목적

R7은 이미 승인된 가시 比肩 bounded operand와 比劫 support-constituent bridge를 실제 엔진 입력 표면으로 연결한다.

劫財, 印綬, 通根扶助를 이 단계에서 섞지 않는다.

## 실행 경로

```
CanonicalSajuSnapshot
  -> derivedFacts.tenGods
  -> bindVisibleBijianCountToBoundedLeftOperand
  -> bindGovernedVisibleBijianToDangZhongSupportConstituent
  -> SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CONSTITUENT_EVIDENCE
  -> DAY_MASTER_VISIBLE_BIJIAN_SUPPORT_CONSTITUENT_EVIDENCE
```

## canonical 입력 경계

R7은 canonical `derivedFacts.tenGods`만 사용한다.

가시 stem은 year/month/day/hour 모두 resolved여야 하며 day stem은 `일간` self marker여야 한다.

peer stem count 대상은 year/month/hour의 정확한 `비견`만이다.

다음은 소비하지 않는다.

- 劫財
- branch Ten-God
- hidden stem
- day self marker
- raw Ten-God 재계산

## 0 / 1 / 2 / 3 의미

기존 권한은 visible 比肩을 0/1/2/3으로 구분한다.

- 0: bounded peer stem operand 없음
- 1/2/3: 기존 proposition에 연결된 bounded peer stem operand

R7은 이 값을 provenance에 보존한다.

그러나 이 값은 다음이 아니다.

- 黨眾 count
- support strength
- numeric strength
- pillar weight
- chart-level 強弱 score

T2 claim에는 실제 1/2/3 숫자를 올리지 않는다.

## 미해결 상태

다음은 0으로 바꾸지 않고 evidence 생성 자체를 중단한다.

- Ten-God chart unresolved
- visible stem facts unresolved
- day stem semantic mismatch
- upstream/support bridge parity mismatch

따라서 미해결 상태가 “가시 比肩 없음”으로 축소되지 않는다.

## 증거 의미

positive evidence는 다음만 뜻한다.

> 현재 governed visible stem 범위에서 exact 比肩 support constituent가 관측되었다.

source support category는 `比劫`이지만, R7은 劫財를 추가하거나 generalized 比劫 surface를 완성하지 않는다.

## T2 claim

claim type:

`DAY_MASTER_VISIBLE_BIJIAN_SUPPORT_CONSTITUENT_EVIDENCE`

claim은 다음을 고정한다.

- canonical constituent = 비견
- source support category = 比劫
- support constituent observed = true
- peer count semantics = bounded operand only
- 劫財 included = false
- constituent collection complete = false
- support aggregation = not authorized
- 黨眾/助寡 = not determined
- 強弱/旺衰 = not determined
- 格局 = not determined
- Production = false

0 visible 比肩 evidence는 rule `not_matched`, claim 0개다.

evidence 자체가 없으면 `skipped_missing_input`으로 fail-close한다.

## 금지선

R7에서는 다음을 하지 않는다.

```
visible 比肩 count > 0
!= 黨眾
```

```
visible 比肩 count
!= strength weight
```

```
比肩 + 劫財
!= 자동 比劫 complete surface
```

```
比劫 + 印綬 + 通根扶助
!= 자동 黨眾
```

## 제품 경계

research pack 전용이다.

Narrative, Preview, Official, public semantic, Production 권한은 모두 닫힌 상태다.

외부 사람/전문가 검토는 요구하지 않는다.

## 다음 단계

R8은 exact 甲日主 + visible 乙의 기존 劫財 -> 比劫 support constituent를 독립 실행 표면으로 올리는 것이 자연스럽다.

R9는 resolved single canonical 정인/편인 -> 印綬 support constituent를 독립 실행 표면으로 올릴 수 있다.

세 축을 모두 실행 가능하게 만든 뒤에도 집계는 별도 권한 없이는 금지한다.
