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

### 4.2a 명대 刻本 · 작품 권차가 명시된 독립 스캔 2종

기존 대만 NCL 1578년판 업로드 단위(`_1`/`_2`)와 **다른 소장처·파일 집합**이다.

- 중국 국가도서관 `NLC892-411999029701-67186 三命通會 第3冊.pdf`
  - Commons catalogue: `卷之二上`, 명 만력 연간[1573–1620], 刻本, **38 pages**
  - 업로드 URL: https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67186_三命通會_第3冊.pdf
- 중국 국가도서관 `NLC892-411999029701-67187 三命通會 第4冊.pdf`
  - Commons catalogue: `卷之二下`, 명 만력 연간[1573–1620], 刻本, **55 pages**
  - 업로드 SHA-1(Commons 공개값): `790baba8f4b7abc2ab706db2ae8eff4651c270ff`
  - 업로드 URL: https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67187_三命通會_第4冊.pdf

**검증된 범위:** 해당 스캔 *객체의 서지 메타데이터*에 작품 권차가 명시되어 있다. 파일명이 `卷二`를 암시한다는 추론이 아니다.

**2026-10-08 직접 스캔 확인 결과:** GitHub의 독립 실행 환경에서 원본 PDF를 직접 내려받았고, 두 책 전 페이지(38+55)를 이미지로 재생성했다. 검색 스니펫·전사·기계 번역만으로 승인한 것이 아니다.

