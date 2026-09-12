import { createHash } from 'node:crypto';
import type { SourceReference } from '../contracts/interpretation.js';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
  type GeneralNatalGejuCandidatePredicateGap,
} from './general-natal-geju-candidate-source-frontier.js';
import { GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES } from './general-natal-geju-co-use-affinity-source-evidence.js';
import {
  GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION,
} from './general-natal-geju-source-semantic-use-identity.js';

export const GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_SCOPE =
  'ziping_zhenquan_source_use_pattern_candidate_stage_admission_review' as const;

export const GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_DECISION =
  'SOURCE_USE_AND_PATTERN_WORDING_OBSERVED_PRE_ESTABLISHMENT_CANONICAL_CANDIDATE_STAGE_NOT_DEFINED' as const;

export type GeneralNatalGejuCandidateIdentityAdmissionEvidenceKey =
  | 'source_use_selection_plurality'
  | 'source_named_pattern_wording'
  | 'source_formation_outcome_wording'
  | 'source_primary_co_pattern_wording';

export interface GeneralNatalGejuCandidateIdentityAdmissionEvidence {
  readonly key: GeneralNatalGejuCandidateIdentityAdmissionEvidenceKey;
  readonly sourceId: string;
  readonly sourceBoundaryObserved: true;
  readonly preEstablishmentCanonicalCandidateStageAuthorized: false;
  readonly authorityBoundary: string;
}

export interface GeneralNatalGejuCandidateIdentityAdmissionReviewReport {
  readonly reviewId: string;
  readonly reviewVersion: typeof GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_VERSION;
  readonly sourceScope: typeof GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_SCOPE;
  readonly decision: typeof GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_DECISION;
  readonly upstreamSemanticUseVersion: typeof GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION;
  readonly upstreamSemanticUseDefinitionHash: string;
  readonly sourceUseSelectionIdentityObserved: true;
  readonly sourceNamedPatternWordingObserved: true;
  readonly sourceFormationOutcomeWordingObserved: true;
  readonly sourcePrimaryCoPatternWordingObserved: true;
  readonly selectionEstablishmentSeparationStillRequired: true;
  readonly sourceUseToCanonicalCandidateBridgeAuthorized: false;
  readonly sourcePatternWordingToPreEstablishmentCandidateBridgeAuthorized: false;
  readonly canonicalCandidateStageDefinitionAuthorized: false;
  readonly semanticUseDeduplicationIntoCandidateAuthorized: false;
  readonly primaryCoPatternGeneralizedPrecedenceAuthorized: false;
  readonly candidateIdentityAuthorized: false;
  readonly multipleCandidateRepresentationAuthorized: false;
  readonly candidateDerivationAuthorized: false;
  readonly establishmentPredicateAuthorized: false;
  readonly candidateFactsEmitted: false;
  readonly establishmentFactsEmitted: false;
  readonly evidence: readonly GeneralNatalGejuCandidateIdentityAdmissionEvidence[];
  readonly sourceIds: readonly string[];
  readonly openPredicateGaps: readonly GeneralNatalGejuCandidatePredicateGap[];
  readonly authorityBoundary: string;
  readonly notes: readonly string[];
}

const SOURCE_COMMON = {
  sourceType: 'classical_text',
  title: '子平真詮評注',
  author: '沈孝瞻',
  editor: '徐樂吾',
  language: 'zh-Hant',
  url: 'https://ctext.org/wiki.pl?chapter=974137&if=gb',
  accessedAt: '2026-09-12',
  provenanceTier: 'cross_reference',
  rights: {
    copyrightStatus: 'unknown',
    reusePolicy: 'metadata_only',
  },
} as const;

export const GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_SOURCE_REFERENCES = Object.freeze({
  mixedQiFormationOutcome: {
    ...SOURCE_COMMON,
    sourceId: 'SRC-GEJU-ZIPING-ZHENQUAN-MIXED-QI-FORMATION-OUTCOME-WORDING',
    locator: {
      section: '論雜氣如何取用',
      anchor: '印格不成',
    },
    notes:
      'The selected mixed-qi discussion uses 格 wording inside explicit formation-outcome reasoning, including nearby 似成格矣 and the exact anchored 印格不成. This prevents treating every source 格 label as an automatically pre-establishment candidate label.',
  } satisfies SourceReference,
  useVariationPrimaryCoPattern: {
    ...SOURCE_COMMON,
    sourceId: 'SRC-GEJU-ZIPING-ZHENQUAN-USE-VARIATION-PRIMARY-CO-PATTERN-WORDING',
    locator: {
      section: '論用神變化',
      anchor: '格成正財，正官乃其兼格也',
    },
    notes:
      'The selected source directly names a formed primary pattern and a concurrent 兼格 in one exact example. This records source pattern multiplicity wording only; it does not define a generalized candidate representation or precedence algorithm.',
  } satisfies SourceReference,
});

