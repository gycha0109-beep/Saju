import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { CanonicalReadingSemanticBundleV1 } from '../reading/canonical-reading-semantics.js';
import type { OfficialReadingPlanV1 } from '../reading/official-reading-plan.js';
import type { OfficialReadingRenderedContentV1 } from '../reading/official-reading-renderer.js';
import type { ProductReadingDeliveryResult } from '../reading/product-reading-delivery.js';
import type { ProductReadingResponse, ProductReadingResponseSection } from '../reading/product-reading-response.js';

export const NATAL_N25_CONSUMER_ATOM_TRACE_VERSION =
  'saju-natal-n25-claim-to-real-consumer-atom-trace-v1' as const;

type Fragment = { type: 'paragraph' | 'key_points' | 'comparison' | 'ambiguity'; text: string };
export type NatalN25AtomDisposition =
  | 'exact_unique_consumer_match'
  | 'ambiguous_repeated_consumer_text'
  | 'consumer_text_not_proven'
  | 'multi_claim_scenario_not_individually_attributable';

export interface NatalN25TraceAtom {
  sectionId: string;
  sectionTitle: string;
  explainabilityRef: string;
  primaryUnitIds: readonly string[];
  claimIds: readonly string[];
  claimTypes: readonly string[];
  claimOwnedTextFingerprints: readonly (string | null)[];
  observedFragments: readonly Fragment[];
  disposition: NatalN25AtomDisposition;
  /** No novel interpretive meaning is inferred from these links. */
  semanticDifferentiationProven: false;
}

export interface NatalN25ConsumerAtomTrace {
  version: typeof NATAL_N25_CONSUMER_ATOM_TRACE_VERSION;
  lifecycle: 'internal_quality_audit';
  mayPublish: false;
  maySell: false;
  mayApproveResearchMeaning: false;
  snapshotId: string;
  readingId: string;
  sourceSemanticHash: string;
  officialReadingPlanHash: string;
  officialReadingReportHash: string;
  atoms: readonly NatalN25TraceAtom[];
  exactUniqueMatches: number;
  ambiguousMatches: number;
  unprovenMatches: number;
  limitations: readonly string[];
}

function fragmentsForInsight(
  insight: { headline?: string; summary?: string; qualifiers?: readonly string[] },
  totalItems: number,
): Fragment[] {
  const headline = insight.headline;
  const summary = insight.summary;
  const qualifiers = insight.qualifiers ?? [];
  if (totalItems > 1) {
    return [{ type: 'key_points', text: [
      ...(headline === undefined ? [] : [headline]),
      ...(summary === undefined || summary === headline ? [] : [summary]),
      ...qualifiers,
    ].join('\n') }];
  }
  const material: Fragment[] = headline === undefined && summary === undefined
    ? []
    : headline !== undefined && summary !== undefined && headline !== summary
      ? [{ type: 'key_points', text: headline }, { type: 'paragraph', text: summary }]
      : [{ type: 'paragraph', text: summary ?? headline ?? '' }];
  return [...material, ...qualifiers.map((text) => ({ type: 'key_points' as const, text }))];
}

function consumerFragments(section: ProductReadingResponseSection): Fragment[] {
  return section.blocks.flatMap((block): Fragment[] => {
    switch (block.type) {
      case 'paragraph': return [{ type: 'paragraph', text: block.text }];
      case 'key_points': return block.items.map((text) => ({ type: 'key_points', text }));
      case 'comparison': return block.perspectives.map((p) => ({ type: 'comparison', text: p.text }));
      case 'ambiguity': return block.scenarios.map((s) => ({ type: 'ambiguity', text: s.text }));
      default: return [];
    }
  });
}

function sameFragment(a: Fragment, b: Fragment): boolean {
  return a.type === b.type && a.text === b.text;
}

/**
 * N25 audit-only link: canonical primary Claim -> Official explainability atom ->
 * EXACT consumer text, bound to the same Official artifact readingId and report.
 * The Product contract deliberately strips internal Claim IDs; this does not
 * leak them or infer a new approved semantic distinction.
 */
