# SA-7D-B1 — 明刻本 『三命通會』 卷之五下 십신 L1 추가 원전 검증

> 검증 유형: **Commons 공식 PDF 파생 페이지 이미지의 고전 판면 직접 판독(L1)**. Research-only 증거. 원본 PDF 바이너리 취득·전면 해시 대조 또는 流年/行年에 대한 의미 승인 아님.
>
> Watchtower-Track: `saju-research`. `bridgeReentryReady=false`; `Production=HOLD`; Annual→Monthly 불허.

## 1. 판본, 원본 파일·쪽 식별 및 재현 경로

- 본 스캔: `三命通會` 卷之五下, 明萬曆刻本, NLC `NLC892-411999029701-67241`, Commons 파일 `NLC892-411999029701-67241_三命通會_第10冊.pdf`.
- 출처: <https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67241_三命通會_第10冊.pdf>
- **Commons API가 선언한 원본** SHA-1 `27eacd1db50fd02be147e314f91eba47f7efbcfb`; 크기 16,119,019 bytes. *PDF 전체를 로컬에서 다운로드해 계산한 해시가 아님*. PDF 원본 SHA-256 미획득.
- 이미지는 Commons `action=query&prop=imageinfo`의 `iiurlwidth=960&iiurlparam=pageN`이 돌려준 원래 `thumb.wikimedia.org` 주소로 GET. 다운로드 JPEG 헤더/종단·Pillow verify·SHA-256은 각 GitHub Actions 매니페스트 및 다운로드 ZIP 바이트와 비교.
- 직판 이미지는 고전 원문 **직접 인쇄 판면의 파생본**이고 현대 전사문이 아니다. 다만 해상도가 약 960px이며 판독 불명 글자는 확정하지 않는다.

