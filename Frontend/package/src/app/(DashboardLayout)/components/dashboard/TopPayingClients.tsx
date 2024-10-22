import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Paper,
} from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import TableContainer from "@mui/material/TableContainer";
import BlankCard from "../shared/BlankCard";

const products = [
  {
    id: "1",
    name: "Programación I",
    post: "Curso Introductorio",
    pname: "Tarea sobre conceptos básicos de programación.",
    priority: "Medium",
    pbg: "primary.main",
    budget: "2024-11-05", // Fecha límite
  },
  {
    id: "2",
    name: "IoT",
    post: "Curso de Internet de las Cosas",
    pname: "Tarea sobre la creación de un dispositivo IoT.",
    priority: "High",
    pbg: "secondary.main",
    budget: "2024-12-01", // Fecha límite
  },
  {
    id: "3",
    name: "Cloud Computing",
    post: "Curso de Computación en la Nube",
    pname: "Tarea sobre servicios de nube y sus aplicaciones.",
    priority: "Low",
    pbg: "error.main",
    budget: "2024-11-20", // Fecha límite
  },
  {
    id: "4",
    name: "PFC1",
    post: "Proyecto Fin de Carrera",
    pname: "Tarea de investigación sobre un tema de interés.",
    priority: "Critical",
    pbg: "success.main",
    budget: "2025-01-15", // Fecha límite
  },
  {
    id: "5",
    name: "Comp. Gráfica",
    post: "Curso de Computación Gráfica",
    pname: "Tarea sobre el diseño de gráficos 2D y 3D.",
    priority: "Medium",
    pbg: "info.main",
    budget: "2024-11-10", // Fecha límite
  },
  {
    id: "6",
    name: "Ética",
    post: "Curso de Ética Profesional",
    pname: "Tarea sobre dilemas éticos en la tecnología.",
    priority: "Low",
    pbg: "warning.main",
    budget: "2024-11-25", // Fecha límite
  },
  {
    id: "7",
    name: "Plataformas",
    post: "Curso sobre Plataformas Digitales",
    pname: "Tarea sobre la creación de una plataforma digital.",
    priority: "High",
    pbg: "dark.main",
    budget: "2024-12-10", // Fecha límite
  },
];


const TopPayingClients = () => {
  return (
    <DashboardCard title="Tareas asginadas">
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <Table
            sx={{
              whiteSpace: "nowrap",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Id
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Curso
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Descripcion
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Prioridad
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Tiempo
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.name}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {product.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {product.name}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          sx={{
                            fontSize: "13px",
                          }}
                        >
                          {product.post}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {product.pname}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        px: "4px",
                        backgroundColor: product.pbg,
                        color: "#fff",
                      }}
                      size="small"
                      label={product.priority}
                    ></Chip>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6">{product.budget}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default TopPayingClients;
