import variables from '@styles/Variables';
import React, { useState } from 'react';
import ECharts from 'echarts-for-react';

interface StressData {
  value: number;
  color: string;
}

const EmotionStress = () => {
  // const analysisResult = useAnalysisStore((state) => state.analysis);

  const data: StressData[] = [
    {
      value: 55,
      color: `${variables.colors.primary}`,
    },
  ];

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
        color: `${variables.colors.primaryStrong}`,
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
            borderColor: `${variables.colors.primaryStrong}`,
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
        data: data,
        detail: {
          fontSize: 22,
          color: `${variables.colors.primary}`,
          formatter: '{value}',
          offsetCenter: ['0', '0%'],
        },
        radius: '40%',
        clockwise: false,
      },
    ],
  });

  return <ECharts option={options} opts={{ width: 'auto', height: 'auto' }} />;
};

export default EmotionStress;
