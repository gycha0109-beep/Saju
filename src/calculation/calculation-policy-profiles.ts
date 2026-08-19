import { createHash } from 'node:crypto';
import type {
  BirthInput,
  CalculationPolicySnapshot,
  CanonicalSajuSnapshot,
} from '../contracts/calculation.js';
import {
  MyeonghwaCalculationError,
  calculateCanonicalSajuSnapshot,
  type CalculationEngineOptions,
} from './calculation-engine.js';

export const CALCULATION_POLICY_PROFILE_SET_VERSION = 'myeonghwa-calculation-profiles-v1';

export type CalculationPolicyProfileId =
  | 'civil-midnight-reference-v1'
  | 'civil-jasi-sensitivity-v1'
  | 'civil-split-jasi-sensitivity-v1'
  | 'solar-midnight-sensitivity-v1'
  | 'solar-jasi-sensitivity-v1'
  | 'solar-split-jasi-sensitivity-v1';

export type CalculationPolicyProfileRole = 'engineering_reference' | 'sensitivity_only';

export type CalculationPolicyProfileAvailability =
  | { status: 'available'; policy: CalculationPolicySnapshot }
  | { status: 'unavailable'; reasonCode: 'BIRTHPLACE_LONGITUDE_REQUIRED' };

export interface CalculationPolicyProfile {
  profileId: CalculationPolicyProfileId;
  profileSetVersion: string;
  role: CalculationPolicyProfileRole;
  productionDefaultAuthorized: false;
  clockBasis: 'civil_time' | 'apparent_solar_time';
  dayBoundary: CalculationPolicySnapshot['dayBoundary'];
  availability: CalculationPolicyProfileAvailability;
}

export type CalculationPolicyCandidateResult =
  | {
      profile: CalculationPolicyProfile;
      status: 'calculated';
      snapshot: CanonicalSajuSnapshot;
      semanticChartHash: string;
      affectedPathsFromReference: readonly string[];
    }
  | {
      profile: CalculationPolicyProfile;
      status: 'unavailable';
      reasonCode: 'BIRTHPLACE_LONGITUDE_REQUIRED';
    }
  | {
      profile: CalculationPolicyProfile;
      status: 'rejected';
      errorCode: MyeonghwaCalculationError['code'];
      message: string;
    };

export interface CalculationPolicySensitivityReport {
  profileSetVersion: string;
  referenceProfileId: 'civil-midnight-reference-v1';
  productionDefaultAuthorized: false;
  results: readonly CalculationPolicyCandidateResult[];
  calculatedProfileCount: number;
  distinctSemanticChartCount: number;
  materiallySensitive: boolean;
  materialAffectedPaths: readonly string[];
}

const REFERENCE_PROFILE_ID = 'civil-midnight-reference-v1' as const;

function civilPolicy(
  profileId: CalculationPolicyProfileId,
  dayBoundary: CalculationPolicySnapshot['dayBoundary'],
): CalculationPolicySnapshot {
  return {
    policyId: `myeonghwa/profile/${profileId}`,
    policyVersion: CALCULATION_POLICY_PROFILE_SET_VERSION,
    dayBoundary,
    trueSolarTime: {
      enabled: false,
      longitudeSource: 'not-applicable',
      applyEquationOfTime: false,
      applyHistoricalDst: false,
    },
    timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
    unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
  };
}

function solarPolicy(
  profileId: CalculationPolicyProfileId,
  dayBoundary: CalculationPolicySnapshot['dayBoundary'],
): CalculationPolicySnapshot {
  return {
    policyId: `myeonghwa/profile/${profileId}`,
    policyVersion: CALCULATION_POLICY_PROFILE_SET_VERSION,
    dayBoundary,
    trueSolarTime: {
      enabled: true,
      longitudeSource: 'birthplace',
      applyEquationOfTime: true,
      applyHistoricalDst: true,
    },
    timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
    unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
  };
}

function profile(
  profileId: CalculationPolicyProfileId,
  role: CalculationPolicyProfileRole,
  clockBasis: CalculationPolicyProfile['clockBasis'],
  dayBoundary: CalculationPolicySnapshot['dayBoundary'],
  availability: CalculationPolicyProfileAvailability,
): CalculationPolicyProfile {
  return {
    profileId,
    profileSetVersion: CALCULATION_POLICY_PROFILE_SET_VERSION,
    role,
    productionDefaultAuthorized: false,
    clockBasis,
    dayBoundary,
    availability,
  };
}

