package com.mindmakers.dashboard_api.course.services;


import com.mindmakers.dashboard_api.course.entities.Course;
import com.mindmakers.dashboard_api.course.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(Integer id) {
        return courseRepository.findById(id);
    }

    public List<Course> getCoursesByName(String name) {
        return courseRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Course> getCoursesByTeacherName(String teacherName) {
        return courseRepository.findByTeacherNameContainingIgnoreCase(teacherName);
    }
}
