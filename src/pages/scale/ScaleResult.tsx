/** @jsxImportSource @emotion/react */
import Button from '@components/common/Button';
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ScaleData } from './ScaleList';
import ScaleTotalGraph from './ScaleTotalGraph';
import ScaleTypeGraph from './ScaleTypeGraph';
import prevIcon from '/img/icon-page-prev.svg';

const SCALEDATA_URL = '/infertility/tests/';

const ScaleResult = () => {
  const [scaleData, setScaleData] = useState<ScaleData>();
  const userName = localStorage.getItem('userName');
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const hasInURL = location.pathname.includes('list');

  const fetchScaleData = async (): Promise<ScaleData | undefined> => {
    try {
      const res = await axios.get(`${SCALEDATA_URL}${params.id}/`, {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
      });
      if (res.status === 200) setScaleData(res.data.result);
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };

  useEffect(() => {
    fetchScaleData();
  }, []);
  return (
    <>
      <div css={BackGroundColor}>
        {hasInURL ? (
          <>
            <div css={Header}>
              <button className="prev" type="button" onClick={() => navigate(-1)}>
                <span className="hidden">뒤로가기</span>
              </button>
              <h2>난임 스트레스 척도 분포도</h2>
            </div>
            <p css={ListTitle}>난임 스트레스 검사 기준으로 분류되었어요</p>
          </>
        ) : (
          <div css={Title}>
            <h2>{userName}님의 난임 스트레스 척도분포도</h2>

            <p>난임 스트레스 검사 기준으로 분류되었어요</p>
          </div>
        )}

        <div css={ContentWrapper}>
          <ScaleTotalGraph scaleData={scaleData} />
          <ScaleTypeGraph scaleData={scaleData} />

          <Button
            text="스트레스 척도 리스트로 돌아가기 "
            onClick={() => navigate('/scale/list')}
            disabled={false}
            type="button"
            size="large"
          />
        </div>
      </div>
    </>
  );
};

export default ScaleResult;

const BackGroundColor = css`
  background-color: ${variables.colors.gray5};
  margin: -2rem -1.8rem -5rem;
`;

const Header = css`
  text-align: center;
  background-color: ${variables.colors.white};
  padding: 2rem ${variables.layoutPadding} 2.5rem;
  box-shadow: 0 0 1.25rem rgba(217, 217, 217, 0.5);
  display: flex;
  align-items: flex-end;

  & h2 {
    font-size: ${variables.size.large};
    font-weight: 500;
    flex-grow: 1;
    margin-right: 5rem;
    text-align: center;
  }

  .prev {
    display: block;
    background-image: url(${prevIcon});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cotain;
    width: 5rem;
    height: 2rem;
  }
`;

const Title = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 4rem ${variables.layoutPadding};
  & h2 {
    font-size: 1.8rem;
    font-weight: 700;
  }
  & p {
    font-size: 1.6rem;
    color: ${variables.colors.gray70};
  }
`;
const ListTitle = css`
  text-align: center;
  font-size: 1.6rem;
  color: ${variables.colors.gray70};
  margin: 1.6rem 0;
`;

const ContentWrapper = css`
  padding: 0 ${variables.layoutPadding} 4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2.2rem;
`;
