import type { VersionedRef } from '../contracts/common.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import type {
  NarrativeAssertion,
  NarrativeBlock,
  NarrativeComparison,
  NarrativeDraft,
  NarrativeEvidenceBundle,
} from '../contracts/narrative.js';

export type NarrativeGroundingViolationCode =
  | 'REQUEST_ID_MISMATCH'
  | 'DUPLICATE_SECTION_ID'
  | 'EMPTY_ASSERTION_EVIDENCE'
  | 'UNKNOWN_FACT_REF'
  | 'UNKNOWN_CLAIM_REF'
  | 'UNKNOWN_DISCLOSURE_REF'
  | 'INACTIVE_CLAIM_REF'
  | 'AMBIGUOUS_FACT_AS_DETERMINISTIC'
  | 'DETERMINISTIC_ASSERTION_WITH_CLAIM'
  | 'INTERPRETATION_WITHOUT_CLAIM'
  | 'FUTURE_TENDENCY_WITHOUT_TIME_DYNAMIC_CLAIM'
  | 'METHODOLOGY_REF_MISSING'
  | 'METHODOLOGY_REF_MISMATCH'
  | 'COMPARISON_CLAIM_MISMATCH'
  | 'AMBIGUITY_DISCLOSURE_MISSING'
  | 'CONFLICT_DISCLOSURE_MISSING'
  | 'SCOPE_LIMITATION_DISCLOSURE_MISSING';

export interface NarrativeGroundingViolation {
  code: NarrativeGroundingViolationCode;
  message: string;
  sectionId?: string;
  blockIndex?: number;
}

export interface NarrativeGroundingValidationResult {
  valid: boolean;
  violations: readonly NarrativeGroundingViolation[];
}

function versionKey(ref: VersionedRef): string {
  return `${ref.id}@${ref.version}`;
}

function violation(
  violations: NarrativeGroundingViolation[],
  code: NarrativeGroundingViolationCode,
  message: string,
  sectionId?: string,
  blockIndex?: number,
): void {
  violations.push({
    code,
    message,
    ...(sectionId === undefined ? {} : { sectionId }),
    ...(blockIndex === undefined ? {} : { blockIndex }),
  });
}

function claimIndex(bundle: NarrativeEvidenceBundle): ReadonlyMap<string, InterpretationClaim> {
  return new Map(bundle.claims.map((claim) => [claim.claimId, claim]));
}

function methodologyKeys(bundle: NarrativeEvidenceBundle): ReadonlySet<string> {
  return new Set(bundle.claims.map((claim) => versionKey(claim.methodologyRef)));
}

