CREATE DATABASE music;
CREATE USER admin@localhost IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON music.* TO admin@localhost;
FLUSH PRIVILEGES;

USE music;

CREATE TABLE users(
  id int auto_increment primary key,
  username varchar(100),
  password varchar(100)
);

CREATE TABLE music(
  id int auto_increment primary key,
  song varchar(100),
  name varchar(100),
  user_id int not null,
  foreign key(user_id) references users(id)
);

CREATE TABLE videos(
  id int auto_increment primary key,
  video varchar(100),
  name varchar(100),
  user_id int not null,
  foreign key(user_id) references users(id)
);
