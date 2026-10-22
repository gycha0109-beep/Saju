import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { CalculationPolicySnapshot } from '../src/contracts/calculation.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../src/llm/prompt-compiler.js';
import { createGeneralNatalUsefulReadingCandidateRegistry } from '../src/research/general-natal-useful-reading-candidate.js';
import { executeProductReading } from '../src/reading/governed-reading-execution.js';
import { buildProductReadingDelivery } from '../src/reading/product-reading-delivery.js';
import {
  type ProductReadingResponse,
  type ProductReadingResponseBlock,
  buildProductReadingResponse,
} from '../src/reading/product-reading-response.js';
import {
  inspectSajuReaderRecordsSourceHandoffV1,
  projectSajuReaderRecordsSourceInventoryV1,
  sameSajuReadingForReaderAndRecordsV1,
} from '../src/reading/source-reading-reader-records-handoff.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/source-reader-records-handoff-test',
  policyVersion: '1.0.0',
  dayBoundary: 'midnight',
  trueSolarTime: {
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  },
  timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
};

async function source() {
  const snapshot = calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: 2024, month: 3, day: 10 },
    time: { known: true, hour: 12, minute: 0 },
    sexForTraditionalCalculation: 'unspecified',
  }, policy, { now: new Date('2026-08-24T00:00:00.000Z') });
  const registry = createGeneralNatalUsefulReadingCandidateRegistry(
    '2026-08-24T00:04:00.000Z',
  );
  const interpretation = runInterpretation(snapshot, registry, {
    requestId: 'reader-records-source-fixture-interpretation',
    now: new Date('2026-08-24T00:05:00.000Z'),
  });
  const execution = await executeProductReading(
    snapshot,
    interpretation,
    registry,
    { requestId: 'reader-records-source-fixture-reading', text: '사주' },
    {
      outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
      readingVersion: 'source-reader-records-fixture-v1',
    },
  );
  const delivery = buildProductReadingDelivery(execution);
  const response = buildProductReadingResponse(delivery);
  return { snapshot, registry, interpretation, execution, delivery, response };
}

function protectedHash(text: string): string {
  return 'sha256:v1:' + createHash('sha256').update(text, 'utf8').digest('hex');
}

