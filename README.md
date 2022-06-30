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

- we need now to connect to the database with docker so we will init the container with this command to create the databse `docker compose up` .
- then we will init the cli for this container
  from the docker dashboard GUI.
- we need now to access the db with the user in the .env file by writing this command `psql postgres // POSTGRES_USER` .
- then connect to the database by writing this command `\c // POSTGRES_DB` .
- now look for the scripts in the package.json and start testing...

## Project Ports

- for the backend port i leave it optional to you to add the port you like... in the `PORT` variable.

- for the database port in the docker-compose file it runs on `'5432:5432'`

## Packages installation

- an easy command we use it to install the dev and the producations packages in parallel way is `npm install` .
