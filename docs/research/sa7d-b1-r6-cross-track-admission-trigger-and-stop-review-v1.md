# SA-7D-B1-R6 — Natal 명칭 교차증거·Temporal 기간 책임·Annual Bridge 재심사 트리거 v1

> Watchtower-Track: `saju-research` · 2026-10-09 · **Research evidence return, NOT authority admission**. `sourceSupportGrade='INSUFFICIENT'` Annual 8/8, `bridgeReentryReady=false`, `Production=HOLD`.

## 1. 이번 R6의 신규 사실과 변경되지 않은 사실

| 심사 항목 | R6 새로 확인한 사실 | 판정 |
|---|---|---|
| 甲→乙 명칭의 독립 근거 | `general-natal-jia-yi-jiecai-exact-relation-authority.ts`에 『子平真詮/評註』 **전사+주석** `甲逢乙為劫財`가 이미 Natal **research-only** 관계 증거로 등록됨. `general-natal-canonical-gyeopjae-hanja-label-bridge-authority.ts`에 `겁재→劫財` 어휘 매핑도 이미 **research-only**로 있음 | **판본/시대/모달리티 분리 PASS**, 명대 단독 L1·Annual L2·전역 동의어 **HOLD** |
| 60갑자 연운 기간 | `consumer-reading-request-adapter.ts`는 `Intl.DateTimeFormat(Asia/Seoul)`로 civil year를 고름. `temporal-reading-context.ts`는 `year-1984 mod 60`의 **정수 year-only** 60갑자를 산출. `annual-interpretation-facts.ts`는 받은 연간으로 현대 십신을 도출 | **현재 구현 역할 추적 PASS**, 전통 입춘 기간과 동일성·공식 정책 승인 **HOLD** |
| 현대 연구용 TenGod·테마 | `general-annual-reading-candidate.ts`의 十神 `TEN_GOD_THEME`는 `internal_research` source, `status:'research'`, heuristic/experimental/unreviewed | 코드 표현 존재 **PASS**, 역사·유년 현대의미 source authority **HOLD** |
| 기존 승격 게이트 | `general-annual-authority-bridge-review.ts`의 `RETURN_TO_RESEARCH`, `annualSpecificSourceAuthorityEstablished=false`; `general-annual-research-return-handoff.ts`에서 source completion은 **향후 Bridge 재검토 자격 검토만** 허용; `saju-engine-authority-intake.ts`에서 `RESEARCH_GAP`→`HOLD_RESEARCH`, `AUTHORITY_GAP`→`HOLD_AUTHORITY` | **현 권한 유지** |

**이번 R6 신규 원전 이미지 추출/인쇄 직증/기간 E2E 테스트는 0건.** B1 역사 집계: 명대 독립 이름 L1 **7/8**, 甲 특정 流年 단독 十神 직접 L2-C **1/8**, 현대 제품 의미 승인 **0/8**. R6의 `甲逢乙為劫財` 후대 전사 발견이 인쇄 L1이나 직접 연운 L2-C를 증가시키지 않는다.

## 2. 의사결정은 세 개의 독립 소유권으로 분리

### Owner-A: 십신 canonical/history label convention

**판정: 좁은 범위의 Natal source exact observation이 이미 존재하므로 동일 전사 재검색은 필요하지 않다.** 새로 필요한 것은

- 同 저술 『子平真詮』 중 정확한 편집/판본·原文/주석 구획, **실제 인쇄 페이지**의 직접 증거(후대 전사와 분리).
- `甲逢乙為劫財`의 **저술 전승 내부 명칭**과 明刻 『淵海子平』의 `劫財敗財`·`敗財`를 동일 역사적 문구로 소급하지 않는 **비교정책**.
- 현대 canonical `겁재`를 연운 TenGod 이름으로 사용할 경우 `conventionId`, 현대 라벨 출처, 해석에서의 역사 인용 제한을 버전으로 지정할 편집·계산 정책 소유자 승인.
- Natal `AUTHORIZED_RESEARCH_ONLY`를 Annual 계산/제품/역사 판면 L1로 자동 상속하지 않음.

**가용 결과:** naming decision *request artifact* (이 문서). **미허용:** 원전 direct L1 8/8 선언, Annual L2-C 甲乙 PASS, 기존 `TenGod` enum/엔진 변경.

### Owner-B: 시간·역법 연운 기간 정책

**판정: 실제 year-only 코드가 존재하므로 구현 부재가 아니라 서비스 정책의 의미와 경계에 대한 심사가 필요하다.**

- 지금의 `annualSexagenaryPillar(year)` 정수 연도 + Seoul civil request year를 선택한 목적이 **달력 연도별 보고**인지, 입춘 유효구간의 **시점별 운**인지 명세/UX 정책으로 확정.
- `referenceDateTime`가 立春 직전/직후에 있어도 `annualSexagenaryPillar(year)`에 반영되지 않는 현재 동작을 **요청 의도와 비교**. 정책이 civil calendar이면 이를 명시하고 전통 태세의 효력 기간과 구별; 정책이 solar-term이면 canonical solarTerm source, exact period boundaries, time-zone/DST 검증과 코드 owner 필요.
- 年干을 다루는 정확한 `periodPolicyId`/source version/interval`effectiveFrom/Until`(제안 필드)의 소유자·수용 테스트 및 누락 시 FAIL-CLOSED 계약 확정.
- Annual/Monthly가 같은 annual pillar year-only helper를 공유하므로 **Monthly로 의미/기간 권한 확장하지 않음**.

