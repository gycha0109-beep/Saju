import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildClaimNarrativePlan } from '../src/narrative/claim-narrative-profile.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { prepareProductReading } from '../src/reading/product-reading-integration.js';
import { CAREER_NATAL_CLAIM_NARRATIVE_PROFILES } from '../src/research/career-natal-narrative-profiles.js';
import { createCareerNatalReadingCandidateRegistry } from '../src/research/career-natal-reading-candidate.js';
import { assertCareerResearchPreviewEvidenceIsolation } from '../src/research/career-research-preview-isolation.js';
import { deriveDomainInterpretationSignatures } from '../src/verification/domain-interpretation-signature.js';

const FIXED_CALCULATION_TIME = new Date('2026-08-28T00:00:00.000Z');
const FIXED_INTERPRETATION_TIME = new Date('2026-08-28T00:01:00.000Z');
const SYNTHETIC_HOURS = [0, 3, 6, 9, 12, 15, 18, 21] as const;
const MAX_SCANNED_CASES = 128;
const TARGET_DISTINCT_SIGNATURES = 8;

const integrationOptions = {
  narrativePolicyRef: {
    id: 'myeonghwa-narrative-policy',
    version: '1.0.0-p7-repeat-diagnostics',
  },
  outputSchemaVersion: 'myeonghwa-narrative-draft-v1',
} as const;

interface Occurrence {
  caseId: string;
  interpretationSignature: string;
  claimType: string;
  profileId: string;
  profileVersion: string;
  axis: string;
  order: number;
  sectionTitle: string;
  assertionText: string;
}

interface DiagnosticReading {
  caseId: string;
  interpretationSignature: string;
  occurrences: readonly Occurrence[];
}

interface RepeatGroup {
  text: string;
  occurrenceCount: number;
  caseIds: string[];
  claimTypes: string[];
  profileRefs: string[];
  classification: 'shared_profile_reuse' | 'cross_profile_copy_collision';
}

function repeatGroups(
  readings: readonly DiagnosticReading[],
  selectText: (occurrence: Occurrence) => string,
): readonly RepeatGroup[] {
  const byText = new Map<string, Occurrence[]>();
  for (const reading of readings) {
    for (const occurrence of reading.occurrences) {
      const text = selectText(occurrence);
      const group = byText.get(text) ?? [];
      group.push(occurrence);
      byText.set(text, group);
    }
  }

  return [...byText.entries()]
    .map(([text, occurrences]) => {
      const caseIds = [...new Set(occurrences.map((value) => value.caseId))].sort();
      if (caseIds.length < 2) return null;
      const claimTypes = [...new Set(occurrences.map((value) => value.claimType))].sort();
      const profileRefs = [
        ...new Set(
          occurrences.map((value) => `${value.profileId}@${value.profileVersion}`),
        ),
      ].sort();
      return {
        text,
        occurrenceCount: occurrences.length,
        caseIds,
        claimTypes,
        profileRefs,
        classification:
          claimTypes.length === 1 && profileRefs.length === 1
            ? ('shared_profile_reuse' as const)
            : ('cross_profile_copy_collision' as const),
      };
    })
    .filter((value): value is RepeatGroup => value !== null)
    .sort((left, right) => right.occurrenceCount - left.occurrenceCount || left.text.localeCompare(right.text));
}

function sameReadingDuplicateTitleGroups(readings: readonly DiagnosticReading[]) {
  return readings.flatMap((reading) => {
    const byTitle = new Map<string, Occurrence[]>();
    for (const occurrence of reading.occurrences) {
      const group = byTitle.get(occurrence.sectionTitle) ?? [];
      group.push(occurrence);
      byTitle.set(occurrence.sectionTitle, group);
    }
    return [...byTitle.entries()]
      .filter(([, occurrences]) => occurrences.length > 1)
      .map(([title, occurrences]) => ({
        caseId: reading.caseId,
        title,
        claimTypes: [...new Set(occurrences.map((value) => value.claimType))].sort(),
        profileRefs: [
          ...new Set(
            occurrences.map((value) => `${value.profileId}@${value.profileVersion}`),
          ),
        ].sort(),
      }));
  });
}

