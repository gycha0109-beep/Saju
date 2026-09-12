import { describe, expect, test } from 'vitest';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  PillarFact,
  StructuralRelationCandidate,
} from '../src/contracts/calculation.js';
import { GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS } from '../src/research/general-natal-geju-candidate-source-frontier.js';
import {
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_VERSION,
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EXAMPLES,
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_REFERENCES,
  buildGeneralNatalGejuBranchMeetingSourceEvidence,
} from '../src/research/general-natal-geju-branch-meeting-source-evidence.js';

function pillar(branch: EarthlyBranch): PillarFact {
  return {
    stem: { value: '갑', hanja: '甲', element: '목', yinYang: '양' },
    branch: { value: branch, hanja: branch, element: '토', yinYang: '양' },
  };
}

function fullThreeRelation(
  monthBranch: EarthlyBranch,
  otherBranches: readonly [EarthlyBranch, EarthlyBranch],
  relationId = 'synthetic_branch_three_combination',
): StructuralRelationCandidate {
  return {
    relationId,
    kind: 'branch_three_combination',
    participants: [
      { pillar: 'month', component: 'branch', value: monthBranch },
      { pillar: 'day', component: 'branch', value: otherBranches[0] },
      { pillar: 'hour', component: 'branch', value: otherBranches[1] },
    ],
    sourceIds: ['synthetic-structural-source'],
    semantics: {
      structuralMatchOnly: true,
      transformationEstablished: false,
    },
  };
}

