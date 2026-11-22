import { createHash } from 'node:crypto';

export function createEvidenceFingerprint(evidence) {
  return createHash('sha256').update(JSON.stringify(evidence)).digest('hex');
}

/**
 * Counts identical reader text backed by different evidence and/or meaning
 * profiles. It is a review signal, not an automatic failure or a diversity score.
 */
export function summarizeEvidenceTextRepetition(rows) {
  const groups = new Map();
  for (const row of rows) {
    if (!row.text?.trim() || !row.exactKey || !row.evidenceKey || !row.meaningKey) continue;
    const group = groups.get(row.exactKey) ?? {
      count: 0,
      evidenceKeys: new Set(),
      meaningKeys: new Set(),
    };
    group.count += 1;
    group.evidenceKeys.add(row.evidenceKey);
    group.meaningKeys.add(row.meaningKey);
    groups.set(row.exactKey, group);
  }

  const repeated = [...groups.values()].filter((group) => group.count > 1);
  const distinctEvidence = repeated.filter((group) => group.evidenceKeys.size > 1);
  const distinctMeaning = repeated.filter((group) => group.meaningKeys.size > 1);
  return {
    repeatedTextGroups: repeated.length,
    casesInRepeatedTextGroups: repeated.reduce((sum, group) => sum + group.count, 0),
    distinctEvidenceSameTextGroups: distinctEvidence.length,
    casesWithDistinctEvidenceSameText: distinctEvidence.reduce(
      (sum, group) => sum + group.count,
      0,
    ),
    distinctMeaningSameTextGroups: distinctMeaning.length,
    casesWithDistinctMeaningSameText: distinctMeaning.reduce((sum, group) => sum + group.count, 0),
  };
}

export function summarizeEvidenceProfiles(rows) {
  const counts = new Map();
  for (const row of rows) {
    if (!row.text?.trim() || !row.evidenceKey) continue;
    counts.set(row.evidenceKey, (counts.get(row.evidenceKey) ?? 0) + 1);
  }
  const repeated = [...counts.values()].filter((count) => count > 1);
  return {
    covered: [...counts.values()].reduce((sum, count) => sum + count, 0),
    unique: counts.size,
    repeatedGroups: repeated.length,
    casesInRepeatedGroups: repeated.reduce((sum, count) => sum + count, 0),
    largestRepeatedGroup: repeated.length ? Math.max(...repeated) : 0,
  };
}

export function summarizeResearchMURCoverage(rows) {
  const entries = rows.filter((row) => row.mur);
  if (entries.length === 0) return null;

  const tally = (values) =>
    Object.fromEntries(
      [
        ...values.reduce((counts, value) => {
          counts.set(value, (counts.get(value) ?? 0) + 1);
          return counts;
        }, new Map()),
      ].sort(([a], [b]) => String(a).localeCompare(String(b))),
    );
  const missingProfiles = new Set(
    entries.map((row) => JSON.stringify(row.mur.missingRequirements)),
  );
  return {
    covered: entries.length,
    researchStateCounts: tally(entries.map((row) => row.mur.state)),
    selectedSectionCountDistribution: tally(entries.map((row) => row.mur.selectedSectionCount)),
    additionalVerifiedSectionCountDistribution: tally(
      entries.map((row) => row.mur.additionalVerifiedSectionCount ?? 0),
    ),
    supportingClaimCountDistribution: tally(entries.map((row) => row.mur.supportingClaimCount)),
    coreSelectedCases: entries.filter((row) => row.mur.coreClaimType !== null).length,
    casesWithMissingRequirements: entries.filter((row) => row.mur.missingRequirements.length > 0)
      .length,
    totalMissingRequirements: entries.reduce(
      (sum, row) => sum + row.mur.missingRequirements.length,
      0,
    ),
    uniqueMissingRequirementProfiles: missingProfiles.size,
    consumerMURCompleteCases: entries.filter((row) => row.mur.usefulComplete).length,
  };
}
