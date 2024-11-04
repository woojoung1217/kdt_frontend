import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { Link } from 'react-router-dom';

const ScaleList = () => {
  const data = [
    {
      testId: '1',
      email: 'email',
      total: '120',
      social: '23',
      sexual: '21',
      relational: '25',
      refusing: '18',
      essential: '33',
      createAt: '2023-09-25',
    },
    {
      testId: '2',
      email: 'email',
      total: '120',
      social: '23',
      sexual: '21',
      relational: '25',
      refusing: '18',
      essential: '33',
      createAt: '2023-10-25',
    },
  ];

  const ScaleList = styled.div`
    margin: -2rem calc(${variables.layoutPadding}*-1);
    background-color: ${variables.colors.gray5};
    min-height: 100vh;
  `;
  const TopBox = styled.div`
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
    .btn {
      display: block;
      margin-top: 3rem;
      background-color: ${variables.colors.primary};
      color: ${variables.colors.white};
      height: 4.6rem;
      line-height: 4.4rem;
      border-radius: 0.8rem;
      font-size: ${variables.size.big};
      box-shadow: 0 0.4rem 0.4rem ${variables.colors.primarySoft};
      transition: all ${variables.TransitionDuration};
      &:hover {
        background-color: ${variables.colors.primaryStrong};
      }
    }
  `;
  const BottomBox = styled.ul`
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

  return (
    <ScaleList className="scale-list">
      <TopBox>
        <h2>난임 스트레스 검사 기록</h2>
        <div className="chart">
          차트 자리
          <span className="desc">스트레스 검사 지수</span>
        </div>
        <Link to="/scale/testing" className="btn">
          난임 스트레스 검사 하러가기
        </Link>
      </TopBox>

      <BottomBox>
        {data.map((item) => (
          <li>
            <Link to={`/scale/${item.testId}`}>{item.createAt.split('-').join('.')}</Link>
          </li>
        ))}
      </BottomBox>
    </ScaleList>
  );
};

export default ScaleList;
