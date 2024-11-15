import styled from '@emotion/styled';
import variables from '@styles/Variables';

const CoupleMissionWeeklyUI = styled.div`
  width: 100%;
  height: 6rem;
  font-size: ${variables.size.medium};
  font-weight: 700;
  display: flex;
  align-items: center;
  box-shadow: ${variables.BoxShadow};
  border-radius: calc(${variables.borderRadius} + 0.4rem);
  color: ${variables.colors.black};
  margin-bottom: 1.4rem;
  padding: 0 1rem;
`;

const Title = styled.p`
  margin-right: 1.5rem;
`;

const MissionDots = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const Dot = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  background-color: ${variables.colors.gray50};
  border-radius: 50%;
`;

const CoupleMissionWeekly = () => (
  <CoupleMissionWeeklyUI>
    <Title>이번주 미션</Title>
    <MissionDots>
      {[...Array(7)].map((_, index) => (
        <Dot key={index} />
      ))}
    </MissionDots>
  </CoupleMissionWeeklyUI>
);

export default CoupleMissionWeekly;
