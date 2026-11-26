# FR312E — Morphology-only Annotation Specification

## 1. 목적

FR312D에서 남은 morphology-only pilot design candidate 10개를 실제 annotation 가능한 계약으로 고정한다.

이번 단계의 질문은 하나다.

> 전통 문헌에서 분리한 형태 술어를, 전통 의미·neutral metric·model output을 보지 않은 사람이 안정적으로 판정할 수 있는가?

FR312E는 실험 실행 단계가 아니다.

- dataset 수집 없음
- sample size 결정 없음
- partition ratio 결정 없음
- threshold 탐색 없음
- automatic traditional binding 없음
- product interpretation 없음

---

## 2. source of truth

FR312E는 아래 기존 authority를 직접 소비한다.

- FR311I mouth / philtrum canonical direct rules
- FR311J face direct-rule evidence index
- FR312C direct-rule equivalence study
- FR312D empirical admission protocol

canonical witness ref:

`witness.gujin473.art634.wikisource`

FR312D candidate set이 바뀌면 FR312E assertion/test도 실패하도록 연결한다.

---

## 3. 10개 source rule 감사 결과

| rule | full historical expression | morphology-only clause | semantic tail — annotator hidden | comparator |
|---|---|---|---|---|
| `fr311i.philtrum.thin_narrow` | 細而狹者，衣食逼迫 | 細而狹 | 衣食逼迫 | `mouth.philtrum_length_width` |
| `fr311i.mouth.small_short` | 口小而短者貧 | 口小而短 | 貧 | `mouth.width_and_relative_size` |
| `fr311i.mouth.corners_droop_bad_speech` | 兩角低垂說惡聲 | 兩角低垂 | 說惡聲 | `mouth.corner_orientation` |
| `fr311i.lip.upper_thin` | 上脣薄者言語狡詐 | 上脣薄 | 言語狡詐 | `mouth.visible_lip_fullness` |
| `fr311i.lip.lower_thin` | 下脣薄者，貧賤蹇滯 | 下脣薄 | 貧賤蹇滯 | `mouth.visible_lip_fullness` |
| `fr311i.lip.both_thick` | 上下俱厚者，忠信之人 | 上下俱厚 | 忠信之人 | `mouth.visible_lip_fullness` |
| `fr311i.lip.both_thin` | 上下俱薄者，妄語 | 上下俱薄 | 妄語 | `mouth.visible_lip_fullness` |
| `fr311i.lip.upper_thick_short_life` | 上脣厚，命非久 | 上脣厚 | 命非久 | `mouth.visible_lip_fullness` |
| `fr311i.lip.lower_thin_gluttony` | 下脣薄，主貪食 | 下脣薄 | 主貪食 | `mouth.visible_lip_fullness` |
| `fr311i.lip.thick_quiet_thin_litigious` | 脣厚少語薄多訟 | 脣厚 / 薄 | 少語 / 多訟 | `mouth.visible_lip_fullness` |

모든 semantic tail은 historical doctrine data일 뿐이며 annotation 대상이 아니다.

---

## 4. 10 rules → 11 source clauses → 10 canonical predicates

source rule 수와 annotation predicate 수를 기계적으로 1:1로 맞추지 않는다.

### 4.1 compact contrast rule

`脣厚少語薄多訟`은 한 문장 안에 두 형태-의미 대응이 압축되어 있다.

- `脣厚` → semantic tail `少語`
- source surface의 `薄` → semantic tail `多訟`

따라서 source morphology clause는 2개로 분리한다.

두 번째 source fragment는 원문 표면형 `薄`을 그대로 보존하되 canonical predicate에서만 병렬 생략을 복원한 `脣薄`로 정규화한다.

이 정규화는 annotation predicate 식별을 위한 것이며 새로운 전통 rule 생성이 아니다.

### 4.2 duplicated morphology

다음 두 source rule은 의미 tail이 다르지만 형태 조건은 동일하다.

- `下脣薄者，貧賤蹇滯`
- `下脣薄，主貪食`

따라서 source clause provenance는 둘 다 보존하지만 canonical morphology predicate `下脣薄`은 하나만 둔다.

형태 annotation 결과가 두 semantic tail의 사실성을 검증하지 않는다.

---

## 5. canonical morphology predicates

현재 canonical predicate는 10개다.

1. `細而狹`
2. `口小而短`
3. `兩角低垂`
4. `上脣薄`
5. `下脣薄`
6. `上下俱厚`
7. `上下俱薄`
8. `上脣厚`
9. `脣厚`
10. `脣薄`

중요한 경계:

- `細而狹`의 細와 狹를 임의의 서로 다른 numeric axis로 확정하지 않는다.
- `口小而短`의 小와 短를 같은 dimension이라고 가정하지 않는다.
- `脣厚`을 `上下俱厚`과 자동 등치하지 않는다.
- `脣薄`을 `上下俱薄`과 자동 등치하지 않는다.
- comparator가 존재한다는 이유만으로 traditional predicate와 neutral metric의 equivalence가 승인되는 것은 아니다.

---

## 6. annotation label state

FR312E label은 다음 네 상태를 분리한다.

### present

