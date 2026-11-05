import type { ReadingDomain } from '../contracts/reading.js';
import {
  KOREAN_SOURCE_BOUND_READING_RENDERER_V1,
  renderExistingKoreanReadingOnDemandV1,
} from './korean-source-bound-reading-renderer.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  type CanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticTextV1,
} from './canonical-reading-semantics.js';
import type {
  ProductReadingResponseDisclosure,
  ProductReadingResponseSection,
} from './product-reading-response.js';
import {
  planReadingLocalizationV1,
  READING_LOCALIZATION_CONTRACT_VERSION_V1,
  type LocalizedReadingInternalV1,
  type ReadingLocalizationRendererV1,
} from './reading-localization.js';

export const HELD_KOREAN_READING_PRODUCT_SECTIONS_VERSION_V1 =
  'myeonghwa-held-ko-product-reading-sections-v1' as const;

const TITLES = {
  general: { title: '전체 사주', sectionType: 'overview' },
  family: { title: '가족운', sectionType: 'relationship' },
  relationship: { title: '관계운', sectionType: 'relationship' },
  compatibility: { title: '궁합', sectionType: 'compatibility' },
  career: { title: '직업운', sectionType: 'career' },
  business: { title: '사업운', sectionType: 'custom' },
  wealth: { title: '재물운', sectionType: 'wealth' },
  life_stage: { title: '삶의 단계', sectionType: 'timing' },
  question_specific: { title: '질문별 풀이', sectionType: 'custom' },
} as const satisfies Record<ReadingDomain, {
  title: string;
  sectionType: ProductReadingResponseSection['sectionType'];
}>;

export type HeldKoreanReadingProductSectionsV1 = Readonly<{
  version: typeof HELD_KOREAN_READING_PRODUCT_SECTIONS_VERSION_V1;
  state: 'internal_preview_only';
  sections: readonly ProductReadingResponseSection[];
  disclosures: readonly ProductReadingResponseDisclosure[];
  /** Projection only; never a ProductReadingResponse or a delivery authorization. */
  canPersist: false;
  canDisclose: false;
  canPublish: false;
  canSell: false;
}>;

function existingCopy(text: CanonicalReadingSemanticTextV1 | undefined): string {
  const entries = [text?.headline, text?.summary].filter(
    (value): value is string => typeof value === 'string' && value.trim().length > 0,
  );
  if (entries.length === 0) {
    throw new TypeError('A source-owned Korean Claim or qualifier has no admitted text.');
  }
  return [...new Set(entries)].join('\n');
}

function assertTextDoesNotLeakProvenance(
  text: string,
  semantics: CanonicalReadingSemanticBundleV1,
): void {
  const tokens = new Set<string>();
  for (const unit of semantics.units) {
    for (const candidate of [
      unit.unitId, unit.claimId, unit.methodologyRef.id,
      ...unit.sourceRefs, ...unit.factRefs, ...unit.upstreamClaimRefs,
      ...unit.ruleRefs.map(ref => ref.ruleId),
      ...(unit.semanticQualifiers ?? []).map(q => q.qualifierId),
    ]) {
      if (typeof candidate === 'string' && candidate.length >= 8) tokens.add(candidate);
    }
  }
  if ([...tokens].some(token => text.includes(token))) {
    throw new TypeError('An internal Claim/Rule/Source identifier appeared in Korean display text.');
  }
}

/**
 * E-3 Reader projection, not a ProductReadingResponse factory. Keep the exact
 * source-qualified Korean primary Claim and EVERY mandatory source qualifier
 * while reusing the existing product Section/Disclosure display contract.
 *
 * The projection stays non-deliverable: no subject authentication, birth
 * revision, Production meaning admission, Release or Commerce is asserted.
 * An authorized caller may inspect these preview blocks; it must NOT send
 * this object to the Product Reader or Records API.
 */
