import ToggleButton from '@components/common/Toogle';
import styled from '@emotion/styled';
import variables from '@styles/Variables';
import EChartsReact from 'echarts-for-react';

const CoupleReport = () => {
  const option = {
    radar: {
      indicator: [
        { name: '사회적' },
        { name: '성적' },
        { name: '필요성' },
        { name: '아이가 없는 일상에 대한 거부' },
        { name: '관계적' },
      ],
      splitNumber: 10,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#ddd',
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ddd',
        },
      },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 18000],
            itemStyle: {
              color: variables.colors.primary,
            },
          },
          {
            value: [5000, 14000, 28000, 26000, 21000],
            itemStyle: {
              color: variables.colors.secondaryStrong,
            },
          },
        ],
      },
    ],
  };

  return (
    <CoupleReportContainer>
      <CoupleReportTitle>
        배우자와 나의 리포트
        <ToggleButton />
      </CoupleReportTitle>
      <CoupleReportTitleDes>나의 통계와 배우자의 통계를 한눈에 확인</CoupleReportTitleDes>
      <CoupleReportLineChartContainer>
        <CoupleReportDescription>난임 스트레스 예상 점수</CoupleReportDescription>
        <ChartCover>
          <EChartsReact option={option} />
        </ChartCover>
      </CoupleReportLineChartContainer>
    </CoupleReportContainer>
  );
};

export default CoupleReport;

const CoupleReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: 7.6rem;
`;

const ChartCover = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 5rem;
`;

const CoupleReportTitle = styled.div`
  font-size: ${variables.size.large};
  font-weight: 600;
  display: flex;
  justify-content: space-between;
`;

const CoupleReportTitleDes = styled.p`
  margin-top: 1rem;
  color: ${variables.colors.gray70};
  font-size: ${variables.size.medium};
`;

const CoupleReportLineChartContainer = styled.div`
  width: 100%;
  height: 61.5rem;
  border: 1px solid ${variables.colors.gray50};
  border-radius: ${variables.borderRadius};
  margin-top: 4.2rem;
  padding: 0 1.3rem;
`;

const CoupleReportDescription = styled.p`
  margin-top: 1.8rem;
  font-weight: 600;
  font-size: ${variables.size.medium};
  color: ${variables.colors.gray70};
`;
