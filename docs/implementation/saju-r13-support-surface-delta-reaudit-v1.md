# SAJU-R13 support-surface blocker delta re-audit v1

이슈: #2161

## 결론

R10의 aggregation readiness 결론은 여전히 **NOT_READY_FOR_AGGREGATION**이다.

다만 blocker 수는 R10의 7개에서 **6개로 감소**했다.

닫힌 항목은 하나뿐이다.

- `generalJiecaiToBijieSupport`
  - R10: `UNAUTHORIZED`
  - R11: resolved canonical single `겁재`를 `劫財 -> 比劫` source-category member 및 research-only support constituent로 승인
  - R12: 동일 authority를 exact snapshot-bound ResearchEvidence와 isolated research-only T2 claim으로 물질화

따라서 “이미 canonical 겁재로 확정된 single fact를 比劫 support constituent로 취급할 수 있는가”라는 의미/Engine blocker는 닫혔다.

## 아직 닫히지 않은 6개

1. `generalBijieSupportCoverage = INCOMPLETE`
2. `wholeChartYinshouSupportCoverage = INCOMPLETE`
3. `tonggenSupportCoverage = INCOMPLETE`
4. `dangZhongCardinalityRule = MISSING`
5. `biYinChongDieThreshold = MISSING`
6. `tonggenBiYinCompositionRule = MISSING`

## 중요한 비확장 경계

R11/R12는 다음 권한을 만들지 않았다.

- whole-chart 劫財 scan/count
- 比肩+劫財 aggregation
- complete 比劫 collection
- whole-chart 印綬 collection
- exhaustive 通根 collection
- 比劫+印綬 aggregation
- 通根+比印 composition
- 黨眾 cardinality / threshold / boolean settlement
- 助寡
- 強弱/旺衰 classifier
- numeric strength
- 格局
- narrative materiality
- Production

즉 blocker 하나를 닫았다고 support surface 전체가 완성된 것은 아니다.

## 병렬 연구 R180

R180은 甲己의 competing-relation repository evidence coverage 감사다.

현재 상태는 research-only이며 pair-local outcome, executable resolver, automatic engine admission, interpretation claim, Production authority를 열지 않았다.

이 트랙은 R13 support-surface blocker 변화에 영향을 주지 않는다.

## 다음 우선순위

aggregation을 시작하지 않는다.

남은 6개를 coverage / cardinality / threshold / composition으로 분리해 하나씩 닫는다.

가장 먼저 다룰 후보는 `generalBijieSupportCoverage`다. R11/R12 덕분에 겁재의 single-fact semantic path는 확보됐으므로, 다음에는 **比肩 + 劫財 전체 coverage가 정확히 무엇을 요구하는지**를 별도 authority audit로 좁혀야 한다.

Watchtower-Track: saju
