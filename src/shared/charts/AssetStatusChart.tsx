import * as React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { green, gold, red } from '@ant-design/colors';
import { IAsset, ASSET_STATUS, StatusTranslate } from '../../utils/types';

const options = (data: number[], unitName: string) => ({
  chart: {
    type: 'column',
    height: 250,
  },
  title: {
    text: 'Sumário',
  },
  xAxis: {
    categories: Object.values(StatusTranslate),
  },
  yAxis: {
    min: 0,
    title: {
      text: `${unitName} - Quantidade de Máquinas`,
    },
  },
  plotOptions: {
    series: {
      colorByPoint: true,
    },
  },
  series: [
    {
      showInLegend: false,
      type: 'column',
      colors: [green[5], gold[5], red[4]],
      data,
    },
  ],
  tooltip: {
    pointFormat: '<b>Máquinas: {point.y}</b>',
  },
});

interface AssetStatusChartProps {
  assets: IAsset[];
  unitName: string;
}
const AssetStatusChart: React.FC<AssetStatusChartProps> = ({
  assets,
  unitName,
}) => {
  const RUNNING = assets.filter(
    (asset: IAsset) => asset.status === ASSET_STATUS.Running,
  ).length;
  const STOPPED = assets.filter(
    (asset: IAsset) => asset.status === ASSET_STATUS.Stopped,
  ).length;
  const ALERTING = assets.filter(
    (asset: IAsset) => asset.status === ASSET_STATUS.Alerting,
  ).length;
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options([RUNNING, ALERTING, STOPPED], unitName)}
    />
  );
};

export default AssetStatusChart;
