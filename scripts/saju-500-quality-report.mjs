import { readFileSync, writeFileSync } from 'node:fs';
import process from 'node:process';
import { buildGeneralAnnualAuthorityBridgeReview } from '../dist/research/general-annual-authority-bridge-review.js';
import { createGeneralMonthlyReadingCandidateRegistry } from '../dist/research/general-monthly-reading-candidate.js';

const [baselinePath, currentPath, evidencePath, jsonPath, markdownPath] = process.argv.slice(2);
if (!baselinePath || !currentPath || !evidencePath || !jsonPath || !markdownPath) {
  throw new Error('Usage: node scripts/saju-500-quality-report.mjs baseline.json current.json evidence.json output.json output.md');
}
const read = path => JSON.parse(readFileSync(path, 'utf8'));
const before = read(baselinePath);
const after = read(currentPath);
const patterns = read(evidencePath);
const MENU_NAMES = ['전체 사주', '직업·커리어', '재물', '연애·관계', '사업', '올해', '이번 달', '삶의 단계'];
if (before.seed !== '0x5a1a2026' || after.seed !== before.seed ||
    before.count !== 500 || after.count !== 500 ||
    before.failedCases !== 0 || after.failedCases !== 0 ||
    MENU_NAMES.some(menu => before.caseResults?.[menu]?.length !== 500 ||
      after.caseResults?.[menu]?.length !== 500)) {
  throw new Error('Both audits must be complete, fixed-seed 500×8 case results without execution failures');
}
const stateCounts = rows => Object.fromEntries([...new Set(rows.map(r => r.state))].sort()
  .map(state => [state, rows.filter(r => r.state === state).length]));
const menus = MENU_NAMES.map(name => {
  const original = before.caseResults[name];
  const current = after.caseResults[name];
  const transitions = {};
  let meaningChanged = 0;
  let textChanged = 0;
  let evidenceChanged = 0;
  let calculationChanged = 0;
  for (let i=0;i<current.length;i++) {
    const a=original[i], b=current[i];
    if(a.birth !== b.birth) throw new Error('Population alignment differs for '+name+' index '+i);
    if(a.calculationHash !== b.calculationHash) calculationChanged++;
    if(a.meaningSignature !== b.meaningSignature) meaningChanged++;
    if(a.exactTextHash !== b.exactTextHash) textChanged++;
    if(a.selectedEvidenceSignature && b.selectedEvidenceSignature &&
       a.selectedEvidenceSignature !== b.selectedEvidenceSignature) evidenceChanged++;
    const key=a.state+' → '+b.state;
    transitions[key]=(transitions[key]??0)+1;
  }
  const summary=after.menuResults[name];
  if ((name === '올해' || name === '이번 달') &&
      (current.some(row=>!row.compositionEvidence || !row.calculatedStructure ||
         row.calculatedStructure.interpretationAuthorityGranted !== false))) {
    throw new Error('Temporal reading must expose exact, non-authorized chart facts for every case');
  }
  if(name==='이번 달' && current.some(row=>
      !Array.isArray(row.existingT9EvidenceLinks) ||
      row.existingT9EvidenceLinks.length !== row.compositionEvidence.length ||
      row.existingT9EvidenceLinks.some(link=>link.newT9Claims!==0 ||
        (link.existingT9Link==='matched_source_owned_theme' && !link.existingT9ClaimId)))) {
    throw new Error('Monthly research must keep exact original T9 Claim links without new issuance');
  }
  const unexplained=current.filter(r=>r.sectionCount === 0 &&
    !r.text.trim() && !(r.coverageExplanation?.trim()) &&
    !(r.sourceEvidence && name === '삶의 단계')).length;
  return {
    name,
    beforeStates:stateCounts(original),
    afterStates:stateCounts(current),
    calculationChanged, meaningChanged, textChanged, evidenceChanged,
    transitions,
    withoutText:summary.withoutReadableText,
    withoutSectionsOrExplanation:summary.withoutSectionsOrExplanation,
    unexplainedCases:unexplained,
    beforeMeaningProfiles:before.menuResults[name].meaningProfile.unique,
    afterMeaningProfiles:summary.meaningProfile.unique,
    afterExactTexts:summary.exactText.unique,
    calculatedStructureCoverage:summary.calculatedStructureCoverage??0,
    calculatedStructureVariants:summary.calculatedStructureProfiles?.unique??0,
    compositionCoverage:summary.compositionCoverage??0,
    compositionVariants:summary.compositionPatterns?.unique??0,
    existingT9LinkCoverage:summary.existingT9LinkCoverage??0,
    existingT9LinkTotal:summary.existingT9LinkTotal??0,
    existingT9LinkedClaims:summary.existingT9LinkedClaims??0,
    annualDayunObservedMatches:summary.annualDayunObservedMatches??0,
    example: current.find(r=>r.text.trim()) ? (() => {
      const found=current.find(r=>r.text.trim());
      return {
        birth:found.birth,
        meaningSignature:found.meaningSignature,
        selectedEvidenceSignature:found.selectedEvidenceSignature??null,
        koreanExcerpt:found.text.slice(0,500),
      };
    })() : null,
  };
});
const annual = buildGeneralAnnualAuthorityBridgeReview();
const monthlyRegistry = createGeneralMonthlyReadingCandidateRegistry('2026-10-25T00:00:00.000Z');
const annualAuthorized = annual.authorityState.annualSpecificSourceAuthorityEstablished &&
  annual.authorityState.productionAdmissionAuthority;
