import type {
  BirthInput,
  CalculationPolicySnapshot,
  CanonicalSajuSnapshot,
} from '../contracts/calculation.js';
import {
  calculateCanonicalSajuSnapshot,
  type CalculationEngineOptions,
} from '../calculation/calculation-engine.js';
import {
  runCalculationPolicySensitivity,
  type CalculationPolicyCandidateResult,
  type CalculationPolicyProfileId,
  type CalculationPolicySensitivityReport,
} from '../calculation/calculation-policy-profiles.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  listAuthorizedProductionCalculationPolicies,
  type AuthorizedProductionCalculationPolicySummary,
} from './production-calculation-authority.js';
import {
  PRODUCTION_CALCULATION_AUTHORIZATION_ID,
  PRODUCTION_CALCULATION_AUTHORITY_RECORD_REF,
  PRODUCTION_DEFAULT_CALCULATION_POLICY,
  PRODUCTION_DEFAULT_CALCULATION_POLICY_ID,
} from './production-calculation-policy.js';

export const PRODUCTION_CALCULATION_RUNTIME_VERSION =
  'myeonghwa-production-calculation-runtime-v1' as const;
export const PRODUCTION_CALCULATION_SENSITIVITY_DIAGNOSTIC_VERSION =
  'myeonghwa-production-calculation-sensitivity-diagnostic-v1' as const;

const SENSITIVITY_REFERENCE_PROFILE_ID = 'civil-midnight-reference-v1' as const;

type SensitivityOnlyCalculationPolicyProfileId = Exclude<
  CalculationPolicyProfileId,
  typeof SENSITIVITY_REFERENCE_PROFILE_ID
>;

export interface AuthorizedMyeonghwaProductionCalculationResult {
  runtimeVersion: typeof PRODUCTION_CALCULATION_RUNTIME_VERSION;
  authority: AuthorizedProductionCalculationPolicySummary;
  snapshot: CanonicalSajuSnapshot;
}

interface ProductionCalculationSensitivityDiagnosticCaseBase {
  profileId: SensitivityOnlyCalculationPolicyProfileId;
  role: 'sensitivity_only';
  productionDefaultAuthorized: false;
  clockBasis: 'civil_time' | 'apparent_solar_time';
  dayBoundary: CalculationPolicySnapshot['dayBoundary'];
}

export type ProductionCalculationSensitivityDiagnosticCase =
  | (ProductionCalculationSensitivityDiagnosticCaseBase & {
      status: 'calculated';
      affectedPathsFromReference: readonly string[];
    })
  | (ProductionCalculationSensitivityDiagnosticCaseBase & {
      status: 'unavailable';
      reasonCode: 'BIRTHPLACE_LONGITUDE_REQUIRED' | 'SUPPORTED_BIRTHPLACE_TIMEZONE_REQUIRED';
    })
  | (ProductionCalculationSensitivityDiagnosticCaseBase & {
      status: 'rejected';
      errorCode: string;
      message: string;
    });

export interface AuthorizedMyeonghwaProductionCalculationSensitivityDiagnostic {
  diagnosticVersion: typeof PRODUCTION_CALCULATION_SENSITIVITY_DIAGNOSTIC_VERSION;
  runtimeVersion: typeof PRODUCTION_CALCULATION_RUNTIME_VERSION;
  authority: AuthorizedProductionCalculationPolicySummary;
  productionDefaultPolicyId: typeof PRODUCTION_DEFAULT_CALCULATION_POLICY_ID;
  profileSetVersion: string;
  referenceProfileId: typeof SENSITIVITY_REFERENCE_PROFILE_ID;
  referenceProductionDefaultAuthorized: false;
  materiallySensitive: boolean;
  materialAffectedPaths: readonly string[];
  cases: readonly ProductionCalculationSensitivityDiagnosticCase[];
}

function authorizedDefaultCalculationAuthority(): AuthorizedProductionCalculationPolicySummary {
  const authority = listAuthorizedProductionCalculationPolicies().find(
    (candidate) => candidate.calculationPolicyId === PRODUCTION_DEFAULT_CALCULATION_POLICY_ID,
  );
  const expectedContentHash = deterministicContentHash(PRODUCTION_DEFAULT_CALCULATION_POLICY);

  if (
    authority === undefined ||
    authority.authorizationId !== PRODUCTION_CALCULATION_AUTHORIZATION_ID ||
    authority.authorityRecordRef !== PRODUCTION_CALCULATION_AUTHORITY_RECORD_REF ||
    authority.policyVersion !== PRODUCTION_DEFAULT_CALCULATION_POLICY.policyVersion ||
    authority.contentHash !== expectedContentHash
  ) {
    throw new Error(
      'Production calculation authority manifest does not contain the exact governed Myeonghwa V1 default.',
    );
  }

  return Object.freeze({ ...authority });
}

function assertAuthorizedSnapshot(snapshot: CanonicalSajuSnapshot): void {
  if (
    snapshot.policy.policyId !== PRODUCTION_DEFAULT_CALCULATION_POLICY.policyId ||
    snapshot.policy.policyVersion !== PRODUCTION_DEFAULT_CALCULATION_POLICY.policyVersion ||
    deterministicContentHash(snapshot.policy) !==
      deterministicContentHash(PRODUCTION_DEFAULT_CALCULATION_POLICY) ||
    snapshot.provenance.policy.id !== PRODUCTION_DEFAULT_CALCULATION_POLICY.policyId ||
    snapshot.provenance.policy.version !== PRODUCTION_DEFAULT_CALCULATION_POLICY.policyVersion
  ) {
    throw new Error(
      'Production calculation returned a snapshot outside the authorized Myeonghwa V1 policy boundary.',
    );
  }
}

