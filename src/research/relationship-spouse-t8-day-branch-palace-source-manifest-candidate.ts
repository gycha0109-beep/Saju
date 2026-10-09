import type {
  RuleSourceLink,
  SourceReference,
} from '../contracts/interpretation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE,
} from './relationship-spouse-t8-jung-sua-direct-body-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_CANDIDATE,
} from './relationship-spouse-t8-saju-atelier-2026-spouse-palace-direct-body-boundary-evidence.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceProvenanceSurvey,
} from './relationship-spouse-t8-day-branch-palace-provenance-survey.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SOURCE_MANIFEST_CANDIDATE_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-source-manifest-candidate-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_JUNG_RUNTIME_SOURCE_ID =
  'SRC-RELATIONSHIP-SPOUSE-T8-JUNG-SUA-2025-DAY-BRANCH-PALACE' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SAJU_ATELIER_RUNTIME_SOURCE_ID =
  'SRC-RELATIONSHIP-SPOUSE-T8-SAJU-ATELIER-2026-DAY-BRANCH-PALACE' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_TARGET_RULE_ID =
  'relationship-spouse-t8-day-branch-spouse-palace-position' as const;

const jung =
  RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE;
const atelier =
  RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_CANDIDATE;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SOURCE_MANIFEST_CANDIDATE_SOURCES =
  Object.freeze([
    Object.freeze({
      sourceId:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_JUNG_RUNTIME_SOURCE_ID,
      sourceType: 'paper',
      title: jung.title,
      author: jung.author,
      publisher: jung.institution,
      publicationYear: jung.publicationYear,
      language: 'ko',
      locator: {
        page: '53, 56',
        anchor:
          'Day Branch spouse position / both male and female charts use Day Branch as spouse palace',
      },
      url: jung.institutionalOriginalRecord,
      provenanceTier: 'scholarly_secondary',
      rights: {
        copyrightStatus: 'unknown',
        reusePolicy: 'metadata_only',
      },
      notes:
        'Direct-basis runtime-candidate source for the narrow positional proposition only: resolved natal Day Branch is the traditional spouse-palace position. The directly inspected institutional PDF is content-addressed in Research evidence. Gender-conditioned spouse-star, favorable/unfavorable palace evaluation, Yongsin/Jisin and broader Gung-Seong semantics are explicitly excluded.',
    } as const satisfies SourceReference),
    Object.freeze({
      sourceId:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SAJU_ATELIER_RUNTIME_SOURCE_ID,
      sourceType: 'web',
      title: atelier.title,
      publisher: atelier.publisher,
      publicationYear: atelier.observedCopyrightYear,
      language: 'en',
      locator: {
        anchor: 'Spouse Palace = Day Branch positional layer',
      },
      url: atelier.publicUrl,
      provenanceTier: 'cross_reference',
      rights: {
        copyrightStatus: 'unknown',
        reusePolicy: 'metadata_only',
      },
      notes:
        'Independent direct-basis runtime-candidate source for the same narrow positional proposition. The complete 120-line public body was traversed in Research evidence. Its separate male-Wealth/female-Officer spouse-star calculation and broader marriage interpretation are not imported.',
    } as const satisfies SourceReference),
  ] as const);

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY_SOURCE_IDS =
  Object.freeze([
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_JUNG_RUNTIME_SOURCE_ID,
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SAJU_ATELIER_RUNTIME_SOURCE_ID,
  ] as const);

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_DIRECT_BASIS_SOURCE_LINKS =
  Object.freeze([
    Object.freeze({
      sourceId:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_JUNG_RUNTIME_SOURCE_ID,
      supportType: 'direct_basis',
      notes:
        'Direct scholarly basis is limited to the Day-Branch spouse-palace positional proposition.',
    } as const satisfies RuleSourceLink),
    Object.freeze({
      sourceId:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SAJU_ATELIER_RUNTIME_SOURCE_ID,
      supportType: 'direct_basis',
      notes:
        'Independent direct cross-reference basis is limited to the Day-Branch spouse-palace positional proposition.',
    } as const satisfies RuleSourceLink),
  ] as const);

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RESEARCH_TO_RUNTIME_SOURCE_MAPPING =
  Object.freeze([
    Object.freeze({
      researchEvidenceIdentity: jung.candidateId,
      runtimeSourceId:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_JUNG_RUNTIME_SOURCE_ID,
      supportRole: 'direct_basis_for_narrow_positional_proposition' as const,
      sourceTierRationale:
        'Directly inspected graduate thesis retained as scholarly_secondary. No primary status is inferred.',
      rightsHandling:
        'Only source metadata and provenance linkage are materialized; no source body is copied into the runtime candidate.',
    }),
    Object.freeze({
      researchEvidenceIdentity: atelier.candidateId,
      runtimeSourceId:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SAJU_ATELIER_RUNTIME_SOURCE_ID,
      supportRole: 'independent_direct_basis_for_narrow_positional_proposition' as const,
      sourceTierRationale:
        'Complete public methodology/editorial body retained conservatively as cross_reference.',
      rightsHandling:
        'Only source metadata and provenance linkage are materialized; no source body is copied into the runtime candidate.',
    }),
  ] as const);

