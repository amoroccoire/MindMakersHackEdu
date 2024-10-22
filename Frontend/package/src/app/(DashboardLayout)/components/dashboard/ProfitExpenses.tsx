import React from "react";
import { MenuItem, Box, IconButton, Menu } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import MoreVertIcon from '@mui/icons-material/MoreVert';

const options = [
  "Action",
  "Another Action",
  "Something else here",
];

const ProfitExpenses = () => {
  // menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.error.main;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: true,
      },
      height: 370,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: true, // Cambiamos a barras horizontales
        barHeight: "90%",
        columnWidth: "42%",
        borderRadius: [6],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },

    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      min: 0, // Valor mínimo
      max: 20, // Valor máximo
      tickAmount: 4,
    },
    xaxis: {
      categories: ["Programacion I", "IoT", "Cloud Computing", "PFC1", "Comp. Grafica", "Etica", "Plataformas"],
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
  };

  const seriescolumnchart: any = [
    {
      name: "Examen ",
      data: [12, 15, 13, 17, 15, 10, 19],
    },
    {
      name: "Continua ",
      data: [16, 13, 19, 15, 14, 16, 14],
    },
  ];

  return (
    <DashboardCard
      title="Mis cursos"
      action={
        <>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === "Pyxis"}
                onClick={handleClose}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </>
      }
    >
      <Box className="rounded-bars">
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="bar"
          width={"100%"}
          height="370px"
        />
      </Box>
    </DashboardCard>
  );
};

export default ProfitExpenses;
