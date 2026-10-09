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