function snapshot(options: {
  monthBranch: EarthlyBranch;
  otherBranches?: readonly [EarthlyBranch, EarthlyBranch];
  structuralRelationsResolved?: boolean;
  includeRelation?: boolean;
}): CanonicalSajuSnapshot {
  const otherBranches = options.otherBranches ?? ['자', '유'];
  const includeRelation = options.includeRelation ?? true;
  const structuralRelationsResolved = options.structuralRelationsResolved ?? true;
  const relations = includeRelation
    ? [fullThreeRelation(options.monthBranch, otherBranches)]
    : [];

  return {
    snapshotId: `synthetic_branch_meeting_${options.monthBranch}`,
    schemaVersion: 'saju-canonical-v1.4',
    calculationHash: 'b'.repeat(64),
    createdAt: '2026-09-12T00:00:00.000Z',
    input: {
      calendarType: 'solar',
      date: { year: 2000, month: 1, day: 1 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy: {
      policyId: 'synthetic/general-natal-geju-branch-meeting',
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
      year: { status: 'resolved', value: pillar('자') },
      month: { status: 'resolved', value: pillar(options.monthBranch) },
      day: { status: 'resolved', value: pillar(otherBranches[0]) },
      hour: { status: 'resolved', value: pillar(otherBranches[1]) },
    },
    derivedFacts: {
      dayMaster: {
        status: 'resolved',
        value: { value: '갑', hanja: '甲', element: '목', yinYang: '양' },
      },
      tenGods: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
      voidBranches: { status: 'resolved', value: [] },
      structuralRelations: structuralRelationsResolved
        ? { status: 'resolved', value: relations }
        : { status: 'unavailable', reasonCode: 'synthetic-structural-relations-unavailable' },
    },
    luckCycle: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
    scenarios: [],
    completeness: {
      birthTimeKnown: true,
      fullyResolved: false,
      resolvedPaths: [],
      ambiguousPaths: [],
      unavailablePaths: [],
    },
    provenance: {
      engine: { name: 'synthetic', version: '1' },
      adapter: { name: 'synthetic', version: '1' },
      policy: { id: 'synthetic/general-natal-geju-branch-meeting', version: '1' },
      schema: { id: 'myeonghwa-canonical-saju', version: 'saju-canonical-v1.4' },
    },
  };
}

const CASES = [
  { monthBranch: '진', otherBranches: ['신', '자'], exampleId: 'CHEN_SHEN_ZI_MEETING' },
  { monthBranch: '축', otherBranches: ['사', '유'], exampleId: 'CHOU_SI_YOU_MEETING' },
  { monthBranch: '미', otherBranches: ['해', '묘'], exampleId: 'WEI_HAI_MAO_MEETING' },
  { monthBranch: '술', otherBranches: ['인', '오'], exampleId: 'XU_YIN_WU_MEETING' },
] as const;

describe('General Natal Gyeokguk branch-meeting source evidence', () => {
  test.each(CASES)(
    'bridges the source-aligned full-three structural match for $monthBranch only to meeting evidence',
    ({ monthBranch, otherBranches, exampleId }) => {
      const report = buildGeneralNatalGejuBranchMeetingSourceEvidence(
        snapshot({ monthBranch, otherBranches }),
      );

      expect(report.status).toBe(
        'resolved_source_aligned_full_three_meeting_observed_effect_unresolved',
      );
      expect(report.mixedQiSourceScopeApplies).toBe(true);
      expect(report.meetingEvidence).toHaveLength(1);
      expect(report.meetingEvidence[0]).toMatchObject({
        exampleId,
        monthBranch,
        sourceAlignedFullThreeMeetingObserved: true,
        sourceMeetingUseAxisEvidenceEstablished: true,
        relationStructuralMatchOnly: true,
        relationTransformationEstablished: false,
        branchMeetingSelectionEffectEstablished: false,
        postInteractionEffectiveBureauEstablished: false,
        candidateEmitted: false,
      });
    },
  );

  test('does not treat a mismatched three-branch structural relation as the selected source meeting', () => {
    const report = buildGeneralNatalGejuBranchMeetingSourceEvidence(
      snapshot({ monthBranch: '진', otherBranches: ['인', '오'] }),
    );

    expect(report.status).toBe('resolved_no_source_aligned_full_three_meeting_observed');
    expect(report.meetingEvidence).toEqual([]);
    expect(report.branchMeetingSelectionEffectAuthorized).toBe(false);
  });

  test('does not apply the mixed-qi meeting bridge outside 辰戌丑未', () => {
    const report = buildGeneralNatalGejuBranchMeetingSourceEvidence(
      snapshot({ monthBranch: '인', otherBranches: ['오', '술'] }),
    );

    expect(report.status).toBe('outside_selected_mixed_qi_scope');
    expect(report.mixedQiSourceScopeApplies).toBe(false);
    expect(report.meetingEvidence).toEqual([]);
  });

  test('fails closed when canonical structural relations are unavailable', () => {
    const report = buildGeneralNatalGejuBranchMeetingSourceEvidence(
      snapshot({
        monthBranch: '진',
        otherBranches: ['신', '자'],
        structuralRelationsResolved: false,
      }),
    );

    expect(report.status).toBe('canonical_substrate_unavailable');
    expect(report.unavailableReasonCode).toBe(
      'general-natal-geju-branch-meeting-requires-resolved-structural-relations',
    );
    expect(report.meetingEvidence).toEqual([]);
  });

  test('preserves a resolved empty relation set as no observed meeting rather than unavailable', () => {
    const report = buildGeneralNatalGejuBranchMeetingSourceEvidence(
      snapshot({ monthBranch: '진', includeRelation: false }),
    );

    expect(report.status).toBe('resolved_no_source_aligned_full_three_meeting_observed');
    expect(report.meetingEvidence).toEqual([]);
  });

  test('keeps transformation, selection, candidate, and establishment authority fail-closed', () => {
    const first = buildGeneralNatalGejuBranchMeetingSourceEvidence(
      snapshot({ monthBranch: '진', otherBranches: ['신', '자'] }),
    );
    const second = buildGeneralNatalGejuBranchMeetingSourceEvidence(
      snapshot({ monthBranch: '진', otherBranches: ['신', '자'] }),
    );

    expect(GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_VERSION).toBe('0.1.0-research');
    expect(first.structuralMatchToSourceMeetingEvidenceBridgeAuthorized).toBe(true);
    expect(first.sourceMeetingUseAxisEvidenceAuthorized).toBe(true);
    expect(first.transformationPredicateAuthorized).toBe(false);
    expect(first.postInteractionEffectiveBureauAuthorized).toBe(false);
    expect(first.branchMeetingSelectionEffectAuthorized).toBe(false);
    expect(first.multipleCandidateRepresentationAuthorized).toBe(false);
    expect(first.candidateDerivationAuthorized).toBe(false);
    expect(first.establishmentPredicateAuthorized).toBe(false);
    expect(first.candidateFactsEmitted).toBe(false);
    expect(first.establishmentFactsEmitted).toBe(false);
    expect(first.openPredicateGaps).toEqual(GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS);
    expect(first.reportId).toBe(second.reportId);
  });

  test('pins all four selected mixed-qi source examples without broadening their authority', () => {
    expect(GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EXAMPLES).toHaveLength(4);
    expect(GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_REFERENCES.chenWaterMeeting.locator.anchor).toContain(
      '逢申與子會局',
    );
    expect(GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_REFERENCES.chouMetalMeeting.locator.anchor).toContain(
      '巳酉會成金局',
    );
    expect(GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_REFERENCES.weiWoodMeeting.locator.anchor).toContain(
      '地支會亥卯',
    );
    expect(GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_REFERENCES.xuFireMeeting.locator.anchor).toContain(
      '月支又會寅會午',
    );
  });
});
