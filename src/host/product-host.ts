import { randomUUID } from 'node:crypto';
import {
  NATAL_FIVE_DOMAIN_PRODUCT_ORDER,
  assembleNatalFiveDomainProductResponses,
  type NatalFiveDomainProductBundle,
} from '../reading/natal-five-domain-product-service.js';

import type {
  BirthInput,
  CalendarType,
  CanonicalSajuSnapshot,
  SexForTraditionalCalculation,
} from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import type { ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  normalizeConsumerReadingRequest,
  type ConsumerReadingRequestInput,
} from '../reading/consumer-reading-request-adapter.js';
import { buildAnnualInterpretationFacts } from '../reading/annual-interpretation-facts.js';
import { buildMonthlyInterpretationFacts } from '../reading/monthly-interpretation-facts.js';
import {
  buildTemporalReadingContext,
  type TemporalReadingContext,
} from '../reading/temporal-reading-context.js';
import {
  runProductReadingInternals,
  type ProductReadingServiceOptions,
} from '../reading/product-reading-service.js';
import {
  inspectSourceReadingProofReadinessV1,
  type SourceReadingProofReadinessV1,
} from '../reading/source-reading-proof-readiness.js';
import type { LegacyNarrativeRuntimeV1 } from '../reading/governed-reading-execution.js';
import type { ProductReadingResponse } from '../reading/product-reading-response.js';
import {
  resolveReadingLocaleV1,
  type ReadingLocaleV1,
} from '../reading/reading-localization.js';

export const PRODUCT_HOST_VERSION = 'myeonghwa-product-host-v3';

const MAX_READING_TEXT_LENGTH = 200;
const MAX_TARGET_PERSON_REF_LENGTH = 200;

export type ProductHostRequestErrorCode =
  | 'INVALID_REQUEST_BODY'
  | 'INVALID_BIRTH_INPUT'
  | 'INVALID_READING_REQUEST';

export class ProductHostRequestError extends Error {
  readonly code: ProductHostRequestErrorCode;

  constructor(code: ProductHostRequestErrorCode, message: string) {
    super(message);
    this.name = 'ProductHostRequestError';
    this.code = code;
  }
}

export interface ProductHostBirthRequest {
  calendarType: CalendarType;
  date: string;
  time?: string | null;
  isLeapMonth?: boolean;
  sex?: SexForTraditionalCalculation;
}

export type ProductHostPreferredDetail = NonNullable<
  NonNullable<ReadingRequest['outputPreferences']>['preferredDetail']
>;

export interface ProductHostReadingOutputPreferences {
  preferredDetail: ProductHostPreferredDetail;
}

export interface ProductHostReadingRequest {
  text: string;
  targetPersonRef?: string;
  outputPreferences?: ProductHostReadingOutputPreferences;
  /** Currently admitted reading language. Other catalog languages are not yet renderable. */
  readingLocale?: 'ko-KR';
}

export interface ProductHostReadingRequestBody {
  birth: ProductHostBirthRequest;
  reading: ProductHostReadingRequest;
  /** UI language is independent of the reading output language. */
  uiLocale?: ReadingLocaleV1;
}

export interface ProductHostExecutionContext {
  requestId: string;
  requestedAt: string;
}

export interface ProductHostInterpretationRequestContext {
  readingRequest: ReadingRequest;
  temporalContext: TemporalReadingContext;
  temporalFacts: Readonly<Record<string, unknown>>;
}

export interface ProductHostInterpretationBundle {
  registry: ResolvedRuleRegistrySnapshot;
  interpretation: InterpretationExecutionResult;
}

