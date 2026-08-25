import { describe, expect, test } from 'vitest';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  FiveElement,
  HeavenlyStem,
  PillarFact,
  YinYang,
} from '../src/contracts/calculation.js';
import { createResearchEvidenceEnvelope } from '../src/interpretation/research-evidence.js';
import {
  buildI20RelativeForceResearchEvidence,
  I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION,
  validateI20RelativeForceResearchEvidence,
} from '../src/research/i20-relative-force-research-evidence-adapter.js';
import type { RelativeForceEvidenceReport } from '../src/research/i20-relative-force-evidence.js';

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

function snapshot(options: { unresolvedHour?: boolean; withScenario?: boolean; suffix?: string } = {}): CanonicalSajuSnapshot {
  const suffix = options.suffix ?? 'a';
  return {
    snapshotId: `saju_synthetic_i20_${suffix}`,
    schemaVersion: 'saju-canonical-v1.4',
    calculationHash: suffix.repeat(64).slice(0, 64),
    createdAt: '2026-08-25T00:00:00.000Z',
    input: {
      calendarType: 'solar',
      date: { year: 2000, month: 1, day: 1 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy: {
      policyId: 'synthetic/i20-research-evidence',
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
      clockTime: { status: 'resolved', value: { hour: 12, minute: 0 } },
      timeZone: 'Asia/Seoul',
      appliedCorrections: [],
    },
    pillars: {
      year: { status: 'resolved', value: pillar('갑', '자') },
      month: { status: 'resolved', value: pillar('병', '인') },
      day: { status: 'resolved', value: pillar('무', '오') },
      hour: options.unresolvedHour
        ? { status: 'unavailable', reasonCode: 'synthetic-hour-unresolved' }
        : { status: 'resolved', value: pillar('경', '유') },
    },
    derivedFacts: {
      dayMaster: { status: 'resolved', value: { value: '무', ...STEM_META.무 } },
      tenGods: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
      voidBranches: { status: 'resolved', value: [] },
    },
    luckCycle: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
    scenarios: options.withScenario
      ? [
          {
            scenarioId: `saju_synthetic_i20_${suffix}:scenario:1`,
            snapshotId: `saju_synthetic_i20_${suffix}`,
            factOverrides: [],
            reasonRefs: ['synthetic-scenario'],
          },
        ]
      : [],
    completeness: {
      birthTimeKnown: true,
      fullyResolved: false,
      resolvedPaths: ['pillars.year', 'pillars.month', 'pillars.day'],
      ambiguousPaths: [],
      unavailablePaths: options.unresolvedHour ? ['pillars.hour'] : [],
    },
    provenance: {
      engine: { name: 'synthetic', version: '1' },
      adapter: { name: 'synthetic', version: '1' },
      policy: { id: 'synthetic/i20-research-evidence', version: '1' },
      schema: { id: 'myeonghwa-canonical-saju', version: 'saju-canonical-v1.4' },
    },
  };
}

function resolvedEnvelope(base = snapshot()) {
  const result = buildI20RelativeForceResearchEvidence(base);
  if (result.status !== 'resolved') throw new Error(`expected resolved I20 evidence: ${result.reasonCode}`);
  return result.envelope;
}

describe('I20 governed research-evidence boundary', () => {
  test('definition is research-only, snapshot-bound, and pins the I20 builder, payload contract, and source set', () => {
    expect(I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION.authority).toBe('research_only');
    expect(I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION.snapshotBinding).toBe('snapshot_id_and_hash');
    expect(I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION.producerRef.id).toBe(
      'BUILD-I20-RELATIVE-FORCE-EVIDENCE',
    );
    expect(I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION.payloadContractRef.id).toBe(
      'CONTRACT-I20-RELATIVE-FORCE-EVIDENCE-REPORT',
    );
    expect(I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION.sourceIds).toHaveLength(2);
  });

  test('resolved four-pillar snapshot produces one deterministic envelope with raw seasonal phases but no verdict authority', () => {
    const base = snapshot();
    const first = resolvedEnvelope(base);
    const second = resolvedEnvelope(base);

    expect(first).toEqual(second);
    expect(first.snapshotId).toBe(base.snapshotId);
    expect(first.snapshotHash).toBe(base.calculationHash);
    expect(first.payload.status).toBe('RESOLVED_EVIDENCE');
    expect(first.payload.positions).toHaveLength(4);
    expect(first.payload.positions.every((position) => ['旺', '相', '休', '囚', '死'].includes(position.seasonalPhase))).toBe(true);
    expect(first.payload.relativeForceVerdictAuthorized).toBe(false);
    expect(first.payload.rootEffectResolutionAuthorized).toBe(false);
    expect(first.payload.classificationAuthorized).toBe(false);
    expect(first.payload.numericScoringAuthorized).toBe(false);
    expect(first.payload.positions.every((position) => position.relativeForceVerdict === 'not_determined' && position.numericWeight === 'not_assigned')).toBe(true);
  });

  test('builder-produced envelope validates against the exact bound snapshot', () => {
    const base = snapshot();
    expect(validateI20RelativeForceResearchEvidence(resolvedEnvelope(base), base)).toEqual({
      valid: true,
      errors: [],
    });
  });

  test('a host cannot alter a seasonal phase and regain authority merely by rebuilding a valid envelope hash', () => {
    const base = snapshot();
    const original = resolvedEnvelope(base);
    const firstPosition = original.payload.positions[0];
    if (firstPosition === undefined) throw new Error('expected I20 position');
    const changedPhase = firstPosition.seasonalPhase === '旺' ? '死' : '旺';
    const tamperedPayload: RelativeForceEvidenceReport = {
      ...original.payload,
      positions: [
        { ...firstPosition, seasonalPhase: changedPhase },
        ...original.payload.positions.slice(1),
      ],
    };
    const freshlyHashedTamperedEnvelope = createResearchEvidenceEnvelope(
      I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION,
      base,
      tamperedPayload,
    );
    const validation = validateI20RelativeForceResearchEvidence(
      freshlyHashedTamperedEnvelope,
      base,
    );
    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain('i20_payload_not_reproducible_from_bound_snapshot');
  });

  test('wrong snapshot id/hash binding is rejected even when the evidence payload itself is otherwise valid', () => {
    const first = snapshot({ suffix: 'a' });
    const other = snapshot({ suffix: 'b' });
    const validation = validateI20RelativeForceResearchEvidence(resolvedEnvelope(first), other);
    expect(validation.valid).toBe(false);
    expect(validation.errors.some((error) => error.startsWith('snapshot_id_mismatch:'))).toBe(true);
    expect(validation.errors).toContain('snapshot_hash_mismatch');
    expect(validation.errors).toContain('i20_payload_not_reproducible_from_bound_snapshot');
  });

  test('producer/version metadata cannot be widened independently of the registered definition', () => {
    const base = snapshot();
    const original = resolvedEnvelope(base);
    const tampered = {
      ...original,
      producerRef: { id: 'HOST-PROVIDED-EVIDENCE', version: '999' },
      evidenceVersion: '999',
    } as typeof original;
    const validation = validateI20RelativeForceResearchEvidence(tampered, base);
    expect(validation.valid).toBe(false);
    expect(validation.errors.some((error) => error.startsWith('producer_ref_mismatch:'))).toBe(true);
    expect(validation.errors.some((error) => error.startsWith('evidence_version_mismatch:'))).toBe(true);
  });

  test('payload authority widening is rejected even if a caller also recomputes the envelope hash', () => {
    const base = snapshot();
    const original = resolvedEnvelope(base);
    const widenedPayload = {
      ...original.payload,
      numericScoringAuthorized: true,
    } as unknown as RelativeForceEvidenceReport;
    const widened = createResearchEvidenceEnvelope(
      I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION,
      base,
      widenedPayload,
    );
    const validation = validateI20RelativeForceResearchEvidence(widened, base);
    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain('i20_payload_authority_widened');
    expect(validation.errors).toContain('i20_payload_not_reproducible_from_bound_snapshot');
  });

  test('unresolved pillars fail closed before an envelope is produced', () => {
    expect(buildI20RelativeForceResearchEvidence(snapshot({ unresolvedHour: true }))).toEqual({
      status: 'unavailable',
      reasonCode: 'i20-pillars-unresolved',
    });
  });

  test('unmaterialized scenarios fail closed rather than binding research evidence to an unresolved base snapshot', () => {
    expect(buildI20RelativeForceResearchEvidence(snapshot({ withScenario: true }))).toEqual({
      status: 'unavailable',
      reasonCode: 'i20-scenario-materialization-required',
    });
  });
});