- **제3책(卷之二上)**: 38쪽 원본 다운로드 및 판면 렌더 완료. 계산 SHA-1 `d340e84e9aa4c788f004e3c63781327148edca4b`, SHA-256 `112084f6f463038285d87c477a6f80527d44a3e3d4d16a5e0ecfb24159f320d2`. 목표 표제/본문의 판면은 이 책이 아니라 아래 제4책에서 결박했다.
- **제4책(卷之二下)**: 55쪽 원본 다운로드 및 판면 렌더 완료. 계산 SHA-1 `790baba8f4b7abc2ab706db2ae8eff4651c270ff`가 Commons의 게시값과 일치, 계산 SHA-256 `3e2e924984f51628207bfec441729b1b616e4f051cfa3ea6661262888bba1f18`.
- **정확한 원문 판면**: 제4책 **PDF 25쪽(1-based) / index 24(0-based)**, 한 이미지에 양쪽 판면이 수록됨. 오른쪽 판면에 `論太歲` 제목, 왼쪽 판면에 아래 두 구절이 직접 보임.
- `歲君傷日者如庚剋甲日為偏官`
- `日犯歲君如甲日剋戊年為偏財`
- 재현 증거: GitHub Actions [실행 37752324421](https://github.com/gycha0109-beep/Saju/actions/runs/37752324421) (25쪽 고해상도 직접 렌더 로그 및 단기 보관 아티팩트), 원본 [Commons 第4冊](https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67187_三命通會_第4冊.pdf).
- **별도 미확인**: 스캔 안의 역사적 인쇄면 번호, 대만 NCL 1578 판본과의 정확한 동일 판본 여부. 1578 업로드 청크는 별도 미검증으로 유지한다.

직접 확인한 두 예문이 허용하는 결론은 **연간 천간과 출생 일간의 십신 관계 identity**뿐이다. 고전 원문의 군신·부자 비유 및 길흉 설명을 현대식 연운 테마·사건 확정·점수로 자동 확장하지 않는다.

```text
mingVolumeTwoUpperLowerScanObjectsLocated = true
exactMingLunTaisuiPageBound = true
exactMingLunTaisuiPassageVisuallyVerified = true
atomicStemRelationSourceQualified = true (identity_only)
modernAnnualThemeSemanticsSourceQualified = false
bridgeReentryReady = false
Production = HOLD
```

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
atomic stem relation source-qualified = true (Ming direct image, identity_only)
modern annual theme semantics source-qualified = false
generic annual clash tension source-qualified = false
Bridge re-entry ready = false
```

다음 단계는 `current theme 10개 개별 RETAIN/NARROW/REPLACE/REMOVE 근거 판정 → 별도 Bridge re-review`다. 1578 대만 판본의 원전 페이지 검증은 독립 provenance 후속 과제이며, 현재 직접 검증한 명대 刻本과 동일하다고 취급하지 않는다.

## 7. Authority ceiling

이번 작업이 병합되어도 Engine, Preview, Official Reading, Production admission, public GA, persistence, commerce, annual detailed, monthly authority는 모두 false이고 `Production = HOLD`를 유지한다.

원본 page 검증과 후속 adjudication 없이 R199 test seam을 Production authority로 복제하지 않는다.
## 8. 출처 진술 / 해석 / 추론 경계

| 층위 | Source-qualified 범위 |
|---|---|
| 출처 진술 | 明萬曆 刻本 第4冊 卷之二下 PDF 25쪽: `歲君傷日者如庚剋甲日為偏官`, `日犯歲君如甲日剋戊年為偏財` |
| 전통적 관계 해석 | 연간 庚이 일간 甲을 剋할 때 偏官, 일간 甲이 연간 戊를 剋할 때 偏財라는 **방향성이 있는 십신 관계** |
| Research 추론 | 이미 확정된 일간·해당 연도의 천간으로 governed Ten-God relation table이 **원자적 identity**를 반환할 수 있음 |
| 비허용 확대 | 사건 발생·재물 손실·질병·직업 성과·성격 개조·심리적 연간 테마·길흉 수치·동일 관계의 월운 자동 승격 |

### 조건·예외·반례

- 입력: 출생 일간과 기준 연도의 천간이 모두 확정되어야 하며, 불명확하면 결과 생성 금지
- 방향 반례: 연간 庚→일간 甲의 偏官과 일간 甲→연간 戊의 偏財는 서로 치환할 수 없음
- 고전 본문에 등장하는 신하·군주 비유 및 구조적 구제 조건은 **문헌 맥락**이지 보편적인 결과 예측 규칙으로 승인한 것이 아님
- 학파마다 뒤따르는 결과 해석이 다를 수 있으므로 전통 십신 taxonomy 이외의 심리·사건 해석에는 별도 직접 출처 및 Bridge adjudication이 필요
- 現 10개 General Annual theme는 여전히 `REQUIRES_SEPARATE_DIRECT_SUPPORT`; 4개 지지 충 해석 또한 자동 승인하지 않음
- 원자 근거 증명 `true`는 **Research 단계에 국한**되며 Engine / Preview / Official Reading / Production 및 Bridge 반환 가능 상태를 변경하지 않음

## 9. SA-7D-A3 — 기존 현대식 Annual 테마 10개 독립 판정 (보완)

### 9.1 증거의 두 축

**현대식 의미의 출처 등급**과 **고전 원전에서 직접 확인한 십신 identity의 출처 등급**은 별개입니다.

- 명 만력 刻本 『三命通會』 제4책 PDF **25쪽**의 `論太歲` 두 예문은 `庚` 연간이 `甲` 일간을 극하는 **偏官**, `甲` 일간이 `戊` 연간을 극하는 **偏財**에 대해 방향성이 있는 원자적 관계 identity를 직접 확인합니다.
- 이 두 예문은 나머지 여덟 십신 이름·분류 전체를 열거하는 직접 증거가 아닙니다. 전부를 해석하려면 별도 관리되는 십신 관계 taxonomy와 정확한 추가 문헌이 필요합니다.
- 이남연·김기승(2022), DOI `10.21186/IPR.2022.7.1.025`는 고전 관계 identity와 후대 심리·기능 확장의 **차이를 설명하는 현대 학술 자료**입니다. 기존 연운 테마의 직접 고전 근거로 사용하지 않습니다.
- 내부 제품 정책 `SRC-MYEONGHA-ANNUAL-INTERPRETATION-POLICY-V1`은 현재 후보 문구의 출처일 뿐 전통 명리 근거가 아닙니다.

열 가지 **기존 현대적 주장 자체의** `sourceSupportGrade`는 모두 `INSUFFICIENT`이며, `originalModernMeaningGate=REQUIRES_SEPARATE_DIRECT_SUPPORT`로 유지합니다. 이것은 전체 전통 문헌에 그 의미가 *없다*는 부재 증명이 아닙니다.

### 9.2 각 후보·원전·승계의 개별 연구 판정

| semanticKey | 십신 | 현재 현대식 주장 | 확인한 고전 십신 identity | 현대식 출처 등급 | 연구 처분 |
|---|---|---|---|---|---|
| `ANNUAL_PEER_SELF_DIRECTION` | 비견 | 자기 방향성 | 별도 직접 판면 미확인 | INSUFFICIENT | REQUIRES_SEPARATE_DIRECT_SUPPORT |
| `ANNUAL_PEER_COMPETITION_COORDINATION` | 겁재 | 경쟁·조율 | 별도 직접 판면 미확인 | INSUFFICIENT | REQUIRES_SEPARATE_DIRECT_SUPPORT |
| `ANNUAL_OUTPUT_STEADY_PRODUCTION` | 식신 | 꾸준한 생산 | 별도 직접 판면 미확인 | INSUFFICIENT | REQUIRES_SEPARATE_DIRECT_SUPPORT |
| `ANNUAL_OUTPUT_EXPRESSION_CHANGE` | 상관 | 표현·변화 | 별도 직접 판면 미확인 | INSUFFICIENT | REQUIRES_SEPARATE_DIRECT_SUPPORT |
| `ANNUAL_WEALTH_EXTERNAL_RESOURCES` | 편재 | 외부 자원 | `甲日剋戊年為偏財` — PRIMARY_SUPPORTED (identity only) | INSUFFICIENT | REPLACE |
| `ANNUAL_WEALTH_STRUCTURED_RESOURCES` | 정재 | 구조적 자원 | 별도 직접 판면 미확인 | INSUFFICIENT | REQUIRES_SEPARATE_DIRECT_SUPPORT |
| `ANNUAL_OFFICER_PRESSURE_RESPONSE` | 편관 | 압박 대응 | `庚剋甲日為偏官` — PRIMARY_SUPPORTED (identity only) | INSUFFICIENT | REPLACE |
| `ANNUAL_OFFICER_ROLE_RESPONSIBILITY` | 정관 | 역할·책임 | 별도 직접 판면 미확인 | INSUFFICIENT | REQUIRES_SEPARATE_DIRECT_SUPPORT |
| `ANNUAL_RESOURCE_ALTERNATIVE_LEARNING` | 편인 | 대안적 학습 | 별도 직접 판면 미확인 | INSUFFICIENT | REQUIRES_SEPARATE_DIRECT_SUPPORT |
| `ANNUAL_RESOURCE_SUPPORT_LEARNING` | 정인 | 지원·학습 | 별도 직접 판면 미확인 | INSUFFICIENT | REQUIRES_SEPARATE_DIRECT_SUPPORT |

위 **2개 REPLACE는 기존 현대식 의미의 승인·변경 명령이 아닙니다.** 정확히 증명된 identity만을 향후 successor 후보로 제시하는 **Research 판정**입니다. 남은 8개는 별도의 정확한 십신 고전 직접 증거까지 `REQUIRES_SEPARATE_DIRECT_SUPPORT`를 유지합니다.

기존 `themeDispositions`의 10/10 미해결은 *현대식 테마의 기존 권한 게이트*를 나타내고, `currentThemeSemanticAdjudication.decisions`의 2/10 `REPLACE`는 **현재 두 직접 판면 identity에 한한 successor 연구 판정**입니다. 서로 별개의 축이며 기존 후보를 자동 변경하거나 Product/Bridge 권한을 열지 않습니다.

### 9.3 각 항목의 독립 판단 필드

개별 decision은 다음을 명시합니다.

```text
semanticKey / currentClaim / sourceRefs / sourceStatement
interpretiveReading / researchInference / preconditions / meaningStrength
qualifiers / exceptions / counterexamples / schoolDependencies
nonImplications / sourceSupportGrade / identitySourceSupportGrade
semanticDisposition / originalModernMeaningGate / unresolvedEvidence
```

**공통 전제:** 출생 일간과 목표 연운의 천간이 모두 특정되어야 하며, 방향을 보존하는 governed 십신 관계표가 필요합니다. 값의 누락·모호성에는 fail closed합니다.

**예외·반례:** `庚年剋甲日`의 편관과 `甲日剋戊年`의 편재는 교환할 수 없습니다. 또한 편관이란 관계가 확인되더라도 해당 해의 직무 압박이나 사고가 필연적으로 일어나지 않고, 편재 identity가 확인되어도 외부 자원이나 재물 성과를 보증하지 않습니다. 십신 학파·문헌에 따른 추가 결과 규정은 별도 직접 증거가 필요합니다.

**미해결 근거:** 각 현대 의미의 구체적 원문과 연운 범위, 두 예문 외 나머지 8개 십신의 exact witness, 전통 십신 taxonomy의 별도 governance, 학파별 조건과 반례.

### 9.4 허용되지 않는 확대 및 다음 단계

`relation_identity_only`는 직업 성과·경쟁·생산·학습·재물 변화·인간관계·건강·사고·길흉 점수·특정 시기 사건을 승인하지 않습니다. 출생 원국의 방법론을 연운으로 무단 상속하거나 연운 해석을 월운으로 전용하지 않습니다.

이 판정으로 Engine, Preview, Official Reading, Production, Bridge 재진입 권한은 **전부 HOLD**입니다. 실제 `general-annual-reading-candidate.ts` 규칙·상품 후보·의미 문구는 변경하지 않았습니다.

이후 **SA-7D-A4 지지충 4종 독립 연구**를 포함한 #2386의 모든 미해결 증거를 확인하고, 가능하다면 별도 Bridge 재심사 자격만 판단합니다. 절대 Production 승격을 의미하지 않습니다.
