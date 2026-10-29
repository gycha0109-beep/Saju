import type { BirthInput, CanonicalSajuSnapshot } from '../contracts/calculation.js';
import { buildSourceNatalMeaningSignatures } from './natal-source-meaning-signature.js';
import { calculateCanonicalSajuSnapshot } from '../calculation/calculation-engine.js';
import { runInterpretation } from '../interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../production/production-calculation-policy.js';
import { createGeneralNatalMultifactorRegistry } from '../research/general-natal-multifactor-candidate.js';
import { createCareerMultifactorResearchRegistry } from '../research/career-natal-multifactor-candidate.js';
import { createWealthNatalMultifactorRegistry } from '../research/wealth-natal-multifactor-candidate.js';
import { createBusinessNatalMultifactorRegistry } from '../research/business-natal-multifactor-candidate.js';
import { createRelationshipNatalMultifactorRegistry } from '../research/relationship-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from './general-natal-multifactor-report.js';
import { buildCareerMultifactorResearchReport } from './career-natal-multifactor-report.js';
import { buildWealthNatalMultifactorReport } from './wealth-natal-multifactor-report.js';
import { buildBusinessNatalMultifactorReport } from './business-natal-multifactor-report.js';
import { buildRelationshipNatalMultifactorReport } from './relationship-natal-multifactor-report.js';
import {
  renderNatalFiveDomainMultifactorResearchHtml,
  type NatalFiveDomainMultifactorReports,
} from './natal-five-domain-multifactor-reader.js';

/**
 * Executable S6 research-only quality cohort. These are REAL birth inputs,
 * not synthetic claims or independently authored consumer meanings.
 * Intentionally keeps methodology/product admission out of the quality runner.
 */
export const NATAL_S6_REGRESSION_VERSION = 'natal-s6-quality-cohort-v1' as const;
const NOW = new Date('2026-10-19T00:00:00.000Z');
const YEARS = [1984, 1999, 2010, 2024] as const;
const MONTHS = [1, 2, 3, 4, 7, 8, 9, 10] as const;
const DOMAIN_KEYS = ['general', 'career', 'wealth', 'business', 'relationship'] as const;

