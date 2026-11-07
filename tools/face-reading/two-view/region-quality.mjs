// Position/adjacency screening only. No completed anatomy or confidence claim.
const faceClasses = [1, 2, 3, 4, 5, 10, 11, 12, 13];
const parts = { nose: [10], lips: [12, 13], brows: [2, 3] };
export function components(mask, size, classes) {
  if (
    !Number.isInteger(size) ||
    size < 1 ||
    mask.length !== size * size ||
    mask.some((n) => n > 18)
  )
    throw Error('PARSING_MASK_INVALID');
  const seen = new Uint8Array(mask.length),
    result = [];
  for (let start = 0; start < mask.length; start++) {
    if (seen[start] || !classes.includes(mask[start])) continue;
    const pixels = [start];
    seen[start] = 1;
    for (let i = 0; i < pixels.length; i++) {
      const p = pixels[i],
        x = p % size,
        y = Math.floor(p / size);
      for (const q of [
        x > 0 ? p - 1 : -1,
        x + 1 < size ? p + 1 : -1,
        y > 0 ? p - size : -1,
        y + 1 < size ? p + size : -1,
      ])
        if (q >= 0 && !seen[q] && classes.includes(mask[q])) {
          seen[q] = 1;
          pixels.push(q);
        }
    }
    result.push(pixels);
  }
  return result;
}
function touches(pixels, anchors, size, radius) {
  return pixels.some((p) =>
    anchors.some(
      (a) =>
        (((p % size) - a.x) / (a.radiusX || radius)) ** 2 +
          ((Math.floor(p / size) - a.y) / (a.radiusY || radius)) ** 2 <=
        1,
    ),
  );
}
export function screenRegions(mask, size, anchors, radius) {
  const out = new Uint8Array(mask),
    quality = Object.fromEntries(
      ['skin', 'nose', 'lips', 'brows', 'ears'].map((id) => [
        id,
        { status: 'unchecked', removedPixels: 0 },
      ]),
    );
  if (!anchors) return { mask: out, quality };
  for (const [id, classes] of Object.entries(parts)) {
    const points = anchors[id];
    if (!Array.isArray(points)) continue;
    let removed = 0,
      retained = 0;
    for (const pixels of components(out, size, classes)) {
      if (touches(pixels, points, size, radius)) retained += pixels.length;
      else
        for (const p of pixels) {
          out[p] = 0;
          removed++;
        }
    }
    quality[id] = {
      status: retained || !removed ? 'screened' : 'suppressed',
      removedPixels: removed,
    };
  }
  const faceSeeds = anchors.nose?.length ? anchors.nose : anchors.face;
  if (faceSeeds?.length) {
    const retained = new Uint8Array(mask.length);
    let skinRemoved = 0;
    const faceParts = components(out, size, faceClasses);
    const supportedFace = faceParts.some((pixels) => touches(pixels, faceSeeds, size, radius));
    for (const pixels of supportedFace ? faceParts : []) {
      if (touches(pixels, faceSeeds, size, radius)) for (const p of pixels) retained[p] = 1;
      else
        for (const p of pixels) {
          if (out[p] === 1) skinRemoved++;
          out[p] = 0;
        }
    }
    quality.skin = { status: supportedFace ? 'screened' : 'unchecked', removedPixels: skinRemoved };
    // Four-neighbour distance to the retained visible face; no ear landmarks inferred.
    const distance = new Int16Array(mask.length).fill(-1),
      queue = [];
    for (let p = 0; p < retained.length; p++)
      if (retained[p]) {
        distance[p] = 0;
        queue.push(p);
      }
    for (let i = 0; i < queue.length; i++) {
      const p = queue[i],
        x = p % size,
        y = Math.floor(p / size);
      if (distance[p] >= radius) continue;
      for (const q of [
        x > 0 ? p - 1 : -1,
        x + 1 < size ? p + 1 : -1,
        y > 0 ? p - size : -1,
        y + 1 < size ? p + size : -1,
      ])
        if (q >= 0 && distance[q] < 0) {
          distance[q] = distance[p] + 1;
          queue.push(q);
        }
    }
    let removed = 0;
    const earParts = components(out, size, [7, 8]);
    const supportedEar = earParts.some((pixels) => pixels.some((p) => distance[p] >= 0));
    for (const pixels of supportedEar ? earParts : [])
      if (!pixels.some((p) => distance[p] >= 0))
        for (const p of pixels) {
          out[p] = 0;
          removed++;
        }
    quality.ears = { status: supportedEar ? 'screened' : 'unchecked', removedPixels: removed };
  }
  for (const [id, classes] of Object.entries({ skin: [1], ...parts, ears: [7, 8] }))
    quality[id].removedPixels = mask.reduce(
      (n, label, p) => n + (classes.includes(label) && out[p] !== label ? 1 : 0),
      0,
    );
  return { mask: out, quality };
}
export { faceClasses };
export function screenEarOverlay(faceMask, earMask, size, anchors, radius) {
  const combined = new Uint8Array(faceMask);
  for (let p = 0; p < combined.length; p++) {
    if ([7, 8].includes(combined[p])) combined[p] = 0;
    if ([7, 8].includes(earMask[p])) combined[p] = earMask[p];
  }
  const screened = screenRegions(combined, size, anchors, radius),
    out = new Uint8Array(earMask);
  for (let p = 0; p < out.length; p++)
    if ([7, 8].includes(out[p]) && ![7, 8].includes(screened.mask[p])) out[p] = 0;
  return { mask: out, quality: screened.quality.ears };
}