describe('Saju private source fingerprint handoff to Reader / Records', () => {
  it('binds the real in-process Reading, registry, response, disclosure inventory and version without source authority', async () => {
    const material = await source();
    const result = inspectSajuReaderRecordsSourceHandoffV1(material);
    expect(result.state).toBe('held');
    if (result.state !== 'held') return;
    const { handoff } = result;
    expect(handoff).toMatchObject({
      version: 'saju-reader-records-source-reference-handoff-v1',
      state: 'held',
      lifecycle: 'preview',
      sourceAuthority: 'NOT_EVALUATED',
      productionInterpretationAuthority: 'NOT_EVALUATED',
      releaseAuthorization: 'NOT_EVALUATED',
      subjectBinding: 'DB_OWNER_REQUIRED',
      s5AtomicStorage: 'DB_OWNER_REQUIRED',
      s7Delivery: 'DB_OWNER_REQUIRED',
      canPersist: false, canDisclose: false,
      canPublish: false, canSell: false,
      mayIssueS3OfficialCoverageCandidate: false,
    });
    expect(handoff.source).toMatchObject({
      readingId: material.response.reading?.readingId,
      responseId: material.response.responseId,
      responseVersion: material.response.responseVersion,
      responseBodyHash: deterministicContentHash(material.response),
      snapshotId: material.snapshot.snapshotId,
      interpretationRunId: material.interpretation.run.interpretationRunId,
      registrySnapshotId: material.registry.snapshot.registrySnapshotId,
      readingVersion: material.execution.artifact?.provenance.readingVersion,
    });
    expect(handoff.source.inventoryHash).toMatch(/^[0-9a-f]{64}$/u);
    expect(handoff.inventory.segments.length).toBeGreaterThan(0);
    expect(handoff.inventory.segments.every(unit =>
      /^response\.reading\.sections\.\d+\.blocks\.\d+/.test(unit.sourceRef)
      && /^sha256:v1:[0-9a-f]{64}$/u.test(unit.contentHash))).toBe(true);
    const text = JSON.stringify(handoff);
    expect(text).not.toContain('사용자 이름');
    expect(text).not.toContain('2024-03-10');
    expect(Object.isFrozen(handoff)).toBe(true);
    expect(Object.isFrozen(handoff.source)).toBe(true);
    expect(Object.isFrozen(handoff.inventory.segments)).toBe(true);
    const again = inspectSajuReaderRecordsSourceHandoffV1(material);
    expect(again).toEqual(result);
  });

  it('matches Reader and Records ONLY for the exact same immutable source reference; matching is not a disclosure permit', async () => {
    const checked = inspectSajuReaderRecordsSourceHandoffV1(await source());
    expect(checked.state).toBe('held');
    if (checked.state !== 'held') return;
    const { handoff } = checked;
    const match = sameSajuReadingForReaderAndRecordsV1({
      handoff,
      reader: handoff.source,
      records: { ...handoff.source },
    });
    expect(match).toEqual({
      state: 'matched', canDisclose: false, canPersist: false,
    });
    for (const altered of [
      { readingId: 'another-reading' },
      { responseId: 'another-response' },
      { responseVersion: 'myeonghwa-product-reading-response-v3' },
      { responseBodyHash: 'f'.repeat(64) },
      { inventoryHash: 'a'.repeat(64) },
      { registrySnapshotId: 'other-registry' },
      { readingVersion: 'different-reading-version' },
      { profileRef: { ...handoff.source.profileRef, contentHash: '0'.repeat(64) } },
    ]) {
      expect(sameSajuReadingForReaderAndRecordsV1({
        handoff,
        reader: handoff.source,
        records: { ...handoff.source, ...altered } as typeof handoff.source,
      })).toMatchObject({ state: 'blocked', canDisclose: false });
    }
  });

  it('rejects an altered response, an invalid registry and fallback rather than exporting S3 Source authority', async () => {
    const valid = await source();
    const altered = structuredClone(valid);
    if (!altered.response.reading) throw new Error('Fixture missing Reading.');
    altered.response.reading.sections[0]!.title += ' 변조';
    expect(inspectSajuReaderRecordsSourceHandoffV1(altered))
      .toMatchObject({ state: 'blocked', canPersist: false });
    const wrongRegistry = structuredClone(valid);
    wrongRegistry.interpretation.run.registrySnapshotId = 'other-registry';
    expect(inspectSajuReaderRecordsSourceHandoffV1(wrongRegistry))
      .toMatchObject({ state: 'blocked', canDisclose: false });
    const fallback = structuredClone(valid);
    fallback.response.state = 'delivered_with_fallback';
    fallback.response.messageCode = 'READING_DELIVERED_WITH_GROUNDED_FALLBACK';
    fallback.delivery.state = 'delivered_with_fallback';
    fallback.delivery.messageCode = 'READING_DELIVERED_WITH_GROUNDED_FALLBACK';
    expect(inspectSajuReaderRecordsSourceHandoffV1(fallback))
      .toMatchObject({ state: 'blocked', canPersist: false });
  });

  it('projects every existing v2 text block and disclosure using the exact MyeongHa Reader source path/hash convention', async () => {
    const actual = (await source()).response;
    if (!actual.reading) throw new Error('Missing actual admitted reading.');
    const blocks: ProductReadingResponseBlock[] = [
      { type: 'paragraph', text: '본문 하나' },
      { type: 'key_points', items: ['핵심 A', '핵심 B'] },
      { type: 'comparison', title: '비교', perspectives: [
        { label: '관점 A', text: '내용 A' }, { label: '관점 B', text: '내용 B' },
      ] },
      { type: 'ambiguity', summary: '불확실', scenarios: [
        { label: '조건 A', text: '설명 A' },
      ] },
      { type: 'timeline', entries: [{ label: '시기', text: '기간' }] },
      { type: 'fact_table', rows: [{ label: '명식', value: '갑자' }] },
      { type: 'source_hint', text: '확인된 설명' },
    ];
    const reading = {
      ...actual.reading,
      sections: [{
        sectionType: 'overview' as const,
        title: '출처 비교 시험',
        state: 'complete' as const,
        blocks,
      }],
      disclosures: [{
        type: 'scope_limitation' as const, text: '종합 확정 아님',
      }],
      calculationSummary: {
        ...actual.reading.calculationSummary,
        ambiguity: [{ title: '출생시각', summary: '미확정' }],
      },
    };
    const response: ProductReadingResponse = { ...actual, reading };
    const inventory = projectSajuReaderRecordsSourceInventoryV1(response);
    const base = 'response.reading.sections.0.blocks.';
    expect(inventory.segments).toEqual([
      { sourceRef: base + '0', contentHash: protectedHash('본문 하나') },
      { sourceRef: base + '1.items.0', contentHash: protectedHash('핵심 A') },
      { sourceRef: base + '1.items.1', contentHash: protectedHash('핵심 B') },
      { sourceRef: base + '2.perspectives.0', contentHash: protectedHash('비교\n관점 A: 내용 A') },
      { sourceRef: base + '2.perspectives.1', contentHash: protectedHash('비교\n관점 B: 내용 B') },
      { sourceRef: base + '4.entries.0', contentHash: protectedHash('시기: 기간') },
      { sourceRef: base + '5.rows.0', contentHash: protectedHash('명식: 갑자') },
      { sourceRef: base + '6', contentHash: protectedHash('확인된 설명') },
    ]);
    expect(inventory.disclosures).toEqual([{
      sourceRef: 'response.reading.disclosures.0',
      contentHash: protectedHash('종합 확정 아님'),
    }]);
    expect(inventory.ambiguityHashes).toEqual([
      protectedHash('불확실\n조건 A: 설명 A'),
      protectedHash('출생시각\n미확정'),
    ]);
    expect(() => projectSajuReaderRecordsSourceInventoryV1({
      ...response,
      reading: { ...reading, sections: [{
        ...reading.sections[0]!, blocks: [
          { type: 'paragraph', text: ' ' },
        ],
      }] },
    })).toThrow();
  });

  it('does not expose an inventory or apparently usable Reading on unsupported/partial responses', async () => {
    const sourceInput = await source();
    const response: ProductReadingResponse = {
      ...sourceInput.response,
      state: 'insufficient_evidence',
      messageCode: 'READING_EVIDENCE_INSUFFICIENT',
      requiredAction: 'none',
      reading: undefined,
      coverage: { state: 'insufficient', hasAvailableEvidence: false, missingRequirementCount: 1 },
    };
    expect(() => projectSajuReaderRecordsSourceInventoryV1(response)).toThrow();
    expect(inspectSajuReaderRecordsSourceHandoffV1({
      ...sourceInput, response,
    })).toMatchObject({
      state: 'blocked', canPersist: false, canDisclose: false,
    });
  });
});
