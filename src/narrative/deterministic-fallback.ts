import type {
  ClaimNarrativeProfile,
  NarrativeAssertion,
  NarrativeBlock,
  NarrativeDraft,
  NarrativeEvidenceBundle,
  NarrativeSection,
} from '../contracts/narrative.js';
import {
  claimTypesCoveredByNarrativeProfiles,
  renderClaimNarrativeProfileSections,
} from './claim-narrative-profile.js';
import {
  validateNarrativeDraftGrounding,
  type NarrativeGroundingValidationResult,
} from './grounding-validator.js';

const FALLBACK_SCHEMA_VERSION = 'myeonghwa-narrative-draft-v1';
const FALLBACK_SECTION_ID = 'deterministic-evidence-summary';

export class DeterministicFallbackError extends Error {
  readonly validation: NarrativeGroundingValidationResult;

  constructor(validation: NarrativeGroundingValidationResult) {
    super(
      `Deterministic fallback failed grounding validation: ${validation.violations
        .map((violation) => violation.code)
        .join(', ')}`,
    );
    this.name = 'DeterministicFallbackError';
    this.validation = validation;
  }
}

export interface DeterministicFallbackResult {
  draft: NarrativeDraft;
  validation: NarrativeGroundingValidationResult;
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value === null || typeof value !== 'object') return value;

  const record = value as Record<string, unknown>;
  return Object.fromEntries(
    Object.keys(record)
      .sort()
      .filter((key) => record[key] !== undefined)
      .map((key) => [key, canonicalize(record[key])]),
  );
}

function displayValue(value: unknown): string {
  const encoded = JSON.stringify(canonicalize(value));
  if (encoded !== undefined) return encoded;
  return String(value);
}

function ambiguityDisclosures(bundle: NarrativeEvidenceBundle): NarrativeBlock[] {
  return bundle.canonicalFacts
    .filter((fact) => fact.scenarioRef === undefined && fact.fact.status === 'ambiguous')
    .sort((left, right) => left.ref.localeCompare(right.ref))
    .map((fact) => ({
      type: 'disclosure' as const,
      disclosureType: 'calculation_ambiguity' as const,
      text: `계산 조건에 따라 ${fact.path} 값이 하나로 확정되지 않습니다. 가능한 계산 시나리오를 구분해 해석합니다.`,
      relatedRefs: [fact.ref],
    }));
}

function conflictDisclosures(bundle: NarrativeEvidenceBundle): NarrativeBlock[] {
  return bundle.claimRelations
    .filter((relation) => relation.relation === 'contradicts')
    .sort((left, right) => left.relationId.localeCompare(right.relationId))
    .map((relation) => ({
      type: 'disclosure' as const,
      disclosureType: 'methodology_difference' as const,
      text: '현재 Evidence Bundle에는 서로 양립하지 않는 해석 결과가 함께 존재합니다. 어느 한쪽을 임의로 선택하지 않습니다.',
      relatedRefs: [relation.relationId],
    }));
}

function scopeDisclosures(bundle: NarrativeEvidenceBundle): NarrativeBlock[] {
  return bundle.claims
    .filter((claim) => claim.claimType.includes('SCOPE-GUARD'))
    .sort((left, right) => left.claimId.localeCompare(right.claimId))
    .map((claim) => ({
      type: 'disclosure' as const,
      disclosureType: 'scope_limitation' as const,
      text: '현재 근거는 제한된 해석 범위만 지원하며, 더 넓은 결론으로 확장할 수 없습니다.',
      relatedRefs: [claim.claimId],
    }));
}

function claimAssertion(bundle: NarrativeEvidenceBundle['claims'][number]): NarrativeAssertion {
  return {
    type: 'assertion',
    text: `${bundle.subject} / ${bundle.predicate}: ${displayValue(bundle.value)}`,
    epistemicType: 'interpretation',
    evidenceRefs: [{ sourceType: 'claim', ref: bundle.claimId }],
    methodologyRefs: [bundle.methodologyRef],
  };
}

function claimAssertions(
  bundle: NarrativeEvidenceBundle,
  excludedClaimTypes: ReadonlySet<string> = new Set(),
): NarrativeBlock[] {
  return bundle.claims
    .filter((claim) => !excludedClaimTypes.has(claim.claimType))
    .map(claimAssertion)
    .sort((left, right) => left.text.localeCompare(right.text));
}

function fallbackSection(
  bundle: NarrativeEvidenceBundle,
  excludedClaimTypes: ReadonlySet<string> = new Set(),
  allowEmptyTransition = true,
): NarrativeSection | undefined {
  const blocks: NarrativeBlock[] = [
    ...ambiguityDisclosures(bundle),
    ...conflictDisclosures(bundle),
    ...scopeDisclosures(bundle),
    ...claimAssertions(bundle, excludedClaimTypes),
  ];

  if (blocks.length === 0) {
    if (!allowEmptyTransition) return undefined;
    blocks.push({
      type: 'transition',
      text: '현재 Evidence Bundle에는 사용자에게 전달할 수 있는 활성 해석 근거가 없습니다.',
    });
  }

  return {
    sectionId: FALLBACK_SECTION_ID,
    title: '근거 기반 해석 요약',
    blocks,
  };
}

export function buildDeterministicFallbackDraft(
  bundle: NarrativeEvidenceBundle,
  profiles: readonly ClaimNarrativeProfile[] = [],
): NarrativeDraft {
  if (profiles.length === 0) {
    const section = fallbackSection(bundle);
    if (section === undefined) throw new Error('Deterministic fallback section unexpectedly missing.');
    return {
      schemaVersion: FALLBACK_SCHEMA_VERSION,
      requestId: bundle.requestId,
      sections: [section],
    };
  }

  const coveredClaimTypes = claimTypesCoveredByNarrativeProfiles(bundle, profiles);
  const profileSections = renderClaimNarrativeProfileSections(bundle, profiles);
  const residualSection = fallbackSection(bundle, coveredClaimTypes, false);

  return {
    schemaVersion: FALLBACK_SCHEMA_VERSION,
    requestId: bundle.requestId,
    sections: [
      ...profileSections,
      ...(residualSection === undefined ? [] : [residualSection]),
    ],
  };
}

export function buildValidatedDeterministicFallback(
  bundle: NarrativeEvidenceBundle,
  profiles: readonly ClaimNarrativeProfile[] = [],
): DeterministicFallbackResult {
  const draft = buildDeterministicFallbackDraft(bundle, profiles);
  const validation = validateNarrativeDraftGrounding(draft, bundle);
  if (!validation.valid) throw new DeterministicFallbackError(validation);
  return { draft, validation };
}
