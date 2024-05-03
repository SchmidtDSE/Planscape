#!/bin/bash

bash .devcontainer/init_scripts/install_dev_dependencies.sh
bash .devcontainer/init_scripts/init_dev_environment.sh
bash .devcontainer/init_scripts/init_dev_dependencies.sh
bash .devcontainer/init_scripts/django_migrate.sh
