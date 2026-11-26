# FR311L 귀(耳) 전통 의미 체계

## 목적

《欽定古今圖書集成》博物彙編 藝術典 제634권 / 《神相全編四》의 귀 관련 원문을 source-local 전통 의미 데이터로 구조화한다.

이번 단계는 귀를 사진에서 자동 판정하는 단계가 아니다.

목표는 다음 세 가지를 분리하는 것이다.

1. 귀 자체 형태·색·표면·털·가시성 묘사
2. 원문이 귀 특징에 직접 귀속한 전통 의미
3. 귀와 눈·눈썹·입·산근·와잠·얼굴 전체 등 타부위가 함께 등장하는 문맥

## 승인 출전

- 相耳
- 相耳訣
- 許負相耳篇
- 土耳
- 棋子耳
- 虎耳
- 箭羽耳
- 金耳
- 木耳
- 水耳
- 火耳
- 豬耳
- 低反耳
- 垂肩耳
- 貼腦耳
- 開花耳
- 扇風耳
- 鼠耳
- 驢耳

내부 출전 식별자:

- witness.gujin473.art634.wikisource

현재 직접 판본 대조 상태:

- gujin634_transcription_reviewed
- nlc1925DirectScanAdjudicated = false

## 규모

FR311L 구조화 결과:

- 전통 귀 세부 명칭: 9
- 귀 단독 직접 규칙: 57
- 직접 절의 타부위 문맥: 5
- 귀 명명형: 16
- 명명형 형태 descriptor: 58
- 명명형 의미 claim: 46
- 명명형 내부 타부위 context descriptor: 10

## 전통 귀 세부 명칭

다음 명칭을 source-local로 보존한다.

- 耳
- 輪
- 廓 / 城廓
- 耳門
- 垂珠 / 墜珠
- 耳根 / 根
- 命門
- 天輪
- 耳下骨

이 명칭을 현대 해부학 좌표나 provider landmark에 자동 대응시키지 않는다.

특히 輪 / 廓 / 命門 / 天輪은 전통 문맥에서의 명칭으로만 보존한다.

## 직접 규칙

相耳 / 相耳訣 / 許負相耳篇에서 귀 특징 자체에 의미가 붙는 문구를 직접 규칙으로 구조화했다.

주요 관찰 종류:

- morphology
- color
- surface_mark
- hair
- front_visibility

대표 예:

- 厚而堅，聳而長，皆壽相也
- 耳內生毛者壽
- 耳門闊，主智遠
- 耳薄向前，賣盡田園
- 光明潤澤，聲名遠播
- 耳薄如紙，夫死無疑
- 耳有垂珠，衣食自足
- 耳門廣闊，聰明豁達
- 耳有毫毛，長壽富貴，兼沒災殃
- 耳門薄小，命短食少
- 前看不見富貴榮
- 前看見耳多貧苦
- 上尖狼耳心多殺
- 下尖無色亦無良

이 의미는 역사적 전통 관상 문헌의 주장이다.

실제 수명·재산·배우자 생사·성격·도덕성·범죄성·건강을 얼굴로 예측하는 권한을 부여하지 않는다.

## 타부위 문맥 격리

다음은 귀 단독 규칙으로 넣지 않았다.

### 귀 ↔ 입

- 垂珠朝口者，主財壽
- 下有垂珠肉色光，更來朝口富榮昌

두 문구 모두 귀와 입의 상대 관계다.

FR311K에서 이미 승인된:

- ear_mouth.earlobe_toward_mouth

근거를 재사용하고 FR311L에서는 중복 relation을 만들지 않는다.

### 귀 ↔ 눈

- 耳高於目，合受他祿
- 目能自睹者吉

귀와 눈의 상대 높이 또는 가시성 문맥으로 보존한다.

### 귀 ↔ 눈썹

- 高，如眉一寸，永不踐貧困

문장 경계가 완전히 명확하지 않고 상대 높이·거리 관계이므로 phrase_uncertain context로 보존한다.

이 문구의 "一寸"을 현대 사진 metric threshold로 바꾸지 않는다.

## 명명형 16종

### 土耳

형태:
- 堅厚大且肥
- 潤紅
- 綿長

전통 의미:
- 富貴
- 六親足
- 鶴髮童顏
- 輔佐時

### 棋子耳

형태:
- 耳圓
- 輪廓喜相扶

전통 의미:
- 白手興家
- 貴可圖
- 祖業平常
- 中年富貴若陶朱

### 虎耳

형태:
- 耳小
- 輪廓缺破
- 對面不見

전통 의미:
- 多好險
- 有貴有威儀

### 箭羽耳

형태:
- 上節高眉寸有餘 — 타부위 context
- 下生箭羽
- 沒垂珠

전통 의미:
- 조상 재산의 파산
- 이동·유랑의 삶

### 金耳

형태:
- 高眉一寸 — 타부위 context
- 天輪小
- 耳白過面
- 垂珠

