#!/bin/sh

echo "Waiting for postgres to start..."

while ! nc -z mmdb_postgres 5432; do
    sleep 0.1
done

echo "Postgres started"

npm run db:create:dev
npm run migrate:dev
npm run start:both