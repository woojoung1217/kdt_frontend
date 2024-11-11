import ToggleButton from '@components/common/Toogle';
import styled from '@emotion/styled';
import variables from '@styles/Variables';
import React from 'react';

const CoupleReport = () => {
  return (
    <CoupleReportContainer>
      <CoupleReportTitle>
        배우자와 나의 리포트
        <ToggleButton />
      </CoupleReportTitle>

      <CoupleReportTitleDes>나의 통계와 배우자의 통계를 한눈에 확인</CoupleReportTitleDes>

      <CoupleReportLineChartContainer>
        <CoupleReportDescription>난임 스트레스 예상 점수</CoupleReportDescription>
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
  height: 28rem;
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
