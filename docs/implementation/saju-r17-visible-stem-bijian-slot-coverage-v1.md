# SAJU-R17 visible-stem canonical 비견 slot coverage v1

이슈: #2207

## 목적

R16에서 확인된 visible 比肩 / 겁재 surface 비대칭을 해소하기 위해 `VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE`를 research-only vertical slice로 materialize한다.

## 현재 문제

R7은 canonical year/month/hour의 exact 비견을 읽고 0~3 bounded count와 support constituent를 제공한다.

그러나 어느 슬롯이 비견인지에 대한 governed slot collection은 materialize하지 않았다.

반면 R15 겁재는 year/month/hour slot identity를 보존한다.

따라서 두 surface를 나중에 동일 provenance 단위로 비교하려면 비견도 slot identity surface가 필요하다.

## 구현 경로

```text
Canonical Saju Snapshot
  -> derivedFacts.tenGods
  -> year/month/hour fixed visible-stem scope
  -> day self-marker 검증
  -> exact canonical 비견 slot observation
  -> R7 bounded count parity guard
  -> snapshot-bound ResearchEvidence
  -> chart당 최대 1개의 T2 positive-presence claim
```

## 핵심 경계

### R7 count를 새로 만들지 않는다

R17 내부에서는 슬롯별 exact 비견 관측 수와 기존 R7 bounded count가 일치하는지만 확인한다.

이 cardinality는 새로운 semantic output이 아니다.

R17 claim에는 count를 넣지 않는다.

### 슬롯별 support 의미를 만들지 않는다

R7은 chart-level visible 비견 support constituent를 이미 가지고 있다.

R17은 슬롯 provenance만 보존하며 각 슬롯을 별도 support constituent로 승격하지 않는다.

### union은 아직 없다

R17이 끝나도 比肩 + 겁재 union을 자동 허용하지 않는다.

R17 이후 별도 re-audit에서 두 slot-preserving surface가 union-ready인지 확인해야 한다.

## ResearchEvidence

payload:

- snapshotId
- year/month/hour fixed slot evaluations
- exact canonical Ten-God
- exactBijianObserved
- visibleStemBijianObserved
- R7 bounded count parity verified

명시적으로 false:

- R7 count reinterpretation
- new 比肩 count semantics
- per-slot support constituent
- 比肩 + 겁재 union
- unified 比劫 count
- complete 比劫 collection
- branch/hidden scan
- support aggregation
- 黨眾/助寡
- 強弱/旺衰
- 格局
- narrative materiality
- Production

## T2 claim

claim type:

`DAY_MASTER_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_EVIDENCE`

predicate:

`visible_stem_bijian_slot_coverage_observed`

비견이 year/month/hour 중 1개든 2개든 3개든 claim은 최대 1개다.

slot detail은 ResearchEvidence에만 남는다.

## R17 이후

R16에서 추가된 직접 blocker:

- visibleBijianSlotIdentityCoverage

는 R17 완료 후 research-only로 닫을 수 있다.

그 다음에도 남는 핵심:

1. 比肩 + 겁재 collection/union authority
2. branch/hidden 比劫 coverage scope decision

따라서 complete general 比劫 coverage, unified count, support aggregation, 黨眾/助寡, 強弱/旺衰, 格局, Production은 계속 HOLD다.

Watchtower-Track: saju
