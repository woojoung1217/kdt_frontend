/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import EChartsReact from 'echarts-for-react';
import { ScaleData } from './ScaleList';

const data = [{ essential: '26', refusing: '22', relational: '24', sexual: '24', social: '24', total: '120' }];

const ScaleTypeGraph = ({ scaleData }: { scaleData: ScaleData | undefined }) => {
  const typeOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      show: false,
    },

    grid: {
      left: '0%',
      right: '0%',
      top: '0%',
      bottom: '0%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      max: 60,
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      interval: 5,
    },
    yAxis: {
      show: false,
      type: 'category',
      data: ['사회적', '관계적', '성적', '아이가 없는\n일상에 대한 거부', '부모됨의 필요성'],
      inverse: true,
      axisLabel: {
        show: false,
      },
    },
    series: [
      {
        name: 'last',
        type: 'bar',
        barWidth: '30%',
        barCategoryGap: '50%',
        cursor: 'default',
        itemStyle: {
          color: `${variables.colors.gray50}`,
          borderRadius: [0, 5, 5, 0],
          emphasis: {
            color: `${variables.colors.gray50}`,
          },
        },
        data: [
          `${data[0].social}`,
          `${data[0].relational}`,
          `${data[0].sexual}`,
          `${data[0].refusing}`,
          `${data[0].essential}`,
        ],
      },
      {
        name: 'today',
        type: 'bar',
        barWidth: '30%',
        barCategoryGap: '50%',
        cursor: 'default',
        itemStyle: {
          color: `${variables.colors.primaryStrong}`,
          borderRadius: [0, 5, 5, 0],
          emphasis: {
            color: `${variables.colors.primaryStrong}`,
          },
        },
        data: [
          `${scaleData?.social}`,
          `${scaleData?.relational}`,
          `${scaleData?.sexual}`,
          `${scaleData?.refusing}`,
          `${scaleData?.essential}`,
        ],
      },
    ],
  };

  return (
    <div css={TypeSection}>
      <div css={TypeGraph}>
        <div className="graphTit">
          <p>사회적</p>
          <p>관계적</p>
          <p>성적</p>
          <p>
            아이가 없는 <br />
            일상에 대한 거부
          </p>
          <p>부모됨의 필요성</p>
        </div>
        <div className="graph">
          <EChartsReact option={typeOption} opts={{ renderer: 'svg' }} style={{ height: '100%', width: '100%' }} />
        </div>
      </div>
      <div css={TypeText}>
        <p className="lastDay">최근 검사 결과</p>
        <p className="toDay">오늘의 결과</p>
      </div>
    </div>
  );
};

export default ScaleTypeGraph;

const TypeSection = css`
  background-color: ${variables.colors.white};
  width: 100%;
  border: 0.1rem solid ${variables.colors.gray5};
  box-shadow: ${variables.BoxShadow};
  border-radius: 1rem;
  padding: 2.2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TypeGraph = css`
  display: flex;
  border: 0.1rem solid ${variables.colors.gray50};
  border-left: none;
  .graphTit {
    display: flex;
    flex-direction: column;

    & button {
      padding: 0 1rem;
      border-bottom: 0.1rem solid ${variables.colors.gray50};
      display: flex;
      gap: 1rem;
      align-items: center;
      width: 13rem;
      height: 20%;

      & span {
        flex-shrink: 0;
      }
    }

    & button:last-child {
      border-bottom: none;
    }
  }
  .graph {
    width: 100%;
    height: 30rem;
  }
`;

const TypeText = css`
  display: flex;
  justify-content: flex-end;
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
  }

  .lastDay {
    &::before {
      background-color: ${variables.colors.gray50};
    }
  }
`;
