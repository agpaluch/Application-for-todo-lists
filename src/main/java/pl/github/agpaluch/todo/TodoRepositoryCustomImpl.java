package pl.github.agpaluch.todo;

import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;


@Repository
@Transactional
public class TodoRepositoryCustomImpl implements TodoRepositoryCustom {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Todo> findByFirstDayOfWeek(LocalDate date) {

        return this.entityManager.createQuery("SELECT t FROM Todo t WHERE date BETWEEN :start AND :end", Todo.class)
                .setParameter("start", date)
                .setParameter("end", date.plusDays(7))
                .getResultList();

    }

}
