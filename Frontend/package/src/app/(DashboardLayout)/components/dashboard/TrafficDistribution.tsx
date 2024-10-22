import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, Avatar } from "@mui/material";
import { IconArrowUpLeft } from "@tabler/icons-react";

import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const TrafficDistribution = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const error = theme.palette.error.main;
  const secondary = theme.palette.secondary.light;
  const successlight = theme.palette.success.light;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 170,
    },
    colors: [secondary, error, primary],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
          background: "transparent",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '22px',  // Tamaño del texto del nombre
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 600,
              color: theme.palette.text.primary,
              offsetY: 0,
              formatter: function () {
                return "3"; // Este es el número
              }
            },
            value: {
              show: false
            },
            total: {
              show: true,
              label: "Total",
              fontSize: '40px', // Aquí ajustas el tamaño del número en el centro
              formatter: function () {
                return "3"; // Número que aparece en el centro
              }
            }
          }
        }
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  
  const seriescolumnchart: any = [5368, 10500, 4106];

  return (
    <DashboardCard title="Porcentaje de carrera">
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={6} sm={7}>
          <Typography variant="h3" fontWeight="700">
            38%
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            mt={1}
            alignItems="center"
          >
            <Stack direction="row">
              <Avatar sx={{ bgcolor: successlight, width: 21, height: 21 }}>
                <IconArrowUpLeft width={18} color="#39B69A" />
              </Avatar>
              <Typography variant="subtitle2" fontWeight="600">
                +9%
              </Typography>
            </Stack>
            <Typography variant="subtitle2" color="textSecondary">
              Este año
            </Typography>
          </Stack>
          <Stack spacing={3} mt={3} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: primary,
                  svg: { display: "none" },
                }}
              ></Avatar>
              <Typography
                variant="subtitle2"
                fontSize="12px"
                color="textSecondary"
              >
                Cursos Actuales
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: error,
                  svg: { display: "none" },
                }}
              ></Avatar>
              <Typography
                variant="subtitle2"
                fontSize="12px"
                color="textSecondary"
              >
                Cursos pasados
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* column */}
        <Grid item xs={6} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            width={"100%"}
            height="150px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default TrafficDistribution;
