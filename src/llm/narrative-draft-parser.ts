import type { VersionedRef } from '../contracts/common.js';
import type {
  NarrativeAssertion,
  NarrativeBlock,
  NarrativeComparison,
  NarrativeDisclosure,
  NarrativeDraft,
  NarrativeEpistemicType,
  NarrativeSection,
  NarrativeTransition,
  NarrativeUnresolvedItem,
} from '../contracts/narrative.js';

export interface NarrativeDraftParseViolation {
  path: string;
  message: string;
}

export type NarrativeDraftParseResult =
  | { success: true; draft: NarrativeDraft }
  | { success: false; violations: readonly NarrativeDraftParseViolation[] };

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function requiredString(
  record: Record<string, unknown>,
  key: string,
  path: string,
  violations: NarrativeDraftParseViolation[],
): string | undefined {
  const value = record[key];
  if (typeof value !== 'string' || value.length === 0) {
    violations.push({ path: `${path}.${key}`, message: 'Expected non-empty string.' });
    return undefined;
  }
  return value;
}

function optionalString(
  record: Record<string, unknown>,
  key: string,
  path: string,
  violations: NarrativeDraftParseViolation[],
): string | undefined {
  const value = record[key];
  if (value === undefined) return undefined;
  if (typeof value !== 'string') {
    violations.push({ path: `${path}.${key}`, message: 'Expected string when present.' });
    return undefined;
  }
  return value;
}

function parseVersionedRef(
  value: unknown,
  path: string,
  violations: NarrativeDraftParseViolation[],
): VersionedRef | undefined {
  if (!isRecord(value)) {
    violations.push({ path, message: 'Expected versioned reference object.' });
    return undefined;
  }
  const id = requiredString(value, 'id', path, violations);
  const version = requiredString(value, 'version', path, violations);
  if (id === undefined || version === undefined) return undefined;
  return { id, version };
}

function parseVersionedRefs(
  value: unknown,
  path: string,
  violations: NarrativeDraftParseViolation[],
): readonly VersionedRef[] | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value)) {
    violations.push({ path, message: 'Expected array of versioned references.' });
    return undefined;
  }
  const refs: VersionedRef[] = [];
  value.forEach((item, index) => {
    const ref = parseVersionedRef(item, `${path}[${index}]`, violations);
    if (ref !== undefined) refs.push(ref);
  });
  return refs;
}

const epistemicTypes = new Set<NarrativeEpistemicType>([
  'deterministic_fact',
  'interpretation',
  'synthesis',
  'future_tendency',
]);

function parseAssertion(
  record: Record<string, unknown>,
  path: string,
  violations: NarrativeDraftParseViolation[],
): NarrativeAssertion | undefined {
  const text = requiredString(record, 'text', path, violations);
  const rawEpistemic = record.epistemicType;
  if (typeof rawEpistemic !== 'string' || !epistemicTypes.has(rawEpistemic as NarrativeEpistemicType)) {
    violations.push({ path: `${path}.epistemicType`, message: 'Invalid epistemic type.' });
  }

  const rawEvidence = record.evidenceRefs;
  const evidenceRefs: NarrativeAssertion['evidenceRefs'][number][] = [];
  if (!Array.isArray(rawEvidence)) {
    violations.push({ path: `${path}.evidenceRefs`, message: 'Expected evidence reference array.' });
  } else {
    rawEvidence.forEach((item, index) => {
      const itemPath = `${path}.evidenceRefs[${index}]`;
      if (!isRecord(item)) {
        violations.push({ path: itemPath, message: 'Expected evidence reference object.' });
        return;
      }
      const sourceType = item.sourceType;
      const ref = requiredString(item, 'ref', itemPath, violations);
      if (sourceType !== 'canonical_fact' && sourceType !== 'claim') {
        violations.push({ path: `${itemPath}.sourceType`, message: 'Invalid evidence source type.' });
        return;
      }
      if (ref !== undefined) evidenceRefs.push({ sourceType, ref });
    });
  }

  const methodologyRefs = parseVersionedRefs(
    record.methodologyRefs,
    `${path}.methodologyRefs`,
    violations,
  );

  if (
    text === undefined ||
    typeof rawEpistemic !== 'string' ||
    !epistemicTypes.has(rawEpistemic as NarrativeEpistemicType)
  ) {
    return undefined;
  }

  return {
    type: 'assertion',
    text,
    epistemicType: rawEpistemic as NarrativeEpistemicType,
    evidenceRefs,
    ...(methodologyRefs === undefined ? {} : { methodologyRefs }),
  };
}

