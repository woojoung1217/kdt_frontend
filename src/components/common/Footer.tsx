/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IFailure, ITestRecordSuccess } from 'types/types';
import { css } from '@emotion/react';
import Button from './Button';

const Footer = () => {
  const [hasDoneInfTest, setHasDoneInfTest] = useState<boolean>(false);
  const [showModal, setModal] = useState(false);
  const navigate = useNavigate();

  const fetchTests = async (memberId: number): Promise<ITestRecordSuccess | IFailure | null> => {
    const response = await fetch(`https://www.wishkr.site/infertility/tests/?memberId=${memberId}`);

    if (response.ok) {
      const data = await response.json();

      return data;
    }

    return null;
  };

  useEffect(() => {
    const memberId = Number(localStorage.getItem('MemberId'));

    const fetchAndSetTests = async () => {
      const data = await fetchTests(memberId);

      if (data?.result) setHasDoneInfTest(true);
    };

    fetchAndSetTests();
  }, []);

  return (
    <FooterContainer>
      <FooterNav>
        <FooterItem>
          <StyledLink to="/home">
            <FooterIcon src="/img/footer-01.svg" alt="홈 아이콘" />홈
          </StyledLink>
        </FooterItem>
        <FooterItem>
          <StyledButton
            onClick={() => {
              if (hasDoneInfTest) {
                navigate('/emotion/record');
              } else {
                setModal(true);
              }
            }}
          >
            <FooterIcon src="/img/footer-02.svg" alt="감정기록 아이콘" />
            감정기록
          </StyledButton>
        </FooterItem>
        <FooterItem>
          <StyledButton
            onClick={() => {
              if (hasDoneInfTest) {
                navigate('/counseling');
              } else {
                setModal(true);
              }
            }}
          >
            <FooterIcon src="/img/footer-04.svg" alt="심리 상담 아이콘" />
            AI 심리상담
          </StyledButton>
        </FooterItem>
        <FooterItem>
          <StyledLink to="/scale/list">
            <FooterIcon src="/img/footer-03.svg" alt="척도검사 아이콘" />
            척도검사
          </StyledLink>
        </FooterItem>
      </FooterNav>

      {showModal && (
        <div css={Modal}>
          <div className="inner">
            <p className="tit">알림</p>
            <p className="cont">난임스트레스 척도 검사를 미리 진행해주세요!</p>
            <div className="btn-box">
              <Button text="뒤로가기" variant="gray" size="medium" disabled={false} onClick={() => setModal(false)} />
              <Button text="검사하기" size="medium" disabled={false} onClick={() => navigate('/scale/list')} />
            </div>
          </div>
        </div>
      )}
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

const StyledButton = styled.button`
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

const Modal = css`
  position: fixed;
  inset: 0;
  background: rgba(115, 121, 128, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;

  .inner {
    background: #fff;
    border-radius: 1.6rem;
    padding: 3rem;
    text-align: center;
    width: calc(100% - calc(${variables.layoutPadding} * 2));
    max-width: calc(${variables.maxLayout} - calc(${variables.layoutPadding} * 2));

    .tit {
      font-size: ${variables.size.large};
      font-weight: 600;
      margin-bottom: 1.6rem;
    }
    .cont {
      font-size: ${variables.size.medium};
      color: ${variables.colors.gray100};
    }
    .btn-box {
      margin-top: 2rem;
      display: flex;
      gap: ${variables.size.min};
    }
  }
`;

export default Footer;
