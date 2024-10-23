'use client'; // Esto indica que es un componente del cliente

import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Card,
  Stack,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const TaskForm: React.FC = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // 'success' or 'error'
  });

  // Establece la fecha de inicio como la fecha actual al cargar el componente
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setTask(prevTask => ({
      ...prevTask,
      startDate: today,
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    setTask({
      ...task,
      [e.target.name as string]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mapeo de prioridades a números
    const priorityMap: { [key: string]: number } = {
      "Baja": 1,
      "Media": 2,
      "Crítica": 3,
      "Alta": 4,
    };
    
    // Asignar valor numérico a la prioridad
    const numericPriority = priorityMap[task.priority] || 0; // 0 si la prioridad no es válida

    // Formatear la fecha límite como DD/MM/YY HH:MM
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear()).slice(2);
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return `${day}/${month}/${year} ${time}`;
    };

    // Crear el objeto de tarea a enviar
    const taskToSubmit = {
      idUsuario: 2,
      descripcion: task.description,
      prioridad: numericPriority,
      fechaLimite: formatDate(task.endDate),
    };

    try {
      const response = await fetch("https://deploy-fast-api-production.up.railway.app/tareas/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskToSubmit),
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: "Tarea creada correctamente.",
          severity: "success",
        });
        // Restablecer el formulario
        setTask({
          title: "",
          description: "",
          startDate: task.startDate, // Mantener la fecha de inicio actual
          endDate: "",
          priority: "",
        });
      } else {
        throw new Error("Error al crear la tarea.");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error al crear la tarea: " + error.message,
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <PageContainer title="Gestión de Tareas" description="Añade una nueva tarea a tu proyecto">
      <DashboardCard title="Añadir Nueva Tarea">
        <Grid container justifyContent="flex-start" sx={{ mt: 4 }} spacing={2}>
          <Grid item xs={12} sm={8} md={6}>
            <Card sx={{ p: 4, boxShadow: 3 }}>
              <Typography variant="h5" align="left" gutterBottom>
                Añadir Nueva Tarea
              </Typography>
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    label="Título"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                  <TextField
                    label="Descripción"
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                    required
                  />
                  <Stack direction="row" spacing={2}>
                    <TextField
                      label="Fecha de inicio"
                      name="startDate"
                      type="date"
                      value={task.startDate}
                      onChange={handleChange}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                    <TextField
                      label="Fecha de fin"
                      name="endDate"
                      type="date"
                      value={task.endDate}
                      onChange={handleChange}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Stack>
                  <FormControl fullWidth>
                    <InputLabel id="priority-label">Prioridad</InputLabel>
                    <Select
                      labelId="priority-label"
                      name="priority"
                      value={task.priority}
                      onChange={handleChange}
                      fullWidth
                      required
                    >
                      <MenuItem value="Baja">Baja</MenuItem>
                      <MenuItem value="Media">Media</MenuItem>
                      <MenuItem value="Crítica">Crítica</MenuItem>
                      <MenuItem value="Alta">Alta</MenuItem>
                    </Select>
                  </FormControl>
                  <Box textAlign="left">
                    <Button type="submit" variant="contained" color="primary" size="large">
                      Añadir Tarea
                    </Button>
                  </Box>
                </Stack>
              </form>
            </Card>
          </Grid>
        </Grid>
      </DashboardCard>

      {/* Snackbar para mostrar mensajes de éxito o error */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Centrar el Snackbar en la parte superior
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%', bgcolor: snackbar.severity === 'success' ? 'green' : 'red' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default TaskForm;
