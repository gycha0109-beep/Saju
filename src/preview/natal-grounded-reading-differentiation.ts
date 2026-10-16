import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildNatalN16GroundedReaderBrief } from './natal-grounded-reader-brief.js';
import { buildNatalStructuralEvidence } from './natal-structural-evidence.js';
import type { NatalSynthesisSource } from './natal-synthesis-preview.js';

export const NATAL_N17_DIFFERENTIATION_AUDIT_VERSION =
  'saju-natal-n17-grounded-reading-differentiation-v1' as const;

export interface NatalN17AuditInput {
  caseId: string;
  snapshot: CanonicalSajuSnapshot;
  sources: readonly NatalSynthesisSource[];
}

export interface NatalN17Case {
  caseId: string;
  snapshotId: string;
  calculationHash: string;
  structuralFingerprint: string;
  readingTextFingerprint: string;
  birthTimeKnown: boolean;
  readingUnitCount: number;
  availableDomains: readonly string[];
  textUnitIds: readonly string[];
}

export type NatalN17PairDisposition =
  | 'SAME_STRUCTURE_SAME_TEXT'
  | 'SAME_STRUCTURE_DIFFERENT_TEXT_REVIEW'
  | 'DIFFERENT_STRUCTURE_SAME_TEXT_COLLISION'
  | 'DIFFERENT_STRUCTURE_DIFFERENT_TEXT_UNVERIFIED';

export interface NatalN17CasePair {
  left: string;
  right: string;
  disposition: NatalN17PairDisposition;
  identicalStructure: boolean;
  identicalReadingText: boolean;
  commonReadingUnitCount: number;
  leftOnlyReadingUnitCount: number;
  rightOnlyReadingUnitCount: number;
  substantiveMeaningDifferenceEstablished: false;
}

export interface NatalN17DifferentiationAudit {
  version: typeof NATAL_N17_DIFFERENTIATION_AUDIT_VERSION;
  lifecycle: 'internal_quality_audit';
  mayPublish: false;
  maySell: false;
  mayPromoteResearch: false;
  substantiveMeaningValidated: false;
  cases: readonly NatalN17Case[];
  pairs: readonly NatalN17CasePair[];
  differentStructureSameTextPairs: number;
  differentStructureDifferentTextPairs: number;
  sameStructureDifferentTextPairs: number;
  comparisonsWithMissingReading: number;
  reviewRequired: true;
  limitations: readonly string[];
}

/**
 * N17 compares calculated evidence separately from the *real*, already bounded
 * Preview text. A textual difference (including a factual observation inserted
 * into a paragraph) is NOT evidence of different interpretive meaning.
 * No research T8 or unapproved causal relation enters a consumer response here.
 */
