#!/bin/bash


### NOTE: There is probably a better way to do this, using an optional .env in docker-compose perhaps.
### same is true for the environment.ts and features.json, but for now this preserves all the
### existing functionality and replicates the flow in the getting started doc. 

# Define the content of the .env file
content="
SECRET_KEY=devcontainer-secret-key
ENV=dev
PLANSCAPE_DATABASE_HOST=db
PLANSCAPE_DATABASE_NAME=postgres
PLANSCAPE_DATABASE_USER=postgres
PLANSCAPE_DATABASE_PASSWORD=postgres
DATABASE_URL=postgis://postgres:postgres@db:5432/planscape
CELERY_BROKER_URL=redis://redis:6379/0
RASTER_ROOT=/workspace/data/rasters
"

# Write the content to the .env file
echo "$content" > .env