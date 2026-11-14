import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { T10InternalServiceInterpretationV1 } from
  '../research/compatibility-t10-internal-service-interpretation.js';
import type { PairwiseSourceScopeHandoff } from
  '../research/family-pair-source-scope-handoff.js';

export const T10_PAIR_READING_MATERIAL_VERSION_V1 =
  'saju-t10-pair-reading-material-v1' as const;
export const T10_PAIR_READING_MATERIAL_POLICY_V1 =
  'myeongha-t10-internal-relational-explanation-v1' as const;

interface PairIdentity {
  readonly role: string;
  readonly snapshotId: string;
  readonly calculationHash: string;
}
interface SourceUnit {
  readonly unitId: string;
  readonly ruleId: string;
  readonly paragraph: string;
  readonly observedFactPaths: readonly string[];
  readonly calculationSourceIds: readonly string[];
  readonly sourceDefinitionHashes: readonly string[];
}
export interface T10PairSourceReadingMaterialV1 {
  readonly version: typeof T10_PAIR_READING_MATERIAL_VERSION_V1;
  readonly policyId: typeof T10_PAIR_READING_MATERIAL_POLICY_V1;
  readonly policyVersion: '2026-11-13';
  readonly readingDomain: 'compatibility';
  readonly interpretationOwner: 'myeongha_internal_service';
  readonly sourceScope: 'two_canonical_natal_charts';
  readonly charts: readonly [PairIdentity, PairIdentity];
  readonly units: readonly SourceUnit[];
  readonly materialHash: string;
  readonly status: 'source_owned_candidate_unissued';
  readonly officialIssueAuthorized: false;
  readonly mayPublish: false;
  readonly maySell: false;
}

/**
 * A source-owned Korean Reading material for the future *pair-specific* issuer.
 * It is not an Official Reading receipt, consent grant, signed Product response
 * or an authority transition from the R068/R069 historical research rules.
 */
export function buildT10PairSourceReadingMaterialV1(
  pair: PairwiseSourceScopeHandoff,
  draft: T10InternalServiceInterpretationV1,
): T10PairSourceReadingMaterialV1 {
  const { subject, target } = pair;
  const charts: [PairIdentity, PairIdentity] = [
    { role: subject.personRef, snapshotId: subject.snapshotId,
      calculationHash: subject.calculationHash },
    { role: target.personRef, snapshotId: target.snapshotId,
      calculationHash: target.calculationHash },
  ];
  const knownPaths = new Set(pair.crossChartStructuralMatches.flatMap(x =>
    [x.subject.factPath, x.target.factPath]));
  const sentences = draft.sentences;
  const kinds = sentences.map(x => x.sectionId);
  const ids = sentences.map(x => x.ruleId);
  if (!pair.researchOnly || pair.pairwiseT10Admitted !== false ||
      subject.personRef === target.personRef ||
      subject.calculationHash.length !== 64 || target.calculationHash.length !== 64 ||
      draft.subject.snapshotId !== subject.snapshotId ||
      draft.target.snapshotId !== target.snapshotId ||
      draft.subject.calculationHash !== subject.calculationHash ||
      draft.target.calculationHash !== target.calculationHash ||
      draft.policy.policyId !== T10_PAIR_READING_MATERIAL_POLICY_V1 ||
      draft.policy.policyVersion !== '2026-11-13' ||
      draft.policy.academicThirdPartyApprovalRequired !== false ||
      draft.ruleCoverage !== 'resolved_day_stem_branch_and_other_positions' ||
      draft.lifecycle !== 'internal_policy_trial' ||
      draft.readyForOfficialIssue !== false || draft.mayPublish !== false ||
      draft.maySell !== false || sentences.length < 3 || sentences.length > 7 ||
      new Set(ids).size !== ids.length ||
      kinds.filter(x => x === 'day_branch_interaction').length !== 1 ||
      kinds.filter(x => x === 'day_stem_interaction').length !== 1 ||
      kinds.filter(x => x === 'interpretation_boundary').length !== 1 ||
      draft.koreanDraft !== sentences.map(x => x.paragraph).join('\n\n') ||
      sentences.some(x =>
        !x.ruleId.startsWith('T10-SERVICE-') ||
        x.paragraph.trim() === '' || x.paragraph.length > 1500 ||
        x.individualOutcomeClaimed !== false ||
        x.interpretationOwner !== 'myeongha_internal_service' ||
        x.observedFactPaths.some(path => !knownPaths.has(path)) ||
        (x.observedFactPaths.length > 0 &&
          (x.calculationSourceIds.length === 0 || x.sourceDefinitionHashes.length === 0)))) {
    throw new TypeError('Pair Reading requires two exact source charts and internally adopted bounded sentences.');
  }
  const units = sentences.map(x => {
    const source = {
      ruleId: x.ruleId, paragraph: x.paragraph,
      observedFactPaths: [...x.observedFactPaths],
      calculationSourceIds: [...x.calculationSourceIds],
      sourceDefinitionHashes: [...x.sourceDefinitionHashes],
    };
    return { unitId: 't10_unit_' + deterministicContentHash(source).slice(0, 24), ...source };
  });
  const version = T10_PAIR_READING_MATERIAL_VERSION_V1;
  const unissuedMaterial = {
    version,
    policyId: T10_PAIR_READING_MATERIAL_POLICY_V1,
    policyVersion: '2026-11-13' as const,
    readingDomain: 'compatibility' as const,
    interpretationOwner: 'myeongha_internal_service' as const,
    sourceScope: 'two_canonical_natal_charts' as const,
    charts, units,
  };
  return {
    ...unissuedMaterial,
    materialHash: deterministicContentHash(unissuedMaterial),
    status: 'source_owned_candidate_unissued',
    officialIssueAuthorized: false,
    mayPublish: false, maySell: false,
  };
}
