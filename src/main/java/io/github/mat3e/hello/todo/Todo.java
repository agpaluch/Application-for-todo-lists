package io.github.mat3e.hello.todo;

import com.sun.istack.NotNull;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table
class Todo {

    @Id
    @GeneratedValue(generator="inc")
    @GenericGenerator(name="inc", strategy = "increment")
    private Integer Id;

    @NotNull
    private String text;

    @ManyToOne
    @JoinColumn(name = "dayId")
    private DayOfWeek dayOfWeek;


    private boolean done;

    /**
     * Constructor used by Hibernate.
     */
    @SuppressWarnings("unused")
    Todo(){

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
