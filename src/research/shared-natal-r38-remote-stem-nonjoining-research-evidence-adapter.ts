import {
  HEAVENLY_STEMS,
  HEAVENLY_STEMS_HANJA,
  getHeavenlyStemElement,
  getHeavenlyStemYinYang,
} from 'manseryeok';
import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ResearchEvidenceRuntimeAdapter } from '../interpretation/research-evidence-runtime.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  createResearchEvidenceEnvelope,
  validateResearchEvidenceEnvelope,
  type ResearchEvidenceDefinition,
  type ResearchEvidenceEnvelope,
  type ResearchEvidenceValidationResult,
} from '../interpretation/research-evidence.js';
import {
  R051_FIVE_COMBINATION_FAMILIES,
  R051_HEAVENLY_STEM_FIVE_COMBINATION_VERSION,
} from './general-natal-heavenly-stem-five-combination.js';

export const SAJU_R38_SOURCE = Object.freeze({
  sourceId: 'SRC-SAJU-R38-ZIPING-ZHENQUAN-REMOTE-STEM-SCAN',
  title: '子平真詮 — 論十干合而不合',
  url: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/NLC416-11jh010455-35296_%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%A9%AE.pdf',
  locator: 'PDF page 19 of 287, printed folio 十; context pages 20–21',
  scanSha256: '71402a780b0351b54edf121a51bc4a4a4ce5896496c35b954563ee06f1a6f620',
  accessedAt: '2026-10-09',
});

const policy = Object.freeze({
  primitiveId: 'SAJU_R38_YEAR_HOUR_REMOTE_STEM_NONJOINING',
  version: '0.1.0-research',
  issueRef: 'GH-2438',
  source: SAJU_R38_SOURCE,
  upstreamVersion: R051_HEAVENLY_STEM_FIVE_COMBINATION_VERSION,
  upstreamPairFamiliesHash: deterministicContentHash(R051_FIVE_COMBINATION_FAMILIES),
  sourceWorkedExample: 'year_甲_hour_己',
  projectAdoptedScope: 'all_five_r051_families_both_year_hour_orientations',
  interveningVisibleStemSlots: ['month', 'day'],
  competingEndpointPairDisposition: 'unresolved_no_verdict',
  boundedFullJoiningDenialAuthorized: true,
  partialEffect: 'not_determined',
  zeroEffectInferenceAuthorized: false,
  adjacentJoiningInferenceAuthorized: false,
  transformationAuthorized: false,
  supportActivationPersistenceAuthorized: false,
  postRelationRootEffectAuthorized: false,
  strengthClassifierAuthorized: false,
  numericScoringAuthorized: false,
  narrativeMaterialityAuthorized: false,
  productionAuthorityAuthorized: false,
} as const);

export const SAJU_R38_REMOTE_NONJOINING_AUTHORITY = Object.freeze({
  ...policy,
  definitionHash: deterministicContentHash(policy),
});

export const SAJU_R38_REMOTE_NONJOINING_EVIDENCE_DEFINITION = {
  definitionId: 'RESEARCH-EVIDENCE-SAJU-R38-REMOTE-STEM-NONJOINING',
  version: '1.0.0-research',
  evidenceType: 'SAJU_R38_REMOTE_STEM_NONJOINING_EVIDENCE',
  evidenceVersion: 'saju-r38-remote-stem-nonjoining-v1',
  producerRef: { id: 'BUILD-SAJU-R38-REMOTE-NONJOINING', version: '1.0.0-research' },
  payloadContractRef: { id: 'CONTRACT-SAJU-R38-REMOTE-NONJOINING', version: '1.0.0-research' },
  sourceIds: [SAJU_R38_SOURCE.sourceId],
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
} as const satisfies ResearchEvidenceDefinition;

// Pair membership is consumed from R051, never redefined as a new pair table.
function pairOf(left: string, right: string) {
  return R051_FIVE_COMBINATION_FAMILIES.find(
    (pair) =>
      (pair.left === left && pair.right === right) || (pair.left === right && pair.right === left),
  );
}

