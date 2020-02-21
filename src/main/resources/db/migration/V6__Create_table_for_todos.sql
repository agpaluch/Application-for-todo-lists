create table TODO
(
    id         INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(100) NOT NULL,
    dayId INT UNSIGNED,
    done BIT,
    FOREIGN KEY (dayId) REFERENCES DAYS_OF_WEEK(id)
);

INSERT INTO TODO (text, dayId, done) VALUES('Done todo', 1, 1);
INSERT INTO TODO (text, dayId, done) VALUES('Undone todo', 2, 0);
