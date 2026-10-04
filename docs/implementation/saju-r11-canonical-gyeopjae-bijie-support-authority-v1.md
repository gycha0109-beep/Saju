# SAJU-R11 canonical 겁재 → 比劫 support authority v1

이슈: #2127

## 목적

R10에서 남긴 blocker 중 다음 하나를 닫는다.

`generalJiecaiToBijieSupport = UNAUTHORIZED`

R8은 exact `甲日主 + 乙`만 劫財→比劫 support constituent로 인정한다. R11은 특정 일주/상대 천간 쌍을 일반화하는 것이 아니라, 이미 계산 엔진에서 canonical Ten-God로 확정된 `겁재` fact 하나를 입력으로 받아 source category membership을 승인한다.

## 근거

### canonical vocabulary

기존 governed bridge:

`겁재 -> 劫財`

이 bridge는 lexical provenance만 제공한다.

### 比劫 category membership

선정 출처:

- 千里命稿
- section: 比劫祿刃篇
- body: `茲再述比肩劫財之損益如後`

section heading이 比劫이고 같은 section 본문이 比肩·劫財를 명시적으로 함께 다루므로, 이 authority는 **이미 canonical 겁재로 확정된 single fact**를 劫財→比劫 category member로 admit한다.

이는 global 문자열 alias가 아니다.

### 黨眾 support family

기존 governed source context는 比劫을 黨眾-associated support family로 직접 명시한다.

따라서:

`canonical 겁재 single fact -> 劫財 -> 比劫 member -> bounded support constituent`

를 research-only로 승인한다.

## 닫히는 blocker

- general canonical 겁재 → 比劫 support semantic mapping: 승인

R8의 `甲+乙` exact pair에만 묶여 있던 의미 제약은 이 mapping에서 제거된다.

## 계속 남는 blocker

- whole-chart 劫財 scan
- 劫財 count
- branch/hidden Ten-God scan
- 比肩+劫財 aggregation
- complete 比劫 collection
- general 比劫 coverage completeness
- 黨眾 cardinality
- 比印重疊 threshold
- 通根+比印 composition
- 黨眾/助寡
- 強弱/旺衰
- 格局
- Production

## fail-close

ambiguous/unavailable canonical Ten-God는 member가 아니다.

resolved non-겁재 Ten-God도 단지 이 authority 범위 밖일 뿐, chart 전체에 比劫이 없다는 뜻이 아니다.

## 다음 단계

R11 이후에는 이 새 semantic authority를 snapshot-bound engine input으로 물질화할지, 또는 R10 readiness를 먼저 delta re-audit할지 최신 main 기준으로 판단한다.

외부 사람/전문가 승인 게이트는 요구하지 않는다.

Watchtower-Track: saju
