CREATE DATABASE dogs;

USE dogs;

CREATE TABLE owners (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(20),
  PRIMARY KEY(id)
);

CREATE TABLE breeds (
  id INT NOT NULL AUTO_INCREMENT,
  owner_id INT,
  breed VARCHAR(35),
  img VARCHAR(255),
  PRIMARY KEY(id),
  FOREIGN KEY (owner_id)
    REFERENCES owners(id)
);