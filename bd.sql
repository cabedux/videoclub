CREATE DATABASE BLOCKBUSTER;

USE BLOCKBUSTER;

DROP TABLE CUSTOMER;
CREATE TABLE customer(
	user_id integer AUTO_INCREMENT PRIMARY KEY,
    dni varchar(12) NOT NULL,
	name VARCHAR(250) NOT NULL,
	last_name VARCHAR(250) NOT NULL,
	phone VARCHAR(11) NOT NULL,
	address VARCHAR(250) NOT NULL
);

DROP TABLE movie;
CREATE TABLE movie(
   movie_id integer AUTO_INCREMENT PRIMARY KEY,
   title VARCHAR(250) NOT NULL,
   description VARCHAR(250) NOT NULL,
   release_date VARCHAR(250) NOT NULL,
   gender VARCHAR(250) NOT NULL
);


drop table user_movie;
CREATE TABLE user_movie(
   user_movie_id integer auto_increment primary key,
   user_id integer NOT NULL,
   movie_id integer NOT NULL,
   rent_data TIMESTAMP  default CURRENT_TIMESTAMP,
   
	CONSTRAINT fk_CUSTOMER_1 FOREIGN KEY (user_id) 
	REFERENCES customer(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_MOVIE_1 FOREIGN KEY (movie_id) 
	REFERENCES movie(movie_id) ON DELETE CASCADE ON UPDATE CASCADE
)