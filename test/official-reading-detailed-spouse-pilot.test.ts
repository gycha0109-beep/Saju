import { describe, expect, it } from 'vitest';

import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import {
  createProductionSpouseOfficialReadingDeliveryExecutionOptionsV1,
} from '../src/production/production-spouse-official-reading-host.js';
import {
  PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY,
} from '../src/production/production-spouse-official-reading-delivery-authority.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
  runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution,
} from '../src/research/relationship-spouse-t8-day-branch-palace-project-governed-narrative-materialization.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';
import { executeProductReading } from '../src/reading/governed-reading-execution.js';
import {
  RELATIONSHIP_SPOUSE_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
} from '../src/reading/official-reading-detailed-presentation-spouse.js';
import {
  assessApprovedOfficialReadingDetailedCoverageV1,
  buildApprovedOfficialReadingDetailedReadinessV1,
} from '../src/reading/official-reading-detailed-presentation-registry.js';
import {
  buildApprovedOfficialReadingDetailedRealizationV1,
} from '../src/reading/official-reading-detailed-realization.js';

const NOW = new Date('2026-10-07T11:55:00.000Z');

async function execute(preferredDetail: 'standard' | 'detailed') {
  const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    { now: NOW },
  ).snapshot;

  const interpretation =
    await runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution(
      snapshot,
      {
        requestId: 'sa7c-spouse-detailed-pilot',
        now: NOW,
      },
    );

  return executeProductReading(
    snapshot,
    interpretation,
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
    {
      requestId: 'sa7c-spouse-detailed-pilot',
      text: '배우자운',
      outputPreferences: { preferredDetail },
    },
    createProductionSpouseOfficialReadingDeliveryExecutionOptionsV1(NOW),
  );
}

