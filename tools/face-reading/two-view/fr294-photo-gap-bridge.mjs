// Local research bridge. FR294 TypeScript ledger remains the sole authority;
// this module reads it without creating another canonical feature registry.
import ts from 'typescript';

export const HARD_GAP_BRIDGE_VERSION = 'local-fr294-per-photo-gap-bridge@0.1.0';
const LANES = Object.freeze([
  'new_image_model',
  'rgb_relative_3d_benchmark',
  'ear_visibility_then_image_model',
  'remain_unavailable',
]);
const EXPECTED_LANE_COUNTS = Object.freeze([5, 4, 1, 1]);
function fail() {
  throw Error('FR294_PHOTO_GAP_BRIDGE_INVALID');
}
const object = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
function literalProperty(node, name) {
  const prop = node.properties.find(
    (p) =>
      ts.isPropertyAssignment(p) &&
      (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)) &&
      p.name.text === name,
  );
  if (!prop || !ts.isStringLiteral(prop.initializer)) fail();
  return prop.initializer.text;
}
function parseSourceEntries(source) {
  if (typeof source !== 'string' || !source.trim()) fail();
  const ast = ts.createSourceFile(
    'rgb-selfie-hard-gap-frontier-fr294.ts',
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  if (ast.parseDiagnostics.length > 0) fail();
  let found = [];
  for (const statement of ast.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const dec of statement.declarationList.declarations) {
      if (!ts.isIdentifier(dec.name) || dec.name.text !== 'FR294_HARD_GAP_FRONTIER') continue;
      found.push(dec.initializer);
    }
  }
  if (
    found.length !== 1 ||
    !ts.isCallExpression(found[0]) ||
    found[0].expression.getText(ast) !== 'Object.freeze'
  )
    fail();
  let entries = found[0].arguments[0];
  if (ts.isAsExpression(entries)) entries = entries.expression;
  if (!ts.isArrayLiteralExpression(entries) || entries.elements.length !== 11) fail();
  const rows = entries.elements.map((call) => {
    if (
      !ts.isCallExpression(call) ||
      call.expression.getText(ast) !== 'entry' ||
      call.arguments.length !== 1 ||
      !ts.isObjectLiteralExpression(call.arguments[0])
    )
      fail();
    const node = call.arguments[0];
    const key = literalProperty(node, 'featureKey');
    const lane = literalProperty(node, 'lane');
    const readiness = literalProperty(node, 'fr282Readiness');
    const requirement = literalProperty(node, 'nextEvidenceRequirement');
    const authority = node.properties.find(
      (p) =>
        ts.isPropertyAssignment(p) &&
        ts.isIdentifier(p.name) &&
        p.name.text === 'canonicalMaterializationAllowedNow',
    );
    if (
      !/^[a-z_]+\.[a-z0-9_]+$/.test(key) ||
      !LANES.includes(lane) ||
      !requirement.trim() ||
      !authority ||
      authority.initializer.kind !== ts.SyntaxKind.FalseKeyword ||
      (lane === 'new_image_model' && readiness !== 'new_image_model_required') ||
      (lane === 'rgb_relative_3d_benchmark' && readiness !== 'relative_3d_benchmark_required') ||
      (lane === 'ear_visibility_then_image_model' && readiness !== 'visibility_gate_required') ||
      (lane === 'remain_unavailable' && readiness !== 'unavailable')
    )
      fail();
    return Object.freeze({
      featureKey: key,
      lane,
      nextEvidenceRequirement: requirement,
      canonicalMaterializationAllowedNow: false,
    });
  });
  if (
    new Set(rows.map((row) => row.featureKey)).size !== 11 ||
    LANES.some(
      (lane, i) => rows.filter((row) => row.lane === lane).length !== EXPECTED_LANE_COUNTS[i],
    )
  )
    fail();
  return Object.freeze(rows);
}

export function traceFr294PhotoHardGaps(source, photoReadiness, expectedFeatureKeys) {
  const rows = parseSourceEntries(source);
  if (
    !object(photoReadiness) ||
    photoReadiness.status !== 'available' ||
    photoReadiness.canonicalPhotoMeasurementVerified !== false ||
    photoReadiness.independentAccuracyValidated !== false ||
    !object(photoReadiness.captures) ||
    !Array.isArray(expectedFeatureKeys) ||
    expectedFeatureKeys.length !== 29 ||
    new Set(expectedFeatureKeys).size !== 29 ||
    rows.some((row) => !expectedFeatureKeys.includes(row.featureKey))
  )
    fail();
  const byKey = new Map(rows.map((row) => [row.featureKey, row]));
  const counts = Object.fromEntries(
    LANES.map((lane) => [
      lane,
      Object.freeze({
        unavailable: 0,
        candidate_only: 0,
        partial: 0,
        not_evaluated: 0,
      }),
    ]),
  );
  const mutableCounts = Object.fromEntries(
    LANES.map((lane) => [
      lane,
      {
        unavailable: 0,
        candidate_only: 0,
        partial: 0,
        not_evaluated: 0,
      },
    ]),
  );
  const captures = {};
  let unknown = 0;
  for (const [ref, capture] of Object.entries(photoReadiness.captures)) {
    if (
      !/^[a-zA-Z0-9_-]{1,80}$/.test(ref) ||
      !object(capture) ||
      !Array.isArray(capture.features) ||
      capture.features.length !== 29 ||
      new Set(capture.features.map((row) => row.featureKey)).size !== 29 ||
      capture.features.some((row) => !expectedFeatureKeys.includes(row.featureKey))
    )
      fail();
    const gaps = [];
    for (const feature of capture.features) {
      const official = byKey.get(feature.featureKey);
      if (!official) {
        if (feature.state === 'unavailable') unknown++;
        continue;
      }
      if (
        !['unavailable', 'candidate_only', 'partial', 'not_evaluated'].includes(feature.state) ||
        typeof feature.reason !== 'string' ||
        !feature.reason ||
        feature.canonicalObservationAdmitted === true
      )
        fail();
      mutableCounts[official.lane][feature.state]++;
      gaps.push(
        Object.freeze({
          featureKey: feature.featureKey,
          lane: official.lane,
          status: feature.state,
          nextEvidenceRequirement: official.nextEvidenceRequirement,
          canonicalMaterializationAllowedNow: false,
        }),
      );
    }
    if (gaps.length !== 11) fail();
    captures[ref] = Object.freeze(gaps);
  }
  if (
    unknown > 0 ||
    Object.keys(captures).length !== photoReadiness.captureCount ||
    Object.values(mutableCounts).reduce(
      (sum, lane) => sum + Object.values(lane).reduce((n, value) => n + value, 0),
      0,
    ) !==
      photoReadiness.captureCount * 11
  )
    fail();
  for (const lane of LANES) counts[lane] = Object.freeze(mutableCounts[lane]);
  return Object.freeze({
    schemaVersion: HARD_GAP_BRIDGE_VERSION,
    captureCount: photoReadiness.captureCount,
    canonicalHardGapCount: 11,
    laneCount: Object.freeze({
      new_image_model: 5,
      rgb_relative_3d_benchmark: 4,
      ear_visibility_then_image_model: 1,
      remain_unavailable: 1,
    }),
    statusByLane: Object.freeze(counts),
    unresolvedNonFr294UnavailableCount: unknown,
    canonicalObservationAdmitted: false,
    independentAccuracyValidated: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
    captures: Object.freeze(captures),
  });
}
