# SA-7D-B1-R2 — 劫財·敗財 역사적 명칭 대응 계약 v1

> Watchtower-Track: `saju-research` · **기존 십신/도메인 enum 또는 제품 계약을 바꾸지 않는 연구 전용 용어 계약**. `甲→乙` 단독 역사 명칭 L1-EXACT 미승격. `sourceSupportGrade=INSUFFICIENT`; `bridgeReentryReady=false`, `Production=HOLD`.

## 1. 무엇이 충돌하는가

**甲(陽木) 일간이 乙(陰木)을 보는 동일한 구조적 관계**에 대해 역사적 저본은 아래의 표현을 사용한다. `같은 관계`라는 역학적 정의와 `같은 단어`라는 역사적 명명은 **서로 다른 주장**이다.

| 구별할 문자 그대로의 주장 | 판본·출처 | 정확한 증거 층위 | 이 연구에서 허가되는 사용 |
|---|---|---|---|
| `甲`에 대한 `乙` 행: `爲劫財敗財` | 『刻京臺增補淵海子平大全』 明萬曆刻本 第1冊 PDF p10 `天干五陽通變` | **직접 인쇄 L1-GROUPED** | 역사적 집합 표기 `劫財敗財` *그대로* 기록 |
| `五陽見五陰爲敗財` | 같은 서명 明刻 第2冊 PDF p10 `論劫財` | **직접 인쇄 규칙·방향 구분** | 甲陽→乙陰 방향의 `敗財` 명명 규칙을 판본 한정으로 기록 |
| `五陰見五陽爲劫財` | 같은 서명 明刻 第2冊 PDF p10 | **직접 인쇄 규칙·방향 구분** | 역방향 `乙陰→甲陽` 쪽의 `劫財` 명명 규칙으로 별도 기록 |
| `甲日遇乙…故乙為甲之劫財` | 『千里命稿』 공개 이론편 `比劫祿刃篇` 전사 | **L0·전사 위치** (1935 원본 인쇄 페이지 未BOUND) | 근현대 단일명칭의 텍스트 단서; 원본 직접 L1 아님 |
| `甲日`에서 `乙`을 `敗財`라고 한 `十干生剋定名` | 『命理探源』 온라인 전사 | **L0·전사 위치** (해당 장 인쇄 p未BOUND) | 또 다른 저술의 이름 선택 단서. 1937 `推流年法` 원전 검증과 혼동 금지 |
| `甲→乙` 의 **현대 도메인 십신 라벨 `겁재`** | 현행 연구 후보(제품 코드 계약은 이 문서에서 변경 안 함) | **현재 비교 대상 명칭** | 검색·비교용 표준 라벨로 유지 가능하나 명대 원문에 단독 `劫財`가 인쇄되었다고 재기록 금지 |

**중요:** 明刻 제1책의 두 명칭을 함께 적은 문장과 제2책의 음양 방향 구분은 **둘 다 실제 인쇄 판면에서 확인**되었다. 하나가 다른 하나를 무효화한다는 증거는 없다. 서로 다른 장/서술 목적에 대한 `scope conflict`로 모델링해야 하며, 강제 동의어화해서는 안 된다.

## 2. 허용되는 대응 / 금지되는 대응

| 입력 주장 | 보존되어야 할 출력 | 금지되는 재해석 |
|---|---|---|
| 印刷: `甲` 기준 `乙`, `劫財敗財` | `historicalLiteral=劫財敗財`, `historicalCategory=GROUPED` | `historicalLiteral=劫財` 단독 변조 |
| 印刷: `五陽見五陰爲敗財` | `rule.direction=YANG_DAY_TO_YIN_PEER`, `label=敗財` | `甲見乙爲劫財` 인쇄 원문으로 치환 |
| 印刷: `五陰見五陽爲劫財` | `rule.direction=YIN_DAY_TO_YANG_PEER`, `label=劫財` | 양→음에도 단독 劫財를 해당 절이 사용했다고 주장 |
| 후대 온라인 전사의 `甲日遇乙` + `劫財` | `sourceModality=TRANSCRIPTION`, `printedPageVerified=false` | 시대·출처가 다른 明萬曆 판면에 출처 권위를 상속 |
| 현행 `甲→乙` B1 후보 라벨 `겁재` | `targetCanonicalName=겁재`, `historicalNamingStatus=DISPUTED` | `sourceSupportGrade` PASS 또는 Product 설명 생성 |

### 제안하는 연구 레코드의 필드 (스키마 확정/마이그레이션 아님)

