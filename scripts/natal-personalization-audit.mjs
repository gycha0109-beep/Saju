import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import {
  createMyeonghwaProductionPreviewOnlyCalculationProcessV1,
  PRODUCTION_CALCULATION_PROCESS_ENV_V1,
} from '../dist/production-calculation-process.js';
import { PRODUCT_PREVIEW_READING_HTTP_PATH } from '../dist/production-calculation-host.js';
import { buildNatalMeaningQualityAudit } from '../dist/preview/natal-meaning-quality-audit.js';
import { buildNatalRuleDifferentiationReport } from '../dist/preview/natal-rule-differentiation.js';
import { buildNatalStructuralEvidence } from '../dist/preview/natal-structural-evidence.js';
import { buildNatalActivatedThemePreview } from '../dist/preview/natal-activated-theme-preview.js';
import { buildNatalAppliedThemeContext } from '../dist/preview/natal-applied-theme-context.js';
import { GENERAL_NATAL_ROLE_OBSERVATION_PREFIX } from '../dist/preview/general-natal-consumer-role-observation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../dist/production/production-calculation-runtime.js';
import { createGeneralNatalIntegratedReadingRegistry } from '../dist/interpretation/general-natal-integrated-reading-registry.js';
import { runInterpretation } from '../dist/interpretation/interpretation-engine.js';
import { buildNatalCollisionTriageReport } from '../dist/preview/natal-collision-triage.js';
import { runProductReadingInternals } from '../dist/reading/product-reading-service.js';
import { deterministicContentHash } from '../dist/interpretation/rule-registry.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../dist/llm/prompt-compiler.js';
import { resolvePreviewSemanticAdmissionV1 } from '../dist/preview/preview-semantic-admission.js';
import { renderNatalReaderReviewPacketV1 } from './natal-reader-review-packet.mjs';
import { buildNatalN17DifferentiationAudit } from '../dist/preview/natal-grounded-reading-differentiation.js';
import { buildNatalN21ReaderFirstStory } from '../dist/preview/natal-reader-first-story.js';
import { traceNatalN25ConsumerMeaningAtoms } from '../dist/preview/natal-n25-consumer-meaning-atom-trace.js';
import { buildNatalN25BAllPairForensics } from '../dist/preview/natal-n25b-all-pair-source-copy-forensics.js';
import { auditNatalN26HttpMeaningTransport } from '../dist/preview/natal-n26-http-meaning-transport.js';
import { attachNatalN27SelfServiceEvidenceReading } from '../dist/preview/natal-n27-self-service-evidence-reading.js';
import { buildNatalN16GroundedReaderBrief } from '../dist/preview/natal-grounded-reader-brief.js';
import { buildNatalN24ExpandedSourceReading } from '../dist/preview/natal-expanded-source-reading.js';

const bearer = 'local-natal-quality-audit-not-a-production-secret';
const dates = [
  '1984-01-07',
  '1989-09-08',
  '1992-01-12',
  '1996-01-09',
  '2001-06-21',
  '2010-02-03',
  '2018-07-14',
  '2024-03-10',
];
const times = ['00:30', '05:30', '12:30', '19:30'];
const fixtures = [
  ...dates.flatMap((date) =>
    times.map((time) => ({
      caseId: `solar-${date}-${time}`,
      birth: { calendarType: 'solar', date, time, sex: 'unspecified' },
    })),
  ),
  ...['1992-01-12', '2024-03-10'].map((date) => ({
    caseId: `unknown-time-${date}`,
    birth: { calendarType: 'solar', date, time: null, sex: 'unspecified' },
  })),
  {
    caseId: 'same-birth-control-2024-03-10-12:30',
    birth: {
      calendarType: 'solar',
      date: '2024-03-10',
      time: '12:30',
      sex: 'unspecified',
    },
  },
];

async function listenEphemeral(server) {
  await new Promise((ok, fail) => {
    server.once('error', fail);
    server.listen(0, '127.0.0.1', () => {
      server.off('error', fail);
      ok();
    });
  });
  const address = server.address();
  if (address === null || typeof address === 'string') {
    throw new TypeError('No preview loopback address');
  }
  return `http://127.0.0.1:${address.port}`;
}

async function close(server) {
  if (!server.listening) return;
  await new Promise((ok, fail) => server.close((error) => (error ? fail(error) : ok())));
}

