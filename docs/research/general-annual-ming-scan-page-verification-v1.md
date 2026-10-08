# SA-7D-A2 General Annual Ming Scan Page Verification Gate v1

Issue: #2395  
Watchtower-Track: saju-bridge

## 목적

General Annual의 첫 원자 명제인

```text
annual heavenly stem
+ natal day master
→ exact Ten-God relation identity
```

를 실제 역사 스캔 페이지에 결박하기 전까지 source-qualified로 올리지 않는다.

## 명나라 卷二 스캔 경로

National Library of China / Wikimedia Commons에 작품 권차가 명시된 명나라 만력기 판본이 있다.

### 第3冊

```text
NLC892-411999029701-67186 三命通會 第3冊.pdf
Description: 卷之二上
38 pages
刻本
明萬曆[1573-1620]
```

### 第4冊

```text
NLC892-411999029701-67187 三命通會 第4冊.pdf
Description: 卷之二下
55 pages
刻本
明萬曆[1573-1620]
```

이 경로는 `NCL-06589_1/_2`처럼 upload chunk 번호만 있는 1578 스캔보다 **작품 卷二 위치를 찾는 데 더 강한 locator**다.

다만 이것만으로 정확한 `論太歲` 페이지가 확인된 것은 아니다.

## textual locator

공개 전사본과 검색 인덱스는 卷二에 다음 section과 예문이 존재함을 반복해서 보여준다.

```text
論太歲

歲君傷日者，如庚年克甲日，為偏官
日犯歲君，如甲日克戊年，為偏財
```

이 정보는 실제 스캔 탐색 범위를 줄이는 locator/corroboration이다.

다음으로 대체할 수 없다.

```text
text transcription
search-index snippet
chapter sequence inference
→ visually verified scan page
```

## 필수 verification gate

다음이 모두 실제 scan surface에서 확인되어야 한다.

1. 실제 명나라 스캔 object 열기
2. exact scan object 결박
3. exact page index 결박
4. `論太歲` heading 시각 확인
5. `庚年...甲日...偏官` 예문 시각 확인
6. `甲日...戊年...偏財` 예문 시각 확인
7. 가능한 경우 stable page/file checksum 결박
8. 한 witness 안에서 원자 명제가 완결되는지 확인

## 현재 상태

```text
mingVolumeTwoScanRouteLocated = true
explicitUpperLowerVolumeMappingEstablished = true
textualLocatorCorroborationAvailable = true

exactLunTaisuiScanPageBound = false
relevantPassageVisuallyVerified = false
singleWitnessAtomicPropositionComplete = false
atomicStemRelationSourceQualified = false
bridgeReentryReady = false
```

따라서 다음 disposition은:

```text
VISUALLY_BIND_LUN_TAISUI_IN_MAPPED_MING_VOLUME_TWO_SCAN
```

이다.

## Authority ceiling

이 verification gate가 병합되어도 다음은 계속 false다.

- Engine
- Preview
- Official Reading
- Production admission
- annual detailed
- monthly authority
- public GA
- persistence
- commerce

```text
Production = HOLD
```

페이지를 직접 보지 못한 상태에서 page number를 추정하거나 textual locator를 scan witness로 승격하는 것을 금지한다.
