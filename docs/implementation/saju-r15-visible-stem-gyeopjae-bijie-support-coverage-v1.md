# SAJU-R15 visible-stem canonical 겁재 coverage v1

이슈: #2190

## 목적

R14에서 `generalBijieSupportCoverage` blocker를 분해한 결과, 다음 최소 primitive로 지정된 `VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE`를 실제 Engine research surface로 materialize한다.

## 구현 경로

```text
Canonical Saju Snapshot
  -> canonical derivedFacts.tenGods
  -> fixed visible scope: year/month/hour stem
  -> canonical day self-marker verification
  -> per-slot R11 canonical 겁재 -> 劫財 -> 比劫 membership
  -> per-slot R11 比劫 support constituent bridge
  -> snapshot-bound ResearchEvidence
  -> one T2 positive-presence claim at most
```

## 새 authority가 여는 것

- year/month/hour fixed visible-stem coverage
- exact canonical 겁재 positive recognition
- source slot identity preservation
- positive presence boolean
- R11 membership/support semantics reuse
- deterministic snapshot-bound reproduction

## 의도적으로 열지 않는 것

### count

R15은 `gyeopjaeCount`를 만들지 않는다.

1개, 2개, 3개 겁재가 있어도 claim은 최대 1개다.

slot multiplicity는 ResearchEvidence provenance에만 남고 semantic count가 아니다.

### 比肩 + 겁재 union

R7 visible 比肩 표면과 R15 visible 겁재 표면이 모두 존재해도 자동으로 complete 比劫 collection이 되지 않는다.

별도 collection/union authority가 필요하다.

### branch / hidden

branch Ten-God 및 hidden stem은 R15 입력이 아니다.

visible-stem coverage 완료를 branch/hidden coverage 완료로 승격하지 않는다.

## R12 binder와의 관계

R12의 `bindSuppliedSingleCanonicalTenGodFactToSnapshot`는 caller-supplied single-fact authority다.

R15은 이 binder를 year/month/hour에 반복 적용하지 않는다.

R15 자체가 fixed visible-stem coverage authority를 새로 소유하고, R12에서 확립한 다음 원칙만 재사용한다.

- canonical snapshot exactness
- deterministic reproduction
- source position provenance
- fail-closed validation

## fail-closed

다음은 evidence unavailable이다.

- scenario materialization required
- Ten-God chart unresolved
- year/month/day/hour stem fact 중 하나라도 unresolved/ambiguous/unavailable
- day stem이 canonical `일간` self marker가 아님
- R11 membership/support parity mismatch

payload가 snapshot에서 재생산되지 않거나 authority flag가 넓어져도 runtime validation이 거부한다.

## T2 claim

claim type:

`DAY_MASTER_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_EVIDENCE`

predicate:

`visible_stem_gyeopjae_bijie_support_observed`

claim value는 positive presence만 담는다.

다음은 claim에 포함하지 않는다.

- slot record
- 겁재 개수
- 比肩+겁재 union
- complete 比劫 collection
- 黨眾/助寡
- 強弱/旺衰
- 格局

`materialForNarrative = false`이며 isolated research pack only다.

## R15 이후 상태

R15 완료 후 R14의 첫 번째 missing requirement인 visible-stem canonical 겁재 coverage는 닫을 수 있다.

그러나 `generalBijieSupportCoverage` 자체는 아직 닫히지 않는다.

남은 핵심:

1. 比肩 + 겁재 collection/union authority
2. branch/hidden 比劫 coverage scope decision

따라서 support aggregation, 黨眾/助寡, 強弱/旺衰, 格局, Narrative/Official/public semantic authority, Production은 계속 HOLD다.

Watchtower-Track: saju