export interface MyeonghwaProductHostDependencies {
  calculate: (
    input: BirthInput,
    context: ProductHostExecutionContext,
  ) => CanonicalSajuSnapshot | Promise<CanonicalSajuSnapshot>;
  interpret: (
    snapshot: CanonicalSajuSnapshot,
    context: ProductHostExecutionContext,
    requestContext?: ProductHostInterpretationRequestContext,
    resolvedReadingRequest?: ReadingRequest,
  ) => ProductHostInterpretationBundle | Promise<ProductHostInterpretationBundle>;
  readingOptions: ProductReadingServiceOptions;
  /** Optional request-bound execution metadata; must not change reading authority. */
  readingOptionsForRequest?: (
    context: ProductHostExecutionContext,
  ) => ProductReadingServiceOptions;
  legacyNarrativeRuntime?: LegacyNarrativeRuntimeV1;
  requestIdFactory?: () => string;
  requestNowFactory?: () => Date;
}

export interface MyeonghwaProductHost {
  requestReading(body: unknown): Promise<ProductReadingResponse>;
  /**
   * Preview-only batch. The production reading route never admits this method.
   * Optional for external/mocked hosts implementing the older interface.
   */
  requestNatalFiveDomains?(body: unknown): Promise<NatalFiveDomainProductBundle>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function assertOnlyKeys(
  record: Record<string, unknown>,
  allowed: readonly string[],
  code: ProductHostRequestErrorCode,
): void {
  const allowedKeys = new Set(allowed);
  const unexpected = Object.keys(record).filter((key) => !allowedKeys.has(key));
  if (unexpected.length > 0) {
    throw new ProductHostRequestError(code, `Unexpected field: ${unexpected.sort()[0]}`);
  }
}

function parseDate(value: unknown, calendarType: CalendarType): BirthInput['date'] {
  if (typeof value !== 'string') {
    throw new ProductHostRequestError('INVALID_BIRTH_INPUT', 'birth.date must be YYYY-MM-DD.');
  }
  const match = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(value);
  if (match === null) {
    throw new ProductHostRequestError('INVALID_BIRTH_INPUT', 'birth.date must be YYYY-MM-DD.');
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (!Number.isInteger(year) || year < 1 || month < 1 || month > 12 || day < 1) {
    throw new ProductHostRequestError('INVALID_BIRTH_INPUT', 'birth.date is outside the supported shape.');
  }

  if (calendarType === 'lunar') {
    if (day > 30) {
      throw new ProductHostRequestError('INVALID_BIRTH_INPUT', 'A lunar birth day must be between 1 and 30.');
    }
    return { year, month, day };
  }

  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new ProductHostRequestError('INVALID_BIRTH_INPUT', 'birth.date is not a valid solar date.');
  }
  return { year, month, day };
}

function parseTime(value: unknown): BirthInput['time'] {
  if (value === undefined || value === null || value === '') return { known: false };
  if (typeof value !== 'string') {
    throw new ProductHostRequestError('INVALID_BIRTH_INPUT', 'birth.time must be HH:MM or null.');
  }
  const match = /^(\d{2}):(\d{2})$/u.exec(value);
  if (match === null) {
    throw new ProductHostRequestError('INVALID_BIRTH_INPUT', 'birth.time must be HH:MM or null.');
  }
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    throw new ProductHostRequestError('INVALID_BIRTH_INPUT', 'birth.time is outside the 24-hour clock.');
  }
  return { known: true, hour, minute };
}

function parseCalendarType(value: unknown): CalendarType {
  if (value === 'solar' || value === 'lunar') return value;
  throw new ProductHostRequestError('INVALID_BIRTH_INPUT', 'birth.calendarType must be solar or lunar.');
}

function parseSex(value: unknown): SexForTraditionalCalculation | undefined {
  if (value === undefined) return undefined;
  if (value === 'male' || value === 'female' || value === 'unspecified') return value;
  throw new ProductHostRequestError('INVALID_BIRTH_INPUT', 'birth.sex is invalid.');
}

