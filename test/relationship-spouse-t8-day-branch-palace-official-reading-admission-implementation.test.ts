import { beforeAll, describe, expect, test } from 'vitest';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceOfficialReadingAdmissionImplementation,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_OFFICIAL_READING_ADMISSION_IMPLEMENTATION_VERSION,
} from '../src/research/relationship-spouse-t8-day-branch-palace-official-reading-admission-implementation.js';

const SETUP_TIMEOUT_MS = 180_000;

type Result = Awaited<
  ReturnType<
    typeof buildRelationshipSpouseT8DayBranchPalaceOfficialReadingAdmissionImplementation
  >
>;

describe('SA-5W spouse position-only Official Reading admission implementation', () => {
  let result: Result;

  beforeAll(async () => {
    result =
      await buildRelationshipSpouseT8DayBranchPalaceOfficialReadingAdmissionImplementation();
  }, SETUP_TIMEOUT_MS);

  test('implements the exact bounded Official Reading Preview capability', () => {
    expect(result.implementationVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_OFFICIAL_READING_ADMISSION_IMPLEMENTATION_VERSION,
    );
    expect(result.issue).toBe('#2046');
    expect(result.capabilityKey).toBe('relationship:natal:spouse');
    expect(result.semanticScope).toBe('position_only');
    expect(result.blockers).toEqual([]);
    expect(result.implementationEstablished).toBe(true);
    expect(result.decision).toBe(
      'POSITION_ONLY_OFFICIAL_READING_ADMISSION_IMPLEMENTED',
    );
    expect(result.nextDisposition).toBe(
      'RUN_SA_5X_POSITION_ONLY_OFFICIAL_READING_DELIVERY_AUTHORITY_REVIEW',
    );
    expect(result.implementationId).toMatch(/^[a-f0-9]{64}$/u);
  });

  test('executes through Official Reading with no legacy Narrative model call', () => {
    expect(result.checks.officialExecutionExact).toBe(true);
    expect(result.checks.legacyNarrativeNotInvoked).toBe(true);
    expect(result.execution.state).toBe('completed');
    expect(result.execution.consumerReadingAuthority).toMatchObject({
      readingSection: 'relationship:natal:spouse',
      authority: 'official_reading',
      supportedOfficialReadingSection: 'relationship:natal:spouse',
    });
    expect(result.execution.modelCalls).toBe(0);
    expect(result.execution.narrative).toBeUndefined();
    expect(result.execution.canonicalSemantics).toBeDefined();
    expect(result.execution.officialReadingPlan).toBeDefined();
    expect(result.execution.officialReadingReport).toBeDefined();
    expect(result.execution.artifact?.readingId).toMatch(/^official_reading_/u);
  });

  test('preserves pillars.day as the only direct fact and the mandatory qualifier', () => {
    expect(result.checks.canonicalFactBindingExact).toBe(true);
    expect(result.checks.mandatoryQualifierPreserved).toBe(true);

    const semantics = result.execution.canonicalSemantics;
    expect(semantics).toBeDefined();
    const primary = semantics?.units.find((unit) => unit.role === 'primary');
    expect(primary?.factRefs).toEqual(['pillars.day']);
    expect(primary?.canonicalText?.summary).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
    );
    expect(primary?.semanticQualifiers?.[0]?.canonicalText?.summary).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    );
  });

  test('delivers the same bounded meaning through the actual Preview host', () => {
    expect(result.checks.previewHostDeliveryExact).toBe(true);
    expect(result.hostResponse.state).toBe('delivered');
    expect(result.hostResponse.reading?.readingId).toMatch(/^official_reading_/u);

    const encoded = JSON.stringify(result.hostResponse);
    expect(encoded).toContain(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
    );
    expect(encoded).toContain(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    );
    for (const prohibited of RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES) {
      expect(encoded).not.toContain(prohibited);
    }
  });

  test('keeps every broader authority boundary closed', () => {
    expect(result.checks.broaderAuthorityBoundariesClosed).toBe(true);
    expect(result.authorityBoundary).toEqual({
      exactPositionOnlyOfficialReadingAdmissionImplemented: true,
      officialReadingPreviewAuthorityAuthorized: true,
      legacyNarrativeRuntimeRequiredForSpouse: false,
      publicSemanticAuthorityAuthorized: false,
      commerceAuthorityAuthorized: false,
      persistenceAuthorityAuthorized: false,
      publicGeneralAvailabilityAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      externalHumanDomainReviewRequired: false,
      reviewAttestationRequired: false,
      reviewerTrustContextRequired: false,
      reviewerTrustGrantRequired: false,
      production: 'HOLD',
    });
  });
});