export function buildCalculationPolicyProfiles(input: BirthInput): readonly CalculationPolicyProfile[] {
  const solarAvailable = input.birthplace?.longitude !== undefined;
  const solarAvailability = (
    profileId: CalculationPolicyProfileId,
    dayBoundary: CalculationPolicySnapshot['dayBoundary'],
  ): CalculationPolicyProfileAvailability =>
    solarAvailable
      ? { status: 'available', policy: solarPolicy(profileId, dayBoundary) }
      : { status: 'unavailable', reasonCode: 'BIRTHPLACE_LONGITUDE_REQUIRED' };

  return [
    profile(
      REFERENCE_PROFILE_ID,
      'engineering_reference',
      'civil_time',
      'midnight',
      { status: 'available', policy: civilPolicy(REFERENCE_PROFILE_ID, 'midnight') },
    ),
    profile(
      'civil-jasi-sensitivity-v1',
      'sensitivity_only',
      'civil_time',
      'jasi',
      { status: 'available', policy: civilPolicy('civil-jasi-sensitivity-v1', 'jasi') },
    ),
    profile(
      'civil-split-jasi-sensitivity-v1',
      'sensitivity_only',
      'civil_time',
      'splitJasi',
      {
        status: 'available',
        policy: civilPolicy('civil-split-jasi-sensitivity-v1', 'splitJasi'),
      },
    ),
    profile(
      'solar-midnight-sensitivity-v1',
      'sensitivity_only',
      'apparent_solar_time',
      'midnight',
      solarAvailability('solar-midnight-sensitivity-v1', 'midnight'),
    ),
    profile(
      'solar-jasi-sensitivity-v1',
      'sensitivity_only',
      'apparent_solar_time',
      'jasi',
      solarAvailability('solar-jasi-sensitivity-v1', 'jasi'),
    ),
    profile(
      'solar-split-jasi-sensitivity-v1',
      'sensitivity_only',
      'apparent_solar_time',
      'splitJasi',
      solarAvailability('solar-split-jasi-sensitivity-v1', 'splitJasi'),
    ),
  ];
}

const SENSITIVITY_PATHS = [
  'pillars.year',
  'pillars.month',
  'pillars.day',
  'pillars.hour',
  'derivedFacts.dayMaster',
  'derivedFacts.tenGods',
  'derivedFacts.voidBranches',
  'derivedFacts.fiveElementCounts',
  'luckCycle',
] as const;

function semanticView(snapshot: CanonicalSajuSnapshot): Record<(typeof SENSITIVITY_PATHS)[number], unknown> {
  return {
    'pillars.year': snapshot.pillars.year,
    'pillars.month': snapshot.pillars.month,
    'pillars.day': snapshot.pillars.day,
    'pillars.hour': snapshot.pillars.hour,
    'derivedFacts.dayMaster': snapshot.derivedFacts.dayMaster,
    'derivedFacts.tenGods': snapshot.derivedFacts.tenGods,
    'derivedFacts.voidBranches': snapshot.derivedFacts.voidBranches,
    'derivedFacts.fiveElementCounts': snapshot.derivedFacts.fiveElementCounts,
    luckCycle: snapshot.luckCycle,
  };
}

function stableValue(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableValue).join(',')}]`;
  if (value !== null && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableValue(record[key])}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
}

function semanticChartHash(snapshot: CanonicalSajuSnapshot): string {
  return createHash('sha256').update(stableValue(semanticView(snapshot))).digest('hex');
}

function affectedPaths(
  reference: CanonicalSajuSnapshot,
  candidate: CanonicalSajuSnapshot,
): readonly string[] {
  const left = semanticView(reference);
  const right = semanticView(candidate);
  return SENSITIVITY_PATHS.filter((path) => stableValue(left[path]) !== stableValue(right[path]));
}

export function runCalculationPolicySensitivity(
  input: BirthInput,
  options: CalculationEngineOptions = {},
): CalculationPolicySensitivityReport {
  const profiles = buildCalculationPolicyProfiles(input);
  const referenceProfile = profiles.find((item) => item.profileId === REFERENCE_PROFILE_ID);
  if (referenceProfile?.availability.status !== 'available') {
    throw new Error('Myeonghwa engineering reference profile must always be available.');
  }

  const referenceSnapshot = calculateCanonicalSajuSnapshot(
    input,
    referenceProfile.availability.policy,
    options,
  );
  const results: CalculationPolicyCandidateResult[] = [];

  for (const candidateProfile of profiles) {
    if (candidateProfile.availability.status === 'unavailable') {
      results.push({
        profile: candidateProfile,
        status: 'unavailable',
        reasonCode: candidateProfile.availability.reasonCode,
      });
      continue;
    }

    try {
      const snapshot =
        candidateProfile.profileId === REFERENCE_PROFILE_ID
          ? referenceSnapshot
          : calculateCanonicalSajuSnapshot(input, candidateProfile.availability.policy, options);
      results.push({
        profile: candidateProfile,
        status: 'calculated',
        snapshot,
        semanticChartHash: semanticChartHash(snapshot),
        affectedPathsFromReference:
          candidateProfile.profileId === REFERENCE_PROFILE_ID
            ? []
            : affectedPaths(referenceSnapshot, snapshot),
      });
    } catch (error) {
      if (!(error instanceof MyeonghwaCalculationError)) throw error;
      results.push({
        profile: candidateProfile,
        status: 'rejected',
        errorCode: error.code,
        message: error.message,
      });
    }
  }

  const calculated = results.filter(
    (result): result is Extract<CalculationPolicyCandidateResult, { status: 'calculated' }> =>
      result.status === 'calculated',
  );
  const materialAffectedPaths = [
    ...new Set(calculated.flatMap((result) => result.affectedPathsFromReference)),
  ].sort();

  return {
    profileSetVersion: CALCULATION_POLICY_PROFILE_SET_VERSION,
    referenceProfileId: REFERENCE_PROFILE_ID,
    productionDefaultAuthorized: false,
    results,
    calculatedProfileCount: calculated.length,
    distinctSemanticChartCount: new Set(calculated.map((result) => result.semanticChartHash)).size,
    materiallySensitive: materialAffectedPaths.length > 0,
    materialAffectedPaths,
  };
}
