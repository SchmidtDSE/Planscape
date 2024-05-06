#!/bin/bash

###########################
### Backend Environment ###
###########################

# https://github.com/OurPlanscape/Planscape/wiki/Development-getting-started#backend

### NOTE: There is probably a better way to do this, using an optional .env in docker-compose perhaps.
### same is true for the environment.ts and features.json, but for now this preserves all the
### existing functionality and replicates the flow in the getting started doc. 

bash .devcontainer/init_scripts/init_dotenv.sh



############################
### Frontend Environment ###
############################

# https://github.com/OurPlanscape/Planscape/wiki/Development-getting-started#featuresdevjson-sample-as-of-aug-30-2023
bash .devcontainer/init_scripts/init_dev_environment.sh

# https://github.com/OurPlanscape/Planscape/wiki/Development-getting-started#featuresdevjson-sample-as-of-aug-30-2023
bash .devcontainer/init_scripts/init_dev_features.sh



###########################
### Initialize Frontend ###
###########################

# https://github.com/OurPlanscape/Planscape/wiki/Development-getting-started#install-frontend-libraries-and-services
bash .devcontainer/init_scripts/install_frontend_dependencies.sh



#########################
### Initilize Backend ###
#########################

# https://github.com/OurPlanscape/Planscape/wiki/Development-getting-started#planscape-users
bash .devcontainer/init_scripts/psql_create_super.sh

# https://github.com/OurPlanscape/Planscape/wiki/Development-getting-started#fill-tables
bash .devcontainer/init_scripts/django_migrate.sh

# https://github.com/OurPlanscape/Planscape/wiki/Development-getting-started#install-r
# bash .devcontainer/init_scripts/install_r_dependencies.sh