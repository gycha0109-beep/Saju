import { describe, expect, test } from 'vitest';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  FiveElement,
  HeavenlyStem,
  PillarFact,
  YinYang,
} from '../src/contracts/calculation.js';
import { createResearchEvidenceRuntimeRegistry } from '../src/interpretation/research-evidence-runtime.js';
import { createResearchEvidenceEnvelope } from '../src/interpretation/research-evidence.js';
import { evaluateBoundedSizhuFourYangLuRootPresenceEvidence } from '../src/research/general-natal-bounded-sizhu-four-yang-lu-root-presence-authority.js';
import {
  buildSharedNatalBoundedRootResearchEvidence,
  SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_BOUNDARY,
  SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_DEFINITION,
  SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
  validateSharedNatalBoundedRootResearchEvidence,
} from '../src/research/shared-natal-bounded-root-research-evidence-adapter.js';

const STEM_META: Readonly<
  Record<HeavenlyStem, { hanja: string; element: FiveElement; yinYang: YinYang }>
> = {
  갑: { hanja: '甲', element: '목', yinYang: '양' },
  을: { hanja: '乙', element: '목', yinYang: '음' },
  병: { hanja: '丙', element: '화', yinYang: '양' },
  정: { hanja: '丁', element: '화', yinYang: '음' },
  무: { hanja: '戊', element: '토', yinYang: '양' },
  기: { hanja: '己', element: '토', yinYang: '음' },
  경: { hanja: '庚', element: '금', yinYang: '양' },
  신: { hanja: '辛', element: '금', yinYang: '음' },
  임: { hanja: '壬', element: '수', yinYang: '양' },
  계: { hanja: '癸', element: '수', yinYang: '음' },
};

const BRANCH_META: Readonly<
  Record<EarthlyBranch, { hanja: string; element: FiveElement; yinYang: YinYang }>
> = {
  자: { hanja: '子', element: '수', yinYang: '양' },
  축: { hanja: '丑', element: '토', yinYang: '음' },
  인: { hanja: '寅', element: '목', yinYang: '양' },
  묘: { hanja: '卯', element: '목', yinYang: '음' },
  진: { hanja: '辰', element: '토', yinYang: '양' },
  사: { hanja: '巳', element: '화', yinYang: '음' },
  오: { hanja: '午', element: '화', yinYang: '양' },
  미: { hanja: '未', element: '토', yinYang: '음' },
  신: { hanja: '申', element: '금', yinYang: '양' },
  유: { hanja: '酉', element: '금', yinYang: '음' },
  술: { hanja: '戌', element: '토', yinYang: '양' },
  해: { hanja: '亥', element: '수', yinYang: '음' },
};

function pillar(stem: HeavenlyStem, branch: EarthlyBranch): PillarFact {
  return {
    stem: { value: stem, ...STEM_META[stem] },
    branch: { value: branch, ...BRANCH_META[branch] },
  };
}

