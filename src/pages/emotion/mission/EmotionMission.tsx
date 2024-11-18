import React, { useState } from 'react';
import {
  MissonTitle,
  ImageContainer,
  WishImage,
  MissionTitleBox,
  MissionTextBox,
  MissonTitleSub,
  ButtonContainer,
  MissionExplanation,
  MissionSection,
} from './EmotionMission.style';
import Button from '@components/common/Button';
import { useNavigate } from 'react-router-dom';
import useAnalysisStore from '@store/useAnalysisStore';
import useEmotionStore from '@store/useEmotionStore';

const EMOTIONS_RESULT_URL = '/emotions/results/';

const EmotionMission = () => {
  const [, setClickButton] = useState('/src/assets/Images/invaildGray.svg');
  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const navigate = useNavigate();

  const analysisResult = useAnalysisStore((state) => state.analysis);
  const message = useEmotionStore((state) => state.message);

  // console.log(message);

  // console.log(analysisResult);
  // console.log(message);
  // console.log(localStorage.getItem('MemberId'));

  const handleHover = (mission: string) => {
    setClickButton('/src/assets/Images/valid.svg');
    setSelectedMission(mission);
    console.log(`${mission}`);
  };

  const handleClick = async () => {
    const my_emotion = {
      member_id: localStorage.getItem('MemberId'),
      mission_content: selectedMission,
      is_complement: false,
      interest_keyword: analysisResult.keywords,
      self_message: message.toMe,
      export_message: message.toSpouse,
      joy: analysisResult.emotions.joy,
      sadness: analysisResult.emotions.sadness,
      anger: analysisResult.emotions.anger,
      fear: analysisResult.emotions.fear,
      surprise: analysisResult.emotions.surprise,
      disgust: analysisResult.emotions.disgust,
      total: analysisResult.prediction.totalScore,
      social: analysisResult.prediction.social,
      sexual: analysisResult.prediction.sexual,
      relational: analysisResult.prediction.relational,
      refusing: analysisResult.prediction.refusing,
      essential: analysisResult.prediction.essential,
    };

    try {
      const response = await fetch(EMOTIONS_RESULT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(my_emotion),
      });
      console.log('Mission submitted:', selectedMission);
      const data = await response.json();
      console.log(data);
      navigate('/emotion/result');
    } catch (error) {
      console.error('전송 에러:', error);
    }
  };

  return (
    <>
      <MissionSection>
        <MissionTitleBox>
          <ImageContainer>
            <WishImage src="/img/img-wish-mission.svg" alt="감정분석가 위시" />
          </ImageContainer>

          <MissionTextBox>
            <MissonTitle>오늘의 AI위시 추천 미션</MissonTitle>
            <MissonTitleSub>희선님의 일일 미션을 한가지 선택해주세요</MissonTitleSub>
          </MissionTextBox>
        </MissionTitleBox>

        <ButtonContainer>
          {analysisResult.missions.map((mission, index) => (
            <button
              key={index}
              onMouseEnter={() => handleHover(mission)}
              onClick={() => {
                setSelectedMission(mission);
                console.log(`: ${mission}`);
              }}
            >
              {mission}
              <img
                src={
                  selectedMission === mission ? '/src/assets/Images/valid.svg' : '/src/assets/Images/invaildGray.svg'
                }
                alt="선택"
              />
            </button>
          ))}
        </ButtonContainer>

        <MissionExplanation>
          선택한 미션을 완수하면
          <br />
          배우자가 나에게 작성한 한마디를 확인 할 수 있어요
        </MissionExplanation>
        <div className="resultButton">
          <Button onClick={handleClick} type="submit" size="medium" text="분석 결과 보기" disabled={false} />
        </div>
      </MissionSection>
    </>
  );
};

export default EmotionMission;
