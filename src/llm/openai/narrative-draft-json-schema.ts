import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../prompt-compiler.js';

const versionedRefSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
  },
  required: ['id', 'version'],
} as const;

const evidenceRefSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    sourceType: { type: 'string', enum: ['canonical_fact', 'claim'] },
    ref: { type: 'string' },
  },
  required: ['sourceType', 'ref'],
} as const;

const assertionSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    type: { type: 'string', enum: ['assertion'] },
    text: { type: 'string' },
    epistemicType: {
      type: 'string',
      enum: ['deterministic_fact', 'interpretation', 'synthesis', 'future_tendency'],
    },
    evidenceRefs: { type: 'array', items: evidenceRefSchema },
    methodologyRefs: { type: 'array', items: versionedRefSchema },
  },
  required: ['type', 'text', 'epistemicType', 'evidenceRefs', 'methodologyRefs'],
} as const;

const comparisonSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    type: { type: 'string', enum: ['comparison'] },
    topic: { type: 'string' },
    perspectives: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          methodologyRef: versionedRefSchema,
          summary: { type: 'string' },
          claimRefs: { type: 'array', items: { type: 'string' } },
        },
        required: ['methodologyRef', 'summary', 'claimRefs'],
      },
    },
    synthesis: { type: 'string' },
  },
  required: ['type', 'topic', 'perspectives', 'synthesis'],
} as const;

const disclosureSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    type: { type: 'string', enum: ['disclosure'] },
    disclosureType: {
      type: 'string',
      enum: [
        'calculation_ambiguity',
        'methodology_difference',
        'insufficient_evidence',
        'scope_limitation',
      ],
    },
    text: { type: 'string' },
    relatedRefs: { type: 'array', items: { type: 'string' } },
  },
  required: ['type', 'disclosureType', 'text', 'relatedRefs'],
} as const;

const transitionSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    type: { type: 'string', enum: ['transition'] },
    text: { type: 'string' },
  },
  required: ['type', 'text'],
} as const;

const unresolvedItemSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    question: { type: 'string' },
    reason: {
      type: 'string',
      enum: [
        'no_matching_claim',
        'insufficient_resolved_facts',
        'methodology_not_enabled',
        'material_conflict',
      ],
    },
  },
  required: ['question', 'reason'],
} as const;

export const OPENAI_NARRATIVE_DRAFT_SCHEMA_NAME = 'myeonghwa_narrative_draft_v1';

export const OPENAI_NARRATIVE_DRAFT_JSON_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    schemaVersion: { type: 'string', enum: [SUPPORTED_NARRATIVE_OUTPUT_SCHEMA] },
    requestId: { type: 'string' },
    sections: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          sectionId: { type: 'string' },
          title: { type: 'string' },
          blocks: {
            type: 'array',
            items: {
              anyOf: [assertionSchema, comparisonSchema, disclosureSchema, transitionSchema],
            },
          },
        },
        required: ['sectionId', 'title', 'blocks'],
      },
    },
    unresolvedQuestions: { type: 'array', items: unresolvedItemSchema },
  },
  required: ['schemaVersion', 'requestId', 'sections', 'unresolvedQuestions'],
} as const;
