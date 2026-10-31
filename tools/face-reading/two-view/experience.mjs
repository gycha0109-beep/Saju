// Authored fiction from explicit choices. This function accepts no photo evidence.
export const EXPERIENCE_VERSION = 'local-fictional-reading@0.1.0';
export const TOPICS = Object.freeze([
  { id: 'work', label: '일과 도전', question: '어떤 이야기를 보고 싶으세요?' },
  { id: 'relationship', label: '관계와 만남', question: '어떤 이야기를 보고 싶으세요?' },
  { id: 'money', label: '재물과 생활', question: '어떤 이야기를 보고 싶으세요?' },
]);
export const DIRECTIONS = Object.freeze([
  { id: 'build', label: '차근차근 쌓아가는 이야기' },
  { id: 'begin', label: '새로운 길을 여는 이야기' },
  { id: 'connect', label: '함께 길을 찾는 이야기' },
]);
const stories = {
  work: {
    build: [
      '쌓인 시간이 길을 여는 형국',
      '이 가상 이야기에서는 한 번의 큰 성취보다 작은 완성이 차곡차곡 쌓이며 길이 열립니다. 주인공은 넓게 벌이던 일을 하나로 모으고, 마지막 매듭을 지으며 다음 장으로 넘어갑니다.',
      '끝내지 못했던 한 가지를 완성하는 장면',
      '빨리 보여주려는 마음과 끝까지 다듬으려는 마음이 부딪히는 장면',
    ],
    begin: [
      '첫걸음이 풍경을 바꾸는 형국',
      '이 가상 이야기의 전환점은 완벽한 준비가 아니라 작은 시작입니다. 주인공이 익숙한 자리에서 한 발 벗어나자, 예상하지 못했던 선택지가 나타나며 다음 장이 시작됩니다.',
      '작은 시도로 새로운 길을 확인하는 장면',
      '한꺼번에 모든 것을 바꾸려다 첫걸음을 놓치는 장면',
    ],
    connect: [
      '서로 다른 길이 하나로 만나는 형국',
      '이 가상 이야기에서는 혼자 풀리지 않던 일이 서로 다른 시선을 만나 움직입니다. 주인공은 역할을 나누고, 자기 몫을 분명히 하며 함께 하나의 결과를 완성합니다.',
      '서로의 역할을 정하고 협업을 시작하는 장면',
      '기대하는 결과가 다른데도 확인 없이 진행하는 장면',
    ],
  },
  relationship: {
    build: [
      '작은 약속이 인연을 잇는 형국',
      '이 가상 이야기에서 관계를 움직이는 것은 큰 선언보다 반복되는 작은 약속입니다. 주인공과 상대는 짧은 대화를 이어가며 서로의 속도를 알아가는 장면을 만납니다.',
      '작은 약속을 지키며 대화를 이어가는 장면',
      '말하지 않은 기대가 쌓여 오해가 되는 장면',
    ],
    begin: [
      '낯선 대화가 문을 여는 형국',
      '이 가상 이야기의 새 장은 평소와 다른 질문에서 시작됩니다. 주인공이 익숙한 역할을 잠시 내려놓자, 서로에 관해 몰랐던 이야기가 이어집니다.',
      '편안한 질문으로 대화의 첫 문을 여는 장면',
      '한 번의 반응을 관계 전체의 결론으로 받아들이는 장면',
    ],
    connect: [
      '서로의 속도를 맞추는 형국',
      '이 가상 이야기의 중심에는 누구 한 사람을 바꾸는 대신 함께 움직일 수 있는 속도를 찾는 장면이 있습니다. 주인공들은 각자의 말과 경계를 확인하며 관계의 모양을 새로 정합니다.',
      '서로 원하는 거리를 말로 확인하는 장면',
      '좋은 뜻이라는 이유로 상대의 경계를 넘어가는 장면',
    ],
  },
  money: {
    build: [
      '작은 그릇을 차례로 채우는 형국',
      '이 가상 이야기에는 갑자기 큰 보물을 얻는 장면 대신, 흩어져 있던 살림을 정리하는 장면이 나옵니다. 주인공이 꼭 필요한 것과 잠시 미뤄도 되는 것을 나누며 생활의 여백을 만듭니다.',
      '생활의 우선순위를 다시 적어보는 장면',
      '겉으로 풍성해 보이는 장면에만 마음을 빼앗기는 장면',
    ],
    begin: [
      '새 살림의 기준을 세우는 형국',
      '이 가상 이야기의 전환은 더 많은 것을 갖는 데서 시작되지 않습니다. 주인공이 새롭게 지키고 싶은 생활의 기준을 세우자, 무엇을 남기고 덜어낼지에 관한 이야기가 펼쳐집니다.',
      '지키고 싶은 생활의 기준을 정하는 장면',
      '새 출발이라는 이유로 모든 것을 한 번에 바꾸는 장면',
    ],
    connect: [
      '함께 쓰는 그릇의 크기를 정하는 형국',
      '이 가상 이야기에서는 함께 쓰는 자원에 관한 대화가 중심이 됩니다. 주인공들은 서로의 기대를 숨기지 않고, 함께할 몫과 각자 지킬 몫을 나누며 다음 장을 준비합니다.',
      '공동의 기대와 역할을 명확히 하는 장면',
      '좋은 관계만 믿고 서로의 약속을 생략하는 장면',
    ],
  },
};
export function buildExperience(input) {
  if (
    !input ||
    typeof input !== 'object' ||
    Array.isArray(input) ||
    Object.keys(input).length !== 2 ||
    !Object.keys(input).every((k) => ['topic', 'direction'].includes(k))
  )
    throw Error('EXPERIENCE_INPUT_INVALID');
  const topic = TOPICS.find((t) => t.id === input.topic),
    direction = DIRECTIONS.find((d) => d.id === input.direction);
  if (!topic || !direction) throw Error('EXPERIENCE_INPUT_INVALID');
  const [title, narrative, opening, tension] = stories[topic.id][direction.id];
  return {
    version: EXPERIENCE_VERSION,
    fictional: true,
    basis: 'user_selection_only',
    photoUsedForReading: false,
    topic: topic.label,
    direction: direction.label,
    title,
    narrative,
    sections: [
      { title: '이야기가 열리는 장면', text: opening },
      { title: '이야기 속 갈림길', text: tension },
    ],
    disclosure:
      '선택한 주제와 이야기 방향으로 구성한 가상 풀이입니다. 사진·얼굴 특징을 사용하지 않으며 실제 성격이나 운세를 판정한 결과가 아닙니다.',
    provenance:
      '이 프로토타입을 위해 작성한 창작 문장입니다. 고서의 원문이나 전통 관상의 판정 규칙을 인용한 결과가 아닙니다.',
  };
}
