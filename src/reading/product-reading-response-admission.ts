import {
  PRODUCT_READING_RESPONSE_VERSION,
  type ProductReadingResponse,
  type ProductReadingResponseMessageCode,
  type ProductReadingResponseRequiredAction,
  type ProductReadingResponseState,
} from './product-reading-response.js';

type PayloadPolicy = 'required' | 'optional' | 'forbidden';

type ResponseStateContract = {
  messageCode: ProductReadingResponseMessageCode;
  requiredAction: ProductReadingResponseRequiredAction;
  reading: PayloadPolicy;
  clarification: PayloadPolicy;
  coverage: PayloadPolicy;
  consumerDiagnostics: PayloadPolicy;
};

const RESPONSE_STATE_CONTRACT = Object.freeze({
  delivered: {
    messageCode: 'READING_DELIVERED',
    requiredAction: 'none',
    reading: 'required',
    clarification: 'forbidden',
    coverage: 'forbidden',
    consumerDiagnostics: 'forbidden',
  },
  delivered_with_fallback: {
    messageCode: 'READING_DELIVERED_WITH_GROUNDED_FALLBACK',
    requiredAction: 'none',
    reading: 'required',
    clarification: 'forbidden',
    coverage: 'forbidden',
    consumerDiagnostics: 'forbidden',
  },
  clarification_required: {
    messageCode: 'READING_REQUEST_CLARIFICATION_REQUIRED',
    requiredAction: 'clarify_request',
    reading: 'forbidden',
    clarification: 'required',
    coverage: 'forbidden',
    consumerDiagnostics: 'forbidden',
  },
  unsupported_request: {
    messageCode: 'READING_REQUEST_NOT_SUPPORTED',
    requiredAction: 'revise_request',
    reading: 'forbidden',
    clarification: 'forbidden',
    coverage: 'forbidden',
    consumerDiagnostics: 'optional',
  },
  invalid_request: {
    messageCode: 'READING_REQUEST_INVALID',
    requiredAction: 'provide_required_context',
    reading: 'forbidden',
    clarification: 'forbidden',
    coverage: 'forbidden',
    consumerDiagnostics: 'optional',
  },
  partial_evidence: {
    messageCode: 'READING_EVIDENCE_PARTIAL',
    requiredAction: 'none',
    reading: 'forbidden',
    clarification: 'forbidden',
    coverage: 'required',
    consumerDiagnostics: 'forbidden',
  },
  insufficient_evidence: {
    messageCode: 'READING_EVIDENCE_INSUFFICIENT',
    requiredAction: 'none',
    reading: 'forbidden',
    clarification: 'forbidden',
    coverage: 'required',
    consumerDiagnostics: 'forbidden',
  },
  unsupported_intent: {
    messageCode: 'READING_INTENT_NOT_AVAILABLE',
    requiredAction: 'revise_request',
    reading: 'forbidden',
    clarification: 'forbidden',
    coverage: 'required',
    consumerDiagnostics: 'forbidden',
  },
  temporarily_unavailable: {
    messageCode: 'READING_TEMPORARILY_UNAVAILABLE',
    requiredAction: 'try_again_later',
    reading: 'forbidden',
    clarification: 'forbidden',
    coverage: 'forbidden',
    consumerDiagnostics: 'forbidden',
  },
} as const satisfies Record<ProductReadingResponseState, ResponseStateContract>);

const RESPONSE_STATES = Object.freeze(
  Object.keys(RESPONSE_STATE_CONTRACT) as readonly ProductReadingResponseState[],
);

const DIAGNOSTICS = [
  'target_person_required',
  'request_text_required',
  'question_text_required',
  'request_not_recognized',
] as const;

const CLARIFICATION_DOMAINS = [
  'general',
  'family',
  'relationship',
  'compatibility',
  'career',
  'business',
  'wealth',
  'life_stage',
  'question_specific',
] as const;

