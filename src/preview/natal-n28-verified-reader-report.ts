import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import type {
  ProductReadingResponse,
  ProductReadingResponseSection,
} from '../reading/product-reading-response.js';
import { auditNatalN27bClaimReceipts } from './natal-n27b-claim-receipt-audit.js';

export const NATAL_N28_VERIFIED_READER_REPORT_VERSION =
  'saju-natal-n28-source-verified-reader-report-v1' as const;
export const NATAL_N28_REPORT_TITLE = '내 명식에서 먼저 읽을 핵심 구조' as const;
const SOURCE_TITLE = '명식별 십신 주제 연결 · 자동 실험 풀이';
const FAMILY_LABELS: Readonly<Record<string,string>> = Object.freeze({
  PEER:'비겁', RESOURCE:'인성', OUTPUT:'식상', WEALTH:'재성', OFFICER:'관성',
});
const CATEGORY = /^GENERAL_NATAL_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u;

function guard(value:unknown, reason:string): asserts value {
  if(!value) throw new TypeError('N28 reader report fail-closed: '+reason);
}

/**
 * N28 Preview report-presentation layer AFTER normal Official artifact/response.
 * Original Canonical->Official->Product prose and calculation remain untouched.
 * This is NOT authorization of new Official semantic Units or Production Claims.
 */
export function composeNatalN28VerifiedReaderReport(
  originalHttpResponse: ProductReadingResponse,
  optInN27aResponse: ProductReadingResponse,
  snapshot: CanonicalSajuSnapshot,
  interpretation: InterpretationExecutionResult,
): ProductReadingResponse {
  const receipt = auditNatalN27bClaimReceipts({
    originalHttpResponse, optInPreviewResponse:optInN27aResponse,
    snapshot, interpretation,
  });
  guard(receipt.chartBoundSourceIntegrity && receipt.originalCopyPreserved &&
    receipt.checkedClaims===receipt.expectedClaims,
    'exact independent N27b source receipts missing');
  if(receipt.checkedClaims===0) return originalHttpResponse;
  const original=originalHttpResponse.reading, experimental=optInN27aResponse.reading;
  guard(original!==undefined && experimental!==undefined,
    'missing original or opt-in reading');
  guard(!original.sections.some(s=>s.title===NATAL_N28_REPORT_TITLE),
    'report inserted twice');
  const raw=experimental.sections.filter(s=>s.title===SOURCE_TITLE);
  guard(raw.length===1 && raw[0]?.blocks.length===receipt.checkedClaims+1,
    'N27a source sections drifted');
  const positions=receipt.claimReceipts.map((item,index)=>{
    const match=CATEGORY.exec(item.claimType);
    guard(match!==null, 'unrecognized Claim thematic family');
    guard(item.position.length>0 && item.ruleIds.length>0 && item.sourceIds.length>0,
      'missing Claim-specific source proof');
    return {
      label:`${index+1}. ${FAMILY_LABELS[match[1]!]} · ${match[2]==='VISIBLE_STEMS'?'천간':'지지 대표 십신'}`,
      value:item.position,
    };
  });
  const sourceParagraphs=raw[0]!.blocks.slice(1);
  guard(sourceParagraphs.every(b=>b.type==='paragraph' && b.text.includes('전통적 주제는')),
    'verified source paragraphs have been replaced');
  const report:ProductReadingResponseSection = {
    sectionType:'structure',
    title:NATAL_N28_REPORT_TITLE,
    state:'complete',
    blocks:[
      {type:'paragraph',text:
        '실제 명식에서 확인한 십신 종류와 자리를 기준으로, 기존 전통 주제 가운데 근거가 확인된 내용을 먼저 정리했습니다. 이는 사건 예측이나 성격의 확정 판정이 아닙니다.'},
      {type:'fact_table',rows:positions},
      ...sourceParagraphs,
      {type:'source_hint',text:
        '표의 십신 위치와 아래 주제 문장은 같은 원국에서 발행된 기존 Claim, 계산된 십신과 기존 출처 문구에 결박돼 있습니다. 표의 차이만으로 길흉이나 재물·직업 결과를 단정하지 않습니다.'},
    ],
  };
  const oldSections=experimental.sections.filter(s=>s.title!==SOURCE_TITLE);
  guard(oldSections.length===original.sections.length &&
    JSON.stringify(oldSections)===JSON.stringify(original.sections),
    'original Official section order or consumer meaning changed');
  const anchor=oldSections.findIndex(s=>s.title==='주요 해석');
  guard(anchor>=0,'original Official general interpretation section absent');
  const sections=[
    ...oldSections.slice(0,anchor),
    report,
    ...oldSections.slice(anchor),
  ];
  const result:ProductReadingResponse={
    ...optInN27aResponse,
    reading:{...experimental,sections},
  };
  guard(result.reading?.readingId===original.readingId &&
    JSON.stringify(result.reading?.subject)===JSON.stringify(original.subject) &&
    JSON.stringify(result.reading?.calculationSummary)===
      JSON.stringify(original.calculationSummary) &&
    result.reading?.sections.filter(s=>s.title===NATAL_N28_REPORT_TITLE).length===1,
    'Original reading identity/chart or N28 section integrity drifted');
  return result;
}
