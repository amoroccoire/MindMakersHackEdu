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

  // Función para asignar colores dinámicos según las notas
  const getBarColors = (data: number[]) => {
    return data.map((value) => {
      if (value <= 10) return "rgba(255, 0, 0, 0.5)"; // Rojo medio opaco para notas entre 0 y 10
      return "rgba(0, 128, 0, 0.5)"; // Verde opaco para notas entre 10 y 20
    });
  };

  // Datos de los cursos
  const seriesData = [
    {
      name: "Examen",
      data: [5, 8, 13, 9, 15, 10, 19],
    },
    {
      name: "Continua",
      data: [8, 13, 3, 15, 12, 16, 14],
    },
  ];

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#000000",
      toolbar: {
        show: true,
      },
      height: 370,
    },
    plotOptions: {
      bar: {
        horizontal: true, // Barras horizontales
        barHeight: "90%",
        columnWidth: "42%",
        borderRadius: [6],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
        colors: {
          ranges: [
            {
              from: 0,
              to: 10,
              color: "rgba(255, 0, 0, 0.5)", // Rojo medio opaco
            },
            {
              from: 10,
              to: 20,
              color: "#1e7b01", // Verde opaco
            },
          ],
        },
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
          series={seriesData}
          type="bar"
          width={"100%"}
          height="370px"
        />
      </Box>
    </DashboardCard>
  );
};

export default ProfitExpenses;
