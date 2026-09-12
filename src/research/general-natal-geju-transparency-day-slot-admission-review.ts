import { createHash } from 'node:crypto';
import type { SourceReference } from '../contracts/interpretation.js';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
  type GeneralNatalGejuCandidatePredicateGap,
} from './general-natal-geju-candidate-source-frontier.js';
import {
  GENERAL_NATAL_GEJU_SOURCE_OBSERVED_TRANSPARENCY_SLOTS,
  GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_EVIDENCE_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_EVIDENCE_VERSION,
  GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_REFERENCES,
} from './general-natal-geju-transparency-slot-source-evidence.js';

export const GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_REVIEW_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_REVIEW_SCOPE =
  'ziping_zhenquan_transparency_day_slot_and_exhaustiveness_admission_review' as const;
export const GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_DECISION =
  'DIRECT_SOURCE_DAY_SLOT_AND_EXHAUSTIVENESS_NOT_ESTABLISHED_SECONDARY_EXPLANATION_NOT_PROMOTED' as const;

export type GeneralNatalGejuTransparencyDaySlotAdmissionEvidenceKey =
  | 'inherited_positive_slot_examples'
  | 'direct_generic_transparency_definition'
  | 'secondary_year_month_hour_explanation';

export interface GeneralNatalGejuTransparencyDaySlotAdmissionEvidence {
  readonly key: GeneralNatalGejuTransparencyDaySlotAdmissionEvidenceKey;
  readonly sourceId: string;
  readonly provenanceTier: SourceReference['provenanceTier'];
  readonly observationEstablished: true;
  readonly daySlotInclusionAuthorized: false;
  readonly daySlotExclusionAuthorized: false;
  readonly exhaustiveSlotSetAuthorized: false;
  readonly fullTransparencyPredicateAuthorized: false;
  readonly authorityBoundary: string;
}

export interface GeneralNatalGejuTransparencyDaySlotAdmissionReviewReport {
  readonly reviewId: string;
  readonly reviewVersion: typeof GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_REVIEW_VERSION;
  readonly sourceScope: typeof GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_REVIEW_SCOPE;
  readonly decision: typeof GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_DECISION;
  readonly upstreamTransparencyEvidenceVersion: typeof GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_EVIDENCE_VERSION;
  readonly upstreamTransparencyEvidenceDefinitionHash: string;
  readonly inheritedPositiveSourceObservedSlots: typeof GENERAL_NATAL_GEJU_SOURCE_OBSERVED_TRANSPARENCY_SLOTS;
  readonly directGenericTransparencyDefinitionObserved: true;
  readonly directSourceDaySlotInclusionObserved: false;
  readonly directSourceDaySlotExclusionObserved: false;
  readonly directSourceSlotSetExhaustivenessObserved: false;
  readonly secondaryYearMonthHourOnlyExplanationObserved: true;
  readonly secondaryEvidencePromotedToPredicate: false;
  readonly daySlotAdmissibility: 'unresolved';
  readonly transparencySlotSetExhaustiveness: 'unresolved';
  readonly fullTransparencyPredicateAuthorized: false;
  readonly transparencySelectionPredicateAuthorized: false;
  readonly candidateDerivationAuthorized: false;
  readonly establishmentPredicateAuthorized: false;
  readonly candidateFactsEmitted: false;
  readonly establishmentFactsEmitted: false;
  readonly evidence: readonly GeneralNatalGejuTransparencyDaySlotAdmissionEvidence[];
  readonly sourceIds: readonly string[];
  readonly openPredicateGaps: readonly GeneralNatalGejuCandidatePredicateGap[];
  readonly authorityBoundary: string;
  readonly notes: readonly string[];
}

const CLASSICAL_SOURCE_COMMON = {
  sourceType: 'classical_text',
  title: '子平真詮評注',
  author: '沈孝瞻',
  editor: '徐樂吾',
  language: 'zh-Hant',
  url: 'https://ctext.org/wiki.pl?chapter=974137&if=en',
  accessedAt: '2026-09-13',
  provenanceTier: 'cross_reference',
  rights: {
    copyrightStatus: 'unknown',
    reusePolicy: 'metadata_only',
  },
} as const;

