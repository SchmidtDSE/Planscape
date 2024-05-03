#!/bin/bash

bash .devcontainer/init_scripts/install_dev_dependencies.sh

## Backend Environemnt ##


### Frontend Environment ###

# https://github.com/OurPlanscape/Planscape/wiki/Development-getting-started#featuresdevjson-sample-as-of-aug-30-2023
bash .devcontainer/init_scripts/init_dev_environment.sh

# https://github.com/OurPlanscape/Planscape/wiki/Development-getting-started#featuresdevjson-sample-as-of-aug-30-2023
bash .devcontainer/init_scripts/init_dev_features.sh


## Initilize Backend ##

# https://github.com/OurPlanscape/Planscape/wiki/Development-getting-started#planscape-users
bash .devcontainer/init_scripts/psql_create_super.sh

# https://github.com/OurPlanscape/Planscape/wiki/Development-getting-started#fill-tables
bash .devcontainer/init_scripts/django_migrate.sh

