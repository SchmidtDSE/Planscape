#!/bin/bash

# Initialize an environment.dev.ts file (adding the recommended dev import to the environment.ts file)
cp src/interface/src/environments/environment.ts src/interface/src/environments/environment.dev.ts
echo "import 'zone.js/plugins/zone-error';" >> src/environments/environment.dev.ts