const TEMPORAL_SCOPES = ['natal', 'annual', 'monthly', 'life_stage'] as const;
const RELATIONSHIP_SCOPES = ['general', 'parents', 'children', 'spouse'] as const;
const DISPLAY_FACT_STATUSES = ['resolved', 'ambiguous', 'unavailable'] as const;
const CALCULATION_STATES = ['resolved', 'partially_ambiguous', 'insufficient_input'] as const;
const SECTION_TYPES = [
  'overview',
  'structure',
  'personality',
  'career',
  'wealth',
  'relationship',
  'health_tendency',
  'timing',
  'compatibility',
  'custom',
] as const;
const SECTION_STATES = ['complete', 'partial', 'unavailable'] as const;
const DISCLOSURE_TYPES = [
  'calculation_ambiguity',
  'methodology_difference',
  'insufficient_evidence',
  'scope_limitation',
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function assertRecord(value: unknown, field: string): asserts value is Record<string, unknown> {
  if (!isRecord(value)) throw new TypeError(`${field} must be an object.`);
}

function assertArray(value: unknown, field: string): asserts value is readonly unknown[] {
  if (!Array.isArray(value)) throw new TypeError(`${field} must be an array.`);
}

function assertNonEmptyString(value: unknown, field: string): asserts value is string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new TypeError(`${field} must be a non-empty string.`);
  }
}

function assertOptionalNonEmptyString(value: unknown, field: string): void {
  if (value !== undefined) assertNonEmptyString(value, field);
}

function assertBoolean(value: unknown, field: string): asserts value is boolean {
  if (typeof value !== 'boolean') throw new TypeError(`${field} must be a boolean.`);
}

function assertEnum<T extends string>(
  value: unknown,
  allowed: readonly T[],
  field: string,
): asserts value is T {
  if (typeof value !== 'string' || !allowed.includes(value as T)) {
    throw new TypeError(`${field} is invalid.`);
  }
}

function assertPayloadPolicy(value: unknown, field: string, policy: PayloadPolicy): void {
  if (policy === 'required' && value === undefined) {
    throw new TypeError(`${field} is required for this response state.`);
  }
  if (policy === 'forbidden' && value !== undefined) {
    throw new TypeError(`${field} is not allowed for this response state.`);
  }
}

function assertDisplayFact(value: unknown, field: string): void {
  assertRecord(value, field);
  assertNonEmptyString(value.label, `${field}.label`);
  assertOptionalNonEmptyString(value.value, `${field}.value`);
  assertEnum(value.status, DISPLAY_FACT_STATUSES, `${field}.status`);
}

function assertDisplayFactArray(value: unknown, field: string): void {
  assertArray(value, field);
  value.forEach((item, index) => assertDisplayFact(item, `${field}[${index}]`));
}

function assertCalculationSummary(value: unknown, field: string): void {
  assertRecord(value, field);
  assertRecord(value.pillars, `${field}.pillars`);
  assertDisplayFact(value.pillars.year, `${field}.pillars.year`);
  assertDisplayFact(value.pillars.month, `${field}.pillars.month`);
  assertDisplayFact(value.pillars.day, `${field}.pillars.day`);
  assertDisplayFact(value.pillars.hour, `${field}.pillars.hour`);

  if (value.calendar !== undefined) assertDisplayFactArray(value.calendar, `${field}.calendar`);
  if (value.fiveElements !== undefined) {
    assertDisplayFactArray(value.fiveElements, `${field}.fiveElements`);
  }
  if (value.tenGods !== undefined) assertDisplayFactArray(value.tenGods, `${field}.tenGods`);
  if (value.luckPillars !== undefined) {
    assertDisplayFactArray(value.luckPillars, `${field}.luckPillars`);
  }

  if (value.ambiguity !== undefined) {
    assertArray(value.ambiguity, `${field}.ambiguity`);
    value.ambiguity.forEach((item, index) => {
      const itemField = `${field}.ambiguity[${index}]`;
      assertRecord(item, itemField);
      assertNonEmptyString(item.title, `${itemField}.title`);
      assertNonEmptyString(item.summary, `${itemField}.summary`);
    });
  }
}

function assertPairArray(value: unknown, field: string, valueField: 'text' | 'value'): void {
  assertArray(value, field);
  value.forEach((item, index) => {
    const itemField = `${field}[${index}]`;
    assertRecord(item, itemField);
    assertNonEmptyString(item.label, `${itemField}.label`);
    assertNonEmptyString(item[valueField], `${itemField}.${valueField}`);
  });
}

