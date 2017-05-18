USE g68xvwt8nkcd9f4y;

CREATE TABLE users (
	id INT auto_increment NOT NULL,
    photo VARCHAR(200),
    scores VARCHAR(50),
    PRIMARY KEY(id)
);

SELECT * FROM users;