export interface NatalS6BirthCase {
  caseId: string;
  scenario: 'regular_solar' | 'solar_term_window' | 'lunar_regular' | 'lunar_leap' | 'unknown_time';
  birth: BirthInput;
}
function regularId(year: number, month: number): string {
  return 'solar-' + year + '-' + String(month).padStart(2, '0');
}
const REGULAR: NatalS6BirthCase[] = YEARS.flatMap(year => MONTHS.map(month => ({
  caseId: regularId(year, month),
  scenario: 'regular_solar' as const,
  birth: {
    calendarType: 'solar' as const,
    date: { year, month, day: 12 },
    time: { known: true as const, hour: 12, minute: 0 },
    sexForTraditionalCalculation: 'unspecified' as const,
  },
})));
export const NATAL_S6_BIRTH_CASES: readonly NatalS6BirthCase[] = [
  ...REGULAR,
  {
    caseId: 'solar-lichun-before-window',
    scenario: 'solar_term_window',
    birth: { calendarType: 'solar', date: { year: 2024, month: 2, day: 4 },
      time: { known: true, hour: 4, minute: 30 }, sexForTraditionalCalculation: 'unspecified' },
  },
  {
    caseId: 'solar-lichun-after-window',
    scenario: 'solar_term_window',
    birth: { calendarType: 'solar', date: { year: 2024, month: 2, day: 5 },
      time: { known: true, hour: 18, minute: 30 }, sexForTraditionalCalculation: 'unspecified' },
  },
  {
    caseId: 'lunar-2023-second-month',
    scenario: 'lunar_regular',
    birth: { calendarType: 'lunar', date: { year: 2023, month: 2, day: 10 },
      isLeapMonth: false, time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified' },
  },
  {
    caseId: 'lunar-2023-leap-second-month',
    scenario: 'lunar_leap',
    birth: { calendarType: 'lunar', date: { year: 2023, month: 2, day: 10 },
      isLeapMonth: true, time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified' },
  },
  {
    caseId: 'solar-unknown-time',
    scenario: 'unknown_time',
    birth: { calendarType: 'solar', date: { year: 2024, month: 3, day: 10 },
      time: { known: false }, sexForTraditionalCalculation: 'unspecified' },
  },
];

// Pre-registered contrasts: four seasonal contrasts in each of four birth years,
// plus four cross-year comparisons. Do not select pairs after viewing outcomes.
export const NATAL_S6_CONTRASTS: readonly { left: string; right: string }[] = [
  ...YEARS.flatMap(year => [1, 2, 3, 4].map(month => ({
    left: regularId(year, month),
    right: regularId(year, month + 6),
  }))),
  ...[1, 2, 3, 4].map(month => ({
    left: regularId(1984, month),
    right: regularId(2024, month),
  })),
];

function requireEvidence(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error('Natal S6 regression: ' + message);
}
function exactStructure(snapshot: CanonicalSajuSnapshot): string {
  const fact = snapshot.derivedFacts.tenGods;
  if (fact.status !== 'resolved') return 'unresolved';
  const read = (slot: 'year' | 'month' | 'day' | 'hour', key: 'stem' | 'branch') => {
    const v = fact.value[slot][key];
    return v?.status === 'resolved' ? v.value : 'unresolved';
  };
  return JSON.stringify({
    visibleStems: ['year', 'month', 'hour'].map(slot =>
      read(slot as 'year' | 'month' | 'hour', 'stem')),
    branches: ['year', 'month', 'day', 'hour'].map(slot =>
      read(slot as 'year' | 'month' | 'day' | 'hour', 'branch')),
  });
}
function reportDetails(reports: NatalFiveDomainMultifactorReports) {
  return DOMAIN_KEYS.map(domain => {
    const report = reports[domain];
    return {
      domain,
      state: report.state,
      missing: report.missing,
      limitations: report.limitations,
      sections: report.sections.map(section => ({
        claimType: section.claimType, pattern: section.pattern, axis: section.axis,
        channel: section.channel, headline: section.headline, paragraph: section.paragraph,
        sourceIds: section.sourceIds, ruleId: section.ruleId,
        ...('methodologyId' in section ? { methodologyId: section.methodologyId } : {}),
        upstreamClaimIds: section.upstreamClaimIds,
        positions: 'calculatedPositions' in section
          ? section.calculatedPositions : section.observedPositions,
        factPaths: 'calculatedFactPaths' in section
          ? section.calculatedFactPaths : section.observedFactPaths,
      })),
    };
  });
}
/** Source-issued claim meaning, consumed roles and Korean prose are separate. */
export function buildNatalS6MeaningAndEvidenceSignatures(
  domains: ReturnType<typeof reportDetails>,
): {
  meaningSignature: readonly string[];
  evidenceSignature: readonly string[];
  wordingSignature: readonly string[];
} {
  const result = buildSourceNatalMeaningSignatures(domains);
  return {
    meaningSignature: result.claimMeaning,
    evidenceSignature: result.evidenceRoles,
    wordingSignature: result.wording,
  };
}

export interface NatalS6AuditCase {
  caseId: string;
  scenario: NatalS6BirthCase['scenario'];
  birth: BirthInput;
  snapshotId: string;
  calculationHash: string;
  structureSignature: string;
  meaningSignature: readonly string[];
  /** Exact selected Rule, channel and Canonical observation provenance. */
  evidenceSignature: readonly string[];
  /** Actual Korean display copy, not authoritative semantic identity. */
  wordingSignature: readonly string[];
  domains: ReturnType<typeof reportDetails>;
  html: string;
}
export interface NatalS6Contrast {
  left: string;
  right: string;
  materiallyDifferentInputs: boolean;
  differentSourceBackedMeaning: boolean;
  /** Evidence may differ even when authorized semantic content does not. */
  differentConsumedEvidence: boolean;
  /** A distinct rendered paragraph is not automatically a distinct T8 Claim. */
  differentRenderedWording: boolean;
  evidenceWithoutNewClaimMeaning: boolean;
  wordingWithoutNewClaimMeaningOrEvidence: boolean;
  sourceMeaningWithoutWordingChange: boolean;
  leftMeanings: readonly string[];
  rightMeanings: readonly string[];
}

export function runNatalS6QualityRegression(): {
  version: typeof NATAL_S6_REGRESSION_VERSION;
  cases: readonly NatalS6AuditCase[];
  contrasts: readonly NatalS6Contrast[];
  differentiatedPairCount: number;
  researchOnly: true;
  usefulComplete: false;
  mayPublish: false;
  maySell: false;
  productMeaningSufficiencyProven: false;
} {
  const registries = {
    general: createGeneralNatalMultifactorRegistry(),
    career: createCareerMultifactorResearchRegistry(),
    wealth: createWealthNatalMultifactorRegistry(),
    business: createBusinessNatalMultifactorRegistry(),
    relationship: createRelationshipNatalMultifactorRegistry(),
  };
  const rows = NATAL_S6_BIRTH_CASES.map(({ caseId, scenario, birth }) => {
    const snapshot = calculateCanonicalSajuSnapshot(birth, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
    const a = runInterpretation(snapshot, registries.general, { now: NOW });
    const b = runInterpretation(snapshot, registries.career, { now: NOW });
    const c = runInterpretation(snapshot, registries.wealth, { now: NOW });
    const d = runInterpretation(snapshot, registries.business, { now: NOW });
    const e = runInterpretation(snapshot, registries.relationship, { now: NOW });
    const reports: NatalFiveDomainMultifactorReports = {
      general: buildGeneralNatalMultifactorReport(snapshot, a, registries.general),
      career: buildCareerMultifactorResearchReport(snapshot, b, registries.career),
      wealth: buildWealthNatalMultifactorReport(snapshot, c, registries.wealth),
      business: buildBusinessNatalMultifactorReport(snapshot, d, registries.business),
      relationship: buildRelationshipNatalMultifactorReport(snapshot, e, registries.relationship),
    };
    const html = renderNatalFiveDomainMultifactorResearchHtml(snapshot, reports);
    const domains = reportDetails(reports);
    for (const domain of DOMAIN_KEYS) {
      const report = reports[domain];
      requireEvidence(report.snapshotId === snapshot.snapshotId &&
        report.calculationHash === snapshot.calculationHash &&
        report.researchOnly === true && report.usefulComplete === false &&
        report.mayPublish === false && report.maySell === false,
      caseId + '/' + domain + ': wrong chart or research boundary');
    }
    for (const domain of domains) {
      requireEvidence(domain.state !== 'complete' || domain.sections.length >= 3,
        caseId + '/' + domain.domain + ': invalid minimum useful reading');
      requireEvidence(new Set(domain.sections.map(s => s.axis)).size === domain.sections.length,
        caseId + '/' + domain.domain + ': repeated axis substituted for distinct evidence');
      for (const section of domain.sections) {
        requireEvidence(section.sourceIds.length > 0 && section.upstreamClaimIds.length >= 2 &&
          section.ruleId === 'RULE-' + section.claimType &&
          section.positions.length >= 2 &&
          section.positions.length === section.factPaths.length &&
          section.positions.every(x => section.paragraph.includes(x)) &&
          /[가-힣]/u.test(section.paragraph),
        caseId + '/' + domain.domain + ': incomplete Korean meaning or provenance');
      }
      if (scenario === 'unknown_time') {
        requireEvidence(domain.state === 'insufficient' && domain.sections.length === 0,
          caseId + '/' + domain.domain + ': unknown birth hour must fail closed');
      }
    }
    const { meaningSignature, evidenceSignature, wordingSignature } =
      buildNatalS6MeaningAndEvidenceSignatures(domains);
    return {
      caseId, scenario, birth, snapshotId: snapshot.snapshotId,
      calculationHash: snapshot.calculationHash,
      structureSignature: exactStructure(snapshot),
      meaningSignature, evidenceSignature, wordingSignature, domains, html,
    };
  });
  const indexed = new Map(rows.map(row => [row.caseId, row]));
  requireEvidence(rows.length >= 30 && indexed.size === rows.length,
    'at least 30 distinct real birth inputs are required');
  const contrasts = NATAL_S6_CONTRASTS.map(pair => {
    const left = indexed.get(pair.left);
    const right = indexed.get(pair.right);
    requireEvidence(left && right, 'contrast references an absent birth chart');
    const materiallyDifferentInputs = left.structureSignature !== right.structureSignature;
    const differentSourceBackedMeaning = materiallyDifferentInputs &&
      JSON.stringify(left.meaningSignature) !== JSON.stringify(right.meaningSignature);
    const differentConsumedEvidence =
      JSON.stringify(left.evidenceSignature) !== JSON.stringify(right.evidenceSignature);
    const differentRenderedWording =
      JSON.stringify(left.wordingSignature) !== JSON.stringify(right.wordingSignature);
    return {
      ...pair, materiallyDifferentInputs, differentSourceBackedMeaning,
      differentConsumedEvidence, differentRenderedWording,
      evidenceWithoutNewClaimMeaning: differentConsumedEvidence && !differentSourceBackedMeaning,
      wordingWithoutNewClaimMeaningOrEvidence: differentRenderedWording &&
        !differentConsumedEvidence && !differentSourceBackedMeaning,
      sourceMeaningWithoutWordingChange: differentSourceBackedMeaning && !differentRenderedWording,
      leftMeanings: left.meaningSignature, rightMeanings: right.meaningSignature,
    };
  });
  const differentiatedPairCount = contrasts.filter(pair => pair.differentSourceBackedMeaning).length;
  requireEvidence(contrasts.length >= 10 && differentiatedPairCount >= 10,
    'fewer than 10 pre-registered contrasts yield different source-backed semantic patterns');
  requireEvidence(rows.some(row => row.scenario === 'lunar_leap') &&
    rows.some(row => row.scenario === 'lunar_regular') &&
    rows.some(row => row.scenario === 'solar_term_window') &&
    rows.some(row => row.scenario === 'unknown_time'),
  'missing calendar, solar term, or unknown-hour case');
  return {
    version: NATAL_S6_REGRESSION_VERSION,
    cases: rows,
    contrasts,
    differentiatedPairCount,
    researchOnly: true, usefulComplete: false, mayPublish: false, maySell: false,
    productMeaningSufficiencyProven: false,
  };
}