export const GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_SOURCE_REFERENCES =
  Object.freeze({
    genericTransparencyDefinition: {
      ...CLASSICAL_SOURCE_COMMON,
      sourceId: 'SRC-GEJU-ZIPING-PINGZHU-GENERIC-TRANSPARENCY-DEFINITION',
      locator: {
        section: '論雜氣如何取用',
        anchor: '透干者以中所藏之神，透於干也',
      },
      notes:
        'Direct generic wording establishes hidden-stem appearance at the heavenly-stem layer. It does not directly enumerate admissible pillar slots, include the day stem, exclude the day stem, or prove slot-set exhaustiveness.',
    } satisfies SourceReference,
    secondaryYearMonthHourExplanation: {
      sourceId: 'SRC-GEJU-CLARIFY-MONTH-COMMAND-TRANSPARENCY-SLOT-EXPLANATION-20260904',
      sourceType: 'web',
      title: '月令透干取格：什么叫透出，怎么查，有什么用',
      publisher: 'Clarify',
      language: 'zh-Hans',
      url: 'https://clarifyhk.com/zh-hans/learn/bazi/pattern-methods/determining-structure-from-a-revealed-month-command',
      accessedAt: '2026-09-13',
      provenanceTier: 'practitioner_secondary',
      locator: {
        section: '查透干，先做哪三个动作？',
        anchor: '年、月或时干',
      },
      rights: {
        copyrightStatus: 'unknown',
        reusePolicy: 'metadata_only',
      },
      notes:
        'Contemporary explanatory source explicitly checks month-command hidden stems against year/month/hour stems and treats the day stem as the reference. This is useful contrast/corroboration only and is not promoted into the repository predicate because it does not replace direct governed source authority.',
    } satisfies SourceReference,
  });

const EVIDENCE = Object.freeze([
  {
    key: 'inherited_positive_slot_examples',
    sourceId:
      GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_REFERENCES.yearHourPlacement.sourceId,
    provenanceTier:
      GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_REFERENCES.yearHourPlacement.provenanceTier,
    observationEstablished: true,
    daySlotInclusionAuthorized: false,
    daySlotExclusionAuthorized: false,
    exhaustiveSlotSetAuthorized: false,
    fullTransparencyPredicateAuthorized: false,
    authorityBoundary:
      'Merged #446 directly supports positive source-example use at year/hour and separately at month. The inherited set {year, month, hour} remains explicitly non-exhaustive and cannot authorize a negative inference about the day slot.',
  },
  {
    key: 'direct_generic_transparency_definition',
    sourceId:
      GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_SOURCE_REFERENCES
        .genericTransparencyDefinition.sourceId,
    provenanceTier:
      GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_SOURCE_REFERENCES
        .genericTransparencyDefinition.provenanceTier,
    observationEstablished: true,
    daySlotInclusionAuthorized: false,
    daySlotExclusionAuthorized: false,
    exhaustiveSlotSetAuthorized: false,
    fullTransparencyPredicateAuthorized: false,
    authorityBoundary:
      '透於干 is a generic layer statement, not an explicit pillar-slot enumeration. Reading it as all four slots would infer day inclusion; reading the absence of a day example as exclusion would infer a negative rule. Neither inference is admitted.',
  },
  {
    key: 'secondary_year_month_hour_explanation',
    sourceId:
      GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_SOURCE_REFERENCES
        .secondaryYearMonthHourExplanation.sourceId,
    provenanceTier:
      GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_SOURCE_REFERENCES
        .secondaryYearMonthHourExplanation.provenanceTier,
    observationEstablished: true,
    daySlotInclusionAuthorized: false,
    daySlotExclusionAuthorized: false,
    exhaustiveSlotSetAuthorized: false,
    fullTransparencyPredicateAuthorized: false,
    authorityBoundary:
      'The contemporary explanation explicitly operationalizes year/month/hour and treats day stem as reference, but its practitioner-secondary provenance is insufficient to override the unresolved direct-source boundary or authorize a production predicate.',
  },
] as const satisfies readonly GeneralNatalGejuTransparencyDaySlotAdmissionEvidence[]);

const SOURCE_IDS = Object.freeze(
  Array.from(
    new Set([
      GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_REFERENCES.yearHourPlacement.sourceId,
      GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_REFERENCES.monthPlacement.sourceId,
      ...EVIDENCE.map((item) => item.sourceId),
    ]),
  ).sort(),
);

