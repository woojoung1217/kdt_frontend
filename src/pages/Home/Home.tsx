/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import HomePageTitle from '@components/home/HomePageTitle';
import Footer from '@components/common/Footer';
import styled from '@emotion/styled';
import CoupleInfomation from '@components/home/CoupleInfomation';
import { useInView } from 'react-intersection-observer';

//  홈에서 쓰는 컴포넌트
//<HomePageTitle /> = 제목 컴포넌트
//<CoupleInfomation /> = 부부연동 ,미션
//<Footer> = 푸터는 메인에서만 필요해서 호출

const OurReport = React.lazy(() => import('@components/home/OurReport'));

const Home = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // 한 번만 로드
    threshold: 1, // 컴포넌트의 100%가 보일 때 로드
    rootMargin: '50px', // 컴포넌트가 완전히 보일 때까지 기다림
  });

  return (
    <HompageContainer>
      <ContentWrapper>
        <HomePageTitle />
        <CoupleInfomation />
        <div ref={ref}>
          {inView && (
            <Suspense fallback={<div>Loading...</div>}>
              <OurReport />
            </Suspense>
          )}
        </div>
      </ContentWrapper>
      <Footer />
    </HompageContainer>
  );
};

const HompageContainer = styled.div`
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
