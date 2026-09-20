import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import process from 'node:process';

import { admitEyePairProspectiveCaptureManifestFR159 } from '../.face-reading-dist/eye-pair-prospective-repeatability-protocol-fr159.js';
import {
  admitEyeCornerOrientationCandidateFR218,
  issueCaptureAdmissionFromFR159FR218,
} from '../.face-reading-dist/observable-morphology-validation-fr218.js';
import {
  materializeCandidateProvenanceEvidenceFR221,
  verifyPersistedCandidateProvenanceEvidenceFR221,
} from '../.face-reading-dist/observable-morphology-persisted-candidate-provenance-fr221.js';

function axis(axisKey, value) {
  return {
    axisKey,
    value,
    unit: 'ratio',
    sourceMetricRef: `neutral.fr221.smoke.${axisKey}@0.1.0`,
    semanticScope: 'closed_cycle_geometry_only',
    classificationApplied: false,
    thresholdApplied: false,
    calibrationApplied: false,
    traditionalBindingApplied: false,
    anatomicalInterpretationAllowed: false,
  };
}

function bundle(tilt, index) {
  return {
    schemaVersion: 'fr210-eye-neutral-axis-bundle-v1',
    artifactVersion: '0.1.0',
    contractVersion: 'FR210-EYE-NEUTRAL-AXIS-BUNDLE-v1',
    authorityState: 'reused_neutral_eye_geometry_axes_research_only',
    source: {
      fr77ProviderRunRef: `provider-run:fr221:smoke:${index}`,
      fr77CanonicalAssetDigest: `sha256:${String(index).padStart(64, '0')}`,
      fr158SchemaVersion: 'fr158-role-invariant-eye-pair-neutral-shape-metric-runtime-v1',
      fr178SchemaVersion: 'fr178-eye-pair-geometric-y-span-runtime-v1',
      fr209DerivationAttempted: true,
      fr207MayProceedWithoutNewAnatomicalResearch: true,
    },
    axes: {
      relativeHorizontalSpan: axis('relative_horizontal_span', 0.2),
      geometricVerticalToHorizontalRatio: axis('geometric_vertical_to_horizontal_ratio', 0.3),
      centroidSeparation: axis('centroid_separation', 0.4),
      closedCycleTurningAngle: axis('closed_cycle_turning_angle', 0.5),
      outerCornerTilt: {
        axisKey: 'outer_corner_tilt',
        value: tilt,
        unit: 'degree',
        sourceMetricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0',
        semanticScope: 'bilateral_visible_corner_geometry_only',
        classificationApplied: false,
        thresholdApplied: false,
        calibrationApplied: false,
        traditionalBindingApplied: false,
        anatomicalInterpretationAllowed: false,
      },
    },
    unsupportedImageTraits: [
      'eyelid_crease_category',
      'hooded_eyelid_category',
      'ocular_radiance_or_visible_brightness_quality',
    ],
    unresolvedProductSurface: ['product_individual_eye_asymmetry_surface'],
    authorityBoundary: {
      newAnatomicalResearchRequired: false,
      providerIndexToAnatomyBindingIssued: false,
      anatomicalLateralityIssued: false,
      physiologicalEyeApertureIssued: false,
      almondRoundNarrowClassifierIssued: false,
      upturnedDownturnedClassifierIssued: false,
      eyelidCreaseClassifierIssued: false,
      hoodedEyelidClassifierIssued: false,
      thresholdIssued: false,
      calibrationIssued: false,
      traditionalBindingIssued: false,
      productionActivated: false,
      commerceActivated: false,
    },
  };
}

function candidate(metricValue, index, partition) {
  const sampleRef = `sample:fr221:smoke:${index}`;
  const manifest = admitEyePairProspectiveCaptureManifestFR159({
    prospectiveCollectionRef: 'fr221:smoke:collection',
    captureSeriesRef: `fr221:smoke:series:${index}`,
    captureRef: `fr221:smoke:capture:${index}`,
    captureConditionRef: 'fr221:smoke:condition:mechanics-only',
    captureSequenceIndex: 1,
    postPreregistrationFreshCaptureAttested: true,
    sameParticipantSeriesAttested: true,
    usedForCandidateSelection: false,
    developmentCaptureReuse: false,
    identityMatchingPerformed: false,
  });
  const admitted = admitEyeCornerOrientationCandidateFR218(bundle(metricValue, index), {
    sampleRef,
    participantKey: `participant:fr221:smoke:${index}`,
    captureFamilyKey: `family:fr221:smoke:${index}`,
    partition,
    reviewItemRef: `review-item:fr221:smoke:${index}`,
    reviewArtifactRef: `review-artifact:fr221:smoke:${index}`,
    captureAdmission: issueCaptureAdmissionFromFR159FR218(manifest),
    confounderTags: ['synthetic_mechanics_only'],
  });
  if (admitted.status !== 'available') {
    throw new Error(`FR221 smoke candidate unavailable: ${admitted.reason}`);
  }
  return admitted.candidate;
}

