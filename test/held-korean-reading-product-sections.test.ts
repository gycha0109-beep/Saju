import { describe, expect, it } from 'vitest';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  buildCanonicalReadingSemanticBundleV1,
} from '../src/reading/canonical-reading-semantics.js';
import {
  GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
  type GovernedReadingEvidenceBundleV1,
} from '../src/reading/governed-reading-evidence.js';
import {
  projectHeldKoreanReadingProductSectionsV1,
} from '../src/reading/held-korean-reading-product-sections.js';
import {
  renderReadingOnDemandV1,
  READING_LOCALIZATION_CONTRACT_VERSION_V1,
  type ReadingLocalizationRendererV1,
} from '../src/reading/reading-localization.js';

const HEADLINE = '확인된 직업 맥락';
const SUMMARY = '이 명식에서 확인된 구조적 특성만 설명합니다.';
const SCOPE = '직업의 시기와 결과를 확정하지 않습니다.';
const REQUEST_SCOPE = 'subject-A:birth-revision-A:request-A';
const renderer: ReadingLocalizationRendererV1 = {
  locale: 'ko-KR',
  rendererVersion: 'source-korean-v1',
  glossaryVersion: 'source-text-v1',
  render({ plan }) {
    return plan.primaryUnits.map(unit => ({
      claimId: unit.claimId,
      unitId: unit.unitId,
      text: HEADLINE + '\n' + SUMMARY,
      qualifiers: unit.qualifierIds.map(qualifierId => ({
        qualifierId, text: SCOPE,
      })),
    }));
  },
};

function interpretationClaim(headline = HEADLINE): InterpretationClaim {
  return {
    claimId: 'claim-career-exact',
    schemaVersion: 'test',
    snapshotId: 'snapshot-career-1',
    taxonomy: { tier: 'T8', category: 'career', subcategory: 'bounded_context' },
    claimType: 'CAREER_CONTEXT_BOUNDED',
    subject: 'natal_chart',
    predicate: 'career_context',
    value: {
      headline, summary: SUMMARY,
      predictsEmploymentAuthorized: false,
    },
    methodologyRef: { id: 'method-career', version: '1' },
    ruleRefs: [{ ruleId: 'rule-career', version: '1', evaluationId: 'eval-career' }],
    factRefs: ['derivedFacts.tenGods'],
    upstreamClaimRefs: [],
    sourceRefs: ['source-career'],
    state: 'active',
  };
}

function fixture(headline = HEADLINE) {
  const evidence: GovernedReadingEvidenceBundleV1 = {
    requestId: 'question-scope-A',
    purpose: 'section_reading',
    snapshotId: 'snapshot-career-1',
    interpretationRunId: 'interpretation-career-1',
    registrySnapshotId: 'registry-career-1',
    canonicalFacts: [],
    claims: [interpretationClaim(headline)],
    claimRelations: [],
    schemaVersion: GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
    constraints: {
      mayRecalculate: false,
      mayInventRules: false,
      mustPreserveMethodDifferences: true,
      mustDiscloseMaterialAmbiguity: true,
    },
  };
  return buildCanonicalReadingSemanticBundleV1({
    intent: { domain: 'career', temporalScope: 'natal' },
    evidence,
    targetClaimIds: ['claim-career-exact'],
    semanticQualifierBindings: [{
      targetClaimId: 'claim-career-exact',
      qualifier: {
        qualifierId: 'qualifier-no-future-events',
        kind: 'boundary',
        semanticScope: 'career:natal',
        semanticKeys: ['career_context'],
        canonicalText: { summary: SCOPE },
        prohibitedExtensions: ['predictsEmploymentAuthorized'],
        provenance: {
          admissionId: 'admission-career-research',
          admissionRegistryVersion: '1',
          researchId: 'research-career',
          researchVersion: '1',
          authorityState: 'research',
        },
      },
    }],
  });
}

