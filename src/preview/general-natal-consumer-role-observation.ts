import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ProductReadingResponse } from '../reading/product-reading-response.js';
import { buildNatalStructuralEvidence } from './natal-structural-evidence.js';

export const GENERAL_NATAL_CONSUMER_ROLE_OBSERVATION_VERSION =
  'saju-natal-n7-calculated-role-observation-v1' as const;
export const GENERAL_NATAL_ROLE_OBSERVATION_PREFIX =
  '계산에서 확인한 십신 위치: ' as const;

const PILLARS = ['year', 'month', 'day', 'hour'] as const;
const PILLAR_LABEL: Readonly<Record<(typeof PILLARS)[number], string>> = {
  year: '연주',
  month: '월주',
  day: '일주',
  hour: '시주',
};

/**
 * N7 Preview ONLY. The existing canonical calculator has already provided
 * this *same* snapshot to the governed Reading engine. Its resolved pillar
 * displays must match the delivered Reading before any fact is materialized.
 *
 * Ten-God observations are not research/Official semantic interpretations.
 * We never infer traits, outcomes, rankings, strength, Yong-Shen, or fortune.
 */
export function attachGeneralNatalCalculatedRoleObservation(
  response: ProductReadingResponse,
  snapshot: CanonicalSajuSnapshot,
): ProductReadingResponse {
  if (response.state !== 'delivered' && response.state !== 'delivered_with_fallback') {
    return response;
  }
  const reading = response.reading;
  if (reading === undefined || !reading.subject.birthInputDisplay.timeKnown) {
    return response;
  }

  const evidence = buildNatalStructuralEvidence(snapshot);
  if (evidence.birthTimeKnown !== true || evidence.mayPublish !== false ||
      evidence.mayInferStrength !== false) {
    return response;
  }

  // Guard the live response/snapshot pair, including canonical birth-time
  // uncertainty, before exposing any calculated role labels.
  for (const slot of PILLARS) {
    const pillar = evidence.pillars.find((entry) => entry.slot === slot);
    const display = reading.calculationSummary.pillars[slot];
    if (pillar?.state !== 'resolved' || display.status !== 'resolved' ||
        pillar.label === undefined || display.value !== pillar.label) {
      return response;
    }
  }

  const locations = evidence.tenGods.flatMap((item) => {
    if (item.state !== 'resolved' || item.value === undefined || item.value === '일간') {
      return [];
    }
    // The branch role is the calculator's representative branch label,
    // NOT a claim that all hidden stems share the same Ten God.
    return [`${PILLAR_LABEL[item.slot]} ${item.component === 'stem' ? '천간' : '지지 대표'} ${item.value}`];
  });
  if (locations.length === 0) return response;

  const text =
    `${GENERAL_NATAL_ROLE_OBSERVATION_PREFIX}${locations.join(' · ')}. ` +
    '이는 실제 원국에서 계산된 십신의 위치 기록이며, 이 정보만으로 성격·진로·재물·관계의 결과나 강약을 판단하지 않습니다.';

  if (reading.sections.some((section) => section.blocks.some(
    (block) => block.type === 'paragraph' &&
      block.text.startsWith(GENERAL_NATAL_ROLE_OBSERVATION_PREFIX),
  ))) {
    return response;
  }
  const sectionIndex = reading.sections.findIndex((section) =>
    section.state !== 'unavailable' &&
    section.title !== '해석 범위' &&
    section.title !== '프리뷰 안내' &&
    section.blocks.some((block) => block.type === 'paragraph'),
  );
  if (sectionIndex < 0) return response;

  return {
    ...response,
    reading: {
      ...reading,
      sections: reading.sections.map((section, index) =>
        index !== sectionIndex
          ? section
          : { ...section, blocks: [...section.blocks, { type: 'paragraph' as const, text }] }),
    },
  };
}
