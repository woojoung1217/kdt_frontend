import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterNav>
        <FooterItem>
          <StyledLink to="/home">
            <FooterIcon src="/img/footer-01.svg" alt="홈 아이콘" />홈
          </StyledLink>
        </FooterItem>
        <FooterItem>
          <StyledLink to="/emotion/record">
            <FooterIcon src="/img/footer-02.svg" alt="회원가입 아이콘" />
            감정기록
          </StyledLink>
        </FooterItem>
        <FooterItem>
          <StyledLink to="/counseling">
            <FooterIcon src="/img/footer-03.svg" alt="심리 상담 아이콘" />
            AI 심리상담
          </StyledLink>
        </FooterItem>
        <FooterItem>
          <StyledLink to="/emotion/record">
            <FooterIcon src="/img/footer-04.svg" alt="감정 기록 아이콘" />
            스트레스
          </StyledLink>
        </FooterItem>
      </FooterNav>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  max-width: 50rem;
  width: 100%;
  margin: calc(-1 * ${variables.layoutPadding});
  height: 10rem;
  background-color: ${variables.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: ${variables.borderRadius}+ 2.2rem;
  border-top-right-radius: ${variables.borderRadius}+ 2.2rem;
  box-shadow: ${variables.BoxShadow};
  @media (min-width: 500px) {
    width: 100%;
  }
`;

const FooterNav = styled.ul`
  list-style: none;
  display: flex;
  gap: 4rem;
  padding: 0;
  margin: 0;
`;

const FooterItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterIcon = styled.img`
  width: 2.4rem;
  height: 2.4rem;
  transition: filter 0.3s ease;

  &:hover,
  &:focus {
    filter: brightness(0.6) sepia(1) hue-rotate(200deg);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${variables.colors.gray50};
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  &:focus {
    color: ${variables.colors.primaryStrong};
    font-weight: bold;
  }
`;

export default Footer;
