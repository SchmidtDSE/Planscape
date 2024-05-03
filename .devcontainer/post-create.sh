#!/bin/bash

# Install curl and ca-certificates first
apt-get update
apt-get install -y curl ca-certificates

# Get setup script for latest Node.js version and install it
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt-get install -y nodejs

# cd to the project directory and install dependencies
cd src/interface
npm install