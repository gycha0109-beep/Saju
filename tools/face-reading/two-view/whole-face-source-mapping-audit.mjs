// Roadmap stage-1 research ledger: 29 canonical + 18 unapproved requirements.
// Composes existing source trace; never creates a second canonical registry.
import {
  traceWholeFaceSourceGaps,
  traceWholeFaceExtensionRequirements,
} from './feature-coverage.mjs';
export const WHOLE_FACE_MAPPING_AUDIT_VERSION = 'whole-face-source-mapping-audit@0.1.0';
const HEAD = '## 2. 정규 29개 항목 — 소스에서 1:1 대응';
const REGIONS = {
  forehead: 'forehead',
  eyebrow: 'brows',
  eye_pair: 'eyes',
  nose: 'nose',
  mouth_lips: 'lips',
  ear: 'ears',
  cheek_mid_face: 'cheeks',
  chin_lower_face: 'jaw',
};
const LANES = {
  new_image_model: 5,
  rgb_relative_3d_benchmark: 4,
  ear_visibility_then_image_model: 1,
  remain_unavailable: 1,
};
const ok = (x) => x && typeof x === 'object' && !Array.isArray(x);
function fail() {
  throw Error('WHOLE_FACE_MAPPING_AUDIT_INVALID');
}
function canonicalRows(markdown) {
  if (typeof markdown !== 'string') fail();
  const text = markdown.replace(/\r\n/g, '\n');
  const start = text.indexOf(HEAD);
  const end = text.indexOf('\n## ', start + HEAD.length);
  if (start < 0 || end < 0 || text.indexOf(HEAD, start + HEAD.length) >= 0) fail();
  const lines = text
    .slice(start + HEAD.length, end)
    .split('\n')
    .filter((line) => line.startsWith('|'));
  if (lines.length !== 31 || !/^\|[\s:|-]+\|$/u.test(lines[1])) fail();
  return lines.slice(2).map((line, i) => {
    const fields = line
      .slice(1, -1)
      .split('|')
      .map((x) => x.trim());
    if (
      !line.endsWith('|') ||
      fields.length !== 6 ||
      fields.some((x) => !x) ||
      Number(fields[0]) !== i + 1 ||
      !/^\x60[a-z0-9_.]+\x60$/u.test(fields[2])
    )
      fail();
    return {
      number: i + 1,
      region: fields[1],
      key: fields[2].slice(1, -1),
      calculator: fields[3],
      outputType: fields[4].replace(/^\x60|\x60$/gu, ''),
      photoRequirement: fields[5],
    };
  });
}
export function auditWholeFaceSourceMapping({
  mappingMarkdown,
  columns,
  authorityEntries,
  hardGaps,
  readingItems,
  sourceExists,
  browEnvelopeVersion,
}) {
  if (
    !Array.isArray(columns) ||
    columns.length !== 29 ||
    !Array.isArray(authorityEntries) ||
    authorityEntries.length !== 29 ||
    !Array.isArray(hardGaps) ||
    hardGaps.length !== 11 ||
    !Array.isArray(readingItems) ||
    readingItems.length !== 8 ||
    typeof sourceExists !== 'function' ||
    browEnvelopeVersion !== 'engineering.visible-brow-mask-envelope@0.2.0'
  )
    fail();
  const entries = canonicalRows(mappingMarkdown);
  const trace = traceWholeFaceSourceGaps(columns, authorityEntries, []);
  const extensions = traceWholeFaceExtensionRequirements(
    mappingMarkdown,
    columns.map((x) => x.featureKey),
  );
  if (
    trace.canonicalFeatureCount !== 29 ||
    trace.calculatedOnlyOrUnverifiedCount !== 18 ||
    trace.sourcePredicateMappingsAdmitted !== 0 ||
    extensions.extensionRequirementCount !== 18 ||
    !extensions.allExtensionsUnapproved
  )
    fail();
  const sources = new Map();
  for (const item of readingItems) {
    if (
      !ok(item) ||
      !Object.values(REGIONS).includes(item.id) ||
      sources.has(item.id) ||
      item.traditionalBindingAuthorized !== false ||
      !Array.isArray(item.sourceRefs) ||
      typeof item.verificationState !== 'string'
    )
      fail();
    sources.set(item.id, item);
  }
  if (sources.size !== 8) fail();
  const hard = new Map(),
    lanes = Object.fromEntries(Object.keys(LANES).map((k) => [k, 0]));
  for (const item of hardGaps) {
    if (
      !ok(item) ||
      hard.has(item.featureKey) ||
      !Object.hasOwn(LANES, item.lane) ||
      item.canonicalMaterializationAllowedNow !== false ||
      !item.nextEvidenceRequirement
    )
      fail();
    hard.set(item.featureKey, item);
    lanes[item.lane]++;
  }
  if (Object.keys(LANES).some((k) => lanes[k] !== LANES[k])) fail();
  const canonical = entries.map((row, i) => {
    const col = columns[i],
      src = trace.features[i],
      gap = hard.get(row.key);
    if (
      !col ||
      !src ||
      col.featureKey !== row.key ||
      src.featureKey !== row.key ||
      col.outputType !== row.outputType ||
      col.regionKey !== src.regionKey ||
      !Object.hasOwn(REGIONS, col.regionKey) ||
      !['정규 계산기 구현', '근거·관측 미완료'].includes(row.calculator) ||
      src.canonicalCalculatorMaterialized !== (row.calculator === '정규 계산기 구현') ||
      Boolean(gap) === src.canonicalCalculatorMaterialized ||
      src.canonicalPhotoMeasurementVerified !== false ||
      src.traditionalSourcePredicateMapped !== false ||
      src.traditionalBindingIssued !== false ||
      (gap && gap.fr282Readiness !== authorityEntries[i].readiness)
    )
      fail();
    const traditional = sources.get(REGIONS[col.regionKey]);
    if (!traditional) fail();
    const paths = src.implementationSourcePaths;
    if (
      !Array.isArray(paths) ||
      paths.some(
        (path) =>
          typeof path !== 'string' || !/^(packages|research)\/[a-zA-Z0-9_./-]+$/u.test(path),
      )
    )
      fail();
    return Object.freeze({
      number: row.number,
      region: row.region,
      featureKey: row.key,
      outputType: row.outputType,
      calculatorMaterialized: src.canonicalCalculatorMaterialized,
      requiredExtractor: src.requiredExtractor,
      sourcePaths: Object.freeze([...paths]),
      missingSourcePaths: Object.freeze(paths.filter((p) => !sourceExists(p))),
      observationRequirement: src.requiredObservation,
      captureRequirement: src.captureRequirement,
      visibilityRequirement: src.visibilityAndQualityRequirement,
      photoValidationNeed: row.photoRequirement,
      hardGapLane: gap?.lane ?? null,
      hardGapNextEvidence: gap?.nextEvidenceRequirement ?? null,
      sourceRegionContext: traditional.id,
      sourceLineageRefs: Object.freeze([...traditional.sourceRefs]),
      sourceVerificationState: traditional.verificationState,
      photoExtractionValidated: false,
      independentAccuracyValidated: false,
      morphologyPredicateMapped: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
    });
  });
  if (
    new Set(canonical.map((x) => x.featureKey)).size !== 29 ||
    canonical.filter((x) => x.calculatorMaterialized).length !== 18 ||
    canonical.filter((x) => x.hardGapLane !== null).length !== 11
  )
    fail();
  const extra = extensions.features.map((r, index) => {
    if (
      r.traditionalBindingIssued !== false ||
      r.productInterpretationAuthorized !== false ||
      r.authorityState !== 'extension_candidate_not_admitted'
    )
      fail();
    const brow = r.requirement === '미간 실제 눈썹 사이 거리';
    const existingCandidate = brow
      ? Object.freeze({
          sourcePath: 'tools/face-reading/two-view/visible-brow-mask-envelope.mjs',
          methodVersion: browEnvelopeVersion,
          outputField: 'apparentInterBrowGapToMeanMaskXSpan',
          candidateOnly: true,
          actualInnerBrowGroundTruthValidated: false,
        })
      : null;
    if (brow && !sourceExists(existingCandidate.sourcePath)) fail();
    return Object.freeze({
      number: index + 1,
      requirement: r.requirement,
      relatedCanonicalKeys: r.existingCanonicalFeatureKeys,
      sourceReferenceText: r.mappingReference,
      independentEvidenceNeeded: r.requiredIndependentEvidence,
      studyTechnique: r.studyTechniqueFromSpecification,
      existingResearchCandidate: existingCandidate,
      extensionAdmitted: false,
      independentAccuracyValidated: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
    });
  });
  return Object.freeze({
    schemaVersion: WHOLE_FACE_MAPPING_AUDIT_VERSION,
    canonicalFeatureCount: 29,
    materializedCalculatorCount: 18,
    unavailableOrNewExtractorCount: 11,
    unapprovedExtensionCount: 18,
    missingReferencedSourceFileCount: canonical.reduce(
      (n, r) => n + r.missingSourcePaths.length,
      0,
    ),
    traditionalPredicatesMapped: 0,
    photoExtractionAccuracyValidated: false,
    productInterpretationAuthorized: false,
    canonical: Object.freeze(canonical),
    extensions: Object.freeze(extra),
  });
}