**가용 결과:** 정적 호출 경로 및 9개 구체 반례 테스트 설계. **미허용:** 입춘 기간 계산은 이미 통합됐다는 선언, 실행된 boundary test PASS, civil-year 현재 설계를 결함이라고 단정.

### Owner-C: Annual source qualification → Bridge/Engine trust

- **T-COMP:** 기존 modern TenGod 계산값 및 Natal 표기 어휘는 연구 데이터로 표현 가능. 단, 여기서 **official annual semantic meaning**이 나오지 않음.
- **T-HIST:** 해당 역사적 연운에서 실제 저술자가 그 십신명을 사용했다는 주장은 직접 인쇄 L2-C로만 카운트. 현재 1/8.
- **T-MEANING:** `ANNUAL_PEER_COMPETITION_COORDINATION`, `ANNUAL_OFFICER_ROLE_RESPONSIBILITY` 등 10개 modern semanticKey는 정확한 Annual-specific source+해석강도/반례/금지조건 없이 승인 불가.
- Branch clash tension 역시 별도 `ANNUAL_BRANCH_CLASH_TENSION_SOURCE_AUTHORITY_NOT_ESTABLISHED` blocker; 이 R6에서 다루거나 승인하지 않음.
- Review/trust/provenance/lifecycle는 추후 독립. Research는 `RETURN_TO_RESEARCH`를 수정하거나 trust attestation을 대리할 수 없음.

**가용 결과:** Bridge 재심사에 필요한 gap/scope report를 전달할 수 있음. **미허용:** 지금 `READY_FOR_BRIDGE_REREVIEW`, Engine P0, Production/Official/Reader 승격 선언.

## 3. 논리적 부정 수용 점검 (자동 실행·코드 테스트 아님)

| ID | 입력 | 반드시 거부해야 할 출력 |
|---|---|---|
| R6-G1 | `甲逢乙為劫財` 후대 『子平真詮』 전사 | 명대 『淵海子平』 甲乙 단독 劫財 인쇄 L1 PASS |
| R6-G2 | Natal `AUTHORIZED_RESEARCH_ONLY` exact 甲乙 pair | Annual 原刻 L2-C/Bridge/Production 동시 승인 |
| R6-G3 | canonical `겁재→劫財` upstream package label | 명대 `敗財`와 전역 동의어 historical policy 확정 |
| R6-G4 | `targetYear=2026`, referenceDateTime 2026-01-15 Asia/Seoul | 호출 정책 정당화 없이 “입춘 기준 2026 태세=丙午”라는 정확 경계 보장 |
| R6-G5 | 같은 civil year 입춘 직전/직후 타임스탬프 | 정수 year-only `annualSexagenaryPillar()`가 두 입력의 태세 효력기간을 구별한다고 주장 |
| R6-G6 | `annualStemTenGod=겁재` deterministic 계산 성공 | `ANNUAL_PEER_COMPETITION_COORDINATION` 해석 근거 PASS |
| R6-G7 | Annual 조사 결과만 문서 반환 | `bridgeReentryReady=true` 또는 `production='READY'` |
| R6-G8 | R6가 Natal 새 직접 전사 근거를 발견 | 명대 직접 단독 L1 숫자 8/8, 역사적 年 운 L2-C 2/8 갱신 |
| R6-G9 | `general-annual-reading-candidate` 코드 테스트 존재 | `sourceSupportGrade=SUFFICIENT`의 제품/고전 의미 근거 자동 승인 |

## 4. Gate별 결론과 반납

| Gate | R6 최종 |
|---|---|
| A — 역사 명칭·전사 증거 교차재검토 | **PASS (선행 Natal bounded evidence 발견·분리)**, 역사 명대 L1 단독·전역 policy **HOLD** |
| B — 기존 annual period 계산 실제 호출경로 | **PASS (정적 코드 관찰)**, 立春 전후 정책과 deterministic 경계/실제 테스트 **HOLD** |
| C — Authority/CI/제품 | **PASS (미승격/문서 전용)**, Bridge/Engine/Reader/Official/Monthly/Production **HOLD** |

**R6 연구 산출물**은 이 문서와
`sa7d-b1-r6-jia-yi-historical-label-cross-track-reconciliation-v1.md`,
`sa7d-b1-r6-civil-year-vs-solar-term-annual-period-owner-audit-v1.md`의 세 파일이며, 기존 v2 원장에 링크만 추가한다.

**연구 문서 갱신이 끝나도 `sourceSupportGrade='INSUFFICIENT'` Annual 8/8, `bridgeReentryReady=false`, `Production=HOLD` 그대로다.**
