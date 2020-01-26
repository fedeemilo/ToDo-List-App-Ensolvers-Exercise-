package com.fedecoding.codeengine.todolist.controller;

import com.fedecoding.codeengine.todolist.model.Todo;
import com.fedecoding.codeengine.todolist.repository.TodoRepository;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/todos")
public class TodoController {
   
    @Autowired
    private TodoRepository todoRepository;
    
    @GetMapping
    public List<Todo> findAll() {
        return todoRepository.findAll();
    }
    
    @PostMapping
    public Todo save(@Valid @NotNull @RequestBody Todo todo) {
        return todoRepository.save(todo);
    }
    
    @PutMapping
    public Todo update(@Valid @NotNull @RequestBody Todo todo) {
        return todoRepository.save(todo); 
    }
   
    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable Long id) {
        todoRepository.deleteById(id);
    }
}
