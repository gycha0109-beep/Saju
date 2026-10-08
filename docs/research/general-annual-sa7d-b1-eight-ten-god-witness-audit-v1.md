# SA-7D-B1 — 연운 십신 8종 원전 검증: 판본 후보와 직접 근거 미충족 기록

> Track: `saju-research` · 기존 SA-7D 반환 [#2425](https://github.com/gycha0109-beep/Saju/pull/2425) 참조 · Production **HOLD**

## 1. 범위 / 작업 원칙

기존 [SA-7D-A](./general-annual-sa7d-return-evidence-v1.md)는 『三命通會』 卷之二下 `論太歲`의 명대 직판 PDF 25쪽에서 **편관과 편재**에 관한 *연간 천간↔출생 일간* identity 예문 두 개만 직접 검증했다.

B1의 대상은 그 외 여덟 종류 **비견·겁재·식신·상관·정재·정관·편인·정인**이다. 이 단계는 기존 Research 판정값을 변형하거나 기존 14규칙의 실행 의미를 변경하지 않는다.

**검증 등급을 세 층으로 분리한다.**

- **L0 — 현대 게시 전사/목록:** 고전 텍스트 검색과 스캔 후보 위치 찾기에만 사용. 원전 판면 인증 아님.
- **L1 — 고전 직접 판면:** 특정 서지 객체를 내려받아 해시를 검증하고 실제 PDF 페이지에서 구절과 관계 방향을 육안 확인해야 해당 구절에만 적용.
- **L2 — Annual 명제 범위:** 원문이 *연간 천간과 출생 일간*의 정확한 관계를 명시하는지, 출생 명식에 한정된 설명인지 별도 평가. **L1 통과만으로 L2 통과 불가.**

## 2. 새로 확인한 권5 원전 경로

**판본 후보:** 萬民英 『三命通會』 명 만력[1573–1620] 刻本, 중국 국가도서관 소장. Wikimedia Commons에 **제9책 / 卷之五上**, PDF 45쪽, 약 13.38 MB로 서지 등록되어 있다.

- 서지/직접 스캔 후보: https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67240_三命通會_第9冊.pdf
- 해당 부분의 원문 전사 검색 단서: https://zh.wikisource.org/zh-hant/三命通會/卷五
- 목표 절: `論古人立印食官財名義`

**이번 B1에서 실제 PDF 바이너리 취득·SHA-1/256 검증, 목표 절의 정확한 PDF 쪽수 확인, 판면 육안검증은 완료되지 않았다.** 서지의 `卷之五上` 정보와 현대 전사 텍스트만 확인했으므로 모든 개별 명제의 **직접 판면 증거 = 미확보**다. 기존 편관·편재의 卷二 직판 검증과 혼동하지 않는다.

현대 전사에는 일간 기준의 기본 프레임 `生我者壬癸水，我生者丙丁火，克我者庚辛金，我克者戊己土`, 예시 `甲食丙、乙食丁` 및 `甲見辛為正官`이 있다. 이는 *출생 일간 중심의 전통 분류*를 검토할 위치를 제공하지만, 그 절 자체가 올해의 해당 천간을 대상으로 적용된다는 뜻은 아니다.

## 3. 여덟 독립 판정

| 기존 Annual key (줄임) | 목표 십신 | 검토용 日干→비교간 | 확인된 전사 구절의 범위 | 직접 Annual 신분 |
|---|---|---|---|---|
| `ANNUAL_PEER_SELF_DIRECTION` | 비견 | 甲→甲 | 甲乙 목·음양 일간 프레임, 비견 명칭 직접 짝지음 없음 | INSUFFICIENT |
| `ANNUAL_PEER_COMPETITION_COORDINATION` | 겁재 | 甲→乙 | 같은 오행·상반 음양 구조, 겁재 명칭 직접 짝지음 없음 | INSUFFICIENT |
| `ANNUAL_OUTPUT_STEADY_PRODUCTION` | 식신 | 甲→丙 | `甲食丙` natal 食 관계 예문 | INSUFFICIENT |
| `ANNUAL_OUTPUT_EXPRESSION_CHANGE` | 상관 | 甲→丁 | `以丁能傷官` natal 傷官 관련 문맥 | INSUFFICIENT |
| `ANNUAL_WEALTH_STRUCTURED_RESOURCES` | 정재 | 甲→己 | `甲見己為正妻` 고전 비유. 본문 표현은 **正財가 아닌 正妻** | INSUFFICIENT |
| `ANNUAL_OFFICER_ROLE_RESPONSIBILITY` | 정관 | 甲→辛 | `甲見辛為正官` 전사에 명시적 명칭 있음. **정확한 직판 쪽수 미확보** | INSUFFICIENT |
| `ANNUAL_RESOURCE_ALTERNATIVE_LEARNING` | 편인 | 甲→壬 | `生我者壬癸水` 그룹 설명, 편인 별도 이름의 대응 근거 없음 | INSUFFICIENT |
| `ANNUAL_RESOURCE_SUPPORT_LEARNING` | 정인 | 甲→癸 | `生我者壬癸水` 그룹 설명, 정인 별도 이름의 대응 근거 없음 | INSUFFICIENT |

위 비교간은 **추가 검증을 위한 추적 가설**이며, 원문이 이미 여덟 명칭을 열거했다거나 연간 천간에 적용을 직접 선언했다는 의미가 아니다. 또한 `甲` 한 일간의 예시를 모든 일간·음양 관계에 자동 일반화하지 않는다.

## 4. 후속 확보 요건

1. `NLC892-411999029701-67240` **원본**과 허용된 상호 대조 판본을 확보하고 해시·권차·절·PDF 페이지를 기록한다.
2. 대상 8종의 **정확한 십신 명칭 + 오행 생극 방향 + 음양 동이**를 구절별로 검증한다. 전사에 명칭이 없는 항목은 독립 고전 근거를 찾거나 미확보로 유지한다.
3. 출생 일간/출생 명식의 서술이 **연간 천간에 적용되는 전통적 범위**까지 허용하는지 독립 판면 검증한다. 단순 응용 추정은 연구 해석으로만 표시한다.
4. 학교별 용어차·반례·조건을 검토하고, 결론은 최소 `relation_identity_only`의 한계를 넘지 않도록 한다. 현대적 성격/직장/재물/학습 등의 Annual 테마는 별도 B2 연구다.
5. 여덟 개별 `sourceSupportGrade`는 모두 **INSUFFICIENT**, 직접 판면 0건, 직접 Annual 신분 0건으로 현재 정직하게 보류한다.

## 5. 계약/테스트와 종료 기준

Research 파일: `src/research/general-annual-sa7d-b1-ten-god-witness-audit.ts`. 검증: `test/general-annual-sa7d-b1-ten-god-witness-audit.test.ts`.

기존 acquisition/return 해시를 **입력으로만 참조**하며, 새 도메인 권한 등록소를 만들지 않는다. 변화된 선행 소스 해시와 8개 대상이 불일치하면 fail-closed한다. CI/Integration은 기존 저장소 절차만 사용한다.

- **A. 원전·전사·스캔 후보 추적 및 8개 독립판정:** 코드/문서 구현.
- **B. 명대 직판 정확한 판면 대조 및 Annual 직접 증거:** 아직 미완료.
- **C. Bridge/Engine/Official Reading/Production 승인:** 허가하지 않음. `bridgeReentryReady=false`, `Production=HOLD`, Annual→Monthly 불허.

기존 #2386의 Closed 상태, #2425 병합 상태를 신규 전통 의미의 승인으로 해석하지 않는다.

## 6. 2026-10-09 원본 재취득 실행 및 차단 증거 (L0 유지)

- 실행 브랜치: `research/saju-research/sa7d-b1-volume5-scan`
- 실행 커밋: `975a2e1d32530975a23884bf5821a8f6f32926a0`
- 실제 실행: [GitHub Actions #37801081281](https://github.com/gycha0109-beep/Saju/actions/runs/37801081281) (실패 종료)
- 실행 증거 아티팩트: `sa7d-b1-volume5-original-proof`, ID `11561235665`. 실패 manifest만 생성됨. **PDF/판면 이미지 아티팩트 아님.**
- 취득 대상: `NLC892-411999029701-67240 三命通會 第9冊.pdf`; Wikimedia Commons 원본 URL의 `/wikipedia/commons/8/8f/` 경로는 공개 검색과 일치함.
- 차단: GitHub runner의 원본 GET 두 번 모두 HTTP `429 Too Many Requests`; 최종 `DOWNLOAD_FAILED`, `SCAN_FAILED`, exit 1. 소요 약 25초. HTTP 429를 원본 부재나 판본 불일치로 해석하지 않음.
- 외부 PDF 서지: [Commons 파일 목록](https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67240_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83_%E7%AC%AC9%E5%86%8A.pdf)의 **45쪽 / 13.38MB / 卷之五上** 정보만 다시 확인. 실제 다운로드 바이트, 파일 SHA-1/256, 목표 절 PDF index는 미확보.
- 별도 위치 단서: [중국 국가도서관 계열 전사](https://www.shidianguji.com/zh/book/NGJ89241199902970167139/chapter/1lvorfakpmlnt)에 `論古人立印食、官財名義`, `論正官`, `論倒食` 등의 텍스트가 검색됨. `甲見辛`은 정관, `甲食丙`은 식신 관련, `甲見壬`은 도식/편인 관련 **L0 검색 단서**에 한정함. 전사/OCR의 오자 가능성과 PDF 상·하권 위치 불명은 별도로 검증해야 함.
- 검증되지 않은 대안 판본은 별도 witness로 기록해야 하며 Commons 제9책과 동일 바이트 객체라고 가정하지 않음.

**재개 조건:** 단순히 동일 URL을 즉시 반복 호출하지 말고, 429 제한이 해소됐다는 근거가 있거나 같은 원본 스캔 객체의 공개 배포 경로를 확정할 때만 일회성 취득을 재개한다. 실제 바이너리 확보 → Commons SHA-1/크기 대조 → SHA-256 및 45쪽 구조 검증 → 원문 판면과 두 방향 천간 문맥 직접 대조 → 독립 Annual 범위 검증 순서를 준수한다. 증거 확보 전 기존 연구 코드·테스트·14종 A3/A4 판정·8종 `INSUFFICIENT`는 변경하지 않는다. `bridgeReentryReady=false`, `Production=HOLD`를 유지한다.

## 7. 보충 판면 증거 입증 상태 (2026-10-09)

같은 독립 원전의 2개 판본 스캔 식별자만으로 그 판본의 **실제 인쇄 판면**을 Commons 공식 PDF 파생 이미지로 34쪽(제9책 6쪽 + 제10책 28쪽) 취득·대조하였다. 원본 PDF 바이너리를 로컬에서 다운로드하여 SHA를 검증한 것은 아니므로 "원본 PDF 원본 해시 검증 완료"라고 보고하지 않는다.

- 제9책(卷之五上): `general-annual-sa7d-b1-ming-volume5-page-preview-witness-v1.md`에서 `甲→辛 正官` L1 확인.
- 제10책(卷之五下): `general-annual-sa7d-b1-ming-volume5-lower-four-l1-witness-audit-v1.md`에서 `甲→丙 食神`, `甲→丁 傷官`, `甲→壬 偏印` L1 확인.
- **직접 인쇄본 일간-십신 명칭 L1: 4/8**; 나머지 比肩, 劫財, 正財, 正印은 인쇄본 짝별 명칭 미확보.
- **유년 천간 직접 증거 L2: 0/8.** Annual `sourceSupportGrade=INSUFFICIENT` 8/8, `bridgeReentryReady=false`, `Production=HOLD`.
- 기존 TypeScript `general-annual-sa7d-b1-ten-god-witness-audit.ts`는 **이 보충 판면 증거 취득 이전의 B1 v1 감사 스냅샷**이다. 그 문서 내 `primaryScanPageVerified: false` 같은 기존 스냅샷 속성은 보충 문서의 새 L1 판독 결과와 별도로 취급한다. 이 기록은 엔진 승인, 현대 테마, Annual 의미론 승격을 의미하지 않는다.
- 임시 PDF 취득/페이지 미리보기 스크립트·일회성 GitHub Actions workflow는 연구 브랜치에서만 사용하고, 본 보충 문서의 정리 PR에는 포함하지 않는다.

**종료:** A=4종 L1 검증 일부 PASS / B=전체 PDF 바이트, 4종 미확보, Annual L2 미확보 HOLD / C=권한 경계 보호 PASS.
  
## 8. 2026-10-09 제9책·제14책 추가 인쇄본 L1 (직전 4/8 스냅샷 뒤의 최신 상태)

- 원전 직접 판면: 第9冊 卷五上 PDF 32쪽 `論正財`: `正財者乃甲見己乙見戊之例`. **甲→己 正財**를 직접 확인.
- 원전 직접 판면: 第14冊 卷七下 PDF 46쪽 `論六親`: `六甲生人以癸水爲母癸爲正印如遇己土正財`. **甲→癸 正印** 직접 확인; 정재 짝 독립 교차 확인.
- 정확한 PDF 인덱스, 원본 식별자, JPEG SHA-256, 실행·아티팩트, 판독 한계 및 `甲→乙 劫財/敗財` 사조 간 용어 차이는 `general-annual-sa7d-b1-ming-six-l1-and-school-label-audit-v1.md` 참고.
- 최신 합산: Ming 직접 인쇄본 개별 **L1 6/8**, 비견·겁재 **L1 미확보**, 유년 직접 **L2 0/8**, Annual `INSUFFICIENT` **8/8**, `bridgeReentryReady=false`, `Production=HOLD`.
- `src/research/general-annual-sa7d-b1-ten-god-witness-audit.ts`는 이전 증거 시점의 v1 snapshot. 이번 추가 인쇄본은 연구용 감사 보충자료이며 의미론 승격이나 v1의 임의 변경 근거가 아니다.

## 9. 2026-10-09 刻京臺增補淵海子平大全 별도 명대 판본: 비견 7/8, 劫財/敗財 분리

- 명대 직접 인쇄 원전 `NLC892-2642-210288` 第2冊 卷三 **PDF 17쪽** `論兄弟姊妹`: `比肩者兄弟也且如甲見甲爲兄`. `甲→甲 比肩` 일간 L1 추가 확인.
- 같은 고전 인쇄본 **PDF 10쪽** `論劫財`는 `五陽見五陰爲敗財`, `五陰見五陽爲劫財`를 구분. `甲→乙 劫財`를 확정하는 쌍별 문장은 미확인. `敗財`를 `劫財`로 조용히 치환 금지.
- 원본 PDF 실제 바이트 취득과 전체 SHA-1/SHA-256 검증 미완료; 공식 PDF 파생 판면 JPEG 개별 SHA-256 확인. 판본·원문·쪽수·해시·실행 artifact·용어 충돌의 분리 증거는 `general-annual-sa7d-b1-yuanhai-ming-printed-bijian-and-term-split-v1.md` 참고.
- **최신 L1 직접 원전 7/8, 현대 타깃 `甲→乙 劫財` 1/8 미충족.** 원전 Annual 적용 L2 **0/8**, 8개 Annual `sourceSupportGrade=INSUFFICIENT`, `bridgeReentryReady=false`, `Production=HOLD`. 기존 A2의 2개 독립 직접 증거에는 영향 없음.

## 10. 2026-10-09 歲運 일반 방법의 명대 판면 대조 (개별 연운 신분과 분리)

- 『刻京臺增補淵海子平大全』 명대 제2책 PDF **15·16쪽** `六親總篇`에서 일간을 기준으로 육친 관계를 설명하고 `此必以歲運見何字則剋何人`으로 판정 대상 시기를 연결하는 **일반 歲運 방법 문맥을 직접 대조**했다.
- 구체적인 직접 JPEG·PDF 인덱스·SHA-256·Commons 서지와 재현 URL·기존 `劫財/敗財` 충돌의 개별 분리는 `general-annual-sa7d-b1-ming-yuanhai-suiyun-method-witness-v1.md` 참고.
- `歲運`은 대운·유년을 혼합하는 일반 범위이므로, 명칭 L1 7/8 + 일반 歲運 문장만으로 8종의 개별 `日干×流年天干→十神` L2를 조합·자동 승격해서는 안 된다.
- 결과 **L1 7/8, 신규 대상의 L2 0/8, Annual `INSUFFICIENT` 8/8, `bridgeReentryReady=false`, `Production=HOLD`**. 2건의 기존 A2 개별 연운 직접 명칭은 보존.
- 전사문 `基礎`의 `甲見乙：劫財、敗財`는 직접 명대 제본 판면과 아직 결속되지 않은 L0 단서; 같은 인쇄본 `論劫財`의 방향별 구분을 덮어쓰지 않는다.

## 11. 2026-10-09 명대 직접 판면: 流歲 천간 입력 + 甲乙 복합 용어 검증

- 『三命通會』 명 만력 간본 **제19책 권10상 PDF 2쪽 `看命口訣`**에서 `流歲取天干`, `日取天干`, `年取天干`, `大運取支神`, `年為本日為主`를 직접 확인. **특정 유년 천간을 살피는 원전 방법 범위 확인**이지만, 8개 십신의 각 개별 연운 명칭을 확정하는 직접 증거는 아님.
- 별개 『刻京臺增補淵海子平大全』 명대 **제1책 PDF 10쪽 `天干五陽通變`**에서 `甲` 기준 `乙`에 `爲劫財敗財`의 **복합 명칭 원전 판면**을 직접 확인. 같은 인쇄 서명 제2책 PDF 10쪽 `論劫財`의 `五陽見五陰爲敗財` / `五陰見五陽爲劫財` 세부 규칙과 구분하여 기록.
- 원본 서지 ID, PDF zero/one 인덱스, 파생 JPEG SHA-256, 14쪽의 실제 수신·검사 로그, 실행 ID 및 엄격한 Level/권한 판정은 `general-annual-sa7d-b1-ming-printed-annual-stem-and-jiecai-baicai-composite-witness-v1.md`에서 추적.
- 새 사실: `METHOD_SCOPE_L1_PRINT_VERIFIED` 및 `L1_GROUPED_HISTORICAL_TERMINOLOGY=VERIFIED`. **불변:** 독립적 `甲→乙 劫財` 명칭 미해결, 대상의 정확한 개별 `甲日×流年天干→十神` L2 **0/8**, Annual `INSUFFICIENT` **8/8**, `bridgeReentryReady=false`, `Production=HOLD`.

## 12. 2026-10-09 1935년 『千里命稿』 전사·실제 소장본 동일성 확인 보류

- 『千里命稿』 `比劫祿刃篇` 온라인 전사에서 `甲日遇乙…故乙為甲之劫財` 단일 현대 명칭 **텍스트 단서 L0**를 확인. 명대 『淵海子平』의 `劫財敗財` 복합 명칭 및 `敗財` 방향 규칙과 **판본·시대가 다른 자료**이므로 자동 병합 금지.
- NLC `NLC416-01jh000372-10197` **民國24[1935]** 서명 `千里命稿` 직접 파생 인쇄 JPEG **22쪽**(전반 6, 중간 8, 후반 8) 시각 감사 및 **22/22 SHA-256 PASS**. 확인한 표제 `千里命稿 第一集`, 서문·명례·권말 안내와 전사 `比劫祿刃篇` 사이의 **동일 인쇄판 본문 결속은 미성립**.
- 표본 22/123으로 책 전체의 구절 부재는 주장하지 않음. 원본 PDF 전체 다운로드/검증도 미수행.
- PDF 정확한 쪽·실물 서지·직접 이미지 실행/아티팩트·허용된 사실·불허 사실은 `general-annual-sa7d-b1-qianli-1935-edition-binding-audit-v1.md`에 별도 기록.
- **불변:** 명대 일간 십신 독립 인쇄 L1 **7/8**, 甲乙 단독 劫財 L1 **未BOUND**, 개별 연운 L2 **0/8**, Annual `INSUFFICIENT` **8/8**, `bridgeReentryReady=false`, `Production=HOLD`.

## 13. 2026-10-09 1935년 직접 연운 개별 정관 사례 — 이 문서 이후 최신 L2 1/8

- 별도 소장 『千里命稿 第一集』(1935) `NLC416-17jh002565-109431` (124 PDF쪽)의 **PDF 67쪽 / 인쇄 64쪽**: `夫甲木日元`, `干透辛金正官`, `四十七歲辛亥年又屬正官之鄉`이 같은 실물 인쇄 페이지에 나타남.
- 이 자료는 표본 22쪽만 조사했던 **다른 소장본** `NLC416-01jh000372-10197` (123쪽)과 별도 PDF 원본 객체. 새 소장본의 직접 인쇄 페이지를 이전 소장본의 특정 페이지로 잘못 인용하면 안 된다.
- 정확한 원본 ID·PDF 인덱스·직접 JPEG SHA-256·실행 아티팩트·문맥 결합과 사용 범위: `general-annual-sa7d-b1-1935-george-v-exact-annual-zhengguan-l2-v1.md`.
- **신규 연구 근거의 증분:** 명대 일간 십신 독립 이름 `L1=7/8` **유지**. 신규 후보 중 **`甲日×辛亥流年→正官`의 인쇄 직접 용례 `L2=1/8`** 확보. 위쪽 보충문서의 0/8은 *기존 조사 당시의 기록*임을 명시.
- **제품 의미론과 별개:** 특정 명례의 `正官之鄉`을 `ANNUAL_OFFICER_ROLE_RESPONSIBILITY` 현대 테마, 사건 예측, 모든 辛년의 보편 규칙으로 치환 금지. 8종의 Annual `sourceSupportGrade=INSUFFICIENT`, `bridgeReentryReady=false`, `Production=HOLD`. 기존 A2의 2개 별도 `甲日×庚/戊年` 직접 사례 유지.