describe('P7 Career preview repeat diagnostics', () => {
  it('classifies exact repeated copy by profile provenance and rejects duplicate channel section titles', () => {
    const registry = createCareerNatalReadingCandidateRegistry(
      FIXED_CALCULATION_TIME.toISOString(),
    );
    const bySignature = new Map<string, DiagnosticReading>();
    let scannedCases = 0;

    outer: for (let month = 1; month <= 12; month += 1) {
      for (let day = 1; day <= 28; day += 1) {
        for (const hour of SYNTHETIC_HOURS) {
          scannedCases += 1;
          const caseId = `p7-repeat-${String(scannedCases).padStart(4, '0')}`;
          const snapshot = calculateCanonicalSajuSnapshot(
            {
              calendarType: 'solar',
              date: { year: 2024, month, day },
              time: { known: true, hour, minute: 0 },
              sexForTraditionalCalculation: 'unspecified',
            },
            PRODUCTION_DEFAULT_CALCULATION_POLICY,
            { now: FIXED_CALCULATION_TIME },
          );
          const execution = runInterpretation(snapshot, registry, {
            requestId: caseId,
            now: FIXED_INTERPRETATION_TIME,
          });
          const prepared = prepareProductReading(
            snapshot,
            execution,
            registry,
            { requestId: caseId, text: '직업운' },
            integrationOptions,
          );

          if (
            prepared.state !== 'ready_for_narrative' ||
            prepared.composition === undefined ||
            prepared.narrativeRequest === undefined
          ) {
            if (scannedCases >= MAX_SCANNED_CASES) break outer;
            continue;
          }

          assertCareerResearchPreviewEvidenceIsolation(prepared.narrativeRequest.evidenceBundle);
          const signatures = deriveDomainInterpretationSignatures(
            execution.claims,
            execution.claimRelations,
            prepared.composition.selection,
          );
          expect(signatures).toHaveLength(1);
          const signature = signatures[0];
          if (signature === undefined) throw new Error(`Missing Career signature for ${caseId}.`);

          if (!bySignature.has(signature.signature)) {
            const plan = buildClaimNarrativePlan(
              prepared.narrativeRequest.evidenceBundle,
              CAREER_NATAL_CLAIM_NARRATIVE_PROFILES,
            );
            bySignature.set(signature.signature, {
              caseId,
              interpretationSignature: signature.signature,
              occurrences: plan.items.map((item) => ({
                caseId,
                interpretationSignature: signature.signature,
                claimType: item.claimType,
                profileId: item.profileRef.id,
                profileVersion: item.profileRef.version,
                axis: item.axis,
                order: item.order,
                sectionTitle: item.sectionTitle,
                assertionText: item.assertionText,
              })),
            });
          }

          if (
            bySignature.size >= TARGET_DISTINCT_SIGNATURES ||
            scannedCases >= MAX_SCANNED_CASES
          ) {
            break outer;
          }
        }
      }
    }

    const readings = [...bySignature.values()];
    expect(readings).toHaveLength(TARGET_DISTINCT_SIGNATURES);

    const assertionGroups = repeatGroups(readings, (value) => value.assertionText);
    const titleGroups = repeatGroups(readings, (value) => value.sectionTitle);
    const sameReadingTitleDuplicates = sameReadingDuplicateTitleGroups(readings);
    const crossProfileAssertionCollisions = assertionGroups.filter(
      (group) => group.classification === 'cross_profile_copy_collision',
    );
    const sharedProfileAssertionReuse = assertionGroups.filter(
      (group) => group.classification === 'shared_profile_reuse',
    );
    const crossProfileTitleCollisions = titleGroups.filter(
      (group) => group.classification === 'cross_profile_copy_collision',
    );

    expect(assertionGroups.length).toBeGreaterThan(0);
    expect(sharedProfileAssertionReuse.length).toBe(assertionGroups.length);
    expect(crossProfileAssertionCollisions).toEqual([]);
    expect(crossProfileTitleCollisions).toEqual([]);
    expect(sameReadingTitleDuplicates).toEqual([]);

    process.stdout.write(
      `P7_CAREER_REPEAT_DIAGNOSTICS ${JSON.stringify({
        scannedCases,
        distinctInterpretationSignatures: readings.length,
        repeatedAssertionGroupCount: assertionGroups.length,
        sharedProfileAssertionReuseGroupCount: sharedProfileAssertionReuse.length,
        crossProfileAssertionCollisionGroupCount: crossProfileAssertionCollisions.length,
        repeatedTitleGroupCount: titleGroups.length,
        crossProfileTitleCollisionGroupCount: crossProfileTitleCollisions.length,
        sameReadingDuplicateTitleGroupCount: sameReadingTitleDuplicates.length,
        assertionGroups,
        titleGroups,
        sameReadingTitleDuplicates,
        semanticAuthorityChanged: false,
        profileCopyChanged: true,
        productionBehaviorChanged: false,
      })}\n`,
    );
  });
});
