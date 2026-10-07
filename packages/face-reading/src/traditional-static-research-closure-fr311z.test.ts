import { describe, expect, it } from 'vitest';
import {
  FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT,
} from './traditional-expanded-static-observation-gap-audit-fr311v.js';
import {
  FR311W_TARGET_CONSTRUCT_RESEARCH,
} from './traditional-neutral-observation-construct-research-fr311w.js';
import {
  FR311X_REGION_MAP_TARGET_RESOLUTIONS,
} from './traditional-lineage-pinned-region-map-research-fr311x.js';
import {
  FR311Y_CAPTURE_PROTOCOLS,
} from './traditional-capture-scope-protocol-research-fr311y.js';
import {
  FR311Z_AUTHORITY_BOUNDARY,
  FR311Z_RESEARCH_CLOSURE_SUMMARY,
  FR311Z_STATIC_RESEARCH_CLOSURE,
  assertStaticResearchClosureFR311Z,
} from './traditional-static-research-closure-fr311z.js';

describe('FR311Z expanded static research closure gate', () => {
  it('closes all 46 expanded static research targets exactly once', () => {
    assertStaticResearchClosureFR311Z();

    expect(FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT).toHaveLength(46);
    expect(FR311W_TARGET_CONSTRUCT_RESEARCH).toHaveLength(22);
    expect(FR311X_REGION_MAP_TARGET_RESOLUTIONS).toHaveLength(17);
    expect(FR311Y_CAPTURE_PROTOCOLS).toHaveLength(4);
    expect(FR311Z_STATIC_RESEARCH_CLOSURE).toHaveLength(46);

    const ids = FR311Z_STATIC_RESEARCH_CLOSURE
      .map((item) => item.targetKind + ':' + item.targetId);
    expect(new Set(ids).size).toBe(46);
  });

  it('freezes the closure distribution and leaves zero unresolved research targets', () => {
    expect(FR311Z_RESEARCH_CLOSURE_SUMMARY).toMatchObject({
      totalExpandedStaticTargets: 46,
      totalResearchClosures: 46,
      neutralConstructResearchCompleted: 22,
      regionMapResearchCompleted: 17,
      captureProtocolResearchCompleted: 4,
      manualOnlyFinal: 1,
      semanticOnlyFinal: 2,
      unresolvedResearchTargets: 0,
      implementationCompleteTargets: 0,
      empiricalValidationStartedTargets: 0,
      automaticTraditionalBindingsAuthorized: 0,
      providerLandmarkDirectBindingsAuthorized: 0,
      thresholdsAuthorized: 0,
      populationNormsAuthorized: 0,
      productInterpretationsAuthorized: 0,
    });
  });

  it('treats source-limit preservation as a completed research conclusion, not invented geometry', () => {
    const sourceLimits = FR311Z_STATIC_RESEARCH_CLOSURE.filter(
      (item) => item.conclusion === 'source_limit_preserved',
    );

    expect(sourceLimits).toHaveLength(4);
    expect(
      sourceLimits.map((item) => item.targetId).sort(),
    ).toEqual([
      'fr311r.lower_face.chengjiang_full',
      'fr311r.lower_face.di_ge_full_bone',
      'fr311r.lower_face.xuanbi_full',
      'fr311r.lower_face.yanhan_raised',
    ].sort());

    for (const item of sourceLimits) {
      expect(item.researchComplete).toBe(true);
      expect(item.implementationComplete).toBe(false);
      expect(item.empiricalValidationStarted).toBe(false);
    }
  });

  it('keeps manual-only and semantic-only terminal states explicit', () => {
    const manual = FR311Z_STATIC_RESEARCH_CLOSURE.filter(
      (item) => item.closureLane === 'manual_only_final',
    );
    const semantic = FR311Z_STATIC_RESEARCH_CLOSURE.filter(
      (item) => item.closureLane === 'semantic_only_final',
    );

    expect(manual.map((item) => item.targetId)).toEqual([
      'fr311s.gujin632.five_element_forms',
    ]);
    expect(semantic.map((item) => item.targetId).sort()).toEqual([
      'fr311s.gujin631.five_methods',
      'fr311s.gujin632.three_masters',
    ].sort());
  });

  it('does not turn research closure into implementation or validation authority', () => {
    for (const item of FR311Z_STATIC_RESEARCH_CLOSURE) {
      expect(item.researchComplete, item.targetId).toBe(true);
      expect(item.implementationComplete, item.targetId).toBe(false);
      expect(item.empiricalValidationStarted, item.targetId).toBe(false);
      expect(item.automaticTraditionalBindingAuthorized, item.targetId)
        .toBe(false);
      expect(item.providerLandmarkDirectBindingAuthorized, item.targetId)
        .toBe(false);
      expect(item.thresholdAuthorized, item.targetId).toBe(false);
      expect(item.populationNormAuthorized, item.targetId).toBe(false);
      expect(item.productInterpretationAuthorized, item.targetId).toBe(false);
      expect(item.modernScientificFactAuthorized, item.targetId).toBe(false);
    }

    for (const [key, value] of Object.entries(FR311Z_AUTHORITY_BOUNDARY)) {
      expect(value, key).toBe(false);
    }
  });
});
