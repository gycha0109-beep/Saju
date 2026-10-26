# 명하 원국 — R121 양성 뿌리 근거의 Canonical Snapshot 직접 소비

- 날짜: 2026-10-26
- 브랜치: `feat/saju/500-personalized-reading-roadmap`
- 기존 로드맵: P0 명리 구조의 출처 한정 관측 → 공유 원국 구조 독해
- 적용 권한: Research Preview 내부 참고만 허용, T8 Claim 자동 발행·생산 품질/판매/강약·격국·용신 판정 불허

## 실제 구현

- `src/preview/source-bound-positive-root-presence.ts`: 기존 R121 자료와 `evaluateJiaYiWoodBoundedRootPresenceEvidence`를 **변경하지 않고** 실제 원국 계산 결과에 호출한다. 일간 `derivedFacts.dayMaster`와 연·월·일·시주의 `pillars.<slot>.value.branch.value`가 실제 `resolved`인 경우에만 범위 한정 **양성** 뿌리 관측을 기록한다.
- 관측별 출처 URL·방법론 정의 해시·일간 및 지지 계산 경로·명리 원문 관계 범위를 보존한다.
- 갑·을목 출처의 `인·묘·해·진·미` 관측 외에도 기존 업스트림에서 허용한 양성 관측은 재사용한다. 갑·을목 `인·묘`의 고전 문장에 나타나는 '旺' 표현은 **원국 최종 신강 확정으로 해석하지 않는다**. `을인`은 독립적인 음간 祿, `을해`는 음간 長生 자동 분류로 확장하지 않는다.
- 관측이 없는 명식에는 '현재 출처 범위 안에서 확인된 양성 증거 없음'이라고만 표시한다. 전 지지 무근, 전통 용신, 원국 강약 또는 위치 가중치는 평가하지 않는다.
- `src/preview/natal-structural-integrated-research.ts`: **같은 Canonical Snapshot의 기존 통합 Research Reader**에 `boundedPositiveRoots`와 별도 출처 설명을 연결한다. 이미 허가된 T8 의미 Claim으로 위장하지 않으며, 독립 계산기나 병렬 권위 체계는 추가하지 않는다.
- `scripts/saju-500-whole-chart-structural-final-audit.mjs`: 연구 양성 증거의 경로·고전 출처·무근/강약/용신/격국/판매 판정 금지와 기존 5개 메뉴 T8의 비승격 계약을 한 번에 확인한다.

## 미완료 경계

- R121이 밝히는 양성 후보는 보편 통근의 완성된 정의가 아니며 음성 판정이나 위치 가중치를 허용하지 않는다.
- I23 신강 분류, R131 격국 확정, R034 조후 해결기, R072 대운 효력 판단은 여전히 **실행 권한 없음**이다.
- 연구 참고 근거의 출력 성공은 Production/Official/Publish/Sell 품질 승인과 다르다.

## 동일 500명 실제 최종 실행 결과

| 항목 | 결과 |
| --- | ---: |
| 동일 명식 전체 실행 | **500/500명 성공** |
| 출처 한정 양성 뿌리 관측이 있는 명식 | **393명** |
| 실제 양성 관측 | **795건** |
| 갑·을목 출처 명시 집합 양성 관측이 있는 명식 | **86명** |
| 부정 통근·신강·격국·용신·출처·계산경로·상품 권한 위반 | **0건** |
| 빌드·린트·타입·500명 실제 통합 검사 | **통과** |

기계 판독 가능 실행 결과: `saju-bounded-positive-root-500-evidence-2026-10-26.json`. 이 관측은 **통근 최종 분류나 명식 신강**을 뜻하지 않는다.

## 원본 출처 계보별 매핑

처음 연결 코드에서는 갑·을목을 추가로 평가하는 바깥 평가기의 출처를 모든 업스트림 관측에 공통으로 붙였다. 이를 원래 평가기의 근거 계보로 수정했다. 각 관측의 `sourceAuthorityId`·`sourceId`·`methodologyDefinitionHash`는 다음과 같이 구분된다.

| 원래 양성 관측 종류 | 출처 권한 ID | 출처 파일 |
| --- | --- | --- |
| 旺·墓庫·餘氣 | R121_BASE_ROOT | `general-natal-bounded-sizhu-root-presence-evidence-authority.ts` |
| 長生 | R121_YANG_CHANGSHENG | `general-natal-bounded-sizhu-yang-changsheng-root-presence-authority.ts` |
| 祿 | R121_FOUR_YANG_LU | `general-natal-bounded-sizhu-four-yang-lu-root-presence-authority.ts` |
| 甲乙木의 명시적 양성 집합 | R121_JIA_YI_WOOD | `general-natal-jia-yi-wood-bounded-root-presence-authority.ts` |

원문 출처 URL과 정의 해시는 해당 원본 연구 상수에서 그대로 읽으며, 최종 500명 통합 검사는 관측 유형별 URL·정의 해시·권한 ID가 각각 정확하게 일치하도록 판정한다.
