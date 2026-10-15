import type {
  ProductReadingResponse,
  ProductReadingResponseBlock,
  ProductReadingResponseSection,
} from '../reading/product-reading-response.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const NATAL_PERSONALIZATION_BASELINE_VERSION = 'saju-natal-personalization-baseline-n0-v1' as const;

export interface NatalPersonalizationBaselineInput {
  caseId: string;
  birthLabel: string;
  response: ProductReadingResponse;
}

export interface NatalPersonalizationBaselineCase {
  caseId: string;
  birthLabel: string;
  responseState: ProductReadingResponse['state'];
  sectionTitles: readonly string[];
  pillarValues: readonly string[];
  factFingerprint?: string;
  interpretationFingerprint?: string;
  interpretationParagraphs: readonly string[];
  disclosureCount: number;
}

export interface NatalPersonalizationBaselineContrast {
  left: string;
  right: string;
  kind: 'different_facts_same_interpretation' | 'same_facts_different_interpretation';
}

export interface NatalPersonalizationBaselineReport {
  version: typeof NATAL_PERSONALIZATION_BASELINE_VERSION;
  lifecycle: 'internal_quality_audit';
  productionAuthorityGranted: false;
  mayPublish: false;
  maySell: false;
  numberOfCases: number;
  uniqueFactFingerprints: number;
  uniqueInterpretationFingerprints: number;
  responseStates: Readonly<Record<string, number>>;
  casesWithoutInterpretation: readonly string[];
  contrasts: readonly NatalPersonalizationBaselineContrast[];
  cases: readonly NatalPersonalizationBaselineCase[];
  limitations: readonly string[];
}

function meaningfulBlockText(block: ProductReadingResponseBlock): readonly string[] {
  switch (block.type) {
    case 'paragraph':
      return [block.text];
    case 'key_points':
      return block.items;
    case 'comparison':
      return block.perspectives.map((entry) => entry.text);
    case 'ambiguity':
      return [block.summary, ...block.scenarios.map((entry) => entry.text)];
    case 'timeline':
      return block.entries.map((entry) => entry.text);
    case 'fact_table':
    case 'source_hint':
      return [];
  }
}

function isInterpretiveSection(section: ProductReadingResponseSection): boolean {
  // Chart tables and scope disclosures must not count as individualized interpretation.
  return section.title !== '해석 범위' && section.title !== '프리뷰 안내';
}

export function inspectNatalPersonalizationBaselineCase(
  input: NatalPersonalizationBaselineInput,
): NatalPersonalizationBaselineCase {
  const reading = input.response.reading;
  const summary = reading?.calculationSummary;
  const pillarValues =
    summary === undefined
      ? []
      : (['year', 'month', 'day', 'hour'] as const).map((slot) => {
          const pillar = summary.pillars[slot];
          return `${slot}:${pillar.status}:${pillar.value ?? 'unknown'}`;
        });

  const interpretationParagraphs =
    reading?.sections
      .filter(isInterpretiveSection)
      .flatMap((section) => section.blocks.flatMap(meaningfulBlockText))
      .map((value) => value.trim())
      .filter((value) => value.length > 0) ?? [];

  const hasChart = pillarValues.length === 4;
  return {
    caseId: input.caseId,
    birthLabel: input.birthLabel,
    responseState: input.response.state,
    sectionTitles: reading?.sections.map((section) => section.title) ?? [],
    pillarValues,
    ...(hasChart
      ? {
          factFingerprint: deterministicContentHash({
            pillars: summary?.pillars,
            fiveElements: summary?.fiveElements ?? [],
            tenGods: summary?.tenGods ?? [],
          }),
        }
      : {}),
    ...(interpretationParagraphs.length > 0
      ? {
          interpretationFingerprint: deterministicContentHash(interpretationParagraphs),
        }
      : {}),
    interpretationParagraphs,
    disclosureCount: reading?.disclosures.length ?? 0,
  };
}

export function buildNatalPersonalizationBaselineReport(
  inputs: readonly NatalPersonalizationBaselineInput[],
): NatalPersonalizationBaselineReport {
  const cases = inputs.map(inspectNatalPersonalizationBaselineCase);
  const seen = new Set<string>();
  for (const entry of cases) {
    if (seen.has(entry.caseId)) throw new TypeError(`Duplicate audit caseId: ${entry.caseId}`);
    seen.add(entry.caseId);
  }

  const states: Record<string, number> = {};
  for (const entry of cases) {
    states[entry.responseState] = (states[entry.responseState] ?? 0) + 1;
  }

  const contrasts: NatalPersonalizationBaselineContrast[] = [];
  for (let i = 0; i < cases.length; i += 1) {
    const left = cases[i]!;
    if (left.factFingerprint === undefined || left.interpretationFingerprint === undefined) {
      continue;
    }
    for (let j = i + 1; j < cases.length; j += 1) {
      const right = cases[j]!;
      if (right.factFingerprint === undefined || right.interpretationFingerprint === undefined) {
        continue;
      }
      const factsSame = left.factFingerprint === right.factFingerprint;
      const interpretationSame =
        left.interpretationFingerprint === right.interpretationFingerprint;
      if (factsSame && !interpretationSame) {
        contrasts.push({
          left: left.caseId,
          right: right.caseId,
          kind: 'same_facts_different_interpretation',
        });
      } else if (!factsSame && interpretationSame) {
        contrasts.push({
          left: left.caseId,
          right: right.caseId,
          kind: 'different_facts_same_interpretation',
        });
      }
    }
  }

  return {
    version: NATAL_PERSONALIZATION_BASELINE_VERSION,
    lifecycle: 'internal_quality_audit',
    productionAuthorityGranted: false,
    mayPublish: false,
    maySell: false,
    numberOfCases: cases.length,
    uniqueFactFingerprints: new Set(cases.flatMap((x) => x.factFingerprint ?? [])).size,
    uniqueInterpretationFingerprints: new Set(
      cases.flatMap((x) => x.interpretationFingerprint ?? []),
    ).size,
    responseStates: Object.fromEntries(Object.entries(states).sort(([a], [b]) => a.localeCompare(b))),
    casesWithoutInterpretation: cases
      .filter((entry) => entry.interpretationFingerprint === undefined)
      .map((entry) => entry.caseId),
    contrasts,
    cases,
    limitations: [
      'Different wording is not proof of traditional interpretive validity or useful personalization.',
      'Fact fingerprint covers consumer-displayed pillars, five elements, and Ten Gods, not the entire internal CanonicalSajuSnapshot.',
      'Exact same displayed facts may omit structural distinctions. Contrast flags require manual review.',
      'This audit cannot grant Research, Bridge, Official Reading, Production, persistence, or commerce authority.',
    ],
  };
}
