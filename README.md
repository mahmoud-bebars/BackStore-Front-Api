# Storefront Backend Project

## Getting Started

- how to setup and connect to the database
- what ports the backend and database are running on
- package installation instructions

## setup project

- first clone the project to your own machine
- create the dotenv file containg the following vars :-

```
POSTGRES_HOST=...
POSTGRES_DB=...
POSTGRES_TEST_DB=...
POSTGRES_USER=...
POSTGRES_PASSWORD=...
ENV=dev
BCRYPT_PASSWORD=...
SALT_ROUNDS=...
ACCESS_TOKEN_SEECRET=...
PORT=...
JWT_EXPIRES=...
```

- then start installing the neccessary packages with this command `npm install` .

## database SetUp

- now we will connect to the database with docker so we will init the container with this command to create the databse `docker compose up` in the root directory of your project .
- now we have our databse container run command `docker compose down`
- then init it again from the docker GUI
- now execut the container from the the cli option for this container
  from the docker dashboard GUI.
- we need now to create the user & init the db we add it in the .env file:-

* init command ` psql postgres` to enter the psql environment
* init command ` CREATE USER // POSTEGRES_USER WITH PASSWORD POSTGRES_PASSWORD;` to create user
* init commands
  ` CREATE DATABSE // POSTGRES_DB;`
  `CREATE DATABSE // POSTGRES_TEST_DB;`
* init commands
  ` GRANT ALL PRIVILEGES ON DATABASE // POSTGRES_DB TO // POSTGRES_USER;`
  `GRANT ALL PRIVILEGES ON DATABASE // POSTGRES_TEST_DB TO // POSTGRES_USER ;`
* connect to db by initing command `\c // POSTGRES_DB` Or `\c // POSTGRES_TEST_DB`

- your database is ready for deveolpment now
- look for the scripts in the package.json and start testing...

## Project Ports

- for the backend port i leave it optional to you to add the port you like... in the `PORT` variable.

- for the database port in the docker-compose file it runs on `'5432:5432'`

## Packages installation

- an easy command we use it to install the dev and the producations packages in parallel way is `npm install` .
