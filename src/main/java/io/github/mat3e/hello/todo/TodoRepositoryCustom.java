package io.github.mat3e.hello.todo;

import java.time.LocalDate;
import java.util.List;

public interface TodoRepositoryCustom {

    List<Todo> findByFirstDayOfWeek(LocalDate date);
}
