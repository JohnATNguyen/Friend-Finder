CREATE DATABASE friendfinderdb;

USE friendfinderdb;

CREATE TABLE users (
	id INT auto_increment NOT NULL,
    name VARCHAR(50),
    photo VARCHAR(200),
    scores VARCHAR(100),
    PRIMARY KEY(id)
);

SELECT * FROM users;