| 작업 | GitHub Actions | artifact ID | 실제 취득 PDF 페이지(1기반) | 수행 결과 |
|---|---|---:|---|---|
| 권5하 위치 탐색 | [#37810854311](https://github.com/gycha0109-beep/Saju/actions/runs/37810854311) | 11565560117 | 2, 15, 30, 45 | 성공 |
| 조항 내부 탐색 | [#37811062187](https://github.com/gycha0109-beep/Saju/actions/runs/37811062187) | 11564498336 | 6, 10, 22, 25, 28 | 성공 |
| 傷官 절 원본 확인 | [#37811413903](https://github.com/gycha0109-beep/Saju/actions/runs/37811413903) | 11564968141 | 17, 19, 20, 21, 23, 24, 31, 33 | 성공 |
| 倒食·偏印 절 탐색 | [#37811760174](https://github.com/gycha0109-beep/Saju/actions/runs/37811760174) | 11564868742 | 7, 11, 13, 16, 18, 34, 36, 39 | 성공 |
| 倒食 정확한 짝 검증 | [#37812019785](https://github.com/gycha0109-beep/Saju/actions/runs/37812019785) | 11565895584 | 9, 12, 14 | 성공 |

모든 25개 제10책 페이지 파생 JPEG의 실제 SHA-256이 매니페스트 기록과 일치함. `OFFICIAL_DERIVATIVE_IMAGES_ACQUIRED_UNREVIEWED`는 취득 스크립트의 보수적 *자동* 상태이며, 아래 수동 판면 판독만 별도 기록한다. 각 업무는 기존 복잡한 CI 대신 8분 상한 단일 연구 실행으로 완료됐다.

## 2. Ming print L1 — 개별 일간 쌍 정확히 증명되는 3종

| 일간→비교천간 | 본문에 실제 인쇄된 증거 | PDF page (1-based) | 파생 이미지 SHA-256 | 주어진 L1 한계 |
|---|---|---:|---|---|
| **甲→壬 偏印** | `論倒食` 및 `倒食即偏印之謂`, 이어 `今甲見壬為倒食者` | **12** | `[확인 필요]` | `倒食=偏印`과 `甲見壬=倒食`의 **문맥 결합**에 의한 일간 쌍 명칭. 年干 적용 언급 없음 |
| **甲→丁 傷官** | `論傷官`; `傷官者我生彼之謂乃甲見丁乙見丙之類` | **19** | `d00d5e1e62be6f8c3d13c264ad58f61c61df44b61362aaff15a80075a3d4e522` | 일간의 傷官 짝만 확인. 流年 천간 범위 별도 |
| **甲→丙 食神** | `論食神`; `食神者日干所生順數第三位乃甲食丙乙食丁之例` | **25** | `dec2fd70fd18311beef7d8d55dff64c8564a29c325cd381ed8de9dae14e79b2f` | 일간의 食神 짝만 확인. Annual 의미 미증명 |

기존 제9책(卷之五上, `NLC892-411999029701-67240`) PDF 3쪽 `甲見辛爲正官`, 5쪽 `正官者乃甲見辛乙見庚之例`에 의해 **甲→辛 正官**도 별개 원전 L1을 충족함. 자세한 해시·판면은 `general-annual-sa7d-b1-ming-volume5-page-preview-witness-v1.md` 참고.

## 3. 8종 개별 판정 (Annual authority 일괄 보류)

| 후보 | 명대 판본 일간 명칭 직접 판면 L1 | 流年 직접 적용 L2 | Annual sourceSupportGrade |
|---|---|---|---|
| 甲→甲 比肩 | 미확인 | 0 | **INSUFFICIENT** |
| 甲→乙 劫財 | 미확인 | 0 | **INSUFFICIENT** |
| 甲→丙 食神 | **확인: 제10책 25쪽** | 0 | **INSUFFICIENT** |
| 甲→丁 傷官 | **확인: 제10책 19쪽** | 0 | **INSUFFICIENT** |
| 甲→己 正財 | 미확인, `甲見己爲正妻`는 정재와 동일하지 않음 | 0 | **INSUFFICIENT** |
| 甲→辛 正官 | **확인: 제9책 3·5쪽** | 0 | **INSUFFICIENT** |
| 甲→壬 偏印 | **확인: 제10책 12쪽 `倒食=偏印` 결합** | 0 | **INSUFFICIENT** |
| 甲→癸 正印 | 미확인 | 0 | **INSUFFICIENT** |

**L1 판면 입증 4/8; Annual L2 0/8.** 본 `L1`은 기계적 연간 십신명 재분류·미래 사건·현대 테마를 승인하지 않는다. 권5하의 식신 및 상관 설명·편인 설명은 일간·출생 사주 격국과 연계된 문맥이므로 유년 (流年/行年/太歲) 관계를 도식만으로 잇지 않는다.

## 4. 검증 보류와 재개 계약

1. 아직 확보되지 않은 4종 `比肩, 劫財, 正財, 正印`은 각기 직접 짝 명칭이 인쇄된 다른 정확한 페이지·원전·판본을 찾아야 한다. 같은 천간/상생/정처 등의 설명만으로 승격 금지.
2. 확보된 4종 역시 **Annual 천간 적용 규칙을 직접 입증하는 별도 L2 원전 근거가 없으므로 `sourceSupportGrade='INSUFFICIENT'` 지속.**
3. Commons 원본 PDF SHA-1/size는 *API 선언 정보*만 있으며 바이너리 다운로드 검증은 여전히 미완료.
4. 영구 자동 CI가 아니라 일회성 연구 검증. `sa7d-b1-volume5-once.yml`을 **main에 병합하지 않도록** 정리해야 함.
5. 기존 `src/research/general-annual-sa7d-b1-ten-god-witness-audit.ts`는 **v1 스냅샷**으로서 Annual-grade 판정 변경 금지. L1 별도 보충 감사자료로 이 문서를 참조. 근거 없는 프로덕션 필드 수정 불허.

**종료조건: A=직판 페이지·해시 입증 4/8 L1 확인으로 연구 일부 PASS; B=원본 바이너리·Annual L2 및 4종 미해소 HOLD; C=Bridge/Production 미승격 PASS.**
