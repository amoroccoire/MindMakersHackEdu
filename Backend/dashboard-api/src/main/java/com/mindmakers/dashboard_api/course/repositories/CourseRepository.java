package com.mindmakers.dashboard_api.course.repositories;

import com.mindmakers.dashboard_api.course.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Integer> {

    List<Course> findByNameContainingIgnoreCase(String name);

    List<Course> findByTeacherNameContainingIgnoreCase(String teacherName);
}
