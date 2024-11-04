/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import variables from '@styles/Variables';
import { FormEvent, useEffect, useState } from 'react';
import fetchGPT from '../../hooks/useGPT';
import prevIcon from '/img/icon-page-prev.svg';
import wishIcon from '/img/icon-wish-profile.svg';
import sendIcon from '/img/icon-send.svg';
import arrow from '/img/icon-guide-arrow.svg';

interface Message {
  sender?: string;
  message?: string;
}

const Counseling = () => {
  const name = '위시';
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
  const [throttle, setThrottle] = useState(false);

  const handleStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!throttle) {
      setThrottle(true);
      setTimeout(() => {
        if ((e.target as HTMLButtonElement).classList.contains('skip')) {
          setStep(4);
        } else {
          setStep(step + 1);
        }
        setThrottle(false);
      }, 500);
    }
  };

  //페이지 진입시 .5초뒤에 가이드 시작
  useEffect(() => {
    const timer = setTimeout(() => {
      setGuideVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (step === 4) {
      setGuideVisible(false);
    }
  }, [step]);

  //가이드 설명 위치 변경 함수
  const guideDesc = (step: number, targetStep: number) => {
    return step === targetStep
      ? css`
          display: block;
          text-align: center;
          line-height: 2.2rem;
          width: 100%;
          font-size: ${variables.size.big};
          position: absolute;
          ${targetStep === 1 && 'left: 50%; bottom: 15rem ;transform: translateX(-50%);'}
          ${targetStep === 2 && 'left: 50%; top:40rem ;transform: translateX(-50%);'}
          ${targetStep === 3 &&
          'text-align: right; right: 3.8rem; top: 15rem; & span {font-size: 1.4rem; font-weight: 300; line-height: 3rem;}'}
        `
      : css`
          display: none;
        `;
  };

  //가이드 화살표 위치 변경 함수
  const guideArrowStyles = (step: number) => css`
    position: absolute;
    transform: translateX(-50%);
    ${step === 1 &&
    css`
      left: 50%;
      bottom: 10rem;
    `}
    ${step === 2 &&
    css`
      transform: scaleY(-1);
      left: 50%;
      top: 34rem;
    `}
      ${step === 3 &&
    css`
      transform: scaleY(-1);
      right: 3.8rem;
      top: 8rem;
    `}
      ${step !== 1 &&
    step !== 2 &&
    step !== 3 &&
    css`
      display: none;
    `};
  `;

  return (
    <>
      {guideVisible && (
        <>
          <button css={stepLayer} onClick={handleStep} type="button">
            <button className="skip">건너뛰기</button>
          </button>
          <div css={[guideDim, guideVisible ? fadeInAni : fadeOutAni]}>
            <div className="paginationBox">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className={`pagination ${step > i ? 'active' : ''}`} />
              ))}
            </div>
            <div className="guideDescBox">
              <div css={guideArrowStyles(step)} className="guideArrow">
                <img src={arrow} alt="화살표아이콘" />
              </div>
              <p css={guideDesc(step, 1)}>
                배우자나 직장, 가족 관계 등 <br />
                난임에 대한 모든 고민을 위시와 상담해보세요!
              </p>
              <p css={guideDesc(step, 2)}>실시간으로 위시와 대화를 나눌 수 있습니다!</p>

              <p css={guideDesc(step, 3)}>
                상담 종료 버튼을 눌러야만
                <br />
                다음에도 상담을 이어갈 수 있어요!
                <br />
                <span>상담 내용은 상담을 이어가기 위한 용도로만 사용됩니다.</span>
              </p>
            </div>
          </div>
        </>
      )}

      <div css={backGroundColor}>
        <div css={header} className="header">
          <button className="prev" type="button">
            <span css={hidden}>뒤로가기</span>
          </button>
          <h2>심리상담사 위시</h2>
          <button css={step === 3 && priority} className="end" type="button">
            종료
          </button>
        </div>

        <div css={dateText}>{toDay}</div>

        <ul css={[messageBox, step === 2 && priority]}>
          {messages.map(({ sender, message }, idx) => (
            <li key={`${sender}-${message!.slice(0, 10)}-${idx}`} className={sender}>
              <p> {message}</p>
            </li>
          ))}
        </ul>
        <form css={[inputBox, step === 1 && priority]} onSubmit={(e) => handleSubmit(e)}>
          <input type="text" name="" id="" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
          <button>
            <span css={hidden}>전송</span>
          </button>
          {isLoading && '로딩중'}
        </form>
      </div>
    </>
  );
};

export default Counseling;

const hidden = css`
  position: absolute !important;
  width: 0.1rem;
  height: 0.1rem;
  overflow: hidden;
  clip: rect(0.1rem 0.1rem 0.1rem 0.1rem);
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
const fadeInAni = css`
  animation: ${fadeIn} 0.5s forwards;
`;

const fadeOutAni = css`
  animation: ${fadeOut} 0.5s forwards;
`;

const guideDim = css`
  position: absolute;
  width: 50rem;
  left: 50%;
  top: 0;
  bottom: 0;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2;
  backdrop-filter: blur(0.3rem);
  color: ${variables.colors.white};

  .paginationBox {
    display: flex;
    width: 100%;
    height: 2rem;
    margin-top: 7.2rem;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    .pagination {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: ${variables.colors.gray50};
      transition: all ${variables.TransitionDuration};
    }
    .pagination.active {
      background-color: ${variables.colors.white};
    }
  }
`;

const stepLayer = css`
  position: absolute;
  width: 50rem;
  left: 50%;
  top: 0;
  bottom: 0;
  transform: translateX(-50%);
  z-index: 3;
  color: ${variables.colors.white};

  .skip {
    position: absolute;
    left: 1.8rem;
    top: 7.2rem;
    z-index: 5;
    font-size: ${variables.size.big};
  }
`;

const priority = css`
  z-index: 2;
`;

const backGroundColor = css`
  background-color: #fdfcff;
  margin: -1.8rem;
  height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const header = css`
  display: flex;
  width: 100%;
  min-height: ${variables.headerHeight};
  justify-content: center;
  align-items: flex-end;
  padding: 1.8rem;
  box-sizing: border-box;
  box-shadow: 0 0 1rem rgba(217, 203, 245, 0.37);

  .prev {
    display: block;
    background-image: url(${prevIcon});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cotain;
    width: 2rem;
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

const dateText = css`
  font-size: ${variables.size.small};
  color: #868581;
  width: 100%;
  text-align: center;
  margin: 2rem auto;
`;

const messageBox = css`
  background-color: #fdfcff;
  width: 100%;
  padding: 1.8rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  align-items: flex-start;
  border-radius: 2rem;

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

const inputBox = css`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  padding: 1.8rem;
  max-width: 50rem;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  gap: 0.8rem;
  background-color: #f8f4ff;

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
