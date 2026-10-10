# SA-7D-B1-R6 — 甲→乙 劫財·敗財 역사 이름과 Natal 기존 연구 계약 교차 심사 v1

> 2026-10-09 · Watchtower-Track: `saju-research` · **문헌 이름 교차검증/기존 권한 침범 방지**. 코드/enum/Bridge/Engine/Reader/Official/Production 변경 또는 옛 판본의 명칭 등급 자동 승격 없음. `sourceSupportGrade=INSUFFICIENT` 8/8, `bridgeReentryReady=false`, `Production=HOLD`.

## 1. R5 미해결 사안에 새로운 후보가 발견되었는가

**그렇다. 하지만 증거 층위와 권한은 제한된다.** 이미 `main`의 Natal 연구에는 아래 두 개의 명시적 이력이 존재한다.

| 증거 항목 | 저장소 실제 계약 / 검증한 텍스트 | 정확히 주장 가능한 범위 | 절대 승인 불가 |
|---|---|---|---|
| **明刻 A: 그룹** | 『刻京臺增補淵海子平大全』 明萬曆 第1冊 p10 `甲→乙 爲劫財敗財` | 역사 원문 `劫財敗財` **복합** L1-GROUPED | 같은 p10에 독립 `甲逢乙爲劫財`만 인쇄됐다고 치환 |
| **明刻 B: 방향 규칙** | 同書 第2冊 p10 `五陽見五陰爲敗財`, `五陰見五陽爲劫財` | 甲陽→乙陰 `敗財` / 乙陰→甲陽 `劫財`의 **판본/절 한정** 규칙 | 동일한 단독 현대 겁재로 역사 용어 전면 소급 |
| **別著 C: 후대 단일 문장** | 『子平真詮/子平真詮評註』 「論十干配合性情」 전사 `甲逢乙為劫財`; [전사+평주](https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm), [별도 전사](https://tianjihq.com/zh-TW/learn/books/ziping-zhenquan/5) | **이 저술 전승의 문장 단위 L0 전사 일치**. 기존 Natal 연구도 exact 甲→乙 relation으로 **research-only** 관찰 | 해당 문장을 **명대 淵海印刷의 글자**, 혹은 **정확한 原刻 인쇄 L1**로 둔갑 |
| **現代 D: canonical 한자표기** | `src/research/general-natal-canonical-gyeopjae-hanja-label-bridge-authority.ts`: `겁재→劫財`, `manseryeok@2.0.0` upstream mapping을 명시 | **현행 canonical 한국어 라벨의 한자 어휘 대응**을 Natal `AUTHORIZED_RESEARCH_ONLY`로 보존 | 원전 명대 `敗財`가 劫財와 의미·이름 모두 동치임을 이 기술 매핑으로 증명 |

### 관련 실제 Source 파일과 엄격한 scope

1. `src/research/general-natal-jia-yi-jiecai-exact-relation-authority.ts`:
   - `sourceType:'classical_transcription_with_commentary'`, `sourceText:'甲逢乙為劫財'`, `visibleCounterpartStem:'을'`, `dayMaster:'갑'`.
   - `GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_DECISION='AUTHORIZED_RESEARCH_ONLY'`; 다른 日干, 年運, hidden-stem, 전체 명식 scan, production은 **허가 안 함**.
2. `src/research/general-natal-jiecai-bijie-context-terminology-observation-authority.ts`:
   - 동일 전승 다른 문맥 `劫財重重…制住比劫`; 오직 *문맥 내 병용* 관찰 `AUTHORIZED_OBSERVATION_ONLY`, 전역 별칭·subset ontology 금지.
3. `src/research/general-natal-canonical-gyeopjae-hanja-label-bridge-authority.ts`:
   - modern canonical `겁재→劫財` `lexicalProvenanceBridgeOnly:true`, `classicalSourceGeneralJiecaiResolverAuthorized:false`, `generalNatalProductionAuthority:'BLOCKED'`.
4. `src/research/general-natal-canonical-gyeopjae-bijie-category-member-authority.ts`:
   - Natal `比劫` 카테고리 관찰의 범위 한정 연구 허용만. Annual 이름 resolver가 아님.

**R6의 중요한 갱신:** “甲逢乙為劫財가 고전 전승 어디에도 없다”는 주장은 **금지**. 별도 후대 문헌 전사에는 명시된 표현이 있다. 그러나 **B1이 세는 명대 직접 단독 인쇄 명칭 L1=7/8은 불변**, 전사 모달리티를 직접 인쇄 L1로 조용히 승격하지 않는다.

## 2. 명칭 convention의 층위별 허용 상태

| 독립 의사결정 | 현 기준 | 소유권 및 남은 과제 |
|---|---|---|
| 현대 canonical 십신 한국어 `겁재`를 계산 후보로 표현 가능 | **YES** — `src/contracts/calculation.ts` TenGod에 이미 존재 | 코드 표현 능력. 새 연운 사용 허가 아님 |
| modern `겁재`에 劫財 한자 병기 | **Natal 어휘 연결 research-only YES** | annual/production 전면 사용 허가 아님 |
| 후대 전승에서 甲→乙를 劫財라 부른다는 서지·전사 근거 | **L0 verified transcription** | 『子平真詮』 **판본/본문 대 주석/原刻 판면**을 특정·대조한 뒤만 L1 승격 |
| 明刻 淵海本의 양→음 원문을 `劫財` 단독이라고 인용 | **NO** | `劫財敗財` 그룹과 `敗財` 방향 규칙 원문 보존 |
| 현대 `겁재`와 명대 `敗財`를 역사 전체에서 동의어화 | **HOLD** | 시대·판본·학파·쓰임새 별 명시된 versioned normalization policy와 편집권 심사 |
| 甲日×乙 유년 `劫財` 직접 사료 | **L2-C HOLD** | 실제 특정 유년 문맥을 포함한 정확 판면 필요 |
| 연운 `ANNUAL_PEER_COMPETITION_COORDINATION` 의미 승격 | **HOLD** | Annual-specific source statement/예외/반례/정책·review/trust 필요 |

## 3. 연구용 제안 규격 — 계약 코드 수정 아님

```text
modernCanonicalLabel = "겁재"                   // 현재 코드 타입의 어휘
modernHanjaLexicalLabel = "劫財"                // Natal research-only vocabulary bridge
historicalWitnesses = [
  {edition:"Ming/Yuanhai vol1 p10", rawLabel:"劫財敗財", kind:"GROUPED"},
  {edition:"Ming/Yuanhai vol2 p10", rawLabel:"敗財", kind:"YANG_TO_YIN_RULE"},
  {edition:"Ziping Zhenquan transmission", rawLabel:"劫財", kind:"TRANSCRIPTION", printBound:false}
]
namingPolicyVersion = null                     // 미승인
historicalEquivalentAcrossAllEditions = false // 미증명
annualDirectWitnessBound = false              // L2-C 없음
annualSemanticAuthority = false
```

이름 근거와 유년 의미 권한을 **동일 `sourceRef` 한 건**으로 포장하지 않는다.

## 4. 권한과 검증 판정

- **A — 증거:** Natal의 bounded `甲逢乙為劫財` 전사 사례 및 canonical 겁재→劫財 lexical bridge를 직접 파일에서 확인, 明刻의 그룹/방향 근거와 서로 분리: **PASS**.
- **B — 판본/연운:** 별도 『子平真詮』 정확 原刻 페이지, 현대/명대 전역 동의어 정책, 甲乙 개별 유년 인쇄 L2-C: **HOLD**.
- **C — 권한:** Natal `AUTHORIZED_RESEARCH_ONLY`와 `annual Production=HOLD` 독립 보존; 새 TypeScript·test·CI·Bridge/Engine 수정 **0건 PASS**.

**총계 불변:** *명대 인쇄 단독 이름* `L1 7/8`, 甲일간 특정 유년 인쇄 `L2-C 1/8`, Annual 8종 `sourceSupportGrade=INSUFFICIENT`, `bridgeReentryReady=false`, `Production=HOLD`.