function parseComparison(
  record: Record<string, unknown>,
  path: string,
  violations: NarrativeDraftParseViolation[],
): NarrativeComparison | undefined {
  const topic = requiredString(record, 'topic', path, violations);
  const rawPerspectives = record.perspectives;
  const perspectives: NarrativeComparison['perspectives'][number][] = [];

  if (!Array.isArray(rawPerspectives)) {
    violations.push({ path: `${path}.perspectives`, message: 'Expected perspective array.' });
  } else {
    rawPerspectives.forEach((item, index) => {
      const itemPath = `${path}.perspectives[${index}]`;
      if (!isRecord(item)) {
        violations.push({ path: itemPath, message: 'Expected perspective object.' });
        return;
      }
      const methodologyRef = parseVersionedRef(
        item.methodologyRef,
        `${itemPath}.methodologyRef`,
        violations,
      );
      const summary = requiredString(item, 'summary', itemPath, violations);
      const rawClaimRefs = item.claimRefs;
      const claimRefs: string[] = [];
      if (!Array.isArray(rawClaimRefs)) {
        violations.push({ path: `${itemPath}.claimRefs`, message: 'Expected claim reference array.' });
      } else {
        rawClaimRefs.forEach((claimRef, claimIndex) => {
          if (typeof claimRef !== 'string' || claimRef.length === 0) {
            violations.push({
              path: `${itemPath}.claimRefs[${claimIndex}]`,
              message: 'Expected non-empty claim reference string.',
            });
          } else {
            claimRefs.push(claimRef);
          }
        });
      }
      if (methodologyRef !== undefined && summary !== undefined) {
        perspectives.push({ methodologyRef, summary, claimRefs });
      }
    });
  }

  const synthesis = optionalString(record, 'synthesis', path, violations);
  if (topic === undefined) return undefined;
  return {
    type: 'comparison',
    topic,
    perspectives,
    ...(synthesis === undefined ? {} : { synthesis }),
  };
}

const disclosureTypes = new Set<NarrativeDisclosure['disclosureType']>([
  'calculation_ambiguity',
  'methodology_difference',
  'insufficient_evidence',
  'scope_limitation',
]);

function parseDisclosure(
  record: Record<string, unknown>,
  path: string,
  violations: NarrativeDraftParseViolation[],
): NarrativeDisclosure | undefined {
  const rawType = record.disclosureType;
  if (
    typeof rawType !== 'string' ||
    !disclosureTypes.has(rawType as NarrativeDisclosure['disclosureType'])
  ) {
    violations.push({ path: `${path}.disclosureType`, message: 'Invalid disclosure type.' });
  }
  const text = requiredString(record, 'text', path, violations);
  const rawRefs = record.relatedRefs;
  const relatedRefs: string[] = [];
  if (!Array.isArray(rawRefs)) {
    violations.push({ path: `${path}.relatedRefs`, message: 'Expected relatedRefs array.' });
  } else {
    rawRefs.forEach((ref, index) => {
      if (typeof ref !== 'string' || ref.length === 0) {
        violations.push({
          path: `${path}.relatedRefs[${index}]`,
          message: 'Expected non-empty evidence reference string.',
        });
      } else {
        relatedRefs.push(ref);
      }
    });
  }

  if (
    text === undefined ||
    typeof rawType !== 'string' ||
    !disclosureTypes.has(rawType as NarrativeDisclosure['disclosureType'])
  ) {
    return undefined;
  }
  return {
    type: 'disclosure',
    disclosureType: rawType as NarrativeDisclosure['disclosureType'],
    text,
    relatedRefs,
  };
}

function parseTransition(
  record: Record<string, unknown>,
  path: string,
  violations: NarrativeDraftParseViolation[],
): NarrativeTransition | undefined {
  const text = requiredString(record, 'text', path, violations);
  return text === undefined ? undefined : { type: 'transition', text };
}

