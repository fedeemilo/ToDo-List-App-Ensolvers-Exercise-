package com.fedecoding.codeengine.todolist.repository;

import com.fedecoding.codeengine.todolist.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    
}
