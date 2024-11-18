import styled from '@emotion/styled';
import variables from '@styles/Variables';
import EChartsReact from 'echarts-for-react';

interface EmotionData {
  interest_keyword: string;
}

interface CoupleData {
  result?: {
    my_emotion?: EmotionData;
    spouse_emotion?: EmotionData;
  };
}

interface OurKeywordProps {
  coupleData?: CoupleData | undefined;
}

const OurKeyword = ({ coupleData }: OurKeywordProps) => {
  const myKeyword = coupleData?.result?.my_emotion?.interest_keyword ?? '';
  const spouseKeyword = coupleData?.result?.spouse_emotion?.interest_keyword ?? '';

  console.log(coupleData);

  // 키워드를 쉼표로 분리하여 배열로 변환
  const myKeywordArray = myKeyword.split(',').map((keyword) => keyword.trim());
  const spouseKeywordArray = spouseKeyword.split(',').map((keyword) => keyword.trim());

  // 키워드 데이터 준비
  const keywordData = [...myKeywordArray, ...spouseKeywordArray].map((keyword, index) => ({
    value: 100,
    name: `${keyword}`,
    color: index === 0 ? variables.colors.primaryLight : variables.colors.secondary,
  }));

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
        data: keywordData.map((item, index) => ({
          ...item,
          itemStyle: {
            color: index === 0 ? variables.colors.primaryLight : variables.colors.secondary, // 첫 번째 항목은 primaryLight, 나머지는 secondary 색상
          },
        })),
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
