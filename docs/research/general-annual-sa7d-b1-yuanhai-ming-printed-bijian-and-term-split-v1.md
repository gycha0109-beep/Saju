# SA-7D-B1 — 明刻本 『刻京臺增補淵海子平大全』 比肩 직접 증거와 劫財·敗財 용어 경계

> Watchtower-Track: `saju-research` · **Research-only / annual authority = HOLD**. 제9·10·14책 『三命通會』 감사와 별개 판본이다. 이 문서는 직접 인쇄 판면 L1과 단순 전사 L0을 구분한다.

## 1. 엄격한 이본·판면 식별

- **서명:** `刻京臺增補淵海子平大全`, 明萬曆[1573–1620]刻本.
- **소장·PDF 식별:** 中國國家圖書館 NLC `NLC892-2642-210288`, **第2冊 卷之三**, Commons 서지 <https://commons.wikimedia.org/wiki/File:NLC892-2642-210288_刻京臺增補淵海子平大全_第2冊.pdf>.
- **Commons 선언 원본 SHA-1:** `f9f569b042743265255127344f7c44bbe6a1193a`, 원본 선언 크기 `8982462` 바이트, 30 PDF쪽. 이는 Commons **API 선언 값**이지 PDF 원본 로컬 바이트 해시 검증이 아니다.
- **취득 방식:** Commons `action=query&prop=imageinfo`가 반환한 PDF page-specific `thumburl`의 JPEG를 취득. 개별 이미지 SHA-256 검사 및 수동 판면 대조. PDF 원본 파일 다운로드는 실패/미수행, L2 Annual 의미 승인 근거 아님.

## 2. 확인된 비견 원전 L1 (甲→甲)

- **PDF 제2책 17쪽(1-based), zero-index 16**, 인쇄 절 `論兄弟姊妹` 내 `比肩者兄弟也且如甲見甲爲兄`.
- 앞의 **比肩** 선언과 뒤의 **甲見甲** 구체 짝을 같은 절의 같은 원전 판면에서 판독했으므로 **甲→甲 比肩**은 **고전의 일간 중심 명칭 L1**에 한해 충족.
- 파생 JPEG 원본 바이트 SHA-256: `f3447477d8c22567a93fc27172c9d606fc6b47e3ac5f5a497dc5d846c22c7208`.
- 확보 실행: [GitHub Actions #37823439706](https://github.com/gycha0109-beep/Saju/actions/runs/37823439706) artifact `11569972478`. 출처 원문 비교: <https://www.shidianguji.com/zh/book/SDZJ0626/chapter/1lctut1kn9cti>. 전사는 위치 비교용, **원전 판면 직접 검증은 위 JPEG와 인쇄 페이지 근거**.
- 이 직접 관계는 출생 명식의 형제·육친 논의이며, `甲` 일간에 대해 `甲` **유년 천간**을 직접 적용한다고 한 원전 L2가 아니다.

## 3. 劫財 / 敗財 이름의 판본 차이 — 甲→乙은 아직 불충족

- **同 책 第2冊 PDF 10쪽(1-based), zero-index 9** `論劫財`에서 `五陽見五陰爲敗財` vs `五陰見五陽爲劫財`라는 **명칭 방향 구분**을 판면에서 직접 확인. 일반 명칭 법칙은 `甲→乙` 명칭과 연결 가능한 단서일 뿐, 직접 `甲見乙爲劫財` 인쇄 구절의 대체가 아니다.
- 인쇄 파생 JPEG SHA-256: `c874546ab1f476b8432d1cc9ca38cbae562604eb84c8ac866c0de38656e8c49d`; [Actions #37823935731](https://github.com/gycha0109-beep/Saju/actions/runs/37823935731), artifact `11570427876`.
- 현행 후대 전사 『淵海子平大全』 `基礎`는 `見乙：為劫財、敗財`라고 **복수 명칭**을 함께 나열함: <https://zh.wikisource.org/zh-hant/淵海子平大全>. 다른 『淵海子平』 `論劫財` 전사는 `甲見乙爲敗財，乙見甲爲劫財`라는 음양 방향 차이를 제공함: <https://sajumania.com/ebook/to01-06/to01-06-02-13.htm>.
- 위 상충 표현을 섞어서 `甲→乙 劫財`에 원전 L1을 부여해서는 안 된다. `甲→乙 敗財`라는 **별도 학교/판본 naming hypothesis**를 기록하되, target `甲→乙 劫財`은 **INSUFFICIENT** 유지.
- 후속 연구에서는 판본의 표제·정확한 인쇄 문구와 현대 십신 라벨 간 대응 규칙을 각기 별도 증거로 증명해야 한다. 구조적 오행/음양 매핑만으로 이름을 바꾸지 않는다.

## 4. 새로운 8종 판정 (독립 일간 L1 vs Annual L2)

| 요청 대상 | Ming 직접 원전 일간 L1 | Annual 적용 L2 | 요청 Annual 신분 |
|---|---|---|---|
| **甲→甲 比肩** | **제2책 p17 확인** | 미확인 | **INSUFFICIENT** |
| **甲→乙 劫財** | **未確認**; 원전에서는 `敗財` 용어 분리 | 미확인 | **INSUFFICIENT** |
| 甲→丙 食神 | 『三命通會』 제10책 p25 | 미확인 | **INSUFFICIENT** |
| 甲→丁 傷官 | 『三命通會』 제10책 p19 | 미확인 | **INSUFFICIENT** |
| 甲→己 正財 | 『三命通會』 제9책 p32 및 제14책 p46 | 미확인 | **INSUFFICIENT** |
| 甲→辛 正官 | 『三命通會』 제9책 p3, p5 | 미확인 | **INSUFFICIENT** |
| 甲→壬 偏印 | 『三命通會』 제10책 p12 | 미확인 | **INSUFFICIENT** |
| 甲→癸 正印 | 『三命通會』 제14책 p46 | 미확인 | **INSUFFICIENT** |

**판면 L1 7/8**. **직접 유년 관계 L2 0/8**, Annual 8/8 `INSUFFICIENT`. **두 기존 A2 개별 직접 Annual 관계는 그대로 유지**. `bridgeReentryReady=false`, `Production=HOLD`, Annual→Monthly 금지.

### 증거 경계

이 문서는 별도 직접 판면 연구 반환이고, 기존 B1 v1 TypeScript snapshot의 과거 `primaryScanPageVerified=false` 항목을 소급 변경하지 않는다. 새 product/Official/Reader/Engine 해석이나 연운 테마 승격을 절대 허가하지 않는다. 임시 PDF 미리보기 GitHub Actions는 프로브 브랜치에서만 사용하고 clean PR에는 포함하지 않는다.

**종료조건:** A=일간 직접 판면 **7/8 부분 PASS**. B=劫財 명칭충돌·Annual L2=0/8·원본 PDF 로컬 바이트 검증 **HOLD**. C=Bridge/Production 차단 **PASS**.
