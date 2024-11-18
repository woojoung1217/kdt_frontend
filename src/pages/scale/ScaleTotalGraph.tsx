/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import EChartsReact from 'echarts-for-react';
import { ScaleData } from './ScaleList';

const ScaleTotalGraph = ({ scaleData }: { scaleData: ScaleData | undefined }) => {
  const toTalOption = {
    angleAxis: {
      max: 230,
      show: false,
    },
    legend: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    color: [`${variables.colors.secondaryStrong}`, `${variables.colors.primaryStrong}`],
    radiusAxis: {
      axisLine: {
        show: false,
      },
      type: 'category',
      data: ['prevTotal', 'total'],
      z: 10,
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },

    polar: { radius: ['40%', '100%'] },
    series: [
      {
        name: 'Scale',
        type: 'bar',
        //[최근결과 , 오늘의 결과]
        data: [`180`, `${scaleData?.total}`],
        coordinateSystem: 'polar',
        colorBy: 'data',
        roundCap: true,
        showBackground: true,
        cursor: 'default',
        backgroundStyle: {
          color: 'rgba(239 , 239, 239, 1)',
        },
        barWidth: '60%',
      },
    ],
  };

  return (
    <div css={TotalSection}>
      <div css={TotalText}>
        <div className="toDayResult">
          <p>
            오늘의 결과
            <span>{scaleData?.total}점</span>
          </p>
        </div>
        <div className="latestResults">
          <p>
            최근 검사 결과
            <span>210점</span>
          </p>
        </div>
      </div>

      <div css={TotalGraph}>
        <EChartsReact option={toTalOption} opts={{ renderer: 'svg' }} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  );
};

export default ScaleTotalGraph;

const TotalSection = css`
  background-color: ${variables.colors.white};
  width: 100%;
  border: 0.1rem solid ${variables.colors.gray5};
  box-shadow: ${variables.BoxShadow};
  border-radius: 1rem;
  padding: 2.2rem 4rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: space-between;
`;

const TotalGraph = css`
  width: 100%;
  height: 20rem;
  max-width: 20rem;
`;

const TotalText = css`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  & p {
    color: #878787;
    font-size: ${variables.size.medium};

    &::before {
      content: '';
      display: inline-block;
      margin-right: 1.2rem;
      width: 0.6rem;
      height: 1.4rem;
      border-radius: 1rem;
      background-color: ${variables.colors.primaryStrong};
    }

    & span {
      display: block;
      margin-top: 0.5rem;
      text-indent: 2rem;
      font-size: 2.6rem;
      font-weight: 700;
    }
  }

  .toDayResult > p > span {
    color: ${variables.colors.black};
  }

  .latestResults > p > span {
    color: ${variables.colors.gray100};
  }

  .latestResults > p {
    &::before {
      background-color: ${variables.colors.secondaryStrong};
    }
  }
`;
