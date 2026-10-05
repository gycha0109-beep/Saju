# FR311I 인중·입·입술 전통 의미 및 입 명명형 16종

## 목적

FR311F~H에서 코의 단독 의미·공통 질의·타 부위 관계를 정리한 다음,
《神相全編》 동일 계통의 다음 단일 부위 연구로 人中 / 口 / 脣을 구조화한다.

이번 단계는 제품 판정이나 사진 자동 분류가 아니다.

구조화 대상은 다음 네 층이다.

1. 전통 부위 명칭
2. 人中 일반 직접 규칙
3. 口 / 脣 일반 직접 규칙
4. 입 명명형 16종의 형태·동반 문맥과 직접 의미 주장

## 출전

### 第632卷 / 神相全編二

五官說에서 입은 出納官으로 분류된다.

이 항목은 전통 체계 기준선으로만 사용한다.

### 第634卷 / 神相全編四

직접 의미 자료:

- 人中論
- 相人中篇
- 相口
- 許負相口篇
- 四字口 ~ 覆船口의 입 명명형 16종
- 論脣
- 許負相脣篇

source ref:

`witness.gujin473.art634.wikisource`

이번 단계는 1925 文明書局 NLC 판의 각 항목을 새로 직접 시각 판독했다고 주장하지 않는다.

따라서 명명형은:

`nlc1925DirectScanAdjudicated = false`

를 유지한다.

## 전통 부위 사전

등록:

- 人中
- 口
- 口角
- 上脣
- 下脣
- 兩脣 / 上下脣

중요:

이 명칭은 전통 문헌 내부 주소다.

예:

- 人中 != 자동 philtrum metric axis
- 口角 != 자동 MediaPipe lip corner
- 上脣 / 下脣 != provider contour index set

전통 명칭과 중립 관찰을 연결하려면 별도 검증된 binding 단계가 필요하다.

## 人中 일반 규칙

이번 단계에서 20개 source-local rule을 구조화한다.

대표:

- 細而狹者，衣食逼迫
- 上狹下廣者多子孫
- 上廣下狹者，少兒息
- 上下直而深者，子息滿堂
- 深而長者長壽
- 淺而短者夭亡
- 人中屈曲者，無信之人
- 人中端直者，忠義之士
- 正而垂者富壽
- 明如破竹者，二千石祿
- 細如懸針者，絕子，貧寒
- 人中平長，至老吉昌
- 人中高厚，壽年不久

모든 수명·자녀·성정 표현은 역사적 전통 문헌 주장으로만 저장한다.

실제 수명, 생식능력, 성격 또는 도덕성을 예측하는 권한은 없다.

### 전사·문장 경계가 덜 안정적인 항목

`人中廣厚，奸淫未足`

은 원문을 보존하되:

`certainty = phrase_uncertain`

으로 분리한다.

이 표현을 실제 성행동이나 성격 사실로 사용하지 않는다.

## 口 일반 규칙

相口 / 許負相口篇에서 다음 유형을 source-local direct rule로 구조화한다.

예:

- 方闊有稜者主壽貴
- 形如角弓者主官祿
- 橫闊而厚者福富
- 口如含丹，不受饑寒
- 口如一撮者貧薄
- 口能容拳者出入將相
- 口闊而豐，食祿萬鍾
- 口小而短者貧
- 口角如弓，位至三公
- 口如縮囊，饑死無糧
- 口如吹火，饑寒獨坐
- 口方四字信宜真
- 兩角低垂說惡聲
- 口如吹火少兒孫

형태 설명과 전통 의미를 같은 필드에 넣지 않는다.

## 脣 일반 규칙

論脣 / 許負相脣篇의 입술 관련 직접 문구를 구조화한다.

대표:

- 脣色紅如丹砂者貴而福
- 青如藍靛者災而夭
- 色昏黑者苦疾惡死
- 色紫光者快樂衣食
- 上脣長者先妨父
- 下脣長者先妨母
- 上下俱厚者，忠信之人
- 上下俱薄者，妄語
- 兩脣上下不相覆者，貧寒偷盜
- 上下兩相稱者，言語正直
- 龍脣者，富貴
- 羊脣者，貧賤
- 有紋理，多子孫
- 無紋理，性孤獨
- 上脣厚，命非久
- 脣上下相當，語音易善，好集文章

