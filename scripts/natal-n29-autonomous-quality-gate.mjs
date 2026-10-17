import { readFileSync, writeFileSync } from 'node:fs';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

export const N29_AUTONOMOUS_QUALITY_VERSION =
  'saju-natal-n29-autonomous-chart-source-consumer-qa-v1';

function requireEvidence(condition, message) {
  if (!condition) throw new TypeError('N29 autonomous gate fail-closed: ' + message);
}
function byCase(cases, label) {
  requireEvidence(Array.isArray(cases) && cases.length === 35, label + ': 35 cases required');
  const index = new Map(cases.map(c => [c.caseId, c]));
  requireEvidence(index.size === 35 && !index.has(undefined), label + ': duplicate/missing case ID');
  return index;
}
function sourceSignature(entry) {
  return JSON.stringify(entry.claimReceipts.map(r => ({
    type: r.claimType, position: r.position,
    sources: r.sourceIds, rules: r.ruleIds,
  })));
}

/**
 * Evidence-based N29 Preview quality gate. Compares independently produced
 * actual-HTTP audit artifacts: N10 pairs, N26 transport, N27a reader,
 * N27b exact Claim receipts, and N28 consumer report. Not fortune validation.
 */
export function evaluateNatalN29AutonomousQuality({baseline, n10, n26, n27, n27b, n28}) {
  requireEvidence(baseline.numberOfCases === 35 && baseline.mayPublish === false,
    'unverified HTTP baseline');
  requireEvidence(n10.uniqueDisplayedChartPairCount === 19 &&
    Array.isArray(n10.pairs) && n10.pairs.length === 20,
    'unique nineteen actual-chart pairs required');
  requireEvidence(n26.eligibleDeliveredCaseCount === 33 &&
    n26.exactPreservedCases === 33 && n26.mismatchCases.length === 0,
    '33/33 independently verified HTTP delivery required');
  requireEvidence(n27.actualHttpCaseCount === 35 && n27.generatedKnownTimeCases === 33 &&
    n27.missingTimeCasesWithGeneratedReading === 0,
    'N27 source-bound chart reading coverage');
  requireEvidence(n27b.count === 35 && n27b.sourcedKnownTime === 33 &&
    n27b.unknownTimeWithoutFabrication === 2 &&
    n27b.chartAndSourceVerified === true && n27b.checkedReceipts > 0,
    'independent source receipt coverage');
  requireEvidence(n28.actualHttpCaseCount === 35 && n28.verifiedKnownTimeReports === 33 &&
    n28.unknownTimeReportCount === 0 && n28.originalOfficialSectionsPreserved === true &&
    n28.originalReadingIdentityPreserved === true && n28.readerFirst === true,
    'N28 Official/Product preservation');
  const base = byCase(baseline.cases, 'HTTP');
  const reader = byCase(n27.cases, 'N27');
  const receipts = byCase(n27b.cases, 'N27b');
  const reports = byCase(n28.cases, 'N28');
  const parity = new Map(n26.cases.map(c => [c.caseId, c]));
  requireEvidence(parity.size === 33 && n26.cases.length === 33,
    'duplicate or missing transport-parity identities');

  let verifiedClaims = 0, known = 0, unknown = 0;
  for (const [caseId, original] of base) {
    const a = reader.get(caseId), b = receipts.get(caseId), c = reports.get(caseId);
    requireEvidence(a && b && c && original.responseState === a.responseState &&
      original.responseState === b.originalHttpState &&
      a.actualChartHash === b.snapshotHash && a.birthTimeKnown === c.timeKnown,
      'source/chart identity drift: ' + caseId);
    const delivered = original.responseState === 'delivered' ||
      original.responseState === 'delivered_with_fallback';
    requireEvidence(c.delivered === delivered && a.unchangedReadingId === true &&
      c.stableHttpReadingId === true && c.preservedOfficialSections === true &&
      c.reportBeforeMain === true &&
      b.chartBoundSourceIntegrity === true && b.originalCopyPreserved === true &&
      b.noUnqualifiedRendering === true && b.checkedClaims === b.expectedClaims,
      'original/Official/Claim integrity lost: ' + caseId);
    if (delivered && a.birthTimeKnown) {
      known++;
      requireEvidence(parity.get(caseId)?.exactAfterPermittedN9Compaction === true &&
        parity.get(caseId)?.readingIdentityAssertedSame === false,
        'HTTP source meaning not independently preserved: ' + caseId);
      requireEvidence(b.checkedClaims > 0 &&
        b.claimReceipts.length === b.checkedClaims &&
        a.selectedParagraphCount === b.checkedClaims + 1 &&
        a.selectedParagraphs.length === b.checkedClaims + 1 &&
        c.composed === true && c.verifiedThemeCount === b.checkedClaims &&
        c.factRows.length === b.checkedClaims &&
        c.actualPreviewParagraphs.length === b.checkedClaims + 1,
        'missing or extra report meaning: ' + caseId);
      for (let i = 0; i < b.claimReceipts.length; i++) {
        const proof = b.claimReceipts[i];
        requireEvidence(proof.claimType && proof.position &&
          proof.sourceIds.length > 0 && proof.ruleIds.length > 0 &&
          a.selectedParagraphs[i+1].includes(proof.position) &&
          c.actualPreviewParagraphs[i+1] === a.selectedParagraphs[i+1] &&
          c.factRows[i].value === proof.position,
          'Claim placement/source not preserved in consumer explanation: ' + caseId);
      }
      verifiedClaims += b.checkedClaims;
    } else {
      unknown++;
      requireEvidence(!delivered && !a.birthTimeKnown &&
        a.selectedParagraphCount === 0 && b.checkedClaims === 0 &&
        b.claimReceipts.length === 0 && c.composed === false &&
        c.reportTextHash === null && !parity.has(caseId),
        'unknown hour inferred or partial case promoted: ' + caseId);
    }
  }
  requireEvidence(known === 33 && unknown === 2 &&
    verifiedClaims === n27b.checkedReceipts,
    'all thirty-five actual samples must be verified');

  // This repeated input must NEVER receive artificially different prose.
  const control = 'same-birth-control-2024-03-10-12:30';
  const original = 'solar-2024-03-10-12:30';
  requireEvidence(reader.get(control)?.actualChartHash === reader.get(original)?.actualChartHash &&
    reader.get(control)?.selfServiceTextFingerprint === reader.get(original)?.selfServiceTextFingerprint &&
    receipts.get(control)?.receiptHash === receipts.get(original)?.receiptHash &&
    reports.get(control)?.reportTextHash === reports.get(original)?.reportTextHash,
    'identical birth-input control falsely diversified');

  let explainedDifferences = 0, sameSourceMeaning = 0;
  const distinctPairs = new Set();
  for (const pair of n10.pairs) {
    const left = reader.get(pair.left), right = reader.get(pair.right);
    const leftReceipt = receipts.get(pair.left), rightReceipt = receipts.get(pair.right);
    const leftReport = reports.get(pair.left), rightReport = reports.get(pair.right);
    requireEvidence(left && right && leftReceipt && rightReceipt && leftReport && rightReport &&
      left.actualChartHash !== right.actualChartHash &&
      leftReceipt.checkedClaims > 0 && rightReceipt.checkedClaims > 0,
      'invalid real different-chart contrast');
    distinctPairs.add([left.actualChartHash,right.actualChartHash].sort().join('|'));
    const evidenceDiffers = sourceSignature(leftReceipt) !== sourceSignature(rightReceipt);
    const reportDiffers = leftReport.reportTextHash !== rightReport.reportTextHash;
    requireEvidence(evidenceDiffers === reportDiffers,
      'consumer report diverged from material Claim/position evidence: ' +
      pair.left + '/' + pair.right);
    if (evidenceDiffers) explainedDifferences++;
    else sameSourceMeaning++;
  }
  requireEvidence(distinctPairs.size === 19, 'nineteen deduplicated unique pairs missing');
  return Object.freeze({
    version: N29_AUTONOMOUS_QUALITY_VERSION,
    lifecycle: 'internal_quality_gate',
    actualHttpCaseCount: 35, verifiedKnownTime: known, safePartialEvidence: unknown,
    verifiedClaimReceipts: verifiedClaims, comparedPairs: n10.pairs.length,
    uniqueChartPairs: distinctPairs.size,
    evidenceExplainedDifferenceComparisons: explainedDifferences,
    legitimatelyEqualSourceComparisons: sameSourceMeaning,
    deterministicSameBirthControl: true,
    officialProductMeaningPreserved: true,
    unsupportedOutcomeClaimsApproved: false,
    empiricalFortuneAccuracyProven: false,
    usefulComplete: false, productReady: false, mayPublish: false, maySell: false,
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  requireEvidence(args.length === 7,
    'usage: baseline N10 N26 N27a N27b N28 output.json');
  const [baseline, n10, n26, n27, n27b, n28] =
    args.slice(0,6).map(p => JSON.parse(readFileSync(p, 'utf8')));
  const output = evaluateNatalN29AutonomousQuality({
    baseline, n10, n26, n27, n27b, n28,
  });
  writeFileSync(args[6], JSON.stringify(output,null,2) + '\n', 'utf8');
  process.stdout.write('N29 autonomous gate: ' + output.verifiedKnownTime +
    '/35 delivered, ' + output.uniqueChartPairs + ' unique pair comparisons, ' +
    output.verifiedClaimReceipts + ' source receipts, no forced identical-chart variation; ' +
    args[6] + '\n');
}
