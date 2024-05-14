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

  # Update the stored hash
  echo $new_hash > .devcontainer/dependencies_hash.txt
  
  # If dependencies have changed, prebuild the devcontainer and push to ghcr.io
  echo "Dependencies have changed since the last build, prebuilding..."
  devpod up github.com/SchmidtDSE/Planscape@$branch_name --prebuild-repository github.com/SchmidtDSE/Planscape@$branch_name

else
  # If not, do nothing
  echo "Dependencies have not changed since the last build, no prebuild needed!"

fi