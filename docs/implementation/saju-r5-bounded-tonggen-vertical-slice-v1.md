# SAJU-R5 bounded 通根 세로 슬라이스 v1

이슈: #2028

## 목적

R5는 R2/R3/R4 이후 첫 bounded 通根 실행 경로다.

새 通根 판정식을 만들지 않는다. 이미 승인된 root evaluator와 bounded 通根 bridge를 실제 엔진 입력으로 연결한다.

## 실행 경로

```
CanonicalSajuSnapshot
  -> R2 bounded root ResearchEvidence 재생성
  -> R2 positive root observation별 기존 root evaluator 재실행
  -> 기존 bounded 通根 bridge
  -> SHARED_NATAL_BOUNDED_TONGGEN_EVIDENCE
  -> DAY_MASTER_BOUNDED_TONGGEN_EVIDENCE
```

## R2 일치 조건

R5는 R4의 압축된 root claim을 通根으로 다시 해석하지 않는다.

각 R5 positive 通根 관측은 먼저 R2 bounded root evidence에 동일한 pillar/root-kind positive가 존재해야 한다.

그 뒤 다음 기존 bridge를 실제로 통과해야 한다.

- 旺 -> governed Wang bridge
- governed Yang 長生 -> governed Changsheng bridge
- governed four-Yang 祿 -> governed Lu bridge
- non-Earth 墓庫/餘氣 -> governed Muku/Yuqi bridge

R2 positive 관측 하나라도 현재 bounded 通根 bridge와 정확히 대응하지 않으면 R5 evidence 생성은 `tonggen-evidence-r2-root-parity-unresolved`로 중단한다.

## 증거 의미

`SHARED_NATAL_BOUNDED_TONGGEN_EVIDENCE`의 positive 관측은 다음만 뜻한다.

> 현재 승인된 bounded source scope에서 通根 positive가 관측되었다.

payload는 exact R2 upstream envelope ID, definition ref, evidence type/version, payload hash를 고정한다.

## 명시적 비권한

R5는 다음을 만들지 않는다.

- bounded evidence 없음 -> 전역 不通根
- 無根
- canonical 四柱有根
- 通根 관측 개수 의미
- pillar 위치 가중치
- 通根扶助 support constituent 확정
- 黨眾 / 助寡
- 強 / 不弱 / 최종 強弱
- 최종 旺衰
- 숫자 강도 점수
- 格局
- Narrative
- Preview / Official / public semantic
- Production

Yin 長生, Yin 祿, Earth 祿, Earth 餘氣의 미해결 경계도 그대로 보존한다.

## T2 claim

claim type:

`DAY_MASTER_BOUNDED_TONGGEN_EVIDENCE`

조건:

`tonggenObserved === true`

claim 값은 positive observation only이며 전역 不通根, 四柱有根, 黨眾/助寡, 強弱/旺衰, 格局을 모두 `not_determined`로 보존한다.

valid R5 envelope이지만 positive 관측이 없으면 rule은 `not_matched`이고 claim은 0개다.

R5 evidence 자체가 없으면 `skipped_missing_input`으로 fail-close한다.

## 제품 경계

research pack 전용이다.

기존 registry는 research-evidence 입력을 소비하는 이 rule을 Production pack에 넣는 것을 계속 거부한다.

외부 사람/전문가 검토는 요구하지 않는다.

## 다음 단계

R6는 기존에 이미 승인된 `bounded 通根 -> 通根扶助 support constituent` 의미를 엔진 surface로 올릴 수 있다.

단, R6에서도:

```
support constituent
!= 黨眾 확정
!= 助寡 확정
!= 強弱/旺衰
```

경계를 유지해야 한다.
