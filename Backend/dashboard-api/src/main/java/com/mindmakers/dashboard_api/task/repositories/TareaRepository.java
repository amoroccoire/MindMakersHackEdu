package com.mindmakers.dashboard_api.task.repositories;

import com.mindmakers.dashboard_api.task.entities.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TareaRepository extends JpaRepository<Tarea, Integer> {
}
