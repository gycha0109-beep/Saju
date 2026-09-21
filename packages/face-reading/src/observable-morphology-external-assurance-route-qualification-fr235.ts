import { createHash } from 'node:crypto';
import { FR234_CONTRACT_VERSION } from './observable-morphology-authority-trust-root-governance-requirements-fr234.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR235_CONTRACT_VERSION =
  'FR235-EXTERNAL-ASSURANCE-ROUTE-QUALIFICATION-v1' as const;

export const FR235_OFFICIAL_SOURCES = Object.freeze({
  iso42001: 'https://www.iso.org/standard/42001',
  kabAimsIntroduction:
    'https://kab.or.kr/kor/bbs/B0000093/view.do?menuNo=400015&nttId=7211',
  kabKsa:
    'https://www.kab.or.kr/kor/kcn/kcn/view.do?menuNo=400049&orgIdx=171',
  kabKfq:
    'https://www.kab.or.kr/kor/kcn/kcn/view.do?menuNo=400049&orgIdx=150',
  kolas17065:
    'https://knab.go.kr/usr/gud/kas/KasRelateLawStdrInfo.do',
} as const);

export interface FR235ExternalAssuranceRouteQualification {
  readonly schemaVersion: 'fr235-external-assurance-route-qualification-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR235_CONTRACT_VERSION;
  readonly predecessorContractVersion: typeof FR234_CONTRACT_VERSION;
  readonly routeState:
    'external_assurance_routes_qualified_no_certification_or_interpretation_validity_claim_issued';
  readonly routes: {
    readonly aiGovernance: {
      readonly standard: 'ISO/IEC 42001:2023';
      readonly purpose: 'AI management system governance';
      readonly applicableToOrganizationsDevelopingProvidingOrUsingAI: true;
      readonly kabSchemeOperational: true;
      readonly candidateCertificationBodies: readonly [
        {
          readonly name: 'Korean Standards Association (KSA)';
          readonly kabAccreditation: 'KAB-AI-02';
        },
        {
          readonly name: 'Korean Foundation for Quality (KFQ)';
          readonly kabAccreditation: 'KAB-AI-07';
        },
      ];
      readonly selectedAsFirstActionableRoute: true;
      readonly certifiesPhysiognomyTruth: false;
      readonly certifiesInterpretationAccuracy: false;
    };
    readonly processServiceConformity: {
      readonly basis: 'KS Q ISO/IEC 17065';
      readonly kolasCoversProductsProcessesAndServices: true;
      readonly applicableSchemeForMyeongHaConfirmed: false;
      readonly certificationEligibilityConfirmed: false;
      readonly requiresSchemeOwnerOrCertificationBodyConfirmation: true;
    };
    readonly empiricalValidation: {
      readonly independentStudyOrTestRequired: true;
      readonly substitutedByISO42001: false;
      readonly constructValidityEstablished: false;
      readonly repeatabilityEstablished: false;
      readonly predictiveValidityEstablished: false;
    };
  };
  readonly nextExternalAction: {
    readonly action:
      'submit_scope_inquiry_to_kab_accredited_iso42001_certification_body';
    readonly askWhetherMyeongHaCanBeIncludedInAimsScope: true;
    readonly askOrganizationalPrerequisites: true;
    readonly askRequiredDocumentsAndAuditReadiness: true;
    readonly preferredInitialCandidate: 'Korean Standards Association (KSA)';
    readonly alternativeCandidate: 'Korean Foundation for Quality (KFQ)';
  };
  readonly authorityBoundary: {
    readonly personalFaceReadingQualificationIssued: false;
    readonly iso42001Certified: false;
    readonly externalAuditCompleted: false;
    readonly interpretationSystemExternallyValidated: false;
    readonly physiognomyScientificallyValidated: false;
    readonly processOrServiceConformityCertified: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly empiricalSufficiencyEstablished: false;
    readonly calibrationAuthorized: false;
    readonly traditionalBindingIssued: false;
    readonly productionAuthorityExpanded: false;
    readonly commerceAuthorityExpanded: false;
  };
  readonly qualificationDigest: string;
  readonly qualificationRef: string;
}

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-235 ${message}`);
}

function digest(value: unknown): string {
  return `sha256:${createHash('sha256')
    .update(JSON.stringify(value), 'utf8')
    .digest('hex')}`;
}

export function qualifyExternalAssuranceRoutesFR235():
FR235ExternalAssuranceRouteQualification {
  const material = {
    predecessorContractVersion: FR234_CONTRACT_VERSION,
    sources: FR235_OFFICIAL_SOURCES,
    routes: {
      aiGovernance: {
        standard: 'ISO/IEC 42001:2023',
        candidateAccreditations: ['KAB-AI-02', 'KAB-AI-07'],
      },
      processServiceConformity: {
        basis: 'KS Q ISO/IEC 17065',
        applicableSchemeConfirmed: false,
      },
      empiricalValidation: {
        independentStudyOrTestRequired: true,
        substitutedByISO42001: false,
      },
    },
  };
  const qualificationDigest = digest(material);

  const result: FR235ExternalAssuranceRouteQualification = Object.freeze({
    schemaVersion: 'fr235-external-assurance-route-qualification-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR235_CONTRACT_VERSION,
    predecessorContractVersion: FR234_CONTRACT_VERSION,
    routeState:
      'external_assurance_routes_qualified_no_certification_or_interpretation_validity_claim_issued' as const,
    routes: Object.freeze({
      aiGovernance: Object.freeze({
        standard: 'ISO/IEC 42001:2023' as const,
        purpose: 'AI management system governance' as const,
        applicableToOrganizationsDevelopingProvidingOrUsingAI: true as const,
        kabSchemeOperational: true as const,
        candidateCertificationBodies: Object.freeze([
          Object.freeze({
            name: 'Korean Standards Association (KSA)' as const,
            kabAccreditation: 'KAB-AI-02' as const,
          }),
          Object.freeze({
            name: 'Korean Foundation for Quality (KFQ)' as const,
            kabAccreditation: 'KAB-AI-07' as const,
          }),
        ]),
        selectedAsFirstActionableRoute: true as const,
        certifiesPhysiognomyTruth: false as const,
        certifiesInterpretationAccuracy: false as const,
      }),
      processServiceConformity: Object.freeze({
        basis: 'KS Q ISO/IEC 17065' as const,
        kolasCoversProductsProcessesAndServices: true as const,
        applicableSchemeForMyeongHaConfirmed: false as const,
        certificationEligibilityConfirmed: false as const,
        requiresSchemeOwnerOrCertificationBodyConfirmation: true as const,
      }),
      empiricalValidation: Object.freeze({
        independentStudyOrTestRequired: true as const,
        substitutedByISO42001: false as const,
        constructValidityEstablished: false as const,
        repeatabilityEstablished: false as const,
        predictiveValidityEstablished: false as const,
      }),
    }),
    nextExternalAction: Object.freeze({
      action:
        'submit_scope_inquiry_to_kab_accredited_iso42001_certification_body' as const,
      askWhetherMyeongHaCanBeIncludedInAimsScope: true as const,
      askOrganizationalPrerequisites: true as const,
      askRequiredDocumentsAndAuditReadiness: true as const,
      preferredInitialCandidate: 'Korean Standards Association (KSA)' as const,
      alternativeCandidate: 'Korean Foundation for Quality (KFQ)' as const,
    }),
    authorityBoundary: Object.freeze({
      personalFaceReadingQualificationIssued: false as const,
      iso42001Certified: false as const,
      externalAuditCompleted: false as const,
      interpretationSystemExternallyValidated: false as const,
      physiognomyScientificallyValidated: false as const,
      processOrServiceConformityCertified: false as const,
      empiricalRepeatabilityEstablished: false as const,
      empiricalSufficiencyEstablished: false as const,
      calibrationAuthorized: false as const,
      traditionalBindingIssued: false as const,
      productionAuthorityExpanded: false as const,
      commerceAuthorityExpanded: false as const,
    }),
    qualificationDigest,
    qualificationRef:
      `evidence.fr235.external_assurance_route_qualification:${qualificationDigest.slice('sha256:'.length)}`,
  });

  ISSUED.add(result);
  return result;
}

export function assertExternalAssuranceRouteQualificationFR235(
  value: FR235ExternalAssuranceRouteQualification,
): void {
  if (!ISSUED.has(value)) fail('qualification was not issued by active FR235 runtime.');
  if (
    value.contractVersion !== FR235_CONTRACT_VERSION
    || value.predecessorContractVersion !== FR234_CONTRACT_VERSION
    || value.routes.aiGovernance.selectedAsFirstActionableRoute !== true
    || value.routes.aiGovernance.certifiesPhysiognomyTruth !== false
    || value.routes.aiGovernance.certifiesInterpretationAccuracy !== false
    || value.routes.processServiceConformity.applicableSchemeForMyeongHaConfirmed !== false
    || value.routes.processServiceConformity.certificationEligibilityConfirmed !== false
    || value.routes.empiricalValidation.substitutedByISO42001 !== false
    || Object.values(value.authorityBoundary).some((entry) => entry !== false)
  ) fail('external-assurance route authority boundary drift.');
}
