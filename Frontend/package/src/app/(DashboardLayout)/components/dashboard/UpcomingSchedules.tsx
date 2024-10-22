import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from "@mui/lab";
import { Typography } from "@mui/material";

const UpcomingSchedules = () => {
  return (
    <DashboardCard title="Agenda diaria">
      <>
        <Timeline
          className="theme-timeline"
          sx={{
            p: 0,
            mb: { lg: "-40px" },
            "& .MuiTimelineConnector-root": {
              width: "1px",
              backgroundColor: "#efefef",
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
            },
            overflowY: "auto", // Permitir el desplazamiento vertical
            maxHeight: "400px", // Establecer una altura máxima
          }}
        >
          {/** Cada TimelineItem ahora tiene un margen inferior para mayor separación */}
          <TimelineItem sx={{ mb: 2 }}> {/* Agregado margen inferior */}
            <TimelineOppositeContent>09:00 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              Reunión con el equipo de investigación sobre calidad del aire.
              <br />
              <Typography variant="caption" color="text.secondary">
                Fecha límite: 2024-10-21
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem sx={{ mb: 2 }}> {/* Agregado margen inferior */}
            <TimelineOppositeContent>10:30 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="secondary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">Enviar informes de análisis.</Typography>
              <br />
              <Typography variant="caption" color="text.secondary">
                Fecha límite: 2024-10-22
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem sx={{ mb: 2 }}> {/* Agregado margen inferior */}
            <TimelineOppositeContent>11:00 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              Tarea: Revisar literatura sobre contaminantes atmosféricos.
              <br />
              <Typography variant="caption" color="text.secondary">
                Fecha límite: 2024-10-23
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem sx={{ mb: 2 }}> {/* Agregado margen inferior */}
            <TimelineOppositeContent>01:00 pm</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="warning" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">Llamada con el asesor académico.</Typography>
              <br />
              <Typography variant="caption" color="text.secondary">
                Fecha límite: 2024-10-24
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem sx={{ mb: 2 }}> {/* Agregado margen inferior */}
            <TimelineOppositeContent>03:00 pm</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="error" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">Preparar presentación para el seminario.</Typography>
              <br />
              <Typography variant="caption" color="text.secondary">
                Fecha límite: 2024-10-25
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>04:30 pm</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" variant="outlined" />
            </TimelineSeparator>
            <TimelineContent>
              Estudio para el examen de ética.
              <br />
              <Typography variant="caption" color="text.secondary">
                Fecha límite: 2024-10-26
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </>
    </DashboardCard>
  );
};

export default UpcomingSchedules;
