create table TODO
(
    id         INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(100) NOT NULL,
    done       BIT
);

INSERT INTO TODO (text, done) VALUES('Done todo', 1);
INSERT INTO TODO (text, done) VALUES('Undone todo', 0);
