import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  PREVIEW_E2E_APPROVAL,
  PREVIEW_E2E_AUTHORITY_VERSION,
} from '../preview/preview-authority.js';
import {
  resolvePreviewConsumerReadingAuthorityV1,
} from '../preview/preview-official-reading-consumer-authority.js';
import {
  createApprovedPreviewE2eProductHost,
  PREVIEW_E2E_RUNTIME_VERSION,
} from '../preview/preview-product-host.js';
import {
  requirePreviewSemanticAdmissionV1,
} from '../preview/preview-semantic-admission.js';
import {
  calculateAuthorizedMyeonghwaProductionSnapshot,
} from '../production/production-calculation-runtime.js';
import {
  executeProductReading,
} from '../reading/governed-reading-execution.js';
import {
  buildProductReadingDelivery,
} from '../reading/product-reading-delivery.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
} from './relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceOfficialReadingAdmissionReview,
} from './relationship-spouse-t8-day-branch-palace-official-reading-admission-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
  runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution,
} from './relationship-spouse-t8-day-branch-palace-project-governed-narrative-materialization.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_OFFICIAL_READING_ADMISSION_IMPLEMENTATION_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-official-reading-admission-implementation-v1' as const;

const SPOUSE_INTENT = Object.freeze({
  domain: 'relationship',
  temporalScope: 'natal',
  relationshipScope: 'spouse',
} as const);

