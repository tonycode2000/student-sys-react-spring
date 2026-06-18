package com.jokecode.stusys.repository;

import com.jokecode.stusys.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
//    Connect with MySql database

}