describe('SA-7C spouse position-only detailed Official Reading pilot', () => {
  it('registers exactly one spouse profile with clarification and boundary only', () => {
    expect(
      RELATIONSHIP_SPOUSE_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
    ).toHaveLength(1);

    const profile =
      RELATIONSHIP_SPOUSE_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1[0];
    expect(profile?.owner).toBe('relationship:natal:spouse');
    expect(profile?.scenarioPolicy).toBe('none');
    expect(profile?.contradictionPolicy).toBe('none');
    expect(
      Object.entries(profile?.approvedTextByRole ?? {})
        .filter(([, value]) => typeof value === 'string' && value.trim().length > 0)
        .map(([role]) => role)
        .sort(),
    ).toEqual(['boundary', 'clarification']);
  });

  it('is fully ready only against the exact current spouse canonical presentation', async () => {
    const execution = await execute('detailed');
    expect(execution.canonicalSemantics).toBeDefined();
    expect(execution.officialReadingPlan).toBeDefined();
    if (
      execution.canonicalSemantics === undefined ||
      execution.officialReadingPlan === undefined
    ) {
      throw new Error('SA-7C expected canonical spouse Official Reading inputs.');
    }

    const coverage = assessApprovedOfficialReadingDetailedCoverageV1(
      execution.canonicalSemantics,
      execution.officialReadingPlan,
    );
    const readiness = buildApprovedOfficialReadingDetailedReadinessV1(
      execution.canonicalSemantics,
      execution.officialReadingPlan,
    );
    const realization = buildApprovedOfficialReadingDetailedRealizationV1(
      execution.canonicalSemantics,
      execution.officialReadingPlan,
    );

    expect(coverage).toEqual({
      domainKey: 'relationship:natal:spouse',
      state: 'ready',
      requiredMaterialCount: 2,
      approvedMaterialCount: 2,
      missingTargetCount: 0,
      staleTargetCount: 0,
    });
    expect(readiness?.state).toBe('ready');
    expect(readiness?.missingTargets).toEqual([]);
    expect(readiness?.staleTargets).toEqual([]);
    expect(realization?.units).toHaveLength(1);
    expect(realization?.units[0]?.roleTexts.map((item) => item.role)).toEqual([
      'clarification',
      'boundary',
    ]);
  });

  it('renders detailed as presentation-only expansion with identical canonical semantics and zero model calls', async () => {
    const standard = await execute('standard');
    const detailed = await execute('detailed');

    expect(standard.modelCalls).toBe(0);
    expect(detailed.modelCalls).toBe(0);
    expect(standard.narrative).toBeUndefined();
    expect(detailed.narrative).toBeUndefined();
    expect(detailed.consumerReadingAuthority?.authority).toBe('official_reading');
    expect(
      PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY.maximumSpouseModelCalls,
    ).toBe(0);

    expect(standard.canonicalSemantics?.semanticHash).toBe(
      detailed.canonicalSemantics?.semanticHash,
    );
    expect(standard.officialReadingPlan?.planHash).toBe(
      detailed.officialReadingPlan?.planHash,
    );
    expect(standard.officialReadingPlan).toEqual(detailed.officialReadingPlan);

    expect(standard.officialReadingReport).toBeDefined();
    expect(detailed.officialReadingReport).toBeDefined();
    if (
      standard.officialReadingReport === undefined ||
      detailed.officialReadingReport === undefined
    ) {
      throw new Error('SA-7C expected standard and detailed Official Reading reports.');
    }

    expect(detailed.officialReadingReport.detailPreferenceResolution).toEqual({
      requestedDetail: 'detailed',
      resolvedDetail: 'detailed',
      resolution: 'exact',
    });
    expect(detailed.officialReadingReport.sourceSemanticHash).toBe(
      standard.officialReadingReport.sourceSemanticHash,
    );
    expect(detailed.officialReadingReport.sourcePlanHash).toBe(
      standard.officialReadingReport.sourcePlanHash,
    );
    expect(detailed.officialReadingReport.disclosures).toEqual(
      standard.officialReadingReport.disclosures,
    );
    expect(detailed.officialReadingReport.explainability).toEqual(
      standard.officialReadingReport.explainability,
    );
    expect(
      detailed.officialReadingReport.sections.map((section) => section.sectionId),
    ).toEqual(
      standard.officialReadingReport.sections.map((section) => section.sectionId),
    );
    expect(JSON.stringify(detailed.officialReadingReport.sections).length).toBeGreaterThan(
      JSON.stringify(standard.officialReadingReport.sections).length,
    );
  });

  it('keeps every existing prohibited spouse expansion phrase out of detailed user-facing output', async () => {
    const detailed = await execute('detailed');
    expect(detailed.artifact).toBeDefined();
    const serialized = JSON.stringify(detailed.artifact);

    for (const phrase of RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES) {
      expect(serialized).not.toContain(phrase);
    }
  });

  it('falls the whole response back to standard when the spouse source presentation becomes stale', async () => {
    const execution = await execute('detailed');
    if (
      execution.canonicalSemantics === undefined ||
      execution.officialReadingPlan === undefined
    ) {
      throw new Error('SA-7C expected canonical spouse Official Reading inputs.');
    }

    const unit = execution.canonicalSemantics.units.find(
      (candidate) => candidate.role === 'primary',
    );
    if (unit === undefined || unit.canonicalText === undefined) {
      throw new Error('SA-7C expected one visible spouse primary unit.');
    }

    const changed = {
      ...execution.canonicalSemantics,
      units: execution.canonicalSemantics.units.map((candidate) =>
        candidate.unitId === unit.unitId
          ? {
              ...candidate,
              canonicalText: {
                ...candidate.canonicalText,
                summary: '승인된 배우자 position-only 표준 문구와 다른 변경 문구입니다.',
              },
            }
          : candidate,
      ),
    };

    const coverage = assessApprovedOfficialReadingDetailedCoverageV1(
      changed,
      execution.officialReadingPlan,
    );
    const readiness = buildApprovedOfficialReadingDetailedReadinessV1(
      changed,
      execution.officialReadingPlan,
    );

    expect(coverage.domainKey).toBe('relationship:natal:spouse');
    expect(coverage.state).toBe('incomplete');
    expect(coverage.approvedMaterialCount).toBe(0);
    expect(coverage.missingTargetCount).toBe(0);
    expect(coverage.staleTargetCount).toBe(2);
    expect(readiness?.state).toBe('fallback_to_standard');
  });
});
