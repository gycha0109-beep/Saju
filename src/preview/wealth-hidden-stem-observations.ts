import type {
  CanonicalSajuSnapshot, EarthlyBranch, HeavenlyStem, PillarSlot,
} from '../contracts/calculation.js';
import {
  projectSnapshotBoundHiddenStemTenGodOccurrences,
  SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCE_AUTHORITY,
} from '../research/snapshot-bound-hidden-stem-ten-god-occurrences.js';

/**
 * Evidence-only projection of the existing, snapshot-bound R27 primitive.
 * The primitive already verifies all hidden stems, source pillars, day-master
 * parity, scenario completeness, mapper provenance and membership order.
 * No second Ten-God calculation or hidden activation interpretation is allowed.
 */
export interface WealthHiddenStemObservation {
  pillar: PillarSlot;
  branch: EarthlyBranch;
  hiddenStem: HeavenlyStem;
  derivedTenGod: '편재' | '정재';
  factPaths: readonly [string, string];
  sourcePillarRef: `pillars.${PillarSlot}`;
  occurrenceId: `${PillarSlot}:${HeavenlyStem}`;
  membershipSourceUrl: string;
  mappingAuthorityDefinitionHash: string;
  meaningAuthority: 'calculated_membership_only';
  wealthConclusionAuthorized: false;
}

export type WealthHiddenStemObservationResult =
  | { readonly status: 'unavailable'; readonly reasonCode: string }
  | { readonly status: 'resolved'; readonly observations: readonly WealthHiddenStemObservation[] };

export function observeHiddenWealthMembership(
  snapshot: CanonicalSajuSnapshot,
): WealthHiddenStemObservationResult {
  if (!snapshot.completeness.birthTimeKnown) return { status: 'unavailable', reasonCode: 'birth-time-unknown' };
  const result = projectSnapshotBoundHiddenStemTenGodOccurrences(snapshot);
  if (result.status === 'unavailable') {
    // An invalid *resolved* canonical payload is not an absence of wealth.
    if (/parity-failed|branch-invalid/u.test(result.reasonCode)) {
      throw new TypeError(
        'Hidden wealth observation requires actual canonical branch membership: ' +
          result.reasonCode,
      );
    }
    return { status: 'unavailable', reasonCode: result.reasonCode };
  }
  const projection = result.projection;
  const authority = SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCE_AUTHORITY;
  if (projection.snapshotId !== snapshot.snapshotId ||
      projection.snapshotHash !== snapshot.calculationHash ||
      projection.authorityDefinitionHash !== authority.definitionHash ||
      projection.constraints.definitionHash !== authority.definitionHash ||
      authority.authority !== 'structural_mapping_only' ||
      authority.interpretationClaimEmissionAuthorized !== false ||
      authority.narrativeMaterialityAuthorized !== false ||
      authority.hiddenSupportAuthorized !== false ||
      authority.productionAuthorityAuthorized !== false) {
    throw new TypeError('Hidden wealth observations require bounded R27 structural authority');
  }
  const observations = projection.occurrences
    .filter((o) => o.tenGod === '편재' || o.tenGod === '정재')
    .map((o) => ({
      pillar: o.pillarSlot,
      branch: o.branch,
      hiddenStem: o.hiddenStem,
      derivedTenGod: o.tenGod as '편재' | '정재',
      factPaths: [projection.dayMasterSourceFactRef, o.sourceFactRef] as const,
      sourcePillarRef: o.sourcePillarRef,
      occurrenceId: o.occurrenceId,
      membershipSourceUrl: authority.sourceBindings.hiddenMembershipSource.url,
      mappingAuthorityDefinitionHash: projection.authorityDefinitionHash,
      meaningAuthority: 'calculated_membership_only' as const,
      wealthConclusionAuthorized: false as const,
    }));
  return { status: 'resolved', observations };
}
