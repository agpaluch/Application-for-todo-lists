package io.github.mat3e.hello.todo;

import com.sun.istack.NotNull;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name= "DAYS_OF_WEEK")
class DayOfWeek {

    @Id
    @GeneratedValue(generator="inc")
    @GenericGenerator(name="inc", strategy = "increment")
    private Integer Id;


    @OneToMany(mappedBy = "dayOfWeek", cascade = CascadeType.ALL)
    private Set<Todo> todoList;



}
