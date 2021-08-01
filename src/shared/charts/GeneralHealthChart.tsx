/* eslint-disable no-nested-ternary */
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as React from 'react';
import { healthColorPicker } from '../../utils/colors';

const options = (health: number, title: string): Highcharts.Options => ({
  chart: {
    type: 'chart',
    height: '250px',
  },

  title: {
    text: `<b> ${title} (%) </b>`,
    style: { fontSize: '15px' },
  },
  tooltip: {
    pointFormat: '<b>MÉDIA DE SAÚDE DAS MÁQUINAS: {point.y} %</b>',
  },
  pane: {
    startAngle: 0,
    endAngle: 360,
    background: [
      {
        outerRadius: '120%',
        innerRadius: '90%',
        borderWidth: 2,
        backgroundColor: healthColorPicker(health, 0),
        borderColor: healthColorPicker(health, 8),
      },
    ],
  },
  yAxis: {
    min: 0,
    max: 100,
    lineWidth: 0,
    tickPositions: [],
  },

  plotOptions: {
    solidgauge: {
      dataLabels: {
        enabled: true,
      },
    },
  },
  series: [
    {
      type: 'solidgauge',
      name: 'saúde',
      data: [
        {
          color: healthColorPicker(health, 4),
          radius: '115%',
          innerRadius: '95%',
          y: health,
        },
      ],
      dataLabels: {
        y: -10,
        borderWidth: 0,
        format:
            '<span style="font-size:18px">{y}%</span><br/>',
      },
    },
  ],
});

const GeneralHealthChart: React.FC<{ health: number; healthTitle: string }> = ({
  health,
  healthTitle,
}) => (
  <HighchartsReact
    highcharts={Highcharts}
    options={options(+health.toFixed(2), healthTitle)}
  />
);

export default GeneralHealthChart;
