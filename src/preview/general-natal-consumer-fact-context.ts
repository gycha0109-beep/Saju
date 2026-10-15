import type {
  ProductReadingResponse,
  ProductReadingResponseDisplayFact,
} from '../reading/product-reading-response.js';

export const GENERAL_NATAL_CONSUMER_FACT_CONTEXT_VERSION =
  'saju-general-natal-consumer-fact-context-n5-v1' as const;

function resolvedPillar(fact: ProductReadingResponseDisplayFact): string | undefined {
  return fact.status === 'resolved' && fact.value?.trim()
    ? fact.value.trim()
    : undefined;
}

/**
 * Add *calculation facts* inside an existing General Natal Preview reading.
 *
 * The paragraph is not an interpretation claim: it connects already admitted
 * consumer text with its actual calculated birth chart, without treating
 * research-only Ten-God themes, strength, geju or yongshin as approved meaning.
 * Both the existing semantic body and its authorization state remain intact.
 */
export function attachGeneralNatalCalculatedContext(
  response: ProductReadingResponse,
): ProductReadingResponse {
  if (response.state !== 'delivered' && response.state !== 'delivered_with_fallback') {
    return response;
  }
  const reading = response.reading;
  if (reading === undefined) return response;

  const { pillars } = reading.calculationSummary;
  const day = resolvedPillar(pillars.day);
  const month = resolvedPillar(pillars.month);
  if (day === undefined || month === undefined) return response;

  const year = resolvedPillar(pillars.year);
  const hour = reading.subject.birthInputDisplay.timeKnown
    ? resolvedPillar(pillars.hour)
    : undefined;
  if (reading.subject.birthInputDisplay.timeKnown && hour === undefined) {
    // Do not bind a definite-hour interpretation to ambiguous hour evidence.
    return response;
  }

  const pillarContext = [
    ...(year === undefined ? [] : [`연주 ${year}`]),
    `월주 ${month}`,
    `일주 ${day}`,
    ...(hour === undefined ? [] : [`시주 ${hour}`]),
  ].join(' · ');
  const text =
    `이 사주풀이가 실제로 참조한 명식은 ${pillarContext}입니다. ` +
    (reading.subject.birthInputDisplay.timeKnown
      ? '같은 생일이라도 출생시각에 따라 시주와 그에 연관된 관측 구조가 달라질 수 있습니다. '
      : '출생시각을 알 수 없어 시주를 확정하지 않았습니다. ') +
    '아래 내용은 현재 허용된 해석 범위에서 읽고, 이 계산 사실만으로 성격·길흉·미래 결과를 단정하지 않습니다.';

  const targetIndex = reading.sections.findIndex(
    (section) =>
      section.state !== 'unavailable' &&
      section.blocks.length > 0 &&
      section.title !== '해석 범위' &&
      section.title !== '프리뷰 안내',
  );
  if (targetIndex < 0) return response;

  if (reading.sections.some((section) =>
    section.blocks.some((block) => block.type === 'paragraph' && block.text === text)
  )) {
    return response;
  }

  const sections = reading.sections.map((section, index) =>
    index !== targetIndex
      ? section
      : {
          ...section,
          blocks: [
            ...section.blocks.slice(0, 1),
            { type: 'paragraph' as const, text },
            ...section.blocks.slice(1),
          ],
        },
  );
  // No new claims, sections, reading authority, scope, state or IDs.
  return {
    ...response,
    reading: {
      ...reading,
      sections,
    },
  };
}
