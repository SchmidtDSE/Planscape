#!/bin/bash

# Install curl and ca-certificates first
apt-get update
apt-get install -y curl ca-certificates

# Get setup script for latest Node.js version and install it
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# cd to the project directory and install dependencies
cd src/interface
npm install

# Install angular-cli
npm install -g @angular/cli

# Initialize a features.dev.json file, and an environment.dev.ts file (adding the recommended dev import to the environment.ts file)
cp src/app/features/features.json src/app/features/features.dev.json
cp src/environments/environment.ts src/environments/environment.dev.ts
echo "import 'zone.js/plugins/zone-error';" >> src/environments/environment.dev.ts

# Perform django migrations
cd ../planscape
python manage.py migrate