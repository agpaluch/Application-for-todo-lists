package pl.github.agpaluch.todo;

import java.time.LocalDate;
import java.util.List;

public interface TodoRepositoryCustom {

    List<Todo> findByFirstDayOfWeek(LocalDate date);
}
