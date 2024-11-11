/** @jsxImportSource @emotion/react */
import React from 'react';
import HomePageTitle from '@components/home/HomePageTitle';
import Footer from '@components/common/Footer';
import styled from '@emotion/styled';
import CoupleInformation from '@components/home/CoupleInformation';
import OurKeyword from '@components/home/OurKeyword';
import CoupleReport from '@components/home/CoupleReport';

//  홈에서 쓰는 컴포넌트
//<HomePageTitle /> = 제목 컴포넌트
//<CoupleInfomation /> = 부부연동 ,미션
//<Footer> = 푸터는 메인에서만 필요해서 호출

const OurReport = React.lazy(() => import('@components/home/OurReport'));

const Home = () => {
  return (
    <HomepageContainer>
      <ContentWrapper>
        <HomePageTitle />
        <CoupleInformation />
        <OurReport />
        <OurKeyword />
        <CoupleReport />
      </ContentWrapper>
      <Footer />
    </HomepageContainer>
  );
};

const HomepageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin-top: 9rem;
  height: 300rem;
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 1rem;
  /* 스크롤바 숨기기 */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export default Home;
