##### Prerequisites

    1- nodejs
    2- postgres sql
    3- redis-server

##### How to run the project

    1- npm i
    2- npm run dbReset
    3- npm run dev

##### Create migration or seed files

    1- npm i -g knex
    2- knex migrate:make create_table_mig_filename
    3- knex seed:make seed_file_name

#### Run migrations and Seed individually

    1- npm run dbRollback
    2- npm run dbMigrations
    3- npm run dbSeeds