function parseBirth(value: unknown): BirthInput {
  if (!isRecord(value)) {
    throw new ProductHostRequestError('INVALID_BIRTH_INPUT', 'birth must be an object.');
  }
  assertOnlyKeys(
    value,
    ['calendarType', 'date', 'time', 'isLeapMonth', 'sex'],
    'INVALID_BIRTH_INPUT',
  );
  const calendarType = parseCalendarType(value.calendarType);
  const isLeapMonth = value.isLeapMonth;
  if (isLeapMonth !== undefined && typeof isLeapMonth !== 'boolean') {
    throw new ProductHostRequestError('INVALID_BIRTH_INPUT', 'birth.isLeapMonth must be boolean.');
  }
  if (calendarType === 'solar' && isLeapMonth === true) {
    throw new ProductHostRequestError(
      'INVALID_BIRTH_INPUT',
      'birth.isLeapMonth may only be true for lunar input.',
    );
  }
  const sex = parseSex(value.sex);
  return {
    calendarType,
    date: parseDate(value.date, calendarType),
    time: parseTime(value.time),
    ...(calendarType === 'lunar' && isLeapMonth !== undefined ? { isLeapMonth } : {}),
    ...(sex === undefined ? {} : { sexForTraditionalCalculation: sex }),
  };
}

function parseReadingOutputPreferences(
  value: unknown,
): ProductHostReadingOutputPreferences | undefined {
  if (value === undefined) return undefined;
  if (!isRecord(value)) {
    throw new ProductHostRequestError(
      'INVALID_READING_REQUEST',
      'reading.outputPreferences must be an object.',
    );
  }
  assertOnlyKeys(
    value,
    ['preferredDetail'],
    'INVALID_READING_REQUEST',
  );
  if (
    value.preferredDetail !== 'concise' &&
    value.preferredDetail !== 'standard' &&
    value.preferredDetail !== 'detailed'
  ) {
    throw new ProductHostRequestError(
      'INVALID_READING_REQUEST',
      'reading.outputPreferences.preferredDetail must be concise, standard, or detailed.',
    );
  }
  return { preferredDetail: value.preferredDetail };
}

function parseUiLocale(value: unknown): ReadingLocaleV1 | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== 'string') {
    throw new ProductHostRequestError('INVALID_REQUEST_BODY', 'uiLocale must be a locale identifier.');
  }
  try {
    return resolveReadingLocaleV1({ uiLocale: value });
  } catch {
    throw new ProductHostRequestError('INVALID_REQUEST_BODY', 'uiLocale is not in the supported locale catalog.');
  }
}

function admitKoreanReadingLocale(
  value: unknown,
  uiLocale: ReadingLocaleV1 | undefined,
): 'ko-KR' | undefined {
  if (value !== undefined && typeof value !== 'string') {
    throw new ProductHostRequestError('INVALID_READING_REQUEST', 'readingLocale must be a locale identifier.');
  }
  let requested: ReadingLocaleV1;
  try {
    requested = resolveReadingLocaleV1({
      ...(value === undefined ? {} : { readingLocale: value as string }),
      ...(uiLocale === undefined ? {} : { uiLocale }),
    });
  } catch {
    throw new ProductHostRequestError('INVALID_READING_REQUEST', 'readingLocale is not in the supported locale catalog.');
  }
  if (requested !== 'ko-KR') {
    throw new ProductHostRequestError(
      'INVALID_READING_REQUEST',
      'The requested reading language is not available yet. Explicit ko-KR is required for Korean readings.',
    );
  }
  return value === undefined ? undefined : 'ko-KR';
}

