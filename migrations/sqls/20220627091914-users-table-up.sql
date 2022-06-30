CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  userId VARCHAR(50),
  firstName VARCHAR(30),
  LastName VARCHAR(30),
  email VARCHAR(100),
  username VARCHAR(50),
  password text
);