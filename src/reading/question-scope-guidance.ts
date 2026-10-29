/**
 * Request guidance for an unanswered question, never a Claim selector or an
 * interpretation. Matches only explicit request words; uncertain intent stays
 * open. Adding context cannot grant the missing question-specific authority.
 */
export function unansweredQuestionGuidance(question: string): string {
  const text = question.normalize('NFKC').replace(/\s+/gu, ' ').trim();
  const messages: string[] = [];
  const has = (pattern: RegExp) => pattern.test(text);
  if (has(/올해|내년|내후년|이번\s*달|다음\s*달|언제|시기|몇\s*(살|년)|\d{4}년/u)) {
    messages.push('시기를 묻는 질문에는 조회할 연도·월 또는 삶의 단계 범위를 정해야 합니다. 원국 풀이만으로 사건의 시점이나 그 기간의 결과를 답할 수 없습니다.');
  }
  if (has(/궁합|상대방|그\s*사람|두\s*사람/u)) {
    messages.push('두 사람의 관계를 묻는 질문에는 상대방의 출생정보와 그 정보를 사용할 동의가 필요합니다. 두 명식이 있어도 관계를 함께 해석할 근거가 없으면 성공 여부나 상대의 마음을 판단할 수 없습니다.');
  }
  if (has(/가족|부모|아버지|어머니|아빠|엄마|자녀|아이|아들|딸/u)) {
    messages.push('가족에 관한 질문은 부모·자녀 중 누구와의 관계인지, 어떤 상황이 궁금한지 먼저 구체화해 주세요. 본인의 십신 관측만으로 가족 구성원의 성격이나 관계 결과를 정할 수 없습니다.');
  }
  if (has(/배우자|결혼|이혼|남편|아내/u)) {
    messages.push('배우자궁의 위치 설명만으로 배우자의 성격, 결혼·이혼의 발생이나 결과에 답할 수 없습니다. 위치 관찰을 실제 관계 결론으로 확장할 근거가 부족합니다.');
  }
  if (has(/이직|퇴사|취업|직장|직업|진로|커리어|면접|승진/u)) {
    messages.push('직업에 관한 선택 질문이라면 현재 역할과 비교할 선택지, 가장 중요한 조건을 알려 주세요. 기존 직업 풀이의 역할·준비·실행 관점은 참고할 수 있지만 이직 결정이나 합격·승진 결과를 대신 판단하지 않습니다.');
  }
  if (has(/재물|저축|지출|대출|부채|예산|돈|투자|주식|수익/u)) {
    messages.push('재물 질문은 자원 관리·계획 중 어떤 점을 살펴볼지 구체화해 주세요. 명식만으로 수익, 자산 금액이나 투자 매매 결정을 계산할 수 없습니다.');
  }
  if (has(/사업|창업|동업|개업|자영업/u)) {
    messages.push('사업 질문은 준비·운영·협업 중 필요한 관점과 현재 상황을 알려 주세요. 본인의 사업 관련 원국 근거로 동업 상대를 평가하거나 사업 성패를 확정할 수 없습니다.');
  }
  if (has(/연애|소통|대화|연인|애인|연락|친구/u)) {
    messages.push('연애·소통 질문은 본인의 표현 방식과 두 사람 사이의 실제 상황을 구분해 주세요. 개인의 관계 풀이만으로 상대의 감정이나 재회 여부를 답할 수 없습니다.');
  }
  if (has(/건강|질병|수명|임신|출산|병원|치료/u)) {
    messages.push('건강·질병·수명·임신·출산의 상태나 결과를 판단하는 사주 해석 근거는 제공하지 않습니다.');
  }
  if (messages.length === 0) {
    messages.push('어떤 주제의 어떤 상황이 궁금한지, 비교할 선택지가 있는지 구체적으로 알려 주세요. 질문의 주제를 추정해 다른 풀이로 대체하지 않습니다.');
  }
  return ' 해당 질문에 직접 답할 근거는 부족합니다. ' + messages.join(' ') +
    ' 보완 정보는 질문 범위를 확인하기 위한 것이며 답변 가능 여부를 보장하지 않습니다. ' +
    '기존 주제 풀이를 확인하려면 “질문: 직업운” 또는 “질문: 재물운”처럼 정확한 주제를 선택할 수 있습니다. ' +
    '해당 주제 역시 실제 해석 근거가 확인된 범위에서만 제공됩니다.';
}
