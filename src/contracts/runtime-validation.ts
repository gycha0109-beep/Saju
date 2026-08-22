import type { BirthInput, CalculationPolicySnapshot } from './calculation.js';

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function assertIntegerInRange(
  value: unknown,
  field: string,
  minimum: number,
  maximum: number,
): asserts value is number {
  if (!Number.isInteger(value) || (value as number) < minimum || (value as number) > maximum) {
    throw new RangeError(`${field} must be an integer between ${minimum} and ${maximum}.`);
  }
}

function assertOptionalFiniteNumber(value: unknown, field: string): void {
  if (value !== undefined && (typeof value !== 'number' || !Number.isFinite(value))) {
    throw new TypeError(`${field} must be a finite number when provided.`);
  }
}

function assertOptionalString(value: unknown, field: string): void {
  if (value !== undefined && (typeof value !== 'string' || value.trim().length === 0)) {
    throw new TypeError(`${field} must be a non-empty string when provided.`);
  }
}

export function assertBirthInput(value: unknown): asserts value is BirthInput {
  if (!isRecord(value)) {
    throw new TypeError('BirthInput must be an object.');
  }

  if (value.calendarType !== 'solar' && value.calendarType !== 'lunar') {
    throw new TypeError('BirthInput.calendarType must be solar or lunar.');
  }

  if (!isRecord(value.date)) {
    throw new TypeError('BirthInput.date must be an object.');
  }

  if (!Number.isInteger(value.date.year)) {
    throw new TypeError('BirthInput.date.year must be an integer.');
  }
  assertIntegerInRange(value.date.month, 'BirthInput.date.month', 1, 12);
  assertIntegerInRange(value.date.day, 'BirthInput.date.day', 1, 31);

  if (!isRecord(value.time) || typeof value.time.known !== 'boolean') {
    throw new TypeError('BirthInput.time must declare a boolean known state.');
  }

  if (value.time.known) {
    assertIntegerInRange(value.time.hour, 'BirthInput.time.hour', 0, 23);
    assertIntegerInRange(value.time.minute, 'BirthInput.time.minute', 0, 59);
  } else if ('hour' in value.time || 'minute' in value.time) {
    throw new TypeError('Unknown birth time must not contain fabricated hour or minute values.');
  }

  if (value.isLeapMonth !== undefined && typeof value.isLeapMonth !== 'boolean') {
    throw new TypeError('BirthInput.isLeapMonth must be a boolean when provided.');
  }

  if (value.isLeapMonth === true && value.calendarType !== 'lunar') {
    throw new TypeError('BirthInput.isLeapMonth can only be true for lunar input.');
  }

  const sex = value.sexForTraditionalCalculation;
  if (sex !== undefined && sex !== 'male' && sex !== 'female' && sex !== 'unspecified') {
    throw new TypeError('BirthInput.sexForTraditionalCalculation is invalid.');
  }

  if (value.birthplace !== undefined) {
    if (!isRecord(value.birthplace)) {
      throw new TypeError('BirthInput.birthplace must be an object when provided.');
    }

    assertOptionalString(value.birthplace.label, 'BirthInput.birthplace.label');
    assertOptionalString(value.birthplace.countryCode, 'BirthInput.birthplace.countryCode');
    assertOptionalString(value.birthplace.timeZone, 'BirthInput.birthplace.timeZone');
    assertOptionalFiniteNumber(value.birthplace.latitude, 'BirthInput.birthplace.latitude');
    assertOptionalFiniteNumber(value.birthplace.longitude, 'BirthInput.birthplace.longitude');

    if (
      typeof value.birthplace.latitude === 'number' &&
      (value.birthplace.latitude < -90 || value.birthplace.latitude > 90)
    ) {
      throw new RangeError('BirthInput.birthplace.latitude must be between -90 and 90.');
    }

    if (
      typeof value.birthplace.longitude === 'number' &&
      (value.birthplace.longitude < -180 || value.birthplace.longitude > 180)
    ) {
      throw new RangeError('BirthInput.birthplace.longitude must be between -180 and 180.');
    }
  }
}

export function assertCalculationPolicySnapshot(
  value: unknown,
): asserts value is CalculationPolicySnapshot {
  if (!isRecord(value)) {
    throw new TypeError('CalculationPolicySnapshot must be an object.');
  }

  assertOptionalString(value.policyId, 'CalculationPolicySnapshot.policyId');
  assertOptionalString(value.policyVersion, 'CalculationPolicySnapshot.policyVersion');

  if (typeof value.policyId !== 'string' || typeof value.policyVersion !== 'string') {
    throw new TypeError('CalculationPolicySnapshot requires policyId and policyVersion.');
  }

  if (
    value.dayBoundary !== 'midnight' &&
    value.dayBoundary !== 'jasi' &&
    value.dayBoundary !== 'splitJasi'
  ) {
    throw new TypeError('CalculationPolicySnapshot.dayBoundary is invalid.');
  }

  if (!isRecord(value.trueSolarTime)) {
    throw new TypeError('CalculationPolicySnapshot.trueSolarTime must be an object.');
  }

  if (
    typeof value.trueSolarTime.enabled !== 'boolean' ||
    typeof value.trueSolarTime.applyEquationOfTime !== 'boolean' ||
    typeof value.trueSolarTime.applyHistoricalDst !== 'boolean'
  ) {
    throw new TypeError('CalculationPolicySnapshot.trueSolarTime boolean options are invalid.');
  }

  const longitudeSource = value.trueSolarTime.longitudeSource;
  if (
    longitudeSource !== 'birthplace' &&
    longitudeSource !== 'manual' &&
    longitudeSource !== 'default' &&
    longitudeSource !== 'not-applicable'
  ) {
    throw new TypeError('CalculationPolicySnapshot.trueSolarTime.longitudeSource is invalid.');
  }

  assertOptionalFiniteNumber(
    value.trueSolarTime.longitude,
    'CalculationPolicySnapshot.trueSolarTime.longitude',
  );

  if (
    typeof value.trueSolarTime.longitude === 'number' &&
    (value.trueSolarTime.longitude < -180 || value.trueSolarTime.longitude > 180)
  ) {
    throw new RangeError('CalculationPolicySnapshot.trueSolarTime.longitude is out of range.');
  }

  if (!isRecord(value.timeZonePolicy)) {
    throw new TypeError('CalculationPolicySnapshot.timeZonePolicy must be an object.');
  }

  const timeZoneSource = value.timeZonePolicy.source;
  if (
    timeZoneSource !== 'birthplace' &&
    timeZoneSource !== 'manual' &&
    timeZoneSource !== 'service-default'
  ) {
    throw new TypeError('CalculationPolicySnapshot.timeZonePolicy.source is invalid.');
  }

  if (
    typeof value.timeZonePolicy.timeZone !== 'string' ||
    value.timeZonePolicy.timeZone.trim().length === 0
  ) {
    throw new TypeError('CalculationPolicySnapshot.timeZonePolicy.timeZone is required.');
  }

  if (value.unknownBirthTimePolicy !== 'preserve-unknown-and-enumerate-boundaries') {
    throw new TypeError('CalculationPolicySnapshot.unknownBirthTimePolicy is invalid.');
  }
}
