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
  ksaAiPlus:
    'https://knqac.ksa.or.kr/ksa_kr/6962/subview.do',
  ksaIso42001:
    'https://iso.ksa.or.kr/ksa_kr/7674/subview.do',
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
    readonly productServiceQuality: {
      readonly scheme: 'KSA AI+ certification';
      readonly certificationBody: 'Korean Standards Association (KSA)';
      readonly testingBody: 'Wisestone';
      readonly targetIncludesAiSoftwareServicesAndIctProducts: true;
      readonly managementReviewUsesISO42001: true;
      readonly productTestingReferencesISOIEC25059And25051: true;
      readonly selectedAsFirstSystemLevelInquiry: true;
      readonly eligibilityForMyeongHaConfirmed: false;
      readonly certificationObtained: false;
      readonly certifiesPhysiognomyTruth: false;
      readonly certifiesInterpretationAccuracy: false;
    };
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
      readonly selectedAsParallelGovernanceRoute: true;
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
      readonly substitutedByAIPlus: false;
      readonly substitutedByISO42001: false;
      readonly constructValidityEstablished: false;
      readonly repeatabilityEstablished: false;
      readonly predictiveValidityEstablished: false;
    };
  };
  readonly nextExternalAction: {
    readonly action:
      'submit_myeongha_scope_inquiry_to_ksa_ai_plus_and_iso42001_certification_center';
    readonly askWhetherMyeongHaQualifiesForAIPlus: true;
    readonly askWhetherMyeongHaCanBeIncludedInAimsScope: true;
    readonly askOrganizationalPrerequisites: true;
    readonly askRequiredDocumentsTestingAndAuditReadiness: true;
    readonly initialContact: 'Korean Standards Association (KSA)';
    readonly contactEmail: 'aicert01@ksa.or.kr';
  };
  readonly authorityBoundary: {
    readonly personalFaceReadingQualificationIssued: false;
    readonly aiPlusCertified: false;
    readonly iso42001Certified: false;
    readonly externalAuditCompleted: false;
    readonly externalProductTestingCompleted: false;
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
      productServiceQuality: {
        scheme: 'KSA AI+ certification',
        eligibilityForMyeongHaConfirmed: false,
      },
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
        substitutedByAIPlus: false,
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
      productServiceQuality: Object.freeze({
        scheme: 'KSA AI+ certification' as const,
        certificationBody: 'Korean Standards Association (KSA)' as const,
        testingBody: 'Wisestone' as const,
        targetIncludesAiSoftwareServicesAndIctProducts: true as const,
        managementReviewUsesISO42001: true as const,
        productTestingReferencesISOIEC25059And25051: true as const,
        selectedAsFirstSystemLevelInquiry: true as const,
        eligibilityForMyeongHaConfirmed: false as const,
        certificationObtained: false as const,
        certifiesPhysiognomyTruth: false as const,
        certifiesInterpretationAccuracy: false as const,
      }),
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
        ] as const),
        selectedAsParallelGovernanceRoute: true as const,
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
        substitutedByAIPlus: false as const,
        substitutedByISO42001: false as const,
        constructValidityEstablished: false as const,
        repeatabilityEstablished: false as const,
        predictiveValidityEstablished: false as const,
      }),
    }),
    nextExternalAction: Object.freeze({
      action:
        'submit_myeongha_scope_inquiry_to_ksa_ai_plus_and_iso42001_certification_center' as const,
      askWhetherMyeongHaQualifiesForAIPlus: true as const,
      askWhetherMyeongHaCanBeIncludedInAimsScope: true as const,
      askOrganizationalPrerequisites: true as const,
      askRequiredDocumentsTestingAndAuditReadiness: true as const,
      initialContact: 'Korean Standards Association (KSA)' as const,
      contactEmail: 'aicert01@ksa.or.kr' as const,
    }),
    authorityBoundary: Object.freeze({
      personalFaceReadingQualificationIssued: false as const,
      aiPlusCertified: false as const,
      iso42001Certified: false as const,
      externalAuditCompleted: false as const,
      externalProductTestingCompleted: false as const,
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
    || value.routes.productServiceQuality.selectedAsFirstSystemLevelInquiry !== true
    || value.routes.productServiceQuality.eligibilityForMyeongHaConfirmed !== false
    || value.routes.productServiceQuality.certificationObtained !== false
    || value.routes.productServiceQuality.certifiesPhysiognomyTruth !== false
    || value.routes.productServiceQuality.certifiesInterpretationAccuracy !== false
    || value.routes.aiGovernance.selectedAsParallelGovernanceRoute !== true
    || value.routes.aiGovernance.certifiesPhysiognomyTruth !== false
    || value.routes.aiGovernance.certifiesInterpretationAccuracy !== false
    || value.routes.processServiceConformity.applicableSchemeForMyeongHaConfirmed !== false
    || value.routes.processServiceConformity.certificationEligibilityConfirmed !== false
    || value.routes.empiricalValidation.substitutedByAIPlus !== false
    || value.routes.empiricalValidation.substitutedByISO42001 !== false
    || Object.values(value.authorityBoundary).some((entry) => entry !== false)
  ) fail('external-assurance route authority boundary drift.');
}
