import { URLSearchParams } from 'node:url';

/** Each visible option is an existing Saju reading scope, not new authority. */
export const SAJU_READING_MENUS = Object.freeze([
  { id: 'general', label: '전체 사주', group: '나를 읽기' },
  { id: 'career', label: '직업·커리어', group: '나를 읽기' },
  { id: 'wealth', label: '재물', group: '나를 읽기' },
  { id: 'relationship', label: '연애·관계', group: '나를 읽기' },
  { id: 'business', label: '사업', group: '나를 읽기' },
  { id: 'annual', label: '올해', group: '지금의 흐름' },
  { id: 'monthly', label: '이번 달', group: '지금의 흐름' },
  { id: 'life-stage', label: '삶의 단계', group: '지금의 흐름' },
  { id: 'family', label: '가족', group: '사람과의 관계' },
  { id: 'spouse', label: '배우자·관계', group: '사람과의 관계' },
  { id: 'compatibility', label: '궁합', group: '사람과의 관계' },
  { id: 'question', label: '지금 고민으로 보기', group: '고민이 있다면' },
]);

const NATAL_MENU_IDS = Object.freeze(['general', 'career', 'wealth', 'relationship', 'business']);
const h = text => String(text).replace(/[&<>"']/gu, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function localPeriod() {
  return new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 7);
}

/** Input validation stays in the private local browser, before invoking any engine. */
export function validateSajuMenuForm(form, validateBirth) {
  const menu = form.get('readingMenu') ?? 'general';
  if (!SAJU_READING_MENUS.some(item => item.id === menu)) {
    throw new TypeError('열두 항목 중 하나를 선택해 주세요.');
  }
  const targetPeriod = form.get('targetPeriod') || localPeriod();
  if (menu === 'annual' || menu === 'monthly') {
    const valid = /^(\d{4})-(\d{2})$/u.exec(targetPeriod);
    if (!valid || Number(valid[1]) < 1800 || Number(valid[1]) > 2300 ||
        Number(valid[2]) < 1 || Number(valid[2]) > 12) {
      throw new TypeError('조회할 연월을 YYYY-MM 형식으로 입력해 주세요.');
    }
  }
  const question = form.get('question')?.trim() || '';
  if (menu === 'question' && (question.length < 2 || question.length > 400)) {
    throw new TypeError('확인하고 싶은 질문을 2~400자로 적어 주세요.');
  }
  let partner;
  if (menu === 'compatibility') {
    if (form.get('partnerBirthAuthorized') !== 'on') {
      throw new TypeError('상대 출생정보의 사용 권한을 확인해야 궁합 계산을 진행할 수 있습니다.');
    }
    const partnerForm = new URLSearchParams({
      date: form.get('partnerDate') || '',
      time: form.get('partnerTime') || '',
      calendarType: form.get('partnerCalendarType') || 'solar',
      sex: form.get('partnerSex') || 'unspecified',
    });
    if (form.get('partnerTimeUnknown') === 'on') partnerForm.set('timeUnknown', 'on');
    if (form.get('partnerLeapMonth') === 'on') partnerForm.set('isLeapMonth', 'on');
    partner = validateBirth(partnerForm);
  }
  return { menu, targetPeriod, question, ...(partner ? { partner } : {}) };
}

function birthInput(entered) {
  const [year, month, day] = entered.date.split('-').map(Number);
  const [hour, minute] = entered.time === 'unknown'
    ? [undefined, undefined] : entered.time.split(':').map(Number);
  return {
    calendarType: entered.calendarType,
    date: { year, month, day },
    time: hour === undefined ? { known: false } : { known: true, hour, minute },
    sexForTraditionalCalculation: entered.sex,
    ...(entered.calendarType === 'lunar' ? { isLeapMonth: entered.isLeapMonth } : {}),
  };
}

function privatePage(heading, content, explanation) {
  return '<!doctype html><html lang="ko"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>명하 사주 · ' + h(heading) + '</title>' +
    '<style>body{font:16px/1.8 system-ui,sans-serif;margin:0;background:#f9f7f2;color:#272b29}' +
    'main{max-width:830px;margin:35px auto;padding:20px}header{background:#243c37;color:white;padding:25px;border-radius:14px}' +
    'article{margin:14px 0;padding:17px 20px;border:1px solid #dedbd4;background:white;border-radius:12px}' +
    'h3{margin:0 0 8px}small,aside,details{font-size:13px;color:#666;overflow-wrap:anywhere}' +
    'aside{background:#eae7df;padding:16px;border-radius:12px}a{color:#32705e}</style>' +
    '</head><body><main><p><a href="/">← 다른 풀이 선택</a></p>' +
    '<header><small style="color:#d4e2dc">명하 · 개인 명식 연구용</small><h1>' +
    h(heading) + '</h1><p>' + h(explanation) +
    '</p></header><section>' + content + '</section>' +
    '<aside>기존 계산·출처의 허용된 범위만 표시합니다. 충분하지 않은 근거는 실제 미래·가족·결혼 결과로 보충하지 않습니다.' +
    ' 정식 서비스·공개·보관·판매 권한은 없습니다.</aside></main></body></html>';
}