function parseReading(
  value: unknown,
  uiLocale?: ReadingLocaleV1,
): ProductHostReadingRequest {
  if (!isRecord(value)) {
    throw new ProductHostRequestError('INVALID_READING_REQUEST', 'reading must be an object.');
  }
  assertOnlyKeys(
    value,
    ['text', 'targetPersonRef', 'outputPreferences', 'readingLocale'],
    'INVALID_READING_REQUEST',
  );
  if (typeof value.text !== 'string') {
    throw new ProductHostRequestError('INVALID_READING_REQUEST', 'reading.text must be a string.');
  }
  const text = value.text.trim();
  if (text.length === 0 || text.length > MAX_READING_TEXT_LENGTH) {
    throw new ProductHostRequestError(
      'INVALID_READING_REQUEST',
      `reading.text must contain 1-${MAX_READING_TEXT_LENGTH} characters.`,
    );
  }
  if (value.targetPersonRef !== undefined && typeof value.targetPersonRef !== 'string') {
    throw new ProductHostRequestError(
      'INVALID_READING_REQUEST',
      'reading.targetPersonRef must be a string.',
    );
  }
  const targetPersonRef =
    typeof value.targetPersonRef === 'string' ? value.targetPersonRef.trim() : undefined;
  if (targetPersonRef !== undefined && targetPersonRef.length > MAX_TARGET_PERSON_REF_LENGTH) {
    throw new ProductHostRequestError(
      'INVALID_READING_REQUEST',
      `reading.targetPersonRef must not exceed ${MAX_TARGET_PERSON_REF_LENGTH} characters.`,
    );
  }
  const outputPreferences = parseReadingOutputPreferences(
    value.outputPreferences,
  );
  const readingLocale = admitKoreanReadingLocale(value.readingLocale, uiLocale);
  return {
    text,
    ...(targetPersonRef === undefined || targetPersonRef.length === 0
      ? {}
      : { targetPersonRef }),
    ...(outputPreferences === undefined ? {} : { outputPreferences }),
    ...(readingLocale === undefined ? {} : { readingLocale }),
  };
}

export function parseProductHostCalculationRequest(body: unknown): BirthInput {
  if (!isRecord(body)) {
    throw new ProductHostRequestError('INVALID_REQUEST_BODY', 'Request body must be an object.');
  }
  assertOnlyKeys(body, ['birth'], 'INVALID_REQUEST_BODY');
  return parseBirth(body.birth);
}

export function parseProductHostReadingRequest(body: unknown): ProductHostReadingRequestBody {
  if (!isRecord(body)) {
    throw new ProductHostRequestError('INVALID_REQUEST_BODY', 'Request body must be an object.');
  }
  assertOnlyKeys(body, ['birth', 'reading', 'uiLocale'], 'INVALID_REQUEST_BODY');
  const uiLocale = parseUiLocale(body.uiLocale);
  const reading = parseReading(body.reading, uiLocale);
  return {
    birth: (() => {
      const parsed = parseBirth(body.birth);
      return {
        calendarType: parsed.calendarType,
        date: `${String(parsed.date.year).padStart(4, '0')}-${String(parsed.date.month).padStart(2, '0')}-${String(parsed.date.day).padStart(2, '0')}`,
        ...(parsed.time.known
          ? { time: `${String(parsed.time.hour).padStart(2, '0')}:${String(parsed.time.minute).padStart(2, '0')}` }
          : { time: null }),
        ...(parsed.isLeapMonth === undefined ? {} : { isLeapMonth: parsed.isLeapMonth }),
        ...(parsed.sexForTraditionalCalculation === undefined
          ? {}
          : { sex: parsed.sexForTraditionalCalculation }),
      };
    })(),
    reading,
    ...(uiLocale === undefined ? {} : { uiLocale }),
  };
}

/** Strict preview batch request: one birth input, no untrusted reading selector. */
function parseNatalFiveDomainRequest(body: unknown): {
  birth: BirthInput;
  outputPreferences?: ProductHostReadingOutputPreferences;
} {
  if (!isRecord(body)) {
    throw new ProductHostRequestError('INVALID_REQUEST_BODY', 'Request body must be an object.');
  }
  assertOnlyKeys(body, ['birth', 'outputPreferences', 'uiLocale', 'readingLocale'], 'INVALID_REQUEST_BODY');
  const uiLocale = parseUiLocale(body.uiLocale);
  admitKoreanReadingLocale(body.readingLocale, uiLocale);
  const birth = parseBirth(body.birth);
  const outputPreferences = parseReadingOutputPreferences(body.outputPreferences);
  return {
    birth,
    ...(outputPreferences === undefined ? {} : { outputPreferences }),
  };
}

