# SA-7D-B1-R8 — 『子平真詮』 인쇄본 판면·서지·파일 무결성 독립 재감사 v1

> 2026-10-09 · Watchtower-Track: `saju-research` · **인쇄 페이지 시각 재확인 PASS / 원본 PDF 전체 SHA 검증 HOLD**. 역사적 직접 십신 이름 검증과 파일 전송 무결성 검증을 분리. Annual `sourceSupportGrade=INSUFFICIENT` 8/8, `bridgeReentryReady=false`, `Production=HOLD`.

## 1. 확인 경로와 증거 구분

| 검증 항목 | 이번 R8 결과 | 출처 |
|---|---|---|
| 파일 실재·소장 식별자 | **PASS**. 國家圖書館(NLC) `NLC416-11jh010455-35296`, 서명 `子平真詮`, 저작자 표시 `沈孝瞻編輯`, 발행 표기 `世界圖書館[發行者]` | [Wikimedia Commons 원본 서지 페이지](https://commons.wikimedia.org/wiki/File:NLC416-11jh010455-35296_子平真詮.pdf) |
| 매체 페이지 수 | **PASS**. 원본 PDF 렌더는 **287 PDF pages**, 이미지 기반. 서지의 `載體形態 126頁`은 별도의 실물 도서 정보이므로 287 PDF pages와 **동일한 실제 인쇄쪽수라고 할 수 없음** | 위 Commons 서지. 실제 PDF 링크 [원본 미리보기](https://upload.wikimedia.org/wikipedia/commons/f/fe/NLC416-11jh010455-35296_%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%A9%AE.pdf) |
| 시대/연도 귀속 | **LIMITED**. `Publication date [19--?]`; `民國時期文獻` 분류. **정확 출판연도 미상**, 청대 原刻 및 명대 인쇄본의 전사 동일판이라고 확정 불가 | 위 Commons 서지 |
| `甲逢乙為劫財` 판면 직접 대조 | **PASS — visual independent reread**. 공식 PDF **page index 17 (zero-based), PDF p18 (one-based), 인쇄면 九(9쪽)**에서 「論十干配合性情」 본문 내 `甲逢乙為劫財` 명명구 직접 확인 | [같은 287쪽 PDF](https://upload.wikimedia.org/wikipedia/commons/f/fe/NLC416-11jh010455-35296_%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%A9%AE.pdf), PDF p18. 기존 R7 `sa7d-b1-r7-ziping-zhenquan-later-printed-jia-yi-jiecai-direct-l1-v1.md`와 독립 재검토 |
| 원본 PDF 바이너리 SHA-256/SHA-1 | **HOLD**. 컨테이너 원본 다운로드는 접속 오류로 **실패**했고, 로컬 PDF 원본 전체 파일을 수령하지 못함. 정확한 SHA를 기록·검증했다고 주장하지 않음 | Commons URL을 통한 PDF 페이지 렌더/텍스트 증거와 전체 원본 binary verification을 **명시적으로 분리** |
| 출력 이미지 파생물 SHA-256 | **HOLD**. 이번 R8에서 공식 PDF 이미지 한 장을 독립 파일로 저장하고 SHA를 계산하지 않았음. 단순 PDF 웹 스크린샷 노출 ≠ 원본 PDF digest 검증 | 향후 최소 한 페이지만 derivative image로 취득하여 byte hash를 별도로 남길 수 있으나 본 단계에서는 미실시 |

## 2. 역사적 명칭 범위에 따른 집계

- **명대 刻本 한정:** `MING_PRINT_L1_EXACT=7/8`. 『淵海子平』 명대 판본 `甲→乙 劫財敗財` 그룹과 `五陽見五陰為敗財`의 방향별 명칭을 **정확하게 보존**한다.
- **시대·저본 구분한 직접 인쇄 이름의 존재:** `CROSS_EDITION_PRINT_L1_EXACT=8/8` (R7에서 신설한 별도 연구 지표). 해당 특정 인쇄본 『子平真詮』의 甲→乙 단독 劫財가 실물 판면에 있다.
- **역사적 특정 甲日 × 乙流年 명칭:** **직접 L2-C 여전히 없음**. 본문은 十干配合의 일반 명칭이지 `乙流年` 명례가 아니다.
- **B1 역사적 개별 甲일간 유년 전체:** `ANNUAL_PRINT_L2_C=1/8` 불변(『千里命稿 第一集』 1935 甲日辛亥年 정관).
- **실제 상품 Annual 의미:** `sourceSupportGrade=INSUFFICIENT` 8/8, `bridgeReentryReady=false`, `Production=HOLD`; 역사자료는 예측적 인과나 승진·재산 등 현대 생활 결과의 실증이 아니다.

## 3. 무결성 게이트를 해결하기 위한 조건

**직접 인쇄 글자 확인과 바이너리 해시 검증은 독립적으로 추적한다.**

향후 PDF 바이너리 접근 가능한 실행 환경에서 **(i)** Wikimedia 공식 파일 객체의 원본 다운로드, **(ii)** 전체 바이트 길이 기록, **(iii)** 로컬 SHA-256/SHA-1 직접 산출, **(iv)** 서지 API가 노출하는 원본 hash가 있으면 별도 열에 `declared`로 명시, **(v)** PDF p18 판면 렌더 원문 재확인, **(vi)** 사용한 URL과 취득 날짜/원본 revisionId 기록을 수행. 전체 원본 SHA를 구하지 못한 상태에서는 `originalPdfBinaryVerified=false` 유지.

**A:** 독립 인쇄 문자·쪽수·NLC archive object **PASS**. **B:** 실제 원본 PDF 전체 해시/정확 발행연도·편집본 원형 교감 **HOLD**. **C:** `docs/research/`만 변경, 원전 이름→연운/제품 의미 권한 자동 승격 **0건**, CI 새 실행 **0건 PASS**.
