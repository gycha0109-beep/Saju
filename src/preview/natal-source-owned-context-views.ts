/**
 * Existing research-only T8 meanings of ONE person's Canonical natal chart.
 * The main three-axis research selection is unchanged: previously emitted
 * overlapping or displaced Claims are display-only and never extra MUR axes.
 */
export interface OriginalNatalT8Section {
  claimType: string;
  axis: string;
  headline: string;
  paragraph: string;
  upstreamClaimIds: readonly string[];
  sourceIds: readonly string[];
  ruleId: string;
  observedFactPaths: readonly string[];
  observedPositions: readonly string[];
}

export interface OriginalNatalT8Report<T extends OriginalNatalT8Section> {
  state: 'complete' | 'partial' | 'insufficient';
  sections: readonly T[];
  overlappingPerspectives?: readonly (T & {
    overlapsSelectedFactPaths: readonly string[];
  })[];
  displacedOriginalCore?: T;
}

export type OriginalNatalEvidenceMode =
  'reused_calculated_paths' | 'original_source_core';

export interface OriginalNatalT8View<T extends OriginalNatalT8Section> {
  section: T;
  evidenceMode?: OriginalNatalEvidenceMode;
}

const FACT_PATH =
  /^derivedFacts\.tenGods\.value\.(year|month|day|hour)\.(stem|branch)\.value$/u;

export function collectExistingNatalT8Views<T extends OriginalNatalT8Section>(
  domain: 'general' | 'relationship',
  report: OriginalNatalT8Report<T>,
): readonly OriginalNatalT8View<T>[] {
  const result: OriginalNatalT8View<T>[] = report.sections.map(section =>
    ({ section }));
  const seen = new Set(report.sections.map(section => section.claimType));
  const selectedAxes = new Set(report.sections.map(section => section.axis));
  const usedPaths = new Set(report.sections.flatMap(section =>
    section.observedFactPaths));
  const validate = (section: T): void => {
    if (!section.claimType.startsWith(domain.toUpperCase() + '_NATAL_MULTIFACTOR_') ||
        section.ruleId !== 'RULE-' + section.claimType ||
        section.upstreamClaimIds.length < 2 ||
        section.sourceIds.length < 2 ||
        !section.headline.trim() || !section.paragraph.trim() ||
        section.observedFactPaths.length < 2 ||
        section.observedFactPaths.length !== section.observedPositions.length ||
        !section.observedFactPaths.every(path => FACT_PATH.test(path)) ||
        seen.has(section.claimType)) {
      throw new TypeError('Natal T8 extra meaning requires an original distinct source-issued Claim.');
    }
    seen.add(section.claimType);
  };
  const overlaps = report.overlappingPerspectives ?? [];
  if (overlaps.length > 0 && (
      report.state !== 'partial' || report.sections.length === 0 ||
      overlaps.length > 2)) {
    throw new TypeError('Natal T8 overlapping meaning cannot change the independent research state.');
  }
  for (const section of overlaps) {
    validate(section);
    if (selectedAxes.has(section.axis) ||
        !section.observedFactPaths.every(path => usedPaths.has(path)) ||
        JSON.stringify(section.overlapsSelectedFactPaths) !==
          JSON.stringify(section.observedFactPaths)) {
      throw new TypeError('Natal overlapping T8 must reuse only already selected actual chart facts.');
    }
    selectedAxes.add(section.axis);
    result.push({ section, evidenceMode: 'reused_calculated_paths' });
  }
  const original = report.displacedOriginalCore;
  if (original !== undefined) {
    const eligibleOriginalAxes = domain === 'general'
      ? ['core', 'expression', 'response', 'responsibility']
      : ['core', 'expression', 'boundaries', 'reception'];
    if (report.state !== 'complete' || report.sections.length !== 3 ||
        !eligibleOriginalAxes.includes(original.axis)) {
      throw new TypeError('Displaced source T8 can only be retained after independently complete selection.');
    }
    validate(original);
    result.push({ section: original, evidenceMode: 'original_source_core' });
  }
  return result;
}
