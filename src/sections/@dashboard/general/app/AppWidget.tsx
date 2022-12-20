import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, Typography, Box, CardProps } from '@mui/material';
// utils
import { fNumber } from '../../../../utils/formatNumber';
// theme
import { ColorSchema } from '../../../../theme/palette';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.primary.darker,
}));

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 120,
  height: 120,
  opacity: 0.12,
  position: 'absolute',
  right: theme.spacing(-3),
  color: theme.palette.common.white,
}));

// ----------------------------------------------------------------------

interface Props extends CardProps {
  icon: string;
  title: string;
  total: number;
  chartData: number;
  color?: ColorSchema;
}

export default function AppWidget({
  title,
  total,
  icon,
  color = 'primary',
  chartData,
  ...other
}: Props) {
  const theme = useTheme();


  return (
    <RootStyle
      sx={{
        bgcolor: theme.palette[color].darker,
      }}
      {...other}
    >
      <ReactApexChart
        type="radialBar"
        series={[chartData]}
        width={86}
        height={86}
      />
      <Box sx={{ ml: 3, color: 'common.white' }}>
        <Typography variant="h4"> {fNumber(total)}</Typography>
        <Typography variant="body2" sx={{ opacity: 0.72 }}>
          {title}
        </Typography>
      </Box>
      <IconStyle icon={icon} />
    </RootStyle>
  );
}