export function projectSajuR38RemoteNonjoining(snapshot: CanonicalSajuSnapshot) {
  const fail = (reason: string) => ({
    status: 'unavailable' as const,
    reasonCode: `saju-r38-${reason}`,
  });
  if (
    typeof snapshot.snapshotId !== 'string' ||
    !snapshot.snapshotId.trim() ||
    typeof snapshot.calculationHash !== 'string' ||
    !snapshot.calculationHash.trim()
  )
    return fail('snapshot-binding-missing');
  if (!Array.isArray(snapshot.scenarios) || snapshot.scenarios.length !== 0)
    return fail('scenario-materialization-required');
  if (deterministicContentHash(R051_FIVE_COMBINATION_FAMILIES) !== policy.upstreamPairFamiliesHash)
    return fail('r051-authority-drift');
  const readStem = (slot: 'year' | 'month' | 'day' | 'hour') => {
    const fact = snapshot.pillars?.[slot];
    if (fact?.status !== 'resolved') return null;
    const stem = fact.value?.stem;
    if (!stem) return null;
    const index = HEAVENLY_STEMS.indexOf(stem.value);
    if (
      index < 0 ||
      stem.hanja !== HEAVENLY_STEMS_HANJA[index] ||
      stem.element !== getHeavenlyStemElement(stem.value) ||
      stem.yinYang !== getHeavenlyStemYinYang(stem.value)
    )
      return null;
    return {
      slot,
      value: stem.value,
      hanja: stem.hanja,
      element: stem.element,
      yinYang: stem.yinYang,
      sourceFactRef: `pillars.${slot}.stem`,
    };
  };
  const year = readStem('year'),
    month = readStem('month'),
    day = readStem('day'),
    hour = readStem('hour');
  if (!year || !month || !day || !hour) return fail('visible-stem-unresolved-or-metadata-invalid');
  const master = snapshot.derivedFacts?.dayMaster;
  if (
    master?.status !== 'resolved' ||
    deterministicContentHash(master.value) !==
      deterministicContentHash(
        snapshot.pillars.day.status === 'resolved' ? snapshot.pillars.day.value.stem : null,
      )
  )
    return fail('day-master-parity-failed');
  const pair = pairOf(year.hanja, hour.hanja);
  const competingEndpointPairs = pair
    ? [year, hour].flatMap((endpoint) =>
        [month, day].flatMap((middle) => {
          const competitor = pairOf(endpoint.hanja, middle.hanja);
          return competitor
            ? [
                {
                  endpointSlot: endpoint.slot,
                  interveningSlot: middle.slot,
                  pairId: competitor.pairId,
                },
              ]
            : [];
        }),
      )
    : [];
  const state = !pair
    ? 'outside_year_hour_pair_scope'
    : competingEndpointPairs.length > 0
      ? 'unresolved_competing_combination'
      : 'remote_nonjoining';
  return {
    status: 'resolved',
    projection: {
      snapshotId: snapshot.snapshotId,
      snapshotHash: snapshot.calculationHash,
      stems: { year, month, day, hour },
      pairId: pair?.pairId ?? null,
      competingEndpointPairs,
      state,
      fullJoining: state === 'remote_nonjoining' ? false : 'not_determined',
      partialEffect: 'not_determined',
      constraints: SAJU_R38_REMOTE_NONJOINING_AUTHORITY,
    },
  } as const;
}

export function buildSajuR38RemoteNonjoiningResearchEvidence(snapshot: CanonicalSajuSnapshot) {
  const result = projectSajuR38RemoteNonjoining(snapshot);
  if (result.status !== 'resolved') return result;
  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      SAJU_R38_REMOTE_NONJOINING_EVIDENCE_DEFINITION,
      snapshot,
      result.projection,
    ),
  } as const;
}

export function validateSajuR38RemoteNonjoiningResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope,
    snapshot,
    SAJU_R38_REMOTE_NONJOINING_EVIDENCE_DEFINITION,
  );
  const errors = [...base.errors];
  const replay = projectSajuR38RemoteNonjoining(snapshot);
  if (replay.status !== 'resolved') errors.push(replay.reasonCode);
  if (
    replay.status !== 'resolved' ||
    deterministicContentHash(replay.projection) !== deterministicContentHash(envelope.payload)
  )
    errors.push('saju_r38_remote_nonjoining_payload_not_reproducible_from_bound_snapshot');
  return { valid: errors.length === 0, errors: [...new Set(errors)].sort() };
}

export const SAJU_R38_REMOTE_NONJOINING_RUNTIME_ADAPTER = {
  definition: SAJU_R38_REMOTE_NONJOINING_EVIDENCE_DEFINITION,
  validate: validateSajuR38RemoteNonjoiningResearchEvidence,
} satisfies ResearchEvidenceRuntimeAdapter;
