import type { ReadingArtifact, ReadingBlockView, ReadingIntent } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ProductReadingDeliveryResult } from './product-reading-delivery.js';

export const PRODUCT_READING_RESPONSE_VERSION = 'myeonghwa-product-reading-response-v2';

export type ProductReadingResponseState =
  | 'delivered'
  | 'delivered_with_fallback'
  | 'clarification_required'
  | 'unsupported_request'
  | 'invalid_request'
  | 'partial_evidence'
  | 'insufficient_evidence'
  | 'unsupported_intent'
  | 'temporarily_unavailable';

export type ProductReadingResponseMessageCode =
  | 'READING_DELIVERED'
  | 'READING_DELIVERED_WITH_GROUNDED_FALLBACK'
  | 'READING_REQUEST_CLARIFICATION_REQUIRED'
  | 'READING_REQUEST_NOT_SUPPORTED'
  | 'READING_REQUEST_INVALID'
  | 'READING_EVIDENCE_PARTIAL'
  | 'READING_EVIDENCE_INSUFFICIENT'
  | 'READING_INTENT_NOT_AVAILABLE'
  | 'READING_TEMPORARILY_UNAVAILABLE';

export type ProductReadingResponseRequiredAction =
  | 'none'
  | 'clarify_request'
  | 'revise_request'
  | 'provide_required_context'
  | 'try_again_later';

export type ProductReadingResponseDiagnostic =
  | 'target_person_required'
  | 'request_text_required'
  | 'question_text_required'
  | 'request_not_recognized';

export interface ProductReadingResponseCoverage {
  state: 'partial' | 'insufficient' | 'unsupported';
  hasAvailableEvidence: boolean;
  missingRequirementCount: number;
}

export interface ProductReadingResponseClarificationOption {
  domain:
    | 'general'
    | 'family'
    | 'relationship'
    | 'compatibility'
    | 'career'
    | 'business'
    | 'wealth'
    | 'life_stage'
    | 'question_specific';
  temporalScope: 'natal' | 'annual' | 'monthly' | 'life_stage';
  relationshipScope?: 'general' | 'parents' | 'children' | 'spouse';
}

export interface ProductReadingResponseClarification {
  kind: 'domain' | 'temporal_scope' | 'request';
  options?: readonly ProductReadingResponseClarificationOption[];
}

export interface ProductReadingResponseDisplayFact {
  label: string;
  value?: string;
  status: 'resolved' | 'ambiguous' | 'unavailable';
}

export interface ProductReadingResponseCalculationAmbiguity {
  title: string;
  summary: string;
}

export interface ProductReadingResponseCalculationSummary {
  pillars: {
    year: ProductReadingResponseDisplayFact;
    month: ProductReadingResponseDisplayFact;
    day: ProductReadingResponseDisplayFact;
    hour: ProductReadingResponseDisplayFact;
  };
  calendar?: readonly ProductReadingResponseDisplayFact[];
  fiveElements?: readonly ProductReadingResponseDisplayFact[];
  tenGods?: readonly ProductReadingResponseDisplayFact[];
  luckPillars?: readonly ProductReadingResponseDisplayFact[];
  ambiguity?: readonly ProductReadingResponseCalculationAmbiguity[];
}

export type ProductReadingResponseBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'key_points'; items: readonly string[] }
  | {
      type: 'comparison';
      title: string;
      perspectives: readonly { label: string; text: string }[];
    }
  | {
      type: 'ambiguity';
      summary: string;
      scenarios: readonly { label: string; text: string }[];
    }
  | {
      type: 'timeline';
      entries: readonly { label: string; text: string }[];
    }
  | {
      type: 'fact_table';
      rows: readonly { label: string; value: string }[];
    }
  | { type: 'source_hint'; text: string };

export interface ProductReadingResponseSection {
  sectionType:
    | 'overview'
    | 'structure'
    | 'personality'
    | 'career'
    | 'wealth'
    | 'relationship'
    | 'health_tendency'
    | 'timing'
    | 'compatibility'
    | 'custom';
  title: string;
  blocks: readonly ProductReadingResponseBlock[];
  state: 'complete' | 'partial' | 'unavailable';
}

export interface ProductReadingResponseDisclosure {
  type:
    | 'calculation_ambiguity'
    | 'methodology_difference'
    | 'insufficient_evidence'
    | 'scope_limitation';
  text: string;
}

