create table users(
  id int auto_increment primary key,
  username varchar(100),
  password varchar(100),
);

create table music(
  id int auto_increment primary key,
  song varchar(100),
  name varchar(100),
  user_id int not null,
  foreign key(user_id) references(users.id)
);

insert into users(username, password) values('bobby');
insert into users(username, password) values('nikki');
insert into users(username, password) values('bella');
insert into users(username, password) values('dolly');


insert into music(song, name, user_id) values('/uploads/jh28t24bbc8bw8we', 'song.mp3',  1);
insert into music(song, name, user_id) values('/uploads/bfjdbfn37ebffufb', 'song1.mp3', 2);
insert into music(song, name, user_id) values('/uploads/bnfjdwfjbfdjb2jb', 'song2.mp3', 3);
insert into music(song, name, user_id) values('/uploads/pkwndbd22ni2n3k3', 'song3.mp3', 4);
insert into music(song, name, user_id) values('/uploads/ojsb6584ndh372jh', 'song4.mp3', 4);
insert into music(song, name, user_id) values('/uploads/ien36bsfw52vs62b', 'song5.mp3', 2);
insert into music(song, name, user_id) values('/uploads/qu282n6153vstsbs', 'song6.mp3', 3);
insert into music(song, name, user_id) values('/uploads/akw82nxhwtbwyqby', 'song7.mp3', 1);