async function verifyFile(path) {
  const parsed = JSON.parse(await readFile(path, 'utf8'));
  return verifyPersistedCandidateProvenanceEvidenceFR221(parsed);
}

async function runSmoke() {
  const dir = await mkdtemp(join(tmpdir(), 'fr221-'));
  const path = join(dir, 'candidate-evidence.json');
  try {
    const materialized = materializeCandidateProvenanceEvidenceFR221([
      candidate(-5, 1, 'selection'),
      candidate(-1, 2, 'selection'),
      candidate(2, 3, 'holdout'),
      candidate(6, 4, 'holdout'),
    ]);
    await writeFile(path, `${JSON.stringify(materialized, null, 2)}\n`, 'utf8');

    const verified = await verifyFile(path);
    const tampered = JSON.parse(await readFile(path, 'utf8'));
    tampered.records[0].metricValue += 100;
    await writeFile(path, `${JSON.stringify(tampered, null, 2)}\n`, 'utf8');

    let tamperRejected = false;
    try {
      await verifyFile(path);
    } catch {
      tamperRejected = true;
    }
    if (!tamperRejected) throw new Error('FR221 smoke expected persisted metric tamper rejection.');

    process.stdout.write(`${JSON.stringify({
      status: 'FR221_PERSISTED_CANDIDATE_PROVENANCE_PASS',
      serializationRoundTripVerified: true,
      candidateCount: verified.candidateCount,
      selectionCount: verified.selectionCount,
      holdoutCount: verified.holdoutCount,
      recordDigestsRecomputed: verified.integrityBoundary.recordDigestsRecomputed,
      evidenceDigestRecomputed: verified.integrityBoundary.evidenceDigestRecomputed,
      evidenceRefRecomputed: verified.integrityBoundary.evidenceRefRecomputed,
      participantPartitionLeakageRejected: verified.integrityBoundary.participantPartitionLeakageRejected,
      captureFamilyPartitionLeakageRejected: verified.integrityBoundary.captureFamilyPartitionLeakageRejected,
      tamperRejected,
      syntheticMechanicsOnly: true,
      empiricalHumanEvidenceClaimed: false,
      originalFR218IssuanceIndependentlyProvenAfterReload:
        verified.authorityBoundary.persistedDigestConsistencyMeansOriginalFR218IssuanceIndependentlyProven,
      empiricalSufficiencyEstablished: verified.authorityBoundary.empiricalSufficiencyEstablished,
      repeatCaptureStabilityEstablished: verified.authorityBoundary.repeatCaptureStabilityEstablished,
      thresholdIssued: verified.authorityBoundary.thresholdIssued,
      classifierIssued: verified.authorityBoundary.classifierIssued,
      traditionalBindingIssued: verified.authorityBoundary.traditionalBindingIssued,
    })}\n`);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

if (process.env.FR221_SMOKE === '1') {
  await runSmoke();
} else {
  const path = process.env.FR221_EVIDENCE_PATH;
  if (typeof path !== 'string' || path.trim().length === 0) {
    throw new Error('FR221_EVIDENCE_PATH is required outside FR221_SMOKE=1.');
  }
  const verified = await verifyFile(path);
  process.stdout.write(`${JSON.stringify({
    status: 'FR221_PERSISTED_CANDIDATE_PROVENANCE_VERIFIED',
    evidenceRef: verified.evidenceRef,
    candidateCount: verified.candidateCount,
    selectionCount: verified.selectionCount,
    holdoutCount: verified.holdoutCount,
    empiricalSufficiencyEstablished: verified.authorityBoundary.empiricalSufficiencyEstablished,
    repeatCaptureStabilityEstablished: verified.authorityBoundary.repeatCaptureStabilityEstablished,
    thresholdIssued: verified.authorityBoundary.thresholdIssued,
    classifierIssued: verified.authorityBoundary.classifierIssued,
    traditionalBindingIssued: verified.authorityBoundary.traditionalBindingIssued,
  })}\n`);
}