export function traceNatalN25ConsumerMeaningAtoms(input: {
  semantics: CanonicalReadingSemanticBundleV1;
  plan: OfficialReadingPlanV1;
  report: OfficialReadingRenderedContentV1;
  artifact: NonNullable<ProductReadingDeliveryResult['artifact']>;
  response: ProductReadingResponse;
}): NatalN25ConsumerAtomTrace {
  const { semantics, plan, report, artifact, response } = input;
  if (semantics.intent.domain !== 'general' || semantics.intent.temporalScope !== 'natal' ||
      plan.readingDomain !== 'general' || plan.sourceSemanticHash !== semantics.semanticHash ||
      report.sourceSemanticHash !== semantics.semanticHash ||
      report.sourcePlanHash !== plan.planHash ||
      response.reading === undefined ||
      response.reading.readingId !== artifact.readingId ||
      (response.state !== 'delivered' && response.state !== 'delivered_with_fallback')) {
    throw new TypeError('N25 trace requires an identical delivered General Natal semantic/report/reading chain.');
  }
  const provenance = artifact.provenance as unknown as Record<string, unknown>;
  if (provenance.snapshotId !== semantics.snapshotId ||
      provenance.canonicalSemanticHash !== semantics.semanticHash ||
      provenance.officialReadingPlanHash !== plan.planHash ||
      provenance.officialReadingReportHash !== report.reportHash) {
    throw new TypeError('N25 Official artifact is not bound to the source semantic chain.');
  }
  if (deterministicContentHash(artifact.sections) !== deterministicContentHash(report.sections) ||
      deterministicContentHash(artifact.explainability) !== deterministicContentHash(report.explainability)) {
    throw new TypeError('N25 Official artifact has a different report rendering.');
  }

  const units = new Map(semantics.units.map((unit) => [unit.unitId, unit]));
  if (units.size !== semantics.units.length) throw new TypeError('N25 duplicate canonical semantic units.');
  const planPrimaryRefs = new Set(plan.sections.flatMap((section) => section.primaryUnitRefs));
  const explain = new Map(report.explainability.entries.map((entry) => [entry.explainabilityRef, entry]));
  if (explain.size !== report.explainability.entries.length) throw new TypeError('N25 duplicate explainability refs.');

  const candidates: Array<{
    sectionId: string; sectionTitle: string; explainabilityRef: string;
    fragments: Fragment[]; individuallyAttributable: boolean;
  }> = [];
  for (const section of report.sections) {
    for (const block of section.blocks) {
      if (block.type === 'insights') {
        for (const item of block.items) candidates.push({
          sectionId: section.sectionId, sectionTitle: section.title,
          explainabilityRef: item.explainabilityRef,
          fragments: fragmentsForInsight(item, block.items.length),
          individuallyAttributable: true,
        });
      } else if (block.type === 'comparison') {
        for (const p of block.perspectives) candidates.push({
          sectionId: section.sectionId, sectionTitle: section.title,
          explainabilityRef: p.explainabilityRef,
          fragments: [{ type: 'comparison', text: p.text }],
          individuallyAttributable: true,
        });
      } else if (block.type === 'ambiguity') {
        for (const scenario of block.scenarios) {
          for (const ref of scenario.explainabilityRefs ?? []) candidates.push({
            sectionId: section.sectionId, sectionTitle: section.title,
            explainabilityRef: ref,
            fragments: [{ type: 'ambiguity', text: scenario.text }],
            individuallyAttributable: (scenario.explainabilityRefs?.length ?? 0) === 1,
          });
        }
      }
    }
  }

  const atoms: NatalN25TraceAtom[] = candidates.map((candidate) => {
    const binding = explain.get(candidate.explainabilityRef);
    if (binding === undefined || binding.primaryUnitRefs.length !== 1) {
      throw new TypeError('N25 visible atom must have exactly one canonical primary evidence binding.');
    }
    const primaryUnitIds = [...binding.primaryUnitRefs];
    const primary = primaryUnitIds.map((id) => {
      const unit = units.get(id);
      if (unit === undefined || !planPrimaryRefs.has(id) || !binding.claimIds.includes(unit.claimId)) {
        throw new TypeError('N25 visible atom has an unselected or unproven primary Claim.');
      }
      return unit;
    });
    const matchingSections = response.reading!.sections.filter((section) =>
      section.title === candidate.sectionTitle);
    const consumer = matchingSections.length === 1
      ? consumerFragments(matchingSections[0]!) : [];
    const otherCandidates = candidates.filter((other) =>
      other !== candidate && other.sectionTitle === candidate.sectionTitle);
    const allUnique = candidate.fragments.length > 0 &&
      candidate.fragments.every((fragment) =>
        consumer.filter((other) => sameFragment(fragment, other)).length === 1 &&
        !otherCandidates.some((other) => other.fragments.some((s) => sameFragment(fragment, s))));
    const someRepeated = candidate.fragments.some((fragment) =>
      consumer.filter((other) => sameFragment(fragment, other)).length > 1 ||
      otherCandidates.some((other) => other.fragments.some((s) => sameFragment(fragment, s))));
    const disposition: NatalN25AtomDisposition = !candidate.individuallyAttributable
      ? 'multi_claim_scenario_not_individually_attributable'
      : allUnique
        ? 'exact_unique_consumer_match'
        : someRepeated
          ? 'ambiguous_repeated_consumer_text'
          : 'consumer_text_not_proven';
    return {
      sectionId: candidate.sectionId,
      sectionTitle: candidate.sectionTitle,
      explainabilityRef: candidate.explainabilityRef,
      primaryUnitIds,
      claimIds: primary.map((unit) => unit.claimId),
      claimTypes: primary.map((unit) => unit.claimType),
      claimOwnedTextFingerprints: primary.map((unit) =>
        unit.canonicalText === undefined ? null : deterministicContentHash(unit.canonicalText)),
      observedFragments: candidate.fragments,
      disposition,
      semanticDifferentiationProven: false,
    };
  });

  return {
    version: NATAL_N25_CONSUMER_ATOM_TRACE_VERSION,
    lifecycle: 'internal_quality_audit',
    mayPublish: false, maySell: false, mayApproveResearchMeaning: false,
    snapshotId: semantics.snapshotId,
    readingId: artifact.readingId,
    sourceSemanticHash: semantics.semanticHash,
    officialReadingPlanHash: plan.planHash,
    officialReadingReportHash: report.reportHash,
    atoms,
    exactUniqueMatches: atoms.filter((a) => a.disposition === 'exact_unique_consumer_match').length,
    ambiguousMatches: atoms.filter((a) =>
      a.disposition === 'ambiguous_repeated_consumer_text' ||
      a.disposition === 'multi_claim_scenario_not_individually_attributable').length,
    unprovenMatches: atoms.filter((a) => a.disposition === 'consumer_text_not_proven').length,
    limitations: [
      'Exact text and reading identity establish a trace of displayed material, not a new licensed interpretation.',
      'Repeated source copy cannot be uniquely assigned to a consumer atom; collisions stay ambiguous.',
      'Several Claim refs inside one scenario paragraph cannot be individually attributed.',
      'An unmatched fragment may reflect consumer redaction or an unobserved projection; it is not proof of a semantic bug.',
      'Comparing canonical text fingerprints across charts can locate shared source copy, not prove meaning should differ.',
    ],
  };
}
