/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import { FormEvent, useEffect, useRef, useState } from 'react';
import fetchGPT from '../../hooks/useGPT';
import prevIcon from '/img/icon-page-prev.svg';
import wishIcon from '/img/icon-wish-profile.svg';
import sendIcon from '/img/icon-send.svg';
import CounselingGuide from './CounslingGuide';
import { useParams } from 'react-router-dom';

interface Message {
  sender?: string;
  message?: string;
}

const Counseling = () => {
  const name = '위시';
  const scrollBoxRef = useRef<HTMLDivElement>(null);
  const initMessage = {
    sender: 'gpt',
    message: `안녕하세요 ${name}님😊 사회적 관계에서 느끼는 부담이나 배우자의 소통문제, 그리고 부부관계에 대한 고민까지, 난임으로 인해 힘드신 모든 마음을 편하게 나눠주세요. 어려움을 해결할 수 있도록 도와드릴게요☺️`,
  };
  const [messages, setMessages] = useState<Message[]>([initMessage]);
  const [lastMsg, setLastMsg] = useState({ user: '', gpt: '' });
  const [dataForPrompt, setDataForPrompt] = useState({ summary: '', count: 1, tag: [] });
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const prompt = `
  1. 답변 형식: {"answer": "내용", "summary": {"상황": "스트레스를 받은 상황", "감정": "스트레스 상황에 대한 감정", "자동적사고": "상황을 접하여 떠올린 자기, 미래, 세상에 대한 자동적인 생각. '~한다.' 식으로 요약", "핵심신념": "부정적인 자동적 사고를 활성화시키는 기저 신념. '~한다.' 식으로 요약", "행동": "스트레스를 받은 후 행동"}, "tag": ["이전 태그", "새로운 태그"]}.
  2. 사용자 특성: 이름(이소정), 난임 진단, 난임 스트레스 척도 140점/230점
  3. 상담 기법: 인지행동치료, 소크라테스식 질문
  4. 상담 목표: 난임스트레스 감소, 공감, 인지적 왜곡 및 부정적 자동적 사고 탐색
  5. 대화 횟수: ${dataForPrompt.count}
  6. 사례개념화: ${dataForPrompt.summary}
  7. 주고받은 대화: ${lastMsg}
  8. 이전 태그: ${dataForPrompt.tag}
  9. answer:
    - 사레개념화와 주고받은 대화를 참고하여 다음 중 한 가지로 따뜻한 상담사 어조로 상담을 해줘.
      1) 사용자에게서 인지적 왜곡이나 부정적인 사고가 관찰된다면, 다양한 관점을 깨달을 수 있도록 소크라테스식 질문을 해줘.
      2) 사용자가 다른 관점을 생각하지 못한다면, 주고받은 대화를 참고해서 다른 관점을 제시해줘.
      3) 사용자가 부적절한 방식으로 반응을 한다면, 상황에 따라 적절한 반응을 깨달을 수 있는 질문을 해줘.
      4) 대화 횟수가 10회 이상이라면 사용자의 비합리적인 핵심 신념을 직면할 수 있는 질문을 해줘.
         (비합리적 핵심신념: 융통성과 현실성이 없고 현실을 행복하게 사는데 유용하지 않음)
    - 사용자가 하는 말은 무조건 주고받은 대화에서 이어지는 내용이야. 주고받은 대화를 꼭 참고해서 답변해줘.
    - 사용자의 신념은 직접 언급하지 말아줘.
    - 종종 말 줄임표를 사용하고, 이미 파악된 내용은 다시 물어보지 말아줘.
    - 150자 이내로 한글로 쉬운 용어를 사용하고 존댓말을 사용해 줘.
    - 한 번에 질문은 하나만 해줘.
    - 만약 사용자가 자살과 관련 얘기를 한다면 자살예방상담전화(109) 정보를 제공해줘.
  - summary:
    - summary를 계속 업데이트 하며 하나의 사례개념화를 완성해줘.
    - 만약 새로운 summary가 전달받은 summary와 내용이 다르다면, 전달받은 summary 내용을 유지하거나 구체화해서 업데이트 해줘.
  - tag:
    - 사용자의 말에서 다음 중 해당하는게 있다면 이전 태그에 이어붙여줘. 새로운 태그를 배열 뒤에 추가해줘.
      - 스트레스를 제공한 대상 또는 장소, 상황
      - 다른 상담과 구분될 수 있는 유니크한 단어
    - 이때 사용자의 단어를 그대로 사용해줘.`;

  const moveScrollDown = () => {
    const { scrollHeight, clientHeight } = scrollBoxRef.current as HTMLDivElement;
    if (!scrollBoxRef.current) return;

    scrollBoxRef.current.scrollTo({ top: scrollHeight - clientHeight, behavior: 'smooth' });
  };

  const addMessage = (sender: string, message: string) => {
    setMessages((prev) => [...prev, { sender, message }]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 사용자 입력란이 공백일 경우 함수 실행 X
    if (!userInput.trim()) {
      setUserInput('');
      return null;
    }

    addMessage('user', userInput);
    const userMsg = userInput;
    setUserInput('');
    setIsLoading(true);

    const data = await fetchGPT(prompt, userInput);
    const dataToObj = JSON.parse(data.choices[0].message.content);
    addMessage('gpt', dataToObj.answer);
    setLastMsg({ user: userMsg, gpt: dataToObj.answer });
    setDataForPrompt({ summary: dataToObj.summary, count: dataForPrompt.count + 1, tag: dataToObj.tag });
    setIsLoading(false);
    console.log(dataToObj, dataForPrompt);
  };

  //상담 시작 날짜 가져오는 함수
  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  }
  const now = new Date();
  const toDay = formatDate(now);

  //가이드 영역
  const [step, setStep] = useState<number>(1);
  const [guideVisible, setGuideVisible] = useState(false);
  const params = useParams();

  //페이지 진입시 .5초뒤에 가이드 시작
  useEffect(() => {
    const popupShown = localStorage.getItem('counselingGuide');

    if (!params.id) localStorage.removeItem('counselingGuide');

    if (!popupShown) {
      localStorage.setItem('counselingGuide', 'true');
      const timer = setTimeout(() => {
        setGuideVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (step === 4) {
      setGuideVisible(false);
    }
  }, [step]);

  useEffect(() => {
    moveScrollDown();
  }, [messages]);

  return (
    <>
      {guideVisible && <CounselingGuide step={step} setStep={setStep} guideVisible={guideVisible} />}

      <div css={BackGroundColor}>
        <div css={Header}>
          <button className="prev" type="button">
            <span className="hidden">뒤로가기</span>
          </button>
          <h2>심리상담사 위시</h2>
          <button css={step === 3 && Priority} className="end" type="button">
            종료
          </button>
        </div>

        <div className="scroll-box" ref={scrollBoxRef} css={ScrollBox}>
          <p className="dateText">{toDay}</p>
          <ul css={[MessageBox, step === 2 && Priority]}>
            {messages.map(({ sender, message }, idx) => (
              <li key={`${sender}-${message!.slice(0, 10)}-${idx}`} className={sender}>
                <p> {message}</p>
              </li>
            ))}
          </ul>
        </div>

        <form css={[InputBox, step === 1 && Priority]} onSubmit={(e) => handleSubmit(e)}>
          <input type="text" name="" id="" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
          <button>
            <span className="hidden">전송</span>
          </button>
          {isLoading && '로딩중'}
        </form>
      </div>
    </>
  );
};

export default Counseling;

const Priority = css`
  background-color: #fdfcff;
  position: relative;
  z-index: 3;
`;

const BackGroundColor = css`
  background-color: #fdfcff;
  margin: -2rem -1.8rem;
`;
const Header = css`
  background-color: #fdfcff;
  display: flex;
  max-width: 50rem;
  width: 100%;
  padding: 2rem 1.8rem;
  box-sizing: border-box;
  min-height: ${variables.headerHeight};
  align-items: flex-end;
  justify-content: center;
  box-shadow: 0 0 3rem rgba(217, 203, 245, 0.37);

  .prev {
    display: block;
    background-image: url(${prevIcon});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cotain;
    width: 5rem;
    height: 2rem;
  }

  h2 {
    font-size: ${variables.size.large};
    font-weight: 700;
    margin: 0 auto;
  }

  .end {
    font-size: ${variables.size.big};
    background-color: ${variables.colors.secondarySoft};
    color: ${variables.colors.secondaryStrong};
    padding: 0.6rem 1rem;
    border-radius: 0.6rem;
  }
`;

const ScrollBox = css`
  max-width: 50rem;
  width: 100%;
  height: calc(100svh - ${variables.headerHeight} - 10rem);
  overflow: hidden auto;
  padding: 1.8rem;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }

  & .dateText {
    font-size: ${variables.size.small};
    margin-bottom: 2rem;
    color: #868581;
    text-align: center;
  }
`;

const MessageBox = css`
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  align-items: flex-start;

  li > p {
    padding: 1.4rem 2.2rem;
    max-width: 27rem;
  }

  .gpt {
    display: flex;
    gap: ${variables.size.big};
    align-items: flex-end;

    & p {
      background-color: ${variables.colors.primarySoft};
      box-shadow: ${variables.BoxShadow};
      border-radius: 2rem 2rem 2rem 0;
    }

    &::before {
      content: '';
      display: block;
      background-image: url(${wishIcon});
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      width: 4.8rem;
      height: 4.8rem;
    }
  }

  .user {
    margin-left: auto;
    border-radius: 2rem 2rem 0 2rem;
    background-color: ${variables.colors.white};
    box-shadow: 0 0 0.5rem rgba(217, 203, 245, 0.15);
  }
`;

const InputBox = css`
  background-color: #f8f4ff;
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  max-width: 50rem;
  width: 100%;
  padding: 2rem 1.8rem;
  box-sizing: border-box;
  display: flex;
  gap: 0.8rem;

  & input {
    height: 4rem;
    box-shadow: 0 0 1rem rgba(217, 203, 245, 0.37);
  }

  & button {
    width: 5.6rem;
    height: 4rem;
    border-radius: 1.4rem;
    box-shadow: 0 0 1rem rgba(217, 203, 245, 0.37);
    background-color: ${variables.colors.primaryStrong};
    background-image: url(${sendIcon});
    background-repeat: no-repeat;
    background-position: center;
  }
`;
