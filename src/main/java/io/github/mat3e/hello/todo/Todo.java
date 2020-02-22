package io.github.mat3e.hello.todo;

import com.sun.istack.NotNull;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.DayOfWeek;

@Entity
@Table
class Todo {

    @Id
    @GeneratedValue(generator="inc")
    @GenericGenerator(name="inc", strategy = "increment")
    private Integer Id;

    @NotNull
    private String text;

    @NotNull
    @Enumerated(EnumType.STRING)
    private DayOfWeek day;


    private boolean done;

    /**
     * Constructor used by Hibernate.
     */
    @SuppressWarnings("unused")
    Todo(){

    }

    public DayOfWeek getDay() {
        return day;
    }

    public void setDay(DayOfWeek day) {
        this.day = day;
    }

    public Integer getId() {
        return Id;
    }


    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }
}
