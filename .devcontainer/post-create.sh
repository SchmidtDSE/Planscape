#!/bin/bash

# Install npm
apt-get update
apt-get install -y npm

# Verify npm installation
npm --version

# Install node packages within src/interface
cd src/interface
npm install
