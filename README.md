This project uses Docker Compose for a Node.js application with a PostgreSQL database. It leverages tools like `nodemon` for efficient development and `dbmate` for database migrations.

## Prerequisites

- Docker Desktop (or Docker Engine and Docker Compose installed separately)
- npm
- Node.js v22.12.0 or higher

## Getting started

1. Copy environment variables:

```
  cp .env.example .env
```

2. Start the development environment:

```
docker-compose up --build
```

This builds and starts the Docker containers

3. Install dependencies

```
npm install
```

## Creating a new migration

```
npm run dbmate new <migration-name>
```

## Running migration locally

To run the migration

```
npm run dbmate up
```

To revert the migration

```
npm run dbmate down
```

## Running tests

```
npm run test
```


**Project structure**

*   `db/migrations`: Stores database migration files managed by `dbmate`.  Don't modify these files directly; use `dbmate` commands to create and apply migrations.

*   `src`: Source code for the Node.js application

    * `api`: Code for setting up api endpoints, containing `routes`, `middlewares` & `controller`
    * `db`: Configuration for connecting to DB
    * `schemas`: Defined types & schemas used accross the projects
    * `services`: Services class / modules that contains business logic
    * `tests`: Test files

*   `composer.yaml`: Defines the services (database, application) and their configurations for development environment.

*   `Dockerfile`: Specifies how the Node.js application image is built.

*   `.env`: Stores environment variables. Never commit this file to version control. Use `.env.example` as a template and fill in the values for your local setup.