export interface ProductReadingResponseReading {
  readingId: string;
  brand: {
    brandId: 'myeonghwa';
    displayName: '명화';
  };
  subject: {
    displayLabel?: string;
    birthInputDisplay: {
      calendarType: 'solar' | 'lunar';
      date: string;
      time?: string;
      timeKnown: boolean;
      leapMonth?: boolean;
      birthplaceLabel?: string;
    };
    calculationState: 'resolved' | 'partially_ambiguous' | 'insufficient_input';
  };
  calculationSummary: ProductReadingResponseCalculationSummary;
  sections: readonly ProductReadingResponseSection[];
  disclosures: readonly ProductReadingResponseDisclosure[];
  generatedAt: string;
}

export interface ProductReadingResponse {
  responseId: string;
  responseVersion: string;
  state: ProductReadingResponseState;
  messageCode: ProductReadingResponseMessageCode;
  requiredAction: ProductReadingResponseRequiredAction;
  reading?: ProductReadingResponseReading;
  clarification?: ProductReadingResponseClarification;
  coverage?: ProductReadingResponseCoverage;
  consumerDiagnostics?: readonly ProductReadingResponseDiagnostic[];
}

type RedactInternalText = (value: string) => string;

function collectInternalTokens(artifact: ReadingArtifact): readonly string[] {
  const tokens = new Set<string>();
  const add = (value: string | undefined): void => {
    if (value !== undefined && value.length > 0) tokens.add(value);
  };

  add(artifact.schemaVersion);
  add(artifact.provenance.snapshotId);
  add(artifact.provenance.interpretationRunId);
  add(artifact.provenance.narrativeRunId);
  add(artifact.provenance.readingVersion);

  for (const entry of artifact.explainability.entries) {
    add(entry.explainabilityRef);
    entry.claimIds.forEach(add);
    entry.factRefs.forEach(add);
    entry.methodologyIds.forEach(add);
    entry.sourceIds.forEach(add);
  }

  for (const section of artifact.sections) {
    add(section.sectionId);
    section.disclosureRefs?.forEach(add);
    section.explainabilityRefs?.forEach(add);
    for (const block of section.blocks) {
      if (block.type === 'source_hint') add(block.explainabilityRef);
    }
  }

  for (const disclosure of artifact.disclosures) add(disclosure.disclosureId);
  for (const ambiguity of artifact.calculationSummary.ambiguity ?? []) {
    add(ambiguity.ambiguityId);
    ambiguity.affectedPaths.forEach(add);
  }

  return [...tokens].sort((left, right) => right.length - left.length || left.localeCompare(right));
}

function createInternalTextRedactor(artifact: ReadingArtifact): RedactInternalText {
  const tokens = collectInternalTokens(artifact);
  return (value: string): string => {
    let result = value;
    for (const token of tokens) result = result.split(token).join('근거 참조');
    return result;
  };
}

function displayFact(
  fact: ProductReadingResponseDisplayFact,
): ProductReadingResponseDisplayFact {
  return {
    label: fact.label,
    ...(fact.value === undefined ? {} : { value: fact.value }),
    status: fact.status,
  };
}

function calculationSummary(
  artifact: ReadingArtifact,
  redact: RedactInternalText,
): ProductReadingResponseCalculationSummary {
  const source = artifact.calculationSummary;
  return {
    pillars: {
      year: displayFact(source.pillars.year),
      month: displayFact(source.pillars.month),
      day: displayFact(source.pillars.day),
      hour: displayFact(source.pillars.hour),
    },
    ...(source.calendar === undefined
      ? {}
      : { calendar: source.calendar.map((fact) => displayFact(fact)) }),
    ...(source.fiveElements === undefined
      ? {}
      : { fiveElements: source.fiveElements.map((fact) => displayFact(fact)) }),
    ...(source.tenGods === undefined
      ? {}
      : { tenGods: source.tenGods.map((fact) => displayFact(fact)) }),
    ...(source.luckPillars === undefined
      ? {}
      : { luckPillars: source.luckPillars.map((fact) => displayFact(fact)) }),
    ...(source.ambiguity === undefined
      ? {}
      : {
          ambiguity: source.ambiguity.map((item) => ({
            title: redact(item.title),
            summary: redact(item.summary),
          })),
        }),
  };
}