```text
sourceWork / editionId / archiveObjectId / pdfPageOneBased
rawQuotedCharacters / glyphCertainty / language / sourceModality
dayStem / comparedStem / whichStemIsDay / dayPolarity / comparedPolarity
tenGodRawLabel / historicalNameKind: EXACT | GROUPED | DIRECTIONAL_RULE
historicalPeriod / contextScope: NATAL | LUCK_GENERAL | ANNUAL_EXACT
readerNormalizedModernLabel / normalizationProofRef (nullable)
printPageWitnessSha256 / originalPdfBinaryVerified
evidenceLevel / targetB1 / directAnnualIdentityVerified / productAuthorityGranted
```

`normalizationProofRef`가 없으면 검색용 `敗財`/ `劫財` 별칭은 **결과 탐색용**으로만 사용 가능하며 해석/증거 승격에는 사용하지 않는다. `sourceModality=TRANSCRIPTION`인 행은 인쇄 L1 승격 불허.

## 3. 지금 확정할 수 없는 것

1. 명대 전체 출판물에서 `劫財`가 양→음 관계에 **절대 사용되지 않았다**는 보편적 부정 명제. 이미 同書 복합 표가 있으므로 오히려 이런 단정은 위험.
2. 명대 `敗財`와 현대 `겁재`가 모든 판본·학파·맥락에서 언제나 동일 의미라는 동의어 명제.
3. 『千里命稿』 온라인 `比劫祿刃篇` 전사가 1935 『千里命稿 第一集』의 **동일 인쇄 페이지**에 실재한다는 명제. 123쪽 소장본 표본 검토는 일부만 이뤄짐.
4. `甲日×乙流年`을 `劫財`라고 직접 적은 인쇄본 L2-C. **확인되지 않음**.

## 4. 반례 중심 독립 수용 테스트 (문서용)

| 테스트 | 조건 | 기대 결과 |
|---|---|---|
| `N1` | 明刻 第1冊 p10 복합 `劫財敗財` 원문 | `L1-GROUPED` PASS, `L1-EXACT 甲乙 劫財` HOLD |
| `N2` | 明刻 第2冊 p10 양→음 방향 규칙 | `敗財` directional PASS, 단독 劫財 alias 자동변환 BLOCK |
| `N3` | 乙→甲 반대 방향 `劫財` 근거 | 방향 역전 오용 BLOCK |
| `N4` | 온라인 『千里命稿』 전사 `故乙為甲之劫財` | `L0`로 등록, 원본인쇄 증거 플래그 false |
| `N5` | `甲→乙`와 `流歲取天干`를 서로 조인 | derived-only `L2-D` 후보, `L2-C` 직접 사례 수 변화 **0** |
| `N6` | 명대 이름 논쟁에 결론이 나지 않았으나 현대 제품에서 `겁재` 요구 | B1 Annual `INSUFFICIENT`, Bridge/Production HOLD |

## 5. 후속 검증 대상과 완료 조건

- **P1-B 1차:** 정확한 저술명·년대가 확인되는 다른 전통/민국 판본에서 `甲見乙爲劫財` *단독 명칭*의 인쇄 위치 특정. 주석·현대적 표점·본문을 분리.
- **P1-B 2차:** 동일 판본 내 단독명/복합명/방향별 정의를 비교해 **이름 사용의 범위 조건**을 설명. 문헌 하나의 의미를 다른 저본 전체에 보편화 금지.
- **P1-B 3차:** `甲日 + 乙`이 실제 `流年/太歲` 문맥에 나타나는지 별도 검색. 일간 십신표와 유년 방법 규칙을 붙여 만든 `L2-D`는 직접 문장 `L2-C`와 독립.
- **검색 중단:** 인쇄 위치 없는 후대 전사를 반복 검증하지 않는다. 인쇄 후보 두 차례 좁히고 직접 문구가 없으면 `UNBOUND`로 기록 후 다음 후보로 전환.

**현재 결정:** 원전 명대 **L1-EXACT 7/8 유지**, `甲→乙 劫財`는 `L1-GROUPED`만 확인, 신규 `甲→乙` 개별 연운 **L2-C 미확인**. 제품용 `sourceSupportGrade=INSUFFICIENT` **8/8**, `bridgeReentryReady=false`, `Production=HOLD`. **코드·공식 enum·제품 UI 변경 0건**.

**종료조건 A:** 3종 역사적 이름 표시를 독립 증거로 구분한 판본별 계약 문서 PASS. **B:** 상호 동치와 개별 유년 단일 명칭 근거 불충분 — HOLD. **C:** Production·Bridge·기존 코드 무변경 PASS.
