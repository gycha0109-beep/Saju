/**
 * Research-only comparison of actually selected, source-issued natal T8.
 *
 * A claim's authorized semantic identity is independent of the chart-specific
 * input positions, the birth label, and the text renderer. This deliberately
 * does NOT infer whether a different observed position warrants a different
 * life conclusion.
 */
export interface SourceIssuedNatalMeaning {
  claimType: string;
  pattern: string;
  axis: string;
  channel: 'visible_stems' | 'branches';
  ruleId: string;
  methodologyId?: string;
  sourceIds: readonly string[];
  upstreamClaimIds: readonly string[];
  factPaths: readonly string[];
  paragraph: string;
}

export interface SourceNatalMeaningSignatures {
  /** Different admitted Claim/Rule/Source/Methodology => different source meaning. */
  claimMeaning: readonly string[];
  /** Positions consumed by the source claims; fact VALUES deliberately absent. */
  evidenceRoles: readonly string[];
  /** User-visible prose differences, separately from semantic evidence. */
  wording: readonly string[];
}

const FACT_PATH = /^derivedFacts\.tenGods\.value\.(year|month|day|hour)\.(stem|branch)\.value$/u;

function channelNeutralId(value: string): string {
  return value.replace(/_(VISIBLE_STEMS|BRANCHES)$/u, '');
}

export function buildSourceNatalMeaningSignatures(
  domains: readonly {
    domain: string;
    sections: readonly SourceIssuedNatalMeaning[];
  }[],
): SourceNatalMeaningSignatures {
  const claimMeaning: string[] = [];
  const evidenceRoles: string[] = [];
  const wording: string[] = [];
  for (const domain of domains) {
    for (const section of domain.sections) {
      const claimedChannel = section.channel === 'branches' ? '_BRANCHES' : '_VISIBLE_STEMS';
      const pathChannel = section.channel === 'branches' ? '.branch.value' : '.stem.value';
      if (!['general', 'career', 'wealth', 'business', 'relationship'].includes(domain.domain) ||
          !section.claimType.startsWith(domain.domain.toUpperCase() + '_NATAL_MULTIFACTOR_') ||
          !section.claimType.endsWith(claimedChannel) ||
          section.ruleId !== 'RULE-' + section.claimType ||
          !section.axis || !section.pattern || section.sourceIds.length === 0 ||
          section.upstreamClaimIds.length < 2 ||
          section.factPaths.length < 2 ||
          new Set(section.factPaths).size !== section.factPaths.length ||
          !section.factPaths.every(path => FACT_PATH.test(path) && path.endsWith(pathChannel)) ||
          !section.paragraph.trim()) {
        throw new TypeError('Natal meaning signature requires a source-issued T8 and observed T5 facts.');
      }
      const identity = {
        domain: domain.domain,
        claim: channelNeutralId(section.claimType),
        axis: section.axis,
        pattern: section.pattern,
        rule: channelNeutralId(section.ruleId),
        methodology: section.methodologyId ?? null,
        sources: [...new Set(section.sourceIds)].sort(),
      };
      const meaning = JSON.stringify(identity);
      claimMeaning.push(meaning);
      evidenceRoles.push(JSON.stringify({
        meaning,
        channel: section.channel,
        factPaths: [...new Set(section.factPaths)].sort(),
      }));
      wording.push(JSON.stringify({
        domain: domain.domain,
        text: section.paragraph.trim(),
      }));
    }
  }
  return {
    claimMeaning: claimMeaning.sort(),
    evidenceRoles: evidenceRoles.sort(),
    wording: wording.sort(),
  };
}
