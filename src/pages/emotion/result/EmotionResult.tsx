import styled from '@emotion/styled';
import useAnalysisStore from '@store/useAnalysisStore';
import variables from '@styles/Variables';
import EmotionGraph from './EmotionGraph';
import EmotionStress from './EmotionStress';
import ECharts from 'echarts-for-react';
import Footer from '@components/common/Footer';
import { useEffect, useState } from 'react';

const EmotionResult = () => {
  const [data, setData] = useState(null);
  const result_pk = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/emotions/results/${result_pk}`);
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error('fetching error:', error);
      }
    };
    fetchData();
  }, [result_pk]);

  const analysisResult = useAnalysisStore((state) => state.analysis) || { keywords: [] };

  if (!data) return <div>로딩중.. 데이터가 없음</div>;

  console.log(analysisResult.keywords);

  const option = {
    radar: {
      indicator: [
        { name: '사회적', max: 6500 },
        { name: '성적', max: 16000 },
        { name: '필요성', max: 30000 },
        {
          name: `아이가 없는
일상에대한 거부`,
          max: 38000,
        },
        { name: '관계적', max: 25000 },
      ],
      splitLine: {},
      axisLine: {},
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 18000],
            name: 'Allocated Budget',
            itemStyle: {
              color: variables.colors.primary,
            },
          },
          {
            value: [5000, 14000, 28000, 26000, 21000],
            name: 'Actual Spending',
            itemStyle: {
              color: variables.colors.secondaryStrong,
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <ResultSection>
        <ResultTitleBox>
          <ResultTextBox>
            <h2>오늘 희선님의 예상감정</h2>
            <pre>위시와 대화한 내용으로 분석되었어요</pre>
          </ResultTextBox>
          <WishImage src="/src/assets/Images/emotionResultSad.svg" alt="감정분석가 위시" />
        </ResultTitleBox>

        <EmotionGraphContainer>
          <EmotionGraph />
        </EmotionGraphContainer>
        <ResultTextBox>
          <pre>난임 스트레스 예상점수</pre>
        </ResultTextBox>
        <EmotionGraphContainer>
          <div className="flex-box">
            <EmotionStress />
            <EmotionStress />
          </div>
        </EmotionGraphContainer>

        <ResultTextBox>
          <pre>난임 스트레스 예상점수</pre>
        </ResultTextBox>
        <EmotionGraphContainer>
          <ChartCover>
            <ECharts option={option} />
          </ChartCover>
        </EmotionGraphContainer>
      </ResultSection>

      <Footer />
    </>
  );
};

export default EmotionResult;

export const ResultSection = styled.section`
  height: 100%;
  margin: calc(-1 * ${variables.layoutPadding});
  padding: ${variables.layoutPadding};
  margin-bottom: -4rem;
  padding-bottom: 4rem;
  background-color: ${variables.colors.gray5};
  display: flex;
  flex-direction: column;
`;

export const ResultTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const ResultTextBox = styled.div`
  align-items: center;
  margin-bottom: 3rem;
  margin-top: 10rem;

  & > h2 {
    font-size: ${variables.size.large};
    font-weight: 500;
  }

  & > pre {
    font-size: ${variables.size.big};
    color: ${variables.colors.gray100};
    margin-top: 1rem;
  }
`;

export const WishImage = styled.img`
  width: 11rem;
  margin-bottom: 0;
`;

export const EmotionGraphContainer = styled.div`
  width: 100%;

  & > div {
    border-radius: 1rem;
    border: 1px solid ${variables.colors.gray10};
    background-color: #ffffff;
    box-shadow: 0px 0px 4px rgba(217, 203, 245, 0.3);
  }

  //난임스트레스 예상점수 도표
  .flex-box {
    display: flex;
  }
`;

const ChartCover = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 5rem;
`;
