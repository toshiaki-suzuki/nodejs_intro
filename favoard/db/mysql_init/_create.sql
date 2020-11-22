
CREATE DATABASE favoard;
use favoard;

CREATE TABLE users (
    id INT(11) AUTO_INCREMENT NOT NULL,
    name VARCHAR(64) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE articles (
    id INT(11) AUTO_INCREMENT NOT NULL,
    name VARCHAR(64) NOT NULL,
    user INT(11),
    FOREIGN KEY(user) REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);