function assertReadingBlock(value: unknown, field: string): void {
  assertRecord(value, field);
  assertNonEmptyString(value.type, `${field}.type`);

  switch (value.type) {
    case 'paragraph':
    case 'source_hint':
      assertNonEmptyString(value.text, `${field}.text`);
      return;
    case 'key_points':
      assertArray(value.items, `${field}.items`);
      value.items.forEach((item, index) =>
        assertNonEmptyString(item, `${field}.items[${index}]`),
      );
      return;
    case 'comparison':
      assertNonEmptyString(value.title, `${field}.title`);
      assertPairArray(value.perspectives, `${field}.perspectives`, 'text');
      return;
    case 'ambiguity':
      assertNonEmptyString(value.summary, `${field}.summary`);
      assertPairArray(value.scenarios, `${field}.scenarios`, 'text');
      return;
    case 'timeline':
      assertPairArray(value.entries, `${field}.entries`, 'text');
      return;
    case 'fact_table':
      assertPairArray(value.rows, `${field}.rows`, 'value');
      return;
    default:
      throw new TypeError(`${field}.type is invalid.`);
  }
}

function assertReadingSection(value: unknown, field: string): void {
  assertRecord(value, field);
  assertEnum(value.sectionType, SECTION_TYPES, `${field}.sectionType`);
  assertNonEmptyString(value.title, `${field}.title`);
  assertArray(value.blocks, `${field}.blocks`);
  value.blocks.forEach((block, index) => assertReadingBlock(block, `${field}.blocks[${index}]`));
  assertEnum(value.state, SECTION_STATES, `${field}.state`);
}

function assertReading(value: unknown, field: string): void {
  assertRecord(value, field);
  assertNonEmptyString(value.readingId, `${field}.readingId`);

  assertRecord(value.brand, `${field}.brand`);
  if (value.brand.brandId !== 'myeonghwa' || value.brand.displayName !== '명화') {
    throw new TypeError(`${field}.brand must be the canonical Myeonghwa brand.`);
  }

  assertRecord(value.subject, `${field}.subject`);
  assertOptionalNonEmptyString(value.subject.displayLabel, `${field}.subject.displayLabel`);
  assertRecord(value.subject.birthInputDisplay, `${field}.subject.birthInputDisplay`);
  const birth = value.subject.birthInputDisplay;
  assertEnum(birth.calendarType, ['solar', 'lunar'] as const, `${field}.subject.birthInputDisplay.calendarType`);
  assertNonEmptyString(birth.date, `${field}.subject.birthInputDisplay.date`);
  assertOptionalNonEmptyString(birth.time, `${field}.subject.birthInputDisplay.time`);
  assertBoolean(birth.timeKnown, `${field}.subject.birthInputDisplay.timeKnown`);
  if (birth.leapMonth !== undefined) {
    assertBoolean(birth.leapMonth, `${field}.subject.birthInputDisplay.leapMonth`);
  }
  assertOptionalNonEmptyString(
    birth.birthplaceLabel,
    `${field}.subject.birthInputDisplay.birthplaceLabel`,
  );
  assertEnum(value.subject.calculationState, CALCULATION_STATES, `${field}.subject.calculationState`);

  assertCalculationSummary(value.calculationSummary, `${field}.calculationSummary`);

  assertArray(value.sections, `${field}.sections`);
  value.sections.forEach((section, index) =>
    assertReadingSection(section, `${field}.sections[${index}]`),
  );

  assertArray(value.disclosures, `${field}.disclosures`);
  value.disclosures.forEach((disclosure, index) => {
    const disclosureField = `${field}.disclosures[${index}]`;
    assertRecord(disclosure, disclosureField);
    assertEnum(disclosure.type, DISCLOSURE_TYPES, `${disclosureField}.type`);
    assertNonEmptyString(disclosure.text, `${disclosureField}.text`);
  });

  assertNonEmptyString(value.generatedAt, `${field}.generatedAt`);
}