function readingBlock(
  block: ReadingBlockView,
  redact: RedactInternalText,
): ProductReadingResponseBlock {
  switch (block.type) {
    case 'paragraph':
      return { type: 'paragraph', text: redact(block.text) };
    case 'key_points':
      return { type: 'key_points', items: block.items.map((item) => redact(item)) };
    case 'comparison':
      return {
        type: 'comparison',
        title: redact(block.title),
        perspectives: block.perspectives.map((item) => ({
          label: redact(item.label),
          text: redact(item.text),
        })),
      };
    case 'ambiguity':
      return {
        type: 'ambiguity',
        summary: redact(block.summary),
        scenarios: block.scenarios.map((item) => ({
          label: redact(item.label),
          text: redact(item.text),
        })),
      };
    case 'timeline':
      return {
        type: 'timeline',
        entries: block.entries.map((item) => ({
          label: redact(item.label),
          text: redact(item.text),
        })),
      };
    case 'fact_table':
      return {
        type: 'fact_table',
        rows: block.rows.map((item) => ({
          label: redact(item.label),
          value: redact(item.value),
        })),
      };
    case 'source_hint':
      return { type: 'source_hint', text: redact(block.text) };
  }
}

function readingView(artifact: ReadingArtifact): ProductReadingResponseReading {
  const redact = createInternalTextRedactor(artifact);
  return {
    readingId: artifact.readingId,
    brand: {
      brandId: artifact.brand.brandId,
      displayName: artifact.brand.displayName,
    },
    subject: {
      ...(artifact.subject.displayLabel === undefined
        ? {}
        : { displayLabel: artifact.subject.displayLabel }),
      birthInputDisplay: {
        calendarType: artifact.subject.birthInputDisplay.calendarType,
        date: artifact.subject.birthInputDisplay.date,
        ...(artifact.subject.birthInputDisplay.time === undefined
          ? {}
          : { time: artifact.subject.birthInputDisplay.time }),
        timeKnown: artifact.subject.birthInputDisplay.timeKnown,
        ...(artifact.subject.birthInputDisplay.leapMonth === undefined
          ? {}
          : { leapMonth: artifact.subject.birthInputDisplay.leapMonth }),
        ...(artifact.subject.birthInputDisplay.birthplaceLabel === undefined
          ? {}
          : { birthplaceLabel: artifact.subject.birthInputDisplay.birthplaceLabel }),
      },
      calculationState: artifact.subject.calculationState,
    },
    calculationSummary: calculationSummary(artifact, redact),
    sections: artifact.sections.map((section) => ({
      sectionType: section.sectionType,
      title: redact(section.title),
      blocks: section.blocks.map((block) => readingBlock(block, redact)),
      state: section.state,
    })),
    disclosures: artifact.disclosures.map((disclosure) => ({
      type: disclosure.type,
      text: redact(disclosure.text),
    })),
    generatedAt: artifact.generatedAt,
  };
}

function clarificationOption(intent: ReadingIntent): ProductReadingResponseClarificationOption {
  return {
    domain: intent.domain,
    temporalScope: intent.temporalScope,
    ...(intent.relationshipScope === undefined
      ? {}
      : { relationshipScope: intent.relationshipScope }),
  };
}

function clarification(
  delivery: ProductReadingDeliveryResult,
): ProductReadingResponseClarification | undefined {
  if (delivery.clarification === undefined) return undefined;
  return {
    kind: delivery.clarification.kind,
    ...(delivery.clarification.options === undefined
      ? {}
      : { options: delivery.clarification.options.map((intent) => clarificationOption(intent)) }),
  };
}

export function buildProductReadingResponse(
  delivery: ProductReadingDeliveryResult,
): ProductReadingResponse {
  const reading = delivery.artifact === undefined ? undefined : readingView(delivery.artifact);
  const responseClarification = clarification(delivery);
  const coverage =
    delivery.coverage === undefined
      ? undefined
      : {
          state: delivery.coverage.state,
          hasAvailableEvidence: delivery.coverage.hasAvailableEvidence,
          missingRequirementCount: delivery.coverage.missingRequirementCount,
        };
  const consumerDiagnostics =
    delivery.consumerDiagnostics === undefined ? undefined : [...delivery.consumerDiagnostics];

  const identityMaterial = {
    responseVersion: PRODUCT_READING_RESPONSE_VERSION,
    deliveryId: delivery.deliveryId,
    state: delivery.state,
    messageCode: delivery.messageCode,
    requiredAction: delivery.requiredAction,
    readingId: reading?.readingId,
    clarification: responseClarification,
    coverage,
    consumerDiagnostics,
  };

  return {
    responseId: `reading_response_${deterministicContentHash(identityMaterial).slice(0, 24)}`,
    responseVersion: PRODUCT_READING_RESPONSE_VERSION,
    state: delivery.state,
    messageCode: delivery.messageCode,
    requiredAction: delivery.requiredAction,
    ...(reading === undefined ? {} : { reading }),
    ...(responseClarification === undefined ? {} : { clarification: responseClarification }),
    ...(coverage === undefined ? {} : { coverage }),
    ...(consumerDiagnostics === undefined ? {} : { consumerDiagnostics }),
  };
}
