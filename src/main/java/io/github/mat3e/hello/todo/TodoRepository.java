package io.github.mat3e.hello.todo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
interface TodoRepository extends JpaRepository<Todo, Integer> {

   List<Todo> findByDate(LocalDate date);

}
