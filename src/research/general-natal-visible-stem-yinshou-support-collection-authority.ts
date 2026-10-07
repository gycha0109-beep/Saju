import type { CanonicalSajuSnapshot, TenGod } from '../contracts/calculation.js';
import type { FactState } from '../contracts/common.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_AUTHORITY } from './general-natal-canonical-yin-yinshou-category-member-authority.js';
import { GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY } from './general-natal-yinshou-dang-zhong-support-constituent-authority.js';
import {
  buildSharedNatalSingleFactYinshouSupportResearchEvidence,
  SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
  validateSharedNatalSingleFactYinshouSupportResearchEvidence,
  type SharedNatalSingleFactYinshouSupportResearchEvidencePayload,
} from './shared-natal-single-fact-yinshou-support-research-evidence-adapter.js';
import { SHARED_NATAL_SUPPLIED_SINGLE_TEN_GOD_FACT_BINDING_AUTHORITY } from './shared-natal-supplied-single-ten-god-fact-binding.js';

export const VISIBLE_STEM_YINSHOU_SUPPORT_SLOTS = Object.freeze(['year', 'month', 'hour'] as const);
export type VisibleStemYinshouSupportSlot = (typeof VISIBLE_STEM_YINSHOU_SUPPORT_SLOTS)[number];

// New fixed-domain selection authority; R9 itself remains single-fact only.
const definition = Object.freeze({
  primitiveId: 'VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION',
  version: '0.1.0-research',
  decision: 'AUTHORIZED_RESEARCH_ONLY',
  semanticScope: 'fixed_year_month_hour_visible_stem_yinshou_support_collection',
  authorityBoundary:
    'R28 authorizes only deterministic selection of every non-self visible stem slot. Each selected fact is supplied separately to unchanged R9 membership/support evidence and independently replayed. This collection policy is not inherited from R9 and does not authorize hidden support, complete support composition, count, weight, strength or Production.',
  slots: VISIBLE_STEM_YINSHOU_SUPPORT_SLOTS,
  sourceBindings: Object.freeze({
    membership: GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_AUTHORITY.definitionHash,
    support: GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY.definitionHash,
    singleFactBinding: SHARED_NATAL_SUPPLIED_SINGLE_TEN_GOD_FACT_BINDING_AUTHORITY.definitionHash,
    r9EvidenceDefinition: deterministicContentHash(
      SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
    ),
  }),
  fixedVisibleSlotSelectionAuthorized: true,
  governedR9ResultRequiredForEverySlot: true,
  slotIdentityPreserved: true,
  daySelfIncluded: false,
  partialCollectionAuthorized: false,
  positionWeightAuthorized: false,
  canonicalTenGodRecomputationAuthorized: false,
  branchTenGodScanAuthorized: false,
  hiddenStemScanAuthorized: false,
  wholeChartCollectionComplete: false,
  yinshouCountAuthorized: false,
  supportWeightAuthorized: false,
  bijieYinshouAggregationAuthorized: false,
  tonggenCompositionAuthorized: false,
  dangZhongZhuGuaSettlementAuthorized: false,
  strengthClassificationAuthorized: false,
  gyeokgukDerivationAuthorized: false,
  narrativeMaterialityAuthorized: false,
  productionAuthorityAuthorized: false,
} as const);

export const VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_AUTHORITY = Object.freeze({
  ...definition,
  definitionHash: deterministicContentHash(definition),
});

export interface VisibleStemYinshouSupportSlotObservation {
  readonly slot: VisibleStemYinshouSupportSlot;
  readonly governedSingleFact: SharedNatalSingleFactYinshouSupportResearchEvidencePayload;
}

export type VisibleStemYinshouSupportCollectionResult =
  | { readonly status: 'unavailable'; readonly reasonCode: string }
  | {
      readonly status: 'resolved';
      readonly projection: {
        readonly snapshotId: string;
        readonly snapshotHash: string;
        readonly slots: Readonly<
          Record<VisibleStemYinshouSupportSlot, VisibleStemYinshouSupportSlotObservation>
        >;
        readonly constraints: typeof VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_AUTHORITY;
      };
    };

export function collectVisibleStemYinshouSupport(
  snapshot: CanonicalSajuSnapshot,
): VisibleStemYinshouSupportCollectionResult {
  const fail = (reasonCode: string) => ({ status: 'unavailable' as const, reasonCode });
  if (!snapshot.snapshotId || !snapshot.calculationHash)
    return fail('yinshou-collection-snapshot-binding-missing');
  if (snapshot.scenarios.length > 0)
    return fail('yinshou-collection-scenario-materialization-required');
  const tenGods = snapshot.derivedFacts.tenGods;
  if (tenGods.status !== 'resolved') return fail('yinshou-collection-ten-god-chart-unresolved');
  if (tenGods.value.day?.stem?.status !== 'resolved' || tenGods.value.day.stem.value !== '일간') {
    return fail('yinshou-collection-day-self-semantic-mismatch');
  }

  const observations: VisibleStemYinshouSupportSlotObservation[] = [];
  for (const slot of VISIBLE_STEM_YINSHOU_SUPPORT_SLOTS) {
    const fact = tenGods.value[slot]?.stem;
    if (fact?.status !== 'resolved' || fact.value === '일간')
      return fail('yinshou-collection-visible-slot-unresolved');
    const sourceFactRef = `derivedFacts.tenGods.${slot}.stem` as const;
    const result = buildSharedNatalSingleFactYinshouSupportResearchEvidence(snapshot, {
      sourceFactRef,
      fact: fact as FactState<TenGod>,
    });
    if (result.status !== 'resolved') return fail(result.reasonCode);
    const payload = result.envelope.payload;
    if (
      !validateSharedNatalSingleFactYinshouSupportResearchEvidence(result.envelope, snapshot)
        .valid ||
      payload.sourceFactRef !== sourceFactRef ||
      deterministicContentHash(payload.boundCanonicalFact) !== deterministicContentHash(fact)
    )
      return fail('yinshou-collection-upstream-slot-parity-unresolved');
    observations.push(Object.freeze({ slot, governedSingleFact: payload }));
  }
  const [year, month, hour] = observations;
  return {
    status: 'resolved',
    projection: Object.freeze({
      snapshotId: snapshot.snapshotId,
      snapshotHash: snapshot.calculationHash,
      slots: Object.freeze({ year: year!, month: month!, hour: hour! }),
      constraints: VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_AUTHORITY,
    }),
  };
}
