import type { ReadingDomain } from '../contracts/reading.js';
import {
  CHARACTER_GROUNDING_SCHEMA_VERSION,
  buildCharacterGroundingBundleV1,
  type CharacterGroundingBundleV1,
} from '../reading/character-grounding.js';

export const CHARACTER_GROUNDING_HTTP_PATH =
  '/api/character-grounding' as const;
export const CHARACTER_GROUNDING_ADMISSION_HEADER =
  'x-myeonghwa-character-grounding-admitted' as const;
export const CHARACTER_GROUNDING_ADMISSION_VERSION =
  CHARACTER_GROUNDING_SCHEMA_VERSION;

export class CharacterGroundingHttpRequestError extends TypeError {
  constructor(message: string) {
    super(message);
    this.name = 'CharacterGroundingHttpRequestError';
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function requireOnlyKeys(
  record: Record<string, unknown>,
  allowed: readonly string[],
): void {
  const allowedSet = new Set(allowed);
  const unexpected = Object.keys(record).find((key) => !allowedSet.has(key));
  if (unexpected !== undefined) {
    throw new CharacterGroundingHttpRequestError(
      `Character grounding request contains unexpected field: ${unexpected}.`,
    );
  }
}

function requireNonEmptyString(value: unknown, field: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new CharacterGroundingHttpRequestError(
      `${field} must be non-empty text.`,
    );
  }
  return value.trim();
}

export function projectCharacterGroundingHttpRequestV1(
  body: unknown,
): CharacterGroundingBundleV1 {
  if (!isRecord(body)) {
    throw new CharacterGroundingHttpRequestError(
      'Character grounding request body must be an object.',
    );
  }
  requireOnlyKeys(body, ['response', 'engineVersion', 'readingDomain']);

  const engineVersion = requireNonEmptyString(
    body.engineVersion,
    'engineVersion',
  );
  const readingDomain = requireNonEmptyString(
    body.readingDomain,
    'readingDomain',
  ) as ReadingDomain;

  try {
    return buildCharacterGroundingBundleV1({
      response: body.response,
      engineVersion,
      readingDomain,
    });
  } catch (error) {
    throw new CharacterGroundingHttpRequestError(
      error instanceof Error
        ? error.message
        : 'Character grounding request failed source-owned projection.',
    );
  }
}
