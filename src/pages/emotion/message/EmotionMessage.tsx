// 진욱

import Button from '@components/common/Button';
import useEmotionStore from '@store/useEmotionStore';
import { useEffect, useState } from 'react';
import {
  DashedLine,
  MessageArea,
  MessageContainer,
  MessageItem,
  MessageSection,
  MessageTitle,
  ProfileImage,
  ProgressBar,
  TitleText,
} from './EmotionMessage.style';
import fetchGPT from '@hooks/useGPT';
import useAnalysisStore from '@store/useAnalysisStore';
import { useNavigate } from 'react-router-dom';
import { IInterests, ITest } from 'types/types';

const INTERESTS_URL = '/emotions/interests/';
const INFERTILITY_TESTS_URL = '/infertility/tests/';

const EmotionMessage = () => {
  const emotionRecord = useEmotionStore((state) => state.record);
  const updateMessage = useEmotionStore((state) => state.updateMessage);
  const currentStep = useAnalysisStore((state) => state.step);
  const updateStep = useAnalysisStore((state) => state.updateStep);
  const updateAnalysis = useAnalysisStore((state) => state.updateAnalysis);
  const [messageToMe, setMessageToMe] = useState<string>('');
  const [messageToSpouse, setMessageToSpouse] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [keywords, setKeywords] = useState<string>('');
  const [tests, setTests] = useState<ITest>();
  const navigate = useNavigate();

  const gender = localStorage.getItem('Gender');

  const fetchKeywords = async (memberId: number): Promise<IInterests | null> => {
    try {
      const response = await fetch(`${INTERESTS_URL}?member_id=${memberId}`);
      console.log('관심사', response);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data.result[0];
      } else {
        throw new Error('키워드를 불러오지 못했습니다!');
      }
    } catch (e) {
      if (e instanceof Error) alert(e.message);
    }

    return null;
  };

  const fetchTests = async (memberId: number): Promise<ITest | null> => {
    try {
      const response = await fetch(`${INFERTILITY_TESTS_URL}?memberId=${memberId}`);
      console.log('난임척도', response);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data.result.totalTests[0];
      } else {
        throw new Error('난임스트레스 척도 검사 결과가 존재하지 않습니다!');
      }
    } catch (e) {
      if (e instanceof Error) alert(e.message);
    }

    return null;
  };

  useEffect(() => {
    const memberId = Number(localStorage.getItem('MemberId'));
    const fetchAndSetKeywords = async () => {
      const data = await fetchKeywords(memberId);
      if (data) {
        setKeywords(
          data.interests
            .split(' #')
            .map((tag: string) => tag.replace('#', ''))
            .join(', ')
        );
      }
    };

    const fetchAndSetTests = async () => {
      const data = await fetchTests(memberId);
      if (data) {
        setTests(data);
      }
    };

    fetchAndSetKeywords();
    fetchAndSetTests();
  }, []);

  // 임시 데이터
  const isInfertility = true;

  /* 전일 난임스트레스 척도 예상점수 */
  const [
    predictedTotalScore,
    predictedSocial,
    predictedSexual,
    predictedRelational,
    predictedRefusing,
    predictedEssential,
  ] = [151, 30, 34, 29, 28, 30];

  // 프롬프트 작성
  const prompt = `
    당신은 심리 평가와 개인화된 제안에 전문적인 AI입니다. 아래 제공된 정보를 사용하여, 요구된 형식에 맞게 응답하고, 다음 지침을 따르세요:

    **응답 형식**:
    {
      "prediction": {
        "totalScore": "숫자",
        "social": "숫자",
        "sexual": "숫자",
        "relational": "숫자",
        "refusing": "숫자",
        "essential": "숫자"
      },
      "emotions": {
        "joy": "숫자",
        "sadness": "숫자",
        "anger": "숫자",
        "fear": "숫자",
        "surprise": "숫자",
        "disgust": "숫자"
      },
      "missions": ["내용", "내용"],
      "keywords": "#내용 #내용 #내용"
    }

    **사용자 특성**: ${isInfertility ? '난임 부부' : '난임은 아니지만 임신을 준비 중인 부부'}
    **사용자 관심사**: ${keywords ?? '관심사 없음'}

    ### 예측 점수 (prediction)
    우리가 시행하는 난임스트레스 척도 검사는 난임 요인 목록(Fertility Problem Inventory)을 변형하여 사회적 영역(10문제), 관계적 영역(10문제), 성적 영역(8문제), 아이 없는 일상에 대한 거부 영역(8문제), 부모됨의 필요성 영역(10문제)으로 구성된 총 46문항의 검사입니다.

    - 각 영역별 점수는 다음 범위 내에서 계산됩니다:
      - 사회적 영역(social): 10~50점
      - 관계적 영역(relational): 10~50점
      - 성적 영역(sexual): 8~40점
      - 아이 없는 일상에 대한 거부 영역(refusing): 8~40점
      - 부모됨의 필요성 영역(essential): 10~50점
    - 각 영역별 질문 사항은 다음과 같습니다:
      - 사회적 영역: "아이에 관한 질문을 받아도 불편하지 않다.", "가족들은 아이가 없다고 해서 우리를 다르게 대하지 않는다.", "나는 아이가 있는 친구들과도 여전히 공통관심사가 많다." 등
      - 관계적 영역: "난임 문제를 이야기할 때 배우자는 나의 말에 위로를 얻는 것 같다.", "난임 문제를 해결하기 위해 우리 부부는 함께 노력한다.", "난임 문제로 배우자와 헤어지는 것은 상상해 본 적이 없다." 등
      - 성적 영역: "나는 다른 여성(남성)들과 다르지 않다.", "배우자에게 나는 여전히 매력적인 존재이다.", "내 성생활은 성공적이다" 등
      - 아이 없는 일상에 대한 거부 영역: "아이가 없는 부부도 아이가 있는 부부처럼 행복하다.", "아이가 없어도 배우자와 함께 행복한 삶을 상상할 수 있다.", "아이가 내 행복의 필요조건은 아니다." 등
      - 부모됨의 필요성 영역: "아이를 갖는 것이 인생의 주요 목적은 아니다.", "내 결혼생활에는 아이는 필수가 아니다.", "나는 지금까지 부모가 되지 않아도 괜찮다고 생각해왔다." 등
    - 영역별 점수를 합산하여 총점(totalScore)을 구합니다. (총점 범위: 46~230점)



    최근 난임스트레스 척도 검사 결과:
    ${tests ? `총점 ${tests.total}점, 사회적 영역 ${tests.social}점, 관계적 영역 ${tests.relational}점, 성적 영역 ${tests.sexual}점, 아이 없는 일상에 대한 거부 영역 ${tests.refusing}점, 부모됨의 필요성 영역 ${tests.essential}점` : '최근 난임스트레스 척도 검사 결과 없음'}

    전일 예측 점수:
    총점 ${predictedTotalScore}점, 사회적 영역 ${predictedSocial}점, 관계적 영역 ${predictedRelational}점, 성적 영역 ${predictedSexual}점, 아이 없는 일상에 대한 거부 영역 ${predictedRefusing}점, 부모됨의 필요성 영역 ${predictedEssential}점.

    오늘 사용자의 감정 기록과 행동, 최근 난임스트레스 척도 검사 결과, 전일 예측 점수를 바탕으로 위 영역별 점수와 총점을 예상해주세요.
    오늘 하루 임신을 위해 노력했거나 즐거운 일이 있을 경우 예측 점수가 낮아질 수 있습니다.

    ### 감정 분석 (emotions)
    사용자의 오늘 하루 경험(기분 좋았던 일, 안 좋았던 일, 임신을 위한 노력, 본인과 배우자에게 해주고 싶은 말 등)을 바탕으로, Plutchik의 감정 휠의 6가지 범주로 나누어 감정을 분석하세요:
    - joy(기쁨)
    - sadness(슬픔)
    - anger(분노)
    - fear(두려움)
    - surprise(놀람)
    - disgust(혐오)

    6가지 감정 비율의 합이 100%가 되어야 합니다.

    ### 미션 제안 (missions)
    사용자의 관심사 ${keywords ?? ''}를 바탕으로 난임스트레스를 해소할 수 있는 현실적이고 간단한 미션 2가지를 제안하세요. 미션은 다음 기준을 충족해야 합니다:
    1. "내일 하루는 어디에서 어떤 것을 해보세요" 형태로 작성.
    2. 내향성과 외향성이 50:50인 사람에게 적합.
    3. 배우자와 함께할 수 있는 미션 1개 포함.
    4. 장소가 있다면 장소와 행동이 조화로워야 함.

    ### 키워드 생성 (keywords)
    사용자의 오늘 하루 기분 좋았던 일과 관심사를 토대로, 사용자에게 요즘 중요할 것 같은 키워드 3가지를 제안하세요. 
    - 키워드는 명사형, "~하기", "~하는 것" 형태로 작성.
    - 서로 겹치지 않는 범주를 고려.
    - 추상적인 명사, 직장, 병원, 부부 관계 관련 키워드는 제외.
  `;

  // 보내기 버튼 비활성화
  useEffect(() => {
    if (messageToMe.trim() && messageToSpouse.trim()) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [messageToMe, messageToSpouse]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>, to: string) => {
    const value = e.target.value;
    const lines = value.split('\n');

    // 2줄 이상 입력 방지
    if (lines.length > 2) {
      return;
    }

    // 50자 이상 입력 방지
    if (value.length > 50) return;

    if (to === 'me') {
      setMessageToMe(value);
    } else {
      setMessageToSpouse(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateMessage(messageToMe, messageToSpouse);
    const userInput = `
    - 오늘 하루 기분 좋았던 일은 다음과 같다 : ${emotionRecord.good.map((item) => item.replace(/\n+/g, ',')).join(',')}
    - 오늘 하루 기분이 좋지 않았던 일은 다음과 같다 : ${emotionRecord.bad.map((item) => item.replace(/\n+/g, ',')).join(',')}
    - 오늘은 임신을 위해 다음과 같은 노력을 했다 : ${emotionRecord.effort.map((item) => item.replace(/\n+/g, ',')).join(',')}
    - 오늘 나 자신에게 해 주고 싶은 말은 다음과 같다. ${messageToMe.replace(/\n+/g, ',')}
    - 오늘 배우자에게 해 주고 싶은 말은 다음과 같다 : ${messageToSpouse.replace(/\n+/g, ',')}
    `;

    // GPT 호출
    setIsLoading(true);
    const data = await fetchGPT(prompt, userInput, 'record');
    const dataToObj = JSON.parse(data.choices[0].message.content);
    console.log(dataToObj);

    updateAnalysis(dataToObj);
    updateStep(currentStep + 1);
    navigate('/emotion/mission');
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        '로딩 중'
      ) : (
        <MessageSection>
          <ProgressBar>
            <DashedLine />
          </ProgressBar>
          <MessageContainer onSubmit={handleSubmit}>
            <MessageItem>
              <MessageTitle>
                <ProfileImage gender={gender === 'W' ? 'female' : 'male'} />
                <TitleText>
                  <p>오늘의 나에게 한마디</p>
                  <p>사용자님에게 하루동안 보여지는 메시지예요</p>
                </TitleText>
              </MessageTitle>
              <MessageArea>
                <textarea
                  rows={2}
                  maxLength={50}
                  placeholder="50자 이내로 입력해주세요."
                  value={messageToMe}
                  onChange={(e) => handleInputChange(e, 'me')}
                />
              </MessageArea>
            </MessageItem>
            <MessageItem>
              <MessageTitle second>
                <ProfileImage gender={gender === 'W' ? 'male' : 'female'} />
                <TitleText>
                  <p>오늘의 {gender === 'W' ? '남편' : '아내'}에게 한마디</p>
                  <p>{gender === 'W' ? '남편이' : '아내가'} 미션을 완료하면 볼 수 있는 메시지예요</p>
                </TitleText>
              </MessageTitle>
              <MessageArea second>
                <textarea
                  rows={2}
                  placeholder="50자 이내로 입력해주세요."
                  maxLength={50}
                  value={messageToSpouse}
                  onChange={(e) => handleInputChange(e, 'spouse')}
                />
              </MessageArea>
            </MessageItem>
            <pre>{`응원이 될 수 있는 한마디가 중요해요!\n가끔은 위시 한마디를 통해 농담을 보내봐도 좋아요`}</pre>
            <Button text="보내기" disabled={isDisabled} type="submit" size="medium" />
          </MessageContainer>
        </MessageSection>
      )}
    </>
  );
};

export default EmotionMessage;
