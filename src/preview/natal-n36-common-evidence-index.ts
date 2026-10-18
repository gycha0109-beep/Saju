import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { NatalN31Domain } from './natal-n31-four-domain-claim-readings.js';
import type { buildNatalN32ExpandedDomainResearchReading } from './natal-n32-expanded-domain-research-reading.js';

export const NATAL_N36_COMMON_EVIDENCE_INDEX_VERSION =
  'saju-n36-same-chart-cross-domain-calculated-fact-links-v1' as const;

type OriginalReading = ReturnType<typeof buildNatalN32ExpandedDomainResearchReading>;
const DOMAINS = ['career', 'wealth', 'business', 'relationship'] as const;
const FACT_PATH = /^derivedFacts\.tenGods\.value\.(year|month|day|hour)\.(stem|branch)\.value$/u;

function requireValid(condition: unknown, reason: string): asserts condition {
  if (!condition) throw new TypeError('N36 shared evidence: ' + reason);
}

interface ClaimReference {
  claimId: string;
  claimType: string;
  ruleId: string;
  ruleVersion: string;
  sourceIds: readonly string[];
}

/**
 * Index a single canonical calculated fact only when distinct, separately
 * evaluated existing research domains actually cite that exact fact path.
 * Shared structure is NOT shared semantic meaning or predictive synthesis.
 */
export function buildNatalN36CommonEvidenceIndex(reading: OriginalReading) {
  const first = reading.firstScreen;
  requireValid(reading.researchOnly && !reading.createsNewMeaning &&
    !reading.mayPublish && !reading.maySell && !reading.usefulComplete &&
    reading.originalQualifiedLeftUnread === 0 &&
    first.originalResearchRuleAndCopyVerified &&
    first.snapshotId === reading.snapshotId &&
    first.calculationHash === reading.calculationHash &&
    reading.sections.length === 4 && first.sections.length === 4,
    'unverified or promoted research input');

  const sourceMaterials: Array<{domain: NatalN31Domain; originalTypes: unknown[]}> = [];
  const index = new Map<string, {
    value: string;
    domains: Map<NatalN31Domain, ClaimReference[]>;
  }>();

  for (const domain of DOMAINS) {
    const section = first.sections.find(s => s.domain === domain);
    const detail = reading.sections.find(s => s.domain === domain);
    requireValid(section !== undefined && detail !== undefined &&
      section.visibleClaims.length + detail.additionalVerifiedClaims.length ===
        section.eligibleClaimCount &&
      detail.totalQualifiedOriginalCount === section.eligibleClaimCount &&
      detail.initialVerifiedCount === section.visibleClaims.length &&
      detail.originalQualifiedLeftUnread === 0, 'incomplete original domain evidence');
    const claims = [...section.visibleClaims, ...detail.additionalVerifiedClaims];
    sourceMaterials.push({
      domain,
      originalTypes: claims.map(c => ({
        claimType: c.claimType, text: c.summary, positions: c.calculatedPositions,
        rule: c.claimRuleId, ruleVersion: c.claimRuleVersion,
        methodologyVersion: c.methodologyVersion,
        profileVersion: c.profileVersion,
        factPaths: c.calculatedFactPaths, source: c.sourceIds,
      })),
    });
    for (const claim of claims) {
      requireValid(claim.researchOnly && !claim.predictsOutcome &&
        claim.claimType.startsWith(domain.toUpperCase() + '_NATAL_') &&
        claim.sourceIds.length > 0 && claim.claimRuleId.length > 0 &&
        claim.calculatedPositions.length > 0 &&
        claim.calculatedFactPaths.length === claim.calculatedPositions.length,
        'unsupported or unbound research Claim');
      const reference: ClaimReference = {
        claimId: claim.claimId, claimType: claim.claimType,
        ruleId: claim.claimRuleId, ruleVersion: claim.claimRuleVersion,
        sourceIds: [...claim.sourceIds],
      };
      for (let i = 0; i < claim.calculatedFactPaths.length; i += 1) {
        const path = claim.calculatedFactPaths[i]!;
        const value = claim.calculatedPositions[i]!;
        requireValid(FACT_PATH.test(path) && value.trim().length > 0,
          'noncanonical position evidence');
        const existing = index.get(path);
        requireValid(existing === undefined || existing.value === value,
          'one Canonical fact path mapped to conflicting displayed evidence');
        const record = existing ?? { value, domains: new Map() };
        if (existing === undefined) index.set(path, record);
        const domainClaims = record.domains.get(domain) ?? [];
        if (!domainClaims.some(c => c.claimId === claim.claimId)) domainClaims.push(reference);
        record.domains.set(domain, domainClaims);
      }
    }
  }
  requireValid(deterministicContentHash(sourceMaterials) ===
    reading.originalResearchFingerprint,
    'original source text, Claim or calculated position changed');
  const sharedFacts = [...index.entries()].filter(([, evidence]) =>
    evidence.domains.size >= 2).sort(([a], [b]) => a.localeCompare(b))
    .map(([path, evidence]) => ({
      factPath: path,
      calculatedPosition: evidence.value,
      domains: DOMAINS.filter(domain => evidence.domains.has(domain)).map(domain => ({
        domain,
        claims: evidence.domains.get(domain)!,
      })),
    }));

  return {
    version: NATAL_N36_COMMON_EVIDENCE_INDEX_VERSION,
    lifecycle: 'internal_research_preview_only' as const,
    snapshotId: reading.snapshotId,
    calculationHash: reading.calculationHash,
    sharedFacts,
    sharedFactCount: sharedFacts.length,
    distinctDomainCount: new Set(sharedFacts.flatMap(f =>
      f.domains.map(d => d.domain))).size,
    independentDomainMeaningProven: false as const,
    createsNewInterpretation: false as const,
    researchOnly: true as const,
    usefulComplete: false as const,
    mayPublish: false as const,
    maySell: false as const,
    limitation: '같은 계산 위치가 여러 분야의 기존 연구 Claim에 인용됐다는 사실만 보여줍니다. 분야 사이의 인과관계나 길흉 결과를 새로 추론하지 않습니다.',
  };
}
