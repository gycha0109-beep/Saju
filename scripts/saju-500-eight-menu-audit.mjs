import { createHash } from 'node:crypto';
import process from 'node:process';
import { writeFileSync } from 'node:fs';
import { calculateCanonicalSajuSnapshot } from '../dist/calculation/calculation-engine.js';
import { runInterpretation } from '../dist/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import { createGeneralNatalMultifactorRegistry } from '../dist/research/general-natal-multifactor-candidate.js';
import { createCareerMultifactorResearchRegistry } from '../dist/research/career-natal-multifactor-candidate.js';
import { createWealthNatalMultifactorRegistry } from '../dist/research/wealth-natal-multifactor-candidate.js';
import { createBusinessNatalMultifactorRegistry } from '../dist/research/business-natal-multifactor-candidate.js';
import { createRelationshipNatalMultifactorRegistry } from '../dist/research/relationship-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from '../dist/preview/general-natal-multifactor-report.js';
import { buildCareerMultifactorResearchReport } from '../dist/preview/career-natal-multifactor-report.js';
import { buildWealthNatalMultifactorReport } from '../dist/preview/wealth-natal-multifactor-report.js';
import { buildBusinessNatalMultifactorReport } from '../dist/preview/business-natal-multifactor-report.js';
import { buildRelationshipNatalMultifactorReport } from '../dist/preview/relationship-natal-multifactor-report.js';
import {
  buildThreeTemporalMenusBirthReading,
  describeTemporalNatalEvidence,
} from '../dist/preview/three-temporal-menus-birth-reading.js';
import {
  diagnoseMissingWealthReading,
  analyzeTemporalRepetition,
  summarizeMissingWealthCauses,
  ROOT_CAUSE_AUDIT_VERSION,
} from './saju-500-root-cause.mjs';
import { auditSixMenuQuestionCoverage } from './saju-500-six-menu-question-coverage.mjs';
import {
  createEvidenceFingerprint,
  summarizeEvidenceProfiles,
  summarizeEvidenceTextRepetition,
  summarizeResearchMURCoverage,
} from './saju-500-evidence-audit.mjs';

