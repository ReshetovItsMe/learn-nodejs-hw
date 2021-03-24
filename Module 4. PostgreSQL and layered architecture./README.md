# PostgreSQL and layered architecture

## PREREQUISITES:

The task is a continuation of [Module 3. In-memory CRUD REST service with validation](https://github.com/ReshetovItsMe/learn-nodejs-hw/tree/main/Module%203.%20In-memory%20CRUD%20REST%20service%20with%20validation.).

## Task 1

* Install DB PostgreSQL on your machine or use a free web hosting services for PostgreSQL (<https://www.heroku.com/postgresor> <https://www.elephantsql.com/plans.html>).
* Write SQL script which will create Users table in the DB and fill it in with predefined users’collection.
* Configure your REST service to work with PostgreSQL.
  * Use the sequelize package(<http://docs.sequelizejs.com/>) as ORM to work with PostgreSQL.

As an alternative to sequelize you can use more low-level query-builder library(<http://knexjs.org/>).

## Task 2

The service should adhere to 3-layer architecture principles (<https://softwareontheroad.com/ideal-nodejs-project-structure/>) and contain the following set of directories:

* routers / controllers
* services
* data-access
* models