function toBirthInput(parsed: ProductHostBirthRequest): BirthInput {
  const calendarType = parseCalendarType(parsed.calendarType);
  return {
    calendarType,
    date: parseDate(parsed.date, calendarType),
    time: parseTime(parsed.time),
    ...(calendarType === 'lunar' && parsed.isLeapMonth !== undefined
      ? { isLeapMonth: parsed.isLeapMonth }
      : {}),
    ...(parsed.sex === undefined ? {} : { sexForTraditionalCalculation: parsed.sex }),
  };
}

function nextRequestId(factory: (() => string) | undefined): string {
  const requestId = (factory ?? randomUUID)().trim();
  if (requestId.length === 0) throw new Error('Product host requestIdFactory returned an empty id.');
  return `host_${requestId}`;
}

function nextRequestedAt(factory: (() => Date) | undefined): string {
  const value = (factory ?? (() => new Date()))();
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
    throw new Error('Product host requestNowFactory returned an invalid date.');
  }
  return value.toISOString();
}

function consumerInput(
  parsed: ProductHostReadingRequestBody,
  context: ProductHostExecutionContext,
): ConsumerReadingRequestInput {
  return {
    requestId: context.requestId,
    text: parsed.reading.text,
    referenceDateTime: context.requestedAt,
    ...(parsed.reading.targetPersonRef === undefined
      ? {}
      : { targetPersonRef: parsed.reading.targetPersonRef }),
    ...(parsed.reading.outputPreferences === undefined
      ? {}
      : { outputPreferences: parsed.reading.outputPreferences }),
  };
}

function temporalInterpretationContext(
  readingRequest: ReadingRequest | undefined,
  snapshot: CanonicalSajuSnapshot,
): ProductHostInterpretationRequestContext | undefined {
  if (readingRequest === undefined) return undefined;
  const temporalContext = buildTemporalReadingContext(readingRequest);
  if (temporalContext === undefined) return undefined;
  const temporalFacts =
    temporalContext.scope === 'annual'
      ? { ...buildAnnualInterpretationFacts(snapshot, temporalContext) }
      : { ...buildMonthlyInterpretationFacts(snapshot, temporalContext) };
  return {
    readingRequest,
    temporalContext,
    temporalFacts,
  };
}

function assertDependencies(dependencies: MyeonghwaProductHostDependencies): void {
  if (typeof dependencies.calculate !== 'function') throw new TypeError('calculate dependency is required.');
  if (typeof dependencies.interpret !== 'function') throw new TypeError('interpret dependency is required.');
  if (dependencies.readingOptions === undefined) {
    throw new TypeError('readingOptions dependency is required.');
  }
  if (dependencies.readingOptionsForRequest !== undefined
    && typeof dependencies.readingOptionsForRequest !== 'function') {
    throw new TypeError('readingOptionsForRequest must be a function when provided.');
  }
  if (dependencies.requestNowFactory !== undefined && typeof dependencies.requestNowFactory !== 'function') {
    throw new TypeError('requestNowFactory must be a function when provided.');
  }
}

/** Saju-internal only; not exported by the consumer product-host entrypoint. */
export interface MyeonghwaSourceReadingProofHost {
  requestReadingWithProofReadiness(body: unknown): Promise<{
    readonly response: ProductReadingResponse;
    readonly readiness: SourceReadingProofReadinessV1;
    /** Parsed and normalized by the Saju host for this same execution. */
    readonly executedRequestBody: ProductHostReadingRequestBody;
  }>;
}

