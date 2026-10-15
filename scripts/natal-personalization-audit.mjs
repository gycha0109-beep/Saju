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
import { runProductReadingInternals } from '../dist/reading/product-reading-service.js';
import { deterministicContentHash } from '../dist/interpretation/rule-registry.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../dist/llm/prompt-compiler.js';
import { resolvePreviewSemanticAdmissionV1 } from '../dist/preview/preview-semantic-admission.js';

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

  const { consumer: report, meaning: meaningReport, quality: meaningQuality } =
    buildNatalMeaningQualityAudit(inputs);
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

  // N8: reproduce three actual meaning collisions through every existing
  // internal stage. This is quality evidence, not another consumer renderer.
  const n8Pairs = n3.pairsWithSameCopyDifferentFacts.filter((pair) =>
    pair.disposition === 'SAME_COPY_DIFFERENT_RULES');
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
