# SA-7D-A4 — General Annual 지지충 4종 독립 Research 심사

> Parent: #2386 · Watchtower-Track: saju-research
>
> 판정: **Research HOLD / Production HOLD**. 이 문서는 새 semantic authority registry가 아니며 기존 source-acquisition 계약의 근거를 소비하는 후속 연구 기록이다.

## 근거와 분리된 세 층

- **계산 관계(A)**: target-year 지지와 출생 연·월·일·시 지지가 결정된 뒤, governed 六冲 pair table로 지지충 성립 여부를 판정할 수 있다. 이것은 계산 사실이지 길흉이나 갈등의 사실이 아니다.
- **구조 상호작용(B)**: 합·충의 간섭, 중첩, 인접성, 조건별 효과는 선택된 고전 명제와 학파별 적용 규칙을 요구한다. 현재는 연운×출생 궁위의 효과로 판정할 직접 원전 구절을 검증하지 않았다.
- **사건·결과(C)**: 건강 악화, 사고, 이별, 재물 손실, 이직 등의 구체적 사건은 별도 직접 증거가 없으므로 전부 비허용이다.

## 자료 출처 및 증거 등급

1. **김만태(2013)**, 「십이지(十二支)의 상호작용 관계로서 충(衝)·형(刑)에 관한 근원 고찰」, DOI: 10.25024/ksq.36.3.201309.134. 충·형의 전통적 상호작용을 논의하는 *현대 학술적 맥락 자료*이며, 본 네 규칙에 대한 직접 고전 판면이 아니다.
2. **이재승(2021)**, 「명리학에서 합충(合沖)에 의한 지지(地支)의 합력(合力) 차 연구」, KCI ART002788509 (인문사회 21, 12(6), 2801–2816). 공개 초록에서 합충 관계의 중첩·인접성에 따른 차이를 논의하며 대운·세운 합충은 후속 연구 필요 대상으로 명시한다. annual-to-natal pillar tension을 승인하지 않는다.
3. 내부 `SRC-MYEONGHA-ANNUAL-INTERPRETATION-POLICY-V1`: 현재 candidate의 generic tension 및 `day=moderate`, 나머지 `minor` 할당을 설명할 뿐 **전통 사주 의미의 독립 출처는 아니다**.
4. 명대 『三命通會』 제4책 PDF 25쪽 `論太歲`: 검증된 것은 **연간 천간↔일간 십신의 방향성 있는 identity 두 예**뿐이며, 이 네 branch-clash 명제에 대한 직접 근거로 사용할 수 없다.

현재 **구조 맥락 참고 = CROSS_REFERENCE_ONLY**, **연운-specific tension/궁위 효과의 출처 등급 = INSUFFICIENT**이다. PRIMARY_SUPPORTED나 MULTI_SOURCE_SUPPORTED를 부여하지 않는다.

## 각 규칙별 판정

| semanticKey | 현재 candidate 주장 | 계산 사실로 허용되는 범위 | 별도 직접 근거가 필요한 추가 추론 | 판정 |
|---|---|---|---|---|
| `ANNUAL_BRANCH_CLASH_YEAR` | 출생 연지에 충, tension, minor | 연운 지지↔출생 연지의 정확한 육충 관계 | 조상·가족·사회적 변화 및 minor 효과 | `REQUIRES_SEPARATE_DIRECT_SUPPORT` |
| `ANNUAL_BRANCH_CLASH_MONTH` | 출생 월지에 충, tension, minor | 연운 지지↔출생 월지의 정확한 육충 관계 | 직업·직장·사회적 변화 및 minor 효과 | `REQUIRES_SEPARATE_DIRECT_SUPPORT` |
| `ANNUAL_BRANCH_CLASH_DAY` | 출생 일지에 충, tension, moderate | 연운 지지↔출생 일지의 정확한 육충 관계 | 배우자·이별·관계 변화 및 moderate 우위 | `REQUIRES_SEPARATE_DIRECT_SUPPORT` |
| `ANNUAL_BRANCH_CLASH_HOUR` | 출생 시지에 충, tension, minor | 연운 지지↔출생 시지의 정확한 육충 관계 | 자녀·말년 등 구체 영역 변화 및 minor 효과 | `REQUIRES_SEPARATE_DIRECT_SUPPORT` |

네 항목의 입력 전제는 각각 target-year annual branch와 대응 출생 지지가 명확히 확정되고, 정확한 六冲 관계가 일치하는 것이다. 값이 누락되거나 모호하면 fail closed한다. 합·형 등 다른 상호작용이 겹친 경우는 결론 강도를 임의 상속하지 않는다. 구조적 간섭을 다루는 학파별 방법론을 선정한 뒤 별도로 검증해야 한다.

**반례 및 부정 추론:** 子와 未처럼 六冲이 아닌 지지 조합에는 relation fact를 만들 수 없다. 반대로 子午처럼 六冲이 확인되어도 그것만으로 이별이나 사고는 발생 사실이 되지 않는다. 출생 일지의 기존 `moderate` 설정은 검증된 상대 효과의 증거가 아니다.

개별 결정 객체에 `sourceRefs`, `sourceStatement`, `interpretiveReading`, `researchInference`, `preconditions`, `meaningStrength`, `qualifiers`, `exceptions`, `counterexamples`, `schoolDependencies`, `nonImplications`, `sourceSupportGrade`, `semanticDisposition`, `unresolvedEvidence`를 모두 기록한다.

## 후속 확인 요건

고전의 **정확한 판본·권차·판면·원문 구절**에서 연운 지지와 출생 각 지지의 충이 어떤 구조적 의미를 갖는지 확인해야 한다. 이후 동일 논리로 예외·합충 중첩·시기·학파 의존성과 `year/month/day/hour` 궁위별 차이를 검증한다. 근거가 없다면 generic tension 및 기존 `moderate/minor` 설정은 Research HOLD를 유지한다.

**권한 경계:** 기존 `general-annual-reading-candidate.ts` 변경 없음. Engine/Preview/Official Reading/월운/Production 자동 승인 금지. Bridge에 넘길 수 있는 것은 검증된 증거와 미해결 목록이지 정식 제품 해석이 아니다. A3와 A4가 모두 검토되어야 #2386 반환 자격을 다시 평가한다.