function validateAssertion(
  assertion: NarrativeAssertion,
  bundle: NarrativeEvidenceBundle,
  violations: NarrativeGroundingViolation[],
  sectionId: string,
  blockIndex: number,
): void {
  if (assertion.evidenceRefs.length === 0) {
    violation(
      violations,
      'EMPTY_ASSERTION_EVIDENCE',
      'Narrative assertion has no evidence references.',
      sectionId,
      blockIndex,
    );
    return;
  }

  const facts = new Map(bundle.canonicalFacts.map((fact) => [fact.ref, fact]));
  const claims = claimIndex(bundle);
  const referencedClaims: InterpretationClaim[] = [];

  for (const evidenceRef of assertion.evidenceRefs) {
    if (evidenceRef.sourceType === 'canonical_fact') {
      const fact = facts.get(evidenceRef.ref);
      if (fact === undefined) {
        violation(
          violations,
          'UNKNOWN_FACT_REF',
          `Assertion references fact outside the Evidence Bundle: ${evidenceRef.ref}`,
          sectionId,
          blockIndex,
        );
        continue;
      }
      if (assertion.epistemicType === 'deterministic_fact' && fact.fact.status !== 'resolved') {
        violation(
          violations,
          'AMBIGUOUS_FACT_AS_DETERMINISTIC',
          `Deterministic assertion references non-resolved fact ${evidenceRef.ref}.`,
          sectionId,
          blockIndex,
        );
      }
      continue;
    }

    const claim = claims.get(evidenceRef.ref);
    if (claim === undefined) {
      violation(
        violations,
        'UNKNOWN_CLAIM_REF',
        `Assertion references claim outside the Evidence Bundle: ${evidenceRef.ref}`,
        sectionId,
        blockIndex,
      );
      continue;
    }
    if (claim.state !== 'active') {
      violation(
        violations,
        'INACTIVE_CLAIM_REF',
        `Assertion references non-active claim ${evidenceRef.ref}.`,
        sectionId,
        blockIndex,
      );
    }
    referencedClaims.push(claim);
  }

  if (assertion.epistemicType === 'deterministic_fact' && referencedClaims.length > 0) {
    violation(
      violations,
      'DETERMINISTIC_ASSERTION_WITH_CLAIM',
      'Deterministic fact assertions cannot use interpretation claims as authority.',
      sectionId,
      blockIndex,
    );
  }

  if (
    assertion.epistemicType !== 'deterministic_fact' &&
    !assertion.evidenceRefs.some((ref) => ref.sourceType === 'claim')
  ) {
    violation(
      violations,
      'INTERPRETATION_WITHOUT_CLAIM',
      `${assertion.epistemicType} assertion requires claim evidence.`,
      sectionId,
      blockIndex,
    );
  }

  if (
    assertion.epistemicType === 'future_tendency' &&
    referencedClaims.length > 0 &&
    !referencedClaims.some((claim) => claim.taxonomy.tier === 'T9')
  ) {
    violation(
      violations,
      'FUTURE_TENDENCY_WITHOUT_TIME_DYNAMIC_CLAIM',
      'Future-tendency assertions require at least one selected T9 time-dynamic claim.',
      sectionId,
      blockIndex,
    );
  }

  if (referencedClaims.length === 0) return;

  const declaredMethods = new Set((assertion.methodologyRefs ?? []).map(versionKey));
  if (declaredMethods.size === 0) {
    violation(
      violations,
      'METHODOLOGY_REF_MISSING',
      'Claim-backed assertion must declare its methodology reference.',
      sectionId,
      blockIndex,
    );
    return;
  }

  for (const claim of referencedClaims) {
    const required = versionKey(claim.methodologyRef);
    if (!declaredMethods.has(required)) {
      violation(
        violations,
        'METHODOLOGY_REF_MISMATCH',
        `Assertion does not attribute referenced claim ${claim.claimId} to ${required}.`,
        sectionId,
        blockIndex,
      );
    }
  }

  const allowedMethods = methodologyKeys(bundle);
  for (const declared of declaredMethods) {
    if (!allowedMethods.has(declared)) {
      violation(
        violations,
        'METHODOLOGY_REF_MISMATCH',
        `Assertion declares methodology outside the Evidence Bundle: ${declared}.`,
        sectionId,
        blockIndex,
      );
    }
  }
}

function validateComparison(
  comparison: NarrativeComparison,
  bundle: NarrativeEvidenceBundle,
  violations: NarrativeGroundingViolation[],
  sectionId: string,
  blockIndex: number,
): void {
  const claims = claimIndex(bundle);
  const allowedMethods = methodologyKeys(bundle);

  for (const perspective of comparison.perspectives) {
    const methodKey = versionKey(perspective.methodologyRef);
    if (!allowedMethods.has(methodKey)) {
      violation(
        violations,
        'METHODOLOGY_REF_MISMATCH',
        `Comparison declares methodology outside the Evidence Bundle: ${methodKey}.`,
        sectionId,
        blockIndex,
      );
    }

    for (const claimRef of perspective.claimRefs) {
      const claim = claims.get(claimRef);
      if (claim === undefined) {
        violation(
          violations,
          'UNKNOWN_CLAIM_REF',
          `Comparison references claim outside the Evidence Bundle: ${claimRef}.`,
          sectionId,
          blockIndex,
        );
        continue;
      }
      if (versionKey(claim.methodologyRef) !== methodKey) {
        violation(
          violations,
          'COMPARISON_CLAIM_MISMATCH',
          `Comparison claim ${claimRef} belongs to ${versionKey(claim.methodologyRef)}, not ${methodKey}.`,
          sectionId,
          blockIndex,
        );
      }
    }
  }
}

function validateDisclosureRefs(
  block: Extract<NarrativeBlock, { type: 'disclosure' }>,
  bundle: NarrativeEvidenceBundle,
  violations: NarrativeGroundingViolation[],
  sectionId: string,
  blockIndex: number,
): void {
  const allowed = new Set([
    ...bundle.canonicalFacts.map((fact) => fact.ref),
    ...bundle.claims.map((claim) => claim.claimId),
    ...bundle.claimRelations.map((relation) => relation.relationId),
  ]);
  for (const ref of block.relatedRefs) {
    if (!allowed.has(ref)) {
      violation(
        violations,
        'UNKNOWN_DISCLOSURE_REF',
        `Disclosure references evidence outside the bundle: ${ref}.`,
        sectionId,
        blockIndex,
      );
    }
  }
}

