/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { keyframes } from '@emotion/react'; // keyframes 유틸리티 가져오기
import PageTitle from '@components/common/PageTitle';

const HomePageTitle = () => {
  const userName = localStorage.getItem('userName');

  const alternateTexts = [
    '오늘하루는 어떠셨나요?',
    '기분 좋은 하루였나요?',
    '멋진 하루를 보내셨나요?',
    '행복한 하루를 만드셨나요?',
    '보람찬 하루였나요?',
  ];

  const randomText = alternateTexts[Math.floor(Math.random() * alternateTexts.length)];

  return (
    <PageTitle
      titleText={`${userName ? userName : 'Guest'} 님 ${randomText}`}
      textAlign="left"
      isFixed={false}
      pageBack={false}
      customStyles={TitleAni}
    />
  );
};

export default HomePageTitle;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TitleAni = css`
  animation: ${fadeIn} 1s ease-in-out;
`;