function calculationSemantics(policy: CalculationPolicySnapshot): unknown {
  return {
    dayBoundary: policy.dayBoundary,
    trueSolarTime: policy.trueSolarTime,
    timeZonePolicy: policy.timeZonePolicy,
    unknownBirthTimePolicy: policy.unknownBirthTimePolicy,
  };
}

function assertSensitivityReferenceMatchesProductionDefault(
  report: CalculationPolicySensitivityReport,
): void {
  const references = report.results.filter(
    (result) => result.profile.profileId === SENSITIVITY_REFERENCE_PROFILE_ID,
  );
  const reference = references[0];

  if (
    report.referenceProfileId !== SENSITIVITY_REFERENCE_PROFILE_ID ||
    report.productionDefaultAuthorized !== false ||
    references.length !== 1 ||
    reference === undefined
  ) {
    throw new Error(
      'Calculation sensitivity report does not preserve the governed non-authoritative engineering reference boundary.',
    );
  }

  if (
    reference.profile.role !== 'engineering_reference' ||
    reference.profile.productionDefaultAuthorized !== false ||
    reference.profile.availability.status !== 'available' ||
    deterministicContentHash(calculationSemantics(reference.profile.availability.policy)) !==
      deterministicContentHash(calculationSemantics(PRODUCTION_DEFAULT_CALCULATION_POLICY))
  ) {
    throw new Error(
      'Calculation sensitivity reference semantics have drifted from the authorized Myeonghwa V1 production default.',
    );
  }

  for (const result of report.results) {
    if (result.profile.profileId === SENSITIVITY_REFERENCE_PROFILE_ID) continue;
    if (
      result.profile.role !== 'sensitivity_only' ||
      result.profile.productionDefaultAuthorized !== false
    ) {
      throw new Error(
        'Calculation sensitivity diagnostics cannot expose an alternate profile as production-authorized.',
      );
    }
  }
}

function sensitivityOnlyProfileId(
  profileId: CalculationPolicyProfileId,
): SensitivityOnlyCalculationPolicyProfileId {
  if (profileId === SENSITIVITY_REFERENCE_PROFILE_ID) {
    throw new Error('Engineering reference profile cannot be projected as a sensitivity-only case.');
  }
  return profileId;
}

function projectSensitivityCase(
  result: CalculationPolicyCandidateResult,
): ProductionCalculationSensitivityDiagnosticCase {
  if (result.profile.role !== 'sensitivity_only') {
    throw new Error('Only sensitivity-only profiles may cross the production diagnostic boundary.');
  }

  const base: ProductionCalculationSensitivityDiagnosticCaseBase = {
    profileId: sensitivityOnlyProfileId(result.profile.profileId),
    role: 'sensitivity_only',
    productionDefaultAuthorized: false,
    clockBasis: result.profile.clockBasis,
    dayBoundary: result.profile.dayBoundary,
  };

  if (result.status === 'calculated') {
    return {
      ...base,
      status: 'calculated',
      affectedPathsFromReference: [...result.affectedPathsFromReference],
    };
  }
  if (result.status === 'unavailable') {
    return { ...base, status: 'unavailable', reasonCode: result.reasonCode };
  }
  return {
    ...base,
    status: 'rejected',
    errorCode: result.errorCode,
    message: result.message,
  };
}

/**
 * Calculates a Canonical Saju Snapshot using the single governed Myeonghwa V1
 * production calculation authority. Callers cannot select or override the
 * calculation policy through this boundary.
 */
export function calculateAuthorizedMyeonghwaProductionSnapshot(
  input: BirthInput,
  options: CalculationEngineOptions = {},
): AuthorizedMyeonghwaProductionCalculationResult {
  const authority = authorizedDefaultCalculationAuthority();
  const snapshot = calculateCanonicalSajuSnapshot(
    input,
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    options,
  );
  assertAuthorizedSnapshot(snapshot);

  return {
    runtimeVersion: PRODUCTION_CALCULATION_RUNTIME_VERSION,
    authority,
    snapshot,
  };
}

/**
 * Preserves methodology-sensitive calculation differences for product
 * diagnostics without authorizing, ranking, or returning alternate charts.
 * The authoritative production calculation remains the separately governed
 * Myeonghwa V1 default exposed by calculateAuthorizedMyeonghwaProductionSnapshot.
 */
export function diagnoseAuthorizedMyeonghwaProductionCalculationSensitivity(
  input: BirthInput,
  options: CalculationEngineOptions = {},
): AuthorizedMyeonghwaProductionCalculationSensitivityDiagnostic {
  const authority = authorizedDefaultCalculationAuthority();
  const report = runCalculationPolicySensitivity(input, options);
  assertSensitivityReferenceMatchesProductionDefault(report);

  return {
    diagnosticVersion: PRODUCTION_CALCULATION_SENSITIVITY_DIAGNOSTIC_VERSION,
    runtimeVersion: PRODUCTION_CALCULATION_RUNTIME_VERSION,
    authority,
    productionDefaultPolicyId: PRODUCTION_DEFAULT_CALCULATION_POLICY_ID,
    profileSetVersion: report.profileSetVersion,
    referenceProfileId: SENSITIVITY_REFERENCE_PROFILE_ID,
    referenceProductionDefaultAuthorized: false,
    materiallySensitive: report.materiallySensitive,
    materialAffectedPaths: [...report.materialAffectedPaths],
    cases: report.results
      .filter((result) => result.profile.role === 'sensitivity_only')
      .map(projectSensitivityCase),
  };
}