function allDisclosures(draft: NarrativeDraft) {
  return draft.sections.flatMap((section) =>
    section.blocks
      .filter(
        (block): block is Extract<NarrativeBlock, { type: 'disclosure' }> =>
          block.type === 'disclosure',
      )
      .map((block) => ({ sectionId: section.sectionId, block })),
  );
}

function enforceMandatoryDisclosures(
  draft: NarrativeDraft,
  bundle: NarrativeEvidenceBundle,
  violations: NarrativeGroundingViolation[],
): void {
  const disclosures = allDisclosures(draft);

  const ambiguityDisclosures = disclosures.filter(
    ({ block }) => block.disclosureType === 'calculation_ambiguity',
  );
  for (const fact of bundle.canonicalFacts) {
    if (fact.scenarioRef !== undefined || fact.fact.status !== 'ambiguous') continue;
    if (!ambiguityDisclosures.some(({ block }) => block.relatedRefs.includes(fact.ref))) {
      violation(
        violations,
        'AMBIGUITY_DISCLOSURE_MISSING',
        `Ambiguous fact ${fact.ref} requires calculation_ambiguity disclosure.`,
      );
    }
  }

  const conflictDisclosures = disclosures.filter(
    ({ block }) => block.disclosureType === 'methodology_difference',
  );
  for (const relation of bundle.claimRelations) {
    if (relation.relation !== 'contradicts') continue;
    if (
      !conflictDisclosures.some(({ block }) => block.relatedRefs.includes(relation.relationId))
    ) {
      violation(
        violations,
        'CONFLICT_DISCLOSURE_MISSING',
        `Contradiction ${relation.relationId} requires methodology_difference disclosure.`,
      );
    }
  }

  const scopeDisclosures = disclosures.filter(
    ({ block }) => block.disclosureType === 'scope_limitation',
  );
  for (const claim of bundle.claims) {
    if (!claim.claimType.includes('SCOPE-GUARD')) continue;
    if (!scopeDisclosures.some(({ block }) => block.relatedRefs.includes(claim.claimId))) {
      violation(
        violations,
        'SCOPE_LIMITATION_DISCLOSURE_MISSING',
        `Scope guard ${claim.claimId} requires scope_limitation disclosure.`,
      );
    }
  }
}

export function validateNarrativeDraftGrounding(
  draft: NarrativeDraft,
  bundle: NarrativeEvidenceBundle,
): NarrativeGroundingValidationResult {
  const violations: NarrativeGroundingViolation[] = [];

  if (draft.requestId !== bundle.requestId) {
    violation(
      violations,
      'REQUEST_ID_MISMATCH',
      `Draft request ${draft.requestId} does not match Evidence Bundle ${bundle.requestId}.`,
    );
  }

  const sectionIds = new Set<string>();
  for (const section of draft.sections) {
    if (sectionIds.has(section.sectionId)) {
      violation(
        violations,
        'DUPLICATE_SECTION_ID',
        `Duplicate narrative sectionId: ${section.sectionId}.`,
        section.sectionId,
      );
    }
    sectionIds.add(section.sectionId);

    section.blocks.forEach((block, blockIndex) => {
      switch (block.type) {
        case 'assertion':
          validateAssertion(block, bundle, violations, section.sectionId, blockIndex);
          break;
        case 'comparison':
          validateComparison(block, bundle, violations, section.sectionId, blockIndex);
          break;
        case 'disclosure':
          validateDisclosureRefs(block, bundle, violations, section.sectionId, blockIndex);
          break;
        case 'transition':
          break;
      }
    });
  }

  enforceMandatoryDisclosures(draft, bundle, violations);

  return {
    valid: violations.length === 0,
    violations: violations.sort((left, right) =>
      `${left.code}:${left.sectionId ?? ''}:${left.blockIndex ?? -1}:${left.message}`.localeCompare(
        `${right.code}:${right.sectionId ?? ''}:${right.blockIndex ?? -1}:${right.message}`,
      ),
    ),
  };
}
