create table TODO
(
    id         INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(100) NOT NULL,
    day ENUM('MONDAY', 'TUESDAY', 'WEDNESEDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'),
   /* day VARCHAR(50),*/
    done BIT
);

INSERT INTO TODO (text, day, done) VALUES('Done todo', 'MONDAY', 1);
INSERT INTO TODO (text, day, done) VALUES('Undone todo', 'TUESDAY', 0);
