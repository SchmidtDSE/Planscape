#!/bin/bash

bash scripts/install_dev_dependencies.sh
bash scripts/init_dev_environment.sh
bash scripts/init_dev_dependencies.sh
bash scripts/django_migrate.sh