전통 의미:
- 富貴
- 聞名於朝野
- 損子
- 末時孤

### 木耳

형태:
- 輪飛
- 廓反
- 面部若好 — 얼굴 전체 context

전통 의미:
- 六親薄
- 資財不足家
- 조건부 평범한 삶
- 빈곤

### 水耳

형태:
- 厚圓
- 高過目 — 눈 context
- 貼腦
- 有垂珠
- 硬堅
- 紅潤

전통 의미:
- 人間大丈夫라는 전통 호평

### 火耳

형태:
- 高眉 — 눈썹 context
- 輪尖
- 廓反
- 垂珠
- 山根臥蠶若相應 — 산근·와잠 context

전통 의미:
- 말년 자녀 관련 불리한 주장
- 말년 수명 관련 유리한 주장

### 豬耳

형태:
- 無廓有輪
- 厚
- 前/後
- 垂珠

전통 의미:
- 부귀가 있어도 충분하지 않다는 혼합 판단
- 말년 재해

### 低反耳

형태:
- 耳低
- 廓反
- 輪開

전통 의미:
- 어린 시기의 고독·형극
- 재물 손실
- 집안 재산 소모
- 훗날 죽음에 관한 극단적 전통 주장

### 垂肩耳

형태:
- 耳厚
- 廓豐
- 珠橐肩
- 過眉 — 눈썹 context
- 潤澤色明鮮
- 頭圓額潤 — 머리·이마 context

전통 의미:
- 최고 지위에 비유되는 귀함

### 貼腦耳

형태:
- 兩耳貼腦
- 輪廓堅
- 壓眉壓眼 — 눈썹·눈 context

전통 의미:
- 高賢
- 六親昆玉皆豪貴
- 百世流芳

### 開花耳

형태:
- 耳輪開花
- 薄
- 骨破

전통 의미:
- 큰 재산의 소진
- 말년 빈곤

### 扇風耳

형태:
- 兩耳向前且兜風

전통 의미:
- 가산·조상 재산 소진
- 소년기 복
- 중년 쇠퇴
- 말년 빈곤·고독

### 鼠耳

형태:
- 高飛
- 根反尖
- 過目 — 눈 context

전통 의미:
- 형통하지 않음
- 절도 관련 범죄성 주장
- 말년 파탄
- 말년 형벌 관련 불확실 문구

### 驢耳

형태:
- 有輪
- 有廓
- 厚
- 軟弱
- 反垂珠

전통 의미:
- 빈곤
- 말년 쇠퇴

## 불확실 문구

문장 경계·용어 해석이 충분히 명확하지 않은 문구는 phrase_uncertain으로 남긴다.

직접 규칙 예:

- 左右大小迍否，妨害
- 其豎如木，到老不哭
- 耳黑飛花，離祖破家
- 耳門容著，家貧易去
- 耳如獸耳，自安自止
- 木星得地招文學，自有聲名達帝都
- 耳白過面少高名
- 耳前生靨近聾貧

명명형 claim의 불확실 문구도 확정 claim과 구분한다.

## 권한 경계

항상 false:

- scoreAuthorized
- aggregateGoodBadJudgementAuthorized
- unsupportedSynthesisAuthorized
- sourcePriorityInferenceAuthorized
- traditionalRuleInferenceAuthorized
- namedFormToNeutralClassifierAuthorized
- traditionalRegionToNeutralGeometryBindingAuthorized
- providerLandmarkBindingAuthorized
- metricThresholdAuthorized
- healthDiagnosisAuthorized
- lifespanPredictionAuthorized
- spouseDeathPredictionAuthorized
- familyDeathPredictionAuthorized
- fertilityPredictionAuthorized
- childSexPredictionAuthorized
- personalityFactAuthorized
- moralityFactAuthorized
- criminalityFactAuthorized
- modernScientificFactAuthorized
- productInterpretationAuthorized

## 비범위

FR311L은 다음을 하지 않는다.

- 사진에서 귀 명명형 자동 판정
- 귀 높이·길이·두께 수치 threshold 생성
- "눈보다 높음", "눈썹보다 한 치"를 landmark 거리 규칙으로 변환
- 귀색으로 질환 진단
- 귀 모양으로 실제 성격·도덕성·범죄성 판단
- 귀 특징으로 실제 수명·재물·배우자·자녀·미래 예측
- 귀와 타부위 관계를 독립 특징에서 자동 추론
- FR311K 관계식 중복 생성
- 점수·다수결·강화·상쇄

## 다음 단계

FR311L 이후 FR311M에서 귀 × 타부위 직접 관계·조합을 별도로 감사한다.

후보:

- 귀 ↔ 눈
- 귀 ↔ 눈썹
- 귀 ↔ 입
- 귀 ↔ 산근
- 귀 ↔ 와잠
- 귀 ↔ 이마/머리
- 귀 ↔ 얼굴 전체

FR311M에서도 같은 문장에 두 부위가 있다는 이유만으로 관계·조합을 만들지 않는다.
