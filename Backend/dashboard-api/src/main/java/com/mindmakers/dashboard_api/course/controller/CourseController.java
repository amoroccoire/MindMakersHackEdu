package com.mindmakers.dashboard_api.course.controller;

import com.mindmakers.dashboard_api.course.services.CourseService;
import com.mindmakers.dashboard_api.course.services.dto.ResponseCourse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import java.util.Optional;



@Controller
@RequestMapping("/api/course")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping
    public ResponseEntity<List<ResponseCourse>> listCourse() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseCourse> getCourseById(@PathVariable Integer id) {
        Optional<ResponseCourse> course = courseService.getCourseById(id);
        return course.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/name/{name}")
    public List<ResponseCourse> getCoursesByName(@PathVariable String name) {
        return courseService.getCoursesByName(name);
    }

    @GetMapping("/teacher/{teacherName}")
    public List<ResponseCourse> getCoursesByTeacherName(@PathVariable String teacherName) {
        return courseService.getCoursesByTeacherName(teacherName);
    }

}
