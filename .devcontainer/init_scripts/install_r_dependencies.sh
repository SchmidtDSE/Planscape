#!/bin/bash

# Set noninteractive installation
export DEBIAN_FRONTEND=noninteractive

# Set your timezone
ln -fs /usr/share/zoneinfo/California/Los_Angeles /etc/localtime
apt-get install -y tzdata
dpkg-reconfigure --frontend noninteractive tzdata

# Install R library dependencies using apt
apt-get update
apt-get install -y \
    libgit2-dev \
    libharfbuzz-dev \
    libfribidi-dev \
    libudunits2-dev \
    r-base \
    libproj-dev \
    sqlite3 \
    libgeos-dev \
    libxml2-dev \
    libfontconfig1-dev \
    libfreetype6-dev \
    libpng-dev \
    libtiff5-dev \
    libjpeg-dev \
    libpq-dev

# Define R packages to be installed
packages=("dplyr" "textshaping" "stringi" "ggnewscale" "udunits2" "sf" "ragg" "pkgdown" "devtools" "DBI" "RPostgreSQL" "optparse" "rjson" "glue" "purrr" "dplyr" "logger")

# Install R packages
for pkg in "${packages[@]}"; do
    echo "install.packages('$pkg', repos='http://cran.us.r-project.org')" | R --no-save
done

# Install forsys libraries
echo "devtools::install_github('forsys-sp/forsysr')" | R --no-save
echo "devtools::install_github('forsys-sp/patchmax')" | R --no-save