import styled from '@emotion/styled';
import variables from '@styles/Variables';
import React, { useState } from 'react';
import ECharts from 'echarts-for-react';
/* eslint-disable */
const OurReport = () => {
  const [options, setOptions] = useState({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '본인',
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
        color: variables.colors.primary,
      },
      {
        name: '배우자',
        data: [111, 222, 333, 123, 135, 147, 260],
        type: 'line',
        color: variables.colors.secondary,
      },
    ],
  });

  return (
    <OurReportContainer>
      <OurReportTitle>우리의 리포트</OurReportTitle>
      <OurReportTitleDes>나의 통계와 배우자의 통계를 한눈에 확인할 수 있어요</OurReportTitleDes>
      <OurReportLineChartContainer>
        <ChartDescription>스트레스 척도</ChartDescription>
        <ECharts option={options} style={{ width: '100%', height: '100%' }} />
      </OurReportLineChartContainer>
    </OurReportContainer>
  );
};

export default OurReport;

const OurReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: 7.6rem;
`;

const OurReportTitle = styled.h1`
  font-size: ${variables.size.large};
  font-weight: 600;
`;

const OurReportTitleDes = styled.p`
  margin-top: 1rem;
  color: ${variables.colors.gray70};
  font-size: ${variables.size.medium};
`;

const OurReportLineChartContainer = styled.div`
  width: 100%;
  height: 28rem;
  border: 1px solid ${variables.colors.gray50};
  border-radius: ${variables.borderRadius};
  margin-top: 4.2rem;
  padding: 0 1.3rem;
`;

const ChartDescription = styled.p`
  margin-top: 1.8rem;
  font-weight: 600;
  font-size: ${variables.size.medium};
  color: ${variables.colors.gray70};
`;
