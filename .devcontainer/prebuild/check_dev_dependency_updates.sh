#!/bin/bash

# Get the current branch name
branch_name=$(git rev-parse --abbrev-ref HEAD)

# Calculate the hash of the .devcontainer directory, package.json, and pyproject.toml
new_hash=$(find \
    .devcontainer \
    docker/Dockerfile \
    docker-compose.yml \
    package.json \
    pyproject.toml \
    -type f -exec sha256sum {} \; | sha256sum)

# Read the stored hash
stored_hash=$(cat .devcontainer/prebuild/dev_dependency_hash.txt)

# If the hashes are different or if the stored hash does not exist
if [ "$new_hash" != "$stored_hash" ]; then

  # Install devpod within the runner
  sudo apt-get install devpod

  # Update the stored hash
  echo $new_hash > .devcontainer/dependencies_hash.txt
fi