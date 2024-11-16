/** @jsxImportSource @emotion/react */
import Button from '@components/common/Button';
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ListGraph from './ListGraph';
import axios from 'axios';

export interface Scale {
  total: number;
  social: number;
  sexual: number;
  relational: number;
  refusing: number;
  essential: number;
}
export interface ScaleData extends Scale {
  member_id: number;
  belifs: string;
  id?: number;
  created_at?: string;
}

const ScaleList = () => {
  const memberId = 1;
  const [data, setData] = useState<ScaleData[] | null>();

  const fetchScaleList = async (): Promise<ScaleData | null> => {
    try {
      const response = await axios.get('/infertility/tests', {
        params: { memberId },
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
      });
      setData(response.data.result.totalTests);
      return await response.data.result.totalTests;
    } catch (err) {
      console.error('Failed to fetch scaleList: ', err);
      return null;
    }
  };

  const navigate = useNavigate();
  const [showModal, setModal] = useState(false);

  const isMonthPassed = () => {
    if (!data) return false;
    const lastTestDate = new Date(data[data.length - 1].created_at!.split('T')[0]);
    const today = new Date();
    const oneMonthLater = new Date(lastTestDate);
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
    return today >= oneMonthLater;
  };

  const toTestBtn = () => {
    if (isMonthPassed()) navigate('/scale/testing/');
    else setModal(true);
  };

  useEffect(() => {
    fetchScaleList();
  }, []);

  return (
    <div css={ScaleWr}>
      <div css={ScaleChart}>
        <h2>난임 스트레스 검사 기록</h2>
        <div className="chart">{data && <ListGraph data={data} />}</div>
        <Button onClick={toTestBtn} text="난임 스트레스 검사 하러가기" size="medium" disabled={false} />
      </div>

      {data && (
        <ul css={ScaleLists}>
          {data.map((item) => (
            <li key={item.id}>
              <Link to={`/scale/${item.id}`}>{item.created_at!.split('T')[0].split('-').join('.')}</Link>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <div css={Modal}>
          <div className="inner">
            <p className="tit">한 달에 한 번 검사를 권장해요</p>
            <p className="cont">
              아직 최근 검사 일자에서 한달이 지나지 않았어요 <br />
              그래도 검사를 진행 하실건가요?
            </p>
            <div className="btn-box">
              <Button text="취소하기" variant="gray" size="medium" disabled={false} onClick={() => setModal(false)} />
              <Button text="검사하기" size="medium" disabled={false} onClick={() => navigate('/scale/testing')} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScaleList;

const ScaleWr = css`
  margin: -2rem calc(${variables.layoutPadding}*-1);
  background-color: ${variables.colors.gray5};
  min-height: 100vh;
`;
const ScaleChart = css`
  text-align: center;
  background-color: ${variables.colors.white};
  padding: 2rem ${variables.layoutPadding} 2.5rem;
  box-shadow: 0 0 1.25rem rgba(217, 217, 217, 0.5);
  h2 {
    font-size: ${variables.size.large};
    font-weight: 500;
    text-align: center;
  }
  .chart {
    margin-top: 4rem;
    .desc {
      display: flex;
      gap: 0.6rem;
      align-items: center;
      justify-content: center;
      margin-top: 2rem;
      color: ${variables.colors.gray100};
      position: relative;
      &::before {
        content: '';
        display: inline-block;
        width: 1.2rem;
        aspect-ratio: 1/1;
        border-radius: 0.2em;
        background-color: ${variables.colors.primary};
      }
    }
  }
  button {
    display: block;
    margin-top: 3rem;
    background-color: ${variables.colors.primaryStrong};
    color: ${variables.colors.white};
    height: 4.6rem;
    line-height: 4.4rem;
    border-radius: 0.8rem;
    font-size: ${variables.size.big};
    box-shadow: 0 0.4rem 0.4rem ${variables.colors.primarySoft};
    transition: all ${variables.TransitionDuration};
    padding: 0;
    &:hover {
      background-color: ${variables.colors.primary};
    }
  }
`;
const ScaleLists = css`
  padding: 2.6rem ${variables.layoutPadding};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  li a {
    display: block;
    position: relative;
    background: ${variables.colors.white};
    height: 5.4rem;
    line-height: 5.2rem;
    padding: 0 2.4rem;
    border-radius: 1.2rem;
    box-shadow: 0 0 1rem ${variables.colors.gray10};
    transition: box-shadow ${variables.TransitionDuration};
    &:hover {
      box-shadow: 0 0 1rem ${variables.colors.gray50};
    }
    &::after {
      content: '';
      display: block;
      position: absolute;
      background: url(/img/icon-page-prev.svg) no-repeat center right / 100%;
      width: 0.8rem;
      aspect-ratio: 1/2;
      top: 50%;
      right: 2rem;
      transform: translateY(-50%) rotate(180deg);
    }
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
