# FR311E 눈×눈썹 직접 조합 및 부위 간 상대관계 연구

## 목적

FR311C/D의 출력 구조보다 부족했던 눈×눈썹 직접 근거 밀도를 높인다.

이번 단계는 《神相全編》 동일 계통 안에서 다음을 분리한다.

1. 형태 × 형태 직접 조합
2. 전통 명명형 × 명명형 직접 조합
3. 눈과 눈썹의 부위 간 상대관계
4. 특정 명명형 내부의 동반 문맥
5. 전사 문장 경계가 불안정한 연구 후보

독립 형태 둘을 상대관계로 자동 변환하지 않는다.

## 조사 범위

### 第632卷 / 神相全編二

- 保壽官
- 監察官

두 항목은 눈썹과 눈을 각각 독립 官으로 정의하는 기준선으로 사용한다.

### 第633卷 / 神相全編三

- 論眉
- 相眉
- 눈썹 24형
- 相目論
- 達摩相眼
- 눈 39형

## 직접 형태 조합

### 目短 + 眉長

원문:

目短眉長，愈益田莊

기존 FR182의 NLC 1925 직접 스캔 계보를 재사용한다.

- 유형: direct_morphology_combination
- 주제: wealth
- scan adjudication: 기존 저장소 계보에서 확인됨

## 직접 명명형 조합

### 龍眉 + 鳳眼

原文:

龍眉鳳眼人中貴

- 유형: direct_named_form_combination
- 주제: status
- 第633卷 達摩相眼 전사에서 직접 확인
- 이번 단계에서는 신규 NLC 1925 페이지 직접 판독을 완료했다고 주장하지 않음

따라서 이 규칙은 Gujin 633 전사 검토 상태로만 승격한다.

## 부위 간 상대관계

### brow_eye.brow_extends_beyond_eye

전통 표현:

- 眉過眼
- 眉長過目
- 過目

직접 의미 근거:

- 眉過眼者富貴
- 眉長過目，忠直有祿
- 相眉의 過目豐富

같은 상대관계에 여러 직접 의미가 존재할 수 있으므로 하나의 단일 점수로 합치지 않는다.

### brow_eye.brow_shorter_than_eye

原文:

眉短於目，心性孤獨

눈썹이 짧다는 독립 형태와 눈이 길다는 독립 형태를 관찰했다고 해서
자동으로 眉短於目라고 판정하지 않는다.

### brow_eye.brow_does_not_cover_eye

原文:

- 短不覆眼者乏財
- 不覆目者孤貧

### brow_eye.brow_presses_eye

原文:

壓眼者窮逼

### brow_eye.brow_tail_drops_to_eye

原文:

尾垂眼者性懦

## 명명형 내부 문맥

기존 FR311C 문맥을 그대로 유지한다.

- 黃薄眉 + 目且長
- 新月眉 + 目秀
- 獅眼 + 粗眉
- 伏犀眼 + 兩眉濃

이들은 해당 명명형의 내부 조건이지 전 얼굴에 적용하는 독립 조합 공식이 아니다.

## 전사 불확실 후보

相眉의 다음 구절들은 문장 경계와 조건 범위가 전자 전사만으로 안정적이지 않다.

- 眉長過眼目弟兄須五六
- 眉短家無兄弟真
- 濃長過目四三人
- 不過兩目只言二

FR311E에서는 후보로만 보존한다.

- promotionAuthorized = false
- requiresDirectScanAdjudication = true

## 질의 규칙

FR311E 이후 조합 참가자는 세 종류다.

- morphology
- named_form
- cross_region_relation

예:

### 형태 직접 조합

- morphology: eye.short
- morphology: brow.long

### 명명형 직접 조합

- named_form: eyebrow.named.dragon
- named_form: eye.named.phoenix

### 상대관계

- cross_region_relation: brow_eye.brow_shorter_than_eye

참가자 집합이 원문 직접 규칙과 정확히 일치할 때만 직접 조합/관계로 반환한다.

## 주제 오염 방지

직접 조합은 질문 주제와 일치해야 한다.

예:

目短眉長은 재물 근거다.

따라서:

- wealth 질의 -> direct_source_combination
- spouse 질의 -> direct_source_combination으로 승격하지 않음

## 출력 계약

FR311D에 direct_relation 출력을 추가한다.

예:

眉短於目 / 성정

출력:

- direct_relation
- sourceStatus: direct_source_relation
- 원문: 眉短於目，心性孤獨
- 독립 형태에서 상대관계를 자동 추론하지 않는다는 제한 표시

## 권한 경계

금지:

- 독립 morphology -> 상대관계 자동 추론
- 길이 비율 임계값 생성
- 사진 자동 명명형 판정
- 전사 후보 자동 승격
- 근거 없는 조합 합성
- 강화/상쇄 추론
- 현대 심리·의학 사실화
- 상품 해석 자동 활성화

## 다음 단계

FR311E 완료 후 눈·눈썹 연구를 1차 완결 상태로 평가한다.

그 다음 우선순위는 눈·눈썹을 더 미세하게 파는 것보다
코/입/인중/관골/이마 등 다음 얼굴 부위의 전통 형태→의미 연구로 이동하는 것이다.
