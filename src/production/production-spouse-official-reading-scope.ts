import {
  parseProductHostReadingRequest,
  ProductHostRequestError,
} from '../host/product-host.js';
import { normalizeConsumerReadingRequest } from '../reading/consumer-reading-request-adapter.js';
import { readingSectionForIntentV1 } from '../reading/consumer-reading-authority.js';

export const PRODUCTION_SPOUSE_OFFICIAL_READING_ALLOWED_SECTIONS =
  Object.freeze(['relationship:natal:spouse'] as const);

export type ProductionSpouseOfficialReadingSectionV1 =
  (typeof PRODUCTION_SPOUSE_OFFICIAL_READING_ALLOWED_SECTIONS)[number];

export function isProductionSpouseOfficialReadingSectionV1(
  section: string,
): section is ProductionSpouseOfficialReadingSectionV1 {
  return (
    PRODUCTION_SPOUSE_OFFICIAL_READING_ALLOWED_SECTIONS as readonly string[]
  ).includes(section);
}

export function assertProductionSpouseOfficialReadingRequestV1(
  body: unknown,
  requestId = 'production_spouse_scope_guard',
): void {
  const parsed = parseProductHostReadingRequest(body);
  if (parsed.reading.targetPersonRef !== undefined) {
    throw new ProductHostRequestError(
      'INVALID_READING_REQUEST',
      'The bounded spouse Production lane does not accept targetPersonRef.',
    );
  }

  const normalized = normalizeConsumerReadingRequest({
    requestId,
    text: parsed.reading.text,
  });
  const intent = normalized.request?.intent;
  const readingSection =
    normalized.state === 'resolved' && intent !== undefined
      ? readingSectionForIntentV1(intent)
      : undefined;

  if (
    readingSection === undefined ||
    !isProductionSpouseOfficialReadingSectionV1(readingSection)
  ) {
    throw new ProductHostRequestError(
      'INVALID_READING_REQUEST',
      'The bounded Production lane only accepts relationship:natal:spouse.',
    );
  }
}