function parseBlock(
  value: unknown,
  path: string,
  violations: NarrativeDraftParseViolation[],
): NarrativeBlock | undefined {
  if (!isRecord(value)) {
    violations.push({ path, message: 'Expected narrative block object.' });
    return undefined;
  }
  switch (value.type) {
    case 'assertion':
      return parseAssertion(value, path, violations);
    case 'comparison':
      return parseComparison(value, path, violations);
    case 'disclosure':
      return parseDisclosure(value, path, violations);
    case 'transition':
      return parseTransition(value, path, violations);
    default:
      violations.push({ path: `${path}.type`, message: 'Unknown narrative block type.' });
      return undefined;
  }
}

function parseSection(
  value: unknown,
  path: string,
  violations: NarrativeDraftParseViolation[],
): NarrativeSection | undefined {
  if (!isRecord(value)) {
    violations.push({ path, message: 'Expected narrative section object.' });
    return undefined;
  }
  const sectionId = requiredString(value, 'sectionId', path, violations);
  const title = requiredString(value, 'title', path, violations);
  const rawBlocks = value.blocks;
  const blocks: NarrativeBlock[] = [];
  if (!Array.isArray(rawBlocks)) {
    violations.push({ path: `${path}.blocks`, message: 'Expected narrative block array.' });
  } else {
    rawBlocks.forEach((block, index) => {
      const parsed = parseBlock(block, `${path}.blocks[${index}]`, violations);
      if (parsed !== undefined) blocks.push(parsed);
    });
  }

  if (sectionId === undefined || title === undefined) return undefined;
  return { sectionId, title, blocks };
}

const unresolvedReasons = new Set<NarrativeUnresolvedItem['reason']>([
  'no_matching_claim',
  'insufficient_resolved_facts',
  'methodology_not_enabled',
  'material_conflict',
]);

function parseUnresolved(
  value: unknown,
  path: string,
  violations: NarrativeDraftParseViolation[],
): NarrativeUnresolvedItem | undefined {
  if (!isRecord(value)) {
    violations.push({ path, message: 'Expected unresolved-question object.' });
    return undefined;
  }
  const question = requiredString(value, 'question', path, violations);
  const rawReason = value.reason;
  if (
    typeof rawReason !== 'string' ||
    !unresolvedReasons.has(rawReason as NarrativeUnresolvedItem['reason'])
  ) {
    violations.push({ path: `${path}.reason`, message: 'Invalid unresolved-question reason.' });
    return undefined;
  }
  if (question === undefined) return undefined;
  return { question, reason: rawReason as NarrativeUnresolvedItem['reason'] };
}

export function parseNarrativeDraft(value: unknown): NarrativeDraftParseResult {
  const violations: NarrativeDraftParseViolation[] = [];
  if (!isRecord(value)) {
    return {
      success: false,
      violations: [{ path: '$', message: 'Expected NarrativeDraft object.' }],
    };
  }

  const schemaVersion = requiredString(value, 'schemaVersion', '$', violations);
  const requestId = requiredString(value, 'requestId', '$', violations);
  const rawSections = value.sections;
  const sections: NarrativeSection[] = [];
  if (!Array.isArray(rawSections)) {
    violations.push({ path: '$.sections', message: 'Expected section array.' });
  } else {
    rawSections.forEach((section, index) => {
      const parsed = parseSection(section, `$.sections[${index}]`, violations);
      if (parsed !== undefined) sections.push(parsed);
    });
  }

  let unresolvedQuestions: NarrativeUnresolvedItem[] | undefined;
  if (value.unresolvedQuestions !== undefined) {
    if (!Array.isArray(value.unresolvedQuestions)) {
      violations.push({
        path: '$.unresolvedQuestions',
        message: 'Expected unresolvedQuestions array when present.',
      });
    } else {
      unresolvedQuestions = [];
      value.unresolvedQuestions.forEach((item, index) => {
        const parsed = parseUnresolved(item, `$.unresolvedQuestions[${index}]`, violations);
        if (parsed !== undefined) unresolvedQuestions?.push(parsed);
      });
    }
  }

  if (violations.length > 0 || schemaVersion === undefined || requestId === undefined) {
    return { success: false, violations };
  }

  return {
    success: true,
    draft: {
      schemaVersion,
      requestId,
      sections,
      ...(unresolvedQuestions === undefined ? {} : { unresolvedQuestions }),
    },
  };
}
