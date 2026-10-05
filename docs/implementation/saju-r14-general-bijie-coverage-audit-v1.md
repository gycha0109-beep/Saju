# SAJU-R14 general 比劫 support coverage audit v1

이슈: #2178

## 결론

`generalBijieSupportCoverage`는 아직 **INCOMPLETE**다.

R11/R12가 canonical 겁재의 `劫財 -> 比劫 support constituent` 경로를 열었지만, 그 경로는 caller-selected single fact 한 건에 한정된다.

반면 R7의 比肩 표면은 canonical visible stem facts에서 year/month/hour의 exact 비견을 bounded count로 관측한다.

즉 현재 두 하위 표면의 범위가 비대칭이다.

## 현재 표면

### 比肩

- year / month / hour visible stems
- canonical Ten-God facts
- exact 비견 only
- 0~3 bounded visible count
- 劫財 미포함
- branch Ten-God 미포함
- hidden stem 미포함
- count는 黨眾/strength 의미가 아님

### 겁재 / 劫財

- caller-selected single canonical Ten-God fact
- resolved 겁재만 positive
- 겁재 -> 劫財 -> 比劫 category/support binding
- snapshot parity 검증
- whole-chart scan/count 없음
- internal pillar selection 없음
- branch/hidden scan 없음

## general 比劫 coverage를 막는 세 요구조건

1. **visible stem canonical 겁재 coverage가 없다**
   - R7의 visible 比肩 범위에 대응하는 year/month/hour canonical 겁재 관측 표면이 아직 없다.

2. **比肩 + 겁재 collection/union authority가 없다**
   - 두 하위 family가 각각 존재해도 자동으로 complete 比劫 collection이 되지 않는다.
   - 배열 합치기나 count 합산은 별도 semantic authority가 필요하다.

3. **branch / hidden stem을 general 比劫 coverage에 포함할지 scope decision이 없다**
   - visible-stem coverage를 만든다고 해서 branch/hidden coverage까지 자동으로 완성된 것으로 볼 수 없다.

## 다음 최소 구현 primitive

`VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE`

범위:

- canonical visible stem Ten-God facts
- day self slot 제외
- year/month/hour slot identity 보존
- exact canonical 겁재만 positive
- R11 single-fact membership/support authority 재사용 가능
- R12 snapshot parity binding pattern 재사용 가능

금지:

- 比肩+겁재 union
- unified 比劫 count
- support aggregation
- branch/hidden 자동 포함
- 黨眾/助寡
- 強弱/旺衰
- 格局
- narrative materiality
- Production

## 다음 단계

R15에서 visible stem canonical 겁재 coverage를 실제 ResearchEvidence/T2 surface로 materialize한다.

그 후에도 general 比劫 blocker를 즉시 닫지 않고, 별도 union authority와 branch/hidden scope 결정을 재감사한다.

Watchtower-Track: saju