이미지가 source-bounded morphology predicate를 지지한다고 annotator가 판정한 상태.

compound predicate는 전체 조건이 지지되어야 한다.

### absent

이미지가 충분히 판독 가능하고 morphology predicate가 명확히 지지되지 않는 상태.

capture failure를 absent로 넣지 않는다.

### indeterminate

이미지 자체는 판독 가능하지만 형태가 경계적·혼합적이거나 compound predicate 일부만 지지되어 안정적으로 결정할 수 없는 상태.

### not_observable

촬영·가림·표정·pose·framing·filter·해상도·blur 때문에 해당 morphology 자체를 판정할 수 없는 상태.

`indeterminate`와 `not_observable`은 합치지 않는다.

---

## 7. annotator blind contract

annotator가 볼 수 있는 정보:

- 얼굴 이미지
- 해당 canonical morphology predicate
- source-bounded neutral annotation gloss
- 4-state label
- capture validity 안내

annotator가 절대 볼 수 없는 정보:

- full traditional claim
- semantic consequence
- neutral metric 숫자
- comparator 계산 결과
- model prediction
- 기존 traditional classification
- product result
- 다른 annotator 답
- threshold candidate

특히 neutral metric 값을 먼저 보여주고 사람이 그 값에 맞춰 형태를 고르게 하면 circular validation이므로 금지한다.

---

## 8. capture validity

FR312E는 degree/pixel threshold를 만들지 않는다.

필수 상태는 qualitative contract로만 둔다.

- frontal 또는 near-frontal
- neutral resting expression
- 의도적인 pursing/compression 없이 닫힌 입
- target region 전체가 보임
- 형태 판독에 충분한 focus/resolution
- shape-distorting filter 없음

다음 상태는 annotation validity를 깨뜨릴 수 있다.

- 입 벌림
- 말하는 중
- 웃음 또는 과장된 표정
- 입술 오므림
- 의도적인 lip compression
- 의미 있는 yaw/pitch 이탈
- 손/마스크/수염 등 target region 가림
- target region crop
- 형태 왜곡 filter
- 해상도 부족
- motion/focus blur

구체적인 각도·pixel·ratio cutoff는 FR312E에서 승인하지 않는다.

---

## 9. rule별 observation contract

10개 rule 각각에 아래 항목을 materialize한다.

- rule id
- canonical source reference
- full historical source expression
- morphology clause id
- semantic fragment — annotator hidden
- neutral comparator key
- observable face region
- required capture state
- forbidden capture state
- positive morphology guidance
- negative morphology guidance
- indeterminate guidance
- not-observable reasons
- expression sensitivity
- occlusion sensitivity
- pose sensitivity
- framing sensitivity
- image-quality sensitivity
- annotation semantic leak prohibited = true
- metric leak prohibited = true
- threshold prohibited = true
- empirical execution authorized = false

---

## 10. source-bounded guidance 원칙

FR312E는 source에 없는 형태 디테일을 annotation guide에 추가하지 않는다.

따라서:

- `細而狹`을 임의로 length/width 숫자 조합으로 정의하지 않는다.
- `口小而短`에서 短을 임의로 특정 축 길이라고 확정하지 않는다.
- `薄`, `厚`에 임의 pixel/ratio threshold를 붙이지 않는다.
- `脣厚` 같은 unspecified wording에 상·하 입술 조건을 새로 발명하지 않는다.

현재 guidance는 원문 predicate 전체를 보고 사람이 판단하는 계약만 고정한다.

실제 boundary example card와 annotator training material은 FR312F dataset/capture 설계 전 별도 검토 대상으로 남긴다.

---

## 11. FR312E에서 하지 않는 것

이번 단계에서는 다음을 결정하지 않는다.

- participant 수
- 성별 비율
- 연령 분포
- 국가/인종별 population norm
- development/calibration/holdout 비율
- threshold 탐색
- ROC cutoff
- F1 목표
- minimum Cohen's kappa
- production acceptance score
- automatic traditional binding
- semantic claim validation

---

## 12. 다음 단계

FR312F — Pilot dataset & capture protocol design

여기서 처음 다음을 설계한다.

- participant unit
- capture session
- repeat capture
- image unit
- annotation assignment
- annotator independence
- disagreement adjudication
- leakage prevention
- subject-level partition
- metric extraction timing
- data-quality audit
- sample/partition 근거

그 이후에도 neutral metric reliability를 FR312G에서 먼저 검증하고, traditional morphology equivalence는 FR312H에서 다룬다.

---

## 13. 종료 조건

FR312E 종료 조건:

- FR312D candidate 10/10 rule coverage
- source morphology clause 11개 전수 provenance 보존
- canonical predicate 10개
- duplicate `下脣薄` canonicalization
- `脣厚少語薄多訟` 2-clause split
- morphology / semantic clause 분리 완료
- 4-state label: present / absent / indeterminate / not_observable
- annotator semantic leak 0
- annotator metric/model/product leak 0
- threshold 0
- empirical execution 0
- automatic binding 0
- score/rank/product interpretation 0
- FR312D candidate set 변경 시 test fail
- standard CI + Face Reading CI + integration CI PASS 후 squash merge
