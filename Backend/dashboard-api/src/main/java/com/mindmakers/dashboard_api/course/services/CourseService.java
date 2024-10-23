package com.mindmakers.dashboard_api.course.services;


import com.mindmakers.dashboard_api.course.repositories.CourseRepository;
import com.mindmakers.dashboard_api.course.services.dto.ResponseCourse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public List<ResponseCourse> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(ResponseCourse::new)
                .collect(Collectors.toList());
    }


    public Optional<ResponseCourse> getCourseById(Integer id) {
        return courseRepository.findById(id)
                .map(ResponseCourse::new);
    }

    public List<ResponseCourse> getCoursesByName(String name) {
        return courseRepository.findByNameContainingIgnoreCase(name).stream()
                .peek(course -> System.out.println("Course: " + course)) // Esto te permitirá ver cada objeto Course antes de mapearlo
                .map(ResponseCourse::new)
                .collect(Collectors.toList());
    }
    public List<ResponseCourse> getCoursesByTeacherName(String teacherName) {
        return courseRepository.findByTeacherNameContainingIgnoreCase(teacherName).stream()
                .map(ResponseCourse::new)
                .collect(Collectors.toList());
    }
}
