# SA-7D-A General Annual Atomic Semantic Source Acquisition v1

Issue: #2386  
Watchtower-Track: saju-bridge

## 1. 목적

General Annual `0.1.0-research` 후보를 그대로 승격하지 않고, 현재 후보 의미를 더 작은 원자 명제로 분해한 뒤 실제 출처가 어디까지 지지하는지 고정한다.

이 단계는 Research evidence acquisition이며 Engine / Preview / Official Reading / Production / public GA / persistence / commerce / annual detailed / monthly authority를 생성하지 않는다.

## 2. 첫 번째 원자 명제

```text
resolved annual heavenly stem
+ resolved natal day master
→ exact Ten-God relation identity
```

고전 전승문에는 `庚年 對 甲日 → 偏官`, `甲日 對 戊年 → 偏財` 예가 명시되어 있다.

이것은 십신 관계 identity의 근거 후보이지 현재 product candidate의 현대적 테마 문구까지 승인하는 근거가 아니다.

## 3. 현재 10개 테마 자동 상속 금지

현재 semantic key 10종은 전부 `REQUIRES_SEPARATE_DIRECT_SUPPORT`로 둔다.

즉 `고전에서 세운 천간과 일간의 십신 관계가 확인됨 != 현대적 연간 테마 의미가 자동 승인됨`이다.

## 4. Source candidate inventory

### 4.1 欽定古今圖書集成 · 三命通會 · 論太歲

Exact page: `Page:Gujin Tushu Jicheng, Volume 470 (1700-1725).djvu/50`.

해당 page-level 전승문은 `庚年剋甲日為偏官`, `甲日剋戊年，為偏財`를 명시한다.

판정: `EXACT_HISTORICAL_TRANSMISSION_CORROBORATION`.

1578 초간본 자체의 exact page verification은 아니며 현재 modern annual theme key를 지지하지 않는다.

### 4.2 NCL 1578 primary-edition scan objects

`三命通會`, 萬民英, 明萬曆戊寅六年(1578)刊본, National Central Library, Taiwan.

Commons에는 현재 최소 두 개의 upload object가 확인된다.

- `NCL-06589 1 三命通會.pdf`: 1,000 pages
- `NCL-06589 2 三命通會.pdf`: 187 pages

중요: 파일명의 `_1`, `_2`는 Commons upload chunk 식별자로 취급한다. 이를 작품의 `卷一`, `卷二`와 동일시하지 않는다.

현재 상태는 두 object 모두 `scan object located=true`, `reproducible=true`이지만, 어느 upload object의 어느 page가 실제 `卷二·論太歲`인지 아직 시각적으로 결박하지 않았다.

따라서:

```text
work-volume-two mapping = false
exact 論太歲 page bound = false
relevant passage visually verified = false
content hash bound = false
```

판정: `PRIMARY_SCAN_PAGE_VERIFICATION_REQUIRED`.

### 4.3 NLC 1926 scan

`三命通會`, 秦慎安校勘, 文明書局, 1926, National Library of China, 455 pages. Commons SHA-1 `0585bf97a47dedbcadf78e657a896bfdd20c0550`.

목차에서 卷之二의 `太歲`는 확인되지만 exact 본문 page가 아직 결박되지 않았다.

판정: `HISTORICAL_SCAN_PAGE_VERIFICATION_REQUIRED`.

### 4.4 Wikisource 三命通會/卷二

현대 공개 transcription은 `論太歲` section과 위 두 예를 확인하는 locator / transcription cross-check로만 사용한다. transcription alone을 visually verified primary witness로 간주하지 않는다.

### 4.5 Lee & Kim 2022

이남연 · 김기승, 「명리학에서 십성(十星)의 성립과 개념 확장에 관한 연구」, 산업진흥연구 7(1), 25-34, DOI `10.21186/IPR.2022.7.1.025`, KCI `ART002810441`.

이 자료는 classical relation identity를 modern product theme semantics로 자동 확장하지 못하게 하는 semantic boundary evidence로 사용한다. 현재 10개 annual theme key 자체의 직접 근거로 계산하지 않는다.

## 5. Branch clash 별도 층

annual-to-natal branch clash는 `deterministic relation fact → bounded structural-interaction qualifier → life-domain event/outcome semantics` 세 층으로 나눈다.

김만태(2013)의 충·형 연구는 structural research에 관련되지만, `올해 충 → 사고/이별/병/손실` 같은 특정 사건 예측을 승인하지 않는다.

현재 generic annual tension semantic과 pillar-specific emphasis는 source-qualified가 아니다.

## 6. 현재 결론

```text
exact historical transmission page bound = true
primary 1578 edition scan chunks located = true
primary 1578 work-volume-two chunk identified = false

exact primary 1578 論太歲 page bound = false
exact primary passage visually verified = false
atomic stem relation source-qualified = false
modern annual theme semantics source-qualified = false
generic annual clash tension source-qualified = false
Bridge re-entry ready = false
```

다음 단계는 `LOCATE_1578_VOLUME_TWO_PAGE → VERIFY_LUN_TAISUI_VISUALLY → atomic proposition adjudication → current theme RETAIN/NARROW/REPLACE/REMOVE → Bridge re-review`다.

## 7. Authority ceiling

이번 작업이 병합되어도 Engine, Preview, Official Reading, Production admission, public GA, persistence, commerce, annual detailed, monthly authority는 모두 false이고 `Production = HOLD`를 유지한다.

원본 page 검증과 후속 adjudication 없이 R199 test seam을 Production authority로 복제하지 않는다.