export function buildRelationshipSpouseT8DayBranchPalaceSourceManifestCandidate() {
  const survey =
    buildRelationshipSpouseT8DayBranchPalaceProvenanceSurvey();
  const sourceIds =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SOURCE_MANIFEST_CANDIDATE_SOURCES.map(
      (source) => source.sourceId,
    );

  const surveyDirectBasisIds = new Set(
    survey.observations.qualifyingIndependentCandidateIds,
  );
  const expectedResearchIds = new Set([
    jung.candidateId,
    atelier.candidateId,
  ]);

  const exactSurveyDirectBasisPair =
    survey.provenanceRoute === 'MULTI_SOURCE_SUPPORTED' &&
    survey.researchProductionProvenanceCandidateReady === true &&
    surveyDirectBasisIds.size === expectedResearchIds.size &&
    [...expectedResearchIds].every((id) => surveyDirectBasisIds.has(id));

  const exactlyTwoRuntimeSources =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SOURCE_MANIFEST_CANDIDATE_SOURCES
      .length === 2;

  const mappingsResolve =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RESEARCH_TO_RUNTIME_SOURCE_MAPPING
      .length === 2 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RESEARCH_TO_RUNTIME_SOURCE_MAPPING.every(
      (mapping) => sourceIds.includes(mapping.runtimeSourceId),
    );

  const methodologyCoverage =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY_SOURCE_IDS.length ===
      2 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY_SOURCE_IDS.every(
      (sourceId) => sourceIds.includes(sourceId),
    );

  const directBasisCoverage =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_DIRECT_BASIS_SOURCE_LINKS.length ===
      2 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_DIRECT_BASIS_SOURCE_LINKS.every(
      (sourceRef) =>
        sourceRef.supportType === 'direct_basis' &&
        sourceIds.includes(sourceRef.sourceId),
    );

  const rightsHandlingExplicit =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SOURCE_MANIFEST_CANDIDATE_SOURCES.every(
      (source) =>
        source.rights?.copyrightStatus === 'unknown' &&
        source.rights.reusePolicy === 'metadata_only',
    );

  const noCorroborationInflation =
    !sourceIds.some(
      (sourceId) =>
        sourceId.includes('LEI') ||
        sourceId.includes('OPENFATE') ||
        sourceId.includes('ZIPING'),
    );

  const material = Object.freeze({
    manifestVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SOURCE_MANIFEST_CANDIDATE_VERSION,
    issue: '#1849' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    upstreamProvenanceSurveyId: survey.surveyId,
    targetRuleId:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_TARGET_RULE_ID,
    sources:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SOURCE_MANIFEST_CANDIDATE_SOURCES,
    methodologySourceIds:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY_SOURCE_IDS,
    directBasisSourceLinks:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_DIRECT_BASIS_SOURCE_LINKS,
    researchToRuntimeSourceMapping:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RESEARCH_TO_RUNTIME_SOURCE_MAPPING,
    checks: Object.freeze({
      exactSurveyDirectBasisPair,
      exactlyTwoRuntimeSources,
      mappingsResolve,
      methodologyCoverage,
      directBasisCoverage,
      rightsHandlingExplicit,
      noCorroborationInflation,
    }),
    manifestCandidateComplete:
      exactSurveyDirectBasisPair &&
      exactlyTwoRuntimeSources &&
      mappingsResolve &&
      methodologyCoverage &&
      directBasisCoverage &&
      rightsHandlingExplicit &&
      noCorroborationInflation,
    authorityBoundary: Object.freeze({
      existingV110RuntimeManifestMutated: false as const,
      reviewerAuthorityCreated: false as const,
      lifecyclePromotionAuthorized: false as const,
      consumerActivationAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      production: 'HOLD' as const,
    }),
  });

  return Object.freeze({
    manifestId: deterministicContentHash(material),
    ...material,
  });
}
