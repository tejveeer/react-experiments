CREATE TABLE game_histories(
    id SERIAL NOT NULL,
    user_id SERIAL NOT NULL,
    game_history text[] NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE users(
    id SERIAL NOT NULL,
    create_time date,
    name varchar(255),
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    role varchar(255),
    PRIMARY KEY(id)
);
CREATE UNIQUE INDEX users_email_key ON users USING btree ("email");