create table TODO
(
    id         INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    done BIT
);

INSERT INTO TODO (text, date, done) VALUES('Done todo', '2009-12-28', 1);
INSERT INTO TODO (text, date, done) VALUES('Undone todo', '2010-01-02', 0);
INSERT INTO TODO (text, date, done) VALUES('Undone todo', '2020-02-17', 0);