function birthInput() {
  return {
    calendarType: 'solar',
    date: { year: 1992, month: 10, day: 24 },
    time: { known: true, hour: 5, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  } as const;
}

function hostBody() {
  return {
    birth: {
      calendarType: 'solar',
      date: '1992-10-24',
      time: '05:30',
      sex: 'unspecified',
    },
    reading: {
      text: '배우자운',
    },
  } as const;
}

export async function buildRelationshipSpouseT8DayBranchPalaceOfficialReadingAdmissionImplementation() {
  const upstream =
    await buildRelationshipSpouseT8DayBranchPalaceOfficialReadingAdmissionReview();

  const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot(
    birthInput(),
    { now: new Date('2026-10-03T06:40:00.000Z') },
  ).snapshot;
  const interpretation =
    await runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution(
      snapshot,
      {
        requestId: 'sa5w-official-reading-implementation',
        now: new Date('2026-10-03T06:41:00.000Z'),
      },
    );

  const execution = await executeProductReading(
    snapshot,
    interpretation,
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
    {
      requestId: 'sa5w-official-reading-implementation',
      text: '배우자운',
    },
    {
      outputSchemaVersion: 'myeonghwa-narrative-draft-v1',
      readingVersion: PREVIEW_E2E_RUNTIME_VERSION,
      artifactGeneratedAt: new Date('2026-10-03T06:42:00.000Z'),
    },
  );
  const delivery = buildProductReadingDelivery(execution);
  const hostResponse = await createApprovedPreviewE2eProductHost().requestReading(
    hostBody(),
  );

  const authority = resolvePreviewConsumerReadingAuthorityV1(SPOUSE_INTENT);
  const admission = requirePreviewSemanticAdmissionV1(
    'RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE',
    'relationship:natal:spouse',
  );

  const executionEncoded = JSON.stringify(execution);
  const deliveryEncoded = JSON.stringify(delivery);
  const hostEncoded = JSON.stringify(hostResponse);

  const upstreamAdmissionEligibilityExact =
    upstream.officialReadingAdmissionEligible === true &&
    upstream.decision ===
      'POSITION_ONLY_OFFICIAL_READING_ADMISSION_ELIGIBLE' &&
    upstream.nextDisposition ===
      'RUN_SA_5W_POSITION_ONLY_OFFICIAL_READING_ADMISSION_IMPLEMENTATION' &&
    upstream.blockers.length === 0;

  const officialSurfaceIncludesSpouseExactly =
    PREVIEW_E2E_AUTHORITY_VERSION === 'myeonghwa-preview-e2e-authority-v3' &&
    PREVIEW_E2E_APPROVAL.officialReadingSections.includes(
      'relationship:natal:spouse',
    ) &&
    PREVIEW_E2E_APPROVAL.officialReadingSections.length === 6;

  const consumerAuthorityOfficialExact =
    authority.readingSection === 'relationship:natal:spouse' &&
    authority.authority === 'official_reading' &&
    authority.supportedOfficialReadingSection ===
      'relationship:natal:spouse';

  const semanticAdmissionPromotedExactly =
    admission.disposition === 'claim' &&
    admission.semanticScope ===
      'traditional_spouse_palace_day_branch_position_only' &&
    admission.boundaries.includes('POSITION_ONLY') &&
    admission.boundaries.includes('OFFICIAL_READING_PREVIEW_ALLOWED') &&
    !admission.boundaries.includes('LEGACY_NARRATIVE_PREVIEW_ONLY') &&
    !admission.boundaries.includes('NO_OFFICIAL_READING_PROMOTION') &&
    admission.effects.mayAffectProductionAuthority === false;

  const targetUnit = execution.canonicalSemantics?.units.find(
    (unit) =>
      execution.canonicalSemantics?.targetClaimIds.includes(unit.claimId) &&
      unit.role === 'primary',
  );

  const canonicalFactBindingExact =
    targetUnit !== undefined &&
    targetUnit.factRefs.length === 1 &&
    targetUnit.factRefs[0] === 'pillars.day';

  const mandatoryQualifierPreserved =
    targetUnit?.canonicalText?.headline ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE &&
    targetUnit.canonicalText.summary ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY &&
    targetUnit.semanticQualifiers?.length === 1 &&
    targetUnit.semanticQualifiers[0]?.canonicalText?.summary ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER;

  const officialExecutionExact =
    execution.state === 'completed' &&
    execution.consumerReadingAuthority?.authority === 'official_reading' &&
    execution.canonicalSemantics !== undefined &&
    execution.officialReadingPlan !== undefined &&
    execution.officialReadingReport !== undefined &&
    execution.artifact !== undefined &&
    execution.artifact.readingId.startsWith('official_reading_') &&
    execution.narrative === undefined &&
    execution.modelCalls === 0 &&
    execution.reasonCodes.length === 0;

  const legacyNarrativeNotInvoked =
    execution.narrative === undefined &&
    execution.modelCalls === 0 &&
    !executionEncoded.includes('deterministic_fallback') &&
    !executionEncoded.includes('model_first_pass');

  const prohibitedExpansionAbsent =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES.every(
      (phrase) =>
        !executionEncoded.includes(phrase) &&
        !deliveryEncoded.includes(phrase) &&
        !hostEncoded.includes(phrase),
    );

  const previewHostDeliveryExact =
    hostResponse.state === 'delivered' &&
    hostResponse.reading !== undefined &&
    hostResponse.reading.readingId.startsWith('official_reading_') &&
    hostEncoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
    ) &&
    hostEncoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    );

  const broaderAuthorityBoundariesClosed =
    PREVIEW_E2E_APPROVAL.lifecycle === 'preview' &&
    PREVIEW_E2E_APPROVAL.productionInterpretationAuthorityGranted === false &&
    PREVIEW_E2E_APPROVAL.commerceAuthorityGranted === false &&
    PREVIEW_E2E_APPROVAL.persistenceAuthorityGranted === false &&
    PREVIEW_E2E_APPROVAL.publicGeneralAvailabilityAuthorityGranted === false &&
    authority.constraints.mayPromoteProductionInterpretationAuthority ===
      false &&
    authority.constraints.mayGrantPersistenceAuthority === false &&
    authority.constraints.mayGrantPublicGeneralAvailabilityAuthority === false;

  const checks = Object.freeze({
    upstreamAdmissionEligibilityExact,
    officialSurfaceIncludesSpouseExactly,
    consumerAuthorityOfficialExact,
    semanticAdmissionPromotedExactly,
    canonicalFactBindingExact,
    mandatoryQualifierPreserved,
    officialExecutionExact,
    legacyNarrativeNotInvoked,
    prohibitedExpansionAbsent,
    previewHostDeliveryExact,
    broaderAuthorityBoundariesClosed,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5W_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const implementationEstablished = blockers.length === 0;

  const material = Object.freeze({
    implementationVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_OFFICIAL_READING_ADMISSION_IMPLEMENTATION_VERSION,
    issue: '#2046' as const,
    track: 'saju-bridge' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    claimType:
      'relationship.spouse.traditional_spouse_palace_position' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    semanticScope: 'position_only' as const,
    upstreamReviewId: upstream.reviewId,
    checks,
    blockers,
    implementationEstablished,
    decision: implementationEstablished
      ? ('POSITION_ONLY_OFFICIAL_READING_ADMISSION_IMPLEMENTED' as const)
      : ('HOLD_AND_REPAIR_SA_5W_OFFICIAL_READING_ADMISSION_IMPLEMENTATION' as const),
    authorityBoundary: Object.freeze({
      exactPositionOnlyOfficialReadingAdmissionImplemented:
        implementationEstablished,
      officialReadingPreviewAuthorityAuthorized:
        implementationEstablished,
      legacyNarrativeRuntimeRequiredForSpouse: false as const,
      publicSemanticAuthorityAuthorized: false as const,
      commerceAuthorityAuthorized: false as const,
      persistenceAuthorityAuthorized: false as const,
      publicGeneralAvailabilityAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      externalHumanDomainReviewRequired: false as const,
      reviewAttestationRequired: false as const,
      reviewerTrustContextRequired: false as const,
      reviewerTrustGrantRequired: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: implementationEstablished
      ? ('RUN_SA_5X_POSITION_ONLY_OFFICIAL_READING_DELIVERY_AUTHORITY_REVIEW' as const)
      : ('HOLD_AND_REPAIR_SA_5W_OFFICIAL_READING_ADMISSION_IMPLEMENTATION' as const),
  });

  return Object.freeze({
    implementationId: deterministicContentHash(material),
    ...material,
    execution,
    delivery,
    hostResponse,
  });
}
