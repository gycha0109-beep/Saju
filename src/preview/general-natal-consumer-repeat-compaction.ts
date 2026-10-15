import type { ProductReadingResponse } from '../reading/product-reading-response.js';

export const GENERAL_NATAL_CONSUMER_REPEAT_COMPACTION_VERSION =
  'saju-natal-n9-consumer-exact-repeat-compaction-v1' as const;

/**
 * Opt-in General Natal Preview presentation only.
 *
 * A multi-claim ordinary insight block can repeat literally identical text
 * when distinct Research T8 observations share the same claim-owned wording.
 * The official semantic bundle / report / explainability remain unchanged:
 * the public ProductReadingResponse already intentionally carries no claim IDs.
 *
 * Compact only exact, same-block, same-section visible key-point copies.
 * Never merge scenario/contradiction, separate sections, boundary disclosures,
 * calculated facts, or nonidentical qualifications. A collapsed repeated
 * string is NOT evidence that the corresponding claims are semantically
 * interchangeable or that individualized meaning has improved.
 */
export function compactGeneralNatalConsumerRepeatedInsights(
  response: ProductReadingResponse,
): ProductReadingResponse {
  if (response.state !== 'delivered' && response.state !== 'delivered_with_fallback') {
    return response;
  }
  const reading = response.reading;
  if (reading === undefined) return response;

  let changed = false;
  const sections = reading.sections.map((section) => {
    if (section.title !== '주요 해석' || section.state !== 'complete') return section;
    const blocks = section.blocks.map((block) => {
      if (block.type !== 'key_points' || block.items.length < 2) return block;
      const seen = new Set<string>();
      const items = block.items.filter((item) => {
        if (seen.has(item)) {
          changed = true;
          return false;
        }
        seen.add(item);
        return true;
      });
      return items.length === block.items.length ? block : { ...block, items };
    });
    return { ...section, blocks };
  });
  if (!changed) return response;
  return { ...response, reading: { ...reading, sections } };
}