async function runProductHostReadingInternals(
  dependencies: MyeonghwaProductHostDependencies,
  body: unknown,
) {
  const parsed = parseProductHostReadingRequest(body);
  const requestId = nextRequestId(dependencies.requestIdFactory);
  const context: ProductHostExecutionContext = {
    requestId,
    requestedAt: nextRequestedAt(dependencies.requestNowFactory),
  };
  const input = consumerInput(parsed, context);
  const normalization = normalizeConsumerReadingRequest(input);
  const resolvedReadingRequest =
    normalization.state === 'resolved' ? normalization.request : undefined;
  const snapshot = await dependencies.calculate(toBirthInput(parsed.birth), context);
  const requestContext = temporalInterpretationContext(resolvedReadingRequest, snapshot);
  // Give governed interpretation the same resolved intent used for temporal facts.
  // This does not authorize unresolved, unadmitted, or research-only readings.
  const { interpretation, registry } = await dependencies.interpret(
    snapshot, context, requestContext, resolvedReadingRequest,
  );
  const reading = await runProductReadingInternals(
    snapshot,
    interpretation,
    registry,
    input,
    dependencies.readingOptionsForRequest?.(context) ?? dependencies.readingOptions,
    dependencies.legacyNarrativeRuntime,
  );
  return { executedRequestBody: parsed, snapshot, interpretation, registry, ...reading };
}

export function createMyeonghwaProductHost(
  dependencies: MyeonghwaProductHostDependencies,
): MyeonghwaProductHost {
  assertDependencies(dependencies);
  return {
    async requestReading(body: unknown): Promise<ProductReadingResponse> {
      return (await runProductHostReadingInternals(dependencies, body)).response;
    },
  };
}

/** Dedicated Preview-only batch host. Does not widen the frozen public ProductHost facade. */
export function createMyeonghwaPreviewNatalFiveDomainHost(
  dependencies: MyeonghwaProductHostDependencies,
): Required<Pick<MyeonghwaProductHost, 'requestNatalFiveDomains'>> {
  assertDependencies(dependencies);
  return {
    async requestNatalFiveDomains(body: unknown): Promise<NatalFiveDomainProductBundle> {
      const parsed = parseNatalFiveDomainRequest(body);
      const context: ProductHostExecutionContext = {
        requestId: nextRequestId(dependencies.requestIdFactory),
        requestedAt: nextRequestedAt(dependencies.requestNowFactory),
      };
      // One birth calculation; each domain independently re-enters governed
      // interpretation, preventing one domain-specific rule-set from being
      // accidentally reused as authority for another.
      const snapshot = await dependencies.calculate(parsed.birth, context);
      const responses: ProductReadingResponse[] = [];
      for (const topic of NATAL_FIVE_DOMAIN_PRODUCT_ORDER) {
        const domainContext: ProductHostExecutionContext = {
          ...context,
          requestId: context.requestId + ':' + topic.domain,
        };
        const input: ConsumerReadingRequestInput = {
          requestId: domainContext.requestId,
          text: topic.requestText,
          referenceDateTime: context.requestedAt,
          ...(parsed.outputPreferences === undefined
            ? {}
            : { outputPreferences: parsed.outputPreferences }),
        };
        const normalization = normalizeConsumerReadingRequest(input);
        if (normalization.state !== 'resolved' || normalization.request === undefined) {
          throw new TypeError('Governed natal domain profile is unavailable: ' + topic.domain);
        }
        const { interpretation, registry } = await dependencies.interpret(
          snapshot, domainContext, undefined, normalization.request,
        );
        const result = await runProductReadingInternals(
          snapshot,
          interpretation,
          registry,
          input,
          dependencies.readingOptionsForRequest?.(domainContext) ?? dependencies.readingOptions,
          dependencies.legacyNarrativeRuntime,
        );
        responses.push(result.response);
      }
      return assembleNatalFiveDomainProductResponses(snapshot, responses);
    },
  };
}

/** The future service-authenticated HTTP issuer may call only this server-side seam. */
export function createMyeonghwaSourceReadingProofHost(
  dependencies: MyeonghwaProductHostDependencies,
): MyeonghwaSourceReadingProofHost {
  assertDependencies(dependencies);
  return {
    async requestReadingWithProofReadiness(body: unknown) {
      const run = await runProductHostReadingInternals(dependencies, body);
      const readiness = inspectSourceReadingProofReadinessV1(run);
      return { response: run.response, readiness, executedRequestBody: run.executedRequestBody };
    },
  };
}
