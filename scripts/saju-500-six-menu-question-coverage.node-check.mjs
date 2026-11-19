import { test } from 'node:test';
import assert from 'node:assert/strict';
import { auditSixMenuQuestionCoverage } from './saju-500-six-menu-question-coverage.mjs';

const natal = (...axes) => ({ text: '읽을 수 있는 근거 문단', meaningComponents: axes.map(axis=>['claim','pattern',axis,'branches']) });
const annual = sections => ({ text: '기간 근거', sourceEvidence: { annualCalendarPolicy:'civil_year_only', sections } });
const monthly = sections => ({ text: '월간 근거', sourceEvidence: { referenceState:'in_period', sections } });

test('observes each of six existing research menus without inventing product answers', () => {
  const result = auditSixMenuQuestionCoverage({
    '직업·커리어':[natal('execution','responsibility'),natal('preparation')],
    '사업':[natal('core'),natal('execution','coordination')],
    '재물':[natal(),natal('core','management')],
    '연애·관계':[natal('expression'),natal('core','boundaries')],
    '올해':[annual([{kind:'core'}]),annual([{kind:'core'},{kind:'tension'}])],
    '이번 달':[monthly([{kind:'theme',segmentId:'before_jeol'}]),monthly([{kind:'theme',segmentId:'after_jeol'},{kind:'tension',segmentId:'after_jeol'}])],
  });
  const get=(menu,id)=>result.menus[menu].questions.find(q=>q.id===id);
  assert.equal(result.caseCountPerMenu,2);
  assert.equal(get('재물','core').withDisplayedResearchEvidence,1);
  assert.equal(get('직업·커리어','work_output').withDisplayedResearchEvidence,1);
  assert.equal(get('올해','annual_tension').withDisplayedResearchEvidence,1);
  assert.equal(get('이번 달','after_jeol').withDisplayedResearchEvidence,1);
  assert.equal(get('연애·관계','relationship_outcome').status,'not_supported_by_current_research_report');
  assert.equal(get('사업','business_outcome').withDisplayedResearchEvidence,0);
  assert.equal(result.officialProductReadiness,'not_evaluated_by_this_audit');
});

test('rejects incomplete and uneven input rather than reporting fake coverage', () => {
  assert.throws(()=>auditSixMenuQuestionCoverage({'재물':[natal('core')]}),/equal, nonempty/);
});

test('blank consumer text never counts as delivered evidence', () => {
  const row={text:'',meaningComponents:[['claim','pattern','core','branches']]};
  const data=Object.fromEntries(['직업·커리어','사업','재물','연애·관계','올해','이번 달'].map(x=>[x,[row]]));
  assert.equal(auditSixMenuQuestionCoverage(data).menus['재물'].questions[0].withDisplayedResearchEvidence,0);
});
