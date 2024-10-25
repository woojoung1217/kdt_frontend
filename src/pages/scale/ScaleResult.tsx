import EChartsReact from 'echarts-for-react';

const data = [{ essential: '26', refusing: '22', relational: '24', sexual: '24', social: '24', total: '120' }];

const ScaleResult = () => {
  const option = {
    angleAxis: {
      max: 30,
    },
    radiusAxis: {
      type: 'category',
      data: ['essential', 'refusing', 'relational', 'sexual', 'social'],
      z: 10,
    },
    polar: {},
    series: [
      {
        name: 'Scale',
        type: 'bar',
        data: [
          `${data[0].essential}`,
          `${data[0].refusing}`,
          `${data[0].relational}`,
          `${data[0].sexual}`,
          `${data[0].social}`,
        ],
        coordinateSystem: 'polar',
      },
    ],
    legend: {},
  };

  return (
    <>
      <div>
        <h2>희선님의 난임 스트레스 척도 분포도</h2>

        <p>난임 스트레스 검사 기준으로 분류되었어요</p>
      </div>

      <EChartsReact option={option} opts={{ renderer: 'svg', width: 'auto', height: 100 }} />
    </>
  );
};

export default ScaleResult;