function addBackLink(html, label) {
  if (typeof html !== 'string' ||
      !html.toLowerCase().startsWith('<!doctype html>') ||
      !html.includes('<body>') || !html.includes('</body>')) {
    throw new Error('기존 사주 결과 문서 형식을 확인할 수 없습니다.');
  }
  const nav = '<nav style="padding:10px 20px;background:#eff3ef">' +
    '<a href="/" style="color:#245f4d;font-weight:bold">← 항목 다시 선택</a>' +
    ' <small> · 선택한 항목: ' + h(label) + ' · 내부 연구용</small></nav>';
  return html.replace('<body>', '<body>' + nav);
}

function assertRestricted(result, label) {
  if (result.mayPublish !== false || result.maySell !== false ||
      result.mayGrantOfficialAuthority !== false) {
    throw new Error(label + ' 결과의 연구용 권한 범위를 확인할 수 없습니다.');
  }
}

async function renderQuestion(birth, question, now) {
  const [
    calc, run, genR, careerR, wealthR, businessR, relationR,
    genP, careerP, wealthP, businessP, relationP, questionR,
  ] = await Promise.all([
    import('../dist/production/production-calculation-runtime.js'),
    import('../dist/interpretation/interpretation-engine.js'),
    import('../dist/research/general-natal-multifactor-candidate.js'),
    import('../dist/research/career-natal-multifactor-candidate.js'),
    import('../dist/research/wealth-natal-multifactor-candidate.js'),
    import('../dist/research/business-natal-multifactor-candidate.js'),
    import('../dist/research/relationship-natal-multifactor-candidate.js'),
    import('../dist/preview/general-natal-multifactor-report.js'),
    import('../dist/preview/career-natal-multifactor-report.js'),
    import('../dist/preview/wealth-natal-multifactor-report.js'),
    import('../dist/preview/business-natal-multifactor-report.js'),
    import('../dist/preview/relationship-natal-multifactor-report.js'),
    import('../dist/preview/question-related-natal-reading.js'),
  ]);
  const snapshot = calc.calculateAuthorizedMyeonghwaProductionSnapshot(birth, { now }).snapshot;
  const registry = {
    general: genR.createGeneralNatalMultifactorRegistry(),
    career: careerR.createCareerMultifactorResearchRegistry(),
    wealth: wealthR.createWealthNatalMultifactorRegistry(),
    business: businessR.createBusinessNatalMultifactorRegistry(),
    relationship: relationR.createRelationshipNatalMultifactorRegistry(),
  };
  const reports = {
    general: genP.buildGeneralNatalMultifactorReport(
      snapshot, run.runInterpretation(snapshot, registry.general, { now }), registry.general),
    career: careerP.buildCareerMultifactorResearchReport(
      snapshot, run.runInterpretation(snapshot, registry.career, { now }), registry.career),
    wealth: wealthP.buildWealthNatalMultifactorReport(
      snapshot, run.runInterpretation(snapshot, registry.wealth, { now }), registry.wealth),
    business: businessP.buildBusinessNatalMultifactorReport(
      snapshot, run.runInterpretation(snapshot, registry.business, { now }), registry.business),
    relationship: relationP.buildRelationshipNatalMultifactorReport(
      snapshot, run.runInterpretation(snapshot, registry.relationship, { now }), registry.relationship),
  };
  const response = questionR.buildQuestionRelatedNatalReading(snapshot, {
    requestId: 'local-question-reading',
    intent: { domain: 'question_specific', temporalScope: 'natal' },
    question,
  }, reports);
  if (!response.researchOnly || response.usefulComplete ||
      response.mayPublish || response.maySell ||
      response.snapshotId !== snapshot.snapshotId ||
      response.calculationHash !== snapshot.calculationHash) {
    throw new Error('기존 질문 관련 결과의 출처와 범위를 확인할 수 없습니다.');
  }
  return questionR.renderQuestionRelatedNatalReadingHtml(response);
}

/**
 * Real reading result for one of the seven non-natal cards.
 * All semantics come from existing, exact source-owned readers; no meaning
 * is generated by this local presentation layer.
 */