describe('E-3 held Korean source-exact Product Reading sections', () => {
  it('shows exactly the existing Korean T8 content and every scope qualifier as preview-only Reading blocks', async () => {
    const semantics = fixture();
    const localized = await renderReadingOnDemandV1(
      semantics, { readingLocale: 'ko-KR' }, REQUEST_SCOPE, renderer,
    );
    const view = projectHeldKoreanReadingProductSectionsV1({
      semantics, localized, authorizedRequestScopeKey: REQUEST_SCOPE,
      rendererPolicy: renderer,
    });
    expect(view).toMatchObject({
      version: 'myeonghwa-held-ko-product-reading-sections-v1',
      state: 'internal_preview_only',
      canPersist: false, canDisclose: false, canPublish: false, canSell: false,
      sections: [{
        sectionType: 'career', title: '직업운', state: 'partial',
        blocks: [{ type: 'paragraph', text: HEADLINE + '\n' + SUMMARY }],
      }],
      disclosures: [{ type: 'scope_limitation', text: SCOPE }],
    });
    expect(view.disclosures).toHaveLength(2);
    const shown = JSON.stringify(view);
    for (const forbidden of [
      'claim-career-exact', 'rule-career', 'method-career', 'source-career',
      REQUEST_SCOPE, localized.cacheKey, localized.semanticHash,
    ]) expect(shown).not.toContain(forbidden);
    expect(Object.isFrozen(view.sections)).toBe(true);
    expect(Object.isFrozen(view.disclosures)).toBe(true);
    expect('reading' in view).toBe(false);
    expect('responseId' in view).toBe(false);
  });

  it('blocks another subject/revision, locale or a modified display body even with rehashed content', async () => {
    const semantics = fixture();
    const localized = await renderReadingOnDemandV1(
      semantics, { readingLocale: 'ko-KR' }, REQUEST_SCOPE, renderer,
    );
    expect(() => projectHeldKoreanReadingProductSectionsV1({
      semantics, localized, authorizedRequestScopeKey: 'different-subject:revision',
      rendererPolicy: renderer,
    })).toThrow();
    expect(() => projectHeldKoreanReadingProductSectionsV1({
      semantics, localized, authorizedRequestScopeKey: REQUEST_SCOPE,
      rendererPolicy: { ...renderer, locale: 'ja-JP' },
    })).toThrow();
    const modifiedUnits = localized.units.map(unit => ({
      ...unit, text: '원문이 아닌 임의 전망',
    }));
    const modified = {
      ...localized,
      units: modifiedUnits,
      contentHash: deterministicContentHash({
        contractVersion: READING_LOCALIZATION_CONTRACT_VERSION_V1,
        cacheKey: localized.cacheKey,
        units: modifiedUnits,
      }),
    };
    expect(() => projectHeldKoreanReadingProductSectionsV1({
      semantics, localized: modified, authorizedRequestScopeKey: REQUEST_SCOPE,
      rendererPolicy: renderer,
    })).toThrow('cannot replace an original source-owned Claim');
  });

  it('rejects dropped mandatory qualifiers and explicit internal source IDs in rendered copy', async () => {
    const semantics = fixture();
    const localized = await renderReadingOnDemandV1(
      semantics, { readingLocale: 'ko-KR' }, REQUEST_SCOPE, renderer,
    );
    const missing = localized.units.map(unit => ({ ...unit, qualifiers: [] }));
    expect(() => projectHeldKoreanReadingProductSectionsV1({
      semantics,
      localized: {
        ...localized,
        units: missing,
        contentHash: deterministicContentHash({
          contractVersion: localized.contractVersion,
          cacheKey: localized.cacheKey, units: missing,
        }),
      },
      authorizedRequestScopeKey: REQUEST_SCOPE, rendererPolicy: renderer,
    })).toThrow('original source-owned Claim');

    const leakingSemantics = fixture('source-career');
    const leakingLocalized = await renderReadingOnDemandV1(
      leakingSemantics, { readingLocale: 'ko-KR' }, REQUEST_SCOPE, {
        ...renderer,
        render({ plan }) {
          return plan.primaryUnits.map(unit => ({
            unitId: unit.unitId, claimId: unit.claimId,
            text: 'source-career\n' + SUMMARY,
            qualifiers: unit.qualifierIds.map(qualifierId => ({ qualifierId, text: SCOPE })),
          }));
        },
      },
    );
    expect(() => projectHeldKoreanReadingProductSectionsV1({
      semantics: leakingSemantics, localized: leakingLocalized,
      authorizedRequestScopeKey: REQUEST_SCOPE, rendererPolicy: renderer,
    })).toThrow('internal Claim/Rule/Source identifier');
  });
});
