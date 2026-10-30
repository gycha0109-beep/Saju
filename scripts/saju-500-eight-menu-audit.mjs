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
import { buildThreeTemporalMenusBirthReading } from '../dist/preview/three-temporal-menus-birth-reading.js';
import { buildSourceNatalMeaningSignatures } from '../dist/preview/natal-source-meaning-signature.js';
import {
  diagnoseMissingWealthReading,
  analyzeTemporalRepetition,
  summarizeMissingWealthCauses,
  ROOT_CAUSE_AUDIT_VERSION,
} from './saju-500-root-cause.mjs';

const REFERENCE = '2026-10-25T00:00:00.000Z';
const COUNT = 500;
const DOMAIN_NAMES = ['전체 사주', '직업·커리어', '재물', '연애·관계', '사업', '올해', '이번 달', '삶의 단계'];
const NATAL = ['general', 'career', 'wealth', 'relationship', 'business'];
const now = new Date(REFERENCE);
let seed = 0x5a1a2026;
function rand() {
  seed ^= seed << 13;
  seed ^= seed >>> 17;
  seed ^= seed << 5;
  return (seed >>> 0) / 4294967296;
}
function number(min, max) { return min + Math.floor(rand() * (max - min + 1)); }
function pad(n) { return String(n).padStart(2, '0'); }
function sampleBirth(used) {
  for (;;) {
    const y = number(1950, 2005);
    const m = number(1, 12);
    const d = number(1, new Date(Date.UTC(y, m, 0)).getUTCDate());
    const hour = number(0, 23), minute = number(0, 59);
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
function digest(v) { return createHash('sha256').update(String(v)).digest('hex'); }
function entry(text, meaning, state, sectionCount, kind) {
  const str = text.trim();
  return {
    text: str,
    exactKey: digest(str),
    meaningKey: digest(JSON.stringify(meaning)),
    meaningComponents: meaning,
    state,
    sectionCount,
    kind,
  };
}
function natalEntry(report, domain) {
  const sections = report.sections ?? [];
  const prose = sections.map(s => s.headline + '\n' + s.paragraph);
  if (report.readingGuide?.paragraph) prose.push(report.readingGuide.paragraph);
  // Narrative and selected source-backed claim types are counted separately:
  // different stems/dates inside the text do not automatically prove different meaning.
  const row = entry(
    prose.join('\n\n'),
    sections.map(s => [s.claimType, s.pattern, s.axis, s.channel]),
    report.state,
    sections.length,
    'sourced_natal_research',
  );
  // Preserve legacy meaningKey for fixed-seed historical comparisons. Never
  // silently compare this new source-qualified schema to old baseline keys.
  const qualified = buildSourceNatalMeaningSignatures([{
    domain,
    sections: sections.map(section => ({
      claimType: section.claimType,
      pattern: section.pattern,
      axis: section.axis,
      channel: section.channel,
      ruleId: section.ruleId,
      ...(section.methodologyId === undefined ? {} : { methodologyId: section.methodologyId }),
      sourceIds: section.sourceIds,
      upstreamClaimIds: section.upstreamClaimIds,
      factPaths: section.calculatedFactPaths ?? section.observedFactPaths ?? [],
      paragraph: section.paragraph,
    })),
  }]);
  row.sourceMeaningComponents = qualified.claimMeaning;
  row.sourceMeaningSignature = digest(JSON.stringify(qualified.claimMeaning));
  row.sourceEvidenceRoles = qualified.evidenceRoles;
  row.sourceEvidenceRolesSignature = digest(JSON.stringify(qualified.evidenceRoles));
  row.sourceWordingSignature = digest(JSON.stringify(qualified.wording));
  // A second, evidence-bound signature is deliberately kept distinct from
  // the legacy coarse profile. Exact birth identity/hash is NOT a meaning.
  row.evidenceComponents = sections.map(s => ({
    claimType: s.claimType,
    pattern: s.pattern,
    axis: s.axis,
    channel: s.channel,
    ruleId: s.ruleId,
    methodologyId: s.methodologyId ?? null,
    sourceIds: [...(s.sourceIds ?? [])].sort(),
    factPaths: [...(s.observedFactPaths ?? [])].sort(),
    // Qualified chart observations are part of the explanation. They are not
    // counted as new methodology, rank, luck score, or guaranteed life event.
    observedPositions: [...(s.observedPositions ?? [])].sort(),
  }));
  row.evidenceSignature = digest(JSON.stringify(row.evidenceComponents));
  row.coverageExplanation = Array.isArray(report.missing)
    ? report.missing.filter(x => typeof x === 'string').join(' ')
    : '';
  if (report.insufficientEvidence !== undefined) {
    const t5 = report.insufficientEvidence;
    if (report.state !== 'insufficient' || report.sections.length !== 0 ||
        t5.sourceQualifiedT8ClaimCount !== 0 ||
        t5.recoverableByRegisteredT8Rules !== false ||
        t5.observedT5.some(item => item.sourceIds.length === 0 ||
          item.positions.length === 0 || item.factPaths.length !== item.positions.length)) {
      throw new Error('Insufficient Wealth evidence cannot be promoted to T8');
    }
    row.wealthInsufficientEvidence = {
      cause: t5.cause,
      koreanExplanation: t5.koreanExplanation,
      t8ClaimCount: t5.sourceQualifiedT8ClaimCount,
      recoverable: t5.recoverableByRegisteredT8Rules,
      t5: t5.observedT5.map(item => ({
        claimId: item.claimId,
        claimType: item.claimType,
        sourceIds: item.sourceIds,
        ruleId: item.ruleId,
        channel: item.channel,
        family: item.family,
        positions: item.positions,
        factPaths: item.factPaths,
      })),
    };
  }
  row.eligibleAlternatives = (report.eligibleAlternatives ?? []).map(alt => ({
    claimType: alt.claimType,
    axis: alt.axis,
    channel: alt.channel,
    ruleId: alt.ruleId,
    methodologyId: alt.methodologyId ?? null,
    sourceIds: [...alt.sourceIds],
    factPaths: [...alt.observedFactPaths],
  }));
  if (domain === 'wealth' && report.crossChannelComparison) {
    const compare = report.crossChannelComparison;
    if (!compare.researchOnly || compare.mayPublish || compare.maySell ||
        compare.interpretationAuthorityGranted ||
        compare.upstreamClaimIds.length !== 2 ||
        compare.sourceIds.length < 2 ||
        compare.observedFactPaths.length < 2 ||
        compare.observedFactPaths.length !== compare.observedPositions.length ||
        !compare.sourceUrl.startsWith('https://zh.wikisource.org/')) {
      throw new TypeError('The primary-text cross-channel research Claim cannot be promoted');
    }
    row.crossChannelResearch = {
      claimType: compare.claimType, sourceIds: compare.sourceIds,
      originalSourceUrl: compare.sourceUrl,
      observedFactPaths: compare.observedFactPaths,
      observedPositions: compare.observedPositions,
      headline: compare.headline, text: compare.paragraph,
      researchOnly: true, mayPublish: false, maySell: false,
    };
  }
  return row;
}
function temporalEntries(result) {
  const report = result.annualMonthly.report;
  const annual = report.annual.sections;
  const monthly = report.monthly.sections;
  const focus = report.monthly.referenceReading;
  const life = result.lifeStage.report;
  const t9Links = report.t9EvidenceLinks;
  if (t9Links.scope !== 'existing_monthly_t9_claim_evidence_link_only' ||
      t9Links.interpretationClaimEmissionAuthorized || t9Links.mayPublish ||
      t9Links.maySell || t9Links.sourceQualifiedCrossLayerMeaningEstablished ||
      t9Links.existingT9ClaimLinks.length !== report.conditionalComposition.slices.length ||
      t9Links.existingT9ClaimLinks.some(link =>
        link.newlyEmittedT9Claims !== 0 || link.compositionMeaningState !== 'not_admitted')) {
    throw new Error('Existing monthly T9 Claim evidence link violated research authority');
  }
  const a = entry(
    annual.map(s => s.title + '\n' + s.text).join('\n\n'),
    annual.map(s => [s.researchProfileId, s.title]),
    report.annualReference.state, annual.length, 'annual_research',
  );
  const current = focus.state === 'in_period' && focus.theme
    ? focus.theme.title + '\n' + focus.theme.text : '';
  const m = entry(
    [current, ...monthly.map(s => s.title + '\n' + s.text)].filter(Boolean).join('\n\n'),
    [focus.state, focus.theme?.title ?? '', ...monthly.map(s => [s.segmentId, s.title])],
    focus.state, monthly.length + (current ? 1 : 0), 'monthly_research',
  );
  // IMPORTANT: Dayun periods describe calendar/pillar facts, not supported
  // forecasts; report life-stage's structural uniqueness but DO NOT count it
  // as distinct life-stage interpretations.
  if (report.observedStructuralContext.scope !== 'calculated_relation_identity_only' ||
      report.observedStructuralContext.interpretationAuthorityGranted !== false ||
      report.observedStructuralContext.monthlyPhases.length !== 2 ||
      report.observedStructuralContext.monthlyPhases[0].segmentId !== 'before_jeol' ||
      report.observedStructuralContext.monthlyPhases[1].segmentId !== 'after_jeol') {
    throw new Error('Cross-period factual preview cannot be interpreted as an admitted semantic claim');
  }
  const composition = report.conditionalComposition;
  if (composition.scope !== 'research_structural_conditions_only' ||
      composition.interpretationAuthorityGranted || composition.mayPublish ||
      composition.maySell || composition.slices.length < 2) {
    throw new Error('Five hundred case research cannot promote conditional relation facts to T9 semantics');
  }
  const compositionEvidence = composition.slices.map(slice => ({
    segmentId: slice.segmentId,
    startsAt: slice.startsAt,
    endsAtExclusive: slice.endsAtExclusive,
    dayunStatus: slice.dayunStatus,
    dayunBranch: slice.dayunBranch,
    natalUnavailableSlots: slice.natalUnavailableSlots,
    relations: slice.relations.map(relation => ({
      kind: relation.kind,
      left: relation.left,
      right: relation.right,
      sourceIds: relation.sourceIds,
    })),
  }));
  a.compositionEvidence = compositionEvidence;
  m.compositionEvidence = compositionEvidence;
  const evidenceFocus = t9Links.referenceEvidenceFocus;
  const focusedLink = evidenceFocus.activeLink;
  const instant = Date.parse(evidenceFocus.referenceDateTime);
  if (evidenceFocus.referenceDateTime !== focus.referenceDateTime ||
      evidenceFocus.state !== focus.state ||
      evidenceFocus.segmentId !== (focus.segmentId ?? null) ||
      (focus.state === 'outside_target_month' && focusedLink !== null) ||
      (focus.state !== 'outside_target_month' &&
        (!focusedLink ||
         !(Date.parse(focusedLink.startsAt) <= instant &&
           instant < Date.parse(focusedLink.endsAtExclusive)) ||
         focusedLink.existingT9ClaimId !== (focus.theme?.claimId ?? null)))) {
    throw new Error('500-case T9 focus must be selected by the original Jeol and Dayun interval');
  }
  const sourceOwnedCurrent = result.annualMonthly.monthlyMenu.currentT9SourceContext;
  if ((focus.state === 'in_period') !== (sourceOwnedCurrent !== undefined) ||
      (sourceOwnedCurrent !== undefined && (
        sourceOwnedCurrent.snapshotId !== report.snapshotId ||
        sourceOwnedCurrent.calculationHash !== report.calculationHash ||
        sourceOwnedCurrent.referenceDateTime !== focus.referenceDateTime ||
        sourceOwnedCurrent.sourceTheme.claimId !== focus.theme?.claimId ||
        sourceOwnedCurrent.compositeOutcomeInferred ||
        sourceOwnedCurrent.newT9ClaimsEmitted !== 0 ||
        sourceOwnedCurrent.crossPeriodInheritance ||
        sourceOwnedCurrent.mayPublish || sourceOwnedCurrent.maySell ||
        sourceOwnedCurrent.sourceTensions.some(item =>
          !monthly.some(section => section.kind === 'tension' &&
            section.claimId === item.claimId && section.segmentId === sourceOwnedCurrent.segmentId)
        )))) {
    throw new Error('500-case original current T9 Claim co-reading violated exact period or authority');
  }
  if (sourceOwnedCurrent !== undefined) {
    m.currentT9SourceBundle = {
      originalThemeClaimId: sourceOwnedCurrent.sourceTheme.claimId,
      segmentId: sourceOwnedCurrent.segmentId,
      interval: [sourceOwnedCurrent.startsAt, sourceOwnedCurrent.endsAtExclusive],
      originalTensionClaimIds: sourceOwnedCurrent.sourceTensions.map(item => item.claimId),
      originalSourceIds: [...new Set([
        ...sourceOwnedCurrent.sourceTheme.sourceIds,
        ...sourceOwnedCurrent.sourceTensions.flatMap(item => item.sourceIds),
      ])].sort(),
      newT9Claims: 0, officialAuthority: false,
    };
  }
  const historical = result.annualMonthly.annualMenu.historicalAnnualDayunAlignment;
  if (!historical || historical.snapshotId !== report.snapshotId ||
      historical.calculationHash !== report.calculationHash ||
      historical.newlyEmittedT9Claims !== 0 ||
      historical.compositionalOutcomeAuthorized || historical.mayPublish ||
      historical.maySell ||
      (historical.status === 'literal_jiazi_example_matched' &&
        (historical.dayunPillar !== '갑자' || historical.annualEffectivePillar !== '갑자')) ||
      (historical.anyFullPillarMatch &&
        historical.dayunPillar !== historical.annualEffectivePillar)) {
    throw new TypeError('500-case classical Suiyun witness must remain literal and unpromoted');
  }
  m.classicalAnnualDayun = {
    status: historical.status,
    annualEffectivePillar: historical.annualEffectivePillar,
    dayunPillar: historical.dayunPillar,
    originalExampleExact: historical.exactlyOriginalJiaziExample,
    otherPillarGeneralization: historical.generalizedBeyondLiteralExample,
    sourceId: historical.sourceId,
    emittedT9Claims: 0,
  };
  m.currentT9Evidence = {
    state: evidenceFocus.state,
    referenceDateTime: evidenceFocus.referenceDateTime,
    segmentId: evidenceFocus.segmentId,
    activeT9ClaimId: focusedLink?.existingT9ClaimId ?? null,
    startsAt: focusedLink?.startsAt ?? null,
    endsAtExclusive: focusedLink?.endsAtExclusive ?? null,
    annualDayunRelation: focusedLink?.annualDayunRelation ?? null,
    isResearchOnly: true,
  };
  m.existingT9EvidenceLinks = t9Links.existingT9ClaimLinks.map(link => ({
    segmentId: link.segmentId,
    startsAt: link.startsAt,
    endsAtExclusive: link.endsAtExclusive,
    existingT9ClaimId: link.existingT9ClaimId,
    existingT9MethodologyId: link.existingT9MethodologyId,
    existingT9Link: link.existingT9Link,
    annualDayunRelation: link.annualDayunRelation,
    observationStatus: link.observationStatus,
    natalDayStemAvailable: link.natalDayStemAvailable,
    natalAnnualRelationCount: link.natalAnnualRelationCount,
    sources: link.annualDayunStructuralSources,
    newT9Claims: link.newlyEmittedT9Claims,
  }));
  a.compositionAuthority = {
    interpretationAuthorityGranted:composition.interpretationAuthorityGranted,
    mayPublish:composition.mayPublish,
    maySell:composition.maySell,
    mayGrantOfficialAuthority:composition.mayGrantOfficialAuthority,
  };
  m.compositionAuthority = a.compositionAuthority;
  a.calculatedStructure = {
    natalDayStem: report.observedStructuralContext.natalDayStem,
    annualPillarLabel: report.observedStructuralContext.annualPillarLabel,
    annualStemTenGod: report.observedStructuralContext.annualStemTenGod,
    sourceFactPaths: report.observedStructuralContext.sourceFactPaths,
    interpretationAuthorityGranted: report.observedStructuralContext.interpretationAuthorityGranted,
  };
  m.calculatedStructure = {
    natalDayStem: report.observedStructuralContext.natalDayStem,
    monthlyPhases: report.observedStructuralContext.monthlyPhases,
    sourceFactPaths: report.observedStructuralContext.sourceFactPaths,
    interpretationAuthorityGranted: report.observedStructuralContext.interpretationAuthorityGranted,
  };
  a.sourceEvidence = {
    annualStemTenGod: report.annual.annualStemTenGod,
    annualCalendarPolicy: report.annual.calendarPolicy,
    sections: annual.map(s => ({
      kind: s.kind,
      sourceProfileId: s.researchProfileId,
      candidateClaimType: s.candidateClaimType,
      calculatedFactPaths: [...s.calculationFactPaths],
      relatedPillar: s.relatedPillar ?? null,
      observedClash: s.observedClash ?? null,
    })),
  };
  m.sourceEvidence = {
    referenceState: focus.state,
    referenceSegment: focus.segmentId ?? null,
    sections: monthly.map(s => ({
      kind: s.kind,
      segmentId: s.segmentId,
      tenGod: s.tenGod,
      claimId: s.claimId,
      sourceIds: [...s.sourceIds],
      ruleIds: [...s.ruleIds],
      factPaths: [...s.factPaths],
      relatedPillar: s.relatedPillar ?? null,
      observedClash: s.observedClash ?? null,
    })),
  };
  // These signatures track bound, selected evidence rather than rendered
  // Korean strings. Monthly claimId is intentionally excluded: it is a
  // run identity, not an additional source-backed interpretation.
  a.evidenceComponents = a.sourceEvidence;
  a.evidenceSignature = digest(JSON.stringify(a.evidenceComponents));
  m.evidenceComponents = {
    referenceState: m.sourceEvidence.referenceState,
    referenceSegment: m.sourceEvidence.referenceSegment,
    sections: m.sourceEvidence.sections.map(section => ({
      kind: section.kind,
      segmentId: section.segmentId,
      tenGod: section.tenGod,
      sourceIds: section.sourceIds,
      ruleIds: section.ruleIds,
      factPaths: section.factPaths,
      relatedPillar: section.relatedPillar,
      observedClash: section.observedClash,
    })),
  };
  m.evidenceSignature = digest(JSON.stringify(m.evidenceComponents));
  const l = entry(
    life.periods.map(p => p.text).join('\n\n'),
    [life.interpretationStatus, ...life.periods.map(p => p.kind)],
    life.interpretationStatus, life.periods.length, 'calculated_dayun_only',
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
  const repeats = [...groups.values()].filter(g => g.count > 1)
    .sort((a,b) => b.count - a.count);
  return {
    unique: groups.size,
    repeatedGroups: repeats.length,
    casesInRepeatedGroups: repeats.reduce((n,g) => n+g.count, 0),
    largestRepeatedGroup: repeats[0]?.count ?? 0,
    examples: repeats.slice(0, 3).map(g => ({
      count: g.count, sampleBirths: g.examples,
      ...(key === 'meaningKey' ? { meaningComponents: g.profile } : {}),
    })),
  };
}
function summarize(rows) {
  const nonEmpty = rows.filter(r => r.text.length > 0);
  return {
    generated: rows.length,
    withReadableText: nonEmpty.length,
    withoutReadableText: rows.length - nonEmpty.length,
    ...(rows.some(row => row.classicalAnnualDayun) ? {
      classicalAnnualDayunCoverage: rows.filter(row => row.classicalAnnualDayun).length,
      literalJiaziCases: rows.filter(row =>
        row.classicalAnnualDayun?.status === 'literal_jiazi_example_matched').length,
      extendedMatchingPillarCases: rows.filter(row =>
        row.classicalAnnualDayun?.status === 'different_matching_pillar_extrapolation').length,
      unavailableHistoricalComparisonCases: rows.filter(row =>
        ['dayun_not_calculated','ipchun_effective_year_mismatch',
          'outside_selected_month'].includes(row.classicalAnnualDayun?.status)).length,
      extraClassicalTemporalClaims: rows.reduce((n,row) =>
        n + (row.classicalAnnualDayun?.emittedT9Claims ?? 0),0),
    } : {}),
    ...(rows.some(row => row.currentT9SourceBundle) ? {
      activeSourceT9Cases: rows.filter(row => row.currentT9SourceBundle).length,
      casesWithCurrentT9Clash: rows.filter(row =>
        (row.currentT9SourceBundle?.originalTensionClaimIds.length ?? 0) > 0).length,
      originalCurrentT9ClashClaims: rows.reduce((n,row) =>
        n + (row.currentT9SourceBundle?.originalTensionClaimIds.length ?? 0),0),
      extraCurrentT9ClaimsEmitted: rows.reduce((n,row) =>
        n + (row.currentT9SourceBundle?.newT9Claims ?? 0),0),
    } : {}),
    ...(rows.some(row => row.existingT9EvidenceLinks) ? {
      existingT9LinkCoverage: rows.filter(row => row.existingT9EvidenceLinks).length,
      existingT9LinkTotal: rows.reduce((n,row) => n+(row.existingT9EvidenceLinks?.length??0),0),
      existingT9LinkedClaims: rows.reduce((n,row) => n+
        (row.existingT9EvidenceLinks?.filter(item=>item.existingT9Link===
          'matched_source_owned_theme').length??0),0),
      annualDayunObservedMatches: rows.reduce((n,row) => n+
        (row.existingT9EvidenceLinks?.filter(item=>[
          'branch_clash_observed','branch_six_combination_observed',
        ].includes(item.annualDayunRelation)).length??0),0),
    } : {}),
    ...(rows.some(row => row.compositionEvidence) ? {
      compositionCoverage: rows.filter(row => row.compositionEvidence).length,
      compositionPatterns: tally(rows.filter(row => row.compositionEvidence)
        .map(row => ({ ...row, compositionSignature: digest(JSON.stringify(row.compositionEvidence)) })),
        'compositionSignature'),
    } : {}),
    ...(rows.some(row => row.calculatedStructure) ? {
      calculatedStructureCoverage: rows.filter(row => row.calculatedStructure).length,
      calculatedStructureProfiles: tally(rows.filter(row => row.calculatedStructure)
        .map(row => ({...row, calculatedStructureSignature: digest(JSON.stringify(row.calculatedStructure))})),
      'calculatedStructureSignature'),
    } : {}),
    // A missing interpretation section is not automatically an empty
    // user-facing response: insufficiency can be explained explicitly.
    withoutSectionsOrExplanation: rows.filter(row =>
      row.text.length === 0 && !(row.coverageExplanation?.trim())).length,
    avgProseCharacters: nonEmpty.length ? Math.round(nonEmpty.reduce((n,r)=>n+r.text.length,0)/nonEmpty.length) : 0,
    exactText: tally(nonEmpty, 'exactKey'),
    meaningProfile: tally(nonEmpty, 'meaningKey'),
    ...(nonEmpty.every(row => row.sourceMeaningSignature) ? {
      sourceQualifiedMeaningProfile: tally(nonEmpty, 'sourceMeaningSignature'),
      sourceEvidenceRolesProfile: tally(nonEmpty, 'sourceEvidenceRolesSignature'),
    } : {}),
    ...(nonEmpty.every(row => row.evidenceSignature) ? {
      selectedEvidenceProfile: tally(nonEmpty, 'evidenceSignature'),
    } : {}),
    ...(rows.some(row => row.crossChannelResearch) ? {
      boundedSourceCrossChannelCases: rows.filter(row => row.crossChannelResearch).length,
      boundedSourceCrossChannelClaimTypes: [...new Set(rows
        .flatMap(row => row.crossChannelResearch ? [row.crossChannelResearch.claimType] : []))],
    } : {}),
    reportStates: Object.fromEntries([...new Set(rows.map(r => r.state))].sort()
      .map(state=>[state,rows.filter(r=>r.state===state).length])),
    researchKind: rows[0]?.kind ?? null,
    examples: rows.slice(0, 2).map(r => ({birth: r.birth, text: r.text.slice(0, 550)})),
  };
}
export function runFiveHundredSajuAudit() {
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
  const rows = Object.fromEntries(DOMAIN_NAMES.map(name=>[name,[]]));
  const inputs = new Set();
  const chartHashGroups = new Map();
  const failures = [];
  const wealthMissingCases = [];
  const startedAt = Date.now();
  for (let i=0; i<COUNT; i++) {
    const {stamp, birth} = sampleBirth(inputs);
    try {
      const snapshot = calculateCanonicalSajuSnapshot(birth, PRODUCTION_DEFAULT_CALCULATION_POLICY, {now});
      const chartKey = snapshot.calculationHash;
      const existing = chartHashGroups.get(chartKey) ?? [];
      existing.push(stamp);
      chartHashGroups.set(chartKey,existing);
      for (const domain of NATAL) {
        const registry = registries[domain];
        const interpretation = runInterpretation(snapshot,registry,{now});
        const report = renderers[domain](snapshot, interpretation, registry);
        if (report.snapshotId !== snapshot.snapshotId || report.calculationHash !== chartKey) {
          throw new Error(domain + ' did not use the same exact natal snapshot');
        }
        rows[({
          general:'전체 사주', career:'직업·커리어', wealth:'재물',
          relationship:'연애·관계', business:'사업',
        })[domain]].push({...natalEntry(report, domain),birth:stamp,calculationHash:chartKey});
        if (domain === 'wealth' && report.sections.length === 0) {
          wealthMissingCases.push(
            diagnoseMissingWealthReading(snapshot, interpretation, registry, report, stamp),
          );
        }
      }
      const temporal = buildThreeTemporalMenusBirthReading(birth,{
        requestId:'500-sample-audit-' + i,
        targetYear:2026,
        targetMonth:10,
        referenceDateTime:REFERENCE,
      });
      if (temporal.calculationHash !== chartKey) {
        throw new Error('Time menus did not preserve canonical calculation hash');
      }
      const three = temporalEntries(temporal);
      for (let t=0;t<3;t++) rows[DOMAIN_NAMES[5+t]].push({...three[t],birth:stamp,calculationHash:chartKey});
    } catch(error) {
      failures.push({birth:stamp,error:String(error?.stack ?? error).slice(0,1200)});
    }
    if ((i+1)%100===0) process.stdout.write('SAJU500_PROGRESS ' + (i+1) + '/500\n');
  }
  const sameChart = [...chartHashGroups.values()].filter(x=>x.length>1);
  const result = {
    spec:'500 deterministic pseudorandom real solar birth dates, times and minutes; 8 menu engines; fixed 2026-10 year/month; no partner/family/question',
    seed:'0x5a1a2026',
    count:COUNT,
    uniqueBirthDateTimes:inputs.size,
    attempted:COUNT,
    failedCases:failures.length,
    failureExamples:failures.slice(0,10),
    uniqueCalculationHashes:chartHashGroups.size,
    sameCalculationHashGroups:sameChart.slice(0,10),
    elapsedMs:Date.now()-startedAt,
    menuResults:Object.fromEntries(DOMAIN_NAMES.map(name=>[name,summarize(rows[name])])),
    // Opt-in exact case evidence for cross-commit comparisons. Names, dates, and
    // calculation hashes remain outside the meaning signature: they are identities,
    // not proof that a governed interpretation changed.
    ...(process.env.SAJU_500_CASE_RESULTS === '1' ? {
      caseResults: Object.fromEntries(DOMAIN_NAMES.map(name => [name,
        rows[name].map(row => ({
          birth: row.birth,
          calculationHash: row.calculationHash,
          state: row.state,
          sectionCount: row.sectionCount,
          exactTextHash: row.exactKey,
          meaningSignature: row.meaningKey,
          consumedMeaning: row.meaningComponents,
          sourceQualifiedMeaningSignature: row.sourceMeaningSignature ?? null,
          sourceQualifiedMeaning: row.sourceMeaningComponents ?? null,
          sourceEvidenceRolesSignature: row.sourceEvidenceRolesSignature ?? null,
          sourceEvidenceRoles: row.sourceEvidenceRoles ?? null,
          sourceWordingSignature: row.sourceWordingSignature ?? null,
          selectedEvidenceSignature: row.evidenceSignature ?? null,
          selectedEvidence: row.evidenceComponents ?? null,
          calculatedStructure: row.calculatedStructure ?? null,
          compositionEvidence: row.compositionEvidence ?? null,
          compositionAuthority: row.compositionAuthority ?? null,
          existingT9EvidenceLinks: row.existingT9EvidenceLinks ?? null,
          currentT9Evidence: row.currentT9Evidence ?? null,
          text: row.text,
          coverageExplanation: row.coverageExplanation ?? null,
          eligibleAlternatives: row.eligibleAlternatives ?? null,
          sourceBoundCrossChannelResearch: row.crossChannelResearch ?? null,
          wealthInsufficientEvidence: row.wealthInsufficientEvidence ?? null,
          ...(row.sourceEvidence ? { sourceEvidence: row.sourceEvidence } : {}),
        })),
      ])),
    } : {}),
    rootCauseDiagnostics: {
      version: ROOT_CAUSE_AUDIT_VERSION,
      wealth: summarizeMissingWealthCauses(wealthMissingCases),
      annualRepetition: analyzeTemporalRepetition(rows['올해']),
      monthlyRepetition: analyzeTemporalRepetition(rows['이번 달']),
    },
    interpretationCaveat:'Exact Korean text uniqueness is not semantic uniqueness. Meaning profile counts are a conservative proxy based on actual emitted claim patterns. Structural Dayun intervals are not independently authorized life-stage forecasts. These results are internal research only.',
    permissions:{mayPublish:false,maySell:false,mayCallOfficial:false},
  };
  const outfile=process.argv[2];
  if(outfile) writeFileSync(outfile,JSON.stringify(result,null,2)+'\n','utf8');
  process.stdout.write('SAJU500_ROOT_CAUSE_SUMMARY '+JSON.stringify({
    wealthMissing: result.rootCauseDiagnostics.wealth.missingCaseCount,
    missingCauses: result.rootCauseDiagnostics.wealth.byCause,
    annualRepeated: result.rootCauseDiagnostics.annualRepetition.casesInRepeatedGroups,
    monthlyRepeated: result.rootCauseDiagnostics.monthlyRepetition.casesInRepeatedGroups,
  })+'\n');
  process.stdout.write('SAJU500_RESULT_JSON '+JSON.stringify(result)+'\n');
  if(inputs.size!==COUNT || failures.length || DOMAIN_NAMES.some(name=>rows[name].length!==COUNT) ||
      !result.rootCauseDiagnostics.wealth.allCasesHaveExplicitCause ||
      result.rootCauseDiagnostics.wealth.missingCaseCount !==
        result.menuResults['재물'].withoutReadableText ||
      result.rootCauseDiagnostics.annualRepetition.casesInRepeatedGroups !==
        result.menuResults['올해'].exactText.casesInRepeatedGroups ||
      result.rootCauseDiagnostics.monthlyRepetition.casesInRepeatedGroups !==
        result.menuResults['이번 달'].exactText.casesInRepeatedGroups) {
    process.exitCode=1;
  }
  return result;
}
if (process.argv[1] && /saju-500-eight-menu-audit\.mjs$/u.test(process.argv[1])) runFiveHundredSajuAudit();