서로 반대 방향의 문구가 존재해도 평균·다수결·상쇄하지 않는다.

예:

- 일반 論脣에서는 두꺼운 입술을 선호하는 문맥이 존재
- 許負相脣篇에는 `上脣厚，命非久`가 별도 문구로 존재

FR311I는 둘을 하나의 정답으로 합치지 않고 source-local rule로 병렬 보존한다.

## 입 명명형 16종

1. 四字口
2. 方口
3. 仰月口
4. 彎弓口
5. 牛口
6. 龍口
7. 虎口
8. 羊口
9. 豬口
10. 吹火口
11. 皺紋口
12. 櫻桃口
13. 猴口
14. 鯰魚口
15. 鯽魚口
16. 覆船口

## 명명형 구조화 규모

- 명명형: 16
- morphology / context descriptor: 43
- direct meaning claim: 45

## morphology와 context 분리

### 猴口

입 자체:

- 兩脣喜又長

동반 문맥:

- 人中破竹更為良

따라서 `人中破竹`를 입 자체 morphology로 저장하지 않는다.

### 櫻桃口

입 자체:

- 口大
- 脣胭脂

동반 문맥:

- 齒似榴牙密且宜
- 笑如含蓮

치아 조건을 mouth morphology로 재라벨하지 않는다.

### 羊口

`無鬚`는 수염 관련 동반 조건이므로 context로 분리한다.

## 시기별 의미 보존

皺紋口:

- 早年安樂
- 末年敗

두 문구를 하나의 favorable/challenging 점수로 합치지 않는다.

각각:

- early / favorable
- late / challenging

로 별도 claim을 유지한다.

## 색 관련 안전 경계

전통 문헌은 입·입술 색을 여러 의미와 연결한다.

예:

- 紅
- 紫
- 青
- 黑
- 黃

FR311I는 이 문장을 역사적 자료로 보존할 뿐 다음을 허용하지 않는다.

- 사진 색상 -> 질병 진단
- 입술색 -> 실제 수명 예측
- 조명/카메라 색 -> 전통 색 판정 자동 승격
- 현대 의학적 해석

`colorMedicalInferenceAuthorized = false`

를 유지한다.

## 수명·자녀·성정·행실 안전 경계

문헌의 다음 종류 주장은 전부 historical doctrine only다.

- 장수 / 요절
- 자손 많음 / 없음
- 충신 / 무신
- 간험 / 절도 / 탐욕
- 부모·배우자 관련 불리함

따라서 다음은 전부 false다.

- `lifespanPredictionAuthorized`
- `fertilityPredictionAuthorized`
- `personalityFactAuthorized`
- `criminalityInferenceAuthorized`
- `modernScientificFactAuthorized`

## 구조화 결과

FR311I 현재 corpus:

- traditional regions: 6
- direct rules: 69
- philtrum direct rules: 20
- mouth named forms: 16
- descriptors: 43
- named-form claims: 45

## 이번 단계의 비범위

FR311I는 다음을 하지 않는다.

- FR311G face-wide query에 입/인중 자동 통합
- 입×코/눈/눈썹 조합 일반화
- mouth named form 사진 자동 분류
- 人中 길이/폭 threshold
- lip color classifier
- MediaPipe index binding
- neutral mouth geometry ↔ traditional mouth term binding
- 점·주름의 production 해석 활성화
- 최종 사용자용 관상 문장 생성

## 다음 단계

FR311I가 안정되면 다음은 별도 단계에서:

1. FR311I 자료를 face-wide evidence index/query에 통합
2. 기존 16개 lens로 표현 가능한 topic과 신규 lens 필요 topic 분리
3. Monkey-mouth의 人中 context 등 cross-region context를 일반화하지 않고 유지
4. 수명/건강/성정/행실 safety boundary를 output contract까지 전달

한다.
