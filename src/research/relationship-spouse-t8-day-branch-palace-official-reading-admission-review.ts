import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  PREVIEW_E2E_APPROVAL,
} from '../preview/preview-authority.js';
import {
  resolvePreviewConsumerReadingAuthorityV1,
} from '../preview/preview-official-reading-consumer-authority.js';
import {
  PREVIEW_SEMANTIC_ADMISSION_REGISTRY_VERSION,
  requirePreviewSemanticAdmissionV1,
} from '../preview/preview-semantic-admission.js';
import {
  calculateAuthorizedMyeonghwaProductionSnapshot,
} from '../production/production-calculation-runtime.js';
import {
  buildCanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticQualifierBindingV1,
  type CanonicalReadingSemanticTextBindingV1,
} from '../reading/canonical-reading-semantics.js';
import {
  buildOfficialReadingPlanV1,
} from '../reading/official-reading-plan.js';
import {
  canRenderOfficialReadingV1,
  renderOfficialReadingV1,
} from '../reading/official-reading-renderer.js';
import {
  buildOfficialReadingCharacterGroundingV1,
} from '../reading/official-reading-reader-parity.js';
import {
  buildReadingCompositionEvidence,
} from '../reading/reading-profile-authorization.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
} from './relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
} from './relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';
import {
  buildRelationshipSpouseT8DayBranchPalacePreviewDeliveryAuthorityReview,
} from './relationship-spouse-t8-day-branch-palace-preview-delivery-authority-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
  runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution,
} from './relationship-spouse-t8-day-branch-palace-project-governed-narrative-materialization.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_OFFICIAL_READING_ADMISSION_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-official-reading-admission-review-v1' as const;

const NOW = '2026-10-03T05:40:00.000Z';

const SPOUSE_INTENT = Object.freeze({
  domain: 'relationship',
  temporalScope: 'natal',
  relationshipScope: 'spouse',
} as const);

const EXISTING_OFFICIAL_READING_SECTIONS = Object.freeze([
  'general:natal',
  'career:natal',
  'wealth:natal',
  'relationship:natal:general',
  'business:natal',
] as const);

const POSITION_ONLY_PROHIBITED_EXTENSIONS = Object.freeze([
  'NO_SPOUSE_PERSONALITY_OR_IDENTITY',
  'NO_SPOUSE_APPEARANCE_OR_OCCUPATION',
  'NO_MARRIAGE_TIMING_OR_OUTCOME',
  'NO_DIVORCE_OR_REMARRIAGE',
  'NO_FAVORABLE_UNFAVORABLE_SPOUSE_PALACE_JUDGMENT',
  'NO_YONGSHIN_JISIN_SEMANTICS',
  'NO_SPOUSE_STAR_AUTO_SELECTION',
  'NO_SECOND_CHART_COMPATIBILITY',
] as const);

function exactArray(
  left: readonly string[],
  right: readonly string[],
): boolean {
  return (
    left.length === right.length &&
    left.every((value, index) => value === right[index])
  );
}