export function projectHeldKoreanReadingProductSectionsV1(input: Readonly<{
  semantics: CanonicalReadingSemanticBundleV1;
  localized: LocalizedReadingInternalV1;
  /** Obtained from the server's independently authenticated request scope. */
  authorizedRequestScopeKey: string;
  /** Exact registered Korean source renderer policy, not request-controlled. */
  rendererPolicy: Pick<
    ReadingLocalizationRendererV1, 'locale' | 'rendererVersion' | 'glossaryVersion'
  >;
}>): HeldKoreanReadingProductSectionsV1 {
  const { semantics, localized, authorizedRequestScopeKey, rendererPolicy } = input;
  const plan = planReadingLocalizationV1(
    semantics, { readingLocale: 'ko-KR' }, authorizedRequestScopeKey, rendererPolicy,
  );
  if (localized.contractVersion !== READING_LOCALIZATION_CONTRACT_VERSION_V1
    || localized.state !== 'internal_preview_only'
    || localized.locale !== 'ko-KR'
    || localized.semanticHash !== semantics.semanticHash
    || localized.cacheKey !== plan.cacheKey
    || localized.constraints.mayRecalculate !== false
    || localized.constraints.mayGenerateClaims !== false
    || localized.constraints.mayDropRequiredQualifiers !== false
    || localized.constraints.mayPromoteResearchAuthority !== false
    || localized.constraints.mayFallbackToAnotherLocale !== false
    || localized.constraints.mayExposeInternalIdsToConsumers !== false
    || localized.constraints.mayTreatStructuralChecksAsSemanticReview !== false
    || !Array.isArray(localized.units)
    || localized.units.length === 0
    || localized.units.length !== plan.primaryUnits.length
    || localized.contentHash !== deterministicContentHash({
      contractVersion: plan.contractVersion,
      cacheKey: plan.cacheKey,
      units: localized.units,
    })) {
    throw new TypeError('Korean preview content is not bound to the requested semantic scope.');
  }

  const title = TITLES[semantics.intent.domain];
  const sourceUnits = new Map(semantics.units.map(unit => [unit.claimId, unit]));
  const sections: ProductReadingResponseSection[] = [];
  const disclosures: ProductReadingResponseDisclosure[] = [];
  for (let i = 0; i < plan.primaryUnits.length; i += 1) {
    const primary = plan.primaryUnits[i]!;
    const content = localized.units[i]!;
    const original = sourceUnits.get(primary.claimId);
    if (original === undefined || original.role !== 'primary'
      || original.scenarioRef !== undefined
      || original.unitId !== primary.unitId
      || original.claimId !== content.claimId
      || content.unitId !== primary.unitId
      || original.ruleRefs.length === 0
      || original.sourceRefs.length === 0
      || original.methodologyRef.id.trim().length === 0
      || content.text !== existingCopy(original.canonicalText)
      || content.qualifiers.length !== (original.semanticQualifiers ?? []).length) {
      throw new TypeError('Korean preview cannot replace an original source-owned Claim.');
    }
    assertTextDoesNotLeakProvenance(content.text, semantics);
    const originalQualifiers = original.semanticQualifiers ?? [];
    for (let j = 0; j < originalQualifiers.length; j += 1) {
      const qualifier = originalQualifiers[j]!;
      const result = content.qualifiers[j]!;
      if (result.qualifierId !== qualifier.qualifierId
        || result.text !== existingCopy(qualifier.canonicalText)) {
        throw new TypeError('Korean preview cannot replace or drop a source-owned qualifier.');
      }
      assertTextDoesNotLeakProvenance(result.text, semantics);
      disclosures.push(Object.freeze({
        type: 'scope_limitation' as const,
        text: result.text,
      }));
    }
    sections.push(Object.freeze({
      sectionType: title.sectionType,
      title: title.title,
      state: 'partial' as const,
      blocks: Object.freeze([{ type: 'paragraph' as const, text: content.text }]),
    }));
  }

  disclosures.push(Object.freeze({
    type: 'scope_limitation' as const,
    text: '이 풀이는 내부 연구 미리보기이며 공식 공개·저장·판매용 Reading이 아닙니다.',
  }));
  return Object.freeze({
    version: HELD_KOREAN_READING_PRODUCT_SECTIONS_VERSION_V1,
    state: 'internal_preview_only' as const,
    sections: Object.freeze(sections),
    disclosures: Object.freeze(disclosures),
    canPersist: false as const,
    canDisclose: false as const,
    canPublish: false as const,
    canSell: false as const,
  });
}


/**
 * E-3 server-internal Reader preparation: run the real source-owned Korean
 * renderer and project its exact sections/disclosures in a single call.
 *
 * The caller must first independently authenticate subject, birth revision
 * and request scope. This is NOT a ProductReadingResponse, a DB Reading, or
 * an authorization to send preview copy to a user/Reader/Records endpoint.
 * Public Reader delivery must continue through separately admitted Official
 * ProductReadingResponse and MyeongHa's existing DB/Grant authorization.
 */
export async function renderHeldKoreanReadingProductSectionsOnDemandV1(
  semantics: CanonicalReadingSemanticBundleV1,
  authorizedRequestScopeKey: string,
): Promise<HeldKoreanReadingProductSectionsV1> {
  const localized = await renderExistingKoreanReadingOnDemandV1(
    semantics, authorizedRequestScopeKey,
  );
  return projectHeldKoreanReadingProductSectionsV1({
    semantics,
    localized,
    authorizedRequestScopeKey,
    rendererPolicy: KOREAN_SOURCE_BOUND_READING_RENDERER_V1,
  });
}
