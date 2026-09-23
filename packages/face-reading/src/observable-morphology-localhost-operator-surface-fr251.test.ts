import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  FR251_OPERATOR_ROUTE,
  getLocalhostDryRunOperatorSurfaceContractFR251,
} from './observable-morphology-localhost-operator-surface-fr251.js';

const root = process.cwd();

describe('FR251 localhost one-person dry-run operator surface', () => {
  it('freezes the challenge-first four-slot, capture-first UX, and privacy boundary', () => {
    const contract = getLocalhostDryRunOperatorSurfaceContractFR251();
    expect(FR251_OPERATOR_ROUTE).toBe('/fr251/');
    expect(contract.runtime.sameBrowserRealmAuthorityChain).toBe('FR237_through_FR250');
    expect(contract.runtime.exactSessionCount).toBe(2);
    expect(contract.runtime.exactSlotsPerSession).toBe(2);
    expect(contract.runtime.challengeDisplayedBeforeShutterEnabled).toBe(true);
    expect(contract.runtime.explicitOperatorShutterRequired).toBe(true);
    expect(contract.runtime.fr240ConsentCollectedBeforeCameraExecution).toBe(true);
    expect(contract.runtime.fr243ConsentReconfirmationPerCapture).toBe(true);
    expect(contract.runtime.fr247QualityObservationPerCapture).toBe(true);
    expect(contract.runtime.session2TemporalSeparationOperatorConfirmationRequired).toBe(true);
    expect(contract.runtime.technicalFailureAfterChallengeFailsClosed).toBe(true);
    expect(contract.runtime.fr257SameFrameGeometryAttributionSidecarEnabled).toBe(true);
    expect(contract.runtime.singleStartActionRecordsFR240Consent).toBe(true);
    expect(contract.runtime.cameraPreviewHiddenUntilStartAction).toBe(true);
    expect(contract.runtime.shutterActionCarriesPerCaptureReconfirmationAndQualityAttestation).toBe(true);
    expect(contract.runtime.captureUiRemainsPrimaryAfterStart).toBe(true);
    expect(contract.runtime.session2ConfirmationStaysInCaptureUi).toBe(true);
    expect(contract.persistence.rawMediaPersisted).toBe(false);
    expect(contract.persistence.rawImageDigestPersisted).toBe(false);
    expect(contract.persistence.rawScreenLandmarksPersisted).toBe(false);
    expect(contract.persistence.rawMetricLandmarksPersisted).toBe(false);
    expect(contract.persistence.poseTransformMatrixPersisted).toBe(false);
    expect(contract.persistence.scalarCaptureGeometrySidecarExportAllowed).toBe(true);
    expect(contract.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(contract.authorityBoundary.productionActivated).toBe(false);
    expect(contract.authorityBoundary.commerceActivated).toBe(false);
  });

  it('pins FR260 camera-dominant mobile UX without weakening FR250/FR247 semantics', () => {
    const html = readFileSync(
      resolve(root, 'tools/face-geometry/capture/fr251-dry-run-operator.html'),
      'utf8',
    );
    const client = readFileSync(
      resolve(root, 'tools/face-geometry/capture/fr251-dry-run-operator.mjs'),
      'utf8',
    );

    expect(html).toContain('__MEDIAPIPE_ENTRY__');
    expect(html).toContain('촬영을 시작하시겠습니까?');
    expect(html).toContain('id="start-dry-run"');
    expect(html).toContain('id="shutter-stage"');
    expect(html).toContain('id="challenge-ref"');
    expect(html).toContain('id="challenge-nonce"');
    expect(html).toContain('id="shutter" class="shutter-button"');
    expect(html).toContain('height:100dvh;');
    expect(html).toContain('object-fit:contain;');
    expect(html).toContain('position:absolute; z-index:4; left:50%;');
    expect(html).toContain('id="session-break"');
    expect(html).toContain('id="begin-session-2"');
    expect(html).toContain('id="fr257-result-status"');
    expect(html).toContain('id="download-fr257-result"');

    for (const removed of [
      'data-consent=',
      'id="attestation-stage"',
      'id="quality-composite-yes"',
      'id="quality-composite-no"',
      'id="challenge-presented"',
      'id="consent-reconfirmed"',
      'id="temporal-separation"',
      'id="back-to-observation"',
      'id="shutter-message"',
      'id="capture-status"',
      'shutter-attestation',
    ]) {
      expect(html).not.toContain(removed);
    }

    expect(client).toContain('materializeChallengeFirstBrowserDryRunCoordinatorFR250');
    expect(client).toContain('createCaptureGeometryAttributionCollectorFR257');
    expect(client).toContain('primaryMetricBindingPreparer: geometryCollector.primaryMetricBindingPreparer');
    expect(client).toContain('bindCaptureGeometryAttributionSlotFR257');
    expect(client).toContain('buildCaptureGeometryAttributionBundleFR257');
    expect(client).toContain('coordinator.prepareCapture');
    expect(client).toContain('coordinator.capturePrepared');

    expect(client).toContain('studyNoticeRead: true');
    expect(client).toContain('voluntaryParticipationConfirmed: true');
    expect(client).toContain('liveCameraCaptureConsent: true');
    expect(client).toContain('withdrawalProcedureAcknowledged: true');

    expect(client).toContain('consentReconfirmedImmediatelyBeforeCapture: true');
    expect(client).toContain('challengePresentedBeforeCapture: true');
    expect(client).toContain('frontalNeutralPoseObserved: true');
    expect(client).toContain('bilateralEyeContoursVisuallyResolvable: true');
    expect(client).toContain('bilateralEyeRegionsFullyVisible: true');
    expect(client).toContain('majorEyeRegionOcclusionAbsent: true');

    expect(client.indexOf('coordinator.prepareCapture'))
      .toBeLessThan(client.indexOf('performance.now()'));
    expect(client).toContain("elements.start.addEventListener('click'");
    expect(client).toContain("elements.shutter.addEventListener('click'");
    expect(client).toContain("elements.beginSession2.addEventListener('click'");
    expect(client).toContain('elements.sessionBreak.hidden = false');
    expect(client).toContain('rawMediaPersisted: false');
    expect(client).toContain('rawImageDigestPersisted: false');
    expect(client).toContain('myeongha-fr257-capture-geometry-');

    for (const removed of [
      'qualityCompositeDecision',
      'showCaptureStage(',
      'resetCaptureConfirmations(',
      'consentReady(',
      'consentInput(',
      'elements.challengePresented',
      'elements.consentReconfirmed',
      'elements.temporalSeparation',
      'localStorage',
      'sessionStorage',
      'rawMetricLandmarksPersisted: true',
    ]) {
      expect(client).not.toContain(removed);
    }
  });

  it('pins the existing localhost server to the FR251 route without replacing MESH6J', () => {
    const server = readFileSync(
      resolve(root, 'scripts/mesh6j-manual-browser-capture-preview.mjs'),
      'utf8',
    );
    expect(server).toContain("'/fr251/'");
    expect(server).toContain("'/fr251/operator.mjs'");
    expect(server).toContain('fr251-dry-run-operator.html');
    expect(server).toContain('fr251-dry-run-operator.mjs');
  });
});