const EVIDENCE = Object.freeze([
  {
    key: 'source_use_selection_plurality',
    sourceId: GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES.coUseRule.sourceId,
    sourceBoundaryObserved: true,
    preEstablishmentCanonicalCandidateStageAuthorized: false,
    authorityBoundary:
      '一透則一用、兼透則兼用、透而又會則透與會並用 establishes source-use selection/plurality. Merged semantic-use authority may identify exact source uses, but the source wording does not define a repository-level GEJU_CANDIDATE object between use selection and establishment judgment.',
  },
  {
    key: 'source_named_pattern_wording',
    sourceId:
      GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES.jiaChenGuiWaterAffinity.sourceId,
    sourceBoundaryObserved: true,
    preEstablishmentCanonicalCandidateStageAuthorized: false,
    authorityBoundary:
      'The exact 甲辰/癸/申子 example is named 印綬之格 and simultaneously classified 清而不雜 / 合而有情. The pattern label is therefore source-direct, but this exact wording does not independently define a pre-establishment candidate stage detached from quality/formation judgment.',
  },
  {
    key: 'source_formation_outcome_wording',
    sourceId:
      GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_SOURCE_REFERENCES.mixedQiFormationOutcome
        .sourceId,
    sourceBoundaryObserved: true,
    preEstablishmentCanonicalCandidateStageAuthorized: false,
    authorityBoundary:
      'The same mixed-qi chapter uses 似成格矣 and 印格不成 while evaluating whether a pattern forms. 格 vocabulary therefore participates directly in establishment-outcome reasoning and cannot be globally retyped as candidate identity without a separate source-backed bridge.',
  },
  {
    key: 'source_primary_co_pattern_wording',
    sourceId:
      GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_SOURCE_REFERENCES
        .useVariationPrimaryCoPattern.sourceId,
    sourceBoundaryObserved: true,
    preEstablishmentCanonicalCandidateStageAuthorized: false,
    authorityBoundary:
      '格成正財，正官乃其兼格也 directly demonstrates primary/co-pattern naming in an exact source example. Because the source says 格成 and does not publish a generalized canonical pre-formation candidate data model, this cannot authorize candidate multiplicity, ranking, or precedence across charts.',
  },
] as const satisfies readonly GeneralNatalGejuCandidateIdentityAdmissionEvidence[]);

const SOURCE_IDS = Object.freeze(
  Array.from(new Set(EVIDENCE.map((item) => item.sourceId))).sort(),
);

export const GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_VERSION,
        sourceScope: GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_SCOPE,
        decision: GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_DECISION,
        upstreamSemanticUseVersion: GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION,
        upstreamSemanticUseDefinitionHash:
          GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_DEFINITION_HASH,
        evidence: EVIDENCE,
        sourceIds: SOURCE_IDS,
        selectionEstablishmentSeparationStillRequired: true,
        sourceUseToCanonicalCandidateBridgeAuthorized: false,
        sourcePatternWordingToPreEstablishmentCandidateBridgeAuthorized: false,
        canonicalCandidateStageDefinitionAuthorized: false,
        semanticUseDeduplicationIntoCandidateAuthorized: false,
        primaryCoPatternGeneralizedPrecedenceAuthorized: false,
        candidateIdentityAuthorized: false,
        multipleCandidateRepresentationAuthorized: false,
        candidateDerivationAuthorized: false,
        establishmentPredicateAuthorized: false,
        openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
      }),
    )
    .digest('hex');

export function buildGeneralNatalGejuCandidateIdentityAdmissionReview(): GeneralNatalGejuCandidateIdentityAdmissionReviewReport {
  const material = {
    reviewVersion: GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_VERSION,
    sourceScope: GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_SCOPE,
    decision: GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_DECISION,
    upstreamSemanticUseVersion: GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION,
    upstreamSemanticUseDefinitionHash:
      GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_DEFINITION_HASH,
    sourceUseSelectionIdentityObserved: true as const,
    sourceNamedPatternWordingObserved: true as const,
    sourceFormationOutcomeWordingObserved: true as const,
    sourcePrimaryCoPatternWordingObserved: true as const,
    selectionEstablishmentSeparationStillRequired: true as const,
    sourceUseToCanonicalCandidateBridgeAuthorized: false as const,
    sourcePatternWordingToPreEstablishmentCandidateBridgeAuthorized: false as const,
    canonicalCandidateStageDefinitionAuthorized: false as const,
    semanticUseDeduplicationIntoCandidateAuthorized: false as const,
    primaryCoPatternGeneralizedPrecedenceAuthorized: false as const,
    candidateIdentityAuthorized: false as const,
    multipleCandidateRepresentationAuthorized: false as const,
    candidateDerivationAuthorized: false as const,
    establishmentPredicateAuthorized: false as const,
    candidateFactsEmitted: false as const,
    establishmentFactsEmitted: false as const,
    evidence: EVIDENCE,
    sourceIds: SOURCE_IDS,
    openPredicateGaps: GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
    authorityBoundary:
      'Merged source-semantic-use identity authority establishes exact source-named uses, not a canonical GEJU_CANDIDATE stage. The selected source also uses 格/局 wording in contexts that include 清/雜, 有情/無情, 格成, apparent formation, and non-formation, while separately showing an exact formed primary 格 plus 兼格. The source therefore proves that use identity, pattern naming, multiplicity wording, and establishment outcome are related but does not publish the repository-required pre-establishment candidate identity/representation contract. Promoting source-use IDs or source pattern words into GEJU_CANDIDATE would invent the missing bridge and risk collapsing candidate and establishment stages.',
  };

  return Object.freeze({
    reviewId: `general_natal_geju_candidate_identity_admission_review_${createHash('sha256')
      .update(JSON.stringify(material))
      .digest('hex')
      .slice(0, 24)}`,
    ...material,
    notes: Object.freeze([
      'The merged #469 semantic-use identities remain valid research observations and are not downgraded by this review.',
      'Source directness for 用, 格, 局, 格成, 不成, and 兼格 does not by itself define where a canonical pre-establishment GEJU_CANDIDATE object begins or ends.',
      'The exact primary/兼格 example is evidence that source pattern multiplicity exists, but it is not generalized into array order, rank, precedence, strength, or winner semantics.',
      'No source-use semantic deduplication result is promoted into candidate deduplication. Same-use signals remain only same-use observations.',
      'All five coarse Gyeokguk authority gaps remain open; General Natal production authority, P0-CM-03, and Commerce remain blocked.',
    ]),
  });
}