const quote = (value) => String.fromCharCode(96) + String(value) + String.fromCharCode(96);
const field = (value) => String(value).replaceAll('|', '\\|').replace(/\r?\n/gu, ' ');
export function renderWholeFaceMappingAuditMarkdown(audit) {
  if (
    !ok(audit) ||
    audit.schemaVersion !== WHOLE_FACE_MAPPING_AUDIT_VERSION ||
    audit.canonical?.length !== 29 ||
    audit.extensions?.length !== 18 ||
    audit.traditionalPredicatesMapped !== 0 ||
    audit.photoExtractionAccuracyValidated !== false ||
    audit.productInterpretationAuthorized !== false
  )
    fail();
  return [
    '# 명하 관상 전체 요구·구현·출처 통합 검증표',
    '',
    '> 2026-11-08 · 관상 엔진 로드맵 1단계 · 연구용 검증 기록, 제품 승인 아님',
    '> 기준: FR282/FR293/FR294, 기존 FR311 지역별 source catalogue, whole-face-feature-mapping-20261105.md',
    '',
    '## 1. 현재 소스 기준',
    '',
    '- 정규 ' +
      audit.canonicalFeatureCount +
      '개, 정규 계산기 ' +
      audit.materializedCalculatorCount +
      '개, 근거 미해결 ' +
      audit.unavailableOrNewExtractorCount +
      '개.',
    '- 추가 세부 요구 ' + audit.unapprovedExtensionCount + '개는 신규 정규 키로 승인되지 않음.',
    '- 기존 코드/문헌 source 경로의 파일 누락 참조 ' +
      audit.missingReferencedSourceFileCount +
      '건(실제 사진 추출 여부와 별도).',
    '- 전통 형태 조건 연결 승인 0건, 정규 사진 정확도 검증 0건. 사진·개별 생체 좌표 사용 안 함.',
    '',
    '## 2. 정규 29개 — 현행 코드·추출·관측·출처',
    '',
    '| 번호 | 부위/정규 featureKey | 계산기 | 촬영/가시성/사진 검증 요구 | 현재 코드·원천 참조 | 전통 출처 상태 |',
    '| ---: | --- | --- | --- | --- | --- |',
    ...audit.canonical.map((x) =>
      [
        '| ' + x.number,
        field(x.region) + ' ' + quote(x.featureKey),
        x.calculatorMaterialized ? '계산기 있음; 사진 추출 검증 없음' : '미구현/별도 근거 필요',
        field(x.captureRequirement) +
          '; ' +
          field(x.visibilityRequirement) +
          '; ' +
          field(x.photoValidationNeed) +
          (x.hardGapNextEvidence ? '; ' + field(x.hardGapNextEvidence) : ''),
        (x.sourcePaths.map(quote).join(', ') || '구현 출처 경로 미지정') +
          (x.missingSourcePaths.length
            ? ' (파일 참조 누락: ' + x.missingSourcePaths.map(field).join(', ') + ')'
            : ''),
        (x.sourceLineageRefs.length
          ? '지역별 문헌 후보 ' + x.sourceLineageRefs.length + '건'
          : '지역별 문헌 후보 없음') + '; 형태 조건 F1 미승인 |',
      ].join(' | '),
    ),
    '',
    '## 3. 추가 18개 세부 요구 — 정규 관측 키 확장 미승인',
    '',
    '| 번호 | 실제 요구 | 기존 29개와 연결 | 연구용 구현 후보 | 아직 필요한 독립 근거 |',
    '| ---: | --- | --- | --- | --- |',
    ...audit.extensions.map((x) =>
      [
        '| ' + x.number,
        field(x.requirement),
        x.relatedCanonicalKeys.map(quote).join(', ') || '정규 키 직접 연결 없음',
        x.existingResearchCandidate
          ? quote(x.existingResearchCandidate.outputField) +
            ' (보이는 눈썹 분할 마스크 사이 비율; 실제 눈썹 뿌리/미간 정답 아님)'
          : '해당 요구에 직접 대응하는 검증된 관측 후보 없음',
        field(x.independentEvidenceNeeded) + ' |',
      ].join(' | '),
    ),
    '',
    '## 4. 검증과 사용 한계',
    '',
    '- 기존 계산기, 모델 후보, 실제 사진 추출, 사람 정답, 전통 문헌 형태 조건은 서로 다른 증거 단계입니다.',
    '- 위 지역별 문헌 source catalogue는 특정 정규 featureKey의 형태 조건 predicate를 허용한 것이 아닙니다.',
    '- 상대 3D/귀 두께·내부 경계는 기존 FR294 경계를 유지하며 RGB 모델 좌표를 실측 깊이로 승격하지 않습니다.',
    '- 기존 로드맵의 단계 완료 판정에는 실제 사진·독립 정답·전통 조건 출처 확인이 추가로 필요합니다.',
    '',
    'Watchtower-Track: face-observation-engine',
    '',
  ].join('\n');
}