export const GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_REVIEW_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_REVIEW_VERSION,
        sourceScope: GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_REVIEW_SCOPE,
        decision: GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_DECISION,
        upstreamTransparencyEvidenceVersion:
          GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_EVIDENCE_VERSION,
        upstreamTransparencyEvidenceDefinitionHash:
          GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_EVIDENCE_DEFINITION_HASH,
        inheritedPositiveSourceObservedSlots:
          GENERAL_NATAL_GEJU_SOURCE_OBSERVED_TRANSPARENCY_SLOTS,
        evidence: EVIDENCE,
        sourceIds: SOURCE_IDS,
        directSourceDaySlotInclusionObserved: false,
        directSourceDaySlotExclusionObserved: false,
        directSourceSlotSetExhaustivenessObserved: false,
        secondaryEvidencePromotedToPredicate: false,
        daySlotAdmissibility: 'unresolved',
        transparencySlotSetExhaustiveness: 'unresolved',
        fullTransparencyPredicateAuthorized: false,
        transparencySelectionPredicateAuthorized: false,
        candidateDerivationAuthorized: false,
        establishmentPredicateAuthorized: false,
        openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
      }),
    )
    .digest('hex');

export function buildGeneralNatalGejuTransparencyDaySlotAdmissionReview(): GeneralNatalGejuTransparencyDaySlotAdmissionReviewReport {
  const material = {
    reviewVersion: GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_REVIEW_VERSION,
    sourceScope: GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_REVIEW_SCOPE,
    decision: GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_DECISION,
    upstreamTransparencyEvidenceVersion:
      GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_EVIDENCE_VERSION,
    upstreamTransparencyEvidenceDefinitionHash:
      GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_EVIDENCE_DEFINITION_HASH,
    inheritedPositiveSourceObservedSlots:
      GENERAL_NATAL_GEJU_SOURCE_OBSERVED_TRANSPARENCY_SLOTS,
    directGenericTransparencyDefinitionObserved: true as const,
    directSourceDaySlotInclusionObserved: false as const,
    directSourceDaySlotExclusionObserved: false as const,
    directSourceSlotSetExhaustivenessObserved: false as const,
    secondaryYearMonthHourOnlyExplanationObserved: true as const,
    secondaryEvidencePromotedToPredicate: false as const,
    daySlotAdmissibility: 'unresolved' as const,
    transparencySlotSetExhaustiveness: 'unresolved' as const,
    fullTransparencyPredicateAuthorized: false as const,
    transparencySelectionPredicateAuthorized: false as const,
    candidateDerivationAuthorized: false as const,
    establishmentPredicateAuthorized: false as const,
    candidateFactsEmitted: false as const,
    establishmentFactsEmitted: false as const,
    evidence: EVIDENCE,
    sourceIds: SOURCE_IDS,
    openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
    authorityBoundary:
      'Merged #446 establishes only non-exhaustive positive transparency examples at year/month/hour. The reviewed direct source additionally defines transparency generically as a hidden stem appearing at the heavenly-stem layer but does not enumerate pillar-slot admissibility. A contemporary secondary explanation operationalizes year/month/hour and treats the day stem as reference, but secondary explanatory evidence is not promoted into the canonical production predicate. Day-slot inclusion, day-slot exclusion, and slot-set exhaustiveness therefore remain unresolved, so the full transparency selection predicate stays unauthorized.',
  };

  return Object.freeze({
    reviewId: `general_natal_geju_transparency_day_slot_admission_review_${createHash('sha256')
      .update(JSON.stringify(material))
      .digest('hex')
      .slice(0, 24)}`,
    ...material,
    notes: Object.freeze([
      'Generic 透於干 wording cannot be expanded into an all-four-pillar slot rule without explicit source support.',
      'Absence of a day-stem example cannot be converted into a negative day-slot exclusion rule.',
      'The practitioner-secondary year/month/hour explanation is recorded as contrast/corroboration only and is not a semantic promotion source.',
      'The inherited positive source-observed slots {year, month, hour} remain valid and explicitly non-exhaustive.',
      'VISIBLE_STEM_TRANSPARENCY_SELECTION_PREDICATE_AUTHORITY_MISSING remains open; no GEJU_CANDIDATE or GEJU_ESTABLISHMENT_STATE fact is emitted.',
      'General Natal production authority, P0-CM-03, NEXT_PRODUCTION_SKU, and Commerce remain blocked.',
    ]),
  });
}