async function main() {
  const outputPath = resolve(process.argv[2] ?? 'natal-personalization-baseline.json');
  const runtime = createMyeonghwaProductionPreviewOnlyCalculationProcessV1({
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.serviceBearer]: bearer,
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.host]: '127.0.0.1',
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.port]: '3000',
  });
  const inputs = [];
  const researchRuleEvidence = [];
  const appliedByCaseId = new Map();
  const interpretedByCaseId = new Map();
  const auditNow = new Date('2026-10-15T00:00:00.000Z');
  const registry = createGeneralNatalIntegratedReadingRegistry(auditNow.toISOString());
  const origin = await listenEphemeral(runtime.server);
  try {
    for (const fixture of fixtures) {
      const response = await globalThis.fetch(`${origin}${PRODUCT_PREVIEW_READING_HTTP_PATH}`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${bearer}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({ birth: fixture.birth, reading: { text: '사주' } }),
      });
      if (!response.ok) {
        throw new Error(`Preview HTTP ${response.status} for ${fixture.caseId}`);
      }
      const [year, month, day] = fixture.birth.date.split('-').map(Number);
      if (year === undefined || month === undefined || day === undefined) {
        throw new TypeError(`Invalid audit fixture date: ${fixture.caseId}`);
      }
      const hour = fixture.birth.time === null ? undefined : Number(fixture.birth.time.slice(0, 2));
      const minute = fixture.birth.time === null ? undefined : Number(fixture.birth.time.slice(3, 5));
      const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot({
        calendarType: 'solar',
        date: { year, month, day },
        time: hour === undefined || minute === undefined
          ? { known: false }
          : { known: true, hour, minute },
        sexForTraditionalCalculation: 'unspecified',
      }, { now: auditNow }).snapshot;
      const interpretation = runInterpretation(snapshot, registry, {
        requestId: `n3-quality-audit-${fixture.caseId}`,
        now: auditNow,
      });
      interpretedByCaseId.set(fixture.caseId, { snapshot, interpretation });
      researchRuleEvidence.push({
        caseId: fixture.caseId,
        snapshotId: snapshot.snapshotId,
        interpretation,
      });
      const applied = buildNatalAppliedThemeContext(
        buildNatalStructuralEvidence(snapshot),
        buildNatalActivatedThemePreview(interpretation),
      );
      appliedByCaseId.set(fixture.caseId, applied);
      inputs.push({
        caseId: fixture.caseId,
        birthLabel: `${fixture.birth.date} ${fixture.birth.time ?? 'unknown-time'}`,
        response: await response.json(),
      });
    }
  } finally {
    await close(runtime.server);
  }

  // N17: actual HTTP Preview text, separated from canonical chart facts.
  // The audit explicitly does NOT certify a substantive T8 difference.
  const n17 = buildNatalN17DifferentiationAudit(inputs.map((input) => {
    const computed = interpretedByCaseId.get(input.caseId);
    if (computed === undefined) throw new Error('Missing canonical N17 case: ' + input.caseId);
    return {
      caseId: input.caseId,
      snapshot: computed.snapshot,
      sources: [{ domain: 'general', response: input.response }],
    };
  }));
  const n17Path = resolve(outputPath.endsWith('.json')
    ? outputPath.slice(0, -5) + '.n17-differentiation.json'
    : outputPath + '.n17-differentiation.json');
  writeFileSync(n17Path, JSON.stringify(n17, null, 2) + '\n', 'utf8');
  if (n17.cases.length !== fixtures.length || n17.substantiveMeaningValidated !== false) {
    throw new Error('N17 audit must cover all actual input cases without claiming semantic approval');
  }
  process.stdout.write(
    'Natal N17: ' + n17.cases.length + ' actual HTTP cases, ' +
    n17.differentStructureSameTextPairs + ' different-chart same-text pairs, ' +
    n17.differentStructureDifferentTextPairs + ' different-chart different-meaning-text pairs ' +
    '(meaning UNVERIFIED), ' + n17.comparisonsWithMissingReading +
    ' pairs missing interpretation; calculation-only context excluded; ' + n17Path + '\n',
  );

  // N21: the same 35 actual HTTP responses, without making unseen domain
  // responses or fake interpretation variants. Empty/unknown-time stays empty.
  const n21Cases = inputs.map((input) => {
    const computed = interpretedByCaseId.get(input.caseId);
    if (computed === undefined) throw new Error('Missing N21 canonical chart: ' + input.caseId);
    const story = buildNatalN21ReaderFirstStory(computed.snapshot, [
      { domain: 'general', response: input.response },
    ]);
    return {
      caseId: input.caseId, snapshotId: story.snapshotId,
      readingState: story.readingState,
      birthTimeKnown: story.birthTimeKnown,
      displayedActualInterpretationCount: story.displayedOriginalInterpretationCount,
      displayedDomainDistinctiveCount: story.displayedDomainDistinctiveCount,
      displayedCrossDomainSharedCount: story.displayedCrossDomainSharedCount,
      excerptSelectionVersion: story.excerptSelectionVersion,
      calculationFactsExcludedFromInterpretation: story.calculationFactsExcludedFromInterpretation,
      previewMeaningFingerprint: story.previewMeaningFingerprint,
      meaningDifferentiationProven: story.meaningDifferentiationProven,
      createsNewInterpretation: story.createsNewInterpretation,
      mayPublish: story.mayPublish, maySell: story.maySell,
    };
  });
  const n21 = {
    version: 'saju-n21-35-real-http-reader-first-audit-v1',
    caseCount: n21Cases.length,
    casesWithActualReading: n21Cases.filter((x) => x.displayedActualInterpretationCount > 0).length,
    displayedDomainDistinctiveCount: n21Cases.reduce((n,x) => n + x.displayedDomainDistinctiveCount, 0),
    displayedCrossDomainSharedCount: n21Cases.reduce((n,x) => n + x.displayedCrossDomainSharedCount, 0),
    casesWithoutActualReading: n21Cases.filter((x) => x.displayedActualInterpretationCount === 0).length,
    consumerClaimNewlyApproved: false,
    sourceMeaningDifferenceProven: false,
    mayPublish: false, maySell: false,
    cases: n21Cases,
  };
  if (n21.caseCount !== fixtures.length ||
      n21Cases.some((x) => x.createsNewInterpretation || x.meaningDifferentiationProven ||
        x.mayPublish || x.maySell ||
        x.displayedDomainDistinctiveCount + x.displayedCrossDomainSharedCount !== x.displayedActualInterpretationCount) ||
      n21Cases.some((x) => !x.birthTimeKnown && x.displayedActualInterpretationCount > 0)) {
    throw new Error('N21 reader-first story fabricated evidence or unsupported authority');
  }
  const n21Path = resolve(outputPath.endsWith('.json')
    ? outputPath.slice(0,-5) + '.n21-reader-first.json'
    : outputPath + '.n21-reader-first.json');
  writeFileSync(n21Path, JSON.stringify(n21,null,2) + '\n', 'utf8');
  process.stdout.write('Natal N23: ' + n21.displayedDomainDistinctiveCount +
    ' domain-exclusive source paragraphs, ' + n21.displayedCrossDomainSharedCount +
    ' cross-domain shared excerpts (single-domain HTTP sample); no new meaning\n');
  process.stdout.write('Natal N21: ' + n21.caseCount + ' real HTTP cases, ' +
    n21.casesWithActualReading + ' existing bounded readers, ' +
    n21.casesWithoutActualReading + ' with no bounded reading; ' + n21Path + '\n');

  // N24: evaluate the *same 35 real HTTP* outputs against their exact,
  // unmodified bounded Preview source paragraphs, not fabricated fixture text.
  const n24Cases = inputs.map((input) => {
    const computed = interpretedByCaseId.get(input.caseId);
    if (computed === undefined) throw new Error('Missing N24 canonical chart: ' + input.caseId);
    const sources = [{ domain: 'general', response: input.response }];
    const brief = buildNatalN16GroundedReaderBrief(computed.snapshot, sources);
    const first = buildNatalN21ReaderFirstStory(computed.snapshot, sources);
    const expanded = buildNatalN24ExpandedSourceReading(brief, first);
    if (expanded.firstScreenOriginalCount + expanded.additionalOriginalCount !==
        expanded.totalDistinctOriginalCount ||
        expanded.totalDistinctOriginalCount !== brief.interpretationTextUnitCount ||
        expanded.originalLeftUnreadCount !== 0 ||
        expanded.previewMeaningFingerprint !== first.previewMeaningFingerprint ||
        expanded.createsNewInterpretation || expanded.meaningDifferentiationProven ||
        expanded.mayPublish || expanded.maySell) {
      throw new Error('N24 lost, invented, or changed original source reading');
    }
    return {
      caseId: input.caseId,
      snapshotId: expanded.snapshotId,
      birthTimeKnown: first.birthTimeKnown,
      firstScreenOriginalCount: expanded.firstScreenOriginalCount,
      additionalOriginalCount: expanded.additionalOriginalCount,
      completeOriginalCount: expanded.totalDistinctOriginalCount,
      originalLeftUnreadCount: expanded.originalLeftUnreadCount,
      excludedCalculatedTextUnits: expanded.excludedCalculatedTextUnits,
      previewMeaningFingerprint: expanded.previewMeaningFingerprint,
    };
  });
  const n24 = {
    version: 'saju-n24-35-real-http-complete-source-reading-audit-v1',
    lifecycle: 'internal_quality_audit',
    caseCount: n24Cases.length,
    fullyDeliveredOriginalCount: n24Cases.reduce((sum, c) => sum + c.completeOriginalCount, 0),
    additionalOriginalCount: n24Cases.reduce((sum, c) => sum + c.additionalOriginalCount, 0),
    originalLeftUnreadCount: n24Cases.reduce((sum, c) => sum + c.originalLeftUnreadCount, 0),
    createsNewInterpretation: false,
    meaningDifferentiationProven: false,
    mayPublish: false, maySell: false,
    cases: n24Cases,
  };
  if (n24.caseCount !== fixtures.length ||
      n24.caseCount < 30 || n24.originalLeftUnreadCount !== 0) {
    throw new Error('N24 requires all 35 real cases with no undisplayed source meaning');
  }
  const n24Path = resolve(outputPath.endsWith('.json')
    ? outputPath.slice(0, -5) + '.n24-expanded-source.json'
    : outputPath + '.n24-expanded-source.json');
  writeFileSync(n24Path, JSON.stringify(n24, null, 2) + '\n', 'utf8');
  process.stdout.write('Natal N24: ' + n24.caseCount + ' real HTTP cases, ' +
    n24.fullyDeliveredOriginalCount + ' distinct authentic source units, ' +
    n24.additionalOriginalCount + ' newly accessible in domain detail, 0 hidden; ' +
    n24Path + '\n');

  const { consumer: report, meaning: meaningReport, quality: meaningQuality } =
    buildNatalMeaningQualityAudit(inputs);
  // N11: reviewer packet reproduces actual consumer HTTP reading sections.
  // A generated packet never marks expert assessment complete.
  const n11Path = resolve(outputPath.endsWith('.json')
    ? outputPath.slice(0, -5) + '.n11-review.html'
    : outputPath + '.n11-review.html');
  writeFileSync(n11Path, renderNatalReaderReviewPacketV1(inputs), 'utf8');
  process.stdout.write('Natal N11: 10 actual HTTP Preview cases, 8 delivered and 2 partial; HUMAN REVIEW INCOMPLETE; ' + n11Path + '\n');
  writeFileSync(outputPath, JSON.stringify(report, null, 2) + '\n', 'utf8');
  const meaningOutputPath = resolve(
    outputPath.endsWith('.json')
      ? outputPath.slice(0, -5) + '.meaning.json'
      : outputPath + '.meaning.json',
  );
  writeFileSync(meaningOutputPath, JSON.stringify(meaningQuality, null, 2) + '\n', 'utf8');
  process.stdout.write(
    `Natal N6: ${meaningQuality.repeatedMeaningPairs} repeated-meaning pairs, ` +
      `${meaningQuality.pairsSeparatedOnlyByCalculatedFacts} differ only by factual prose, ` +
      `${meaningQuality.actualRepeatedConsumerPairs} repeated full consumer pairs; ${meaningOutputPath}\n`,
  );
  // N9: fail if a consumer General Natal key-point list still repeats
  // identical visible text. Never count reduced repetition as additional
  // individualized meaning; N6 compares the actual post-compaction body.
  const n9Repeated = inputs.map((input) => {
    const blocks = input.response.reading?.sections
      .filter((section) => section.title === '주요 해석' && section.state === 'complete')
      .flatMap((section) => section.blocks)
      .filter((block) => block.type === 'key_points') ?? [];
    const duplicateCount = blocks.reduce((count, block) =>
      count + block.items.length - new Set(block.items).size, 0);
    return { caseId: input.caseId, duplicateCount };
  });
  const n9 = {
    version: 'saju-natal-n9-consumer-repeat-compaction-quality-v1',
    lifecycle: 'internal_quality_audit',
    mayPublish: false,
    maySell: false,
    cases: inputs.length,
    exactRepeatItemsAfterCompaction: n9Repeated.reduce(
      (sum, item) => sum + item.duplicateCount, 0),
    casesWithExactRepeatsAfterCompaction: n9Repeated.filter(
      (item) => item.duplicateCount > 0),
    distinctMeaningFingerprintsAfterCompaction: meaningQuality.meaningTextUnique,
    repeatedMeaningPairsAfterCompaction: meaningQuality.repeatedMeaningPairs,
    semanticCompletionGranted: false,
    limitation: 'This presentation-only cleanup hides no known interpretations in canonical semantics, plan, or Official report; it does not add or authorize new chart meaning.',
  };
  const n9Path = resolve(outputPath.endsWith('.json')
    ? outputPath.slice(0, -5) + '.n9-repetition.json'
    : outputPath + '.n9-repetition.json');
  writeFileSync(n9Path, JSON.stringify(n9, null, 2) + '\n', 'utf8');
  if (n9.exactRepeatItemsAfterCompaction !== 0) {
    throw new Error('N9 General Natal Preview still repeats exact consumer insight text.');
  }
  process.stdout.write(`Natal N9: 0 exact duplicate consumer insights across ${n9.cases} cases, ${n9.repeatedMeaningPairsAfterCompaction} meaning-only repeated pairs (not disguised by duplication); ${n9Path}\n`);

  const roleTextByCaseId = new Map(inputs.map((input) => [
    input.caseId,
    input.response.reading?.sections.flatMap((section) => section.blocks.flatMap((block) =>
      block.type === 'paragraph' && block.text.startsWith(GENERAL_NATAL_ROLE_OBSERVATION_PREFIX)
        ? [block.text] : [])) ?? [],
  ]));
  const contextualizedPairs = meaningQuality.factOnlySeparatedCasePairs.filter((pair) => {
    const left = roleTextByCaseId.get(pair.left) ?? [];
    const right = roleTextByCaseId.get(pair.right) ?? [];
    return left.length === 1 && right.length === 1 && left[0] !== right[0];
  });
  const roleObservation = {
    version: 'saju-natal-n7-role-observation-evidence-v1',
    lifecycle: 'internal_quality_audit',
    mayPublish: false,
    maySell: false,
    cases: inputs.length,
    meaningIdenticalPairs: meaningQuality.factOnlySeparatedCasePairs.length,
    rolePositionDifferences: contextualizedPairs.length,
    remainIdenticalMeaningPairs: meaningQuality.repeatedMeaningPairs,
    differentiatedCases: contextualizedPairs,
    limitation: 'Role labels are calculated facts, NOT new semantic interpretation or approval of Research claims.',
  };
  const rolePath = resolve(
    outputPath.endsWith('.json')
      ? outputPath.slice(0, -5) + '.roles.json'
      : outputPath + '.roles.json',
  );
  writeFileSync(rolePath, JSON.stringify(roleObservation, null, 2) + '\n', 'utf8');
  process.stdout.write(
    `Natal N7: ${roleObservation.rolePositionDifferences}/${roleObservation.meaningIdenticalPairs} matching-meaning pairs have different true Ten-God placement observations; ${rolePath}\n`,
  );
  const oldCollisions = meaningReport.contrasts.filter((pair) =>
    pair.kind === 'different_facts_same_interpretation');
  const currentCollisions = report.contrasts.filter((pair) =>
    pair.kind === 'different_facts_same_interpretation');
  const consumer = {
    version: 'saju-natal-n5-consumer-prose-comparison-v1',
    lifecycle: 'internal_quality_audit',
    mayPublish: false,
    maySell: false,
    caseCount: inputs.length,
    reconstructedLegacyRepeatedPairs: oldCollisions.length,
    actualConsumerRepeatedPairs: currentCollisions.length,
    resolvedPriorCopyCollisions: oldCollisions.filter((old) =>
      !currentCollisions.some((current) =>
        current.left === old.left && current.right === old.right)).length,
    limitations: [
      'The legacy baseline is reconstructed by removing only the new factual context paragraph, not by re-running an older engine.',
      'Factual chart differences in prose do not establish deeply different interpretive conclusions or empirical validity.',
      'New contexts are permitted bounded Preview calculation facts, not independently authorized Production meanings.',
    ],
  };
  const consumerOutputPath = resolve(
    outputPath.endsWith('.json')
      ? outputPath.slice(0, -5) + '.consumer.json'
      : outputPath + '.consumer.json',
  );
  writeFileSync(consumerOutputPath, JSON.stringify(consumer, null, 2) + '\n', 'utf8');
  process.stdout.write(
    `Natal N5 consumer prose: ${consumer.resolvedPriorCopyCollisions}/${consumer.reconstructedLegacyRepeatedPairs} prior repeated-copy pairs now show chart-specific calculated facts; ${consumerOutputPath}\n`,
  );
  const n3 = buildNatalRuleDifferentiationReport(meaningReport, researchRuleEvidence);
  // N10: a repeated control input is a different test case, not a new chart.
  // Preserve both case-pair and deduplicated displayed-chart-pair evidence.
  const n10 = buildNatalCollisionTriageReport(meaningReport, n3);
  const n10Path = resolve(outputPath.endsWith('.json')
    ? outputPath.slice(0, -5) + '.n10-triage.json'
    : outputPath + '.n10-triage.json');
  writeFileSync(n10Path, JSON.stringify(n10, null, 2) + '\n', 'utf8');
  process.stdout.write(
    `Natal N10: ${n10.casePairCount} test-case pair collisions, ` +
    `${n10.uniqueDisplayedChartPairCount} distinct displayed-chart pair collisions; ${n10Path}\n`,
  );


  // N8: reproduce three actual meaning collisions through every existing
  // internal stage. This is quality evidence, not another consumer renderer.
  // N8 keeps exact historical A-pair identity even if truthful N9
  // compaction reveals NEW text collisions that N3 must report separately.
  const n8PairKeys = new Set([
    'solar-1984-01-07-00:30|solar-1984-01-07-12:30',
    'solar-1984-01-07-12:30|solar-1984-01-07-19:30',
    'solar-2010-02-03-05:30|solar-2010-02-03-19:30',
  ]);
  const n8Pairs = n3.pairsWithSameCopyDifferentFacts.filter((pair) =>
    pair.disposition === 'SAME_COPY_DIFFERENT_RULES' &&
    n8PairKeys.has([pair.left, pair.right].sort().join('|')));
  const n8CaseIds = [...new Set(n8Pairs.flatMap((pair) => [pair.left, pair.right]))].sort();
  const admission = resolvePreviewSemanticAdmissionV1(
    'GENERAL_NATAL_USEFUL_READING_CANDIDATE', 'general:natal',
  );
  // This exact Research family has no explicitly pinned Preview semantic
  // admission. Until it has one, never present observed Research differences
  // as source-approved Official meaning.
  if (admission !== undefined) {
    throw new Error('N8 trace requires readmission review after General Natal theme admission changes.');
  }
  const semanticCaseById = new Map(meaningReport.cases.map((item) => [item.caseId, item]));
  const n8Traces = [];
  const n25Traces = [];
  for (const caseId of n8CaseIds) {
    const run = interpretedByCaseId.get(caseId);
    if (run === undefined) throw new Error(`Missing canonical N8 run: ${caseId}`);
    const internal = await runProductReadingInternals(
      run.snapshot, run.interpretation, registry,
      { requestId: `n8-audit-${caseId}`, text: '사주', referenceDateTime: auditNow.toISOString() },
      {
        outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
        readingVersion: 'myeonghwa-general-natal-integrated-preview-host-v1',
        artifactGeneratedAt: auditNow,
      },
    );
    const exec = internal.execution;
    if (exec.state !== 'completed' || exec.modelCalls !== 0 ||
        exec.canonicalSemantics === undefined ||
        exec.officialReadingPlan === undefined ||
        exec.officialReadingReport === undefined ||
        internal.response.state !== 'delivered') {
      throw new Error(`Incomplete N8 Internal Official Reading stage: ${caseId}`);
    }
    // N25: bind the same real service execution to its Official artifact,
    // canonical Claim, plan, renderer atom, and Product compatibility prose.
    // The separately observed HTTP case remains N6's consumer meaning sample.
    if (internal.delivery.artifact === undefined) {
      throw new Error('N25 requires the actual internally assembled Official artifact: ' + caseId);
    }
    const n25 = traceNatalN25ConsumerMeaningAtoms({
      semantics: exec.canonicalSemantics,
      plan: exec.officialReadingPlan,
      report: exec.officialReadingReport,
      artifact: internal.delivery.artifact,
      response: internal.response,
    });
    n25Traces.push({
      caseId,
      snapshotId: n25.snapshotId,
      reportHash: n25.officialReadingReportHash,
      readingId: n25.readingId,
      uniqueConsumerAtoms: n25.exactUniqueMatches,
      repeatedOrSharedConsumerAtoms: n25.ambiguousMatches,
      unprovenConsumerAtoms: n25.unprovenMatches,
      atoms: n25.atoms,
    });
    const targetIds = new Set(exec.preparation.composition?.selection.targetClaimIds ?? []);
    const semantics = new Map(exec.canonicalSemantics.units.map((unit) => [unit.claimId, unit]));
    const planUnitRefs = new Set(exec.officialReadingPlan.sections.flatMap(
      (section) => [...section.primaryUnitRefs, ...section.supportingUnitRefs]));
    const researchThemes = run.interpretation.claims
      .filter((claim) => claim.state === 'active' &&
        /^GENERAL_NATAL_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u.test(claim.claimType))
      .map((claim) => {
        const unit = semantics.get(claim.claimId);
        return {
          claimType: claim.claimType,
          predicate: claim.predicate,
          methodology: `${claim.methodologyRef.id}@${claim.methodologyRef.version}`,
          ruleIds: claim.ruleRefs.map((ref) => ref.ruleId).sort(),
          sourceRefs: [...claim.sourceRefs].sort(),
          targetedByProfile: targetIds.has(claim.claimId),
          projectedToCanonicalUnit: unit !== undefined,
          canonicalRole: unit?.role ?? null,
          hasCanonicalText: unit?.canonicalText !== undefined,
          canonicalTextFingerprint: unit?.canonicalText === undefined
            ? null : deterministicContentHash(unit.canonicalText),
          includedInOfficialPlan: unit === undefined ? false : planUnitRefs.has(unit.unitId),
        };
      }).sort((a, b) => a.claimType.localeCompare(b.claimType));
    n8Traces.push({
      caseId,
      snapshotId: run.snapshot.snapshotId,
      rulePackLifecycle: registry.pack.status,
      coverageState: exec.preparation.composition?.selection.coverageState ?? null,
      semanticHash: exec.canonicalSemantics.semanticHash,
      planHash: exec.officialReadingPlan.planHash,
      rendererReportHash: exec.officialReadingReport.reportHash,
      consumerMeaningFingerprint: semanticCaseById.get(caseId)?.interpretationFingerprint ?? null,
      researchThemes,
    });
  }
  const n8ById = new Map(n8Traces.map((item) => [item.caseId, item]));
  const n8PairTraces = n8Pairs.map((pair) => {
    const left = n8ById.get(pair.left);
    const right = n8ById.get(pair.right);
    if (left === undefined || right === undefined) throw new Error('Incomplete N8 pair trace');
    const leftClaims = new Set(left.researchThemes.map((theme) => theme.claimType));
    const rightClaims = new Set(right.researchThemes.map((theme) => theme.claimType));
    const leftOnly = [...leftClaims].filter((c) => !rightClaims.has(c)).sort();
    const rightOnly = [...rightClaims].filter((c) => !leftClaims.has(c)).sort();
    const leftOnlyThemes = left.researchThemes.filter((theme) => leftOnly.includes(theme.claimType));
    const rightOnlyThemes = right.researchThemes.filter((theme) => rightOnly.includes(theme.claimType));
    const sameClaimOwnedCanonicalCopy = leftOnlyThemes.length === 1 &&
      rightOnlyThemes.length === 1 &&
      leftOnlyThemes[0].canonicalTextFingerprint !== null &&
      leftOnlyThemes[0].canonicalTextFingerprint === rightOnlyThemes[0].canonicalTextFingerprint;
    return {
      left: pair.left, right: pair.right,
      sameClaimOwnedCanonicalCopy,
      differentResearchThemeClaims: leftOnly.length > 0 || rightOnly.length > 0,
      leftOnlyResearchT8: leftOnly, rightOnlyResearchT8: rightOnly,
      sameConsumerMeaning: left.consumerMeaningFingerprint === right.consumerMeaningFingerprint,
      sourceToParagraphMappingProven: false,
      disposition: 'RESEARCH_MEANING_HOLD_PENDING_SOURCE_AND_PREVIEW_ADMISSION',
    };
  });
  if (n8PairTraces.length !== 3 ||
      n8PairTraces.some((pair) =>
        !pair.differentResearchThemeClaims || !pair.sameConsumerMeaning ||
        !pair.sameClaimOwnedCanonicalCopy)) {
    throw new Error('N8 three-case collision baseline changed; reassess source and admission.');
  }
  const n8 = {
    version: 'saju-natal-n8-claim-semantic-plan-render-audit-v1',
    lifecycle: 'internal_quality_audit',
    mayPublish: false, maySell: false,
    mayPromoteResearchMeaning: false,
    explicitThemePreviewAdmission: 'none',
    sourceToParagraphMappingProven: false,
    cases: n8Traces,
    pairs: n8PairTraces,
    limitations: [
      'Research T8 matched claims are not independently admitted Preview semantics.',
      'The three paired Research T8 claims reach profile, canonical unit and plan but share the same claim-owned canonical copy across distinct channels.',
      'Selected/plan-contained claims do not prove their channel difference has an approved interpretation.',
      'Renderer report hashes may contain identities; same visible consumer meaning is separately measured by N6.',
      'No claim-to-paragraph identity is asserted by this trace.',
      'No strengthening, fortune, prediction, or Production interpretation is inferred.',
    ],
  };
  const n8Path = resolve(outputPath.endsWith('.json')
    ? outputPath.slice(0, -5) + '.n8-trace.json'
    : outputPath + '.n8-trace.json');
  writeFileSync(n8Path, JSON.stringify(n8, null, 2) + '\n', 'utf8');
  process.stdout.write(`Natal N8: ${n8.pairs.length} distinct-Research-claim / identical-meaning pairs traced without semantic promotion; ${n8Path}\n`);

  // N25 is a narrower executable atomic trace of the actual five N8
  // interpretation executions. It makes no claim that a matched repeated
  // Research copy should have a different consumer meaning.
  if (n25Traces.length !== 5 || new Set(n25Traces.map((x) => x.caseId)).size !== 5) {
    throw new Error('N25 expected the five actual canonical N8 interpretations.');
  }
  const n25 = {
    version: 'saju-natal-n25-claim-to-real-consumer-atom-trace-v1',
    lifecycle: 'internal_quality_audit',
    mayPublish: false, maySell: false, mayApproveResearchMeaning: false,
    caseCount: n25Traces.length,
    atomCount: n25Traces.reduce((n, t) => n + t.atoms.length, 0),
    exactUniqueMatches: n25Traces.reduce((n, t) => n + t.uniqueConsumerAtoms, 0),
    ambiguousMatches: n25Traces.reduce((n, t) => n + t.repeatedOrSharedConsumerAtoms, 0),
    unprovenMatches: n25Traces.reduce((n, t) => n + t.unprovenConsumerAtoms, 0),
    cases: n25Traces,
    limitations: [
      'Same exact Product prose across different charts is not independently proven to be a semantic defect.',
      'Only three existing collision pairs / five canonical executions are traced at atom granularity in this initial slice.',
      'Real HTTP meaning-only differences remain independently measured by N6; internal reading identity cannot be assigned to a separate HTTP response.',
      'All Research semantics and further Preview admission remain HOLD.',
    ],
  };
  const n25Path = resolve(outputPath.endsWith('.json')
    ? outputPath.slice(0, -5) + '.n25-trace.json'
    : outputPath + '.n25-trace.json');
  writeFileSync(n25Path, JSON.stringify(n25, null, 2) + '\n', 'utf8');
  process.stdout.write('Natal N25: ' + n25.caseCount + ' real service executions, ' +
    n25.atomCount + ' consumer atoms, ' + n25.exactUniqueMatches +
    ' unique matches, ' + n25.ambiguousMatches + ' ambiguous, ' +
    n25.unprovenMatches + ' unproven; ' + n25Path + '\n');

  // N25b: complete the N10 19-unique-chart-pair map using real official
  // service executions; retain and reuse N8's existing five audited traces.
  const n25Known = new Map(n25Traces.map((trace) => [trace.caseId, trace]));
  const n8Known = new Map(n8Traces.map((trace) => [trace.caseId, trace]));
  const ruleSignatures = new Map(n3.ruleSignatures.map((x) =>
    [x.caseId, x.matchedRuleSignature]));
  const uniquePairCaseIds = [...new Set(n10.pairs.flatMap((p) =>
    [p.left, p.right]))].sort();
  const n25bCases = [];
  for (const caseId of uniquePairCaseIds) {
    const run = interpretedByCaseId.get(caseId);
    const matchedRuleSignature = ruleSignatures.get(caseId);
    if (!run || !matchedRuleSignature) {
      throw new Error('N25b missing actual canonical execution or matched rule evidence: ' + caseId);
    }
    let trace = n25Known.get(caseId);
    let themes = n8Known.get(caseId)?.researchThemes;
    if (!trace || !themes) {
      const internal = await runProductReadingInternals(
        run.snapshot, run.interpretation, registry,
        { requestId: 'n25b-audit-' + caseId, text: '사주',
          referenceDateTime: auditNow.toISOString() },
        {
          outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
          readingVersion: 'myeonghwa-general-natal-integrated-preview-host-v1',
          artifactGeneratedAt: auditNow,
        },
      );
      const exec = internal.execution;
      if (exec.state !== 'completed' || exec.modelCalls !== 0 ||
          !exec.canonicalSemantics || !exec.officialReadingPlan ||
          !exec.officialReadingReport || !internal.delivery.artifact ||
          internal.response.state !== 'delivered') {
        throw new Error('N25b incomplete real service execution: ' + caseId);
      }
      const audit = traceNatalN25ConsumerMeaningAtoms({
        semantics: exec.canonicalSemantics, plan: exec.officialReadingPlan,
        report: exec.officialReadingReport,
        artifact: internal.delivery.artifact, response: internal.response,
      });
      trace = {
        caseId, snapshotId: audit.snapshotId, reportHash: audit.officialReadingReportHash,
        readingId: audit.readingId, uniqueConsumerAtoms: audit.exactUniqueMatches,
        repeatedOrSharedConsumerAtoms: audit.ambiguousMatches,
        unprovenConsumerAtoms: audit.unprovenMatches, atoms: audit.atoms,
      };
      const canonical = new Map(exec.canonicalSemantics.units.map((u) =>
        [u.claimId, u]));
      themes = run.interpretation.claims.filter((claim) =>
        claim.state === 'active' &&
        /^GENERAL_NATAL_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u
          .test(claim.claimType)).map((claim) => ({
        claimType: claim.claimType,
        canonicalTextFingerprint: canonical.get(claim.claimId)?.canonicalText === undefined
          ? null : deterministicContentHash(canonical.get(claim.claimId).canonicalText),
      }));
    }
    n25bCases.push({
      caseId, matchedRuleSignature,
      sourceThemes: themes.map((t) => ({
        claimType: t.claimType,
        canonicalTextFingerprint: t.canonicalTextFingerprint,
      })),
      consumerAtomCount: trace.atoms.length,
      exactConsumerAtomCount: trace.uniqueConsumerAtoms,
      ambiguousConsumerAtomCount: trace.repeatedOrSharedConsumerAtoms,
      unprovenConsumerAtomCount: trace.unprovenConsumerAtoms,
    });
  }
  const n25b = buildNatalN25BAllPairForensics(n10, n25bCases);
  const n25bPath = resolve(outputPath.endsWith('.json')
    ? outputPath.slice(0, -5) + '.n25b-all-pairs.json'
    : outputPath + '.n25b-all-pairs.json');
  writeFileSync(n25bPath, JSON.stringify(n25b, null, 2) + '\n', 'utf8');
  process.stdout.write('Natal N25b: ' + n25b.rawCasePairCount +
    ' sample pairs / ' + n25b.uniqueChartPairCount +
    ' unique chart pairs / ' + n25b.executedDistinctCaseCount +
    ' actual internal executions; ' + n25bPath + '\n');

  // N26: independently reproduce the HTTP meaning body through the existing
  // Product service and compare after the HOST's exact N9 compaction, while
  // stripping only source-validated N5/N7 bounded *calculation facts*.
  const n26 = [];
  const httpByCaseId = new Map(inputs.map(input => [input.caseId, input.response]));
  for (const fixture of fixtures) {
    const realHttpProduct = httpByCaseId.get(fixture.caseId);
    if (!realHttpProduct) throw new Error('N26 missing real HTTP case ' + fixture.caseId);
    if (realHttpProduct.state !== 'delivered' &&
        realHttpProduct.state !== 'delivered_with_fallback') continue;
    const run = interpretedByCaseId.get(fixture.caseId);
    if (!run) throw new Error('N26 missing same-input canonical execution ' + fixture.caseId);
    const internal = await runProductReadingInternals(
      run.snapshot, run.interpretation, registry,
      { requestId:'n26-http-parity-' + fixture.caseId,
        text:'사주', referenceDateTime:auditNow.toISOString() },
      { outputSchemaVersion:SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
        readingVersion:'myeonghwa-general-natal-integrated-preview-host-v1',
        artifactGeneratedAt:auditNow },
    );
    if (internal.execution.state !== 'completed' || internal.execution.modelCalls !== 0 ||
        internal.response.state !== 'delivered') {
      throw new Error('N26 missing deterministic internal Product reading: ' + fixture.caseId);
    }
    n26.push(auditNatalN26HttpMeaningTransport({
      caseId:fixture.caseId,
      internalProduct:internal.response,
      realHttpProduct,
    }));
  }
  const n26Report = {
    version:'saju-natal-n26-internal-to-live-http-source-meaning-preservation-v1',
    lifecycle:'internal_quality_audit',
    mayPublish:false,maySell:false,mayApproveResearchMeaning:false,
    originalHttpCaseCount:inputs.length,
    eligibleDeliveredCaseCount:n26.length,
    exactPreservedCases:n26.filter(x=>x.exactAfterPermittedN9Compaction).length,
    mismatchCases:n26.filter(x=>!x.exactAfterPermittedN9Compaction).map(x=>x.caseId),
    exactRepeatedKeyPointsRemoved:n26.reduce((n,x)=>n+x.compactedLiteralDuplicateCount,0),
    cases:n26,
    limitations:[
      'The two independently executed requests have distinct reading identity.',
      'Only guarded N5/N7 factual observations are excluded from meaning parity; N9 is exact same-block compaction.',
      'A passing report proves preservation of the same source-owned copy, never individual interpretive usefulness.',
    ],
  };
  const n26Path = resolve(outputPath.endsWith('.json')
    ? outputPath.slice(0,-5)+'.n26-http-transport.json'
    : outputPath+'.n26-http-transport.json');
  writeFileSync(n26Path,JSON.stringify(n26Report,null,2)+'\n','utf8');
  process.stdout.write('Natal N26: '+n26Report.exactPreservedCases+'/'+
    n26Report.eligibleDeliveredCaseCount+' delivered meaning copies preserved after N9; '+
    n26Path+'\n');

  // N27a: reuse exactly the same actual 35 independently observed HTTP
  // responses, with opt-in evidence-only reading. No additional HTTP requests
  // or external human reviewer. Default consumer transport stays untouched.
  const selfServiceTitle = '명식별 십신 주제 연결 · 자동 실험 풀이';
  const selfService = inputs.map(input => {
    const run = interpretedByCaseId.get(input.caseId);
    if (!run) throw new Error('N27a missing bound canonical execution: ' + input.caseId);
    const generated = attachNatalN27SelfServiceEvidenceReading(
      input.response, run.snapshot, run.interpretation);
    const section = generated.reading?.sections.find(s => s.title === selfServiceTitle);
    const paragraphs = section?.blocks
      .filter(b => b.type === 'paragraph').map(b => b.text) ?? [];
    const delivered = input.response.state === 'delivered' ||
      input.response.state === 'delivered_with_fallback';
    if ((!delivered || !run.snapshot.completeness.birthTimeKnown) && section) {
      throw new Error('N27a revealed unverified case or unknown-hour content: ' + input.caseId);
    }
    if (delivered && run.snapshot.completeness.birthTimeKnown && paragraphs.length === 0) {
      throw new Error('N27a expected bounded Claim+TenGod preview text: ' + input.caseId);
    }
    return {
      caseId: input.caseId, responseState:input.response.state,
      birthTimeKnown:run.snapshot.completeness.birthTimeKnown,
      actualChartHash:run.snapshot.calculationHash,
      optedIn: true, originalHttpReadingId: input.response.reading?.readingId ?? null,
      unchangedReadingId: generated.reading?.readingId === input.response.reading?.readingId,
      selectedParagraphCount:paragraphs.length,
      selfServiceTextFingerprint: paragraphs.length
        ? deterministicContentHash(paragraphs) : null,
      selectedParagraphs:paragraphs,
      generatedBySoftwareNotHumanExpert: true,
      newPersonalOutcomeClaimAuthorized: false,
    };
  });
  const n27ById = new Map(selfService.map(x => [x.caseId,x]));
  const pairContrasts = n10.pairs.map(pair => {
    const left=n27ById.get(pair.left),right=n27ById.get(pair.right);
    if(!left || !right || !left.selfServiceTextFingerprint ||
      !right.selfServiceTextFingerprint) {
      throw new Error('N27a missing pair evidence ' + pair.left+'/'+pair.right);
    }
    return {
      left:pair.left,right:pair.right,
      differentDisplayedChart:left.actualChartHash !== right.actualChartHash,
      boundedTextDifferent:left.selfServiceTextFingerprint !== right.selfServiceTextFingerprint,
      independentPersonalMeaningProven:false,
    };
  });
  const n27 = {
    version:'saju-natal-n27a-opt-in-self-service-real-http-chart-theme-preview-v1',
    lifecycle:'internal_quality_audit',mayPublish:false,maySell:false,
    mayApproveNewOutcomeClaims:false,needsExternalExpertForBoundedPreview:false,
    actualHttpCaseCount:inputs.length,
    generatedKnownTimeCases:selfService.filter(x => x.selectedParagraphCount>0).length,
    missingTimeCasesWithGeneratedReading:selfService.filter(x =>
      !x.birthTimeKnown && x.selectedParagraphCount>0).length,
    rawRepeatPairCount:pairContrasts.length,
    differentChartPairsWithDifferentBoundedReading:pairContrasts.filter(x=>
      x.boundedTextDifferent).length,
    sameChartNoFalseVariation: selfService.every(x=>x.unchangedReadingId),
    cases:selfService,pairs:pairContrasts,
    limitations:[
      'Text difference includes exact resolved Ten-God position and existing traditional themes; never proves distinct fortunes.',
      'This is an opt-in Preview overlay, not an Official/new T8 Claim or a Production authorization.',
      'Contradicted classical source relations remain excluded instead of requiring an external reviewer for everything.',
    ],
  };
  const n27Path=resolve(outputPath.endsWith('.json')?
    outputPath.slice(0,-5)+'.n27a-autonomous-reading.json':
    outputPath+'.n27a-autonomous-reading.json');
  writeFileSync(n27Path,JSON.stringify(n27,null,2)+'\n','utf8');
  process.stdout.write('Natal N27a self-service: '+n27.generatedKnownTimeCases+
    '/35 actual HTTP cases; '+n27.differentChartPairsWithDifferentBoundedReading+
    '/'+n27.rawRepeatPairCount+' different-chart bounded reading contrasts; '+
    n27Path+'\\n');

  const repeatedPairs = oldCollisions;
  const n4 = {
    version: 'saju-natal-n4-applied-context-regression-v1',
    lifecycle: 'internal_quality_audit',
    mayPublish: false,
    maySell: false,
    caseCount: inputs.length,
    previousRepeatedPairs: repeatedPairs.length,
    contextualizedPairs: repeatedPairs.filter((pair) =>
      appliedByCaseId.get(pair.left)?.chartSpecificThemeFingerprint !==
      appliedByCaseId.get(pair.right)?.chartSpecificThemeFingerprint).length,
    cases: [...appliedByCaseId.entries()].map(([caseId, value]) => ({
      caseId,
      chartSpecificThemeFingerprint: value.chartSpecificThemeFingerprint,
      structuralHourPillar: value.structuralHourPillar ?? null,
      themes: value.statements.map((statement) => ({
        headline: statement.headline,
        channel: statement.channel,
        actualPositions: statement.positions.map((position) => position.display),
        claimSources: statement.sourceRuleIds,
      })),
    })),
  };
  const n4OutputPath = resolve(process.argv[4] ??
    (outputPath.endsWith('.json')
      ? outputPath.slice(0, -5) + '.context.json'
      : outputPath + '.context.json'));
  writeFileSync(n4OutputPath, JSON.stringify(n4, null, 2) + String.fromCharCode(10), 'utf8');
  process.stdout.write(`Natal N4: ${n4.contextualizedPairs}/${n4.previousRepeatedPairs} formerly identical copy pairs have different source-bound theme positions; ${n4OutputPath}\\n`);
  const n3OutputPath = resolve(process.argv[3] ??
    (outputPath.endsWith('.json')
      ? outputPath.slice(0, -5) + '.rules.json'
      : outputPath + '.rules.json'));
  writeFileSync(n3OutputPath, JSON.stringify(n3, null, 2) + '\n', 'utf8');
  process.stdout.write(
    `Natal N3 rule/content audit: ${n3.pairsWithSameCopyDifferentFacts.length} copy collisions ` +
      `across distinct charts, ${n3.warningCounts.sameCopyDifferentRules} with different matched rules, ` +
      `${n3.warningCounts.sameCopySameRulesDifferentChart} with identical matched rules; JSON: ${n3OutputPath}\n`,
  );
  process.stdout.write(
    `Natal N0 preview audit: ${report.numberOfCases} cases, ` +
      `${report.uniqueFactFingerprints} distinct displayed fact sets, ` +
      `${report.uniqueInterpretationFingerprints} distinct interpretation bodies, ` +
      `${report.contrasts.length} contrast warnings; JSON: ${outputPath}\n`,
  );
  process.stdout.write(`Delivery states: ${JSON.stringify(report.responseStates)}\n`);
  if (report.casesWithoutInterpretation.length > 0) {
    process.stdout.write(
      `No interpretation body: ${report.casesWithoutInterpretation.join(', ')}\n`,
    );
  }
  // Observed differences are evidence for N0 triage, not N4/N6 acceptance.
}

await main();
