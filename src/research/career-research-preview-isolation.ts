import type { InterpretationClaim } from '../contracts/interpretation.js';
import type { NarrativeEvidenceBundle } from '../contracts/narrative.js';
import { CAREER_NATAL_READING_METHODOLOGY } from './career-natal-reading-candidate.js';

export const CAREER_RESEARCH_PREVIEW_ISOLATION_VERSION = '0.1.0-research' as const;

export const CAREER_RESEARCH_PREVIEW_SELECTION = Object.freeze({
  version: CAREER_RESEARCH_PREVIEW_ISOLATION_VERSION,
  defaultPath: 'legacy_direct_t8' as const,
  personalizedDefaultAllowed: false as const,
  switchRequirement:
    'authorized_personalized_career_t8_pack_plus_explicit_preview_isolation_validation' as const,
});

export type CareerResearchPreviewIsolationReason =
  | 'NO_ACTIVE_CAREER_T8_CLAIMS'
  | 'NO_DIRECT_CAREER_CONCLUSION'
  | 'NON_LEGACY_CAREER_T8_PRESENT';

export interface CareerResearchPreviewIsolationReport {
  version: typeof CAREER_RESEARCH_PREVIEW_ISOLATION_VERSION;
  configuredPath: typeof CAREER_RESEARCH_PREVIEW_SELECTION.defaultPath;
  state: 'isolated_legacy_direct_t8' | 'blocked';
  activeCareerT8ClaimCount: number;
  legacyDirectT8ClaimCount: number;
  nonLegacyCareerT8ClaimCount: number;
  directCareerConclusionCount: number;
  personalizedDefaultAllowed: false;
  reasons: readonly CareerResearchPreviewIsolationReason[];
}

function isActiveCareerT8Claim(claim: InterpretationClaim): boolean {
  return (
    claim.state === 'active' &&
    claim.taxonomy.tier === 'T8' &&
    claim.taxonomy.category === 'career'
  );
}

function usesCurrentLegacyCareerMethodology(claim: InterpretationClaim): boolean {
  return (
    claim.methodologyRef.id === CAREER_NATAL_READING_METHODOLOGY.methodologyId &&
    claim.methodologyRef.version === CAREER_NATAL_READING_METHODOLOGY.version &&
    claim.upstreamClaimRefs.length === 0
  );
}

export function inspectCareerResearchPreviewIsolation(
  evidence: NarrativeEvidenceBundle,
): CareerResearchPreviewIsolationReport {
  const careerClaims = evidence.claims.filter(isActiveCareerT8Claim);
  const legacyClaims = careerClaims.filter(usesCurrentLegacyCareerMethodology);
  const nonLegacyClaims = careerClaims.filter((claim) => !usesCurrentLegacyCareerMethodology(claim));
  const directCareerConclusionCount = careerClaims.filter(
    (claim) => claim.predicate === 'career_conclusion',
  ).length;
  const reasons: CareerResearchPreviewIsolationReason[] = [];

  if (careerClaims.length === 0) reasons.push('NO_ACTIVE_CAREER_T8_CLAIMS');
  if (directCareerConclusionCount === 0) reasons.push('NO_DIRECT_CAREER_CONCLUSION');
  if (nonLegacyClaims.length > 0) reasons.push('NON_LEGACY_CAREER_T8_PRESENT');

  return Object.freeze({
    version: CAREER_RESEARCH_PREVIEW_ISOLATION_VERSION,
    configuredPath: CAREER_RESEARCH_PREVIEW_SELECTION.defaultPath,
    state: reasons.length === 0 ? 'isolated_legacy_direct_t8' : 'blocked',
    activeCareerT8ClaimCount: careerClaims.length,
    legacyDirectT8ClaimCount: legacyClaims.length,
    nonLegacyCareerT8ClaimCount: nonLegacyClaims.length,
    directCareerConclusionCount,
    personalizedDefaultAllowed: false,
    reasons: Object.freeze(reasons),
  });
}

export function assertCareerResearchPreviewEvidenceIsolation(
  evidence: NarrativeEvidenceBundle,
): CareerResearchPreviewIsolationReport {
  const report = inspectCareerResearchPreviewIsolation(evidence);
  if (report.state !== 'isolated_legacy_direct_t8') {
    throw new Error(`CAREER_RESEARCH_PREVIEW_ISOLATION_BLOCKED:${report.reasons.join(',')}`);
  }
  return report;
}
