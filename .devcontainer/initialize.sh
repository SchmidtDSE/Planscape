#!/bin/bash

bash init_scripts/install_dev_dependencies.sh
bash init_scripts/init_dev_environment.sh
bash init_scripts/init_dev_dependencies.sh
bash init_scripts/django_migrate.sh