function spouseBirthInput() {
  return {
    calendarType: 'solar',
    date: { year: 1992, month: 10, day: 24 },
    time: { known: true, hour: 5, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  } as const;
}

async function buildIsolatedOfficialReadingProbe(
  response: unknown,
) {
  try {
    const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot(
      spouseBirthInput(),
      { now: new Date(NOW) },
    ).snapshot;
    const interpretation =
      await runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution(
        snapshot,
        {
          requestId: 'sa5v-official-reading-admission-shadow',
          now: new Date(NOW),
        },
      );
    const composition = buildReadingCompositionEvidence(
      snapshot,
      interpretation,
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
      {
        requestId: 'sa5v-official-reading-admission-composition',
        intent: SPOUSE_INTENT,
      },
    );
    const evidence = composition.evidence?.bundle;
    if (evidence === undefined) {
      return Object.freeze({
        ok: false as const,
        error: 'SA5V_GOVERNED_READING_EVIDENCE_MISSING',
      });
    }

    const claim = evidence.claims.find(
      (candidate) =>
        candidate.claimType ===
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
    );
    if (claim === undefined) {
      return Object.freeze({
        ok: false as const,
        error: 'SA5V_POSITION_ONLY_CLAIM_MISSING',
      });
    }

    const admission = requirePreviewSemanticAdmissionV1(
      'RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE',
      'relationship:natal:spouse',
    );
    const provenance = Object.freeze({
      admissionId: admission.admissionId,
      admissionRegistryVersion: PREVIEW_SEMANTIC_ADMISSION_REGISTRY_VERSION,
      researchId: admission.researchRef.researchId,
      researchVersion: admission.researchRef.observedVersion,
      authorityState: admission.researchRef.observedAuthorityState,
    });

    const semanticTextBindings: readonly CanonicalReadingSemanticTextBindingV1[] =
      Object.freeze([
        Object.freeze({
          targetClaimId: claim.claimId,
          canonicalText: Object.freeze({
            headline:
              RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
            summary:
              RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
          }),
          provenance,
        }),
      ]);

    const semanticQualifierBindings: readonly CanonicalReadingSemanticQualifierBindingV1[] =
      Object.freeze([
        Object.freeze({
          targetClaimId: claim.claimId,
          qualifier: Object.freeze({
            qualifierId:
              'sa5v_relationship_spouse_day_branch_palace_position_only_boundary_v1',
            kind: 'boundary' as const,
            semanticScope:
              'traditional_spouse_palace_day_branch_position_only_boundary',
            semanticKeys: Object.freeze([
              'relationship:spouse:traditional_spouse_palace_position:position_only',
            ]),
            canonicalText: Object.freeze({
              summary:
                RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
            }),
            prohibitedExtensions: POSITION_ONLY_PROHIBITED_EXTENSIONS,
            provenance,
          }),
        }),
      ]);

    const semantics = buildCanonicalReadingSemanticBundleV1({
      intent: SPOUSE_INTENT,
      evidence,
      targetClaimIds: composition.selection.targetClaimIds,
      semanticTextBindings,
      semanticQualifierBindings,
    });
    const plan = buildOfficialReadingPlanV1(semantics);
    const renderable = canRenderOfficialReadingV1(semantics, plan);
    const report = renderable
      ? renderOfficialReadingV1(semantics, plan)
      : undefined;
    if (report === undefined) {
      return Object.freeze({
        ok: false as const,
        error: 'SA5V_OFFICIAL_READING_NOT_RENDERABLE',
      });
    }
    const reader = buildOfficialReadingCharacterGroundingV1({
      response,
      semanticBundle: semantics,
      officialReadingReport: report,
      engineVersion: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_OFFICIAL_READING_ADMISSION_REVIEW_VERSION,
    });

    return Object.freeze({
      ok: true as const,
      snapshot,
      interpretation,
      composition,
      evidence,
      claim,
      admission,
      semanticTextBindings,
      semanticQualifierBindings,
      semantics,
      plan,
      report,
      reader,
    });
  } catch (error) {
    return Object.freeze({
      ok: false as const,
      error:
        error instanceof Error
          ? error.message
          : 'SA5V_UNKNOWN_ISOLATED_OFFICIAL_READING_PROBE_ERROR',
    });
  }
}

export async function buildRelationshipSpouseT8DayBranchPalaceOfficialReadingAdmissionReview() {
  const upstream =
    await buildRelationshipSpouseT8DayBranchPalacePreviewDeliveryAuthorityReview();
  const currentAuthority =
    resolvePreviewConsumerReadingAuthorityV1(SPOUSE_INTENT);
  const probe = await buildIsolatedOfficialReadingProbe(
    upstream.http.previewPayload,
  );

  const upstreamPreviewDeliveryAuthorityExact =
    upstream.deliveryAuthorityEstablished === true &&
    upstream.authorityReviewCompleted === true &&
    upstream.decision ===
      'AUTHORIZE_POSITION_ONLY_LEGACY_NARRATIVE_PREVIEW_DELIVERY' &&
    upstream.nextDisposition ===
      'RUN_SA_5V_POSITION_ONLY_OFFICIAL_READING_ADMISSION_REVIEW' &&
    upstream.blockers.length === 0 &&
    upstream.authorityBoundary.exactPositionOnlyPreviewDeliveryAuthorized ===
      true &&
    upstream.authorityBoundary.legacyNarrativePreviewLaneAuthorized === true &&
    upstream.authorityBoundary.officialReadingAuthorityAuthorized === false &&
    upstream.authorityBoundary.productionAuthorityAuthorized === false;

  const isolatedProbeCompleted = probe.ok;

  const evidenceSelectionExact =
    probe.ok &&
    probe.composition.selection.coverageState === 'complete' &&
    probe.composition.selection.profileAuthorization.state === 'authorized' &&
    probe.composition.selection.targetClaimIds.length === 1 &&
    probe.composition.selection.targetClaimIds[0] === probe.claim.claimId &&
    probe.claim.taxonomy.tier === 'T8' &&
    probe.claim.taxonomy.category === 'relationship' &&
    probe.claim.taxonomy.subcategory === 'spouse';

  const claimValue = probe.ok
    ? (probe.claim.value as
        | {
            position?: unknown;
            traditionalRole?: unknown;
            semanticScope?: unknown;
          }
        | undefined)
    : undefined;

  const canonicalFactBindingExact =
    probe.ok &&
    claimValue?.position === 'day_branch' &&
    claimValue.traditionalRole === 'spouse_palace' &&
    claimValue.semanticScope === 'position_only' &&
    exactArray(probe.claim.factRefs, ['pillars.day']);

  const targetUnit = probe.ok
    ? probe.semantics.units.find(
        (unit) => unit.claimId === probe.claim.claimId && unit.role === 'primary',
      )
    : undefined;

  const canonicalSemanticRepresentationAvailable =
    probe.ok &&
    targetUnit !== undefined &&
    targetUnit.claimType ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE &&
    targetUnit.canonicalText?.headline ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE &&
    targetUnit.canonicalText.summary ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY &&
    targetUnit.canonicalTextProvenance?.researchId ===
      'RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE' &&
    exactArray(targetUnit.factRefs, ['pillars.day']);

  const mandatoryQualifierPreserved =
    probe.ok &&
    targetUnit !== undefined &&
    targetUnit.semanticQualifiers?.length === 1 &&
    targetUnit.semanticQualifiers[0]?.canonicalText?.summary ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER &&
    POSITION_ONLY_PROHIBITED_EXTENSIONS.every((extension) =>
      targetUnit.prohibitedExtensions.includes(extension),
    );

  const officialPlanRepresentable =
    probe.ok &&
    probe.plan.readingDomain === 'relationship' &&
    probe.plan.sections.some(
      (section) => section.semanticGroup === 'relationship',
    ) &&
    probe.plan.sections.some(
      (section) => section.semanticGroup === 'limits',
    ) &&
    canRenderOfficialReadingV1(probe.semantics, probe.plan) === true;

  const reportEncoded = probe.ok
    ? JSON.stringify(probe.report.sections)
    : '';

  const officialRendererMeaningPreserved =
    probe.ok &&
    reportEncoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
    ) &&
    reportEncoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
    ) &&
    reportEncoded.includes(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    ) &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES.every(
      (phrase) => !reportEncoded.includes(phrase),
    ) &&
    POSITION_ONLY_PROHIBITED_EXTENSIONS.every(
      (extension) => !reportEncoded.includes(extension),
    );

  const groundingUnit =
    probe.ok && targetUnit !== undefined
      ? probe.reader.grounding.units.find((unit) =>
          unit.sourceCanonicalUnitRefs.includes(targetUnit.unitId),
        )
      : undefined;

  const readerGroundingMeaningPreserved =
    probe.ok &&
    targetUnit !== undefined &&
    groundingUnit !== undefined &&
    groundingUnit.axis === 'relationship' &&
    groundingUnit.canonicalMeaning ===
      [
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
      ].join('\n') &&
    POSITION_ONLY_PROHIBITED_EXTENSIONS.every((extension) =>
      groundingUnit.prohibitedExtensions.includes(extension),
    ) &&
    probe.reader.parity.semanticHash === probe.semantics.semanticHash &&
    probe.reader.parity.officialReportHash === probe.report.reportHash &&
    probe.reader.parity.groundingHash === probe.reader.grounding.groundingHash;

  const existingOfficialFiveUnchanged =
    exactArray(
      PREVIEW_E2E_APPROVAL.officialReadingSections,
      EXISTING_OFFICIAL_READING_SECTIONS,
    ) &&
    !(PREVIEW_E2E_APPROVAL.officialReadingSections as readonly string[]).includes(
      'relationship:natal:spouse',
    );

  const noAuthorityPromotionOccurred =
    currentAuthority.readingSection === 'relationship:natal:spouse' &&
    currentAuthority.authority === 'legacy_narrative' &&
    currentAuthority.supportedOfficialReadingSection === undefined &&
    PREVIEW_E2E_APPROVAL.supportedReadingSections.includes(
      'relationship:natal:spouse',
    ) &&
    existingOfficialFiveUnchanged;

  const protectedBoundariesClosed =
    upstream.authorityBoundary.officialReadingAuthorityAuthorized === false &&
    upstream.authorityBoundary.publicSemanticAuthorityAuthorized === false &&
    upstream.authorityBoundary.commerceAuthorityAuthorized === false &&
    upstream.authorityBoundary.persistenceAuthorityAuthorized === false &&
    upstream.authorityBoundary.publicGeneralAvailabilityAuthorityAuthorized ===
      false &&
    upstream.authorityBoundary.productionAuthorityAuthorized === false &&
    PREVIEW_E2E_APPROVAL.productionInterpretationAuthorityGranted === false &&
    PREVIEW_E2E_APPROVAL.commerceAuthorityGranted === false &&
    PREVIEW_E2E_APPROVAL.persistenceAuthorityGranted === false &&
    PREVIEW_E2E_APPROVAL.publicGeneralAvailabilityAuthorityGranted === false;

  const checks = Object.freeze({
    upstreamPreviewDeliveryAuthorityExact,
    isolatedProbeCompleted,
    evidenceSelectionExact,
    canonicalFactBindingExact,
    canonicalSemanticRepresentationAvailable,
    mandatoryQualifierPreserved,
    officialPlanRepresentable,
    officialRendererMeaningPreserved,
    readerGroundingMeaningPreserved,
    existingOfficialFiveUnchanged,
    noAuthorityPromotionOccurred,
    protectedBoundariesClosed,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5V_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const officialReadingAdmissionEligible = blockers.length === 0;

  const material = Object.freeze({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_OFFICIAL_READING_ADMISSION_REVIEW_VERSION,
    issue: '#2039' as const,
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
    officialReadingAdmissionEligible,
    authorityReviewCompleted: officialReadingAdmissionEligible,
    decision: officialReadingAdmissionEligible
      ? ('POSITION_ONLY_OFFICIAL_READING_ADMISSION_ELIGIBLE' as const)
      : ('HOLD_POSITION_ONLY_OFFICIAL_READING_ADMISSION' as const),
    authorityBoundary: Object.freeze({
      exactPositionOnlyCapability: officialReadingAdmissionEligible,
      isolatedCanonicalSemanticRepresentationEstablished:
        canonicalSemanticRepresentationAvailable,
      isolatedOfficialReadingPlanRepresentable: officialPlanRepresentable,
      isolatedOfficialReadingRendererCompatible:
        officialRendererMeaningPreserved,
      isolatedReaderGroundingCompatible: readerGroundingMeaningPreserved,
      officialReadingAdmissionEligible,
      officialReadingSurfaceMutationAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      previewDeliveryAuthorityPreserved: upstreamPreviewDeliveryAuthorityExact,
      legacyNarrativePreviewLanePreserved: noAuthorityPromotionOccurred,
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
    nextDisposition: officialReadingAdmissionEligible
      ? ('RUN_SA_5W_POSITION_ONLY_OFFICIAL_READING_ADMISSION_IMPLEMENTATION' as const)
      : ('HOLD_AND_REPAIR_SA_5V_OFFICIAL_READING_ADMISSION_REVIEW' as const),
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
    currentAuthority,
    upstream,
    probe,
  });
}