function assertClarification(value: unknown, field: string): void {
  assertRecord(value, field);
  assertEnum(value.kind, ['domain', 'temporal_scope', 'request'] as const, `${field}.kind`);

  if (value.options === undefined) return;
  if (value.kind !== 'domain') {
    throw new TypeError(`${field}.options is only valid for domain clarification.`);
  }
  assertArray(value.options, `${field}.options`);
  if (value.options.length < 2) {
    throw new RangeError(`${field}.options must contain at least two domain candidates.`);
  }

  value.options.forEach((option, index) => {
    const optionField = `${field}.options[${index}]`;
    assertRecord(option, optionField);
    assertEnum(option.domain, CLARIFICATION_DOMAINS, `${optionField}.domain`);
    assertEnum(option.temporalScope, TEMPORAL_SCOPES, `${optionField}.temporalScope`);
    if (option.relationshipScope !== undefined) {
      assertEnum(option.relationshipScope, RELATIONSHIP_SCOPES, `${optionField}.relationshipScope`);
    }
  });
}

function assertCoverage(value: unknown, field: string): void {
  assertRecord(value, field);
  assertEnum(value.state, ['partial', 'insufficient', 'unsupported'] as const, `${field}.state`);
  assertBoolean(value.hasAvailableEvidence, `${field}.hasAvailableEvidence`);
  if (!Number.isInteger(value.missingRequirementCount) || (value.missingRequirementCount as number) < 0) {
    throw new RangeError(`${field}.missingRequirementCount must be a non-negative integer.`);
  }
}

function assertConsumerDiagnostics(value: unknown, field: string): void {
  assertArray(value, field);
  if (value.length === 0) throw new RangeError(`${field} must not be empty when provided.`);
  const seen = new Set<string>();
  value.forEach((diagnostic, index) => {
    assertEnum(diagnostic, DIAGNOSTICS, `${field}[${index}]`);
    if (seen.has(diagnostic)) throw new TypeError(`${field} must not contain duplicate diagnostics.`);
    seen.add(diagnostic);
  });
}

export function assertProductReadingResponse(
  value: unknown,
): asserts value is ProductReadingResponse {
  assertRecord(value, 'ProductReadingResponse');
  if (value.responseVersion !== PRODUCT_READING_RESPONSE_VERSION) {
    throw new TypeError(
      `ProductReadingResponse.responseVersion must be ${PRODUCT_READING_RESPONSE_VERSION}.`,
    );
  }
  if (
    typeof value.responseId !== 'string' ||
    !/^reading_response_[0-9a-f]{24}$/.test(value.responseId)
  ) {
    throw new TypeError('ProductReadingResponse.responseId is invalid.');
  }

  assertEnum(value.state, RESPONSE_STATES, 'ProductReadingResponse.state');
  const contract = RESPONSE_STATE_CONTRACT[value.state];
  if (value.messageCode !== contract.messageCode) {
    throw new TypeError('ProductReadingResponse.messageCode does not match response state.');
  }
  if (value.requiredAction !== contract.requiredAction) {
    throw new TypeError('ProductReadingResponse.requiredAction does not match response state.');
  }

  assertPayloadPolicy(value.reading, 'ProductReadingResponse.reading', contract.reading);
  assertPayloadPolicy(
    value.clarification,
    'ProductReadingResponse.clarification',
    contract.clarification,
  );
  assertPayloadPolicy(value.coverage, 'ProductReadingResponse.coverage', contract.coverage);
  assertPayloadPolicy(
    value.consumerDiagnostics,
    'ProductReadingResponse.consumerDiagnostics',
    contract.consumerDiagnostics,
  );

  if (value.reading !== undefined) assertReading(value.reading, 'ProductReadingResponse.reading');
  if (value.clarification !== undefined) {
    assertClarification(value.clarification, 'ProductReadingResponse.clarification');
  }
  if (value.coverage !== undefined) {
    assertCoverage(value.coverage, 'ProductReadingResponse.coverage');
    const expectedCoverageState =
      value.state === 'partial_evidence'
        ? 'partial'
        : value.state === 'insufficient_evidence'
          ? 'insufficient'
          : value.state === 'unsupported_intent'
            ? 'unsupported'
            : undefined;
    if (expectedCoverageState !== undefined && value.coverage.state !== expectedCoverageState) {
      throw new TypeError('ProductReadingResponse.coverage.state does not match response state.');
    }
  }
  if (value.consumerDiagnostics !== undefined) {
    assertConsumerDiagnostics(
      value.consumerDiagnostics,
      'ProductReadingResponse.consumerDiagnostics',
    );
  }
}

export function admitProductReadingResponse(input: unknown): ProductReadingResponse {
  assertProductReadingResponse(input);
  return input;
}
