import { createHash } from 'node:crypto';
import {
  FR235_CONTRACT_VERSION,
  assertExternalAssuranceRouteQualificationFR235,
  type FR235ExternalAssuranceRouteQualification,
} from './observable-morphology-external-assurance-route-qualification-fr235.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR236_CONTRACT_VERSION =
  'FR236-KSA-CERTIFICATION-SCOPE-INQUIRY-PACKAGE-v1' as const;

export interface FR236KsaCertificationScopeInquiryPackage {
  readonly schemaVersion: 'fr236-ksa-certification-scope-inquiry-package-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR236_CONTRACT_VERSION;
  readonly predecessorContractVersion: typeof FR235_CONTRACT_VERSION;
  readonly sourceFR235QualificationRef: string;
  readonly sourceFR235QualificationDigest: string;
  readonly recipient: {
    readonly organization: 'Korean Standards Association (KSA)';
    readonly center: 'International Certification Center';
    readonly email: 'aicert01@ksa.or.kr';
    readonly telephone: '02-6240-4675';
  };
  readonly subject:
    '[MyeongHa] AI+ 및 ISO/IEC 42001 인증 대상·범위 사전 문의';
  readonly serviceSummary: readonly string[];
  readonly currentStatus: readonly string[];
  readonly existingControls: readonly string[];
  readonly questions: readonly string[];
  readonly nonClaims: {
    readonly aiPlusEligibilityConfirmed: false;
    readonly aiPlusCertified: false;
    readonly iso42001Certified: false;
    readonly externalProductTestingCompleted: false;
    readonly externalAuditCompleted: false;
    readonly interpretationValidityExternallyEstablished: false;
    readonly physiognomyScientificallyValidated: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly empiricalSufficiencyEstablished: false;
  };
  readonly responseCapture: {
    readonly aiPlusEligibility: 'unconfirmed';
    readonly applicableCertificationType: 'unconfirmed';
    readonly applicableTestItems: 'unconfirmed';
    readonly organizationFormRequirement: 'unconfirmed';
    readonly minimumOperationalEvidence: 'unconfirmed';
    readonly requiredDocuments: 'unconfirmed';
    readonly auditRequirements: 'unconfirmed';
    readonly testRequirements: 'unconfirmed';
    readonly expectedLeadTime: 'unconfirmed';
    readonly quotationInputs: 'unconfirmed';
    readonly domainSpecificRestrictions: 'unconfirmed';
  };
  readonly packageDigest: string;
  readonly packageRef: string;
}

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-236 ${message}`);
}

function digest(value: unknown): string {
  return `sha256:${createHash('sha256')
    .update(JSON.stringify(value), 'utf8')
    .digest('hex')}`;
}

export function prepareKsaCertificationScopeInquiryFR236(
  qualification: FR235ExternalAssuranceRouteQualification,
): FR236KsaCertificationScopeInquiryPackage {
  assertExternalAssuranceRouteQualificationFR235(qualification);

  const recipient = Object.freeze({
    organization: 'Korean Standards Association (KSA)' as const,
    center: 'International Certification Center' as const,
    email: 'aicert01@ksa.or.kr' as const,
    telephone: '02-6240-4675' as const,
  });

  const serviceSummary = Object.freeze([
    'MyeongHa is an AI-assisted interpretation and verification service that structures observable facial morphology evidence and produces bounded interpretation outputs.',
    'The current research architecture separates technical evidence/provenance controls from empirical validity, traditional interpretation authority, production authority, and commerce authority.',
    'The system uses documented contracts, deterministic validation boundaries, CI verification, and explicit fail-closed authority flags.',
  ]);

  const currentStatus = Object.freeze([
    'Research and implementation are active; no AI+ or ISO/IEC 42001 certification has been obtained.',
    'External certification eligibility and scope have not yet been confirmed by KSA.',
    'No claim is made that certification would establish the scientific truth or predictive validity of physiognomy.',
  ]);

  const existingControls = Object.freeze([
    'versioned interpretation/evidence contracts',
    'deterministic validation and fail-closed authority boundaries',
    'source and evidence provenance tracking',
    'automated regression and parity CI',
    'explicit separation of technical verification from empirical/scientific claims',
    'documented release, production, and commerce authority boundaries',
  ]);

  const questions = Object.freeze([
    'Is an AI-assisted face-reading interpretation and verification software/service eligible for AI+ certification?',
    'If eligible, which AI+ certification type and product/service test items would apply?',
    'Does the face-reading/physiognomy domain create an exclusion, restriction, or additional evidence requirement?',
    'Can the same MyeongHa service be included in an ISO/IEC 42001 AI management-system certification scope?',
    'What legal or organizational form is required for application, including whether a sole proprietor is acceptable?',
    'What minimum operating history, deployed-user evidence, or process records are required before assessment?',
    'Which policies, AI inventory, risk/impact assessments, supplier/model controls, incident processes, monitoring records, internal audits, and management reviews are required?',
    'What external product testing and on-site audit activities should be expected?',
    'What information is required for a quotation, and what are the typical assessment stages and lead-time ranges?',
    'What materials should be submitted for a formal pre-assessment or application?',
  ]);

  const nonClaims = Object.freeze({
    aiPlusEligibilityConfirmed: false as const,
    aiPlusCertified: false as const,
    iso42001Certified: false as const,
    externalProductTestingCompleted: false as const,
    externalAuditCompleted: false as const,
    interpretationValidityExternallyEstablished: false as const,
    physiognomyScientificallyValidated: false as const,
    empiricalRepeatabilityEstablished: false as const,
    empiricalSufficiencyEstablished: false as const,
  });

  const responseCapture = Object.freeze({
    aiPlusEligibility: 'unconfirmed' as const,
    applicableCertificationType: 'unconfirmed' as const,
    applicableTestItems: 'unconfirmed' as const,
    organizationFormRequirement: 'unconfirmed' as const,
    minimumOperationalEvidence: 'unconfirmed' as const,
    requiredDocuments: 'unconfirmed' as const,
    auditRequirements: 'unconfirmed' as const,
    testRequirements: 'unconfirmed' as const,
    expectedLeadTime: 'unconfirmed' as const,
    quotationInputs: 'unconfirmed' as const,
    domainSpecificRestrictions: 'unconfirmed' as const,
  });

  const material = {
    sourceFR235QualificationRef: qualification.qualificationRef,
    sourceFR235QualificationDigest: qualification.qualificationDigest,
    recipient,
    serviceSummary,
    currentStatus,
    existingControls,
    questions,
    nonClaims,
    responseCapture,
  };
  const packageDigest = digest(material);

  const result: FR236KsaCertificationScopeInquiryPackage = Object.freeze({
    schemaVersion: 'fr236-ksa-certification-scope-inquiry-package-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR236_CONTRACT_VERSION,
    predecessorContractVersion: FR235_CONTRACT_VERSION,
    sourceFR235QualificationRef: qualification.qualificationRef,
    sourceFR235QualificationDigest: qualification.qualificationDigest,
    recipient,
    subject:
      '[MyeongHa] AI+ 및 ISO/IEC 42001 인증 대상·범위 사전 문의' as const,
    serviceSummary,
    currentStatus,
    existingControls,
    questions,
    nonClaims,
    responseCapture,
    packageDigest,
    packageRef:
      `evidence.fr236.ksa_certification_scope_inquiry:${packageDigest.slice('sha256:'.length)}`,
  });

  ISSUED.add(result);
  return result;
}

export function assertKsaCertificationScopeInquiryFR236(
  value: FR236KsaCertificationScopeInquiryPackage,
): void {
  if (!ISSUED.has(value)) fail('inquiry package was not issued by active FR236 runtime.');
  if (
    value.contractVersion !== FR236_CONTRACT_VERSION
    || value.predecessorContractVersion !== FR235_CONTRACT_VERSION
    || value.recipient.organization !== 'Korean Standards Association (KSA)'
    || value.recipient.email !== 'aicert01@ksa.or.kr'
    || value.questions.length < 10
    || Object.values(value.nonClaims).some((entry) => entry !== false)
    || Object.values(value.responseCapture).some((entry) => entry !== 'unconfirmed')
  ) fail('KSA certification-scope inquiry boundary drift.');
}
