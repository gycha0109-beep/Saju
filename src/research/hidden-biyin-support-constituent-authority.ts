import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCE_AUTHORITY } from './snapshot-bound-hidden-stem-ten-god-occurrences.js';
import {
  buildSharedNatalHiddenStemTenGodOccurrenceResearchEvidence,
  validateSharedNatalHiddenStemTenGodOccurrenceResearchEvidence,
  SHARED_NATAL_HIDDEN_STEM_TEN_GOD_OCCURRENCE_RESEARCH_EVIDENCE_DEFINITION,
} from './shared-natal-hidden-stem-ten-god-occurrence-research-evidence-adapter.js';
import { GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY } from './general-natal-canonical-gyeopjae-bijie-category-member-authority.js';
import { GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_AUTHORITY } from './general-natal-canonical-yin-yinshou-category-member-authority.js';
import { GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_AUTHORITY } from './general-natal-dang-zhong-zhu-gua-context-observation-authority.js';

// R30 explicitly admits this derived occurrence scope. These labels consume
// R27's mapping; they are not another Ten-God calculation or visible-scope scan.
const admittedLabels = Object.freeze({
  비견: Object.freeze({ sourceMemberLabel: '比肩', sourceSupportCategory: '比劫' }),
  겁재: Object.freeze({ sourceMemberLabel: '劫財', sourceSupportCategory: '比劫' }),
  정인: Object.freeze({ sourceMemberLabel: '正印', sourceSupportCategory: '印綬' }),
  편인: Object.freeze({ sourceMemberLabel: '偏印', sourceSupportCategory: '印綬' }),
} as const);
const definition = Object.freeze({
  primitiveId: 'HIDDEN_BIYIN_SUPPORT_CONSTITUENT_COLLECTION',
  version: '0.1.0-research',
  decision: 'AUTHORIZED_RESEARCH_ONLY',
  semanticScope: 'four_branch_hidden_occurrence_symbolic_constituents_only',
  source: Object.freeze({
    title: '子平真詮 / 子平真詮評註',
    section: '論十幹得時不旺失時不弱',
    url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
    accessedAt: '2026-10-07',
  }),
  sourceBasis: Object.freeze([
    '比劫印綬通根扶助為黨眾',
    '若比印重疊，年日時支，又通根比印',
    '年月日時，亦有損益之權',
  ]),
  scopeAdoption:
    'Project-adopted research interpretation of branch 比印 context: already mapped hidden 比肩/劫財/正印/偏印 occurrences may enter a symbolic constituent inventory. This is a new R30 scope admission, not automatic mapping, manifestation, usable support, root or classifier authority.',
  admittedLabels,
  upstreamOccurrenceAuthorityHash:
    SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCE_AUTHORITY.definitionHash,
  upstreamEvidenceDefinitionHash: deterministicContentHash(
    SHARED_NATAL_HIDDEN_STEM_TEN_GOD_OCCURRENCE_RESEARCH_EVIDENCE_DEFINITION,
  ),
  categoryAuthorityHashes: Object.freeze([
    GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY.definitionHash,
    GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_AUTHORITY.definitionHash,
  ]),
  categorySources: Object.freeze([
    GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY.source.url,
    GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_AUTHORITY.source.url,
  ]),
  categorySourceAccessDates: Object.freeze([
    GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY.source.accessedAt,
    GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_AUTHORITY.source.accessedAt,
  ]),
  supportContextAuthorityHash:
    GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_AUTHORITY.definitionHash,
  hiddenSymbolicConstituentAdmissionAuthorized: true,
  hiddenTenGodRecalculationAuthorized: false,
  visibleScopeExtensionAuthorized: false,
  representativeBranchAdditionAuthorized: false,
  hiddenManifestationAuthorized: false,
  usableSupportEffectAuthorized: false,
  tonggenDerivationAuthorized: false,
  completeEffectiveSupportCollectionAuthorized: false,
  supportCountOrWeightAuthorized: false,
  hiddenPlusRootAggregationAuthorized: false,
  supportCompositionAuthorized: false,
  r29FrontierInclusionAuthorized: false,
  dangZhongZhuGuaSettlementAuthorized: false,
  qiangRuoWangShuaiClassificationAuthorized: false,
  gyeokgukDerivationAuthorized: false,
  narrativeMaterialityAuthorized: false,
  productionAuthorityAuthorized: false,
} as const);
export const HIDDEN_BIYIN_SUPPORT_CONSTITUENT_AUTHORITY = Object.freeze({
  ...definition,
  definitionHash: deterministicContentHash(definition),
});

export function collectHiddenBiyinSupportConstituents(snapshot: CanonicalSajuSnapshot) {
  const upstream = buildSharedNatalHiddenStemTenGodOccurrenceResearchEvidence(snapshot);
  if (upstream.status !== 'resolved') return upstream;
  if (
    !validateSharedNatalHiddenStemTenGodOccurrenceResearchEvidence(upstream.envelope, snapshot)
      .valid
  ) {
    return {
      status: 'unavailable',
      reasonCode: 'hidden-biyin-upstream-replay-unresolved',
    } as const;
  }
  const occurrences = upstream.envelope.payload.occurrences.map((occurrence) => {
    const label = Object.hasOwn(admittedLabels, occurrence.tenGod)
      ? admittedLabels[occurrence.tenGod as keyof typeof admittedLabels]
      : null;
    return {
      ...occurrence,
      state: label
        ? ('symbolic_support_constituent_observed' as const)
        : ('outside_admitted_support_label_scope' as const),
      sourceMemberLabel: label?.sourceMemberLabel ?? null,
      sourceSupportCategory: label?.sourceSupportCategory ?? null,
      supportConstituentObserved: label !== null,
      effectDisposition: 'not_determined' as const,
      rootDisposition: 'not_determined' as const,
    };
  });
  return {
    status: 'resolved',
    projection: {
      snapshotId: snapshot.snapshotId,
      snapshotHash: snapshot.calculationHash,
      upstreamEvidence: {
        envelopeId: upstream.envelope.envelopeId,
        definitionRef: upstream.envelope.definitionRef,
        evidenceType: upstream.envelope.evidenceType,
        evidenceVersion: upstream.envelope.evidenceVersion,
        payloadHash: upstream.envelope.payloadHash,
      },
      occurrences,
      supportConstituentObserved: occurrences.some(
        (occurrence) => occurrence.supportConstituentObserved,
      ),
      coverage: {
        branchSlots: ['year', 'month', 'day', 'hour'],
        identity: 'pillar_slot_and_hidden_stem',
        visibleDaySelfIncluded: false,
        representativeBranchAdded: false,
        effectiveSupportComplete: false,
      },
      constraints: HIDDEN_BIYIN_SUPPORT_CONSTITUENT_AUTHORITY,
    },
  } as const;
}
