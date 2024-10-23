
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowDownRight, IconArrowUpLeft, IconCurrencyDollar } from '@tabler/icons-react';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const ProductSales = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const successlight = theme.palette.success.light;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [primary],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };
  const seriescolumnchart: any = [
    {
      name: '',
      color: primary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ];

  return (
    <DashboardCard
      title="Record Academico"
      action={
        <Fab color="success" size="medium" sx={{ backgroundColor: '#008f39', color: '#ffffff'}}>
          <Typography variant="h6" component="span">
            17
          </Typography>
        </Fab>
      }
      footer={
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" width={"100%"} height="60px" />
      }
    >
      <>
        <Typography variant="h5" fontWeight="400" mt="-20px">
          7 cursos actualmente
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: successlight, width: 21, height: 21 }}>
            <IconArrowUpLeft width={18} color="#39B69A" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            --
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Actualmente en septimo semestre
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default ProductSales;
