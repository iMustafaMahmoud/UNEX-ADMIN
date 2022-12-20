import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader, CardProps } from '@mui/material';
// utils
import { fNumber } from '../../../../utils/formatNumber';
// components

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important' as 'relative',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chartData: {
    label: string;
    value: number;
  }[];
  chartColors?: string[];
}

export default function AppCurrentDownload({
  title,
  subheader,
  chartData,
  chartColors,
  ...other
}: Props) {


  const chartSeries = chartData.map((i) => i.value);



  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="donut" series={chartSeries}  height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
