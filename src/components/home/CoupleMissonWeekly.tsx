import styled from '@emotion/styled';
import variables from '@styles/Variables';

type DotStatus = 'completed' | 'current' | 'locked';

const CoupleMissionWeekly = () => {
  // 각 날짜의 상태를 정의
  const dotStatuses: DotStatus[] = [
    'completed', // 월요일 - 완료
    'completed', // 화요일 - 완료
    'completed', // 수요일 - 완료
    'current', // 목요일 - 현재
    'locked', // 금요일 - 잠김
    'locked', // 토요일 - 잠김
    'locked', // 일요일 - 잠김
  ];

  return (
    <CoupleMissionWeeklyUI>
      <Title>이번주 미션</Title>
      <MissionDots>
        {dotStatuses.map((status, index) => (
          <Dot key={index} status={status} />
        ))}
      </MissionDots>
    </CoupleMissionWeeklyUI>
  );
};

const CoupleMissionWeeklyUI = styled.div`
  width: 100%;
  height: 6rem;
  font-size: ${variables.size.medium};
  font-weight: 700;
  display: flex;
  align-items: center;
  box-shadow: inset 0 0 0.3rem rgba(0, 0, 0, 0.1);
  border-radius: calc(${variables.borderRadius} + 0.4rem);
  color: ${variables.colors.black};
  margin-bottom: 1.4rem;
  padding: 1.4rem 2.5rem;
`;

const Title = styled.p`
  margin-right: 1.5rem;
`;

const MissionDots = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const Dot = styled.div<{ status: DotStatus }>`
  width: 2.4rem;
  height: 2.4rem;
  background-color: ${({ status }) => {
    switch (status) {
      case 'completed':
        return variables.colors.primary;
      case 'current':
        return variables.colors.secondary;
      case 'locked':
        return variables.colors.gray50;
      default:
        return variables.colors.gray50;
    }
  }};
  border-radius: 50%;
  transition: background-color 0.3s ease;
`;

export default CoupleMissionWeekly;
