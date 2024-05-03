#!/bin/bash

# Install curl and ca-certificates first
apt-get update
apt-get install -y curl ca-certificates

# Get setup script for Node.js 14.x from nodesource and run it
curl -sL https://deb.nodesource.com/setup_14.x | bash -

# Verify Node.js and npm installation
node --version
npm --version

# Install Node.js and npm
apt-get install -y nodejs