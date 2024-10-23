'use client'; // Esto indica que es un componente del cliente

import React, { useState } from "react";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    setTask({
      ...task,
      [e.target.name as string]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tarea enviada:", task);
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
                      <MenuItem value="Low">Baja</MenuItem>
                      <MenuItem value="Medium">Media</MenuItem>
                      <MenuItem value="High">Alta</MenuItem>
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
    </PageContainer>
  );
};

export default TaskForm;
