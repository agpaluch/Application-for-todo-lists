package io.github.mat3e.hello.todo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/todos")
class TodoServlet {
    private final Logger logger = LoggerFactory.getLogger(TodoServlet.class);

    private TodoRepository todoRepository;


    TodoServlet(TodoRepository todoRepository){
        this.todoRepository = todoRepository;
    }


    @GetMapping
    ResponseEntity<List<Todo>> findAllTodos() {
        logger.info("Got request");
        return ResponseEntity.ok(todoRepository.findAll());
    }

    @PutMapping("/{id}")
    ResponseEntity<Todo> toggleTodo(@PathVariable Integer id) {
        var todo = todoRepository.findById(id);
        todo.ifPresent(t -> {
            t.setDone(!t.isDone());
            todoRepository.save(t);
        });
        return todo.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

@PostMapping
    ResponseEntity<Todo> saveTodo(@RequestBody Todo todo){
        return ResponseEntity.ok(todoRepository.save(todo));
    }



}
