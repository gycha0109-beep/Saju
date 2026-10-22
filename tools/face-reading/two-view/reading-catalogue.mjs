import { TRADITIONAL_MORPHOLOGY_TERMS_FR311 } from '../../../packages/face-reading/src/traditional-eyebrow-eye-interpretation-fr311.ts';
import { EYE_TERM_KEY } from './eye-direction.mjs';
// Source morphology only. Do not project historical outcome claims onto a photo.
export function readingCatalogue() {
  const term = TRADITIONAL_MORPHOLOGY_TERMS_FR311.find((t) => t.termKey === EYE_TERM_KEY);
  if (!term || term.directMetricBindingAuthorized !== false)
    throw Error('READING_SOURCE_CONTRACT_DRIFT');
  return {
    version: 'local-face-morphology-review@0.1.0',
    items: [
      {
        termKey: term.termKey,
        title: '눈꼬리 방향',
        sourceExpression: term.sourceExpression,
        sourceDescription: term.neutralGloss,
        sourceRefs: [...term.sourceRefs],
        verificationState: term.verificationState,
        traditionalBindingAuthorized: false,
        requiredObservation: '양쪽 눈의 안쪽·바깥쪽 끝의 상대 높이와 해당 끝점의 역할 확인',
        evidenceMeaning:
          '사진상 모델 경계의 방향을 관찰합니다. 문헌의 눈꼬리와 같은 위치인지는 별도 검토 대상입니다.',
      },
    ],
  };
}
