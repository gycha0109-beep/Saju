# SAJU-R16 比劫 union readiness re-audit v1

이슈: #2198

## 결론

R15은 R14의 첫 번째 결손인 visible-stem canonical 겁재 coverage를 닫았다.

그러나 比肩 + 겁재 union은 아직 구현할 수 없다.

이유는 두 visible surface의 표현 구조가 다르기 때문이다.

## 현재 surface

### R7 比肩

- canonical year/month/hour visible stem을 소비
- exact 比肩 only
- 0~3 bounded count
- 比劫 support constituent evidence
- count는 黨眾/strength가 아님
- branch/hidden 미소비
- **governed slot-identity collection은 materialize하지 않음**

### R15 겁재

- canonical year/month/hour visible stem을 소비
- exact canonical 겁재 only
- slot identity를 year/month/hour로 보존
- 각 slot의 겁재 -> 劫財 -> 比劫 support provenance를 보존
- positive presence boolean만 상위로 노출
- **겁재 count는 의도적으로 없음**

## 왜 바로 union하면 안 되는가

현재 두 surface를 바로 합치려면 다음 중 하나를 새로 가정해야 한다.

1. R7 count에서 比肩의 실제 slot을 역추론
2. R15 slot record에서 겁재 count를 새 semantic으로 도입
3. 서로 다른 shape를 임의 positional collection으로 정규화

세 가지 모두 기존 authority 밖이다.

따라서 `R7 + R15 = complete visible 比劫 collection`으로 해석하면 안 된다.

## R14 requirement delta

닫힘:

- visibleStemCanonicalGyeopjaeCoverage
  - CLOSED_RESEARCH_ONLY

계속 열림:

- bijianGyeopjaeCollectionUnionAuthority
  - MISSING
- branchHiddenBijieCoverageScopeDecision
  - UNRESOLVED

그리고 union 앞에 새로 드러난 직접 blocker:

- visibleBijianSlotIdentityCoverage
  - MISSING

## 다음 최소 primitive

`VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE`

목표:

- canonical year/month/hour visible stem
- exact canonical 比肩 only
- fixed slot identity 보존
- R7의 기존 bounded count를 대체하거나 재해석하지 않음
- count를 추가/변경하지 않음
- 겁재와 union하지 않음
- branch/hidden을 포함하지 않음

이 surface가 생긴 뒤에야 比肩와 겁재를 동일한 provenance 단위에서 union할 수 있는지 별도 감사할 수 있다.

## 계속 차단

- 比肩 + 겁재 union
- unified 比劫 count
- complete 比劫 collection
- general 比劫 support coverage
- branch/hidden coverage
- support aggregation
- 黨眾/助寡
- 強弱/旺衰
- 格局
- Narrative/Official/public semantic authority
- Production

Watchtower-Track: saju
