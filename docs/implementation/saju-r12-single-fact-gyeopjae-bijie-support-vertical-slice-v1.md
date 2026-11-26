# SAJU-R12 single-fact 겁재 → 比劫 support Engine vertical slice v1

이슈: #2149

## 목적

R11에서 승인된 semantic authority를 실제 Engine ResearchEvidence와 T2 Claim Graph 표면에 물질화한다.

R11은 다음을 승인했다.

`resolved canonical 겁재 single fact -> 劫財 -> 比劫 category member -> research-only 黨眾-associated support constituent`

R12는 이 authority를 새로 넓히지 않고, 기존 R9 single-fact binding 패턴으로 snapshot-bound evidence와 structural claim을 만든다.

## 입력

caller가 두 값을 명시적으로 공급해야 한다.

- canonical `FactState<TenGod>` 한 건
- 그 fact의 exact canonical source ref
  - `derivedFacts.tenGods.year.stem`
  - `derivedFacts.tenGods.month.stem`
  - `derivedFacts.tenGods.hour.stem`

공용 binder가 snapshot 안의 exact fact와 deterministic parity를 검증한다.

Engine은 pillar를 고르지 않는다.

## positive 경로

선택된 exact fact가 resolved `겁재`일 때만:

1. canonical `겁재`
2. governed lexical provenance `劫財`
3. R11 `比劫` category membership
4. R11 黨眾-associated support constituent
5. snapshot-bound ResearchEvidence
6. isolated research pack의 T2 structural claim

으로 물질화한다.

claim type:

`DAY_MASTER_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CONSTITUENT_EVIDENCE`

## non-positive / fail-close

선택된 fact가 다른 Ten-God이면 그 fact만 bounded non-positive다.

같은 chart의 다른 슬롯에 `겁재`가 있어도 검색하지 않는다.

다음은 unavailable/fail-close다.

- unresolved outer Ten-God chart
- ambiguous/unavailable selected fact
- supplied fact와 exact source ref의 snapshot parity mismatch
- scenario materialization이 필요한 snapshot

## 계속 금지

- internal pillar selection
- whole-chart 劫財 scan/count
- branch/hidden Ten-God scan
- canonical Ten-God recomputation
- 比肩+劫財 aggregation
- complete 比劫 collection
- 比劫+印綬 aggregation
- 通根 composition
- support aggregation
- 黨眾/助寡 settlement
- 強弱/旺衰 classifier
- numeric strength
- 格局
- narrative materiality
- Preview / Official Reading / public semantic authority
- Production

따라서 R12는 **하나의 이미 선택된 겁재 사실을 안전하게 Engine semantic surface에 올리는 단계**이지, 比劫 전체 수집기나 강약 판정기가 아니다.

## 다음 단계

R12 이후 R10 readiness를 delta 재감사한다.

특히 다음 blocker를 분리한다.

- general 比劫 coverage completeness
- whole-chart 印綬 coverage
- 通根 completeness
- 黨眾 cardinality
- 比印重疊 threshold
- 通根+比印 composition

R12 자체로 collection/count/aggregation은 승인되지 않는다.

외부 사람/전문가 승인 게이트는 요구하지 않는다.

Watchtower-Track: saju