export async function renderLocalSelectedSajuMenuReading(entered, selection) {
  if (NATAL_MENU_IDS.includes(selection.menu)) {
    throw new TypeError('원국 5분야는 기존 개인별 사주 풀이 경로를 사용합니다.');
  }
  const birth = birthInput(entered);
  const now = new Date();
  const instant = now.toISOString();
  const label = SAJU_READING_MENUS.find(item => item.id === selection.menu)?.label;
  if (!label) throw new TypeError('선택한 풀이 항목을 확인할 수 없습니다.');
  let html;
  if (selection.menu === 'annual' || selection.menu === 'monthly') {
    const runtime = await import('../dist/preview/annual-monthly-birth-research-runtime.js');
    const [year, month] = selection.targetPeriod.split('-').map(Number);
    const result = runtime.buildAnnualMonthlyBirthResearchReading(birth, {
      requestId: 'local-selected-time-reading',
      targetYear: year, targetMonth: month,
      referenceDateTime: instant,
    });
    assertRestricted(result, label);
    if (result.report.researchOnly !== true ||
        result.monthlyMenu.authority.mayMarkMenuAvailable ||
        result.monthlyMenu.authority.mayCallOfficial) {
      throw new Error('연운·월운은 아직 연구용입니다.');
    }
    html = result.html;
  } else if (selection.menu === 'life-stage') {
    const runtime = await import('../dist/preview/life-stage-birth-research-runtime.js');
    const result = runtime.buildLifeStageBirthResearchReading(birth, instant);
    assertRestricted(result, label);
    if (result.report.interpretationStatus !== 'source_authority_not_established') {
      throw new Error('삶의 단계 계산을 사건 예측으로 승격할 수 없습니다.');
    }
    html = result.html;
  } else if (selection.menu === 'family') {
    const runtime = await import('../dist/preview/family-birth-research-runtime.js');
    const parents = runtime.buildFamilyBirthResearchReading(birth, {
      scope: 'parents', referenceDateTime: instant,
    });
    const children = runtime.buildFamilyBirthResearchReading(birth, {
      scope: 'children', referenceDateTime: instant,
    });
    assertRestricted(parents, label);
    assertRestricted(children, label);
    if (parents.report.snapshotId !== children.report.snapshotId ||
        parents.report.calculationHash !== children.report.calculationHash ||
        parents.mayClaimFamilyOutcome || children.mayClaimFamilyOutcome) {
      throw new Error('가족 범위의 명식 출처가 서로 다르거나 허용되지 않았습니다.');
    }
    const item = (title, read) => '<article><h2>' + h(title) + '</h2>' +
      read.report.observations.map(o =>
        '<p>' + h(o.text) + '</p><details><summary>계산 경로</summary>' +
        '<p>' + h(o.factPath) + '</p></details>').join('') +
      read.report.missing.map(reason => '<p>' + h(reason) + '</p>').join('') +
      '</article>';
    html = privatePage(label,
      item('부모와 관련된 본인 명식', parents) +
      item('자녀와 관련된 본인 명식', children),
      '본인 명식의 각 위치를 구분해 확인합니다. 부모와 자녀의 실제 삶은 단정하지 않습니다.');
  } else if (selection.menu === 'spouse') {
    const runtime = await import('../dist/preview/spouse-position-birth-research-runtime.js');
    const result = runtime.buildSpousePositionBirthResearchReading(birth, instant);
    assertRestricted(result.report, label);
    if (result.report.mayInferPartnerTraits || result.report.mayPredictMarriage) {
      throw new Error('배우자궁 위치를 상대 개인의 특징이나 미래 결과로 사용할 수 없습니다.');
    }
    html = result.html;
  } else if (selection.menu === 'compatibility') {
    if (!selection.partner) throw new TypeError('상대방 출생정보가 필요합니다.');
    const runtime = await import('../dist/preview/compatibility-two-birth-research-runtime.js');
    const result = runtime.buildCompatibilityTwoBirthResearchReading(
      birth, birthInput(selection.partner), {
        requestId: 'local-two-person-research',
        subjectPersonRef: 'self', targetPersonRef: 'other',
        referenceDateTime: instant,
      });
    assertRestricted(result, label);
    if (result.mayClaimInterpersonalMeaning || result.mayMarkMenuAvailable ||
        result.report.readingStatus !== 'insufficient_interpersonal_meaning_authority') {
      throw new Error('두 명식 비교는 공식 상호 궁합 해석이 아닙니다.');
    }
    html = result.html;
  } else if (selection.menu === 'question') {
    html = await renderQuestion(birth, selection.question, now);
  } else {
    throw new TypeError('지원되지 않는 항목입니다.');
  }
  return addBackLink(html, label);
}
