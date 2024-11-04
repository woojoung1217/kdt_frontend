/** @jsxImportSource @emotion/react */
import Button from '@components/common/Button';
import { css } from '@emotion/react';
import variables from '@styles/Variables';
// import { useNavigate } from 'react-router-dom';
import ScaleTotalGraph from './ScaleTotalGraph';
import ScaleTypeGraph from './ScaleTypeGraph';

const ScaleResult = () => {
  // const navigate = useNavigate();

  return (
    <>
      <div css={BackGroundColor}>
        <div css={Title}>
          <h2>희선님의 난임 스트레스 척도분포도</h2>

          <p>난임 스트레스 검사 기준으로 분류되었어요</p>
        </div>

        <ScaleTotalGraph />
        <ScaleTypeGraph />

        <Button
          text="스트레스 척도 리스트로 돌아가기 "
          // onClick={() => navigate('/scale/result')}
          disabled={false}
          type="button"
          size="large"
        />
      </div>
    </>
  );
};

export default ScaleResult;

const BackGroundColor = css`
  background-color: ${variables.colors.gray5};
  margin: -1.8rem -1.8rem -5rem;
  padding: ${variables.headerHeight} 1.8rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2.2rem;
`;

const Title = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  & h2 {
    font-size: 1.8rem;
    font-weight: 700;
  }

  & p {
    font-size: 1.6rem;
    color: ${variables.colors.gray70};
  }
`;
