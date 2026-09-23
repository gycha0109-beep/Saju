import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  FR251_OPERATOR_ROUTE,
  getLocalhostDryRunOperatorSurfaceContractFR251,
} from './observable-morphology-localhost-operator-surface-fr251.js';

const root = process.cwd();

describe('FR251 localhost one-person dry-run operator surface', () => {
  it('freezes the explicit challenge-first four-slot and privacy boundary', () => {
    const contract = getLocalhostDryRunOperatorSurfaceContractFR251();
    expect(FR251_OPERATOR_ROUTE).toBe('/fr251/');
    expect(contract.runtime.sameBrowserRealmAuthorityChain).toBe('FR237_through_FR250');
    expect(contract.runtime.exactSessionCount).toBe(2);
    expect(contract.runtime.exactSlotsPerSession).toBe(2);
    expect(contract.runtime.challengeDisplayedBeforeShutterEnabled).toBe(true);
    expect(contract.runtime.explicitOperatorShutterRequired).toBe(true);
    expect(contract.runtime.technicalFailureAfterChallengeFailsClosed).toBe(true);
    expect(contract.runtime.fr257SameFrameGeometryAttributionSidecarEnabled).toBe(true);
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

  it('pins the localhost HTML and browser client to FR250 challenge-first execution', () => {
    const html = readFileSync(
      resolve(root, 'tools/face-geometry/capture/fr251-dry-run-operator.html'),
      'utf8',
    );
    const client = readFileSync(
      resolve(root, 'tools/face-geometry/capture/fr251-dry-run-operator.mjs'),
      'utf8',
    );
    expect(html).toContain('__MEDIAPIPE_ENTRY__');
    expect(html).toContain('id="challenge-ref"');
    expect(html).toContain('id="attestation-stage"');
    expect(html).toContain('id="quality-composite-yes"');
    expect(html).toContain('id="quality-composite-no"');
    expect(html).toContain('id="shutter-stage"');
    expect(html).toContain('id="shutter" class="shutter-button"');
    expect(html).toContain('disabled></button>');
    expect(html).toContain('id="temporal-separation"');
    expect(html).toContain('id="fr257-result-status"');
    expect(html).toContain('id="download-fr257-result"');
    expect(client).toContain('materializeChallengeFirstBrowserDryRunCoordinatorFR250');
    expect(client).toContain('createCaptureGeometryAttributionCollectorFR257');
    expect(client).toContain('primaryMetricBindingPreparer: geometryCollector.primaryMetricBindingPreparer');
    expect(client).toContain('bindCaptureGeometryAttributionSlotFR257');
    expect(client).toContain('buildCaptureGeometryAttributionBundleFR257');
    expect(client).toContain('coordinator.prepareCapture');
    expect(client).toContain('coordinator.capturePrepared');
    expect(client).toContain("showCaptureStage('shutter')");
    expect(client).toContain('qualityCompositeDecision !== true');
    expect(client.indexOf('coordinator.prepareCapture'))
      .toBeLessThan(client.indexOf('performance.now()'));
    expect(client).toContain('rawMediaPersisted: false');
    expect(client).toContain('rawImageDigestPersisted: false');
    expect(client).toContain('myeongha-fr257-capture-geometry-');
    expect(client).not.toContain('rawMetricLandmarksPersisted: true');
    expect(client).not.toContain('localStorage');
    expect(client).not.toContain('sessionStorage');
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
