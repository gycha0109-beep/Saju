# SAJU-R18 visible 比劫 union readiness re-audit v1

이슈: #2216

## 결론

R17 완료로 R16의 직접 blocker였던 visible 比肩 slot-identity coverage는 research-only로 닫혔다.

R15 겁재와 R17 비견은 이제 다음 positional contract를 공유한다.

- canonical `derivedFacts.tenGods`
- year/month/hour
- day self 제외
- 모든 visible stem fact resolved 요구
- slot identity 보존
- branch/hidden 미소비

따라서 **visible 比劫 category-member union은 explicit authority를 만들 준비가 됐다.**

하지만 **support-constituent union은 아직 준비되지 않았다.**

## positional parity

R15 겁재:

```text
year / month / hour
  -> canonical Ten-God
  -> 겁재 membership
  -> governed 겁재 support evaluation
```

R17 비견:

```text
year / month / hour
  -> canonical Ten-God
  -> exact 비견 observation
  -> R7 count parity guard
```

두 surface는 positional domain 기준으로 대칭이다.

## category union readiness

다음 최소 classification은 안전하게 정의할 수 있는 준비 상태다.

```text
각 visible slot:
  비견 -> visible 比劫 member kind = 比肩
  겁재 -> visible 比劫 member kind = 劫財
  그 외 -> bounded visible 比劫 union scope 밖
```

단, R18 자체는 이 union을 실행하거나 authority로 승인하지 않는다.

R18 판정:

`READY_FOR_EXPLICIT_AUTHORITY`

## support union이 아직 안 되는 이유

R15 겁재 slot은 각 slot evaluation이 governed support surface를 운반한다.

반면 R17 비견 slot은 의도적으로 provenance만 보존한다.

비견의 support authority는 기존 R7 chart-level visible 비견 surface에 있다.

즉:

```text
겁재: slot -> support
비견: slot -> provenance
      chart-level count -> support
```

이 차이를 무시하고 slot 단위 support collection을 만들면 R17이 의도적으로 만들지 않은 per-slot support 의미를 새로 발명한다.

따라서 support union 판정은:

`NOT_READY`

## R16 blocker delta

닫힘:

- visibleBijianSlotIdentityCoverage
  - CLOSED_RESEARCH_ONLY

계속 열림:

- bijianGyeopjaeCollectionUnionAuthority
  - 다음 단계에서 category authority로 materialize 가능
- branchHiddenBijieCoverageScopeDecision
  - UNRESOLVED

R18에서 새로 명시된 blocker:

- slotLevelSupportSemanticParity
  - MISSING

## 다음 최소 primitive

`VISIBLE_STEM_BIJIAN_GYEOPJAE_CATEGORY_MEMBER_UNION`

허용 범위:

- canonical year/month/hour fixed visible slots
- slot identity 보존
- canonical member kind 보존
- exact 비견 관측 재사용
- canonical 겁재 -> 比劫 membership 재사용

금지:

- support constituent union
- unified 比劫 count
- complete 比劫 collection
- branch/hidden coverage
- support aggregation
- 黨眾/助寡
- 強弱/旺衰
- 格局
- narrative materiality
- Production

## 이후 예상 경로

R19에서 category-member union을 실제 research-only surface로 materialize한다.

그 뒤 별도 감사에서 다음을 판단해야 한다.

1. 비견 slot에 support 의미를 승격할 근거가 필요한가
2. category collection과 support collection을 분리 유지할 것인가
3. branch/hidden을 general 比劫 coverage에 포함할 것인가

따라서 R18 완료만으로 `generalBijieSupportCoverage`를 닫으면 안 된다.

Watchtower-Track: saju
