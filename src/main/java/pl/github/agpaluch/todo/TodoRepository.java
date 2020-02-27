package pl.github.agpaluch.todo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
interface TodoRepository extends JpaRepository<Todo, Integer>, TodoRepositoryCustom{


   List<Todo> findByDate(LocalDate date);

}
