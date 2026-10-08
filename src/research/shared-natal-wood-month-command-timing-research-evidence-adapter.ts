import {
  EARTHLY_BRANCHES,
  EARTHLY_BRANCHES_HANJA,
  getEarthlyBranchElement,
  getEarthlyBranchYinYang,
  getHeavenlyStemElement,
  getHeavenlyStemYinYang,
  HEAVENLY_STEMS,
  HEAVENLY_STEMS_HANJA,
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
  evaluateGeneralNatalWoodMonthCommandTiming,
  GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_AUTHORITY as authority,
} from './general-natal-wood-month-command-de-shi-shi-shi-authority.js';

export const WOOD_MONTH_COMMAND_TIMING_EVIDENCE_DEFINITION = {
  definitionId: 'RESEARCH-EVIDENCE-SAJU-R35-WOOD-MONTH-COMMAND-TIMING',
  version: '1.0.0-research',
  evidenceType: 'WOOD_MONTH_COMMAND_TIMING_EVIDENCE',
  evidenceVersion: 'saju-r35-wood-month-command-timing-v1',
  producerRef: { id: 'BUILD-SAJU-R35-WOOD-MONTH-COMMAND-TIMING', version: '1.0.0-research' },
  payloadContractRef: {
    id: 'CONTRACT-SAJU-R35-WOOD-MONTH-COMMAND-TIMING',
    version: '1.0.0-research',
  },
  sourceIds: ['SRC-SAJU-R35-WOOD-MONTH-COMMAND-TIMING'],
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
} as const satisfies ResearchEvidenceDefinition;

// This projects the existing matcher; it does not introduce a season table or
// consume root/support evidence. Only the canonical month is the timing input.
export function projectWoodMonthCommandTiming(snapshot: CanonicalSajuSnapshot) {
  const unavailable = (reason: string) => ({
    status: 'unavailable' as const,
    reasonCode: `wood-month-command-timing-${reason}`,
  });
  if (
    typeof snapshot.snapshotId !== 'string' ||
    !snapshot.snapshotId.trim() ||
    typeof snapshot.calculationHash !== 'string' ||
    !snapshot.calculationHash.trim()
  )
    return unavailable('snapshot-binding-missing');
  if (!Array.isArray(snapshot.scenarios) || snapshot.scenarios.length !== 0)
    return unavailable('scenario-materialization-required');
  const master = snapshot.derivedFacts.dayMaster;
  const day = snapshot.pillars.day;
  const month = snapshot.pillars.month;
  if (master?.status !== 'resolved' || day?.status !== 'resolved' || month?.status !== 'resolved')
    return unavailable('master-day-or-month-unresolved');
  const stem = master.value?.value;
  const stemIndex = HEAVENLY_STEMS.indexOf(stem);
  if (
    stemIndex < 0 ||
    master.value.element !== getHeavenlyStemElement(stem) ||
    master.value.yinYang !== getHeavenlyStemYinYang(stem) ||
    master.value.hanja !== HEAVENLY_STEMS_HANJA[stemIndex] ||
    deterministicContentHash(master.value) !== deterministicContentHash(day.value?.stem)
  )
    return unavailable('master-metadata-or-day-parity-failed');
  const branch = month.value?.branch?.value;
  const branchIndex = EARTHLY_BRANCHES.indexOf(branch);
  if (
    branchIndex < 0 ||
    month.value.branch.element !== getEarthlyBranchElement(branch) ||
    month.value.branch.yinYang !== getEarthlyBranchYinYang(branch) ||
    month.value.branch.hanja !== EARTHLY_BRANCHES_HANJA[branchIndex]
  )
    return unavailable('month-branch-metadata-failed');
  return {
    status: 'resolved',
    projection: {
      snapshotId: snapshot.snapshotId,
      snapshotHash: snapshot.calculationHash,
      dayMaster: stem,
      dayMasterSourceFactRef: 'derivedFacts.dayMaster',
      dayMasterParitySourceFactRef: 'pillars.day.stem',
      monthBranch: branch,
      monthBranchSourceFactRef: 'pillars.month.branch',
      timingState: evaluateGeneralNatalWoodMonthCommandTiming(stem, branch),
      authorityDefinitionHash: authority.definitionHash,
      constraints: authority,
    },
  } as const;
}

export function buildWoodMonthCommandTimingResearchEvidence(snapshot: CanonicalSajuSnapshot) {
  const result = projectWoodMonthCommandTiming(snapshot);
  if (result.status !== 'resolved') return result;
  return {
    status: 'resolved',
    envelope: createResearchEvidenceEnvelope(
      WOOD_MONTH_COMMAND_TIMING_EVIDENCE_DEFINITION,
      snapshot,
      result.projection,
    ),
  } as const;
}

export function validateWoodMonthCommandTimingResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(
    envelope,
    snapshot,
    WOOD_MONTH_COMMAND_TIMING_EVIDENCE_DEFINITION,
  );
  const errors = [...base.errors];
  const result = projectWoodMonthCommandTiming(snapshot);
  if (result.status !== 'resolved') errors.push(result.reasonCode);
  if (
    result.status !== 'resolved' ||
    deterministicContentHash(result.projection) !== deterministicContentHash(envelope.payload)
  )
    errors.push('wood_month_command_timing_payload_not_reproducible_from_bound_snapshot');
  return { valid: errors.length === 0, errors: [...new Set(errors)].sort() };
}

export const WOOD_MONTH_COMMAND_TIMING_RUNTIME_ADAPTER = {
  definition: WOOD_MONTH_COMMAND_TIMING_EVIDENCE_DEFINITION,
  validate: validateWoodMonthCommandTimingResearchEvidence,
} satisfies ResearchEvidenceRuntimeAdapter;
