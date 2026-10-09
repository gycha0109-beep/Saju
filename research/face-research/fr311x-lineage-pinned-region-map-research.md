# FR311X — 계보 고정 전통 지역지도 연구

## 목적

FR311V의 region-map 연구 대상 17건을 source lineage와 source section 기준으로 분리한다.

이 문서는 전통 지역명을 실제 얼굴 좌표로 바꾸지 않는다.

## 결과

- 감사 대상: 17/17
- region-map 정의: 13
- source-text-only map target: 12
- unresolved named-subregion target: 4
- composite reference-only target: 1
- neutral geometry operationalized: 0
- empirical validation eligible: 0

## 가장 중요한 발견 — 631권의 두 종류 삼정

같은 631 계보라도 문맥이 다르다.

### 《十觀》의 삼정

원문은:

- 額門
- 準頭
- 地角

을 “此面部三停”이라고 부른다.

FR311X에서는 이를:

`fr311x.map.gujin631.ten_observations.three_stops_anchor_triplet`

으로 별도 보존한다.

### 《面三停》의 삼정

별도 절에서는:

- 自髮際下至眉間
- 自眉間下至鼻
- 自準下人中至頦

라는 vertical range 정의를 사용한다.

FR311X에서는:

`fr311x.map.fr311s.gujin631.face_three_divisions`

로 별도 보존한다.

두 정의는 같은 631 계보라는 이유로 합치지 않는다.

## 632권 삼정도 별도

632권 《三才三停論》:

- 自髮際至眉
- 眉至準頭
- 準頭至地閣

을 사용한다.

따라서 현재 삼정 관련 지도는 최소:

1. 631 十觀 anchor triplet
2. 631 面三停 ranges
3. 632 三才三停 ranges

의 세 연구 객체로 분리된다.

canonical “하나의 삼정 좌표”는 만들지 않는다.

## 五嶽

### 631 十觀

별도 map:

- 左顴 = 東岳
- 額 = 南岳
- 右顴 = 西岳
- 地閣 = 北岳
- 土星 = 中岳

여기서 土星을 개발자가 임의로 특정 provider nose landmark로 바꾸지 않는다.

### 632 五嶽

FR311S에 저장된 별도 계보 map을 그대로 사용한다.

- 額 / 衡山
- 頦 / 恆山
- 鼻 / 嵩山
- 左顴 / 泰山
- 右顴 / 華山

631과 632의 명명 차이를 canonical merge하지 않는다.

## 이마 5부위

642권 額部相의:

- 天中
- 天庭
- 司空
- 中正
- 印堂

을 ordered labels로만 보존한다.

원문보다 정밀한 높이 비율, 점 좌표, 면적 polygon을 만들지 않는다.

따라서 이마 5부위의 `端正明淨` 연구는 region map research가 끝났어도 아직 사진 판정 대상이 아니다.

## 하관 세부 부위

642권의:

- 地閣
- 承漿
- 懸壁
- 燕頷

은 명칭과 해당 source expression은 존재하지만, 이번 source expression 자체가 정확한 사진 좌표 경계를 제공하지 않는다.

따라서 네 부위는:

`named_subregion_preserved_unresolved`

상태로 종료한다.

즉 **연구를 안 한 것이 아니라, 원전이 제공하지 않은 좌표를 발명하지 않는 것이 연구 결론**이다.

## 기타 지도

FR311S의 다음 구조는 source locator text 그대로 map research 객체로 보존한다.

- 五官
- 五嶽
- 四瀆
- 六府
- 三停 631
- 三停/三才 632
- 十三部位
- 十二宮
- 五星六曜

## 十二宮

numbered 12 palace set만 primary map으로 유지한다.

父母宮 supplement를 13번째 numbered palace에 삽입하지 않는다.

또한 source locator:

- 兩眉之間，山根之上
- 位居兩眼
- 位居兩眼下，名曰淚堂
- 位居地閣，重接水星
- 位居魚尾，號曰奸門
- 位居眉角，號曰天倉
- ...

등을 그대로 보존한다.

이를 임의 rectangle/polygon으로 만들지 않는다.

## 六府

source range 표현:

- 兩輔骨；自輔角至天倉
- 兩顴骨；自命門至虎耳
- 兩頤骨；自肩骨至地閣

은 source range로 보존한다.

끝점이 현대 landmark에서 어디인지 별도 권위 없이 지정하지 않는다.

## 권한 경계

전부 false:

- source text보다 더 정밀한 locator 생성
- cross-lineage canonical merge
- provider landmark direct alias
- screen-side = anatomical-side 가정
- invented coordinate
- invented polygon
- neutral geometry operationalization
- empirical validation
- automatic traditional binding
- threshold
- population norm
- product interpretation

## FR311X 종료 의미

17개 region-map 연구 항목은 **모두 연구 결론을 갖게 됐다.**

다만 그 결론에는 두 종류가 있다.

1. source text 수준의 map 정의 완료
2. 원전 자체가 좌표를 주지 않아 unresolved로 명시

둘 다 “누락”이 아니다.

다음 남은 FR311V 연구 lane은 **촬영 프로토콜 4건**이다.
