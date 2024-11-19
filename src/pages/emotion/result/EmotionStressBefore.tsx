import variables from '@styles/Variables';
import React, { useState } from 'react';
import ECharts from 'echarts-for-react';
import useAnalysisStore from '@store/useAnalysisStore';
import styled from '@emotion/styled';

interface EmotionStressBeforeProps {
  record: {
    essential: number;
    refusing: number;
    relational: number;
    sexual: number;
    social: number;
    total: number;
  };
}

const EmotionStressBefore: React.FC<EmotionStressBeforeProps> = (record) => {
  const analysisResult = useAnalysisStore((state) => state.analysis);
  const value = record.record.total * 0.5;

  console.log(analysisResult);
  console.log(record.record.total);
  console.log(record);

  const [options] = useState({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        color: `${variables.colors.secondaryStrong}`,

        pointer: {
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: `${variables.colors.secondaryStrong}`,
          },
        },
        axisLine: {
          lineStyle: {
            width: 20,
          },
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          distance: 50,
        },
        data: [
          {
            value: value,
          },
        ],
        detail: {
          fontSize: 22,
          color: `${variables.colors.secondaryStrong}`,
          formatter: '{value}',
          offsetCenter: ['0', '0%'],
        },
        radius: '60%',
        clockwise: false,
      },
    ],
  });

  return (
    <StressText>
      <div className="stress-box">
        <ECharts option={options} opts={{ width: 'auto', height: 'auto' }} />
      </div>
      <p className="stress-sub-text">기존 점수</p>
    </StressText>
  );
};

export const StressText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .stress-box {
    width: 100%;
    height: 18rem;
  }

  .stress-sub-text {
    font-size: 1.5rem;
    font-weight: 500;
    color: ${variables.colors.gray100};
    margin: 4em 0 6rem 0;
  }
`;

export default EmotionStressBefore;