const monthlyAuthorized = monthlyRegistry.pack.status === 'production';
const studyOnly = ['mayPublish', 'maySell', 'mayCallOfficial'].every(name =>
  Object.hasOwn(after.permissions ?? {}, name) && after.permissions[name] === false);
const qualityGate = {
  fixed500Execution:after.failedCases === 0,
  fixed500InputsUnchanged:menus.every(m=>m.calculationChanged===0),
  noMissingExplanation:menus.every(m=>m.unexplainedCases===0),
  officialPermissionsNotGranted:studyOnly,
  sourceBoundObservedPatterns:patterns.distinctSourceBoundEvidencePatterns,
  inspectedPatterns:patterns.inspectedPatterns.length,
  controlledPairs:patterns.controlledPairs?.length??0,
  originalMonthlyT9EvidenceLinksPreserved:menus.find(m=>m.name==='이번 달')?.existingT9LinkCoverage===500,
  newTemporalInterpretationClaimsIssued:0,
  annualSemanticAuthority:annualAuthorized,
  monthlySemanticAuthority:monthlyAuthorized,
  finalRoadmapAccepted:false,
};
const report = {
  scope:'saju fixed-seed 500×8 quality comparison',
  seed:after.seed, cases:after.count, reference:'2026-10-25T00:00:00.000Z',
  gate:'HOLD',
  reason:'연운과 월운의 원국 결합 의미 방법론·출처 권한이 확립되지 않아 전 로드맵 완료·통합 승격은 보류합니다.',
  qualityGate, menus,
  limitations:[
    '해석 유형 개수와 원문 개수는 실제 명리 해석의 진실성이나 다양성을 입증하지 않습니다.',
    '원국 구조 관측 패턴이 달라도 독립적인 미래 운세 결론이 추가된 것은 아닙니다.',
    '현재 연구 결과는 Official/Production/공개/저장/판매로 승격하지 않습니다.',
  ],
};
writeFileSync(jsonPath,JSON.stringify(report,null,2)+'\n','utf8');
const table = menus.map(m => '| '+m.name+' | '+m.beforeMeaningProfiles+' → '+m.afterMeaningProfiles+
  ' | '+m.meaningChanged+' | '+m.textChanged+' | '+m.unexplainedCases+' |').join('\n');
const examples=menus.filter(m=>m.example).map(m=>
  '### '+m.name+'\n\n- 명식 입력: '+m.example.birth+
  '\n- 의미 서명: '+m.example.meaningSignature+
  '\n- 실제 한국어 풀이 발췌: '+m.example.koreanExcerpt.replace(/\n/g,' ')+'\n').join('\n');
const markdown = '# 사주 고정 500건 × 8메뉴 개선 비교\n\n'+
  '판정: **HOLD — 로드맵 최종 완료/통합 불가**\n\n'+report.reason+'\n\n'+
  '고정 입력: 시드 '+report.seed+', 500명, 조회시각 '+report.reference+'\n\n'+
  '| 메뉴 | 해석 프로필 전후 | 의미 변경 사례 | 원문 변경 사례 | 무설명 공백 |\n'+
  '| --- | ---: | ---: | ---: | ---: |\n'+table+'\n\n'+
  '검증된 출처 연결 관측 근거: '+qualityGate.sourceBoundObservedPatterns+'종; 표본 '+qualityGate.inspectedPatterns+
  '종; 계산 근거가 다른 대조 입력쌍 '+qualityGate.controlledPairs+'쌍. 이 숫자는 독립 운세 수가 아닙니다.\n\n'+
  '계산 입력 유지: '+qualityGate.fixed500InputsUnchanged+
  ', 오류 0: '+qualityGate.fixed500Execution+
  ', 무설명 공백 0: '+qualityGate.noMissingExplanation+
  ', 연구 권한 보존: '+qualityGate.officialPermissionsNotGranted+'\n\n'+
  '연운 계산 사실 연결: '+menus.find(m=>m.name==='올해').calculatedStructureCoverage+
  '/500, 월운 계산 사실 연결: '+menus.find(m=>m.name==='이번 달').calculatedStructureCoverage+
  '/500. 관계 조건 결합: '+menus.find(m=>m.name==='올해').compositionCoverage+
  '/500, 계산 관계 패턴 '+menus.find(m=>m.name==='올해').compositionVariants+
  '종. 이 숫자는 새로운 예측·의미 해석을 뜻하지 않습니다.\n\n'+
  '기존 월운 T9 연구 Claim에 연결한 실제 계산 구간: '+
  menus.find(m=>m.name==='이번 달').existingT9LinkedClaims+
  '개 / 총 계산 구간 '+menus.find(m=>m.name==='이번 달').existingT9LinkTotal+
  '개. 대운–연운 충·육합 관측 구간 '+
  menus.find(m=>m.name==='이번 달').annualDayunObservedMatches+
  '개. 새로운 해석 Claim 발행 0개 (R153/R154 source authority HOLD).\n\n'+
  '## 실제 한국어 결과 예시\n\n'+examples+'\n## 미확립 범위\n\n'+
  report.limitations.map(x=>'- '+x).join('\n')+'\n';
writeFileSync(markdownPath,markdown,'utf8');
process.stdout.write('SAJU_500_QUALITY_GATE '+JSON.stringify(qualityGate)+'\n');
