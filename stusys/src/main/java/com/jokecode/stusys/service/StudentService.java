package com.jokecode.stusys.service;

import com.jokecode.stusys.model.Student;

import java.util.List;

public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudents();
}
