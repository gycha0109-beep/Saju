import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { NatalN16GroundedReaderBrief, NatalN16TextProvenance } from './natal-grounded-reader-brief.js';
import type { NatalN21ReaderFirstStory } from './natal-reader-first-story.js';
import type { NatalSynthesisDomain } from './natal-synthesis-preview.js';

export const NATAL_N24_EXPANDED_SOURCE_READING_VERSION =
  'saju-n24-expanded-authentic-five-domain-source-reading-v1' as const;

export interface NatalN24OriginalExcerpt {
  unitId: string;
  /** Identical to the bounded Preview response; no new interpretation. */
  text: string;
  provenance: readonly NatalN16TextProvenance[];
  appearedInDomains: readonly NatalSynthesisDomain[];
  selectionBasis: 'domain_distinctive' | 'cross_domain_shared';
  interpretationNewlyInferred: false;
}

export interface NatalN24ExpandedDomain {
  domain: NatalSynthesisDomain;
  title: string;
  responseState: string;
  additionalOriginalExcerpts: readonly NatalN24OriginalExcerpt[];
}

/**
 * Complete the N23 first-screen reading with ALL its remaining authentic
 * source-owned paragraphs in the same domain cards, rather than burying them
 * under a global technical/research appendix. The excerpts never become a
 * new claim or a claimed semantic distinction between natal charts.
 */
export interface NatalN24ExpandedSourceReading {
  version: typeof NATAL_N24_EXPANDED_SOURCE_READING_VERSION;
  lifecycle: 'internal_preview_only';
  snapshotId: string;
  calculationHash: string;
  previewMeaningFingerprint: string;
  sections: readonly NatalN24ExpandedDomain[];
  firstScreenOriginalCount: number;
  additionalOriginalCount: number;
  totalDistinctOriginalCount: number;
  originalLeftUnreadCount: 0;
  excludedCalculatedTextUnits: number;
  createsNewInterpretation: false;
  meaningDifferentiationProven: false;
  mayPublish: false;
  maySell: false;
}

export function buildNatalN24ExpandedSourceReading(
  brief: NatalN16GroundedReaderBrief,
  story: NatalN21ReaderFirstStory,
): NatalN24ExpandedSourceReading {
  if (brief.snapshotId !== story.snapshotId ||
      brief.calculationHash !== story.calculationHash ||
      brief.birthTimeKnown !== story.birthTimeKnown ||
      brief.lifecycle !== 'internal_preview_only' ||
      story.lifecycle !== 'internal_preview_only' ||
      brief.mayPublish || brief.maySell || story.mayPublish || story.maySell) {
    throw new TypeError('N24 source reading is not bound to the exact internal canonical reading');
  }
  const originals = brief.readingUnits.filter((u) => u.kind === 'existing_preview_interpretation');
  const originalMap = new Map(originals.map((u) => [u.unitId, u]));
  const expectedFingerprint = deterministicContentHash(originals.map((u) => u.unitId).sort());
  if (story.previewMeaningFingerprint !== expectedFingerprint ||
      story.sections.length !== brief.domains.length) {
    throw new TypeError('N24 cannot expand a story with a changed source meaning set');
  }

  const displayed = new Set<string>();
  for (const section of story.sections) {
    const domain = brief.domains.find((item) => item.domain === section.domain);
    if (!domain || section.responseState !== domain.responseState) {
      throw new TypeError('N24 first-screen domain does not match original reading');
    }
    for (const excerpt of section.excerpts) {
      const original = originalMap.get(excerpt.unitId);
      if (!original || original.text !== excerpt.text ||
          !domain.unitIds.includes(excerpt.unitId) ||
          !original.sources.some((p) => p.domain === domain.domain) ||
          excerpt.interpretationNewlyInferred ||
          displayed.has(excerpt.unitId)) {
        throw new TypeError('N24 cannot accept an unproven or repeated first-screen interpretation');
      }
      displayed.add(excerpt.unitId);
    }
  }
  if (displayed.size !== story.displayedOriginalInterpretationCount) {
    throw new TypeError('N24 first-screen count is not source consistent');
  }

  const sections: NatalN24ExpandedDomain[] = brief.domains.map((domain) => {
    const own = domain.unitIds.flatMap((id) => {
      const unit = originalMap.get(id);
      return unit === undefined ? [] : [unit];
    });
    // Respect the N23 display principle: text exclusive to the domain first,
    // then the still-unread shared original text in original source order.
    const preferred = [
      ...own.filter((unit) => unit.appearingInDomains.length === 1),
      ...own.filter((unit) => unit.appearingInDomains.length > 1),
    ];
    const additionalOriginalExcerpts: NatalN24OriginalExcerpt[] = [];
    for (const unit of preferred) {
      if (displayed.has(unit.unitId)) continue;
      const provenance = unit.sources.filter((p) => p.domain === domain.domain);
      if (provenance.length === 0) {
        throw new TypeError('N24 original text lacks domain-specific response provenance');
      }
      additionalOriginalExcerpts.push({
        unitId: unit.unitId,
        text: unit.text,
        provenance,
        appearedInDomains: unit.appearingInDomains,
        selectionBasis: unit.appearingInDomains.length === 1
          ? 'domain_distinctive' : 'cross_domain_shared',
        interpretationNewlyInferred: false,
      });
      displayed.add(unit.unitId);
    }
    return {
      domain: domain.domain,
      title: domain.title,
      responseState: domain.responseState,
      additionalOriginalExcerpts,
    };
  });
  if (displayed.size !== originalMap.size) {
    throw new TypeError('N24 would leave an authentic original interpretation unread');
  }
  return {
    version: NATAL_N24_EXPANDED_SOURCE_READING_VERSION,
    lifecycle: 'internal_preview_only',
    snapshotId: brief.snapshotId,
    calculationHash: brief.calculationHash,
    previewMeaningFingerprint: expectedFingerprint,
    sections,
    firstScreenOriginalCount: story.displayedOriginalInterpretationCount,
    additionalOriginalCount: sections.reduce(
      (sum, section) => sum + section.additionalOriginalExcerpts.length, 0),
    totalDistinctOriginalCount: originals.length,
    originalLeftUnreadCount: 0,
    excludedCalculatedTextUnits: brief.calculatedContextTextUnitCount,
    createsNewInterpretation: false,
    meaningDifferentiationProven: false,
    mayPublish: false,
    maySell: false,
  };
}