function snapshot(options: {
  unresolvedHour?: boolean;
  withScenario?: boolean;
  unresolvedDayMaster?: boolean;
  suffix?: string;
} = {}): CanonicalSajuSnapshot {
  const suffix = options.suffix ?? 'a';
  return {
    snapshotId: `saju_synthetic_r2_${suffix}`,
    schemaVersion: 'saju-canonical-v1.4',
    calculationHash: suffix.repeat(64).slice(0, 64),
    createdAt: '2026-10-02T00:00:00.000Z',
    input: {
      calendarType: 'solar',
      date: { year: 2000, month: 1, day: 1 },
      time: options.unresolvedHour
        ? { known: false }
        : { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy: {
      policyId: 'synthetic/saju-r2-root-evidence',
      policyVersion: '1',
      dayBoundary: 'midnight',
      trueSolarTime: {
        enabled: false,
        longitudeSource: 'not-applicable',
        applyEquationOfTime: false,
        applyHistoricalDst: false,
      },
      timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
      unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
    },
    normalized: {
      solarDate: { status: 'resolved', value: { year: 2000, month: 1, day: 1 } },
      clockTime: options.unresolvedHour
        ? { status: 'unavailable', reasonCode: 'synthetic-hour-unresolved' }
        : { status: 'resolved', value: { hour: 12, minute: 0 } },
      timeZone: 'Asia/Seoul',
      appliedCorrections: [],
    },
    pillars: {
      year: { status: 'resolved', value: pillar('병', '인') },
      month: { status: 'resolved', value: pillar('정', '해') },
      day: { status: 'resolved', value: pillar('갑', '진') },
      hour: options.unresolvedHour
        ? { status: 'unavailable', reasonCode: 'synthetic-hour-unresolved' }
        : { status: 'resolved', value: pillar('경', '유') },
    },
    derivedFacts: {
      dayMaster: options.unresolvedDayMaster
        ? { status: 'unavailable', reasonCode: 'synthetic-day-master-unresolved' }
        : { status: 'resolved', value: { value: '갑', ...STEM_META.갑 } },
      tenGods: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
      voidBranches: { status: 'resolved', value: [] },
    },
    luckCycle: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
    scenarios: options.withScenario
      ? [
          {
            scenarioId: `saju_synthetic_r2_${suffix}:scenario:1`,
            snapshotId: `saju_synthetic_r2_${suffix}`,
            factOverrides: [],
            reasonRefs: ['synthetic-scenario'],
          },
        ]
      : [],
    completeness: {
      birthTimeKnown: !options.unresolvedHour,
      fullyResolved: false,
      resolvedPaths: ['pillars.year', 'pillars.month', 'pillars.day'],
      ambiguousPaths: [],
      unavailablePaths: options.unresolvedHour ? ['pillars.hour'] : [],
    },
    provenance: {
      engine: { name: 'synthetic', version: '1' },
      adapter: { name: 'synthetic', version: '1' },
      policy: { id: 'synthetic/saju-r2-root-evidence', version: '1' },
      schema: { id: 'myeonghwa-canonical-saju', version: 'saju-canonical-v1.4' },
    },
  };
}

function resolvedEnvelope(base = snapshot()) {
  const built = buildSharedNatalBoundedRootResearchEvidence(base);
  if (built.status !== 'resolved') throw new Error(built.reasonCode);
  return built.envelope;
}

describe('SAJU-R2 shared bounded-root research evidence adapter', () => {
  test('is research-only and preserves every upstream non-authority boundary', () => {
    expect(SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_DEFINITION.authority).toBe('research_only');
    expect(SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_DEFINITION.snapshotBinding).toBe(
      'snapshot_id_and_hash',
    );
    expect(SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_BOUNDARY).toEqual(
      expect.objectContaining({
        upstreamResearchOnly: true,
        runtimeEvidenceAuthority: 'research_only',
        canonicalSizhuHasRootResolverAuthorized: false,
        noRootInferenceAuthorized: false,
        strengthClassificationAuthorized: false,
        productionAuthorityPromoted: false,
        externalHumanReviewRequired: false,
      }),
    );
  });

  test('reproduces the exact upstream bounded positive root evaluation from the bound snapshot', () => {
    const base = snapshot();
    const envelope = resolvedEnvelope(base);
    const expected = evaluateBoundedSizhuFourYangLuRootPresenceEvidence(
      base.derivedFacts.dayMaster.status === 'resolved'
        ? base.derivedFacts.dayMaster.value
        : (() => { throw new Error('day master unresolved'); })(),
      {
        year: '인',
        month: '해',
        day: '진',
        hour: '유',
      },
    );

    expect(envelope.payload.evaluation).toEqual(expected);
    expect(envelope.payload.resolvedPillarSlots).toEqual(['year', 'month', 'day', 'hour']);
    expect(envelope.payload.unresolvedPillarSlots).toEqual([]);
    expect(envelope.payload.constraints.noBoundedEvidenceMeansNoRoot).toBe(false);
    expect(envelope.payload.constraints.qiangRuoClassificationAuthorized).toBe(false);
    expect(envelope.payload.constraints.productionFactEmissionAuthorized).toBe(false);
  });

  test('allows partial resolved pillars without turning an unknown hour into negative root evidence', () => {
    const base = snapshot({ unresolvedHour: true });
    const envelope = resolvedEnvelope(base);

    expect(envelope.payload.resolvedPillarSlots).toEqual(['year', 'month', 'day']);
    expect(envelope.payload.unresolvedPillarSlots).toEqual(['hour']);
    expect(envelope.payload.evaluation.absenceMeansNoRoot).toBe(false);
    expect(envelope.payload.evaluation.sizhuHasRootSettled).toBe(false);
  });

  test('builder output validates through the generic research evidence runtime registry', () => {
    const base = snapshot();
    const registry = createResearchEvidenceRuntimeRegistry([
      SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
    ]);
    const result = registry.validate(resolvedEnvelope(base), base);

    expect(result.status).toBe('validated');
  });

  test('freshly rehashed host authority widening is rejected', () => {
    const base = snapshot();
    const original = resolvedEnvelope(base);
    const widenedPayload = {
      ...original.payload,
      constraints: {
        ...original.payload.constraints,
        qiangRuoClassificationAuthorized: true,
      },
    };
    const widened = createResearchEvidenceEnvelope(
      SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_DEFINITION,
      base,
      widenedPayload,
    );

    const validation = validateSharedNatalBoundedRootResearchEvidence(widened, base);
    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain('root_evidence_payload_authority_widened');
    expect(validation.errors).toContain(
      'root_evidence_payload_not_reproducible_from_bound_snapshot',
    );
  });

  test('snapshot mismatch is rejected even when the envelope is otherwise valid', () => {
    const first = snapshot({ suffix: 'a' });
    const other = snapshot({ suffix: 'b' });
    const validation = validateSharedNatalBoundedRootResearchEvidence(
      resolvedEnvelope(first),
      other,
    );

    expect(validation.valid).toBe(false);
    expect(validation.errors.some((error) => error.startsWith('snapshot_id_mismatch:'))).toBe(true);
    expect(validation.errors).toContain('snapshot_hash_mismatch');
  });

  test('unmaterialized scenarios and unresolved day master fail closed before envelope creation', () => {
    expect(buildSharedNatalBoundedRootResearchEvidence(snapshot({ withScenario: true }))).toEqual({
      status: 'unavailable',
      reasonCode: 'root-evidence-scenario-materialization-required',
    });
    expect(
      buildSharedNatalBoundedRootResearchEvidence(snapshot({ unresolvedDayMaster: true })),
    ).toEqual({
      status: 'unavailable',
      reasonCode: 'root-evidence-day-master-unresolved',
    });
  });
});
