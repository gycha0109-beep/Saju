import { randomUUID } from 'node:crypto';
import type {
  BirthInput,
  CalendarType,
  CanonicalSajuSnapshot,
  SexForTraditionalCalculation,
} from '../contracts/calculation.js';
import type { NarrativePolicy } from '../contracts/narrative.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import type { ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import type { NarrativeModelAdapter } from '../llm/model-adapter.js';
import {
  requestProductReading,
  type ProductReadingServiceOptions,
} from '../reading/product-reading-service.js';
import type { ProductReadingResponse } from '../reading/product-reading-response.js';

export const PRODUCT_HOST_VERSION = 'myeonghwa-product-host-v1';

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

export interface ProductHostReadingRequest {
  text: string;
  targetPersonRef?: string;
}

export interface ProductHostReadingRequestBody {
  birth: ProductHostBirthRequest;
  reading: ProductHostReadingRequest;
}

export interface ProductHostExecutionContext {
  requestId: string;
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
  ) => ProductHostInterpretationBundle | Promise<ProductHostInterpretationBundle>;
  adapter: NarrativeModelAdapter;
  narrativePolicy: NarrativePolicy;
  readingOptions: ProductReadingServiceOptions;
  requestIdFactory?: () => string;
}

export interface MyeonghwaProductHost {
  requestReading(body: unknown): Promise<ProductReadingResponse>;
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

function parseReading(value: unknown): ProductHostReadingRequest {
  if (!isRecord(value)) {
    throw new ProductHostRequestError('INVALID_READING_REQUEST', 'reading must be an object.');
  }
  assertOnlyKeys(value, ['text', 'targetPersonRef'], 'INVALID_READING_REQUEST');
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
  return {
    text,
    ...(targetPersonRef === undefined || targetPersonRef.length === 0 ? {} : { targetPersonRef }),
  };
}

export function parseProductHostReadingRequest(body: unknown): ProductHostReadingRequestBody {
  if (!isRecord(body)) {
    throw new ProductHostRequestError('INVALID_REQUEST_BODY', 'Request body must be an object.');
  }
  assertOnlyKeys(body, ['birth', 'reading'], 'INVALID_REQUEST_BODY');
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
    reading: parseReading(body.reading),
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

function assertDependencies(dependencies: MyeonghwaProductHostDependencies): void {
  if (typeof dependencies.calculate !== 'function') throw new TypeError('calculate dependency is required.');
  if (typeof dependencies.interpret !== 'function') throw new TypeError('interpret dependency is required.');
  if (typeof dependencies.adapter?.generateStructured !== 'function') {
    throw new TypeError('narrative adapter dependency is required.');
  }
  if (dependencies.narrativePolicy === undefined || dependencies.readingOptions === undefined) {
    throw new TypeError('narrativePolicy and readingOptions dependencies are required.');
  }
}

export function createMyeonghwaProductHost(
  dependencies: MyeonghwaProductHostDependencies,
): MyeonghwaProductHost {
  assertDependencies(dependencies);
  return {
    async requestReading(body: unknown): Promise<ProductReadingResponse> {
      const parsed = parseProductHostReadingRequest(body);
      const requestId = nextRequestId(dependencies.requestIdFactory);
      const context = { requestId };
      const snapshot = await dependencies.calculate(toBirthInput(parsed.birth), context);
      const { interpretation, registry } = await dependencies.interpret(snapshot, context);
      return requestProductReading(
        snapshot,
        interpretation,
        registry,
        {
          requestId,
          text: parsed.reading.text,
          ...(parsed.reading.targetPersonRef === undefined
            ? {}
            : { targetPersonRef: parsed.reading.targetPersonRef }),
        },
        dependencies.adapter,
        dependencies.narrativePolicy,
        dependencies.readingOptions,
      );
    },
  };
}
