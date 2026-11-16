import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(import.meta.dirname, '..');
const browser = readFileSync(resolve(root, 'tools/face-reading/two-view/review.mjs'), 'utf8');
const server = readFileSync(resolve(root, 'tools/face-reading/two-view/server.mjs'), 'utf8');

describe('private two-view review browser module routing', () => {
  it('shows two plain-language review choices by default and keeps existing research controls accessible', () => {
    const html = readFileSync(resolve(root, 'tools/face-reading/two-view/review.html'), 'utf8');
    expect(html).toContain('얼굴이 정면을 보고 있나요?');
    expect(html).toContain('눈·코·입·귀가 잘 보이나요?');
    expect(html).toContain('data-review-pose="uncertain"');
    expect(html).toContain('data-review-visibility="partially_occluded"');
    expect(html).toContain('body:not(.research-mode) main > section:not(#capture-screen-review)');
    expect(html).toContain('id="research-mode-toggle"');
    expect(html).toContain('id="capture-screen-save"');
    expect(browser).toContain("document.body.classList.toggle('research-mode')");
    expect(browser).toContain("$('capture-screen-pose').value = button.dataset.reviewPose");
    expect(browser).toContain(
      "$('capture-screen-visibility').value = button.dataset.reviewVisibility",
    );
    expect(browser).toContain("original = nextMode === 'existing'");
    expect(browser).toContain('state.captureScreenReviews = {');
  });
  it('guides an already screened human reviewer to pending eye, lip and ear contours without creating labels', () => {
    const html = readFileSync(resolve(root, 'tools/face-reading/two-view/review.html'), 'utf8');
    expect(html).toContain('id="guided-marking"');
    expect(html).toContain('id="guided-marking-next"');
    expect(html).toContain('id="guided-sticky-nav"');
    expect(html).toContain('id="guided-sticky-title"');
    expect(html).toContain('body.guided-marking-mode:not(.research-mode) #guided-sticky-nav');
    expect(browser).toContain(
      "$('guided-sticky-next').onclick = () => $('guided-marking-next').click()",
    );
    expect(browser).toContain(
      "$('guided-sticky-exit').onclick = () => $('guided-marking-exit').click()",
    );
    expect(html).toContain('id="simple-review-intro-text"');
    expect(browser).toContain('renderGuidedMarking();');
    expect(html).toContain('id="guided-marking-exit"');
    expect(html).toContain('guided-marking-mode:not(.research-mode).guided-eyelid');
    expect(html).toContain('guided-marking-mode:not(.research-mode).guided-lip');
    expect(html).toContain('guided-marking-mode:not(.research-mode).guided-ear');
    expect(browser).toContain('const queue = currentSamePhotoReviewQueue();');
    expect(browser).toContain(
      'guidedMarkingTarget = { photoIndex: target.photoIndex, part: target.part }',
    );
    expect(browser).toContain('activeAnnotationTool = target.part;');
    expect(browser).toContain('original = true;');
    expect(browser).toContain('guidedTargetSaved(target)');
    expect(browser).toContain('reviewStoreNeedsRepair()');
    expect(browser).not.toContain('captureScreenReviews = Object.fromEntries');
  });
  it('serves landmark worker imports including the transient lower-face envelope module', () => {
    const worker = readFileSync(
      resolve(root, 'tools/face-reading/two-view/landmarks-worker.mjs'),
      'utf8',
    );
    const imports = [...worker.matchAll(/import\('\.\/([^']+\.mjs)'\)/g)].map((match) => match[1]);
    expect(imports).toContain('jaw-model-human-contour-comparison.mjs');
    const parsingWorker = readFileSync(
      resolve(root, 'tools/face-reading/two-view/parsing-worker.mjs'),
      'utf8',
    );
    const parsingImports = [...parsingWorker.matchAll(/import\('\.\/([^']+\.mjs)'\)/g)].map(
      (match) => match[1],
    );
    expect(parsingImports).toContain('visible-forehead-skin-band.mjs');
    expect(parsingImports).toContain('visible-lip-pixel-color.mjs');
    const staticAllowlist = server.match(
      /const assets = new Map\(\s*\[([\s\S]*?)\]\.map\(\(name\)/,
    );
    expect(staticAllowlist).not.toBeNull();
    const served = new Set(
      [...(staticAllowlist?.[1] ?? '').matchAll(/'([^']+\.mjs)'/g)].map((match) => match[1]),
    );
    expect([...imports, ...parsingImports].filter((name) => !served.has(name))).toEqual([]);
  });
  it('wires the forehead skin candidate into the existing private review panel', () => {
    const html = readFileSync(resolve(root, 'tools/face-reading/two-view/review.html'), 'utf8');
    expect(html).toContain('id="forehead-skin-experiment"');
    expect(browser).toContain('renderVisibleForeheadSkinBand(record, result, previous);');
    expect(browser).toContain('result.foreheadSkinCandidate');
  });
  it('connects nose-boundary pixel comparison only to current local human review', () => {
    const html = readFileSync(resolve(root, 'tools/face-reading/two-view/review.html'), 'utf8');
    expect(html).toContain('id="nose-rim-photometry"');
    expect(browser).toContain('renderNostrilBorderPhotometry(record, result, previous);');
    expect(browser).toContain('isCurrentNosePreview(result, epoch)');
    expect(browser).toContain('measureHumanMarkedNostrilBorderPhotometry');
  });
  it('renders nonpersistent brow photo texture only in the current review panel', () => {
    const html = readFileSync(resolve(root, 'tools/face-reading/two-view/review.html'), 'utf8');
    expect(html).toContain('id="brow-texture-experiment"');
    expect(browser).toContain('renderBrowPixelTexture(record, result, previous);');
    expect(browser).toContain('results.get(record.captureRef) !== result');
    expect(browser).toContain('measureVisibleBrowPixelTexture');
  });
  it('gates same-photo ear curve comparison by current review revision', () => {
    const html = readFileSync(resolve(root, 'tools/face-reading/two-view/review.html'), 'utf8');
    expect(html).toContain('id="ear-rim-curve-comparison"');
    expect(browser).toContain('renderEarRimCurveComparison(record, result, previous);');
    expect(browser).toContain('compareEarMaskBoundaryToHumanOuterRim');
    expect(browser).toContain(
      'state.earReviews?.[record.captureRef]?.revision !== reviewed.revision',
    );
  });
  it('shows source-image lip RGB only as a transient candidate in the current review', () => {
    const html = readFileSync(resolve(root, 'tools/face-reading/two-view/review.html'), 'utf8');
    const parser = readFileSync(
      resolve(root, 'tools/face-reading/two-view/parsing-worker.mjs'),
      'utf8',
    );
    expect(html).toContain('id="lip-pixel-color-experiment"');
    expect(browser).toContain('renderVisibleLipPixelColor(record, result, previous);');
    expect(parser).toContain('lipPixelColorCandidate = measureVisibleLipPixelColor');
    expect(parser).toContain('ctx.drawImage(bitmap, 0, 0, size, size)');
  });
  it('reports current six-gap evidence without persisting model measurements', () => {
    const html = readFileSync(resolve(root, 'tools/face-reading/two-view/review.html'), 'utf8');
    expect(html).toContain('id="current-2d-evidence-status"');
    expect(html).toContain('id="current-2d-evidence-rows"');
    expect(html).toContain('id="current-2d-session-status"');
    expect(browser).toContain('summarizeCurrent2dSessionCoverage(');
    expect(browser).toContain("records.filter((item) => item.viewRole === 'frontal')");
    expect(browser).toContain('session.totalPhotoFeatureEntries');
    expect(browser).toContain('summarizeCurrent2dPhotoEvidence({');
    expect(browser).toContain('renderCurrent2dEvidence(record, result, previous);');
    expect(browser).toContain('independent');
  });
  it('serves every directly imported review module from the local static allowlist', () => {
    const imports = [...browser.matchAll(/from '\.\/([^']+\.mjs)'/g)].map((match) => match[1]);
    expect(imports).toContain('source-currentness-gate.mjs');
    expect(imports).toContain('eyelid-manual-line-offsets.mjs');
    expect(imports).toContain('nostril-border-photometry.mjs');
    expect(imports).toContain('brow-pixel-texture.mjs');
    expect(imports).toContain('ear-rim-curve-comparison.mjs');
    expect(imports).toContain('current-2d-evidence-readiness.mjs');
    const staticAllowlist = server.match(
      /const assets = new Map\(\s*\[([\s\S]*?)\]\.map\(\(name\)/,
    );
    expect(staticAllowlist).not.toBeNull();
    const served = new Set(
      [...(staticAllowlist?.[1] ?? '').matchAll(/'([^']+\.mjs)'/g)].map((match) => match[1]),
    );
    expect(imports.filter((name) => !served.has(name))).toEqual([]);
  });
});