const REFERENCE = '2026-10-25T00:00:00.000Z';
const DEFAULT_COUNT = 500;
const EXPANDED_COUNTS = [3000, 10000];
const DOMAIN_NAMES = [
  '전체 사주',
  '직업·커리어',
  '재물',
  '연애·관계',
  '사업',
  '올해',
  '이번 달',
  '삶의 단계',
];
const NATAL = ['general', 'career', 'wealth', 'relationship', 'business'];
const now = new Date(REFERENCE);
let seed = 0x5a1a2026;
function rand() {
  seed ^= seed << 13;
  seed ^= seed >>> 17;
  seed ^= seed << 5;
  return (seed >>> 0) / 4294967296;
}
function number(min, max) {
  return min + Math.floor(rand() * (max - min + 1));
}
function pad(n) {
  return String(n).padStart(2, '0');
}
function sampleBirth(used) {
  for (;;) {
    const y = number(1950, 2005);
    const m = number(1, 12);
    const d = number(1, new Date(Date.UTC(y, m, 0)).getUTCDate());
    const hour = number(0, 23),
      minute = number(0, 59);
    const stamp = y + '-' + pad(m) + '-' + pad(d) + ' ' + pad(hour) + ':' + pad(minute);
    if (used.has(stamp)) continue;
    used.add(stamp);
    return {
      stamp,
      birth: {
        calendarType: 'solar',
        date: { year: y, month: m, day: d },
        time: { known: true, hour, minute },
        sexForTraditionalCalculation: rand() < 0.5 ? 'male' : 'female',
      },
    };
  }
}
function digest(v) {
  return createHash('sha256').update(String(v)).digest('hex');
}
function entry(text, meaning, state, sectionCount, kind, evidence = null, mur = null) {
  const str = text.trim();
  return {
    text: str,
    exactKey: digest(str),
    meaningKey: digest(JSON.stringify(meaning)),
    meaningComponents: meaning,
    ...(evidence === null
      ? {}
      : { evidenceKey: createEvidenceFingerprint(evidence), evidenceComponents: evidence }),
    ...(mur === null ? {} : { mur }),
    state,
    sectionCount,
    kind,
  };
}
function readingGuideEvidence(guide) {
  if (!guide) return null;
  return {
    sourceClaimType: guide.sourceClaimType ?? null,
    coreClaimType: guide.coreClaimType ?? null,
    sourceIds: [...(guide.sourceIds ?? [])].sort(),
    ruleIds: [...(guide.ruleIds ?? [])].sort(),
    supporting: (guide.supporting ?? []).map((support) => ({
      claimType: support.claimType,
      factPaths: [
        ...(support.distinctObservedFactPaths ?? support.distinctCalculatedFactPaths ?? []),
      ].sort(),
      positions: [
        ...(support.distinctObservedPositions ?? support.distinctCalculatedPositions ?? []),
      ],
    })),
  };
}
function natalEntry(report, graphLinks) {
  const sections = report.sections ?? [];
  const additionalVerifiedSections = report.additionalVerifiedSections ?? [];
  const prose = sections.map((s) => s.headline + '\n' + s.paragraph);
  if (report.wholeChart) prose.unshift(...report.wholeChart.paragraphs);
  if (report.intimacy) prose.push(report.intimacy.headline + '\n' + report.intimacy.paragraph);
  if (additionalVerifiedSections.length > 0) {
    prose.push(
      '추가로 확인된 직업 관련 구조\n' +
        '아래는 실제 명식과 출처가 확인된 연구용 관찰입니다. 위의 최소 유효 풀이 판정에 새로운 해석 축으로 더하지 않으며, 직업 적성이나 성패를 확정하지 않습니다.\n' +
        additionalVerifiedSections
          .map((section) => section.headline + '\n' + section.paragraph)
          .join('\n\n'),
    );
  }
  if (report.readingGuide?.paragraph) prose.push(report.readingGuide.paragraph);
  if (report.missing?.length) {
    prose.push(...report.missing.map((reason) => 'Support explanation:\n' + reason));
  }
  const meaning = sections.map((s) => [s.claimType, s.pattern, s.axis, s.channel]);
  if (report.wholeChart) meaning.push(['whole_chart', ...report.wholeChart.semanticKey]);
  if (report.intimacy) meaning.push(['day_branch_intimacy', report.intimacy.kind]);
  if (sections.length === 0 && report.missing?.length) {
    meaning.push(['insufficient_support', ...report.missing]);
  }
  const evidence = {
    state: report.state,
    ...(report.wholeChart ? { wholeChart: {
      semanticKey: report.wholeChart.semanticKey,
      rules: report.wholeChart.evidence.map(item => item.rule),
    } } : {}),
    ...(report.intimacy ? { intimacy: {
      kind: report.intimacy.kind, ruleId: report.intimacy.ruleId, methodologyId: report.intimacy.methodologyId,
      sourceIds: report.intimacy.sourceIds, factPaths: report.intimacy.factPaths,
    } } : {}),
    permissions: {
      researchOnly: report.researchOnly,
      usefulComplete: report.usefulComplete,
      mayPublish: report.mayPublish,
      maySell: report.maySell,
    },
    missingRequirements: [...(report.missing ?? [])],
    readingGuide: readingGuideEvidence(report.readingGuide),
    sections: sections.map((section) => ({
      claimType: section.claimType,
      pattern: section.pattern,
      axis: section.axis,
      channel: section.channel,
      ruleId: section.ruleId ?? null,
      methodologyId: graphLinks.methods.get(section.claimType)?.methodologyId ?? null,
      sourceIds: [...(section.sourceIds ?? [])].sort(),
      factPaths: [...(section.observedFactPaths ?? section.factPaths ?? [])].sort(),
      observedPositions: [...(section.observedPositions ?? [])],
      relatedPillar: section.relatedPillar ?? null,
    })),
    additionalVerifiedSections: additionalVerifiedSections.map((section) => ({
      claimType: section.claimType,
      pattern: section.pattern,
      axis: section.axis,
      channel: section.channel,
      ruleId: section.ruleId ?? null,
      methodologyId: graphLinks.methods.get(section.claimType)?.methodologyId ?? null,
      sourceIds: [...(section.sourceIds ?? [])].sort(),
      factPaths: [
        ...(section.calculatedFactPaths ?? section.observedFactPaths ?? section.factPaths ?? []),
      ].sort(),
      observedPositions: [...(section.calculatedPositions ?? section.observedPositions ?? [])],
    })),
  };
  const mur = {
    state: report.state,
    usefulComplete: report.usefulComplete === true,
    selectedSectionCount: sections.length,
    additionalVerifiedSectionCount: additionalVerifiedSections.length,
    coreClaimType:
      report.readingGuide?.sourceClaimType ?? report.readingGuide?.coreClaimType ?? null,
    supportingClaimCount: report.readingGuide?.supporting?.length ?? 0,
    supportingClaimTypes: (report.readingGuide?.supporting ?? []).map(
      (support) => support.claimType,
    ),
    missingRequirements: [...(report.missing ?? [])],
  };
  const row = entry(
    prose.join('\n\n'),
    meaning,
    report.state,
    sections.length,
    'sourced_natal_research',
    evidence,
    mur,
  );
  row.selectedClaims = [...graphLinks.methods.values()];
  return row;
}
function assertReportClaimGraph(snapshot, execution, report, domain) {
  const sections = [...(report.sections ?? []), ...(report.additionalVerifiedSections ?? [])];
  let activeT5UpstreamReferences = 0;
  const methods = new Map();
  for (const section of sections) {
    const claim = execution.claims.find(
      (candidate) =>
        candidate.claimType === section.claimType &&
        candidate.taxonomy.tier === 'T8' &&
        candidate.state === 'active' &&
        candidate.snapshotId === snapshot.snapshotId,
    );
    if (!claim) {
      throw new Error(
        domain + ': selected section has no active same-chart T8 Claim: ' + section.claimType,
      );
    }
    if (!claim.methodologyRef?.id || !claim.ruleRefs.some((ref) => ref.ruleId === section.ruleId)) {
      throw new Error(
        domain + ': T8 Claim is missing its methodology or selected rule: ' + section.claimType,
      );
    }
    if (!section.sourceIds.every((sourceId) => claim.sourceRefs.includes(sourceId))) {
      throw new Error(
        domain + ': T8 Claim is missing a section source reference: ' + section.claimType,
      );
    }
    if (JSON.stringify(claim.upstreamClaimRefs) !== JSON.stringify(section.upstreamClaimIds)) {
      throw new Error(
        domain + ': section upstream Claim links differ from the T8 Claim: ' + section.claimType,
      );
    }
    if (section.upstreamClaimIds.length < 2) {
      throw new Error(
        domain + ': T8 Claim has fewer than two upstream Claim links: ' + section.claimType,
      );
    }
    methods.set(section.claimType, {
      claimId: claim.claimId,
      claimType: claim.claimType,
      methodologyId: claim.methodologyRef.id,
      ruleRefs: claim.ruleRefs.map(({ ruleId, version }) => ({ ruleId, version })),
      sourceIds: claim.sourceRefs,
      upstreamClaimIds: claim.upstreamClaimRefs,
      factPaths: claim.factRefs,
    });
    for (const upstreamId of section.upstreamClaimIds) {
      const upstream = execution.claims.find((candidate) => candidate.claimId === upstreamId);
      if (
        !upstream ||
        upstream.taxonomy.tier !== 'T5' ||
        upstream.state !== 'active' ||
        upstream.snapshotId !== snapshot.snapshotId ||
        upstream.factRefs.length === 0 ||
        upstream.sourceRefs.length === 0
      ) {
        throw new Error(
          domain + ': upstream Claim is not active, same-chart, sourced T5 evidence: ' + upstreamId,
        );
      }
      activeT5UpstreamReferences += 1;
    }
  }
  return {
    selectedMURSections: report.sections.length,
    additionalVerifiedSections: report.additionalVerifiedSections?.length ?? 0,
    boundT8Claims: sections.length,
    activeT5UpstreamReferences,
    methods,
  };
}
function temporalEntries(result) {
  const report = result.annualMonthly.report;
  const annual = report.annual.sections;
  const monthly = report.monthly.sections;
  const focus = report.monthly.referenceReading;
  const life = result.lifeStage.report;
  const annualInteractions = report.annual.stemInteractions;
  const monthlyInteractions = report.monthly.stemInteractions;
  const annualBranchLayers = report.annual.branchLayers;
  const monthlyBranchLayers = report.monthly.branchLayers;
  const annualChart = report.annualChartReading;
  const monthlyChart = report.monthlyChartReading;
  const chartMeaning = (windows) => windows.map(window => [window.direction, window.monthlyShift ?? null,
    window.layers.map(layer => [layer.kind, layer.roleImpact,
      layer.contacts.map(contact => [contact.slot, contact.relation])])]);
  const interactionText = (items) => items.map((item) => item.title + '\n' + item.text);
  const interactionMeaning = (items) => items.map((item) => [item.period, item.pair, item.state]);
  const interactionEvidence = (items) => items.map((item) => ({
    period: item.period,
    pair: item.pair,
    state: item.state,
    natalSlots: item.natalSlots,
    visibleMediators: item.visibleMediators,
    methodologyId: item.methodologyId,
    ruleIds: item.ruleIds,
    sourceIds: item.sourceIds,
    factPaths: item.factPaths,
  }));
  const layerEvidence = (items) => items.map((item) => ({
    period: item.period, slot: item.slot, state: item.state,
    effectiveYear: item.effectiveYear, ruleId: item.ruleId,
    methodologyId: item.methodologyId, sourceIds: item.sourceIds, factPaths: item.factPaths,
  }));
  const annualNatalEvidence = describeTemporalNatalEvidence(report, 'annual');
  const monthNatalEvidence = [
    describeTemporalNatalEvidence(report, 'monthly_before_jeol'),
    describeTemporalNatalEvidence(report, 'monthly_after_jeol'),
  ];
  const a = entry(
    [...annual.map((s) => s.title + '\n' + s.text), annualNatalEvidence,
      ...interactionText(annualInteractions), ...interactionText(annualBranchLayers), ...annualChart.map(window => window.text)]
      .join('\n\n'),
    annual.map((s) => [s.researchProfileId, s.title]),
    report.annualReference.state,
    annual.length + annualInteractions.length + annualBranchLayers.length,
    'annual_research',
  );
  const current =
    focus.state === 'in_period' && focus.theme ? focus.theme.title + '\n' + focus.theme.text : '';
  const m = entry(
    [current, ...monthly.map((s) => s.title + '\n' + s.text), ...monthNatalEvidence,
      ...interactionText(monthlyInteractions), ...interactionText(monthlyBranchLayers), ...monthlyChart.map(window => window.text)]
      .filter(Boolean)
      .join('\n\n'),
    [focus.state, focus.theme?.title ?? '', ...monthly.map((s) => [s.segmentId, s.title])],
    focus.state,
    monthly.length + monthlyInteractions.length + monthlyBranchLayers.length + (current ? 1 : 0),
    'monthly_research',
  );
  // IMPORTANT: Dayun periods describe calendar/pillar facts, not supported
  // forecasts; report life-stage's structural uniqueness but DO NOT count it
  // as distinct life-stage interpretations.
  a.sourceEvidence = {
    annualStemTenGod: report.annual.annualStemTenGod,
    annualCalendarPolicy: report.annual.calendarPolicy,
    natalComparison: report.temporalNatalComparison.filter((item) => item.period === 'annual'),
    permissions: report.annual.permissions,
    stemInteractions: annualInteractions,
    branchLayers: annualBranchLayers,
    sections: annual.map((s) => ({
      kind: s.kind,
      sourceProfileId: s.researchProfileId,
      candidateClaimType: s.candidateClaimType,
      candidateRuleId: s.candidateRuleId,
      methodologyId: s.methodologyId,
      sourceIds: [s.policySourceId],
      calculatedFactPaths: [...s.calculationFactPaths],
      relatedPillar: s.relatedPillar ?? null,
    })),
  };
  m.sourceEvidence = {
    referenceState: focus.state,
    referenceSegment: focus.segmentId ?? null,
    referenceDateTime: focus.referenceDateTime,
    jeolBoundary: report.monthly.jeolBoundary,
    missing: report.monthly.missing,
    stemInteractions: monthlyInteractions,
    branchLayers: monthlyBranchLayers,
    permissions: {
      researchOnly: report.monthly.researchOnly,
      usefulComplete: report.monthly.usefulComplete,
      mayPublish: report.monthly.mayPublish,
      maySell: report.monthly.maySell,
    },
    natalComparison: report.temporalNatalComparison.filter((item) =>
      item.period.startsWith('monthly_'),
    ),
    sections: monthly.map((s) => ({
      kind: s.kind,
      segmentId: s.segmentId,
      tenGod: s.tenGod,
      claimId: s.claimId,
      semanticKey: s.semanticKey,
      methodologyId: s.methodologyId,
      interval: s.calculatedInterval,
      sourceIds: [...s.sourceIds],
      ruleIds: [...s.ruleIds],
      factPaths: [...s.factPaths],
      relatedPillar: s.relatedPillar ?? null,
    })),
  };
  // Keep generated Claim IDs in the case trace, excluding them from identity.
  const natalEvidence = (comparisons) => comparisons.map((comparison) => ({
    ...comparison,
    natalMatches: comparison.natalMatches.map((match) => {
      const fingerprint = { ...match };
      delete fingerprint.claimId;
      return fingerprint;
    }),
  }));
  const annualEvidence = {
    ...a.sourceEvidence,
    natalComparison: natalEvidence(a.sourceEvidence.natalComparison),
    stemInteractions: interactionEvidence(annualInteractions),
    branchLayers: layerEvidence(annualBranchLayers),
  };
  const monthlyEvidence = {
    ...m.sourceEvidence,
    natalComparison: natalEvidence(m.sourceEvidence.natalComparison),
    stemInteractions: interactionEvidence(monthlyInteractions),
    branchLayers: layerEvidence(monthlyBranchLayers),
    sections: m.sourceEvidence.sections.map((section) => {
      const fingerprint = { ...section };
      delete fingerprint.claimId;
      return fingerprint;
    }),
  };
  // The original meaning profile stays comparable with the baseline. The comparison signature
  // records the substantive relation (exact subtype, family only, or unavailable), independent
  // of the count of locations, printed dates, Claim IDs, and prose changes.
  const comparisonMeaning = (comparisons) => comparisons.map((comparison) => {
    const observations = comparison.natalMatches.flatMap((match) => match.matchedFamilyObservations);
    return [
      comparison.period, comparison.periodTenGod,
      observations.some((item) => item.tenGod === comparison.periodTenGod),
      observations.some((item) => item.tenGod !== comparison.periodTenGod),
    ];
  });
  const layerMeaning = (items) => items.map(item => [item.period, item.slot, item.state]);
  a.comparisonMeaning = [...comparisonMeaning(a.sourceEvidence.natalComparison), ...interactionMeaning(annualInteractions), ...layerMeaning(annualBranchLayers)];
  m.comparisonMeaning = [...comparisonMeaning(m.sourceEvidence.natalComparison), ...interactionMeaning(monthlyInteractions), ...layerMeaning(monthlyBranchLayers)];
  a.comparisonMeaning.push(...chartMeaning(annualChart));
  m.comparisonMeaning.push(...chartMeaning(monthlyChart));
  a.evidenceComponents = annualEvidence;
  a.evidenceKey = createEvidenceFingerprint(annualEvidence);
  m.evidenceComponents = monthlyEvidence;
  m.evidenceKey = createEvidenceFingerprint(monthlyEvidence);
  const lifeEvidence = {
    policyId: life.policyId,
    policyHash: life.policyHash,
    interpretationStatus: life.interpretationStatus,
    missing: life.missing,
    permissions: {
      researchOnly: life.researchOnly,
      usefulComplete: life.usefulComplete,
      mayPublish: life.mayPublish,
      maySell: life.maySell,
    },
    periods: life.periods.map((period) => ({
      kind: period.kind,
      pillar: period.pillar,
      cycleIndex: period.cycleIndex,
      ageMarker: period.ageMarker,
      startsAt: period.startsAt,
      endsAtExclusive: period.endsAtExclusive,
    })),
  };
  const l = entry(
    life.periods.map((p) => p.text).join('\n\n'),
    [life.interpretationStatus, ...life.periods.map((p) => p.kind)],
    life.interpretationStatus,
    life.periods.length,
    'calculated_dayun_only',
    lifeEvidence,
  );
  return [a, m, l];
}
function tally(rows, key) {
  const groups = new Map();
  for (const r of rows) {
    const k = r[key];
    const g = groups.get(k) ?? { count: 0, examples: [], profile: r.meaningComponents };
    g.count++;
    if (g.examples.length < 3) g.examples.push(r.birth);
    groups.set(k, g);
  }
  const repeats = [...groups.values()].filter((g) => g.count > 1).sort((a, b) => b.count - a.count);
  return {
    unique: groups.size,
    repeatedGroups: repeats.length,
    casesInRepeatedGroups: repeats.reduce((n, g) => n + g.count, 0),
    largestRepeatedGroup: repeats[0]?.count ?? 0,
    examples: repeats.slice(0, 3).map((g) => ({
      count: g.count,
      sampleBirths: g.examples,
      ...(key === 'meaningKey' ? { meaningComponents: g.profile } : {}),
    })),
  };
}
function summarize(rows) {
  const nonEmpty = rows.filter((r) => r.text.length > 0);
  const evidenceBound = nonEmpty.filter((r) => r.evidenceKey);
  return {
    generated: rows.length,
    withReadableText: nonEmpty.length,
    withoutReadableText: rows.length - nonEmpty.length,
    avgProseCharacters: nonEmpty.length
      ? Math.round(nonEmpty.reduce((n, r) => n + r.text.length, 0) / nonEmpty.length)
      : 0,
    exactText: tally(nonEmpty, 'exactKey'),
    meaningProfile: tally(nonEmpty, 'meaningKey'),
    evidenceProfile: summarizeEvidenceProfiles(evidenceBound),
    ...(rows.some((row) => row.comparisonMeaning)
      ? { temporalComparisonMeaning: tally(nonEmpty.map((row) => ({
          ...row,
          meaningComponents: [row.meaningComponents, row.comparisonMeaning],
          meaningKey: digest(JSON.stringify([row.meaningComponents, row.comparisonMeaning])),
        })), 'meaningKey') }
      : {}),
    evidenceTextRepetition: summarizeEvidenceTextRepetition(nonEmpty),
    researchMURCoverage: summarizeResearchMURCoverage(nonEmpty),
    reportStates: Object.fromEntries(
      [...new Set(rows.map((r) => r.state))]
        .sort()
        .map((state) => [state, rows.filter((r) => r.state === state).length]),
    ),
    researchKind: rows[0]?.kind ?? null,
    examples: rows.slice(0, 2).map((r) => ({ birth: r.birth, text: r.text.slice(0, 550) })),
  };
}
export function runFiveHundredSajuAudit(count = DEFAULT_COUNT, { includeCases = false } = {}) {
  if (count !== DEFAULT_COUNT && !EXPANDED_COUNTS.includes(count))
    throw new RangeError('Supported fixed-seed audit sample sizes are 500, 3000 or 10000.');
  seed = 0x5a1a2026;
  const registries = {
    general: createGeneralNatalMultifactorRegistry(),
    career: createCareerMultifactorResearchRegistry(),
    wealth: createWealthNatalMultifactorRegistry(),
    relationship: createRelationshipNatalMultifactorRegistry(),
    business: createBusinessNatalMultifactorRegistry(),
  };
  const renderers = {
    general: buildGeneralNatalMultifactorReport,
    career: buildCareerMultifactorResearchReport,
    wealth: buildWealthNatalMultifactorReport,
    relationship: buildRelationshipNatalMultifactorReport,
    business: buildBusinessNatalMultifactorReport,
  };
  const rows = Object.fromEntries(DOMAIN_NAMES.map((name) => [name, []]));
  const inputs = new Set();
  const chartHashGroups = new Map();
  const failures = [];
  const wealthMissingCases = [];
  const wealthChartDiagnostics = [];
  const claimGraphAudit = Object.fromEntries(
    NATAL.map((domain) => [
      domain,
      {
        reports: 0,
        selectedMURSections: 0,
        additionalVerifiedSections: 0,
        boundT8Claims: 0,
        activeT5UpstreamReferences: 0,
      },
    ]),
  );
  const startedAt = Date.now();
  for (let i = 0; i < count; i++) {
    const { stamp, birth } = sampleBirth(inputs);
    try {
      const snapshot = calculateCanonicalSajuSnapshot(
        birth,
        PRODUCTION_DEFAULT_CALCULATION_POLICY,
        { now },
      );
      const chartKey = snapshot.calculationHash;
      const existing = chartHashGroups.get(chartKey) ?? [];
      existing.push(stamp);
      chartHashGroups.set(chartKey, existing);
      for (const domain of NATAL) {
        const registry = registries[domain];
        const interpretation = runInterpretation(snapshot, registry, { now });
        const report = renderers[domain](snapshot, interpretation, registry);
        if (report.snapshotId !== snapshot.snapshotId || report.calculationHash !== chartKey) {
          throw new Error(domain + ' did not use the same exact natal snapshot');
        }
        if (!report.researchOnly || report.usefulComplete || report.mayPublish || report.maySell) {
          throw new Error(domain + ' changed the research authority boundary');
        }
        const graphLinks = assertReportClaimGraph(snapshot, interpretation, report, domain);
        const graphCount = claimGraphAudit[domain];
        graphCount.reports += 1;
        graphCount.selectedMURSections += graphLinks.selectedMURSections;
        graphCount.additionalVerifiedSections += graphLinks.additionalVerifiedSections;
        graphCount.boundT8Claims += graphLinks.boundT8Claims;
        graphCount.activeT5UpstreamReferences += graphLinks.activeT5UpstreamReferences;
        rows[
          {
            general: '전체 사주',
            career: '직업·커리어',
            wealth: '재물',
            relationship: '연애·관계',
            business: '사업',
          }[domain]
        ].push({ ...natalEntry(report, graphLinks), birth: stamp, calculationHash: chartKey });
        if (domain === 'wealth') {
          const activeT5 = interpretation.claims.filter(
            (claim) =>
              claim.state === 'active' &&
              claim.taxonomy.tier === 'T5' &&
              /^TEN_GOD_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES|HIDDEN_STEMS)_THEME$/u.test(
                claim.claimType,
              ),
          );
          wealthChartDiagnostics.push({
            birth: stamp,
            birthInput: birth,
            calculationHash: chartKey,
            reportState: report.state,
            reportMissing: [...report.missing],
            sections: report.sections.map((section) => ({
              claimType: section.claimType,
              pattern: section.pattern,
              axis: section.axis,
              channel: section.channel,
              observedFactPaths: [...section.observedFactPaths],
              observedPositions: [...section.observedPositions],
              upstreamClaimIds: [...section.upstreamClaimIds],
              sourceIds: [...section.sourceIds],
              ruleId: section.ruleId,
              headline: section.headline,
              paragraph: section.paragraph,
            })),
            activeT5ClaimTypes: activeT5.map((claim) => claim.claimType).sort(),
            activeT5Claims: activeT5.map((claim) => ({
              claimId: claim.claimId,
              claimType: claim.claimType,
              factRefs: [...claim.factRefs],
              sourceIds: [...claim.sourceRefs],
            })),
            activeWealthT8Claims: interpretation.claims
              .filter(
                (claim) =>
                  claim.state === 'active' &&
                  claim.taxonomy.tier === 'T8' &&
                  claim.taxonomy.category === 'wealth',
              )
              .map((claim) => ({
                claimId: claim.claimId,
                claimType: claim.claimType,
                upstreamClaimIds: [...claim.upstreamClaimRefs],
                sourceIds: [...claim.sourceRefs],
              })),
            activeWealthT8ClaimTypes: interpretation.claims
              .filter(
                (claim) =>
                  claim.state === 'active' &&
                  claim.taxonomy.tier === 'T8' &&
                  claim.taxonomy.category === 'wealth',
              )
              .map((claim) => claim.claimType)
              .sort(),
          });
          if (report.sections.length === 0) {
            wealthMissingCases.push(
              diagnoseMissingWealthReading(
                snapshot,
                interpretation,
                registry,
                report,
                stamp,
                birth,
              ),
            );
          }
        }
      }
      const temporal = buildThreeTemporalMenusBirthReading(birth, {
        requestId: 'fixed-seed-sample-audit-' + i,
        targetYear: 2026,
        targetMonth: 10,
        referenceDateTime: REFERENCE,
      });
      if (temporal.calculationHash !== chartKey) {
        throw new Error('Time menus did not preserve canonical calculation hash');
      }
      const three = temporalEntries(temporal);
      for (let t = 0; t < 3; t++)
        rows[DOMAIN_NAMES[5 + t]].push({ ...three[t], birth: stamp, calculationHash: chartKey });
    } catch (error) {
      failures.push({ birth: stamp, error: String(error?.stack ?? error).slice(0, 1200) });
    }
    if ((i + 1) % 100 === 0)
      process.stdout.write('SAJU_AUDIT_PROGRESS ' + (i + 1) + '/' + count + '\n');
  }
  const sameChart = [...chartHashGroups.values()].filter((x) => x.length > 1);
  const result = {
    spec:
      count +
      ' deterministic pseudorandom real solar birth dates, times and minutes; 8 menu engines; fixed 2026-10 year/month; no partner/family/question',
    seed: '0x5a1a2026',
    count,
    uniqueBirthDateTimes: inputs.size,
    attempted: count,
    failedCases: failures.length,
    failureExamples: failures.slice(0, 10),
    uniqueCalculationHashes: chartHashGroups.size,
    sameCalculationHashGroups: sameChart.slice(0, 10),
    elapsedMs: Date.now() - startedAt,
    menuResults: Object.fromEntries(DOMAIN_NAMES.map((name) => [name, summarize(rows[name])])),
    ...(includeCases
      ? {
          casesByMenu: Object.fromEntries(
            DOMAIN_NAMES.map((name) => [
              name,
              rows[name].map((row, index) => {
                const output = { caseNumber: index + 1, ...row };
                delete output.birth;
                delete output.calculationHash;
                return output;
              }),
            ]),
          ),
        }
      : {}),
    claimGraphAudit,
    sixMenuQuestionCoverage: auditSixMenuQuestionCoverage(rows),
    wealthChartDiagnostics,
    rootCauseDiagnostics: {
      version: ROOT_CAUSE_AUDIT_VERSION,
      wealth: summarizeMissingWealthCauses(wealthMissingCases),
      annualRepetition: analyzeTemporalRepetition(rows['올해']),
      monthlyRepetition: analyzeTemporalRepetition(rows['이번 달']),
    },
    interpretationCaveat:
      'Exact Korean text uniqueness is not semantic uniqueness. Meaning profile counts are a conservative proxy based on actual emitted claim patterns. Structural Dayun intervals are not independently authorized life-stage forecasts. These results are internal research only.',
    permissions: { mayPublish: false, maySell: false, mayCallOfficial: false },
  };
  const outfile = process.argv[2];
  if (outfile) writeFileSync(outfile, JSON.stringify(result, null, 2) + '\n', 'utf8');
  process.stdout.write(
    'SAJU500_ROOT_CAUSE_SUMMARY ' +
      JSON.stringify({
        wealthMissing: result.rootCauseDiagnostics.wealth.missingCaseCount,
        missingCauses: result.rootCauseDiagnostics.wealth.byCause,
        annualRepeated: result.rootCauseDiagnostics.annualRepetition.casesInRepeatedGroups,
        monthlyRepeated: result.rootCauseDiagnostics.monthlyRepetition.casesInRepeatedGroups,
      }) +
      '\n',
  );
  process.stdout.write(
    outfile
      ? 'SAJU500_RESULT_PATH ' + outfile + '\n'
      : 'SAJU500_RESULT_JSON ' + JSON.stringify(result) + '\n',
  );
  if (
    inputs.size !== count ||
    failures.length ||
    DOMAIN_NAMES.some((name) => rows[name].length !== count) ||
    NATAL.some(
      (domain) =>
        claimGraphAudit[domain].reports !== count ||
        claimGraphAudit[domain].boundT8Claims !==
          claimGraphAudit[domain].selectedMURSections +
            claimGraphAudit[domain].additionalVerifiedSections,
    ) ||
    !result.rootCauseDiagnostics.wealth.allCasesHaveExplicitCause ||
    result.rootCauseDiagnostics.wealth.missingCaseCount !==
      wealthChartDiagnostics.filter((chart) => chart.sections.length === 0).length ||
    wealthChartDiagnostics.some(
      (chart) => chart.sections.length === 0 && chart.reportMissing.length === 0,
    ) ||
    result.rootCauseDiagnostics.annualRepetition.casesInRepeatedGroups !==
      result.menuResults['올해'].exactText.casesInRepeatedGroups ||
    result.rootCauseDiagnostics.monthlyRepetition.casesInRepeatedGroups !==
      result.menuResults['이번 달'].exactText.casesInRepeatedGroups
  ) {
    process.exitCode = 1;
  }
  return result;
}
if (process.argv[1] && /saju-500-eight-menu-audit\.mjs$/u.test(process.argv[1])) {
  const countFlag = process.argv.indexOf('--count');
  const count = countFlag === -1 ? DEFAULT_COUNT : Number(process.argv[countFlag + 1]);
  runFiveHundredSajuAudit(count, { includeCases: process.argv.includes('--include-cases') });
}
