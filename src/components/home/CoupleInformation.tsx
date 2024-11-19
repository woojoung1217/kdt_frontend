import styled from '@emotion/styled';
import variables from '@styles/Variables';
import profileImgWomen from '@assets/Images/mainFemaleProfile.svg';
import profileImgMan from '@assets/Images/mainManProfile.svg';
import mainlock from '@assets/Images/mainlock.svg';
import { useNavigate } from 'react-router-dom';
import { useCoupleInfo } from '@hooks/useCoupleInfo';
import CoupleMissionWeekly from './CoupleMissionWeekly';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface InfTest {
  essential: number;
  refusing: number;
  relational: number;
  sexual: number;
  social: number;
  total: number;
  self_message?: string;
  id: number;
  mission_content?: string;
  export_message?: string;
  is_complement?: boolean;
}

interface CoupleData {
  result?: {
    my_inf_tests?: InfTest[];
    spouse_inf_tests?: InfTest[];
    my_emotion?: InfTest;
    spouse_emotion?: InfTest;
    is_complement?: InfTest;
  };
}

interface OurReportProps {
  coupleData: CoupleData;
}

const CoupleInformation = ({ coupleData }: OurReportProps) => {
  const navigate = useNavigate();
  const [selfMessage, setSelfMessage] = useState('');
  const [mission, setMission] = useState('');
  const [isMissionDone, setIsMissionDone] = useState(false);
  const { partnerName, myName, gender, isConnected } = useCoupleInfo();
  const exportMessage = coupleData?.result?.spouse_emotion?.export_message;

  const myMissionCompleted = coupleData?.result?.my_emotion?.is_complement || false;
  const spouseMissionCompleted = coupleData?.result?.spouse_emotion?.is_complement || false;

  /** 미션 수행 등록 함수 {PUT} */
  const handleMissionToggle = async () => {
    try {
      const newMissionStatus = !isMissionDone;
      setIsMissionDone(newMissionStatus);

      if (coupleData?.result?.my_emotion) {
        const result_id = coupleData.result.my_emotion.id;
        const response = await axios.put(
          `/emotions/results/${result_id}/`,
          { is_complement: newMissionStatus },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

        const requestData = {
          is_complement: true,
        };

      }
    } catch (error) {
      console.error('에러:', error);
      setIsMissionDone(isMissionDone); // 실패시 원래 상태로 복구
    }
  };

  useEffect(() => {
    const emotion = coupleData?.result?.my_emotion;
    setSelfMessage(emotion?.self_message || '');
    setMission(emotion?.mission_content || '');
    setIsMissionDone(emotion?.is_complement || false);
  }, [coupleData]);

  // 미션 메시지 결정 함수
  const getMissionMessage = () => {
    if (myMissionCompleted && !spouseMissionCompleted) {
      return '배우자의 미션 수행을 기다리고 있어요';
    } else if (!myMissionCompleted && spouseMissionCompleted) {
      return '배우자가 미션을 완료했어요! 나도 미션을 수행해볼까요?';
    } else if (myMissionCompleted && spouseMissionCompleted) {
      return exportMessage || '두 분 모두 미션을 완료했어요!';
    } else {
      return mission;
    }
  };

  return (
    <CoupleInformationContainer>
      <CoupleInfoTitle>{selfMessage ? selfMessage : '원활한 사용을 위해 부부 연동이 필요해요!'}</CoupleInfoTitle>
      <CoupleCardsWrapper>
        <PersonalCard>
          <CardImage src={gender === 'M' ? profileImgMan : profileImgWomen} alt="User Image" />
          <CardName>{myName}</CardName>
          <EmotionAnalysis>감정 분석 필요</EmotionAnalysis>
        </PersonalCard>
        <SpouseCard
          onClick={() => {
            navigate('/users/follow');
          }}
        >
          <CardImage
            src={isConnected ? (gender === 'M' ? profileImgWomen : profileImgMan) : mainlock}
            alt="Spouse Image"
          />
          <CardName>{partnerName || '배우자 이름'}</CardName>
          <EmotionAnalysis>{partnerName ? '감정분석 필요' : '연동 필수'}</EmotionAnalysis>
        </SpouseCard>
      </CoupleCardsWrapper>
      <>
        {mission ? (
          <CoupleMissionToChoose isMissionDone={isMissionDone}>
            <MissionTitle>{getMissionMessage()}</MissionTitle>
            <IsMissionDone type="checkbox" checked={isMissionDone} onChange={handleMissionToggle} />
          </CoupleMissionToChoose>
        ) : (
          <CoupleMission>
            {partnerName ? '미션을 수행하면 배우자의 한마디를 볼 수 있어요' : '배우자 연동을 하면 미션 등록이 가능해요'}
          </CoupleMission>
        )}
      </>
      {partnerName ? (
        <CoupleMissionWeekly></CoupleMissionWeekly>
      ) : (
        <CoupleMission>배우자 연동을 하면 미션 등록이 가능해요</CoupleMission>
      )}
    </CoupleInformationContainer>
  );
};

export default CoupleInformation;

const CoupleInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const CoupleInfoTitle = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${variables.colors.gray10};
  border-radius: calc(${variables.borderRadius} + 0.4rem);
  padding: 1rem 0;
  color: ${variables.colors.gray100};
  margin-bottom: 1.4rem;
`;

const CoupleCardsWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-bottom: 3.6rem;
`;

const PersonalCard = styled.div`
  border-radius: 1.6rem;
  width: 50%;
  height: 21rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-shadow: inset 0 0 0.3rem rgba(0, 0, 0, 0.1);
`;

const SpouseCard = styled.div`
  border-radius: 1.6rem;
  width: 50%;
  height: 21rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-shadow: inset 0 0 0.3rem rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.img`
  width: 11rem;
  height: 10rem;
  border-radius: 50%;
  margin-bottom: 1rem;
  margin-bottom: 1.8rem;
`;

const CardName = styled.div`
  font-size: ${variables.size.medium};
  font-weight: 600;
  margin-bottom: 0.8rem;
`;

const EmotionAnalysis = styled.div`
  font-size: ${variables.size.medium};
  text-align: center;
  color: ${variables.colors.primary};
`;

const CoupleMission = styled.div`
  width: 100%;
  height: 6rem;
  font-size: ${variables.size.medium};
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 0 0.3rem rgba(0, 0, 0, 0.1);
  border-radius: calc(${variables.borderRadius} + 0.4rem);
  color: ${variables.colors.black};
  margin-bottom: 1.4rem;
`;

const CoupleMissionToChoose = styled.div<{ isMissionDone: boolean }>`
  width: 100%;
  height: 6rem;
  font-size: ${variables.size.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: inset 0 0 0.3rem rgba(0, 0, 0, 0.1);
  border-radius: calc(${variables.borderRadius} + 0.4rem);
  color: ${variables.colors.black};
  margin-bottom: 1.4rem;
  padding: 1.4rem 2.5rem;
  border: ${({ isMissionDone }) => (isMissionDone ? `1px solid ${variables.colors.primary}` : 'transparent')};
  border-color: ${({ isMissionDone }) => (isMissionDone ? variables.colors.primary : 'transparent')};
`;

const MissionTitle = styled.p`
  font-weight: 500;
  font-size: 1.4rem;
`;

const IsMissionDone = styled.input`
  margin-right: -0.5rem;
  background-color: red;
  width: 2.4rem;
  height: 2.4rem;
  flex-grow: 0;
`;
