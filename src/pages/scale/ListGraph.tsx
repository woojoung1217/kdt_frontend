/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import EChartsReact from 'echarts-for-react';

interface Data {
  id: number;
  total: number;
  social: number;
  sexual: number;
  relational: number;
  refusing: number;
  essential: number;
  belifs: string;
  created_at: string;
  member_id: number;
}

const ListGraph = ({ data }: { data: Data[] }) => {
  const dataList = data.length > 7 ? data.slice(-6) : data;
  const typeOption = {
    color: `${variables.colors.primary}`,
    grid: {
      left: 0,
      right: 1,
      top: 5,
      bottom: '5%',
      containLabel: true,
    },

    xAxis: {
      type: 'category',
      data: dataList.map((scale: Data) => scale.created_at.split('T')[0].slice(5).split('-').join('.')),
      offset: 10,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        margin: 0,
        interval: 0,
        color: `${variables.colors.gray100}`,
        fontSize: '1.2rem',
      },
      interval: 100,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#e0e0e0',
          type: 'solid',
        },
      },
    },

    yAxis: {},

    series: [
      {
        name: 'total',
        type: 'bar',
        barWidth: '40%',
        cursor: 'default',
        itemStyle: {
          borderRadius: [5, 5, 0, 0],
          shadowColor: 'rgba(197, 178, 255, 0.6)',
          shadowBlur: 8,
        },
        data: dataList.map((scale) => scale.total),
      },
    ],
  };

  return (
    <>
      <div css={TypeSection}>
        <div css={TypeGraph}>
          <EChartsReact option={typeOption} opts={{ renderer: 'svg' }} style={{ height: '100%', width: '100%' }} />
        </div>
      </div>
      <span className="desc">스트레스 검사 지수</span>
    </>
  );
};

export default ListGraph;

const TypeSection = css`
  border: 0.1rem solid ${variables.colors.gray5};
  box-shadow: ${variables.BoxShadow};
  border-radius: 1rem;
  padding: 2.2rem;
`;

const TypeGraph = css`
  width: 100%;
  height: 17rem;
`;