export function buildNatalN17DifferentiationAudit(
  inputs: readonly NatalN17AuditInput[],
): NatalN17DifferentiationAudit {
  const seenIds = new Set<string>();
  const cases = inputs.map(({ caseId, snapshot, sources }) => {
    if (!caseId.trim() || seenIds.has(caseId)) {
      throw new TypeError('N17 case identifiers must be unique and nonempty');
    }
    seenIds.add(caseId);
    const evidence = buildNatalStructuralEvidence(snapshot);
    const brief = buildNatalN16GroundedReaderBrief(snapshot, sources);
    // Never use snapshotId, birth date, narrative wording, or request clock as
    // a substitute for the actual observed chart structure.
    const structuralFingerprint = deterministicContentHash({
      pillars: evidence.pillars.map((p) => [p.slot, p.state, p.stem ?? null, p.branch ?? null]),
      dayMaster: evidence.dayMaster?.label ?? null,
      tenGods: evidence.tenGods.map((g) => [g.slot, g.component, g.state, g.value ?? null]),
      structuralRelations: evidence.structuralRelations.map((relation) => [
        relation.kind,
        relation.participants.map((p) => [p.slot, p.component, p.value]),
      ]),
      birthTimeKnown: evidence.birthTimeKnown,
      calculationPolicyId: evidence.calculationPolicyId,
    });
    const textUnitIds = brief.readingUnits.map((unit) => unit.unitId).sort();
    return {
      caseId,
      snapshotId: snapshot.snapshotId,
      calculationHash: snapshot.calculationHash,
      structuralFingerprint,
      readingTextFingerprint: deterministicContentHash(textUnitIds),
      birthTimeKnown: brief.birthTimeKnown,
      readingUnitCount: brief.uniqueTextUnitCount,
      availableDomains: brief.domains.filter((d) => d.readingAvailable).map((d) => d.domain),
      textUnitIds,
    };
  }).sort((a, b) => a.caseId.localeCompare(b.caseId));

  const pairs: NatalN17CasePair[] = [];
  for (let i = 0; i < cases.length; i++) {
    const left = cases[i]!;
    for (let j = i + 1; j < cases.length; j++) {
      const right = cases[j]!;
      const identicalStructure = left.structuralFingerprint === right.structuralFingerprint;
      const identicalReadingText = left.readingTextFingerprint === right.readingTextFingerprint;
      const a = new Set(left.textUnitIds);
      const b = new Set(right.textUnitIds);
      const commonReadingUnitCount = left.textUnitIds.filter((id) => b.has(id)).length;
      const disposition: NatalN17PairDisposition = identicalStructure
        ? identicalReadingText ? 'SAME_STRUCTURE_SAME_TEXT' : 'SAME_STRUCTURE_DIFFERENT_TEXT_REVIEW'
        : identicalReadingText ? 'DIFFERENT_STRUCTURE_SAME_TEXT_COLLISION'
          : 'DIFFERENT_STRUCTURE_DIFFERENT_TEXT_UNVERIFIED';
      pairs.push({
        left: left.caseId,
        right: right.caseId,
        disposition,
        identicalStructure,
        identicalReadingText,
        commonReadingUnitCount,
        leftOnlyReadingUnitCount: a.size - commonReadingUnitCount,
        rightOnlyReadingUnitCount: b.size - commonReadingUnitCount,
        substantiveMeaningDifferenceEstablished: false,
      });
    }
  }

  return {
    version: NATAL_N17_DIFFERENTIATION_AUDIT_VERSION,
    lifecycle: 'internal_quality_audit',
    mayPublish: false,
    maySell: false,
    mayPromoteResearch: false,
    substantiveMeaningValidated: false,
    cases,
    pairs,
    differentStructureSameTextPairs: pairs.filter((p) =>
      p.disposition === 'DIFFERENT_STRUCTURE_SAME_TEXT_COLLISION').length,
    differentStructureDifferentTextPairs: pairs.filter((p) =>
      p.disposition === 'DIFFERENT_STRUCTURE_DIFFERENT_TEXT_UNVERIFIED').length,
    sameStructureDifferentTextPairs: pairs.filter((p) =>
      p.disposition === 'SAME_STRUCTURE_DIFFERENT_TEXT_REVIEW').length,
    comparisonsWithMissingReading: pairs.filter((p) => {
      const a = cases.find((c) => c.caseId === p.left)!;
      const b = cases.find((c) => c.caseId === p.right)!;
      return a.readingUnitCount === 0 || b.readingUnitCount === 0;
    }).length,
    reviewRequired: true,
    limitations: [
      '명식 구조 차이와 문장 차이를 각각 측정합니다. 문장만 달라져도 실질적인 명리 해석 차이가 입증되는 것은 아닙니다.',
      '서로 다른 명식에서 동일한 풀이가 반복되면 검토 대상으로 남깁니다. 같은 구조의 풀이 일치는 실패로 간주하지 않습니다.',
      '응답이 없는 명식은 빈 본문 그대로 계산합니다. 출생시간 미상·근거 부족을 임의의 해석으로 채우지 않습니다.',
      'T5/T6/T8의 주장별 승인·원전 근거·독립 심사 및 실제 사람 리뷰는 별도이며, 이 감사가 그 절차를 대체하지 않습니다.',
    ],
  };
}
