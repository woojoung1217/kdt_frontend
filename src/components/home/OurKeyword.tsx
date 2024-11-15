import styled from '@emotion/styled';
import variables from '@styles/Variables';
import EChartsReact from 'echarts-for-react';

const OurKeyword = () => {
  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: '-1%',
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },
        color: [
          variables.colors.primarySoft,
          variables.colors.primaryStrong,
          variables.colors.secondary,
          variables.colors.secondarySoft,
          variables.colors.tertiarySoft,
          variables.colors.secondaryStrong,
        ],
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 10,
            fontWeight: 'bold',
          },
        },
        data: [
          { value: 100, name: '관심1', Colors: variables.colors.primaryLight },
          { value: 100, name: '관심2' },
          { value: 100, name: '관심3' },
          { value: 100, name: '관심4' },
          { value: 100, name: '관심5' },
          { value: 100, name: '관심6' },
        ],
      },
    ],
  };

  return (
    <OurKeywordContainer>
      <OurKeywordTitle>우리의 관심사</OurKeywordTitle>
      <OurKeywordTitleDes>나의 통계와 배우자의 통계를 한눈에 확인할 수 있어요</OurKeywordTitleDes>
      <OurKeywordLineChartContainer>
        <OurKeywordDescription>우리의 관심사</OurKeywordDescription>
        <EChartsReact option={option} style={{ width: '100%', height: '80%' }} />
      </OurKeywordLineChartContainer>
    </OurKeywordContainer>
  );
};

export default OurKeyword;

const OurKeywordContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: 7.6rem;
`;

const OurKeywordTitle = styled.h1`
  font-size: ${variables.size.large};
  font-weight: 600;
`;

const OurKeywordTitleDes = styled.p`
  margin-top: 1rem;
  color: ${variables.colors.gray70};
  font-size: ${variables.size.medium};
`;

const OurKeywordLineChartContainer = styled.div`
  width: 100%;
  height: 42rem;
  border: 1px solid ${variables.colors.gray50};
  border-radius: ${variables.borderRadius};
  margin-top: 4.2rem;
  padding: 0 1.3rem;
`;

const OurKeywordDescription = styled.p`
  margin-top: 1.8rem;
  font-weight: 600;
  font-size: ${variables.size.medium};
  color: ${variables.colors.gray70};
`;
