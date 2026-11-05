/**
 * Reuse of a verified T0 fact across DIFFERENT existing T8 domain readings.
 * This module identifies provenance overlap; it never synthesizes new meaning.
 */
export const NATAL_SHARED_EVIDENCE_VERSION = 'natal-shared-fact-cross-domain-v1' as const;
export type NatalDomainKey = 'general' | 'career' | 'wealth' | 'business' | 'relationship';
const ORDER: readonly NatalDomainKey[] = ['general', 'career', 'wealth', 'business', 'relationship'];
const FACT_PATH = /^derivedFacts\.tenGods\.value\.(year|month|day|hour)\.(stem|branch)\.value$/u;

export interface NatalDomainEvidenceSection {
  headline: string;
  positions: readonly string[];
  factPaths: readonly string[];
  sourceIds: readonly string[];
}
export interface NatalDomainEvidence {
  domain: NatalDomainKey;
  label: string;
  sections: readonly NatalDomainEvidenceSection[];
}
export interface SharedNatalDomainReference {
  domain: NatalDomainKey;
  label: string;
  headline: string;
}
export interface SharedNatalFactLink {
  factPath: string;
  position: string;
  left: SharedNatalDomainReference;
  right: SharedNatalDomainReference;
}
function guard(value: unknown, message: string): asserts value {
  if (!value) throw new TypeError('Natal shared-evidence reader: ' + message);
}

/**
 * Return at most four chart-specific observations linking different existing
 * source-bound domain readings to the SAME exact canonical fact path.
 * Prefer new domains over repeated domains; never force a cross-domain match.
 */
export function findSharedNatalFactLinks(
  domains: readonly NatalDomainEvidence[],
): readonly SharedNatalFactLink[] {
  guard(domains.length === ORDER.length &&
    ORDER.every((domain, index) => domains[index]?.domain === domain),
  'five source-owned domains must be provided in canonical order');

  const entries = new Map<string, Map<NatalDomainKey, {
    position: string; ref: SharedNatalDomainReference;
  }>>();
  for (const { domain, label, sections } of domains) {
    guard(label.trim().length > 0, 'empty domain label');
    for (const section of sections) {
      guard(section.headline.trim().length > 0 &&
        section.sourceIds.length > 0 && section.sourceIds.every(id => id.trim().length > 0) &&
        section.positions.length >= 2 &&
        section.positions.length === section.factPaths.length,
      'unqualified or incomplete domain interpretation');
      for (let i = 0; i < section.factPaths.length; i += 1) {
        const path = section.factPaths[i]!;
        const position = section.positions[i]!;
        guard(FACT_PATH.test(path) && position.trim().length > 0,
          'unsupported or unlabelled canonical fact path');
        let byDomain = entries.get(path);
        if (!byDomain) {
          byDomain = new Map();
          entries.set(path, byDomain);
        }
        for (const saved of byDomain.values()) {
          guard(saved.position === position,
            'same exact fact path has inconsistent observed position');
        }
        if (!byDomain.has(domain)) {
          byDomain.set(domain, { position, ref: { domain, label, headline: section.headline } });
        }
      }
    }
  }

  const candidates: SharedNatalFactLink[] = [];
  for (const [factPath, perDomain] of [...entries.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const refs = [...perDomain.values()]
      .sort((a, b) => ORDER.indexOf(a.ref.domain) - ORDER.indexOf(b.ref.domain));
    for (let i = 0; i < refs.length; i += 1) {
      for (let k = i + 1; k < refs.length; k += 1) {
        const left = refs[i]!;
        const right = refs[k]!;
        // Identical headings alone are not a useful cross-domain distinction.
        if (left.ref.headline === right.ref.headline) continue;
        candidates.push({
          factPath, position: left.position, left: left.ref, right: right.ref,
        });
      }
    }
  }

  const result: SharedNatalFactLink[] = [];
  const coveredDomains = new Set<NatalDomainKey>();
  const coveredPaths = new Set<string>();
  const coveredPairs = new Set<string>();
  while (result.length < 4) {
    let best: SharedNatalFactLink | undefined;
    let bestScore = -1;
    for (const candidate of candidates) {
      const pair = candidate.left.domain + '/' + candidate.right.domain;
      if (coveredPaths.has(candidate.factPath) || coveredPairs.has(pair)) continue;
      const score = Number(!coveredDomains.has(candidate.left.domain)) +
        Number(!coveredDomains.has(candidate.right.domain));
      if (score > bestScore) {
        best = candidate;
        bestScore = score;
      }
    }
    if (!best) break;
    result.push(best);
    coveredPaths.add(best.factPath);
    coveredDomains.add(best.left.domain);
    coveredDomains.add(best.right.domain);
    coveredPairs.add(best.left.domain + '/' + best.right.domain);
  }
  return result;
}
