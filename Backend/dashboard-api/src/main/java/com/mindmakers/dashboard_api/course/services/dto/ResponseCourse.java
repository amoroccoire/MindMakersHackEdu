package com.mindmakers.dashboard_api.course.services.dto;

import com.mindmakers.dashboard_api.course.entities.Course;

public record ResponseCourse(Integer id, String name, String teacherName, Integer credits) {

    public ResponseCourse(Course course) {
        this(course.getId(), course.getName(), course.getTeacherName(), course.getCredits());
    }
}
