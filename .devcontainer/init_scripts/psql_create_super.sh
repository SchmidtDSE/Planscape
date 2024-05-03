#!/bin/bash

psql "dbname=postgres user=postgres host=db port=5432 password=postgres" -c "create user planscape with createdb superuser password 'superuser';"
psql "dbname=postgres user=postgres host=db port=5432 password=postgres" -c "create database planscape with owner planscape;"